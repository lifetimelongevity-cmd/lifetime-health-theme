---
status: living
last_review: 2026-07-29
canonical_for: pdp-section-system und live-reihenfolge
---

# PDP-System (Ist-Zustand)

Diese Datei beschreibt, welche Sections die Live-PDPs tatsächlich rendern und welche
Rolle jede Section im Kaufprozess übernimmt. Sie ist aus `templates/product.nmn-pulver.json`,
`templates/product.age-dna-test.json` und seit dem 2026-07-29 `templates/product.02_spermidin.json`
abgeleitet und per `curl` gegen die Live-Seiten geprüft. Wer eine PDP umbaut, prüft zuerst hier
die Reihenfolge, dann das Template, niemals eine ältere Beschreibung.

## Journey-Modell

Das Modell aus `.cursor/rules/pdp-architecture.mdc` gilt unverändert: Aufmerksamkeit,
Verständnis, persönliche Relevanz, Vertrauen, Risikoreduktion, Handlung. Eine Section bedient
genau eine Stufe. Die Reihenfolge der Stufen ist nicht die Reihenfolge der Sections: beide PDPs
starten mit Aufmerksamkeit und Handlung gleichzeitig (Hero plus Buybox plus Sticky-ATC) und
staffeln danach Verständnis, Vertrauen und Risikoreduktion, bis der Close die Handlung
wiederholt.

## PDP NMN (`/products/lifetime-nmn`)

Template: `templates/product.nmn-pulver.json` (Suffix `nmn-pulver`, nicht aus dem Slug ableitbar).
11 Einträge in `order`, davon 1 deaktiviert.

| # | Section-Key | Typ (`sections/*.liquid`) | Stufe | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Aufmerksamkeit + Handlung | Hero, Größenwahl, Abo/Einmal-Buybox, Trust-Zeilen, Sticky-ATC |
| 2 | `logo_garden` | `crs-logo-garden` | Vertrauen | Medienlogos (RTL, KStA, SWR1, SAT.1, maxima) |
| 3 | `novel_food` | `crs-novel-food` | Risikoreduktion | Novel-Food-Status, Stand des EU-Verfahrens, Forschungszweck |
| 4 | `feature_grid` | `crs-feature-grid` | Verständnis | Vier Unterscheidungsmerkmale (Rohstoff, GMP, wissenschaftliche Leitung, Firmensitz) |
| 5 | `nmn_marktbefund` | `crs-metrics-row` | Vertrauen | Marktbefund NUS/GeroScience 2024 plus eigener Messwert |
| 6 | `nmn_laborwerte` | `lt-pdp-laborwerte` | Vertrauen | Chargen-Messwerte, Labor, Akkreditierung, Prüfbericht-Link |
| 7 | `lt_comparison_table` | `lt-comparison-table` | Vertrauen | Abgrenzung LIFETIME gegen typische Anbieter, sechs Zeilen |
| 8 | `customer_reviews_nmn` | `crs-customer-reviews` | Vertrauen | 8 Reviews plus 5 Themen-Pills, sichtbar 4 |
| 9 | `risk_free_close` | `crs-risk-free-close` | Handlung | Abo-Close mit vier Trust-Zeilen und Preiszeile |
| 10 | `faq_accordion` | `crs-faq-accordion` | Risikoreduktion | 9 Fragen, Novel Food an Position 1 |
| 11 | `main_product_hidden` | `main-product` | keine | `"disabled": true`, rendert nicht (siehe unten) |

Auf dieser PDP trägt keine Section die Stufe „persönliche Relevanz". Das ist der einzige
strukturelle Unterschied zur AGE&DNA-PDP, der nicht aus dem Produkt folgt.

## PDP AGE&DNA-Test (`/products/lifetime-age-dna`)

Template: `templates/product.age-dna-test.json`. 14 Einträge in `order`, davon 1 deaktiviert.

| # | Section-Key | Typ (`sections/*.liquid`) | Stufe | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Aufmerksamkeit + Handlung | Hero, Einmalkauf-Buybox (kein Abo-Toggle), Trust-Zeilen, Sticky-ATC |
| 2 | `logo_garden` | `crs-logo-garden` | Vertrauen | Medienlogos, kompakter gesetzt als auf der NMN-PDP |
| 3 | `process_steps` | `lt-pdp-process-steps` | Verständnis | Ablauf in 4 Schritten, Kit bis Ergebnis |
| 4 | `metrics_row` | `crs-metrics-row` | Verständnis | Umfang in Zahlen (187 DNA-Reports, 10 CpG-Gene, 5 Epigenetik-Reports) |
| 5 | `feature_grid` | `crs-feature-grid` | Verständnis | 6 Leistungskarten inklusive App und AI Health Coach |
| 6 | `report_preview` | `lt-pdp-report-preview` | Persönliche Relevanz | App-Visual mit 4 Callouts, Retest-Hinweis |
| 7 | `expert_quotes` | `crs-expert-quotes` | Vertrauen | Limmroth, Horvath, Sinclair mit Quellenangabe |
| 8 | `comparison_table` | `lt-comparison-table` | Vertrauen | Abgrenzung gegen Standard-Blutbild und Consumer-Tests |
| 9 | `customer_reviews_test` | `crs-customer-reviews` | Vertrauen | 8 Reviews plus 5 Themen-Pills, sichtbar 4 |
| 10 | `ideal_candidate` | `lt-pdp-ideal-candidate` | Persönliche Relevanz | 5 Passungs-Profile plus 2 Ausschlüsse |
| 11 | `faq_accordion` | `crs-faq-accordion` | Risikoreduktion | 11 Fragen (Probe, Datenschutz, Diagnose-Abgrenzung, Retest) |
| 12 | `risk_free_close` | `crs-risk-free-close` | Handlung | Close mit sechs Trust-Zeilen |
| 13 | `loox_reviews` | `apps` | Vertrauen | Loox-Widget, bewusst hinter dem Close |
| 14 | `main_product_hidden` | `main-product` | keine | `"disabled": true`, rendert nicht |

Unterschied in der Schlusslogik: NMN schließt mit `risk_free_close` vor der FAQ, AGE&DNA stellt
die FAQ davor und hängt das Loox-Widget hinter den Close. Wer eine der beiden PDPs angleicht,
sollte das bewusst tun, nicht nebenbei.

## PDP Spermidin (`/products/spermidin-kapseln`)

Template: `templates/product.02_spermidin.json` (Suffix `02_spermidin`). Seit dem 2026-07-29 der
**Referenzfall für Supplements** und die Vorlage für die Wellen W1–W3. 10 Einträge in `order`,
davon 1 deaktiviert.

| # | Section-Key | Typ (`sections/*.liquid`) | Stufe | Rolle |
|---|---|---|---|---|
| 1 | `main` | `lt-pdp-hero` | Aufmerksamkeit + Handlung | Hero, Abo/Einmal-Buybox, vier Trust-Zeilen, Sticky-ATC. `trust_4` trägt den Allergenhinweis mit Popup |
| 2 | `logo_garden` | `crs-logo-garden` | Vertrauen | Medienlogos wie NMN |
| 3 | `feature_grid` | `crs-feature-grid` | Verständnis | Vier Unterscheidungsmerkmale, zweispaltig |
| 4 | `wirkprinzip` | `lt-pdp-wirkprinzip` | Verständnis | Drei Stufen: Vorkommen, Rohstoff, Standardisierung. Claimfrei, ohne Bild |
| 5 | `produktfakten` | `lt-pdp-produktfakten` | Risikoreduktion | LMIV/NemV-Pflichtangaben dreispaltig: Gehalt, Zutaten, Verzehrempfehlung |
| 6 | `comparison_table` | `lt-comparison-table` | Vertrauen | Abgrenzung gegen typische Anbieter, sechs Zeilen |
| 7 | `1721223701af92f7b4` | `apps` | Vertrauen | Loox-Widget, rendert clientseitig |
| 8 | `risk_free_close` | `crs-risk-free-close` | Handlung | Abo-Close mit vier Trust-Zeilen |
| 9 | `faq_accordion` | `crs-faq-accordion` | Risikoreduktion | 10 Fragen, Rohstoff/Allergen/Zielgruppe auf den Positionen 1 bis 3 |
| 10 | `main_product_hidden` | `main-product` | keine | `"disabled": true`, rendert nicht |

Die Kette folgt der NMN-Schlusslogik (Close vor FAQ), nicht der von AGE&DNA. Sie ist bewusst
kürzer als beide Nordsterne: die vier optionalen Beweis-Slots (`lt-pdp-laborwerte`,
`crs-metrics-row`, `crs-expert-quotes`, `crs-customer-reviews`) fallen an Gate G3 aus, weil für
Supplements weder Prüfbericht noch belegte Zahl noch produktbezogenes Limmroth-Statement noch
genug substanzielle Loox-Bewertungen existieren. Die Begründung je Produkt steht in
`pdp-supplement-rollout.md`.

Die Loox-Section hat keine Farb-Settings und erbt den Body-Hintergrund `#f7f7f4`. Sie steht
deshalb an Position 7, wo die Flächen-Alternation ohnehin `#f7f7f4` verlangt. Verschiebt man
sie, kippt der Rhythmus.

## Konvention `main_product_hidden`

Beide Templates führen die Theme-Section `main-product` unter dem Key `main_product_hidden`
mit `"disabled": true`. Sie rendert nicht, die Live-Seiten enthalten keine
`shopify-section-...__main_product_hidden`-ID. Der komplette Kaufpfad (Preis, Varianten,
Warenkorb-Form) läuft über `lt-pdp-hero`.

- Der Eintrag bleibt als Parkplatz für Produkt-Blöcke stehen (Rating-Snippet, Titel, bei NMN
  zusätzlich der Appstle-App-Block und `buy_buttons` mit abgeschalteter Optik).
- Nicht löschen, ohne vorher zu prüfen, ob ein App-Block darin noch gebraucht wird.
- Dieselbe Konvention gilt in `templates/product.json` und
  `templates/product.lifetime-age-folgetest.json`. Die älteren Supplement-Templates
  (`product.01_tmg.json` bis `product.12_nad-liposomal-2.json`) folgen ihr **nicht**, dort ist
  `main_product_hidden` aktiv und rendert.

## Preisquelle (häufige Fehlannahme)

`lt-pdp-hero` liest die Preise seit dem 2026-07-18 immer aus der echten Variante
(`lt_variant_1.price` beziehungsweise die gewählte Größe), nicht aus den Settings. Die Settings
`pill_1_once_price_cents` und `pill_1_sub_price_cents` stehen zwar noch im Schema und in allen
Templates, werden aber im Liquid nirgends mehr gelesen. Beispiel NMN: Template sagt `3990`, live
ausgeliefert wird `data-once-price="3390"` aus der 30-g-Variante. Preise also im Shopify-Produkt
ändern, nicht im Template. Die Versandschwelle 49 € ist dagegen wirklich hardcodiert in
`sections/lt-pdp-hero.liquid` (SSR und JS, `>= 4900`).

## Buybox- und Heading-Logik (gilt für beide PDPs)

- `show_subscription_toggle` steuert die Abo-Auswahl. NMN: `true`, die Abo-Karte ist
  vorausgewählt. AGE&DNA: `false`, es rendert nur die Einmalkauf-Karte, ohne ODER-Trenner und
  ohne Appstle-Widget.
- `show_size_selector` greift nur, wenn das Produkt mehr als eine Variante hat. NMN: `true`
  (30/60/90 g), Default ist die kleinste Gramm-Variante, ein `?variant=`-Deep-Link wählt die
  Größe vor. AGE&DNA: nicht gesetzt.
- Trust-Zeilen `trust_1` bis `trust_4` sind frei belegbar, `trust_4` ist optional und kann ein
  Popup öffnen (`trust_4_popup_title` / `trust_4_popup_body`, auf der NMN-PDP der
  Novel-Food-Hinweis).
- In `crs-risk-free-close` ist `price_fallback` nur der serverseitige Platzhalter. Ein Skript in
  der Section überschreibt die Zeile mit dem aktuellen Preis aus der Buybox, sobald eine
  Abo-Karte auf der Seite existiert.
- In allen `crs-*`-Sections blendet der Wert `__none__` ein Feld aus (`kicker`, `subheading`,
  `intro`). Leerstring ist nicht dasselbe, siehe `docs/section-heading-stack.md`.

## Prüfmethode

Reihenfolge aus dem Template neu ableiten (der Kommentar-Header vor dem JSON muss weg):

```bash
python3 - <<'PY'
import re, json, pathlib
for f in ['templates/product.nmn-pulver.json', 'templates/product.age-dna-test.json']:
    t = json.loads(re.sub(r'^\s*/\*.*?\*/', '', pathlib.Path(f).read_text(), flags=re.S))
    print('==', f, len(t['order']), 'Sections')
    for i, key in enumerate(t['order'], 1):
        s = t['sections'][key]
        print(f"{i:2} {key:24} {s['type']:24} {'DISABLED' if s.get('disabled') else ''}")
PY
```

Gegen die Live-Seite prüfen (zeigt die tatsächlich gerenderten Sections in Reihenfolge):

```bash
curl -sS https://www.lifetime-health.de/products/lifetime-nmn \
  | grep -o 'id="shopify-section-[a-zA-Z_0-9-]*"'
```

Template-Zuordnung nie aus dem Dateinamen raten, sondern am Produkt bestätigen
(Shopify-MCP oder Admin-GraphQL):

```graphql
query { product(id: "gid://shopify/Product/...") { handle templateSuffix } }
```

## Neue PDP anlegen

Feldweise Checkliste, Duplizier-Vorlage und Push-Workflow stehen in
`docs/lt-pdp-template-notes.md`. Plattformgrenzen: maximal 25 Sections im `order`-Array,
Schema-`name` maximal 25 Zeichen.
