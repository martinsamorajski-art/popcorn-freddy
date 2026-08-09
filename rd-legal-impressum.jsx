// ────────────────────────────────────────────────────────────────
// Impressum — § 5 ECG, § 25 MedienG (Österreich)
// ────────────────────────────────────────────────────────────────

const IMP_COPY = {
  de: {
    eyebrow: 'Rechtliches',
    title: 'Impressum',
    lede: 'Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und Offenlegung gemäß § 25 Mediengesetz.',
    updated: 'Stand: Juli 2026',
    sections: [
      { h: 'Medieninhaberin & Diensteanbieterin', body: [
        ['[Firmenname] · [Rechtsform]', '[Straße und Hausnummer], [PLZ] [Ort], Österreich', 'E-Mail: [E-Mail-Adresse]', 'Telefon: [Telefonnummer]'],
      ]},
      { h: 'Unternehmensgegenstand', body: [
        '[Gewerbewortlaut — z. B. Gestaltung, Herstellung und Vertrieb personalisierter Kinderbücher und Holzspielwaren; Handel mit Waren aller Art].',
      ]},
      { h: 'Firmendaten', body: [
        ['Firmenbuchnummer: [FN …]', 'Firmenbuchgericht: [zuständiges Landesgericht]', 'UID-Nummer: [ATU …]', 'Geschäftsführung: [Name(n)]'],
      ]},
      { h: 'Aufsicht & Kammerzugehörigkeit', body: [
        'Zuständige Gewerbebehörde: [Bezirkshauptmannschaft / Magistrat]. Mitglied der Wirtschaftskammer: [WKO-Fachgruppe / Sparte]. Anwendbare gewerberechtliche Vorschriften: [Gewerbeordnung 1994 (GewO)], abrufbar unter www.ris.bka.gv.at.',
      ]},
      { h: 'Online-Streitbeilegung & Verbraucherschlichtung', body: [
        'Hinweis: Die EU-Plattform zur Online-Streitbeilegung (OS) wurde zum 20.07.2025 eingestellt und steht nicht mehr zur Verfügung; ein Link darauf ist nicht mehr erforderlich. Verbraucher:innen in Österreich können sich an die Schlichtung für Verbrauchergeschäfte (www.verbraucherschlichtung.at) wenden. [Angeben, ob wir zur Teilnahme an einem Schlichtungsverfahren verpflichtet bzw. bereit sind.] Wir sind stets bemüht, Meinungsverschiedenheiten zuvor direkt zu klären — schreib uns einfach.',
      ]},
      { h: 'Urheberrecht & Haftung für Links', body: [
        'Alle Inhalte dieser Website — Texte, Illustrationen von Popcorn & Freddy, Fotografien und Gestaltung — sind urheberrechtlich geschützt. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf unserer schriftlichen Zustimmung.',
        'Für Inhalte externer Websites, auf die wir verlinken, übernehmen wir keine Haftung; dafür sind ausschließlich deren Betreiber verantwortlich.',
      ]},
    ],
    note: 'Alle Angaben in [eckigen Klammern] sind Platzhalter und werden vor Veröffentlichung durch die echten Firmendaten ersetzt. Die finalen Rechtstexte kommen von einem Anbieter für abmahnsichere Texte oder von der Rechtsberatung.',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Imprint',
    lede: 'Information pursuant to § 5 Austrian E-Commerce Act (ECG) and disclosure pursuant to § 25 Austrian Media Act.',
    updated: 'Last updated: July 2026',
    sections: [
      { h: 'Media owner & service provider', body: [
        ['[Company name] · [legal form]', '[Street and number], [postal code] [city], Austria', 'Email: [email address]', 'Phone: [phone number]'],
      ]},
      { h: 'Business purpose', body: [
        '[Trade wording — e.g. design, production and sale of personalised children’s books and wooden toys; trade in goods of all kinds].',
      ]},
      { h: 'Company details', body: [
        ['Commercial register number: [FN …]', 'Commercial register court: [competent regional court]', 'VAT ID: [ATU …]', 'Managing director: [name(s)]'],
      ]},
      { h: 'Supervisory authority & chamber membership', body: [
        'Competent trade authority: [district authority / municipal office]. Chamber of commerce membership: [WKO trade group / division]. Applicable trade regulations: [Austrian Trade Act 1994 (GewO)], available at www.ris.bka.gv.at.',
      ]},
      { h: 'Online dispute resolution & consumer arbitration', body: [
        'Note: the EU Online Dispute Resolution (ODR) platform was discontinued on 20 July 2025 and is no longer available; a link to it is no longer required. Consumers in Austria may contact the consumer arbitration board (www.verbraucherschlichtung.at). [State whether we are obliged or willing to participate in an arbitration procedure.] We always try to resolve any disagreement directly first — just write to us.',
      ]},
      { h: 'Copyright & liability for links', body: [
        'All content on this website — texts, the Popcorn & Freddy illustrations, photographs and design — is protected by copyright. Any use beyond the limits of copyright law requires our written consent.',
        'We accept no liability for the content of external websites we link to; their operators are solely responsible.',
      ]},
    ],
    note: 'All entries in [square brackets] are placeholders and will be replaced with the real company data before publication. The final legal texts are supplied by a provider of compliant templates or by legal counsel.',
  },
};

function ImpBody({ lang }) {
  const d = IMP_COPY[lang] || IMP_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />
      <RdLegalDoc updated={d.updated} sections={d.sections} note={d.note} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Impressum" render={(t, lang) => <ImpBody key={lang} lang={lang} />} />
);
