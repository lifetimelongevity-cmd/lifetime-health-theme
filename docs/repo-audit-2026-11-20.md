---
status: snapshot
last_review: 2026-11-20
canonical_for: repo-housekeeping-report-2026-11-20
---

# Repo-Audit 20.11.2026

Automatischer Lauf (Routine). Nur Befund, nichts verschoben oder gelöscht. Grundlage: Stand `f893d54`, Clone ist flach (50 Commits), Aussagen zu gelöschten Dateien also ohne volle Historie.

Hinweis vorab: Die Templates im Repo sind nicht zwingend der Live-Stand (Theme Manager, siehe `CLAUDE.md`). „Verwaist“ heißt hier: im Repo von keinem Template, keiner Section-Gruppe und keinem Liquid-Code referenziert. Vor jedem Löschen per Shopify-MCP gegen das Live-Theme prüfen.

## 1. Markdown: Aufräumen nötig

### Kaputte Verweise auf Dateien, die es im Repo nicht gibt

| Fehlende Datei | Verwiesen von |
|---|---|
| `docs/age-dna-product-fact-sheet.md` | `docs/README.md` (als „aktiv“ gelistet), `theme-status.md`, `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `briefing-science-umbau.md`, `startseite-v2/README.md`, `PDP-DNA-UPGRADE/README.md` + `01-rmbc-kontext.md`, `agedna-pdp-impeccable-2/05-ablauf.md`, `age-dna-geo/` (2×) |
| `docs/geo-prompt-panel.md`, `docs/geo-claim-ledger.md`, `docs/geo-prompt-baseline-2026-07-29.md`, `docs/age-dna-evidence-request-pack-2026-07-29.md` | `docs/README.md` (als „aktiv“ gelistet), `geo-action-plan.md`, `age-dna-geo/` |
| `docs/limmroth-faktenblatt.md` | `live-pages-map.md`, `startseite-v2/README.md`, `briefing-expertenseite-aerzte.md`, `briefing-system1-science-aerzte.md` |
| `docs/design-governance.md`, `docs/design-components.md` | `theme-status.md`, `homepage-blueprint-v2.md`, `briefing-science-hub.md`. Liegen in `docs/archive/2026-10-28_regeln-zusammengefuehrt/`, Pfad nie nachgezogen |
| `docs/svg-src/…`, `docs/hallmarks-of-aging-body.html`, `docs/longevity-guide-illustrations.py`, `docs/cover-hallmarks-of-aging.png` | `live-pages-map.md` |
| `docs/cover-genetischer-epigenetischer-test.png`, `docs/cover-nmn-zulassung-eu-verordnungsentwurf.png` | `age-dna-geo/artikel-a-…`, `nmn-blog-geo/13-…` |
| `_archive/2026-05-08_workspace-cleanup/README.md` | `live-pages-map.md` |
| `templates/product.legacy-13-2-nmn.json` | `theme-status.md` |
| `templates/product.13_nmn.json` (liegt in `_archive/2026-07-23_…`) | `nmn-angebotsarchitektur.md`, `nmn-blog-geo/nmn-blog-playbook.md` |
| `sections/lt-collection-register.liquid` (laut `theme-status.md` gelöscht) | `collection-all-spec.md` (ganze Spec baut darauf) |
| `scripts/search_docs.mjs` | `.claude/skills/lt-section/SKILL.md` Z. 22 (gehört zum Shopify-Plugin, nicht zum Repo; Formulierung missverständlich) |
| `_examples/PlumberPowerUpSwiftUI.swift` | `nmn-pdp-umsetzung-status.md` (Fremdkörper) |
| `/Users/benediktjunker/…` (absolute Mac-Pfade) | `science-blueprint-v1.1.md` (4×) |

Vermutung: Die GEO- und Fact-Sheet-Dateien lagen nur lokal bei BJ und wurden nie committet. Entweder committen oder Verweise entfernen.

### Veraltet

- **`docs/theme-status.md`**: Frontmatter und Kopf sagen `last_review 2026-08-19`, letzter Log-Eintrag 05.11. Seitdem gab es mindestens BSFZ-Siegel, Katalog-Hero, Produktkarte und Pilotpraxis (alle 18.11.). `CLAUDE.md` verweist für „Was ist live, was wartet auf Push?“ genau hierher. Höchste Priorität. Außerdem verweist der Kopf auf `lifetime-ads/google-ads-status.md` (anderes Repo).
- **`docs/collection-all-spec.md`**: beschreibt das verworfene Register (`lt-collection-register`). Nach `docs/archive/` oder auf Ergebnis kürzen.
- **`docs/documentation-system-audit-2026-07-10.md`**: Snapshot, 9 seiner Verweise zeigen auf längst verschobene Dateien. Archivieren.
- **`docs/README.md`**, Tabelle „Active Supporting Docs“: listet 5 nicht vorhandene Dateien, dafür fehlen `pdp-system.md`-Nachbarn wie `nmn-pdp-umsetzung-status.md`, `pilotpraxis/`, `bildwelt-2026-11-16/`, die ganzen `entwurf-*`. Gruppen-Überschriften mischen Englisch und Deutsch.

### Überschneidungen (Kandidaten zum Zusammenlegen)

- **Wissenschaftsseite:** `briefing-science-hub.md`, `briefing-science-umbau.md`, `briefing-system1-science-aerzte.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`, `wissenschaftsseite-strategie.md`, `science-preview.html`. Sieben Dateien für eine Seite, der Live-Stand steht ohnehin in `live-pages-map.md`.
- **Startseite:** `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `homepage-dossier-preview.html`, `startseite-v2/`, `entwurf-startseite-*` (5 Dateien), `ag1-hero-analyse-2026-10-26.md`, `entwurf-2026-10-23-*` (4).
- **AGE&DNA-PDP:** `PDP-DNA-UPGRADE/`, `agedna-pdp-impeccable/`, `agedna-pdp-impeccable-2/`, `agedna-pdp-impeccable-2026-10-27.md`, `agedna-pdp-distill-2026-08-19.md`, `agedna-pdp-verkaufsseite-2026-10-27.md`, `agedna-pdp-v2/`, drei `entwurf-agedna-*.html`.
- **Quiz:** `lifetime-quiz-spec.md`, `lifetime-doctor-quiz-spec.md`, `lifetime-quiz-shopify-setup.md`.
- **GEO:** `geo-strategy.md` und `geo-action-plan.md` plus Unterordner `age-dna-geo/`, `nmn-blog-geo/`, `cluster2-blog/`.

## 2. Dokumentationslücken

- `theme-status.md` hinkt 15 Tage hinterher (siehe oben). Ohne diesen Log lässt sich „wartet auf Push“ nicht beantworten.
- `live-pages-map.md` nennt Sections als „bleibt als Muster im Theme“ (`lt-expert-scope`, `lt-science-hallmarks`), ohne dass es eine Liste solcher bewusst behaltener, unbenutzter Sections gibt. Eine kurze Tabelle „ungenutzt, aber behalten weil …“ würde Abschnitt 3 dieses Berichts überflüssig machen.
- `scripts/check-heading-system.js` und `scripts/fetch-image.js` sind nirgends dokumentiert (nur `lt-check.mjs` steht in `CLAUDE.md` und im Hook).
- `docs/*.py` (Push-Dashboard, Cover- und SVG-Generatoren) haben keine Anleitung, wie und wann sie laufen.
- Code-Regel vs. Bestand: `sections/lt-benefits.liquid` Z. 174 empfiehlt im Schema-`info` „lucide“-SVGs, `CLAUDE.md` schreibt Phosphor thin vor. Live genutzt auf `/pages/science` und `/pages/nmn-deutschland`. Nur den Info-Text anpassen.

## 3. Code-Organisation

### Sections ohne Referenz (110 von 249)

Bereinigt um Core-Helper, die per Section-Rendering-API aus JS geladen werden (`helper-cart`, `helper-predictive-search`, `helper-product-item`, `product-quick-view`, z. T. `helper-*`), bleiben grob 100. Die größten Gruppen:

- **`nmn-pdp-v2-*` (10) + `nmn-pdp-quality-trust`**: alte NMN-PDP-Kette, die NMN-PDP rendert heute aus `product.nmn-pulver.json`. Plus die drei verwaisten Snippets `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle`. Klarer Archiv-Kandidat.
- **`ss-*` (22)**: Section-Store-Käufe (`ss-hero-pro`, `ss-hero-pro-b6628d`, `ss-flexible-tabs`, `ss-flexible-tabs-68bfcf`, `ss-comparison-table-22/24` usw.), teils doppelt mit Hash-Suffix.
- **`lt-pdp-*` (17)**, **`lt-hp-*` (8)**, **`lt-lp-*` (4)**: alte PDP-, Startseiten- und Landingpage-Bausteine. `lt-pdp-final-cta` ist laut `live-pages-map.md` bewusst nicht zu nutzen.
- **`crs-*` (6)**: `crs-expert-quotes`, `crs-feature-grid`, `crs-guarantee-block`, `crs-knowledge-base`, `crs-social-quotes`, `crs-timeline`. Als geteilte Bausteine gedacht, aktuell nirgends eingesetzt.
- **Combine-Original** (`main-article`, `main-blog`, `main-article-comments`, `main-article-navigation`, `search`, `main-list-collections`, `slideshow-animated`, `shop-the-look`, `image-with-hotspots`, `testimonials`, `text-columns`, `countdown` …): Blog und Suche laufen inzwischen über `lt-article`, `lt-blog-index` usw. Combine-Sections würde ich **nicht** archivieren (Update-Fähigkeit des Basisthemes), nur notieren.

Alle verwaisten Sections haben `presets`, tauchen also im Theme-Editor als „Section hinzufügen“ auf. Das ist das eigentliche Problem: die Auswahlliste ist mit ~100 Altlasten gefüllt.

Vollständige Liste: `grep`-Lauf im Abschnitt „Befehle“ unten reproduzierbar.

### Assets ohne Referenz (12)

`app-snps-detail.png`, `component-collection-tabs.js`, `component-recently-viewed.js`, `lifetime-collection-grid.css`, `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `lt-summary-muster-2…6.jpg`, `science-healthspan-kurve.svg`. Einige Bilder können per Setting-Text (Dateiname im Feld, z. B. `lt-science-split`) live genutzt sein, also vorher im Live-Theme-Editor prüfen.

### Abhängigkeiten und Repo-Hygiene

- `package.json`: `lucide-react` wird nirgends importiert (kein React im Theme). Entfernen. `dotenv` braucht nur `scripts/fetch-image.js`.
- `.playwright-mcp/` (21 Dateien, Logs vom 02.04.2026) ist committet. Löschen und in `.gitignore` aufnehmen.
- `.cursor/` enthält noch `commands.json` und `mcp.json` (keine Secrets), obwohl Cursor-Regeln seit 28.10. archiviert sind. Prüfen, ob noch jemand Cursor nutzt.
- `.agents/skills/` (frontend-design, ux-design per `skills-lock.json`) neben `.claude/skills/`: zwei Skill-Orte. Klären, welcher gilt.
- `.impeccable/critique/` (2 Berichte vom Oktober) liegt außerhalb von `docs/`.

### Falscher Ort

- Python-Skripte in `docs/`: `push-dashboard.py`, `push-dashboard-note.py`, `blog-cover-generator.py`, `blog-svg-generator.py` (+ `push-dashboard-*.json`). Gehören nach `scripts/`.
- Binärdateien in `docs/` (Root): 8 Blog-Cover-PNGs, 4 Hero-JPG/WebP, eine Schrift `entwurf-ag1-instrument-serif.woff2`. `docs/` ist 34 MB groß, das meiste davon Entwürfe.

## 4. Archivieren oder verschieben

| Was | Vorschlag |
|---|---|
| `sections/nmn-pdp-v2-*`, `nmn-pdp-quality-trust` + 3 `snippets/nmn-pdp-*` | `_archive/2026-11-xx_nmn-v2-cleanup/` (nach Live-Check) |
| Doppelte `ss-*` mit Hash-Suffix und unbenutzte `lt-hp-*`/`lt-lp-*`/`lt-pdp-*` | Einzeln gegen Live-Theme prüfen, dann `_archive/` |
| `docs/entwurf-*` älter als 4 Wochen (alles vom 22.–27.10.: Startseite, NMN, Quiz, AGE&DNA, AG1-Hero) | `docs/archive/drafts/` |
| `docs/documentation-system-audit-2026-07-10.md`, `docs/collection-all-spec.md`, `docs/mobile-lp-audit-2026-06-04.md` | `docs/archive/` |
| `docs/agedna-pdp-impeccable/`, `agedna-pdp-v2/`, `agedna-pdp-distill-2026-08-19.md` | `docs/archive/` (abgelöst durch `-impeccable-2` und Live-Stand) |
| `docs/*.py`, `docs/push-dashboard-*.json` | `scripts/` |
| `docs/cover-*.png` | Unterordner `docs/blog-covers/` (zu `blog-svg/`) |
| `.playwright-mcp/` | löschen, `.gitignore` |
| `.impeccable/critique/` | `docs/archive/` oder löschen |
| `docs/repo-audit-2026-11-20.md` (dieser Bericht) | nach Abarbeitung archivieren |

## Befehle

```bash
# verwaiste Sections
for f in sections/*.liquid; do n=$(basename $f .liquid); grep -rqF "\"$n\"" templates sections/*.json config || grep -rqE "section ['\"]$n['\"]" layout sections snippets templates || echo $n; done
# verwaiste Snippets
for f in snippets/*.liquid; do n=$(basename $f .liquid); grep -rqE "(render|include) +['\"]$n['\"]" sections snippets layout templates blocks || echo $n; done
```
