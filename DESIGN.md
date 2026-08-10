---
name: LIFETIME Startseite · Klinisches Dossier
description: Visual world of the homepage redesign preview (docs/homepage-dossier-preview.html), the clinical findings-dossier structure. Seed-Key 4a140473.
colors:
  teal: "#65C0B6"
  teal-dark: "#4A8C85"
  dark: "#364F56"
  dark-tile: "#2D4249"
  white: "#FFFFFF"
  surface-a: "#F7F7F4"
  surface-b: "#F2F1ED"
  ink: "#26251E"
  gray-600: "#525252"
  gray-400: "#A3A3A3"
  gray-200: "#E5E5E5"
  gold: "#F4B740"
  on-dark: "#F7F7F4"
  on-dark-muted: "rgba(247, 247, 244, 0.72)"
  on-dark-faint: "rgba(247, 247, 244, 0.66)"
  hairline: "rgba(38, 37, 30, 0.12)"
  hairline-on-dark: "rgba(247, 247, 244, 0.2)"
typography:
  display:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
  stat:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1
  reportValue:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 1
    note: "Befundblatt-Alterswert, 60px mobil; einziges Element über der Stat-Stufe"
  reportValueMobile:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "60px"
    fontWeight: 700
    lineHeight: 1
  caseMeasure:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1
    note: "Fallakten-Messzahlenpaar (47→44), tabular-nums"
  body:
    fontFamily: "Lato, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Lato, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.1em"
rounded:
  sm: "8px"
  md: "12px"
  full: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "80px"
  "10": "120px"
components:
  button-cta:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
    height: "48px"
  button-cta-on-dark:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0"
  card-paper:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "32px"
  tile-on-dark:
    backgroundColor: "{colors.dark-tile}"
    rounded: "{rounded.md}"
    padding: "24px"
---

<!--
SCOPE: This file records the visual world of the homepage REDESIGN PREVIEW
(docs/homepage-dossier-preview.html, "Klinisches Dossier", reviewer disposition: ship).
It is NOT the token authority for the live Shopify theme. The incumbent token source
for the live theme remains docs/design-governance.md §3 and .cursor/rules/design-tokens.mdc.
This file records what the dossier world ADDS or DECIDES on top of that incumbent
palette, so a later Liquid translation can follow it.
-->

# Design System: LIFETIME Startseite · Klinisches Dossier

## Overview

**Creative North Star: "Das klinische Befund-Dossier"**

The homepage is itself a clinical findings document. It refuses the lifestyle landing page (hero photo plus icon-card grids) and instead behaves like a printed dossier: a masthead, a cover sheet ("Deckblatt") with an animated lab report, six numbered chapters each opened by a rubric line, and a colophon footer. Every section is a chapter of one continuous document about a single question — how fast are you aging — and every proof element is presented the way a lab would present it: tabular numbers, hairline rules, spec rows, before/after measurements.

The palette is the LIFETIME live palette, unchanged: warm paper surfaces alternating with one dark clinical slate, ink text, teal reserved for measured values, gold as a rare flag. Depth is nearly flat; the only things that cast shadows are the white "paper sheets" (the Befundblatt report and the case/buy cards) sitting on the warm surfaces. Everything else is separated by 1px hairlines, never by boxes.

**Key Characteristics:**
- Document metaphor carried structurally: chapter rubrics, spec rows, comparison tables, colophon.
- Numbers are the protagonists: 72px report value, 32px case measurements, `font-variant-numeric: tabular-nums` on every measured figure.
- Hairlines (`rgba(38,37,30,0.12)` light / `rgba(247,247,244,0.2)` dark) do the separating; cards are reserved for "paper".
- One authored motion moment (the Befundblatt), everything else is static.
- Calm, clinical-editorial, no hype mechanics — authority through restraint.

## Colors

The live LIFETIME palette, redeployed with dossier-specific role discipline: paper, ink, one dark slate, teal for measurements, gold as a flag.

### Primary
- **Clinical Slate** (`{colors.dark}`, #364F56): the document's authority color. CTA button background, dark chapter sections (Methode, Schluss), verified-badge fill, journey-step top rules. On dark sections, **Slate Tile** (#2D4249) is the raised inner surface (definition tiles, consult card).

### Secondary
- **Measurement Teal** (`{colors.teal}`, #65C0B6) fills metric bars; **Deep Teal** (#4A8C85) colors measured numbers themselves (the 72px biological age, the improved value and arrow in case measurements) and doubles as the interactive accent (focus ring, ghost-link hover, loop-step markers).

### Tertiary
- **Flag Gold** (`{colors.gold}`, #F4B740): appears exactly once per screen as a metric-bar fill marking the one value that needs attention. Its rarity is the signal.

### Neutral
- **Paper A / Paper B** (#F7F7F4 / #F2F1ED): alternating warm section surfaces; A is the page background, B carries the press band and the system chapter.
- **Sheet White** (#FFFFFF): the report sheet, case cards, buy card, and two full "Befundlage"/"Verläufe" chapters. White is a *material* (paper) as much as a surface.
- **Ink** (#26251E): all text on light. Never a background.
- **Gray 600 / 400 / 200** (#525252 / #A3A3A3 / #E5E5E5): secondary text, tertiary text and dates, inner-card rules.
- **On-Dark ramp**: #F7F7F4 full, 0.72 alpha muted, 0.66 alpha faint — the WCAG-checked on-dark text levels.

### Named Rules
**The Measured-Teal Rule.** Teal exists to say "this is a measurement". It colors metric bars and measured values (and, in its deep form, small interactive accents). It is never a CTA color, never a heading color, never a decorative surface.

**The One-Flag Rule.** Gold marks at most one datum per view (the below-median metric). More than one gold element and it stops being a flag.

**The Hairline Rule.** Separation happens with 1px hairlines at low alpha, on light `{colors.hairline}` and on dark `{colors.hairline-on-dark}`. Boxes and borders around content blocks are not part of this world; if something has a visible edge and a shadow, it must be paper (see Elevation).

## Typography

**Display Font:** Helvetica Neue (Helvetica, Arial fallback) — all headings and all large numbers
**Body Font:** Lato (system-ui fallback) — body copy, buttons, labels, card titles

**Character:** Cold precision over warm readability. Helvetica Neue carries the clinical, printed-report voice for headlines and figures; Lato keeps running text and UI human. Both weights-only, no new families (theme commitment).

### Hierarchy
- **Display** (400, 48px → 36px mobile, 1.1, -0.02em): cover headline and closing headline only, paired with a same-size subline at 0.72 opacity.
- **Stat** (700, 56px → 48px mobile, 1.0): the closing price.
- **Report value** (700, 72px → 60px mobile, 1.0): the Befundblatt age — the single biggest thing on the page is a measurement, not a headline.
- **Case measure** (700, 32px, 1.0, tabular-nums): the Fallakten number pairs (47→44).
- **Headline** (400, 36px → 28px mobile, 1.15, -0.01em): one per chapter, rendered as `h2`, paired with a same-size subline at 0.72 opacity.
- **Title** (700, 24px, 1.25): definition-tile claims, buy-card price emphasis.
- **Quote** (400 italic, 28px → 22px mobile, 1.4): the expert quote, Lato italic.
- **Body** (400, 16px, 1.4 base / 1.6 in reading blocks); **Body-lg** (18px) for sublines; **Body-sm** (14px) for card copy and secondary text.
- **Label / Micro** (600, 12px, 0.1em tracking, uppercase): rubric labels, spec terms, table heads, report labels. This is the dossier's "form field" voice.

### Named Rules
**The Tabular Number Rule.** Every measured or sequential number (metric values, case measurements, retest dates, step counters) sets `font-variant-numeric: tabular-nums` in the heading font at 700. Numbers align like a lab table, always.

**The Heading-Pair Rule (theme-wide, BJ-pinned).** Headline and subline form ONE block: same font (Helvetica Neue), same size, same line-height, same weight (both regular 400). The subline is demoted only via color — rgba(38,37,30,0.72) on light, rgba(247,247,244,0.72) on dark. Never a smaller subline, never a weight difference; either creates a second hierarchy level the system forbids. Bold in this world belongs to measurements (report value, stats, case measures), not to headlines. Canonical implementation in the live theme: `snippets/section-heading-crs.liquid` / `assets/crs-section-headings.css`.

**The One-Headline-Per-Chapter Rule.** Each chapter carries exactly one 36px heading pair. Hierarchy below the pair is carried by the 12px uppercase label voice and weight, not by intermediate heading sizes.

## Layout

A single 1200px max-width container (24px gutter, 16px under 768px). Sections are chapters: 80px vertical padding (64px mobile), each opened by the **chapter rubric** — a full-width hairline top rule with, on the baseline beneath it, the chapter label left (`Kapitel 0N · Name`, 12px uppercase, number in ink, rest in gray) and the running document title right (`AGE & DNA · Befund-Dossier`, gray-400, hidden on mobile). The rubric is the world's structural signature; it replaces decorative kickers entirely.

Surface rhythm down the page: Paper A (cover) → White → Paper A → Dark Slate → Paper B (press band) → White → Paper B → Paper A → Dark Slate (close) → Dark colophon. Two-column grids are asymmetric (1.05fr/0.95fr cover, 0.9fr/1.1fr test, 1.1fr/0.9fr close) and collapse to one column at 960px; three- and four-up grids (cases, journey) collapse at 768px.

**The Document-Column Rule.** Reading measure is capped on the content element, not the container: sublines at 32rem, spec-row and FAQ blocks at 48rem, card body copy at 22–26em, FAQ answers at 40em. Full-bleed text does not occur; wide sections hold tables and grids, never paragraphs.

Spacing is the 10-step scale in the frontmatter (4 → 120px); the recurring rhythm is 16/24/32 within components, 48/64 between component groups, 80 between chapters.

## Elevation & Depth

Nearly flat, with one material exception: **paper casts shadows, nothing else does.** The dark sections use tonal layering instead (Slate Tile #2D4249 on Clinical Slate #364F56, no shadow). Buttons are flat at rest and lift only on hover.

### Shadow Vocabulary
- **paper-rest** (`box-shadow: 0 1px 3px rgba(0,0,0,0.05)`): case cards, buy card, the ghost sheet behind the report.
- **paper-raised** (`box-shadow: 0 4px 12px rgba(0,0,0,0.08)`): the Befundblatt report sheet, and the CTA button on hover (paired with `translateY(-1px)`).

### Named Rules
**The Paper Rule.** A shadow may only appear under a white, 12px-radius "sheet" (or momentarily under a hovered CTA). Everything else — tiles, tables, bands, sections — is flat and separated by hairlines or tone.

## Shapes

Soft-rectangle paper and pill controls. Sheets, tiles, images, and portraits use 12px radius (`{rounded.md}`); small elements 8px (`{rounded.sm}`); buttons, avatars, metric tracks, and step dots are fully round (`{rounded.full}`). No sharp corners, no decorative borders, no colored left-/accent-borders (theme prohibition, upheld here). The Befundblatt's offset ghost sheet (a second white sheet shifted 12px down-left at 0.6 opacity behind the report) is the one allowed "stacked paper" flourish and belongs to that component only.

## Components

### Chapter Rubric (signature)
The dossier's structural header: hairline top rule, 12px padding-top, uppercase 12px label pair (chapter left, document title right), 48px below to the headline. On dark sections the rule switches to `{colors.hairline-on-dark}` and the label to on-dark-muted. Every chapter gets one; nothing else may imitate it.

### Befundblatt (signature)
The animated lab-report sheet in the first viewport: Sheet White, 12px radius, paper-raised shadow, ghost sheet behind. Inside: uppercase head row over a gray-200 rule, the 72px Deep Teal age value beside its chronological comparison, three metric rows (name 14px/600, value 18px tabular, 4px full-round track with teal fill — one gold), and a 12px source footer ("Eurofins Genomics · ISO 17025"). **Motion — the page's single authored moment:** on 40% viewport entry (IntersectionObserver, once), bars scale from `scaleX(0)` origin-left over 0.9s `cubic-bezier(0.16,1,0.3,1)`, then the delta line ("4 Jahre jünger als der Pass") fades/rises in over 0.5s at 1.1s delay. Under `prefers-reduced-motion: reduce` the final state renders immediately with no transitions, and smooth scrolling is disabled. All other movement on the page is limited to 0.2s ease state transitions.

### Spec Rows
Definition-list-as-lab-form: hairline-ruled rows, 160px uppercase 12px term column, 16px value column, max-width 48rem. Used on dark (Methode chapter) with on-dark hairlines; the pattern is surface-agnostic.

### Case Sheet
Testimonial as measurement record: white card (paper-rest), avatar or initials disc, name with slate verified-check SVG, then the **measurement row** framed by hairlines top and bottom — 32px tabular numbers, "from" in gray-400, arrow and "to" in Deep Teal, unit in 14px gray, retest date right-aligned in 12px tabular — then the quote in 14px gray-600. Improvement is shown as data, never as badge or star.

### Comparison Table
Two-column claim table (Befundlage chapter): uppercase 12px head row, hairline row rules, left column gray-600 (what the check-up shows), right column ink 600 (what it doesn't). Whole rows, no cell borders.

### Buttons
- **Shape:** pill (999px), 48px height (40px in masthead), 14px/600 Lato label.
- **Primary (`btn-cta`):** Clinical Slate on light, inverts to white-on-slate text on dark sections. Hover: `translateY(-1px)` + paper-raised shadow, 0.2s ease.
- **Ghost:** borderless ink text link, 600 weight, hover to Deep Teal.
- **Outline (on dark only):** transparent, on-dark text, `rgba(247,247,244,0.4)` border brightening to full on hover.
- **Focus:** all buttons `outline: 2px solid` Deep Teal, 2px offset.

### FAQ
Native `<details>` rows on hairlines, 48rem max-width: 16px/600 summary with a gray-400 "+" that rotates 45° when open, 14px gray-600 answer capped at 40em.

### Icons
Stroke-only inline SVGs (26px in a 40px cell), 1.5 stroke-width, round caps, Clinical Slate stroke, no fill. Used sparingly in list rows (eval-list), never as card decoration grids.

## Do's and Don'ts

### Do:
- **Do** open every section with the chapter rubric and keep the running document title consistent ("AGE & DNA · Befund-Dossier").
- **Do** set every measured number in Helvetica Neue 700 with `tabular-nums`, and color measured values Deep Teal (#4A8C85) on light.
- **Do** alternate Paper A / White / Paper B / Clinical Slate surfaces; use Slate Tile (#2D4249) for raised blocks inside dark sections.
- **Do** cap reading measure on the content element (32rem sublines, 48rem tables, 40em answers).
- **Do** keep motion to the one Befundblatt moment and honor `prefers-reduced-motion` by rendering the final state statically.

### Don't:
- **Don't** build the lifestyle-landing pattern this world refuses: no photographic hero backgrounds, no icon-card benefit grids.
- **Don't** use teal for CTAs, headings, or decoration — CTAs are Clinical Slate; teal means measurement.
- **Don't** put shadows on anything that isn't a white paper sheet (or a hovered CTA); separate with hairlines instead of boxes.
- **Don't** use pure black backgrounds, new font families, or decorative colored left-/accent-borders (live-theme prohibitions, upheld here).
- **Don't** exceed one gold element per view.
