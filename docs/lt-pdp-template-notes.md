---
status: living
last_review: 2026-07-28
canonical_for: neues-produkt-pdp-onboarding
---

# Neue PDP anlegen (Template-Duplikat)

Wie man für ein neues Produkt eine PDP aufsetzt, die dem Live-Stand entspricht. Die
Section-Reihenfolge und die Rollen der Sections stehen in `docs/pdp-system.md`, hier steht nur,
was pro Produkt anzufassen ist.

## Welche Vorlage kopieren

| Fall | Vorlage |
|---|---|
| Supplement oder Pulver mit Abo, mit oder ohne Größenvarianten | `templates/product.nmn-pulver.json` |
| Einmalkauf ohne Abo (Diagnostik, Test, Kit) | `templates/product.age-dna-test.json` |

Die älteren Supplement-Templates (`product.01_tmg.json` bis `product.12_nad-liposomal-2.json`)
sind **kein** Muster: sie fahren einen älteren, kürzeren Stack und rendern `main-product` aktiv.

Sections, die nicht zum Produkt passen, aus `sections` **und** `order` löschen, sonst bleibt eine
Waise im JSON. Besonders `novel_food` (`crs-novel-food`) und `nmn_laborwerte`
(`lt-pdp-laborwerte`) sind NMN-spezifisch: Rechtsstatus und Chargendaten dürfen nie unverändert
in eine andere PDP wandern.

## Pro Produkt anzupassen

`main` (`lt-pdp-hero`), die meiste Arbeit:

- Kopf: `tagline`, `hero_headline`, `hero_bullet_1..3`, `show_badge` / `badge_text`
- Kaufoptionen: `pill_1_label`, `pill_1_quantity`, `sub_discount_percent` (steuert nur den
  sichtbaren Spar-Badge), `show_subscription_toggle`, `show_size_selector`,
  `show_price_standalone`
- Abo-Karte: `bb_sub1_title`, `bb_sub1_subline`, `bb_once_title`, `bb_once_subline`,
  `bb_or_label`, `bb_intro`, `bb_benefit_1..4`, `bb_sub_flag`, `cancel_popup_title` /
  `cancel_popup_body`
- Reichweite: `bb_supply_days_fallback` (greift nur, wenn die Variante kein
  `custom.supply_days`-Metafeld hat)
- Trust: `trust_1..trust_4` plus `trust_1_icon_name..trust_4_icon_name`, optional
  `trust_4_popup_title` / `trust_4_popup_body`
- Autorität: `show_doctor_badge`, `founder_image` oder `founder_image_url`, `founder_name`,
  `founder_title`, `founder_creds`
- Garantie: `show_guarantee_badge`, `guarantee_text`, `guarantee_popup_title` /
  `guarantee_popup_body`
- Belege: `coa_url`, `coa_caption`
- Value Stack (nur wenn `show_value_stack` an): `stack_header`, `show_stack_product_line`,
  `stack_product_sub`, `stack_guide_*`, `stack_bonus_*`, `stack_extra_*`, `stack_total_label`,
  `stack_old_total`, `stack_pay_today_label`
- Sticky: `show_sticky_atc`, `sticky_show_compare_price`, `sticky_atc_subline`
- Kampagne, optional: `promo_banner_*` inklusive `promo_banner_deadline` (Countdown blendet sich
  nach Ablauf selbst aus, trotzdem aufräumen)
- **Nicht** anfassen: `pill_1_once_price_cents`, `pill_1_sub_price_cents`. Diese Settings stehen
  noch im Schema, werden aber im Liquid nicht mehr gelesen. Preise laufen über die Varianten.

Übrige Sections:

| Section | Was pro Produkt zu ändern ist |
|---|---|
| `crs-logo-garden` | in der Regel nichts (gleiche Medienlogos) |
| `crs-feature-grid` | `feature`-Blöcke (`title`, `description`), `heading`, `subheading`, `cta_label`, `cta_url`, `columns`, `image` / `image_url` / `image_alt` |
| `crs-metrics-row` | `metric`-Blöcke (`number`, `description`, `source`), `heading`, `subheading`, `intro`, `note`, `layout_variant` |
| `lt-comparison-table` | `column`-Blöcke (`column_heading`, `first_row` bis `sixth_row` plus Icons), `headline`, `subheading`, `first_row_heading` bis `sixth_row_heading`; optional `active_column_index`, `recommended_badge_text`, `group_1_label`, `group_2_label`, `group_split_after` |
| `crs-customer-reviews` | `pill`-Blöcke (`label`), `review`-Blöcke (`rating`, `text`, `name`, `avatar`, `verified`, `date`), `heading`, `visible_count` |
| `crs-risk-free-close` | `badge_text`, `headline`, `subheading`, `intro`, `price_fallback`, `cta_label`, `image_alt`, `trust_line`-Blöcke |
| `crs-faq-accordion` | `item`-Blöcke (`question`, `answer`), `heading` |
| `lt-pdp-laborwerte` (nur NMN-Typ) | `measurement`-Blöcke, `value_primary*`, `value_secondary*`, `lab_name`, `lab_short`, `lab_accreditation`, `expert`, `batch`, `tested_on`, `method`, `report_image`, `report_url`, `details_note` |
| `lt-pdp-process-steps` (Test-Typ) | `step`-Blöcke (`step_number`, `step_title`, `step_body`, `show_callout`, `callout_text`), `heading`, `cta_url` |
| `lt-pdp-report-preview` (Test-Typ) | `callout`-Blöcke (`callout_label`, `callout_body`, `position_x`, `position_y`), `app_visual`, `retest_note`, `format_note` |
| `crs-expert-quotes` (Test-Typ) | `expert`-Blöcke (`quote`, `photo`, `name`, `title`, `source`) |
| `lt-pdp-ideal-candidate` (Test-Typ) | `candidate`- und `exclusion`-Blöcke, `show_exclusion_block`, `exclusion_heading` |
| `main_product_hidden` | Block-IDs umbenennen, Appstle-App-Block nur bei Abo-Produkten behalten, `"disabled": true` stehen lassen |

## Workflow

1. Datei kopieren: `cp templates/product.nmn-pulver.json templates/product.<suffix>.json`.
   Der Suffix ist frei wählbar, aber prüfen, ob er schon vergeben ist.
2. Copy und Blöcke ersetzen, nicht passende Sections aus `sections` und `order` entfernen.
3. Pushen: `shopify theme push --only templates/product.<suffix>.json`. Neue Dateien werden von
   reinen Theme-Manager-Pushes gelegentlich übersehen, deshalb hier bewusst per CLI.
4. Im Shopify-Admin am Produkt das Theme-Template zuweisen (Produktseite, Bereich
   „Theme-Vorlage").
5. Zuordnung bestätigen, nicht aus dem Dateinamen schließen:

   ```graphql
   query { product(id: "gid://shopify/Product/...") { handle templateSuffix } }
   ```

6. Live gegenprüfen:

   ```bash
   curl -sS -o /dev/null -w "%{http_code}\n" https://www.lifetime-health.de/products/<slug>
   curl -sS https://www.lifetime-health.de/products/<slug> \
     | grep -o 'id="shopify-section-[a-zA-Z_0-9-]*"'
   ```

   Die Liste muss dem `order`-Array entsprechen, abzüglich der deaktivierten Einträge.
7. Preise, Varianten und Abo-Pläne im Produkt pflegen, nicht im Template.

## Stolpersteine

- **Slug ist nicht Suffix.** `/products/lifetime-nmn` rendert `product.nmn-pulver.json`. Vor
  jedem Edit `templateSuffix` am Produkt prüfen.
- **Preise stehen nicht im Template.** Siehe oben, `pill_1_*_price_cents` ist wirkungslos.
- **Versandschwelle 49 € ist hardcodiert** in `sections/lt-pdp-hero.liquid` (serverseitig und im
  JS, jeweils `>= 4900`). Es gibt dafür kein Setting.
- **Plattformgrenzen:** maximal 25 Sections im `order`-Array, Schema-`name` maximal 25 Zeichen,
  `default` im Schema nie leerer String.
- **`__none__` statt Leerstring**, um `kicker`, `subheading` oder `intro` in `crs-*`-Sections
  auszublenden.
- **Loox-Rating** erscheint nur, wenn das Produkt die Metafelder `loox.avg_rating` und
  `loox.num_reviews` trägt. `show_rating: true` allein reicht nicht.
- **Theme-Manager committet und pusht während der Session.** Template-Dateien zuletzt schreiben,
  damit sie nicht mit halbem Stand rausgehen.
