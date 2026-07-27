/* ────────────────────────────────────────────────────────────────
   Popcorn & Freddy — Snipcart REMOVED
   ────────────────────────────────────────────────────────────────
   Snipcart has been replaced by headless Shopify. Cart, checkout,
   payments, shipping, discounts, gift cards and taxes are now handled
   by Shopify (see pf-shopify.js + SHOPIFY-SETUP.md).

   This file is intentionally a no-op. It stays here only so the many
   pages that reference <script src="snipcart-loader.js"> keep loading
   without a 404. It never injects Snipcart. Safe to delete once every
   page's script tag has been removed.
   ──────────────────────────────────────────────────────────────── */
(function () {
  // No Snipcart. window.Snipcart is never defined, so the product pages
  // fall through to the shared Shopify cart wiring in pf-shop-connect.js.
  if (window && window.console) {
    console.info('[Shop] Snipcart removed — cart & checkout run on Shopify (pf-shopify.js).');
  }
})();
