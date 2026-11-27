---
status: snapshot
date: 2026-11-27
---

# Repo-Audit 27.11.2026 (geplanter Lauf)

Nur Befunde, nichts verschoben oder gelöscht. Stand: `a3dae07` (Black-Week-Commits vom 26.11.).
Hinweis: Der Theme Manager kann Templates live anlegen, die hier fehlen. „Ungenutzt“ heißt daher „in keinem Template im Repo“, nicht „sicher tot“.

## 1. Markdown-Aufräumen nötig

| Datei | Befund | Vorschlag |
|---|---|---|
| `docs/theme-status.md` | **Veraltet.** `last_review: 2026-08-19`, TL;DR vom 17.08. CLAUDE.md verweist für „Was ist live, was wartet auf Push?“ genau hierher. Black Week (`page.black-week`, `page.black-friday`, `lt-bf-bundle`, NMN-Geschenk-Logik, Menü-Puls), Pilotpraxis und die Supplement-PDPs vom November fehlen ganz. | Neuen TL;DR schreiben, erledigte To-Dos raus, Log ab 08/2026 nachtragen. Wichtigster Punkt dieses Audits. |
| `docs/live-pages-map.md` | `last_review: 2026-11-17`. Keine Zeile zu `page.black-week.json`, `page.black-friday.json`, `page.pilotpraxis-kardiologie.liquid`, `page.pilotpraxis-orthopaedie.liquid`. Acht tote Verweise (`docs/svg-src/…`, `docs/limmroth-faktenblatt.md`, `docs/hallmarks-of-aging-body.html`, `docs/longevity-guide-illustrations.py`, `docs/cover-hallmarks-of-aging.png`, `_archive/2026-05-08_workspace-cleanup/README.md`). | Neue Seiten eintragen; tote Pfade entfernen oder auf Workspace-Ort umschreiben. |
| `docs/README.md` | Listet fünf GEO-Dateien, die im Repo nicht existieren und nie existiert haben: `geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `age-dna-product-fact-sheet.md`, `age-dna-evidence-request-pack-2026-07-29.md` (liegen vermutlich im Workspace außerhalb des Themes). `wissenschaftsseite-strategie.md`, `ueber-lifetime-rebuild-prompt.md`, `pilotpraxis/` fehlen im Index. | Index auf echte Dateien bringen, externe Dateien als „Workspace“ kennzeichnen. |
| `docs/documentation-system-audit-2026-07-10.md` | Vom Regel-Merge am 28.10. überholt, 9 tote Verweise. | Nach `docs/archive/` |
| `docs/nmn-pdp-umsetzung-status.md` | Verweist auf `_examples/PlumberPowerUpSwiftUI.swift` (fremdes Projekt, nie im Repo). | Zeile streichen; Status-Doc ggf. archivieren (NMN-PDP läuft über `product.nmn-pulver.json`). |
| Weitere tote Verweise | `science-blueprint-v1.1.md` (4), `ueber-lifetime-rebuild-prompt.md` (3), `startseite-v2/README.md` (2), `homepage-blueprint-v2.md`, `geo-action-plan.md`, `collection-all-spec.md`, `briefing-*.md`, `age-dna-geo/*`, `PDP-DNA-UPGRADE/*` (je 1–2), meist `age-dna-product-fact-sheet.md` und `limmroth-faktenblatt.md`. | Bei Archivierung mitnehmen, sonst Pfade korrigieren. |
| Doppelungen | Drei AGE&DNA-PDP-Entwurfsrunden nebeneinander: `agedna-pdp-impeccable/`, `agedna-pdp-impeccable-2/`, `agedna-pdp-impeccable-2026-10-27.md`, `agedna-pdp-v2/`, `agedna-pdp-distill-2026-08-19.md`, `agedna-pdp-verkaufsseite-2026-10-27.md`. Zwei Homepage-Linien: `homepage-blueprint-v2.md` / `homepage-copy-v2.md` und `startseite-v2/` plus `entwurf-startseite-*`. Vier Science-Briefings (`briefing-science-hub`, `-umbau`, `-system1-science-aerzte`, `-expertenseite-aerzte`) plus `science-blueprint-v1.1`, `science-copy-v1.1`, `wissenschaftsseite-strategie`. | Je Thema den umgesetzten Stand behalten, Vorrunden archivieren. |

## 2. Dokumentationslücken

- **Black Week** hat kein Doc: Bundle-Logik von `lt-bf-bundle` (NMN/NAD⁺ nie zusammen, teurere NMN-Größe bei gleicher Menge, Geschenk ab Staffelstart aus) steht nur in Commit-Messages. Kurzer Abschnitt in `pdp-system.md` oder `theme-status.md` reicht, plus Rückbau-Notiz für nach der Aktion.
- **Pilotpraxis**: Zwei `.liquid`-Page-Templates und `docs/pilotpraxis/` (Vorschau, `bauen.py`, 5 MB Video, PDF) ohne README. Unklar, ob `bauen.py` die Templates erzeugt.
- **`scripts/`**: `check-heading-system.js` und `fetch-image.js` sind nirgends dokumentiert; `fetch-image.js` braucht `UNSPLASH_ACCESS_KEY` in `.env`.
- **Skills**: `.agents/skills/ux-design` (aus `civitai/civitai`, laut `skills-lock.json`) ist in `.claude/skills` nicht verlinkt, `frontend-design` schon. Zweck unklar.

## 3. Code-Organisation

- **Ungenutzte Sections:** 111 von 254 Sections stehen in keinem Template, keiner Section-Gruppe und keinem `{% section %}`. Nach Abzug der per JS genutzten (`helper-*`, `cart-recommendations`, `product-quick-view`) und Combine-Standard bleiben klare Kandidaten:
  - **NMN-PDP v2 (11):** `nmn-pdp-v2-benefit-strip`, `-faq`, `-final-cta`, `-guarantee`, `-media-trust`, `-science-quality`, `-social-proof`, `-sticky-bar`, `-timeline`, `-upsell`, `nmn-pdp-quality-trust`
  - **Section-Store-Importe (20):** alle `ss-*`
  - **lt-PDP/HP/LP-Altstände (~35):** u. a. `lt-pdp-compare`, `lt-pdp-mechanism`, `lt-pdp-process`, `lt-pdp-shelf`, `lt-pdp-testimonials`, `lt-hp-problem`, `lt-hp-problem-v2`, `lt-hp-loop`, `lt-hp-journey`, `lt-lp-*`, `lt-page-*`, `lt-campaign-*`
  - **Ohne Preset und ohne Verweis (nicht mal im Editor wählbar):** `bekannt-aus`, `longevity-start`, `hero-lifetime-test`, `main-blog` (ersetzt durch `lt-blog-index`), `main-article*` (ersetzt durch `lt-article`)
  - Liste: `grep`-Lauf im Audit, wiederholbar mit `for s in sections/*.liquid …`
- **Ungenutzte Snippets (3):** `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle`.
- **`package.json`:** `lucide-react` wird nirgends genutzt (Theme ist Vanilla JS, Icons sind Phosphor) → entfernen. `dotenv` nur für `fetch-image.js`.
- **Skripte im falschen Ordner:** `docs/blog-cover-generator.py`, `docs/blog-svg-generator.py`, `docs/push-dashboard.py`, `docs/push-dashboard-note.py` (+ zwei JSON) gehören nach `scripts/`.
- **`.gitignore` greift nicht:** `.cursor/commands.json`, `.cursor/mcp.json` sind ignoriert, aber getrackt (enthalten keine Secrets). `.playwright-mcp/` (vier Konsolen-Logs vom 02.04.2026) und `.impeccable/critique/` sind getrackt und haben im Repo keinen Nutzen.

## 4. Archivieren oder verschieben

| Was | Wohin |
|---|---|
| `docs/entwurf-*` (27 HTML, 13 Unterordner, Bilder, Font) aus Oktober/November, soweit umgesetzt | `docs/archive/drafts/` (Ordner existiert) |
| Bilder lose in `docs/` (`cover-*.png` ×8, `entwurf-*.jpg/.webp` ×7, `entwurf-ag1-instrument-serif.woff2`) | zum jeweiligen Entwurf oder `docs/archive/` |
| `docs/ag1-hero-analyse-2026-10-26.md`, `mobile-lp-audit-2026-06-04.md`, `geo-*-2026-07-29.md`, `blog-produktpositionierung-2026-08-06.md`, `documentation-system-audit-2026-07-10.md` | `docs/archive/` |
| `docs/pdp-startprompt.md`, `ueber-lifetime-rebuild-prompt.md`, `age-dna-geo/PROMPT-*` | `docs/archive/prompts/` (Ordner existiert), falls nicht mehr aktiv |
| Ungenutzte Sections/Snippets aus Abschnitt 3 | `_archive/2026-11-xx_section-cleanup/` (nach Abgleich mit dem Live-Theme) |
| `.playwright-mcp/` | löschen und in `.gitignore` |
| `docs/pilotpraxis/img/*.mp4` (5 MB + Test-Video) | außerhalb von Git oder Shopify Files |

`docs/` ist 42 MB groß, fast alles Entwürfe und Medien. Ein Aufräumlauf würde die aktive Doku auf die Dateien aus der CLAUDE.md-Tabelle plus wenige Specs reduzieren.
