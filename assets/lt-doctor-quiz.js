/**
 * LIFETIME — Ärzte-Quiz (B2B Partnerprogramm)
 * Spec: docs/lifetime-doctor-quiz-spec.md
 *
 * State: intro → q1 (specialty) → q2 (focus, max 2) → loading → result
 * Source-of-Truth: lifetime-produktdetails/produktdetails-age-dna-test.md
 * Alle Report-Namen sind 1:1 aus der Produktspec; nichts erfunden.
 */
(function () {
  'use strict';

  // ── Konstanten ─────────────────────────────────────────────────────
  const STEPS = ['intro', 'q1', 'q2', 'loading', 'result'];
  const QUESTION_STEPS = ['q1', 'q2'];
  const FULLSCREEN_STEPS = ['q1', 'q2', 'loading', 'result'];
  const AUTO_ADVANCE_MS = 300;
  const LOADING_DURATION_MS = 2400;

  // ── DNA-Kategorien (16, gemäß Produktspec) ────────────────────────
  const DNA_CATEGORIES = [
    { id: 'gesunde-alterung',        label: 'Gesunde Alterung',       tooltip: 'Langlebigkeit · Stoffwechsel & Alter · Muskelabbau · Kognition · Knochen & Gelenke · Zellstress & Herz · Vitamin-/Mineralbedarf' },
    { id: 'supplements',             label: 'Supplements',            tooltip: 'Kreatin · Ashwagandha · Curcumin · Whey-Verwertung · Beta-Alanine · EAA · HMB/Leucin · Taurin · Glucosamin/Chondroitin · NMN' },
    { id: 'vitamine',                label: 'Vitamine',               tooltip: 'Vitamin D · Vitamin B12 · Vitamin A · Magnesium · Omega-3 · Selen · Calcium · B-Vitamine · Cholin/Betain' },
    { id: 'sensitivitaeten',         label: 'Sensitivitäten',         tooltip: 'Gluten · Laktose · Zucker/Fruktose · Fettverträglichkeit · Heuschnupfen' },
    { id: 'stoffwechsel',            label: 'Stoffwechsel',           tooltip: 'Adipositas-Risiko · Typ-2-Diabetes · Salz & Blutdruck · Knochendichte · Infektanfälligkeit · Mundgesundheit · Koffein & Fokus · Testosteron-Bezug' },
    { id: 'fitness',                 label: 'Fitness',                tooltip: 'Muskelkraft · Muskelausdauer · VO₂max · Anaerobe Schwelle · Erholungsfähigkeit · Lean Mass · Myostatin · Training fasted/fed' },
    { id: 'verletzung-regeneration', label: 'Verletzung & Regeneration', tooltip: 'LWS-Bandscheiben · Knochen-/Gelenkstabilität · Achillessehne · Arthrose-Bezug · Reha-/Erholungstyp' },
    { id: 'mental-health',           label: 'Mental Health',          tooltip: 'Aufmerksamkeit · Stress-Resilienz · Gedächtnis · Warrior/Worrier-Profil · Koffein & Fokus' },
    { id: 'psychologisch',           label: 'Psychologisch',          tooltip: 'COMT · MAOA · OXTR · Belohnungssensitivität · Emotionsregulation · Brain-Fog-Bezug' },
    { id: 'schlaf',                  label: 'Schlaf',                 tooltip: 'Schlafdauer · Schlafqualität · Tiefschlaf-Tendenz · Chronotyp · Recovery-Bezug' },
    { id: 'stress',                  label: 'Stress',                 tooltip: 'Stress & Gedächtnis · Stress & Druck · Stress & Erholung · Stress & Schlaf · Stress & Herz · Stressbewältigung' },
    { id: 'herz',                    label: 'Herz',                   tooltip: 'Cholesterin · Herzkrankheits-Risiko · Vorhofflimmern · Bluthochdruck' },
    { id: 'atemwege',                label: 'Atemwege',               tooltip: 'Asthma-Bezug · Allergieneigung · Atemwegsinfekte · Umwelttoxine · Lungenfunktion' },
    { id: 'augen',                   label: 'Augen',                  tooltip: 'Makuladegeneration · Katarakt · Offenwinkelglaukom · Altersbedingte Sehverschlechterung · B-Vitamine & Augen' },
    { id: 'haare',                   label: 'Haare',                  tooltip: 'Androgenetischer Haarausfall · Alopecia-Bezug · Frühes Ergrauen · Trockenes Haar · Pigment-/Wachstums-Bezug' },
    { id: 'niere',                   label: 'Niere',                  tooltip: 'Entgiftung/Detox-Bezug · Nierenfunktion · Filtration/Flüssigkeit · Nierensteine · Stress & Niere' },
  ];

  // ── Epigenetik-Bereiche (6, gemäß Produktspec) ────────────────────
  const EPIGENETICS = [
    { id: 'koerperalter',       label: 'Körperalter',       tooltip: 'Höralter · Gedächtnisalter · Sehalter' },
    { id: 'biologisches-alter', label: 'Biologisches Alter', tooltip: 'MethylPace-Score' },
    { id: 'epivitality',        label: 'EpiVitality',       tooltip: 'Hypomethylierung entzündungsassoziierter CpG-Stellen' },
    { id: 'immunscore',         label: 'Immunscore',        tooltip: 'Methylierung immunrelevanter Gene · Immunzell-Regulation · Immunologisches Gedächtnis' },
    { id: 'entzuendung',        label: 'Entzündung',        tooltip: 'Pro-Entzündungs-Score · Anti-Entzündungs-Score · Gesamt-Entzündungs-Score' },
    { id: 'muskelschwund',      label: 'Muskelschwund',     tooltip: 'Muskelalterung' },
  ];

  // ── Fokus-Optionen (für UTM und Modifier) ─────────────────────────
  const FOCUS_LABELS = {
    praevention:   'Prävention & Healthspan',
    veranlagung:   'Familiäre Veranlagung',
    sensitivitaet: 'Verträglichkeiten & Nährstoffe',
    lifestyle:     'Lifestyle-Beratung',
  };

  const FOCUS_MODIFIERS = {
    praevention:   { boostCategories: ['gesunde-alterung'],                          boostEpigenetics: ['biologisches-alter', 'epivitality'] },
    veranlagung:   { boostCategories: ['herz', 'stoffwechsel'],                      boostEpigenetics: ['entzuendung'] },
    sensitivitaet: { boostCategories: ['sensitivitaeten', 'vitamine'],               boostEpigenetics: [] },
    lifestyle:     { boostCategories: ['stoffwechsel', 'fitness', 'supplements', 'vitamine'], boostEpigenetics: [] },
  };

  // ── Fachrichtungs-Mapping (Source: docs/lifetime-doctor-quiz-spec.md) ─
  const SPECIALTIES = {
    kardio: {
      id: 'kardio',
      label: 'Kardiologie',
      headline: 'Für die kardiologische Praxis besonders relevant',
      sub: 'Veranlagung für Herz-Kreislauf-Belastbarkeit, Blutdruck-Regulation und Lipid-Stoffwechsel — plus aktueller Entzündungs- und Alterungs-Status epigenetisch. Grundlage für individuelle Lebensstil-Empfehlungen, nicht für Therapie.',
      primary: ['herz', 'stoffwechsel'],
      secondary: ['vitamine', 'gesunde-alterung'],
      epi: ['biologisches-alter', 'entzuendung', 'epivitality'],
      reports: [
        { name: 'Cholesterin',           category: 'herz',              genes: ['APOE', 'CETP', 'LDLR', 'ABCG5', 'ABCG8'], note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für individualisierte Ernährungs- und Bewegungs-Empfehlungen.' },
        { name: 'Herzkrankheits-Risiko', category: 'herz',              genes: ['CDKN2B-AS1 (9p21)', 'APOE'], note: 'Polygene Veranlagung für Herz-Kreislauf-Belastbarkeit — auch ohne klassische Risikofaktoren sichtbar, geeignet für frühe präventive Beratung.' },
        { name: 'Bluthochdruck',         category: 'herz',              genes: ['AGT', 'ACE', 'ADD1', 'ATP2B1'], note: 'Veranlagung der individuellen Blutdruck-Regulation — Basis für Lifestyle-Empfehlungen (Bewegung, Salz, Stress).' },
        { name: 'Vorhofflimmern',        category: 'herz',              note: 'Veranlagungs-Hinweis bei familiärer Häufung — präventive Lebensstil-Beratung (Koffein, Schlaf, Alkohol).' },
        { name: 'Salz & Blutdruck',      category: 'stoffwechsel',      genes: ['ADD1', 'STK39', 'AGT'], note: 'Salzsensitivität — individualisiert die Ernährungs-Empfehlung zur Blutdruck-Prävention.' },
        { name: 'Zellstress & Herz',     category: 'gesunde-alterung',  genes: ['SOD2', 'NOS3', 'GPx'], note: 'Oxidativer-Stress-Status — orientiert antioxidative Ernährungs- und Supplement-Beratung.' },
      ],
      epiReports: [
        { name: 'Biologisches Alter',           note: 'MethylPace-Score als integrierter Endpunkt kardiovaskulärer Lebensstil-Wirkung.' },
        { name: 'Pro-/Anti-Entzündungs-Score',  note: 'Aktueller systemischer Entzündungsstatus — präventiv durch Lebensstil modifizierbar.' },
      ],
      genes: ['APOE', 'CDKN2B-AS1', 'AGT', 'ACE', 'NOS3', 'CETP', 'LDLR'],
    },

    ortho: {
      id: 'ortho',
      label: 'Orthopädie',
      headline: 'Für die orthopädische Praxis besonders relevant',
      sub: 'Knochen- und Gelenk-Belastbarkeit, Bindegewebs-Resilienz, Regenerations-Kapazität und Mikronährstoff-Verwertung — die genetische Grundlage präventiver Trainings-, Bewegungs- und Ernährungs-Beratung.',
      primary: ['verletzung-regeneration', 'fitness'],
      secondary: ['vitamine', 'supplements', 'stoffwechsel'],
      epi: ['muskelschwund', 'entzuendung'],
      reports: [
        { name: 'LWS-Bandscheiben',          category: 'verletzung-regeneration', genes: ['COL1A1', 'COL9A3', 'COL11A1'], note: 'Veranlagung für die Belastbarkeit der Wirbelsäule — Grundlage für individualisierte Bewegungs- und Belastungs-Empfehlungen.' },
        { name: 'Knochen-/Gelenkstabilität', category: 'verletzung-regeneration', genes: ['COL5A1', 'COL1A1'], note: 'Bindegewebs-Veranlagung — orientiert präventive Belastungs- und Trainings-Beratung.' },
        { name: 'Achillessehne',             category: 'verletzung-regeneration', genes: ['COL5A1', 'MCF2L'], note: 'Sehnen-Belastbarkeit — individualisiert Trainings- und Aufwärm-Empfehlungen.' },
        { name: 'Arthrose-Bezug',            category: 'verletzung-regeneration', genes: ['GDF5', 'COL11A1'], note: 'Veranlagung im Gelenk-Stoffwechsel — Grundlage für frühe Bewegungs- und Ernährungs-Beratung.' },
        { name: 'Reha-/Erholungstyp',        category: 'verletzung-regeneration', genes: ['IL6', 'PPARGC1A'], note: 'Individuelle Regenerations-Kinetik — orientiert Trainings- und Erholungs-Empfehlungen.' },
        { name: 'Knochendichte',             category: 'stoffwechsel',            genes: ['VDR', 'LRP1'], note: 'Veranlagung für die Knochendichte — Grundlage für präventive Bewegungs- und Nährstoff-Beratung.' },
        { name: 'Vitamin D',                 category: 'vitamine',                genes: ['VDR', 'CYP2R1', 'GC', 'NADSYN1'], note: 'Veranlagung in der Verwertung — erklärt unterschiedliche Antworten auf Substitution.' },
        { name: 'Glucosamin/Chondroitin',    category: 'supplements',             note: 'Veranlagungs-Hinweis für die Response auf Knorpel-relevante Supplements.' },
      ],
      epiReports: [
        { name: 'Muskelalterung',          note: 'Epigenetischer Muskel-Status — präventiv durch Training und Ernährung modifizierbar.' },
        { name: 'Gesamt-Entzündungs-Score', note: 'Systemische Entzündung als Co-Faktor im Bewegungsapparat — präventiv modifizierbar.' },
      ],
      genes: ['COL5A1', 'COL1A1', 'GDF5', 'VDR', 'ACTN3'],
    },

    allgemein: {
      id: 'allgemein',
      label: 'Allgemeinmedizin',
      headline: 'Für die hausärztliche Praxis besonders relevant',
      sub: 'Breites Präventions-Profil mit klarer Priorisierung: Mikronährstoff-Verwertung, kardiometabolische Veranlagung und biologisches Alter als integrierter Endpunkt für Lebensstil-Beratung.',
      primary: ['vitamine', 'stoffwechsel'],
      secondary: ['herz', 'sensitivitaeten', 'gesunde-alterung'],
      epi: ['biologisches-alter', 'entzuendung', 'immunscore'],
      reports: [
        { name: 'Vitamin D',         category: 'vitamine',         genes: ['VDR', 'CYP2R1', 'GC', 'NADSYN1'], note: 'Veranlagung in der Verwertung — erklärt unterschiedliche Antworten auf Substitution.' },
        { name: 'Vitamin B12',       category: 'vitamine',         genes: ['FUT2', 'MTR', 'MTRR'], note: 'Veranlagung in Verwertung und Bedarf — Hintergrund für unklare Energie-Themen.' },
        { name: 'Magnesium',         category: 'vitamine',         genes: ['MUC1'], note: 'Veranlagung im Magnesium-Bedarf — Bezug zu Schlaf, Krampfneigung, Stress-Resilienz.' },
        { name: 'Omega-3',           category: 'vitamine',         genes: ['FADS1', 'FADS2'], note: 'Veranlagung für Bedarf und Verstoffwechslung — Grundlage für Ernährungs- und Supplement-Beratung.' },
        { name: 'Typ-2-Diabetes',    category: 'stoffwechsel',     genes: ['TCF7L2', 'CDKAL1', 'KCNJ11', 'SLC30A8'], note: 'Veranlagung im Glukose-Stoffwechsel — Grundlage für frühzeitige Lebensstil-Beratung.' },
        { name: 'Adipositas-Risiko', category: 'stoffwechsel',     genes: ['FTO', 'MC4R', 'LEPR'], note: 'Genetisch erklärbarer Anteil der Gewichts-Veranlagung — individualisiert Ernährungs- und Bewegungs-Empfehlungen.' },
        { name: 'Cholesterin',       category: 'herz',             genes: ['APOE', 'CETP', 'LDLR'], note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für individualisierte Ernährungs- und Bewegungs-Beratung.' },
        { name: 'Bluthochdruck',     category: 'herz',             genes: ['AGT', 'ACE', 'ADD1'], note: 'Veranlagung in der Blutdruck-Regulation — Basis für Lifestyle-Beratung.' },
        { name: 'Gluten',            category: 'sensitivitaeten',  genes: ['HLA', 'MYO9B'], note: 'Veranlagungs-Hinweis bei Verdacht auf Gluten-Sensitivität.' },
        { name: 'Laktose',           category: 'sensitivitaeten',  genes: ['MCM6'], note: 'Veranlagung in der Laktose-Verwertung — Hintergrund bei Verträglichkeits-Themen.' },
      ],
      epiReports: [
        { name: 'Biologisches Alter',        note: 'Integrierter Endpunkt — sinnvolles Maß für die Wirkung von Lebensstil-Empfehlungen über Zeit.' },
        { name: 'Gesamt-Entzündungs-Score',  note: 'Stille Entzündung — präventiv über Ernährung, Bewegung und Schlaf modifizierbar.' },
        { name: 'Immunscore',                note: 'Methylierungs-basierter Immunzell-Status.' },
      ],
      genes: ['MTHFR', 'APOE', 'VDR', 'TCF7L2', 'FTO', 'MCM6'],
    },

    innere: {
      id: 'innere',
      label: 'Innere Medizin',
      headline: 'Für die internistische Praxis besonders relevant',
      sub: 'Kardiometabolische Veranlagung, Nahrungsmittel-Sensitivitäten und systemischer Entzündungs-Status — Grundlage für präventive Lebensstil-Beratung jenseits der klassischen Laborparameter.',
      primary: ['stoffwechsel', 'herz', 'sensitivitaeten'],
      secondary: ['vitamine', 'gesunde-alterung'],
      epi: ['biologisches-alter', 'entzuendung', 'immunscore'],
      reports: [
        { name: 'Typ-2-Diabetes',     category: 'stoffwechsel',    genes: ['TCF7L2', 'CDKAL1', 'KCNJ11', 'SLC30A8'], note: 'Polygene Veranlagung im Glukose-Stoffwechsel — Grundlage für frühe Lebensstil-Beratung.' },
        { name: 'Adipositas-Risiko',  category: 'stoffwechsel',    genes: ['FTO', 'MC4R', 'LEPR'], note: 'Genetisch erklärbarer Anteil der Gewichts-Veranlagung — individualisiert Ernährungs-Beratung.' },
        { name: 'Salz & Blutdruck',   category: 'stoffwechsel',    genes: ['ADD1', 'STK39', 'AGT'], note: 'Salzsensitivität — individualisiert die Ernährungs-Empfehlung zur Blutdruck-Prävention.' },
        { name: 'Cholesterin',        category: 'herz',            genes: ['APOE', 'CETP', 'LDLR'], note: 'Veranlagung im Lipid-Stoffwechsel — Grundlage für Ernährungs- und Bewegungs-Beratung.' },
        { name: 'Herzkrankheits-Risiko', category: 'herz',         genes: ['CDKN2B-AS1 (9p21)', 'APOE'], note: 'Polygene Veranlagung für Herz-Kreislauf-Belastbarkeit — sichtbar auch ohne klassische Risikofaktoren.' },
        { name: 'Gluten',             category: 'sensitivitaeten', genes: ['HLA', 'MYO9B'], note: 'Veranlagungs-Hinweis Gluten-Sensitivität — Hintergrund für Ernährungs-Beratung.' },
        { name: 'Laktose',            category: 'sensitivitaeten', genes: ['MCM6'], note: 'Veranlagung in der Laktose-Verwertung — Hintergrund für Ernährungs-Beratung.' },
        { name: 'Zucker/Fruktose',    category: 'sensitivitaeten', genes: ['GCKR', 'ALDOB'], note: 'Veranlagung in der Kohlenhydrat-Verträglichkeit — Hintergrund für Ernährungs-Beratung.' },
        { name: 'Fettverträglichkeit', category: 'sensitivitaeten', genes: ['APOA2', 'PPARG'], note: 'Veranlagung in der Fett-Verträglichkeit — individualisiert Ernährungs-Empfehlungen.' },
        { name: 'Stoffwechsel & Alter', category: 'gesunde-alterung', note: 'Langzeit-Veranlagung metabolischer Pfade — Endpunkt für präventive Beratung.' },
      ],
      epiReports: [
        { name: 'Biologisches Alter',        note: 'Integrierter Endpunkt internistischer Prävention.' },
        { name: 'Gesamt-Entzündungs-Score',  note: 'Systemischer Entzündungs-Status — präventiv über Lebensstil modifizierbar.' },
        { name: 'Immunscore',                note: 'Methylierungs-basierter Immunstatus.' },
      ],
      genes: ['TCF7L2', 'FTO', 'APOE', 'MCM6', 'HLA'],
    },

    neuro: {
      id: 'neuro',
      label: 'Neurologie / Psychiatrie',
      headline: 'Für die neurologisch-psychiatrische Praxis besonders relevant',
      sub: 'Stressverarbeitung, Schlaf-Phänotyp, kognitive Reserve und psychologische Veranlagung — Grundlage für Lebensstil-Beratung zu Ernährung, Bewegung, Schlafhygiene und Stress-Management.',
      primary: ['mental-health', 'psychologisch', 'stress', 'schlaf'],
      secondary: ['vitamine', 'gesunde-alterung'],
      epi: ['biologisches-alter', 'entzuendung'],
      reports: [
        { name: 'Kognition',              category: 'gesunde-alterung', genes: ['APOE', 'BDNF'], note: 'Langzeit-Veranlagung kognitiver Reserve — Endpunkt präventiver Lebensstil-Beratung.' },
        { name: 'Stress-Resilienz',       category: 'mental-health',    genes: ['COMT', 'BDNF'], note: 'Veranlagungs-Phänotyp unter Belastung — Grundlage für Stress-Management-Beratung.' },
        { name: 'Aufmerksamkeit',         category: 'mental-health',    genes: ['DRD2', 'DRD1', 'SLC6A3', 'COMT'], note: 'Veranlagung der Aufmerksamkeits-Regulation — Hintergrund für Lifestyle-Empfehlungen (Schlaf, Ernährung, Bewegung).' },
        { name: 'Gedächtnis',             category: 'mental-health',    genes: ['BDNF', 'APOE'], note: 'Veranlagung für Lernen und Gedächtnis-Konsolidierung — Grundlage für individualisierte Empfehlungen.' },
        { name: 'Warrior/Worrier-Profil', category: 'mental-health',    genes: ['COMT'], note: 'Phänotyp der Stress- und Reiz-Verarbeitung — orientiert präventive Beratung.' },
        { name: 'COMT',                   category: 'psychologisch',    genes: ['COMT'], note: 'Dopamin-Abbau-Phänotyp — orientiert Stress-Management- und Lebensstil-Beratung.' },
        { name: 'Emotionsregulation',     category: 'psychologisch',    genes: ['OXTR', 'MAOA'], note: 'Veranlagung für emotionale Reaktivität — Hintergrund für Beratung zu Stress und Schlaf.' },
        { name: 'Brain-Fog-Bezug',        category: 'psychologisch',    note: 'Veranlagungs-Hinweis kognitive Klarheit — Bezug zu Ernährung, Schlaf, Stress.' },
        { name: 'Chronotyp',              category: 'schlaf',           genes: ['PER3', 'CLOCK', 'BMAL1'], note: 'Lerche/Eule-Phänotyp — individualisiert Schlafhygiene und Tagesstruktur.' },
        { name: 'Schlafqualität',         category: 'schlaf',           genes: ['ABCC9'], note: 'Veranlagung in der Schlaf-Architektur — Grundlage für Schlafhygiene-Beratung.' },
        { name: 'Stress & Schlaf',        category: 'stress',           genes: ['PER3', 'COMT'], note: 'Stress-Schlaf-Achse — Grundlage für individualisierte Lebensstil-Empfehlungen.' },
      ],
      epiReports: [
        { name: 'Gedächtnisalter',     note: 'Epigenetischer Endpunkt kognitiver Alterung — modifizierbar durch Lebensstil.' },
        { name: 'Biologisches Alter',  note: 'Integrierter Endpunkt präventiver Lebensstil-Beratung.' },
      ],
      genes: ['COMT', 'MAOA', 'BDNF', 'APOE', 'PER3', 'MTHFR'],
    },

    sport: {
      id: 'sport',
      label: 'Sportmedizin',
      headline: 'Für die sportmedizinische Praxis besonders relevant',
      sub: 'Trainings-Phänotyp, Regenerations-Kapazität, Substrat-Nutzung und Belastbarkeit des Bewegungsapparats — die genetische Grundlage individueller Trainings- und Ernährungs-Empfehlungen.',
      primary: ['fitness', 'verletzung-regeneration'],
      secondary: ['supplements', 'stoffwechsel'],
      epi: ['muskelschwund', 'entzuendung', 'biologisches-alter'],
      reports: [
        { name: 'VO₂max',              category: 'fitness',                 genes: ['PPARGC1A', 'ACE', 'VEGFA'], note: 'Veranlagung in der aeroben Trainierbarkeit — individualisiert Ausdauer-Empfehlungen.' },
        { name: 'Muskelkraft',         category: 'fitness',                 genes: ['ACTN3', 'ACE'], note: 'Veranlagung im Kraft-Phänotyp — orientiert Trainings-Planung.' },
        { name: 'Muskelausdauer',      category: 'fitness',                 genes: ['PPARA', 'PPARGC1A', 'ACE'], note: 'Veranlagung im Ausdauer-Phänotyp — orientiert Trainings-Planung.' },
        { name: 'Anaerobe Schwelle',   category: 'fitness',                 genes: ['ADRB2', 'PPARA'], note: 'Veranlagung im Laktat-Stoffwechsel — orientiert Intensitäts-Bereiche.' },
        { name: 'Erholungsfähigkeit',  category: 'fitness',                 genes: ['IL6', 'IL6-AS1'], note: 'Regenerations-Kinetik nach Belastung — orientiert Erholungs-Empfehlungen.' },
        { name: 'Lean Mass',           category: 'fitness',                 genes: ['MSTN', 'ACTN3'], note: 'Veranlagung im Magermasse-Aufbau — orientiert Krafttrainings- und Ernährungs-Empfehlungen.' },
        { name: 'Training fasted/fed', category: 'fitness',                 genes: ['PPARA', 'PPARG', 'FABP7'], note: 'Substrat-Nutzungs-Phänotyp — orientiert Ernährungs-Timing.' },
        { name: 'Achillessehne',       category: 'verletzung-regeneration', genes: ['COL5A1', 'MCF2L'], note: 'Sehnen-Belastbarkeit — individualisiert Trainings- und Aufwärm-Empfehlungen.' },
        { name: 'Reha-/Erholungstyp',  category: 'verletzung-regeneration', genes: ['IL6', 'PPARGC1A'], note: 'Individuelle Regenerations-Kinetik — orientiert Erholungs-Empfehlungen.' },
        { name: 'Kreatin',             category: 'supplements',             note: 'Veranlagungs-Hinweis Kreatin-Response.' },
      ],
      epiReports: [
        { name: 'Muskelalterung',           note: 'Epigenetischer Muskel-Status — durch Training und Ernährung modifizierbar.' },
        { name: 'Gesamt-Entzündungs-Score', note: 'Regenerations-relevanter Entzündungs-Status.' },
      ],
      genes: ['ACTN3', 'ACE', 'PPARA', 'PPARGC1A', 'COL5A1', 'MSTN'],
    },

    andere: {
      id: 'andere',
      label: 'Andere Fachrichtung',
      headline: 'Was der LIFETIME-Test in jeder Praxis liefert',
      sub: 'Auch jenseits der häufigsten Fachrichtungen liefert der Test ein Präventions-Profil aus Mikronährstoff-Veranlagung, kardiometabolischer Veranlagung und epigenetischem Alterungs- und Entzündungs-Status — Grundlage für individualisierte Lebensstil-Beratung.',
      primary: ['vitamine', 'gesunde-alterung'],
      secondary: ['stoffwechsel', 'herz', 'sensitivitaeten'],
      epi: ['biologisches-alter', 'entzuendung', 'immunscore'],
      reports: [
        { name: 'Vitamin-/Mineralbedarf', category: 'gesunde-alterung', note: 'Übersicht systematischer Bedarfs-Veranlagungen.' },
        { name: 'Langlebigkeit',          category: 'gesunde-alterung', genes: ['FOXO3', 'SIRT1', 'APOE'], note: 'Polygene Langzeit-Veranlagung — Endpunkt präventiver Beratung.' },
        { name: 'Vitamin D',              category: 'vitamine',         genes: ['VDR', 'CYP2R1', 'GC'], note: 'Veranlagung in der Verwertung.' },
        { name: 'Vitamin B12',            category: 'vitamine',         genes: ['FUT2', 'MTR'], note: 'Veranlagung in der Verwertung — Hintergrund für Energie-Themen.' },
        { name: 'Typ-2-Diabetes',         category: 'stoffwechsel',     genes: ['TCF7L2', 'CDKAL1'], note: 'Veranlagung im Glukose-Stoffwechsel — Grundlage präventiver Beratung.' },
        { name: 'Cholesterin',            category: 'herz',             genes: ['APOE', 'CETP'], note: 'Veranlagung im Lipid-Stoffwechsel.' },
      ],
      epiReports: [
        { name: 'Biologisches Alter',        note: 'Integrierter Endpunkt präventiver Lebensstil-Beratung.' },
        { name: 'Gesamt-Entzündungs-Score',  note: 'Systemischer Entzündungs-Status — modifizierbar.' },
        { name: 'Immunscore',                note: 'Methylierungs-basierter Immunstatus.' },
      ],
      genes: ['APOE', 'MTHFR', 'VDR', 'TCF7L2', 'FTO'],
    },
  };

  // ── Utility ─────────────────────────────────────────────────────────
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function pushDataLayer(payload) {
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push(payload);
    }
  }

  function createInitialState() {
    return {
      step: 'intro',
      answers: { specialty: null, focus: [] },
      perspective: null,
    };
  }

  // ── Re-Sort der Reports anhand des Fokus ──────────────────────────
  function sortReportsByFocus(reports, focusIds) {
    if (!focusIds || focusIds.length === 0) return reports.slice();
    const boostCats = new Set();
    focusIds.forEach((f) => {
      const mod = FOCUS_MODIFIERS[f];
      if (mod) mod.boostCategories.forEach((c) => boostCats.add(c));
    });
    const boosted = [];
    const rest = [];
    reports.forEach((r) => {
      if (boostCats.has(r.category)) boosted.push(r);
      else rest.push(r);
    });
    return boosted.concat(rest);
  }

  function sortEpiByFocus(epiReports, focusIds) {
    // Kein hartes Boosting auf Epi — Reihenfolge bleibt, Fokus wirkt nur auf Matrix-Epi-Highlight.
    return epiReports.slice();
  }

  // ── Quiz-Klasse ─────────────────────────────────────────────────────
  class DoctorQuiz {
    constructor(root) {
      this.root = root;
      this.state = createInitialState();
      this.calendlyUrl = root.dataset.calendlyUrl || 'https://calendly.com/lifetime365/longevity-coaching';
      this.secondaryCtaUrl = root.dataset.secondaryCtaUrl || '/products/lifetime-age-dna';

      this.steps = {};
      STEPS.forEach((id) => {
        this.steps[id] = root.querySelector(`[data-quiz-step="${id}"]`);
      });
      this.progressBar = root.querySelector('[data-quiz-progress-bar]');
      this.progressLabel = root.querySelector('[data-quiz-progress-label]');
      this.backBtn = root.querySelector('[data-quiz-back]');
      this.grid = root.querySelector('[data-quiz-grid]');

      this.bindEvents();
      this.goTo('intro');
    }

    bindEvents() {
      // Start-Button
      const startBtn = this.root.querySelector('[data-quiz-start]');
      if (startBtn) startBtn.addEventListener('click', () => {
        pushDataLayer({ event: 'doctor_quiz_start' });
        this.goTo('q1');
      });

      // Back-Button
      if (this.backBtn) this.backBtn.addEventListener('click', () => this.goBack());

      // Close-Button
      const closeBtn = this.root.querySelector('[data-quiz-close]');
      if (closeBtn) closeBtn.addEventListener('click', () => {
        if (this.state.step === 'result') {
          // Im Result: einfach zurück zum Intro ohne Bestätigung
          this.resetQuiz();
        } else {
          if (confirm('Quiz beenden? Ihre Auswahl geht verloren.')) {
            this.resetQuiz();
          }
        }
      });

      // Q1 Karten (Single-Select)
      const q1 = this.steps.q1;
      if (q1) {
        q1.querySelectorAll('[data-value]').forEach((card) => {
          card.addEventListener('click', () => {
            const value = card.dataset.value;
            q1.querySelectorAll('[data-value]').forEach((c) => {
              c.setAttribute('aria-checked', c === card ? 'true' : 'false');
              c.classList.toggle('is-selected', c === card);
            });
            this.state.answers.specialty = value;
            pushDataLayer({ event: 'doctor_quiz_specialty_selected', specialty: value });
            setTimeout(() => this.goTo('q2'), AUTO_ADVANCE_MS);
          });
        });
      }

      // Q2 Karten (Multi-Select, max 2)
      const q2 = this.steps.q2;
      if (q2) {
        const maxSelect = parseInt(q2.dataset.maxSelect || '2', 10);
        const advance = q2.querySelector('[data-quiz-advance]');
        const advanceLabel = q2.querySelector('[data-quiz-advance-label]');

        q2.querySelectorAll('[data-value]').forEach((card) => {
          card.addEventListener('click', () => {
            const value = card.dataset.value;
            const idx = this.state.answers.focus.indexOf(value);
            if (idx >= 0) {
              this.state.answers.focus.splice(idx, 1);
              card.setAttribute('aria-pressed', 'false');
              card.classList.remove('is-selected');
            } else if (this.state.answers.focus.length < maxSelect) {
              this.state.answers.focus.push(value);
              card.setAttribute('aria-pressed', 'true');
              card.classList.add('is-selected');
            }
            // Disable übrige Karten wenn max erreicht
            const atMax = this.state.answers.focus.length >= maxSelect;
            q2.querySelectorAll('[data-value]').forEach((c) => {
              const isSelected = this.state.answers.focus.indexOf(c.dataset.value) >= 0;
              c.classList.toggle('is-disabled', atMax && !isSelected);
              c.disabled = atMax && !isSelected;
            });
            const count = this.state.answers.focus.length;
            if (advance) advance.disabled = count === 0;
            if (advanceLabel) {
              advanceLabel.textContent = count === 0
                ? `Wählen Sie bis zu ${maxSelect} Bereiche`
                : `Weiter mit ${count} ${count === 1 ? 'Bereich' : 'Bereichen'} →`;
            }
          });
        });

        if (advance) advance.addEventListener('click', () => {
          pushDataLayer({ event: 'doctor_quiz_focus_selected', focus: this.state.answers.focus.slice() });
          this.goTo('loading');
        });
      }
    }

    goBack() {
      const order = ['intro', 'q1', 'q2'];
      const idx = order.indexOf(this.state.step);
      if (idx > 0) this.goTo(order[idx - 1]);
    }

    resetQuiz() {
      this.state = createInitialState();
      // Visuelle Reset-Pässe: alle Card-Selections löschen
      this.root.querySelectorAll('.lt-quiz-card.is-selected').forEach((c) => {
        c.classList.remove('is-selected', 'is-disabled');
        c.removeAttribute('aria-checked');
        c.removeAttribute('aria-pressed');
        c.disabled = false;
      });
      // Advance-Button-State zurücksetzen
      const advance = this.root.querySelector('[data-quiz-advance]');
      const advanceLabel = this.root.querySelector('[data-quiz-advance-label]');
      if (advance) advance.disabled = true;
      if (advanceLabel) advanceLabel.textContent = 'Wählen Sie bis zu 2 Bereiche';
      this.goTo('intro');
    }

    goTo(stepId) {
      this.state.step = stepId;

      // Steps zeigen/verstecken
      STEPS.forEach((id) => {
        const el = this.steps[id];
        if (el) el.hidden = id !== stepId;
      });
      // Question-Container nur sichtbar bei q1/q2
      if (this.grid) this.grid.hidden = !QUESTION_STEPS.includes(stepId);

      // Body-Class für Fullscreen-Modus (nimmt Page-Header weg)
      const isFullscreen = FULLSCREEN_STEPS.includes(stepId);
      document.body.classList.toggle('lt-quiz-fullscreen', isFullscreen);

      // Section-Modifier-Klassen — das ist was die Live-CSS für Layout braucht
      this.root.classList.toggle('lt-quiz--fullscreen', isFullscreen);
      this.root.classList.toggle('lt-quiz--in-intro', stepId === 'intro');
      this.root.classList.toggle('lt-quiz--in-questions', QUESTION_STEPS.includes(stepId));
      this.root.classList.toggle('lt-quiz--in-loading', stepId === 'loading');
      this.root.classList.toggle('lt-quiz--in-result', stepId === 'result');

      // Scroll oben in der Quiz-Shell (nicht body) für sauberen Übergang
      if (isFullscreen) {
        this.root.scrollTop = 0;
      }

      // Progress-Rail
      this.updateProgress(stepId);

      // Back-Button-Sichtbarkeit
      if (this.backBtn) {
        this.backBtn.hidden = !(stepId === 'q1' || stepId === 'q2');
      }

      // Loading-Übergang
      if (stepId === 'loading') {
        this.runLoading().then(() => this.goTo('result'));
      }

      // Result-Render
      if (stepId === 'result') {
        this.renderResult();
        pushDataLayer({
          event: 'doctor_quiz_completed',
          specialty: this.state.answers.specialty,
          focus: this.state.answers.focus.slice(),
        });
      }
    }

    updateProgress(stepId) {
      const total = QUESTION_STEPS.length;
      let current = 0;
      if (stepId === 'q1') current = 1;
      else if (stepId === 'q2') current = 2;
      else if (stepId === 'loading' || stepId === 'result') current = total;

      const pct = (current / total) * 100;
      if (this.progressBar) this.progressBar.style.width = pct + '%';
      if (this.progressLabel) {
        this.progressLabel.textContent = current > 0 ? `${current} von ${total}` : '';
      }
    }

    runLoading() {
      const subs = [
        'Abgleich mit 16 DNA-Kategorien',
        'Identifikation der relevanten Reports',
        'Erstellung Ihrer Vorschau-Seite',
      ];
      const subEl = this.steps.loading && this.steps.loading.querySelector('[data-loading-sub]');
      const fillEl = this.steps.loading && this.steps.loading.querySelector('[data-loading-fill]');
      if (fillEl) {
        fillEl.style.transition = `stroke-dashoffset ${LOADING_DURATION_MS}ms linear`;
        // setTimeout damit CSS-Transition greift
        setTimeout(() => { fillEl.style.strokeDashoffset = '0'; }, 16);
      }
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % subs.length;
        if (subEl) subEl.textContent = subs[i];
      }, LOADING_DURATION_MS / subs.length);

      return new Promise((resolve) => {
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, LOADING_DURATION_MS);
      });
    }

    // ── Result-Rendering ─────────────────────────────────────────────
    renderResult() {
      const specialtyId = this.state.answers.specialty || 'andere';
      const focus = this.state.answers.focus.slice();
      const specialty = SPECIALTIES[specialtyId] || SPECIALTIES.andere;

      this.state.perspective = specialtyId;

      // Header
      const headlineEl = this.root.querySelector('[data-result-headline]');
      const subEl = this.root.querySelector('[data-result-sub]');
      if (headlineEl) headlineEl.textContent = specialty.headline;
      if (subEl) subEl.textContent = specialty.sub;

      // Top-Reports (re-sorted by focus) — als lt-quiz-result-theme Karten
      const reportsEl = this.root.querySelector('[data-result-reports]');
      const sortedReports = sortReportsByFocus(specialty.reports, focus).slice(0, 6);
      if (reportsEl) {
        reportsEl.innerHTML = sortedReports.map((r) => {
          const cat = DNA_CATEGORIES.find((c) => c.id === r.category);
          const catLabel = cat ? cat.label : '';
          const genesHtml = (r.genes && r.genes.length)
            ? `<div class="lt-doctor-quiz__gene-pills" aria-label="Untersuchte Marker">
                 <span class="lt-doctor-quiz__gene-pills-label">Marker:</span>
                 ${r.genes.map((g) => `<span class="lt-doctor-quiz__gene-pill">${escapeHtml(g)}</span>`).join('')}
               </div>`
            : `<div class="lt-doctor-quiz__gene-pills lt-doctor-quiz__gene-pills--empty">
                 <span class="lt-doctor-quiz__gene-pills-label">Polygen — mehrere Marker.</span>
               </div>`;
          return `
            <article class="lt-quiz-result-theme">
              <div class="lt-quiz-result-theme__header">
                <div class="lt-quiz-result-theme__head-text">
                  <span class="lt-quiz-result-theme__pos">${escapeHtml(catLabel)}</span>
                  <h4 class="lt-quiz-result-theme__title">${escapeHtml(r.name)}</h4>
                </div>
              </div>
              <p class="lt-quiz-result-theme__lead">${escapeHtml(r.note)}</p>
              ${genesHtml}
            </article>
          `;
        }).join('');
      }

      // Methodik-Footnote (am Ende des Reports-Blocks)
      const genesEl = this.root.querySelector('[data-result-genes]');
      if (genesEl) {
        genesEl.innerHTML = `<em>Zur Methodik:</em> Jeder Report beruht auf peer-reviewed Studien zu den genannten Markern. Im Befund sehen Ihre Patient:innen pro Report eine interpretierte Aussage (Veranlagungs-Stufe + individualisierte Empfehlung) — nicht die Genotyp-Rohdaten. Die wissenschaftliche Begleitung übernimmt Prof. Dr. med. Volker Limmroth.`;
      }

      // Epigenetik-Karten — als lt-quiz-result-theme Karten
      const epiEl = this.root.querySelector('[data-result-epi]');
      if (epiEl) {
        epiEl.innerHTML = sortEpiByFocus(specialty.epiReports, focus).map((r) => `
          <article class="lt-quiz-result-theme">
            <div class="lt-quiz-result-theme__header">
              <div class="lt-quiz-result-theme__head-text">
                <span class="lt-quiz-result-theme__pos">Epigenetik</span>
                <h4 class="lt-quiz-result-theme__title">${escapeHtml(r.name)}</h4>
              </div>
            </div>
            <p class="lt-quiz-result-theme__lead">${escapeHtml(r.note)}</p>
          </article>
        `).join('');
      }

      // Perspektiv-Wechsler
      this.renderPerspectiveChips();

      // Scope-Pills (initial mit aktueller Fachrichtung)
      this.renderScope(specialtyId);

      // CTA URLs mit UTM
      const focusStr = focus.join('+') || 'none';
      const utm = `?hide_gdpr_banner=1&utm_source=doctor-quiz&utm_medium=result&utm_campaign=partner-program&specialty=${encodeURIComponent(specialtyId)}&focus=${encodeURIComponent(focusStr)}`;
      const bookingBtn = this.root.querySelector('[data-cta-booking]');
      const secondaryBtn = this.root.querySelector('[data-cta-secondary]');
      if (bookingBtn) {
        bookingBtn.href = this.calendlyUrl + utm;
        bookingBtn.addEventListener('click', () => {
          pushDataLayer({ event: 'doctor_quiz_booking_clicked', specialty: specialtyId, focus: focus });
        }, { once: true });
      }
      if (secondaryBtn) {
        const secUtm = `?utm_source=doctor-quiz&utm_medium=result&utm_content=secondary-cta&specialty=${encodeURIComponent(specialtyId)}`;
        secondaryBtn.href = this.secondaryCtaUrl + secUtm;
        secondaryBtn.addEventListener('click', () => {
          pushDataLayer({ event: 'doctor_quiz_secondary_cta_clicked', specialty: specialtyId });
        }, { once: true });
      }
    }

    renderPerspectiveChips() {
      const wrap = this.root.querySelector('[data-result-perspective]');
      if (!wrap) return;
      const currentSpec = this.state.answers.specialty || 'andere';
      const chips = Object.values(SPECIALTIES).map((s) => {
        const isActive = s.id === this.state.perspective;
        const isOriginal = s.id === currentSpec;
        return `
          <button
            type="button"
            class="lt-doctor-quiz__perspective-chip ${isActive ? 'is-active' : ''} ${isOriginal ? 'is-original' : ''}"
            data-perspective="${escapeHtml(s.id)}"
            role="tab"
            aria-selected="${isActive ? 'true' : 'false'}"
          >${escapeHtml(s.label)}${isOriginal ? ' <span class="lt-doctor-quiz__perspective-marker">(Ihre Auswahl)</span>' : ''}</button>
        `;
      }).join('');
      wrap.innerHTML = chips;

      wrap.querySelectorAll('[data-perspective]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.perspective;
          if (id === this.state.perspective) return;
          const from = this.state.perspective;
          this.state.perspective = id;
          this.renderPerspectiveChips();
          this.renderScope(id);
          pushDataLayer({ event: 'doctor_quiz_perspective_switched', from: from, to: id });
        });
      });
    }

    renderScope(specialtyId) {
      const specialty = SPECIALTIES[specialtyId] || SPECIALTIES.andere;
      const focus = this.state.answers.focus.slice();

      // Boost-Kategorien aus Fokus (nur wenn Perspektive == Ursprungs-Auswahl)
      const useBoost = specialtyId === this.state.answers.specialty;
      const focusBoostCats = new Set();
      const focusBoostEpi = new Set();
      if (useBoost) {
        focus.forEach((f) => {
          const mod = FOCUS_MODIFIERS[f];
          if (mod) {
            mod.boostCategories.forEach((c) => focusBoostCats.add(c));
            mod.boostEpigenetics.forEach((e) => focusBoostEpi.add(e));
          }
        });
      }

      // Relevante DNA-Kategorien = primary + secondary + focus-boost
      const relevantCats = new Set([
        ...specialty.primary,
        ...specialty.secondary,
        ...focusBoostCats,
      ]);

      const pillsEl = this.root.querySelector('[data-result-scope-pills]');
      if (pillsEl) {
        pillsEl.innerHTML = DNA_CATEGORIES.map((cat) => {
          const isRelevant = relevantCats.has(cat.id);
          return `<li class="lt-quiz-result__pill ${isRelevant ? 'is-relevant' : ''}" data-scope-cat="${escapeHtml(cat.id)}" title="${escapeHtml(cat.tooltip)}">${escapeHtml(cat.label)}</li>`;
        }).join('');
      }

      // Epigenetik als Inline-Strong-Liste, wie Live-Quiz
      const epiRelevant = new Set([...specialty.epi, ...focusBoostEpi]);
      const epiLabels = EPIGENETICS
        .filter((e) => epiRelevant.has(e.id))
        .map((e) => `<strong>${escapeHtml(e.label)}</strong>`);
      const epiEl = this.root.querySelector('[data-result-scope-epi]');
      if (epiEl) {
        if (epiLabels.length) {
          epiEl.innerHTML = `Plus die für ${escapeHtml(specialty.label)} relevanten epigenetischen Bereiche: ${epiLabels.join(' · ')}.`;
        } else {
          epiEl.innerHTML = `Plus 6 epigenetische Bereiche (biologisches Alter, EpiVitality, Immunscore, Entzündung, Muskelschwund, Körperalter).`;
        }
      }
    }
  }

  // ── Init ────────────────────────────────────────────────────────────
  function init() {
    document.querySelectorAll('[data-lt-doctor-quiz]').forEach((root) => {
      if (root.__doctorQuizInitialized) return;
      root.__doctorQuizInitialized = true;
      new DoctorQuiz(root);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Shopify-Editor Re-Init
  document.addEventListener('shopify:section:load', init);
})();
