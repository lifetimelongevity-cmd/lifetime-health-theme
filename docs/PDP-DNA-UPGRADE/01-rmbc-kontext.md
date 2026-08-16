---
status: living
last_review: 2026-08-16
canonical_for: rmbc-kontext-age-dna
depends_on:
  - docs/age-dna-product-fact-sheet.md
  - docs/pdp-system.md
review_cadence_days: 30
---

# RMBC-Kontext: AGE & DNA-Test

Gemeinsamer Kontext-Rahmen für alle RMBC-Skills, die an diesem Produkt arbeiten
(Research, Mechanism, Brief, Copy, Ads, Mails). Downstream-Skills lesen diese Datei,
bevor sie etwas erzeugen, damit Angle, Proof und Sperren nicht jedes Mal neu erraten werden.

Faktenbasis ist `docs/age-dna-product-fact-sheet.md`. Diese Datei wiederholt keine Produktfakten,
sie ordnet sie in den RMBC-Rahmen ein.

**Live-Stand geprüft am 2026-08-14** per Abruf von `https://www.lifetime-health.de/products/lifetime-age-dna`
und Gegenprüfung der Varianten in der Shopify Admin API.

---

## 0. Verifizierter Ist-Stand

| Feld | Wert | Quelle |
|---|---|---|
| Produkttitel Shopify | Epigenetischer AGE & DNA-Test für zuhause | Admin API |
| Variante 1 | „Test", 349,00 €, `LT-DNA-TST-GE`, compare_at 399,00 € | Admin API |
| Variante 2 | „Test + Ergebnisgespräch", 449,00 €, `LT-DNA-TST-GE-EG`, kein compare_at | Admin API |
| Rating im JSON-LD | 4,7 aus 121 Bewertungen | Live-HTML |
| Section-Reihenfolge | hero, logo_garden, metrics_row, feature_grid, report_preview, expert_quotes, comparison_table, customer_reviews, ideal_candidate, faq, risk_free_close, loox | `templates/product.age-dna-test.json` |
| Quiz-Rabattbanner | im HTML vorhanden, per `hidden` gegated, greift nur für Quiz-Besucher | Live-HTML |
| Urgency-Element | keins auf der Seite | Live-HTML |

> **Nachtrag 2026-08-16.** Die Tabelle oben ist der Stand vom 14.08. und wird nicht überschrieben.
> Seither live: drei CTA-Bänder (`cta_band_report` nach `report_preview`, `cta_band_reviews` nach
> `customer_reviews`, `cta_band_loox` nach dem Loox-Block), das `order`-Array hat damit 16 statt 12
> Einträge. Der Copy-Umbau vom 16.08. hat die Reihenfolge **nicht** verändert, nur die Inhalte von
> `hero`, `metrics_row`, `report_preview` und `expert_quotes`. Details in
> [`06`](06-kausalkette.md) §7.

Der Streichpreis von 399 € ist ein echter `compareAtPrice` in Shopify, kein Theme-Setting.
Die Premium-Variante trägt bewusst keinen, deshalb zeigt Karte 2 weder Streichpreis noch Sparbadge.

---

## 1. Research: Kontext-Map

### Awareness-Verteilung nach Traffic-Quelle

Die Verteilung stammt aus dem Conversion-Basisbild (Juli/August 2026) und der Quiz-Funnel-Messung
vom 12.08. Sie ist Schätzung auf Datenbasis, keine gemessene Segmentierung.

| Quelle | Awareness | Volumen und Verhalten | Copy-Konsequenz |
|---|---|---|---|
| Google organisch | solution- bis product-aware | effizientester Kanal, 4,3 % CR, trägt die 349-€-Käufe | Mechanismus-Differenzierung und Proof, kurze Wege zum Kauf |
| Google Ads (Search) | solution-aware, transaktionale Queries wie „biologisches alter test" | 320 Klicks in 14 Tagen, 0 Käufe, landet auf `/pages/quiz-age` | Der Bruch liegt im Ziel, nicht in der Anzeige. Landing-Entscheidung gehört vor jede Ad-Copy-Arbeit |
| Quiz-Funnel | problem- bis solution-aware | 444 `quiz_completed` in 60 Tagen, davon 7 E-Mail-Abgaben | Engpass ist das E-Mail-Gate, nicht der Report. Wer den Report optimiert, arbeitet an 21 Aufrufen |
| KI-Referrals | solution-aware, hoher Vertrauensvorschuss | kleine, wachsende Basis, erste attribuierte Order 02.08. | zitierfähige, konkrete Fakten schlagen Markensprache |
| E-Mail | most aware | praktisch inexistent, Kanal wird gerade in Klaviyo aufgebaut | offene Fläche, kein Bestand zum Anknüpfen |

**Gerätelage:** Mobil sind 70 % des Traffics, aber Desktop konvertiert etwa doppelt so gut
(2,7 % gegen 1,8 %) und trug beide 349-€-Testkäufe der Referenzperiode. Bei diesem Preispunkt ist
das plausibel und kein Bug, es verschiebt aber die Priorität: Mobile trägt die Entscheidungsvorbereitung,
Desktop den Abschluss. Copy muss auf dem Handy vollständig überzeugen, ohne den Abschluss dort zu erzwingen.

### Wettbewerbs-Position

| Anbieter | Preis | Was er liefert | Lücke |
|---|---|---|---|
| epiAge | ~199,95 € | reine Epigenetik, sehr breite Entitäts-Präsenz über ~14 Domains | keine Genetik, kein JSON-LD, kein benannter Arzt |
| Cerascreen | 399 € | redaktioneller Default in deutschen Vergleichstexten | eine Ebene, kein Verlaufsangebot |
| TruDiagnostic | – | gilt in Texten als „präzisester" | keine deutsche Domain, reine Reputationsnennung |
| neotes | – | struktureller Benchmark: einziger mit Vergleichstabelle **und** offen benannten Grenzen | – |

LIFETIME liegt mit 349 € zwischen epiAge und Cerascreen. Gegen epiAge kostet der Test das
1,75-Fache, das muss die Copy tragen. Der vorhandene Träger ist die zweite Ebene (Genetik plus
Epigenetik in einem Kit), nicht der Preis.

**Zwei unbesetzte Spuren, verifiziert am 03.08.:**

1. **Genauigkeit und Fehlermarge.** Kein Anbieter beantwortet die Frage öffentlich. Perplexity zieht
   dafür ausschließlich PubMed heran und zitiert null Anbieter. Das ist die stärkste offene
   Autoritätsfläche, und sie passt zu Limmroth.
2. **Benannte deutsche Vergleichstabelle.** Die vorhandenen Tabellen im Markt sind entweder
   Affiliate-getrieben oder lassen die relevanten Anbieter weg.

### Sprachbank aus echten Kundenstimmen

Direkt von der Live-PDP, verifizierte Käufer. Das ist die belastbarste Sprachquelle, die es
für dieses Produkt gibt, und sie ist in der Copy bisher kaum genutzt.

**Pain, wörtlich:**
- „Ich habe vorher viele Supplemente genommen und nie gewusst, ob sie wirklich zu mir passen."
- „Mein biologisches Alter liegt 6 Jahre über meinem chronologischen. Das hat mir nicht gefallen."

**Desire, wörtlich:**
- „Ich bin 46, mein biologisches Alter: 38. Das hat mich motiviert weiterzumachen."
- „Das ist verwertbares Wissen."
- „Ich weiß jetzt, wo ich ansetzen muss."

**Objection, wörtlich:**
- „Die Menge an DNA-Reports klingt erstmal überwältigend."
- „War skeptisch, aber das Ergebnis hat mich überzeugt."
- aus den FAQ-Fragen abgeleitet: Aussagekraft der Speichelprobe, 6 Wochen Wartezeit, Datenschutz,
  Abgrenzung zur Diagnose, was nach dem Ergebnis kommt

**Identität:** „Daten statt Gefühl, bevor du startest." Das steht bereits als erste Zeile in der
Ideal-Candidate-Section und ist die präziseste Selbstbeschreibung der Zielgruppe im ganzen Bestand.

### Produktebene: was im Regal liegt und nicht benutzt wird

Vollständig in `age-dna-product-fact-sheet.md`. Für Copy-Zwecke drei Punkte, die dort belegt sind
und live nirgends vorkommen:

- **Der Report „NMN und Ausdauer"** in der Kategorie Nahrungsergänzungsmittel. Der Test liefert ab
  Werk eine individuelle NMN-Ansprechbarkeit. Das ist die sachlich sauberste Brücke zwischen den
  beiden Hauptprodukten und in keinem Touchpoint genutzt.
- **32 Lifestyle-Reports** ohne Krankheitsbezug (Schlaf, Physisch, Ernährung, Stress). Compliance-arm
  und damit das leichteste Copy-Material im ganzen Katalog.
- **Reale Durchlaufzeit 29 Tage** am geprüften Kit, öffentlich zugesagt sind 6 Wochen. Die Zusage
  bleibt konservativ, bis mehrere Kits gemessen sind.

---

## 2. Mechanism: Status und Spielraum

**Heutiger Stand.** Die PDP hat einen Namen (MethylPace) und einen guten Kausal-Rahmen:
„DNA zeigt, was angelegt ist. Epigenetik zeigt, wo du heute stehst." Was fehlt, ist die Ebene
darunter, also eine Erklärung, **warum diese Messung stimmt**. Die Differenzierung läuft aktuell
über Umfang (zwei Ebenen statt einer) und wird von der Vergleichstabelle getragen. Umfang ist ein
Argument, aber kein Mechanismus im RMBC-Sinn: er erklärt nicht, weshalb das Ergebnis belastbar ist.

**Was den „only we"-Test besteht:**
- die Kombination beider Ebenen in einem Speichel-Kit mit deutschsprachiger App
- das biologische Alter nach Körper-Bereichen (Höralter, Augenalter, Gedächtnisalter) statt einer Zahl
- Limmroth als einziger credentialed Arzt im deutschen Feld

**Freigegebene Bausteine für Mechanismus-Arbeit:**
- Horvath-Bezug: orientiert sich an dessen Methode, kommt mit deutlich weniger Messstellen aus als
  das 353-Positionen-Modell, Zweck ist ein kostengünstigeres Verfahren. Sachlicher Anker ist
  Sugden et al., Patterns 2020: die Auswahl der Messstellen zählt mehr als ihre Menge.
- MethylPace als Alterungsgeschwindigkeit, das biologische Alter liegt als Wert darin
- Eurofins Genomics, ISO 17025
- 23 DNA-Kategorien, sechs epigenetische Bereiche mit zwölf Einzelwerten

**Harte Sperren, gelten für jeden Output:**
- Name des Uhr-Anbieters und des Coach-Systems (MAISIE): nie in Copy. **Eingeschränkt per
  BJ-Entscheid 2026-08-16:** gilt nicht für den vorhandenen Bildbestand. „Hallo, ich bin MAISIE."
  im App-Bild `Group_40820.png` der PDP bleibt stehen, siehe [`06`](06-kausalkette.md) §2.1. Das
  Bild ist damit kein Auditfund mehr, geschriebene Nennung bleibt gesperrt.
- keine öffentliche CpG-Zahl
- keine feste Gesamtzahl an DNA-Reports. Zulässig sind „23 Kategorien" und „über 150 Einzelergebnisse"
- keine Präzisions- oder Genauigkeitsaussage. Die mittlere Abweichung liegt bei 5,97 Jahren
- „DNA-Sequenzierung", „hochauflösend", „medizinisch valide", „klinische Standards": raus
- 2.600+ und 20.000+ stammen aus einem nicht peer-reviewten Anbieter-Preprint und sind ohne
  zeigbare Quelle
- keine Diagnose, keine Therapieempfehlung, keine garantierte individuelle Wirkung
- die Krankheitsreports (Typ-2-Diabetes, Lupus, Endometriose, Zöliakie, Asthma und weitere) sind
  Teil des Produkts, aber kein Werbeargument
- das Ergebnisgespräch ist **nicht ärztlich**, nie mit Limmroth-Badge oder „ärztlich" bewerben

**Die naheliegende Mechanismus-Spur.** Die unbesetzte Genauigkeitsfrage und die freigegebene
Horvath-Einordnung zeigen in dieselbe Richtung: nicht „wir messen genauer", sondern „wir sagen
offen, was eine Messung leisten kann und was nicht, und deshalb ist die Entwicklung über die Zeit
der eigentliche Wert". Das ist gleichzeitig die einzige Rahmung, die mit der 5,97-Jahre-Abweichung
lebt, statt gegen sie zu arbeiten. Ausarbeitung gehört in `/mechanism-ideation`.

---

## 3. Brief: Rahmen für jede Ausspielung

**Angle-Kandidaten, nach Quelle sortiert:**

| Quelle | Angle | Begründung |
|---|---|---|
| Organisch, PDP-Landing | Kontrast-Angle: zwei Ebenen gegen eine | Der Besucher vergleicht bereits Anbieter, die Tabelle ist der Entscheidungspunkt |
| Ads, transaktional | Ergebnis-Angle: was konkret in der App steht | Die Query ist gelöst, nicht neugierig. Zwischenschritte kosten hier |
| Quiz-Ausstieg | Neugier-Angle auf das eigene Ergebnis | Der Nutzer hat gerade eine Selbsteinschätzung abgegeben, die Lücke zum Messwert ist offen |
| Retest, Bestand | Verlaufs-Angle | Einziger Angle, der die Messungenauigkeit zum Argument macht statt zum Risiko |

**Tonalität:** Du-Form, ruhig, konkret. Keine Em-Dashes, keine Dreiklänge, keine Kicker ohne
Informationsgewinn. Details in `docs/conversion-messaging.md` §9 und im Skill `/ki-slang-cleanup`.

**Proof-Reihenfolge, stärkstes zuerst:**
1. Limmroth namentlich, mit Funktion. Der einzige Proof, den kein Wettbewerber hat.
2. Eurofins Genomics, ISO 17025.
3. Verifizierte Kundenstimmen mit Zahl und Datum, insbesondere die 46-auf-38-Stimme.
4. 4,7 aus 121 Bewertungen.
5. Horvath und Sinclair als Kategorie-Autorität, nicht als Produktbeleg. Sie belegen, dass die
   Methode zählt, nicht dass dieser Test funktioniert. Nie als Produkt-Endorsement rahmen.

**CTA-Rahmen.** Risk Reversal steht und ist gut: 30 Tage Widerruf solange versiegelt, kostenloses
Ersatzkit bei nicht auswertbarer Probe, einmalige Zahlung ohne Folgekosten. Was fehlt, ist jeder
Grund, heute zu kaufen. Zulässige Bauweisen nach der Workspace-Regel:
- echte Per-Kunden-Frist, serverseitig gespeichert, mit Code, der wirklich abläuft
- echte Kampagnenfristen
- echte Batch-Knappheit der Kits aus der Laborkapazität. Diese Zahl ist real und darf offensiv
  gezeigt werden.
Nicht gebaut wird: Timer ohne dahinterliegende Frist, erfundene Lagerbestände, erfundene
Betrachterzahlen.

**Value-Comparison-Pricing, belegbare Anker:**
- 349 € einmalig, lebenslanger Abruf in der App, kein Abo, keine Folgekosten
- Cerascreen liegt mit 399 € höher und liefert nur die epigenetische Ebene
- 23 Kategorien plus sechs epigenetische Bereiche für einen Preis
- 100 € Aufpreis für 45 Minuten persönliche Ergebnis-Einordnung

---

## 4. Copy: Struktur-Constraints

Die Live-Reihenfolge (siehe Tabelle in §0) ist die approbierte PDP-Struktur und wird nicht
umgeworfen, sondern gefüllt. Bau-Referenz ist `_examples/pdp-reference.html`, System-Beschreibung
`docs/pdp-system.md`.

- Absätze mit 1 bis 3 Sätzen, Zwischenüberschrift alle 3 bis 5 Absätze
- Hierarchie ausschließlich über `heading_size` (section 20 / feature 28 / product_title 36)
- keine farbigen Left- oder Accent-Borders, keine neuen Layout-Muster
- alle Werte über Tokens, keine Hex-Codes, keine Pixel
- Reihenfolge unter dem CTA seit 14.08.: Garantie, Zahlarten, Trust-Block, Arzt-Badge, Kontakt-Fallback

---

## 5. Baseline-Score der Live-PDP

Bewertet nach den vier RMBC-Dimensionen, Stand 14.08.2026.

| Dimension | Score | Begründung |
|---|---|---|
| Result Specificity | 16 / 25 | Der Lieferumfang ist sehr konkret (23 Kategorien, sechs Bereiche, 6 Wochen, App). Das Ergebnis für den Kunden bleibt abstrakt: was sich nach dem Test in seinem Alltag ändert, sagt nur eine einzige Kundenstimme. |
| Mechanism Novelty | 14 / 25 | MethylPace ist benannt, der DNA-gegen-Epigenetik-Rahmen sitzt. Es fehlt die Kausalkette, warum die Messung belastbar ist. Differenziert wird über Umfang, und Umfang ist kopierbar. |
| Proof Believability | 18 / 25 | Stärkste Dimension. Limmroth namentlich, Eurofins mit ISO, acht datierte verifizierte Stimmen, 4,7 aus 121, Vergleichstabelle. Abzug für Horvath und Sinclair in Produktnähe und für das ungeprüfte „Bekannt aus". |
| CTA Clarity | 17 / 25 | Klare Aktion mit Preis, starke Risk Reversal, saubere Wiederholung im Close. Null Urgency, null Grund für heute. |
| **Gesamt** | **65 / 100** | Viable. Gezielte Arbeit an zwei Dimensionen, kein Neubau. |

**Der Hebel liegt eindeutig.** Proof und CTA-Handwerk sind über Durchschnitt, Mechanismus und
Ergebnis-Konkretheit ziehen den Score. Genau diese beiden sind die Dimensionen, die laut RMBC
60 bis 70 % des Erfolgs tragen, und beide sind ohne einen einzigen neuen Fakt verbesserbar:
das Material liegt im Fact Sheet und in den eigenen Kundenstimmen.

---

## 6. Offene Punkte, die Copy blockieren oder verzerren

1. **Die Kundensicht in der App ist unverifiziert.** Alles im Fact Sheet stammt aus dem
   Anbieter-Backend. Jede Aussage der Form „du siehst in der App …" steht ohne Beleg. Das betrifft
   die Feature-Grid, die Report-Preview und den halben FAQ-Block. Nächster Schritt wäre ein
   App-Zugang oder ein Screenshot-Satz.
2. **„Bekannt aus" (crs-logo-garden) ist nicht geprüft.** Welche Nennungen dahinterstehen und ob
   sie belegbar sind, steht in keinem Dokument.
3. **Das Ads-Ziel.** Die AGE&DNA-Search-Kampagne landet auf dem Quiz und kauft nicht, alle
   organischen Testkäufe landeten auf PDP oder Collection. Das ist eine Landing-Entscheidung, keine
   Copy-Frage, und sie gehört vor die nächste Ad-Copy-Runde.
4. **Premium-Fulfillment ist manuell.** Bestellungen der SKU `LT-DNA-TST-GE-EG` müssen von BJ
   überwacht werden, es gibt keinen automatischen Flow. Jede Skalierung der Premium-Variante in der
   Copy skaliert diese Handarbeit mit.
5. **`stack_old_total` im Hero steht auf 449,00 €** und ist seit dem 14.08. exakt der Premium-Preis.
   Folgenlos, solange `show_value_stack: false`. Wer den Value-Stack einschaltet, muss den Anker
   vorher hochsetzen.

---

## 7. Handoff: welcher Skill als Nächstes

Priorisierte Maßnahmenliste mit Aufwand und Entscheidungsbedarf: [`02-massnahmen.md`](02-massnahmen.md).

| Ziel | Skill | Vorbedingung |
|---|---|---|
| Mechanismus schärfen (größter Hebel) | `/mechanism-ideation` | diese Datei, Fact Sheet §Probe und Methode |
| Ergebnis-Konkretheit heben | `/customer-research`, dann `/copy-rewrite` | Loox-Volltexte, App-Screenshots |
| Ads-Winkel | `/ad-angle-generator` | erst Punkt 3 aus §6 entscheiden |
| Quiz-Gate reparieren | `/cro` | GA4-Funnel, `/pages/quiz-age` |
| Urgency sauber bauen | `/scarcity-urgency` | reale Batch-Zahl aus der Laborkapazität |

Vollständiges Research nach RMBC (vier Schritte, Unified Research Document) ist hier **nicht**
gemacht. Diese Datei ist der Kontext-Rahmen, nicht das URD. Wenn ein Skill echtes Research braucht,
läuft `/unified-research-synthesizer` gegen dieses Dokument plus Fact Sheet.
