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
   No/unknown prefix on an unprefixed page → remembered choice → AT.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var PREFIX = {
    at: { country: 'AT', language: 'DE' },
    de: { country: 'DE', language: 'DE' },
    ch: { country: 'CH', language: 'DE' },
    us: { country: 'US', language: 'EN' },
  };
  var DEFAULT = 'at';                       // fallback prefix (spec: default AT)
  var CHOICE_KEY = 'pf-locale-prefix-v1';   // remembered explicit user choice
  // First path segment when it is a known locale prefix.
  var RX = /^\/(at|de|ch|us)(?=\/|$)/i;
  // country ISO (from /api/geo) → our prefix
  var GEO = { AT: 'at', DE: 'de', CH: 'ch', US: 'us' };

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

  // Prefix an app route (/ or /produkt/…) with a locale. External links,
  // anchors, mailto and already-prefixed paths pass through untouched.
  function withLocale(path, prefix) {
    if (!path) return home(prefix);
    if (/^(https?:|mailto:|tel:|#)/i.test(path)) return path;
    if (RX.test(path)) return path;                 // already localized
    var pre = prefix || activePrefix();
    if (path.charAt(0) !== '/') path = '/' + path;
    if (path === '/') return '/' + pre + '/';
    if (/^\/produkt\//i.test(path)) return '/' + pre + path;
    return path;                                    // not a localizable route
  }

  // Switch locale: remember the choice, then reload the equivalent page under
  // the new prefix (home / product get a prefix; unprefixed pages just reload
  // so they pick up the remembered choice).
  function switchTo(prefix) {
    if (!PREFIX[prefix]) return;
    saveChoice(prefix);
    var stripped = (location.pathname || '/').replace(RX, '');
    var target;
    if (stripped === '' || stripped === '/') target = home(prefix);
    else if (/^\/produkt\//i.test(stripped)) target = '/' + prefix + stripped;
    else target = stripped;                         // unprefixed subpage stays bare
    location.href = target + location.search + location.hash;
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
    var saved = savedChoice();
    if (saved) { location.replace(home(saved) + location.hash); return; }
    fetch('/api/geo').then(function (r) { return r.json(); }).then(function (d) {
      var pre = (d && GEO[(d.country || '').toUpperCase()]) || DEFAULT;
      location.replace(home(pre) + location.hash);
    }).catch(function () { location.replace(home(DEFAULT) + location.hash); });
  }

  // Give every in-page product link the active prefix, without each component
  // having to know about locales. Re-applied as React re-renders the tree.
  function localizeAnchors(root) {
    var as = (root || document).querySelectorAll('a[href^="/produkt/"]');
    for (var i = 0; i < as.length; i++) {
      var h = as[i].getAttribute('href');
      if (h && !RX.test(h)) as[i].setAttribute('href', withLocale(h));
    }
  }
  function watchAnchors() {
    localizeAnchors(document);
    try {
      var mo = new MutationObserver(function () { localizeAnchors(document); });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchAnchors);
  else watchAnchors();

  window.PFLocale = {
    PREFIX: PREFIX, DEFAULT: DEFAULT,
    prefixFromPath: prefixFromPath, activePrefix: activePrefix, current: current,
    withLocale: withLocale, home: home,
    savedChoice: savedChoice, saveChoice: saveChoice, switchTo: switchTo,
    fixBase: fixBase, bootstrap: bootstrap, localizeAnchors: localizeAnchors,
  };

  fixBase();
})();
