---
status: living
last_review: 2026-10-28
canonical_for: documentation-index-and-hierarchy
---

# LIFETIME Documentation Map

Dieses Verzeichnis trennt aktive Projekt-Guidance von historischen Briefings.

## Regeln

**Alle Regeln stehen in `/CLAUDE.md`** (seit 28.10.2026 das einzige Regelwerk, auch für andere Agenten). Die Docs hier beschreiben Seiten, Stände und Hintergründe; sie stellen keine eigenen Regeln auf. Reihenfolge bei Widerspruch: Live-Seite, dann Theme-Code, dann `/CLAUDE.md`, dann alles in `docs/`.

## Nachschlagen

| Frage | Datei |
|---|---|
| URL → Template → Section | `/docs/live-pages-map.md` |
| Aufbau der PDPs | `/docs/pdp-system.md` |
| Messaging im Detail | `/docs/conversion-messaging.md` |
| Heading-System, ausführlich | `/docs/section-heading-stack.md` |
| Neues Produkt anlegen | `/docs/lt-pdp-template-notes.md` |
| Live-Stand, wartende Pushes | `/docs/theme-status.md` |
| Visuelle Sprache (Impeccable) | `/DESIGN.md` |
| Langfassungen zu Design (Hintergrund, keine Pflichtlektüre) | `/docs/design-governance.md`, `/docs/design-components.md` |

## Active Supporting Docs

| Group | Files |
|---|---|
| Science / homepage implementation specs | `homepage-*`, `science-*`, `ueber-lifetime-rebuild-prompt.md` |
| Quiz docs | `lifetime-quiz-spec.md`, `lifetime-doctor-quiz-spec.md`, `lifetime-quiz-shopify-setup.md`, `mobile-lp-audit-2026-06-04.md` |
| GEO / content strategy | `geo-dashboard.html`, `geo-strategy.md`, `geo-action-plan.md`, `geo-prompt-panel.md`, `geo-prompt-baseline-2026-07-29.md`, `geo-claim-ledger.md`, `age-dna-product-fact-sheet.md`, `age-dna-evidence-request-pack-2026-07-29.md`, `geo-p0-technical-audit-2026-07-29.md`, `geo-p0-url-decision-list-2026-07-29.md`, `age-dna-geo/`, `nmn-blog-geo/`, `blog-design-best-practices.md` |
| AGE&DNA-PDP upgrade package | `PDP-DNA-UPGRADE/` (`README.md`, `01-rmbc-kontext.md` copy/offer layer, `02-massnahmen.md`, `03-cro-befunde.md` measured CRO layer) |
| Research / evidence | `nmn-pdp-evidence-base.md` |
| Status / operations | `theme-status.md`, `geo-dashboard.html` |
| Claude design bundle | `design-system/README.md` |

## Archive Rules

- `docs/archive/` = deprecated or one-off documentation, prompts, and drafts
- `_archive/` = archived theme code, templates, snippets, and assets
- If a doc is no longer active but still informative, move it to `docs/archive/` instead of deleting it

## Frühere Regelsammlung

`AGENTS.md`-Langfassung, `shopify/AGENTS.md` und `.cursor/rules/*.mdc` liegen seit 28.10.2026 in `docs/archive/2026-10-28_regeln-zusammengefuehrt/`.
