---
status: living
last_review: 2026-05-08
canonical_for: section-heading-system
applies_to: sections/**/*.liquid
---

## Section Headings: kanonisch ist `crs-heading-stack`

Alle LT- und CRS-Sections muessen das **geteilte `crs-heading-stack`-System** aus `assets/crs-section-headings.css` nutzen. Kein lokales Heading-CSS einfuehren. Kein zweites Heading-System aufbauen.

### Kernregel: Title + Subtitle sind ein gemeinsamer Block

- `crs-heading-stack__title` und `crs-heading-stack__subtitle` bilden **eine** visuelle Einheit
- Sie duerfen **nicht** wie zwei getrennte Hierarchieebenen wirken
- Im Shared-System bleiben `font-size`, `font-weight` und `line-height` deckungsgleich
- Der Subtitle wird nur visuell zurueckgenommen: ausschliesslich ueber Farbe/Opacity. Title und Subtitle laufen in derselben Schrift (`--font-heading`)
- Ein `section description`- oder Body-Text ist **etwas anderes** und gehoert ausserhalb von `crs-heading-stack__pair`
- Lokale Section-CSS darf `crs-heading-stack__title` oder `crs-heading-stack__subtitle` nicht bei `font-size`, `font-weight` oder `line-height` ueberschreiben

### ✅ RICHTIG — Snippet `section-heading-crs` nutzen (kanonisch)

Die einzige offizielle Methode, einen Section-Heading zu bauen, ist das Snippet
`snippets/section-heading-crs.liquid`. Es kapselt den `crs-heading-stack` +
`__pair`-Wrapper, sodass kein Bauer und kein Agent den Wrapper vergessen kann.

```liquid
{% render 'section-heading-crs',
  heading: section.settings.heading,
  subheading: section.settings.subheading,
  kicker: section.settings.kicker,
  align: section.settings.content_align,
  on_dark: false,
  headline_lg: false,
  extra_class: 'myblock__header'
%}
```

Parameter: `heading`, `subheading`, `kicker`, `align` (`left|center|right`),
`on_dark` (bool), `headline_lg` (bool, → `--text-h1`), `heading_tag`
(`h1|h2|h3|h4`, Default `h2`), `extra_class` (für Section-scoped Spacing/Margin),
`modifier` (z.B. `homepage-truth`). Wenn alle drei Text-Parameter leer sind,
wird nichts gerendert.

### ✅ RICHTIG (Fallback) — Inline-HTML, falls Snippet nicht nutzbar

Nur verwenden, wenn z.B. konditionale Logik um die Tags herum gebaut werden
muss, die das Snippet nicht abdeckt. Sonst immer das Snippet bevorzugen.

```liquid
<div class="myblock__header crs-heading-stack crs-heading-stack--align-left">
  {%- if section.settings.kicker != blank -%}
    <p class="crs-heading-stack__kicker">{{ section.settings.kicker | escape }}</p>
  {%- endif -%}
  <div class="crs-heading-stack__pair">
    <h2 class="crs-heading-stack__title">{{ section.settings.heading | escape }}</h2>
    {%- if section.settings.subheading != blank -%}
      <p class="crs-heading-stack__subtitle">{{ section.settings.subheading | escape }}</p>
    {%- endif -%}
  </div>
</div>
```

### ❌ FALSCH — lokales Heading-CSS

```css
/* NICHT so — niemals eigene Kicker/Headline/Subheadline-Regeln definieren */
.myblock__kicker { font-size: var(--text-micro); letter-spacing: 0.1em; … }
.myblock__headline { font-size: var(--text-h1); font-weight: var(--weight-bold); … }
.myblock__subheadline { font-size: var(--text-body-lg); … }
```

### ❌ FALSCH — Legacy-System in LT/CRS-Sections

```liquid
{% render 'section-heading', heading: section.settings.heading, subheading: section.settings.subheading %}
```

```html
<div class="section-heading section-heading--left section-heading--two-rows">
  ...
</div>
```

`snippets/section-heading.liquid` und alle `.section-heading__*`-Klassen sind **Legacy-Theme-Primitives**. Sie sind fuer neue LT-/CRS-Sections verboten.

### Modifier-Klassen

| Modifier | Wann | Ergebnis |
|---|---|---|
| `crs-heading-stack--align-left` | Standard-Content-Sections | linksbündig |
| `crs-heading-stack--align-center` | Zentrierte Sections | zentriert |
| `crs-heading-stack--on-dark` | Sections mit dunklem Hintergrund | helle Farben |
| `crs-heading-stack--headline-lg` | Finale CTA-Sections (wie `crs-risk-free-close`) | `--text-h1` statt `--text-section` |

### Warum

- `crs-section-headings.css` ist bereits in `layout/theme.liquid` eingebunden (Zeile 48)
- PDP-Sections (`crs-metrics-row`, `crs-feature-grid`, `crs-timeline` etc.) nutzen alle dieses System
- Inkonsistente lokale CSS-Regeln führen zu visuell unterschiedlichen Headings auf PDP vs. Homepage

### QA-Regel

Wenn Title und Subtitle wie getrennte Hierarchieebenen, Body-Text oder zwei unabhaengige Bloecke wirken, ist die Umsetzung falsch und muss auf `crs-heading-stack` zurueckgefuehrt werden.

---

## Farben: kein `--color-teal` / `--color-teal-dark` als Textfarbe

Die genehmigten PDP-Sections verwenden **kein Teal als Textfarbe**. Teal ist ausschließlich für Links (`crs-link-cards`) und Garantie-Elemente reserviert.

### ❌ VERBOTEN — Teal als Textfarbe oder dekorativer Akzent

```css
color: var(--color-teal);          /* verboten für Text, Icons, Labels */
color: var(--color-teal-dark);     /* verboten für Text, Icons, Labels */
background: var(--color-surface-benefit);  /* grünlich — verboten für allgemeine Flächen */
border: 1px solid rgba(94, 171, 161, …);   /* verboten — hardcoded teal rgba */
```

### ✅ ERLAUBT — Neutrale Farb-Tokens

| Element | Light surface | Dark surface |
|---|---|---|
| Icon / SVG | `--color-text-muted` | `--color-text-on-dark-muted` |
| Label / Tag text | `--color-text-secondary` | `--color-text-on-dark-muted` |
| Badge / Pill bg | `--color-surface-secondary` | `rgba(255,255,255,0.08)` |
| Badge / Pill border | `--color-border-default` | `rgba(255,255,255,0.15)` |
| Callout Box bg | `rgba(38,37,30,0.05)` | — |
| Callout Box border | `rgba(38,37,30,0.08)` | — |
| Placeholder bg | `--color-surface-secondary` | — |
| Link text | `--color-text-primary` | `--color-text-on-dark` |
