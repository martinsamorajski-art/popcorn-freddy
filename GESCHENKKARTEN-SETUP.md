# Backoffice — Setup (Netlify Functions + Blobs)

Gift cards, discount codes and inventory run on serverless functions backed by
**Netlify Blobs** (a built-in key/value store — no external database to sign up for).

```
netlify/functions/
  gift-generate.mjs    Issue gift-card codes   (admin-only)
  gift-check.mjs       Check gift-card balance (public)
  gift-redeem.mjs      Deduct gift-card balance at checkout
  discount-admin.mjs   Create / list / delete discount codes (admin-only)
  discount-check.mjs   Validate a discount code (public)
  discount-redeem.mjs  Record a discount-code use at checkout
  inventory.mjs        List (public) / save / delete inventory (writes admin-only)
netlify.toml           Functions + redirects config
package.json           Declares @netlify/blobs
Backoffice.html        Admin UI: Gift cards · Discount codes · Inventory
```

---

## ⚠️ Important: this needs a build step

Folder **drag-and-drop deploys do NOT install dependencies or bundle functions.**
The static pages work fine that way, but the functions need Netlify to run
`npm install` + bundle. Use ONE of these instead:

**A. Git (recommended)** — push this folder to a GitHub/GitLab repo and "Import from Git"
in Netlify. Every push redeploys, functions included.

**B. Netlify CLI** — from this folder:
```
npm install
npm install -g netlify-cli
netlify deploy --prod
```

---

## One-time configuration in Netlify

1. **Enable Blobs** — automatic on any site whose functions use `@netlify/blobs`.
   The stores `giftcards`, `discounts` and `inventory` are created on first write.

2. **Set the admin token** — Site settings → Environment variables → add:
   ```
   GIFT_ADMIN_TOKEN = <a long random secret you choose>
   ```
   It protects all admin actions (issuing gift cards, creating discounts, editing
   inventory). Keep it private.

---

## The Backoffice (`/Backoffice.html`)

Open it on your live site and paste your `GIFT_ADMIN_TOKEN` once (kept only in your
browser session). Three tabs:

- **Geschenkkarten** — issue gift-card codes (do this only after payment clears) and
  check any card's remaining balance.
- **Rabattcodes** — create percentage or fixed-amount discount codes with optional
  minimum order value, usage limit, and expiry date. See usage counts; delete codes.
- **Inventar** — add/edit items (SKU, name, price, stock, low-stock threshold). Stock
  and low-stock states are shown at a glance.

---

## Checkout behaviour

- **Discount code** and **gift card** fields sit in the order summary. Both validate
  live and apply to the total. Order of maths: discount is taken off the subtotal first,
  then the gift card is applied to what remains. On order placement, the gift-card
  balance is deducted and the discount-code use is recorded.
- **Currency** — the checkout auto-detects EUR / CHF / USD from the visitor's locale &
  timezone, with a manual selector in the top bar (choice saved per browser). Prices are
  stored in EUR and converted for display.

### Adjusting exchange rates
Rates are defined in `rd-checkout.jsx` in the `RC_CUR` map (e.g. `CHF: { rate: 0.95 }`,
`USD: { rate: 1.08 }` — multipliers from EUR). Edit these and re-bundle, or wire them to
a live FX feed. They are approximate and not automatically updated.

> Note: the marketing/product pages still show the base EUR price (`39,90 €`). The
> currency switch currently applies on the checkout. Say the word to roll it out
> site-wide.

---

## API reference

| Endpoint | Method | Auth | Body / Query |
|---|---|---|---|
| `/.netlify/functions/gift-generate` | POST | Bearer | `{ amount, count?, note? }` |
| `/.netlify/functions/gift-check` | GET | — | `?code=` |
| `/.netlify/functions/gift-redeem` | POST | — | `{ code, amount, orderRef? }` |
| `/.netlify/functions/discount-admin` | GET/POST/DELETE | Bearer | `{ code, type, value, minSubtotal?, maxUses?, expiresAt?, note? }` |
| `/.netlify/functions/discount-check` | GET | — | `?code=&subtotal=` |
| `/.netlify/functions/discount-redeem` | POST | — | `{ code, orderRef? }` |
| `/.netlify/functions/inventory` | GET/POST/DELETE | GET public, writes Bearer | `{ sku, name, priceEUR, stock, lowStock?, note? }` |

Short aliases `/api/gift/*`, `/api/discount/*`, `/api/inventory` are also configured.

---

## Notes & limits

- **Concurrency**: Blobs has no locking, so two simultaneous redemptions of the same code
  could race. Fine for a small shop; for high volume use a store with atomic updates.
- **Security model**: the code is the secret. Public endpoints run in the customer's
  browser at checkout (standard). Only issuing/editing is gated behind the admin token.
- **Real payments**: the checkout is a front-end mock. Before going live, connect a real
  payment provider and only redeem codes / decrement stock after payment succeeds —
  ideally from a server-side webhook rather than the browser.
