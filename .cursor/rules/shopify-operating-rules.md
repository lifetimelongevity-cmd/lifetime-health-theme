# Shopify Operating Rules

## Role
You are working on an existing live Shopify theme, not a rebuild.
Treat the current theme as the source of truth.
Prioritize technical reliability, minimal-invasive implementation, theme consistency, and regression safety.

## Core priorities
Always prioritize in this order:
1. Technical feasibility
2. Regression safety
3. Theme consistency
4. Editor usability
5. Implementation speed
6. Copy/CRO sophistication

## Working mode
- Do not start with redesign thinking.
- Do not invent a new design system unless explicitly asked.
- Prefer reuse over reinvention.
- Prefer extension over replacement.
- Prefer small refactors over rewrites.
- Prefer minimal diffs over broad rewrites.
- Keep solutions realistic for a live commercial Shopify environment.

## Theme reality assumptions
Always assume:
- the theme may contain legacy complexity
- apps may affect layout, markup, styles, or logic
- custom CSS may exist in awkward places
- not every elegant idea is worth implementing
- a working Shopify-native solution is better than a theoretically perfect system

## Discovery-first rule
Before proposing implementation, inspect the actual theme structure whenever the task touches storefront code.

Discovery should identify where relevant:
- templates involved
- sections involved
- snippets involved
- assets involved
- existing wrappers/classes/patterns that should be reused
- schema/settings patterns
- app interactions
- likely regression points

Do not jump into implementation without enough theme context.

## Implementation rules
When implementing:
- reuse existing theme sections, snippets, classes, containers, and UI patterns first
- create new sections/snippets only where necessary
- keep changes editor-friendly where it is realistically useful
- do not add schema/settings complexity without a clear use case
- do not hardcode quick fixes if a small Shopify-native structure is realistic
- do not move logic across many files unless justified
- do not remove legacy code unless reasonably sure it is unused and safe to remove

## Editor usability rule
Shopify Theme Editor usability matters, but should not be forced everywhere.
If a change is local, stable, and unlikely to require merchant editing, prefer the smallest reliable implementation over unnecessary schema complexity.

## Output requirements
For any meaningful implementation task, always report:
- files inspected
- files changed
- what was added
- what was modified
- what was reused
- technical risks
- anything uncertain
- app interactions
- whether the result is Shopify Theme Editor friendly

## QA expectations
After implementation, always check where relevant:
- desktop
- mobile
- Theme Editor behavior
- template-specific behavior
- app-related interactions
- spacing/layout regressions
- console errors
- obvious add-to-cart / variant / cart issues

## Prohibited behavior
Do not:
- do full rewrites unless clearly justified
- invent a parallel design system
- make broad unscoped changes
- optimize copy deeply before technical stability exists
- ignore app conflicts
- present assumptions as facts when the theme has not been inspected

## Definition of good output
Good output is:
- minimal-invasive
- theme-consistent
- technically grounded
- safe to test in preview
- maintainable
- reusable where sensible
- realistic for a live Shopify storefront


## For any UI or copy-related task
→ refer to /docs/design-governance.md and /docs/conversion-messaging.md

Do not introduce design patterns that conflict with it.
Do not bypass these systems.