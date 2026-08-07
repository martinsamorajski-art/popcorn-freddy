# Headless Shopify — Setup Manual (Popcorn & Freddy)

Your stack stays exactly as it is:
**Frontend (this repo) → GitHub → Netlify → Website.**
Shopify is **only the backend** (products, prices, images, inventory, reviews,
cart, orders, discounts, shipping, checkout, markets/currencies). The site is
**not** a Shopify theme and the design is unchanged.

The browser never sees a Shopify token. Every request goes through a Netlify
Function (`/api/shop`) that adds the Storefront token server-side.

> **Two things unlock the whole site:** `SHOPIFY_STORE_DOMAIN` and
> `SHOPIFY_STOREFRONT_TOKEN` in Netlify (Step 6). Until then the site runs in
> safe preview mode with sample data — nothing breaks.

---

# Do it in THIS order

Steps 1–6 get you live. Steps 7–8 are polish. Follow the order — e.g. currencies
won't appear until Shopify Payments is on (Step 3).

---

## STEP 1 — Create the Storefront app & get the token

This is the step people get stuck on. The token is **hidden until you install
the app.** Exact clicks:

1. Shopify admin → bottom-left **Settings** (gear icon).
2. Left menu → **Apps and sales channels**.
3. Click **Develop apps** (top-right).
   - *Don't see it?* Click **Allow custom app development** first, confirm, then
     **Develop apps** appears. (You need to be the store owner / have full
     permissions.)
4. **Create an app** → name it `Popcorn Storefront` → **Create app**.
5. Open the **Configuration** tab (not "Overview").
6. Find **Storefront API integration** → click **Configure**.
7. Tick these **Storefront API access scopes**, then **Save**:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_write_checkouts` + `unauthenticated_read_checkouts`
   - `unauthenticated_read_content` / metafields (for the extra product content)
   - `unauthenticated_read_selling_plans` (optional)
8. Go to the **API credentials** tab → click **Install app** (top-right) →
   **Install**.
9. **Now** scroll down to **Storefront API access token** → click to reveal →
   **copy it.** This is the *public* token — it's the only one the site uses.
   - ⚠️ Ignore the **Admin API access token**. Never put it on the site.
10. Note your store domain: it's the `xxxxx.myshopify.com` shown in your admin
    URL / Settings → Domains. Keep the `.myshopify.com` one even if you have a
    custom domain.

**End of Step 1 you should have two strings:**
`SHOPIFY_STORE_DOMAIN` = `xxxxx.myshopify.com`   ·   `SHOPIFY_STOREFRONT_TOKEN` = long hex string.

---

## STEP 2 — Add your products

For each product: **Products → Add product**.
- **Title**, **Description**, **Media** (images), **Pricing → Price**.
- **Inventory:** tick **Track quantity** and enter the stock number.
- Save.

Then get the **handle** (the site uses it to load the page):
- Open the product → scroll to **Search engine listing** → **Edit** → the
  **URL handle** field. That word is the handle (e.g. `kapitel-1-fluesterwald`).
- The code currently expects `kapitel-1-fluesterwald` and
  `kapitel-2-silbersee`. **Either** name your Shopify handles to match, **or**
  tell me your real handles and I'll update the catalog in the code.

---

## STEP 3 — Turn on payments & currencies FIRST

Multi-currency (the CHF market) only works with Shopify Payments, so do this
before Markets.

1. **Settings → Payments → Shopify Payments** → activate / complete the account
   details. This enables **EUR and CHF** payouts.
2. **Settings → Shipping and delivery** → add shipping zones + rates for
   **Germany, Austria, Switzerland**.
3. **Settings → Taxes and duties** → configure **DE / AT / CH VAT**.

(Rates + taxes are applied on Shopify's hosted checkout — you don't build them.)

---

## STEP 4 — Markets (DE / AT / CH)

**Settings → Markets.** A default market already exists based on your country.

Create the two launch markets:

| Market name | Countries | Currency | Language |
|---|---|---|---|
| **Zentraleuropa** | Germany, Austria | **EUR** | German |
| **Schweiz** | Switzerland | **CHF** | German |

How:
- **Add market** → name it → add the country/countries → **Add market**.
- Open the market → **Currency**. A single-country market (Schweiz) auto-picks
  **CHF**. The multi-country market (Zentraleuropa) uses **EUR**.
- **Set real prices per market**, don't rely on auto-conversion for CHF: open the
  market → **Products and pricing / Catalog** → set the CHF price you want. The
  site shows exactly what Shopify returns — it never converts currencies itself.
- Leave language as **German** for all three.
- **United States / USD:** don't create it now. It's already wired in the code
  (inactive). When you want it later: add the US market in Shopify, then tell me
  to flip it on (`active:true` in `pf-shopify.js`) — no redesign.

---

## STEP 5 — Metafields (only the extra content the design shows)

Native fields (title, description, images, price, inventory) need **no**
metafields. Only add these for the extra blocks your product page already shows.
All are optional — anything empty simply doesn't render.

**Settings → Custom data → Products → Add definition.** For each: set the
**Namespace and key** to `custom.<key>` from the table, and turn on
**Storefront access: read** (so the token can read it).

| Key (`custom.…`) | Type | Shows as |
|---|---|---|
| `caps` | Single line text | Eyebrow above title ("Kapitel 01 · …") |
| `emotion` | Single line text | "Gefühl / Emotion" pill |
| `bausatz` | Single line text | "Bausatz / Building set" pill (z. B. „Auto") |
| `meta_rows` | JSON | Icon fact row `[{"icon":"user","t":"Ab 4 Jahren"}]` |
| `inside_items` | JSON | "In der Box" list `[{"icon":"book","t":"Titel","d":"…"}]` |
| `details` | JSON | "Auf einen Blick" table `[{"k":"Alter","v":"Ab 4"}]` |
| `story_title` | Single line text | Story heading |
| `story_body` | Multi-line text | Story paragraph |
| `reviews` | JSON | `[{"q":"Zitat","n":"Lena K.","m":"Mama von Theo (5)"}]` |
| `rating` | Decimal | e.g. `4.8` |
| `rating_count` | Integer | e.g. `142` |
| `scarcity` | Single line text | "~250 Boxen pro Monat" note |
| `guarantee` | Single line text | Guarantee line |
| `gift_note` | Single line text | Gift note |
| `personalization_label` | Single line text | Child-name field label |

(icons available: user, book, build, truck, palette, compass, archive, gift)

---

## STEP 6 — Netlify environment variables (this makes it LIVE)

Netlify → your site → **Site configuration → Environment variables → Add a
variable**. Do **not** commit these to GitHub.

| Key | Value | Required |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | `xxxxx.myshopify.com` | ✅ |
| `SHOPIFY_STOREFRONT_TOKEN` | your Storefront token from Step 1 | ✅ |
| `SHOPIFY_API_VERSION` | `2024-10` | optional |

Then **Deploys → Trigger deploy → Deploy site**. When both are present the site
switches from sample mode to real Shopify data automatically. Design unchanged.

**Fastest live test:** Step 1 → one product in Step 2 → Step 6 → redeploy →
open the site.

---

## STEP 7 — Reviews (pick one)

- **Simplest (works now):** fill the `reviews`, `rating`, `rating_count`
  metafields per product (Step 5). The existing reviews section renders them.
- **Reviews app** (Judge.me, Loox, Okendo…): install it, then tell me which one
  and I'll wire its Storefront review data into the same section — design stays
  identical.

---

## STEP 8 — Discounts

**Discounts** in the admin → create codes or automatic discounts. They apply in
Shopify's cart/checkout automatically — no code change.

---

# Quick "I can't find it" troubleshooting

- **No "Develop apps":** click **Allow custom app development** first; you must
  be owner / have full app permissions.
- **No Storefront token showing:** you must **Install app** (Step 1.8) before it
  appears; then reveal it under **API credentials**.
- **Grabbed the Admin token by mistake:** don't use it. Only the **Storefront
  API access token** goes on the site.
- **No currency choice in a market:** Shopify Payments isn't active yet (Step 3).
- **Site still shows sample products after deploy:** the two Netlify env vars
  aren't set, are misspelled, or you didn't redeploy after adding them.
- **Product page is blank / 404:** the Shopify handle doesn't match the handle
  in the code — send me the real handles.

---

# What I still need from you

1. **Store domain** (`xxxxx.myshopify.com`).
2. **Storefront API access token** (public — never the Admin token). *Safer to
   paste it directly into Netlify yourself (Step 6) than into chat.*
3. Your final **product handles** (if not the two defaults).
4. Reviews choice: **metafields** or a **reviews app** (which one).

---

## Architecture reference (how it fits together)

| Piece | File | Role |
|---|---|---|
| Data layer | `pf-shopify.js` (`window.PFShop`) | Only place that talks to Shopify. Markets, product load, cart, checkout, geo. |
| Storefront proxy | `netlify/functions/shopify.mjs` → `/api/shop` | Holds the token server-side, forwards GraphQL. Never touches Admin API. |
| Geo hint | `netlify/functions/geo.mjs` → `/api/geo` | Visitor country for the subtle suggestion. No redirect, no PII. |
| Product template | `Produkt.html` + `rd-product-shop.jsx` | **One** reusable page at `/produkt/<handle>`. |
| Chapter catalog | `PFShop.getChapters()` → `usePFChapters()` | The `kapitel` collection (manual order), tag `kapitel` as fallback. Feeds the index cards and Alle Kapitel. |
| Shared store | `PFShop.peek / ensure` | One in-memory copy per product. Cards, product page and cart all read it → they can never disagree. |
| Country/currency UI | `rd-ui.jsx` | Discreet selector + "It looks like you're in Switzerland…" suggestion. Remembers the choice. |

**Adding a chapter = create the product in Shopify and put it in the `kapitel`
collection.** Nothing else. No code change, no new HTML page, no catalog entry.
It appears on the index cards, on `Alle Kapitel`, and at `/produkt/<handle>`.

There is **no hardcoded product data anywhere** — no images, titles, prices,
stock or chapter list in the code. Until Shopify answers, cards render as
skeletons in the same frame; if the collection is empty the section shows a
short "chapters are being prepared" note.

### Chapter metafields (namespace `custom`)

Native Shopify fields carry title, description, images, price and inventory.
These metafields carry the listing content the design shows:

| Key | Type | Shown |
|---|---|---|
| `chapter_no` | integer | "№ 01" badge and list order |
| `teaser` | single line text | Card description on *Alle Kapitel* |
| `toy` | single line text | "+ Auto-Bausatz" line under the title |
| `release_label` | single line text | "Erscheint · März 2026" on upcoming chapters |
| `badge` | single line text | Corner stamp (e.g. "Neu"), optional |

**Upcoming chapters** are normal products in the collection that are *not*
available for sale (unpublished as buyable / zero stock) — the card then
renders the "notify me" variant automatically.
