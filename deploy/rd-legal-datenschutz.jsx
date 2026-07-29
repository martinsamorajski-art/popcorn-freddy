// ────────────────────────────────────────────────────────────────
// Datenschutz — DSGVO / österreichisches DSG
// Gerüst mit Platzhaltern: Rechtsgrundlage + Speicherdauer je Abschnitt.
// Finaler Text kommt von abmahnsicherem Anbieter / Rechtsberatung.
// ────────────────────────────────────────────────────────────────

const PRIV_COPY = {
  de: {
    eyebrow: 'Rechtliches',
    title: 'Datenschutz',
    lede: 'Wir gehen mit euren Daten so sorgfältig um wie mit unserem Holz. Diese Erklärung informiert nach Art. 13 und 14 DSGVO darüber, welche Daten wir verarbeiten — und warum.',
    updated: 'Stand: Juli 2026',
    intro: 'Hinweis: Dies ist ein Platzhalter-Gerüst. Alle Angaben in [eckigen Klammern] — insbesondere Rechtsgrundlage und Speicherdauer je Abschnitt — sind vor Veröffentlichung durch die finalen, geprüften Formulierungen (abmahnsicherer Anbieter oder Rechtsberatung) zu ersetzen.',
    sections: [
      { h: 'Verantwortlicher', body: [
        '[Firmenname], [Anschrift], [PLZ Ort], Österreich. E-Mail: [E-Mail-Adresse], Telefon: [Telefonnummer]. Ein Datenschutzbeauftragter ist [gesetzlich nicht erforderlich / bestellt: Name, Kontakt].',
      ]},
      { h: 'Hosting', body: [
        'Unsere Website wird bei [Hosting-Anbieter, Anschrift] betrieben. Der Anbieter verarbeitet in unserem Auftrag technische Daten, die zur Auslieferung der Seite nötig sind. Es besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an sicherem Betrieb].',
        'Speicherdauer: [Platzhalter — nach Vorgabe des Anbieters].',
      ]},
      { h: 'Server-Logfiles', body: [
        'Beim Aufruf der Seite werden automatisch Zugriffsdaten erfasst: [IP-Adresse (ggf. gekürzt), Datum und Uhrzeit, aufgerufene Seite, Browsertyp, Betriebssystem, Referrer]. Diese Daten dienen der technischen Sicherheit und Fehleranalyse und werden nicht mit anderen Daten zusammengeführt.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. f DSGVO].',
        'Speicherdauer: [Platzhalter — z. B. 7–30 Tage, danach Löschung/Anonymisierung].',
      ]},
      { h: 'Cookies & lokaler Speicher', body: [
        'Wir setzen technisch notwendige Cookies bzw. lokalen Speicher (Warenkorb, Spracheinstellung, Cookie-Entscheidung) sowie — nur nach Einwilligung — optionale Statistik-/Marketing-Technologien ein. Details und Widerruf findet ihr in unserer Cookie-Erklärung. Der Zugriff auf Endgeräte richtet sich nach § 165 Abs. 3 TKG 2021.',
        'Rechtsgrundlage: [notwendig: Art. 6 Abs. 1 lit. f DSGVO / § 165 Abs. 3 TKG · optional: Art. 6 Abs. 1 lit. a DSGVO — Einwilligung].',
        'Speicherdauer: [Platzhalter je Cookie/Technologie].',
      ]},
      { h: 'Kontaktaufnahme (E-Mail & Kontaktformular)', body: [
        'Wenn ihr uns schreibt, verarbeiten wir eure Angaben ([Name, E-Mail-Adresse, Nachricht]) zur Beantwortung eurer Anfrage. Ein Kontaktformular überträgt die Daten [verschlüsselt / ohne Drittanbieter].',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich) bzw. lit. f DSGVO].',
        'Speicherdauer: [Platzhalter — bis Erledigung der Anfrage, sofern keine Aufbewahrungspflicht].',
      ]},
      { h: 'Newsletter (Double-Opt-in)', body: [
        'Für den Newsletter verarbeiten wir eure [E-Mail-Adresse] sowie Anmeldezeitpunkt und Bestätigungszeitpunkt. Der Versand erfolgt erst nach Bestätigung über den Link in der Anmelde-E-Mail (Double-Opt-in). Zum Versand nutzen wir [Newsletter-Dienstleister, Anschrift]; es besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO. Die Abmeldung ist über den Link in jeder E-Mail jederzeit möglich.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. a DSGVO — Einwilligung, jederzeit widerrufbar].',
        'Speicherdauer: [Platzhalter — bis zum Widerruf/Abmeldung; Nachweis der Einwilligung darüber hinaus].',
      ]},
      { h: 'Der Name eures Kindes (Personalisierung)', body: [
        'Den Vornamen, den ihr für die Personalisierung angebt, verwenden wir ausschließlich zur Fertigung eurer Box (Druck im Buch, Gravur an der Mappe). Wir verknüpfen ihn mit keiner anderen Datenquelle und nutzen ihn nicht für Werbung.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung].',
        'Speicherdauer: [Platzhalter — z. B. bis 12 Monate nach Bestellabschluss zur Abwicklung von Gewährleistungsfällen].',
      ]},
      { h: 'Zahlungsdienstleister', body: [
        'Zur Zahlungsabwicklung nutzen wir [Zahlungsdienstleister, z. B. Stripe/PayPal, Anschrift]. Je nach gewählter Zahlart werden Zahlungs- und Rechnungsdaten direkt an den Dienstleister übermittelt; wir selbst speichern keine vollständigen Zahlungsdaten. Es gelten zusätzlich die Datenschutzhinweise des jeweiligen Anbieters.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung].',
        'Speicherdauer: [Platzhalter — gesetzliche Aufbewahrung, z. B. § 132 BAO, 7 Jahre].',
      ]},
      { h: 'Versanddienstleister', body: [
        'Zur Lieferung geben wir [Name und Lieferadresse, ggf. E-Mail/Telefon für Zustellinfo] an unseren Versanddienstleister [Name, Anschrift] weiter.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. b DSGVO — Vertragserfüllung].',
        'Speicherdauer: [Platzhalter — für die Dauer der Lieferung; Nachweise nach gesetzlicher Frist].',
      ]},
      { h: 'Analyse- & Reichweiten-Tools', body: [
        'Analyse-Tools setzen wir [derzeit nicht ein / nur nach eurer Einwilligung] ein. Falls eingesetzt: [Tool, Anbieter, Anschrift; Umfang; IP-Anonymisierung ja/nein; Drittlandübermittlung ja/nein]. Skripte werden erst nach Einwilligung geladen.',
        'Rechtsgrundlage: [Art. 6 Abs. 1 lit. a DSGVO — Einwilligung].',
        'Speicherdauer: [Platzhalter je Tool].',
      ]},
      { h: 'Betroffenenrechte', body: [
        'Ihr habt jederzeit folgende Rechte in Bezug auf eure personenbezogenen Daten:',
        ['Auskunft (Art. 15 DSGVO)', 'Berichtigung (Art. 16 DSGVO)', 'Löschung (Art. 17 DSGVO)', 'Einschränkung der Verarbeitung (Art. 18 DSGVO)', 'Datenübertragbarkeit (Art. 20 DSGVO)', 'Widerspruch (Art. 21 DSGVO)', 'Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft'],
        'Zur Ausübung genügt eine formlose Nachricht an [E-Mail-Adresse].',
      ]},
      { h: 'Beschwerderecht bei der Aufsichtsbehörde', body: [
        'Ihr habt das Recht auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Zuständig in Österreich ist die Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien, www.dsb.gv.at.',
        'Rechtsgrundlage: [Art. 77 DSGVO].',
      ]},
    ],
    note: 'Diese Erklärung wird bei Änderungen unserer Abläufe aktualisiert — die jeweils aktuelle Fassung findet ihr immer hier.',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lede: 'We handle your data as carefully as our wood. This notice explains, pursuant to Art. 13 and 14 GDPR, which data we process — and why.',
    updated: 'Last updated: July 2026',
    intro: 'Note: this is a placeholder scaffold. All entries in [square brackets] — in particular the legal basis and retention period per section — must be replaced with the final, reviewed wording (compliant provider or legal counsel) before publication.',
    sections: [
      { h: 'Controller', body: [
        '[Company name], [address], [postal code, city], Austria. Email: [email address], phone: [phone number]. A data protection officer is [not legally required / appointed: name, contact].',
      ]},
      { h: 'Hosting', body: [
        'Our website is operated at [hosting provider, address]. On our behalf, the provider processes technical data required to deliver the site. A data processing agreement under Art. 28 GDPR is in place.',
        'Legal basis: [Art. 6(1)(f) GDPR — legitimate interest in secure operation].',
        'Retention: [placeholder — as specified by the provider].',
      ]},
      { h: 'Server log files', body: [
        'When the site is accessed, access data is recorded automatically: [IP address (possibly shortened), date and time, page requested, browser type, operating system, referrer]. This data serves technical security and error analysis and is not merged with other data.',
        'Legal basis: [Art. 6(1)(f) GDPR].',
        'Retention: [placeholder — e.g. 7–30 days, then deletion/anonymisation].',
      ]},
      { h: 'Cookies & local storage', body: [
        'We use strictly necessary cookies / local storage (basket, language setting, cookie decision) and — only after consent — optional statistics/marketing technologies. Details and revocation are in our cookie notice. Access to devices is governed by § 165(3) TKG 2021.',
        'Legal basis: [necessary: Art. 6(1)(f) GDPR / § 165(3) TKG · optional: Art. 6(1)(a) GDPR — consent].',
        'Retention: [placeholder per cookie/technology].',
      ]},
      { h: 'Contact (email & contact form)', body: [
        'When you write to us, we process your details ([name, email address, message]) to answer your request. A contact form transmits data [encrypted / without third parties].',
        'Legal basis: [Art. 6(1)(b) GDPR (pre-contractual) or (f) GDPR].',
        'Retention: [placeholder — until the request is settled, unless retention is required].',
      ]},
      { h: 'Newsletter (double opt-in)', body: [
        'For the newsletter we process your [email address], the time of sign-up and the time of confirmation. Sending begins only after you confirm via the link in the sign-up email (double opt-in). We use [newsletter provider, address]; a data processing agreement under Art. 28 GDPR is in place. You can unsubscribe at any time via the link in every email.',
        'Legal basis: [Art. 6(1)(a) GDPR — consent, revocable at any time].',
        'Retention: [placeholder — until revocation/unsubscribe; proof of consent beyond that].',
      ]},
      { h: "Your child's name (personalisation)", body: [
        'The first name you provide for personalisation is used exclusively to produce your box (printed in the book, engraved on the folder). We do not link it to any other data source and never use it for advertising.',
        'Legal basis: [Art. 6(1)(b) GDPR — contract fulfilment].',
        'Retention: [placeholder — e.g. up to 12 months after order completion to handle warranty cases].',
      ]},
      { h: 'Payment providers', body: [
        'For payment processing we use [payment provider, e.g. Stripe/PayPal, address]. Depending on the payment method, payment and invoice data is transmitted directly to the provider; we do not store full payment data ourselves. The provider\u2019s own privacy notice also applies.',
        'Legal basis: [Art. 6(1)(b) GDPR — contract fulfilment].',
        'Retention: [placeholder — statutory retention, e.g. § 132 BAO, 7 years].',
      ]},
      { h: 'Shipping providers', body: [
        'For delivery we share [name and delivery address, possibly email/phone for delivery notice] with our shipping provider [name, address].',
        'Legal basis: [Art. 6(1)(b) GDPR — contract fulfilment].',
        'Retention: [placeholder — for the duration of delivery; records per statutory period].',
      ]},
      { h: 'Analytics & reach tools', body: [
        'We use analytics tools [not at present / only after your consent]. If used: [tool, provider, address; scope; IP anonymisation yes/no; third-country transfer yes/no]. Scripts are loaded only after consent.',
        'Legal basis: [Art. 6(1)(a) GDPR — consent].',
        'Retention: [placeholder per tool].',
      ]},
      { h: 'Your rights', body: [
        'You have the following rights regarding your personal data at any time:',
        ['Access (Art. 15 GDPR)', 'Rectification (Art. 16 GDPR)', 'Erasure (Art. 17 GDPR)', 'Restriction (Art. 18 GDPR)', 'Data portability (Art. 20 GDPR)', 'Objection (Art. 21 GDPR)', 'Withdrawal of consent with effect for the future'],
        'An informal message to [email address] is enough to exercise these rights.',
      ]},
      { h: 'Right to lodge a complaint', body: [
        'You have the right to lodge a complaint with a data protection authority. The competent authority in Austria is the Austrian Data Protection Authority (Datenschutzbehörde), Barichgasse 40–42, 1030 Vienna, www.dsb.gv.at.',
        'Legal basis: [Art. 77 GDPR].',
      ]},
    ],
    note: 'This notice is updated whenever our processes change — the current version can always be found here.',
  },
};

function PrivBody({ lang }) {
  const d = PRIV_COPY[lang] || PRIV_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />
      <RdLegalDoc updated={d.updated} intro={d.intro} sections={d.sections} note={d.note} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Datenschutz" render={(t, lang) => <PrivBody key={lang} lang={lang} />} />
);
