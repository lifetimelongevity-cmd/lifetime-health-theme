---
status: living
last_review: 2026-08-03
canonical_for: geo-90-day-execution-plan
depends_on:
  - docs/geo-strategy.md
  - docs/age-dna-geo/age-dna-geo-playbook.md
  - docs/nmn-blog-geo/nmn-blog-playbook.md
  - docs/live-pages-map.md
  - docs/geo-p0-url-decision-list-2026-07-29.md
---

# GEO Action Plan: 90 Tage

Konkreter Umsetzungsplan für die Sichtbarkeit von LIFETIME Health in ChatGPT, Perplexity,
Google AI Overviews / AI Mode, Gemini, Claude, Copilot und agentischen Commerce-Systemen.

**Start:** 29.07.2026

**Review nach 30 Tagen:** 28.08.2026

**Review nach 60 Tagen:** 27.09.2026

**Abschlussreview:** 27.10.2026

## 1. Einordnung und Ziel

Dieses Dokument ist die **operative Ausführungsschicht**. Es ersetzt keine bestehende Strategie:

- `docs/geo-strategy.md` bleibt die produktübergreifende GEO-Strategie.
- `docs/age-dna-geo/age-dna-geo-playbook.md` bleibt die Content-Spec für AGE&DNA.
- `docs/nmn-blog-geo/nmn-blog-playbook.md` bleibt die Content-Spec für NMN.
- `docs/live-pages-map.md` bleibt die Quelle für Live-Slugs und Templates.
- Bei Drift gewinnt der Live-Shop, danach die oben genannten Source-of-Truth-Dokumente.

### Geschäftsziel

LIFETIME soll bei kaufnahen und evidenzorientierten Fragen nicht nur auffindbar sein, sondern
als **zitierfähige, nachvollziehbare und vertrauenswürdige Quelle** in die Antwort einfließen.

Die Reihenfolge ist bewusst:

1. Widerspruchsfreie Fakten und belastbare Belege
2. Saubere technische und maschinenlesbare Auslieferung
3. Klare Marken-, Experten- und Produktentitäten
4. Zitierfähige Inhalte für konkrete Nutzerfragen
5. Unabhängige Erwähnungen und echter Konsens außerhalb der eigenen Domain
6. Kontinuierliche Messung von Erwähnung, Zitation und Umsatzbeitrag

**Nicht das Ziel:** kurzfristig möglichst viele KI-Texte oder eine aufwendige Custom-`llms.txt`
produzieren. Die aktuelle Google-Dokumentation verlangt keine spezielle KI-Datei. Normale
Search-Grundlagen, hilfreicher Inhalt, Crawlability und strukturierte Daten bleiben entscheidend.

## 2. Audit-Baseline vom 29.07.2026

### Was bereits gut ist

- Zentrale Inhalte werden serverseitig gerendert.
- Relevante öffentliche AI-Crawler waren beim Audit nicht blockiert.
- Product-, Offer-, Review-, FAQ-, Organization- und Breadcrumb-Daten sind grundsätzlich vorhanden.
- Shopify stellt `agents.md`, `llms.txt` und UCP-Endpunkte bereit.
- Der Shopify Storefront Catalog konnte AGE&DNA bei passenden Suchanfragen finden.
- Die Produktseiten enthalten bereits viele starke kommerzielle und fachliche Fakten.
- `sections/lt-article.liquid` unterstützt Quellen, Autor, Reviewer und Aktualisierungsdatum über
  Metafelder. Die technische Basis muss vor allem konsequent befüllt werden.

### Größte Lücken

1. **Evidence Gap:** Wichtige wissenschaftliche, methodische und Qualitätsclaims sind sichtbar,
   aber nicht überall direkt mit Primärquelle, Zertifikat oder Methodennachweis verbunden.
2. **Consistency Gap:** Zahlen und Aussagen sind nicht überall eindeutig harmonisiert, unter
   anderem fünf versus sechs epigenetische Reports, 16 versus 22 Kategorien und unterschiedliche
   Zeitangaben in Ergebnisbeispielen.
3. **Entity Gap:** Eigene und externe Profile verwenden teilweise unterschiedliche Domains,
   Standorte oder Firmierungen. Autoren- und Reviewer-Entitäten sind nicht durchgängig verbunden.
4. **Generic Discovery Gap:** LIFETIME erscheint stärker bei Markenfragen als bei generischen
   Fragen wie „seriöser biologischer Alterstest für zuhause“.
5. **Index Hygiene Gap:** Test-, Leer-, Mailout- und Service-Seiten können unnötig im Index landen.
6. **Citation Gap:** Gute Artikel besitzen noch nicht flächendeckend anklickbare Primärquellen.
7. **Off-site Gap:** Für generische Empfehlungen fehlen genügend unabhängige, hochwertige
   Erwähnungen außerhalb der eigenen Domain.

### Vier-Systeme-Prompt-Baseline

Der vollständige V1-Lauf vom 29.07.2026 umfasst 160 von 160 archivierte Antworten in ChatGPT,
Perplexity, Gemini und Google AI Mode:

| KPI | Baseline |
|---|---:|
| Completion Rate | 100,0 % |
| Mention Rate | 29,4 % · 47/160 |
| Citation Rate | 18,8 % · 30/160 |
| Share of Voice | 23,3 % |
| Unprompted Mention Rate | 14,4 % · 19/132 |

Der stärkste positive Befund ist die robuste Markenentität mit 100 % Mention Rate im Markencluster.
Die größte Lücke ist die generische AGE&DNA-Discovery mit 0 sichtbaren LIFETIME-Nennungen in 60
Antworten. Methodik, System-/Clusterwerte, Wettbewerber und priorisierte Konsequenzen stehen in
`docs/geo-prompt-baseline-2026-07-29.md`.

### Shopify-Catalog-Baseline

Momentaufnahme vom 29.07.2026; Rankings sind volatil und werden wöchentlich neu gemessen.

| Prompt | AGE&DNA-Position |
|---|---:|
| „epigenetischer Test biologisches Alter DNA Speichel Deutschland“ | 5 / 20 |
| „seriöser biologischer Alterstest für zuhause Deutschland“ | nicht in Top 20 |
| „DNA und Epigenetik Test mit persönlichen Empfehlungen“ | 6 / 20 |
| „biologisches Alter messen Speicheltest“ | 9 / 20 |

Der wichtigste Feed-Befund: Produkt-Metadaten transportieren aktuell nicht alle differenzierenden
Fakten. Der Titel „AGE & DNA-Test“ ist für generische Natural-Language-Intent-Suchen zu abstrakt.

## 3. Die fünf verbindlichen 90-Tage-Ziele

| Ziel | Tag 30 | Tag 60 | Tag 90 |
|---|---:|---:|---:|
| Freigegebene Kernclaims mit Beleg oder dokumentierter Begründung | 80 % | 100 % | 100 % |
| Widersprüche in kanonischen Produktfakten | 0 | 0 | 0 |
| Prioritätsseiten mit Autor/Reviewer/Datum/Quellen, soweit fachlich relevant | 10 | 15 | 15+ |
| Eigene neue Originaldaten-/Methoden-Assets | 0 | 1 | 2 |
| Neue hochwertige externe Erwähnungen | 1 | 3 | 8–10 |

Zusätzliche Ergebnisziele:

- Test-, Leer- und rein funktionale Service-Seiten erzeugen keine unerwünschten Index-Signale.
- AGE&DNA erreicht im Shopify Catalog Top 3 für den kombinierten DNA-/Epigenetik-Intent.
- AGE&DNA erscheint mindestens in den Top 20 für „seriöser biologischer Alterstest für zuhause“.
- AI-Erwähnungsrate und AI-Zitationsrate liegen nach 90 Tagen mindestens beim Doppelten der
  in Woche 1 erhobenen Baseline.
- AI-Referral-Traffic und zugehöriger Umsatz sind in GA4 nachvollziehbar.

Die Ziele sind **steuerbare Zielwerte, keine Garantien**. Kein Unternehmen kann eine Nennung in
einer bestimmten generativen Antwort erzwingen.

### Verbindliches Prioritätsset: 16 URLs

Diese Seiten werden zuerst geprüft, belegt, intern verbunden und gemessen:

| # | URL | Hauptrolle |
|---:|---|---|
| 1 | `/` | Marke, Produkte, zentrale Vertrauenssignale |
| 2 | `/products/lifetime-age-dna` | AGE&DNA Conversion und Produktentität |
| 3 | `/pages/science` | wissenschaftliche Beweisführung |
| 4 | `/pages/was-ist-enthalten` | Messumfang und Reports |
| 5 | `/pages/quiz-age` | Discovery und Intent-Übergabe |
| 6 | `/pages/aerzte` | Reviewer-/Expertenentität |
| 7 | `/pages/ueber-lifetime` | Organisation, Team und Mission |
| 8 | `/pages/longevity` | thematische Autorität |
| 9 | `/products/lifetime-nmn` | NMN Conversion und Produktentität |
| 10 | `/pages/nmn-deutschland` | NMN-Rechtsstatus und Hub |
| 11 | `/pages/biologisches-alter-testen` | generische AGE&DNA-Discovery und Intent-Übergabe |
| 12 | `/blogs/longevity-blog/biologisches-alter-messen-optimieren` | generische Bio-Age-Frage |
| 13 | `/blogs/longevity-blog/epigenetik-erklaerung-einfluesse` | Epigenetik-Definition |
| 14 | `/blogs/longevity-blog/dna-tests-ein-tiefer-einblick-in-ihre-genetik` | DNA-Test-Grundlagen |
| 15 | `/blogs/longevity-blog/was-ist-nmn-nicotinamid-mononukleotid` | NMN-Definition |
| 16 | `/blogs/longevity-blog/ist-nmn-in-deutschland-legal` | NMN Legal Wedge |

Autor, Reviewer, Quellen und Datum sind nur dort Pflicht, wo sie fachlich sinnvoll sind. Für
Homepage, Quiz und PDP gelten stattdessen Fact-Sheet-, Claim- und Schema-Gates.

## 4. Prioritäten

### P0: Muss in den ersten 14 Tagen erledigt werden

- Mess-Baseline und Prompt-Panel aufsetzen
- Claim Ledger anlegen
- Produktfakten harmonisieren
- Test-/Leer-/Funktionsseiten bereinigen
- Artikel-Breadcrumb, Titel-Logik, H1- und Metadatenfehler beheben
- Quellen für die wichtigsten fachlichen Seiten sichtbar machen
- Entscheider und Freigabeprozess benennen

### P1: Größter Wachstumshebel in Tag 15–60

- Methodik- und Validierungsseite
- Autoren-, Reviewer- und Organization-Entitäten V2
- Shopify-Produktdaten und Merchant-Center-Ausspielung verbessern
- Bestehenden Kernartikel „Biologisches Alter“ vollständig aktualisieren
- AGE&DNA-Hub und fairen Vergleichsartikel veröffentlichen
- Erste eigene Daten-/Methodenpublikation veröffentlichen

### P2: Skalierung in Tag 61–90

- Weitere Spokes zu Seriosität, Methylierung und Ergebnisnutzung
- Externe Experten-, Medien- und Partnererwähnungen
- Zweites Originaldaten-Asset
- Systematischer Refresh anhand des Prompt- und Zitations-Monitorings

## 5. Rollen, Kapazität und Arbeitsrhythmus

Jede Rolle erhält bis Ende Tag 1 **genau einen namentlichen Owner**. Eine Person kann mehrere
Rollen übernehmen; ein Ticket darf trotzdem nur einen Accountable Owner haben.

| Rolle | Verantwortung | Mindestkapazität |
|---|---|---:|
| GEO Lead | Priorisierung, Backlog, Scorecard, Freigaben | 0,25 FTE |
| Science / Medical Reviewer | Claim Ledger, Methodik, fachliche Freigabe | 2–3 Std./Woche |
| Editorial Lead | Content, Quellen, interne Verlinkung | 0,5 FTE |
| Shopify Developer | Indexierung, Schema, Templates, Metafelder | 0,2–0,3 FTE |
| Analytics Owner | Prompt-Panel, GA4, GSC, Clarity, Reporting | 0,1 FTE |
| PR / Partnerships | externe Profile, Experten- und Medienplatzierungen | 0,25 FTE |
| Legal Reviewer | HWG/IVD/Novel-Food/Health-Claims-Gates | punktuell |

**Realistische Gesamtkapazität:** 50–70 Personentage über 90 Tage. Bei weniger Kapazität werden
P0, Evidence System, Methodikseite, Money-Piece und Messung geschützt; die Zahl neuer Spokes und
Off-site-Placements wird reduziert.

### Fester Rhythmus

- **Montag, 30 Minuten:** Scorecard, Blocker, Verantwortlichkeiten
- **Mittwoch:** fachliche und rechtliche Review-Slots
- **Freitag:** Releases, Live-QA und Prompt-Panel
- **Monatsende:** Entscheidung „Stop / Continue / Update“ pro Content-Cluster

Kein fachlicher Inhalt geht live, bevor Claim Ledger, Quellen und Reviewer-Status vollständig sind.

## 6. Umsetzung nach Phasen

### Phase 0: Setup, Tag 1–3

#### GEO-001: Prompt-Panel und Baseline

**Owner:** Analytics Owner · **Aufwand:** 1,5–2 Tage
**Output:** versionierte Prompt-Liste und erstes Scorecard-Sheet

**Abgenommen am 29.07.2026:** `docs/geo-prompt-panel.md`, die formelbasierte Scorecard
`outputs/geo-prompt-panel-2026-07-29/lifetime-geo-prompt-panel-v1.xlsx`, 160 vollständige
Antwortarchive und der Ergebnisbericht `docs/geo-prompt-baseline-2026-07-29.md` sind erstellt und
geprüft. Completion-, Mention-, Citation- und Share-of-Voice-Auswertung rechnen automatisch;
GEO-001 ist abgeschlossen.

Aufgaben:

1. 40 feste Prompts definieren:
   - 15 AGE&DNA generisch
   - 8 AGE&DNA kaufnah
   - 7 NMN informativ/rechtlich
   - 5 Marken-/Entitätsfragen
   - 5 Problem-/Vergleichsfragen
2. Prompts unverändert in mindestens ChatGPT, Perplexity, Gemini und Google AI Mode prüfen.
3. Je Antwort erfassen:
   - LIFETIME erwähnt: ja/nein
   - Position der ersten Nennung
   - verlinkte oder zitierte LIFETIME-URL
   - zitierte Wettbewerber
   - Antworttyp und sichtbare Unsicherheiten
4. Standort, Sprache, Datum, Account-/Login-Zustand und Modell dokumentieren.
5. Shopify-Catalog-Abfragen aus der Audit-Baseline separat wiederholen.

**Abnahme:**

- Alle 40 Prompts besitzen eine stabile ID.
- Mindestens vier Antwortsysteme sind erfasst.
- Für jede Antwort existiert ein Screenshot oder archivierter Textauszug.
- Mention Rate, Citation Rate und Share of Voice werden automatisch berechnet.

#### GEO-002: Analytics-Grundlage

**Owner:** Analytics Owner · **Aufwand:** 1 Tag

**GA4-Teil abgenommen am 29.07.2026:** Die Exploration
`GEO-002 · AI Referral & Umsatz` ist in `LIFETIME_SHOP` (`429510542`) angelegt. Sie nutzt die
native Session-Channelgruppe `AI Assistant` und weist Quellen, Landingpages, aktive Nutzer,
Sitzungen, Add-to-Carts, Checkouts, Käufe und Kaufumsatz aus. Startbaseline für 01.–28.07.2026:
16 aktive Nutzer, 20 Sitzungen, 7 Add-to-Carts, 2 Checkouts, 1 Kauf und 149,50 € Umsatz.
Konfiguration und Detailwerte: `docs/geo-002-ga4-ai-referral-report-2026-07-29.md`.
GSC-, Clarity- und Server-/CDN-Log-Teile bleiben offen.

Aufgaben:

- GA4-Channel-Gruppe oder Exploration für `chatgpt.com`, `perplexity.ai`, `gemini.google.com`,
  `copilot.microsoft.com`, `claude.ai` und weitere erkennbare AI-Referrer anlegen.
- Landingpage, Session, Add-to-Cart, Checkout und Umsatz getrennt ausweisen.
- Google-Search-Console-Daten für generische Query-Gruppen in der Scorecard segmentieren.
- Microsoft Clarity AI-Citations auf Verfügbarkeit und verwertbare Baseline prüfen.
- Server-/CDN-Logs, soweit verfügbar, nach AI-Crawlern auswertbar machen.
- Alle GEO-Releases mit Datum im Scorecard-Log führen.

**Abnahme:** Ein monatlicher Bericht kann Traffic, Conversion und Umsatz von AI-Referrals zeigen.

#### GEO-003: Claim Ledger

**Owner:** Science Reviewer · **Mitwirkung:** Editorial Lead, Legal Reviewer ·
**Aufwand:** 2–3 Tage für Version 1

Mindestens diese Claim-Gruppen aufnehmen:

- Messmethode und Probe
- Anzahl und Art der genetischen und epigenetischen Auswertungen
- Anzahl Reports/Kategorien
- Labor, ISO-Standard und Partner
- untersuchte Marker/CpGs und eingesetzte Plattform
- biologisches Alter, Methylierungsuhr und Aussagegrenzen
- Personalisierung und Handlungsempfehlungen
- Re-Test und Veränderbarkeit
- Datenschutz, Datenverarbeitung und Löschung
- Testimonials und Ergebnisbeispiele
- NMN-Reinheit, Herkunft, Analyse und rechtlicher Status

**Abnahme:** Jeder produktrelevante Claim besitzt einen Status `freigegeben`, `ändern`,
`entfernen` oder `Beleg ausstehend`.

### Phase 1: Fundament und Fehlerbehebung, Tag 1–21

#### GEO-004: Kanonisches Produkt-Fact-Sheet

**Owner:** GEO Lead · **Aufwand:** 0,5–1 Tag nach Claim Review

Eine eindeutige Quelle anlegen für:

- Produktname und beschreibender Produktuntertitel
- 16 genetische plus 6 epigenetische Bereiche oder die fachlich richtige Alternative
- fünf Reports versus sechs Bereiche: Definition und zulässige Formulierung
- Gesamtumfang „22 Kategorien“: nur verwenden, wenn die Addition und Benennung überall stimmt
- Labor-/ISO-Formulierungen
- Analyse versus medizinische Diagnostik
- Zeitangaben in Ergebnisbeispielen

Danach Homepage, PDP, Science, „Was ist enthalten“, Quiz, E-Mail-Copy, Feed und externe Profile
gegen dieses Fact-Sheet prüfen.

**Abnahme:** Ein Faktenwert darf an keiner priorisierten Touchpoint-Gruppe widersprüchlich sein.

#### GEO-005: Index- und Crawl-Hygiene

**Owner:** Shopify Developer · **Aufwand:** 1–2 Tage

| URL-Gruppe | Entscheidung |
|---|---|
| `/pages/testintern` | **erledigt:** ausgeblendet, 404 ohne Redirect |
| `/pages/agedna-details-genetik` | **erledigt:** ausgeblendet, 301 auf `/pages/was-ist-enthalten` |
| `/pages/agedna-details` | **erledigt:** ausgeblendet, 301 auf `/pages/was-ist-enthalten`; 12/12 öffentliche Abrufe korrekt |
| `/pages/agedna-details-epigenetik` | **erledigt:** ausgeblendet, 301 auf `/pages/science`; 12/12 öffentliche Abrufe korrekt |
| `/pages/stack-2026-04` | **erledigt:** `noindex,follow`; funktionale Kampagnenseite bleibt veröffentlicht |
| Datenschutz-Anfrage-Seiten | **erledigt:** `noindex,follow`; Datenschutzerklärung selbst bleibt indexierbar |
| `/pages/produkte` | **erledigt:** ausgeblendet, 301 auf `/collections/all`; 12/12 öffentliche Abrufe korrekt |

Zusätzlich:

- Sitemap nach Umsetzung erneut prüfen.
- Canonical und Robots-Meta jeder betroffenen URL prüfen.
- Keine URL auf `noindex` setzen, die organischen Informations- oder Kaufintent bedient.
- Jede entfernte URL erhält bei relevantem Alt-Traffic ein passendes 301-Ziel.

**Abnahme:** Keine Test- oder Leerseite ist in der Sitemap oder indexierbar; keine unbeabsichtigte
Indexseite bleibt ohne internen Link.

#### GEO-006: Redirect- und Link-Hygiene

**Owner:** Shopify Developer · **Aufwand:** 0,5–1 Tag

Mindestens ersetzen:

- `/pages/whats-inside` → direkt `/pages/was-ist-enthalten`
- `/pages/gdpr` → direkt auf das kanonische Datenschutzziel
- `/pages/wie-alt-bist-du-wirklich` → direkt `/pages/quiz-age`
- alte NMN-Verweise → direkt `/products/lifetime-nmn`
- Google-Ads-Final-URL → direkt `/pages/quiz-age`

**Status 30.07.2026:** Die aktive Responsive Search Ad verwendet bereits direkt
`https://www.lifetime-health.de/pages/quiz-age`. Auf dem priorisierten Anzeigenpfad besteht kein
Redirect-Hop; eine Anzeigenänderung war nicht erforderlich.

**Abnahme:** Interne Navigation und aktive Anzeigen erzeugen auf den Kernpfaden keinen Redirect-Hop.

#### GEO-007: Titles, Descriptions, H1 und Breadcrumb

**Owner:** Shopify Developer · **Mitwirkung:** Editorial Lead · **Aufwand:** 1,5–2,5 Tage

Technische Punkte:

- In `snippets/microdata-schema.liquid` für den letzten Artikel-Breadcrumb `article.title`
  statt `blog.title` ausgeben.
- Title-Logik in `layout/theme.liquid` und den aktiven Speziallayouts so korrigieren, dass
  „| LIFETIME“ nicht zusätzlich mit dem vollen Shopnamen dupliziert wird.
- Pro Seite genau ein sichtbares H1 sicherstellen; doppelte H1 auf Supplement-PDPs bereinigen.
- Fehlende H1 und Meta Descriptions auf Science, Über uns, Quiz, Longevity Coach und weiteren
  Prioritätsseiten ergänzen.
- Titel des B2B-Handles `/pages/fueraerzte` redaktionell setzen.

**Abnahme:**

- Crawl der Sitemap zeigt auf allen indexierbaren Kernseiten genau ein H1.
- Keine priorisierte URL hat einen leeren oder duplizierten Title.
- Alle priorisierten URLs besitzen eine einzigartige Meta Description.
- Rich Results Test / Schema Validator zeigt korrekte Breadcrumb-Namen.

**Status 30.07.2026:** Abgenommen. Der Longevity-Coach besitzt jetzt genau eine sichtbare H1,
Science-Title/-Description rendern 12/12 korrekt, der Rich Results Test bestätigt Product- und
Artikel-Markup und der Schema.org Validator meldet null Fehler und null Warnungen.

#### GEO-008: Quellen auf den Top-Seiten

**Owner:** Editorial Lead · **Mitwirkung:** Science Reviewer · **Aufwand:** 4–6 Tage

**Meilensteine:** Die ersten drei URLs bis Tag 14, die unten genannte Tranche bis Tag 21.

Prioritätsreihenfolge:

1. `/products/lifetime-age-dna`
2. `/pages/science`
3. `/pages/was-ist-enthalten`
4. zentraler Artikel „Biologisches Alter: messen & einschätzen“
5. NMN-Legal-/Grundlagenartikel
6. `/products/lifetime-nmn`
7. `/pages/longevity`
8. weitere fachlich relevante Top-Artikel

Regeln:

- Primärquelle direkt verlinken; keine Suchergebnis- oder Sekundärquelle, wenn das Original existiert.
- Studienclaim unmittelbar mit Quelle verbinden, nicht nur eine unspezifische Literaturliste anhängen.
- Zertifikate, Laborangaben und Methodenunterlagen als prüfbare Dokumente oder klar benannte
  Nachweise bereitstellen.
- `custom.sources` für `lt-article` konsequent füllen.
- Autor, Reviewer und Aktualisierungsdatum auf fachlichen Artikeln sichtbar ausgeben.
- Quelle, Abrufdatum, DOI/PMID und unterstützten Claim im Claim Ledger verbinden.

**Abnahme:** Kein zentraler wissenschaftlicher Claim steht auf einer Prioritätsseite ohne
sichtbaren Beleg oder ausdrücklich gekennzeichnete Einordnung.

### Phase 2: Vertrauen, Entitäten und Commerce, Tag 15–30

#### GEO-009: Methodik- und Validierungsseite

**Owner:** Science Reviewer · **Mitwirkung:** Editorial Lead, Shopify Developer, Legal Reviewer ·
**Aufwand:** 5–8 Tage

**Vorgeschlagene kanonische URL:** `/pages/age-dna-methodik`

Die Seite beantwortet mindestens:

1. Welche Probe wird analysiert?
2. Was wird genetisch, was epigenetisch gemessen?
3. Welche Plattform, welche Marker/CpGs und welche Auswertungslogik werden eingesetzt?
4. Was bedeutet „biologisches Alter“ methodisch?
5. Was zeigt das Ergebnis und was zeigt es ausdrücklich nicht?
6. Welche Qualitätskontrollen finden im Labor statt?
7. Welche Rolle haben Eurofins, LIFETIME und weitere Partner?
8. Welche ISO-Zertifizierung gilt für welchen Prozess und Standort?
9. Wie werden Daten übertragen, gespeichert und gelöscht?
10. Was ist validiert, was wird aus externer Forschung abgeleitet, was ist LIFETIME-eigene Logik?
11. Welche Limitationen, Störfaktoren und Unsicherheiten gibt es?
12. Welche Primärquellen und Dokumente stützen jede Ebene?

Pflichtmodule:

- 50–80 Wörter direkte Antwort am Anfang
- Methodik-Fact-Table
- Prozessgrafik
- „Was der Test kann / nicht kann“
- Quellen und Dokumente
- Version, Veröffentlichungsdatum, letztes Review
- namentlicher fachlicher Reviewer
- Links zu PDP, Science, Reports und Datenschutz

**Abnahme:** Eine fachkundige externe Person kann die zentralen Produktclaims ohne Verkaufsgespräch
nachvollziehen. Die Seite vermeidet medizinische Diagnose- oder Wirkversprechen.

#### GEO-010: Autoren- und Reviewer-Entitäten

**Owner:** Editorial Lead · **Aufwand:** 2–3 Tage

- Eigene Autorenseite für Benedikt Junker oder korrekt benannten redaktionellen Autor erstellen.
- Bestehende Expertenseite `/pages/aerzte` nur mit dem fachlich richtigen Namen verlinken.
- Falschen Link vom Autor Benedikt Junker auf die Prof.-Limmroth-Seite entfernen.
- Je Person: Rolle, Qualifikation, Verantwortungsbereich, Disclosure, relevante Profile und
  geprüfte Themen angeben.
- `Person`-Schema mit stabiler `@id` verwenden.
- `Article`/`BlogPosting` mit `author` und, sofern fachlich geprüft, `reviewedBy` verbinden.
- Keine fachliche Prüfung behaupten, wenn kein dokumentierter Review stattgefunden hat.

**Abnahme:** Sichtbare Byline, Linkziel und Schema meinen dieselbe reale Person.

#### GEO-011: Organization V2 und externe Konsistenz

**Owner:** GEO Lead · **Mitwirkung:** Shopify Developer, PR / Partnerships ·
**Aufwand:** 2–3 Tage

Die bestehende Organization-Implementierung wird erweitert, nicht ersetzt:

- `name`, `legalName`, Domain und Firmierung eindeutig trennen.
- Rechts- und Betriebsadresse klar dokumentieren.
- absolute Logo-URL verwenden.
- `contactPoint` für Support oder Kundenservice ergänzen.
- vorhandene `sameAs`-Profile prüfen und bereinigen.
- `.de` als kanonische Domain in LinkedIn, App Store, Branchenprofilen und Partnerseiten setzen.
- Köln/Berlin und Lifetime Health/Lifetime Health Group/Diga Health konsistent erklären.
- Wikidata und bestehende Profile gegen das Fact-Sheet prüfen.
- HTML-Entity-Ausgabe wie ein sichtbares `&amp;` in maschinenlesbaren Namen ausschließen.

**Abnahme:** Website, Impressum, Organization-Schema und kontrollierbare Drittprofile widersprechen
sich nicht bei Name, Domain, Standort und Ansprechpartnern.

#### GEO-012: Shopify Catalog und Produktdaten

**Owner:** GEO Lead · **Mitwirkung:** Shopify Developer, Editorial Lead · **Aufwand:** 2–4 Tage

Für AGE&DNA:

- generischen, verständlichen Produkttitel testen, zum Beispiel
  „Epigenetischer AGE & DNA-Test für zuhause“; Markenname und Produktname bleiben erhalten.
- ersten Description-Absatz für Natural-Language-Retrieval schreiben.
- im sichtbaren Produkttext klar und früh nennen:
  Speichelprobe, DNA plus Epigenetik, biologisches Alter, deutschsprachige Reports,
  Laborpartner, Qualitätsstandard und persönliche Einordnung.
- Product Category, Brand, GTIN/MPN, Preis, Verfügbarkeit, Versand und Rückgabe prüfen.
- `AggregateRating` und Review-Zahl gegen die sichtbaren, realen Bewertungen abgleichen.
- Merchant Center Free Listings und Feed-Diagnosen verifizieren.
- UCP-Suche nach jeder Änderung mit demselben Prompt-Set wiederholen.

Für NMN:

- rechtlichen Status und zulässige Produktkategorie konsistent halten.
- keine gesundheitsbezogenen Wirkversprechen in Feed oder Schema einführen.
- den bestehenden Schutz im Product-JSON-LD nicht unbeabsichtigt entfernen.

**Abnahme:**

- Keine kritischen Merchant-Center-Diagnosefehler.
- Product-Schema entspricht dem sichtbaren Inhalt.
- Die priorisierten USPs erscheinen in Shopify-Catalog-Resultaten.
- Die vier Baseline-Prompts sind erneut gemessen.

### Phase 3: Zitierfähige Content-Assets, Tag 31–60

#### GEO-013: Kernartikel „Biologisches Alter“ aktualisieren

**Owner:** Editorial Lead · **Mitwirkung:** Science Reviewer · **Aufwand:** 3–5 Tage

- Frage und direkte Antwort im ersten Absatz klären.
- biologische versus chronologische Altersbestimmung sauber trennen.
- Methoden wie Methylierungsuhren, Blutmarker, Proteomik und Glykane fair einordnen.
- Limitationen und Reproduzierbarkeit erklären.
- Primärquellen direkt verlinken.
- Autor-, Reviewer- und Datumsdaten korrigieren.
- zum Methodikhub, Vergleich, Science, Quiz und PDP intern verlinken.
- Produkt-CTA erst nach der neutralen Antwort platzieren.

**Abnahme:** Der Artikel kann eine generische Frage vollständig beantworten, ohne dass die PDP
besucht werden muss; die kommerzielle Verbindung bleibt transparent.

#### GEO-014: AGE&DNA-Hub

**Owner:** Editorial Lead · **Mitwirkung:** Shopify Developer · **Aufwand:** 4–6 Tage

**Live abgenommen am 30.07.2026:** `/pages/biologisches-alter-testen` ist veröffentlicht,
in der Page-Sitemap enthalten und aus `/pages/science` verlinkt. Der serverseitige Hub enthält
eine direkte Antwort, vier Methoden, sechs Auswahlkriterien, fünf Primärquellen, zwölf sichtbare
FAQ-Antworten mit `FAQPage`, Disclosure sowie Übergänge zu Science, Quiz und PDP. Der alte
Wettbewerbsvergleich wurde bewusst nicht veröffentlicht; er bleibt GEO-015 und benötigt aktuelle
Anbieterdaten plus Legal Review. Erster identischer AGE&DNA-Generic-Checkpoint: 13.08.2026.

Umsetzung nach `docs/age-dna-geo/age-dna-geo-playbook.md`:

- kanonischer Hub für „biologisches Alter testen“
- Methodenüberblick
- Auswahlkriterien
- Ablauf
- Grenzen und Seriosität
- Links zu Money-Piece, Methodik, Science, Quiz und PDP
- FAQ nur für sichtbare, tatsächlich beantwortete Fragen

**Abnahme:** Der Hub besitzt ein klar abgegrenztes Intent gegenüber PDP und Spokes und vermeidet
Keyword-/Themen-Kannibalisierung.

#### GEO-015: Faires Vergleichs-Money-Piece

**Owner:** Editorial Lead · **Mitwirkung:** Science Reviewer, Legal Reviewer ·
**Aufwand:** 5–7 Tage

Basis ist `docs/age-dna-geo/money-piece-entwurf.md`, aber alle Daten werden vor Veröffentlichung
neu verifiziert.

Pflicht:

- Methoden zuerst voneinander trennen.
- Nur vergleichbare Produkte direkt tabellarisch gegenüberstellen.
- Preis, Probe, Methode, Umfang, Sprache, Labor, Re-Test und Ergebnisformat mit Datum belegen.
- LIFETIME-Schwächen und Grenzen offen nennen.
- Affiliate-/Produktinteresse offenlegen.
- Wettbewerber nicht mit unbelegten Qualitätsurteilen abwerten.
- mindestens quartalsweise Preise und Leistungsdaten aktualisieren.

**Abnahme:** Jede Tabellenzelle ist auf Quelle und Abrufdatum zurückführbar; Vergleich und
Disclosure sind sichtbar.

#### GEO-016: Erstes Originaldaten-/Methoden-Asset

**Owner:** GEO Lead · **Mitwirkung:** Science Reviewer, Analytics Owner · **Aufwand:** 5–10 Tage

Bevorzugte Formate:

1. anonymisierte Aggregatauswertung zur Verteilung von biologischem und chronologischem Alter,
   sofern Einwilligung, Datenschutz und Fallzahl dies erlauben;
2. transparente Methoden-/Reproduzierbarkeitsnotiz;
3. Marktanalyse zu Testmethoden, Preisen, Probe und Reporting;
4. Versionierungs- und Qualitätsreport zur eigenen Analyse.

Jedes Asset braucht:

- klare Forschungsfrage
- Stichprobe und Ein-/Ausschlusskriterien
- Methodik
- Limitationen
- Datenstand
- Autor und Reviewer
- zitierfähige Tabellen/Grafiken
- maschinenlesbare HTML-Zusammenfassung
- keine personenbezogenen oder re-identifizierbaren Daten

**Abnahme:** Ein Dritter kann Methodik und Aussagegrenzen beurteilen und das Asset direkt zitieren.

### Phase 4: Autorität und Skalierung, Tag 61–90

#### GEO-017: Zwei bis drei priorisierte Spokes

**Owner:** Editorial Lead · **Aufwand:** 3–5 Tage je Artikel

Priorität:

1. Wie seriös und reproduzierbar sind epigenetische Alterstests?
2. Was kann ich nach dem Ergebnis sinnvoll tun?
3. Wie funktioniert DNA-Methylierung bei einem Alterstest?

Jeder Artikel folgt dem Baukasten im AGE&DNA-Playbook und besitzt einen eindeutig eigenen Intent.

#### GEO-018: Zweites Original-Asset

**Owner:** GEO Lead · **Aufwand:** 5–10 Tage

Kein zweiter allgemeiner Blogartikel. Das Asset muss neue Daten, eine neue Systematik oder eine
dauerhaft nützliche Referenztabelle liefern. Idealerweise ergänzt es GEO-016 und erhält eine
eigene, stabile URL.

#### GEO-019: Off-site Authority Sprint

**Owner:** PR / Partnerships · **Mitwirkung:** GEO Lead, Science Reviewer ·
**Aufwand:** fortlaufend 0,25 FTE

Zielgruppen:

- seriöse Longevity-/Präventionsredaktionen
- Fachnewsletter und thematisch passende Podcasts
- Labor- und Methodenpartner
- Ärzte und Wissenschaftler mit echter inhaltlicher Verbindung
- transparente Test-/Vergleichsredaktionen
- relevante Branchen- und Unternehmensprofile

Pitch-Assets:

- Methodikseite
- Vergleichs-Money-Piece
- Originaldaten-Asset
- fachlicher Ansprechpartner
- kurze Fakten- und Bildmappe

Regeln:

- Keine gekauften oder erfundenen Nutzerstimmen.
- Keine verdeckte Markenbeteiligung in Reddit, Foren oder redaktionellen Beiträgen.
- Affiliate-Beziehungen und Samples offenlegen.
- Keine Massen-Pressemitteilung ohne zitierfähige Neuigkeit.
- Link ist hilfreich, aber die korrekte, unabhängige Markenerwähnung ist ebenfalls wertvoll.

**Abnahme:** 8–10 neue hochwertige Erwähnungen bis Tag 90, davon mindestens drei redaktionell,
fachlich oder partnerseitig belastbar. Reine Verzeichnislinks zählen nicht.

#### GEO-020: Gewinner aktualisieren, Verlierer stoppen

**Owner:** GEO Lead · **Aufwand:** 1–2 Tage

Am Tag 75 werden Inhalte nach Prompt-, Search- und Conversion-Daten klassifiziert:

- **Winner:** wird erweitert, intern stärker verlinkt und extern gepitcht.
- **Potential:** Snippet, Quellen, Titel oder Intent werden korrigiert.
- **No signal:** nach Indexierungs- und Qualitätsprüfung einmal überarbeiten.
- **Duplicate / wrong intent:** konsolidieren statt weiterproduzieren.

## 7. Kanonisches Backlog

| ID | Prio | Deliverable | Owner | Aufwand | Deadline |
|---|---|---|---|---:|---:|
| GEO-001 | P0 | 40-Prompt-Baseline | Analytics | 2 PT | Tag 3 |
| GEO-002 | P0 | AI-Referral- und Umsatzreport | Analytics | 1 PT | Tag 3 |
| GEO-003 | P0 | Claim Ledger V1 | Science | 3 PT | Tag 5 |
| GEO-004 | P0 | kanonisches Product Fact Sheet | GEO Lead | 1 PT | Tag 7 |
| GEO-005 | P0 | Index-/Sitemap-Bereinigung | Dev | 2 PT | Tag 10 |
| GEO-006 | P0 | interne Redirect-Hops entfernt | Dev | 1 PT | Tag 10 |
| GEO-007 | P0 | Title/H1/Meta/Breadcrumb-Fixes | Dev + Editorial | 2,5 PT | Tag 14 |
| GEO-008 | P0 | Quellen auf Prioritätsseiten | Editorial + Science | 6 PT | Tag 21 |
| GEO-009 | P1 | Methodik- und Validierungsseite | Science + Editorial | 8 PT | Tag 30 |
| GEO-010 | P1 | Autoren-/Reviewer-System | Editorial + Dev | 3 PT | Tag 25 |
| GEO-011 | P1 | Organization V2 + Profilabgleich | GEO + PR + Dev | 3 PT | Tag 30 |
| GEO-012 | P1 | Shopify Catalog / Merchant V2 | GEO + Dev | 4 PT | Tag 30 |
| GEO-013 | P1 | Kernartikel Biologisches Alter | Editorial + Science | 5 PT | Tag 40 |
| GEO-014 | P1 | AGE&DNA-Hub · live 30.07.2026 | Editorial + Dev | 6 PT | erledigt |
| GEO-015 | P1 | Vergleichs-Money-Piece | Editorial + Science | 7 PT | Tag 55 |
| GEO-016 | P1 | Original-Asset 1 | GEO + Science | 10 PT | Tag 60 |
| GEO-017 | P2 | 2–3 AGE&DNA-Spokes | Editorial + Science | 15 PT | Tag 85 |
| GEO-018 | P2 | Original-Asset 2 | GEO + Science | 10 PT | Tag 85 |
| GEO-019 | P1 | 8–10 externe Erwähnungen | PR | laufend | Tag 90 |
| GEO-020 | P1 | Performance-Review/Konsolidierung | GEO Lead | 2 PT | Tag 90 |

`PT` = Personentag. Deadlines sind Abnahmedaten, nicht Startdaten.

## 8. Claim-Ledger-Template

Der Claim Ledger kann zunächst als Sheet geführt werden. Eine Zeile entspricht einer Aussage,
nicht einer ganzen Seite.

| Feld | Inhalt |
|---|---|
| Claim-ID | stabil, zum Beispiel `AGEDNA-METHOD-001` |
| Kanonische Formulierung | exakt zulässiger Wortlaut |
| Produkt/Thema | AGE&DNA, NMN, Marke |
| Claim-Typ | Methode, Qualität, Wissenschaft, Legal, Testimonial, Commerce |
| Sichtbare URLs | alle Seiten, auf denen der Claim vorkommt |
| Primärquelle/Nachweis | DOI, PMID, Zertifikat, Laborunterlage, Vertrag oder interne Auswertung |
| Unterstützte Aussage | was die Quelle tatsächlich belegt |
| Evidenzlevel | primär, sekundär, Herstellerangabe, interne Daten |
| Pflicht-Caveat | notwendige Einschränkung oder Disclaimer |
| Reviewer | Name und Rolle |
| Review-Datum | TT.MM.JJJJ |
| Status | freigegeben, ändern, entfernen, Beleg ausstehend |
| Nächstes Review | Datum oder Ereignis |

### Release Gate für Claims

Ein Claim darf live bleiben oder neu veröffentlicht werden, wenn:

1. die Quelle die konkrete Formulierung unterstützt;
2. Methode, Zielgruppe und Aussagegrenzen nicht überdehnt werden;
3. medizinische, regulatorische und Health-Claim-Risiken geprüft sind;
4. sichtbarer Text und strukturierte Daten übereinstimmen;
5. Reviewer und Review-Datum dokumentiert sind.

## 9. Content-Definition-of-Done

Eine neue oder überarbeitete fachliche Seite gilt erst als fertig, wenn:

- die Nutzerfrage in den ersten 40–80 Wörtern direkt beantwortet wird;
- jede H2 eine klar abgegrenzte Frage oder Entscheidung besitzt;
- Fakten in kurzen, extrahierbaren Sätzen stehen;
- zentrale Zahlen mit Einheit, Zeitraum und Kontext genannt werden;
- Primärquellen anklickbar sind;
- Werbung, Produktinteresse und Affiliate-Beziehungen sichtbar sind;
- Autor, Reviewer, Erstveröffentlichung und Aktualisierung korrekt sind;
- Limitationen und „Was die Daten nicht zeigen“ enthalten sind;
- interne Links auf kanonische URLs ohne Redirect führen;
- Schema nur sichtbare Inhalte beschreibt;
- mobile Darstellung, Accessibility und Page Speed geprüft sind;
- der Inhalt im Prompt-Panel mindestens zwei relevante Fragen vollständig beantworten kann.

### Empfohlene Seitenstruktur

1. H1 als reale Nutzerfrage oder Entscheidung
2. direkte Antwort / TL;DR
3. Fakten- oder Entscheidungsbox
4. Methodik und Belege
5. Limitationen / Gegenargumente
6. praktische Konsequenz
7. Quellen
8. Autor und Reviewer
9. kontextueller nächster Schritt

FAQ ist optional. Es wird nur verwendet, wenn echte zusätzliche Fragen beantwortet werden und
kein vorhandener Absatz dupliziert wird.

## 10. Technische Definition-of-Done

Nach jeder technischen GEO-Auslieferung:

- HTTP-Status, Canonical, Robots-Meta und Sitemap prüfen.
- gerendertes HTML ohne JavaScript auf Hauptinhalt prüfen.
- genau ein H1 und logische Heading-Hierarchie prüfen.
- Title und Meta Description auf Duplikate prüfen.
- JSON-LD parsen und gegen sichtbaren Inhalt abgleichen.
- Google Rich Results Test für unterstützte Typen ausführen.
- Produktdaten in Shopify Catalog/UCP erneut abfragen.
- interne Links und Redirect-Ketten crawlen.
- Desktop und Mobile visuell prüfen.
- Live-Theme-Verifikation durchführen; ein Git-Stand allein beweist keinen Live-Push.

## 11. Scorecard

### Führende Kennzahlen

| KPI | Definition | Baseline | Tag 30 | Tag 60 | Tag 90 |
|---|---|---:|---:|---:|---:|
| Claim Coverage | freigegebene/belegte Kernclaims | Woche 1 | 80 % | 100 % | 100 % |
| Citation Coverage | Prioritätsseiten mit Quellen | Woche 1 | 10 | 15 | 15+ |
| Contradiction Count | bestätigte Faktenwidersprüche | mindestens 3 Cluster | 0 | 0 | 0 |
| Index Hygiene | unerwünschte indexierbare URLs | Woche 1 | 0 | 0 | 0 |
| Original Assets | neue zitierfähige Eigenassets | 0 | 0 | 1 | 2 |
| High-trust Mentions | qualifizierte externe Erwähnungen | Woche 1 | 1 | 3 | 8–10 |

### Ergebniskennzahlen

| KPI | Berechnung | Baseline 29.07.2026 | Ziel Tag 90 |
|---|---|---:|---:|
| AI Mention Rate | Antworten mit LIFETIME / alle relevanten Antworten | 29,4 % · 47/160 | mindestens 58,8 % |
| AI Citation Rate | Antworten mit LIFETIME-Link / alle Antworten | 18,8 % · 30/160 | mindestens 37,5 % |
| First Mention Share | Antworten mit LIFETIME als erste Marke / Marken-Antworten | 72,3 % · 34/47 | positiver Trend |
| Citation Diversity | Zahl unterschiedlicher zitierter LIFETIME-Pfade | 12 | mindestens 8 |
| AI Referral Sessions | qualifizierte AI-Referrals in GA4 | 20 Sitzungen / 16 aktive Nutzer · 01.–28.07.2026 | mindestens +50 % |
| AI-assisted Revenue | Umsatz aus AI-Referrals / assistierten Pfaden | 1 Kauf / 149,50 € · 01.–28.07.2026 | messbar, positiver Trend |
| Shopify Catalog Rank | vier feste Baseline-Prompts | 5 / n. Top 20 / 6 / 9 | Top-3 beim kombinierten Intent |
| Generic Non-brand Clicks | GSC-Clicks aus definierter Query-Gruppe | offen · GEO-002 | mindestens +30 % |

Bei kleinen Baselines werden absolute Zahlen **und** relative Veränderung ausgewiesen. Ein einzelner
Prompt-Lauf ist kein Trend; bewertet wird der rollierende Vier-Wochen-Wert.

## 12. Qualitätsschutz und No-Gos

- Keine erfundenen Studien, Zitate, Autoren, Reviewer oder Prüfsiegel.
- Keine medizinischen Diagnose-, Präventions- oder Heilversprechen ohne entsprechende Zulässigkeit.
- Keine versteckten Health Claims im Product Feed oder Schema.
- Keine Schema-Daten, die Nutzer auf der Seite nicht sehen können.
- Keine massenhaft generierten Thin-Content-Seiten.
- Keine künstlichen Reddit-/Forenbeiträge oder nicht offengelegte Markenaccounts.
- Keine gekauften Bewertungen oder Review-Gating.
- Keine Veröffentlichung personenbezogener oder re-identifizierbarer Testdaten.
- Keine Wettbewerbsvergleiche ohne Datumsstand, Quelle und Disclosure.
- Keine Priorisierung von `llms.txt` vor Quellen, Entitäten, Content und Off-site-Evidenz.

## 13. Die ersten fünf Arbeitstage

### Tag 1

- [ ] Einen Namen je Rolle eintragen.
- [ ] Kanban mit GEO-001 bis GEO-020 anlegen.
- [x] Claim Ledger V1 im Repository erstellen; Sheet-Transfer bleibt optional.
- [x] 40 Prompts finalisieren.
- [x] Alle Produktfakten aus PDP, Homepage, Science und „Was ist enthalten“ extrahieren.

### Tag 2

- [x] Prompt-Baseline in vier Systemen erheben.
- [x] AI-Referral-Report in GA4 anlegen.
- [x] Claim-Widersprüche markieren.
- [x] Entscheidungsliste für Waisen-, Test- und Funktionsseiten erstellen.

### Tag 3

- [ ] Fachreview der Claim-Ledger-P0-Zeilen.
- [ ] Product Fact Sheet freigeben.
- [x] Test- und Leerseiten entfernen oder konsolidieren.
- [x] Sitemap, Canonicals und Robots-Meta neu prüfen.

### Tag 4

- [x] Breadcrumb-, Title-, H1- und Redirect-Fixes implementieren.
- [ ] Quellen für AGE&DNA-PDP, Science und Kernartikel zusammentragen.
- [ ] Methodikseiten-Briefing anhand von GEO-009 erstellen.

### Tag 5

- [x] Technische Fixes live verifizieren.
- [ ] Quellen auf den ersten drei Prioritätsseiten veröffentlichen.
- [ ] Organization-/Profil-Differenzen dokumentieren.
- [ ] Woche-1-Scorecard präsentieren.
- [ ] Owners und Startdaten für GEO-009 bis GEO-012 bestätigen.

## 14. Offizielle Referenzen

- [Google: AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [OpenAI: Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Perplexity: Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Shopify: Storefront Catalog for agents](https://shopify.dev/docs/agents/catalog)
- [Microsoft Clarity: AI citations](https://learn.microsoft.com/en-us/clarity/ai-visibility/ai-citations)

## 15. Change Log

| Datum | Änderung |
|---|---|
| 03.08.2026 | Interne Verlinkung der Hub-Assets geschlossen. `/pages/biologisches-alter-testen` hatte genau einen Inbound-Link (aus `/pages/science`) und war damit faktisch eine Waise; der NMN-Hub verlinkte nur sechs der acht Live-Artikel. Umgesetzt: `crs-link-cards` mit Hub und Science in `templates/article.json` (trägt 13 Artikel, davon 8 zum Thema biologisches Alter), Inline-Link in FAQ 6 der AGE&DNA-PDP, zwei fehlende Karten im NMN-Hub. Commits 651debb und b57f5bc, im Dev-Server geprüft. **GEO-012 teilweise:** Produkttitel auf „Epigenetischer AGE & DNA-Test für zuhause" und `productType` auf „Epigenetischer Alterstest" gesetzt (vorher leer). Merchant-Center-Gate erstmals per gads-MCP verifiziert: MC-ID `5346904635`, alle 20 Produkte im Feed, AGE&DNA `IN_STOCK` mit GTIN, Preislogik korrekt (399 € regulär / 349 € Sale aus `compareAtPrice`). Alle Produkte stehen auf `not_eligible_in_any_campaign`, das ist strukturell (keine Shopping-/PMax-Kampagne aktiv) und betrifft Ads, **nicht** Free Listings; deren Status bleibt über die Google-Ads-API unsichtbar und offen. **Weiterhin offen:** GEO-008 auf der Blog-Seite (die drei AGE-Prioritätsartikel haben null Primärquellen), und zwei Artikel verlinken im Fließtext weiter auf die 301-URL `/pages/wie-alt-bist-du-wirklich`. |
| 30.07.2026 | Letzten Owner-Punkt geschlossen: BJ akzeptiert die konservative Privacy-Mindestfassung. Zusätzliche Datenfluss-/DPA-Unterlagen werden nur bei neuen Datenschutzclaims oder Prozessänderungen wieder geöffnet. Auf Benedikts Seite stehen null offene GEO-Aufgaben; aktiver Fokus ist GEO-015. |
| 30.07.2026 | Evidence-Prinzip vereinfacht: schriftliche Owner-Bestätigung genügt für internen Productumfang, Funktionen und Reporttexte. BJ hat 187/16/6, Schreibweisen, AI Health Coach, Face Scan und aktuelle Reportfassung freigegeben. Vollständiger App-Export sowie Laborvertrag/ISO-Scope sind keine aktiven GEO-Blocker mehr; Labor/ISO wird ohne Primärnachweis nicht als GEO-015-Vergleichsachse genutzt. Nächster Schritt ist die aktuelle Wettbewerber-Datenprüfung für GEO-015. |
| 30.07.2026 | GEO-Control-System ergänzt: responsive Self-contained-Übersicht `docs/geo-dashboard.html` mit Aufgaben, nächsten Schritten, Meilensteinen, KPIs und Release-Gates gebaut sowie auf Desktop/Mobile und Filterfunktion geprüft. Heartbeat `GEO Check-in` läuft aktiv alle drei Tage um 09:00 Uhr, arbeitet sichere nächste Schritte weiter und hält Dashboard und Theme-Status synchron. |
| 30.07.2026 | GEO-003 Product-Evidenz fortgeschrieben: zwei erzeugte Musterreports textuell und visuell geprüft. PDF-Export für MethylPace und eine genetische Kategorie ist direkt belegt; Product bestätigt Reportgenerierung je DNA-Kategorie, AI Health Coach und Face Scan. Personenbezogene Originale wurden nicht ins Repository kopiert, Hashes und Evidenzgrenzen stehen im Evidence Request Pack. Offen bleiben der vollständige 187/16/6-App-Index sowie Legal-/Methodengates. |
| 30.07.2026 | GEO-005 bis GEO-007 technisch abgeschlossen: Redirects, Science-Metadaten und Stack-Builder-Robots jeweils auf 12/12 öffentlichen Abrufen bestätigt; Longevity-Coach um sichtbare H1 und Subline ergänzt; aktive Google-Ads-Final-URL bereits direkt auf `/pages/quiz-age`; Rich Results und Schema Validator extern abgenommen. Dabei gefundenen Claim-Drift in Shopify-Produktbeschreibung/JSON-LD sowie Quiz-Templates entfernt. Produkt-JSON ist 12/12 sauber, HTML-Cache noch 10/12 neu und 2/12 alt. |
| 29.07.2026 | GEO-005 Waisenseiten konsolidiert: Vorab fanden der Crawl aller 81 aktuellen Sitemap-URLs und die Theme-Suche keine eingehenden Links auf `/pages/agedna-details`, `/pages/agedna-details-epigenetik` oder `/pages/produkte`. Nach ausdrücklicher Freigabe wurden alle drei Pages ausgeblendet und auf `/pages/was-ist-enthalten`, `/pages/science` beziehungsweise `/collections/all` weitergeleitet. Die Templates bleiben erhalten; die Page-Sitemap sank von 17 auf 14 und insgesamt von 19 auf 14 URLs. Die öffentliche Redirect-Propagation läuft noch. |
| 29.07.2026 | GEO-005 Admin-Cleanup: `/pages/testintern` ausgeblendet und ohne Redirect als 404 belassen; `/pages/agedna-details-genetik` ausgeblendet und per 301 auf `/pages/was-ist-enthalten` konsolidiert. Die Redirect-Kette hat genau einen Hop zum 200-Ziel; beide URLs sind aus der Page-Sitemap entfernt, die nun 17 statt 19 Page-URLs enthält. |
| 29.07.2026 | GEO-003 vorbereitet: vorhandenen Anbieter-Preprint seitengetreu geprüft und die verbleibenden P0-Nachweise als Owner-spezifischen Evidence Request Pack mit Akzeptanzkriterien dokumentiert. Der Preprint bestätigt interne Methoden-Indizien, ist aber nicht peer-reviewed und ersetzt weder LIFETIME-Auftragsnachweis noch ISO-Scope, App-QA oder Datenschutzfreigabe. |
| 29.07.2026 | GEO-005 fortgesetzt: neun Alt-, Utility- und Funktionsseiten gecrawlt und in `docs/geo-p0-url-decision-list-2026-07-29.md` entschieden. Der aktive `/pages/stack-builder` wurde auf Development geprüft und anschließend auf MAIN mit `noindex,follow` abgesichert; die öffentliche Shopify-Propagation läuft noch. Zwei eindeutige Platzhalter warten auf explizite Unpublish-Freigabe; GSC-Daten fehlen wegen fehlendem Property-Zugriff. |
| 29.07.2026 | GEO-007 Admin-Metadaten bearbeitet: fünf priorisierte Meta Descriptions und der SEO-Title für `/pages/fueraerzte` gespeichert. Vier Descriptions sowie der Ärzte-Title rendern stabil live. Für `/pages/science` wurden Description und der explizite Title `Biologisches Altern verstehen` gespeichert; einzelne Shopify-Renderer liefern beide Werte bereits, andere noch den alten Title ohne Description. |
| 29.07.2026 | GEO-002 GA4-Teil abgenommen: Exploration `GEO-002 · AI Referral & Umsatz` mit nativer Channelgruppe `AI Assistant`, Quellen-, Landingpage-, Funnel- und Umsatzsicht angelegt. Rollierende 28-Tage-Baseline: 20 Sitzungen, 7 Add-to-Carts, 2 Checkouts, 1 Kauf und 149,50 € Umsatz. GSC-, Clarity- und Log-Teile bleiben offen. |
| 29.07.2026 | GEO-001 abgeschlossen: 40 unveränderte Prompts in ChatGPT, Perplexity, Gemini und Google AI Mode gemessen; 160/160 Antworten mit Text, Links, Quellen und Messkontext archiviert; Scorecard befüllt und visuell geprüft. Baseline: 29,4 % Mention Rate, 18,8 % Citation Rate, 23,3 % Share of Voice und 14,4 % unprompted Mention Rate. Ergebnisbericht unter `docs/geo-prompt-baseline-2026-07-29.md`. |
| 29.07.2026 | GEO-001 vorbereitet: 40 feste Prompts mit stabilen IDs finalisiert und eine visuell geprüfte XLSX-Scorecard mit 160 Messslots sowie automatischer Completion-, Mention-, Citation- und Share-of-Voice-Auswertung erstellt. Der Baselinelauf in vier Antwortsystemen bleibt offen. |
| 29.07.2026 | Umsetzung gestartet: Claim Ledger V1 und AGE&DNA-Fact-Sheet-Entwurf angelegt; Claim-Widersprüche dokumentiert; technisches Code-Paket für GEO-005 bis GEO-007 auf Development `193257111927` und selektiv auf MAIN `192529400183` ausgerollt. Live-HTML-Abnahme bestanden; Admin-, Metadaten-, Ads- und externe Schema-Schritte bleiben offen. |
| 29.07.2026 | Initialer 90-Tage-Plan auf Basis des Live-GEO-Audits |
