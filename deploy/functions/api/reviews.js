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
  const perPage = Math.min(Number(url.searchParams.get('per_page')) || 12, 50);

  const token = env.JUDGEME_API_TOKEN;
  const shop = env.JUDGEME_SHOP_DOMAIN || env.SHOPIFY_STORE_DOMAIN;
  if (!token || !shop) {
    return json({ configured: false, reviews: [] });
  }
  if (!externalId) {
    return json({ configured: true, reviews: [], error: 'product_id required' }, 400);
  }

  const base = 'https://judge.me/api/v1';
  const auth = `api_token=${encodeURIComponent(token)}&shop_domain=${encodeURIComponent(shop)}`;

  try {
    // Judge.me keys reviews by ITS OWN product id, so resolve the Shopify id first.
    let jmProductId = null;
    const pRes = await fetch(`${base}/products/-1?${auth}&external_id=${externalId}`);
    if (pRes.ok) {
      const pJson = await pRes.json();
      jmProductId = pJson && pJson.product && pJson.product.id;
    }

    const query = jmProductId
      ? `${base}/reviews?${auth}&product_id=${jmProductId}&per_page=${perPage}`
      : `${base}/reviews?${auth}&external_product_id=${externalId}&per_page=${perPage}`;
    const rRes = await fetch(query);
    if (!rRes.ok) {
      return json({ configured: true, reviews: [], error: 'judge.me ' + rRes.status }, 502);
    }
    const data = await rRes.json();

    // Normalize to the shape the reviews section already renders:
    //   q = quote · n = name · m = meta line · stars · verified
    const reviews = (data.reviews || [])
      .filter((r) => r && (r.body || '').trim() && (r.rating || 0) >= 3)
      .map((r) => ({
        q: String(r.body).trim(),
        n: (r.reviewer && (r.reviewer.name || r.reviewer.email || '').split('@')[0]) || 'Anonym',
        m: r.product_title || '',
        stars: Number(r.rating) || 5,
        verified: !!r.verified && r.verified !== 'unverified',
        date: r.created_at || null,
      }));

    return json({ configured: true, reviews });
  } catch (e) {
    return json({ configured: true, reviews: [], error: String(e && e.message || e) }, 502);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
