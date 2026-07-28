// Mounts the locale rewrite on /at-en/* ONLY (Austria, English).
import { rewriteLocale } from '../_locale-router.js';
export const onRequest = rewriteLocale;
