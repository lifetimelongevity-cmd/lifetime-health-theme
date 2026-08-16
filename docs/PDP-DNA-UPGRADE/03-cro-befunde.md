---
status: snapshot
last_review: 2026-08-14
canonical_for: pdp-age-dna-cro-messung
depends_on:
  - docs/PDP-DNA-UPGRADE/01-rmbc-kontext.md
  - docs/PDP-DNA-UPGRADE/02-massnahmen.md
---

# AGE&DNA-PDP: CRO-Befunde, gemessen

Messung vom 14.08.2026 gegen `https://www.lifetime-health.de/products/lifetime-age-dna`.

**Was hier drin steht:** Zahlen aus GA4 und Shopify, gemessene Layout-Werte bei 375 px, und die
Befunde, die sich daraus ergeben. Also die Geräte-, Layout- und Messebene.

**Was hier nicht drin steht:** Angle, Mechanismus, Offer, Proof-Substanz. Das ist
[`01-rmbc-kontext.md`](01-rmbc-kontext.md) und [`02-massnahmen.md`](02-massnahmen.md). Die beiden
Ebenen überschneiden sich kaum: 01/02 fragen, ob die Seite das Richtige sagt, dieses Dokument fragt,
ob die Seite auf dem Gerät ankommt, auf dem sie gelesen wird. Bei Konflikt gilt die Reihenfolge aus
dem README, Live schlägt MD.

Als `snapshot` angelegt: die Zahlen altern, sie werden nicht nachgepflegt. Wer sie neu braucht,
nimmt die Methodik in §6.

**§1 bis §7 sind der Stand vor dem Push vom 14.08. 17:02.** Die aktuellen Layoutwerte stehen in
[§8](#8-nachtrag-neumessung-nach-m1-bis-m3), dort auch die neue Reihenfolge der offenen Maßnahmen.

---

## 1. Messwerte

### Traffic und Conversion, 90 Tage (GA4, Property 429510542)

| Kennzahl | Wert |
|---|---|
| PDP-Aufrufe | 1.013 |
| davon mobil / Desktop / Tablet | 739 / 254 / 20 |
| Add-to-Cart auf der PDP | 40 |
| **ATC-Rate gesamt** | **3,95 %** |
| **ATC-Rate mobil** | **2,84 %** (21 von 739) |
| **ATC-Rate Desktop** | **7,09 %** (18 von 254) |
| Sessions auf der PDP | 672 |
| Bounce-Rate | 8,6 % |
| Engagement | 17.089 s gesamt, **16,9 s je Aufruf** |

### Bestellungen (Shopify, 90 Tage)

| Kennzahl | Wert |
|---|---|
| Bestellungen AGE&DNA | 18 |
| **ATC → Bestellung** | **45 %** |
| Netto je Test | 293,28 € (349 € brutto), mit Quiz-Code 263,95 € |
| Netto gesamt | 6.029,79 € |
| Verlauf 120 Tage | 20 Bestellungen, stabil 1 bis 2 pro Woche |
| Premium-Variante 449 € | 0, existiert erst seit 14.08. |

### Einstiegs-Sessions nach Kanal (Landing = PDP, 90 Tage)

| Kanal | Sessions | ATC | Käufe |
|---|---|---|---|
| Direct | 263 | 12 | 3 |
| Organic Search | 70 | 3 | 1 |
| **Paid Search** | **41** | **0** | **0** |
| AI Assistant | 19 | 0 | 0 |
| Rest (Unassigned, Referral, Email, Social) | 43 | 0 | 0 |

### Layout bei 375 px Viewportbreite, 812 px Höhe

Seitenhöhe **16.933 px**, das sind **20,8 Bildschirmhöhen**.

| Section | Höhe px | beginnt bei px |
|---|---|---|
| lt-pdp-hero | 1.635 | 85 |
| crs-logo-garden | 416 | 1.720 |
| crs-metrics-row | 793 | 2.136 |
| crs-feature-grid | 1.823 | 2.929 |
| lt-pdp-report-preview | 1.129 | 4.752 |
| crs-expert-quotes | 1.348 | 5.881 |
| lt-comparison-table | 957 | 7.229 |
| crs-customer-reviews | 811 | 8.186 |
| lt-pdp-ideal-candidate | 759 | 8.997 |
| crs-faq-accordion | 1.144 | 9.756 |
| crs-risk-free-close | 1.052 | 10.900 |
| **Loox (apps)** | **3.934** | 11.992 |

Positionen im Hero: Galerie 109 (363 hoch), Bewertungszeile 494, H1 530, Paketwahl 879,
Preis 1.068, CTA-Button 1.192.

---

## 2. Der Befund

**73 % des Traffics ist mobil und konvertiert bei 40 % der Desktop-Rate.** Der Weg hinter dem
Warenkorb ist gesund (45 % ATC → Bestellung), das Leck sitzt vollständig auf der Seite. Eine Seite
mit 20,8 Bildschirmhöhen bekommt 16,9 Sekunden pro Aufruf. Alles unterhalb der Buy-Box wird vom
Durchschnittsbesucher nicht gelesen, egal wie gut es formuliert ist.

Daraus folgt die Priorität: erst das Mobil-Erlebnis und die Seitenlänge, dann die Copy-Substanz aus
[`02-massnahmen.md`](02-massnahmen.md). Andernfalls wird geschärfte Copy in Flächen eingebaut, die
nie gesehen werden.

**Größenordnung, damit die Erwartung stimmt.** 672 Sessions in 90 Tagen sind 7,5 Besucher am Tag.
Die PDP ist nicht der bindende Umsatz-Constraint, Traffic ist es. Mobil von 2,84 % auf 4,5 % wären
rechnerisch +5,5 Bestellungen je 90 Tage, also rund +6.500 € netto im Jahr. Das ist der ehrliche
Deckel dieser Arbeit.

---

## 3. Befunde einzeln

### C1. Vergleichstabelle ist auf Mobil unsichtbar

Bei 375 px zeigt `lt-comparison-table` die LIFETIME-Spalte plus einen wenige Millimeter breiten
Streifen der zweiten. Kein Fade, kein Wisch-Hinweis, kein sichtbarer Scrollbalken. Die Kernaussage
der Section („Nur einer misst beide Ebenen") existiert für 73 % des Traffics nicht.

Die erste Spalte bleibt beim horizontalen Scrollen stehen, die Mechanik funktioniert also. Es fehlt
ausschließlich die Einladung, sie zu benutzen.

Minimalfix: Gradient-Fade rechts plus Zeile „Wischen für den Vergleich".
Richtiger Fix: unter 700 px auf Zeilen-Vergleich umbauen, pro Merkmal eine Karte.

### C2. Zwischen den beiden CTAs liegen 9.700 px

Hero-CTA bei 1.192, nächster Kauf-Button erst im `crs-risk-free-close` bei 10.900. Dazwischen nur
die Sticky-Leiste. Fehlend sind CTA-Bänder nach der Vergleichstabelle und nach den Kundenstimmen,
also genau dort, wo die Seite ihre Argumente abgeschlossen hat.

### C3. Loox-Block ist ein 3.934-px-Schwanz hinter dem letzten CTA

23 % der Seitenhöhe, nach dem Abschluss, ohne CTA danach. Inhaltlich doppelt er die kuratierten
Stimmen aus `crs-customer-reviews`. Auf sechs Bewertungen deckeln mit Nachladen, Kauf-Button danach
wiederholen.

### C4. Mid-Page-Exit im Interessenhoch

`crs-feature-grid` endet mit „Alle Details ansehen" → `/pages/was-ist-enthalten`. Das schickt Leute
genau dann von der Seite, wenn sie gerade verstanden haben, was sie bekommen, und es gibt keinen
Rückweg. Als Accordion in die Section holen oder streichen.

### C5. Abschluss-Section liefert nichts Neues

`crs-risk-free-close` nutzt exakt das Hero-Motiv. Nach 20 Bildschirmen ist der Abschluss visuell
eine Wiederholung des Anfangs. Zusätzlich überlappt das Badge „EUROFINS LABORANALYSE" im Bild das
Wort „DNA" des Wortmarks, sichtbarer Kollisionsfehler.

### C6. Elf Sections stehen alle auf `heading_size: feature`

Geprüft im Template: `logo_garden`, `metrics_row`, `feature_grid`, `report_preview`,
`customer_reviews_test`, `ideal_candidate`, `faq_accordion`, `risk_free_close` und die übrigen tragen
denselben Wert. Damit gibt es zwischen den Sections keinerlei Größenhierarchie, alles ist gleich
laut. Das ist exakt der Hebel aus `01-rmbc-kontext.md` §4 („Hierarchie ausschließlich über
heading_size"), nur wird er derzeit nicht benutzt.

Vorschlag: Beweis-Sections auf `section`, nur Vergleich und Abschluss auf `feature`.

### C7. Hero-Stack drückt die Differenzierung an die Faltkante

Die Tagline rendert in nahezu H1-Größe. Headline plus Tagline belegen zusammen 270 px. Die drei
Bullets, die die eigentliche Differenzierung tragen („Andere Tests zeigen eine Ebene. Du bekommst
beide."), beginnen bei 760 px, also am unteren Rand des ersten Bildschirms.

Tagline auf Fließtextgröße, ein Bullet nach oben. Deckt sich mit der Regel aus
[[feedback_copy_confident_no_meta]]: Heading plus Subline mobil ein bis zwei Zeilen.

### C8. Zwei Sections sagen dasselbe

`crs-feature-grid` (1.823 px, 6 Karten) und `lt-pdp-report-preview` (1.129 px, 4 Karten) zählen beide
biologisches Alter, DNA-Kategorien, epigenetische Bereiche und AI Coach auf. 2.950 px Mobilscroll für
einen Gedanken. Zusammenlegen spart rund 1.200 px.

### C9. Die 449-€-Option gibt keinen Grund zum Upgrade

Die 349 € tragen einen Anker (399 € durchgestrichen, „Du sparst 50 €"), die 449 € tragen nichts, weil
die Variante bewusst keinen `compareAtPrice` hat (siehe `01-rmbc-kontext.md` §0). Gelesen wird:
100 € Aufpreis für ein Telefonat.

**Kein Datenbefund.** Die Variante existiert seit 14.08., in diesem Fenster wurde der Test null Mal
verkauft. Es gibt noch keinen Messwert zur Attach-Rate, nur ein Darstellungsproblem.

Offen bei BJ: Einzelpreis eines 45-Minuten-Ergebnisgesprächs. Ohne echte Zahl wird kein Anker
gebaut, dann läuft es über die Delta-Rahmung („nur 100 € mehr").

### C10. Paid Search landet, kauft aber nicht

41 Einstiegs-Sessions, 0 ATC, 0 Käufe. Passt zum offenen Punkt 7 in
[`02-massnahmen.md`](02-massnahmen.md), misst ihn aber von der anderen Seite: dort geht es um die
Quiz-LP als Ziel, hier ist belegt, dass auch die PDP als Ziel bisher nichts trägt. Beide Ziele sind
damit ungeprüft wirkungslos, die Entscheidung „Quiz oder PDP" braucht einen echten Test.

### C11. Sterne und Daten in den Kundenstimmen sind gesetzt, nicht gemessen

Die acht `review`-Blöcke in `templates/product.age-dna-test.json` tragen je einen Sternewert
(`rating: 5` beziehungsweise `4`) und ein Datum („März 2026", „Februar 2026" und weitere). Dazu trägt
jede Karte `verified: true`.

Die **Texte sind echt**, sie stehen wortgleich im Loox-Metafeld `loox.reviews`. Sterne und Daten
stehen dort nicht, die sind händisch gesetzt.

Das ist der Anhang zu § 3 Abs. 3 UWG (Nr. 23b, Bewertungsangaben ohne angemessene Prüfung), also die
per-se-Liste, kein Abwägungsfall. Es widerspricht außerdem der Regel, die für den Loox-Zweig
derselben Section bereits gilt (siehe `docs/live-pages-map.md`, Abschnitt Kundenstimmen).

Fix: `rating` und `date` in den acht Blöcken leeren, Text und Name bleiben stehen.

---

## 4. Maßnahmen, nach Hebel

Spaltenlogik wie in [`02-massnahmen.md`](02-massnahmen.md): „Assistent" heißt baubar mit vorhandenem
Material, „BJ" heißt, es fehlt eine Festlegung oder eine Zahl.

| # | Maßnahme | Befund | Aufwand | Entscheid |
|---|---|---|---|---|
| 1 | Vergleichstabelle mobil lesbar machen | C1 | mittel | Assistent |
| 2 | Zwei CTA-Bänder einziehen | C2 | klein | Assistent |
| 3 | Loox deckeln, CTA dahinter | C3 | klein | Assistent |
| 4 | `heading_size` differenzieren | C6 | klein | Assistent |
| 5 | Hero-Stack verdichten | C7 | klein | Assistent |
| 6 | Feature-Grid und Report-Preview zusammenlegen | C8 | mittel | Assistent |
| 7 | Mid-Page-Exit auflösen | C4 | klein | Assistent |
| 8 | Abschluss-Bild tauschen, Badge-Kollision fixen | C5 | klein | Assistent |
| 9 | Sterne und Daten aus den Review-Blöcken | C11 | klein | Assistent |
| 10 | Anker auf der 449-€-Option | C9 | klein | BJ (Einzelpreis) |
| 11 | Ads-Ziel entscheiden und testen | C10 | klein | BJ |

Maßnahmen 1 bis 3 zuerst. Sie adressieren den Mobil-Desktop-Abstand direkt und ändern keine Aussage
der Seite, sind also unabhängig von der laufenden Copy-Arbeit baubar.

---

## 5. Konflikt mit dem bestehenden Paket

`01-rmbc-kontext.md` §4 und `02-massnahmen.md` § Nicht angefasst legen fest: **die
Section-Reihenfolge ist approbiert und wird gefüllt, nicht umgeworfen.**

Die Messung spricht dagegen. Zwischen Buy-Box und der ersten Section, die sagt was man bekommt,
liegen 1.209 px: `crs-logo-garden` (416) plus `crs-metrics-row` (793). Das sind „wer sind wir" und
„wie läuft es ab", beide vor „was bekomme ich". Der Prozess ist ein Reibungslöser und wirkt hinter
dem Verlangen stärker als davor.

Vorschlag, falls die Sperre fällt: Hero → Logos (einreihig) → Feature-Grid → Vergleich →
Report-Preview → Kundenstimmen → Prozess → Experten → Ideal-Candidate → FAQ → Abschluss → Loox.

**Das ist ein BJ-Entscheid, keine Empfehlung zum Selbermachen.** Bis dahin gilt die approbierte
Reihenfolge, und die Maßnahmen 1 bis 9 funktionieren auch ohne Umbau.

---

## 6. Methodik, für die Wiederholung

**GA4** (Property `429510542`, MCP `analytics-mcp`):
- Aufrufe und Geräte: `pagePath` exakt `/products/lifetime-age-dna`, Dimensionen `eventName` und
  `deviceCategory`, Metrik `eventCount`, gefiltert auf `page_view`, `view_item`, `add_to_cart`
- Kanäle: Dimension `sessionDefaultChannelGroup`, Filter auf `landingPage`, Metriken `sessions`,
  `addToCarts`, `checkouts`, `ecommercePurchases`
- **Stolperstein:** ein Filter auf `pagePath CONTAINS` zieht Dutzende `web-pixels@…`-Pfade mit rein,
  die dieselbe Slug-Endung tragen. Immer `EXACT` verwenden.

**Shopify** (MCP `run-analytics-query`):
- `FROM sales SHOW orders, net_sales GROUP BY product_title, product_variant_title SINCE -90d`
- `net_sales` ist netto ohne USt: 349 € brutto erscheinen als 293,28 €, mit Quiz-Code als 263,95 €

**Layout** (Browser-Pane, `resize_window` Preset `mobile`, 375 × 812):
- Section-Höhen per `getBoundingClientRect()` über alle `[id^="shopify-section-"]`
- **Stolperstein:** breite Selektoren wie `[class*="sticky"] [class*="price"]` treffen versteckte
  Alt-Knoten (`data-update-block="price-sticky-main"`) und liefern veraltete Preise. Der sichtbare
  Sticky-Preis hängt an `#lt-sticky-atc [data-js-atc-price]`. Die Paketwahl synchronisiert Sticky
  und CTA korrekt, das wurde geprüft und ist **kein** Fehler.

---

## 7. Status

Nichts davon ist gebaut. Reines Analyse-Dokument, kein Änderungsstand am Theme.

**Überholt durch §8.** Maßnahmen 1 bis 3 sind seit dem Push 14.08. 17:02 live, Maßnahme 9 liegt
lokal und ist nicht gepusht. Die Zahlen in §1 bleiben als Vorher-Stand stehen.

---

## 8. Nachtrag: Neumessung nach M1 bis M3

Gemessen am 14.08.2026 nach dem Push um 17:02 (Commit `5ae600b`), Methodik exakt nach §6.
Theme `lifetime-genesis-2026-APR` (ID 192529400183, `role: main`), also die Live-Fassung.

Die Zahlen in §1 sind der Vorher-Stand vom selben Tag, gemessen vor dem Push. Sie werden nicht
überschrieben.

### 8.1 Was seit §1 gebaut wurde

| | Maßnahme | Live | Nachweis |
|---|---|---|---|
| M1 | Vergleichstabelle mobil | ja | `lct-scroll-wrap--cards`, kein Knoten mit `scrollWidth > clientWidth` |
| M2 | Drei CTA-Bänder | ja | 3 × `lt-pdp-final-cta` im `order`-Array |
| M3 | Loox von 20 auf 6 | ja | `data-limit="6"` am `#looxReviews` |
| M9 | Sterne und Daten raus | **nein** | Template lokal auf `rating: 0`, live rendern 40 Sterne und acht `cr-date` |

M1 ist nicht der Minimalfix aus C1 geworden, sondern der richtige Fix: pro Merkmal eine Karte, alle
vier Anbieter untereinander. Deshalb wächst die Section, statt zu schrumpfen.

### 8.2 Layout bei 375 × 812, alt gegen neu

Seitenhöhe **16.688 px**, das sind **20,6 Bildschirmhöhen**. Vorher 16.933 px und 20,8.

| Section | alt px | neu px | Δ | beginnt bei |
|---|---:|---:|---:|---:|
| lt-pdp-hero | 1.635 | 1.635 | 0 | 85 |
| crs-logo-garden | 416 | 416 | 0 | 1.720 |
| crs-metrics-row | 793 | 793 | 0 | 2.136 |
| crs-feature-grid | 1.823 | 1.823 | 0 | 2.929 |
| lt-pdp-report-preview | 1.129 | 1.129 | 0 | 4.753 |
| **cta_band_report** | – | **367** | +367 | 5.882 |
| crs-expert-quotes | 1.348 | 1.348 | 0 | 6.249 |
| lt-comparison-table | 957 | **1.743** | **+786** | 7.597 |
| crs-customer-reviews | 811 | 811 | 0 | 9.340 |
| **cta_band_reviews** | – | **400** | +400 | 10.150 |
| lt-pdp-ideal-candidate | 759 | 759 | 0 | 10.550 |
| crs-faq-accordion | 1.144 | 1.144 | 0 | 11.310 |
| crs-risk-free-close | 1.052 | 1.052 | 0 | 12.453 |
| Loox (apps) | 3.934 | **1.736** | **−2.198** | 13.546 |
| **cta_band_loox** | – | **400** | +400 | 15.282 |
| Footer | 1.007 | 1.007 | 0 | 15.681 |

Die Rechnung geht sauber auf: −2.198 (Loox) +786 (Vergleich) +1.167 (drei Bänder) = −245 px, und
16.933 − 16.688 = 245. Jede andere Section ist auf den Pixel unverändert. Die Section-Reihenfolge ist
ebenfalls unverändert, die drei Bänder sind eingeschoben, nichts wurde getauscht.

**Die Seitenlänge ist damit praktisch gleich geblieben.** Das ist kein Fehlschlag, es ist ein Tausch:
2.198 px Wiederholung am Ende sind gegen 1.167 px Kaufaufforderung und 786 px lesbaren Vergleich
eingetauscht. Wer die Seite kürzen will, muss die Maßnahmen 5 bis 7 bauen, M1 bis M3 tun das nicht.

Hero-Innenleben unverändert: Galerie 109 (363 hoch), H1 530, Tagline 613, Bullets 761/789/836,
Paketwahl 875, CTA-Button 1.230. Der CTA-Wert in §1 lautet 1.192; die Hero-Gesamthöhe ist mit
1.635 px identisch, die 38 px sind also eine andere Ankerwahl in der Erstmessung, keine Änderung.

### 8.3 Abstand zwischen den CTAs

Vorher: ein einziger Sprung von 9.700 px, von 1.192 auf 10.900.

| von | nach | Abstand | Bildschirme |
|---|---|---:|---:|
| Hero-ATC 1.230 | Band Report 6.026 | **4.796** | 5,9 |
| Band Report 6.026 | Band Reviews 10.327 | 4.301 | 5,3 |
| Band Reviews 10.327 | risk-free-close 13.403 | 3.076 | 3,8 |
| risk-free-close 13.403 | Band Loox 15.458 | 2.055 | 2,5 |

Größte Lücke jetzt **4.796 px statt 9.700**, halbiert. Sie liegt zwischen Hero und erstem Band, also
über `logo_garden`, `metrics_row`, `feature_grid` und `report_preview`. Das ist genau die Strecke, die
Maßnahmen 5 bis 7 angreifen.

Der Rest der Seite hat jetzt alle 2.000 bis 4.300 px einen Kaufweg. Das Band nach Loox schließt C3
vollständig: der letzte Inhalt vor dem Footer ist ein CTA, kein Bewertungsschwanz.

### 8.4 Loox

**1.736 px, 10,4 % der Seite.** Vorher 3.934 px und 23 %.

Sechs Bewertungen plus Sterneverteilung und „Bewertung schreiben"-Button, geprüft per Screenshot.
Der Block ist nicht mehr der längste der Seite, sondern der viertlängste hinter Hero,
Vergleichstabelle und Feature-Grid.

### 8.5 Traffic, 90 Tage, GA4 Property 429510542

`pagePath` EXACT `/products/lifetime-age-dna`, Fenster 16.05. bis 14.08.2026.

| Kennzahl | §1 (14.08. vormittags) | jetzt |
|---|---:|---:|
| PDP-Aufrufe | 1.013 | 1.026 |
| mobil / Desktop / Tablet | 739 / 254 / 20 | 748 / 258 / 20 |
| Add-to-Cart | 40 | 40 (21 / 18 / 1) |
| ATC-Rate gesamt | 3,95 % | 3,90 % |
| ATC-Rate mobil | 2,84 % | 2,81 % |
| ATC-Rate Desktop | 7,09 % | 6,98 % |
| Sessions | 672 | 680 (491 / 178 / 11) |
| Bounce-Rate | 8,6 % | 8,2 % |
| Engagement je Aufruf | 16,9 s | 16,7 s |
| Bestellungen (Shopify) | 18 | 18, netto 6.029,79 € |

Einstiegs-Sessions nach Kanal: Direct 233 (9 ATC, 3 Käufe), Organic Search 54 (3, 1),
**Paid Search 32 (0, 0)**, AI Assistant 19 (0, 0), Rest 34 (0, 0). C10 bleibt unverändert bestätigt.

Das ist kein Nachher-Wert, es ist derselbe Vorher-Zustand mit einem Tag mehr Fenster. Die kleinen
Abweichungen sind das Rollieren des 90-Tage-Fensters, nicht die Maßnahmen. Warum das so bleiben
wird, steht in §8.7.

### 8.6 Lohnen sich Maßnahmen 4 bis 8 noch?

Alle fünf sind live geprüft und alle fünf sind unverändert offen. Die neue Baseline verschiebt
allerdings die Reihenfolge.

**M5, Hero-Stack verdichten: ja, jetzt die wichtigste.** Live nachgemessen steht die Tagline auf
36 px, exakt der H1-Größe, und belegt 124 px. Die drei Bullets beginnen bei 761. Der Hero ist mit
1.635 px die längste Section der Seite und die einzige, die 100 % der Besucher sehen. Die drei neuen
Bänder helfen nur denen, die scrollen. M5 wirkt eine Ebene davor.

**M7, Mid-Page-Exit auflösen: ja, dringender als vorher.** Der Link „Alle Details ansehen" auf
`/pages/was-ist-enthalten` steht bei 4.653. Vorher war das ein Ausgang irgendwo im Mittelfeld, jetzt
liegt 1.373 px dahinter ein Kaufband. Die Seite leckt Besucher unmittelbar vor ihrem eigenen
Abschlussmoment.

**M4, `heading_size` differenzieren: ja, unverändert billig.** Geprüft: alle 13 überschriftführenden
Sections stehen weiter auf `feature`, die drei neuen Bänder eingeschlossen. Mit 15 Content-Sections
statt 12 ist die Fläche flacher geworden, nicht ebener. Vorschlag aus C6 gilt weiter, mit einer
Ergänzung: die drei Bänder dürfen auf `feature` bleiben, sie sind Abschlüsse und stehen ohnehin auf
dunklem Teal.

**M6, Feature-Grid und Report-Preview zusammenlegen: ja, aber nach M7.** Siehe unten.

**M8, Abschlussbild und Badge-Kollision: ja, aber abgestuft.** Die Kollision ist per Screenshot
bestätigt, „EUROFINS LABORANALYSE" liegt weiter über dem „DNA" des Wortmarks. Der Abschlusswert der
Section ist allerdings gesunken: `crs-risk-free-close` ist nicht mehr der letzte Kaufmoment, dahinter
kommen Loox und ein weiteres Band. Der Badge-Fehler bleibt ein sichtbarer Handwerksfehler und wird
gefixt, aber er rutscht auf die Ebene von Maßnahme 9, nicht mehr auf die von 4 bis 7.

**Reihenfolge neu: M5, M7, M4, M6, M8.**

### 8.6.1 Kollidiert M6 mit `cta_band_report`?

**Strukturell nein.** Das Band hängt hinter `report_preview`, also hinter der Stelle, an der die Seite
zu Ende erklärt hat, was man bekommt. Werden Feature-Grid und Report-Preview zu einer Section, bleibt
diese Stelle dieselbe, das Band rückt nur um rund 1.200 px nach vorn. Die Ankerlogik überlebt den
Umbau.

**Drei reale Berührungspunkte, die beim Bauen zu beachten sind:**

1. **M6 macht M7 zur Vorbedingung.** Der Exit-Link liegt heute 1.373 px vor dem Band. Nach dem
   Zusammenlegen stünde er rund 300 bis 400 px darüber, also ein Weg von der Seite direkt neben dem
   Kaufbutton. Wer M6 ohne M7 baut, verschlimmert C4 statt es zu lösen.
2. **Die Band-Headline doppelt die H1.** `cta_band_report` trägt „Wie alt ist dein Körper?", wortgleich
   mit der Hero-H1. Bei 4.700 px Abstand fällt das nicht auf, nach M5 plus M6 wären es rund 3.500 px.
   Die Headline gehört ohnehin neu geschrieben, spätestens mit M6.
3. **Zwei Fußzeilen treffen aufeinander.** `report_preview` endet mit `format_note` und `retest_note`,
   das Band beginnt mit `trust_1`/`trust_2`. Nach dem Merge stehen drei Metadatenzeilen direkt
   übereinander. Das ist Copy-Arbeit, kein Layout-Konflikt, aber es fällt im Merge an.

### 8.7 Ab wann tragen die GA4-Zahlen?

Kurz: **nicht in Tagen und nicht in Wochen.**

Rechenbasis: 680 Sessions in 90 Tagen sind 7,6 am Tag, davon 5,5 mobil. Mobile Aufrufe liegen bei
8,3 am Tag. Mobile ATC-Rate 2,81 %, das sind 21 Ereignisse in 90 Tagen.

Für einen Zweistichprobentest auf Anteilen, α = 0,05 zweiseitig, Power 80 %:

| Zielgröße | nötig je Seite | Dauer je Seite | frühestens |
|---|---:|---:|---|
| mobil 2,81 % → 4,5 % (Ziel aus §2) | ~2.010 Aufrufe | ~240 Tage | Frühjahr 2027 |
| mobil 2,81 % → 5,6 % (Verdopplung) | ~780 Aufrufe | ~95 Tage | Mitte November 2026 |
| Bestellungen (18 je 90 Tage) | – | – | nie auf diesem Traffic |

Die Vorher-Seite ist bereits gemessen und steht in §1, also zählt nur die Nachher-Seite. Selbst bei
einer Verdopplung wäre der erste ehrliche Blick **Mitte November 2026**. Für den realistischen Zielwert
aus §2 ist es das Frühjahr. Bestellungen scheiden als Erfolgskriterium aus, 18 Stück je Quartal
liefern kein Signal, das man von Rauschen trennen kann.

**Dazu kommt ein Konfundierungsproblem, das kein Warten löst.** Am selben Tag ging die
Premium-Variante zu 449 € live, sie verändert die Buy-Box. Ads laufen weiter und werden angefasst.
Ein Vorher-Nachher auf dieser Seite ist deshalb immer nur richtungsweisend, nie kausal. Wer eine
saubere Aussage will, braucht einen echten Split, und den gibt dieser Traffic auch nicht her.

**Was stattdessen früher trägt.** Verhaltensmetriken je Session, weil jede Session sie auslöst, statt
2,81 % davon:

- **Scrolltiefe 75 %.** Ein Sprung von 30 % auf 40 % braucht rund 360 mobile Sessions je Seite, bei
  5,5 am Tag also etwa 65 Tage. Erster Blick Mitte Oktober 2026.
- **Klicks auf die drei Bänder.** Braucht ein eigenes Event, existiert noch nicht. Das ist eine
  absolute Zahl, keine Rate: null Klicks in sechs Wochen ist ein Ergebnis, für das man keine
  Signifikanz braucht.
- **Interaktion mit der Vergleichstabelle**, jetzt wo sie mobil überhaupt bedienbar ist.

**Empfohlenes Vorgehen:**

1. Vorher-Fenster einfrieren: 16.05. bis 14.08.2026, die Zahlen in §1 und §8.5.
2. Nachher-Fenster ab 15.08.2026. Vor dem 01.10. nicht hinsehen.
3. Primärmetrik mobile ATC-Rate auf Aufrufen, `pagePath` EXACT. Sekundär Scrolltiefe und Band-Klicks.
4. Band-Klick-Events einbauen, bevor das Nachher-Fenster inhaltlich bewertet wird. Ohne sie lässt
   sich später nicht sagen, ob die Bänder gewirkt oder nur Platz gekostet haben.

### 8.8 Ergänzungen zur Methodik aus §6

Beide §6-Stolpersteine haben gehalten. Der Sticky-Preis an `#lt-sticky-atc [data-js-atc-price]`
liefert korrekt 349,00 €, `pagePath` EXACT hält die `web-pixels@…`-Pfade draußen. Zwei neue kommen
dazu:

- **Loox rendert in einem Iframe.** Die Section enthält `#looxReviewsFrame`. `innerText` auf der
  Section ist leer und ein Zählen von `.loox-review` gibt 0, obwohl der Block sichtbar gefüllt ist.
  Die Höhe muss am Iframe-Element gelesen werden, der Inhalt per Screenshot geprüft.
- **Das Browser-Pane friert ein, wenn es versteckt ist.** Ein Skript mit `await` über mehrere
  Scrollschritte läuft in den 30-Sekunden-Timeout. Synchron scrollen, je Schritt ein eigener Aufruf,
  und mit einem Screenshot einen Frame erzwingen. Siehe [[reference_browser_pane_hidden_freeze]].
