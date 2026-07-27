// ────────────────────────────────────────────────────────────────
// Home (cinematic) — Testimonials, Newsletter, Footer, Cart, App
// ────────────────────────────────────────────────────────────────

// ─── TESTIMONIALS ────────────────────────────────────────────
function HomeTestimonials({ t }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '170px 0 180px', background: 'linear-gradient(180deg, #2A3422 0%, var(--paper-warm) 14%, var(--cream) 60%, var(--cream) 100%)' }}>
      <LightLeak corner="top-right" color="rgba(224, 138, 60, 0.18)" size={700} />
      <PaperGrain opacity={0.12} />
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 860, margin: '0 auto 64px' }}>
          <span className="eyebrow eyebrow-rule">{t.test.eyebrow}</span>
          <h2 className="display" style={{ fontSize: 'clamp(38px, 4.8vw, 62px)', marginTop: 24, letterSpacing: '-0.018em', color: 'var(--ink)' }}>{t.test.title}</h2>
        </div>
        <div className="test-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30 }}>
          {t.test.items.map((it, i) => (
            <figure key={i} className={`reveal reveal-delay-${i + 1}`} style={{ margin: 0, padding: '40px 36px', background: 'var(--paper)', borderRadius: 16, boxShadow: '0 30px 60px -30px rgba(33,28,24,0.25)', border: '1px solid rgba(33,28,24,0.06)', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="display" style={{ fontSize: 56, color: 'var(--rust)', lineHeight: 0.4, opacity: 0.6 }}>„</div>
              <blockquote className="serif-it" style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: 'var(--ink)', flex: 1, fontWeight: 500 }}>{it.q}</blockquote>
              <figcaption className="eyebrow" style={{ color: 'var(--ink-mute)' }}>{it.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER (closing CTA, night forest) ──────────────────
function HomeNewsletter({ t }) {
  const scrollY = useScrollY();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const ref = useRef(null);
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const visible = window.innerHeight - rect.top;
    setParallax(Math.max(-60, Math.min(60, visible * 0.08)));
  }, [scrollY]);

  return (
    <section id="faq" ref={ref} style={{ position: 'relative', overflow: 'hidden', padding: '200px 0 200px', color: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(224,138,60,0.45) 0%, rgba(244,182,107,0.15) 35%, transparent 70%), linear-gradient(180deg, var(--cream) 0%, var(--night) 14%, var(--night-soft) 60%, #2A3422 100%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '52%', transform: `translateY(${parallax}px)` }}>
        <PineSilhouette color="#0F140C" opacity={1} jitter={4} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '36%', transform: `translateY(${parallax * 0.5}px)`, opacity: 0.7 }}>
        <PineSilhouette color="#1E2618" opacity={0.85} jitter={6} />
      </div>
      <FloatingEmbers count={24} />

      <div className="wrap-tight reveal" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="eyebrow eyebrow-rule" style={{ color: 'var(--lantern)' }}>{t.news.eyebrow}</span>
        <h2 className="display" style={{ fontSize: 'clamp(46px, 6.4vw, 92px)', color: 'var(--paper)', letterSpacing: '-0.022em', lineHeight: 1.02, marginTop: 30, textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>{t.news.title}</h2>
        <p className="serif" style={{ fontSize: 'clamp(18px, 1.5vw, 23px)', color: 'rgba(242,233,217,0.85)', marginTop: 30, lineHeight: 1.55, maxWidth: 600, margin: '30px auto 0', textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>{t.news.body}</p>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
          {!sent ? (
            <form className="news-form" onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} style={{ display: 'flex', width: '100%', maxWidth: 540, background: 'var(--paper)', padding: 8, borderRadius: 999, boxShadow: '0 24px 50px -20px rgba(0,0,0,0.6)', gap: 6 }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={t.news.placeholder} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', padding: '14px 22px', fontSize: 16, color: 'var(--ink)', fontFamily: 'var(--font-body)' }} />
              <button type="submit" className="btn btn-primary">{t.news.cta}</button>
            </form>
          ) : (
            <div className="serif-it" style={{ fontSize: 22, background: 'var(--paper)', color: 'var(--ink)', padding: '18px 34px', borderRadius: 999, boxShadow: '0 24px 50px -20px rgba(0,0,0,0.6)' }}>{t.news.success}</div>
          )}
        </div>
        <div className="hand" style={{ marginTop: 26, color: 'var(--lantern)', fontSize: 18 }}>🎁 {t.news.gift}</div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────
function HomeFooter({ t }) {
  const cols = [
    { title: t.footer.shop, links: [t.footer.l_chapters, t.footer.l_folder, t.footer.l_gift, t.footer.l_bundles] },
    { title: t.footer.about, links: [t.footer.l_story, t.footer.l_team, t.footer.l_press, t.footer.l_journal] },
    { title: t.footer.help, links: [t.footer.l_ship, t.footer.l_faq, t.footer.l_contact, t.footer.l_safety] },
    { title: t.footer.legal, links: [t.footer.l_imp, t.footer.l_priv, t.footer.l_agb, t.footer.l_cookies] },
  ];
  return (
    <footer style={{ background: '#0F140C', color: 'rgba(242,233,217,0.7)', padding: '80px 0 40px' }}>
      <div className="wrap">
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: 44 }}>
          <div className="footer-brand">
            <img src="assets/logo-wordmark.png" alt="Popcorn in Box" style={{ height: 56, width: 'auto', filter: 'invert(1) brightness(0.95)', opacity: 0.9 }} />
            <p className="serif-it" style={{ marginTop: 16, fontSize: 19, color: 'rgba(242,233,217,0.7)', maxWidth: 300 }}>{t.footer.tag}</p>
            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              {['IG', 'TT', 'YT', 'PIN'].map((s) => (
                <div key={s} style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(242,233,217,0.25)', color: 'rgba(242,233,217,0.8)', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700 }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div className="eyebrow" style={{ color: 'var(--lantern)', marginBottom: 16 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {col.links.map((l, j) => (
                  <li key={j}><a href="#" className="footer-link" style={{ color: 'rgba(242,233,217,0.65)', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--lantern)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(242,233,217,0.65)'}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid rgba(242,233,217,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, fontSize: 12.5, color: 'rgba(242,233,217,0.5)' }}>
          <div>{t.footer.copy}</div>
          <div style={{ display: 'flex', gap: 16, letterSpacing: '0.06em' }}>
            <span>VISA</span><span>MasterCard</span><span>PayPal</span><span>Klarna</span><span>SEPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── CART FLYOUT ─────────────────────────────────────────────
function HomeCart({ open, cart, onClose, t, lang }) {
  if (!open) return null;
  const total = cart.length * 39.9;
  const priceStr = lang === 'de' ? '39,90 €' : '€39.90';
  return (
    <div style={{ position: 'fixed', top: 96, right: 24, zIndex: 60, width: 340, background: 'var(--paper)', borderRadius: 16, boxShadow: '0 40px 80px -28px rgba(0,0,0,0.5), 0 0 0 1px rgba(33,28,24,0.08)', padding: 20, animation: 'page-flip 0.4s var(--ease-out)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div className="serif-it" style={{ fontSize: 24, fontWeight: 600, color: 'var(--ink)' }}>{lang === 'de' ? 'Im Korb' : 'Basket'} ({cart.length})</div>
        <button onClick={onClose} aria-label="close" style={{ fontSize: 22, color: 'var(--ink-mute)' }}>×</button>
      </div>
      <div style={{ maxHeight: 280, overflowY: 'auto', display: 'grid', gap: 10 }}>
        {cart.length === 0 && <div className="serif-it" style={{ fontSize: 17, color: 'var(--ink-soft)' }}>{lang === 'de' ? 'Noch leer — Zeit für ein Abenteuer ✦' : 'Empty — time for an adventure ✦'}</div>}
        {cart.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, background: 'var(--cream)', borderRadius: 12 }}>
            <img src={c.img || 'assets/chapter-1-cover.png'} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} alt="" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c[`name_${lang}`] || c.name_de || (lang === 'de' ? 'Kapitel 1' : 'Chapter 1')}</div>
              <div className="serif-it" style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{priceStr}</div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <>
          <div style={{ marginTop: 14, padding: '12px 0', borderTop: '1px dashed rgba(33,28,24,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>{lang === 'de' ? 'Summe' : 'Total'}</span>
            <span className="display" style={{ fontSize: 26, color: 'var(--rust)' }}>{total.toFixed(2).replace('.', lang === 'de' ? ',' : '.')} €</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>{lang === 'de' ? 'Zur Kasse' : 'Checkout'} →</button>
        </>
      )}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "a",
  "lang": "de",
  "treeMotion": "statisch"
}/*EDITMODE-END*/;

const PF_LANG_KEY = 'pf-lang-v1';
function pfLangLoad(fallback) {
  try { const l = localStorage.getItem(PF_LANG_KEY); return (l === 'de' || l === 'en') ? l : fallback; } catch (e) { return fallback; }
}
function pfLangSave(lang) {
  try { localStorage.setItem(PF_LANG_KEY, lang); } catch (e) {}
}

function App() {
  const [tw, setTw] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => pfLangLoad(tw.lang || 'de'));
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { setTw('lang', lang); pfLangSave(lang); document.documentElement.lang = lang; }, [lang]);

  const t = (window.COPY && window.COPY[lang]) || window.COPY.de;

  // reveal-on-scroll — re-observe when language changes (text/DOM refresh)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    const id = requestAnimationFrame(() => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el)));
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [lang, tw.heroVariant]);

  const addToCart = (chap) => {
    setCart((c) => [...c, chap || { n: 1, name_de: 'Kapitel 1', name_en: 'Chapter 1', img: 'assets/chapter-1-cover.png' }]);
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 2600);
  };

  const marqueeItems = lang === 'de'
    ? ['Lesen', 'Bauen', 'Träumen', 'Sammeln', 'Bemalen', 'Entdecken', 'Lieblings-Box', 'Familien-Ritual']
    : ['Read', 'Build', 'Dream', 'Collect', 'Paint', 'Discover', 'Favourite box', 'Family ritual'];

  return (
    <React.Fragment>
      <ScrollProgress />
      <GlobalAtmosphere />
      <HomeTopBar t={t} lang={lang} setLang={setLang} cartCount={cart.length} onOpenCart={() => setCartOpen((v) => !v)} />
      <HomeHero t={t} lang={lang} variant={tw.heroVariant} treeMotion={tw.treeMotion} onAdd={() => addToCart()} />
      <HomeStory t={t} lang={lang} />
      <HomeHow t={t} />
      <HomeMap t={t} lang={lang} onPick={(n) => addToCart({ n, name_de: 'Kapitel ' + n, name_en: 'Chapter ' + n, img: 'assets/chapter-1-cover.png' })} />
      <HomeInside t={t} />
      <HomeChapters t={t} lang={lang} onAdd={addToCart} />
      <HomeFolder t={t} onAdd={() => addToCart()} />
      <HomeTestimonials t={t} />
      <HomeNewsletter t={t} />
      <HomeFooter t={t} />

      <HomeCart open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} t={t} lang={lang} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero" />
        <TweakRadio label="Variante" value={tw.heroVariant} options={[{ value: 'a', label: 'Charaktere' }, { value: 'b', label: 'Szene' }, { value: 'c', label: 'Karte' }]} onChange={(v) => setTw('heroVariant', v)} />
        <TweakSection label="Sprache" />
        <TweakRadio label="Language" value={lang} options={[{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }]} onChange={setLang} />
        <TweakSection label="Wald-Hintergrund" />
        <TweakSelect label="Baum-Bewegung" value={tw.treeMotion} options={[{ value: 'statisch', label: 'Statisch – keine Bewegung' }, { value: 'sanft', label: 'Sanft – ruhige Parallaxe' }, { value: 'wiegen', label: 'Wiegen – sanftes Driften' }, { value: 'original', label: 'Original – kräftig' }]} onChange={(v) => setTw('treeMotion', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
