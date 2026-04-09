# PDP System — LIFETIME

Distilled from the implemented NMN PDP (`templates/product.13_3_nmn.json`).
This is the live system, not theory.

---

## Active Section Order (13 sections)

| # | Section type | Role | Stage |
|---|---|---|---|
| 1 | `lt-pdp-hero` | Hero + buybox | Attention + Action |
| 2 | `crs-logo-garden` | Media legitimacy | Trust |
| 3 | `crs-metrics-row` | Quantified proof | Trust |
| 4 | `crs-feature-grid` | Outcome benefits | Understanding |
| 5 | `lt-comparison-table` | Quality differentiation | Trust |
| 6 | `crs-timeline` | Expectation management | Personal relevance |
| 7 | `crs-knowledge-base` | Science + mechanism | Understanding → Trust |
| 8 | `crs-expert-quotes` | Expert authority | Trust |
| 9 | `crs-link-cards` | Study references | Trust |
| 10 | `crs-social-quotes` | Customer proof | Trust |
| 11 | `crs-risk-free-close` | Final CTA | Action |
| 12 | `crs-faq-accordion` | Risk reduction | Risk reduction |
| 13 | `apps` | Loox reviews widget | Trust |

Disabled (present but inactive): `crs-guarantee-block`, `main-product`

---

## Section Roles

### 1 — lt-pdp-hero
The primary conversion zone. Everything needed for a first-time visitor to decide.

**Structure (top to bottom in the right column):**
- Rating row: stars + review count
- H1 headline
- Tagline / subheadline
- Benefit bullets (3 outcome statements)
- Buy box: subscription (default-selected) / one-time toggle
- Trust pills (wrapping row)
- Sticky ATC bar (mobile, activated on scroll)
- Doctor badge + guarantee badge

**Buybox rules:**
- Subscription is the primary option, selected by default
- One-time purchase is the secondary option — "flexible entry, no commitment"
- One badge per option. No claim stacking.
- CTA support text: reassurance only — delivery, cancellation, guarantee. No new product arguments.

**Current guarantee:** 30-Tage Geld-zurück-Garantie (first order only).

### 2 — crs-logo-garden
Media appearances. RTL, SAT.1, SWR1, Spiegel.
Establishes brand credibility before any product argument is made.
Compact section. No copy beyond logo row and a single credibility line.

### 3 — crs-metrics-row
Numbers as proof. Purity %, star rating, review count, years of research, or similar.
Dominant element: the stat number. Label is subordinate.
On dark surface: stat number white, label muted.

### 4 — crs-feature-grid
Outcome-focused benefits in card-info grid (not ingredient features).
3–4 cards. Each card: one outcome, not a mechanism.
Pattern: icon → title → 1–2 sentence description.

### 5 — lt-comparison-table
LIFETIME vs. generic: purity, certification, testing, guarantee.
Differentiates on quality signals, not price.
Binary checkmarks. No prose.

### 6 — crs-timeline
"Was kannst du erwarten?" — 4 time steps.
Manages the "when will I feel something?" objection.
Last step reinforces continuity: NAD+ falls back to baseline within 4 weeks of stopping.
This section is the primary argument for subscription over one-time.

### 7 — crs-knowledge-base
NAD+ mechanism, aging context, study references, expert endorsement.
Combines science explanation with credibility signal (Prof. Dr. med. Volker Limmroth).
Quote from expert is present — used only as verified attribution, not testimonial.

### 8 — crs-expert-quotes
Expert advisor card. Credentials, title, endorsement line.
No unverified claims. Credential-first, quote-second.

### 9 — crs-link-cards
Links to actual study references. Anchors the science claims made in sections 6–8.
For the visitor who needs to verify before buying.

### 10 — crs-social-quotes
Customer review quotes. Not star-only ratings — actual text quotes.
Complement to the Loox app section (section 13).

### 11 — crs-risk-free-close
Final CTA section. Repeats the headline argument, lists 3 key reassurances (checkmarks), primary CTA button, secondary text link to one-time option.
Closes the page before FAQ deflects final intent.

### 12 — crs-faq-accordion
Risk reduction. Addresses: Novel Food status, results timeline, usage, cancellation, Uthever® certification, legality, supply duration, guarantee scope.
Novel Food answer must appear as question 1 — legal and compliance requirement.

### 13 — apps
Loox review widget. Third-party social proof aggregation.
Position is after FAQ — supporting proof, not primary conversion.

---

## Proof Architecture

The trust-building sequence is front-loaded and layered:

```
Media trust (section 2)
  → Quantified proof (section 3)
    → Benefit claims (section 4)
      → Quality differentiation (section 5)
        → Timeline / continuity argument (section 6)
          → Science + expert authority (sections 7–9)
            → Social proof (sections 10, 13)
              → Final action (section 11)
```

Each layer assumes the previous has landed. Do not reorder without a conversion-specific reason.

---

## Headline + Subheadline Logic

The hero headline and tagline are a single visual unit. Not two separate blocks.

**Rules (from implemented PDP):**
- Headline: `--text-h1` (36px), `--font-heading`, `--weight-bold`, `--leading-heading` (1.15)
- Tagline/subheadline: same font, smaller size (`--text-body-lg` or `--text-section`), `--weight-regular`, `--color-text-secondary` — differentiated by visual weight and opacity, not a dramatic size drop
- Spacing between headline and subheadline: `--space-2` to `--space-3` — tight, like a natural line break within a single block, not a section gap
- Both lines should share a similar visual width — if the tagline runs significantly longer or shorter than the headline, break or trim it to match
- Max-width on the text column: controlled to prevent wide runaway lines. Not `100%` on desktop. Typically matches the buybox column width.
- Do not center-align the PDP hero text. Left-aligned in the right column.

**Current NMN headline pair:**
```
Der tägliche NAD⁺-Baustein gegen das biologische Altern deiner Zellen.
Entwickelt von Ärzten. Unabhängig laborgeprüft. Jede Charge öffentlich einsehbar.
```
Both lines are roughly the same visual width at the implemented column size. This is intentional.

---

## CTA Button Logic

- Background: `var(--color-dark)` (#364F56) — dark teal, not sand
- Text: `var(--color-white)`
- Shape: `var(--radius-full)` (pill)
- Height: min-height 48px; full-width inside the buybox zone
- One primary CTA per viewport. Secondary link option in text, not a second button.
- Label is action + price inline: "Abo starten — 34,90 €/Monat" (not just "Jetzt kaufen")

---

## Subscription Framing

Subscription is the primary option and is pre-selected. Its messaging logic:
- Role: effortless continuity ("wird automatisch Teil deiner Routine")
- Savings stated as a %, not a promise
- Control reassurance: adjustable, pauseable, cancellable at any time
- One badge. No stacking with popularity or recommendation claims.

One-time purchase is secondary:
- Role: flexible entry ("einmal ausprobieren, ohne Bindung")
- Framed as a trial path, not a downgrade

---

## Reusable vs. Product-Specific

**Reuse across products (structure is fixed):**
- Section order (all 13 positions)
- Section types (all `crs-*` and `lt-*` types)
- Padding / spacing values
- `crs-guarantee-block` structure (disabled but available)
- `crs-logo-garden` logos (same media partners)

**Update per product:**
- All headline, tagline, and bullet copy in `lt-pdp-hero`
- Metrics in `crs-metrics-row`
- Feature cards in `crs-feature-grid`
- Comparison table rows in `lt-comparison-table`
- Timeline steps in `crs-timeline`
- Science content in `crs-knowledge-base`
- Expert credentials in `crs-expert-quotes`
- Study links in `crs-link-cards`
- Review quotes in `crs-social-quotes`
- FAQ questions + answers in `crs-faq-accordion`
- Pricing, pack options, guarantee duration, trust pills in `lt-pdp-hero` settings

See `docs/lt-pdp-template-notes.md` for the complete per-product field checklist.

---

## Adding a New Section

1. Identify which psychological stage it serves (see `.cursor/rules/pdp-architecture.mdc`)
2. Confirm it does not duplicate an existing section's job
3. Check `order` array count — max 25 total
4. Check schema `name` ≤ 25 chars
5. Reference closest approved example in `_examples/`
6. Build, then run visual QA from `.cursor/rules/design-components.mdc` §8
