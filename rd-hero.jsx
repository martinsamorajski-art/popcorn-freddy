// ────────────────────────────────────────────────────────────────
// Redesign — TopBar, Hero (2 directions), trust strip
// ────────────────────────────────────────────────────────────────

function RdTopBar({ t, lang, setLang, cartCount, onOpenCart, onStartAdventure }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => {
          const next = window.scrollY > 40;
          return next === prev ? prev : next;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div className="rd-announce">✦ {t.announce} ✦</div>
      <div style={{
        background: scrolled ? 'color-mix(in srgb, var(--rd-paper) 92%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)' : '1px solid transparent',
        transition: 'background 0.45s var(--ease), border-color 0.45s var(--ease)',
      }} className="rd-header-bg">
        <div className="rwrap-wide rd-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <a href="#top" aria-label="Popcorn & Freddy" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <RdLogo size={23} />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <div className="rd-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {[['#story', t.nav.story], ['#how', t.nav.how], ['#chapters', t.nav.chapters], ['#brand', t.nav.workshop], ['#faq', t.nav.faq], ['Kontakt.html', t.nav.contact]].map(([href, label], i) => (
                <a key={i} href={href} className="rd-nav-link">{label}</a>
              ))}
            </div>
            <button onClick={onOpenCart} aria-label="cart" className="rbtn rbtn-primary rd-cart-btn" style={{ position: 'relative', padding: '10px 18px', fontSize: 14, borderRadius: 9 }}>
              <RdIcon name="cart" size={16} />
              <span className="rd-cart-label">{t.nav.shop}</span>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--rd-terra)', color: 'var(--rd-cream)', borderRadius: '50%', width: 21, height: 21, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, fontFamily: 'var(--f-sans)' }}>{cartCount}</span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              aria-label="cart"
              className="rd-cart-btn-mobile"
              style={{
                position: 'relative', boxSizing: 'border-box',
                width: 42, height: 42, minWidth: 42, minHeight: 42, maxWidth: 42, maxHeight: 42,
                padding: 0, margin: 0, border: 'none', borderRadius: 9,
                background: 'var(--rd-primary)', color: 'var(--rd-on-primary)',
                display: 'none', alignItems: 'center', justifyContent: 'center', flex: '0 0 42px',
              }}
            >
              <RdIcon name="cart" size={18} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--rd-terra)', color: 'var(--rd-cream)', borderRadius: '50%', width: 18, height: 18, display: 'grid', placeItems: 'center', fontSize: 10.5, fontWeight: 800, fontFamily: 'var(--f-sans)', lineHeight: 1 }}>{cartCount}</span>
              )}
            </button>
            <RdMobileNav
              links={[['#story', t.nav.story], ['#how', t.nav.how], ['#chapters', t.nav.chapters], ['#brand', t.nav.workshop], ['#faq', t.nav.faq], ['Kontakt.html', t.nav.contact]]}
              ctaLabel={t.nav.mobile_cta} onCta={onStartAdventure}
              extra={<div style={{ padding: '4px 0 10px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)', marginTop: 6, paddingTop: 14 }}><RdLocaleControl lang={lang} setLang={setLang} /></div>}
            />
          </nav>
        </div>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .rd-cart-label { display: none; }
          .rd-cart-btn { display: none !important; }
          .rd-cart-btn-mobile { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

function RdLangSwitch({ lang, setLang }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--f-sans)', fontSize: 12.5, fontWeight: 800, letterSpacing: '0.12em' }}>
      {['de', 'en'].map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && <span style={{ color: 'var(--rd-ink-mute)', fontWeight: 400 }}>/</span>}
          <button onClick={() => setLang(l)} style={{
            textTransform: 'uppercase', padding: '4px 2px',
            color: lang === l ? 'var(--rd-ink)' : 'var(--rd-ink-mute)',
            borderBottom: lang === l ? '2px solid var(--rd-gold)' : '2px solid transparent',
            transition: 'color 0.25s, border-color 0.25s',
          }}>{l}</button>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function RdHero({ t, lang, direction = 'a', intensity = 5, onAdd }) {
  const h = t.heroImg;
  const title = (center) => (
    <h1 className="r-display r-rev r-rev-1" style={{ fontSize: 'clamp(38px, 4.9vw, 74px)', color: 'var(--rd-ink)', marginTop: 0, textWrap: 'balance' }}>
      {t.hero.title_a2}
      <span style={{ position: 'relative', display: 'inline-block', color: 'var(--rd-terra)' }}>
        {t.hero.title_a3}
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: -8, display: 'flex', justifyContent: center ? 'center' : 'flex-start' }}>
          <RdSquiggle width={170} />
        </span>
      </span>
      {t.hero.title_a4}
    </h1>
  );
  const ctas = (center) => (
    <div className="rh-ctas r-rev r-rev-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 20, justifyContent: center ? 'center' : 'flex-start', alignItems: 'center' }}>
      <a className="rbtn rbtn-primary rbtn-xl" href="/produkt/kapitel-1-fluesterwald">
        {h.cta_primary}
        <RdIcon name="arrow" size={17} />
      </a>
      <a className="rbtn rbtn-ghost" href="#chapters">{h.cta_secondary}</a>
    </div>
  );
  const facts = (center) => (
    <div className="rh-facts" style={{ justifyContent: center ? 'center' : 'flex-start' }}>{h.facts}</div>
  );
  const trust = (center) => (
    <RdTrustRow t={t} center={center} style={{ marginTop: 18 }} />
  );

  return (
    <section id="top" className="rh" data-screen-label="Hero" data-comment-anchor="hero-section">
      <RdLeaves intensity={intensity} />
      {direction === 'a' ? (
        <React.Fragment>
        <div className="rh-m">
          <div className="rh-m-media r-rev r-rev-1">
            <img src="assets/hero-family-crop.jpg" alt="Familie liest gemeinsam am Tisch — mit Kapitel-1-Box, Schatzmappe und Holzauto-Bausatz" fetchpriority="high" decoding="async" />
            <div className="rh-m-overlay">
              {title(true)}
            </div>
            <div className="rh-m-overlay-b">
              <p className="r-serif rh-m-sub">{h.sub}</p>
            </div>
          </div>
          <div className="rwrap">
            <div className="rh-m-mini r-rev r-rev-3">
              {(h.mini || []).map((m, i) => (
                <div key={i} className="rh-m-mini-item">
                  <RdIcon name={m.icon} size={20} />
                  <span>{m.t}</span>
                </div>
              ))}
            </div>
            {ctas(true)}
            {facts(true)}
            {trust(true)}
          </div>
        </div>
        <div className="rwrap rh-split">
          <div className="rh-split-copy">
            <div className="r-rev r-rev-1">
              {title(false)}
              <p className="r-serif rh-poster-sub">{h.sub}</p>
            </div>
            <div className="r-rev r-rev-2">{facts(false)}{ctas(false)}{trust(false)}</div>
            <div className="rh-mini-desk r-rev r-rev-3">
              {(h.mini || []).map((m, i) => (
                <div key={i} className="rh-mini-desk-item">
                  <RdIcon name={m.icon} size={22} />
                  <span>{m.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rh-split-media r-rev r-rev-2">
            <div className="rh-fam-frame">
              <img src="assets/hero-family.jpg" alt="Familie liest gemeinsam am Tisch — mit Kapitel-1-Box, Schatzmappe und Holzauto-Bausatz" fetchpriority="high" decoding="async" />
            </div>
            <p className="r-it rh-fam-cap">Kapitel 1 — Das Geheimnis des Flüsterwaldes</p>
          </div>
        </div>
        </React.Fragment>
      ) : (
        <div className="rh-b">
          <div className="rwrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ maxWidth: 900 }}>{title(true)}</div>
            <p className="r-serif r-rev r-rev-2" style={{ fontSize: 'clamp(17.5px, 1.45vw, 21px)', color: 'var(--rd-ink-soft)', lineHeight: 1.62, marginTop: 24, maxWidth: 620, textWrap: 'pretty' }}>{h.sub}</p>
            {facts(true)}
            {ctas(true)}
            {trust(true)}
            <div className="r-rev r-rev-4" style={{ marginTop: 22 }}>
              <RdCraftNote lang={lang} k="batch" center />
            </div>
          </div>
          <div className="rwrap-wide">
            <figure className="rh-b-plate r-rev r-rev-3" style={{ marginInline: 'auto' }}>
              <img src="assets/scene-table.jpg" alt="Ein Kind baut mit Popcorn und Freddy ein Holzauto" loading="lazy" decoding="async" />
              <figcaption className="rh-b-caps">
                {h.cards.map((c, i) => (
                  <div key={i} className="rh-b-cap">
                    <span className="rh-feat-ico" style={{ width: 40, height: 40 }}><RdIcon name={c.icon} size={17} /></span>
                    <span>
                      <span style={{ display: 'block', fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)', lineHeight: 1.25 }}>{c.t}</span>
                      <span className="r-it" style={{ display: 'block', fontSize: 14.5, color: 'var(--rd-ink-mute)', marginTop: 2 }}>{c.d}</span>
                    </span>
                  </div>
                ))}
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { RdTopBar, RdLangSwitch, RdHero });
