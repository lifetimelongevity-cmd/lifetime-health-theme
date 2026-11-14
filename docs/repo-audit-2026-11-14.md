---
status: snapshot
last_review: 2026-11-14
canonical_for: repo-audit-2026-11-14
---

# Repo-Audit 14.11.2026

Automatischer Lauf der Aufräum-Routine. Nur Befunde, nichts gelöscht oder verschoben. Entscheidungen liegen bei BJ.

Methode: alle `.md` außerhalb von `docs/archive/` und `.claude/skills/impeccable/` auf tote Pfadverweise geprüft; Sections gegen alle `templates/*.json`, Section-Groups und `{% section %}`-Aufrufe abgeglichen; Snippets gegen `render`/`include`; Assets gegen jeden Dateinamen-Treffer im Theme. Einschränkung: Das Repo ist ein flacher Klon (50 Commits), Dateien, die nur lokal bei BJ liegen, sind hier nicht sichtbar.

## 1. Markdown-Aufräumbedarf

**Tote Verweise auf Docs, die im Repo nicht (mehr) existieren** (häufigste zuerst):

| Fehlende Datei | Verwiesen aus |
|---|---|
| `docs/age-dna-product-fact-sheet.md` | `theme-status.md`, `startseite-v2/README.md`, `PDP-DNA-UPGRADE/README.md`, `PDP-DNA-UPGRADE/01-rmbc-kontext.md`, `agedna-pdp-impeccable-2/05-ablauf.md`, `age-dna-geo/PROMPT-A1-…`, `age-dna-geo/artikel-genauigkeit-alterstest.md`, `docs/README.md` |
| `docs/geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `geo-p0-*-2026-07-29.md`, `geo-002-ga4-…`, `geo-prompt-checkpoint-2026-08-14.md` | `docs/README.md`, `geo-action-plan.md`, `theme-status.md`, `age-dna-geo/*` |
| `docs/limmroth-faktenblatt.md` | `live-pages-map.md`, `startseite-v2/README.md` |
| `docs/briefing-science-umbau.md`, `briefing-science-hub.md`, `briefing-system1-science-aerzte.md`, `briefing-expertenseite-aerzte.md` | `live-pages-map.md`, `briefing-pdp-refit.md` |
| `docs/hallmarks-of-aging-body.html`, `docs/svg-src/…`, `docs/longevity-guide-illustrations.py`, `docs/cover-hallmarks-of-aging.png` | `live-pages-map.md` |
| `docs/cover-genetischer-epigenetischer-test.png`, `docs/cover-nmn-zulassung-eu-verordnungsentwurf.png` | `age-dna-geo/artikel-a-…`, `nmn-blog-geo/13-…` |
| `_examples/PlumberPowerUpSwiftUI.swift` | `nmn-pdp-umsetzung-status.md` (wirkt wie ein Fremdverweis aus einem anderen Projekt) |

Entscheidung nötig: Liegen diese Dateien lokal bei BJ und wurden nie committet (dann committen), oder sind sie weg (dann Verweise streichen)? Besonders `age-dna-product-fact-sheet.md` und `geo-claim-ledger.md` werden als Quelle für Claims genannt.

**Verweise auf gelöschten Code:** `sections/lt-collection-register.liquid` (in `collection-all-spec.md` 4×, `theme-status.md` sagt selbst „gelöscht“), `templates/product.legacy-13-2-nmn.json` (`theme-status.md` To-do 9, Datei existiert nicht mehr: To-do kann raus), `templates/product.13_nmn.json` (liegt in `_archive/2026-07-23_nmn-template-cleanup/`, Verweise in `nmn-angebotsarchitektur.md` und `nmn-blog-geo/nmn-blog-playbook.md` zeigen ins Leere).

**Absolute Mac-Pfade:** `docs/science-blueprint-v1.1.md` verlinkt 4× auf `/Users/…/lifetime-health-theme/…`. Relativ machen.

**Veraltet:**
- `docs/theme-status.md`: `last_review: 2026-08-19`, TL;DR vom 17.08. (GEO-Checkpoint). Seitdem kamen u. a. Regel-Zusammenführung (28.10.), Resveratrol-, D3K2-, Kreatin-, NAD-Entwürfe (Nov.). CLAUDE.md nennt die Datei als Quelle für „Was ist live?“, sie trägt diese Rolle derzeit nicht.
- `docs/README.md`: listet sechs GEO-Docs, die nicht existieren (siehe oben), und `lifetime-quiz-spec.md` als aktiv, obwohl die Datei selbst `status: superseded` trägt.
- `docs/documentation-system-audit-2026-07-10.md`: `status: living`, ist aber ein datierter Bericht und verweist auf drei gelöschte Docs. Nach `docs/archive/` verschieben.

**Doppelte Regelwerke (Widerspruch zu CLAUDE.md „das einzige Regelwerk“):**
- `docs/shopify-rules.md` (`status: living`, `canonical_for: shopify-platform-rules`, Stand 08.05.) hätte bei der Zusammenführung am 28.10. mit ins Archiv gehört.
- `docs/design-governance.md` und `docs/design-components.md` (Stand 08.05.) stehen im README als „Hintergrund“, sind aber als `living` markiert. Status auf `reference` oder archivieren.
- `docs/section-heading-stack.md` (Stand 08.05.) ist bewusst verlinkt, prüfen, ob es noch mit `snippets/section-heading-crs.liquid` übereinstimmt.

## 2. Dokumentationslücken

- `scripts/check-heading-system.js` **schlägt aktuell fehl**: `sections/lt-age-test-guide.liquid` nutzt die alte Klasse `section-heading` statt `crs-heading-stack` (Verstoß gegen CLAUDE.md „Gestaltung“). Das Script ist nirgends dokumentiert und läuft in keinem Hook; entweder in `lt-check.mjs` einbauen oder in CLAUDE.md erwähnen.
- `scripts/fetch-image.js` (Unsplash, braucht `UNSPLASH_ACCESS_KEY`) ist nur in `docs/design-governance.md` erwähnt.
- Python-Generatoren in `docs/` (`blog-cover-generator.py`, `blog-svg-generator.py`, `push-dashboard.py`, `push-dashboard-note.py` + JSON) haben keine Doku, wofür und wie sie laufen.
- Viele `living`-Docs ohne Review seit Mai–Juli (`lifetime-quiz-shopify-setup.md`, `lifetime-doctor-quiz-spec.md`, `nmn-pdp-evidence-base.md`, `ueber-lifetime-rebuild-prompt.md`, `geo-strategy.md`, `nmn-angebotsarchitektur.md`, `pdp-copy-deck.md`, `lt-pdp-template-notes.md`). `lt-pdp-template-notes.md` steht in CLAUDE.md als Pflichtquelle, letzter Review 29.07.
- Neue PDP-Entwürfe (Resveratrol, D3K2, Kreatin, NAD) sind in keinem Index (`docs/README.md`, `theme-status.md`) erfasst.

## 3. Code-Organisation

**71 Sections ohne Verwendung** in irgendeinem Template, Section-Group oder `{% section %}`-Aufruf (von 252). Hinweis: Sie bleiben im Theme-Editor wählbar; Templates im Repo spiegeln den Theme-Manager-Stand, live könnte theoretisch abweichen. Gruppen:

- **NMN-PDP v2 (komplett tot, 11):** `nmn-pdp-quality-trust`, `nmn-pdp-v2-benefit-strip`, `-faq`, `-final-cta`, `-guarantee`, `-media-trust`, `-science-quality`, `-social-proof`, `-sticky-bar`, `-timeline`, `-upsell`. Dazu **3 verwaiste Snippets**: `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle`. Sauberster Archiv-Kandidat (`_archive/2026-07-23_nmn-template-cleanup/` existiert schon).
- **Section-Store-Importe `ss-*` (20):** `ss-circle-menu`, `ss-comparison-table-22/-24`, `ss-feature-13-78ff35/-15/-18`, `ss-featured-collection-tabs-6`, `ss-flexible-tabs(-68bfcf)`, `ss-hero-pro(-b6628d)`, `ss-image-with-text-24`, `ss-product-ingredients-6-4b8554`, `ss-progress-circles`, `ss-slider-7`, `ss-steps-12-5aedcd`, `ss-testimonial-12`, `ss-testimonials-2`, `ss-timeline`, `ss-video-slider`.
- **Alte LIFETIME-Sections (≈28):** `lt-campaign-hero`, `lt-campaign-stack`, `lt-hp-consultation`, `lt-hp-footer`, `lt-hp-loop`, `lt-hp-supplements`, `lt-lp-authority-block`, `lt-lp-scarcity-risk`, `lt-lp-science-evidence`, `lt-lp-value-stack`, `lt-nad-age-graph`, `lt-page-ai-coach`, `lt-page-dna-basics`, `lt-page-dna-details`, `lt-pdp-a2-aufklaerungs-bruecke`, `lt-pdp-a3-process-press`, `lt-pdp-report-preview`, `lt-pdp-shelf`, `lt-pdp-testimonials`, `lt-pdp-trust-mechanism`, `lt-science-hallmarks`, `lt-wiss-messung`, `hero-lifetime-section`, `lifetime-bento`, `lifetime-collection-nav`, `lifetime-trustbar`, `longevity-start`, `bekannt-aus`, `result-preview`, `cta-card-grid`.
- **Ungenutzte `crs-*` (4):** `crs-guarantee-block`, `crs-knowledge-base`, `crs-social-quotes`, `crs-timeline`.
- **Combine-Basis, ersetzt (6):** `main-blog`, `main-article-comments`, `main-article-navigation`, `collection-description`, `featured-collection-tabs-3`, `slideshow-animated`. Theme-Basis: eher behalten.

Vorsicht bei `lt-nad-age-graph` und den `lt-pdp-*`-Sections: der NAD-Entwurf vom 05.11. könnte sie wieder brauchen.

**12 Assets ohne Verweis:** `app-snps-detail.png`, `component-collection-tabs.js`, `component-recently-viewed.js`, `lifetime-collection-grid.css`, `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `lt-summary-muster-2…6.jpg`, `science-healthspan-kurve.svg`. (Bilder können per Theme-Editor-Setting gesetzt sein, dort aber als Shopify-Files, nicht als Theme-Asset. Vor dem Löschen kurz live prüfen.)

**Abhängigkeiten:** `package.json` führt `lucide-react` (React-Bibliothek, in einem Liquid-Theme ohne Build nirgends importiert). Entfernen. `dotenv` wird nur von `scripts/fetch-image.js` genutzt, ok.

**Werkzeug-Reste im Repo:**
- `.playwright-mcp/` (21 Konsolen-Logs/Snapshots vom 02.04.2026, 732 KB) und `.cursor/agent-images/*.png`: Session-Abfall, gehört in `.gitignore`.
- `.cursor/commands.json`, `.cursor/mcp.json`: nach der Regel-Zusammenführung prüfen, ob noch genutzt.
- `skills-lock.json` listet `ux-design` aus `civitai/civitai`, das unter `.agents/skills/ux-design/` liegt. Fremdquelle, prüfen ob gewollt.

## 4. Archivieren oder verschieben

| Was | Wohin | Warum |
|---|---|---|
| 11 `nmn-pdp-v2-*`/`nmn-pdp-quality-trust`-Sections + 3 `nmn-pdp-*`-Snippets | `_archive/2026-11-14_nmn-v2-cleanup/` | tot seit NMN-Umstellung auf `product.nmn-pulver.json` |
| `docs/shopify-rules.md` | `docs/archive/2026-10-28_regeln-zusammengefuehrt/` | konkurrierendes Regelwerk |
| `docs/documentation-system-audit-2026-07-10.md`, `docs/lifetime-quiz-spec.md` (superseded), `docs/mobile-lp-audit-2026-06-04.md` | `docs/archive/` | datierte, abgeschlossene Berichte |
| `docs/entwurf-2026-10-2x-*`, `entwurf-*-2026-10-22.html`, `entwurf-startseite-ag1-*`, `agedna-pdp-impeccable/`, `agedna-pdp-v2/`, `ag1-hero-analyse-2026-10-26.md` | `docs/archive/drafts/` | Oktober-Entwürfe, live umgesetzt oder verworfen (BJ bestätigen) |
| `docs/*.py`, `push-dashboard-*.json` | `scripts/docs-tools/` | Code gehört nicht in `docs/` |
| 8 `docs/cover-*.png`, `entwurf-*.jpg/.webp/.woff2` (Teil der 19 MB in `docs/`) | Unterordner `docs/assets/` oder Shopify Files | Binärdateien im Doc-Wurzelverzeichnis |
| `.playwright-mcp/`, `.cursor/agent-images/` | löschen + `.gitignore` | Session-Abfall |
| `PRODUCT.md` (Root) | prüfen, ob von Impeccable gelesen; sonst nach `docs/` | Root sollte nur CLAUDE/AGENTS/DESIGN tragen |

## Kurzfazit

Code-Seite: rund ein Viertel der Sections ist ungenutzt, ein klarer Archiv-Block (NMN v2) liegt bereit. Doc-Seite: `theme-status.md` und `docs/README.md` sind drei Monate hinter dem Stand, ein Dutzend referenzierter Docs fehlt im Repo, `docs/shopify-rules.md` widerspricht der Ein-Regelwerk-Regel. Ein echter Regelverstoß im Code: `lt-age-test-guide.liquid` (alte Heading-Klasse).
