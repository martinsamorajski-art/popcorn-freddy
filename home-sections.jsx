// ────────────────────────────────────────────────────────────────
// Home (cinematic) — TopBar, Hero (+variants), Marquee, Story, How
// Bilingual via the `t` copy object + `lang`. Mirrors the visual
// language of "Der Flüsterwald v2" (dusk forest, parchment, lantern).
// ────────────────────────────────────────────────────────────────

// ─── TOP BAR ─────────────────────────────────────────────────
function HomeTopBar({ t, lang, setLang, cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      {/* announce strip */}
      <div className="home-announce" style={{
        background: 'var(--night)', color: 'var(--lantern)', textAlign: 'center',
        padding: '8px 14px', fontFamily: 'var(--font-body)', fontWeight: 600,
        fontSize: 12.5, letterSpacing: '0.12em',
        borderBottom: '1px solid rgba(244,182,107,0.12)'
      }}>
        ✦ {t.announce} ✦
      </div>

      {/* nav row */}
      <div style={{
        background: scrolled ? 'rgba(20,24,16,0.78)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(242,233,217,0.08)' : '1px solid transparent',
        transition: 'background 0.5s var(--ease-out), border-color 0.5s var(--ease-out), backdrop-filter 0.5s var(--ease-out)'
      }}>
        <div className="wrap home-topbar-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', gap: 18 }}>
          <a href="#top" aria-label="Popcorn in Box" className="home-logo" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <img src="assets/logo-wordmark.png" alt="Popcorn in Box" style={{ height: 46, width: 'auto', flexShrink: 0, filter: 'invert(1) brightness(0.97)' }} />
          </a>
          <nav className="home-topnav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div className="top-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {[['#story', t.nav.story], ['#chapters', t.nav.chapters], ['#inside', t.nav.folder], ['#folder', t.nav.family], ['#faq', t.nav.faq]].map(([href, label], i) =>
              <a key={i} href={href} className="nav-link" style={{ color: 'rgba(242,233,217,0.82)', textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.5)' }}>{label}</a>
              )}
            </div>
            <HomeLangSwitch lang={lang} setLang={setLang} />
            <button onClick={onOpenCart} aria-label="cart" style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '11px 20px', background: 'var(--rust)', color: 'var(--paper)',
              borderRadius: 999, fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', flex: '0 0 auto',
              boxShadow: '0 12px 26px -12px rgba(178,94,42,0.7)'
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h2l3 12h10l3-9H6" /><circle cx="9" cy="20" r="1.5" /><circle cx="17" cy="20" r="1.5" /></svg>
              <span className="cart-label">{t.nav.shop}</span>
              {cartCount > 0 &&
              <span style={{ position: 'absolute', top: -7, right: -7, background: 'var(--lantern)', color: 'var(--ink)', borderRadius: '50%', width: 21, height: 21, display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, border: '1.5px solid var(--night)' }}>{cartCount}</span>
              }
            </button>
          </nav>
        </div>
      </div>
    </header>);

}

function HomeLangSwitch({ lang, setLang }) {
  return (
    <div className="lang-switch" style={{ display: 'inline-flex', alignItems: 'center', gap: 2, padding: 3, borderRadius: 999, border: '1px solid rgba(242,233,217,0.3)' }}>
      {['de', 'en'].map((l) =>
      <button key={l} onClick={() => setLang(l)} style={{
        padding: '5px 12px', borderRadius: 999,
        background: lang === l ? 'var(--lantern)' : 'transparent',
        color: lang === l ? 'var(--ink)' : 'rgba(242,233,217,0.8)',
        fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em',
        transition: 'all 0.3s var(--ease-out)'
      }}>{l}</button>
      )}
    </div>);

}

// ─── HERO ────────────────────────────────────────────────────
function HomeHero({ t, lang, variant = 'a', treeMotion = 'statisch', onAdd }) {
  const scrollY = useScrollY();
  const mediaRef = useRef(null);
  useEffect(() => {
    if (!mediaRef.current) return;
    mediaRef.current.style.transform = `translateY(${Math.min(scrollY * 0.10, 70)}px)`;
  }, [scrollY]);

  const accent = (txt) => <span className="serif-it" style={{ color: 'var(--lantern)' }}>{txt}</span>;
  const h = t.heroImg;
  const Icon = ({ name, size = 20 }) => {
    const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round', strokeLinejoin: 'round' };
    const paths = {
      user: <React.Fragment><circle cx="12" cy="8" r="3.6" /><path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" /></React.Fragment>,
      build: <React.Fragment><path d="M13.5 4.5 19.5 10.5 17 13l-6-6 2.5-2.5Z" /><path d="m11 7-7.5 7.5L6 17l7.5-7.5" /></React.Fragment>,
      heart: <path d="M12 20.5S4 16 4 9.8A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8c0 6.2-8 10.7-8 10.7Z" />,
      truck: <React.Fragment><rect x="2.5" y="6.5" width="11" height="9" rx="1" /><path d="M13.5 9.5h3.8l3.2 3.2v2.8h-7z" /><circle cx="6.5" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></React.Fragment>,
      shield: <React.Fragment><path d="M12 2.8 5 5.6v5.2c0 4 2.9 6.9 7 8 4.1-1.1 7-4 7-8V5.6L12 2.8Z" /><path d="m9 11.5 2.2 2.2 4-4.2" /></React.Fragment>,
      gift: <React.Fragment><rect x="3.5" y="11" width="17" height="9.5" rx="1" /><path d="M2 7.5h20V11H2z" /><path d="M12 7.5v13" /><path d="M12 7.5C12 7.5 10.8 3.5 8.4 3.9 6.6 4.2 6.8 7 9 7.5h3Z" /><path d="M12 7.5c0 0 1.2-4 3.6-3.6 1.8.3 1.6 3.1-.6 3.6h-3Z" /></React.Fragment>,
    };
    return <svg {...common} aria-hidden>{paths[name]}</svg>;
  };

  return (
    <section id="top" className="ih">
      <div className="ih-bg ih-bg-desktop" />
      <div className="ih-bg ih-bg-mobile" />
      <div className="ih-scrim" />
      <FloatingEmbers count={12} />

      <div className="ih-inner">
        <div className="wrap" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="ih-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11, padding: '7px 18px 7px 8px', borderRadius: 999, background: 'rgba(22,17,11,0.6)', border: '1px solid rgba(244,182,107,0.32)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', marginBottom: 26 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--rust)', display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px -4px rgba(178,94,42,0.85)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--paper)" aria-hidden><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2Z" /></svg>
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--paper)', fontWeight: 700, letterSpacing: '0.01em' }}>{h.badge}</span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(38px, 5.4vw, 72px)', lineHeight: 1.12, letterSpacing: '-0.018em', color: 'var(--paper)', margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.45)' }}>
              {t.hero.title_a2}{accent(t.hero.title_a3)}{t.hero.title_a4}
            </h1>

            <p className="serif" style={{ fontSize: 'clamp(17px, 1.5vw, 21px)', color: 'rgba(242,233,217,0.92)', lineHeight: 1.6, marginTop: 22, maxWidth: 520, textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}>{h.sub}</p>

            <div className="ih-cards">
              {h.cards.map((c, i) =>
              <div key={i} className="ih-card">
                  <span className="ih-card-ico"><Icon name={c.icon} /></span>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13.5px,1.05vw,15.5px)', fontWeight: 800, color: 'var(--paper)', lineHeight: 1.22, margin: 0 }}>{c.t}</h3>
                  <p style={{ fontSize: 12.5, color: 'rgba(242,233,217,0.72)', lineHeight: 1.42, marginTop: 7 }}>{c.d}</p>
                </div>
              )}
            </div>

            <div className="ih-ctas">
              <button className="btn btn-primary btn-xl" onClick={onAdd}>
                {h.cta_primary}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
              <a className="btn btn-ghost-light btn-xl" href="#chapters">{h.cta_secondary}</a>
            </div>
          </div>
        </div>
      </div>

      {/* below-hero trust strip */}
      <div className="ih-below">
        <div className="ih-below-track">
          {[0, 1].map((set) =>
          <div key={set} className={'ih-below-set' + (set === 1 ? ' ih-below-dup' : '')} aria-hidden={set === 1 ? 'true' : undefined}>
              {h.below.map((b, i) =>
              <div key={i} className="ih-below-item">
                  <span className="ih-below-ico"><Icon name={b.icon} size={26} /></span>
                  <span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 13.5, color: 'var(--paper)', lineHeight: 1.2 }}>{b.t}</span>
                    <span style={{ display: 'block', fontSize: 12, color: 'rgba(242,233,217,0.7)', marginTop: 2 }}>{b.d}</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── MARQUEE (running tape under hero) ───────────────────────
function HomeMarquee({ items, speed = 42 }) {
  const track = [...items, ...items, ...items];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(33,28,24,0.12)', borderBottom: '1px solid rgba(33,28,24,0.12)', background: 'var(--paper-warm)', padding: '18px 0' }}>
      <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: `marquee ${speed}s linear infinite`, width: 'max-content' }}>
        {track.map((it, i) =>
        <span key={i} className="serif-it" style={{ fontSize: 26, color: 'var(--ink-soft)', display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            {it}
            <span style={{ display: 'inline-block', width: 7, height: 7, background: 'var(--rust)', borderRadius: '50%', opacity: 0.7 }} />
          </span>
        )}
      </div>
    </div>);

}

// ─── STORY ───────────────────────────────────────────────────
function HomeStory({ t, lang }) {
  const chars = [
  { name: t.story.pop_name, role: t.story.pop_role, text: t.story.pop_desc, img: 'assets/char-popcorn.png' },
  { name: t.story.fred_name, role: t.story.fred_role, text: t.story.fred_desc, img: 'assets/char-freddy.png' },
  { name: t.story.peter_name, role: t.story.peter_role, text: t.story.peter_desc, img: 'assets/char-child.png' }];

  return (
    <section id="story" style={{
      position: 'relative', overflow: 'hidden', padding: '160px 0 170px',
      background: 'radial-gradient(ellipse at 50% -10%, rgba(244,215,170,0.45) 0%, transparent 45%), linear-gradient(180deg, var(--paper-warm) 0%, var(--paper) 60%, var(--paper-warm) 100%)'
    }}>
      <LightLeak corner="top-left" color="rgba(244, 182, 107, 0.22)" size={680} />
      <FallingLeaves count={5} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 70px' }}>
          <span className="eyebrow eyebrow-rule">{t.story.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', marginTop: 26, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{t.story.title}</h2>
          <p className="serif" style={{ color: 'var(--ink-soft)', fontSize: 'clamp(18px,1.4vw,21px)', lineHeight: 1.75, maxWidth: 760, margin: '26px auto 0' }}>{t.story.body}</p>
        </div>

        <div className="story-chars" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 20 }}>
          {chars.map((c, i) =>
          <figure key={i} className={`reveal reveal-delay-${i + 1}`} style={{
            margin: 0, padding: 16, textAlign: 'center',
            background: 'var(--cream)', borderRadius: 18,
            border: '1px solid rgba(33,28,24,0.07)',
            boxShadow: '0 30px 60px -32px rgba(33,28,24,0.28)'
          }}>
              <div style={{ width: '86%', maxWidth: 260, margin: '0 auto', aspectRatio: '1 / 1', borderRadius: '50%', overflow: 'hidden', display: 'grid', placeItems: 'center', background: c.img ? 'transparent' : 'var(--paper-deep)', boxShadow: '0 18px 40px -20px rgba(33,28,24,0.4)' }}>
                {c.img ?
              <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> :
              <div style={{ display: 'grid', placeItems: 'center', transform: 'scale(1.7)' }}><c.Art /></div>}
              </div>
              <h3 className="display" style={{ fontSize: 36, color: 'var(--ink)', marginTop: 24 }}>{c.name}</h3>
              <div className="eyebrow" style={{ marginTop: 8, color: 'var(--rust)' }}>{c.role}</div>
              <div className={c.italic ? 'serif-it' : 'serif'} style={{ fontSize: c.italic ? 20 : 17, marginTop: 14, color: 'var(--ink-soft)', lineHeight: 1.6, padding: '0 6px' }}>{c.text}</div>
            </figure>
          )}
        </div>
      </div>
    </section>);

}

// ─── HOW IT WORKS ────────────────────────────────────────────
function HomeHow({ t }) {
  return (
    <section id="how" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0 170px', background: 'linear-gradient(180deg, var(--paper-warm) 0%, var(--cream) 100%)' }}>
      <PaperGrain opacity={0.14} />
      <LightLeak corner="bottom-right" color="rgba(168, 136, 100, 0.2)" size={620} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80, maxWidth: 800, margin: '0 auto 80px' }}>
          <span className="eyebrow eyebrow-rule">{t.how.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 4.6vw, 64px)', marginTop: 26, letterSpacing: '-0.018em', color: 'var(--ink)' }}>{t.how.title}</h2>
          <div className="serif-it" style={{ fontSize: 'clamp(20px, 1.7vw, 27px)', color: 'var(--rust)', marginTop: 18 }}>{t.how.tagline}</div>
          <p className="serif" style={{ fontSize: 'clamp(17px, 1.3vw, 20px)', color: 'var(--ink-soft)', marginTop: 18, lineHeight: 1.65, maxWidth: 640, margin: '18px auto 0' }}>{t.how.sub}</p>
        </div>
        <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 44, position: 'relative' }}>
          {t.how.steps.map((s, i) =>
          <div key={i} className={`reveal reveal-delay-${i % 4 + 1}`}>
              <div className="serif-it" style={{ fontSize: 40, color: 'var(--rust)', fontWeight: 600, lineHeight: 1 }}>{s.n}</div>
              <div style={{ width: 30, height: 1, background: 'rgba(178,94,42,0.4)', margin: '18px 0 20px' }} />
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.005em', lineHeight: 1.2 }}>{s.t}</h3>
              <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.65 }}>{s.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Character medallions (abstract, friendly stand-ins) ─────
function CharBearHome() {
  return (
    <svg width="118" height="118" viewBox="0 0 120 120" fill="none">
      <circle cx="60" cy="64" r="42" fill="#BFB8AE" stroke="#211C18" strokeWidth="2.5" />
      <circle cx="32" cy="38" r="12" fill="#BFB8AE" stroke="#211C18" strokeWidth="2" />
      <circle cx="88" cy="38" r="12" fill="#BFB8AE" stroke="#211C18" strokeWidth="2" />
      <circle cx="32" cy="38" r="5" fill="#8C857A" />
      <circle cx="88" cy="38" r="5" fill="#8C857A" />
      <circle cx="48" cy="58" r="9" fill="#FAF4E8" stroke="#211C18" strokeWidth="2" />
      <circle cx="72" cy="58" r="9" fill="#FAF4E8" stroke="#211C18" strokeWidth="2" />
      <circle cx="48" cy="60" r="3.5" fill="#211C18" />
      <circle cx="72" cy="60" r="3.5" fill="#211C18" />
      <ellipse cx="60" cy="78" rx="14" ry="11" fill="#E8E1D4" stroke="#211C18" strokeWidth="2" />
      <ellipse cx="60" cy="76" rx="4" ry="3" fill="#211C18" />
      <path d="M53 84 Q60 90 67 84" stroke="#211C18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="74" r="5" fill="#EBC79B" opacity="0.7" />
      <circle cx="80" cy="74" r="5" fill="#EBC79B" opacity="0.7" />
      <path d="M50 100 L42 108 L56 104 L64 104 L78 108 L70 100 Z" fill="#E08A3C" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
    </svg>);

}
function CharFoxHome() {
  return (
    <svg width="118" height="118" viewBox="0 0 120 120" fill="none">
      <path d="M22 36 L34 60 L18 56 Z" fill="#E08A3C" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
      <path d="M98 36 L86 60 L102 56 Z" fill="#E08A3C" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 30 L100 56 L92 92 Q60 110 28 92 L20 56 Z" fill="#E08A3C" stroke="#211C18" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M40 70 L60 96 L80 70 Q70 80 60 80 Q50 80 40 70 Z" fill="#FAF4E8" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="48" cy="60" r="6" fill="#FAF4E8" stroke="#211C18" strokeWidth="2" />
      <circle cx="72" cy="60" r="6" fill="#FAF4E8" stroke="#211C18" strokeWidth="2" />
      <circle cx="48" cy="61" r="2.6" fill="#211C18" />
      <circle cx="72" cy="61" r="2.6" fill="#211C18" />
      <ellipse cx="60" cy="78" rx="5" ry="4" fill="#211C18" />
      <circle cx="40" cy="78" r="4" fill="#B25E2A" opacity="0.6" />
      <circle cx="80" cy="78" r="4" fill="#B25E2A" opacity="0.6" />
      <path d="M28 100 L60 92 L92 100 L88 112 L60 106 L32 112 Z" fill="#87A398" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
    </svg>);

}
function CharBoyHome() {
  return (
    <svg width="118" height="118" viewBox="0 0 120 120" fill="none">
      <path d="M30 50 Q30 18 60 18 Q90 18 90 50 Q90 56 84 58 L82 70 Q72 80 60 80 Q48 80 38 70 L36 58 Q30 56 30 50 Z" fill="#F4D6BA" stroke="#211C18" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 44 Q34 24 56 22 Q78 18 90 38 Q86 36 82 38 Q74 28 60 30 Q44 32 38 44 Q34 46 30 44 Z" fill="#A88864" stroke="#211C18" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="48" cy="52" r="3" fill="#211C18" />
      <circle cx="72" cy="52" r="3" fill="#211C18" />
      <path d="M54 66 Q60 72 66 66" stroke="#211C18" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="62" r="3" fill="#E08A3C" opacity="0.5" />
      <circle cx="78" cy="62" r="3" fill="#E08A3C" opacity="0.5" />
      <path d="M28 110 Q28 90 50 84 L70 84 Q92 90 92 110 Z" fill="#87A398" stroke="#211C18" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>);

}

Object.assign(window, { HomeTopBar, HomeLangSwitch, HomeHero, HomeMarquee, HomeStory, HomeHow });