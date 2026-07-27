// ────────────────────────────────────────────────────────────────
// Widerruf — Widerrufsbelehrung + Muster-Widerrufsformular (FAGG)
// Text ist PLATZHALTER — der verbindliche Wortlaut kommt aus dem
// amtlichen Muster (Anhang FAGG) bzw. vom abmahnsicheren Anbieter.
// ────────────────────────────────────────────────────────────────

const WID_COPY = {
  de: {
    eyebrow: 'Rechtliches',
    title: 'Widerrufsrecht',
    lede: 'Als Verbraucher:in habt ihr ein gesetzliches Widerrufsrecht. Hier findet ihr die Belehrung und das Muster-Formular.',
    updated: 'Stand: Juli 2026',
    intro: 'Platzhalter-Gerüst. Der verbindliche Wortlaut von Belehrung und Muster-Formular ist wörtlich aus dem amtlichen Muster (Anhang zum Fern- und Auswärtsgeschäfte-Gesetz, FAGG) bzw. von einem Anbieter für abmahnsichere Texte zu übernehmen. Alle Angaben in [eckigen Klammern] sind vorher zu ersetzen.',
    sections: [
      { h: 'Widerrufsrecht', body: [
        'Ihr habt das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem ihr oder ein von euch benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen habt bzw. hat.',
        'Um euer Widerrufsrecht auszuüben, müsst ihr uns ([Firmenname], [Anschrift], [E-Mail-Adresse], [Telefonnummer]) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über euren Entschluss, diesen Vertrag zu widerrufen, informieren. Ihr könnt dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.',
        'Zur Wahrung der Widerrufsfrist reicht es aus, dass ihr die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absendet.',
      ]},
      { h: 'Folgen des Widerrufs', body: [
        'Wenn ihr diesen Vertrag widerruft, haben wir euch alle Zahlungen, die wir von euch erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass ihr eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt habt), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über euren Widerruf bei uns eingegangen ist.',
        'Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das ihr bei der ursprünglichen Transaktion eingesetzt habt, es sei denn, mit euch wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden euch wegen dieser Rückzahlung Entgelte berechnet.',
        'Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis ihr den Nachweis erbracht habt, dass ihr die Waren zurückgesandt habt, je nachdem, welches der frühere Zeitpunkt ist. Ihr tragt die unmittelbaren Kosten der Rücksendung der Waren.',
      ]},
      { h: 'Ausschluss des Widerrufsrechts (personalisierte Boxen)', body: [
        'Das Widerrufsrecht besteht nicht bei Verträgen über die Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch die Verbraucher:innen maßgeblich ist oder die eindeutig auf deren persönliche Bedürfnisse zugeschnitten sind (§ 18 Abs. 1 Z 3 FAGG).',
        'Das betrifft unsere personalisierten Boxen (mit gedrucktem/graviertem Namen des Kindes). Nicht personalisierte Bestandteile bleiben unberührt. [Formulierung final durch Rechtsberatung prüfen lassen.]',
      ]},
    ],
    form_t: 'Muster-Widerrufsformular',
    form_note: 'Wenn ihr den Vertrag widerrufen wollt, füllt bitte dieses Formular aus und sendet es zurück. (Platzhalter — amtlicher Wortlaut übernehmen.)',
    form_lines: [
      'An: [Firmenname], [Anschrift], [E-Mail-Adresse]',
      'Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*):',
      '[Bezeichnung der Ware / Bestellnummer]',
      'Bestellt am (*) / erhalten am (*): [Datum]',
      'Name der/des Verbraucher(s): [Name]',
      'Anschrift der/des Verbraucher(s): [Anschrift]',
      'Unterschrift der/des Verbraucher(s) (nur bei Mitteilung auf Papier): ____________________',
      'Datum: [Datum]',
      '(*) Unzutreffendes streichen.',
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Right of withdrawal',
    lede: 'As a consumer you have a statutory right of withdrawal. Here you will find the instructions and the model form.',
    updated: 'Last updated: July 2026',
    intro: 'Placeholder scaffold. The binding wording of the instructions and model form must be taken verbatim from the official template (annex to the Austrian Distance and Off-Premises Contracts Act, FAGG) or from a provider of compliant texts. All entries in [square brackets] must be replaced beforehand.',
    sections: [
      { h: 'Right of withdrawal', body: [
        'You have the right to withdraw from this contract within fourteen days without giving any reason. The withdrawal period is fourteen days from the day on which you, or a third party named by you who is not the carrier, take possession of the goods.',
        'To exercise your right of withdrawal, you must inform us ([company name], [address], [email address], [phone number]) of your decision to withdraw from this contract by an unequivocal statement (e.g. a letter sent by post or an email). You may use the attached model withdrawal form, but it is not obligatory.',
        'To meet the withdrawal deadline, it is sufficient for you to send your communication concerning the exercise of the right of withdrawal before the withdrawal period has expired.',
      ]},
      { h: 'Effects of withdrawal', body: [
        'If you withdraw from this contract, we shall reimburse all payments received from you, including delivery costs (except for the supplementary costs arising if you chose a type of delivery other than the least expensive standard delivery offered by us), without undue delay and no later than fourteen days from the day on which we are informed of your decision to withdraw.',
        'We will make the reimbursement using the same means of payment as you used for the initial transaction, unless expressly agreed otherwise; in any event you will not incur any fees as a result of the reimbursement.',
        'We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods, whichever is the earliest. You will bear the direct cost of returning the goods.',
      ]},
      { h: 'Exclusion (personalised boxes)', body: [
        'The right of withdrawal does not apply to contracts for the supply of goods that are made to the consumer\u2019s specifications or are clearly personalised (§ 18(1)(3) FAGG).',
        'This applies to our personalised boxes (with the child\u2019s printed/engraved name). Non-personalised components are unaffected. [Final wording to be reviewed by legal counsel.]',
      ]},
    ],
    form_t: 'Model withdrawal form',
    form_note: 'If you want to withdraw from the contract, please complete and return this form. (Placeholder — use the official wording.)',
    form_lines: [
      'To: [company name], [address], [email address]',
      'I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract for the sale of the following goods (*):',
      '[description of goods / order number]',
      'Ordered on (*) / received on (*): [date]',
      'Name of consumer(s): [name]',
      'Address of consumer(s): [address]',
      'Signature of consumer(s) (only if this form is notified on paper): ____________________',
      'Date: [date]',
      '(*) Delete as appropriate.',
    ],
  },
};

function WidBody({ lang }) {
  const d = WID_COPY[lang] || WID_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} />
      <RdLegalDoc updated={d.updated} intro={d.intro} sections={d.sections} />
      <section data-rd style={{ padding: '0 0 130px', background: 'var(--rd-paper)' }}>
        <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
          <div className="r-rev" style={{ border: '1px dashed color-mix(in srgb, var(--rd-ink) 34%, transparent)', borderRadius: 14, padding: '34px 34px 36px', background: 'var(--rd-cream)' }}>
            <span className="r-caps r-caps-rule">{lang === 'de' ? 'Platzhalter — amtliches Muster' : 'Placeholder — official template'}</span>
            <h2 className="r-serif" style={{ fontWeight: 600, fontSize: 'clamp(22px, 2.2vw, 28px)', color: 'var(--rd-ink)', marginTop: 18 }}>{d.form_t}</h2>
            <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.6, textWrap: 'pretty' }}>{d.form_note}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '22px 0 0', display: 'grid', gap: 14, fontFamily: 'var(--f-sans)', fontSize: 15, color: 'var(--rd-ink)', lineHeight: 1.55 }}>
              {d.form_lines.map((l, i) => (
                <li key={i} style={{ borderBottom: '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)', paddingBottom: 12 }}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Widerruf" render={(t, lang) => <WidBody key={lang} lang={lang} />} />
);
