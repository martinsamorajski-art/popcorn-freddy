// ────────────────────────────────────────────────────────────────
// Cookies — § 165 Abs. 3 TKG 2021 + DSGVO
// ────────────────────────────────────────────────────────────────

const COOKIE_COPY = {
  de: {
    eyebrow: 'Rechtliches',
    title: 'Cookie-Erklärung',
    lede: 'Kurz gesagt: Wir verwenden so wenige Cookies wie möglich — und keine, die euch durchs Netz verfolgen.',
    updated: 'Stand: Juli 2026',
    sections: [
      { h: 'Was Cookies sind', body: [
        'Cookies sind kleine Textdateien, die euer Browser speichert, damit die Website funktioniert oder sich Einstellungen merken kann. Der Zugriff auf Informationen auf eurem Gerät richtet sich in Österreich nach § 165 Abs. 3 TKG 2021, die Verarbeitung personenbezogener Daten nach der DSGVO.',
      ]},
      { h: 'Technisch notwendige Cookies & Speicher', body: [
        'Diese benötigen keine Einwilligung, weil ohne sie der Shop schlicht nicht funktioniert:',
        ['Warenkorb — merkt sich, welche Kapitel im Korb liegen (lokaler Speicher, bleibt bis zur Löschung durch euch)', 'Bestellvorgang — hält eure Eingaben an der Kasse fest, damit beim Umblättern nichts verloren geht', 'Einstellungen — gewählte Sprache und Darstellungs-Optionen', 'Cookie-Entscheidung — merkt sich eure Auswahl in dieser Erklärung'],
      ]},
      { h: 'Einwilligungspflichtige Cookies', body: [
        'Aktuell setzen wir keine Analyse-, Marketing- oder Drittanbieter-Cookies ein. Sollte sich das ändern (z. B. für eine reichweitenarme, anonymisierte Statistik), fragen wir euch vorher aktiv um Einwilligung — mit echter Wahl und ohne vorangekreuzte Kästchen. Eure Einwilligung könnt ihr dann jederzeit mit Wirkung für die Zukunft widerrufen.',
      ]},
      { h: 'Schriften & eingebettete Inhalte', body: [
        'Alle Schriften hosten wir selbst auf unserem Server — es findet keine Verbindung zu Google Fonts oder einem anderen externen Anbieter statt, und dabei wird keine IP-Adresse an Dritte übertragen.',
        'Inhalte, die eine Verbindung zu Dritten aufbauen würden (z. B. Karten, Videos oder Zahlungsdienste), laden wir erst nach eurer aktiven Einwilligung. Ohne Einwilligung werden keine entsprechenden Skripte ausgeführt.',
      ]},
      { h: 'Cookies löschen & steuern', body: [
        'Ihr könnt gespeicherte Cookies und lokale Daten jederzeit in den Einstellungen eures Browsers einsehen, blockieren oder löschen. Löscht ihr den lokalen Speicher, leert sich auch euer Warenkorb — die Schatzsuche selbst bleibt davon natürlich unberührt.',
      ]},
      { h: 'Fragen', body: [
        'Bei Fragen zu Cookies oder Datenschutz erreicht ihr uns unter post@popcornundfreddy.at. Mehr zur Verarbeitung personenbezogener Daten steht in unserer Datenschutzerklärung.',
      ]},
    ],
    note: 'Ändert sich unser Cookie-Einsatz, aktualisieren wir diese Erklärung und holen — wo nötig — eure Einwilligung neu ein.',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Cookie Notice',
    lede: 'In short: we use as few cookies as possible — and none that follow you around the web.',
    updated: 'Last updated: July 2026',
    sections: [
      { h: 'What cookies are', body: [
        'Cookies are small text files stored by your browser so the website works or can remember settings. In Austria, access to information on your device is governed by § 165(3) Telecommunications Act 2021 (TKG); the processing of personal data by the GDPR.',
      ]},
      { h: 'Strictly necessary cookies & storage', body: [
        'These require no consent, because the shop simply would not work without them:',
        ['Basket — remembers which chapters are in your basket (local storage, kept until you delete it)', 'Checkout — keeps your entries during checkout so nothing is lost between steps', 'Settings — chosen language and display options', 'Cookie decision — remembers your choice in this notice'],
      ]},
      { h: 'Cookies requiring consent', body: [
        'We currently use no analytics, marketing or third-party cookies. Should that change (e.g. for minimal, anonymised statistics), we will actively ask for your consent first — with a genuine choice and no pre-ticked boxes. You can then revoke your consent at any time with effect for the future.',
      ]},
      { h: 'Fonts & embedded content', body: [
        'We host all fonts ourselves on our own server — there is no connection to Google Fonts or any other external provider, and no IP address is transmitted to third parties.',
        'Content that would establish a connection to third parties (e.g. maps, videos or payment services) is loaded only after your active consent. Without consent, no such scripts are executed.',
      ]},
      { h: 'Deleting & controlling cookies', body: [
        'You can view, block or delete stored cookies and local data at any time in your browser settings. If you clear local storage, your basket empties too — the treasure hunt itself is of course unaffected.',
      ]},
      { h: 'Questions', body: [
        'For questions about cookies or privacy, reach us at post@popcornundfreddy.at. More on the processing of personal data can be found in our privacy policy.',
      ]},
    ],
    note: 'If our use of cookies changes, we will update this notice and — where required — ask for your consent anew.',
  },
};

function CookieBody({ lang }) {
  const d = COOKIE_COPY[lang] || COOKIE_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />
      <RdLegalDoc updated={d.updated} sections={d.sections} note={d.note} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Cookies" render={(t, lang) => <CookieBody key={lang} lang={lang} />} />
);
