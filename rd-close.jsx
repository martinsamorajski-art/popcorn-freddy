// ────────────────────────────────────────────────────────────────
// Redesign — Family, Testimonials, Newsletter, Footer, Cart, App
// ────────────────────────────────────────────────────────────────

const RD_FAM_ICONS = { '📵': 'screen', '❤️': 'heart', '🎨': 'palette', '🗄️': 'archive' };

// ─── BEHIND THE BRAND — founders' letter ─────────────────────
function RdBrand({ t }) {
  const b = t.brand;
  return (
    <section id="brand" data-rd data-screen-label="Hinter der Marke" style={{ padding: '96px 0 100px', background: 'var(--rd-paper)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <RdHeading eyebrow={b.eyebrow} title={b.title} max={720} />
        <div style={{ marginTop: 26 }} className="r-rev"><RdOrnament /></div>
        <div className="r-rev r-rev-1" style={{ margin: '54px auto 0', maxWidth: 420 }}>
          <div style={{ borderRadius: '210px 210px 16px 16px', overflow: 'hidden', border: '1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent)', padding: 10, background: 'var(--rd-cream)', boxShadow: '0 24px 60px -30px color-mix(in srgb, var(--rd-forest-deep) 45%, transparent)' }}>
            <img src="assets/founders-martin-jessa.jpg" alt="Martin & Jess" style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: '200px 200px 10px 10px' }} />
          </div>
          <p className="r-it" style={{ margin: '16px 0 0', fontSize: 15.5, color: 'color-mix(in srgb, var(--rd-ink) 62%, transparent)' }}>Martin &amp; Jess — {b.eyebrow}</p>
        </div>
        <div className="r-rev r-rev-1" style={{ maxWidth: 640, margin: '54px auto 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 26 }}>
          <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.74, color: 'var(--rd-ink-soft, var(--rd-ink))', textWrap: 'pretty' }}>{b.p1}</p>
          <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.74, color: 'var(--rd-ink-soft, var(--rd-ink))', textWrap: 'pretty' }}>{b.p2}</p>
          {b.p3 ? <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.74, color: 'var(--rd-ink-soft, var(--rd-ink))', textWrap: 'pretty' }}>{b.p3}</p> : null}
          <p className="r-it" style={{ margin: 0, fontSize: 20, lineHeight: 1.6, color: 'var(--rd-ink)', fontWeight: 500 }}>{b.thanks}</p>
        </div>
        <div className="r-rev r-rev-2" style={{ marginTop: 44 }}>
          <span className="r-display" style={{ fontSize: 'clamp(28px, 3vw, 38px)', color: 'var(--rd-terra)' }}>{b.sig}</span>
        </div>
      </div>
    </section>
  );
}

// ─── FAMILY (green interlude) ────────────────────────────────
function RdFamily({ t }) {
  const f = t.family;
  return (
    <section id="folder" data-rd data-screen-label="Für Familien" style={{ padding: '96px 0 100px', background: 'radial-gradient(ellipse 60% 45% at 80% 0%, color-mix(in srgb, var(--rd-moss) 30%, transparent) 0%, transparent 60%), linear-gradient(175deg, var(--rd-forest) 0%, var(--rd-forest-deep) 100%)', color: 'var(--rd-cream)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading dark eyebrow={f.eyebrow} title={f.title} lede={f.sub} max={780} ledeMax={600} />
        <div style={{ marginTop: 24 }} className="r-rev"><RdOrnament color="var(--rd-gold-soft)" /></div>

        <div className="rd-fam-grid" style={{ marginTop: 66 }}>
          {f.cards.map((c, i) => (
            <div key={i} className={`rd-fam-card r-rev r-rev-${(i % 2) + 1}`}>
              <span style={{ display: 'inline-grid', placeItems: 'center', width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(214,196,150,0.4)', color: 'var(--rd-gold-soft)', marginBottom: 22 }}>
                <RdIcon name={RD_FAM_ICONS[c.icon] || 'star'} size={22} />
              </span>
              <h3 className="r-display" style={{ fontSize: 'clamp(22px, 2vw, 27px)', color: 'var(--rd-cream)', lineHeight: 1.2 }}>{c.t}</h3>
              <p style={{ fontSize: 16.5, color: 'rgba(242,236,217,0.76)', marginTop: 14, lineHeight: 1.68, maxWidth: 430, textWrap: 'pretty' }}>{c.d}</p>
            </div>
          ))}
        </div>

        <div className="r-rev" style={{ textAlign: 'center', marginTop: 92 }}>
          <span aria-hidden="true" className="r-it" style={{ display: 'block', fontSize: 60, color: 'color-mix(in srgb, var(--rd-gold-soft) 55%, transparent)', lineHeight: 0.5, marginBottom: 14 }}>„</span>
          <p className="r-it" style={{ fontSize: 'clamp(26px, 3.2vw, 42px)', color: 'var(--rd-cream)', lineHeight: 1.32, maxWidth: 860, margin: '0 auto', fontWeight: 500, textWrap: 'balance' }}>
            {f.quote_a}<br />
            <span style={{ color: 'var(--rd-gold-soft)' }}>{f.quote_b}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS — editorial pull quotes ────────────────────
function RdTestimonials({ t }) {
  const items = t.test.items || [];
  return (
    <section data-rd data-screen-label="Stimmen" style={{ padding: '96px 0 100px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 34, right: 44, color: 'var(--rd-walnut)', zIndex: 1 }}><RdPaws n={4} /></div>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={t.test.eyebrow} title={t.test.title} max={860} />
        {items.length > 0 && (
          <figure className="r-rev rd-test-lead">
            <div className="r-display" aria-hidden="true" style={{ fontSize: 84, color: 'var(--rd-terra)', lineHeight: 0.3, opacity: 0.65 }}>„</div>
            <blockquote className="r-it" style={{ margin: 0, fontSize: 'clamp(23px, 3vw, 31px)', lineHeight: 1.5, color: 'var(--rd-ink)', fontWeight: 500, textWrap: 'balance' }}>{items[0].q}</blockquote>
            <figcaption className="r-caps rd-test-name">{items[0].n}</figcaption>
          </figure>
        )}
        {items.length > 1 && (
          <div className="r-rev rd-test-pair">
            {items.slice(1).map((it, i) => (
              <figure key={i} className="rd-test-side">
                <blockquote className="r-it" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: 'var(--rd-ink)', fontWeight: 500, textWrap: 'pretty' }}>„{it.q}“</blockquote>
                <figcaption className="r-caps rd-test-name">{it.n}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────
const RD_FAQ = {
  de: {
    eyebrow: 'Fragen & Antworten',
    title: 'Gut zu wissen, bevor es losgeht.',
    items: [
      { q: 'Wie wird das Buch personalisiert?', a: 'Der Name deines Kindes wird direkt in die Geschichte gedruckt und in die Kunstleder-Mappe graviert. Du gibst ihn einfach an der Kasse ein — die Vorschau zeigt dir sofort, wie die Gravur aussehen wird.' },
      { q: 'Für welches Alter ist das Abenteuer gedacht?', a: 'Ab 4 Jahren. Jüngere Kinder bauen und bemalen gemeinsam mit euch, ältere Entdecker schaffen vieles schon allein — die Geschichte wächst mit.' },
      { q: 'Was steckt in jeder Box?', a: 'Ein illustriertes Buchkapitel, ein echter Holzspielzeug-Bausatz, Pinsel und Farben, die Schatzkarte zur nächsten Etappe und eine einfache Bauanleitung. Zur ersten Box gibt es die gravierte Kunstleder-Mappe geschenkt.' },
      { q: 'Ist das ein Abo?', a: 'Nein. Jedes Kapitel wird einzeln bestellt — ganz in eurem Tempo. Wenn ein neues Kapitel erscheint, erfährst du es zuerst über die Reisepost (unseren Newsletter).' },
      { q: 'Wie schnell wird geliefert?', a: 'Deine Schatzkiste wird von Hand gepackt und ist in 2–3 Werktagen bei euch. Die Versandkosten werden an der Kasse berechnet.' },
      { q: 'Sind die Materialien sicher?', a: 'Ja. Wir verwenden FSC-Birkenholz und schadstofffreie, kindgerechte Farben. Alles wird in der EU gefertigt und streng geprüft.' },
      { q: 'Kann ich das Abenteuer verschenken?', a: 'Sehr gut sogar. Wähle an der Kasse die magische Geschenkverpackung mit Wachssiegel und Tannenzweig — und trage den Namen des Kindes ein, das beschenkt wird.' },
    ],
  },
  en: {
    eyebrow: 'Questions & answers',
    title: 'Good to know before you set off.',
    items: [
      { q: 'How is the book personalised?', a: "Your child's name is printed right into the story and engraved on the faux leather folder. Simply enter it at checkout — a live preview shows exactly how the engraving will look." },
      { q: 'What age is the adventure made for?', a: 'Ages 4 and up. Younger children build and paint together with you, older explorers manage much of it on their own — the story grows with them.' },
      { q: "What's inside each box?", a: 'An illustrated book chapter, a real wooden toy kit, brush and paints, the treasure map to the next stop and simple assembly instructions. The engraved faux leather folder comes free with your first box.' },
      { q: 'Is it a subscription?', a: "No. Each chapter is ordered individually — at your own pace. When a new chapter appears, you'll hear it first through the travel post (our newsletter)." },
      { q: 'How fast is delivery?', a: 'Your treasure chest is packed by hand and reaches you in 2–3 business days. Shipping is calculated at checkout.' },
      { q: 'Are the materials safe?', a: 'Yes. We use FSC birch wood and non-toxic, child-safe paints. Everything is made in the EU and strictly tested.' },
      { q: 'Can I give the adventure as a gift?', a: 'Absolutely. Choose the magical gift wrapping with wax seal and a sprig of pine at checkout — and enter the name of the child receiving it.' },
    ],
  },
};

function RdFaq({ lang }) {
  const f = RD_FAQ[lang] || RD_FAQ.de;
  return (
    <section id="faq" data-rd data-screen-label="FAQ" style={{ padding: '96px 0 100px', background: 'var(--rd-paper)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={f.eyebrow} title={f.title} max={760} />
        <div className="rd-faq r-rev r-rev-1">
          {f.items.map((it, i) => (
            <details key={lang + i}>
              <summary>
                <h3>{it.q}</h3>
                <span className="rd-faq-mark" aria-hidden="true">+</span>
              </summary>
              <p className="rd-faq-a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER — dusk forest close ──────────────────────────
function RdNewsletter({ t, intensity }) {
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!agree) { setErr(true); return; }
    if (email) setSent(true);
  };
  return (
    <section id="newsletter" data-rd data-screen-label="Newsletter" style={{ padding: '120px 0 150px', color: 'var(--rd-cream)', background: 'radial-gradient(ellipse 70% 55% at 50% 100%, color-mix(in srgb, var(--rd-gold) 18%, transparent) 0%, transparent 55%), linear-gradient(180deg, var(--rd-cream) 0%, color-mix(in srgb, var(--rd-cream) 55%, var(--rd-forest) 45%) 10%, color-mix(in srgb, var(--rd-forest) 65%, var(--rd-cream) 35%) 20%, var(--rd-forest) 32%, var(--rd-forest-deep) 48%, var(--rd-night) 78%)' }}>
      <RdFireflies intensity={intensity} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '46%' }}>
        <RdPines color="#10150C" seed={1} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '32%', opacity: 0.6 }}>
        <RdPines color="#1B2415" seed={4} />
      </div>

      <div className="rwrap-tight r-rev" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="r-caps r-caps-rule" style={{ color: 'var(--rd-gold-soft)' }}>{t.news.eyebrow}</span>
        <h2 className="r-display" style={{ fontSize: 'clamp(42px, 5.8vw, 84px)', color: 'var(--rd-cream)', lineHeight: 1.04, marginTop: 28, textWrap: 'balance' }}>{t.news.title}</h2>
        <p className="r-serif" style={{ fontSize: 'clamp(17.5px, 1.4vw, 21px)', color: 'rgba(242,236,217,0.82)', marginTop: 26, lineHeight: 1.6, maxWidth: 580, margin: '26px auto 0', textWrap: 'pretty' }}>{t.news.body}</p>

        <div style={{ marginTop: 44, display: 'flex', justifyContent: 'center' }}>
          {!sent ? (
            <form className="rd-news-doi" onSubmit={submit} noValidate>
              <div className="rd-news-form">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={t.news.placeholder} aria-label={t.news.placeholder} />
                <button type="submit" className="rbtn rbtn-primary">{t.news.cta}</button>
              </div>
              <label className="rd-news-consent">
                <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErr(false); }} aria-describedby={err ? 'rd-news-err' : undefined} />
                <span>{t.news.consent} <a href="Datenschutz.html">{t.news.consent_link}</a>.</span>
              </label>
              {err && <div id="rd-news-err" role="alert" className="rd-news-err">{t.news.consent_err}</div>}
            </form>
          ) : (
            <div className="r-it" style={{ fontSize: 20, background: 'var(--rd-cream)', color: 'var(--rd-ink)', padding: '20px 34px', borderRadius: 12, boxShadow: '0 26px 55px -22px rgba(0,0,0,0.6)', maxWidth: 460, lineHeight: 1.45, textWrap: 'pretty' }}>{t.news.success}</div>
          )}
        </div>
        <div className="r-hand" style={{ marginTop: 26, color: 'var(--rd-gold-soft)', fontSize: 21 }}>🎁 {t.news.gift}</div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function RdFooter({ t, lang, setLang }) {
  const cols = [
    { title: t.footer.shop, links: [[t.footer.l_chapters, '#chapters'], [t.footer.l_folder, '#inside']] },
    { title: t.footer.about, links: [[t.footer.l_story, '#story'], [t.nav.workshop, '#brand']] },
    { title: t.footer.help, links: [[t.footer.l_ship, 'Versand & Ruecksendung.html'], [t.footer.l_faq, '#faq'], [t.footer.l_contact, 'Kontakt.html'], [t.footer.l_safety, 'Sicherheit & Material.html']] },
    { title: t.footer.legal, links: [[t.footer.l_imp, 'Impressum.html'], [t.footer.l_priv, 'Datenschutz.html'], [t.footer.l_agb, 'AGB.html'], [t.footer.l_cookies, 'Cookies.html']] },
  ];
  return (
    <footer data-screen-label="Footer" style={{ background: 'var(--rd-night)', color: 'rgba(242,236,217,0.72)', padding: '78px 0 40px', borderTop: '1px solid rgba(214,196,150,0.14)' }}>
      <div className="rwrap">
        <div className="rd-footer-grid">
          <div className="rd-footer-brand">
            <RdLogo size={27} tone="cream" />
            <p className="r-it" style={{ marginTop: 16, fontSize: 19, color: 'rgba(242,236,217,0.72)', maxWidth: 300 }}>{t.footer.tag}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              {['IG', 'TT', 'YT', 'PIN'].map((s) => (
                <div key={s} style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(242,236,217,0.28)', display: 'grid', placeItems: 'center', fontSize: 10.5, fontWeight: 800, fontFamily: 'var(--f-sans)', letterSpacing: '0.06em' }}>{s}</div>
              ))}
            </div>
            <div style={{ marginTop: 26 }}><RdLocaleControl lang={lang} setLang={setLang} dark /></div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div className="r-caps" style={{ color: 'var(--rd-gold-soft)', marginBottom: 16, letterSpacing: '0.26em' }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {col.links.map(([l, href], j) => (
                  <li key={j}><a href={href} className="rd-flink">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(242,236,217,0.14)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 13.5, fontFamily: 'var(--f-sans)', color: 'rgba(242,236,217,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <span>{t.footer.copy}</span>
            <button type="button" className="rd-flink" onClick={() => window.pfOpenRegion && window.pfOpenRegion()} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>{lang === 'de' ? 'Region & Sprache' : 'Region & language'}</button>
            <button type="button" className="rd-flink" onClick={() => window.pfOpenConsent && window.pfOpenConsent()} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>{lang === 'de' ? 'Cookie-Einstellungen' : 'Cookie settings'}</button>
          </div>
          <div style={{ display: 'flex', gap: 16, letterSpacing: '0.06em', flexWrap: 'wrap' }}>
            <span>Visa</span><span>Mastercard</span><span>Amex</span><span>PayPal</span><span>Apple&nbsp;Pay</span><span>Google&nbsp;Pay</span><span>Klarna</span><span>SEPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── CART FLYOUT + rdMoney now live in rd-ui.jsx (shared across all pages) ───

// ─── CTA BAND (conversion prompts placed through the page) ────
function RdCtaBand({ t, band, dark = false, primary = false }) {
  if (!band) return null;
  const btnClass = primary
    ? 'rbtn rbtn-primary rbtn-xl'
    : (dark ? 'rbtn rbtn-ghost-light rbtn-xl' : 'rbtn rbtn-ghost rbtn-xl');
  return (
    <section className="rd-cta-band" data-dark={dark ? 'true' : 'false'}>
      <div className="rwrap r-rev" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <span className="r-caps r-caps-rule" style={{ color: dark ? 'var(--rd-gold)' : 'var(--rd-terra)' }}>{band.eyebrow}</span>
        <h2 className="r-display" style={{ fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: 1.08, maxWidth: 720, color: dark ? 'var(--rd-cream)' : 'var(--rd-ink)', textWrap: 'balance' }}>{band.title}</h2>
        <a href={band.href} className={btnClass} style={{ marginTop: 6 }}>
          {band.cta}
          <RdIcon name="arrow" size={17} />
        </a>
        {band.note && (
          <div className="r-caps" style={{ color: dark ? 'color-mix(in srgb, var(--rd-cream) 68%, transparent)' : 'var(--rd-ink-mute)', letterSpacing: '0.12em' }}>{band.note}</div>
        )}
        {t && <RdTrustRow t={t} dark={dark} center style={{ marginTop: 2 }} />}
      </div>
      <style>{`
        .rd-cta-band { padding: clamp(64px, 8vw, 104px) 0; position: relative; }
        .rd-cta-band[data-dark="false"] { background: var(--rd-paper-deep); border-top: 1px solid color-mix(in srgb, var(--rd-ink) 9%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--rd-ink) 9%, transparent); }
        .rd-cta-band[data-dark="true"] { background: var(--rd-night); }
      `}</style>
    </section>
  );
}

// ─── STICKY MOBILE CTA BAR ───────────────────────────────────
function RdStickyBar({ t, onAdd, product }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShow((prev) => {
          const next = window.scrollY > window.innerHeight * 0.72;
          return next === prev ? prev : next;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={'rd-sticky' + (show ? ' show' : '')} aria-hidden={show ? undefined : 'true'}>
      <div className="rwrap rd-sticky-row">
        {/* The bar advertises the featured Shopify product — cover, title and
            price all come from it, so it can never disagree with the card or cart. */}
        <div className="rd-sticky-info">
          {product && product.images && product.images[0]
            ? <img src={product.images[0].src} alt="" className="rd-sticky-thumb" />
            : <span className="rd-sticky-thumb rd-skel" />}
          <div style={{ minWidth: 0 }}>
            <div className="rd-sticky-name">{product ? product.title : ''}</div>
            <div className="rd-sticky-price"><span>{product ? product.priceFormatted : ''}</span><span className="rd-sticky-note">{t.stickyNote}</span></div>
          </div>
        </div>
        <div className="rd-sticky-actions">
          <button className="rbtn rbtn-primary rd-sticky-btn" disabled={!product} onClick={onAdd}>{t.stickyCta} <RdIcon name="arrow" size={16} /></button>
          <a className="rbtn rd-sticky-all" href="Alle Kapitel.html">{t.stickyAll}</a>
        </div>
      </div>
    </div>
  );
}

// ─── EXIT-INTENT MODAL (10% newsletter offer) ────────────────
function RdExitIntent({ t }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem('pf-exit-shown')) return; } catch (e) {}
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 4000);
    const fire = () => {
      if (!armed) return;
      try { if (sessionStorage.getItem('pf-exit-shown')) return; } catch (e) {}
      try { sessionStorage.setItem('pf-exit-shown', '1'); } catch (e) {}
      setOpen(true);
      cleanup();
    };
    const onMouseOut = (e) => { if (e.clientY <= 0 && !e.relatedTarget) fire(); };
    let lastY = window.scrollY, wentDown = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 600) wentDown = true;
      if (wentDown && y < 140 && lastY - y > 46) fire();
      lastY = y;
    };
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() {
      clearTimeout(arm);
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    }
    return cleanup;
  }, []);
  if (!open) return null;
  const e = t.exit;
  return (
    <div className="rd-exit" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
      <div className="rd-exit-card" onClick={(ev) => ev.stopPropagation()}>
        <button className="rd-exit-close" aria-label="close" onClick={() => setOpen(false)}>×</button>
        <div aria-hidden="true" style={{ fontSize: 34 }}>🎁</div>
        <h2 className="r-display" style={{ fontSize: 'clamp(26px, 3vw, 34px)', color: 'var(--rd-ink)', marginTop: 6, textWrap: 'balance' }}>{e.title}</h2>
        {!sent ? (
          <React.Fragment>
            <p className="r-serif" style={{ fontSize: 17, color: 'var(--rd-ink-soft)', marginTop: 12, lineHeight: 1.55, textWrap: 'pretty' }}>{e.body}</p>
            <form className="rd-exit-form" onSubmit={(ev) => { ev.preventDefault(); if (email) setSent(true); }}>
              <input type="email" required value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder={e.placeholder} />
              <button type="submit" className="rbtn rbtn-primary">{e.cta}</button>
            </form>
            <button className="rd-exit-dismiss" onClick={() => setOpen(false)}>{e.dismiss}</button>
          </React.Fragment>
        ) : (
          <p className="r-it" style={{ fontSize: 20, color: 'var(--rd-ink)', marginTop: 18 }}>{e.success}</p>
        )}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const RD_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroDir": "a",
  "palette": "wald",
  "anim": 5,
  "lang": "de"
}/*EDITMODE-END*/;

// ─── ADD TO CART ─────────────────────────────────────────────
// One basket writer for every "add" button on the site. A basket line is only a
// REFERENCE to a Shopify product — { handle, variantId, qty }. Title, image,
// price and stock are read from the shared Shopify catalog at render time, so
// the basket can never disagree with the card or the product page.
function rdUseAddToCart(setCart, setCartOpen, setJustAdded, lang) {
  return (chap, opts) => {
    const handle = typeof chap === 'string' ? chap : (chap && chap.handle);
    if (!handle) return;                       // no product → nothing to add
    const gift = opts && opts.gift ? opts.gift : null;
    const known = (window.PFShop && PFShop.peek) ? PFShop.peek(handle) : null;
    const variantId = (chap && chap.variantId) || (known && known.variantId) || null;
    const max = (chap && chap.max != null) ? chap.max : (known ? known.quantityAvailable : null);
    setCart((c) => {
      const i = c.findIndex((x) => x.n === handle);
      if (i >= 0) {
        const next = [...c];
        const cap = next[i].max != null ? next[i].max : (max != null ? max : 99);
        next[i] = { ...next[i], qty: Math.min(cap, (next[i].qty || 1) + 1), ...(gift ? { gift } : {}) };
        return next;
      }
      return [...c, { n: handle, handle, qty: 1, ...(variantId ? { variantId } : {}), ...(max != null ? { max } : {}), ...(gift ? { gift } : {}) }];
    });
    // Make sure the catalog holds this product (fills in the real variant id).
    if (window.PFShop && PFShop.ensure) {
      PFShop.ensure([handle], lang).then(() => {
        const p = PFShop.peek(handle);
        if (!p) return;
        setCart((c) => c.map((x) => x.n === handle
          ? { ...x, variantId: p.variantId, ...(p.quantityAvailable != null ? { max: p.quantityAvailable } : {}) }
          : x));
      }).catch(() => {});
    }
    setCartOpen(true);
    setJustAdded(handle);
    setTimeout(() => setJustAdded(null), 900);
  };
}

// The chapter a generic CTA (hero, top bar, sticky bar) should add: the first
// purchasable chapter in the Shopify collection. No hardcoded default.
function rdUseFeaturedChapter(lang) {
  const { list } = usePFChapters(lang);
  return list.find((p) => p.available !== false && p.quantityAvailable !== 0) || null;
}

function RdApp() {
  const [tw, setTw] = useTweaks(RD_TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => rdLangLoad(tw.lang || 'de'));
  const [cart, setCart] = useState(() => rdCartLoad());
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  const intensity = typeof tw.anim === 'number' ? tw.anim : 5;

  useEffect(() => { rdCartSave(cart); }, [cart]);

  useEffect(() => { setTw('lang', lang); rdLangSave(lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.palette = tw.palette || 'wald';
    document.documentElement.dataset.anim = intensity > 0 ? 'on' : 'off';
    document.documentElement.style.setProperty('--anim-f', String(Math.max(intensity, 1) / 5));
  }, [tw.palette, intensity]);

  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;

  // reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const id = requestAnimationFrame(() => document.querySelectorAll('.r-rev:not(.in)').forEach((el) => io.observe(el)));
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [lang, tw.heroDir]);

  const addToCart = rdUseAddToCart(setCart, setCartOpen, setJustAdded, lang);
  const featured = rdUseFeaturedChapter(lang);
  const changeQty = (n, d) => setCart((c) => c.map((x) => x.n === n ? { ...x, qty: Math.min(x.max || 99, Math.max(1, (x.qty || 1) + d)) } : x));
  const removeItem = (n) => setCart((c) => c.filter((x) => x.n !== n));

  return (
    <React.Fragment>
      <RdTopBar t={t} lang={lang} setLang={setLang} cartCount={cart.reduce((s, c) => s + (c.qty || 1), 0)} onOpenCart={() => setCartOpen((v) => !v)} onStartAdventure={() => addToCart(featured)} />
      <RdHero t={t} lang={lang} direction={tw.heroDir} intensity={intensity} onAdd={() => addToCart(featured)} />
      <RdInside t={t} lang={lang} />
      <RdWhy t={t} />
      <RdStory t={t} intensity={intensity} />
      <RdHow t={t} />
      <RdChapters t={t} lang={lang} onAdd={addToCart} />
      <RdTestimonials t={t} />
      <RdBrand t={t} />
      <RdCtaBand t={t} band={t.bands && t.bands[2]} primary />
      <RdFaq lang={lang} />
      <RdNewsletter t={t} intensity={intensity} />
      <RdFooter t={t} lang={lang} setLang={setLang} />

      <RdCart open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} lang={lang} onQty={changeQty} onRemove={removeItem} justAdded={justAdded} />
      {featured && <RdStickyBar t={t} product={featured} onAdd={() => addToCart(featured)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Richtung" value={tw.heroDir} options={[{ value: 'a', label: 'Editorial' }, { value: 'b', label: 'Bilderbuch' }]} onChange={(v) => setTw('heroDir', v)} />
        <TweakSection label="Palette" />
        <TweakRadio label="Stimmung" value={tw.palette} options={[{ value: 'wald', label: 'Wald' }, { value: 'birke', label: 'Birke' }, { value: 'abend', label: 'Abend' }]} onChange={(v) => setTw('palette', v)} />
        <TweakSection label="Bewegung" />
        <TweakSlider label="Animations-Intensität" value={intensity} min={0} max={10} step={1} onChange={(v) => setTw('anim', v)} />
        <TweakSection label="Sprache" />
        <TweakRadio label="Language" value={lang} options={[{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }]} onChange={setLang} />
      </TweaksPanel>
    </React.Fragment>
  );
}

// Standalone all-chapters page (Alle Kapitel.html sets window.RD_PAGE = 'chapters')
function RdChaptersPage() {
  const [lang, setLang] = useState('de');
  const [cart, setCart] = useState(() => rdCartLoad());
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  useEffect(() => { rdCartSave(cart); }, [cart]);
  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const id = requestAnimationFrame(() => document.querySelectorAll('.r-rev:not(.in)').forEach((el) => io.observe(el)));
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [lang]);
  const addToCart = rdUseAddToCart(setCart, setCartOpen, setJustAdded, lang);
  const featured = rdUseFeaturedChapter(lang);
  const changeQty = (n, d) => setCart((c) => c.map((x) => x.n === n ? { ...x, qty: Math.min(x.max || 99, Math.max(1, (x.qty || 1) + d)) } : x));
  const removeItem = (n) => setCart((c) => c.filter((x) => x.n !== n));
  return (
    <React.Fragment>
      <RdTopBar t={t} lang={lang} setLang={setLang} cartCount={cart.reduce((s, c) => s + (c.qty || 1), 0)} onOpenCart={() => setCartOpen((v) => !v)} onStartAdventure={() => addToCart(featured)} />
      <RdChapters t={t} lang={lang} onAdd={addToCart} all />
      <RdFooter t={t} lang={lang} setLang={setLang} />
      <RdCart open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} lang={lang} onQty={changeQty} onRemove={removeItem} justAdded={justAdded} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(window.RD_PAGE === 'chapters' ? <RdChaptersPage /> : <RdApp />);
