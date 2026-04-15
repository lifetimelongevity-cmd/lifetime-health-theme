# Blueprint V1.1: `page.science.json`
## LIFETIME Health — Wissenschaft-Seite

**Version:** 1.1 — verschlankte Shipping-Version  
**Zweck:** Wissenschaftliche Vertrauens- und Argumentationsseite im Hauptmenü. Primäre Funktion: Glaubwürdigkeit etablieren, biologische Logik erklären, Diagnostik einordnen und erst danach in Handlung überleiten.  
**Ausgangspunkt:** `docs/science-blueprint-v1.md`  
**V1.1-Ziel:** Gleiche strategische Richtung, aber weniger Scope, mehr Reuse, geringeres Implementierungsrisiko.

---

## Warum V1.1

Die V1 ist strategisch stark, aber für eine erste belastbare Umsetzung zu schwer:

- zu viele neue Sections auf einmal
- Section 4 ist inhaltlich zu dicht
- Studien- und Qualitätsclaims brauchen vor Implementierung saubere Verifikation
- mehrere vorhandene Theme-Sections können den Job bereits gut genug erledigen

V1.1 behält deshalb den roten Faden bei:

**Biologie → Messen → Handeln → Vertrauen → Evidenz → Qualität → Dein nächster Schritt**

Aber in einer Form, die schneller und sauberer gebaut werden kann.

---

## Leitprinzipien

1. Die Seite ist eine Vertrauensseite, kein Produktkatalog.
2. Die Seite erklärt zuerst, verkauft später.
3. Produkte erscheinen nur als Teil eines Systems, nie als alleinige Antwort.
4. Quellen, Standards und Zuständigkeiten müssen sichtbar sein.
5. Vorhandene Theme-Sections werden bevorzugt wiederverwendet.
6. Neue Custom-Sections nur dort, wo bestehende Module den argumentativen Kern nicht tragen.
7. Alle user-facing Texte in Du-Form.

---

## Shipping-Version: finale Section-Reihenfolge

| # | Section | Empfohlener Typ | Build-Status | Job |
|---|---|---|---|---|
| 1 | Hero | `rich-text` | Adapt existing | Seite positionieren, wissenschaftliche Haltung etablieren |
| 2 | Die 12 Hallmarks of Aging | `lt-science-hallmarks` | Build new | Wissenschaftliche Tiefe und Differenzierung |
| 3 | Die drei Messebenen | `lt-science-messebenen` | Build new | Diagnostik logisch einordnen |
| 4 | Drei Hebel, wie du handeln kannst | `text-columns-images` | Adapt existing | Handlung verständlich machen, ohne zu überladen |
| 5 | Wissenschaftliche Grundlage | `lt-hp-science` | Adapt existing | Expertenautorität und Methodik |
| 6 | Studien & Quellen | `crs-link-cards` | Adapt existing | Verifizierbarkeit und rationale Tiefe |
| 7 | Qualitätssicherung | `lt-comparison-table` | Adapt existing | Qualitätsversprechen sauber differenzieren |
| 8 | CTA — Meine Routine | `rich-text` | Adapt existing | Überleitung in den nächsten sinnvollen Schritt |

**Scope-Reduktion gegenüber V1**

- Hero wird nicht als neue Section gebaut
- Handlungssektion wird deutlich reduziert
- Studiensektion nutzt bestehende Kartenlogik
- Qualitätssektion nutzt bestehende Tabellenlogik
- Fokus auf 2 neue Kern-Sections statt 6

---

## Section-Spezifikationen

### 1. Hero

**Typ:** `rich-text`  
**Status:** Adapt existing  
**Ziel:** Ruhiger, typografischer Einstieg ohne Produktdruck.

**Empfohlene Headline**

`Altern ist unvermeidlich. Wie wir altern, ist beeinflussbar.`

**Empfohlene Subline**

`Hier zeigen wir dir die wissenschaftliche Grundlage hinter LIFETIME: die Mechanismen des Alterns, die Rolle von Diagnostik und die Standards, nach denen wir Evidenz bewerten.`

**Warum kein Neubau**

Die aktuelle Seite nutzt bereits ein passendes Intro-Muster in [templates/page.science.json](/Users/benediktjunker/lifetime-health-theme/templates/page.science.json:23). Für die Shipping-Version reicht ein sauber überarbeitetes `rich-text`-Hero-Modul.

**Regeln**

- kein CTA
- kein Hero-Video
- kein Produktbild
- maximale Klarheit, minimale Deko

---

### 2. Die 12 Hallmarks of Aging

**Typ:** `lt-science-hallmarks`  
**Status:** Build new  
**Ziel:** Das stärkste wissenschaftliche Differenzierungsmerkmal der Seite.

**Warum neu**

Die Hallmarks sind der inhaltliche Kern. Die aktuelle Science-Seite hat dazu zwar Ansätze, aber keinen tragfähigen visuellen Block. Ein eigenes Modul ist hier gerechtfertigt.

**Inhalt**

- Kicker
- Headline
- kurzer Einleitungstext
- 12 Hallmark-Karten mit Nummer, Begriff, Ein-Satz-Erklärung
- sichtbare Quellenzeile unterhalb des Grids

**Empfohlene Headline**

`12 Mechanismen. Ein biologischer Prozess.`

**Empfohlene Subline**

`Altern ist kein einzelnes Ereignis, sondern das Zusammenspiel zentraler Prozesse in unseren Zellen. Diese 12 Hallmarks beschreiben, woran gesunde Langlebigkeit wissenschaftlich gemessen wird.`

**Layout**

- 4 Spalten Desktop
- 2 Spalten Tablet
- 1 Spalte Mobile

---

### 3. Die drei Messebenen

**Typ:** `lt-science-messebenen`  
**Status:** Build new  
**Ziel:** Blutmarker, Genetik und Epigenetik klar unterscheiden und AGE & DNA sauber einordnen.

**Warum neu**

Die Argumentation lebt davon, dass nicht jede Messung dieselbe Frage beantwortet. Dieser Zusammenhang ist zu wichtig, um ihn in generischen Cards zu verlieren.

**Inhalt**

- drei Kacheln: `Blutmarker`, `Genetik`, `Epigenetik`
- jeweils: Rolle, Stärken, Grenzen
- klare Aussage, dass Genetik keine Krankheitsdiagnose ist
- klare Einordnung von DNA-Methylierung als wissenschaftlicher Referenzrahmen
- kurzer Abschlussblock unterhalb
- ein CTA zum AGE & DNA Test

**Empfohlene Headline**

`Drei Wege, deinen Körper zu verstehen.`

**Empfohlener Closing-Satz**

`Blutmarker zeigen, wo du heute stehst. Genetik zeigt, womit du arbeitest. Epigenetik zeigt, wie gut du bisher gealtert bist.`

---

### 4. Drei Hebel, wie du handeln kannst

**Typ:** `text-columns-images`  
**Status:** Adapt existing  
**Ziel:** Handlung ermöglichen, ohne die Seite in eine komplexe Mechanismus-Matrix zu verwandeln.

**Warum vereinfacht**

Die V1-Sektion mit 6 Mechanismen x 3 Hebeln ist strategisch interessant, aber für Mobile und Erstverständnis zu dicht. Für die Shipping-Version reicht ein reduzierter Dreiklang.

**Inhalt**

Drei Karten:

1. `Lebensstil`
2. `Genetische Einordnung`
3. `Gezielte Unterstützung`

Jede Karte erklärt ihren Job im System:

- Lebensstil ist die Basis
- genetische Einordnung macht Maßnahmen präziser
- Produkte sind Ergänzung, nicht Ersatz

**Empfohlene Headline**

`Was du tun kannst, folgt keinem einzigen Hebel.`

**Empfohlene Subline**

`Was wirkt, ist meist die Kombination aus Alltag, individueller Ausgangslage und gezielter Unterstützung. Genau so denkt LIFETIME.`

**Wichtig**

- keine einzelnen Produkte als harte CTA-Karten
- wenn Produktbezug, dann nur dezent in der dritten Karte
- keine sechs Mechanismusblöcke in V1.1

---

### 5. Wissenschaftliche Grundlage

**Typ:** `lt-hp-science`  
**Status:** Adapt existing  
**Ziel:** Expertenautorität und methodische Haltung in einem starken Trust-Block bündeln.

**Warum behalten**

[lt-hp-science.liquid](/Users/benediktjunker/lifetime-health-theme/sections/lt-hp-science.liquid:1) ist bereits genau für diesen Job angelegt: Labor-Pillar, Expertenmitte, Forschungs-Pillar.

**Empfohlene Rolle**

- links: Labor- oder Standard-Pillar
- mitte: Prof. Dr. Volker Limmroth mit klaren Credentials
- rechts: Forschungs- oder Methodik-Pillar

**Empfohlene Headline**

`Kein Wellness-Theater.`

**Empfohlene Subline**

`Alle LIFETIME Produkte und Analysen basieren auf peer-reviewed Forschung, klinisch relevanter Dosierung und klar benannten Qualitätsstandards.`

**Anpassungen gegenüber heutigem Modul**

- CTA nicht auf allgemeine PubMed-Startseite
- besser: kuratierte Studienseite oder dedizierte Quellenübersicht
- Limmroth-Block stärker credential-first als quote-first

---

### 6. Studien & Quellen

**Typ:** `crs-link-cards`  
**Status:** Adapt existing  
**Ziel:** Für rationale Nutzer Verifizierbarkeit schaffen, ohne die Seite zu überfrachten.

**Warum so**

[crs-link-cards.liquid](/Users/benediktjunker/lifetime-health-theme/sections/crs-link-cards.liquid:30) kann Links und Popups bereits sauber abbilden. Das reicht für eine erste kuratierte Quellenbibliothek.

**Inhalt**

Keine Wirkstoffshowcase-Sektion mit 6 aggressiven Product-Study-Karten, sondern eine kuratierte Themenlogik:

- `Hallmarks of Aging`
- `Epigenetische Altersbestimmung`
- `NAD+ und Zellenergie`
- `Schlaf und gesunde Langlebigkeit`
- `Bewegung und Mitochondrien`
- `Ernährung und Entzündungen`

Jede Karte enthält:

- Thema
- kurze Einordnung in 1 Satz
- Link oder Popup mit 2 bis 3 Referenzen

**Empfohlene Headline**

`Quellen für alle, die tiefer einsteigen wollen.`

**Wichtige Änderung gegenüber V1**

- weniger claim-lastig
- stärker thematisch statt sortimentsbezogen
- entlastet die juristische und inhaltliche Prüfung

---

### 7. Qualitätssicherung

**Typ:** `lt-comparison-table`  
**Status:** Adapt existing  
**Ziel:** Qualitätsstandards präzise zeigen und sauber trennen, was wofür gilt.

**Warum als Tabelle**

[lt-comparison-table.liquid](/Users/benediktjunker/lifetime-health-theme/sections/lt-comparison-table.liquid:1) zwingt zur Klarheit. Das hilft hier mehr als freie Fließtexte.

**Empfohlene Logik**

Spalten:

- `Alle LIFETIME Produkte`
- `NMN`
- `AGE & DNA Test`

Zeilen:

- Studienbasierte Auswahl
- Klinische Dosierung
- Drittlabor / Prüfbericht
- Rohstoff-/Markenstandard
- Laboranalyse / ISO-Standards
- Garantie / Transparenz

**Empfohlene Headline**

`Was geprüfte Qualität bei LIFETIME bedeutet.`

**Wichtige Guardrails**

- NMN-spezifische Aussagen nicht auf den Test übertragen
- Eurofins-/ISO-Aussagen nur testbezogen
- Garantiedauer vor Umsetzung mit Live-Stand abgleichen

---

### 8. CTA — Meine Routine

**Typ:** `rich-text`  
**Status:** Adapt existing  
**Ziel:** Ruhige Überleitung von Wissen in Handlung.

**Empfohlene Headline**

`Du weißt jetzt, wie Altern wissenschaftlich verstanden wird.`

**Empfohlene Subline**

`Der nächste Schritt ist keine weitere Theorie, sondern eine Routine, die zu deinem Alltag und deiner Ausgangslage passt.`

**CTAs**

- primär: `Meine Routine entdecken`
- sekundär: `Mit dem AGE & DNA Test starten`

**Wichtig**

- kein aggressiver Sales-Close
- kein Produktgrid direkt davor
- Abschluss soll Orientierung geben, nicht drängen

---

## Was in V1.1 bewusst gestrichen oder verschoben wurde

### Entfernt aus der Shipping-Version

- `before-after` als frühes Science-Element
- große 6x3 Hebel-Matrix
- eigene neue Studien-Section nur für sortimentsnahe Wirkstoffe
- separate neue CTA-Section als Custom Build

### Optional für Phase 2

- ausgebautes `lt-science-hebel` Accordion
- dedizierte Studienbibliothek als eigene Seite
- zusammengeführte Custom-Section für Evidenz + Qualität
- stärker interaktive Diagnostik-Sektion

---

## Claim- und Content-Risiken vor Umsetzung

1. **Garantiedauer prüfen**
   V1 nennt 90 Tage, das PDP-System dokumentiert aktuell 30 Tage. Vor Umsetzung angleichen.

2. **Studien sauber verifizieren**
   Jede Studie, jeder DOI und jede verkürzte Aussage muss vor Livegang auf korrekte Einordnung geprüft werden.

3. **Genetik sprachlich diszipliniert halten**
   Keine Formulierungen, die nach Krankheitsdiagnostik oder Heilversprechen klingen.

4. **Produkte nicht zu früh aufladen**
   Die Seite darf nicht nachträglich wieder in Richtung „Supplementverkauf mit Wissenschaftsmantel“ kippen.

---

## Build-Priorität

### Phase A — zuerst bauen

1. `lt-science-hallmarks`
2. `lt-science-messebenen`
3. `page.science.json` mit neuer Reihenfolge aufsetzen

### Phase B — bestehende Sections adaptieren

4. Hero als `rich-text`
5. `text-columns-images` für die 3 Hebel
6. `lt-hp-science`
7. `crs-link-cards`
8. `lt-comparison-table`
9. Abschluss-CTA als `rich-text`

---

## Kurzfazit

V1.1 behält den strategischen Kern der V1 bei, verschiebt die Seite aber von einer ambitionierten Konzeptfassung zu einer realistisch umsetzbaren Shipping-Version.

Die Seite wird dadurch:

- wissenschaftlich klarer
- vertrauensstärker
- weniger überladen
- näher am bestehenden Theme-System
- schneller umsetzbar

