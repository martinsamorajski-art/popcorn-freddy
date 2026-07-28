# Deploying on Cloudflare Pages

The site runs identically on Netlify and Cloudflare Pages. Both sets of
config live in the repo side by side — keeping them does no harm, and it
means you can switch back at any time.

| Concern | Netlify | Cloudflare Pages |
|---|---|---|
| Shopify proxy | `netlify/functions/shopify.mjs` | `functions/api/shop.js` |
| Country hint | `netlify/functions/geo.mjs` | `functions/api/geo.js` |
| Redirects | `netlify.toml` `[[redirects]]` | `_redirects` |
| Cache headers | `netlify.toml` `[[headers]]` | `_headers` |
| Secrets | Site settings → Environment | Settings → Variables and Secrets |

Both platforms serve the same URLs: `/api/shop`, `/api/geo`, and
`/produkt/<handle>`. The frontend needs no change whatsoever.

## Environment variables

Set these in Cloudflare → your Pages project → **Settings → Variables and
Secrets**, for **both** Production and Preview:

| Name | Value | Type |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` | Plaintext |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API access token | **Secret** |
| `SHOPIFY_API_VERSION` | optional, e.g. `2024-10` | Plaintext |

Never put an **Admin** API token here. The proxy only ever reaches the
Storefront API, which cannot modify the store.

## Build settings

This is a plain static site — there is no build step.

- Framework preset: **None**
- Build command: *(leave empty)*
- Build output directory: `/`

## Checks after the first deploy

1. The page shows the temporary `build …` badge bottom-left.
2. `/api/geo` returns `{"country":"AT"}` (or your country).
3. `/api/shop` returns `405 Use POST` in the browser — that is correct;
   it only accepts POST. If it returns `501 configured: false`, the
   environment variables are missing.
4. `/produkt/kapitel-1-fluesterwald` loads the product template.

## Free-tier limits (as of 2026)

Unlimited bandwidth, 500 builds/month, 20,000 files per site. Pages
Functions count against the Workers free plan: 100,000 requests/day.
Roughly one `/api/shop` call per visit, so ~100k visits/day before any
cost. No credit card required; commercial use allowed.
