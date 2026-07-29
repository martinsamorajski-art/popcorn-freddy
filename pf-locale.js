/* ────────────────────────────────────────────────────────────────
   Popcorn & Freddy — locale routing  (window.PFLocale)
   ────────────────────────────────────────────────────────────────
   Shopify-native localization via URL locale prefixes. This is the ONE
   place the site decides which locale it is in. It never sets currency
   or translates product text — it only reads the prefix from the URL and
   hands the matching {country, language} to Shopify (see pf-shopify.js,
   which calls PFLocale.current() to build every @inContext directive).

   Route model — only two families have locale variants:
       /{prefix}/            → index.html      (home)
       /{prefix}/produkt/…   → Produkt.html    (product)
   Everything else (Checkout.html, legal pages) stays unprefixed and
   reads the remembered choice below. See _redirects for the rules.

   Prefix → market:  at→AT/DE · de→DE/DE · ch→CH/DE · us→US/EN
   English inside the EUR/CHF markets:  at-en→AT/EN · de-en→DE/EN · ch-en→CH/EN
   (same market, same currency, English text — for customers living in a
   German-speaking country who do not read German.)
   No/unknown prefix on an unprefixed page → remembered choice → AT.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var PREFIX = {
    at: { country: 'AT', language: 'DE' },
    'at-en': { country: 'AT', language: 'EN' },
    de: { country: 'DE', language: 'DE' },
    'de-en': { country: 'DE', language: 'EN' },
    ch: { country: 'CH', language: 'DE' },
    'ch-en': { country: 'CH', language: 'EN' },
    us: { country: 'US', language: 'EN' },
  };
  var DEFAULT = 'at';                       // fallback prefix (spec: default AT)
  var CHOICE_KEY = 'pf-locale-prefix-v1';   // remembered explicit user choice
  var EXPLICIT_KEY = 'pf-locale-explicit-v1'; // the visitor picked a locale themselves
  // First path segment when it is a known locale prefix. The two-part English
  // prefixes must come FIRST — otherwise /at-en would match the /at branch.
  var RX = /^\/(at-en|de-en|ch-en|at|de|ch|us)(?=\/|$)/i;
  // country ISO (from /api/geo) → our prefix
  var GEO = { AT: 'at', DE: 'de', CH: 'ch', US: 'us' };

  // English URL slugs for the German page files. The site has ONE file per page;
  // in an English locale the ADDRESS reads English and the Pages router rewrites
  // it back to that file (functions/_locale-router.js — keep the tables in sync).
  var EN_SLUG = {
    'kontakt.html': 'contact',
    'versand & ruecksendung.html': 'shipping-returns',
    'sicherheit & material.html': 'safety-materials',
    'produktsicherheit.html': 'product-safety',
    'geschenkkarten.html': 'gift-cards',
    'alle kapitel.html': 'chapters',
    'impressum.html': 'imprint',
    'datenschutz.html': 'privacy',
    'agb.html': 'terms',
    'cookies.html': 'cookies',
    'widerruf.html': 'withdrawal',
    'checkout.html': 'checkout',
  };
  // Swap the file name for its English slug, keeping any ?query and #hash.
  function enSlug(path, prefix) {
    var m = PREFIX[prefix || activePrefix()];
    if (!m || m.language !== 'EN') return path;
    var cut = path.search(/[?#]/);
    var file = cut === -1 ? path : path.slice(0, cut);
    var tail = cut === -1 ? '' : path.slice(cut);
    var slug = EN_SLUG[decodeURIComponent(file).toLowerCase()];
    return slug ? slug + tail : path;
  }

  // The reverse table: English address → the real (German) file name, in its
  // proper casing. Needed when switching FROM an English locale so /at-en/contact
  // becomes /at/Kontakt.html rather than a dead /at/contact.
  var DE_FILE = {
    'contact': 'Kontakt.html',
    'shipping-returns': 'Versand & Ruecksendung.html',
    'safety-materials': 'Sicherheit & Material.html',
    'product-safety': 'Produktsicherheit.html',
    'gift-cards': 'Geschenkkarten.html',
    'chapters': 'Alle Kapitel.html',
    'imprint': 'Impressum.html',
    'privacy': 'Datenschutz.html',
    'terms': 'AGB.html',
    'cookies': 'Cookies.html',
    'withdrawal': 'Widerruf.html',
    'checkout': 'Checkout.html',
  };
  function deSlug(path) {
    var cut = path.search(/[?#]/);
    var file = cut === -1 ? path : path.slice(0, cut);
    var tail = cut === -1 ? '' : path.slice(cut);
    var f = DE_FILE[decodeURIComponent(file).toLowerCase().replace(/^\//, '')];
    return f ? f + tail : path;
  }

  // The visitor's own language, from their browser/phone settings.
  // German-speaking locales → DE, everything else → EN.
  function deviceLanguage() {
    try {
      var n = (navigator.languages && navigator.languages[0]) || navigator.language || '';
      return /^de\b/i.test(n) ? 'DE' : 'EN';
    } catch (e) { return 'DE'; }
  }

  // {country, language} → prefix. Falls back to any prefix for that country, so
  // a language a market does not publish can never produce a dead route.
  function prefixFor(country, language) {
    var cc = String(country || '').toUpperCase();
    var lc = String(language || '').toUpperCase();
    var keys = Object.keys(PREFIX), i;
    for (i = 0; i < keys.length; i++) if (PREFIX[keys[i]].country === cc && PREFIX[keys[i]].language === lc) return keys[i];
    for (i = 0; i < keys.length; i++) if (PREFIX[keys[i]].country === cc) return keys[i];
    return null;
  }

  // The same market in the OTHER language (at ↔ at-en). null when the market
  // has only one language — the language nudge then never appears.
  function peerLanguage(prefix) {
    var p = prefix || activePrefix();
    var m = PREFIX[p];
    if (!m) return null;
    var peer = prefixFor(m.country, m.language === 'DE' ? 'EN' : 'DE');
    return peer && peer !== p ? peer : null;
  }

  // Prefix read straight from the URL — same source Produkt.html uses for the
  // product handle. null when the current path carries no known prefix.
  function prefixFromPath() {
    var m = RX.exec(location.pathname || '');
    return m ? m[1].toLowerCase() : null;
  }

  function savedChoice() {
    try { var c = localStorage.getItem(CHOICE_KEY); return PREFIX[c] ? c : null; } catch (e) { return null; }
  }
  function saveChoice(prefix) { try { if (PREFIX[prefix]) localStorage.setItem(CHOICE_KEY, prefix); } catch (e) {} }
  // An explicit pick (selector, or confirming a nudge) silences the nudges.
  function markExplicit() { try { localStorage.setItem(EXPLICIT_KEY, '1'); } catch (e) {} }
  function wasExplicit() { try { return localStorage.getItem(EXPLICIT_KEY) === '1'; } catch (e) { return false; } }

  // The active prefix: URL wins; on an unprefixed page fall back to the
  // remembered choice; otherwise the AT default.
  function activePrefix() { return prefixFromPath() || savedChoice() || DEFAULT; }

  // The one object every consumer reads. country/language feed Shopify's
  // @inContext; langLower ('de'/'en') keys the page-copy translations object.
  function current() {
    var p = activePrefix();
    var m = PREFIX[p] || PREFIX[DEFAULT];
    return { prefix: p, country: m.country, language: m.language, langLower: m.language.toLowerCase() };
  }

  function home(prefix) { return '/' + (prefix || activePrefix()) + '/'; }

  // THE universal rule. Prepend the active locale prefix to ANY internal path,
  // so no link anywhere can drop the locale. Exempt: external links (http/
  // mailto/tel), pure hash anchors (#faq), and paths already carrying a prefix.
  // Query strings and hashes ride along unchanged.
  function withLocale(path, prefix) {
    if (path == null || path === '') return home(prefix);
    var s = String(path);
    if (/^(https?:|mailto:|tel:|\/\/|#)/i.test(s)) return s;   // external / hash-only
    if (RX.test(s)) return s;                                   // already localized
    var pre = prefix || activePrefix();
    s = s.replace(/^\.?\//, '');                                // drop leading ./ or /
    return '/' + pre + '/' + enSlug(s, pre);
  }

  // Programmatic navigation — the localized equivalent of location.href = path.
  function go(path, prefix) { location.href = withLocale(path, prefix); }

  // Switch locale: remember the choice, then reload the SAME page under the new
  // prefix (strip any current prefix, keep the rest of the path, re-add prefix).
  // The page slug is translated on the way through, so an English address
  // becomes its German file when switching to a German locale and vice versa.
  // Switching locale never throws the basket away. The basket only stores
  // product references (handle + quantity), so Shopify re-prices it in the new
  // market on the next render. A language-only switch (at → at-en) is the same
  // market and the same currency, so nothing at all has to change.
  // A COUNTRY switch (at → ch) does change the currency: the Shopify cart id is
  // bound to one currency, so we drop that id and let the next checkout build a
  // fresh cart in the new one. The items themselves stay put.
  function resetCartForMarket(fromPrefix, toPrefix) {
    var a = PREFIX[fromPrefix], b = PREFIX[toPrefix];
    if (!a || !b || a.country === b.country) return;
    try { localStorage.removeItem('pf-shopify-cart-v1'); } catch (e) {}
  }

  function switchTo(prefix) {
    if (!PREFIX[prefix]) return;
    resetCartForMarket(activePrefix(), prefix);
    saveChoice(prefix); markExplicit();
    var stripped = (location.pathname || '/').replace(RX, '');
    if (stripped === '' || stripped === '/') { location.href = home(prefix) + location.search + location.hash; return; }
    var rest = enSlug(deSlug(stripped.replace(/^\//, '')), prefix);
    location.href = '/' + prefix + '/' + rest + location.search + location.hash;
  }

  // hreflang for the routes that exist in every locale (home + product), so
  // Google reads the German and English versions as translations, not as
  // duplicate content. Page files keep their own canonical only.
  function hreflang() {
    try {
      var path = (location.pathname || '/').replace(RX, '') || '/';
      if (path !== '/' && !/^\/produkt\//i.test(path)) return;
      var head = document.head || document.documentElement;
      var old = head.querySelectorAll('link[rel="alternate"][data-pf-hl]');
      for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
      var add = function (hl, pre) {
        var l = document.createElement('link');
        l.rel = 'alternate'; l.setAttribute('hreflang', hl); l.setAttribute('data-pf-hl', '1');
        l.href = location.origin + '/' + pre + (path === '/' ? '/' : path);
        head.appendChild(l);
      };
      Object.keys(PREFIX).forEach(function (p) {
        add(PREFIX[p].language.toLowerCase() + '-' + PREFIX[p].country, p);
      });
      add('x-default', DEFAULT);
    } catch (e) {}
  }

  // Base-href fix: index/Produkt are served under a locale prefix, so their
  // root-relative asset URLs would resolve under /at/ and 404. Pin to root.
  // Runs the moment this script loads in <head>, before the stylesheet link.
  function fixBase() {
    if ((prefixFromPath() || /\/produkt\//i.test(location.pathname)) && !document.querySelector('base')) {
      var b = document.createElement('base'); b.href = '/';
      (document.head || document.documentElement).appendChild(b);
    }
  }

  // Bare-domain first visit → detect country via /api/geo (or the remembered
  // choice) and redirect to the matching prefix. Never runs on /produkt/*
  // (that no-prefix route is a supported fallback).
  function bootstrap() {
    var path = location.pathname || '/';
    if (prefixFromPath() || /\/produkt\//i.test(path)) return;
    // Only the true bare-domain root. Never when a specific file is being served
    // (e.g. /index.html in a file preview) — that has no locale routing to hit.
    if (path !== '/') return;
    // LOOP GUARD: redirect at most once per tab. If the server ever fails to
    // honour the locale route we land back here — without this, that would be
    // an endless refresh loop.
    try {
      if (sessionStorage.getItem('pf-geo-redirected') === '1') return;
      sessionStorage.setItem('pf-geo-redirected', '1');
    } catch (e) {}
    var saved = savedChoice();
    if (saved) { location.replace(home(saved) + location.hash); return; }
    // First visit on the bare domain: country from geo, language from the device.
    // An English-speaking visitor in Austria lands on /at-en (EUR, English).
    fetch('/api/geo').then(function (r) { return r.json(); }).then(function (d) {
      var cc = (d && d.country || '').toUpperCase();
      var pre = (GEO[cc] && prefixFor(cc, deviceLanguage())) || GEO[cc] || prefixFor(PREFIX[DEFAULT].country, deviceLanguage()) || DEFAULT;
      location.replace(home(pre) + location.hash);
    }).catch(function () { location.replace(home(DEFAULT) + location.hash); });
  }

  // Give EVERY internal link the active prefix, without each component having to
  // know about locales. Skips external links, pure-hash anchors, and links that
  // already carry a prefix. Re-applied as React re-renders the tree.
  function localizeAnchors(root) {
    var as = (root || document).querySelectorAll('a[href]');
    for (var i = 0; i < as.length; i++) {
      var h = as[i].getAttribute('href');
      if (!h) continue;
      if (/^(https?:|mailto:|tel:|\/\/|#)/i.test(h)) continue;   // external / hash-only
      if (RX.test(h)) continue;                                   // already localized
      as[i].setAttribute('href', withLocale(h));
    }
  }
  function watchAnchors() {
    localizeAnchors(document);
    try {
      var mo = new MutationObserver(function () { localizeAnchors(document); });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }

  // CLICK INTERCEPTOR — the guarantee. Catches every anchor click in the capture
  // phase and rewrites the destination through withLocale at click time. This
  // works even if a component rendered an unprefixed/old href (React can reset
  // the attribute after the observer fixes it; this cannot be defeated that way).
  function onClickCapture(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    if (a.target && a.target !== '_self') return;      // new tab / named target
    if (a.hasAttribute('download')) return;
    var h = a.getAttribute('href');
    if (!h) return;
    if (/^(https?:|mailto:|tel:|\/\/|#)/i.test(h)) return;   // external / hash-only
    if (RX.test(h)) return;                                   // already localized
    var fixed = withLocale(h);
    if (fixed && fixed !== h) { e.preventDefault(); location.href = fixed; }
  }
  document.addEventListener('click', onClickCapture, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchAnchors);
  else watchAnchors();

  // URL → storage sync. When the URL carries a prefix, that prefix IS the truth:
  // remember it so the unprefixed pages (Checkout, legal) agree with it instead
  // of reading an older remembered choice. Landing on /ch makes CH/CHF the
  // remembered locale everywhere.
  function syncChoiceFromPath() {
    var p = prefixFromPath();
    if (p && p !== savedChoice()) saveChoice(p);
  }

  window.PFLocale = {
    VERSION: 'universal-10',
    PREFIX: PREFIX, DEFAULT: DEFAULT, EN_SLUG: EN_SLUG,
    prefixFromPath: prefixFromPath, activePrefix: activePrefix, current: current,
    withLocale: withLocale, home: home, go: go,
    savedChoice: savedChoice, saveChoice: saveChoice, switchTo: switchTo,
    markExplicit: markExplicit, wasExplicit: wasExplicit,
    deviceLanguage: deviceLanguage, prefixFor: prefixFor, peerLanguage: peerLanguage,
    fixBase: fixBase, bootstrap: bootstrap, localizeAnchors: localizeAnchors,
    syncChoiceFromPath: syncChoiceFromPath, hreflang: hreflang,
  };
  try { console.log('[PFLocale] version universal-10 · prefix=' + activePrefix()); } catch (e) {}

  syncChoiceFromPath();
  fixBase();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hreflang);
  else hreflang();
})();
