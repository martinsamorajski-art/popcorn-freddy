// ────────────────────────────────────────────────────────────────
// Newsletter signup → Klaviyo  (Popcorn & Freddy)
// Cloudflare Pages Function — served at /api/newsletter
// ────────────────────────────────────────────────────────────────
// WHY THIS EXISTS
//   The Klaviyo PRIVATE key must never reach the browser. The site posts
//   { email, locale, source } here; this function adds the profile to the
//   right language list with marketing consent, and Klaviyo takes over:
//   it sends the double opt-in confirmation, then the welcome flow with
//   the unique discount code, and it owns the unsubscribe link.
//
//   One list PER LANGUAGE — deliberately. Klaviyo's double opt-in email is
//   a per-list setting with ONE template, so a German and an English
//   confirmation email require two lists. The welcome flow then triggers
//   off its own list and is written in that language throughout.
//
// ENVIRONMENT VARIABLES (Cloudflare → Pages project → Settings →
// Variables and Secrets; add to BOTH Production and Preview)
//   KLAVIYO_PRIVATE_KEY   pk_… private API key (secret — never public)
//   KLAVIYO_LIST_DE       list id of "Reisepost (Deutsch)"
//   KLAVIYO_LIST_EN       list id of "Travel Post (English)"
//   KLAVIYO_REVISION      optional API revision, defaults below
// ────────────────────────────────────────────────────────────────

const HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const json = (body, status) => new Response(JSON.stringify(body), { status: status || 200, headers: HEADERS });

// Deliberately permissive: the confirmation email is the real validator.
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Nothing may escape this handler: an uncaught throw makes Cloudflare serve
// its own 502 HTML page, which the frontend cannot read.
export async function onRequestPost(ctx) {
  try {
    return await handle(ctx);
  } catch (e) {
    return json({ ok: false, error: 'function_crashed', detail: String((e && e.stack) || e).slice(0, 400) }, 500);
  }
}

async function handle({ request, env }) {
  const key = env.KLAVIYO_PRIVATE_KEY;
  const revision = env.KLAVIYO_REVISION || '2024-10-15';

  let body;
  try { body = await request.json(); } catch (e) { return json({ ok: false, error: 'bad_json' }, 400); }

  // Diagnostic path: answers WITHOUT touching Klaviyo. If this works but a
  // real signup 502s, the upstream call is the culprit — not our code.
  if (body && body.debug === 'ping') {
    return json({ ok: true, pong: true, saw_key: Boolean(key), revision: revision });
  }

  const email = String((body && body.email) || '').trim().toLowerCase();
  if (!EMAIL_RX.test(email) || email.length > 254) return json({ ok: false, error: 'bad_email' }, 400);
  // Honeypot: a real person never fills a hidden field. Answer 200 so a bot
  // learns nothing from the response.
  if (body && body.trap) return json({ ok: true, skipped: true });

  // Locale prefix from the page (at, at-en, de, us, …) → language + country.
  const locale = String((body && body.locale) || 'at').toLowerCase().slice(0, 8);
  const language = /-en$|^us$/.test(locale) ? 'en' : 'de';
  const country = (locale.split('-')[0] || 'at').toUpperCase();
  const source = String((body && body.source) || 'website').slice(0, 40);

  const listId = language === 'en' ? env.KLAVIYO_LIST_EN : env.KLAVIYO_LIST_DE;

  // Not configured yet → the form says "thanks" in preview instead of erroring,
  // but the response says clearly that nothing was stored.
  if (!key || !listId) return json({ ok: false, error: 'not_configured' }, 501);

  const payload = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        profiles: {
          data: [{
            type: 'profile',
            attributes: {
              email: email,
              locale: locale,
              properties: {
                language: language,
                country: country,
                signup_source: source,
                signup_locale: locale,
              },
              subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
            },
          }],
        },
        // false = a real, consented signup, so the list's double opt-in email
        // fires. Never set this to true for website signups.
        historical_import: false,
      },
      relationships: { list: { data: { type: 'list', id: listId } } },
    },
  };

  // Hard timeout: without it a hanging upstream call kills the whole worker
  // and Cloudflare answers with an unreadable 502 page.
  const abort = new AbortController();
  const timer = setTimeout(function () { abort.abort(); }, 5000);

  try {
    const upstream = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        Authorization: 'Klaviyo-API-Key ' + key,
        revision: revision,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: abort.signal,
    });
    clearTimeout(timer);
    // Klaviyo answers 202 with an empty body on success.
    if (upstream.status === 202 || upstream.ok) return json({ ok: true, language: language });
    const detail = await upstream.text();
    return json({ ok: false, error: 'klaviyo_' + upstream.status, detail: detail.slice(0, 500) }, 502);
  } catch (e) {
    clearTimeout(timer);
    const aborted = e && (e.name === 'AbortError' || /abort/i.test(String(e)));
    return json({ ok: false, error: aborted ? 'upstream_timeout' : 'upstream_failed', detail: String(e).slice(0, 300) }, 502);
  }
}

// GET /api/newsletter → harmless status check. Reports WHETHER the variables
// exist, never their values.
export async function onRequest({ env }) {
  return json({
    ok: false,
    error: 'use_post',
    configured: {
      key: Boolean(env.KLAVIYO_PRIVATE_KEY),
      key_looks_private: String(env.KLAVIYO_PRIVATE_KEY || '').startsWith('pk_'),
      list_de: Boolean(env.KLAVIYO_LIST_DE),
      list_en: Boolean(env.KLAVIYO_LIST_EN),
      revision: env.KLAVIYO_REVISION || '2024-10-15',
    },
  }, 405);
}
