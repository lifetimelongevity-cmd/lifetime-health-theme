---
status: living
last_review: 2026-07-10
canonical_for: documentation-index-and-hierarchy
---

# LIFETIME Documentation Map

Dieses Verzeichnis trennt aktive Projekt-Guidance von historischen Briefings.

## Source of Truth Hierarchy

1. **Live Theme Code** — `sections/`, `templates/`, `snippets/`
2. **Live page mapping** — `docs/live-pages-map.md`
3. **PDP system logic** — `docs/pdp-system.md`
4. **AI execution rules** — `.cursor/rules/*.mdc`
5. **Human-readable governance** — die aktiven Dokumente in `docs/`
6. **Archive** — `docs/archive/` und `_archive/`

## Active Core Guidance

| Topic | Canonical file |
|---|---|
| Repo orientation | `/AGENTS.md`, `/CLAUDE.md` |
| Shopify implementation | `/shopify/AGENTS.md`, `/.cursor/rules/shopify-rules.mdc` |
| Live slug/template mapping | `/docs/live-pages-map.md` |
| PDP structure and roles | `/docs/pdp-system.md` |
| Messaging and claims | `/docs/conversion-messaging.md` |
| Visual system and tokens | `/docs/design-governance.md`, `/.cursor/rules/design-tokens.mdc` |
| Component QA and section build rules | `/docs/design-components.md`, `/.cursor/rules/design-components.mdc` |
| Section heading system | `/docs/section-heading-stack.md`, `/.cursor/rules/section-heading-stack.mdc` |
| Product onboarding | `/docs/lt-pdp-template-notes.md` |

## Active Supporting Docs

| Group | Files |
|---|---|
| Science / homepage implementation specs | `homepage-*`, `science-*`, `ueber-lifetime-rebuild-prompt.md` |
| Quiz docs | `lifetime-quiz-spec.md`, `lifetime-doctor-quiz-spec.md`, `lifetime-quiz-shopify-setup.md`, `mobile-lp-audit-2026-06-04.md` |
| GEO / content strategy | `geo-strategy.md`, `age-dna-geo/`, `nmn-blog-geo/`, `blog-design-best-practices.md` |
| Research / evidence | `nmn-pdp-evidence-base.md` |
| Status / operations | `theme-status.md` |
| Claude design bundle | `design-system/README.md` |

## Archive Rules

- `docs/archive/` = deprecated or one-off documentation, prompts, and drafts
- `_archive/` = archived theme code, templates, snippets, and assets
- If a doc is no longer active but still informative, move it to `docs/archive/` instead of deleting it

## Known Overlaps

- `.cursor/rules/*.mdc` are the compact execution layer for AI agents.
- The matching `docs/*.md` files exist for fuller human-readable context when needed.
- When these disagree, prefer the live code, then the root/source-of-truth files above.
