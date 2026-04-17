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

  // ─── SVG Icon Library ───────────────────────────────────────────────────────

  const ICONS = {
    target: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M218.26 84.89a100.16 100.16 0 1 1-22.44-30.37l25.35-25.35a4 4 0 1 1 5.66 5.66l-96 96a4 4 0 0 1-5.66-5.66l31-31a44 44 0 1 0 15.78 31.3a4 4 0 0 1 8-.46a52 52 0 1 1-18.1-36.51l28.34-28.33A92 92 0 0 0 63 193.05A92 92 0 0 0 211 88.33a4 4 0 1 1 7.22-3.44Z"/></svg>`,
    moon:   `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M230.72 145.06a4 4 0 0 0-4-1A92.08 92.08 0 0 1 111.94 29.27a4 4 0 0 0-5-5a100.78 100.78 0 0 0-50.86 35.61a100 100 0 0 0 140 140a100.78 100.78 0 0 0 35.59-50.87a4 4 0 0 0-.95-3.95m-39.42 48.47A92 92 0 0 1 62.47 64.7a93 93 0 0 1 39.88-30.35a100.09 100.09 0 0 0 119.3 119.3a93 93 0 0 1-30.35 39.88"/></svg>`,
    zap:    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    battery:`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M200 60H32a20 20 0 0 0-20 20v96a20 20 0 0 0 20 20h168a20 20 0 0 0 20-20V80a20 20 0 0 0-20-20m12 116a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12V80a12 12 0 0 1 12-12h168a12 12 0 0 1 12 12Zm40-80v64a4 4 0 0 1-8 0V96a4 4 0 0 1 8 0m-116.6 29.9a4 4 0 0 1 .18 3.89l-16 32A4 4 0 0 1 116 164a4.1 4.1 0 0 1-1.79-.42a4 4 0 0 1-1.79-5.37L125.53 132H100a4 4 0 0 1-3.58-5.79l16-32a4 4 0 1 1 7.16 3.58L106.47 124H132a4 4 0 0 1 3.4 1.9"/></svg>`,
    brain:  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M244 124a52.1 52.1 0 0 0-32-48v-4a44 44 0 0 0-84-18.3A44 44 0 0 0 44 72v4a52 52 0 0 0 0 96v4a44 44 0 0 0 84 18.3a44 44 0 0 0 84-18.3v-4a52.07 52.07 0 0 0 32-48M88 212a36 36 0 0 1-36-36v-1.41A52 52 0 0 0 64 176h8a4 4 0 0 0 0-8h-8a44 44 0 0 1-14.67-85.5A4 4 0 0 0 52 78.73V72a36 36 0 0 1 72 0v78.75A44 44 0 0 0 88 132a4 4 0 0 0 0 8a36 36 0 0 1 0 72m104-44h-8a4 4 0 0 0 0 8h8a52 52 0 0 0 12-1.41V176a36 36 0 1 1-36-36a4 4 0 0 0 0-8a44 44 0 0 0-36 18.75V72a36 36 0 0 1 72 0v6.73a4 4 0 0 0 2.67 3.77A44 44 0 0 1 192 168m12-56a4 4 0 0 1-4 4h-4a32 32 0 0 1-32-32v-4a4 4 0 0 1 8 0v4a24 24 0 0 0 24 24h4a4 4 0 0 1 4 4M92 84a32 32 0 0 1-32 32h-4a4 4 0 0 1 0-8h4a24 24 0 0 0 24-24v-4a4 4 0 0 1 8 0Z"/></svg>`,
    leaf:   `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 22 16 8"/><path d="M3.47 12.53A5 5 0 0 0 5 22a5 5 0 0 0 5-5 5 5 0 0 0-5.5-4.97"/><path d="M21 3a8 8 0 0 0-8 8 5 5 0 0 0 5 5 8 8 0 0 0 8-8 5 5 0 0 0-5-5z"/></svg>`,
    gauge:  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M204.23 75.5A107.37 107.37 0 0 0 127.62 44C68.28 44.21 20 93.16 20 153.13V176a12 12 0 0 0 12 12h192a12 12 0 0 0 12-12v-24a107.25 107.25 0 0 0-31.77-76.5M228 176a4 4 0 0 1-4 4H111.85l59.38-81.65a4 4 0 1 0-6.46-4.7L102 180H32a4 4 0 0 1-4-4v-22.87a103 103 0 0 1 .84-13.13H56a4 4 0 0 0 0-8H30.21C39.59 87.66 77.84 53.93 124 52.09V80a4 4 0 0 0 8 0V52.08A100.08 100.08 0 0 1 226 132h-26a4 4 0 0 0 0 8h27.29a102 102 0 0 1 .71 12Z"/></svg>`,
    forkKnife:`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M76 88V40a4 4 0 0 1 8 0v48a4 4 0 0 1-8 0m136-48v184a4 4 0 0 1-8 0v-52h-52a4 4 0 0 1-4-4a264.3 264.3 0 0 1 7.11-55.94c9.47-39.22 27.21-65.41 51.31-75.74A4 4 0 0 1 212 40m-8 6.46c-41.75 23.87-47.19 99.29-47.9 117.54H204Zm-88-7.12a4 4 0 0 0-7.9 1.32l8 47.66a36 36 0 0 1-72 0l8-47.66a4 4 0 0 0-7.9-1.32l-8 48a5 5 0 0 0-.2.66a44.06 44.06 0 0 0 40 43.81V224a4 4 0 0 0 8 0v-92.19A44.06 44.06 0 0 0 124 88a5 5 0 0 0 0-.66Z"/></svg>`,
    lightbulb:`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M172 232a4 4 0 0 1-4 4H88a4 4 0 0 1 0-8h80a4 4 0 0 1 4 4m40-128a83.59 83.59 0 0 1-32.11 66.06A20.2 20.2 0 0 0 172 186v6a12 12 0 0 1-12 12H96a12 12 0 0 1-12-12v-6a20 20 0 0 0-7.76-15.81A83.58 83.58 0 0 1 44 104.47C43.75 59 80.52 21.09 126 20a84 84 0 0 1 86 84m-8 0a76 76 0 0 0-77.83-76C85 29 51.77 63.27 52 104.43a75.62 75.62 0 0 0 29.17 59.43A28 28 0 0 1 92 186v6a4 4 0 0 0 4 4h64a4 4 0 0 0 4-4v-6a28.14 28.14 0 0 1 10.94-22.2A75.62 75.62 0 0 0 204 104m-67.34-51.94a4 4 0 0 0-1.32 7.88C153.53 63 169 78.45 172.06 96.67A4 4 0 0 0 176 100a4 4 0 0 0 .67-.06a4 4 0 0 0 3.27-4.61a53.51 53.51 0 0 0-43.28-43.27"/></svg>`,
    personStep:`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21a5 5 0 0 0-10 0"/><circle cx="12" cy="9" r="3.5"/></svg>`,
    clockStep:`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8.5v4l2.5 1.5"/></svg>`,
    runStep: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="15.5" cy="4.5" r="1.5"/><path d="M7 18.5l2.5-3 2.5-1.5 2.5 2 1.5 4"/><path d="M9.5 15.5l-2-4L11 9l2.5 2"/><path d="M13 11l2 2.5 3 .5"/><path d="M8 21l2-2.5"/></svg>`,
    scope:  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`,
    dna:    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m17 6-2.5-2.5"/><path d="m14 8-1-1"/><path d="m7 18 2.5 2.5"/><path d="m3.5 14.5.5.5"/><path d="m10 16 1 1"/><path d="m17 7 3-3"/><path d="m14 14 3 3"/></svg>`,
    wind:   `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h10a2.5 2.5 0 1 0-2.5-2.5"/><path d="M3 14h14a3 3 0 1 1-3 3"/><path d="M5 18h8"/></svg>`,
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
      type: 'cards',
      stepLabel: 'Ziel',
      icon: ICONS.target,
      question: 'Was ist aktuell dein wichtigstes Gesundheitsziel?',
      hint: 'Je nach Ziel priorisieren wir den Hebel, der dein biologisches Alter am ehesten beeinflussen dürfte, und justieren erst danach die Routine im Detail.',
      answers: [
        { text: 'Mehr Energie im Alltag', icon: ICONS.battery, scores: { energie: 4 } },
        { text: 'Besser schlafen & erholen', icon: ICONS.moon, scores: { schlaf: 4 } },
        { text: 'Mehr Fokus & mentale Klarheit', icon: ICONS.brain, scores: { fokus: 4 } },
        { text: 'Gesund altern & vorbeugen', icon: ICONS.scope, scores: { langlebigkeit: 4 } },
      ],
    },
    {
      id: 'zustand',
      type: 'scale',
      stepLabel: 'Zustand',
      icon: ICONS.personStep,
      question: 'Wie würdest du deinen aktuellen Gesundheitszustand insgesamt beschreiben?',
      hint: 'Ein instabiler Alltag zeigt oft, dass Belastung und Regeneration bereits auf Systeme wirken, die sich später auch im biologischen Alter und in epigenetischen Mustern widerspiegeln.',
      minLabel: 'Ich funktioniere nur',
      maxLabel: 'Ich fühle mich sehr stabil',
      options: [
        { label: 'Ich funktioniere gerade nur', shortLabel: 'nur funktionieren', scores: { energie: 3, schlaf: 1 } },
        { label: 'Eher instabil und oft ausgelaugt', shortLabel: 'eher instabil', scores: { energie: 2, schlaf: 1, fokus: 1 } },
        { label: 'Durchwachsen, mal so mal so', shortLabel: 'durchwachsen', scores: { energie: 1, fokus: 1 } },
        { label: 'Meist stabil und belastbar', shortLabel: 'meist stabil', scores: { langlebigkeit: 1 } },
        { label: 'Sehr stabil und insgesamt gut aufgestellt', shortLabel: 'sehr stabil', scores: { langlebigkeit: 2 } },
      ],
    },
    {
      id: 'lebensphase',
      type: 'cards',
      stepLabel: 'Phase',
      icon: ICONS.clockStep,
      question: 'In welcher Lebensphase befindest du dich gerade?',
      hint: 'Mit der Lebensphase verändern sich NAD+-Bedarf, Regeneration und das Tempo epigenetischer Alterungsprozesse deutlich.',
      answers: [
        { text: 'Unter 30', scores: { energie: 1 } },
        { text: '30–39', scores: { energie: 1, fokus: 1 } },
        { text: '40–49', scores: { langlebigkeit: 1, fokus: 1 } },
        { text: '50+', scores: { langlebigkeit: 2, schlaf: 1 } },
      ],
    },
    {
      id: 'training',
      type: 'cards',
      stepLabel: 'Training',
      icon: ICONS.runStep,
      question: 'Wie regelmäßig trainierst du aktuell?',
      hint: 'Regelmäßige Bewegung ist einer der stärksten Hebel für metabolische Gesundheit und Marker, die mit epigenetischem Altern zusammenhängen.',
      answers: [
        { text: 'Kaum oder unregelmäßig', scores: { energie: 2 } },
        { text: '1–2x pro Woche', scores: { energie: 1, schlaf: 1 } },
        { text: '3–4x pro Woche', scores: { fokus: 1, langlebigkeit: 1 } },
        { text: 'Sehr regelmäßig & strukturiert', scores: { langlebigkeit: 2, fokus: 1 } },
      ],
    },
    {
      id: 'ernaehrung',
      type: 'cards',
      stepLabel: 'Ernährung',
      icon: ICONS.forkKnife,
      question: 'Wie würdest du deine Ernährung im Alltag beschreiben?',
      hint: 'Ernährungsqualität beeinflusst Entzündung, Blutzuckerregulation und epigenetische Marker, die eng mit biologischem Alter verbunden sind.',
      answers: [
        { text: 'Eher unregelmäßig und spontan', scores: { energie: 2, fokus: 1 } },
        { text: 'Okay, aber mit spürbaren Lücken', scores: { energie: 1, fokus: 1 } },
        { text: 'Überwiegend bewusst und ausgewogen', scores: { langlebigkeit: 1, energie: 1 } },
        { text: 'Sehr strukturiert und hochwertig', scores: { langlebigkeit: 2 } },
      ],
    },
    {
      id: 'stress',
      type: 'scale',
      stepLabel: 'Stress',
      icon: ICONS.gauge,
      question: 'Wie hoch ist dein Stresslevel im Alltag?',
      hint: 'Chronischer Stress erhöht Zellbelastung, stört Regeneration und ist in Studien mit beschleunigter epigenetischer Alterung assoziiert.',
      minLabel: 'Sehr niedrig',
      maxLabel: 'Sehr hoch',
      options: [
        { label: 'Sehr niedrig und gut reguliert', shortLabel: 'sehr niedrig', scores: { langlebigkeit: 1 } },
        { label: 'Eher niedrig', shortLabel: 'eher niedrig', scores: { energie: 1 } },
        { label: 'Mittel', shortLabel: 'mittel', scores: { fokus: 1 } },
        { label: 'Eher hoch', shortLabel: 'eher hoch', scores: { schlaf: 2, fokus: 1 } },
        { label: 'Sehr hoch und fast dauerhaft', shortLabel: 'sehr hoch', scores: { schlaf: 3, fokus: 1 } },
      ],
    },
    {
      id: 'schlaf',
      type: 'scale',
      stepLabel: 'Schlaf',
      icon: ICONS.moon,
      question: 'Wie erholsam ist dein Schlaf aktuell?',
      hint: 'Schlafqualität beeinflusst Zellreparatur, Hormonbalance und ist einer der konsistentesten Faktoren im Zusammenhang mit biologischem und epigenetischem Altern.',
      minLabel: 'Sehr schlecht',
      maxLabel: 'Sehr erholsam',
      options: [
        { label: 'Sehr schlecht und kaum erholsam', shortLabel: 'sehr schlecht', scores: { schlaf: 3, energie: 1 } },
        { label: 'Eher schlecht', shortLabel: 'eher schlecht', scores: { schlaf: 2, energie: 1 } },
        { label: 'Mittelmäßig', shortLabel: 'mittel', scores: { schlaf: 1 } },
        { label: 'Eher gut', shortLabel: 'eher gut', scores: { energie: 1, langlebigkeit: 1 } },
        { label: 'Sehr erholsam und stabil', shortLabel: 'sehr erholsam', scores: { langlebigkeit: 2 } },
      ],
    },
    {
      id: 'kognition',
      type: 'scale',
      stepLabel: 'Kognition',
      icon: ICONS.brain,
      question: 'Wie klar und fokussiert fühlst du dich mental?',
      hint: 'Mentale Klarheit reagiert früh auf Schlaf, Stress und Entzündung und ist oft ein spürbarer Frühindikator dafür, wie gut dein System insgesamt reguliert ist.',
      minLabel: 'Starker Brain Fog',
      maxLabel: 'Sehr klar',
      options: [
        { label: 'Starker Brain Fog', shortLabel: 'Brain Fog', scores: { fokus: 3, energie: 1 } },
        { label: 'Oft unklar und schwer fokussiert', shortLabel: 'oft unklar', scores: { fokus: 2, energie: 1 } },
        { label: 'Teils klar, teils zerstreut', shortLabel: 'teils klar', scores: { fokus: 1 } },
        { label: 'Meist klar und fokussiert', shortLabel: 'meist klar', scores: { fokus: 1, langlebigkeit: 1 } },
        { label: 'Sehr klar und konstant leistungsfähig', shortLabel: 'sehr klar', scores: { langlebigkeit: 2 } },
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
  let isTransitioning = false;

  // ─── DOM-Referenzen ──────────────────────────────────────────────────────────

  let quizEl, stepsEl, resultsEl, progressEl, progressBarEl, milestonesEl;

  // ─── Init ────────────────────────────────────────────────────────────────────

  function init() {
    quizEl = document.getElementById('lt-longevity-quiz');
    if (!quizEl) return;

    stepsEl = document.getElementById('lt-quiz-steps');
    resultsEl = document.getElementById('lt-quiz-results');
    progressEl = quizEl.querySelector('.lt-quiz__progress');
    progressBarEl = document.getElementById('lt-quiz-progress-bar');
    milestonesEl = document.getElementById('lt-quiz-milestones');
    if (progressEl) {
      progressEl.style.setProperty('--lt-quiz-step-count', String(QUESTIONS.length));
    }

    renderStep(0);
    updateProgress();
  }

  // ─── Rendering ───────────────────────────────────────────────────────────────

  function renderStep(index) {
    const q = QUESTIONS[index];
    let selectedIndex = answers[index] ? answers[index].answerIndex : null;

    if (q.type === 'scale' && selectedIndex == null) {
      selectedIndex = getDefaultScaleIndex(q);
    }

    const isAnswered = selectedIndex != null;

    stepsEl.innerHTML = `
      <div class="lt-quiz__step" data-step="${index}">
        <h3 class="lt-quiz__question">${escapeHtml(q.question)}</h3>
        ${renderQuestionInput(q, selectedIndex)}
        ${renderStepNavigation(index, Boolean(answers[index]), q.type)}
        ${q.hint ? `
          <div class="lt-quiz__question-note" role="note">
            ${renderQuestionNote(q.hint)}
          </div>
        ` : ''}
      </div>
    `;

    stepsEl.querySelectorAll('[data-quiz-option]').forEach((el) => {
      el.addEventListener('click', () => selectAnswer(index, parseInt(el.dataset.index, 10)));
    });

    if (q.type === 'scale') {
      const rangeEl = stepsEl.querySelector('.lt-quiz__scale-range');
      if (rangeEl) {
        updateScalePreview(index, parseInt(rangeEl.value, 10), selectedIndex != null);
        rangeEl.addEventListener('input', () => {
          selectAnswer(index, parseInt(rangeEl.value, 10), { isInteractive: true });
        });
      }
    }

    stepsEl.querySelector('[data-quiz-prev]')?.addEventListener('click', handlePrevious);
    stepsEl.querySelector('[data-quiz-next]')?.addEventListener('click', handleNext);
    stepsEl.querySelector('[data-quiz-note-toggle]')?.addEventListener('click', handleNoteToggle);

    isTransitioning = false;
  }

  function renderQuestionInput(question, selectedIndex) {
    if (question.type === 'scale') {
      return renderScale(question, selectedIndex);
    }

    return `
      <ul class="lt-quiz__answers" role="list">
        ${question.answers.map((answer, index) => `
          <li class="lt-quiz__answer-item">
            <button
              type="button"
              class="lt-quiz__answer${selectedIndex === index ? ' lt-quiz__answer--selected' : ''}"
              data-quiz-option="true"
              data-index="${index}"
              aria-pressed="${selectedIndex === index ? 'true' : 'false'}"
            >
              ${answer.icon
                ? `<span class="lt-quiz__answer-visual" aria-hidden="true"><span class="lt-quiz__answer-icon">${answer.icon}</span></span>`
                : ''}
              <span class="lt-quiz__answer-body">
                <span class="lt-quiz__answer-text">${escapeHtml(answer.text)}</span>
              </span>
            </button>
          </li>
        `).join('')}
      </ul>
    `;
  }

  function renderQuestionNote(hint) {
    const noteId = `lt-quiz-note-${currentStep}`;

    return `
      <button
        type="button"
        class="lt-quiz__question-note-toggle"
        data-quiz-note-toggle="true"
        aria-expanded="false"
        aria-controls="${noteId}"
      >
        <span class="lt-quiz__question-note-name">Warum fragen wir das?</span>
        <span class="lt-quiz__question-note-caret" aria-hidden="true">+</span>
      </button>
      <div class="lt-quiz__question-note-panel" id="${noteId}" hidden>
        <p class="lt-quiz__question-hint">${escapeHtml(hint)}</p>
      </div>
    `;
  }

  function renderStepNavigation(index, isAnswered, questionType) {
    const isLastStep = index === QUESTIONS.length - 1;
    const showBack = index > 0;

    if (questionType !== 'scale') {
      if (!showBack) return '';

      return `
        <div class="lt-quiz__step-actions lt-quiz__step-actions--cards">
          <button
            type="button"
            class="lt-quiz__step-link"
            data-quiz-prev="true"
          >
            &lt; Zurück
          </button>
        </div>
      `;
    }

    return `
      <div class="lt-quiz__step-actions">
        <button
          type="button"
          class="lt-quiz__step-link"
          data-quiz-prev="true"
          ${index === 0 ? 'disabled aria-disabled="true"' : ''}
        >
          &lt; Zurück
        </button>
        <button
          type="button"
          class="lt-quiz__step-link lt-quiz__step-link--next${isAnswered ? ' lt-quiz__step-link--next-visible' : ''}"
          data-quiz-next="true"
          ${isAnswered ? '' : 'disabled aria-disabled="true" hidden'}
        >
          ${isLastStep ? 'Ergebnis >' : 'Weiter >'}
        </button>
      </div>
    `;
  }

  function renderScale(question, selectedIndex) {
    const previewIndex = selectedIndex != null ? selectedIndex : getDefaultScaleIndex(question);
    const previewOption = question.options[previewIndex];
    const progress = getScaleProgress(previewIndex, question.options.length);

    return `
      <div class="lt-quiz__scale-wrap${selectedIndex != null ? ' lt-quiz__scale-wrap--active' : ''}" data-scale-wrap="true">
        <div class="lt-quiz__scale-shell">
          <div class="lt-quiz__scale-range-wrap" style="--lt-quiz-scale-progress: ${progress}%;">
            <input
              class="lt-quiz__scale-range"
              type="range"
              min="0"
              max="${question.options.length - 1}"
              step="1"
              value="${previewIndex}"
              aria-label="${escapeHtml(question.question)}"
              aria-valuemin="0"
              aria-valuemax="${question.options.length - 1}"
              aria-valuenow="${previewIndex}"
              aria-valuetext="${escapeHtml(previewOption.label)}"
            >
          </div>
        </div>
        <div class="lt-quiz__scale-ends" aria-hidden="true">
          <span class="lt-quiz__scale-end lt-quiz__scale-end--min">${escapeHtml(question.minLabel)}</span>
          <span class="lt-quiz__scale-end lt-quiz__scale-end--max">${escapeHtml(question.maxLabel)}</span>
        </div>
        <p class="lt-quiz__scale-current" aria-live="polite">
          <span class="lt-quiz__scale-current-prefix">Deine Einschätzung</span>
          <span class="lt-quiz__scale-current-value">${escapeHtml(previewOption.label)}</span>
        </p>
      </div>
    `;
  }

  function getAnswerDefinition(question, answerIndex) {
    if (!question) return null;
    if (question.type === 'scale') return question.options[answerIndex] || null;
    return question.answers[answerIndex] || null;
  }

  function getDefaultScaleIndex(question) {
    return Math.floor((question.options.length - 1) / 2);
  }

  function getScaleProgress(answerIndex, optionCount) {
    const maxIndex = Math.max(optionCount - 1, 1);
    return Math.round((answerIndex / maxIndex) * 100);
  }

  function updateScalePreview(questionIndex, answerIndex, isInteractive) {
    const question = QUESTIONS[questionIndex];
    const selectedOption = getAnswerDefinition(question, answerIndex);
    const wrap = stepsEl.querySelector('[data-scale-wrap]');
    const currentValueEl = stepsEl.querySelector('.lt-quiz__scale-current-value');
    const currentPrefixEl = stepsEl.querySelector('.lt-quiz__scale-current-prefix');
    const rangeEl = stepsEl.querySelector('.lt-quiz__scale-range');
    const rangeWrapEl = stepsEl.querySelector('.lt-quiz__scale-range-wrap');
    const progress = getScaleProgress(answerIndex, question.options.length);

    if (currentValueEl) currentValueEl.textContent = selectedOption ? selectedOption.label : '';
    if (currentPrefixEl) currentPrefixEl.textContent = 'Deine Einschätzung';
    if (rangeEl) {
      rangeEl.value = String(answerIndex);
      rangeEl.setAttribute('aria-valuenow', String(answerIndex));
      rangeEl.setAttribute('aria-valuetext', selectedOption ? selectedOption.label : '');
    }
    if (rangeWrapEl) {
      rangeWrapEl.style.setProperty('--lt-quiz-scale-progress', `${progress}%`);
    }
    if (wrap) {
      wrap.classList.toggle('lt-quiz__scale-wrap--active', isInteractive);
    }

  }

  function updateStepNavigationState(questionIndex) {
    const nextButton = stepsEl.querySelector('[data-quiz-next]');
    if (!nextButton) return;

    const isAnswered = Boolean(answers[questionIndex]);
    nextButton.disabled = !isAnswered;
    nextButton.setAttribute('aria-disabled', String(!isAnswered));
    nextButton.hidden = !isAnswered;
    nextButton.classList.toggle('lt-quiz__step-link--next-visible', isAnswered);
  }

  function handleNoteToggle(event) {
    const toggle = event.currentTarget;
    const note = toggle.closest('.lt-quiz__question-note');
    const panel = note ? note.querySelector('.lt-quiz__question-note-panel') : null;
    const caret = toggle.querySelector('.lt-quiz__question-note-caret');
    if (!panel) return;

    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    panel.hidden = isExpanded;

    if (caret) {
      caret.textContent = isExpanded ? '+' : '−';
    }

    if (note) {
      note.classList.toggle('lt-quiz__question-note--open', !isExpanded);
    }
  }

  function reflectSelection(questionIndex, answerIndex) {
    const question = QUESTIONS[questionIndex];

    stepsEl.querySelectorAll('[data-quiz-option]').forEach((el) => {
      const isSelected = parseInt(el.dataset.index, 10) === answerIndex;

      if (el.classList.contains('lt-quiz__answer')) {
        el.classList.toggle('lt-quiz__answer--selected', isSelected);
        el.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }

    });

    if (question && question.type === 'scale') {
      updateScalePreview(questionIndex, answerIndex, true);
    }

    updateStepNavigationState(questionIndex);
  }

  function renderMilestones() {
    if (!milestonesEl) return;

    milestonesEl.innerHTML = QUESTIONS.map((question, index) => {
      let state = '';
      if (index < currentStep) state = ' lt-quiz__milestone--done';
      if (index === currentStep) state = ' lt-quiz__milestone--current';

      return `
        <li class="lt-quiz__milestone${state}" aria-label="Schritt ${index + 1}: ${escapeHtml(question.stepLabel)}">
          <span class="lt-quiz__milestone-dot" aria-hidden="true">${question.icon}</span>
          <span class="lt-quiz__milestone-label">${escapeHtml(question.stepLabel)}</span>
        </li>
      `;
    }).join('');
  }

  function renderResults(outcome) {
    const profile = PROFILES[outcome.profileKey];
    const products = window.LT_QUIZ_PRODUCTS || {};

    stepsEl.hidden = true;
    if (progressEl) progressEl.hidden = true;

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
          ${renderConfidenceNote(outcome)}
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
  }

  function renderConfidenceNote(outcome) {
    if (!outcome || outcome.confidence === 'high' || !outcome.secondaryKey) return '';

    const secondary = PROFILES[outcome.secondaryKey];
    if (!secondary) return '';

    const note = outcome.confidence === 'mixed'
      ? `Dein Profil ist gemischt: ${secondary.title} liegt fast gleichauf. Wir priorisieren deshalb den aktuell stärksten Hebel zuerst.`
      : `${secondary.title} bleibt als zweiter Hebel nah dran. Dein Plan startet mit dem Bereich, der jetzt den größten Unterschied machen dürfte.`;

    return `<p class="lt-quiz__profile-confidence">${escapeHtml(note)}</p>`;
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
        <div class="lt-quiz__lifestyle-dna-note">
          <span class="lt-quiz__lifestyle-dna-icon" aria-hidden="true">${ICONS.dna}</span>
          <div class="lt-quiz__lifestyle-dna-copy">
            <p class="lt-quiz__lifestyle-dna-text">Dein AGE &amp; DNA-Test liefert dir noch tiefere Einblicke – auf Basis deiner individuellen Genetik und epigenetischen Uhr.</p>
            <a href="/products/lifetime-age-dna">Mit dem AGE &amp; DNA-Test starten</a>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Logik ───────────────────────────────────────────────────────────────────

  function selectAnswer(questionIndex, answerIndex, options = {}) {
    if (isTransitioning) return;

    const question = QUESTIONS[questionIndex];
    const answer = getAnswerDefinition(question, answerIndex);
    if (!answer) return;

    answers[questionIndex] = { answerIndex, scores: answer.scores };
    reflectSelection(questionIndex, answerIndex, options.isInteractive);

    if (question.type === 'cards') {
      advanceFrom(questionIndex);
    }
  }

  function advanceFrom(questionIndex) {
    if (isTransitioning) return;

    isTransitioning = true;

    window.setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        currentStep = questionIndex + 1;
        updateProgress();
        renderStep(currentStep);
        return;
      }

      renderResults(calculateOutcome());
      isTransitioning = false;
    }, 180);
  }

  function handlePrevious() {
    if (isTransitioning || currentStep === 0) return;

    currentStep -= 1;
    updateProgress();
    renderStep(currentStep);
  }

  function handleNext() {
    if (isTransitioning || !answers[currentStep]) return;

    advanceFrom(currentStep);
  }

  function calculateOutcome() {
    const scores = { energie: 0, fokus: 0, schlaf: 0, langlebigkeit: 0 };
    answers.forEach((a) => {
      if (!a) return;
      Object.entries(a.scores).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
    });

    const rankedProfiles = Object.entries(scores).sort((left, right) => right[1] - left[1]);
    const [profileKey, topScore] = rankedProfiles[0];
    const [secondaryKey, secondScore] = rankedProfiles[1] || ['langlebigkeit', 0];
    const difference = topScore - secondScore;

    let confidence = 'high';
    if (topScore <= 4 || difference <= 1) {
      confidence = 'mixed';
    } else if (difference === 2) {
      confidence = 'medium';
    }

    return {
      profileKey,
      secondaryKey,
      confidence,
      scores,
    };
  }

  function updateProgress() {
    const maxStep = Math.max(QUESTIONS.length - 1, 1);
    const pct = Math.round((currentStep / maxStep) * 100);
    if (progressBarEl) progressBarEl.style.width = pct + '%';
    if (progressEl) {
      progressEl.setAttribute('aria-valuenow', String(pct));
      progressEl.setAttribute('aria-valuetext', `Frage ${currentStep + 1} von ${QUESTIONS.length}`);
    }
    renderMilestones();
  }

  function resetQuiz() {
    currentStep = 0;
    answers = [];
    isTransitioning = false;
    stepsEl.hidden = false;
    if (progressEl) progressEl.hidden = false;
    resultsEl.hidden = true;
    resultsEl.innerHTML = '';
    updateProgress();
    renderStep(0);
    quizEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
