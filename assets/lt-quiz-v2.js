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

  const STEPS = ['intro', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading', 'result'];
  const QUESTION_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const FULLSCREEN_STEPS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'loading'];
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
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && FULLSCREEN_STEPS.includes(this.state.step)) {
          this.tryClose();
        }
      });
    }

    tryClose() {
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
        this.backBtn.hidden = !inQuestion || current === 'q1';
      }

      if (inFullscreen) this.root.scrollTo({ top: 0, behavior: 'instant' });
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
