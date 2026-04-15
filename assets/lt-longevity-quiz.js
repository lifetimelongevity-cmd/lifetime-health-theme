/**
 * LIFETIME — Longevity Quiz
 * Vanilla JS, no framework. Self-contained.
 * 6 Fragen → 4 Profile → Produktempfehlungen
 */

(function () {
  'use strict';

  // ─── Quiz-Daten ──────────────────────────────────────────────────────────────

  const QUESTIONS = [
    {
      id: 'ziel',
      emoji: '🎯',
      question: 'Was ist dein wichtigstes Gesundheitsziel?',
      answers: [
        { text: 'Mehr Energie & Vitalität im Alltag', scores: { energie: 3 } },
        { text: 'Schärfer denken & mehr Fokus', scores: { fokus: 3 } },
        { text: 'Besser schlafen & schneller erholen', scores: { schlaf: 3 } },
        { text: 'Langfristig gesund & vital bleiben', scores: { langlebigkeit: 3 } },
      ],
    },
    {
      id: 'schlaf',
      emoji: '🌙',
      question: 'Wie erholsam ist dein Schlaf?',
      answers: [
        { text: 'Tief und erholt – ich fühle mich morgens fit', scores: { langlebigkeit: 1 } },
        { text: 'Meistens ok, manchmal unruhige Nächte', scores: { energie: 1 } },
        { text: 'Ich wache oft erschöpft auf', scores: { schlaf: 2, energie: 1 } },
        { text: 'Schlechter Schlaf ist mein tägliches Problem', scores: { schlaf: 3 } },
      ],
    },
    {
      id: 'energie',
      emoji: '⚡',
      question: 'Wie ist dein Energieniveau tagsüber?',
      answers: [
        { text: 'Konstant hoch – keine Einbrüche', scores: { langlebigkeit: 1 } },
        { text: 'Nachmittagstief, aber insgesamt ok', scores: { energie: 2 } },
        { text: 'Ich fühle mich häufig erschöpft', scores: { energie: 3 } },
        { text: 'Ich bin chronisch müde und antriebslos', scores: { energie: 2, schlaf: 1 } },
      ],
    },
    {
      id: 'fokus',
      emoji: '🧠',
      question: 'Wie ist deine mentale Schärfe & Konzentration?',
      answers: [
        { text: 'Ich bin den ganzen Tag fokussiert und klar', scores: { langlebigkeit: 1 } },
        { text: 'Manchmal verliere ich den Faden', scores: { fokus: 1 } },
        { text: 'Konzentration fällt mir oft schwer', scores: { fokus: 2 } },
        { text: 'Brain Fog ist mein ständiger Begleiter', scores: { fokus: 3 } },
      ],
    },
    {
      id: 'ernaehrung',
      emoji: '🥗',
      question: 'Wie würdest du deine Ernährung beschreiben?',
      answers: [
        { text: 'Sehr ausgewogen – viel Gemüse, gute Proteine', scores: { langlebigkeit: 2 } },
        { text: 'Relativ gut, aber mit Lücken', scores: { langlebigkeit: 1, energie: 1 } },
        { text: 'Unregelmäßig – mal gut, mal nicht', scores: { energie: 1, fokus: 1 } },
        { text: 'Viel Fertigkost, wenig Zeit zum Kochen', scores: { energie: 2 } },
      ],
    },
    {
      id: 'stress',
      emoji: '🧘',
      question: 'Wie hoch ist dein Stresslevel im Alltag?',
      answers: [
        { text: 'Niedrig – ich fühle mich ausgeglichen', scores: { langlebigkeit: 1 } },
        { text: 'Moderat – gelegentlich stressige Phasen', scores: { energie: 1 } },
        { text: 'Hoch – ich stehe oft unter Druck', scores: { schlaf: 2, fokus: 1 } },
        { text: 'Sehr hoch – Dauerstress ist mein Alltag', scores: { schlaf: 3 } },
      ],
    },
  ];

  const PROFILES = {
    energie: {
      icon: '⚡',
      label: 'Dein Longevity-Profil',
      title: 'Energie & Vitalität',
      headline: 'Dein Fokus: Mehr Energie im Alltag',
      description:
        'Deine Antworten zeigen, dass dein Körper gezielte Unterstützung bei der Energieproduktion braucht. Viele Menschen spüren nach 30 bereits erste Einbußen – das ist biologisch normal, aber nicht unausweichlich. Dein Plan kombiniert die Analyse deiner genetischen Voraussetzungen mit gezielter Supplementierung.',
      step1: 'Schritt 1 – Deine Basis verstehen',
      step2: 'Schritt 2 – Gezielt unterstützen',
    },
    fokus: {
      icon: '🧠',
      label: 'Dein Longevity-Profil',
      title: 'Fokus & Klarheit',
      headline: 'Dein Fokus: Mentale Schärfe & Klarheit',
      description:
        'Deine Antworten deuten auf einen klaren Bedarf an kognitiver Unterstützung hin. Konzentration, Gedächtnis und mentale Energie sind eng mit deinem Nährstoffhaushalt verknüpft. Dein Plan setzt auf eine genaue Analyse und die richtigen Nährstoffe für dein Gehirn.',
      step1: 'Schritt 1 – Deine Basis verstehen',
      step2: 'Schritt 2 – Gehirn gezielt unterstützen',
    },
    schlaf: {
      icon: '🌙',
      label: 'Dein Longevity-Profil',
      title: 'Schlaf & Regeneration',
      headline: 'Dein Fokus: Tieferer Schlaf & Erholung',
      description:
        'Guter Schlaf ist die Basis für alles – Energie, Fokus, Immunsystem und Langlebigkeit. Deine Antworten zeigen, dass hier der größte Hebel liegt. Dein Plan zielt direkt auf Schlafqualität und nächtliche Regeneration ab.',
      step1: 'Schritt 1 – Deine Basis verstehen',
      step2: 'Schritt 2 – Regeneration optimieren',
    },
    langlebigkeit: {
      icon: '🔬',
      label: 'Dein Longevity-Profil',
      title: 'Langlebigkeit & Zellgesundheit',
      headline: 'Dein Fokus: Biologisches Alter aktiv gestalten',
      description:
        'Du bist bereits auf einem guten Weg. Dein Plan zielt darauf ab, diesen Zustand langfristig zu erhalten und biologisches Altern aktiv zu verlangsamen – auf zellulärer Ebene, mit wissenschaftlicher Grundlage.',
      step1: 'Schritt 1 – Deine genetische Basis kennen',
      step2: 'Schritt 2 – Zellgesundheit langfristig sichern',
    },
  };

  // ─── State ───────────────────────────────────────────────────────────────────

  let currentStep = 0;
  let answers = []; // { questionIndex, answerIndex, scores }

  // ─── DOM-Referenzen ──────────────────────────────────────────────────────────

  let stepsEl, resultsEl, progressBarEl, stepCounterEl;

  // ─── Init ────────────────────────────────────────────────────────────────────

  function init() {
    const quizEl = document.getElementById('lt-longevity-quiz');
    if (!quizEl) return;

    stepsEl = document.getElementById('lt-quiz-steps');
    resultsEl = document.getElementById('lt-quiz-results');
    progressBarEl = document.getElementById('lt-quiz-progress-bar');
    stepCounterEl = document.getElementById('lt-quiz-step-counter');

    renderStep(0);
    updateProgress();
  }

  // ─── Rendering ───────────────────────────────────────────────────────────────

  function renderStep(index) {
    const q = QUESTIONS[index];

    stepsEl.innerHTML = `
      <div class="lt-quiz__step" data-step="${index}">
        <p class="lt-quiz__question-emoji" aria-hidden="true">${q.emoji}</p>
        <h3 class="lt-quiz__question">${escapeHtml(q.question)}</h3>
        <ul class="lt-quiz__answers" role="list">
          ${q.answers
            .map(
              (a, i) => `
            <li class="lt-quiz__answer${answers[index] && answers[index].answerIndex === i ? ' lt-quiz__answer--selected' : ''}"
                role="button"
                tabindex="0"
                data-index="${i}"
                aria-pressed="${answers[index] && answers[index].answerIndex === i ? 'true' : 'false'}">
              <span class="lt-quiz__answer-check" aria-hidden="true"></span>
              <span class="lt-quiz__answer-text">${escapeHtml(a.text)}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    `;

    // Bind click events
    stepsEl.querySelectorAll('.lt-quiz__answer').forEach((el) => {
      el.addEventListener('click', () => handleAnswer(index, parseInt(el.dataset.index)));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAnswer(index, parseInt(el.dataset.index));
        }
      });
    });

    // Scroll quiz into view smoothly
    document.getElementById('lt-longevity-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderResults(profileKey) {
    const profile = PROFILES[profileKey];
    const products = window.LT_QUIZ_PRODUCTS || {};
    const dna = products.dna;
    const supplement = products[profileKey];

    stepsEl.hidden = true;
    progressBarEl.closest('.lt-quiz__progress').hidden = true;
    stepCounterEl.hidden = true;

    resultsEl.hidden = false;
    resultsEl.innerHTML = `
      <div class="lt-quiz__results-inner">

        <div class="lt-quiz__profile-card">
          <p class="lt-quiz__profile-label">${escapeHtml(profile.label)}</p>
          <div class="lt-quiz__profile-icon-wrap" aria-hidden="true">${profile.icon}</div>
          <h3 class="lt-quiz__profile-title">${escapeHtml(profile.title)}</h3>
          <p class="lt-quiz__profile-headline">${escapeHtml(profile.headline)}</p>
          <p class="lt-quiz__profile-description">${escapeHtml(profile.description)}</p>
        </div>

        <div class="lt-quiz__plan-header">
          <p class="lt-quiz__plan-label">Dein persönlicher Plan</p>
          <p class="lt-quiz__plan-sub">Zwei Schritte für deinen Einstieg</p>
        </div>

        <div class="lt-quiz__products">
          ${renderProductCard(dna, profile.step1, 1)}
          ${renderProductCard(supplement, profile.step2, 2)}
        </div>

        <div class="lt-quiz__restart-wrap">
          <button class="lt-quiz__restart" id="lt-quiz-restart">
            Quiz wiederholen
          </button>
        </div>
      </div>
    `;

    document.getElementById('lt-quiz-restart')?.addEventListener('click', resetQuiz);
    document.getElementById('lt-longevity-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderProductCard(product, stepLabel, stepNum) {
    if (!product || !product.title) {
      return `
        <div class="lt-quiz__product lt-quiz__product--placeholder">
          <div class="lt-quiz__product-body">
            <p class="lt-quiz__product-step">Schritt ${stepNum}</p>
            <h4 class="lt-quiz__product-title">Produkt nicht konfiguriert</h4>
            <p class="lt-quiz__product-hint">Bitte Produkt in den Section-Einstellungen hinterlegen.</p>
          </div>
        </div>
      `;
    }

    return `
      <a class="lt-quiz__product" href="${product.url}">
        ${
          product.image
            ? `<div class="lt-quiz__product-image-wrap">
                 <img src="${product.image}" alt="${escapeHtml(product.title)}" class="lt-quiz__product-image" loading="lazy">
               </div>`
            : ''
        }
        <div class="lt-quiz__product-body">
          <p class="lt-quiz__product-step">${escapeHtml(stepLabel)}</p>
          <h4 class="lt-quiz__product-title">${escapeHtml(product.title)}</h4>
          ${product.price ? `<p class="lt-quiz__product-price">${escapeHtml(product.price)}</p>` : ''}
          <span class="lt-quiz__product-cta">Jetzt ansehen →</span>
        </div>
      </a>
    `;
  }

  // ─── Logic ───────────────────────────────────────────────────────────────────

  function handleAnswer(questionIndex, answerIndex) {
    const answer = QUESTIONS[questionIndex].answers[answerIndex];

    // Save answer
    answers[questionIndex] = { answerIndex, scores: answer.scores };

    // Highlight selected
    stepsEl.querySelectorAll('.lt-quiz__answer').forEach((el, i) => {
      const isSelected = i === answerIndex;
      el.classList.toggle('lt-quiz__answer--selected', isSelected);
      el.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    // Auto-advance after short delay for UX feedback
    setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        currentStep = questionIndex + 1;
        updateProgress();
        renderStep(currentStep);
      } else {
        // All questions answered — calculate result
        const profileKey = calculateProfile();
        renderResults(profileKey);
      }
    }, 350);
  }

  function calculateProfile() {
    const scores = { energie: 0, fokus: 0, schlaf: 0, langlebigkeit: 0 };

    answers.forEach((answer) => {
      if (!answer) return;
      Object.entries(answer.scores).forEach(([key, val]) => {
        scores[key] = (scores[key] || 0) + val;
      });
    });

    let maxKey = 'langlebigkeit';
    let maxScore = -1;

    Object.entries(scores).forEach(([key, val]) => {
      if (val > maxScore) {
        maxScore = val;
        maxKey = key;
      }
    });

    return maxKey;
  }

  function updateProgress() {
    const pct = Math.round(((currentStep) / QUESTIONS.length) * 100);
    if (progressBarEl) progressBarEl.style.width = pct + '%';
    if (stepCounterEl) stepCounterEl.textContent = `Frage ${currentStep + 1} von ${QUESTIONS.length}`;
  }

  function resetQuiz() {
    currentStep = 0;
    answers = [];

    stepsEl.hidden = false;
    progressBarEl.closest('.lt-quiz__progress').hidden = false;
    stepCounterEl.hidden = false;
    resultsEl.hidden = true;
    resultsEl.innerHTML = '';

    updateProgress();
    renderStep(0);
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ─── Boot ────────────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Shopify section re-init
  document.addEventListener('shopify:section:load', (e) => {
    if (e.target.querySelector('#lt-longevity-quiz')) init();
  });
})();
