# Blueprint V3: `product.14_1_test.json`
## LIFETIME AGE & DNA TEST — Diagnostic / High-Trust PDP

**Version:** 3 — konsolidiert mit vollständiger Produktbasis (Extraktion v2)
**Zweck:** Aufgabenbeschreibung für Cursor / Entwicklungs-Referenz
**Referenzimplementierung:** `product.13_3_nmn.json`
**Produktdaten-Basis:** `lifetime-age-dna-pdp-extraktion-v2-whitelabel.md`

---

## Kontext & Abgrenzung

Dieser Blueprint beschreibt eine **Diagnostic / High-Trust PDP** — einen eigenständigen Template-Typ.
Nicht behandeln als: NMN-PDP mit anderem Text.

### Produktfakten
- **Produkt:** LIFETIME AGE & DNA-Test
- **Preis:** 349,00 € — Einmalkauf, kein Abo
- **Probenentnahme:** Speichelprobe zuhause (nicht-invasiv, Home Collection)
- **Methodik:** DNA-Analyse (24+ Bereiche) + Epigenetik (10-CpG-Uhr, MethylPace) in einem Test
- **Ergebnis-Medium:** App (alle Reports, AI Health Coach, Face Scan)
- **Re-Test-Empfehlung:** alle 6 Monate

### Was der Kunde erhält
1. Testkit (Speichelröhrchen, Anleitung, vorfrankiertes Rückkuvert)
2. Laboranalyse — DNA (24+ Reportbereiche)
3. Laboranalyse — Epigenetik (Biological Age, MethylPace, Immunoscore, Inflammation, Muscle Degeneration)
4. Personalisierter Report in der App
5. AI Health Coach
6. Face Scan

### Customer Intent (vs. NMN)
Nicht: „Ich will dieses Supplement starten."
Sondern:
- „Ich will verstehen, wie ich biologisch altere."
- „Ich will dem Prozess und der Wissenschaft vertrauen."
- „Ich will sehen, was ich konkret erhalte."
- „Ich will wissen, was ich mit den Ergebnissen tue."
- „Ich will das Gefühl haben, dass das medizinisch glaubwürdig ist — kein Gadget."

---

## Strukturelle Prämisse

**Phase 1 — Orientierung** (Sections 1–3): Was ist das, wer steht dahinter, wie funktioniert es?
**Phase 2 — Substanz** (Sections 4–8): Was bekomme ich, wie tief ist das, warum ist es anders, wie sieht es aus, wer bestätigt es?
**Phase 3 — Entscheidung** (Sections 9–12): Was sagen andere, ist das für mich, was bleibt unklar, jetzt kaufen.

Die App ist kein Zusatz-Feature — sie ist das primäre Ergebnismedium. Die Seite kommuniziert: Der Kauf des Testkits ist der Einstieg in eine App-gestützte Gesundheitsplattform.

---

## Section-Architektur (finale Reihenfolge)

| # | Section | Typ | Status |
|---|---------|-----|--------|
| 1 | Hero | `lt-pdp-hero` | Adapt existing |
| 2 | Trust / Media Logos | `crs-logo-garden` | Reuse directly |
| 3 | How It Works | `lt-pdp-process-steps` | **Build new** |
| 4 | What You Receive | `crs-feature-grid` | Adapt existing |
| 5 | What Is Analysed | `crs-metrics-row` | Adapt existing |
| 6 | Why This Test Is Different | `lt-comparison-table` | Adapt existing |
| 7 | Report Preview | `lt-pdp-report-preview` | **Build new** |
| 8 | Expert / Medical Authority | `crs-expert-quotes` | Adapt existing |
| 9 | Reviews | `apps` + `crs-social-quotes` | Reuse / new content |
| 10 | Who This Is For | `lt-pdp-ideal-candidate` | **Build new** |
| 11 | FAQ | `crs-faq-accordion` | Adapt existing |
| 12 | Final CTA Close | `crs-risk-free-close` | Adapt existing |

---

## Section-Spezifikationen

---

### Section 1 — Hero
**Typ:** `lt-pdp-hero`
**Status:** Adapt existing

**Goal:**
Sofortige kategorische Einordnung als Diagnostikprodukt. Preisverankerung bei 349 € durch Value Stack. Der Besucher soll wissen: präzise, medizinisch, mehrwertig.

**Settings-Anpassungen gegenüber NMN:**
- `show_value_stack: true` — aktivieren (NMN hat `false`)
- Subscription-Toggle (`bb_sub1_*`) — deaktivieren / leer lassen
- `bb_or_label` — nicht benötigt
- `pill_1_*` — Einmalkauf, keine Mengenauswahl, kein `sub_price`
- `guarantee_text` / `guarantee_popup_body` — Prozessgarantie statt 30-Tage-Geld-zurück (neue Probe bei ungültigem Ergebnis)
- `trust_3` — kein Abo-Hinweis, stattdessen: Ergebnis-Lieferzeitraum oder Labor-Signal

**Value Stack Felder (alle neu befüllen):**
```
stack_header:          "Was du heute bekommst"
stack_product_sub:     "Speichelprobe · Home Collection · nicht-invasiv"
stack_guide_title:     "DNA-Analyse (24+ Bereiche)"
stack_guide_sub:       "Healthy Ageing, Diet, Sleep, Skin, Mental Health, Cardiac u.v.m."
stack_guide_price:     "Enthalten"
stack_bonus_title:     "Epigenetik-Reports (5 Bereiche)"
stack_bonus_sub:       "Biologisches Alter · MethylPace · Immunoscore · Inflammation · Muscle Degeneration"
stack_bonus_price:     "Enthalten"
```
Hinweis: Schema erlaubt aktuell 2 Stack-Zeilen unter dem Produkt. Wenn App-Features (AI Health Coach, Face Scan) als weitere Zeilen gewünscht sind, muss das Schema erweitert werden.

**Hero Bullets (inhaltliche Richtung — kein fertiger Copy):**
- Bullet 1: Lieferumfang — DNA + Epigenetik + biologisches Alter + personalisierter Report
- Bullet 2: Probenentnahme — Speichelprobe zuhause, nicht-invasiv
- Bullet 3: Labor & App — zertifizierte Laboranalyse, Ergebnisse in der App

**Benefit Icons (3) — Wissensoutcomes:**
- Biologisches Alter kennen
- Genetische Prädispositionen verstehen
- Personalisierte Empfehlungen erhalten

**Trust-Trio:**
- Versand inklusive
- Ergebnisse in [X] Tagen (konkreten Wert einsetzen sobald bekannt)
- Zertifiziertes Labor · klinischer Standard

---

### Section 2 — Trust / Media Logos
**Typ:** `crs-logo-garden`
**Status:** Reuse directly

**Goal:** Institutionelle Glaubwürdigkeit nach dem Hero.

**Änderungen:** Keine strukturellen Änderungen. Kicker ggf. auf medizinische Autorität anpassen.
Logos (RTL, Kölner Stadt-Anzeiger, SWR1, SAT.1, Spiegel Bestseller) unverändert übernehmen.

---

### Section 3 — How It Works
**Typ:** `lt-pdp-process-steps`
**Status:** Build new

**Goal:**
Prozessangst eliminieren. Speichelprobe muss sich einfach, klar und medizinisch glaubwürdig anfühlen. Steht vor den Outcome-Sektionen — Prozess muss klar sein, bevor der Wert landet.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg
  - color_card_bg
  - color_text
  - padding_top / padding_bottom
  - heading
  - subheading
  - kicker

Block type: "step"
Block settings (pro Step):
  - step_number         (String, z.B. "01")
  - step_title          (String)
  - step_body           (String)
  - show_callout        (Boolean)
  - callout_text        (String — für Lab-Glaubwürdigkeitssignal)
```

**5 Steps (inhaltliche Richtung):**
1. Testkit bestellen & erhalten — Lieferung nach Hause, Inhalt des Kits
2. Speichelprobe entnehmen — nicht-invasiv, zuhause, wenige Minuten
3. Probe registrieren & einsenden — App-Registrierung (erste Erwähnung der App), vorfrankiertes Rückkuvert
4. Laboranalyse — zertifiziertes Labor, DNA-Sequenzierung + epigenetische Methylierungsanalyse (10-CpG-Uhr) → Callout mit Zertifizierungsstandard
5. Ergebnisse in der App — alle Reports, AI Health Coach, Face Scan, personalisierte Empfehlungen

**Visuelles Konzept:**
- Nummerierende Schrittfolge, kein Zeitachsen-Layout
- Kein Monatslabels-System wie `crs-timeline`
- Schritte horizontal oder vertikal mit verbindendem Element
- Schritt 4 trägt Callout für Laborstandard
- Schritt 5 kann App-Icons oder -Visual andeuten

**Referenz für Schema-Konventionen:** `crs-timeline` in `product.13_3_nmn.json`

---

### Section 4 — What You Receive
**Typ:** `crs-feature-grid`
**Status:** Adapt existing

**Goal:**
Lieferumfang konkret und vollständig machen. Deliverables-Block — kein Benefits-Block.

**Settings:**
```
heading:     "Was du erhältst"  (Richtung — kein fertiger Copy)
subheading:  Lieferumfang-Subline
columns:     "3"
kicker:      "__none__" oder diagnostischer Kicker
```

**6 Feature-Cards (Struktur: Titel + Body):**

| # | Titel (Richtung) | Body-Richtung |
|---|-----------------|---------------|
| 1 | Biologisches Alter (Epigenetik) | MethylPace-Score, 10-CpG-Uhr, biologisches vs. chronologisches Alter |
| 2 | DNA-Reports (24+ Bereiche) | Healthy Ageing, Supplements, Diet, Sleep, Skin, Mental Health, Cardiac Health u.v.m. |
| 3 | Epigenetische Reports (5) | Immunoscore, Inflammation, Muscle Degeneration, Biological Age — dynamischer Layer |
| 4 | Personalisierter Report in der App | Alle Ergebnisse, verständlich aufbereitet, digital, mit Arzt teilbar |
| 5 | AI Health Coach | Ergebnisse in Klartext, individuelle Empfehlungen für Ernährung, Alltag, Bewegung |
| 6 | Face Scan | Ergänzende digitale Analysefunktion in der App |

Cards 1–3: wissenschaftliche Deliverables
Cards 4–6: App-gestützte Nutzungsschichten
Diese Sequenz kommuniziert: Analyse zuerst, Interface danach.

---

### Section 5 — What Is Analysed
**Typ:** `crs-metrics-row`
**Status:** Adapt existing

**Goal:**
Wissenschaftliche Tiefe durch Zahlen belegen. Methodische Brücke: warum DNA + Epigenetik zusammen aussagekräftiger sind als ein Einzelmarker.

**Settings:**
```
heading:     Analytische Tiefe / klinischer Standard (Richtung)
subheading:  Methodischer Kernsatz — statisches Genom + dynamisches Epigenom
             ("zeigt nicht nur genetische Voraussetzungen, sondern wie Lebensstil
             und Umwelt aktuell auf deine Biologie wirken")
```

**3 Metriken:**

| Metric | Number | Description-Richtung |
|--------|--------|----------------------|
| 1 | 24+ | DNA-Reportbereiche — von Healthy Ageing über Diet, Sleep, Skin bis Cardiac Health |
| 2 | 10 | Epigenetische Schlüsselgene (CpG-Uhr) — Basis des MethylPace-Scores |
| 3 | 5 | Epigenetik-Reports — Biological Age, MethylPace, Immunoscore, Inflammation, Muscle Degeneration |

Der Subheading-Text übernimmt die methodische Kontextualisierung — keine eigene Sektion nötig.

---

### Section 6 — Why This Test Is Different
**Typ:** `lt-comparison-table`
**Status:** Adapt existing

**Goal:**
Kategoriale Einordnung gegen realistische Alternativen. Edukativer Vergleich, kein Wettbewerber-Teardown.

**V1: 3 Spalten**
- Spalte 1: LIFETIME AGE & DNA TEST (hervorgehoben)
- Spalte 2: Standard-Blutbild (Hausarzt)
- Spalte 3: Consumer-Tests & Tracker (23andMe, Wearables — zusammengefasst)

**Zeilen (als Fragen formuliert):**
```
first_row_heading:   "Was wird gemessen?"
second_row_heading:  "Wird biologisches Alter bestimmt?"
third_row_heading:   "Sind Empfehlungen personalisiert?"
fourth_row_heading:  "Wie werden Ergebnisse aufbereitet?"
fifth_row_heading:   "Welcher Laborstandard gilt?"
sixth_row_heading:   "Ist der Verlauf (Re-Test) messbar?"
```

Zeile 6 (Re-Test) ist neu gegenüber NMN — differenzierender Faktor gegenüber Consumer-Kits.

**Post-Launch-Option (nicht V1):** 4 Spalten (Blutbild / DNA-Kit / Wearable getrennt) — Mobile-Risiko, deshalb zurückgestellt.

---

### Section 7 — Report Preview
**Typ:** `lt-pdp-report-preview`
**Status:** Build new

**Goal:**
Letzte Abstraktionsbarriere entfernen. App als primäres Ergebnismedium zeigen — nicht beschreiben.

**Schema-Anforderungen:**
```
Section settings:
  - color_bg, color_card_bg, color_text
  - padding_top / padding_bottom
  - heading, subheading, kicker
  - layout_variant: "two-col" | "full-width-annotated"

Block type: "callout"
Block settings:
  - callout_label     (String — kurzes Label, z.B. "Biologisches Alter")
  - callout_body      (String — was dieser Report-Bereich zeigt)
  - position_x        (optional — für Overlay-Variante)
  - position_y        (optional — für Overlay-Variante)

Additional settings:
  - app_visual        (Image — App-Screenshot oder UI-Mockup)
  - retest_note       (String — Re-Test-Hinweis)
  - retest_show       (Boolean)
  - format_note       (String — "Digital · App · PDF-Export · mit Arzt teilbar")
```

**4–5 Callouts:**
1. Biologisches Alter vs. chronologisches Alter (MethylPace-Score)
2. Ein DNA-Reportbereich als Beispiel (z.B. Sleep oder Supplements)
3. Epigenetischer Report als Beispiel (z.B. Immunoscore oder Inflammation)
4. AI Health Coach — wie eine Empfehlung in der App aussieht
5. (Optional) Face Scan als visuell erkennbares Feature

**Re-Test-Hinweis:** dezentes Element in der Sektion — empfehle Test alle 6 Monate für Verlaufsbeobachtung.

**⚠️ ASSET-ABHÄNGIGKEIT — KRITISCHER PFAD:**
Diese Sektion ist ungebaut bis ein App-Screenshot (anonymisiert) oder ein hochwertiges UI-Mockup vorliegt.
- Format: PNG oder WebP, mind. 1200px Breite
- Inhalt: Hauptscreen mit biologischem Alter als primärer Ergebnisgröße
- Ein Screenshot der DNA-Reports-Übersicht
- Ein Screenshot des AI Health Coach
Asset-Produktion muss parallel zum Build beginnen.

---

### Section 8 — Expert / Medical Authority
**Typ:** `crs-expert-quotes`
**Status:** Adapt existing

**Goal:**
Medizinische Glaubwürdigkeit durch externe Autorität. Zitate bestätigen Validität von biologischem Alter als klinischem Konzept und epigenetischer Messung.

**Settings:** Identisch zu NMN-Sektion.

**⚠️ WICHTIG: NMN-Zitate NICHT übernehmen.**
Sinclair- und Huberman-Zitate sind NMN-spezifisch und dürfen hier nicht erscheinen.

**Neue Zitate erforderlich:**
- **Prof. Dr. Limmroth:** Zitat zu diagnostischem Mehrwert biologischer Altermessung oder epigenetischer Analyse (neues Zitat)
- **Externe Stimme:** Zur Validität epigenetischer Clocks / DNA-Methylierung / CpG-basierter Methoden
- **Optional:** Dritte Stimme zur Personalisierung von Longevity-Interventionen auf Basis individueller Genomdaten

---

### Section 9 — Reviews
**Typ:** `apps` (Loox) + `crs-social-quotes`
**Status:** Reuse structurally, new content

**Goal:**
Emotionale Erdung durch echte Nutzererfahrungen vor der Selbstselektion.

**Loox-Block:**
```
reviews_to_display: "product_reviews_only"   ← AGE & DNA TEST Produkt
```

**Social Quotes — Auswahlkriterien für Testimonials:**
- Prozesskomplexität: "Speichelprobe war einfach, klare Anleitung"
- App-Erfahrung: "alles verständlich aufbereitet, ich wusste was die Zahlen bedeuten"
- Emotionaler Moment: biologisches Alter erhalten — Überraschung oder Bestätigung
- Nachgelagerte Handlung: "ich habe meine Supplementierung / Ernährung angepasst"
- Optional: Re-Test-Motivation

Keine generischen Sterne-Testimonials — erzählerisch stärkste Quotes wählen.

---

### Section 10 — Who This Is For
**Typ:** `lt-pdp-ideal-candidate`
**Status:** Build new (oder `crs-feature-grid` als Grundlage)

**Goal:**
Selbstselektion nach emotionaler Erdung. Hilft der richtigen Person sich zu identifizieren, gibt der falschen einen ehrlichen Ausgang.

**Schema-Anforderungen (wenn eigenständige Sektion):**
```
Section settings:
  - color_bg, color_card_bg, color_text
  - padding_top / padding_bottom
  - heading, subheading, kicker
  - show_exclusion_block    (Boolean — für "nicht für dich"-Bereich)
  - exclusion_heading       (String)

Block type: "candidate"
Block settings:
  - candidate_description   (String — Mindset/Situation, keine Demografie)

Block type: "exclusion" (optional)
Block settings:
  - exclusion_text          (String)
```

**Kandidatenbeschreibungen (inhaltliche Richtung — 5 Einträge):**
1. Biologische Baseline vor Start eines Longevity-Protokolls
2. Bereits Supplemente-Nutzer, will Strategie auf Genomdaten personalisieren (direkter Bezug zum Supplements-Report)
3. Verdacht, dass biologisches Alter vom chronologischen abweicht — will wissen in welche Richtung
4. Kennt Blutbilder, sucht anderen Messwinkel — wie Lebensstil auf Zellebene wirkt
5. Will einen Health-Check der in 6 Monaten wiederholbar ist (Re-Test als Motivationsframe)

**"Nicht für dich"-Block (empfohlen):**
- Wer eine medizinische Diagnose für eine spezifische Erkrankung sucht
- Wer kurzfristige Ergebnisse erwartet

**Fallback:** Wenn `crs-feature-grid` als Grundlage ausreicht (Card-Format passt), kein neuer Sektionstyp nötig. Eigenständige Sektion bauen wenn "nicht für dich"-Block separate Layout-Logik erfordert.

---

### Section 11 — FAQ
**Typ:** `crs-faq-accordion`
**Status:** Adapt existing (alle Fragen neu)

**Goal:**
Letzte kaufnahe Reibungsmomente auflösen, unmittelbar vor der Konversion.

**Settings:** Identisch zu NMN-Sektion.

**10 Fragen (Richtung):**
1. Wie entnehme ich die Speichelprobe — was genau ist zu tun?
2. Ist die Speichelprobe medizinisch valide — wie akkurat sind die Ergebnisse?
3. Wie lange dauert es, bis ich meine Ergebnisse sehe?
4. Wie erhalte ich meine Ergebnisse — App oder Download?
5. Sind meine genetischen Daten privat und sicher? Wo werden sie gespeichert?
6. Was ist der Unterschied zwischen genetischem und biologischem Alter?
7. Was mache ich mit den Supplement-Empfehlungen — sind das LIFETIME-Produkte?
8. Kann ich meinen Arzt einbeziehen — kann ich den Report teilen?
9. Ist das eine medizinische Diagnose? (Erwartungsmanagement + rechtliche Einordnung)
10. Wann sollte ich den Test wiederholen — und was ändert sich beim Re-Test?

**Hinweis zu Frage 7:**
Supplement-Empfehlungen basieren auf genetischer Analyse (NMN, Omega-3, Vitamin D, Magnesium u.a.) — indirekter Conversion-Touchpoint zum Supplement-Portfolio, ohne Upsell-Charakter. Formulierung braucht rechtliche Prüfung.

**Hinweis zu Frage 10:**
Etabliert Re-Test-Logik (alle 6 Monate) als Selbstverständlichkeit.

---

### Section 12 — Final CTA Close
**Typ:** `crs-risk-free-close`
**Status:** Adapt existing

**Goal:**
High-confidence close — nicht Risikominimierung, sondern Prozesssicherheit und diagnostische Verlässlichkeit.

**Settings:** Strukturell identisch zu NMN. Produktbild: Testkit (kein Supplement-Beutel).

**Trust Lines (inhaltliche Richtung):**
```
trust_line_1: Zertifiziertes Labor · klinischer Analysestandard
trust_line_2: Ergebnisse in [X] Tagen
trust_line_3: Genetische Daten — DSGVO-konform · sicher gespeichert
trust_line_4: Prozessgarantie — neue Probe bei ungültigem Ergebnis
trust_line_5: Versand inklusive
trust_line_6: Test alle 6 Monate wiederholbar — Verlauf messbar
```

**CTA-Text:** Prozessstartend — kein "in den Warenkorb".
Richtung: "Test jetzt starten" / "Biologisches Alter jetzt messen"

**Ton-Shift gegenüber NMN:**
Von "risk-free retail" → "high-confidence diagnostic"
Wird ausschließlich durch Text-Content realisiert, keine strukturellen Änderungen.

---

## Zusammenfassung: Reuse / Adapt / Build

### Direkt wiederverwendbar
| Sektion | Typ | Anmerkung |
|---------|-----|-----------|
| Trust / Media Logos | `crs-logo-garden` | Keine Änderungen |
| Reviews (Loox) | `apps` | Filter auf AGE & DNA TEST Produkt |

### Adapt existing
| Sektion | Typ | Hauptänderung |
|---------|-----|---------------|
| Hero | `lt-pdp-hero` | Abo deaktivieren; Value Stack (6 Zeilen) aktivieren |
| What You Receive | `crs-feature-grid` | 6 Cards: 3 Analyse + 3 App-Features |
| What Is Analysed | `crs-metrics-row` | Neue Metriken; Subheading = methodische Brücke |
| Why This Test Is Different | `lt-comparison-table` | 3 Spalten V1; Re-Test als neue Zeile |
| Expert Quotes | `crs-expert-quotes` | Neue Zitate — NMN-Zitate nicht übertragbar |
| Reviews (Social Quotes) | `crs-social-quotes` | Neue Testimonials — Prozess, App, Ergebnis-Moment |
| FAQ | `crs-faq-accordion` | Alle 10 Fragen neu |
| Final CTA Close | `crs-risk-free-close` | Trust Lines neu; CTA-Text prozessstartend |

### Neu bauen
| Sektion | Typ | Priorität | Blocker |
|---------|-----|-----------|---------|
| How It Works | `lt-pdp-process-steps` | Hoch | Keiner — direkt startbar |
| Report Preview | `lt-pdp-report-preview` | Hoch | ⚠️ App-Asset erforderlich |
| Who This Is For | `lt-pdp-ideal-candidate` | Mittel | Keiner — ggf. als `crs-feature-grid` |

---

## Strukturelle Risiken & offene Fragen

### 1. Hero Buy Box ohne Subscription-Toggle
`lt-pdp-hero` ist architektonisch um den Subscribe/Once-Split gebaut. Deaktivierung muss auf sauberes Rendering getestet werden — Buy Box darf ohne Abo-Block nicht leer oder strukturlos wirken.

### 2. Report Preview — Asset ist kritischer Pfad
Section 7 ist ungebaut bis App-Asset vorliegt. Schlechter Screenshot beschädigt Vertrauen aktiv. Asset-Produktion parallel zum Build starten.

### 3. Value Stack — Schema-Kapazität prüfen
NMN-Hero hat 2 Stack-Zeilen unter dem Produkt. Für den Test wären 5–6 Zeilen ideal (Testkit, DNA-Analyse, Epigenetik, Report, AI Coach, Face Scan). Prüfen ob Schema erweitert werden muss.

### 4. Comparison Table — 4-Spalten-Variante als Post-Launch-Option
V1 mit 3 Spalten bauen. 4-Spalten (Blutbild / DNA-Kit / Wearable getrennt) hat Mobile-Risiken — dokumentiert für Post-Launch.

### 5. Medizinisch-rechtliches Framing
Hero Headline, Expert Quotes, FAQ 9 (medizinische Diagnose) und Supplement-Empfehlungslogik (FAQ 7) müssen juristisch geprüft werden vor Finalisierung. Claims über epigenetische Altermessung könnten als regulierte Gesundheitsaussagen eingestuft werden.

### 6. Hormone Health — nicht in V1
Im Whitelabel-Material als "coming soon" gekennzeichnet. Nicht in Section 4 oder 5 aufnehmen. Natürlicher Update-Punkt nach Freischaltung.

### 7. Re-Test-Logik — Touchpoint-Konsistenz
Re-Test (alle 6 Monate) erscheint an drei Stellen: Section 7 (visueller Anker), Section 10 (Motivationsframe), FAQ 10 (Selbstverständlichkeit). Konsistenz über alle drei Stellen sicherstellen.

### 8. Supplement-Portfolio-Verbindung
FAQ 7 ist der sauberste Touchpoint für die Verbindung Test → NMN/Supplement-Portfolio. Kein Upsell-Charakter — produktlogisch ehrliche Brücke ("dein Profil zeigt, wie dein Körper auf NMN reagiert"). Formulierung rechtlich prüfen.

---

## Ästhetische Anforderungen (Design Governance)

Identische visuelle Qualität wie `product.13_3_nmn.json`:
- Headline + Subheadline als ein visuelles Objekt
- Opacity-basierte Hierarchie, nicht größenbasiert
- Kontrollierte Zeilenlängen
- Klinisch-editoriale Tonalität — kein Lifestyle-Brand-Ton
- Keine Hype-Sprache, keine Gadget-Ästhetik
- Farbpalette: `#f7f7f4` (bg), `#f2f1ed` (card_bg), `#26251e` (text)

---

## Referenz-Dokumente für Cursor

Alle folgenden Dokumente vor Implementierung einlesen:
- `/AGENTS.md`
- `/shopify/AGENTS.md`
- `/docs/pdp-system.md`
- `docs/design-governance.md`
- `.cursor/rules/` (alle Regeln)
- `shopify/templates/product.13_3_nmn.json` (Referenzimplementierung)
- `lifetime-age-dna-pdp-extraktion-v2-whitelabel.md` (Produktdaten)
