// ────────────────────────────────────────────────────────────────
// Kapitel 1 — Der Flüsterwald: copy, hero, book reader
// ────────────────────────────────────────────────────────────────

const CH1_COPY = {
  de: {
    label: 'Kapitel 1 — Der Flüsterwald',
    caps: 'Kapitel 01 · Wo alles beginnt',
    title_a: 'Der',
    title_b: 'Flüsterwald',
    lede: 'Tief im Herzen des Waldes, wo der Bach sein leises Lied singt, finden Popcorn und Freddy eine Karte, die es eigentlich gar nicht geben dürfte. So beginnt die große Schatzsuche — und euer Kind ist von der ersten Seite an mittendrin.',
    price: '39,90 €',
    price_note: 'inkl. MwSt.',
    cta: 'In den Warenkorb',
    cta_added: 'Liegt im Korb',
    cta_checkout: 'Zur Kasse',
    meta: [
      { icon: 'user', t: 'Ab 4 Jahren' },
      { icon: 'book', t: '10 illustrierte Seiten' },
      { icon: 'build', t: 'Holz-Auto zum Bauen & Bemalen' },
      { icon: 'truck', t: 'In 2–3 Werktagen bei euch' },
    ],
    folder_gift: 'Zur ersten Box: die gravierte Kunstleder-Mappe — geschenkt.',
    // reader
    read_eyebrow: 'Blättere hinein',
    read_title: 'Die ersten Seiten — nur für euch.',
    read_lede: 'Vier von zehn Seiten dürfen wir zeigen. Der Rest bleibt versiegelt, bis die Box bei euch auf dem Tisch steht.',
    read_page: 'Seite',
    read_of: 'von',
    read_prev: 'Vorherige Seite',
    read_next: 'Nächste Seite',
    read_captions: [
      'Wo der Bach sein leises Lied singt …',
      'Eine Karte, die es nicht geben dürfte.',
      'Popcorn setzt seine Brille zurecht.',
      'Und dann — ein Flüstern zwischen den Bäumen.',
    ],
    sealed_caps: 'Hier endet die Leseprobe',
    sealed_t: 'Die nächsten sechs Seiten bleiben versiegelt.',
    sealed_d: 'Wie es weitergeht, gehört euch allein — beim Vorlesen auf dem Sofa, wenn der Name eures Kindes in der Geschichte auftaucht.',
    sealed_cta: 'Das Kapitel sichern',
    sealed_back: 'Nochmal von vorn blättern',
  },
  en: {
    label: 'Chapter 1 — The Whispering Woods',
    caps: 'Chapter 01 · Where it all begins',
    title_a: 'The',
    title_b: 'Whispering Woods',
    lede: 'Deep in the heart of the forest, where the brook sings its gentle song, Popcorn and Freddy find a map that should not exist at all. So begins the great treasure hunt — and your child is right in the middle of it from the very first page.',
    price: '€39.90',
    price_note: 'incl. VAT',
    cta: 'Add to basket',
    cta_added: 'In your basket',
    cta_checkout: 'To checkout',
    meta: [
      { icon: 'user', t: 'Ages 4 and up' },
      { icon: 'book', t: '10 illustrated pages' },
      { icon: 'build', t: 'Wooden car to build & paint' },
      { icon: 'truck', t: 'With you in 2–3 business days' },
    ],
    folder_gift: 'With your first box: the engraved faux leather folder — as a gift.',
    read_eyebrow: 'Leaf through',
    read_title: 'The first pages — just for you.',
    read_lede: 'We may show four of ten pages. The rest stays sealed until the box is on your table.',
    read_page: 'Page',
    read_of: 'of',
    read_prev: 'Previous page',
    read_next: 'Next page',
    read_captions: [
      'Where the brook sings its gentle song …',
      'A map that should not exist.',
      'Popcorn adjusts his glasses.',
      'And then — a whisper between the trees.',
    ],
    sealed_caps: 'The preview ends here',
    sealed_t: 'The next six pages stay sealed.',
    sealed_d: "How it continues belongs to you alone — reading aloud on the sofa, when your child's name appears in the story.",
    sealed_cta: 'Secure the chapter',
    sealed_back: 'Leaf through again',
  },
};

const CH1_PAGES = ['assets/book-page-1.png', 'assets/book-page-2.png', 'assets/book-page-3.png', 'assets/book-page-4.png'];
const CH1_TOTAL = 10;

// ─── HERO ────────────────────────────────────────────────────
function Ch1Hero({ c, lang, intensity, inCart, onAdd }) {
  return (
    <section className="rh" data-screen-label="Kapitel-Hero" style={{ overflow: 'hidden', background: 'radial-gradient(ellipse 60% 50% at 88% 8%, color-mix(in srgb, var(--rd-gold-soft) 26%, transparent) 0%, transparent 65%), radial-gradient(ellipse 50% 45% at 4% 90%, color-mix(in srgb, var(--rd-sage) 30%, transparent) 0%, transparent 60%), var(--rd-paper)' }}>
      <RdLeaves intensity={intensity} />
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
      <div className="rh-a-grid">
        <div>
          <div className="r-rev" style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="star" size={15} /></span>
            <span className="r-caps" style={{ color: 'var(--rd-ink-soft)', letterSpacing: '0.24em', fontSize: 12 }}>{c.caps}</span>
          </div>
          <h1 className="r-display r-rev r-rev-1" style={{ fontSize: 'clamp(44px, 5.6vw, 88px)', color: 'var(--rd-ink)', marginTop: 20, textWrap: 'balance' }}>
            {c.title_a}{' '}
            <span style={{ position: 'relative', display: 'inline-block', color: 'var(--rd-terra)' }}>
              {c.title_b}
              <span style={{ position: 'absolute', left: 0, right: 0, bottom: -10 }}><RdSquiggle width={200} /></span>
            </span>
          </h1>
          <p className="r-serif r-rev r-rev-2" style={{ fontSize: 'clamp(17px, 1.4vw, 20.5px)', color: 'var(--rd-ink-soft)', marginTop: 30, lineHeight: 1.68, maxWidth: 540, textWrap: 'pretty' }}>{c.lede}</p>
          <Ch1Rating x={CH1_TRUST[lang] || CH1_TRUST.de} />

          <div className="r-rev r-rev-3" style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 30 }}>
            <span className="r-display" style={{ fontSize: 40, color: 'var(--rd-ink)' }}>{c.price}</span>
            <span className="r-it" style={{ fontSize: 15, color: 'var(--rd-ink-mute)' }}>{c.price_note}</span>
          </div>

          <div className="r-rev r-rev-3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 22 }}>
            {!inCart ? (
              <button className="rbtn rbtn-primary rbtn-xl" onClick={onAdd}>{c.cta} <RdIcon name="arrow" size={17} /></button>
            ) : (
              <React.Fragment>
                <span className="rbtn rbtn-ghost rbtn-xl" style={{ cursor: 'default', color: 'var(--rd-moss)', borderColor: 'color-mix(in srgb, var(--rd-moss) 50%, transparent)' }}><RdIcon name="check" size={17} /> {c.cta_added}</span>
                <a href="Checkout.html" className="rbtn rbtn-primary rbtn-xl">{c.cta_checkout} <RdIcon name="arrow" size={17} /></a>
              </React.Fragment>
            )}
          </div>
          <div className="r-rev r-rev-4" style={{ marginTop: 18 }}>
            <RdCraftNote lang={lang} k="batch" size={15} />
          </div>

          <div className="rh-feat r-rev r-rev-4">
            {c.meta.map((m, i) => (
              <div key={i} className="rh-feat-row">
                <span className="rh-feat-ico"><RdIcon name={m.icon} size={20} /></span>
                <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 500, fontSize: 15.5, color: 'var(--rd-ink-soft)' }}>{m.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rh-arch r-rev r-rev-2">
          <div className="rh-arch-img">
            <img src="assets/chapter-1-cover.png" alt={c.label} />
          </div>
          <div className="rh-arch-frame" aria-hidden="true"></div>
          <div className="r-hand r-float" style={{ position: 'absolute', top: -8, right: -6, background: 'var(--rd-paper)', border: '1.5px solid var(--rd-terra)', color: 'var(--rd-terra)', padding: '7px 16px', borderRadius: 4, fontSize: 19, transform: 'rotate(4deg)', boxShadow: '0 12px 24px -12px color-mix(in srgb, var(--rd-ink) 45%, transparent)', '--r': '4deg' }}>{lang === 'de' ? 'Hier beginnt alles ✦' : 'It all starts here ✦'}</div>
          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <span className="r-it" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 15.5, color: 'var(--rd-ink-mute)' }}>
              <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="gift" size={16} /></span>
              {c.folder_gift}
            </span>
          </div>
          <Ch1Included x={CH1_TRUST[lang] || CH1_TRUST.de} />
        </div>
      </div>
      </div>
    </section>
  );
}

// ─── BOOK READER — walnut frame, 4 of 10 pages ───────────────
function Ch1Reader({ c, lang, onAdd, inCart }) {
  const [page, setPage] = useState(0); // 0..3 real pages, 4 = sealed teaser
  const sealed = page === CH1_PAGES.length;
  const canPrev = page > 0;
  const canNext = page < CH1_PAGES.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' && page < CH1_PAGES.length) setPage((p) => p + 1);
      if (e.key === 'ArrowLeft' && page > 0) setPage((p) => p - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page]);

  return (
    <section id="reader" data-rd data-screen-label="Leseprobe" style={{ padding: '140px 0 150px', background: 'radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in srgb, var(--rd-moss) 26%, transparent) 0%, transparent 60%), var(--rd-paper-soft)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={c.read_eyebrow} title={c.read_title} lede={c.read_lede} max={780} ledeMax={560} />

        <div className="ch1-reader r-rev" style={{ marginTop: 64 }}>
          {/* prev */}
          <button className="ch1-pgbtn ch1-prev" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={!canPrev} aria-label={c.read_prev} style={{ visibility: canPrev ? 'visible' : 'hidden' }}>
            <span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><RdIcon name="arrow" size={20} /></span>
          </button>

          {/* book plate */}
          <div className="rd-map-frame ch1-book" role="group" aria-label={c.read_title}>
            <div className="rd-map-frame-inner" style={{ position: 'relative', overflow: 'hidden' }}>
              {!sealed ? (
                <img key={page} src={CH1_PAGES[page]} alt={`${c.read_page} ${page + 1}`} className="ch1-page-img" />
              ) : (
                <div key="sealed" className="ch1-page-img ch1-sealed">
                  <RdFireflies intensity={5} count={10} />
                  <div className="ch1-sealed-inner" style={{ position: 'relative', zIndex: 2, maxWidth: 420, padding: '0 30px' }}>
                    <div style={{ width: 74, height: 74, margin: '0 auto', borderRadius: '50%', background: 'linear-gradient(160deg, var(--rd-terra), #8F4A28)', display: 'grid', placeItems: 'center', color: 'var(--rd-cream)', boxShadow: '0 16px 34px -14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                      <RdIcon name="book" size={30} />
                    </div>
                    <div className="r-caps" style={{ color: 'var(--rd-gold-soft)', marginTop: 26 }}>{c.sealed_caps}</div>
                    <h3 className="r-display" style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', color: 'var(--rd-cream)', marginTop: 14, textWrap: 'balance' }}>{c.sealed_t}</h3>
                    <p className="r-it" style={{ fontSize: 16.5, color: 'rgba(242,236,217,0.78)', marginTop: 14, lineHeight: 1.65 }}>{c.sealed_d}</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
                      {!inCart
                        ? <button className="rbtn rbtn-primary" onClick={onAdd}>{c.sealed_cta}</button>
                        : <a href="Checkout.html" className="rbtn rbtn-primary">{c.cta_checkout} <RdIcon name="arrow" size={16} /></a>}
                      <button className="rbtn rbtn-ghost-light" onClick={() => setPage(0)}>{c.sealed_back}</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* next */}
          <button className="ch1-pgbtn ch1-next" onClick={() => setPage((p) => Math.min(CH1_PAGES.length, p + 1))} disabled={!canNext} aria-label={c.read_next} style={{ visibility: canNext ? 'visible' : 'hidden' }}>
            <RdIcon name="arrow" size={20} />
          </button>
        </div>

        {/* caption + dots */}
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <p className="r-hand" style={{ fontSize: 23, color: 'var(--rd-walnut)', minHeight: 32 }}>
            {!sealed ? c.read_captions[page] : '✦'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 9, marginTop: 16 }}>
            {Array.from({ length: CH1_TOTAL }, (_, i) => {
              const openPage = i < CH1_PAGES.length;
              const active = i === page && !sealed;
              return openPage ? (
                <button key={i} onClick={() => setPage(i)} aria-label={`${c.read_page} ${i + 1}`} style={{ width: active ? 26 : 9, height: 9, borderRadius: 99, background: active ? 'var(--rd-gold)' : 'color-mix(in srgb, var(--rd-ink) 30%, transparent)', transition: 'width 0.35s var(--ease), background 0.3s' }}></button>
              ) : (
                <span key={i} aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, border: '1px solid color-mix(in srgb, var(--rd-ink) 32%, transparent)', background: sealed && i === CH1_PAGES.length ? 'var(--rd-terra)' : 'transparent' }}></span>
              );
            })}
          </div>
          <div className="r-caps" style={{ marginTop: 14, color: 'var(--rd-ink-mute)', letterSpacing: '0.24em' }}>
            {!sealed ? `${c.read_page} ${page + 1} ${c.read_of} ${CH1_TOTAL}` : `${c.read_page} 5–10 · ✦`}
          </div>
        </div>
      </div>

      <style>{`
        .ch1-reader { display: grid; grid-template-columns: 64px minmax(0, 620px) 64px; gap: 26px; justify-content: center; align-items: center; }
        .ch1-book { max-width: 620px; margin: 0; }
        .ch1-page-img { width: 100%; aspect-ratio: 1054 / 1492; object-fit: cover; border-radius: 2px; display: block; animation: ch1-turn 0.55s var(--ease); }
        html[data-anim="off"] .ch1-page-img { animation: none; }
        @media (prefers-reduced-motion: reduce) { .ch1-page-img { animation: none; } }
        @keyframes ch1-turn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
        .ch1-sealed { position: relative; display: grid; place-items: center; text-align: center; background: radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, var(--rd-gold) 20%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--rd-forest-deep), var(--rd-night)); }
        .ch1-pgbtn { width: 58px; height: 58px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--rd-ink) 24%, transparent); color: var(--rd-ink); display: grid; place-items: center; background: var(--rd-cream); box-shadow: 0 14px 28px -16px color-mix(in srgb, var(--rd-ink) 50%, transparent); transition: transform 0.3s var(--ease), background 0.3s, border-color 0.3s; }
        .ch1-pgbtn:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--rd-gold); color: var(--rd-gold); }
        @media (max-width: 720px) {
          .ch1-reader { grid-template-columns: 1fr 1fr; grid-template-areas: 'book book' 'prev next'; gap: 12px; row-gap: 20px; }
          .ch1-book { grid-area: book; max-width: 100%; }
          .ch1-prev { grid-area: prev; justify-self: start; }
          .ch1-next { grid-area: next; justify-self: end; }
          .ch1-pgbtn { width: 48px; height: 48px; }
          .ch1-sealed { aspect-ratio: auto !important; height: auto !important; min-height: 0 !important; padding: 46px 0 !important; }
          .ch1-sealed-inner { padding: 0 22px !important; }
          .ch1-sealed-inner h3 { font-size: 23px !important; }
          .ch1-sealed-inner .rbtn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { CH1_COPY, CH1_PAGES, CH1_TOTAL, Ch1Hero, Ch1Reader });
