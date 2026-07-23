---
status: living
last_review: 2026-05-08
canonical_for: theme-massnahmen-tracker
---

# LIFETIME Theme — Status & Anpassungen

> Living-Dokument für alle Theme-Anpassungen, Section-Refactors, Design-System-Änderungen und Lessons.
> **Letzte Änderung:** 2026-05-08 · **Nächster geplanter Touchpoint:** offen
>
> Bei jeder Theme-Session: Eintrag im **Änderungs-Log** unten anhängen (neueste zuerst), TL;DR und To-Dos oben aktualisieren, alte erledigte To-Dos rauswerfen. Pendant zu `lifetime-ads/google-ads-status.md` für die Ads-Domäne.

---

## TL;DR — Aktueller Stand (2026-05-08)

1. **Heading-Stack-Drift im Theme dokumentiert.** Snippet `snippets/section-heading-crs.liquid` neu, Rule in `docs/section-heading-stack.md` zeigt Snippet als kanonisch. `_examples/sections/*.liquid` (benefits, stat-callout, reviews, quote) wurden auf `crs-heading-stack`-Pattern refaktorisiert.
2. **Drift-Hotspots in Live-Templates identifiziert** (per Shopify-MCP gegen die aktiv ausgelieferten Templates abgeglichen):
   - **`lt-pdp-hero`** (in 13 aktiven Produkt-Templates) — größter Hebel, Refactor steht aus.
   - `lt-hp-problem-v2`, `lt-hp-trust-ticker` (Homepage).
   - `ss-video-slider` (20×, 5 Templates), `ss-flip-cards`, `ss-social-proof`, `ss-product-ingredients-2`, `ss-comparison-table-24`, `ss-flexible-tabs`, `ss-feature-1`, `ss-steps-5` — alle ohne `crs-heading-stack`.
3. **Sauber (kein Refactor nötig):** Alle `crs-*`-Sections, `lt-pdp-process-steps`/`lt-pdp-report-preview`/`lt-pdp-ideal-candidate` (Test-PDP), `lt-science-*`-Sections, die meisten `lt-hp-*`-Sections.
4. **Frontmatter-Konvention** (`status / last_review / canonical_for / supersedes`) auf allen lebenden Specs in `docs/` ausgerollt.
5. **Workspace-Cleanup 2026-07-10** bündelt veraltete Briefings, Prompts und Root-Level-Reste unter `docs/archive/` und trennt sie von aktiver Guidance.

---

## Offene To-Dos (priorisiert)

1. **`lt-pdp-hero` auf `section-heading-crs`-Snippet umstellen.** Höchster Hebel: Section läuft auf jeder aktiven PDP, kalter Search-Traffic landet hier zuerst. Visuelles Resultat: Title und Subline werden ein Block, Subline nur via Opacity zurückgenommen.
2. **Homepage-Hotspots:** `lt-hp-problem-v2` und `lt-hp-trust-ticker` auf Snippet umstellen.
3. **`ss-*`-Sections:** entscheiden, ob refactoren oder als Combine-Theme-Erbe akzeptieren. Falls aktiv refactoren: mit `ss-video-slider` (höchste Nutzungsfrequenz) starten.
4. **NMN-Kapsel-PDP-Status klären:** Storefront zeigt `lifetime-nmn-kapseln` noch ACTIVE. Brand-Basis sagt phased-out. Storefront-Status synchronisieren.
5. **Template-Geister-Files entscheiden:** `templates/page.stack-builder.json` und `templates/product.legacy-13-2-nmn.json` referenzieren Sections, die in keinem Live-Produkt/Page eingesetzt sind. Entweder aktivieren oder archivieren.

---

## Setup

| Feld | Wert |
|---|---|
| Theme | Combine v3.1.1 (KrownThemes), customized für LIFETIME |
| Aktive Theme-ID | `192529400183` (`lifetime-genesis-2026-APR`) |
| Shopify Shop | `lifetime-health-de.myshopify.com` |
| Domain | `lifetime-health.de` (.com leitet weiter) |
| Push-Tooling | Theme Manager.app (täglich genutzt) |
| Eintrittstür | `lifetime-health-theme/CLAUDE.md` → `AGENTS.md` |
| Heading-System | `assets/crs-section-headings.css` + `snippets/section-heading-crs.liquid` |
| Design-Rules | `docs/design-governance.md`, `docs/design-components.md`, `docs/section-heading-stack.md`, `.cursor/rules/shopify-rules.mdc`, `docs/pdp-system.md` |
| Visual Reference | `_examples/pdp-reference.html`, `_examples/sections/*.liquid` |

---

## Heading-Stack-Compliance (Stand 2026-05-08)

Stichprobe von 39 LT/CRS/SS-Sections in 33 Live-Templates, gegen `crs-heading-stack`-Pattern geprüft.

**Compliant (✓):**
crs-* (alle), lt-longevity-chapter, lt-comparison-table, lt-pdp-process-steps, lt-pdp-report-preview, lt-pdp-ideal-candidate, lt-science-hero, lt-science-hallmarks, lt-science-messebenen, lt-hp-science, lt-hp-video-authority, lt-hp-loop, lt-hp-product-hero, lt-hp-social-proof, lt-hp-journey.

**Drift (✗):**
lt-pdp-hero, lt-hp-problem-v2, lt-hp-trust-ticker, lt-science-bento, lt-guide-toc, alle ss-* (ss-video-slider, ss-flip-cards, ss-social-proof, ss-product-ingredients-2, ss-comparison-table-24, ss-flexible-tabs, ss-feature-1, ss-steps-5).

**Ignorier-Liste (Combine-Core, nicht LIFETIME-built):**
rich-text, text-columns-images, text-columns-icons, content-toggles, slideshow, info-tabs, flex-grid, custom-liquid, featured-collection, featured-product, marquee, blog-posts, contact-form, divider, video, scrolling-images, slider, media-with-text-overlay, promotion-cards, text-columns, product-recommendations.

---

## Änderungs-Log

### 2026-05-08 — Heading-Stack-Snippet, Workspace-Cleanup, Frontmatter-Rollout

**Was passiert ist:**

- **Neues Snippet `snippets/section-heading-crs.liquid`** angelegt. Kapselt `crs-heading-stack` + `__pair`-Wrapper. API: `heading`, `subheading`, `kicker`, `align`, `on_dark`, `headline_lg`, `heading_tag`, `extra_class`, `modifier`. Strukturell unmöglich, den `__pair`-Wrapper zu vergessen.
- **Rule `docs/section-heading-stack.md` aktualisiert:** ✅-Variante ist jetzt das Snippet, Inline-HTML bleibt als Fallback für Spezialfälle.
- **`_examples/sections/{benefits,stat-callout,reviews,quote}.liquid`** auf `crs-heading-stack`-Pattern refaktorisiert. Quote bleibt bewusst ohne Heading. Illegal-leere Schema-Defaults (`"default": ""`) entfernt.
- **Live-Drift-Scan** mit Shopify-MCP: 33 aktive Templates identifiziert, 39 LT/CRS/SS-Sections gegen Pattern gecheckt → 14 Drift-Hotspots dokumentiert (siehe Tabelle oben).
- **Frontmatter-Konvention** auf 19 lebende Specs ausgerollt (`status: living | superseded | archived`).
- **Workspace-Cleanup:** veraltete Root-Level-Files, superseded Blueprints und One-off-Prompts nach `docs/archive/` verschoben; `_archive/` bleibt fuer code-/asset-bezogene Altstaende.

**Was bewusst nicht angefasst wurde:**

- **Kein Refactor an Live-Sections.** Snippet ist verfügbar, aber `lt-pdp-hero` und Co. wurden nicht angefasst — User wollte erst Struktur, dann Code.
- `templates/page.stack-builder.json` und `templates/product.legacy-13-2-nmn.json` blieben unverändert (nicht live, kein Drift-Impact).

**Nächste Session:**

- Entscheidung über `lt-pdp-hero`-Refactor (PDP-Hero auf jeder aktiven PDP).
- NMN-Kapsel-Storefront-Status checken.
