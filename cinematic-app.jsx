// ────────────────────────────────────────────────────────────────
// Cinematic Building, Treasure Map, Why-Parents, FAQ, Final CTA,
// Footer + App wiring.
// ────────────────────────────────────────────────────────────────

// ─── BUILDING TOGETHER ──────────────────────────────────────
function BuildingTogether() {
  const moments = [
    { t: "Gemeinsam bauen", d: "Holzteile, die ineinander rasten — kein Werkzeug, kein Frust. Nur viele kleine Erfolgsmomente." },
    { t: "Gemeinsam bemalen", d: "Vier Farben, ein Pinsel, unendliche Möglichkeiten. Jedes Auto wird einzigartig." },
    { t: "Gemeinsam erinnern", d: "Das fertige Fahrzeug zieht ein ins Kinderzimmer — und erzählt seine Geschichte weiter." },
  ];
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '200px 0 220px',
      background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper-warm) 16%, var(--cream) 100%)',
    }}>
      <PaperGrain opacity={0.16} />
      {/* warm lantern light from upper-right — feels like an evening at home */}
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.4)" size={820} />
      <LightLeak corner="bottom-left" color="rgba(168, 136, 100, 0.22)" size={560} />
      <SectionFog from="bottom" color="rgba(232, 198, 138, 0.32)" height="28%" />
      <div className="wrap" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
          gap: 100, alignItems: 'center',
        }} className="build-grid">
          <div className="reveal" style={{ position: 'relative' }}>
            {/* warm light glow */}
            <div style={{
              position: 'absolute', inset: '-8% -10% -8% -10%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(224, 138, 60, 0.32) 0%, transparent 70%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />
            <div className="img-card" style={{ position: 'relative', zIndex: 1 }}>
              <img src="assets/hero-scene.png" alt="Kind baut gemeinsam mit Popcorn & Freddy" style={{
                width: '100%', display: 'block',
              }} />
            </div>
            <div className="hand" style={{
              position: 'absolute', bottom: -18, right: 30, zIndex: 2,
              fontSize: 20, color: 'var(--ink-soft)',
              transform: 'rotate(2deg)',
              padding: '7px 16px',
              background: 'var(--paper)',
              border: '1px solid rgba(33,28,24,0.12)',
              borderRadius: 4,
              boxShadow: '0 12px 24px -10px rgba(33,28,24,0.2)',
            }}>
              ↘ ein Nachmittag, der bleibt
            </div>
          </div>

          <div>
            <div className="reveal eyebrow eyebrow-rule" style={{ marginBottom: 26 }}>Das Erlebnis</div>
            <h2 className="display reveal" style={{ fontSize: 'clamp(40px, 5vw, 68px)', letterSpacing: '-0.018em' }}>
              Stundenlang etwas<br />
              gemeinsam <span className="serif-it" style={{ color: 'var(--rust)' }}>erschaffen</span>.
            </h2>
            <p className="serif reveal reveal-delay-1" style={{
              fontSize: 'clamp(18px, 1.4vw, 22px)',
              color: 'var(--ink-soft)',
              marginTop: 28, lineHeight: 1.6, fontStyle: 'italic', fontWeight: 500,
              maxWidth: 520,
            }}>
              Kein Bildschirm, der für Aufmerksamkeit kämpft.<br />
              Nur ihr, ein Holzauto und eine Geschichte, die euch gehört.
            </p>

            <div style={{ marginTop: 48, display: 'grid', gap: 22 }}>
              {moments.map((m, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                  display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 22,
                  alignItems: 'baseline',
                }}>
                  <div className="serif-it" style={{
                    fontSize: 28, color: 'var(--rust)', lineHeight: 1, fontWeight: 600,
                    minWidth: 42,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.005em' }}>{m.t}</h3>
                    <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 6, lineHeight: 1.65, maxWidth: 440 }}>{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .build-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── TREASURE MAP — the worldbuilding centerpiece ───────────
function TreasureMap() {
  const chapters = [
    { n: 1, name: "Der Anfang im Wald", x: 19, y: 38, active: true },
    { n: 2, name: "Das Flüsternde Gebirge", x: 38, y: 24 },
    { n: 3, name: "Der Verborgene Seeturm", x: 55, y: 26 },
    { n: 4, name: "Die alte Eiche", x: 82, y: 32 },
    { n: 5, name: "Die Nebelmoore", x: 70, y: 52 },
    { n: 6, name: "Das verlassene Lager", x: 42, y: 56 },
    { n: 7, name: "Höhle der Zeichen", x: 16, y: 60 },
    { n: 8, name: "Die stürmische Küste", x: 11, y: 80 },
    { n: 9, name: "Licht am Horizont", x: 33, y: 76 },
    { n: 10, name: "Der verborgene Dschungel", x: 54, y: 78 },
    { n: 11, name: "Wasserfall der Wahrheit", x: 78, y: 65 },
    { n: 12, name: "Schatz der Freundschaft", x: 84, y: 86 },
  ];
  const [hovered, setHovered] = useState(0);
  const active = chapters.find(c => c.n === hovered) || chapters[0];

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '200px 0 240px',
      background: 'linear-gradient(180deg, var(--cream) 0%, #1A2018 16%, #161B14 70%, #1A2018 88%, var(--cream) 100%)',
      color: 'var(--cream)',
    }}>
      {/* Embers above the dark band */}
      <FloatingEmbers count={22} />

      {/* glow leaks from corners — like distant lanterns */}
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.22)" size={900} />
      <LightLeak corner="bottom-left" color="rgba(135, 163, 152, 0.16)" size={800} />

      {/* animated compass watermark at top-right */}
      <div aria-hidden style={{
        position: 'absolute', top: 64, right: 64,
        zIndex: 2, opacity: 0.4,
      }}>
        <AnimatedCompass size={140} color="rgba(244, 182, 107, 0.85)" />
      </div>

      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 70, maxWidth: 820, margin: '0 auto 70px' }}>
          <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>Die Welt</span>
          <h2 className="display" style={{ fontSize: 'clamp(46px, 5.8vw, 84px)', color: 'var(--paper)', marginTop: 28, letterSpacing: '-0.02em' }}>
            Acht Kapitel. <span className="serif-it" style={{ color: 'var(--lantern)' }}>Eine Reise</span>,<br />
            an die ihr euch ein Leben lang erinnert.
          </h2>
          <p className="serif" style={{
            fontSize: 'clamp(17px, 1.3vw, 21px)', color: 'rgba(242,233,217,0.78)',
            marginTop: 26, lineHeight: 1.6, maxWidth: 640, margin: '26px auto 0',
          }}>
            Vom Flüsterwald über die Nebelmoore bis zum Schatz der Freundschaft — die Karte zeigt, wohin euch Popcorn & Freddy mitnehmen werden.
          </p>
        </div>

        {/* Map with interactive markers */}
        <div className="reveal reveal-delay-1" style={{
          position: 'relative',
          maxWidth: 1300, margin: '0 auto',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow:
            '0 80px 140px -40px rgba(0,0,0,0.7), ' +
            '0 30px 60px -20px rgba(0,0,0,0.5), ' +
            '0 0 0 1px rgba(244,182,107,0.12), ' +
            '0 0 80px rgba(224,138,60,0.25)',
        }}>
          {/* dark inset frame for cinematic look */}
          <div style={{ position: 'relative' }}>
            <img src="assets/adventure-map.png" alt="Schatzkarte mit acht Kapiteln" style={{ width: '100%', display: 'block' }} />

            {/* Glowing route overlay — connects all chapter markers */}
            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen',
            }}>
              <defs>
                <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4B66B" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#E08A3C" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F4B66B" stopOpacity="0.6" />
                </linearGradient>
                <filter id="routeGlow">
                  <feGaussianBlur stdDeviation="0.6" />
                </filter>
              </defs>
              {/* faint duplicate for halo */}
              <polyline
                points={chapters.map(c => `${c.x},${c.y}`).join(' ')}
                fill="none"
                stroke="rgba(244, 182, 107, 0.45)"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#routeGlow)"
              />
              {/* main animated dashed route */}
              <polyline
                points={chapters.map(c => `${c.x},${c.y}`).join(' ')}
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1.2 1.6"
                vectorEffect="non-scaling-stroke"
                style={{ animation: 'shimmer 4.5s ease-in-out infinite' }}
              />
            </svg>

            {/* Glowing chapter markers overlay */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
              {chapters.map((c) => {
                const isActive = c.n === active.n;
                const isCurrent = c.n === 1;
                return (
                  <button
                    key={c.n}
                    className={`map-marker${isCurrent ? ' current' : ''}`}
                    onMouseEnter={() => setHovered(c.n)}
                    onMouseLeave={() => setHovered(0)}
                    aria-label={`Kapitel ${c.n}: ${c.name}`}
                    style={{
                      position: 'absolute',
                      left: `${c.x}%`, top: `${c.y}%`,
                      transform: 'translate(-50%, -50%)',
                      width: isCurrent ? 38 : 26, height: isCurrent ? 38 : 26,
                      borderRadius: '50%',
                      background: isCurrent
                        ? 'radial-gradient(circle, var(--lantern) 30%, var(--ember) 80%)'
                        : 'rgba(20, 24, 16, 0.55)',
                      border: isCurrent
                        ? '2px solid rgba(255,240,200,0.95)'
                        : '1.5px solid rgba(244,182,107,0.65)',
                      boxShadow: isCurrent
                        ? '0 0 24px var(--lantern), 0 0 60px rgba(244,182,107,0.6), 0 4px 10px rgba(0,0,0,0.4)'
                        : (isActive
                            ? '0 0 16px var(--lantern), 0 2px 6px rgba(0,0,0,0.4)'
                            : '0 2px 6px rgba(0,0,0,0.4)'),
                      cursor: 'pointer',
                      transition: 'transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out), background 0.3s',
                      transform: `translate(-50%, -50%) scale(${isActive && !isCurrent ? 1.25 : 1})`,
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                      fontSize: isCurrent ? 16 : 13, fontWeight: 700,
                      color: isCurrent ? 'var(--ink)' : 'var(--lantern)',
                      padding: 0,
                      animation: isCurrent ? 'shimmer 3s ease-in-out infinite' : 'none',
                    }}
                  >
                    {c.n}
                  </button>
                );
              })}
            </div>

            {/* Floating info tooltip */}
            <div className="map-info" style={{
              position: 'absolute', left: 24, bottom: 24, zIndex: 5,
              background: 'rgba(20, 24, 16, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(244,182,107,0.32)',
              borderRadius: 12,
              padding: '18px 24px',
              minWidth: 280, maxWidth: 360,
              boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)',
              transition: 'opacity 0.3s var(--ease-out)',
            }}>
              <div className="eyebrow" style={{
                color: 'var(--lantern)', fontSize: 10,
                marginBottom: 8,
              }}>
                {active.n === 1 ? 'Aktuelles Kapitel' : `Kapitel ${String(active.n).padStart(2, '0')}`}
              </div>
              <div className="serif-it" style={{ fontSize: 22, color: 'var(--paper)', fontWeight: 600, lineHeight: 1.25 }}>
                {active.name}
              </div>
              {active.n === 1 && (
                <div style={{ fontSize: 13, color: 'rgba(242,233,217,0.7)', marginTop: 8 }}>
                  Eure erste Box wartet auf euch.
                </div>
              )}
            </div>

            {/* Compass corner */}
            <div className="hand map-corner-label" style={{
              position: 'absolute', top: 24, right: 28, zIndex: 5,
              fontSize: 14, color: 'rgba(242,233,217,0.65)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              fontFamily: 'var(--font-body)', fontWeight: 600,
            }}>
              {chapters.length} Kapitel · 1 Schatz
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-2" style={{
          marginTop: 48, textAlign: 'center', fontSize: 14,
          color: 'rgba(242,233,217,0.65)',
        }}>
          <span className="hand" style={{ fontSize: 18, color: 'var(--lantern)' }}>★</span>{' '}
          <span style={{ fontStyle: 'italic' }}>
            Heute beginnt eure Reise bei Kapitel 1. Jedes weitere kommt zur passenden Jahreszeit.
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── WHY PARENTS LOVE IT ────────────────────────────────────
function WhyParentsLove() {
  const items = [
    { t: "Bildschirmfreie Zeit, die wirklich wirkt.", d: "Nicht noch ein Spielzeug, das nach zwei Tagen vergessen wird — sondern Stunden, die euch verbinden." },
    { t: "Geschichten, die Gespräche öffnen.", d: "Kinder stellen Fragen, treffen Entscheidungen und tauchen emotional in die Welt ein." },
    { t: "Kreativität in echten Erfolgserlebnissen.", d: "Bauen, bemalen, entdecken — die Hände lernen, was Bildschirme nicht zeigen können." },
    { t: "Ein Erinnerungs­stück fürs Regal.", d: "Jedes Kapitel bleibt. Jedes Holz-Fahrzeug erzählt später seine eigene Geschichte." },
  ];
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream) 80%, var(--paper) 100%)', padding: '200px 0 200px', position: 'relative', overflow: 'hidden' }}>
      <LightLeak corner="top-left" color="rgba(244, 182, 107, 0.32)" size={780} />
      <LightLeak corner="bottom-right" color="rgba(168, 136, 100, 0.20)" size={620} />
      <PaperGrain opacity={0.14} />
      <div className="wrap">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 80, maxWidth: 760, margin: '0 auto 80px' }}>
          <span className="eyebrow eyebrow-rule">Warum Eltern es lieben</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Warum Familien immer wieder zurück in den<br />
            <span className="serif-it" style={{ color: 'var(--rust)' }}>Flüsterwald</span> wollen.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="benefit-grid">
          {items.map((b, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
              padding: '36px 0',
              borderTop: '1px solid rgba(33,28,24,0.12)',
            }}>
              <div className="serif-it" style={{
                fontSize: 32, color: 'var(--rust)', lineHeight: 1, marginBottom: 18, fontWeight: 600,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-0.005em' }}>{b.t}</h3>
              <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.7, maxWidth: 460 }}>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .benefit-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────
function Testimonials() {
  const items = [
    { q: "Wir haben das Auto gemeinsam in einer Stunde fertig gehabt — und Lina hat noch im Bett weitergelesen. Heute morgen war das Erste, was sie wissen wollte, wie es im Flüsterwald weitergeht.", n: "Carolin & Lina (5)", c: "Hamburg" },
    { q: "Drei Kinder. Alle drei haben mitgebaut. Selbst ich war beim Vorlesen so im Wald, dass ich kurz vergessen habe, dass es 19 Uhr ist.", n: "Markus & Familie", c: "Wien" },
    { q: "Endlich etwas, das nicht nach zwei Tagen verschwindet. Das Auto steht jetzt im Regal — neben der Schatzkarte. Wir warten auf Kapitel 2.", n: "Familie Engel", c: "Zürich" },
  ];
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--paper) 0%, var(--paper) 14%, var(--paper) 60%, var(--night) 100%)', padding: '180px 0 240px', position: 'relative', overflow: 'hidden' }}>
      <LightLeak corner="top-right" color="rgba(224, 138, 60, 0.18)" size={700} />
      <PaperGrain opacity={0.12} />
      {/* trees grow up at the bottom into the night section */}
      <TransitionForest color="#0F140C" height={260} direction="down" fadeColor="var(--night)" jitter={4} />
      <div className="wrap">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 70, maxWidth: 860, margin: '0 auto 70px' }}>
          <span className="eyebrow eyebrow-rule">Familien-Erinnerungen</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 4.6vw, 60px)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Familien auf der ganzen Welt reisen bereits mit <span className="serif-it" style={{ color: 'var(--rust)' }}>Popcorn & Freddy</span>.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="test-grid">
          {items.map((it, i) => (
            <figure key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              margin: 0, padding: '40px 36px',
              background: 'var(--cream)', borderRadius: 16,
              boxShadow: '0 30px 60px -30px rgba(33,28,24,0.25)',
              border: '1px solid rgba(33,28,24,0.06)',
              display: 'flex', flexDirection: 'column', gap: 28,
            }}>
              <div className="display" style={{ fontSize: 56, color: 'var(--rust)', lineHeight: 0.4, opacity: 0.65 }}>„</div>
              <blockquote className="serif-it" style={{
                margin: 0, fontSize: 19, lineHeight: 1.55, color: 'var(--ink)', flex: 1, fontWeight: 500,
              }}>{it.q}</blockquote>
              <figcaption>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{it.n}</div>
                <div className="eyebrow" style={{ marginTop: 6, color: 'var(--ink-mute)' }}>{it.c}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .test-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── APP CONTRAST (replaces feature table) ──────────────────
function AppContrast() {
  const moments = [
    { l: "Ein Tablet zeigt eine Geschichte.", r: "Eine Box lädt eure Familie in eine ein." },
    { l: "Eine App nimmt Aufmerksamkeit.", r: "Ein Buch schenkt euch eine." },
    { l: "Plastik verschwindet in der Kiste.", r: "Eure Holz-Erinnerungen bleiben im Regal." },
  ];
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--night) 0%, var(--night) 50%, var(--night) 86%, var(--paper-warm) 100%)', color: 'var(--cream)', padding: '220px 0 240px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 20% 0%, rgba(244,182,107,0.18) 0%, transparent 50%), ' +
          'radial-gradient(ellipse at 80% 100%, rgba(135,163,152,0.12) 0%, transparent 55%)',
        pointerEvents: 'none', opacity: 0.9,
      }} />
      {/* distant moon glow */}
      <div aria-hidden style={{
        position: 'absolute', top: '12%', right: '14%',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244, 232, 200, 0.32) 0%, rgba(244, 232, 200, 0.08) 35%, transparent 65%)',
        filter: 'blur(2px)', pointerEvents: 'none',
      }} />
      <FloatingEmbers count={12} color="rgba(244, 182, 107, 0.5)" />

      <div className="wrap-tight" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="reveal">
          <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>Im Vergleich</span>
          <h2 className="display" style={{ fontSize: 'clamp(42px, 5.4vw, 78px)', color: 'var(--paper)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Warum nicht einfach<br />eine <span className="serif-it" style={{ color: 'var(--lantern)' }}>App</span>?
          </h2>
          <p className="serif" style={{
            fontSize: 'clamp(18px, 1.3vw, 21px)',
            color: 'rgba(242,233,217,0.78)',
            marginTop: 30, lineHeight: 1.65,
            maxWidth: 660, margin: '30px auto 0',
          }}>
            Weil das, woran sich Kinder später erinnern, selten ein Bildschirm war. Sondern Hände, die etwas bauen. Stimmen, die etwas vorlesen. Und ein Spielzeug, das man <em className="serif-it">selbst</em> bemalt hat.
          </p>
        </div>

        <div style={{ marginTop: 84, display: 'grid', gap: 24, maxWidth: 780, margin: '84px auto 0' }}>
          {moments.map((m, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} contrast-row`} style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr',
              gap: 32, alignItems: 'center',
              padding: '30px 36px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18, color: 'rgba(242,233,217,0.55)',
                textAlign: 'right', lineHeight: 1.5,
                textDecoration: 'line-through', textDecorationColor: 'rgba(242,233,217,0.25)',
              }}>{m.l}</div>
              <div style={{ width: 28, height: 1, background: 'var(--lantern)', opacity: 0.55 }} />
              <div className="serif-it" style={{
                fontSize: 19, color: 'var(--paper)',
                textAlign: 'left', lineHeight: 1.45, fontWeight: 500,
              }}>{m.r}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .contrast-row { grid-template-columns: 1fr !important; text-align: left !important; gap: 12px !important; padding: 22px 24px !important; }
          .contrast-row > div:first-child { text-align: left !important; font-size: 15px !important; }
          .contrast-row > div:nth-child(2) { width: 100% !important; max-width: 40px; }
          .contrast-row > div:last-child { text-align: left !important; font-size: 18px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────
function FAQ() {
  const qs = [
    { q: "Ab welchem Alter ist das erste Kapitel geeignet?", a: "Wir empfehlen 4 bis 9 Jahre. Jüngere Kinder bauen gemeinsam mit Mama oder Papa, ältere meistern das Auto fast allein. Die Geschichte funktioniert für die ganze Familie." },
    { q: "Wie lange dauert ein Abenteuer-Nachmittag?", a: "Die meisten Familien teilen sich auf: ein Abend zum Vorlesen, ein Nachmittag zum Bauen, ein weiterer zum Bemalen. So bleibt der Zauber lange erhalten." },
    { q: "Sind die Farben wirklich sicher für Kinder?", a: "Ja. Alle Wasserfarben sind nach EN71-3 zertifiziert — der europäischen Norm für Kinderspielzeug — speichelfest und lösungsmittelfrei." },
    { q: "Was passiert, wenn ein Teil fehlt?", a: "Schreibt uns ein kurzes Foto — wir schicken kostenlos Ersatz, ohne lange Diskussion. Damit euer Abenteuer nicht ins Stocken gerät." },
    { q: "Brauchen wir Werkzeug oder Kleber?", a: "Nein. Die Holzteile rasten ineinander. Wer es besonders stabil mag, kann einen Tropfen handelsüblichen Holzleim nutzen." },
    { q: "Wann erscheint das nächste Kapitel?", a: "Wir veröffentlichen ein Kapitel pro Saison. Mit unserem Newsletter erfahrt ihr als Erste, wann der nächste Wald, Berg oder Wasserfall ruft." },
    { q: "Wie lange dauert der Versand?", a: "Eure Box wird innerhalb von 2–3 Werktagen verschickt — Versand ab 7 € — und kommt in einer plastikfreien, neutralen Verpackung." },
  ];
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--paper-warm) 0%, var(--paper-warm) 16%, var(--paper-warm) 70%, var(--night) 100%)', padding: '200px 0 240px', position: 'relative', overflow: 'hidden' }} id="faq">
      <LightLeak corner="top-left" color="rgba(244, 182, 107, 0.22)" size={620} />
      <PaperGrain opacity={0.14} />
      {/* trees grow up at the bottom into final CTA */}
      <TransitionForest color="#0F140C" height={260} direction="down" fadeColor="var(--night)" jitter={6} />
      <div className="wrap-tight">
        <div className="reveal" style={{ marginBottom: 56, textAlign: 'center' }}>
          <span className="eyebrow eyebrow-rule">Du fragst, wir antworten</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 4.6vw, 64px)', marginTop: 28, letterSpacing: '-0.018em' }}>
            Häufige Fragen von <span className="serif-it" style={{ color: 'var(--rust)' }}>Eltern</span>.
          </h2>
        </div>
        <div className="reveal reveal-delay-1">
          {qs.map((it, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary>{it.q}</summary>
              <div>{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────
function FinalCTA({ onAdd }) {
  const scrollY = useScrollY();
  const [parallax, setParallax] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const visible = window.innerHeight - rect.top;
    setParallax(Math.max(-60, Math.min(60, visible * 0.08)));
  }, [scrollY]);

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      padding: '220px 0 200px',
      color: 'var(--cream)',
      minHeight: '90vh',
    }}>
      {/* night forest backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(224,138,60,0.45) 0%, rgba(244,182,107,0.15) 35%, transparent 70%), ' +
          'linear-gradient(180deg, var(--night) 0%, var(--night-soft) 60%, #2A3422 100%)',
      }} />
      {/* Forest silhouette near bottom */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%',
        transform: `translateY(${parallax}px)`,
      }}>
        <PineSilhouette color="#0F140C" opacity={1} jitter={4} />
      </div>
      {/* second silhouette layer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%',
        transform: `translateY(${parallax * 0.5}px)`, opacity: 0.7,
      }}>
        <PineSilhouette color="#1E2618" opacity={0.85} jitter={6} />
      </div>

      <FloatingEmbers count={26} />

      <div className="wrap-tight reveal" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>Euer erstes Kapitel</span>
        <h2 className="display" style={{
          fontSize: 'clamp(48px, 7vw, 104px)',
          color: 'var(--paper)',
          letterSpacing: '-0.022em',
          lineHeight: 1.02,
          marginTop: 32,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          Heute beginnt eure erste<br />
          gemeinsame <span className="serif-it" style={{ color: 'var(--lantern)' }}>Schatzsuche</span>.
        </h2>
        <p className="serif" style={{
          fontSize: 'clamp(18px, 1.5vw, 23px)',
          color: 'rgba(242,233,217,0.85)',
          marginTop: 36, lineHeight: 1.55,
          maxWidth: 640, margin: '36px auto 0',
          textShadow: '0 1px 10px rgba(0,0,0,0.4)',
        }}>
          Und vielleicht eine Erinnerung, über die ihr noch in <em className="serif-it" style={{ color: 'var(--paper)' }}>vielen Jahren</em> sprecht.
        </p>

        <div style={{ marginTop: 60 }}>
          <button className="btn btn-primary btn-xl" onClick={onAdd} style={{
            padding: '24px 46px', fontSize: 16,
            boxShadow: '0 20px 50px -16px rgba(178,94,42,0.7), 0 0 60px rgba(244,182,107,0.4)',
          }}>
            Jetzt Abenteuer starten — 39,90 €
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.95 }}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div style={{
          marginTop: 52,
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '14px 28px',
          background: 'rgba(20,24,16,0.45)',
          border: '1px solid rgba(244,182,107,0.32)',
          borderRadius: 999,
          backdropFilter: 'blur(8px)',
          boxShadow: '0 16px 40px -20px rgba(0,0,0,0.5)',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: 'var(--lantern)', boxShadow: '0 0 14px var(--lantern)',
            animation: 'shimmer 3s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 14, color: 'rgba(242,233,217,0.92)', fontWeight: 500 }}>
            Zum ersten Kapitel: der personalisierte Holz-Ordner <em className="serif-it" style={{ color: 'var(--paper)' }}>gratis</em> dazu.
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#0F140C', color: 'rgba(242,233,217,0.7)', padding: '60px 0 40px' }}>
      <div className="wrap" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 20,
      }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/logo-wordmark.png" alt="Popcorn & Freddy" style={{ height: 40, filter: 'invert(1) brightness(0.95)', opacity: 0.85 }} />
        </a>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, flexWrap: 'wrap' }}>
          <a href="index.html#story">Die Geschichte</a>
          <a href="index.html#chapters">Alle Kapitel</a>
          <a href="index.html#faq">Kontakt</a>
          <a href="index.html">Impressum</a>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(242,233,217,0.45)' }}>© 2026 Popcorn & Freddy · Hergestellt in der EU</div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "treeMotion": "statisch"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const peekRef = useRef(null);
  useReveal();

  const handleAdd = () => {
    const t = document.createElement('div');
    t.textContent = '✦  In den Warenkorb gelegt';
    Object.assign(t.style, {
      position: 'fixed', bottom: '40px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'var(--night)', color: 'var(--cream)',
      padding: '16px 30px', borderRadius: '999px',
      fontWeight: '500', fontSize: '14px', letterSpacing: '0.06em',
      boxShadow: '0 24px 50px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,182,107,0.3), 0 0 30px rgba(244,182,107,0.15)',
      zIndex: '100',
      transition: 'opacity 0.5s, transform 0.5s cubic-bezier(.16,.84,.36,1)',
      opacity: '0',
    });
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(-12px)';
      setTimeout(() => t.remove(), 500);
    }, 2400);
  };

  const handlePeek = () => {
    if (!peekRef.current) return;
    const top = peekRef.current.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <ScrollProgress />
      <GlobalAtmosphere />
      <TopBar />
      <Hero onAdd={handleAdd} onPeek={handlePeek} treeMotion={t.treeMotion} />

      <StoryOpening />

      <Interlude attribution="Aus Kapitel 1 · Der Flüsterwald">
        „Manche Wälder erzählen Geschichten. Der Flüsterwald erzählt sie nur den <em>Mutigen</em>."
      </Interlude>

      <WhatsInside />
      <StorybookPreview peekRef={peekRef} />

      <Interlude>
        „Und dann schliefen sie ein — mit Karte und Mut unterm Kissen — und träumten von <em>morgen</em>."
      </Interlude>

      <BuildingTogether />
      <TreasureMap />
      <WhyParentsLove />
      <Testimonials />
      <AppContrast />
      <FAQ />
      <FinalCTA onAdd={handleAdd} />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Baum-Hintergrund (oben)" />
        <TweakSelect
          label="Bewegung"
          value={t.treeMotion}
          options={[
            { value: 'sanft', label: 'Sanft – ruhige Parallaxe' },
            { value: 'wiegen', label: 'Wiegen – sanftes Driften' },
            { value: 'statisch', label: 'Statisch – keine Bewegung' },
            { value: 'original', label: 'Original – kräftig' },
          ]}
          onChange={(v) => setTweak('treeMotion', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
