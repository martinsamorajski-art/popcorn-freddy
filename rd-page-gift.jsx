// ────────────────────────────────────────────────────────────────
// Abenteuer verschenken — gift card page
// Sold by chapters · digital · direct Shopify checkout (no address step)
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
    deliver_t: 'So kommt sie an',
    to_recipient: 'An den Beschenkten',
    to_me: 'An mich',
    email_l: 'E-Mail des Beschenkten',
    email_ph: 'name@beispiel.de',
    email_err: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    when_l: 'Wann soll sie ankommen?',
    when_now: 'Sofort',
    when_date: 'Zum Wunschtermin',
    rec_note: 'Wir senden den Gutschein per E-Mail direkt an den Beschenkten — sofort oder zum gewählten Datum.',
    me_note: 'Du erhältst den Gutschein per E-Mail und kannst ihn selbst weitergeben.',
    ship_note: 'Rein digital — keine Lieferadresse nötig. Der Versand der Kapitel wird erst beim Einlösen berechnet.',
    cta: 'Jetzt verschenken',
    cta_busy: 'Weiter zur Kasse …',
    consent_pre: 'Ich habe die ',
    consent_agb: 'AGB',
    consent_sep1: ', die ',
    consent_wider: 'Widerrufsbelehrung',
    consent_sep2: ' und die ',
    consent_privacy: 'Datenschutzerklärung',
    consent_post: ' gelesen und akzeptiere sie. Mir ist bewusst, dass die Geschenkkarte sofort digital bereitgestellt wird und mein Widerrufsrecht damit erlischt.',
    consent_err: 'Bitte stimme den Bedingungen zu, um fortzufahren.',
    done_t: 'Die Geschenkkarte ist unterwegs.',
    done_d: 'Wir haben alles vorbereitet. Sobald sie eingelöst wird, beginnt die Schatzsuche.',
    again: 'Noch eine verschenken',
    card_caps: 'Geschenkkarte',
    card_worth: 'gültig für',
    notes_t: 'Gut zu wissen',
    notes: [
      'Zustellung per E-Mail — direkt nach dem Kauf an dich',
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
    deliver_t: 'How it arrives',
    to_recipient: 'To the recipient',
    to_me: 'To me',
    email_l: "Recipient's email",
    email_ph: 'name@example.com',
    email_err: 'Please enter a valid email address.',
    when_l: 'When should it arrive?',
    when_now: 'Right away',
    when_date: 'On a chosen date',
    rec_note: 'We email the gift card straight to the recipient — instantly or on your chosen date.',
    me_note: 'You receive the gift card by email and can pass it on yourself.',
    ship_note: 'Fully digital — no delivery address needed. Shipping for the chapters is only charged when redeemed.',
    cta: 'Give it now',
    cta_busy: 'Continuing to checkout …',
    consent_pre: 'I have read and accept the ',
    consent_agb: 'Terms',
    consent_sep1: ', the ',
    consent_wider: 'Right of withdrawal',
    consent_sep2: ' and the ',
    consent_privacy: 'Privacy Policy',
    consent_post: '. I understand that the gift card is delivered digitally at once and my right of withdrawal therefore expires.',
    consent_err: 'Please accept the terms to continue.',
    done_t: 'The gift card is on its way.',
    done_d: 'Everything is prepared. As soon as it is redeemed, the treasure hunt begins.',
    again: 'Give another one',
    card_caps: 'Gift card',
    card_worth: 'valid for',
    notes_t: 'Good to know',
    notes: [
      'Delivered by email — to you, right after purchase',
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
// with ONE variant per chapter count ("1 Kapitel" … "8 Kapitel"), each priced
// at count × chapter price. Enable the gift-card RECIPIENT feature on the
// product so Shopify emails the code to the recipient (Send on = scheduled).
const GIFT_HANDLE = 'geschenkkarte';
const GIFT_UNIT_FALLBACK = 39.9;
const GIFT_MAX_CHAPTERS = 8;
function giftLP(p) { return (window.PFLocale ? window.PFLocale.withLocale(p) : p); }

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
        <p className="r-it" style={{ marginTop: 16, fontSize: 14.5, lineHeight: 1.55, color: 'var(--rd-ink-mute)', maxWidth: 300, marginInline: 'auto' }}>{lang === 'de' ? 'Die persönliche Widmung fügt der Beschenkte später über den E-Mail-Link hinzu.' : 'The personal dedication is added later by the recipient via the email link.'}</p>
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
  const [busy, setBusy] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreeErr, setAgreeErr] = useState(false);
  const [sent, setSent] = useState(false);

  const sel = list.find((x) => x.count === count) || list[0];
  const unit = sel && sel.count ? sel.v / sel.count : GIFT_UNIT_FALLBACK;
  const chapterLabel = count === 1 ? g.ch_one : g.ch_range(count);
  const priceText = money(sel.v, sel.cc);
  const clampCount = (n) => Math.max(1, Math.min(maxCount, n));

  const buy = () => {
    const L = lang === 'de';
    if (!agree) { setAgreeErr(true); const el = document.getElementById('g-agree'); if (el) el.focus(); return; }
    setAgreeErr(false);
    const attrs = {};
    attrs[L ? 'Kapitel' : 'Chapters'] = chapterLabel;

    // Digital gift card → own DIRECT hand-off to Shopify's hosted checkout.
    // Fresh cart with just this line, so none of the site's physical steps
    // (child name, add-ons, address) apply and Shopify skips shipping. The
    // code is emailed to the buyer, who passes it on.
    if (real && prod && sel && sel.id && window.PFShop && PFShop.checkout) {
      setBusy(true);
      PFShop.checkout({}, [{ handle: GIFT_HANDLE, variantId: sel.id, qty: 1, attrs }])
        .then((ok) => { if (!ok) { setBusy(false); setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }); } })
        .catch(() => { setBusy(false); setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }); });
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
            {!sent ? (
              <div style={{ display: 'grid', gap: 24, alignContent: 'start' }}>
                {/* chapters */}
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

                {/* delivery — digital, emailed to the buyer */}
                <RdInfoCard className="r-rev r-rev-2" title={g.deliver_t} icon="mail">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 6, color: 'var(--rd-ink-soft)' }}>
                    <span style={{ color: 'var(--rd-gold)', flexShrink: 0, marginTop: 1 }}><RdIcon name="mail" size={17} /></span>
                    <span className="r-it" style={{ fontSize: 14.5, lineHeight: 1.5 }}>{g.me_note}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 10, color: 'var(--rd-ink-mute)' }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><RdIcon name="check" size={17} /></span>
                    <span className="r-it" style={{ fontSize: 14, lineHeight: 1.5 }}>{g.ship_note}</span>
                  </div>
                  <label htmlFor="g-agree" className="rd-gift-consent" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 20, cursor: 'pointer' }}>
                    <input id="g-agree" type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (agreeErr) setAgreeErr(false); }} style={{ marginTop: 2, width: 18, height: 18, flexShrink: 0, accentColor: 'var(--rd-gold)' }} aria-invalid={agreeErr ? 'true' : 'false'} />
                    <span className="r-it" style={{ fontSize: 13.5, lineHeight: 1.5, color: 'var(--rd-ink-soft)' }}>
                      {g.consent_pre}
                      <a href={giftLP('AGB.html')} target="_blank" rel="noopener" style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{g.consent_agb}</a>{g.consent_sep1}
                      <a href={giftLP('Widerruf.html')} target="_blank" rel="noopener" style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{g.consent_wider}</a>{g.consent_sep2}
                      <a href={giftLP('Datenschutz.html')} target="_blank" rel="noopener" style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{g.consent_privacy}</a>
                      {g.consent_post}
                    </span>
                  </label>
                  {agreeErr && <div role="alert" className="r-it" style={{ fontSize: 13.5, color: 'var(--rd-terra)', marginTop: 8 }}>{g.consent_err}</div>}
                  <button className="rbtn rbtn-primary rbtn-xl" style={{ width: '100%', marginTop: 16, opacity: busy ? 0.85 : 1 }} onClick={buy} disabled={busy}>
                    {busy ? g.cta_busy : <React.Fragment>{g.cta} · {priceText}</React.Fragment>}
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
                <GiftCardPreview g={g} lang={lang} chapterLabel={chapterLabel} priceText={priceText} to="" from="" msg="" />
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
