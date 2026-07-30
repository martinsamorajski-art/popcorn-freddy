// ────────────────────────────────────────────────────────────────
// /api/reviews — Judge.me review text for one product (Cloudflare Pages Fn)
// ────────────────────────────────────────────────────────────────
// WHY a proxy: review TEXT is not exposed through Shopify's Storefront API,
// and Judge.me's API token must never sit in client code. The aggregate score
// (stars + count) does come from Shopify — Judge.me syncs it into the standard
// `reviews.rating` / `reviews.rating_count` metafields, which pf-shopify.js
// already reads. This endpoint only supplies the quotes.
//
// ENVIRONMENT VARIABLES (Cloudflare → Pages project → Settings →
// Variables and Secrets; add to BOTH Production and Preview)
//   JUDGEME_API_TOKEN    Judge.me → Settings → API tokens (private token)
//   JUDGEME_SHOP_DOMAIN  optional, defaults to SHOPIFY_STORE_DOMAIN
//
// Not configured → { configured: false, reviews: [] }. The product page then
// falls back to the `custom.reviews` metafield, so nothing breaks.
//
//   GET /api/reviews?product_id=<shopify numeric id>&per_page=12
//   GET /api/reviews?per_page=24            ← ALL shop reviews (no product_id)
// The product page asks for the whole shop, so every chapter shows the same
// pooled wall of reviews rather than its own handful.
// ────────────────────────────────────────────────────────────────

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  // Reviews change rarely; let the edge hold them briefly.
  'Cache-Control': 'public, max-age=300, s-maxage=900',
  'Access-Control-Allow-Origin': '*',
};

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const externalId = (url.searchParams.get('product_id') || '').replace(/\D/g, '');
  const perPage = Math.min(Number(url.searchParams.get('per_page')) || 24, 50);

  const token = env.JUDGEME_API_TOKEN;
  const shop = env.JUDGEME_SHOP_DOMAIN || env.SHOPIFY_STORE_DOMAIN;
  if (!token || !shop) {
    return json({ configured: false, reviews: [] });
  }

  const base = 'https://judge.me/api/v1';
  const auth = `api_token=${encodeURIComponent(token)}&shop_domain=${encodeURIComponent(shop)}`;

  // TEMP DEBUG: /api/reviews?debug=1 → confirm what we send + Judge.me's reply.
  if (url.searchParams.get('debug') === '1') {
    const probe = await fetch(`${base}/products?${auth}&per_page=1`);
    let bodyText = '';
    try { bodyText = (await probe.text()).slice(0, 400); } catch (e) { bodyText = String(e); }
    return json({
      debug: true,
      shop_domain_sent: shop,
      token_len: token.length,
      token_preview: token.slice(0, 4) + '…' + token.slice(-2),
      judgeme_status: probe.status,
      judgeme_body: bodyText,
    });
  }

  try {
    let query;
    if (externalId) {
      // One product: Judge.me keys reviews by ITS OWN id, so resolve first.
      let jmProductId = null;
      const pRes = await fetch(`${base}/products/-1?${auth}&external_id=${externalId}`);
      if (pRes.ok) {
        const pJson = await pRes.json();
        jmProductId = pJson && pJson.product && pJson.product.id;
      }
      query = jmProductId
        ? `${base}/reviews?${auth}&product_id=${jmProductId}&per_page=${perPage}`
        : `${base}/reviews?${auth}&external_product_id=${externalId}&per_page=${perPage}`;
    } else {
      // No product_id → Judge.me's /reviews index REQUIRES a product_id, so we
      // can't ask for "everything" in one call. Instead: list the shop's
      // products, pull each one's reviews, then merge. Chapters are few, the
      // result is edge-cached, so the fan-out is cheap.
      const pRes = await fetch(`${base}/products?${auth}&per_page=100`);
      if (!pRes.ok) {
        return json({ configured: true, reviews: [], error: 'judge.me products ' + pRes.status });
      }
      const pJson = await pRes.json();
      const ids = (pJson.products || []).map((p) => p && p.id).filter(Boolean);
      const per = Math.max(3, Math.ceil(perPage / Math.max(ids.length, 1)) + 3);
      const lists = await Promise.all(ids.map((id) =>
        fetch(`${base}/reviews?${auth}&product_id=${id}&per_page=${per}`)
          .then((r) => (r.ok ? r.json() : { reviews: [] }))
          .then((d) => d.reviews || [])
          .catch(() => [])
      ));
      const merged = [].concat.apply([], lists)
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
      return finish(merged, perPage);
    }
    const rRes = await fetch(query);
    if (!rRes.ok) {
      return json({ configured: true, reviews: [], error: 'judge.me ' + rRes.status });
    }
    const data = await rRes.json();
    return finish(data.reviews || [], perPage);
  } catch (e) {
    return json({ configured: true, reviews: [], error: String(e && e.message || e) });
  }
}

// Shape Judge.me rows into what the reviews section renders, and compute the
// aggregate over the rated rows.
function finish(rawReviews, perPage) {
  const reviews = rawReviews
    .filter((r) => r && (r.body || '').trim() && (r.rating || 0) >= 3)
    .slice(0, perPage)
    .map((r) => ({
      q: String(r.body).trim(),
      n: (r.reviewer && (r.reviewer.name || r.reviewer.email || '').split('@')[0]) || 'Anonym',
      m: r.product_title || '',
      stars: Number(r.rating) || 5,
      verified: !!r.verified && r.verified !== 'unverified',
      date: r.created_at || null,
    }));
  const rated = rawReviews.filter((r) => r && (r.rating || 0) > 0);
  const avg = rated.length ? rated.reduce((s, r) => s + Number(r.rating), 0) / rated.length : null;
  return json({ configured: true, reviews, count: rated.length, average: avg });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
