---
status: living
last_review: 2026-08-07
canonical_for: documentation-housekeeping-report-2026-08-07
---

# Documentation & Repo Cleanliness Audit — 2026-08-07

Scheduled housekeeping pass over the full theme repo (60 markdown files, `/assets`, `/sections`, `/snippets`, `/blocks`, `/scripts`, `/_archive`, `.playwright-mcp/`). This is a report only — no files were moved, edited, or deleted as part of this pass. See `docs/documentation-system-audit-2026-07-10.md` for the prior audit; several items below are still-open follow-ups from that one.

## 1. Markdown cleanup needed

- **`docs/theme-status.md` is stale.** `status: living`, but `last_review: 2026-05-08` — three months old despite heavy activity since (Aug PDP refit, GEO work, NMN rollout). It has been functionally superseded by `docs/nmn-pdp-umsetzung-status.md` (last_review 2026-07-24) and `docs/pdp-system.md` (last_review 2026-07-29), but was never marked `superseded` or updated. Needs either a refresh or an explicit `status: superseded` pointer to its replacements.
- **Dead file references inside active docs:**
  - `docs/theme-status.md` → `templates/product.legacy-13-2-nmn.json` (doesn't exist)
  - `docs/theme-status.md`, `docs/mobile-lp-audit-2026-06-04.md` → `lifetime-ads/google-ads-status.md` (sibling repo, not in this codebase)
  - `docs/homepage-blueprint-v2.md` → `shopify/templates/product.13_3_nmn.json`, `product.14_1_test.json`
  - `shopify/AGENTS.md`, `docs/archive/pdp-drafts/pdp-blueprint-v3-14_1_test.md` → `shopify/templates/product.13_3_nmn.json` (renamed; current file is `templates/product.nmn-pulver.json`)
  - `docs/nmn-angebotsarchitektur.md`, `docs/nmn-blog-geo/nmn-blog-playbook.md` → `templates/product.13_nmn.json`
  - `docs/geo-action-plan.md` → `docs/geo-prompt-baseline-2026-07-29.md`, `docs/geo-prompt-panel.md`, `docs/geo-002-ga4-ai-referral-report-2026-07-29.md`, `docs/geo-p0-url-decision-list-2026-07-29.md` (none exist)
  - `docs/age-dna-geo/BRIEFINGS-age-cluster-2026-08-03.md` → `docs/geo-claim-ledger.md` (doesn't exist)
  - `docs/lifetime-doctor-quiz-spec.md` → `lifetime-produktdetails/produktdetails-age-dna-test.md` (sibling repo)
  - `docs/science-blueprint-v1.1.md` — 4 links use a hardcoded absolute local path from another machine (`/Users/benediktjunker/lifetime-health-theme/...`), effectively broken for anyone else
  - By contrast, `docs/live-pages-map.md` was spot-checked in full (19 referenced paths) and is **100% accurate** — well maintained, no action needed.
- **Unresolved from the prior audit:** `docs/shopify-rules.md` was flagged on 2026-07-10 as redundant with `shopify/AGENTS.md` + `.cursor/rules/shopify-rules.mdc` and marked "review later for possible archival." That review never happened; the file is still active a month later.
- **Draft-status docs that may need a decision:** 6 files in `docs/nmn-blog-geo/` still carry `status: draft` — `01-ist-nmn-in-deutschland-legal.md`, `02-nmn-qualitaet-erkennen.md`, `04-nmn-vs-nr.md`, `09-uthever-nmn.md`, `10-novel-food-efsa-verfahren.md`, `11-nmn-in-der-welt.md`. `docs/geo-strategy.md` has two unresolved inline `TODO`s (lines 116, 118).

## 2. Documentation gaps

- **`docs/README.md` index is out of date.** `last_review: 2026-07-10`; it does not list 6 docs created/updated since then that are actively referenced elsewhere: `docs/briefing-pdp-refit.md`, `docs/pdp-copy-deck.md`, `docs/pdp-supplement-rollout.md`, `docs/nmn-pdp-umsetzung-status.md`, `docs/geo-action-plan.md`, `docs/geo-wettbewerbsanalyse-2026-08-03.md`.
- **`CLAUDE.md`'s "Rules Index" table** omits the `.md` human-readable companions (`docs/design-components.md`, `docs/section-heading-stack.md`) that `docs/README.md` and `AGENTS.md` both list alongside their `.mdc` counterparts — a reader relying only on CLAUDE.md would miss them.
- **17 docs lack `status:` frontmatter** despite the repo's convention of using it elsewhere, including some that plausibly should have it: `docs/design-governance.md`, `docs/conversion-messaging.md`, `docs/design-icon-system.md`, `docs/homepage-blueprint-v2.md`, `docs/homepage-copy-v2.md`, `docs/science-blueprint-v1.1.md`, `docs/science-copy-v1.1.md`.
- No hard contradictions found between `CLAUDE.md`, `AGENTS.md`, and `shopify/AGENTS.md` — the source-of-truth hierarchy is stated consistently across all three.

## 3. Code organization issues

- **6 orphaned assets** (zero references anywhere outside `/assets` itself), ~217 KB of unused images among them:
  - `assets/component-collection-tabs.js`
  - `assets/component-recently-viewed.js`
  - `assets/lifetime-collection-grid.css`
  - `assets/lt-science-hero.jpg`
  - `assets/lt-science-limmroth.jpg`
  - `assets/science-healthspan-kurve.svg`
- **10 confirmed-dead sections** (no template, no `{% section %}`/`{% render %}` call anywhere):
  - `sections/hero-lifetime-test.liquid` — leftover variant next to the live `sections/hero-lifetime-section.liquid`
  - The entire `nmn-pdp-v2-*` family (9 files): `nmn-pdp-v2-timeline`, `-benefit-strip`, `-upsell`, `-sticky-bar`, `-media-trust`, `-faq`, `-science-quality`, `-final-cta`, `-guarantee`, `-social-proof` — reads as a superseded PDP-v2 draft package
- **~55 additional sections with no static reference**, mostly stock KrownThemes boilerplate the theme has replaced with custom equivalents (`main-article*.liquid`, `main-blog.liquid` vs. the custom `lt-article`/`lt-blog-index` actually used) and unreferenced `ss-*` stock sections (17 of 25 `ss-*` files have no template using their `type`). These were **not individually confirmed dead** — some Shopify sections load dynamically via `?section_id=` (confirmed this is genuinely happening for several `helper-*` sections used by `component-cart.js`, `component-product-form.js`, `component-predictive-search.js`, `component-localization-form.js`, `snippets/quick-buy.liquid`). Needs a manual pass per file before any deletion.
- **Unused npm dependency:** `package.json` lists `lucide-react`, a React icon library, in a framework-free Liquid theme. The only "lucide" mention in the codebase is a content-editor hint string inside `sections/lt-benefits.liquid`'s schema, not actual code. This exact contradiction was already flagged in the 2026-07-10 audit and is still unresolved.
- **Unreferenced script:** `scripts/check-heading-system.js` — no docs, no `package.json` script entry, no CI (there is no `.github/` workflow in this repo at all). `scripts/fetch-image.js`, by contrast, is documented and used per `docs/design-governance.md`.

## 4. Files to archive or move

- **`.playwright-mcp/` (21 files, ~732 KB) is committed to git and shouldn't be.** Contents are Chrome-MCP/Playwright debug artifacts (console logs + accessibility-tree snapshots) all timestamped from a single 2026-04-02 session. Not referenced by any doc, script, or config. Recommend deleting the directory and adding `.playwright-mcp/` to `.gitignore` (which currently only excludes `.DS_Store`, `node_modules/`, `.env*`, `.cursor/cache/`).
- **`/_archive` is clean.** Both dated batches (`2026-05-19_quiz-cleanup/`, `2026-07-23_nmn-template-cleanup/`) were checked against all active directories — zero live references found. No action needed.
- The 10 dead sections and 6 orphaned assets listed under §3 are candidates for `_archive/` rather than outright deletion, consistent with how the repo has handled prior cleanups.

## Not actioned

Per the request, this pass is a report only. No files were moved, deleted, edited, or had their frontmatter changed. All items above need an explicit decision (archive vs. delete vs. keep-and-fix-references) before anyone acts on them — several, like the `ss-*`/boilerplate section sweep, need individual verification beyond what a repo-wide grep can confirm.
