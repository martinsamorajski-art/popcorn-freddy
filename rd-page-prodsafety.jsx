// ────────────────────────────────────────────────────────────────
// Produktsicherheit — GPSR: Konformität je Bestandteil + Meldeweg
// Platzhalter-Gerüst. Herstellerangaben in [Klammern] vor Launch füllen.
// ────────────────────────────────────────────────────────────────

const PS_COPY = {
  de: {
    eyebrow: 'Produktsicherheit',
    title: 'Sicher — Bestandteil für Bestandteil.',
    lede: 'Nach der EU-Produktsicherheitsverordnung (GPSR) findet ihr hier alle Konformitäts- und Herstellerangaben, nach Bestandteil der Box gegliedert.',
    intro: 'Platzhalter-Gerüst. Alle Angaben in [eckigen Klammern] — Hersteller, Anschrift, Kennnummern, Prüfnormen — sind vor Veröffentlichung durch die verbindlichen Daten zu ersetzen. Rechtstexte final durch abmahnsicheren Anbieter / Rechtsberatung.',
    role_label: 'Rolle',
    parts_t: 'Bestandteile & Konformität',
    parts: [
      {
        name: 'Bastelset (Holz-Bausatz)',
        role: 'Hersteller / EU-Verantwortlicher: [Firmenname, Anschrift, E-Mail] — für den Direktimport aus China übernimmt der Shopbetreiber die Rolle des EU-Verantwortlichen.',
        rows: [
          ['Produkt-/Chargennummer', '[Typ-/Chargen-/Seriennr.]'],
          ['Altersfreigabe', '4+ (Kleinteile — nicht für Kinder unter 3 Jahren)'],
          ['Prüfnormen', 'EN 71-1/-2/-3, CE nach 2009/48/EG [Prüfbericht-Nr. / Institut]'],
          ['Batterien', 'Enthält keine Batterien'],
          ['Warnhinweis', 'ACHTUNG. Enthält verschluckbare Kleinteile. Erstickungsgefahr. Nicht für Kinder unter 3 Jahren geeignet.'],
        ],
        ce: true,
      },
      {
        name: 'Kunstleder-Folder / Sammelmappe',
        role: 'Hersteller / EU-Verantwortlicher: [Firmenname, Anschrift, E-Mail] — Direktimport aus China, Shopbetreiber als EU-Verantwortlicher.',
        rows: [
          ['Produkt-/Chargennummer', '[Typ-/Chargen-/Seriennr.]'],
          ['Material', '[Kunstleder-Spezifikation, schadstoffgeprüft nach …]'],
          ['Konformität', '[anwendbare Normen / Erklärung]'],
          ['Hinweis', 'Kein Spielzeug im Sinne der Spielzeugrichtlinie — Aufbewahrungsmappe.'],
        ],
        ce: false,
      },
      {
        name: 'Kinderfarbe & Pinsel',
        role: 'Hersteller / EU-Importeur: [Name des dt. Herstellers/Händlers, Anschrift, E-Mail] — EU-Zukauf, Angaben des jeweiligen Herstellers.',
        rows: [
          ['Produkt-/Chargennummer', '[Herstellerangabe]'],
          ['Altersfreigabe', '4+'],
          ['Prüfnormen', 'EN 71-3 (Migration), CE nach 2009/48/EG [Herstellerangabe]'],
          ['Warnhinweis', 'Farben nur unter Aufsicht Erwachsener verwenden. [weitere Herstellerhinweise]'],
        ],
        ce: true,
      },
      {
        name: 'Gedruckte Kapitelseiten (A5) & Schatzkarte',
        role: 'Hersteller: [Firmenname / Druckerei, Anschrift, E-Mail].',
        rows: [
          ['Material', 'FSC®-Papier, mineralölfreie Farben [Spezifikation]'],
          ['Hinweis', 'Kein Spielzeug — Druckerzeugnis. Papierkanten: unter Aufsicht verwenden.'],
        ],
        ce: false,
      },
      {
        name: 'Karte, Sticker & Kartonverpackung',
        role: 'Hersteller: [Firmenname, Anschrift, E-Mail].',
        rows: [
          ['Material', '[Papier/Karton, Klebstoff — Spezifikation]'],
          ['Hinweis', 'Verpackung kein Spielzeug. Folien/Kleinteile von Kindern fernhalten.'],
        ],
        ce: false,
      },
    ],
    warn_t: 'Allgemeine Sicherheits- & Warnhinweise',
    warns: [
      'ACHTUNG. Nicht geeignet für Kinder unter 3 Jahren. Enthält verschluckbare Kleinteile — Erstickungsgefahr.',
      'Nur unter Aufsicht Erwachsener bauen und bemalen. Farben und kleine Teile von Kleinkindern fernhalten.',
      'Verpackungsmaterial (Karton, Papier, Folien) ist kein Spielzeug und vor dem Spielen zu entfernen.',
      'Bewahrt diese Angaben und die beiliegenden Warnhinweise für Rückfragen auf.',
    ],
    care_t: 'Material, Pflege & Aufsicht',
    cares: [
      ['Verwendung', 'Bauen und Bemalen gemeinsam mit einem Erwachsenen — empfohlen ab 4 Jahren.'],
      ['Reinigung', 'Holzteile nur trocken bis leicht feucht abwischen, nicht einweichen. Farben nach Herstellerangabe.'],
      ['Aufsicht', 'Kinder beim Umgang mit Kleinteilen, Farben und Papierkanten nicht unbeaufsichtigt lassen.'],
    ],
    contact_t: 'Sicherheitsmeldungen & Rückrufe',
    contact_b: 'Ist euch an einem Produkt etwas aufgefallen, das ein Sicherheitsrisiko sein könnte? Meldet es uns bitte umgehend — wir nehmen jede Meldung ernst und leiten bei Bedarf einen Rückruf ein.',
    contact_rows: [
      ['E-Mail für Sicherheitsmeldungen', '[sicherheit@…]'],
      ['Telefon', '[Telefonnummer]'],
      ['Postanschrift', '[Firmenname, Anschrift]'],
    ],
    contact_note: 'Bitte gebt Produkt, Charge/Bestellnummer und eine kurze Beschreibung an. Für allgemeine Fragen nutzt bitte die Kontaktseite.',
    contact_cta: 'Zur Kontaktseite',
  },
  en: {
    eyebrow: 'Product safety',
    title: 'Safe — part by part.',
    lede: 'Under the EU General Product Safety Regulation (GPSR) you will find all conformity and manufacturer details here, organised by component of the box.',
    intro: 'Placeholder scaffold. All entries in [square brackets] — manufacturer, address, identifiers, test standards — must be replaced with the binding data before publication. Legal texts to be finalised by a compliant provider / legal counsel.',
    role_label: 'Role',
    parts_t: 'Components & conformity',
    parts: [
      {
        name: 'Craft set (wooden kit)',
        role: 'Manufacturer / EU responsible person: [company, address, email] — for direct import from China, the shop operator acts as EU responsible person.',
        rows: [
          ['Product/batch number', '[type/batch/serial no.]'],
          ['Age rating', '4+ (small parts — not for children under 3)'],
          ['Test standards', 'EN 71-1/-2/-3, CE per 2009/48/EC [report no. / institute]'],
          ['Batteries', 'Contains no batteries'],
          ['Warning', 'WARNING. Contains small parts that may be swallowed. Choking hazard. Not suitable for children under 3.'],
        ],
        ce: true,
      },
      {
        name: 'Faux leather folder',
        role: 'Manufacturer / EU responsible person: [company, address, email] — direct import from China, shop operator as EU responsible person.',
        rows: [
          ['Product/batch number', '[type/batch/serial no.]'],
          ['Material', '[faux leather spec, tested for harmful substances per …]'],
          ['Conformity', '[applicable standards / declaration]'],
          ['Note', 'Not a toy within the Toy Safety Directive — a storage folder.'],
        ],
        ce: false,
      },
      {
        name: "Children's paint & brush",
        role: 'Manufacturer / EU importer: [German manufacturer/retailer, address, email] — EU purchase, details from the respective manufacturer.',
        rows: [
          ['Product/batch number', '[manufacturer detail]'],
          ['Age rating', '4+'],
          ['Test standards', 'EN 71-3 (migration), CE per 2009/48/EC [manufacturer detail]'],
          ['Warning', 'Use paints only under adult supervision. [further manufacturer notes]'],
        ],
        ce: true,
      },
      {
        name: 'Printed chapter pages (A5) & map',
        role: 'Manufacturer: [company / printer, address, email].',
        rows: [
          ['Material', 'FSC® paper, mineral-oil-free inks [spec]'],
          ['Note', 'Not a toy — printed matter. Paper edges: use under supervision.'],
        ],
        ce: false,
      },
      {
        name: 'Card, sticker & cardboard packaging',
        role: 'Manufacturer: [company, address, email].',
        rows: [
          ['Material', '[paper/cardboard, adhesive — spec]'],
          ['Note', 'Packaging is not a toy. Keep films/small parts away from children.'],
        ],
        ce: false,
      },
    ],
    warn_t: 'General safety & warning notices',
    warns: [
      'WARNING. Not suitable for children under 3. Contains small parts that may be swallowed — choking hazard.',
      'Build and paint only under adult supervision. Keep paints and small parts away from toddlers.',
      'Packaging material (cardboard, paper, films) is not a toy and must be removed before play.',
      'Keep this information and the enclosed warnings for future reference.',
    ],
    care_t: 'Material, care & supervision',
    cares: [
      ['Use', 'Build and paint together with an adult — recommended from age 4.'],
      ['Cleaning', 'Wipe wooden parts dry to slightly damp only, do not soak. Paints per manufacturer instructions.'],
      ['Supervision', 'Do not leave children unattended with small parts, paints or paper edges.'],
    ],
    contact_t: 'Safety reports & recalls',
    contact_b: 'Have you noticed something about a product that could be a safety risk? Please report it to us immediately — we take every report seriously and will initiate a recall if needed.',
    contact_rows: [
      ['Email for safety reports', '[safety@…]'],
      ['Phone', '[phone number]'],
      ['Postal address', '[company, address]'],
    ],
    contact_note: 'Please state the product, batch/order number and a short description. For general questions, please use the contact page.',
    contact_cta: 'To the contact page',
  },
};

function PsCeMark() {
  return (
    <svg viewBox="0 0 640 512" width="48" height="38" role="img" aria-label="CE-Kennzeichnung" style={{ color: 'var(--rd-ink)' }}>
      <path fill="currentColor" d="M256 256c0 88.4-71.6 160-160 160S-64 344.4-64 256 7.6 96 96 96c33 0 63.6 10 89.1 27.1l-35.7 53.4C134.4 166 116 160 96 160c-53 0-96 43-96 96s43 96 96 96c20 0 38.4-6 53.4-16.5l35.7 53.4C159.6 406 129 416 96 416" transform="translate(120 0)"/>
      <g transform="translate(360 96)">
        <path fill="currentColor" d="M96 0C42.98 0 0 42.98 0 96s42.98 96 96 96c33 0 63.6-10 89.1-27.1l-35.7-53.4C134.4 122 116 128 96 128c-17.7 0-32-14.3-32-32s14.3-32 32-32c20 0 38.4 6 53.4 16.5l35.7-53.4C159.6 10 129 0 96 0z" transform="translate(0 160)"/>
        <rect x="150" y="176" width="150" height="26" fill="currentColor"/>
        <rect x="150" y="240" width="110" height="26" fill="currentColor"/>
        <rect x="150" y="304" width="150" height="26" fill="currentColor"/>
      </g>
    </svg>
  );
}

function PsPart({ p, roleLabel }) {
  return (
    <div className="r-rev" style={{ background: 'var(--rd-paper)', border: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)', borderRadius: 14, padding: '30px 30px 26px', boxShadow: '0 26px 55px -42px color-mix(in srgb, var(--rd-ink) 45%, transparent)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
        <h3 className="r-display" style={{ fontSize: 'clamp(21px, 2vw, 26px)', color: 'var(--rd-ink)', lineHeight: 1.2 }}>{p.name}</h3>
        {p.ce && <span title="CE" style={{ flex: 'none', border: '1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent)', borderRadius: 8, padding: '8px 12px', background: 'var(--rd-cream)' }}><PsCeMark /></span>}
      </div>
      <p style={{ fontFamily: 'var(--f-sans)', fontSize: 13.5, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.55, textWrap: 'pretty' }}><strong style={{ fontWeight: 800, color: 'var(--rd-ink)' }}>{roleLabel}: </strong>{p.role}</p>
      <dl style={{ margin: '18px 0 0', display: 'grid', gap: 0 }}>
        {p.rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(150px, 0.8fr) 1.2fr', gap: 16, padding: '12px 2px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)' }} className="ps-row">
            <dt className="r-caps" style={{ letterSpacing: '0.12em', color: 'var(--rd-ink-mute)', fontSize: 11.5 }}>{k}</dt>
            <dd style={{ margin: 0, fontSize: 15.5, color: 'var(--rd-ink)', lineHeight: 1.5, textWrap: 'pretty' }}>{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function PsBody({ lang }) {
  const d = PS_COPY[lang] || PS_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />

      <section data-rd style={{ padding: '10px 0 40px', background: 'var(--rd-paper)' }}>
        <div className="rwrap-tight" style={{ maxWidth: 900, position: 'relative', zIndex: 2 }}>
          <p className="r-rev" style={{ fontSize: 15, color: 'var(--rd-ink-soft)', lineHeight: 1.65, background: 'color-mix(in srgb, var(--rd-gold-soft) 14%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-gold) 32%, transparent)', borderRadius: 12, padding: '16px 20px', textWrap: 'pretty' }}>{d.intro}</p>
        </div>
      </section>

      {/* per-component conformity */}
      <section data-rd style={{ padding: '30px 0 110px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <RdHeading eyebrow={d.eyebrow} title={d.parts_t} max={720} />
          <div style={{ marginTop: 52, display: 'grid', gap: 24, maxWidth: 900, marginInline: 'auto' }}>
            {d.parts.map((p, i) => <PsPart key={i} p={p} roleLabel={d.role_label} />)}
          </div>
        </div>
      </section>

      {/* warnings — terra interlude */}
      <section data-rd style={{ padding: '96px 0 96px', background: 'color-mix(in srgb, var(--rd-terra) 8%, var(--rd-cream))', borderTop: '1px solid color-mix(in srgb, var(--rd-terra) 22%, transparent)', borderBottom: '1px solid color-mix(in srgb, var(--rd-terra) 22%, transparent)' }}>
        <div className="rwrap-tight" style={{ maxWidth: 860, position: 'relative', zIndex: 2 }}>
          <RdHeading eyebrow={lang === 'de' ? 'Bitte lesen' : 'Please read'} title={d.warn_t} max={680} />
          <ul className="r-rev" style={{ listStyle: 'none', padding: 0, margin: '34px 0 0', display: 'grid', gap: 14 }}>
            {d.warns.map((w, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '30px 1fr', gap: 12, alignItems: 'start', fontSize: 16, color: 'var(--rd-ink)', lineHeight: 1.6, background: 'var(--rd-paper)', border: '1px solid color-mix(in srgb, var(--rd-terra) 26%, transparent)', borderRadius: 10, padding: '16px 18px', textWrap: 'pretty' }}>
                <span aria-hidden="true" style={{ color: 'var(--rd-terra)', display: 'inline-flex', marginTop: 1 }}><RdIcon name="shield" size={20} /></span><span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* material / care / supervision */}
      <section data-rd style={{ padding: '104px 0 100px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <RdHeading eyebrow={lang === 'de' ? 'Im Alltag' : 'Day to day'} title={d.care_t} max={680} />
          <div className="rd-info-grid-3" style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {d.cares.map(([k, v], i) => (
              <RdInfoCard key={i} className={`r-rev r-rev-${(i % 3) + 1}`} icon={['build', 'heart', 'user'][i]} title={k}>{v}</RdInfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* safety report contact — dark */}
      <section data-rd data-screen-label="Sicherheitsmeldungen" style={{ padding: '110px 0 120px', background: 'linear-gradient(175deg, var(--rd-forest) 0%, var(--rd-forest-deep) 100%)', color: 'var(--rd-cream)' }}>
        <div className="rwrap-tight" style={{ maxWidth: 820, position: 'relative', zIndex: 2 }}>
          <RdHeading dark eyebrow={lang === 'de' ? 'Meldeweg' : 'Reporting'} title={d.contact_t} lede={d.contact_b} max={760} ledeMax={620} />
          <dl className="r-rev" style={{ margin: '40px 0 0', display: 'grid', gap: 0 }}>
            {d.contact_rows.map(([k, v], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 0.9fr) 1.1fr', gap: 16, padding: '16px 2px', borderTop: '1px solid rgba(214,196,150,0.22)' }} className="ps-row">
                <dt className="r-caps" style={{ letterSpacing: '0.14em', color: 'var(--rd-gold-soft)', fontSize: 11.5 }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: 16.5, color: 'var(--rd-cream)', lineHeight: 1.5 }}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="r-rev" style={{ fontSize: 14.5, color: 'rgba(242,236,217,0.72)', marginTop: 20, lineHeight: 1.6, textWrap: 'pretty' }}>{d.contact_note}</p>
          <div className="r-rev" style={{ marginTop: 28 }}>
            <a href="Kontakt.html" className="rbtn rbtn-primary rbtn-xl">{d.contact_cta} <RdIcon name="arrow" size={16} /></a>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 620px){ .ps-row{ grid-template-columns: minmax(0,1fr) !important; gap: 4px !important; } .rd-info-grid-3{ grid-template-columns: minmax(0,1fr) !important; } }`}</style>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Produktsicherheit" render={(t, lang) => <PsBody key={lang} lang={lang} />} />
);
