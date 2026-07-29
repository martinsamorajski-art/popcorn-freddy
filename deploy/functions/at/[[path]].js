// Mounts the locale rewrite on /at/* ONLY (never assets or /api/*).
import { rewriteLocale } from '../_locale-router.js';
export const onRequest = rewriteLocale;
