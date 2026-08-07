/**
 * LIFETIME — Longevity-Plan (Report-Seite /pages/dein-longevity-plan)
 * ───────────────────────────────────────────────────────────────────
 * Füllt Einschätzung und Themen aus den URL-Parametern, die die Klaviyo-Mail mitbringt:
 *
 *   ?t1=sleep&t2=stress&t3=energy&ba=46&ca=42&g=female
 *
 * `top1` wird als Alias für `t1` akzeptiert, weil die Quiz-Result-CTAs das bereits
 * anhängen. Fehlt alles, rendert die generische Fassung.
 *
 * Themen-Inhalte kommen aus window.LIFETIME.QUIZ_NEEDS (assets/lt-quiz-needs.js) —
 * dieselbe Quelle wie die Quiz-Result-Page, damit Seite, Report und Mail 1 nicht
 * auseinanderlaufen (quiz-report-konzept.md § Harte Regeln 5).
 *
 * Parameter sind manipulierbar. Das ist hier folgenlos, weil auf der Seite nichts
 * Schützenswertes steht — aber alles wird trotzdem validiert, sonst landet fremder
 * Text im DOM. Slugs müssen in QUIZ_NEEDS existieren, Alter muss eine Zahl in
 * plausiblem Bereich sein.
 */
(function () {
  'use strict';

  var AGE_MIN = 18;
  var AGE_MAX = 90;
  var SCALE_SPAN = 24; // Jahre-Fenster der Delta-Skala, Pass sitzt in der Mitte

  function pushDataLayer(payload) {
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push(payload);
    }
  }

  function needs() {
    return (window.LIFETIME && window.LIFETIME.QUIZ_NEEDS) || {};
  }

  // ── Parameter lesen und härten ───────────────────────────────────
  function readParams() {
    var q = new URLSearchParams(window.location.search);
    var data = needs();

    function topic(value) {
      var v = (value || '').trim();
      return Object.prototype.hasOwnProperty.call(data, v) ? v : null;
    }
    function age(value) {
      var n = parseInt(value, 10);
      if (isNaN(n) || n < AGE_MIN || n > AGE_MAX) return null;
      return n;
    }

    var top = [topic(q.get('t1') || q.get('top1')), topic(q.get('t2')), topic(q.get('t3'))]
      .filter(Boolean)
      // Doppelte Slugs im Link würden denselben Block zweimal rendern
      .filter(function (v, i, arr) { return arr.indexOf(v) === i; });

    return {
      top: top,
      bioAge: age(q.get('ba')),
      chronoAge: age(q.get('ca')),
    };
  }

  // ── Block 1 · Deine Einschätzung ─────────────────────────────────
  function renderEstimate(root, params) {
    var card = root.querySelector('[data-plan-bioage]');
    var generic = root.querySelector('[data-plan-generic]');
    var hasNumbers = params.bioAge !== null && params.chronoAge !== null;

    if (card) card.hidden = !hasNumbers;
    if (generic) generic.hidden = hasNumbers;
    if (!hasNumbers || !card) return;

    var delta = params.bioAge - params.chronoAge;
    var passEl = card.querySelector('[data-plan-pass]');
    var bioEl = card.querySelector('[data-plan-bio]');
    var deltaEl = card.querySelector('[data-plan-delta]');
    var fill = card.querySelector('[data-plan-scale-fill]');
    var dot = card.querySelector('[data-plan-scale-bio]');

    if (passEl) passEl.textContent = params.chronoAge;
    if (bioEl) bioEl.textContent = params.bioAge;

    card.classList.add(delta > 0 ? 'is-up' : delta < 0 ? 'is-down' : 'is-zero');
    // Gleiche Einblende-Animation wie auf der Quiz-Result-Page. Die Regel dazu
    // steht in lt-quiz-result-shared.css und respektiert prefers-reduced-motion.
    card.classList.add('is-revealed');

    // Wortgleich mit renderResult() in lt-quiz-v2.js. Die Jahres-Zahl steht in
    // <strong>, weil die geteilte CSS sie je nach Richtung einfärbt. innerHTML ist
    // hier unbedenklich: `abs` kommt aus parseInt und ist immer eine Ganzzahl.
    if (deltaEl) {
      var abs = Math.abs(delta);
      var unit = abs === 1 ? 'Jahr' : 'Jahre';
      var lead = 'Auf Basis deiner Antworten liegt dein biologisches Alter ';
      if (delta > 0) {
        deltaEl.innerHTML = lead + 'rund <strong>' + abs + '&nbsp;' + unit + '</strong> über deinem chronologischen Alter.';
      } else if (delta < 0) {
        deltaEl.innerHTML = lead + 'rund <strong>' + abs + '&nbsp;' + unit + '</strong> unter deinem chronologischen Alter.';
      } else {
        deltaEl.textContent = lead + 'etwa gleichauf mit deinem chronologischen Alter.';
      }
    }

    var pct = Math.max(4, Math.min(96, ((delta + SCALE_SPAN / 2) / SCALE_SPAN) * 100));
    var lo = Math.min(50, pct);
    var hi = Math.max(50, pct);
    if (dot) dot.style.left = pct + '%';
    if (fill) { fill.style.left = lo + '%'; fill.style.width = (hi - lo) + '%'; }
  }

  // ── Block 2 · Deine drei Themen ──────────────────────────────────
  // Identisches Markup zu renderResult() in lt-quiz-v2.js: Icon, Titel, Marker,
  // Text. Nur das Schloss fehlt, weil die Karte hier `is-unlocked` trägt.
  // Wer eine der beiden Stellen ändert, ändert die andere mit — sonst sehen
  // Result-Page und Longevity-Plan wieder unterschiedlich aus (BJ 07.08.2026).
  //
  // Textfeld ist `short`, nicht `teaser`: Genau dieser Text steht auf der
  // Result-Page hinter dem Weichzeichner. Wer die E-Mail einträgt, muss mehr
  // bekommen als vorher zu sehen war, sonst ist das Gate ein leeres Versprechen.
  // `teaser` bleibt in lt-quiz-needs.js für die Mails.
  function renderThemes(root, params) {
    var host = root.querySelector('[data-plan-themes]');
    if (!host || !params.top.length) return;
    var data = needs();

    host.innerHTML = '';
    params.top.forEach(function (id, idx) {
      var def = data[id];
      if (!def) return;

      // Kein `--featured` (BJ 07.08. abends): Der Modifier vergrößert den Titel von
      // Thema 1 auf 24 px. Auf der Result-Page ist das richtig, dort ist Thema 1 das
      // einzige lesbare und trägt den Anriss allein. Hier sind alle drei offen und
      // gleichrangig — ein größerer erster Titel sieht dann nach Versehen aus.
      var article = document.createElement('article');
      article.className = 'lt-quiz-result-theme';

      var header = document.createElement('header');
      header.className = 'lt-quiz-result-theme__header';

      if (def.icon) {
        var icon = document.createElement('span');
        icon.className = 'lt-quiz-result-theme__icon';
        icon.setAttribute('aria-hidden', 'true');
        var i = document.createElement('i');
        i.className = 'ph-thin ph-' + def.icon;
        icon.appendChild(i);
        header.appendChild(icon);
      }

      var title = document.createElement('h3');
      title.className = 'lt-quiz-result-theme__title';
      title.textContent = def.title;
      header.appendChild(title);
      article.appendChild(header);

      if (def.genes && def.genes.length) {
        var markers = document.createElement('div');
        markers.className = 'lt-quiz-result-theme__markers';
        markers.setAttribute('aria-label', 'Relevante Gen-Marker');
        def.genes.forEach(function (gene) {
          var span = document.createElement('span');
          span.className = 'lt-quiz-result-theme__marker';
          span.textContent = gene.name;
          markers.appendChild(span);
        });
        article.appendChild(markers);
      }

      var lead = document.createElement('p');
      lead.className = 'lt-quiz-result-theme__lead';
      lead.textContent = def.short || def.teaser || '';
      article.appendChild(lead);

      host.appendChild(article);
    });
  }

  // ── CTAs mit top1 anreichern (PDP zeigt darüber den Quiz-Banner) ─
  // Der Kauf-CTA steht seit 07.08. in einer eigenen Section (lt-pdp-final-cta) und
  // damit außerhalb dieser Wurzel. Deshalb wird die ganze Seite nach Links auf die
  // AGE&DNA-PDP durchsucht, nicht nur der eigene Abschnitt.
  // Nur der Seiteninhalt, nicht das Menü: Die mobile Sidebar enthält zwei Links auf
  // dieselbe PDP und steht im DOM VOR dem Inhalt. Ungescoped war der erste Treffer
  // deshalb ein ausgeblendeter Navigations-Link — der Sichtbarkeits-Observer hing
  // an einem Element, das nie im Viewport steht.
  function planCtas() {
    var scope = document.querySelector('main') || document;
    return Array.prototype.slice.call(
      scope.querySelectorAll('a[href*="/products/lifetime-age-dna"], [data-plan-cta]')
    );
  }

  // Zwei Formen kommen vor:
  //   /products/lifetime-age-dna                              → direkt anreichern
  //   /discount/CODE?redirect=%2Fproducts%2Flifetime-age-dna  → das redirect-Ziel
  // Die zweite entsteht, sobald im Theme-Editor eine Rabatt-URL hinterlegt wird.
  // Ohne diesen Zweig fiele dort die top1-Übergabe und damit der Quiz-Banner
  // auf der PDP still aus.
  function decorateCtas(params) {
    if (!params.top[0]) return;
    planCtas().forEach(function (cta) {
      var href = cta.getAttribute('href');
      if (!href) return;
      var url;
      try {
        url = new URL(href, window.location.origin);
      } catch (e) {
        return;
      }

      var redirect = url.searchParams.get('redirect');
      if (redirect && redirect.indexOf('/products/lifetime-age-dna') !== -1) {
        var inner = new URL(redirect, window.location.origin);
        inner.searchParams.set('top1', params.top[0]);
        inner.searchParams.set('qz', '1');
        url.searchParams.set('redirect', inner.pathname + inner.search);
      } else if (url.pathname.indexOf('/products/lifetime-age-dna') !== -1) {
        url.searchParams.set('top1', params.top[0]);
        url.searchParams.set('qz', '1');
      } else {
        return;
      }

      cta.setAttribute('href', url.pathname + url.search);
    });
  }

  // ── Tracking ─────────────────────────────────────────────────────
  // quiz_report_view      — Aufruf, mit Personalisierungs-Status
  // quiz_report_cta_seen  — der Kauf-CTA war vollständig im Viewport
  // quiz_report_cta_click — Klick auf einen CTA
  // Trennt „hat den Ask gesehen und abgelehnt" von „ist nie hingekommen", gleiche
  // Logik wie quiz_result_cta_seen auf der Quiz-Result-Page.
  function bindTracking(params) {
    var personalized = params.top.length > 0;

    pushDataLayer({
      event: 'quiz_report_view',
      quiz_top1: params.top[0] || '',
      quiz_bioage: params.bioAge === null ? '' : params.bioAge,
      report_personalized: personalized ? 'yes' : 'no',
    });

    // Beobachtet wird der LETZTE Kauf-CTA der Seite (der grosse dunkle Abschluss),
    // nicht mehr der erste. Seit dem 07.08. steht ein CTA schon in der Alters-Karte
    // und damit fast immer sofort im Viewport — auf den ersten gemessen wuerde das
    // Event zu ~100 % feuern und nichts mehr ueber Scrolltiefe aussagen.
    var ctas = planCtas();
    var cta = ctas[ctas.length - 1];
    if (cta && typeof IntersectionObserver === 'function') {
      var observer = new IntersectionObserver(function (entries) {
        if (!entries.some(function (e) { return e.isIntersecting; })) return;
        observer.disconnect();
        pushDataLayer({
          event: 'quiz_report_cta_seen',
          quiz_top1: params.top[0] || '',
        });
      }, { threshold: 1 });
      observer.observe(cta);
    }

    document.addEventListener('click', function (e) {
      if (!e.target || typeof e.target.closest !== 'function') return;
      var link = e.target.closest('a[href*="/products/lifetime-age-dna"], [data-plan-cta]');
      if (!link || !link.closest('main')) return;
      pushDataLayer({
        event: 'quiz_report_cta_click',
        quiz_top1: params.top[0] || '',
        report_cta_source: link.getAttribute('data-plan-cta') || 'pdp_link',
      });
      // kein preventDefault — der Link navigiert normal weiter
    });
  }

  function init() {
    document.querySelectorAll('[data-lt-plan]').forEach(function (root) {
      if (root.__ltPlan) return;
      root.__ltPlan = true;

      var params = readParams();
      renderEstimate(root, params);
      renderThemes(root, params);
      decorateCtas(params);
      bindTracking(params);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
