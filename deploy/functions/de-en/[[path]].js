// Mounts the locale rewrite on /de-en/* ONLY (Germany, English).
import { rewriteLocale } from '../_locale-router.js';
export const onRequest = rewriteLocale;
