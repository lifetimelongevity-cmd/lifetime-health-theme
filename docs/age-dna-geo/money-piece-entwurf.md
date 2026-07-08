---
status: living
last_review: 2026-07-08
canonical_for: age-test-money-piece-vergleichsseite-entwurf
supersedes: []
---

# Money-Piece: Vergleichsseite „Biologisches Alter testen" — ENTWURF

Der zitier-stärkste Asset des Age-Test-Clusters (Playbook §6). Ziel-Query: „welcher/bester
Alterstest", „biologisches alter testen", „epigenetik test vergleich".

> **Status 2026-07-08:** Live-Template `templates/page.biologisches-alter-testen.json` als
> **unveröffentlichter Draft gebaut** (rendert erst, wenn in Shopify eine Page mit diesem Template
> zugewiesen wird). **NICHT veröffentlichen** bis: (1) Wettbewerber-Preise aus DE-Session re-checkt,
> (2) PDP-Wording für die Bereichs-/Organ-Alter abgeglichen, (3) juristische Freigabe (§6 UWG).

> **Warum diese Struktur:** Die sechs „Alterstests" am Markt messen **vier verschiedene Dinge**.
> Nur epiAge + Cerascreen sind deutschsprachige DNA-Methylierungsuhren wie LIFETIME. Alle sechs in
> **eine** Tabelle zu werfen wäre nach **§6 UWG** (vergleichende Werbung: objektiv, nachprüfbar,
> nicht irreführend) angreifbar. Deshalb: erst Methoden segmentieren (Antwort-/Autoritäts-Content,
> GEO-stark), dann nur die vergleichbaren Tests vergleichen.

---

## 0. LIFETIME-Uhr: geklärt (2026-07-08) + HARTE White-Label-Regel

**White-Label:** Die epigenetische Uhr ist lizenziert. Der Name des Uhr-/Studien-Anbieters darf
**nirgendwo** auftauchen, nicht öffentlich und nicht in Marketing. Öffentlich heißt sie nur
**„MethylPace"** (LIFETIME-Brand) bzw. „unsere Speichel-Methylierungsuhr".

**Methode geklärt:** speichelbasierte DNA-Methylierungsuhr, die **wenige Stellen** nutzt. Die früher
genannten „~935k / Illumina" waren Entdeckungs-Plattform bzw. Genotyping (GWAS), NICHT die Uhr.
→ **Keine CpG-Zahl** als Story oder Vergleichsachse (der Kunde interessiert das nicht).

**Der echte Differenzierer (was Menschen interessiert):**
1. **Alter nach Körper-Bereichen** (z. B. Ohren, Augen, Gehirn, Gesamtkörper), nicht nur ein Wert.
2. **Kombination mit Genetik** (u. a. Supplement-Response als Entscheidungsgrundlage).
3. **Eurofins-Labor (ISO 17025)** + deutschsprachige App/Report + Handlungs-Ebene.

**Validierungs-Fakten (nutzbar, aber OHNE Quellennennung):** validiert an über 2.600 Personen;
mittlere Abweichung ~6 Jahre zum kalendarischen Alter (≈3,5 Jahre in einer gesunden Kohorte);
R² bis 0,878; Speichelprobe; Analyse bei Eurofins (ISO 17025).
⚠️ Die Studie ist ein **Preprint (nicht peer-reviewed)** und stammt von der Uhr-Firma → **nicht** als
„peer-reviewt/unabhängig" bewerben und wegen White-Label **nicht öffentlich zitieren**. Für
GEO-Zitierstärke besser: LIFETIME veröffentlicht eine **eigene, gebrandete** Validierungs-Zusammenfassung
(nennbare Quelle ohne White-Label-Bezug).

---

## 1. Meta / SEO

- **Slug:** `/pages/biologisches-alter-testen` (zugleich der Hub aus dem Playbook)
- **Title-Tag (~58):** „Biologisches Alter testen: Anbieter & Methoden im Vergleich"
- **Meta-Description:** „Epigenetik, Glykane, Blutwerte oder Proteomik? Wir erklären die vier
  Mess-Ansätze für dein biologisches Alter und vergleichen die deutschsprachigen
  DNA-Methylierungs-Tests. Ehrlich, mit Quellen."
- **H1:** „Biologisches Alter testen: Welcher Test passt zu dir?"

---

## 2. Page-Struktur (Section-Order, mirror `page.science.json`)

| # | Section-Type | Rolle |
|---|---|---|
| 1 | `lt-science-hero` (reuse) | H1 + Intro |
| 2 | `rich-text` | TL;DR-Antwortbox + „Nicht jeder Alterstest misst dasselbe" (4 Methoden) |
| 3 | `lt-comparison-table` | Fokus-Vergleich der 4 Methylierungs-Tests (LIFETIME empfohlen) |
| 4 | `rich-text` | Ehrliche Anbieter-Notizen + Entscheidungs-Guide |
| 5 | `crs-faq-accordion` | FAQ → FAQPage-Schema |
| 6 | `lt-hp-cta-close` | CTA zur PDP `/products/lifetime-age-dna` |

Byline (Autor Benedikt Junker, geprüft Prof. Dr. Limmroth) im Hero oder als Autor-Box.

---

## 3. TL;DR-Antwortbox (40–60 Wörter, der LLM-Zitatblock)

> Nicht jeder „Alterstest" misst dasselbe. Es gibt vier Ansätze: DNA-Methylierung (epigenetische Uhr),
> Glykane, Blutwerte und Proteomik. Willst du ein epigenetisches Ergebnis auf Deutsch mit einem
> verwertbaren Report, kommen vor allem LIFETIME, epiAge und Cerascreen infrage. LIFETIME zeigt das
> Alter nach mehreren Körper-Bereichen und kombiniert es mit Genetik (Analyse im Eurofins-Labor,
> ISO 17025); epiAge liefert günstiger einen einzelnen Alterswert, Cerascreen ist derzeit ausverkauft.

---

## 4. „Nicht jeder Alterstest misst dasselbe" (rich-text, Antwort-first)

Vier Mess-Ansätze, je 1–2 Sätze, erste Zeile = die Antwort:

- **DNA-Methylierung (epigenetische Uhr).** Misst chemische Methyl-Markierungen an der DNA und
  schätzt daraus ein biologisches Alter. Der am besten erforschte Ansatz (Horvath-Uhr u. a.).
  Beispiele: LIFETIME, epiAge, Cerascreen, TruDiagnostic.
- **Glykane.** Misst Zuckerstrukturen an Antikörpern (Entzündungs-/„Inflammaging"-Signal), keine
  epigenetische Uhr. Beispiel: GlycanAge.
- **Blutwerte.** Leitet ein „Alter" aus klassischen Blutmarkern ab (Glukose, Cholesterin, CRP …),
  keine DNA-Analyse. Beispiel: InsideTracker InnerAge.
- **Proteomik.** Misst Hunderte/Tausende Proteine, keine Methylierung. Beispiel: MOLEQLAR.

Überleitung: „Diese Ansätze sind nicht direkt vergleichbar. Wenn du wie die meisten ein
**epigenetisches** Ergebnis willst, sind die vier DNA-Methylierungs-Tests die relevante Gruppe."

---

## 5. Fokus-Vergleich (lt-comparison-table) — nur DNA-Methylierungsuhren

4 Spalten (Max der Section), LIFETIME = empfohlene Spalte 1. Werte faktisch; Icons nur bei binären
Zeilen (Genetik, Sprache), sonst Text (Fairness + §6 UWG). **Keine CpG-Zahlen** (siehe §0).

| Zeile | LIFETIME (Empfohlen) | epiAge | Cerascreen | TruDiagnostic |
|---|---|---|---|---|
| **Methode** | Speichel-Methylierungsuhr | Methylierung (Speichel) | Methylierung (Abstrich) | Methylierung (Kapillarblut) |
| **Ergebnis-Tiefe** | mehrere Körper-Bereiche | ein Alterswert | ein Alterswert | mehrere Organ-Werte |
| **Genetik kombiniert** | Ja, inkl. Supplement-Genetik ✓ | Nein ✗ | Nein ✗ | Nein ✗ |
| **Labor & Zertifizierung** | Eurofins, ISO 17025 | CAP/CLIA, Hongkong | Partnerlabor, DE | CLIA/CAP, USA |
| **Report & Sprache** | App, Deutsch ✓ | Deutsch ✓ | App, Deutsch ✓ | Englisch ✗ |
| **Preis** | 349 € | 199,95 € | 399 € (derzeit ausverkauft) | ≈ 460 € (499 $)* |

\* Umrechnung, kein Anbieter-EUR-Preis. Stand aller Werte: 2026-07-08.

### Ready-to-drop Section-Config (nach Freigabe ins Page-Template)

```json
{
  "type": "lt-comparison-table",
  "settings": {
    "headline": "DNA-Methylierungs-Tests im direkten Vergleich",
    "subheading": "Nur echte epigenetische Uhren. Stand 08.07.2026, Preise können sich ändern.",
    "content_align": "left",
    "active_column_index": 1,
    "recommended_badge_text": "Empfohlen",
    "first_row_heading": "Methode",
    "second_row_heading": "Ergebnis-Tiefe",
    "third_row_heading": "Genetik kombiniert",
    "fourth_row_heading": "Labor & Zertifizierung",
    "fifth_row_heading": "Report & Sprache",
    "sixth_row_heading": "Preis",
    "color_accent": "#65c0b6",
    "padding_top": 64, "padding_bottom": 64
  },
  "blocks": {
    "c1": { "type": "column", "settings": {
      "column_heading": "LIFETIME",
      "first_row": "Speichel-Methylierungsuhr", "first_row_icon_type": "none",
      "second_row": "Mehrere Körper-Bereiche", "second_row_icon_type": "none",
      "third_row": "Ja, inkl. Supplement-Genetik", "third_row_icon_type": "default", "third_row_icon": "check",
      "fourth_row": "Eurofins, ISO 17025", "fourth_row_icon_type": "none",
      "fifth_row": "App, Deutsch", "fifth_row_icon_type": "default", "fifth_row_icon": "check",
      "sixth_row": "349 €", "sixth_row_icon_type": "none"
    }},
    "c2": { "type": "column", "settings": {
      "column_heading": "epiAge",
      "first_row": "Methylierung (Speichel)", "first_row_icon_type": "none",
      "second_row": "Ein Alterswert", "second_row_icon_type": "none",
      "third_row": "Nein", "third_row_icon_type": "default", "third_row_icon": "cross",
      "fourth_row": "CAP/CLIA, Hongkong", "fourth_row_icon_type": "none",
      "fifth_row": "Deutsch", "fifth_row_icon_type": "default", "fifth_row_icon": "check",
      "sixth_row": "199,95 €", "sixth_row_icon_type": "none"
    }},
    "c3": { "type": "column", "settings": {
      "column_heading": "Cerascreen",
      "first_row": "Methylierung (Abstrich)", "first_row_icon_type": "none",
      "second_row": "Ein Alterswert", "second_row_icon_type": "none",
      "third_row": "Nein", "third_row_icon_type": "default", "third_row_icon": "cross",
      "fourth_row": "Partnerlabor, DE", "fourth_row_icon_type": "none",
      "fifth_row": "App, Deutsch", "fifth_row_icon_type": "default", "fifth_row_icon": "check",
      "sixth_row": "399 € (ausverkauft)", "sixth_row_icon_type": "none"
    }},
    "c4": { "type": "column", "settings": {
      "column_heading": "TruDiagnostic",
      "first_row": "Methylierung (Kapillarblut)", "first_row_icon_type": "none",
      "second_row": "Mehrere Organ-Werte", "second_row_icon_type": "none",
      "third_row": "Nein", "third_row_icon_type": "default", "third_row_icon": "cross",
      "fourth_row": "CLIA/CAP, USA", "fourth_row_icon_type": "none",
      "fifth_row": "Englisch", "fifth_row_icon_type": "default", "fifth_row_icon": "cross",
      "sixth_row": "≈ 460 € (499 $)", "sixth_row_icon_type": "none"
    }},
    "block_order": ["c1","c2","c3","c4"]
  }
}
```

---

## 6. Ehrliche Anbieter-Notizen + Entscheidungs-Guide (rich-text)

Kurz, fair, inkl. LIFETIME-Schwächen (Fairness = Zitierfähigkeit):

- **LIFETIME (349 €).** Stärke: zeigt das biologische Alter nach **mehreren Körper-Bereichen** statt
  nur einem Wert und **kombiniert es mit Genetik** (Supplement-Response als Entscheidungsgrundlage);
  Analyse im akkreditierten **Eurofins-Labor (ISO 17025)**, deutschsprachige App. Schwäche: teurer als
  epiAge; die Laboranalyse dauert 6 Wochen.
- **epiAge (199,95 €).** Stärke: günstigster deutschsprachiger Einstieg, ca. 4 Wochen. Schwäche:
  liefert primär einen einzelnen Alterswert, keine Bereichs-/Handlungs-Ableitung; Labor in Hongkong.
- **Cerascreen (399 €, derzeit ausverkauft).** Stärke: deutsche Analyse, Beratung inklusive.
  Schwäche: aktuell nicht bestellbar (Stand 08.07.2026), lange Bearbeitung.
- **TruDiagnostic (≈ 460 €).** Stärke: forschungsnahe Tiefe (mehrere Uhren, Organ-Werte). Schwäche:
  englischer Report, Bezahlung in USD/GBP, EU nur über Distributor.

**Entscheidungs-Guide (Antwort-first):**
- Willst du den **günstigsten** deutschsprachigen Alterswert → epiAge.
- Willst du maximale **Forschungs-Tiefe** und Englisch stört nicht → TruDiagnostic.
- Willst du ein **deutschsprachiges** Ergebnis nach **Körper-Bereichen**, mit **Genetik** kombiniert und
  aus einem akkreditierten Labor → LIFETIME.

---

## 7. FAQ (crs-faq-accordion → FAQPage-Schema)

1. **Welcher Alterstest ist der beste?** Das hängt vom Ziel ab. Für den günstigsten deutschsprachigen
   Alterswert ist epiAge sinnvoll, für maximale Forschungs-Tiefe TruDiagnostic, für ein
   deutschsprachiges Ergebnis nach Körper-Bereichen plus Genetik LIFETIME. Achte zuerst darauf, dass
   Tests dieselbe Methode nutzen (DNA-Methylierung), sonst vergleichst du Äpfel mit Birnen.
2. **Was ist der Unterschied zwischen epigenetischem Alter und Blutwerten?** Ein epigenetischer Test
   misst Methylierungsmuster an der DNA und schätzt daraus ein biologisches Alter. Blutwert-Tests
   leiten ein „Alter" aus klassischen Laborwerten ab. Beide beantworten unterschiedliche Fragen.
3. **Wie genau ist ein epigenetischer Alterstest?** Epigenetische Uhren sind wissenschaftlich etabliert,
   liefern aber einen Schätzwert mit Messtoleranz. Ergebnisse verschiedener Anbieter sind wegen
   unterschiedlicher Uhren nicht 1:1 vergleichbar. Sinnvoll ist, beim selben Anbieter zu bleiben und
   Verläufe zu betrachten.
4. **Speichel oder Blut, was ist besser?** Beide Probenarten liefern genug Erbmaterial für eine
   Methylierungsanalyse. Speichel ist zu Hause einfacher zu nehmen. Entscheidender als die Probenart
   sind Uhr, Labor und was der Report daraus macht.
5. **Kann ich mein biologisches Alter verändern?** In der Forschung wird untersucht, ob Lebensstil-
   Faktoren Methylierungsmuster beeinflussen. Ein Test ist eine Standortbestimmung, keine Behandlung
   und keine medizinische Diagnose.
6. **Was kostet ein biologischer Alterstest?** Die deutschsprachigen DNA-Methylierungs-Tests liegen
   grob zwischen 200 € (epiAge) und 400 € (Cerascreen); LIFETIME liegt bei 349 €. Internationale
   Anbieter wie TruDiagnostic rechnen in USD/GBP (umgerechnet ca. 460 €).

---

## 8. Compliance-Pass

### White-Label (hart)
- Der Uhr-/Studien-Anbieter wird **nirgendwo** genannt. Öffentlich nur „MethylPace" / „unsere
  Speichel-Methylierungsuhr". Die Validierungsstudie wird **nicht** namentlich zitiert (§0).

### Test-Claim-Ampel (Playbook §4)
- 🟢 „misst DNA-Methylierung", „schätzt ein biologisches Alter", „nach Körper-Bereichen",
  „akkreditiertes Labor", „Supplement-Response als Entscheidungsgrundlage" (wie PDP: „keine Verschreibung").
- 🔴 vermeiden: „erkennt Krankheiten", „sagt Lebenserwartung voraus", „macht dich jünger". **Auch die
  Krankheits-Kohorten der Studie NICHT als Produktnutzen bewerben** (die Uhr zeigt in R&D-Gruppen mit
  ungünstigem Status im Schnitt ein höheres Alter, das ist KEIN Krankheits-Nachweis → HWG/IVD).
  Keine Validierungs-Zahl als „peer-reviewt/unabhängig" framen (Preprint der Uhr-Firma).

### §6 UWG — vergleichende Werbung (Checkliste vor Publikation)
- [ ] Nur gleiche Methode gegenübergestellt (Methylierungsuhren), andere Ansätze klar getrennt. ✅ im Entwurf
- [ ] Jede Wettbewerber-Angabe **objektiv, nachprüfbar, aktuell** (Preise/Specs aus DE-Session re-checken).
- [ ] Keine Herabsetzung; Schwächen sachlich, auch die eigenen genannt. ✅ im Entwurf
- [ ] Preise mit Stand-Datum; „ausverkauft"/Fremdwährung gekennzeichnet. ✅ im Entwurf
- [ ] „Genetik kombiniert = Nein" für Wettbewerber vor Live gegenprüfen (nicht fälschlich verneinen).
- [ ] Juristische Endabnahme (wie beim NMN-Legal-Wedge).

---

## 9. „Zu verifizieren" vor Live

1. Bereichs-/Organ-Alter: exaktes **PDP-Wording** abgleichen (welche Bereiche werden real ausgewiesen).
2. Alle Preise aus **deutscher** Session re-checken (region-detected, zeitkritisch).
3. Cerascreen-Verfügbarkeit (aktuell „Ausverkauft").
4. „Genetik kombiniert = Nein" für epiAge/Cerascreen/TruDiagnostic bestätigen.
5. Deutschsprachiger Report nur für epiAge, Cerascreen, LIFETIME bestätigt; TruDiagnostic = Englisch.
6. Fremdwährungs-Preise als Näherung kennzeichnen.
7. White-Label-Check: nirgendwo der Uhr-Anbieter-Name.

---

## 10. Quellen (Wettbewerbs-Specs, Stand 2026-07-08)

epiAge: ihreapotheken.de (PZN 18789703) · epi-age.de · epiagesystem.de (Turnaround).
TruDiagnostic: trudiagnostic.com/truage · lolahealth.com (EU-Distributor). GlycanAge:
glycanage.com/about/our-science. InsideTracker: store.insidetracker.com/products/innerage-2-0.
Cerascreen: cerascreen.de/products/biologisches-alter-im-genetic-age-test (OutOfStock). MOLEQLAR:
moleqlar.com/products/epi-proteomics-test. (Eigene Uhr-Validierung: intern, White-Label, nicht öffentlich.)

---

## Verweise
- Playbook: `docs/age-dna-geo/age-dna-geo-playbook.md` · Umbrella: `docs/geo-strategy.md`
- Pattern: `templates/article.nmn-vs-nr.json`, `sections/lt-comparison-table.liquid`, `page.science.json`
- PDP (eigene Specs): `/products/lifetime-age-dna`, `templates/product.age-dna-test.json`
- Uhr-Fakten + White-Label-Regel: Memory `reference_lifetime_epigenetic_clock`
