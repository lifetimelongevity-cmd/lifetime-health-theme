---
status: snapshot
last_review: 2026-07-29
canonical_for: umbau-seite-science-wissenschaft-zuerst
supersedes: []
---

> **Umfangszahlen auf den Portal-Stand gezogen (06.08.2026):** 23 DNA-Kategorien, keine feste
> Reportzahl, sechs epigenetische Bereiche mit MethylPace statt „biologisches Alter". Copy unten
> ist angeglichen und deckt sich mit dem Theme. Beleg:
> `docs/age-dna-product-fact-sheet.md` § Portal-Audit 2026-08-06.

# Umsetzungs-Briefing: Umbau /pages/science (Wissenschaft-zuerst)

**Für die umsetzende KI. Dieses Dokument ist eigenständig, du brauchst keinen weiteren Chat-Kontext.**

## 0. Auftrag in einem Satz

Die Seite `/pages/science` von einer zweiten Test-Landingpage zu einer Seite umbauen, die zuerst die Wissenschaft hinter dem AGE & DNA-Test erzählt und den Test als Schlussfolgerung setzt. Nur Reihenfolge, Copy und zwei neue Grafiken ändern sich, es werden ausschließlich bestehende Sections verwendet.

## 1. Datei, Live-Status, Vorsicht

- **Datei:** `templates/page.science.json` (Slug `/pages/science`, verifiziert in `docs/live-pages-map.md`).
- **Das geht live.** `/pages/science` ist eine der fünf kanonischen Live-Seiten. Der Theme Manager committet und pusht während der Session automatisch. Sobald du die Datei schreibst, ist der Umbau in 2 bis 3 Minuten öffentlich.
- **Reihenfolge der Schritte:** Erst sicherstellen, dass die Grafiken in `assets/` liegen (siehe §2), dann das Template **zuletzt** schreiben. Template-Änderungen immer als letztes, weil Auto-Push.
- Vor dem Schreiben `product`/Page-Template nicht raten: die Seite rendert nachweislich über `page.science.json`.

## 2. Assets (liegen bereits in `assets/`)

| Datei | Rolle | Abschnitt |
|---|---|---|
| `science-epigenetik-alter.svg` | Kurve biologisches vs. Kalenderalter, Zonen schneller/langsamer gealtert | #4 Epigenetik |
| `science-genetik-anlagen.svg` | Radar-Profil der genetischen Anlagen (6 Bereiche) | #5 Genetik |
| `science-healthspan-luecke.svg` | Healthspan-Lücke (bereits vorhanden, live erprobt) | #2 Warum |

Nicht verwenden: `docs/svg-src/science-zwei-ebenen.svg` war der Zwischenstand (kombinierte Grafik) und ist bewusst **nicht** auf der Seite. Der Überblick #3 bleibt textgetrieben, damit die zwei Detailgrafiken nicht doppelt erscheinen.

Referenzstil für die SVGs (falls Anpassung nötig): flach-editorial, Helvetica, Palette Ink `#26251e`, Teal `#4a8c85`, warme Neutrale, dezente Quellzeile unten. Vorbild `assets/science-healthspan-luecke.svg`.

## 3. Story-Bogen (roter Faden, jeder Abschnitt macht den nächsten auf)

*Tempo (Hero) → warum Tempo zählt (#2) → wie wir es messen (#3 bis #5) → dass es stimmt (#6) → was du bekommst (#7) → miss deinen Stand (#8).*

Die CTA (#8) ist ein bewusster Rückgriff auf #2 („der erste Schritt ist zu wissen, wo du stehst" → „Miss, wo du heute stehst").

## 4. Neue Reihenfolge (order-Array)

`main` (disabled, unverändert) → `hero` → `warum` → `kombination` → `epigenetik` → `genetik` → `grundlage` → `validierung` → `umfang` → `cta` → `faq` → `mehr`

**Gegenüber heute:** Longevity von ganz unten nach #2 gezogen; neuer Text-Überblick #3; „Was ist Epigenetik"-Split wird zum Epigenetik-Detail #4; neuer Genetik-Split #5; `grundlage`+`validierung` bleiben die eine dunkle Strecke; 187-Reports nach hinten; eine CTA statt zwei. **Entfällt:** die mittige Kauf-CTA und der bisherige Doppel-Aufmacher „Drei Ergebnisse" (`lt-benefits` wird für #3 neu belegt).

## 5. Abschnitts-Spec (Section-Typ, Fläche, Copy)

Flächenrhythmus hell/warm im Wechsel, **nur eine** dunkle Strecke (#6). Kicker nur bei echtem Informationsgewinn. Keine Em-Dashes, keine Dreiklänge.

### #1 Hero — `lt-science-proof-hero` (hell)
- kicker: `AGE & DNA-TEST`
- headline: `Wie schnell alterst du wirklich?`
- subheading: `Dein biologisches Alter muss nicht deinem Geburtsjahr entsprechen. Wir messen es, aus einer Speichelprobe.`
- cta_label: `Wie das funktioniert` · cta_url: `#warum` (weiche CTA, scrollt zu #2)
- cta_2_label: `Zum AGE & DNA-Test` · cta_2_url: `/products/lifetime-age-dna` (sekundär)
- Bild bleibt Limmroth (`shopify://shop_images/volker-podcast.png`), Caption bleibt.

### #2 Warum es zählt — `lt-science-split` + `science-healthspan-luecke.svg` (warm, Motiv links)
- anchor_id: `warum`
- heading: `Länger leben reicht nicht.`
- subheading: `Es zählt, wie viele Jahre gesund bleiben.`
- body: `<p>Die Lebenserwartung ist gestiegen, die Zahl der gesunden Jahre nicht im gleichen Maß. Im Schnitt fallen die letzten Jahre in eine Zeit mit Einschränkung.</p><p>Wie schnell du alterst, entscheidet mit darüber. Der erste Schritt ist zu wissen, wo du stehst.</p>`
- kein CTA (Fokus fließt weiter zu #3).

### #3 Zwei Analysen, eine Probe — `lt-benefits` (hell), zwei Karten
- title: `Zwei Analysen, eine Probe.`
- subheading: `Der Test verbindet zwei eigenständige Laboranalysen. Zusammen zeigen sie mehr als jede für sich.`
- heading_size: `feature` · content_align: `left`
- Karte 1 — title: `Epigenetik` · description: `Misst, wie schnell dein Körper gerade altert. Veränderbar.`
- Karte 2 — title: `Genetik` · description: `Liest deine festen Anlagen, deine natürlichen Stärken und Schwächen.`
- kein CTA.

### #4 Epigenetik — `lt-science-split` + `science-epigenetik-alter.svg` (warm, Motiv rechts)
- anchor_id: `epigenetik` · kicker: `EPIGENETIK`
- heading: `Wie schnell du gerade alterst.`
- subheading: `Gemessen über die DNA-Methylierung.`
- body: `<p>Altern hinterlässt chemische Marker an deiner DNA. Aus ihrem Muster liest die epigenetische Uhr, wie schnell dein Körper biologisch altert, unabhängig von deinem Geburtsjahr.</p><p>Anders als deine Gene lässt sich dieser Wert beeinflussen. Nach sechs Monaten misst du erneut und siehst, ob Schlaf, Ernährung oder Training ihn bewegt haben.</p>`

### #5 Genetik — `lt-science-split` + `science-genetik-anlagen.svg` (hell, Motiv links)
- anchor_id: `genetik` · kicker: `GENETIK`
- heading: `Womit du startest.`
- subheading: `Deine festen Anlagen, ein Leben lang gültig.`
- body (Übergang rein + Nutzen + Kombi-Payoff am Ende): `<p>Das Tempo zeigt, wo du heute stehst. Womit du gestartet bist, zeigt es nicht. Das liest die genetische Analyse: deine natürlichen Stärken und Schwächen, etwa wie du auf Belastung oder auf bestimmte Nährstoffe reagierst.</p><p>So setzt du gezielt dort an, wo es bei dir zählt, statt allgemeinen Empfehlungen zu folgen.</p><p>Erst beide Analysen zusammen werden konkret: Die Genetik zeigt, wofür du anfällig bist, etwa für stille Entzündung. Ob sich das gerade auf dein Tempo auswirkt, verrät der epigenetische Wert. Genau dieser Abgleich sagt dir, wo du zuerst ansetzt.</p>`

### #6 Grundlage & Prüfung — die eine dunkle Strecke (`#364f56`)
Zwei Sections direkt hintereinander, beide dunkel, damit sie als ein Block lesen.

**#6a `lt-hp-science` (Limmroth):**
- headline: `Ein Arzt prüft die Auswertung.`
- subheadline: `Chefarzt für Neurologie.`
- Experten-Block: `Prof. Dr. med. Volker Limmroth` · title `Chief Scientific Officer · LIFETIME` · credentials `Chefarzt der Klinik für Neurologie, Köln-Merheim` · Zitat bleibt · Bild `shopify://shop_images/volker-podcast.png`
- cta_label: `Mehr zu Prof. Limmroth` · cta_url: `/pages/aerzte`

**#6b `lt-science-bento` (Zahlen):**
- Fakt 1 — value `20.000+` · label `Teilnehmer` · desc `Datenbasis der epigenetischen Analyse.`
- Fakt 2 — value `2.000+` · label `Gesunde Kohorte` · desc `An ihr wurde die Uhr geprüft, 14 bis 97 Jahre.`
- statement_text: `Analyse bei Eurofins Genomics.` · statement_sub: `Akkreditiert nach ISO 17025.`
- **Wichtig:** die alte Zahl `1.500+ Studien` und das Wort „peer-reviewt" entfallen ersatzlos (Compliance, siehe §6).

### #7 Was du bekommst — `lt-science-scope` (warm)
- anchor_id: `umfang`
- heading: `Was der Test alles misst.`
- subheading: leer (BJ-Entscheid 29.07., siehe Abweichungstabelle)
- number: `23` · number_label: `DNA-Kategorien` · note: `Dazu sechs epigenetische Bereiche.`
- cta_label: `Alle Kategorien ansehen` · cta_url: `/pages/was-ist-enthalten`
- Beispiel-Chips bleiben wie heute.

### #8 CTA — `crs-risk-free-close` (hell)
- headline: `Miss, wo du heute stehst.`
- subheading: `Speichelprobe genügt, Ergebnis in der App.`
- intro: `__none__` · price_fallback: `349,00 € · einmalig`
- cta_label: `Zum AGE & DNA-Test` · cta_url: `/products/lifetime-age-dna`
- cta_2_label: `Passt der Test zu mir?` · cta_2_url: `/pages/quiz-age`
- product: `lifetime-age-dna`
- Trust-Zeilen: `Eurofins Genomics · ISO-akkreditiert` / `DSGVO-konform · nur du hast Zugriff` / `Ergebnisse in 6 Wochen in der App`

### #9 FAQ — `crs-faq-accordion` (warm)
Vier Items bleiben, **nur q1 korrigieren** (Zahlen-Konsistenz mit §6):
- Frage bleibt: `Wie genau ist die epigenetische Altersbestimmung?`
- Antwort neu: `<p>Die Datenbasis umfasst über 20.000 Teilnehmer. Geprüft wurde die verwendete Uhr an einer gesunden Kohorte von über 2.000 Menschen zwischen 14 und 97 Jahren. Sie liefert eine Einordnung, keine medizinische Diagnose. Ein einzelner Wert schwankt, aussagekräftig ist die Entwicklung über die Zeit.</p>`

### #10 Mehr erfahren — `crs-link-cards` (hell)
Unverändert (Reports, Longevity-Blog, Longevity Blueprint).

## 6. Compliance und KI-Tell-Leitplanken (nicht verhandelbar)

- **Genetik-Radar zeigt nur Anlagen.** Kein Pro-Bereich-Messergebnis suggerieren; der Test liefert genetisch Veranlagungen, epigenetisch das biologische Alter als Gesamtwert.
- **Kein Anbieter-/Techniknamen** für die Uhr oder das Verfahren. Erlaubt: LIFETIME, MethylPace, Eurofins Genomics. Nicht nennen: Illumina, MethylationEPIC oder andere Technologie-Marken.
- **Keine Überclaims zum Evidenzstatus:** nicht „peer-reviewt", nicht „klinisch bewiesen", nicht „medizinisch zugelassen". Korrekt: „im akkreditierten Labor analysiert", „auf Basis etablierter epigenetischer Forschung".
- **Zahlen:** `20.000+` = allgemeine Datenbasis, `2.000+` = gesunde Validierungskohorte (14 bis 97 Jahre). Nicht vermischen, die alte Behauptung „an 20.000 validiert" ist falsch.
- **Genvariante = Veranlagung, nie Diagnose.**
- **Limmroth** immer mit vollem Titel `Prof. Dr. med. Volker Limmroth`, Rolle nur als Prüfinstanz, keine eigenen Longevity-Forschungsclaims (null Publikationen). Byline nicht über `custom.author_name`/`reviewer_name` setzen.
- **NMN kommt auf dieser Seite nicht vor.**
- **Keine Em-Dashes, keine Dreiklang-Slogans, keine dekorativen farbigen Left-/Accent-Borders.** Kicker sparsam. Heading + Subline kurz.
- **Heading-System:** Title + Subtitle sind ein Block (Snippet `section-heading-crs`), nur Opacity-Unterschied.

## 7. Fertiger Zielzustand: `templates/page.science.json`

Gegen das Live-Template abgleichen und ersetzen. Feldnamen sind aus dem Live-Template übernommen. Farben im Flächenrhythmus, `#364f56` nur bei #6a/#6b.

```json
{
  "sections": {
    "main": {
      "type": "main-page",
      "disabled": true,
      "settings": {
        "center": false,
        "page_cover_metafield": "",
        "color_background_main": "rgba(0,0,0,0)",
        "color_text_main": "rgba(0,0,0,0)",
        "height": "small"
      }
    },
    "hero": {
      "type": "lt-science-proof-hero",
      "settings": {
        "anchor_id": "start",
        "kicker": "AGE & DNA-TEST",
        "headline": "Wie schnell alterst du wirklich?",
        "subheading": "Dein biologisches Alter muss nicht deinem Geburtsjahr entsprechen. Wir messen es, aus einer Speichelprobe.",
        "cta_label": "Wie das funktioniert",
        "cta_url": "#warum",
        "cta_2_label": "Zum AGE & DNA-Test",
        "cta_2_url": "/products/lifetime-age-dna",
        "image": "shopify://shop_images/volker-podcast.png",
        "image_alt": "Prof. Dr. med. Volker Limmroth",
        "caption": "Prof. Dr. med. Volker Limmroth, Chief Scientific Officer bei LIFETIME.",
        "color_bg": "#f7f7f4",
        "color_panel": "#f2f1ed",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "warum": {
      "type": "lt-science-split",
      "settings": {
        "anchor_id": "warum",
        "kicker": "",
        "heading": "Länger leben reicht nicht.",
        "subheading": "Es zählt, wie viele Jahre gesund bleiben.",
        "body": "<p>Die Lebenserwartung ist gestiegen, die Zahl der gesunden Jahre nicht im gleichen Maß. Im Schnitt fallen die letzten Jahre in eine Zeit mit Einschränkung.</p><p>Wie schnell du alterst, entscheidet mit darüber. Der erste Schritt ist zu wissen, wo du stehst.</p>",
        "cta_label": "",
        "cta_url": "",
        "cta_style": "soft",
        "image_asset": "science-healthspan-luecke.svg",
        "image_alt": "In Deutschland stehen rund 81 Jahren Lebenserwartung etwa 64 gesunde Lebensjahre gegenüber, rund 17 Jahre entfallen auf gesundheitliche Einschränkungen.",
        "caption": "",
        "image_side": "left",
        "content_align": "left",
        "color_bg": "#f2f1ed",
        "media_bg": "#f7f4ee",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "kombination": {
      "type": "lt-benefits",
      "blocks": {
        "k1": {
          "type": "benefit",
          "settings": {
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 12h4l3 8 4-16 3 8h4\"/></svg>",
            "title": "Epigenetik",
            "description": "Misst, wie schnell dein Körper gerade altert. Veränderbar."
          }
        },
        "k2": {
          "type": "benefit",
          "settings": {
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"6\" y1=\"3\" x2=\"6\" y2=\"15\"/><circle cx=\"18\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><path d=\"M18 9a9 9 0 0 1-9 9\"/></svg>",
            "title": "Genetik",
            "description": "Liest deine festen Anlagen, deine natürlichen Stärken und Schwächen."
          }
        }
      },
      "block_order": ["k1", "k2"],
      "settings": {
        "kicker": "",
        "title": "Zwei Analysen, eine Probe.",
        "subheading": "Der Test verbindet zwei eigenständige Laboranalysen. Zusammen zeigen sie mehr als jede für sich.",
        "content_align": "left",
        "heading_size": "feature",
        "color_bg": "#f7f7f4",
        "cta_label": "",
        "cta_url": ""
      }
    },
    "epigenetik": {
      "type": "lt-science-split",
      "settings": {
        "anchor_id": "epigenetik",
        "kicker": "EPIGENETIK",
        "heading": "Wie schnell du gerade alterst.",
        "subheading": "Gemessen über die DNA-Methylierung.",
        "body": "<p>Altern hinterlässt chemische Marker an deiner DNA. Aus ihrem Muster liest die epigenetische Uhr, wie schnell dein Körper biologisch altert, unabhängig von deinem Geburtsjahr.</p><p>Anders als deine Gene lässt sich dieser Wert beeinflussen. Nach sechs Monaten misst du erneut und siehst, ob Schlaf, Ernährung oder Training ihn bewegt haben.</p>",
        "cta_label": "",
        "cta_url": "",
        "cta_style": "soft",
        "image_asset": "science-epigenetik-alter.svg",
        "image_alt": "Kurve des biologischen Alters gegen das Kalenderalter, mit den Bereichen schneller und langsamer gealtert.",
        "caption": "",
        "image_side": "right",
        "content_align": "left",
        "color_bg": "#f2f1ed",
        "media_bg": "#f7f4ee",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "genetik": {
      "type": "lt-science-split",
      "settings": {
        "anchor_id": "genetik",
        "kicker": "GENETIK",
        "heading": "Womit du startest.",
        "subheading": "Deine festen Anlagen, ein Leben lang gültig.",
        "body": "<p>Das Tempo zeigt, wo du heute stehst. Womit du gestartet bist, zeigt es nicht. Das liest die genetische Analyse: deine natürlichen Stärken und Schwächen, etwa wie du auf Belastung oder auf bestimmte Nährstoffe reagierst.</p><p>So setzt du gezielt dort an, wo es bei dir zählt, statt allgemeinen Empfehlungen zu folgen.</p><p>Erst beide Analysen zusammen werden konkret: Die Genetik zeigt, wofür du anfällig bist, etwa für stille Entzündung. Ob sich das gerade auf dein Tempo auswirkt, verrät der epigenetische Wert. Genau dieser Abgleich sagt dir, wo du zuerst ansetzt.</p>",
        "cta_label": "",
        "cta_url": "",
        "cta_style": "soft",
        "image_asset": "science-genetik-anlagen.svg",
        "image_alt": "Radar-Profil der genetischen Anlagen über sechs Bereiche.",
        "caption": "",
        "image_side": "left",
        "content_align": "left",
        "color_bg": "#f7f7f4",
        "media_bg": "#f2f1ed",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "grundlage": {
      "type": "lt-hp-science",
      "blocks": {
        "foundation_expert": {
          "type": "expert",
          "settings": {
            "expert_name": "Prof. Dr. med. Volker Limmroth",
            "expert_title": "Chief Scientific Officer · LIFETIME",
            "expert_credentials": "Chefarzt der Klinik für Neurologie, Köln-Merheim",
            "expert_quote": "Gesundes Altern beginnt nicht mit Vermutungen, sondern mit einem besseren Verständnis der biologischen Prozesse, die im Körper tatsächlich ablaufen.",
            "expert_image_url": "shopify://shop_images/volker-podcast.png"
          }
        }
      },
      "block_order": ["foundation_expert"],
      "settings": {
        "padding_top": 80,
        "padding_bottom": 56,
        "color_bg": "#364f56",
        "color_text": "#f7f7f4",
        "heading_size": "feature",
        "kicker": "",
        "headline": "Ein Arzt prüft die Auswertung.",
        "subheadline": "Chefarzt für Neurologie.",
        "cta_label": "Mehr zu Prof. Limmroth",
        "cta_url": "/pages/aerzte"
      }
    },
    "validierung": {
      "type": "lt-science-bento",
      "blocks": {
        "f1": {
          "type": "fact",
          "settings": {
            "fact_label": "Teilnehmer",
            "fact_value": "20.000+",
            "fact_desc": "Datenbasis der epigenetischen Analyse."
          }
        },
        "f2": {
          "type": "fact",
          "settings": {
            "fact_label": "Gesunde Kohorte",
            "fact_value": "2.000+",
            "fact_desc": "An ihr wurde die Uhr geprüft, 14 bis 97 Jahre."
          }
        }
      },
      "block_order": ["f1", "f2"],
      "settings": {
        "layout_variant": "grid",
        "color_bg": "#364f56",
        "color_tile_bg": "#2d4249",
        "color_text": "#f7f7f4",
        "padding_top": 0,
        "padding_bottom": 80,
        "statement_kicker": "",
        "statement_value": "",
        "statement_text": "Analyse bei Eurofins Genomics.",
        "statement_sub": "Akkreditiert nach ISO 17025.",
        "primary_button_label": "",
        "primary_button_link": "",
        "secondary_button_label": "",
        "secondary_button_link": "",
        "mood_image": "https://cdn.shopify.com/s/files/1/0621/2173/8340/files/lifetime-sport-mood-water.png?v=1777043275",
        "mood_image_alt": "Schwimmerin am Beckenrand als Motiv für körperliche Vitalität"
      }
    },
    "umfang": {
      "type": "lt-science-scope",
      "blocks": {
        "x1": { "type": "example", "settings": { "label": "Körperalter" } },
        "x2": { "type": "example", "settings": { "label": "Biologisches Alter" } },
        "x3": { "type": "example", "settings": { "label": "EpiVitality" } },
        "x4": { "type": "example", "settings": { "label": "Immunscore" } },
        "x5": { "type": "example", "settings": { "label": "Entzündung" } },
        "x6": { "type": "example", "settings": { "label": "Muskelschwund" } },
        "x7": { "type": "example", "settings": { "label": "Schlaf" } },
        "x8": { "type": "example", "settings": { "label": "Herz" } },
        "x9": { "type": "example", "settings": { "label": "Stoffwechsel" } },
        "x10": { "type": "example", "settings": { "label": "Fitness" } }
      },
      "block_order": ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10"],
      "settings": {
        "anchor_id": "umfang",
        "kicker": "",
        "heading": "Was der Test alles misst.",
        "subheading": "",
        "number": "23",
        "number_label": "DNA-Kategorien",
        "note": "Dazu sechs epigenetische Bereiche.",
        "cta_label": "Alle Kategorien ansehen",
        "cta_url": "/pages/was-ist-enthalten",
        "color_bg": "#f2f1ed",
        "color_chip_bg": "#f7f7f4",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "cta": {
      "type": "crs-risk-free-close",
      "blocks": {
        "trust_1": { "type": "trust_line", "settings": { "text": "Eurofins Genomics · ISO-akkreditiert" } },
        "trust_2": { "type": "trust_line", "settings": { "text": "DSGVO-konform · nur du hast Zugriff" } },
        "trust_3": { "type": "trust_line", "settings": { "text": "Ergebnisse in 6 Wochen in der App" } }
      },
      "block_order": ["trust_1", "trust_2", "trust_3"],
      "settings": {
        "product": "lifetime-age-dna",
        "color_bg": "#f7f7f4",
        "color_card_bg": "#f2f1ed",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80,
        "content_align": "left",
        "heading_size": "feature",
        "image_alt": "AGE & DNA-Test von LIFETIME",
        "badge_text": "",
        "kicker": "",
        "headline": "Miss, wo du heute stehst.",
        "subheading": "Speichelprobe genügt, Ergebnis in der App.",
        "intro": "__none__",
        "price_fallback": "349,00 € · einmalig",
        "cta_label": "Zum AGE & DNA-Test",
        "cta_url": "/products/lifetime-age-dna",
        "cta_2_label": "Passt der Test zu mir?",
        "cta_2_url": "/pages/quiz-age"
      }
    },
    "faq": {
      "type": "crs-faq-accordion",
      "blocks": {
        "q1": {
          "type": "item",
          "settings": {
            "question": "Wie genau ist die epigenetische Altersbestimmung?",
            "answer": "<p>Die Datenbasis umfasst über 20.000 Teilnehmer. Geprüft wurde die verwendete Uhr an einer gesunden Kohorte von über 2.000 Menschen zwischen 14 und 97 Jahren. Sie liefert eine Einordnung, keine medizinische Diagnose. Ein einzelner Wert schwankt, aussagekräftig ist die Entwicklung über die Zeit.</p>"
          }
        },
        "q2": {
          "type": "item",
          "settings": {
            "question": "Was bringt mir das Ergebnis konkret?",
            "answer": "<p>Du siehst, welche Bereiche bei dir im Vordergrund stehen, statt allgemeine Empfehlungen zu übernehmen. Daraus lassen sich Prioritäten ableiten. Eine Behandlung ersetzt der Test nicht.</p>"
          }
        },
        "q3": {
          "type": "item",
          "settings": {
            "question": "Was passiert mit meinen genetischen Daten?",
            "answer": "<p>Die Laboranalyse erfolgt bei Eurofins nach ISO 17025. Die Speicherung ist DSGVO-konform, Zugriff hast nur du, und du kannst deine Daten jederzeit löschen lassen.</p>"
          }
        },
        "q4": {
          "type": "item",
          "settings": {
            "question": "Wie lange dauert es bis zum Ergebnis?",
            "answer": "<p>Nach dem Einsenden der Speichelprobe liegen die Ergebnisse in etwa sechs Wochen in der App.</p>"
          }
        }
      },
      "block_order": ["q1", "q2", "q3", "q4"],
      "settings": {
        "kicker": "",
        "heading": "Häufige Fragen.",
        "content_align": "left",
        "heading_size": "feature",
        "color_bg": "#f7f7f4",
        "color_card_bg": "#f2f1ed",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    },
    "mehr": {
      "type": "crs-link-cards",
      "blocks": {
        "m1": { "type": "card", "settings": { "title": "Was der Test misst", "description": "Alle 23 Kategorien im Überblick.", "link_url": "/pages/was-ist-enthalten", "link_label": "Reports ansehen" } },
        "m2": { "type": "card", "settings": { "title": "Longevity-Blog", "description": "Hintergrund zu Epigenetik und Prävention.", "link_url": "/blogs/longevity-blog", "link_label": "Zum Blog" } },
        "m3": { "type": "card", "settings": { "title": "Longevity Blueprint", "description": "Zehn Kapitel für den Alltag.", "link_url": "/pages/longevity", "link_label": "Guide öffnen" } }
      },
      "block_order": ["m1", "m2", "m3"],
      "settings": {
        "anchor_id": "mehr",
        "kicker": "",
        "heading": "Mehr erfahren.",
        "subheading": "Reports, Blog und Guide.",
        "content_align": "left",
        "heading_size": "feature",
        "color_bg": "#f2f1ed",
        "color_card_bg": "#f7f7f4",
        "color_text": "#26251e",
        "padding_top": 80,
        "padding_bottom": 80
      }
    }
  },
  "order": [
    "main",
    "hero",
    "warum",
    "kombination",
    "epigenetik",
    "genetik",
    "grundlage",
    "validierung",
    "umfang",
    "cta",
    "faq",
    "mehr"
  ]
}
```

## 8. QA nach dem Push (Live-Cache 2 bis 3 Minuten)

1. `/pages/science` lädt, Reihenfolge entspricht §4.
2. Beide neuen SVGs laden (kein 404): `assets/science-epigenetik-alter.svg`, `assets/science-genetik-anlagen.svg`.
3. Hero-CTA „Wie das funktioniert" springt zu `#warum`.
4. Nur eine dunkle Strecke (#6a/#6b), sonst hell/warm im Wechsel.
5. Mobil: die zwei Splits stapeln sauber (Copy zuerst, Motiv darunter), Radar und Kurve bleiben lesbar.
6. Heading-Stacks: Title + Subline als ein Block, kein doppelter Kicker.
7. Copy-Gegencheck gegen §6 (keine Em-Dashes, keine „peer-reviewt", Zahlen 20.000 vs. 2.000 korrekt getrennt).
8. Links prüfen: `/pages/aerzte`, `/pages/was-ist-enthalten`, `/pages/quiz-age`, `/products/lifetime-age-dna`, `/pages/longevity`, `/blogs/longevity-blog`.
9. Danach `docs/live-pages-map.md` § /pages/science auf den neuen Section-Stack aktualisieren.

## 9. Umsetzung 2026-07-29: Abweichungen vom §7-JSON

**Live gewinnt: §7 oben ist der Entwurfsstand, nicht der Live-Stand.** Bei der Umsetzung
wurden gegen die Sections, das CSS und die Live-Seiten 8 Blocker verifiziert. Was davon
abweicht und warum:

**Compliance (§6 schlägt §7, §6 ist laut eigener Ansage nicht verhandelbar)**

| Stelle | §7 sagte | Live steht | Grund |
|---|---|---|---|
| `genetik` body, 3. Absatz | „wofür du anfällig bist, etwa für stille Entzündung. Ob sich das gerade auf dein Tempo auswirkt, verrät der epigenetische Wert." | „Die Anlagen zeigen, worauf du bei dir achten solltest, der epigenetische Wert, wie schnell du gerade alterst." | Benannte einen pathologischen Prozess und behauptete dessen aktuelle Aktivität. Verstößt gegen §6 „Veranlagung, nie Diagnose" und gegen „epigenetisch das biologische Alter als **Gesamtwert**" |
| `grundlage` headline | „Ein Arzt prüft die Auswertung." | „Ein Arzt prüft die Inhalte." (= Live-Bestand) | „die Auswertung" liest sich als individuelle ärztliche Befundprüfung. Nicht belegt, und `/pages/aerzte` schließt „Individuelle Beratung und Diagnose" ausdrücklich aus |
| `validierung` Fakt 2 + FAQ q1 | „2.000+ / Gesunde Kohorte / 14 bis 97 Jahre" | „2.600+ / Validierungskohorte / An ihr wurde die Uhr geprüft." | 2.000+ und die Altersspanne haben **keine Quelle**. Dokumentiert ist nur „validiert an >2.600 Personen" (Preprint der Uhr-Firma). BJ-Entscheid 29.07. |
| `science-epigenetik-alter.svg` | Kurve knickte nach „heute" zur Erwartungslinie zurück und schloss 83 % des Rückstands, offener Punkt „in 6 Monaten" | Kurve endet bei „heute", kein Zukunftspunkt | War ein Wirkversprechen ohne Intervention und ohne Beleg, und widersprach der freigegebenen Copy in #4 („siehst, **ob** … ihn bewegt haben"). §2 bestellt für dieses Asset ohnehin nur „Kurve + Zonen" |
| `epigenetik` body | „Nach sechs Monaten misst **du** erneut" | „Wer nach sechs Monaten erneut misst, sieht …" | Setzte die Zweitmessung als Teil des Kaufs, während #8 „349,00 € · einmalig" ausweist. Repo: Retest ist eine Empfehlung, kein Lieferumfang |
| `grundlage` cta_label | „Mehr zu Prof. Limmroth" | „Zur ärztlichen Leitung" | §6 verlangt für Limmroth immer den vollen Titel. Für ein CTA-Label zu lang, also Name vermeiden (steht direkt darüber im Experten-Block) |

**Craft (Regeln, die §7 selbst aufstellt, aber verletzt)**

| Stelle | §7 sagte | Live steht | Grund |
|---|---|---|---|
| `faq` / `mehr` Flächen | faq `#f7f7f4`, mehr `#f2f1ed` (aus dem Live-Template mitgeschleppt) | faq `#f2f1ed`, mehr `#f7f7f4` (Card-Farben mitgedreht) | §5 labelt #9 „warm" und #10 „hell". Heute hält `longevity` den Wechsel zwischen `cta` und `faq`; der Umbau zieht es nach #2, damit stießen zwei gleiche helle Flächen aneinander |
| `umfang` heading/subheading | „187 Reports, verständlich aufbereitet." + „In 22 Kategorien, von Herz bis Stoffwechsel." | „Was der Test alles misst.", keine Subline | „187" stand dreimal, „22 Kategorien" zweimal im selben Viewport, die 88px-Zahlkachel direkt unter einer H2 mit derselben Zahl. Zahlen jetzt nur in der Kachel, wie live erprobt. BJ-Entscheid 29.07. |
| `epigenetik` / `genetik` kicker | „EPIGENETIK" / „GENETIK" | beide leer | Die Seite wurde am 28.07. bewusst auf genau einen Kicker (Hero) reduziert. Die Labels tragen jetzt die SVGs als internes Eyebrow |
| `hero` subheading | „Dein biologisches Alter muss nicht deinem Geburtsjahr entsprechen. Wir messen es, aus einer Speichelprobe." | „Wir messen es, aus einer Speichelprobe von zu Hause." | `lt-science-proof-hero` rendert mit `headline_lg`, die Subline läuft dort auf **H1-Größe**. 14 Wörter in zwei Sätzen sind dort eine Wand |
| `hero` cta_label | „Wie das funktioniert" → `#warum` | „Warum das zählt" → `#warum` | Label versprach das Wie, der Anker landet auf dem Warum. Das Wie beginnt laut §3 erst bei #3 |
| `kombination` subheading | „Der Test verbindet zwei eigenständige Laboranalysen. Zusammen zeigen sie mehr als jede für sich." | „Zusammen zeigen sie mehr als jede für sich." | Lief über drei Zeilen, und der erste Satz wiederholte nur das Heading („Zwei Analysen, eine Probe.") |
| `kombination` Icons k1/k2 | EKG-Linie und Git-Branch-Icon | `lucide:gauge` und `lucide:dna` | Das Git-Branch-Icon ist ein Versionskontroll-Symbol und hat mit Genetik nichts zu tun. Beide Ersatz-Icons waren **vor dem Umbau schon im Template** (für „biologisches Alter" und „genetische Ausgangslage"), §7 hatte sie ohne Grund getauscht |

**Section-Fix außerhalb des Templates**

- `sections/crs-link-cards.liquid`: **Bug, nicht Geschmack.** Der `{% style %}`-Block zielte
  auf `#section-{{ section.id }}`, der Wrapper rendert aber `id="{{ sec_anchor }}"`. Da
  `#10` per `anchor_id: "mehr"` einen Anker setzt, trafen Selektor und Element nicht mehr
  aufeinander und `padding_top` / `padding_bottom` fielen ersatzlos weg. Die Link-Karten
  stießen dadurch direkt an den Footer. Die `sec_anchor`-Zuweisung steht jetzt vor dem
  style-Block, der Selektor ist `#{{ sec_anchor }}`. Betraf **4 Instanzen** in
  `page.science.json`, `page.longevity-coach.json` (live) und `page.science-hub.json`.
  Dasselbe Muster steckt noch in `lt-science-messebenen` und `lt-science-hallmarks`, beide
  ohne Live-Wirkung (404 bzw. von keinem Template referenziert).

- `sections/crs-faq-accordion.liquid`: `.faq-question-text` und `.faq-answer p` hatten
  `font-family: -apple-system, BlinkMacSystemFont, …` hartcodiert, also die System-Schrift
  statt der Theme-Tokens. Das FAQ rendert dadurch sichtbar in einer anderen Schrift als der
  Rest der Seite. Beide auf `var(--font-body)` umgestellt. **Achtung:** theme-weit machen das
  noch **9 weitere Sections**, `crs-faq-accordion` war nur die auf dieser Seite sichtbare.

**Assets und CSS, die der Umbau zusätzlich brauchte**

- Beide neuen SVGs waren auf **viewBox-Breite 900** gezeichnet. Die Media-Box von
  `lt-science-split` gibt aber nur 480px (Desktop) bzw. ~310px (mobil) her, die
  Beschriftungen wären mobil bei 4,5 bis 5,6px gelandet. Beide auf **620** neu gezeichnet,
  das Referenzmaß von `science-healthspan-luecke.svg`. Kleinste Schrift jetzt exakt auf
  Referenzniveau (2,42 % der viewBox-Breite).
- **Illustrationen ohne Hintergrund (BJ-Entscheid 29.07.).** In allen drei `lt-science-split`
  ist `media_bg` = `color_bg` gesetzt, damit die Media-Box unsichtbar wird und die Grafik
  direkt auf der Sectionfläche sitzt (das 32px-Padding bleibt als Inset). Dabei fiel auf:
  sobald die Box weg ist, liest sich **jede Flächentönung im SVG selbst** als grauer Kasten.
  In `science-epigenetik-alter.svg` kachelten die zwei Zonen-Polygone zusammen ein volles
  Rechteck, beide sind entfernt. Die Zonen tragen jetzt nur noch die Beschriftungen plus die
  gestrichelte Erwartungslinie, wie in der Referenz `science-healthspan-luecke.svg`, die
  ebenfalls ohne jede Flächentönung auskommt.
- `assets/section-lt-benefits.css`: `grid-template-columns` von `repeat(3, 1fr)` auf
  `repeat(auto-fit, minmax(280px, 1fr))`. Ohne das hätten die zwei Karten von #3 ab 1025px
  Viewport eine leere dritte Spalte (392px Loch) gelassen. Bei 3 und 4 Blöcken rechnerisch
  identisch zu vorher, `/pages/ueber-lifetime` und `/pages/nmn-deutschland` sind unberührt.

**Offen, bewusst nicht angefasst**

- **Fließtext-Kontrast ~4,0:1** in `lt-science-split` (`--crs-text-sec` = `color_text` bei
  Alpha 0.6 auf heller Fläche). WCAG AA fordert 4,5:1. Das ist ein theme-weites Muster,
  keine Regression dieses Umbaus, und ein Fix müsste die geteilten Heading-Tokens anfassen.
- **Hero-CTA-Hierarchie ist invertiert:** `lt-science-proof-hero` verdrahtet cta = solid und
  cta_2 = outline fest im Liquid. Die weiche Scroll-CTA steht damit optisch über der Kauf-CTA.
  §5 #1 will das so, es ist kein Versehen, aber ohne Code-Eingriff auch nicht umschaltbar.
