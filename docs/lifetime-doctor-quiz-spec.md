---
status: living
last_review: 2026-05-19
canonical_for: doctor-quiz-landingpage
supersedes: []
---

> **Wichtig — Source of Truth & Sprachregelung:**
>
> 1. **Reports only:** Diese Spec mappt ausschließlich auf **echte Reports** aus `lifetime-produktdetails/produktdetails-age-dna-test.md`. Der Test liefert 187 Reports in 16 DNA-Kategorien + 6 Epigenetik-Bereiche. Er zeigt **keine Genotyp-Rohdaten** (kein "homozygot/heterozygot"), sondern interpretierte Aussagen pro Report. Gene erscheinen auf der Result-Page nur als optionale wissenschaftliche Sekundär-Information.
> 2. **Nur Lifestyle und Prävention — nie Krankheits-/Therapie-Sprache:** LIFETIME positioniert sich konsequent als Lifestyle- und Präventions-Produkt. Auf der ganzen Ärzte-Page wird **keine** therapeutische oder krankheitsbezogene Sprache verwendet. Begriffe wie "Therapie", "Behandlung", "Hypertonie-Patient", "Diabetes-Behandlung", "therapieresistent" sind raus. Stattdessen: **Veranlagung, Belastbarkeit, präventive Beratung, Lebensstil-Empfehlung**. Auch wenn ein Report-Name selbst medizinisch klingt (z.B. "Herzkrankheits-Risiko"), bleibt der Kontext um den Report immer präventiv. Report-Namen kommen 1:1 aus dem Produkt — die einsatzbezogenen Texte sind durchgängig auf Lebensstil-Beratung gerichtet.
> 3. **Schwach abgedeckte Fachrichtungen raus:** Fachrichtungen, deren Kern-Indikationen das Produkt nicht solide abdeckt (Gynäkologie ohne HRT/Mamma-Reports, Dermatologie ohne DNA-Hautkategorie, Pädiatrie weil Test für Erwachsene), wurden bewusst aus Q1 entfernt. Ehrlichkeit vor Vollständigkeit.
> 4. **Keine erfundenen Assets/Claims:** Was nicht in `produktdetails-age-dna-test.md` steht, kommt nicht auf die Page. Aktuell nicht existierende Assets (Muster-Befund-PDF, DIN-A6-Patient:innen-Karten, persönliches Limmroth-Briefing, "CE-IVD", "ISO 15189") sind raus. Der echte Output ist die **LIFETIME App** (mit PDF-Export, Ergebnisse in 6–8 Wochen, Eurofins Genomics ISO 9001/17025/13485). Wenn neue Assets oder Zertifikate entstehen, müssen sie erst in der Produktspec landen, bevor sie hier auftauchen.

# Spec: Ärzte-Quiz Landingpage

Implementierungs-Spec für eine separate Landingpage, die Ärzt:innen als Empfehlungspartner für den AGE & DNA-Test (€349) gewinnt. Das Quiz ist bewusst kurz (2 Fragen) und hat ein zentrales Versprechen: **Ein Test, alle Bereiche — aber jede Fachrichtung sieht andere Schwerpunkte.**

## Strategischer Rahmen

**Zielgruppe:** Niedergelassene Ärzt:innen aller Fachrichtungen, die Patient:innen präventiv oder zur Risikostratifizierung begleiten und einen Empfehlungspartner suchen.

**Primärziel der Page:** Lead in B2B-Empfehlungsprogramm. Quiz → Result → Buchung Gespräch (Calendly o.ä.).

**Kern-Insight:** Eine Kardiologin und ein Orthopäde profitieren beide vom selben Test — aber sie wertschätzen unterschiedliche Marker. Statt zehn separater Tests bietet LIFETIME einen Test mit fachrichtungs-spezifischer Lesart.

**Sekundärziel:** Vertrauensaufbau gegenüber medizinischem Publikum (Limmroth-Begleitung, Eurofins-Lab).

## Abgrenzung zum AGE-Quiz

| Aspekt | AGE-Quiz (Patient) | Ärzte-Quiz (B2B) |
|---|---|---|
| Slug | `/pages/quiz-age` | `/pages/aerzte` (Platzhalter) |
| Tonalität | Du-Form, persönlich | Sie-Form, professionell |
| Fragen | 7 | 2 |
| Mechaniken | Slider, Karten, Multi | Karten + Multi |
| Result | Top-3 Bedürfnisse, lange Akkordeons | Fachrichtungs-Profil, Matrix-Wechsler |
| CTA-Primär | E-Mail-Lead + Bestellung | Buchung B2B-Gespräch |
| Engine | `lt-pdp-quiz-v2.liquid` | `lt-doctor-quiz.liquid` (neu) |

## Architektur

Neue eigenständige Section `lt-doctor-quiz.liquid` mit eingebetteter JS-Logik. State client-side. Reuse von Patterns aus `lt-pdp-quiz-v2` (Header, Progress, Karten-Komponente), aber separate Implementierung, damit beide Quizzes unabhängig iterieren können.

State-Maschine:

```
intro → q1 → q2 → loading → result
```

State-Objekt:

```js
{
  step: 'intro',
  answers: {
    specialty: null,      // 'kardio' | 'ortho' | 'allgemein' | ...
    focus: []             // Multi max 2: ['praevention', 'veranlagung', 'sensitivitaet', 'lifestyle']
  },
  submitted: false
}
```

## Fragen

### Q1 — Fachrichtung (Single-Select Karten)

**Headline:** Was ist Ihr fachlicher Schwerpunkt?
**Sub:** Wir zeigen Ihnen, welche Marker aus unserem Test für Ihre Praxis am relevantesten sind.

**Optionen (7 Karten):**
- Kardiologie
- Orthopädie
- Allgemeinmedizin
- Innere Medizin
- Neurologie / Psychiatrie
- Sportmedizin
- Andere Fachrichtung

**Bewusst nicht enthalten:** Gynäkologie, Dermatologie, Pädiatrie — siehe Source-of-Truth-Anmerkung am Anfang dieser Spec. Wenn solche Praxen die Page erreichen, wählen sie "Andere Fachrichtung" und bekommen das allgemeine Präventions-Profil.

**Mechanik:** Klick auf Karte → 300ms Bestätigung → Auto-Advance zu Q2.

**Mobile-Layout:** 2-Spalten-Grid. Auf Desktop: 4-spaltig (Reihe 1: Kardio, Ortho, Allgemein, Innere; Reihe 2: Neuro, Sport, Andere). 7 Karten passen ohne Scroll.

**Hinweis (einklappbar):** Unser Test liefert 187 Reports in 16 DNA-Kategorien plus 6 Epigenetik-Bereiche. Welche dieser Reports klinisch im Vordergrund stehen, hängt von Ihrer Fachrichtung und Ihrem Patientenfokus ab — das Produkt selbst ändert sich nicht.

### Q2 — Patientenfokus (Multi-Select Karten, max 2)

**Headline:** Wo liegt der Schwerpunkt Ihrer Patient:innen-Arbeit?
**Sub:** Wählen Sie bis zu 2 Bereiche.

**Optionen (4 Karten):**
- **Prävention & Healthspan** — Begleitung gesunder oder beschwerdearmer Patient:innen
- **Familiäre Veranlagung** — Beratung bei familiärer Häufung, Frühindikatoren, individuelle Veranlagung
- **Verträglichkeiten & Nährstoffe** — Hintergrund bei unklaren Symptomen, Substitutions-Antworten, Ernährungs-Empfehlungen
- **Lifestyle-Beratung** — Ernährung, Bewegung, Schlaf, Supplements

**Mechanik:** Multi-Select toggle, max 2. Weiter-Button am Fuß, beschriftet mit Auswahlzahl. Bei 0 Auswahl deaktiviert.

**Hinweis:** Die Kombination aus Fachrichtung und Fokus bestimmt, welche der 187 Reports wir in Ihrem Vorschau-Ergebnis nach vorn stellen. Das ausgelieferte Test-Set ist für alle Praxen identisch.

## Fachrichtungs-Mapping

Pro Fachrichtung: 4–6 **Reports** aus der Produktspec, die im Result als Top-Karten erscheinen. Plus passende Epigenetik-Bereiche. Gene sind optional als Sekundär-Zeile darunter (kein Versprechen). Zusätzlich werden die DNA-Kategorien für das Matrix-Highlighting gewählt.

**Konvention:** `reports`-Liste enthält nur **wörtliche Report-Namen** aus `lifetime-produktdetails/produktdetails-age-dna-test.md`. `genes`-Liste optional, sichtbar als kleine Zeile unter der Karte ("Untersucht u.a.: ..."). Wenn ein Report-Name in mehreren Kategorien vorkommt (z.B. "Koffein & Fokus" in Stoffwechsel und Mental Health), wird die Kategorie in `()` mitgegeben.

```js
const SPECIALTIES = {
  kardio: {
    id: 'kardio',
    label: 'Kardiologie',
    headline: 'Für die kardiologische Praxis besonders relevant',
    sub: 'Veranlagung für Herz-Kreislauf-Belastbarkeit, Blutdruck-Regulation und Lipid-Stoffwechsel — plus aktueller Entzündungs- und Alterungs-Status epigenetisch. Grundlage für individuelle Lebensstil-Empfehlungen, nicht für Therapie.',
    primaryDnaCategories: ['herz', 'stoffwechsel'],
    secondaryDnaCategories: ['vitamine', 'gesunde-alterung'],
    epigenetics: ['biologisches-alter', 'entzuendung', 'epivitality'],
    reports: [
      { name: 'Cholesterin', category: 'Herz', note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für individualisierte Ernährungs- und Bewegungs-Empfehlungen.' },
      { name: 'Herzkrankheits-Risiko', category: 'Herz', note: 'Polygene Veranlagung für Herz-Kreislauf-Belastbarkeit — auch ohne klassische Risikofaktoren sichtbar, geeignet für frühe präventive Beratung.' },
      { name: 'Bluthochdruck', category: 'Herz', note: 'Veranlagung der individuellen Blutdruck-Regulation — Basis für Lifestyle-Empfehlungen (Bewegung, Salz, Stress).' },
      { name: 'Vorhofflimmern', category: 'Herz', note: 'Veranlagungs-Hinweis bei familiärer Häufung — präventive Lebensstil-Beratung (Koffein, Schlaf, Alkohol).' },
      { name: 'Salz & Blutdruck', category: 'Stoffwechsel', note: 'Salzsensitivität — individualisiert die Ernährungs-Empfehlung zur Blutdruck-Prävention.' },
      { name: 'Zellstress & Herz', category: 'Gesunde Alterung', note: 'Oxidativer-Stress-Status — orientiert antioxidative Ernährungs- und Supplement-Beratung.' }
    ],
    epigeneticReports: [
      { name: 'Biologisches Alter', note: 'MethylPace-Score als integrierter Endpunkt kardiovaskulärer Lebensstil-Wirkung.' },
      { name: 'Pro-/Anti-Entzündungs-Score', note: 'Aktueller systemischer Entzündungsstatus — präventiv durch Lebensstil modifizierbar.' }
    ],
    genes: ['APOE', 'CDKN2B-AS1', 'AGT', 'ACE', 'NOS3', 'CETP', 'LDLR', 'ABCG5', 'ABCG8']
  },

  ortho: {
    id: 'ortho',
    label: 'Orthopädie',
    headline: 'Für die orthopädische Praxis besonders relevant',
    sub: 'Knochen- und Gelenk-Belastbarkeit, Bindegewebs-Resilienz, Regenerations-Kapazität und Mikronährstoff-Verwertung — die genetische Grundlage präventiver Trainings-, Bewegungs- und Ernährungs-Beratung.',
    primaryDnaCategories: ['verletzung-regeneration', 'fitness'],
    secondaryDnaCategories: ['vitamine', 'supplements', 'stoffwechsel'],
    epigenetics: ['muskelschwund', 'entzuendung'],
    reports: [
      { name: 'LWS-Bandscheiben', category: 'Verletzung & Regeneration', note: 'Veranlagung für die Belastbarkeit der Wirbelsäule — Grundlage für individualisierte Bewegungs- und Belastungs-Empfehlungen.' },
      { name: 'Knochen-/Gelenkstabilität', category: 'Verletzung & Regeneration', note: 'Bindegewebs-Veranlagung — orientiert präventive Belastungs- und Trainings-Beratung.' },
      { name: 'Achillessehne', category: 'Verletzung & Regeneration', note: 'Sehnen-Belastbarkeit — individualisiert Trainings- und Aufwärm-Empfehlungen.' },
      { name: 'Arthrose-Bezug', category: 'Verletzung & Regeneration', note: 'Veranlagung im Gelenk-Stoffwechsel — Grundlage für frühe Bewegungs- und Ernährungs-Beratung.' },
      { name: 'Reha-/Erholungstyp', category: 'Verletzung & Regeneration', note: 'Individuelle Regenerations-Kinetik — orientiert Trainings- und Erholungs-Empfehlungen.' },
      { name: 'Knochendichte', category: 'Stoffwechsel', note: 'Veranlagung für die Knochendichte — Grundlage für präventive Bewegungs- und Nährstoff-Beratung.' },
      { name: 'Knochen & Gelenke', category: 'Gesunde Alterung', note: 'Langzeit-Veranlagung des Bewegungsapparats — Lebensstil-Beratung.' },
      { name: 'Vitamin D', category: 'Vitamine', note: 'Veranlagung in der Verwertung — erklärt unterschiedliche Antworten auf Substitution.' },
      { name: 'Glucosamin/Chondroitin', category: 'Supplements', note: 'Veranlagungs-Hinweis für die Response auf Knorpel-relevante Supplements.' }
    ],
    epigeneticReports: [
      { name: 'Muskelalterung', note: 'Epigenetischer Muskel-Status — präventiv durch Training und Ernährung modifizierbar.' },
      { name: 'Gesamt-Entzündungs-Score', note: 'Systemische Entzündung als Co-Faktor im Bewegungsapparat — präventiv modifizierbar.' }
    ],
    genes: ['COL5A1', 'COL1A1', 'GDF5', 'VDR', 'ACTN3']
  },

  allgemein: {
    id: 'allgemein',
    label: 'Allgemeinmedizin',
    headline: 'Für die hausärztliche Praxis besonders relevant',
    sub: 'Breites Präventions-Profil mit klarer Priorisierung: Mikronährstoff-Verwertung, kardiometabolische Veranlagung und biologisches Alter als integrierter Endpunkt für Lebensstil-Beratung.',
    primaryDnaCategories: ['vitamine', 'stoffwechsel'],
    secondaryDnaCategories: ['herz', 'sensitivitaeten', 'gesunde-alterung'],
    epigenetics: ['biologisches-alter', 'entzuendung', 'immunscore'],
    reports: [
      { name: 'Vitamin D', category: 'Vitamine', note: 'Veranlagung in der Verwertung — erklärt unterschiedliche Antworten auf Substitution.' },
      { name: 'Vitamin B12', category: 'Vitamine', note: 'Veranlagung in Verwertung und Bedarf — Hintergrund für unklare Energie-Themen.' },
      { name: 'Magnesium', category: 'Vitamine', note: 'Veranlagung im Magnesium-Bedarf — Bezug zu Schlaf, Krampfneigung, Stress-Resilienz.' },
      { name: 'Omega-3', category: 'Vitamine', note: 'Veranlagung für Bedarf und Verstoffwechslung — Grundlage für Ernährungs- und Supplement-Beratung.' },
      { name: 'Vitamin-/Mineralbedarf', category: 'Gesunde Alterung', note: 'Übersicht über systematische Bedarfs-Veranlagungen.' },
      { name: 'Typ-2-Diabetes', category: 'Stoffwechsel', note: 'Veranlagung im Glukose-Stoffwechsel — Grundlage für frühzeitige Lebensstil-Beratung.' },
      { name: 'Adipositas-Risiko', category: 'Stoffwechsel', note: 'Genetisch erklärbarer Anteil der Gewichts-Veranlagung — individualisiert Ernährungs- und Bewegungs-Empfehlungen.' },
      { name: 'Cholesterin', category: 'Herz', note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für individualisierte Ernährungs- und Bewegungs-Beratung.' },
      { name: 'Bluthochdruck', category: 'Herz', note: 'Veranlagung in der Blutdruck-Regulation — Basis für Lifestyle-Beratung.' },
      { name: 'Gluten', category: 'Sensitivitäten', note: 'Veranlagungs-Hinweis bei Verdacht auf Gluten-Sensitivität.' },
      { name: 'Laktose', category: 'Sensitivitäten', note: 'Veranlagung in der Laktose-Verwertung — Hintergrund bei Verträglichkeits-Themen.' }
    ],
    epigeneticReports: [
      { name: 'Biologisches Alter', note: 'Integrierter Endpunkt — sinnvolles Maß für die Wirkung von Lebensstil-Empfehlungen über Zeit.' },
      { name: 'Gesamt-Entzündungs-Score', note: 'Stille Entzündung — präventiv über Ernährung, Bewegung und Schlaf modifizierbar.' },
      { name: 'Immunscore', note: 'Methylierungs-basierter Immunzell-Status.' }
    ],
    genes: ['MTHFR', 'APOE', 'VDR', 'TCF7L2', 'FTO', 'MCM6']
  },

  innere: {
    id: 'innere',
    label: 'Innere Medizin',
    headline: 'Für die internistische Praxis besonders relevant',
    sub: 'Kardiometabolische Veranlagung, Nahrungsmittel-Sensitivitäten und systemischer Entzündungs-Status — Grundlage für präventive Lebensstil-Beratung jenseits der klassischen Laborparameter.',
    primaryDnaCategories: ['stoffwechsel', 'herz', 'sensitivitaeten'],
    secondaryDnaCategories: ['vitamine', 'gesunde-alterung'],
    epigenetics: ['biologisches-alter', 'entzuendung', 'immunscore'],
    reports: [
      { name: 'Typ-2-Diabetes', category: 'Stoffwechsel', note: 'Polygene Veranlagung im Glukose-Stoffwechsel — Grundlage für frühe Lebensstil-Beratung.' },
      { name: 'Adipositas-Risiko', category: 'Stoffwechsel', note: 'Genetisch erklärbarer Anteil der Gewichts-Veranlagung — individualisiert Ernährungs-Beratung.' },
      { name: 'Stoffwechsel & Alter', category: 'Gesunde Alterung', note: 'Langzeit-Veranlagung metabolischer Pfade — Endpunkt für präventive Beratung.' },
      { name: 'Salz & Blutdruck', category: 'Stoffwechsel', note: 'Salzsensitivität — individualisiert die Ernährungs-Empfehlung zur Blutdruck-Prävention.' },
      { name: 'Cholesterin', category: 'Herz', note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für Ernährungs- und Bewegungs-Beratung.' },
      { name: 'Herzkrankheits-Risiko', category: 'Herz', note: 'Polygene Veranlagung für Herz-Kreislauf-Belastbarkeit — sichtbar auch ohne klassische Risikofaktoren.' },
      { name: 'Gluten', category: 'Sensitivitäten', note: 'Veranlagungs-Hinweis Gluten-Sensitivität — Hintergrund für Ernährungs-Beratung.' },
      { name: 'Laktose', category: 'Sensitivitäten', note: 'Veranlagung in der Laktose-Verwertung — Hintergrund für Ernährungs-Beratung.' },
      { name: 'Zucker/Fruktose', category: 'Sensitivitäten', note: 'Veranlagung in der Kohlenhydrat-Verträglichkeit — Hintergrund für Ernährungs-Beratung.' },
      { name: 'Fettverträglichkeit', category: 'Sensitivitäten', note: 'Veranlagung in der Fett-Verträglichkeit — individualisiert Ernährungs-Empfehlungen.' }
    ],
    epigeneticReports: [
      { name: 'Biologisches Alter', note: 'Integrierter Endpunkt internistischer Prävention.' },
      { name: 'Gesamt-Entzündungs-Score', note: 'Systemischer Entzündungs-Status — präventiv über Lebensstil modifizierbar.' },
      { name: 'Immunscore', note: 'Methylierungs-basierter Immunstatus.' }
    ],
    genes: ['TCF7L2', 'FTO', 'APOE', 'MCM6', 'HLA']
  },

  neuro: {
    id: 'neuro',
    label: 'Neurologie / Psychiatrie',
    headline: 'Für die neurologisch-psychiatrische Praxis besonders relevant',
    sub: 'Stressverarbeitung, Schlaf-Phänotyp, kognitive Reserve und psychologische Veranlagung — Grundlage für Lebensstil-Beratung zu Ernährung, Bewegung, Schlafhygiene und Stress-Management.',
    primaryDnaCategories: ['mental-health', 'psychologisch', 'stress', 'schlaf'],
    secondaryDnaCategories: ['vitamine', 'gesunde-alterung'],
    epigenetics: ['gedaechtnisalter', 'biologisches-alter', 'entzuendung'],
    reports: [
      { name: 'Kognition', category: 'Gesunde Alterung', note: 'Langzeit-Veranlagung kognitiver Reserve — Endpunkt präventiver Lebensstil-Beratung.' },
      { name: 'Aufmerksamkeit', category: 'Mental Health', note: 'Veranlagung der Aufmerksamkeits-Regulation — Hintergrund für Lifestyle-Empfehlungen (Schlaf, Ernährung, Bewegung).' },
      { name: 'Stress-Resilienz', category: 'Mental Health', note: 'Veranlagungs-Phänotyp unter Belastung — Grundlage für Stress-Management-Beratung.' },
      { name: 'Gedächtnis', category: 'Mental Health', note: 'Veranlagung für Lernen und Gedächtnis-Konsolidierung — Grundlage für individualisierte Empfehlungen.' },
      { name: 'Warrior/Worrier-Profil', category: 'Mental Health', note: 'Phänotyp der Stress- und Reiz-Verarbeitung — orientiert präventive Beratung.' },
      { name: 'COMT', category: 'Psychologisch', note: 'Dopamin-Abbau-Phänotyp — orientiert Stress-Management- und Lebensstil-Beratung.' },
      { name: 'MAOA', category: 'Psychologisch', note: 'Monoamin-Abbau-Phänotyp.' },
      { name: 'Emotionsregulation', category: 'Psychologisch', note: 'Veranlagung für emotionale Reaktivität — Hintergrund für Beratung zu Stress und Schlaf.' },
      { name: 'Brain-Fog-Bezug', category: 'Psychologisch', note: 'Veranlagungs-Hinweis kognitive Klarheit — Bezug zu Ernährung, Schlaf, Stress.' },
      { name: 'Chronotyp', category: 'Schlaf', note: 'Lerche/Eule-Phänotyp — individualisiert Schlafhygiene und Tagesstruktur.' },
      { name: 'Schlafqualität', category: 'Schlaf', note: 'Veranlagung in der Schlaf-Architektur — Grundlage für Schlafhygiene-Beratung.' },
      { name: 'Stress & Schlaf', category: 'Stress', note: 'Stress-Schlaf-Achse — Grundlage für individualisierte Lebensstil-Empfehlungen.' }
    ],
    epigeneticReports: [
      { name: 'Gedächtnisalter', note: 'Epigenetischer Endpunkt kognitiver Alterung — modifizierbar durch Lebensstil.' },
      { name: 'Biologisches Alter', note: 'Integrierter Endpunkt präventiver Lebensstil-Beratung.' }
    ],
    genes: ['COMT', 'MAOA', 'BDNF', 'APOE', 'PER3', 'MTHFR']
  },

  sport: {
    id: 'sport',
    label: 'Sportmedizin',
    headline: 'Für die sportmedizinische Praxis besonders relevant',
    sub: 'Trainings-Phänotyp, Regenerations-Kapazität, Substrat-Nutzung und Belastbarkeit des Bewegungsapparats — die genetische Grundlage individueller Trainings- und Ernährungs-Empfehlungen.',
    primaryDnaCategories: ['fitness', 'verletzung-regeneration'],
    secondaryDnaCategories: ['supplements', 'stoffwechsel'],
    epigenetics: ['muskelschwund', 'entzuendung', 'biologisches-alter'],
    reports: [
      { name: 'Muskelkraft', category: 'Fitness', note: 'Veranlagung im Kraft-Phänotyp — orientiert Trainings-Planung.' },
      { name: 'Muskelausdauer', category: 'Fitness', note: 'Veranlagung im Ausdauer-Phänotyp — orientiert Trainings-Planung.' },
      { name: 'VO₂max', category: 'Fitness', note: 'Veranlagung in der aeroben Trainierbarkeit — individualisiert Ausdauer-Empfehlungen.' },
      { name: 'Anaerobe Schwelle', category: 'Fitness', note: 'Veranlagung im Laktat-Stoffwechsel — orientiert Intensitäts-Bereiche.' },
      { name: 'Erholungsfähigkeit', category: 'Fitness', note: 'Regenerations-Kinetik nach Belastung — orientiert Erholungs-Empfehlungen.' },
      { name: 'Lean Mass', category: 'Fitness', note: 'Veranlagung im Magermasse-Aufbau — orientiert Krafttrainings- und Ernährungs-Empfehlungen.' },
      { name: 'Training fasted/fed', category: 'Fitness', note: 'Substrat-Nutzungs-Phänotyp — orientiert Ernährungs-Timing.' },
      { name: 'LWS-Bandscheiben', category: 'Verletzung & Regeneration', note: 'Belastungs-Veranlagung der Wirbelsäule — orientiert Trainings-Empfehlungen.' },
      { name: 'Achillessehne', category: 'Verletzung & Regeneration', note: 'Sehnen-Belastbarkeit — individualisiert Trainings- und Aufwärm-Empfehlungen.' },
      { name: 'Reha-/Erholungstyp', category: 'Verletzung & Regeneration', note: 'Individuelle Regenerations-Kinetik — orientiert Erholungs-Empfehlungen.' },
      { name: 'Kreatin', category: 'Supplements', note: 'Veranlagungs-Hinweis Kreatin-Response.' },
      { name: 'Beta-Alanine', category: 'Supplements', note: 'Veranlagungs-Hinweis Beta-Alanin-Response.' }
    ],
    epigeneticReports: [
      { name: 'Muskelalterung', note: 'Epigenetischer Muskel-Status — durch Training und Ernährung modifizierbar.' },
      { name: 'Gesamt-Entzündungs-Score', note: 'Regenerations-relevanter Entzündungs-Status.' }
    ],
    genes: ['ACTN3', 'ACE', 'PPARA', 'PPARGC1A', 'COL5A1', 'MSTN']
  },

  andere: {
    id: 'andere',
    label: 'Andere Fachrichtung',
    headline: 'Was der LIFETIME-Test in jeder Praxis liefert',
    sub: 'Auch jenseits der häufigsten Fachrichtungen liefert der Test ein Präventions-Profil aus Mikronährstoff-Veranlagung, kardiometabolischer Veranlagung und epigenetischem Alterungs- und Entzündungs-Status — Grundlage für individualisierte Lebensstil-Beratung.',
    primaryDnaCategories: ['vitamine', 'gesunde-alterung'],
    secondaryDnaCategories: ['stoffwechsel', 'herz', 'sensitivitaeten'],
    epigenetics: ['biologisches-alter', 'entzuendung', 'immunscore'],
    reports: [
      { name: 'Vitamin-/Mineralbedarf', category: 'Gesunde Alterung', note: 'Übersicht systematischer Bedarfs-Veranlagungen.' },
      { name: 'Langlebigkeit', category: 'Gesunde Alterung', note: 'Polygene Langzeit-Veranlagung — Endpunkt präventiver Beratung.' },
      { name: 'Vitamin D', category: 'Vitamine', note: 'Veranlagung in der Verwertung.' },
      { name: 'Vitamin B12', category: 'Vitamine', note: 'Veranlagung in der Verwertung — Hintergrund für Energie-Themen.' },
      { name: 'Typ-2-Diabetes', category: 'Stoffwechsel', note: 'Veranlagung im Glukose-Stoffwechsel — Grundlage präventiver Beratung.' },
      { name: 'Cholesterin', category: 'Herz', note: 'Veranlagung im Lipid-Stoffwechsel.' }
    ],
    epigeneticReports: [
      { name: 'Biologisches Alter', note: 'Integrierter Endpunkt präventiver Lebensstil-Beratung.' },
      { name: 'Gesamt-Entzündungs-Score', note: 'Systemischer Entzündungs-Status — modifizierbar.' },
      { name: 'Immunscore', note: 'Methylierungs-basierter Immunstatus.' }
    ],
    genes: ['APOE', 'MTHFR', 'VDR', 'TCF7L2', 'FTO']
  }
};
```

## Fokus-Modifikatoren

Q2 modifiziert die Reihenfolge und Hervorhebung der **Reports** pro Fachrichtung. Implementierung als Re-Sort der `reports`-Liste, keine separaten Listen.

Hinweis: "Therapie-Begleitung" ist hier **bewusst nicht** als Pharmakogenetik framed, weil der Test keine PGx-Reports als Kategorie führt. Die Fokus-Optionen werden umbenannt:

```js
const FOCUS = [
  { id: 'praevention',    label: 'Prävention & Healthspan',          desc: 'Begleitung gesunder oder beschwerdearmer Patient:innen' },
  { id: 'veranlagung',    label: 'Familiäre Veranlagung',            desc: 'Familiäre Häufung, Frühindikatoren, individuelle Veranlagung' },
  { id: 'sensitivitaet',  label: 'Verträglichkeiten & Nährstoffe',   desc: 'Hintergrund bei unklaren Symptomen, Substitution, Ernährungs-Beratung' },
  { id: 'lifestyle',      label: 'Lifestyle-Beratung',               desc: 'Ernährung, Bewegung, Schlaf, Supplements' }
];

const FOCUS_MODIFIERS = {
  praevention:    { boostCategories: ['Gesunde Alterung'], boostEpigenetics: ['Biologisches Alter', 'EpiVitality'] },
  veranlagung:    { boostCategories: ['Herz', 'Stoffwechsel'], boostEpigenetics: ['Pro-/Anti-Entzündungs-Score', 'Gesamt-Entzündungs-Score'] },
  sensitivitaet:  { boostCategories: ['Sensitivitäten', 'Vitamine'], boostEpigenetics: [] },
  lifestyle:      { boostCategories: ['Stoffwechsel', 'Fitness', 'Supplements', 'Vitamine'], boostEpigenetics: [] }
};
```

**Re-Sort-Logik:** Reports, deren Kategorie in einem aktiven Fokus boost ist, rücken in der Anzeige nach vorn. Max 6 Reports werden auf der Result-Page hervorgehoben. Wenn weniger als 6 Reports durch Boost angesprochen sind, wird mit der Standard-Reihenfolge der Fachrichtung aufgefüllt. Epigenetik-Reports werden analog re-sortiert.

## Result-Page Layout

Eine Seite, scrollbar, kein Akkordeon. Header und Footer der Hauptseite sichtbar (anders als beim AGE-Quiz).

### Sektion 1 — Fachrichtungs-Header

- Headline aus `SPECIALTIES[x].headline`
- Sub-Text aus `SPECIALTIES[x].sub`
- Klein darunter: "Wissenschaftlich begleitet von Prof. Dr. med. Volker Limmroth · Laboranalyse durch Eurofins Genomics"

### Sektion 2 — Top-Reports (4–6 Karten + Epigenetik-Reihe)

Karten-Grid mit echten Report-Namen aus dem Test. Desktop: 2×3 oder 3×2, Mobile: untereinander. Pro Karte:

- **Report-Name groß** (z.B. "Cholesterin", "VO₂max", "Stress-Resilienz")
- Kleine Kategorie-Pill (z.B. "Herz", "Fitness", "Mental Health")
- Ein Satz **klinische Bedeutung im Befund** (was bekommt der/die Patient:in als Aussage)
- Ein Satz **Anwendung in Ihrer Praxis** (wie Sie das nutzen)

Darunter optionale Zeile (klein, dezent, eine pro Karten-Block oder am Ende der Sektion):

> *Wissenschaftliche Grundlage: u.a. {Gene}. Sie sehen im Befund die interpretierte Aussage pro Report, nicht die Rohdaten.*

**Eigene Sub-Sektion direkt darunter — Epigenetik:**

Headline: "Aktueller Status (epigenetisch)"
Sub: "Zusätzlich zur DNA-Disposition misst der Test über Methylierungs-Analyse Ihren aktuellen Status — modifizierbar durch Lebensstil und sinnvoll als Verlaufsparameter."

3 horizontal angeordnete kleine Karten mit den fachrichtungs-passenden Epigenetik-Reports (aus `epigeneticReports`).

### Sektion 3 — Matrix mit Perspektiv-Wechsler

**Headline:** Ein Test, 22 Bereiche — jede Fachrichtung wertet andere Schwerpunkte aus.

**Aufbau (entspricht Produktspec):**
- 4×4-Grid der **16 DNA-Kategorien** (Gesunde Alterung · Supplements · Vitamine · Sensitivitäten · Stoffwechsel · Fitness · Verletzung & Regeneration · Mental Health · Psychologisch · Schlaf · Stress · Herz · Atemwege · Augen · Haare · Niere)
- Bar darunter mit den **6 Epigenetik-Bereichen** (Körperalter [Höralter · Gedächtnisalter · Sehalter] · Biologisches Alter · EpiVitality · Immunscore · Entzündung · Muskelschwund)

**Drei Highlight-Stufen:**
- **Stark (Theme-Akzent):** Kategorien aus `primaryDnaCategories` + Epigenetik aus `epigenetics`
- **Mittel (Akzent abgesetzt):** Kategorien aus `secondaryDnaCategories`
- **Aus (neutral, aber sichtbar):** Alle übrigen — als Beweis "ein Test, alle Bereiche"

**Tooltip pro Kachel:** beim Hover/Tap die *konkreten Report-Namen* dieser Kategorie anzeigen, damit der Arzt sieht was er bekommt. Quelldaten aus `produktdetails-age-dna-test.md` §"DNA-Reports".

**Perspektiv-Wechsler:** Horizontale Chip-Reihe über der Matrix mit allen 10 Fachrichtungen. Aktive Fachrichtung hervorgehoben. Klick auf andere Fachrichtung re-rendert die Matrix live mit deren Highlights. **Headline und Top-Reports bleiben auf der ursprünglichen Auswahl stehen** — Beschriftung des Wechslers: "Was sähe ein:e Kolleg:in aus …".

**Zeile darunter:** "Von 22 Bereichen sind {X} für [Fachrichtung] direkt klinisch im Vordergrund — die übrigen liefern Kontext und werden im Befund nicht versteckt."

### Sektion 4 — Partnerprogramm-CTA

Visuell abgesetzte Sektion (Card mit Theme-Akzent-Hintergrund).

**Sub-Headline:** Empfehlungsprogramm für niedergelassene Praxen

**Text:** LIFETIME arbeitet mit Ärzt:innen zusammen, die unseren Test in passende Präventions- und Lebensstil-Gespräche integrieren. Im persönlichen Gespräch zeigen wir Ihnen die LIFETIME App (in der Ihre Patient:innen ihre Reports erhalten) und besprechen die Konditionen einer Zusammenarbeit.

**Primär-CTA (groß, Theme-Akzent):** "Gespräch vereinbaren" → Calendly: `https://calendly.com/lifetime365/longevity-coaching` (gleiches Konto wie auf `/pages/longevity-coach`). Im Schema überschreibbar, aber Default ist diese URL.

**Sekundär-CTA (optional, Outline):** "Mehr zum Test erfahren" → linkt auf die PDP `/products/lifetime-age-dna` mit UTM-Tag `?utm_source=doctor-quiz&utm_medium=result&utm_content=secondary-cta&specialty={id}`.

> Hinweis: Diese Spec listete früher Assets wie "Muster-Befund-PDF", "Patient:innen-Materialien (DIN A6)" oder "Persönliches Briefing durch Prof. Limmroth" als Partner-Perks. Diese existieren bisher nicht und wurden entfernt. Wenn solche Assets geschaffen werden, gehören sie hier wieder rein — vorher nicht.

### Sektion 5 — Trust-Footer

Drei Spalten klein, alle Inhalte direkt aus `lifetime-produktdetails/produktdetails-age-dna-test.md`:

- **Wissenschaftliche Begleitung:** Prof. Dr. med. Volker Limmroth
- **Laboranalyse:** Eurofins Genomics · ISO 9001 · ISO 17025 · ISO 13485
- **Ablauf:** Speichelprobe von zuhause · Ergebnisse in 6–8 Wochen in der LIFETIME App (mit PDF-Export)

> Wenn weitere Trust-Elemente (Limmroths Klinik/Funktion, CE-Zertifizierungen, "In Deutschland entwickelt" o.ä.) angezeigt werden sollen, müssen sie vorher in `produktdetails-age-dna-test.md` ergänzt und verifiziert werden.

## Shopify-Integration

### Buchungs-CTA (Primär)

Calendly-Link, öffnet in neuem Tab:
`https://calendly.com/lifetime365/longevity-coaching?hide_gdpr_banner=1&utm_source=doctor-quiz&utm_medium=result&utm_campaign=partner-program&specialty={id}&focus={focus_ids}`.

Hinweis: Dieselbe Calendly-Adresse wird bereits in `templates/page.longevity-coach.json` als Inline-Widget eingebunden. Für die Ärzte-Page reicht ein externer Link (öffnet Calendly im neuen Tab) — ein Inline-Widget am Ende einer ohnehin scrollbaren Page würde die Seite zu schwer machen.

State (Fachrichtung, Fokus) wird über UTM-Parameter mitgegeben, damit die Person, die das Gespräch annimmt, den Kontext kennt.

### Kein Lead-Capture-Formular im MVP

Diese Spec sieht **bewusst kein E-Mail-Formular** mehr vor. Begründung: Es gibt aktuell kein Lead-Magnet-Asset (Muster-Befund, PDF, Whitepaper o.ä.), das den E-Mail-Sammel rechtfertigt. Bevor Ärzt:innen ihre Mail-Adresse abgeben, müssten wir etwas Konkretes versprechen — und das müsste erst existieren.

Wenn später ein passendes Asset entsteht (z.B. eine ehrliche App-Demo-Aufzeichnung, ein Use-Case-PDF mit echten anonymisierten Reports, eine Limmroth-Audio-Einordnung etc.), kann hier nachträglich ein Inline-Form ergänzt werden.

## Tracking

GA4 Events:
```
doctor_quiz_start
doctor_quiz_specialty_selected (custom: specialty)
doctor_quiz_focus_selected (custom: focus_array)
doctor_quiz_completed (custom: specialty, focus_array)
doctor_quiz_perspective_switched (custom: from, to)
doctor_quiz_booking_clicked (custom: specialty, focus_array)
doctor_quiz_secondary_cta_clicked (custom: specialty)
```

## Datei-Struktur

```
sections/
  lt-doctor-quiz.liquid           # Hauptkomponente (Quiz + Result)
snippets/
  lt-doctor-quiz-q1-specialty.liquid
  lt-doctor-quiz-q2-focus.liquid
  lt-doctor-quiz-loading.liquid
  lt-doctor-quiz-result.liquid
  lt-doctor-quiz-matrix.liquid     # eigene Matrix mit 2-Stufen-Highlight
  lt-doctor-quiz-marker-card.liquid
templates/
  page.aerzte.json                 # Slug Platzhalter: /pages/aerzte
assets/
  lt-doctor-quiz.js                # State, Re-Sort, Perspektiv-Wechsler
  section-lt-doctor-quiz.css       # Quiz-spezifisch
```

## Schema-Settings (Theme-Editor)

- Calendly/Buchungs-URL
- Sekundär-CTA-URL (Default: PDP `/products/lifetime-age-dna`)
- Headline/Sub pro Fachrichtung als Repeater (Defaults aus dieser Spec)
- Report-Notes als Repeater pro Fachrichtung
- Trust-Footer-Inhalte
- Tracking-IDs

## Implementierungs-Reihenfolge

1. Section-Skeleton + State-Maschine in JS, ohne UI
2. Q1 (Single-Select Karten) — Pattern aus `lt-pdp-quiz-v2` adaptieren
3. Q2 (Multi-Select Karten, max 2)
4. Loading-Screen
5. Result-Page Sektion 1 (Header) + Sektion 2 (Report-Karten + Epigenetik-Reihe)
6. Matrix-Komponente mit 3-Stufen-Highlight
7. Perspektiv-Wechsler (live Re-Render Matrix)
8. CTA-Sektion (Buchungs-Link primär, PDP-Link sekundär)
9. Tracking
10. Schema-Settings + Theme-Editor-Editierbarkeit

## Offene Punkte (vor Go-Live klären)

1. **Slug der Page:** `/pages/aerzte` vs. `/pages/fuer-aerzte` vs. `/pages/partnerprogramm` — BJ entscheidet.
2. ~~**Calendly-/Buchungs-URL:** noch zu setzen.~~ → **Resolved 2026-05-19:** Bestehende Calendly-URL `https://calendly.com/lifetime365/longevity-coaching` wiederverwendet (gleiche Adresse wie auf `/pages/longevity-coach`). Es gibt also keinen separaten Ärzte-Kalender; Termine landen im gleichen Pool. Wenn das mittelfristig getrennt werden soll, eigene Calendly-Event-Type anlegen und URL hier überschreiben.
3. **Medizinische Validierung:** Alle Report-Notes (Bedeutung + Anwendungssatz) durch Prof. Limmroth gegenprüfen lassen. Report-**Namen** stammen 1:1 aus `produktdetails-age-dna-test.md`; die einsatzbezogenen Texte sind Erstentwürfe.
4. **Sichtbarkeit der Gen-Ebene im App-Befund:** Klären, ob und wo der Arzt die Gen-Liste in der LIFETIME App oder im PDF-Export sieht. Davon hängt ab, wie offensiv die "Wissenschaftliche Grundlage"-Zeile auf der Result-Page positioniert wird.
5. **B2B-Konditionen:** Inhaltlich noch nicht fixiert — Spec lässt das bewusst offen, CTA verspricht nur "Gespräch vereinbaren".
6. **Lead-Magnet-Asset:** Aktuell kein E-Mail-Sammelpunkt im MVP, weil kein Asset existiert. Wenn ein App-Demo-Video, Use-Case-PDF o.ä. entsteht → Inline-Form nachträglich einbauen.
7. **Tonalitäts-Check vor Go-Live:** Keine krankheits-/therapie-bezogene Sprache irgendwo auf der Page (Trust-Footer, CTAs, Validierungen).
8. **Trust-Footer-Inhalte:** Aktuell nur das, was in `produktdetails-age-dna-test.md` steht. Wenn weitere Trust-Elemente (Limmroth-Klinik/Funktion, weitere Zertifikate, "In Deutschland entwickelt") angezeigt werden sollen, vorher in der Produktspec ergänzen.

## Was diese Spec nicht enthält

- Konkrete Design-Token, Farben, Spacing — alles aus `design-tokens.mdc` und `_examples/`
- Vollständige medizinisch validierte Texte — Erstentwürfe, BJ + Limmroth überarbeiten
- B2B-Konditionen — bewusst offen
- A/B-Test-Hypothesen — separater Schritt nach Live-Gang
