// ────────────────────────────────────────────────────────────────
// Checkout — steps + app
// ────────────────────────────────────────────────────────────────

const RC_STATE_KEY = 'pf-checkout-v1';
const GIFT_API = '/.netlify/functions';
// Route internal links through the universal locale helper so the active
// prefix (/at, /de, /ch, /us) is preserved. External/Shopify URLs are exempt.
function cP(path) { return (window.PFLocale ? PFLocale.withLocale(path) : path); }
function rcStateLoad() {
  try { return JSON.parse(localStorage.getItem(RC_STATE_KEY)) || {}; } catch (e) { return {}; }
}
function rcStateSave(s) {
  try { localStorage.setItem(RC_STATE_KEY, JSON.stringify(s)); } catch (e) {}
}

// ─── STEP 1 — cart, personalisation, add-ons ─────────────────
function RcStepCart({ rc, lang, cur, cart, setQty, removeItem, units, personal, setPersonalField, addons, toggleAddon, onNext }) {
  const multi = units.length > 1;
  return (
    <React.Fragment>
      <div className="rc-card r-rev">
        <h2 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="book" size={20} /></span>{rc.cart.title}</h2>
        <div style={{ marginTop: 6 }}>
          {cart.map((c) => (
            <div className="rc-item" key={c.n}>
              {c.img ? <img src={c.img} alt={c.title || ''} /> : <div className="rd-skel" style={{ borderRadius: 8 }} />}
              <div style={{ minWidth: 0 }}>
                {c.chapterNo != null && <div className="r-caps" style={{ color: 'var(--rd-ink-mute)', letterSpacing: '0.2em' }}>{rc.cart.chapter} {String(c.chapterNo).padStart(2, '0')}</div>}
                <div className="r-display" style={{ fontSize: 21, color: 'var(--rd-ink)', marginTop: 4 }}>{c.title || ''}</div>
                <div className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 3 }}>{rc.cart.each}</div>
              </div>
              <div className="rc-item-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                <div className="rc-qty">
                  <button aria-label="minus" onClick={() => setQty(c.n, -1)}>−</button>
                  <span>{c.qty || 1}</span>
                  <button aria-label="plus" onClick={() => setQty(c.n, 1)}>+</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 16 }}>{c.price != null ? rcFmt((c.qty || 1) * c.price, lang, c.currency || cur) : ''}</span>
                  <button className="rc-remove" onClick={() => removeItem(c.n)}>{rc.cart.remove}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* included folder */}
        <div style={{ marginTop: 14, padding: 16, borderRadius: 10, border: '1px dashed color-mix(in srgb, var(--rd-gold) 60%, transparent)', display: 'grid', gridTemplateColumns: '58px 1fr auto', gap: 16, alignItems: 'center', background: 'color-mix(in srgb, var(--rd-gold-soft) 10%, transparent)' }}>
          <div className="rc-addon-thumb"><img src="assets/wooden-folder.png" alt="" /></div>
          <div>
            <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15, color: 'var(--rd-ink)' }}>{rc.cart.folder_t}</div>
            <div className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 2, lineHeight: 1.45 }}>{rc.cart.folder_d}</div>
          </div>
          <div className="r-hand" style={{ fontSize: 20, color: 'var(--rd-terra)', transform: 'rotate(-3deg)' }}>{rc.cart.folder_free}</div>
        </div>
      </div>

      {/* personalisation — one block per box */}
      <div className="rc-card r-rev r-rev-1">
        <h2 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="user" size={20} /></span>{rc.cart.personal_title}</h2>
        <p className="r-it" style={{ fontSize: 15.5, color: 'var(--rd-ink-mute)', marginTop: 8, lineHeight: 1.55 }}>{multi ? rc.cart.box_hint : rc.cart.personal_hint}</p>
        {units.map((u, idx) => {
          const p = personal[u.key] || { name: '', lang: 'de' };
          return (
            <div key={u.key} className="rc-person-unit" style={idx > 0 ? { marginTop: 26, paddingTop: 26, borderTop: '1px dashed color-mix(in srgb, var(--rd-ink) 16%, transparent)' } : { marginTop: 4 }}>
              {multi && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span className="r-caps" style={{ color: 'var(--rd-gold)', letterSpacing: '0.18em', border: '1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent)', borderRadius: 6, padding: '4px 10px' }}>{rc.cart.box_label(idx + 1)}</span>
                  <span className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{u.title}</span>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, alignItems: 'center' }} className="rc-personal-grid">
                <div className="rc-field">
                  <label className="rc-label" htmlFor={'rc-name-' + u.key}>{rc.cart.name_label}</label>
                  <input id={'rc-name-' + u.key} className="rc-input" value={p.name} maxLength={18} onChange={(e) => setPersonalField(u.key, 'name', e.target.value)} placeholder={rc.cart.name_ph} />
                </div>
                <RcEngrave rc={rc} name={(p.name || '').trim()} />
              </div>
              <div style={{ marginTop: 18 }}>
                <label className="rc-label">{rc.cart.lang_label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                  {rc.cart.langs.map((o) => (
                    <button key={o.id} type="button" onClick={() => setPersonalField(u.key, 'lang', o.id)} aria-pressed={p.lang === o.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 9, padding: '11px 20px', borderRadius: 10,
                      fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5,
                      border: p.lang === o.id ? '1.5px solid var(--rd-gold)' : '1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent)',
                      background: p.lang === o.id ? 'color-mix(in srgb, var(--rd-gold-soft) 16%, transparent)' : 'transparent',
                      color: 'var(--rd-ink)', transition: 'border-color 0.25s, background 0.25s',
                    }}>
                      <span aria-hidden="true" style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 10.5, letterSpacing: '0.12em', color: p.lang === o.id ? 'var(--rd-gold)' : 'var(--rd-ink-mute)', border: '1px solid currentColor', borderRadius: 4, padding: '2px 6px' }}>{o.id.toUpperCase()}</span>
                      {o.l}
                    </button>
                  ))}
                  {idx === units.length - 1 && <span className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{rc.cart.lang_hint}</span>}
                </div>
              </div>
            </div>
          );
        })}
        <style>{`@media (max-width: 640px) { .rc-personal-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      {/* add-ons */}
      <div className="rc-card r-rev r-rev-2">
        <h2 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="star" size={20} /></span>{rc.cart.addons_title}</h2>
        <div style={{ marginTop: 18 }}>
          {rc.cart.addons.map((a) => (
            <div key={a.id} className={'rc-addon' + (addons[a.id] ? ' on' : '')} onClick={() => toggleAddon(a.id)} role="checkbox" aria-checked={!!addons[a.id]} tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAddon(a.id); } }}>
              <div className="rc-addon-thumb"><RdIcon name={a.icon} size={24} /></div>
              <div>
                <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15, color: 'var(--rd-ink)' }}>{a.t} <span style={{ color: 'var(--rd-ink-mute)', fontWeight: 500 }}>· {rcFmt(a.price, lang, cur)}</span></div>
                <div className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 2, lineHeight: 1.45 }}>{a.d}</div>
              </div>
              <div className="rc-check"><RdIcon name="check" size={15} /></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}>
        <button className="rbtn rbtn-primary rbtn-xl" onClick={onNext}>{rc.cart.next} <RdIcon name="arrow" size={17} /></button>
      </div>
    </React.Fragment>
  );
}

// ─── STEP 2 — delivery ───────────────────────────────────────
function RcStepShip({ rc, form, setForm, onBack, onNext }) {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="rc-card r-rev">
        <h2 className="rc-card-title"><span className="rc-title-ico"><RdIcon name="truck" size={20} /></span>{rc.ship.title}</h2>
        <div className="rc-form-grid" style={{ marginTop: 22 }}>
          <div className="rc-field rc-span2">
            <label className="rc-label" htmlFor="f-name">{rc.ship.f_name}</label>
            <input id="f-name" className="rc-input" required value={form.name || ''} onChange={set('name')} autoComplete="name" />
          </div>
          <div className="rc-field rc-span2">
            <label className="rc-label" htmlFor="f-street">{rc.ship.f_street}</label>
            <input id="f-street" className="rc-input" required value={form.street || ''} onChange={set('street')} autoComplete="street-address" />
          </div>
          <div className="rc-field">
            <label className="rc-label" htmlFor="f-zip">{rc.ship.f_zip}</label>
            <input id="f-zip" className="rc-input" required value={form.zip || ''} onChange={set('zip')} autoComplete="postal-code" />
          </div>
          <div className="rc-field">
            <label className="rc-label" htmlFor="f-city">{rc.ship.f_city}</label>
            <input id="f-city" className="rc-input" required value={form.city || ''} onChange={set('city')} autoComplete="address-level2" />
          </div>
          <div className="rc-field">
            <label className="rc-label" htmlFor="f-country">{rc.ship.f_country}</label>
            <select id="f-country" className="rc-input" value={form.country || rc.ship.countries[0]} onChange={set('country')}>
              {rc.ship.countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="rc-field">
            <label className="rc-label" htmlFor="f-email">{rc.ship.f_email}</label>
            <input id="f-email" type="email" className="rc-input" required value={form.email || ''} onChange={set('email')} autoComplete="email" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, color: 'var(--rd-moss)' }}>
          <RdIcon name="truck" size={18} />
          <span className="r-it" style={{ fontSize: 15.5 }}>{rc.ship.note}</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
        <button type="button" className="rbtn rbtn-ghost" onClick={onBack}>← {rc.ship.back}</button>
        <button type="submit" className="rbtn rbtn-primary rbtn-xl">{rc.ship.next} <RdIcon name="arrow" size={17} /></button>
      </div>
    </form>
  );
}

// ─── STEP 3 — payment ────────────────────────────────────────
function RcStepPay({ rc, lang, cur, pay, setPay, sealing, onBack, onOrder, totals }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onOrder(); }}>
      <div className="rc-card r-rev">
        <h2 className="rc-card-title"><span className="rc-title-ico"><RcIcon name="lock" size={20} /></span>{rc.pay.title}</h2>
        <div className="rc-pay" style={{ marginTop: 20 }}>
          {rc.pay.options.map((o, i) => (
            <label key={i} className={'rc-pay-opt' + (pay === i ? ' on' : '')}>
              <input type="radio" name="pay" checked={pay === i} onChange={() => setPay(i)} style={{ position: 'absolute', opacity: 0 }} />
              <span className="rc-radio"></span>
              {o}
            </label>
          ))}
        </div>

        {pay === 0 ? (
          <div className="rc-form-grid" style={{ marginTop: 22 }}>
            <div className="rc-field rc-span2">
              <label className="rc-label" htmlFor="c-num">{rc.pay.c_num}</label>
              <input id="c-num" className="rc-input" required inputMode="numeric" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="rc-field">
              <label className="rc-label" htmlFor="c-exp">{rc.pay.c_exp}</label>
              <input id="c-exp" className="rc-input" required placeholder="MM / JJ" />
            </div>
            <div className="rc-field">
              <label className="rc-label" htmlFor="c-cvc">{rc.pay.c_cvc}</label>
              <input id="c-cvc" className="rc-input" required inputMode="numeric" placeholder="123" />
            </div>
          </div>
        ) : (
          <p className="r-it" style={{ marginTop: 20, fontSize: 15.5, color: 'var(--rd-ink-mute)' }}>{rc.pay.redirect}</p>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
        <button type="button" className="rbtn rbtn-ghost" onClick={onBack}>← {rc.pay.back}</button>
        <button type="submit" className={'rbtn rbtn-primary rbtn-xl' + (sealing ? ' rc-sealing' : '')} disabled={sealing} style={{ opacity: sealing ? 0.85 : 1 }}>
          {sealing ? rc.pay.sealing : <React.Fragment>{rc.pay.order} · {rcFmt(totals.total, lang, cur)}</React.Fragment>}
        </button>
      </div>
      <p style={{ marginTop: 16, textAlign: 'right', fontSize: 13.5, fontFamily: 'var(--f-sans)', color: 'var(--rd-ink-mute)', lineHeight: 1.6 }}>
        {rc.pay.legal}{' '}
        <a href={cP('AGB.html')} style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{lang === 'de' ? 'AGB' : 'Terms'}</a>
        {' · '}
        <a href={cP('Widerruf.html')} style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{lang === 'de' ? 'Widerrufsrecht' : 'Right of withdrawal'}</a>
        {' · '}
        <a href={cP('Datenschutz.html')} style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{lang === 'de' ? 'Datenschutz' : 'Privacy'}</a>
      </p>
    </form>
  );
}

// ─── CONFIRMATION ────────────────────────────────────────────
function RcConfirm({ rc, lang, childName, orderNo, onReset }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: '40px 0 60px' }}>
      <RcSeal />
      <div className="r-caps r-caps-rule" style={{ marginTop: 30 }}>{rc.done.caps}</div>
      <h1 className="r-display" style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', color: 'var(--rd-ink)', marginTop: 20, textWrap: 'balance' }}>{rc.done.title(childName)}</h1>
      <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.4vw, 20px)', color: 'var(--rd-ink-soft)', marginTop: 18, lineHeight: 1.65, maxWidth: 540, marginInline: 'auto', textWrap: 'pretty' }}>{rc.done.body}</p>
      <div className="r-it" style={{ marginTop: 18, fontSize: 16, color: 'var(--rd-ink-mute)' }}>{rc.done.order_no}: <strong style={{ color: 'var(--rd-walnut)', fontStyle: 'normal', fontFamily: 'var(--f-sans)', letterSpacing: '0.08em' }}>{orderNo}</strong></div>
      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
        <RdCraftNote lang={lang} k="batch" center size={15} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 52, border: '1px solid color-mix(in srgb, var(--rd-ink) 13%, transparent)', borderRadius: 12, background: 'var(--rd-cream)', overflow: 'hidden' }} className="rc-timeline">
        {rc.done.timeline.map((s, i) => (
          <div key={i} style={{ padding: '26px 20px', borderLeft: i > 0 ? '1px solid color-mix(in srgb, var(--rd-ink) 13%, transparent)' : 'none' }} className="rc-tl-cell">
            <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name={s.icon} size={24} /></span>
            <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rd-ink)', marginTop: 12 }}>{s.t}</div>
            <div className="r-it" style={{ fontSize: 15, color: 'var(--rd-ink-mute)', marginTop: 6, lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 640px) { .rc-timeline { grid-template-columns: 1fr !important; } .rc-tl-cell { border-left: none !important; } .rc-tl-cell + .rc-tl-cell { border-top: 1px solid color-mix(in srgb, var(--rd-ink) 13%, transparent); } }`}</style>

      <a href={cP('index.html')} className="rbtn rbtn-primary rbtn-xl" style={{ marginTop: 44 }} onClick={onReset}>{rc.done.cta}</a>
    </div>
  );
}

// ─── EMPTY ───────────────────────────────────────────────────
function RcEmpty({ rc, onAddFirst }) {
  return (
    <div className="rc-empty">
      <div style={{ opacity: 0.35, color: 'var(--rd-walnut)', display: 'flex', justifyContent: 'center' }}><RdCompass size={130} /></div>
      <h1 className="r-display" style={{ fontSize: 'clamp(30px, 4vw, 46px)', color: 'var(--rd-ink)', marginTop: 26 }}>{rc.cart.empty_title}</h1>
      <p className="r-it" style={{ fontSize: 18, color: 'var(--rd-ink-mute)', marginTop: 12 }}>{rc.cart.empty_body}</p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
        <button className="rbtn rbtn-primary rbtn-xl" onClick={onAddFirst}>{rc.cart.empty_cta}</button>
        <a href={cP('index.html')} className="rbtn rbtn-ghost rbtn-xl">{rc.cart.empty_back}</a>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const RC_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "wald",
  "anim": 5,
  "lang": "de"
}/*EDITMODE-END*/;

function RcApp() {
  const [tw, setTw] = useTweaks(RC_TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => rdLangLoad(tw.lang || 'de'));
  const intensity = typeof tw.anim === 'number' ? tw.anim : 5;

  const saved = useMemo(() => rcStateLoad(), []);
  const [cart, setCart] = useState(() => rdCartLoad());
  const [step, setStep] = useState(saved.placed ? 3 : (saved.step || 0));
  const [personal, setPersonal] = useState(saved.personal || (saved.childName ? { '1:0': { name: saved.childName, lang: saved.bookLang || 'de' } } : {}));
  const [addons, setAddons] = useState(saved.addons || {});
  const [form, setForm] = useState(saved.form || {});
  const [pay, setPay] = useState(saved.pay || 0);
  const [sealing, setSealing] = useState(false);
  const [orderNo, setOrderNo] = useState(saved.orderNo || '');

  // ─ currency ─
  const [cur, setCurState] = useState(() => rcDetectCur());
  const setCur = (c) => { setCurState(c); try { localStorage.setItem('pf-currency', c); } catch (e) {} };

  // ─ discount code ─
  const [discCode, setDiscCode] = useState('');
  const [discInfo, setDiscInfo] = useState(null);      // { code, type, value, minSubtotal }
  const [discStatus, setDiscStatus] = useState('idle');
  const [discError, setDiscError] = useState('');

  // ─ gift card ─
  const [giftCode, setGiftCode] = useState('');
  const [giftInfo, setGiftInfo] = useState(null);      // { code, balance, initial }
  const [giftStatus, setGiftStatus] = useState('idle'); // idle | checking | applied | error
  const [giftError, setGiftError] = useState('');

  const placed = step === 3;

  useEffect(() => { setTw('lang', lang); rdLangSave(lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.palette = tw.palette || 'wald';
    document.documentElement.dataset.anim = intensity > 0 ? 'on' : 'off';
    document.documentElement.style.setProperty('--anim-f', String(Math.max(intensity, 1) / 5));
  }, [tw.palette, intensity]);
  useEffect(() => { rdCartSave(cart); }, [cart]);
  useEffect(() => { rcStateSave({ step, personal, addons, form, pay, orderNo, placed }); }, [step, personal, addons, form, pay, orderNo, placed]);

  // Seed the delivery country from the visitor's chosen locale (welcome strip),
  // so the shipping-country select is pre-filled. Shipping stays "zzgl. Versand"
  // until a full address (zip + city) is entered.
  useEffect(() => {
    if (form.country) return;
    try {
      const code = rdCurrentCountry();
      const map = { DE: 0, AT: 1, CH: 2 };
      const idx = map[code];
      const rcx = RC_COPY[lang] || RC_COPY.de;
      if (idx != null && rcx.ship.countries[idx]) setForm((f) => ({ ...f, country: rcx.ship.countries[idx] }));
    } catch (e) {}
  }, []);

  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;
  const rc = RC_COPY[lang] || RC_COPY.de;

  // reveal on step change
  useEffect(() => {
    const id = requestAnimationFrame(() => document.querySelectorAll('.r-rev:not(.in)').forEach((el) => el.classList.add('in')));
    return () => cancelAnimationFrame(id);
  }, [step, lang]);

  const setQty = (n, d) => setCart((c) => c.map((x) => x.n === n ? { ...x, qty: Math.max(1, (x.qty || 1) + d) } : x));
  const removeItem = (n) => setCart((c) => c.filter((x) => x.n !== n));
  // Every displayed value comes from the shared Shopify catalog.
  const lines = usePFCartLines(cart, lang);
  const toggleAddon = (id) => setAddons((a) => ({ ...a, [id]: !a[id] }));
  // The first purchasable chapter in Shopify — never a hardcoded product.
  const addFirst = () => {
    if (!window.PFShop || !PFShop.getChapters) return;
    PFShop.getChapters(lang).then((list) => {
      const p = (list || []).find((x) => x.available !== false && x.quantityAvailable !== 0);
      if (p) setCart([{ n: p.handle, handle: p.handle, variantId: p.variantId, qty: 1, ...(p.quantityAvailable != null ? { max: p.quantityAvailable } : {}) }]);
    }).catch(() => {});
  };

  // One personalisation unit per box (cart item × quantity)
  const units = useMemo(() => {
    const out = [];
    lines.forEach((c) => { const q = Math.max(1, c.qty || 1); for (let i = 0; i < q; i++) out.push({ key: c.n + ':' + i, chapter: c.chapterNo != null ? c.chapterNo : c.n, cover: c.img, title: c.title }); });
    return out;
  }, [lines, lang]);
  const setPersonalField = (key, field, value) => setPersonal((p) => ({ ...p, [key]: { name: '', lang: 'de', ...(p[key] || {}), [field]: value } }));
  const primaryName = (() => { const k = units[0] && units[0].key; const p = k && personal[k]; return ((p && p.name) || '').trim(); })();

  const totals = useMemo(() => {
    const sub = lines.reduce((s, c) => s + (c.qty || 1) * (c.price || 0), 0);
    const add = rc.cart.addons.reduce((s, a) => s + (addons[a.id] ? a.price : 0), 0);
    const base = sub + add;
    let disc = 0;
    if (discInfo) {
      disc = discInfo.type === 'percent'
        ? Math.round(base * (discInfo.value / 100) * 100) / 100
        : Math.min(discInfo.value, base);
      disc = Math.round(Math.min(disc, base) * 100) / 100;
    }
    const payable = Math.round((base - disc) * 100) / 100;
    const addrDone = !!((form.country || '').trim() && (form.zip || '').trim() && (form.city || '').trim());
    const shipKnown = cart.length > 0 && addrDone;
    const ship = shipKnown ? rcShipCost(form.country) : 0;
    const preGift = Math.round((payable + ship) * 100) / 100;
    const gift = giftInfo ? Math.round(Math.min(giftInfo.balance, preGift) * 100) / 100 : 0;
    return { sub, add, disc, ship, shipKnown, gift, total: Math.round((preGift - gift) * 100) / 100 };
  }, [cart, addons, rc, giftInfo, discInfo, form.country, form.zip, form.city]);

  const applyDiscount = async () => {
    const code = discCode.trim();
    if (!code) return;
    setDiscStatus('checking'); setDiscError('');
    const subEUR = lines.reduce((s, c) => s + (c.qty || 1) * (c.price || 0), 0) + rc.cart.addons.reduce((s, a) => s + (addons[a.id] ? a.price : 0), 0);
    try {
      const res = await fetch(GIFT_API + '/discount-check?code=' + encodeURIComponent(code) + '&subtotal=' + subEUR);
      const data = await res.json();
      if (data.valid) {
        setDiscInfo({ code: data.code, type: data.type, value: data.value, minSubtotal: data.minSubtotal });
        setDiscStatus('applied');
      } else {
        setDiscInfo(null); setDiscStatus('error');
        const m = { expired: rc.disc.err_expired, used_up: rc.disc.err_used, disabled: rc.disc.err_invalid,
          min_subtotal: rc.disc.err_min(rcFmt(data.minSubtotal || 0, lang, cur)) };
        setDiscError(m[data.reason] || rc.disc.err_invalid);
      }
    } catch (e) {
      setDiscInfo(null); setDiscStatus('error'); setDiscError(rc.disc.err_net);
    }
  };
  const removeDiscount = () => { setDiscInfo(null); setDiscStatus('idle'); setDiscError(''); setDiscCode(''); };

  const discProps = {
    code: discCode, setCode: setDiscCode, onApply: applyDiscount, onRemove: removeDiscount,
    status: discStatus, error: discError, info: discInfo, applied: totals.disc,
  };

  const applyGift = async () => {
    const code = giftCode.trim();
    if (!code) return;
    setGiftStatus('checking'); setGiftError('');
    try {
      const res = await fetch(GIFT_API + '/gift-check?code=' + encodeURIComponent(code));
      const data = await res.json();
      if (data.valid) {
        setGiftInfo({ code: data.code, balance: data.balance, initial: data.initial });
        setGiftStatus('applied');
      } else {
        setGiftInfo(null);
        setGiftStatus('error');
        setGiftError(data.reason === 'depleted' ? rc.gift.err_depleted : rc.gift.err_invalid);
      }
    } catch (e) {
      setGiftInfo(null);
      setGiftStatus('error');
      setGiftError(rc.gift.err_net);
    }
  };
  const removeGift = () => { setGiftInfo(null); setGiftStatus('idle'); setGiftError(''); setGiftCode(''); };

  const giftProps = {
    code: giftCode, setCode: setGiftCode, onApply: applyGift, onRemove: removeGift,
    status: giftStatus, error: giftError, info: giftInfo,
    applied: totals.gift,
    remaining: giftInfo ? Math.round((giftInfo.balance - totals.gift) * 100) / 100 : 0,
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });  const goTo = (s) => { setStep(s); scrollTop(); };

  // Option B: from the delivery step, hand off to Shopify's hosted checkout
  // PRE-FILLED with the name/email/address collected here. Payment happens on
  // Shopify (secure/PCI). If the store isn't live (preview), fall back to the
  // built-in mock payment step so the design still works.
  const COUNTRY_CC = { 'Deutschland': 'DE', 'Germany': 'DE', 'Österreich': 'AT', 'Osterreich': 'AT', 'Austria': 'AT', 'Schweiz': 'CH', 'Switzerland': 'CH' };
  const goToPayment = () => {
    var nm = (form.name || '').trim();
    var buyer = {
      email: (form.email || '').trim(),
      address: {
        address1: (form.street || '').trim(),
        city: (form.city || '').trim(),
        zip: (form.zip || '').trim(),
        countryCode: COUNTRY_CC[(form.country || '').trim()] || 'DE',
        firstName: nm.split(/\s+/)[0] || undefined,
        lastName: nm.split(/\s+/).slice(1).join(' ') || undefined,
      },
    };
    if (window.PFShop && PFShop.detect) {
      setSealing(true);
      PFShop.detect().then(function (ok) {
        if (!ok) { setSealing(false); goTo(2); return; }   // preview / not live: mock step
        return Promise.resolve(PFShop.checkout(buyer)).then(function (started) {
          if (!started) { setSealing(false); goTo(2); }     // couldn't hand off: mock step
        });
      }).catch(function () { setSealing(false); goTo(2); });
    } else { goTo(2); }
  };

  const placeOrder = () => {
    setSealing(true);
    const no = 'PF-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
    // redeem the gift card (fire-and-forget against the order total)
    const redeem = (giftInfo && totals.gift > 0)
      ? fetch(GIFT_API + '/gift-redeem', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: giftInfo.code, amount: totals.gift, orderRef: no }),
        }).catch(() => {})
      : Promise.resolve();
    // record discount-code use
    if (discInfo && totals.disc > 0) {
      fetch(GIFT_API + '/discount-redeem', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: discInfo.code, orderRef: no }),
      }).catch(() => {});
    }
    redeem.finally(() => {
      setTimeout(() => {
        setOrderNo(no);
        setSealing(false);
        setCart([]);
        setStep(3);
        scrollTop();
      }, 1400);
    });
  };
  const resetAfterOrder = () => { rcStateSave({}); };

  const empty = cart.length === 0 && !placed;

  return (
    <React.Fragment>
      <RcTopBar rc={rc} lang={lang} setLang={setLang} cur={cur} setCur={setCur} />
      <main className="rwrap" style={{ paddingTop: 26, paddingBottom: 110, position: 'relative', zIndex: 2 }} data-screen-label={placed ? 'Bestellbestätigung' : 'Checkout'}>
        {placed ? (
          <RcConfirm rc={rc} lang={lang} childName={primaryName} orderNo={orderNo} onReset={resetAfterOrder} />
        ) : empty ? (
          <RcEmpty rc={rc} onAddFirst={addFirst} />
        ) : (
          <React.Fragment>
            <RcSteps rc={rc} step={step} />
            <div className="rc-grid">
              <div className="rc-main">
                {step === 0 && <RcStepCart rc={rc} lang={lang} cur={cur} cart={lines} setQty={setQty} removeItem={removeItem} units={units} personal={personal} setPersonalField={setPersonalField} addons={addons} toggleAddon={toggleAddon} onNext={() => goTo(1)} />}
                {step === 1 && <RcStepShip rc={rc} form={form} setForm={setForm} onBack={() => goTo(0)} onNext={goToPayment} />}
                {step === 2 && <RcStepPay rc={rc} lang={lang} cur={cur} pay={pay} setPay={setPay} sealing={sealing} onBack={() => goTo(1)} onOrder={placeOrder} totals={totals} />}
              </div>
              <RcSummary rc={rc} t={t} lang={lang} cur={cur} cart={lines} addons={addons} totals={totals} gift={null} disc={null} />
              {/* Discount codes & gift cards are handled natively on Shopify's checkout. */}
            </div>
          </React.Fragment>
        )}
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Stimmung" value={tw.palette} options={[{ value: 'wald', label: 'Wald' }, { value: 'birke', label: 'Birke' }, { value: 'abend', label: 'Abend' }]} onChange={(v) => setTw('palette', v)} />
        <TweakSection label="Bewegung" />
        <TweakSlider label="Animations-Intensität" value={intensity} min={0} max={10} step={1} onChange={(v) => setTw('anim', v)} />
        <TweakSection label="Sprache" />
        <TweakRadio label="Language" value={lang} options={[{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }]} onChange={setLang} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RcApp />);
