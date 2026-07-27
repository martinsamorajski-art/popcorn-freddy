# Selbst-gehostete Schriften (DSGVO)

Die Website lädt **keine** Schriften mehr von Google (`fonts.googleapis.com` /
`fonts.gstatic.com`). Alle `@font-face`-Regeln stehen in `rd-styles.css` und
verweisen auf lokale WOFF2-Dateien in **diesem Ordner** (`assets/fonts/`).

## Was noch zu tun ist (einmalig)

Lege die folgenden **14 WOFF2-Dateien** mit **exakt diesen Dateinamen** hier ab.
Erst dann rendern die Schriften in der gewünschten Familie; bis dahin greift der
Fallback (Georgia / system-ui), die Seite bleibt voll funktionsfähig.

| Datei | Familie | Schnitt |
|---|---|---|
| `young-serif-400.woff2` | Young Serif | 400 |
| `alegreya-400.woff2` | Alegreya | 400 |
| `alegreya-500.woff2` | Alegreya | 500 |
| `alegreya-600.woff2` | Alegreya | 600 |
| `alegreya-700.woff2` | Alegreya | 700 |
| `alegreya-400-italic.woff2` | Alegreya | 400 kursiv |
| `alegreya-500-italic.woff2` | Alegreya | 500 kursiv |
| `alegreya-600-italic.woff2` | Alegreya | 600 kursiv |
| `alegreya-sans-400.woff2` | Alegreya Sans | 400 |
| `alegreya-sans-500.woff2` | Alegreya Sans | 500 |
| `alegreya-sans-700.woff2` | Alegreya Sans | 700 |
| `alegreya-sans-800.woff2` | Alegreya Sans | 800 |
| `caveat-400.woff2` | Caveat | 400 |
| `caveat-600.woff2` | Caveat | 600 |

## Woher bekomme ich die Dateien?

Alle vier Familien stehen unter der **SIL Open Font License** und dürfen frei
selbst gehostet werden:

- **Young Serif** — github.com/noahtidwell/youngserif (bzw. Google Fonts)
- **Alegreya** & **Alegreya Sans** — Huerta Tipográfica / Google Fonts
- **Caveat** — Impallari Type / Google Fonts

Bequemster Weg: **google-webfonts-helper** (gwfh.mranftl.com) — Familie und
Schnitte wählen, „woff2" + „Modern Browsers" exportieren, Dateien hier
ablegen und auf die obigen Namen umbenennen. Die OFL-Lizenztexte bitte mit
ausliefern (z. B. `OFL.txt` je Familie).

> Hinweis: Diese Binärdateien konnten nicht automatisch erzeugt werden — der
> restliche Code (HTML/CSS) ist bereits vollständig auf lokale Einbindung
> umgestellt und enthält keine externen Font-Requests mehr.
