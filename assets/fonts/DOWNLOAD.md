# Schriftdateien selbst hosten (WOFF2)

Die Website lädt **keine** Schriften mehr von Google (`fonts.googleapis.com` /
`fonts.gstatic.com`). Alle `@font-face`-Regeln stehen in `assets/fonts.css` und
verweisen auf lokale WOFF2-Dateien in **diesem Ordner** (`assets/fonts/`).

Damit die Marken-Schriften angezeigt werden (statt der System-Serif-Fallbacks),
müssen die WOFF2-Dateien hier abgelegt werden — **einmalig**, danach nie wieder.

## Woher

Alle Familien sind Open-Source (SIL Open Font License) und legal selbst
hostbar. Bequemste Quelle:

**google-webfonts-helper** → https://gwfh.mranftl.com/fonts
1. Familie suchen (z. B. „Alegreya"), Zeichensatz **latin** wählen.
2. Die unten gelisteten Schnitte (Styles/Weights) ankreuzen.
3. Format **woff2** wählen, „Download files" → ZIP entpacken.
4. Dateien in **diesen Ordner** legen und exakt wie unten umbenennen.

(Alternativ Fontsource: https://fontsource.org — gleiche Dateien.)

## Benötigte Dateien (exakter Name → Familie / Schnitt)

### Hauptset (alle Seiten außer Sticker-Version)
| Dateiname                          | Familie        | Weight | Style   |
|------------------------------------|----------------|--------|---------|
| YoungSerif-Regular.woff2           | Young Serif    | 400    | normal  |
| Alegreya-Regular.woff2             | Alegreya       | 400    | normal  |
| Alegreya-Medium.woff2              | Alegreya       | 500    | normal  |
| Alegreya-SemiBold.woff2            | Alegreya       | 600    | normal  |
| Alegreya-Bold.woff2                | Alegreya       | 700    | normal  |
| Alegreya-Italic.woff2              | Alegreya       | 400    | italic  |
| Alegreya-MediumItalic.woff2        | Alegreya       | 500    | italic  |
| Alegreya-SemiBoldItalic.woff2      | Alegreya       | 600    | italic  |
| AlegreyaSans-Regular.woff2         | Alegreya Sans  | 400    | normal  |
| AlegreyaSans-Medium.woff2          | Alegreya Sans  | 500    | normal  |
| AlegreyaSans-Bold.woff2            | Alegreya Sans  | 700    | normal  |
| AlegreyaSans-ExtraBold.woff2       | Alegreya Sans  | 800    | normal  |
| Caveat-Regular.woff2               | Caveat         | 400    | normal  |
| Caveat-SemiBold.woff2              | Caveat         | 600    | normal  |

### Sticker-Version ("Popcorn in Box")
| Dateiname                          | Familie          | Weight | Style  |
|------------------------------------|------------------|--------|--------|
| CaveatBrush-Regular.woff2          | Caveat Brush     | 400    | normal |
| PatrickHand-Regular.woff2          | Patrick Hand     | 400    | normal |
| PatrickHandSC-Regular.woff2        | Patrick Hand SC  | 400    | normal |
| Nunito-Light.woff2                 | Nunito           | 300    | normal |
| Nunito-Regular.woff2               | Nunito           | 400    | normal |
| Nunito-Medium.woff2                | Nunito           | 500    | normal |
| Nunito-SemiBold.woff2              | Nunito           | 600    | normal |
| Nunito-Bold.woff2                  | Nunito           | 700    | normal |
| Nunito-ExtraBold.woff2             | Nunito           | 800    | normal |
| Gloock-Regular.woff2               | Gloock           | 400    | normal |

## Prüfen

Nach dem Ablegen: Seite neu laden. Im Browser-Netzwerk-Tab darf **kein** Request
an `fonts.googleapis.com` oder `fonts.gstatic.com` erscheinen — nur lokale
`assets/fonts/*.woff2`. Fehlt eine Datei, fällt nur dieser eine Schnitt auf die
System-Serif zurück; es entsteht **kein** externer Request.
