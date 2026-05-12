/**
 * LIFETIME — AGE & DNA Quiz v2
 * Step 1+2 der Implementierungs-Reihenfolge (siehe docs/lifetime-quiz-spec.md):
 *  - State-Maschine (intro → q1..q7 → loading → result)
 *  - Slider-Frage funktionsfähig (Q1), restliche Steps als Platzhalter
 *  - Fullscreen-Modus während Q1..Loading (blendet Site-Header/Footer aus)
 *
 * Scoring/Top-3-Logik ist hier schon vorhanden für späteren Schritt 6.
 */
(function () {
  'use strict';

  const STEPS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading', 'result'];
  const QUESTION_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const FULLSCREEN_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading'];
  const AUTO_ADVANCE_MS = 300;

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

  // ── Scoring (vorbereitet für Schritt 6) ─────────────────────────
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

  // ── State-Maschine ──────────────────────────────────────────────
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
      this.bindIntro();
      this.bindSliders();
      this.bindBack();
      this.bindClose();
      this.bindEscape();
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
        if (idx > 1) this.goto(STEPS[idx - 1]);
      });
    }

    bindClose() {
      if (!this.closeBtn) return;
      this.closeBtn.addEventListener('click', () => this.tryClose());
    }

    bindEscape() {
      this.escapeHandler = (e) => {
        if (e.key === 'Escape' && FULLSCREEN_STEPS.includes(this.state.step)) {
          this.tryClose();
        }
      };
      document.addEventListener('keydown', this.escapeHandler);
    }

    tryClose() {
      const anyAnswer = Object.values(this.state.answers).some(
        (v) => v !== null && !(Array.isArray(v) && v.length === 0) && v !== 40
      );
      if (anyAnswer && !window.confirm('Quiz wirklich abbrechen? Deine bisherigen Antworten gehen verloren.')) return;
      this.state = createInitialState();
      this.goto('intro');
    }

    bindSliders() {
      this.root.querySelectorAll('[data-quiz-step].lt-quiz__step--slider').forEach((stepEl) => {
        const questionId = stepEl.dataset.questionId;
        const stops = stepEl.querySelectorAll('.lt-quiz-slider__stop');
        stops.forEach((stop) => {
          stop.addEventListener('click', () => this.handleSliderPick(stepEl, stops, stop, questionId));
        });
      });
    }

    handleSliderPick(stepEl, stops, picked, questionId) {
      const value = parseInt(picked.dataset.value, 10);
      stops.forEach((s) => {
        const active = s === picked;
        s.classList.toggle('is-selected', active);
        s.setAttribute('aria-checked', active ? 'true' : 'false');
      });
      this.state.answers[questionId] = value;
      this.state.scores = computeScores(this.state.answers);

      const currentIdx = STEPS.indexOf(this.state.step);
      const nextStep = STEPS[currentIdx + 1];
      if (!nextStep) return;
      window.setTimeout(() => this.goto(nextStep), AUTO_ADVANCE_MS);
    }

    goto(step) {
      if (!STEPS.includes(step)) return;
      this.state.step = step;
      this.render();
      this.root.dispatchEvent(new CustomEvent('quiz:step', { detail: { step, state: this.snapshot() } }));
    }

    render() {
      const current = this.state.step;
      const inQuestion = QUESTION_STEPS.includes(current);
      const inFullscreen = FULLSCREEN_STEPS.includes(current);

      // Step-Sichtbarkeit
      this.steps.forEach((el, key) => {
        const active = key === current;
        el.hidden = !active;
        el.classList.toggle('is-active', active);
      });

      // Grid-Sichtbarkeit (nur während Frage-Steps)
      if (this.grid) this.grid.hidden = !inQuestion;

      // Section-Modi (CSS-Hooks)
      this.root.classList.toggle('lt-quiz--in-questions', inQuestion);
      this.root.classList.toggle('lt-quiz--in-loading', current === 'loading');
      this.root.classList.toggle('lt-quiz--fullscreen', inFullscreen);
      document.body.classList.toggle('lt-quiz-fullscreen', inFullscreen);

      // Progress (1..7)
      const qIdx = QUESTION_STEPS.indexOf(current);
      if (this.progressBar) {
        this.progressBar.style.width = qIdx >= 0 ? `${((qIdx + 1) / 7) * 100}%` : '0%';
      }
      if (this.progressLabel) {
        this.progressLabel.textContent = qIdx >= 0 ? `${qIdx + 1} von 7` : '';
      }
      if (this.backBtn) {
        this.backBtn.hidden = !inQuestion || current === 'q1';
      }

      // Top: Fullscreen scrollt nach oben
      if (inFullscreen) this.root.scrollTo({ top: 0, behavior: 'instant' });
    }

    snapshot() {
      return JSON.parse(JSON.stringify(this.state));
    }
  }

  // Exponieren für späteres Andocken (Matrix, Result, Tests)
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
