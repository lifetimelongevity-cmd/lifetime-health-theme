---
status: snapshot
last_review: 2026-11-26
---

# Ordnungs-Audit Theme-Ordner (26.11.2026)

Automatischer Lauf (Routine). Nichts wurde verschoben oder gelöscht, das hier ist nur der Befund.
Grundlage: Stand `cdec56a` (Push 25.11.2026). 159 Markdown-Dateien, 253 Sections, 92 Snippets, 172 Assets, 116 Templates.

## 1. Markdown: Aufräumen nötig

**Defekte Verweise: 60 in 22 aktiven Docs** (ohne `docs/archive/`). Die meisten Ziele gab es im Repo nie, sie liegen vermutlich nur im lokalen Workspace auf BJs Mac.

| Fehlende Datei | Verwiesen von |
|---|---|
| `docs/age-dna-product-fact-sheet.md` | 10 Docs, u. a. `theme-status.md`, `PDP-DNA-UPGRADE/README.md`, `startseite-v2/README.md`, `homepage-blueprint-v2.md` |
| `docs/limmroth-faktenblatt.md` | `live-pages-map.md`, `startseite-v2/README.md`, zwei Briefings |
| `docs/geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `geo-prompt-checkpoint-2026-08-14.md` | `geo-action-plan.md`, `age-dna-geo/*`, `theme-status.md`, **und `docs/README.md` listet sie als aktive Docs** |
| `docs/design-governance.md`, `design-components.md` | `theme-status.md`, `homepage-blueprint-v2.md`, `briefing-science-hub.md` (liegt jetzt in `docs/archive/2026-10-28_regeln-zusammengefuehrt/`) |
| `sections/lt-collection-register.liquid` | `collection-all-spec.md`, `theme-status.md` |
| `templates/product.13_nmn.json`, `product.legacy-13-2-nmn.json` | `nmn-angebotsarchitektur.md`, `nmn-blog-geo/nmn-blog-playbook.md`, `theme-status.md` |
| `docs/svg-src/…`, `hallmarks-of-aging-body.html`, `longevity-guide-illustrations.py`, `cover-hallmarks-of-aging.png` | `live-pages-map.md` (kanonisches Doc!) |
| `_archive/2026-05-08_workspace-cleanup/` | `live-pages-map.md`, `documentation-system-audit-2026-07-10.md` |
| `scripts/search_docs.mjs` | `.claude/skills/lt-section/SKILL.md` (gehört zum Shopify-Plugin, nicht zum Repo; Formulierung klarstellen) |
| Absolute Pfade `/Users/benediktjunker/…` | `science-blueprint-v1.1.md` |
| `_examples/PlumberPowerUpSwiftUI.swift` | `nmn-pdp-umsetzung-status.md` (Fremdkörper) |

**Veraltet:**
- `docs/theme-status.md` ist laut CLAUDE.md die Quelle für „Was ist live, was wartet auf Push?“, steht aber auf **19.08.2026**. TL;DR handelt von GEO-014. Black Week, Pilotpraxis und die Supplement-PDPs vom November fehlen.
- `docs/section-heading-stack.md` (last_review 08.05.), `lifetime-quiz-shopify-setup.md` (12.05.), `lifetime-doctor-quiz-spec.md` (19.05.), `nmn-pdp-evidence-base.md` (16.06.), `design-system/README.md` (19.06.) tragen `status: living`, sind aber seit Monaten ungeprüft.

**Als `superseded` markiert, liegen aber noch aktiv in `docs/`:** `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`, `lifetime-quiz-spec.md`. `docs/README.md` führt `lifetime-quiz-spec.md` weiter als aktive Quiz-Doku.

## 2. Dokumentationslücken

- **Pilotpraxis** (`templates/page.pilotpraxis-kardiologie.liquid`, `…-orthopaedie.liquid`, 24./25.11. gebaut) steht in keinem Doc: nicht in `live-pages-map.md`, nicht in `theme-status.md`. Der Bauweg `docs/pilotpraxis/bauen.py` → `assets/pilotpraxis-*` ist nirgends beschrieben.
- **Black Week 2026** (Zeitschaltung in `snippets/lt-black-week*.liquid`, `lt-bw-code-banner.liquid`, Phase 2 endet 30.11. 23:59): kein Eintrag in `theme-status.md`, kein Rückbau-Plan. Nach dem 30.11. bleiben Snippets, Banner und Template-Settings als toter Code stehen.
- **`scripts/lt-check.mjs` misst Übersetzungs-Keys statt Texte.** Über alle Dateien gibt es 381 Befunde, davon 372 auf `t:`-Keys der Basis-Sections (z. B. `"t:sections.announcement-bar.name"` mit 32 Zeichen). Shopify prüft den übersetzten Text. Wer eine Combine-Section anfasst, bekommt vom Hook falsche Pflichtbefunde, und CLAUDE.md sagt „beheben, nicht umgehen“. Die restlichen 9 betreffen `ss-*`-Presets (Section Store), die live trotzdem existieren. Die 25-Zeichen-Grenze für `presets[].name` passt also womöglich nicht.
- **`scripts/check-heading-system.js` schlägt fehl:** `sections/lt-age-test-guide.liquid` nutzt noch die alte `section-heading`-Klasse. Das Skript steht weder in CLAUDE.md noch im Hook.
- `docs/README.md` beschreibt nur einen Teil von `docs/` (121 Einträge). Die 46 `entwurf-*`-Dateien und -Ordner sowie `pilotpraxis/`, `bildwelt-…/` und `cluster2-blog/` sind nicht eingeordnet.

## 3. Code-Organisation

**Sections ohne Verwendung in einem Template:** 111 von 253. 96 davon haben `presets`, sind im Editor also noch einfügbar. Die klar toten Gruppen:

| Gruppe | Dateien | Empfehlung |
|---|---|---|
| Alte NMN-PDP v2 | `nmn-pdp-v2-*` (10 Sections), `nmn-pdp-quality-trust`, Snippets `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` (nirgends gerendert) | nach `_archive/` (wie `_archive/2026-07-23_nmn-template-cleanup`) |
| Section-Store-Reste | 21 von 27 `ss-*`/`featured-collection-tabs-3*`, oft Dubletten mit Hash-Suffix (`ss-hero-pro` + `ss-hero-pro-b6628d`) | in der Section-Store-App prüfen, dann entfernen |
| Basis-Theme durch `lt-` ersetzt | `main-article`, `main-article-comments`, `main-article-navigation`, `main-blog`, `main-list-collections` (Templates nutzen `lt-article`, `lt-blog-index`) | behalten oder archivieren, kein Preset |
| Alte Eigenbauten ohne Preset | `bekannt-aus`, `longevity-start`, `hero-lifetime-test` (nur in `hero-lifetime-section` erwähnt, beide unbenutzt) | archivieren |
| Unbenutzte `lt-`/`crs-` mit Preset | 45 Stück, z. B. `lt-hp-problem` + `lt-hp-problem-v2`, `lt-pdp-*` (13), `lt-lp-*` (4) | einzeln mit BJ entscheiden |

`helper-*`, `product-quick-view` und `cart-recommendations` sehen verwaist aus, werden aber per Section-Rendering aus JS geladen. **Nicht anfassen.**

**Assets ohne Verweis:** `component-collection-tabs.js`, `component-recently-viewed.js`, `lifetime-collection-grid.css`, `app-snps-detail.png`, `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `lt-summary-muster-2…6.jpg`, `science-healthspan-kurve.svg`. Vor dem Löschen prüfen, ob sie im Theme-Editor über eine Setting-URL eingetragen sind.

**Abhängigkeiten:** `package.json` führt `lucide-react` (React-Paket, im Liquid-Theme nirgends importiert, entfernen). `dotenv` braucht nur `scripts/fetch-image.js`.

**Am falschen Ort:**
- Python-Werkzeuge in `docs/`: `push-dashboard.py`, `push-dashboard-note.py`, `blog-svg-generator.py`, `blog-cover-generator.py`, `age-dna-geo/tools/*.py`, `pilotpraxis/bauen.py`, dazu `push-dashboard-*.json` → nach `scripts/` (oder `scripts/docs-tools/`).
- `.playwright-mcp/`: 21 Konsolen-Logs und Snapshots vom 02.04.2026, im Git eingecheckt → löschen und in `.gitignore` aufnehmen.
- `.cursor/` (`commands.json`, `mcp.json`) und `.agents/skills/` neben `.claude/skills/`: Seit 28.10. gilt nur CLAUDE.md. Prüfen, ob die Cursor-/Agents-Reste noch gebraucht werden.

## 4. Archivieren oder verschieben

| Was | Wohin |
|---|---|
| `docs/homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`, `lifetime-quiz-spec.md` (alle `superseded`) | `docs/archive/` |
| `docs/documentation-system-audit-2026-07-10.md` (8 tote Verweise, durch Regelzusammenführung vom 28.10. überholt) | `docs/archive/` |
| Snapshots bis Ende August: `mobile-lp-audit-2026-06-04.md`, `briefing-*.md` (4), `geo-p0-*`, `geo-002-*`, `geo-wettbewerbsanalyse-*`, `blog-produktpositionierung-*`, `agedna-pdp-distill-*`, `ueber-lifetime-rebuild-prompt.md` | `docs/archive/` |
| Umgesetzte Entwürfe Oktober/November (`entwurf-*-pdp-*`, `entwurf-2026-10-23-*`, `entwurf-startseite-*`, Hero-Bilder, `entwurf-ag1-*`), zusammen etwa 20 MB | `docs/archive/drafts/`, sobald die jeweilige PDP live ist |
| `docs/pilotpraxis/img/*`: 7 Dateien byte-gleich mit `assets/pilotpraxis-*` (inkl. MP4 und PDF), dazu `test-video.mp4` | Dubletten sind gewollt, falls `bauen.py` sie kopiert. Dann im Pilotpraxis-README vermerken, sonst eine Seite streichen |
| Black-Week-Code (`lt-black-week*.liquid`, `lt-bw-code-banner.liquid`, Settings in `product.nmn-pulver.json`) | ab 01.12.2026 zurückbauen |

## Reihenfolge (Vorschlag)

1. `theme-status.md` auf heute bringen und Pilotpraxis in `live-pages-map.md` aufnehmen (kanonische Docs).
2. `lt-check.mjs` so ändern, dass er `t:`-Keys überspringt (sonst erzeugt der Hook falsche Pflicht-Fixes).
3. Tote Verweise in `docs/README.md` und `live-pages-map.md` bereinigen.
4. Superseded-Docs und alte Snapshots archivieren, `.playwright-mcp/` löschen, `lucide-react` entfernen.
5. NMN-v2-Sections und Snippets archivieren (vorher `grep -l` über alle Templates).
6. Nach dem 30.11.: Black Week zurückbauen.
