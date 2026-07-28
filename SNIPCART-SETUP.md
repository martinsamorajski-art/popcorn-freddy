# Snipcart-Setup — Schritt für Schritt

Dein Stack: **deine Seite (Netlify)** + **Snipcart** (Warenkorb, Kasse, Backend) +
**Stripe** (Zahlung) + **sevDesk** (Rechnung) + **Brevo** (Newsletter).
Dein Flüsterwald-Design bleibt zu 100 % erhalten — Snipcart ist nur ein Snippet.

Reihenfolge unten von oben nach unten abarbeiten. Stripe kannst du zuletzt machen.

---

## 1) Snipcart-Konto anlegen
1. Auf **snipcart.com** registrieren (kostenlos, erst im Live-Betrieb fallen 2 % an).
2. Dashboard → **Account → API Keys**.
3. Kopiere den **PUBLIC API KEY** (beginnt mit `NWY...` o. Ä.). Nur den öffentlichen — den Secret Key NIE in die Website schreiben.

## 2) Snipcart in die Seite einbauen
Auf **jeder Produktseite** (`Der Fluesterwald v3.html`, später `Der Silbersee - Kapitel 2.html`, `Alle Kapitel.html`) zwei Dinge einfügen:

**a) Im `<head>`** (direkt nach der `rd-styles.css`-Zeile):
```html
<link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.css" />
```

**b) Direkt vor `</body>`** (vor `<script src="rd-consent.js">`):
```html
<div hidden id="snipcart" data-api-key="HIER_DEIN_PUBLIC_API_KEY"></div>
<script async src="https://cdn.snipcart.com/themes/v3.7.1/default/snipcart.js"></script>
```
→ `HIER_DEIN_PUBLIC_API_KEY` durch deinen Key aus Schritt 1 ersetzen.

Sag mir Bescheid, sobald du den Key hast — dann trage ich diese Blöcke auf allen
Produktseiten für dich ein (statt es von Hand zu machen).

## 3) Der Kaufbutton ist schon vorbereitet
Auf der Produktseite `Der Fluesterwald v3.html` ist der „In den Warenkorb"-Button
bereits ein Snipcart-Button — inkl. **Eingabefeld „Name des Kindes"**. Sobald der
Key drin ist, funktioniert er automatisch. Diese Werte musst du nur prüfen/anpassen
(in `rd-chapter1-shop.jsx`, Funktion `Ch1BuyBox`):
- `data-item-id` — eindeutige Artikelnummer (bleibt konstant)
- `data-item-price="29.90"` — **echten Preis eintragen** (Punkt, nicht Komma!)
- `data-item-url="Der Fluesterwald v3.html"` — Snipcart ruft diese Seite auf, um den
  Preis zu prüfen. Muss die Seite sein, auf der der Button steht. **Wichtig:** Sobald
  die Seite live unter deiner Domain liegt, hier die **volle URL** eintragen
  (z. B. `https://deinedomain.at/Der Fluesterwald v3.html`).

Der eingegebene Kindername reist mit der Bestellung mit und steht später im
Snipcart-Dashboard bei jeder Order (→ Schritt 6).

## 4) Zahlung: Stripe (kannst du später machen)
1. Stripe-Konto anlegen (stripe.com), Firmendaten + Bankverbindung hinterlegen.
2. Im **Snipcart-Dashboard → Payment Gateway → Stripe** verbinden (ein Klick, kein Code).
3. Apple Pay / Google Pay aktivieren sich damit automatisch.
Bis Stripe verbunden ist, läuft Snipcart im **Test-Modus** — du kannst alles mit
Test-Kreditkarten durchprobieren, ohne echtes Geld.

## 5) Rechnung: sevDesk automatisch
1. sevDesk-Konto (Tarif „Rechnung", ~18 €/Monat), UID + Firmendaten eintragen.
2. Verbindung Snipcart → sevDesk über **Make.com** (oder Zapier):
   - Trigger: Snipcart **„Order completed"** (Webhook).
   - Aktion: sevDesk **„Rechnung erstellen"** mit Positionen + Kundendaten.
3. Rechnungsnummernkreis + Steuersätze (20 % / 10 %) in sevDesk einmalig einstellen.
→ Danach entsteht zu jeder Bestellung automatisch eine AT-konforme Rechnung.

## 6) Bestellungen & Kindername sehen
**Snipcart-Dashboard → Orders** → Bestellung öffnen. Dort stehen Adresse, Kapitel,
Betrag **und „Name des Kindes: …"**. Das ist deine Druck-/Versandliste.

## 7) Newsletter: Brevo
Das Newsletter-Formular (Double-Opt-In) auf Brevo zeigen lassen — Brevo übernimmt
Anmeldung, Bestätigungsmail und Abmeldung. Sag Bescheid, dann verdrahte ich das
Formular mit deiner Brevo-Liste.

---

## Vor dem Livegang — Checkliste
- [ ] Public API Key auf allen Produktseiten eingetragen
- [ ] Echte Preise in allen `data-item-price` (Punkt-Schreibweise)
- [ ] `data-item-url` = volle Live-URL der jeweiligen Produktseite
- [ ] Stripe verbunden, Test-Bestellung erfolgreich
- [ ] sevDesk-Automatik getestet (eine Testrechnung geprüft)
- [ ] Datenschutzerklärung final ausgefüllt (inkl. Snipcart/Stripe/sevDesk/Brevo +
      AVV-Verträge; Kindername als Verarbeitungszweck) — vom Anwalt/abmahnsicheren Anbieter
- [ ] 2-Faktor-Login bei Snipcart, Stripe, sevDesk, Netlify aktiviert

## Datenschutz-Hinweis (wichtig)
Snipcart und Stripe laden von externen Servern (cdn.snipcart.com / stripe.com). Da der
Warenkorb eine **technisch notwendige** Funktion des Shops ist, darf er ohne Cookie-Consent
laufen — er ist kein Tracking. Trotzdem gehören alle vier Dienste in die
Datenschutzerklärung, und du brauchst je einen **Auftragsverarbeitungsvertrag (AVV)**.
Der Kindername ist ein personenbezogenes Datum (Kind) → Zweck „Personalisierung/Druck",
Rechtsgrundlage „Vertragserfüllung", mit Speicherdauer in die Datenschutzerklärung.
