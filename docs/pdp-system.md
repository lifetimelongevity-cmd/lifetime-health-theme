---
status: living
last_review: 2026-11-17
canonical_for: Aufbau der PDPs (Ketten, Konventionen, offene Punkte). Die Reihenfolge selbst steht im Template.
---

# PDP-System

Welche Section-Ketten die Produktseiten fahren, welche Konventionen dahinter stehen und was je PDP offen ist.

**Die Reihenfolge steht hier bewusst nicht.** Sie steht im Template und auf der Live-Seite und lässt sich mit dem Skript unten in Sekunden abfragen. Die frühere Fassung führte handgepflegte Tabellen je PDP. Dadurch stand die NMN-PDP vom 22.10. bis 17.11.2026 mit 11 Sections in der Datei, live waren es 5. Die Vollfassung mit Copy-Zitaten, Bilddateien und Commit-Verweisen je PDP liegt in der Git-Historie: `git show 8537de9:docs/pdp-system.md`.

## Die Ketten

**NMN** (`/products/lifetime-nmn`, Template `product.nmn-pulver.json`): kurz und eigenständig. `lt-pdp-hero` (Größenwahl 30/60/90 g, Abo vorausgewählt) · `lt-pdp-belege` · `lt-pdp-reviews-all` · `crs-faq-accordion` · `lt-leiste`. Seit 22.10.2026.

**AGE&DNA** (`/products/lifetime-age-dna`, Template `product.age-dna-test.json`): Verkaufsseite für kalten Traffic, 13 sichtbare Sections. Hero · Belege · Warum jetzt · Stimmen · Loox-Lade · Einwände · Abgrenzung · Ärztliche Leitung · Ablauf · Bonus-Stack · Garantie · FAQ · Schluss-Leiste. Kaufknöpfe: Hero, Warum jetzt, Garantie, Leiste, dazu Sticky. Varianten und Preise kommen aus dem Produkt, nicht aus dieser Datei.

**Supplement-Kette** (12 PDPs, je 6 Sections): `lt-pdp-hero` · `lt-pdp-wirkprinzip` · `lt-pdp-belege` · `lt-pdp-reviews-all` · `lt-pdp-produktfakten` · `crs-faq-accordion`. Regel (BJ 05.11.): Was die Supplements mit NMN teilen (Hero, Belege, Loox-Lade, FAQ), ist gleich gebaut und eingestellt. Wirkprinzip und Produktfakten sind die NEM-Abschnitte dazwischen.

| Produkt | URL `/products/…` | Suffix | Hinweis |
|---|---|---|---|
| TMG | `betain-tmg-kapseln` | `01_tmg` | 2 Kapseln Standard (BJ 16.11.) |
| Spermidin | `spermidin-kapseln` | `02_spermidin` | 10 mg bleibt (BJ 29.07.) |
| CaAKG | `caakg-kapseln` | `03_caakg` | |
| Fisetin | `fisetin-kapseln` | `04_fisetin` | NEM trotz Novel-Food-Status (BJ 16.11.) |
| Kreatin | `kreatin-monohydrat-pulver` | `05_kreatin` | |
| Resveratrol | `resveratrol-kapseln` | `06_resveratrol` | |
| D3+K2 | `vitamin-d3-k2-spray` | `07_d3k2` | ohne Abo |
| Schlafspray | `schlafspray-mit-melatonin` | `08_schlafspray` | ohne Abo |
| Astaxanthin | `astaxanthin-kapseln` | `09_astafit` | Bestand 0, „Ausverkauft“ |
| Hyaluron | `hyaluron` | `10_hyaluron` | |
| B-Komplex | `vitamin-b-komplex-kapseln` | `11_b-komplex` | |
| NAD⁺ | `nad-booster` | `12_nad-liposomal-2` | Muster der Kette |

**Noch auf der alten Kette** mit sichtbarer `main-product`-Section: die sechs Bundle-Templates (`02_01` bis `02_05`, `bundle_01_fokus`). Dazu kommen `product.json` (Fallback) und `product.lifetime-age-folgetest.json`.

## Konventionen

- **`main_product_hidden`**: NMN, AGE&DNA, `product.json` und Folgetest führen `main-product` mit `"disabled": true`. Die Section rendert nicht, hält aber Produkt- und App-Blöcke (bei NMN den Appstle-Block). Erst löschen, wenn geprüft ist, dass kein App-Block mehr gebraucht wird. Die Supplement-Kette hat den Eintrag nicht mehr. Gekauft wird überall über `lt-pdp-hero`.
- **Preise** liest `lt-pdp-hero` immer aus der echten Variante. `pill_1_once_price_cents` und `pill_1_sub_price_cents` stehen nur noch im Schema. Preise ändert man also im Produkt. Die Versandgrenze kommt seit 29.09. aus `snippets/lt-shipping-rule.liquid` (Theme-Einstellungen je Land), nicht mehr fest aus 49 €.
- **Schalter der Supplement-Kette** in `lt-pdp-hero`, alle per Default aus: `compact_save_ship` (Versand in die Ersparnis rechnen), `compact_sub_hint`, `compact_once_ship`, `compact_amount_grams` mit `compact_amount_unit` (g, ml, kg; § 5 PAngV verlangt bei Fertigpackungen den Grundpreis je kg), `show_price_standalone` (ohne Abo). Dazu `fact_icon` in `lt-pdp-produktfakten`, `stage_icon` und `einbl_mobile_vw` in `lt-pdp-wirkprinzip`.
- **Buybox**: `show_subscription_toggle` steuert die Abo-Wahl, `show_size_selector` greift nur bei mehr als einer Variante, ein `?variant=`-Link wählt die Größe vor. `trust_4` kann einen Dialog öffnen (`trust_4_popup_title`/`_body`).
- In `crs-*`-Sections blendet `__none__` ein Feld aus, Leerstring nicht (`docs/section-heading-stack.md`).

## Offen je PDP (Stand 17.11.2026)

Bei allen zwölf Supplements fehlt der Prüfbericht je Charge. Die Etiketten nennen noch Berlin statt Köln.

| PDP | Offen |
|---|---|
| Spermidin | Glaskarte Kiechl 2018 am Volltext, Etikett (zugelassene Bezeichnung, Schwangere und Stillende, Glutenfrei-Siegel, Extrakt 11,2 mg/g gegen 0,8 bis 2,4 mg/g der Zulassung), Anwalt |
| Kreatin | Fokuspunkt Kabelzug-Foto, Grundpreis je kg statt je 100 g |
| Resveratrol | Kapselgewicht, Dosis und Herkunft laut Zulassung (Anwalt) |
| D3+K2 | Abo-Plan, zweite Größe, K2-Herkunft |
| TMG | Titelzeile, Doppelpack, Kapselgewicht, Garantie-Wortlaut, Anwalt (Pflichtinfo am Claim) |
| Astaxanthin | Bestand, „>99 % Reinheit“ auf dem Etikett, astafit®-Datenblatt, Kapselfarbe, Garantie-Wortlaut, 14-Jahre-Hinweis |
| Fisetin | Titelzeile, Glaskarte Arai 2000, Doppelpack, Kapselgewicht und -farbe, Anwalt (Novel Food), drei Produktbilder mit Claim-Text |
| B-Komplex | zweite Größe, Kapselfarbe |
| Schlafspray | Mehrfachpackung, Gehaltsmessung je Charge |
| Hyaluron | Fermentation am Datenblatt, Doppelpack, Kapselfarbe, Garantie-Wortlaut |
| CaAKG | Kapselgewicht, Doppelpack, Kapselfarbe, Garantie-Wortlaut, Anwalt (Anhang II, Studie ohne Vergleichsgruppe), Warenkorb-Angebot zeigt „NMN Pulver“ |

## Prüfmethode

Reihenfolge aller Produkt-Templates (der Kommentarkopf vor dem JSON muss weg):

```bash
python3 - <<'PY'
import re, json, glob
for f in sorted(glob.glob('templates/product*.json')):
    t = json.loads(re.sub(r'/\*.*?\*/', '', open(f).read(), flags=re.S))
    print(f'== {f} ({len(t["order"])})')
    for k in t['order']:
        s = t['sections'][k]
        print(f'   {k:24} {s["type"]:26} {"AUS" if s.get("disabled") else ""}')
PY
```

Gegen Live (gerenderte Sections in Reihenfolge; bei `local_rate_limited` per Puppeteer):

```bash
curl -sS -A 'Mozilla/5.0' https://www.lifetime-health.de/products/lifetime-nmn | grep -o 'id="shopify-section-template[^"]*"' | sed 's/.*__//;s/"$//'
```

Welches Template ein Produkt nutzt, nie aus dem Dateinamen raten, sondern am Produkt bestätigen: `product(id) { handle templateSuffix }`. Felder für ein neues Produkt: `docs/lt-pdp-template-notes.md`.
