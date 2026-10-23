---
status: snapshot
last_review: 2026-10-23
canonical_for: Designsystem-Abgleich Startseite, AGE&DNA-PDP, NMN-PDP (Entwurf 23.10.)
---

# Designsystem-Abgleich der drei Seiten (Entwurf 23.10.2026)

Branch `claude/designsystem-drei-seiten-a12e8a`, Vorschau-Theme **194006876535** („Claude Entwurf Designsystem 23.10.“):
https://lifetime-health-de.myshopify.com/?preview_theme_id=194006876535

Ausgangslage: Live-Stand der drei Templates am 23.10. gezogen und semantisch gegen HEAD verglichen, identisch. Sections, Snippets und Assets des Repos waren ebenfalls deckungsgleich mit Live. Das Vorschau-Theme ist also Live plus genau dieser Diff.

Gemessen per Skript im Browser (berechnete Styles), jeweils 375 und 1440 px, live und danach im Vorschau-Theme.

## Befund je Seite

### Startseite (`templates/index.json`)

| Punkt | Befund |
|---|---|
| Überschriften | Kapitel (Normbereich, Stimmen, Ablauf, Bereiche, Fragen) 28 px, mobil 24 px über lokales `--text-h2`. Hero 36. Video und Test 48/32 (dunkle Schaufenster), Schlussleiste 56/36 in LT Instrument Serif. Stimmig. |
| Schriften | Helvetica Neue für Überschriften, Lato für Text. Urbanist nur in den App-Glaskarten (Normbereich, gewollt: App-Schrift). Instrument Serif nur in `lt-leiste`. |
| Knöpfe | Pille, Teal `#364f56` primär, Papier auf Teal sekundär. Hero-Knopf 44 px hoch, 14 px/500; Test 52 px, Bereiche 48 px, beide 16 px/400. |
| Flächen | Papier `#f7f7f4` mit zwei Teal-Blöcken (Video, Test) und Teal-Schluss. Stimmen, Ablauf, Bereiche, Fragen liegen alle auf Papier, getrennt durch Haarlinien. |
| Karten | 16 px (`--radius-lg`), ohne Schatten. Presse-Kacheln 4 px. |
| Kontrast | Außerhalb von Fotoflächen kein Text unter AA. |
| Fehler | Kein horizontales Scrollen (375 und 1440), keine leeren Blöcke, keine Konsolenfehler. |

### AGE&DNA-PDP (`templates/product.age-dna-test.json`)

| Punkt | Befund |
|---|---|
| Überschriften | H1 33,75 mobil / 36 Desktop. Belege-Karten führen über 12-px-Labels. FAQ 28 px auch mobil, also größer als jede Kapitel-Überschrift der Startseite mobil (24). **Behoben.** |
| Flächen | Belege `#f2f1ed`, dann ein 104 px schmaler `#f7f7f4`-Streifen nur für die Loox-Lade, dann FAQ wieder `#f2f1ed`. Wirkte wie ein verirrtes Band. **Behoben** (NMN-Muster übernommen). |
| Knöpfe | Kaufknopf Pille 48 px, 15 px/500, normale Schreibung. Sticky-Knopf unten 44 px, aber **14 px/600 in Versalien** (Combine-`.button`). **Behoben.** |
| Kontrast | Streichpreis 449 € 2,3:1 (`del`-Dimmung 0.54 auf `--lt-muted`). **Behoben.** Sterne `#f4b740` 1,7:1, bleibt (Grafik, Wert steht als Zahl daneben). |
| Karten | 4 px, bewusst wie die Hero-Galerie (Kommentar in `lt-pdp-belege`). |
| Fehler | Kein horizontales Scrollen, keine Konsolenfehler. |

### NMN-PDP (`templates/product.nmn-pulver.json`)

| Punkt | Befund |
|---|---|
| Überschriften | wie AGE&DNA, FAQ mobil 28. **Behoben.** |
| Flächen | Belege, Loox-Lade und FAQ dreimal hintereinander `#f2f1ed`, FAQ ohne Absetzung. **Behoben.** |
| Kontrast | Abgewählte Größen-Pills mit `opacity: 0.6`: Größe 4,1:1, Preis 2,6:1. Grundpreiszeile „96,33 €/100 g“ Alpha 0.56, 3,6:1. Streichpreis wie AGE&DNA. **Alle behoben.** |
| Sticky-Knopf | Versalien wie AGE&DNA. **Behoben.** |
| Fehler | Kein horizontales Scrollen, keine Konsolenfehler. |

## Was geändert ist

| Datei | Änderung |
|---|---|
| `templates/product.age-dna-test.json` | Belege `padding_bottom` 32 → 16, Loox-Lade `color_bg` `#f7f7f4` → `#f2f1ed` und `max_width` 960 (genau wie NMN: Lade sitzt unter den Belege-Karten auf derselben Fläche). FAQ `color_bg` → `#f7f7f4`. |
| `templates/product.nmn-pulver.json` | FAQ `color_bg` `#f2f1ed` → `#f7f7f4`. Beide PDPs laufen jetzt Hero hell, Belege+Lade warm, FAQ hell. |
| `sections/crs-faq-accordion.liquid` | Mobil unter 860 px `--text-h2: 24px`, dieselbe Regel wie in den fünf `lt-hp-*`-Kapiteln. Wirkt auf jede PDP mit FAQ auf Stufe `feature`, Desktop bleibt 28. |
| `sections/lt-pdp-hero.liquid` | Größen-Pills: `opacity: 0.6` raus, Hover über Rahmenfarbe (Muster der Kaufoptionen-Karten im selben File). Grundpreiszeile Alpha 0.56 → 0.72. Sticky-Knopf `text-transform: none`, `letter-spacing: normal`, Gewicht 500 wie der Hero-Knopf. |
| `assets/lt-pdp.css` | `.lt-price-row__compare` `opacity: 1` (hebt die theme-weite `del`-Dimmung nur hier auf, wie schon bei `.lt-bb-card__compare`). |

## Bewusst offen

- **Startseite: vier Papier-Sections in Folge** (Stimmen, Ablauf, Bereiche, Fragen). Verstößt gegen die Wechsel-Regel aus der Flächenpalette, ist aber im Umbau vom 22.10. hart im CSS gesetzt (`background: var(--color-paper)`, kein `color_bg`-Setting) und mit Haarlinien getrennt. Sieht nach Absicht aus („ein Blatt“), deshalb nicht angefasst. Falls doch gewünscht: `lt-hp-ablauf` und `lt-hp-fragen` auf `#f2f1ed`.
- **Hero-Knopf Startseite 44 px / 14 px / 500** gegen 48–52 px / 16 px auf den übrigen Knöpfen. Gehört zum Hero-Unterchat (Erster Bildschirm), dort melden.
- **Kartenradius:** Startseite 16 px, PDPs 4 px. Zwei Systeme, beide in sich konsistent und auf den PDPs ausdrücklich dokumentiert. Angleichen hieße Hero-Galerie mitziehen, das ist kein kleiner Diff.
- **Seitenrand mobil:** Startseite 20 px, PDPs 16 px (`--lt-page-gutter`). Kaum sichtbar, nicht angefasst.
- **Instrument Serif nur in `lt-leiste`:** einzige Stelle mit dieser Schrift. Wirkt als redaktioneller Schlussakzent, BJ-Entscheid offen.
- **Bewertungssterne `#f4b740`** unter 3:1 als Grafik. Zahl steht daneben, bleibt.

## Für andere Unterchats (nicht meine Zuständigkeit)

- Keine Copy- oder Tippfehler gefunden, die über die Text-Diät hinausgehen.
- Sticky-Knopf ist jetzt in normaler Schreibung; falls der Klickweg-Unterchat das Label ändert, bleibt die Schreibung so.
