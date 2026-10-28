---
status: living
last_review: 2026-10-28
canonical_for: shopify-theme-regeln
supersedes: [AGENTS.md, shopify/AGENTS.md, .cursor/rules/*.mdc]
---

# LIFETIME-Theme: das einzige Regelwerk

Live-Shopify-Theme von LIFETIME („Combine“ v3.1.1 von KrownThemes, stark umgebaut). Eigene Sections tragen `lt-` (LIFETIME) oder `crs-` (geteilte Conversion-Bausteine). Alles hier gilt. Andere Docs beschreiben Seiten und Stände, sie stellen keine weiteren Regeln auf. Wenn etwas fehlt, kommt es hierher und nicht in ein neues Doc.

## Ablauf

**Bei jeder Arbeit an `sections/`, `snippets/`, `blocks/` oder `templates/` zuerst den Skill `/lt-section` laden.** Er enthält den Ablauf Schritt für Schritt. Kurzfassung:

1. **Live ist die Wahrheit.** Kanonisch sind die fünf Seiten Startseite, `/products/lifetime-age-dna`, `/pages/science`, `/pages/quiz-age` und `/products/lifetime-nmn`. Welches Template und welche Section hinter einer URL stecken, steht in `docs/live-pages-map.md`.
2. **Bei Produktseiten das Template am Produkt bestätigen** (`product.templateSuffix` per Shopify-MCP), nie aus dem Dateinamen raten. Beispiel: Die NMN-PDP rendert aus `product.nmn-pulver.json`.
3. **Erweitern statt neu bauen.** Erst nach einer vorhandenen Section, einem Snippet oder einer Klasse suchen. Vorbilder: `_examples/` (geprüfte Muster) und `DESIGN.md` (visuelle Sprache, daraus lesen auch die Impeccable-Skills).
4. **Geteilte Sections:** Neue Settings stehen per Default auf aus, damit andere Seiten unverändert bleiben. Vor dem Commit jedes Template prüfen, das die Section nutzt: `grep -l '"type": "<section>"' templates/*.json`.
5. **Prüfung:** Ein Hook prüft nach jedem Edit an `.liquid` oder `templates/*.json` die geänderte Datei (`scripts/lt-check.mjs` plus `shopify theme check`). Meldungen werden behoben, nicht umgangen.
6. **Nur BJ pusht live, und zwar über den Theme Manager.** Claude committet lokal und pusht auf Dev-Themes. `shopify theme push --allow-live` gibt es nur auf ausdrückliche Ansage von BJ.

## Plattform-Grenzen (scheitern sonst beim Push)

- Schema-`name` und `presets[].name`: höchstens **25 Zeichen**.
- Schema-`default`: nie `""`. Weglassen und in Liquid `| default:` nutzen.
- Schon bei einem einzigen Verstoß gegen die folgenden drei Grenzen weist Shopify die ganze Section ab, und jedes Template, das sie nutzt, scheitert mit. `theme check` meldet keine davon, `scripts/lt-check.mjs` schon:
  - `label` höchstens **70 Zeichen**, `options[].label` höchstens **50**, `header`-`content` höchstens **50**
  - `range`: höchstens **100 Stufen** (`(max − min) / step`)
- Produkt-Template: höchstens **25 Sections** im `order`. App-Blöcke zählen mit.
- `rich-text`-Section: höchstens 9 Blöcke. `richtext`-Felder erlauben keine Tabellen.
- Der Theme Manager kann während einer Sitzung den Arbeitsstand committen und pushen. Git-Status oder Commit belegen also nicht, was live ist.
- JSON-valide heißt nicht Shopify-valide. Der Theme Manager verschluckt Push-Fehler stillschweigend. Nach dem Push muss die Live-URL per `curl` belegen, dass die Änderung angekommen ist. Der Storefront-Cache liefert bis zu 20 Minuten gemischte Stände.

## Liquid

- Texte aus Settings immer mit `| escape` ausgeben. Ausnahme sind `richtext`-Felder.
- `{%- -%}` (Whitespace entfernen), `{{ block.shopify_attributes }}` an jedem Block-Wrapper.
- **`inline_asset_content` nie nutzen**, es rendert im Store ohne Fehlermeldung leer. SVG gehört in ein Snippet mit `case`-Mapping.
- `continue` innerhalb von `{% liquid %}` überspringt die Iteration nicht zuverlässig. Stattdessen mit `unless … endunless` einschließen.
- Vanilla JS mit Web Components, kein Framework. Neu initialisieren über `shopify:section:load`.
- Apps nicht per CSS verstecken (`display:none !important`), sondern den Block aus `block_order` nehmen.

## CSS und Farben

- CSS lebt in der Section (`{% stylesheet %}` oder `<style>` wie die Nachbar-Sections) und ist auf die Section-Klasse gescoped. Keine `[class*=…]`-Wildcards im globalen CSS.
- **Neuer Code nutzt nur die Variablen aus `assets/theme.css :root`:** `--color-ink` (#26251e), `--color-paper` (#f7f7f4), `--color-light-warm`, `--color-dark` (#364F56), `--color-teal` (Mint #65C0B6), `--color-ink-muted`, `--color-gray-200/400/600`, `--space-1…10`, `--text-*`, `--leading-*`, `--weight-*`, `--radius-*`, `--font-heading` und `--font-body`.
- Hex-Werte sind nur an drei Stellen erlaubt: als `default` eines Schema-Settings vom `type: "color"`, als Fallback in einer Variable (`var(--lt-text, #26251e)`, so arbeiten die `lt-*`-Sections) und im Bestand. **Rund 60 ältere `lt-*`-Sections haben feste Hex-Werte.** Die bleiben, solange niemand die Section aus anderem Grund umbaut. Nebenbei wird nichts migriert.
- `color_accent_main` (#f25a38) ist tot, nicht verwenden.

## Gestaltung

- **Überschriften immer über `snippets/section-heading-crs.liquid`** (`crs-heading-stack`). Titel und Untertitel sind ein Block in derselben Größe und Schrift, nur die Deckkraft unterscheidet sie. Kein eigenes Heading-CSS. Details: `docs/section-heading-stack.md`.
- **Kein farbiges `border-left`** als Akzent. Stattdessen eine getönte Karte mit vollem Rahmen.
- Kein `#000` als Hintergrund, keine neue Schriftfamilie. Überschriften in `--font-heading`, Text in `--font-body`.
- Mobil zuerst (375 px), ohne horizontales Scrollen. Jede Section hat genau ein dominantes Element. Höchstens drei Schriftgrößen je Section.
- Weniger ist mehr: Was nur da ist, weil es leicht zu bauen war, fliegt raus.

## Copy

- Du-Form, kurze Sätze, „19 %“ statt „Prozent“.
- **Keine Em-Dashes**, keine Stakkato-Dreiklänge („Schneller. Klarer. Besser.“).
- Es gilt die Copy-Linie aus der Workspace-CLAUDE.md: aggressiv als Default, Grenzen nur bei der Schwarzen Liste (UWG-Anhang, z. B. Fake-Countdown) und beim VSW-Vergleich (NMN als NEM). Wo `docs/conversion-messaging.md` vorsichtiger klingt, gilt die Workspace-Linie.
- NMN nicht als Beispiel-Wirkstoff in Copy für andere Produkte, dafür Kreatin nehmen.
- Bei jeder neuen Section-Copy vermerken, wo ein Bild Sinn ergibt.

## Vorschau und Test

- HTML-Vorschauen aus `docs/` unter **http://localhost:8789/** öffnen (LaunchAgent, läuft immer). Keinen zweiten Server auf 8789 starten und nichts per `file://` öffnen.
- `shopify theme dev`: Nach einem neuen Schema-Setting den Server neu starten, sonst ist der Wert `nil`. Sections vom `type: "apps"` rendern dort nicht.
- Nach Änderungen am Produkt-Template: Warenkorb und Variantenwahl testen, Konsole ohne Fehler, Desktop bei 1280 px und Mobil bei 375 px.

## Wo was steht

| Frage | Datei |
|---|---|
| Welche URL rendert welches Template und welche Section? | `docs/live-pages-map.md` |
| Aufbau und Section-Reihenfolge der PDPs | `docs/pdp-system.md` |
| Felder beim Anlegen eines neuen Produkts | `docs/lt-pdp-template-notes.md` |
| Messaging im Detail | `docs/conversion-messaging.md` |
| Was ist live, was wartet auf Push? | `docs/theme-status.md` |
| Geprüfte Bau-Muster | `_examples/README.md` |

Alles andere in `docs/` sind Arbeitsstände (Entwürfe, Analysen, Vorschauen) zu einem Datum. Die frühere Regelsammlung (`AGENTS.md`-Langfassung, `shopify/AGENTS.md`, `.cursor/rules/`) liegt seit 28.10.2026 in `docs/archive/2026-10-28_regeln-zusammengefuehrt/`.
