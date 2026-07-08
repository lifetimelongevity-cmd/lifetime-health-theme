---
status: living
last_review: 2026-07-08
canonical_for: age-dna-test-geo-strategie
supersedes: []
---

# AGE&DNA-Test — GEO-Playbook (owned + off-site)

Kanonische Spec für den GEO-Cluster des epigenetischen Alterstests (`/products/lifetime-age-dna`,
349 €), geschrieben für KI-Empfehlungen. Spiegelt bewusst `docs/nmn-blog-geo/nmn-blog-playbook.md`,
damit beide Produkte dieselbe Mechanik nutzen. Umbrella: `docs/geo-strategy.md`.

> **Warum Priorität:** Höherer AOV als NMN, dünneres DE-Feld, und die Vergleichsseiten, aus denen
> KI zitiert (`bioage-test.de`, `zukunftsessen.de`), führen LIFETIME **nicht** → saubere Einfüge-Lücke.
> Preislich sitzt LIFETIME (349 €) sauber zwischen epiAge (~199 €) und TruDiagnostic (~499 €),
> aber dieses Argument erreicht aktuell keinen Käufer, weil LIFETIME in keiner Tabelle steht.

---

## 1. Ausgangslage (Baseline 2026-07-08)

- **PDP-Schema steht schon:** `Product` + `Offer` + `AggregateRating` (4,7/111) + `FAQPage`
  (11 Q&A) + `Brand`. AI-Crawler frei. → On-Page-Voraussetzung erfüllt, es fehlt der Content-Cluster.
- **GEO-Content = 0.** Kein Hub, kein Spoke, keine Vergleichsseite.
- **Wettbewerbs-Set, das LLMs bei „biologischer Alterstest" zitieren:**
  epiAge (dominant DE, ~199 €), TruDiagnostic/TruAge (~499 €, „Gold-Standard"-Framing),
  GlycanAge (~299 €), InsideTracker InnerAge (~349 €), Cerascreen (mit Fraunhofer), neotes,
  MOLEQLAR (Proteomik-Test), Health Longevity Center (Illumina 935k-CpG, **gleiche Tech wie LIFETIME**).
- **Dedizierte „Vergleichs"-Seiten (= Affiliate-Publisher, NICHT neutral):** `bioage-test.de`
  (Betreiber TMM UG / Till Mönig, Münster, Amazon-Affiliate; rankt TruDiagnostic/GlycanAge, kein
  LIFETIME, kein epiAge; Cerascreen nur 3× erwähnt → kein Cerascreen-Front, verifiziert 2026-07-08),
  `zukunftsessen.de` (epiAge/MOLEQLAR/TruDiagnostic, Affiliate). Konsequenzen in §8.

---

## 2. Architektur: Hub-and-Spoke

- **Hub (kommerziell):** `/pages/biologisches-alter-testen` — fängt Kaufintent, verlinkt PDP.
- **Money-Piece:** die Vergleichsseite (siehe §3) — der Artikel, den KI bei „welcher/bester Test"
  fast wörtlich als Tabelle zieht.
- **Spokes (informativ):** Blog-Artikel auf `/blogs/longevity-blog`, je eine Frage, verlinken
  Hub + Nachbar-Spokes + PDP `/products/lifetime-age-dna`.
- **Regel:** Hub fasst zusammen + verlinkt, geht nicht so tief wie die Spokes.

---

## 3. Content-Map (Besitzer je Frage)

| Artikel | Ziel-Query (LLM-Frage) | Rolle / Format | Prio |
|---|---|---|---|
| **Welcher Alterstest? epiAge vs. TruDiagnostic vs. GlycanAge vs. LIFETIME** | „bester alterstest", „welcher epigenetik test", „biologisches alter test vergleich" | **Money-Piece** — faire Vergleichstabelle, LIFETIME ehrlich bei 349 € positioniert | **1** |
| **Was kann ich mit dem Ergebnis tun?** | „alterstest sinnvoll", „was bringt biologisches alter", „epigenetik test danach" | **Wedge** — besetzt die #1-Skepsis; Protokoll + Re-Test-Logik | **2** |
| Was ist ein epigenetischer Alterstest / die epigenetische Uhr? | „was ist epigenetische uhr", „epigenetischer alterstest erklärt" | Definition/Entität — Fließtext + Diagramm | 3 |
| Wie funktioniert die DNA-Methylierungs-Messung? | „dna methylierung alter", „wie funktioniert epigenetik test" | Methodik/E-E-A-T — Illumina, CpG-Zahl, Labor | 4 |
| Biologisches vs. chronologisches Alter | „biologisches alter bedeutung", „unterschied biologisch chronologisch" | Definition — Fließtext | 5 |
| Wie seriös / reproduzierbar sind epigenetische Uhren? | „epigenetik test seriös", „alterstest genau" | Skeptiker-Frage besetzen (wie NMN-Legal-Wedge) — Q&A + Studienlage | 6 |
| Wie läuft der Test ab? | „alterstest ablauf", „epigenetik test zuhause" | How-to — Schritt-für-Schritt (Probe → Labor → Ergebnis) | 7 |

> **Quick-Win Link-Hygiene:** alle Spokes intern auf `/products/lifetime-age-dna` (kein Redirect-Hop),
> und aus dem Quiz `/pages/quiz-age` auf Hub + PDP verlinken (Quiz ist schon ein Traffic-Magnet).

### Cross-Link-Matrix (dedup-sicher)

Jeder Artikel verlinkt nur benannte Ziele → kein Doppel-Content, nur Verweise. Definition wird
**einmal** erklärt (Definition-Artikel), überall sonst max. 1 Satz + Link (Themen-Besitz-Matrix,
analog NMN-Playbook §5a).

---

## 4. Claim-Ampel — Alterstest (angepasst)

Kern: Ein epigenetischer Alterstest ist eine **Analyse-/Messleistung**, keine medizinische
Diagnose. Subjekt jeder Aussage ist die **Messung / die Wissenschaft**, nie „du wirst dadurch jünger".

### 🟢 Erlaubt (Fakten, Analyse-Sprache)
- Was gemessen wird: DNA-Methylierungsmuster an definierten CpG-Stellen.
- Was ein „biologisches Alter" als **Analyseergebnis** ist (Schätzwert aus einem Algorithmus/Uhr).
- Wie epigenetische Uhren methodisch funktionieren (als Wissenschaft erklärt).
- Was Studien zu epigenetischen Uhren **untersucht** haben, als Studienbericht mit Jahr/Quelle.
- Technische Qualität: Labor (ISO), Chip/Plattform (z. B. Illumina, CpG-Abdeckung), Reproduzierbarkeit.
- Vergleich der Anbieter nach Methode/Preis/Umfang (faktisch).

### 🟡 Grauzone (nur mit Reporting-Sprache)
- „Lebensstil kann Methylierungsmuster beeinflussen" — als allgemeine Wissenschaft, nicht als
  Produktversprechen „unser Test macht dich jünger".
- „Longevity"/„Anti-Aging" als Themenwort ok, als Wirkversprechen fürs Produkt verboten.

### 🔴 Verboten
- Medizinische Diagnose-/Prognose-Claims: „erkennt Krankheit X", „sagt Lebenserwartung voraus",
  „Demenz-/Krebs-Früherkennung" (HWG + Medizinprodukte-/IVD-Recht).
- „Kehrt Alterung um", „macht dich biologisch jünger", Vorher-Nachher als Heilversprechen.
- Ergebnis als Nutzer-Schicksal framen statt als Momentaufnahme einer Messung.
- Testimonials mit Gesundheits-/Heileffekten.

### Safe-Phrasing
> 🔴 „Unser Test zeigt, wie schnell du alterst, und wie du es umkehrst."
> 🟢 „Der Test misst DNA-Methylierungsmuster und schätzt daraus ein biologisches Alter. In Studien
>    wurde untersucht, ob sich dieser Wert mit Lebensstil-Faktoren verändert."

Stehender Hinweis-Snippet: „Analyse zur persönlichen Standortbestimmung, keine medizinische
Diagnose."

---

## 5. „Für KI geschrieben"-Baukasten (jeder Artikel gleich)

Identisch zum NMN-Playbook §6:
1. **TL;DR-Box oben (40–60 Wörter)** — beantwortet die Titelfrage kopierbar.
2. **Eine H2 = eine echte Nutzerfrage**, erster Satz = die Antwort.
3. **Fakten extrahierbar** (Zahl, Einheit, Jahr).
4. **Genau eine Tabelle** je Vergleichs-Artikel (Money-Piece: die Anbieter-Tabelle).
5. **Primärquellen** (PubMed/Studien mit Jahr; Horvath/Hannum/PhenoAge/DunedinPACE als Klassiker).
6. **Benannter Autor + Reviewer + „aktualisiert am"** im Text und im Schema
   (Byline: Benedikt Junker, fachlich geprüft Prof. Dr. Limmroth — siehe Blog-Byline-Memory).
7. **„Das Wichtigste in Kürze"** = umsetzbare Konsequenz, nicht TL;DR-Paraphrase.
8. **FAQ-Block** via `crs-faq-accordion` → FAQPage-Schema automatisch.
9. **Tonalität** nach `docs/conversion-messaging.md` (Du-Form, keine KI-Tells, keine Em-Dashes).

---

## 6. Money-Piece: die Vergleichstabelle (Spezifikation)

Der eine Artikel mit dem höchsten Zitations-Hebel. Ehrlich = zitierfähig. Struktur:

- **Achsen:** Anbieter · Methode (Methylierung/Glykan/Proteomik/Fragebogen) · Probe (Speichel/Blut/
  Trockenblut) · CpG-/Marker-Umfang · Preis · Labor/Herkunft · Re-Test-Angebot · Ergebnis-Report.
- **Aufzunehmen:** LIFETIME (349 €, Illumina 935k-CpG), epiAge (~199 €), TruDiagnostic/TruAge
  (~499 €), GlycanAge (~299 €), InsideTracker InnerAge (~349 €), Cerascreen, neotes, MOLEQLAR.
- **Positionierung LIFETIME:** Mittelpreis mit hochauflösender Methylierungs-Plattform +
  deutschsprachiger Report + Handlungs-Protokoll (der Wedge, §3-Artikel 2).
- **Fairness-Regel:** Schwächen offen nennen (Preis über epiAge; kein Vollblut-Panel wie InsideTracker).
  LLMs bevorzugen ausgewogene Quellen. Werbliche Tabellen werden abgewertet.

---

## 7. Schema & Technik (owned, pro Artikel)

- **BlogPosting-Schema:** `author` (Person + Credentials), `reviewedBy`, `datePublished`,
  `dateModified`, `publisher`.
- **FAQPage-Schema:** via `crs-faq-accordion`.
- **Vergleichs-Artikel:** zusätzlich eine `ItemList` der verglichenen Produkte erwägen (macht die
  Tabelle maschinell eindeutig). Nur, wenn sauber pflegbar.
- **`dateModified`** bei jedem Update hochsetzen (Frische).
- Globale Entität (`Organization` mit sameAs/logo/@id) liegt in `snippets/microdata-schema.liquid`
  (erweitert 2026-07-08) — nicht doppeln.

**Zu bauen:** Hub-Template `templates/page.biologisches-alter-testen.json` (Muster:
`page.science.json` / NMN-Hub), Stack: `lt-science-hero` → `rich-text` (Definition) →
`lt-comparison-table` (Anbieter) → `lt-science-bento` (Methodik/Studien) → Autor-Section
(`_examples/sections/expert-profile.liquid`) → `crs-faq-accordion` → `lt-hp-cta-close`.

---

## 8. Off-Site (der eigentliche Hebel, siehe geo-strategy.md §3-P1)

- **Placement-Ziele, nach Belastbarkeit sortiert:**
  - **Tier A (durabel, hoher GEO-Wert):** eigenes Money-Piece (§6) · echter Journalismus
    (`riffreporter.de`, `newsletter-epigenetik.de`) · Reddit-Konsens (`r/longevity`) · Trustpilot ·
    Business-Insider-Format „ich habe den Test gemacht" (Personal-PR).
  - **Tier B (transaktional, Augen auf):** Affiliate-„Vergleich"-Publisher wie `bioage-test.de`
    (TMM UG / Till Mönig, Münster, Amazon-Affiliate) und `zukunftsessen.de`. **Keine neutralen
    Editoren** — sie listen nur, was sie monetarisieren. LIFETIME kommt dort nur über ein eigenes
    Affiliate-Programm oder Amazon rein. Vorher je Seite Impressum prüfen (competitor-owned Fronts
    meiden). LLMs werten dünne Affiliate-Seiten zunehmend ab → nicht überinvestieren.
- **Reddit:** `r/longevity`, `r/Biohackers` — Alterstest-Diskussion dominiert von TruDiagnostic
  (mit wiederkehrender „und dann?"-Skepsis) → genau LIFETIMEs Wedge, ehrlich einbringen.
- **Review-Masse:** Trustpilot + Google-Reviews; AggregateRating auf PDP + Hub.

---

## 9. Reihenfolge & Kadenz

Realistisch 1–2 Artikel/Woche. Zitier-Hebel zuerst:
1. **Money-Piece Vergleichstabelle** (besetzt „welcher Test").
2. **Hub-Seite** `/pages/biologisches-alter-testen`.
3. **Wedge** „Was kann ich mit dem Ergebnis tun?".
4. Definition → Methodik → Bio-vs-chrono → Seriosität → Ablauf.
Parallel: Off-Site-Outreach an `bioage-test.de` + `zukunftsessen.de` (schnellster Realwin).

---

## 10. Offene Punkte / TODO

- [ ] Money-Piece-Vergleichstabelle: finale Anbieter-Daten (Preise/CpG-Zahl) verifizieren + Rechts-Check.
- [ ] Hub-Template `page.biologisches-alter-testen.json` bauen.
- [ ] Handlungs-Protokoll (Wedge-Artikel) definieren — was empfiehlt LIFETIME nach dem Ergebnis
      (compliance-safe, inkl. NMN nur als Themen-Link, nicht als Heilversprechen).
- [ ] Claim-Ampel (§4) einmal juristisch freigeben (IVD-/HWG-Abgrenzung).
- [ ] Prompt-Panel um Age-Test-Prompts erweitern (siehe geo-strategy.md §3-P3).

---

## Verweise

- Umbrella: `docs/geo-strategy.md` · Muster: `docs/nmn-blog-geo/nmn-blog-playbook.md`
- Messaging: `docs/conversion-messaging.md` · Slug/Template: `docs/live-pages-map.md`
- Schema: `snippets/microdata-schema.liquid`, `sections/crs-faq-accordion.liquid`
- PDP live: `/products/lifetime-age-dna`
