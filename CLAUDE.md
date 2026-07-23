---
status: living
last_review: 2026-06-15
canonical_for: shopify-theme-orientation
---

# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository: the live Shopify theme for Lifetime Health.

## Project Overview

This is a **Shopify Liquid theme** ("Combine" by KrownThemes v3.1.1) customized for **Lifetime Health**, a German longevity and wellness e-commerce brand selling DNA tests and supplements.

## Kanonisches Fundament (Live = Source of Truth)

Diese 5 Live-Seiten sind das Fundament für Struktur, Copy und visuelle Qualität. Bevor du an einer Section oder Copy arbeitest: sieh dir die thematisch nächste Seite live an (Chrome-MCP; für Mobile echte Handy-Screenshots, siehe Memory). Live schlägt jede MD-Spec.

1. Startseite        `https://www.lifetime-health.de/`
2. PDP AGE&DNA-Test  `https://www.lifetime-health.de/products/lifetime-age-dna`
3. Science           `https://www.lifetime-health.de/pages/science`
4. Quiz              `https://www.lifetime-health.de/pages/quiz-age`
5. PDP NMN           `https://www.lifetime-health.de/products/lifetime-nmn`

### Vorrang bei Konflikt (oben gewinnt)

1. **Live-Seite** (die 5 oben), tatsächlich publiziert = SoT für Inhalt und Section-Reihenfolge
2. **`docs/live-pages-map.md`** = wo der Code liegt (Slug zu Template zu Section)
3. **`_examples/`** = approved Bau-Muster (für PDP zuerst `_examples/pdp-reference.html` öffnen)
4. **`.cursor/rules/`** = Tokens, Plattform-Limits, Component-Specs

MD-Specs sind Beschreibung, nicht Vertrag. Bei Drift: Live prüfen, dann MD nachziehen oder als `superseded` markieren.

## Development Commands

No build system exists, this is a pure Shopify theme. Development uses the Shopify CLI:

```bash
shopify auth login --store <store-name>.myshopify.com
shopify theme dev       # Start with hot-reload
shopify theme push      # Push to store
shopify theme pull      # Pull latest from store
shopify theme list      # List available themes
```

## Architecture

### Template System

1. **Layouts** (`/layout/`): HTML wrapper (`theme.liquid` is entry point)
2. **Templates** (`/templates/`): JSON files declaring sections per page type
3. **Sections** (`/sections/`): Reusable components (117 files); Liquid + `{% schema %}`
4. **Snippets** (`/snippets/`): Stateless partials via `{% render 'snippet-name' %}`
5. **Blocks** (`/blocks/`): Nested components within sections

**Critical limits:**
- Product JSON templates: **max 25 sections** in `order` array
- Section schema `name`: **max 25 characters** (error: *name ist zu lang*)
- Schema `default`: **never empty string** (error: *default darf nicht leer sein*)

Full details: `.cursor/rules/shopify-rules.mdc`

### JavaScript Pattern

Vanilla ES6+, no framework. Web Components pattern:
- `ModalBox`, `MainHeader`, `CSSSlider`, `ProductVariants` are custom elements
- Re-init via `shopify:section:load` events

### Styling

Modular CSS in `/assets/`. No preprocessor.
- `theme.css`: Base styles, CSS custom properties
- `section-*.css`: Section-scoped styles
- All values via CSS tokens defined in `.cursor/rules/design-tokens.mdc`

---

## Design & Visual System

### Approved Section Examples

Read `_examples/README.md` before building any section. Approved reference implementations with full decision documentation:

| File | Pattern | Use for |
|---|---|---|
| `_examples/sections/benefits.liquid` | card-info × 3 | benefit/feature grids |
| `_examples/sections/stat-callout.liquid` | stat-callout | numbers/proof sections |
| `_examples/sections/reviews.liquid` | card-review × 3 | testimonial sections |
| `_examples/sections/quote.liquid` | quote-block | expert/testimonial emphasis |

For PDP work the visual north star is `_examples/pdp-reference.html` (approved mobile PDP): match its visual quality, spacing rhythm, component structure, and token usage.

### Design Governance

All visual decisions follow `.cursor/rules/design-components.mdc` and the token system in `.cursor/rules/design-tokens.mdc`.

**Never:**
- Hardcode hex colors or px values
- Use `#000000` as background
- Introduce new font families
- Use decorative colored left-/accent-borders (`border-left` with a color); separate via whitespace, hierarchy, tokens
- Create layout patterns not in the approved system

**Always:**
- Reference tokens for every value
- Read the closest approved example before building
- Apply the §12 build process (spec, build, QA)
- Run the visual craft QA before outputting code

### Messaging Governance

All copy follows `docs/conversion-messaging.md`:
- German, Du-form
- No medical claims, no cure language
- One claim = one message, no claim stacking
- Tone: intelligent but simple, calm, trustworthy

### Keine KI-Tells (generierte Copy + Section-CSS)

- Keine Em-Dashes in Copy. Stattdessen Komma, Punkt oder Klammer.
- Keine rhythmischen Dreiklang-/Stakkato-Slogans ("Schneller. Klarer. Besser.").
- Keine farbigen Left-/Accent-Borders als Deko (siehe Never-Liste oben).

Detail Copy: `docs/conversion-messaging.md` §9. Detail Visual: `.cursor/rules/design-components.mdc`.

---

## Working Rules

- After generating a section, run the visual craft QA in `.cursor/rules/design-components.mdc`: list failures, then output only the corrected code.
- Do not propose full rewrites or new design systems; prefer minimal, incremental changes.
- Do not invent layout patterns not in `_examples/`.
- Reuse existing sections, snippets, CSS classes, and patterns.
- Inspect the current implementation and check app interactions / regression points before changing it.

---

## Rules Index

| File | Active for | Purpose |
|---|---|---|
| `/AGENTS.md` | all agents | Project orientation + source of truth hierarchy |
| `/docs/live-pages-map.md` | any task referring to a live page | Slug to Template to Section mapping. **Read first** when the user names a live page by URL or label. |
| `/shopify/AGENTS.md` | Shopify implementation | Theme rules, naming, CSS scoping, QA |
| `/docs/pdp-system.md` | PDP work | Live section order, proof structure, messaging |
| `.cursor/rules/design-tokens.mdc` | all files | CSS token definitions |
| `.cursor/rules/design-components.mdc` | sections, snippets, CSS | Component specs + visual QA |
| `.cursor/rules/section-heading-stack.mdc` | sections | Shared heading stack rules for LT/CRS sections |
| `.cursor/rules/shopify-rules.mdc` | liquid, json, templates | Platform limits + operating rules |
| `.cursor/rules/pdp-architecture.mdc` | PDP sections | Psychological journey model (section map, see pdp-system.md) |
| `docs/design-governance.md` | visual decisions | Full visual system reference |
| `docs/conversion-messaging.md` | copy | Messaging governance, subscription framing, KI-Tells (§9) |
| `docs/lt-pdp-template-notes.md` | new products | Per-product field checklist for PDP duplication |
| `docs/nmn-angebotsarchitektur.md` | NMN pricing, shipping, subscription, guarantee | Zielzustand für Preisraster, Größenwahl, Versandmodell, Garantie-Copy. Live weicht ab, Abweichungen sind dort markiert. |
