/* ────────────────────────────────────────────────────────────────
   Home-page newsletter invitation (timed)
   ────────────────────────────────────────────────────────────────
   Appears once — after a quiet delay or half a page of scrolling,
   whichever comes first. Never for someone who already subscribed,
   never on top of the country/language nudge, and a dismissal is
   remembered for 30 days. Legal text is the SAME copy as the footer
   form (window.COPY), so consent wording can never drift apart.
   ──────────────────────────────────────────────────────────────── */

const RD_NEWSPOP_KEY = 'pf-news-popup-v1';       // { at: <ms> } last dismissal
const RD_NEWSPOP_DELAY = 14000;                  // ms before it may appear
const RD_NEWSPOP_SCROLL = 0.5;                   // or half the page, whichever first
const RD_NEWSPOP_SNOOZE = 30 * 24 * 60 * 60 * 1000;

const RD_NEWSPOP_T = {
  de: {
    caps: 'Ein Willkommensgeschenk',
    title: 'Zehn Prozent auf die erste Box.',
    body: 'Trag dich in die Reisepost ein und wir schicken dir deinen persönlichen Rabattcode — dazu neue Kapitel und kleine Bastel-Ideen.',
    no: 'Nein danke',
    close: 'Schließen',
  },
  en: {
    caps: 'A welcome gift',
    title: 'Ten percent off your first box.',
    body: 'Join the travel post and we’ll send you your personal discount code — plus new chapters and little crafting ideas.',
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

  return (
    <div className="rd-np-scrim" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
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
              <input ref={trap} type="text" name="company" tabIndex="-1" autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
              <label className="rd-np-consent">
                <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); if (e.target.checked) setErr(false); }} />
                <span>{C.consent} <a href={window.PFLocale ? PFLocale.withLocale('Datenschutz.html') : 'Datenschutz.html'}>{C.consent_link}</a>.</span>
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
      <style>{`
        .rd-np-scrim { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 20px; background: color-mix(in srgb, var(--rd-night) 62%, transparent); backdrop-filter: blur(3px); animation: rdNpFade .3s ease both; }
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
        @media (max-width: 480px) { .rd-np { padding: 34px 22px 24px; } }
      `}</style>
    </div>
  );
}

Object.assign(window, { RdNewsPopup, rdNewsPopSnoozed, rdNewsPopSnooze });
