// ────────────────────────────────────────────────────────────────
// Sicherheit & Material — safety & materials page
// ────────────────────────────────────────────────────────────────

const SAFE_COPY = {
  de: {
    eyebrow: 'Sicherheit & Material',
    title: 'Gemacht für kleine Hände.',
    lede: 'Alles, was in einer Abenteuer-Box steckt, geht durch unsere Hände — und durch strenge Prüfungen. Hier zeigen wir dir, woraus der Flüsterwald wirklich besteht.',
    img_caps: 'Aus der Werkstatt',
    img_t: 'Wo die Boxen entstehen',
    img_d: 'Popcorn und Freddy schauen beim Aussägen, Schleifen und Bemalen ganz genau hin — jede Box geht durch viele sorgfältige Hände, bevor sie versiegelt wird.',
    img_ph: 'Foto: Popcorn & Freddy bei der Arbeit mit den Materialien',
    mat_t: 'Unsere Materialien',
    mats: [
      { icon: 'build', t: 'FSC®-zertifiziertes Birkenholz', d: 'Jedes Bauteil wird aus Birkenschichtholz aus verantwortungsvoller europäischer Forstwirtschaft gesägt und von Hand geschliffen — splitterfrei und mit weichen, gerundeten Kanten.' },
      { icon: 'palette', t: 'Speichelfeste Farben auf Wasserbasis', d: 'Unsere Farben und Lacke sind schadstofffrei, speichel- und schweißecht nach DIN EN 71-3 — sicher, auch wenn ein Bauteil mal im Mund landet.' },
      { icon: 'book', t: 'Papier & Druck', d: 'Buch und Schatzkarte drucken wir auf FSC®-Papier mit mineralölfreien Farben — in einer Druckerei in Süddeutschland.' },
      { icon: 'archive', t: 'Verpackung ohne Plastik', d: 'Karton, Holzwolle, Papier, Wachssiegel. Keine Folien, kein Styropor — alles darf ins Altpapier oder auf den Kompost.' },
    ],
    test_t: 'Geprüft & zertifiziert',
    test_lede: 'Jede Charge wird von unabhängigen Instituten in der EU geprüft, bevor sie in die Werkstatt darf.',
    tests: [
      { code: 'EN 71-1', d: 'Mechanische & physikalische Sicherheit — Bruchfestigkeit, Kanten, Kleinteile' },
      { code: 'EN 71-2', d: 'Entflammbarkeit der verwendeten Materialien' },
      { code: 'EN 71-3', d: 'Migration bestimmter Elemente — Farben & Lacke ohne Schadstoffe' },
      { code: 'CE', d: 'Konform mit der EU-Spielzeugrichtlinie 2009/48/EG' },
      { code: 'FSC®', d: 'Holz & Papier aus verantwortungsvollen Quellen' },
      { code: 'Made in EU', d: 'Gefertigt, bedruckt und graviert in Deutschland & Tschechien' },
    ],
    age_t: 'Ein Wort zum Alter',
    age_d: 'Die Abenteuer-Boxen sind für Kinder ab 4 Jahren gedacht. Einzelne Bauteile sind klein — jüngere Geschwister sollten beim Bauen auf dem Schoß zuschauen, nicht mitknabbern. Auf jeder Box findet ihr die vollständigen Sicherheitshinweise.',
    care_t: 'Pflege',
    care_d: 'Holzspielzeug mag es trocken: einfach mit einem leicht feuchten Tuch abwischen, nie einweichen. So begleitet es euch viele Abenteuer lang — und danach das nächste Kind.',
    q_a: 'Was wir unseren eigenen Kindern nicht geben würden,',
    q_b: 'packen wir auch in keine Box.',
  },
  en: {
    eyebrow: 'Safety & materials',
    title: 'Made for little hands.',
    lede: 'Everything inside an adventure box passes through our hands — and through strict testing. Here we show you what the Whispering Woods is really made of.',
    img_caps: 'From the workshop',
    img_t: 'Where the boxes are made',
    img_d: 'Popcorn and Freddy keep a close eye on the sawing, sanding and painting — every box passes through many careful hands before it is sealed.',
    img_ph: 'Photo: Popcorn & Freddy working with the materials',
    mat_t: 'Our materials',
    mats: [
      { icon: 'build', t: 'FSC®-certified birch wood', d: 'Every part is cut from birch plywood from responsible European forestry and sanded by hand — splinter-free, with soft rounded edges.' },
      { icon: 'palette', t: 'Saliva-resistant water-based paints', d: 'Our paints and varnishes are non-toxic, saliva- and sweat-resistant to DIN EN 71-3 — safe even if a piece ends up in a mouth.' },
      { icon: 'book', t: 'Paper & print', d: 'Book and treasure map are printed on FSC® paper with mineral-oil-free inks — at a printer in southern Germany.' },
      { icon: 'archive', t: 'Packaging without plastic', d: 'Cardboard, wood wool, paper, a wax seal. No films, no styrofoam — everything can be recycled or composted.' },
    ],
    test_t: 'Tested & certified',
    test_lede: 'Every batch is tested by independent institutes in the EU before it is allowed into the workshop.',
    tests: [
      { code: 'EN 71-1', d: 'Mechanical & physical safety — strength, edges, small parts' },
      { code: 'EN 71-2', d: 'Flammability of the materials used' },
      { code: 'EN 71-3', d: 'Migration of certain elements — paints & varnishes free of harmful substances' },
      { code: 'CE', d: 'Conforms to the EU Toy Safety Directive 2009/48/EC' },
      { code: 'FSC®', d: 'Wood & paper from responsible sources' },
      { code: 'Made in EU', d: 'Crafted, printed and engraved in Germany & Czechia' },
    ],
    age_t: 'A word about age',
    age_d: 'The adventure boxes are made for children aged 4 and up. Some parts are small — younger siblings should watch from a lap, not nibble along. You will find the full safety notes on every box.',
    care_t: 'Care',
    care_d: 'Wooden toys like it dry: simply wipe with a slightly damp cloth, never soak. That way they last through many adventures — and then the next child.',
    q_a: "What we wouldn't give our own children,",
    q_b: 'we never put in a box.',
  },
};

function SafetyBody({ lang }) {
  const s = SAFE_COPY[lang] || SAFE_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={s.eyebrow} title={s.title} lede={s.lede} />

      {/* workshop image + intro */}
      <section data-rd style={{ padding: '30px 0 120px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="rd-safe-grid">
            <div className="r-rev">
              <div style={{ position: 'relative' }}>
                <div className="rh-arch-img rd-safe-img" style={{ aspectRatio: '4 / 4.4' }}>
                  <image-slot id="safety-workshop" shape="rect" placeholder={s.img_ph} style={{ width: '100%', height: '100%' }}></image-slot>
                </div>
                <div className="rh-arch-frame" aria-hidden="true"></div>
              </div>
            </div>
            <div className="r-rev r-rev-1" style={{ alignSelf: 'center' }}>
              <span className="r-caps r-caps-rule">{s.img_caps}</span>
              <h2 className="r-display" style={{ fontSize: 'clamp(30px, 3.4vw, 46px)', marginTop: 22, color: 'var(--rd-ink)', textWrap: 'balance' }}>{s.img_t}</h2>
              <p style={{ fontSize: 'clamp(16.5px, 1.35vw, 19px)', color: 'var(--rd-ink-soft)', marginTop: 18, lineHeight: 1.7, textWrap: 'pretty' }}>{s.img_d}</p>
              <div style={{ marginTop: 24 }}>
                <RdCraftNote lang={lang} k="count" size={15.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* materials */}
      <section data-rd style={{ padding: '120px 0 120px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <RdHeading eyebrow={s.eyebrow} title={s.mat_t} max={700} />
          <div className="rd-info-grid" style={{ marginTop: 60 }}>
            {s.mats.map((m, i) => (
              <RdInfoCard key={i} className={`r-rev r-rev-${(i % 2) + 1}`} icon={m.icon} title={m.t} style={{ background: 'var(--rd-paper)' }}>{m.d}</RdInfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* tests — green interlude */}
      <section data-rd style={{ padding: '120px 0 130px', background: 'radial-gradient(ellipse 60% 45% at 80% 0%, color-mix(in srgb, var(--rd-moss) 30%, transparent) 0%, transparent 60%), linear-gradient(175deg, var(--rd-forest) 0%, var(--rd-forest-deep) 100%)', color: 'var(--rd-cream)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <RdHeading dark eyebrow={lang === 'de' ? 'Prüfsiegel' : 'Certifications'} title={s.test_t} lede={s.test_lede} max={760} ledeMax={560} />
          <div className="rd-safe-tests" style={{ marginTop: 62 }}>
            {s.tests.map((tst, i) => (
              <div key={i} className={`r-rev r-rev-${(i % 3) + 1}`} style={{ padding: '28px 26px', border: '1px solid rgba(214,196,150,0.26)', borderRadius: 6, background: 'rgba(250,246,235,0.045)' }}>
                <div style={{ display: 'inline-block', fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--rd-gold-soft)', border: '1.5px solid color-mix(in srgb, var(--rd-gold-soft) 60%, transparent)', borderRadius: 3, padding: '5px 12px' }}>{tst.code}</div>
                <p style={{ fontSize: 15.5, color: 'rgba(242,236,217,0.78)', marginTop: 14, lineHeight: 1.6, textWrap: 'pretty' }}>{tst.d}</p>
              </div>
            ))}
          </div>
          <div className="r-rev" style={{ textAlign: 'center', marginTop: 86 }}>
            <p className="r-it" style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--rd-cream)', lineHeight: 1.32, maxWidth: 820, margin: '0 auto', fontWeight: 500, textWrap: 'balance' }}>
              {s.q_a}<br /><span style={{ color: 'var(--rd-gold-soft)' }}>{s.q_b}</span>
            </p>
          </div>
        </div>
      </section>

      {/* age + care */}
      <section data-rd style={{ padding: '110px 0 120px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="rd-info-grid">
            <RdInfoCard className="r-rev" icon="user" title={s.age_t}>{s.age_d}</RdInfoCard>
            <RdInfoCard className="r-rev r-rev-1" icon="heart" title={s.care_t}>{s.care_d}</RdInfoCard>
          </div>
        </div>
      </section>

      <style>{`
        .rd-safe-grid { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 74px; align-items: center; }
        .rd-safe-tests { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        @media (max-width: 980px) {
          .rd-safe-grid { grid-template-columns: minmax(0, 1fr); gap: 48px; }
          .rd-safe-grid > .r-rev:first-child { max-width: 480px; margin: 0 auto; width: 100%; }
          .rd-safe-tests { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 620px) { .rd-safe-tests { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .rd-safe-img { aspect-ratio: 4 / 3.1 !important; } }
      `}</style>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Sicherheit & Material" render={(t, lang) => <SafetyBody key={lang} lang={lang} />} />
);
