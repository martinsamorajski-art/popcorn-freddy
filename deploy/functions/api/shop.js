// ────────────────────────────────────────────────────────────────
// Shopify Storefront API proxy  (Popcorn & Freddy — headless)
// Cloudflare Pages Function — served at /api/shop
// ────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
//   The website must never contain a Shopify token. This function runs
//   at Cloudflare's edge, holds the token as an environment variable,
//   and forwards GraphQL requests to the Shopify STOREFRONT API only.
//   The browser talks to /api/shop — never directly to Shopify.
//
//   It ONLY reaches the Storefront API (public catalog + cart + checkout).
//   It can NOT touch the Admin API, so a leaked request can never change
//   your store. Never expose an Admin token here.
//
// ENVIRONMENT VARIABLES (Cloudflare → Pages project → Settings →
// Variables and Secrets; add to BOTH Production and Preview)
//   SHOPIFY_STORE_DOMAIN     e.g. popcorn-freddy.myshopify.com
//   SHOPIFY_STOREFRONT_TOKEN the Storefront API access token (public token)
//   SHOPIFY_API_VERSION      optional, defaults to a known-good version
// ────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function onRequestOptions() {
  return new Response('', { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  const domain = env.SHOPIFY_STORE_DOMAIN;
  const token = env.SHOPIFY_STOREFRONT_TOKEN;
  const apiVersion = env.SHOPIFY_API_VERSION || '2024-10';

  // Not configured yet → tell the frontend to stay in local/preview mode.
  if (!domain || !token) {
    return new Response(
      JSON.stringify({ configured: false, errors: [{ message: 'Shopify is not configured yet (missing SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).' }] }),
      { status: 501, headers: CORS },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ errors: [{ message: 'Invalid JSON body.' }] }), { status: 400, headers: CORS });
  }
  const { query, variables } = body || {};
  if (typeof query !== 'string' || !query.trim()) {
    return new Response(JSON.stringify({ errors: [{ message: 'Missing GraphQL query.' }] }), { status: 400, headers: CORS });
  }

  const endpoint = 'https://' + domain + '/api/' + apiVersion + '/graphql.json';
  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query, variables: variables || {} }),
    });
    const text = await upstream.text();
    return new Response(text, { status: upstream.status, headers: CORS });
  } catch (e) {
    return new Response(JSON.stringify({ errors: [{ message: 'Upstream Shopify request failed.', detail: String(e) }] }), { status: 502, headers: CORS });
  }
}

// Any other method.
export async function onRequest() {
  return new Response(JSON.stringify({ errors: [{ message: 'Use POST.' }] }), { status: 405, headers: CORS });
}
