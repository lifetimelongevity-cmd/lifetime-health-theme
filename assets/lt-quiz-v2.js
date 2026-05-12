/**
 * LIFETIME — AGE & DNA Quiz v2
 * Step 1-4 der Implementierungs-Reihenfolge (siehe docs/lifetime-quiz-spec.md):
 *  - State-Maschine (intro → q1..q7 → loading → result)
 *  - Slider-Fragen (Q1-Q4), Single-Select-Cards (Q5),
 *    Multi-Select-Cards mit Limit (Q6), Numerischer Slider (Q7)
 *  - Auto-Advance bei Slider/Single-Select (300ms), Weiter-Button bei Multi/Age
 *  - Loading → Result Auto-Übergang mit Scoring + Top-3
 */
(function () {
  'use strict';

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const STEPS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading', 'result'];
  const QUESTION_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const FULLSCREEN_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading', 'result'];
  const AUTO_ADVANCE_MS = 300;
  const LOADING_DURATION_MS = 3000;

  function createInitialState() {
    return {
      step: 'intro',
      answers: {
        sleep: null,
        energy: null,
        stress: null,
        weight: null,
        activity: null,
        prevention: [],
        age: 40,
      },
      scores: {},
      topThree: [],
      email: null,
      submitted: false,
    };
  }

  // ── Scoring ───────────────────────────────────────────────────────
  function computeScores(answers) {
    const s = {};
    if (answers.sleep)  s.sleep  = 6 - answers.sleep;
    if (answers.energy) s.energy = 6 - answers.energy;
    if (answers.stress) s.stress = 6 - answers.stress;
    if (answers.weight) s.weight = 6 - answers.weight;
    if (answers.activity === 'aktiv' || answers.activity === 'neustart') {
      s.training = 4;
    }
    const map = { herz: 'heart', kognition: 'cognition', haut: 'skin', supplements: 'supplements', bioalter: 'bioage' };
    (answers.prevention || []).forEach((k) => { if (map[k]) s[map[k]] = 4; });
    return s;
  }

  // ── Bedürfnis-Stammdaten für Result-Page ─────────────────────────
  const NEEDS_DETAIL = {
    bioage: {
      title: 'Biologisches Alter senken',
      short: 'Dein Alter im Pass ist Statistik. Dein epigenetisches Alter ist Realität. Wir zeigen dir, welche Schalter bei dir wirken: SIRT1, FOXO3 und TP53 — die wichtigsten Langlebigkeits-Gene.',
      genes: [
        { name: 'SIRT1', explainer: 'Reguliert Reparatur-Prozesse deiner DNA und das Energie-Management deiner Zellen.', example: 'Bestimmt, wie stark Fasten und Kalorien-Reduktion bei dir wirken.' },
        { name: 'FOXO3', explainer: 'Eines der stärksten Langlebigkeits-Gene weltweit.', example: 'Bei Hundertjährigen ist die aktive Variante deutlich häufiger.' },
        { name: 'TP53', explainer: 'Der „Wächter des Genoms" — verhindert dass beschädigte Zellen unkontrolliert wachsen.', example: 'Zeigt deine zelluläre Schutz-Reserve.' },
        { name: 'MTOR', explainer: 'Schaltet zwischen Wachstum und Reparatur deiner Zellen.', example: 'Bestimmt, wie dein Körper auf Protein und Aktivität antwortet.' },
      ],
      inTest: [
        'Deine SIRT1-Variante und was sie für dich bedeutet',
        'Dein FOXO3-Profil im Vergleich zu Hundertjährigen',
        'Konkrete Empfehlungen für dein Langlebigkeits-Profil',
      ],
      epiLine: 'Dazu dein epigenetisches Alter und MethylPace-Score — der direkteste Indikator für dein biologisches Alter.',
    },
    weight: {
      title: 'Verstehen, wie der Körper Essen verarbeitet',
      short: 'Dein FTO-Gen bestimmt, wie schnell du zunimmst. Dein TCF7L2-Gen, wie dein Blutzucker reagiert. Plus MC4R — der zentrale Sättigungs-Schalter.',
      genes: [
        { name: 'FTO', explainer: 'Beeinflusst Appetit und Fettspeicherung.', example: 'Erklärt, warum manche bei gleicher Kalorienmenge schneller zunehmen.' },
        { name: 'TCF7L2', explainer: 'Reguliert deine Insulin-Antwort.', example: 'Zeigt, wie dein Körper auf Kohlenhydrate reagiert.' },
        { name: 'MCM6', explainer: 'Bestimmt deine Laktose-Verträglichkeit.', example: 'Erklärt mögliche Beschwerden nach Milchprodukten.' },
        { name: 'MC4R', explainer: 'Der zentrale Sättigungs-Schalter im Gehirn.', example: 'Bestimmt, wie schnell du Sättigung wahrnimmst.' },
      ],
      inTest: [
        'Deine Stoffwechsel-Variante (FTO + TCF7L2)',
        'Deine Sensitivitäten für Laktose, Histamin, Koffein',
        'Empfehlungen für deine Makronährstoff-Verteilung',
      ],
      epiLine: 'Plus dein epigenetisches Entzündungsprofil — entscheidend für Stoffwechsel-Gesundheit.',
    },
    energy: {
      title: 'Energie zurückgewinnen',
      short: 'Müdigkeit hat drei Quellen: Mikronährstoff-Defizite (MTHFR, VDR), schlechter Schlaf, stille Entzündungen (IL6, TLR4). Wir zeigen dir, welcher Hebel bei dir am stärksten greift.',
      genes: [
        { name: 'MTHFR', explainer: 'Reguliert deine Methylierung — zentral für Energie- und Nervenstoffwechsel.', example: 'Bestimmt, ob du normale Folsäure verwertest oder methylierte brauchst.' },
        { name: 'VDR', explainer: 'Vitamin-D-Rezeptor — wie gut Vitamin D in deinen Zellen ankommt.', example: 'Erklärt, warum hohe Blutwerte trotzdem Müdigkeit lassen können.' },
        { name: 'IL6', explainer: 'Marker für stille Entzündungs-Aktivität.', example: 'Chronisch erhöht: Erschöpfung und schlechte Regeneration.' },
        { name: 'TLR4', explainer: 'Steuert deine angeborene Immunantwort.', example: 'Beeinflusst, wie schnell dein Körper mit Entzündung reagiert.' },
      ],
      inTest: [
        'Deine Methylierungs-Variante (MTHFR)',
        'Dein Vitamin-D-Verwertungsprofil',
        'Dein stilles Entzündungsprofil',
      ],
      epiLine: 'Plus epigenetische Marker, die zeigen, wie aktiv dein Energiestoffwechsel läuft.',
    },
    sleep: {
      title: 'Endlich durchschlafen',
      short: 'Dein PER3-Gen sagt, ob du Lerche oder Eule bist. Dein CYP1A2-Gen, wie schnell du Koffein abbaust. Plus ADORA2A — wie sehr Koffein dein Nervensystem aufdreht.',
      genes: [
        { name: 'PER3', explainer: 'Bestimmt deinen Chronotyp — biologisch früh oder spät aktiv.', example: 'Erklärt, warum manche morgens nicht produktiv sein können.' },
        { name: 'CYP1A2', explainer: 'Reguliert dein Koffein-Abbau-Tempo.', example: 'Schnelle Variante: Espresso nach dem Essen geht. Langsame: nach 14 Uhr wird Schlaf zum Glücksspiel.' },
        { name: 'ADORA2A', explainer: 'Bestimmt, wie stark Koffein dein Nervensystem aufdreht.', example: 'Macht den Unterschied zwischen wach und nervös bei der gleichen Dosis.' },
      ],
      inTest: [
        'Dein Chronotyp und passende Schlaf-Fenster',
        'Deine genetisch optimale Koffein-Strategie',
        'Empfehlungen zu Magnesium, Melatonin und Schlaf-Hygiene',
      ],
      epiLine: 'Plus epigenetische Schlaf-Marker — zeigen, wie regenerativ dein Schlaf tatsächlich ist.',
    },
    stress: {
      title: 'Stress verstehen und Nervensystem unterstützen',
      short: 'Dein COMT-Gen bestimmt, wie du Stress verarbeitest. Schnelle Variante: stressresistent. Langsame: tiefer Denker, längere Reaktion. Dazu BDNF — deine mentale Erholung.',
      genes: [
        { name: 'COMT', explainer: 'Reguliert den Abbau von Stress-Hormonen wie Adrenalin und Dopamin.', example: 'Schnelle Variante: stressresistent. Langsame: tiefer Denker, längere Erholung.' },
        { name: 'BDNF', explainer: 'Wachstumsfaktor für deine Nervenzellen.', example: 'Bestimmt deine mentale Resilienz und Lern-Geschwindigkeit.' },
      ],
      inTest: [
        'Dein COMT-Profil und passende Stress-Strategien',
        'Dein BDNF-Status und Resilienz-Empfehlungen',
        'Cortisol-Rhythmus und Erholungs-Faktoren',
      ],
      epiLine: 'Plus epigenetische Stress-Marker — zeigen, wie sehr chronischer Stress dich prägt.',
    },
    cognition: {
      title: 'Konzentration, Klarheit, Gedächtnis',
      short: 'Drei Schalter für geistige Schärfe: BDNF für Lernfähigkeit, FADS1 für Omega-3-Verwertung, APOE als wichtigster Marker für kognitive Langzeit-Gesundheit.',
      genes: [
        { name: 'BDNF', explainer: 'Wachstumsfaktor für Nervenzellen — Basis für Lernen und Erinnerung.', example: 'Aktive Variante: schnelles Lernen, gute Konzentration unter Druck.' },
        { name: 'FADS1', explainer: 'Bestimmt, wie gut du pflanzliche Omega-3 in nutzbare Form umwandelst.', example: 'Schwache Variante: brauchst eher Fisch oder Algenöl statt Leinöl.' },
        { name: 'APOE', explainer: 'Wichtigster genetischer Marker für kognitive Langzeit-Gesundheit.', example: 'Zeigt dein Risiko-Profil und welche Prävention bei dir am stärksten greift.' },
      ],
      inTest: [
        'Dein BDNF-Lern-Profil',
        'Dein Omega-3-Verwertungsprofil (FADS1)',
        'Dein APOE-Status mit konkreten Lifestyle-Hebeln',
      ],
      epiLine: 'Plus epigenetische Marker für deine aktuelle kognitive Reserve.',
    },
    training: {
      title: 'Smarter trainieren',
      short: 'Dein ACTN3-Gen sagt, ob du Kraft- oder Ausdauer-Typ bist. Dein ACE-Gen, wie schnell dein VO₂max trainierbar ist. COL5A1 zeigt deine Sehnen-Stabilität.',
      genes: [
        { name: 'ACTN3', explainer: 'Bestimmt deine Muskelfaser-Verteilung.', example: 'RR-Variante: Kraft- und Sprint-Typ. XX: Ausdauer-Typ.' },
        { name: 'ACE', explainer: 'Beeinflusst, wie stark dein Herz-Kreislauf-System auf Training reagiert.', example: 'I-Variante: gute VO₂max-Trainierbarkeit. D: schnellere Kraft-Adaption.' },
        { name: 'COL5A1', explainer: 'Reguliert die Stabilität deiner Sehnen und Bänder.', example: 'Bestimmt dein genetisches Verletzungs-Risiko.' },
        { name: 'PPARA', explainer: 'Steuert den Fett-Stoffwechsel bei Belastung.', example: 'Bestimmt, wie gut du Fett als Energiequelle bei langem Cardio nutzt.' },
      ],
      inTest: [
        'Dein Trainings-Typ (Kraft vs. Ausdauer)',
        'Dein Verletzungs- und Regenerations-Profil',
        'Optimale Trainings-Frequenz und Erholungs-Empfehlungen',
      ],
      epiLine: 'Plus epigenetische Marker, die deine aktuelle Trainings-Belastung sichtbar machen.',
    },
    heart: {
      title: 'Herz aktiv schützen',
      short: 'APOE zeigt dein Cholesterin-Profil. AGT, wie Salz deinen Blutdruck beeinflusst. CDKN2B-AS1 am 9p21-Locus — das stärkste bekannte genetische Herz-Risiko.',
      genes: [
        { name: 'APOE', explainer: 'Reguliert deinen Cholesterin-Stoffwechsel.', example: 'E4-Variante: höheres LDL, profitiert besonders von mediterraner Ernährung.' },
        { name: 'AGT', explainer: 'Beeinflusst, wie dein Blutdruck auf Salz reagiert.', example: 'Sensitive Variante: Salz-Reduktion senkt Blutdruck stärker.' },
        { name: 'CDKN2B-AS1', explainer: 'Der 9p21-Locus — stärkster bekannter genetischer Herz-Risiko-Marker.', example: 'Zeigt, wie früh und intensiv du präventiv ansetzen solltest.' },
        { name: 'CETP', explainer: 'Reguliert das HDL-Cholesterin.', example: 'Bestimmt deine genetische "gute Cholesterin"-Reserve.' },
      ],
      inTest: [
        'Dein Cholesterin-Stoffwechsel-Profil',
        'Dein Salz-Sensitivitäts-Status',
        'Dein 9p21-Risiko mit konkreten Präventions-Empfehlungen',
      ],
      epiLine: 'Plus epigenetische Marker, die zeigen, wie aktiv dein kardiovaskuläres System ist.',
    },
    supplements: {
      title: 'Passende Vitamine und Supplements',
      short: 'Deine MTHFR-Variante bestimmt, ob du normale Folsäure verwerten kannst oder methylierte brauchst. VDR, wie viel Vitamin D ankommt. BCO1, ob du Beta-Carotin in Vitamin A umwandeln kannst.',
      genes: [
        { name: 'MTHFR', explainer: 'Reguliert die Folsäure-Verwertung.', example: 'C677T-Variante: brauchst Methylfolat statt synthetische Folsäure.' },
        { name: 'VDR', explainer: 'Vitamin-D-Rezeptor — wie effizient Vitamin D in deinen Zellen wirkt.', example: 'Bestimmt deinen optimalen Vitamin-D-Zielwert.' },
        { name: 'FUT2', explainer: 'Beeinflusst deine Vitamin-B12-Aufnahme über die Darmwand.', example: 'Non-secretor: höheres Risiko für B12-Mangel trotz Ernährung.' },
        { name: 'BCO1', explainer: 'Wandelt pflanzliches Beta-Carotin in nutzbares Vitamin A.', example: 'Schwache Variante: brauchst direkt Vitamin A oder tierische Quellen.' },
      ],
      inTest: [
        'Dein MTHFR-Methylierungs-Profil',
        'Dein Vitamin-D-Rezeptor-Status',
        'Empfohlene Supplement-Formen für deine Genetik',
      ],
      epiLine: 'Plus epigenetische Mikronährstoff-Marker für deinen aktuellen Versorgungs-Status.',
    },
    skin: {
      title: 'Haut und Haar von innen',
      short: 'Hautalterung hängt an SOD2 (antioxidative Abwehr) und ERCC2 (UV-Schaden-Reparatur). Beim Haar zeigt AR, wie deine Follikel auf DHT reagieren — der Hauptfaktor für Haarausfall.',
      genes: [
        { name: 'SOD2', explainer: 'Hauptenzym der antioxidativen Abwehr in deinen Zellen.', example: 'Schwache Variante: höherer oxidativer Stress, profitiert von Antioxidantien.' },
        { name: 'ERCC2', explainer: 'Repariert UV-Schäden in deiner DNA.', example: 'Reduzierte Aktivität: schnellere Hautalterung durch Sonne.' },
        { name: 'AR', explainer: 'Androgen-Rezeptor — bestimmt deine DHT-Sensitivität.', example: 'Hauptfaktor für androgenetischen Haarausfall.' },
        { name: 'MC1R', explainer: 'Reguliert Pigment-Bildung und Hautempfindlichkeit.', example: 'Bestimmt dein UV-Schutz-Niveau.' },
      ],
      inTest: [
        'Dein Hautalterungs-Profil (SOD2 + ERCC2)',
        'Dein Haarausfall-Risiko (AR + Familienprofil)',
        'Konkrete Empfehlungen für Haut- und Haar-Pflege',
      ],
      epiLine: 'Plus epigenetische Hautalter-Marker — zeigen den biologischen Zustand deiner Haut.',
    },
  };

  function getResultHeaderSub(age) {
    if (age < 35) return 'Du legst früh den Grundstein. Wir zeigen dir, welche genetischen Bereiche jetzt am wichtigsten sind.';
    if (age < 50) return 'Genau jetzt zählt, was du über deinen Körper weißt. Wir haben deine Antworten mit 22 DNA-Bereichen abgeglichen.';
    if (age < 65) return 'Mit gezieltem Wissen kannst du dein biologisches Alter aktiv beeinflussen. Hier sind deine wichtigsten Hebel.';
    return 'Vitalität ist keine Frage des Passes, sondern deiner Biologie. Wir zeigen dir, wo deine Hebel liegen.';
  }

  // ── Takeaway-Daten (Narrative-Reaktionen pro Antwort) ────────────
  const SLIDER_REACTIONS = {
    sleep: {
      title: 'Schlaf',
      pills: ['Chronotyp (PER3)', 'Koffein-Abbau (CYP1A2)', 'Adenosin (ADORA2A)', 'Schlaf-Qualität'],
    },
    energy: {
      title: 'Energie',
      pills: ['Methylierung (MTHFR)', 'Vitamin D (VDR)', 'Entzündung (IL6)', 'Stoffwechsel'],
    },
    stress: {
      title: 'Stress',
      pills: ['Stress-Antwort (COMT)', 'Mentale Resilienz (BDNF)', 'Cortisol-Reaktion', 'Schlaf-Bezug'],
    },
    weight: {
      title: 'Stoffwechsel',
      pills: ['Sättigung (MC4R)', 'Kohlenhydrate (TCF7L2)', 'Fette (FTO)', 'Sensitivitäten'],
    },
  };

  function sliderLine(v) {
    if (v <= 2) return 'Hier liegt ein deutlicher Hebel — wir schauen genau hin.';
    if (v === 3) return 'Spannender Bereich — lohnt einen genaueren Blick.';
    return 'Stabil — wir checken trotzdem deine genetische Basis.';
  }

  const ACTIVITY_REACTIONS = {
    aktiv:     { line: 'Sportlich — wir kennen deinen Trainings-Typ.', pills: ['Trainings-Typ (ACTN3)', 'VO₂max (ACE)', 'Sehnen (COL5A1)'] },
    neustart:  { line: 'Neuanfang — wir zeigen dir den passenden Einstieg.', pills: ['Trainings-Antwort', 'Regenerations-Profil', 'Verletzungs-Risiko'] },
    arm:       { line: 'Wir prüfen, was dich genetisch aktivieren würde.', pills: ['Aktivierungs-Empfehlung', 'Bewegungs-Profil'] },
    wechselnd: { line: 'Schwankungen lassen sich oft genetisch erklären.', pills: ['Energie-Profil', 'Trainings-Antwort'] },
  };

  const PREVENTION_REACTIONS = {
    herz:        { title: 'Herz & Kreislauf',    pills: ['Cholesterin (APOE)', 'Blutdruck (AGT)', '9p21 (CDKN2B)'] },
    kognition:   { title: 'Geistige Fitness',    pills: ['Lernfähigkeit (BDNF)', 'Omega-3 (FADS1)', 'APOE'] },
    haut:        { title: 'Haut & Haar',         pills: ['UV-Reparatur (ERCC2)', 'Haarausfall (AR)', 'SOD2'] },
    supplements: { title: 'Vitamine & Supplements', pills: ['Folsäure (MTHFR)', 'Vitamin D (VDR)', 'Beta-Carotin (BCO1)'] },
    bioalter:    { title: 'Biologisches Alter',  pills: ['SIRT1', 'FOXO3', 'TP53', 'MTOR'] },
  };

  function getTakeaways(answers) {
    const items = [];
    ['sleep', 'energy', 'stress', 'weight'].forEach((key) => {
      const v = answers[key];
      if (v == null) return;
      const def = SLIDER_REACTIONS[key];
      items.push({ key, title: def.title, line: sliderLine(v), pills: def.pills });
    });
    if (answers.activity) {
      const a = ACTIVITY_REACTIONS[answers.activity];
      if (a) items.push({ key: 'activity', title: 'Bewegung', line: a.line, pills: a.pills });
    }
    (answers.prevention || []).forEach((p) => {
      const def = PREVENTION_REACTIONS[p];
      if (def) items.push({ key: 'prev-' + p, title: def.title, line: 'Im Fokus.', pills: def.pills });
    });
    return items;
  }

  // ── Matrix-State: welche Kategorie wie aktiv ─────────────────────
  // Bedürfnis → DNA-Kategorien (aus docs/lifetime-quiz-spec.md NEEDS)
  const NEED_CATEGORIES = {
    sleep:       ['schlaf', 'stress', 'mental-health', 'supplements'],
    energy:      ['vitamine', 'supplements', 'schlaf', 'stoffwechsel'],
    stress:      ['stress', 'psychologisch', 'mental-health', 'schlaf'],
    weight:      ['stoffwechsel', 'sensitivitaeten', 'vitamine', 'stress'],
    training:    ['fitness', 'verletzung-regeneration', 'supplements', 'stoffwechsel'],
    cognition:   ['mental-health', 'schlaf', 'vitamine', 'psychologisch'],
    skin:        ['haare', 'vitamine', 'supplements', 'gesunde-alterung'],
    supplements: ['vitamine', 'supplements', 'sensitivitaeten', 'stoffwechsel'],
    heart:       ['herz', 'stoffwechsel', 'vitamine', 'supplements'],
    bioage:      ['gesunde-alterung', 'stoffwechsel', 'supplements', 'vitamine'],
  };

  function sliderLevel(v) {
    if (v == null) return null;
    if (v <= 2) return 'strong';
    if (v === 3) return 'medium';
    return null;
  }

  function computeMatrixState(answers) {
    const needLevels = {};
    needLevels.sleep  = sliderLevel(answers.sleep);
    needLevels.energy = sliderLevel(answers.energy);
    needLevels.stress = sliderLevel(answers.stress);
    needLevels.weight = sliderLevel(answers.weight);
    if (answers.activity === 'aktiv' || answers.activity === 'neustart') {
      needLevels.training = 'strong';
    }
    const prevMap = { herz: 'heart', kognition: 'cognition', haut: 'skin', supplements: 'supplements', bioalter: 'bioage' };
    (answers.prevention || []).forEach((p) => {
      if (prevMap[p]) needLevels[prevMap[p]] = 'strong';
    });

    // Union der Kategorien — strong gewinnt über medium
    const cats = {};
    Object.entries(needLevels).forEach(([need, level]) => {
      if (!level) return;
      (NEED_CATEGORIES[need] || []).forEach((cat) => {
        if (cats[cat] === 'strong') return;
        cats[cat] = level;
      });
    });
    return cats;
  }

  function getTopThree(scores, age) {
    const top = Object.entries(scores)
      .filter(([, v]) => v >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([k]) => k);
    if (top.length >= 3) return top;
    let fill;
    if (age < 45)      fill = ['bioage', 'energy', 'sleep'];
    else if (age < 60) fill = ['bioage', 'heart', 'cognition'];
    else               fill = ['cognition', 'heart', 'bioage'];
    fill.forEach((id) => { if (top.length < 3 && !top.includes(id)) top.push(id); });
    return top;
  }

  // ── State-Maschine ────────────────────────────────────────────────
  class QuizV2 {
    constructor(root) {
      this.root = root;
      this.state = createInitialState();
      this.steps = new Map();
      root.querySelectorAll('[data-quiz-step]').forEach((el) => {
        this.steps.set(el.dataset.quizStep, el);
      });
      this.grid = root.querySelector('[data-quiz-grid]');
      this.takeawaysRoot = root.querySelector('[data-quiz-takeaways]');
      this.takeawaysList = root.querySelector('[data-quiz-takeaways-list]');
      this.progressBar = root.querySelector('[data-quiz-progress-bar]');
      this.progressLabel = root.querySelector('[data-quiz-progress-label]');
      this.backBtn = root.querySelector('[data-quiz-back]');
      this.closeBtn = root.querySelector('[data-quiz-close]');
      this.loadingTimer = null;

      this.bindIntro();
      this.bindSliders();
      this.bindSingleSelect();
      this.bindMultiSelect();
      this.bindAge();
      this.bindBack();
      this.bindClose();
      this.bindEscape();
      this.bindResultCta();
      this.render();
    }

    bindIntro() {
      const start = this.root.querySelector('[data-quiz-start]');
      if (start) start.addEventListener('click', () => this.goto('q1'));
    }

    bindBack() {
      if (!this.backBtn) return;
      this.backBtn.addEventListener('click', () => {
        const idx = STEPS.indexOf(this.state.step);
        if (idx > 0) this.goto(STEPS[idx - 1]);
      });
    }

    bindClose() {
      if (!this.closeBtn) return;
      this.closeBtn.addEventListener('click', () => this.tryClose());
    }

    bindEscape() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && FULLSCREEN_STEPS.includes(this.state.step)) {
          this.tryClose();
        }
      });
    }

    tryClose() {
      // Aus dem Result: direkt schließen ohne Confirm (Quiz ist abgeschlossen)
      if (this.state.step === 'result') {
        this.state = createInitialState();
        this.goto('intro');
        return;
      }
      const a = this.state.answers;
      const hasInput =
        a.sleep || a.energy || a.stress || a.weight ||
        a.activity || (a.prevention && a.prevention.length > 0);
      if (hasInput && !window.confirm('Quiz wirklich abbrechen? Deine bisherigen Antworten gehen verloren.')) return;
      this.state = createInitialState();
      this.goto('intro');
    }

    // ── Slider (Q1-Q4) ─────────────────────────────────────────────
    bindSliders() {
      this.root.querySelectorAll('[data-quiz-step].lt-quiz__step--slider').forEach((stepEl) => {
        const questionId = stepEl.dataset.questionId;
        const stops = stepEl.querySelectorAll('.lt-quiz-slider__stop');
        stops.forEach((stop) => {
          stop.addEventListener('click', () => this.handleSliderPick(stops, stop, questionId));
        });
      });
    }

    handleSliderPick(stops, picked, questionId) {
      const value = parseInt(picked.dataset.value, 10);
      stops.forEach((s) => {
        const active = s === picked;
        s.classList.toggle('is-selected', active);
        s.setAttribute('aria-checked', active ? 'true' : 'false');
      });
      this.state.answers[questionId] = value;
      this.updateTakeaways();
      this.advanceAfterDelay();
    }

    // ── Single-Select Cards (Q5) ───────────────────────────────────
    bindSingleSelect() {
      this.root.querySelectorAll('[data-question-mode="single"]').forEach((stepEl) => {
        const questionId = stepEl.dataset.questionId;
        const cards = stepEl.querySelectorAll('.lt-quiz-card');
        cards.forEach((card) => {
          card.addEventListener('click', () => this.handleSinglePick(cards, card, questionId));
        });
      });
    }

    handleSinglePick(cards, picked, questionId) {
      cards.forEach((c) => {
        const active = c === picked;
        c.classList.toggle('is-selected', active);
        c.setAttribute('aria-checked', active ? 'true' : 'false');
      });
      this.state.answers[questionId] = picked.dataset.value;
      this.updateTakeaways();
      this.advanceAfterDelay();
    }

    // ── Multi-Select Cards mit Limit (Q6) ──────────────────────────
    bindMultiSelect() {
      this.root.querySelectorAll('[data-question-mode="multi"]').forEach((stepEl) => {
        const questionId = stepEl.dataset.questionId;
        const max = parseInt(stepEl.dataset.maxSelect, 10) || 3;
        const cards = stepEl.querySelectorAll('.lt-quiz-card');
        const advanceBtn = stepEl.querySelector('[data-quiz-advance]');
        const advanceLabel = stepEl.querySelector('[data-quiz-advance-label]');

        cards.forEach((card) => {
          card.addEventListener('click', () => {
            const value = card.dataset.value;
            const arr = this.state.answers[questionId];
            const idx = arr.indexOf(value);
            if (idx >= 0) {
              arr.splice(idx, 1);
            } else if (arr.length < max) {
              arr.push(value);
            } else {
              return; // Limit erreicht, kein Add
            }
            this.refreshMulti(cards, arr, advanceBtn, advanceLabel, max);
            this.updateTakeaways();
          });
        });

        if (advanceBtn) {
          advanceBtn.addEventListener('click', () => {
            if (this.state.answers[questionId].length > 0) this.goto(this.nextStep());
          });
        }
      });
    }

    refreshMulti(cards, selectedArr, advanceBtn, advanceLabel, max) {
      const count = selectedArr.length;
      const atLimit = count >= max;
      cards.forEach((card) => {
        const sel = selectedArr.includes(card.dataset.value);
        card.classList.toggle('is-selected', sel);
        card.classList.toggle('is-disabled', atLimit && !sel);
        card.setAttribute('aria-pressed', sel ? 'true' : 'false');
      });
      if (advanceBtn) {
        advanceBtn.disabled = count === 0;
      }
      if (advanceLabel) {
        if (count === 0)       advanceLabel.textContent = `Wähle bis zu ${max} Themen`;
        else if (count === max) advanceLabel.textContent = `Weiter (${count} ausgewählt) →`;
        else                    advanceLabel.textContent = `Weiter (${count} ausgewählt) →`;
      }
    }

    // ── Numerischer Slider (Q7) ────────────────────────────────────
    bindAge() {
      this.root.querySelectorAll('[data-question-mode="age"]').forEach((stepEl) => {
        const questionId = stepEl.dataset.questionId;
        const input = stepEl.querySelector('[data-quiz-age-input]');
        const valueEl = stepEl.querySelector('[data-quiz-age-value]');
        const advanceBtn = stepEl.querySelector('[data-quiz-advance]');
        if (!input) return;

        const sync = () => {
          const v = parseInt(input.value, 10);
          this.state.answers[questionId] = v;
          if (valueEl) valueEl.textContent = v;
          // Track-Fill visual
          const min = parseInt(input.min, 10);
          const max = parseInt(input.max, 10);
          const pct = ((v - min) / (max - min)) * 100;
          input.style.setProperty('--age-pct', `${pct}%`);
        };
        input.addEventListener('input', sync);
        sync();

        if (advanceBtn) {
          advanceBtn.addEventListener('click', () => this.goto(this.nextStep()));
        }
      });
    }

    // ── Step-Transitions ───────────────────────────────────────────
    advanceAfterDelay() {
      window.setTimeout(() => this.goto(this.nextStep()), AUTO_ADVANCE_MS);
    }

    nextStep() {
      const idx = STEPS.indexOf(this.state.step);
      return STEPS[idx + 1];
    }

    goto(step) {
      if (!STEPS.includes(step)) return;
      this.state.step = step;

      // Result-Hook: Top-3 ist bereits berechnet — Result-Page rendern
      if (step === 'result') {
        this.renderResult();
      }

      // Loading-Hook: Scoring berechnen + Auto-Übergang zu Result nach 3s
      if (step === 'loading') {
        this.state.scores = computeScores(this.state.answers);
        this.state.topThree = getTopThree(this.state.scores, this.state.answers.age);
        if (this.loadingTimer) clearTimeout(this.loadingTimer);
        this.loadingTimer = window.setTimeout(() => this.goto('result'), LOADING_DURATION_MS);
      }

      this.render();
      this.root.dispatchEvent(new CustomEvent('quiz:step', { detail: { step, state: this.snapshot() } }));
    }

    render() {
      const current = this.state.step;
      const inQuestion = QUESTION_STEPS.includes(current);
      const inFullscreen = FULLSCREEN_STEPS.includes(current);

      this.steps.forEach((el, key) => {
        const active = key === current;
        el.hidden = !active;
        el.classList.toggle('is-active', active);
      });

      if (this.grid) this.grid.hidden = !inQuestion;

      this.root.classList.toggle('lt-quiz--in-questions', inQuestion);
      this.root.classList.toggle('lt-quiz--in-loading', current === 'loading');
      this.root.classList.toggle('lt-quiz--in-result', current === 'result');
      this.root.classList.toggle('lt-quiz--fullscreen', inFullscreen);
      document.body.classList.toggle('lt-quiz-fullscreen', inFullscreen);

      const qIdx = QUESTION_STEPS.indexOf(current);
      if (this.progressBar) {
        this.progressBar.style.width = qIdx >= 0
          ? `${((qIdx + 1) / 7) * 100}%`
          : current === 'loading' || current === 'result' ? '100%' : '0%';
      }
      if (this.progressLabel) {
        this.progressLabel.textContent = qIdx >= 0 ? `${qIdx + 1} / 7` : '';
      }
      if (this.backBtn) {
        this.backBtn.hidden = !inQuestion;
      }

      if (inFullscreen) this.root.scrollTo({ top: 0, behavior: 'instant' });

      // Takeaway-Panel auch bei Step-Wechsel synchronisieren (Back/Reset)
      this.updateTakeaways();
    }

    // ── Result-Page: Top-3-Karten, Matrix-Aktivierung, Detail-Akkordeons
    renderResult() {
      const result = this.root.querySelector('[data-quiz-result]');
      if (!result) return;
      const top = this.state.topThree || [];
      const age = this.state.answers.age || 40;

      // Sektion 1: Sub-Text nach Alter
      const subEl = result.querySelector('[data-result-sub]');
      if (subEl) subEl.textContent = getResultHeaderSub(age);

      // Sektion 2: Top-3-Karten
      const top3El = result.querySelector('[data-result-top3]');
      if (top3El) {
        top3El.innerHTML = '';
        top.forEach((needId, idx) => {
          const def = NEEDS_DETAIL[needId];
          if (!def) return;
          const card = document.createElement('a');
          card.className = 'lt-quiz-result-card lt-quiz-result-card--pos-' + (idx + 1);
          card.href = '#lt-quiz-detail-' + needId;
          card.dataset.scrollTarget = 'lt-quiz-detail-' + needId;
          card.innerHTML =
            `<span class="lt-quiz-result-card__pos">${String(idx + 1).padStart(2, '0')}</span>` +
            `<h3 class="lt-quiz-result-card__title">${escapeHtml(def.title)}</h3>` +
            `<p class="lt-quiz-result-card__short">${escapeHtml(def.short)}</p>` +
            `<ul class="lt-quiz-result-card__genes">` +
            def.genes.slice(0, 4).map((g) => `<li class="lt-quiz-result-card__gene">${escapeHtml(g.name)}</li>`).join('') +
            `</ul>`;
          card.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(card.dataset.scrollTarget);
            if (target) {
              target.setAttribute('open', '');
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
          top3El.appendChild(card);
        });
      }

      // Sektion 3: Matrix — Aktivierung der Union der Top-3 dnaCategories
      const NEED_CATEGORIES_LOCAL = {
        sleep:       ['schlaf', 'stress', 'mental-health', 'supplements'],
        energy:      ['vitamine', 'supplements', 'schlaf', 'stoffwechsel'],
        stress:      ['stress', 'psychologisch', 'mental-health', 'schlaf'],
        weight:      ['stoffwechsel', 'sensitivitaeten', 'vitamine', 'stress'],
        training:    ['fitness', 'verletzung-regeneration', 'supplements', 'stoffwechsel'],
        cognition:   ['mental-health', 'schlaf', 'vitamine', 'psychologisch'],
        skin:        ['haare', 'vitamine', 'supplements', 'gesunde-alterung'],
        supplements: ['vitamine', 'supplements', 'sensitivitaeten', 'stoffwechsel'],
        heart:       ['herz', 'stoffwechsel', 'vitamine', 'supplements'],
        bioage:      ['gesunde-alterung', 'stoffwechsel', 'supplements', 'vitamine'],
      };
      const activeCats = new Set();
      top.forEach((n) => (NEED_CATEGORIES_LOCAL[n] || []).forEach((c) => activeCats.add(c)));

      const matrixWrap = result.querySelector('[data-result-matrix]');
      if (matrixWrap) {
        matrixWrap.querySelectorAll('[data-matrix-cat]').forEach((tile) => {
          const cat = tile.dataset.matrixCat;
          if (cat === 'bioalter' || cat === 'entzuendung') return; // Epi-Anker bleiben wie sie sind
          tile.classList.toggle('is-strong', activeCats.has(cat));
          tile.classList.remove('is-medium');
        });
      }

      const countEl = result.querySelector('[data-result-matrix-count]');
      if (countEl) {
        countEl.innerHTML =
          `<strong>${activeCats.size} von 22</strong> Bereichen sind für deine Top-3-Themen direkt relevant. ` +
          `Plus weitere Bereiche, die du im Test ebenfalls entdeckst — Sehalter, Höralter, Herzgesundheit.`;
      }

      // Sektion 4: Detail-Akkordeons
      const detailsEl = result.querySelector('[data-result-details]');
      if (detailsEl) {
        detailsEl.innerHTML = '';
        top.forEach((needId, idx) => {
          const def = NEEDS_DETAIL[needId];
          if (!def) return;
          const acc = document.createElement('details');
          acc.className = 'lt-quiz-result-detail';
          acc.id = 'lt-quiz-detail-' + needId;
          acc.innerHTML =
            `<summary class="lt-quiz-result-detail__summary">` +
              `<span class="lt-quiz-result-detail__pos">${String(idx + 1).padStart(2, '0')}</span>` +
              `<span class="lt-quiz-result-detail__title">${escapeHtml(def.title)}</span>` +
              `<span class="lt-quiz-result-detail__chevron" aria-hidden="true"></span>` +
            `</summary>` +
            `<div class="lt-quiz-result-detail__body">` +
              `<p class="lt-quiz-result-detail__intro">Was wir in deinem Test analysieren</p>` +
              `<ul class="lt-quiz-result-detail__genes">` +
              def.genes.map((g) =>
                `<li class="lt-quiz-result-detail__gene">` +
                  `<p class="lt-quiz-result-detail__gene-name">${escapeHtml(g.name)}</p>` +
                  `<p class="lt-quiz-result-detail__gene-explainer">${escapeHtml(g.explainer)}</p>` +
                  `<p class="lt-quiz-result-detail__gene-example">${escapeHtml(g.example)}</p>` +
                `</li>`
              ).join('') +
              `</ul>` +
              `<div class="lt-quiz-result-detail__separator"></div>` +
              `<p class="lt-quiz-result-detail__in-test-label">Im Test bekommst du</p>` +
              `<div class="lt-quiz-result-detail__in-test">` +
              def.inTest.map((line) => `<p class="lt-quiz-result-detail__in-test-line">${escapeHtml(line)}</p>`).join('') +
              `</div>` +
              `<p class="lt-quiz-result-detail__epi">${escapeHtml(def.epiLine)}</p>` +
            `</div>`;
          detailsEl.appendChild(acc);
        });
      }

      // Sektion 5: Secondary CTA — UTM mit top1 anreichern
      const secondaryCta = result.querySelector('[data-result-cta-secondary]');
      if (secondaryCta && top[0]) {
        const url = new URL(secondaryCta.getAttribute('href'), window.location.origin);
        url.searchParams.set('top1', top[0]);
        secondaryCta.setAttribute('href', url.pathname + url.search);
      }
    }

    bindResultCta() {
      const primaryBtn = this.root.querySelector('[data-result-cta-primary]');
      const form = this.root.querySelector('[data-result-form]');
      const successEl = this.root.querySelector('[data-result-success]');
      if (primaryBtn && form) {
        primaryBtn.addEventListener('click', () => {
          primaryBtn.hidden = true;
          form.hidden = false;
          const emailEl = form.querySelector('[data-result-email]');
          if (emailEl) emailEl.focus();
        });
      }
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = form.querySelector('[data-result-email]');
          const consent = form.querySelector('[data-result-consent]');
          if (!email || !email.value || !email.value.includes('@')) {
            if (email) email.focus();
            return;
          }
          if (!consent || !consent.checked) {
            if (consent) consent.focus();
            return;
          }
          // Echte Submission folgt in Step 8 (Shopify-Customer-Endpoint)
          this.state.email = email.value;
          this.state.submitted = true;
          form.hidden = true;
          if (successEl) successEl.hidden = false;
        });
      }
    }

// ── Takeaway-Panel: pro Antwort eine Notiz-Karte ──────────────
    updateTakeaways() {
      if (!this.takeawaysList) return;
      const items = getTakeaways(this.state.answers);
      const existing = new Map();
      this.takeawaysList.querySelectorAll('[data-takeaway-key]').forEach((el) => {
        existing.set(el.dataset.takeawayKey, el);
      });
      const newKeys = new Set(items.map((i) => i.key));

      // Remove cards that no longer apply
      existing.forEach((el, key) => {
        if (!newKeys.has(key)) el.remove();
      });

      // Append new cards in current order; update lines for existing
      items.forEach((item) => {
        const prev = existing.get(item.key);
        if (prev) {
          const lineEl = prev.querySelector('.lt-quiz-takeaway__line');
          if (lineEl && lineEl.textContent !== item.line) lineEl.textContent = item.line;
          this.takeawaysList.appendChild(prev); // keep order in sync
        } else {
          const card = document.createElement('div');
          card.className = 'lt-quiz-takeaway';
          card.dataset.takeawayKey = item.key;
          card.innerHTML =
            `<p class="lt-quiz-takeaway__title">${item.title}</p>` +
            `<p class="lt-quiz-takeaway__line">${item.line}</p>` +
            `<ul class="lt-quiz-takeaway__pills">` +
            item.pills.map((p) => `<li class="lt-quiz-takeaway__pill">${p}</li>`).join('') +
            `</ul>`;
          this.takeawaysList.appendChild(card);
          window.requestAnimationFrame(() => card.classList.add('is-in'));
        }
      });

      if (this.takeawaysRoot) {
        this.takeawaysRoot.classList.toggle('is-empty', items.length === 0);
      }
    }

    snapshot() {
      return JSON.parse(JSON.stringify(this.state));
    }
  }

  window.LIFETIME = window.LIFETIME || {};
  window.LIFETIME.QuizV2 = { create: (root) => new QuizV2(root), computeScores, getTopThree, STEPS };

  function init() {
    document.querySelectorAll('[data-lt-quiz-v2]').forEach((el) => {
      if (el.__ltQuizV2) return;
      el.__ltQuizV2 = new QuizV2(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
