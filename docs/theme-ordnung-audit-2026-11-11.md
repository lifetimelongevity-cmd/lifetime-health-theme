---
status: snapshot
last_review: 2026-11-11
canonical_for: ordnungs-audit des theme-ordners am 11.11.2026
---

# Ordnungs-Audit Theme-Ordner (11.11.2026)

Automatischer Lauf. Es wurde nichts verschoben, gelöscht oder umgeschrieben, dieser Bericht ist die einzige Änderung. Geprüft wurde der Git-Stand des Branches, nicht der Live-Shop. Ob ein Template im Shop einem Produkt oder einer Seite zugewiesen ist, wurde nicht abgefragt.

Umfang: 147 Markdown-Dateien (davon 99 außerhalb der Skill-Ordner), 252 Sections, 88 Snippets, 147 Assets, 111 Templates (plus 7 Kunden-Templates), 335 Dateien in `docs/`.

## 1. Markdown: Aufräumbedarf

### Verweise auf Dateien, die es nicht gibt

| Datei | Toter Verweis |
|---|---|
| `docs/README.md` (Tabelle „Active Supporting Docs“) | `geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `age-dna-product-fact-sheet.md`, `age-dna-evidence-request-pack-2026-07-29.md`, `geo-p0-technical-audit-2026-07-29.md`, `geo-p0-url-decision-list-2026-07-29.md`. Sieben von dreizehn Einträgen der GEO-Zeile fehlen im Repo. |
| `docs/theme-status.md` | `sections/lt-collection-register.liquid`, `templates/product.legacy-13-2-nmn.json`, `docs/geo-prompt-checkpoint-2026-08-14.md`, `docs/age-dna-product-fact-sheet.md`, zwei weitere GEO-Docs |
| `docs/live-pages-map.md` | `docs/briefing-science-hub.md`, `briefing-science-umbau.md`, `briefing-expertenseite-aerzte.md`, `briefing-system1-science-aerzte.md`, `limmroth-faktenblatt.md`, `hallmarks-of-aging-body.html`, `longevity-guide-illustrations.py`, `svg-src/hallmarks-zwoelf-gruppen.svg`, `cover-hallmarks-of-aging.png`, `_archive/2026-05-08_workspace-cleanup/README.md` |
| `docs/collection-all-spec.md` | `sections/lt-collection-register.liquid` (die Section existiert nicht), `.impeccable/surfaces/templates-collection-json.md` |
| `docs/geo-action-plan.md`, `docs/age-dna-geo/*` | dieselben fehlenden GEO-Docs (`geo-prompt-panel.md`, `geo-claim-ledger.md`, Baseline, URL-Liste, GA4-Report) |
| `docs/PDP-DNA-UPGRADE/README.md`, `01-rmbc-kontext.md`, `docs/startseite-v2/README.md` | `docs/age-dna-product-fact-sheet.md` |
| `docs/nmn-angebotsarchitektur.md`, `docs/nmn-blog-geo/nmn-blog-playbook.md` | `templates/product.13_nmn.json` (liegt in `_archive/2026-07-23_nmn-template-cleanup/`) |
| `docs/homepage-blueprint-v2.md`, `docs/agedna-pdp-verkaufsseite-2026-10-27.md` | `shopify/templates/product.13_3_nmn.json`, `product.14_1_test.json` (alter `shopify/`-Pfad, Templates gibt es nicht mehr) |
| `.claude/skills/lt-section/SKILL.md` | `scripts/search_docs.mjs` (gehört zum Shopify-Plugin, nicht zu diesem Repo. Formulierung liest sich wie ein lokaler Pfad.) |

Die fehlenden GEO-Docs und das Fact Sheet wirken, als lägen sie im Workspace außerhalb des Repos oder seien nie eingecheckt worden. Entweder einchecken oder die Verweise auf den echten Ort umstellen.

Verweise auf Nachbar-Repos (`lifetime-ads/…`, `lifetime-schreibstil/…`, `lifetime-mockups/…`, `lifetime-epigenetik/…`) sind aus diesem Repo heraus nicht prüfbar, vermutlich aber in Ordnung.

### Veraltet

- **`docs/theme-status.md`**: `last_review` 19.08., TL;DR vom 17.08. Das Dokument ist laut `CLAUDE.md` die Antwort auf „Was ist live, was wartet auf Push?“, kennt aber die PDP-Runde ab Oktober nicht (NAD⁺ live 06.11., Kreatin live 08.11., Resveratrol und D3+K2 in Arbeit). Das ist der wichtigste Einzelbefund.
- **`docs/live-pages-map.md`**: `last_review` 29.09. Es fehlen 73 von 111 Templates (ohne `customers/`), darunter 20 Produkt-Templates (alle 17 Supplement- und Bundle-PDPs `product.01_tmg` bis `product.12_nad-liposomal-2`, dazu `product.bundle_01_fokus`, `product.lifetime-age-folgetest`, `product.spicegems-swatch`), 5 Collection-Templates, 15 Page-Templates und 29 Artikel-Templates.
- **`docs/documentation-system-audit-2026-07-10.md`**: Status `living`, beschreibt aber die Regelstruktur vor dem 28.10. (`shopify/AGENTS.md`, `.cursor/rules`). Auf `snapshot` setzen und nach `docs/archive/`.
- **`docs/lifetime-quiz-spec.md`**: Status `superseded`, liegt noch im aktiven `docs/`-Root. Nach `docs/archive/drafts/`.
- **`docs/nmn-pdp-umsetzung-status.md`** (24.07.) und **`docs/briefing-pdp-refit.md`** (29.07.): beide `living`, beide vor dem neuen PDP-System (`pdp-system.md`, 08.11.). Prüfen, ob sie noch gelten, sonst archivieren.
- **`docs/archive/README.md`**: Strukturtabelle kennt den Ordner `2026-10-28_regeln-zusammengefuehrt/` nicht.

### Doppelt oder konkurrierend

- **Regel-Docs neben `CLAUDE.md`.** `CLAUDE.md` nennt sich das einzige Regelwerk. Trotzdem stehen im aktiven `docs/`-Root vier Dateien, die sich selbst als verbindlich ausgeben: `shopify-rules.md` (`canonical_for: shopify-platform-rules`, Stand 08.05.), `design-governance.md` („tokens defined in this file are always authoritative“), `design-components.md` (`canonical_for: component-system-and-visual-qa`) und `design-icon-system.md`. `docs/README.md` stuft zwei davon als Hintergrund ein, `shopify-rules.md` und `design-icon-system.md` tauchen dort gar nicht auf. Vorschlag: `shopify-rules.md` zu den anderen Altregeln nach `docs/archive/2026-10-28_regeln-zusammengefuehrt/`, bei den drei Design-Docs den Kopf auf „Hintergrund, keine Regel“ ändern.
- **Drei Entwurfsstände der AGE&DNA-PDP nebeneinander:** `agedna-pdp-v2/`, `agedna-pdp-impeccable/` (24 Dateien), `agedna-pdp-impeccable-2/` (47 Dateien), dazu `PDP-DNA-UPGRADE/` und vier lose HTML-Entwürfe vom 22. und 27.10. Nur der letzte Stand gehört in den aktiven Bereich.
- **Homepage und Science mit Versionssuffix:** `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md` (alle ohne Frontmatter) neben den neueren Startseiten-Entwürfen vom 22. bis 26.10. und `startseite-v2/`. Unklar, was gilt.

### Ohne Status-Kopf

`conversion-messaging.md`, `design-governance.md`, `design-icon-system.md`, `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`.

## 2. Dokumentation gegen Code

- **Hook prüft weniger, als `CLAUDE.md` sagt.** Dort steht, der Hook laufe mit `scripts/lt-check.mjs` plus `shopify theme check`. `.claude/settings.json` ruft `lt-check.mjs` ohne `--theme-check` auf, Theme Check läuft im Hook also nicht. Entweder das Flag in den Hook oder den Satz in `CLAUDE.md` anpassen.
- **`scripts/check-heading-system.js` schlägt aktuell fehl:** `sections/lt-age-test-guide.liquid` nutzt noch die alte `section-heading`-Klasse statt `crs-heading-stack`. Das Skript hängt an keinem Hook und ist in keiner Doku erwähnt, der Verstoß fällt daher nicht auf.
- **`.cursor/commands.json`** schreibt in `.cursor/rules/design-components.mdc` und `shopify-rules.mdc`. Beide liegen seit 28.10. im Archiv. Die drei Cursor-Kommandos laufen ins Leere.
- **`docs/pdp-system.md` und `docs/lt-pdp-template-notes.md`**: alle genannten Sections und Templates existieren. Keine Abweichung gefunden.
- **`_examples/README.md`, `DESIGN.md`, `PRODUCT.md`, `docs/section-heading-stack.md`**: Dateiverweise stimmen.
- **Lücke:** Es gibt kein Dokument, das sagt, welche der 108 nicht eingebundenen Sections (siehe 3.) bewusst als Vorrat bleiben und welche tot sind.

## 3. Code-Organisation

### Sections ohne Einbindung (108 von 252)

Keine Referenz in `templates/`, den Section Groups oder per `{% section %}` im Layout. Vorsicht: Der Theme-Editor kann Sections jederzeit neu einbinden, und im Shop können Templates liegen, die hier fehlen. Vor dem Archivieren gegen das Live-Theme prüfen.

Nicht anfassen (werden per Section Rendering API oder vom Theme-Kern geladen): `helper-cart`, `helper-localization-form`, `helper-predictive-search`, `helper-product-item`, `helper-product-variant`, `product-quick-view`, `cart-recommendations`, `main-article`, `main-article-comments`, `main-article-navigation`, `main-blog`, `main-list-collections`, `search`, `collection-description`.

Kandidaten fürs Archiv, nach Gruppe:

- **Altes NMN-PDP-System v2 (11):** `nmn-pdp-v2-benefit-strip`, `-faq`, `-final-cta`, `-guarantee`, `-media-trust`, `-science-quality`, `-social-proof`, `-sticky-bar`, `-timeline`, `-upsell`, dazu `nmn-pdp-quality-trust`. Passend dazu sind drei Snippets ohne Aufrufer: `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle`.
- **Section-Store-Importe `ss-*` (20):** `ss-circle-menu`, `ss-comparison-table-22`, `ss-comparison-table-24`, `ss-feature-13-78ff35` (272 KB), `ss-feature-15`, `ss-feature-18`, `ss-featured-collection-tabs-6`, `ss-flexible-tabs`, `ss-flexible-tabs-68bfcf`, `ss-hero-pro`, `ss-hero-pro-b6628d`, `ss-image-with-text-24`, `ss-product-ingredients-6-4b8554`, `ss-progress-circles`, `ss-slider-7`, `ss-steps-12-5aedcd`, `ss-testimonial-12`, `ss-testimonials-2`, `ss-timeline`, `ss-video-slider`. Diese gehören zu gekauften Section-Store-Apps und lassen sich oft nur dort entfernen.
- **Alte Startseite `lt-hp-*` (8):** `lt-hp-consultation`, `-footer`, `-journey`, `-loop`, `-problem`, `-problem-v2`, `-social-proof`, `-supplements`.
- **Alte PDP-Bausteine `lt-pdp-*` (14):** `a2-aufklaerungs-bruecke`, `a3-process-press`, `app-switch`, `compare`, `expert`, `final-cta`, `ideal-candidate`, `laborwerte`, `mechanism`, `process`, `report-preview`, `shelf`, `testimonials`, `trust-mechanism`. `lt-pdp-compare` hat noch eine Impeccable-Kritik vom 16.10.
- **Landingpage und Kampagne (6):** `lt-lp-authority-block`, `lt-lp-scarcity-risk`, `lt-lp-science-evidence`, `lt-lp-value-stack`, `lt-campaign-hero`, `lt-campaign-stack`.
- **Sonstige `lt-*` und `crs-*`:** `lt-about-mission`, `lt-expert-scope`, `lt-nad-age-graph`, `lt-page-ai-coach`, `lt-page-dna-basics`, `lt-page-dna-details`, `lt-quote`, `lt-science-hallmarks`, `lt-science-limmroth`, `lt-stat-callout`, `lt-wiss-messung`, `crs-expert-quotes`, `crs-guarantee-block`, `crs-knowledge-base`, `crs-social-quotes`, `crs-timeline`.
- **Frühe Eigenbauten:** `hero-lifetime-section`, `hero-lifetime-test`, `lifetime-bento`, `lifetime-collection-nav`, `lifetime-trustbar`, `longevity-start`, `result-preview`, `bekannt-aus`, `cta-card-grid`.
- **Theme-Standard, ungenutzt (bleibt, gehört zu Combine):** `before-after`, `featured-collection-tabs-3`, `flex-cards`, `flex-slideshow`, `image-with-hotspots`, `scrolling-images`, `shop-the-look`, `slideshow-animated`, `testimonials`, `text-columns`.

### Weitere Waisen

- **Layouts:** `layout/theme.pdp-landing.liquid` und `layout/theme.campaign.liquid` nutzt kein Template. `theme.quiz-lp` ist in Gebrauch (3 Templates).
- **Block:** `blocks/ai_gen_block_2f90baf.liquid` ist nirgends eingebunden.
- **Assets ohne Referenz (12):** `app-snps-detail.png`, `component-collection-tabs.js`, `component-recently-viewed.js`, `lifetime-collection-grid.css`, `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `lt-summary-muster-2.jpg` bis `-6.jpg`, `science-healthspan-kurve.svg`. Bilder können per CDN-URL aus Shop-Inhalten verlinkt sein, vor dem Löschen prüfen.
- **Doppelte SVGs:** `assets/science-genetik-anlagen.svg`, `science-epigenetik-alter.svg` und `science-healthspan-luecke.svg` sind byte-gleich mit den Snippets `science-svg-*.liquid`. Nach der Regel „SVG gehört ins Snippet“ sind die Asset-Kopien überflüssig, sofern kein Blogartikel sie per URL lädt.

### Skripte und Abhängigkeiten

- **`package.json`**: `lucide-react` wird nirgends importiert (React gibt es im Theme nicht, das Icon-System ist Phosphor). Entfernen. `dotenv` braucht nur `scripts/fetch-image.js`.
- **`scripts/fetch-image.js`**: lädt Unsplash-Bilder nach `assets/`. Nirgends dokumentiert, die jüngeren Entwürfe nutzen Pexels. Vermutlich tot.
- **`scripts/check-heading-system.js`**: brauchbar, aber weder im Hook noch dokumentiert (siehe 2.). In `lt-check.mjs` einhängen oder in `CLAUDE.md` erwähnen.
- **Skripte am falschen Ort:** `docs/blog-cover-generator.py`, `docs/blog-svg-generator.py`, `docs/push-dashboard.py`, `docs/push-dashboard-note.py` samt `push-dashboard-notes.json` und `push-dashboard-routes.json` sind Werkzeuge und liegen zwischen den Docs. Nach `scripts/` (Unterordner `blog/`, `dashboard/`).
- **`skills-lock.json`** nennt den Skill `ux-design` (`.agents/skills/ux-design/`). Er ist nicht nach `.claude/skills/` verlinkt und damit für Claude wirkungslos. Verlinken oder entfernen.

## 4. Archivieren oder verschieben

| Was | Wohin | Warum |
|---|---|---|
| `.playwright-mcp/` (21 Logs und Snapshots vom 02.04.) | löschen, Ordner in `.gitignore` | Debug-Ausgabe, kein Projektinhalt |
| `.cursor/agent-images/*.png` | löschen, Ordner in `.gitignore` | Cursor-Sitzungsbild |
| `.cursor/commands.json` | anpassen oder löschen | verweist auf archivierte Regeln |
| `docs/cover-*.png` (8 Dateien im Root) | `docs/blog-covers/` oder zu `docs/blog-svg/` | Blog-Cover liegen lose im Root |
| `docs/entwurf-*.html`, `docs/entwurf-*/`, `docs/entwurf-*.jpg`, `.webp`, `.woff2` | `docs/entwuerfe/<datum>_<seite>/` | 30 lose Entwurfsdateien im Root. Erledigte (NAD⁺, Kreatin, Startseite 22.10., Quiz 22.10., AGE&DNA 22./27.10.) nach `docs/archive/entwuerfe/` |
| `docs/entwurf-ag1-instrument-serif.woff2` | löschen | identisch mit `assets/lt-instrument-serif.woff2` |
| `docs/agedna-pdp-v2/`, `docs/agedna-pdp-impeccable/` | `docs/archive/` | von `agedna-pdp-impeccable-2/` abgelöst |
| `docs/entwurf-2026-10-23-*.md` (4) samt Bildordner | `docs/archive/drafts/` | Snapshots, Runde abgeschlossen |
| `docs/ag1-hero-analyse-2026-10-26.md`, `agedna-pdp-impeccable-2026-10-27.md`, `agedna-pdp-verkaufsseite-2026-10-27.md` | `docs/archive/drafts/` | datierte Snapshots im aktiven Root |
| `docs/mobile-lp-audit-2026-06-04.md`, `geo-wettbewerbsanalyse-2026-08-03.md` | Status auf `snapshot`, dann Archiv | datierte Analysen mit Status `living` |
| `docs/lifetime-wedge-final.html`, `homepage-dossier-preview.html`, `science-preview.html`, `agedna-vergleich-preview.html`, `agedna-logo-leiste-vorschau.html`, `entwurf-startseite-hero-vergleich.html` | `docs/archive/previews/` | Vorschauen ohne Bezug in einer aktiven Doku |
| `docs/pdp-startprompt.md`, `docs/ueber-lifetime-rebuild-prompt.md` | `docs/prompts/` | Prompts, keine Doku. Der zweite ist vom 02.07., vermutlich Archiv |
| `docs/startseite-v2/bilder/bekannt-26-10-1440.png` (2,2 MB) | verkleinern oder als WebP | größte Datei im Repo |

`docs/` ist mit 335 Dateien größer als `sections/`. Der Root allein hält 84 Dateien, davon gehören nach der Tabelle in `CLAUDE.md` sechs zur aktiven Doku.

## Reihenfolge, falls du nur drei Dinge angehst

1. `docs/theme-status.md` und `docs/live-pages-map.md` auf den Stand November bringen. Beide sind als Wahrheit ausgewiesen und liegen Monate zurück.
2. Hook und `CLAUDE.md` in Einklang bringen (`--theme-check`), `check-heading-system.js` einhängen, `lt-age-test-guide.liquid` auf `crs-heading-stack` umstellen.
3. `docs/`-Root entrümpeln: Entwürfe und Snapshots ins Archiv, tote Verweise in `docs/README.md` streichen.
