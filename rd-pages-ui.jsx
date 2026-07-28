// ────────────────────────────────────────────────────────────────
// Redesign subpages — shared shell: topbar, page hero, footer, app
// Loads after: tweaks-panel.jsx, copy.jsx, rd-ui.jsx, rd-hero.jsx
// ────────────────────────────────────────────────────────────────

// Every internal path here is run through PFLocale.withLocale so the active
// locale prefix is preserved on every nav, back button, footer link, etc.
function rdP(path) { return (window.PFLocale ? PFLocale.withLocale(path) : path); }
const RD_PAGES = {
  get home() { return (window.PFLocale ? PFLocale.home() : 'index.html'); },
  get checkout() { return rdP('Checkout.html'); },
  get gift() { return rdP('Geschenkkarten.html'); },
  get ship() { return rdP('Versand & Ruecksendung.html'); },
  get contact() { return rdP('Kontakt.html'); },
  get safety() { return rdP('Sicherheit & Material.html'); },
  get prodsafety() { return rdP('Produktsicherheit.html'); },
  get imp() { return rdP('Impressum.html'); },
  get priv() { return rdP('Datenschutz.html'); },
  get agb() { return rdP('AGB.html'); },
  get widerruf() { return rdP('Widerruf.html'); },
  get cookies() { return rdP('Cookies.html'); },
};

// Topbar for subpages — IDENTICAL to the home RdTopBar (same cart button + flyout),
// nav links point back home. Owns its own cart flyout so every subpage shares it.
function RdPageTopBar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState(() => rdCartLoad());
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(null);
  const cartCount = cart.reduce((s, c) => s + (c.qty || 1), 0);
  const prevCount = useRef(cartCount);

  // Keep in sync with adds from the page (dispatch rd-cart-changed) — and pop the
  // flyout + highlight when the count goes up, matching the home page behaviour.
  useEffect(() => {
    const refresh = () => {
      const next = rdCartLoad();
      const nextCount = next.reduce((s, c) => s + (c.qty || 1), 0);
      if (nextCount > prevCount.current) {
        setCartOpen(true);
        const added = next.find((it) => {
          const before = cart.find((c) => c.n === it.n);
          return !before || (it.qty || 1) > (before.qty || 1);
        });
        if (added) { setJustAdded(added.n); setTimeout(() => setJustAdded(null), 900); }
      }
      prevCount.current = nextCount;
      setCart(next);
    };
    window.addEventListener('rd-cart-changed', refresh);
    return () => window.removeEventListener('rd-cart-changed', refresh);
  }, [cart]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const persist = (next) => { setCart(next); prevCount.current = next.reduce((s, c) => s + (c.qty || 1), 0); rdCartSave(next); window.dispatchEvent(new Event('rd-cart-changed')); };
  const changeQty = (n, d) => persist(cart.map((x) => x.n === n ? { ...x, qty: Math.max(1, (x.qty || 1) + d) } : x));
  const removeItem = (n) => persist(cart.filter((x) => x.n !== n));

  const links = [[RD_PAGES.home + '#story', t.nav.story], [RD_PAGES.home + '#chapters', t.nav.chapters], [RD_PAGES.home + '#inside', t.nav.folder], [RD_PAGES.home + '#faq', t.nav.faq]];
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div className="rd-announce">✦ {t.announce} ✦</div>
      <div style={{
        background: scrolled ? 'color-mix(in srgb, var(--rd-paper) 92%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent)' : '1px solid transparent',
        transition: 'background 0.45s var(--ease), border-color 0.45s var(--ease)',
      }} className="rd-header-bg">
        <div className="rwrap-wide rd-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <a href={RD_PAGES.home} aria-label="Popcorn & Freddy" style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <RdLogo size={23} />
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            <div className="rd-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              {links.map(([href, label], i) => (
                <a key={i} href={href} className="rd-nav-link">{label}</a>
              ))}
            </div>
            <RdCartButtons label={t.nav.shop} cartCount={cartCount} onOpenCart={() => setCartOpen((v) => !v)} />
            <RdMobileNav
              links={links} ctaLabel={t.nav.mobile_cta} onCta={() => { window.location.href = RD_PAGES.home + '#chapters'; }}
              extra={<div style={{ padding: '4px 0 10px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)', marginTop: 6, paddingTop: 14 }}><RdLocaleControl lang={lang} setLang={setLang} /></div>}
            />
          </nav>
        </div>
      </div>
      <RdCart open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} lang={lang} onQty={changeQty} onRemove={removeItem} justAdded={justAdded} />
      <style>{`
        @media (max-width: 560px) {
          .rd-cart-label { display: none; }
          .rd-cart-btn { display: none !important; }
          .rd-cart-btn-mobile { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}

// Page hero — quiet editorial opening, shared by all info pages
function RdPageHero({ eyebrow, title, lede }) {
  return (
    <div className="rd-page-hero" style={{ position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 60% 50% at 85% 0%, color-mix(in srgb, var(--rd-gold-soft) 22%, transparent) 0%, transparent 65%), var(--rd-paper)', textAlign: 'center' }}>
      <div className="rwrap-tight r-rev" style={{ position: 'relative', zIndex: 2 }}>
        <span className="r-caps r-caps-rule">{eyebrow}</span>
        <h1 className="r-display" style={{ fontSize: 'clamp(38px, 5vw, 68px)', marginTop: 24, color: 'var(--rd-ink)', textWrap: 'balance' }}>{title}</h1>
        {lede && <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.4vw, 20.5px)', color: 'var(--rd-ink-soft)', marginTop: 20, lineHeight: 1.65, maxWidth: 620, margin: '20px auto 0', textWrap: 'pretty' }}>{lede}</p>}
        <div style={{ marginTop: 28 }}><RdOrnament /></div>
      </div>
    </div>
  );
}

// Footer with real hrefs — mirrors RdFooter on the home page
function RdPageFooter({ t, lang, setLang }) {
  const cols = [
    { title: t.footer.shop, links: [[t.footer.l_chapters, RD_PAGES.home + '#chapters'], [t.footer.l_folder, RD_PAGES.home + '#inside'], [t.footer.l_gift, RD_PAGES.gift], [t.footer.l_bundles, RD_PAGES.home + '#chapters']] },
    { title: t.footer.about, links: [[t.footer.l_story, RD_PAGES.home + '#story'], [t.footer.l_team, '#'], [t.footer.l_press, '#'], [t.footer.l_journal, '#']] },
    { title: t.footer.help, links: [[t.footer.l_ship, RD_PAGES.ship], [t.footer.l_faq, RD_PAGES.home + '#faq'], [t.footer.l_contact, RD_PAGES.contact], [t.footer.l_safety, RD_PAGES.safety], [t.footer.l_prodsafety, RD_PAGES.prodsafety]] },
    { title: t.footer.legal, links: [[t.footer.l_imp, RD_PAGES.imp], [t.footer.l_priv, RD_PAGES.priv], [t.footer.l_agb, RD_PAGES.agb], [t.footer.l_widerruf, RD_PAGES.widerruf], [t.footer.l_cookies, RD_PAGES.cookies]] },
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
            {setLang && <div style={{ marginTop: 26 }}><RdLocaleControl lang={lang} setLang={setLang} dark /></div>}
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
          <div>{t.footer.copy}</div>
          <div style={{ display: 'flex', gap: 16, letterSpacing: '0.06em' }}>
            <span>VISA</span><span>MasterCard</span><span>PayPal</span><span>Klarna</span><span>SEPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Cream info card used across info pages
function RdInfoCard({ icon, title, children, className = '', style }) {
  return (
    <div className={`rd-info-card ${className}`} style={style}>
      {icon && <span className="rd-info-ico"><RdIcon name={icon} size={22} /></span>}
      {title && <h3 className="r-display" style={{ fontSize: 'clamp(20px, 1.8vw, 25px)', color: 'var(--rd-ink)', lineHeight: 1.22 }}>{title}</h3>}
      <div style={{ marginTop: title ? 12 : 0, fontSize: 16.5, color: 'var(--rd-ink-soft)', lineHeight: 1.68 }}>{children}</div>
    </div>
  );
}

// Shared styles for info pages
const RD_PAGE_CSS = `
  .rd-page-hero { padding: 186px 0 70px; }
  @media (max-width: 820px) { .rd-page-hero { padding: 122px 0 56px; } }
  @media (max-width: 560px) { .rd-page-hero { padding: 108px 0 44px; } }
  .rd-info-card { background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent); border-radius: 14px; padding: 34px 34px 32px; box-shadow: 0 30px 60px -42px color-mix(in srgb, var(--rd-ink) 45%, transparent); }
  .rd-info-ico { display: inline-grid; place-items: center; width: 50px; height: 50px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent); color: var(--rd-gold); background: color-mix(in srgb, var(--rd-gold-soft) 12%, transparent); margin-bottom: 20px; }
  .rd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .rd-info-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .rd-page-input { width: 100%; border: 1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent); background: var(--rd-paper); border-radius: 10px; padding: 14px 16px; font-family: var(--f-serif); font-size: 16.5px; color: var(--rd-ink); outline: none; transition: border-color 0.25s, box-shadow 0.25s; }
  .rd-page-input:focus { border-color: var(--rd-gold); box-shadow: 0 0 0 3px color-mix(in srgb, var(--rd-gold) 20%, transparent); }
  .rd-page-input::placeholder { color: var(--rd-ink-mute); }
  textarea.rd-page-input { resize: vertical; min-height: 140px; }
  .rd-page-label { display: block; font-family: var(--f-sans); font-weight: 700; font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rd-ink-soft); margin-bottom: 8px; }
  .rd-check-row { display: grid; grid-template-columns: 26px 1fr; gap: 14px; align-items: start; padding: 13px 0; border-top: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .rd-check-row:last-child { border-bottom: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .rd-check-row .ok { color: var(--rd-moss); margin-top: 3px; }
  .rd-check-row .no { color: var(--rd-terra); margin-top: 3px; }
  @media (max-width: 900px) { .rd-info-grid, .rd-info-grid-3 { grid-template-columns: minmax(0, 1fr); } }
`;

// App wrapper — wires tweaks, language, reveal-on-scroll; `render(t, lang)` returns page body
function RdInfoPageApp({ label, render }) {
  const [tw, setTw] = useTweaks({ palette: 'wald', anim: 5, lang: 'de' });
  const [lang, setLang] = useState(() => rdLangLoad(tw.lang || 'de'));
  const intensity = typeof tw.anim === 'number' ? tw.anim : 5;

  useEffect(() => { setTw('lang', lang); rdLangSave(lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.palette = tw.palette || 'wald';
    document.documentElement.dataset.anim = intensity > 0 ? 'on' : 'off';
    document.documentElement.style.setProperty('--anim-f', String(Math.max(intensity, 1) / 5));
  }, [tw.palette, intensity]);

  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    const scan = () => document.querySelectorAll('.r-rev:not(.in)').forEach((el) => io.observe(el));
    let id = requestAnimationFrame(scan);
    const rescan = () => { cancelAnimationFrame(id); id = requestAnimationFrame(scan); };
    const mo = new MutationObserver(rescan);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('pf-catalog-changed', rescan);
    return () => { cancelAnimationFrame(id); io.disconnect(); mo.disconnect(); window.removeEventListener('pf-catalog-changed', rescan); };
  }, [lang]);

  return (
    <React.Fragment>
      <style>{RD_PAGE_CSS}</style>
      <RdPageTopBar t={t} lang={lang} setLang={setLang} />
      <main data-screen-label={label}>{render(t, lang)}</main>
      <RdPageFooter t={t} lang={lang} setLang={setLang} />
      <TweaksPanel title="Tweaks">
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

// Quiet legal document renderer — numbered sections on paper
function RdLegalDoc({ updated, intro, sections, note }) {
  return (
    <section data-rd style={{ padding: '10px 0 130px', background: 'var(--rd-paper)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
        {updated && <p className="r-it r-rev" style={{ textAlign: 'center', fontSize: 15, color: 'var(--rd-ink-mute)' }}>{updated}</p>}
        {intro && <p className="r-rev" style={{ marginTop: 22, fontSize: 15, color: 'var(--rd-ink-soft)', lineHeight: 1.65, background: 'color-mix(in srgb, var(--rd-gold-soft) 14%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-gold) 32%, transparent)', borderRadius: 12, padding: '16px 20px', textWrap: 'pretty' }}>{intro}</p>}
        <div style={{ marginTop: 34 }}>
          {sections.map((s, i) => (
            <div key={i} className="r-rev" style={{ padding: '34px 0 36px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 20, alignItems: 'baseline' }}>
                <span className="r-display" aria-hidden="true" style={{ fontSize: 26, color: 'var(--rd-gold)' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="r-serif" style={{ fontWeight: 600, fontSize: 'clamp(20px, 1.9vw, 25px)', color: 'var(--rd-ink)', lineHeight: 1.25 }}>{s.h}</h2>
                  {s.body.map((p, j) => (
                    typeof p === 'string'
                      ? <p key={j} style={{ fontSize: 16.5, color: 'var(--rd-ink-soft)', lineHeight: 1.72, marginTop: 14, textWrap: 'pretty' }}>{p}</p>
                      : <ul key={j} style={{ margin: '14px 0 0', paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                          {p.map((li, k) => (
                            <li key={k} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 10, fontSize: 16, color: 'var(--rd-ink-soft)', lineHeight: 1.6 }}>
                              <span aria-hidden="true" style={{ color: 'var(--rd-gold)' }}>✦</span><span>{li}</span>
                            </li>
                          ))}
                        </ul>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {note && <p className="r-it r-rev" style={{ marginTop: 30, textAlign: 'center', fontSize: 14.5, color: 'var(--rd-ink-mute)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', paddingTop: 28 }}>{note}</p>}
      </div>
    </section>
  );
}

Object.assign(window, { RD_PAGES, RdPageTopBar, RdPageHero, RdPageFooter, RdInfoCard, RdInfoPageApp, RdLegalDoc });
