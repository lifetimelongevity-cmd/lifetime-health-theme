---
status: living
last_review: 2026-09-02
canonical_for: documentation-housekeeping-report-2026-09-02
---

# Documentation & Theme Housekeeping Audit — 2026-09-02

Scheduled cleanup scan of markdown docs, doc/code consistency, and orphaned
theme files. Read-only audit, no files were moved, deleted, or edited as
part of this pass. This is a snapshot report, see `docs/documentation-system-audit-2026-07-10.md`
for the prior audit and what was already fixed since then.

## 1. Markdown cleanup needed

**Broken links (referenced files don't exist):**

- `docs/live-pages-map.md` → `docs/briefing-science-hub.md`, `docs/briefing-science-umbau.md`,
  `docs/briefing-system1-science-aerzte.md`, `docs/briefing-expertenseite-aerzte.md`,
  `docs/limmroth-faktenblatt.md`, `docs/svg-src/hallmarks-zwoelf-gruppen.svg`,
  `docs/svg-src/longevity-guide/`, `docs/hallmarks-of-aging-body.html`,
  `docs/longevity-guide-illustrations.py` — none exist.
- `docs/live-pages-map.md` and `docs/documentation-system-audit-2026-07-10.md` →
  both still point at `_archive/2026-05-08_workspace-cleanup/README.md`, which does not
  exist. This was already flagged in the 2026-07-10 audit and was never corrected.
- `shopify/AGENTS.md` (3 places), `docs/homepage-blueprint-v2.md`, `docs/homepage-copy-v2.md`
  → all cite `templates/product.13_3_nmn.json` / `product.14_1_test.json` as the
  canonical PDP reference template. Neither file exists in `templates/`.
- `docs/nmn-angebotsarchitektur.md` §12 → lists `templates/product.13_nmn.json` as an
  open risk item to archive; it was already moved to
  `_archive/2026-07-23_nmn-template-cleanup/product.13_nmn.json`. Doc not updated.
- `docs/theme-status.md` / `docs/live-pages-map.md` → reference
  `templates/product.legacy-13-2-nmn.json`, which does not exist.
- `docs/lifetime-quiz-spec.md` → references `lifetime-quiz-texte.md`, not present anywhere.
- Several `docs/briefing-*.md` / `docs/geo-002...` / `docs/geo-p0-*` / `docs/geo-prompt-*.md`
  files referenced from `docs/documentation-system-audit-2026-07-10.md` and the GEO docs
  are missing.

**Superseded doc still in the active `docs/` folder** (per `docs/README.md`'s own rule,
superseded docs belong in `docs/archive/`):

- `docs/lifetime-quiz-spec.md` — frontmatter says `status: superseded`, still sits next
  to the living `docs/lifetime-doctor-quiz-spec.md` / `docs/lifetime-quiz-shopify-setup.md`.

**Duplicate-shaped files:**

- `sections/featured-collection-tabs-3.liquid` vs the hash-suffixed
  `featured-collection-tabs-3-1fb80a.liquid` (only the suffixed one is live).
- `sections/ss-comparison-table-22.liquid` (used) vs `ss-comparison-table-24.liquid` (unused).
- `sections/ss-hero-pro.liquid` vs `ss-hero-pro-b6628d.liquid` (both unused).
- `sections/ss-flexible-tabs.liquid` vs `ss-flexible-tabs-68bfcf.liquid` (both unused).

## 2. Documentation gaps / drift vs. live code

- **`/pages/ueber-lifetime` is badly out of date.** `docs/live-pages-map.md`
  (last_review 2026-08-27) documents the section stack as
  `lt-science-hero → lt-about-mission → lt-benefits → lt-stat-callout → lt-quote → video → lt-about-experts → lt-about-team`.
  The live `templates/page.ueber-lifetime.json` order is actually
  `lt-about-roster → lt-about-limmroth → lt-about-founder → lt-about-principles → lt-about-team → lt-about-experts → lt-about-signup`.
  None of the six sections named in the doc appear in the template. The page was
  evidently rebuilt again after the last doc update; `docs/ueber-lifetime-rebuild-prompt.md`
  (still `status: living`, last_review 2026-07-02) is equally stale. **Largest single
  drift found — worth a manual fix pass on `live-pages-map.md`.**
- **`docs/pdp-system.md`** (last_review 2026-07-29) says the NMN PDP template has
  "11 Einträge in `order`, davon 1 deaktiviert." The live
  `templates/product.nmn-pulver.json` (last touched 2026-08-19) now has **13** entries,
  including two `lt-pdp-final-cta` sections (`cta_band_labor`, `cta_band_reviews`) not
  in the doc's section table.
- **`shopify/AGENTS.md`** still says `/sections/ — 117 files`; actual count is **225**
  (`ls sections/ | wc -l`), i.e. it has roughly doubled since that doc was written and
  is now off by ~2x. `CLAUDE.md` deliberately avoids hardcoding this count and tells
  the reader to run the `ls` command instead — that pattern should be copied into
  `shopify/AGENTS.md` rather than trying to keep a static number in sync.
- **`templates/page.meine-routine.json`** is still in `/templates/`, even though
  `docs/live-pages-map.md`'s own "Offene Migrationen" section says it's unblocked and
  ready to move to `_archive/2026-05-19_quiz-cleanup/templates/`.
- **No frontmatter** on several docs that `docs/theme-status.md` claims are part of
  the "19 lebende Specs" frontmatter rollout: `docs/conversion-messaging.md` (a
  Kanonisches-Fundament file per `CLAUDE.md`), `docs/design-governance.md`,
  `docs/design-icon-system.md`, `docs/homepage-blueprint-v2.md`,
  `docs/homepage-copy-v2.md`, `docs/science-blueprint-v1.1.md`,
  `docs/science-copy-v1.1.md`.
- Spot-checked and **currently consistent**: `page.science.json`, `page.longevity.json`,
  `page.biologisches-alter-testen.json`, `page.nmn-deutschland.json`,
  `page.quiz-age.json` / `page.quiz-age-lp.json`, `index.json` all match their
  documented section stacks.

## 3. Code organization issues

**Orphaned sections** (not referenced as a `"type"` in any template — largest
cleanup opportunity in the repo):

- Whole abandoned redesign family, never wired up: `sections/nmn-pdp-v2-*.liquid`
  (11 files: `benefit-strip`, `faq`, `final-cta`, `guarantee`, `media-trust`,
  `science-quality`, `social-proof`, `sticky-bar`, `timeline`, `upsell`, plus
  `nmn-pdp-quality-trust.liquid`), and the snippets that only they use:
  `snippets/nmn-pdp-benefit-surface.liquid`, `snippets/nmn-pdp-quality-pills.liquid`,
  `snippets/nmn-pdp-subtitle.liquid`.
- Unwired `ss-*` batch (several 2,000–4,200 lines each): `ss-circle-menu.liquid`,
  `ss-comparison-table-24.liquid`, `ss-feature-13-78ff35.liquid`, `ss-feature-15.liquid`,
  `ss-feature-18.liquid`, `ss-featured-collection-tabs-6.liquid`,
  `ss-flexible-tabs-68bfcf.liquid`, `ss-flexible-tabs.liquid`, `ss-hero-pro-b6628d.liquid`,
  `ss-hero-pro.liquid`, `ss-image-with-text-24.liquid`,
  `ss-product-ingredients-6-4b8554.liquid`, `ss-progress-circles.liquid`,
  `ss-slider-7.liquid`, `ss-steps-12-5aedcd.liquid`, `ss-testimonial-12.liquid`,
  `ss-testimonials-2.liquid`, `ss-timeline.liquid`, `ss-video-slider.liquid`.
- Unused `lt-*` sections: `lt-campaign-hero.liquid`, `lt-campaign-stack.liquid`,
  `lt-hp-footer.liquid`, `lt-hp-problem.liquid` (superseded by `lt-hp-problem-v2.liquid`,
  which `index.json` actually uses), `lt-hp-supplements.liquid`,
  `lt-lp-authority-block.liquid`, `lt-lp-scarcity-risk.liquid`,
  `lt-lp-science-evidence.liquid`, `lt-lp-value-stack.liquid`, `lt-nad-age-graph.liquid`,
  `lt-page-ai-coach.liquid`, `lt-page-dna-basics.liquid`, `lt-page-dna-details.liquid`,
  `lt-pdp-a2-aufklaerungs-bruecke.liquid`, `lt-pdp-a3-process-press.liquid`,
  `lt-pdp-mechanism.liquid`, `lt-pdp-testimonials.liquid`, `lt-pdp-trust-mechanism.liquid`,
  `lt-wiss-messung.liquid`.
- Unused `crs-*` sections: `crs-guarantee-block.liquid`, `crs-knowledge-base.liquid`,
  `crs-social-quotes.liquid`, `crs-timeline.liquid`.
- Other custom orphans: `lifetime-bento.liquid`, `lifetime-collection-nav.liquid`
  (self-documented as removed 2026-08-19, file left behind), `lifetime-trustbar.liquid`,
  `longevity-start.liquid`, `hero-lifetime-section.liquid`, `result-preview.liquid`,
  `bekannt-aus.liquid`, `lt-pdp-expert.liquid`.
- Unused stock Combine-theme sections, superseded by `lt-` equivalents (confirmed via
  template checks): `main-article.liquid`, `main-article-comments.liquid`,
  `main-article-navigation.liquid`, `main-blog.liquid` (all replaced by
  `lt-article.liquid` / `lt-blog-index.liquid`), `search.liquid` (replaced by
  `main-search.liquid`), plus `before-after.liquid`, `cart-recommendations.liquid`,
  `collection-description.liquid`, `cta-card-grid.liquid`, `flex-cards.liquid`,
  `flex-slideshow.liquid`, `image-with-hotspots.liquid`, `hero-lifetime-test.liquid`,
  `scrolling-images.liquid`, `shop-the-look.liquid`, `slideshow-animated.liquid`,
  `testimonials.liquid`.

**Orphaned assets:**

- `assets/lifetime-collection-grid.css` — the matching section actually loads
  `lt-product-card.css` instead.
- `assets/component-collection-tabs.js` — not loaded by any section.
- `assets/component-recently-viewed.js` — not loaded by any section.

**Misplaced files:**

- `docs/push-dashboard.py`, `docs/push-dashboard-note.py`,
  `docs/blog-cover-generator.py`, `docs/blog-svg-generator.py`
  (+ `docs/push-dashboard-notes.json`, `docs/push-dashboard-routes.json`) — Python
  tooling living in the markdown docs folder instead of the repo's `/scripts/` dir.

## 4. Files to archive or move

- **`.playwright-mcp/`** (repo root) — 21 tracked files (10 DOM snapshot `.yml`s, 10
  console-log dumps, all from one 2026-04-02 debugging session, including one 0-byte
  file). Scratch debugging output committed to git; should be removed and added to
  `.gitignore`.
- **`templates/page.meine-routine.json`** — move to
  `_archive/2026-05-19_quiz-cleanup/templates/` per the repo's own already-approved
  migration note (see §2 above).
- **`docs/lifetime-quiz-spec.md`** — move to `docs/archive/` (frontmatter already says
  `superseded`).
- All orphaned sections/snippets/assets in §3 — candidates for `_archive/` rather than
  outright deletion, consistent with how `_archive/2026-05-19_quiz-cleanup/` and
  `_archive/2026-07-23_nmn-template-cleanup/` were handled previously. The
  `nmn-pdp-v2-*` family and `ss-*` batch are the highest-value removals by line count.
- **`.impeccable/`, root `DESIGN.md`, `PRODUCT.md`** — output/config for a third-party
  design tool, not part of the documented doc hierarchy in `docs/README.md`. Confirm
  whether this tool is still in use; if not, archive.
- **`.cursor/agent-images/68540cb7-...-0.png`** — stray unreferenced screenshot in
  `.cursor/`, safe to delete.

## Not changed in this pass

Per repo convention (`CLAUDE.md`: prefer minimal, incremental changes; don't propose
full rewrites), this audit only records findings — no sections, docs, or templates
were moved, archived, or deleted. Follow-ups above should be actioned as their own
small, reviewed changes.
