---
status: living
last_review: 2026-07-29
canonical_for: pdp-refit-briefing-16-alt-pdps
---

# Bau-Briefing: PDP-Refit (Prompt für die ausführende KI)

Alles unterhalb der Trennlinie ist der Prompt. Kopierbar am Stück, oder phasenweise
über die Startbefehle in §9.

Ist-Stand verifiziert am 2026-07-29 gegen Repo, Shopify-Admin-API und Live-Seiten.

---

## Stand der Umsetzung (Stand 2026-07-29, 15:30)

| Phase | Status |
|---|---|
| **0** Nordsterne festnageln | **fertig**, `992c1a0`. Nicht 21, sondern **54** geerbte Werte, weil auch `crs-logo-garden`, `lt-comparison-table`, `crs-metrics-row`, `crs-expert-quotes` und `crs-risk-free-close` erbten. |
| **1** Cross-Cutting-Fixes im Hero | **fertig und live verifiziert**, `b7dc4e1`. Alle sechs. Zusätzlich `compareAtPrice` bei den acht Produkten auf `null` (Shopify-Daten, erledigt). |
| **2** Sections generalisieren + zwei neue bauen | **halb fertig.** Beide neuen Sections stehen und sind gerendert geprüft. Die sechs Generalisierungen aus §6.2 stehen noch aus. |
| **3** Pilot | offen |
| **4–6** | offen |

### Was Phase 2 noch offen hat

- §6.2: `crs-metrics-row` (hartes Dreierraster), `crs-expert-quotes` (Single-Quote),
  `crs-feature-grid` (englische Boilerplate-Defaults „Dedicated guidance"),
  `crs-risk-free-close` (`template.suffix`-Zweige), `lt-pdp-laborwerte` (Schema-`name`).
- `heading_size: "feature"` ist in `lt-pdp-process-steps`, `lt-pdp-report-preview` und
  `lt-pdp-ideal-candidate` **nur im Liquid** ergänzt, die Select-Option fehlt im Schema.
  Das AGE&DNA-Template setzt den Wert bereits. Rendert korrekt, aber der Theme-Editor
  kann ihn beim nächsten Speichern still zurücksetzen.

### Drei Korrekturen an diesem Briefing

1. **§6.3 unterschätzt den Umbau.** Die `rich-text`-Blöcke tragen drei Rollen, nicht eine:
   Lexikon (→ `lt-pdp-wirkprinzip`), Qualitätssicherung (263 Zeichen, wortgleich über
   mehrere Produkte, → `crs-feature-grid`) und Zielgruppe (NAD⁺, → `lt-pdp-ideal-candidate`).
   Wer nur auf Wirkprinzip mappt, verliert zwei Drittel.
2. **§9 Phase 1 greift zu kurz.** `sections/lt-pdp-hero.liquid` trägt zu mehreren Settings
   zusätzlich hartcodierte Liquid-Fallbacks (`settings.X | default: '<derselbe Text>'`).
   Bei `founder_creds` (`:399`), `trust_1` (`:253`) und `guarantee_text` (`:1103`) hätte
   das Ändern des Schema-Defaults allein **nichts** bewirkt. Vor jedem Default-Fix
   `grep -n "settings\.<id> | default:"` laufen lassen.
3. **Phase 0 ist keine einmalige Phase, sondern eine Routine.** Am 29.07. kamen während
   der Arbeit sechs neue `quiz_promo_*`-Settings ins Hero-Schema; die NMN-PDP erbte
   sofort still `quiz_promo_title` „10 % auf deinen AGE & DNA-Test". Nach **jedem** fremden
   Eingriff in ein gemeinsames Section-Schema neu festnageln (`378f861`).

### Offene Entscheidungen für BJ

- „Spiegel Bestseller" steht weiter auf der AGE&DNA-PDP (Template setzt den Wert explizit).
  13 andere PDPs haben ihn durch Phase 1 verloren. Unbelegt laut `limmroth-faktenblatt.md`.
- Pilot Spermidin bringt die Compliance-Frage mit (10 mg gegen zulässige 6 mg, fehlender
  Weizen-Allergenhinweis). Wer sie aus dem Piloten heraushalten will, nimmt Kreatin.
- NAD⁺ hält Verzehrempfehlung und Qualitätstext in Metafeldern (`custom.verzehrempfehlung`,
  `custom.qualitat_produktion`), die übrigen 17 Produkte nicht. Werte müssen ins Template.

---

## Rolle

Du baust die Produktseiten des Shopify-Themes von LIFETIME Health um. Der Shop ist
deutschsprachig, verkauft einen epigenetischen Alterstest (349 €) und Longevity-
Supplements. Repo: `/Users/benediktjunker/lifetime-claude/lifetime-health-theme`,
Theme „Combine" v3.1.1, kein Build-System, reines Liquid.

Zwei Produktseiten sind fertig und gelten als Maßstab. Sechzehn sind es nicht. Dein
Auftrag ist, die sechzehn auf denselben Stand zu bringen: Struktur, Copy, Design.

Du arbeitest an einem Live-Shop. Jeder Push ist sofort öffentlich.

---

## 1. Source of Truth, in dieser Reihenfolge

1. **Der Code im Repo.** Liquid, JSON-Templates, CSS. Lies die echte Datei, rate nie.
2. **Die Live-Seite.** `curl` gegen `https://www.lifetime-health.de/products/<handle>`.
   Wenn Code und Live auseinandergehen, hast du die falsche Datei gelesen.
3. **Diese Datei und die verlinkten Docs.** Beschreibung, nicht Vertrag.

Pflichtlektüre vor dem ersten Edit, in dieser Reihenfolge:

```
CLAUDE.md                                   (Theme-Regeln)
../CLAUDE.md                                (Workspace-Regeln, Drift-Zonen)
docs/pdp-system.md                           (Ist-Reihenfolge beider Nordstern-PDPs)
docs/section-heading-stack.md                (Headline+Subline als ein Block)
docs/conversion-messaging.md                 (Messaging, §9 KI-Tells)
.cursor/rules/design-components.mdc          (Komponenten + Visual-QA)
.cursor/rules/design-tokens.mdc              (Tokens)
.cursor/rules/shopify-rules.mdc              (Plattform-Limits)
docs/lt-pdp-template-notes.md                (Feld-Checkliste je Produkt)
templates/product.nmn-pulver.json            (Nordstern Struktur + Copy)
templates/product.age-dna-test.json          (Nordstern Struktur, Copy mit Vorbehalt)
sections/lt-pdp-hero.liquid                  (3075 Zeilen, trägt den kompletten Kaufpfad)
```

---

## 2. Die zwei Nordsterne, und wo sie sich unterscheiden

**`product.nmn-pulver.json` ist der Maßstab für Copy und System-Disziplin.**
Gemessen über 9 Content-Sections: `heading_size` neunmal `"feature"`, `kicker` neunmal
`"__none__"`, `padding_top`/`padding_bottom` neunmal 80, `content_align` neunmal `"left"`,
Flächen im lückenlosen Wechsel. Null Em-Dashes. Null Dreiklänge.

**`product.age-dna-test.json` ist der Maßstab für Struktur bei erklärungsbedürftigen
Produkten, aber nicht für Copy.** Verifiziert: 12 Em-Dashes im Template, `heading_size`
gemischt (8× `section`, 3× `product_title`), Kicker auf 6 Sections, mehrere Dreiklänge
(„Klinisch analysiert. Verständlich erklärt. Messbar veränderbar.", „Verständlich
aufbereitet. Jederzeit abrufbar. Mit deinem Arzt teilbar."). Das verstößt gegen
`docs/conversion-messaging.md` §9 und gegen die Kicker-Sparsamkeit.

**Konsequenz für dich:** Struktur von beiden lernen. Copy-Muster ausschließlich von NMN.
Kopiere niemals eine Formulierung aus `product.age-dna-test.json`, ohne sie vorher gegen
§5 zu prüfen. Die AGE&DNA-Copy wird separat bereinigt, nicht von dir vervielfältigt.

---

## 3. Ziel-Struktur

### 3.1 Die Kette für ein Supplement

Acht bis zehn Sections. Nicht mehr. Wer eine Section nicht mit echtem Inhalt füllen kann,
lässt sie weg statt sie mit Platzhaltern zu bestücken.

| # | Section | Rolle | Pflicht |
|---|---|---|---|
| 1 | `lt-pdp-hero` | Versprechen und Angebot in einem Block | ja |
| 2 | `crs-logo-garden` | geliehene Autorität, textlos | ja |
| 3 | `crs-feature-grid` | Was dieses Produkt von billigeren unterscheidet, 4 Karten | ja |
| 4 | `lt-pdp-wirkprinzip` *(neu)* | Was der Stoff im Körper tut, max. 3 Stufen, je ein Satz | optional |
| 5 | `lt-pdp-produktfakten` *(neu)* | Zutaten, Nährwerte, Verzehrempfehlung, Pflichthinweis | **ja, siehe G2** |
| 6 | `lt-comparison-table` | Abgrenzung gegen typische Anbieter, 5–6 Zeilen | ja |
| 7 | `crs-customer-reviews` | echte Bewertungen | Gate G3 |
| 8 | `crs-risk-free-close` | Abschluss, Garantie, Preiszeile | ja |
| 9 | `crs-faq-accordion` | Einwände, trägt `FAQPage`-JSON-LD | ja |
| 10 | `main-product` | `"disabled": true`, Parkplatz für App-Blocks | ja |

Optionale Beweis-Slots, jeweils nur wenn das Gate hält (§8):
`lt-pdp-laborwerte` nach #3 (nur mit echtem Prüfbericht),
`crs-metrics-row` nach #3 (nur mit Quellenzeile je Zahl),
`crs-expert-quotes` vor #6 (nur mit echtem produktbezogenem Limmroth-Statement).

Reihenfolge Close vor FAQ ist bewusst, sie folgt NMN. Nicht seitenweise variieren.

### 3.2 Die Kette für ein Test-Produkt (AGE-Folgetest)

Aus dem AGE&DNA-Baukasten, nicht aus dem Supplement-Mold:
`lt-pdp-hero` → `crs-logo-garden` → `lt-pdp-process-steps` → `crs-metrics-row` →
`crs-feature-grid` → `lt-pdp-ideal-candidate` → `crs-faq-accordion` →
`crs-risk-free-close` → `main-product` [disabled].

Achtung: `lt-pdp-process-steps`, `lt-pdp-report-preview` und `lt-pdp-ideal-candidate`
kennen den Wert `"feature"` für `heading_size` **nicht** (nur `section` und
`product_title`). Ein Template-Wert `"feature"` fällt dort still zurück. Schema vorher
nachrüsten.

### 3.3 Was ersatzlos verschwindet

- `text-columns-icons` (auf 14 PDPs, identische Section-ID, vier Trust-Icons). Die Rolle
  erfüllt der Hero über `benefit_1..3_text` und `trust_1..4` bereits näher am Kaufmoment.
- `info-tabs`, `content-toggles`, `rich-text` auf PDPs. Alle drei rendern das Legacy-Snippet
  `section-heading`, das die Subline **kleiner** setzt als den Titel. Das bricht die
  Kernregel aus §4.1, und keine Setting-Kombination heilt es. `content-toggles` liefert
  zusätzlich kein `FAQPage`-Schema.
- `product-recommendations` mit algorithmischen Empfehlungen, `featured-collection`
  („Unsere Bestseller" auf D3K2 ist ein Traffic-Leck kurz vor der FAQ), `marquee`,
  `flex-grid`, `ss-social-proof`, `ss-comparison-table-22`.
- Leere `apps`-Section `1721223701af92f7b4` (0 Blocks) auf Fisetin, Kreatin, Resveratrol.

---

## 4. Design-Kanon

### 4.1 Headline und Subline sind ein Block

Das ist die härteste Regel im System. Kanonisch ist `snippets/section-heading-crs.liquid`:

```liquid
{% render 'section-heading-crs',
  heading: section.settings.heading,
  subheading: section.settings.subheading,
  kicker: section.settings.kicker,
  align: section.settings.content_align,
  extra_class: 'myblock__header'
%}
```

Title und Subtitle laufen in derselben Schrift, derselben Größe, demselben Gewicht,
derselben Zeilenhöhe. Der Unterschied entsteht **ausschließlich** über Farbe und Opacity.
Wenn die beiden wie zwei Hierarchieebenen wirken, ist es falsch gebaut. Lokales
Heading-CSS ist verboten, ebenso `{% render 'section-heading' %}` (Legacy).

Ein längerer Fließtext ist etwas anderes und gehört außerhalb von
`crs-heading-stack__pair`.

### 4.2 Flächen alternieren, ohne Ausnahme

```
Section 1 (Hero)  color_bg #f7f7f4   color_card_bg #f2f1ed
Section 2         color_bg #f2f1ed   color_card_bg #ffffff
Section 3         color_bg #f7f7f4   color_card_bg #f2f1ed
…
color_text überall #26251e
padding_top / padding_bottom überall 80
content_align überall "left"
heading_size überall "feature"   (Ausnahme: Hero trägt headline_lg)
kicker überall "__none__"        (Ausnahme nur mit schriftlicher Begründung)
```

`--text-h1` (36px) ist exklusiv dem Hero-H1 vorbehalten. Alle Section-Headings sind
`--text-h2` (28px). Eine Seite hat genau eine H1.

### 4.3 Never

- Hardcodierte Hex-Werte oder px in neuem CSS, außer den Flächenwerten oben
- `#000000` als Hintergrund
- Neue Font-Familien, Font-Overrides mit `!important`
- Farbige Left- oder Accent-Borders als Dekoration
- Teal (`--color-teal`, `--color-teal-dark`) als Textfarbe, Icon-Farbe oder Label-Farbe.
  Teal ist Links und Garantie-Elementen vorbehalten.
- Layoutmuster, die es in `_examples/` nicht gibt
- Harte Raster wie `repeat(3, 1fr)`, wenn realistisch nur 1–2 Karten gefüllt werden

### 4.4 Always

- Jeder Wert kommt aus einem Token
- Vor dem Bau die nächstliegende Datei in `_examples/` öffnen. Für PDP-Optik ist
  `_examples/pdp-reference.html` der visuelle Nordstern.
- Nach dem Generieren die Visual-Craft-QA aus `.cursor/rules/design-components.mdc`
  laufen lassen, Fehler auflisten, dann erst den korrigierten Code ausgeben

---

## 5. Copy-Kanon

### 5.1 Gemessene Korridore

Aus `product.nmn-pulver.json` gemessen (Zeichen inklusive Leerzeichen):

| Feld | Nordstern-Ist | Dein Korridor | Harte Grenze |
|---|---|---|---|
| `hero_headline` | 27 (NMN), 24 (AGE) | 20–35 | 45 |
| `tagline` | 27 / 51 | 25–45 | 55, genau ein Satz |
| Hero-Bullet | 16–24 | 15–35 | 45, drei Stück |
| Section-`heading` | 11–52, Median 27 | 20–40 | 55 |
| Section-`subheading` | 24–45 | 25–50 | 70, genau ein Satz |
| `intro` / `body` | 95–156 | 90–150 | 170, höchstens dreimal pro Seite |
| Karten-Beschreibung | – | 60–110 | 130 |
| FAQ-Antwort | – | 60–250 | 300 |

Zum Vergleich der Ist-Zustand, den du ersetzt: `hero_headline` liegt heute bei
48 bis 114 Zeichen. NAD⁺ hat 114, B-Komplex 72, CaAKG 71.

Wenn Headline und Tagline dasselbe sagen, streiche die Tagline. Beispiel Spermidin heute:
„Spermidin aus standardisiertem Weizenkeimextrakt." plus „Spermidin aus Weizenkeimextrakt,
unabhängig laborgeprüft." Das ist eine Aussage in zwei Feldern.

### 5.2 Tonalität

Deutsch, Du-Form, durchgehend. Aktuell steht auf vier PDPs Sie-Form (TMG, Resveratrol,
Hyaluron, B-Komplex).

Ruhig, präzise, ohne Verkaufsdruck. Eine Aussage pro Element. Zahl statt Behauptung.
Substanz statt Beteuerung: nicht „wissenschaftlich fundiert und nachprüfbar validiert",
sondern „Prüfbericht der Charge L-25-09126, öffentlich".

### 5.3 KI-Tells, harte Ausschlüsse

| Verboten | Beispiel aus dem Ist-Bestand | Stattdessen |
|---|---|---|
| Em-Dash `—` | „Feuchtigkeit, Elastizität, Gelenkfunktion — von innen." (Hyaluron) | Komma, Punkt, Klammer |
| Dreiklang | „Starke Abwehrkräfte, belastbare Knochen, mehr Vitalität" (D3K2) | ein normaler Satz |
| Leerer Superlativ | „Das kraftvollste Antioxidans, das die Natur entwickelt hat." (Astaxanthin) | „>99 % natürliches Astaxanthin aus *Haematococcus pluvialis*." |
| Claim-Stacking | zwei Badges nebeneinander | genau ein Badge |
| Unbelegter Sozialbeweis | „Über 1.000 zufriedene Kund:innen", `badge_text: "Bestseller"` | echte Loox-Zahl oder nichts |
| Kicker ohne Informationsgewinn | Kicker „Qualität" über einer Qualitäts-Section | `"__none__"` |

Halbgeviertstrich `–` bleibt erlaubt als Bis-Strich („2–3 Werktage"). Bindestriche in
Komposita bleiben erlaubt.

Prüfbefehl vor jedem Push: `grep -c '—' templates/product.<suffix>.json` muss `0` liefern.

Achte zusätzlich auf unsichtbare Zeichen im Bestand: Soft-Hyphen U+00AD in
`05_kreatin` und `11_b-komplex`, Narrow-NBSP U+202F in `04_fisetin`, `07_d3k2`,
`11_b-komplex`. Beim Zeichenzählen und im Diff sind die unsichtbar.

### 5.4 Compliance, nicht verhandelbar

Rechtsrahmen: VO (EG) 1924/2006 Art. 10(1) plus Unionsliste VO (EU) 432/2012.
Gesundheitsbezogene Angaben sind verboten, außer sie sind zugelassen und wortlautnah
verwendet, **unabhängig davon, ob Studien existieren**. Krankheitsbezug (Art. 7 LMIV)
gar nicht thematisieren.

Das Referenzmuster steht bereits im eigenen Bestand, `product.08_schlafspray.json`:
Claim-Satz plus Bedingungssatz direkt aneinander.

> „Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen. Die positive Wirkung stellt
> sich ein, wenn 1 mg Melatonin kurz vor dem Schlafengehen verzehrt wird."

So sieht eine zulässige Wirkaussage aus. Alles andere ist keine.

**Regel:** Für jede stoffbezogene Wirkaussage weist du den zugelassenen Claim-Wortlaut
und die Verwendungsbedingung nach, oder die Aussage entfällt. Es bleiben dann Produktfakten:
Menge, Form, Reinheit, Herkunft, Prüfung. Das reicht für eine gute Seite.

Im Repo existiert **keine** Claim-Liste. Für die meisten Produkte musst du recherchieren
oder die Aussage streichen. Erwartungswert für Spermidin, Resveratrol, CaAKG, Fisetin,
NAD⁺: kein zugelassener Claim, also claimfrei bauen.

Zu bereinigende Bestandsaussagen, alle live:
Astaxanthin „Gut für Herz Kreislauf und Blutdruck", „bekannt als Sonnenschutz von innen",
„Anti-Aging". Hyaluron „Unterstützt Hautelastizität & Faltenbild", „für maximale
Wirksamkeit". TMG „Herz & Gefäße schützen", „Homocystein-Regulation". B-Komplex
„Homocystein-Balance", „Hormonbalance", „innere Unruhe". D3K2 „Gefäßschutz",
„K2 sorgt dafür, dass Calcium in die Knochen gelangt, nicht in die Gefäße".

**NMN-Sonderweg nicht übertragen.** `crs-novel-food` und der Frame „nur zu Forschungs- und
Analysezwecken, nicht zum Verzehr" gelten ausschließlich für NMN. Ebenso die Regel „keine
Reichweite, kein Preis pro Portion" aus `docs/nmn-angebotsarchitektur.md` §3. Für die
übrigen Supplements ist die Verzehrempfehlung dagegen **Pflicht** (NemV).

Offene Produktfragen, die du nicht selbst entscheidest, sondern meldest:
NAD⁺-Booster ist faktisch NMN. Fisetin ist Novel Food. Resveratrol 500 mg liegt über
den zulässigen 150 mg. Spermidin 10 mg liegt über 6 mg und der Weizen-Allergenhinweis
fehlt. CaAKG-Status ungeklärt. Bis zur Klärung claimfrei bauen und den Punkt im
Abschlussbericht nennen.

### 5.5 Autorität

Prof. Dr. med. Volker Limmroth, immer mit Vornamen (es gibt eine Dr. Christina Limmroth).
Belegt sind: Chefarzt Neurologie, Chief Scientific Officer LIFETIME, seit 2006, über 160
PubMed-Einträge, Buch bei Ullstein 2025. Null Longevity-Publikationen.

Der Schema-Default von `founder_creds` behauptet „Spiegel Bestseller" und wird auf
14 von 15 Templates geerbt, weil sie das Feld nicht setzen. Das ist unbelegt.

---

## 6. Section-Inventar

### 6.1 Direkt wiederverwendbar

`crs-logo-garden`, `crs-feature-grid`, `crs-faq-accordion`, `crs-risk-free-close`,
`lt-comparison-table`, `crs-customer-reviews`, `lt-pdp-laborwerte`, `crs-metrics-row`,
`crs-expert-quotes`.

### 6.2 Vor dem Rollout zu generalisieren

| Section | Was | Warum |
|---|---|---|
| `crs-metrics-row` | `repeat(3, 1fr)` durch `data-count`-gesteuertes 1/2/3-Raster ersetzen | Supplements liefern selten drei belegbare Zahlen |
| `crs-expert-quotes` | Single-Quote-Variante ermöglichen | dito |
| `crs-feature-grid` | englische Block-Defaults „Dedicated guidance" / „Deploy AI at scale with professional expertise." entfernen | Fremd-Boilerplate publiziert sich still |
| `crs-risk-free-close` | die zwei `template.suffix`-Zweige durch ein Setting `image_fit` (cover\|contain) ersetzen | wächst sonst auf 16 Zweige |
| `lt-pdp-laborwerte` | Schema-`name` von `NMN PDP Laborwerte` auf `LT Laborwerte` | Section ist nicht NMN-spezifisch, `name` max 25 Zeichen |
| `lt-pdp-process-steps`, `lt-pdp-report-preview`, `lt-pdp-ideal-candidate` | `heading_size`-Option `"feature"` nachrüsten | fällt sonst still zurück |

### 6.3 Neu zu bauen

**`lt-pdp-produktfakten`** (Schema-`name` `LT Produktfakten`, 16 Zeichen)

Der Ersatz für die LMIV-Angaben, die heute in `main-product`-`collapsible_tab`-Blocks
liegen. Ohne diese Section darf `main_product_hidden` nirgends deaktiviert werden.

Settings: Farben und Paddings wie Standard, plus `serving_label` („pro Portion
(2 Kapseln)"), `ingredients_text`, `intake_text`, `legal_note` (Default: „Nahrungsergänzungs-
mittel sind kein Ersatz für eine ausgewogene und abwechslungsreiche Ernährung und eine
gesunde Lebensweise. Außerhalb der Reichweite von kleinen Kindern aufbewahren.").
Blocks: `nutrient` mit `name`, `amount`, `nrv`, max. 12.

Layout: dreispaltig ab 900px auf einer Fläche. Nährwerte als schlichte Definitionsreihe,
Name links, Wert rechts, 1px-Trennlinie, keine Tabellenrahmen. Daneben Zutaten als
Fließtext, daneben Verzehrempfehlung und Rechtshinweis in Sekundärfarbe. Mobil gestapelt.
Bewusst kein Accordion, die Angaben sind Pflicht und sollen sichtbar sein.

**`lt-pdp-wirkprinzip`** (Schema-`name` `LT Wirkprinzip`, 14 Zeichen)

Ersetzt die 616 bis 1041 Zeichen langen `rich-text`-Lexikonblöcke.

Settings: Standard plus `image` / `image_url` (SVGs sind GenericFile und erscheinen nicht
im `image_picker`, deshalb zusätzlich ein Textfeld für die rohe CDN-URL), `image_alt`,
`media_position`, `source_label`, `source_url`.
Blocks: `stage` mit `stage_label` und `stage_body`, max. 3, `stage_body` hart auf etwa
120 Zeichen begrenzt.

Layout: zweispaltig ab 900px. Links Heading-Stack und drei nummerierte Kurzstufen ohne
Karten, nur Whitespace und ein dünner Zahl-Indikator. Rechts eine Bildfläche. Ein Satz pro
Stufe. Die Begrenzung ist der Zweck der Section, nicht ihre Einschränkung.

Beide Sections mit `{% render 'section-heading-crs' %}`, `heading_size: "feature"`,
Farben als CSS-Variablen.

### 6.4 Dormant, aber brauchbar

`crs-guarantee-block` (eigenständige Garantie-Fläche für PDPs ohne Abo),
`crs-social-quotes` (leichtgewichtige Alternative, wenn keine acht echten Reviews
existieren). `crs-timeline` nur mit sehr vorsichtiger Copy, eine Zeitachse ist bei
Supplements schnell ein Wirkversprechen.

---

## 7. Repo-Fallstricke

1. **Template-JSONs beginnen mit einem `/* … */`-Kommentarblock.** `json.load()` scheitert.
   Beim Lesen abschneiden mit `re.sub(r'^\s*/\*.*?\*/', '', s, flags=re.S)`, **beim
   Schreiben wieder voranstellen.**
2. **`order` bestimmt die Reihenfolge, nicht die Schlüsselreihenfolge im `sections`-Objekt.**
   In `product.nmn-pulver.json` steht `main` als letzter Schlüssel und als erster in `order`.
3. **Slug ist nicht Template-Suffix.** `/products/lifetime-nmn` rendert
   `product.nmn-pulver.json`, `/products/nad-booster` rendert `product.12_nad-liposomal-2.json`.
   Vor jedem Edit bestätigen: `query { product(id: "gid://shopify/Product/…") { handle templateSuffix } }`.
4. **Ein Theme-Manager committet und pusht während der Session.** Template-JSONs immer
   zuletzt schreiben, nie ein halb geschriebenes Template liegen lassen, nach jedem
   Schreibvorgang `git status`. Code-Edits und Template-Edits nie in derselben Session.
5. **Stille Defaults publizieren produktfremde Inhalte.** `lt-pdp-hero` erbt bei fehlenden
   Settings unter anderem `benefit_1_text` „>99,9 % NMN-Reinheit — unabhängig laborgeprüft
   in Deutschland", `founder_creds` „Chefarzt Neurologie, Spiegel Bestseller, 20+ Jahre
   Forschung", `sub_discount_percent` 15, `show_value_stack` true, `badge_text` „Bestseller".
   `crs-risk-free-close` erbt `headline` „NMN wirkt — wenn man es durchhält."
   **Regel: in jedem Template jedes Schema-Setting explizit setzen, auch die, die leer
   bleiben sollen.**
6. **`__none__` blendet Felder aus, wird aber nicht überall abgefangen.**
   `crs-faq-accordion` guardet `kicker` und `subheading`, nicht `heading`.
   `lt-comparison-table` guardet nur `kicker`. Dort zum Leeren den Leerstring nutzen,
   sonst steht `__none__` wörtlich als `<h2>` auf der Seite.
7. **Tote Settings nicht kopieren.** `pill_1_once_price_cents` und `pill_1_sub_price_cents`
   stehen im Schema und in allen Templates, werden im Liquid seit dem 18.07. nirgends mehr
   gelesen. Preise kommen aus der Shopify-Variante. `sticky_atc_subline` steht in 13
   Templates, aber weder im Schema noch im Liquid. `cta_label` wird gelesen, steht aber
   nicht im Schema.
8. **Plattform-Limits.** Schema-`name` max. 25 Zeichen, `order` max. 25 Sections,
   `default` nie Leerstring. Harte `max_blocks`: `crs-metrics-row` 3, `crs-feature-grid` 9,
   `crs-faq-accordion` 12, `lt-pdp-laborwerte` 8, `lt-pdp-ideal-candidate` 12,
   `lt-pdp-process-steps` 8, `lt-pdp-report-preview` 6.
9. **Verwaiste Templates liefern weiter aus.** Siehe `docs/live-pages-map.md`. Wer
   Compliance-Copy ändert, prüft sie mit.

---

## 8. Gates

Ein Gate ist eine Bedingung, kein Ermessensspielraum. Hält es nicht, wird die Section
weggelassen, nicht mit Platzhaltern gefüllt.

| Gate | Bedingung |
|---|---|
| **G1** | Bevor du einen Schema-Default in `sections/*.liquid` änderst, trägst du den bisher geerbten Wert in `product.nmn-pulver.json` und `product.age-dna-test.json` explizit ein. Sonst ändern sich die Nordsterne still mit. |
| **G2** | `"disabled": true` auf `main_product_hidden` nur, wenn `lt-pdp-produktfakten` auf derselben Seite live ist und Zutaten, Nährwerte und Verzehrempfehlung dort sichtbar gegengeprüft wurden. Die Blöcke tragen je Seite rund 7 KB einzigartigen Content, für den es kein Fallback gibt. |
| **G3** | `crs-customer-reviews` nur mit echten Bewertungen aus Loox. Kein `lt-pdp-laborwerte` ohne existierenden Prüfbericht (der Filestore enthält aktuell genau zwei, beide NMN). Kein `crs-metrics-row` ohne Quellenzeile je Zahl. Kein `crs-expert-quotes` ohne echtes produktbezogenes Limmroth-Statement. |
| **G4** | Jede Wirkaussage ist einem zugelassenen Claim mit Wortlaut und Verwendungsbedingung zugeordnet, oder sie ist gestrichen. |
| **G5** | Nach jeder Welle Anti-Schablonen-Test über alle bis dahin fertigen `hero_headline` und `tagline` nebeneinander: kein Wort eröffnet mehr als zwei Werte, höchstens vier stehen in derselben Satzform. |
| **G6** | Code-Edits und Template-Edits nie in derselben Session. Templates zuletzt. |

---

## 9. Arbeitsreihenfolge

Weder rein vertikal noch rein horizontal. Horizontal ist richtig für den **Code**, weil eine
Datei dreizehn Seiten trägt. Vertikal ist richtig für die **Copy**, weil sich das Muster nur
an einer fertigen Seite beweisen lässt.

### Phase 0 — Nordsterne festnageln

In `product.age-dna-test.json` und `product.nmn-pulver.json` die bisher geerbten Werte
explizit eintragen: bei AGE&DNA `founder_creds` und `trust_1..4_icon_name`, bei NMN
`coa_purity_label`, `coa_link_label` sowie den `heading`- und `status_*`-Block von
`crs-novel-food`. Danach Live-Diff beider Seiten: null sichtbare Änderung.

Voraussetzung für Phase 1. Ohne sie verändert jeder Default-Fix die Nordsterne mit.

### Phase 1 — Cross-Cutting-Fixes in `sections/lt-pdp-hero.liquid`

Eine Datei, Wirkung auf 13 Alt-PDPs und beide Nordsterne. Reihenfolge innerhalb der Phase
egal, alles zusammen pushen.

1. **Erfundene Bewertung entfernen.** `:494-526` setzt bei fehlenden Loox-Metafeldern
   `lt_star_val = 4.7` und schreibt „227 Produktbewertungen". Das steht heute live auf
   `/products/lifetime-age-folgetest`. Korrektur: bei `lt_count == 0` die Rating-Zeile gar
   nicht rendern.
2. **Ausverkauft abbilden.** `:1066` setzt nur die CSS-Klasse `disabled`, kein
   `disabled`-Attribut; das Label kommt aus `:278` `default: 'Jetzt kaufen →'`. Live auf
   `/products/astaxanthin-kapseln` (Bestand 0) steht im Hero „Jetzt kaufen →", während der
   Combine-Button darunter korrekt „Ausverkauft" zeigt. Label aus `product.available`
   ableiten, echtes `disabled`-Attribut setzen.
3. **Roten Rabatt-Chip ohne Rabatt abstellen.** `:1530` `const subSaleActive = subRegular > subC;`
   ist bei `compare_at_price == price` immer wahr, weil `:266` den Abo-Preis mit `× 0.90`
   rechnet. Der Chip kippt dann von grün (`--strong`) auf rot (`--sale`, `--color-promo`
   `#E85D5D`). Betroffen sind acht Produkte: TMG, Resveratrol, CaAKG, D3K2, Schlafspray,
   Astaxanthin, Hyaluron, B-Komplex, jeweils compare_at gleich price. Bedingung härten auf
   `subRegular > onceC`. Zusätzlich `compareAtPrice` in Shopify bei den acht auf `null`
   setzen.
4. **`founder_creds`-Default auf leer.** Chips ausblenden statt „Spiegel Bestseller"
   behaupten. Belegte Chips kommen später pro Template.
5. **Em-Dashes aus den Schema-Defaults** von `benefit_1_text`, `trust_1`, `guarantee_text`
   sowie aus dem `headline`-Default von `crs-risk-free-close`.
6. **`sub_discount_percent`-Default von 15 auf 10.** Nur nach Phase 0, sonst kippt NMN.

Danach Live-Verifikation per `curl` auf `/products/betain-tmg-kapseln`,
`/products/astaxanthin-kapseln`, `/products/lifetime-age-folgetest` und beide Nordsterne.
Erst dann Phase 2.

### Phase 2 — Sections generalisieren und die zwei neuen bauen

§6.2 und §6.3. Reine Code-Session.

### Phase 3 — Pilot, eine PDP komplett

**Empfehlung: Spermidin** (`product.02_spermidin.json`). Es hat drei strukturidentische
Zwillinge (CaAKG, Fisetin, Resveratrol teilen die Section-Keys `rich_text_6FYHUN`,
`rich_text_FinDkV`, `rich_text_qrirA8`), keinen Prüfbericht (erzwingt die Entscheidung über
den Beweis-Ersatz einmal statt viermal), wenige Reviews (erzwingt das Review-Gate) und eine
offene Compliance-Frage (Dosis, Weizen-Allergenhinweis), die ohnehin beantwortet werden
muss. Wer den Compliance-Blocker aus dem Piloten heraushalten will, nimmt stattdessen
Kreatin.

Hier fallen die Entscheidungen, die dreizehnmal gelten. Der Pilot ist erst fertig, wenn er
diese vier Artefakte produziert hat:

- `_examples/templates/product.supplement-reference.json` plus Zeile in `_examples/README.md`
- `docs/pdp-copy-deck.md` mit den gemessenen Korridoren und je zwei Beispielen pro Feld
- Hero-Setting-Matrix: die rund 65 Keys sind über alle Supplement-Templates identisch,
  also einmal als Tabelle befüllbar
- Gate-Liste für die optionalen Beweis-Slots, je Produkt beantwortet

### Phase 4 — Validierung an NAD⁺

`product.12_nad-liposomal-2.json` ist strukturell abweichend: kein `main_product_hidden`,
zwei `ss-*`-Fremdsections, nur 16 statt 65 gesetzte Hero-Settings, `hero_headline` mit 114
Zeichen. Es ist zugleich die umsatzstärkste Nicht-Nordstern-PDP.

**Kipp-Kriterium:** Die Wellen starten erst, wenn NAD⁺ vollständig aus Copy-Deck und
Setting-Matrix befüllbar war und dabei **null** Änderungen an `sections/*.liquid` nötig
wurden. Jede nötige Section-Änderung geht zurück in Phase 2.

### Phase 5 — Wellen

Pro PDP immer diese Reihenfolge, damit nie ein Halbzustand live steht:
`lt-pdp-produktfakten` füllen und pushen → live gegenprüfen, dass Zutaten und
Verzehrempfehlung sichtbar sind → **erst dann** `"disabled": true` auf
`main_product_hidden` → restliche Kette und Copy.

- **W1 Zwillinge:** CaAKG, Fisetin, Resveratrol. Mitzuerledigen: leere `apps`-Section
  löschen; bei Resveratrol der tote Text „In wenigen Wochen verfügbar" bei 1.139 Stück
  Bestand und die Pulver-FAQ auf einem Kapselprodukt.
- **W2 Info-Tabs-Familie:** D3K2, Schlafspray, Astaxanthin, Hyaluron, B-Komplex. Hier
  liegen die schwersten Copy-Defekte: B-Komplex trägt im Tab „Qualitätssicherung aus DE"
  den Satz „Unser NMN-Pulver wird gemäß GMP…", Astaxanthin die Blutdruck- und
  Sonnenschutz-Claims, vier Seiten Sie-Form. D3K2 zusätzlich `featured-collection` entfernen
  und eine Review-Section nachrüsten.
- **W3 Rest:** TMG (zusätzlich `text-columns-images` und der `moon-bundles`-App-Block),
  Kreatin (Soft-Hyphen in der Headline, Pulver-Grundpreislogik).
- **W4 AGE-Folgetest:** eigene Spur nach §3.2.

### Phase 6 — Bundles

`02_02_bundle_regeneration`, `02_04_bundle_sport`, `02_05_bundle_detox` haben keinen
`lt-pdp-hero`, `main-product` ist dort der Hero mit 16 bis 23 Blocks. Das ist eine Migration,
kein Angleich. Alle drei haben 0 € Umsatz in 180 Tagen. Vor dem Bau die Geschäftsentscheidung
einholen, ob sie bleiben. Der `marquee` mit `color_background_main: "#000000"` fliegt in
jedem Fall.

Unabhängig davon: `product.02_01_bundle_energie.json`, `product.02_03_bundle_schutz.json`
und `product.bundle_01_fokus.json` sind verwaiste Templates ohne aktives Produkt. Prüfen,
dann löschen oder dokumentieren.

---

## 10. Abnahme

Eine PDP ist fertig, wenn alles davon zutrifft. Alles ist maschinell prüfbar formuliert.

**Struktur**
- `order` enthält exakt die freigegebene Liste, jeder Schlüssel existiert in `sections` und
  umgekehrt, Länge ≤ 25
- keine Legacy-Section mehr im `order`: `text-columns-icons`, `rich-text`, `info-tabs`,
  `content-toggles`, `text-columns-images`, `featured-collection`, `ss-*`, `flex-grid`,
  `marquee`
- `main_product_hidden` trägt `"disabled": true`, oder es ist dokumentiert, welcher
  App-Block darin noch gebraucht wird

**Settings**
- Schema-IDs minus Template-Schlüssel ergibt die leere Menge, Ausnahmen benannt
- `grep -c "NMN\|Uthever\|Novel Food\|Limbach\|Wendler\|Longevity-Protokoll"` ergibt 0,
  außer bei NMN
- tote Settings kommen nicht vor (§7.7)

**Copy**
- alle Korridore aus §5.1 eingehalten
- `grep -c '—'` ergibt 0
- kein Kicker gesetzt außer mit Begründung
- keine Zeile aus drei durch Punkt getrennten Fragmenten
- Du-Form durchgehend

**Design**
- Flächen alternieren lückenlos, `color_card_bg` je eine Stufe heller
- alle Content-Sections `heading_size: "feature"`, `content_align: "left"`,
  `padding_top` und `padding_bottom` 80, `color_text: "#26251e"`
- keine hardcodierten Hex-Werte in neuem CSS außer den Flächenwerten
- kein `border-left` mit Farbwert

**Daten**
- `show_subscription_toggle: true` nur, wenn das Produkt Selling Plans hat
- `sub_discount_percent` entspricht dem echten Appstle-Rabatt
- `bb_supply_days_fallback` ist die reale Reichweite, mit Rechnung
- `show_rating` nur bei echten Reviews
- `coa_url` ist entweder eine erreichbare PDF-URL (HTTP 200 geprüft) oder leer

**Render**
- `curl` auf die Live-Seite:
  `grep -o 'id="shopify-section-[a-zA-Z_0-9-]*"'` liefert exakt die `order`-Liste ohne
  die deaktivierten, in derselben Reihenfolge
- kein `__none__` im gerenderten HTML
- null Liquid-Fehler, null JS-Fehler in der Console
- bei 375px Breite: Hero-H1 höchstens drei Zeilen, keine horizontale Scrollleiste,
  Buy-Box ohne Überlauf
- ein ATC-Klick erzeugt einen Warenkorb mit korrektem `selling_plan` beim Abo und ohne
  beim Einmalkauf

**Doku**
- `docs/pdp-system.md` und `docs/lt-pdp-template-notes.md` nachgezogen, `last_review` gebumpt
- jede neue Section hat einen Header-Kommentar mit Zweck, bewussten Abweichungen und Datum
  (Muster: `sections/lt-pdp-laborwerte.liquid:42-62`)

---

## 11. Was du nicht tust

- Keine vollständigen Rewrites, keine neuen Designsysteme. Minimale, inkrementelle Änderungen.
- Keine Layoutmuster erfinden, die es in `_examples/` nicht gibt.
- Keine Section mit Platzhaltern füllen, damit die Kette vollständig aussieht.
- Keine Copy aus `product.age-dna-test.json` übernehmen, ohne sie gegen §5 zu prüfen.
- Die NMN-Kategorie-Inkonsistenz nicht „korrigieren". Dass die NMN-PDP „nur zur Forschung"
  sagt und der Katalog „Nahrungsergänzungsmittel", ist eine getroffene Entscheidung vom
  23.07.2026.
- Nichts löschen, ohne vorher nachzusehen, was daran hängt. Das gilt besonders für
  `main_product_hidden`.
- Bei offenen Produktfragen (§5.4) nicht selbst entscheiden, sondern claimfrei bauen und
  melden.

---

## 12. Startbefehle

Ein Befehl pro Session. Immer zusammen mit dieser Datei.

```
Lies docs/briefing-pdp-refit.md vollständig, dann §9 Phase 0. Trage die geerbten Werte
in den beiden Nordstern-Templates explizit ein. Danach Live-Diff beider Seiten und
Bericht, ob sich etwas sichtbar geändert hat.
```

```
Lies docs/briefing-pdp-refit.md vollständig, dann §9 Phase 1. Arbeite die sechs
Cross-Cutting-Fixes in sections/lt-pdp-hero.liquid ab. Vor jedem Fix die betroffene
Stelle zitieren, nach dem Push per curl gegen die vier genannten Live-Seiten verifizieren.
Phase 0 muss abgeschlossen sein.
```

```
Lies docs/briefing-pdp-refit.md vollständig, dann §6.2 und §6.3. Generalisiere die
sechs Sections und baue lt-pdp-produktfakten und lt-pdp-wirkprinzip. Vor dem Code-Output
die Visual-Craft-QA aus .cursor/rules/design-components.mdc laufen lassen.
```

```
Lies docs/briefing-pdp-refit.md vollständig, dann §9 Phase 3. Baue product.02_spermidin.json
komplett um. Liefere am Ende die vier Artefakte aus Phase 3. Halte die Gates aus §8 und
die Abnahme aus §10 ein.
```

```
Lies docs/briefing-pdp-refit.md vollständig, dann §9 Phase 5, Welle W<n>. Nutze
_examples/templates/product.supplement-reference.json und docs/pdp-copy-deck.md. Pro PDP
die Reihenfolge aus Phase 5 einhalten. Am Ende der Welle den Anti-Schablonen-Test G5.
```
