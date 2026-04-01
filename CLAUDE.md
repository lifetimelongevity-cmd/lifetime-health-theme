# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Shopify Liquid theme** ("Combine" by KrownThemes v3.1.1) customized for **Lifetime Health**, a German longevity and wellness e-commerce brand selling DNA tests and supplements.

## Development Commands

No build system exists — this is a pure Shopify theme. Development uses the Shopify CLI:

```bash
# Authenticate with Shopify store
shopify auth login --store <store-name>.myshopify.com

# Start development with hot-reload
shopify theme dev

# Push theme to store
shopify theme push

# Pull latest theme from store
shopify theme pull

# List available themes
shopify theme list
```

## Architecture

### Template System

Shopify's three-layer rendering stack:
1. **Layouts** (`/layout/`) — HTML wrapper (theme.liquid is the entry point for all pages)
2. **Templates** (`/templates/`) — JSON files declaring which sections to render per page type
3. **Sections** (`/sections/`) — Reusable page components (117 files); each has Liquid markup + `{% schema %}` for theme editor settings

**Limits (Theme Check / `theme push`):** Product JSON templates allow **at most 25** sections in `order`. Section schema `"name"` (and preset names where validated) must be **≤ 25 characters** (e.g. German admin: *name ist zu lang*). Details: `.cursor/rules/shopify-operating-rules.md` → *Shopify platform limits*.
4. **Snippets** (`/snippets/`) — Stateless partials rendered via `{% render 'snippet-name' %}`
5. **Blocks** (`/blocks/`) — Nested components within sections

### JavaScript Pattern

Vanilla ES6+ with **no framework or build step**. JS files in `/assets/` are loaded directly.

Key pattern: **Web Components** (Custom HTML Elements) for interactive UI:
- `ModalBox`, `MainHeader`, `CSSSlider`, `ProductVariants` are all custom elements
- Section re-initialization handled via `shopify:section:load` events (for theme editor)

Major JS files:
- `component-product-form.js` — Variant selection, add-to-cart, form logic
- `component-facets.js` — Collection filtering/search
- `component-quick-buy.js` — Quick purchase modal
- `instantpage.js` — Link prefetching

### Styling

Modular CSS in `/assets/` with no preprocessor or bundler:
- `theme.css` — Base styles, reset, typography, CSS custom properties
- `section-*.css` — Section-scoped styles
- `component-*.css` — Component-scoped styles

CSS variables drive theme customization. Theme colors/typography are set via `/config/settings_schema.json` and output as Liquid variables from `theme.liquid`.

### Settings System

- `/config/settings_schema.json` — Defines all customizable settings (colors, typography, layout, product card behavior)
- `/config/settings_data.json` — Auto-generated current values; **do not edit manually**

### Domain-Specific Templates

Custom templates beyond Shopify defaults:
- `agedna-*` templates — DNA test product landing pages and result pages
- `page.*.json` — Custom marketing/info pages
- `asta-sun.json` — Specific product page variant

### Localization

28+ languages in `/locales/`. Each language has `<lang>.json` (UI strings) and `<lang>.schema.json` (theme editor labels). Translation keys use `t:` namespace in schema files (e.g., `t:settings_schema.typography.name`).

### Analytics & Privacy

- Google Tag Manager (`GTM-TMTRXHLQ`) loaded in `layout/theme.liquid`
- Shopify Customer Privacy API + Consentmo for GDPR cookie consent
- Google Consent Mode V2 integration

### Key Variables

- `{{ settings.* }}` — Theme setting values
- `{{ request.design_mode }}` — True when viewed in Shopify theme editor
- `{{ customer }}` — Current logged-in customer (nil if guest)

## Implementation Guardrails

This is an existing live Shopify theme.

- Do not propose full rewrites or new design systems.
- Prefer minimal, incremental changes.
- Reuse existing sections, snippets, CSS classes, and patterns.
- Always inspect the current implementation before proposing changes.
- Be aware that apps and custom code may affect behavior.
- Favor solutions that work within the current theme structure over idealized architectures.


## Design & Messaging Governance

Visual design rules are defined in:
→ /docs/design-governance.md
Always strictly follow design-governance.md and never override critical design elements.

Conversion messaging and copy rules are defined in:
→ /docs/conversion-messaging.md

Usage:
- Use design-governance.md for layout, spacing, typography, and UI decisions
- Use conversion-messaging.md for copy, messaging, and decision framing
- Do not mix responsibilities
- Do not introduce new patterns that conflict with these systems

These rules govern all visual and UX decisions.
Always follow them unless explicitly overridden.

### DESIGN REVIEW STEP (mandatory before any section is finalized)

After generating implementation, run this prompt:

"Review the section above against design-governance.md Section 6b (visual weight),
Section 11 (subtraction rules), and the Visual Craft QA checklist. List any failures.
Then produce a revised version that fixes them. Do not explain the changes — just
output the corrected code."