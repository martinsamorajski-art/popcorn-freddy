// ────────────────────────────────────────────────────────────────
// Site-wide password gate (Cloudflare Pages Function, runs before every route)
// ────────────────────────────────────────────────────────────────
// Purpose: keep popcornfreddy.com private during setup WITHOUT touching the
// Shopify admin or any app/plugin. Visitors must enter one shared password;
// once entered, a signed cookie lets them browse the full, real site normally.
//
// Turn it ON:  set the Cloudflare secret  SITE_PASSWORD  (Pages → Settings →
//              Variables and Secrets → add for Production AND Preview), redeploy.
// Turn it OFF: delete SITE_PASSWORD (or set it empty) and redeploy — the gate
//              then does nothing and the site is fully public again.
//
// This is a soft gate (one shared password, no user accounts) — enough to hide
// a pre-launch store, not a replacement for real auth on sensitive data.

const COOKIE = 'pf_gate';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function onRequest(context) {
  const { request, env, next } = context;
  const pw = env.SITE_PASSWORD;

  // No password configured → gate disabled, site behaves normally.
  if (!pw) return next();

  const token = await sign(pw);
  const url = new URL(request.url);

  // Handle the login form submit.
  if (request.method === 'POST' && url.searchParams.has('__gate')) {
    const form = await request.formData();
    const given = (form.get('pw') || '').toString();
    if (given === pw) {
      return new Response(null, {
        status: 303,
        headers: {
          'Location': url.searchParams.get('to') || '/',
          'Set-Cookie': `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`,
        },
      });
    }
    return gatePage(url, true); // wrong password
  }

  // Already unlocked?
  if (getCookie(request, COOKIE) === token) return next();

  // Everything else (pages, assets, API) is blocked until unlocked.
  return gatePage(url, false);
}

function getCookie(request, name) {
  const raw = request.headers.get('Cookie') || '';
  const m = raw.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
}

// Cookie value = a hash of the password, so the plaintext is never stored in the
// browser and a stale cookie stops working the moment you change the password.
async function sign(pw) {
  const data = new TextEncoder().encode('pf-gate::' + pw);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function gatePage(url, error) {
  const to = encodeURIComponent(url.pathname + url.search);
  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Popcorn &amp; Freddy</title>
<style>
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4ece0;color:#2e2a24;
       font-family:ui-serif,Georgia,"Times New Roman",serif;padding:24px}
  .card{width:100%;max-width:380px;text-align:center}
  .mark{font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:#a8702f;font-family:ui-sans-serif,system-ui,sans-serif;font-weight:700}
  h1{font-size:26px;margin:14px 0 6px;font-weight:600}
  p{margin:0 0 26px;color:#6b6153;font-size:15.5px;line-height:1.5}
  form{display:flex;flex-direction:column;gap:12px}
  input{width:100%;padding:14px 16px;border:1px solid #cbbfad;border-radius:11px;
        background:#fffaf2;font-size:16px;font-family:inherit;color:#2e2a24}
  input:focus{outline:none;border-color:#a8702f;box-shadow:0 0 0 3px rgba(168,112,47,.15)}
  button{padding:14px 16px;border:none;border-radius:11px;background:#a8702f;color:#fff;font-size:15px;
         font-weight:700;font-family:ui-sans-serif,system-ui,sans-serif;letter-spacing:.02em;cursor:pointer;transition:background .15s}
  button:hover{background:#8f5d24}
  .err{color:#b23b2e;font-size:14px;font-family:ui-sans-serif,system-ui,sans-serif;margin-top:2px;min-height:18px}
</style></head>
<body><div class="card">
  <div class="mark">Popcorn &amp; Freddy</div>
  <h1>Bald geöffnet</h1>
  <p>Diese Seite ist noch im Aufbau. Bitte gib das Passwort ein, um fortzufahren.</p>
  <form method="POST" action="/?__gate=1&amp;to=${to}">
    <input type="password" name="pw" placeholder="Passwort" autofocus autocomplete="current-password" required>
    <button type="submit">Eintreten</button>
    <div class="err">${error ? 'Falsches Passwort. Bitte erneut versuchen.' : ''}</div>
  </form>
</div></body></html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
