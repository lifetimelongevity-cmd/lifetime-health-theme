# LIFETIME — Approved Examples

**Diese Dateien sind der visuelle Nordstern für alle Cursor-Builds.**

Sie sind keine Templates zum freien Modifizieren.
Sie sind **approved Reference-Implementations** — jede Design-Entscheidung ist dokumentiert.

---

## Pflichtlektüre vor jedem Section-Build

1. Diese README lesen
2. Nächstverwandtes Beispiel aus der Tabelle unten öffnen
3. Den `{% comment %}` Block oben in der `.liquid` Datei lesen — enthält die vollständige §12-Spec
4. Die CSS-Datei lesen — jede nicht-offensichtliche Entscheidung ist kommentiert mit §-Referenz
5. Token-Nutzung exakt übernehmen. Inhalte anpassen. Disziplin beibehalten.

---

## Visueller Nordstern: PDP

**→ `pdp-reference.html` öffnen bevor irgendetwas am PDP gebaut wird.**

Das ist das approved Mobile-PDP Design mit:
- Hero + Rating + Trust Pills
- Benefit Surface
- Purchase Cards (Abo / Einmalkauf) mit interaktivem Wechsel
- Review Karussell
- Expert Card
- NAD⁺ Erklär-Section mit Studienreferenzen

---

## Approved Section Examples

| Datei | Pattern | Surface | Dominantes Element |
|---|---|---|---|
| `sections/stat-callout.liquid` | stat-callout | `--color-surface-dark` | Stat-Zahl (56px) |
| `sections/benefits.liquid` | card-info × 3 | `--color-surface-secondary` | Section Heading (h1) |
| `sections/reviews.liquid` | card-review × 3 | `--color-surface-primary` | Section Heading (h1) |
| `sections/quote.liquid` | quote-block | `--color-surface-dark` | Quote-Text (28px italic) |

---

## Page-Rhythmus dieser Sections

```
[warm]   benefits      → --color-surface-secondary
[dark]   stat-callout  → --color-surface-dark        ← intentionaler Rhythmusbruch
[white]  reviews       → --color-surface-primary
[dark]   quote         → --color-surface-dark        ← intentionaler Rhythmusbruch
```

**Regel:** Max 1–2 dark Sections pro Seite. Nie als Default — immer intentionaler Bruch.

---

## Was "approved" bedeutet

Jedes Beispiel hat den vollständigen QA-Checklist aus §8 bestanden:

- Alle Abstände referenzieren Tokens — kein hardcodiertes px
- Alle Farben referenzieren Tokens — kein hardcodiertes Hex
- Typografie folgt exakt der §6 Selection Table
- Ein dominantes Element pro Section, klar schwerer als alle anderen
- CTA hat ausreichend Breathing Room (`--space-7` minimum davor)
- Mobile Collapse ist korrekt
- Subtraction Rules (§11) angewendet — kein dekoratives Element vorhanden

---

## Token Quick-Reference — Die häufigsten Fehler

| Falsch | Richtig | Grund |
|---|---|---|
| `#364F56` | `var(--color-surface-dark)` | Nie Brand-Hex hardcoden |
| `padding: 80px` | `var(--space-9)` | Nie Abstände hardcoden |
| `font-size: 56px` | `var(--text-stat)` | Nie Schriftgrößen hardcoden |
| `border-radius: 12px` | `var(--radius-md)` | Nie Radien hardcoden |
| `color: #22C55E` | `var(--color-success)` | Grün ist semantisch, nicht dekorativ |
| `background: #4A8C85` | `var(--color-teal-dark)` | Immer Token-Name verwenden |

---

## Schrift-Regel (kritisch)

- **Headings** (≥ `--text-h3`): immer `var(--font-heading)` = Helvetica Neue
- **Body, Labels, Badges**: immer `var(--font-body)` = Lato
- Nie Body-Text in Helvetica
- Nie Headings in Lato

---

## Was diese Examples NICHT zeigen

- Hero Section (PDP-Level Komplexität — siehe `pdp-reference.html`)
- Split-Layout Sections mit echtem Bild (benötigt Unsplash-Workflow)
- Trust Bar / Logo Row (kompakter — einfacher als diese Sections)
- FAQ Accordion (strukturelle Shopify-Komponente — restylen, nicht neu bauen)

Diese werden als zusätzliche approved Examples hinzugefügt wenn gebaut.

---

## Qualitäts-Endcheck

Vor jedem finalen Output fragen:
1. Sieht das premium genug für LIFETIME aus?
2. Fühlt sich das designed an, nicht assembled?
3. Würde die Hierarchie noch überzeugend wirken wenn man den Text entfernt?
4. Gibt es irgendetwas hier, das nur existiert weil es einfach zu bauen war?

Wenn eine Antwort Nein ist → verbessern vor Output.
