// ────────────────────────────────────────────────────────────────
// Redesign — Story, How, Map (static plate), Inside, Chapters
// ────────────────────────────────────────────────────────────────

// ─── STORY — vintage book plates ─────────────────────────────
function RdStory({ t, intensity }) {
  const chars = [
    { name: t.story.pop_name, role: t.story.pop_role, text: t.story.pop_desc, img: 'assets/char-popcorn.png' },
    { name: t.story.fred_name, role: t.story.fred_role, text: t.story.fred_desc, img: 'assets/char-freddy.png' },
    { name: t.story.peter_name, role: t.story.peter_role, text: t.story.peter_desc, img: 'assets/char-child.png' },
  ];
  return (
    <section id="story" data-rd data-screen-label="Story / Charaktere" style={{ padding: '96px 0 100px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <RdLeaves intensity={intensity} />
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={t.story.eyebrow} title={t.story.title} lede={t.story.body} max={880} ledeMax={720} />
        <div style={{ marginTop: 26 }} className="r-rev"><RdOrnament /></div>

        <div style={{ marginTop: 64 }} className="r-rev">
          <RdCarousel trackClass="rd-car-track--chars" ariaLabel={t.story.eyebrow}>
            {chars.map((c, i) => (
              <figure key={i} className="rd-char" style={{ margin: 0 }}>
                <div className="rd-char-oval">
                  <div className="rd-char-frame" aria-hidden="true"></div>
                  <img src={c.img} alt={c.name} />
                </div>
                <h3 className="r-display" style={{ fontSize: 30, color: 'var(--rd-ink)', marginTop: 26 }}>{c.name}</h3>
                <div className="r-caps" style={{ marginTop: 9, color: 'var(--rd-terra)', letterSpacing: '0.24em' }}>{c.role}</div>
                <p className="r-serif" style={{ fontSize: 16.5, marginTop: 14, color: 'var(--rd-ink-soft)', lineHeight: 1.62, maxWidth: 320, marginInline: 'auto', textWrap: 'pretty' }}>{c.text}</p>
              </figure>
            ))}
          </RdCarousel>
        </div>
      </div>
    </section>
  );
}

// ─── HOW — journal steps ─────────────────────────────────────
function RdHow({ t }) {
  return (
    <section id="how" data-rd data-screen-label="So funktioniert's" style={{ padding: '96px 0 100px', background: 'var(--rd-paper-soft)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)', borderBottom: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 44, right: 48, opacity: 0.1, color: 'var(--rd-walnut)' }}>
        <RdCompass size={150} />
      </div>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="r-rev" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 22px' }}>
          <span className="r-caps r-caps-rule">{t.how.eyebrow}</span>
          <h2 className="r-display" style={{ fontSize: 'clamp(36px, 4.4vw, 58px)', marginTop: 24, color: 'var(--rd-ink)', textWrap: 'balance' }}>{t.how.title}</h2>
          <div className="r-hand" style={{ fontSize: 'clamp(22px, 2vw, 30px)', color: 'var(--rd-terra)', marginTop: 16 }}>{t.how.tagline}</div>
          <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.3vw, 20px)', color: 'var(--rd-ink-soft)', marginTop: 16, lineHeight: 1.65, maxWidth: 620, margin: '16px auto 0', textWrap: 'pretty' }}>{t.how.sub}</p>
        </div>

        <div className="r-rev" style={{ marginTop: 56, position: 'relative' }}>
          <RdPeekCarousel ariaLabel={t.how.title}>
            {t.how.steps.map((s, i) => (
              <div key={i} className="rd-how-card">
                <div className="rd-how-card-top">
                  <span className="rd-how-ic"><RdIcon name={s.icon} size={26} /></span>
                  <span className="r-display rd-how-n">{s.n}</span>
                </div>
                <h3 className="r-serif" style={{ fontSize: 23, fontWeight: 600, color: 'var(--rd-ink)', lineHeight: 1.25 }}>{s.t}</h3>
                <p style={{ fontSize: 16, color: 'var(--rd-ink-soft)', marginTop: 11, lineHeight: 1.62, textWrap: 'pretty' }}>{s.d}</p>
              </div>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
    </section>
  );
}

// ─── MAP — museum artifact ───────────────────────────────────
function RdMap({ t, lang }) {
  return (
    <section id="map" data-rd data-screen-label="Schatzkarte" style={{ padding: '150px 0 150px', background: 'radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in srgb, var(--rd-moss) 26%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--rd-forest-deep), var(--rd-night))', color: 'var(--rd-cream)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 56, left: 56, opacity: 0.14, color: 'var(--rd-gold-soft)' }}>
        <RdCompass size={120} />
      </div>
      <div className="rwrap-wide" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading dark eyebrow={t.map.eyebrow} title={t.map.title} lede={t.map.sub} max={840} ledeMax={680} />

        <div className="r-rev r-rev-1" style={{ marginTop: 70, textAlign: 'center' }}>
          <div className="rd-map-frame">
            <div className="rd-map-frame-inner">
              <img src="assets/adventure-map.png" alt="Popcorn & Freddys Schatzkarte mit acht Kapiteln" />
            </div>
          </div>
          <div className="rd-plaque">
            <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 12.5, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{t.map.title}</span>
            <span className="r-it" style={{ fontSize: 13.5, opacity: 0.85 }}>{lang === 'de' ? '8 Kapitel · 1 Schatz' : '8 chapters · 1 treasure'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INSIDE — editorial inventory ────────────────────────────
function RdInside({ t, lang }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const spots = [
    { x: 22, y: 33 }, { x: 51.5, y: 26.5 }, { x: 79, y: 33.5 }, { x: 45, y: 70 },
    { x: 42, y: 89.5 }, { x: 52.5, y: 52 }, { x: 88.5, y: 84.5 },
  ];
  const goTo = (i) => {
    setActive(i);
    const el = trackRef.current; if (!el || !el.children[0]) return;
    const w = el.children[0].getBoundingClientRect().width + 18;
    el.scrollTo({ left: i * w, behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = trackRef.current; if (!el || !el.children[0]) return;
    const w = el.children[0].getBoundingClientRect().width + 18;
    const i = Math.max(0, Math.min(spots.length - 1, Math.round(el.scrollLeft / w)));
    setActive(i);
  };
  return (
    <section id="inside" data-rd data-screen-label="Die Box" style={{ padding: '96px 0 100px', background: 'var(--rd-paper)' }} className="rd-inside-section">
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={t.inside.eyebrow} title={t.inside.title} lede={t.inside.body} max={860} ledeMax={720} />

        <div className="r-rev rd-inside-stage">
          <div className="rd-inside-frame">
            <img src="assets/box-contents.png" alt="Inhalt der Box" />
            <span className="rd-corner rd-corner--tl" aria-hidden="true"></span>
            <span className="rd-corner rd-corner--tr" aria-hidden="true"></span>
            <span className="rd-corner rd-corner--bl" aria-hidden="true"></span>
            <span className="rd-corner rd-corner--br" aria-hidden="true"></span>
            {spots.map((s, i) => (
              <button key={i} type="button" className={'rd-hot' + (i === active ? ' on' : '')} style={{ left: s.x + '%', top: s.y + '%' }} onClick={() => goTo(i)} aria-label={t.inside.items[i].t}>{i + 1}</button>
            ))}
          </div>
          <div className="r-hand rd-inside-note" aria-hidden="true">{t.inside.sub}</div>
        </div>

        <div className="r-rev" style={{ marginTop: 30, position: 'relative' }}>
          <div className="rd-inside-track" ref={trackRef} onScroll={onScroll}>
            {t.inside.items.map((it, i) => (
              <div key={i} className={'rd-inside-card' + (i === active ? ' on' : '')} onClick={() => goTo(i)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') goTo(i); }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span className="rd-inside-num">{i + 1}</span>
                  <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name={it.icon || 'star'} size={22} /></span>
                </div>
                <h4 className="r-serif" style={{ fontSize: 19.5, fontWeight: 600, color: 'var(--rd-ink)', lineHeight: 1.25 }}>{it.t}</h4>
                <p style={{ fontSize: 14.5, color: 'var(--rd-ink-soft)', marginTop: 8, lineHeight: 1.6, textWrap: 'pretty' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <button type="button" className="rd-deck-arrow rd-peek-prev" onClick={() => goTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Previous"><span style={{ transform: 'scaleX(-1)', display: 'inline-flex' }}><RdIcon name="arrow" size={18} /></span></button>
          <button type="button" className="rd-deck-arrow rd-peek-next" onClick={() => goTo(Math.min(t.inside.items.length - 1, active + 1))} disabled={active === t.inside.items.length - 1} aria-label="Next"><RdIcon name="arrow" size={18} /></button>
        </div>

        <div className="r-rev" style={{ marginTop: 26 }}>
          <RdCraftNote lang={lang} k="each" center />
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTERS ────────────────────────────────────────────────
// ─── WHY — reasons carousel, photo cards with overlay text ───
function RdWhy({ t }) {
  const imgs = ['assets/why-1-time.png', 'assets/why-2-learning.png', 'assets/why-3-hero.png', 'assets/why-4-journey.png'];
  return (
    <section id="why" data-rd data-screen-label="Warum" style={{ padding: '96px 0 100px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={t.why.eyebrow} title={t.why.title} lede={t.why.sub} max={860} ledeMax={680} />
        <div style={{ marginTop: 26 }} className="r-rev"><RdOrnament /></div>
        <div className="r-rev" style={{ marginTop: 44, position: 'relative' }}>
          <RdPeekCarousel ariaLabel={t.why.title}>
            {t.why.items.map((it, i) => (
              <div key={i} className="rd-why-card">
                {imgs[i]
                  ? <img className="rd-why-img" src={imgs[i]} alt={it.t} />
                  : <image-slot id={'why-' + (i + 1)} class="rd-why-img" shape="rect" placeholder={it.t}></image-slot>}
                <div className="rd-why-shade" aria-hidden="true"></div>
                <div className="rd-why-body">
                  <span className="r-caps rd-why-n">{'0' + (i + 1)}</span>
                  <h3 className="r-display">{it.t}</h3>
                  <div className="r-hand">{it.tag}</div>
                  <p>{it.d}</p>
                </div>
              </div>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
    </section>
  );
}

// Every chapter comes from Shopify: the "kapitel" collection (manual order),
// or the "kapitel" tag as fallback. Adding a product there is all it takes —
// no code change, no hardcoded image, price, title or stock anywhere.
function RdChapters({ t, lang, onAdd, all }) {
  const { list, loading } = usePFChapters(lang);
  const buyable = (p) => p.available !== false && p.quantityAvailable !== 0;
  return (
    <section id="chapters" data-rd data-screen-label="Kapitel" style={{ padding: '96px 0 100px', background: 'var(--rd-paper-soft)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 44, right: 40, color: 'var(--rd-walnut)', zIndex: 1 }}><RdTrail width={200} /></div>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        {all && <div className="r-rev" style={{ textAlign: 'center', marginBottom: 8 }}><a className="rd-crumb" style={{ margin: '0 auto 20px' }} href="index.html">← {t.chapters.back}</a></div>}
        <div style={{ marginBottom: 56 }}>
          <RdHeading eyebrow={t.chapters.eyebrow} title={t.chapters.title} lede={t.chapters.sub} max={800} ledeMax={620} />
        </div>

        {loading ? (
          <div className={all ? 'rd-chap-grid' : 'rd-chap-grid'}>
            {[0, 1, 2].map((i) => <RdChapterSkeleton key={i} />)}
          </div>
        ) : list.length === 0 ? (
          <div className="r-rev" style={{ textAlign: 'center', padding: '40px 0', fontFamily: 'var(--f-sans)', fontSize: 16, color: 'var(--rd-ink-mute)' }}>
            {lang === 'de' ? 'Die Kapitel werden gerade vorbereitet — schaut gleich noch einmal vorbei.' : 'The chapters are being prepared — please check back shortly.'}
          </div>
        ) : all ? (
          <div className="rd-chap-grid">
            {list.map((p) => buyable(p)
              ? <RdMainChapter key={p.handle} p={p} t={t} lang={lang} onAdd={onAdd} showDesc />
              : <RdUpcomingChapter key={p.handle} p={p} t={t} lang={lang} showDesc />)}
          </div>
        ) : (
          <RdPeekCarousel ariaLabel={t.chapters.title}>
            {list.map((p) => buyable(p)
              ? <RdMainChapter key={p.handle} p={p} t={t} lang={lang} onAdd={onAdd} />
              : <RdUpcomingChapter key={p.handle} p={p} t={t} lang={lang} />)}
            <RdBoxCard t={t} lang={lang} cover={list[0] && list[0].images && list[0].images[0] ? list[0].images[0].src : null} />
          </RdPeekCarousel>
        )}

        {/* includes — only on the full chapters page */}
        {all && <div className="r-rev" style={{ marginTop: 64, padding: '30px 36px', border: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', borderRadius: 10, background: 'var(--rd-cream)' }}>
          <div className="r-it" style={{ fontSize: 22, color: 'var(--rd-ink)', fontWeight: 600, marginBottom: 16 }}>{t.chapters.includes}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '13px 34px' }}>
            {t.chapters.bullets.map((b, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 16.5, color: 'var(--rd-ink-soft)' }}>
                <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="check" size={16} /></span>
                {b}
              </div>
            ))}
          </div>
        </div>}
      </div>
    </section>
  );
}

// Card-shaped placeholder while Shopify answers — same frame, no fake product.
function RdChapterSkeleton() {
  return (
    <div className="rd-chap" aria-hidden="true">
      <div className="rd-skel" style={{ width: '100%', aspectRatio: '4/5', borderRadius: 8 }} />
      <div style={{ padding: '22px 10px 10px', display: 'grid', gap: 10 }}>
        <div className="rd-skel" style={{ width: '42%', height: 12, borderRadius: 4 }} />
        <div className="rd-skel" style={{ width: '72%', height: 22, borderRadius: 5 }} />
        <div className="rd-skel" style={{ width: '56%', height: 12, borderRadius: 4 }} />
        <div className="rd-skel" style={{ width: '100%', height: 46, borderRadius: 8, marginTop: 12 }} />
      </div>
    </div>
  );
}

// "Box" card — looks like the physical box with its cover page as lid; links to all chapters.
function RdBoxCard({ t, lang, cover }) {
  const c = t.chapters;
  return (
    <a className="rd-chap rd-chap-box r-rev" href="Alle Kapitel.html">
      <div className="rd-box-scene" aria-hidden="true">
        <div className="rd-box-base"></div>
        <div className="rd-box-lid">
          {cover ? <img src={cover} alt="" /> : <span className="rd-skel" style={{ position: 'absolute', inset: 0 }} />}
          <div className="rd-box-lid-label">
            <span className="r-caps" style={{ color: 'var(--rd-walnut)', letterSpacing: '0.18em' }}>Popcorn &amp; Freddy</span>
            <span className="r-display" style={{ fontSize: 16, color: 'var(--rd-ink)' }}>№ 01–08</span>
          </div>
        </div>
        <span className="rd-box-spark" style={{ top: '4%', left: '8%' }}>✦</span>
        <span className="rd-box-spark" style={{ top: '12%', left: '88%', animationDelay: '0.8s' }}>✦</span>
        <span className="rd-box-spark" style={{ top: '78%', left: '4%', animationDelay: '1.5s' }}>✦</span>
      </div>
      <div style={{ padding: '22px 10px 10px' }}>
        <h3 className="r-display" style={{ fontSize: 25, color: 'var(--rd-ink)' }}>{c.box_title}</h3>
        <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 8, lineHeight: 1.6, textWrap: 'pretty' }}>{c.box_sub}</p>
        <span className="rd-box-cta">{c.box_cta} →</span>
      </div>
    </a>
  );
}

// Corner number badge shared by chapter cards
function RdChapNo({ n }) {
  return <div className="rd-chap-no">№ {String(n).padStart(2, '0')}</div>;
}

// Main (purchasable) chapter card — every value below comes from Shopify.
function RdMainChapter({ p, t, lang, onAdd, showDesc }) {
  const link = '/produkt/' + p.handle;
  const image = p.images && p.images[0] ? p.images[0] : null;
  const stock = p.quantityAvailable != null ? p.quantityAvailable : null;
  const soldOut = p.available === false || stock === 0;
  const lowStock = !soldOut && stock != null && stock > 0 && stock <= 10;
  const availLabel = soldOut
    ? (lang === 'de' ? 'Ausverkauft' : 'Sold out')
    : lowStock
      ? (lang === 'de' ? `Nur noch ${stock} verfügbar` : `Only ${stock} left`)
      : t.chapters.available;
  // The basket line is a reference to this exact Shopify product.
  const add = () => onAdd({ handle: p.handle, variantId: p.variantId, max: stock });
  return (
    <div className="rd-chap r-rev">
      {p.badge && <div className="rd-stamp">{p.badge}</div>}
      <a href={link} style={{ display: 'block', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
        {image
          ? <img src={image.src} alt={image.alt || p.title} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
          : <div className="rd-skel" style={{ width: '100%', aspectRatio: '4/5' }} />}
        {p.chapterNo != null && <RdChapNo n={p.chapterNo} />}
      </a>
      <div className="rd-chap-body" style={{ padding: '22px 10px 10px' }}>
        <div className="rd-chap-avail"><span className="rd-chap-dot" aria-hidden="true" style={soldOut ? { background: 'var(--rd-ink-mute)' } : undefined}></span>{availLabel}</div>
        <a href={link} style={{ textDecoration: 'none' }}><h3 className="r-display" style={{ fontSize: 27, color: 'var(--rd-ink)', marginTop: 8 }}>{p.title}</h3></a>
        {p.toy && <div className="r-caps" style={{ marginTop: 9, color: 'var(--rd-ink-mute)', letterSpacing: '0.2em' }}>+ {p.toy} {t.chapters.extras}</div>}
        {showDesc && p.teaser && <p style={{ fontSize: 15, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.6, textWrap: 'pretty' }}>{p.teaser}</p>}

        <div className="rd-chap-buy" style={{ paddingTop: 18, borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <div className="r-display r-price" style={{ fontSize: 29, color: 'var(--rd-ink)' }}>{p.priceFormatted}</div>
            <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
              {['PayPal', 'Klarna', lang === 'de' ? 'Kreditkarte' : 'Credit card'].map((n, i) => <span key={i} className="rd-pay-chip">{n}</span>)}
            </span>
          </div>
          {soldOut
            ? <button className="rbtn" disabled style={{ marginTop: 14, padding: '14px 20px', fontSize: 13.5, width: '100%', justifyContent: 'center', opacity: 0.55, cursor: 'not-allowed' }}>{lang === 'de' ? 'Ausverkauft' : 'Sold out'}</button>
            : <button className="rbtn rbtn-primary" style={{ marginTop: 14, padding: '14px 20px', fontSize: 13.5, width: '100%', justifyContent: 'center' }} onClick={add}>+ {t.chapters.cta}</button>}
        </div>
      </div>
    </div>
  );
}

// Not (yet) purchasable — an unavailable Shopify product. Release month comes
// from the product's custom.release_label metafield.
function RdUpcomingChapter({ p, t, lang, showDesc }) {
  const image = p.images && p.images[0] ? p.images[0] : null;
  const soon = lang === 'de' ? 'Erscheint' : 'Arrives';
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  return (
    <div className="rd-chap rd-chap-soon r-rev">
      <div style={{ borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
        {image ? (
          <img src={image.src} alt={image.alt || p.title} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
        ) : (
          <div className="rd-chap-ph" role="img" aria-label={p.title}>
            {p.chapterNo != null && <span className="rd-chap-ph-no">№ {String(p.chapterNo).padStart(2, '0')}</span>}
            <span className="rd-chap-ph-cap">cover · {p.title}</span>
          </div>
        )}
        {p.chapterNo != null && <RdChapNo n={p.chapterNo} />}
      </div>
      <div className="rd-chap-body" style={{ padding: '22px 10px 10px' }}>
        <div className="rd-chap-avail is-soon"><span className="rd-chap-dot rd-dot-soon" aria-hidden="true"></span>{p.releaseLabel ? `${soon} · ${p.releaseLabel}` : (lang === 'de' ? 'Bald verfügbar' : 'Coming soon')}</div>
        <h3 className="r-display" style={{ fontSize: 27, color: 'var(--rd-ink)', marginTop: 8 }}>{p.title}</h3>
        {p.toy && <div className="r-caps" style={{ marginTop: 9, color: 'var(--rd-ink-mute)', letterSpacing: '0.2em' }}>+ {p.toy}</div>}
        {showDesc && p.teaser && <p style={{ fontSize: 15, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.6, textWrap: 'pretty' }}>{p.teaser}</p>}
        <div className="rd-chap-buy" style={{ paddingTop: 18, borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent)' }}>
          {ok ? (
            <div className="r-it" style={{ fontSize: 15.5, color: 'var(--rd-forest)', padding: '12px 0', textAlign: 'center' }}>{t.chapters.notify_ok}</div>
          ) : open ? (
            <form className="rd-notify-form" onSubmit={(e) => { e.preventDefault(); setOk(true); }}>
              <input type="email" required className="rd-notify-input" placeholder={t.chapters.notify_ph} aria-label={t.chapters.notify_ph} />
              <button type="submit" className="rbtn rbtn-primary" style={{ padding: '12px 16px', fontSize: 13 }}>→</button>
            </form>
          ) : (
            <button className="rbtn rbtn-ghost" style={{ padding: '14px 20px', fontSize: 13.5, width: '100%', justifyContent: 'center' }} onClick={() => setOpen(true)}>{t.chapters.notify}</button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RdChapterSkeleton, RdStory, RdHow, RdMap, RdInside, RdWhy, RdChapters, RdMainChapter, RdUpcomingChapter, RdBoxCard });
