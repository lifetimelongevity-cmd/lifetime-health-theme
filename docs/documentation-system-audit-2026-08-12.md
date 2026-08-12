---
status: living
last_review: 2026-08-12
canonical_for: documentation-housekeeping-report-2026-08-12
---

# Documentation & Code Housekeeping Audit — 2026-08-12

Follow-up to `docs/documentation-system-audit-2026-07-10.md`. That pass fixed root/docs
mixing and rolled out frontmatter; this pass covers what's drifted since (new GEO content,
new templates) and, for the first time, a full orphan-file sweep of `sections/`, `snippets/`,
and `assets/`, which the July audit didn't cover.

## 1. Markdown cleanup needed

- **`docs/lifetime-quiz-spec.md`** is marked `status: superseded` (since 2026-07-23) but still
  sits in `docs/` instead of `docs/archive/`, violating the repo's own rule in `docs/README.md`
  ("If a doc is no longer active but still informative, move it to `docs/archive/`").
- **Broken file references** (backtick paths to files that don't exist anywhere in the repo):
  - `docs/age-dna-product-fact-sheet.md` — referenced by 7 files in `docs/age-dna-geo/` and by
    `docs/age-dna-geo/tools/claim-check.py`, which cites it as the source of its claims
    sperrliste. This one matters more than a typical dead link: a compliance script depends on
    a doc that isn't in the repo.
  - `docs/geo-claim-ledger.md` — referenced by 3 files in `docs/age-dna-geo/`.
  - `docs/live-pages-map.md` references four missing briefing docs (`briefing-expertenseite-aerzte.md`,
    `briefing-science-hub.md`, `briefing-science-umbau.md`, `briefing-system1-science-aerzte.md`)
    and `docs/limmroth-faktenblatt.md`.
  - `docs/geo-action-plan.md` references `geo-002-ga4-ai-referral-report-2026-07-29.md`,
    `geo-p0-url-decision-list-2026-07-29.md`, `geo-prompt-baseline-2026-07-29.md`, and
    `geo-prompt-panel.md` as already "erstellt"/"abgenommen" on 29.07.2026, plus an
    `outputs/geo-prompt-panel-2026-07-29/*.xlsx` — none of these paths exist in this repo, so
    the deliverables likely live elsewhere but are referenced as if local.
- **Frontmatter gaps**: the 2026-05-08 `theme-status.md` log claims the frontmatter convention
  was rolled out to "all living specs," but these active core-guidance docs (per `docs/README.md`'s
  own "Active Core Guidance" table) still have none: `conversion-messaging.md`,
  `design-governance.md`, `design-icon-system.md`, `homepage-blueprint-v2.md`,
  `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`.
- **Stale status labels**: all 7 `docs/nmn-blog-geo/*.md` article drafts are still marked
  `status: draft` (dated 2026-07-06/07), but a matching `templates/article.*.json` already
  exists live for every one of them (`ist-nmn-in-deutschland-legal`, `nmn-qualitaet-erkennen`,
  `uthever-nmn`, `novel-food-efsa-verfahren`, `nmn-in-der-welt`, `nmn-vs-nr`,
  `was-ist-nmn-nicotinamid-mononukleotid`). The label no longer reflects reality.

## 2. Documentation gaps / contradictions

- **`docs/theme-status.md` is stale.** `last_review: 2026-05-08`, but it's the designated
  "log an entry every session" living doc, and three real operations since then were never
  logged: the 2026-05-19 quiz archive, the 2026-07-10 doc restructuring, and the 2026-07-23
  NMN template archive.
- **Three-way contradiction on `page.stack-builder.json`.** `theme-status.md` still lists it
  as an unused "Template-Geister-File" to decide on. `docs/live-pages-map.md` (a higher-authority
  source per `AGENTS.md`'s hierarchy) lists it as live at `/pages/stack-builder`. And
  `docs/geo-action-plan.md`'s 29.07.2026 log entry says it was checked on production and given
  `noindex,follow`. The stale doc (`theme-status.md`) is the one that needs updating.
- **Icon system contradiction, still unresolved from the July 10 audit (its note #2).**
  `docs/design-icon-system.md` mandates Phosphor thin exclusively ("Es gibt kein erlaubtes
  Sekundär-Set"), but `.cursor/rules/design-components.mdc` and two live section schemas
  (`sections/lt-benefits.liquid`, `sections/lt-page-dna-details.liquid`) instruct merchants to
  use lucide-style inline SVG instead.
- **`docs/shopify-rules.md` still duplicates `shopify/AGENTS.md` and
  `.cursor/rules/shopify-rules.mdc`** almost entirely (145 / 104 / 146 lines covering the same
  ground). Flagged as needing a decision in the July 10 audit; still unresolved.
- **Root files `DESIGN.md` and `PRODUCT.md`** (paired with `.impeccable/config.json` +
  `.impeccable/design.json`, a design-linting tool) aren't listed in `CLAUDE.md`'s Rules Index
  or in `AGENTS.md`. An agent orienting from either entry point won't discover them.

## 3. Code organization issues

A background scan cross-referenced all 214 `sections/`, 75 `snippets/`, and 123 `assets/`
files against template `"type"` fields, `{% section %}`/`{% render %}` calls, and asset
references repo-wide. It found **roughly 90 files with no live reference anywhere**. The ~30
most confident, capped by the scan:

- **Duplicate/superseded theme-customizer variants** (a live hash-suffixed twin exists,
  the un-suffixed original doesn't render anywhere): `featured-collection-tabs-3.liquid`
  (live: `-1fb80a`), `ss-comparison-table-24` (live: `ss-comparison-table-22`), `ss-hero-pro`
  (live: `-b6628d`), `ss-flexible-tabs` (live: `-68bfcf`), plus `ss-testimonial-12`,
  `ss-feature-13-78ff35`, `ss-feature-15`, `ss-feature-18`, `ss-featured-collection-tabs-6`,
  `ss-image-with-text-24`, `ss-product-ingredients-6-4b8554`, `ss-progress-circles`,
  `ss-slider-7`, `ss-steps-12-5aedcd`, `ss-timeline`, `ss-video-slider`, `ss-circle-menu`.
- **Default Combine sections superseded by LT-custom equivalents**: `main-article.liquid`,
  `main-article-comments.liquid`, `main-article-navigation.liquid`, `main-blog.liquid`,
  `search.liquid`, `cart-recommendations.liquid`.
- **`lt-*` sections that only survive as comments/mentions in other files, never rendered**:
  `lt-hp-problem.liquid` (superseded by `lt-hp-problem-v2` — matches `theme-status.md`'s own
  open May TODO), `lt-pdp-expert.liquid`, `lt-pdp-mechanism.liquid`, `lt-pdp-final-cta.liquid`,
  `lt-quote.liquid`, `lt-about-mission.liquid`, `lt-expert-scope.liquid`,
  `lt-science-limmroth.liquid`, `lt-stat-callout.liquid`, `hero-lifetime-section.liquid`,
  `hero-lifetime-test.liquid`.
- **3 orphan snippets**: `nmn-pdp-benefit-surface.liquid`, `nmn-pdp-quality-pills.liquid`,
  `nmn-pdp-subtitle.liquid`.
- **3 dead assets**: `component-collection-tabs.js`, `component-recently-viewed.js`,
  `lifetime-collection-grid.css` (the live section of the same name uses an inline `<style>`
  block instead, so the external file is unused).
- **~55 further candidates** beyond this capped list, concentrated in the same `ss-*` and
  `lt-pdp-*`/`nmn-pdp-v2-*` clusters — needs a dedicated second pass.
- **`blocks/ai_gen_block_2f90baf.liquid`** — a Shopify-admin AI-generated block
  (prompt: "3x2 collection grid, Breite bitte wie die Section davor"), zero references
  anywhere, cryptic auto-generated name.
- **`package.json`** declares `lucide-react` and `dotenv`, but `CLAUDE.md` states "No build
  system exists, this is a pure Shopify theme." `lucide-react` isn't imported anywhere (only
  mentioned in a schema help string); `dotenv` is used by `scripts/fetch-image.js`. The file's
  purpose isn't documented anywhere.
- **`.playwright-mcp/`** — 21 files (~470KB) of console logs and page snapshots from a single
  debug session on 2026-04-02, committed to git and not in `.gitignore`. Looks like a local
  debugging artifact, not intentional repo content.

## 4. Files to archive or move

- `docs/lifetime-quiz-spec.md` → `docs/archive/` (already `status: superseded`).
- The ~90 orphan-candidate sections/snippets/assets above → candidates for `_archive/`,
  following the existing `_archive/2026-05-19_quiz-cleanup/README.md` and
  `_archive/2026-07-23_nmn-template-cleanup/README.md` pattern (dated folder + README
  documenting what/why). Verify against the live Shopify theme before moving anything —
  a few default Combine sections (e.g. `search.liquid`) could in principle be
  Shopify-required fallbacks even without an explicit reference in this repo.
- `.playwright-mcp/` → untrack from git and add to `.gitignore`.
- `blocks/ai_gen_block_2f90baf.liquid` → rename descriptively and wire up, or archive if the
  collection-grid experiment was abandoned.
- `package.json` / `package-lock.json` → document their actual purpose, or drop the unused
  `lucide-react` dependency.

## What's already in good shape

- The July 10 restructuring (`docs/README.md`, `docs/archive/`, frontmatter convention) is
  holding up for most docs.
- No broken Markdown-style `[text](link.md)` links — the repo consistently uses backtick path
  references instead.
- `_archive/` and `_examples/` stay cleanly separated from active content, each batch
  documented with its own README. Worth reusing that pattern for the orphan-file batch above.

## Recommended next steps

1. Move `docs/lifetime-quiz-spec.md` into `docs/archive/`.
2. Resolve the `page.stack-builder.json` contradiction — update `theme-status.md`, it's the
   stale side of the disagreement.
3. Locate or recreate `docs/age-dna-product-fact-sheet.md` — `claim-check.py` and 7 GEO docs
   depend on it and it isn't in the repo.
4. Decide the Phosphor-vs-lucide icon contradiction once, then update whichever side is wrong.
5. Run a targeted second orphan-file pass on the `ss-*` and `lt-pdp-*`/`nmn-pdp-v2-*` clusters,
   verify against the live theme, then archive with a dated README.
6. Log this audit in `docs/theme-status.md`.
7. Untrack `.playwright-mcp/` and add it to `.gitignore`.
