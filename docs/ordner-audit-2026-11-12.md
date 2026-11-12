---
status: snapshot
last_review: 2026-11-12
---

# Ordner-Audit 12.11.2026 (Routine)

Nur Befund, nichts verschoben oder gelöscht. Geprüft: 147 Markdown-Dateien (ohne `docs/archive/`, `_archive/` und die Impeccable-Skill-Referenzen), 252 Sections, 88 Snippets, `scripts/`, `package.json` und die Root-Dotfolder.

## 1. Markdown: Aufräumen nötig

**Fehlende Zieldateien, mehrfach verlinkt (echte Lücken):**

| Fehlt | Verlinkt aus |
|---|---|
| `docs/age-dna-product-fact-sheet.md` | 7 Docs: `PDP-DNA-UPGRADE/README.md`, `PDP-DNA-UPGRADE/01-rmbc-kontext.md`, `age-dna-geo/PROMPT-A1-altbestand-anheben.md`, `age-dna-geo/artikel-genauigkeit-alterstest.md`, `agedna-pdp-impeccable-2/05-ablauf.md`, `startseite-v2/README.md`, `theme-status.md` |
| `docs/geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `geo-p0-technical-audit-2026-07-29.md`, `geo-p0-url-decision-list-2026-07-29.md`, `geo-prompt-checkpoint-2026-08-14.md`, `geo-002-ga4-ai-referral-report-2026-07-29.md`, `age-dna-evidence-request-pack-2026-07-29.md` | `docs/README.md` (Tabelle „GEO / content strategy“), `geo-action-plan.md`, `theme-status.md`, `age-dna-geo/*` |
| `docs/limmroth-faktenblatt.md` | `live-pages-map.md`, `startseite-v2/README.md` |

Die GEO-Dateien und das Fact Sheet liegen weder in `docs/` noch im Archiv. Entweder wiederherstellen (Workspace außerhalb des Repos?) oder die Verweise entfernen.

**Weitere tote Verweise:**

- `docs/live-pages-map.md`: 12 tote Pfade (`briefing-expertenseite-aerzte.md`, `briefing-science-hub.md`, `briefing-science-umbau.md`, `briefing-system1-science-aerzte.md`, `hallmarks-of-aging-body.html`, `longevity-guide-illustrations.py`, `svg-src/…`, `cover-hallmarks-of-aging.png`, `_archive/2026-05-08_workspace-cleanup/`).
- `docs/theme-status.md` und `docs/collection-all-spec.md` → `sections/lt-collection-register.liquid` (gibt es nicht mehr).
- `docs/theme-status.md` → `templates/product.legacy-13-2-nmn.json`; `nmn-angebotsarchitektur.md` und `nmn-blog-geo/nmn-blog-playbook.md` → `templates/product.13_nmn.json`. Beide Templates sind weg, die NMN-PDP rendert aus `product.nmn-pulver.json`.
- `docs/science-blueprint-v1.1.md`: 4 absolute Pfade `/Users/benediktjunker/…`, auf relative Pfade umstellen.
- `docs/nmn-pdp-umsetzung-status.md` → `_examples/PlumberPowerUpSwiftUI.swift` (Fremdkörper, gibt es nicht).
- Fehlende Cover: `cover-genetischer-epigenetischer-test.png`, `cover-nmn-zulassung-eu-verordnungsentwurf.png`.

**Duplikate und Überschneidungen:**

- `docs/shopify-rules.md` (status `living`, `canonical_for: shopify-platform-rules`, Stand 08.05.2026) ist eine zweite Regelsammlung neben `/CLAUDE.md`. Widerspricht dem Grundsatz „das einzige Regelwerk“. Ins Archiv `2026-10-28_regeln-zusammengefuehrt/`.
- `docs/design-governance.md` verweist auf `scripts/fetch-image.js` als Bildquelle und stellt eigene Regeln auf; laut `docs/README.md` nur Hintergrund. Header ergänzen oder archivieren.
- `geo-strategy.md` (07/2026) und `geo-action-plan.md` (08/2026) überschneiden sich, beide `living`.

## 2. Dokumentationslücken

- **`docs/theme-status.md` ist veraltet** (`last_review: 2026-08-19`, letzter Edit 05.11.). Resveratrol-PDP (`452bef6`), Kreatin- und D3+K2-Arbeit fehlen ganz. Genau diese Datei soll sagen, was live ist und was auf den Push wartet.
- **`docs/live-pages-map.md`** (`last_review: 2026-09-29`): Kein Eintrag für `product.06_resveratrol.json`, `product.05_kreatin.json`, `product.07_d3k2.json`. `docs/pdp-system.md` kennt Kreatin und Resveratrol, D3+K2 kennt kein Doc außer dem HTML-Entwurf.
- `docs/README.md` (`last_review: 2026-10-28`) listet 8 nicht vorhandene GEO-Dateien und erwähnt die neuen PDP-Entwürfe nicht.
- Ohne Front-Matter (Status unklar): `conversion-messaging.md` (in CLAUDE.md als Nachschlagewerk genannt), `design-governance.md`, `design-icon-system.md`, `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`, `DESIGN.md`, `PRODUCT.md`.
- Lange nicht geprüft, aber `living`: `design-components.md` und `section-heading-stack.md` (05/2026), `lifetime-quiz-shopify-setup.md` (05/2026), `nmn-pdp-evidence-base.md` (06/2026).

## 3. Code-Organisation

- **Rund 95 Sections ohne Verwendung** in `templates/`, Section-Groups, `config/` oder JS (109 ohne Template-Treffer, davon 14 per Section-Rendering oder Liquid erreichbar). Darunter 44 eigene `lt-`/`crs-`-Sections, z. B. `lt-hp-problem`, `lt-hp-problem-v2`, `lt-hp-loop`, `lt-pdp-compare`, `lt-pdp-mechanism`, alle 10 `nmn-pdp-v2-*`, `crs-timeline`, `crs-guarantee-block`, sowie Section-Store-Duplikate mit Hash-Suffix (`ss-hero-pro-b6628d`, `ss-flexible-tabs-68bfcf`, `ss-feature-13-78ff35`, `ss-steps-12-5aedcd`, `ss-product-ingredients-6-4b8554`). Vorbehalt: Live-Templates können vom Repo abweichen (Theme Manager), vor dem Archivieren gegen das Live-Theme prüfen. Volle Liste siehe Anhang.
- **Verwaiste Snippets:** `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` (nirgends gerendert).
- **`templates/product.spicegems-swatch.liquid`**: Reste der SpiceGems-Swatch-App. Prüfen, ob die App noch installiert ist.
- **`package.json`**: `lucide-react` wird nirgends genutzt (Treffer in `lt-benefits.liquid` ist nur ein Icon-Name). `dotenv` braucht nur `scripts/fetch-image.js`.
- **`scripts/check-heading-system.js`** wird von keinem Doc, Hook oder Skill aufgerufen. Entweder in `lt-check.mjs` aufgehen lassen oder in CLAUDE.md/Skill erwähnen.
- **Python- und Dashboard-Skripte in `docs/`**: `blog-cover-generator.py`, `blog-svg-generator.py`, `push-dashboard.py`, `push-dashboard-note.py`, `push-dashboard-*.json` gehören nach `scripts/`.

## 4. Archivieren oder verschieben

| Datei / Ordner | Vorschlag |
|---|---|
| `.playwright-mcp/` (21 Logs/Snapshots vom 02.04.2026, eingecheckt) | löschen, in `.gitignore` |
| `.cursor/agent-images/*.png` | löschen, `.cursor/agent-images/` in `.gitignore` |
| `docs/shopify-rules.md` | `docs/archive/2026-10-28_regeln-zusammengefuehrt/` |
| `docs/lifetime-quiz-spec.md` (status `superseded`) | `docs/archive/` |
| `docs/documentation-system-audit-2026-07-10.md` (dated, aber `living`, 5 tote Verweise) | `docs/archive/` |
| `docs/entwurf-2026-10-23-*.md`, `entwurf-*-2026-10-22.html`, `agedna-pdp-impeccable*`, `ag1-hero-analyse-2026-10-26.md` | `docs/archive/drafts/` sobald umgesetzt |
| 19 MB in `docs/`, davon viele Bilder lose im Root (`cover-*.png`, `entwurf-*.jpg/.webp/.woff2`) | in Unterordner `docs/img/` bzw. zum jeweiligen Entwurfsordner |
| `docs/*.py`, `push-dashboard*` | `scripts/` |
| unbenutzte `nmn-pdp-v2-*`-Sections und -Snippets | `_archive/2026-11_nmn-v2-cleanup/` nach Live-Abgleich |

## Anhang: Sections ohne Template-Verwendung

before-after*, bekannt-aus, cart-recommendations*, collection-description, countdown*, crs-expert-quotes, crs-guarantee-block, crs-knowledge-base, crs-social-quotes, crs-timeline, cta-card-grid, featured-collection-tabs-3, flex-cards, flex-slideshow, helper-cart*, helper-localization-form*, helper-predictive-search*, helper-product-item*, helper-product-variant*, hero-lifetime-section, hero-lifetime-test, image-with-hotspots, lifetime-bento, lifetime-collection-nav, lifetime-trustbar, longevity-start, lt-about-mission, lt-campaign-hero, lt-campaign-stack, lt-expert-scope, lt-hp-consultation, lt-hp-footer, lt-hp-journey, lt-hp-loop, lt-hp-problem-v2, lt-hp-problem, lt-hp-social-proof, lt-hp-supplements, lt-lp-authority-block, lt-lp-scarcity-risk, lt-lp-science-evidence, lt-lp-value-stack, lt-nad-age-graph, lt-page-ai-coach, lt-page-dna-basics, lt-page-dna-details, lt-pdp-a2-aufklaerungs-bruecke, lt-pdp-a3-process-press, lt-pdp-app-switch, lt-pdp-compare, lt-pdp-expert, lt-pdp-final-cta*, lt-pdp-ideal-candidate, lt-pdp-laborwerte*, lt-pdp-mechanism, lt-pdp-process, lt-pdp-report-preview, lt-pdp-shelf, lt-pdp-testimonials, lt-pdp-trust-mechanism, lt-quote*, lt-science-hallmarks, lt-science-limmroth, lt-stat-callout, lt-wiss-messung, main-article-comments, main-article-navigation, main-article*, main-blog, main-list-collections, nmn-pdp-quality-trust, nmn-pdp-v2-benefit-strip, nmn-pdp-v2-faq, nmn-pdp-v2-final-cta, nmn-pdp-v2-guarantee, nmn-pdp-v2-media-trust, nmn-pdp-v2-science-quality, nmn-pdp-v2-social-proof, nmn-pdp-v2-sticky-bar, nmn-pdp-v2-timeline, nmn-pdp-v2-upsell, product-quick-view*, result-preview, scrolling-images, search*, shop-the-look, slideshow-animated, ss-circle-menu, ss-comparison-table-22, ss-comparison-table-24, ss-feature-13-78ff35, ss-feature-15, ss-feature-18, ss-featured-collection-tabs-6, ss-flexible-tabs-68bfcf, ss-flexible-tabs, ss-hero-pro-b6628d, ss-hero-pro, ss-image-with-text-24, ss-product-ingredients-6-4b8554, ss-progress-circles, ss-slider-7, ss-steps-12-5aedcd, ss-testimonial-12, ss-testimonials-2, ss-timeline, ss-video-slider, testimonials, text-columns

`*` = Name taucht in Liquid oder JS auf (Section-Rendering-API oder Verweis), nicht ohne Prüfung entfernen.
