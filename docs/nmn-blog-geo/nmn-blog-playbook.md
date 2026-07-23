---
status: living
last_review: 2026-07-22
canonical_for: nmn-blog-geo-strategie
---

# NMN-Blog & GEO-Playbook (owned)

Kanonische Spec für den NMN-Blog-Cluster auf `/blogs/longevity-blog`, geschrieben für
KI-Empfehlungen (ChatGPT, Perplexity, Gemini, Google AI Overviews, Claude). Scope bewusst
eng: **nur was LIFETIME selbst in der Hand hat** — eigene Landingpage, eigener Blog,
Schema, Review-Ask, Messung. Off-Site-Outreach (fremde Listicles) ist hier nicht enthalten.

> **Rechtlicher Status dieses Dokuments:** Das Claim-Raster (§4) ist ein Arbeitsraster zur
> Struktur, **keine Rechtsberatung**. Weil LIFETIME NMN real verkauft (EU-Novel-Food-Exposure),
> muss mindestens der Legal-Wedge-Artikel + die Claim-Regeln **einmal von einem Lebensmittel-/
> Wettbewerbsrechtler abmahnsicher freigegeben** werden. Danach dient die Freigabe als Vorlage.

---

## 1. Ausgangslage (Baseline, Stand 2026-07-06)

- **AI-Crawler nicht geblockt:** `robots.txt` erlaubt GPTBot, OAI-SearchBot, PerplexityBot,
  ClaudeBot etc. → technische Voraussetzung erfüllt.
- **KI-Referral-Baseline (GA4 `LIFETIME_SHOP` / property 429510542, letzte 90 Tage):**
  ChatGPT 36 Sessions / 28 User / 1 Key-Event · Claude 1 Session · **Perplexity, Gemini,
  Copilot = 0.** Headroom groß, Perplexity/Gemini sind das leichteste Ziel (dort noch niemand besetzt).
- **Wettbewerbs-Set, das LLMs heute bei „beste NMN Deutschland" zitieren:** Naturecan, Nordic Oil,
  xonigen, supplements-for-longevity, Moleqlar, vitaoutlet + Aggregatoren (Klarna, medizinfuchs).
  LIFETIME taucht dort **nicht** auf.
- **Bestand:** Der NMN-Blog-Cluster existiert größtenteils schon (siehe §3) — Aufgabe ist
  **Upgrade + Ergänzung**, kein Greenfield.

**Ehrliche Decke:** „ChatGPT empfiehlt *immer* LIFETIME" ist nicht garantierbar. Realistisches
Ziel: in 3–6 Monaten von „unsichtbar" zu „konstant in der Shortlist", dann mit wachsender
Review-/Konsens-Masse Richtung „zuerst genannt".

---

## 2. Architektur: Hub-and-Spoke

- **Hub (kommerziell):** `/pages/nmn-deutschland` — **gebaut am 2026-07-22.** Shopify-Page `gid://shopify/Page/704389054839`, Template `templates/page.nmn-deutschland.json`. Stack: `lt-science-hero` → `rich-text` (Stand-Block) → `lt-benefits` (Qualitäts-Checkliste) → `crs-link-cards` (alle sechs Spokes) → `crs-faq-accordion` → `lt-hp-cta-close` (zur PDP). Positionierung: Der Novel-Food-Status wird offen ausgewiesen statt umschifft, das ist der Differenzierer gegenüber dem Wettbewerb und zugleich die einzige rechtlich saubere Variante.
- **Spokes (informativ):** Blog-Artikel auf `/blogs/longevity-blog`. Jeder beantwortet **eine**
  Frage, verlinkt auf den Hub + thematische Nachbar-Artikel + die PDP `/products/lifetime-nmn`.
- **Regel:** Hub fasst zusammen + verlinkt, geht **nicht** so tief wie die Spokes (sonst
  konkurriert der Hub mit den eigenen Artikeln).

---

## 3. Content-Map (Besitzer je Frage)

| Artikel | Ziel-Query (LLM-Frage) | Rolle | Bestand / Aktion |
|---|---|---|---|
| **Ist NMN in Deutschland legal?** | „ist nmn legal deutschland", „nmn novel food" | Legal-Wedge | **NEU — Prio 1** |
| NMN Qualität: Reinheit, CoA, Uthever | „beste nmn worauf achten", „nmn reinheit erkennen" | Buyer-Trust | Rewrite (`article.herstellung-und-qualitaet`) |
| **NMN Dosierung: wie viel pro Tag?** | „nmn dosierung", „wie viel nmn täglich" | Studien-Autorität | **NEU — Prio 2** |
| **NMN vs. NR (Nicotinamid Ribosid)** | „nmn oder nr", „nmn vs nr besser" | Vergleich (Tabelle) | **NEU — Prio 3** |
| Was ist NMN? | „was ist nmn", „nmn wirkung nad+" | Definition/Entität | Rewrite (`article.was-ist-nmn-nicotinamid`) |
| NMN Einnahme | „nmn einnahme wann", „nmn nüchtern" | How-to | Rewrite (`article.einnahme-von-nmn`) |
| NMN & Science | „nmn studien", „nmn nad+ forschung" | Tiefe / E-E-A-T | Rewrite (`article.nmn-und-science`) |
| **NMN Pulver oder Kapseln?** | „nmn pulver vs kapseln" | Format-Entscheidung | NEU — Prio 4 |

> **Quick-Win Link-Hygiene:** Die Alt-Artikel verlinken intern auf `/pages/nmn` (301 → PDP,
> Redirect-Hop). Beim Upgrade direkt auf `/products/lifetime-nmn` umbiegen.

---

## 4. Claim-Ampel — Was ihr sagen dürft

Kern: **NMN hat keine zugelassenen Health Claims** (EU-Register / VO 1924/2006). Jede
produktbezogene Gesundheits-Wirkaussage ist unzulässig. Erlaubt ist **Faktenwissen**, solange
Subjekt die Wissenschaft/das Molekül ist — nicht „unser Produkt bewirkt bei dir X".

### 🟢 Erlaubt (Fakten, keine Wirkversprechen)
- Was NMN chemisch/biologisch ist (Definition, NAD⁺-Vorstufe).
- Wie der NAD⁺-Stoffwechsel allgemein funktioniert (als Biologie erklärt).
- Was Studien **untersucht** haben, als Studienbericht: „In einer Studie mit 80 Teilnehmern
  wurde untersucht, ob …". Ergebnis nennen, nicht auf Leser/Produkt übertragen.
- Der **Rechtsstatus selbst** (Novel Food, EFSA, Verbraucherzentrale) — Meta-Information + Wedge.
- Qualitätskriterien: Reinheit %, CoA, HPLC, ISO-17025-Labor, Schwermetallgrenzwerte.
- In Studien **verwendete** Dosierungen als Studienfakt („Studien nutzten 250–500 mg/Tag"),
  nicht als Einnahmeempfehlung.
- **Zugelassene Nährstoff-Claims für enthaltene Vitamine** (Hebel): Niacin/Vitamin B3
  „trägt zu einem normalen Energiestoffwechsel bei" / „zur Verringerung von Müdigkeit und
  Ermüdung". Nur an B3 knüpfen (bei ausreichender Menge), **nicht** an NMN.

### 🟡 Grauzone (nur mit Reporting-Sprache + strikter Trennung Produkt/Bildung)
- Mechanismen beschreiben („NAD⁺ ist an der Energiegewinnung der Zelle beteiligt"), solange
  nicht implizit „→ deshalb macht unser NMN dich energiegeladener".
- Tier-/Zellstudien immer als solche kennzeichnen, nie auf Menschen/Produkt übertragen.
- „Longevity"/„Anti-Aging" als **Themenwort** ok; als Wirkversprechen fürs Produkt verboten.

### 🔴 Verboten
- Produktbezogene Wirkaussagen: „steigert Energie", „verlangsamt Alterung", „verbessert
  Zellregeneration", „stärkt Immunsystem".
- Krankheitsbezug (HWG): verhindert/lindert/heilt Alzheimer, Diabetes, Herzkrankheit,
  „Alterskrankheiten".
- „Jungbrunnen", „kehrt Alterung um", Vorher-Nachher.
- Testimonials/Kundenstimmen mit Gesundheitseffekten (gelten als Health Claims).
- Studienergebnis als Nutzerversprechen framen („so wirkt NMN bei dir").

### Safe-Phrasing-Technik (trägt alles)
Subjekt-Wechsel + Reporting-Verben. Subjekt ist immer das **Molekül / die Wissenschaft**,
nie das Produkt und nie „du".

> 🔴 „NMN steigert deine NAD⁺-Spiegel und gibt dir mehr Energie."
> 🟢 „NAD⁺ ist ein Coenzym im Energiestoffwechsel der Zelle. In Studien wurde untersucht, ob
>    die Einnahme von NMN den NAD⁺-Spiegel im Blut beeinflusst."

Dazu ein stehender Artikel-Hinweis als Snippet: „informativer Charakter, keine gesundheitsbezogene
Aussage im Sinne der VO 1924/2006".

---

## 5. Anti-Wiederholung

### 5a. Zwischen Artikeln — Themen-Besitz-Matrix
Jedes Sub-Thema gehört **genau einem** Artikel. Außerhalb des eigenen Besitz-Themas:
**max. ein Satz + interner Link, nie ein Absatz** („Erklär einmal, verlinke sonst").

| Sub-Thema | Besitzer-Artikel |
|---|---|
| Definition NMN / NAD⁺ | Was ist NMN |
| Rechtsstatus | Legal-Wedge |
| Dosierung (Studien) | Dosierungs-Artikel |
| Reinheit / CoA / Qualität | Qualitäts-Artikel |
| NMN vs. NR | Vergleichs-Artikel |
| Pulver vs. Kapseln | Format-Artikel |
| Einnahme / Timing | Einnahme-Artikel |
| Studienlage / Sicherheit | Science-Artikel |

Wirkt doppelt: verhindert Keyword-Kannibalisierung (kanonische URL pro Frage) **und** LLMs
deduplizieren — eine kanonische Erklärung + Verweise konzentrieren die Autorität, statt sie
über acht fast gleiche Absätze zu verwässern.

### 5b. Format-Differenzierung (je Artikel eine dominante Form)
Definition → Fließtext + Diagramm · Legal → Status-Box + Q&A · Dosierung → Studien-Tabelle ·
vs. NR → Vergleichstabelle · Qualität → Checkliste · Format → Entscheidungstabelle ·
Einnahme → Schritt-für-Schritt · Science → Studien-Timeline.

### 5c. Innerhalb eines Artikels — die drei Ebenen eskalieren, nicht wiederholen
- **TL;DR** = die Antwort (*was*).
- **Body** = Beleg, Nuance, *wie/warum* (neue Info).
- **„Das Wichtigste in Kürze"** = umsetzbare Konsequenz / nächster Schritt — **nicht** die
  TL;DR paraphrasiert. Wenn doch: streichen oder in Handlung umformulieren.

---

## 6. „Für KI geschrieben"-Baukasten (jeder Artikel gleich)

1. **TL;DR-Box ganz oben (40–60 Wörter):** beantwortet die Titelfrage in direkten,
   kopierbaren Sätzen. Kein Fließtext-Intro davor. (Der Block, den LLMs fast wörtlich zitieren.)
2. **Eine H2 = eine echte Frage**, wie Nutzer fragen. **Erster Satz darunter = die Antwort**,
   dann erst die Begründung.
3. **Fakten extrahierbar:** kurze Aussagesätze mit Zahl, Datum, Einheit.
4. **Genau eine Tabelle** pro Vergleichs-Artikel.
5. **Primärquellen zitieren** (EFSA, Verbraucherzentrale, PubMed-Studien mit Jahr).
6. **Benannter Autor + Reviewer + „aktualisiert am TT.MM.JJJJ"** im Artikel und im Schema.
7. **„Das Wichtigste in Kürze"-Bulletliste** (3–5 Punkte, siehe §5c).
8. **FAQ-Block** (3–6 Fragen) via `crs-faq-accordion` → FAQPage-Schema automatisch.
9. **Tonalität** nach `docs/conversion-messaging.md`: Du-Form, keine Heilaussagen, ein Claim
   pro Aussage, keine Em-Dashes / KI-Dreiklänge.

### Wiederverwendbare Snippets (nicht 8× per Hand schreiben)
TL;DR-Box · Autor-/Reviewer-Box · Rechts-Disclaimer · Mini-Definition „Was ist NAD⁺" (1 Satz).
Als `{% render %}`-Snippet → konsistent; kleine wiederkehrende Boilerplate ist kein
Duplicate-Content-Problem, solange der Hauptinhalt je Seite einzigartig ist.

---

## 7. Schema & Technik (owned, pro Artikel)

- **BlogPosting-Schema:** `author` (Person + Credentials), `datePublished`, `dateModified`,
  `publisher` (Organization).
- **FAQPage-Schema:** via `crs-faq-accordion` ins Artikel-Template. (Artikel-Templates sind
  section-basiert / OS 2.0 → technisch möglich.)
- **Interne Links** von `/pages/nmn` → `/products/lifetime-nmn` (Redirect-Hop killen).
- **`llms.txt`** im Root: kurze Marken-Definition + Liste der Kern-URLs (Hub + Spokes + PDP).
- **`dateModified`** bei jedem Rewrite hochsetzen (Frische-Signal).
- Bestehende globale Schemas (WebSite, Organization, BreadcrumbList) liegen in
  `snippets/microdata-schema.liquid` — nichts doppeln.

**Zu bauende/erweiternde Sections & Snippets:**
- Hub-Seite: Template `templates/page.nmn-deutschland.json` (Muster: `page.science.json`),
  Stack aus `lt-science-hero` → `rich-text` (Was ist NMN) → `rich-text` (Rechtslage) →
  `lt-benefits` (Qualitäts-Checkliste) → `lt-science-bento` (Studienlage) →
  `lt-comparison-table` (NMN vs. NR) → Autor-Section → `crs-faq-accordion` → `lt-hp-cta-close`.
- Autor-/Reviewer-Section aus `_examples/sections/expert-profile.liquid`.
- Alle Überschriften über `snippets/section-heading-crs.liquid` (H1 nur einmal im Hero).

---

## 8. Review- & Mess-Schleife (owned)

- **Review-Ask:** Post-Purchase-Mail Tag 14 + 30 → Trustpilot/Google. AggregateRating auf
  PDP + Hub anzeigen (füttert Review-Schema). Der Off-Site-Hebel, den LIFETIME selbst auslöst.
- **Prompt-Panel (monatlich):** ~15 fixe Prompts × 5 Engines („beste NMN Deutschland",
  „wo NMN kaufen", „ist NMN legal Deutschland", „NMN Pulver Testsieger" …). Protokollieren:
  wird LIFETIME genannt/verlinkt + welche Quellen sonst zitiert → das ist die Outreach-Zielliste.
- **GA4-AI-Referral-Report (monatlich):** `sessionSource` gefiltert auf
  `(?i)(chatgpt|openai|perplexity|gemini|copilot|claude|anthropic|you\.com|phind|poe)`,
  Metriken `sessions, totalUsers, keyEvents`, gegen die Baseline aus §1.
- **Crawler-Check:** Server-Logs auf GPTBot/OAI-SearchBot/PerplexityBot der neuen URLs.

---

## 9. Reihenfolge & Kadenz

Realistisch **1–2 Artikel/Woche**. Start mit maximalem Zitations-Hebel:
1. **Legal-Wedge-Artikel** („Ist NMN in Deutschland legal?") — besetzt die Frage vor dem Kauf,
   die alle LLMs hedgen. Dient als abmahnsicheres Muster (Rechtsprüfer-Freigabe).
2. **Hub-Seite** `/pages/nmn-deutschland` (answer-first + Spec-Block + Vergleichstabelle + FAQ).
3. **Qualitäts-Artikel** upgraden (Buyer-Trust).
4. Danach Dosierung → NMN vs. NR → Pulver/Kapseln → restliche Rewrites.

---

## 10. Offene Punkte / TODO

- [ ] Rechtsjuristische Freigabe des Claim-Rasters (§4) + Legal-Artikel (einmalig).
- [ ] Autor-/Reviewer-Person mit echten Credentials festlegen (E-E-A-T).
- [ ] Prüfen, ob genügend B3-Menge im Produkt für zugelassene Niacin-Claims (§4 🟢) vorliegt.
- [ ] Redaktionsplan-Dokument: je Artikel finale Titel, H2-Fragen, Besitz-Bereich, Grün-Formulierungs-Liste, 5 FAQ.
- [ ] `llms.txt` entwerfen.
- [ ] Prompt-Panel (15 Prompts) fixieren und Monats-Report aufsetzen.

---

## Verweise

- **Ausführungsebene NMN-KI-Sichtbarkeit: `nmn-ai-visibility-actionplan_2026-07-23.md`** (Workspace-Root).
  Enthält die Live-Prüfung vom 23.07.2026 (Schema, Feed, GA4, Ads) und drei Korrekturen zu diesem
  Playbook: der Blog-Cluster hat bisher **0 KI-Sessions**, die NMN-PDP dagegen 21, und die
  Vergleichsseiten, die LLMs bei „bestes NMN" lesen, sortieren nach €/Gramm, wo LIFETIME strukturell
  verliert. Der dort beschriebene Achsenwechsel (Rohstoffherkunft statt Preis) ist die Leitlinie
  für alle weiteren Artikel dieses Clusters.
- Wiederverwendbare Sections/Snippets: `_examples/README.md`, `snippets/section-heading-crs.liquid`,
  `sections/crs-faq-accordion.liquid` (FAQPage-Schema), `snippets/microdata-schema.liquid`.
- Messaging-Governance: `docs/conversion-messaging.md`.
- Slug/Template-Mapping: `docs/live-pages-map.md`.
- PDP-Kontext: `docs/pdp-system.md`, PDP live `/products/lifetime-nmn`.

---

## 11. Änderungen 2026-07-22

- **Hub gebaut** (siehe §2). Bis dahin existierte er nicht, der Cluster hing ohne kommerziellen Einstiegspunkt in der Luft.
- **Verlinkungslücke geschlossen:** Die NMN-PDP verlinkte auf **keinen** der sechs Spokes. Neue `crs-link-cards`-Instanz `nmn_wissen_cards` in `templates/product.13_nmn.json` hinter der FAQ, verweist auf Rechtslage, Qualitäts-Checkliste und Uthever.
- **Drei Artikel inhaltlich nachgeschärft** um die Fakten, die im deutschsprachigen Netz sonst fehlen: exaktes EFSA-Datum 13.05.2026, erwartetes Zulassungsfenster Okt. 2026 bis Anfang 2027, und **Artikel 26 (Datenschutz, fünf Jahre Exklusivität)**. Letzteres ist der eigentliche Informationsvorsprung: kein deutscher Wettbewerber behandelt es, und es ist zugleich LIFETIMEs Burggraben, weil der Uthever-Rohstoff der des Antragstellers ist.
- **Sichtbares Aktualisierungsdatum** in allen drei Artikeln (`<p><em>Zuletzt aktualisiert am …</em></p>` oben, Datum auch im Disclaimer).
- **Wöchentliche Routine** `nmn-novel-food-watch` (montags), prüft EFSA, Unionsliste, EUR-Lex, Antrag 2024-27111 und Fachpresse. Regel: **bei unveränderter Lage nichts anfassen**, kein Datum hochsetzen. Künstliche Frische wäre wertlos.

**Offen:** `nmn-qualitaet-erkennen`, `nmn-in-der-welt` und `nmn-vs-nr` verlinken noch nicht auf den Hub. Der Dosierungs-Artikel (Prio 2 laut §3) fehlt weiterhin.

**Traffic-Baseline vor den Änderungen** (GA4, 07.–21.07., 15 Tage nach Veröffentlichung): legal 10 Views / 7 Sessions · qualitaet 9/5 · nmn-vs-nr 9/5 · uthever 8/4 · welt 4/2 · verfahren 3/2. Gesamt rund 43 Views. Für neuen Content zu früh zum Urteilen, aber die fehlende Verlinkung war der strukturelle Grund.

