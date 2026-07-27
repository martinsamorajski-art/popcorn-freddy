// ────────────────────────────────────────────────────────────────
// Visitor country hint  (Popcorn & Freddy — headless)
// ────────────────────────────────────────────────────────────────
// Returns the visitor's likely country from Netlify's edge geo data.
// Used ONLY to show a subtle, dismissible suggestion ("It looks like
// you're in Switzerland…"). It never forces a redirect and never
// changes prices on its own — the customer always confirms.
//
// No credentials, no PII stored. Country code only.
// ────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

export default async (req, context) => {
  let country = '';
  try {
    // Netlify provides geo on the function context.
    country = (context && context.geo && context.geo.country && context.geo.country.code) || '';
  } catch (e) { country = ''; }

  // Fallbacks: standard geo headers, if present.
  if (!country) {
    try {
      const h = req.headers;
      country = h.get('x-nf-geo-country') || h.get('x-country') || h.get('cf-ipcountry') || '';
    } catch (e) {}
  }

  return new Response(JSON.stringify({ country: (country || '').toUpperCase() }), { status: 200, headers: CORS });
};

export const config = { path: '/api/geo' };
