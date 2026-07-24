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

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  // Animiert el.textContent von from→to (gerundet) über duration ms, ease-out.
  function countUp(el, from, to, duration) {
    if (!el) return;
    const startTs = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - startTs) / duration);
      el.textContent = Math.round(from + (to - from) * easeOutCubic(t));
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = to;
    }
    requestAnimationFrame(frame);
  }

  const STEPS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'loading', 'result'];
  const QUESTION_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'];
  const FULLSCREEN_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'loading', 'result'];
  const TOTAL_QUESTIONS = QUESTION_STEPS.length;
  const AUTO_ADVANCE_MS = 300;
  const LOADING_DURATION_MS = 3000;

  // GA4 / Smart Bidding tracking helper — pushed to GTM dataLayer
  function pushDataLayer(payload) {
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push(payload);
    }
  }

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
        gender: null,
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
      topic: 'Biologisches Alter',
      icon: 'hourglass-medium',
      title: 'Biologisches Alter senken',
      short: 'FOXO3 gilt als eines der stärksten Langlebigkeits-Gene, bei Hundertjährigen ist die aktive Variante deutlich häufiger. Ob du sie trägst, und ob Fasten bei dir deshalb mehr bringt als bei anderen, steht in deiner DNA und nicht in deinem Lebensstil.',
      genes: [
        { name: 'SIRT1', explainer: 'Reguliert Reparatur-Prozesse deiner DNA und das Energie-Management deiner Zellen.', example: 'Bestimmt, wie stark Fasten und Kalorien-Reduktion bei dir wirken.' },
        { name: 'FOXO3', explainer: 'Eines der stärksten Langlebigkeits-Gene weltweit.', example: 'Bei Hundertjährigen ist die aktive Variante deutlich häufiger.' },
        { name: 'TP53', explainer: 'Der „Wächter des Genoms" — verhindert dass beschädigte Zellen unkontrolliert wachsen.', example: 'Zeigt deine zelluläre Schutz-Reserve.' },
        { name: 'MTOR', explainer: 'Schaltet zwischen Wachstum und Reparatur deiner Zellen.', example: 'Bestimmt, wie dein Körper auf Protein und Aktivität antwortet.' },
      ],
      epiLine: 'Dazu dein epigenetisches Alter und MethylPace-Score — der direkteste Indikator für dein biologisches Alter.',
    },
    weight: {
      topic: 'Stoffwechsel',
      icon: 'scales',
      title: 'Verstehen, wie der Körper Essen verarbeitet',
      short: 'FTO steuert dein Sättigungsgefühl, TCF7L2 deine Insulin-Antwort auf Kohlenhydrate. Ob deine Makro-Verteilung zu dir passt oder still gegen dich arbeitet, hängt davon ab, welche Varianten du trägst.',
      genes: [
        { name: 'FTO', explainer: 'Beeinflusst Appetit und Fettspeicherung.', example: 'Erklärt, warum manche bei gleicher Kalorienmenge schneller zunehmen.' },
        { name: 'TCF7L2', explainer: 'Reguliert deine Insulin-Antwort.', example: 'Zeigt, wie dein Körper auf Kohlenhydrate reagiert.' },
        { name: 'MCM6', explainer: 'Bestimmt deine Laktose-Verträglichkeit.', example: 'Erklärt mögliche Beschwerden nach Milchprodukten.' },
        { name: 'MC4R', explainer: 'Der zentrale Sättigungs-Schalter im Gehirn.', example: 'Bestimmt, wie schnell du Sättigung wahrnimmst.' },
      ],
      epiLine: 'Plus dein epigenetisches Entzündungsprofil — entscheidend für Stoffwechsel-Gesundheit.',
    },
    energy: {
      topic: 'Energie',
      icon: 'lightning',
      title: 'Energie zurückgewinnen',
      short: 'Bei einer schwachen VDR-Variante kommt Vitamin D trotz guter Blutwerte kaum in deinen Zellen an. Ob deine Müdigkeit daher kommt, von deiner Methylierung über MTHFR oder von stiller Entzündung über IL6, trennt erst der Test.',
      genes: [
        { name: 'MTHFR', explainer: 'Reguliert deine Methylierung — zentral für Energie- und Nervenstoffwechsel.', example: 'Bestimmt, ob du normale Folsäure verwertest oder methylierte brauchst.' },
        { name: 'VDR', explainer: 'Vitamin-D-Rezeptor — wie gut Vitamin D in deinen Zellen ankommt.', example: 'Erklärt, warum hohe Blutwerte trotzdem Müdigkeit lassen können.' },
        { name: 'IL6', explainer: 'Marker für stille Entzündungs-Aktivität.', example: 'Chronisch erhöht: Erschöpfung und schlechte Regeneration.' },
        { name: 'TLR4', explainer: 'Steuert deine angeborene Immunantwort.', example: 'Beeinflusst, wie schnell dein Körper mit Entzündung reagiert.' },
      ],
      epiLine: 'Plus epigenetische Marker, die zeigen, wie aktiv dein Energiestoffwechsel läuft.',
    },
    sleep: {
      topic: 'Schlaf',
      icon: 'moon',
      title: 'Endlich durchschlafen',
      short: 'Mit der langsamen CYP1A2-Variante wirkt der Espresso um 14 Uhr noch um Mitternacht, mit der schnellen ist er um 18 Uhr abgebaut. Welche du trägst, und was PER3 über deinen Chronotyp sagt, liest der Test aus deiner Probe.',
      genes: [
        { name: 'PER3', explainer: 'Bestimmt deinen Chronotyp — biologisch früh oder spät aktiv.', example: 'Erklärt, warum manche morgens nicht produktiv sein können.' },
        { name: 'CYP1A2', explainer: 'Reguliert dein Koffein-Abbau-Tempo.', example: 'Schnelle Variante: Espresso nach dem Essen geht. Langsame: nach 14 Uhr wird Schlaf zum Glücksspiel.' },
        { name: 'ADORA2A', explainer: 'Bestimmt, wie stark Koffein dein Nervensystem aufdreht.', example: 'Macht den Unterschied zwischen wach und nervös bei der gleichen Dosis.' },
      ],
      epiLine: 'Plus epigenetische Schlaf-Marker — zeigen, wie regenerativ dein Schlaf tatsächlich ist.',
    },
    stress: {
      topic: 'Stress',
      icon: 'wind',
      title: 'Stress verstehen und Nervensystem unterstützen',
      short: 'COMT entscheidet, wie schnell du Stress-Hormone wieder abbaust. Die schnelle Variante bleibt unter Druck ruhig, die langsame denkt tiefer und braucht länger zur Erholung. Auf welcher Seite du stehst, zeigt der Test.',
      genes: [
        { name: 'COMT', explainer: 'Reguliert den Abbau von Stress-Hormonen wie Adrenalin und Dopamin.', example: 'Schnelle Variante: stressresistent. Langsame: tiefer Denker, längere Erholung.' },
        { name: 'BDNF', explainer: 'Wachstumsfaktor für deine Nervenzellen.', example: 'Bestimmt deine mentale Resilienz und Lern-Geschwindigkeit.' },
      ],
      epiLine: 'Plus epigenetische Stress-Marker — zeigen, wie sehr chronischer Stress dich prägt.',
    },
    cognition: {
      topic: 'Konzentration',
      icon: 'lightbulb',
      title: 'Konzentration, Klarheit, Gedächtnis',
      short: 'Mit einer schwachen FADS1-Variante wandelt dein Körper pflanzliches Omega-3 kaum in die nutzbare Form um, Leinöl bringt dann wenig und Algenöl viel. Ob das auf dich zutrifft, steht in deinem FADS1-Status.',
      genes: [
        { name: 'BDNF', explainer: 'Wachstumsfaktor für Nervenzellen — Basis für Lernen und Erinnerung.', example: 'Aktive Variante: schnelles Lernen, gute Konzentration unter Druck.' },
        { name: 'FADS1', explainer: 'Bestimmt, wie gut du pflanzliche Omega-3 in nutzbare Form umwandelst.', example: 'Schwache Variante: brauchst eher Fisch oder Algenöl statt Leinöl.' },
        { name: 'APOE', explainer: 'Wichtigster genetischer Marker für kognitive Langzeit-Gesundheit.', example: 'Zeigt dein Risiko-Profil und welche Prävention bei dir am stärksten greift.' },
      ],
      epiLine: 'Plus epigenetische Marker für deine aktuelle kognitive Reserve.',
    },
    training: {
      topic: 'Training',
      icon: 'barbell',
      title: 'Smarter trainieren',
      short: 'ACTN3 bestimmt, ob du eher Kraft- oder Ausdauer-Typ bist, ACE wie stark deine VO₂max überhaupt auf Training anspringt. Welches Programm bei dir mehr bringt als das andere, entscheidet sich an diesen Varianten.',
      genes: [
        { name: 'ACTN3', explainer: 'Bestimmt deine Muskelfaser-Verteilung.', example: 'RR-Variante: Kraft- und Sprint-Typ. XX: Ausdauer-Typ.' },
        { name: 'ACE', explainer: 'Beeinflusst, wie stark dein Herz-Kreislauf-System auf Training reagiert.', example: 'I-Variante: gute VO₂max-Trainierbarkeit. D: schnellere Kraft-Adaption.' },
        { name: 'COL5A1', explainer: 'Reguliert die Stabilität deiner Sehnen und Bänder.', example: 'Bestimmt dein genetisches Verletzungs-Risiko.' },
        { name: 'PPARA', explainer: 'Steuert den Fett-Stoffwechsel bei Belastung.', example: 'Bestimmt, wie gut du Fett als Energiequelle bei langem Cardio nutzt.' },
      ],
      epiLine: 'Plus epigenetische Marker, die deine aktuelle Trainings-Belastung sichtbar machen.',
    },
    heart: {
      topic: 'Herz & Kreislauf',
      icon: 'heartbeat',
      title: 'Herz aktiv schützen',
      short: 'Mit einer salzsensitiven AGT-Variante bewegt jedes Gramm Salz deinen Blutdruck spürbar, mit der anderen kaum. Dazu dein APOE-Cholesterin-Profil und das 9p21-Signal, dein stärkster genetischer Herz-Marker.',
      genes: [
        { name: 'APOE', explainer: 'Reguliert deinen Cholesterin-Stoffwechsel.', example: 'E4-Variante: höheres LDL, profitiert besonders von mediterraner Ernährung.' },
        { name: 'AGT', explainer: 'Beeinflusst, wie dein Blutdruck auf Salz reagiert.', example: 'Sensitive Variante: Salz-Reduktion senkt Blutdruck stärker.' },
        { name: 'CDKN2B-AS1', explainer: 'Der 9p21-Locus — stärkster bekannter genetischer Herz-Risiko-Marker.', example: 'Zeigt, wie früh und intensiv du präventiv ansetzen solltest.' },
        { name: 'CETP', explainer: 'Reguliert das HDL-Cholesterin.', example: 'Bestimmt deine genetische "gute Cholesterin"-Reserve.' },
      ],
      epiLine: 'Plus epigenetische Marker, die zeigen, wie aktiv dein kardiovaskuläres System ist.',
    },
    supplements: {
      topic: 'Vitamine & Supplements',
      icon: 'pill',
      title: 'Passende Vitamine und Supplements',
      short: 'MTHFR entscheidet, ob normale Folsäure bei dir funktioniert oder ob du die methylierte Form brauchst, FUT2 wie gut B12 durch deine Darmwand kommt. Die Form zählt meist mehr als die Dosis, welche Form, ist individuell.',
      genes: [
        { name: 'MTHFR', explainer: 'Reguliert die Folsäure-Verwertung.', example: 'C677T-Variante: brauchst Methylfolat statt synthetische Folsäure.' },
        { name: 'VDR', explainer: 'Vitamin-D-Rezeptor — wie effizient Vitamin D in deinen Zellen wirkt.', example: 'Bestimmt deinen optimalen Vitamin-D-Zielwert.' },
        { name: 'FUT2', explainer: 'Beeinflusst deine Vitamin-B12-Aufnahme über die Darmwand.', example: 'Non-secretor: höheres Risiko für B12-Mangel trotz Ernährung.' },
        { name: 'BCO1', explainer: 'Wandelt pflanzliches Beta-Carotin in nutzbares Vitamin A.', example: 'Schwache Variante: brauchst direkt Vitamin A oder tierische Quellen.' },
      ],
      epiLine: 'Plus epigenetische Mikronährstoff-Marker für deinen aktuellen Versorgungs-Status.',
    },
    skin: {
      topic: 'Haut & Haar',
      icon: 'sparkle',
      title: 'Haut und Haar von innen',
      short: 'ERCC2 repariert UV-Schäden in deiner Haut, AR bestimmt, wie empfindlich deine Follikel auf DHT reagieren. Ob bei dir konsequenter UV-Schutz mehr zählt als jede teure Creme, hängt an deiner ERCC2-Variante.',
      genes: [
        { name: 'SOD2', explainer: 'Hauptenzym der antioxidativen Abwehr in deinen Zellen.', example: 'Schwache Variante: höherer oxidativer Stress, profitiert von Antioxidantien.' },
        { name: 'ERCC2', explainer: 'Repariert UV-Schäden in deiner DNA.', example: 'Reduzierte Aktivität: schnellere Hautalterung durch Sonne.' },
        { name: 'AR', explainer: 'Androgen-Rezeptor — bestimmt deine DHT-Sensitivität.', example: 'Hauptfaktor für androgenetischen Haarausfall.' },
        { name: 'MC1R', explainer: 'Reguliert Pigment-Bildung und Hautempfindlichkeit.', example: 'Bestimmt dein UV-Schutz-Niveau.' },
      ],
      epiLine: 'Plus epigenetische Hautalter-Marker — zeigen den biologischen Zustand deiner Haut.',
    },
  };

  function ageGroup(age) {
    if (age == null) return '';
    if (age < 35) return '25-34';
    if (age < 45) return '35-44';
    if (age < 55) return '45-54';
    if (age < 65) return '55-64';
    return '65+';
  }

  function buildCustomerTags(topThree, answers) {
    const tags = ['quiz-completed'];
    (topThree || []).forEach((id, idx) => {
      if (id) tags.push(`top${idx + 1}-${id}`);
    });
    const ag = ageGroup(answers.age);
    if (ag) tags.push(`age-${ag}`);
    if (answers.gender) tags.push(`gender-${answers.gender}`);
    return tags;
  }

  function dispatchQuizCompleted(state) {
    const payload = {
      event: 'quiz_completed',
      quiz_top1: state.topThree[0] || null,
      quiz_top2: state.topThree[1] || null,
      quiz_top3: state.topThree[2] || null,
      quiz_age: state.answers.age,
      quiz_age_group: ageGroup(state.answers.age),
      quiz_gender: state.answers.gender,
    };
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push(payload);
    }
    // CustomEvent für theme-interne Listener / TripleWhale-Hook
    window.dispatchEvent(new CustomEvent('lifetime:quiz-completed', { detail: payload }));
  }

  // 2026-07-23: getResultHeadline/getResultSummary entfernt. Die Result-Page hat keine
  // H1 und keine Sub mehr — die Topic-Namen stehen in der Themen-Karte, der Kicker
  // ordnet das Ergebnis als Vorschau ein.

  // Bio-Age-Schätzung aus den Quiz-Antworten (kein zusätzlicher Aufwand für den User).
  // Slider 1-5: 1 = worst → +2, 5 = best → -2 (linear). Aktivität: aktiv -2, arm +2.
  function computeBioAge(answers) {
    const chronoAge = parseInt(answers.age, 10) || 40;
    let delta = 0;

    ['sleep', 'energy', 'stress', 'weight'].forEach((key) => {
      const v = answers[key];
      if (v == null) return;
      delta += (3 - v) * 1;  // value 1 → +2, value 3 → 0, value 5 → -2
    });

    if (answers.activity === 'aktiv') delta -= 2;
    else if (answers.activity === 'arm') delta += 2;

    delta = Math.max(-10, Math.min(10, delta));
    const bioAge = Math.max(18, Math.min(90, Math.round(chronoAge + delta)));
    const direction = delta > 0 ? 'up' : delta < 0 ? 'down' : 'zero';
    return { chronoAge, bioAge, delta: Math.round(delta), direction };
  }

  // Gate-Persistenz: wer die E-Mail schon abgegeben hat, sieht die Tiefe direkt wieder.
  const UNLOCK_KEY = 'lt_quiz_result_unlocked';

  function isUnlocked() {
    try { return localStorage.getItem(UNLOCK_KEY) === '1'; } catch (e) { return false; }
  }

  function persistUnlock() {
    try { localStorage.setItem(UNLOCK_KEY, '1'); } catch (e) {}
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
      this.checkAutoStart();
    }

    // Deep-Link: /pages/meine-routine#quiz oder ?start=quiz startet das Quiz direkt
    checkAutoStart() {
      const hash = window.location.hash || '';
      const search = new URLSearchParams(window.location.search);
      const wantsStart =
        hash === '#quiz' ||
        hash === '#quiz-start' ||
        search.get('start') === 'quiz' ||
        search.get('quiz') === '1';
      if (wantsStart) {
        pushDataLayer({ event: 'quiz_started', quiz_start_source: 'url_param' });
        this.goto('q1');
      }
    }

    bindIntro() {
      // All [data-quiz-start] buttons trigger quiz start + fire DataLayer event
      const startButtons = this.root.querySelectorAll('[data-quiz-start]');
      startButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          pushDataLayer({ event: 'quiz_started', quiz_start_source: 'intro_button' });
          this.goto('q1');
        });
      });

      // Track clicks on PDP CTAs (intro "Jetzt Test bestellen" + result "Oder direkt zur Test-Bestellung")
      const pdpCtas = this.root.querySelectorAll('[data-quiz-pdp-cta], [data-result-pdp-cta]');
      pdpCtas.forEach((cta) => {
        cta.addEventListener('click', () => {
          // Result-CTAs tragen seit 2026-07-22 einen eigenen Wert (result_bioage /
          // result_card / result_sticky). Vorher fielen alle drei auf denselben String,
          // dadurch war in GA4 nicht erkennbar, welcher CTA die PDP-Klicks trägt.
          const source = cta.hasAttribute('data-quiz-pdp-cta')
            ? cta.getAttribute('data-quiz-pdp-cta') || 'intro_secondary'
            : cta.getAttribute('data-result-pdp-cta') || 'result_secondary';
          pushDataLayer({
            event: 'quiz_pdp_click',
            quiz_pdp_source: source,
            quiz_step: this.state ? this.state.step : 'intro',
          });
          // Do NOT preventDefault — let the link navigate to PDP as normal
        });
      });
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
        a.activity || (a.prevention && a.prevention.length > 0) || a.gender;
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

      // Result-Hook: Top-3 ist bereits berechnet — Result-Page rendern,
      // Customer-Tags vorbereiten + quiz_completed-Event dispatchen
      if (step === 'result') {
        this.renderResult();
        this.state.tags = buildCustomerTags(this.state.topThree, this.state.answers);
        dispatchQuizCompleted(this.state);
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
          ? `${((qIdx + 1) / TOTAL_QUESTIONS) * 100}%`
          : current === 'loading' || current === 'result' ? '100%' : '0%';
      }
      if (this.progressLabel) {
        this.progressLabel.textContent = qIdx >= 0 ? `${qIdx + 1} / ${TOTAL_QUESTIONS}` : '';
      }
      if (this.backBtn) {
        this.backBtn.hidden = !inQuestion;
      }

      if (inFullscreen) this.root.scrollTo({ top: 0, behavior: 'instant' });

    }

    // ── Result-Page rendern (vereinfacht, ohne doppelte Top-3) ────
    renderResult() {
      const result = this.root.querySelector('[data-quiz-result]');
      if (!result) return;
      const top = this.state.topThree || [];
      const age = this.state.answers.age || 40;
      const gender = this.state.answers.gender;

      // 1 — Bio-Age-Schätzung: Count-up + ruhige Delta-Skala (Signatur-Moment)
      const bioAge = computeBioAge(this.state.answers);
      const passEl = result.querySelector('[data-bioage-pass]');
      const bioEl = result.querySelector('[data-bioage-num]');
      const bioAgeRoot = result.querySelector('[data-result-bioage]');
      const scaleFill = result.querySelector('[data-bioage-scale-fill]');
      const scaleBio = result.querySelector('[data-bioage-scale-bio]');
      const deltaEl = result.querySelector('[data-bioage-delta]');

      if (bioAgeRoot) {
        bioAgeRoot.classList.remove('is-up', 'is-down', 'is-zero', 'is-revealed');
        bioAgeRoot.classList.add('is-' + bioAge.direction);
      }

      // Delta-Caption — ruhig, faktisch (kein medizinischer Claim; Disclaimer steht darunter)
      const dAbs = Math.abs(bioAge.delta);
      const dUnit = dAbs === 1 ? 'Jahr' : 'Jahre';
      if (deltaEl) {
        if (bioAge.direction === 'up') deltaEl.innerHTML = 'Geschätzt, nicht gemessen: rund <strong>' + dAbs + '&nbsp;' + dUnit + '</strong> über deinem Pass-Alter.';
        else if (bioAge.direction === 'down') deltaEl.innerHTML = 'Geschätzt, nicht gemessen: rund <strong>' + dAbs + '&nbsp;' + dUnit + '</strong> unter deinem Pass-Alter.';
        else deltaEl.textContent = 'Geschätzt, nicht gemessen: im Einklang mit deinem Pass-Alter.';
      }

      // Skala-Zielposition (24-Jahre-Fenster, Pass = Mitte 50 %)
      const _span = 24;
      const _bioPct = Math.max(4, Math.min(96, ((bioAge.delta + _span / 2) / _span) * 100));
      const _lo = Math.min(50, _bioPct), _hi = Math.max(50, _bioPct);

      // Fallback: Endwerte sofort (falls keine Animation läuft)
      if (passEl) passEl.textContent = bioAge.chronoAge;
      if (bioEl) bioEl.textContent = bioAge.bioAge;

      const _reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (_reduce) {
        if (scaleBio) scaleBio.style.left = _bioPct + '%';
        if (scaleFill) { scaleFill.style.left = _lo + '%'; scaleFill.style.width = (_hi - _lo) + '%'; }
        if (bioAgeRoot) bioAgeRoot.classList.add('is-revealed');
      } else {
        const _startVal = Math.max(18, bioAge.chronoAge - 10);
        if (passEl) passEl.textContent = _startVal;
        if (bioEl) bioEl.textContent = _startVal;
        // Nach dem nächsten Frame (Result-Step ist dann sichtbar): Reveal + Count-up + Skala
        requestAnimationFrame(function () {
          if (bioAgeRoot) bioAgeRoot.classList.add('is-revealed');
          countUp(passEl, _startVal, bioAge.chronoAge, 1000);
          countUp(bioEl, _startVal, bioAge.bioAge, 1000);
          if (scaleBio) scaleBio.style.left = _bioPct + '%';
          if (scaleFill) { scaleFill.style.left = _lo + '%'; scaleFill.style.width = (_hi - _lo) + '%'; }
        });
      }

      // 2 — Alle drei Themen als Blöcke in EINER Karte. Das Schloss steckt in jedem
      // Block; CSS zeigt es nur im gesperrten Zustand bei Thema 2 und 3.
      const themesEl = result.querySelector('[data-result-themes]');
      if (themesEl) {
        themesEl.innerHTML = '';
        top.forEach((needId, idx) => {
          const def = NEEDS_DETAIL[needId];
          if (!def) return;
          const article = document.createElement('article');
          article.className = 'lt-quiz-result-theme' + (idx === 0 ? ' lt-quiz-result-theme--featured' : '');
          const iconName = def.icon ? escapeHtml(def.icon) : '';
          const markers = (def.genes || [])
            .map((g) => `<span class="lt-quiz-result-theme__marker">${escapeHtml(g.name)}</span>`)
            .join('');
          article.innerHTML =
            `<header class="lt-quiz-result-theme__header">` +
              (iconName
                ? `<span class="lt-quiz-result-theme__icon" aria-hidden="true"><i class="ph-thin ph-${iconName}"></i></span>`
                : '') +
              `<h4 class="lt-quiz-result-theme__title">${escapeHtml(def.title)}</h4>` +
              `<span class="lt-quiz-result-theme__lock" aria-hidden="true"><i class="ph-thin ph-lock-simple"></i></span>` +
            `</header>` +
            (markers ? `<div class="lt-quiz-result-theme__markers" aria-label="Relevante Gen-Marker">${markers}</div>` : '') +
            `<p class="lt-quiz-result-theme__lead">${escapeHtml(def.short)}</p>`;
          themesEl.appendChild(article);
        });
      }

      // 2b — Gate-Zustand. Deterministisch aus dem gespeicherten Zustand — sonst bleibt ein einmal
      // geöffnetes Gate offen, wenn im selben Tab ein zweiter Durchlauf gerendert wird.
      const unlocked = isUnlocked();
      const gateEl = result.querySelector('[data-result-gate]');
      const formEl = result.querySelector('[data-result-form]');
      const successEl = result.querySelector('[data-result-success]');
      if (gateEl) gateEl.classList.toggle('is-unlocked', unlocked);
      if (formEl) formEl.hidden = unlocked;
      if (successEl) successEl.hidden = !unlocked;

      // 3 — Scope-Pills: Union der Top-3 dnaCategories markieren
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

      // Nur die passenden Bereiche bleiben sichtbar (CSS blendet den Rest aus) —
      // 16 Pills waren als Wand länger als der Nutzen, den sie transportieren.
      result.querySelectorAll('[data-scope-cat]').forEach((pill) => {
        pill.classList.toggle('is-relevant', activeCats.has(pill.dataset.scopeCat));
      });

      // 4 — Alle PDP-CTAs (früh + Card + sticky) mit top1 anreichern
      result.querySelectorAll('[data-result-pdp-cta]').forEach((pdpCta) => {
        if (!top[0]) return;
        const url = new URL(pdpCta.getAttribute('href'), window.location.origin);
        url.searchParams.set('top1', top[0]);
        pdpCta.setAttribute('href', url.pathname + url.search);
      });

      // 5 — Sichtbarkeits-Tracking auf den Haupt-Ask (2026-07-22).
      // Trennt "hat die Frage gesehen und abgelehnt" von "ist nie hingekommen". Ohne das
      // Signal waren 12,3 % PDP-Klicks und 1 form_start auf 261 Abschlüsse nicht deutbar.
      // Feuert einmal pro Result-Ansicht, sobald der Card-CTA vollständig im Viewport ist.
      const askCta = result.querySelector('[data-result-pdp-cta="result_card"]');
      if (askCta && !this._askSeenBound && typeof IntersectionObserver === 'function') {
        this._askSeenBound = true;
        const askObserver = new IntersectionObserver((entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          askObserver.disconnect();
          pushDataLayer({
            event: 'quiz_result_cta_seen',
            quiz_top1: top[0] || '',
          });
        }, { threshold: 1 });
        askObserver.observe(askCta);
      }
    }

    bindResultCta() {
      const form = this.root.querySelector('[data-result-form]');
      const successEl = this.root.querySelector('[data-result-success]');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitQuizCustomer(form, successEl);
        });
      }
    }

    async submitQuizCustomer(form, successEl) {
      const emailEl = form.querySelector('[data-result-email]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const errorEl = form.querySelector('[data-result-error]');
      const email = emailEl ? emailEl.value.trim() : '';

      if (!email || !email.includes('@')) {
        // novalidate: ohne eigene Meldung passiert beim Klick sichtbar nichts
        if (errorEl) {
          errorEl.textContent = 'Bitte trag eine gültige E-Mail-Adresse ein.';
          errorEl.hidden = false;
        }
        if (emailEl) emailEl.focus();
        return;
      }

      // Loading-State
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet…';
      }
      if (errorEl) errorEl.hidden = true;

      try {
        // Shopify Standard-Customer-Form endpoint
        const fd = new FormData();
        fd.append('form_type', 'customer');
        fd.append('utf8', '✓');
        fd.append('contact[email]', email);
        fd.append('contact[tags]', (this.state.tags || []).join(','));
        fd.append('contact[accepts_marketing]', 'true');

        const res = await fetch('/contact', {
          method: 'POST',
          body: fd,
          credentials: 'same-origin',
        });

        // Shopify gibt 200 zurück auch bei "Email schon existiert" — als Erfolg behandeln
        if (!res.ok && res.status !== 422) throw new Error('HTTP ' + res.status);

        this.state.email = email;
        this.state.submitted = true;
        form.hidden = true;
        if (successEl) successEl.hidden = false;

        const gateEl = this.root.querySelector('[data-result-gate]');
        if (gateEl) gateEl.classList.add('is-unlocked');
        persistUnlock();

        if (window.dataLayer && typeof window.dataLayer.push === 'function') {
          window.dataLayer.push({
            event: 'quiz_email_submitted',
            quiz_gender: this.state.answers.gender,
            quiz_age_group: ageGroup(this.state.answers.age),
          });
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel || 'Freischalten';
        }
        if (errorEl) {
          errorEl.textContent = 'Etwas ist schiefgelaufen. Bitte versuch es nochmal.';
          errorEl.hidden = false;
        }
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
