/**
 * LIFETIME — Longevity Quiz
 * Vanilla JS, no framework. Self-contained.
 *
 * Finale Empfehlungsmatrix:
 *   Energie      → NMN (primär) | Kreatin | TMG
 *   Fokus        → Kreatin (primär) | Fisetin | Trans-Resveratrol
 *   Schlaf       → Schlafspray (primär) | Spermidin | Kreatin
 *   Langlebigkeit → NMN (primär) | Trans-Resveratrol | CaAKG
 */

(function () {
  'use strict';

  // ─── SVG Icon Library (Lucide-style, 24×24, stroke) ─────────────────────────

  const ICONS = {
    target: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    moon:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    zap:    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    brain:  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
    leaf:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 22 16 8"/><path d="M3.47 12.53A5 5 0 0 0 5 22a5 5 0 0 0 5-5 5 5 0 0 0-5.5-4.97"/><path d="M21 3a8 8 0 0 0-8 8 5 5 0 0 0 5 5 8 8 0 0 0 8-8 5 5 0 0 0-5-5z"/></svg>`,
    wind:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
    scope:  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
  };

  // ─── Quiz-Fragen ─────────────────────────────────────────────────────────────

  const QUESTIONS = [
    {
      id: 'ziel',
      icon: ICONS.target,
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
      icon: ICONS.moon,
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
      icon: ICONS.zap,
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
      icon: ICONS.brain,
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
      icon: ICONS.leaf,
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
      icon: ICONS.wind,
      question: 'Wie hoch ist dein Stresslevel im Alltag?',
      answers: [
        { text: 'Niedrig – ich fühle mich ausgeglichen', scores: { langlebigkeit: 1 } },
        { text: 'Moderat – gelegentlich stressige Phasen', scores: { energie: 1 } },
        { text: 'Hoch – ich stehe oft unter Druck', scores: { schlaf: 2, fokus: 1 } },
        { text: 'Sehr hoch – Dauerstress ist mein Alltag', scores: { schlaf: 3 } },
      ],
    },
  ];

  // ─── Profile & Empfehlungsmatrix ──────────────────────────────────────────────

  const PROFILES = {
    energie: {
      icon: ICONS.zap,
      label: 'Dein Longevity-Profil',
      title: 'Energie & Vitalität',
      headline: 'Dein Fokus: Mehr Energie im Alltag',
      description:
        'Deine Antworten zeigen, dass dein Körper gezielte Unterstützung bei der zellulären Energieproduktion braucht. Mit dem richtigen Plan kannst du Energieeinbrüche reduzieren und dein Vitalitätslevel langfristig stabilisieren.',
      primary: {
        key: 'energie_primary',
        reason: 'Dein NAD⁺-Spiegel sinkt mit dem Alter – NMN unterstützt die Energieproduktion direkt in deinen Mitochondrien.',
      },
      secondary: ['energie_sec1', 'energie_sec2'],
    },
    fokus: {
      icon: ICONS.brain,
      label: 'Dein Longevity-Profil',
      title: 'Fokus & Klarheit',
      headline: 'Dein Fokus: Mentale Schärfe & Klarheit',
      description:
        'Deine Antworten deuten auf einen klaren Bedarf an kognitiver Unterstützung hin. Konzentration, Gedächtnis und mentale Energie hängen eng mit deinem Nährstoffhaushalt zusammen – und lassen sich gezielt beeinflussen.',
      primary: {
        key: 'fokus_primary',
        reason: 'Kreatin versorgt dein Gehirn mit schnell verfügbarer Energie – besonders bei mentalem Stress und Erschöpfung gut belegt.',
      },
      secondary: ['fokus_sec1', 'fokus_sec2'],
    },
    schlaf: {
      icon: ICONS.moon,
      label: 'Dein Longevity-Profil',
      title: 'Schlaf & Regeneration',
      headline: 'Dein Fokus: Tieferer Schlaf & Erholung',
      description:
        'Guter Schlaf ist die Basis für alles – Energie, Fokus, Immunsystem und Langlebigkeit. Deine Antworten zeigen, dass hier der größte Hebel liegt. Dein Plan zielt direkt auf Schlafqualität und nächtliche Regeneration ab.',
      primary: {
        key: 'schlaf_primary',
        reason: 'Melatonin ist der am besten belegte Weg zur Verbesserung von Einschlafzeit und Schlaftiefe – direkt und alltagstauglich.',
      },
      secondary: ['schlaf_sec1', 'schlaf_sec2'],
    },
    langlebigkeit: {
      icon: ICONS.scope,
      label: 'Dein Longevity-Profil',
      title: 'Langlebigkeit & Zellgesundheit',
      headline: 'Dein Fokus: Biologisches Alter aktiv gestalten',
      description:
        'Du bist bereits auf einem guten Weg. Dein Plan zielt darauf ab, diesen Zustand langfristig zu erhalten und biologisches Altern aktiv zu verlangsamen – auf zellulärer Ebene, mit wissenschaftlicher Grundlage.',
      primary: {
        key: 'lang_primary',
        reason: 'NMN ist der am besten untersuchte NAD⁺-Baustein – zentral für Zellreparatur und die Verlangsamung biologischer Alterungsprozesse.',
      },
      secondary: ['lang_sec1', 'lang_sec2'],
    },
  };

  // ─── State ───────────────────────────────────────────────────────────────────

  let currentStep = 0;
  let answers = [];

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
        <div class="lt-quiz__question-icon" aria-hidden="true">${q.icon}</div>
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

    stepsEl.querySelectorAll('.lt-quiz__answer').forEach((el) => {
      el.addEventListener('click', () => handleAnswer(index, parseInt(el.dataset.index)));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAnswer(index, parseInt(el.dataset.index));
        }
      });
    });

    document.getElementById('lt-longevity-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderResults(profileKey) {
    const profile = PROFILES[profileKey];
    const products = window.LT_QUIZ_PRODUCTS || {};

    const primaryProduct = products[profile.primary.key];
    const sec1Product = products[profile.secondary[0]];
    const sec2Product = products[profile.secondary[1]];

    stepsEl.hidden = true;
    progressBarEl.closest('.lt-quiz__progress').hidden = true;
    stepCounterEl.hidden = true;

    resultsEl.hidden = false;
    resultsEl.innerHTML = `
      <div class="lt-quiz__results-inner">

        <div class="lt-quiz__profile-card">
          <p class="lt-quiz__profile-label">${escapeHtml(profile.label)}</p>
          <div class="lt-quiz__profile-icon-wrap" aria-hidden="true">${profile.icon}</div>
          <div class="lt-quiz__profile-title-group">
            <h3 class="lt-quiz__profile-title">${escapeHtml(profile.title)}</h3>
            <p class="lt-quiz__profile-headline">${escapeHtml(profile.headline)}</p>
          </div>
          <p class="lt-quiz__profile-description">${escapeHtml(profile.description)}</p>
        </div>

        <div class="lt-quiz__plan-section">
          <p class="lt-quiz__plan-label">Dein Kernprodukt</p>
          ${renderPrimaryCard(primaryProduct, profile.primary.reason)}
        </div>

        <div class="lt-quiz__secondary-section">
          <p class="lt-quiz__secondary-label">Ergänzt deinen Plan</p>
          <div class="lt-quiz__secondary-grid">
            ${renderSecondaryCard(sec1Product)}
            ${renderSecondaryCard(sec2Product)}
          </div>
        </div>

        <div class="lt-quiz__restart-wrap">
          <button class="lt-quiz__restart" id="lt-quiz-restart">Quiz wiederholen</button>
        </div>

      </div>
    `;

    document.getElementById('lt-quiz-restart')?.addEventListener('click', resetQuiz);
    document.getElementById('lt-longevity-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderPrimaryCard(product, reason) {
    if (!product || !product.title) {
      return `<div class="lt-quiz__product-primary lt-quiz__product--placeholder">
        <p class="lt-quiz__product-hint">Produkt noch nicht konfiguriert.</p>
      </div>`;
    }
    return `
      <a class="lt-quiz__product-primary" href="${product.url}">
        ${product.image
          ? `<div class="lt-quiz__product-primary-image-wrap">
               <img src="${product.image}" alt="${escapeHtml(product.title)}" class="lt-quiz__product-primary-image" loading="lazy">
             </div>`
          : ''}
        <div class="lt-quiz__product-primary-body">
          <h4 class="lt-quiz__product-primary-title">${escapeHtml(product.title)}</h4>
          <p class="lt-quiz__product-primary-reason">${escapeHtml(reason)}</p>
          ${product.price ? `<p class="lt-quiz__product-primary-price">${escapeHtml(product.price)}</p>` : ''}
          <span class="lt-quiz__product-primary-cta">Jetzt ansehen →</span>
        </div>
      </a>
    `;
  }

  function renderSecondaryCard(product) {
    if (!product || !product.title) {
      return `<div class="lt-quiz__product-secondary lt-quiz__product--placeholder">
        <p class="lt-quiz__product-hint">Produkt nicht konfiguriert.</p>
      </div>`;
    }
    return `
      <a class="lt-quiz__product-secondary" href="${product.url}">
        ${product.image
          ? `<div class="lt-quiz__product-secondary-image-wrap">
               <img src="${product.image}" alt="${escapeHtml(product.title)}" class="lt-quiz__product-secondary-image" loading="lazy">
             </div>`
          : ''}
        <div class="lt-quiz__product-secondary-body">
          <h5 class="lt-quiz__product-secondary-title">${escapeHtml(product.title)}</h5>
          ${product.price ? `<p class="lt-quiz__product-secondary-price">${escapeHtml(product.price)}</p>` : ''}
        </div>
      </a>
    `;
  }

  // ─── Logik ───────────────────────────────────────────────────────────────────

  function handleAnswer(questionIndex, answerIndex) {
    const answer = QUESTIONS[questionIndex].answers[answerIndex];
    answers[questionIndex] = { answerIndex, scores: answer.scores };

    stepsEl.querySelectorAll('.lt-quiz__answer').forEach((el, i) => {
      const sel = i === answerIndex;
      el.classList.toggle('lt-quiz__answer--selected', sel);
      el.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });

    setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        currentStep = questionIndex + 1;
        updateProgress();
        renderStep(currentStep);
      } else {
        renderResults(calculateProfile());
      }
    }, 350);
  }

  function calculateProfile() {
    const scores = { energie: 0, fokus: 0, schlaf: 0, langlebigkeit: 0 };
    answers.forEach((a) => {
      if (!a) return;
      Object.entries(a.scores).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
    });
    return Object.entries(scores).reduce((best, [k, v]) => v > scores[best] ? k : best, 'langlebigkeit');
  }

  function updateProgress() {
    const pct = Math.round((currentStep / QUESTIONS.length) * 100);
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
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // ─── Boot ────────────────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', (e) => {
    if (e.target.querySelector('#lt-longevity-quiz')) init();
  });
})();
