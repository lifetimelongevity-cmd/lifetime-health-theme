# Blueprint V1: `page.science.json`
## LIFETIME Health — Wissenschaft-Seite

**Version:** 1 — Initiale Definition
**Zweck:** Wissenschaftliche Vertrauens- und Argumentationsseite im Hauptmenü (Produkte / Wissenschaft / Meine Routine). Primäre Funktion: Glaubwürdigkeit etablieren, biologischen Zusammenhang zwischen Altersmechanismen, Diagnostik und Produktsystem erklären.
**Referenzimplementierung:** `index.json`, `lt-hp-science.liquid`, `nmn-pdp-v2-science-quality.liquid`
**Basis:** Content-Analyse & strategische Definition (April 2026)

---

## Wissenschafts-Prämisse

**Primäres Ziel:** Wissenschaftliche Glaubwürdigkeit etablieren — LIFETIME als evidenzbasierte Longevity-Marke positionieren, nicht als Supplement-Shop.

**Sekundäres Ziel:** Den biologischen Zusammenhang zwischen Altersmechanismen, Diagnostik und Produktsystem erklären — als Argumentation, nicht als Verkauf.

**Tertiäres Ziel:** Brücke zur Navigation — Überleitung von "Wissenschaft" zu "Meine Routine" mit klarem nächsten Schritt.

### Narrative-Architektur-Prinzipien

1. Die Seite folgt einem einzigen durchgehenden Argument: Biologie → Messen → Handeln → Evidenz → Qualität → Dein Weg
2. Kein Produktkatalog, keine direkten Kaufempfehlungen in den ersten 4 Sektionen
3. Produkte erscheinen erst in Section 4 als dritter Hebel — nach Lebensstil und genetischer Einordnung, nie stattdessen
4. "Kein Wellness-Theater" — alles muss belegbar und präzise sein
5. Du-Form durchgehend (kein Sie)
6. Quellenangaben sichtbar, nie versteckt
7. Design und Layout folgen exakt `index.json` als Referenzimplementierung und den Governance-Regeln des Projekts

---

## Strukturelle Prämisse

**Phase 1 — Fundament (Sektionen 1–2):** Biologische Grundlage legen. Was ist Altern wissenschaftlich? Die 12 Hallmarks als stärkstes Differenzierungsmerkmal gegenüber dem Wettbewerb.

**Phase 2 — Diagnostik (Sektion 3):** Warum Messen der Ausgangspunkt ist. Drei Messebenen im Vergleich — Blutmarker vs. Genetik vs. Epigenetik. AGE & DNA Test einordnen.

**Phase 3 — Intervention (Sektion 4):** Was man tun kann. Drei Hebel pro Mechanismus: Lebensstil, genetische Einordnung, gezielte Unterstützung.

**Phase 4 — Vertrauen (Sektionen 5–7):** Warum LIFETIME. Expert-Autorität, Studien, Qualitätssicherung.

**Phase 5 — Überleitung (Sektion 8):** Brücke zu "Meine Routine".

---

## Section-Architektur (finale Reihenfolge)

| # | Section | Typ | Status | Conversion-Job |
|---|---|---|---|---|
| 1 | Hero | `lt-science-hero` | Build new | Seite kontextualisieren, wissenschaftliche Haltung etablieren |
| 2 | Die 12 Hallmarks of Aging | `lt-science-hallmarks` | Build new | Wissenschaftliche Differenzierung, Tiefe signalisieren |
| 3 | Die drei Messebenen | `lt-science-messebenen` | Build new | AGE & DNA Test einordnen, Mehrwert von Diagnostik erklären |
| 4 | Was du tun kannst | `lt-science-hebel` | Build new | Produkte als dritten Hebel positionieren — nach Lebensstil |
| 5 | Prof. Dr. Volker Limmroth | `lt-hp-science` | Adapt existing | Expertenautorität, Validierungssandwich |
| 6 | Ausgewählte Studien | `lt-science-studien` | Build new | Klinische Evidenz sichtbar machen |
| 7 | Qualitätssicherung | `lt-science-qualitaet` | Build new | Qualitätsversprechen präzise und getrennt nach Produkt belegen |
| 8 | CTA — Meine Routine | `lt-science-cta` | Adapt existing | Überleitung, nächsten Schritt initiieren |

---

## Section-Spezifikationen

### Section 1 — Hero (`lt-science-hero`)

**Typ:** `lt-science-hero`
**Status:** Build new
**Conversion-Job:** Seite positionieren, wissenschaftliche Haltung signalisieren, Skimmer stoppen

**Goal:** Klare, typografische Eröffnung ohne Produktbezug. Setzt den Ton: evidenzbasiert, ruhig, präzise. Keine Hero-Bilder, kein Wellness-Feeling.

**Conversion-Anforderungen:**
- Headline als stärkste visuelle Aussage der Seite
- Subline erklärt in zwei Sätzen den Zweck der Seite
- Kein CTA im Hero (Seite hat Argumentationslogik, kein direkter Kaufdruck am Einstieg)
- Heller Hintergrund, maximale typografische Wucht

**Schema-Anforderungen:**
```
headline:           "Altern ist unvermeidlich. Wie wir altern, ist beeinflussbar."
subheadline:        "Das wissenschaftliche Fundament hinter LIFETIME — Mechanismen, Messungen und Evidenz."
color_bg:           "#f7f7f4"
color_text:         "#26251e"
heading_size:       "page"
padding_top:        120
padding_bottom:     80
```

---

### Section 2 — Die 12 Hallmarks of Aging (`lt-science-hallmarks`)

**Typ:** `lt-science-hallmarks`
**Status:** Build new
**Conversion-Job:** Wissenschaftliche Differenzierung — kein anderes Supplement-Brand in Deutschland kommuniziert auf dieser Ebene

**Goal:** Die 12 biologischen Alterungsmechanismen nach López-Otín et al. (Cell 2023) als visuelles Grid mit je Nummer, Name und Ein-Satz-Erklärung. Quellenangabe sichtbar.

**Conversion-Anforderungen:**
- Kicker + Einleitungstext vor dem Grid
- 12 Kacheln, je: Nummer, Name, Ein-Satz-Erklärung
- Quellenangabe unterhalb des Grids (López-Otín et al., Cell 2023, DOI)
- Grid-Layout: 4 Spalten Desktop, 2 Spalten Tablet, 1 Spalte Mobile
- Heller Hintergrund für Lesbarkeit

**Schema-Anforderungen:**
```
kicker:             "Die Biologie des Alterns"
headline:           "12 Mechanismen. Eine Erkenntnis."
subheadline:        "Altern ist kein einzelnes Ereignis, sondern ein biologischer Prozess — bestimmt durch 12 zentrale Mechanismen in unseren Zellen. Diese Hallmarks of Aging sind die treibenden Kräfte hinter altersbedingten Erkrankungen und Gebrechlichkeit."
source_text:        "López-Otín et al., Cell 2023 · DOI: 10.1016/j.cell.2022.11.001"
color_bg:           "#f7f7f4"
color_text:         "#26251e"
color_card_bg:      "#f2f1ed"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `hallmark`

```
block hallmark_1:   number: "01"   name: "Genomische Instabilität"          body: "DNA-Schäden häufen sich über die Zeit an und stören zunehmend die Zellfunktion."
block hallmark_2:   number: "02"   name: "Telomerverkürzung"                body: "Verkürzte Chromosomenenden verhindern, dass sich Zellen weiter teilen können."
block hallmark_3:   number: "03"   name: "Epigenetische Veränderungen"      body: "Die Genexpression verändert sich — unabhängig von der DNA-Sequenz selbst."
block hallmark_4:   number: "04"   name: "Verlust der Proteostase"          body: "Proteine falten sich falsch und akkumulieren in Zellen."
block hallmark_5:   number: "05"   name: "Mitochondriale Dysfunktion"       body: "Die Energieproduktion in den Zellen wird messbar weniger effizient."
block hallmark_6:   number: "06"   name: "Zelluläre Seneszenz"              body: "Alte Zellen hören auf sich zu teilen und geben schädliche Stoffe ans Gewebe ab."
block hallmark_7:   number: "07"   name: "Deregulierte Nährstofferkennung"  body: "Zellen reagieren nicht mehr richtig auf Nährstoffsignale wie Insulin oder mTOR."
block hallmark_8:   number: "08"   name: "Erschöpfung der Stammzellen"      body: "Der Körper verliert die Fähigkeit, beschädigte Zellen durch neue zu ersetzen."
block hallmark_9:   number: "09"   name: "Veränderte Zellkommunikation"     body: "Die Signalübertragung zwischen Zellen wird mit dem Alter zunehmend gestört."
block hallmark_10:  number: "10"   name: "Chronische Entzündungen"          body: "Anhaltende Entzündungen (Inflammaging) schädigen Gewebe und Organe langfristig."
block hallmark_11:  number: "11"   name: "Beeinträchtigte Autophagie"       body: "Zellen können beschädigte Bestandteile nicht mehr effektiv abbauen und recyceln."
block hallmark_12:  number: "12"   name: "Dysbiose"                         body: "Ungleichgewichte in der Darmflora fördern Entzündungen und systemische Erkrankungen."
```

---

### Section 3 — Die drei Messebenen (`lt-science-messebenen`)

**Typ:** `lt-science-messebenen`
**Status:** Build new
**Conversion-Job:** Mehrwert von Genetik- und Epigenetik-Messung erklären, AGE & DNA Test einordnen

**Goal:** Drei Messansätze vergleichen: Blutmarker (Momentaufnahme), Genetik (Sollbruchstellen & Potenziale — keine Diagnosen), Epigenetik (DNA-Methylierung als Forschungsstandard, Abgrenzung zu Wearables). Abschluss mit klarer Synthese und CTA.

**Conversion-Anforderungen:**
- Drei Kacheln nebeneinander, klar abgegrenzt
- Blutmarker: ehrlich dargestellt — Stärken UND Grenzen
- Genetik: explizit betonen — keine Krankheiten, sondern Sollbruchstellen und Potenziale. Keine Angstmacherei.
- Epigenetik: DNA-Methylierung als Forschungsstandard mit konkreter Abgrenzung zu Wearables (Whoop, Oura etc.)
- Abschluss-Satz als eigenständiger Textblock unterhalb der Kacheln
- CTA: AGE & DNA Test

**Schema-Anforderungen:**
```
kicker:             "Warum Messen der Ausgangspunkt ist"
headline:           "Drei Wege, deinen Körper zu verstehen."
subheadline:        "Nicht jede Messung beantwortet dieselbe Frage. Wer langfristig steuern will, braucht die richtige Perspektive für die richtige Frage."
closing_text:       "Blutmarker zeigen, wo du heute stehst. Genetik zeigt, womit du arbeitest. Epigenetik zeigt, wie gut du bisher gealtert bist — und ist der einzige Marker, an dem Wissenschaftler messen, ob Longevity-Protokolle wirklich wirken."
cta_label:          "AGE & DNA Test entdecken"
cta_url:            "/products/age-dna-test"
color_bg:           "#f2f1ed"
color_text:         "#26251e"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `messebene`

```
block messebene_1:
  label:            "Blutmarker"
  title:            "Momentaufnahme & Frühwarnsystem"
  strength:         "Ideal für: akute Mängel erkennen (Vitamin D, Ferritin, Entzündungsmarker), kurzfristige Reaktionen auf Ernährungsänderungen tracken."
  limitation:       "Werte schwanken stark — je nach Tageszeit, Ernährung, Stress, Schlaf. Kein Bild der biologischen Alterungsrate, kein langfristiger Trend."

block messebene_2:
  label:            "Genetik"
  title:            "Dein biologischer Bauplan"
  strength:         "Zeigt individuelle Sollbruchstellen (wo dein Körper unter Belastung zuerst nachgibt) und Potenziale (wo du günstige Voraussetzungen hast). Kein Befund — eine Grundlage für gezieltes, präventives Handeln."
  limitation:       "Genetische Voraussetzungen sind unveränderlich. Sie erklären die Ausgangslage, aber nicht den aktuellen Zustand oder bisherige Entwicklung."
  note:             "Wir messen keine Krankheiten — sondern individuelle biologische Dispositionen."

block messebene_3:
  label:            "Epigenetik"
  title:            "Biologisches Alter — der Goldstandard"
  strength:         "DNA-Methylierung ist der wissenschaftliche Standard: Wenn Longevity-Forscher testen, ob ein Protokoll das Altern verlangsamt — ob es Intervallfasten, NMN oder ein anderes Supplement ist — messen sie den Effekt über Methylierungsuhren. Dasselbe Verfahren nutzt LIFETIME."
  limitation:       "Kein Frühwarnsystem für akute Mängel — dafür stabiler, langfristiger Orientierungsrahmen."
  note:             "Wearables wie Whoop oder Oura leiten biologisches Alter aus HRV und Schlaf ab — Proxy-Metriken. DNA-Methylierung ist die direkte Messung, wie Wissenschaft Longevity-Protokolle validiert."
```

---

### Section 4 — Was du tun kannst (`lt-science-hebel`)

**Typ:** `lt-science-hebel`
**Status:** Build new
**Conversion-Job:** Produkte als dritten Hebel positionieren — nach Lebensstil und genetischer Einordnung, nie stattdessen

**Goal:** 6 zentrale biologische Mechanismen aus den 12 Hallmarks, je mit drei Handlungsebenen: Ernährung/Bewegung/Lebensstil, genetische Faktoren, zusätzliche Unterstützung. Betont Ehrlichkeit — Produkte sind Ergänzung, nicht Wunderwaffe.

**Conversion-Anforderungen:**
- Einleitungstext mit Prämisse: drei Hebel, nicht einer
- 6 Mechanismus-Blöcke (Grid oder expandierbar)
- Jeder Block: drei klar beschriftete Ebenen — keine Vermischung
- Produktlinks innerhalb der dritten Ebene — dezent, als Hinweis, nicht als CTA
- Responsive: Kacheln gestapelt auf Mobile

**Schema-Anforderungen:**
```
kicker:             "Was du konkret tun kannst"
headline:           "Drei Hebel. Sechs Mechanismen."
subheadline:        "Altern lässt sich nicht aufhalten — aber beeinflussen. Was wirkt, sind selten Einzelmaßnahmen. Die Kombination aus Lebensstil, dem Wissen um deine genetischen Voraussetzungen und gezielter Unterstützung macht den Unterschied."
color_bg:           "#f7f7f4"
color_text:         "#26251e"
label_lifestyle:    "Ernährung & Lebensstil"
label_genetic:      "Genetische Faktoren"
label_support:      "Gezielte Unterstützung"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `hebel`

```
block hebel_1:
  mechanism:        "NAD⁺-Abfall"
  lifestyle:        "Ausdauertraining und Intervallfasten erhöhen NAD⁺-Vorläufer und aktivieren NAD⁺-abhängige Sirtuine messbar. Alkohol und Schlafmangel beschleunigen den Abfall."
  genetic:          "Varianten im NAMPT-Gen beeinflussen die individuelle NAD⁺-Synthesekapazität — manche Menschen produzieren von Natur aus weniger effizient."
  support:          "NMN Pulver · NAD⁺ Booster"
  support_url:      "/products/nmn-pulver"

block hebel_2:
  mechanism:        "Epigenetische Drift"
  lifestyle:        "Kalorienrestriktion, Stressreduktion, Schlafqualität und regelmäßige Bewegung verlangsamen epigenetische Veränderungen nachweislich. Rauchen und chronischer Stress beschleunigen sie."
  genetic:          "Individuelle Methylierungsmuster bestimmen, wie schnell epigenetische Drift fortschreitet — und wie stark Lebensstil-Interventionen bei dir anschlagen."
  support:          "TMG · Vitamin B-Komplex"
  support_url:      "/collections/supplements"

block hebel_3:
  mechanism:        "Zelluläre Seneszenz"
  lifestyle:        "Regelmäßiges intensives Training fördert die Clearance seneszenter Zellen. Kalorienrestriktion und Intervallfasten reduzieren deren Akkumulation langfristig."
  genetic:          "Varianten in Seneszenz-Kontrollgenen (z.B. CDKN2A/p16, TP53) beeinflussen, wie schnell sich seneszente Zellen im Gewebe ansammeln."
  support:          "Fisetin · Spermidin"
  support_url:      "/collections/supplements"

block hebel_4:
  mechanism:        "Mitochondriale Dysfunktion"
  lifestyle:        "Ausdauertraining ist die stärkste bekannte Intervention für mitochondriale Biogenese. Hitze- und Kältereize (Sauna, Kältebad) haben ergänzende Effekte auf mitochondriale Effizienz."
  genetic:          "Mitochondriale DNA-Varianten und nukleäre Gene (z.B. PPARGC1A) beeinflussen die individuelle Energieeffizienz und Regenerationsfähigkeit."
  support:          "Kreatin · CaAKG"
  support_url:      "/collections/supplements"

block hebel_5:
  mechanism:        "Chronische Entzündungen"
  lifestyle:        "Mediterrane Ernährung, Omega-3-reiche Kost, Stressmanagement und ausreichend Schlaf haben die stärkste anti-inflammatorische Evidenz. Übergewicht ist einer der größten Treiber."
  genetic:          "Varianten in Entzündungsgenen (z.B. IL-6, TNF-α, CRP) bestimmen die individuelle Entzündungsneigung — relevant für Ernährungs- und Lebensstilentscheidungen."
  support:          "Trans-Resveratrol · Omega-3 (extern)"
  support_url:      "/collections/supplements"

block hebel_6:
  mechanism:        "Beeinträchtigte Autophagie"
  lifestyle:        "Intervallfasten ist die effektivste Methode zur Autophagie-Aktivierung — bereits 16h-Fasten zeigt messbare Effekte. Ausdauertraining und Proteinreduktion verstärken den Effekt."
  genetic:          "Varianten in Autophagie-Regulatorgenen (z.B. BECN1, ATG7, ATG16L1) beeinflussen die individuelle Kapazität zur zellulären Selbstreinigung."
  support:          "Spermidin · Fisetin"
  support_url:      "/collections/supplements"
```

---

### Section 5 — Prof. Dr. Volker Limmroth (`lt-hp-science`)

**Typ:** `lt-hp-science`
**Status:** Adapt existing
**Conversion-Job:** Expertenautorität als zentrales Trust-Signal, Validierungssandwich

**Goal:** Die bestehende Science-Section der Homepage wird hier zur vollständigen Sektion ausgebaut. Prof. Dr. Limmroth zentral flankiert von Labor- und Forschungs-Pillar. Dunkel als intentionaler Rhythmusbruch nach vier hellen Sektionen.

**Conversion-Anforderungen:**
- Dunkel-Hintergrund (#364f56) — Autoritätssignal
- Drei-Block-Grid: Labor-Pillar | Limmroth | Forschungs-Pillar
- Limmroth: Foto, vollständige Credentials, Zitat, PubMed-Link, Buchhinweis
- Keine Produkte in dieser Sektion
- CTA outline-inverted auf dunkler Fläche

**Schema-Anforderungen:**
```
kicker:             "Wissenschaftliche Grundlage"
headline:           "Kein Wellness-Theater."
subheadline:        "Alle LIFETIME Produkte und Analysen basieren auf peer-reviewed Forschung, klinischen Dosierungen und unabhängig geprüfter Qualität."
color_bg:           "#364f56"
color_text:         "#f7f7f4"
cta_label:          "Forschungsbasis ansehen"
cta_url:            "https://pubmed.ncbi.nlm.nih.gov/"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `pillar`, `expert`

```
block pillar_1:
  label:            "Labor"
  headline:         "Eurofins Genomics"
  body:             "Eines der führenden Genomik-Labore Europas. Der AGE & DNA Test wird unter strengen klinischen Bedingungen analysiert — ISO 9001, ISO 17025, ISO 13485 und GLP-zertifiziert."

block expert_1:
  name:             "Prof. Dr. med. Volker Limmroth"
  title:            "Chefarzt Neurologie · Chief Scientific Officer LIFETIME"
  credentials:      "Neurologe, Longevity-Forscher und Spiegel-Bestseller-Autor. Er hat das wissenschaftliche Fundament von LIFETIME entwickelt und verantwortet die medizinische Qualität aller Produkte und Analysen."
  quote:            "Gesundes Altern beginnt im Inneren — mit unseren Zellen. Wer versteht, wie sein Körper altert, kann gezielt handeln."
  pubmed_label:     "200+ Publikationen auf PubMed"
  pubmed_url:       "https://pubmed.ncbi.nlm.nih.gov/"
  book_label:       "Der Longevity-Kompass — Spiegel-Bestseller"
  image:            "[Bild einfügen: Prof. Dr. Limmroth Portrait]"

block pillar_2:
  label:            "Forschung"
  headline:         "Peer-reviewed Grundlage"
  body:             "Die epigenetische Altersbestimmung basiert auf der 10-CpG-Methylierungsuhr — einem der am häufigsten replizierten Verfahren in der Longevity-Forschung weltweit."
  link_label:       "Forschungsbasis ansehen →"
  link_url:         "https://pubmed.ncbi.nlm.nih.gov/"
```

---

### Section 6 — Ausgewählte Studien (`lt-science-studien`)

**Typ:** `lt-science-studien`
**Status:** Build new
**Conversion-Job:** Klinische Evidenz für Kernwirkstoffe sichtbar machen, ohne zu überwältigen

**Goal:** 6 ausgewählte Studien zu unterschiedlichen Wirkstoffen und Mechanismen — je als Kachel mit Wirkstoff/Mechanismus, Kernergebnis (ein Satz), Quelle und PubMed-Link. Link zu Longevity Guide für vollständige Studienbasis.

**Conversion-Anforderungen:**
- Kicker + Headline + Einleitungstext
- 6 Study-Kacheln: je Wirkstoff/Thema, Kernergebnis, Quelle, PubMed-Link
- Unterhalb: dezenter Link zum Longevity Guide 101
- Grid-Layout: 3 Spalten Desktop, 2 Tablet, 1 Mobile
- Quellenangaben sichtbar auf jeder Kachel

**Schema-Anforderungen:**
```
kicker:             "Klinische Evidenz"
headline:           "Was die Forschung zeigt."
subheadline:        "Eine Auswahl zentraler Studien — ausnahmslos peer-reviewed, ausnahmslos mit direktem Bezug zu Wirkstoffen im LIFETIME Sortiment."
link_label:         "Vollständige Studienbasis im Longevity Guide →"
link_url:           "/pages/longevity-guide-101"
color_bg:           "#f2f1ed"
color_text:         "#26251e"
color_card_bg:      "#f7f7f4"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `study`

```
block study_1:
  topic:            "NMN & NAD⁺-Spiegel"
  result:           "NMN erhöhte NAD⁺-Spiegel bei Erwachsenen mittleren Alters signifikant — ohne relevante Nebenwirkungen."
  source:           "Yi et al., GeroScience 2022"
  url:              "https://pubmed.ncbi.nlm.nih.gov/35037212/"

block study_2:
  topic:            "Epigenetische Altersuhr"
  result:           "Die DNA-Methylierungsuhr misst biologisches Alter präziser als chronologische Daten und gilt als Goldstandard zur Validierung von Longevity-Interventionen."
  source:           "Horvath, Genome Biology 2013"
  url:              "https://pubmed.ncbi.nlm.nih.gov/24138928/"

block study_3:
  topic:            "Spermidin & Gedächtnis"
  result:           "Spermidin-Supplementierung verbesserte kognitive Funktion und Gedächtnisleistung bei älteren Erwachsenen in einer kontrollierten Studie."
  source:           "Wirth et al., Cortex 2018"
  url:              "https://pubmed.ncbi.nlm.nih.gov/29957394/"

block study_4:
  topic:            "Kreatin & Muskelerhalt"
  result:           "Kreatin verlangsamt altersbedingten Muskelabbau und verbessert Kraft sowie funktionelle Leistungsfähigkeit im Alter nachweislich."
  source:           "Candow et al., Nutrients 2019"
  url:              "https://pubmed.ncbi.nlm.nih.gov/31295909/"

block study_5:
  topic:            "Fisetin & zelluläre Seneszenz"
  result:           "Fisetin reduzierte seneszente Zellen in Gewebe und verlängerte die gesunde Lebensspanne im Tiermodell signifikant."
  source:           "Yousefzadeh et al., EBioMedicine 2018"
  url:              "https://pubmed.ncbi.nlm.nih.gov/30279143/"

block study_6:
  topic:            "Resveratrol & Sirtuin-Aktivierung"
  result:           "Trans-Resveratrol aktivierte SIRT1 und verbesserte mitochondriale Funktion und Stoffwechselparameter bei erwachsenen Probanden."
  source:           "Lagouge et al., Cell 2006"
  url:              "https://pubmed.ncbi.nlm.nih.gov/17112576/"
```

---

### Section 7 — Qualitätssicherung (`lt-science-qualitaet`)

**Typ:** `lt-science-qualitaet`
**Status:** Build new
**Conversion-Job:** Qualitätsversprechen belegen — klar getrennt nach Produkt-Typ, kein Overversprechen

**Goal:** Qualitätsaussagen in drei Ebenen: was für alle Produkte gilt, was NMN-spezifisch ist, was der AGE & DNA Test-spezifisch ist. Eurofins gilt nur für den Test, Uthewer und Drittlabor nur für NMN.

**Conversion-Anforderungen:**
- Drei Qualitätsstufen klar strukturiert (nicht gemischt)
- Allgemein: evidenzbasiert, GMP, klinische Dosierung, keine Füllstoffe, 90-Tage-Garantie
- NMN-spezifisch: Uthewer®, Drittlabor-COA pro Charge, Prüfbericht-Download
- Test-spezifisch: Eurofins, ISO-Zertifizierungen
- Vergleichstabelle aus `nmn-pdp-v2-science-quality.liquid` als Basis für NMN-Block

**Schema-Anforderungen:**
```
kicker:             "Qualitätssicherung"
headline:           "Was geprüfte Qualität bei LIFETIME bedeutet."
subheadline:        "Qualitätsversprechen sind leicht gemacht. Wir zeigen, was dahintersteckt — und unterscheiden klar, was für welches Produkt gilt."
color_bg:           "#f7f7f4"
color_text:         "#26251e"
padding_top:        80
padding_bottom:     80
```

**Block-Typen:** `quality_tier`

```
block quality_tier_1:
  label:            "Alle Produkte"
  title:            "Evidenzbasierter Standard"
  items:            "Wirkstoffauswahl ausschließlich auf Basis klinischer Humanstudienlage | Klinische Dosierungen nach Studienstandard — keine homöopathischen Mengen | Klar deklarierte Inhaltsstoffe, keine Füllstoffe oder versteckten Zusätze | GMP-konforme Herstellung | 90-Tage-Garantie ohne Wenn und Aber"

block quality_tier_2:
  label:            "NMN Pulver"
  title:            "Zertifizierter Rohstoff & unabhängige Prüfung"
  items:            "Uthewer® zertifizierter Rohstoff (Reinheit >99%) | Unabhängige Drittlabor-Prüfung jeder Charge | Certificate of Analysis (COA) je Charge downloadbar"
  cta_label:        "Prüfbericht ansehen →"
  cta_url:          "[PDF-Link Prüfbericht NMN]"

block quality_tier_3:
  label:            "AGE & DNA Test"
  title:            "Klinische Laborstandards"
  items:            "Analyse durch Eurofins Genomics — eines der führenden Genomik-Labore Europas | ISO 9001 · ISO 17025 · ISO 13485 · GLP-zertifiziert | Strenge klinische Analysebedingungen"
```

---

### Section 8 — CTA Meine Routine (`lt-science-cta`)

**Typ:** `lt-science-cta`
**Status:** Adapt existing richtext/CTA
**Conversion-Job:** Überleitung von Wissenschaft zu persönlicher Routine, nächsten Schritt initiieren

**Goal:** Ruhiger, logischer Abschluss der Wissenschafts-Seite. Überleitung zu "Meine Routine" (nächster Navigations-Punkt). Sekundär: AGE & DNA Test als Diagnostik-Einstieg.

**Conversion-Anforderungen:**
- Kurzer, prägnanter Abschlusstext (2–3 Sätze)
- Primärer CTA: Meine Routine
- Sekundärer CTA: AGE & DNA Test
- Ruhiger, heller Hintergrund — kein Kaufdruck
- Subtile Referenz auf die Navigationslogik

**Schema-Anforderungen:**
```
headline:           "Du weißt jetzt, wie Altern funktioniert."
subheadline:        "Der nächste Schritt: eine Routine, die zu dir passt. Basierend auf dem, was die Wissenschaft zeigt — und dem, was dein Körper braucht."
cta_primary_label:  "Meine Routine entdecken"
cta_primary_url:    "/pages/meine-routine"
cta_secondary_label: "Mit dem AGE & DNA Test starten"
cta_secondary_url:  "/products/age-dna-test"
color_bg:           "#f7f7f4"
color_text:         "#26251e"
padding_top:        80
padding_bottom:     120
```

---

## Zusammenfassung: Build / Adapt / Priorität

**Adapt existing — geringer Aufwand**

| Section | Typ | Delta | Blocker |
|---|---|---|---|
| 5 — Limmroth | `lt-hp-science` | Blocks erweitern: Zitat, Buchhinweis, Eurofins-Text auf Test präzisieren | Kein Blocker |
| 8 — CTA | Richtext-Basis | Neue Copy, dualer CTA | Kein Blocker |

**Build new — nach Conversion-Priorität**

| Section | Typ | Conversion-Priorität | Komplexität |
|---|---|---|---|
| 1 — Hero | `lt-science-hero` | Hoch — setzt Ton der gesamten Seite | Gering |
| 2 — Hallmarks | `lt-science-hallmarks` | Hoch — stärkstes Differenzierungsmerkmal | Mittel |
| 3 — Messebenen | `lt-science-messebenen` | Hoch — begründet AGE & DNA Test | Mittel |
| 4 — Hebel | `lt-science-hebel` | Mittel — Produktbrücke | Hoch |
| 6 — Studien | `lt-science-studien` | Mittel — Evidenz sichtbar machen | Mittel |
| 7 — Qualität | `lt-science-qualitaet` | Mittel — Trust-Abschluss | Gering |

---

## Strukturelle Risiken & offene Fragen

### 1. Studie Spermidin (Section 6)
Wirth et al., Cortex 2018 vor Implementierung auf PubMed-Korrektheit verifizieren. Alternativ: Eisenberg et al., Cell Metabolism 2009 (Autophagie-Nachweis, stärker zitiert).

### 2. Section 4 — Mobile-Komplexität
Die Drei-Hebel-Struktur pro Mechanismus ist inhaltlich reich. Auf Mobile könnte das zu dicht werden. Empfehlung: expandierbare Kacheln (Accordion-Pattern) prüfen.

### 3. `/pages/meine-routine` — Ziel-URL
CTA in Section 8 verlinkt auf `/pages/meine-routine`. Diese Seite muss vor oder parallel entwickelt werden, sonst temporären Fallback verwenden.

### 4. Astaxanthin in Section 4
Aktuell nicht in den 6 Mechanismus-Blöcken enthalten (bewusste Entscheidung: schwächere Humanstudienlage). Falls Astaxanthin wieder aufgenommen werden soll, bei Block hebel_5 (Chronische Entzündungen) ergänzen.

---

## Ästhetische Anforderungen (Design Governance)

- **Design und Layout folgen exakt `index.json` als Referenzimplementierung**
- **Alle Governance-Regeln aus `lifetime-health-theme/docs/design-governance.md` gelten uneingeschränkt**
- Farbpalette: ausschließlich definierte Design-Tokens (#f7f7f4, #f2f1ed, #26251e, #364f56, #65c0b6, #f4b740)
- Typografie: --text-page für Hero-Headline, --text-h1 für Section-Headlines, --text-h2 für Block-Headlines
- Kein Wellness-Bildmaterial — keine Stock-Fotos von glücklichen Menschen in der Natur
- Quellenangaben: dezent, aber sichtbar — nie im Footer versteckt
- Dark-Section (#364f56) nur für Section 5 — intentionaler Rhythmusbruch, nicht als Dekoration
- Klinisch-editoriale Tonalität: keine dekorativen Icon-Teppiche, keine Sterne-Ratings
- Grid-System konsistent mit Homepage-Sektionen
- Section-Rhythmus: hell → hell → mittelton → hell → dunkel → mittelton → hell → hell (bewusster Kontrast)

---

## Referenz-Dokumente

- `lifetime-health-theme/templates/index.json` — Design- und Layout-Referenz (PFLICHT)
- `lifetime-health-theme/docs/design-governance.md` — Visuelles Regelwerk
- `lifetime-health-theme/docs/conversion-messaging.md` — Messaging-Regeln
- `lifetime-health-theme/sections/lt-hp-science.liquid` — Basis für Section 5
- `lifetime-health-theme/sections/nmn-pdp-v2-science-quality.liquid` — Basis für Qualitätstabelle Section 7
- `lifetime-identity/lifetime-basis.md` — Brand Foundation & Tone of Voice
