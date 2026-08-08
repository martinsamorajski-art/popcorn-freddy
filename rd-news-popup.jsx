/* ────────────────────────────────────────────────────────────────
   Home-page newsletter invitation (timed)
   ────────────────────────────────────────────────────────────────
   Appears once — after a quiet delay or half a page of scrolling,
   whichever comes first. Never for someone who already subscribed,
   never on top of the country/language nudge, and a dismissal is
   remembered for 30 days. Consent wording matches the footer form.

   ONE presentation on every viewport: the illustrated Popcorn &
   Freddy card. The artwork is a single image with empty zones; every
   text block sits in an absolutely-positioned box measured against
   that image, so the composition holds at any size. Type is sized in
   `cqw` (a share of the card's own width). The card is capped small
   enough to sit comfortably inside a phone OR a desktop viewport
   without covering the whole screen.
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
    title: 'Sei die/der Erste beim nächsten Kapitel',
    body: 'Trag dich in die Reisepost ein und wir sagen dir Bescheid, sobald ein neues Popcorn-&-Freddy-Kapitel beginnt.',
    reassure: 'Keine Wochen-Mails. Kein Spam. Nur ein kleiner Gruß, wenn ein neues Abenteuer beginnt.',
    art_consent: 'Ja, ich möchte die Reisepost erhalten — Abmeldung jederzeit möglich. Mehr in der',
    off: 'Rabatt',
    off_sub: 'auf die erste Box',
    strip1: 'Mit Sorgfalt gefertigt',
    strip2: 'Rund 100 Boxen jeden Monat.',
    no: 'Nein danke',
    close: 'Schließen',
  },
  en: {
    caps: 'Join our adventure',
    title: 'Be the first to discover the next chapter',
    body: 'Join the travel post and we’ll let you know whenever a new Popcorn & Freddy chapter begins.',
    reassure: 'No weekly emails. No spam. Just a little post when a new adventure begins.',
    art_consent: 'Yes, send me the travel post — unsubscribe any time. More in our',
    off: 'off',
    off_sub: 'first box',
    strip1: 'Made with care',
    strip2: 'Around 100 boxes crafted each month.',
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
  const trap = React.useRef(null);

  useEffect(() => {
    // Preview switch: ?newspopup=1 opens it at once, ignoring snooze/delay.
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
      <div className="rd-npa" role="dialog" aria-modal="true" aria-label={T.title}>
        <button type="button" className="rd-npa-x" aria-label={T.close} onClick={close}>
          <RdIcon name="close" size={16} />
        </button>

        {/* headline — the empty paper above the characters */}
        <div className="rd-npa-head">
          <span className="rd-npa-caps">{T.caps}</span>
          <h3 className="rd-npa-title">{T.title}</h3>
          <p className="rd-npa-body">{T.body}</p>
        </div>

        {/* the gold ticket the pair is holding */}
        <div className="rd-npa-ticket" aria-hidden="true">
          <span className="rd-npa-pct">5%</span>
          <span className="rd-npa-off">
            <span className="rd-npa-off-1">{T.off}</span>
            <span className="rd-npa-off-2">{T.off_sub}</span>
          </span>
        </div>

        {/* the torn note — form lives here */}
        {!sent ? (
          <form className="rd-npa-card" onSubmit={submit} noValidate>
            <p className="rd-npa-reassure">{T.reassure}</p>
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
        <div className="rd-npa-strip">
          <span className="rd-npa-strip-1">{T.strip1}</span>
          <span className="rd-npa-strip-2">{T.strip2}</span>
        </div>

        <style>{`
          .rd-npa {
            position: relative;
            /* Capped small enough to sit inside a phone OR desktop viewport
               without filling it; fits both axes. */
            width: min(320px, calc(100vw - 32px), calc((100dvh - 40px) * ${RD_NEWSPOP_ART_W} / ${RD_NEWSPOP_ART_H}));
            aspect-ratio: ${RD_NEWSPOP_ART_W} / ${RD_NEWSPOP_ART_H};
            container-type: inline-size;
            background: #f7f0e5 url(${RD_NEWSPOP_ART}) center / 100% 100% no-repeat;
            border-radius: 18px;
            box-shadow: 0 40px 90px -30px rgba(0,0,0,.6);
            animation: rdNpIn .42s cubic-bezier(.22,.61,.36,1) both;
            font-family: var(--f-sans);
          }
          @keyframes rdNpIn { from { opacity: 0; transform: translateY(18px) scale(.985) } to { opacity: 1; transform: none } }
          .rd-npa-x {
            position: absolute; top: 1.6%; left: 3.4%;
            width: 8.4cqw; height: 8.4cqw; min-width: 28px; min-height: 28px;
            display: grid; place-items: center; cursor: pointer;
            border: none; border-radius: 50%;
            background: color-mix(in srgb, #f7f0e5 78%, transparent);
            color: #6a5f4c;
          }
          .rd-npa-x:hover { color: #2b2620; background: #f7f0e5; }

          /* ── headline zone: above the characters (they start ≈29%) ── */
          .rd-npa-head {
            position: absolute; left: 7%; right: 7%; top: 5.6%;
            text-align: center;
          }
          .rd-npa-caps {
            display: block; font-size: max(10px, 3cqw); font-weight: 700;
            letter-spacing: .2em; text-transform: uppercase; color: #bd9445;
          }
          .rd-npa-title {
            margin: 1.8cqw 0 0; font-family: var(--f-display, Georgia, serif);
            font-size: max(19px, 7.2cqw); line-height: 1.04; font-weight: 700;
            color: #2c4327; text-wrap: balance;
          }
          .rd-npa-body {
            margin: 2cqw 0 0; font-size: max(11px, 3.15cqw); line-height: 1.35;
            color: #6a5f4c; text-wrap: pretty;
          }

          /* ── gold ticket: 5% fills the banner ── */
          .rd-npa-ticket {
            position: absolute; left: 29%; right: 30.6%; top: 55.6%; height: 8.2%;
            display: flex; align-items: center; justify-content: center; gap: 2.4cqw;
          }
          .rd-npa-pct { font-size: max(30px, 11.4cqw); font-weight: 800; color: #4a3517; line-height: .9; letter-spacing: -.02em; }
          .rd-npa-off { display: flex; flex-direction: column; line-height: 1.05; text-align: left; }
          .rd-npa-off-1 { font-size: max(11px, 4cqw); font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #4a3517; }
          .rd-npa-off-2 { font-size: max(8px, 2.5cqw); font-weight: 600; text-transform: uppercase; letter-spacing: .04em; color: #6b4d2e; }

          /* ── torn note: the clear cream between the ticket and the
             signpost / corner envelope, inside the painted leaves ── */
          .rd-npa-card {
            position: absolute; left: 14%; right: 12.5%; top: 66.5%; bottom: 12%;
            display: flex; flex-direction: column; justify-content: center; gap: 1.7cqw;
          }
          .rd-npa-reassure {
            margin: 0; font-size: max(9px, 2.55cqw); line-height: 1.28;
            color: #7c6a4d; text-align: center; text-wrap: pretty;
          }
          .rd-npa-row { display: flex; gap: 1.8cqw; align-items: stretch; }
          .rd-npa-row input {
            flex: 1 1 auto; min-width: 0; min-height: 40px;
            padding: 0 3cqw; font-family: inherit; font-size: max(16px, 3.6cqw); color: #2b2620;
            background: #fffdf7; border: 1px solid rgba(43,38,32,.16);
            border-radius: 2.6cqw;
          }
          .rd-npa-row input::placeholder { color: #a89f88; }
          .rd-npa-row input:focus-visible { outline: 2px solid #bd9445; outline-offset: 1px; }
          .rd-npa-row button {
            flex: 0 0 auto; min-height: 40px; padding: 0 3.8cqw; cursor: pointer;
            font-family: inherit; font-size: max(14px, 3.6cqw); font-weight: 700; color: #f4eedd;
            background: #2c4327; border: none; border-radius: 2.6cqw;
          }
          .rd-npa-row button:disabled { opacity: .7; cursor: default; }
          .rd-npa-consent {
            display: flex; gap: 1.8cqw; align-items: flex-start;
            font-size: max(9px, 2.45cqw); line-height: 1.3; color: #7c6a4d; text-align: left;
          }
          .rd-npa-consent input { flex: none; margin: .2cqw 0 0; width: 3.4cqw; height: 3.4cqw; min-width: 15px; min-height: 15px; accent-color: #2c4327; }
          .rd-npa-consent a { color: #4a3517; text-decoration: underline; text-underline-offset: 2px; }
          .rd-npa-err { font-size: max(9px, 2.6cqw); line-height: 1.3; color: #b0623c; }
          .rd-npa-done { justify-content: center; }
          .rd-npa-done p {
            margin: 0; text-align: center; font-family: var(--f-display, Georgia, serif);
            font-size: max(14px, 4.2cqw); line-height: 1.38; color: #2c4327;
          }

          /* ── green banderole (y 92.6→99.3%; the painted box icon sits at
             the left ≈13–22%, so the text starts clear of it) ── */
          .rd-npa-strip {
            position: absolute; left: 30%; right: 12%; top: 92.4%; bottom: 1.4%;
            display: flex; flex-direction: column; justify-content: center; gap: .2cqw;
            color: #e7e0cd; text-wrap: pretty;
          }
          .rd-npa-strip-1 { font-size: max(9.5px, 2.7cqw); font-weight: 700; line-height: 1.15; }
          .rd-npa-strip-2 { font-size: max(9px, 2.5cqw); line-height: 1.15; color: color-mix(in srgb, #e7e0cd 82%, transparent); }
        `}</style>
      </div>
      <style>{`
        .rd-np-scrim { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 12px; background: color-mix(in srgb, var(--rd-night) 62%, transparent); backdrop-filter: blur(3px); animation: rdNpFade .3s ease both; }
        @keyframes rdNpFade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}

Object.assign(window, { RdNewsPopup, rdNewsPopSnoozed, rdNewsPopSnooze });
