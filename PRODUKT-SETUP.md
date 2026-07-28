# Product page — what Shopify controls

The product template (`Produkt.html`) is **one page for every chapter**. Nothing
about a chapter lives in the code. This is the complete list of what you fill in
Shopify and where it shows up.

Two rules that never change:

- **Empty = hidden.** A field you leave blank simply removes its section. Nothing breaks, nothing shows a placeholder.
- **Per chapter vs shared.** Only the fields in Part 2 differ per chapter. The trust badges, benefits, "how it works", FAQ and compliance blocks are the same on every chapter page — they live in the code, so one edit changes them everywhere.

---

## PART 1 — Native Shopify fields (no metafields needed)

| What you edit in Shopify | Where it shows |
|---|---|
| Title | Page heading, cart, sticky bar (last word gets the terra squiggle) |
| Description | Lede paragraph under the title |
| Media (images) | Gallery + thumbnails, social preview image |
| Price | Every price on the page, in the market's currency |
| Inventory | "Add to basket" vs "Currently sold out" |
| **Search engine listing → Edit** | The browser tab title + Google/social description |

That last one is the "meta tags" question: scroll to the bottom of the product
page in Shopify, click **Edit website SEO**, and fill in **Page title** and
**Meta description**. The page now uses those per chapter. Leave them empty and
it falls back to the product title and description.

---

## PART 2 — Per-chapter metafields

Create these once under **Settings → Custom data → Products → Add definition**.
Namespace and key must be typed exactly as shown — use `custom` as the namespace.

### The two you asked for

| Key | Type | Example |
|---|---|---|
| `inside_items` | JSON | see below |
| `page_previews` | **File** (list of files) | upload the sample-page images |
| `story_title` | Single line text | `Der Flüsterwald ruft.` |
| `story_body` | Multi-line text | one or two paragraphs |
| `story_hand` | Single line text | handwritten margin note (optional) |

**`inside_items` — what's in the box.** Type JSON, value a list of objects.
`n` = number, `icon` = which icon, `t` = title, `d` = description:

```json
[
  { "n": "01", "icon": "book", "t": "Das Geschichtenkapitel", "d": "A5-Druck auf feinem Papier, mit dem Namen eures Kindes mitten in der Geschichte." },
  { "n": "02", "icon": "build", "t": "Der Holzbausatz", "d": "Das Flüsterwald-Auto: sauber geschliffenes Birkenholz, kindgerecht vorgebohrt." },
  { "n": "03", "icon": "palette", "t": "Farben & Pinsel", "d": "Vier kinderfreundliche Farben und zwei Pinsel." },
  { "n": "04", "icon": "compass", "t": "Die Schatzkarte", "d": "Die A2-Karte mit der Etappe dieses Kapitels." }
]
```

Available icons: `book`, `build`, `palette`, `compass`, `archive`, `star`,
`check`, `heart`, `user`, `truck`, `screen`.

**`page_previews` — the look inside the chapter.** This is the section you
missed. Set the definition up as:

1. Settings → Custom data → Products → **Add definition**
2. Name: `Page previews` · Namespace and key: `custom.page_previews`
3. Type: **File** → tick **List of files** → limit to images
4. Save

Then on each chapter product: scroll to **Metafields → Page previews → Select
files**, and upload the page scans for *that* chapter (Shopify stores them under
Content → Files automatically). Order in the list = order on the page. Upload
2–6; portrait scans look best, they're shown at A5 proportions.

### The rest (optional, all per chapter)

| Key | Type | Shown |
|---|---|---|
| `chapter_no` | Integer | Chapter number on listing cards |
| `caps` | Single line text | Small eyebrow above the title |
| `emotion` | Single line text | Mood line in the facts block |
| `teaser` | Single line text | Listing-card teaser |
| `toy` | Single line text | Which wooden kit is inside |
| `meta_rows` | JSON | `[{"k":"Format","v":"A5"},{"k":"Alter","v":"ab 4"}]` |
| `details` | JSON | Same shape as `meta_rows` — the at-a-glance table |
| `scarcity` | Single line text | Scarcity line near the buy button |
| `guarantee` | Single line text | Guarantee line near the buy button |
| `gift_note` | Single line text | Gift-wrapping hint |
| `personalization_label` | Single line text | The cart label for the child's name (default `Name`) |
| `release_label` | Single line text | For chapters not yet on sale: "ab März" |
| `badge` | Single line text | Corner badge on listing cards |

---

## PART 3 — Reviews (Judge.me)

Two halves, and each works on its own:

**Stars + count** come from Shopify. Judge.me writes them into the standard
`reviews.rating` and `reviews.rating_count` metafields automatically — you don't
create anything. They appear next to the title and above the review carousel.

**The review quotes** need one setting, because review text isn't available
through Shopify's API:

1. Judge.me admin → **Settings → API tokens** → copy the private token
2. Cloudflare → Pages project **popcorn-freddy** → Settings → **Variables and Secrets**
3. Add to **both** Production and Preview:
   - `JUDGEME_API_TOKEN` = the token
   - `JUDGEME_SHOP_DOMAIN` = `popcornfreddy.myshopify.com`
4. Redeploy

Until then the section falls back to a `custom.reviews` metafield (JSON:
`[{"q":"Zitat","n":"Lena","m":"Mama von Theo (5)"}]`), so you can hand-write
reviews in the meantime. Judge.me wins as soon as it's connected. Reviews under
3 stars and empty ones are filtered out.

---

## PART 4 — The shared sections (in code, not Shopify)

These appear on every chapter page and are edited in the project files:

| Section | File |
|---|---|
| Trust badges under the hero | `rd-chapter1-trust.jsx` |
| Benefits — why parents love it | `rd-chapter1-trust.jsx` |
| How it works (same as the home page) | `copy.jsx` → `how` |
| FAQ | `rd-chapter1-trust.jsx` |
| GPSR / compliance | `rd-gpsr.jsx` |
| The other chapters at the end | Automatic — the `kapitel` collection, minus the chapter being viewed |

---

## Order of sections on the page

1. Gallery + buy box *(Shopify)*
2. Trust badges *(shared)*
3. Reviews *(Judge.me)*
4. What's in the box — `inside_items` *(per chapter)*
5. A look inside — `page_previews` *(per chapter)*
6. Benefits *(shared)*
7. The story — `story_*` *(per chapter)*
8. How it works *(shared)*
9. At a glance — `details` *(per chapter)*
10. Compliance + FAQ *(shared)*
11. The other chapters *(automatic from the collection)*
12. Closing call to action *(shared)*
