// No-prefix legacy product route: /produkt/<handle> → Produkt.html (URL preserved).
import { rewriteProduct } from '../_locale-router.js';
export const onRequest = rewriteProduct;
