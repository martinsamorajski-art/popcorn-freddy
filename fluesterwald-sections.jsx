// ────────────────────────────────────────────────────────────────
// Der Flüsterwald — premium cinematic body sections
// ────────────────────────────────────────────────────────────────

// ─── HELPERS ────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub, align = 'center', maxWidth = 720 }) {
  return (
    <div className="reveal" style={{
      textAlign: align,
      maxWidth, margin: align === 'center' ? '0 auto' : 0,
      marginBottom: 72,
    }}>
      {eyebrow && (
        <div className="eyebrow" style={{
          color: 'var(--rust)',
          marginBottom: 22,
          display: 'inline-flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 28, height: 1, background: 'var(--rust)', opacity: 0.7 }} />
          {eyebrow}
          <span style={{ width: 28, height: 1, background: 'var(--rust)', opacity: 0.7 }} />
        </div>
      )}
      <h2 className="display" style={{
        fontSize: 'clamp(38px, 4.4vw, 64px)',
        color: 'var(--ink)',
        letterSpacing: '-0.015em',
      }}>{title}</h2>
      {sub && (
        <p className="serif" style={{
          fontSize: 'clamp(17px, 1.3vw, 20px)',
          color: 'var(--ink-soft)',
          marginTop: 24,
          lineHeight: 1.6,
          maxWidth: 640,
          margin: align === 'center' ? '24px auto 0' : '24px 0 0',
        }}>{sub}</p>
      )}
    </div>
  );
}

// ─── 1. WHAT'S INSIDE ───────────────────────────────────────
function WhatsInside() {
  const items = [
    { n: "01", t: "Das Abenteuer-Kapitel", d: "32 liebevoll illustrierte Seiten voller Rätsel, Entscheidungen und magischer Momente zum Vorlesen." },
    { n: "02", t: "Das Holzspielzeug zum Zusammenbauen", d: "Ein echtes Fahrzeug aus FSC-Holz, das Popcorn & Freddy auf ihrer Reise brauchen." },
    { n: "03", t: "Farben & Pinsel", d: "Damit jedes Abenteuer seine eigenen Farben bekommt." },
    { n: "04", t: "Die Schatzkarte", d: "Gefaltet wie eine echte Entdeckerkarte — und voller Geheimnisse." },
    { n: "05", t: "Schritt-für-Schritt-Anleitung", d: "Einfach erklärt für kleine Entdeckerhände." },
    { n: "06", t: "Sticker & kleine Überraschungen", d: "Damit schon das Öffnen der Box zum Erlebnis wird." },
  ];
  return (
    <section style={{ background: 'var(--paper-warm)', padding: '160px 0', position: 'relative' }}>
      <div className="wrap">
        <SectionHeader
          eyebrow="Was in der Box steckt"
          title={<>Alles, was ihr für euer erstes <span className="serif-it" style={{ color: 'var(--rust)' }}>Abenteuer</span> braucht.</>}
          sub="Kein Bildschirm. Kein Plastikspielzeug-Chaos. Nur Geschichten, Holz, Farben und gemeinsame Zeit."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'start' }} className="inside-grid">
          {/* image */}
          <div className="reveal" style={{ position: 'relative' }}>
            <div className="img-card">
              <img src="assets/box-contents.png" alt="Was in der Popcorn & Freddy Box steckt" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* list */}
          <div style={{ display: 'grid', gap: 28 }}>
            {items.map((it, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
                display: 'grid', gridTemplateColumns: '54px 1fr',
                gap: 24, alignItems: 'start',
                paddingBottom: i < items.length - 1 ? 28 : 0,
                borderBottom: i < items.length - 1 ? '1px solid rgba(33,28,24,0.08)' : 'none',
              }}>
                <div className="serif-it" style={{
                  fontSize: 28, color: 'var(--rust)',
                  lineHeight: 1, paddingTop: 2,
                }}>{it.n}</div>
                <div>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.005em' }}>{it.t}</h3>
                  <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.65, maxWidth: 460 }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .inside-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── 2. STORY ───────────────────────────────────────────────
function Story() {
  return (
    <section id="story" style={{
      background: 'var(--paper)', padding: '180px 0', position: 'relative', overflow: 'hidden',
    }}>
      {/* atmospheric: tiny falling leaves only in this section */}
      <Leaf size={32} className="float-slow" style={{ position: 'absolute', top: 120, left: '6%', opacity: 0.4 }} color="var(--moss)" />
      <Leaf size={26} className="drift" style={{ position: 'absolute', bottom: 200, right: '8%', opacity: 0.35 }} color="var(--rust)" />

      <div className="wrap-tight">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 24 }}>Die Geschichte</div>
          <h2 className="display" style={{ fontSize: 'clamp(42px, 5.2vw, 76px)', color: 'var(--ink)', letterSpacing: '-0.018em' }}>
            Der Wald flüstert<br />
            <span className="serif-it" style={{ color: 'var(--rust)' }}>ihren Namen</span>.
          </h2>
        </div>

        <div className="reveal reveal-delay-1" style={{
          display: 'grid', gap: 26, fontSize: 'clamp(18px, 1.35vw, 21px)',
          lineHeight: 1.75, color: 'var(--ink-soft)',
          maxWidth: 720, margin: '0 auto',
          fontFamily: 'var(--font-serif)', fontWeight: 400,
        }}>
          <p>Tief zwischen alten Eichen beginnt das erste Abenteuer von <em style={{ color: 'var(--ink)' }}>Popcorn & Freddy</em>.</p>
          <p>Als die beiden Freunde eine geheimnisvolle Schatzkarte finden, führt sie ihr Weg in den Flüsterwald — einen Ort voller Rätsel, versteckter Pfade und alter Geheimnisse.</p>
          <p>Doch sie schaffen die Reise nicht allein.</p>
          <p>Um den ersten Hinweis zu erreichen, brauchen sie ein Fahrzeug. Und genau hier beginnt eure gemeinsame Mission.</p>
          <p>Mit deinen Händen, deinen Farben und deiner Fantasie hilfst du Popcorn & Freddy dabei, ihr erstes Abenteuerfahrzeug zu bauen — <em style={{ color: 'var(--ink)' }}>und wirst selbst Teil der Geschichte</em>.</p>
        </div>

        {/* Cinematic quote */}
        <div className="reveal reveal-delay-2" style={{
          marginTop: 96,
          maxWidth: 820, marginInline: 'auto',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 84, color: 'var(--rust)',
            lineHeight: 0.5, marginBottom: 14, opacity: 0.7,
          }}>„</div>
          <blockquote className="serif-it" style={{
            margin: 0,
            fontSize: 'clamp(26px, 3.2vw, 42px)',
            lineHeight: 1.3,
            color: 'var(--ink)',
            letterSpacing: '-0.005em',
            fontWeight: 500,
          }}>
            Manche Wälder erzählen Geschichten.<br />
            Der Flüsterwald erzählt sie nur den <span style={{ color: 'var(--rust)' }}>Mutigen</span>.
          </blockquote>
          <div className="eyebrow" style={{ marginTop: 30, color: 'var(--ink-mute)' }}>
            Kapitel 1 · Der Flüsterwald
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. SNEAK PEEK ──────────────────────────────────────────
function SneakPeek({ peekRef }) {
  const pages = [
    { src: "assets/book-page-1.png", title: "Seite 01", caption: "Wo alles beginnt — Popcorn und Freddy am Bach vor ihrem kleinen Haus." },
    { src: "assets/book-page-2.png", title: "Seite 02", caption: "Die alte Karte. Versteckt in einem Baumstamm, mit einem roten X." },
    { src: "assets/book-page-3.png", title: "Seite 03", caption: "Die Nacht vor dem Aufbruch. Zwei aufgeregte Freunde packen ihre Rucksäcke." },
    { src: "assets/book-page-4.png", title: "Seite 04", caption: "Dein Kind entscheidet: welche fünf Dinge nehmen die beiden mit?", tag: "Mitmach-Seite" },
  ];
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((idx + 1) % pages.length);
  const prev = () => setIdx((idx - 1 + pages.length) % pages.length);
  const p = pages[idx];

  return (
    <section ref={peekRef} style={{ background: 'var(--paper-deep)', padding: '160px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap">
        <SectionHeader
          eyebrow="Sneak Peek"
          title={<>Werft einen Blick<br />ins <span className="serif-it" style={{ color: 'var(--rust)' }}>erste Kapitel</span>.</>}
          sub="Jede Seite verbindet Vorlesen, Abenteuer und kleine Mitmach-Momente — damit Kinder nicht nur zuhören, sondern wirklich Teil der Geschichte werden."
        />

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 90, alignItems: 'center' }} className="peek-grid">
          {/* Left: meta + thumbs */}
          <div className="reveal">
            <div className="serif-it" style={{ fontSize: 64, lineHeight: 1, color: 'var(--rust)', letterSpacing: '-0.02em' }}>
              {String(idx + 1).padStart(2, '0')}
              <span style={{ color: 'var(--ink-mute)', opacity: 0.45, fontSize: 36 }}> / 32</span>
            </div>
            <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, marginTop: 22, color: 'var(--ink)', letterSpacing: '-0.005em' }}>
              {p.title}
              {p.tag && (
                <span style={{
                  marginLeft: 14, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 999, color: 'var(--rust)',
                  border: '1px solid rgba(178,94,42,0.32)', verticalAlign: 'middle',
                  background: 'rgba(178,94,42,0.06)',
                }}>{p.tag}</span>
              )}
            </h3>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.7, maxWidth: 420 }}>
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

          {/* Right: featured page */}
          <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-6% -8% -8% -8%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(216,136,64,0.22) 0%, transparent 72%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />
            {/* shadow page peek behind */}
            <div style={{
              position: 'absolute', top: '3%', left: '-2.5%', width: '100%', height: '96%',
              background: 'var(--cream)', borderRadius: 10,
              transform: 'rotate(-2deg)', opacity: 0.6, zIndex: 0,
              boxShadow: '0 20px 40px -20px rgba(33,28,24,0.3)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <img
                key={idx}
                src={p.src}
                alt={p.title}
                style={{
                  width: '100%', borderRadius: 10,
                  boxShadow: '0 60px 100px -40px rgba(33,28,24,0.5), 0 20px 40px -16px rgba(33,28,24,0.3)',
                  animation: 'page-flip 0.7s var(--ease-out)',
                }}
              />
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
          .peek-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .peek-grid > div:last-child { max-width: 480px; margin: 0 auto; order: -1; }
        }
      `}</style>
    </section>
  );
}

// ─── 4. TOY ─────────────────────────────────────────────────
function Toy() {
  const tags = [
    { i: "🪵", l: "FSC-Holz" },
    { i: "🎨", l: "Bemalbar" },
    { i: "🔧", l: "Einfach zusammenbaubar" },
    { i: "💛", l: "Für kleine Entdeckerhände" },
  ];
  return (
    <section style={{
      background: 'linear-gradient(180deg, var(--paper-warm) 0%, var(--cream) 100%)',
      padding: '180px 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 100, alignItems: 'center' }} className="toy-grid">
          <div className="reveal">
            <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 24 }}>Das Spielzeug</div>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 68px)', letterSpacing: '-0.018em' }}>
              Das erste Fahrzeug der<br />
              <span className="serif-it" style={{ color: 'var(--rust)' }}>Schatzsuche</span>.
            </h2>
            <p className="serif-it" style={{
              fontSize: 22, color: 'var(--ink-soft)', marginTop: 22, lineHeight: 1.55, fontWeight: 500,
            }}>
              Gemeinsam gebaut. Gemeinsam bemalt. Gemeinsam erinnert.
            </p>
            <div style={{ display: 'grid', gap: 18, marginTop: 36, fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 520 }}>
              <p>Lasergeschnitten aus europäischem FSC-Holz und so gestaltet, dass Kinder es gemeinsam mit Mama, Papa oder Großeltern Stück für Stück zusammensetzen können.</p>
              <p>Und danach beginnt der schönste Teil: <em className="serif-it" style={{ color: 'var(--ink)' }}>Farben auswählen, bemalen und das Fahrzeug zum Leben erwecken.</em></p>
            </div>

            <div style={{ marginTop: 44, display: 'flex', flexWrap: 'wrap', gap: '12px 18px' }}>
              {tags.map((t, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 18px', borderRadius: 999,
                  background: 'var(--paper)', border: '1px solid rgba(33,28,24,0.12)',
                  fontSize: 14, color: 'var(--ink-soft)', fontWeight: 500,
                }}>
                  <span style={{ fontSize: 16 }}>{t.i}</span> {t.l}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-6% -8% -8% -8%',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(216,136,64,0.24) 0%, transparent 72%)',
              filter: 'blur(40px)', zIndex: 0,
            }} />
            <div className="img-card" style={{ position: 'relative', zIndex: 1 }}>
              <img src="assets/scene-table.png" alt="Das fertig gebaute Holz-Fahrzeug" style={{
                width: '100%', display: 'block', aspectRatio: '4/3', objectFit: 'cover',
              }} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) {
          .toy-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── 5. ABLAUF ──────────────────────────────────────────────
function Ablauf() {
  const steps = [
    { n: "01", t: "Box öffnen", d: "Die Schatzkarte ausrollen, Farben bereitstellen und gemeinsam eintauchen." },
    { n: "02", t: "Geschichte lesen", d: "Lernt Popcorn & Freddy kennen und entdeckt das erste Rätsel." },
    { n: "03", t: "Gemeinsam bauen", d: "Stück für Stück entsteht das Fahrzeug für die Reise durch den Flüsterwald." },
    { n: "04", t: "Spielen & erinnern", d: "Das fertige Spielzeug wird Teil eurer eigenen Abenteuerwelt zuhause." },
  ];
  return (
    <section style={{ background: 'var(--paper)', padding: '160px 0', position: 'relative' }}>
      <div className="wrap">
        <SectionHeader
          eyebrow="Der Ablauf"
          title={<>So beginnt euer <span className="serif-it" style={{ color: 'var(--rust)' }}>Abenteuer</span>.</>}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48, position: 'relative' }} className="ablauf-grid">
          {/* connecting hairline */}
          <div className="ablauf-line" style={{
            position: 'absolute', left: '10%', right: '10%', top: 32, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(178,94,42,0.4), rgba(178,94,42,0.4), transparent)',
            zIndex: 0,
          }} />
          {steps.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--paper)', border: '1px solid rgba(178,94,42,0.35)',
                margin: '0 auto', display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 600,
                fontSize: 22, color: 'var(--rust)',
                boxShadow: '0 8px 24px -10px rgba(178,94,42,0.3)',
              }}>{s.n}</div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginTop: 24, color: 'var(--ink)', letterSpacing: '-0.005em' }}>{s.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.7, maxWidth: 240, marginInline: 'auto' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .ablauf-grid { grid-template-columns: 1fr 1fr !important; row-gap: 56px !important; }
          .ablauf-line { display: none; }
        }
        @media (max-width: 520px) {
          .ablauf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── 6. BENEFITS ────────────────────────────────────────────
function Benefits() {
  const items = [
    { i: "📵", t: "Bildschirmfreie Zeit, die sich besonders anfühlt.", d: "Nicht noch ein Spielzeug, das nach zwei Tagen vergessen wird — sondern echte gemeinsame Zeit." },
    { i: "💬", t: "Geschichten, die Gespräche öffnen.", d: "Kinder stellen Fragen, treffen Entscheidungen und tauchen emotional in die Welt ein." },
    { i: "✋", t: "Fördert Kreativität & Konzentration.", d: "Bauen, bemalen und entdecken verbindet Fantasie mit echten Erfolgserlebnissen." },
    { i: "🗄️", t: "Ein Erinnerungsstück fürs Kinderzimmer.", d: "Jedes Kapitel bleibt. Jedes Spielzeug erzählt später seine eigene Geschichte." },
  ];
  return (
    <section style={{ background: 'var(--cream)', padding: '180px 0', position: 'relative' }}>
      <div className="wrap">
        <SectionHeader
          eyebrow="Warum Eltern es lieben"
          title={<>Warum Familien immer wieder zurück in den <span className="serif-it" style={{ color: 'var(--rust)' }}>Flüsterwald</span> wollen.</>}
          maxWidth={840}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="benefit-grid">
          {items.map((b, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{
              padding: '36px 0',
              borderTop: '1px solid rgba(33,28,24,0.1)',
              display: 'grid', gridTemplateColumns: '52px 1fr', gap: 24, alignItems: 'start',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--paper)', border: '1px solid rgba(33,28,24,0.1)',
                display: 'grid', placeItems: 'center', fontSize: 24,
              }}>{b.i}</div>
              <div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, letterSpacing: '-0.005em' }}>{b.t}</h3>
                <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 12, lineHeight: 1.7 }}>{b.d}</p>
              </div>
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

// ─── 7. MATERIALS ──────────────────────────────────────────
function Materials() {
  const badges = [
    { i: "🌳", t: "FSC-zertifiziertes Holz aus Europa" },
    { i: "🎨", t: "EN71-zertifizierte Farben" },
    { i: "🇪🇺", t: "Hergestellt in der EU" },
    { i: "📦", t: "Plastikfrei verpackt" },
  ];
  return (
    <section style={{ background: 'var(--paper-warm)', padding: '140px 0', position: 'relative' }}>
      <div className="wrap-tight" style={{ textAlign: 'center' }}>
        <SectionHeader
          eyebrow="Material & Sicherheit"
          title={<>Mit Liebe für <span className="serif-it" style={{ color: 'var(--rust)' }}>Kinderhände</span> entwickelt.</>}
          sub="Jede Box wird so gestaltet, als würden wir sie unseren eigenen Kindern geben."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="mat-grid">
          {badges.map((b, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              padding: '32px 22px',
              background: 'var(--paper)', borderRadius: 14,
              border: '1px solid rgba(33,28,24,0.08)',
              boxShadow: '0 24px 40px -24px rgba(33,28,24,0.2)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 36 }}>{b.i}</div>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 16, fontWeight: 500, lineHeight: 1.5 }}>{b.t}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) {
          .mat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── 8. TESTIMONIALS ──────────────────────────────────────
function Testimonials() {
  const items = [
    { q: "Wir haben das Auto gemeinsam in einer Stunde fertig gehabt — und Lina hat noch im Bett weitergelesen. Heute morgen war das Erste, was sie wissen wollte, wie es im Flüsterwald weitergeht.", n: "Carolin & Lina (5)", c: "Hamburg" },
    { q: "Wir haben drei Kinder. Alle drei haben mitgebaut. Und ehrlich — selbst ich war beim Vorlesen so im Wald, dass ich kurz vergessen habe, dass es 19 Uhr ist.", n: "Markus & Familie", c: "Wien" },
    { q: "Endlich etwas, das nicht nach zwei Tagen in der Spielzeugkiste verschwindet. Das Auto steht jetzt im Regal — neben der Schatzkarte. Wir warten auf Kapitel 2.", n: "Familie Engel", c: "Zürich" },
  ];
  return (
    <section style={{ background: 'var(--paper)', padding: '160px 0', position: 'relative' }}>
      <div className="wrap">
        <SectionHeader
          eyebrow="Familien-Erinnerungen"
          title={<>Familien auf der ganzen Welt reisen bereits mit <span className="serif-it" style={{ color: 'var(--rust)' }}>Popcorn & Freddy</span>.</>}
          maxWidth={860}
        />
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

// ─── 9. CONTRAST (replaces app comparison table) ──────────
function AppContrast() {
  const moments = [
    { l: "Ein Tablet zeigt eine Geschichte.", r: "Eine Box lädt eure Familie in eine ein." },
    { l: "Eine App nimmt Aufmerksamkeit.", r: "Ein Buch schenkt euch eine.", },
    { l: "Plastikspielzeug verschwindet in der Kiste.", r: "Eure Holz-Erinnerungen bleiben im Regal." },
  ];
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '180px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 20% 0%, rgba(216,136,64,0.18) 0%, transparent 50%), ' +
          'radial-gradient(ellipse at 80% 100%, rgba(135,163,152,0.14) 0%, transparent 55%)',
        pointerEvents: 'none', opacity: 0.9,
      }} />
      <div className="wrap-tight" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="reveal">
          <div className="eyebrow" style={{ color: 'var(--peach)', marginBottom: 24 }}>Im Vergleich</div>
          <h2 className="display" style={{ fontSize: 'clamp(42px, 5.4vw, 78px)', color: 'var(--cream)', letterSpacing: '-0.018em' }}>
            Warum nicht einfach<br />eine <span className="serif-it" style={{ color: 'var(--peach)' }}>App</span>?
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
            <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
              display: 'grid', gridTemplateColumns: '1fr auto 1fr',
              gap: 32, alignItems: 'center',
              padding: '30px 36px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
            }} className="contrast-row">
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 18, color: 'rgba(242,233,217,0.55)',
                textAlign: 'right', lineHeight: 1.5,
                textDecoration: 'line-through', textDecorationColor: 'rgba(242,233,217,0.25)',
              }}>{m.l}</div>
              <div style={{ width: 28, height: 1, background: 'var(--peach)', opacity: 0.55 }} />
              <div className="serif-it" style={{
                fontSize: 19, color: 'var(--cream)',
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

// ─── 10. FAQ ──────────────────────────────────────────────
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
    <section id="faq" style={{ background: 'var(--paper-warm)', padding: '160px 0' }}>
      <div className="wrap-tight">
        <div className="reveal" style={{ marginBottom: 56, textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 24 }}>Du fragst, wir antworten</div>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 4.6vw, 64px)', letterSpacing: '-0.018em' }}>
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

// ─── 11. FINAL CTA ────────────────────────────────────────
function FinalCTA({ onAdd }) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '200px 0 180px',
      background:
        'radial-gradient(ellipse at 20% 0%, rgba(216,136,64,0.22) 0%, transparent 55%), ' +
        'radial-gradient(ellipse at 80% 100%, rgba(135,163,152,0.18) 0%, transparent 55%), ' +
        'var(--paper)',
    }}>
      <Leaf size={28} className="float-slow" style={{ position: 'absolute', top: 140, left: '12%', opacity: 0.4 }} color="var(--moss)" />
      <Leaf size={24} className="drift" style={{ position: 'absolute', bottom: 220, right: '14%', opacity: 0.35 }} color="var(--rust)" />

      <div className="wrap-tight reveal" style={{ textAlign: 'center', position: 'relative' }}>
        <div className="eyebrow" style={{ color: 'var(--rust)', marginBottom: 24 }}>Euer erstes Kapitel</div>
        <h2 className="display" style={{
          fontSize: 'clamp(48px, 6.4vw, 96px)',
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          lineHeight: 1.04,
        }}>
          Heute beginnt eure erste<br />
          gemeinsame <span className="serif-it" style={{ color: 'var(--rust)' }}>Schatzsuche</span>.
        </h2>
        <p className="serif" style={{
          fontSize: 'clamp(18px, 1.45vw, 22px)',
          color: 'var(--ink-soft)',
          marginTop: 30, lineHeight: 1.6,
          maxWidth: 620, margin: '30px auto 0',
        }}>
          Und vielleicht eine Erinnerung, über die ihr noch in <em className="serif-it" style={{ color: 'var(--ink)' }}>vielen Jahren</em> sprecht.
        </p>

        <div style={{ marginTop: 56 }}>
          <button className="btn btn-primary btn-xl" onClick={onAdd}>
            Jetzt Abenteuer starten
          </button>
        </div>

        <div style={{
          marginTop: 48,
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '14px 28px',
          background: 'var(--paper)',
          border: '1px solid rgba(33,28,24,0.1)',
          borderRadius: 999,
          boxShadow: '0 16px 40px -20px rgba(33,28,24,0.2)',
        }}>
          <span style={{ fontSize: 18 }}>🎁</span>
          <span style={{ fontSize: 14, color: 'var(--ink-soft)', fontWeight: 500 }}>
            Mit eurer ersten Box: der personalisierte Holz-Ordner <em className="serif-it" style={{ color: 'var(--ink)' }}>gratis</em> dazu.
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(242,233,217,0.7)', padding: '60px 0 40px' }}>
      <div className="wrap" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 20,
      }}>
        <a href="index.html" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="assets/logo-wordmark.png" alt="Popcorn & Freddy" style={{ height: 40, filter: 'invert(1) brightness(0.95)', opacity: 0.85 }} />
        </a>
        <div style={{ display: 'flex', gap: 28, fontSize: 14, flexWrap: 'wrap' }}>
          <a href="index.html#story" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--cream)'} onMouseLeave={e => e.currentTarget.style.color=''}>Die Geschichte</a>
          <a href="index.html#chapters" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--cream)'} onMouseLeave={e => e.currentTarget.style.color=''}>Alle Kapitel</a>
          <a href="index.html#faq" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--cream)'} onMouseLeave={e => e.currentTarget.style.color=''}>Kontakt</a>
          <a href="index.html" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='var(--cream)'} onMouseLeave={e => e.currentTarget.style.color=''}>Impressum</a>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(242,233,217,0.45)' }}>© 2026 Popcorn & Freddy · Hergestellt in der EU</div>
      </div>
    </footer>
  );
}

// ─── SCROLL PROGRESS ──────────────────────────────────────
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: w + '%' }} />;
}

// ─── APP ──────────────────────────────────────────────────
function App() {
  const peekRef = useRef(null);
  useReveal();

  const handleAdd = () => {
    // gentle toast
    const t = document.createElement('div');
    t.textContent = 'In den Warenkorb gelegt';
    Object.assign(t.style, {
      position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%) translateY(20px)',
      background: 'var(--ink)', color: 'var(--cream)',
      padding: '16px 28px', borderRadius: '999px',
      fontWeight: '500', fontSize: '14px', letterSpacing: '0.02em',
      boxShadow: '0 20px 40px -16px rgba(33,28,24,0.4)',
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
    peekRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ScrollProgress />
      <TopBar />
      <Hero onAdd={handleAdd} onPeek={handlePeek} />
      <WhatsInside />
      <Story />
      <SneakPeek peekRef={peekRef} />
      <Toy />
      <Ablauf />
      <Benefits />
      <Materials />
      <Testimonials />
      <AppContrast />
      <FAQ />
      <FinalCTA onAdd={handleAdd} />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
