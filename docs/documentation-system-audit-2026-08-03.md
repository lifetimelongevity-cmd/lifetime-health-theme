---
status: living
last_review: 2026-08-03
canonical_for: documentation-housekeeping-report-2026-08-03
---

# Documentation System Audit — 2026-08-03

Scheduled housekeeping pass. Scope: all `.md` files, code organization, orphaned files. This
follows up on `docs/documentation-system-audit-2026-07-10.md`; only drift since that pass is
covered here in depth.

## Result summary

The 2026-07-10 restructuring (active docs in `docs/`, archives in `docs/archive/` and
`_archive/`, `.mdc` vs `.md` split) is still intact. No new duplicates, no stray root-level
files, no broken canonical references in `AGENTS.md`, `CLAUDE.md`, `docs/README.md`, or the
`.cursor/rules/*.mdc` set — every path they point to still exists. The issues found this pass
are incremental drift, not systemic disorganization.

## Markdown cleanup needed

- No broken links or new duplicate docs found. The known, intentional overlaps documented in
  the 2026-07-10 audit (`docs/design-components.md` ↔ `.cursor/rules/design-components.mdc`;
  `docs/shopify-rules.md` ↔ `shopify/AGENTS.md` ↔ `.cursor/rules/shopify-rules.mdc`) are still
  the only ones, and the prior decision to keep both still holds.
- `docs/archive/` and `_archive/` remain correctly quarantined (README in each, nothing archived
  leaking back into active discovery paths).
- One file has gone stale rather than broken: `docs/theme-status.md` (see Documentation gaps).

## Documentation gaps

1. **`docs/theme-status.md` is ~3 months out of date** (`last_review: 2026-05-08`), despite its
   own header instructing "bei jeder Theme-Session: Eintrag im Änderungs-Log anhängen." 50+
   commits have landed since, including a PDP-Refit Phase 3 launch, a footer address change, and
   server-side review rendering — none logged. Two of its "Offene To-Dos" already look resolved
   in code but are still listed as open:
   - Todo #1 (`lt-pdp-hero` → `section-heading-crs` snippet): `sections/lt-pdp-hero.liquid`
     already uses the `crs-heading-stack` / `section-heading-crs` pattern.
   - Todo #5 (`templates/product.legacy-13-2-nmn.json` "ghost file"): this file no longer
     exists — superseded by the 2026-07-23 NMN template cleanup
     (`_archive/2026-07-23_nmn-template-cleanup/`).
   - Todo #4 (NMN-Kapsel storefront status) also looks resolved per the same archive note
     (product line phased out), but isn't marked as such.
   Recommend a refresh pass so the tracker doesn't mislead the next person who trusts it as
   current state. Left as-is here since it's a human-maintained running log, not something to
   silently rewrite.
2. **`templates/page.stack-builder.json`** is still an open question from the same tracker: the
   `lt-stack-builder` section it uses is real and wired into `layout/theme.liquid`, but no
   template/page in the repo currently shows it assigned. Whether it's actually live can only be
   confirmed in Shopify Admin, not from the repo alone — flagging for manual check rather than
   guessing.

## Code organization issues

- **`package.json` lists `lucide-react` as a dependency**, but this is a vanilla-JS Liquid theme
  with no React anywhere, and no file in the repo (including the `docs/design-system/*.html`
  bundle, which uses inline SVG/tokens.css) references it. This exact contradiction was already
  flagged in the 2026-07-10 audit for the docs side; the dependency itself is still sitting
  unused in `package.json`. Safe candidate for removal, left for a deliberate decision rather
  than pulled out here.
- `scripts/check-heading-system.js` and `scripts/fetch-image.js` aren't wired into any npm
  script (`package.json` has no `"scripts"` block) or CI (no `.github/workflows`) — they only
  run via manual `node scripts/...` invocation. Not broken, just undocumented; worth a one-line
  mention in the dev docs if they're meant to be run regularly (e.g. before a heading-stack
  refactor).
- `assets/component-collection-tabs.js` and `assets/component-recently-viewed.js` have zero
  references from any `.liquid` file in the active theme. These look like unused stock
  Combine-theme scaffolding, the same category as the `ss-*` "Combine-Core, not LIFETIME-built"
  sections already acknowledged in `docs/theme-status.md`. Low-priority cleanup candidates, not
  urgent.

## Files to archive or move

- **`.playwright-mcp/` (21 files, ~700 KB) is committed to git** — console logs and page
  snapshots from an April 2026 Playwright MCP debugging session. This is scratch/debug output,
  not project source, and the directory isn't in `.gitignore`. Recommend adding
  `.playwright-mcp/` to `.gitignore` and removing the tracked files (`git rm --cached`); debug
  session artifacts shouldn't sit in permanent repo history.
- `templates/page.stack-builder.json` — pending the Shopify Admin check above, move to
  `_archive/` if confirmed unassigned; otherwise leave in place.

No further action taken automatically — the above are flagged for a deliberate pass, consistent
with how the 2026-07-10 audit handled similar judgment calls (e.g. the `lucide-react`
contradiction was flagged then and is only now being resolved as unused-dependency cleanup).
