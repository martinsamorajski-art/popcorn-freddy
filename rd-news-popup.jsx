/* ────────────────────────────────────────────────────────────────
   Home-page newsletter invitation (timed)
   ────────────────────────────────────────────────────────────────
   Appears once — after a quiet delay or half a page of scrolling,
   whichever comes first. Never for someone who already subscribed,
   never on top of the country/language nudge, and a dismissal is
   remembered for 30 days. Legal text is the SAME copy as the footer
   form (window.COPY), so consent wording can never drift apart.

   TWO PRESENTATIONS, one set of logic:
     • mobile (≤ 600px) — the illustrated Popcorn & Freddy card. The
       artwork is one image with empty zones; every text sits in an
       absolutely-positioned box measured against that image, so the
       composition holds at any size. Type is sized in `cqw` (a share
       of the card's own width), which is what keeps the layout intact
       when the card scales down to fit a short screen.
     • desktop — the original compact dialog (a 700px-tall picture
       would swamp a desktop viewport).
   ──────────────────────────────────────────────────────────────── */

const RD_NEWSPOP_KEY = 'pf-news-popup-v1';       // { at: <ms> } last dismissal
const RD_NEWSPOP_DELAY = 14000;                  // ms before it may appear
const RD_NEWSPOP_SCROLL = 0.5;                   // or half the page, whichever first
const RD_NEWSPOP_SNOOZE = 30 * 24 * 60 * 60 * 1000;
const RD_NEWSPOP_ART = 'assets/newsletter-popup-art.jpg';
const RD_NEWSPOP_ART_W = 936;                    // intrinsic size of the artwork —
const RD_NEWSPOP_ART_H = 1681;                   // every % below is measured against it

const RD_NEWSPOP_T = {
  de: {
    caps: 'Kommt mit auf Reise',
    title: 'Das Abenteuer kommt zu euch!',
    body: 'Trag dich in die Reisepost ein und wir schicken dir deinen persönlichen Rabattcode — dazu neue Kapitel und kleine Bastel-Ideen.',
    // illustrated card
    art_consent: 'Ja, ich möchte die Reisepost erhalten — Abmeldung jederzeit möglich.',
    off: 'Rabatt',
    off_sub: 'auf die erste Box',
    strip: 'Mit Sorgfalt gefertigt · Versand in 3–5 Werktagen',
    no: 'Nein danke',
    close: 'Schließen',
  },
  en: {
    caps: 'Join our adventure',
    title: 'Let the adventure come to you!',
    body: 'Join the travel post and we’ll send you your personal discount code — plus new chapters and little crafting ideas.',
    art_consent: 'Yes, send me the travel post — unsubscribe any time.',
    off: 'off',
    off_sub: 'your first box',
    strip: 'Made with care · shipped in 3–5 business days',
    no: 'No thanks',
    close: 'Dismiss',
  },
};

function rdNewsPopSnoozed() {
  try {
    const raw = localStorage.getItem(RD_NEWSPOP_KEY);
    if (!raw) return false;
    const at = Number(JSON.parse(raw).at || 0);
    return at > 0 && Date.now() - at < RD_NEWSPOP_SNOOZE;
  } catch (e) { return false; }
}
function rdNewsPopSnooze() {
  try { localStorage.setItem(RD_NEWSPOP_KEY, JSON.stringify({ at: Date.now() })); } catch (e) {}
}

function RdNewsPopup({ lang = 'de' }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  // The illustrated card is a mobile-only treatment.
  const [art, setArt] = useState(() => {
    try { return window.matchMedia('(max-width: 600px)').matches; } catch (e) { return false; }
  });
  const trap = React.useRef(null);

  useEffect(() => {
    let mq;
    try { mq = window.matchMedia('(max-width: 600px)'); } catch (e) { return; }
    const onChange = (e) => setArt(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    // Preview switch: ?newspopup=1 opens it at once, ignoring snooze/delay.
    // Handy for checking the design without waiting or clearing storage.
    try {
      if (window.__PF_NEWSPOP_FORCE) { setOpen(true); return; }
      if (/[?&]newspopup=1/.test(location.search)) { setOpen(true); return; }
    } catch (e) {}
    if (rdNewsPopSnoozed()) return;
    if (window.PFNews && PFNews.signedUp()) return;
    let done = false;
    const fire = () => {
      if (done) return;
      // One nudge at a time: the locale/language banner gets priority.
      if (document.querySelector('.rd-suggest')) return;
      done = true; cleanup(); setOpen(true);
    };
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= RD_NEWSPOP_SCROLL) fire();
    };
    const timer = setTimeout(fire, RD_NEWSPOP_DELAY);
    // Retry a few seconds later if a nudge was in the way the first time.
    const retry = setInterval(() => { if (!done) fire(); }, 6000);
    window.addEventListener('scroll', onScroll, { passive: true });
    function cleanup() { clearTimeout(timer); clearInterval(retry); window.removeEventListener('scroll', onScroll); }
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => { rdNewsPopSnooze(); setOpen(false); };
  if (!open) return null;

  const T = RD_NEWSPOP_T[lang] || RD_NEWSPOP_T.de;
  const C = ((window.COPY && (COPY[lang] || COPY.de)) || {}).news || {};
  const privacyHref = window.PFLocale ? PFLocale.withLocale('Datenschutz.html') : 'Datenschutz.html';
  const submit = (e) => {
    e.preventDefault();
    if (!agree) { setErr(true); return; }
    if (!window.PFNews || !PFNews.valid(email)) return;
    setBusy(true); setFailed(false);
    PFNews.subscribe(email, 'popup', trap.current ? trap.current.value : '').then((r) => {
      setBusy(false);
      if (r && r.ok) { setSent(true); rdNewsPopSnooze(); setTimeout(() => setOpen(false), 4200); }
      else setFailed(true);
    });
  };

  const honeypot = (
    <input ref={trap} type="text" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
  );

  return (
    <div className="rd-np-scrim" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      {art ? (
        /* ── illustrated mobile card ────────────────────────────── */
        <div className="rd-npa" role="dialog" aria-modal="true" aria-label={T.title}>
          <button type="button" className="rd-npa-x" aria-label={T.close} onClick={close}>
            <RdIcon name="close" size={16} />
          </button>

          {/* headline — the empty paper above the characters */}
          <div className="rd-npa-head">
            <span className="rd-npa-caps">{T.caps}</span>
            <h3 className="rd-npa-title">{T.title}</h3>
          </div>

          {/* the gold ticket the pair is holding */}
          <div className="rd-npa-ticket" aria-hidden="true">
            <span className="rd-npa-pct">10%</span>
            <span className="rd-npa-off">
              <span className="rd-npa-off-1">{T.off}</span>
              <span className="rd-npa-off-2">{T.off_sub}</span>
            </span>
          </div>

          {/* the torn note — form lives here */}
          {!sent ? (
            <form className="rd-npa-card" onSubmit={submit} noValidate>
              <div className="rd-npa-row">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
                  placeholder={C.placeholder || 'you@email.com'} aria-label={C.placeholder || 'Email'} />
                <button type="submit" disabled={busy}>{busy ? (C.sending || C.cta) : (C.cta || 'Go')}</button>
              </div>
              {honeypot}
              <label className="rd-npa-consent">
                <input type="checkbox" checked={agree}
                  onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErr(false); }} />
                <span>{T.art_consent} <a href={privacyHref}>{C.consent_link}</a>.</span>
              </label>
              {(err || failed) && <div role="alert" className="rd-npa-err">{err ? C.consent_err : C.error}</div>}
            </form>
          ) : (
            <div className="rd-npa-card rd-npa-done"><p>{C.success}</p></div>
          )}

          {/* the green banderole across the foot of the picture */}
          <div className="rd-npa-strip">{T.strip}</div>

          <style>{`
            .rd-npa {
              position: relative;
              /* Fit BOTH axes: never wider than the viewport, never taller than it. */
              width: min(420px, calc(100vw - 24px), calc((100dvh - 24px) * ${RD_NEWSPOP_ART_W} / ${RD_NEWSPOP_ART_H}));
              aspect-ratio: ${RD_NEWSPOP_ART_W} / ${RD_NEWSPOP_ART_H};
              container-type: inline-size;
              background: #f7f0e5 url(${RD_NEWSPOP_ART}) center / 100% 100% no-repeat;
              border-radius: 18px;
              box-shadow: 0 40px 90px -30px rgba(0,0,0,.6);
              animation: rdNpIn .42s cubic-bezier(.22,.61,.36,1) both;
              font-family: var(--f-sans);
            }
            .rd-npa-x {
              position: absolute; top: 1.6%; left: 3.4%;
              width: 8.4cqw; height: 8.4cqw; min-width: 30px; min-height: 30px;
              display: grid; place-items: center; cursor: pointer;
              border: none; border-radius: 50%;
              background: color-mix(in srgb, #f7f0e5 78%, transparent);
              color: #6a5f4c;
            }
            .rd-npa-x:hover { color: #2b2620; background: #f7f0e5; }

            /* ── headline zone: above the characters (they start ≈29%) ── */
            .rd-npa-head {
              position: absolute; left: 8%; right: 8%; top: 7.5%;
              text-align: center;
            }
            .rd-npa-caps {
              display: block; font-size: max(11px, 3.2cqw); font-weight: 700;
              letter-spacing: .22em; text-transform: uppercase; color: #bd9445;
            }
            .rd-npa-title {
              margin: 2.2cqw 0 0; font-family: var(--f-display, Georgia, serif);
              font-size: max(24px, 8.4cqw); line-height: 1.06; font-weight: 700;
              color: #2c4327; text-wrap: balance;
            }

            /* ── gold ticket (measured: x 28→69.4%, y 55.8→63.6%) ── */
            .rd-npa-ticket {
              position: absolute; left: 28%; right: 30.6%; top: 55.8%; height: 7.8%;
              display: flex; align-items: center; justify-content: center; gap: 2cqw;
            }
            .rd-npa-pct { font-size: max(23px, 8.2cqw); font-weight: 800; color: #4a3517; line-height: 1; }
            .rd-npa-off { display: flex; flex-direction: column; line-height: 1.1; text-align: left; }
            .rd-npa-off-1 { font-size: max(11px, 3.7cqw); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #4a3517; }
            .rd-npa-off-2 { font-size: max(8.5px, 2.5cqw); font-weight: 600; text-transform: uppercase; letter-spacing: .05em; color: #6b4d2e; }

            /* ── torn note: the clear cream between the envelope sticker
               (≈68%) and the signpost / corner envelope (≈86%), kept inside
               the painted leaves on both sides ── */
            .rd-npa-card {
              position: absolute; left: 15%; right: 13%; top: 69.8%; bottom: 13.5%;
              display: flex; flex-direction: column; justify-content: center; gap: 2cqw;
            }
            .rd-npa-row { display: flex; gap: 2cqw; align-items: stretch; }
            .rd-npa-row input {
              flex: 1 1 auto; min-width: 0; min-height: 44px;
              padding: 0 3.4cqw; font-family: inherit; font-size: max(16px, 3.8cqw); color: #2b2620;
              background: #fffdf7; border: 1px solid rgba(43,38,32,.16);
              border-radius: 3cqw;
            }
            .rd-npa-row input::placeholder { color: #a89f88; }
            .rd-npa-row input:focus-visible { outline: 2px solid #bd9445; outline-offset: 1px; }
            .rd-npa-row button {
              flex: 0 0 auto; min-height: 44px; padding: 0 4.4cqw; cursor: pointer;
              font-family: inherit; font-size: max(15px, 3.8cqw); font-weight: 700; color: #f4eedd;
              background: #2c4327; border: none; border-radius: 3cqw;
            }
            .rd-npa-row button:disabled { opacity: .7; cursor: default; }
            .rd-npa-consent {
              display: flex; gap: 2cqw; align-items: flex-start;
              font-size: max(10.5px, 2.7cqw); line-height: 1.38; color: #6a5f4c; text-align: left;
            }
            .rd-npa-consent input { flex: none; margin: .2cqw 0 0; width: 3.6cqw; height: 3.6cqw; min-width: 16px; min-height: 16px; accent-color: #2c4327; }
            .rd-npa-consent a { color: #4a3517; text-decoration: underline; text-underline-offset: 2px; }
            .rd-npa-err { font-size: max(10px, 2.8cqw); line-height: 1.35; color: #b0623c; }
            .rd-npa-done { justify-content: center; }
            .rd-npa-done p {
              margin: 0; text-align: center; font-family: var(--f-display, Georgia, serif);
              font-size: max(15px, 4.6cqw); line-height: 1.4; color: #2c4327;
            }

            /* ── green banderole (measured y 92.6→99.3%; the painted box icon
               sits ≈13–22%, so the text starts clear of it) ── */
            .rd-npa-strip {
              position: absolute; left: 24.5%; right: 20%; top: 92.6%; bottom: 1.4%;
              display: flex; align-items: center;
              font-size: max(10px, 2.6cqw); line-height: 1.3; color: #e7e0cd; text-wrap: pretty;
            }
          `}</style>
        </div>
      ) : (
        /* ── original desktop dialog ────────────────────────────── */
        <div className="rd-np" role="dialog" aria-modal="true" aria-label={T.title}>
          <button type="button" className="rd-np-x" aria-label={T.close} onClick={close}><RdIcon name="close" size={17} /></button>
          <div className="rd-np-seal" aria-hidden="true"><span>10%</span></div>
          <span className="r-caps r-caps-rule" style={{ color: 'var(--rd-gold)', justifyContent: 'center', display: 'flex' }}>{T.caps}</span>
          <h3 className="r-display rd-np-title">{T.title}</h3>
          {!sent ? (
            <React.Fragment>
              <p className="r-serif rd-np-body">{T.body}</p>
              <form onSubmit={submit} noValidate style={{ marginTop: 22 }}>
                <div className="rd-np-row">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder={C.placeholder || 'you@email.com'} aria-label={C.placeholder || 'Email'} />
                  <button type="submit" className="rbtn rbtn-primary" disabled={busy}>{busy ? (C.sending || C.cta) : (C.cta || 'Go')}</button>
                </div>
                {honeypot}
                <label className="rd-np-consent">
                  <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErr(false); }} />
                  <span>{C.consent} <a href={privacyHref}>{C.consent_link}</a>.</span>
                </label>
                {err && <div role="alert" className="rd-np-err">{C.consent_err}</div>}
                {failed && <div role="alert" className="rd-np-err">{C.error}</div>}
                <button type="button" className="rd-np-no" onClick={close}>{T.no}</button>
              </form>
            </React.Fragment>
          ) : (
            <p className="r-serif rd-np-body" style={{ marginTop: 18 }}>{C.success}</p>
          )}
        </div>
      )}
      <style>{`
        .rd-np-scrim { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 12px; background: color-mix(in srgb, var(--rd-night) 62%, transparent); backdrop-filter: blur(3px); animation: rdNpFade .3s ease both; }
        @keyframes rdNpFade { from { opacity: 0 } to { opacity: 1 } }
        .rd-np { position: relative; width: min(460px, 100%); max-height: calc(100vh - 40px); overflow: auto; background: var(--rd-paper); border: 1px solid color-mix(in srgb, var(--rd-gold) 42%, transparent); border-radius: 16px; padding: 40px 34px 30px; text-align: center; box-shadow: 0 40px 90px -30px rgba(0,0,0,.6); animation: rdNpIn .42s cubic-bezier(.22,.61,.36,1) both; }
        @keyframes rdNpIn { from { opacity: 0; transform: translateY(18px) scale(.985) } to { opacity: 1; transform: none } }
        .rd-np-x { position: absolute; top: 11px; right: 11px; width: 32px; height: 32px; display: grid; place-items: center; border: none; background: transparent; color: var(--rd-ink-mute); cursor: pointer; border-radius: 8px; }
        .rd-np-x:hover { color: var(--rd-ink); background: color-mix(in srgb, var(--rd-ink) 7%, transparent); }
        .rd-np-seal { width: 66px; height: 66px; margin: 0 auto 20px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 34% 30%, color-mix(in srgb, var(--rd-gold) 82%, #fff) 0%, var(--rd-gold) 55%, color-mix(in srgb, var(--rd-gold) 72%, var(--rd-ink)) 100%); box-shadow: inset 0 -2px 6px color-mix(in srgb, var(--rd-ink) 30%, transparent), 0 10px 22px -12px color-mix(in srgb, var(--rd-ink) 70%, transparent); }
        .rd-np-seal span { font-family: var(--f-sans); font-weight: 800; font-size: 19px; letter-spacing: -.01em; color: var(--rd-paper); }
        .rd-np-title { font-size: clamp(27px, 4.4vw, 34px); line-height: 1.1; color: var(--rd-ink); margin-top: 16px; text-wrap: balance; }
        .rd-np-body { font-size: 16.5px; line-height: 1.6; color: var(--rd-ink-soft); margin-top: 14px; text-wrap: pretty; }
        .rd-np-row { display: flex; gap: 9px; flex-wrap: wrap; }
        .rd-np-row input { flex: 1 1 190px; min-width: 0; padding: 14px 16px; font-family: var(--f-sans); font-size: 15px; color: var(--rd-ink); background: var(--rd-cream); border: 1px solid color-mix(in srgb, var(--rd-ink) 18%, transparent); border-radius: 10px; }
        .rd-np-row input:focus-visible { outline: 2px solid var(--rd-gold); outline-offset: 1px; }
        .rd-np-row .rbtn { flex: 0 0 auto; }
        .rd-np-consent { display: flex; gap: 10px; align-items: flex-start; margin-top: 14px; text-align: left; font-family: var(--f-sans); font-size: 13.5px; line-height: 1.5; color: var(--rd-ink-mute); }
        .rd-np-consent input { margin-top: 2px; accent-color: var(--rd-gold); flex: none; }
        .rd-np-consent a { color: var(--rd-ink); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 2px; }
        .rd-np-err { margin-top: 10px; font-family: var(--f-sans); font-size: 12.5px; color: var(--rd-terra); text-align: left; }
        .rd-np-no { display: block; margin: 16px auto 0; background: none; border: none; padding: 4px; font-family: var(--f-sans); font-size: 12.5px; color: var(--rd-ink-mute); cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .rd-np-no:hover { color: var(--rd-ink); }
      `}</style>
    </div>
  );
}

Object.assign(window, { RdNewsPopup, rdNewsPopSnoozed, rdNewsPopSnooze });
