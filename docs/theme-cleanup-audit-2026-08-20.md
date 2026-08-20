---
status: living
last_review: 2026-08-20
canonical_for: theme-folder-cleanup-audit-2026-08-20
---

# Theme Folder Cleanup Audit — 2026-08-20

Scheduled housekeeping pass over the repo: markdown hygiene, documentation-vs-code drift, unused/orphaned code, and stray files. This is a point-in-time report, not living guidance — treat findings as a punch list, then archive this file once acted on (see `docs/documentation-system-audit-2026-07-10.md` for the precedent).

## 1. Markdown cleanup needed

| File | Issue | Recommendation |
|---|---|---|
| `docs/theme-status.md` | TODO #9 references `templates/product.legacy-13-2-nmn.json`, which doesn't exist. Also links four dead files: `docs/age-dna-product-fact-sheet.md`, `docs/geo-p0-technical-audit-2026-07-29.md`, `docs/geo-p0-url-decision-list-2026-07-29.md`, `docs/geo-prompt-checkpoint-2026-08-14.md`. | Update — verify/remove the ghost-template TODO, fix or remove the dead links. |
| `docs/science-blueprint-v1.1.md` | Four links use an author's personal absolute machine path (`/Users/benediktjunker/lifetime-health-theme/...`) instead of repo-relative paths (lines ~23, 81, 203, 235, 274). | Update — convert to repo-relative paths. |
| `docs/README.md` | "Active Supporting Docs" table (last reviewed 2026-07-10) predates and omits an entire wave of newer active docs: `docs/PDP-DNA-UPGRADE/*`, `docs/briefing-pdp-refit.md`, `docs/nmn-pdp-umsetzung-status.md`, `docs/pdp-copy-deck.md`, `docs/pdp-supplement-rollout.md`, `docs/nmn-angebotsarchitektur.md`, `docs/collection-all-spec.md`, `docs/geo-*` files, `docs/cluster2-blog/*`, `docs/age-dna-geo/*`, `docs/nmn-blog-geo/*`. Also now competes with CLAUDE.md's Rules Index as "the" doc index. | Update — refresh the index, or fold it into CLAUDE.md's Rules Index and archive this file to avoid two competing indexes. |
| `docs/documentation-system-audit-2026-07-10.md` | A prior one-time audit report, 6+ weeks old, still sitting in active `docs/` rather than `docs/archive/`. Its flagged items (see below) are still unresolved. | Archive to `docs/archive/` once its open items are resolved (or mark `status: archived` now). |
| `docs/shopify-rules.md` vs `shopify/AGENTS.md` vs `.cursor/rules/shopify-rules.mdc` | Three files describing the same platform rules; flagged as redundant in the 2026-07-10 audit and still unresolved. Neither `docs/shopify-rules.md` nor the `.mdc` is a strict superset of the other (see §2). | Merge — consolidate into one direction (docs → `.mdc`, matching CLAUDE.md's stated hierarchy) instead of hand-maintaining two diverging copies. |
| PDP doc sprawl | 6+ active PDP docs with overlapping scope and no cross-map: `docs/pdp-system.md`, `docs/PDP-DNA-UPGRADE/*` (8 files), `docs/briefing-pdp-refit.md`, `docs/nmn-pdp-umsetzung-status.md`, `docs/pdp-copy-deck.md`, `docs/nmn-pdp-evidence-base.md`, `docs/pdp-supplement-rollout.md`. Not exact duplicates (each has a distinct `canonical_for`), but no map of which governs what. | Add a short "PDP docs map" to `docs/README.md` or `docs/pdp-system.md`. |
| `_archive/2026-07-23_nmn-template-cleanup/README.md` | Cites `docs/nmn-angebotsarchitektur.md §12` for pricing rationale, but §12 there is actually "Offene Punkte" — stale cross-reference. | Minor fix. |
| `.cursor/rules/pdp-architecture.mdc` | Section map intentionally outdated, psychological model kept — already correctly caveated in `AGENTS.md` and the 2026-07-10 audit. | Leave as-is. |
| `docs/age-dna-geo/*` (12 files), `docs/nmn-blog-geo/*` (7 files) | Not individually link-checked this pass (time-boxed) — likely fine as dated point-in-time GEO artifacts. | Spot-check next pass. |

## 2. Documentation gaps

| File | Gap | Recommendation |
|---|---|---|
| `docs/pdp-system.md` | Section counts/lists are stale vs. actual templates. Doc claims NMN PDP has 11 `order` entries and AGE&DNA has 14; actual `templates/product.nmn-pulver.json` has 13 and `templates/product.age-dna-test.json` has 16. Three (AGE&DNA) / two (NMN) instances of `lt-pdp-final-cta.liquid` (as `cta_band_report`, `cta_band_reviews`, `cta_band_loox`/`cta_band_labor`) are live but undocumented. | Re-derive both tables from current template JSON; document `lt-pdp-final-cta` as a recurring role. |
| `.cursor/rules/section-heading-stack.mdc` vs `docs/section-heading-stack.md` | The `.mdc` — which CLAUDE.md names as tier-4 canonical — only documents a raw-HTML pattern and never mentions `snippets/section-heading-crs.liquid`, which `docs/section-heading-stack.md` calls "the only official method" and which is actually used in 26 section files. **The canonical file is the stale one.** | Port the snippet-based guidance into the `.mdc` so the file CLAUDE.md points to isn't out of date. |
| `docs/shopify-rules.md` vs `.cursor/rules/shopify-rules.mdc` | Neither is a strict superset: the `.mdc` has newer platform-limit rules (header `content` length, `{% liquid %}` `continue` bug, blog rich-text block limits) that `docs/` lacks; `docs/` has a more detailed empty-`default` checklist the `.mdc` lacks. | Merge one direction only (per CLAUDE.md's hierarchy, docs/ should feed into `.mdc`). |
| `docs/README.md` vs `CLAUDE.md` | Disagree on doc hierarchy. CLAUDE.md: live pages → `live-pages-map.md` → `_examples/` → `.cursor/rules/`, and doesn't mention `docs/pdp-system.md`, `docs/shopify-rules.md`, `docs/design-components.md`, `docs/section-heading-stack.md` as authoritative at all. `docs/README.md` gives a different 6-tier hierarchy inserting `docs/pdp-system.md` above `.cursor/rules/*.mdc`, and lists overlapping doc/`.mdc` pairs as co-canonical without saying which wins. | Pick one hierarchy document as authoritative; have the other point to it. |
| `docs/live-pages-map.md` | Science-page asset note points to `docs/svg-src/`, which doesn't exist — SVGs actually live split across `docs/blog-svg/`, `docs/age-dna-geo/svg-src/`, `docs/cluster2-blog/svg-src/`, `docs/nmn-blog-geo/svg-src/`. Everything else spot-checked (e.g. `lt-expert-scope`/`lt-pdp-final-cta` usage claims) held up correctly. | Fix the path reference or note the per-topic split. |
| `docs/` root structure | 49 loose files directly in `docs/` root mix markdown specs with PNG cover images, standalone `.py` generator scripts, dashboard `.json`/`.html` files, and prompt drafts — no `assets/`/`scripts/`/`covers/` subfolder to separate build artifacts from specs. | Move loose `.py`/`.png`/`.html` files into topic or `tools/`/`assets/` subfolders; keep `docs/` root to markdown specs. |

## 3. Code organization issues

Sections/snippets were checked by grepping for references in `templates/*.json`, section groups, and `{% render %}`/`{% section %}` calls. This catches direct references but not fully dynamic ones — treat as a strong signal, spot-verify before deleting.

**Orphaned sections — ~90 of 211 flagged (exhaustive grep, hand-verified a sample).** Highest-confidence groups, safe to remove after a manual double-check:
- **Abandoned "NMN PDP v2" build (9 sections + 3 snippets)**: `nmn-pdp-v2-benefit-strip`, `-faq`, `-final-cta`, `-guarantee`, `-media-trust`, `-science-quality`, `-social-proof`, `-sticky-bar`, `-timeline`; snippets `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle`. The live NMN template uses `lt-pdp-*`/`crs-*` instead. (The string `nmn-pdp-v2` appears in `main-product.liquid`/`theme.liquid` only as a CSS class, not a render call — verified as a false-positive trap, genuinely unused.)
- **Stock Combine theme leftovers**: `main-article`, `main-article-comments`, `main-article-navigation`, `main-blog` — confirmed superseded by custom `lt-article`/`lt-blog-index`. (`main-gift-card` is still used — not orphaned.)
- **Unused stock demo sections**: 19 of 25 `ss-*` files (`ss-hero-pro`, `ss-testimonial-12`, `ss-flexible-tabs`, `ss-circle-menu`, `ss-progress-circles`, `ss-video-slider`, etc.) — never adopted for Lifetime Health, good bulk-removal candidate.
- **`lt-pdp-*`/`crs-*` cluster with zero references**: `lt-pdp-testimonials`, `lt-pdp-expert` (only mentioned in a code comment, not rendered), `lt-pdp-mechanism`, `lt-pdp-trust-mechanism`, `lt-pdp-a2-aufklaerungs-bruecke`, `lt-pdp-a3-process-press`, `crs-guarantee-block`, `crs-knowledge-base`, `crs-social-quotes`, `crs-timeline`.
- **Lower-confidence, worth manual review**: `before-after`, `countdown`, `image-with-hotspots`, `shop-the-look`, `scrolling-images`, `product-quick-view`, `result-preview`, several `lt-lp-*`/`lt-hp-*` variants.

**Orphaned snippets — 3 of 79** (well-maintained overall): `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` (same abandoned NMN-v2 build above).

**Unused assets — 6 of 133** (clean overall): JS `component-collection-tabs.js`, `component-recently-viewed.js`; CSS `lifetime-collection-grid.css`; images `lt-science-hero.jpg`, `lt-science-limmroth.jpg`, `science-healthspan-kurve.svg`.

**`/scripts/`**: `check-heading-system.js` (active heading-markup linter) and `fetch-image.js` (Unsplash fetch helper) are current (touched ~8 days ago) but not wired into `package.json`'s `scripts` field, so they're not discoverable via `npm run`. Minor — add npm script entries.

**Dead dependency**: `package.json` lists `lucide-react` (plus `react` as a peer in the lockfile), but CLAUDE.md states the theme is "Vanilla ES6+, no framework," and grep found zero usages in `.js`/`.liquid` files. Recommend removing unless it feeds a build step outside this repo.

## 4. Files to archive or move

| Item | Observation | Recommendation |
|---|---|---|
| `.playwright-mcp/` (22 files) | Console logs and page snapshots from a single 2026-04-02 Playwright MCP session, all git-tracked. Classic ephemeral test-run output, not covered by `.gitignore`. | **Delete from git tracking + add `.playwright-mcp/` to `.gitignore`.** Clearest hygiene issue found this pass. |
| `.impeccable/` (2 files) | Local design-lint tool state/cache (`config.json`, `design.json`), git-tracked. | Add to `.gitignore` unless intentionally versioned for reproducibility — confirm with owner before removing. |
| `.cursor/agent-images/*.png` | Single orphaned screenshot with a random hash filename, tracked in git, no reference anywhere. | Delete, or move into `docs/` if it illustrates something documented. |
| `.agents/skills/ux-design` | Sourced from `civitai/civitai` per `skills-lock.json` — an unusual provenance for a Shopify theme repo. | Confirm this is a deliberate, trusted install; not clearly a problem, just worth a sanity check. |
| `docs/documentation-system-audit-2026-07-10.md` | Historical one-time audit, not living guidance. | Move to `docs/archive/` once its open items (shopify-rules overlap, icon-system tightening) are resolved. |
| This file (`docs/theme-cleanup-audit-2026-08-20.md`) | Point-in-time report, same category as the above. | Archive to `docs/archive/` once acted on. |

**Not an issue — confirmed clean:**
- `_archive/` (`2026-05-19_quiz-cleanup`, `2026-07-23_nmn-template-cleanup`) is well-organized, each with a README explaining rationale; no duplication with the active tree.
- `_examples/`, `shopify/`, `config/` are intentional and current.
- No stray root files (no `.DS_Store`, no editor temp files, no duplicate lockfiles).

## Summary

The repo is in reasonable shape overall (asset hygiene is good, `_archive/` and `_examples/` are well-governed), but four things are worth near-term attention:

1. **Two ephemeral tool-output directories are committed to git** (`.playwright-mcp/`, `.impeccable/`) — the single clearest fix, low risk, high value.
2. **The doc hierarchy has drifted**: `docs/README.md` and `CLAUDE.md` disagree on which docs are canonical, and at least two `docs/*.md` ↔ `.cursor/rules/*.mdc` pairs have diverged in opposite directions (each has info the other lacks) — including `section-heading-stack.mdc`, where the file CLAUDE.md names as canonical is actually the stale one.
3. **An abandoned "NMN PDP v2" build** (9 sections, 3 snippets) plus ~23 unused stock Combine-theme sections are strong, low-risk deletion candidates (~35 files) — verify manually before removing since detection was grep-based, not exhaustive for dynamic references.
4. **`docs/pdp-system.md`'s section tables are out of sync** with the live product templates (missing the recurring `lt-pdp-final-cta` role), which matters given CLAUDE.md marks this file as governing live PDP section order.

No action has been taken on any of these — this report is informational. Confirm before deleting sections/snippets or untracking directories.
