// ────────────────────────────────────────────────────────────────
// Checkout — copy (DE/EN) + shared pieces
// ────────────────────────────────────────────────────────────────
const useMemo = React.useMemo; // useEffect/useState/useRef already bound in rd-ui.jsx

const RC_COPY = {
  de: {
    browse: '← Weiter stöbern',
    secure: 'Sichere Bestellung',
    steps: ['Dein Korb', 'Lieferung', 'Zahlung'],
    cart: {
      title: 'Dein Warenkorb',
      chapter: 'Kapitel',
      each: 'je 39,90 €',
      remove: 'Entfernen',
      empty_title: 'Dein Korb ist noch leer.',
      empty_body: 'Jede große Schatzsuche beginnt mit dem ersten Kapitel.',
      empty_cta: 'Kapitel 1 in den Korb',
      empty_back: 'Zurück zur Startseite',
      personal_title: 'Für wen ist das Abenteuer?',
      personal_hint: 'Der Name wird in die Geschichte gedruckt und in die Kunstleder-Mappe graviert.',
      name_label: 'Name deines Kindes',
      name_ph: 'z. B. Lukas',
      box_label: (n) => `Box ${n}`,
      box_hint: 'Jede Box wird einzeln personalisiert.',
      lang_label: 'Sprache des Buches',
      lang_hint: 'Weitere Sprachen folgen bald.',
      langs: [{ id: 'de', l: 'Deutsch' }, { id: 'en', l: 'English' }],
      engrave_caps: 'Die Abenteuer von',
      engrave_empty: 'deinem Kind',
      folder_t: 'Personalisierte Kunstleder-Mappe',
      folder_d: 'Einmalig zur ersten Box — mit Namensgravur von Popcorn & Freddy.',
      folder_free: 'Geschenkt',
      addons_title: 'Kleine Extras für die Reise',
      addons: [
        { id: 'wrap', t: 'Magische Geschenkverpackung', d: 'In Packpapier mit Wachssiegel & Tannenzweig.', price: 4.9, icon: 'gift' },
        { id: 'paints', t: 'Extra Farben-Set', d: '6 zusätzliche Farben & ein zweiter Pinsel.', price: 6.9, icon: 'palette' },
      ],
      next: 'Weiter zur Lieferung',
    },
    ship: {
      title: 'Wohin reist die Box?',
      f_name: 'Vor- & Nachname', f_street: 'Straße & Hausnummer', f_zip: 'PLZ', f_city: 'Ort', f_country: 'Land', f_email: 'E-Mail für die Reisepost',
      countries: ['Deutschland', 'Österreich', 'Schweiz'],
      note: 'In 3–5 Werktagen bei dir. Die Versandkosten werden nach Eingabe deiner Lieferadresse berechnet.',
      back: 'Zurück',
      next: 'Weiter zur Zahlung',
    },
    pay: {
      title: 'Wie möchtest du zahlen?',
      options: ['Kreditkarte', 'PayPal', 'Klarna', 'SEPA-Lastschrift'],
      c_num: 'Kartennummer', c_exp: 'Gültig bis', c_cvc: 'CVC',
      redirect: 'Du wirst nach dem Versiegeln sicher weitergeleitet.',
      back: 'Zurück',
      order: 'Bestellung versiegeln',
      sealing: 'Siegel wird gesetzt…',
      legal: 'Mit deiner Bestellung akzeptierst du unsere AGB. Personalisierte Boxen sind vom Rücktritt ausgenommen.',
    },
    gift: {
      title: 'Geschenkkarte einlösen',
      hint: 'Hast du eine Geschenkkarte? Gib den Code ein.',
      ph: 'PF-XXXX-XXXX',
      apply: 'Einlösen',
      checking: 'Prüfe …',
      remove: 'Entfernen',
      line: 'Geschenkkarte',
      applied: 'Geschenkkarte eingelöst',
      remaining: (v) => `Restguthaben nach Bestellung: ${v}`,
      err_invalid: 'Dieser Code ist ungültig.',
      err_depleted: 'Dieses Guthaben ist bereits aufgebraucht.',
      err_net: 'Prüfung nicht möglich. Bitte online (auf Netlify) erneut versuchen.',
    },
    disc: {
      title: 'Rabattcode',
      hint: 'Aktionscode? Hier eingeben.',
      ph: 'CODE',
      apply: 'Anwenden',
      checking: 'Prüfe …',
      remove: 'Entfernen',
      line: 'Rabatt',
      applied: 'Rabatt angewendet',
      err_invalid: 'Dieser Code ist ungültig.',
      err_expired: 'Dieser Code ist abgelaufen.',
      err_used: 'Dieser Code wurde bereits vollständig eingelöst.',
      err_min: (v) => `Erst ab einem Bestellwert von ${v} gültig.`,
      err_net: 'Prüfung nicht möglich. Bitte online (auf Netlify) erneut versuchen.',
    },
    cur: { label: 'Währung', note: (c) => `Preise in ${c}` },
    sum: {
      title: 'Deine Schatzkiste',
      subtotal: 'Zwischensumme',
      shipping: 'Versand',
      ship_later: 'zzgl. Versand',
      ship_calc: 'wird berechnet …',
      ship_later_note: 'Wird nach Eingabe der Lieferadresse berechnet.',
      free: 'Gratis',
      total: 'Gesamt',
      vat: 'inkl. MwSt.',
      contents: 'Das steckt in jeder Box',
      trust: [
        { icon: 'truck', t: 'Versand in 3–5 Werktagen' },
        { icon: 'shield', t: 'Sicher & schadstofffrei' },
        { icon: 'gift', t: 'Geschenkfertig verpackt' },
      ],
    },
    done: {
      caps: 'Bestellung versiegelt',
      title: (name) => name ? `Das Abenteuer von ${name} beginnt.` : 'Das Abenteuer beginnt.',
      body: 'Deine Schatzkiste wird von Hand gepackt. Die Reisepost mit allen Details ist unterwegs in dein Postfach.',
      order_no: 'Bestellnummer',
      timeline: [
        { icon: 'build', t: 'Heute', d: 'Deine Box wird gepackt & graviert.' },
        { icon: 'truck', t: '3–5 Werktage', d: 'Die Schatzkiste reist zu euch.' },
        { icon: 'book', t: 'Dann', d: 'Vorlesen, bauen — und losziehen.' },
      ],
      cta: 'Zurück zur Startseite',
    },
  },
  en: {
    browse: '← Keep browsing',
    secure: 'Secure checkout',
    steps: ['Your basket', 'Delivery', 'Payment'],
    cart: {
      title: 'Your basket',
      chapter: 'Chapter',
      each: '€39.90 each',
      remove: 'Remove',
      empty_title: 'Your basket is still empty.',
      empty_body: 'Every great treasure hunt starts with the first chapter.',
      empty_cta: 'Add chapter 1',
      empty_back: 'Back to the homepage',
      personal_title: 'Who is the adventure for?',
      personal_hint: 'The name is printed into the story and engraved on the faux leather folder.',
      name_label: "Your child's name",
      name_ph: 'e.g. Lukas',
      box_label: (n) => `Box ${n}`,
      box_hint: 'Each box is personalised individually.',
      lang_label: 'Language of the book',
      lang_hint: 'More languages coming soon.',
      langs: [{ id: 'de', l: 'Deutsch' }, { id: 'en', l: 'English' }],
      engrave_caps: 'The adventures of',
      engrave_empty: 'your child',
      folder_t: 'Personalised faux leather folder',
      folder_d: 'One-time with your first box — engraved by Popcorn & Freddy.',
      folder_free: 'On us',
      addons_title: 'Little extras for the journey',
      addons: [
        { id: 'wrap', t: 'Magical gift wrapping', d: 'Kraft paper with a wax seal & a sprig of pine.', price: 4.9, icon: 'gift' },
        { id: 'paints', t: 'Extra paint set', d: '6 additional colours & a second brush.', price: 6.9, icon: 'palette' },
      ],
      next: 'Continue to delivery',
    },
    ship: {
      title: 'Where is the box travelling?',
      f_name: 'First & last name', f_street: 'Street & number', f_zip: 'Postcode', f_city: 'City', f_country: 'Country', f_email: 'Email for the travel post',
      countries: ['Germany', 'Austria', 'Switzerland'],
      note: 'With you in 3–5 business days. Shipping is calculated once you enter your delivery address.',
      back: 'Back',
      next: 'Continue to payment',
    },
    pay: {
      title: 'How would you like to pay?',
      options: ['Credit card', 'PayPal', 'Klarna', 'SEPA direct debit'],
      c_num: 'Card number', c_exp: 'Expiry', c_cvc: 'CVC',
      redirect: "You'll be redirected securely after sealing.",
      back: 'Back',
      order: 'Seal the order',
      sealing: 'Setting the seal…',
      legal: 'By ordering you accept our terms. Personalised boxes are excluded from withdrawal.',
    },
    gift: {
      title: 'Redeem a gift card',
      hint: 'Got a gift card? Enter the code.',
      ph: 'PF-XXXX-XXXX',
      apply: 'Redeem',
      checking: 'Checking …',
      remove: 'Remove',
      line: 'Gift card',
      applied: 'Gift card applied',
      remaining: (v) => `Balance after this order: ${v}`,
      err_invalid: 'This code is not valid.',
      err_depleted: 'This balance has already been used up.',
      err_net: 'Could not check the code. Please try again online (on Netlify).',
    },
    disc: {
      title: 'Discount code',
      hint: 'Got a promo code? Enter it here.',
      ph: 'CODE',
      apply: 'Apply',
      checking: 'Checking …',
      remove: 'Remove',
      line: 'Discount',
      applied: 'Discount applied',
      err_invalid: 'This code is not valid.',
      err_expired: 'This code has expired.',
      err_used: 'This code has already been fully redeemed.',
      err_min: (v) => `Valid from an order value of ${v}.`,
      err_net: 'Could not check the code. Please try again online (on Netlify).',
    },
    cur: { label: 'Currency', note: (c) => `Prices in ${c}` },
    sum: {
      title: 'Your treasure chest',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      ship_later: 'plus shipping',
      ship_calc: 'calculating …',
      ship_later_note: 'Calculated once you enter your delivery address.',
      free: 'Free',
      total: 'Total',
      vat: 'incl. VAT',
      contents: "What's inside every box",
      trust: [
        { icon: 'truck', t: 'Ships in 3–5 business days' },
        { icon: 'shield', t: 'Safe & non-toxic' },
        { icon: 'gift', t: 'Gift-ready packaging' },
      ],
    },
    done: {
      caps: 'Order sealed',
      title: (name) => name ? `${name}'s adventure begins.` : 'The adventure begins.',
      body: 'Your treasure chest is being packed by hand. The travel post with all details is on its way to your inbox.',
      order_no: 'Order number',
      timeline: [
        { icon: 'build', t: 'Today', d: 'Your box is packed & engraved.' },
        { icon: 'truck', t: '3–5 business days', d: 'The treasure chest travels to you.' },
        { icon: 'book', t: 'Then', d: 'Read aloud, build — and set off.' },
      ],
      cta: 'Back to the homepage',
    },
  },
};

// Kept only as a currency-conversion reference for add-on copy.
// Product prices ALWAYS come from Shopify.
const RC_PRICE = 39.9;
// Shipping is NOT defined here any more — Shopify's delivery options are the
// only source (PFShop.setDeliveryAddress → cart.deliveryGroups). This maps the
// country label shown in the form to the ISO code Shopify needs.
function rcCountryCode(label) {
  const c = (label || '').toLowerCase();
  if (c.indexOf('öster') >= 0 || c.indexOf('oster') >= 0 || c.indexOf('austria') >= 0) return 'AT';
  if (c.indexOf('schweiz') >= 0 || c.indexOf('switz') >= 0) return 'CH';
  if (c.indexOf('deutsch') >= 0 || c.indexOf('germany') >= 0) return 'DE';
  if (c.indexOf('usa') >= 0 || c.indexOf('united states') >= 0) return 'US';
  try { return window.PFLocale ? PFLocale.current().country : 'AT'; } catch (e) { return 'AT'; }
}

// ── Currency ──────────────────────────────────────────────
// Prices are stored in EUR; `rate` converts EUR → that currency.
// Rates are approximate/editable — refine or wire to a live FX feed if needed.
const RC_CUR = {
  EUR: { code: 'EUR', rate: 1,    label: '€ EUR' },
  CHF: { code: 'CHF', rate: 0.95, label: 'CHF' },
  USD: { code: 'USD', rate: 1.08, label: '$ USD' },
};
function rcDetectCur() {
  try {
    const saved = localStorage.getItem('pf-currency');
    if (saved && RC_CUR[saved]) return saved;
  } catch (e) {}
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    const loc = (navigator.language || '').toLowerCase();
    if (tz === 'Europe/Zurich' || loc.endsWith('-ch')) return 'CHF';
    if (tz.startsWith('America/') || loc.endsWith('-us')) return 'USD';
  } catch (e) {}
  return 'EUR';
}
// Format an EUR amount in the given currency (cur = currency code or object)
function rcFmt(vEUR, lang, cur) {
  const c = (cur && cur.code) ? cur : (RC_CUR[cur] || RC_CUR.EUR);
  const v = Math.round(vEUR * c.rate * 100) / 100;
  if (c.code === 'EUR') {
    const s = v.toFixed(2).replace('.', lang === 'de' ? ',' : '.');
    return lang === 'de' ? `${s} €` : `€${s}`;
  }
  if (c.code === 'CHF') return `CHF ${v.toFixed(2)}`;
  return `$${v.toFixed(2)}`;
}

// Currency selector (topbar)
function RcCurrency({ rc, cur, setCur }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }} title={rc.cur.label}>
      <span className="r-caps rc-cur-lbl" style={{ color: 'var(--rd-ink-mute)', letterSpacing: '0.14em' }}>{rc.cur.label}</span>
      <select value={cur} onChange={(e) => setCur(e.target.value)}
        style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14, color: 'var(--rd-ink)', background: 'transparent', border: '1px solid color-mix(in srgb, var(--rd-ink) 22%, transparent)', borderRadius: 8, padding: '5px 8px', cursor: 'pointer' }}>
        {Object.keys(RC_CUR).map((k) => <option key={k} value={k}>{RC_CUR[k].label}</option>)}
      </select>
    </label>
  );
}

// extra icons not in RdIcon
function RcIcon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    lock: <React.Fragment><rect x="5" y="10.5" width="14" height="9.5" rx="1.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></React.Fragment>,
    chev: <path d="m6 9 6 6 6-6" />,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || null}</svg>;
}

// Wax seal (confirmation)
function RcSeal({ size = 130 }) {
  return (
    <svg className="rc-seal-badge" width={size} height={size} viewBox="0 0 130 130" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 14px 24px rgba(122,52,28,0.35))' }}>
      <path d="M65 6 C88 2 122 16 124 52 C126 82 112 98 96 110 C82 121 48 128 30 114 C10 99 4 78 8 54 C12 27 40 10 65 6 Z" fill="var(--rd-terra)" />
      <path d="M65 14 C85 11 114 22 116 52 C118 78 106 92 92 103 C79 112 50 119 35 107 C18 94 12 76 16 56 C19 33 43 17 65 14 Z" fill="none" stroke="rgba(255,230,200,0.5)" strokeWidth="1.6" strokeDasharray="3 5" />
      <path d="M65 34 L72.5 51 L91 52.8 L77 65 L81.5 83 L65 73.5 L48.5 83 L53 65 L39 52.8 L57.5 51 Z" fill="rgba(255,236,208,0.92)" />
    </svg>
  );
}

// Topbar
function RcTopBar({ rc, lang, setLang, cur, setCur }) {
  return (
    <div className="rc-topbar">
      <div className="rwrap rc-topbar-inner">
        <a href="index.html" aria-label="Popcorn & Freddy" style={{ display: 'flex', alignItems: 'center' }}>
          <RdLogo size={23} />
        </a>
        <div className="rc-secure" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: 'var(--rd-ink-soft)' }}>
          <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RcIcon name="lock" size={16} /></span>
          <span className="r-caps" style={{ color: 'var(--rd-ink-soft)', letterSpacing: '0.22em' }}>{rc.secure}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="index.html" className="r-link rc-browse" style={{ color: 'var(--rd-ink-soft)', fontSize: 14.5 }}>{rc.browse}</a>
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .rc-secure { display: none !important; } .rc-browse { display: none; } .rc-cur-lbl { display: none; } }`}</style>
    </div>
  );
}

// Progress route
function RcSteps({ rc, step }) {
  return (
    <div className="rc-steps" aria-label="checkout steps">
      {rc.steps.map((label, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="rc-step-line" aria-hidden="true"><span></span></div>}
          <div className={'rc-step' + (i === step ? ' now' : '') + (i < step ? ' done' : '')}>
            <div className="rc-step-dot">{i < step ? <RdIcon name="check" size={17} /> : i + 1}</div>
            <div className="rc-step-label">{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// Engraved preview
function RcEngrave({ rc, name }) {
  return (
    <div className="rc-engrave">
      <div className="rc-eng-caps">{rc.cart.engrave_caps}</div>
      <div className="rc-eng-name">{name || rc.cart.engrave_empty}</div>
    </div>
  );
}

// Gift-card redemption (lives in the summary sidebar)
function RcGift({ rc, lang, cur, code, setCode, onApply, onRemove, status, error, info, applied, remaining }) {
  const g = rc.gift;
  if (status === 'applied' && info) {
    return (
      <div className="rc-gift rc-gift-on" style={{ marginTop: 16, padding: '14px 16px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--rd-moss) 55%, transparent)', background: 'color-mix(in srgb, var(--rd-moss) 12%, transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name="check" size={17} /></span>
          <span style={{ flex: 1, fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{g.applied}</span>
          <button type="button" className="rc-remove" onClick={onRemove}>{g.remove}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13.5, letterSpacing: '0.12em', color: 'var(--rd-ink-soft)' }}>{info.code}</span>
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, color: 'var(--rd-moss)' }}>−{rcFmt(applied, lang, cur)}</span>
        </div>
        {remaining > 0 && (
          <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', marginTop: 6 }}>{g.remaining(rcFmt(remaining, lang, cur))}</div>
        )}
      </div>
    );
  }
  return (
    <div className="rc-gift" style={{ marginTop: 16 }}>
      <label className="rc-label" htmlFor="rc-gift-code" style={{ display: 'block', marginBottom: 7 }}>{g.title}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id="rc-gift-code" className="rc-input" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder={g.ph}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onApply(); } }}
          style={{ flex: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }} disabled={status === 'checking'} />
        <button type="button" className="rbtn rbtn-ghost" onClick={onApply} disabled={status === 'checking' || !code.trim()} style={{ whiteSpace: 'nowrap', padding: '0 18px' }}>
          {status === 'checking' ? g.checking : g.apply}
        </button>
      </div>
      {error ? (
        <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-terra)', marginTop: 7 }}>{error}</div>
      ) : (
        <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', marginTop: 7 }}>{g.hint}</div>
      )}
    </div>
  );
}

// Discount-code redemption (lives in the summary sidebar)
function RcDiscount({ rc, lang, cur, code, setCode, onApply, onRemove, status, error, info, applied }) {
  const g = rc.disc;
  if (status === 'applied' && info) {
    const label = info.type === 'percent' ? `−${info.value}%` : `−${rcFmt(info.value, lang, cur)}`;
    return (
      <div className="rc-gift rc-gift-on" style={{ marginTop: 16, padding: '14px 16px', borderRadius: 10, border: '1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent)', background: 'color-mix(in srgb, var(--rd-gold) 12%, transparent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="check" size={17} /></span>
          <span style={{ flex: 1, fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{g.applied}</span>
          <button type="button" className="rc-remove" onClick={onRemove}>{g.remove}</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13.5, letterSpacing: '0.12em', color: 'var(--rd-ink-soft)' }}>{info.code} · {label}</span>
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, color: 'var(--rd-gold)' }}>−{rcFmt(applied, lang, cur)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="rc-gift" style={{ marginTop: 16 }}>
      <label className="rc-label" htmlFor="rc-disc-code" style={{ display: 'block', marginBottom: 7 }}>{g.title}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id="rc-disc-code" className="rc-input" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder={g.ph}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onApply(); } }}
          style={{ flex: 1, textTransform: 'uppercase', letterSpacing: '0.08em' }} disabled={status === 'checking'} />
        <button type="button" className="rbtn rbtn-ghost" onClick={onApply} disabled={status === 'checking' || !code.trim()} style={{ whiteSpace: 'nowrap', padding: '0 18px' }}>
          {status === 'checking' ? g.checking : g.apply}
        </button>
      </div>
      {error ? (
        <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-terra)', marginTop: 7 }}>{error}</div>
      ) : (
        <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', marginTop: 7 }}>{g.hint}</div>
      )}
    </div>
  );
}

// Order summary sidebar
function RcSummary({ rc, t, lang, cur, cart, addons, totals, gift, disc }) {
  return (
    <aside className="rc-aside">
      <div className="rc-card">
        <h3 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="star" size={19} /></span>{rc.sum.title}</h3>

        {cart.length > 0 && (
          <div style={{ marginTop: 8 }}>
            {cart.map((c) => (
              <div key={c.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0' }}>
                {c.img ? <img src={c.img} alt="" style={{ width: 40, height: 50, objectFit: 'cover', borderRadius: 5, border: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)' }} /> : <div className="rd-skel" style={{ width: 40, height: 50, borderRadius: 5 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14, color: 'var(--rd-ink)' }}>{c.title || ''}</div>
                  <div className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)' }}>{(c.qty || 1)} × {c.price != null ? rcFmt(c.price, lang, c.currency || cur) : ''}</div>
                </div>
                <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5 }}>{c.price != null ? rcFmt((c.qty || 1) * c.price, lang, c.currency || cur) : ''}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <div className="rc-sum-row"><span>{rc.sum.subtotal}</span><span>{rcFmt(totals.sub, lang, cur)}</span></div>
          {rc.cart.addons.filter((a) => addons[a.id]).map((a) => (
            <div className="rc-sum-row" key={a.id}><span>{a.t}</span><span>{rcFmt(a.price, lang, cur)}</span></div>
          ))}
          {totals.shipKnown ? (
            <div className="rc-sum-row"><span>{rc.sum.shipping}{totals.shipTitle ? <span className="r-it" style={{ color: 'var(--rd-ink-mute)', fontSize: 12.5 }}> · {totals.shipTitle}</span> : null}</span><span style={{ fontFamily: 'var(--f-sans)', fontWeight: 600 }}>{totals.ship > 0 ? rcFmt(totals.ship, lang, cur) : rc.sum.free}</span></div>
          ) : totals.shipCalc ? (
            <div className="rc-sum-row"><span>{rc.sum.shipping}</span><span className="rc-ship-calc" style={{ fontFamily: 'var(--f-sans)', fontWeight: 600, color: 'var(--rd-ink-mute)', fontStyle: 'italic' }}>{rc.sum.ship_calc}</span></div>
          ) : (
            <div className="rc-sum-row"><span>{rc.sum.shipping}</span><span style={{ fontFamily: 'var(--f-sans)', fontWeight: 600, color: 'var(--rd-ink-mute)', fontStyle: 'italic' }}>{rc.sum.ship_later}</span></div>
          )}
          {totals.disc > 0 && (
            <div className="rc-sum-row"><span>{rc.disc.line}</span><span style={{ color: 'var(--rd-gold)', fontFamily: 'var(--f-sans)', fontWeight: 700 }}>−{rcFmt(totals.disc, lang, cur)}</span></div>
          )}
          {totals.gift > 0 && (
            <div className="rc-sum-row"><span>{rc.gift.line}</span><span style={{ color: 'var(--rd-moss)', fontFamily: 'var(--f-sans)', fontWeight: 700 }}>−{rcFmt(totals.gift, lang, cur)}</span></div>
          )}
          <div className="rc-sum-row total">
            <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, letterSpacing: '0.06em' }}>{rc.sum.total}</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
              <span className="r-display" style={{ fontSize: 27 }}>{rcFmt(totals.total, lang, cur)}</span>
              <span className="r-it" style={{ fontSize: 12.5, color: 'var(--rd-ink-mute)' }}>{rc.sum.vat}</span>
            </span>
          </div>
          {!totals.shipKnown && (
            <div className="r-it" style={{ fontSize: 12.5, color: 'var(--rd-ink-mute)', marginTop: 8, textAlign: 'right' }}>{rc.sum.ship_later_note}</div>
          )}
          {disc && <RcDiscount {...disc} rc={rc} lang={lang} cur={cur} />}
          {gift && <RcGift {...gift} rc={rc} lang={lang} cur={cur} />}
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed color-mix(in srgb, var(--rd-ink) 16%, transparent)' }}>
            <RdCraftNote lang={lang} k="each" size={14.5} />
          </div>
        </div>
      </div>

      {/* what's in the box */}
      <details className="rc-card rc-contents" open>
        <summary>
          <h3 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="gift" size={19} /></span>{rc.sum.contents}</h3>
          <span className="rc-chev"><RcIcon name="chev" size={18} /></span>
        </summary>
        <div style={{ marginTop: 14 }}>
          {t.inside.items.map((it, i) => (
            <div key={i} className="rc-content-item">
              <div className="r-display" style={{ fontSize: 16, color: 'var(--rd-gold)', paddingTop: 1 }}>{it.n}</div>
              <div>
                <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{it.t}</div>
                <div className="r-it" style={{ fontSize: 14, color: 'var(--rd-ink-mute)', lineHeight: 1.5, marginTop: 2 }}>{it.d}</div>
              </div>
            </div>
          ))}
        </div>
      </details>

      <div style={{ display: 'grid', gap: 10, padding: '20px 6px 0' }}>
        {rc.sum.trust.map((b, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, color: 'var(--rd-ink-soft)', fontSize: 14.5, fontFamily: 'var(--f-sans)' }}>
            <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name={b.icon} size={18} /></span>
            {b.t}
          </div>
        ))}
      </div>
    </aside>
  );
}

Object.assign(window, { RC_COPY, RC_PRICE, RC_CUR, rcFmt, rcDetectCur, rcCountryCode, RcIcon, RcSeal, RcTopBar, RcCurrency, RcSteps, RcEngrave, RcSummary, RcGift, RcDiscount });
