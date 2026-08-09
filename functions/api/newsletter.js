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

// NOTE: never answer with a 5xx status. Cloudflare replaces any 5xx coming
// from a Pages Function with its own "Bad gateway" HTML page, so the JSON
// error below would never reach the browser. Failures are 200 + ok:false.
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
    return json({ ok: false, error: 'function_crashed', detail: String((e && e.stack) || e).slice(0, 400) });
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

  // Reachability probe: does an outbound call to Klaviyo work at all?
  if (body && body.debug === 'reach') {
    const probe = await race(fetch('https://a.klaviyo.com/api/accounts/', {
      headers: { Authorization: 'Klaviyo-API-Key ' + key, revision: revision, accept: 'application/json' },
    }).then(async function (r) { return { status: r.status, body: (await r.text()).slice(0, 300) }; }),
    function (e) { return { failed: String(e).slice(0, 200) }; });
    return json({ ok: true, probe: probe });
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
  if (!key || !listId) return json({ ok: false, error: 'not_configured' });

  // Isolates the real subscribe call: same endpoint, same shape, fixed data,
  // reports only the status. Used to tell a data problem from a network one.
  if (body && body.debug === 'sub') {
    const probe = await race(fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        Authorization: 'Klaviyo-API-Key ' + key,
        revision: revision,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: { data: [{ type: 'profile', attributes: { email: 'debug-probe@example.com' } }] },
            historical_import: false,
          },
          relationships: { list: { data: { type: 'list', id: listId } } },
        },
      }),
    }).then(async function (r) { return { status: r.status, body: (await r.text()).slice(0, 400) }; }),
    function (e) { return { failed: String(e).slice(0, 200) }; });
    return json({ ok: true, list_used: language, probe: probe });
  }

  const payload = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        profiles: {
          data: [{
            type: 'profile',
            // This endpoint accepts ONLY email/phone and subscriptions.
            // Anything else (properties, locale) is rejected with a 400 —
            // those are written afterwards via profile-import.
            attributes: {
              email: email,
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

  // A race, not an AbortController: this way a hanging or misbehaving upstream
  // call can never take the whole invocation down with it.
  const result = await race(fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
    method: 'POST',
    headers: {
      Authorization: 'Klaviyo-API-Key ' + key,
      revision: revision,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(async function (r) {
    return { status: r.status, ok: r.ok, text: r.status === 202 ? '' : (await r.text()).slice(0, 500) };
  }), function (e) { return { failed: String(e).slice(0, 300) }; });

  if (result.timeout) return json({ ok: false, error: 'upstream_timeout' });
  if (result.failed) return json({ ok: false, error: 'upstream_failed', detail: result.failed });
  if (result.status === 202 || result.ok) {
    // Best effort, never fatal: the signup already counts at this point.
    const tagged = await race(fetch('https://a.klaviyo.com/api/profile-import/', {
      method: 'POST',
      headers: {
        Authorization: 'Klaviyo-API-Key ' + key,
        revision: revision,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: email,
            locale: locale.indexOf('-') > 0 ? language + '-' + country : language + '-' + country,
            properties: {
              language: language,
              country: country,
              signup_source: source,
              signup_locale: locale,
            },
          },
        },
      }),
    }).then(function (r) { return { status: r.status }; }),
    function (e) { return { failed: String(e).slice(0, 120) }; });
    return json({ ok: true, language: language, profile_update: tagged });
  }
  return json({ ok: false, error: 'klaviyo_' + result.status, detail: result.text });
}

// Resolves with the promise's value, {timeout:true} after 6s, or onError(e).
function race(promise, onError) {
  return Promise.race([
    promise.catch(onError),
    new Promise(function (resolve) { setTimeout(function () { resolve({ timeout: true }); }, 6000); }),
  ]);
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
