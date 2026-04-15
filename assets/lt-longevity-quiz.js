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
    dna:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m10 16 1 1"/><path d="m17 7 3-3"/><path d="m14 14 3 3"/></svg>`,
    run:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13" cy="4" r="1"/><path d="M6 20v-6l2-2 4-2 4 4 2 6"/><path d="m6 20 2-2"/><path d="M18 14v4l-4-2"/><path d="M8 12 6 8l4-1 3 3-2 4-1-2"/></svg>`,
    apple:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.94c1.5 0 2.75-.15 4-.52 1.95-.52 3-1.48 3-2.42V6c0-.94-1.05-1.9-3-2.42C14.75 3.15 13.5 3 12 3s-2.75.15-4 .52C6.05 4.1 5 5.06 5 6v12c0 .94 1.05 1.9 3 2.42 1.25.37 2.5.52 4 .52Z"/><path d="M12 3a4 4 0 0 0 4-4"/><path d="M8 3a4 4 0 0 1 4-4"/></svg>`,
    clock:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    sun:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
    flame:  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    person: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/></svg>`,
  };

  // ─── Quiz-Fragen mit Kontext-Hinweisen ───────────────────────────────────────

  const QUESTIONS = [
    {
      id: 'ziel',
      icon: ICONS.target,
      question: 'Was ist dein wichtigstes Gesundheitsziel?',
      hint: 'Dein Ziel bestimmt, welche biologischen Prozesse wir priorisieren – nicht jede Intervention wirkt auf denselben Hebel.',
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
      hint: 'Schlechter Schlaf erhöht messbar den inflammatorischen Stress und beschleunigt biologisches Altern – auch ohne subjektives Krankheitsgefühl.',
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
      hint: 'Energieeinbrüche sind oft ein frühes Signal für sinkende NAD⁺-Spiegel oder mitochondriale Dysfunktion – beides verändert sich mit dem Alter.',
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
      hint: 'Kognitive Leistung ist einer der sensitivsten Frühindikatoren für zelluläre Gesundheit – Brain Fog ist selten zufällig.',
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
      hint: 'Ernährungsqualität beeinflusst die epigenetische Uhr direkt – schlechte Ernährung beschleunigt biologisches Altern nachweislich um mehrere Jahre.',
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
      hint: 'Chronischer Stress senkt NAD⁺-Spiegel, stört den Schlafzyklus und beeinträchtigt die Zellreparatur – ein unterschätzter Treiber biologischen Alterns.',
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
      lifestyle: [
        { icon: ICONS.clock, tip: 'Mahlzeiten auf ein 8–10-Stunden-Fenster begrenzen (Time-Restricted Eating stärkt die mitochondriale Funktion nachweislich).' },
        { icon: ICONS.run,   tip: '3× wöchentlich 30 Min. moderate Ausdauerbelastung – das erhöht den NAD⁺-Spiegel auf natürlichem Weg.' },
        { icon: ICONS.sun,   tip: 'Kaffee erst 90 Minuten nach dem Aufwachen – vermeidet den Cortisol-Spike und stabilisiert die Energie über den Tag.' },
        { icon: ICONS.apple, tip: 'Proteinzufuhr auf mindestens 1,6 g pro kg Körpergewicht optimieren – wichtig für Mitochondrien und Muskelerhalt.' },
      ],
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
      lifestyle: [
        { icon: ICONS.run,    tip: 'Zone-2-Training 3× wöchentlich (leicht erhöhte Herzfrequenz, Gespräch möglich) – fördert BDNF und Neuroplastizität.' },
        { icon: ICONS.moon,   tip: 'Bildschirme ab 21 Uhr auf Nachtmodus oder weglegen – Blaulicht verzögert die Melatonin-Ausschüttung und verschlechtert die Schlafqualität.' },
        { icon: ICONS.apple,  tip: 'Omega-3-reiche Lebensmittel täglich: fetter Fisch, Walnüsse, Leinsamen – direkte Nahrung für neuronale Membranen.' },
        { icon: ICONS.wind,   tip: '10 Minuten strukturierte Atemübungen täglich reduzieren die präfrontale Cortex-Belastung messbar.' },
      ],
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
      lifestyle: [
        { icon: ICONS.clock,  tip: 'Feste Schlaf- und Aufwachzeiten – auch am Wochenende. Der zirkadiane Rhythmus braucht Verlässlichkeit als Anker.' },
        { icon: ICONS.apple,  tip: 'Letzte Mahlzeit mindestens 3 Stunden vor dem Schlafen – reduziert die nächtliche Verdauungsbelastung erheblich.' },
        { icon: ICONS.flame,  tip: 'Schlafzimmer auf 16–18°C kühlen – die Absenkung der Kernkörpertemperatur ist ein zentraler Auslöser für Tiefschlaf.' },
        { icon: ICONS.sun,    tip: '20 Minuten natürliches Tageslicht morgens regulieren den Melatonin-Zyklus und verbessern die Schlafqualität abends.' },
      ],
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
      lifestyle: [
        { icon: ICONS.clock,  tip: 'Intervallfasten (16:8 oder 5:2) aktiviert Autophagie – den zelleigenen Reinigungsprozess, der für biologisches Altern entscheidend ist.' },
        { icon: ICONS.flame,  tip: 'Sauna 2–3× wöchentlich (wenn möglich): Hitzeschockproteine verbessern die zelluläre Stressresistenz nachweislich.' },
        { icon: ICONS.run,    tip: 'Regelmäßiges Krafttraining erhält Muskelmasse – einer der stärksten unabhängigen Prädiktoren für Langlebigkeit.' },
        { icon: ICONS.apple,  tip: 'Antientzündliche Ernährung: Kurkuma, Beeren, Kreuzblütler, Olivenöl – senkt systemische Inflammation als Haupttreiber des Alterns.' },
      ],
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
          ${q.answers.map((a, i) => `
            <li class="lt-quiz__answer${answers[index] && answers[index].answerIndex === i ? ' lt-quiz__answer--selected' : ''}"
                role="button" tabindex="0" data-index="${i}"
                aria-pressed="${answers[index] && answers[index].answerIndex === i ? 'true' : 'false'}">
              <span class="lt-quiz__answer-check" aria-hidden="true"></span>
              <span class="lt-quiz__answer-text">${escapeHtml(a.text)}</span>
            </li>
          `).join('')}
        </ul>
        ${q.hint ? `<p class="lt-quiz__question-hint">${escapeHtml(q.hint)}</p>` : ''}
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
          ${renderPrimaryCard(products[profile.primary.key], profile.primary.reason)}
        </div>

        <div class="lt-quiz__secondary-section">
          <p class="lt-quiz__secondary-label">Ergänzt deinen Plan</p>
          <div class="lt-quiz__secondary-grid">
            ${renderSecondaryCard(products[profile.secondary[0]])}
            ${renderSecondaryCard(products[profile.secondary[1]])}
          </div>
        </div>

        ${renderLifestyleSection(profile)}

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
        ${product.image ? `
          <div class="lt-quiz__product-primary-image-wrap">
            <img src="${product.image}" alt="${escapeHtml(product.title)}" class="lt-quiz__product-primary-image" loading="lazy">
          </div>` : ''}
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
        ${product.image ? `
          <div class="lt-quiz__product-secondary-image-wrap">
            <img src="${product.image}" alt="${escapeHtml(product.title)}" class="lt-quiz__product-secondary-image" loading="lazy">
          </div>` : ''}
        <div class="lt-quiz__product-secondary-body">
          <h5 class="lt-quiz__product-secondary-title">${escapeHtml(product.title)}</h5>
          ${product.price ? `<p class="lt-quiz__product-secondary-price">${escapeHtml(product.price)}</p>` : ''}
        </div>
      </a>
    `;
  }

  function renderLifestyleSection(profile) {
    const tips = profile.lifestyle || [];
    if (!tips.length) return '';

    return `
      <div class="lt-quiz__lifestyle-section">
        <div class="lt-quiz__lifestyle-header">
          <p class="lt-quiz__lifestyle-label">Lebensstil-Empfehlungen</p>
          <p class="lt-quiz__lifestyle-sub">Was du sofort umsetzen kannst – ohne Produkte.</p>
        </div>
        <ul class="lt-quiz__lifestyle-list" role="list">
          ${tips.map(t => `
            <li class="lt-quiz__lifestyle-item">
              <span class="lt-quiz__lifestyle-icon" aria-hidden="true">${t.icon}</span>
              <span class="lt-quiz__lifestyle-tip">${escapeHtml(t.tip)}</span>
            </li>
          `).join('')}
        </ul>
        <p class="lt-quiz__lifestyle-dna-note">
          ${ICONS.dna}
          Dein AGE &amp; DNA-Test liefert dir eine noch präzisere Auswertung – auf Basis deiner individuellen Genetik und epigenetischen Uhr.
        </p>
      </div>
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
