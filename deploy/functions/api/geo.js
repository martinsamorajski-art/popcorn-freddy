// ────────────────────────────────────────────────────────────────
// Visitor country hint  (Popcorn & Freddy — headless)
// Cloudflare Pages Function — served at /api/geo
// ────────────────────────────────────────────────────────────────
// Returns the visitor's likely country. Cloudflare gives this for free
// on every request via request.cf.country / the CF-IPCountry header.
// Used ONLY for a subtle, dismissible suggestion ("It looks like you're
// in Switzerland…"). It never redirects and never changes prices on its
// own — the customer always confirms.
//
// No credentials, no PII stored. Country code only.
// ────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export async function onRequest({ request }) {
  let country = '';
  try {
    country = (request.cf && request.cf.country) || '';
  } catch (e) { country = ''; }
  if (!country) {
    try {
      country = request.headers.get('cf-ipcountry') || request.headers.get('x-country') || '';
    } catch (e) {}
  }
  // Cloudflare returns T1 for Tor exits and XX when unknown — treat as no hint.
  if (country === 'T1' || country === 'XX') country = '';
  return new Response(JSON.stringify({ country: country.toUpperCase() }), { status: 200, headers: CORS });
}
