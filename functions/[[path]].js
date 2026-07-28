// ────────────────────────────────────────────────────────────────
// Locale-prefix router  (Popcorn & Freddy — Cloudflare Pages Function)
// ────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
// Cloudflare Pages does NOT support `200` rewrites in _redirects (that is a
// Netlify feature). A `200` line there behaves like a 3xx redirect, so the
// browser URL is rewritten to the destination and the locale prefix is LOST:
//     /at/produkt/kapitel-1  →  /Produkt.html   (URL becomes /Produkt)
//     /at/Geschenkkarten.html →  /Geschenkkarten.html
// This function performs a REAL rewrite instead: it serves the underlying HTML
// file while leaving the visible URL untouched, so pf-locale.js can keep
// reading the locale from window.location.pathname.
//
// Route model (same files for every locale — no per-locale copies):
//     /{locale}/                → index.html
//     /{locale}/produkt/<handle> → Produkt.html
//     /{locale}/<anything.html>  → <anything.html>
//     /produkt/<handle>          → Produkt.html   (no-prefix fallback)
// Everything else falls through to normal static asset serving.

const LOCALES = ['at', 'de', 'ch', 'us'];

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const first = (segments[0] || '').toLowerCase();

  // Never shadow the API functions (functions/api/*) or real asset folders.
  if (first === 'api') return next();

  let target = null;

  if (LOCALES.includes(first)) {
    const rest = segments.slice(1);
    if (rest.length === 0) target = '/index.html';
    else if (rest[0].toLowerCase() === 'produkt') target = '/Produkt.html';
    else target = '/' + rest.map(decodeURIComponent).map(encodeURIComponent).join('/');
  } else if (first === 'produkt') {
    // Legacy no-prefix product route, kept working.
    target = '/Produkt.html';
  }

  if (!target) return next();

  // Rewrite: fetch the target asset but keep the browser URL as-is.
  const assetUrl = new URL(target, url.origin);
  assetUrl.search = url.search;
  return next(new Request(assetUrl.toString(), request));
}
