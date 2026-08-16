---
status: living
last_review: 2026-08-16
canonical_for: pdp-age-dna-upgrade
review_cadence_days: 30
---

# PDP-DNA-UPGRADE

Arbeitspaket zur AGE&DNA-PDP, angelegt am 14.08.2026 aus einem RMBC-Kontext-Durchlauf gegen
`https://www.lifetime-health.de/products/lifetime-age-dna`.

## Inhalt

| Datei | Was drin steht |
|---|---|
| [`01-rmbc-kontext.md`](01-rmbc-kontext.md) | Kontext-Rahmen für alle RMBC-Skills: Awareness-Map, Wettbewerb, Sprachbank, Mechanismus-Spielraum, Sperrliste, Baseline-Score |
| [`02-massnahmen.md`](02-massnahmen.md) | Priorisierte Maßnahmen mit Aufwand und Entscheidungsbedarf |
| [`03-cro-befunde.md`](03-cro-befunde.md) | Gemessene CRO-Ebene: GA4- und Shopify-Zahlen, Layout bei 375 px, elf Befunde, Methodik zum Nachmessen (`snapshot` vom 14.08.) |
| [`04-mechanismus.md`](04-mechanismus.md) | Sieben Mechanismus-Kandidaten mit Score, Proof, Einwänden und Sperren-Check. Empfehlung: Kandidat 2, 3 und 6 als ein zusammenhängender Mechanismus |
| [`05-nutzenblock.md`](05-nutzenblock.md) | Erste Copy-Umsetzung: `crs-expert-quotes` wird vom Zitatband zum Nutzenblock. Vorher/Nachher, Sperren-Check, Höhenrechnung, Bauvorgaben. **Gebaut 16.08.** |
| [`06-kausalkette.md`](06-kausalkette.md) | **Gesamtempfehlung.** Die ganze PDP als eine Argumentationskette, plus Rewrites für Hero, `crs-metrics-row` und `lt-pdp-report-preview`. Enthält Bau-Reihenfolge, Höhenbudget und die Live-Funde. **Gebaut 16.08.** |
| [`07-offer.md`](07-offer.md) | **Offer-Architektur.** Wettbewerbs-Offer-Analyse (Retest-Lücke), DB-Rechnung je Variante, Preisarchitektur (149-€-Gesprächs-SKU als Anker, Premium 499 ab 31.08., Folgetest-Testkundenpreis 249 €) und der neue Angebots-Stack im Hero. Beantwortet C9. **Stack gebaut 16.08., nicht gepusht, Push-Gate in §6. Preise brauchen BJ-Freigabe.** |

01/02 fragen, ob die Seite das Richtige sagt. 03 fragt, ob sie auf dem Gerät ankommt, auf dem sie
gelesen wird. 04 liefert den Mechanismus, 05 und 06 sind die Flächen, die daraus gebaut werden.
**Wer nur eine Datei liest, liest 06.** Die Ebenen überschneiden sich kaum, an einer Stelle
widersprechen sie sich (siehe unten).

**Faktenbasis ist nicht hier.** Kanonisch bleibt `docs/age-dna-product-fact-sheet.md`. Dieses Paket
wiederholt keine Produktfakten, es ordnet sie ein. Bei Konflikt gewinnt das Fact Sheet, bei
Konflikt zwischen Fact Sheet und Live-Seite gewinnt die Live-Seite.

## Ausgangslage

Baseline-Score der Live-PDP: **65 / 100**. Viable, kein Neubau.

| Dimension | Score | Kurz |
|---|---|---|
| Proof Believability | 18 | stärkste Fläche, Limmroth namentlich, Eurofins, 121 Bewertungen |
| CTA Clarity | 17 | starke Risk Reversal, null Urgency |
| Result Specificity | 16 | Lieferumfang konkret, Kundennutzen abstrakt |
| Mechanism Novelty | 14 | MethylPace ist ein Name, keine Kausalkette |

Proof und CTA-Handwerk liegen über Durchschnitt. Gezogen wird der Score von den beiden Dimensionen,
die laut RMBC 60 bis 70 % des Erfolgs tragen. Beide sind ohne einen einzigen neuen Fakt verbesserbar,
das Material liegt im Fact Sheet und in den eigenen Kundenstimmen.

## Die drei Sätze, auf die es ankommt

1. **Differenziert wird über Umfang, und Umfang ist kopierbar.** Der Mechanismus erklärt nicht,
   warum die Messung belastbar ist.
2. **Es gibt keinen Grund, heute zu kaufen.** Die Risk Reversal ist gut, die Urgency fehlt komplett.
   Die reale Batch-Knappheit der Kits wäre der belastbare Bauweg, dafür fehlt die Zahl.
3. **Ein sichtbarer Teil der Seite steht auf unverifizierten Annahmen.** Alle „in der App siehst
   du"-Aussagen stammen aus dem Anbieter-Backend, nicht aus der Kundensicht.

## Der gemessene Gegenpol

Nachtrag vom 14.08. aus [`03-cro-befunde.md`](03-cro-befunde.md): 73 % des Traffics ist mobil und
konvertiert bei 40 % der Desktop-Rate (2,84 % gegen 7,09 % Add-to-Cart). Die Seite ist mobil
20,8 Bildschirmhöhen lang und bekommt 16,9 Sekunden pro Aufruf. Der Weg hinter dem Warenkorb ist
gesund (45 % ATC → Bestellung), das Leck sitzt vollständig auf der Seite.

Konsequenz für die Reihenfolge der Arbeit: erst Mobil-Lesbarkeit und Seitenlänge, dann die
Copy-Substanz aus `02`. Sonst wird geschärfte Copy in Flächen eingebaut, die niemand sieht.

**Ein offener Widerspruch:** `01` §4 und `02` § Nicht angefasst frieren die Section-Reihenfolge ein.
Die Messung spricht dagegen, weil 1.209 px „Bekannt aus" und „So einfach geht's" zwischen Buy-Box
und der ersten Nutzenaussage liegen. Entscheid bei BJ, Details in `03` §5.

## Offen bei BJ

- reale Batch-Größe und Kadenz der Kits (blockiert die Urgency-Arbeit)
- App-Zugang oder Screenshot-Satz (entsperrt Feature-Grid, Report-Preview, FAQ)
- Belege hinter „Bekannt aus" oder Entscheid, die Section zu ziehen
- Ads-Landing: Quiz oder PDP
- Section-Reihenfolge: bleibt eingefroren oder wird umgestellt (`03` §5)
- ~~Einzelpreis eines 45-Minuten-Ergebnisgesprächs~~ **beantwortet 16.08.: 149 €** (`07` §2). Neu offen stattdessen: SKU-Anlage, Segment-Rabatt 249 €, Premium 499 € ab 31.08. (`07` §5)
- Freigabe des Nutzenblock-Vorschlags plus drei Detailfragen darin (`05` §10)

## Sofort und unabhängig von jeder Freigabe

Fünf Punkte stehen live und hängen an keiner Copy-Entscheidung. Vollständig mit Belegstelle in
[`06-kausalkette.md`](06-kausalkette.md) §2.

1. **„Hallo, ich bin MAISIE." ist im App-Bild der Report-Preview lesbar.** MAISIE ist in `01` §2
   ausdrücklich gesperrt. Bildtausch nötig, nicht per `fileUpdate`.
2. **Der Hero widerspricht der eigenen FAQ.** Bullet 1 sagt „Nicht geschätzt", FAQ 2 sagt
   „Schätzwert". Die FAQ hat recht.
3. **Zwei Präzisionsaussagen in `crs-expert-quotes`:** „eine der präzisesten Methoden" und „einer
   der genauesten Indikatoren".
4. **Der Arzt-Badge steht seit dem 14.08. unter der Premium-Option.** Das Ergebnisgespräch ist
   nicht ärztlich, „Fachlich geprüft von" liest sich zusätzlich als Report-Prüfung durch Limmroth.
5. **„Führendes Genomik-Labor in Europa"** in `crs-metrics-row` ist eine Superlative ohne Beleg.

## Status

**Gebaut und live seit 2026-08-16.**

Sechs Bau-Commits, Push durch BJ am 16.08.:

| Commit | Inhalt |
|---|---|
| `e6eac0d` | C11: Sterne und Daten aus den Review-Blöcken, `default: 5` entfernt |
| `5b01ea9` | Hero-Rewrite (`06` §3), inklusive FAQ-Widerspruch und `founder_endorsed` |
| `ac6bdb1` | `crs-metrics-row` erzählt Kausalität statt Logistik (`06` §4) |
| `5d1110c` | `lt-pdp-report-preview` zeigt Deutungsebene statt Kanal (`06` §5) |
| `28d499c` | `crs-expert-quotes` wird Nutzenblock (`05`) |
| `4cdee57` | vier scharfe Hero-Settings entschärft (`06` §2.6) |
| `b00a66e` | Nachtrag: „zu Hause"-Dopplung in `crs-metrics-row` Schritt 1 geheilt |

Davor bereits live: M1 bis M3 aus `03` §4 (Vergleichstabelle mobil, drei CTA-Bänder, Loox auf 6),
gebaut am 14.08.

**Was noch aussteht:** die Neumessung bei 375 x 812 nach `03` §6. Bis dahin sind alle Zahlen in
`03` §1 und `06` §6 Vorher-Werte beziehungsweise Erwartungen, keine Ergebnisse. Danach
`/rmbc-copy-audit` gegen die Baseline 65 / 100.
