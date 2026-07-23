---
status: living
last_review: 2026-07-10
canonical_for: documentation-housekeeping-report-2026-07-10
---

# Documentation System Audit — 2026-07-10

## Phase 1 — Inventory

### Root instruction files

- `AGENTS.md` — top-level agent orientation and source-of-truth hierarchy
- `CLAUDE.md` — broader working playbook and rules index
- `shopify/AGENTS.md` — implementation-specific Shopify rules

### Active AI rules

- `.cursor/rules/design-tokens.mdc` — token reminder, always apply
- `.cursor/rules/design-components.mdc` — component rules and QA
- `.cursor/rules/section-heading-stack.mdc` — shared heading system
- `.cursor/rules/shopify-rules.mdc` — Shopify operating rules
- `.cursor/rules/pdp-architecture.mdc` — psychological PDP framework, explicitly not the live section map

### Active governance and operating docs

- `docs/design-governance.md` — visual governance
- `docs/design-components.md` — human-readable component system and QA
- `docs/conversion-messaging.md` — copy/messaging rules
- `docs/pdp-system.md` — live PDP structure
- `docs/live-pages-map.md` — live slug/template mapping
- `docs/section-heading-stack.md` — canonical heading-stack implementation notes
- `docs/lt-pdp-template-notes.md` — new product onboarding
- `docs/theme-status.md` — living status tracker
- `docs/design-system/README.md` — Claude design bundle documentation

### Active implementation specs, research, and strategy

- `docs/homepage-blueprint-v2.md`, `docs/homepage-copy-v2.md`
- `docs/science-blueprint-v1.1.md`, `docs/science-copy-v1.1.md`
- `docs/ueber-lifetime-rebuild-prompt.md`
- `docs/lifetime-quiz-spec.md`, `docs/lifetime-doctor-quiz-spec.md`, `docs/lifetime-quiz-shopify-setup.md`
- `docs/mobile-lp-audit-2026-06-04.md`
- `docs/geo-strategy.md`
- `docs/nmn-pdp-evidence-base.md`
- `docs/blog-design-best-practices.md`
- `docs/age-dna-geo/*`
- `docs/nmn-blog-geo/*`

### Archived or superseded docs identified during review

- `docs/science-page-rebuild-prompt.md` — already marked archived
- `docs/meine-routine-optimization-prompt.md` — already marked archived
- `docs/science-blueprint-v1.md` — superseded by `science-blueprint-v1.1.md`
- Root-level files: `landing-page-copywriter.md`, `langin-page-optimizer.md`, `pdp-blueprint-v3-14_1_test.md`, `pdp-copy-14_1_test.md`
- `_archive/docs/nmn-pdp-alternative.md` — documentation archive stored under code archive

## Phase 2 — Analysis

### Main problems

1. Active and archived docs were mixed together in `docs/` and at repo root.
2. `AGENTS.md` did not surface `docs/live-pages-map.md` or the heading-stack rule, even though both are active and referenced often.
3. `docs/theme-status.md` pointed to a missing `_archive/2026-05-08_workspace-cleanup/` location.
4. `docs/design-components.md` and `.cursor/rules/design-components.mdc` contained an icon rule that assumed `lucide-react`, which conflicts with the Shopify theme environment and with the repo’s icon-system docs.
5. Historical prompts and product drafts were discoverable before active guidance because they lived in the root.

### Overlaps and authority decisions

- `docs/design-components.md` and `.cursor/rules/design-components.mdc` intentionally overlap.
  Decision: keep both, but treat `.mdc` as compact AI execution rules and `.md` as human-readable companion.
- `docs/shopify-rules.md` overlaps with `shopify/AGENTS.md` and `.cursor/rules/shopify-rules.mdc`.
  Decision: leave in place for now, but demote it from the main discovery path and prefer the `shopify/AGENTS.md` + `.mdc` pair.
- `.cursor/rules/pdp-architecture.mdc` is partially outdated by design.
  Decision: keep active because its psychological framework is still useful, but continue to defer live section order to `docs/pdp-system.md`.

## Phase 3 — Restructuring Plan

### Target structure

- Root: only top-level working guides and project files
- `docs/`: active human-readable project documentation
- `.cursor/rules/`: compact AI execution rules
- `docs/archive/`: archived prompts, drafts, and legacy root-level docs
- `_archive/`: code/template/snippet/asset archives

### Exact moves

- Move archived prompts from `docs/` into `docs/archive/prompts/`
- Move superseded `science-blueprint-v1.md` into `docs/archive/drafts/`
- Move root-level legacy notes into `docs/archive/legacy-root-files/`
- Move root-level PDP draft packs into `docs/archive/pdp-drafts/`
- Move `_archive/docs/nmn-pdp-alternative.md` into `docs/archive/prompts/`

### Reference updates

- Add a central `docs/README.md`
- Add a `docs/archive/README.md`
- Update `AGENTS.md` and `CLAUDE.md` to expose missing active rules
- Update references affected by moved files
- Fix `theme-status.md` archive references
- Remove the active icon-rule contradiction from the component guidance

## Phase 4 — Applied Changes

### Files moved / renamed

- `docs/meine-routine-optimization-prompt.md` → `docs/archive/prompts/meine-routine-optimization-prompt.md`
- `docs/science-page-rebuild-prompt.md` → `docs/archive/prompts/science-page-rebuild-prompt.md`
- `docs/science-blueprint-v1.md` → `docs/archive/drafts/science-blueprint-v1.md`
- `landing-page-copywriter.md` → `docs/archive/legacy-root-files/landing-page-copywriter.md`
- `langin-page-optimizer.md` → `docs/archive/legacy-root-files/landing-page-optimizer.md`
- `pdp-blueprint-v3-14_1_test.md` → `docs/archive/pdp-drafts/pdp-blueprint-v3-14_1_test.md`
- `pdp-copy-14_1_test.md` → `docs/archive/pdp-drafts/pdp-copy-14_1_test.md`
- `_archive/docs/nmn-pdp-alternative.md` → `docs/archive/prompts/nmn-pdp-alternative.md`

### Files added

- `docs/README.md`
- `docs/archive/README.md`
- `docs/documentation-system-audit-2026-07-10.md`

### Files updated

- `AGENTS.md`
- `CLAUDE.md`
- `docs/design-components.md`
- `.cursor/rules/design-components.mdc`
- `docs/theme-status.md`
- `docs/science-blueprint-v1.1.md`
- `docs/archive/prompts/meine-routine-optimization-prompt.md`

## Phase 5 — Final Report

### References updated

- `docs/science-blueprint-v1.1.md` now points to the archived V1 blueprint
- `docs/archive/prompts/meine-routine-optimization-prompt.md` now points to the archived science rebuild prompt
- `AGENTS.md` and `CLAUDE.md` now surface the heading-stack rule and live page map more clearly
- `docs/theme-status.md` no longer references a missing workspace-cleanup archive path

### Remaining ambiguities / manual review

1. `docs/shopify-rules.md` is still largely redundant with `shopify/AGENTS.md` and `.cursor/rules/shopify-rules.mdc`; it should be reviewed later for possible archival or conversion into a short human-facing summary.
2. `docs/design-icon-system.md` is still active, but the repo’s actual icon implementation patterns are mixed between inline SVG and Phosphor-style section settings. The major contradiction is removed, but a future pass could tighten the icon implementation standard further.
3. `docs/ueber-lifetime-rebuild-prompt.md` is still marked `living` even though its header says it can become superseded after live verification. That status depends on external verification, so it was left unchanged.
