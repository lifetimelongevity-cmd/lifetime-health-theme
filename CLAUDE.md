# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Shopify Liquid theme** ("Combine" by KrownThemes v3.1.1) customized for **Lifetime Health**, a German longevity and wellness e-commerce brand selling DNA tests and supplements.

## Development Commands

No build system exists — this is a pure Shopify theme. Development uses the Shopify CLI:

```bash
shopify auth login --store <store-name>.myshopify.com
shopify theme dev       # Start with hot-reload
shopify theme push      # Push to store
shopify theme pull      # Pull latest from store
shopify theme list      # List available themes
```

## Architecture

### Template System

1. **Layouts** (`/layout/`) — HTML wrapper (`theme.liquid` is entry point)
2. **Templates** (`/templates/`) — JSON files declaring sections per page type
3. **Sections** (`/sections/`) — Reusable components (117 files); Liquid + `{% schema %}`
4. **Snippets** (`/snippets/`) — Stateless partials via `{% render 'snippet-name' %}`
5. **Blocks** (`/blocks/`) — Nested components within sections

**Critical limits:**
- Product JSON templates: **max 25 sections** in `order` array
- Section schema `name`: **≤ 25 characters** (error: *name ist zu lang*)
- Schema `default`: **never empty string** (error: *default darf nicht leer sein*)

Full details: `.cursor/rules/shopify-rules.mdc`

### JavaScript Pattern

Vanilla ES6+, no framework. Web Components pattern:
- `ModalBox`, `MainHeader`, `CSSSlider`, `ProductVariants` are custom elements
- Re-init via `shopify:section:load` events

### Styling

Modular CSS in `/assets/`. No preprocessor.
- `theme.css` — Base styles, CSS custom properties
- `section-*.css` — Section-scoped styles
- All values via CSS tokens defined in `.cursor/rules/design-tokens.mdc`

---

## Design & Visual System

### Visual North Star

**→ Open `_examples/pdp-reference.html` before building any PDP section.**

This is the approved mobile PDP design. All PDP work must match its visual quality,
spacing rhythm, component structure, and token usage.

### Approved Section Examples

**→ Read `_examples/README.md` before building any section.**

Approved reference implementations with full decision documentation:

| File | Pattern | Use for |
|---|---|---|
| `_examples/sections/benefits.liquid` | card-info × 3 | benefit/feature grids |
| `_examples/sections/stat-callout.liquid` | stat-callout | numbers/proof sections |
| `_examples/sections/reviews.liquid` | card-review × 3 | testimonial sections |
| `_examples/sections/quote.liquid` | quote-block | expert/testimonial emphasis |

### Design Governance

All visual decisions follow `.cursor/rules/design-components.mdc` and the token system in `.cursor/rules/design-tokens.mdc`.

**Never:**
- Hardcode hex colors or px values
- Use `#000000` as background
- Introduce new font families
- Create layout patterns not in the approved system

**Always:**
- Reference tokens for every value
- Read the closest approved example before building
- Apply the §12 build process (spec → build → QA)
- Run the visual craft QA before outputting code

### Messaging Governance

All copy follows `docs/conversion-messaging.md`:
- German, Du-form
- No medical claims, no cure language
- No claim stacking (one badge = one message)
- Tone: intelligent but simple, calm, trustworthy

---

## Mandatory Design Review Step

After generating any section implementation, run this:

> "Review the section above against the visual craft QA checklist in `.cursor/rules/design-components.mdc`.
> List any failures. Then produce a revised version that fixes them. Output corrected code only."

---

## Implementation Guardrails

- **Do not** propose full rewrites or new design systems
- **Do not** invent layout patterns not in `_examples/`
- **Prefer** minimal, incremental changes
- **Reuse** existing sections, snippets, CSS classes, and patterns
- **Inspect** current implementation before proposing changes
- **Check** app interactions and regression points

---

## Cursor Rules Index

| File | Active for | Purpose |
|---|---|---|
| `.cursor/rules/design-tokens.mdc` | all files | CSS token definitions |
| `.cursor/rules/design-components.mdc` | sections, snippets, CSS | Component specs + visual QA |
| `.cursor/rules/shopify-rules.mdc` | liquid, json, templates | Platform limits + operating rules |
| `.cursor/rules/pdp-architecture.mdc` | product templates, PDP sections | Section order + psychology |