# E-Mail-Adresse für die eigene Domain — Zoho Mail Forever Free

**Ziel:** `post@popcornundfreddy.at` — empfangen *und* senden, dauerhaft
kostenlos, mit der Domain, die bei Cloudflare liegt.

---

## Warum Zoho

Ein kostenloses Postfach auf der eigenen Domain gibt es fast nirgends. Die
meisten Gratis-Angebote — auch Cloudflares Email Routing — können nur
**weiterleiten**: Kundenmails an `post@` landen in deinem privaten Gmail, aber
sobald du antwortest, sieht der Kunde deine private Adresse. Für einen Shop mit
Impressumspflicht ist das keine Lösung.

Zoho Mail ist der einzige größere Anbieter mit einem echten Gratis-Tarif für
eigene Domains. Senden inklusive.

**Was du bekommst**

- eigenes Postfach `post@popcornundfreddy.at`, senden und empfangen
- bis zu 5 Nutzer, dazu beliebig viele Aliase (`info@`, `bestellung@`,
  `datenschutz@`) — Aliase zählen nicht gegen das Limit
- 5 GB pro Postfach, 25 MB pro Anhang
- werbefrei, europäisches Rechenzentrum wählbar

**Was fehlt**

- **kein IMAP/POP.** Du liest deine Mails in Zohos Weboberfläche oder deren
  Handy-App — nicht in Apple Mail, nicht in Outlook, nicht in Gmail. Das ist
  die eine echte Einschränkung. Der Lite-Tarif (rund 1 $/Nutzer/Monat) schaltet
  es frei, falls es dich später stört.
- 5 GB füllen sich mit den Jahren. Umziehen geht jederzeit.

> **Bevor du anfängst:** Eine Domain kann nur *einen* Satz MX-Einträge haben.
> Falls bei Cloudflare schon MX-Einträge stehen (vom Domain-Kauf oder von
> Email Routing), müssen die weg — Schritt 4 sagt, wo.

Rechne mit 30 Minuten. Zwischendurch brauchen DNS-Einträge ein paar Minuten,
bis Zoho sie sieht.

---

## 1 · Konto anlegen

1. [zoho.com/mail](https://www.zoho.com/mail/) öffnen → **Pricing** / *Preise*.
2. **Bis unter die Bezahltarife scrollen.** Ganz unten steht der
   **Forever Free Plan** — er wird oben nicht beworben, man muss ihn suchen.
   → **Sign up**.
3. **„Sign up with a domain I already own"** wählen — *nicht* *Buy a new
   domain*. Dann `popcornundfreddy.at` eintragen (ohne `www.`, ohne `https://`).
4. **Data center / Region: Europa.** Wichtig für die DSGVO — und es entscheidet
   über alle Serveradressen weiter unten (`.eu` statt `.com`). Nachträglich
   lässt sich das nicht ändern.
5. Kontaktdaten und Passwort eintragen, Handynummer bestätigen (SMS-Code).

## 2 · Domain bestätigen

Zoho zeigt dir jetzt einen Bestätigungswert — je nach Konto ein CNAME oder ein
TXT-Eintrag. Wert kopieren, dann:

1. Zweiten Browser-Tab: [dash.cloudflare.com](https://dash.cloudflare.com) →
   deine Domain anklicken → linke Navigation **DNS → Records**.
2. **Add record**, genau das eintragen, was Zoho anzeigt:

   | Feld | Wert |
   |---|---|
   | Type | `TXT` (oder `CNAME`, je nach Anzeige) |
   | Name | `@` bzw. der von Zoho genannte Name |
   | Content | der kopierte Wert |
   | TTL | Auto |

3. **Save** → zurück im Zoho-Tab **Verify**. Meckert er, zwei Minuten warten
   und nochmal.

> Die orange Wolke (Proxy) gibt es bei TXT- und MX-Einträgen nicht — das ist
> richtig so. Nur A- und CNAME-Einträge lassen sich proxyen.

## 3 · Postfach anlegen

Zoho fragt direkt nach dem ersten Nutzernamen. `post` eintragen — daraus wird
`post@popcornundfreddy.at`, deine Hauptadresse.

Weitere Adressen später:

- **Admin Console → Users** → neuer Nutzer (bis 5, jeweils eigenes Postfach)
- oder **Users → \[Nutzer\] → Mail Accounts → Email Alias** → `info` eintragen.
  Landet im selben Posteingang, zählt nicht gegen das 5er-Limit. Für `info@`,
  `bestellung@` und `datenschutz@` ist das der richtige Weg.

## 4 · MX-Einträge setzen (damit Post ankommt)

Die MX-Einträge sagen der Welt, welcher Server die Mails für deine Domain
annimmt.

**Erst aufräumen:** Cloudflare → **DNS → Records** → alle vorhandenen Einträge
vom Typ **MX** löschen. Zwei konkurrierende MX-Sätze bedeuten verlorene Mails.

Dann drei neue anlegen (**Add record**, dreimal):

| Type | Name | Mail server | Priority |
|---|---|---|---|
| MX | `@` | `mx.zoho.eu` | `10` |
| MX | `@` | `mx2.zoho.eu` | `20` |
| MX | `@` | `mx3.zoho.eu` | `50` |

> Diese `.eu`-Adressen gelten für das europäische Rechenzentrum aus Schritt 1.
> Zoho zeigt dir während der Einrichtung die für dein Konto gültigen Werte an —
> **die zählen**, falls sie von der Tabelle abweichen.

## 5 · SPF — damit deine Mails nicht im Spam landen

SPF sagt: „Nur diese Server dürfen in meinem Namen senden."

Cloudflare → **Add record**:

| Feld | Wert |
|---|---|
| Type | `TXT` |
| Name | `@` |
| Content | `v=spf1 include:zohomail.eu ~all` |

**Nur ein einziger SPF-Eintrag pro Domain.** Existiert schon einer, den
vorhandenen *bearbeiten* und `include:zohomail.eu` ergänzen — nicht einen
zweiten anlegen, das macht SPF ungültig.

## 6 · DKIM — die digitale Unterschrift

1. Zoho **Admin Console** → **Domains** → deine Domain → **Email Configuration
   → DKIM** → **Add**.
2. Selector: `zmail` → **Generate**.
3. Zoho zeigt einen langen Wert an (`v=DKIM1; k=rsa; p=…`). Kopieren.
4. Cloudflare → **Add record**:

   | Feld | Wert |
   |---|---|
   | Type | `TXT` |
   | Name | `zmail._domainkey` |
   | Content | der lange Wert von Zoho |

5. Zurück bei Zoho: **Verify**.

## 7 · DMARC — die Regel für den Ernstfall

Cloudflare → **Add record**:

| Feld | Wert |
|---|---|
| Type | `TXT` |
| Name | `_dmarc` |
| Content | `v=DMARC1; p=none; rua=mailto:post@popcornundfreddy.at` |

`p=none` heißt: nur beobachten, nichts blockieren. So startet man. Wenn nach
ein paar Wochen alles sauber läuft, kannst du auf `p=quarantine` erhöhen.

## 8 · Testen

1. [mail.zoho.eu](https://mail.zoho.eu) öffnen, anmelden.
2. Von deiner privaten Adresse eine Mail an `post@popcornundfreddy.at` →
   muss binnen einer Minute in Zoho liegen.
3. Aus Zoho zurück antworten → beim Empfänger muss `post@popcornundfreddy.at`
   als Absender stehen.
4. Gegencheck: [mxtoolbox.com](https://mxtoolbox.com) → Domain eingeben →
   MX, SPF, DKIM und DMARC sollten grün sein.
5. Die Handy-App installieren (*Zoho Mail*, iOS/Android) — ohne IMAP ist sie
   dein mobiler Zugang.

---

## Was das für den Newsletter bedeutet

Zwei Dinge, die gern verwechselt werden:

- **Diese Anleitung** regelt dein *Postfach* — Mails, die du persönlich liest
  und schreibst.
- **Klaviyo** verschickt den Newsletter über eigene Server. Dafür kommen
  später **zusätzliche** DNS-Einträge dazu (Klaviyos *sending domain*, meist
  zwei CNAMEs). Die stehen neben den Zoho-Einträgen, sie ersetzen sie nicht.
  Klaviyo führt dich unter **Settings → Domains** durch.

Erst wenn beides steht, kommt in Klaviyo als Absender
`post@popcornundfreddy.at` statt einer generischen Adresse — und genau das
entscheidet, ob deine Willkommensmails im Posteingang oder im Spam landen.

---

## Anhang · Die beiden Alternativen

Falls Zoho doch nicht passt:

**Google Workspace** — ab 6,80 €/Nutzer/Monat. Der Weg, wenn du in der
gewohnten Gmail-Oberfläche bleiben willst: 30 GB, IMAP, Apple Mail und Outlook,
30 kostenlose Aliase. Setup ist identisch aufgebaut, nur mit anderen Werten:
ein einziger MX-Eintrag auf `smtp.google.com` (Priority 1), SPF
`v=spf1 include:_spf.google.com ~all`, DKIM unter **Admin → Apps → Google
Workspace → Gmail → E-Mail authentifizieren** mit dem Namen `google._domainkey`.

**Cloudflare Email Routing** — kostenlos, aber **nur empfangen**. Cloudflare →
Domain → **E-Mail → Email Routing** → **Get started** → Zieladresse (dein
privates Gmail) eintragen und per Link bestätigen → Custom address `post`
anlegen → Cloudflare setzt die MX-Einträge selbst. Antwortest du, steht deine
private Adresse drauf. Als Zwischenlösung tragbar, dauerhaft nicht.
