---
status: snapshot
last_review: 2026-08-19
canonical_for: agedna-pdp-distill (Schnittplan, Ziel-Reihenfolge)
supersedes: []
review_cadence_days: 14
---

# AGE&DNA-PDP: Distill-Schnittplan (19.08.2026)

Ziel: Der Besucher kommt schneller zur Entscheidung. Eine Seite, ein Kaufziel (Test 349 €), jede Section hat genau einen Job, nichts wird zweimal gesagt. Grundlage: Live-Seite `/products/lifetime-age-dna` am 19.08. (mobil 17.013 px lang, 15 aktive Sections, 2.407 Wörter), Template `templates/product.age-dna-test.json`.

## Befund in einem Satz

Die Seite sagt dieselben fünf Dinge vier- bis siebenmal (zwei Ebenen, Eurofins ISO 17025, 6 Wochen, Trust-Zeilen, Kauf-CTA), verpackt fast jede Aussage in Karten auf Flächen in Kästen, und hat vier Abschlüsse (drei dunkle CTA-Bänder plus Close) neben Buybox und Sticky-ATC.

| Redundanz | Wo sie heute steht | Soll |
|---|---|---|
| „Zwei Ebenen, eine Probe" | Hero-Bullets, Metrics-Row-Headline, Feature-Grid-Headline, Report-Preview, Vergleichstabelle, CTA-Band | Hero + eine Leistungssection |
| Eurofins / ISO 17025 | Hero-Bild, Hero-Trust, Ablauf Schritt 2, Tabelle, Close, CTA-Band, FAQ | Hero-Trust, Ablauf, Close |
| Kauf-CTA (ohne Sticky) | Buybox, Band nach Report, Band nach Reviews, Close, Band nach Loox | Buybox, ein Band, Close |
| Reviews | Hero-Rating, crs-customer-reviews (8), Loox-Widget (121, clientseitig) | Hero-Rating + eine Review-Section |
| Trust-Zeilen | Hero 2+4, Bänder je 2, Close-Subline als Liste + 6 Zeilen darunter | Hero 3, Close 3 |

## Urteil je Section

| # live | Key | Urteil | Begründung |
|---|---|---|---|
| 1 | `main` (lt-pdp-hero) | **bleibt, wird entschlackt** | Träger von Aufmerksamkeit + Handlung. Aktions-Box wird Zeile, Limmroth-Karte wird Zeile, Trust 2+4 → 3, „Das steckt im Preis" bleibt (BJ-Offer-Architektur 16.08.), verliert aber Kasten. |
| 2 | `logo_garden` | **bleibt, flach** | Fünf graue Kacheln → eine Logozeile ohne Kacheln. „Bekannt aus" bleibt (2 Wörter). |
| 3 | `metrics_row` (= Ablauf, seit 14.08.) | **bleibt, flach, bekommt `#ablauf` zurück** | Drei weiße Karten → drei Zeilen (Ziffer · Titel · Zeit). **Der Google-Sitelink 331869877943 zielt auf `#ablauf`, der Anker ist seit d615cdb (14.08.) nicht mehr auf der Seite.** |
| 4 | `feature_grid` (6 Karten) | **wird zusammengelegt** → „Leistung" | Sechs Karten + Report-Preview + Expert-Quotes sind drei Sections für eine Stufe (Verständnis), 4.676 px mobil. |
| 5 | `report_preview` | **wird zusammengelegt** → „Leistung" | Das App-Visual ist das beste Asset der Seite und bleibt, die drei Kästen „Was sich bewegt / fest bleibt / fragen kannst" werden zu einem Satz plus FAQ-Eintrag „Wiederholen". |
| 6 | `cta_band_report` | **fliegt raus** | Nach 6.300 px schon das zweite Kaufangebot neben Sticky-ATC; Headline ist Variante der Hero-Headline. |
| 7 | `expert_quotes` („Danach weißt du, wo du ansetzt") | **fliegt raus, Essenz wandert in die Leistung-Subline** | Keine Zitate mehr, drei graue Textkästen. Die Aussage (Werte statt allgemeine Empfehlungen) steht in Hero-Bullet 2 und wird Subline der Leistungssection. |
| 8 | `comparison_table` | **bleibt, flach, gekürzt** | Einzige Section, die den Preis gegen reine Epigenetik-Tests rechtfertigt. Aber 1.743 px mobil, Gruppenkasten > Zeilenkasten > Zellen. Soll: 4 Kriterien, Haarlinien-Zeilen, keine Gruppen-Boxen. |
| 9 | `customer_reviews_test` | **bleibt, wird die einzige Review-Section** | Serverseitig gerendert (SEO/KI lesbar), substanzielle Texte. Pills raus, 8 → 4 Reviews, Headline kürzen. Bekommt `id="lt-reviews"` (Scroll-Ziel des Hero-Ratings). |
| 10 | `cta_band_reviews` | **bleibt als einziges Band** | Sitzt am Vertrauens-Peak (nach Reviews), zwei Sections vor dem Close. Aktionszeile bleibt. |
| 11 | `ideal_candidate` | **bleibt, flach** | Selbstqualifikation plus ehrlicher Ausschluss, kurz. Zwei weiße Kästen → zwei Listen nebeneinander (desktop) / untereinander (mobil), Haarlinie dazwischen. 4+4 → 3+3. |
| 12 | `faq_accordion` | **bleibt, 12 → 8** | Raus: „Unterschied genetisches Profil / biologisches Alter" (steht in Leistung), „Supplement-Empfehlungen" (Hero-Bullet 2), „Mit Arzt teilen" (Leistung-Zeile), „Wie erhalte ich Ergebnisse" (Dublette zu „Wie lange dauert es"). |
| 13 | `risk_free_close` | **bleibt, ist der einzige Close** | Subline ist heute eine Trust-Liste in fünf Zeilen und verletzt die Heading-Pair-Regel; darunter stehen dieselben sechs Punkte noch mal. Soll: ein Satz Subline, 3 Trust-Zeilen, Preis mit Streichpreis (heute fehlt er hier, in den Bändern steht er). Bild: Kit-Shot statt Dublette des Hero-Bildes. |
| 14 | `loox_reviews` (apps) | **fliegt raus** | Zweite Review-Section, clientseitig leer für Crawler, 1.736 px mobil, hinter dem Close. Rating 4,7/121 im Hero kommt serverseitig und bleibt. |
| 15 | `cta_band_loox` | **fliegt raus** | Dritter Abschluss direkt über dem Footer, zwei Sections nach dem Close. |
| 16 | `main_product_hidden` | bleibt deaktiviert | Konvention, siehe `pdp-system.md`. |

Bilanz: 15 aktive Sections → 10. Geschätzte Mobil-Länge 17.000 → ca. 9.500 px (minus 45 %). Kaufangebote ohne Sticky 5 → 3.

## Ziel-Reihenfolge

| # | Key | Job | Fläche |
|---|---|---|---|
| 1 | `main` | Aufmerksamkeit + Handlung | #f7f7f4 |
| 2 | `logo_garden` | Vertrauen (Presse) | #f7f7f4, keine Kacheln |
| 3 | `metrics_row` → Ablauf, Anker `ablauf` | Kaufhürde „kompliziert?" wegräumen | #f2f1ed |
| 4 | `feature_grid` → Leistung (mit App-Visual) | Verständnis: was du bekommst und wofür | #f7f7f4 |
| 5 | `comparison_table` | Vertrauen: warum dieser und nicht der 99-€-Test | #f2f1ed |
| 6 | `customer_reviews_test`, `id="lt-reviews"` | Vertrauen: Käufer | #f7f7f4 |
| 7 | `cta_band_reviews` | Handlung (einziges Band) | #364f56 |
| 8 | `ideal_candidate` | Persönliche Relevanz | #f7f7f4 |
| 9 | `faq_accordion` | Risikoreduktion | #f2f1ed |
| 10 | `risk_free_close` | Handlung (Close) | #f7f7f4 |
| 11 | `main_product_hidden` | deaktiviert | |

Flächenrhythmus hell/hell-warm im Wechsel, genau eine dunkle Fläche (Band). Ablauf vor Leistung bleibt BJ-Entscheid vom 13.08. (Surface-Brief Ablauf), wird nicht neu verhandelt.

## Die drei Bauregeln für den Umbau

1. **Kein Kasten im Kasten.** Karten nur für „Papier": die zwei Optionskarten der Buybox und die Review-Blätter. Alles andere (Ablauf, Leistung, Tabelle, Passung, Close, Logos, Preis-Stack) trennt mit Weißraum und 1px-Haarlinie (`rgba(38,37,30,0.12)`), kein Hintergrundwechsel, kein Schatten. Template-Hebel: `color_card_bg` = `color_bg` der Section. Wo die Section zusätzlich Kante oder Schatten zeichnet (comparison_table 31 Border-Regeln, feature_grid, ideal_candidate, Hero-Stack), ist es ein CSS-Eingriff in der Section.
2. **Titel + Untertitel = ein Block.** Gleiche Größe, gleiche Schrift, gleiches Gewicht (regular), Unterschied nur Opacity 0.72. Mobil je 1 bis 2 Zeilen. Heute verletzt: Feature-Grid (Headline zwei Sätze + Subline), Reviews (Headline drei Zeilen), Close (Subline ist Liste). Alle `heading_size` bleiben `feature`, Hierarchie-Hebel nur über die Länge.
3. **Jede Aussage genau einmal.** Wenn es im Hero steht, kommt es unten nicht als Karte wieder. Die Section darunter vertieft, sie wiederholt nicht.

## Copy-Skelett der neuen Paare

- Ablauf: „So läuft der Test." / „Kit nach Hause, Probe in fünf Minuten, Ergebnis in sechs Wochen in der App."
- Leistung: „Eine Probe, zwei Ebenen." / „Danach weißt du, welcher Bereich vorläuft und welche Wirkstoffe zu dir passen." Darunter App-Visual (aus report_preview) plus vier Haarlinien-Zeilen: Biologisches Alter (sechs Bereiche) · 23 DNA-Kategorien · App mit AI Health Coach, PDF-Export, mit Arzt teilbar · Face Scan. Ghost-Link „Alle Details" auf `/pages/was-ist-enthalten`.
- Vergleich: „Alterstest ist nicht gleich Alterstest." / „Nur einer misst beide Ebenen." Vier Zeilen: Messmethode · Genetische Anlage · Erklärung in der App · Labor.
- Reviews: „Was Käufer berichten." / Subline entfällt (Rating steht im Hero).
- Passung: „Du siehst dich hier wieder?" / Subline entfällt.
- Close: „Verstehe, wie du wirklich alterst." / „Eine Speichelprobe, Ergebnis in sechs Wochen, 30 Tage Widerruf." Preis 349 € statt 449 € bis 30.08., drei Trust-Zeilen (Eurofins ISO 17025 · Kostenfreier Laborversand · Ungültige Probe, neues Kit kostenlos).

## Hero-Entschlackung im Detail

Reihenfolge bleibt (Rating, Headline-Paar, drei Bullets, zwei Optionskarten, Aktion, Chargen-Zeile, ATC, Trust, Zahlarten, Stack, Limmroth, „Unsicher?"). Änderungen:

- Aktionspreis-Box (rosa Kasten) → eine Zeile in Promo-Rot unter den Optionskarten, Countdown bleibt (echte Frist 30.08.).
- Trust 2 Zeilen unter ATC + 4 Zeilen unter Stack → 3 Zeilen unter ATC: „30 Tage Rückgabe, solange das Kit versiegelt ist" · „Eurofins-Labor ISO 17025 · Ergebnis in 6 Wochen" · „Kauf auf Rechnung mit Klarna". DSGVO-Zeile wandert in die FAQ (steht dort schon).
- „Das steckt im Preis" bleibt, verliert Rahmen (Haarlinien-Zeilen), `stack_retest_text` bleibt (Folgetest 299, BJ-Entscheid).
- Limmroth-Karte → Zeile mit Foto, Name, Funktion; die zwei Chips („Spiegel Bestseller", „20+ Jahre Forschung") raus. Er ist der Differenzierer, die Chips sind Deko.

## Was der Umbau nebenbei repariert

- Sitelink-Anker `#ablauf` (seit 14.08. tot).
- Hero-Rating scrollt heute ins Loox-Widget; Fallback im Hero-JS ist `#lt-reviews`, die Review-Section bekommt diese ID.
- Close ohne Streichpreis, Bänder mit Streichpreis: inkonsistent, wird einheitlich.
- Heading-Pair-Verstöße in Feature-Grid, Reviews, Close.

## Risiken und was nicht angefasst wird

- Loox-Widget raus bedeutet: kein „Bewertung schreiben" auf der PDP und keine Sterne-Verteilung. Rating-Snippet und aggregateRating im JSON-LD sind davon unabhängig (serverseitig). Wenn BJ die Verteilung behalten will: ins `crs-customer-reviews` als eine Zeile unter der Headline, nicht als zweite Section.
- Offer-Architektur (Stack, Folgetest 299, Chargen-Zeile, 449/549-Regime bis 30.08.) bleibt inhaltlich unverändert, nur die Verpackung ändert sich.
- `main_product_hidden` bleibt. App-Block-Prüfung vor Löschung der Loox-Section: die Section `loox_reviews` ist ein `apps`-Block, kein Teil von `main_product_hidden`.
- Flächen: Theme Manager pusht automatisch, wenn er läuft. Umbau deshalb in der Reihenfolge Sections (CSS) zuerst, Template-JSON zuletzt, und am Stück.

## Umsetzungsreihenfolge (wenn freigegeben)

1. Sections flach machen: `crs-metrics-row`, `crs-feature-grid` (Visual-Slot), `lt-comparison-table`, `lt-pdp-ideal-candidate`, `crs-logo-garden`, `crs-risk-free-close`, Hero-Stack/Aktion/Limmroth/Trust in `lt-pdp-hero`. Review-Section: `id="lt-reviews"` + Pills-Schalter.
2. Template: `order` auf die Ziel-Reihenfolge kürzen, Sections `report_preview`, `cta_band_report`, `expert_quotes`, `loox_reviews`, `cta_band_loox` aus `sections` entfernen, Copy-Paare setzen, FAQ auf 8 Blöcke, Reviews auf 4.
3. Dev-Server + curl gegenprüfen (Liquid rendert, `#ablauf` und `#lt-reviews` vorhanden), Mobil-Screenshot per Headless-Chrome, dann `pdp-system.md` nachziehen.
