// ────────────────────────────────────────────────────────────────
// Geschenkkarten — gift card page (sold by chapters, email only)
// ────────────────────────────────────────────────────────────────

const GIFT_COPY = {
  de: {
    label: 'Abenteuer verschenken',
    eyebrow: 'Abenteuer verschenken',
    title: 'Der Start ins Abenteuer',
    lede: 'Das schönste Geschenk ist gemeinsame Zeit. Schenke den Beginn einer Reise voller Rätsel, leuchtender Kinderaugen und gemeinsamer Erinnerungen – und lass die Familie selbst entscheiden, wann ihr Abenteuer beginnt.',
    amount_t: 'Wie viele Kapitel?',
    chapters_hint: 'Wähle, für wie viele Kapitel der Gutschein gilt — der Gesamtpreis passt sich an.',
    ch_one: 'Kapitel 1',
    ch_range: (n) => `Kapitel 1–${n}`,
    ch_count: (n) => (n === 1 ? '1 Kapitel' : `${n} Kapitel`),
    per_ch: (p) => `${p} pro Kapitel`,
    personal_t: 'Mach sie persönlich',
    to_l: 'Für', to_ph: 'z. B. Max',
    from_l: 'Von', from_ph: 'z. B. Oma Hilde',
    msg_l: 'Deine Botschaft',
    msg_ph: 'z. B. Lieber Max, wir wünschen dir viele spannende Abenteuer mit Popcorn & Freddy. Hab ganz viel Freude beim Lesen, Bauen und Entdecken! In Liebe, Oma & Opa.',
    msg_max: 300,
    msg_default: 'Ein Abenteuer wartet auf dich!',
    remaining: (n) => `${n} Zeichen verbleibend`,
    mail_note: 'Zustellung per E-Mail — sofort nach dem Kauf, als liebevoll gestalteter Gutschein.',
    cta: 'Geschenkkarte bestellen',
    done_t: 'Die Geschenkkarte ist unterwegs.',
    done_d: 'Wir haben alles vorbereitet. Sobald sie eingelöst wird, beginnt die Schatzsuche.',
    again: 'Noch eine verschenken',
    card_caps: 'Geschenkkarte',
    card_worth: 'gültig für',
    notes_t: 'Gut zu wissen',
    notes: [
      'Zustellung per E-Mail — sofort nach dem Kauf',
      'Gültig für die gewählte Anzahl an Kapiteln',
      'Der Versand wird beim Einlösen berechnet und ist nicht im Gutschein enthalten',
      'Die Familie personalisiert jedes Kapitel selbst beim Einlösen',
    ],
  },
  en: {
    label: 'Give an adventure',
    eyebrow: 'Give an adventure',
    title: 'The start of the adventure',
    lede: 'The greatest gift is time together. Give the beginning of a journey full of riddles, bright eyes and shared memories – and let the family decide for themselves when their adventure begins.',
    amount_t: 'How many chapters?',
    chapters_hint: 'Choose how many chapters the card covers — the total updates as you go.',
    ch_one: 'Chapter 1',
    ch_range: (n) => `Chapters 1–${n}`,
    ch_count: (n) => (n === 1 ? '1 chapter' : `${n} chapters`),
    per_ch: (p) => `${p} per chapter`,
    personal_t: 'Make it personal',
    to_l: 'To', to_ph: 'e.g. Max',
    from_l: 'From', from_ph: 'e.g. Grandma Hilde',
    msg_l: 'Your message',
    msg_ph: 'e.g. Dear Max, we wish you lots of exciting adventures with Popcorn & Freddy. Have so much fun reading, building and discovering! With love, Grandma & Grandpa.',
    msg_max: 300,
    msg_default: 'An adventure is waiting for you!',
    remaining: (n) => `${n} characters remaining`,
    mail_note: 'Delivered by email — instantly after purchase, as a beautifully designed gift card.',
    cta: 'Order gift card',
    done_t: 'The gift card is on its way.',
    done_d: 'Everything is prepared. As soon as it is redeemed, the treasure hunt begins.',
    again: 'Give another one',
    card_caps: 'Gift card',
    card_worth: 'valid for',
    notes_t: 'Good to know',
    notes: [
      'Delivered by email — instantly after purchase',
      'Valid for the chosen number of chapters',
      'Shipping is calculated when redeemed and is not included in the card',
      'The family personalises each chapter themselves at redemption',
    ],
  },
};

function giftFmt(v, lang) {
  return lang === 'de' ? v.toFixed(2).replace('.', ',') + ' €' : '€' + v.toFixed(2);
}

// ── Shopify: name the NATIVE gift-card product THIS handle in Shopify admin,
// and give it ONE variant per chapter count — e.g. "1 Kapitel", "2 Kapitel" …
// "8 Kapitel" — each priced at count × chapter price. The page reads those
// variants and drives the stepper + total from them. Until the product exists,
// it falls back to the display math below so the page still works.
const GIFT_HANDLE = 'geschenkkarte';
const GIFT_UNIT_FALLBACK = 39.9;   // per-chapter fallback price (pre-launch only)
const GIFT_MAX_CHAPTERS = 8;

function useGiftChapters(prod, lang) {
  const money = (v, cc) => (window.PFShop && PFShop.money)
    ? PFShop.money(v, cc || (prod && prod.currencyCode) || 'EUR', lang)
    : giftFmt(v, lang);
  const variants = (prod && prod.variants) || [];
  const real = variants
    .filter((v) => v && v.availableForSale !== false && Number(v.price && v.price.amount) > 0)
    .map((v) => {
      const count = parseInt(String(v.title || '').replace(/[^\d]/g, ''), 10);
      return { count, v: Number(v.price.amount), cc: v.price.currencyCode, id: v.id };
    })
    .filter((x) => x.count >= 1)
    .sort((a, b) => a.count - b.count);
  if (real.length) return { list: real, money, real: true };
  const list = Array.from({ length: GIFT_MAX_CHAPTERS }, (_, i) => ({
    count: i + 1, v: Math.round(GIFT_UNIT_FALLBACK * (i + 1) * 100) / 100, cc: null, id: null,
  }));
  return { list, money, real: false };
}

// The card itself — a cream plate with gold frame, like the map plaque
function GiftCardPreview({ g, lang, chapterLabel, priceText, to, from, msg }) {
  return (
    <div style={{ position: 'relative', background: 'var(--rd-cream)', borderRadius: 16, padding: '38px 40px 34px', boxShadow: '0 40px 80px -36px color-mix(in srgb, var(--rd-ink) 55%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 10, border: '1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent)', borderRadius: 10, pointerEvents: 'none' }}></div>
      <div aria-hidden="true" style={{ position: 'absolute', right: -26, bottom: -26, opacity: 0.1, color: 'var(--rd-walnut)' }}><RdCompass size={170} /></div>
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><RdLogo size={21} /></div>
        <div className="r-caps" style={{ marginTop: 18, letterSpacing: '0.32em' }}>{g.card_caps}</div>
        <div className="r-it" style={{ marginTop: 14, fontSize: 15.5, color: 'var(--rd-ink-mute)' }}>{g.card_worth}</div>
        <div className="r-display" style={{ fontSize: 44, color: 'var(--rd-ink)', marginTop: 4, lineHeight: 1.1 }}>{chapterLabel}</div>
        <div style={{ marginTop: 8, fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 15, letterSpacing: '0.04em', color: 'var(--rd-gold)' }}>{priceText}</div>
        <div style={{ margin: '18px auto 0', maxWidth: 300 }}><RdOrnament width={140} /></div>
        <p className="r-hand" style={{ marginTop: 16, fontSize: 22, lineHeight: 1.4, color: 'var(--rd-walnut)', minHeight: 32, whiteSpace: 'pre-wrap' }}>{msg || g.msg_default}</p>
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
  const { list, money, real } = useGiftChapters(prod, lang);
  const maxCount = list.length;
  const [count, setCount] = useState(1);
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const sel = list.find((x) => x.count === count) || list[0];
  const unit = sel && sel.count ? sel.v / sel.count : GIFT_UNIT_FALLBACK;
  const chapterLabel = count === 1 ? g.ch_one : g.ch_range(count);
  const priceText = money(sel.v, sel.cc);
  const remaining = g.msg_max - msg.length;
  const clampCount = (n) => Math.max(1, Math.min(maxCount, n));

  const buy = () => {
    const L = lang === 'de';
    const attrs = {};
    attrs[L ? 'Kapitel' : 'Chapters'] = chapterLabel;
    if (to.trim()) attrs[L ? 'Für' : 'To'] = to.trim();
    if (from.trim()) attrs[L ? 'Von' : 'From'] = from.trim();
    if (msg.trim()) attrs[L ? 'Botschaft' : 'Message'] = msg.trim();
    attrs[L ? 'Zustellung' : 'Delivery'] = L ? 'E-Mail' : 'Email';
    if (real && prod && sel && sel.id && window.PFShop && PFShop.enabled) {
      const n = GIFT_HANDLE + ':' + sel.id;
      const cart = rdCartLoad();
      const i = cart.findIndex((it) => it.n === n);
      if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1, attrs };
      else cart.push({ n, handle: GIFT_HANDLE, variantId: sel.id, qty: 1, attrs, unitPrice: sel.v, unitCurrency: sel.cc || 'EUR', unitTitle: (prod.title || g.card_caps) + ' · ' + chapterLabel });
      rdCartSave(cart);
      window.dispatchEvent(new Event('rd-cart-changed'));
      PFShop.addLine(sel.id, 1, attrs).catch((e) => console.warn('[Gift] add failed', e));
    } else {
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
                  <p className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 2, lineHeight: 1.5 }}>{g.chapters_hint}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, marginTop: 18, padding: '16px 20px', borderRadius: 12, border: '1px solid color-mix(in srgb, var(--rd-gold) 40%, transparent)', background: 'color-mix(in srgb, var(--rd-gold-soft) 12%, transparent)' }}>
                    <div style={{ minWidth: 0 }}>
                      <div className="r-display" style={{ fontSize: 26, color: 'var(--rd-ink)', lineHeight: 1.1 }}>{chapterLabel}</div>
                      <div className="r-it" style={{ fontSize: 14, color: 'var(--rd-ink-mute)', marginTop: 3 }}>{g.per_ch(money(unit, sel.cc))}</div>
                    </div>
                    <div className="rd-gift-stepper" style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <button type="button" aria-label="−" onClick={() => setCount((c) => clampCount(c - 1))} disabled={count <= 1} style={giftStepBtn(count <= 1)}>−</button>
                      <span style={{ minWidth: 40, textAlign: 'center', fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 22, color: 'var(--rd-ink)' }}>{count}</span>
                      <button type="button" aria-label="+" onClick={() => setCount((c) => clampCount(c + 1))} disabled={count >= maxCount} style={giftStepBtn(count >= maxCount)}>+</button>
                    </div>
                  </div>
                  <div className="rd-gift-quick" style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                    {[1, 4, 8].filter((n) => n <= maxCount).map((n) => (
                      <button key={n} type="button" onClick={() => setCount(n)} aria-pressed={count === n} style={{
                        padding: '8px 16px', borderRadius: 8, fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 13.5, cursor: 'pointer',
                        border: count === n ? '1.5px solid var(--rd-gold)' : '1px solid color-mix(in srgb, var(--rd-ink) 18%, transparent)',
                        background: count === n ? 'color-mix(in srgb, var(--rd-gold-soft) 16%, transparent)' : 'transparent', color: 'var(--rd-ink)',
                      }}>{g.ch_count(n)}</button>
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
                    <textarea id="g-msg" className="rd-page-input" style={{ minHeight: 120, lineHeight: 1.6 }} value={msg} maxLength={g.msg_max} onChange={(e) => setMsg(e.target.value)} placeholder={g.msg_ph}></textarea>
                    <div className="r-it" style={{ textAlign: 'right', fontSize: 13, color: remaining <= 20 ? 'var(--rd-terra)' : 'var(--rd-ink-mute)', marginTop: 6 }}>{g.remaining(remaining)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, color: 'var(--rd-moss, var(--rd-ink-soft))' }}>
                    <RdIcon name="mail" size={18} />
                    <span className="r-it" style={{ fontSize: 14.5, lineHeight: 1.45 }}>{g.mail_note}</span>
                  </div>
                  <button className="rbtn rbtn-primary rbtn-xl" style={{ width: '100%', marginTop: 22 }} onClick={buy}>
                    {g.cta} · {priceText}
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
                <GiftCardPreview g={g} lang={lang} chapterLabel={chapterLabel} priceText={priceText} to={to.trim()} from={from.trim()} msg={msg.trim()} />
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

function giftStepBtn(disabled) {
  return {
    width: 40, height: 40, borderRadius: 9, fontSize: 22, fontFamily: 'var(--f-sans)', fontWeight: 700,
    border: '1px solid color-mix(in srgb, var(--rd-ink) 22%, transparent)',
    background: 'var(--rd-cream, #fff)', color: 'var(--rd-ink)',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, lineHeight: 1,
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Abenteuer verschenken" render={(t, lang) => <GiftBody key={lang} lang={lang} />} />
);
