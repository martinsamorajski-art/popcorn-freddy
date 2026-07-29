# Newsletter + 10 % Willkommensrabatt — Schritt für Schritt

**Dienst:** Klaviyo · **Rabatt:** einmaliger, persönlicher Code, 10 % auf die
erste Box, kein Mindestbestellwert · **Sprachen:** Deutsch + Englisch, je
eigene Liste · **Flow:** 4 E-Mails · **Tracking:** Öffnungen, Klicks und wer
den Code tatsächlich eingelöst hat.

Was schon gebaut ist:

| Datei | Aufgabe |
|---|---|
| `functions/api/newsletter.js` | Nimmt die Anmeldung an, hält den Klaviyo-Key geheim, wählt die Sprachliste |
| `pf-newsletter.js` | `PFNews.subscribe()` — eine Stelle für alle Formulare |
| `rd-close.jsx` | Footer-Formular schickt jetzt echt ab (mit Honeypot gegen Bots) |
| `rd-news-popup.jsx` | Das gestaltete Pop-up auf der Startseite |

---

## 0 · Erst die Orientierung: wo liegt was in Klaviyo?

Klaviyo hat **drei verschiedene Orte, an denen man E-Mails baut**. Das ist die
Hauptquelle der Verwirrung. Kurz und klar:

| Ort in der linken Navigation | Wofür | Brauchen wir? |
|---|---|---|
| **Content → Templates** | Vorlagen-Bibliothek. Hier liegt HTML herum, das man später *auswählen* kann. Verschickt nichts. | **Ja** — hier landen unsere HTML-Dateien |
| **Flows** | Automatische E-Mail-Serien. Jede E-Mail wird **im Flow selbst** erstellt und wählt sich beim Anlegen eine Vorlage aus. | **Ja** — die 4 Willkommens-Mails |
| **Audience → Lists & segments → \[Liste\] → Settings** | Hier – und **nur** hier – lebt die Double-Opt-in-Bestätigungsmail. Sie ist eine Listen-Einstellung, kein Flow und keine Kampagne. | **Ja** — Mail 0 |
| **Campaigns** | Einmalige Newsletter-Aussendungen von Hand. | Später, für den echten Newsletter |
| **Signup forms** | Klaviyos eigene Pop-ups und Formulare. | **Nein — komplett ignorieren.** Wir haben ein eigenes Formular und ein eigenes Pop-up auf der Website. Wenn du hier etwas anlegst, hast du zwei Formulare, die sich gegenseitig überlagern. |

„Composer" heißt bei Klaviyo der Editor, der aufgeht, *nachdem* du eine E-Mail
angelegt hast — er ist kein eigener Menüpunkt. Er hat zwei Modi:
**Drag-and-drop** (Bausteine ziehen) und **HTML** (Code einfügen). Wir nutzen
HTML, weil unsere Vorlagen schon fertig gestaltet sind. **Wichtig: der Modus
wird beim Anlegen gewählt und lässt sich danach nicht mehr umschalten.**

> Klaviyo benennt Menüpunkte gelegentlich um. Wenn ein Name unten nicht exakt
> passt, suche das Wort in der Klaviyo-Suche oben — die Reihenfolge der
> Schritte bleibt gleich.

## 1 · Klaviyo-Konto anlegen

1. [klaviyo.com](https://www.klaviyo.com) → Sign up. Kostenlos bis 250 Kontakte
   und 500 E-Mails im Monat.
2. Bei **Company details** die echte Firmenadresse eintragen — sie steht per
   Gesetz in jeder E-Mail-Fußzeile.
3. **Settings → Account → Data residency:** **EU** wählen. Das geht nur beim
   Anlegen, nachträglich nicht mehr — wichtig für die DSGVO.

## 2 · Shopify verbinden

1. In Klaviyo: **Integrations → Add integration → Shopify**.
2. Shop-Domain eintragen, Rechte bestätigen.
3. **Onsite tracking NICHT aktivieren.** Klaviyos JavaScript wird auf der
   Website nicht geladen — die Anmeldung läuft über unser eigenes Formular.
   Die Integration wird nur für Bestelldaten und Rabattcodes gebraucht.
4. Warten, bis der erste Sync durch ist (Bestellungen erscheinen unter
   **Analytics → Metrics → Placed Order**).

## 3 · Zwei Listen anlegen

**Audience → Lists & segments → Create list.**

| Name | Zweck |
|---|---|
| `Reisepost (Deutsch)` | alle deutschen Locales (`/at`, `/de`, `/ch`) |
| `Travel Post (English)` | alle englischen Locales (`/at-en`, `/de-en`, `/ch-en`, `/us`) |

Zwei Listen, weil Klaviyos Bestätigungsmail eine **Listen-Einstellung mit nur
einem Template** ist. Eine Liste = eine Sprache der Bestätigungsmail.

Double Opt-in und die Bestätigungsmail kommen in **Schritt 6b** — dort steht
genau, wo der Schalter sitzt.

**Die List-ID finden:** Liste öffnen → Reiter **Settings** → ganz oben steht
`List ID` (sechs Zeichen, z. B. `XkP2mQ`). Alternativ aus der Adresszeile des
Browsers: `…/list/XkP2mQ/…`. Beide IDs notieren, sie kommen in Schritt 5.

## 4 · Private API-Key erzeugen

**Settings → Account → API keys → Create private key.**

- Name: `Website Signup`
- Rechte: **Profiles: Write** und **Lists: Write** — nichts weiter.
- Der Key beginnt mit `pk_`. Er wird nur einmal gezeigt.

> Dieser Key darf nie in eine Website-Datei. Er lebt ausschließlich in
> Cloudflare als Umgebungsvariable.

## 5 · Cloudflare-Variablen setzen

**Cloudflare → Pages-Projekt → Settings → Variables and Secrets.**
Jede Variable zu **Production UND Preview** hinzufügen, dann neu deployen.

| Name | Wert | Typ |
|---|---|---|
| `KLAVIYO_PRIVATE_KEY` | `pk_…` | Secret |
| `KLAVIYO_LIST_DE` | List-ID der deutschen Liste | Text |
| `KLAVIYO_LIST_EN` | List-ID der englischen Liste | Text |

Solange die Variablen fehlen, antwortet `/api/newsletter` mit
`not_configured` und das Formular zeigt eine Fehlermeldung — es behauptet
nie, jemand sei angemeldet.

## 6 · Die E-Mail-Vorlagen einsetzen

### 6a · HTML als Vorlage ablegen (einmal pro Sprache)

1. Linke Navigation: **Content → Templates**.
2. Oben rechts **Create template**.
3. Es erscheint eine Auswahl. Nimm **Start from scratch**, und dort die Kachel
   **HTML** (nicht *Drag and drop*, nicht *Saved templates*). Je nach
   Kontoversion heißt sie *Code your own* oder *HTML editor* — gemeint ist
   dasselbe: ein leeres Code-Feld.
4. Links steht ab jetzt das Code-Feld, rechts die Live-Vorschau.
5. Den kompletten Inhalt der HTML-Datei markieren (Strg/Cmd + A), kopieren, im
   Code-Feld den vorhandenen Beispielcode löschen und einfügen.
6. Oben links den Namen vergeben, z. B. `Bestätigung DE`. **Save** oben rechts.

Das gleiche für jede Datei. Die zehn Vorlagen liegen fertig im Projekt:

| Datei im Projekt | Name in Klaviyo | Wo sie eingesetzt wird |
|---|---|---|
| `Newsletter-Bestaetigungsmail.html` | `Bestätigung DE` | Schritt 6b, Liste DE |
| `Newsletter-Bestaetigungsmail-EN.html` | `Bestätigung EN` | Schritt 6b, Liste EN |
| `Newsletter-1-Willkommen-DE.html` | `Willkommen + Code DE` | Flow DE, E-Mail 1 |
| `Newsletter-1-Willkommen-EN.html` | `Willkommen + Code EN` | Flow EN, E-Mail 1 |
| `Newsletter-2-Geschichte-DE.html` | `Popcorn & Freddy DE` | Flow DE, E-Mail 2 |
| `Newsletter-2-Geschichte-EN.html` | `Popcorn & Freddy EN` | Flow EN, E-Mail 2 |
| `Newsletter-3-Box-DE.html` | `In der Box DE` | Flow DE, E-Mail 3 |
| `Newsletter-3-Box-EN.html` | `In der Box EN` | Flow EN, E-Mail 3 |
| `Newsletter-4-Erinnerung-DE.html` | `Erinnerung DE` | Flow DE, E-Mail 4 |
| `Newsletter-4-Erinnerung-EN.html` | `Erinnerung EN` | Flow EN, E-Mail 4 |

In **allen zehn** sind vor dem Hochladen dieselben Platzhalter zu ersetzen:
`[Firmenname]`, `[Anschrift]`, `[E-Mail-Adresse]` und `[URL]` (deine Domain,
ohne Schrägstrich am Ende). Am schnellsten mit Suchen-und-Ersetzen im Editor,
bevor du den Code kopierst.

Die Rabattcode-Variable `{% coupon_code 'Welcome10' %}` steckt bereits in
`Newsletter-1-Willkommen-*` und `Newsletter-4-Erinnerung-*` — sie funktioniert
erst, wenn der Coupon aus Schritt 7 exakt `Welcome10` heißt.

> Eine Vorlage in *Templates* verschickt nichts. Sie ist nur der Vorrat, aus
> dem Flows und die Bestätigungsmail sich bedienen.

### 6b · Die Bestätigungsmail (Double Opt-in) einrichten

Diese E-Mail liegt **nicht** bei Templates und **nicht** in einem Flow:

1. **Audience → Lists & segments** → auf die Liste `Reisepost (Deutsch)` klicken.
2. Oben auf den Reiter **Settings** (neben *Members*).
3. Abschnitt **Opt-in process** → **Double opt-in** auswählen → **Update settings**.
4. Jetzt erscheint darunter der Link **Edit confirmation email** (teils
   *Customize opt-in email*). Anklicken — der Composer geht auf.
5. Beim ersten Mal fragt er nach einer Vorlage: **Saved templates** →
   `Bestätigung DE` auswählen.
6. Im Code den Platzhalter des Bestätigungslinks durch Klaviyos Variable
   ersetzen — der Button-Link muss exakt so lauten:

   ```
   {{ opt_in_link }}
   ```

7. Betreff und Absendername oben eintragen. **Save**.
8. Alles wiederholen für `Travel Post (English)` mit `Bestätigung EN`.

Der Rabattcode gehört **nicht** in diese Mail — erst in die Willkommensmail
(Schritt 8, E-Mail 1), sonst bekommt ihn auch, wer nie bestätigt.

### 6c · Was in jede E-Mail muss

Klaviyo prüft jede Vorlage beim Speichern und verweigert sie ohne
Abmeldelink. Es gibt zwei Wege:

**Bestätigungsmail (Double Opt-in):** Häkchen setzen bei *„Only check this box
if this template will be used for triggered emails which are not marketing
related"*. Die Bestätigungsmail ist keine Werbung, sondern die Antwort auf
eine Nutzerhandlung — ein Abmeldelink wäre dort auch unlogisch, weil die
Anmeldung erst mit dem Klick zustande kommt. Kein `{% unsubscribe %}` nötig.

**Alle vier Willkommens-Mails:** Häkchen **nicht** setzen — das ist Marketing.
Dort ist der Abmeldelink Pflicht, als `href` eines echten Links (als loser
Text akzeptiert Klaviyo ihn nicht):

```html
<a href="{% unsubscribe %}">Keine Reisepost mehr erhalten</a>
```

Das ist der Abmeldelink. Klaviyo setzt zusätzlich automatisch den
`List-Unsubscribe`-Header, den Gmail und Apple Mail als Ein-Klick-Abmeldung
anzeigen. Die Abmeldeseite lässt sich unter **Settings → Email → Subscribe
pages** an das Design anpassen.

## 7 · Den Rabattcode anlegen (einmalig, persönlich)

Klaviyo erzeugt pro Empfänger einen eigenen Code. **In Shopify ist dafür
nichts vorzubereiten** — Klaviyo legt den Rabatt dort selbst an. (Die alte
Route über eine Shopify-*Preisregel*, die man in Klaviyo auswählt, gibt es
nicht mehr.)

**Voraussetzung:** Die Shopify-Integration aus Schritt 2 muss verbunden sein
und das Recht haben, Rabatte anzulegen. Wenn unten der Speichern-Button
meckert oder gar keine Coupon-Option erscheint: **Integrations → Shopify →
Reauthorize** — bei älteren Verbindungen fehlt die Rabatt-Berechtigung.

**In Klaviyo:**

1. Linke Navigation: **Content → Coupons** (bei manchen Konten unter
   *Content* zusammen mit *Templates* und *Images*).
2. Oben rechts **Create coupon**.
3. Ausfüllen:

   | Feld | Wert |
   |---|---|
   | Coupon name | `Welcome10` — **exakt so**, die Vorlagen greifen darauf zu |
   | Code prefix | `POPCORN-` |
   | Discount type | Percentage |
   | Discount value | `10` |
   | Applies to | Entire order / All products |
   | Minimum purchase | keiner |
   | Usage limit | **Limit to one use per customer** |
   | Expiration | kein Ablaufdatum (deine Entscheidung) |

4. **Save**. Klaviyo legt den Rabatt jetzt in Shopify an — unter
   **Shopify → Discounts** taucht ein automatisch erzeugter Eintrag auf. Den
   nicht von Hand bearbeiten oder löschen, sonst brechen die Codes.

Ab jetzt setzt `{% coupon_code 'Welcome10' %}` in jeder E-Mail einen eigenen
Code pro Empfänger ein, z. B. `POPCORN-A7K2QX`. Der Tag steckt bereits in
`Newsletter-1-Willkommen-*` und `Newsletter-4-Erinnerung-*`.

> Heißt der Coupon anders als `Welcome10`, musst du den Namen in allen vier
> Vorlagen ändern — sonst rendert Klaviyo eine leere Stelle.

## 8 · Der Willkommens-Flow (4 E-Mails)

### 8a · Flow anlegen

1. **Flows** → oben rechts **Create flow** → **Build your own** /
   *Start from scratch*.
2. Name: `Willkommen DE`. **Create**.
3. Es öffnet sich die Flow-Leinwand mit einem leeren Trigger-Kästchen oben.
   Links in der Seitenleiste **Trigger → List** wählen und die Liste
   `Reisepost (Deutsch)` auswählen.
4. Im selben Panel **Trigger filters → Add filter** →
   *has been in list `Reisepost (Deutsch)` at least once* → **Save**.
   Das verhindert, dass jemand die Serie bei erneuter Anmeldung zweimal bekommt.
5. Ebenfalls im Trigger-Panel: **No re-entry** ankreuzen
   (*„Profiles will only enter once, even if trigger conditions are met again"*).
   Sonst kann sich jemand abmelden, neu anmelden und bekommt einen zweiten
   frischen 10 %-Code. Der Filter aus Punkt 4 greift bei Doppelanmeldungen
   innerhalb derselben Mitgliedschaft, *No re-entry* bei einer komplett neuen —
   beides setzen.

### 8b · Die E-Mails einhängen

Aus der linken Seitenleiste zieht man Bausteine auf die Leinwand:
**Email** (die E-Mail) und **Time delay** (die Wartezeit) — abwechselnd, in
der Reihenfolge der Tabelle unten.

> **Vor E-Mail 1 kommt kein Delay.** Bei Double Opt-in landet das Profil erst
> *nach* dem Klick auf den Bestätigungslink in der Liste — vorher ist es
> *pending* und kein Mitglied. Der Flow startet also von sich aus erst nach
> der Bestätigung; wer nie klickt, bekommt nie eine Flow-Mail. Eine
> Wartezeit dafür einzubauen wäre doppelt gemoppelt.

Jede E-Mail dann anklicken → rechts **Edit content** (oder *Configure content*):

- Reiter **Saved templates** → die passende Vorlage aus Schritt 6a auswählen.
- **Subject line** und **Preview text** oben ausfüllen.
- **Save & exit**, dann oben rechts den Status der E-Mail von *Draft* auf
  **Live** stellen — sonst wird sie übersprungen.

Zum Schluss den ganzen Flow oben rechts von *Draft* auf **Live** schalten.

### 8c · Betreffzeilen und Preview-Text

Der **Preview text** ist die graue Zeile, die im Posteingang hinter dem
Betreff steht. Lässt man sie leer, zieht sich der Client die ersten Wörter aus
der E-Mail — meist unschön. Immer ausfüllen, sie soll den Betreff *ergänzen*,
nicht wiederholen.

**Deutsch**

| E-Mail | Betreff | Preview text |
|---|---|---|
| Bestätigung | Nur noch ein Klick | Bitte bestätige kurz deine E-Mail-Adresse. |
| 1 · Willkommen + Code | Willkommen — hier sind eure 10 % | Euer persönlicher Code für das erste Kapitel. |
| 2 · Popcorn & Freddy | Ein Bär, ein Fuchs und eine Schatzkarte | Wie das Abenteuer entstanden ist. |
| 3 · In der Box | Was euch in der Box erwartet | Mappe, Schatzkarte, Kapitel, Holzbausatz. |
| 4 · Erinnerung | Der Code wartet noch auf euch | 10 % auf die erste Box — noch nicht eingelöst. |

**Englisch**

| E-Mail | Betreff | Preview text |
|---|---|---|
| Bestätigung | One more click | Please confirm your email address. |
| 1 · Willkommen + Code | Welcome — here is your 10 % | Your personal code for the first chapter. |
| 2 · Popcorn & Freddy | A bear, a fox and a treasure map | How the adventure came to be. |
| 3 · In der Box | What awaits you in the box | Folder, treasure map, chapter, wooden kit. |
| 4 · Erinnerung | Your code is still waiting | 10 % off the first box — not used yet. |

**Absendername** überall gleich: `Popcorn & Freddy`, Absenderadresse z. B.
`post@popcornundfreddy.at`. Konsistenz hilft der Zustellbarkeit — wechselnde
Absender landen schneller im Spam.


| # | Wartezeit | Inhalt |
|---|---|---|
| 1 | sofort | Willkommen + **der Rabattcode**. Ein klarer Button auf die Kapitel-Seite |
| 2 | 3 Tage | Die Geschichte von Popcorn & Freddy — warum es die Box gibt, Bilder aus der Werkstatt. Kein Verkauf |
| 3 | 3 Tage | Was in der Box steckt: Holzbausatz, Karte, Kapitel. Der Code wird kurz erwähnt |
| 4 | 4 Tage | Freundliche Erinnerung, nur wenn der Code noch nicht eingelöst ist |

Bei E-Mail 4 muss ein **Conditional split** davor:
Baustein *Conditional split* aus der Seitenleiste über E-Mail 4 ziehen →
Bedingung **What someone has done → Placed Order → zero times → since
starting this flow** → **Save**. Die Leinwand teilt sich in **YES** und **NO**.
E-Mail 4 gehört in den **YES**-Zweig („Noch nicht bestellt"). Der NO-Zweig
bleibt leer — wer schon bestellt hat, bekommt keine Erinnerung.

Die englische Serie: Flow-Übersicht → die drei Punkte neben `Willkommen DE`
→ **Clone**. Im Klon den Trigger auf `Travel Post (English)` umstellen und in
jeder E-Mail unter *Edit content* die englische Vorlage wählen. Die Sprache
steht zusätzlich als Profil-Eigenschaft `language` bereit, falls du später in
einem einzigen Flow verzweigen willst.

## 9 · Einlösungen sehen

- **Flows → dein Flow → Analytics:** Öffnungen, Klicks, *Placed Order* und
  Umsatz pro E-Mail.
- Wer den Code benutzt hat: **Shopify → Discounts →** der von Klaviyo
  angelegte `POPCORN-`-Eintrag → Liste der Bestellungen. Der eingelöste Code
  steht auf der Bestellung.
- Pro Person: in Klaviyo das Profil öffnen → *Activity feed* zeigt
  Anmeldung, jede E-Mail und die Bestellung in einer Zeitleiste.

## 10 · Testen

1. Startseite öffnen, ganz nach unten, echte E-Mail-Adresse eintragen.
2. Bestätigungsmail muss binnen einer Minute kommen → Link klicken.
3. In Klaviyo prüfen: Profil liegt in der **richtigen** Liste, Eigenschaften
   `language`, `country`, `signup_source: footer` sind gesetzt.
4. E-Mail 1 kommt an, Code kopieren, im Checkout einlösen → 10 % weniger.
5. Auf `/at-en/` mit einer zweiten Adresse wiederholen → englische Liste,
   `signup_source: popup` wenn über das Pop-up.
6. Abmeldelink klicken → Profil steht auf *Unsubscribed*.

---

## Das Pop-up

Erscheint auf der Startseite nach **14 Sekunden** oder bei **halber
Scroll-Tiefe** — je nachdem, was zuerst kommt. Es zeigt sich nie,

- wenn dieser Browser schon angemeldet ist,
- wenn gerade der Land- oder Sprach-Hinweis unten links steht,
- 30 Tage lang nach einem Wegklicken.

Ändern in `rd-news-popup.jsx`, ganz oben: `RD_NEWSPOP_DELAY` (Millisekunden),
`RD_NEWSPOP_SCROLL` (0–1), `RD_NEWSPOP_SNOOZE` (Millisekunden).

## Rechtliches (Österreich/EU)

- **Double Opt-in ist Pflicht** (DSGVO Art. 6 Abs. 1 lit. a, TKG § 174) — in
  Schritt 3 aktiviert.
- Die Einwilligung muss **nachweisbar** sein: Klaviyo speichert Zeitpunkt und
  Methode automatisch pro Profil.
- **Abmeldelink in jeder E-Mail** — `{% unsubscribe %}`, Schritt 6.
- **Impressum** in die E-Mail-Fußzeile: Firmenname, Adresse, Kontakt.
- Die Datenschutzerklärung sollte Klaviyo als Auftragsverarbeiter nennen
  (`Datenschutz.html`) — sag Bescheid, dann formuliere ich den Absatz.
