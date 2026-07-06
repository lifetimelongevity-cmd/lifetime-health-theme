---
status: living
last_review: 2026-06-19
canonical_for: claude-design-system-bundle
---

# LIFETIME Claude Design System (Bundle)

Lokale Quelle für das **Claude Design**-Projekt (claude.ai/design). Jede `.html`
ist eine eigenständige Vorschau-Karte; die erste Zeile trägt den
`<!-- @dsCard group="…" -->`-Marker, nach dem die Design-System-Ansicht die
Karten in Gruppen einsortiert.

## Source of Truth

Die Tokens stammen 1:1 aus `assets/theme.css :root` (gespiegelt in
`docs/design-governance.md §3`). Die Komponenten sind aus den approved
`_examples/` und `snippets/section-heading-crs.liquid` abgeleitet. **Der Code im
Theme bleibt SoT.** Ändert sich ein Token oder eine Komponente im Theme, wird
dieses Bundle neu generiert und neu gesynct, nicht umgekehrt.

Dieser Ordner liegt unter `docs/` und wird von `shopify theme push` ignoriert.

## Inhalt

| Gruppe | Datei |
|---|---|
| Color | `foundations/colors.html` |
| Type | `foundations/typography.html` |
| Spacing | `foundations/spacing.html` |
| Shape | `foundations/shape-elevation.html` |
| Components | `components/section-heading.html` |
| Components | `components/buttons.html` |
| Components | `components/badges.html` |
| Components | `components/card-info.html` |
| Components | `components/stat-callout.html` |
| Components | `components/review-card.html` |
| Components | `components/quote.html` |

`tokens.css` ist die kanonische Token-Referenz (keine Karte).

## Disziplin-Regeln (im Bundle umgesetzt)

- **Heading-Stack:** Title und Subline sind ein Block. Gleiche Größe, gleiches
  Gewicht (Regular), gleiche Zeilenhöhe. Unterschied nur über Opacity
  (100 / 60 / 40), gleiche Schrift (Helvetica). Beide Zeilen etwa gleich lang.
- **Typografie:** wenige Größen, wenige Gewichte. Headlines in Regular. Bold ist
  den Stat-Zahlen vorbehalten. Hierarchie über Größe und Opacity, nicht Fettung.
- **Keine AI-Tells:** keine farbigen Left-/Accent-Borders, keine Em-Dashes in
  der Copy. Trennung über Weißraum und neutrale Hairlines.
- **Farbe nur mit Bedeutung:** Teal für Links/Garantie, Success-Grün semantisch,
  Promo-Rot nur für Rabatt. Flächen tragen die Hierarchie.

## Neu synchronisieren

1. In dieser Session `/login` ausführen (claude.ai-Login mit Design-Zugriff).
2. Claude bitten: „push das Design-System zu Claude Design".

Der Sync läuft inkrementell: geänderte Dateien werden einzeln aktualisiert, nie
das ganze Projekt ersetzt.
