// ────────────────────────────────────────────────────────────────
// Kapitel 1 — Der Flüsterwald: conversion-optimised product page
// Gallery + buy box hero · sticky buy bar · reordered buy-flow
// Loads after: rd-chapter1-trust.jsx, rd-chapter1.jsx  (reuses their data)
// Does the page mount itself — do NOT also load rd-chapter1-sections.jsx
// ────────────────────────────────────────────────────────────────

// ─── product story / spec copy (kept bilingual for the toggle) ───
const CH2_MORE = {
  de: {
    inside_eyebrow: 'In der Box',
    inside_title: 'Was in eurer Schatzkiste steckt.',
    inside_items: [
      { icon: 'book', t: 'Das Buchkapitel', d: '10 illustrierte Seiten, in denen der Name eures Kindes gedruckt steht — zum Vorlesen ab 4, zum Selbstlesen ab 6.' },
      { icon: 'build', t: 'Der Boot-Bausatz', d: 'Teile aus FSC-Birkenholz, splitterfrei geschliffen. Genau das Boot, mit dem Popcorn & Freddy den Silbersee überqueren.' },
      { icon: 'palette', t: 'Pinsel & 6 Farben', d: 'Speichelfeste Farben auf Wasserbasis — euer Kind bemalt das Boot so, wie es in seiner Geschichte aussehen soll.' },
      { icon: 'archive', t: 'Bauanleitung & Sammel-Sticker', d: 'Eine einfache, bebilderte Anleitung — und der nächste Sticker fürs Schatzbuch.' },
    ],
    story_eyebrow: 'Worum es geht',
    story_title: 'Am Ufer des Silbersees.',
    story_body: 'Die Karte führt Popcorn und Freddy an den Silbersee — doch am Ufer ist sie plötzlich weg. Ein listiger Wolf hat sie geschnappt und wartet frech am anderen Ufer. Um hinüberzukommen, müssen die beiden ein Boot bauen und sich über das glitzernde, tiefe Wasser trauen. Es braucht Mut — und die Hilfe eures Kindes —, um dem Wolf die Karte wieder abzuringen.',
    story_hand: 'Tief durchatmen … und ab aufs Wasser.',
    story_emotion_k: 'Gefühl',
    story_emotion: 'Mut',
    details_eyebrow: 'Auf einen Blick',
    details_title: 'Die Fakten zum zweiten Kapitel.',
    details: [
      { k: 'Empfohlenes Alter', v: 'Ab 4 Jahren (Selbstlesen ab ca. 6)' },
      { k: 'Vorlesezeit', v: 'Ca. 15–20 Minuten' },
      { k: 'Bau- & Malzeit', v: 'Ca. 45–60 Minuten gemeinsame Zeit' },
      { k: 'Sprache des Buches', v: 'Deutsch oder Englisch — wählbar an der Kasse' },
      { k: 'Personalisierung', v: 'Name im Buch gedruckt' },
      { k: 'Material', v: 'FSC-Birkenholz, Farben nach DIN EN 71-3' },
      { k: 'Maße der Box', v: '32 × 24 × 8 cm, ca. 1,1 kg' },
      { k: 'Lieferung', v: '2–3 Werktage · Versandkosten an der Kasse' },
    ],
    close_caps: 'Bereit für die Überfahrt?',
    close_title: 'Der Silbersee wartet schon.',
    close_body: 'Kapitel 2 setzt genau dort an, wo der Flüsterwald endet. Trag an der Kasse den Namen eures Kindes ein — den Rest erledigen unsere Hände in der Werkstatt.',
    back_link: 'Alle Kapitel ansehen',
  },
  en: {
    inside_eyebrow: 'Inside the box',
    inside_title: 'What your treasure chest holds.',
    inside_items: [
      { icon: 'book', t: 'The book chapter', d: "10 illustrated pages with your child's name printed into the story — for reading aloud from 4, for reading alone from 6." },
      { icon: 'build', t: 'The boat kit', d: 'Parts of FSC birch wood, sanded splinter-free. The very boat Popcorn & Freddy cross Silver Lake with.' },
      { icon: 'palette', t: 'Brush & 6 paints', d: 'Saliva-resistant water-based paints — your child paints the boat just the way it looks in their story.' },
      { icon: 'archive', t: 'Instructions & collector sticker', d: 'A simple, illustrated guide — and the next sticker for the treasure book.' },
    ],
    story_eyebrow: 'The story',
    story_title: 'On the shore of Silver Lake.',
    story_body: "The map leads Popcorn and Freddy to Silver Lake — and then, at the water's edge, it is suddenly gone. A cunning wolf has snatched it and waits cheekily on the far shore. To get across, the two must build a boat and dare to cross the glittering, deep water. It takes courage — and your child's help — to win the map back from the wolf.",
    story_hand: 'Take a deep breath … and onto the water.',
    story_emotion_k: 'Emotion',
    story_emotion: 'Courage',
    details_eyebrow: 'At a glance',
    details_title: 'The facts about chapter two.',
    details: [
      { k: 'Recommended age', v: '4 and up (reading alone from about 6)' },
      { k: 'Read-aloud time', v: 'About 15–20 minutes' },
      { k: 'Building & painting time', v: 'About 45–60 minutes of shared time' },
      { k: 'Language of the book', v: 'German or English — chosen at checkout' },
      { k: 'Personalisation', v: 'Name printed in the book' },
      { k: 'Materials', v: 'FSC birch wood, paints to DIN EN 71-3' },
      { k: 'Box dimensions', v: '32 × 24 × 8 cm, approx. 1.1 kg' },
      { k: 'Delivery', v: '2–3 business days · shipping calculated at checkout' },
    ],
    close_caps: 'Ready for the crossing?',
    close_title: 'Silver Lake is waiting.',
    close_body: "Chapter 2 picks up exactly where the Whispering Woods left off. Enter your child's name at checkout — our hands in the workshop take care of the rest.",
    back_link: 'See all chapters',
  },
};

// ─── extra buy-box / gallery / sticky microcopy ──────────────
const SHOP = {
  de: {
    gallery: [
      { src: 'assets/chapter-2-cover.png', alt: 'Kapitel 2 — Der Silbersee, Buchcover', fit: 'cover' },
      { src: 'assets/box-contents.png', alt: 'Der komplette Box-Inhalt von oben', fit: 'contain' },
      { src: 'assets/scene-table.png', alt: 'Kind baut das Holz-Auto gemeinsam mit Popcorn & Freddy', fit: 'contain' },
      { src: 'assets/holz-car-v2.png', alt: 'Das fertig gebaute Holz-Auto', fit: 'contain' },
      { src: 'assets/book-page-1.png', alt: 'Eine illustrierte Seite aus dem Buch', fit: 'cover' },
    ],
    rating_count: 'aus 142 Bewertungen',
    lede: 'Die Karte führt an den Silbersee — doch ein listiger Wolf hat sie geschnappt und wartet am anderen Ufer. Nur mit einem selbstgebauten Boot und einer gehörigen Portion Mut kommen Popcorn und Freddy hinüber …',
    readmore: 'Die ganze Geschichte lesen',
    price_note: 'inkl. MwSt.',
    meta: [
      { icon: 'user', t: 'Ab 4 Jahren' },
      { icon: 'book', t: '10 illustrierte Seiten' },
      { icon: 'build', t: 'Boot zum Bauen & Bemalen' },
      { icon: 'truck', t: 'In 2–3 Werktagen da' },
    ],
    cta: 'In den Warenkorb',
    cta_added: 'Liegt im Korb',
    cta_checkout: 'Zur Kasse',
    emotion_k: 'Gefühl',
    emotion: 'Mut',
    scarcity: 'Wir fertigen von Hand — nur ~250 Boxen pro Monat.',
    trust: [
      { icon: 'shield', t: 'Sichere Bezahlung' },
      { icon: 'truck', t: 'Versand in 2–3 Werktagen' },
      { icon: 'gift', t: 'Geschenkfertig verpackt' },
    ],
    guarantee: 'Beschädigt angekommen? Sofort kostenloser Ersatz — ganz unkompliziert.',
    pay: ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'Apple Pay'],
    reviews_eyebrow: 'Stimmen von Familien',
    reviews_title: 'Was Eltern nach der ersten Box sagen.',
    reviews: [
      { q: 'Kapitel eins war der Volltreffer — auf Kapitel zwei hat mein Sohn richtig hingefiebert. Das Boot steht jetzt bemalt in der Badewanne.', n: 'Lena K.', m: 'Mama von Theo (5)' },
      { q: 'Die Qualität ist wieder top. Das Holz sauber geschliffen, nichts wirkt wie Massenware — und die Geschichte macht richtig Mut.', n: 'Daniel R.', m: 'Papa von Mira (6)' },
      { q: 'Sie hat mitgefiebert, ob sie es über den See schaffen. Als der Wolf auftauchte, war die Spannung im Kinderzimmer mit Händen zu greifen.', n: 'Sarah B.', m: 'Mama von Emilia (4)' },
      { q: 'Der Boot-Bausatz war auch für kleine Hände machbar — die Anleitung ist wirklich gut bebildert. Gemeinsame Bastelzeit vom Feinsten.', n: 'Markus T.', m: 'Papa von Jonas (5)' },
      { q: 'Endlich ein Abend ohne Bildschirm, den sich alle wünschen. Wir lesen, bauen, malen — und reden dabei mehr als sonst die ganze Woche.', n: 'Julia M.', m: 'Mama von Ben & Paul' },
      { q: 'Dass die Reihe weitergeht, lieben wir. Jede Box baut auf der letzten auf — die Vorfreude auf Kapitel drei ist schon riesig.', n: 'Anna S.', m: 'Mama von Frieda (7)' },
    ],
    verified: 'Verifizierter Kauf',
    sticky_add: 'In den Warenkorb',
    sticky_checkout: 'Zur Kasse',
    reviews_link: 'Bewertungen lesen',
  },
  en: {
    gallery: [
      { src: 'assets/chapter-2-cover.png', alt: 'Chapter 2 — Silver Lake, book cover', fit: 'cover' },
      { src: 'assets/box-contents.png', alt: 'The complete box contents from above', fit: 'contain' },
      { src: 'assets/scene-table.png', alt: 'Child building the wooden car together with Popcorn & Freddy', fit: 'contain' },
      { src: 'assets/holz-car-v2.png', alt: 'The finished wooden car', fit: 'contain' },
      { src: 'assets/book-page-1.png', alt: 'An illustrated page from the book', fit: 'cover' },
    ],
    rating_count: 'from 142 reviews',
    lede: "The map leads to Silver Lake — but a cunning wolf has snatched it and waits on the far shore. Only with a hand-built boat and a good dose of courage can Popcorn and Freddy make it across …",
    readmore: 'Read the full story',
    price_note: 'incl. VAT',
    meta: [
      { icon: 'user', t: 'Ages 4 and up' },
      { icon: 'book', t: '10 illustrated pages' },
      { icon: 'build', t: 'Boat to build & paint' },
      { icon: 'truck', t: 'With you in 2–3 days' },
    ],
    cta: 'Add to basket',
    cta_added: 'In your basket',
    cta_checkout: 'To checkout',
    emotion_k: 'Emotion',
    emotion: 'Courage',
    scarcity: 'Handcrafted in small runs — only ~250 boxes a month.',
    trust: [
      { icon: 'shield', t: 'Secure payment' },
      { icon: 'truck', t: 'Ships in 2–3 business days' },
      { icon: 'gift', t: 'Gift-ready packaging' },
    ],
    guarantee: "Arrived damaged? Free replacement right away — no fuss.",
    pay: ['Visa', 'Mastercard', 'PayPal', 'Klarna', 'Apple Pay'],
    reviews_eyebrow: 'Voices from families',
    reviews_title: 'What parents say after the first box.',
    reviews: [
      { q: 'Chapter one was a bullseye — my son was itching for chapter two. The painted boat now lives in the bathtub.', n: 'Lena K.', m: 'Mum of Theo (5)' },
      { q: 'The quality is superb again. The wood sanded clean, nothing feels mass-produced — and the story is genuinely brave-making.', n: 'Daniel R.', m: 'Dad of Mira (6)' },
      { q: 'She was on the edge of her seat over whether they would make it across. When the wolf appeared, the tension in the room was electric.', n: 'Sarah B.', m: 'Mum of Emilia (4)' },
      { q: 'The boat kit was doable even for small hands — the guide is really well illustrated. Craft time at its best.', n: 'Markus T.', m: 'Dad of Jonas (5)' },
      { q: 'Finally a screen-free evening everyone actually asks for. We read, build, paint — and talk more than in the rest of the week.', n: 'Julia M.', m: 'Mum of Ben & Paul' },
      { q: 'We love that the series keeps going. Each box builds on the last — the anticipation for chapter three is already huge.', n: 'Anna S.', m: 'Mum of Frieda (7)' },
    ],
    verified: 'Verified purchase',
    sticky_add: 'Add to basket',
    sticky_checkout: 'To checkout',
    reviews_link: 'Read reviews',
  },
};

function shopScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

// ─── GALLERY — main image + thumbnail strip ──────────────────
function Ch2Gallery({ s }) {
  const [i, setI] = useState(0);
  const main = s.gallery[i];
  return (
    <div className="shop-gal r-rev">
      <div className="shop-gal-main">
        <img src={main.src} alt={main.alt} style={{ objectFit: main.fit }} key={main.src} />
      </div>
      <div className="shop-gal-thumbs" role="tablist">
        {s.gallery.map((g, idx) => (
          <button key={g.src} role="tab" aria-selected={idx === i} aria-label={g.alt} onClick={() => setI(idx)} className={`shop-gal-thumb ${idx === i ? 'on' : ''}`}>
            <img src={g.src} alt="" style={{ objectFit: g.fit === 'contain' ? 'contain' : 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BUY BOX — the conversion core ───────────────────────────
function Ch2BuyBox({ c, s, x, lang, inCart, onAdd }) {
  const [childName, setChildName] = useState('');
  return (
    <div className="shop-buy r-rev r-rev-1">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="star" size={14} /></span>
        <span className="r-caps" style={{ color: 'var(--rd-ink-soft)', letterSpacing: '0.22em', fontSize: 11.5 }}>{c.caps}</span>
      </div>
      <h1 className="r-display" style={{ fontSize: 'clamp(38px, 4.4vw, 60px)', color: 'var(--rd-ink)', marginTop: 14, lineHeight: 1.02, textWrap: 'balance' }}>
        {c.title_a}{' '}
        <span style={{ position: 'relative', display: 'inline-block', color: 'var(--rd-terra)' }}>{c.title_b}
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: -8 }}><RdSquiggle width={200} /></span>
        </span>
      </h1>

      <button type="button" onClick={() => shopScrollTo('reviews')} className="shop-rating">
        <Ch2Stars size={16} />
        <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 15, color: 'var(--rd-ink)' }}>{x.rating_score}</span>
        <span style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{s.rating_count}</span>
      </button>

      <p className="r-serif" style={{ fontSize: 17, color: 'var(--rd-ink-soft)', marginTop: 18, lineHeight: 1.6, textWrap: 'pretty' }}>{s.lede}{s.readmore && (<> <button type="button" onClick={() => shopScrollTo('story')} style={{ display: 'inline', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15, color: 'var(--rd-terra)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{s.readmore}</button></>)}</p>

      {s.emotion && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 22, padding: '11px 18px 11px 15px', borderRadius: 99, background: 'color-mix(in srgb, var(--rd-terra) 9%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-terra) 28%, transparent)' }}>
          <span style={{ color: 'var(--rd-terra)', display: 'inline-flex', flex: 'none' }}><RdIcon name="heart" size={18} /></span>
          <span style={{ fontFamily: 'var(--f-sans)', fontSize: 15, color: 'var(--rd-ink)' }}><strong style={{ fontWeight: 800 }}>{s.emotion_k}:</strong> {s.emotion}</span>
        </div>
      )}

      <div className="shop-meta">
        {s.meta.map((m, i) => (
          <div key={i} className="shop-meta-row">
            <span className="shop-meta-ico"><RdIcon name={m.icon} size={18} /></span>
            <span>{m.t}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 26 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="r-display" style={{ fontSize: 40, color: 'var(--rd-ink)' }}>{c.price}</span>
          <span className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{s.price_note}</span>
        </div>
        <GpsrPriceNote lang={lang} />
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--f-sans)', fontSize: 13.5, color: 'var(--rd-ink-soft)' }}>
          <span>Name des Kindes <em style={{ color: 'var(--rd-ink-mute)' }}>— erscheint gedruckt in der Geschichte</em></span>
          <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="z. B. Mia" maxLength={24}
            style={{ height: 46, border: '1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent)', borderRadius: 12, padding: '0 14px', fontSize: 16, fontFamily: 'var(--f-serif)', color: 'var(--rd-ink)', background: '#fffdf6', outline: 'none' }} />
        </label>
        {!inCart ? (
          <button
            className="rbtn rbtn-primary rbtn-xl shop-cta snipcart-add-item"
            onClick={onAdd}
            data-item-id="kapitel-2-silbersee"
            data-item-name="Kapitel 2 — Der Silbersee"
            data-item-price="39.90"
            data-item-url="Der Silbersee - Kapitel 2.html"
            data-item-description="Personalisiertes Kapitel mit Boot-Bausatz, Farben & Schatzkarte."
            data-item-custom1-name="Name des Kindes"
            data-item-custom1-required="true"
            data-item-custom1-value={childName}
          >{c.cta} · {c.price} <RdIcon name="arrow" size={17} /></button>
        ) : (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span className="rbtn rbtn-ghost rbtn-xl" style={{ cursor: 'default', color: 'var(--rd-moss)', borderColor: 'color-mix(in srgb, var(--rd-moss) 50%, transparent)', flex: '1 1 auto', justifyContent: 'center' }}><RdIcon name="check" size={17} /> {c.cta_added}</span>
            <a href="Checkout.html" className="rbtn rbtn-primary rbtn-xl" style={{ flex: '1 1 auto', justifyContent: 'center' }}>{c.cta_checkout} <RdIcon name="arrow" size={17} /></a>
          </div>
        )}
        <div className="shop-scarcity"><span className="shop-dot" aria-hidden="true"></span>{s.scarcity}</div>
      </div>

      <div className="shop-reassure">
        {s.trust.map((r, i) => (
          <div key={i} className="shop-reassure-item"><span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name={r.icon} size={17} /></span>{r.t}</div>
        ))}
      </div>

      <Ch2Included x={x} />

      <div className="shop-pay">
        {s.pay.map((p, i) => <span key={i}>{p}</span>)}
      </div>
      <p style={{ marginTop: 12, fontSize: 13.5, color: 'var(--rd-ink-mute)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
        <span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name="heart" size={15} /></span>{s.guarantee}
      </p>
    </div>
  );
}

// ─── HERO — gallery + buy box ────────────────────────────────
function Ch2ShopHero({ c, s, x, lang, intensity, inCart, onAdd }) {
  return (
    <section className="rh" data-screen-label="Produkt" style={{ overflow: 'hidden', background: 'radial-gradient(ellipse 55% 45% at 92% 6%, color-mix(in srgb, var(--rd-gold-soft) 22%, transparent) 0%, transparent 62%), radial-gradient(ellipse 45% 40% at 2% 92%, color-mix(in srgb, var(--rd-sage) 26%, transparent) 0%, transparent 58%), var(--rd-paper)' }}>
      <RdLeaves intensity={intensity} />
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="shop-hero-grid">
          <Ch2Gallery s={s} />
          <Ch2BuyBox c={c} s={s} x={x} lang={lang} inCart={inCart} onAdd={onAdd} />
        </div>
      </div>
    </section>
  );
}

// ─── STICKY BUY BAR ──────────────────────────────────────────
function Ch2Sticky({ c, s, inCart, onAdd }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 560;
      const closeEl = document.getElementById('shop-close');
      const nearEnd = closeEl && closeEl.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`shop-sticky ${show ? 'on' : ''}`} aria-hidden={!show}>
      <div className="rwrap shop-sticky-row">
        <div className="shop-sticky-info">
          <img src="assets/chapter-2-cover.png" alt="" className="shop-sticky-thumb" />
          <div>
            <div className="shop-sticky-name">{c.title_a} {c.title_b}</div>
            <div className="shop-sticky-price"><span>{c.price}</span><span className="shop-sticky-note">{s.price_note}</span></div>
          </div>
        </div>
        {!inCart
          ? <button className="rbtn rbtn-primary shop-sticky-btn" onClick={onAdd}>{s.sticky_add} <RdIcon name="arrow" size={16} /></button>
          : <a href="Checkout.html" className="rbtn rbtn-primary shop-sticky-btn">{s.sticky_checkout} <RdIcon name="arrow" size={16} /></a>}
      </div>
    </div>
  );
}

// ─── REVIEWS — social proof, fresh set ───────────────────────
function Ch2ShopReviews({ s, x }) {
  return (
    <section id="reviews" data-rd data-screen-label="Bewertungen" style={{ padding: '118px 0 118px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={s.reviews_eyebrow} title={s.reviews_title} max={760} />
        <div className="r-rev" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <Ch2Stars size={17} />
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 16, color: 'var(--rd-ink)' }}>{x.rating_score}</span>
          <span style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>· {s.rating_count}</span>
        </div>
        <div className="r-rev" style={{ marginTop: 40 }}>
          <RdPeekCarousel ariaLabel={s.reviews_eyebrow}>
            {s.reviews.map((r, i) => (
              <div key={i} className="shop-review">
                <Ch2Stars size={13} />
                <p className="r-serif" style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--rd-ink)', marginTop: 14, textWrap: 'pretty', flex: '1 1 auto' }}>&ldquo;{r.q}&rdquo;</p>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--rd-walnut)' }}>{r.n}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)' }}>{r.m}</span>
                </div>
                <div className="shop-verified"><RdIcon name="check" size={12} /> {s.verified}</div>
              </div>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
    </section>
  );
}

// ─── STORY TEASER (reused layout) ────────────────────────────
function Ch2Story({ m }) {
  return (
    <section id="story" data-rd data-screen-label="Worum es geht" style={{ padding: '124px 0 124px', background: 'var(--rd-paper)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ch2-story-grid">
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
            {m.story_emotion && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 28, padding: '11px 18px 11px 15px', borderRadius: 99, background: 'color-mix(in srgb, var(--rd-terra) 9%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-terra) 28%, transparent)' }}>
                <span style={{ color: 'var(--rd-terra)', display: 'inline-flex', flex: 'none' }}><RdIcon name="heart" size={18} /></span>
                <span style={{ fontFamily: 'var(--f-sans)', fontSize: 15, color: 'var(--rd-ink)' }}><strong style={{ fontWeight: 800 }}>{m.story_emotion_k}:</strong> {m.story_emotion}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`.ch2-story-grid { display: grid; grid-template-columns: 0.94fr 1.06fr; gap: 80px; align-items: center; } @media (max-width: 980px) { .ch2-story-grid { grid-template-columns: minmax(0, 1fr); gap: 60px; } }`}</style>
    </section>
  );
}

// ─── INSIDE THE BOX (reused) ─────────────────────────────────
function Ch2Inside({ m }) {
  return (
    <section id="inside" data-rd data-screen-label="In der Box" style={{ padding: '124px 0 128px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={m.inside_eyebrow} title={m.inside_title} max={760} />
        <div className="rd-info-grid-3" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {m.inside_items.map((it, i) => (
            <div key={i} className={`r-rev r-rev-${(i % 3) + 1}`} style={{ background: 'var(--rd-paper)', border: '1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent)', borderRadius: 14, padding: '30px 28px', boxShadow: '0 26px 55px -40px color-mix(in srgb, var(--rd-ink) 45%, transparent)' }}>
              <span style={{ display: 'inline-grid', placeItems: 'center', width: 48, height: 48, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent)', color: 'var(--rd-gold)', background: 'color-mix(in srgb, var(--rd-gold-soft) 12%, transparent)', marginBottom: 18 }}><RdIcon name={it.icon} size={21} /></span>
              <h3 className="r-serif" style={{ fontWeight: 600, fontSize: 19.5, color: 'var(--rd-ink)', lineHeight: 1.3 }}>{it.t}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 10, lineHeight: 1.65, textWrap: 'pretty' }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 980px) { #inside .rd-info-grid-3 { grid-template-columns: minmax(0, 1fr) !important; max-width: 480px; margin-inline: auto; } }`}</style>
    </section>
  );
}

// ─── DETAILS TABLE (reused) ──────────────────────────────────
function Ch2Details({ m }) {
  return (
    <section data-rd data-screen-label="Auf einen Blick" style={{ padding: '116px 0 120px', background: 'var(--rd-paper)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={m.details_eyebrow} title={m.details_title} max={680} />
        <div className="r-rev" style={{ marginTop: 52 }}>
          {m.details.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 0.85fr) 1.15fr', gap: 20, padding: '18px 4px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', borderBottom: i === m.details.length - 1 ? '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' : 'none' }} className="ch2-detail-row">
              <span className="r-caps" style={{ letterSpacing: '0.18em', color: 'var(--rd-ink-mute)', alignSelf: 'center' }}>{d.k}</span>
              <span className="r-serif" style={{ fontSize: 17.5, color: 'var(--rd-ink)', fontWeight: 500 }}>{d.v}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 560px) { .ch2-detail-row { grid-template-columns: minmax(0, 1fr) !important; gap: 4px !important; } }`}</style>
    </section>
  );
}

// ─── CLOSE — dark forest CTA (kept) ──────────────────────────
function Ch2Close({ c, m, lang, intensity, inCart, onAdd }) {
  return (
    <section id="shop-close" data-rd data-screen-label="Abschluss" style={{ padding: '160px 0 200px', color: 'var(--rd-cream)', background: 'radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--rd-gold) 24%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--rd-paper) 0%, var(--rd-forest-deep) 16%, var(--rd-night) 70%)' }}>
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
          <a href="index.html#chapters" className="rbtn rbtn-ghost-light rbtn-xl">{m.back_link}</a>
        </div>
        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
          <RdCraftNote lang={lang} k="count" center dark size={15} />
        </div>
      </div>
    </section>
  );
}

// ─── BODY — tightened buy-flow order ─────────────────────────
function Ch2ShopBody({ lang }) {
  const c = CH2_COPY[lang] || CH2_COPY.de;
  const m = CH2_MORE[lang] || CH2_MORE.de;
  const x = CH2_TRUST[lang] || CH2_TRUST.de;
  const s = SHOP[lang] || SHOP.de;
  const [inCart, setInCart] = useState(() => rdCartLoad().some((it) => it.n === 'kapitel-2-silbersee'));
  const intensity = 5;
  useEffect(() => {
    const sync = () => setInCart(rdCartLoad().some((it) => it.n === 'kapitel-2-silbersee'));
    window.addEventListener('rd-cart-changed', sync);
    return () => window.removeEventListener('rd-cart-changed', sync);
  }, []);

  const onAdd = () => {
    if (window.Snipcart) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const cart = rdCartLoad();
    const i = cart.findIndex((it) => it.n === 'kapitel-2-silbersee');
    if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1 };
    else cart.push({ n: 'kapitel-2-silbersee', handle: 'kapitel-2-silbersee', name_de: 'Kapitel 2 — Der Silbersee', name_en: 'Chapter 2 — Silver Lake', img: 'assets/chapter-2-cover.png', qty: 1 });
    rdCartSave(cart);
    window.dispatchEvent(new Event('rd-cart-changed'));
    setInCart(true);
  };

  return (
    <React.Fragment>
      <Ch2ShopHero c={c} s={s} x={x} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
      <Ch2TrustBadges x={x} />
      <Ch2ShopReviews s={s} x={x} />
      <Ch2Reader c={c} lang={lang} inCart={inCart} onAdd={onAdd} />
      <Ch2Inside m={m} />
      <Ch2Benefits x={x} />
      <Ch2Story m={m} />
      <Ch2Details m={m} />
      <GpsrCompliance lang={lang} />
      <Ch2Faq x={x} />
      <Ch2Close c={c} m={m} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
      <Ch2Sticky c={c} s={s} inCart={inCart} onAdd={onAdd} />
    </React.Fragment>
  );
}

// ─── APP WRAPPER — English-led, reuses subpage topbar/footer ─
function Ch2ShopApp() {
  const [tw, setTw] = useTweaks({ palette: 'wald', anim: 5, lang: 'en' });
  const [lang, setLang] = useState(() => (['de', 'en'].includes(tw.lang) ? tw.lang : 'en'));
  const intensity = typeof tw.anim === 'number' ? tw.anim : 5;

  useEffect(() => { setTw('lang', lang); rdLangSave(lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.palette = tw.palette || 'wald';
    document.documentElement.dataset.anim = intensity > 0 ? 'on' : 'off';
    document.documentElement.style.setProperty('--anim-f', String(Math.max(intensity, 1) / 5));
  }, [tw.palette, intensity]);

  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const id = requestAnimationFrame(() => document.querySelectorAll('.r-rev:not(.in)').forEach((el) => io.observe(el)));
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [lang]);

  return (
    <React.Fragment>
      <style>{RD_PAGE_CSS}{SHOP_CSS}</style>
      <RdPageTopBar t={t} lang={lang} setLang={setLang} />
      <main data-screen-label="Kapitel 1 — Der Flüsterwald"><Ch2ShopBody key={lang} lang={lang} /></main>
      <RdPageFooter t={t} lang={lang} setLang={setLang} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Stimmung" value={tw.palette} options={[{ value: 'wald', label: 'Wald' }, { value: 'birke', label: 'Birke' }, { value: 'abend', label: 'Abend' }]} onChange={(v) => setTw('palette', v)} />
        <TweakSection label="Bewegung" />
        <TweakSlider label="Animations-Intensität" value={intensity} min={0} max={10} step={1} onChange={(v) => setTw('anim', v)} />
        <TweakSection label="Sprache · Language" />
        <TweakRadio label="Language" value={lang} options={[{ value: 'en', label: 'English' }, { value: 'de', label: 'Deutsch' }]} onChange={setLang} />
      </TweaksPanel>
    </React.Fragment>
  );
}

const SHOP_CSS = `
  .shop-hero-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 60px; align-items: start; padding-top: 132px; padding-bottom: 96px; }
  .shop-gal { position: sticky; top: 108px; }
  .shop-gal-main { border-radius: 16px; overflow: hidden; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); box-shadow: 0 40px 90px -50px color-mix(in srgb, var(--rd-ink) 55%, transparent); aspect-ratio: 4 / 4.3; }
  .shop-gal-main img { width: 100%; height: 100%; display: block; animation: shop-fade 0.4s var(--ease); }
  @keyframes shop-fade { from { opacity: 0; } to { opacity: 1; } }
  html[data-anim="off"] .shop-gal-main img { animation: none; }
  .shop-gal-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 14px; }
  .shop-gal-thumb { aspect-ratio: 1; border-radius: 10px; overflow: hidden; border: 1.5px solid color-mix(in srgb, var(--rd-ink) 14%, transparent); background: var(--rd-cream); cursor: pointer; padding: 0; transition: border-color 0.25s, transform 0.25s; }
  .shop-gal-thumb img { width: 100%; height: 100%; }
  .shop-gal-thumb:hover { transform: translateY(-2px); }
  .shop-gal-thumb.on { border-color: var(--rd-gold); box-shadow: 0 0 0 3px color-mix(in srgb, var(--rd-gold) 22%, transparent); }
  .shop-buy { max-width: 540px; }
  .shop-rating { display: inline-flex; align-items: center; gap: 10px; margin-top: 18px; background: none; border: none; padding: 4px 0; cursor: pointer; }
  .shop-meta { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
  .shop-meta-row { display: flex; align-items: center; gap: 11px; font-family: var(--f-sans); font-weight: 500; font-size: 14.5px; color: var(--rd-ink-soft); }
  .shop-meta-ico { flex: none; display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent); color: var(--rd-gold); background: color-mix(in srgb, var(--rd-gold-soft) 10%, transparent); }
  .shop-cta { width: 100%; justify-content: center; font-size: 16.5px; }
  .shop-scarcity { display: flex; align-items: center; gap: 9px; font-family: var(--f-sans); font-weight: 600; font-size: 13.5px; color: var(--rd-terra); }
  .shop-dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--rd-terra); box-shadow: 0 0 0 0 color-mix(in srgb, var(--rd-terra) 60%, transparent); animation: shop-pulse 2s infinite; }
  @keyframes shop-pulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--rd-terra) 55%, transparent); } 70% { box-shadow: 0 0 0 7px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
  .shop-reassure { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 22px; padding: 16px 0; border-top: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .shop-reassure-item { display: flex; align-items: center; gap: 8px; font-family: var(--f-sans); font-weight: 600; font-size: 13.5px; color: var(--rd-ink-soft); }
  .shop-gift { display: flex; align-items: center; gap: 12px; margin-top: 20px; background: color-mix(in srgb, var(--rd-gold-soft) 14%, transparent); border: 1px solid color-mix(in srgb, var(--rd-gold) 34%, transparent); border-radius: 12px; padding: 14px 16px; }
  .shop-pay { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-top: 26px; font-family: var(--f-sans); font-weight: 700; font-size: 12px; letter-spacing: 0.07em; color: var(--rd-ink-mute); }
  .shop-review { height: 100%; display: flex; flex-direction: column; background: var(--rd-paper); border: 1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent); border-radius: 14px; padding: 26px 26px 24px; box-shadow: 0 1px 3px color-mix(in srgb, var(--rd-ink) 6%, transparent), 0 22px 44px -34px color-mix(in srgb, var(--rd-ink) 30%, transparent); }
  .shop-verified { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; font-family: var(--f-sans); font-weight: 700; font-size: 11.5px; letter-spacing: 0.04em; color: var(--rd-moss); }
  .shop-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; background: color-mix(in srgb, var(--rd-paper) 94%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-top: 1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent); box-shadow: 0 -14px 40px -24px color-mix(in srgb, var(--rd-ink) 45%, transparent); transform: translateY(110%); transition: transform 0.4s var(--ease); }
  .shop-sticky.on { transform: translateY(0); }
  .shop-sticky-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 12px 0; }
  .shop-sticky-info { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .shop-sticky-thumb { width: 46px; height: 46px; border-radius: 8px; object-fit: cover; flex: none; border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .shop-sticky-name { font-family: var(--f-serif); font-weight: 600; font-size: 16px; color: var(--rd-ink); line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .shop-sticky-price { display: flex; align-items: baseline; gap: 8px; }
  .shop-sticky-price > span:first-child { font-family: var(--f-sans); font-weight: 800; font-size: 15px; color: var(--rd-ink); }
  .shop-sticky-note { font-size: 12.5px; color: var(--rd-ink-mute); }
  .shop-sticky-btn { flex: none; padding: 12px 22px; font-size: 14.5px; }
  @media (max-width: 900px) {
    .shop-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 34px; padding-top: 116px; padding-bottom: 64px; }
    .shop-gal { position: static; top: auto; }
    .shop-gal-main { aspect-ratio: 4 / 3.7; }
    .shop-buy { max-width: 100%; }
  }
  @media (max-width: 560px) {
    .shop-meta { grid-template-columns: 1fr; }
    .shop-sticky-note { display: none; }
    .shop-sticky-name { font-size: 14.5px; }
    .shop-sticky-btn { padding: 11px 16px; }
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(<Ch2ShopApp />);

Object.assign(window, { CH2_MORE, SHOP, Ch2Gallery, Ch2BuyBox, Ch2ShopHero, Ch2Sticky, Ch2ShopReviews, Ch2Story, Ch2Inside, Ch2Details, Ch2Close, Ch2ShopBody, Ch2ShopApp });
