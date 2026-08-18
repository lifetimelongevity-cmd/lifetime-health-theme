---
status: living
last_review: 2026-08-18
canonical_for: theme-housekeeping-report-2026-08-18
---

# Theme Housekeeping Audit — 2026-08-18

Scheduled cleanup review of the repo: markdown docs, code organization, unused files. Read-only findings, no changes applied. Builds on `docs/documentation-system-audit-2026-07-10.md` — several items flagged there are still open five weeks later.

## 1. Markdown cleanup needed

**Broken/dangling references:**
- `docs/PDP-DNA-UPGRADE/README.md:30` cites `docs/age-dna-product-fact-sheet.md` as "kanonisch" — file does not exist.
- `docs/geo-action-plan.md` frontmatter `depends_on:` lists `docs/geo-p0-url-decision-list-2026-07-29.md` — does not exist.
- `docs/science-blueprint-v1.1.md` (lines 81, 203, 235, 274) uses hardcoded local absolute paths (`/Users/benediktjunker/lifetime-health-theme/...`) as file:line pointers instead of relative paths — not portable.

**Ready to archive now** (per each file's own stated supersession condition):
- `docs/nmn-pdp-umsetzung-status.md` — text says it supersedes itself once live+QA-confirmed; it now states "LIVE seit 24.07. abends, QA grün." Condition met, move to `docs/archive/`.

**Stale despite "living" status:**
- `docs/theme-status.md` — `last_review: 2026-05-08`, over three months old, but the repo has newer activity through 2026-08-16 (PDP-DNA-UPGRADE, GEO cluster, quiz template split) that it doesn't reflect. This is the canonical status doc per `docs/README.md`; it should be the freshest file in the repo, not the stalest.

**Overlapping/sprawling topic clusters** (not exact duplicates, but should be consolidated or explicitly cross-linked):
- GEO planning: `docs/geo-strategy.md`, `docs/geo-action-plan.md`, `docs/geo-wettbewerbsanalyse-2026-08-03.md` — three separate docs, only the first is indexed in `docs/README.md`.
- PDP-refit artifacts: `docs/briefing-pdp-refit.md`, `docs/pdp-supplement-rollout.md`, `docs/pdp-copy-deck.md` — same effort, three unlinked top-level files, none indexed.

**Inconsistent metadata:** `docs/design-icon-system.md`, `docs/homepage-blueprint-v2.md`, `docs/homepage-copy-v2.md`, `docs/science-blueprint-v1.1.md`, `docs/science-copy-v1.1.md` lack the `status/last_review/canonical_for` frontmatter that `theme-status.md` claims is rolled out on all living specs.

No broken relative markdown links found elsewhere; root docs (`AGENTS.md`, `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, `shopify/AGENTS.md`) all cite paths that resolve.

## 2. Documentation gaps

- `docs/README.md`'s index (Active Core/Supporting tables + topic buckets) does not list several current, non-archived files: `briefing-pdp-refit.md`, `pdp-copy-deck.md`, `pdp-supplement-rollout.md`, `nmn-pdp-umsetzung-status.md`, `documentation-system-audit-2026-07-10.md`, `geo-action-plan.md`, `geo-wettbewerbsanalyse-2026-08-03.md`, `design-icon-system.md`, and the entire `docs/PDP-DNA-UPGRADE/` folder (7 files, dated as recently as 08-16) and `docs/cluster2-blog/` folder. Anyone navigating from `docs/README.md` alone would miss the newest work in the repo — the index is the main gap, not the content underneath it.
- `nmn-angebotsarchitektur.md` is only cross-referenced from root `CLAUDE.md`, not from `docs/README.md`.
- Code-reference spot checks all passed: sections and templates cited by `live-pages-map.md`, `PDP-DNA-UPGRADE/`, and `nmn-pdp-umsetzung-status.md` exist as named.

## 3. Code organization issues

**Sections with no reference found anywhere** (grep across `templates/*.json` and `{% render %}`/`{% section %}` calls; heuristic, dynamic rendering could produce false positives, but no indirect usage found):
- `sections/testimonials.liquid`, `sections/ss-testimonial-12.liquid`, `sections/ss-testimonials-2.liquid`, `sections/lt-pdp-testimonials.liquid`, `sections/hero-lifetime-test.liquid` — the live testimonials page (`templates/page.testimonials.json`) uses a generic `slider` section instead.
- `sections/lt-hp-problem.liquid` — superseded by `sections/lt-hp-problem-v2.liquid`, which is what the homepage actually uses. Pre-revision leftover.
- `sections/ss-feature-13-78ff35.liquid`, `sections/ss-product-ingredients-6-4b8554.liquid`, `sections/ss-steps-12-5aedcd.liquid` — theme-editor duplicate artifacts (hash-suffixed names), zero references. Note: hash-suffix alone isn't disqualifying — `featured-collection-tabs-3-1fb80a.liquid` has the same naming pattern and is live.

**Unreferenced assets:** `assets/component-collection-tabs.js`, `assets/component-recently-viewed.js` — no `<script src>` in `layout/theme.liquid`, no matching custom-element tag found anywhere.

**`/scripts/` — functional but not automated:** `check-heading-system.js` (heading-stack lint) and `fetch-image.js` (Unsplash sourcing, documented in `docs/design-governance.md`) are both legitimate and still relevant, but `package.json` has no `"scripts"` entry and there's no CI — they only run if someone remembers the exact `node scripts/x.js` command.

**Dependency cleanup:** `package.json` declares `lucide-react` (^1.7.0), which pulls a phantom `react` peer dependency into `package-lock.json`. It is never imported — icons are hand-copied as inline SVG per `sections/lt-benefits.liquid`'s own schema instructions. Dead weight for a no-build Liquid theme; safe to drop. `dotenv` is legitimately used by `fetch-image.js`.

## 4. Files to archive or move

- **`.playwright-mcp/`** — 21 tracked files, all browser console logs and page snapshots timestamped `2026-04-02T2...`. This is stray debugging output from an MCP browser session, committed to git and **not covered by `.gitignore`**. Should be removed from tracking and added to `.gitignore`.
- `docs/nmn-pdp-umsetzung-status.md` → `docs/archive/` (see §1, supersession condition already met).
- No issues found in `.cursor/rules/`, `.agents/skills/`, or `.impeccable/` — all are legitimate, intentional config matching what `CLAUDE.md` documents.
- `_archive/` and `docs/archive/` themselves are well-maintained: both have explanatory README.md files. The gap is upstream (files that qualify for archiving per their own text haven't been moved yet), not in the archive folders.

## Not touched in this pass

This was a read-only survey. No files were moved, archived, or deleted — recommendations above need a decision (especially the sections/assets flagged as unreferenced, since grep-based detection can miss dynamic rendering paths) before acting.
