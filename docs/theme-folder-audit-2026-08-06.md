---
status: living
last_review: 2026-08-06
canonical_for: theme-folder-organization-audit-2026-08-06
---

# Theme Folder Audit — 2026-08-06

Scheduled housekeeping review of the whole repo (docs + code). Read-only audit — no files were moved, archived, or deleted. This is a punch list for a follow-up cleanup pass, not a changelog of applied changes.

Repo file counts at time of audit: `/sections` 209 (205 `.liquid` + 4 section-group `.json`) · `/snippets` 72 `.liquid` · `/templates` 89 (87 `.json` + 2 `.liquid`) · `/blocks` 17 `.liquid` · 63 `.md` files total.

## 1. Markdown cleanup needed

| File | Issue |
|---|---|
| `docs/shopify-rules.md` | Near-1:1 duplicate of `.cursor/rules/shopify-rules.mdc` (145 vs. 146 lines, identical headings/order). Already flagged for archival in the 2026-07-10 audit, never actioned. Recommend archiving in favor of the `.mdc` + `shopify/AGENTS.md` pair. |
| `docs/theme-status.md` | Frontmatter says `last_review: 2026-05-08`, but git history shows only one commit ever touched it (`30863e5`, 2026-07-27), and it's uncommitted since. Its own instructions mandate a changelog entry every session; 15+ substantive commits since (Köln address change, quiz UTM fix, GEO hub linking, blog CTA activation on 2026-08-05/06) are undocumented. It also contains two now-incorrect claims — see §2. |
| `docs/ueber-lifetime-rebuild-prompt.md` | Its own resolution condition ("Live-Push via Theme Manager ausstehend") is met: `templates/page.ueber-lifetime.json` already uses the target `lt-*` sections with no hardcoded hex colors, shipped in `30863e5` (2026-07-27). Should flip to `superseded` and move to `docs/archive/prompts/` — it's a one-off session brief, not ongoing guidance. |
| `docs/nmn-angebotsarchitektur.md` §12 "Offene Punkte" (~line 503) | Still lists `templates/product.13_nmn.json` as an open risk to archive. It was already archived the same day into `_archive/2026-07-23_nmn-template-cleanup/`. Stale open item, should be checked off. |
| `docs/design-icon-system.md` | Only doc without `status`/`last_review` frontmatter. Still lists 5 unresolved custom-SVG icon gaps (NMN-Molekülstruktur, NAD+ Zyklus, Mitochondrium, Epigenetik, Telomer) untouched since the initial bulk commit. |
| `docs/lifetime-doctor-quiz-spec.md` | `last_review: 2026-05-19`, unchanged for ~3 months while its sibling `lifetime-quiz-spec.md` was superseded on 2026-07-23. Needs a freshness check against the live quiz. |

## 2. Documentation gaps

- **Broken dependency in an active, recent doc**: `docs/age-dna-geo/BRIEFINGS-age-cluster-2026-08-03.md` (frontmatter `depends_on`, plus lines 66 and 349) references `docs/geo-claim-ledger.md` and `docs/geo-prompt-panel.md` — neither file exists anywhere in the repo. This doc is dated just 3 days before this audit, so it's not old drift, it's a real gap.
- **`docs/theme-status.md` "Template-Geister-Files" item (line 35) is now factually wrong on both counts**:
  - `templates/page.stack-builder.json` is live, not a ghost — referenced by `layout/theme.liquid:34` and confirmed live on main per `docs/geo-action-plan.md:891`. Its section `lt-stack-builder` is in active use.
  - `templates/product.legacy-13-2-nmn.json` doesn't exist and has no trace in `git log --all` — looks like a doc typo/conflation with the already-archived `product.13_nmn.json`.

## 3. Code organization issues

**Orphaned sections** (no template, section-group, or `{% section %}` reference found):
- 5 hash-suffixed Shopify-admin "duplicate section" leftovers, 95KB–277KB each: `ss-feature-13-78ff35.liquid`, `ss-hero-pro-b6628d.liquid`, `ss-flexible-tabs-68bfcf.liquid`, `ss-steps-12-5aedcd.liquid`, `ss-product-ingredients-6-4b8554.liquid`.
- Stock Combine sections superseded by their custom LT equivalents: `main-article-comments.liquid`, `main-article-navigation.liquid`, `main-blog.liquid`, `result-preview.liquid`, `collection-description.liquid` (blog/article templates now use `lt-blog-index`/`lt-article`).
- Possible additional orphans that need a manual look before touching (may be intentionally parked, e.g. a future NMN v2 PDP): `cta-card-grid`, `image-with-hotspots`, `lifetime-bento`, `lifetime-trustbar`, `bekannt-aus`, `longevity-start`, and the `lt-lp-*` / `lt-hp-*` / `nmn-pdp-v2-*` families.

**Stale CSS**: `assets/section-account.css` and `assets/section-slider-vertical.css` — no matching section file exists for either.

**Orphaned snippets** (never `{% render %}`'d anywhere): `snippets/nmn-pdp-benefit-surface.liquid`, `snippets/nmn-pdp-quality-pills.liquid`, `snippets/nmn-pdp-subtitle.liquid` — likely leftovers from the NMN PDP v1/v2 rework, worth checking against `docs/nmn-angebotsarchitektur.md` before removal.

## 4. Files to archive or move

- **`/.playwright-mcp/`** — 21 dated debug files (`console-*.log`, `page-*.yml`, all timestamped 2026-04-02), ~700KB total, committed to git on 2026-07-27 despite being Playwright test-run artifacts. Should be removed from git tracking and added to `.gitignore`.
- `docs/ueber-lifetime-rebuild-prompt.md` → `docs/archive/prompts/` (build already shipped).
- `docs/shopify-rules.md` → archive or delete (redundant with `.cursor/rules/shopify-rules.mdc`).
- The 5 hash-suffixed `ss-*` duplicate sections and the 5 orphaned stock sections above → candidates for `_archive/` or deletion, pending confirmation they're truly unused.
- The 3 orphaned `nmn-pdp-*` snippets → candidates for removal, pending a check against current NMN PDP docs.

## Not flagged (checked, found fine)

- `docs/live-pages-map.md` references to the archived quiz template resolve correctly to `_archive/2026-05-19_quiz-cleanup/`.
- No new large duplicate documentation clusters beyond the items above — GEO and quiz docs are properly differentiated via `canonical_for`/`depends_on`/`supersedes` frontmatter.
- `sections/` files with no matching `section-*.css` are by design (inline `{% style %}` blocks), not an omission.
- `scripts/check-heading-system.js` and `scripts/fetch-image.js` are reasonably placed dev utilities, not urgent to relocate.

## Suggested next step

This is a list for a deliberate follow-up pass, not auto-applied changes — several items (parked landing-page sections, icon gaps, quiz spec freshness) need a human call before archiving or deleting anything. The lowest-risk, highest-value first steps: untrack `.playwright-mcp/`, fix the two factual errors in `docs/theme-status.md`, and fill or remove the broken `geo-claim-ledger.md`/`geo-prompt-panel.md` references in the age-cluster briefing.
