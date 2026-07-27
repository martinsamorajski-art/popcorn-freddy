// ────────────────────────────────────────────────────────────────
// Kapitel 1 — Der Flüsterwald: inside, details, close, app
// ────────────────────────────────────────────────────────────────

const CH1_MORE = {
  de: {
    inside_eyebrow: 'In der Box',
    inside_title: 'Was in eurer Schatzkiste steckt.',
    inside_items: [
      { icon: 'book', t: 'Das Buchkapitel', d: '10 illustrierte Seiten, in denen der Name eures Kindes gedruckt steht — zum Vorlesen ab 4, zum Selbstlesen ab 6.' },
      { icon: 'build', t: 'Der Holz-Auto-Bausatz', d: '24 Teile aus FSC-Birkenholz, splitterfrei geschliffen. Genau das Auto, mit dem Popcorn & Freddy in den Wald aufbrechen.' },
      { icon: 'palette', t: 'Pinsel & 6 Farben', d: 'Speichelfeste Farben auf Wasserbasis — euer Kind bemalt das Auto so, wie es in seiner Geschichte aussehen soll.' },
      { icon: 'compass', t: 'Die Schatzkarte, Etappe 1', d: 'Das erste Stück der großen Karte. Kapitel für Kapitel wächst sie weiter — bis zum Schatz.' },
      { icon: 'archive', t: 'Bauanleitung & Sammel-Sticker', d: 'Eine einfache, bebilderte Anleitung — und der erste Sticker fürs Schatzbuch.' },
      { icon: 'gift', t: 'Der Holz-Ordner — geschenkt', d: 'Einmalig zur ersten Box: der gravierte Sammel-Ordner mit dem Namen eures Kindes.' },
    ],
    story_eyebrow: 'Worum es geht',
    story_title: 'Ein Flüstern zwischen den Bäumen.',
    story_body: 'Popcorn, der bedächtige Bär mit der runden Brille, und Freddy, der flinke Fuchs mit dem noch flinkeren Lächeln, leben am plätschernden Bach — bis eines Morgens eine Karte vor ihrer Tür liegt, die es gar nicht geben dürfte. Wer hat sie gezeichnet? Und warum steht der Name eures Kindes darauf? Das erste Kapitel führt hinein in den Flüsterwald — und endet dort, wo das nächste beginnt.',
    story_hand: 'Psst … der Wald flüstert nur, wenn man ganz leise ist.',
    details_eyebrow: 'Auf einen Blick',
    details_title: 'Die Fakten zum ersten Kapitel.',
    details: [
      { k: 'Empfohlenes Alter', v: 'Ab 4 Jahren (Selbstlesen ab ca. 6)' },
      { k: 'Vorlesezeit', v: 'Ca. 15–20 Minuten' },
      { k: 'Bau- & Malzeit', v: 'Ca. 45–60 Minuten gemeinsame Zeit' },
      { k: 'Sprache des Buches', v: 'Deutsch oder Englisch — wählbar an der Kasse' },
      { k: 'Personalisierung', v: 'Name im Buch gedruckt & im Ordner graviert' },
      { k: 'Material', v: 'FSC-Birkenholz, Farben nach DIN EN 71-3' },
      { k: 'Maße der Box', v: '32 × 24 × 8 cm, ca. 1,1 kg' },
      { k: 'Lieferung', v: '2–3 Werktage · Versandkosten werden an der Kasse berechnet' },
    ],
    close_caps: 'Bereit für den ersten Schritt?',
    close_title: 'Der Wald wartet schon.',
    close_body: 'Jede Reise durch alle acht Kapitel beginnt mit diesem einen. Trag an der Kasse den Namen eures Kindes ein — den Rest erledigen unsere Hände in der Werkstatt.',
    back_link: '← Alle Kapitel ansehen',
  },
  en: {
    inside_eyebrow: 'Inside the box',
    inside_title: 'What your treasure chest holds.',
    inside_items: [
      { icon: 'book', t: 'The book chapter', d: "10 illustrated pages with your child's name printed into the story — for reading aloud from 4, for reading alone from 6." },
      { icon: 'build', t: 'The wooden car kit', d: '24 parts of FSC birch wood, sanded splinter-free. The very car Popcorn & Freddy set off into the woods with.' },
      { icon: 'palette', t: 'Brush & 6 paints', d: 'Saliva-resistant water-based paints — your child paints the car just the way it looks in their story.' },
      { icon: 'compass', t: 'The treasure map, stage 1', d: 'The first piece of the great map. It grows chapter by chapter — all the way to the treasure.' },
      { icon: 'archive', t: 'Instructions & collector sticker', d: 'A simple, illustrated guide — and the first sticker for the treasure book.' },
      { icon: 'gift', t: 'The wooden folder — free', d: "Once, with your first box: the engraved collector's folder with your child's name." },
    ],
    story_eyebrow: 'The story',
    story_title: 'A whisper between the trees.',
    story_body: "Popcorn, the thoughtful bear with the round glasses, and Freddy, the quick fox with the even quicker smile, live by the babbling brook — until one morning a map lies at their door that should not exist at all. Who drew it? And why is your child's name on it? The first chapter leads into the Whispering Woods — and ends where the next one begins.",
    story_hand: 'Psst … the woods only whisper if you are very quiet.',
    details_eyebrow: 'At a glance',
    details_title: 'The facts about chapter one.',
    details: [
      { k: 'Recommended age', v: '4 and up (reading alone from about 6)' },
      { k: 'Read-aloud time', v: 'About 15–20 minutes' },
      { k: 'Building & painting time', v: 'About 45–60 minutes of shared time' },
      { k: 'Language of the book', v: 'German or English — chosen at checkout' },
      { k: 'Personalisation', v: 'Name printed in the book & engraved on the folder' },
      { k: 'Materials', v: 'FSC birch wood, paints to DIN EN 71-3' },
      { k: 'Box dimensions', v: '32 × 24 × 8 cm, approx. 1.1 kg' },
      { k: 'Delivery', v: '2–3 business days · shipping calculated at checkout' },
    ],
    close_caps: 'Ready for the first step?',
    close_title: 'The woods are waiting.',
    close_body: "Every journey through all eight chapters begins with this one. Enter your child's name at checkout — our hands in the workshop take care of the rest.",
    back_link: '← See all chapters',
  },
};

// ─── STORY TEASER ────────────────────────────────────────────
function Ch1Story({ m }) {
  return (
    <section data-rd data-screen-label="Worum es geht" style={{ padding: '140px 0 140px', background: 'var(--rd-paper)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ch1-story-grid">
          <div className="r-rev" style={{ position: 'relative' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 80px -36px color-mix(in srgb, var(--rd-ink) 55%, transparent)', transform: 'rotate(-1.2deg)' }}>
              <img src="assets/book-1-forest.jpg" alt="" style={{ width: '100%', aspectRatio: '4 / 3.4', objectFit: 'cover' }} />
            </div>
            <p className="r-hand" style={{ position: 'absolute', bottom: -26, right: 6, fontSize: 21, color: 'var(--rd-terra)', transform: 'rotate(-2deg)' }}>{m.story_hand}</p>
          </div>
          <div className="r-rev r-rev-1" style={{ alignSelf: 'center' }}>
            <span className="r-caps r-caps-rule">{m.story_eyebrow}</span>
            <h2 className="r-display" style={{ fontSize: 'clamp(32px, 3.8vw, 52px)', marginTop: 22, color: 'var(--rd-ink)', textWrap: 'balance' }}>{m.story_title}</h2>
            <p style={{ fontSize: 'clamp(16.5px, 1.35vw, 19px)', color: 'var(--rd-ink-soft)', marginTop: 20, lineHeight: 1.72, textWrap: 'pretty' }}>{m.story_body}</p>
          </div>
        </div>
      </div>
      <style>{`
        .ch1-story-grid { display: grid; grid-template-columns: 0.94fr 1.06fr; gap: 80px; align-items: center; }
        @media (max-width: 980px) { .ch1-story-grid { grid-template-columns: minmax(0, 1fr); gap: 60px; } }
      `}</style>
    </section>
  );
}

// ─── INSIDE THE BOX ──────────────────────────────────────────
function Ch1Inside({ m }) {
  return (
    <section data-rd data-screen-label="In der Box" style={{ padding: '140px 0 150px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={m.inside_eyebrow} title={m.inside_title} max={760} />
        <div className="rd-info-grid-3" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {m.inside_items.map((it, i) => (
            <div key={i} className={`r-rev r-rev-${(i % 3) + 1}`} style={{ background: 'var(--rd-paper)', border: '1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent)', borderRadius: 14, padding: '30px 28px', boxShadow: '0 26px 55px -40px color-mix(in srgb, var(--rd-ink) 45%, transparent)' }}>
              <span style={{ display: 'inline-grid', placeItems: 'center', width: 48, height: 48, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent)', color: 'var(--rd-gold)', background: 'color-mix(in srgb, var(--rd-gold-soft) 12%, transparent)', marginBottom: 18 }}><RdIcon name={it.icon} size={21} /></span>
              <h3 className="r-serif" style={{ fontWeight: 600, fontSize: 19.5, color: 'var(--rd-ink)', lineHeight: 1.3 }}>{it.t}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 10, lineHeight: 1.65, textWrap: 'pretty' }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 980px) { .rd-info-grid-3 { grid-template-columns: minmax(0, 1fr) !important; max-width: 480px; margin-inline: auto; } }`}</style>
    </section>
  );
}

// ─── DETAILS TABLE ───────────────────────────────────────────
function Ch1Details({ m }) {
  return (
    <section data-rd data-screen-label="Auf einen Blick" style={{ padding: '130px 0 140px', background: 'var(--rd-paper)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={m.details_eyebrow} title={m.details_title} max={680} />
        <div className="r-rev" style={{ marginTop: 56 }}>
          {m.details.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 0.85fr) 1.15fr', gap: 20, padding: '18px 4px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', borderBottom: i === m.details.length - 1 ? '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' : 'none' }} className="ch1-detail-row">
              <span className="r-caps" style={{ letterSpacing: '0.18em', color: 'var(--rd-ink-mute)', alignSelf: 'center' }}>{d.k}</span>
              <span className="r-serif" style={{ fontSize: 17.5, color: 'var(--rd-ink)', fontWeight: 500 }}>{d.v}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 560px) { .ch1-detail-row { grid-template-columns: minmax(0, 1fr) !important; gap: 4px !important; } }`}</style>
    </section>
  );
}

// ─── CLOSE — dark forest CTA ─────────────────────────────────
function Ch1Close({ c, m, lang, intensity, inCart, onAdd }) {
  return (
    <section data-rd data-screen-label="Abschluss" style={{ padding: '160px 0 200px', color: 'var(--rd-cream)', background: 'radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--rd-gold) 24%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--rd-paper) 0%, var(--rd-forest-deep) 16%, var(--rd-night) 70%)' }}>
      <RdFireflies intensity={intensity} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '44%' }}><RdPines color="#10150C" seed={2} /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', opacity: 0.6 }}><RdPines color="#1B2415" seed={5} /></div>
      <div className="rwrap-tight r-rev" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="r-caps r-caps-rule" style={{ color: 'var(--rd-gold-soft)' }}>{m.close_caps}</span>
        <h2 className="r-display" style={{ fontSize: 'clamp(40px, 5.4vw, 76px)', color: 'var(--rd-cream)', marginTop: 26, textWrap: 'balance' }}>{m.close_title}</h2>
        <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.4vw, 20.5px)', color: 'rgba(242,236,217,0.82)', marginTop: 24, lineHeight: 1.65, maxWidth: 560, margin: '24px auto 0', textWrap: 'pretty' }}>{m.close_body}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          {!inCart
            ? <button className="rbtn rbtn-primary rbtn-xl" onClick={onAdd}>{c.cta} · {c.price}</button>
            : <a href="Checkout.html" className="rbtn rbtn-primary rbtn-xl">{c.cta_checkout} <RdIcon name="arrow" size={17} /></a>}
          <a href="index.html#chapters" className="rbtn rbtn-ghost-light rbtn-xl">{m.back_link.replace('← ', '')}</a>
        </div>
        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
          <RdCraftNote lang={lang} k="count" center dark size={15} />
        </div>
      </div>
    </section>
  );
}

// ─── BODY ────────────────────────────────────────────────────
function Ch1Body({ lang }) {
  const c = CH1_COPY[lang] || CH1_COPY.de;
  const m = CH1_MORE[lang] || CH1_MORE.de;
  const x = CH1_TRUST[lang] || CH1_TRUST.de;
  const [inCart, setInCart] = useState(() => rdCartLoad().some((x) => x.n === 1));
  const intensity = 5;

  const onAdd = () => {
    const cart = rdCartLoad();
    const i = cart.findIndex((x) => x.n === 1);
    if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1 };
    else cart.push({ n: 1, name_de: 'Kapitel 1 — Der Flüsterwald', name_en: 'Chapter 1 — The Whispering Woods', img: 'assets/chapter-1-cover.png', qty: 1 });
    rdCartSave(cart);
    window.dispatchEvent(new Event('rd-cart-changed'));
    setInCart(true);
  };

  return (
    <React.Fragment>
      <Ch1Hero c={c} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
      <Ch1Reader c={c} lang={lang} inCart={inCart} onAdd={onAdd} />
      <Ch1Story m={m} />
      <Ch1Reviews x={x} />
      <Ch1Benefits x={x} />
      <Ch1Inside m={m} />
      <Ch1Details m={m} />
      <Ch1Faq x={x} />
      <Ch1TrustBadges x={x} />
      <Ch1Close c={c} m={m} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Kapitel 1 — Der Flüsterwald" render={(t, lang) => <Ch1Body key={lang} lang={lang} />} />
);
