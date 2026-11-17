---
status: living
last_review: 2026-11-17
canonical_for: neues-produkt-pdp-onboarding
supersedes: [archive/2026-11-17_pdp-supplement-juli-kette/]
---

# Neue PDP anlegen

Was beim Anlegen einer neuen Produktseite zu tun ist. Welche Section-Kette welche PDP fährt und welche Schalter es gibt, steht in `docs/pdp-system.md`. Der Ablauf in drei Schritten (Ansehen, HTML-Entwurf, Template) samt fertigem Prompt steht in `docs/pdp-startprompt.md`.

## Welche Vorlage kopieren

| Fall | Vorlage |
|---|---|
| Nahrungsergänzungsmittel mit Abo | `templates/product.01_tmg.json` (Supplement-Kette, Muster NAD⁺) |
| Nahrungsergänzungsmittel ohne Abo | `templates/product.07_d3k2.json` (`show_price_standalone`) |
| NMN oder ein Produkt mit Forschungs-Frame | `templates/product.nmn-pulver.json` |
| Diagnostik, Test, Kit | `templates/product.age-dna-test.json` |

`product.nmn-pulver.json` ist als Vorlage für ein Nahrungsergänzungsmittel falsch: Es hat den Forschungs-Frame und bewusst keine Verzehrempfehlung, die nach NemV Pflicht ist. Die Juli-Vorlagen (`_examples/templates/product.supplement-*.json`, Kurz- und Langform mit `crs-feature-grid`, `crs-risk-free-close` usw.) liegen seit 17.11.2026 in `docs/archive/2026-11-17_pdp-supplement-juli-kette/`.

## Workflow

1. Vorlage kopieren: `cp templates/product.01_tmg.json templates/product.<suffix>.json`. Prüfen, ob der Suffix schon vergeben ist.
2. Copy, Bilder und Blöcke ersetzen. Neue Settings in geteilten Sections stehen per Default auf aus.
3. Pushen nur nach BJs Ansage. Neue Dateien rutschen bei reinen Theme-Manager-Pushes gelegentlich durch, deshalb dann gezielt `shopify theme push --only templates/product.<suffix>.json`.
4. Im Shopify-Admin am Produkt die Theme-Vorlage zuweisen und bestätigen: `product(id) { handle templateSuffix }`.
5. Live gegenprüfen: Die gerenderten Sections (`grep -o 'id="shopify-section-template[^"]*"'`) müssen dem `order` entsprechen, abzüglich der deaktivierten.
6. Preise, Varianten und Abo-Pläne im Produkt pflegen, nicht im Template.

## Bild-Gates vor dem Livegang

1. **Keine Aussage in Pixeln.** Kein Bild mit eingebrannten Claims. Was gesagt wird, sagt die Copy, das Bild zeigt das Produkt. Jedes Produktmedium einmal öffnen und lesen, ein Template-Audit sieht nicht in Bilder hinein.
2. **Siegel gegen die Reinzeichnung prüfen.** Siegelname und jede Etikettenaussage auf jedem Render müssen mit dem Druck-Etikett übereinstimmen.
3. **Eingebrannter Text unter 12 px** bei mobiler Breite ist unzulässig. Ausnahme ist die Etikett-Ansicht, wenn dieselben Daten als Text in `lt-pdp-produktfakten` stehen.

## Stolpersteine

- **Slug ist nicht Suffix.** `/products/lifetime-nmn` rendert `product.nmn-pulver.json`.
- **Preise stehen nicht im Template.** `pill_1_*_price_cents` ist wirkungslos.
- **Versandgrenze** kommt aus `snippets/lt-shipping-rule.liquid` (Theme-Einstellungen je Land), nicht aus dem Template.
- **Loox-Rating** erscheint nur mit den Metafeldern `loox.avg_rating` und `loox.num_reviews`.
- **Der Theme Manager committet und pusht während der Sitzung.** Template-Dateien zuletzt schreiben.
- Plattformgrenzen stehen in `CLAUDE.md`.
