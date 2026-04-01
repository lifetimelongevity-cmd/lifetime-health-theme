# LIFETIME Design Governance

---

## 1. AUTHORITY & PRIORITY

This file governs **visual design decisions** for AI-assisted UI development.
It does not control Shopify architecture, theme structure, or deployment workflow.

**Priority hierarchy (highest → lowest):**

1. **Existing Shopify theme architecture** — sections, snippets, schemas, and structural classes must not be broken or duplicated
2. **Core design tokens** — colors, typography, spacing, radii, and shadows defined in this file are always authoritative
3. **This governance file** — all visual rules, component specs, and decision logic
4. **Task-specific instructions** — may override layout composition and content decisions, but not core tokens

**Operating principles:**

- Reuse existing theme patterns before creating new ones
- Adapt styling to match tokens without replacing structural classes
- If the theme already has a container, grid, or button system, style through it — do not introduce a parallel system
- When an existing Shopify section or snippet serves the same purpose as a component defined here, apply these visual rules to it rather than rebuilding it

---

## 2. DESIGN PHILOSOPHY

- Minimal, not decorative
- Typography over visuals
- Trust through clarity, not noise
- One focus per section
- Consistency over creativity
- Warmth through color and space, not effects
- When in doubt, choose the simpler option

---

## 2b. VISUAL REFERENCES

These sites define the aesthetic target. When uncertain about a design decision,
ask: "Does this feel like these references?"

- **Overall feel:** ag1.com — spacing rhythm, typographic hierarchy, section breathing room
- **Product trust:** withings.com — clinical clarity without coldness
- **Typography + restraint:** monocle.com/shop — information density, nothing decorative
- **CTA proportion:** ritual.com — white space around CTAs, button weight
- **Surface alternation:** oatly.com — how section transitions feel when done right

These are directional, not prescriptive. Do not copy layouts — absorb the feeling.

---

## 3. DESIGN TOKENS

```css
:root {
  /* === COLORS === */

  /* Brand */
  --color-teal: #65C0B6;
  --color-teal-dark: #4A8C85;
  --color-dark: #364F56;
  --color-sand: #C7A39B;

  /* Neutrals */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-light-warm: #F6F4F1;
  --color-light-cool: #FAFAFA;
  --color-gray-200: #E5E5E5;
  --color-gray-400: #A3A3A3;
  --color-gray-600: #525252;

  /* Semantic */
  --color-star: #F4B740;
  --color-success: #22C55E;
  --color-promo: #E85D5D;

  /* Surfaces */
  --color-surface-primary: var(--color-white);
  --color-surface-secondary: var(--color-light-warm);
  --color-surface-tertiary: var(--color-light-cool);
  --color-surface-dark: var(--color-dark);
  --color-surface-accent: var(--color-teal-dark);

  /* Text */
  --color-text-primary: var(--color-black);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-400);
  --color-text-on-dark: var(--color-white);
  --color-text-on-dark-muted: rgba(255, 255, 255, 0.65);
  --color-text-accent: var(--color-teal);

  /* Buttons */
  --color-button-primary-bg: var(--color-dark);
  --color-button-primary-text: var(--color-white);
  --color-button-primary-hover: #2A3E44;
  --color-cta-bg: var(--color-sand);
  --color-cta-text: var(--color-white);
  --color-cta-hover: #B8928A;

  /* === TYPOGRAPHY === */

  --font-heading: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-body: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;

  --text-stat: 56px;
  --text-display: 48px;
  --text-h1: 36px;
  --text-h2: 28px;
  --text-h3: 24px;
  --text-quote: 28px;
  --text-section: 20px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-micro: 12px;

  --leading-stat: 1;
  --leading-display: 1.1;
  --leading-heading: 1.15;
  --leading-tight: 1.25;
  --leading-body: 1.4;
  --leading-relaxed: 1.6;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* === SPACING (8px base) === */

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 120px;

  /* === SHAPE === */

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

  /* === TRANSITIONS === */

  --ease-default: 0.2s ease;
  --ease-smooth: 0.4s ease;
}
```

### Token Usage Rules

- All spacing, color, typography, radius, and shadow values should reference tokens
- Avoid hardcoded hex, px, or raw values in component-level CSS
- If the theme already defines CSS custom properties that map to the same values, prefer the theme's variable names and alias them to these tokens at the root level
- `--color-black` (#000000) is for text only — use `--color-dark` (#364F56) for all background surfaces
- `--color-surface-tertiary` (#FAFAFA) is for form fields and inputs — not for full section backgrounds
- Default alternating section background is `--color-surface-secondary` (#F6F4F1)

---

## 4. LAYOUT SYSTEM

### Container

- Max-width: 1200px, centered, with 24px horizontal padding (16px on mobile)
- If the theme already provides a container class, use it and adjust its max-width/padding to match these values
- Do not create a parallel container — one container system per theme

### Grid

- Default configurations: 2-column, 3-column, 4-column
- Gap: `--space-5` (24px)
- 3-col and 4-col collapse to 2-col at ≤1024px
- All grids collapse to 1-col at ≤768px
- Use CSS Grid for page-level layout; flexbox for component internals
- Custom grid configurations are acceptable for PDP or specialty layouts with justification

### Section Structure

Default blueprint for page sections:

```
section (surface + padding)
  └── container
        ├── section-header (optional: label + title + description)
        ├── content (grid, stats, quote, or media)
        └── section-cta (optional: button, centered)
```

- Default to one primary content type per section
- Default to one CTA per section, centered below content
- Section header: centered, max-width 640px
- Multiple content types or CTAs are acceptable when a clear UX reason exists (e.g., PDP above-fold combines image gallery + product info)

### Section Padding

| Context | Desktop | Mobile |
|---------|---------|--------|
| Standard | `--space-9` (80px) | `--space-8` (64px) |
| Hero | `--space-10` (120px) | `--space-9` (80px) |
| Compact (trust bars, logo rows) | `--space-7` (48px) | `--space-6` (32px) |

### Spacing Philosophy

- Between unrelated sections: always `--space-9` or `--space-10`. Never less.
- Within a section, between elements: `--space-4` to `--space-6` only.
- The most common mistake is under-spacing. When in doubt, go one step up the scale.
- Negative space is not emptiness — it is the signal that something matters.
- A section that feels "too empty" is usually correctly spaced. Add nothing.

### PDP Layout

- 2-column grid (1fr 1fr), gap `--space-6`, align-items start
- Collapses to 1-col at ≤768px
- PDP sections below the fold follow standard section structure

### Spacing Application

| Context | Token |
|---------|-------|
| Section header → content | `--space-6` (32px) |
| Heading → body text | `--space-4` (16px) |
| Grid gaps | `--space-5` (24px) |
| Card internal padding | `--space-5` (24px) |
| Inline element gaps | `--space-2` (8px) |
| Badge padding | `--space-1` v / `--space-2` h |

- For unlisted contexts, use the closest token from the scale
- Avoid combining tokens with `calc()` — pick one token

---

## 5. COMPONENT SYSTEM

These are conceptual components. Apply their visual rules to whatever Shopify structure (section, snippet, block) implements them. Do not duplicate structural elements that already exist in the theme.

### Button

- Font: `--font-body`, `--text-body-sm`, `--weight-semibold`
- Height: 48px, padding: 14px 32px, radius: `--radius-full`
- Variants:
  - `cta` → sand bg, white text (revenue-driving actions)
  - `primary` → dark bg, white text (secondary conversions)
  - `secondary` → white bg, dark text, gray border
  - `outline` → transparent bg, dark text, currentColor border
  - `ghost` → transparent, no border, no padding, auto height
  - `icon` → 40×40 circle, dark bg, white icon
- Full-width modifier: default only inside PDP add-to-cart zone
- Dark surface behavior: `cta` stays sand; `primary` inverts to white bg / dark text; `outline` inverts to white text / white border
- If the theme has existing button classes, restyle them to match these specs rather than creating new classes

### Section Header

- Centered, max-width 640px
- Label: `--font-body`, `--text-micro`, uppercase, letter-spacing 0.1em, muted color
- Title: `--font-heading`, `--text-h1` (default), bold
- Description: `--font-body`, `--text-body-lg`, secondary color
- On dark surfaces: title → white, label/description → on-dark-muted

### Card Feature

- Full-bleed image bg with gradient overlay at bottom
- Radius: `--radius-md`, overflow hidden
- Aspect-ratio: 4/5 (adjustable per context)
- Title: `--font-heading`, `--text-h3`, bold, white, over gradient

### Card Info

- White bg, `--radius-md`, padding `--space-5`
- Shadow: `--shadow-sm` on white section backgrounds; no shadow on warm backgrounds
- Icon: 48px, margin-bottom `--space-4`
- Title: `--font-heading`, `--text-section`, bold
- Description: `--font-body`, `--text-body`, secondary color

### Card Review

- White bg, `--radius-md`, padding `--space-5`
- Shadow: same rule as card-info
- Stars: `--color-star`
- Name: `--font-body`, `--text-body-sm`, semibold, with verified badge
- Text: `--text-body-sm`, secondary color
- Date: `--text-micro`, muted color

### Stat Callout

- Centered text block
- Number: `--font-heading`, `--text-stat`, bold, line-height 1
- Unit/suffix: `--font-heading`, `--text-h3`, bold, teal
- Label: `--font-body`, `--text-body-sm`, secondary color, margin-top `--space-2`
- On dark surfaces: number → white, label → on-dark-muted

### Quote Block

- Centered, max-width 720px
- Text: `--font-body`, `--text-quote`, italic, regular weight
- Attribution: `--font-body`, `--text-body-sm`, semibold, normal style
- Default placement: on dark surfaces
- Colors: text → on-dark, attribution → on-dark-muted

### Trust Bar

- Compact section padding (`--space-7`)
- Label: `--text-micro`, uppercase, letter-spacing 0.1em, muted, centered
- Logos: flex row, centered, gap `--space-7`, height 24px, grayscale, 50% opacity

### Trust Strip

- Compact inline row (PDP / below-fold contexts)
- Flex row, centered, gap `--space-7`
- Bordered top and bottom: `--color-gray-200`
- Items: icon (20px, teal) + label (`--text-body-sm`, secondary color)

### Badge

- Font: `--font-body`, `--text-micro`, `--weight-medium`
- Padding: `--space-1` v, `--space-2` h
- Radius: `--radius-sm`
- Variants:
  - `promo` → promo bg, white text
  - `savings` → transparent bg, success color, bold
  - `verified` → transparent bg, success color, with icon
  - `tag` → warm light bg, gray-600 text

### New Component Logic

If a UI need arises that doesn't fit existing components:

1. First, try to map it to `card-feature`, `card-info`, or `card-review`
2. If no card fits, try `stat-callout`, `quote-block`, `trust-bar`, or `trust-strip`
3. If no existing component is a reasonable fit, propose a new pattern with:
   - name and purpose
   - which tokens it uses
   - how it differs from existing components
4. Do not silently create new component patterns

---

## 6. DECISION RULES

### Button Selection

- Revenue-driving action (add to cart, buy, start test) → `cta`
- Secondary conversion (learn more, view results, consultation) → `primary` or `outline`
- Card / navigation arrow → `icon`
- Inline text link (read more, see all) → `ghost`
- Avoid placing `cta` and `primary` at the same visual hierarchy level
- Default to maximum 1 `cta` per viewport and 2 buttons total per section

### CTA Labels (Defaults)

| Context | Label | Variant |
|---------|-------|---------|
| Homepage hero | "Biologisches Alter testen →" | cta |
| PDP add to cart | "In den Warenkorb" | cta, full-width |
| PDP quick buy | "Jetzt kaufen →" | cta |
| Supplement purchase | "Jetzt bestellen →" | cta |
| Learn more | "Mehr erfahren" | outline |
| View results | "Ergebnisse ansehen" | outline |
| Book consultation | "Kostenlos beraten lassen" | secondary |
| Card navigation | → | icon |
| Nav bar | "Jetzt testen" | primary |

- Prefer these labels for consistency
- New labels are acceptable for new contexts (e.g., campaign pages) — follow the same variant logic

### Card Selection

- Dominant image + overlay text → `card-feature`
- Rating / review / testimonial → `card-review`
- Everything else (features, benefits, steps, value props) → `card-info`
- Default to 3 card types maximum per page
- All cards use `--radius-md` (12px)
- Shadow `--shadow-sm` on white backgrounds; no shadow on warm backgrounds

### Surface Selection

| Context | Surface |
|---------|---------|
| Default page background | `--color-surface-primary` (white) |
| Alternating sections | `--color-surface-secondary` (#F6F4F1) |
| Emphasis / testimonial / quote | `--color-surface-dark` (#364F56) |
| Feature category cards | `--color-surface-accent` (#4A8C85) |
| Form fields, inputs | `--color-surface-tertiary` (#FAFAFA) |

- Default rhythm: white → warm → white → warm; dark sections break the pattern intentionally
- Default to 1–2 dark sections per page (not counting header/footer)
- Avoid using `--color-surface-tertiary` for full sections

### Typography Selection

| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| Hero / page title | Heading | `--text-display` | bold | 1.1 |
| Section title (large) | Heading | `--text-h1` | bold | 1.15 |
| Section title (standard) | Heading | `--text-h2` | bold | 1.15 |
| Card / feature title | Heading | `--text-h3` | bold | 1.25 |
| Stat number | Heading | `--text-stat` | bold | 1 |
| Section label (uppercase) | Body | `--text-micro` | medium | 1.4 |
| Section description | Body | `--text-body-lg` | regular | 1.4 |
| Quote | Body | `--text-quote` | regular italic | 1.4 |
| Body text | Body | `--text-body` | regular | 1.4 |
| Caption / small text | Body | `--text-body-sm` | regular | 1.6 |
| Badge / tag | Body | `--text-micro` | medium | 1.4 |

- Default: Heading font (Helvetica) for titles ≥ `--text-h3`; Body font (Lato) for everything else
- Section labels are an exception: Lato at `--text-micro`, uppercase, letter-spacing 0.1em
- Avoid font sizes between these defined steps

### Typographic Contrast Rules

- A section title (`--text-h1`, 36px) must be followed by body text at `--text-body` (16px) or `--text-body-lg` (18px). Never place two type sizes within 8px of each other in adjacent elements.
- Section labels (`--text-micro`, uppercase) exist to create vertical rhythm breaks. Every major section must have one. They signal "new topic" to the eye.
- A section containing only body text (16px) is visually flat. Always pair with at least one heading-scale element.
- Maximum 3 type sizes visible in any single section. 2 is preferred.
- Size contrast between heading and body must be clearly perceptible — if it looks like the same size, the heading is too small.

---

## 6b. VISUAL WEIGHT RULES

- Every section must have one dominant element — a heading, stat, or image. Exactly one.
- Supporting elements must be visually subordinate: smaller, lighter, or muted in color.
- Equal-weight distribution across all elements is always wrong. Create a clear focal point.
- Stat callouts (`--text-stat`, 56px) must always be the heaviest element in their section.
- On dark surfaces: reduce element count by one compared to the equivalent light section. Dark backgrounds amplify density.
- CTA buttons must have more vertical breathing room than any other element in their section — minimum `--space-6` (32px) margin-top from the element above.
- If you cannot identify the dominant element in a section, the section needs to be redesigned before it is built.

---

## 7. ANTI-PATTERNS

### Layout
- ✗ Sections with more than 3 competing visual element types
- ✗ Multiple CTA buttons fighting for attention in the same viewport
- ✗ Inconsistent spacing between sections
- ✗ Random dark/light section mixing (follow the surface rhythm)
- ✗ Content outside the container
- ✗ Nested or duplicate container wrappers
- ✗ Introducing a new container/grid system alongside the theme's existing one

### Components
- ✗ More than 3 card styles on a single page
- ✗ Mixed border-radius values across cards on the same page
- ✗ Buttons with varying border-radius (default: `--radius-full`)
- ✗ Box-shadow on cards sitting on warm (#F6F4F1) backgrounds
- ✗ Decorative icons without functional purpose
- ✗ Silently creating new component patterns without documentation

### Typography
- ✗ Body text in Helvetica
- ✗ Headings in Lato (except section labels)
- ✗ Font sizes between token steps (e.g., 15px, 22px, 30px)
- ✗ Bold body text as a substitute for heading hierarchy
- ✗ More than 2 text sizes within a single card
- ✗ Section missing a `--text-micro` uppercase label above the heading

### Color
- ✗ Teal on buttons (teal is for accents, progress bars, icons)
- ✗ Sand on large surfaces (sand is for CTA buttons and small accents)
- ✗ `#000000` as a background surface
- ✗ Multiple accent colors competing in the same section
- ✗ Gray values outside the three defined grays (200, 400, 600)

---

## 8. VISUAL QA CHECKLIST

Run after every UI change. Fix all failures before proceeding.

### Spacing
- [ ] Section padding matches defined sizes (80/120/48 desktop, 64/80/32 mobile)
- [ ] No spacing values outside the token system
- [ ] Grid gaps are `--space-5` (24px)
- [ ] Card internal padding is `--space-5` (24px)
- [ ] Section header → content gap is `--space-6` (32px)

### Alignment
- [ ] Card heights are equal within each grid row
- [ ] All content is inside the container (1200px max, 24px padding)
- [ ] Section headers are centered, max-width 640px
- [ ] No content touches viewport edges on mobile (16px min)

### Typography
- [ ] No font sizes outside the token scale
- [ ] Headings use Heading font (Helvetica)
- [ ] Body text uses Body font (Lato)
- [ ] No Lato text larger than `--text-quote` (28px)
- [ ] No Helvetica text smaller than `--text-h3` (24px)
- [ ] Every section has a `--text-micro` uppercase label above the heading

### Color
- [ ] No `#000000` backgrounds (use `#364F56`)
- [ ] No hardcoded hex in component CSS (use tokens)
- [ ] No teal on buttons
- [ ] Star ratings use `--color-star` (#F4B740)
- [ ] Alternating backgrounds use `--color-surface-secondary` (#F6F4F1)

### Shape
- [ ] All cards: `--radius-md` (12px)
- [ ] All buttons: `--radius-full` (999px)
- [ ] No rogue border-radius values

### Components
- [ ] Maximum 3 card types per page
- [ ] CTA (sand) button count reasonable per viewport (default: 1)
- [ ] Dark surface text uses `--color-text-on-dark` or `--color-text-on-dark-muted` only
- [ ] Pillar/feature items use `card-info` pattern (padding `--space-5`, `--radius-md`, correct shadow rule)

### Mobile
- [ ] Grids collapse to 1 column at ≤768px
- [ ] Section padding uses mobile values
- [ ] Container padding is 16px
- [ ] Buttons remain 48px height
- [ ] No horizontal scroll on any viewport

### Visual Craft QA
- [ ] Does this section have exactly one dominant focal point?
- [ ] Is the dominant element clearly heavier than all supporting elements?
- [ ] Does the CTA button have `--space-6` minimum margin-top above it?
- [ ] Does the section feel too dense? If yes: remove one element or increase spacing one step.
- [ ] Does this section look visually distinct from the one above it? (surface change OR type size shift)
- [ ] Is every element earning its place? (Apply Section 11 — remove anything that isn't.)
- [ ] Would this section look at home on ag1.com or ritual.com?

---

## 9. PROTECTED PATTERNS

These existing patterns should be preserved. Restyle them to match tokens, but do not restructure:

- Helvetica + Lato font pairing
- Page flow: hero → benefits → how it works → reviews → FAQ
- PDP 2-column layout above fold
- Navigation structure and position
- Teal brand color (#65C0B6)
- Review verification system (green checks, real names, dates)
- FAQ accordion pattern
- Footer: shipping + payment icons display
- Announcement bar: position and scroll behavior

---

## 10. THEME COMPATIBILITY / CONFLICT RESOLUTION

Reuse existing Shopify theme structure, settings, and classes whenever possible.
If existing theme values are close to the design token system, use them as-is.
If they differ slightly, map them to the closest design token in implementation logic.
If no clean mapping exists, introduce a reusable token-based utility or section class.
Never use negative margins, one-off spacing hacks, or inline overrides to visually compensate for theme conflicts.
Do not replace global theme settings unless the task explicitly requires a system-wide design refactor.

---

## 11. SUBTRACTION RULES

Before finalizing any section, remove:

- Any decorative divider that isn't a surface change
- Any icon that duplicates what the text already communicates
- Any label if the heading already makes the context clear
- Any secondary CTA if the primary CTA already covers the decision
- Any card that carries the same message as an adjacent card
- Any body text block that repeats what the section's sub-components already explain

A section is complete not when nothing can be added, but when nothing can be removed.
This rule overrides "more content = more conversion." Clarity converts. Noise does not.

---

## 12. SECTION BUILD TEMPLATE

**Every section must follow this process. No exceptions.**

This is not a checklist to run after building. It is the build process itself.

### Step 1 — Confirm the spec before writing any code

Answer each item explicitly. If an answer is unclear, resolve it before proceeding.

| Decision | Answer required |
|----------|----------------|
| Surface color | Which token from the Surface Selection table (§6)? |
| Section label | What is the `--text-micro` uppercase label text? |
| Dominant element | What does the eye land on first — heading, stat, or image? |
| Heading size | `--text-h1` (36px) for major sections, `--text-h2` (28px) for supporting sections |
| Content pattern | card-info / card-feature / card-review / stat-callout / quote-block / body text |
| Card count | Max 3 items for pillar/feature grids. Each item needs padding `--space-5` + `--radius-md`. |
| CTA | Which variant and label from the CTA table (§6)? Or explicitly: none. |
| Elements to remove | Apply §11 Subtraction Rules. List what is being removed and why. |

### Step 2 — Build from the confirmed spec

- Use only tokens from §3 for all spacing, color, typography, radius, and shadow values
- Apply `card-info` pattern to any pillar or feature item (padding `--space-5`, `--radius-md`, correct shadow rule)
- Section label goes above the heading, always — `--text-micro`, uppercase, `--weight-medium`, `letter-spacing: 0.1em`, muted color
- Heading is `--text-h1` for standard sections unless spec says otherwise
- Body text and card content are subordinate — smaller, lighter, never competing with the heading

### Step 3 — Run the full QA checklist (§8) before output

Run both the Structural QA and the Visual Craft QA.
List any failures found. Fix them before producing final output.
Do not output code that has known QA failures.

---
