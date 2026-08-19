---
status: living
last_review: 2026-08-19
canonical_for: theme-massnahmen-tracker
---

# LIFETIME Theme — Status & Anpassungen

> Living-Dokument für alle Theme-Anpassungen, Section-Refactors, Design-System-Änderungen und Lessons.
> **Letzte Änderung:** 2026-08-19 · **Nächster geplanter Touchpoint:** GEO-014-Checkpoint · 15 Perplexity-Prompts
>
> Bei jeder Theme-Session: Eintrag im **Änderungs-Log** unten anhängen (neueste zuerst), TL;DR und To-Dos oben aktualisieren, alte erledigte To-Dos rauswerfen. Pendant zu `lifetime-ads/google-ads-status.md` für die Ads-Domäne.

---

## TL;DR — Aktueller Stand (2026-08-17)

**GEO-014-Checkpoint: ChatGPT vollständig (17.08.).** Alle 15 festen generischen
AGE&DNA-Prompts sind in ChatGPT gemessen und archiviert: 15/60 Zellen, 0/15
LIFETIME-Nennungen und 0/15 Zitationen. Der Stand wird bewusst noch nicht gegen die Baseline
ausgewertet, weil die drei anderen Systeme fehlen. Nächste geschlossene Tranche ist Perplexity,
danach Gemini und Google AI Mode. Details: `docs/geo-prompt-checkpoint-2026-08-14.md`. Auf
Benedikts Seite bleiben null offene GEO-Aufgaben. Bis 60/60 gilt der Checkpoint vor
GEO-015-Contentausbau als Hauptschritt.

**GEO-015-Datenbasis steht (11.08.).** Preise, Verfügbarkeit, Methode, Probe, Ergebnisumfang und
Bereitstellung wurden für LIFETIME, epiAge, neotes und TruDiagnostic gegen aktuelle
Anbieterquellen geprüft und zentral in
`docs/age-dna-geo/competitor-data-2026-08-11.yml` abgelegt. Cerascreen ist ausverkauft und wird
nicht als kaufbare Alternative tabellarisch geführt. Labore/ISO bleiben außerhalb der
Vergleichsachsen. Nächster Schritt: Science-/Legal-Review; noch nicht live.
Die redaktionelle v3 ist inzwischen fertig. Die vollständige Arbeitsfassung liegt unter
`docs/age-dna-geo/money-piece-v3-2026-08-11.md`; offen ist nur noch das interne Review.

0. **Umfangszahlen sind korrigiert (06.08.).** Der Portal-Audit ergab **23 DNA-Kategorien**
   (nicht 16) und **keine feste Reportzahl** (nicht 187; gemessen 150/164/159). Die sechs
   epigenetischen Bereiche stimmen, enthalten aber **MethylPace** statt „biologisches Alter".
   BJ-Entscheid am selben Tag: **„23 Kategorien" ist Standard, „über 150 Einzelergebnisse" nur
   wo eine Mengenaussage nötig ist, nie eine exakte Reportzahl.** Durchgezogen sind 48
   Fundstellen „187" und 22 Fundstellen „16 Kategorien" in Templates *und* Section-Defaults,
   die Shopify-Produktbeschreibung und die Page-SEO-Metafelder von `/pages/science` und
   `/pages/was-ist-enthalten`. Gegen den gerenderten Dev-Server geprüft: 0 Resttreffer.
   **Offen bleibt:** das 16er-Themenraster in beiden Quizzes (bewusst nicht angefasst, siehe
   `docs/lifetime-doctor-quiz-spec.md`) sowie Google-Ads-Assets und Produktfeed.
   Belege: `docs/age-dna-product-fact-sheet.md` § Portal-Audit 2026-08-06.

1. **GEO-014 ist live.** `/pages/biologisches-alter-testen` beantwortet generische
   AGE&DNA-Fragen neutral und zitierfähig: vier Methoden, sechs Auswahlkriterien, fünf
   Primärquellen, zwölf FAQ-Antworten mit `FAQPage`, Disclosure und Übergänge zu Science,
   Quiz und PDP. `/pages/science` verlinkt den Hub; die Page-Sitemap enthält ihn.
2. **GEO-005 bis GEO-007 technisch abgenommen.** Redirects, Science-Metadaten und
   `noindex,follow` für den Stack Builder liefern in 12/12 öffentlichen Abrufen den Sollstand.
   Google Ads nutzt bereits direkt `/pages/quiz-age`; Rich Results und Schema Validator wurden
   extern geprüft.
3. **Longevity-Coach ist semantisch vollständig.** Die Buchungsseite hat jetzt genau eine
   sichtbare H1 plus erklärende Subline oberhalb des unveränderten Calendly-Widgets. Development,
   MAIN und 12/12 öffentliche Renderer sind geprüft.
4. **Verdeckten Claim-Drift geschlossen.** Der externe Product-Schema-Test deckte eine alte
   Shopify-Produktbeschreibung mit klinischer/ISO-Rahmung auf. Die Produktbeschreibung sowie
   zwei Quiz-/Legacy-Templates wurden auf die konservative, kanonische Formulierung korrigiert.
   Der Produktendpunkt ist 12/12 sauber; im HTML liefern aktuell 10/12 Renderer den neuen Stand,
   zwei noch die alte gecachte Beschreibung.
5. **Product-Evidenz pragmatisch geschlossen.** Zwei Musterreports belegen PDF-Exporte für
   MethylPace und eine genetische Kategorie. Product bestätigt Reportgenerierung je DNA-Kategorie,
   AI Health Coach und Face Scan. BJ bestätigt 187/16/6, Schreibweisen, Funktionen und die
   aktuelle Reportfassung vollständig. **Am 06.08.2026 im Anbieter-Portal widerlegt: es sind
   23 Kategorien und keine feste Reportzahl, siehe `docs/age-dna-product-fact-sheet.md`.**
   Ein kompletter App-Export wird nicht mehr angefordert;
   personenbezogene PDFs wurden nicht ins Repository kopiert.
6. **GEO-Control-System eingerichtet.** `docs/geo-dashboard.html` zeigt Aufgaben auf Benedikts
   Seite, nächste Schritte, Meilensteine, KPIs und Release-Gates als responsive lokale Übersicht.
   Der aktive Heartbeat `GEO Check-in` prüft und aktualisiert den Stand alle drei Tage um 09:00 Uhr.
7. **Heading-Stack-Drift im Theme dokumentiert.** Snippet `snippets/section-heading-crs.liquid` neu, Rule in `docs/section-heading-stack.md` zeigt Snippet als kanonisch. `_examples/sections/*.liquid` (benefits, stat-callout, reviews, quote) wurden auf `crs-heading-stack`-Pattern refaktorisiert.
8. **Drift-Hotspots in Live-Templates identifiziert** (per Shopify-MCP gegen die aktiv ausgelieferten Templates abgeglichen):
   - **`lt-pdp-hero`** (in 13 aktiven Produkt-Templates) — größter Hebel, Refactor steht aus.
   - `lt-hp-problem-v2`, `lt-hp-trust-ticker` (Homepage).
   - `ss-video-slider` (20×, 5 Templates), `ss-flip-cards`, `ss-social-proof`, `ss-product-ingredients-2`, `ss-comparison-table-24`, `ss-flexible-tabs`, `ss-feature-1`, `ss-steps-5` — alle ohne `crs-heading-stack`.
9. **Sauber (kein Refactor nötig):** Alle `crs-*`-Sections, `lt-pdp-process-steps`/`lt-pdp-report-preview`/`lt-pdp-ideal-candidate` (Test-PDP), `lt-science-*`-Sections, die meisten `lt-hp-*`-Sections.
10. **Frontmatter-Konvention** (`status / last_review / canonical_for / supersedes`) auf allen lebenden Specs in `docs/` ausgerollt.
11. **Workspace-Cleanup 2026-07-10** bündelt veraltete Briefings, Prompts und Root-Level-Reste unter `docs/archive/` und trennt sie von aktiver Guidance.

---

## Offene To-Dos (priorisiert)

1. **GEO-014-Checkpoint vervollständigen:** Die verbleibenden 45 Zellen in Perplexity, Gemini
   und Google AI Mode messen; nächste geschlossene Tranche sind die 15 Perplexity-Prompts.
   Erst bei 60/60 gegen die Baseline auswerten.
2. **GEO-015 Science-/Legal-Review:** Die vollständige v3-Arbeitsfassung gegen Methoden- und
   Aussagegrenzen sowie §6 UWG prüfen. Preise, Verfügbarkeit und den deutschen TruDiagnostic-
   Checkout direkt vor Veröffentlichung erneut verifizieren; Labor/ISO bleibt keine
   Vergleichsachse.
3. **Produktbeschreibung-Propagation nachfassen:** Der kanonische Shopify-Produktendpunkt ist
   sauber; im öffentlichen HTML zeigen noch 2/12 Renderer die vorherige Beschreibung. Nach
   vollständigem Durchzug den Product Rich Results Test einmal neu dokumentieren.
4. **Optionale Product-Schema-Felder priorisieren:** `shippingDetails` und
   `hasMerchantReturnPolicy` ergänzen, wenn die verbindlichen Versand- und Retourenregeln als
   strukturierbare Quelle vorliegen.
5. **`lt-pdp-hero` auf `section-heading-crs`-Snippet umstellen.** Höchster Hebel: Section läuft auf jeder aktiven PDP, kalter Search-Traffic landet hier zuerst. Visuelles Resultat: Title und Subline werden ein Block, Subline nur via Opacity zurückgenommen.
6. **Homepage-Hotspots:** `lt-hp-problem-v2` und `lt-hp-trust-ticker` auf Snippet umstellen.
7. **`ss-*`-Sections:** entscheiden, ob refactoren oder als Combine-Theme-Erbe akzeptieren. Falls aktiv refactoren: mit `ss-video-slider` (höchste Nutzungsfrequenz) starten.
8. **NMN-Kapsel-PDP-Status klären:** Storefront zeigt `lifetime-nmn-kapseln` noch ACTIVE. Brand-Basis sagt phased-out. Storefront-Status synchronisieren.
9. **Template-Geister-File entscheiden:** `templates/product.legacy-13-2-nmn.json` referenziert
   eine Section, die in keinem Live-Produkt eingesetzt ist. Entweder aktivieren oder archivieren.

---

## Setup

| Feld | Wert |
|---|---|
| Theme | Combine v3.1.1 (KrownThemes), customized für LIFETIME |
| Aktive Theme-ID | `192529400183` (`lifetime-genesis-2026-APR`) |
| Shopify Shop | `lifetime-health-de.myshopify.com` |
| Domain | `lifetime-health.de` (.com leitet weiter) |
| Push-Tooling | Theme Manager.app (täglich genutzt) |
| Eintrittstür | `lifetime-health-theme/CLAUDE.md` → `AGENTS.md` |
| Heading-System | `assets/crs-section-headings.css` + `snippets/section-heading-crs.liquid` |
| Design-Rules | `docs/design-governance.md`, `docs/design-components.md`, `docs/section-heading-stack.md`, `.cursor/rules/shopify-rules.mdc`, `docs/pdp-system.md` |
| Visual Reference | `_examples/pdp-reference.html`, `_examples/sections/*.liquid` |

---

## Heading-Stack-Compliance (Stand 2026-05-08)

Stichprobe von 39 LT/CRS/SS-Sections in 33 Live-Templates, gegen `crs-heading-stack`-Pattern geprüft.

**Compliant (✓):**
crs-* (alle), lt-longevity-chapter, lt-comparison-table, lt-pdp-process-steps, lt-pdp-report-preview, lt-pdp-ideal-candidate, lt-science-hero, lt-science-hallmarks, lt-science-messebenen, lt-hp-science, lt-hp-video-authority, lt-hp-loop, lt-hp-product-hero, lt-hp-social-proof, lt-hp-journey.

**Drift (✗):**
lt-pdp-hero, lt-hp-problem-v2, lt-hp-trust-ticker, lt-science-bento, lt-guide-toc, alle ss-* (ss-video-slider, ss-flip-cards, ss-social-proof, ss-product-ingredients-2, ss-comparison-table-24, ss-flexible-tabs, ss-feature-1, ss-steps-5).

**Ignorier-Liste (Combine-Core, nicht LIFETIME-built):**
rich-text, text-columns-images, text-columns-icons, content-toggles, slideshow, info-tabs, flex-grid, custom-liquid, featured-collection, featured-product, marquee, blog-posts, contact-form, divider, video, scrolling-images, slider, media-with-text-overlay, promotion-cards, text-columns, product-recommendations.

---

## Änderungs-Log

### 2026-08-19 — /collections/all umgebaut, gemeinsame Produktkarte für Katalog und Register

**Neu:** `snippets/lt-product-card.liquid` + `assets/lt-product-card.css` (ein Feldsatz,
vier Varianten) und `sections/lt-katalog-index.liquid` (Slate-Leiste mit den echten
Kollektionen). `sections/lifetime-collection-grid.liquid` und
`sections/lt-collection-register.liquid` rendern jetzt dieselbe Karte.

**Behobene Defekte, alle vorher gemessen:**

| Befund | Messung vorher | Nachher |
|---|---|---|
| Badge unsichtbar | weiß auf weiß, Kontrast 1:1, 13 von 13 Karten | Slot gestrichen, Inhalt in Kicker/Nutzenzeile |
| Gepflegte Kurztitel wirkungslos | `product.title` stand vor `custom_title` | Kurztitel gewinnt |
| Mobile Wisch-Karussells | 5 Gruppen `overflow-x: auto`, 5 von 13 Produkten ohne Wischen sichtbar | kein horizontales Scrollen, alle 13 sichtbar |
| Preis ohne Hierarchie | 14px/500, so groß wie die Beschreibung | 32px Blatt, 20px Zeile, tabular |
| Aktionspreis kam nicht an | `compare_at_price` live gepflegt, nie gerendert; `compare_price_color` 13× tot | 349 € mit Streichpreis 449 € |
| NMN-Abo unsichtbar | nur „Ab 33,90 €" | zusätzlich „im Abo ab 28,90 €", aus `selling_plan_allocations` |
| Rating-Lesefehler | `reviews.rating.value` statt `.value.rating` | im Snippet, einmal statt zweimal |
| Bilder überdimensioniert | `image_tag` ohne `sizes` zog 1440px-Bilder in 80px-Felder | festes `<img>`, Quelle in doppelter Feldbreite |
| Geerbter Außenabstand | `container--vertical-space` gab 100px, gemessen 213px zwischen Zeile und Überschrift | 81px, die DESIGN.md-Kapitelrhythmik |
| Hero-Platzhalter | grauer Kasten, wenn kein Bild gesetzt ist | Spalte entfällt, Platzhalter nur im Theme-Editor |

**Copy-Korrektur (BJ):** Der H1 „Die Produkte, die wir selbst nehmen." stand über der
NMN-Karte mit „Nur zu Forschungszwecken" und dokumentierte damit den Konsum einer
Forschungsware. Jetzt „Die Produkte, hinter denen wir stehen." Aus demselben Grund
ersetzt die NMN-Nutzenzeile die Verbrauchsdauer („30 g reichen etwa zwei Monate")
durch „Drei Größen".

**Layout-Entscheid (BJ):** Die Nährstoffe sind ein Kachelraster statt einer Zeilenliste,
drei Spalten desktop, zwei bis zum schmalsten Telefon. In der Zeile war das stärkste
Element pro Produkt der Text; beim Umsehen erkennt man ein Präparat aber am Packshot.
Kostet Seitenlänge (desktop 4974 statt 3589px) und zwei kurze Schlussreihen.

**Struktur:** 7 Sections auf 4, Seite desktop von 5935px auf 4974px. Zwei Protagonisten
als Papierblätter (AGE&DNA mit echter Frist bis 30.08., NMN mit Abo-Preis), zehn Nährstoffe
als Register in drei Gruppen, Slate-Leiste mit neun Kollektionslinks am Fuß.
`templates/collection.json` hat `basisversorgung` im Register-Index bekommen (jetzt 12 Blöcke,
das Blocklimit).

**Verifikation:** Headless Chrome über CDP bei 1440 und 390 gegen eine unveröffentlichte
Theme-Kopie, weil der Shopify-CLI von diesem Rechner nicht erreichbar war
(`accounts.shopify.com` löst nicht auf, Token seit 09:09 UTC abgelaufen). Keine
Querscrollleiste auf beiden Breiten, CTA-Pillen 48px, Index-Links 52px, Bewertung 20px/700
in Deep Teal (Large-Text-Grenze), Bildquellen deterministisch.

**Register verworfen (BJ, gemessen).** `lt-collection-register.liquid` ist gelöscht.
GA4 90 Tage: die acht noch erreichbaren Kollektionsseiten kommen zusammen auf 72
Einstiege bei null Key Events, vier bekommen gar keinen, und auf der Startseite ist
`/collections/all` der einzige verlinkte Kollektionspfad. `lifetime-collection-grid` hat
stattdessen ein Setting `source: blocks | collection`; bei `collection` rendert sie
`collection.products` mit Kollektionstitel als H1, Beschreibung als Absatz, demselben
Kachelraster und derselben Karte. Plus Paginierung und Leerzustand. Eine Karte, ein
Raster, eine Section für den ganzen Shop.

**`show_subline: false` auf Kollektionsseiten.** Ohne kuratierte Zeile fällt die Karte auf
`product.description` zurück; gemessen ergab das Zeilen wie „NAD⁺ Booster
(Nicotinamid-Adenin-Dinukleotid) ist ein körpereigenes Molekül…". Bleibt aus, bis
`custom.tagline` gepflegt ist.

**Spec:** `docs/collection-all-spec.md`, Abweichungen in §8, Register-Entscheid in §9.


### 2026-08-17 — GEO-014 ChatGPT-Tranche vollständig

- AD-GEN-04 bis -15 in unabhängigen neuen ChatGPT-Chats ergänzt; damit ChatGPT 15/15.
- Zwischenstand des festen Vier-Systeme-Rasters: 15/60 Zellen, 0/15 LIFETIME-Nennungen und
  0/15 LIFETIME-Zitationen. Noch kein zulässiger Baseline-Vergleich.
- Report, Dashboard und nächster Check-in auf die Perplexity-Tranche synchronisiert.
- Auf Benedikts Seite bleiben null offene GEO-Aufgaben.

### 2026-08-14 — GEO-014-Checkpoint begonnen

- Fälligen identischen 15-Prompt-Lauf gestartet; Zielraster unverändert 15 Prompts × vier Systeme.
- ChatGPT AD-GEN-01 bis -03 archiviert: 3/60 Zellen abgeschlossen, 0/3 LIFETIME-Nennungen,
  0/3 LIFETIME-Zitationen. Noch kein valider Baseline-Vergleich.
- Technische Unterbrechung der Browsersteuerung dokumentiert; Fortsetzung ab AD-GEN-04 im
  nächsten Check-in. Kein Artefakt und keine Freigabe von Benedikt erforderlich.
- Zwischenstand: `docs/geo-prompt-checkpoint-2026-08-14.md`.

### 2026-08-11 — GEO-015 Wettbewerberdaten verifiziert

- Aktuelle Erstquellen für LIFETIME, epiAge, neotes, TruDiagnostic und Cerascreen geprüft.
- Kanonische Datenbasis `docs/age-dna-geo/competitor-data-2026-08-11.yml` angelegt: Preis,
  Verfügbarkeit, Probe, Methode, Ergebnisumfang, Bereitstellung und belastbare Einschränkungen.
- Primärtabelle auf vier bestellbare DNA-Methylierungstests begrenzt. Cerascreen ist weiter
  ausverkauft; TruDiagnostic bleibt als internationales USD-Angebot mit Checkout-Caveat markiert.
- Historischen Juli-Entwurf klar als nicht verbindliche Faktenquelle markiert und einen
  verifizierten Vergleichsstand ergänzt. Vollständige, unveröffentlichte v3 mit TL;DR,
  Vergleichstabelle, Use-Case-Empfehlungen, eigenen Grenzen, Disclosure, FAQ und Review-Checkliste
  unter `docs/age-dna-geo/money-piece-v3-2026-08-11.md` erstellt. Nächstes Gate ist das
  Science-/Legal-Review.
- Auf Benedikts Seite bleiben null offene GEO-Aufgaben.

### 2026-08-06 — Umfangszahlen durchgezogen: 187/16 raus, 23 Kategorien rein

- **Auslöser:** Portal-Audit vom selben Tag. BJ-Entscheid: „23 Kategorien" als Standard,
  „über 150 Einzelergebnisse" nur wo eine Mengenaussage nötig ist, nie eine exakte Reportzahl.
- **Reihenfolge:** erst 15 Sections, 2 Snippets und `assets/lt-doctor-quiz.js`, danach 10
  Templates. Templates bewusst zuletzt wegen Auto-Push des Theme Managers.
- **Schema-Defaults mitgezogen**, nicht nur Templates. Elf Sections trugen die Zahl im
  `default`, wo sie still greift, sobald ein Template das Setting weglässt.
- **Zwei Funde außerhalb des ursprünglichen Umfangs:**
  1. **Page-SEO-Metafelder** (`global.description_tag`) von `/pages/science` und
     `/pages/was-ist-enthalten` trugen die alten Zahlen. Liegen in Shopify, nicht im Repo,
     also im Grep unsichtbar, aber in Suchergebnissen und Social-Previews sichtbar. Korrigiert.
     Produkt-SEO und alle Collection-SEO-Felder waren sauber.
  2. **Das Kategorien-Grid auf `/pages/was-ist-enthalten`** zeigte 16 Karten unter einer H1,
     die jetzt 23 verspricht. Reine Präsentationsblöcke ohne Matching-Logik, deshalb auf die
     echten 23 Portal-Kategorien umgebaut. Beispiel-Reports bewusst ohne die gesperrten
     Krankheitsbilder gewählt; vorher standen dort Makuladegeneration, Katarakt,
     Offenwinkelglaukom, Typ-2-Diabetes und Vorhofflimmern.
- **Verifikation:** nicht nur Grep, sondern gerenderter Output eines lokalen
  `shopify theme dev` auf allen acht betroffenen Seiten. Vorher 60× „187" und 19× „16 Kategorien"
  live, nachher 0/0. Drei „187" pro Seite waren durchgehend Falschtreffer aus der
  Logo-Asset-Version `?v=1705418762`. `config/settings_data.json` blieb unverändert, die
  bekannte App-Embed-Löschung des Dev-Servers ist nicht passiert.
- **Bewusst nicht angefasst:** das 16er-Themenraster beider Quizzes. Die Slugs
  (`gesunde-alterung`, `sensitivitaeten` …) tragen rund 200 Matching-Referenzen in
  `lt-doctor-quiz.js` und `lt-quiz-v2.js`. Stattdessen sagt die Copy jetzt nirgends mehr,
  dieses Raster sei die Kategorienliste des Produkts. Offener Punkt dokumentiert in
  `docs/lifetime-doctor-quiz-spec.md`.
- **Lesson:** Ein Zahlen-Claim sitzt nicht nur im Text. Auf `/pages/was-ist-enthalten` war die
  Zahl zusätzlich als *Anzahl gerenderter Karten* codiert. Wer nur die Ziffer ersetzt, baut
  einen Widerspruch, den jeder Besucher nachzählen kann.

### 2026-07-30 — Letzten Owner-Punkt geschlossen

- BJ hat auch den verbleibenden Privacy-Punkt für den aktuellen Stand akzeptiert.
- Die konservative Datenschutz-Mindestfassung bleibt bestehen; zusätzliche Unterlagen werden
  erst bei einem neuen Datenschutzclaim oder einer tatsächlichen Prozessänderung benötigt.
- Auf Benedikts Seite stehen damit null offene GEO-Aufgaben. Der aktive Arbeitsfokus liegt
  vollständig auf GEO-015.

### 2026-07-30 — Evidence-Aufwand reduziert und Owner-Freigabe übernommen

- Owner-Bestätigung als ausreichenden Nachweis für internen Productumfang, App-Funktionen und
  aktuelle Reporttexte festgelegt; kein vollständiger 187/16/6-App-Export mehr erforderlich.
  **Diese Regel ist am 06.08.2026 an den Mengenangaben gescheitert und dort eingeschränkt worden.**
- BJ hat Productumfang, Schreibweisen, AI Health Coach, Face Scan und aktuelle Reportfassung
  vollständig freigegeben.
- Laborvertrag und ISO-Scope aus dem aktiven GEO-Backlog entfernt. Diese Nachweise werden nur
  wieder benötigt, wenn Labor/ISO als öffentlicher USP oder Vergleichsachse eingesetzt werden.
- GEO-015 ist dadurch nicht länger am allgemeinen Evidence-Paket blockiert. Aktiver nächster
  Schritt ist die aktuelle Verifikation der tatsächlich verwendeten Wettbewerberdaten.

### 2026-07-30 — GEO-Dashboard und Drei-Tage-Check-in eingerichtet

- Self-contained Übersicht unter `docs/geo-dashboard.html` gebaut: aktuelle Aufgaben auf
  Benedikts Seite, nächste Meilensteine, GEO-Baseline-KPIs, erreichte Punkte und Release-Gates.
- Responsive Darstellung und Aufgabenfilter im In-App-Browser auf Desktop und Mobile geprüft:
  keine Konsolenfehler und keine horizontale Überbreite.
- Heartbeat-Automatisierung `GEO Check-in` aktiviert. Sie läuft alle drei Tage um 09:00 Uhr,
  liest die kanonischen GEO-Dokumente, setzt sichere interne Schritte fort und benennt bei
  externen Blockern Owner, Artefakt und Akzeptanzkriterium.
- Automatisierung hält `docs/geo-dashboard.html` und dieses Statusdokument nach materiellen
  Änderungen synchron.

### 2026-07-30 — Product-Musterreports und App-Funktionsnachweis geprüft

- Neunseitigen MethylPace-PDF-Export und 21-seitigen genetischen Kategorienreport textuell sowie
  visuell geprüft; beide rendern vollständig.
- Der genetische Kategorienreport enthält acht benannte Einzelreports. Product bestätigt, dass
  jede DNA-Kategorie einen PDF-Report generieren kann.
- PDF-Export als Produktfunktion freigegeben; AI Health Coach und Face Scan funktionsseitig
  bestätigt, aber weiter an Legal- beziehungsweise Methodengates gebunden.
- Die Funktionsprüfung ist keine Inhaltsfreigabe: weitgehende Gesundheits-, Präzisions-,
  Krankheitsrisiko- und Handlungsempfehlungsformulierungen wurden als eigener Science-/Legal-
  Reviewblock aufgenommen.
- Die Original-PDFs enthalten Klarnamen und Geburtsdaten und wurden deshalb nicht ins Repository
  kopiert. Hashes und Evidenzgrenzen sind im Evidence Request Pack dokumentiert.
- Die Beispiele zählen nicht alle 187 DNA-Reports, 16 Kategorien oder sechs epigenetischen
  Bereiche nach. Der vollständige anonymisierte App-Index bleibt der letzte offene Product-Beleg.
  **Nachtrag 06.08.2026:** Die Nachzählung ist im Anbieter-Portal erfolgt und hat 187 und 16
  widerlegt. Offen bleibt nur noch die Kundensicht in der App.

### 2026-07-30 — GEO-014: neutraler AGE&DNA-Entscheidungshub live

- `/pages/biologisches-alter-testen` aus einem unveröffentlichten, veralteten
  Wettbewerbsvergleich in einen neutralen, zitierfähigen Methoden- und Auswahlhub umgebaut.
- Neue Section `lt-age-test-guide` plus eigenes Asset: direkte Antwort, vier Messmethoden,
  sechs Auswahlkriterien, transparente LIFETIME-Einordnung und fünf Primärquellen.
- Zwölf sichtbare FAQ-Antworten werden serverseitig gerendert und als `FAQPage` ausgegeben.
- Seite im Shopify-Admin veröffentlicht; Titel, Meta Description, Canonical, Sitemap,
  genau ein H1, strukturierte Daten, Desktop, Mobile und CTA-Links live geprüft.
- Bidirektionale interne Verlinkung mit `/pages/science`; weitere Übergänge zu Quiz und PDP.
- Der Anbieter-/Preisvergleich bleibt separat gesperrt, bis Datenstand und §6-UWG-Prüfung
  abgeschlossen sind. Erster identischer Generic-Prompt-Checkpoint: 13.08.2026.

### 2026-07-30 — GEO-P0 technisch abgenommen und Claim-Drift geschlossen

- Science-Title/-Description, Stack-Builder-Robots und die drei zuletzt angelegten Redirects auf
  je 12 öffentlichen Shopify-Renderern geprüft; alle Abrufe liefern den Sollstand.
- `/pages/longevity-coach` im bestehenden `custom-liquid`-Block um die H1
  „Kostenfreie Longevity-Beratung“ und eine kurze Einordnung ergänzt. Calendly blieb unverändert;
  Development, MAIN und öffentliche Ausgabe wurden visuell und im DOM geprüft.
- Aktive Google-Ads-Final-URL kontrolliert: Sie zeigt bereits direkt auf
  `/pages/quiz-age`; kein Redirect-Hop und deshalb keine Anzeigenänderung.
- Google Rich Results Test bestätigt zwölf gültige Elemente auf der AGE&DNA-PDP und zwei auf dem
  geprüften Artikel. Schema.org Validator meldet für den geprüften Code-Snippet null Fehler und
  null Warnungen. `shippingDetails` und `hasMerchantReturnPolicy` bleiben optionale Hinweise.
- Der externe Schema-Test legte eine alte Shopify-Produktbeschreibung mit klinischer und breiter
  ISO-Rahmung offen. Produktbeschreibung, aktives AGE-Quiz und Legacy-Routine-Template wurden
  konservativ korrigiert. Produkt-JSON ist 12/12 sauber; das HTML propagiert noch gemischt
  (10/12 neu, 2/12 gecacht alt).

### 2026-07-29 — GEO-P0-Waisenseiten konsolidiert

- Ein Crawl aller 81 aktuellen Sitemap-URLs und die Theme-Suche fanden keine eingehenden Links
  auf `/pages/agedna-details`, `/pages/agedna-details-epigenetik` oder `/pages/produkte`.
- Nach ausdrücklicher Freigabe alle drei Pages ausgeblendet und Redirects angelegt:
  `agedna-details` → `/pages/was-ist-enthalten`, `agedna-details-epigenetik` →
  `/pages/science`, `produkte` → `/collections/all`.
- Die Templates bleiben als wiederherstellbare Inhaltsquelle erhalten; es wurden keine
  Template-Dateien gelöscht.
- Die Page-Sitemap sank dadurch von 17 auf 14 und insgesamt von 19 auf 14 URLs. Die
  Redirect-Ressourcen sind im Admin bestätigt. Im jüngsten öffentlichen 12er-Sample lieferten
  `agedna-details` 1/12, `agedna-details-epigenetik` 8/12 und `produkte` 7/12 neue
  301-Antworten; die Renderer-Propagation läuft noch.

### 2026-07-29 — GEO-P0-Altseiten im Shopify-Admin bereinigt

- `/pages/testintern` nach expliziter Freigabe ausgeblendet; öffentliche URL liefert 404, bewusst
  ohne Redirect.
- `/pages/agedna-details-genetik` ausgeblendet und eine 301-Weiterleitung auf
  `/pages/was-ist-enthalten` angelegt.
- Redirect-Kette live geprüft: genau ein Hop, kanonisches Ziel liefert 200.
- Beide Seiten sind aus der Page-Sitemap entfernt; die Zahl veröffentlichter Page-URLs sank von
  19 auf 17.

### 2026-07-29 — GEO-P0-URL-Triage und Stack-Builder-Indexschutz

- Alle 82 URLs der öffentlichen Sitemaps erneut geprüft und neun Alt-, Utility- und
  Funktionsseiten in `docs/geo-p0-url-decision-list-2026-07-29.md` entschieden.
- `/pages/stack-builder` als aktive Funktionsseite bestätigt und im Theme-Sicherungsnetz um
  `noindex,follow` ergänzt.
- Die einzelne Layout-Änderung zuerst auf Development `193257111927`, dort im angemeldeten
  Storefront-Preview geprüft und anschließend auf MAIN `192529400183` ausgerollt.
- GSC-Trafficdaten konnten nicht ergänzt werden, weil der verfügbare Google-Account keinen
  Zugriff auf die Property `lifetime-health.de` besitzt.
- Der neue Robots-Tag ist in Development und im gespeicherten MAIN-Layout bestätigt. Öffentliche
  Shopify-Renderer liefern während der Propagation noch gemischte Head-Versionen.
- `/pages/testintern` und `/pages/agedna-details-genetik` wurden in diesem Schritt noch nicht
  entfernt; die nachfolgende Admin-Tranche dokumentiert die spätere explizite Freigabe.

### 2026-07-29 — GEO-P0-Metadaten im Shopify-Admin

- Einzigartige Meta Descriptions für `/pages/science`, `/pages/was-ist-enthalten`,
  `/pages/quiz-age`, `/pages/ueber-lifetime` und `/pages/longevity-coach` gespeichert.
- SEO-Title von `/pages/fueraerzte` auf
  `AGE & DNA-Test für Ärzte und Praxen | LIFETIME` gesetzt.
- Öffentliche HTML-Ausgabe geprüft: vier Descriptions und der Ärzte-Title rendern stabil korrekt.
  Für Science wurde zusätzlich der explizite SEO-Title `Biologisches Altern verstehen`
  gespeichert. Einzelne Shopify-Renderer übernehmen bereits Title und Description, andere zeigen
  weiter den alten Title mit doppelter Markenangabe; vollständige Propagation offen.

### 2026-07-29 — GEO-P0-Baseline, Development-Preview und MAIN-Release

**Was passiert ist:**

- Live-Sitemaps für Pages und Produkte auf H1, Title, Meta Description, Robots und Canonical
  gecrawlt; Detailbefund in `docs/geo-p0-technical-audit-2026-07-29.md`.
- Artikel-Breadcrumb auf `article.title` korrigiert und doppelte Markenangaben im globalen
  Title-Builder verhindert.
- AGE-Quiz und B2B-Ärzte-Quiz auf je eine semantische H1 korrigiert.
- Zweite H1 auf elf Supplement-PDPs entfernt, ohne die aktive `main-product`-Section oder ihre
  App-Blöcke zu deaktivieren.
- Interne Links von `/pages/whats-inside` auf `/pages/was-ist-enthalten` und das alte
  NMN-Preset-Ziel auf `/products/lifetime-nmn` korrigiert.
- `noindex,follow` als Theme-Sicherungsnetz für Test-, Leer-, Mailout- und
  Datenschutz-Anfrage-Seiten ergänzt.
- Änderungen auf Development-Theme `193257111927` gepusht und dort per DOM sowie visueller
  Stichprobe geprüft.
- Ausgewählte Dateien selektiv auf MAIN-Theme `192529400183` übertragen; bei Produkt-Templates
  wurden frische Live-Dateien als Basis verwendet, damit fremde lokale Abweichungen nicht
  mitgepusht werden.
- Öffentliche HTML-Auslieferung erneut geprüft: alle elf Supplement-PDPs haben genau eine H1,
  fünf Zielseiten senden `noindex,follow`, AGE-Quiz und Ärzte-Seite haben je eine H1, der
  Artikel-Breadcrumb nennt den Artikel und der AGE&DNA-PDP enthält keinen alten
  `/pages/whats-inside`-Link mehr.

**Was zu diesem Zeitpunkt bewusst noch nicht als erledigt markiert wurde:**

- Unerwünschte Pages standen bis zum späteren Admin-Cleanup weiter in der Sitemap.
- Page-Metadaten und der B2B-Title mussten noch im Shopify-Admin gepflegt werden.
- Google-Ads-Final-URL sowie Rich Results Test und Schema Validator sind noch offen.
- GEO-005 bis GEO-007 bleiben bis zur vollständigen Abnahme `in Arbeit`.

### 2026-05-08 — Heading-Stack-Snippet, Workspace-Cleanup, Frontmatter-Rollout

**Was passiert ist:**

- **Neues Snippet `snippets/section-heading-crs.liquid`** angelegt. Kapselt `crs-heading-stack` + `__pair`-Wrapper. API: `heading`, `subheading`, `kicker`, `align`, `on_dark`, `headline_lg`, `heading_tag`, `extra_class`, `modifier`. Strukturell unmöglich, den `__pair`-Wrapper zu vergessen.
- **Rule `docs/section-heading-stack.md` aktualisiert:** ✅-Variante ist jetzt das Snippet, Inline-HTML bleibt als Fallback für Spezialfälle.
- **`_examples/sections/{benefits,stat-callout,reviews,quote}.liquid`** auf `crs-heading-stack`-Pattern refaktorisiert. Quote bleibt bewusst ohne Heading. Illegal-leere Schema-Defaults (`"default": ""`) entfernt.
- **Live-Drift-Scan** mit Shopify-MCP: 33 aktive Templates identifiziert, 39 LT/CRS/SS-Sections gegen Pattern gecheckt → 14 Drift-Hotspots dokumentiert (siehe Tabelle oben).
- **Frontmatter-Konvention** auf 19 lebende Specs ausgerollt (`status: living | superseded | archived`).
- **Workspace-Cleanup:** veraltete Root-Level-Files, superseded Blueprints und One-off-Prompts nach `docs/archive/` verschoben; `_archive/` bleibt fuer code-/asset-bezogene Altstaende.

**Was bewusst nicht angefasst wurde:**

- **Kein Refactor an Live-Sections.** Snippet ist verfügbar, aber `lt-pdp-hero` und Co. wurden nicht angefasst — User wollte erst Struktur, dann Code.
- `templates/page.stack-builder.json` und `templates/product.legacy-13-2-nmn.json` blieben unverändert (nicht live, kein Drift-Impact).

**Nächste Session:**

- Entscheidung über `lt-pdp-hero`-Refactor (PDP-Hero auf jeder aktiven PDP).
- NMN-Kapsel-Storefront-Status checken.
