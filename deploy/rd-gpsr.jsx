// ────────────────────────────────────────────────────────────────
// GPSR — Produkt-Pflichtangaben (Spielzeug-Sicherheit, Preisangaben)
// Wiederverwendbarer Block für jede Produktseite.
// ALLE Rechtsinhalte sind PLATZHALTER in [Klammern] — finale Angaben
// vom Hersteller/EU-Importeur bzw. abmahnsicheren Anbieter einsetzen.
// Lädt nach rd-ui.jsx (nutzt RdIcon). Vor rd-chapterX-shop.jsx laden.
// ────────────────────────────────────────────────────────────────

// Offizielles CE-Zeichen — vorgeschriebene Geometrie, als Bildelement.
function CeMark({ size = 46 }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 80 50" role="img" aria-label="CE-Kennzeichnung" style={{ flex: 'none' }}>
      {/* C — open ring */}
      <path d="M35 10 A15 15 0 1 0 35 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="butt" />
      {/* E — open ring with middle bar */}
      <path d="M74 10 A15 15 0 1 0 74 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="butt" />
      <line x1="46" y1="25" x2="70" y2="25" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}

// per-chapter placeholder data — replace [ ] before launch
const GPSR = {
  de: {
    eyebrow: 'Pflichtangaben & Sicherheit',
    title: 'Alles, was ihr vor dem Kauf wissen müsst.',
    intro: 'Diese Angaben erfüllen die EU-Produktsicherheitsverordnung (GPSR) und die Spielzeugrichtlinie. Sie stehen bewusst vor dem Kauf hier auf der Produktseite.',
    age_k: 'Altersempfehlung',
    age_v: '4+',
    age_note: 'Geeignet ab 4 Jahren. Bauen & Bemalen unter Aufsicht Erwachsener.',
    ce_note: 'CE-konform für die enthaltenen Spielzeugbestandteile nach EN 71.',
    warn_title: 'Sicherheits- & Warnhinweise',
    warn_lead: 'ACHTUNG. Bitte vor dem Spielen lesen und aufbewahren:',
    warnings: [
      'ACHTUNG! Nicht für Kinder unter 36 Monaten geeignet. Enthält verschluckbare Kleinteile — Erstickungsgefahr.',
      'Nur unter unmittelbarer Aufsicht Erwachsener bauen und bemalen.',
      'Pinsel und lange Teile nicht in Mund, Augen oder Ohren führen.',
      'Farben sind auf Wasserbasis und speichelfest [EN 71-3], dennoch nicht zum Verzehr geeignet. Nach dem Malen Hände waschen.',
      'Verpackung, Folien und Karte sind kein Spielzeug — vor dem Spielen entfernen.',
    ],
    id_title: 'Produktidentifikation',
    id_rows: [
      { k: 'Produkt / Typ', v: '[Kapitel 1 — Der Flüsterwald · Art.-Nr. PF-CH1]' },
      { k: 'Chargen-/Losnummer', v: '[Charge: __________]' },
      { k: 'Seriennummer (falls vergeben)', v: '[SN: __________]' },
    ],
    mfr_title: 'Hersteller & EU-Verantwortliche',
    mfr_lead: 'Je Bestandteil kann eine andere verantwortliche Stelle zuständig sein:',
    manufacturers: [
      { part: 'Holz-Bausatz (Direktimport)', role: 'Hersteller / EU-Verantwortlicher', name: '[Firmenname]', addr: '[Anschrift, PLZ Ort, Österreich]', email: '[safety@…]', note: 'Als Importeur aus Nicht-EU tragen wir die Herstellerpflichten für dieses Teil.' },
      { part: 'Kunstleder-Mappe (Direktimport)', role: 'Hersteller / EU-Verantwortlicher', name: '[Firmenname]', addr: '[Anschrift, PLZ Ort, Österreich]', email: '[safety@…]', note: 'Import aus Nicht-EU — Herstellerpflichten bei uns.' },
      { part: 'Kinderfarbe & Pinsel (EU-Zukauf)', role: 'Hersteller / EU-Importeur des Zulieferers', name: '[Herstellername des Zulieferers]', addr: '[Anschrift des Herstellers/EU-Importeurs]', email: '[Kontakt des Herstellers]', note: 'Zukauf über deutschen Händler — Angaben des jeweiligen Herstellers/EU-Importeurs.' },
    ],
    mat_title: 'Material, Verwendung & Pflege',
    mat_rows: [
      { k: 'Materialien', v: '[FSC-Birkenholz · Kunstleder (PU) · Farben auf Wasserbasis nach EN 71-3 · Karton]' },
      { k: 'Verwendung', v: 'Zusammenbauen, bemalen, spielen — gemeinsam mit einer erwachsenen Begleitperson.' },
      { k: 'Reinigung', v: 'Feucht abwischen, nicht in Wasser einlegen, nicht spülmaschinen- oder maschinenwaschgeeignet. Vor dem Verstauen vollständig trocknen lassen.' },
      { k: 'Aufsichtspflicht', v: 'Bau- und Malphase nur unter Aufsicht Erwachsener. Kleinteile außerhalb der Bauzeit für Kinder unter 3 Jahren unzugänglich aufbewahren.' },
    ],
    more_link: 'Alle Konformitätsangaben nach Bestandteil',
    price_incl: 'inkl. MwSt.',
    price_ship_a: 'zzgl.',
    price_ship_link: 'Versandkosten',
    price_ship_b: '— Aufstellung nach Land.',
    price_lowest: 'Niedrigster Preis der letzten 30 Tage: [__,__ €]',
  },
  en: {
    eyebrow: 'Mandatory information & safety',
    title: 'Everything to know before you buy.',
    intro: 'This information fulfils the EU General Product Safety Regulation (GPSR) and the Toy Safety Directive. It deliberately appears here on the product page, before purchase.',
    age_k: 'Age recommendation',
    age_v: '4+',
    age_note: 'Suitable from age 4. Building & painting under adult supervision.',
    ce_note: 'CE-compliant for the toy components included, per EN 71.',
    warn_title: 'Safety & warning notices',
    warn_lead: 'WARNING. Please read before play and keep for reference:',
    warnings: [
      'WARNING! Not suitable for children under 36 months. Contains small parts that can be swallowed — choking hazard.',
      'Build and paint only under direct adult supervision.',
      'Do not put brushes or long parts into mouth, eyes or ears.',
      'Paints are water-based and saliva-resistant [EN 71-3], but not for consumption. Wash hands after painting.',
      'Packaging, films and the card are not toys — remove before play.',
    ],
    id_title: 'Product identification',
    id_rows: [
      { k: 'Product / type', v: '[Chapter 1 — The Whispering Woods · Art. no. PF-CH1]' },
      { k: 'Batch / lot number', v: '[Batch: __________]' },
      { k: 'Serial number (if assigned)', v: '[SN: __________]' },
    ],
    mfr_title: 'Manufacturers & EU responsible persons',
    mfr_lead: 'A different responsible party may apply per component:',
    manufacturers: [
      { part: 'Wooden kit (direct import)', role: 'Manufacturer / EU responsible person', name: '[Company name]', addr: '[Address, ZIP City, Austria]', email: '[safety@…]', note: 'As importer from outside the EU we carry the manufacturer obligations for this part.' },
      { part: 'Faux leather folder (direct import)', role: 'Manufacturer / EU responsible person', name: '[Company name]', addr: '[Address, ZIP City, Austria]', email: '[safety@…]', note: 'Import from outside the EU — manufacturer obligations with us.' },
      { part: "Children's paint & brushes (EU sourced)", role: 'Manufacturer / EU importer of the supplier', name: '[Supplier manufacturer name]', addr: '[Address of manufacturer / EU importer]', email: '[Supplier contact]', note: 'Sourced via a German retailer — details of the respective manufacturer / EU importer.' },
    ],
    mat_title: 'Materials, use & care',
    mat_rows: [
      { k: 'Materials', v: '[FSC birch wood · faux leather (PU) · water-based paints per EN 71-3 · cardboard]' },
      { k: 'Use', v: 'Assemble, paint, play — together with an accompanying adult.' },
      { k: 'Cleaning', v: 'Wipe with a damp cloth, do not immerse in water, not dishwasher- or machine-washable. Dry fully before storing.' },
      { k: 'Supervision', v: 'Build and paint phase only under adult supervision. Outside build time, keep small parts out of reach of children under 3.' },
    ],
    more_link: 'All conformity information by component',
    price_incl: 'incl. VAT',
    price_ship_a: 'plus',
    price_ship_link: 'shipping',
    price_ship_b: '— breakdown by country.',
    price_lowest: 'Lowest price in the last 30 days: [__.__ €]',
  },
};

// Compact price-compliance line for the buy box (Omnibus / shipping).
function GpsrPriceNote({ lang }) {
  const g = GPSR[lang] || GPSR.de;
  return (
    <div style={{ marginTop: 10, fontFamily: 'var(--f-sans)', fontSize: 13.5, color: 'var(--rd-ink-mute)', lineHeight: 1.55 }}>
      <div>{g.price_incl} · {g.price_ship_a} <a href="Versand & Ruecksendung.html" style={{ color: 'var(--rd-terra)', fontWeight: 600 }}>{g.price_ship_link}</a> {g.price_ship_b}</div>
      <div style={{ marginTop: 3 }}>{g.price_lowest}</div>
    </div>
  );
}

function GpsrRow({ k, v }) {
  return (
    <div className="gpsr-row">
      <span className="r-caps" style={{ letterSpacing: '0.16em', color: 'var(--rd-ink-mute)', alignSelf: 'start', paddingTop: 3 }}>{k}</span>
      <span className="r-serif" style={{ fontSize: 16.5, color: 'var(--rd-ink)', lineHeight: 1.5 }}>{v}</span>
    </div>
  );
}

function GpsrCompliance({ lang }) {
  const g = GPSR[lang] || GPSR.de;
  return (
    <section id="gpsr" data-rd data-screen-label="Pflichtangaben (GPSR)" aria-labelledby="gpsr-title" style={{ padding: '112px 0 116px', background: 'var(--rd-paper)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <style>{GPSR_CSS}</style>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <span className="r-caps r-caps-rule">{g.eyebrow}</span>
        <h2 id="gpsr-title" className="r-display" style={{ fontSize: 'clamp(30px, 3.6vw, 48px)', marginTop: 20, color: 'var(--rd-ink)', textWrap: 'balance' }}>{g.title}</h2>
        <p className="r-serif" style={{ fontSize: 17.5, color: 'var(--rd-ink-soft)', marginTop: 18, lineHeight: 1.6, maxWidth: 640, textWrap: 'pretty' }}>{g.intro}</p>

        {/* Age 4+ & CE — prominent */}
        <div className="gpsr-badges">
          <div className="gpsr-age">
            <span className="gpsr-age-num">{g.age_v}</span>
            <div>
              <div className="r-caps" style={{ letterSpacing: '0.18em', color: 'var(--rd-ink-mute)', fontSize: 11 }}>{g.age_k}</div>
              <div className="r-serif" style={{ fontSize: 15.5, color: 'var(--rd-ink)', marginTop: 4, lineHeight: 1.4 }}>{g.age_note}</div>
            </div>
          </div>
          <div className="gpsr-ce">
            <span style={{ color: 'var(--rd-ink)' }}><CeMark size={44} /></span>
            <div className="r-serif" style={{ fontSize: 14.5, color: 'var(--rd-ink-soft)', lineHeight: 1.45 }}>{g.ce_note}</div>
          </div>
        </div>

        {/* Warnings — high contrast box */}
        <div className="gpsr-warn" role="note">
          <div className="gpsr-warn-head">
            <span className="gpsr-warn-ico" aria-hidden="true"><RdIcon name="shield" size={20} /></span>
            <div>
              <h3 className="gpsr-warn-title">{g.warn_title}</h3>
              <p className="gpsr-warn-lead">{g.warn_lead}</p>
            </div>
          </div>
          <ul className="gpsr-warn-list">
            {g.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>

        {/* Identification */}
        <div className="gpsr-card">
          <h3 className="gpsr-h">{g.id_title}</h3>
          <div className="gpsr-rows">{g.id_rows.map((r, i) => <GpsrRow key={i} k={r.k} v={r.v} />)}</div>
        </div>

        {/* Manufacturers — multiple blocks */}
        <div className="gpsr-card">
          <h3 className="gpsr-h">{g.mfr_title}</h3>
          <p className="r-serif" style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', margin: '2px 0 20px', lineHeight: 1.55 }}>{g.mfr_lead}</p>
          <div className="gpsr-mfr-grid">
            {g.manufacturers.map((m, i) => (
              <div key={i} className="gpsr-mfr">
                <div className="gpsr-mfr-part">{m.part}</div>
                <div className="gpsr-mfr-role">{m.role}</div>
                <address className="gpsr-mfr-addr">
                  <span>{m.name}</span><br />
                  <span>{m.addr}</span><br />
                  <span>{m.email}</span>
                </address>
                <p className="gpsr-mfr-note">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Material & care */}
        <div className="gpsr-card">
          <h3 className="gpsr-h">{g.mat_title}</h3>
          <div className="gpsr-rows">{g.mat_rows.map((r, i) => <GpsrRow key={i} k={r.k} v={r.v} />)}</div>
        </div>

        <a href="Produktsicherheit.html" className="gpsr-more">
          <RdIcon name="arrow" size={16} /> {g.more_link}
        </a>
        <p className="gpsr-stamp">PLATZHALTER-Gerüst — finale Formulierungen, Hersteller-/EU-Angaben, Charge/Serie und der 30-Tage-Bestpreis vom Anbieter für abmahnsichere Texte bzw. Hersteller einsetzen.</p>
      </div>
    </section>
  );
}

const GPSR_CSS = `
  #gpsr .gpsr-badges { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 40px; }
  #gpsr .gpsr-age, #gpsr .gpsr-ce { display: flex; align-items: center; gap: 18px; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-radius: 14px; padding: 20px 22px; }
  #gpsr .gpsr-age-num { flex: none; display: inline-grid; place-items: center; width: 62px; height: 62px; border-radius: 50%; background: var(--rd-terra); color: var(--rd-cream); font-family: var(--f-display, Georgia, serif); font-weight: 700; font-size: 27px; box-shadow: 0 10px 24px -12px color-mix(in srgb, var(--rd-terra) 70%, transparent); }
  #gpsr .gpsr-warn { margin-top: 24px; background: #FBF0E6; border: 1.5px solid #C1673F; border-radius: 14px; padding: 24px 26px; }
  #gpsr .gpsr-warn-head { display: flex; gap: 14px; align-items: flex-start; }
  #gpsr .gpsr-warn-ico { flex: none; display: inline-grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: #C1673F; color: #fff; }
  #gpsr .gpsr-warn-title { font-family: var(--f-sans); font-weight: 800; font-size: 16px; letter-spacing: 0.02em; color: #8A3A18; margin: 2px 0 0; text-transform: uppercase; }
  #gpsr .gpsr-warn-lead { font-family: var(--f-sans); font-weight: 700; font-size: 13.5px; color: #8A3A18; margin: 6px 0 0; }
  #gpsr .gpsr-warn-list { margin: 18px 0 0; padding: 0 0 0 4px; list-style: none; display: grid; gap: 12px; }
  #gpsr .gpsr-warn-list li { position: relative; padding-left: 26px; font-family: var(--f-sans); font-size: 15px; line-height: 1.55; color: #4A2A1C; text-wrap: pretty; }
  #gpsr .gpsr-warn-list li::before { content: "!"; position: absolute; left: 0; top: 0; display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; background: #C1673F; color: #fff; font-family: var(--f-sans); font-weight: 800; font-size: 12px; }
  #gpsr .gpsr-card { margin-top: 24px; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-radius: 14px; padding: 28px 30px; }
  #gpsr .gpsr-h { font-family: var(--f-serif); font-weight: 600; font-size: 21px; color: var(--rd-ink); margin: 0 0 18px; }
  #gpsr .gpsr-rows { display: grid; gap: 2px; }
  #gpsr .gpsr-row { display: grid; grid-template-columns: minmax(150px, 0.7fr) 1.3fr; gap: 18px; padding: 14px 2px; border-top: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  #gpsr .gpsr-row:first-child { border-top: none; }
  #gpsr .gpsr-mfr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  #gpsr .gpsr-mfr { background: var(--rd-paper); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-radius: 12px; padding: 20px; }
  #gpsr .gpsr-mfr-part { font-family: var(--f-sans); font-weight: 800; font-size: 14px; color: var(--rd-ink); line-height: 1.3; }
  #gpsr .gpsr-mfr-role { font-family: var(--f-sans); font-weight: 700; font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rd-terra); margin-top: 8px; }
  #gpsr .gpsr-mfr-addr { font-style: normal; font-family: var(--f-serif); font-size: 15px; color: var(--rd-ink-soft); line-height: 1.6; margin-top: 12px; }
  #gpsr .gpsr-mfr-note { font-family: var(--f-sans); font-size: 12.5px; color: var(--rd-ink-mute); line-height: 1.5; margin: 12px 0 0; padding-top: 12px; border-top: 1px dashed color-mix(in srgb, var(--rd-ink) 18%, transparent); text-wrap: pretty; }
  #gpsr .gpsr-more { display: inline-flex; align-items: center; gap: 9px; margin-top: 28px; font-family: var(--f-sans); font-weight: 700; font-size: 15px; color: var(--rd-terra); text-decoration: underline; text-underline-offset: 4px; }
  #gpsr .gpsr-stamp { margin-top: 22px; font-family: var(--f-sans); font-size: 12px; color: var(--rd-ink-mute); line-height: 1.55; font-style: italic; }
  @media (max-width: 860px) {
    #gpsr .gpsr-badges { grid-template-columns: minmax(0,1fr); }
    #gpsr .gpsr-mfr-grid { grid-template-columns: minmax(0,1fr); }
  }
  @media (max-width: 560px) {
    #gpsr .gpsr-row { grid-template-columns: minmax(0,1fr); gap: 4px; }
  }
`;

Object.assign(window, { CeMark, GPSR, GpsrPriceNote, GpsrCompliance, GpsrRow });
