# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Deutschsprachige, gesundheitsbewusste Erwachsene ca. 40–65, die wissen wollen, wie schnell sie altern und was sie konkret dagegen tun können. Sie kommen über Google Search (NMN, biologischer Alterstest), Presse (RTL, SAT.1, SWR1, KStA, Maxima) und KI-Kanäle. Skeptisch gegenüber Lifestyle-Hype, empfänglich für Labor- und Arzt-Autorität. Sekundär: Ärzte und Fachpublikum (eigene Expertenseite).

## Product Purpose

LIFETIME Health verkauft den AGE & DNA-Test (349 €, Premium 429 € mit Ergebnisgespräch): eine Speichelprobe, ausgewertet bei Eurofins Genomics (ISO 17025), liefert biologisches Alter (epigenetisch, öffentlich „MethylPace", sechs Bereiche), genetische Ergebnisse aus 23 Kategorien, KI Health Coach und Face-Scan-Hautanalyse in der App. Ergebnis nach 6 Wochen, lebenslang verfügbar. Sekundär: Supplemente (NMN u. a.) als Ergänzung NACH dem Test („Erst testen, dann ergänzen").

## Positioning

Kombination aus Epigenetik (wie du alterst) + Genetik (warum) aus einer einzigen Speichelprobe, mit ärztlicher Autorität durch Prof. Dr. med. Volker Limmroth (Chefarzt Neurologie, CSO). Wettbewerber liefern eines von beiden; der echte Differenzierer ist Limmroth, nicht Laborqualität (Marktstandard).

## Operating Context

Live-Shopify-Shop lifetime-health.de (Theme Combine v3.1.1, stark customisiert). Homepage = Template `templates/index.json`, 12 Sections, primäres Conversion-Ziel Testkauf. Kanonisches Fundament: die 5 Live-Seiten in CLAUDE.md. Conversion-Architektur dokumentiert in `docs/homepage-blueprint-v2.md`.

## Capabilities and Constraints

- Deutsch, Du-Form. Keine Heilaussagen, keine Krankheits-Claims, kein Claim-Stacking (`docs/conversion-messaging.md`).
- Keine Em-Dashes, keine Dreiklang-Slogans, keine dekorativen farbigen Left-Borders (KI-Tell-Verbote).
- Uhr-Anbieter des epigenetischen Tests NIE nennen (White-Label, öffentlich „MethylPace"); keine CpG-Zahlen-Positionierung.
- Zahlen-SoT: 23 DNA-Kategorien (nicht 187), keine feste Reportzahl, 30 g NMN ≈ 2 Monate.
- Shopify-Section-Limits: max 25 Sections pro Template, Schema-Namen max 25 Zeichen.
- Standort-Claims: „aus Köln", nie Berlin.

## Brand Commitments

- Palette: #f7f7f4 / #f2f1ed helle Flächen im Wechsel, #364f56 dunkle Fläche, #26251e Text (nie Fläche), #65c0b6 Teal-Akzent, #f4b740 Gold sparsam. Kein reines Schwarz als Hintergrund.
- Typografie: Lato (keine neuen Fontfamilien im Theme).
- Heading-Hierarchie: heading_size 36/28/20 (product_title/feature/section).
- Heading-Pair-Regel (BJ-Entscheid, steht über allem): Headline + Subline sind EIN Block, identisch in Größe, Schrift, Zeilenhöhe UND Gewicht (beide regular). Der einzige Unterschied ist Farbe/Opacity: Ink vs. rgba(38,37,30,0.72) bzw. 0.72-Weiß auf dunkel. Kanonik: `snippets/section-heading-crs.liquid` + `docs/section-heading-stack.md`. Nie zwei Hierarchieebenen daraus machen, nie über Fettung differenzieren.
- Ton: klinisch-editorial, ruhig, intelligent aber einfach; Kicker/Eyebrows nur bei echtem Informationsgewinn.
- Autoritätsperson: Prof. Dr. med. Volker Limmroth, immer mit vollem Namen.

## Evidence on Hand

- Presse-Logos: RTL, SAT.1, SWR1, Kölner Stadt-Anzeiger, Maxima (Assets im Shopify-CDN).
- Testimonials mit Retest-Verläufen (Markus T. 47→44, Sophie K. 60→58, Dr. med. Andreas F. 65→64) + Aggregat-Stats (4 von 5, 9 von 10, 2 von 3; Basis 124 Befragte Begleitprogramm).
- Expertenvideo + Zitat Limmroth, Produktbild `Product-gallery_tst.png`, Beraterfoto, Mood-Bild `mood-sport.png`.
- Kein weiteres Bildmaterial mit Menschen/Wirkversprechen erlaubt (Compliance).

## Product Principles

1. Erst testen, dann ergänzen: kein Supplement-Pitch vor der Diagnostik.
2. Beweisen statt behaupten: Labor, Arzt, Presse, Retest-Verläufe statt Adjektive.
3. Früh kaufbar: CTA im Hero, dann rhythmisch wiederholt; jede Section hat einen Job und einen Ausgang.
4. Messwert statt Versprechen: biologisches Alter als Zahl und Verlauf, nie als Heilversprechen.
5. Ruhe ist Teil der Autorität: klinisch-editorial, keine Hype-Mechanik.
