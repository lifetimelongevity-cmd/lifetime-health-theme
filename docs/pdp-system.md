---
status: living
last_review: 2026-11-16
canonical_for: pdp-section-system und live-reihenfolge
---

# PDP-System (Ist-Zustand)

Diese Datei beschreibt, welche Sections die Live-PDPs tatsächlich rendern und welche
Rolle jede Section im Kaufprozess übernimmt. Sie ist aus `templates/product.nmn-pulver.json`,
`templates/product.age-dna-test.json` und seit dem 2026-07-29 `templates/product.02_spermidin.json`
abgeleitet und per `curl` gegen die Live-Seiten geprüft. Wer eine PDP umbaut, prüft zuerst hier
die Reihenfolge, dann das Template, niemals eine ältere Beschreibung.

## Journey-Modell

Das Journey-Modell (früher `.cursor/rules/pdp-architecture.mdc`, archiviert 28.10.2026) gilt unverändert: Aufmerksamkeit,
Verständnis, persönliche Relevanz, Vertrauen, Risikoreduktion, Handlung. Eine Section bedient
genau eine Stufe. Die Reihenfolge der Stufen ist nicht die Reihenfolge der Sections: beide PDPs
starten mit Aufmerksamkeit und Handlung gleichzeitig (Hero plus Buybox plus Sticky-ATC) und
staffeln danach Verständnis, Vertrauen und Risikoreduktion, bis der Close die Handlung
wiederholt.

## PDP NMN (`/products/lifetime-nmn`)

Template: `templates/product.nmn-pulver.json` (Suffix `nmn-pulver`, nicht aus dem Slug ableitbar).
11 Einträge in `order`, davon 1 deaktiviert.

| # | Section-Key | Typ (`sections/*.liquid`) | Stufe | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Aufmerksamkeit + Handlung | Hero, Größenwahl, Abo/Einmal-Buybox, Trust-Zeilen, Sticky-ATC |
| 2 | `logo_garden` | `crs-logo-garden` | Vertrauen | Medienlogos (RTL, KStA, SWR1, SAT.1, maxima) |
| 3 | `novel_food` | `crs-novel-food` | Risikoreduktion | Novel-Food-Status, Stand des EU-Verfahrens, Forschungszweck |
| 4 | `feature_grid` | `crs-feature-grid` | Verständnis | Vier Unterscheidungsmerkmale (Rohstoff, GMP, wissenschaftliche Leitung, Firmensitz) |
| 5 | `nmn_marktbefund` | `crs-metrics-row` | Vertrauen | Marktbefund NUS/GeroScience 2024 plus eigener Messwert |
| 6 | `nmn_laborwerte` | `lt-pdp-laborwerte` | Vertrauen | Chargen-Messwerte, Labor, Akkreditierung, Prüfbericht-Link |
| 7 | `lt_comparison_table` | `lt-comparison-table` | Vertrauen | Abgrenzung LIFETIME gegen typische Anbieter, sechs Zeilen |
| 8 | `customer_reviews_nmn` | `crs-customer-reviews` | Vertrauen | Seit 29.09.2026 echte Loox-Texte (`review_source: loox`), Auswahl und Reihenfolge über `loox_pick`, ohne Verifiziert-Badge, dazu 5 Themen-Pills und der Loox-Schnitt. Neue Loox-Bewertungen rücken nicht automatisch nach (keine Verzehr- oder Wirkaussage auf der NMN-PDP) |
| 9 | `risk_free_close` | `crs-risk-free-close` | Handlung | Abo-Close mit vier Trust-Zeilen und Preiszeile |
| 10 | `faq_accordion` | `crs-faq-accordion` | Risikoreduktion | 9 Fragen, Novel Food an Position 1 |
| 11 | `main_product_hidden` | `main-product` | keine | `"disabled": true`, rendert nicht (siehe unten) |

Auf dieser PDP trägt keine Section die Stufe „persönliche Relevanz". Das ist der einzige
strukturelle Unterschied zur AGE&DNA-PDP, der nicht aus dem Produkt folgt.

## PDP AGE&DNA-Test (`/products/lifetime-age-dna`)

Template: `templates/product.age-dna-test.json`. 14 Einträge in `order`, davon 1 deaktiviert.
**Stand 28.10.2026 lokal committet, wartet auf BJs Push:** Verkaufsseite für kalten Meta-Traffic nach
`lifetime-ads/briefings/gruene-wiese/02-funnel-landingpage-email.md` § 2 und § 3 (Reihenfolge),
Angebot aus `01-angebot.md` § 2 bis § 4, danach zwei Impeccable-Durchgänge
(`docs/agedna-pdp-impeccable-2026-10-27.md`, `docs/agedna-pdp-impeccable-2/`). Abgenommen im
Vorschau-Theme `194066317687` („Claude AGE&DNA Verkaufsseite 28.10.“): Preis-Tableau aus
`lifetime-ads/briefings/gruene-wiese/07-preis-tableau.md` mit drei Karten Test 395 € · Vorher und
Nachher 595 € · Begleitet 895 € (`pkg_tableau`, „Du sparst 99 €“ auf Karte 2 und 3, Paketvergleich
zugeklappt unter der Versandzeile), H1 mobil ohne „wirklich“, Variantenwechsel und Warenkorb,
`lt_seen`/`lt_choice` a/b/c, keine Konsolenfehler. **Die Varianten 595 € und 895 € sind seit 28.10.
im Shop** (vorher „Test + Ergebnisgespräch“ 495 €, umbenannt), live aber erst mit dem Push als Karten
sichtbar. NMN-PDP, Startseite, Folgetest und `page.dna-lp*` rendern dort unverändert.
Live läuft bis zum Push die Fassung vom 22.10. (Hero, Belege, Loox-Lade, FAQ).

| # | Section-Key | Typ (`sections/*.liquid`) | Stufe | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Aufmerksamkeit + Handlung | Ergebnisbild als erste Folie (`hero_image`, Produktmedien unverändert), Überschrift A/B/C (`headline_variant`), zwei Karten 395/495 € ohne Streichpreis und ohne Chip, Garantie-Zeile und Ergebnistermin als Kalenderblatt (heute + 42 Tage) unter dem Knopf, Stufe 3 vorbereitet (`pkg_tier3_enable` aus), Seitenereignisse (`events_enable`, Snippet `lt-pdp-ereignisse`) |
| 2 | `belege` | `lt-pdp-belege` | Vertrauen + Verständnis | Beweiszeile (Eurofins, Limmroth), dann Karte „Was du bekommst“ mit Bereichen und JSON-LD |
| 3 | `warum_jetzt` | `lt-pdp-zusage` | Persönliche Relevanz | Ausgangswert-Argument, Kaufknopf (`pos: mid`) |
| 4 | `belege_stimmen` | `lt-pdp-belege` | Vertrauen | Drei Loox-Stimmen (Thomas R., Petra N., Sophie K.), Schnitt und Zahl live aus Loox |
| 5 | `loox_reviews` | `lt-pdp-reviews-all` | Vertrauen | Lade mit allen Bewertungen |
| 6 | `einwaende` | `lt-dna-lp-objections` | Risikoreduktion | Vier Einwände, sichtbar statt Akkordeon, löst `lt_read` aus |
| 7 | `abgrenzung` | `lt-dna-lp-objections` | Verständnis | Fünf Wege und was ihnen fehlt, als Liste statt Tabelle |
| 8 | `leitung` | `lt-pdp-belege` | Vertrauen | Limmroth mit Porträt, Eurofins, Methode in der Lade |
| 9 | `ablauf` | `lt-dna-lp-steps` | Verständnis | Fünf Schritte von heute bis Folgetest |
| 10 | `bonus_stack` | `lt-pdp-zusage` | Handlung | „Das bekommst du für 395 €“, Nachmess-Gutschein als deaktivierter Block |
| 11 | `garantie` | `lt-pdp-zusage` | Risikoreduktion + Handlung | Benannte Garantie in getönter Karte, Stufe 2b als deaktivierter Block, Kaufknopf |
| 12 | `faq_accordion` | `crs-faq-accordion` | Risikoreduktion | Sechs Fragen |
| 13 | `schluss` | `lt-leiste` | Handlung | Schluss-Leiste mit Knopf auf den Warenkorb-Permalink der ersten Variante |
| 14 | `main_product_hidden` | `main-product` | keine | `"disabled": true`, rendert nicht |

Schlusslogik seit 27.10.: Stack und Garantie bilden den Close vor der FAQ (wie NMN), die Leiste
wiederholt den Kauf am Seitenende. Kaufknöpfe: Hero, Warum jetzt, Garantie, Leiste, plus Sticky.

## PDP Spermidin (`/products/spermidin-kapseln`)

Template: `templates/product.02_spermidin.json` (Suffix `02_spermidin`, am Produkt bestätigt 16.11.2026). Stand des Entwurfs `docs/entwurf-spermidin-pdp-2026-11-16.html` (Entwurf-Commit `cd0baeb`, BJ-Freigabe „Ja, Template bauen“), gleiche Kette wie TMG, Grauzonen-Fassung wie Resveratrol (für Spermidin ist kein Claim zugelassen, der Haarzyklus-Claim ist mit VO (EU) 1017/2013 abgelehnt, das Etikett hat keine Begleitnährstoffe). **Live seit 16.11.2026, 18:03**: Der Theme Manager hat das noch unkommittierte Template mit BJs Push mitgenommen (Commit `77dd089`, zusammen mit CaAKG und Hyaluron). Kein Vorschau-Theme. Live headless bei 375 und 1280 px gemessen (kein Überlauf, keine Konsolenfehler, H1 30/36 px, H2 28 px, FAQ mobil 24 px), Warenkorb im eingebauten Browser getestet (Abo 26,91 € mit Plan „Jeden Monat“, Einmalig 29,90 € mit „Zzgl. 4,90 € Versand“). 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 9 sichtbare Sections, die alte Supplement-Kette vom 29.07.).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für alle, die an ihre Zellen denken.“, Punkte „Spermidin steckt in Weizenkeimen, Pilzen und reifem Käse.“, „10 mg am Tag in 2 Kapseln, aus Weizenkeimextrakt.“, „Jede Charge im Labor geprüft.“, Zeile „Vegane Kapsel · Etikett ansehen“. Kompakte Kaufzone wie TMG mit Chip „Du sparst 7,89 € inkl. Versand“ (`compact_save_ship`) und Tagespreis („60 Kapseln für 30 Tage“, keine Füllmenge in Gramm). `trust_4` „Enthält Weizen (Gluten)“ als Notiz mit Dialog „Allergen und Zielgruppe“ (LMIV Art. 14, Allergen vor dem Kauf). Galerie: erstes Produktbild, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Spermidin steckt in jeder Zelle. Und in dem, was du isst.“, Einblendung ohne Glaskarte (Kiechl 2018, 5,7 Jahre, nur Abstract gelesen), Rollen „Was Spermidin ist“, „Was die Forschung untersucht“ (Autophagie als Forschungsgegenstand, erklärt das Siegel CELL RECYCLE), „Wie du es nimmst“. Querformat-Foto, `einbl_mobile_vw: 190` |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Spermidin, aus Weizenkeimen“ (Marken 10 mg bei 71/50 und Weizenkeim bei 64/84), dazu Stimmen-Karte mit drei echten Loox-Texten (Katharina B., Anna R., Martina B., keine Wirkaussage) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen (9, Schnitt 4,9) |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,85 bei 0,5 % 17,5 %, Ausschnitt ohne die Siegelspalte mit „Glutenfrei“), Kapsel-Symbol, vierte Zeile „Allergen: Enthält Weizen (Gluten)“. Zutaten mit der zugelassenen Bezeichnung „WEIZENkeimextrakt mit hohem Spermidingehalt“, Lade mit Gehalt je Portion und dem Ausschluss von Schwangeren und Stillenden (Unionsliste VO (EU) 2017/2470, Berichtigung 2018/1023) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann Gluten, „Merke ich etwas?“ (mit Link auf den Blog-Beitrag `was-ist-spermidin`), „Für wen ist Spermidin nicht gedacht?“ |

Keine Section-Erweiterung nötig. Bilder in den Shopify-Dateien: `spermidin-galerie-travertin.png` (Codex, Dose mit CELL RECYCLE), `spermidin-galerie-frau.jpg` (Pexels 3893500, Elina Fairytale, quadratisch aus der Mitte), `spermidin-etikett.jpg` (Druck 18.06.2025, Charge SPE252001, 1660 × 680 ohne Siegelspalte), `spermidin-wirkprinzip-kueche.jpg` (Pexels 3893737, 5617 × 3744 unbeschnitten), `spermidin-stillleben.png` (Codex, 1774 × 887). Die Dosis bleibt bei 10 mg (BJ-Entscheid 29.07.).
Offen: Erstes Produktbild zeigt noch das Siegel CELL STABILITY (Produktmedien, das Foto mit CELL RECYCLE liegt als `spermidin-1_1364aed9-….jpg` in den Dateien, Tausch braucht BJs Ja), Glaskarte Kiechl 2018 (Volltext), Titelzeile, Garantie-Wortlaut, Prüfbericht je Charge SPE252001, Etikett (zugelassene Bezeichnung, Schwangere und Stillende, Glutenfrei-Siegel, Berlin, Spezifikation des Extrakts laut Rohstoff-Zertifikat 11,2 mg/g gegen 0,8 bis 2,4 mg/g der Zulassung, Anwalt).

## PDP NAD⁺ (`/products/nad-booster`)

Template: `templates/product.12_nad-liposomal-2.json` (Suffix `12_nad-liposomal-2`). Seit 06.11.2026
auf dem Stand des Entwurfs `docs/entwurf-nad-pdp-2026-11-05.html` (Commit `84fcf6c`, BJ-Freigabe
„Passt, Template bauen“), live seit 06.11.2026 (BJ-Push per Theme Manager, per Pull aus dem Live-Theme und im Browser bestätigt). **Regel (BJ 05.11.):** Sections, die NAD⁺ und
NMN gemeinsam haben, sind gleich gebaut und gleich eingestellt. NAD⁺ darf als Nahrungsergänzungsmittel
mehr sagen als NMN, das steht in eigenen Abschnitten dazwischen. 6 Einträge in `order`, kein
`main_product_hidden`.

| # | Section-Key | Typ | gleich wie NMN? | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | ja, plus eigene Galerie | Titelzeile „Für Energie wie früher.“, drei Punkte, kompakte Kaufzone. Galerie: erstes Produktbild, dann vier eigene Bilder (`gallery_first_only`, `gallery_extra_1–4`) |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | nur NEM | Hell, Darstellung „Einblendung“: Foto mit Glaskarte 61 % (Massudi 2012, Tabelle 1), Energie und Reparatur daneben |
| 3 | `belege` | `lt-pdp-belege` | ja, Karte 2 als Bildkarte | Karte 1 aus. „Was drin ist“ als Bildkarte (Liposom mit zwei Marken, Limmroth, Lade). Was Kunden sagen: Katharina B., Gabriele K., Silke D. |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | ja | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | nur NEM | Darstellung „Fakten“: Etikett links, drei Zeilen rechts, Zutaten und Pflichttext hinter der Lade |
| 6 | `faq_accordion` | `crs-faq-accordion` | ja | 6 Fragen, Versand/Abo/Garantie wie NMN vorn |

Alle neuen Settings der vier Sections stehen per Default auf aus oder leer, NMN, AGE&DNA und
Spermidin rendern unverändert. Die Bilder liegen in den Shopify-Dateien als `nad-galerie-*.jpg`,
`nad-wirkprinzip-frau-tee.jpg` und `nad-liposom.jpg` (2400 × 1200).

Keine Messwert-Blöcke in Karte 1: Die Tabelle trägt die Caption „Prüfbericht“, und für NAD⁺ existiert
keiner. Der Hero-Punkt „Jede Charge im Labor geprüft.“ stützt sich auf die Herstellerangabe in der
Lade (Schwermetalle, Verunreinigungen); ein verlinkbarer Prüfbericht je Charge ist offen.

## PDP Kreatin (`/products/kreatin-monohydrat-pulver`)

Template: `templates/product.05_kreatin.json` (Suffix `05_kreatin`, am Produkt bestätigt 07.11.2026).
Seit 07.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-kreatin-pdp-2026-11-06.html` (BJ-Freigabe
07.11.), gleiche Kette wie NAD⁺. **Live seit 08.11.2026** (BJ-Push per Theme Manager, Commit `ef584c2`,
zusammen mit den NAD⁺-Commits `822c556` und `cfb2c2d`, auf denen die Kaufzone aufsetzt). Abgenommen im Vorschau-Theme `194212397431`
(„Claude Kreatin-PDP (07.11.)“). 6 Einträge in `order`, kein `main_product_hidden`.

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Kraft, die bleibt.“, drei Punkte, Zeile „Über 99,5 % Reinheit · Etikett ansehen“, kompakte Kaufzone mit festem Abo-Hinweis (`compact_sub_hint`), Grundpreis statt Tagespreis (`compact_amount_grams: 300`) und Versandkosten bei „Einmalig“ (`compact_once_ship`). Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | Einblendung mit +1,4 kg (Chilibeck 2017), Rollen mit Blitz und Hantel (`stage_icon: hantel`) |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Nur Kreatin, als Monohydrat“ (Stillleben, Marken Monohydrat und 99,5 %), ohne Kundenstimmen |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett, Messlöffel-Symbol (`fact_icon: messloeffel`) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie vorn, dann Training, Gewicht, Einnahme |

Bilder in den Shopify-Dateien: `kreatin-galerie-travertin.png`, `kreatin-galerie-kettlebell.jpg`,
`kreatin-etikett.png` (Original 2148 × 979, Zoom 2,12 bei 8,9 % 8,6 % ergibt den Entwurfsausschnitt),
`kreatin-stillleben.png` und `kreatin-wirkprinzip-kabelzug_1b0c58ad-….jpg` (auf 25 MP verkleinert,
Shopify-Grenze). Offen: Fokuspunkt des Kabelzug-Fotos (50 % 68 % trägt mobil und Desktop),
Prüfbericht je Charge.

## PDP Resveratrol (`/products/resveratrol-kapseln`)

Template: `templates/product.06_resveratrol.json` (Suffix `06_resveratrol`, am Produkt bestätigt 08.11.2026).
Seit 08.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-resveratrol-pdp-2026-11-08.html` (BJ-Freigabe
„Passt, Template bauen“, Copy in der Grauzonen-Fassung aus Commit `e9e85f1`), gleiche Kette wie NAD⁺ und Kreatin. **Live seit 16.11.2026** (mit einem vollen Push des Repo-Stands am Nachmittag, per Pull gegen HEAD und im Browser bestätigt). Vorschau-Theme `194213871991`
(„Claude Resveratrol-PDP (08.11.)“). 6 Einträge in `order`, kein `main_product_hidden`.

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Frauen, die an ihre Knochen denken.“, drei Punkte, Zeile „Über 98 % Reinheit · Etikett ansehen“, kompakte Kaufzone mit festem Abo-Hinweis und Versandkosten bei „Einmalig“, Tagespreis wie NAD⁺ (kein `compact_amount_grams`, Kapselgewicht fehlt). Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Resveratrol und Knochen.“, Einblendung mit +1,3 % (Wong 2020, RESHAW, mit Hinweis auf ein anderes Präparat), Rollen „Warum Knochen?“ und „Ein Pflanzenstoff“ ohne Symbol (`stage_icon: none`) |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Resveratrol, hochrein“ (Stillleben, Marken Über 98 % und Vegan), ohne Kundenstimmen |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,93 bei 0 % 17,5 %), Kapsel-Symbol (`fact_icon: kapsel`) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie vorn, dann „Merke ich etwas?“, Calcium und Vitamin D, Medikamente |

Keine Section-Erweiterung nötig, alle Einstellungen gab es seit NAD⁺ und Kreatin. Bilder in den Shopify-Dateien:
`resveratrol-galerie-travertin.png`, `resveratrol-galerie-frau.jpg`, `resveratrol-etikett.jpg` (Ausschnitt
2048 × 770 aus dem Etikett-Original, y = 640), `resveratrol-wirkprinzip-park.jpg`, `resveratrol-stillleben.png`.
Offen: Prüfbericht je Charge, Kapselgewicht, Dosis, Herkunft und Medikamenten-Hinweis laut Novel-Food-Zulassung (Anwalt).

## PDP D3+K2 (`/products/vitamin-d3-k2-spray`)

Template: `templates/product.07_d3k2.json` (Suffix `07_d3k2`, am Produkt bestätigt 08.11.2026).
Seit 08.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-d3k2-pdp-2026-11-08.html` (BJ-Freigabe „Ja, mit Vorschlägen“), gleiche Kette wie NAD⁺, Kreatin und Resveratrol. **Live seit 16.11.2026** (mit demselben vollen Push wie Resveratrol, samt den drei Section-Erweiterungen, per Pull gegen HEAD und im Browser bestätigt). Vorschau-Theme `194218819959` („Claude D3K2-PDP (08.11.)“). 6 Einträge in `order`, kein `main_product_hidden`.

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Knochen, die halten.“, drei Punkte, Zeile „Vegan und glutenfrei · Etikett ansehen“, nur Einmalig (`show_price_standalone`, kein Selling Plan), darunter Versandkosten und „30 ml für 75 Tage · 663,33 €/l“ |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Deine Knochen brauchen beides.“, Einblendung 63 % (Rabenberg 2015, DEGS1), Rollen D3, K2, Muskeln und Abwehr ohne Symbol |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „D3 und K2, gelöst in MCT-Öl“, Marken D3 und K2 MK-7 und MCT-Öl, ohne Kundenstimmen |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,9 bei 0 % 37 %), Sprühstoß-Symbol, Zeile Blutverdünner |
| 6 | `faq_accordion` | `crs-faq-accordion` | 5 Fragen: Versand, Garantie, Blutverdünner, Einnahme und Reichweite, „Merke ich etwas?“. Abo-Frage fehlt, solange es kein Abo gibt |

Erweiterungen, alle mit Default aus: `compact_amount_unit` (g oder ml) in `lt-pdp-hero`; Versand- und Grundpreiszeile im Pfad ohne Abo (nur mit `compact_once_ship` bzw. `compact_amount_text`); `fact_icon: spruehstoss` in `lt-pdp-produktfakten`; `einbl_mobile_vw` in `lt-pdp-wirkprinzip` (180 bei Querformat, sonst lädt das Handy zu klein). Bilder in den Shopify-Dateien: `d3k2-galerie-travertin.png`, `d3k2-galerie-frau.jpg`, `d3k2-etikett.jpg`, `d3k2-wirkprinzip-yoga.jpg`, `d3k2-stillleben.png`.
Offen: Abo-Plan (dann `show_subscription_toggle` an, `compact_sub_hint` „Lieferung alle 75 Tage, versandfrei, jederzeit kündbar.“, FAQ wörtlich von NMN), zweite Packungsgröße, Prüfbericht je Charge, K2-Herkunft.

## PDP TMG (`/products/betain-tmg-kapseln`)

Template: `templates/product.01_tmg.json` (Suffix `01_tmg`, am Produkt bestätigt 16.11.2026).
Seit 16.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-tmg-pdp-2026-11-16.html` (BJ-Freigabe „Ja, Template bauen“), gleiche Kette wie NAD⁺, Kreatin, Resveratrol und D3+K2. **Live seit 16.11.2026** (BJ-Ansage „deploy“, gezielter CLI-Push nur von `templates/product.01_tmg.json` und `sections/lt-pdp-hero.liquid`, je Datei zurückgezogen und verglichen, Seite im Browser geprüft). Der Hero ging zuerst als Live-Fassung plus TMG-Patch hoch; seit dem vollen Push am selben Nachmittag entspricht er wieder HEAD, samt D3+K2- und Black-Week-Zeilen. Abgenommen im Vorschau-Theme `194334196087` („Claude TMG-PDP (16.11.)“). 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 10 Sections samt sichtbarem zweitem Hero).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für deinen Homocystein-Stoffwechsel.“, Punkt 1 ist der zugelassene Betain-Claim (VO 432/2012), Zeile „Über 98 % Reinheit · Etikett ansehen“, kompakte Kaufzone mit festem Abo-Hinweis, Versandkosten bei „Einmalig“ und Tagespreis („60 Kapseln für 30 Tage“, kein `compact_amount_grams`, Kapselgewicht fehlt). Chip mit Versand (`compact_save_ship`): „Du sparst 6,39 € inkl. Versand“. Garantie-Dialog im NMN-Wortlaut. Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Betain wandelt Homocystein um.“, Einblendung ohne Glaskarte (`stat_value` leer, keine Betain-Studie mit 50- bis 65-Jährigen), drei Rollen ohne Symbol; die dritte trägt beide Pflichtinfos des Claims (1,5 g = 3 Kapseln, über 4 g Cholesterin) |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Betain, hochrein“ (Stillleben, Marken Über 98 % und Vegan), ohne Kundenstimmen |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,8 bei 4,5 % 11 %), Kapsel-Symbol, Verzehrempfehlung 2 Kapseln wie das Etikett, 4-g-Warnung in der Lade |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann „Merke ich etwas?“, B-Vitamine, Cholesterin |

Erweiterung in `lt-pdp-hero`, Default aus: `compact_save_ship` („Kompakt: Versand in die Ersparnis rechnen“). Ohne Größenwahl und mit Einmalpreis unter der Versandgrenze aus `lt-shipping-rule` zählt der Chip die Versandkosten des Landes zum Einmalpreis (DE: 14,90 + 4,90 − 13,41 = 6,39 €). Im Abo steht „inkl. Versand“ dahinter, bei „Einmalig“ „Im Abo sparst du 6,39 €“ mit Tipp aufs Abo. Nur TMG setzt den Schalter; Kreatin und NMN im Vorschau-Theme gegen Live verglichen, Chip und Hinweise gleich. Bilder in den Shopify-Dateien: `tmg-galerie-travertin.png`, `tmg-galerie-frau.jpg` (Pexels 6927887, quadratisch 4259 × 4259), `tmg-wirkprinzip-kueche.jpg` (Pexels 6927897, 3916 × 5874 unbeschnitten, Gesicht bleibt mit der festen Bildposition mobil und am Desktop im Bild), `tmg-stillleben.png`, `tmg-etikett.jpg` (2520 × 945).
Offen: Titelzeile, Doppelpack, Prüfbericht je Charge TMG252001, Kapselgewicht, Garantie-Wortlaut (NMN oder „Auch wenn du nichts merkst“), Anwalt (Pflichtinfo am Hero-Claim, 2 gegen 3 Kapseln).

## PDP Astaxanthin (`/products/astaxanthin-kapseln`)

Template: `templates/product.09_astafit.json` (Suffix `09_astafit`, am Produkt bestätigt 16.11.2026; der Dateiname sagt Astafit, das Produkt heißt Astaxanthin). Seit 16.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-astaxanthin-pdp-2026-11-16.html` (BJ-Freigabe „Ja, Template bauen“), gleiche Kette wie TMG. **Wartet auf BJs Push.** Abgenommen im Vorschau-Theme `194338029943` („Claude Astaxanthin-PDP (16.11.)“), headless bei 375 und 1280 px gemessen. 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 8 Sections samt sichtbarem zweitem Hero). **Bestand 0 bei Verkauf gesperrt, der Knopf zeigt „Ausverkauft“**, letzte Bestellung 31.12.2025.

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Haut nach vielen Sommern.“ (Grauzonen-Fassung, kein zugelassener Claim), drei Punkte, Zeile „Original astafit® · Etikett ansehen“ statt Reinheit (in 320 mg Alge stecken 8 mg Astaxanthin, also 2,5 %), kompakte Kaufzone mit festem Abo-Hinweis, Versandkosten bei „Einmalig“, Chip mit Versand (7,19 €) und Grundpreis je kg aus ℮ 52 g (`compact_amount_grams: 52`, `compact_amount_unit: kg`). Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Astaxanthin und Haut.“, Einblendung ohne Glaskarte (Tominaga 2017: 65 Frauen von 35 bis 60, kein Gruppenunterschied), drei Rollen ohne Symbol: Herkunft der Farbe, was gemessen wurde, 8 mg und die EFSA-Menge |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Astaxanthin, aus der Alge“ (Stillleben, Marken „8 mg am Tag“ und „Vegan“), ohne Kundenstimmen (Loox: 6 Bewertungen, alle ohne Text) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,65 bei 2 % 11,4 %), Kapsel-Symbol, Werte vom Druck-PDF vom 17.03.2025 (SKU LT-AST-C-60) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann „Merke ich etwas?“, Sonnencreme, „Wie viel ist sicher?“ (EFSA 2020: 8 mg am Tag für Erwachsene, nicht unter 14 Jahren) |

Keine eigene Section-Erweiterung. **Braucht beim Push `e574a5e`** (`compact_amount_unit` „kg“ in `lt-pdp-hero`, aus der Hyaluron-Sitzung), sonst kennt das Live-Schema den Wert nicht. Novel Food: Die ganze Alge ist in Nahrungsergänzungsmitteln laut EU-Katalog nicht neuartig; die 8-mg-Grenze und der 14-Jahre-Hinweis der Unionsliste gelten für das Oleoresin. Bilder in den Shopify-Dateien: `astaxanthin-galerie-travertin.png`, `astaxanthin-galerie-frau.jpg` (Pexels 8784551, quadratisch 4900 × 4900), `astaxanthin-wirkprinzip-garten.jpg` (Pexels 8784712, auf 4075 × 6109 verkleinert), `astaxanthin-stillleben.png`, `astaxanthin-etikett.jpg` (2529 × 883).
Offen: Bestand, Bezug der „>99 % Reinheit“ auf dem Etikett, astafit®-Datenblatt (ganze Alge oder Oleoresin, Herkunft Österreich), Kapselfarbe, Prüfbericht je Charge, Garantie-Wortlaut, Etikett (Berlin, 14-Jahre-Hinweis).

## PDP Fisetin (`/products/fisetin-kapseln`)

Template: `templates/product.04_fisetin.json` (Suffix `04_fisetin`, am Produkt bestätigt 16.11.2026). Seit 16.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-fisetin-pdp-2026-11-16.html` (BJ-Freigabe „Ja, Template bauen“, Commit `8fb6615`), gleiche Kette wie TMG. **Wartet auf BJs Push.** Kein Vorschau-Theme (BJ: „alle ohne vorschau theme“), geprüft nur per `lt-check` und `shopify theme check` sowie headless am HTML-Entwurf bei 375 und 1280 px. Den Lauf im Shop nach dem Push live in Chrome prüfen. 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 9 Sections samt sichtbarem zweitem Hero, mTOR-Abschnitt und zwei leeren Sections).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für alle, die Fisetin schon kennen.“ (Grauzonen-Fassung, kein zugelassener Claim), drei Punkte (Studien laut ClinicalTrials.gov, Einnahme, Laborprüfung), Zeile „Über 98 % Reinheit · Etikett ansehen“, kompakte Kaufzone mit festem Abo-Hinweis, Versandkosten bei „Einmalig“, Chip mit Versand (7,89 €) und Tagespreis („60 Kapseln für 30 Tage“, Kapselgewicht fehlt). Garantie-Dialog „Auch wenn du nichts merkst“. Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Fisetin und das Älterwerden.“, Einblendung ohne Glaskarte (keine Studie mit Ergebnis an 50- bis 65-Jährigen), drei Rollen ohne Symbol: Vorkommen, Forschungsfrage, Herkunft aus dem Fisetholz |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Fisetin, hochrein“ (Stillleben, Marken Über 98 % und Vegan), ohne Kundenstimmen (Loox: 7 Bewertungen, keine mit Produktbezug) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen (live stand der alte Loox-Block auf `is_sample: true`) |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,8 bei 4,5 % 11 %, gleiches Layout wie TMG), Kapsel-Symbol, Werte vom Druck-PDF vom 18.06.2025 (SKU LT-FIS-C-60) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann „Merke ich etwas?“, „Ist das die Menge aus den Studien?“ (Mayo: 20 mg/kg an 2 Tagen), Medikamente (Statine, Blutverdünner laut Mayo-Ausschlüssen) |

Keine Section-Erweiterung, `compact_save_ship` ist seit TMG live. **Novel Food:** Fisetin ≥ 98 % aus der Rinde des Perückenstrauchs ist laut EU-Katalog neuartig (Art.-4-Konsultation Tschechien, Stand 14.04.2026) und nicht in der Unionsliste (konsolidiert 10.08.2026); Rinde, Blatt und Blüte des Strauchs sind in Nahrungsergänzungsmitteln nicht neuartig. BJ-Entscheid 16.11.: trotzdem als Nahrungsergänzungsmittel in der Grauzonen-Fassung. Bilder in den Shopify-Dateien: `fisetin-galerie-travertin.png`, `fisetin-galerie-frau.jpg` (Pexels 7530822, quadratisch 4000 × 4000), `fisetin-wirkprinzip-kueche.jpg` (Pexels 7530812, 4000 × 6000 unbeschnitten, Gesicht bei 57 % / 28 %), `fisetin-stillleben.png`, `fisetin-etikett.jpg` (2520 × 946).
Offen: Titelzeile (Alternative „Für Frauen, die an ihre Zellen denken.“), Glaskarte „3 kg Erdbeeren“ (Volltext Arai 2000 ungeprüft), Doppelpack, Prüfbericht je Charge FIS252001, Kapselgewicht, Kapselfarbe, Anwalt (Novel Food), Etikett (Berlin, „Cell Detox“), drei Shopify-Produktbilder mit Claim-Text in den Produktmedien.

## PDP Vitamin B-Komplex (`/products/vitamin-b-komplex-kapseln`)

Template: `templates/product.11_b-komplex.json` (Suffix `11_b-komplex`, am Produkt bestätigt 16.11.2026). Seit 16.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-b-komplex-pdp-2026-11-16.html` (BJ-Freigabe „Ja, Template bauen“, Entwurf-Commit `9d27fd0`, Template-Commit `c0cee8e`), gleiche Kette wie TMG. **Wartet auf BJs Push.** Abgenommen im Vorschau-Theme `194338062711` („Claude B-Komplex-PDP (16.11.)“), headless bei 375 und 1280 px gemessen, Abo-Warenkorb in Chrome getestet. 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 8 Sections samt sichtbarem zweitem Hero, Info-Tabs, zwei Rich-Texts und Empfehlungen).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Nachmittage ohne Tief.“, Punkt 1 Müdigkeits-Claim (B2, B3, B5, B6, B9, B12), Punkt 2 „Vitamin B6 trägt zur Regulierung der Hormontätigkeit bei.“ (beide VO 432/2012), Zeile „Über 99 % Reinheit · Etikett ansehen“, kompakte Kaufzone mit Abo-Hinweis „alle 2 Monate“, Versandkosten bei „Einmalig“, Chip mit Versand (6,79 €) und Grundpreis je kg aus ℮ 41 g (`compact_amount_grams: 41`, `compact_amount_unit: kg`, 414,88 €/kg im Abo). Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Ab 50 kommt weniger B12 an.“, Einblendung 10–30 % (Institute of Medicine 1998, S. 306 und 338, am Volltext geprüft, kein Präparat), drei Rollen ohne Symbol: Müdigkeits-Claim, Magensäure ab 50, bis zu 1 % von 500 µg (IOM S. 309) gegen 4 µg DGE |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „B1 bis B12, in einer Kapsel“ (Stillleben, Marken „8 B-Vitamine“ und „Vegan“), ohne Kundenstimmen (Loox: 4 Bewertungen, nur Lieferung oder kein Text, Metafeld `loox.reviews` leer) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,55 bei 5,6 % 11,3 %, zeigt die ganze Nährwerttabelle), Kapsel-Symbol, Werte vom Druck-PDF `Vitamin B-Komplex_60[42]` vom 17.03.2025 (SKU LT-BVK-C-60). Die acht `nutrient`-Blöcke tragen die Werte, rendern in der Darstellung „Fakten“ aber nicht |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann „Merke ich etwas?“, „Ist das nicht sehr hoch dosiert?“ (EFSA: Folsäure 1.000 µg, B6 12 mg), „Ich nehme schon TMG“ als Brücke zur TMG-Seite |

Keine eigene Section-Erweiterung. **Braucht beim Push `e574a5e`** (`compact_amount_unit` „kg“ in `lt-pdp-hero`, aus der Hyaluron-Sitzung), sonst kennt das Live-Schema den Wert nicht; im Vorschau-Theme lief der Hero deshalb als HEAD-Fassung (Live plus genau dieser Commit). Kein Novel Food, alle acht Formen stehen in Anhang II der RL 2002/46/EG; die BfR-Höchstmengenvorschläge 2021 (B6 3,5 mg, Folsäure 200 µg, B12 25 µg) liegen unter dem Etikett, sind aber nicht verbindlich. Bilder in den Shopify-Dateien: `b-komplex-galerie-travertin.jpg`, `b-komplex-galerie-frau.jpg` (Pexels 5698211, quadratisch 4000 × 4000), `b-komplex-wirkprinzip-strasse.jpg` (Pexels 5698219, quadratisch 4000 × 4000, Gesicht bei 23 % der Höhe), `b-komplex-stillleben.jpg`, `b-komplex-etikett.jpg` (2529 × 883).
Offen: zweite Packungsgröße, Prüfbericht je Charge, Kapselfarbe (Codex malte klare Kapseln mit hellgelbem Pulver), Etikett (Berlin).

## PDP Schlafspray (`/products/schlafspray-mit-melatonin`)

Template: `templates/product.08_schlafspray.json` (Suffix `08_schlafspray`, am Produkt bestätigt 16.11.2026). Seit 16.11.2026 lokal auf dem Stand des Entwurfs `docs/entwurf-schlafspray-pdp-2026-11-16.html` (BJ-Freigabe „Ja, Template bauen“, Entwurf-Commit `dec0df9`, Template-Commits `3e25e78` und `e359fec`), gleiche Kette wie D3+K2, **ohne Abo**. **Wartet auf BJs Push.** Abgenommen im Vorschau-Theme `194338095479` („Claude Schlafspray-PDP (16.11.)“, Live-Stand plus nur dieses Template), headless bei 375 und 1280 px gemessen, Warenkorb in Chrome getestet (19,90 €, ohne Selling Plan). 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 8 Sections samt sichtbarem zweitem Hero, Icon-Leiste, zwei Rich-Texts und leeren Empfehlungen).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Nächte, die früher beginnen.“, Punkt 1 der Einschlaf-Claim (VO 432/2012), Zeile „Vegan und glutenfrei · Etikett ansehen“, nur Einmalig (`show_price_standalone`, das Produkt hat keinen Selling Plan; live stand eine Abo-Karte, die ohne Abo 19,90 € verkaufte), Versandkosten und „30 ml für 75 Nächte · 663,33 €/l“. Galerie: Flasche, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Melatonin ist das Signal für die Nacht.“, Einblendung 54 % (DEGS1, Schlack 2013, Tabelle 1: Frauen 40 bis 59 mit Einschlafproblemen im letzten Monat, ab 60 67 %), drei Rollen ohne Symbol; Rolle 2 und 3 tragen beide Claims mit Pflichtinfo im EUR-Lex-Wortlaut (Einschlafzeit nur bei genau 1 mg je Portion, Jetlag ab 0,5 mg) |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Drei Zutaten, sonst nichts“ (Stillleben, beide Marken an der Flasche), ohne Kundenstimmen (Loox: 2 Bewertungen ohne Text) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,9 bei 0 % 40 %), Sprühstoß-Symbol, Zeile „Nicht für: Schwangere, Stillende, unter 18“, Risikogruppen der BfR-Stellungnahme 038/2024 in der Lade. Werte vom Druck-PDF `Schlafspray_30[96]` (SKU LT-MEL-S-30) |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen: Versand und Garantie wie D3+K2, Einnahme samt „danach nicht mehr Auto fahren“, „Merke ich etwas?“, „Macht Melatonin abhängig?“ (Circadin-Fachinformation 5.1: keine Entzugserscheinungen), „Wer sollte es nicht nehmen?“. Abo-Frage fehlt, solange es kein Abo gibt |

Keine Section-Erweiterung, alles gibt es seit D3+K2 (`show_price_standalone`, `compact_amount_unit: ml`, `fact_icon: spruehstoss`, `einbl_mobile_vw`, hier 200 für das Querformat 1,67). Arzneimittelgrenze: OVG NRW, 28.10.2021, 13 A 1376/17 (2 × 0,5 mg am Tag ist Lebensmittel), zuständig ist NRW, solange der Sitz in Köln ist. Bilder in den Shopify-Dateien: `schlafspray-galerie-travertin.png`, `schlafspray-galerie-frau.jpg` (Pexels 5473283, quadratisch 2000 × 2000), `schlafspray-wirkprinzip-bett.jpg` (Pexels 6916768, beschnitten auf 5895 × 3539, Gesicht bei 30 % der Höhe), `schlafspray-stillleben.png`, `schlafspray-etikett.jpg` (2591 × 1489).
Offen: Mehrfach-Packung (eine Flasche kommt nie an 49 €), Gehaltsmessung je Charge, Etikett (Berlin, „abwechslungsreiche“, BfR-Hinweis zu den Risikogruppen).

## PDP Hyaluron (`/products/hyaluron`)

Template: `templates/product.10_hyaluron.json` (Suffix `10_hyaluron`, am Produkt bestätigt 16.11.2026). Stand des Entwurfs `docs/entwurf-hyaluron-pdp-2026-11-16.html` (Entwurf-Commit `781b24d`, BJ-Freigabe „Ja, Template bauen“), gleiche Kette wie TMG, Grauzonen-Fassung wie Resveratrol (für Hyaluronsäure ist kein Claim zugelassen, „Helps to maintain good skin hydration“ ist in VO (EU) 1066/2013 abgelehnt, das Etikett hat keine Begleitnährstoffe). **Live seit 16.11.2026, 18:03**: Der Theme Manager hat das noch unkommittierte Template mit BJs Push mitgenommen (Commit `77dd089`, zusammen mit Spermidin und CaAKG). Kein Vorschau-Theme. Live headless bei 375 und 1280 px gemessen (kein Überlauf, keine Konsolenfehler, alle Bilder laden), Warenkorb im eingebauten Browser getestet (Abo 26,01 € mit Plan „Jeden Monat“, Einmalig 28,90 € ohne Plan). 6 Einträge in `order`, kein `main_product_hidden` mehr (vorher 8 Sections samt sichtbarem zweitem Hero, Info-Reitern, zwei Rich-Texts und Empfehlungen).

| # | Section-Key | Typ | Rolle |
|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Titelzeile „Für Haut, die trockener wird.“, Punkte „Erforscht an Frauen zwischen 45 und 65.“ (Skin Res Technol 2023, PMC10661223), „Derselbe Stoff, der in deiner Haut Wasser bindet.“, „Jede Charge im Labor geprüft.“, Zeile „Über 99 % Reinheit · Etikett ansehen“. Kompakte Kaufzone wie TMG mit Chip „Du sparst 7,79 € inkl. Versand“ (`compact_save_ship`) und Grundpreis je kg aus ℮ 49 g (`compact_amount_grams: 49`, `compact_amount_unit: kg`: 530,82 €/kg im Abo, 589,80 €/kg einmalig). Galerie: Dose, dann `gallery_extra_1–3` |
| 2 | `wirkprinzip` | `lt-pdp-wirkprinzip` | „Hyaluronsäure bindet Wasser. Ältere Haut hat weniger davon.“, Einblendung ohne Glaskarte (keine Placebo-Studie mit Zahl für 50 bis 65; Hsu 2021, +11 %, Schnitt 44 Jahre, liegt als Option bereit), drei Rollen ohne Symbol, Rolle 3 nennt nur, was gemessen wurde |
| 3 | `belege` | `lt-pdp-belege` | Bildkarte „Hyaluronsäure, hochrein“ (Marken Über 99 % bei 68/47 und Vegan bei 57/70), Zeile „Aus Fermentation statt aus Hahnenkamm“, ohne Kundenstimmen (Loox: 5 Bewertungen ohne Text) |
| 4 | `loox_reviews` | `lt-pdp-reviews-all` | Lade mit allen Loox-Bewertungen |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Fakten mit Etikett (Zoom 1,5 bei 0 % 0 %, gerendert aus dem Druck-PDF `Hyaluron_60.pdf`, 2522 × 881), Kapsel-Symbol, Verzehrempfehlung im Etikett-Wortlaut als erster Satz der Lade |
| 6 | `faq_accordion` | `crs-faq-accordion` | 6 Fragen, Versand/Abo/Garantie wörtlich von NMN, dann „Wann merke ich etwas?“ („Plane mindestens drei Dosen ein“), „Ich creme schon“, „Auf der Dose steht ‚Joint‘“ |

Erweiterung in `lt-pdp-hero`, Default unverändert: `compact_amount_unit` hat den Wert `kg` (Commit `e574a5e`). § 5 Abs. 1 PAngV verlangt seit 28.05.2022 bei Fertigpackungen den Grundpreis je kg, die 100-g-Einheit gilt nur noch für lose Ware. Nur Hyaluron setzt den Wert, Kreatin zeigt live weiter „7,47 €/100 g“. Bilder in den Shopify-Dateien: `hyaluron-galerie-travertin.png`, `hyaluron-galerie-frau.jpg` (Pexels 7530606, Mikhail Nilov, quadratisch y 200 bis 4200), `hyaluron-wirkprinzip-fenster.jpg` (Pexels 7530591, 4000 × 6000 unbeschnitten), `hyaluron-stillleben.png`, `hyaluron-etikett.jpg`.
Offen: Fermentation am Rohstoff-Datenblatt bestätigen, Prüfbericht je Charge, Doppelpack (57,80 € wäre versandfrei), Kapselfarbe, Garantie-Wortlaut, Etikett (Berlin, Siegel „SKIN & JOINT REGEN“, verkürzter Pflichthinweis), Grundpreis je kg auch für Kreatin setzen.

## Konvention `main_product_hidden`

Beide Templates führen die Theme-Section `main-product` unter dem Key `main_product_hidden`
mit `"disabled": true`. Sie rendert nicht, die Live-Seiten enthalten keine
`shopify-section-...__main_product_hidden`-ID. Der komplette Kaufpfad (Preis, Varianten,
Warenkorb-Form) läuft über `lt-pdp-hero`.

- Der Eintrag bleibt als Parkplatz für Produkt-Blöcke stehen (Rating-Snippet, Titel, bei NMN
  zusätzlich der Appstle-App-Block und `buy_buttons` mit abgeschalteter Optik).
- Nicht löschen, ohne vorher zu prüfen, ob ein App-Block darin noch gebraucht wird.
- Dieselbe Konvention gilt in `templates/product.json` und
  `templates/product.lifetime-age-folgetest.json`. Die älteren Supplement-Templates
  (`product.01_tmg.json` bis `product.12_nad-liposomal-2.json`) folgen ihr **nicht**, dort ist
  `main_product_hidden` aktiv und rendert, weil es Beschreibung, Nährwerte und Verzehrempfehlung
  trägt. Seit 29.09.2026 sind in 01 und 03 bis 11 dort der `buy_buttons`-Block und
  `sticky_add_to_cart` aus (vorher drei Warenkorb-Formulare pro Seite); gekauft wird nur über
  `lt-pdp-hero`. Seit November 2026 haben NAD⁺ (12), Kreatin (05), Resveratrol (06), D3+K2 (07)
  und TMG (01) den Eintrag gar nicht mehr, sie laufen auf der Kette mit sechs Sections oben.

## Preisquelle (häufige Fehlannahme)

`lt-pdp-hero` liest die Preise seit dem 2026-07-18 immer aus der echten Variante
(`lt_variant_1.price` beziehungsweise die gewählte Größe), nicht aus den Settings. Die Settings
`pill_1_once_price_cents` und `pill_1_sub_price_cents` stehen zwar noch im Schema und in allen
Templates, werden aber im Liquid nirgends mehr gelesen. Beispiel NMN: Template sagt `3990`, live
ausgeliefert wird `data-once-price="3390"` aus der 30-g-Variante. Preise also im Shopify-Produkt
ändern, nicht im Template. Die Versandschwelle 49 € ist dagegen wirklich hardcodiert in
`sections/lt-pdp-hero.liquid` (SSR und JS, `>= 4900`).

## Buybox- und Heading-Logik (gilt für beide PDPs)

- `show_subscription_toggle` steuert die Abo-Auswahl. NMN: `true`, die Abo-Karte ist
  vorausgewählt. AGE&DNA: `false`, es rendert nur die Einmalkauf-Karte, ohne ODER-Trenner und
  ohne Appstle-Widget.
- `show_size_selector` greift nur, wenn das Produkt mehr als eine Variante hat. NMN: `true`
  (30/60/90 g), Default ist die kleinste Gramm-Variante, ein `?variant=`-Deep-Link wählt die
  Größe vor. AGE&DNA: nicht gesetzt.
- Trust-Zeilen `trust_1` bis `trust_4` sind frei belegbar, `trust_4` ist optional und kann ein
  Popup öffnen (`trust_4_popup_title` / `trust_4_popup_body`, auf der NMN-PDP der
  Novel-Food-Hinweis).
- In `crs-risk-free-close` ist `price_fallback` nur der serverseitige Platzhalter. Ein Skript in
  der Section überschreibt die Zeile mit dem aktuellen Preis aus der Buybox, sobald eine
  Abo-Karte auf der Seite existiert.
- In allen `crs-*`-Sections blendet der Wert `__none__` ein Feld aus (`kicker`, `subheading`,
  `intro`). Leerstring ist nicht dasselbe, siehe `docs/section-heading-stack.md`.

## Prüfmethode

Reihenfolge aus dem Template neu ableiten (der Kommentar-Header vor dem JSON muss weg):

```bash
python3 - <<'PY'
import re, json, pathlib
for f in ['templates/product.nmn-pulver.json', 'templates/product.age-dna-test.json']:
    t = json.loads(re.sub(r'^\s*/\*.*?\*/', '', pathlib.Path(f).read_text(), flags=re.S))
    print('==', f, len(t['order']), 'Sections')
    for i, key in enumerate(t['order'], 1):
        s = t['sections'][key]
        print(f"{i:2} {key:24} {s['type']:24} {'DISABLED' if s.get('disabled') else ''}")
PY
```

Gegen die Live-Seite prüfen (zeigt die tatsächlich gerenderten Sections in Reihenfolge):

```bash
curl -sS https://www.lifetime-health.de/products/lifetime-nmn \
  | grep -o 'id="shopify-section-[a-zA-Z_0-9-]*"'
```

Template-Zuordnung nie aus dem Dateinamen raten, sondern am Produkt bestätigen
(Shopify-MCP oder Admin-GraphQL):

```graphql
query { product(id: "gid://shopify/Product/...") { handle templateSuffix } }
```

## Neue PDP anlegen

Feldweise Checkliste, Duplizier-Vorlage und Push-Workflow stehen in
`docs/lt-pdp-template-notes.md`. Plattformgrenzen: maximal 25 Sections im `order`-Array,
Schema-`name` maximal 25 Zeichen.
