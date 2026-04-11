# Blueprint V2: `homepage.json`
## LIFETIME Longevity & Health — Homepage

**Version:** 2 — Conversion-First Revision
**Zweck:** Aufgabenbeschreibung für Cursor / Entwicklungs-Referenz
**Referenzimplementierung:** `product.13_3_nmn.json`, `product.14_1_test.json`
**Basis:** Homepage-Analyse + Idealstruktur + Conversion-First-Revision (April 2026)

---

## Conversion-Prämisse

**Primäres Ziel dieser Homepage: Kauf des AGE & DNA Tests (349 €).**
Sekundäres Ziel: Kauf von NMN / Supplementen.
Tertiäres Ziel: E-Mail-Capture für Retargeting.

Jede Section wird an einer einzigen Frage gemessen:
**„Bringt diese Section den Besucher näher an den Kauf?"**

Wenn nicht — kürzen, verschieben oder streichen.

### Conversion-Architektur-Prinzipien

1. **Früh kaufbar machen.** Der erste CTA erscheint im Hero. Der zweite im Loop (Section 3). Der dritte beim Hauptprodukt (Section 4). Kein langer Erzählbogen ohne Kaufmöglichkeit.
2. **Einwände in Kaufreihenfolge lösen.** Was kauft der Besucher nicht? → Ergebnis unklar (Section 4), nicht glaubwürdig (Section 5+6), Prozess unklar (Section 8). Die Sektionsreihenfolge folgt der Einwands-Hierarchie.
3. **Jede Section hat einen Job — und einen Ausgang.** Jede Section endet entweder mit einem CTA oder führt direkt in die nächste Sektion ohne Reibung.
4. **Social Proof kommt unmittelbar nach dem Produkt.** Wer den Preis sieht, braucht sofort Bestätigung. Nicht erst drei Sektionen später.
5. **Der CTA-Abschluss ist gleichwertig mit dem Hero.** Ohne Section 10 verlässt jeder Scroll-bis-Ende-Besucher die Seite ohne letzten Impuls. Das ist direkter Conversion-Verlust.
6. **Supplemente sind Upsell, nicht Aufmerksamkeitsteiler.** Section 7 darf nie als „wir haben auch noch anderes" wirken. Nur wenn die Verbindung Test → Supplement explizit ist.

---

## Strukturelle Prämisse

**Phase 1 — Kaufbereitschaft schaffen** (Sections 1–3):
Problem benennen → Loop erklären → ersten Kaufimpuls setzen.
Jede Sektion enthält einen Micro-CTA.

**Phase 2 — Kaufentscheidung ermöglichen** (Sections 4–6):
Produkt vollständig darstellen → Einwände durch Beweis lösen → Wissenschaft absichern.
Section 4 ist der primäre Conversion-Block der gesamten Seite.

**Phase 3 — Kaufhemmnis beseitigen** (Sections 7–9):
Supplemente als Konsequenz → Prozess transparent machen → Beratung als Sicherheitsnetz.

**Phase 4 — Letzten Impuls geben** (Sections 10–11):
CTA-Abschluss mit vollem Vertrauen → Footer als institutioneller Anker.

---

## Section-Architektur (finale Reihenfolge)

| # | Section | Typ | Status | Conversion-Job |
|---|---------|-----|--------|----------------|
| 1 | Hero | `crs-hero-typewriter` | Adapt existing | Ersten Kaufimpuls setzen |
| 1b | Trust-Ticker | `lt-hp-trust-ticker` | Build new | Kaufhemmnis reduzieren |
| 2 | Problem — Die Lücke | `lt-hp-problem` | Build new | Kaufbereitschaft erzeugen |
| 3 | Lösung — Der Loop + CTA | `lt-hp-loop` | Build new | Zweiten Kaufimpuls setzen |
| 4 | Hauptprodukt — AGE & DNA Test | `lt-hp-product-hero` | Build new | **Primärer Conversion-Block** |
| 5 | Social Proof + Presse | `lt-hp-social-proof` | Build new | Kaufentscheidung bestätigen |
| 6 | Wissenschaft & Methodik | `lt-hp-science` | Build new | Letzten Zweifel auflösen |
| 7 | Supplemente — Protokoll-Stack | `lt-hp-supplements` | Build new | AOV erhöhen (Sekundärziel) |
| 8 | Journey — So läuft es ab | `lt-hp-journey` | Adapt `lt-pdp-process-steps` | Prozesskonfusion eliminieren |
| 9 | Kostenfreie Beratung | `lt-hp-consultation` | Adapt existing | Hochpreis-Hemmer abfangen |
| 10 | CTA-Abschluss | `lt-hp-cta-close` | Adapt `crs-risk-free-close` | **Letzten Kaufimpuls geben** |
| 11 | Footer | `lt-hp-footer` | Adapt existing | Vertrauen verankern |

---

## Section-Spezifikationen

---

### Section 1 — Hero
**Typ:** `crs-hero-typewriter`
**Status:** Adapt existing
**Liquid-Datei:** `sections/crs-hero-typewriter.liquid`
**Conversion-Job:** Ersten Kaufimpuls setzen. Neugier erzeugen, sofort einen Weg zum Kauf anbieten.

**Goal:**
Spannung in 3 Sekunden. Primärer CTA sofort sichtbar und prominent. Dashboard-Visual rechts macht den Produktnutzen unmittelbar erfahrbar — kein abstraktes Versprechen, sondern ein konkretes Ergebnis-Preview.

**Conversion-Anforderungen:**
- Primärer CTA ist der einzige visuelle Fokuspunkt neben der Headline — keine Ablenkung.
- Dashboard-Visual zeigt Beispielwerte, die Neugier auf die eigenen Werte erzeugen.
- Kein Trust-Ticker im Hero — er unterbricht die Aufmerksamkeit bevor die Botschaft sitzt.
- Sekundärer CTA „Wie es funktioniert ↓" fängt Besucher ab, die noch nicht kaufbereit sind — leitet sie tiefer in die Seite statt sie zu verlieren.

**Was das Liquid bereits kann (direkt nutzbar):**
- Zweispaltiges Layout: Text links, Visual rechts
- Typewriter-Effekt: `heading_before` + animierte Wörter (Blöcke) + `heading_after`
- Eyebrow (`eyebrow`) — entspricht `kicker`
- Subheading (`subheading`) — gleiche Typogröße wie Headline, opacity-gedimmt
- `right_type = "dashboard"` → Alterskarte + animierte Metrik-Bars — ideal für LIFETIME
- Dashboard-Karte: `dash_bio_age`, `dash_chron_age`, `dash_age_label`, `dash_chron_label`
- Metrik-Blöcke mit animierten Bars (`metric_name`, `metric_value`, `metric_color`)
- Responsiv: 2 Spalten → 1 Spalte ab 1024px

**Bestehende Settings-Felder (direkt befüllbar):**
```
eyebrow, heading_before, heading_after, subheading
cta_label, cta_url, cta_icon
right_type: "dashboard"
dash_age_label, dash_bio_age, dash_chron_label, dash_chron_age
padding_top / padding_bottom
```

**Block-Typen:** `animated_word`, `metric`

**Schema-Delta — 3 Ergänzungen notwendig:**

1. **Sekundärer CTA** (Conversion-kritisch)
   ```
   cta_secondary_label    (String)
   cta_secondary_anchor   (String — "#loop")
   ```
   Liquid: `.ltw-btn--ghost` nach primärem Button, wenn `cta_secondary_label != blank`.

2. **Trust-Ticker-Toggle**
   ```
   show_trust_ticker    (Boolean, default: false)
   ```
   Ticker muss als eigenständige Sektion `lt-hp-trust-ticker` existieren.

3. **Hintergrundfarbe per Section**
   Prüfen ob `--hero-bg` lokal überschreibbar. Ggf. `color_bg` ins Schema ergänzen.

**Typewriter-Konfiguration:**
```
heading_before:   "Dein Körper altert"
animated_words:   ["schneller", "langsamer", "anders"]
heading_after:    "als du denkst."
```

**Dashboard-Konfiguration:**
```
right_type:       "dashboard"
dash_age_label:   "Dein biologisches Alter"
dash_bio_age:     "37"
dash_chron_label: "Chronologisches Alter"
dash_chron_age:   "44"
```
Metrik-Blöcke:
```
Langlebigkeit        value: 82   color: "#65c0b6"
Entzündungsprofil    value: 34   color: "#f4b740"
Kognitive Gesundheit value: 71   color: "#65c0b6"
```

---

### Section 1b — Trust-Ticker
**Typ:** `lt-hp-trust-ticker`
**Status:** Build new
**Conversion-Job:** Kaufhemmnis (Preis, Prozess, Vertrauen) direkt nach dem Hero reduzieren.

**Goal:**
4 knapp formulierte Signale, die die häufigsten Kaufbarrieren sofort adressieren. Scrollende Leiste — immer sichtbar, nie aufdringlich.

**Schema-Anforderungen:**
```
Section settings:
  - ticker_speed          (Range — Scrollgeschwindigkeit)
  - color_bg
  - color_text

Block type: "ticker_item"
Block settings:
  - item_text             (String)
  - item_icon             (String — optional, z.B. "🔒")
```

---

### Section 2 — Problem — Die Lücke
**Typ:** `lt-hp-problem`
**Status:** Build new
**Conversion-Job:** Kaufbereitschaft erzeugen. Der Besucher muss das Problem als sein Problem erkennen — nur dann ist er bereit, 349 € für die Lösung auszugeben.

**Goal:**
Nicht informieren — destabilisieren. Wer nach dieser Sektion denkt „Das weiß ich tatsächlich nicht über mich", ist kaufbereit. Wer denkt „interessant, aber nicht relevant für mich" — ist es nicht.

**Conversion-Anforderungen:**
- Stats müssen persönlich wirken, nicht akademisch. Nicht „Studien zeigen" — sondern „du weißt das gerade nicht".
- Kein CTA in dieser Sektion — die Spannung muss unaufgelöst in Section 3 übergehen.
- Heller Hintergrund als harter visueller Schnitt nach dem dunklen Hero — signalisiert Übergang von Emotion zu Fakten.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline

Block type: "stat"
Block settings:
  - stat_value            (String)
  - stat_label            (String)
  - stat_source           (String — Quellenangabe)
```

**3 Stats:** Varianz (15 Jahre), Unsichtbarkeit, Umkehrbarkeit.

---

### Section 3 — Lösung — Der Loop
**Typ:** `lt-hp-loop`
**Status:** Build new
**Conversion-Job:** Zweiten Kaufimpuls setzen. Das Geschäftsmodell muss so klar sein, dass der Besucher versteht: „Ich muss beim Test anfangen." CTA direkt am Ende dieser Sektion.

**Goal:**
Test → Profil → Protokoll als visuelle Mechanik. Nach dieser Sektion muss klar sein: Das ist ein System, kein Shop. Und der Einstieg ist der Test.

**Conversion-Anforderungen:**
- CTA am Ende der Sektion: „Jetzt testen →" — zweiter Kaufimpuls, bevor Section 4 das Produkt vollständig darstellt.
- Limmroth-Zitat hier als Vertrauensbrücke, direkt vor dem zweiten CTA.
- Step 1 (Test) bekommt visuell mehr Gewicht als Step 2 und 3 — er ist der Conversion-Einstieg.
- Step 3 (Protokolle) enthält einen subtilen Link zu den Supplementen — noch kein Upsell, nur Andeutung.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline
  - show_connector_line       (Boolean)
  - cta_label                 (String — Conversion-CTA am Sektionsende)
  - cta_url                   (URL — Link zur Test-PDP)
  - expert_quote, expert_name, expert_title, expert_image_url

Block type: "loop_step"
Block settings:
  - step_number, step_label, step_headline, step_body
  - step_product_name, step_product_url
  - step_is_primary           (Boolean — Step 1 = true, visuell hervorgehoben)
```

---

### Section 4 — Hauptprodukt — AGE & DNA Test
**Typ:** `lt-hp-product-hero`
**Status:** Build new
**Conversion-Job:** Primärer Conversion-Block der gesamten Homepage. Hier wird gekauft oder nicht.

**Goal:**
Vollständige Kaufentscheidungsgrundlage auf einer Sektion. Preis, Lieferumfang, Vertrauen, CTA — alles vorhanden, nichts wegklicken müssen.

**Conversion-Anforderungen:**
- Preis prominent und ohne Umweg sichtbar. Kein „ab X €", kein Verstecken.
- CTA „Jetzt bestellen" ist der visuell dominanteste Button auf der Homepage — außer dem Hero-CTA.
- Eurofins-Badge direkt beim Preis — der stärkste Vertrauensanker beim teuersten Produkt.
- Sample-Report-Link als sekundäre Conversion: Wer noch nicht kauft, soll zumindest sehen was ihn erwartet — das erhöht die Rückkehrwahrscheinlichkeit.
- Feature-Block mit 4 konkreten Deliverables — keine Benefits, keine Versprechen, nur was konkret geliefert wird.
- Kein Abo-Konstrukt, kein Mengenauswahl-Toggle — Einmalkauf, klar und einfach.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline
  - product_image_url
  - product_price             (String — "349,00 €", sichtbar ohne Hover)
  - product_url               (URL — Link zur Test-PDP)
  - cta_label                 (String)
  - show_lab_badge            (Boolean)
  - lab_badge_text            (String)
  - sample_report_url, sample_report_label

Block type: "feature"
Block settings:
  - feature_icon, feature_title, feature_body
```

**4 Features (Deliverables, nicht Benefits):**
1. Biologisches Alter (epigenetische Methylierungsanalyse)
2. 187 DNA-Reports (16 Kategorien)
3. KI Health Coach (personalisierte App-Empfehlungen)
4. Eurofins Laboranalyse (ISO 9001/17025/13485)

---

### Section 5 — Social Proof + Presse
**Typ:** `lt-hp-social-proof`
**Status:** Build new
**Conversion-Job:** Kaufentscheidung bestätigen. Wer Section 4 gelesen und den Preis gesehen hat, braucht sofort Bestätigung von anderen — bevor der Zweifel wächst.

**Goal:**
Konkrete Ergebnisgeschichten + institutionelle Glaubwürdigkeit direkt nach dem Produkt. Kein generisches „super Produkt" — sondern messbare Outcomes anderer Kund*innen.

**Conversion-Anforderungen:**
- Direkt nach Section 4 platziert — kein weiterer Content dazwischen.
- Testimonials mit konkreten Messergebnissen (biologisches Alter vs. chronologisches Alter) — das ist der stärkste Conversion-Treiber, weil es das Produkt-Ergebnis vorwegnimmt.
- Aggregat-Stat groß und zentral — macht die Wirkung skalierbar.
- Presse-Logos (SWR1, Spiegel) als eigene Zeile — institutionelle Legitimation, nicht nur User-Meinungen.
- Kein Karussell — statische Cards bleiben sichtbar und laden keine Interaktion mit sich selbst.
- Kein eigener CTA notwendig — die Energie geht direkt in Section 6 über.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline
  - aggregate_stat_number, aggregate_stat_label
  - show_press_logos          (Boolean)

Block type: "testimonial"
  - quote, name, age, result_metric, verified

Block type: "press_logo"
  - logo_image_url, logo_alt, logo_link_url
```

---

### Section 6 — Wissenschaft & Methodik
**Typ:** `lt-hp-science`
**Status:** Build new
**Conversion-Job:** Letzten Zweifel auflösen. Der skeptische, gebildete Käufer kauft hier oder verlässt die Seite.

**Goal:**
Drei Vertrauenssäulen, die den härtesten Einwand („Ist das seriös?") endgültig lösen. Kein Marketing-Ton — klinisch-editorial, wie der Methodenteil einer Publikation.

**Conversion-Anforderungen:**
- Eurofins-Logo als echtes Asset, nicht nur Textnennung — das Logo allein erhöht Conversion bei informierten Käufern.
- Limmroth mit Foto + vollständigen Credentials — nicht nur ein Zitat.
- PubMed-Links als Vertrauenssignal, nicht als Ablenkung — öffnen in neuem Tab.
- CTA am Ende dieser Sektion: „Jetzt AGE & DNA-Test bestellen" — dritter Kaufimpuls nach Hero und Loop.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline
  - cta_label                 (String — Conversion-CTA am Sektionsende)
  - cta_url                   (URL)

Block type: "science_pillar"
  - pillar_label, pillar_headline, pillar_body
  - pillar_logo_url, pillar_link_url, pillar_link_label

Block type: "expert"
  - expert_name, expert_title, expert_credentials, expert_image_url
```

**3 Säulen:** Eurofins Labor, Prof. Dr. Limmroth, Peer-reviewed Forschung.

---

### Section 7 — Supplemente — Protokoll-Stack
**Typ:** `lt-hp-supplements`
**Status:** Build new
**Conversion-Job:** Average Order Value erhöhen (Sekundärziel). Nur wenn die Test → Supplement-Verbindung explizit und glaubwürdig ist.

**Goal:**
NMN und weitere Produkte als datenbegründete Konsequenz, nicht als Zusatzverkauf. Die Verbindung „Dein Test zeigt, ob du das brauchst" muss in jedem Card-Element spürbar sein.

**Conversion-Anforderungen:**
- NMN als Hero-Card — größer, prominenter, klar als Flaggschiff erkennbar.
- „Test-verknüpft"-Badge auf jeder Karte mit Biomarker-Bezug — macht den Zusammenhang zum Test explizit.
- Kein „In den Warenkorb" als primärer CTA in den Cards — stattdessen „Entdecken" → führt zur NMN-PDP, wo der eigentliche Kauf stattfindet.
- Grid-CTA „Alle Produkte entdecken →" am Ende — für Besucher, die mehr sehen wollen, ohne den Test-Kauf zu unterbrechen.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline
  - cta_label, cta_url

Block type: "supplement_card"
  - is_hero                   (Boolean — NMN = true)
  - product_name, product_tagline
  - product_image_url, product_price, product_url
  - show_test_link_badge      (Boolean)
  - test_link_label           (String)
  - cta_label
```

**Produkte:** NMN Pulver (Hero), NAD+-Booster, Fisetin, CaAKG.

---

### Section 8 — Journey — So läuft es ab
**Typ:** `lt-hp-journey`
**Status:** Adapt `lt-pdp-process-steps`
**Conversion-Job:** Prozesskonfusion als Kaufblocker eliminieren. Zeitangaben sind der wichtigste Conversion-Hebel dieser Sektion — sie lösen das größte Kaufhemmnis bei 349-€-Produkten.

**Goal:**
5 Schritte, die den Ablauf von Bestellung bis Ergebnis vollständig transparent machen. Nach dieser Sektion darf keine Frage zum Prozess mehr offen sein.

**Conversion-Anforderungen:**
- Zeitangaben bei jedem Schritt — „6–8 Wochen" klingt lang, aber kommuniziert verlässlich. Ohne Zeitangabe entsteht Unsicherheit.
- Eurofins-Callout bei Schritt 4 — letztes Vertrauenssignal im Prozessflow.
- 2 Mini-FAQs direkt unter dem Flow: Die zwei häufigsten letzten Einwände before purchase.
- CTA am Ende: vierter und letzter Kaufimpuls vor dem finalen CTA-Abschluss.

**Schema-Anforderungen:**
Identisch zu `lt-pdp-process-steps`. Zusätzlich:
```
  - step_timeframe            (String — pro Step)
  - cta_label                 (String — am Sektionsende)
  - cta_url                   (URL)

FAQ-Block:
  - question, answer          (2 Blöcke)
```

**5 Steps:** Bestellen → Registrieren → Probe entnehmen → Labor → App-Ergebnisse.

---

### Section 9 — Kostenfreie Beratung
**Typ:** `lt-hp-consultation`
**Status:** Adapt existing
**Conversion-Job:** Hochpreis-Hemmer abfangen. Besucher, die nicht direkt kaufen, in eine persönliche Beziehung überführen — aus der heraus Kauf wahrscheinlicher wird.

**Goal:**
Risikofreier Einstieg für Besucher, die 349 € nicht ohne persönliches Gespräch ausgeben wollen. Verfügbarkeitsangabe erzeugt sanfte Dringlichkeit ohne Druck.

**Conversion-Anforderungen:**
- Visuell klar von umgebenden Sektionen abgesetzt — darf nicht im Fließtext untergehen.
- Verfügbarkeitsangabe ist Pflicht — „Nächster Termin: morgen" senkt die Entscheidungsschwelle.
- CTA: „Kostenfreie Video-Beratung buchen" — kein „Mehr erfahren", kein „Kontakt".

**Schema-Anforderungen:**
```
Section settings:
  - color_bg (abweichend — visuell abgesetzt)
  - color_text
  - padding_top / padding_bottom
  - kicker, headline, subheadline
  - cta_label, cta_url
  - show_availability         (Boolean)
  - availability_text         (String)
  - advisor_image_url         (String — optional)
```

---

### Section 10 — CTA-Abschluss
**Typ:** `lt-hp-cta-close`
**Status:** Adapt `crs-risk-free-close`
**Conversion-Job:** Letzten Kaufimpuls geben. Gleichwertig wichtig wie der Hero. Wer hier nicht kauft, verlässt die Seite — das ist die letzte Chance.

**Goal:**
Conviction-Abschluss mit maximaler Dringlichkeit ohne Druck. Alle verbleibenden Einwände in 4 Trust Lines lösen. Zwei CTAs: Primär (Test), Sekundär (Supplemente).

**Conversion-Anforderungen:**
- Dunkler Hintergrund — maximaler visueller Kontrast zur vorherigen Sektion. Dieser Block muss sich wie ein Kapitelwechsel anfühlen.
- Conviction-Headline — kein Produktbeschreibungstext, keine Features mehr.
- Preis nochmals sichtbar — direkt unter der Headline, ohne Suchen.
- 4 Trust Lines decken die häufigsten letzten Einwände ab: Labor, Lieferzeit, Datenschutz, Garantie.
- Primärer CTA deutlich größer als sekundärer — keine Gleichwertigkeit.

**Schema-Anforderungen:**
Strukturell identisch zu `crs-risk-free-close` in `product.14_1_test.json`.
```
kicker, headline, subheading
price_fallback              (String — "349,00 € · einmalig")
cta_label, badge_text
trust_line_1 – trust_line_4
cta_secondary_label         (String — neu)
cta_secondary_url           (URL — neu)
```

---

### Section 11 — Footer
**Typ:** `lt-hp-footer`
**Status:** Adapt existing
**Conversion-Job:** Institutionelle Glaubwürdigkeit als letztes Signal — für Besucher, die alles gelesen haben und noch unsicher sind.

**Schema-Anforderungen:**
Bestehender Footer + Ergänzungen:
```
show_eurofins_logo, show_press_logos
show_email_capture, email_capture_placeholder, email_capture_cta
```

---

## Zusammenfassung: Build / Adapt / Priorität

### Adapt existing — geringer Aufwand
| Section | Typ | Delta | Conversion-Priorität |
|---------|-----|-------|----------------------|
| Hero | `crs-hero-typewriter` | 2 neue Settings + Hintergrundfarbe | Kritisch |
| Journey | `lt-pdp-process-steps` | Timeframe-Feld + CTA + FAQs | Hoch |
| Beratung | Bestehend | Eigene Sektion, Verfügbarkeit | Mittel |
| CTA-Abschluss | `crs-risk-free-close` | Zweiter CTA, Conviction-Ton | Kritisch |
| Footer | Bestehend | Eurofins + Presse-Logos | Niedrig |

### Build new — nach Conversion-Priorität
| Section | Typ | Conversion-Priorität | Blocker |
|---------|-----|----------------------|---------|
| Hauptprodukt | `lt-hp-product-hero` | Kritisch | Keiner |
| CTA-Ticker | `lt-hp-trust-ticker` | Kritisch | Keiner |
| Loop | `lt-hp-loop` | Hoch | Keiner |
| Social Proof | `lt-hp-social-proof` | Hoch | Testimonial-Content (s. Risiko 3) |
| Wissenschaft | `lt-hp-science` | Hoch | Eurofins-Asset (s. Risiko 4) |
| Problem | `lt-hp-problem` | Mittel | Keiner |
| Supplemente | `lt-hp-supplements` | Mittel | is_hero-Flag (s. Risiko 6) |

### Build-Reihenfolge für Cursor (Conversion-optimiert)
1. `lt-hp-product-hero` — primärer Conversion-Block, kein Blocker
2. `lt-hp-trust-ticker` + Hero-Anpassung — sofort nach Produkt wirksam
3. `crs-risk-free-close`-Adapt — CTA-Abschluss fehlt komplett, direkter Verlust
4. `lt-hp-loop` — zweiter Kaufimpuls, Geschäftsmodell-Verständnis
5. `lt-hp-social-proof` — Bestätigung direkt nach Produkt
6. `lt-hp-science` — letzter Zweifel-Löser
7. `lt-hp-problem` — Kaufbereitschafts-Aufbau
8. `lt-hp-supplements` — AOV-Optimierung (Sekundärziel)

---

## Strukturelle Risiken & offene Fragen

### 1. Hero — Sekundärer CTA fehlt im Liquid
Conversion-kritisch: Besucher die nicht sofort kaufen, müssen auf der Seite gehalten werden. `.ltw-btn--ghost` nach primärem Button ergänzen.

### 2. CTA-Abschluss — existiert nicht
Kritischster struktureller Fehler. Jeder Besucher der bis zum Ende scrollt und nicht kauft, verlässt ohne letzten Impuls. Sofort bauen.

### 3. Testimonials — Content-Lücke
Section 5 ist Conversion-kritisch, aber nicht befüllbar ohne konkrete Kundenstories mit Messergebnissen. Redaktionell erstellen oder aus Kundenfeedbacks kuratieren — vor Build klären.

### 4. Eurofins-Logo — Asset-Verfügbarkeit
In 3 Sektionen benötigt (4, 6, Footer). Conversion-relevant weil Logo-Präsenz bei informierten Käufern messbar wirkt. Asset-Pfad in Shopify prüfen.

### 5. Limmroth-Foto — konsistentes Asset
In Section 3, 6 und optionalem Footer. Gleiches Asset, konsistente Qualität.

### 6. NMN Hero-Card — Schema-Flexibilität
`is_hero: true` erfordert abweichendes Layout. Prüfen ob nativ unterstützt.

### 7. Section 4 — kein echtes Buy-Box-Konstrukt
`lt-hp-product-hero` ist ein Link-Button zur PDP, kein vollständiges Buy-Box-Konstrukt wie `lt-pdp-hero`. Das ist bewusst — Homepage-Besucher sollen zur vollständigen PDP geführt werden, nicht direkt in den Checkout. Sicherstellen dass die PDP-Qualität entsprechend hoch ist.

### 8. Micro-CTAs in Sections 3, 6, 8
Jede dieser Sektionen endet mit einem CTA. Das erhöht die CTA-Dichte der Seite. Visuell sicherstellen dass diese Micro-CTAs weniger prominent sind als Hero-CTA und Section 4-CTA — Hierarchie darf nicht verwässert werden.

### 9. Medizinisch-rechtliches Framing
Hero Headline, Testimonials mit Messergebnissen, Wissenschafts-Claims — alle vor Live-Gang juristisch prüfen.

---

## Ästhetische Anforderungen (Design Governance)

Identisch zu `product.13_3_nmn.json` und `product.14_1_test.json`:
- Klinisch-editoriale Tonalität — kein Lifestyle-Brand-Ton
- Opacity-basierte Hierarchie, nicht größenbasiert
- Farbpalette: `#f7f7f4` (bg), `#f2f1ed` (card_bg), `#26251e` (text)
- Hero: dunkler Hintergrund (bestehend)
- CTAs: einheitlicher Button-Style — keine Variationen außer primär/sekundär

---

## Referenz-Dokumente für Cursor

Alle folgenden Dokumente vor Implementierung einlesen:
- `/AGENTS.md`
- `/shopify/AGENTS.md`
- `/docs/pdp-system.md`
- `docs/design-governance.md`
- `.cursor/rules/` (alle Regeln)
- `shopify/templates/product.13_3_nmn.json`
- `shopify/templates/product.14_1_test.json`
- `sections/crs-hero-typewriter.liquid`
- `/docs/homepage-copy-v2.md`
