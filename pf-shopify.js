/* PF_BUILD: stamped so you can tell at a glance which files a server is
   actually serving. Open the browser console on the live site: if it does not
   say 20260728a, the new files are NOT deployed. */
window.PF_BUILD = '20260728d';
console.log('%c[Popcorn & Freddy] build ' + window.PF_BUILD, 'color:#b0623c;font-weight:bold');
document.addEventListener('DOMContentLoaded', function () {
  var b = document.createElement('div');
  b.className = 'pf-build-badge';
  b.textContent = 'build ' + window.PF_BUILD;
  b.title = 'Temporary deploy indicator';
  b.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:99999;background:#2C2519;color:#FBF6E9;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;padding:7px 10px;border-radius:5px;opacity:.85;pointer-events:none';
  document.body.appendChild(b);
});

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
    US: { country: 'US', currency: 'USD', active: true,  label: { de: 'USA', en: 'United States' } },
  };
  var DEFAULT_COUNTRY = 'AT';               // fallback market (EUR) — spec: default AT
  var LOCALE_KEY = 'pf-locale-v1';          // legacy country store (superseded by PFLocale)
  var CART_KEY = 'pf-shopify-cart-v1';      // Shopify cart id + checkoutUrl

  function activeCountries() {
    return Object.keys(MARKETS).filter(function (k) { return MARKETS[k].active; });
  }
  function marketFor(country) {
    var c = (country || '').toUpperCase();
    if (MARKETS[c] && MARKETS[c].active) return MARKETS[c];
    return MARKETS[DEFAULT_COUNTRY];
  }
  // Country + language come from the URL locale prefix (PFLocale), so prices,
  // currency and product text are decided by the route — never hardcoded here.
  function savedCountry() {
    try { if (window.PFLocale) return marketFor(PFLocale.current().country).country; } catch (e) {}
    return DEFAULT_COUNTRY;
  }
  function currentMarket() { return marketFor(savedCountry()); }
  function langCode() {
    try { if (window.PFLocale) return PFLocale.current().language; } catch (e) {}
    return 'DE';
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
    'chapter_no', 'teaser', 'toy', 'release_label', 'badge',
    'caps', 'emotion', 'meta_rows', 'inside_items', 'details',
    'story_title', 'story_body', 'story_hand',
    'reviews', 'rating', 'rating_count',
    'scarcity', 'guarantee', 'gift_note', 'personalization_label',
  ];

  function productFields() {
    var mfSelectors = METAFIELD_IDS.map(function (k) {
      return k + ': metafield(namespace: "custom", key: "' + k + '") { value }';
    }).join('\n');
    return 'id\n handle\n title\n descriptionHtml\n availableForSale\n' +
      'featuredImage { url altText }\n' +
      'images(first: 12) { nodes { url altText } }\n' +
      'priceRange { minVariantPrice { amount currencyCode } }\n' +
      'variants(first: 25) {\n' +
      '  nodes { id title availableForSale quantityAvailable\n' +
      '    price { amount currencyCode }\n' +
      '    selectedOptions { name value } }\n' +
      '}\n' + mfSelectors;
  }

  function productQuery() {
    return 'query Product($handle: String!) ' + ctx() + ' {\n' +
      '  product(handle: $handle) {\n' + productFields() + '\n  }\n}';
  }

  // One request for MANY handles (aliased fields) — used by listing sections
  // so a grid of cards costs a single round-trip.
  function productsQuery(handles) {
    var f = productFields();
    var body = handles.map(function (h, i) {
      return 'p' + i + ': product(handle: "' + String(h).replace(/"/g, '\\"') + '") {\n' + f + '\n}';
    }).join('\n');
    return 'query Products ' + ctx() + ' {\n' + body + '\n}';
  }

  // Collection that holds the chapter products, in the manual sort order set
  // in Shopify. Add a product to this collection → it appears on the site.
  var CHAPTERS_COLLECTION = 'kapitel';
  var CHAPTERS_TAG = 'kapitel';

  function chaptersQuery() {
    return 'query Chapters ' + ctx() + ' {\n' +
      '  collection(handle: "' + CHAPTERS_COLLECTION + '") {\n' +
      '    products(first: 50, sortKey: MANUAL) { nodes {\n' + productFields() + '\n} }\n' +
      '  }\n}';
  }
  function chaptersByTagQuery() {
    return 'query ChaptersByTag ' + ctx() + ' {\n' +
      '  products(first: 50, query: "tag:' + CHAPTERS_TAG + '", sortKey: TITLE) { nodes {\n' + productFields() + '\n} }\n}';
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

    var out = {
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
      // listing content (index cards) — all from Shopify metafields
      chapterNo: mf.chapter_no != null ? Number(mf.chapter_no) : null,
      teaser: mf.teaser,
      toy: mf.toy,
      releaseLabel: mf.release_label,
      badge: mf.badge,
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
    storePut(out);
    return out;
  }

  // ── Shared catalog store ──────────────────────────────────────
  // ONE in-memory copy of every product the page has seen, keyed by handle.
  // Index cards, the product template and the cart all read from here, so
  // they can never show different images, prices or stock for one product.
  // Invalidated automatically when the market or language changes.
  var _store = {};
  var _storeKey = '';
  function storeKey() { return currentMarket().country + '|' + langCode(); }
  function storeCheck() {
    var k = storeKey();
    if (k !== _storeKey) { _store = {}; _catalogCache = {}; _chaptersCache = {}; _storeKey = k; }
  }
  function storePut(p) {
    if (!p || !p.handle) return;
    storeCheck();
    _store[p.handle] = p;
  }
  function emitCatalog() {
    try { window.dispatchEvent(new Event('pf-catalog-changed')); } catch (e) {}
  }
  // Synchronous read — null when the product hasn't loaded yet.
  function peek(handle) { storeCheck(); return (handle && _store[handle]) || null; }
  // Make sure these handles are in the store; resolves when they are.
  function ensure(handles, lang) {
    storeCheck();
    var missing = (handles || []).filter(function (h) { return h && !_store[h]; });
    if (!missing.length) return Promise.resolve(_store);
    return getProducts(missing, lang).then(function () { emitCatalog(); return _store; });
  }

  function getProduct(handle, lang) {
    return gql(productQuery(), { handle: handle }).then(function (d) {
      if (!d || d._notConfigured) return null;
      return normalizeProduct(d.product, lang);
    });
  }

  // Batched catalog fetch: handles → { handle: normalizedProduct|null }.
  // Cached per market+language so re-renders don't re-request.
  var _catalogCache = {};
  function getProducts(handles, lang) {
    var list = (handles || []).filter(Boolean);
    if (!list.length) return Promise.resolve({});
    var key = currentMarket().country + '|' + langCode() + '|' + (lang || '') + '|' + list.join(',');
    if (_catalogCache[key]) return _catalogCache[key];
    var p = gql(productsQuery(list)).then(function (d) {
      if (!d || d._notConfigured) return {};
      var out = {};
      list.forEach(function (h, i) {
        var raw = d['p' + i];
        out[h] = raw ? normalizeProduct(raw, lang) : null;
      });
      return out;
    }).catch(function () { delete _catalogCache[key]; return {}; });
    _catalogCache[key] = p;
    return p;
  }

  // The chapter catalog: every chapter product, straight from Shopify.
  // Tries the "kapitel" collection first, falls back to the "kapitel" tag.
  var _chaptersCache = {};
  function getChapters(lang) {
    storeCheck();
    var key = storeKey() + '|' + (lang || '');
    if (_chaptersCache[key]) return _chaptersCache[key];
    var p = gql(chaptersQuery()).then(function (d) {
      if (!d || d._notConfigured) return null;
      var nodes = d.collection && d.collection.products && d.collection.products.nodes;
      return (nodes && nodes.length) ? nodes : null;
    }).catch(function () { return null; }).then(function (nodes) {
      if (nodes) return nodes;
      // No such collection (or empty) → tag fallback.
      return gql(chaptersByTagQuery()).then(function (d) {
        if (!d || d._notConfigured) return [];
        return (d.products && d.products.nodes) || [];
      }).catch(function () { return []; });
    }).then(function (nodes) {
      var list = nodes.map(function (n) { return normalizeProduct(n, lang); }).filter(Boolean);
      // chapter_no orders the list when set; otherwise Shopify's own order wins.
      var numbered = list.filter(function (p) { return p.chapterNo != null; });
      if (numbered.length === list.length) list.sort(function (a, b) { return a.chapterNo - b.chapterNo; });
      emitCatalog();
      return list;
    }).catch(function () { delete _chaptersCache[key]; return []; });
    _chaptersCache[key] = p;
    return p;
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
    if (buyer && buyer.email) bi.email = buyer.email;   // email is a valid buyerIdentity field; address is prefilled via the checkout URL instead
    return bi;
  }
  // Pre-fill Shopify's hosted checkout with the shipping details collected in
  // our own cart, via standard checkout query params. Any value Shopify doesn't
  // accept is simply ignored — it can never block the redirect.
  function checkoutUrlWithPrefill(url, buyer) {
    if (!url || !buyer) return url;
    try {
      var u = new URL(url), a = buyer.address || {};
      if (buyer.email) u.searchParams.set('checkout[email]', buyer.email);
      if (a.firstName) u.searchParams.set('checkout[shipping_address][first_name]', a.firstName);
      if (a.lastName) u.searchParams.set('checkout[shipping_address][last_name]', a.lastName);
      if (a.address1) u.searchParams.set('checkout[shipping_address][address1]', a.address1);
      if (a.city) u.searchParams.set('checkout[shipping_address][city]', a.city);
      if (a.zip) u.searchParams.set('checkout[shipping_address][zip]', a.zip);
      if (a.countryCode) u.searchParams.set('checkout[shipping_address][country]', a.countryCode);
      return u.toString();
    } catch (e) { return url; }
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
  // Internal fallback to our own Checkout page — keep the active locale prefix.
  // (Shopify checkoutUrl links below are external and stay untouched.)
  function gotoCheckoutPage() {
    if (window.PFLocale) { window.PFLocale.go('Checkout.html'); return; }
    window.location.href = 'Checkout.html';
  }
  function checkout(buyer) {
    return detect().then(function (ok) {
      if (!ok) { gotoCheckoutPage(); return false; }
      var items = localCartItems();
      if (!items.length) {
        return getCart().then(function (c) {
          if (c && c.checkoutUrl) { window.location.href = checkoutUrlWithPrefill(c.checkoutUrl, buyer); return true; }
          return false;
        });
      }
      return Promise.all(items.map(function (it) {
        var handle = it.handle || (typeof it.n === 'string' ? it.n : null);
        var vp = it.variantId ? Promise.resolve(it.variantId) : resolveVariant(handle);
        return vp.then(function (vid) {
          if (!vid) return null;
          return { merchandiseId: vid, quantity: it.qty || 1, attributes: lineAttrs(it) };
        });
      })).then(function (lines) {
        lines = lines.filter(Boolean);
        if (!lines.length) { gotoCheckoutPage(); return false; }
        // Fresh cart that mirrors the current basket exactly.
        writeCartRef({});
        return cartCreate(lines, buyer).then(function (cart) {
          if (cart && cart.checkoutUrl) { window.location.href = checkoutUrlWithPrefill(cart.checkoutUrl, buyer); return true; }
          gotoCheckoutPage();
          return false;
        });
      });
    });
  }

  function emitChange() {
    try { window.dispatchEvent(new Event('pf-shop-cart-changed')); } catch (e) {}
  }

  // ── Localization (populates the country/language selector) ────
  // The available countries + languages come straight from Shopify's
  // localization query — never a hardcoded list. Cached for the session.
  var _localizationPromise = null;
  function getLocalization() {
    if (_localizationPromise) return _localizationPromise;
    var q = 'query Localization ' + ctx() + ' {\n' +
      '  localization {\n' +
      '    availableCountries { isoCode name currency { isoCode symbol } }\n' +
      '    availableLanguages { isoCode name endonymName }\n' +
      '  }\n}';
    _localizationPromise = gql(q).then(function (d) {
      var loc = d && !d._notConfigured && d.localization;
      if (!loc) return null;
      return {
        countries: (loc.availableCountries || []).map(function (c) {
          return { code: c.isoCode, name: c.name, currency: c.currency && c.currency.isoCode, symbol: c.currency && c.currency.symbol };
        }),
        languages: (loc.availableLanguages || []).map(function (l) {
          return { code: l.isoCode, name: l.name, endonym: l.endonymName };
        }),
      };
    }).catch(function () { _localizationPromise = null; return null; });
    return _localizationPromise;
  }

  // ── Geo suggestion (subtle, never forced) ─────────────────
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
    getProducts: getProducts,
    getChapters: getChapters,
    getLocalization: getLocalization,
    peek: peek,
    ensure: ensure,
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
