---
status: living
last_review: 2026-07-02
canonical_for: ueber-lifetime-page-rebuild-brief
---

> **Umsetzungsstand (2026-07-02):** Im Code umgesetzt (Template + Sections + Examples, siehe
> `docs/live-pages-map.md` §Nav-Cleanup/Phase 3). Live-Push via Theme Manager ausstehend.
> Nach Live-Verifikation (Desktop + echte Handy-Screenshots) kann diese Datei auf `superseded` gesetzt werden —
> SoT ist dann die Live-Seite + der Code.

# Implementation-Brief: Rebuild `/pages/ueber-lifetime` auf das LIFETIME-Design-System

> Dieser Brief ist für eine **frische Claude-Code-Session** im Repo `lifetime-health-theme/`.
> Er ist self-contained, verweist aber auf die Repo-Dateien als Source of Truth. Erst lesen, dann bauen.

## 0. Ziel in einem Satz

Die Über-uns-Seite (`templates/page.ueber-lifetime.json`) ist aktuell ein Default-**Combine**-Stack (slideshow / rich-text / text-columns-icons) mit vielen hardcodierten Farben. Sie soll auf das **approved `lt-*`/Token-System** gehoben werden — visuell auf dem Niveau von Startseite und `/pages/science`. **Alle Inhalte 1:1 erhalten**, außer einer entschärften Copy-Stelle (siehe §5).

## 1. Pflichtlektüre zuerst (Source of Truth, in dieser Reihenfolge)

1. `CLAUDE.md` (Repo-Root) + `/CLAUDE.md` des Workspace — § Kanonisches Fundament, Working Rules, Goldene Regel „Live gewinnt".
2. `_examples/README.md`, dann `_examples/sections/{benefits,stat-callout,reviews,quote}.liquid` (jeweils den `{% comment %}`-Spec-Block lesen) + `_examples/pdp-reference.html`.
3. `.cursor/rules/design-components.mdc`, `.cursor/rules/design-tokens.mdc`, `.cursor/rules/shopify-rules.mdc`.
4. `snippets/section-heading-crs.liquid` + `docs/section-heading-stack.md` (Heading-System: Title + Subtitle = ein Block, nur Opacity).
5. `docs/conversion-messaging.md` — §9 KI-Tells, keine Medical Claims, Du-Form-Konvention prüfen (Seite nutzt aktuell „Sie" — Tonalität mit Live-Startseite abgleichen, **nicht** eigenmächtig umschreiben).
6. **Live ansehen** (Chrome-MCP; Mobile via echte Handy-Screenshots — Chrome-MCP kann hier kein Mobile emulieren): Startseite `https://www.lifetime-health.de/`, `/pages/science` (das ist das `lt-*`-Content-Page-Vorbild), und die aktuelle `/pages/ueber-lifetime`.
7. Copy-Quelle: `templates/page.ueber-lifetime.json` — **hier steht die gesamte zu erhaltende Copy verbatim** (Mission, Werte, 4 Experten-Bios, Team). Übernehmen, nicht neu erfinden.

## 2. Aktueller Zustand (Ist)

Stack in `page.ueber-lifetime.json` (`order`): `main` (disabled) → slideshow-Hero → rich-text (Mission) → slideshow-Band → rich-text-Titel → **text-columns-icons** (3 Werte) → **video** (Limmroth, `youtu.be/L4rTXNFvTb0`) → rich-text-Titel → slideshow-Band → **4× rich-text mit Bild** (Experten-Profile) → rich-text-Titel „Management Team" → **text-columns-images** (3 Team-Fotos) → rich-text (disabled, Standorte) → slideshow (disabled, Standorte).

Token-Verstöße im Ist: hardcodierte `#ffffff`, `#000000`, `#eeeeee`, `#65c0b6`, `#000000`-Backgrounds in Slideshow-Bändern. Diese müssen weg (→ Tokens).

## 3. Ziel-Section-Stack (Soll)

| # | Inhalt | Umsetzung | Surface |
|---|---|---|---|
| 1 | Hero: Eyebrow „Gesundheit erleben" + H1 „Zugang zu den neuesten Erkenntnissen der Longevity-Forschung" (Bild `hero-ueber-lifetime.webp` behalten) | Token-clean, Heading via `section-heading-crs`-Logik | Bild |
| 2 | Mission (Vision + Mission + Philosophie-Absätze) | `section-heading-crs` (Eyebrow „Unsere Mission" + Headline) + Body; die zwei Mission-Blöcke (rich-text + slideshow-Band) zu **einem** klaren Intro konsolidieren | hell (`--color-surface-primary`) |
| 3 | „Was macht LIFETIME einzigartig?" + 3 Werte (Wissenschaftlich fundiert / Qualität & Einfachheit / Individuell & evidenzbasiert) | **`benefits` (card-info × 3)** — approved Pattern, direkter Map aus `text-columns-icons` | `--color-surface-secondary` |
| 4 | **NEU** Proof-Zahlen (aus den Bios geholt) | **`stat-callout`** — approved. Vorschlag 3 Stats: „250+ wissenschaftliche Arbeiten" · „30 Jahre Longevity-Forschung" · „4,8 ★ aus 431 Bewertungen". (Alt: „17 Jahre Chefarzt", „400+ Patienten") | `--color-surface-dark` (intentionaler Rhythmusbruch) |
| 5 | **NEU** Limmroth-Zitat als Emphasis | **`quote-block`** — approved. Text: „Lebenserwartung kann durch verschiedene Strategien verlängert werden, LIFETIME bietet diese Strategien." (Gedankenstrich → Komma, KI-Tell-Regel) | `--color-surface-dark` |
| 6 | Experten: Video (Limmroth) + 4 Profile (Prof. Dr. Limmroth · Bianca Maus · Heidi Gawron · Dr. Christina Limmroth) | **NEUES Pattern „Experten-Profil"** bauen (§4) | hell |
| 7 | Management-Team (Dieter Gawron / Maximilian Schramme / Benedikt Junker) | **NEUES Pattern „Team-Grid"** bauen (§4) | hell/secondary |
| 8 | Standorte (Köln/München/Hamburg/Zürich, „Bald verfügbar") | bleibt **disabled** (out of scope) | — |

**Page-Rhythmus-Regel** (`_examples/README.md`): max 1–2 Dark-Sections, immer als intentionaler Bruch. #4 und #5 sind die zwei Dark-Sections, direkt hintereinander ist ok als ein „Proof-Block", sonst eine davon hell halten.

## 4. Neue Patterns bauen (voll, als approved Examples etablieren)

Es gibt für diese zwei kein approved Example. Bauen und danach je ein Reference-Example unter `_examples/sections/` ablegen (mit `{% comment %}`-Spec-Block + kommentiertem CSS), damit sie künftig wiederverwendbar sind.

**a) Experten-Profil** (`sections/…expert-profile…` + `assets/section-…css`):
- Split-Layout: Foto + Textspalte, alternierend links/rechts über die 4 Profile.
- Hierarchie: **Name = dominantes Element** (`--font-heading`, Heading-Größe); darüber Rolle als Label/Eyebrow (`--font-body`, uppercase, klein, reduzierte Opacity); darunter Bio (Body). Optionales hervorgehobenes Zitat (nur Prof. Limmroth + Bianca Maus haben eins).
- Token-basiert: `--color-surface-*`, `--radius-md`, `--space-*`. **Kein** hardcoded `#ffffff`/`#000000`. Kein farbiger Accent-Border.
- Fotos aus dem aktuellen Template wiederverwenden (`volker-limmroth-lifetime.webp`, `bianca-maus-head.jpg`, `heidi-gawron-…jpg`, `limmroth-christina-…jpg`).
- Mobile: Bild oben, Text darunter, sauber gestapelt.

**b) Team-Grid** (`sections/…team-grid…` + CSS):
- Card-Grid (Foto + Name + Rolle), `grid-3` → `grid-palm-1`. Optik an `card-info` orientiert, aber mit Foto oben.
- Fotos: `dieter-gawron.webp`, `max-schramme.webp`, `benedikt-junker.webp`. Rollen: FOUNDER & CEO / GENERAL MANAGER / BUSINESS MANAGER.
- Token-basiert, ein dominantes Element (Name), kein hardcoded Hex.

## 5. Content-Regeln

- **Alle Copy verbatim** aus `page.ueber-lifetime.json` übernehmen — AUSSER:
- **Bianca-Maus-Zitat entschärfen** (Health-Claim-Risiko, vgl. Compliance-Audit). Ersetzen durch:
  > „Guter Schlaf ist eine der am stärksten unterschätzten Säulen der Gesundheit. Wer die eigene Schlafqualität ernst nimmt, legt eine der wichtigsten Grundlagen für ein langes, gesundes Leben."
  (Entfernt Demenz/Krebs + „LIFETIME bietet Lösungen".)
- **Keine KI-Tells:** keine Em-/En-Dashes als Separator (→ Komma/Punkt/Klammer), keine Dreiklang-Stakkato-Slogans, keine farbigen Accent-/Left-Borders als Deko.
- **Keine neuen Medical Claims.** Experten-Bios beschreiben Credentials, keine Produkt-Wirkversprechen.
- Tonalität mit Live-Startseite abgleichen (Du/Sie), aber Copy nicht eigenmächtig umtexten.

## 6. Technische Constraints (aus `shopify-rules.mdc`)

- **Tokens für jeden Wert** — kein hardcoded Hex, kein hardcoded px. Nie `#000000` als Background. Keine neuen Font-Familien.
- Section-`name` im Schema ≤ **25 Zeichen**; `default` nie leerer String.
- Bestehende Sections/Snippets/CSS-Klassen/Patterns wiederverwenden, wo möglich.
- Vor Änderung an bestehenden Sections deren App-/Regressions-Interaktionen prüfen.

## 7. Build-Prozess & Governance

- §12-Prozess aus `design-components.mdc`: spec → build → QA. **Nach jeder Section die Visual-Craft-QA laufen lassen: Failures listen, dann nur den korrigierten Code ausgeben.**
- Qualitäts-Endcheck (`_examples/README.md`): Sieht es premium aus? Fühlt es sich designed statt assembled an? Hält die Hierarchie ohne Text? Gibt es etwas, das nur existiert, weil es einfach zu bauen war?
- Git: alle Theme-Änderungen **direkt auf `main`** (Workspace-Konvention, kein Branch-Gate). Live-Push macht BJ via Theme Manager.

## 8. Deliverable

1. `templates/page.ueber-lifetime.json` — restrukturiert auf den Soll-Stack (§3).
2. Neue `sections/*.liquid` + `assets/section-*.css` für Experten-Profil + Team-Grid (§4).
3. Je ein neues `_examples/sections/*.liquid` für die zwei etablierten Patterns (mit Spec-Block).
4. QA-Nachweis (Failures + Korrekturen) im Chat.

## 9. Definition of Done

- Keine hardcodierten Hex/px auf der ganzen Seite; alles über Tokens.
- Werte-Section = `benefits`-Pattern; ein `stat-callout` + ein `quote-block` neu integriert.
- Experten-Profil + Team-Grid als saubere, token-basierte, wiederverwendbare Patterns.
- Bianca-Maus-Zitat entschärft; keine Em-Dashes; keine Medical Claims neu.
- Visuell konsistent mit Startseite / `/pages/science`, Desktop **und** Mobile geprüft.
