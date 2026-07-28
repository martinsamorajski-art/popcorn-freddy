// ────────────────────────────────────────────────────────────────
// Popcorn & Freddy — ONE reusable product page (headless Shopify)
// ────────────────────────────────────────────────────────────────
// Renders the EXISTING product-page design, but every product-specific
// value (name, price, images, description, inventory, reviews, and the
// "additional information" blocks) is loaded dynamically from Shopify
// by the product's handle. Add a product in Shopify → it appears here.
// No new code per product.
//
//   URL:  /produkt/<handle>   (or  Produkt.html?handle=<handle>)
//
// Reused as-is (identical look): RdPageTopBar/Footer, RdCart, RdHeading,
// RdPeekCarousel, Ch1Stars, Ch1TrustBadges, Ch1Benefits, Ch1Faq,
// Ch1Included, GPSR blocks, SHOP_CSS. Only the DATA changes.
// ────────────────────────────────────────────────────────────────

// ── which product? handle from the pretty path or ?handle= ──────
// Route internal links through the universal locale helper (keeps the prefix).
function wP(path) { return (window.PFLocale ? PFLocale.withLocale(path) : path); }
function pfProductHandle() {
  var q = new URLSearchParams(location.search);
  var h = q.get('handle') || q.get('produkt') || q.get('product');
  if (h) return h.trim();
  var m = location.pathname.match(/\/produkt\/([^/?#]+)/i);
  if (m) return decodeURIComponent(m[1]);
  return null;   // no handle → the first chapter in the Shopify collection
}

// Static UI microcopy that isn't product data (labels, not content)
const PF_UI = {
  de: { added: 'Liegt im Korb', checkout: 'Zur Kasse', add: 'In den Warenkorb', price_note: 'inkl. MwSt.',
    readmore: 'Die ganze Geschichte lesen', rating_count: function (n) { return 'aus ' + n + ' Bewertungen'; },
    name_hint: '— erscheint gedruckt in der Geschichte', name_ph: 'z. B. Mia', emotion_k: 'Gefühl',
    reviews_eyebrow: 'Stimmen von Familien', reviews_title: 'Was Eltern nach der ersten Box sagen.', verified: 'Verifizierter Kauf',
    pages_eyebrow: 'Blick ins Buch', pages_title: 'Die ersten Seiten dieses Kapitels.',
    pages_note: 'Ein kleiner Vorgeschmack — gedruckt auf feinem Papier, in A5.',
    others_eyebrow: 'Die Reise geht weiter', others_title: 'Die anderen Kapitel.',
    inside_eyebrow: 'In der Box', inside_title: 'Was in eurer Schatzkiste steckt.',
    story_eyebrow: 'Worum es geht', details_eyebrow: 'Auf einen Blick', details_title: 'Die Fakten zu diesem Kapitel.',
    close_caps: 'Bereit für den ersten Schritt?', close_title: 'Das Abenteuer wartet schon.',
    close_body: 'Trag an der Kasse den Namen eures Kindes ein — den Rest erledigen unsere Hände in der Werkstatt.',
    back_link: 'Alle Kapitel ansehen', sold_out: 'Zurzeit ausverkauft', notify: 'Benachrichtigt mich', unavailable: 'Produkt nicht gefunden.' },
  en: { added: 'In your basket', checkout: 'To checkout', add: 'Add to basket', price_note: 'incl. VAT',
    readmore: 'Read the full story', rating_count: function (n) { return 'from ' + n + ' reviews'; },
    name_hint: '— appears printed in the story', name_ph: 'e.g. Mia', emotion_k: 'Emotion',
    reviews_eyebrow: 'Voices from families', reviews_title: 'What parents say after the first box.', verified: 'Verified purchase',
    pages_eyebrow: 'A look inside', pages_title: 'The first pages of this chapter.',
    pages_note: 'A little taste — printed on fine paper, in A5.',
    others_eyebrow: 'The journey continues', others_title: 'The other chapters.',
    inside_eyebrow: 'Inside the box', inside_title: 'What your treasure chest holds.',
    story_eyebrow: 'The story', details_eyebrow: 'At a glance', details_title: 'The facts about this chapter.',
    close_caps: 'Ready for the first step?', close_title: 'The adventure is waiting.',
    close_body: "Enter your child's name at checkout — our hands in the workshop take care of the rest.",
    back_link: 'See all chapters', sold_out: 'Currently sold out', notify: 'Notify me', unavailable: 'Product not found.' },
};

function pfStripTags(html) {
  if (!html) return '';
  var d = document.createElement('div'); d.innerHTML = html; return (d.textContent || '').trim();
}
function psScrollTo(id) {
  var el = document.getElementById(id); if (!el) return;
  var y = el.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
// Title with the last word emphasised in terra + squiggle (matches the design)
function PSTitle({ title }) {
  var words = (title || '').trim().split(/\s+/);
  var last = words.pop();
  var head = words.join(' ');
  return (
    <h1 className="r-display" style={{ fontSize: 'clamp(38px, 4.4vw, 60px)', color: 'var(--rd-ink)', marginTop: 14, lineHeight: 1.02, textWrap: 'balance' }}>
      {head ? head + ' ' : ''}
      <span style={{ position: 'relative', display: 'inline-block', color: 'var(--rd-terra)' }}>{last}
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: -8 }}><RdSquiggle width={200} /></span>
      </span>
    </h1>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────
function PSGallery({ images }) {
  const [i, setI] = useState(0);
  const list = images && images.length ? images : [];
  const main = list[Math.min(i, list.length - 1)];
  if (!main) return <div className="shop-gal r-rev"><div className="shop-gal-main"><div className="rd-skel" style={{ width: '100%', height: '100%' }} /></div></div>;
  return (
    <div className="shop-gal r-rev">
      <div className="shop-gal-main">
        <img src={main.src} alt={main.alt} style={{ objectFit: main.fit || 'cover' }} key={main.src} />
      </div>
      <div className="shop-gal-thumbs" role="tablist">
        {list.map((g, idx) => (
          <button key={g.src + idx} role="tab" aria-selected={idx === i} aria-label={g.alt} onClick={() => setI(idx)} className={`shop-gal-thumb ${idx === i ? 'on' : ''}`}>
            <img src={g.src} alt="" style={{ objectFit: g.fit === 'contain' ? 'contain' : 'cover' }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BUY BOX ─────────────────────────────────────────────────
function PSBuyBox({ p, ui, x, lang, inCart, onAdd }) {
  const [childName, setChildName] = useState('');
  const ratingCount = p.rating_count || 0;
  const lede = pfStripTags(p.descriptionHtml) || '';
  const soldOut = p.available === false;
  return (
    <div className="shop-buy r-rev r-rev-1">
      {p.caps && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--rd-gold)', display: 'inline-flex' }}><RdIcon name="star" size={14} /></span>
          <span className="r-caps" style={{ color: 'var(--rd-ink-soft)', letterSpacing: '0.22em', fontSize: 11.5 }}>{p.caps}</span>
        </div>
      )}
      <PSTitle title={p.title} />

      {ratingCount > 0 && (
        <button type="button" onClick={() => psScrollTo('reviews')} className="shop-rating">
          <Ch1Stars size={16} />
          <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 15, color: 'var(--rd-ink)' }}>{p.rating ? String(p.rating).replace('.', lang === 'de' ? ',' : '.') + '/5' : '4,8/5'}</span>
          <span style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{ui.rating_count(ratingCount)}</span>
        </button>
      )}

      {lede && <p className="r-serif" style={{ fontSize: 17, color: 'var(--rd-ink-soft)', marginTop: 18, lineHeight: 1.6, textWrap: 'pretty' }}>{lede}{p.story_body && (<> <button type="button" onClick={() => psScrollTo('story')} style={{ display: 'inline', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--f-sans)', fontWeight: 700, fontSize: 15, color: 'var(--rd-terra)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{ui.readmore}</button></>)}</p>}

      {p.emotion && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 22, padding: '11px 18px 11px 15px', borderRadius: 99, background: 'color-mix(in srgb, var(--rd-terra) 9%, transparent)', border: '1px solid color-mix(in srgb, var(--rd-terra) 28%, transparent)' }}>
          <span style={{ color: 'var(--rd-terra)', display: 'inline-flex', flex: 'none' }}><RdIcon name="heart" size={18} /></span>
          <span style={{ fontFamily: 'var(--f-sans)', fontSize: 15, color: 'var(--rd-ink)' }}><strong style={{ fontWeight: 800 }}>{ui.emotion_k}:</strong> {p.emotion}</span>
        </div>
      )}

      {p.meta_rows && p.meta_rows.length > 0 && (
        <div className="shop-meta">
          {p.meta_rows.map((m, i) => (
            <div key={i} className="shop-meta-row">
              <span className="shop-meta-ico"><RdIcon name={m.icon} size={18} /></span>
              <span>{m.t}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 26 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span className="r-display" style={{ fontSize: 40, color: 'var(--rd-ink)' }}>{p.priceFormatted}</span>
          <span className="r-it" style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>{ui.price_note}</span>
        </div>
        {typeof GpsrPriceNote === 'function' && <GpsrPriceNote lang={lang} />}
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {p.personalization_label && (
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--f-sans)', fontSize: 13.5, color: 'var(--rd-ink-soft)' }}>
            <span>{p.personalization_label} <em style={{ color: 'var(--rd-ink-mute)' }}>{ui.name_hint}</em></span>
            <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder={ui.name_ph} maxLength={24}
              style={{ height: 46, border: '1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent)', borderRadius: 12, padding: '0 14px', fontSize: 16, fontFamily: 'var(--f-serif)', color: 'var(--rd-ink)', background: '#fffdf6', outline: 'none' }} />
          </label>
        )}
        {soldOut ? (
          <span className="rbtn rbtn-ghost rbtn-xl" style={{ cursor: 'default', justifyContent: 'center' }}>{ui.sold_out}</span>
        ) : !inCart ? (
          <button className="rbtn rbtn-primary rbtn-xl shop-cta" onClick={() => onAdd(childName)}>{ui.add} · {p.priceFormatted} <RdIcon name="arrow" size={17} /></button>
        ) : (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span className="rbtn rbtn-ghost rbtn-xl" style={{ cursor: 'default', color: 'var(--rd-moss)', borderColor: 'color-mix(in srgb, var(--rd-moss) 50%, transparent)', flex: '1 1 auto', justifyContent: 'center' }}><RdIcon name="check" size={17} /> {ui.added}</span>
            <button className="rbtn rbtn-primary rbtn-xl" style={{ flex: '1 1 auto', justifyContent: 'center' }} onClick={() => rdCheckout()}>{ui.checkout} <RdIcon name="arrow" size={17} /></button>
          </div>
        )}
        {p.scarcity && <div className="shop-scarcity"><span className="shop-dot" aria-hidden="true"></span>{p.scarcity}</div>}
      </div>

      <div className="shop-reassure">
        {(x.badges || []).slice(0, 3).map((r, i) => (
          <div key={i} className="shop-reassure-item"><span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name={r.icon} size={17} /></span>{r.t}</div>
        ))}
      </div>

      {p.gift_note && (
        <div className="shop-gift">
          <span style={{ color: 'var(--rd-gold)', display: 'inline-flex', flex: 'none' }}><RdIcon name="gift" size={18} /></span>
          <span className="r-it" style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', lineHeight: 1.45 }}>{p.gift_note}</span>
        </div>
      )}

      {typeof Ch1Included === 'function' && <Ch1Included x={x} />}

      <div className="shop-pay">
        {(x.badges_pay || []).map((pay, i) => <span key={i}>{pay}</span>)}
      </div>
      {p.guarantee && (
        <p style={{ marginTop: 12, fontSize: 13.5, color: 'var(--rd-ink-mute)', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <span style={{ color: 'var(--rd-moss)', display: 'inline-flex' }}><RdIcon name="heart" size={15} /></span>{p.guarantee}
        </p>
      )}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────
function PSShopHero({ p, ui, x, lang, intensity, inCart, onAdd }) {
  return (
    <section className="rh" data-screen-label="Produkt" style={{ overflow: 'hidden', background: 'radial-gradient(ellipse 55% 45% at 92% 6%, color-mix(in srgb, var(--rd-gold-soft) 22%, transparent) 0%, transparent 62%), radial-gradient(ellipse 45% 40% at 2% 92%, color-mix(in srgb, var(--rd-sage) 26%, transparent) 0%, transparent 58%), var(--rd-paper)' }}>
      <RdLeaves intensity={intensity} />
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="shop-hero-grid">
          <PSGallery images={p.images} />
          <PSBuyBox p={p} ui={ui} x={x} lang={lang} inCart={inCart} onAdd={onAdd} />
        </div>
      </div>
    </section>
  );
}

// ─── STICKY BUY BAR ──────────────────────────────────────────
function PSSticky({ p, ui, inCart, onAdd }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 560;
      const closeEl = document.getElementById('shop-close');
      const nearEnd = closeEl && closeEl.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`shop-sticky ${show ? 'on' : ''}`} aria-hidden={!show}>
      <div className="rwrap shop-sticky-row">
        <div className="shop-sticky-info">
          <img src={(p.images[0] || {}).src} alt="" className="shop-sticky-thumb" />
          <div>
            <div className="shop-sticky-name">{p.title}</div>
            <div className="shop-sticky-price"><span>{p.priceFormatted}</span><span className="shop-sticky-note">{ui.price_note}</span></div>
          </div>
        </div>
        {!inCart
          ? <button className="rbtn rbtn-primary shop-sticky-btn" onClick={() => onAdd('')}>{ui.add} <RdIcon name="arrow" size={16} /></button>
          : <button className="rbtn rbtn-primary shop-sticky-btn" onClick={() => rdCheckout()}>{ui.checkout} <RdIcon name="arrow" size={16} /></button>}
      </div>
    </div>
  );
}

// ─── REVIEWS ─────────────────────────────────────────────────
// ─── REVIEWS ────────────────────────────────────────
// Quotes come from Judge.me via /api/reviews; the manual `custom.reviews`
// metafield is the fallback for a store without the app. Stars + count come
// from the synced `reviews.*` metafields. Design is unchanged either way.
function usePSReviews(p) {
  const [live, setLive] = useState(null);
  const id = p && p.id;
  useEffect(() => {
    if (!id || !(window.PFShop && PFShop.getReviews)) return;
    let alive = true;
    PFShop.getReviews(p).then((list) => { if (alive) setLive(list || []); }).catch(() => {});
    return () => { alive = false; };
  }, [id]);
  if (live && live.length) return live;
  return (p && p.reviews) || [];
}

function PSReviews({ p, ui, lang }) {
  const reviews = usePSReviews(p);
  if (!reviews.length) return null;
  const score = p.rating ? String(p.rating).replace('.', lang === 'de' ? ',' : '.') + '/5' : null;
  return (
    <section id="reviews" data-rd data-screen-label="Bewertungen" style={{ padding: '118px 0 118px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 8%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={ui.reviews_eyebrow} title={ui.reviews_title} max={760} />
        {score && (
          <div className="r-rev" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <Ch1Stars size={17} />
            <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 16, color: 'var(--rd-ink)' }}>{score}</span>
            {p.rating_count ? <span style={{ fontSize: 14.5, color: 'var(--rd-ink-mute)' }}>· {ui.rating_count(p.rating_count)}</span> : null}
          </div>
        )}
        <div className="r-rev" style={{ marginTop: 40 }}>
          <RdPeekCarousel ariaLabel={ui.reviews_eyebrow}>
            {reviews.map((r, i) => (
              <div key={i} className="shop-review">
                <Ch1Stars size={13} />
                <p className="r-serif" style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--rd-ink)', marginTop: 14, textWrap: 'pretty', flex: '1 1 auto' }}>&ldquo;{r.q}&rdquo;</p>
                <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--f-sans)', fontWeight: 800, fontSize: 13.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--rd-walnut)' }}>{r.n}</span>
                  <span style={{ fontSize: 13.5, color: 'var(--rd-ink-mute)' }}>{r.m}</span>
                </div>
                {r.verified !== false && <div className="shop-verified"><RdIcon name="check" size={12} /> {ui.verified}</div>}
              </div>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
    </section>
  );
}

// ─── A LOOK INSIDE THE CHAPTER ────────────────────────
// Sample pages of THIS chapter, uploaded per product as a file-list metafield
// (custom.page_previews). Empty → the section hides itself.
function PSPages({ p, ui }) {
  const pages = p.pagePreviews || [];
  if (!pages.length) return null;
  return (
    <section id="pages" data-rd data-screen-label="Blick ins Buch" style={{ padding: '124px 0 128px', background: 'var(--rd-paper)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={ui.pages_eyebrow} title={ui.pages_title} max={760} />
        <p className="r-it r-rev" style={{ textAlign: 'center', fontSize: 16.5, color: 'var(--rd-ink-soft)', marginTop: 14 }}>{ui.pages_note}</p>
        <div className="r-rev" style={{ marginTop: 46 }}>
          <RdPeekCarousel ariaLabel={ui.pages_eyebrow}>
            {pages.map((g, i) => (
              <figure key={g.src + i} className="shop-page">
                <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </RdPeekCarousel>
        </div>
      </div>
    </section>
  );
}

// ─── INSIDE THE BOX ──────────────────────────────────────────
function PSInside({ p, ui }) {
  if (!p.inside_items || !p.inside_items.length) return null;
  return (
    <section id="inside" data-rd data-screen-label="In der Box" style={{ padding: '124px 0 128px', background: 'var(--rd-cream)', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 10%, transparent)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={ui.inside_eyebrow} title={ui.inside_title} max={760} />
        <div className="rd-info-grid-3" style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {p.inside_items.map((it, i) => (
            <div key={i} className={`r-rev r-rev-${(i % 3) + 1}`} style={{ background: 'var(--rd-paper)', border: '1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent)', borderRadius: 14, padding: '30px 28px', boxShadow: '0 26px 55px -40px color-mix(in srgb, var(--rd-ink) 45%, transparent)' }}>
              <span style={{ display: 'inline-grid', placeItems: 'center', width: 48, height: 48, borderRadius: '50%', border: '1px solid color-mix(in srgb, var(--rd-gold) 55%, transparent)', color: 'var(--rd-gold)', background: 'color-mix(in srgb, var(--rd-gold-soft) 12%, transparent)', marginBottom: 18 }}><RdIcon name={it.icon || 'star'} size={21} /></span>
              <h3 className="r-serif" style={{ fontWeight: 600, fontSize: 19.5, color: 'var(--rd-ink)', lineHeight: 1.3 }}>{it.t}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--rd-ink-soft)', marginTop: 10, lineHeight: 1.65, textWrap: 'pretty' }}>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 980px) { #inside .rd-info-grid-3 { grid-template-columns: minmax(0, 1fr) !important; max-width: 480px; margin-inline: auto; } }`}</style>
    </section>
  );
}

// ─── STORY ───────────────────────────────────────────────────
function PSStory({ p, ui }) {
  if (!p.story_title && !p.story_body) return null;
  const img = (p.images && p.images[0] && p.images[0].src) || 'assets/book-1-forest.webp';
  return (
    <section id="story" data-rd data-screen-label="Worum es geht" style={{ padding: '124px 0 124px', background: 'var(--rd-paper)' }}>
      <div className="rwrap" style={{ position: 'relative', zIndex: 2 }}>
        <div className="ps-story-grid">
          <div className="r-rev" style={{ position: 'relative' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 40px 80px -36px color-mix(in srgb, var(--rd-ink) 55%, transparent)', transform: 'rotate(-1.2deg)' }}>
              <img src={img} alt="" style={{ width: '100%', aspectRatio: '4 / 3.4', objectFit: 'cover' }} />
            </div>
            {p.story_hand && <p className="r-hand" style={{ position: 'absolute', bottom: -26, right: 6, fontSize: 21, color: 'var(--rd-terra)', transform: 'rotate(-2deg)' }}>{p.story_hand}</p>}
          </div>
          <div className="r-rev r-rev-1" style={{ alignSelf: 'center' }}>
            <span className="r-caps r-caps-rule">{ui.story_eyebrow}</span>
            <h2 className="r-display" style={{ fontSize: 'clamp(32px, 3.8vw, 52px)', marginTop: 22, color: 'var(--rd-ink)', textWrap: 'balance' }}>{p.story_title}</h2>
            <p style={{ fontSize: 'clamp(16.5px, 1.35vw, 19px)', color: 'var(--rd-ink-soft)', marginTop: 20, lineHeight: 1.72, textWrap: 'pretty' }}>{p.story_body}</p>
          </div>
        </div>
      </div>
      <style>{`.ps-story-grid { display: grid; grid-template-columns: 0.94fr 1.06fr; gap: 80px; align-items: center; } @media (max-width: 980px) { .ps-story-grid { grid-template-columns: minmax(0, 1fr); gap: 60px; } }`}</style>
    </section>
  );
}

// ─── DETAILS TABLE ───────────────────────────────────────────
function PSDetails({ p, ui }) {
  if (!p.details || !p.details.length) return null;
  return (
    <section data-rd data-screen-label="Auf einen Blick" style={{ padding: '116px 0 120px', background: 'var(--rd-paper)' }}>
      <div className="rwrap-tight" style={{ position: 'relative', zIndex: 2 }}>
        <RdHeading eyebrow={ui.details_eyebrow} title={ui.details_title} max={680} />
        <div className="r-rev" style={{ marginTop: 52 }}>
          {p.details.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 0.85fr) 1.15fr', gap: 20, padding: '18px 4px', borderTop: '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)', borderBottom: i === p.details.length - 1 ? '1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent)' : 'none' }} className="ps-detail-row">
              <span className="r-caps" style={{ letterSpacing: '0.18em', color: 'var(--rd-ink-mute)', alignSelf: 'center' }}>{d.k}</span>
              <span className="r-serif" style={{ fontSize: 17.5, color: 'var(--rd-ink)', fontWeight: 500 }}>{d.v}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 560px) { .ps-detail-row { grid-template-columns: minmax(0, 1fr) !important; gap: 4px !important; } }`}</style>
    </section>
  );
}

// ─── CLOSE ───────────────────────────────────────────────────
function PSClose({ p, ui, lang, intensity, inCart, onAdd }) {
  return (
    <section id="shop-close" data-rd data-screen-label="Abschluss" style={{ padding: '160px 0 200px', color: 'var(--rd-cream)', background: 'radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--rd-gold) 24%, transparent) 0%, transparent 60%), linear-gradient(180deg, var(--rd-paper) 0%, var(--rd-forest-deep) 16%, var(--rd-night) 70%)' }}>
      <RdFireflies intensity={intensity} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '44%' }}><RdPines color="#10150C" seed={2} /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%', opacity: 0.6 }}><RdPines color="#1B2415" seed={5} /></div>
      <div className="rwrap-tight r-rev" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <span className="r-caps r-caps-rule" style={{ color: 'var(--rd-gold-soft)' }}>{ui.close_caps}</span>
        <h2 className="r-display" style={{ fontSize: 'clamp(40px, 5.4vw, 76px)', color: 'var(--rd-cream)', marginTop: 26, textWrap: 'balance' }}>{ui.close_title}</h2>
        <p className="r-serif" style={{ fontSize: 'clamp(17px, 1.4vw, 20.5px)', color: 'rgba(242,236,217,0.82)', marginTop: 24, lineHeight: 1.65, maxWidth: 560, margin: '24px auto 0', textWrap: 'pretty' }}>{ui.close_body}</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          {!inCart
            ? <button className="rbtn rbtn-primary rbtn-xl" onClick={() => onAdd('')}>{ui.add} · {p.priceFormatted}</button>
            : <button className="rbtn rbtn-primary rbtn-xl" onClick={() => rdCheckout()}>{ui.checkout} <RdIcon name="arrow" size={17} /></button>}
          <a href={wP('Alle Kapitel.html')} className="rbtn rbtn-ghost-light rbtn-xl">{ui.back_link}</a>
        </div>
        <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
          <RdCraftNote lang={lang} k="count" center dark size={15} />
        </div>
      </div>
    </section>
  );
}

// ─── BODY ────────────────────────────────────────────────────
function PSBody({ p, lang }) {
  const ui = PF_UI[lang] || PF_UI.de;
  const x = (window.CH1_TRUST && (CH1_TRUST[lang] || CH1_TRUST.de)) || { badges: [], badges_pay: [] };
  const intensity = 5;
  const [inCart, setInCart] = useState(() => rdCartLoad().some((it) => it.n === p.handle));

  useEffect(() => {
    const sync = () => setInCart(rdCartLoad().some((it) => it.n === p.handle));
    window.addEventListener('rd-cart-changed', sync);
    window.addEventListener('pf-shop-cart-changed', sync);
    return () => { window.removeEventListener('rd-cart-changed', sync); window.removeEventListener('pf-shop-cart-changed', sync); };
  }, [p.handle]);

  const onAdd = (childName) => {
    const attrs = {};
    if (childName && childName.trim()) attrs[p.personalization_label || 'Name'] = childName.trim();
    // Local mirror drives the existing cart flyout design (and preview).
    const cart = rdCartLoad();
    const i = cart.findIndex((it) => it.n === p.handle);
    if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1 };
    else cart.push({ n: p.handle, handle: p.handle, variantId: p.variantId, qty: 1, ...(p.quantityAvailable != null ? { max: p.quantityAvailable } : {}), attrs: attrs });
    rdCartSave(cart);
    window.dispatchEvent(new Event('rd-cart-changed'));
    setInCart(true);
    // Real Shopify line (when the store is connected).
    if (window.PFShop && PFShop.enabled && p.variantId) {
      PFShop.addLine(p.variantId, 1, attrs).catch(function (e) { console.warn('[Shop] add failed', e); });
    }
  };

  // Add ANOTHER chapter. The cards in the "other chapters" carousel call their
  // handler with { handle, variantId, max } — a product, not a child name — so
  // they cannot reuse onAdd above. Same cart shape, no personalisation: that
  // name is collected on that chapter's own page.
  const addChapter = (item) => {
    if (!item || !item.handle) return;
    const cart = rdCartLoad();
    const i = cart.findIndex((it) => it.n === item.handle);
    if (i >= 0) cart[i] = { ...cart[i], qty: (cart[i].qty || 1) + 1 };
    else cart.push({ n: item.handle, handle: item.handle, variantId: item.variantId, qty: 1, ...(item.max != null ? { max: item.max } : {}), attrs: {} });
    rdCartSave(cart);
    window.dispatchEvent(new Event('rd-cart-changed'));
    if (window.PFShop && PFShop.enabled && item.variantId) {
      PFShop.addLine(item.variantId, 1, {}).catch(function (e) { console.warn('[Shop] add failed', e); });
    }
  };

  return (
    <React.Fragment>
      <PSShopHero p={p} ui={ui} x={x} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
      {typeof Ch1TrustBadges === 'function' && <Ch1TrustBadges x={x} />}
      <PSReviews p={p} ui={ui} lang={lang} />
      <PSInside p={p} ui={ui} />
      <PSPages p={p} ui={ui} />
      {typeof Ch1Benefits === 'function' && <Ch1Benefits x={x} />}
      <PSStory p={p} ui={ui} />
      {/* Shared with the home page — the same steps for every chapter. */}
      {typeof RdHow === 'function' && t.how && <RdHow t={t} />}
      <PSDetails p={p} ui={ui} />
      {typeof GpsrCompliance === 'function' && <GpsrCompliance lang={lang} />}
      {typeof Ch1Faq === 'function' && <Ch1Faq x={x} />}
      {/* The other chapters, straight from the Shopify collection. Its cards
          call onAdd with a product object, not a child name — so they get
          their own handler rather than the buy box's. */}
      {typeof RdChapters === 'function' && t.chapters && (
        <RdChapters t={t} lang={lang} exclude={p.handle} onAdd={addChapter}
          heading={{ eyebrow: ui.others_eyebrow, title: ui.others_title, sub: t.chapters.sub }} />
      )}
      <PSClose p={p} ui={ui} lang={lang} intensity={intensity} inCart={inCart} onAdd={onAdd} />
      <PSSticky p={p} ui={ui} inCart={inCart} onAdd={onAdd} />
    </React.Fragment>
  );
}

// ─── LOADING / NOT FOUND ─────────────────────────────────────
function PSSkeleton() {
  return (
    <section data-rd style={{ padding: '120px 0 140px' }}>
      <div className="rwrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 60 }}>
        <div className="rd-skel" style={{ width: '100%', aspectRatio: '4/5', borderRadius: 12 }} />
        <div style={{ display: 'grid', gap: 18, alignContent: 'start', paddingTop: 20 }}>
          <div className="rd-skel" style={{ width: '38%', height: 12, borderRadius: 4 }} />
          <div className="rd-skel" style={{ width: '85%', height: 52, borderRadius: 8 }} />
          <div className="rd-skel" style={{ width: '100%', height: 74, borderRadius: 8 }} />
          <div className="rd-skel" style={{ width: '32%', height: 40, borderRadius: 8 }} />
          <div className="rd-skel" style={{ width: '100%', height: 56, borderRadius: 10 }} />
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .rwrap { grid-template-columns: minmax(0,1fr) !important } }`}</style>
    </section>
  );
}
function PSNotFound({ lang }) {
  const ui = PF_UI[lang] || PF_UI.de;
  return (
    <section data-rd style={{ padding: '160px 0 180px', textAlign: 'center' }}>
      <div className="rwrap-tight">
        <h1 className="r-display" style={{ fontSize: 'clamp(30px, 4vw, 46px)', color: 'var(--rd-ink)' }}>{ui.unavailable}</h1>
        <div style={{ marginTop: 28 }}><a href={wP('Alle Kapitel.html')} className="rbtn rbtn-primary rbtn-xl">{ui.back_link}</a></div>
      </div>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────
function ProductApp() {
  const [tw, setTw] = useTweaks({ palette: 'wald', anim: 5, lang: 'de' });
  const [lang, setLang] = useState(() => rdLangLoad(tw.lang || 'de'));
  const intensity = typeof tw.anim === 'number' ? tw.anim : 5;
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const handle = React.useMemo(() => pfProductHandle(), []);

  useEffect(() => { setTw('lang', lang); rdLangSave(lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.palette = tw.palette || 'wald';
    document.documentElement.dataset.anim = intensity > 0 ? 'on' : 'off';
    document.documentElement.style.setProperty('--anim-f', String(Math.max(intensity, 1) / 5));
  }, [tw.palette, intensity]);

  // Shopify is the only source. No handle in the URL → the first chapter of
  // the collection, so /produkt opens something real without hardcoding one.
  useEffect(() => {
    let alive = true;
    const done = (p) => {
      if (!alive) return;
      setProduct(p || null); setLoaded(true);
      // SEO comes from Shopify's own SEO fields per product, with title /
      // description as the fallback — never one static title for every chapter.
      if (p) {
        document.title = p.seoTitle || (p.title + ' — Popcorn & Freddy');
        const desc = p.seoDescription || pfStripTags(p.descriptionHtml).slice(0, 300);
        const tag = (kind, key, val) => {
          if (!val) return;
          var sel = 'meta[' + kind + '="' + key + '"]';
          var el = document.head.querySelector(sel);
          if (!el) { el = document.createElement('meta'); el.setAttribute(kind, key); document.head.appendChild(el); }
          el.setAttribute('content', val);
        };
        tag('name', 'description', desc);
        tag('property', 'og:title', p.seoTitle || p.title);
        tag('property', 'og:description', desc);
        tag('property', 'og:type', 'product');
        tag('property', 'og:url', location.href);
        if (p.images && p.images[0]) tag('property', 'og:image', p.images[0].src);
        var link = document.head.querySelector('link[rel="canonical"]');
        if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
        link.href = location.origin + location.pathname;
      }
    };
    if (!window.PFShop) { done(null); return; }
    const req = handle
      ? PFShop.getProduct(handle, lang)
      : PFShop.getChapters(lang).then((l) => (l && l[0]) || null);
    req.then(done).catch(function (e) { console.warn('[Shop] product load failed:', e && e.message); done(null); });
    return () => { alive = false; };
  }, [handle, lang]);

  const t = (window.COPY && (window.COPY[lang] || window.COPY.de)) || {};

  useEffect(() => {
    if (!loaded) return;
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
  }, [lang, loaded]);

  return (
    <React.Fragment>
      <style>{RD_PAGE_CSS}{PS_SHOP_CSS}</style>
      <RdPageTopBar t={t} lang={lang} />
      {typeof RdCountrySuggest === 'function' && <RdCountrySuggest lang={lang} />}
      <main data-screen-label="Produkt">
        {product ? <PSBody key={lang + ':' + product.handle} p={product} lang={lang} />
          : loaded ? <PSNotFound lang={lang} />
          : <PSSkeleton />}
      </main>
      <RdPageFooter t={t} lang={lang} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio label="Stimmung" value={tw.palette} options={[{ value: 'wald', label: 'Wald' }, { value: 'birke', label: 'Birke' }, { value: 'abend', label: 'Abend' }]} onChange={(v) => setTw('palette', v)} />
        <TweakSection label="Bewegung" />
        <TweakSlider label="Animations-Intensität" value={intensity} min={0} max={10} step={1} onChange={(v) => setTw('anim', v)} />
        <TweakSection label="Sprache · Language" />
        <TweakRadio label="Language" value={lang} options={[{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }]} onChange={setLang} />
      </TweaksPanel>
    </React.Fragment>
  );
}

const PS_SHOP_CSS = `
  .shop-page { margin: 0; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-radius: 14px; padding: 12px; box-shadow: 0 30px 70px -50px color-mix(in srgb, var(--rd-ink) 55%, transparent); }
  .shop-page img { display: block; width: 100%; aspect-ratio: 1 / 1.414; object-fit: cover; border-radius: 8px; }
  .shop-hero-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 60px; align-items: start; padding-top: 132px; padding-bottom: 96px; }
  .shop-gal { position: sticky; top: 108px; }
  .shop-gal-main { border-radius: 16px; overflow: hidden; background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); box-shadow: 0 40px 90px -50px color-mix(in srgb, var(--rd-ink) 55%, transparent); aspect-ratio: 4 / 4.3; }
  .shop-gal-main img { width: 100%; height: 100%; display: block; animation: shop-fade 0.4s var(--ease); }
  @keyframes shop-fade { from { opacity: 0; } to { opacity: 1; } }
  html[data-anim="off"] .shop-gal-main img { animation: none; }
  .shop-gal-thumbs { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-top: 14px; }
  .shop-gal-thumb { aspect-ratio: 1; border-radius: 10px; overflow: hidden; border: 1.5px solid color-mix(in srgb, var(--rd-ink) 14%, transparent); background: var(--rd-cream); cursor: pointer; padding: 0; transition: border-color 0.25s, transform 0.25s; }
  .shop-gal-thumb img { width: 100%; height: 100%; }
  .shop-gal-thumb:hover { transform: translateY(-2px); }
  .shop-gal-thumb.on { border-color: var(--rd-gold); box-shadow: 0 0 0 3px color-mix(in srgb, var(--rd-gold) 22%, transparent); }
  .shop-buy { max-width: 540px; }
  .shop-rating { display: inline-flex; align-items: center; gap: 10px; margin-top: 18px; background: none; border: none; padding: 4px 0; cursor: pointer; }
  .shop-meta { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
  .shop-meta-row { display: flex; align-items: center; gap: 11px; font-family: var(--f-sans); font-weight: 500; font-size: 14.5px; color: var(--rd-ink-soft); }
  .shop-meta-ico { flex: none; display: inline-grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--rd-gold) 45%, transparent); color: var(--rd-gold); background: color-mix(in srgb, var(--rd-gold-soft) 10%, transparent); }
  .shop-cta { width: 100%; justify-content: center; font-size: 16.5px; }
  .shop-scarcity { display: flex; align-items: center; gap: 9px; font-family: var(--f-sans); font-weight: 600; font-size: 13.5px; color: var(--rd-terra); }
  .shop-dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: var(--rd-terra); box-shadow: 0 0 0 0 color-mix(in srgb, var(--rd-terra) 60%, transparent); animation: shop-pulse 2s infinite; }
  @keyframes shop-pulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--rd-terra) 55%, transparent); } 70% { box-shadow: 0 0 0 7px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
  .shop-reassure { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 22px; padding: 16px 0; border-top: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .shop-reassure-item { display: flex; align-items: center; gap: 8px; font-family: var(--f-sans); font-weight: 600; font-size: 13.5px; color: var(--rd-ink-soft); }
  .shop-gift { display: flex; align-items: center; gap: 12px; margin-top: 20px; background: color-mix(in srgb, var(--rd-gold-soft) 14%, transparent); border: 1px solid color-mix(in srgb, var(--rd-gold) 34%, transparent); border-radius: 12px; padding: 14px 16px; }
  .shop-pay { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; margin-top: 26px; font-family: var(--f-sans); font-weight: 700; font-size: 12px; letter-spacing: 0.07em; color: var(--rd-ink-mute); }
  .shop-review { height: 100%; display: flex; flex-direction: column; background: var(--rd-paper); border: 1px solid color-mix(in srgb, var(--rd-ink) 11%, transparent); border-radius: 14px; padding: 26px 26px 24px; box-shadow: 0 1px 3px color-mix(in srgb, var(--rd-ink) 6%, transparent), 0 22px 44px -34px color-mix(in srgb, var(--rd-ink) 30%, transparent); }
  .shop-verified { display: inline-flex; align-items: center; gap: 6px; margin-top: 12px; font-family: var(--f-sans); font-weight: 700; font-size: 11.5px; letter-spacing: 0.04em; color: var(--rd-moss); }
  .shop-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; background: color-mix(in srgb, var(--rd-paper) 94%, transparent); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-top: 1px solid color-mix(in srgb, var(--rd-ink) 14%, transparent); box-shadow: 0 -14px 40px -24px color-mix(in srgb, var(--rd-ink) 45%, transparent); transform: translateY(110%); transition: transform 0.4s var(--ease); }
  .shop-sticky.on { transform: translateY(0); }
  .shop-sticky-row { display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 12px 0; }
  .shop-sticky-info { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .shop-sticky-thumb { width: 46px; height: 46px; border-radius: 8px; object-fit: cover; flex: none; border: 1px solid color-mix(in srgb, var(--rd-ink) 12%, transparent); }
  .shop-sticky-name { font-family: var(--f-serif); font-weight: 600; font-size: 16px; color: var(--rd-ink); line-height: 1.15; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .shop-sticky-price { display: flex; align-items: baseline; gap: 8px; }
  .shop-sticky-price > span:first-child { font-family: var(--f-sans); font-weight: 800; font-size: 15px; color: var(--rd-ink); }
  .shop-sticky-note { font-size: 12.5px; color: var(--rd-ink-mute); }
  .shop-sticky-btn { flex: none; padding: 12px 22px; font-size: 14.5px; }
  @media (max-width: 900px) {
    .shop-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 34px; padding-top: 116px; padding-bottom: 64px; }
    .shop-gal { position: static; top: auto; }
    .shop-gal-main { aspect-ratio: 4 / 3.7; }
    .shop-buy { max-width: 100%; }
  }
  @media (max-width: 560px) {
    .shop-meta { grid-template-columns: 1fr; }
    .shop-sticky-note { display: none; }
    .shop-sticky-name { font-size: 14.5px; }
    .shop-sticky-btn { padding: 11px 16px; }
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(<ProductApp />);

Object.assign(window, { pfProductHandle, PSBody, ProductApp });
