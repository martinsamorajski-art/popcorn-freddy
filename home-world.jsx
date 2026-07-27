// ────────────────────────────────────────────────────────────────
// Home (cinematic) — Treasure Map, What's Inside, Chapters, Folder
// ────────────────────────────────────────────────────────────────

// ─── ADVENTURE MAP (interactive, cinematic night band) ───────
function HomeMap({ t, lang, onPick }) {
  const stops = [
    { n: 1, x: 19, y: 38, name: 'Der Anfang im Wald', active: true },
    { n: 2, x: 38, y: 24, name: 'Das flüsternde Gebirge' },
    { n: 3, x: 55, y: 26, name: 'Der verborgene Seeturm' },
    { n: 4, x: 82, y: 32, name: 'Die alte Eiche' },
    { n: 5, x: 70, y: 52, name: 'Die Nebelmoore' },
    { n: 6, x: 42, y: 56, name: 'Das verlassene Lager' },
    { n: 7, x: 16, y: 60, name: 'Die Höhle der Zeichen' },
    { n: 8, x: 11, y: 80, name: 'Die stürmische Küste' },
    { n: 9, x: 33, y: 76, name: 'Das Licht am Horizont' },
    { n: 10, x: 54, y: 78, name: 'Der verborgene Dschungel' },
    { n: 11, x: 78, y: 65, name: 'Der Wasserfall der Wahrheit' },
    { n: 12, x: 84, y: 86, name: 'Der Schatz der Freundschaft' },
  ];
  const [hovered, setHovered] = useState(0);
  const active = stops.find(s => s.n === hovered) || stops[0];

  return (
    <section id="map" style={{
      position: 'relative', overflow: 'hidden', padding: '190px 0 210px',
      background: 'linear-gradient(180deg, var(--cream) 0%, #1A2018 15%, #161B14 70%, #1A2018 88%, var(--paper-warm) 100%)',
      color: 'var(--cream)',
    }}>
      <FloatingEmbers count={22} />
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.22)" size={900} />
      <LightLeak corner="bottom-left" color="rgba(135, 163, 152, 0.16)" size={800} />
      <div aria-hidden style={{ position: 'absolute', top: 64, right: 64, zIndex: 2, opacity: 0.4 }}>
        <AnimatedCompass size={140} color="rgba(244, 182, 107, 0.85)" />
      </div>

      <div className="wrap-wide" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 64px' }}>
          <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>{t.map.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(44px, 5.6vw, 80px)', color: 'var(--paper)', marginTop: 26, letterSpacing: '-0.02em' }}>{t.map.title}</h2>
          <p className="serif" style={{ fontSize: 'clamp(17px, 1.3vw, 21px)', color: 'rgba(242,233,217,0.78)', marginTop: 24, lineHeight: 1.6, maxWidth: 660, margin: '24px auto 0' }}>{t.map.sub}</p>
        </div>

        <div className="reveal reveal-delay-1" style={{
          position: 'relative', maxWidth: 1300, margin: '0 auto', borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 80px 140px -40px rgba(0,0,0,0.7), 0 30px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(244,182,107,0.12), 0 0 80px rgba(224,138,60,0.25)',
        }}>
          <div style={{ position: 'relative' }}>
            <img src="assets/adventure-map.png" alt="Schatzkarte mit acht Kapiteln" style={{ width: '100%', display: 'block' }} />

            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen' }}>
              <defs>
                <linearGradient id="routeGradHome" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4B66B" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#E08A3C" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#F4B66B" stopOpacity="0.6" />
                </linearGradient>
                <filter id="routeGlowHome"><feGaussianBlur stdDeviation="0.6" /></filter>
              </defs>
              <polyline points={stops.map(s => `${s.x},${s.y}`).join(' ')} fill="none" stroke="rgba(244, 182, 107, 0.45)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" filter="url(#routeGlowHome)" />
              <polyline points={stops.map(s => `${s.x},${s.y}`).join(' ')} fill="none" stroke="url(#routeGradHome)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1.2 1.6" vectorEffect="non-scaling-stroke" style={{ animation: 'shimmer 4.5s ease-in-out infinite' }} />
            </svg>

            <div style={{ position: 'absolute', inset: 0 }}>
              {stops.map((c) => {
                const isActive = c.n === active.n;
                const isCurrent = c.n === 1;
                return (
                  <button key={c.n} className={`map-marker${isCurrent ? ' current' : ''}`}
                    onMouseEnter={() => setHovered(c.n)} onMouseLeave={() => setHovered(0)}
                    onClick={() => onPick?.(c.n)} aria-label={`Kapitel ${c.n}: ${c.name}`}
                    style={{
                      position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
                      width: isCurrent ? 38 : 26, height: isCurrent ? 38 : 26, borderRadius: '50%',
                      background: isCurrent ? 'radial-gradient(circle, var(--lantern) 30%, var(--ember) 80%)' : 'rgba(20, 24, 16, 0.55)',
                      border: isCurrent ? '2px solid rgba(255,240,200,0.95)' : '1.5px solid rgba(244,182,107,0.65)',
                      boxShadow: isCurrent ? '0 0 24px var(--lantern), 0 0 60px rgba(244,182,107,0.6), 0 4px 10px rgba(0,0,0,0.4)' : (isActive ? '0 0 16px var(--lantern), 0 2px 6px rgba(0,0,0,0.4)' : '0 2px 6px rgba(0,0,0,0.4)'),
                      cursor: 'pointer', transition: 'box-shadow 0.3s var(--ease-out), background 0.3s',
                      transform: `translate(-50%, -50%) scale(${isActive && !isCurrent ? 1.25 : 1})`,
                      display: 'grid', placeItems: 'center', fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                      fontSize: isCurrent ? 16 : 13, fontWeight: 700, color: isCurrent ? 'var(--ink)' : 'var(--lantern)',
                      animation: isCurrent ? 'shimmer 3s ease-in-out infinite' : 'none',
                    }}>{c.n}</button>
                );
              })}
            </div>

            <div className="map-info" style={{ position: 'absolute', left: 24, bottom: 24, zIndex: 5, background: 'rgba(20, 24, 16, 0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(244,182,107,0.32)', borderRadius: 12, padding: '18px 24px', minWidth: 280, maxWidth: 360, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)' }}>
              <div className="eyebrow" style={{ color: 'var(--lantern)', fontSize: 10, marginBottom: 8 }}>
                {active.n === 1 ? (lang === 'de' ? 'Aktuelles Kapitel' : 'Current chapter') : `${lang === 'de' ? 'Kapitel' : 'Chapter'} ${String(active.n).padStart(2, '0')}`}
              </div>
              <div className="serif-it" style={{ fontSize: 22, color: 'var(--paper)', fontWeight: 600, lineHeight: 1.25 }}>{active.name}</div>
              {active.n === 1 && <div style={{ fontSize: 13, color: 'rgba(242,233,217,0.7)', marginTop: 8 }}>{lang === 'de' ? 'Eure erste Box wartet auf euch.' : 'Your first box is waiting.'}</div>}
            </div>

            <div className="hand map-corner-label" style={{ position: 'absolute', top: 24, right: 28, zIndex: 5, fontSize: 14, color: 'rgba(242,233,217,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              12 {lang === 'de' ? 'Kapitel · 1 Schatz' : 'Chapters · 1 treasure'}
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-2" style={{ marginTop: 44, textAlign: 'center', fontSize: 14, color: 'rgba(242,233,217,0.65)' }}>
          <span className="hand" style={{ fontSize: 18, color: 'var(--lantern)' }}>★</span>{' '}
          <span style={{ fontStyle: 'italic' }}>{t.map.poke}</span>
        </div>
      </div>
    </section>
  );
}

// ─── WHAT'S INSIDE ───────────────────────────────────────────
function HomeInside({ t }) {
  return (
    <section id="inside" style={{
      position: 'relative', overflow: 'hidden', padding: '170px 0 190px',
      background: 'radial-gradient(ellipse at 18% 14%, rgba(244, 215, 170, 0.5) 0%, transparent 55%), radial-gradient(ellipse at 88% 88%, rgba(168, 136, 100, 0.3) 0%, transparent 50%), linear-gradient(180deg, var(--paper-warm) 0%, var(--paper-deep) 100%)',
    }}>
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.3)" size={760} />
      <PaperGrain opacity={0.2} />
      <div aria-hidden style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.06, pointerEvents: 'none', zIndex: 0 }}>
        <AnimatedCompass size={260} color="rgba(110, 76, 46, 1)" />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 84px' }}>
          <span className="eyebrow eyebrow-rule">{t.inside.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', marginTop: 26, letterSpacing: '-0.018em', color: 'var(--ink)' }}>{t.inside.title}</h2>
          <p className="serif" style={{ fontSize: 'clamp(17px, 1.3vw, 20px)', color: 'var(--ink-soft)', marginTop: 22, lineHeight: 1.65, maxWidth: 640, margin: '22px auto 0', fontStyle: 'italic' }}>{t.inside.body}</p>
        </div>

        <div className="inside-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 90, alignItems: 'center' }}>
          <div className="reveal" style={{ position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', inset: '-8% -10%', background: 'radial-gradient(ellipse at 50% 50%, rgba(224, 138, 60, 0.28) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
            <div className="img-card" style={{ position: 'relative', zIndex: 1, transform: 'rotate(-1.4deg)' }}>
              <img src="assets/box-contents.png" alt="Inhalt der Box" style={{ width: '100%' }} />
            </div>
            <div className="hand" style={{ position: 'absolute', bottom: -22, right: -8, transform: 'rotate(5deg)', padding: '9px 14px 10px', background: 'var(--lantern)', color: 'var(--ink)', fontSize: 16, lineHeight: 1.2, borderRadius: 2, boxShadow: '0 12px 24px -10px rgba(33,28,24,0.32)', zIndex: 3, maxWidth: 170, border: '1px solid rgba(33,28,24,0.08)' }}>
              {t.inside.sub}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 22 }}>
            {t.inside.itemsHeading && (
              <h3 className="serif-it reveal" style={{ fontSize: 26, color: 'var(--rust)', fontWeight: 600, lineHeight: 1.1, marginBottom: 4 }}>{t.inside.itemsHeading}</h3>
            )}
            {t.inside.items.map((it, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
                display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, alignItems: 'start',
                paddingBottom: i < t.inside.items.length - 1 ? 22 : 0,
                borderBottom: i < t.inside.items.length - 1 ? '1px solid rgba(110,76,46,0.18)' : 'none',
              }}>
                <div className="serif-it" style={{ fontSize: 30, color: 'var(--rust)', lineHeight: 1, paddingTop: 2, fontWeight: 600 }}>{it.n}</div>
                <div>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25 }}>{it.t}</h3>
                  <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', marginTop: 7, lineHeight: 1.6 }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTERS ────────────────────────────────────────────────
function HomeChapters({ t, lang, onAdd }) {
  const chapters = [
    { n: 1, name_de: 'Der Flüsterwald', name_en: 'The Whispering Woods', toy_de: 'Auto-Bausatz', toy_en: 'Car kit', img: 'assets/chapter-1-cover.png', tag: 'tag2' },
    { n: 2, preview: true, name_de: 'Das flüsternde Gebirge', name_en: 'The Whispering Mountains', img: 'assets/chapter-2-cover.png', release_key: 'locked_release_2' },
    { n: 3, locked: true, release_key: 'locked_release_3' },
  ];
  return (
    <section id="chapters" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0 180px', background: 'linear-gradient(180deg, var(--paper-deep) 0%, var(--paper) 30%, var(--paper) 100%)' }}>
      <PaperGrain opacity={0.14} />
      <LightLeak corner="top-left" color="rgba(244, 182, 107, 0.2)" size={640} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 26, marginBottom: 64 }}>
          <div style={{ maxWidth: 700 }}>
            <span className="eyebrow eyebrow-rule">{t.chapters.eyebrow}</span>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 66px)', marginTop: 22, letterSpacing: '-0.018em', color: 'var(--ink)' }}>{t.chapters.title}</h2>
          </div>
          <p className="serif" style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: 380, lineHeight: 1.6, fontStyle: 'italic' }}>{t.chapters.sub}</p>
        </div>

        <div className="chap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
          {chapters.map((c) => c.locked
            ? <HomeLockedChapter key={c.n} c={c} t={t} lang={lang} />
            : c.preview
            ? <HomePreviewChapter key={c.n} c={c} t={t} lang={lang} />
            : (
              <a key={c.n} href="Der Fluesterwald v3.html" className="chap-card reveal" style={{ display: 'block', color: 'inherit', background: 'var(--cream)', borderRadius: 18, padding: 16, border: '1px solid rgba(33,28,24,0.08)', boxShadow: '0 30px 60px -34px rgba(33,28,24,0.3)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -13, left: 22, zIndex: 5, background: 'var(--rust)', color: 'var(--paper)', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', boxShadow: '0 8px 18px -8px rgba(178,94,42,0.7)' }}>{t.chapters[c.tag]}</div>
                <div className="img-card" style={{ borderRadius: 12 }}>
                  <img src={c.img} alt={c[`name_${lang}`]} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(20,24,16,0.78)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '5px 13px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, fontSize: 16, color: 'var(--lantern)', zIndex: 2 }}>#{String(c.n).padStart(2, '0')}</div>
                </div>
                <div style={{ padding: '22px 8px 8px' }}>
                  <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{c[`name_${lang}`]}</h3>
                  <div className="eyebrow" style={{ marginTop: 8, color: 'var(--ink-mute)' }}>+ {c[`toy_${lang}`]}</div>
                  <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
                    <div>
                      <div className="eyebrow" style={{ color: 'var(--ink-mute)' }}>{t.chapters.price_from}</div>
                      <div className="display" style={{ fontSize: 32, color: 'var(--rust)', marginTop: 2 }}>{t.chapters.price}</div>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '13px 20px', fontSize: 13 }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(c); }}>+ {t.chapters.cta}</button>
                  </div>
                </div>
              </a>
            ))}
        </div>

        {/* includes box */}
        <div className="reveal" style={{ marginTop: 56, background: 'var(--cream)', borderRadius: 18, padding: '34px 38px', border: '1px solid rgba(33,28,24,0.08)', boxShadow: '0 30px 60px -36px rgba(33,28,24,0.26)' }}>
          <div className="serif-it" style={{ fontSize: 24, color: 'var(--ink)', fontWeight: 600, marginBottom: 18 }}>{t.chapters.includes}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px 34px' }}>
            {t.chapters.bullets.map((b, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 16, color: 'var(--ink-soft)' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--rust)', color: 'var(--paper)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800 }}>✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePreviewChapter({ c, t, lang }) {
  return (
    <div className="chap-card reveal" style={{ display: 'block', background: 'var(--cream)', borderRadius: 18, padding: 16, border: '1px solid rgba(33,28,24,0.08)', boxShadow: '0 30px 60px -34px rgba(33,28,24,0.3)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -13, left: 22, zIndex: 5, background: 'var(--night)', color: 'var(--lantern)', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
        <span aria-hidden>✦</span> {t.chapters.locked_tag}
      </div>
      <div className="img-card" style={{ borderRadius: 12, position: 'relative' }}>
        <img src={c.img} alt={c[`name_${lang}`]} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', display: 'block' }} />
        {/* soft "coming soon" veil */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,24,16,0) 40%, rgba(20,24,16,0.42) 100%)' }} />
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(20,24,16,0.78)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '5px 13px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, fontSize: 16, color: 'var(--lantern)', zIndex: 2 }}>#{String(c.n).padStart(2, '0')}</div>
        <div className="serif-it" style={{ position: 'absolute', left: 18, bottom: 16, zIndex: 2, fontSize: 15, color: 'var(--lantern)', textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>{t.chapters[c.release_key]}</div>
      </div>
      <div style={{ padding: '22px 8px 8px' }}>
        <div className="eyebrow" style={{ color: 'var(--rust)' }}>{t.chapters.locked_eyebrow}</div>
        <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', marginTop: 8 }}>{c[`name_${lang}`]}</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>{t.chapters.locked_hint}</p>
        <div style={{ marginTop: 18 }}>
          <a href="#faq" className="btn btn-ghost" style={{ padding: '12px 20px', fontSize: 13 }}>{t.chapters.locked_cta} →</a>
        </div>
      </div>
    </div>
  );
}

function HomeLockedChapter({ c, t, lang }) {
  return (
    <div className="reveal" style={{ background: 'var(--cream)', borderRadius: 18, padding: 16, border: '1px dashed rgba(33,28,24,0.28)', boxShadow: '0 30px 60px -38px rgba(33,28,24,0.25)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: -13, left: 22, zIndex: 5, background: 'var(--night)', color: 'var(--lantern)', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
        <span aria-hidden>🔒</span> {t.chapters.locked_tag}
      </div>
      <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', aspectRatio: '4/5', background: 'repeating-linear-gradient(135deg, rgba(33,28,24,0.05) 0 2px, transparent 2px 16px), linear-gradient(160deg, var(--parchment) 0%, var(--parchment-warm) 100%)', display: 'grid', placeItems: 'center', border: '1px solid rgba(33,28,24,0.1)' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: 0.12 }}>
          <AnimatedCompass size={180} color="#4A331C" />
        </div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px' }}>
          <div className="display" style={{ fontSize: 120, lineHeight: 0.9, color: 'var(--bark-deep)', textShadow: '3px 3px 0 rgba(250,244,232,0.5)' }}>?</div>
          <div className="serif-it" style={{ fontSize: 19, color: 'var(--bark-deep)', marginTop: 4 }}>{lang === 'de' ? 'Kapitel' : 'Chapter'} {c.n}</div>
        </div>
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(20,24,16,0.7)', borderRadius: 999, padding: '5px 13px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600, fontSize: 16, color: 'var(--lantern)' }}>#{String(c.n).padStart(2, '0')}</div>
      </div>
      <div style={{ padding: '22px 8px 8px' }}>
        <div className="eyebrow" style={{ color: 'var(--rust)' }}>{t.chapters.locked_eyebrow}</div>
        <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'pre-line', marginTop: 8, lineHeight: 1.15 }}>{t.chapters.locked_title}</h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>{t.chapters.locked_hint}</p>
        <div style={{ marginTop: 18 }}>
          <a href="#faq" className="btn btn-ghost" style={{ padding: '12px 20px', fontSize: 13 }}>{t.chapters.locked_cta} →</a>
        </div>
      </div>
    </div>
  );
}

// ─── FOLDER (dark night centerpiece) ─────────────────────────
function HomeFolder({ t }) {
  const f = t.family;
  return (
    <section id="folder" style={{ position: 'relative', overflow: 'hidden', padding: '180px 0', color: 'var(--cream)', background: 'radial-gradient(ellipse at 70% 30%, rgba(244,182,107,0.18) 0%, transparent 55%), linear-gradient(180deg, var(--night) 0%, var(--night-soft) 60%, #2A3422 100%)' }}>
      <style>{`
        .family-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
        .family-card { position: relative; padding: 46px 42px; border-radius: 4px; background: linear-gradient(165deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%); border: 1px solid rgba(244,182,107,0.16); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 50px -30px rgba(0,0,0,0.7); transition: border-color 0.5s var(--ease-out), transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out); overflow: hidden; }
        .family-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 18% 0%, rgba(244,182,107,0.16) 0%, transparent 55%); opacity: 0; transition: opacity 0.6s var(--ease-out); pointer-events: none; }
        .family-card:hover { border-color: rgba(244,182,107,0.42); transform: translateY(-4px); box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 70px -34px rgba(0,0,0,0.85); }
        .family-card:hover::before { opacity: 1; }
        @media (max-width: 860px) { .family-grid { grid-template-columns: minmax(0, 1fr); gap: 18px; } .family-card { padding: 38px 32px; } }
      `}</style>
      <FloatingEmbers count={16} />
      <LightLeak corner="top-right" color="rgba(244, 182, 107, 0.26)" size={760} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 76px' }}>
          <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>{f.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 70px)', color: 'var(--paper)', marginTop: 24, letterSpacing: '-0.018em', lineHeight: 1.04 }}>{f.title}</h2>
          <p className="serif" style={{ fontSize: 'clamp(18px,1.4vw,22px)', color: 'rgba(242,233,217,0.82)', marginTop: 24, lineHeight: 1.65, fontStyle: 'italic', maxWidth: 600, marginInline: 'auto' }}>{f.sub}</p>
        </div>

        <div className="family-grid">
          {f.cards.map((c, i) => (
            <div key={i} className={`family-card reveal reveal-delay-${(i % 2) + 1}`}>
              <div aria-hidden style={{ fontSize: 38, lineHeight: 1, marginBottom: 22 }}>{c.icon}</div>
              <h3 className="serif" style={{ fontSize: 'clamp(24px, 2.2vw, 30px)', fontWeight: 600, color: 'var(--paper)', lineHeight: 1.18, letterSpacing: '-0.01em' }}>{c.t}</h3>
              <p style={{ fontSize: 17, color: 'rgba(242,233,217,0.74)', marginTop: 16, lineHeight: 1.7, maxWidth: 420 }}>{c.d}</p>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 96, position: 'relative' }}>
          <span aria-hidden className="serif-it" style={{ display: 'block', fontSize: 64, color: 'rgba(244,182,107,0.4)', lineHeight: 0.5, marginBottom: 14 }}>„</span>
          <p className="serif-it" style={{ fontSize: 'clamp(28px, 3.4vw, 46px)', color: 'var(--paper)', lineHeight: 1.32, maxWidth: 880, margin: '0 auto', fontWeight: 500 }}>
            {f.quote_a}<br />
            <span style={{ color: 'var(--lantern)' }}>{f.quote_b}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomeMap, HomeInside, HomeChapters, HomePreviewChapter, HomeLockedChapter, HomeFolder });
