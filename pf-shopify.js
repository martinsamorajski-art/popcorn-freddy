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
  // A file-list metafield node can resolve as MediaImage OR GenericFile
  // depending on how the file was attached — read a URL from either.
  function refImgUrl(n) {
    if (!n) return null;
    if (n.image && n.image.url) return n.image.url;
    if (n.url) return n.url;
    return null;
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
    'caps', 'emotion', 'bausatz', 'meta_rows', 'inside_items', 'details',
    'story_title', 'story_body', 'story_hand',
    'reviews', 'rating', 'rating_count',
    'scarcity', 'guarantee', 'gift_note', 'personalization_label',
    // Translatable twins of the two JSON fields: plain text lists, so Shopify's
    // Translate & Adapt can translate them (it cannot translate JSON).
    'inside_list', 'details_list',
  ];

  // Icons for the "inside the box" cards when the content is a plain text list
  // (the JSON form names its own icon per row).
  var INSIDE_ICONS = ['book', 'build', 'palette', 'compass', 'archive', 'star', 'check', 'heart'];

  // A list metafield arrives as a JSON array of strings. Each entry is one card,
  // written as "Titel — Beschreibung" (em dash, hyphen or colon all work).
  function parseInsideList(v) {
    var arr = parseMaybeJSON(v);
    if (!Array.isArray(arr) || !arr.length) return null;
    return arr.map(function (line, i) {
      var s = String(line).trim();
      var m = s.split(/\s+[—–-]\s+|:\s+/);
      var title = (m[0] || s).trim();
      var desc = m.length > 1 ? s.slice(s.indexOf(m[1])).trim() : '';
      return {
        n: String(i + 1).padStart(2, '0'),
        icon: INSIDE_ICONS[i % INSIDE_ICONS.length],
        t: title,
        d: desc,
      };
    });
  }

  // Same idea for the at-a-glance table: "Format: A5, gedruckt in Deutschland".
  function parseRowList(v) {
    var arr = parseMaybeJSON(v);
    if (!Array.isArray(arr) || !arr.length) return null;
    return arr.map(function (line) {
      var s = String(line).trim();
      var i = s.indexOf(':');
      if (i === -1) return { k: s, v: '' };
      return { k: s.slice(0, i).trim(), v: s.slice(i + 1).trim() };
    });
  }

  function productFields() {
    // Every metafield is queried TWICE: the German original and an optional
    // `_en` twin. Shopify's Translate & Adapt cannot translate JSON metafields
    // (and only handles text ones once translations are enabled), so an English
    // locale prefers custom.<key>_en and falls back to the German value.
    var mfSelectors = METAFIELD_IDS.map(function (k) {
      return k + ': metafield(namespace: "custom", key: "' + k + '") { value }\n' +
        k + '_en: metafield(namespace: "custom", key: "' + k + '_en") { value }';
    }).join('\n');
    return 'id\n handle\n title\n descriptionHtml\n availableForSale\n' +
      // Shopify's native SEO fields drive <title> and the meta description, so
      // each chapter gets its own — edited in Shopify, never in the HTML.
      'seo { title description }\n' +
      'featuredImage { url altText }\n' +
      'images(first: 12) { nodes { url altText } }\n' +
      // Sample pages of THIS chapter: a file-list metafield of images, so the
      // preview strip is per chapter and uploaded in Shopify (Content → Files).
      'page_previews: metafield(namespace: "custom", key: "page_previews") {\n' +
      '  references(first: 12) { nodes { ... on MediaImage { image { url altText } } ... on GenericFile { url } } }\n' +
      '}\n' +
      // English twin: an EN visitor sees these instead when filled. Shopify
      // cannot translate a file-list metafield, so it is a separate field.
      'page_previews_en: metafield(namespace: "custom", key: "page_previews_en") {\n' +
      '  references(first: 12) { nodes { ... on MediaImage { image { url altText } } ... on GenericFile { url } } }\n' +
      '}\n' +
      // English twin of the MAIN product photos (index card + gallery + thumb).
      // Native product images can't be translated, so EN photos live here.
      'product_images_en: metafield(namespace: "custom", key: "product_images_en") {\n' +
      '  references(first: 12) { nodes { ... on MediaImage { image { url altText } } ... on GenericFile { url } } }\n' +
      '}\n' +
      // Judge.me syncs its aggregate into the standard `reviews` namespace.
      'jm_rating: metafield(namespace: "reviews", key: "rating") { value }\n' +
      'jm_rating_count: metafield(namespace: "reviews", key: "rating_count") { value }\n' +
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

  // A translated storefront gives a product a DIFFERENT handle per language
  // (kapitel-1-fluesterwald in DE vs chapter-1-whispering-woods in EN), and
  // product(handle:) only resolves the handle of the language in context. Our
  // links carry the German handle everywhere, so under /us they would resolve
  // to nothing. The search filter matches the product's underlying handle
  // regardless of the context language, so it recovers exactly those misses.
  function productsByHandleSearchQuery(handles) {
    var f = productFields();
    var body = handles.map(function (h, i) {
      return 'q' + i + ': products(first: 1, query: "handle:' + String(h).replace(/"/g, '\\"') + '") { nodes {\n' + f + '\n} }';
    }).join('\n');
    return 'query ProductsByHandleSearch ' + ctx() + ' {\n' + body + '\n}';
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

  // Shopify's `rating` metafield type stores JSON: {"value":"4.8","scale_max":"5"}.
  // Judge.me writes the shop's aggregate there. Plain numbers still work.
  function parseRating(v) {
    if (v == null) return null;
    var p = parseMaybeJSON(v);
    var n = Number(p && typeof p === 'object' ? p.value : p);
    return isNaN(n) ? null : n;
  }

  // Turn a raw Shopify product into the shape the design components expect.
  function normalizeProduct(p, lang) {
    if (!p) return null;
    // EN locale: take the `_en` twin when it is filled, else the German value.
    var wantEn = String(lang || langCode()).toUpperCase().indexOf('EN') === 0;
    var mf = {};
    METAFIELD_IDS.forEach(function (k) {
      var en = wantEn && p[k + '_en'] && p[k + '_en'].value != null ? p[k + '_en'].value : null;
      var de = p[k] && p[k].value != null ? p[k].value : null;
      mf[k] = en != null && String(en).trim() !== '' ? en : de;
    });
    var variants = (p.variants && p.variants.nodes) || [];
    var v0 = variants[0] || null;
    var priceObj = (v0 && v0.price) || (p.priceRange && p.priceRange.minVariantPrice) || { amount: '0', currencyCode: 'EUR' };
    var images = ((p.images && p.images.nodes) || []).map(function (im) {
      return { src: im.url, alt: im.altText || p.title, fit: 'cover' };
    });
    if (!images.length && p.featuredImage) images = [{ src: p.featuredImage.url, alt: p.featuredImage.altText || p.title, fit: 'cover' }];
    // EN visitor: swap in the English photo set when the `_en` metafield is filled.
    try { console.log('[PFShop] wantEn=', wantEn, ' product_images_en raw:', JSON.stringify(p.product_images_en)); } catch (e) {}
    if (wantEn && p.product_images_en) {
      var enNodes2 = (p.product_images_en.references && p.product_images_en.references.nodes) || [];
      var enImgs = enNodes2.map(function (n) { return refImgUrl(n); }).filter(Boolean)
        .map(function (u) { return { src: u, alt: p.title, fit: 'cover' }; });
      if (enImgs.length) images = enImgs;
    }

    var out = {
      id: p.id,
      handle: p.handle,
      title: p.title,
      descriptionHtml: p.descriptionHtml || '',
      seoTitle: (p.seo && p.seo.title) || null,
      seoDescription: (p.seo && p.seo.description) || null,
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
      bausatz: mf.bausatz,
      meta_rows: parseMaybeJSON(mf.meta_rows),
      // Text-list form wins when present (it is the translatable one); the JSON
      // metafield stays supported so nothing already filled in breaks.
      inside_items: parseInsideList(mf.inside_list) || parseMaybeJSON(mf.inside_items),
      details: parseRowList(mf.details_list) || parseMaybeJSON(mf.details),
      story_title: mf.story_title,
      story_body: mf.story_body,
      story_hand: mf.story_hand,
      reviews: parseMaybeJSON(mf.reviews),
      // Rating: Judge.me's synced aggregate wins; the manual metafield is the
      // fallback for a store without the app.
      rating: parseRating(p.jm_rating && p.jm_rating.value) != null
        ? parseRating(p.jm_rating && p.jm_rating.value)
        : parseRating(mf.rating),
      rating_count: (p.jm_rating_count && p.jm_rating_count.value != null)
        ? Number(p.jm_rating_count.value)
        : (mf.rating_count != null ? Number(mf.rating_count) : null),
      // Sample pages of this chapter (file-list metafield of images).
      pagePreviews: (function () {
        var enField = wantEn ? p.page_previews_en : null;
        var src = (enField && enField.references && enField.references.nodes && enField.references.nodes.length)
          ? enField : p.page_previews;
        var nodes = (src && src.references && src.references.nodes) || [];
        return nodes.map(function (n) { return refImgUrl(n); }).filter(Boolean)
          .map(function (u) { return { src: u, alt: p.title }; });
      })(),
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
  function storePut(p, alias) {
    if (!p || !p.handle) return;
    storeCheck();
    _store[p.handle] = p;
    // Handles are language-specific in Shopify. When a product was requested
    // under one language's handle but resolved under another's, register it
    // under BOTH so peek() finds it either way (cart survives a language switch).
    if (alias && alias !== p.handle) _store[alias] = p;
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
      if (d.product) return normalizeProduct(d.product, lang);
      // Handle belongs to another language (see productsByHandleSearchQuery).
      return gql(productsByHandleSearchQuery([handle])).then(function (d2) {
        var n = d2 && !d2._notConfigured && d2.q0 && d2.q0.nodes && d2.q0.nodes[0];
        if (!n) return null;
        var np = normalizeProduct(n, lang);
        storePut(np, handle);
        return np;
      }).catch(function () { return null; });
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
      var out = {}, misses = [];
      list.forEach(function (h, i) {
        var raw = d['p' + i];
        out[h] = raw ? normalizeProduct(raw, lang) : null;
        if (!raw) misses.push(h);
      });
      if (!misses.length) return out;
      // Second pass for handles that belong to another language.
      return gql(productsByHandleSearchQuery(misses)).then(function (d2) {
        if (!d2 || d2._notConfigured) return out;
        misses.forEach(function (h, i) {
          var n = d2['q' + i] && d2['q' + i].nodes && d2['q' + i].nodes[0];
          if (n) { var np = normalizeProduct(n, lang); out[h] = np; storePut(np, h); }
        });
        return out;
      }).catch(function () { return out; });
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
    // Shipping rates come from Shopify (the shop's own delivery profiles) — the
    // site never invents a delivery price. Populated once the cart carries a
    // delivery address (see setDeliveryAddress).
    'deliveryGroups(first: 5) { nodes { deliveryOptions { handle title estimatedCost { amount currencyCode } } } }\n' +
    'lines(first: 50) { nodes { id quantity\n' +
    '  merchandise { ... on ProductVariant { id title image { url altText } product { title handle featuredImage { url altText }\n' +
    '    product_images_en: metafield(namespace: "custom", key: "product_images_en") {\n' +
    '      references(first: 1) { nodes { ... on MediaImage { image { url } } ... on GenericFile { url } } }\n' +
    '    } } price { amount currencyCode } } }\n' +
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
      // EN visitor: use the English product photo for the thumbnail when set.
      if (String(langCode()).toUpperCase().indexOf('EN') === 0 && prod.product_images_en && prod.product_images_en.references) {
        var enNodes = prod.product_images_en.references.nodes || [];
        var enUrl = enNodes.length ? refImgUrl(enNodes[0]) : null;
        if (enUrl) img = enUrl;
      }
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
    // Cheapest delivery option Shopify offers for this cart+address, or null
    // while no address is known yet. NEVER a locally computed rate.
    var shipOptions = [];
    try {
      var groups = (cart.deliveryGroups && cart.deliveryGroups.nodes) || [];
      groups.forEach(function (g) {
        (g.deliveryOptions || []).forEach(function (o) {
          if (o && o.estimatedCost) {
            shipOptions.push({
              handle: o.handle,
              title: o.title,
              amount: Number(o.estimatedCost.amount),
              currencyCode: o.estimatedCost.currencyCode,
            });
          }
        });
      });
    } catch (e) {}
    shipOptions.sort(function (a, b) { return a.amount - b.amount; });
    return {
      id: cart.id,
      checkoutUrl: cart.checkoutUrl,
      totalQuantity: cart.totalQuantity,
      currencyCode: (cart.cost && cart.cost.totalAmount && cart.cost.totalAmount.currencyCode) || 'EUR',
      subtotal: cart.cost && cart.cost.subtotalAmount && Number(cart.cost.subtotalAmount.amount),
      total: cart.cost && cart.cost.totalAmount && Number(cart.cost.totalAmount.amount),
      lines: lines,
      shippingOptions: shipOptions,
      shipping: shipOptions.length ? shipOptions[0] : null,
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

  // A stable fingerprint of the local basket: handle×qty×personalisation.
  // Two chapters, or a changed name, produce a different signature.
  function basketSig(items) {
    return (items || []).map(function (it) {
      var a = it.attrs || {};
      return (it.handle || it.n) + 'x' + (it.qty || 1) + ':' +
        Object.keys(a).sort().map(function (k) { return k + '=' + a[k]; }).join(',');
    }).join('|');
  }

  // ── BUG 2 — empty the basket once an order really went through ────
  // The visitor pays on Shopify's own domain, so the site never sees the order.
  // Before handing off we flag the handoff; on the next visit, if that cart is
  // gone from Shopify, the order was placed (or the cart expired) and the local
  // mirror is cleared. Without the flag we never touch a basket.
  var HANDOFF_KEY = 'pf-checkout-handoff-v1';
  function markHandoff() {
    try { localStorage.setItem(HANDOFF_KEY, String(Date.now())); } catch (e) {}
  }
  function clearLocalBasket() {
    try {
      localStorage.removeItem('pf-cart-v1');
      localStorage.removeItem(HANDOFF_KEY);
      localStorage.removeItem('pf-checkout-v1');
    } catch (e) {}
    writeCartRef({});
    try { window.dispatchEvent(new Event('rd-cart-changed')); } catch (e) {}
    emitChange();
  }
  function reconcileAfterCheckout() {
    var pending;
    try { pending = localStorage.getItem(HANDOFF_KEY); } catch (e) { return Promise.resolve(false); }
    if (!pending) return Promise.resolve(false);
    if (!readCartRef().id) { clearLocalBasket(); return Promise.resolve(true); }
    return getCart().then(function (c) {
      // getCart() already wipes the ref when Shopify no longer knows the cart.
      if (!c || !readCartRef().id) { clearLocalBasket(); return true; }
      return false;
    }).catch(function () { return false; });
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

  // Ask Shopify to rate this cart for a delivery address. Shopify returns its
  // own delivery options (deliveryGroups) — that is the ONLY source of shipping
  // cost. Returns the normalized cart, whose .shipping is the cheapest option
  // (or null when Shopify cannot yet rate the address).
  // Shopify has TWO generations of this API and which one a store answers to
  // depends on the API version the proxy talks to:
  //   modern (2025-01+): cartDeliveryAddressesAdd + CartSelectableAddressInput
  //   legacy:             cartBuyerIdentityUpdate { deliveryAddressPreference }
  // The legacy field was REMOVED, not deprecated — sending it makes the whole
  // mutation fail with "Field is not defined on CartBuyerIdentityInput", which
  // is what silently killed the rating. We try modern first and remember which
  // generation this store speaks.
  var _deliveryApi = null;   // null = unknown · 'modern' · 'legacy'

  function schemaMismatch(err) {
    var m = String((err && err.message) || '');
    return /not defined|doesn't exist|isn't defined|Unknown argument|no field/i.test(m);
  }

  function deliverModern(cartId, address) {
    var q = 'mutation Deliver($cartId: ID!, $addresses: [CartSelectableAddressInput!]!) ' + ctx() + ' {\n' +
      '  cartDeliveryAddressesAdd(cartId: $cartId, addresses: $addresses) { cart { ' + CART_FIELDS + ' } userErrors { field message } }\n}';
    var addresses = [{
      selected: true,
      // Rate on the country/zip we have — STRICT would reject half-typed streets.
      validationStrategy: 'COUNTRY_CODE_ONLY',
      address: { deliveryAddress: address },
    }];
    return gql(q, { cartId: cartId, addresses: addresses }).then(function (d) {
      return d && d.cartDeliveryAddressesAdd;
    });
  }

  function deliverLegacy(cartId, address, country) {
    var q = 'mutation Deliver($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) ' + ctx() + ' {\n' +
      '  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) { cart { ' + CART_FIELDS + ' } userErrors { field message } }\n}';
    var bi = { countryCode: country, deliveryAddressPreference: [{ deliveryAddress: address }] };
    return gql(q, { cartId: cartId, buyerIdentity: bi }).then(function (d) {
      return d && d.cartBuyerIdentityUpdate;
    });
  }

  function setDeliveryAddress(addr) {
    var ref = readCartRef();
    if (!ref.id || !addr) return Promise.resolve(null);
    var country = (addr.countryCode || currentMarket().country || '').toUpperCase();
    var address = { countryCode: country };
    if (addr.zip) address.zip = String(addr.zip).trim();
    if (addr.city) address.city = String(addr.city).trim();
    if (addr.address1) address.address1 = String(addr.address1).trim();

    // The market/currency side of the cart — valid in both generations.
    var withCountry = setBuyerCountry(country).catch(function () { return null; });

    var attempt = function (mode) {
      return mode === 'legacy' ? deliverLegacy(ref.id, address, country) : deliverModern(ref.id, address);
    };
    var finish = function (res, mode) {
      _deliveryApi = mode;
      emitChange();
      var cart = normalizeCart(res && res.cart);
      var dbg = {
        api: mode,
        address: address,
        userErrors: (res && res.userErrors) || [],
        options: (cart && cart.shippingOptions) || [],
      };
      window.PFShop && (window.PFShop.__rateDebug = dbg);
      if (dbg.userErrors.length) {
        try { console.warn('[PFShop] delivery address rejected by Shopify:', dbg.userErrors); } catch (e) {}
      } else if (!dbg.options.length) {
        try {
          console.warn('[PFShop] Shopify returned NO delivery options for', address,
            '\n→ check Shopify Settings → Shipping and delivery: the zone covering ' +
            (address.countryCode || '?') + ' needs at least one shipping rate.');
        } catch (e) {}
      }
      return cart;
    };

    return withCountry.then(function () {
      var first = _deliveryApi || 'modern';
      return attempt(first).then(function (res) { return finish(res, first); }).catch(function (err) {
        // Unknown generation and the guess was a schema miss → try the other one.
        if (!_deliveryApi && schemaMismatch(err)) {
          var other = first === 'modern' ? 'legacy' : 'modern';
          return attempt(other).then(function (res) { return finish(res, other); });
        }
        throw err;
      });
    }).catch(function (err) {
      try { console.warn('[PFShop] rating the delivery address failed:', err); } catch (e) {}
      return null;
    });
  }

  // Rate shipping for an address at OUR checkout's address step — not only at
  // the payment handoff. Our Checkout page keeps the basket in localStorage, so
  // there is often no Shopify cart yet and setDeliveryAddress above would bail
  // out (that is why the summary used to stay "zzgl. Versand" until payment).
  // Here we mirror the local basket into a Shopify cart first, then rate it.
  function rateShipping(addr) {
    if (!addr) return Promise.resolve(null);
    return detect().then(function (ok) {
      if (!ok) return null;
      var items = localCartItems();
      if (!items.length) return null;
      // Rate the cart only when it still mirrors the basket exactly.
      var ref = readCartRef();
      if (ref.id && ref.sig === basketSig(items)) return setDeliveryAddress(addr);
      writeCartRef({});
      return Promise.all(items.map(function (it) {
        var handle = it.handle || (typeof it.n === 'string' ? it.n : null);
        var vp = it.variantId ? Promise.resolve(it.variantId) : resolveVariant(handle);
        return vp.then(function (vid) {
          return vid ? { merchandiseId: vid, quantity: it.qty || 1, attributes: lineAttrs(it) } : null;
        });
      })).then(function (lines) {
        lines = lines.filter(Boolean);
        if (!lines.length) return null;
        return cartCreate(lines).then(function (c) {
          if (!c) return null;
          var r = readCartRef();
          writeCartRef({ id: r.id, checkoutUrl: r.checkoutUrl, sig: basketSig(items) });
          return setDeliveryAddress(addr);
        });
      });
    }).catch(function () { return null; });
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
  function checkout(buyer, itemsOverride) {
    return detect().then(function (ok) {
      if (!ok) { gotoCheckoutPage(); return false; }
      var items = (itemsOverride && itemsOverride.length) ? itemsOverride : localCartItems();
      if (!items.length) {
        return getCart().then(function (c) {
          if (c && c.checkoutUrl) { markHandoff(); window.location.href = checkoutUrlWithPrefill(c.checkoutUrl, buyer); return true; }
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
          if (cart && cart.checkoutUrl) { markHandoff(); window.location.href = checkoutUrlWithPrefill(cart.checkoutUrl, buyer); return true; }
          gotoCheckoutPage();
          return false;
        });
      });
    });
  }

  function emitChange() {
    try { window.dispatchEvent(new Event('pf-shop-cart-changed')); } catch (e) {}
  }

  // ── Reviews (Judge.me) ────────────────────────────────────────
  // Review TEXT is not in the Storefront API, so it comes from Judge.me through
  // our own proxy (functions/api/reviews.js — the API token stays server-side).
  // The stars/count come from the synced `reviews.*` metafields read above.
  // Never rejects: no app, no token, no network → empty list, and the product
  // page falls back to the manual `custom.reviews` metafield.
  var _reviewsCache = {};
  function getReviews(product) {
    var gid = product && (product.id || product);
    var numeric = String(gid || '').replace(/\D/g, '');
    if (!numeric) return Promise.resolve([]);
    if (_reviewsCache[numeric]) return _reviewsCache[numeric];
    var p = fetch('/api/reviews?product_id=' + numeric)
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.reviews) || []; })
      .catch(function () { return []; });
    _reviewsCache[numeric] = p;
    return p;
  }

  // Every review in the shop (not scoped to a product): the product page shows
  // one pooled wall so a brand-new chapter isn't left looking review-less.
  // Resolves to { reviews, count, average } (average is a 1–5 number or null).
  var _allReviews = null;
  function getAllReviews() {
    if (_allReviews) return _allReviews;
    _allReviews = fetch('/api/reviews?per_page=36')
      .then(function (r) { return r.json(); })
      .then(function (d) { return { reviews: (d && d.reviews) || [], count: (d && d.count) || 0, average: (d && d.average) || null }; })
      .catch(function () { return { reviews: [], count: 0, average: null }; });
    return _allReviews;
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
    getReviews: getReviews,
    getAllReviews: getAllReviews,
    peek: peek,
    ensure: ensure,
    // cart
    getCart: getCart,
    addLine: addLine,
    updateLine: updateLine,
    removeLine: removeLine,
    setBuyerCountry: setBuyerCountry,
    setDeliveryAddress: setDeliveryAddress,
    rateShipping: rateShipping,
    checkout: checkout,
    reconcileAfterCheckout: reconcileAfterCheckout,
    // geo
    suggestCountry: suggestCountry,
  };

  // A returning visitor who paid on Shopify must not find a full basket.
  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { reconcileAfterCheckout(); });
    } else { reconcileAfterCheckout(); }
  } catch (e) {}
})();
