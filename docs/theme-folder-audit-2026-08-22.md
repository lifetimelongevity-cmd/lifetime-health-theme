---
status: living
last_review: 2026-08-22
canonical_for: theme-folder-audit-2026-08-22
---

# Theme Folder Audit — 2026-08-22

Scheduled housekeeping pass over the whole repo (82 markdown files, `sections/`,
`snippets/`, `assets/`, `templates/`). Builds on
`docs/documentation-system-audit-2026-07-10.md`, which restructured the docs
tree six weeks earlier — this pass checks for drift since then and extends
the same scan to code. No files were moved, archived, or deleted as part of
this audit; everything below is a finding for a human to action.

**Important caveat:** the local `templates/*.json` are confirmed out of sync
with the live Shopify theme (e.g. `docs/theme-status.md` documents
`ss-video-slider` as live in 13+ product templates via Shopify-MCP, yet it
has zero references in this repo's `templates/`). Any "unused in repo" claim
below is only proven against the committed repo, not against what is
actually live on the store — confidence levels reflect that gap.

## 1. Markdown cleanup needed

**Broken references** (link to a file that doesn't exist):
- `docs/live-pages-map.md` → `docs/briefing-science-umbau.md`, `docs/briefing-science-hub.md`, `docs/briefing-system1-science-aerzte.md`, `docs/limmroth-faktenblatt.md`, `docs/briefing-expertenseite-aerzte.md`, and several `docs/svg-src/…`/image/script assets.
- `docs/age-dna-product-fact-sheet.md` — cited from 5+ files (`docs/theme-status.md`, `docs/PDP-DNA-UPGRADE/*`, `docs/age-dna-geo/*`) but the file itself is missing from the repo.
- A cluster of GEO tracker docs referenced but absent: `docs/geo-prompt-baseline-2026-07-29.md`, `docs/geo-prompt-panel.md`, `docs/geo-claim-ledger.md`, `docs/geo-002-ga4-ai-referral-report-2026-07-29.md`, `docs/geo-p0-technical-audit-2026-07-29.md`, `docs/geo-prompt-checkpoint-2026-08-14.md`.
- Stale template references: `shopify/AGENTS.md` and `docs/homepage-blueprint-v2.md` still cite `templates/product.13_3_nmn.json` / `templates/product.14_1_test.json` (renamed/removed; current file is `templates/product.nmn-pulver.json`). `docs/theme-status.md` still cites `templates/product.legacy-13-2-nmn.json`, which no longer exists in the repo — confirmed by direct file check (see §4, this closes TODO #9 in that doc's own backlog).
- `docs/ueber-lifetime-rebuild-prompt.md` links six team/portrait images (`hero-ueber-lifetime.webp`, `bianca-maus-head.jpg`, etc.) that aren't in `assets/`.
- `docs/nmn-pdp-umsetzung-status.md` links `_examples/PlumberPowerUpSwiftUI.swift` — an unrelated iOS filename, almost certainly a copy-paste artifact from a different project. Doesn't belong in this repo.

**Archive-convention breaks:**
- `docs/lifetime-quiz-spec.md` is marked `status: superseded` in its own frontmatter but still lives in active `docs/` instead of `docs/archive/`, contradicting the convention `docs/README.md` itself defines.

## 2. Documentation gaps

**Stale `status: living` docs** (last reviewed before the 2026-07-10 cleanup, now 6+ weeks old): `docs/section-heading-stack.md`, `docs/design-components.md`, `docs/shopify-rules.md` (all 2026-05-08), `docs/lifetime-doctor-quiz-spec.md` (2026-05-19), `docs/lifetime-quiz-shopify-setup.md` (2026-05-12), `docs/mobile-lp-audit-2026-06-04.md`, `docs/nmn-pdp-evidence-base.md` (2026-06-16), `docs/design-system/README.md` (2026-06-19), `docs/geo-strategy.md` (2026-07-08), `docs/nmn-blog-geo/redaktionsplan.md` (2026-07-06), `docs/ueber-lifetime-rebuild-prompt.md` (2026-07-02). `docs/README.md` itself hasn't been refreshed since the cleanup it documents, so its index is now out of date (see below).

**Undocumented since the last index update** — not listed in `docs/README.md`'s tables or the 07-10 audit: the entire `docs/PDP-DNA-UPGRADE/` folder (8 files, added 2026-08-15/16), `docs/cluster2-blog/`, `docs/collection-all-spec.md`, `docs/briefing-pdp-refit.md`, `docs/nmn-pdp-umsetzung-status.md`, `docs/pdp-supplement-rollout.md`, `docs/pdp-copy-deck.md`, `docs/geo-wettbewerbsanalyse-2026-08-03.md`, `docs/geo-action-plan.md`. `docs/nmn-angebotsarchitektur.md` is indexed in `CLAUDE.md` but missing from `docs/README.md`.

**Already flagged, still open:** `docs/ueber-lifetime-rebuild-prompt.md`'s own header says it can move to `status: superseded` once live-verified — unresolved since the last audit.

## 3. Code organization issues

**Confirmed orphaned cluster (high confidence):** a fully-built but never-shipped "NMN PDP v2" redesign — 10 sections (`nmn-pdp-v2-benefit-strip/faq/final-cta/guarantee/media-trust/science-quality/social-proof/sticky-bar/timeline/upsell.liquid`), 1 related section (`nmn-pdp-quality-trust.liquid`), and 3 snippets (`nmn-pdp-benefit-surface.liquid`, `nmn-pdp-quality-pills.liquid`, `nmn-pdp-subtitle.liquid`) — none referenced in any template or by `{% render %}`/`{% section %}` anywhere in the repo. Verified present on disk during this audit.

**Other high/medium-confidence orphans (custom `lt-*`, no template or render reference found):** `lt-hp-footer.liquid`, `lt-hp-supplements.liquid`, `lt-hp-problem.liquid` (superseded by the live `lt-hp-problem-v2.liquid`), `lt-pdp-testimonials`, `lt-pdp-expert`, `lt-pdp-mechanism`, `lt-pdp-trust-mechanism`, `lt-pdp-a2-aufklaerungs-bruecke`, `lt-pdp-a3-process-press`, `lt-about-mission`, `lt-campaign-hero`, `lt-campaign-stack`, `lt-expert-scope`, `lt-lp-authority-block`, `lt-nad-age-graph`, `lt-page-ai-coach`, `lt-page-dna-basics`, `lt-page-dna-details`, `lt-quote`, `lt-stat-callout`, `lt-science-hallmarks`, `lt-science-limmroth`, `result-preview`, `crs-social-quotes.liquid`.

**Orphaned assets (high confidence):** `assets/component-collection-tabs.js`, `assets/component-recently-viewed.js` — no `<script src>` anywhere. `assets/lifetime-collection-grid.css` — a comment in `assets/lt-product-card.css` confirms its styling moved there; the old file is no longer loaded.

**Stock-Combine sections with zero references (low confidence — may be theme-editor dynamic sections):** `search`, `product-quick-view`, `cart-recommendations`, `main-blog`, `main-article`, `main-article-comments`, `main-article-navigation` (each has a clear custom replacement already live: `main-search`, `main-cart-recommendations`, `lt-blog-index`, `lt-article`), plus ~45 more plain/`ss-`-prefixed stock sections (`ss-hero-pro`, `ss-timeline`, `ss-progress-circles`, `before-after`, `flex-cards`, `lifetime-bento`, etc.).

**Not orphans (false positives ruled out):** `helper-*` sections (`helper-cart`, `helper-localization-form`, `helper-predictive-search`, `helper-product-item`, `helper-product-variant`) look unreferenced by static grep but are fetched at runtime via the Section Rendering API from `assets/component-cart.js` and friends — these are live and should not be touched. One real bug surfaced in the process: `component-cart.js` fetches `section_id=helper-cart-popup`, but no `sections/helper-cart-popup.liquid` exists.

**Template/JSON:** No product template exceeds the 25-section limit (max found: 16, in `product.age-dna-test.json`). `templates/product.legacy-13-2-nmn.json`, the file `docs/theme-status.md` TODO #9 asks to resolve, has already been deleted from the repo — that TODO can be closed as done rather than re-actioned. `page.testimonials.json`, `page.legacy-agedna-landing-termin.json`, `page.meine-routine.json` are orphaned templates but already documented as such in `docs/live-pages-map.md` (reachable via `?view=`) — not a new finding.

## 4. Files to archive or move

- `sections/nmn-pdp-v2-*` (10 files) + `sections/nmn-pdp-quality-trust.liquid` + the 3 `snippets/nmn-pdp-*` files — candidate for `_archive/` as an abandoned redesign, pending confirmation it was never launched.
- `assets/lifetime-collection-grid.css`, `assets/component-collection-tabs.js`, `assets/component-recently-viewed.js` — candidate for removal/archive (superseded or unreferenced).
- `templates/product.spicegems-swatch.liquid` + its two snippets (`spicegems-swatch-options-json.liquid`, `spicegems-swatch-images-json.liquid`) — stock Combine demo-product AJAX swatch endpoint, no JS calls it (`?view=spicegems-swatch` not found anywhere); leftover from the original theme template.
- `docs/lifetime-quiz-spec.md` — already marked `superseded`; move to `docs/archive/` to match its own status.
- `_examples/PlumberPowerUpSwiftUI.swift` — unrelated file, not part of this project; delete or move out of the repo.

## Not actioned in this pass

Nothing was moved, archived, or deleted. Everything above needs a human decision before touching code, especially given the confirmed local/live template drift — a section unused in the committed `templates/` may still be live on the store via the theme editor. Recommended next step: reconcile against Shopify-MCP live template data (as `docs/theme-status.md` already does for heading-stack compliance) before archiving anything in §4.
