// ────────────────────────────────────────────────────────────────
// Shared locale rewrite helper (Cloudflare Pages Function)
// Filename starts with "_" so Pages does NOT expose it as a route.
// ────────────────────────────────────────────────────────────────
// WHY: Cloudflare Pages does not honour `200` rewrites in _redirects (that is a
// Netlify feature) — it performs a real redirect, which changes the address bar
// and destroys the locale prefix:
//     /at/produkt/kapitel-1  →  /Produkt.html   (URL becomes /Produkt)
// This does a TRUE rewrite: serve the underlying file, leave the URL untouched,
// so pf-locale.js keeps reading the locale from window.location.pathname.
//
// Mapping (same files for every locale — no per-locale copies):
//     /{locale}/                 → index.html
//     /{locale}/produkt/<handle> → Produkt.html
//     /{locale}/<page>.html      → <page>.html
//
// Safety: these functions are mounted ONLY under /at, /de, /ch, /us and
// /produkt (see functions/<locale>/[[path]].js). Assets (/assets/*, *.css,
// *.js, *.jsx) and the API (/api/*) are never intercepted.

export async function rewriteLocale(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // ['at','produkt','kapitel-1'] → drop the locale segment
  const segments = url.pathname.split('/').filter(Boolean);
  const rest = segments.slice(1);

  let target;
  if (rest.length === 0) {
    target = '/index.html';                       // /at  or  /at/
  } else if (rest[0].toLowerCase() === 'produkt') {
    target = '/Produkt.html';                     // /at/produkt/<handle>
  } else {
    target = '/' + rest.join('/');                // /at/Kontakt.html → /Kontakt.html
  }

  return serve(context, url, target, next, request);
}

// The no-prefix legacy route: /produkt/<handle> → Produkt.html
export async function rewriteProduct(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  return serve(context, url, '/Produkt.html', next, request);
}

async function serve(context, url, target, next, request) {
  const assetUrl = new URL(target, url.origin);
  assetUrl.search = url.search;
  try {
    // next(<request>) fetches that asset WITHOUT changing the visible URL.
    return await next(new Request(assetUrl.toString(), { method: 'GET', headers: request.headers }));
  } catch (e) {
    // Never take the page down if the rewrite fails — fall through to normal
    // asset serving rather than erroring.
    return next();
  }
}
