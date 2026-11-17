---
status: snapshot
last_review: 2026-07-30
canonical_for: geo-p0-technical-baseline-2026-07-29
depends_on:
  - docs/geo-action-plan.md
  - docs/live-pages-map.md
  - docs/geo-p0-url-decision-list-2026-07-29.md
---

# GEO P0 Technical Audit: 29.07.2026

Technische Baseline und Umsetzungsstand für GEO-005, GEO-006 und GEO-007. Der Live-Shop ist die
Quelle für den Ausgangszustand; die Änderungen wurden zuerst auf dem Development-Theme
`193257111927` und danach selektiv auf dem MAIN-Theme `192529400183` geprüft.

## Status

**GEO-005 bis GEO-007 sind seit dem Follow-up am 30.07.2026 technisch abgenommen.**

Die ausgewählten Theme-Dateien wurden am 29.07.2026 auf das MAIN-Theme übertragen. Um lokale,
thematisch fremde Template-Abweichungen nicht mit auszuliefern, basierten die Produkt-Template-
Uploads auf zuvor einzeln vom Live-Theme gelesenen Dateien und enthielten nur die vorgesehenen
GEO-Änderungen.

## Live-Baseline vor den Änderungen

### Page-Sitemap

| Messwert | Ergebnis |
|---|---:|
| veröffentlichte Page-URLs | 19 |
| Page-URLs ohne Meta Description | 13 |
| Page-URLs ohne sichtbare H1 | 6 |
| Page-URLs mit mehr als einer H1 | 0 |
| Page-URLs mit `noindex` | 0 |

Ohne Meta Description:

- `/pages/ueber-lifetime`
- `/pages/produkte`
- `/pages/agedna-details`
- `/pages/agedna-details-genetik`
- `/pages/agedna-details-epigenetik`
- `/pages/longevity-coach`
- `/pages/testintern`
- `/pages/science`
- `/pages/quiz-age`
- `/pages/was-ist-enthalten`
- `/pages/stack-2026-04`
- `/pages/stack-builder`
- `/pages/fueraerzte`

Ohne sichtbare H1:

- `/pages/produkte`
- `/pages/agedna-details`
- `/pages/agedna-details-epigenetik`
- `/pages/longevity-coach`
- `/pages/quiz-age`
- `/pages/fueraerzte`

### Product-Sitemap

Von 19 veröffentlichten Produkt-URLs hatten elf Supplement-PDPs zwei sichtbare H1:

- `/products/betain-tmg-kapseln`
- `/products/resveratrol-kapseln`
- `/products/caakg-kapseln`
- `/products/fisetin-kapseln`
- `/products/kreatin-monohydrat-pulver`
- `/products/spermidin-kapseln`
- `/products/vitamin-d3-k2-spray`
- `/products/schlafspray-mit-melatonin`
- `/products/astaxanthin-kapseln`
- `/products/hyaluron`
- `/products/vitamin-b-komplex-kapseln`

Ursache: `lt-pdp-hero` rendert die kanonische H1; die aktive Parkplatz-Section
`main_product_hidden` renderte zusätzlich ihren `title`-Block als zweite H1.

### Weitere bestätigte Befunde

- Der letzte Artikel-Eintrag im `BreadcrumbList` verwendete `blog.title` statt `article.title`.
- Der globale Title-Builder hängte den vollen Shopnamen auch an Titles an, die bereits
  „LIFETIME“ enthielten.
- AGE&DNA-PDP und AGE-Quiz verlinkten intern auf `/pages/whats-inside`, das erst auf
  `/pages/was-ist-enthalten` weiterleitet.
- Der Default-Preset von `lt-hp-supplements` verlinkte noch auf das tote
  `/products/nmn-pulver`.
- `/pages/testintern`, `/pages/agedna-details-genetik`, `/pages/stack-2026-04`,
  `/pages/dsgvo-datenschutzanfragen` und `/pages/personal-data-requests` waren indexierbar und
  standen in der Sitemap.
- `/pages/fueraerzte` hatte als Title nur den Handle „fueraerzte“.

## Im Code umgesetzt

### GEO-005: Index-Sicherungsnetz

`layout/theme.liquid` gibt für diese Handles `noindex,follow` aus:

- `testintern`
- `agedna-details-genetik`
- `stack-2026-04`
- `stack-builder`
- `dsgvo-datenschutzanfragen`
- `personal-data-requests`

Das ist ein Sicherheitsnetz, kein Ersatz für das Unpublishing oder die Konsolidierung im
Shopify-Admin. Solange eine Page veröffentlicht ist, kann Shopify sie weiter in die Sitemap
aufnehmen.

### GEO-006: Direkte interne Ziele

- AGE&DNA-PDP: `/pages/whats-inside` → `/pages/was-ist-enthalten`
- AGE-Quiz: `/pages/whats-inside` → `/pages/was-ist-enthalten`
- verwaistes altes Quiz-Template: denselben Link korrigiert
- `lt-hp-supplements`-Preset: `/products/nmn-pulver` → `/products/lifetime-nmn`

### GEO-007: Title, H1 und Breadcrumb

- letzter Artikel-Breadcrumb verwendet `article.title`
- Title-Builder hängt den Shopnamen nicht erneut an, wenn der bestehende Title bereits
  „LIFETIME“ enthält
- AGE-Quiz und B2B-Ärzte-Quiz rendern ihren Intro-Heading als H1
- auf den elf Supplement-PDPs bleibt der `title`-Block als Theme-Editor-Parkplatz erhalten,
  wurde aber aus `block_order` entfernt

## Release und QA

Development-Theme:

- ID: `193257111927`
- Name: `Development (cfde6f-Benedikt-Junker-I-LIFETIME)`

Live-Theme:

- ID: `192529400183`
- Name: `lifetime-genesis-2026-APR`
- Rolle laut Shopify CLI nach dem Push: `live`

Geprüfte Ergebnisse:

| Prüfung | Ergebnis |
|---|---|
| JSON-Parsing der 14 geänderten Templates | bestanden |
| `git diff --check` | bestanden |
| Shopify Theme Check | bestanden |
| Homepage-Title mit nur einer Markenangabe | bestanden |
| AGE-Quiz mit genau einer H1 | bestanden |
| B2B-Ärzte-Quiz mit genau einer H1 | bestanden |
| elf betroffene Supplement-PDPs mit genau einer H1 | bestanden |
| fünf Zielseiten mit `noindex,follow` | bestanden |
| `stack-builder` im Development-Preview mit `noindex,follow` und gerendertem Builder | bestanden |
| `stack-builder` im gespeicherten MAIN-Layout | bestanden |
| `stack-builder` auf allen öffentlichen Shopify-Renderern | bestanden, 12/12 |
| `layout/theme.liquid` ohne Theme-Check-Offense | bestanden |
| Artikel-Breadcrumb mit Artikelname | bestanden |
| AGE&DNA-PDP ohne Link auf `/pages/whats-inside` | bestanden |
| AGE&DNA-PDP mit direktem Link auf `/pages/was-ist-enthalten` | bestanden |

Für die inkrementelle Stack-Builder-Änderung hat `layout/theme.liquid` keine Theme-Check-Offense.
Der vollständige aktuelle Repository-Check endet wegen bereits vorhandener Fehler in anderen
Sections mit Status 1; diese Befunde gehören nicht zu dieser Layout-Änderung.

Die Development-Preview wurde im angemeldeten Browser geprüft; die Preview-Bar bestätigte das
Development-Theme. Der externe `preview_theme_id` allein ist nicht als QA-Nachweis geeignet, weil
Shopify ihn ohne Preview-Session auf das Live-Theme zurückleitet.

Nach dem selektiven MAIN-Push wurde das öffentliche HTML auf `www.lifetime-health.de` erneut
abgerufen. Live bestätigt sind:

- Homepage-Title ohne doppelte Markenangabe
- genau eine H1 auf AGE-Quiz und B2B-Ärzte-Seite
- genau eine H1 auf allen elf betroffenen Supplement-PDPs
- `noindex,follow` stabil auf den fünf ursprünglichen Zielseiten
- `noindex,follow` für `/pages/stack-builder` auf Development, im MAIN-Quellstand und auf
  12/12 öffentlichen Renderern
- Artikelname als letzter Eintrag im gerenderten `BreadcrumbList`
- kein Link auf `/pages/whats-inside` mehr auf dem AGE&DNA-PDP
- zwei direkte Vorkommen von `/pages/was-ist-enthalten` auf dem AGE&DNA-PDP

## Follow-up und technische Abnahme am 30.07.2026

### Shopify-Admin und Index-Hygiene

Am 29.07.2026 nach expliziter Freigabe erledigt:

- `/pages/testintern` ausgeblendet; die URL liefert 404 und besitzt bewusst keinen Redirect.
- `/pages/agedna-details-genetik` ausgeblendet; die URL leitet einmal per 301 auf
  `/pages/was-ist-enthalten`, das Ziel liefert 200.
- `/pages/agedna-details` ausgeblendet und auf `/pages/was-ist-enthalten` weitergeleitet.
- `/pages/agedna-details-epigenetik` ausgeblendet und auf `/pages/science` weitergeleitet.
- `/pages/produkte` ausgeblendet und auf `/collections/all` weitergeleitet.
- Alle fünf URLs sind aus der Page-Sitemap entfernt; sie enthält nun 14 statt ursprünglich
  19 URLs.

Die vollständige Befund- und Entscheidungsmatrix steht in
`docs/geo-p0-url-decision-list-2026-07-29.md`. Der verfügbare Google-Account besitzt keinen
Zugriff auf die Search-Console-Property `lifetime-health.de`. Vor der letzten Konsolidierung
fanden ein Crawl aller 81 aktuellen Sitemap-URLs und die Theme-Suche keine eingehenden Links
auf die drei Waisenseiten. Der Nutzer gab die Konsolidierung trotz fehlender GSC-Daten
ausdrücklich frei; die Templates bleiben als wiederherstellbare Inhaltsquelle erhalten.

Am 30.07. lieferten alle drei zuletzt angelegten Redirects in jeweils 12/12 öffentlichen
Abrufen den Sollstand:

- `/pages/agedna-details` → 301 auf `/pages/was-ist-enthalten`
- `/pages/agedna-details-epigenetik` → 301 auf `/pages/science`
- `/pages/produkte` → 301 auf `/collections/all`

### Redaktionelle Metadaten

Am 29.07.2026 im Shopify-Admin gespeichert:

- `/pages/science`
- `/pages/was-ist-enthalten`
- `/pages/quiz-age`
- `/pages/ueber-lifetime`
- `/pages/longevity-coach`

Der SEO-Title von `/pages/fueraerzte` wurde auf
`AGE & DNA-Test für Ärzte und Praxen | LIFETIME` gesetzt.

Die Live-HTML-Prüfung bestätigt alle fünf Descriptions und den Ärzte-Title. Für
`/pages/science` wurde zusätzlich der explizite SEO-Title `Biologisches Altern verstehen`
gespeichert; Title und Description rendern am 30.07. in 12/12 öffentlichen Abrufen korrekt.
Metadaten werden nicht als Theme-Fallback erfunden, sondern an der kanonischen Shopify-Page
gepflegt.

### Longevity-Coach

Im vorhandenen `custom-liquid`-Block wurden ergänzt:

- H1: `Kostenfreie Longevity-Beratung`
- Subline: `Buche ein persönliches Videogespräch und kläre deine Fragen zu Tests, Ergebnissen und deinen nächsten Schritten.`

Das Calendly-Inline-Widget blieb unverändert. Geprüft wurden Development-Preview, MAIN-Abgleich,
genau eine H1, die vollständig geladene Buchungsoberfläche und 12/12 öffentliche Renderer.

### Externe Systeme

- Die aktive Google-Ads-Final-URL lautet bereits
  `https://www.lifetime-health.de/pages/quiz-age`; kein Redirect-Hop, keine Änderung nötig.
- Google Rich Results Test für die AGE&DNA-PDP: 12 gültige Elemente, darunter Product,
  Merchant Listing, Breadcrumb und neun Review Snippets. Die Hinweise zu `shippingDetails` und
  `hasMerchantReturnPolicy` sind nicht kritisch.
- Google Rich Results Test für den geprüften Blogartikel: zwei gültige Elemente; der letzte
  Breadcrumb nennt korrekt den Artikeltitel.
- Schema.org Validator mit dem Live-Code-Snippet: drei Elemente, null Fehler, null Warnungen.

### Durch den Schema-Test gefundener Claim-Drift

Die strukturierte Produktbeschreibung kam nicht aus dem Theme-Template, sondern aus dem
Shopify-Produktkörper, den `product | structured_data` übernimmt. Dort standen noch die
entfernten Aussagen zu klinischen Standards sowie ISO 9001/13485.

Am 30.07. wurde die kanonische Produktbeschreibung im Shopify-Admin auf eine konservative
Beschreibung von Umfang, Ablauf und Diagnose-Abgrenzung umgestellt. Zusätzlich wurde
„nach klinischen Standards“ aus dem aktiven AGE-Quiz und dem erhaltenen Legacy-Routine-Template
entfernt. Der Produkt-JSON-Endpunkt liefert in 12/12 Abrufen den neuen Stand; im öffentlichen
HTML sind derzeit 10/12 Renderer neu und 2/12 noch gecacht alt. Das ist der einzige verbliebene
Propagation-Nachlauf und ändert die technische Abnahme der GEO-005 bis GEO-007 nicht.

## Abnahmegrenze

GEO-005 bis GEO-007 sind technisch abgeschlossen:

- Science-Metadaten und Stack-Builder-Robots: 12/12
- drei Waisenseiten-Redirects: jeweils 12/12
- aktive Google-Ads-Final-URL: direkt
- Rich Results Test und Schema Validator: dokumentiert
- priorisierte Pages: genau eine sichtbare H1

Der nächste P0-Block ist nicht mehr technische Crawl-Hygiene, sondern die Evidenzfreigabe der
sichtbaren AGE&DNA-Claims gemäß Claim Ledger.
