---
status: living
last_review: 2026-05-08
canonical_for: shopify-platform-rules
applies_to: liquid, json, templates, sections, snippets
---

# Shopify Operating Rules (LIFETIME)

Theme: Combine by KrownThemes v3.1.1
Store: Lifetime Health (German, Du-form)
Dev: Shopify CLI (theme pull / dev / push)

## Core Principle

This is a LIVE theme. Treat it as the source of truth.
- Minimal-invasive over elegant rewrites
- Reuse existing sections, snippets, classes
- Extend, don't replace
- Prefer small refactors over broad changes

## Discovery-First Rule

Before implementing, inspect:
- Which templates are involved
- Which sections/snippets already exist
- Existing CSS classes and patterns to reuse
- Schema/settings patterns in use
- Potential app conflicts
- Regression points

**Do not jump into implementation without theme context.**

## Platform Hard Limits

These cause `theme push` / Theme Check failures:

### 1. Product JSON templates
- `order` array: **max 25 section instances** per product template
- Count existing entries before adding. Remove or merge if at limit.

### 2. Section schema `name`
- Top-level `"name"` in `{% schema %}`: **≤ 25 characters**
- Same for `presets[].name`
- Error message: *name ist zu lang*
- Use short names: `LT PDP Benefits` not `LIFETIME PDP Wissenschaftliche Vorteile`

### 3. Schema `default` values — MUST NEVER be empty

This is the single most frequent push error in this theme. Read carefully.

- **Never use `"default": ""`** — neither in `settings`, `blocks[].settings`, nor `presets[].blocks[].settings`
- Error: *default darf nicht leer sein* / *default can't be blank*
- Applies to every setting type that carries a default: `text`, `textarea`, `richtext`, `html`, `url`, `color`, `select`, `radio`, `checkbox`, `range`, `number`
- Also applies to `blocks[].name` and `presets[].name` — no empty strings

**Two valid options:**
1. **Omit the `default` key entirely** and fall back in Liquid: `{{ block.settings.sub | default: 'Kurzer Hinweis' }}`
2. **Provide a real non-empty placeholder** string (e.g. `"default": "Kurzer Hinweis"`)

**Checklist before every `theme push` that touches a schema:**
- [ ] Grep the file for `"default": ""` — must return zero matches
- [ ] Grep the file for `"default":""` (no space) — must return zero matches
- [ ] Every `select`/`radio` `default` matches one of its `options[].value`
- [ ] `presets[].settings` values are non-empty if the setting requires non-empty
- [ ] `blocks[].name` and `presets[].name` are non-empty, ≤ 25 chars

## Section Schema Pattern

```liquid
{% schema %}
{
  "name": "LT PDP Benefits",  ← max 25 chars
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Heading"
      ← no "default": "" here
    }
  ],
  "presets": [
    {
      "name": "LT PDP Benefits"  ← max 25 chars
    }
  ]
}
{% endschema %}
```

## CSS Architecture

- Modular CSS in `/assets/` — no preprocessor
- Section styles: `section-[name].css`
- Load via: `{{ 'section-name.css' | asset_url | stylesheet_tag }}`
- All values via CSS custom properties (tokens)
- Never inline styles except for dynamic Liquid values

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

- Always use `| escape` on user-facing text settings
- Always use `{%- -%}` (whitespace-stripping) for performance
- Use `{{ block.shopify_attributes }}` on block wrappers for Theme Editor

## Implementation Output Requirements

Always report:
- Files inspected
- Files changed
- What was added / modified / reused
- Technical risks
- App interaction concerns
- Theme Editor friendly: yes/no

## QA Checklist After Implementation

- [ ] Desktop layout correct
- [ ] Mobile collapse correct
- [ ] Theme Editor: section appears and settings work
- [ ] No console errors
- [ ] No horizontal scroll
- [ ] Add-to-cart / variant logic unaffected
- [ ] schema `name` ≤ 25 chars
- [ ] No empty `default` values in schema

## Design & Messaging

For all visual decisions → follow `_examples/` and `docs/design-components.md`
For all copy decisions → follow `docs/conversion-messaging.md`
Do not mix responsibilities.
Do not introduce patterns that conflict with `docs/design-governance.md`.
