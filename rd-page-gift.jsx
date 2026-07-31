// ────────────────────────────────────────────────────────────────
// Geschenkkarten — gift card page
// ────────────────────────────────────────────────────────────────

const GIFT_COPY = {
  de: {
    label: 'Geschenkkarten',
    eyebrow: 'Verschenke ein Abenteuer',
    title: 'Die Geschenkkarte',
    lede: 'Das schönste Geschenk ist gemeinsame Zeit. Mit der Popcorn & Freddy Geschenkkarte schenkst du Vorfreude, leuchtende Kinderaugen und den Start in ein Abenteuer, das die ganze Familie gemeinsam erlebt.',
    amount_t: 'Wähle einen Wert',
    amounts: [
      { v: 39.9, l: 'Ein Kapitel', d: 'Eine Abenteuer-Box inkl. Personalisierung' },
      { v: 79.8, l: 'Zwei Kapitel', d: 'Zwei Etappen der Schatzsuche' },
      { v: 119.7, l: 'Drei Kapitel', d: 'Drei Etappen der Schatzsuche — zum Einlösen, sobald sie erscheinen' },
    ],
    personal_t: 'Mach sie persönlich',
    to_l: 'Für', to_ph: 'z. B. Familie Winter',
    from_l: 'Von', from_ph: 'z. B. Oma Hilde',
    msg_l: 'Deine Botschaft', msg_ph: 'Ein paar Zeilen, die auf der Karte stehen …',
    msg_default: 'Ein Abenteuer wartet auf dich!',
    deliver_t: 'Wie soll sie ankommen?',
    d_mail: { t: 'Per E-Mail', d: 'Sofort oder zum Wunschtermin — als liebevoll gestaltetes PDF zum Ausdrucken.' },
    d_post: { t: 'Per Post', d: 'Gedruckt auf feinem Papier, mit Wachssiegel und Tannenzweig. Versand in 3–5 Werktagen.' },
    cta: 'Geschenkkarte bestellen',
    done_t: 'Die Geschenkkarte ist unterwegs.',
    done_d: 'Wir haben alles vorbereitet. Sobald sie eingelöst wird, beginnt die Schatzsuche.',
    again: 'Noch eine verschenken',
    card_caps: 'Geschenkkarte',
    card_worth: 'im Wert von',
    notes_t: 'Gut zu wissen',
    notes: [
      '3 Jahre gültig ab Kaufdatum',
      'Einlösbar für alle Kapitel, Bundles und Zubehör',
      'Restguthaben bleibt erhalten und kann später eingelöst werden',
      'Der Code wird an der Kasse eingegeben — die Personalisierung wählt die Familie selbst',
    ],
  },
  en: {
    label: 'Gift cards',
    eyebrow: 'Give an adventure',
    title: 'The Gift Card',
    lede: "Sometimes you don't know the child's name — or you'd rather let the family choose. The gift card opens the door to the Whispering Woods, whenever the time is right.",
    amount_t: 'Choose a value',
    amounts: [
      { v: 39.9, l: 'One chapter', d: 'One adventure box incl. personalisation' },
      { v: 79.8, l: 'Two chapters', d: 'Two stops on the treasure hunt' },
      { v: 119.7, l: 'Three chapters', d: 'Three stops on the treasure hunt — redeem as they are released' },
    ],
    personal_t: 'Make it personal',
    to_l: 'To', to_ph: 'e.g. The Winter family',
    from_l: 'From', from_ph: 'e.g. Grandma Hilde',
    msg_l: 'Your message', msg_ph: 'A few lines to appear on the card …',
    msg_default: 'An adventure is waiting for you!',
    deliver_t: 'How should it arrive?',
    d_mail: { t: 'By email', d: 'Instantly or on a chosen date — as a lovingly designed printable PDF.' },
    d_post: { t: 'By post', d: 'Printed on fine paper, with wax seal and a sprig of pine. Ships in 3–5 business days.' },
    cta: 'Order gift card',
    done_t: 'The gift card is on its way.',
    done_d: 'Everything is prepared. As soon as it is redeemed, the treasure hunt begins.',
    again: 'Give another one',
    card_caps: 'Gift card',
    card_worth: 'worth',
    notes_t: 'Good to know',
    notes: [
      'Valid for 3 years from the date of purchase',
      'Redeemable for all chapters, bundles and accessories',
      'Any remaining balance is kept and can be used later',
      'The code is entered at checkout — the family chooses the personalisation themselves',
    ],
  },
};

function giftFmt(v, lang) {
  return lang === 'de' ? v.toFixed(2).replace('.', ',') + ' €' : '€' + v.toFixed(2);
}

// ── Shopify: name the NATIVE gift-card product THIS handle in Shopify admin.
// Once it exists, its variant denominations drive the values below and the CTA
// adds the real gift card to the cart → Shopify checkout. Until then, the page
// falls back to the display values in GIFT_COPY so it still looks right.
const GIFT_HANDLE = 'geschenkkarte';

function useGiftAmounts(prod, g, lang) {
  const money = (v, cc) => (window.PFShop && PFShop.money)
    ? PFShop.money(v, cc || (prod && prod.currencyCode) || 'EUR', lang)
    : giftFmt(v, lang);
  const variants = (prod && prod.variants) || [];
  const real = variants
    .filter((v) => v && v.availableForSale !== false && Number(v.price && v.price.amount) > 0)
    .map((v) => {
      const amt = Number(v.price.amount);
      const titleNum = parseFloat(String(v.title || '').replace(/[^\d.,]/g, '').replace(',', '.'));
      const label = (v.title && v.title !== 'Default Title' && !(Math.abs(titleNum - amt) < 0.01)) ? v.title : g.card_caps;
      return { v: amt, cc: v.price.currencyCode, id: v.id, l: label, d: '' };
    })
    .sort((a, b) => a.v - b.v);
  if (real.length) return { list: real, money, real: true };
  return { list: g.amounts.map((a) => ({ ...a, cc: null, id: null })), money, real: false };
}

// The card itself — a cream plate with gold frame, like the map plaque
function GiftCardPreview({ g, lang, amountText, to, from, msg }) {
  return (
    <div style={{ position: 'relative', background: 'var(--rd-cream)', borderRadius: 16, padding: '38px 40px 34px', boxShadow: '0 40px 80px -36px color-mix(in srgb, var(--rd-ink) 55%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 10, border: '1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent)', borderRadius: 10, pointerEvents: 'none' }}></div>
      <div aria-hidden="true" style={{ position: 'absolute', right: -26, bottom: -26, opacity: 0.1, color: 'var(--rd-walnut)' }}><RdCompass size={170} /></div>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><RdLogo size={21} /></div>
        <div className="r-caps" style={{ marginTop: 18, letterSpacing: '0.32em' }}>{g.card_caps}</div>
        <div className="r-it" style={{ marginTop: 14, fontSize: 15.5, color: 'var(--rd-ink-mute)' }}>{g.card_worth}</div>
        <div className="r-display" style={{ fontSize: 52, color: 'var(--rd-ink)', marginTop: 4 }}>{amountText}</div>
        <div style={{ margin: '18px auto 0', maxWidth: 300 }}><RdOrnament width={140} /></div>
        <p className="r-hand" style={{ marginTop: 16, fontSize: 24, lineHeight: 1.35, color: 'var(--rd-walnut)', minHeight: 32 }}>{msg || g.msg_default}</p>
        <div className="r-it" style={{ marginTop: 16, fontSize: 15.5, color: 'var(--rd-ink-soft)', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span>{g.to_l}: <strong style={{ fontStyle: 'normal' }}>{to || '—'}</strong></span>
          <span>{g.from_l}: <strong style={{ fontStyle: 'normal' }}>{from || '—'}</strong></span>
        </div>
        <div style={{ marginTop: 20, display: 'inline-block', fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13, letterSpacing: '0.3em', color: 'var(--rd-ink-mute)', border: '1px dashed color-mix(in srgb, var(--rd-ink) 28%, transparent)', borderRadius: 6, padding: '8px 18px' }}>PF-★★★★-★★★★</div>
      </div>
    </div>
  );
}

function GiftPage(t, lang) {
  return <GiftBody key={lang} lang={lang} />;
}

function GiftBody({ lang }) {
  const g = GIFT_COPY[lang] || GIFT_COPY.de;
  const prod = usePFProduct(GIFT_HANDLE, lang);
  const { list: amounts, money, real } = useGiftAmounts(prod, g, lang);
  const [amount, setAmount] = useState(1);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [msg, setMsg] = useState('');
  const [deliver, setDeliver] = useState(0);
  const [sent, setSent] = useState(false);
  const idx = Math.min(amount, amounts.length - 1);
  const sel = amounts[idx];

  const buy = () => {
    const L = lang === 'de';
    const attrs = {};
    if (to.trim()) attrs[L ? 'Für' : 'To'] = to.trim();
    if (from.trim()) attrs[L ? 'Von' : 'From'] = from.trim();
    if (msg.trim()) attrs[L ? 'Botschaft' : 'Message'] = msg.trim();
    attrs[L ? 'Zustellung' : 'Delivery'] = deliver === 0 ? (L ? 'E-Mail' : 'Email') : 'Post';
    // Real Shopify gift card: add the chosen variant to the cart, then let the
    // shared sidecart (it opens on rd-cart-changed) carry it to Shopify checkout.
    if (real && prod && sel && sel.id && window.PFShop && PFShop.enabled) {
      const n = GIFT_HANDLE + ':' + sel.id;
      const cart = rdCartLoad();
      const i = cart.findIndex((it) => it.n === n);
      if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1, attrs };
      else cart.push({ n, handle: GIFT_HANDLE, variantId: sel.id, qty: 1, attrs, unitPrice: sel.v, unitCurrency: sel.cc || 'EUR', unitTitle: prod.title || g.card_caps });
      rdCartSave(cart);
      window.dispatchEvent(new Event('rd-cart-changed'));
      PFShop.addLine(sel.id, 1, attrs).catch((e) => console.warn('[Gift] add failed', e));
    } else {
      // Pre-launch / preview (no Shopify product yet): show the confirmation.
      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <React.Fragment>
      <RdPageHero eyebrow={g.eyebrow} title={g.title} lede={g.lede} />
      <section data-rd style={{ padding: '30px 0 130px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="rd-gift-grid">
            {/* left: configurator */}
            {!sent ? (
              <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
                <RdInfoCard className="r-rev" title={g.amount_t} icon="gift">
                  <div style={{ display: 'grid', gap: 10, marginTop: 6 }}>
                    {amounts.map((a, i) => (
                      <button key={i} onClick={() => setAmount(i)} className="rd-gift-amt" aria-pressed={idx === i} style={{
                        display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', textAlign: 'left',
                        padding: '15px 18px', borderRadius: 10,
                        border: idx === i ? '1.5px solid var(--rd-gold)' : '1px solid color-mix(in srgb, var(--rd-ink) 16%, transparent)',
                        background: idx === i ? 'color-mix(in srgb, var(--rd-gold-soft) 14%, transparent)' : 'transparent',
                        transition: 'border-color 0.25s, background 0.25s',
                      }}>
                        <span>
                          <span style={{ display: 'block', fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15.5, color: 'var(--rd-ink)' }}>{a.l}</span>
                          {a.d && <span className="r-it" style={{ display: 'block', fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 2 }}>{a.d}</span>}
                        </span>
                        <span className="r-display" style={{ fontSize: 22, color: idx === i ? 'var(--rd-gold)' : 'var(--rd-ink-soft)' }}>{money(a.v, a.cc)}</span>
                      </button>
                    ))}
                  </div>
                </RdInfoCard>

                <RdInfoCard className="r-rev r-rev-1" title={g.personal_t} icon="heart">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 6 }} className="rd-gift-names">
                    <div>
                      <label className="rd-page-label" htmlFor="g-to">{g.to_l}</label>
                      <input id="g-to" className="rd-page-input" value={to} maxLength={30} onChange={(e) => setTo(e.target.value)} placeholder={g.to_ph} />
                    </div>
                    <div>
                      <label className="rd-page-label" htmlFor="g-from">{g.from_l}</label>
                      <input id="g-from" className="rd-page-input" value={from} maxLength={30} onChange={(e) => setFrom(e.target.value)} placeholder={g.from_ph} />
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label className="rd-page-label" htmlFor="g-msg">{g.msg_l}</label>
                    <textarea id="g-msg" className="rd-page-input" style={{ minHeight: 90 }} value={msg} maxLength={120} onChange={(e) => setMsg(e.target.value)} placeholder={g.msg_ph}></textarea>
                  </div>
                </RdInfoCard>

                <RdInfoCard className="r-rev r-rev-2" title={g.deliver_t} icon="truck">
                  <div style={{ display: 'grid', gap: 10, marginTop: 6 }}>
                    {[g.d_mail, g.d_post].map((d, i) => (
                      <button key={i} onClick={() => setDeliver(i)} aria-pressed={deliver === i} style={{
                        display: 'grid', gridTemplateColumns: '22px 1fr', gap: 14, alignItems: 'start', textAlign: 'left',
                        padding: '15px 18px', borderRadius: 10,
                        border: deliver === i ? '1.5px solid var(--rd-gold)' : '1px solid color-mix(in srgb, var(--rd-ink) 16%, transparent)',
                        background: deliver === i ? 'color-mix(in srgb, var(--rd-gold-soft) 14%, transparent)' : 'transparent',
                        transition: 'border-color 0.25s, background 0.25s',
                      }}>
                        <span aria-hidden="true" style={{ width: 18, height: 18, marginTop: 2, borderRadius: '50%', border: deliver === i ? '5px solid var(--rd-gold)' : '2px solid color-mix(in srgb, var(--rd-ink) 30%, transparent)', display: 'inline-block', boxSizing: 'border-box' }}></span>
                        <span>
                          <span style={{ display: 'block', fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15.5, color: 'var(--rd-ink)' }}>{d.t}</span>
                          <span className="r-it" style={{ display: 'block', fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 3, lineHeight: 1.5 }}>{d.d}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <button className="rbtn rbtn-primary rbtn-xl" style={{ width: '100%', marginTop: 22 }} onClick={buy}>
                    {g.cta} · {money(sel.v, sel.cc)}
                  </button>
                </RdInfoCard>
              </div>
            ) : (
              <RdInfoCard className="r-rev" style={{ textAlign: 'center', padding: '54px 40px', alignSelf: 'start' }}>
                <span style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: '50%', background: 'var(--rd-forest)', color: 'var(--rd-on-primary)', margin: '0 auto 20px' }}><RdIcon name="check" size={28} /></span>
                <h2 className="r-display" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', color: 'var(--rd-ink)' }}>{g.done_t}</h2>
                <p className="r-it" style={{ fontSize: 17, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.6 }}>{g.done_d}</p>
                <div style={{ marginTop: 26 }}>
                  <RdCraftNote lang={lang} k="each" center size={15} />
                </div>
                <button className="rbtn rbtn-ghost" style={{ marginTop: 26 }} onClick={() => setSent(false)}>{g.again}</button>
              </RdInfoCard>
            )}

            {/* right: live preview + notes */}
            <div style={{ display: 'grid', gap: 24, alignContent: 'start', position: 'sticky', top: 130 }} className="rd-gift-side">
              <div className="r-rev r-rev-1">
                <GiftCardPreview g={g} lang={lang} amountText={money(sel.v, sel.cc)} to={to.trim()} from={from.trim()} msg={msg.trim()} />
              </div>
              <div className="r-rev r-rev-2">
                <div className="r-caps" style={{ marginBottom: 6 }}>{g.notes_t}</div>
                <div>
                  {g.notes.map((n, i) => (
                    <div key={i} className="rd-check-row">
                      <span className="ok"><RdIcon name="check" size={17} /></span>
                      <span style={{ fontSize: 16, color: 'var(--rd-ink-soft)', lineHeight: 1.55 }}>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .rd-gift-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 44px; align-items: start; }
          @media (max-width: 980px) { .rd-gift-grid { grid-template-columns: minmax(0, 1fr); } .rd-gift-side { position: static !important; } }
          @media (max-width: 560px) { .rd-gift-names { grid-template-columns: minmax(0, 1fr) !important; } }
        `}</style>
      </section>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Geschenkkarten" render={(t, lang) => <GiftBody key={lang} lang={lang} />} />
);
