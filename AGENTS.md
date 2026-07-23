# AGENTS.md

This file orients AI agents working in this repository.

## Project

Shopify Liquid theme ("Combine" by KrownThemes v3.1.1) for **Lifetime Health** — a German longevity brand selling NMN, DNA tests, and supplements. Live production store.

## Source of Truth Hierarchy

1. **Implemented theme** — files in `/sections/`, `/templates/`, `/snippets/` are primary
2. `/docs/pdp-system.md` — actual PDP section order, proof structure, and messaging logic
3. `/docs/live-pages-map.md` — live slug-to-template mapping when a task refers to a published page
4. `.cursor/rules/` — compact AI execution rules
5. `docs/design-governance.md` — full visual system reference
6. `docs/conversion-messaging.md` — copy and messaging governance
7. `docs/README.md` — documentation index and archive boundary

## Where Rules Live

| Concern | File |
|---|---|
| Shopify implementation | `/shopify/AGENTS.md` · `.cursor/rules/shopify-rules.mdc` |
| Live page mapping | `/docs/live-pages-map.md` |
| PDP section order + system | `/docs/pdp-system.md` |
| Design tokens | `.cursor/rules/design-tokens.mdc` |
| Component specs + visual QA | `.cursor/rules/design-components.mdc` |
| Section heading system | `.cursor/rules/section-heading-stack.mdc` · `/docs/section-heading-stack.md` |
| Visual system + layout | `docs/design-governance.md` |
| Copy + messaging | `docs/conversion-messaging.md` |
| New product onboarding | `docs/lt-pdp-template-notes.md` |
| Theme change log / status tracker | `docs/theme-status.md` |

## Working Model

- Read the relevant section, snippet, or template before implementing anything.
- Extend, do not replace. Reuse existing sections, CSS classes, and Liquid patterns.
- Minimal-invasive over elegant rewrites.
- Check app interactions and regression points before proposing any edit.
- After template/schema changes, use Shopify CLI (`shopify theme pull`, `shopify theme dev`, `shopify theme push`) and verify the pushed file is actually on the MAIN theme and renders live. New template files can be missed by Theme Manager-only pushes.

## Note on pdp-architecture.mdc

`.cursor/rules/pdp-architecture.mdc` contains a useful psychological journey model (6 stages: attention → understanding → personal relevance → trust → risk reduction → action). Its section-by-section map is outdated and does not reflect the live template. Use `/docs/pdp-system.md` for actual section order and system logic.
