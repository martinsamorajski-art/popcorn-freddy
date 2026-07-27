// ────────────────────────────────────────────────────────────────
// Kontakt — contact page
// ────────────────────────────────────────────────────────────────

const CONTACT_COPY = {
  de: {
    eyebrow: 'Kontakt',
    title: 'Schreib uns eine Zeile.',
    lede: 'Ob Frage zur Bestellung, zur Gravur oder einfach eine Geschichte von eurer Schatzsuche — wir lesen jede Nachricht selbst.',
    f_name: 'Dein Name', f_name_ph: 'Vor- und Nachname',
    f_email: 'E-Mail', f_email_ph: 'du@beispiel.de',
    f_order: 'Bestellnummer (optional)', f_order_ph: 'z. B. PF-2026-4821',
    f_topic: 'Worum geht es?',
    topics: ['Frage zur Bestellung', 'Personalisierung & Gravur', 'Versand & Lieferung', 'Geschenkkarten', 'Etwas ist beschädigt', 'Presse & Zusammenarbeit', 'Etwas anderes'],
    f_msg: 'Deine Nachricht', f_msg_ph: 'Erzähl uns, wie wir helfen können …',
    cta: 'Nachricht senden',
    done_t: 'Deine Nachricht ist angekommen.',
    done_d: 'Danke! Wir melden uns werktags innerhalb von 24 Stunden bei dir — versprochen.',
    again: 'Noch eine Nachricht schreiben',
    side_t: 'So erreichst du uns',
    side_mail_t: 'Reisepost', side_mail: 'post@popcornundfreddy.at',
    side_time_t: 'Antwortzeit', side_time: 'Werktags innerhalb von 24 Stunden. Am Wochenende sind wir im Wald unterwegs.',
    side_addr_t: 'Werkstatt & Postadresse',
    side_addr: ['Popcorn & Freddy GmbH', 'Am Waldrand 7', '6020 Innsbruck', 'Österreich'],
    faq_t: 'Vielleicht schon beantwortet?',
    faq_d: 'Die häufigsten Fragen — von Personalisierung bis Lieferzeit — beantworten wir hier:',
    faq_cta: 'Zu den Fragen & Antworten',
  },
  en: {
    eyebrow: 'Contact',
    title: 'Drop us a line.',
    lede: 'A question about your order, the engraving, or simply a story from your treasure hunt — we read every message ourselves.',
    f_name: 'Your name', f_name_ph: 'First and last name',
    f_email: 'Email', f_email_ph: 'you@example.com',
    f_order: 'Order number (optional)', f_order_ph: 'e.g. PF-2026-4821',
    f_topic: 'What is it about?',
    topics: ['Question about my order', 'Personalisation & engraving', 'Shipping & delivery', 'Gift cards', 'Something is damaged', 'Press & collaborations', 'Something else'],
    f_msg: 'Your message', f_msg_ph: 'Tell us how we can help …',
    cta: 'Send message',
    done_t: 'Your message has arrived.',
    done_d: 'Thank you! We will get back to you within 24 hours on weekdays — promised.',
    again: 'Write another message',
    side_t: 'How to reach us',
    side_mail_t: 'Travel post', side_mail: 'post@popcornundfreddy.at',
    side_time_t: 'Response time', side_time: 'Within 24 hours on weekdays. On weekends we are out in the woods.',
    side_addr_t: 'Workshop & postal address',
    side_addr: ['Popcorn & Freddy GmbH', 'Am Waldrand 7', '6020 Innsbruck', 'Austria'],
    faq_t: 'Perhaps already answered?',
    faq_d: 'We answer the most common questions — from personalisation to delivery times — right here:',
    faq_cta: 'To the questions & answers',
  },
};

function ContactBody({ lang }) {
  const c = CONTACT_COPY[lang] || CONTACT_COPY.de;
  const [form, setForm] = useState({ topic: 0 });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <React.Fragment>
      <RdPageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede} />
      <section data-rd style={{ padding: '30px 0 130px', background: 'var(--rd-paper)' }}>
        <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="rd-contact-grid">
            {/* form */}
            {!sent ? (
              <form className="rd-info-card r-rev" onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }} className="rd-contact-row">
                  <div>
                    <label className="rd-page-label" htmlFor="c-name">{c.f_name}</label>
                    <input id="c-name" className="rd-page-input" required value={form.name || ''} onChange={set('name')} placeholder={c.f_name_ph} autoComplete="name" />
                  </div>
                  <div>
                    <label className="rd-page-label" htmlFor="c-email">{c.f_email}</label>
                    <input id="c-email" type="email" className="rd-page-input" required value={form.email || ''} onChange={set('email')} placeholder={c.f_email_ph} autoComplete="email" />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }} className="rd-contact-row">
                  <div>
                    <label className="rd-page-label" htmlFor="c-order">{c.f_order}</label>
                    <input id="c-order" className="rd-page-input" value={form.order || ''} onChange={set('order')} placeholder={c.f_order_ph} />
                  </div>
                  <div>
                    <label className="rd-page-label" htmlFor="c-topic">{c.f_topic}</label>
                    <select id="c-topic" className="rd-page-input" value={form.topic} onChange={set('topic')}>
                      {c.topics.map((tp, i) => <option key={i} value={i}>{tp}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: 18 }}>
                  <label className="rd-page-label" htmlFor="c-msg">{c.f_msg}</label>
                  <textarea id="c-msg" className="rd-page-input" required value={form.msg || ''} onChange={set('msg')} placeholder={c.f_msg_ph}></textarea>
                </div>
                <button type="submit" className="rbtn rbtn-primary rbtn-xl" style={{ width: '100%', marginTop: 24 }}>{c.cta} <RdIcon name="arrow" size={17} /></button>
              </form>
            ) : (
              <div className="rd-info-card r-rev" style={{ textAlign: 'center', padding: '58px 40px', alignSelf: 'start' }}>
                <span style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: '50%', background: 'var(--rd-forest)', color: 'var(--rd-on-primary)', margin: '0 auto 20px' }}><RdIcon name="check" size={28} /></span>
                <h2 className="r-display" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', color: 'var(--rd-ink)' }}>{c.done_t}</h2>
                <p className="r-it" style={{ fontSize: 17, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.6 }}>{c.done_d}</p>
                <button className="rbtn rbtn-ghost" style={{ marginTop: 28 }} onClick={() => { setSent(false); setForm({ topic: 0 }); }}>{c.again}</button>
              </div>
            )}

            {/* side info */}
            <aside style={{ display: 'grid', gap: 0, alignContent: 'start' }} className="r-rev r-rev-1">
              <div className="r-caps" style={{ marginBottom: 10 }}>{c.side_t}</div>
              <div className="rd-check-row" style={{ gridTemplateColumns: '46px 1fr' }}>
                <span className="rd-info-ico" style={{ width: 42, height: 42, marginBottom: 0 }}><RdIcon name="book" size={18} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{c.side_mail_t}</div>
                  <a href={'mailto:' + c.side_mail} className="r-it" style={{ fontSize: 16.5, color: 'var(--rd-walnut)', textDecoration: 'underline', textDecorationColor: 'color-mix(in srgb, var(--rd-gold) 60%, transparent)' }}>{c.side_mail}</a>
                </div>
              </div>
              <div className="rd-check-row" style={{ gridTemplateColumns: '46px 1fr' }}>
                <span className="rd-info-ico" style={{ width: 42, height: 42, marginBottom: 0 }}><RdIcon name="star" size={18} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{c.side_time_t}</div>
                  <p className="r-it" style={{ fontSize: 16, color: 'var(--rd-ink-soft)', lineHeight: 1.55, marginTop: 2 }}>{c.side_time}</p>
                </div>
              </div>
              <div className="rd-check-row" style={{ gridTemplateColumns: '46px 1fr' }}>
                <span className="rd-info-ico" style={{ width: 42, height: 42, marginBottom: 0 }}><RdIcon name="compass" size={18} /></span>
                <div>
                  <div style={{ fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 14.5, color: 'var(--rd-ink)' }}>{c.side_addr_t}</div>
                  <p className="r-it" style={{ fontSize: 16, color: 'var(--rd-ink-soft)', lineHeight: 1.55, marginTop: 2 }}>
                    {c.side_addr.map((l, i) => <span key={i} style={{ display: 'block' }}>{l}</span>)}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 34, padding: '26px 28px', borderRadius: 14, background: 'color-mix(in srgb, var(--rd-gold-soft) 14%, transparent)', border: '1px dashed color-mix(in srgb, var(--rd-gold) 55%, transparent)' }}>
                <h3 className="r-display" style={{ fontSize: 21, color: 'var(--rd-ink)' }}>{c.faq_t}</h3>
                <p className="r-it" style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 8, lineHeight: 1.6 }}>{c.faq_d}</p>
                <a href={RD_PAGES.home + '#faq'} className="r-link" style={{ display: 'inline-block', marginTop: 14, fontSize: 14.5, color: 'var(--rd-walnut)' }}>{c.faq_cta} →</a>
              </div>
            </aside>
          </div>
        </div>
        <style>{`
          .rd-contact-grid { display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 52px; align-items: start; }
          @media (max-width: 980px) { .rd-contact-grid { grid-template-columns: minmax(0, 1fr); gap: 44px; } }
          @media (max-width: 560px) { .rd-contact-row { grid-template-columns: minmax(0, 1fr) !important; } }
        `}</style>
      </section>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RdInfoPageApp label="Kontakt" render={(t, lang) => <ContactBody key={lang} lang={lang} />} />
);
