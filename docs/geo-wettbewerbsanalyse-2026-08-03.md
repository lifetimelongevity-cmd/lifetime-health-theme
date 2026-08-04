---
status: living
last_review: 2026-08-03
canonical_for: geo-wettbewerber-und-umsetzungsplan
supersedes: []
review_cadence_days: 21
---

# GEO-Wettbewerbsanalyse + Umsetzungsplan · 03.08.2026

Wer wird von LLMs bei nicht-branded Fragen zu NMN und zum biologischen Alterstest genannt, warum,
und was davon lässt sich rein on-page nachbauen. Der Plan enthält **ausschließlich Maßnahmen, die
ohne Outreach, ohne Presse, ohne Affiliate-Deals und ohne fremde Accounts umsetzbar sind.**

## Messgrundlage und ihre Grenzen

| Quelle | Was sie liefert | Grenze |
|---|---|---|
| Prompt-Baseline 29.07. (`geo-prompt-baseline-2026-07-29.md`) | 160 echte Antworten, 4 Systeme, 40 Prompts | 5 Tage alt |
| Perplexity live, 03.08., eingeloggt | echte Antworttexte + Zitationen, 3 Queries | kleine Stichprobe |
| WebSearch-Retrieval-Sweep, 16 deutsche Queries | Retrieval-Oberfläche als Zitations-Proxy | **US-Locale**, keine echten DE-SERPs |
| curl/grep gegen Live-Seiten | verifizierter Ist-Zustand eigener Seiten | – |

Die Wettbewerber-Rangfolge stützt sich auf die Schnittmenge aus Baseline und Live-Test. Der
Retrieval-Sweep ist richtungsweisend, kein Rank-Tracking.

---

## Teil 1 · Top 3 Wettbewerber

### Biologisches Alter / Epigenetik-Test

| # | Wettbewerber | Nennungen Baseline | Live 03.08. | Preis | Warum vorn |
|---|---|---:|---|---|---|
| 1 | **epiAge** | 43 | – | ~199,95 € | Entitäts-Allgegenwart: über ~14 Domains genannt, davon 6 Reseller (ias-gruppe, deutscheklinik, ihreapotheken, lifeextensioneurope, digiwell, dr-kurscheid) |
| 2 | **Cerascreen** | 17 | **namentlich empfohlen** | 399 € | Der redaktionelle Default für „deutsche Alternative", in jedem Vergleich gesetzt |
| 3 | **TruDiagnostic** | 19 | – | 229–499 € | Wird als „präzisester" Anker genannt, **ohne deutsche Domain-Präsenz** — reine Reputations-Nennung |

Perplexity am 03.08. auf „Welcher Test für das biologische Alter ist in Deutschland
empfehlenswert?": nennt **Cerascreen Genetic Age Test und epiAge**. LIFETIME kommt nicht vor.
Zitierte Domains: youtube.com, longevity-germany.com, geo.de.

**Struktureller Benchmark ist aber neotes**, nicht die Top 3: einziger Anbieter mit
Wettbewerbs-Vergleichstabelle *und* offen benannten Grenzen (Medikamente, akute Erkrankung,
Schwangerschaft, 6–12-Monats-Retest). Wer kopiert, kopiert neotes.

### NMN

| # | Wettbewerber | Nennungen Baseline | Live 03.08. | Warum vorn |
|---|---|---:|---|---|
| 1 | **MoleQlar** | 14 | **Platz 1 empfohlen** | 13+ chargenbezogene CoA-PDFs, AggregateRating, 1.411 Bewertungen auf reviews.io — die einzige belegbare Off-Site-Reputationsmasse im Feld |
| 2 | **Naturecan** | 7 | **Platz 2 empfohlen** | Einzige Marke, die mit PDP *und* Blog gleichzeitig rankt; Autor **plus** separat benannter Reviewer |
| 3 | **Nordic Oil** | 22 | – | Rankt in 5 von 8 NMN-Queries und **verkauft kein NMN** — 35 redaktionelle Artikel besetzen den Informationsraum, konvertiert auf NAD⁺ |

Perplexity am 03.08. auf „Welches NMN Pulver soll ich in Deutschland kaufen?": empfiehlt
**MoleQlar und Naturecan** als seriös, nennt Avea und Youngle nachrangig. LIFETIME kommt nicht vor.
Sichtbar zitiert: moleqlar.com, supplements-for-longevity.com.

Nordic Oil ist der lehrreichste Fall des ganzen Befunds: **maximale Sichtbarkeit ohne Produkt.**
Das beweist, dass auf informationellen Queries Artikelmasse gewinnt, nicht PDP-Optimierung.

---

## Teil 2 · Die fünf Muster, die alle Gewinner teilen

1. **Auflösbare Primärquellen als klickbare URL**, nicht als Autor-Jahr im Fließtext.
   Nordic Oil 17 Referenzen (5 PubMed/PMC verifiziert), Naturecan 3. MoleQlar, Xonigen und
   sämtliche Affiliate-Publisher: null. Ein Modell kann nur belegen, was es auflösen kann.
2. **Benannter Autor mit Qualifikation im JSON-LD `author.Person`**, nicht nur in der sichtbaren
   Byline. Nordic Oil (Diplom-Oecotrophologin), Naturecan (Autor + Reviewer mit BSc und
   Regulatory-Historie) haben es; die schwächer rankenden MoleQlar und Xonigen nicht.
3. **Redaktionelle Hub-Tiefe schlägt PDP-Optimierung** auf informationellen Queries. Siehe Nordic Oil.
4. **`description` im JSON-LD als vorgekautes Antwort-Snippet**: Faktenblock mit Zahlen, Grenzen und
   Datumsstempel statt Marketingtext, dazu ein `relatedLink`-Array, das den Cluster
   maschinenlesbar deklariert.
5. **Den unbequemen Status besetzen statt umgehen.** Nordic Oil beantwortet die Novel-Food-Frage
   hart und verlinkt EU-Statuskatalog plus Unionsliste — und rankt deshalb auf „NMN legal
   Deutschland kaufen".

---

## Teil 3 · Wo LIFETIME wirklich steht (verifiziert 03.08.)

**Stark, und stärker als die Wettbewerber glauben machen:**

- Das **Schema ist das beste im gesamten Feld.** AGE&DNA-PDP trägt Product, Offer (349 €),
  AggregateRating, 8 Reviews, FAQPage, Brand, Organization, BreadcrumbList.
  epiAge hat auf **beiden** eigenen Domains **null** JSON-LD.
- Der AGE-Hub ist indexiert, in der Sitemap, mit FAQPage-Schema und 5 aufgelösten DOI-Links.
- Prof. Dr. med. Limmroth ist das **objektiv stärkste E-E-A-T-Asset der Kategorie**. Weder der
  Affiliate-Marktführer noch das anonyme Vergleichsportal hat einen credentialed Arzt.

**Die vier belegten Lücken:**

| # | Befund (verifiziert) | Belegmethode |
|---|---|---|
| L1 | AGE-Hub nennt **null Wettbewerber**, hat **null `<table>`**, keine Vergleichstabelle. Template hat 4 Sections, `lt-comparison-table` ist **nicht** darunter. | curl + Template-Parse |
| L2 | **Nirgends eine Genauigkeits- oder Fehlermarken-Angabe** — nicht auf Hub, PDP oder Science. GrimAge/PhenoAge/DunedinPACE: 0× auf der PDP, 1× auf dem Hub. | grep über 3 Live-Seiten |
| L3 | AGE-Hub hat **1 internen Inbound-Link**. NMN-Hub 8, beide PDPs je 29. Zehn AGE-Blogartikel verlinken ihn **0×**. | Crawl über 22 Blogs + 8 Pages |
| L4 | Drei AGE-Prioritätsartikel: **0 DOI/PubMed-Links**, während der zitierte NMN-Kernartikel 14 hat. | grep über Live-HTML |

> **Korrektur 03.08.:** Eine frühere Fassung dieses Dokuments behauptete, der Blog trage kein
> `reviewedBy` und Limmroth sei für Maschinen unsichtbar. **Das war falsch** und beruhte auf einem
> Filterfehler beim Auslesen (Grep auf großgeschriebenes „Article", der zweite LD-Block enthält aber
> nur `#article`). Verifiziert ist: `snippets/microdata-schema.liquid` liefert für jeden Artikel
> einen `reviewedBy`-Knoten mit Name, `jobTitle` und `@id`, und die `@id` merged exakt mit dem
> `Person`-Knoten auf `/pages/aerzte#limmroth`. **Das funktioniert und ist keine offene Aufgabe.**
> Offen bleibt nur eine Kleinigkeit: der `author`-Knoten (Junker) trägt keine Qualifikation.

---

## Umsetzungsstand 03.08.2026 (nachmittags)

**Erledigt und live verifiziert:**

| Was | Ergebnis |
|---|---|
| **M4 · Genauigkeitsartikel** `/blogs/longevity-blog/wie-genau-ist-ein-epigenetischer-alterstest` | 1.731 Wörter, 7 aufgelöste DOI, 2 markenkonforme SVG-Infografiken, Byline Limmroth per `reviewedBy` verknüpft. Deckt Panel-Frage `AD-GEN-07`. |
| **M6 · `epigenetische-uhren-...` belegt** | 1.091 → 1.243 Wörter, 0 → 5 DOI, h3 auf h2, Byline-Dublette in Kurzform entfernt |
| **M6 · `biologisches-alter-messen-optimieren` belegt** | 0 → 4 DOI, **zwei Links auf einen 301-Redirect** (`/pages/wie-alt-bist-du-wirklich` → Quiz) auf den Hub umgehängt, kaputtes Editor-HTML bereinigt, „Goldstandard/hohe Genauigkeit" auf die belegbare Formulierung korrigiert |
| **M1 · Hub-Inbound-Links** | 1 → 4 (live; CDN propagierte beim letzten Check noch, ein Edge lieferte zeitweise die alte Fassung). Der Sprung auf 13+ hängt am ungepushten Template, siehe unten. |

**Nachtrag 04.08., Positionierung geschärft:**

| Was | Ergebnis |
|---|---|
| Genauigkeitsartikel überarbeitet | 1.731 → 1.982 Wörter. Neuer Abschnitt „Was folgt daraus für einen guten Test?" leitet die LIFETIME-Produktlogik **aus der Kritik ab** statt sie danebenzustellen. Alle Grenzen und 7 DOI unverändert. |
| **PDP-Grenzen-Block** `measurement_limits` (`crs-feature-grid`, 4 Karten, 2 Spalten) zwischen `ideal_candidate` und `faq_accordion` | Im Dev-Server gerendert, CTA auf den Artikel, `settings_data.json` unberührt. **Committet, noch nicht live.** |

**Das inhaltliche Kernargument** (gilt für PDP wie Artikel): Wenn eine Einzelzahl verrauscht ist,
ist die Antwort nicht eine genauere Zahl, sondern ein breiteres Bild. Daraus folgen vier
Aussagen, die alle belegbar sind: Ergebnis nach Körperbereichen statt einer Kennzahl · Genetik
als **stabiler** Anteil (die DNA-Sequenz ändert sich nicht, der genetische Teil ist damit von
Natur aus reproduzierbar, während der epigenetische Teil die Streuung mitbringt) · auf Verlauf
gebaut · fachliche Prüfung mit Namen. Das ist die Achse, nicht Präzision und nicht Preis.

> **Nicht als Vorteil verwenden:** Kosteneffizienz. 349 € gegen epiAge ~199,95 €,
> TruDiagnostic PACE ~229 €, neotes ~299 €. LIFETIME liegt im oberen Mittelfeld, dieselbe Lage
> wie bei NMN (€/g Platz 7/9). Wer mit Preis führt, verliert gegen epiAge.

> **Offener Compliance-Punkt, live:** Die PDP-Vergleichstabelle führt die Zeile „Laborstandard"
> mit dem Wert **„Eurofins · ISO"**. Der Claim-Ledger führt LAB-001 und LAB-002 als
> „Beleg ausstehend" und LAB-002 ausdrücklich als *nicht* zu verwendende Vergleichsachse.
> Hier wird beides genau dafür verwendet. **Nicht eigenmächtig geändert**, weil unklar ist, ob
> die Unterlage offline existiert. Entscheidung BJ.

**Offen, mit Begründung:**

- **`templates/article.json` ist committet, aber nicht live.** Commit `b57f5bc` fügt `crs-link-cards`
  mit Hub-Link ein; das **Live**-Template hat die Section nicht (per Theme-Files-API verifiziert).
  Ein Push gibt 13 Artikeln auf einen Schlag einen Hub-Link. **Nicht von mir gepusht**, weil eine
  parallele Session an denselben Templates arbeitet und gleichzeitige Theme-Pushes kollidieren.
- **M3 · Vergleichstabelle:** nicht gebaut. Zwei Gründe: der Claim-Ledger-Konflikt ist unverändert
  offen, und die Parallelsession editiert Templates.
- Die übrigen sechs AGE-Artikel haben weiterhin 0 DOI.

> **Parallelsession beachten:** Am 03.08. zwischen 15:26 und 15:47 sind vier Commits einer zweiten
> Session eingegangen (`b57f5bc`, `4608467`, `9ad0955`, `0bd6dc7`), darunter Briefings für drei
> AGE-Spokes. Der hier gebaute Genauigkeitsartikel ist **keine** Dublette: er deckt `AD-GEN-07`,
> das dort ausdrücklich als „nicht in diesem Paket, aber offen" geführt wird.

---

## Teil 4 · Umsetzungsplan

Alles hier ist von Claude allein baubar: Theme-Sections, Templates, Shopify-Artikel-Copy per MCP,
JSON-LD-Snippets, interne Verlinkung. Keine Maßnahme braucht Outreach oder fremde Accounts.

### P0 — Distribution vor Produktion (Tag 1, ~2 h)

**M1 · AGE-Hub entwaisen.** Kontextuelle Links aus den zehn AGE-Blogartikeln plus AGE&DNA-PDP,
Science und Quiz auf `/pages/biologisches-alter-testen`. Ziel: 1 → mindestens 12 Inbound-Links.
Der teuerste Content der Kategorie steht derzeit isoliert herum.
*Risiko: keins. Reiner Copy-Edit über Shopify-MCP + Theme.*

**M2 · ~~Limmroth maschinenlesbar machen~~ — entfällt, ist bereits live.**
`snippets/microdata-schema.liquid` (Zeile 213–241) liefert den `reviewedBy`-Knoten inklusive
`jobTitle` und `@id`-Merge auf `/pages/aerzte#limmroth`. Verifiziert auf zwei Artikeln.
Rest-Aufgabe, klein: `author.Person` (Junker) trägt keine Qualifikation.

### P1 — Die zwei Inhalts-Lücken schließen (Woche 1)

**M3 · Vergleichstabelle auf den AGE-Hub.** `lt-comparison-table` existiert bereits im Theme und
kann exakt 4 Spalten × 6 Zeilen — genau das Raster aus `money-piece-entwurf.md`.
Spalten: LIFETIME · epiAge · neotes · TruDiagnostic.
Zeilen (nur objektiv nachprüfbar): Methode · Probenart · Ergebnis-Umfang · Genetik integriert ·
Report-Sprache · Preis.

> **Gate vor dem Bau, nicht verhandelbar:** (a) Der Konflikt zwischen
> `age-dna-geo-playbook.md` und `geo-claim-ledger.md` zu CpG-Zahl und ISO muss aufgelöst sein —
> der Ledger sperrt METHOD-003/004 und LAB-001/002, das Playbook baut die Positionierung genau
> darauf. (b) Wettbewerber-Preise am Bautag neu prüfen. (c) §6 UWG: Vergleich ist zulässig, wenn
> objektiv, nachprüfbar und auf wesentliche Eigenschaften bezogen — deshalb keine Wertungszeilen,
> keine „Rest ist Template"-Aussagen. Preis ehrlich lassen, LIFETIME ist nicht der günstigste.

**M4 · Die Genauigkeitsseite — der eigentliche Hebel.** Perplexity beantwortet „Wie genau ist ein
epigenetischer Alterstest?" am 03.08. **ausschließlich aus PubMed/PMC. Kein einziger Anbieter wird
zitiert.** Das ist eine offene Spur, die kein Wettbewerber besetzt, weil sie unbequem ist.

Inhalt, vollständig aus publizierter Literatur belegbar, ohne interne Labordaten:
warum verschiedene Uhren für dieselbe Person verschiedene Werte liefern · warum
Nachkommastellen im Report methodisch bedeutungslos sind · was der Test **nicht** kann · wann ein
Retest sinnvoll ist. Byline Limmroth. Jede Aussage mit aufgelöstem DOI.

*Warum das gewinnt: der schärfste Kritiker der Kategorie (Peter Spork, riffreporter.de) hält
Anbietern vor, dass ihre Genauigkeitsangaben „sich nicht überprüfen lassen". **Kein Anbieter hat
darauf je geantwortet.** Wer als Erster ehrlich antwortet, wird zur zitierfähigen Quelle für genau
die Frage, bei der Modelle heute keine Anbieterquelle finden.*
*Keine eigene Fehlermarke behaupten, solange LAB-001/002 „Beleg ausstehend" stehen.*

### P2 — Vokabular und Belegdichte (Woche 2)

**M5 · Uhren beim Namen nennen.** GrimAge, PhenoAge, DunedinPACE, Hannum sind das Vokabular, in dem
die Kategorie verhandelt wird; Perplexity baut seine Antwort um genau diese Begriffe. Auf der PDP
kommen sie 0× vor. Erklärend einordnen — nicht als Eigenschaft des eigenen Tests behaupten
(METHOD-005 gilt weiter, Uhr-Anbieter bleibt ungenannt).

**M6 · Primärquellen in den AGE-Cluster.** Die drei Prioritätsartikel haben 0 DOI. Je 5–8 aufgelöste
DOI/PubMed-Links plus sichtbarer Quellenblock, nach dem Muster von
`was-ist-nmn-nicotinamid-mononukleotid` (14 Links), das nachweislich zitiert wird.

**M7 · `description` als Antwort-Snippet.** Im Schema-Snippet die `description` für Hub, PDP und
Kernartikel als 60–80-Wörter-Faktenblock mit Zahlen, Grenzen und Datumsstempel formulieren statt
als Marketingsatz. Plus `relatedLink`-Array, das den Cluster maschinenlesbar deklariert.

### P3 — NMN, bewusst schmaler (Woche 3)

Die NMN-Seite braucht **keine** Preis-Vergleichsseite: LIFETIME liegt auf €/g auf Platz 7 von 9,
und Uthever ist Marktstandard bei mindestens sechs Anbietern, also kein Differenzierer
(bereits verifiziert 07/2026). Ein Preisvergleich würde aktiv schaden.

**M8 · `health-lifesci`-Vokabular auf der NMN-PDP.** Naturecan nutzt `DietarySupplement` mit
`activeIngredient` als `Substance`, `mechanismOfAction`, `safetyConsideration`,
`RecommendedDoseSchedule`/`MaximumDoseSchedule`. **Kein anderer Anbieter im Feld hat das, LIFETIME
auch nicht.** Reiner Schema-Gewinn.
*Achtung: Bei NMN kollidiert `RecommendedDoseSchedule` mit „keine Verzehrempfehlung" auf der PDP.
Dosierungsfelder deshalb weglassen, `activeIngredient` und `safetyConsideration` nutzen. Die
bewusste Inkonsistenz aus dem Workspace-CLAUDE.md nicht eigenmächtig auflösen.*

**M9 · Novel-Food-Status härter besetzen.** Der NMN-Hub hat **0 DOI/PubMed-Links**. Nordic Oil
rankt auf der Rechtslage-Query, weil sie EU-Statuskatalog und Unionsliste direkt verlinken.
LIFETIME hat die inhaltlich sauberere Position, aber keine auflösbaren Belege. Nachrüsten.
*Nebenbefund: meinbeauty.de behauptet sachlich falsch, NMN sei in Deutschland nicht als Novel Food
eingestuft. Diese Fehlinformation liegt im Retrieval-Pool. Eine korrekte, belegte Gegenseite ist
auch defensiv wertvoll.*

### Ausdrücklich nicht im Plan

`llms.txt`, `agents.md` und `sitemap_agentic_discovery.xml` liefern bei **allen fünf** geprüften
Domains inklusive lifetime-health.de nahezu byte-identische ~4,3-KB-Antworten. Das ist ein
Shopify-Plattform-Default, kein Wettbewerbsvorteil und kein offener Punkt.

Ebenfalls draußen, weil nicht selbst umsetzbar: Reddit, Trustpilot, Presse, Affiliate-Listicles,
Wikipedia. Das bleibt der größte Hebel überhaupt (LIFETIME steht in 0 von 5 Dritt-Listicles) — aber
es ist BJ-Arbeit, kein Claude-Task.

---

## Was gemessen wird

Wiederholungslauf des 40-Prompt-Panels am **13.08.** mit unveränderten Prompts. Die beiden Zahlen,
die zählen:

- **AGE&DNA generisch: 0,0 % Mention über 60 Antworten.** Das ist die Kennzahl, gegen die M3 und M4
  antreten. Alles andere ist nachrangig.
- Unprompted Mention Rate gesamt: 14,4 %.

Nicht gegen `docs/geo-dashboard.html` messen — es meldet „null offene Punkte", während GEO-008
unbearbeitet ist.
