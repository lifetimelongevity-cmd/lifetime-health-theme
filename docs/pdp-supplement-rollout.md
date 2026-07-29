---
status: living
last_review: 2026-07-29
canonical_for: pdp-rollout-hero-matrix-und-gates
---

# PDP-Rollout Supplements: Hero-Matrix und Gate-Liste

Zwei Artefakte aus §9 Phase 3 von `briefing-pdp-refit.md`, erarbeitet am Piloten
`product.02_spermidin.json` (live seit 2026-07-29).

Beide sind gemessen, nicht geschätzt. Die Messbasis sind die zehn Alt-Supplement-
Templates der Wellen W1–W3: `01_tmg`, `03_caakg`, `04_fisetin`, `05_kreatin`,
`06_resveratrol`, `07_d3k2`, `08_schlafspray`, `09_astafit`, `10_hyaluron`,
`11_b-komplex`. NAD⁺ (`12_nad-liposomal-2`) ist Phase 4 und zählt hier nicht mit,
es setzt nur 16 der 112 Hero-Settings.

---

## Teil 1: Hero-Setting-Matrix

### Korrektur am Briefing

Das Briefing sagt, „die rund 65 Keys sind über alle Supplement-Templates
identisch, also einmal als Tabelle befüllbar". Gemessen stimmt das nicht.

`sections/lt-pdp-hero.liquid` hat **112** Settings im Schema. Davon sind über alle
zehn Alt-Templates hinweg **50 identisch gesetzt**, **25 produktindividuell** und
**37 auf keinem einzigen Template gesetzt**, also still aus dem Schema geerbt.

Die 37 sind der eigentliche Befund: Das Phase-0-Problem, das an den beiden
Nordsternen behoben wurde, besteht auf den zehn Alt-PDPs unverändert fort. Darunter
`trust_4_popup_title` mit dem NMN-Default „Warum Forschungs- und Analysezwecke?"
und die kompletten `promo_banner_*`- und `quiz_promo_*`-Blöcke.

### Block A: einmal befüllen, für alle gleich (34 Keys)

Diese Werte stehen auf allen zehn Templates identisch **und** der Pilot bestätigt
sie. Sie werden aus `_examples/templates/product.supplement-reference.json`
unverändert übernommen.

| Key | Wert |
|---|---|
| `color_bg` / `color_card_bg` / `color_text` | `#f7f7f4` / `#f2f1ed` / `#26251e` |
| `bb_intro` / `bb_sub1_subline` | leer |
| `bb_once_title` | `Einmaliger Kauf` |
| `bb_or_label` | `ODER` |
| `founder_name` | `Prof. Dr. med. Volker Limmroth` |
| `founder_title` | `Chefarzt Neurologie · Chief Scientific Officer LIFETIME` |
| `founder_image_url` | `…/volker-podcast.png?v=1747751023` |
| `guarantee_text` / `guarantee_popup_title` | `30-Tage Geld-zurück-Garantie` |
| `pill_1_quantity` | `1` |
| `show_doctor_badge` / `show_guarantee_badge` / `show_rating` | `true` |
| `show_price_standalone` / `show_subscription_toggle` | `true` |
| `show_sticky_atc` / `sticky_show_compare_price` | `true` |
| `show_stack_product_line` | `true` |
| `show_value_stack` | `false` |
| `stack_header` | `Was du heute bekommst` |
| `stack_pay_today_label` | `Du zahlst heute` |
| `stack_guide_price` | `Gratis` |
| `stack_extra_price` | `Enthalten` |
| `stack_extra_title` / `stack_extra_sub` / `stack_old_total` | leer |
| `stack_bonus_value_cents` | `0` |
| `sub_discount_percent` | `10` (jedes Produkt trotzdem gegen Appstle prüfen) |
| `trust_1` | `Versandkostenfrei ab 49 €` |
| `trust_2` | `Lieferung in 2–3 Werktagen` |
| `trust_3` | `Im Abo 10 % sparen · ohne Bindung` |

### Block B: uniform gesetzt, aber im Piloten bewusst geändert (13 Keys)

Diese standen auf allen zehn Templates gleich, waren aber gleich **falsch**. Der
Pilot weicht ab, und die Wellen folgen dem Piloten, nicht dem Bestand.

| Key | Bestand auf allen 10 | Pilot | Grund |
|---|---|---|---|
| `show_badge` | `true` | `false` | Badge wiederholte, was schon in der Headline steht. Claim-Stacking. |
| `show_benefits_icons` | `true` | `false` | Bullets + Trust-Zeilen + Benefit-Icons sind drei Ebenen für dieselbe Aussage. NMN-Nordstern hat es aus. |
| `founder_endorsed` | `Wissenschaftlich entwickelt` | leer | Arzt-Badge trägt sich ohne Vorspann. |
| `bb_benefit_1` | `Gratis Versand bei Abo-Lieferungen` | `Jederzeit kündbar, auch nach der ersten Lieferung` | Reihenfolge nach Einwandstärke, wie NMN. |
| `bb_benefit_2` | `Jederzeit kündbar oder pausieren` | `Erste Lieferung mit 30-Tage-Geld-zurück-Garantie` | dito |
| `bb_benefit_3` | `Inkl. Longevity 101 als PDF` | `Gratisversand bei jeder Abo-Lieferung` | dito |
| `bb_benefit_4` | nicht gesetzt | `Inkl. Longevity 101 als PDF` | Der Perk bleibt, er rückt nur auf Position 4. |
| `bb_once_subline` | leer | `Versandkostenfrei ab 49 €` | Die Einmalkauf-Karte trug bisher keine Versandinfo. |
| `guarantee_popup_body` | „Wir bieten allen Erstkund*innen…" | Du-Form, ohne Gendersternchen | Tonalität §5.2. |
| `stack_guide_title` / `stack_guide_sub` / `stack_guide_value_cents` | `Longevity-Protokoll PDF` / `Wann & womit · Dr. Limmroth` / `2990` | leer / leer / `0` | `show_value_stack` ist `false`, die Werte rendern nie. Ein Preisschild von 29,90 € für ein Gratis-PDF sollte auch nicht latent im Template stehen. |
| `stack_bonus_title` / `stack_bonus_sub` / `stack_bonus_price` | `10 % Rabatt auf den AGE & DNA-Test` … | leer | dito. Der Quiz-Rabatt hat eine eigene Mechanik (`QUIZ-ALTER-10`) und gehört nicht als toter Wert in jedes Supplement-Template. |
| `stack_total_label` | `Gesamtwert` | leer | dito |

**Das Longevity-101-PDF existiert.** `ebook-lifetime-longevity-101.pdf`, 3,1 MB,
seit 2024-07-04 im Filestore. Der Perk ist echt und wurde deshalb nicht gestrichen,
sondern verschoben.

### Block C: produktindividuell, je Seite auszufüllen (25 Keys)

| Key | Korridor / Quelle |
|---|---|
| `hero_headline` | 20–35 Zeichen, siehe `pdp-copy-deck.md` |
| `tagline` | 25–45, darf nicht dasselbe sagen wie die Headline |
| `hero_bullet_1..3` | 15–35, Menge / Rohstoff / Packung |
| `benefit_1..3_text` | nur relevant wenn `show_benefits_icons` an, sonst leer setzen |
| `badge_text` | nur relevant wenn `show_badge` an |
| `pill_1_label` | z. B. `1 Dose · 60 Kapseln` |
| `bb_sub1_title` | `Im Abo` (Nordstern) oder `Monatlich` |
| `bb_supply_days_fallback` | echte Reichweite, mit Rechnung. Spermidin: 60 Kapseln ÷ 2/Tag = 30 |
| `sub_discount_percent` | echter Appstle-Wert, per `sellingPlanGroups.pricingPolicies` prüfen |
| `stack_product_sub` | nur relevant wenn `show_value_stack` an |
| `trust_4` + `trust_4_icon_name` + `trust_4_popup_title` + `trust_4_popup_body` | optional. Beim Piloten trägt `trust_4` den Allergenhinweis an den Kaufmoment. |
| `coa_url` / `coa_purity_label` / `coa_link_label` / `coa_caption` | nur mit echtem Prüfbericht, siehe Gate G3b |

### Block D: die 37 stillen Erben

Auf keinem der zehn Templates gesetzt. Ab sofort in jedem Template explizit
eintragen, auch wenn sie leer bleiben (Briefing §7.5).

```
product
show_promo_banner  promo_banner_tag  promo_banner_title  promo_banner_note
promo_banner_timer_label  promo_banner_deadline
quiz_promo_enable  quiz_promo_tag  quiz_promo_title  quiz_promo_note
quiz_promo_timer_label  quiz_promo_deadline
hero_bullet_1_icon  hero_bullet_2_icon  hero_bullet_3_icon
benefit_1_icon  benefit_2_icon  benefit_3_icon
coa_url  coa_purity_label  coa_link_label  coa_caption
bb_benefit_4  bb_sub_flag  bb_perk_1_icon  bb_perk_2_icon  bb_perk_3_icon  bb_perk_4_icon
cancel_popup_title  cancel_popup_body
show_size_selector
trust_1_icon  trust_2_icon  trust_3_icon  trust_4_icon
trust_1_icon_name  trust_2_icon_name  trust_3_icon_name
trust_4  trust_4_icon  trust_4_icon_name  trust_4_popup_title  trust_4_popup_body
guarantee_badge_icon  founder_image  founder_creds
stack_guide_image  stack_bonus_image
```

Die gefährlichsten drei, weil sie Text tragen statt leer zu sein:

| Key | geerbter Default | Wirkung |
|---|---|---|
| `trust_4_popup_title` | „Warum Forschungs- und Analysezwecke?" | NMN-Rechtsrahmen auf einem Nahrungsergänzungsmittel |
| `promo_banner_title` | „15 % Rabatt auf NMN-Pulver" | fremdes Produkt, greift sobald jemand den Banner einschaltet |
| `quiz_promo_title` | „10 % auf deinen Test" | Rabattversprechen ohne hinterlegte Mechanik |

Alle drei rendern heute nicht, weil der jeweilige Schalter aus ist. Sie sind
scharf, sobald jemand im Theme-Editor den Schalter umlegt.

### Zwei tote Settings, die NICHT ins Template gehören

`pill_1_once_price_cents` und `pill_1_sub_price_cents` stehen im Schema und in
allen zehn Alt-Templates, werden im Liquid aber seit dem 18.07. nirgends gelesen.
Der Preis kommt aus der Variante (`lt-pdp-hero.liquid:265-266`), der Abo-Preis aus
`price × 0.90`. Beim Umbau ersatzlos entfernen. `sticky_atc_subline` steht in zehn
Templates, aber weder im Schema noch im Liquid, ebenfalls entfernen.

---

## Teil 2: Gate-Liste für die optionalen Beweis-Slots

Gate G3 aus dem Briefing, je Produkt beantwortet. Ein Gate ist eine Bedingung,
kein Ermessensspielraum. Hält es nicht, bleibt die Section weg.

### Die vier Gates

| Slot | Bedingung |
|---|---|
| **G3a** `crs-customer-reviews` | mindestens 6 Loox-Bewertungen mit substanziellem Produkttext (nicht „Kein Kommentar", nicht reine Liefer-/Servicekommentare) **und** keine Wirkaussage im übernommenen Text |
| **G3b** `lt-pdp-laborwerte` | existierender Prüfbericht als PDF im Filestore |
| **G3c** `crs-metrics-row` | je Zahl eine benennbare Quelle mit Datum |
| **G3d** `crs-expert-quotes` | echtes, produktbezogenes Limmroth-Statement |

### G3a im Detail: die Zahl allein reicht nicht

Der Pilot hat gezeigt, dass `loox.num_reviews` als Gate-Kriterium untauglich ist.
Spermidin hat neun Bewertungen bei 4,9 Sternen. Davon tragen vier den Text „Kein
Kommentar", zwei sind reine Lieferkommentare, einer ist „Vielen Dank!". Übrig
bleiben zwei mit Produktbezug. Eine Section, die auf acht Karten ausgelegt ist,
lässt sich damit nicht ehrlich füllen.

Die Volltexte stehen im Metafeld `loox.reviews` und sind damit auswertbar, ohne
die Loox-Oberfläche zu öffnen.

| Produkt | Bewertungen | mit Text | davon Liefer-/Service | mit Produktbezug | **G3a** |
|---|---|---|---|---|---|
| NMN (Nordstern) | 230 | ~60 | viele | viele | erfüllt, umgesetzt |
| AGE&DNA (Nordstern) | 111 | ~18 | einige | viele | erfüllt, offen |
| NAD⁺ | 18 | 15 | 3 | 12 | **erfüllt**, Phase 4 |
| CaAKG | 10 | 5 | 2 | 3 | nicht erfüllt |
| Spermidin | 9 | 5 | 2 | 2 | nicht erfüllt |
| TMG | 7 | 3 | 2 | 1 | nicht erfüllt |
| Fisetin | 6 | 2 | 0 | 2 | nicht erfüllt |
| Kreatin | 5 | 1 | 0 | 1 | nicht erfüllt |
| Resveratrol | 3 | 1 | 0 | 1 | nicht erfüllt |
| D3K2 | 7 | n. v. | n. v. | n. v. | vor W2 in Loox prüfen |
| Astaxanthin | 6 | n. v. | n. v. | n. v. | vor W2 in Loox prüfen |
| Hyaluron | 5 | n. v. | n. v. | n. v. | vor W2 in Loox prüfen |
| B-Komplex | 4 | n. v. | n. v. | n. v. | vor W2 in Loox prüfen |
| Schlafspray | 2 | n. v. | n. v. | n. v. | nicht erfüllt |

„n. v." heißt: `loox.reviews` ist auf dem Produkt nicht befüllt, die Texte sind
über die Admin-API nicht abrufbar. Die Zählung muss dann in Loox selbst passieren.

**Ergebnis: G3a hält bei keinem der zehn Wellen-Produkte.** Von Hand gepflegte
Review-Blöcke gibt es also nirgends.

**Das heißt seit dem 2026-07-29 nicht mehr, dass die Seite reviewlos ist.**
`crs-customer-reviews` hat ein zweites Setting bekommen, `review_source`:

| Wert | Verhalten |
|---|---|
| `blocks` (Default) | wie bisher, gepflegte Review-Blöcke. So laufen beide Nordsterne weiter. |
| `loox` | liest die Volltexte serverseitig aus dem Metafeld `loox.reviews` und rendert sie in denselben Karten |

Damit steht auf jeder Supplement-PDP der echte Bewertungstext im ausgelieferten
HTML, ohne dass jemand ihn abschreibt und ohne dass er veraltet. Vorher rendert
die Loox-App-Section clientseitig: 582 Byte leerer Container, kein Bewertungstext,
für Suchsysteme und Sprachmodelle war die Seite reviewlos.

Drei Entscheidungen dabei, die beim Rollout nicht aufzuweichen sind:

- **Keine Sterne je Karte.** Das Metafeld trägt keine Einzelbewertung. Ein
  Fünf-Sterne-Default wäre erfunden. Stattdessen steht der echte Schnitt einmal
  über dem Track (`4,9 aus 9 Bewertungen`).
- **Kein Verifiziert-Badge.** Loox sammelt nur nach Kauf, aus dem Metafeld geht
  das aber nicht hervor. Was nicht in den Daten steht, wird nicht behauptet.
- **Keine einzelnen `Review`-Knoten im JSON-LD.** Die Entscheidung dagegen steht
  begründet in `snippets/microdata-schema.liquid` und bleibt bestehen. Der
  `aggregateRating`-Knoten dort ist davon unberührt.

Im Template gehört `customer_reviews` an Position 7, die Loox-App-Section bleibt
mit `"disabled": true` daneben stehen, damit die App-Block-Referenz umkehrbar ist.
Was dabei verloren geht: Foto-Bewertungen. Das Metafeld trägt keine Bildquellen.
Wenn ein Produkt Foto-Reviews hat, ist das gegen den Sichtbarkeitsgewinn
abzuwägen.

**Offene Entscheidung für BJ:** Ob die Bewertungstexte zusätzlich als
`Review`-Knoten ins JSON-LD sollen. Das wäre der größte GEO-Hebel, macht aber
Sätze wie „Bin mit der Wirkung sehr zufrieden" maschinenlesbar dem Produkt
zugeordnet. Nach dem Compliance-Aufräumen vom 29.07. wäre das ein Rückschritt in
der Sache, deshalb nicht eigenmächtig gebaut.

**Die zweite Bedingung von G3a ist wichtiger als die erste.** Wer eine Loox-
Bewertung in einen Template-Block kopiert, macht sie zur eigenen kommerziellen
Kommunikation (VO (EG) 1924/2006 Art. 1 Abs. 2). Sätze wie „Bin mit der Wirkung
sehr zufrieden" (NAD⁺), „Vertrage das Produkt sehr gut und bin mit der Wirkung
zufrieden" (Resveratrol) oder „Ich konnte mein biologisches Alter um 2 Jahre
reduzieren!!" (AGE&DNA) sind dann Wirkaussagen des Anbieters. Beim Übernehmen also
nach Wirkbezug filtern, nicht nur nach Länge. Dieselbe Logik steht bereits als
Begründung in `snippets/microdata-schema.liquid`, wo bewusst keine einzelnen
`review`-Knoten ausgezeichnet werden.

### G3b: Prüfberichte

Der Filestore enthält genau zwei PDF-Prüfberichte:

| Datei | Datum | Produkt |
|---|---|---|
| `Pruefbericht_L-24-04702.pdf` | 2024-05-23 | NMN |
| `Pruefbericht_L-25-09126.pdf` | 2026-06-16 | NMN, Charge 20250917 |

**G3b hält bei keinem Supplement außer NMN.** `lt-pdp-laborwerte` bleibt in allen
Wellen weg, ebenso die `coa_*`-Settings im Hero. Solange kein Bericht vorliegt,
bleibt „unabhängig laborgeprüft" eine Beteuerung ohne Dokument. Der Pilot sagt
deshalb nicht „laborgeprüft", sondern nennt, was belegbar ist: HACCP-Produktion
und Prüfung auf Schwermetalle und Verunreinigungen.

### G3c: `crs-metrics-row`

Braucht je Zahl eine Quellenzeile mit Datum. Für NMN existiert sie (NUS Singapur,
GeroScience 2024; Limbach Analytics). Für die Supplements ist keine vergleichbare
Untersuchung im Haus. **G3c hält bei keinem Wellen-Produkt.**

Wenn eine Zahl später dazukommt, gilt das Ein-Zahl-Raster: `crs-metrics-row` trägt
seit Phase 2 `data-count` und rendert eine oder zwei Karten sauber, es braucht
keine drei.

### G3d: `crs-expert-quotes`

Braucht ein echtes, produktbezogenes Limmroth-Statement. Es existiert für kein
Supplement. **G3d hält bei keinem Wellen-Produkt.**

Achtung beim Einsatz: Das `preset` der Section liefert zwei englische Sinclair-/
Huberman-Zitate und einen Limmroth-Eintrag als „In-House Neurologe" statt der
vollen Form. Wer die Section im Theme-Editor auf eine PDP zieht, bekommt sie
befüllt.

### Konsequenz für die Kette

Alle vier optionalen Beweis-Slots fallen bei allen zehn Wellen-Produkten weg. Die
Kette ist damit für W1–W3 identisch mit der des Piloten:

```
main (lt-pdp-hero)
logo_garden (crs-logo-garden)
feature_grid (crs-feature-grid)
wirkprinzip (lt-pdp-wirkprinzip)      optional, nur mit claimfreier Aussage
produktfakten (lt-pdp-produktfakten)  Pflicht
comparison_table (lt-comparison-table)
<loox-app-section>                    aus dem Bestands-Template übernehmen
risk_free_close (crs-risk-free-close)
faq_accordion (crs-faq-accordion)
main_product_hidden (main-product)    "disabled": true, erst nach G2
```

Neun sichtbare Sections. Die Flächen alternieren lückenlos
`#f7f7f4 → #f2f1ed → …`; die Loox-Section hat keine Farb-Settings und erbt den
Body-Hintergrund `#f7f7f4`. Sie steht deshalb an Position 7, wo die Alternation
ohnehin `#f7f7f4` verlangt. Wird sie verschoben, kippt der Rhythmus.

---

## Reihenfolge je PDP (Gate G2, nicht abkürzen)

1. `lt-pdp-produktfakten` befüllen und pushen
2. live per `curl` gegenprüfen, dass Zutaten, Gehalt und Verzehrempfehlung
   sichtbar sind
3. **erst dann** `"disabled": true` auf `main_product_hidden`
4. restliche Kette und Copy

Schritt 2 ist kein Formalismus. Die `collapsible_tab`-Blocks in `main-product`
tragen je Seite rund 7 KB einzigartigen Text, für den es kein Fallback gibt.

---

Siehe `briefing-pdp-refit.md` (Auftrag, Gates, Phasen),
`pdp-copy-deck.md` (Korridore und Compliance-Muster),
`_examples/templates/product.supplement-reference.json` (Struktur).
