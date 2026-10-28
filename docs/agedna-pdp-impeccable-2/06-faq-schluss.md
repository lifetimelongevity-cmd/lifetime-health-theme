---
status: snapshot
last_review: 2026-10-28
canonical_for: agedna-pdp-impeccable-2-faq-loox-schluss
---

# AGE&DNA-PDP, Impeccable-Durchgang 2: Loox-Zeile, FAQ, Schlussleiste (28.10.2026)

Sitzung „Theme · AGE&DNA-PDP FAQ + Schlussleiste“, Kennung `06-faq-schluss`. Abschnitte 5 (`loox_reviews`, `lt-pdp-reviews-all`), 12 (`faq_accordion`, `crs-faq-accordion`) und 13 (`schluss`, `lt-leiste`) der Verkaufsseite, Basis Theme-Commit `3c3d766`. **Nicht committet, nicht gepusht.**

- Vorschau: http://localhost:8789/agedna-pdp-impeccable-2/06-faq-schluss.html (Datei `06-faq-schluss.html`, Texte 1:1 aus `templates/product.age-dna-test.json`, Basis-CSS aus der Gesamtvorschau vom 27.10.)
- Bilder bei 375 px, zweifach: `06-faq-schluss-vorher-1..3.webp` und `06-faq-schluss-nachher-1..3.webp` (1 Loox, 2 FAQ, 3 Leiste)

## Höhen bei 375 px

| Abschnitt | Vorher | Nachher |
|---|---|---|
| 5 Loox-Zeile | 106 px | 92 px |
| 12 FAQ | 505 px | 744 px (erste Antwort offen), 623 px zugeklappt |
| 13 Schlussleiste | 520 px | 487 px |

Die FAQ wird höher, weil sechs Zeilen jetzt die halbe Antwort tragen und die erste Antwort offen steht. Dafür muss niemand mehr tippen, um die Richtung der Antworten zu kennen.

## Befund (Critique, zwei getrennte Gutachten)

Gutachten A (Designkritik, Nielsen 16/32) und Gutachten B (Messung mit Puppeteer, Detector). Was zählt:

- **FAQ:** keine der sechs Fragen trug die halbe Antwort, alle gleich schwer (Liquid: 400, Chevron als einziger Halt), der Gesprächs-CTA „Termin wählen“ lag zwei Ebenen tief. Erste Zeile war „Stimmt die Zahl überhaupt?“ mit „Schätzwert“, also eine Relativierung als Auftakt der letzten Inhaltssektion. Ohne JavaScript öffnet keine Antwort. Der Link in einer zugeklappten Antwort blieb per Tab erreichbar (0fr versteckt nur optisch).
- **Loox-Zeile:** sah mit Linien, Semibold und Chevron aus wie eine verrutschte FAQ-Frage (derselbe Befund wie am 16.10., damals nur verschoben, nicht umgebaut). Kein Hinweis darauf, dass sie wieder zuklappt.
- **Leiste:** Preis und Garantie wiederholt, Datum und Bewertungen nicht. Letzte Zeile endete auf der Bedingung („solange versiegelt“). Mobil 300 px Foto-Vorlauf, bevor die Überschrift kommt. Kontrast im Liquid in Ordnung (0,72 Papier auf Teal 5,1:1, Gutachten B hat die Live-Startseite abgetastet).
- **Vorher-Bilder zeigen nicht ganz das Liquid:** Die Gesamtvorschau vom 27.10. hatte die FAQ-Fragen fett und die Leiste zentriert mit vollflächigem Foto; das Theme rendert Fragen regular und die Leiste linksbündig mit Foto oben. Die Nachher-Bilder folgen dem Theme.
- Detector (`detect.mjs`) liest keine `.liquid`-Dateien, sein „0 Befunde“ ist leer, kein Freispruch.

## Änderungen

### 12 FAQ (`crs-faq-accordion.liquid`, Block `faq_accordion`)

**Bolder:** je Zeile die halbe Antwort fett hinter der Frage (neues Block-Setting `kurz`, dasselbe Muster wie `lt-dna-lp-objections` in den Einwänden). Geschlossen liest sich die Liste so:

- Bin ich dafür zu alt? Oder zu jung? **Weder noch.**
- Ist das eine Diagnose? **Nein.**
- Stimmt die Zahl überhaupt? **Sie kommt aus dem Labor.**
- Wollt ihr mir danach Supplements verkaufen? **Wirkstoffe, keine Marken.**
- Kann ich den Test verschenken? **Ja.**
- Ich will vorher mit jemandem sprechen. **Gern, 15 Minuten kostenlos.**

Reihenfolge neu (`block_order`): Altersfrage zuerst, weil sie die Zielkundin direkt trifft („ab 50 zählt jeder Vergleich“), „Stimmt die Zahl“ an dritter Stelle. Antworten gekürzt, damit die Kurzantwort nicht wiederholt wird. Überschrift „Häufige Fragen“ → „Was andere vorher fragen.“ FAQPage-JSON-LD nimmt die Kurzantwort mit auf.

**Delight (einer):** die erste Frage steht offen geladen (`first_open`) und entfaltet sich einmal beim Laden (CSS-Keyframe auf `grid-template-rows`, 0,55 s). Ohne JavaScript steht sie serverseitig offen, bei `prefers-reduced-motion` ohne Bewegung (geprüft: `animation: none`, Panel 121 px offen ohne JS).

**Nebenbei (gilt auf allen Seiten mit dieser Section, visuell unverändert):** zugeklappte Antworten bekommen `visibility: hidden`, damit ein Link darin nicht mehr unsichtbar fokussierbar ist (Gutachten B).

### 5 Loox-Zeile (`lt-pdp-reviews-all.liquid`, Block `loox_reviews`)

**Bolder:** neues Setting `style: link`: keine Linien, zentriert, regular, Unterstreichung, die Zahl fett („Alle **122** Bewertungen lesen“). Bleibt ein `details`, Tap-Ziel die ganze Zeile, mindestens 44 px.

**Delight (einer):** `label_open: Bewertungen einklappen`. Aufgeklappt wechselt die Beschriftung per `details[open]`, reines CSS. NMN-PDP rendert unverändert (`style` Default `zeile`, `label_open` leer).

### 13 Schlussleiste (`lt-leiste.liquid`, Block `schluss`)

**Bolder:** Überschrift, Knopf „Test bestellen, 395 €“ (Ziel unverändert `/cart/42825878929508:1`), darunter drei Fakten in der Serife der Überschrift, Zahl vor Text:

- **90 Tage** Rückgabe, solange versiegelt
- **9. Dez.** dein Ergebnis, etwa (heute plus 42 Tage)
- **4,7 von 5** 122 Bewertungen (Loox-Metafelder des Produkts)

Unterzeile „In sechs Wochen weißt du es.“ und Kleinzeile sind leer, beides steckt in den Fakten. `kompakt_mobil`: 168 statt 300 px Foto über dem Text, Überschrift und Knopf kommen früher in den Bildschirm.

**Delight (einer):** das Ergebnisdatum. Dieselbe Rechnung wie das Kalenderblatt im Hero (heute plus `datum_tage`), nur als Zahl in der Serife. Liquid rechnet das Datum serverseitig (Monatsnamen aus der Liste, Muster `crs-novel-food`), ein kleines Skript zieht es im Browser auf den heutigen Tag nach, weil die Seite gecacht ausgeliefert wird. Ohne JavaScript steht das Serverdatum.

## Neue Schalter (alle per Default aus oder leer)

| Section | Schalter |
|---|---|
| `crs-faq-accordion` | Section `first_open` (Checkbox); je Block `kurz` (Text) |
| `lt-pdp-reviews-all` | `style` (`zeile` / `link`), `label_open` (Text) |
| `lt-leiste` | `kompakt_mobil` (Checkbox), `fakt_1_zahl` bis `fakt_3_text` (Text, Platzhalter `{datum}`, `{datum_kurz}`, `{bewertungen}`, `{note}`), `datum_tage` (Range, Default 42) |

Startseite (`index.json`, `lt-leiste`), NMN-PDP (`lt-pdp-reviews-all`, `crs-faq-accordion`), Science und dna-lp (`crs-faq-accordion`) rendern wie bisher; einzige Ausnahme ist die unsichtbare `visibility`-Regel in der FAQ.

## Geprüft

- Template-Settings der drei Blöcke gegen die Section-Schemas (Typen, Select-Werte, Range-Grenzen, Block-Settings): keine Abweichung. Template bleibt gültiges JSON, `order` unverändert (14 Einträge).
- `shopify theme check` über das Theme: keine Befunde in den vier geänderten Dateien.
- Vorschau bei 375 px: `scrollWidth` 375, kein horizontales Scrollen. 1280 px: FAQ einspaltig 704 px, Leiste drei Fakten in einer Reihe.
- `prefers-reduced-motion`: keine Animation. Ohne JavaScript: erste FAQ-Antwort offen, Datum in der Leiste steht.
- **Nicht geprüft:** das echte Shopify-Rendering (kein Dev-Theme gestartet, sechs Sitzungen im selben Checkout). Besonders nach dem Push ansehen: `'now' | date: '%s' | plus: … | date: '%m'` (Epoch-Integer in den date-Filter) und `section.settings[key]` mit dynamischem Schlüssel in `lt-leiste.liquid`, dazu die Loox-Werte `{note}` und `{bewertungen}`.

## Offene Fragen für BJ

1. **FAQ auf natives `<details>` umstellen?** Dann öffnen Antworten auch ohne JavaScript und mehrere gleichzeitig; der heutige JS-Wechsel schließt die offene Zeile und die getippte Frage rutscht unter dem Daumen weg (Gutachten A, P0/P1). Trifft NMN-PDP, Science und dna-lp, deshalb nicht in diesem Durchgang.
2. **„Termin wählen“ auf der PDP:** Kaufweg oder Ausgang? Commit 6f90356 hat Ausgänge im Kaufweg entfernt, dieser Link führt die Kundin bei 395 € auf eine andere Seite. Jetzt sichtbar als „Gern, 15 Minuten kostenlos.“, der Link weiter in der Antwort.
3. **Knopf der Leiste** erbt Gewicht 400 (DESIGN.md will 600) und hat keinen Hover. Gilt auch auf der Startseite, deshalb nicht angefasst.
4. **FAQ-Trennlinien** liegen im Liquid bei Alpha 0,05 (1,1:1), die Einwände nutzen 0,14. Angleichen würde vier Seiten ändern.
5. **Dritter Fakt in der Leiste** (4,7 von 5, 122 Bewertungen) steht mobil allein in der zweiten Reihe. Alternativ nur zwei Fakten (Garantie, Datum).
