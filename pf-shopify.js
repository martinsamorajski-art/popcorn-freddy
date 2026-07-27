/* ────────────────────────────────────────────────────────────────
   Popcorn & Freddy — Shopify headless data layer  (window.PFShop)
   ────────────────────────────────────────────────────────────────
   This is the ONLY place the site talks to Shopify. It never contains
   a token: every request goes through /api/shop (a Netlify Function
   that adds the Storefront token server-side).

   Responsibilities
     • Markets / currency  (DE·AT → EUR, CH → CHF; US prepared, off)
     • Load a product dynamically by its Shopify handle
     • Cart: add / update / remove lines (Shopify Cart API)
     • Checkout: hand off to Shopify's hosted checkout
     • Graceful fallback: if Shopify isn't configured yet, PFShop.enabled
       stays false and the site keeps working in local/preview mode.

   Nothing here changes the design — it only feeds data to the existing
   React components.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── Markets ──────────────────────────────────────────────────
  // country = Shopify Market country · currency comes from the Market.
  // To add the US later: flip `active:true` (and create the market in
  // Shopify + Shopify Markets). No other code change needed.
  var MARKETS = {
    DE: { country: 'DE', currency: 'EUR', active: true,  label: { de: 'Deutschland', en: 'Germany' } },
    AT: { country: 'AT', currency: 'EUR', active: true,  label: { de: 'Österreich', en: 'Austria' } },
    CH: { country: 'CH', currency: 'CHF', active: true,  label: { de: 'Schweiz', en: 'Switzerland' } },
    US: { country: 'US', currency: 'USD', active: false, label: { de: 'USA', en: 'United States' } }, // prepared for later
  };
  var DEFAULT_COUNTRY = 'DE';               // fallback market (EUR)
  var LOCALE_KEY = 'pf-locale-v1';          // shared with rd-ui.jsx locale control
  var CART_KEY = 'pf-shopify-cart-v1';      // Shopify cart id + checkoutUrl

  function activeCountries() {
    return Object.keys(MARKETS).filter(function (k) { return MARKETS[k].active; });
  }
  function marketFor(country) {
    var c = (country || '').toUpperCase();
    if (MARKETS[c] && MARKETS[c].active) return MARKETS[c];
    return MARKETS[DEFAULT_COUNTRY];
  }
  function savedCountry() {
    try {
      var c = localStorage.getItem(LOCALE_KEY);
      if (c && MARKETS[c] && MARKETS[c].active) return c;
    } catch (e) {}
    return DEFAULT_COUNTRY;
  }
  function currentMarket() { return marketFor(savedCountry()); }
  function langCode() {
    try {
      var l = localStorage.getItem('pf-lang-v1');
      return (l === 'en') ? 'EN' : 'DE';
    } catch (e) { return 'DE'; }
  }

  // ── Money formatting (uses currency returned BY Shopify) ──────
  function money(amount, currencyCode, lang) {
    var n = Number(amount);
    if (isNaN(n)) return '';
    try {
      return new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'de-DE', {
        style: 'currency', currency: currencyCode || 'EUR',
      }).format(n);
    } catch (e) {
      return n.toFixed(2) + ' ' + (currencyCode || 'EUR');
    }
  }

  // ── GraphQL transport via the Netlify proxy ───────────────────
  var _enabled = null;             // null = unknown, true/false once probed
  var _configPromise = null;

  function gql(query, variables) {
    return fetch('/api/shop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query, variables: variables || {} }),
    }).then(function (res) {
      if (res.status === 501) { _enabled = false; return { _notConfigured: true }; }
      return res.json().then(function (json) {
        if (json && json.configured === false) { _enabled = false; return { _notConfigured: true }; }
        if (json && json.errors && json.errors.length) {
          // Surface GraphQL errors but don't mark the store as "off".
          throw new Error(json.errors.map(function (e) { return e.message; }).join(' · '));
        }
        _enabled = true;
        return json.data;
      });
    }).catch(function (err) {
      // Network / not-deployed → treat as not configured (preview mode).
      if (_enabled === null) _enabled = false;
      throw err;
    });
  }

  // Cheap probe used by pages to decide live-vs-preview.
  function detect() {
    if (_configPromise) return _configPromise;
    _configPromise = gql('{ shop { name } }').then(function (d) {
      return !!(d && !d._notConfigured);
    }).catch(function () { return false; });
    return _configPromise;
  }

  // ── Context directive for market pricing (@inContext) ─────────
  function ctx() {
    return '@inContext(country: ' + currentMarket().country + ', language: ' + langCode() + ')';
  }

  // ── Product query ─────────────────────────────────────────────
  // Native fields carry name / price / images / description / inventory.
  // Metafields (namespace "custom") carry the extra product content that
  // the existing design shows. See SHOPIFY-SETUP.md for the exact keys.
  var METAFIELD_IDS = [
    'caps', 'emotion', 'meta_rows', 'inside_items', 'details',
    'story_title', 'story_body', 'story_hand',
    'reviews', 'rating', 'rating_count',
    'scarcity', 'guarantee', 'gift_note', 'personalization_label',
  ];

  function productQuery() {
    var mfSelectors = METAFIELD_IDS.map(function (k) {
      return k + ': metafield(namespace: "custom", key: "' + k + '") { value }';
    }).join('\n');
    return 'query Product($handle: String!) ' + ctx() + ' {\n' +
      '  product(handle: $handle) {\n' +
      '    id\n handle\n title\n descriptionHtml\n availableForSale\n' +
      '    featuredImage { url altText }\n' +
      '    images(first: 12) { nodes { url altText } }\n' +
      '    priceRange { minVariantPrice { amount currencyCode } }\n' +
      '    variants(first: 25) {\n' +
      '      nodes { id title availableForSale quantityAvailable\n' +
      '        price { amount currencyCode }\n' +
      '        selectedOptions { name value } }\n' +
      '    }\n' +
      mfSelectors + '\n' +
      '  }\n' +
      '}';
  }

  function parseMaybeJSON(v) {
    if (v == null) return null;
    try { return JSON.parse(v); } catch (e) { return v; }
  }

  // Turn a raw Shopify product into the shape the design components expect.
  function normalizeProduct(p, lang) {
    if (!p) return null;
    var mf = {};
    METAFIELD_IDS.forEach(function (k) { mf[k] = p[k] && p[k].value != null ? p[k].value : null; });
    var variants = (p.variants && p.variants.nodes) || [];
    var v0 = variants[0] || null;
    var priceObj = (v0 && v0.price) || (p.priceRange && p.priceRange.minVariantPrice) || { amount: '0', currencyCode: 'EUR' };
    var images = ((p.images && p.images.nodes) || []).map(function (im) {
      return { src: im.url, alt: im.altText || p.title, fit: 'cover' };
    });
    if (!images.length && p.featuredImage) images = [{ src: p.featuredImage.url, alt: p.featuredImage.altText || p.title, fit: 'cover' }];

    return {
      id: p.id,
      handle: p.handle,
      title: p.title,
      descriptionHtml: p.descriptionHtml || '',
      available: p.availableForSale,
      variantId: v0 && v0.id,
      variants: variants,
      quantityAvailable: v0 ? v0.quantityAvailable : null,
      price: Number(priceObj.amount),
      currencyCode: priceObj.currencyCode,
      priceFormatted: money(priceObj.amount, priceObj.currencyCode, lang),
      images: images,
      // extra content from metafields (may be null → components fall back)
      caps: mf.caps,
      emotion: mf.emotion,
      meta_rows: parseMaybeJSON(mf.meta_rows),
      inside_items: parseMaybeJSON(mf.inside_items),
      details: parseMaybeJSON(mf.details),
      story_title: mf.story_title,
      story_body: mf.story_body,
      story_hand: mf.story_hand,
      reviews: parseMaybeJSON(mf.reviews),
      rating: mf.rating != null ? Number(mf.rating) : null,
      rating_count: mf.rating_count != null ? Number(mf.rating_count) : null,
      scarcity: mf.scarcity,
      guarantee: mf.guarantee,
      gift_note: mf.gift_note,
      personalization_label: mf.personalization_label,
    };
  }

  function getProduct(handle, lang) {
    return gql(productQuery(), { handle: handle }).then(function (d) {
      if (!d || d._notConfigured) return null;
      return normalizeProduct(d.product, lang);
    });
  }

  // ── Cart (Shopify Cart API) ───────────────────────────────────
  var CART_FIELDS =
    'id checkoutUrl totalQuantity\n' +
    'cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }\n' +
    'lines(first: 50) { nodes { id quantity\n' +
    '  merchandise { ... on ProductVariant { id title image { url altText } product { title handle featuredImage { url altText } } price { amount currencyCode } } }\n' +
    '  attributes { key value }\n' +
    '  cost { totalAmount { amount currencyCode } } } }';

  function readCartRef() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; }
  }
  function writeCartRef(ref) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(ref || {})); } catch (e) {}
  }

  function normalizeCart(cart) {
    if (!cart) return null;
    var lines = ((cart.lines && cart.lines.nodes) || []).map(function (l) {
      var m = l.merchandise || {};
      var prod = m.product || {};
      var img = (m.image && m.image.url) || (prod.featuredImage && prod.featuredImage.url) || null;
      var price = (m.price && Number(m.price.amount)) || 0;
      var cc = (m.price && m.price.currencyCode) || (cart.cost && cart.cost.totalAmount && cart.cost.totalAmount.currencyCode) || 'EUR';
      return {
        lineId: l.id,
        variantId: m.id,
        title: prod.title || m.title,
        handle: prod.handle,
        image: img,
        qty: l.quantity,
        price: price,
        currencyCode: cc,
        attributes: (l.attributes || []).reduce(function (o, a) { o[a.key] = a.value; return o; }, {}),
      };
    });
    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      currencyCode: (cart.cost && cart.cost.totalAmount && cart.cost.totalAmount.currencyCode) || 'EUR',
      subtotal: cart.cost && cart.cost.subtotalAmount && Number(cart.cost.subtotalAmount.amount),
      total: cart.cost && cart.cost.totalAmount && Number(cart.cost.totalAmount.amount),
      lines: lines,
    };
  }

  // Build buyerIdentity so Shopify's hosted checkout opens PRE-FILLED with the
  // name / email / delivery address collected in the site's own cart (Option B).
  function buildBuyerIdentity(buyer) {
    var bi = { countryCode: (buyer && buyer.address && buyer.address.countryCode) || currentMarket().country };
    if (buyer) {
      if (buyer.email) bi.email = buyer.email;
      if (buyer.address) bi.deliveryAddressPreferences = [{ deliveryAddress: buyer.address }];
    }
    return bi;
  }
  function cartCreate(lines, buyer) {
    var q = 'mutation Create($input: CartInput!) ' + ctx() + ' {\n' +
      '  cartCreate(input: $input) { cart { ' + CART_FIELDS + ' } userErrors { message } }\n}';
    var input = {
      lines: lines || [],
      buyerIdentity: buildBuyerIdentity(buyer),
    };
    return gql(q, { input: input }).then(function (d) {
      if (!d || d._notConfigured) return null;
      var cart = d.cartCreate && d.cartCreate.cart;
      if (cart) writeCartRef({ id: cart.id, checkoutUrl: cart.checkoutUrl });
      return normalizeCart(cart);
    });
  }

  function getCart() {
    var ref = readCartRef();
    if (!ref.id) return Promise.resolve(null);
    var q = 'query Cart($id: ID!) { cart(id: $id) { ' + CART_FIELDS + ' } }';
    return gql(q, { id: ref.id }).then(function (d) {
      if (!d || d._notConfigured) return null;
      if (!d.cart) { writeCartRef({}); return null; }   // expired cart
      return normalizeCart(d.cart);
    }).catch(function () { return null; });
  }

  function ensureCart() {
    var ref = readCartRef();
    if (ref.id) return Promise.resolve(ref.id);
    return cartCreate([]).then(function (c) { return c && c.id; });
  }

  // Add a variant. attributes = {"Name des Kindes":"Mia","Sprache":"DE"}
  function addLine(variantId, quantity, attributes) {
    var attrs = Object.keys(attributes || {}).map(function (k) { return { key: k, value: String(attributes[k]) }; });
    var line = { merchandiseId: variantId, quantity: quantity || 1, attributes: attrs };
    return ensureCart().then(function (id) {
      if (!id) return null;
      var q = 'mutation Add($cartId: ID!, $lines: [CartLineInput!]!) ' + ctx() + ' {\n' +
        '  cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ' + CART_FIELDS + ' } userErrors { message } }\n}';
      return gql(q, { cartId: id, lines: [line] }).then(function (d) {
        var cart = d && d.cartLinesAdd && d.cartLinesAdd.cart;
        emitChange();
        return normalizeCart(cart);
      });
    });
  }

  function updateLine(lineId, quantity) {
    var ref = readCartRef();
    if (!ref.id) return Promise.resolve(null);
    var q = 'mutation Upd($cartId: ID!, $lines: [CartLineUpdateInput!]!) ' + ctx() + ' {\n' +
      '  cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ' + CART_FIELDS + ' } userErrors { message } }\n}';
    return gql(q, { cartId: ref.id, lines: [{ id: lineId, quantity: quantity }] }).then(function (d) {
      emitChange();
      return normalizeCart(d && d.cartLinesUpdate && d.cartLinesUpdate.cart);
    });
  }

  function removeLine(lineId) {
    var ref = readCartRef();
    if (!ref.id) return Promise.resolve(null);
    var q = 'mutation Rem($cartId: ID!, $lineIds: [ID!]!) ' + ctx() + ' {\n' +
      '  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ' + CART_FIELDS + ' } userErrors { message } }\n}';
    return gql(q, { cartId: ref.id, lineIds: [lineId] }).then(function (d) {
      emitChange();
      return normalizeCart(d && d.cartLinesRemove && d.cartLinesRemove.cart);
    });
  }

  // Re-point an existing cart at a new market (currency) after a switch.
  function setBuyerCountry(country) {
    var ref = readCartRef();
    if (!ref.id) return Promise.resolve(null);
    var q = 'mutation Buyer($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) ' + ctx() + ' {\n' +
      '  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) { cart { ' + CART_FIELDS + ' } userErrors { message } }\n}';
    return gql(q, { cartId: ref.id, buyerIdentity: { countryCode: country } }).then(function (d) {
      emitChange();
      return normalizeCart(d && d.cartBuyerIdentityUpdate && d.cartBuyerIdentityUpdate.cart);
    });
  }

  // Map legacy numeric cart items (chapter number) to their Shopify handle.
  // Extend as products are added; string handles need no entry.
  var HANDLE_BY_N = { 1: 'kapitel-1-fluesterwald', 2: 'kapitel-2-silbersee' };
  var _variantCache = {};
  function resolveVariant(handle) {
    if (!handle) return Promise.resolve(null);
    if (_variantCache[handle]) return Promise.resolve(_variantCache[handle]);
    return getProduct(handle).then(function (p) {
      if (p && p.variantId) { _variantCache[handle] = p.variantId; return p.variantId; }
      return null;
    }).catch(function () { return null; });
  }
  function localCartItems() {
    try { var c = JSON.parse(localStorage.getItem('pf-cart-v1')); return Array.isArray(c) ? c : []; } catch (e) { return []; }
  }
  function lineAttrs(it) {
    return Object.keys(it.attrs || {}).map(function (k) { return { key: k, value: String(it.attrs[k]) }; });
  }

  // Hand off to Shopify's hosted checkout. Rebuilds the Shopify cart from
  // the existing on-site cart (the design's source of truth) so checkout
  // works no matter which page or button added the item.
  function checkout(buyer) {
    return detect().then(function (ok) {
      if (!ok) { window.location.href = 'Checkout.html'; return false; }
      var items = localCartItems();
      if (!items.length) {
        return getCart().then(function (c) {
          if (c && c.checkoutUrl) { window.location.href = c.checkoutUrl; return true; }
          return false;
        });
      }
      return Promise.all(items.map(function (it) {
        var handle = it.handle || (typeof it.n === 'string' ? it.n : HANDLE_BY_N[it.n]);
        var vp = it.variantId ? Promise.resolve(it.variantId) : resolveVariant(handle);
        return vp.then(function (vid) {
          if (!vid) return null;
          return { merchandiseId: vid, quantity: it.qty || 1, attributes: lineAttrs(it) };
        });
      })).then(function (lines) {
        lines = lines.filter(Boolean);
        if (!lines.length) { window.location.href = 'Checkout.html'; return false; }
        // Fresh cart that mirrors the current basket exactly.
        writeCartRef({});
        return cartCreate(lines, buyer).then(function (cart) {
          if (cart && cart.checkoutUrl) { window.location.href = cart.checkoutUrl; return true; }
          window.location.href = 'Checkout.html';
          return false;
        });
      });
    });
  }

  function emitChange() {
    try { window.dispatchEvent(new Event('pf-shop-cart-changed')); } catch (e) {}
  }

  // ── Geo suggestion (subtle, never forced) ─────────────────────
  function suggestCountry() {
    return fetch('/api/geo').then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.country) || ''; })
      .catch(function () { return ''; });
  }

  window.PFShop = {
    // config / markets
    get enabled() { return _enabled === true; },
    detect: detect,
    MARKETS: MARKETS,
    activeCountries: activeCountries,
    marketFor: marketFor,
    currentMarket: currentMarket,
    savedCountry: savedCountry,
    money: money,
    // catalog
    getProduct: getProduct,
    // cart
    getCart: getCart,
    addLine: addLine,
    updateLine: updateLine,
    removeLine: removeLine,
    setBuyerCountry: setBuyerCountry,
    checkout: checkout,
    // geo
    suggestCountry: suggestCountry,
  };
})();
