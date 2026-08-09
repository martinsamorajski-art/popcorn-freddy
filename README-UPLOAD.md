# Popcorn & Freddy — Upload-Paket (Server-/GitHub-Inhalt)

Dieser Ordner enthält **genau** die Dateien, die die Live-Seite zum Betrieb braucht —
nichts mehr, nichts weniger. So gehst du vor:

1. Auf dem Server / im GitHub-Repo **alles löschen**.
2. Den **gesamten Inhalt dieses Ordners** (nicht den Ordner selbst) ins Repo-Root legen.
3. Committen → Cloudflare Pages deployt automatisch.

Wichtig: Der Inhalt gehört ins **Wurzelverzeichnis** (also `index.html` liegt direkt
im Root, nicht in einem Unterordner).

---

## Was drin ist

**Seiten (14 öffentlich + 2 intern)**
index · Produkt · Checkout · Alle Kapitel · Geschenkkarten · Kontakt
AGB · Cookies · Datenschutz · Impressum · Widerruf · Produktsicherheit ·
Sicherheit & Material · Versand & Ruecksendung
Backoffice.html + Shop-Setup.html (interne Hilfsseiten — nur nötig, wenn du sie nutzt;
kannst du löschen, wenn nicht gebraucht)

**App-Code (JS/JSX/CSS)** — alle rd-*, pf-*, copy.jsx, tweaks-panel.jsx,
image-slot.js, snipcart-loader.js, rd-consent.js, rd-styles.css, rd-checkout.css

**functions/** — Cloudflare Pages Functions (Server-Logik):
- `_middleware.js`, `_locale-router.js` — Sprach-/Länder-Routing
- `api/shop.js` — Shopify-Anbindung (Storefront-Key bleibt serverseitig)
- `api/newsletter.js` — Klaviyo-Anbindung
- `api/reviews.js` — Judge.me-Bewertungen
- `api/geo.js` — Länder-Erkennung
- `at/ ch/ de/ us/ …` — Länder-Routen

**assets/** — alle Bilder + `assets/fonts/` (lokale Schriften, DSGVO-konform)

**Konfiguration** — `_headers`, `_redirects`, `package.json`, Favicons

---

## Was BEWUSST NICHT hier ist (und warum)

Diese Dinge liegen weiterhin in deinem Projekt, gehören aber **nicht auf den Server**:

- **E-Mail-Vorlagen** (`Newsletter-*.html`, `Order-Confirmation-Email-Preview.html`)
  → werden in **Klaviyo** eingefügt, nicht vom Server ausgeliefert.
- **Shopify-Vorlagen** (`shopify-*.liquid`, `shopify-giftcard-pdf.html`)
  → werden in **Shopify** eingefügt, nicht vom Server ausgeliefert.
- **Setup-Doku** (`*.md` wie SHOPIFY-SETUP, NEWSLETTER-SETUP …)
  → nur Anleitungen für dich.
- **Backups & Vorschauen** (`deploy/`, `changed-*`, `upload/`, `mockups/`,
  `popup-mobile-preview.html`, Debug-PNGs) → Arbeitsstände, nicht benötigt.
- **Ungenutztes Scaffolding** (`design-canvas.jsx`, `doc-page.js`,
  `fc-concepts.jsx`, `fc-helpers.jsx`) → von keiner Seite geladen.

> Diese Dateien NICHT wegwerfen — du brauchst die E-Mail-/Shopify-Vorlagen und die
> Doku zum Einrichten der externen Dienste. Sie bleiben in deinem Projekt erhalten.

---

## Nach dem Deploy prüfen (2 Min.)

- Netzwerk-Tab: **kein** Request an `fonts.googleapis.com` / `fonts.gstatic.com`.
- Cookie-Einstellungen im Footer öffnen sich.
- Checkout: „Weiter zur Zahlung" bleibt gesperrt, bis das Widerrufs-Häkchen gesetzt ist.
- Umgebungs-Variablen in Cloudflare gesetzt (Shopify-Token, Klaviyo-Key, Judge.me) —
  die stehen NICHT im Code, sondern im Cloudflare-Dashboard.
