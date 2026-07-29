// Kapitel 1 — trust: rating, reviews, benefits, included list, badges, FAQ
const CH1_TRUST = {
  de: {
    rating_score: '4,8/5',
    rating_note: 'Basierend auf verifizierten Kundenbewertungen.',
    included_caps: 'Das steckt in Kapitel 1',
    included: [
      '12 liebevoll illustrierte A5-Seiten',
      'In Deutschland auf Premiumpapier gedruckt',
      'Personalisiert mit dem Namen eures Kindes — durch die ganze Geschichte',
      'Holz-Auto-Bausatz inklusive',
      'A5-Kunstleder-Mappe, geprägt mit dem Namen eures Kindes',
      'Große illustrierte A2-Schatzkarte',
      'Farben & Pinsel inklusive',
      'Einfache bebilderte Bauanleitung',
      'Abenteuer-Sticker',
      'Perfekt als Geburtstags- oder Weihnachtsgeschenk',
      'Geeignet ab 4 Jahren',
    ],
    rev_eyebrow: 'Stimmen von Familien',
    rev_title: 'Was Eltern erzählen.',
    reviews: [
      { q: 'Mein Sohn liest sonst nie — jetzt fragt er jeden Abend nach Popcorn. Und ich darf endlich wieder mit Holz und Farbe werken.', n: 'Lena', m: 'Mama von Theo (5)' },
      { q: 'Die Qualität hat mich ehrlich überrascht. Die Mappe fühlt sich wertig an, das Holz ist sauber geschliffen — nichts wirkt wie Massenware.', n: 'Daniel', m: 'Papa von Mira (6)' },
      { q: 'Als ihr eigener Name in der Geschichte auftauchte, hat sie gequietscht vor Freude. Sie glaubt fest, dass die Karte nur für sie gezeichnet wurde.', n: 'Sarah', m: 'Mama von Emilia (4)' },
      { q: 'Der Zusammenbau war auch für kleine Hände machbar — die Anleitung ist wirklich gut bebildert. Das Auto steht jetzt bemalt auf dem Nachttisch.', n: 'Markus', m: 'Papa von Jonas (5)' },
      { q: 'Endlich ein Abend ohne Bildschirm, den sich alle wünschen. Wir lesen, bauen, malen — und reden dabei mehr als sonst die ganze Woche.', n: 'Julia', m: 'Mama von Ben & Paul' },
      { q: 'Die Illustrationen sind wunderschön, fast wie aus einem alten Märchenbuch. Wir warten jetzt alle gespannt auf Kapitel zwei.', n: 'Anna', m: 'Mama von Frieda (7)' },
    ],
    ben_eyebrow: 'Warum Eltern es lieben',
    ben_title: 'Mehr als eine Geschichte.',
    benefits: [
      { icon: 'heart', t: 'Bildschirmfreie Zeit', d: 'Ein gemeinsames Ritual, das Eltern und Kinder verbindet — ganz ohne Bildschirm.' },
      { icon: 'palette', t: 'Kreativität', d: 'Kinder bauen, bemalen und gestalten jedes Werkstück nach ihrer eigenen Vorstellung.' },
      { icon: 'compass', t: 'Problemlösen', d: 'Jedes Kapitel steckt voller Rätsel und Aufgaben, die logisches Denken fördern.' },
      { icon: 'build', t: 'Feinmotorik', d: 'Bauen und Bemalen schulen Koordination und Geschicklichkeit — ganz nebenbei.' },
      { icon: 'book', t: 'Lust am Lesen', d: 'Der eigene Name mitten in der Geschichte macht Kinder zum Teil des Abenteuers.' },
      { icon: 'star', t: 'Ein fortlaufendes Abenteuer', d: 'Jedes Kapitel baut auf dem letzten auf — die Vorfreude auf die nächste Box wächst mit.' },
    ],
    badges: [
      { icon: 'shield', t: 'Sichere Bezahlung', d: 'SSL-verschlüsselter Checkout' },
      { icon: 'truck', t: 'Schnelle Lieferung', d: 'In 2–3 Werktagen bei euch' },
      { icon: 'gift', t: 'Sorgfältig verpackt', d: 'Bereit zum Verschenken' },
      { icon: 'check', t: 'Premium-Material', d: 'FSC-Holz, Farben nach DIN EN 71-3' },
    ],
    badges_pay: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Klarna'],
    faq_eyebrow: 'Gut zu wissen',
    faq_title: 'Häufige Fragen.',
    faq: [
      { q: 'Wie wird das Buch personalisiert?', a: 'An der Kasse tragt ihr den Namen eures Kindes ein. Er wird durch die ganze Geschichte gedruckt und auf der Kunstleder-Mappe geprägt.' },
      { q: 'Worum geht es in der Geschichte?', a: 'Der Bär Popcorn und der Fuchs Freddy finden eine geheimnisvolle Schatzkarte — mit dem Namen eures Kindes darauf. Über acht Kapitel führt die Suche durch Wälder, über Seen und Hügel bis zum verborgenen Schatz.' },
      { q: 'Was ist alles in der Box?', a: 'Das personalisierte Kapitel, der Holz-Auto-Bausatz, Farben & Pinsel, die A2-Schatzkarte, die Bauanleitung, der Abenteuer-Sticker — und zur ersten Box die geprägte Kunstleder-Mappe.' },
      { q: 'Für welches Alter ist es geeignet?', a: 'Zum Vorlesen ab 4 Jahren, zum Selbstlesen ab etwa 6. Gebaut und bemalt wird gemeinsam.' },
      { q: 'Welches Format hat das Buch?', a: 'Jedes Kapitel ist ein hochwertiger A5-Druck — genau passend für die Sammel-Mappe.' },
      { q: 'Welche Materialien werden verwendet?', a: 'FSC-zertifiziertes Birkenholz, speichelfeste Farben auf Wasserbasis nach DIN EN 71-3 und Premiumpapier.' },
      { q: 'Wo wird gedruckt?', a: 'Alle Kapitel werden in Deutschland auf Premiumpapier gedruckt.' },
      { q: 'Wie lange dauert der Versand?', a: '2–3 Werktage. Die Versandkosten werden an der Kasse berechnet.' },
    ],
  },
  en: {
    rating_score: '4.8/5',
    rating_note: 'Based on verified customer reviews.',
    included_caps: "What's inside Chapter 1",
    included: [
      '12 beautifully illustrated A5 pages',
      'Printed in Germany on premium paper',
      "Personalised with your child's name throughout the story",
      'Wooden car construction kit included',
      "A5 faux leather folder embossed with your child's name",
      'Large illustrated A2 treasure map',
      'Paint colours and brushes included',
      'Easy illustrated assembly guide',
      'Adventure sticker',
      'Perfect as a birthday or Christmas gift',
      'Suitable from age 4+',
    ],
    rev_eyebrow: 'Voices from families',
    rev_title: 'What parents say.',
    reviews: [
      { q: 'My son never reads — now he asks for Popcorn every single night. And I finally get to build something with wood and paint again.', n: 'Lena', m: 'Mum of Theo (5)' },
      { q: 'The quality honestly surprised me. The folder feels premium, the wood is sanded perfectly clean — nothing about it feels mass-produced.', n: 'Daniel', m: 'Dad of Mira (6)' },
      { q: 'When her own name appeared in the story she squealed with joy. She is convinced the map was drawn just for her.', n: 'Sarah', m: 'Mum of Emilia (4)' },
      { q: 'Assembly was doable even for small hands — the guide is really well illustrated. The painted car now lives on the bedside table.', n: 'Markus', m: 'Dad of Jonas (5)' },
      { q: 'Finally a screen-free evening everyone actually asks for. We read, build, paint — and talk more than in the rest of the week.', n: 'Julia', m: 'Mum of Ben & Paul' },
      { q: 'The illustrations are gorgeous, like something out of an old storybook. We are all waiting impatiently for chapter two.', n: 'Anna', m: 'Mum of Frieda (7)' },
    ],
    ben_eyebrow: 'Why parents love it',
    ben_title: 'More than a story.',
    benefits: [
      { icon: 'heart', t: 'Screen-free quality time', d: 'A meaningful ritual that brings parents and children together — no screens involved.' },
      { icon: 'palette', t: 'Creativity', d: 'Children build, paint and personalise every creation in their own way.' },
      { icon: 'compass', t: 'Problem solving', d: 'Every chapter is full of puzzles and challenges that encourage logical thinking.' },
      { icon: 'build', t: 'Fine motor skills', d: 'Building and painting develop coordination and dexterity — almost by accident.' },
      { icon: 'book', t: 'Reading motivation', d: "Their own name woven through the story makes children part of the adventure." },
      { icon: 'star', t: 'One continuing adventure', d: 'Each chapter builds on the last — excitement for the next delivery grows with it.' },
    ],
    badges: [
      { icon: 'shield', t: 'Secure payment', d: 'SSL-secured checkout' },
      { icon: 'truck', t: 'Fast delivery', d: 'With you in 2–3 business days' },
      { icon: 'gift', t: 'Carefully packaged', d: 'Ready for gifting' },
      { icon: 'check', t: 'Premium materials', d: 'FSC wood, paints to DIN EN 71-3' },
    ],
    badges_pay: ['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay', 'Klarna'],
    faq_eyebrow: 'Good to know',
    faq_title: 'Frequent questions.',
    faq: [
      { q: 'How is the book personalised?', a: "At checkout you enter your child's name. It is printed throughout the story and embossed on the faux leather folder." },
      { q: 'What is the story about?', a: "Popcorn the bear and Freddy the fox find a mysterious treasure map — with your child's name on it. Across eight chapters, the hunt leads through woods, across lakes and hills to the hidden treasure." },
      { q: 'What is included in the box?', a: 'The personalised chapter, the wooden car kit, paints & brushes, the A2 treasure map, the assembly guide, the adventure sticker — and with the first box, the embossed faux leather folder.' },
      { q: 'What age is it suitable for?', a: 'Reading aloud from age 4, reading alone from about 6. Building and painting is done together.' },
      { q: 'What size is the book?', a: 'Each chapter is a premium A5 print — sized exactly for the collector folder.' },
      { q: 'What materials are used?', a: 'FSC-certified birch wood, saliva-resistant water-based paints to DIN EN 71-3, and premium paper.' },
      { q: 'Where is it printed?', a: 'Every chapter is printed in Germany on premium paper.' },
      { q: 'How long does shipping take?', a: '2–3 business days. Shipping is calculated at checkout.' },
    ],
  },
};

// Filled gold stars
function Ch1Stars({ size = 16 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3, color: 'var(--rd-gold)' }} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2l2.5 5.4 5.9.6-4.4 4 1.3 5.8-5.3-3-5.3 3 1.3-5.8-4.4-4 5.9-.6L12 3.2Z" /></svg>
      ))}
    </span>
  );
}

// Small trust line under the hero lede
function Ch1Rating({ x }) {
  return (
    <div className="r-rev r-rev-2" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
      <Ch1Stars size={16} />
      <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 15.5, color: 'var(--rd-ink)' }}>{x.rating_score}</span>
      <span style={{ fontSize: 14, color: 'var(--rd-ink-mute)' }}>{x.rating_note}</span>
    </div>
  );
}

// Compact checklist under the hero image
function Ch1Included({ x }) {
  return (
    <div className="r-rev r-rev-4 ch1-incl">
      <div className="r-caps" style={{ letterSpacing: '0.22em', color: 'var(--rd-ink-mute)', marginBottom: 16 }}>{x.included_caps}</div>
      <ul className="ch1-incl-list">
        {x.included.map((it, i) => (
          <li key={i}><span className="ch1-incl-check"><RdIcon name="check" size={13} /></span>{it}</li>
        ))}
      </ul>
      <style>{`
        .ch1-incl { margin-top: 34px; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent); border-radius: 14px; padding: 26px 28px; box-shadow: 0 20px 44px -36px color-mix(in srgb, var(--rd-ink) 40%, transparent); }
        .ch1-incl-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 11px; }
        .ch1-incl-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.5; color: var(--rd-ink-soft); font-family: var(--f-sans); font-weight: 500; }
        .ch1-incl-check { flex: none; width: 21px; height: 21px; border-radius: 50%; display: grid; place-items: center; color: var(--rd-cream); background: var(--rd-moss); margin-top: 1px; }
      `}</style>
    </div>
  );
}

// Reviews — peek carousel
function Ch1Reviews({ x }) {
  return (
    <section data-rd data-screen-label="Bewertungen" style={{ padding: '130px 0 130px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={x.rev_eyebrow} title={x.rev_title} max={720} />
        <div className="r-rev" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <Ch1Stars size={17} />
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 16, color: 'var(--rd-ink)' }}>{x.rating_score}</span>
          <span style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{x.rating_note}</span>
        </div>
        <div className="r-rev" style={{ marginTop: 40 }}>
          <RdPeekCarousel ariaLabel={x.rev_eyebrow}>
            {x.reviews.map((r, i) => (
              <div key={i} className="ch1-review">
                <Ch1Stars size={13} />
                <p className="r-serif" style={{ fontSize: 17, lineHeight: 1.62, color: 'var(--rd-ink)', marginTop: 14, textWrap: 'pretty' }}>&ldquo;{r.q}&rdquo;</p>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rd-walnut)' }}>{r.n}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)' }}>{r.m}</span>
                </div>
              </div>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
      <style>{`.ch1-review { height: 100%; background: var(--rd-paper); border: 1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent); border-radius: 14px; padding: 28px 28px 26px; box-shadow: 0 1px 3px color-mix(in srgb, var(--rd-ink) 6%, transparent), 0 22px 44px -34px color-mix(in srgb, var(--rd-ink) 30%, transparent); }`}</style>
    </section>
  );
}

// Benefits — why parents love it
function Ch1Benefits({ x }) {
  return (
    <section data-rd data-screen-label="Warum Eltern es lieben" style={{ padding: '130px 0 140px', background: 'var(--rd-paper)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={x.ben_eyebrow} title={x.ben_title} max={760} />
        <div className="ch1-ben-grid" style={{ marginTop: 60 }}>
          {x.benefits.map((b, i) => (
            <div key={i} className={`r-rev r-rev-${(i % 3) + 1} ch1-ben`}>
              <span className="ch1-ben-ico"><RdIcon name={b.icon} size={22} /></span>
              <h3 className="r-serif" style={{ fontWeight: 600, fontSize: 19.5, color: 'var(--rd-ink)', lineHeight: 1.3 }}>{b.t}</h3>
              <p style={{ fontSize: 15, color: 'var(--rd-ink-soft)', marginTop: 9, lineHeight: 1.62, textWrap: 'pretty' }}>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ch1-ben-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
        .ch1-ben { background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent); border-radius: 14px; padding: 28px 26px; }
        .ch1-ben-ico { display: inline-grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent); color: var(--rd-gold); background: color-mix(in srgb, var(--rd-gold-soft) 12%, transparent); margin-bottom: 16px; }
        @media (max-width: 980px) { .ch1-ben-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 620px) { .ch1-ben-grid { grid-template-columns: minmax(0, 1fr); max-width: 460px; margin-inline: auto; } }
      `}</style>
    </section>
  );
}

// Trust badges + payment providers
function Ch1TrustBadges({ x }) {
  return (
    <section data-rd data-screen-label="Vertrauen" style={{ padding: '64px 0 68px', background: 'var(--rd-paper)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ch1-badges">
          {x.badges.map((b, i) => (
            <div key={i} className="ch1-badge r-rev">
              <span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name={b.icon} size={22} /></span>
              <div>
                <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 14, color: 'var(--rd-ink)' }}>{b.t}</div>
                <div style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', marginTop: 2 }}>{b.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="r-rev" style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', marginTop: 28, fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.08em', color: 'var(--rd-ink-mute)' }}>
          {x.badges_pay.map((p, i) => <span key={i}>{p}</span>)}
        </div>
      </div>
      <style>{`
        .ch1-badges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; max-width: 1020px; margin: 0 auto; }
        .ch1-badge { display: flex; gap: 14px; align-items: flex-start; padding: 4px 6px; }
        @media (max-width: 900px) { .ch1-badges { grid-template-columns: repeat(2, 1fr); max-width: 560px; } }
        @media (max-width: 480px) { .ch1-badges { grid-template-columns: minmax(0, 1fr); } }
      `}</style>
    </section>
  );
}

// FAQ accordion
function Ch1Faq({ x }) {
  const [open, setOpen] = useState(-1);
  return (
    <section data-rd data-screen-label="FAQ" style={{ padding: '120px 0 130px', background: 'var(--rd-paper-soft)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={x.faq_eyebrow} title={x.faq_title} max={640} />
        <div className="r-rev" style={{ marginTop: 48 }}>
          {x.faq.map((f, i) => {
            const on = open === i;
            return (
              <div key={i} style={{ borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', borderBottom: i === x.faq.length - 1 ? '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' : 'none' }}>
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '20px 4px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span className="r-serif" style={{ fontSize: 17.5, fontWeight: 600, color: 'var(--rd-ink)' }}>{f.q}</span>
                  <span aria-hidden="true" style={{ flex: 'none', width: 30, height: 30, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--rd-ink) 24%, transparent)', display: 'grid', placeItems: 'center', color: 'var(--rd-walnut)', transform: on ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s var(--ease)' }}>
                    <svg width="13" height="13" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 1v10M1 6h10" /></svg>
                  </span>
                </button>
                <div style={{ display: 'grid', gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s var(--ease)' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', lineHeight: 1.68, padding: '0 44px 22px 4px', margin: 0, textWrap: 'pretty' }}>{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CH1_TRUST, Ch1Stars, Ch1Rating, Ch1Included, Ch1Reviews, Ch1Benefits, Ch1TrustBadges, Ch1Faq });
