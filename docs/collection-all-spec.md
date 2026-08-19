---
status: living
last_review: 2026-08-19
implemented: 2026-08-19
canonical_for: /collections/all (Template collection.katalog.json)
supersedes: []
review_cadence_days: 30
---

# /collections/all — Katalog-Spec

Eine Spec für einen Umbau in einem Rutsch. Sie beschreibt den Zielzustand von
`templates/collection.katalog.json`, die gemeinsame Produktkarte für Katalog und
Register, die komplette Copy und die Push-Reihenfolge.

Modus der Fläche: **Persuade**. Der Besucher entscheidet und handelt. Die Seite ist
keine Übersicht, sie ist der Verkaufsraum.

---

## 0. Geltungsbereich

**In Scope:** `/collections/all`, sein Template `collection.katalog.json`, die Section
`lifetime-collection-grid`, die Karte, die auch `lt-collection-register` trägt.

**Nicht in Scope, auf Ansage:** Bundle-Builder, Kollektions-Taxonomie (welche
Kollektion welches Produkt enthält). Beides wird hier weder angefasst noch
vorgeschlagen.

**Verifizierte Ausgangslage.** `all` trägt im Admin `templateSuffix: "katalog"` und
enthält **13 Produkte** (Admin-API, 19.08.2026). Das Template rendert diese 13 als
handgepflegte Blöcke, es liest `collection.products` nicht. Die Section
`lifetime-collection-grid` wird **ausschließlich** von `collection.katalog.json`
benutzt (geprüft über `templates/` und `sections/`). Jede Änderung an ihr trifft
also genau diese eine Seite. Das ist der Grund, warum der Umbau in einem Rutsch
gehen kann.

Die gestrige Arbeit (`sections/lt-collection-register.liquid`,
`templates/collection.json`, `templates/collection.katalog.json`) ist lokal fertig
und ungepusht. Sie ist Teil derselben Push-Welle, siehe §6.

---

## 1. Befund

### 1.1 Messmethode

Headless Chrome über das CDP-Protokoll, `Emulation.setDeviceMetricsOverride` auf
1440×900 (desktop) und 390×844 (mobile, `mobile: true`, DPR 2, iOS-UA,
Touch-Emulation). Nicht im Browser-Pane: das kollabiert versteckt auf
`innerWidth 0` und meldet dann falsche Werte. Ergänzend Live-HTML per `curl`,
Produktpreise über `/products/<handle>.js`, Metafelder und Kollektionsbestände
über die Admin-API, Token-Werte gegen `assets/theme.css`.

Alles unten ist gemessen, nicht geschätzt. Wo etwas nicht sauber messbar war,
steht es dabei.

### 1.2 Belegte Defekte

**D1 — Alle 13 Badges sind unsichtbar.** Die Section rendert
`<span class="cg-badge" style="color: {{ card_bg }};">`, `card_bg` ist auf jeder
Karte `#ffffff`. Die CSS-Regel setzt `background: var(--color-surface-primary)`,
und dieser Token löst zu `var(--color-white)` auf. Gemessen: `color rgb(255,255,255)`
auf `background rgb(255,255,255)`, Kontrast **1:1**. „23 DNA-Kategorien",
„Chemikalie", „60 Kapseln", „300g", „75ml", „Für Bestandskunden" stehen im
Template, erscheinen aber auf keiner Seite. Beiläufige Folge: die
„Chemikalie"-Auszeichnung, die raus soll, war nie sichtbar. Und weil niemand
das Feld je gesehen hat, ist es auch nicht gepflegt: das Vitamin-D3-+-K2-**Spray**
trägt das Badge „60 Kapseln".

**D2 — Die gepflegten Kurztitel sind live wirkungslos.** Live rendert
„Epigenetischer AGE & DNA-Test für zuhause", „TMG (Betain) Kapseln", „Trans-Resveratrol
Kapseln". Im Template stehen „AGE & DNA-Test", „TMG (Betain)", „Resveratrol".
Ursache ist die Reihenfolge im Liquid: `product.title` stand vor
`block.settings.custom_title`. Der Fix liegt lokal vor (`git diff`), ist aber nicht
gepusht. Nebenwirkung live: der Kartentitel weicht vom eigenen Bild-Alt-Text ab,
denn `card_image_alt` liest seit jeher `custom_title`.

**D3 — Mobil ist jede Gruppe ein Wisch-Karussell.** Gemessen bei 390:
`display: flex`, `flex-wrap: nowrap`, `overflow-x: auto`,
`scroll-snap-type: x mandatory`, `flex-basis: 72%`. Fünf Gruppen sind fünf
getrennte horizontale Scrollflächen. Sichtbar ohne Wischen sind 5 von 13 Produkten,
in der Gruppe „Regeneration" ist die Scrollbreite 1073px bei 360px Sichtfeld. Die
CSS-Klassen behaupten `grid-palm-2`, gerendert wird keine Spalte
(`grid-template-columns: none`). Auf einer Katalogseite ist verstecktes Inventar
der teuerste Fehler, den man machen kann.

**D4 — Der Preis hat keine Hierarchie.** Gemessen: Titel 18px/700, Preis
**14px/500**, Nutzenzeile 14px/400. Die einzige Zahl, an der die Entscheidung
hängt, ist so groß wie die Beschreibung darunter. Der 349-€-Test und das
14,90-€-TMG tragen exakt dieselbe Preisdarstellung.

**D5 — Der Aktionspreis ist nicht anschlussfähig.** Am AGE&DNA-Test steht live
`compare_at_price` (Test 349 statt 449, Test + Ergebnisgespräch 449 statt 549,
Storefront-API geprüft). Die Section rendert **nie** einen Streichpreis. Sie führt
zwar in jedem der 13 Blöcke ein Setting `compare_price_color` (`#a3a3a3`), aber
kein Liquid liest es. 13 tote Settings, und der Anker, den der Shop bereits
gepflegt hat, kommt nicht an.

**D6 — Die NMN-Abo-Preise fehlen.** Die Karte zeigt „Ab 33,90 €". Live existieren
drei Abo-Gruppen mit Preisen 28,90 / 49,90 / 68,90 (Storefront-API geprüft). Der
Preisvorteil, der das NMN-Geschäft trägt, steht auf der Katalogseite nirgends.

**D7 — Die Nav eröffnet keine Wege.** Fünf Chips, alle fünf sind
Sprungmarken auf `#shopify-section-…` innerhalb derselben Seite, für fünf
Überschriften auf einer Seite mit 13 Produkten. Sie kostet 112px oberhalb des
ersten Produkts. Mobil sind die Chips **30px hoch** (gemessen, `padding: 8px 16px`,
`font-size: 14px`) und damit unter der 44px-Grenze. Desktop 48px. Der aktive
Zustand wird nur über die Hintergrundfarbe signalisiert, `aria-current` wird nie
gesetzt. Zusatzbefund: nach einem Scroll ans Seitenende und zurück nach oben
bleibt der letzte Chip markiert, der Scrollspy setzt sich nicht zurück. Beim
frischen Laden ist korrekt kein Chip aktiv.

**D8 — Fünf Bänder, ein Ton.** Gemessen von oben nach unten: `#f7f7f4`, `#ffffff`
(Nav-Band), `#f7f7f4`, `#f2f1ed`, `#f7f7f4`, `#f2f1ed`, `#f7f7f4`. Der Unterschied
zwischen Paper A und Paper B ist bei diesen Flächengrößen nicht wahrnehmbar. Die
stärkste Fläche des Systems, Clinical Slate `#364f56`, kommt auf der ganzen Seite
kein einziges Mal vor, außer im globalen Footer. Die Karten sind weiß auf beige,
`box-shadow: none` — die Paper-Regel aus DESIGN.md („Papier wirft Schatten, sonst
nichts") ist hier weder erfüllt noch ersetzt.

**D9 — Weiße Packshots auf weißen Karten, ohne Well.** Die Produktrender sind
weiße Verpackung auf transparentem Grund, die Karte ist `#ffffff`,
`object-fit: contain`, kein Well. Genau der Fall, für den das Register
`--reg-well: #f2f1ed` eingeführt hat. Der Katalog hat diese Lösung nicht bekommen.

**D10 — Rasterlöcher.** Alle fünf Gruppen laufen auf `columns_desktop: 3`. Bestand
2 / 1 / 4 / 3 / 3. Die NMN-Gruppe ist eine Karte in einem Dreierraster, zwei Drittel
des Bandes sind leere Fläche. „Regeneration" hat vier Karten, also eine Waise in
Reihe zwei. Ausgerechnet das wichtigste Supplement bekommt das leerste Band der
Seite.

**D11 — Elf von dreizehn Karten haben keinen Weg zur PDP.** Gemessen:
`document.querySelectorAll('[data-lt-card-atc]').length === 11`. Bei diesen Karten
fängt ein Klick-Handler den Klick auf die **ganze** Karte ab und legt die erste
Variante in den Warenkorb. Nur AGE&DNA und NMN führen zur Produktseite. Das ist
eine dokumentierte Entscheidung (siehe §5), sie hat aber die Nebenwirkung, dass ein
Besucher über den Katalog keine Supplement-PDP erreichen kann.

**D12 — Fünf Kicker ohne Informationsgewinn.** „Tests & Retests", „Nur zu
Forschungszwecken", „Schlaf · Gelenke · Methylierung", „Kreatin · Vitamine D3/K2 ·
B-Komplex", „Resveratrol · Fisetin · Spermidin". Drei davon zählen exakt die
Produkte auf, die zwei Zentimeter darunter mit Bild und Namen stehen. Das ist die
Eyebrow-Inflation, die im Workspace bereits als Regel abgeräumt ist.

**D13 — Die Meta-Description passt nicht zur Seite.** `/collections/all` erbt die
Kollektionsbeschreibung („Mit zunehmendem Alter verlangsamen sich zentrale
Zellprozesse …"). Das ist ein Longevity-Absatz, keine Beschreibung eines
Produktkatalogs.

**D14 — Zwei Nachbarkarten zeigen dieselbe Bewertung.** Der Folgetest hat keine
eigenen Loox-Daten (Admin-API: `loox.avg_rating` ist `null`). Das Liquid mappt
seine Bewertung bewusst auf `lifetime-age-dna`. Ergebnis: „4,7 (121)" steht zweimal
direkt nebeneinander. Siehe §7, das ist eine Entscheidung, keine stille Korrektur.

### 1.3 Was trägt und bleibt

- Der H1 ist genau einer und sitzt richtig, die Überschriftenkette H1 → H2 → H3
  ist sauber.
- Kein horizontaler Überlauf auf Dokumentebene, weder bei 1440 noch bei 390
  (`scrollWidth == clientWidth`).
- Die CTA-Pillen sind auf beiden Breiten 48px hoch.
- Die Loox-Bewertungen sind echt und für 15 von 18 aktiven Produkten vorhanden.
- Die Heading-Pair-Regel ist im Masthead korrekt umgesetzt: H1 und Subline beide
  36px/400 Helvetica Neue, Unterschied nur die Farbe (`#26251e` gegen
  `rgba(38,37,30,0.55)`).
- Der Bildbestand: die Packshot-Master sind ~446px breit (gemessen an drei
  Assets bei angefordertem `width=1100`). Das ist die harte Obergrenze für jedes
  Bildfeld: **über ~223 CSS-px wird auf Retina unscharf.** Die Kartenspec unten
  hält sich daran.

---

## 2. Section-Reihenfolge für `collection.katalog.json`

Von sieben Sections auf **fünf**, von zwei Rasterlogiken auf eine.

| # | Section | `card_variant` | Fläche | Job |
|---|---|---|---|---|
| 1 | `lt-science-hero` | — | Paper A `#f7f7f4` | Masthead, H1 und Subline. **Ohne Bild.** |
| 2 | `lifetime-collection-grid` | `sheet` (+ 1× `row`) | Paper A `#f7f7f4` | Die zwei Protagonisten, darunter der Folgetest als Zeile |
| 3 | `lifetime-collection-grid` | `row` | Paper B `#f2f1ed` | Zehn Nährstoffe als Register, drei Gruppenmarken |
| 4 | `lt-katalog-index` (neu) | — | Clinical Slate `#364f56` | Wege in die echten Kollektionen |
| 5 | *(Footer, global)* | — | — | — |

**Section 1, Masthead.** `lt-science-hero` bleibt die Section, das Bild-Setting
wird geleert. Die Tennis-Mood-Aufnahme rendert desktop 435×290 und trägt nichts
zum Katalog bei; mobil macht sie den Masthead 678px hoch, also rund vier
Fünftel der ersten Ansicht ohne ein einziges Produkt. `image` ist im Schema
optional (geprüft), das Entfernen ist ein reiner Setting-Wechsel. Padding
80/56 → **48/32** desktop, mobil greift die halbierte Variante. Zielwirkung:
Masthead ~180px statt 426px, damit steht das erste Protagonistenblatt bei 1440×900
in der ersten Ansicht.

**Section 2, Protagonisten.** Zwei Blöcke im `sheet`-Variant nebeneinander
(zwei Spalten desktop, gestapelt unter 768px), darunter ein Block im `row`-Variant.

1. `lifetime-age-dna` — Blatt, Kicker trägt die echte Frist, Preis 349 € mit
   Streichpreis 449 €, Preisnotiz für die Premium-Variante.
2. `lifetime-nmn` — Blatt, Kicker „Nur zu Forschungszwecken", Preis ab 33,90 €
   plus Abo-Zeile ab 28,90 €.
3. `lifetime-age-folgetest` — Zeile, ohne Bewertung, ohne Kicker. Er ist ein
   Anschlusskauf für Bestandskunden und darf visuell nicht mit einem
   Erstkauf-Protagonisten konkurrieren. Das löst zugleich D14: die Zeile zeigt
   keine Bewertung, also steht „4,7 (121)" nicht mehr doppelt.

**Section 3, Nährstoff-Register.** **Eine** Section statt drei. Sie enthält zehn
Produktblöcke und drei neue `group_label`-Blöcke, die die Gruppen im laufenden
Register markieren. Zeilen statt Kacheln, damit:

- die Rasterlöcher aus D10 strukturell verschwinden (eine Zeilenliste hat keine
  Waisen, egal ob eine Gruppe 2 oder 5 Einträge hat),
- der Preisvergleich zwischen zehn Nährstoffen in einer Spalte funktioniert statt
  über drei Rasterspalten hinweg,
- die Fläche mit dem Register-Recto auf `/collections/<handle>` identisch
  aussieht, was der eigentliche Konsistenzauftrag ist,
- Papier wieder etwas bedeutet: genau die zwei Protagonisten sind Blätter, alles
  andere sind Linien. Das ist die Paper-Regel aus DESIGN.md, angewandt statt
  zitiert.

Gruppenbelegung:

| Gruppenmarke | Einträge |
|---|---|
| Zellfunktion | Resveratrol, Fisetin, Spermidin, CaAKG, TMG (Betain) |
| Basisversorgung | Kreatin, Vitamin B-Komplex, Vitamin D3 + K2 |
| Haut, Gelenke, Schlaf | Hyaluron, Schlafspray |

Drei Gruppen, wie gefordert. „Basisversorgung" deckt sich eins zu eins mit der
gleichnamigen Live-Kollektion (3 Produkte, Admin-API geprüft).

**Section 4, Register-Leiste (neu, `lt-katalog-index`).** Eine schlanke
Slate-Fläche am Fuß mit den Links in die echten Kollektionen. Sie ersetzt die
gestrichene Sprungmarken-Nav aus D7 und beantwortet die Frage aus dem Auftrag
klar: eine Nav gehört auf diese Seite nur, wenn sie **aus** der Seite herausführt.
Fünf Anker innerhalb einer Seite mit 13 Produkten tun das nicht, neun
Kollektionslinks tun es.

Sie steht **unten**, nicht oben. Bei 13 Produkten sieht der Besucher den ganzen
Bestand durch Scrollen; Navigation vor dem ersten Produkt verzögert nur. Unten
fängt sie genau die Leute auf, die nichts Passendes gefunden haben.

Sie ist zugleich die einzige dunkle Fläche der Seite und schließt damit D8: der
Rhythmus wird Paper A → Paper A → Paper B → Slate. Und sie spiegelt den
Slate-Rücken des Registers, wodurch Katalog und Kollektionsseiten sichtbar zur
selben Familie gehören.

Ziele (alle live und publiziert, Bestände per Admin-API am 19.08.2026):
Bestseller (4), Nährstoffe (12), Basisversorgung (3), Energie & Stoffwechsel (4),
Fokus & Regeneration (5), Immun- & Zellschutz (5), Haut & Jugendlichkeit (4),
Kraft & Beweglichkeit (4), Bundles (3).

`nmn` (1) und `dna-epigenetik-test` (2) stehen absichtlich nicht in der Leiste,
sie sind oben schon Protagonisten. `stack-eligible` ist eine Ops-Kollektion und
bleibt draußen, wie im Register auch.

**Geschätzte Seitenlänge danach:** desktop rund 3000px statt gemessener 5935px,
mobil rund 3200px statt 4990px. Schätzung, nicht Messung, weil sie erst nach dem
Bau messbar ist.

---

## 3. Die gemeinsame Produktkarte

### 3.1 Träger

**`snippets/lt-product-card.liquid`** — neu. Ein Snippet, ein Feldsatz, drei
Layouts. Beide Sections rendern es:

- `sections/lifetime-collection-grid.liquid` (Katalog, kuratierte Blöcke)
- `sections/lt-collection-register.liquid` (Register-Recto, aus `collection.products`)

Ein Snippet und nicht zwei gepflegte Kopien, weil die Fehler aus §1 exakt dort
entstanden sind, wo dieselbe Logik zweimal geschrieben wurde: der
Rating-Lesefehler existierte in beiden Dateien, im Register ist er korrigiert, im
Katalog nicht.

Aufrufparameter:

| Parameter | Typ | Zweck |
|---|---|---|
| `product` | product | Pflicht. Immer über `all_products[handle]` rehydriert, sonst fehlen die App-Metafelder (Loox). |
| `variant` | string | `sheet` \| `tile` \| `row`. Default `row`. |
| `title_override` | string | Kuratierter Kurztitel. |
| `subline_override` | string | Kuratierte Nutzenzeile. |
| `kicker` | string | Optional, nur wo er etwas sagt. |
| `image_override` | image | Kuratierter Packshot. |
| `price_from` | boolean | Default `true`. Auf `false` unterdrückt es das „ab" trotz `price_varies`. |
| `price_note` | string | Eine kurze Zeile unter dem Preis. |
| `show_rating` | boolean | Default `true`. |
| `show_subscription` | boolean | Default `true`. |
| `cta_label` / `atc_label` / `soldout_label` | string | Beschriftungen aus den Section-Settings. |
| `link_behavior` / `force_product_link` / `pdp_exceptions` | — | Unverändert aus der jeweiligen Section durchgereicht. |

### 3.2 Felder, von oben nach unten

1. **Bild im Well.** Quadratisches Feld, `background: #f2f1ed`, `border-radius:
   var(--radius-sm, 8px)`, `object-fit: contain`, Innenabstand. Ohne Well
   verschwindet die weiße Verpackung auf dem weißen Blatt (D9). Kantenlänge:
   `sheet` 200px, `tile` 160px, `row` 88px. Alle drei bleiben unter der
   446px-Master-Grenze aus §1.3, `sheet` mit 200px auch bei DPR 2.
2. **Kicker.** 12px/600, `letter-spacing: 0.1em`, `text-transform: uppercase`,
   Farbe `var(--color-ink-muted, #6b6b63)` (5,01:1 auf Paper A). Wird nur
   gerendert, wenn `kicker` gesetzt ist. Auf der ganzen Seite tragen ihn genau
   zwei Karten.
3. **Titel.** `var(--font-heading)`. `sheet` 24px/700, `tile` und `row` 18px/700,
   `line-height: 1.25`, auf zwei Zeilen geklemmt. Identisch zu `lt-reg__name`,
   damit Katalog- und Registerzeile dieselbe Höhe halten.
4. **Nutzenzeile.** `var(--font-body)` 14px/400, `line-height: 1.5`, Farbe
   `var(--color-gray-600, #525252)`, auf zwei Zeilen geklemmt, `max-width: 44em`.
5. **Bewertung.** Als Messwert, nicht als Sternenreihe: Zahl + „/ 5" + „(n)".
   Zahl in `var(--color-teal-dark, #4A8C85)`, **20px/700** Helvetica Neue. 20px/700
   ist kein Geschmack, sondern die Bedingung: Deep Teal misst auf Weiß 3,9:1 und
   trägt damit erst ab 18,66px fett. Die Alternative wäre ein dunklerer Teal, den
   das System nicht hat. Der Vorlesetext bleibt vollständig
   (`<span class="visually-hidden">4,7 von 5 Sternen, 121 Bewertungen</span>`).
   Damit fallen die goldenen Sterne des Katalogs weg; Gold ist in DESIGN.md die
   Ein-Flaggen-Farbe und darf nicht dreizehnmal auf einer Seite stehen.
6. **Preis.** `var(--font-heading)`, 700, `font-variant-numeric: tabular-nums`,
   Farbe Ink `#26251e`. **Nie Teal** — ein Preis ist in dieser Welt keine Messung.
   `sheet` 32px, `tile` 24px, `row` 20px. Das „ab" davor 14px/400 in ink-muted,
   unterdrückbar über `price_from: false`.
7. **Streichpreis.** Nur wenn `product.compare_at_price > product.price`. Als
   `<s>` in `var(--color-gray-400, #A3A3A3)` — der einzige Ort, an dem DESIGN.md
   Gray 400 als Textfarbe zulässt. Davor unsichtbar „Aktionspreis" /
   „Regulärer Preis" für Screenreader.
8. **Abo-Zeile.** 14px/400 ink-muted, „im Abo ab 28,90 €". Nur wenn das Produkt
   Abo-Zuordnungen hat.
9. **Preisnotiz.** 14px/400 ink-muted, eine Zeile, optional.
10. **CTA.** Pille, 48px, 14px/600 Lato. `sheet`: gefüllt, `var(--color-dark)` auf
    Weiß. `tile` und `row`: Outline. Fokus `outline: 2px solid` Deep Teal, 2px
    Offset.
11. **Nicht-verfügbar-Fahne.** Text „Nicht verfügbar". Gedimmt wird **nur das
    Bild** (`opacity: 0.5` auf dem Well), nie der Text. Im Register war genau das
    der Fehler, der den Hinweis auf 3,9:1 gedrückt hat.

**Kein Badge-Slot.** Das Badge ist ersatzlos gestrichen, nicht repariert. Gründe:
es war auf allen 13 Karten unsichtbar (D1), auf neun Karten wiederholte es nur die
Packungsgröße, die in der Nutzenzeile besser aufgehoben ist, und §4 der
Messaging-Governance erlaubt ohnehin nur eine Aussage pro Karte. Wo der Inhalt
echt war, wandert er in Kicker oder Nutzenzeile.

### 3.3 Datenquellen, in dieser Reihenfolge

| Feld | 1. | 2. | 3. |
|---|---|---|---|
| Titel | `title_override` | *(keine Metafeld-Stufe)* | `product.title` |
| Nutzenzeile | `subline_override` | `product.metafields.custom.tagline` | `product.description \| strip_html \| truncatewords: 12` |
| Bild | `image_override` | `product.featured_image` | leeres Well |
| Bewertung | `loox.avg_rating` / `loox.num_reviews` | `reviews.rating.value.rating` / `reviews.rating_count` | nichts rendern |
| Preis | `product.price` | — | — |
| Streichpreis | `product.compare_at_price`, nur wenn größer | — | — |
| Abo | Minimum aus `product.variants.first.selling_plan_allocations[].price` | — | Zeile entfällt |

Zwei Anmerkungen, beide geprüft:

- **`custom.tagline` und `custom.badge` sind auf allen 18 aktiven Produkten leer**
  (Admin-API). Der Metafeld-Pfad ist als Stufe 2 vorgesehen, damit Register und
  Katalog irgendwann dieselbe kuratierte Zeile ziehen, ohne sie zweimal zu pflegen.
  Er trägt heute nichts. Solange die Felder leer sind, fällt das Register auf
  `product.description` zurück, so wie jetzt. Wer die Pflege will, muss 18 Werte
  schreiben; das ist Content-Arbeit, keine Code-Arbeit.
- **Abo-Preise kommen aus `selling_plan_allocations`, nicht aus
  `selling_plan_groups`.** Die Gruppe kennt den Plan, den Preis kennt nur die
  Zuordnung an der Variante. Für NMN liefert `variants.first` (30 g) die
  Zuordnung 2890, also „im Abo ab 28,90 €". Wenn keine Zuordnung existiert,
  entfällt die Zeile ersatzlos, sie wird nie geschätzt.

### 3.4 Tokens

Alle folgenden Tokens sind in `assets/theme.css` definiert (einzeln geprüft):

`--font-heading` · `--font-body` · `--text-micro` 12 · `--text-body-sm` 14 ·
`--text-body-lg` 18 · `--text-h3` 24 · `--text-h2` 28 · `--text-h1` 36 ·
`--text-stat` 56 · `--radius-sm` 8 · `--radius-md` 12 · `--radius-full` 999 ·
`--space-1` 4 bis `--space-7` 48 · `--color-ink` #26251e · `--color-ink-muted`
#6b6b63 · `--color-gray-600` #525252 · `--color-gray-400` #A3A3A3 ·
`--color-dark` #364F56 · `--color-teal-dark` #4A8C85 · `--color-paper` #f7f7f4

**Zwei Werte haben keinen Token und werden lokal deklariert**, genau wie im
Register:

```css
--ltc-well:   #f2f1ed;  /* Paper B, Bildwell. Theme hat dafür keine Variable. */
--ltc-price:  32px;     /* Preisstufe sheet, liegt zwischen h2 und stat. */
```

`--color-surface-primary` ist **nicht** zu benutzen. Es löst zu Weiß auf und ist
die Ursache von D1.

### 3.5 Die drei Varianten

**`sheet`** — Sheet White `#ffffff`, `border-radius: 12px`,
`box-shadow: 0 1px 3px rgba(0,0,0,0.05)` (paper-rest), Innenabstand 32px. Bild
oben, Textblock darunter, CTA am Fuß. Zwei nebeneinander bis 768px, darunter
gestapelt. Das ist das einzige Element der Seite, das Papier ist.

**`row`** — Kein Kasten, keine Fläche, kein Schatten. Ein Grid aus drei Spalten:
88px Well · Textblock · rechtsbündiger Schwanz mit Preis und CTA. Getrennt durch
`border-top: 1px solid rgba(38,37,30,0.12)`, die Hairline-Regel. Zeilenhöhe wie im
Register ~121px.

**`tile`** — bleibt im Snippet, damit die Section ihr altes Verhalten behält, wird
im Zielzustand von `/collections/all` aber nicht mehr benutzt.

### 3.6 Mobilverhalten (390)

- **Keine horizontalen Scrollflächen.** Die Karussell-Logik aus D3 wird entfernt,
  nicht nur überschrieben. `sheet` stapelt volle Breite, `row` bleibt Zeile.
- `row` bei 390: Well 72px links, Textblock daneben, Preis und CTA brechen in eine
  zweite Zeile unter dem Textblock, rechtsbündig. Zeilenhöhe mindestens 88px.
- Jede Zeile ist ein Bedienelement und damit über 44px hoch. Die CTA-Pille bleibt
  48px.
- Kein Element ragt über `100vw`, `overflow-x` bleibt auf Dokumentebene aus. Der
  heutige Zustand ist auf Dokumentebene bereits sauber und darf es bleiben.
- Bildkanten mobil: `sheet` 160px, `row` 72px. Bei DPR 3 ergibt das 480 bzw. 216
  Gerätepixel; die 446px-Master decken die Zeile voll und das Blatt praktisch
  (Abweichung unter 8 %).
- Masthead-Padding halbiert sich, wie im Register (`padding | divided_by: 2`).

### 3.7 Was an `lifetime-collection-grid.liquid` zu ändern ist

1. **Rating-Lesefehler, Zeile ~244.** `metafields.reviews.rating.value` ist ein
   Rating-Objekt, kein Skalar; `| times: 1` darauf liefert nichts, der
   Shopify-Reviews-Fallback war also tot. Richtig ist
   `…rating.value.rating | times: 1`. Kanonisches Muster:
   `snippets/product-rating.liquid:34`. **Der Fix liegt bereits lokal vor
   (ungepusht)** und wandert beim Umbau ins Snippet, wo er nur noch einmal
   existiert.
2. **Titel-Vorrang, Zeile ~186.** `custom_title` vor `product.title`. Ebenfalls
   lokal vorhanden, wandert ins Snippet.
3. **Badge raus.** Markup, CSS-Regel und die Settings `badge` und
   `compare_price_color` streichen. Letzteres war in 13 Blöcken gepflegt und
   wurde nie gelesen.
4. **Neues Section-Setting `card_variant`** (`select`: sheet / tile / row,
   Default `tile`), plus **gleichnamiges Block-Setting als Override** (Default
   leer = Section-Wert erbt). Das Override ist der Grund, warum der Folgetest als
   Zeile unter zwei Blättern stehen kann, ohne eine eigene Section zu brauchen.
5. **Neuer Blocktyp `group_label`** mit einem Text-Setting `label`. Im
   `block_order` markiert er den Beginn einer Gruppe und rendert eine
   Hairline-Rubrik im 12px-Uppercase-Ton. Damit trägt **eine** Section die drei
   Nährstoffgruppen.
6. **`max_blocks` von 12 auf 20.** Zehn Produkte plus drei Gruppenmarken sind 13
   Blöcke, das aktuelle Limit würde den Bau still abschneiden.
7. **Neue Block-Settings** `kicker`, `price_note`, `price_from`, `show_rating`.
   Achtung: **jedes Setting, das im Template stehen soll, braucht einen
   Schema-Eintrag.** Shopify verwirft unbekannte Template-Settings still und ohne
   Fehlermeldung. Genau so ist `lt-pdp-hero` einmal auf ein `cta_label` gelaufen,
   das es nie gab.
8. **Karussell-CSS entfernen.** Die Mobilregeln, die `.grid--layout` auf
   `flex/nowrap/overflow-x:auto/scroll-snap` setzen, werden für die
   Varianten `sheet` und `row` außer Kraft gesetzt.
9. **Kartenrumpf ersetzen** durch `{% render 'lt-product-card', … %}`. Die
   ATC-Logik (Handle-Ausnahmen, `data-lt-card-atc`, das Skript am Fuß) bleibt in
   der Section, sie ist Section-Verhalten und nicht Kartendarstellung.

Regressionsrisiko: **keins außerhalb dieser Seite.** Die Section wird von keinem
anderen Template referenziert (geprüft).

### 3.8 Was an `lt-collection-register.liquid` zu ändern ist

Wenig, das Register ist die reifere Fläche.

1. Den Eintragsrumpf (`lt-reg__thumb` bis `lt-reg__cta`) durch
   `{% render 'lt-product-card', variant: 'row' %}` beziehungsweise
   `variant: 'sheet'` für den Lead-Eintrag ersetzen.
2. Die CSS-Klassen des Eintrags auf die Snippet-Klassen umstellen. Rücken,
   Index, Rubrik, Paginierung und Leerzustand bleiben unangetastet.
3. Die Abo-Zeile bekommt das Register damit geschenkt, sie fehlte dort auch.
4. **Blockliste ergänzen:** `templates/collection.json` führt 11 `register_link`-
   Blöcke, `basisversorgung` fehlt. Die Kollektion existiert live mit 3 Produkten,
   und der Katalog trägt eine gleichnamige Gruppe. Ein Block dazu, dann sind es 12
   und damit genau das Blocklimit des Registers.
5. Die Regel, dass der Index das aktuelle Kapitel voranstellt, wenn kein Block
   passt, **bleibt**. Ohne sie steht ein Besucher in einem Kapitel, das das
   Register leugnet.

---

## 4. Copy

Deutsch, Du-Form. Keine Em-Dashes, keine Dreiklänge, keine Heilaussagen, ein
Claim pro Element. Kicker nur bei echtem Informationsgewinn: von heute fünf auf
zwei.

### 4.1 Masthead (`lt-science-hero`)

| Feld | Neu |
|---|---|
| Kicker | *(leer)* |
| H1 | Die Produkte, hinter denen wir stehen. |
| Subline | Erst testen, dann ergänzen. |

**Korrektur 2026-08-19 (BJ).** Der ursprüngliche H1 „Die Produkte, die wir selbst
nehmen." stand zwei Zentimeter über einer Karte mit dem Kicker „Nur zu
Forschungszwecken". Das ist nicht nur schief, es ist die eine Stelle, an der die Seite
dokumentiert, dass LIFETIME ein als Forschungsware deklariertes Produkt konsumiert.
Der Satzbau bleibt, nur der Anspruch wechselt von Einnahme auf Haftung. Aus demselben
Grund ist die NMN-Nutzenzeile geändert: „30 g reichen etwa zwei Monate" ist eine
Verbrauchsdauer und damit implizit eine Verzehrangabe, ersetzt durch „Drei Größen".
Ansonsten gilt weiter: an BJs eigenen Zeilen wird nur angefasst, was faktisch falsch ist. Die Subline ersetzt
„Wissenschaftlich begründet, geprüft und selbst im Alltag getestet." Diese Zeile
wiederholt „selbst" aus dem H1, listet drei Eigenschaften hintereinander und
läuft bei 36px über zwei Zeilen. Die neue Zeile ist das Produktprinzip selbst,
vier Wörter, und trägt die Heading-Pair-Regel ohne Bruch.

Der Kicker fällt weg: „Vom Test bis zur täglichen Routine" sagt genau das, was die
Subline jetzt sagt.

### 4.2 Protagonisten-Band

| Feld | Neu |
|---|---|
| Heading (h2) | Womit du anfängst |
| Subline | *(leer)* |
| Kicker | *(leer)* |

**Karte AGE & DNA-Test** (`sheet`)

| Feld | Neu |
|---|---|
| Kicker | Aktionspreis bis 30. August |
| Titel | AGE & DNA-Test |
| Nutzenzeile | Eine Speichelprobe zeigt, wie schnell du alterst, dazu 23 genetische Kategorien. Ergebnis nach 6 Wochen. |
| Preis | 349 € (`price_from: false`), Streichpreis 449 € aus `compare_at_price` |
| Preisnotiz | Mit Ergebnisgespräch 449 € |
| CTA | Zum Test |

Der Kicker ist der einzige Fristhinweis der Seite und er ist echt: die Aktion
endet am 30.08., danach gelten 449 und 549. Kein Countdown, keine
Verfügbarkeitsbehauptung, nur das Datum. `price_from: false` ist nötig, weil
„ab 349 € statt 449 €" neben einer 449-€-Variante widersprüchlich läse; die
Premium-Variante steht stattdessen sauber in der Preisnotiz.

**Karte NMN Pulver** (`sheet`)

| Feld | Neu |
|---|---|
| Kicker | Nur zu Forschungszwecken |
| Titel | NMN Pulver |
| Nutzenzeile | Reines NMN-Pulver, Reinheit je Charge im Labor geprüft. Drei Größen. |
| Preis | ab 33,90 € |
| Abo-Zeile | im Abo ab 28,90 € (automatisch) |
| CTA | Größe wählen |

Der Kicker bleibt wortgleich, BJ-Entscheid. Er wandert nur von der Section-
Unterzeile auf die Karte, weil NMN keine eigene Gruppe mehr ist. Die „Chemikalie"-
Auszeichnung entfällt ersatzlos. Eine Verbrauchsdauer steht bewusst nicht auf der
Karte, siehe §4.1. CTA „Größe wählen" statt „Zum Produkt", weil drei Größen
existieren und das der nächste Schritt ist.

**Zeile AGE-Folgetest** (`row`)

| Feld | Neu |
|---|---|
| Kicker | *(leer)* |
| Titel | AGE-Folgetest |
| Nutzenzeile | Für alle, die schon getestet haben. Miss deinen Fortschritt nach 6 bis 12 Monaten. |
| Preis | 299 € |
| Bewertung | aus (`show_rating: false`) |
| CTA | In den Warenkorb |

### 4.3 Nährstoff-Register

| Feld | Neu |
|---|---|
| Heading (h2) | Nährstoffe |
| Subline | Nach dem Test gezielt ergänzen. |
| Kicker | *(leer)* |

Gruppenmarken: **Zellfunktion** · **Basisversorgung** · **Haut, Gelenke, Schlaf**

Zeilentitel und Nutzenzeilen:

| Titel | Nutzenzeile |
|---|---|
| Resveratrol | Polyphenol aus der Weinrebe, in Studien zur Zellalterung untersucht. |
| Fisetin | Flavonoid aus Erdbeeren, Gegenstand der Senolytika-Forschung. |
| Spermidin | Aus Weizenkeimen, wird in der Autophagie-Forschung untersucht. |
| CaAKG | Alpha-Ketoglutarat als Calciumsalz, Baustein im Zellstoffwechsel. |
| TMG (Betain) | Methylgruppen-Spender, wird häufig zusammen mit NMN genommen. |
| Kreatin | 300 g Monohydrat für Muskeln und Zellenergie. |
| Vitamin B-Komplex | Alle acht B-Vitamine in aktiver Form. |
| Vitamin D3 + K2 | Spray für Knochen und Immunsystem, mit K2 kombiniert. |
| Hyaluron | Für Gelenke und Haut von innen. |
| Schlafspray | Melatonin als Spray, zum Einschlafen. |

Die Zeilen zu Resveratrol, Fisetin und Spermidin sind bewusst als
Forschungsgegenstand formuliert und nicht als Wirkung. Die heutigen Zeilen
(„Senolytikum · für gesundes Altern", „Autophagie · Zellreinigung aktivieren",
„zelluläre Langlebigkeit") sind Wirkaussagen mit Mittelpunkt-Interpunktion.
Kreatin trägt „300 g", weil dort die Packungsgröße echte Kaufinformation ist; das
ist die Stelle, an der ein früherer Badge-Inhalt sinnvoll aufgehoben ist.

### 4.4 Register-Leiste (`lt-katalog-index`)

| Feld | Neu |
|---|---|
| Heading | Wonach suchst du? |
| Subline | Dieselben Produkte, nach Ziel sortiert. |

Linkbeschriftungen sind die Kollektionstitel, unverändert, plus die Anzahl wie im
Register-Index: Bestseller · Nährstoffe · Basisversorgung · Energie & Stoffwechsel ·
Fokus & Regeneration · Immun- & Zellschutz · Haut & Jugendlichkeit ·
Kraft & Beweglichkeit · Bundles

### 4.5 Meta

| Feld | Neu |
|---|---|
| SEO-Titel | `Alle Produkte \| LIFETIME` (unverändert) |
| Meta-Description | Der AGE & DNA-Test und zehn Nährstoffe von LIFETIME. Preise, Bewertungen und Abo-Optionen auf einen Blick. |

Die Meta-Description ist die Kollektionsbeschreibung von `all` und wird im
Shopify-Admin geändert, nicht im Theme. Der heutige Text beschreibt Zellalterung,
nicht einen Katalog (D13).

---

## 5. Bewusst nicht geändert

- **Bundle-Builder und Kollektions-Taxonomie.** Auf Ansage. Welche Kollektion
  welches Produkt enthält, bleibt wie es ist; die Register-Leiste verlinkt nur,
  was ohnehin publiziert ist.
- **„Nur zu Forschungszwecken" am NMN.** BJ-Entscheid, wortgleich übernommen.
- **Der Widerspruch NMN-Katalogkategorie gegen NMN-PDP-Sprache.** Bewusste
  Inkonsistenz seit 23.07., laut CLAUDE.md nicht eigenmächtig zu korrigieren.
  Gehört ins Tag-eins-Paket zum EU-Rechtsakt.
- **`link_behavior: cart`, also der Direktkauf aus der Karte.** Dokumentierter
  BJ-Entscheid mit der Begründung, dass die PDPs nicht für alle Produkte fertig
  sind. Bleibt so, inklusive der beiden Handle-Ausnahmen. Siehe aber §7.1.
- **Die Bewertungsquelle Loox** und die Tatsache, dass 3 von 18 Produkten keine
  Bewertung haben. Fehlende Bewertung heißt: nichts rendern, nie schätzen.
- **`compare_at_price` am AGE&DNA-Test.** Steht live korrekt (349/449 und
  449/549) und wird nicht angefasst. Am 31.08. müssen 449 und 549 real gelten,
  das ist ein Kalendertermin, keine Theme-Aufgabe.
- **Die fünf aktiven Produkte, die nicht in `all` sind** (Astaxanthin, NAD⁺
  liposomal, drei Bundles). Das ist Kollektionszugehörigkeit, also Taxonomie.
- **Header, Footer, Ankündigungsleiste, Cookie-Banner, Loox- und
  Appstle-Einbindung.** Nichts davon gehört zu dieser Fläche.
- **Alle Produkttemplates und PDPs.** Diese Spec fasst keine PDP an.
- **Die Klemmung der Registerzeilen auf zwei Zeilen Nutzenzeile.** Sie hält das
  121px-Raster und bleibt.

---

## 6. Push-Reihenfolge

Grundregel: **Sections und Snippets vor Templates.** Ein Template, das eine noch
nicht hochgeladene Section referenziert, rendert nicht mit einem Fehler, sondern
**still leer** und liefert dabei HTTP 200. Das gilt hier doppelt, weil
`templates/collection.json` bereits lokal auf `lt-collection-register` umgestellt
ist und diese Section noch gar nicht live ist. Ginge das Template zuerst raus,
wären alle 12 Kollektionsseiten sofort leer.

**Vor dem ersten Push:** Liquid gegen einen laufenden `shopify theme dev` per
`curl` prüfen. `theme-check` rendert nicht und findet diese Klasse Fehler nicht.
Nach dem Dev-Server-Lauf `config/settings_data.json` diffen, der Dev-Server löscht
dort App-Embeds.

**Ob der Theme Manager automatisch committet, vorher prüfen.** Er pusht nur,
solange die App tatsächlich läuft. Wenn nicht, von Hand pushen, mit
`--allow-live`, in Vierer-Batches.

| Schritt | Datei | Warum in dieser Position |
|---|---|---|
| 1 | `snippets/lt-product-card.liquid` (neu) | Beide Sections rendern es, es muss zuerst da sein |
| 2 | `sections/lifetime-collection-grid.liquid` | Neue Settings und Blocktypen müssen im Schema stehen, bevor ein Template sie schreibt |
| 3 | `sections/lt-collection-register.liquid` (neu, ungepusht) | Voraussetzung für `collection.json` |
| 4 | `sections/lt-katalog-index.liquid` (neu) | Voraussetzung für `collection.katalog.json` |
| — | **Batch-Grenze, hier verifizieren** | `/collections/all` und eine beliebige Kollektionsseite live abrufen, beide müssen noch den alten Stand rendern und nicht leer sein |
| 5 | `templates/collection.katalog.json` | Aktiviert den neuen Katalog |
| 6 | `templates/collection.json` (ungepusht) | Aktiviert das Register auf den 12 übrigen Kollektionen |

**Nach dem Push:**

1. `/collections/all` bei 1440 und 390 nachmessen: keine horizontale Scrollfläche,
   keine 30px-Bedienelemente, Badges weg, Preise in der neuen Stufe, Abo-Zeile am
   NMN, Streichpreis am AGE&DNA-Test.
2. Eine Kollektionsseite mit Beschreibung (`bestseller`) und eine ohne (`nmn`)
   abrufen, beide müssen das Register rendern.
3. `basisversorgung` muss im Register-Index auftauchen.
4. Live-Cache abwarten, 2 bis 3 Minuten.
5. `docs/collection-all-spec.md` mit dem tatsächlich Gebauten abgleichen und
   `last_review` bumpen. Danach den Surface-Brief
   `.impeccable/surfaces/templates-collection-json.md` nachziehen: er führt den
   Rating-Lesefehler in `lifetime-collection-grid.liquid:244` noch als offen und
   die Badge-Frage als bewusst unangetastet.

**Ein Detail, das leicht Geld kostet:** sobald eine Section ein `anchor_id`
bekommt, zielt ihr Style-Block auf `#section-<id>`, der Wrapper rendert aber
`#<anchor_id>` — die Paddings fallen still weg. Da die Sprungmarken-Nav entfällt,
braucht auf dieser Seite keine Section einen Anker. Falls doch einer gesetzt wird,
vorher die Padding-Regel mitziehen.

---

## 7. Offene Punkte für BJ

**7.1 Karte kaufen oder Karte öffnen?** Heute fangen 11 von 13 Karten den Klick auf
die gesamte Fläche ab und legen die erste Variante in den Warenkorb. Über den
Katalog ist damit keine einzige Supplement-PDP erreichbar. Vorschlag, der die
Entscheidung nicht umdreht, sondern ergänzt: **die CTA-Pille legt in den Warenkorb,
die restliche Zeile führt zur PDP.** Das behält den Direktkauf als sichtbarste
Handlung und gibt dem Zweifler einen Weg. Braucht dein Ja, weil es die
`link_behavior`-Entscheidung berührt. Ohne dein Ja bleibt alles wie heute.

**7.2 Die doppelte Bewertung am Folgetest.** Er hat keine eigenen Loox-Daten, das
Liquid leiht ihm die des AGE&DNA-Tests. In dieser Spec ist die Folgetest-Zeile
über `show_rating: false` bewertungsfrei, das Problem verschwindet damit auf
dieser Seite. Die Leihkonstruktion selbst steht weiter im Code und wirkt überall
sonst. Streichen oder lassen?

**7.3 Bundles in der Register-Leiste.** Du hast Bundles als Nicht-Thema markiert.
Die Kollektion existiert live mit 3 Produkten. Sie ist in §2 verlinkt, weil ein
Link keine Bundle-Arbeit ist. Sag Bescheid, wenn sie raus soll, das ist ein Block
weniger.

**7.4 Ein Claim braucht deinen Blick.** „Reinheit je Charge im Labor geprüft" am
NMN. Steht so sinngemäß auf der PDP (`lt-pdp-laborwerte`), also belegt. Auf der
Katalogkarte steht er ohne den Prüfbericht daneben. Wenn dir das zu nackt ist,
kürze auf „Reines NMN-Pulver. 30 g reichen etwa zwei Monate."

---

## 8. Umsetzung 2026-08-19: was anders kam als geplant

Gebaut, gemessen und gegen eine unveröffentlichte Theme-Kopie verifiziert. Elf Punkte
weichen von §2 bis §6 ab, jeder mit Grund.

**8.1 Alle drei hellen Bänder stehen auf Paper A, nicht Paper B.** §2 sah für das
Nährstoff-Register Paper B `#f2f1ed` vor. Das Bildwell der Karte ist selbst Paper B; auf
einem Paper-B-Grund verschwindet es, und damit der Fix für D9. Die Bänder unterscheiden
sich jetzt durch Material (Papier gegen Linien), nicht durch zwei Beigetöne, die bei
diesen Flächengrößen ohnehin niemand auseinanderhält. Der Flächenwechsel liegt beim
Slate-Band.

**8.2 Es gibt eine vierte Variante, `sheet-wide`.** Der hervorgehobene Registereintrag
steht in einer Zeilenliste; das hochformatige `sheet` hätte deren Fluss gebrochen.
`sheet-wide` ist dasselbe Papier, nur liegend: 144px Well links, Text, Schwanz rechts.
Gemessen bei 1440 und 390, kein Überlauf.

**8.3 Das Zeilen-Well bleibt mobil bei 88px.** §3.6 sagte 72px. Das Register hat 88px
bereits mit der Begründung gemessen, dass zwölf ähnliche Präparatdosen bei 72px als
Textur statt als Produkte lesen. Ein geprüfter Wert schlägt eine Schätzung.

**8.4 Der Streichpreis ist ink-muted, nicht Gray 400.** DESIGN.md lässt Gray 400 für
durchgestrichene Vergleichspreise zu, es misst auf Papier aber 2,35:1. Ein Ankerpreis,
den man nicht lesen kann, tut seine Arbeit nicht. ink-muted hält 5,01:1 und bleibt in
der Ink-Familie.

**8.5 Die Outline-Pille trägt eine volle Slate-Kante.** `--color-border-strong` misst auf
Weiß rund 1,2:1 und ist damit keine erkennbare Bedienelement-Kante (WCAG 1.4.11 will 3:1).

**8.6 Die Abo-Zeile erscheint auf acht Nährstoffen, nicht nur auf NMN.** Beim Bauen kam
heraus, dass acht Supplements echte Appstle-Pläne mit 10 % haben (26,91 / 22,41 / 13,41
und so weiter, alle gegen die Storefront geprüft). Die Karte zeigt, was existiert. Wenn
das nicht beworben werden soll, ist `show_subscription: false` am Block der Hebel.

**8.7 Zwei Sections mussten einen geerbten Außenabstand abschalten.** Die Theme-Klasse
`container--vertical-space` bringt 50px mit; zwei Bänder ergaben 100px, gemessen standen
213px zwischen der letzten Zeile und der nächsten Überschrift. Der Abstand liegt jetzt in
den Paddings der Section, gemessen 81px zwischen den Kapiteln.

**8.8 Das Kartenbild wird von Hand als `<img>` geschrieben.** `image_tag` legt auch ohne
`widths` eine srcset an; ohne `sizes` nimmt der Browser 100vw als Slot und zieht die
größte Kandidatin. Gemessen: 1440px breite Bilder in 80px-Feldern. Jetzt eine feste
Quelle in doppelter Feldbreite (440 / 288 / 176).

**8.9 `lt-science-hero` rendert ohne Bild keine Bildspalte mehr.** Vorher kam ein grauer
Platzhalterkasten. Der Platzhalter ist eine Editor-Hilfe und erscheint jetzt nur noch bei
`request.design_mode`. Betrifft auch `/pages/science-hub` und `/pages/nmn-deutschland`, dort
in dieselbe Richtung.

**8.10 Der Push lief nicht über den Shopify-CLI.** `accounts.shopify.com` löst von diesem
Rechner nicht auf, das gecachte Token war um 09:09 UTC abgelaufen und konnte sich nicht
erneuern. Damit fielen `shopify theme dev` und `shopify theme push` aus. Verifiziert wurde
gegen eine unveröffentlichte Kopie des Live-Themes über die Admin-API, jede Datei per md5
gegen das Repo geprüft. Der Push selbst läuft über den Theme Manager aus dem lokalen Stand.
Die Push-Reihenfolge aus §6 bleibt gültig, `settings_data.json` ist unberührt, weil nie
ein Dev-Server lief.

**8.11 Das Register ist statisch verifiziert, nicht gerendert.** Die gemeinsame Karte
selbst ist auf `/collections/all` über 13 Karten und zwei Breiten gemessen, und die
Variante `sheet-wide` wurde im DOM gegengeprüft. Für `sections/lt-collection-register.liquid`
liegen Schema-Validität, Tag-Balance, JS-Syntax und die Prüfung auf verwaiste Variablen und
Selektoren vor, aber kein Render-Test. **Nach dem Push zuerst `/collections/nmn` und
`/collections/bestseller` ansehen.**

**8.12 Die Nährstoffe sind ein Kachelraster, keine Zeilenliste.** §2 hatte Zeilen
vorgesehen, weil eine einspaltige Liste bei Gruppengrößen von 5/3/2 keine Löcher
bekommt. Im direkten Vergleich am Bildschirm (BJ-Entscheid) hat das Raster gewonnen:
in der Zeile ist das stärkste Element pro Produkt der Text, das Präparat selbst sitzt
als 88px-Miniatur links, und beim Umsehen erkennt man ein Präparat am Packshot. Bei
1440 stehen jetzt rund sieben Produkte in einer Ansicht statt fünf, und zwar als
Produkte. Der Preis dafür ist ehrlich: die Seite wächst von 3589 auf 4974px, und zwei
Gruppen lassen eine kurze Schlussreihe (desktop Zellfunktion 3+2 und Haut/Gelenke/Schlaf
2, mobil zusätzlich zwei Waisen). Diese Lücken sind eine Folge der Gruppengrößen, nicht
des Rasters; jede mehrspaltige Anordnung hat sie bei 5/3/2. Wer sie weghaben will,
ändert die Gruppen, nicht das Layout.

Die Kachel trägt keinen weißen Kasten. Papier bleibt den zwei Protagonisten
vorbehalten (Paper-Regel), die getönte Bildfläche trägt die Kachel, getrennt wird über
den Rasterabstand.

**8.13 Zwei Spalten halten mobil bis zum schmalsten Telefon.** Die Section hatte einen
599px-Breakpoint auf einspaltig geerbt. Gemessen bei 390: die Seite wächst von 6498 auf
8120px und man sieht ein Produkt pro Blick. Der Breakpoint ist entfernt, bei 390 sind
die Kacheln 172px breit.

### Nicht umgesetzt

- Der Vorschlag aus §7.1 (CTA kauft, Zeile öffnet die PDP) ist offen. `link_behavior: cart`
  gilt unverändert, alle Nährstoffzeilen kaufen direkt.
- Die Meta-Description aus §4.5 ist Kollektionstext im Admin und wurde nicht angefasst.
- Die Hero-Unterzeile rendert mit `rgba(38,37,30,0.55)` statt der in PRODUCT.md
  festgelegten 0,72. Der Wert steht fest in `lt-science-hero` und wirkt auf zwei weitere
  Seiten, deshalb außerhalb dieses Scopes gelassen. Bei 36px trägt er die
  Large-Text-Grenze.
- `assets/lt-product-card.css` wird auf dem Katalog zweimal per `stylesheet_tag`
  eingebunden, weil beide Bänder dieselbe Section sind. Zwei identische `<link>`, ein
  Abruf, keine doppelte Anwendung. Belassen.
