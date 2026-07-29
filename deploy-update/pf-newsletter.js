/* ────────────────────────────────────────────────────────────────
   Popcorn & Freddy — newsletter signup  (window.PFNews)
   ────────────────────────────────────────────────────────────────
   One place for every signup on the site (footer form, home-page popup).
   It posts to /api/newsletter, which holds the Klaviyo key and picks the
   language list from the locale prefix. Klaviyo owns everything after:
   double opt-in mail, welcome flow, unique discount code, unsubscribe.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var SEEN_KEY = 'pf-news-signed-v1';   // this browser already subscribed
  var EMAIL_RX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function valid(email) { return EMAIL_RX.test(String(email || '').trim()); }
  function signedUp() { try { return localStorage.getItem(SEEN_KEY) === '1'; } catch (e) { return false; } }
  function markSignedUp() { try { localStorage.setItem(SEEN_KEY, '1'); } catch (e) {} }
  function locale() {
    try { if (window.PFLocale) return PFLocale.activePrefix(); } catch (e) {}
    return 'at';
  }

  // Resolves { ok, error }. Never rejects — the UI decides what to show.
  function subscribe(email, source, trap) {
    if (!valid(email)) return Promise.resolve({ ok: false, error: 'bad_email' });
    return fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(email).trim(),
        locale: locale(),
        source: source || 'website',
        trap: trap || '',
      }),
    }).then(function (r) {
      return r.json().catch(function () { return { ok: r.ok }; });
    }).then(function (d) {
      if (d && d.ok) markSignedUp();
      return d || { ok: false, error: 'empty' };
    }).catch(function (e) {
      return { ok: false, error: 'network', detail: String(e) };
    });
  }

  window.PFNews = {
    VERSION: 1,
    valid: valid,
    subscribe: subscribe,
    signedUp: signedUp,
    markSignedUp: markSignedUp,
    SEEN_KEY: SEEN_KEY,
  };
})();
