/**
 * LIFETIME — Quiz-Themen: die eine Datenquelle
 * ────────────────────────────────────────────
 * Zehn Themen, die das AGE-Quiz priorisieren kann. Jedes Thema traegt hier alles,
 * was Result-Page, Report-Seite und die Klaviyo-Mails davon brauchen.
 *
 * Warum diese Datei existiert: `quiz-report-konzept.md` § Harte Regeln 5 verlangt
 * EINE Quelle fuer Themen-Inhalte. Vorher lag `NEEDS_DETAIL` als private const in
 * `lt-quiz-v2.js` und war fuer die Report-Seite nicht erreichbar. Jetzt liest die
 * Quiz-Engine denselben Datensatz wie `lt-longevity-plan.js`.
 *
 * Feld-Herkunft:
 *   topic, icon, title, short, genes, epiLine  → Bestand aus lt-quiz-v2.js (live seit 07/2026)
 *   analysis, lever, bridge                    → lifetime-klaviyo/flow-spec-quiz-nurture-mapping.md
 *                                                (Copy-Chat, 06.08.2026, compliance-geprueft)
 *   teaser                                     → ein Satz je Thema fuer die Report-Seite
 *                                                (BJ 07.08.: Seite ist Sneak-Preview, ein Satz reicht)
 *
 * Wer was nutzt: Report-Seite = topic, genes[].name, teaser. Mails = analysis (Mail 1),
 * lever (Mail 3), bridge (Mail 4). short/epiLine/genes[].explainer laufen auf der
 * Quiz-Result-Page.
 *
 * Compliance (aus derselben Spec): Gen-Aussagen beschreiben immer die Eigenschaft der
 * Variante, nie ein Versprechen an die Leserin. Hebel sind Alltagsgewohnheiten, keine
 * physiologischen Zusagen. Kein Krankheitsbezug, keine Diagnose. Der `heart`-Block ist
 * der empfindlichste: nicht um Risiko- oder Praeventionsaussagen ergaenzen.
 *
 * Laden: IMMER vor `lt-quiz-v2.js` bzw. `lt-longevity-plan.js` (beide `defer`, die
 * Reihenfolge im Markup bleibt damit erhalten).
 */
(function () {
  'use strict';

  window.LIFETIME = window.LIFETIME || {};

  window.LIFETIME.QUIZ_NEEDS = {
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
      teaser: 'Wie stark Fasten und Kalorienreduktion bei dir ansetzen, hängt an deiner SIRT1-Variante.',
      analysis: 'Aus deinen Angaben lässt sich schätzen, ob du eher schneller oder langsamer alterst als dein Kalenderalter vermuten lässt. Wie viel davon dein Lebensstil ist und wie viel Veranlagung, zeigt sich erst in den Genen. FOXO3 gilt als eines der stärksten Langlebigkeits-Gene weltweit, die aktive Variante ist bei Hundertjährigen deutlich häufiger, und SIRT1 bestimmt mit, wie stark Fasten und Kalorienreduktion bei dir überhaupt ansetzen.',
      lever: {
        title: 'Halte eine Essenspause über Nacht.',
        body: '12 bis 14 Stunden zwischen letzter und erster Mahlzeit sind der Hebel mit dem geringsten Aufwand, weil du nichts hinzufügst, sondern nur verschiebst. Wie stark dein Körper darauf anspricht, hängt unter anderem an deiner SIRT1-Variante, und die steht in deiner DNA, nicht in deinem Kalender.',
      },
      bridge: 'Kategorie „Anti-Aging" plus der epigenetische Bereich MethylPace mit chronologischem Alter, biologischem Alter und Alterungsgeschwindigkeit.',
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
      teaser: 'Ob dein Körper eher auf die Menge oder auf den Zeitpunkt deiner Mahlzeiten reagiert, steht in Markern wie TCF7L2.',
      analysis: 'Deine Angaben deuten darauf hin, dass dein Stoffwechsel das Thema ist, an dem sich für dich am meisten entscheidet. Ob eine Ernährungsform zu dir passt, hängt weniger an der Kalorienzahl als an deiner Reaktion darauf: FTO beeinflusst Appetit und Fettspeicherung, TCF7L2 deine Insulin-Antwort auf Kohlenhydrate, MC4R den Punkt, an dem du Sättigung überhaupt wahrnimmst. Aus einer Selbstauskunft ist keine dieser Antworten ablesbar.',
      lever: {
        title: 'Geh nach der größten Mahlzeit des Tages zehn Minuten spazieren.',
        body: 'Klein genug, um es durchzuhalten, und es kostet dich keine Umstellung deiner Ernährung. Ob dein Körper eher auf die Kohlenhydratmenge oder auf den Zeitpunkt reagiert, ist individuell und steht in Markern wie TCF7L2.',
      },
      bridge: 'Kategorien „Gesundheits- und Stoffwechselzustände", „Ernährung" und „Unverträglichkeiten und Sensibilitäten".',
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
      teaser: 'Vitamin D kann trotz guter Blutwerte kaum in den Zellen ankommen, darüber entscheidet dein VDR-Rezeptor.',
      analysis: 'Dass dir Energie fehlt, ist die Beobachtung. Woran es liegt, ist die eigentliche Frage. Drei Wege sind häufig und lassen sich von außen nicht unterscheiden: die Methylierung über MTHFR, die Verwertung von Vitamin D über den Rezeptor VDR, bei dem trotz guter Blutwerte wenig in den Zellen ankommen kann, und stille Entzündungsaktivität über Marker wie IL6. Welcher davon bei dir eine Rolle spielt, trennt keine Selbsteinschätzung, sondern nur eine Messung.',
      lever: {
        title: 'Hol dir in der ersten Stunde nach dem Aufstehen zehn Minuten Tageslicht.',
        body: 'Draußen, ohne Sonnenbrille, auch bei Wolken. Es ist der billigste Taktgeber für deinen Tagesrhythmus und wirkt unabhängig davon, welcher der drei Wege oben bei dir der entscheidende ist.',
      },
      bridge: 'Kategorien „Vitamine und Mineralstoffe", „Immunität und Entzündung" plus die epigenetischen Bereiche EpiVitality und Entzündung.',
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
      teaser: 'Ob der Espresso um 14 Uhr deine Nacht kostet, hängt an deiner CYP1A2-Variante.',
      analysis: 'Schlaf ist bei dir das Thema mit dem größten Hebel. Zwei Dinge liegen dabei fest und lassen sich nicht antrainieren: dein Chronotyp über PER3, also ob du biologisch früh oder spät aktiv bist, und dein Koffein-Abbau über CYP1A2. Mit der langsamen Variante wirkt der Espresso um 14 Uhr noch um Mitternacht, mit der schnellen ist er um 18 Uhr abgebaut. Dieselbe Tasse, zwei völlig verschiedene Nächte.',
      lever: {
        title: 'Zieh deine Koffein-Grenze auf 14 Uhr und halte sie zehn Tage durch.',
        body: 'Das ist der günstigste Selbstversuch, den es zu diesem Thema gibt: Wenn sich etwas ändert, gehörst du vermutlich zu den langsamen Verwertern. Sicher weißt du es erst, wenn du deine CYP1A2-Variante kennst.',
      },
      bridge: 'Kategorie „Schlaf" (sechs Reports im Referenz-Kit) plus der Report zu Koffein.',
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
      teaser: 'Wie schnell du Stresshormone nach einer Belastung wieder abbaust, reguliert dein COMT-Gen.',
      analysis: 'Deine Angaben zeigen Stress als dein Kernthema. Entscheidend ist dabei weniger, wie viel auf dich einwirkt, sondern wie schnell du Stresshormone wieder abbaust. COMT reguliert genau das: Die schnelle Variante bleibt unter Druck ruhiger, die langsame denkt tiefer und braucht länger zur Erholung. Beides hat Vorteile, nur passen sie zu unterschiedlichen Arbeitsweisen. Dazu kommt BDNF als Faktor für mentale Belastbarkeit.',
      lever: {
        title: 'Setz einen festen Schlusspunkt statt einer Entspannungsübung.',
        body: 'Eine Uhrzeit, an der der Arbeitstag endet, jeden Tag dieselbe. Regelmäßigkeit ist bei Erholung leichter durchzuhalten als Intensität, und sie hilft besonders, wenn du zu den langsamen Abbauern gehörst.',
      },
      bridge: 'Kategorien „Stress" und „Psychische Gesundheit" plus der epigenetische Entzündungsbereich.',
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
      teaser: 'Ob dein Körper pflanzliches Omega-3 in die nutzbare Form umwandelt, entscheidet FADS1.',
      analysis: 'Konzentration und Gedächtnis stehen bei dir vorn. Ein Punkt wird dabei fast immer übersehen: FADS1 bestimmt, wie gut dein Körper pflanzliches Omega-3 in die Form umwandelt, die er tatsächlich nutzen kann. Mit einer schwachen Variante bringt Leinöl wenig und Fisch oder Algenöl viel, ohne dass du an der Menge etwas ändern müsstest. Dazu kommen BDNF für Lernen und Erinnerung und APOE als Marker für die kognitive Langzeitperspektive.',
      lever: {
        title: 'Sieh nach, aus welcher Quelle dein Omega-3 kommt.',
        body: 'Wenn es Leinöl oder Walnüsse sind, ist die Quelle die eigentliche Frage, nicht die Dosis. Ein Wechsel auf Fisch oder Algenöl kostet nichts extra und ist bei einer schwachen FADS1-Variante der Unterschied zwischen zugeführt und verwertet.',
      },
      bridge: 'Kategorien „Neurogesundheit", „Psychologische Merkmale" und „Ernährung".',
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
      teaser: 'Ob du eher Kraft- oder Ausdauertyp bist, steht in deiner ACTN3-Variante.',
      analysis: 'Training ist dein Top-Thema, und genau hier trennt sich individuell am deutlichsten, was wirkt. ACTN3 bestimmt deine Muskelfaser-Verteilung, also ob du eher Kraft- oder Ausdauertyp bist. ACE beeinflusst, wie stark dein Herz-Kreislauf-System überhaupt auf Ausdauerreize anspringt. Und COL5A1 sagt etwas über die Stabilität deiner Sehnen und Bänder, also darüber, wie schnell du Umfänge steigern kannst, ohne dich auszubremsen.',
      lever: {
        title: 'Bau zwei Krafteinheiten pro Woche ein und lass die Ausdauer erst einmal, wie sie ist.',
        body: 'Zwei Einheiten sind der Einstieg, mit dem die meisten dauerhaft durchkommen. Ob du danach eher auf Umfang oder auf Intensität setzt, entscheidet deine ACTN3-Variante besser als jedes Standardprogramm.',
      },
      bridge: 'Kategorien „Physisch" (zwölf Reports im Referenz-Kit) und „Verletzungsrisiko" plus der epigenetische Bereich Muskelschwund.',
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
      // ACHTUNG: compliance-empfindlichster Block. Nicht um Risiko-, Praeventions- oder
      // Krankheitsaussagen ergaenzen (flow-spec-quiz-nurture-mapping.md § 8).
      teaser: 'Wie stark dein Blutdruck auf Salz reagiert, hängt an deiner AGT-Variante.',
      analysis: 'Herz und Kreislauf stehen bei dir oben. Drei Marker prägen das Bild: AGT beeinflusst, wie stark dein Blutdruck auf Salz reagiert, bei der sensitiven Variante bewegt jedes Gramm spürbar mehr als bei anderen. APOE reguliert deinen Cholesterinstoffwechsel und entscheidet mit, wie gut du auf eine mediterran ausgerichtete Ernährung ansprichst. Und CDKN2B-AS1, der 9p21-Locus, ist der am besten untersuchte genetische Marker in diesem Feld. Keiner davon ist aus Selbstauskunft ablesbar.',
      lever: {
        title: 'Schreib eine Woche lang auf, wie viel von deinem Salz aus Fertigem kommt.',
        body: 'Brot, Käse und Fertiggerichte tragen den größten Anteil, der Salzstreuer ist selten das Thema. Erst wenn du die Quelle kennst, ist die Frage sinnvoll, ob Salz bei dir überhaupt der richtige Hebel ist, und die beantwortet deine AGT-Variante.',
      },
      bridge: 'Kategorien „Herzgesundheit" und „Gesundheits- und Stoffwechselzustände".',
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
      teaser: 'Ob normale Folsäure bei dir funktioniert oder die methylierte Form nötig ist, entscheidet MTHFR.',
      analysis: 'Du willst wissen, was für dich sinnvoll ist. Genau da liegt der häufigste Fehler: Es wird an der Dosis geschraubt, obwohl die Form das Problem ist. MTHFR entscheidet, ob normale Folsäure bei dir funktioniert oder ob du die methylierte Form brauchst. FUT2 beeinflusst, wie gut Vitamin B12 durch deine Darmwand kommt. Und BCO1 bestimmt, wie viel nutzbares Vitamin A aus pflanzlichem Beta-Carotin bei dir entsteht.',
      lever: {
        title: 'Mach eine Inventur, bevor du etwas hinzufügst.',
        body: 'Leg alles zusammen, was du regelmäßig nimmst, und notiere die Form, nicht nur den Namen. Bei Folsäure, B12 und Vitamin A entscheidet genau diese Zeile darüber, ob dein Körper etwas damit anfangen kann.',
      },
      bridge: 'Kategorien „Vitamine und Mineralstoffe" (14 Reports) und „Nahrungsergänzungsmittel" (18 Reports).',
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
      teaser: 'Wie gut deine Haut UV-Schäden repariert, hängt an deiner ERCC2-Variante.',
      analysis: 'Haut und Haar stehen bei dir vorn. Der wichtigste Faktor ist dabei nicht, was du aufträgst, sondern wie gut dein Körper repariert: ERCC2 ist für die Reparatur von UV-Schäden zuständig, bei reduzierter Aktivität hinterlässt dieselbe Sonnenstunde mehr Spuren. SOD2 steht für deine antioxidative Abwehr und MC1R für deine grundsätzliche Lichtempfindlichkeit. Beim Haar ist AR der zentrale Marker, er bestimmt, wie empfindlich deine Follikel auf DHT reagieren.',
      lever: {
        title: 'Nimm den UV-Schutz im Gesicht in deine Morgenroutine auf, das ganze Jahr über.',
        body: 'Kein zusätzlicher Schritt, wenn du ihn in die Tagespflege verlegst, und er ist unabhängig von jedem Produktversprechen wirksam. Wie viel er bei dir ausmacht, hängt an deiner ERCC2-Variante.',
      },
      bridge: 'Kategorien „Hautgesundheit" und „Haar-Gesundheit" plus der epigenetische Hautbezug im Bereich Körperalter.',
    },
  };

  /**
   * Fallback fuer Profile ohne Thema (kein Parameter, Import, Testprofil).
   * Quelle: flow-spec-quiz-nurture-mapping.md § Fallback ohne Property.
   */
  window.LIFETIME.QUIZ_NEEDS_FALLBACK = {
    hook: 'Dein Quiz hat drei Themen priorisiert, und schon die Reihenfolge sagt mehr als eine einzelne Zahl.',
    lever: {
      title: 'Halte eine Essenspause über Nacht.',
      body: '12 bis 14 Stunden zwischen letzter und erster Mahlzeit. Der Hebel mit dem geringsten Aufwand, weil du nichts hinzufügst, sondern nur verschiebst.',
    },
  };

  /** Slug → Klartext-Label. Fuer Klaviyo-Property `quiz_top1_label` und die Report-Seite. */
  window.LIFETIME.quizTopicLabel = function (id) {
    var def = window.LIFETIME.QUIZ_NEEDS[id];
    return def ? def.topic : '';
  };
})();
