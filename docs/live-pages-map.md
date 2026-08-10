---
status: living
last_review: 2026-08-06
canonical_for: live-page-slug-to-template-mapping
---

# Live-Pages-Map

Slug → Template → Haupt-Section. Damit man bei Live-Bezug ("die Quiz-Seite", "die Ergebnis-Seite") direkt den richtigen Code findet, statt durch Liquid-File-Namen zu raten.

Bei Drift: Live gewinnt. Hier nachpflegen, sobald ein Mapping sich ändert.

> **Live-Verifikation 2026-07-28.** Grundlage ist `sitemap_pages_1.xml`, nicht die Datei-Namen
> in `templates/`. Jeder Slug wurde per `curl` abgerufen und drei Dinge gemessen: HTTP-Status
> plus Redirect-Ziel, die `id="shopify-section-template--<id>__<key>"` im gerenderten HTML
> gegen die `order` des Template-JSON, und die Wortzahl **nur innerhalb der Template-Sections**
> (Header, Footer, Popups und die Menü-Schublade zählen nicht mit, sonst tragen leere Seiten
> scheinbar 50 Wörter). Seiten mit identischer `template--<id>` laufen auf demselben Template;
> so ist der Default `page.json` von einem eigenen Suffix zu unterscheiden.
>
> Dabei sind drei Fehlerklassen aufgefallen, alle unten eingearbeitet: falsche Slugs
> (das Doc führte Weiterleitungen als aktive Seiten), fehlende Live-Seiten mit Substanz
> (vier Seiten mit zusammen über 3.000 Wörtern standen nirgends), und eine Archivnotiz,
> die eine inzwischen live gegangene Seite noch als „nicht live" führte.
>
> **Cleanup 2026-07-29:** Fünf Alt- und Waisenseiten wurden ausgeblendet und aus der
> Page-Sitemap entfernt; sie sank von 19 auf 14 URLs. `testintern` liefert bewusst 404.
> Die vier übrigen Quellen besitzen die unten dokumentierten Redirect-Ziele. Die drei zuletzt
> angelegten Redirects wurden am 30.07. auf je 12/12 öffentlichen Abrufen bestätigt.
>
> **GEO-Hub 2026-07-30:** `/pages/biologisches-alter-testen` wurde veröffentlicht und ist in
> der Page-Sitemap enthalten. Damit umfasst sie wieder 15 URLs. Der Hub ist aus
> `/pages/science` verlinkt und verlinkt zurück zu Science sowie weiter zu Quiz und PDP.

## Quiz

| Live-Slug | Internes Label / Menü | Template-Datei | Haupt-Section | Result-Markup |
|---|---|---|---|---|
| `/pages/quiz-age` | **AGE Quiz** (Menü „AGE Quiz") | `templates/page.quiz-age.json` | `sections/lt-pdp-quiz-v2.liquid` | `snippets/lt-quiz-result.liquid` |
| `/pages/quiz-age?view=quiz-age-lp` | **AGE Quiz Ads-LP** (Ziel der Google-Ads-Kampagne 01, nicht im Menü) | `templates/page.quiz-age-lp.json` | identisch zu `page.quiz-age.json` | `snippets/lt-quiz-result.liquid` |
| `/pages/dein-longevity-plan` | **Longevity-Plan** (Report-Seite des Quiz-Funnels, nicht im Menü) | `templates/page.dein-longevity-plan.json` | `lt-longevity-plan` → `lt-hp-video-authority` → `lt-hp-cta-close` | – |

> **Zwei Quiz-Templates seit 2026-08-10:** `page.quiz-age.json` rendert wieder mit normalem
> Header/Footer (`theme.liquid`) für Site-Besucher über den Menüpunkt „AGE Quiz".
> `page.quiz-age-lp.json` ist die inhaltsgleiche Kopie mit `"layout": "theme.quiz-lp"`
> (schlanke Topbar ohne Navigation) für Ads-Traffic, erreichbar über `?view=quiz-age-lp`.
> **Pflegeregel:** Section-Änderungen an der Quiz-Seite müssen in beiden JSON-Templates
> nachgezogen werden.

> **Longevity-Plan, Stand 2026-08-07: live.** Shopify-Seite existiert (Handle
> `dein-longevity-plan`, Template-Suffix `dein-longevity-plan`, published, Seitentitel
> „Dein Longevity-Plan"). Die Seite ist Ziel jeder Mail der Quiz-Sequenz und personalisiert
> sich über URL-Parameter (`?t1=…&t2=…&t3=…&ba=…&ca=…`), ohne Parameter rendert eine generische
> Fassung. Kontext und Handschritte: `lifetime-klaviyo/quiz-anschluss-status.md`.
>
> Nur die erste Section ist neu. `lt-hp-video-authority` ist dieselbe Section wie auf
> `/pages/quiz-age` („Warum Pauschal-Routinen scheitern"), `lt-hp-cta-close` Bestand von der
> Startseite. Letztere hat am 2026-08-07 vier optionale Feldgruppen bekommen — Bildspalte,
> drei Argumente mit Haken, kuratierte Loox-Kundenstimmen und einen Autoritäts-Badge. Alle vier
> sind leer wirkungslos, Startseite, NMN- und Alterstest-Seite rendern unverändert.
>
> **Die Kundenstimmen kommen aus dem echten Loox-Metafeld**, nicht aus gepflegten Textbausteinen:
> `reviews_handle` bestimmt das Produkt, `reviews_pick` die Auswahl (eine Zeile je Bewertung,
> ein eindeutiger Textanfang, Reihenfolge = Anzeigereihenfolge). Nie Sterne oder ein
> Verifiziert-Badge je Karte, beides steht nicht in den Daten — gleiche Regel wie im Loox-Zweig
> von `crs-customer-reviews`. Hintergrund und die aussortierten Bewertungen:
> `lifetime-klaviyo/quiz-anschluss-status.md` § Kundenstimmen.
> **Nicht** `lt-pdp-final-cta` verwenden: die Section ist per `enabled_on` auf Produkt-Templates
> beschränkt und wird auf Page-Templates mit einem Fehler abgelehnt.
>
> **`lt-science-bento` ist am 07.08. abends von dieser Seite geflogen** (BJ: der Abschluss muss
> zum Kauf bewegen und schaffte das nicht). Die drei Aussagen des Bentos stecken jetzt als
> Argumente bzw. als Headline im Abschluss-Block, das Mood-Foto steht als Bildspalte daneben.
> Zwei dunkle Sections hintereinander sind damit eine.

**Geteilte Datenquelle:** `assets/lt-quiz-needs.js` hält die zehn Quiz-Themen (Gen-Marker,
Themen-Analyse, Hebel, Test-Brücke) und wird von Quiz **und** Report-Seite geladen, jeweils per
`defer` VOR der eigentlichen Section-JS. Wer dort etwas ändert, ändert beide Seiten.

**Geteiltes Aussehen (seit 2026-08-07):** `assets/lt-quiz-result-shared.css` hält Bio-Alter-Karte,
Themen-Karte, Gen-Marker, Primär-CTA und Sticky-CTA. Geladen von `lt-pdp-quiz-v2`,
`lt-doctor-quiz` und `lt-longevity-plan`, **immer vor** der jeweiligen Section-CSS, damit
deren Overrides weiter gewinnen. Vorher lagen diese Regeln nur in
`section-lt-pdp-quiz-v2.css`, während die Report-Seite eigene `.lt-plan__*`-Regeln mitbrachte —
dieselben Inhalte, zwei Designs. **Wer das Aussehen der Karten ändert, ändert die geteilte
Datei, nicht eine der beiden Seiten.** Der Sperr-Zustand (Weichzeichner, Schloss, Textkürzung)
gilt nur ohne `.is-unlocked`; die Report-Seite setzt die Klasse und zeigt alles vollständig.

> **Ads-Final-URL verifiziert (2026-07-30):** Die aktive Responsive Search Ad verwendet direkt
> `https://www.lifetime-health.de/pages/quiz-age`. Der frühere Redirect-Hop über
> `/pages/biologischer-alterstest-dna` besteht im aktiven Anzeigenpfad nicht mehr. Historischer
> Befund: `docs/mobile-lp-audit-2026-06-04.md` (F1).

**Quiz-Snippets** (alle eingebunden von `lt-pdp-quiz-v2`):
- `snippets/lt-quiz-question-age.liquid`
- `snippets/lt-quiz-question-cards.liquid`
- `snippets/lt-quiz-question-multi.liquid`
- `snippets/lt-quiz-question-slider.liquid`
- `snippets/lt-quiz-loading.liquid`
- `snippets/lt-quiz-result.liquid`

**Quiz-Assets**: `assets/lt-quiz-needs.js` (Themen-Daten, zuerst laden), `assets/lt-quiz-v2.js`, `assets/lt-quiz-result-shared.css` (zuerst laden), `assets/section-lt-pdp-quiz-v2.css`

**Longevity-Plan-Assets**: `assets/lt-quiz-needs.js` (dieselbe Datei), `assets/lt-longevity-plan.js`, `assets/lt-quiz-result-shared.css` (dieselbe Datei), `assets/section-lt-longevity-plan.css`

## Kanonisches Fundament (die 5 SoT-Live-Seiten)

Diese 5 Seiten sind das Fundament (siehe `CLAUDE.md` § Kanonisches Fundament). Alle live verifiziert 2026-06-15 (HTTP 200):

| # | Live-URL | Template | Haupt-Section(s) |
|---|---|---|---|
| 1 | `/` (Startseite) | `templates/index.json` | Homepage-Stack (`lt-hp-*`) |
| 2 | `/products/lifetime-age-dna` (AGE&DNA-Test, €349) | `templates/product.age-dna-test.json` | PDP-Stack (`lt-pdp-*`) |
| 3 | `/pages/science` | `templates/page.science.json` | `lt-science-proof-hero` → `lt-science-split` (warum) → `lt-benefits` → `lt-science-split` (epigenetik) → `lt-science-split` (genetik) → `lt-hp-science` → `lt-science-bento` → `lt-science-scope` → `crs-risk-free-close` → `crs-faq-accordion` → `crs-link-cards` |
| 4 | `/pages/quiz-age` | `templates/page.quiz-age.json` | `sections/lt-pdp-quiz-v2.liquid` |
| 5 | `/products/lifetime-nmn` (NMN Pulver) | `templates/product.nmn-pulver.json` | PDP-Stack |

> **Hero-Bildmaß vereinheitlicht (2026-07-30):** `lt-science-proof-hero` trägt jetzt dasselbe
> Bildmaß wie `lt-science-hero` (Kollektions-Hero): Raster `3fr 2fr` statt `6fr 5fr`,
> Bildfläche `aspect-ratio: 3 / 2` statt `4 / 5`. Im 1200er Container ergibt das ~435 × 290 px.
> Betroffen sind beide Nutzer der Section, `/pages/science` (Foto Limmroth) und
> `/pages/biologisches-alter-testen`. Zwei neue Settings: `image_asset` (Theme-Asset-Dateiname
> oder URL, Vorrang vor dem Bild-Picker, nötig weil SVGs nicht im Bild-Picker auftauchen) und
> `media_fit` (`cover` für Fotos, `contain` für Infografiken). Default bleibt `cover`, für
> `/pages/science` ändert sich dadurch nichts außer dem Format.
> **Neues Asset:** `assets/age-test-zwei-zahlen.svg` (Quelle `docs/svg-src/`), der Hero der
> Ratgeberseite. Bewusst nicht-technisch: Kalenderalter gegen biologisches Alter als zwei
> Zahlen, Beispielwerte ausdrücklich gekennzeichnet. Zwei verworfene Entwürfe (Punktdiagramm
> der vier Verfahren, DNA-Methylierungsmuster) waren zu diagrammartig bzw. zu technisch und
> sind gelöscht, nicht archiviert.
>
> **Umbau `/pages/science` auf Wissenschaft-zuerst (2026-07-29):** Die Seite erzählt jetzt
> zuerst die Wissenschaft und setzt den Test als Schlussfolgerung. Briefing:
> `docs/briefing-science-umbau.md` (§7 dort ist **nicht** der Live-Stand, siehe
> Abweichungs-Liste am Ende des Briefings). Neue Reihenfolge: Hero → warum (Healthspan-Lücke)
> → kombination (zwei Karten) → epigenetik → genetik → grundlage + validierung (die eine
> dunkle Strecke) → umfang → cta → faq → mehr. `lt-science-split` läuft dreimal,
> `lt-benefits` wurde von „Drei Ergebnisse" auf „Zwei Analysen, eine Probe" umbelegt.
> Die mittige Kauf-CTA ist entfallen, es gibt nur noch den Abschluss-CTA.
> **Zwei neue Assets:** `assets/science-epigenetik-alter.svg`, `assets/science-genetik-anlagen.svg`
> (beide auf viewBox-Breite 620 gezeichnet, Referenzmaß von `science-healthspan-luecke.svg`,
> sonst sind die Beschriftungen mobil unlesbar).
> **`assets/section-lt-benefits.css` geändert:** `grid-template-columns` von `repeat(3, 1fr)`
> auf `repeat(auto-fit, minmax(280px, 1fr))`, damit zwei Karten die Zeile füllen. Bei 3 und 4
> Blöcken rechnerisch identisch, `/pages/ueber-lifetime` und `/pages/nmn-deutschland` unberührt.
>
> **Neubau `/pages/science` als Beweisseite (2026-07-28):** Die Seite ist von einer
> Wissensseite über Longevity auf eine Beweisseite für den AGE & DNA-Test umgestellt,
> Slug und Menü-Karte bleiben unverändert (Briefing: `docs/briefing-science-hub.md`).
> Neu gebaut wurden zwei Sections: `lt-science-proof-hero` (Hero mit Produktbezug,
> CTA und echtem App-Ausschnitt) und `lt-science-scope` (Zahlkachel, seit 06.08.2026
> „23 DNA-Kategorien" statt der widerlegten 187, helle Fläche
> mit Link auf die Reports-Seite). `lt-stat-callout` kam dafür nicht in Frage, es ist
> laut eigener Build-Spec fest auf die dunkle Fläche gesetzt und bewusst ohne CTA.
> `crs-risk-free-close` hat einen **optionalen** Zweit-CTA bekommen (`cta_2_label` /
> `cta_2_url`, hier das Quiz); ohne Label ändert sich für die beiden PDPs und
> `/pages/was-ist-enthalten` nichts. Der Preis steht bewusst erst im Abschluss-Block.
> Nur **eine** dunkle Fläche auf der Seite (`lt-hp-science`), keine Sprungnavigation.
> **Der Hallmarks-Block ist von dieser Seite verschwunden** und wird zum Blogartikel,
> Rohstoff dafür: `docs/hallmarks-of-aging-body.html` + `docs/svg-src/hallmarks-zwoelf-gruppen.svg`
> + `docs/cover-hallmarks-of-aging.png`. `sections/lt-science-hallmarks.liquid` bleibt
> im Theme, wird aber von keinem Template mehr referenziert.
>
> **System-1-Umbau `/pages/science` (2026-07-27, überholt durch den Neubau oben):** sichtbarer Text von 1.166 auf 325
> Wörter, ohne dass ein Erklärtext gelöscht wurde — die 12 Hallmark-Bodies stecken
> weiter im Accordion, die sechs Quellen-Erklärungen weiter in den `<dialog>`-Popups,
> beide serverseitig gerendert. Die Kategorie-Kacheln zeigen jetzt Nummernbereiche
> (01–05 / 06–08 / 09–12), berechnet aus den Blockzählungen, nicht gepflegt.
> Die Messebenen laufen als Wortkarten (`layout_variant: cards`, HEUTE / IMMER / JAHRE).
> **In `lt-hp-science` sind die beiden `science_pillar`-Blöcke entfallen**, übrig ist die
> Expert-Karte allein (`sci__grid--single`), der CTA zeigt jetzt auf `/pages/aerzte`.
> Der Sekundär-CTA am Seitenende zeigt auf `/pages/quiz-age` statt auf den toten Slug
> `/pages/meine-routine`. Begründungen: `docs/briefing-system1-science-aerzte.md`.
>
> **Slug-Drift behoben (2026-06-15):** Der NMN-PDP-Slug ist live `/products/lifetime-nmn` (HTTP 200).
> Der früher hier geführte `/products/nmn-pulver` ist **404** (tot). Falls Google-Ads-Final-URLs oder
> interne Links noch auf `nmn-pulver` zeigen, umstellen.

## PDPs (aktive Produkte)

| Live-URL | Template | Haupt-Section(s) |
|---|---|---|
| `/products/lifetime-age-dna` (AGE&DNA-Test, €349) | `templates/product.age-dna-test.json` | PDP-Stack (`lt-pdp-*`) |
| `/products/lifetime-nmn` (NMN Pulver) | `templates/product.nmn-pulver.json` | PDP-Stack |

## Sonstige aktive Pages

Vollständige Liste aus `sitemap_pages_1.xml`, jede Zeile am 2026-07-28 einzeln per `curl`
geprüft. „Wörter" = sichtbarer Text der Template-Sections, ohne Header/Footer/Popups.

### Seiten mit Inhalt

| Live-Slug | Template (Suffix) | Sections live | Wörter | Notiz |
|---|---|---|---|---|
| `/pages/biologisches-alter-testen` | `page.biologisches-alter-testen.json` | `lt-science-proof-hero` → `lt-age-test-guide` → `crs-faq-accordion` → `lt-hp-cta-close` | ca. 1.154 | Neutraler GEO-Entscheidungshub zu Methoden, Aussagegrenzen und Auswahlkriterien. Fünf Primärquellen, zwölf sichtbare FAQ-Antworten mit `FAQPage`, transparente Produktzuordnung. Aus `/pages/science` verlinkt; CTAs zu Quiz und PDP |
| `/pages/ueber-lifetime` | `page.ueber-lifetime.json` | `lt-science-hero` → `lt-about-mission` → `lt-benefits` → `lt-stat-callout` → `lt-quote` → `video` → `lt-about-experts` → `lt-about-team` | 622 | **Der Push ist erfolgt**, die Rebuild-Sections rendern live. Die frühere Notiz „Live-Push ausstehend" (2026-07-02) war überholt |
| `/pages/longevity` | `page.longevity.json` | `lt-guide` (eine Section, 44 Blöcke) | 1.307 | „Longevity Blueprint", **die inhaltsstärkste Nicht-PDP-Seite des Shops** und bis 2026-07-28 in diesem Doc überhaupt nicht geführt. Seit dem Menü-Karten-Push aus der mobilen Schublade verlinkt. **Am 2026-07-28 neu gebaut**, siehe Kasten unten |
| `/pages/nmn-deutschland` | `page.nmn-deutschland.json` | `lt-science-hero` → `crs-novel-food` → `lt-benefits` → `lt-blog-cards` → `crs-faq-accordion` → `lt-hp-cta-close` | 717 | Novel-Food-Rechtsstatus NMN. Aus dem **Footer** verlinkt (also auf jeder Seite) plus aus `product.nmn-pulver.json` |
| `/pages/was-ist-enthalten` | `page.whats-inside.json` (**Suffix ≠ Slug**) | `lt-page-report-intro` → `lt-page-whats-inside-tabs` → `crs-risk-free-close` | 470 | „Was der Test misst". Aus Header-Menü, `index.json` und `product.age-dna-test.json` verlinkt |
| `/pages/fueraerzte` | `page.aerzte.json` (**Suffix ≠ Slug**) | `lt-doctor-quiz` | 342 | B2B-Ärzte-Quiz. **Belegt den Suffix `aerzte`**, deshalb nutzt die Expertenseite unten einen anderen. Spec: `docs/lifetime-doctor-quiz-spec.md`. `<title>` ist der nackte Handle „fueraerzte", also kein SEO-Titel gesetzt |

### Funktionsseiten (Wortzahl sagt hier nichts aus)

| Live-Slug | Template | Sections live | Wörter | Was die Seite tatsächlich tut |
|---|---|---|---|---|
| `/pages/longevity-coach` | `page.longevity-coach.json` | `custom-liquid` | ca. 18 plus Widget | H1 „Kostenfreie Longevity-Beratung“, erklärende Subline und Calendly-Inline-Widget (`calendly.com/lifetime365/longevity-coaching`). Die Startseite verlinkt sie zweimal als „Kostenfreie Video-Beratung" bzw. „Kostenfreie Beratung buchen" |
| `/pages/stack-builder` | `page.stack-builder.json` | `lt-stack-builder` | 34 | Stack-Konfigurator, Inhalt wird per JS nachgeladen („Stack wird geladen…") |
| `/pages/stack-2026-04` | `page.stack-mailout.json` | `lt-stack-mailout` | 17 | Mailout-Einstieg, leitet automatisch in den Warenkorb weiter |
| `/pages/lifetime-app-account-loeschen` | `page.lifetime-app-account.json` (**Suffix ≠ Slug**) | `rich-text` (`main-page` disabled) | ca. 120 | App-Store-Pflichtseite (Apple/Google verlangen öffentliche Account-Deletion-URL): Anleitung zur Kontolöschung in der LIFETIME App. **Vorsicht beim Template-Cleanup:** Das Template wurde am 2026-04-24 als vermeintliche Waise gelöscht, die publizierte Page rendert dann leer (die Referenz steht nur im `templateSuffix` der Shopify-Page, nicht im Repo). Am 2026-07-30 aus `d5a970c` wiederhergestellt |
| `/pages/lifetime-app-bestaetigen` | `page.lifetime-app.json` (**Suffix ≠ Slug**) | `rich-text` | ca. 30 | App-Double-Opt-in-Zielseite („Vielen Dank, dass Sie Ihre E-Mail bestätigt haben"). Gleiche Cleanup-Vorsicht wie bei der Account-Lösch-Seite |
| `/pages/instagram` | `page.instagram.json` | `lt-link-hub` (`main-page` disabled) | ca. 30 | **Link-in-Bio-Seite, live seit 2026-07-30**, ersetzt `linktr.ee/lifetimelongevity` als Ziel der Instagram-Bio. Page-ID 704421331319, Metafield `seo.hidden=1`: **bewusst noindex und nicht in der Sitemap**, beim Sitemap-Abgleich also nicht als „fehlend" werten. Die Bio-URL in Instagram trägt die UTMs (`?utm_source=instagram&utm_medium=social&utm_campaign=linkinbio`), die Karten-Links bewusst nicht (GA4-Session-Attribution, Begründung im Section-Kommentar). Karten-Klicks pushen `linkinbio_click` in den dataLayer |

### Rechtstexte (alle auf dem Default `templates/page.json`)

| Live-Slug | Wörter |
|---|---|
| `/pages/impressum` | 55 (vollständig: Firmierung, Anschrift, Vertretung, HRB, OS-Plattform) |
| `/pages/dsgvo-datenschutzanfragen` | 450 |
| `/pages/personal-data-requests` | 383 |

### Am 2026-07-29 retirierte Alt- und Waisenseiten

| Frühere URL | Status | Befund |
|---|---|---|
| `/pages/agedna-details-genetik` | **301** → `/pages/was-ist-enthalten` | Frühere leere Default-Page im Admin ausgeblendet; Redirect-Ziel liefert 200 |
| `/pages/testintern` | **404** | Frühere Testseite im Admin ausgeblendet; bewusst kein Redirect |
| `/pages/agedna-details` | **301** → `/pages/was-ist-enthalten` | Frühere Page mit `page.agedna-details.json` ausgeblendet; Template und Inhalt bleiben erhalten; 12/12 öffentliche Abrufe am 30.07. korrekt |
| `/pages/agedna-details-epigenetik` | **301** → `/pages/science` | Frühere Page mit `page.agedna-ergebnis-age.json` ausgeblendet; Template und Inhalt bleiben erhalten; 12/12 öffentliche Abrufe am 30.07. korrekt |
| `/pages/produkte` | **301** → `/collections/all` | Frühere Page mit `page.produkte.json` ausgeblendet; die Navigation nutzte bereits die Kollektion; 12/12 öffentliche Abrufe am 30.07. korrekt |

Vor dem Abschalten fand der Crawl aller 81 aktuellen Sitemap-URLs keinen eingehenden Ankerlink
auf die drei Waisenseiten; auch die Theme-Suche fand keine hart codierten oder resource-basierten
Verweise. In dieser Cleanup-Gruppe bleibt damit keine öffentlich indexierbare Waise zurück.

> **`/pages/longevity` ist am 2026-07-28 neu gebaut.** Die Copy-Entschärfung vom selben Tag
> ist inzwischen live (der frühere Drift-Kasten an dieser Stelle ist erledigt). Danach wurde
> der Seitenaufbau ersetzt: aus `slideshow` → `rich-text` → `lt-guide-toc` → 10 ×
> `lt-longevity-chapter` wurde **eine** Section `lt-guide` mit 44 Blöcken
> (2 `level`, 10 `chapter`, 30 `tip`, 2 `cta`). Layout und Typografie sind identisch zu
> `sections/lt-article.liquid`: 680px-Textspalte, 232px-Sticky-Rail ab 1024px, mobil
> aufklappbares Inhaltsverzeichnis. Die Anker (`kapitel-schlaf` … `kapitel-supplements`)
> sind unverändert, Deep-Links bleiben gültig. Die alten Sections `lt-guide-toc` und
> `lt-longevity-chapter` sind entfernt, sie hatten keinen zweiten Aufrufer.
>
> **Bekannte Lücke (erledigt 2026-07-29):** Die Kapitel `kapitel-genetik`, `kapitel-biomarker` und
> `kapitel-blutwerte` referenzierten Bilddateien, die es in Shopify Files nicht gibt
> (`verstehe-deine-genetik.jpg`, `biomarker-testen.jpg`, `blutwerte-analysieren.jpg`).
> Sie waren also auch vorher schon leer. `kapitel-supplements` trug bis dahin ein Duplikat
> des Stress-Bildes.
>
> **Kapitelbilder sind seit 2026-07-29 SVG-Infografiken.** Die sechs vorhandenen Fotos waren
> Banner-Streifen von 1102 × 240 px, die `.lt-guide__figure img` (`aspect-ratio: 16/9`,
> `object-fit: cover`) auf 680px Spaltenbreite hochskaliert hat: rund das Dreifache der
> Originalhöhe, daher sichtbar verpixelt. Ersetzt durch zehn Illustrationen in der
> Bildsprache der Blog-Infografiken, eine pro Kapitel, Quelle in
> `docs/longevity-guide-illustrations.py` → `docs/svg-src/longevity-guide/`.
> **SVGs liegen in Shopify Files als generische Datei und erscheinen deshalb nicht im
> Bild-Picker.** Der `chapter`-Block hat dafür die Settings `illustration` (rohe CDN-URL)
> und `illustration_alt`; `illustration` hat Vorrang vor `image`, der image_picker bleibt
> als Foto-Fallback. Die sechs alten Fotos sind in Shopify Files verwaist, aber nicht gelöscht.
>
> **Der Theme Manager pusht und committet *während* laufender
> Sessions. `sections/header-group.json` und `templates/index.json` standen bei dieser Prüfung
> als „modified" im `git status`, ihre Änderungen waren live aber bereits ausgeliefert. Der
> live sichtbare Zustand lag damit zwischen `HEAD` und Working Tree.
> **Uncommitted heißt nicht „nicht live", und committed heißt nicht „live".** Für beide
> Richtungen entscheidet nur der `curl` auf die Live-Seite.

**„What's Inside" ist live, die Archivnotiz war überholt.** Das Workspace-`CLAUDE.md` führte
unter §Archiv den Punkt „‚What's Inside'-Page nicht live" ohne Datum. Die Aussage stammt aus
`_archive/2026-05-08_workspace-cleanup/README.md`, wo sie korrekt auf den 2026-05-08 datiert ist
und für diesen Stand auch stimmte. Inzwischen liefert `/pages/was-ist-enthalten` das Konzept
mit eigenem Template `page.whats-inside.json` und drei `lt-*`-Sections aus, verlinkt aus Header,
Startseite und AGE&DNA-PDP. Der Pointer im `CLAUDE.md` ist am 2026-07-28 entsprechend
korrigiert; der Archivordner selbst bleibt unangetastet (eingefroren).

## Expertenseite (live seit 2026-07-27)

| Live-Slug | Template | Sections | Status |
|---|---|---|---|
| `/pages/aerzte` | `templates/page.aerztliche-leitung.json` | `lt-expert-profile` → `lt-expert-articles` | **live** (HTTP 200), Page-ID 704404062583, Suffix `aerztliche-leitung`. **Seit 27.07. in keinem Menü**, siehe unten |

**Slug ≠ Suffix, und zwar mit Absicht.** `page.aerzte.json` war schon vergeben (Ärzte-Quiz,
siehe Zeile darüber). Nicht „aufräumen", sonst kippt die Quiz-Seite.

**Zwei Sections, nicht drei (Revision 27.07.).** Der Prüfumfang lief zuerst als eigene
Section `lt-expert-scope` (Kartenraster, warme Fläche). Gemessen trug die Beitragsliste
damit 821k px² Textfläche gegen 299k im Profil und 448k davon fett, im Profil null: die
Belegliste war optisch der Held der Seite statt die Person. Jetzt sitzt der Prüfumfang als
zwei schlichte Listen in `lt-expert-profile`, und die Beitragsliste läuft auf
Fließtextgröße ohne Fettung. `sections/lt-expert-scope.liquid` bleibt als Muster im Theme
liegen, wird aber von keinem Template genutzt (Hinweis im Dateikopf).

Mit der Veröffentlichung sind zwei Automatiken angesprungen, beide live gegengeprüft:

- `sections/lt-article.liquid` verlinkt Autor und Reviewer in der Byline. **42 interne Links
  aus 21 Artikeln** auf `/pages/aerzte`.
- `snippets/microdata-schema.liquid` gibt `reviewedBy` mit `@id` und `url` auf
  `/pages/aerzte#limmroth` aus, identisch mit der `@id` des `Person`-Knotens der Seite.

Die Byline aller Blog-Artikel kommt aus **Section-Settings**, bei den Altartikeln aus
`templates/article.json`, bei den acht NMN-Artikeln aus ihrem eigenen Template. Die
Metafelder `custom.author_name` / `custom.reviewer_name` sind bewusst **nicht** gesetzt,
sie würden die Template-Settings still überschreiben (Memory `blog-byline`).

Faktenlage und offene Punkte: `docs/limmroth-faktenblatt.md`,
Auftrag und Abweichungen: `docs/briefing-expertenseite-aerzte.md` §10.

**Nachtrag 2026-08-10:** Mit `/blogs/longevity-blog/was-ist-spermidin` und
`/blogs/longevity-blog/was-ist-resveratrol` (Templates `article.was-ist-spermidin.json` und
`article.was-ist-resveratrol.json`, Cluster 2) sind es **23 Artikel**. Der Resveratrol-Artikel
führt bewusst `cta_enable: false`, siehe `docs/cluster2-blog/02-was-ist-resveratrol.md`.
Die Zahlen „21 Artikel" und „42 Byline-Links" in diesem Abschnitt sind der Stand vom 27.07.
Spec des Artikels: `docs/cluster2-blog/01-was-ist-spermidin.md`.

**Aus beiden Menüs entfernt, 27.07.2026 (BJ).** Begründung: „Ärztliche Leitung" als
Menüpunkt ist Geschwafel, die Seite soll eher beiläufig über den Blog erreicht werden.
Entfernt wurden die Kachel im mobilen Drawer (`sections/header-group.json`) und der Eintrag
im `legal`-Menü (MenuItem 823053812087), über das der Footer rendert.

**Folgeentscheid BJ, gleicher Tag: das Trust-Duo ist ganz weg.** Mit nur noch einer Kachel
hatte das halbbreite Zweier-Raster keinen Grund mehr. „Wissenschaft" läuft jetzt als
dritte volle Karte im selben Muster wie die beiden Produktkarten. `lt-menu-cards` rendert
die drei Karten über eine Schleife (`hero,card2,card3`) statt dreimal dasselbe Markup;
die Settings heißen jetzt `mc_card3_*` statt `mc_tile1_*`, `mc_tile2_*` ist ersatzlos raus.
Duo- und Kachel-CSS (`__duo`, `__tile`, `__tile-icon`) ist mitgelöscht. Das Snippet
`lt-trust-icon` bleibt, es wird weiter von `lt-pdp-hero` genutzt.

**Die Seite bleibt gut erreichbar, nur nicht mehr über Navigation:** 42 Byline-Links aus
21 Blog-Artikeln („Fachlich geprüft von Prof. Dr. med. Volker Limmroth"), der CTA im
dunklen Block von `/pages/science` („Wer die Inhalte prüft") und das `reviewedBy` im
JSON-LD. Genau der beiläufige Weg, den BJ wollte. **Die Seite ist weiterhin publiziert
und indexierbar, sie wird nur nicht mehr beworben.**

**System-1-Umbau 27.07.2026** (`docs/briefing-system1-science-aerzte.md`). Der Kopf der
Seite öffnet jetzt mit drei Zahlen (2006 · 160+ · 21) vor der Biografie, der erste
Bio-Absatz ist entfallen, weil er den Steckbrief wortgleich wiederholte. Der Steckbrief
hat noch zwei statt vier Zeilen, Klinik und Publikationen stehen oben als Zahl. Die
Beleg-Links laufen als Pill-Reihe mit Institutionsnamen (`links_style: pills`), die
Ziel-URLs und die `sameAs`-Logik sind unverändert. **Die Fußnote unter dem Prüfumfang ist
wortgleich geblieben**, sie ist laut Faktenblatt §3 die Offenlegung, die die Seite trägt.
Der Kernsatz „Was die Studienlage nicht trägt, geht nicht online." steht groß, aber ohne
Anführungszeichen und ohne Zuschreibung: es ist LIFETIME-Text über ihn, kein Zitat, und
seine Wortlaut-Freigabe ist weiter offen. Die Beitragsliste bleibt bewusst leise.

## Bekannt-dead Slugs (nicht aktiv)

Alle vier am 2026-07-28 per `curl` nachgemessen. **Die Überschrift „rendern den Default
`page.json`" stimmte für keinen davon mehr** — drei sind 301, einer ist 404:

| Slug | Status live (2026-07-28) | Befund |
|---|---|---|
| `/pages/quiz-age` | **200** | Kein dead Slug. Seit 2026-06-04 die AKTIVE Quiz-Page (volles `lt-pdp-quiz-v2`), siehe §Quiz oben |
| `/pages/meine-routine` | **301** → `/pages/quiz-age` | **Nicht mehr „Duplikat-Assignment".** Die Seite ist im Admin weg (nicht in der Sitemap), der Slug ist im Zuge der Redirect-Hygiene auf die aktive Quiz-Page umgehängt. Damit ist Schritt 2 der offenen Migration unten erledigt |
| `/pages/legacy-age-dna-landing` | **404** | Unverändert korrekt. Template archiviert (`_archive/2026-05-19_quiz-cleanup/`) |
| `/pages/agedna-ergebnis-dna-1` | **404** | Der alte Slug bleibt tot. Die später identifizierte reale Platzhalterseite `/pages/agedna-details-genetik` wurde am 29.07.2026 ebenfalls retirert und leitet nun auf `/pages/was-ist-enthalten` |

**Merke für dieses Doc:** „Slug ist tot" und „Seite ist weg" sind zwei verschiedene Aussagen.
Bei `agedna-ergebnis-dna-1` und `agedna-ergebnis-age` hat der alte Slug jeweils in die Irre
geführt. Die tatsächlichen Seiten liefen zeitweise unter `agedna-details*`-Slugs, wurden am
29.07.2026 aber ebenfalls retirert und auf kanonische Ziele weitergeleitet.

## Nav-Cleanup 2026-07-02 (Phase 1 „Nav-Hygiene")

Ergebnis eines Live-Stil-Audits (Chrome-MCP + Shopify-MCP). Leere/veraltete publizierte Pages
**unpublished + 301-redirectet**, Schlafanalyse (Produkt DRAFT) aus den Menüs entfernt. Live verifiziert.

**Retired + Redirect (301):**

Alle Zeilen am 2026-07-28 nachgemessen: jede Quelle antwortet mit **301**, jedes Ziel ist in
einem Hop erreichbar, keine Kette.

| Slug (jetzt unpublished → 404) | Redirect-Ziel | Grund |
|---|---|---|
| `/pages/agedna-ergebnis-age` | `/products/lifetime-age-dna` | **2026-07-28 hier korrigiert.** Das Doc führte diesen Slug als aktive Page mit eigenem Template. Live ist er 301 auf die AGE&DNA-PDP (1 Hop, Ziel 200). Das Template `page.agedna-ergebnis-age.json` hing danach an `/pages/agedna-details-epigenetik` und bleibt nach deren Retire als Inhaltsquelle erhalten |
| `/pages/agednatest` | `/products/lifetime-age-dna` | leer (Template `agedna-landing-page-x` fehlt) |
| `/pages/bioagedna-info` | `/products/lifetime-age-dna` | leer (Template `agedna-landing-termin` fehlt) |
| `/pages/alzheimer-demenz` | `/products/lifetime-age-dna` | leer (Template `demenz` fehlt); Alzheimer ≠ AGE-DNA, Ziel bewusst = nächstes lebendes Diagnostik-Produkt |
| `/pages/nmn` | `https://www.lifetime-health.de/products/lifetime-nmn` (absolut) | Legacy-Dublette zur echten NMN-PDP |
| `/pages/buecher-und-dokumentationen` | `/blogs/longevity-blog` | nicht mehr benötigt (BJ 2026-07-02); `longevity-hub`-Menü auf nur „Blog" reduziert |
| `/pages/longevity-guide-101` | `/pages/science` | **2026-07-27**, leer (0 Wörter im `main`, leerer `<title>`), stand aber in der Sitemap. Einziger Live-Link kam aus einer Pillar-Karte von `/pages/science`, die beim System-1-Umbau entfiel. **Achtung:** auf diese Seite zeigte ein zweiter Redirect (`/pages/longevity-guide`), der beim Retiren auf `/pages/science` mit umgehängt werden musste, sonst Kette |

**Menü-Bereinigung:** Schlafanalyse-Item aus `main-menu`, `footer`, `gesundheitsanalyse` entfernt (Produkt bleibt DRAFT).
Schlafanalyse-Karte in `templates/page.produkte.json` `disabled` + aus `block_order` (Grid `grid-3`→`grid-2`).
**Historischer Stand, verifiziert 2026-07-28:** Vor dem Retire renderte `/pages/produkte` nur
noch die zwei Karten AGE&DNA und NMN; das Wort „Schlafanalyse" kam im ausgelieferten HTML kein
einziges Mal mehr vor. Am 29.07.2026 wurde die inzwischen verwaiste Page ausgeblendet und auf
`/collections/all` weitergeleitet.
Alle toten Diagnostik-Menü-Items (in `main-menu`, `produkte`, `agednatest`, `gesundheitsanalyse`, `experten`, `beratung`) auf
`/products/lifetime-age-dna` umgebogen; Schlafanalyse-Kind in `experten` entfernt.

**Redirect-Hygiene (erledigt 2026-07-02):** Domain-Basis: `lifetime-health.com` noch aktiv, aber **`.de` = Primärdomain**.
145 fehlgeleitete Redirect-Ziele (40 `.com`, 105 nackte myshopify-Domain) auf relative `.de`-Pfade umgestellt; Chains auf das
finale Ziel aufgelöst; Quiz-Kette (`meine-routine`/`quiz` → `quiz-age`) verkürzt. Gelöscht: Footgun `/products/lifetime-nmn → myshopify-Home`
(1507660300663) und Self-Loop `/pages/ueber-lifetime` (296221147236). **Merke:** Shopify erlaubt kein Redirect-Ziel, das selbst
Redirect-Quelle ist (Chain-Sperre) — immer auf das finale Live-Ziel setzen. Detail-Memory: `project_redirect_hygiene_2026-07`.

**Phase 3 (Content-Rebuild): erledigt.** Im Code umgesetzt 2026-07-02, **Live-Push bestätigt 2026-07-28** —
`/pages/ueber-lifetime` liefert die acht Rebuild-Sections aus (622 Wörter), der frühere Vermerk
„Live-Push via Theme Manager ausstehend" ist damit erledigt.
`/pages/ueber-lifetime` läuft jetzt über `templates/page.ueber-lifetime.json` mit dem Stack
`lt-science-hero` (reuse) → `lt-about-mission` → `lt-benefits` → `lt-stat-callout` → `lt-quote` → `video` (reuse) →
`lt-about-experts` → `lt-about-team`; Standorte-Sections bleiben `disabled`. Neue Patterns „expert-profile" und
„team-grid" als approved Examples unter `_examples/sections/` dokumentiert. Brief: `docs/ueber-lifetime-rebuild-prompt.md`.

## Offene Migrationen

### Template-Rename `page.meine-routine.json` → `page.quiz-age.json`

**Stand (2026-06-04, live verifiziert):** Migration ist **vollzogen** — die aktive Quiz-Page wird live unter
`/pages/quiz-age` ausgeliefert; `/pages/biologischer-alterstest-dna` redirectet dorthin (301).

**Noch im Shopify-Admin zu verifizieren / aufräumen:**
1. ✅ Live-Page liegt auf `/pages/quiz-age` (bestätigt).
2. ✅ `/pages/meine-routine` ist weg (2026-07-28 verifiziert: 301 auf `/pages/quiz-age`, nicht in der Sitemap).
3. **Damit offen und jetzt unblockiert:** `templates/page.meine-routine.json` nach
   `_archive/2026-05-19_quiz-cleanup/templates/` verschieben. Kein Page-Assignment zeigt mehr darauf.
4. ✅ Aktive Google-Ads-Final-URL zeigt direkt auf `/pages/quiz-age` (30.07.2026 verifiziert).

### Verwaiste Page-Templates werden weiter per `?view=` ausgeliefert

Die Aufräumaktion vom 2026-07-27 hat die verwaisten **Produkt**-Templates gelöscht. Bei den
**Page**-Templates gilt das nicht: Bei der Erhebung vom 2026-07-28 lagen in `templates/`
**32** `page.*.json`; **17** hatten damals keine publizierte Seite. Seit 2026-07-30 ist
`biologisches-alter-testen` publiziert. Damit verbleiben in dieser bekannten Liste **16**:

`blog`, `buecher-und-dokus`, `bundle-builder`, `contact`, `dna-details`, `faq`, `kit-builder`,
`kontakt`, `legacy-agedna-landing-termin`, `legal`, `lifetime-app`, `meine-routine`,
`nmn-details`, `nmn`, `schlafanalyse`, `testimonials`.

Ein solches Template rendert weiterhin mit **HTTP 200**, sobald man es per `?view=` an einen
beliebigen existierenden Slug hängt. Am 2026-07-28 stichprobenartig bestätigt für
`page.meine-routine`, `page.legacy-agedna-landing-termin`, `page.agedna-ergebnis-age` und
`page.longevity-coach` (jeweils via `/pages/impressum?view=<suffix>`).

Praktische Folge: **„nicht verlinkt" heißt bei Page-Templates nicht „nicht ausspielbar".**
Compliance- und Copy-Audits, die nur über die Sitemap laufen, übersehen diese Dateien.

Einschränkung: Die Liste ist gegen die **publizierten** Seiten aus der Sitemap gerechnet.
Ein Template kann an einer unpublizierten Seite hängen (`contact`/`kontakt` sind Kandidaten)
und wäre dann kein Löschkandidat. Vor dem Aufräumen die Page-Assignments im Admin gegenprüfen,
so wie es bei den Produkt-Templates gegen DRAFT und UNLISTED gemacht wurde.

## Bekannte Drittapp-Residuen

- **RevenueHunt** (Product-Recommendation-Quiz) — Theme-Embed lädt globalen Popup-Loader auf jeder Seite. Wird nicht aktiv genutzt. Soll im Admin deinstalliert werden.
- **Lantern** (Quiz) — App-Block-Referenz in archiviertem `page.agedna-ergebnis-dna-1.json`. Soll im Admin deinstalliert werden.

## Pflege

Diese Datei aktualisieren, wenn:
- Eine Page einen neuen Slug bekommt
- Ein Section-Refactor das Haupt-Section-Liquid umbenennt
- Eine Drittapp installiert oder entfernt wird, die Live-Sichtbarkeit hat

**Wie geprüft wird (Ablauf vom 2026-07-28, wiederholbar).** Die Slug-Liste kommt aus der
Sitemap, nicht aus `templates/` und nicht aus diesem Doc:

```bash
curl -sS https://www.lifetime-health.de/sitemap.xml | grep -o '<loc>[^<]*</loc>'
```

Dann pro Slug den Status samt Redirect-Ziel (`-w "%{http_code} %{redirect_url}"`), und im
gerenderten HTML die `id="shopify-section-template--<id>__<key>"` gegen die `order` des
Template-JSON halten. Zwei Fallen, die dabei je einmal zugeschlagen haben:

1. **Wortzahl nur innerhalb der Template-Sections zählen.** Header, Footer und die mobile
   Schublade schleppen rund 50 Wörter mit, damit sieht eine leere Seite gefüllt aus.
2. **Wenig Text heißt nicht leer.** `/pages/longevity-coach` besitzt eine kurze H1/Subline und
   ein funktionierendes Calendly-Widget; `/pages/stack-builder` lädt seinen Inhalt per JS nach.
   Vor dem Retiren in das gerenderte HTML sehen, nicht nur zählen.
