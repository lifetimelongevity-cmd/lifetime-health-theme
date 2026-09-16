---
status: living
last_review: 2026-09-16
canonical_for: theme-folder-organization-audit-2026-09-16
---

# Theme Folder Organization Audit — 2026-09-16

Scheduled housekeeping review, ~2 months after the last full pass
(`docs/documentation-system-audit-2026-07-10.md`). Read-only audit, no files
changed. Verified with direct filesystem/grep checks, not just agent claims.

## 1. Markdown cleanup needed

**Broken internal links** (target files don't exist):
- `docs/theme-status.md` (lines 22, 218, 373, 401) and several `docs/age-dna-geo/*.md`
  files reference `docs/geo-prompt-panel.md`, `docs/geo-claim-ledger.md`,
  `docs/geo-prompt-baseline-2026-07-29.md`, `docs/geo-prompt-checkpoint-2026-08-14.md`,
  `docs/geo-p0-url-decision-list-2026-07-29.md`, `docs/geo-p0-technical-audit-2026-07-29.md`,
  `docs/geo-002-ga4-ai-referral-report-2026-07-29.md` — none exist.
- `docs/age-dna-product-fact-sheet.md` referenced from 5 files (`PDP-DNA-UPGRADE/01-rmbc-kontext.md:17`,
  `PDP-DNA-UPGRADE/README.md:30`, `age-dna-geo/PROMPT-A1-altbestand-anheben.md:239,267`,
  `age-dna-geo/artikel-genauigkeit-alterstest.md:67`, `theme-status.md:45,67`) — doesn't exist anywhere.
- `docs/live-pages-map.md` (lines 187, 202, 213, 226, 309, 324, 359-360, 388) links to
  `briefing-science-umbau.md`, `briefing-science-hub.md`, `hallmarks-of-aging-body.html`,
  `briefing-system1-science-aerzte.md`, `longevity-guide-illustrations.py`,
  `_archive/2026-05-08_workspace-cleanup/README.md`, `limmroth-faktenblatt.md`,
  `briefing-expertenseite-aerzte.md` — none exist. Note: the missing
  `_archive/2026-05-08_workspace-cleanup/` path is the exact one the July 10 audit
  said it had fixed in `theme-status.md` — it's still dangling here.
- **Stale product template references**: `shopify/AGENTS.md` (10, 79),
  `docs/homepage-blueprint-v2.md` (570-571), `docs/nmn-angebotsarchitektur.md:503`,
  `docs/nmn-blog-geo/nmn-blog-playbook.md:248` point to `templates/product.13_3_nmn.json` /
  `product.13_nmn.json`, which no longer exist — the real file is now
  `templates/product.nmn-pulver.json`. `docs/theme-status.md` (103, 442) similarly
  points to a nonexistent `templates/product.legacy-13-2-nmn.json`.
- **Deleted section still documented as live**: `sections/lt-collection-register.liquid`
  was deleted in commit `7afb69b` ("Register verworfen", 2026-08-19), but
  `docs/collection-all-spec.md` (lines 38, 271, 669, 791) still describes it as
  live/in-build. Both files carry `last_review: 2026-08-19` — the doc wasn't
  reconciled with a same-day reversal.
- `docs/science-blueprint-v1.1.md` (81, 203, 235, 274) uses absolute local dev-machine
  paths (`/Users/benediktjunker/lifetime-health-theme/...`) instead of repo-relative links.

**Misfiled status:** `docs/lifetime-quiz-spec.md` (last_review 2026-07-23) is marked
`status: superseded` but still sits in `docs/` instead of `docs/archive/`, unlike
every other superseded doc.

**Recommendation:** fix or remove the dead links above, move
`lifetime-quiz-spec.md` to `docs/archive/`, and reconcile
`collection-all-spec.md` with the actual deletion of `lt-collection-register.liquid`.

## 2. Documentation gaps

- **`docs/theme-status.md` is ~4 weeks stale.** `last_review: 2026-08-19`, but git
  history shows substantial work since then not reflected in it: the "wissenschaft"
  page rebuild (commits through 2026-08-31), the age-dna PDP offer/pricing overhaul,
  and commits on 2026-09-03/04/08 ("theme: push 2026-09-03", "agedna pdp copy",
  "forschung- timeline"). This is a living doc meant to be appended every session.
- **12+ docs added since the July index was written are not listed in
  `docs/README.md`**, whose table hasn't changed since 2026-07-10: `PDP-DNA-UPGRADE/`,
  `cluster2-blog/`, `collection-all-spec.md`, `wissenschaftsseite-strategie.md`,
  `geo-wettbewerbsanalyse-2026-08-03.md`, `nmn-pdp-umsetzung-status.md`,
  `briefing-pdp-refit.md`, `pdp-copy-deck.md`, `pdp-supplement-rollout.md`,
  `geo-action-plan.md`, `nmn-angebotsarchitektur.md`.
- **`docs/shopify-rules.md` was flagged for review in July and never revisited**
  (`last_review` still 2026-05-08). It remains near-duplicate content with
  `shopify/AGENTS.md` and `.cursor/rules/shopify-rules.mdc`.
- 12 docs (mostly research/spec files, listed below) have `status: living` but
  `last_review` older than 60 days — meaning they claim to be current but haven't
  been checked since before mid-July: `design-components.md` (05-08),
  `section-heading-stack.md` (05-08), `shopify-rules.md` (05-08),
  `lifetime-quiz-shopify-setup.md` (05-12), `lifetime-doctor-quiz-spec.md` (05-19),
  `mobile-lp-audit-2026-06-04.md` (06-04), `nmn-pdp-evidence-base.md` (06-16),
  `design-system/README.md` (06-19), `ueber-lifetime-rebuild-prompt.md` (07-02),
  `blog-design-best-practices.md` (07-06), `geo-strategy.md` (07-08),
  `docs/README.md` itself (07-10). `docs/conversion-messaging.md`,
  `docs/design-governance.md`, and `docs/design-icon-system.md` have no frontmatter
  at all, so staleness can't even be tracked for them.

**Recommendation:** update `theme-status.md` with the missing Sept sessions,
refresh `docs/README.md`'s index, and do a pass on the `status: living` docs
above (confirm still accurate, or bump `last_review`, or mark superseded).

## 3. Code organization issues

- **`lucide-react` in `package.json` is an orphaned dependency.** This is a vanilla
  JS Shopify theme with no build step or React (per CLAUDE.md). The only hit in the
  whole repo is a schema `info` string in `sections/lt-benefits.liquid:174` telling
  merchants to paste inline SVG "(lucide, 24×24, currentColor stroke)" — a naming
  convention note, not a code dependency. The July audit fixed the *docs*
  contradiction about lucide-react but never removed the npm package itself.
  `dotenv` by contrast is legitimately used once, in `scripts/fetch-image.js:1`.
- **`scripts/check-heading-system.js` is dead code in practice**: not wired into
  any `package.json` script, not referenced in CI (none exists) or any doc. It still
  targets real, current files (`assets/crs-section-headings.css`, `sections/lt-*`/`crs-*`),
  so it isn't broken, just never run. `scripts/fetch-image.js` by contrast is
  documented and used (`docs/design-governance.md:106,133`).
- **10 orphaned "v2" PDP sections**: `sections/nmn-pdp-v2-{benefit-strip,faq,
  final-cta,guarantee,media-trust,science-quality,social-proof,sticky-bar,
  timeline,upsell}.liquid` — a full superseded PDP variant, confirmed referenced
  by zero templates.
- **Other confirmed-orphaned sections** (zero template references):
  `hero-lifetime-test.liquid`, `lt-pdp-testimonials.liquid`, `testimonials.liquid`,
  `ss-testimonial-12.liquid`, `ss-testimonials-2.liquid`.
- **Shopify-CLI pull artifacts left in `sections/`** (hash-suffixed duplicates,
  unreferenced): `ss-feature-13-78ff35.liquid`, `ss-flexible-tabs-68bfcf.liquid`,
  `ss-hero-pro-b6628d.liquid`, `ss-product-ingredients-6-4b8554.liquid`,
  `ss-steps-12-5aedcd.liquid`.
- **2 orphaned assets**: `assets/lifetime-collection-grid.css` (its section actually
  loads `lt-product-card.css` instead) and `assets/science-healthspan-kurve.svg`
  (zero references; a similarly-named `science-healthspan-luecke.svg` is the one
  actually in use via `sections/lt-science-split.liquid`).

**Recommendation:** remove `lucide-react` from `package.json`/lockfile; either wire
`check-heading-system.js` into a `package.json` script and run it, or archive it;
move the 10 orphaned `nmn-pdp-v2-*` sections plus the other confirmed-orphaned
sections/assets above into `_archive/` (per the existing `_archive/2026-07-23_nmn-template-cleanup/`
precedent) rather than deleting outright.

## 4. Files to archive or move

- **`docs/` has 10 loose scratch files with no frontmatter, not indexed anywhere,
  that look like generated tool output rather than documentation**:
  `push-dashboard.py`, `push-dashboard-note.py`, `push-dashboard-notes.json`,
  `push-dashboard-routes.json`, `blog-cover-generator.py`, `blog-svg-generator.py`,
  `geo-dashboard.html`, `homepage-dossier-preview.html`, `lifetime-wedge-final.html`,
  `science-preview.html`. These should move to a `docs/tools/` or `_archive/`
  location, or out of `docs/` entirely (e.g. into `scripts/` if still actively used).
- **`.playwright-mcp/`**: 21 tracked files (9 `console-*.log`, 12 `page-*.yml`),
  all dated 2026-04-02 — browser-automation debug/scratch output from a session,
  checked into git and not covered by `.gitignore`.
- **`.impeccable/config.json` and `.impeccable/design.json`**: local tool
  config/state checked into the repo root, not gitignored.
- **`.cursor/agent-images/68540cb7-...-0.png`**: a single stray screenshot from a
  Cursor agent session.

**Recommendation:** add `.playwright-mcp/` and `.impeccable/` to `.gitignore` and
remove the currently-tracked copies (they're per-session scratch state, not project
source); move or archive the `docs/` scratch files; delete the stray Cursor screenshot.

## Not an issue

- `scripts/fetch-image.js` and `dotenv` — legitimately used, documented, fine as-is.
- The known `.mdc`/`.md` doc-pairs and `docs/design-components.md` overlap are
  intentional per the July audit and still consistent.
- No `.DS_Store`, `Thumbs.db`, or editor swap files found.
