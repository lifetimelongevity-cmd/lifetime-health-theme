---
status: living
last_review: 2026-07-28
canonical_for: theme-folder-housekeeping-report-2026-07-28
supersedes: none
---

# Theme Folder Audit — 2026-07-28

Scheduled housekeeping pass over the full repo (`/home/user/lifetime-health-theme`). Builds on `docs/documentation-system-audit-2026-07-10.md`, which restructured `docs/` into active vs. archived. This pass covers markdown hygiene, doc/code drift, and code organization across the whole tree, not just `docs/`.

Method: static scan (grep/glob over templates, sections, snippets, assets, docs) plus cross-referencing against `layout/`, section groups, and JS AJAX section-fetch patterns. No live Shopify/theme-editor check was done this pass — per `AGENTS.md`/`CLAUDE.md`, live storefront state outranks this report for anything it flags as "needs verification."

## 1. Markdown cleanup needed

- **`docs/lifetime-quiz-spec.md` is marked `status: superseded` (as of 2026-07-23) but still lives in active `docs/`, not `docs/archive/`.** Every other superseded doc in the repo (`science-blueprint-v1.md`, the legacy root prompts) was already moved under `docs/archive/`. This one was missed. Recommend moving to `docs/archive/` and confirming `docs/README.md`'s "Active Supporting Docs" table no longer implies it's current (quiz docs row still lists it alongside the two specs that are still active).
- **`docs/science-blueprint-v1.1.md` contains four broken links** pointing to a local machine path instead of a repo-relative one: `/Users/benediktjunker/lifetime-health-theme/templates/page.science.json:23` and three similar (`lt-hp-science.liquid:1`, `crs-link-cards.liquid:30`, `lt-comparison-table.liquid:1`). These resolve to nothing for anyone else cloning the repo. Recommend rewriting as repo-relative paths (e.g. `templates/page.science.json`).
- No duplicate markdown content and no other dead relative links were found — the July 10 restructuring is holding up well (52 markdown files scanned, only the one above had broken links).

## 2. Documentation gaps

- **`docs/theme-status.md` is stale relative to actual activity.** Its own convention says append an entry "bei jeder Theme-Session," but `last_review` is still 2026-05-08 while `git log` shows near-daily `theme: push` commits through 2026-07-27. The open to-do list (heading-stack refactor on `lt-pdp-hero`, homepage hotspots, `ss-*` decision, NMN-Kapsel status, template-geister-files) is nearly three months old and may no longer reflect reality — worth a fresh pass to confirm what's actually still open.
- **Frontmatter convention is inconsistently applied.** `docs/theme-status.md` states the `status/last_review/canonical_for` frontmatter was "rolled out to all living specs," but these active docs have none: `docs/conversion-messaging.md`, `docs/design-governance.md`, `docs/pdp-system.md`, `docs/homepage-copy-v2.md`, `docs/lt-pdp-template-notes.md`, `docs/science-copy-v1.1.md`, `docs/design-icon-system.md`, `docs/homepage-blueprint-v2.md`. Given `conversion-messaging.md` and `pdp-system.md` are both cited in `CLAUDE.md` as primary governance docs, they're the highest-value candidates to backfill first.
- **One item from the July 10 audit is still open:** `docs/shopify-rules.md` was flagged as redundant with `shopify/AGENTS.md` + `.cursor/rules/shopify-rules.mdc` and marked for a later archival/summary decision. Still unresolved as of this pass.

## 3. Code organization issues

- **`.playwright-mcp/` (20 files, ~730 KB of console logs and page-state `.yml` snapshots from 2026-04-02) is committed to git**, not gitignored. `.gitignore` covers `.DS_Store`, `node_modules/`, `.env*`, `.cursor/cache/` but not this directory. These look like transient debug output from a Chrome-MCP/Playwright QA session (per `CLAUDE.md`'s note on using Chrome-MCP for live-page checks) rather than intentional repo content. Recommend adding `.playwright-mcp/` to `.gitignore` and removing the tracked files.
- **`package.json` declares `lucide-react` as a dependency, but the codebase explicitly doesn't use it.** `shopify/AGENTS.md:88` states "Icons: inline SVG in Liquid, not lucide-react imports," and the only in-repo mentions of "lucide" are schema `info` text telling editors to paste inline SVG in the *style* of Lucide icons (`sections/lt-benefits.liquid:150`, `sections/lt-page-dna-details.liquid:241`) — not actual imports. There is no JS build step that would consume an npm icon package in this theme. The dependency appears to be a leftover; worth confirming it's unused before removing.
- **`package.json` has no `"scripts"` entry**, so `scripts/check-heading-system.js` and `scripts/fetch-image.js` are only runnable via a manually-typed `node scripts/...` invocation. Both are legitimate, referenced tools (the heading-system checker matches `docs/section-heading-stack.md`'s canonical pattern; `fetch-image.js` is cited in `docs/design-governance.md`), just undocumented as npm scripts. Low priority, but adding a `scripts` block (`"check-headings": "node scripts/check-heading-system.js"`) would make them discoverable.
- **Likely-orphaned Combine-core blog sections:** `sections/main-article.liquid`, `main-article-comments.liquid`, `main-article-navigation.liquid`, and `main-blog.liquid` have no reference in any live template. The theme's actual blog/article templates (`templates/article.json`, `templates/blog.json`) use the custom `lt-article`, `lt-article-related`, and `lt-blog-index` sections instead. These four look like unused theme-core boilerplate carried over from the Combine base theme. Not deleted here — flagging for confirmation, since Shopify's section-rendering API can reference a section without a static template match.

## 4. Files to archive or move

- **`docs/lifetime-quiz-spec.md`** → `docs/archive/` (see §1; already marked superseded, just not relocated).
- **Open decision, unresolved since the May 2026 status log:** `templates/page.stack-builder.json` still exists and still references `sections/lt-stack-builder.liquid`, exactly as flagged in `docs/theme-status.md`'s "Template-Geister-Files entscheiden" to-do. (Its sibling ghost file, `product.legacy-13-2-nmn.json`, is no longer in the repo — that half of the to-do appears resolved.) Recommend either wiring `page.stack-builder.json` into a live page or moving it + `lt-stack-builder.liquid` into `_archive/`.
- **A larger set of `lt-*`, `nmn-pdp-v2-*`, `ss-*`, and `crs-*` sections (roughly 60-70 files) show no direct "type" reference in any template JSON.** This is a heuristic static-scan result, not a confirmed-dead list — some of these are plausibly rendered as nested blocks, fetched via the section-rendering API, or are in-progress/draft sections (the `ss-*` family was already an open "refactor or accept as Combine legacy" decision in `theme-status.md`). Given the scale, this needs the same live-template diff approach `theme-status.md` used in May (Shopify-MCP against actually-published templates) rather than a delete based on grep alone. Recommend that as the next dedicated session rather than acting on this report's list directly.

## Summary

The `docs/` restructuring from July 10 is holding up: no duplicate docs, only one doc with broken links, only one misfiled superseded doc. The main gaps are drift in the *tracking* docs themselves (`theme-status.md` stale, frontmatter rollout incomplete) and a few concrete, low-risk cleanup items (tracked Playwright debug output, an unused npm dependency, one unresolved ghost template). The section-orphan question is real but too large and consequence-heavy (touches live-rendered code) to resolve from a static scan alone — flagged for a follow-up session with live verification, consistent with this repo's own "live beats static docs" rule.
