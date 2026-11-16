---
status: snapshot
last_review: 2026-11-16
---

# Theme folder audit, 16.11.2026

Automated scheduled review. Nothing was moved or deleted; this is a list of suggestions.
Basis: branch state at commit `9889279`. Caveat: the Theme Manager can hold newer state than git
(see CLAUDE.md), so "unused" below means "unused in the repo's templates", not proven unused live.

## 1. Markdown cleanup needed

**Broken links to docs that do not exist in this repo** (never committed here, probably live in the
outer workspace). They are referenced as if local:

| Missing file | Referenced from |
|---|---|
| `docs/age-dna-product-fact-sheet.md` | `docs/README.md`, `theme-status.md`, `PDP-DNA-UPGRADE/README.md`, `PDP-DNA-UPGRADE/01-rmbc-kontext.md`, `startseite-v2/README.md`, `agedna-pdp-impeccable-2/05-ablauf.md`, `age-dna-geo/PROMPT-A1-altbestand-anheben.md`, `age-dna-geo/artikel-genauigkeit-alterstest.md` |
| `docs/geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md` | `docs/README.md`, `geo-action-plan.md`, `age-dna-geo/*` |
| `docs/geo-p0-technical-audit-2026-07-29.md`, `geo-p0-url-decision-list-2026-07-29.md`, `geo-prompt-checkpoint-2026-08-14.md`, `geo-002-ga4-ai-referral-report-2026-07-29.md` | `docs/README.md`, `theme-status.md`, `geo-action-plan.md` |
| `docs/age-dna-evidence-request-pack-2026-07-29.md` | `docs/README.md` |
| `docs/limmroth-faktenblatt.md`, `briefing-expertenseite-aerzte.md`, `briefing-science-hub.md`, `briefing-science-umbau.md`, `briefing-system1-science-aerzte.md`, `hallmarks-of-aging-body.html`, `longevity-guide-illustrations.py`, `svg-src/`, `cover-hallmarks-of-aging.png` | `live-pages-map.md` (one of the five "Wo was steht" docs), `startseite-v2/README.md`, `briefing-pdp-refit.md` |
| `_archive/2026-05-08_workspace-cleanup/` | `live-pages-map.md`, `documentation-system-audit-2026-07-10.md` |
| `sections/lt-collection-register.liquid` (deleted 19.08.) | `theme-status.md:179`, `collection-all-spec.md` |
| `templates/product.13_nmn.json`, `product.legacy-13-2-nmn.json` | `nmn-angebotsarchitektur.md`, `nmn-blog-geo/nmn-blog-playbook.md`, `theme-status.md` |
| `cover-genetischer-epigenetischer-test.png`, `cover-nmn-zulassung-eu-verordnungsentwurf.png` | `age-dna-geo/artikel-a-genotyping-epigenetik.md`, `nmn-blog-geo/13-nmn-zulassung-verordnungsentwurf.md` |
| `_examples/PlumberPowerUpSwiftUI.swift` | `nmn-pdp-umsetzung-status.md` (looks like a stray paste) |
| Absolute paths `/Users/benediktjunker/...` | `science-blueprint-v1.1.md` (4 links, only work on BJ's Mac) |

Suggestion: either copy the GEO/fact-sheet docs into `docs/` or mark the references as
"workspace, outside the theme repo". `docs/README.md` should not list files it does not contain.

**Rules duplicated outside CLAUDE.md** (CLAUDE.md says it is the only rulebook):

- `docs/shopify-rules.md` is `status: living`, `canonical_for: shopify-platform-rules`, last reviewed
  08.05., and restates platform limits and workflow rules. It predates the 28.10. consolidation and
  was not archived with the others. Archive it to `docs/archive/2026-10-28_regeln-zusammengefuehrt/`.
- `docs/design-governance.md` and `docs/design-components.md` are listed as "background", fine, but
  have no frontmatter / date (design-governance) or a May date. Mark them `snapshot`.

**Stale status markers:**

- `docs/documentation-system-audit-2026-07-10.md` is `status: living` but describes the pre-28.10.
  rule system and lists files that no longer exist. Move to `docs/archive/`.
- `docs/lifetime-quiz-spec.md` is `status: superseded` but still in `docs/` root. Move to archive.
- `docs/mobile-lp-audit-2026-06-04.md` is a dated audit marked `living`. Mark `snapshot` or archive.
- `docs/geo-wettbewerbsanalyse-2026-08-03.md` is dated but `living`. Mark `snapshot`.
- No frontmatter at all: `conversion-messaging.md`, `design-governance.md`, `design-icon-system.md`,
  `homepage-blueprint-v2.md`, `homepage-copy-v2.md`, `science-blueprint-v1.1.md`, `science-copy-v1.1.md`,
  `DESIGN.md`, `PRODUCT.md`.

## 2. Documentation gaps

- **`docs/theme-status.md`**: the TL;DR is still "Aktueller Stand (2026-08-17)" (GEO-014), while the
  change log runs to 05.11. The top of the file no longer says what is live. The Kreatin, Resveratrol
  and D3+K2 PDP drafts (06.–08.11.) and `pdp-supplement-rollout.md` are not reflected in TL;DR/To-Dos.
- **`docs/live-pages-map.md`**: last review 29.09.; references ~10 missing files (see above). The five
  canonical rows (incl. NMN → `product.nmn-pulver.json`) are correct against `templates/`.
- **`docs/pdp-system.md`** is current (08.11.).
- **`docs/README.md`**: "Active Supporting Docs" lists 7 GEO files that are not here, and does not
  mention `pdp-supplement-rollout.md`, `pdp-startprompt.md`, `copy-unsere-forschung_2026-11-04.md`
  or the eight `entwurf-*` drafts and their folders.
- **`_examples/README.md`**: links are written relative to repo root (`sections/benefits.liquid`) but
  the files are in `_examples/sections/`. Prefix with `_examples/` or use relative links.
- `.claude/skills/lt-section/SKILL.md` mentions `scripts/search_docs.mjs`; that is the Shopify
  plugin's script, not this repo's. Fine, but could be worded to avoid confusion.

## 3. Code organization issues

**Sections not used by any template, section group or layout in the repo: 109 of 252.**
Of these 44 are `lt-`/`crs-`. Groups worth a decision:

- Old NMN PDP v2 set (10): `nmn-pdp-v2-*`, `nmn-pdp-quality-trust`, plus snippets
  `nmn-pdp-benefit-surface`, `nmn-pdp-quality-pills`, `nmn-pdp-subtitle` (not rendered anywhere).
  Superseded by `product.nmn-pulver.json`. Strong archive candidate.
- Old homepage set: `lt-hp-consultation`, `lt-hp-footer`, `lt-hp-journey`, `lt-hp-loop`,
  `lt-hp-problem`, `lt-hp-problem-v2`, `lt-hp-social-proof`, `lt-hp-supplements`, `hero-lifetime-section`,
  `hero-lifetime-test`, `lifetime-bento`, `lifetime-trustbar`, `longevity-start`.
- Old PDP blocks: `lt-pdp-a2-aufklaerungs-bruecke`, `lt-pdp-a3-process-press`, `lt-pdp-app-switch`,
  `lt-pdp-compare`, `lt-pdp-expert`, `lt-pdp-final-cta`, `lt-pdp-ideal-candidate`, `lt-pdp-laborwerte`,
  `lt-pdp-mechanism`, `lt-pdp-process`, `lt-pdp-report-preview`, `lt-pdp-shelf`, `lt-pdp-testimonials`,
  `lt-pdp-trust-mechanism`.
- Landing-page/campaign: `lt-lp-*` (4), `lt-campaign-hero`, `lt-campaign-stack`, `lt-page-*` (3),
  `lt-science-hallmarks`, `lt-science-limmroth`, `lt-wiss-messung`, `lt-about-mission`, `lt-expert-scope`,
  `lt-nad-age-graph`, `lt-quote`, `lt-stat-callout`.
- Unused `crs-`: `crs-expert-quotes`, `crs-guarantee-block`, `crs-knowledge-base`, `crs-social-quotes`,
  `crs-timeline`.
- Third-party "ss-*" app/section-store sections (18), several hashed duplicates
  (`ss-flexible-tabs` + `ss-flexible-tabs-68bfcf`, `ss-hero-pro` + `ss-hero-pro-b6628d`,
  `featured-collection-tabs-3` + `-1fb80a`).
- Combine stock sections unused because replaced (`main-article`, `main-blog`, `main-list-collections`
  → `lt-article` etc.). Keep: stock theme, low cost.
- Not orphans (rendered via Section Rendering API): `helper-*`, `product-quick-view`, `cart-recommendations`.

Note: unused sections still count against nothing, but they are offered in the theme editor and make
search for "existing section to extend" (CLAUDE.md step 3) noisy. Before archiving, verify against
the live theme's templates (Theme Manager may contain templates not in git).

**Assets with no reference found (12):** `app-snps-detail.png`, `component-collection-tabs.js`,
`component-recently-viewed.js`, `lifetime-collection-grid.css`, `lt-science-hero.jpg`,
`lt-science-limmroth.jpg`, `lt-summary-muster-2…6.jpg`, `science-healthspan-kurve.svg`.
(Images may be referenced from Shopify admin content; check before removing.)

**Templates:** `templates/product.spicegems-swatch.liquid` is an app leftover (SpiceGems swatches), not
referenced in docs; check whether the app is still installed.

**Dependencies:** `package.json` has `lucide-react` (a React icon library) in a Liquid theme. Not
imported anywhere in the repo. Remove. `dotenv` is used by `scripts/fetch-image.js`, keep.

**Scripts in the wrong place:** `docs/blog-cover-generator.py`, `docs/blog-svg-generator.py`,
`docs/push-dashboard.py`, `docs/push-dashboard-note.py` (+ `push-dashboard-*.json`) are tooling and
belong in `scripts/`.

**Tracked files that are gitignored or tool junk:**

- `.cursor/commands.json`, `.cursor/mcp.json` are listed in `.gitignore` but still tracked
  (`git rm --cached`). Checked: no tokens in `mcp.json`.
- `.cursor/agent-images/*.png`, `.playwright-mcp/` (732 KB of April console logs and page snapshots)
  are session artefacts. Remove and add to `.gitignore`.
- `.impeccable/critique/` (2 critique reports from Oct.) fine if intended; otherwise move to `docs/`.
- `skills-lock.json` pins `ux-design` from `civitai/civitai` in `.agents/skills/`. Confirm it is wanted.

## 4. Files to archive or move

| File(s) | Suggestion |
|---|---|
| `docs/shopify-rules.md` | → `docs/archive/2026-10-28_regeln-zusammengefuehrt/` |
| `docs/documentation-system-audit-2026-07-10.md`, `docs/lifetime-quiz-spec.md`, `docs/mobile-lp-audit-2026-06-04.md` | → `docs/archive/` |
| `docs/entwurf-2026-10-2*` (md, html, images, `entwurf-ag1-*`, `entwurf-startseite-*`), `ag1-hero-analyse-2026-10-26.md`, `agedna-pdp-*-2026-10-27.*`, `agedna-pdp-impeccable/`, `agedna-pdp-v2/` | once decided/implemented → `docs/archive/2026-10_entwuerfe/`. `docs/` root has 100 entries, ~45 of them drafts or images |
| 16 loose images in `docs/` root (`cover-*.png`, `entwurf-*.jpg/webp`, `.woff2`) | → `docs/img/` or next to their draft |
| `docs/*.py`, `docs/push-dashboard-*.json` | → `scripts/` |
| `sections/nmn-pdp-v2-*`, `nmn-pdp-quality-trust`, `snippets/nmn-pdp-*` | → `_archive/2026-11_nmn-pdp-v2/` after live check |
| Unused `lt-hp-*`, `lt-pdp-*`, `lt-lp-*` sections (lists above) | → `_archive/` after live check |
| `.playwright-mcp/`, `.cursor/agent-images/` | delete + `.gitignore` |
| `lucide-react` in `package.json` | remove |
