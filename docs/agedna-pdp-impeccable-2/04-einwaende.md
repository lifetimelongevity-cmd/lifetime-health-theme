---
status: snapshot
last_review: 2026-10-28
canonical_for: agedna-pdp-impeccable-2-einwaende-abgrenzung
---

# AGE&DNA-PDP, Impeccable 2: Einwände und Abgrenzung (28.10.2026)

Sections `einwaende` (Abschnitt 6) und `abgrenzung` (Abschnitt 7), beide `sections/lt-dna-lp-objections.liquid`, Template `templates/product.age-dna-test.json`. Ausgangspunkt Commit `3c3d766`. Nicht committet, nicht gepusht.

- Vorschau: `docs/agedna-pdp-impeccable-2/04-einwaende.html` (http://localhost:8789/agedna-pdp-impeccable-2/04-einwaende.html), Texte 1:1 aus dem Template.
- Bilder bei 375 px, zweifach: `04-einwaende-vorher-1.webp` / `-nachher-1.webp` (Einwände), `04-einwaende-vorher-2.webp` / `-nachher-2.webp` (Abgrenzung).
- Höhe bei 375 px (gemessen in der Vorschau, Section inklusive Kopf): **Einwände 593 → 621 px**, **Abgrenzung 738 → 552 px**, zusammen 1.331 → 1.173 px.

**Nachtrag 28.10., nach Rücksprache mit BJ:** Der Preis-Einwand („395 € für eine Zahl?“) und der Preisbalken sind wieder raus. Der Preis wird auf der Seite nicht gerechtfertigt, sondern höchstens eingeordnet (Kaufzone, Bonus-Stack); das Angebotsraster klärt die Sitzung „Angebot · Preispsychologie AGE&DNA-Tableau“ (`lifetime-ads/briefings/gruene-wiese/07-preis-tableau.md`). An seine Stelle tritt der Einwand „Brauche ich das wirklich?“ mit der Antwort „Einmal im Leben.“ (Gene ändern sich nicht, die Beispiele Kreatin, Vitamin B12, Laktose stehen so in den 23 Kategorien des Berichts; bewusst „verwertet / aufnimmt / verträgt“, kein Wirkversprechen, keine Ersparnis beziffert). Einwand 2 antwortet jetzt mit dem Ausgangswert („Einen Ausgangswert.“, heute statt nächstes Jahr), die Richtung steht im zweiten Satz. Der Balken bleibt als Schalter im Liquid, per Default aus, im Template nicht mehr gesetzt. Die Einwände-Section hat damit keinen Delight-Moment mehr, nur die Leiter.

## Critique (Ist-Zustand aus `3c3d766`)

Methode: zwei getrennte Gutachten. A (Designkritik aus Bild, Liquid, Template), B (Detektor `detect.mjs` auf Liquid und Vorschau). B lief nur in der Regex-Stufe (HTML-Parser-Module im Skill-Ordner fehlen) und fand nichts, das ist „kein Signal“, nicht „sauber“. A hat im ersten Vorher-Bild zwei Spalten bei 375 px bemängelt; das war ein Fehler meiner ersten Vorher-Vorschau (Desktop-Regel ohne Media-Query), die echte Section stapelt. Das Vorher-Bild ist inzwischen korrekt, der Befund entfällt.

**Einwände (Liste), A: 24/36.** Austauschbar: eine hairline-getrennte Frage-Antwort-Liste, die jeder Shop so nutzen könnte. P0: die Kurzantwort steht fett *inline* vor dem Fließtext, bricht um („Das Labor kennt nur eine Nummer.“ auf zwei Zeilen) und verschmilzt mit dem Text; die Antwort ist nicht das erste, was das Auge findet. P1: „Die Richtung.“ setzt das Wissen um die zweite Messung voraus. P2: „Folgetest 299 €“ ist eine zweite Zahl neben 395 €, die Preis-Zögerin addiert sie. In zwei Sekunden erfasst: die drei Fragen, nicht die Antworten.

**Abgrenzung (Raster), A: 22/36.** Halb spezifisch: Spalten „Alter / Gene“ sind produkteigen, die Form ist das Pricing-Table-Muster. P0: 8 von 10 Zellen sind Striche, die Tabelle ist zu 80 % leer und braucht dafür 0,9 Bildschirme; der eigentliche Unterschied zum reinen DNA-Test („wiederholbar“) steht in keiner Spalte. P1: Spaltenköpfe sind der kleinste Text im Bild (12 px, gesperrt, gedämpft) und tragen die ganze Lesart; der 58-Jährigen mit Brille sind die gedämpften Striche auf #f2f1ed kaum sichtbar, sie sieht vier leere Zeilen. P2: dieselbe Komponente direkt nach den Einwänden liest sich als zweite Einwandliste.

## Bolder

**Einwände:** Antwort groß, Frage klein (neuer Schalter `antwort_gross`). Die Kurzantwort wird die Zeile in `--text-h2` fett (Helvetica, wie die Zahlen in Belegen und Garantie), die Frage steht in `--text-body-sm` gedämpft darüber, der Text in `--text-body-sm` darunter, höchstens zwei Sätze. Ab 750 px drei Spalten nebeneinander statt drei Zeilen. Copy (Stand nach Nachtrag): „Brauche ich das wirklich?“ → **„Einmal im Leben.“**; „Was bringt mir die Zahl?“ → **„Einen Ausgangswert.“**; „Das Labor kennt nur eine Nummer.“ → **„Nur eine Nummer.“** mit „Das Labor sieht nie deinen Namen.“ als erstem Satz darunter.

**Abgrenzung:** neue Darstellung **„Leiter“** (`layout: leiter`): ein Bild statt Tabelle. Fünf Stufen an einer senkrechten Linie, von oben (Online-Rechner: schätzt) nach unten (AGE & DNA-Test). Die vier anderen Wege mit Hohlpunkt und einem Satz, der eigene Weg unten mit gefülltem Punkt in `--color-teal-dark`, Name in `--text-section` Helvetica, Satz in Ink statt gedämpft. Reihenfolge neu: Online-Rechner, Smartwatch und Waage, Blutbild, reiner DNA-Test, AGE & DNA-Test. Keine Spaltenköpfe, keine Striche, keine getönte Karte. Ohne Wettbewerbernamen. Copy: „Beides aus einer Probe. Und wiederholbar.“ → **„Dein Alter und deine Gene, aus einer Probe. Wiederholbar.“** (ohne Spalten muss „beides“ benannt sein); „Schätzen aus Antworten“ → „Schätzt aus Antworten“.

## Delight (je Section genau einer, ohne JavaScript)

- **Einwände: kein Delight mehr.** Der zunächst gebaute Preisbalken (299 von 395 €, Block-Einstellungen `balken_teil`, `balken_gesamt`, `balken_label_teil`, `balken_label_rest`, füllt sich per CSS-Scroll-Timeline) bleibt als Schalter im Liquid, ist aber im Template nicht mehr gesetzt: ein selbstbezogener Anker, der die spätere Rechnung aufmacht (BJ 28.10.).
- **Abgrenzung: die Linie zeichnet sich.** Beim Scrollen wächst die Linie der Leiter von oben bis zur eigenen Stufe, der Punkt dort füllt sich teal. Die Bewegung ist die Aussage: die anderen Wege hören oben auf, dieser geht bis zum Alter.
- Bei `prefers-reduced-motion: reduce` und in Browsern ohne Scroll-Timeline (Firefox) steht sofort der Endzustand: Balken bei 75,7 %, Linie voll, Punkt gefüllt. Geprüft in Chrome: unter reduzierter Bewegung `animation: none`, Balken 75,7 %, Punkt teal; mit Bewegung wächst die Linie beim Scrollen (12 % → 77 % in der kurzen Vorschau, auf der echten Seite mit Inhalt darunter bis 100 %).

## Neue Schalter (alle per Default aus)

| Ebene | Schalter | Wirkung |
|---|---|---|
| Section | `antwort_gross` (Checkbox) | Frage klein, Kurzantwort groß, Text klein; ab 750 px drei Spalten. Nur bei Darstellung „Fragen und Antworten“ |
| Section | `layout: leiter` (neue Select-Option) | Ein Weg je Stufe an einer Linie; `hervorheben` am Block füllt den Punkt und vergrößert den Namen |
| Block | `balken_teil`, `balken_gesamt` (number), `balken_label_teil`, `balken_label_rest` (text) | Preisbalken unter der Kurzantwort, nur mit `antwort_gross` |

Bestand: die Darstellungen „liste“ und „raster“ rendern byte-gleich wie vorher (geprüft per Diff auf den Liste-Zweig), `page.dna-lp.json` nutzt beide Sections ohne `layout` und ohne `antwort_gross`, also unverändert. `read_marker` bleibt an `einwaende`, `data-lt-read` sitzt wie zuvor am Section-Element.

## Geprüft

- Template-Settings gegen das Section-Schema (alle IDs und Select-Werte vorhanden, JSON parst mit Kommentarkopf), `order` unverändert.
- 375 px: `scrollWidth` 375, kein horizontales Scrollen. 1280 px: drei Spalten Einwände oben bündig, Leiter zweispaltig (Name | Satz), kein Überlauf.
- `shopify theme check` (ganzes Theme, JSON-Ausgabe, 28.10. 06:55): keine Befunde in `sections/lt-dna-lp-objections.liquid` und `templates/product.age-dna-test.json`; die 120 gemeldeten Dateien sind Bestand.
- Nicht geprüft: die echte Shopify-Darstellung (erst nach Push in ein Vorschau-Theme) und Safari auf dem iPhone (Scroll-Timeline ab iOS 26; darunter steht der Endzustand).

## Offene Fragen für BJ

1. **Einwände sind 28 px höher als vorher** (621 statt 593): die Kurzantworten sind 28 px groß, und der Gene-Satz in Einwand 1 läuft mobil über vier Zeilen. Die Section liest sich in einem Blick (drei große Antworten), ist aber nicht kürzer. Kürzer wäre der Satz ohne das dritte Beispiel („… Kreatin verwertet oder Vitamin B12 aufnimmt, …“), dann rund 600 px.
2. **„Einmal zahlen, kein Abo, auf Wunsch in Raten mit Klarna“** steht jetzt nirgends mehr in den Einwänden. Vorschlag: als eine Zeile unter den Bonus-Stack (`bonus_stack`, Section einer anderen Sitzung), dort gehört der Zahlungshinweis hin.
3. **Reihenfolge der Leiter** (Rechner, Waage, Blutbild, Gentest, wir) folgt „wie nah am Alter“, nicht dem Briefing (Blutbild zuerst). Wenn das Blutbild als häufigster Vergleich oben stehen soll: `block_order` tauschen, die Leiter liest sich dann aber nicht mehr als Steigerung.
4. Die Linie zeichnet sich, bis die Leiter etwa im unteren Drittel des Bildschirms steht (`cover 45%`). Auf der echten Seite folgen Leitung und Ablauf, also wird sie voll. Falls die Section je als letzte steht, auf `cover 30%` stellen.

## Was aus der Critique bewusst nicht gebaut ist

| Vorschlag (Gutachten A) | Warum nicht |
|---|---|
| Datenschutz-Link unter Einwand 3 | Ein Element mehr, die Section soll kleiner werden; die Löschung steht im Satz |
| Laboretikett mit Probennummer als Delight | Erfundene Nummer, keine echte Information; der Preisbalken nutzt echte Zahlen |
| Zweiter Teal-Punkt „nach 6 Monaten“, der über die Skala wandert | Die Leiter ist senkrecht, der zweite Punkt hätte keine Achse; „Wiederholbar.“ steht im Satz des eigenen Wegs |
| Horizontale Skala „Schätzen bis Messen“ | Fünf Namen auf 343 px Breite überlappen; die Leiter ist dieselbe Skala senkrecht |
