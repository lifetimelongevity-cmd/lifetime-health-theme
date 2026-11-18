---
status: snapshot
last_review: 2026-11-18
---

# Ordnungs-Audit Theme-Ordner, 18.11.2026

Automatischer Lauf (geplante Routine). Nichts wurde verschoben oder gelöscht. Das hier ist nur die Liste. Geprüft: 149 Markdown-Dateien, 249 Sections, 90 Snippets, 147 Assets, 117 Templates. Hinweis: Der Abgleich läuft gegen die Templates im Repo. Der Theme Manager kann live abweichen, deshalb vor jedem Löschen von Code gegen das Live-Theme prüfen.

## 1. Markdown aufräumen

**Kanonische Docs mit veraltetem Stand (wichtigster Punkt)**

| Datei | Problem |
|---|---|
| `docs/theme-status.md` | In CLAUDE.md als Quelle für „Was ist live, was wartet auf Push?“ genannt. TL;DR steht auf 17.08.2026, der letzte Log-Eintrag auf 05.11. Seitdem fehlen u. a. der Supplement-PDP-Rollout (08.–17.11.), Hero-HD live (17.11.), Produktmedien-Tausch. 6 tote Verweise (`geo-prompt-checkpoint-2026-08-14.md`, `age-dna-product-fact-sheet.md`, `geo-p0-*`, `lt-collection-register.liquid`, `product.legacy-13-2-nmn.json`). |
| `docs/live-pages-map.md` | Letzte Live-Prüfung 15.06.2026. Verweist auf „CLAUDE.md § Kanonisches Fundament“, den Abschnitt gibt es nicht mehr. Science-Kette nennt `lt-science-proof-hero`, das Template nutzt `lt-science-hero`. 12 tote Verweise (Briefings, `limmroth-faktenblatt.md`, `hallmarks-of-aging-body.html`, `svg-src/`, `_archive/2026-05-08_workspace-cleanup/`), dazu `page.agedna-ergebnis-dna-1.json`, das es nicht gibt. |
| `docs/README.md` | Gruppe „GEO“ listet 6 Dateien, die nicht im Repo sind: `geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `age-dna-product-fact-sheet.md`, `age-dna-evidence-request-pack-2026-07-29.md`, `geo-p0-*`. Neue Ordner (`startseite-v2/`, `bildwelt-2026-11-16/`, `agedna-pdp-impeccable-2/`, `cluster2-blog/`) fehlen im Index. |

**Fehlende Dateien, auf die viele Docs zeigen.** `docs/age-dna-product-fact-sheet.md` wird von 8 Docs referenziert, liegt aber nicht im Repo (auch nicht in der Git-Historie dieses Klons). Gleiches gilt für `geo-prompt-panel.md`, `geo-claim-ledger.md` und `limmroth-faktenblatt.md`. Vermutlich liegen sie nur lokal bei BJ. Entweder committen oder die Verweise entfernen.

**Weitere tote Verweise**

- `docs/science-blueprint-v1.1.md`: absolute Pfade `/Users/benediktjunker/...` (4×).
- `docs/briefing-pdp-refit.md`: `briefing-expertenseite-aerzte.md` fehlt.
- `docs/nmn-angebotsarchitektur.md`, `docs/nmn-blog-geo/nmn-blog-playbook.md`: `templates/product.13_nmn.json` liegt seit 23.07. in `_archive/`.
- `docs/nmn-pdp-umsetzung-status.md`: verweist auf `_examples/PlumberPowerUpSwiftUI.swift` (fremde Datei, gibt es nicht).
- `docs/ueber-lifetime-rebuild-prompt.md`: Platzhalterpfade `sections/…team-grid…`.
- 2 Blog-Artikel-Entwürfe verweisen auf Cover-PNGs, die fehlen (`cover-genetischer-epigenetischer-test.png`, `cover-nmn-zulassung-eu-verordnungsentwurf.png`).
- `.claude/skills/lt-section/SKILL.md`: `scripts/search_docs.mjs` gehört zum Shopify-Plugin, nicht zum Repo. Formulierung klarstellen, sonst sucht man es hier.

**Doppelte Regeln (widerspricht „CLAUDE.md ist das einzige Regelwerk“)**

- `docs/shopify-rules.md` (`status: living`, `canonical_for: shopify-platform-rules`, Stand 08.05.) ist eine zweite Regelsammlung. Archivieren nach `docs/archive/2026-10-28_regeln-zusammengefuehrt/` oder auf `superseded` setzen.
- `docs/design-governance.md` gibt Arbeitsanweisungen (Bildbeschaffung per `scripts/fetch-image.js`), ohne Frontmatter. Mit `DESIGN.md` abgleichen und als Hintergrund kennzeichnen.

## 2. Doku-Lücken

- Kein Frontmatter (Status unklar): `conversion-messaging.md`, `design-governance.md`, `design-icon-system.md`, `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`.
- 25 Docs stehen auf `status: living`, haben aber `last_review` von Mai bis August (z. B. `section-heading-stack.md`, `design-components.md`, `lt-pdp-template-notes.md`, `collection-all-spec.md`). Prüfen oder auf `snapshot` setzen.
- `docs/pdp-system.md` ist aktuell (17.11.). Die Live-Map hat den Supplement-Rollout und die neuen PDP-Templates dagegen nicht nachgezogen.
- Kein Doc beschreibt die Python-Tools in `docs/` (`push-dashboard*.py`, `blog-cover-generator.py`, `blog-svg-generator.py`).

## 3. Code-Organisation

- **Ungenutzte Sections:** 111 von 249 Sections stehen in keinem Template und keiner Section-Gruppe. Davon:
  - 46 eigene `lt-`/`crs-`-Sections, u. a. `lt-hp-problem`, `lt-hp-problem-v2`, `lt-hp-journey`, `lt-hp-loop`, `lt-hp-social-proof`, `lt-hp-supplements`, `lt-hp-footer`, `lt-pdp-compare`, `lt-pdp-mechanism`, `lt-pdp-final-cta`, `lt-pdp-testimonials`, `lt-pdp-laborwerte`, `lt-lp-*` (4), `lt-campaign-hero`, `lt-campaign-stack`, `crs-timeline`, `crs-feature-grid`, `crs-guarantee-block`, `crs-expert-quotes`.
  - 11 Reste der alten NMN-PDP: `nmn-pdp-v2-*` (10) und `nmn-pdp-quality-trust`.
  - 20 Section-Store-Kopien `ss-*` (z. B. `ss-hero-pro` und `ss-hero-pro-b6628d` doppelt, `ss-flexible-tabs` doppelt).
  - Der Rest sind Combine-Basis-Sections (`main-article`, `main-blog`, `slideshow-animated` usw.). `helper-*` werden per JS geladen und sind **nicht** verwaist. Combine-Bestand am besten stehen lassen.
- **Ungenutzte Snippets:** `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` (gehören zur alten NMN-PDP).
- **Ungenutzte Assets (12):** `lt-summary-muster-2…6.jpg`, `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `app-snps-detail.png`, `science-healthspan-kurve.svg`, `lifetime-collection-grid.css`, `component-collection-tabs.js`, `component-recently-viewed.js` (die letzten beiden ggf. Combine-Bestand, vorher prüfen).
- **Abhängigkeiten:** `package.json` enthält `lucide-react` (React-Bibliothek, im Theme nirgends importiert) und `dotenv` (nur von `scripts/fetch-image.js` genutzt). `lucide-react` kann raus.
- **Scripts:** `scripts/check-heading-system.js` wird nirgends aufgerufen und nicht dokumentiert. Prüfen, ob `lt-check.mjs` es abgelöst hat.

## 4. Archivieren oder verschieben

| Was | Vorschlag |
|---|---|
| Die 57 ungenutzten `lt-`/`crs-`/`nmn-pdp-v2`-Sections plus 3 Snippets | Nach `_archive/2026-11_ungenutzte-sections/`, wie bei `2026-07-23_nmn-template-cleanup`. Vorher gegen das Live-Theme prüfen. |
| `.playwright-mcp/` (Konsolen-Logs vom April, 732 KB) | Löschen und in `.gitignore` aufnehmen. |
| `.cursor/agent-images/*.png`, `.cursor/commands.json` | Cursor-Regeln sind seit 28.10. archiviert. Rest mitarchivieren oder löschen. |
| `.impeccable/critique/` (2 Berichte, Okt.) | Nach `docs/archive/` oder in `.gitignore`. |
| `docs/lifetime-quiz-spec.md` (`superseded`) | `docs/archive/`. |
| `docs/documentation-system-audit-2026-07-10.md` | `docs/archive/` (abgearbeitet, 5 tote Verweise). |
| `docs/entwurf-2026-10-23-*.md`, `ag1-hero-analyse-2026-10-26.md`, `agedna-pdp-*-2026-10-27.md` (Snapshots, umgesetzt) | `docs/archive/drafts/`. |
| 27 HTML-Entwürfe, 8 Cover-PNGs, 7 Bilder und 1 Font lose in `docs/` | In Unterordner `docs/entwuerfe/` und `docs/blog-cover/`. `docs/` ist 33 MB groß. |
| `docs/push-dashboard*.py/.json`, `blog-*-generator.py` | Nach `scripts/` (sind Werkzeuge, keine Docs). |
| `skills-lock.json` + `.agents/skills/` | Klären, ob noch genutzt (`ux-design` stammt aus fremdem Repo). Sonst entfernen. |
