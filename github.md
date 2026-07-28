# GitHub source

repo: martinsamorajski-art/popcorn-freddy
branch: main

## Last sync
date: 2026-07-27T15:20:00Z

### Updated in this project
- Cart identity unified on the Shopify **handle** across every add path (homepage cards, bottom bar, hero, product template) so a chapter added from anywhere merges into ONE basket line.
- Chapter cards (index + Alle Kapitel) now load **title, image, price, stock** live from Shopify and store the same title/image in the cart.
- Cache-busting `?v=` on all script/style tags so deploys aren't masked by stale cached JS.
- Retired the legacy per-chapter pages `Der Fluesterwald v3.html` + `Der Silbersee - Kapitel 2.html` (and their exclusive scripts `rd-chapter1.jsx`, `rd-chapter1-sections.jsx`, `rd-chapter1-shop.jsx`, `rd-chapter2.jsx`, `rd-chapter2-shop.jsx`, `rd-chapter2-trust.jsx`). Everything now uses the single `/produkt/<handle>` template. 301 redirects added in `netlify.toml`.
- Shared, still-used: `rd-chapter1-trust.jsx`, `rd-gpsr.jsx` (Produkt.html depends on them).

## Sync history
- 2026-07-27T12:40:00Z — fixed blank product page (root-pinned asset URLs), added load-timeout fallback, confirmed `kapitel-1-fluesterwald` live from Shopify; 30 fonts under `assets/fonts/`.
- 2026-07-27T12:07:32Z — connected repo, verified fonts + migration files present.

## Screen map
| Screen | Repo files |
|---|---|
| Homepage | index.html, rd-styles.css, rd-world.jsx, rd-ui.jsx, rd-hero.jsx, rd-close.jsx |
| All chapters | Alle Kapitel.html, rd-world.jsx, rd-close.jsx |
| Product template (dynamic) | Produkt.html, rd-product-shop.jsx, rd-chapter1-trust.jsx, rd-gpsr.jsx, pf-shopify.js |
| Cart / Checkout | Checkout.html, rd-checkout*.jsx, rd-checkout.css, pf-shopify.js |
| Shopify data proxy | netlify/functions/shopify.mjs, netlify/functions/geo.mjs |
| Fonts | assets/fonts/*.ttf, rd-styles.css (@font-face) |
