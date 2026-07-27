// ────────────────────────────────────────────────────────────────
// Cinematic sections — Hero, Story, Inside, Storybook Preview,
// Building, Treasure Map, Why-parents, Final CTA, Footer
// ────────────────────────────────────────────────────────────────

// ─── TOP BAR ─────────────────────────────────────────────────
function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(20,24,16,0.72)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(242,233,217,0.08)' : '1px solid transparent',
      transition: 'background 0.5s var(--ease-out), border-color 0.5s var(--ease-out), backdrop-filter 0.5s var(--ease-out)',
    }}>
      <div className="wrap topbar-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', gap: 18 }}>
        <a href="index.html" aria-label="Zurück" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="assets/logo-wordmark.png" alt="Popcorn & Freddy"
            style={{
              height: 42, width: 'auto',
              filter: scrolled ? 'invert(1) brightness(0.95)' : 'none',
              transition: 'filter 0.5s var(--ease-out)',
            }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="top-meta">
          <span className="eyebrow" style={{
            color: scrolled ? 'rgba(242,233,217,0.7)' : 'var(--cream)',
            textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.4)',
            transition: 'color 0.5s var(--ease-out)',
          }}>
            Kapitel 01 · Der Flüsterwald
          </span>
          <a href="index.html" className="topnav-link" style={{
            fontSize: 14, fontWeight: 500,
            color: scrolled ? 'rgba(242,233,217,0.78)' : 'var(--cream)',
            textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.4)',
            transition: 'color 0.5s var(--ease-out)',
          }}>Alle Kapitel</a>
        </div>
      </div>
      <style>{`
        .topnav-link:hover { color: var(--lantern) !important; }
        @media (max-width: 820px) {
          .topbar-inner { padding: 14px 22px !important; }
          .topbar-inner img { height: 34px !important; }
          .top-meta .eyebrow { display: none; }
        }
      `}</style>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────
// Cinematic full-bleed dusk forest with book floating in center
function Hero({ onAdd, onPeek, treeMotion = 'statisch' }) {
  const scrollY = useScrollY();
  const bookRef = useRef(null);

  useEffect(() => {
    if (!bookRef.current) return;
    bookRef.current.style.transform = `translateY(${Math.min(scrollY * 0.12, 80)}px)`;
  }, [scrollY]);

  return (
    <section id="top" style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
      paddingTop: 120, paddingBottom: 80,
      color: 'var(--cream)',
    }}>
      <ForestBackdrop scrollY={scrollY} variant="dusk" motion={treeMotion} />
      <FloatingEmbers count={18} />

      {/* Left-side readability scrim — keeps text legible over the bright dusk sky */}
      <div className="hero-scrim" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(100deg, rgba(18,22,14,0.62) 0%, rgba(18,22,14,0.38) 30%, rgba(18,22,14,0.08) 52%, transparent 64%)',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1.05fr 0.95fr',
          gap: 80, alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}>
          {/* Left: text */}
          <div className="reveal in" style={{ maxWidth: 620 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '9px 18px', borderRadius: 999,
              background: 'rgba(20,24,16,0.42)',
              border: '1px solid rgba(242,233,217,0.22)',
              backdropFilter: 'blur(8px)',
              marginBottom: 38,
            }}>
              <span style={{
                display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                background: 'var(--lantern)',
                boxShadow: '0 0 14px var(--lantern)',
                animation: 'shimmer 3s ease-in-out infinite',
              }} />
              <span className="eyebrow" style={{ fontSize: 11, color: 'var(--cream)', letterSpacing: '0.28em' }}>
                Kapitel 01 · Eine neue Reise beginnt
              </span>
            </div>

            <h1 className="display" style={{
              fontSize: 'clamp(48px, 6.8vw, 96px)',
              color: 'var(--paper)',
              textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
              letterSpacing: '-0.022em',
            }}>
              Erschafft magische<br />
              <span className="serif-it" style={{ color: 'var(--lantern)' }}>Familienabenteuer</span><br />
              — Kapitel für Kapitel.
            </h1>

            <p className="serif" style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              color: 'rgba(242,233,217,0.88)',
              marginTop: 38,
              lineHeight: 1.55,
              maxWidth: 540,
              fontWeight: 400,
              textShadow: '0 1px 10px rgba(0,0,0,0.4)',
            }}>
              Gemeinsam mit <em className="serif-it" style={{ color: 'var(--paper)' }}>Popcorn & Freddy</em> wird dein Kind Teil einer großen Schatzsuche. Baut echte Holzspielzeuge, löst Rätsel und erlebt unvergessliche Abenteuer – fernab von Bildschirmen und voller gemeinsamer Erinnerungen.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 46 }}>
              <button className="btn btn-primary btn-xl" onClick={onAdd}>
                Jetzt Abenteuer starten
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.95 }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <button className="btn btn-ghost-light btn-xl" onClick={onPeek}>
                Erste Seiten entdecken
              </button>
            </div>

            <div style={{
              marginTop: 60,
              paddingTop: 28,
              borderTop: '1px solid rgba(242,233,217,0.18)',
              display: 'flex', flexWrap: 'wrap', gap: '14px 32px',
              fontSize: 13.5, color: 'rgba(247,240,227,0.92)',
              textShadow: '0 1px 8px rgba(0,0,0,0.55)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--lantern)' }}>★</span>
                <span><strong style={{ color: 'var(--paper)', fontWeight: 600 }}>4,9/5</strong> · 1.200 Familien</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--lantern)', opacity: 0.8 }}>•</span> Versand ab 7 €
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--lantern)', opacity: 0.8 }}>•</span> FSC-Holz · EU-gefertigt
              </span>
            </div>
          </div>

          {/* Right: book cover, lit from below */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-12% -14% -12% -14%',
              background:
                'radial-gradient(ellipse at 50% 55%, rgba(244, 182, 107, 0.55) 0%, rgba(224, 138, 60, 0.25) 30%, transparent 65%)',
              filter: 'blur(50px)', zIndex: 0,
            }} />
            <div ref={bookRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
              <img src="assets/book-1-fluesterwald.png" alt="Der Flüsterwald — Kapitel 1" style={{
                width: '100%', borderRadius: 10,
                boxShadow:
                  '0 80px 140px -40px rgba(0,0,0,0.65), ' +
                  '0 30px 50px -20px rgba(0,0,0,0.4), ' +
                  '0 0 0 1px rgba(33,28,24,0.1), ' +
                  '0 0 80px rgba(244, 182, 107, 0.25)',
              }} />
            </div>
            {/* tiny floating leaves */}
            <Leaf size={38} className="float-slow" style={{ position: 'absolute', top: '6%', right: -18, zIndex: 2, opacity: 0.7 }} color="#5C6948" />
            <Leaf size={28} className="drift" style={{ position: 'absolute', bottom: '20%', left: -22, zIndex: 2, opacity: 0.6, '--r': '-10deg' }} color="#B25E2A" />
            <Leaf size={24} className="float-slow" style={{ position: 'absolute', top: '38%', right: -34, zIndex: 2, opacity: 0.5, animationDelay: '2s' }} color="#3E4A33" />
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)',
        zIndex: 3, textAlign: 'center', color: 'rgba(242,233,217,0.7)',
        animation: 'float-slow 3.6s ease-in-out infinite',
      }}>
        <div className="eyebrow" style={{ fontSize: 10, color: 'rgba(242,233,217,0.6)', marginBottom: 8 }}>scrollt tiefer in den wald</div>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" style={{ margin: '0 auto', opacity: 0.7 }}>
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="11" cy="11" r="2.5" fill="currentColor">
            <animate attributeName="cy" values="11;22;11" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* fade-out to next section */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 220,
        background: 'linear-gradient(to bottom, transparent, var(--paper) 92%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .hero-grid > div:last-child { max-width: 420px; margin: 0 auto; order: -1; }
        }
      `}</style>
    </section>
  );
}

// ─── STORY OPENING (full-bleed cinematic) ────────────────────
function StoryOpening() {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '180px 0 180px',
      background:
        'radial-gradient(ellipse at 50% -20%, rgba(244, 215, 170, 0.55) 0%, transparent 45%), ' +
        'linear-gradient(180deg, var(--paper) 0%, var(--paper) 50%, var(--paper-warm) 100%)',
    }}>
      <LightLeak corner="top-left" color="rgba(244, 182, 107, 0.22)" size={680} />
      <SectionFog from="bottom" color="rgba(232, 198, 138, 0.32)" height="22%" />

      <FallingLeaves count={5} />

      <div className="wrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow eyebrow-rule">Die Geschichte beginnt</span>
        </div>

        <h2 className="display reveal" style={{
          fontSize: 'clamp(46px, 6vw, 86px)',
          textAlign: 'center', color: 'var(--ink)',
          letterSpacing: '-0.02em',
          marginBottom: 64,
        }}>
          Tief im Wald<br />
          flüstert etwas <span className="serif-it" style={{ color: 'var(--rust)' }}>ihren Namen</span>.
        </h2>

        <div className="reveal reveal-delay-1" style={{
          display: 'grid', gap: 26, fontSize: 'clamp(18px, 1.45vw, 22px)',
          lineHeight: 1.75, color: 'var(--ink-soft)',
          maxWidth: 720, margin: '0 auto',
          fontFamily: 'var(--font-serif)', fontWeight: 400,
        }}>
          <p style={{ fontSize: 'clamp(20px, 1.65vw, 26px)', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.5 }}>
            Als <em>Popcorn</em> — der nachdenkliche Bär — und <em>Freddy</em> — der schlagfertige Fuchs — am Bach eine alte Karte finden, ahnen sie noch nicht, was vor ihnen liegt.
          </p>
          <p>Die Karte führt sie in den <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Flüsterwald</strong> — einen Ort voller vergessener Pfade, leiser Stimmen und eines Geheimnisses, das seit Generationen schläft.</p>
          <p>Doch die beiden Freunde schaffen es nicht allein.</p>
          <p>Sie brauchen jemanden mit Mut. Mit Fantasie. Mit kleinen, geschickten Händen.</p>
          <p className="serif-it" style={{ color: 'var(--ink)', fontSize: 'clamp(20px, 1.65vw, 26px)', lineHeight: 1.5 }}>
            Sie brauchen <em>dein Kind</em>.
          </p>
        </div>

        <div className="reveal reveal-delay-2" style={{ textAlign: 'center', marginTop: 80 }}>
          <HandArrow height={90} color="var(--rust)" />
        </div>
      </div>
    </section>
  );
}

// ─── WHAT'S INSIDE — discovered treasure aesthetic ──────────
function WhatsInside() {
  const items = [
    { n: "I", t: "Das Abenteuer-Kapitel", d: "32 illustrierte Seiten — voll Rätsel, Entscheidungen und magischer Momente zum Vorlesen.", note: "32 Seiten" },
    { n: "II", t: "Das Holz-Fahrzeug zum Bauen", d: "Ein echtes Auto aus FSC-Holz, das Popcorn & Freddy für ihre Reise brauchen.", note: "FSC-Holz" },
    { n: "III", t: "Farben & Pinsel", d: "Damit jedes Abenteuer seine eigenen Farben bekommt.", note: "4 Farben" },
    { n: "IV", t: "Die Schatzkarte", d: "Gefaltet wie eine echte Entdecker­karte — und voller Geheimnisse.", note: "gefaltet" },
    { n: "V", t: "Der personalisierte Holz-Ordner", d: "Mit dem Namen deines Kindes auf der Reisetagebuch-Hülle.", note: "personalisiert" },
    { n: "VI", t: "Anleitung & Überraschungen", d: "Schritt für Schritt erklärt, mit Stickern und kleinen Schätzen.", note: "+ Sticker" },
  ];
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '170px 0 200px',
      background:
        'radial-gradient(ellipse at 18% 14%, rgba(244, 215, 170, 0.5) 0%, transparent 55%), ' +
        'radial-gradient(ellipse at 88% 88%, rgba(168, 136, 100, 0.32) 0%, transparent 50%), ' +
        'linear-gradient(180deg, var(--paper-warm) 0%, var(--paper-warm) 50%, var(--paper-deep) 100%)',
    }}>

      {/* warm light leak from upper-right (lantern light) */}
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.32)" size={780} />
      <LightLeak corner="bottom-left" color="rgba(168, 136, 100, 0.22)" size={620} />

      {/* paper-grain layer for tactility */}
      <PaperGrain opacity={0.22} />

      {/* faded compass watermark in background */}
      <div aria-hidden style={{
        position: 'absolute', top: '10%', right: '5%',
        opacity: 0.06, pointerEvents: 'none', zIndex: 0,
      }}>
        <AnimatedCompass size={260} color="rgba(110, 76, 46, 1)" />
      </div>

      {/* torn map fragment in bottom-left, peeking in */}
      <div aria-hidden style={{
        position: 'absolute', left: -120, bottom: -80,
        width: 380, height: 280,
        background: "url('assets/adventure-map.png') center/cover",
        opacity: 0.18,
        transform: 'rotate(-12deg)',
        maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: 12,
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 90, maxWidth: 740, margin: '0 auto 90px' }}>
          <span className="eyebrow eyebrow-rule">Was in der Box ruht</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Sechs Schätze. Eine <span className="serif-it" style={{ color: 'var(--rust)' }}>Reise</span>.
          </h2>
          <p className="serif" style={{
            fontSize: 'clamp(17px, 1.3vw, 20px)', color: 'var(--ink-soft)',
            marginTop: 22, lineHeight: 1.6, maxWidth: 600, margin: '22px auto 0',
            fontStyle: 'italic',
          }}>
            Kein Bildschirm. Kein Plastik. Nur Geschichten, Holz, Farben — und stundenlange gemeinsame Zeit.
          </p>
        </div>

        <div className="inside-grid" style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
          gap: 96, alignItems: 'center',
        }}>
          {/* Left: discovered-objects collage */}
          <div className="reveal" style={{ position: 'relative', minHeight: 560 }}>
            {/* shadow page peek behind */}
            <div aria-hidden style={{
              position: 'absolute', top: '6%', left: '-3%',
              width: '100%', height: '94%',
              background: 'var(--cream)', borderRadius: 6,
              transform: 'rotate(-3deg)', zIndex: 0,
              boxShadow: '0 24px 40px -20px rgba(33,28,24,0.32)',
              opacity: 0.7,
            }} />

            {/* warm glow behind */}
            <div aria-hidden style={{
              position: 'absolute', inset: '-8% -10% -8% -10%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(224, 138, 60, 0.28) 0%, transparent 70%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />

            <div className="img-card" style={{
              position: 'relative', zIndex: 1, transform: 'rotate(-1.4deg)',
            }}>
              <img src="assets/box-contents.png" alt="Inhalt der Popcorn & Freddy Box" style={{ width: '100%' }} />
            </div>

            {/* Twine-stuck note 1: top-left */}
            <div className="hand reveal reveal-delay-1" style={{
              position: 'absolute', top: -28, left: -18,
              transform: 'rotate(-7deg)',
              padding: '10px 16px 12px',
              background: 'var(--paper)',
              color: 'var(--ink-soft)',
              fontSize: 17, lineHeight: 1.2,
              borderRadius: 2,
              boxShadow: '0 12px 24px -10px rgba(33,28,24,0.25), 0 0 0 1px rgba(33,28,24,0.06)',
              zIndex: 3,
              maxWidth: 180,
            }}>
              <div style={{ fontSize: 13, color: 'var(--rust)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--font-body)', fontWeight: 700 }}>für Lukas</div>
              alles, was ihr für Kapitel 1 braucht ↓
              {/* tape */}
              <div aria-hidden style={{
                position: 'absolute', top: -10, left: '50%',
                transform: 'translateX(-50%) rotate(-3deg)',
                width: 54, height: 16,
                background: 'rgba(244, 182, 107, 0.55)',
                border: '1px solid rgba(178,94,42,0.25)',
                borderRadius: 1,
              }} />
            </div>

            {/* Twine-stuck note 2: bottom-right */}
            <div className="hand" style={{
              position: 'absolute', bottom: -22, right: -8,
              transform: 'rotate(5deg)',
              padding: '9px 14px 10px',
              background: 'var(--lantern)',
              color: 'var(--ink)',
              fontSize: 16, lineHeight: 1.2,
              borderRadius: 2,
              boxShadow: '0 12px 24px -10px rgba(33,28,24,0.32)',
              zIndex: 3,
              maxWidth: 160,
              border: '1px solid rgba(33,28,24,0.08)',
            }}>
              ✶ jede Box —<br />
              ein neues Kapitel
            </div>

            {/* Compass corner sticker */}
            <div aria-hidden style={{
              position: 'absolute', top: '38%', right: -34,
              opacity: 0.95,
              transform: 'rotate(8deg)',
              zIndex: 3,
            }}>
              <Compass size={68} />
            </div>
          </div>

          {/* Right: numbered Roman list with handwritten notes */}
          <div style={{ display: 'grid', gap: 24, position: 'relative' }}>
            {items.map((it, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr auto',
                gap: 22, alignItems: 'start',
                paddingBottom: i < items.length - 1 ? 24 : 0,
                borderBottom: i < items.length - 1 ? '1px solid rgba(110,76,46,0.18)' : 'none',
              }}>
                <div className="serif-it" style={{
                  fontSize: 32, color: 'var(--rust)',
                  lineHeight: 1, paddingTop: 2,
                  letterSpacing: '-0.01em',
                  fontWeight: 600,
                }}>{it.n}</div>
                <div>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.005em' }}>{it.t}</h3>
                  <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.65, maxWidth: 420 }}>{it.d}</p>
                </div>
                <div className="hand inside-note" style={{
                  fontSize: 16, color: 'var(--ink-mute)',
                  whiteSpace: 'nowrap',
                  transform: `rotate(${i % 2 ? 3 : -3}deg)`,
                  fontStyle: 'normal',
                  alignSelf: 'center',
                  opacity: 0.78,
                }}>
                  ↳ {it.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .inside-grid { grid-template-columns: 1fr !important; gap: 80px !important; }
        }
        @media (max-width: 720px) {
          .inside-note { display: none !important; }
        }
      `}</style>
    </section>
  );
}

// ─── STORYBOOK PREVIEW — collectible pages ───────────────────
function StorybookPreview({ peekRef }) {
  const pages = [
    { src: "assets/book-page-1.png", title: "Wo alles beginnt", caption: "Popcorn und Freddy am Bach vor ihrem kleinen Haus — der erste Sonnenstrahl streift die Karte." },
    { src: "assets/book-page-2.png", title: "Die alte Karte", caption: "Versteckt im hohlen Baumstamm, mit einem roten X dort, wo niemand mehr gewesen ist." },
    { src: "assets/book-page-3.png", title: "Die Nacht vor dem Aufbruch", caption: "Zwei aufgeregte Freunde packen ihre Rucksäcke. Morgen früh geht es los." },
    { src: "assets/book-page-4.png", title: "Dein erstes Rätsel", caption: "Welche fünf Dinge nehmen die beiden mit? Dein Kind entscheidet.", tag: "Mitmach-Seite" },
  ];
  const [idx, setIdx] = useState(0);
  const p = pages[idx];
  const next = () => setIdx((idx + 1) % pages.length);
  const prev = () => setIdx((idx - 1 + pages.length) % pages.length);

  return (
    <section ref={peekRef} style={{
      background: 'linear-gradient(180deg, var(--paper-deep) 0%, var(--paper-deep) 50%, var(--paper) 100%)',
      padding: '180px 0 200px',
      position: 'relative', overflow: 'hidden',
    }}>
      <PaperGrain opacity={0.18} />
      <LightLeak corner="top-right" color="rgba(224, 138, 60, 0.28)" size={760} />
      <LightLeak corner="bottom-left" color="rgba(168, 136, 100, 0.18)" size={600} />
      {/* subtle drifting fog at top */}
      <SectionFog from="top" color="rgba(244, 230, 200, 0.42)" height="28%" />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80, maxWidth: 740, margin: '0 auto 80px' }}>
          <span className="eyebrow eyebrow-rule">Sneak Peek</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Ein Blick zwischen die <span className="serif-it" style={{ color: 'var(--rust)' }}>Seiten</span>.
          </h2>
          <p className="serif" style={{
            fontSize: 'clamp(17px, 1.3vw, 20px)', color: 'var(--ink-soft)',
            marginTop: 22, lineHeight: 1.6, maxWidth: 620, margin: '22px auto 0',
          }}>
            Jede Seite verbindet Vorlesen, Entdecken und kleine Mitmach-Momente — damit Kinder nicht nur zuhören, sondern wirklich Teil der Geschichte werden.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 90, alignItems: 'center' }} className="peek-grid">
          <div className="reveal">
            <div className="serif-it" style={{ fontSize: 72, lineHeight: 1, color: 'var(--rust)', letterSpacing: '-0.025em', fontWeight: 600 }}>
              {String(idx + 1).padStart(2, '0')}
              <span style={{ color: 'var(--ink-mute)', opacity: 0.45, fontSize: 36 }}> / 32</span>
            </div>
            <h3 className="serif" style={{ fontSize: 30, fontWeight: 600, marginTop: 24, color: 'var(--ink)', letterSpacing: '-0.008em', lineHeight: 1.2 }}>
              {p.title}
              {p.tag && (
                <span style={{
                  marginLeft: 14, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '5px 11px', borderRadius: 999, color: 'var(--rust)',
                  border: '1px solid rgba(178,94,42,0.32)', verticalAlign: 'middle',
                  background: 'rgba(178,94,42,0.06)',
                  fontFamily: 'var(--font-body)', fontStyle: 'normal',
                }}>{p.tag}</span>
              )}
            </h3>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', marginTop: 18, lineHeight: 1.7, maxWidth: 440 }}>
              {p.caption}
            </p>

            <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {pages.map((thumb, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Seite ${i + 1}`} style={{
                  width: 64, height: 86, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', padding: 0, flex: 'none',
                  background: 'var(--cream)',
                  border: i === idx ? '2px solid var(--rust)' : '1px solid rgba(33,28,24,0.18)',
                  transition: 'all 0.4s var(--ease-out)',
                  transform: i === idx ? 'translateY(-3px)' : 'none',
                  boxShadow: i === idx
                    ? '0 14px 26px -10px rgba(33,28,24,0.4)'
                    : '0 4px 10px -4px rgba(33,28,24,0.18)',
                  opacity: i === idx ? 1 : 0.7,
                }}>
                  <img src={thumb.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            <div style={{ marginTop: 44, display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={prev} aria-label="vorherige Seite" className="peek-nav">←</button>
              <button onClick={next} aria-label="nächste Seite" className="peek-nav peek-nav-primary">→</button>
              <span style={{ fontSize: 13, color: 'var(--ink-mute)', marginLeft: 6 }}>
                32 illustrierte Seiten · zwei bis drei Vorlese-Abende
              </span>
            </div>
          </div>

          {/* Featured page with fanned shadow pages behind */}
          <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-8% -10% -10% -10%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(224, 138, 60, 0.28) 0%, transparent 72%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />
            {/* Two shadow pages behind */}
            <div style={{
              position: 'absolute', top: '4%', left: '-5%', width: '100%', height: '96%',
              background: 'var(--cream)', borderRadius: 8,
              transform: 'rotate(-4deg)', opacity: 0.55, zIndex: 0,
              boxShadow: '0 24px 40px -20px rgba(33,28,24,0.35)',
            }} />
            <div style={{
              position: 'absolute', top: '3%', right: '-3%', width: '100%', height: '97%',
              background: 'var(--paper-warm)', borderRadius: 8,
              transform: 'rotate(3deg)', opacity: 0.7, zIndex: 0,
              boxShadow: '0 24px 40px -20px rgba(33,28,24,0.35)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <img
                key={idx}
                src={p.src}
                alt={p.title}
                style={{
                  width: '100%', borderRadius: 10,
                  boxShadow:
                    '0 80px 120px -40px rgba(33,28,24,0.55), ' +
                    '0 30px 50px -20px rgba(33,28,24,0.3), ' +
                    '0 0 0 1px rgba(33,28,24,0.08)',
                  animation: 'page-flip 0.7s var(--ease-out)',
                }}
              />
            </div>
            {/* corner sticker */}
            <div className="hand" style={{
              position: 'absolute', top: -14, right: -10, zIndex: 3,
              transform: 'rotate(8deg)',
              padding: '6px 14px',
              background: 'var(--lantern)',
              color: 'var(--ink)',
              fontSize: 15,
              borderRadius: 4,
              boxShadow: '0 10px 24px -8px rgba(33,28,24,0.4)',
              border: '1px solid rgba(33,28,24,0.15)',
            }}>
              Seite {String(idx + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes page-flip {
          0% { opacity: 0; transform: translateY(12px) rotateY(-12deg); transform-origin: left center; }
          100% { opacity: 1; transform: translateY(0) rotateY(0deg); }
        }
        .peek-nav {
          width: 54px; height: 54px; border-radius: 50%;
          border: 1px solid rgba(33,28,24,0.2); background: var(--paper);
          display: grid; place-items: center; font-size: 19px; font-weight: 500;
          color: var(--ink-soft); transition: all 0.4s var(--ease-out);
        }
        .peek-nav:hover { background: var(--cream); color: var(--ink); transform: translateY(-2px); }
        .peek-nav-primary { background: var(--ink); color: var(--paper); border-color: var(--ink); }
        .peek-nav-primary:hover { background: #0e0a07; color: var(--paper); }
        @media (max-width: 980px) {
          .peek-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .peek-grid > div:last-child { max-width: 480px; margin: 0 auto; order: -1; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { TopBar, Hero, StoryOpening, WhatsInside, StorybookPreview });
