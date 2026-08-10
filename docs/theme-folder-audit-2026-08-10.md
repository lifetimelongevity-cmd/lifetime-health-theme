---
status: living
last_review: 2026-08-10
canonical_for: theme-folder-housekeeping-audit-2026-08-10
---

# Theme Folder Audit — 2026-08-10

Scheduled housekeeping pass over the whole repo. This is an inventory and
findings report only, no files were moved or deleted in this pass. See
`docs/documentation-system-audit-2026-07-10.md` for the prior structural
pass this one follows up on.

## 1. Markdown cleanup needed

- **`docs/README.md` index is stale.** Several active docs added since the
  2026-07-10 cleanup are not listed anywhere in `docs/README.md`,
  `AGENTS.md`, or `CLAUDE.md`: `docs/geo-action-plan.md`,
  `docs/geo-wettbewerbsanalyse-2026-08-03.md`, `docs/pdp-copy-deck.md`,
  `docs/pdp-supplement-rollout.md`, `docs/nmn-pdp-umsetzung-status.md`,
  `docs/briefing-pdp-refit.md`, `docs/homepage-dossier-preview.html`. Same
  gap pattern the last audit fixed once already; the index needs to become
  part of the normal "add a new doc" habit or it will keep drifting.
- **Root `DESIGN.md` / `PRODUCT.md` are new and undocumented.** Added
  2026-08-10 by an "impeccable" design-bundle tool run tied to
  `docs/homepage-dossier-preview.html`. Neither file is referenced in
  `AGENTS.md`'s or `CLAUDE.md`'s rules index, so a future agent has no way
  to know they exist or what regenerates them. Worth one line in the docs
  index plus a note that they're tool-generated, not hand-authored.
- **`docs/theme-status.md` is 3 months stale.** `last_review: 2026-05-08`,
  despite being labelled a living doc that should get an entry every
  session and despite heavy theme activity since (PDP rebuilds, homepage
  redesign preview, quiz work, ~15+ commits in the last month). Its
  "Offene To-Dos" list (heading-stack drift on `lt-pdp-hero`,
  `lt-hp-problem-v2`, `lt-hp-trust-ticker`, the `ss-*` family, and the two
  "ghost template" files) has not been checked off or re-verified since
  May, so it's unclear which items are still true.
- **No broken markdown links found.** Checked relative `.md` links across
  `docs/`, `AGENTS.md`, `CLAUDE.md`; none point at moved/missing files.
  The 2026-07-10 archive move was reference-clean.
- **No content duplicates found.** `docs/archive/` and `_archive/`
  boundaries (code vs. docs) are still being respected; nothing duplicated
  between active and archived docs.

## 2. Documentation gaps

- **Remaining ambiguities from the last audit are still open**, carried
  forward unresolved: `docs/shopify-rules.md` overlap with
  `shopify/AGENTS.md` / `.cursor/rules/shopify-rules.mdc` (flagged for
  review/archival, not done); `docs/design-icon-system.md` icon
  implementation standard still not tightened.
- **Two "ghost template" files from `theme-status.md`'s May to-do list are
  still undecided:** `templates/page.stack-builder.json` (backs
  `lt-stack-builder`, which exists in `sections/`) and
  `templates/page.legacy-agedna-landing-termin.json`. Neither appears in
  `docs/live-pages-map.md`, so there's no record of whether either is
  actually assigned to a live URL in Shopify admin or is dead weight.
  Worth a Shopify-admin check, then either add to the live-pages-map or
  move to `_archive/`.
- **`docs/theme-status.md`'s own instructions aren't being followed.**
  The doc tells every session to append a changelog entry and refresh the
  to-do list; the last entry is from 2026-05-08. If the doc is still the
  intended status tracker, it needs a catch-up entry; if it's been
  superseded by something else (PRODUCT.md/DESIGN.md, or ad-hoc commit
  messages), that should be stated explicitly instead of left silent.

## 3. Code organization issues

- **~80 of 210 section files (`sections/*.liquid`) are not referenced by
  any template `"type"` or `{% section %}`/`{% sections %}` call.** Two
  different populations are mixed together here:
  - Stock KrownThemes "Combine" library sections never adopted for
    LIFETIME (`main-article`, `main-article-comments`,
    `main-article-navigation`, `main-blog`, `search`,
    `cart-recommendations`, `product-quick-view`, `helper-*`, `flex-*`,
    `slideshow-animated`, `testimonials`, etc.) — these were superseded by
    custom `lt-article`, `lt-blog-index`, `main-search`, and similar, and
    are effectively theme-editor library filler. Low priority, expected
    for a purchased theme base.
  - LIFETIME-authored draft/superseded sections that look like genuine
    dead code: the entire `nmn-pdp-v2-*` family (10 files: `nmn-pdp-v2-benefit-strip`,
    `-faq`, `-final-cta`, `-guarantee`, `-media-trust`, `-science-quality`,
    `-social-proof`, `-sticky-bar`, `-timeline`, `-upsell`), plus
    `lt-pdp-a2-aufklaerungs-bruecke`, `lt-pdp-a3-process-press`,
    `lt-pdp-mechanism`, `lt-pdp-expert`, `lt-pdp-trust-mechanism`,
    `lt-pdp-testimonials`, `lt-pdp-final-cta`, `lt-campaign-hero`,
    `lt-campaign-stack`, `lt-hp-problem` (superseded by
    `lt-hp-problem-v2`, itself flagged as drift in `theme-status.md`),
    `lt-hp-supplements`, `lt-science-hallmarks`, `lt-science-limmroth`.
  - Five sections carry a Shopify theme-editor "duplicate" hash suffix and
    are unused: `ss-feature-13-78ff35`, `ss-flexible-tabs-68bfcf`,
    `ss-hero-pro-b6628d`, `ss-product-ingredients-6-4b8554`,
    `ss-steps-12-5aedcd` — classic "duplicate section, forgot to clean up"
    artifacts, safe archive candidates alongside their un-suffixed
    originals (`ss-hero-pro`, `ss-flexible-tabs`, which are themselves
    also unused).
- **3 orphaned snippets:** `nmn-pdp-benefit-surface`,
  `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` — not rendered by any
  section, including the also-unused `nmn-pdp-v2-*` family they look like
  they belong to.
- None of the above were moved in this pass — a live production theme's
  section list should only be pruned with an explicit go-ahead, since
  Shopify's theme editor can still reference "unused" sections through
  section groups or a merchant's saved customizations that don't show up
  in a static grep.

## 4. Files to archive or move

Recommended, not yet executed:

- `.playwright-mcp/` (26 files: `console-*.log`, `page-*.yml`, all dated
  2026-04-02) — committed browser-debugging output from an old MCP
  session, four months stale, not theme source. Candidate for deletion
  and a `.playwright-mcp/` entry in `.gitignore` so future sessions don't
  recommit it.
- The unused `nmn-pdp-v2-*` section family and its 3 orphaned snippets →
  `_archive/` if genuinely superseded, per the existing
  `_archive/2026-0X-YY_*` dated-folder convention.
- The 5 hash-suffixed duplicate sections → `_archive/` or straight
  deletion, once confirmed via Shopify admin that no live page block
  references them.
- `templates/page.stack-builder.json` and
  `templates/page.legacy-agedna-landing-termin.json` → decide (live vs.
  archive) per the open `theme-status.md` to-do, then either register in
  `docs/live-pages-map.md` or move to `_archive/`.

## Not flagged (checked, found fine)

- `.impeccable/` (tool config/state for the design-bundle generator) and
  `.agents/skills/` (frontend-design, ux-design skill defs) — intentional
  tooling, not clutter.
- `docs/design-system/` Claude Design bundle — up to date per its own
  `last_review: 2026-06-19`, excluded from `shopify theme push` by design.
- `_archive/` and `docs/archive/` boundary (code vs. docs) — still clean,
  no cross-contamination.
