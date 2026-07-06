# Spec: AGE & DNA Quiz

Implementierungs-Spec für Claude Code. Design-Token, Farben, Typografie aus `_examples/` und `.cursor/rules/`. Keine Design-Entscheidungen in dieser Datei.

## Scope

Ablösung des bestehenden Quiz auf der AGE & DNA-Test PDP. Bedürfnisorientiertes Quiz mit Live-Matrix-Highlighting, Top-3-Result-Page, E-Mail-Lead-Capture über Shopify-Customer.

## Architektur

Eine einzelne Liquid-Section `lt-pdp-quiz-v2.liquid` mit eingebetteter JavaScript-Logik. State client-side. Submission zum Shopify-Customer-Endpoint am Ende.

State-Maschine mit 9 Schritten:

```
intro → q1 → q2 → q3 → q4 → q5 → q6 → q7 → loading → result
```

State-Objekt:

```js
{
  step: 'q1',
  answers: {
    sleep: null,        // 1-5 (Slider)
    energy: null,       // 1-5
    stress: null,       // 1-5
    weight: null,       // 1-5
    activity: null,     // 'aktiv' | 'arm' | 'wechselnd' | 'neustart'
    prevention: [],     // Multi: ['herz', 'kognition', 'haut', 'supplements', 'bioalter']
    age: 35             // 25-75
  },
  scores: {},           // berechnet aus answers
  topThree: [],         // ['sleep', 'stress', 'energy']
  email: null,
  submitted: false
}
```

## Fragen

Sieben Fragen. Auto-Advance bei Slider und Single-Karten (300ms Bestätigung). Manueller Weiter-Button bei Multi-Select.

### Q1 Schlaf — Slider 5-stufig

Headline: Wie ist dein Schlaf?
Slider-Labels: Sehr schlecht / Schlecht / Mittel / Gut / Sehr gut
Hinweis (einklappbar, default zu): Schlaf ist genetisch stark beeinflusst — dein PER3-Gen bestimmt deinen Chronotyp, dein CYP1A2-Gen, wie schnell du Koffein abbaust. Deine Antwort hilft uns, dir die relevanten DNA-Bereiche zu zeigen.
Triggert: `sleep`-Score

### Q2 Energie — Slider 5-stufig

Headline: Wie ist deine Energie tagsüber?
Slider-Labels: Permanent müde / Oft müde / Wechselnd / Meistens fit / Voll Energie
Hinweis: Müdigkeit hat oft drei genetische Quellen: Mikronährstoffe (MTHFR, VDR), Schlaf, und stille Entzündungen. Deine Antwort hilft uns, deinen Fokus zu bestimmen.
Triggert: `energy`-Score

### Q3 Stress — Slider 5-stufig

Headline: Wie sehr belastet dich Stress?
Slider-Labels: Sehr stark / Stark / Mittel / Wenig / Kaum
Hinweis: Wie dein Körper Stress verarbeitet, steht in deinem COMT-Gen — und beeinflusst Schlaf, Konzentration und sogar dein biologisches Alter.
Triggert: `stress`-Score

### Q4 Gewicht — Slider 5-stufig

Headline: Wie zufrieden bist du mit deinem Gewicht und Stoffwechsel?
Slider-Labels: Gar nicht / Wenig / Mittel / Ziemlich / Sehr
Hinweis: Dein FTO- und TCF7L2-Gen bestimmen, wie dein Körper auf Kohlenhydrate reagiert. Deine Selbsteinschätzung hilft uns, den passenden Schwerpunkt zu setzen.
Triggert: `weight`-Score

### Q5 Aktivität — Single-Select Karten

Headline: Wie aktiv bist du körperlich?
Optionen: Sportlich aktiv / Eher bewegungsarm / Wechselnd / Will neu starten
Hinweis: Sport wirkt genetisch verschieden — dein ACTN3-Gen bestimmt, ob du eher Kraft- oder Ausdauertyp bist. So priorisieren wir die richtigen Empfehlungen.
Triggert: `training`-Score (nur bei aktiv/neustart)

### Q6 Prävention — Multi-Select Karten, max 3

Headline: Worauf willst du dich präventiv konzentrieren?
Sub: Wähle bis zu 3 Themen.
Optionen: Herz & Kreislauf / Geistige Fitness / Haut & Haar / Vitamine & Supplements / Biologisches Alter
Hinweis: Manche genetischen Marker werden ab einer Lebensphase wichtiger — APOE für Herz und Kognition, AR für Haar, SIRT1 und FOXO3 für Langlebigkeit.
Triggert: pro Auswahl entsprechenden Score (`heart`, `cognition`, `skin`, `supplements`, `bioage`)

### Q7 Alter — numerischer Slider

Headline: Wie alt bist du?
Range: 25–75, Default 40
Live-Anzeige der Zahl groß zentriert.
Hinweis: Manche Themen werden mit dem Alter relevanter (Hormonelle Verschiebungen, Prävention, kognitive Reserve). Dein Alter hilft uns, die richtige Tiefe zu wählen.
Triggert: kein Score, nur Personalisierung der Result-Page

## Scoring-Logik

Pro Bedürfnis Punkte sammeln. Top 3 = die drei höchsten Scores.

```js
function computeScores(answers) {
  const s = {};
  
  // Slider 1-5: invertiert (1 = Problem = hoher Score)
  if (answers.sleep) s.sleep = 6 - answers.sleep;
  if (answers.energy) s.energy = 6 - answers.energy;
  if (answers.stress) s.stress = 6 - answers.stress;
  if (answers.weight) s.weight = 6 - answers.weight;
  
  // Aktivität: nur wenn relevant
  if (answers.activity === 'aktiv' || answers.activity === 'neustart') {
    s.training = 4;
  }
  
  // Prävention: pro Auswahl 4 Punkte
  if (answers.prevention.includes('herz')) s.heart = 4;
  if (answers.prevention.includes('kognition')) s.cognition = 4;
  if (answers.prevention.includes('haut')) s.skin = 4;
  if (answers.prevention.includes('supplements')) s.supplements = 4;
  if (answers.prevention.includes('bioalter')) s.bioage = 4;
  
  return s;
}

function getTopThree(scores) {
  return Object.entries(scores)
    .filter(([_, v]) => v >= 2)        // nur echte Bedürfnisse
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);
}
```

Fallback wenn weniger als 3 Bedürfnisse: nach Alter aufgefüllt.
- Unter 45: `bioage`, `energy`, `sleep`
- 45–60: `bioage`, `heart`, `cognition`
- Über 60: `cognition`, `heart`, `bioage`

## Bedürfnis-Mapping

Jedes Bedürfnis hat: ID, Titel, Kurztext (Top-3-Karte), Lang-Inhalt (Detail-Akkordeon), DNA-Kategorien (Top-4 für Matrix-Highlighting), Gene.

```js
const NEEDS = {
  bioage: {
    id: 'bioage',
    title: 'Biologisches Alter senken',
    short: 'Dein Alter im Pass ist Statistik. Dein epigenetisches Alter ist Realität. Wir zeigen dir, welche Schalter bei dir wirken: SIRT1, FOXO3 und TP53 — die wichtigsten Langlebigkeits-Gene.',
    genes: ['SIRT1', 'FOXO3', 'TP53', 'MTOR'],
    dnaCategories: ['gesunde-alterung', 'stoffwechsel', 'supplements', 'vitamine'],
    detail: { ... }   // siehe Sektion Detail-Inhalte
  },
  weight: {
    id: 'weight',
    title: 'Verstehen, wie der Körper Essen verarbeitet',
    short: 'Dein FTO-Gen bestimmt, wie schnell du zunimmst. Dein TCF7L2-Gen, wie dein Blutzucker reagiert. Plus MC4R — der zentrale Sättigungs-Schalter.',
    genes: ['FTO', 'TCF7L2', 'MCM6', 'MC4R'],
    dnaCategories: ['stoffwechsel', 'sensitivitaeten', 'vitamine', 'stress']
  },
  energy: {
    id: 'energy',
    title: 'Energie zurückgewinnen',
    short: 'Müdigkeit hat drei Quellen: Mikronährstoff-Defizite (MTHFR, VDR), schlechter Schlaf, stille Entzündungen (IL6, TLR4). Wir zeigen dir, welcher Hebel bei dir am stärksten greift.',
    genes: ['MTHFR', 'VDR', 'IL6', 'TLR4'],
    dnaCategories: ['vitamine', 'supplements', 'schlaf', 'stoffwechsel']
  },
  sleep: {
    id: 'sleep',
    title: 'Endlich durchschlafen',
    short: 'Dein PER3-Gen sagt, ob du Lerche oder Eule bist. Dein CYP1A2-Gen, wie schnell du Koffein abbaust. Plus ADORA2A — wie sehr Koffein dein Nervensystem aufdreht.',
    genes: ['PER3', 'CYP1A2', 'ADORA2A'],
    dnaCategories: ['schlaf', 'stress', 'mental-health', 'supplements']
  },
  stress: {
    id: 'stress',
    title: 'Stress verstehen und Nervensystem unterstützen',
    short: 'Dein COMT-Gen bestimmt, wie du Stress verarbeitest. Schnelle Variante: stressresistent. Langsame: tiefer Denker, längere Reaktion. Dazu BDNF — deine mentale Erholung.',
    genes: ['COMT', 'BDNF'],
    dnaCategories: ['stress', 'psychologisch', 'mental-health', 'schlaf']
  },
  cognition: {
    id: 'cognition',
    title: 'Konzentration, Klarheit, Gedächtnis',
    short: 'Drei Schalter für geistige Schärfe: BDNF für Lernfähigkeit, FADS1 für Omega-3-Verwertung, APOE als wichtigster Marker für kognitive Langzeit-Gesundheit.',
    genes: ['BDNF', 'FADS1', 'APOE'],
    dnaCategories: ['mental-health', 'schlaf', 'vitamine', 'psychologisch']
  },
  training: {
    id: 'training',
    title: 'Smarter trainieren',
    short: 'Dein ACTN3-Gen sagt, ob du Kraft- oder Ausdauer-Typ bist. Dein ACE-Gen, wie schnell dein VO₂max trainierbar ist. COL5A1 zeigt deine Sehnen-Stabilität.',
    genes: ['ACTN3', 'ACE', 'COL5A1', 'PPARA'],
    dnaCategories: ['fitness', 'verletzung-regeneration', 'supplements', 'stoffwechsel']
  },
  heart: {
    id: 'heart',
    title: 'Herz aktiv schützen',
    short: 'APOE zeigt dein Cholesterin-Profil. AGT, wie Salz deinen Blutdruck beeinflusst. CDKN2B-AS1 am 9p21-Locus — das stärkste bekannte genetische Herz-Risiko.',
    genes: ['APOE', 'AGT', 'CDKN2B-AS1', 'CETP'],
    dnaCategories: ['herz', 'stoffwechsel', 'vitamine', 'supplements']
  },
  supplements: {
    id: 'supplements',
    title: 'Passende Vitamine und Supplements',
    short: 'Deine MTHFR-Variante bestimmt, ob du normale Folsäure verwerten kannst oder methylierte brauchst. VDR, wie viel Vitamin D ankommt. BCO1, ob du Beta-Carotin in Vitamin A umwandeln kannst.',
    genes: ['MTHFR', 'VDR', 'FUT2', 'BCO1'],
    dnaCategories: ['vitamine', 'supplements', 'sensitivitaeten', 'stoffwechsel']
  },
  skin: {
    id: 'skin',
    title: 'Haut und Haar von innen',
    short: 'Hautalterung hängt an SOD2 (antioxidative Abwehr) und ERCC2 (UV-Schaden-Reparatur). Beim Haar zeigt AR, wie deine Follikel auf DHT reagieren — der Hauptfaktor für Haarausfall.',
    genes: ['SOD2', 'ERCC2', 'AR', 'MC1R'],
    dnaCategories: ['haare', 'vitamine', 'supplements', 'gesunde-alterung']
  }
};
```

## Matrix

22 Kategorien gesamt. 16 DNA (4×4-Grid) und 2 Epigenetik (separate Bar darunter — biologisches Alter und Entzündung). Die Epigenetik-Anker sind bei jedem Bedürfnis sichtbar aktiv, unabhängig von der Antwort.

DNA-Kategorien (16):

```js
const DNA_CATEGORIES = [
  'gesunde-alterung', 'supplements', 'vitamine', 'sensitivitaeten',
  'stoffwechsel', 'fitness', 'verletzung-regeneration', 'mental-health',
  'psychologisch', 'schlaf', 'stress', 'herz',
  'atemwege', 'augen', 'haare', 'niere'
];
```

Pro Kategorie: Label, Tooltip-Text (1 Satz, was darin enthalten ist).

Aktiv-Zustand: Kachel leuchtet im Theme-Token-Akzent (siehe `_examples/`). Inaktiv: dezent grau wie in `design-tokens.mdc` definiert.

Aktivierungs-Stärke gestuft:
- Stark: Slider-Antwort 1–2 (rot), Single-Select aktivierend, Multi-Select-Auswahl
- Mittel: Slider 3 (gelb)
- Aus: Slider 4–5 (grün), nicht-aktivierend

Im Quiz: nach jeder Antwort entsprechende Kategorien aktivieren (CSS-Class wechseln, kurze Pulse-Animation aus `design-tokens.mdc`).

## Quiz-UI-Layout

Desktop: Frage links 40%, Matrix rechts 60%, vertikal zentriert. Mobile: Frage oben, Matrix kompakt darunter, scrollbar wenn nötig.

Header (durchgehend, fixed top): schmale Progress-Bar in Theme-Akzent, daneben dezenter Counter "3 von 7". Links oben Zurück-Pfeil (außer auf Q1). Rechts oben Schließen-X (öffnet Bestätigungs-Dialog).

Body: Frage-Headline, Mechanik (Slider / Karten / Multi-Select), darunter klein der einklappbare "Warum fragen wir das?"-Link. Beim Klick auf den Link klappt der Hinweistext darunter aus (kein Modal).

Footer: leer bei Auto-Advance-Fragen. Bei Multi-Select: Weiter-Button (deaktiviert solange 0 Auswahl, beschriftet mit Auswahlzahl ab 1).

Header der Seite (LIFETIME-Hauptnav) und Footer der Seite bleiben während des Quiz ausgeblendet — Quiz nimmt vollen Viewport.

## Slider-Komponente

5-Stufen-Slider mit Farbverlauf von Theme-Rot zu Theme-Grün. Diskrete Stops, nicht kontinuierlich. Pro Stop ein Label unter dem Slider. Auf Mobile als 5 horizontal angeordnete Touch-Targets (mind. 44px Höhe).

Beim Auswählen: Kurze Bestätigungs-Animation am Stop, Matrix-Update mit 80ms Stagger pro Kategorie, dann nach 300ms Auto-Advance zur nächsten Frage.

## Karten-Komponente

Single-Select (Q5): 4 Karten, auf Desktop 2×2-Grid oder 4-spaltig, auf Mobile untereinander. Jede Karte: Icon oben, Label unten. Klick → Bestätigungs-Animation → Auto-Advance.

Multi-Select (Q6): 5 Karten, gleicher Aufbau. Klick toggelt Auswahl. Beim Erreichen von 3 Auswahl: weitere Karten visuell deaktiviert. Weiter-Button am Fuß der Seite, beschriftet mit Auswahlzahl.

Icons aus dem LIFETIME-Icon-System (Phosphor thin via Iconify, siehe `_examples/`). Konkrete Icons:
- Q5 aktiv: barbell, walking, arrows-clockwise, target
- Q6: heart, brain, sparkle, pill, dna

## Loading-Screen

Nach Q7: Übergang zu Loading-Screen, 3 Sekunden. Großer kreisförmiger Progress-Indikator (animiert von 0 auf 100% in 3s). Darüber Headline "Wir analysieren deine Antworten…". Darunter rotierende Sub-Texte (alle 1s wechselnd):
- Abgleich mit 22 DNA-Bereichen
- Identifikation deiner Top-3-Themen
- Erstellung deiner persönlichen Ergebnis-Seite

Trust-Badge im unteren Drittel: "Wissenschaftlich begleitet von Prof. Dr. med. Volker Limmroth".

Nach 3s automatischer Übergang zur Result-Page.

## Result-Page

5 Sektionen vertikal gestapelt. Vollflächig, scrollbar, keine Sidebar. Header und Footer der Hauptseite sind hier wieder sichtbar.

### Sektion 1 — Header

Headline "Dein Ergebnis", darunter eine Zeile Sub-Text. Sub-Text variiert nach Altersgruppe:

```js
function getHeaderSubText(age) {
  if (age < 35) return 'Du legst früh den Grundstein. Wir zeigen dir, welche genetischen Bereiche jetzt am wichtigsten sind.';
  if (age < 50) return 'Genau jetzt zählt, was du über deinen Körper weißt. Wir haben deine Antworten mit 22 DNA-Bereichen abgeglichen.';
  if (age < 65) return 'Mit gezieltem Wissen kannst du dein biologisches Alter aktiv beeinflussen. Hier sind deine wichtigsten Hebel.';
  return 'Vitalität ist keine Frage des Passes, sondern deiner Biologie. Wir zeigen dir, wo deine Hebel liegen.';
}
```

Direkt darunter, kleinformatig: "Wissenschaftlich begleitet von Prof. Dr. med. Volker Limmroth · Laboranalyse durch Eurofins"

### Sektion 2 — Top 3

Drei Karten. Top 1 erhält größeres Format (ca. doppelte Höhe oder hervorgehoben durch Position als breite Karte oben). Top 2 und 3 nebeneinander auf Desktop, untereinander auf Mobile.

Pro Karte:
- Positions-Label klein (01, 02, 03)
- Titel
- Kurztext (`short`-Feld aus NEEDS)
- Gene als kleine Pills (kein Spiegelstrich)

Karten sind komplett anklickbar — Klick scrollt smooth zum jeweiligen Detail-Akkordeon und öffnet es.

### Sektion 3 — Matrix

Headline: "Diese Bereiche aus deinem Test sind für dich besonders relevant"

Identisches Layout wie im Quiz: 4×4-Grid DNA-Kategorien plus Epigenetik-Bar darunter. Jetzt statisch (kein Live-Update), zeigt den finalen Stand.

Aktivierte Kategorien (Union der Top-3 dnaCategories) leuchten. Hover/Tap auf Kachel zeigt Tooltip mit Kategorie-Label und 1-Satz-Erklärung.

Eine Zeile darunter, klein: "X von 22 Bereichen sind für deine Top-3-Themen direkt relevant. Plus weitere Bereiche, die du im Test ebenfalls entdeckst — Sehalter, Höralter, Herzgesundheit."

Die Zahl X wird dynamisch berechnet aus der Union der dnaCategories der Top-3.

### Sektion 4 — Detail-Akkordeons

Drei Akkordeons, jeweils zu den Top-3-Bedürfnissen. Default geschlossen.

Akkordeon-Header: Positions-Label, Titel.

Akkordeon-Body bei Aufklappen:
- Intro: "Was wir in deinem Test analysieren"
- Pro Gen ein Block: Gen-Name groß, ein erklärender Satz darunter, ein Anwendungsbeispiel-Satz dahinter
- Trenner
- Sub-Headline: "Im Test bekommst du"
- 3-4 Inhalts-Punkte (NICHT als Spiegelstrich-Liste — als Fließtext mit klarer Trennung, z.B. Zeilenumbruch zwischen Punkten)
- Eine letzte Zeile: Epigenetik-Verbindung

Konkrete Inhalte pro Bedürfnis: siehe `lifetime-quiz-texte.md` Sektion 4. Spiegelstriche dort beim Übertragen ins Liquid durch einfache Zeilenumbrüche oder semantische Blöcke ersetzen.

### Sektion 5 — CTA

Visuell abgesetzte Sektion (Card oder andersfarbiger Hintergrund per Theme-Token).

Sub-Headline: "Dein vollständiges Ergebnis"
Text: "Du hast deine Top-3-Themen kennengelernt. Lass dir dein vollständiges Ergebnis zusenden — mit allen Details zu deinen relevanten DNA-Bereichen, plus Hintergründen und nächsten Schritten."

Primärer CTA (groß, Theme-Akzent): "Mein Ergebnis per E-Mail erhalten — Kostenlos & unverbindlich"

Klick öffnet Inline-Formular darunter (kein Modal):
- E-Mail-Eingabefeld
- Checkbox mit Consent-Text
- Senden-Button

Nach Submit: Erfolgs-Bestätigung inline ("Danke! Du erhältst gleich eine E-Mail.")

Sekundärer CTA (Outline, daneben oder darunter): "Test direkt bestellen — 349€" — linkt zur Add-to-Cart-Action.

Ganz unten (sehr klein, dezent): Trust-Footer "Eurofins-Laboranalyse · Begleitung durch Prof. Dr. med. Volker Limmroth · In Deutschland entwickelt · Ergebnisse in 4-6 Wochen"

## Shopify-Integration

### E-Mail-Submission

Bei Klick auf Senden im Formular:

1. Validierung: E-Mail-Format, Consent-Checkbox angeklickt
2. POST an Shopify Customer Endpoint mit:
   - E-Mail
   - `accepts_marketing: true`
   - `tags`: kommagetrennte Liste mit `quiz-completed`, `top1-{bedürfnis-id}`, `top2-{bedürfnis-id}`, `top3-{bedürfnis-id}`, `age-{gruppe}`
   - Note-Feld optional mit JSON-encoded answers für späteren Lookup
3. Bei Erfolg: Inline-Bestätigung, Formular ausblenden
4. Bei Fehler: Fehlermeldung am Feld, Submit-Button wieder aktiv

Age-Gruppe-Mapping: `25-34`, `35-44`, `45-54`, `55-64`, `65+`

### E-Mail-Trigger

Confirmation-E-Mail über Shopify Automation oder Notification-Template. Trigger: Tag `quiz-completed` wird gesetzt. Template-Variablen für Personalisierung: Top-1/2/3-Titel und Kurztexte aus Customer-Metafield oder via Liquid-Variable.

Konkrete Implementierungs-Option: Customer-Tags reichen für Trigger, der personalisierte Inhalt kommt aus einem Static-Block im Template, der per Tag-Logik die richtigen Bedürfnis-Blöcke einblendet.

Falls Shopify Email für diese Personalisierung zu limitiert ist: Fallback auf Shopify Customer Account Created Notification mit conditional Liquid-Logik.

### Direkt-Bestellung

Sekundärer CTA linkt auf `/products/dna-age-test?utm_source=quiz&utm_medium=result-page&utm_campaign=cta-direct&top1={id}`.

## Tracking

GA4 / Triple Whale Events:

```
quiz_start
quiz_question_answered (custom: question_id, answer)
quiz_completed (custom: top1, top2, top3, age_group)
quiz_email_submitted
quiz_cta_direct_clicked
```

UTM-Parameter beim Direct-CTA-Klick wie oben.

## Datei-Struktur

```
sections/
  lt-pdp-quiz-v2.liquid           # Hauptkomponente
snippets/
  lt-quiz-question-slider.liquid  # Slider-Frage
  lt-quiz-question-cards.liquid   # Karten-Frage
  lt-quiz-question-multi.liquid   # Multi-Select-Frage
  lt-quiz-matrix.liquid           # Matrix-Komponente
  lt-quiz-loading.liquid          # Loading-Screen
  lt-quiz-result.liquid           # Result-Page (gesamt)
  lt-quiz-result-card.liquid      # Top-3-Karte
  lt-quiz-result-detail.liquid    # Detail-Akkordeon
assets/
  lt-quiz.js                      # State-Logik, Scoring, Submission
  lt-quiz.css                     # Quiz-spezifisch (nur falls Tokens nicht ausreichen)
```

Schema-Settings für `lt-pdp-quiz-v2.liquid`:

- Bedürfnis-Texte als Repeater (pro Bedürfnis: title, short, genes, dnaCategories, detail-blocks)
- Kategorie-Labels und Tooltips als Repeater
- "Warum fragen wir das"-Texte pro Frage als Settings
- Header-Sub-Text-Varianten nach Altersgruppe

Defaults aus dieser Spec übernehmen, im Theme-Editor editierbar.

## Implementierungs-Reihenfolge

1. Section-Skeleton + State-Maschine in JS, ohne UI
2. Slider-Frage als Snippet, eine Frage durchspielen, State funktioniert
3. Matrix-Komponente, statisch erstmal, Activation-Logik andocken
4. Restliche Frage-Typen (Karten, Multi-Select)
5. Loading-Screen
6. Scoring + Top-3-Berechnung
7. Result-Page-Sektionen schrittweise: Header → Top-3-Karten → Matrix → Detail-Akkordeons → CTA
8. Shopify-Customer-Submission
9. Tracking-Events
10. Schema-Settings für Editor-Editierbarkeit

## Was diese Spec nicht enthält

Design-Token, konkrete Farben, Typografie, Spacing, Animations-Timings im Detail, Icon-Bibliothek-Setup. Alles davon ist in `_examples/` und `.cursor/rules/` hinterlegt und gilt unverändert.

Medizinische Validierung aller Gen-bezogenen Texte durch Prof. Dr. Limmroth ist Voraussetzung vor Go-Live, nicht Teil der Technik-Spec.

Externe Lead-Capture-Tools (Klaviyo etc.) werden nicht verwendet. Nur Shopify-Bordmittel.
