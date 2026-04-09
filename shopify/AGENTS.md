# Shopify Implementation Rules — LIFETIME Theme

Theme: Combine by KrownThemes v3.1.1. Treat as live production. No experimental rewrites.

## Core Principle

Extend before creating. Reuse before rebuilding. Inspect before implementing.

Before writing any code, read:
- The relevant template JSON (e.g., `templates/product.13_3_nmn.json`)
- The section or snippet being modified
- Any CSS file loaded by that section

## Template Structure

```
/layout/           — theme.liquid is the entry point
/templates/        — JSON files; declare sections per page type
/sections/         — Liquid + {% schema %}; 117 files, reuse aggressively
/snippets/         — stateless partials via {% render 'snippet-name' %}
/blocks/           — nested components within sections
/assets/           — CSS (modular, no preprocessor) + JS
```

## Platform Limits (cause push failures)

- Product JSON `order` array: **max 25 section instances**
- Section schema `name`: **≤ 25 characters** (error: *name ist zu lang*)
- Schema `default`: **never `""`** — omit `default` or use a non-empty placeholder

## Section Naming and Prefixes

- LIFETIME-owned custom sections use the `lt-` prefix: `lt-pdp-hero`, `lt-comparison-table`
- Conversion-focused shared sections use `crs-` prefix: `crs-faq-accordion`, `crs-metrics-row`, etc.
- New LIFETIME sections: use `lt-` prefix; keep names ≤ 25 chars in schema
- CSS file for a section: `assets/section-[name].css`; load via `{{ 'section-name.css' | asset_url | stylesheet_tag }}`

## JSON Templates

- Keep `order` arrays explicit and intentional — one line per section entry
- Disable sections via `"disabled": true` rather than removing them, when removal may cause app conflicts
- Count entries before adding. Remove or merge before hitting 25.
- `product.13_3_nmn.json` is the canonical PDP template. Duplicate it for new products; see `docs/lt-pdp-template-notes.md`

## CSS Architecture

- All values via CSS custom properties — no hardcoded hex, px, or font names
- Section styles are scoped: `.section-[name] { }` — do not bleed into global scope
- Dead CSS: when removing a Liquid snippet or block, search for its class in all `.css` files and delete the rule block
- Do not use `[class*="foo"]` wildcards in global CSS
- Do not use `display: none !important` to suppress app-injected blocks — remove from `block_order` instead

## Liquid Patterns

```liquid
{%- if section.settings.title != blank -%}
  <h2>{{ section.settings.title | escape }}</h2>
{%- endif -%}

{%- for block in section.blocks -%}
  <div {{ block.shopify_attributes }}>
    {{ block.settings.text | escape }}
  </div>
{%- endfor -%}
```

- Always `| escape` on user-facing text settings
- Always `{%- -%}` (whitespace-stripping)
- Always `{{ block.shopify_attributes }}` on block wrappers

## Spacing Architecture

- Reset wrapper margins to `0` in scoped `{% style %}` blocks — do not rely on theme wrappers for spacing
- Own all spacing via component-level `margin-bottom` on the rendered element
- One value to change, one place to find it

## App Interactions

- Check `templates/product.13_3_nmn.json` for active app blocks before adding new sections (Loox, Appstle Subscription)
- App blocks in `order` count toward the 25-section limit
- Test add-to-cart and variant selection after any change to the product template

## No React Assumptions

This is a Vanilla ES6+ theme. No React, no Next.js, no Tailwind.
- Web Components pattern: `ModalBox`, `MainHeader`, `CSSSlider`, `ProductVariants`
- Re-init custom elements via `shopify:section:load` events
- Icons: inline SVG in Liquid, not lucide-react imports

## Shopify CLI

```bash
shopify theme dev       # hot-reload preview
shopify theme push      # push to store
shopify theme pull      # pull latest from store
```

## QA After Any Change

- [ ] Desktop + mobile layout correct
- [ ] Theme Editor: section visible, settings functional
- [ ] No console errors; no horizontal scroll
- [ ] Add-to-cart and variant logic unaffected
- [ ] schema `name` ≤ 25 chars; no empty `default` values
