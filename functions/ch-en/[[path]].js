// Mounts the locale rewrite on /ch-en/* ONLY (Switzerland, English).
import { rewriteLocale } from '../_locale-router.js';
export const onRequest = rewriteLocale;
