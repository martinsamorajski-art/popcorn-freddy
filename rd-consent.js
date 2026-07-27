/* ────────────────────────────────────────────────────────────────
   Popcorn & Freddy — Cookie-/Consent-Banner (DSGVO + TKG § 165)
   Framework-frei, läuft auf jeder Seite. Kein Dark Pattern:
   „Alle akzeptieren" und „Alle ablehnen" sind gleichwertig
   (gleiche Größe, Farbe, Kontrast, Position).

   Script-Gate: nicht-notwendige Skripte werden als
     <script type="text/plain" data-consent="statistik|marketing" ...>
   eingebunden und ERST nach passender Einwilligung aktiviert.
   Auch verwendbar für gated Embeds via window.PFConsent.has('marketing').

   Widerruf jederzeit:  window.PFConsent.open()
   Footer-Link: beliebiges Element mit  data-cc-open  wird verdrahtet.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var KEY = 'pf-consent-v1';
  var CATS = ['statistik', 'marketing']; // 'notwendig' ist immer aktiv
  var listeners = [];

  function read() {
    try { var o = JSON.parse(localStorage.getItem(KEY)); if (o && o.v === 1) return o; }
    catch (e) {}
    return null;
  }
  function save(state) {
    var o = { v: 1, ts: new Date().toISOString(), notwendig: true };
    CATS.forEach(function (c) { o[c] = !!state[c]; });
    try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
    return o;
  }
  function has(cat) {
    if (cat === 'notwendig') return true;
    var o = read();
    return !!(o && o[cat]);
  }

  // Aktiviert geblockte <script type="text/plain" data-consent="…">
  function activateScripts() {
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function (el) {
      if (el.dataset.ccActivated) return;
      var cat = el.getAttribute('data-consent');
      if (!has(cat)) return;
      var s = document.createElement('script');
      for (var i = 0; i < el.attributes.length; i++) {
        var a = el.attributes[i];
        if (a.name === 'type' || a.name === 'data-consent') continue;
        s.setAttribute(a.name, a.value);
      }
      s.type = 'text/javascript';
      if (!el.src) s.textContent = el.textContent;
      el.dataset.ccActivated = '1';
      el.parentNode.insertBefore(s, el.nextSibling);
    });
  }

  function apply(o) {
    activateScripts();
    listeners.forEach(function (fn) { try { fn(o); } catch (e) {} });
    window.dispatchEvent(new CustomEvent('pf-consent-changed', { detail: o }));
  }

  // ── UI ───────────────────────────────────────────────────────────
  var root, lastFocus;

  function injectStyles() {
    if (document.getElementById('pf-cc-style')) return;
    var css = document.createElement('style');
    css.id = 'pf-cc-style';
    css.textContent = [
      '.pf-cc,.pf-cc *{box-sizing:border-box}',
      '.pf-cc{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;justify-content:center;padding:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}',
      '.pf-cc[hidden]{display:none}',
      '.pf-cc-scrim{position:absolute;inset:0;background:rgba(28,35,26,.55);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}',
      '.pf-cc-panel{position:relative;width:100%;max-width:560px;background:#FBF6E9;color:#2C2519;border:1px solid rgba(44,37,25,.14);border-radius:16px;box-shadow:0 30px 70px -20px rgba(28,35,26,.6);padding:26px 26px 22px;animation:pf-cc-in .35s cubic-bezier(.22,.8,.32,1)}',
      '@keyframes pf-cc-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}',
      '@media(prefers-reduced-motion:reduce){.pf-cc-panel{animation:none}}',
      '.pf-cc-eyebrow{font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#A8823F;margin:0 0 8px}',
      '.pf-cc-title{font-size:21px;font-weight:700;margin:0 0 10px;line-height:1.2;color:#2C2519;font-family:Georgia,"Times New Roman",serif}',
      '.pf-cc-text{font-size:14.5px;line-height:1.6;color:#5A5140;margin:0 0 18px}',
      '.pf-cc-text a{color:#7A5A22;text-decoration:underline;font-weight:600}',
      '.pf-cc-actions{display:flex;flex-wrap:wrap;gap:10px}',
      '.pf-cc-btn{flex:1 1 150px;min-height:48px;padding:13px 18px;border-radius:10px;font-size:14.5px;font-weight:700;letter-spacing:.01em;cursor:pointer;border:1.5px solid transparent;transition:transform .15s,box-shadow .2s,background .2s;font-family:inherit}',
      '.pf-cc-btn:focus-visible{outline:3px solid #A8823F;outline-offset:2px}',
      '.pf-cc-btn:active{transform:translateY(1px)}',
      /* accept & reject are visually IDENTICAL — equal weight, no dark pattern */
      '.pf-cc-btn--equal{background:#3F4E36;color:#F6F1E0;border-color:#3F4E36}',
      '.pf-cc-btn--equal:hover{background:#33402c}',
      '.pf-cc-btn--ghost{flex:1 1 100%;background:transparent;color:#2C2519;border-color:rgba(44,37,25,.28)}',
      '.pf-cc-btn--ghost:hover{background:rgba(44,37,25,.06)}',
      '.pf-cc-cats{margin:4px 0 18px;display:grid;gap:12px}',
      '.pf-cc-cat{border:1px solid rgba(44,37,25,.16);border-radius:12px;padding:15px 16px;background:#F7F0DF}',
      '.pf-cc-cat-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}',
      '.pf-cc-cat-name{font-size:15px;font-weight:700;color:#2C2519;margin:0}',
      '.pf-cc-cat-desc{font-size:13px;line-height:1.55;color:#5A5140;margin:7px 0 0}',
      /* toggle switch */
      '.pf-cc-sw{position:relative;flex:0 0 auto;width:46px;height:27px;border-radius:999px;background:rgba(44,37,25,.24);border:none;cursor:pointer;transition:background .2s;padding:0}',
      '.pf-cc-sw::after{content:"";position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.3)}',
      '.pf-cc-sw[aria-checked="true"]{background:#3F4E36}',
      '.pf-cc-sw[aria-checked="true"]::after{transform:translateX(19px)}',
      '.pf-cc-sw[aria-disabled="true"]{background:#7A8A5F;cursor:not-allowed;opacity:.9}',
      '.pf-cc-sw:focus-visible{outline:3px solid #A8823F;outline-offset:2px}',
      '.pf-cc-lock{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7A8A5F;white-space:nowrap;align-self:center}',
      '.pf-cc-foot{display:flex;gap:10px;flex-wrap:wrap}',
      '.pf-cc-foot .pf-cc-btn{flex:1 1 150px}',
      '.pf-cc-save{background:#A8823F;color:#fff;border-color:#A8823F}',
      '.pf-cc-save:hover{background:#946f30}',
      '@media(max-width:520px){.pf-cc-btn--equal{flex:1 1 100%}}'
    ].join('');
    document.head.appendChild(css);
  }

  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === 'html') el.innerHTML = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) el.appendChild(c); });
    return el;
  }

  function close() {
    if (root) { root.setAttribute('hidden', ''); }
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  function open(mode) {
    injectStyles();
    lastFocus = document.activeElement;
    if (root) root.remove();
    var stored = read() || {};
    var state = { statistik: !!stored.statistik, marketing: !!stored.marketing };

    var panel = h('div', { class: 'pf-cc-panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'pf-cc-title' });

    if (mode === 'settings') {
      panel.appendChild(h('p', { class: 'pf-cc-eyebrow', text: 'Datenschutz' }));
      panel.appendChild(h('h2', { class: 'pf-cc-title', id: 'pf-cc-title', text: 'Cookie-Einstellungen' }));
      panel.appendChild(h('p', { class: 'pf-cc-text', html: 'Wähle selbst, was erlaubt ist. Notwendige Cookies sind für den Betrieb des Shops (Warenkorb, Kasse, Spracheinstellung) erforderlich und immer aktiv. Details in der <a href="Cookies.html">Cookie-Erklärung</a> und der <a href="Datenschutz.html">Datenschutzerklärung</a>.' }));

      var cats = h('div', { class: 'pf-cc-cats' });
      // Notwendig — fix aktiv
      cats.appendChild(catRow('Notwendig', 'Warenkorb, Bestellvorgang, Sprache und die Cookie-Entscheidung selbst. Ohne diese funktioniert der Shop nicht.', null, true));
      // Statistik
      var swStat = catRow('Statistik', 'Anonyme, reichweitenarme Auswertung, wie der Shop genutzt wird — nur mit deiner Einwilligung. Aktuell nicht im Einsatz.', 'statistik', false, state.statistik);
      cats.appendChild(swStat);
      // Marketing
      var swMkt = catRow('Marketing', 'Personalisierte Inhalte und Messung von Werbung (z. B. eingebettete Videos). Aktuell nicht im Einsatz.', 'marketing', false, state.marketing);
      cats.appendChild(swMkt);
      panel.appendChild(cats);

      var foot = h('div', { class: 'pf-cc-foot' });
      var saveBtn = h('button', { class: 'pf-cc-btn pf-cc-save', type: 'button', text: 'Auswahl speichern' });
      saveBtn.addEventListener('click', function () { commit(state); });
      var rejectBtn = h('button', { class: 'pf-cc-btn pf-cc-btn--equal', type: 'button', text: 'Alle ablehnen' });
      rejectBtn.addEventListener('click', function () { commit({ statistik: false, marketing: false }); });
      var acceptBtn = h('button', { class: 'pf-cc-btn pf-cc-btn--equal', type: 'button', text: 'Alle akzeptieren' });
      acceptBtn.addEventListener('click', function () { commit({ statistik: true, marketing: true }); });
      foot.appendChild(rejectBtn); foot.appendChild(acceptBtn);
      panel.appendChild(foot);
      panel.appendChild(h('div', { class: 'pf-cc-foot', style: 'margin-top:10px' }, [saveBtn]));

      function catRow(name, desc, cat, locked, checked) {
        var row = h('div', { class: 'pf-cc-cat' });
        var top = h('div', { class: 'pf-cc-cat-top' });
        top.appendChild(h('h3', { class: 'pf-cc-cat-name', text: name }));
        if (locked) {
          top.appendChild(h('span', { class: 'pf-cc-lock', text: 'Immer aktiv' }));
        } else {
          var sw = h('button', { class: 'pf-cc-sw', type: 'button', role: 'switch', 'aria-checked': checked ? 'true' : 'false', 'aria-label': name + ' erlauben' });
          sw.addEventListener('click', function () {
            state[cat] = !state[cat];
            sw.setAttribute('aria-checked', state[cat] ? 'true' : 'false');
          });
          top.appendChild(sw);
        }
        row.appendChild(top);
        row.appendChild(h('p', { class: 'pf-cc-cat-desc', text: desc }));
        return row;
      }
    } else {
      panel.appendChild(h('p', { class: 'pf-cc-eyebrow', text: 'Datenschutz' }));
      panel.appendChild(h('h2', { class: 'pf-cc-title', id: 'pf-cc-title', text: 'Wir fragen zuerst.' }));
      panel.appendChild(h('p', { class: 'pf-cc-text', html: 'Notwendige Cookies halten Warenkorb und Kasse am Laufen. Für Statistik oder Marketing setzen wir nichts, bevor du zustimmst. Du entscheidest — und kannst es jederzeit ändern. Mehr in der <a href="Cookies.html">Cookie-Erklärung</a> und <a href="Datenschutz.html">Datenschutzerklärung</a>.' }));

      var actions = h('div', { class: 'pf-cc-actions' });
      var reject = h('button', { class: 'pf-cc-btn pf-cc-btn--equal', type: 'button', text: 'Alle ablehnen' });
      reject.addEventListener('click', function () { commit({ statistik: false, marketing: false }); });
      var accept = h('button', { class: 'pf-cc-btn pf-cc-btn--equal', type: 'button', text: 'Alle akzeptieren' });
      accept.addEventListener('click', function () { commit({ statistik: true, marketing: true }); });
      var settings = h('button', { class: 'pf-cc-btn pf-cc-btn--ghost', type: 'button', text: 'Einstellungen' });
      settings.addEventListener('click', function () { open('settings'); });
      // Order: reject first, accept second — identical styling, equal prominence
      actions.appendChild(reject); actions.appendChild(accept); actions.appendChild(settings);
      panel.appendChild(actions);
    }

    root = h('div', { class: 'pf-cc' }, []);
    var scrim = h('div', { class: 'pf-cc-scrim' });
    // Scrim click closes ONLY if a decision already exists (revoke mode); first visit must be answered
    scrim.addEventListener('click', function () { if (read()) close(); });
    root.appendChild(scrim);
    root.appendChild(panel);
    document.body.appendChild(root);
    document.documentElement.style.overflow = 'hidden';

    // focus + keyboard trap
    root.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && read()) { close(); return; }
      if (e.key !== 'Tab') return;
      var f = panel.querySelectorAll('button,a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    requestAnimationFrame(function () { var b = panel.querySelector('button'); if (b) b.focus(); });
  }

  function commit(state) {
    var o = save(state);
    close();
    apply(o);
  }

  // ── public API ────────────────────────────────────────────────────
  window.PFConsent = {
    open: function () { open('settings'); },
    openBanner: function () { open('banner'); },
    has: has,
    get: read,
    onChange: function (fn) { listeners.push(fn); if (read()) fn(read()); }
  };

  function wireFooterLinks() {
    document.querySelectorAll('[data-cc-open]').forEach(function (el) {
      if (el.dataset.ccWired) return;
      el.dataset.ccWired = '1';
      el.addEventListener('click', function (e) { e.preventDefault(); open('settings'); });
    });
  }

  function boot() {
    injectStyles();
    wireFooterLinks();
    // re-wire when React footers mount later
    new MutationObserver(wireFooterLinks).observe(document.documentElement, { childList: true, subtree: true });
    var o = read();
    if (o) apply(o);        // returning visitor — activate what they allowed
    else open('banner');    // first visit — ask before any non-necessary cookie
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
