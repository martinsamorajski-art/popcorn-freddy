// ────────────────────────────────────────────────────────────────
// Redesign — shared UI: icons, ornaments, atmosphere
// ────────────────────────────────────────────────────────────────
const { useEffect, useRef, useState } = React;

// Shared cart store (localStorage) — used by Redesign.html and Checkout.html
const RD_CART_KEY = 'pf-cart-v1';
// A cart line is a REFERENCE to a Shopify product: { n: handle, handle, qty,
// variantId?, max?, attrs?, gift? }. Titles, images and prices are never stored
// — they are resolved from the Shopify catalog at render time (usePFCartLines).
// Older baskets that copied product data (or used numeric chapter ids) are
// migrated on load: copied fields are dropped, unidentifiable lines removed.
function rdCartLoad() {
  try {
    const c = JSON.parse(localStorage.getItem(RD_CART_KEY));
    if (!Array.isArray(c)) return [];
    const clean = c.map((it) => {
      const handle = it.handle || (typeof it.n === 'string' ? it.n : null);
      if (!handle) return null;
      return {
        n: handle, handle, qty: it.qty || 1,
        ...(it.variantId ? { variantId: it.variantId } : {}),
        ...(it.max != null ? { max: it.max } : {}),
        ...(it.attrs ? { attrs: it.attrs } : {}),
        ...(it.gift ? { gift: it.gift } : {}),
      };
    }).filter(Boolean);
    if (JSON.stringify(clean) !== JSON.stringify(c)) rdCartSave(clean);
    return clean;
  } catch (e) { return []; }
}
function rdCartSave(c) {
  try { localStorage.setItem(RD_CART_KEY, JSON.stringify(c)); } catch (e) {}
}

// ── Shopify catalog hooks ───────────────────────────────────────
// Shopify is the ONLY source of product data. Cards, the product page and
// the cart all read the same PFShop store, so they can never disagree.

// Every chapter product, in Shopify's order. [] until loaded.
function usePFChapters(lang) {
  const [state, setState] = useState({ list: [], loading: true, failed: false });
  useEffect(() => {
    if (!window.PFShop || !PFShop.getChapters) { setState({ list: [], loading: false, failed: true }); return; }
    let alive = true;
    PFShop.getChapters(lang)
      .then((l) => { if (alive) setState({ list: l || [], loading: false, failed: !l }); })
      .catch(() => { if (alive) setState({ list: [], loading: false, failed: true }); });
    return () => { alive = false; };
  }, [lang]);
  return state;
}

// One product by handle, from the shared store (fetches it if unseen).
function usePFProduct(handle, lang) {
  const [p, setP] = useState(() => (window.PFShop && PFShop.peek ? PFShop.peek(handle) : null));
  useEffect(() => {
    if (!handle || !window.PFShop) return;
    let alive = true;
    const sync = () => { if (alive) setP(PFShop.peek(handle)); };
    window.addEventListener('pf-catalog-changed', sync);
    const known = PFShop.peek(handle);
    if (known) setP(known);
    else PFShop.ensure([handle], lang).then(sync).catch(() => {});
    return () => { alive = false; window.removeEventListener('pf-catalog-changed', sync); };
  }, [handle, lang]);
  return p;
}

// Cart lines resolved against the live catalog: title, image, price, currency
// and stock always come from Shopify, never from what was stored at add time.
function usePFCartLines(cart, lang) {
  const handles = cart.map((c) => c.handle || (typeof c.n === 'string' ? c.n : null)).filter(Boolean).join(',');
  const [, bump] = useState(0);
  useEffect(() => {
    if (!window.PFShop || !handles) return;
    const sync = () => bump((x) => x + 1);
    window.addEventListener('pf-catalog-changed', sync);
    PFShop.ensure(handles.split(','), lang).then(sync).catch(() => {});
    return () => window.removeEventListener('pf-catalog-changed', sync);
  }, [handles, lang]);
  return cart.map((c) => {
    const handle = c.handle || (typeof c.n === 'string' ? c.n : null);
    const p = (window.PFShop && PFShop.peek) ? PFShop.peek(handle) : null;
    return {
      ...c,
      title: p ? p.title : null,
      chapterNo: p ? p.chapterNo : null,
      img: p && p.images[0] ? p.images[0].src : null,
      price: p ? p.price : null,
      currency: p ? p.currencyCode : null,
      priceFormatted: p ? p.priceFormatted : null,
      max: p && p.quantityAvailable != null ? p.quantityAvailable : null,
      ready: !!p,
    };
  });
}

// Shared language preference (localStorage) — keeps the chosen language when
// navigating between pages, instead of resetting to German on every load.
const RD_LANG_KEY = 'pf-lang-v1';
// Detect the visitor's preferred language from their browser / phone settings.
// German-speaking locales (de, de-AT, de-CH, …) → German; everything else → English.
function rdLangDetect() {
  try {
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return /^de\b/i.test(nav) ? 'de' : 'en';
  } catch (e) { return 'de'; }
}
function rdLangLoad(fallback) {
  // Language is decided by the URL locale prefix (PFLocale) so page copy always
  // matches the Shopify locale. Falls back to a saved/device choice off-route.
  try { if (window.PFLocale) return PFLocale.current().langLower; } catch (e) {}
  try { const l = localStorage.getItem(RD_LANG_KEY); if (l === 'de' || l === 'en') return l; } catch (e) {}
  // No saved choice yet — fall back to the device language.
  return rdLangDetect();
}
function rdLangSave(lang) {
  try { localStorage.setItem(RD_LANG_KEY, lang); } catch (e) {}
}

// ─── Locale (country + language) ─────────────────────────
const RD_LOCALE_KEY = 'pf-locale-v1';
// Locale is driven by the URL prefix (PFLocale). The selector routes between
// the four locale prefixes; country/language names come from the Shopify
// localization query, not a hardcoded list.
const RD_PREFIXES = ['at', 'at-en', 'de', 'de-en', 'ch', 'ch-en', 'us'];
function rdPrefixMeta(pre) {
  if (window.PFLocale && PFLocale.PREFIX[pre]) return PFLocale.PREFIX[pre];
  var s = String(pre || 'at');
  return { country: s.split('-')[0].toUpperCase(), language: /-en$/i.test(s) ? 'EN' : 'DE' };
}
function rdActivePrefix() { try { return window.PFLocale ? PFLocale.activePrefix() : 'at'; } catch (e) { return 'at'; } }
function rdCurrentCountry() { try { return window.PFLocale ? PFLocale.current().country : 'AT'; } catch (e) { return 'AT'; } }

// Subtle geo suggestion (never forces a redirect — the customer confirms)
const RD_SUGGEST_T = {
  de: { line: (c, cur) => `Es sieht so aus, als wärst du in ${c}. Möchtest du in ${cur} einkaufen?`, yes: 'Ja, wechseln', other: 'Anderes Land', close: 'Schließen' },
  en: { line: (c, cur) => `It looks like you're in ${c}. Would you like to shop in ${cur}?`, yes: 'Yes, switch', other: 'Choose another', close: 'Dismiss' },
};
const RD_SUGGEST_DISMISS_KEY = 'pf-geo-suggest-v1';
// The language nudge is written in the language it OFFERS — someone who does not
// read German must be able to read the offer.
const RD_LANGSUG_T = {
  en: { line: 'This shop is also available in English.', yes: 'Switch to English', other: 'Stay in German', close: 'Dismiss' },
  de: { line: 'Diesen Shop gibt es auch auf Deutsch.', yes: 'Auf Deutsch wechseln', other: 'Bei Englisch bleiben', close: 'Schließen' },
};
const RD_LANGSUG_DISMISS_KEY = 'pf-lang-suggest-v1';
function rdCurrencyFor(country) {
  try { if (window.PFShop) return window.PFShop.marketFor(country).currency; } catch (e) {}
  return country === 'CH' ? 'CHF' : 'EUR';
}

const RD_LOCALE_T = {
  de: {
    country: { AT: 'Österreich', DE: 'Deutschland', CH: 'Schweiz', US: 'USA', OTHER: 'Anderes Land' },
    shop: { AT: 'Du befindest dich im österreichischen Shop.', DE: 'Du befindest dich im deutschen Shop.', CH: 'Du befindest dich im Schweizer Shop.', US: 'Du befindest dich im US-Shop.', OTHER: 'Du befindest dich im internationalen Shop.' },
    hint: 'Wähle Land und Sprache für Versand und Preise.', land: 'Land', sprache: 'Sprache', go: 'Website aufrufen', langName: { de: 'Deutsch', en: 'English' }, aria: 'Land und Sprache ändern',
  },
  en: {
    country: { AT: 'Austria', DE: 'Germany', CH: 'Switzerland', US: 'United States', OTHER: 'Other country' },
    shop: { AT: 'You are browsing the Austrian shop.', DE: 'You are browsing the German shop.', CH: 'You are browsing the Swiss shop.', US: 'You are browsing the US shop.', OTHER: 'You are browsing the international shop.' },
    hint: 'Choose country and language for shipping and prices.', land: 'Country', sprache: 'Language', go: 'Open website', langName: { de: 'Deutsch', en: 'English' }, aria: 'Change country and language',
  },
};

// Small SVG flags (no emoji, per design system)
function RdFlag({ c, size = 18 }) {
  const r = size / 2;
  if (c === 'AT') return <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" style={{ borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px color-mix(in srgb, currentColor 25%, transparent)' }}><clipPath id="rdfAT"><circle cx="9" cy="9" r="9" /></clipPath><g clipPath="url(#rdfAT)"><rect width="18" height="6" fill="#C8102E" /><rect y="6" width="18" height="6" fill="#fff" /><rect y="12" width="18" height="6" fill="#C8102E" /></g></svg>;
  if (c === 'DE') return <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" style={{ borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px color-mix(in srgb, currentColor 25%, transparent)' }}><clipPath id="rdfDE"><circle cx="9" cy="9" r="9" /></clipPath><g clipPath="url(#rdfDE)"><rect width="18" height="6" fill="#1a1a1a" /><rect y="6" width="18" height="6" fill="#DD0000" /><rect y="12" width="18" height="6" fill="#FFCE00" /></g></svg>;
  if (c === 'CH') return <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" style={{ borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px color-mix(in srgb, currentColor 25%, transparent)' }}><clipPath id="rdfCH"><circle cx="9" cy="9" r="9" /></clipPath><g clipPath="url(#rdfCH)"><rect width="18" height="18" fill="#DA291C" /><rect x="7.6" y="4" width="2.8" height="10" fill="#fff" /><rect x="4" y="7.6" width="10" height="2.8" fill="#fff" /></g></svg>;
  if (c === 'US') return <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true" style={{ borderRadius: '50%', flex: 'none', boxShadow: '0 0 0 1px color-mix(in srgb, currentColor 25%, transparent)' }}><clipPath id="rdfUS"><circle cx="9" cy="9" r="9" /></clipPath><g clipPath="url(#rdfUS)"><rect width="18" height="18" fill="#fff" />{[0,1,2,3,4,5,6].map((i) => <rect key={i} y={i * 2.57} width="18" height="1.28" fill="#B22234" />)}<rect width="9" height="9" fill="#3C3B6E" /></g></svg>;
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" style={{ flex: 'none' }}><circle cx="9" cy="9" r={r - 1.2} /><path d="M1.8 9h14.4M9 1.8c2.6 2.2 2.6 12.2 0 14.4M9 1.8c-2.6 2.2-2.6 12.2 0 14.4" /></svg>;
}

// Locale button + popup — used in the burger panel and the footer.
// One pick = one locale (country + language + currency). The list of locales
// is our four routable prefixes; the names/currency shown are populated by the
// Shopify localization query. Applying navigates to that prefix (PFLocale).
function RdLocaleControl({ lang, dark, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [loc, setLoc] = useState(null);              // Shopify localization data
  const current = rdActivePrefix();
  const [pick, setPick] = useState(current);
  const T = RD_LOCALE_T[lang] || RD_LOCALE_T.de;
  const country = rdCurrentCountry();
  const show = () => { setPick(rdActivePrefix()); setOpen(true); };

  // Fetch the available countries/languages from Shopify ON MOUNT — the closed
  // button label itself is API-driven (country name + currency), not just the
  // modal. Falls back to page copy only while loading / when Shopify is off.
  useEffect(() => {
    if (!(window.PFShop && typeof PFShop.getLocalization === 'function')) return;
    let alive = true;
    PFShop.getLocalization().then((d) => { if (alive && d) setLoc(d); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  // Allow the geo-suggestion banner and the footer bottom-bar link to open this
  // control from anywhere. Only the footer instance listens, so the event can
  // never open two stacked modals on one page.
  useEffect(() => {
    if (!dark) return;
    const onOpen = () => show();
    window.addEventListener('pf-open-locale', onOpen);
    return () => window.removeEventListener('pf-open-locale', onOpen);
  });

  // Names/currency from Shopify localization; page-copy labels are the fallback.
  const labelFor = (pre) => {
    const meta = rdPrefixMeta(pre), cc = meta.country, lc = meta.language;
    let cname, cur, lname;
    if (loc) {
      const c = (loc.countries || []).find((x) => x.code === cc);
      if (c) { cname = c.name; cur = c.currency; }
      const l = (loc.languages || []).find((x) => x.code === lc);
      if (l) lname = l.endonym || l.name;
    }
    cname = cname || T.country[cc] || cc;
    cur = cur || rdCurrencyFor(cc);
    lname = lname || (T.langName[lc.toLowerCase()] || lc);
    return { cname, cur, lname, cc };
  };

  // The selectable markets: OUR routable prefixes intersected with the countries
  // Shopify actually returns from the localization query. A market Shopify does
  // not sell to disappears from the list on its own. While localization is
  // loading (or the store is not configured) the routable prefixes are the
  // fallback, so the selector is never empty.
  const options = React.useMemo(() => {
    if (!loc || !(loc.countries || []).length) return RD_PREFIXES;
    const have = {};
    loc.countries.forEach((c) => { if (c && c.code) have[c.code.toUpperCase()] = true; });
    const avail = RD_PREFIXES.filter((pre) => have[rdPrefixMeta(pre).country]);
    return avail.length ? avail : RD_PREFIXES;
  }, [loc]);
  const apply = () => {
    setOpen(false);
    if (onNavigate) onNavigate();
    const cc = rdPrefixMeta(pick).country;
    // Re-point the Shopify cart at the new market (re-price), then route.
    if (window.PFShop && window.PFShop.enabled) { try { window.PFShop.setBuyerCountry(cc); } catch (e) {} }
    setTimeout(() => { if (window.PFLocale) PFLocale.switchTo(pick); }, 60);
  };
  const cur = labelFor(current);
  const pickCc = rdPrefixMeta(pick).country;
  return (
    <React.Fragment>
      <button type="button" className={'rd-locale-btn' + (dark ? ' rd-locale-btn--dark' : '')} onClick={show} aria-haspopup="dialog" aria-label={T.aria}>
        <RdFlag c={country} size={17} />
        <span>{cur.cname} · {cur.cur}</span>
      </button>
      {open && (
        <div className="rd-locale-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="rd-locale-modal" role="dialog" aria-modal="true" aria-label={T.aria}>
            <button type="button" className="rd-locale-x" aria-label="Schließen" onClick={() => setOpen(false)}><RdIcon name="close" size={18} /></button>
            <div style={{ display: 'flex', justifyContent: 'center' }}><RdFlag c={pickCc} size={40} /></div>
            <h3 className="r-display" style={{ fontSize: 23, color: 'var(--rd-ink)', textAlign: 'center', marginTop: 16, textWrap: 'balance' }}>{T.shop[pickCc]}</h3>
            <p style={{ fontSize: 14.5, color: 'var(--rd-ink-soft)', textAlign: 'center', marginTop: 8, lineHeight: 1.55 }}>{T.hint}</p>
            <label className="rd-locale-field">{T.land} · {T.sprache}
              <div className="rd-locale-selwrap">
                <RdFlag c={pickCc} size={17} />
                <select value={pick} onChange={(e) => setPick(e.target.value)}>
                  {options.map((pre) => { const L = labelFor(pre); return <option key={pre} value={pre}>{L.cname} · {L.lname} · {L.cur}</option>; })}
                </select>
              </div>
            </label>
            <button type="button" className="rbtn rbtn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 22, padding: '14px 20px' }} onClick={apply}>{T.go}</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

// Craftsmanship / quiet exclusivity copy — used across pages
const RD_CRAFT = {
  de: {
    batch: 'Handgefertigt in kleinen Monats-Auflagen.',
    count: 'Nur rund 250 personalisierte Abenteuer-Boxen entstehen jeden Monat — jede einzelne von Hand gefertigt.',
    each: 'Jede Box wird einzeln gefertigt und personalisiert, bevor sie auf die Reise geht.',
  },
  en: {
    batch: 'Handcrafted in small monthly batches.',
    count: 'Only around 250 personalised adventure boxes are created each month — every single one crafted by hand.',
    each: 'Each box is individually crafted and personalised before it sets off.',
  },
};

// Quiet single-line note with a small gold star — never a sales banner
function RdCraftNote({ lang = 'de', k = 'batch', center = false, dark = false, size = 15.5, style }) {
  const txt = (RD_CRAFT[lang] || RD_CRAFT.de)[k];
  return (
    <div className="r-it" style={{
      display: 'flex', alignItems: 'baseline', gap: 10, justifyContent: center ? 'center' : 'flex-start',
      fontSize: size, lineHeight: 1.55, textAlign: center ? 'center' : 'left',
      color: dark ? 'rgba(242,236,217,0.7)' : 'var(--rd-ink-mute)', ...style,
    }}>
      <span aria-hidden="true" style={{ color: dark ? 'var(--rd-gold-soft)' : 'var(--rd-gold)', flex: 'none', alignSelf: 'center', display: 'inline-flex' }}><RdIcon name="star" size={13} /></span>
      <span style={{ maxWidth: 520 }}>{txt}</span>
    </div>
  );
}

// Engraved-style line icons (thin, bookish)
function RdIcon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    user: <React.Fragment><circle cx="12" cy="8" r="3.6" /><path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" /></React.Fragment>,
    build: <React.Fragment><path d="M13.5 4.5 19.5 10.5 17 13l-6-6 2.5-2.5Z" /><path d="m11 7-7.5 7.5L6 17l7.5-7.5" /></React.Fragment>,
    heart: <path d="M12 20.5S4 16 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 6.2-8 10.7-8 10.7Z" />,
    truck: <React.Fragment><rect x="2.5" y="6.5" width="11" height="9" rx="1" /><path d="M13.5 9.5h3.8l3.2 3.2v2.8h-7z" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></React.Fragment>,
    shield: <React.Fragment><path d="M12 2.8 5 5.6v5.2c0 4 2.9 6.9 7 8 4.1-1.1 7-4 7-8V5.6L12 2.8Z" /><path d="m9 11.5 2.2 2.2 4-4.2" /></React.Fragment>,
    gift: <React.Fragment><rect x="3.5" y="11" width="17" height="9.5" rx="1" /><path d="M2 7.5h20V11H2z" /><path d="M12 7.5v13" /><path d="M12 7.5C12 7.5 10.8 3.5 8.4 3.9 6.6 4.2 6.8 7 9 7.5h3Z" /><path d="M12 7.5c0 0 1.2-4 3.6-3.6 1.8.3 1.6 3.1-.6 3.6h-3Z" /></React.Fragment>,
    screen: <React.Fragment><rect x="3.5" y="4.5" width="17" height="12" rx="1.5" /><path d="M9 20h6M12 16.5V20" /><path d="m4 3 17 15" /></React.Fragment>,
    palette: <React.Fragment><path d="M12 21a9 9 0 1 1 9-9c0 2.2-1.4 3.2-3 3.2h-1.8a2 2 0 0 0-1.5 3.3c.4.5.3 1.4-.5 1.5-.7.1-1.5 0-2.2 0Z" /><circle cx="8" cy="10" r="1" fill="currentColor" /><circle cx="12" cy="7.5" r="1" fill="currentColor" /><circle cx="16" cy="10" r="1" fill="currentColor" /></React.Fragment>,
    archive: <React.Fragment><rect x="3" y="4" width="18" height="5" rx="1" /><path d="M4.5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V9" /><path d="M9.5 13h5" /></React.Fragment>,
    star: <path d="M12 3.2l2.5 5.4 5.9.6-4.4 4 1.3 5.8-5.3-3-5.3 3 1.3-5.8-4.4-4 5.9-.6L12 3.2Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    pen: <React.Fragment><path d="M4.5 19.5 5.6 15.6 16.8 4.4a2 2 0 0 1 2.8 2.8L8.4 18.4l-3.9 1.1Z" /><path d="m14.5 6.7 2.8 2.8" /></React.Fragment>,
    compass: <React.Fragment><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z" /></React.Fragment>,
    book: <React.Fragment><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></React.Fragment>,
    cart: <React.Fragment><path d="M2.5 3.5h2.1l1.8 10.2a1.5 1.5 0 0 0 1.5 1.25h8.3a1.5 1.5 0 0 0 1.47-1.18L19.4 6.5H5.6" /><circle cx="9" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></React.Fragment>,
    menu: <React.Fragment><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></React.Fragment>,
    close: <React.Fragment><path d="M6 6l12 12" /><path d="M18 6 6 18" /></React.Fragment>,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || paths.star}</svg>;
}

// Mobile nav toggle — burger button + slide-down link panel, shared by home + subpage topbars
function RdMobileNav({ links, ctaLabel, onCta, extra }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <React.Fragment>
      <button
        className="rd-burger"
        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <RdIcon name={open ? 'close' : 'menu'} size={22} />
      </button>
      {open && (
        <div className="rd-mobile-panel" role="menu">
          {links.map(([href, label], i) => (
            <a key={i} href={href} className="rd-mobile-link" role="menuitem" onClick={() => setOpen(false)}>{label}</a>
          ))}
          {extra}
          {ctaLabel && (
            <button
              className="rbtn rbtn-primary rd-mobile-cta"
              onClick={() => { setOpen(false); if (onCta) onCta(); }}
            >
              {ctaLabel}
              <RdIcon name="arrow" size={17} />
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}

// Dotted treasure trail ending in a small X — subtle scroll ornament
function RdTrail({ width = 200, color = 'var(--rd-walnut)', flip = false, style }) {
  return (
    <svg width={width} height={Math.round(width * 0.55)} viewBox="0 0 220 120" fill="none" aria-hidden="true" style={{ opacity: 0.28, transform: flip ? 'scaleX(-1)' : undefined, ...style }}>
      <path d="M8 12 C 60 30, 40 70, 100 78 S 186 62, 194 92" stroke={color} strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
      <path d="M188 92 l14 14 M202 92 l-14 14" stroke="var(--rd-terra)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// Tiny paw prints wandering across a corner
function RdPaws({ n = 4, color = 'var(--rd-walnut)', style }) {
  const paws = Array.from({ length: n }, (_, i) => (
    <g key={i} transform={`translate(${16 + i * 27} ${i % 2 ? 12 : 32}) rotate(${16 + i * 5})`}>
      <ellipse cx="0" cy="3.2" rx="3.8" ry="4.4" />
      <circle cx="-4.3" cy="-3.2" r="1.6" /><circle cx="0" cy="-4.6" r="1.6" /><circle cx="4.3" cy="-3.2" r="1.6" />
    </g>
  ));
  return <svg width={n * 27 + 22} height="50" viewBox={`0 0 ${n * 27 + 22} 50`} fill={color} aria-hidden="true" style={{ opacity: 0.16, ...style }}>{paws}</svg>;
}

// Small centered ornament: rule — diamond — rule
function RdOrnament({ color = 'var(--rd-gold)', width = 150 }) {
  return (
    <svg width={width} height="12" viewBox="0 0 150 12" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M0 6 H62" stroke={color} strokeWidth="1" opacity="0.55" />
      <path d="M88 6 H150" stroke={color} strokeWidth="1" opacity="0.55" />
      <path d="M75 1 L80 6 L75 11 L70 6 Z" stroke={color} strokeWidth="1.2" fill="none" />
    </svg>
  );
}

// Hand-drawn underline squiggle
function RdSquiggle({ width = 130, color = 'var(--rd-terra)' }) {
  return (
    <svg width={width} height={Math.round(width * 0.09)} viewBox="0 0 130 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
      <path d="M3 8 Q 20 2, 36 7 T 66 7 T 96 7 T 127 6" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

// Compass rose, faint decorative
function RdCompass({ size = 130, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="50" r="36" stroke={color} strokeWidth="0.7" strokeDasharray="2 5" opacity="0.6" />
      <path d="M50 8 L55 45 L50 40 L45 45 Z" fill={color} opacity="0.75" />
      <path d="M50 92 L55 55 L50 60 L45 55 Z" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M8 50 L45 45 L42 50 L45 55 Z M92 50 L55 45 L58 50 L55 55 Z" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <circle cx="50" cy="50" r="2.4" fill={color} />
    </svg>
  );
}

// Falling leaves — count scales with animation intensity
function RdLeaves({ intensity = 5, tint = 'var(--rd-moss)' }) {
  const count = Math.round(intensity * 0.7);
  if (count <= 0) return null;
  const leaves = Array.from({ length: count }, (_, i) => ({
    left: (i * 137 + 60) % 100,
    delay: (i * 3.1) % 14,
    dur: 13 + (i % 5) * 2.4,
    s: 0.6 + ((i * 53) % 40) / 100,
  }));
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {leaves.map((l, i) => (
        <svg key={i} width={16 * l.s} height={16 * l.s} viewBox="0 0 16 16" fill="none"
          style={{ position: 'absolute', left: `${l.left}%`, top: -30, opacity: 0, animation: `r-leaf ${l.dur}s linear ${l.delay}s infinite`, color: tint }}>
          <path d="M2 13 Q1 6 7 2 Q14 1 14 7 Q13 13 6 13 Q3 13 2 13 Z" fill="currentColor" opacity="0.5" />
        </svg>
      ))}
    </div>
  );
}

// Fireflies for the dark closing section
function RdFireflies({ intensity = 5, count = 14 }) {
  const n = Math.round(count * intensity / 5);
  if (n <= 0) return null;
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} style={{
          position: 'absolute',
          left: `${(i * 83 + 15) % 96}%`, top: `${18 + (i * 47) % 66}%`,
          width: 3.5, height: 3.5, borderRadius: '50%',
          background: 'var(--rd-gold-soft)', boxShadow: '0 0 10px 2px color-mix(in srgb, var(--rd-gold-soft) 60%, transparent)',
          animation: `r-firefly ${(4 + (i % 4))}s ease-in-out ${(i * 0.9) % 5}s infinite`,
          opacity: 0.12,
        }} />
      ))}
    </div>
  );
}

// Simple layered pine silhouette band
function RdPines({ color = '#141A10', height = '100%', opacity = 1, seed = 0 }) {
  const trees = Array.from({ length: 26 }, (_, i) => {
    const x = i * 56 + ((i * 37 + seed * 61) % 30);
    const h = 60 + ((i * 71 + seed * 13) % 70);
    const w = 16 + ((i * 29) % 14);
    return { x, h, w };
  });
  return (
    <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true"
      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height, opacity, display: 'block' }}>
      <path d="M0 200 L0 178 L1440 168 L1440 200 Z" fill={color} />
      {trees.map((t, i) => (
        <path key={i} d={`M${t.x} ${185 - t.h} L${t.x - t.w} 185 L${t.x + t.w} 185 Z M${t.x} ${185 - t.h * 0.72} L${t.x - t.w * 0.8} ${185 - t.h * 0.3} L${t.x + t.w * 0.8} ${185 - t.h * 0.3} Z`} fill={color} />
      ))}
    </svg>
  );
}

// Typographic brand wordmark — "Popcorn & Freddy" in the display serif with a gold italic ampersand
function RdLogo({ size = 23, tone = 'ink' }) {
  const color = tone === 'cream' ? 'var(--rd-cream)' : 'var(--rd-ink)';
  const amp = tone === 'cream' ? 'var(--rd-gold-soft)' : 'var(--rd-gold)';
  return (
    <span className="rd-logo-mark" style={{ display: 'inline-flex', alignItems: 'baseline', gap: Math.round(size * 0.32), whiteSpace: 'nowrap', lineHeight: 1 }}>
      <span style={{ fontFamily: 'var(--f-display)', fontSize: `clamp(19px, 4.6vw, ${size}px)`, letterSpacing: '0.005em', color }}>Popcorn</span>
      <span aria-hidden="true" style={{ fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontWeight: 500, fontSize: `clamp(19.4px, 4.7vw, ${size * 1.02}px)`, color: amp, transform: 'translateY(1px)' }}>&amp;</span>
      <span style={{ fontFamily: 'var(--f-display)', fontSize: `clamp(19px, 4.6vw, ${size}px)`, letterSpacing: '0.005em', color }}>Freddy</span>
    </span>
  );
}

// Section heading block (eyebrow + title + optional lede), centered or left
function RdHeading({ eyebrow, title, lede, center = true, dark = false, max = 820, ledeMax = 660 }) {
  return (
    <div className="r-rev" style={{ textAlign: center ? 'center' : 'left', maxWidth: max, margin: center ? '0 auto' : undefined }}>
      {eyebrow && <span className="r-caps r-caps-rule" style={{ color: dark ? 'var(--rd-gold-soft)' : 'var(--rd-gold)' }}>{eyebrow}</span>}
      {title && <h2 className="r-display" style={{ fontSize: 'clamp(36px, 4.6vw, 62px)', marginTop: 24, color: dark ? 'var(--rd-cream)' : 'var(--rd-ink)', textWrap: 'pretty' }}>{title}</h2>}
      {lede && <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.35vw, 20.5px)', color: dark ? 'rgba(242,236,217,0.8)' : 'var(--rd-ink-soft)', marginTop: 20, lineHeight: 1.65, maxWidth: ledeMax, marginInline: center ? 'auto' : undefined, textWrap: 'pretty' }}>{lede}</p>}
    </div>
  );
}

// Compact trust row — shipping, payment methods, returns link. Sits near any price/CTA.
function RdTrustRow({ t, dark = false, center = true, style }) {
  const tr = (t && t.trust) || { ship: '', returns: '', pay: [] };
  const muted = dark ? 'rgba(242,236,217,0.72)' : 'var(--rd-ink-mute)';
  return (
    <div className="rd-trust" data-dark={dark ? 'true' : 'false'} style={{ justifyContent: center ? 'center' : 'flex-start', ...style }}>
      <span className="rd-trust-ship" style={{ color: muted }}>
        <span style={{ color: dark ? 'var(--rd-gold-soft)' : 'var(--rd-gold)', display: 'inline-flex', flex: 'none' }}><RdIcon name="truck" size={17} /></span>
        {tr.ship}
      </span>
      <span className="rd-trust-pay">
        {(tr.pay || []).map((p, i) => <span key={i} className="rd-pay-chip">{p}</span>)}
      </span>
      <a href="Versand & Ruecksendung.html" className="rd-trust-ret" style={{ color: muted }}>{tr.returns}</a>
    </div>
  );
}

// Storybook deck: one "book plate" at a time resting on a stack of paper sheets.
// Turning pages animates like a page-turn; gold sparkles twinkle on the plate.
function RdCarousel({ children, trackClass, ariaLabel }) {
  const items = React.Children.toArray(children);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState('next');
  const [turn, setTurn] = useState(0);
  const drag = useRef(null);
  const go = (i) => {
    if (i === active || i < 0 || i > items.length - 1) return;
    setDir(i > active ? 'next' : 'prev'); setActive(i); setTurn((t) => t + 1);
  };
  const onPointerDown = (e) => { drag.current = { x: e.clientX }; };
  const onPointerUp = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x; drag.current = null;
    if (dx < -40) go(active + 1); else if (dx > 40) go(active - 1);
  };
  const mod = trackClass && trackClass.includes('test') ? ' rd-story-deck--test' : '';
  return (
    <div className="rd-storybook">
      <div className={'rd-story-deck' + mod} role="group" aria-label={ariaLabel} tabIndex={0} style={{ touchAction: 'pan-y' }}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') go(active + 1); if (e.key === 'ArrowLeft') go(active - 1); }}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className="rd-deck-sheet rd-deck-sheet-a" aria-hidden="true"></div>
        <div className="rd-deck-sheet rd-deck-sheet-b" aria-hidden="true"></div>
        <div className="rd-deck-plate" key={turn} data-dir={dir}>
          {[['9%', '6%', '0s'], ['6%', '90%', '0.9s'], ['86%', '8%', '1.5s'], ['90%', '86%', '0.4s']].map((s, i) => (
            <span key={i} className="rd-deck-spark" aria-hidden="true" style={{ top: s[0], left: s[1], animationDelay: s[2] }}>✦</span>
          ))}
          {items[active]}
        </div>
        <button type="button" className="rd-deck-arrow rd-deck-prev" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous">
          <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><RdIcon name="arrow" size={18} /></span>
        </button>
        <button type="button" className="rd-deck-arrow rd-deck-next" onClick={() => go(active + 1)} disabled={active === items.length - 1} aria-label="Next">
          <RdIcon name="arrow" size={18} />
        </button>
      </div>
      {items.length > 1 && (
        <div className="rd-deck-gems">
          {items.map((_, i) => <button key={i} type="button" className={'rd-deck-gem' + (i === active ? ' active' : '')} onClick={() => go(i)} aria-label={`Go to ${i + 1}`}></button>)}
        </div>
      )}
    </div>
  );
}

// Peek scroller: cards side by side, next card partially visible, scroll-snap + arrows.
function RdPeekCarousel({ children, ariaLabel }) {
  const items = React.Children.toArray(children);
  const ref = useRef(null);
  const [at, setAt] = useState({ start: true, end: false });
  const update = () => {
    const el = ref.current; if (!el) return;
    setAt({ start: el.scrollLeft < 20, end: el.scrollLeft > el.scrollWidth - el.clientWidth - 20 });
  };
  useEffect(() => { update(); const el = ref.current; if (!el) return; el.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, []);
  const step = (d) => {
    const el = ref.current; if (!el) return;
    const card = el.querySelector('.rd-peek-item');
    const w = card ? card.getBoundingClientRect().width + 26 : el.clientWidth * 0.7;
    el.scrollBy({ left: d * w, behavior: 'smooth' });
  };
  return (
    <div className="rd-peek" role="group" aria-label={ariaLabel}>
      <div className="rd-peek-track" ref={ref}>
        {items.map((it, i) => <div key={i} className="rd-peek-item">{it}</div>)}
      </div>
      <button type="button" className="rd-deck-arrow rd-peek-prev" onClick={() => step(-1)} disabled={at.start} aria-label="Previous">
        <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><RdIcon name="arrow" size={18} /></span>
      </button>
      <button type="button" className="rd-deck-arrow rd-peek-next" onClick={() => step(1)} disabled={at.end} aria-label="Next">
        <RdIcon name="arrow" size={18} />
      </button>
    </div>
  );
}

// ─── CART FLYOUT (shared across ALL pages) ──────────────────
function rdMoney(n, lang) { return lang === 'de' ? `${n.toFixed(2).replace('.', ',')} €` : `€${n.toFixed(2)}`; }

// Option B: cart / "checkout" buttons open the on-site checkout page
// (basket → delivery). The delivery step then hands off to Shopify's hosted
// checkout, pre-filled, at the payment step (see rd-checkout-app.jsx goToPayment).
function rdCheckout() {
  if (window.PFLocale) { PFLocale.go('Checkout.html'); return; }
  window.location.href = 'Checkout.html';
}

// Subtle, dismissible country/currency suggestion. Never forces anything.
function RdCountrySuggest({ lang }) {
  const [sug, setSug] = useState(null); // suggested country code
  useEffect(() => {
    if (!window.PFShop || typeof window.PFShop.suggestCountry !== 'function') return;
    try { if (localStorage.getItem(RD_SUGGEST_DISMISS_KEY)) return; } catch (e) {}
    let alive = true;
    window.PFShop.suggestCountry().then(function (code) {
      if (!alive || !code) return;
      const active = window.PFShop.activeCountries();
      const here = window.PFShop.savedCountry();
      if (active.indexOf(code) >= 0 && code !== here) setSug(code);
    }).catch(function () {});
    return () => { alive = false; };
  }, []);
  if (!sug) return null;
  const T = RD_SUGGEST_T[lang] || RD_SUGGEST_T.de;
  const Tb = RD_LOCALE_T[lang] || RD_LOCALE_T.de;
  const dismiss = () => { try { localStorage.setItem(RD_SUGGEST_DISMISS_KEY, '1'); } catch (e) {} setSug(null); };
  const confirm = () => {
    try { localStorage.setItem(RD_SUGGEST_DISMISS_KEY, '1'); } catch (e) {}
    if (window.PFShop && window.PFShop.enabled) { try { window.PFShop.setBuyerCountry(sug); } catch (e) {} }
    // sug is a country code (AT/DE/CH/US) → the prefix for that country IN THE
    // LANGUAGE currently being read, so switching market never switches language.
    let pre = rdActivePrefix();
    try { pre = (window.PFLocale && PFLocale.prefixFor(sug, PFLocale.current().language)) || pre; } catch (e) {}
    setTimeout(function () { if (window.PFLocale) PFLocale.switchTo(pre); }, 40);
  };
  const other = () => { dismiss(); window.dispatchEvent(new Event('pf-open-locale')); };
  return (
    <div className="rd-suggest" role="dialog" aria-live="polite">
      <button className="rd-suggest-x" aria-label={T.close} onClick={dismiss}><RdIcon name="close" size={15} /></button>
      <div className="rd-suggest-row"><RdFlag c={sug} size={20} /><span className="rd-suggest-line">{T.line(Tb.country[sug], rdCurrencyFor(sug))}</span></div>
      <div className="rd-suggest-actions">
        <button className="rbtn rbtn-primary" style={{ padding: '9px 16px', fontSize: 13.5 }} onClick={confirm}>{T.yes}</button>
        <button className="rbtn rbtn-ghost" style={{ padding: '9px 16px', fontSize: 13.5 }} onClick={other}>{T.other}</button>
      </div>
      <style>{`
        .rd-suggest { position: fixed; left: 18px; bottom: 18px; z-index: 55; width: min(340px, calc(100vw - 36px)); background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 16%, transparent); border-radius: 14px; padding: 16px 18px 15px; box-shadow: 0 24px 60px -26px color-mix(in srgb, var(--rd-ink) 60%, transparent); animation: rdSuggestIn .4s cubic-bezier(.22,.61,.36,1); }
        @keyframes rdSuggestIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rd-suggest-x { position: absolute; top: 9px; right: 9px; width: 28px; height: 28px; display: grid; place-items: center; border: none; background: transparent; color: var(--rd-ink-mute); cursor: pointer; border-radius: 7px; }
        .rd-suggest-x:hover { color: var(--rd-ink); background: color-mix(in srgb, var(--rd-ink) 7%, transparent); }
        .rd-suggest-row { display: flex; align-items: flex-start; gap: 11px; padding-right: 22px; }
        .rd-suggest-line { font-family: var(--f-sans); font-size: 14.5px; line-height: 1.5; color: var(--rd-ink); }
        .rd-suggest-actions { display: flex; gap: 9px; margin-top: 14px; }
      `}</style>
    </div>
  );
}

// Subtle, dismissible LANGUAGE suggestion — the exact same pattern as the
// country nudge above, for a visitor whose device speaks the other language.
// Same market, same currency: only the text language changes (/at ↔ /at-en).
function RdLangSuggest() {
  const [target, setTarget] = useState(null); // 'de' | 'en' — the language offered
  useEffect(() => {
    if (!window.PFLocale || typeof PFLocale.peerLanguage !== 'function') return;
    try { if (localStorage.getItem(RD_LANGSUG_DISMISS_KEY)) return; } catch (e) {}
    try { if (PFLocale.wasExplicit()) return; } catch (e) {}   // they chose a locale themselves
    const here = PFLocale.current().language;
    const dev = PFLocale.deviceLanguage();
    if (dev === here) return;
    if (!PFLocale.peerLanguage()) return;                      // no route in that language
    let alive = true;
    // One nudge at a time: if the country banner is about to appear, stay quiet
    // and offer the language on the next visit instead.
    const countryPending = () => new Promise((res) => {
      try { if (localStorage.getItem(RD_SUGGEST_DISMISS_KEY)) return res(false); } catch (e) {}
      if (!(window.PFShop && typeof PFShop.suggestCountry === 'function')) return res(false);
      PFShop.suggestCountry().then((code) => {
        try { res(!!code && PFShop.activeCountries().indexOf(code) >= 0 && code !== PFShop.savedCountry()); }
        catch (e) { res(false); }
      }).catch(() => res(false));
    });
    countryPending().then((busy) => { if (alive && !busy) setTarget(dev.toLowerCase()); });
    return () => { alive = false; };
  }, []);
  if (!target) return null;
  const T = RD_LANGSUG_T[target] || RD_LANGSUG_T.en;
  const dismiss = () => { try { localStorage.setItem(RD_LANGSUG_DISMISS_KEY, '1'); } catch (e) {} setTarget(null); };
  const confirm = () => {
    dismiss();
    const pre = PFLocale.peerLanguage();
    if (pre) setTimeout(() => PFLocale.switchTo(pre), 40);
  };
  return (
    <div className="rd-suggest" role="dialog" aria-live="polite">
      <button className="rd-suggest-x" aria-label={T.close} onClick={dismiss}><RdIcon name="close" size={15} /></button>
      <div className="rd-suggest-row"><RdFlag c="OTHER" size={20} /><span className="rd-suggest-line">{T.line}</span></div>
      <div className="rd-suggest-actions">
        <button className="rbtn rbtn-primary" style={{ padding: '9px 16px', fontSize: 13.5 }} onClick={confirm}>{T.yes}</button>
        <button className="rbtn rbtn-ghost" style={{ padding: '9px 16px', fontSize: 13.5 }} onClick={dismiss}>{T.other}</button>
      </div>
      <style>{`
        .rd-suggest { position: fixed; left: 18px; bottom: 18px; z-index: 55; width: min(340px, calc(100vw - 36px)); background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 16%, transparent); border-radius: 14px; padding: 16px 18px 15px; box-shadow: 0 24px 60px -26px color-mix(in srgb, var(--rd-ink) 60%, transparent); animation: rdSuggestIn .4s cubic-bezier(.22,.61,.36,1); }
        @keyframes rdSuggestIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .rd-suggest-x { position: absolute; top: 9px; right: 9px; width: 28px; height: 28px; display: grid; place-items: center; border: none; background: transparent; color: var(--rd-ink-mute); cursor: pointer; border-radius: 7px; }
        .rd-suggest-x:hover { color: var(--rd-ink); background: color-mix(in srgb, var(--rd-ink) 7%, transparent); }
        .rd-suggest-row { display: flex; align-items: flex-start; gap: 11px; padding-right: 22px; }
        .rd-suggest-line { font-family: var(--f-sans); font-size: 14.5px; line-height: 1.5; color: var(--rd-ink); }
        .rd-suggest-actions { display: flex; gap: 9px; margin-top: 14px; }
      `}</style>
    </div>
  );
}

// Empty basket → offer the obvious next step instead of a dead end: chapter 1,
// priced live from Shopify. It never writes to the basket itself (the host page
// owns cart state, so an add from in here could not re-render this panel and led
// to silent double counts) — it links to the product page, where quantity and
// the child's name are handled. Shopify is the ONLY source: with no live
// product there is no card, just the empty note.
function RdCartSuggest({ lang }) {
  const handle = 'kapitel-1-fluesterwald';
  const p = usePFProduct(handle, lang);
  const img = p && p.images && p.images[0] && (p.images[0].src || p.images[0]);
  return (
    <div className="rd-cart-empty">
      <div className="r-it" style={{ fontSize: 17, color: 'var(--rd-ink-soft)' }}>{lang === 'de' ? 'Noch leer — Zeit für ein Abenteuer ✦' : 'Empty — time for an adventure ✦'}</div>
      {p && p.title && (
        <React.Fragment>
          <div className="r-caps" style={{ marginTop: 18, color: 'var(--rd-ink-mute)' }}>{lang === 'de' ? 'Hier fängt alles an' : 'Where it all begins'}</div>
          <a className="rd-bsug" href={'/produkt/' + handle}>
            {img && <img src={img} alt="" />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="rd-bsug-title">{p.title}</div>
              {p.priceFormatted && <div className="r-it" style={{ fontSize: 14, color: 'var(--rd-ink-soft)', marginTop: 2 }}>{p.priceFormatted}</div>}
              <span className="rd-bsug-cta">{lang === 'de' ? 'Kapitel ansehen' : 'View chapter'} <RdIcon name="arrow" size={15} /></span>
            </div>
          </a>
        </React.Fragment>
      )}
      <a className="rd-cart-continue" style={{ display: 'block', textAlign: 'center' }} href="/Alle Kapitel.html">{lang === 'de' ? 'Alle Kapitel ansehen' : 'See all chapters'}</a>
    </div>
  );
}

function RdCart({ open, cart, onClose, lang, onQty, onRemove, justAdded }) {
  const lines = usePFCartLines(cart, lang);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const count = cart.reduce((s, c) => s + (c.qty || 1), 0);
  const cur = (lines.find((c) => c.currency) || {}).currency;
  const fmt = (n, cc) => ((cc || cur) && window.PFShop) ? window.PFShop.money(n, cc || cur, lang) : rdMoney(n, lang);
  const total = lines.reduce((s, c) => s + (c.qty || 1) * (c.price || 0), 0);
  return (
    <React.Fragment>
      <div className="rd-cart-scrim" onClick={onClose} />
      <div className="rd-cart-panel" role="dialog" aria-modal="true" aria-label={lang === 'de' ? 'Warenkorb' : 'Cart'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div className="r-it" style={{ fontSize: 24, fontWeight: 600, color: 'var(--rd-ink)' }}>{lang === 'de' ? 'Dein Korb' : 'Your basket'}{count > 0 ? ` · ${count}` : ''}</div>
          <button onClick={onClose} aria-label="close" style={{ fontSize: 24, lineHeight: 1, color: 'var(--rd-ink-mute)', padding: 4 }}>×</button>
        </div>

        {cart.length > 0 && (
          <div className="rd-ship-nudge">
            <div className="rd-ship-text">
              <RdIcon name="truck" size={16} />
              <span>{lang === 'de' ? 'Versandkosten werden an der Kasse berechnet' : 'Shipping calculated at checkout'}</span>
            </div>
          </div>
        )}

        <div className="rd-cart-items">
          {cart.length === 0 && <RdCartSuggest lang={lang} />}
          {lines.map((c) => (
            <div key={c.n} className={'rd-cart-line' + (justAdded === c.n ? ' is-added' : '')}>
              {c.img
                ? <img src={c.img} style={{ width: 52, height: 52, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} alt="" />
                : <div className="rd-skel" style={{ width: 52, height: 52, borderRadius: 8, flexShrink: 0 }} aria-hidden="true" />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--rd-ink)', fontFamily: 'var(--f-sans)' }}>{c.title || <span className="rd-skel" style={{ display: 'inline-block', width: 120, height: 13, borderRadius: 4 }} />}</div>
                <div className="r-it r-price" style={{ fontSize: 14, color: 'var(--rd-ink-soft)' }}>{c.priceFormatted || ''}</div>
                {c.gift && <div className="r-it" style={{ fontSize: 13, color: 'var(--rd-gold)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}><RdIcon name="gift" size={13} />{lang === 'de' ? 'Als Geschenk' : 'As a gift'}</div>}
                <div className="rd-qty">
                  <button aria-label="minus" onClick={() => (c.qty || 1) > 1 ? onQty(c.n, -1) : onRemove(c.n)}>–</button>
                  <span>{c.qty || 1}</span>
                  <button aria-label="plus" disabled={c.max != null && (c.qty || 1) >= c.max} style={c.max != null && (c.qty || 1) >= c.max ? { opacity: 0.4, cursor: 'not-allowed' } : undefined} onClick={() => onQty(c.n, 1)}>+</button>
                  <button className="rd-remove" onClick={() => onRemove(c.n)}>{lang === 'de' ? 'Entfernen' : 'Remove'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <React.Fragment>
            <div style={{ marginTop: 14, padding: '13px 0', borderTop: '1px dashed color-mix(in srgb, var(--rd-ink) 22%, transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="r-caps" style={{ color: 'var(--rd-ink-mute)' }}>{lang === 'de' ? 'Zwischensumme' : 'Subtotal'}</span>
              <span className="r-display" style={{ fontSize: 26, color: 'var(--rd-ink)' }}>{fmt(total)}</span>
            </div>
            <div style={{ marginTop: -4, marginBottom: 4, textAlign: 'right', fontFamily: 'var(--f-sans)', fontSize: 12.5, color: 'var(--rd-ink-mute)' }}>{lang === 'de' ? 'inkl. MwSt. · Versand an der Kasse' : 'incl. VAT · shipping at checkout'}</div>
            <button className="rbtn rbtn-primary" onClick={rdCheckout} style={{ width: '100%', fontSize: 17 }}>{lang === 'de' ? 'Sicher zur Kasse' : 'Secure checkout'} <RdIcon name="arrow" size={17} /></button>
            <button className="rd-cart-continue" onClick={onClose}>{lang === 'de' ? 'Weiter stöbern' : 'Continue browsing'}</button>
            <div className="rd-cart-trust">
              <span><RdIcon name="shield" size={14} />{lang === 'de' ? 'Sichere Zahlung' : 'Secure payment'}</span>
              <span><RdIcon name="gift" size={14} />{lang === 'de' ? 'Sorgfältig verpackt' : 'Carefully packaged'}</span>
            </div>
          </React.Fragment>
        )}
      </div>
      <style>{`
        .rd-cart-scrim { position: fixed; inset: 0; z-index: 59; background: rgba(20,16,10,0.32); animation: rdScrimIn .22s ease; }
        @keyframes rdScrimIn { from { opacity: 0 } to { opacity: 1 } }
        .rd-cart-panel { position: fixed; top: 0; right: 0; bottom: 0; z-index: 60; width: min(400px, 92vw); background: var(--rd-cream); box-shadow: -30px 0 80px -30px rgba(0,0,0,0.5); padding: 22px clamp(18px,2.4vw,26px); display: flex; flex-direction: column; overflow-y: auto; animation: rdPanelIn .3s cubic-bezier(.22,.61,.36,1); }
        @keyframes rdPanelIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
        .rd-ship-nudge { margin: 8px 0 4px; padding: 12px 14px; background: var(--rd-paper-soft); border-radius: 11px; }
        .rd-ship-text { display: flex; align-items: center; gap: 8px; font-family: var(--f-sans); font-size: 14px; color: var(--rd-ink-soft); }
        .rd-ship-text strong { color: var(--rd-ink); font-weight: 700; }
        .rd-ship-text svg { color: var(--rd-terra); flex-shrink: 0; }
        .rd-ship-track { margin-top: 9px; height: 6px; border-radius: 4px; background: color-mix(in srgb, var(--rd-ink) 12%, transparent); overflow: hidden; }
        .rd-ship-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--rd-terra), var(--rd-gold)); transition: width .5s cubic-bezier(.22,.61,.36,1); }
        .rd-cart-empty { padding: 8px 2px; }
        .rd-bsug { margin-top: 10px; display: flex; align-items: center; gap: 13px; padding: 12px; background: var(--rd-paper-soft); border-radius: 11px; border: 1px solid color-mix(in srgb, var(--rd-gold) 32%, transparent); text-decoration: none; transition: border-color .2s, background .2s; }
        .rd-bsug:hover { border-color: var(--rd-gold); background: color-mix(in srgb, var(--rd-gold) 8%, var(--rd-paper-soft)); }
        .rd-bsug-cta { display: inline-flex; align-items: center; gap: 6px; margin-top: 9px; font-family: var(--f-sans); font-weight: 700; font-size: 13px; color: var(--rd-terra); }
        .rd-bsug img { width: 64px; height: 80px; border-radius: 8px; object-fit: cover; flex-shrink: 0; }
        .rd-bsug-title { font-family: var(--f-sans); font-weight: 600; font-size: 14.5px; color: var(--rd-ink); line-height: 1.3; }
        .rd-bsug-link { font-family: var(--f-sans); font-size: 13.5px; color: var(--rd-ink-mute); text-decoration: underline; }
        .rd-cart-items { margin-top: 12px; flex: 1; display: grid; gap: 10px; align-content: start; }
        .rd-cart-line { display: flex; align-items: flex-start; gap: 12px; padding: 10px; background: var(--rd-paper-soft); border-radius: 11px; border: 1px solid transparent; transition: border-color .3s, background .3s; }
        .rd-cart-line.is-added { border-color: var(--rd-gold); animation: rdAdded .7s ease; }
        @keyframes rdAdded { 0% { background: color-mix(in srgb, var(--rd-gold) 26%, var(--rd-paper-soft)) } 100% { background: var(--rd-paper-soft) } }
        .rd-qty { display: flex; align-items: center; gap: 4px; margin-top: 8px; }
        .rd-qty > button { width: 26px; height: 26px; border-radius: 7px; border: 1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent); background: var(--rd-cream); color: var(--rd-ink); font-size: 16px; line-height: 1; display: grid; place-items: center; cursor: pointer; transition: background .15s; }
        .rd-qty > button:hover { background: color-mix(in srgb, var(--rd-terra) 14%, var(--rd-cream)); }
        .rd-qty > span { min-width: 22px; text-align: center; font-family: var(--f-sans); font-weight: 700; font-size: 14px; color: var(--rd-ink); }
        .rd-qty .rd-remove { margin-left: auto; width: auto; border: none; background: none; font-family: var(--f-sans); font-size: 12.5px; color: var(--rd-ink-mute); text-decoration: underline; cursor: pointer; padding: 0 2px; }
        .rd-qty .rd-remove:hover { color: var(--rd-terra); }
        .rd-cart-continue { margin-top: 9px; width: 100%; background: none; border: none; font-family: var(--f-sans); font-size: 14px; color: var(--rd-ink-mute); text-decoration: underline; cursor: pointer; padding: 4px; }
        .rd-cart-continue:hover { color: var(--rd-ink); }
        .rd-cart-trust { margin-top: 14px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
        .rd-cart-trust span { display: inline-flex; align-items: center; gap: 6px; font-family: var(--f-sans); font-size: 12.5px; color: var(--rd-ink-mute); }
        .rd-cart-trust svg { color: var(--rd-terra); }
        .rd-skel { background: linear-gradient(90deg, color-mix(in srgb, var(--rd-ink) 8%, transparent) 25%, color-mix(in srgb, var(--rd-ink) 14%, transparent) 37%, color-mix(in srgb, var(--rd-ink) 8%, transparent) 63%); background-size: 400% 100%; animation: rdSkel 1.4s ease infinite; }
        @keyframes rdSkel { 0% { background-position: 100% 50% } 100% { background-position: 0 50% } }
      `}</style>
    </React.Fragment>
  );
}

// Shared topbar cart controls — identical markup on home + all subpages.
// Renders the desktop pill + mobile green square (with badge) and owns nothing;
// the parent passes cartCount + onOpenCart.
function RdCartButtons({ label, cartCount, onOpenCart }) {
  return (
    <React.Fragment>
      <button onClick={onOpenCart} aria-label="cart" className="rbtn rbtn-primary rd-cart-btn" style={{ position: 'relative', padding: '10px 18px', fontSize: 14, borderRadius: 9 }}>
        <RdIcon name="cart" size={16} />
        <span className="rd-cart-label">{label}</span>
        {cartCount > 0 && (
          <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--rd-terra)', color: 'var(--rd-cream)', borderRadius: '50%', width: 21, height: 21, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, fontFamily: 'var(--f-sans)' }}>{cartCount}</span>
        )}
      </button>
      <button onClick={onOpenCart} aria-label="cart" className="rd-cart-btn-mobile" style={{ position: 'relative', boxSizing: 'border-box', width: 42, height: 42, minWidth: 42, minHeight: 42, maxWidth: 42, maxHeight: 42, padding: 0, margin: 0, border: 'none', borderRadius: 9, background: 'var(--rd-primary)', color: 'var(--rd-on-primary)', display: 'none', alignItems: 'center', justifyContent: 'center', flex: '0 0 42px' }}>
        <RdIcon name="cart" size={18} />
        {cartCount > 0 && (
          <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--rd-terra)', color: 'var(--rd-cream)', borderRadius: '50%', width: 18, height: 18, display: 'grid', placeItems: 'center', fontSize: 10.5, fontWeight: 800, fontFamily: 'var(--f-sans)', lineHeight: 1 }}>{cartCount}</span>
        )}
      </button>
    </React.Fragment>
  );
}

Object.assign(window, { RD_PREFIXES, rdPrefixMeta, rdCurrencyFor, RdCartSuggest, usePFChapters, usePFProduct, usePFCartLines, RdIcon, RdOrnament, RdSquiggle, RdCompass, RdLeaves, RdFireflies, RdPines, RdHeading, RdLogo, rdCartLoad, rdCartSave, RD_CART_KEY, RD_CRAFT, RdCraftNote, RdTrustRow, RdCarousel, RdPeekCarousel, RdFlag, RdLocaleControl, RdTrail, RdPaws, rdMoney, rdCheckout, RdCountrySuggest, RdLangSuggest, RdCart, RdCartButtons });
