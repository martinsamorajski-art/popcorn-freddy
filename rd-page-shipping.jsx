// ────────────────────────────────────────────────────────────────
// Versand & Rücksendung — shipping & returns page
// ────────────────────────────────────────────────────────────────

const SHIP_COPY = {
  de: {
    eyebrow: 'Versand & Rücksendung',
    title: 'Von unserer Werkstatt zu euch.',
    lede: 'Jede Box wird von Hand gepackt, versiegelt und auf die Reise geschickt. Hier steht alles, was du über Versand, Rücksendung und deine Rechte wissen musst.',
    ship_t: 'So reist deine Schatzkiste',
    ship_cards: [
      { icon: 'truck', t: 'Versandkosten', d: 'Die Versandkosten richten sich nach dem Lieferland und werden dir an der Kasse angezeigt, sobald du deine Adresse eingibst. Aktuell liefern wir nach Österreich, Deutschland und in die Schweiz.' },
      { icon: 'archive', t: 'In 3–5 Werktagen bei euch', d: 'Bestellungen bis 14 Uhr packen wir noch am selben Tag. Da jede Box personalisiert wird, kann es in seltenen Fällen einen Werktag länger dauern — wir sagen dir dann Bescheid.' },
      { icon: 'compass', t: 'Sendungsverfolgung inklusive', d: 'Sobald deine Box unterwegs ist, bekommst du eine E-Mail mit Tracking-Link. So wisst ihr genau, wann das Abenteuer klingelt.' },
      { icon: 'shield', t: 'Plastikfrei verpackt', d: 'Wir verpacken in Karton, Holzwolle und Papier — versiegelt mit Wachs. Alles darf ins Altpapier oder auf den Kompost.' },
    ],
    ret_caps: 'Rücksendung',
    ret_t: 'Warum wir keine Rücksendungen annehmen können',
    ret_lede: 'Wir sind da ganz ehrlich mit dir — und der Grund ist eigentlich ein schöner:',
    ret_body_1: 'Jede Abenteuer-Box wird eigens für ein bestimmtes Kind gefertigt: Der Name wird in die Geschichte gedruckt und in die Kunstleder-Mappe graviert. Eine zurückgesandte Box könnte nie einem anderen Kind gehören.',
    ret_body_2: 'Deshalb gilt für personalisierte Boxen kein Rücktrittsrecht. Das entspricht § 18 Abs. 1 Z 3 FAGG (basierend auf Art. 16 lit. c der EU-Verbraucherrechte-Richtlinie 2011/83/EU): Bei Waren, die nach Kundenwünschen angefertigt oder eindeutig personalisiert sind, ist der Rücktritt ausgeschlossen.',
    ret_tip: 'Unser Tipp: Prüfe den Namen an der Kasse ganz in Ruhe — die Gravur-Vorschau zeigt dir genau, wie er aussehen wird.',
    ok_t: 'Was trotzdem immer gilt',
    ok_items: [
      { t: 'Gesetzliche Gewährleistung — 2 Jahre', d: 'Ist etwas beschädigt, fehlerhaft oder unvollständig, gilt die volle gesetzliche Gewährleistung von zwei Jahren (§§ 922 ff ABGB, EU-weit harmonisiert). Wir ersetzen betroffene Teile oder die ganze Box — kostenlos und unkompliziert.' },
      { t: 'Transportschaden? Wir kümmern uns.', d: 'Kommt die Box beschädigt an, schick uns innerhalb von 14 Tagen ein Foto an post@popcornundfreddy.at. Du bekommst sofort Ersatz — die beschädigte Box musst du in der Regel nicht einmal zurückschicken.' },
      { t: 'Nicht personalisierte Artikel: 14 Tage Rücktritt', d: 'Für alles ohne Personalisierung — etwa Farbsets oder Geschenkkarten in Papierform — gilt das normale 14-tägige Rücktrittsrecht nach § 11 FAGG ab Erhalt der Ware, ohne Angabe von Gründen.' },
      { t: 'Falscher Name durch uns? Unser Fehler, unser Ersatz.', d: 'Haben wir uns bei Druck oder Gravur vertan, fertigen wir die Box selbstverständlich neu — mit Vorrang in der Werkstatt.' },
    ],
    law_note: 'Diese Seite fasst deine Rechte verständlich zusammen und ersetzt nicht die vollständige Rücktrittsbelehrung in unseren AGB.',
    help_t: 'Noch unterwegs Fragen?',
    help_d: 'Schreib uns — wir antworten werktags innerhalb von 24 Stunden.',
    help_cta: 'Zum Kontakt',
  },
  en: {
    eyebrow: 'Shipping & returns',
    title: 'From our workshop to your door.',
    lede: 'Every box is packed by hand, sealed and sent on its journey. Here is everything you need to know about shipping, returns and your rights.',
    ship_t: 'How your treasure chest travels',
    ship_cards: [
      { icon: 'truck', t: 'Shipping costs', d: 'Shipping costs depend on the delivery country and are shown at checkout as soon as you enter your address. We currently deliver to Austria, Germany and Switzerland.' },
      { icon: 'archive', t: 'With you in 3–5 business days', d: 'Orders placed before 2 pm are packed the same day. Because every box is personalised, it may occasionally take one business day longer — we will let you know if so.' },
      { icon: 'compass', t: 'Tracking included', d: 'As soon as your box is on its way, you receive an email with a tracking link. So you know exactly when the adventure will ring the doorbell.' },
      { icon: 'shield', t: 'Packed plastic-free', d: 'We pack in cardboard, wood wool and paper — sealed with wax. Everything can go into the paper recycling or onto the compost.' },
    ],
    ret_caps: 'Returns',
    ret_t: "Why we can't accept returns",
    ret_lede: "We'll be completely honest with you — and the reason is actually a lovely one:",
    ret_body_1: "Every adventure box is made for one particular child: the name is printed into the story and engraved on the faux leather folder. A returned box could never belong to another child.",
    ret_body_2: 'That is why the right of withdrawal does not apply to personalised boxes. This follows § 18(1)(3) of the Austrian Distance Selling Act (FAGG, based on Art. 16 (c) of the EU Consumer Rights Directive 2011/83/EU): for goods made to the customer’s specifications or clearly personalised, withdrawal is excluded.',
    ret_tip: 'Our tip: check the name calmly at checkout — the engraving preview shows you exactly how it will look.',
    ok_t: 'What always applies anyway',
    ok_items: [
      { t: 'Legal guarantee — 2 years', d: 'If anything is damaged, faulty or incomplete, the full statutory guarantee of two years applies (§§ 922 ff Austrian Civil Code, harmonised EU-wide). We replace the affected parts or the whole box — free of charge and without fuss.' },
      { t: 'Damaged in transit? We take care of it.', d: 'If the box arrives damaged, send us a photo within 14 days to post@popcornundfreddy.at. You get a replacement right away — you usually don’t even have to send the damaged box back.' },
      { t: 'Non-personalised items: 14-day withdrawal', d: 'For anything without personalisation — such as paint sets or printed gift cards — the standard 14-day right of withdrawal under § 11 FAGG applies from receipt of the goods, no reasons needed.' },
      { t: 'Wrong name because of us? Our mistake, our replacement.', d: 'If we made an error in printing or engraving, we will of course remake the box — with priority in the workshop.' },
    ],
    law_note: 'This page summarises your rights in plain language and does not replace the full withdrawal policy in our terms and conditions.',
    help_t: 'Questions along the way?',
    help_d: 'Write to us — we reply within 24 hours on weekdays.',
    help_cta: 'Contact us',
  },
};

function ShipBody({ lang }) {
  const s = SHIP_COPY[lang] || SHIP_COPY.de;
  return (
    <React.Fragment>
      <RdPageHero eyebrow={s.eyebrow} title={s.title} lede={s.lede} />

      {/* shipping cards */}
      <section data-rd style={{ padding: '30px 0 110px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="rd-info-grid">
            {s.ship_cards.map((c, i) => (
              <RdInfoCard key={i} className={`r-rev r-rev-${(i % 2) + 1}`} icon={c.icon} title={c.t}>{c.d}</RdInfoCard>
            ))}
          </div>
        </div>
      </section>

      {/* returns — green interlude, honest */}
      <section data-rd style={{ padding: '120px 0 120px', background: 'radial-gradient(ellipse 60% 45% at 80% 0%, color-mix(in srgb, var(--rd-moss) 30%, transparent) 0%, transparent 60%), linear-gradient(175deg, var(--rd-forest) 0%, var(--rd-forest-deep) 100%)', color: 'var(--rd-cream)' }}>
        <div className="rwrap-tight r-rev" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="r-caps r-caps-rule" style={{ color: 'var(--rd-gold-soft)' }}>{s.ret_caps}</span>
          <h2 className="r-display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginTop: 24, color: 'var(--rd-cream)', textWrap: 'balance' }}>{s.ret_t}</h2>
          <p className="r-it" style={{ fontSize: 'clamp(18px, 1.5vw, 22px)', color: 'var(--rd-gold-soft)', marginTop: 22 }}>{s.ret_lede}</p>
          <p style={{ fontSize: 'clamp(16.5px, 1.35vw, 19px)', color: 'rgba(242,236,217,0.86)', marginTop: 18, lineHeight: 1.7, textWrap: 'pretty' }}>{s.ret_body_1}</p>
          <p style={{ fontSize: 15.5, color: 'rgba(242,236,217,0.62)', marginTop: 18, lineHeight: 1.7, textWrap: 'pretty' }}>{s.ret_body_2}</p>
          <div style={{ marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 24px', border: '1px solid rgba(214,196,150,0.35)', borderRadius: 10, background: 'rgba(250,246,235,0.06)' }}>
            <span style={{ color: 'var(--rd-gold-soft)', display: 'inline-flex' }}><RdIcon name="star" size={16} /></span>
            <span className="r-it" style={{ fontSize: 16, color: 'rgba(242,236,217,0.85)', textAlign: 'left' }}>{s.ret_tip}</span>
          </div>
        </div>
      </section>

      {/* rights that always apply */}
      <section data-rd style={{ padding: '120px 0 110px', background: 'var(--rd-cream)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <RdHeading eyebrow={lang === 'de' ? 'Deine Rechte' : 'Your rights'} title={s.ok_t} max={720} />
          <div className="rd-info-grid" style={{ marginTop: 60 }}>
            {s.ok_items.map((it, i) => (
              <div key={i} className={`r-rev r-rev-${(i % 2) + 1}`} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 18, alignItems: 'start', padding: '26px 4px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' }}>
                <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--rd-gold) 60%, transparent)', color: 'var(--rd-moss)', display: 'grid', placeItems: 'center', marginTop: 3 }}><RdIcon name="check" size={15} /></span>
                <div>
                  <h3 className="r-serif" style={{ fontWeight: 600, fontSize: 'clamp(18px, 1.6vw, 21px)', color: 'var(--rd-ink)', lineHeight: 1.3 }}>{it.t}</h3>
                  <p style={{ fontSize: 16, color: 'var(--rd-ink-soft)', marginTop: 8, lineHeight: 1.68, textWrap: 'pretty' }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="r-it r-rev" style={{ marginTop: 44, textAlign: 'center', fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{s.law_note}</p>
        </div>
      </section>

      {/* help */}
      <section data-rd style={{ padding: '96px 0 110px', background: 'var(--rd-paper)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)', textAlign: 'center' }}>
        <div className="rwrap-tight r-rev" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="r-display" style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', color: 'var(--rd-ink)' }}>{s.help_t}</h2>
          <p className="r-it" style={{ fontSize: 17.5, color: 'var(--rd-ink-soft)', marginTop: 12 }}>{s.help_d}</p>
          <a href={RD_PAGES.contact} className="rbtn rbtn-primary rbtn-xl" style={{ marginTop: 28 }}>{s.help_cta} <RdIcon name="arrow" size={17} /></a>
        </div>
      </section>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Versand & Rücksendung" render={(t, lang) => <ShipBody key={lang} lang={lang} />} />
);
