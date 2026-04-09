# AGENTS.md

This file orients AI agents working in this repository.

## Project

Shopify Liquid theme ("Combine" by KrownThemes v3.1.1) for **Lifetime Health** — a German longevity brand selling NMN, DNA tests, and supplements. Live production store.

## Source of Truth Hierarchy

1. **Implemented theme** — files in `/sections/`, `/templates/`, `/snippets/` are primary
2. `/docs/pdp-system.md` — actual PDP section order, proof structure, and messaging logic
3. `.cursor/rules/` — design tokens, component specs, Shopify platform rules
4. `docs/design-governance.md` — full visual system reference
5. `docs/conversion-messaging.md` — copy and messaging governance

## Where Rules Live

| Concern | File |
|---|---|
| Shopify implementation | `/shopify/AGENTS.md` · `.cursor/rules/shopify-rules.mdc` |
| PDP section order + system | `/docs/pdp-system.md` |
| Design tokens | `.cursor/rules/design-tokens.mdc` |
| Component specs + visual QA | `.cursor/rules/design-components.mdc` |
| Visual system + layout | `docs/design-governance.md` |
| Copy + messaging | `docs/conversion-messaging.md` |
| New product onboarding | `docs/lt-pdp-template-notes.md` |

## Working Model

- Read the relevant section, snippet, or template before implementing anything.
- Extend, do not replace. Reuse existing sections, CSS classes, and Liquid patterns.
- Minimal-invasive over elegant rewrites.
- Check app interactions and regression points before proposing any edit.

## Note on pdp-architecture.mdc

`.cursor/rules/pdp-architecture.mdc` contains a useful psychological journey model (6 stages: attention → understanding → personal relevance → trust → risk reduction → action). Its section-by-section map is outdated and does not reflect the live template. Use `/docs/pdp-system.md` for actual section order and system logic.
