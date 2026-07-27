// ────────────────────────────────────────────────────────────────
// Der Flüsterwald — premium cinematic landing page (Hero + TopBar)
// ────────────────────────────────────────────────────────────────

// Note: React, useState, useEffect, useRef are destructured globally in ui.jsx.

// ─── COPY ────────────────────────────────────────────────────
const CHAPTER = {
  number: "01",
  name: "Der Flüsterwald",
  price: 39.90,
  rating: 4.9,
  reviews: 1200,
};

// ─── TOP BAR ─────────────────────────────────────────────────
function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(250,244,232,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(33,28,24,0.08)' : '1px solid transparent',
      transition: 'background 0.5s var(--ease-out), border-color 0.5s var(--ease-out), backdrop-filter 0.5s var(--ease-out)',
    }}>
      <div className="wrap topbar-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', gap: 18 }}>
        <a href="index.html" aria-label="Zurück" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="assets/logo-wordmark.png" alt="Popcorn & Freddy" style={{ height: 44, width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="top-meta">
          <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>Kapitel 01 · Der Flüsterwald</span>
          <a href="index.html" className="topnav-link" style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-soft)' }}>Alle Kapitel</a>
        </div>
      </div>
      <style>{`
        .topnav-link:hover { color: var(--rust); }
        @media (max-width: 820px) {
          .topbar-inner { padding: 14px 22px !important; }
          .topbar-inner img { height: 36px !important; }
          .top-meta .eyebrow { display: none; }
        }
      `}</style>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function Hero({ onAdd, onPeek }) {
  const imgRef = useRef(null);
  // very subtle parallax on the book cover
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `translateY(${Math.min(y * 0.06, 60)}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" style={{
      position: 'relative', overflow: 'hidden',
      paddingTop: 60, paddingBottom: 130,
      background:
        'radial-gradient(ellipse at 80% 0%, rgba(216,136,64,0.16) 0%, transparent 55%), ' +
        'radial-gradient(ellipse at 0% 100%, rgba(135,163,152,0.18) 0%, transparent 55%), ' +
        'var(--paper)',
    }}>
      <FallingLeaves />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 90, alignItems: 'center', paddingTop: 40 }}>
          {/* Left: editorial text */}
          <div className="reveal in" style={{ maxWidth: 620 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 18px', borderRadius: 999,
              background: 'rgba(33,28,24,0.05)',
              border: '1px solid rgba(33,28,24,0.1)',
              marginBottom: 36,
            }}>
              <span style={{ fontSize: 14 }}>✦</span>
              <span className="eyebrow" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>
                Bildschirmfreie Abenteuer für Familien
              </span>
            </div>

            <h1 className="display" style={{ fontSize: 'clamp(46px, 6.4vw, 88px)', color: 'var(--ink)' }}>
              Erschafft magische<br />
              <span className="serif-it" style={{ color: 'var(--rust)' }}>Familienabenteuer</span> —<br />
              Kapitel für Kapitel.
            </h1>

            <p className="serif" style={{
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              color: 'var(--ink-soft)',
              marginTop: 36,
              lineHeight: 1.55,
              maxWidth: 540,
              fontWeight: 400,
            }}>
              Ein interaktives Abenteuerbuch mit echten Holzspielzeugen zum Bauen, Bemalen und Entdecken. Gemeinsam mit <em style={{ fontStyle: 'italic', color: 'var(--ink)' }}>Popcorn & Freddy</em> wird dein Kind Teil einer großen Schatzsuche.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 44 }}>
              <button className="btn btn-primary btn-xl" onClick={onAdd}>
                Jetzt Abenteuer starten
              </button>
              <button className="btn btn-ghost btn-xl" onClick={onPeek}>
                Erste Seiten entdecken
              </button>
            </div>

            {/* Trust line — thin, elegant */}
            <div style={{
              marginTop: 56,
              paddingTop: 30,
              borderTop: '1px solid rgba(33,28,24,0.1)',
              display: 'flex', flexWrap: 'wrap', gap: '14px 32px',
              fontSize: 14, color: 'var(--ink-mute)',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: 'var(--rust)' }}>★</span>
                <span><strong style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>4,9/5</strong> von über 1.200 Familien</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ opacity: 0.65 }}>•</span> Versand ab 7 €
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ opacity: 0.65 }}>•</span> FSC-zertifiziertes Holz
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ opacity: 0.65 }}>•</span> Für gemeinsame Erinnerungen
              </span>
            </div>
          </div>

          {/* Right: book cover, cinematic */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-8% -10% -8% -10%',
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(216,136,64,0.32) 0%, rgba(216,136,64,0.08) 45%, transparent 75%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />
            <div ref={imgRef} style={{ position: 'relative', zIndex: 1, willChange: 'transform' }}>
              <img src="assets/book-1-fluesterwald.png" alt="Der Flüsterwald — Kapitel 1" style={{
                width: '100%', borderRadius: 12,
                boxShadow:
                  '0 60px 100px -40px rgba(33,28,24,0.5), ' +
                  '0 20px 40px -16px rgba(33,28,24,0.3), ' +
                  '0 0 0 1px rgba(33,28,24,0.06)',
              }} />
            </div>
            {/* tiny floating leaves around the cover */}
            <Leaf size={36} className="float-slow" style={{ position: 'absolute', top: '6%', right: -16, zIndex: 2, opacity: 0.7 }} color="var(--moss)" />
            <Leaf size={28} className="drift" style={{ position: 'absolute', bottom: '20%', left: -22, zIndex: 2, opacity: 0.6, '--r': '-10deg' }} color="var(--rust)" />
            <Leaf size={24} className="float-slow" style={{ position: 'absolute', top: '35%', right: -34, zIndex: 2, opacity: 0.5, animationDelay: '2s' }} color="var(--forest)" />
          </div>
        </div>
      </div>

      {/* soft fade into next section */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 160,
        background: 'linear-gradient(to bottom, transparent, var(--paper-warm))',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 56px !important; padding-top: 16px !important; }
          .hero-grid > div:last-child { max-width: 420px; margin: 0 auto; order: -1; }
        }
      `}</style>
    </section>
  );
}

function FallingLeaves() {
  const leaves = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {leaves.map((i) => {
        const left = (i * 17 + 9) % 100;
        const delay = i * 2.4;
        const dur = 18 + (i % 3) * 4;
        const color = ['#708054', '#B25E2A', '#D88840', '#A88864'][i % 4];
        return (
          <Leaf key={i} size={22 + (i % 3) * 6} color={color}
            style={{ position: 'absolute', top: 0, left: left + '%', animation: `leaf-fall ${dur}s ${delay}s linear infinite`, opacity: 0.35 }} />
        );
      })}
    </div>
  );
}

Object.assign(window, { TopBar, Hero, CHAPTER });
