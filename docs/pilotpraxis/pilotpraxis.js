/* Pilotpraxis-Verkaufsseite (P2). Quelle: docs/pilotpraxis/pilotpraxis.js
   Wird im <head> ohne defer geladen: setzt Zustand und Schalter, bevor die Seite malt.

   ======================================================================
   KONFIGURATION: Jede offene Entscheidung und jede Lieferung ist genau
   ein Eintrag hier. Nach einer Änderung: python3 docs/pilotpraxis/bauen.py
   ====================================================================== */
window.PP_KONFIG = {
  // Zeitpunkte, Europe/Berlin (im November und Dezember gilt +01:00)
  start: '2026-11-22T18:00:00+01:00',        // vormerken → offen
  preisende: '2026-11-30T23:59:59+01:00',    // bis hier 299 € statt 395 €
  anmeldeschluss: '2026-11-30T23:59:59+01:00',
  // Vorschlag A (Entscheidung 1, BJ bis Do 19.11.): true schaltet auf
  // „299 € bis 30.11., danach 395 €, Anmeldeschluss 15.12.“ samt eigenem Wortlaut.
  vorschlagA: false,
  anmeldeschlussA: '2026-12-15T23:59:59+01:00',

  schalter: {
    garantie: false,   // „Ihr Urteil zählt“ (Entscheidung 3, BJ)
    pub200: false,     // „über 200 wissenschaftliche Veröffentlichungen“ (erst mit Publikationsliste)
    minuten15: false,  // „15 Minuten“ beim Kollegengespräch (Volker bestätigt Dauer)
    buch: true,        // Buchzeile mit Widmung
    firmenfeld: true,  // Feld „Firma“ in der Kasse optional (Entscheidung 7); aus = nur Antwort auf die Bestätigung
    zitat: false,      // Volkers Satz „Testen Sie es zuerst an sich selbst …“ (sein schriftliches Ja)
    chat: false        // Chat-Blase (Shopify Inbox). 4b: kein Chat auf der Verkaufsseite; mobil lag sie auf dem Knopf
  },

  preis: { jetzt: 299, regulaer: 395 },
  testVariante: 42825878929508,
  produktHandle: 'agedna-pilotpraxis',       // P5, Zustand „voll“ über /products/<handle>.js
  testseite: '/products/lifetime-age-dna',
  publikationsliste: '',                     // PDF-Adresse der Liste, die „über 200“ trägt (BJ, Volker)

  klaviyo: {                                  // P5, uebergaben/p5-kasse-mails.md
    companyId: 'Tp4TCT',
    revision: '2026-07-15',
    listeVormerkung: 'Ykzy77',
    listeWarteliste: 'Ykzy77'                 // eigene Warteliste: ID hier eintragen (P5)
  },

  faecher: {
    orthopaedie: {
      name: 'Orthopädie',
      quelle: 'pilot-ortho',
      variante: null,       // Pilot-Variante Orthopädie, liefert P5 nach F1
      video16x9: '',        // VSL 16:9 (Shopify-Dateien-URL), liefert P3
      video1x1: '',         // VSL 1:1 für schmale Bildschirme, liefert P3
      appDemo: ''           // App-Demo 60 s, liefert P3
    },
    kardiologie: {
      name: 'Kardiologie',
      quelle: 'pilot-kardio',
      variante: null,
      video16x9: '',
      video1x1: '',
      appDemo: ''
    }
  }
};

/* ======================= ab hier keine Inhalte mehr ======================= */
(function () {
  'use strict';
  var K = window.PP_KONFIG;
  var html = document.documentElement;
  var fach = html.getAttribute('data-pp-fach') || 'orthopaedie';
  var F = K.faecher[fach];
  var url = new URL(window.location.href);
  var q = url.searchParams;

  // Vorschau-Parameter nur lokal oder in einem nicht veröffentlichten Theme
  var host = window.location.hostname;
  var themeRolle = window.Shopify && window.Shopify.theme && window.Shopify.theme.role;
  var vorschau = host === 'localhost' || host === '127.0.0.1' ||
    (themeRolle && themeRolle !== 'main') || !!(window.Shopify && window.Shopify.designMode);

  var schalter = {};
  Object.keys(K.schalter).forEach(function (k) { schalter[k] = !!K.schalter[k]; });
  var vorschlagA = !!K.vorschlagA;
  var jetzt = new Date();

  if (vorschau) {
    (q.get('pp_an') || '').split(',').forEach(function (k) { if (k in schalter) schalter[k] = true; if (k === 'vorschlagA') vorschlagA = true; });
    (q.get('pp_aus') || '').split(',').forEach(function (k) { if (k in schalter) schalter[k] = false; if (k === 'vorschlagA') vorschlagA = false; });
    if (q.get('pp_jetzt')) { var d = new Date(q.get('pp_jetzt')); if (!isNaN(d)) jetzt = d; }
    // Videodatei vor dem Eintragen prüfen: ?pp_video=<URL> (gleiche Domain, Shopify-CDN oder relativ)
    var pv = q.get('pp_video');
    if (pv && /^(https:\/\/cdn\.shopify\.com\/|\/|[a-z0-9._-]+\.mp4$)/i.test(pv)) {
      F = Object.assign({}, F, { video16x9: pv, video1x1: pv });
      if (q.get('pp_blockiert')) HTMLMediaElement.prototype.play = function () { return Promise.reject(new Error('blockiert (Vorschau)')); };
    }
  }

  var tStart = new Date(K.start);
  var tPreis = new Date(K.preisende);
  var tSchluss = new Date(vorschlagA ? K.anmeldeschlussA : K.anmeldeschluss);
  var nachPreis = jetzt > tPreis;

  var zustand;
  if (jetzt < tStart) zustand = 'vormerken';
  else if (jetzt > tSchluss) zustand = 'geschlossen';
  else zustand = 'offen';
  var zustandFest = false;
  if (vorschau && /^(vormerken|offen|voll|geschlossen)$/.test(q.get('pp_zustand') || '')) {
    zustand = q.get('pp_zustand');
    zustandFest = true;
  }

  // Schalter als Klassen: CSS blendet [data-wenn] / [data-wenn-nicht] passend ein und aus
  Object.keys(schalter).forEach(function (k) { if (schalter[k]) html.classList.add('ppan-' + k); });
  if (vorschlagA) html.classList.add('ppan-vorschlagA');
  if (nachPreis) html.classList.add('ppan-nachpreis');
  if (F.video16x9 || F.video1x1) html.classList.add('ppan-video');
  if (F.appDemo) html.classList.add('ppan-appdemo');
  html.setAttribute('data-pp-zustand', zustand);

  // Headline aus fester Liste (4b § 10), ohne Parameter A1
  var HEADLINES = {
    a1: 'Ihre Patienten fragen nach ihrem biologischen Alter. Kennen Sie Ihres?',
    a2: 'Kein Außendienst, kein Prospekt. Prüfen Sie es an sich selbst, bevor Sie es einem Patienten empfehlen.',
    a3: 'Sie messen jeden Tag bei anderen. Was misst man bei Ihnen?',
    t1: 'Testen Sie AGE&DNA an sich selbst, bevor der erste Patient danach fragt.'
  };
  var HEADLINES_FACH = {
    orthopaedie: {
      o2: 'Bei jedem zweiten Schmerzfreien über 50 zeigt das MRT eine Bandscheibenvorwölbung. Und den Muskel, der die Wirbelsäule trägt, zeigt es nicht.',
      o1: 'Röntgen und MRT zeigen das Gerüst. Den Muskel, der es trägt, misst kaum jemand.',
      o1s: 'Wie viel Muskel hat Ihr eigener Körper noch? In sechs Wochen haben Sie die Zahl.'
    },
    kardiologie: {
      k1: '„Ich esse doch gesund.“ Und das LDL bleibt hoch. Nur 28 % der behandelten Patienten in Deutschland erreichen ihr LDL-Ziel.',
      k1s: 'Wie ist Ihr eigenes Cholesterin veranlagt? In sechs Wochen sehen Sie es auf einer Skala.',
      k3: 'Belastungs-EKG unauffällig. Wie alt arbeitet der Körper dahinter?'
    }
  };
  var hKey = (q.get('h') || '').toLowerCase();
  var headline = HEADLINES[hKey] || (HEADLINES_FACH[fach] || {})[hKey] || null;
  if (headline) html.classList.add('ppan-h-wahl');
  if (headline && headline.length > 90) html.classList.add('ppan-h-lang');

  // Weg der Bestellung: kanal und ad aus der URL, ohne Cookie, ohne Speicher
  var KANAELE = ['meta-formular', 'lead-mail', 'meta-direkt', 'netz', 'direkt'];
  var kanal = (q.get('kanal') || '').toLowerCase();
  if (KANAELE.indexOf(kanal) < 0) {
    var src = (q.get('utm_source') || '').toLowerCase();
    if (src === 'klaviyo') kanal = 'lead-mail';
    else if (/^(meta|facebook|fb|instagram|ig)$/.test(src)) kanal = 'meta-direkt';
    else kanal = 'direkt';
  }
  var ad = (q.get('utm_content') || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40);

  function kauflink() {
    var teile = K.testVariante + ':1';
    if (F.variante) teile += ',' + F.variante + ':1';
    var p = 'attributes[quelle]=' + encodeURIComponent(F.quelle) +
      '&attributes[kanal]=' + encodeURIComponent(kanal) +
      '&attributes[ad]=' + encodeURIComponent(ad || '-');
    return '/cart/' + teile + '?' + p;
  }

  // Ereignisse: dataLayer (GTM, Consent Mode) und Shopify Customer Events
  function melden(aktion, extra) {
    var daten = { event: 'pilotpraxis', pp_aktion: aktion, pp_fach: fach, pp_zustand: zustand, pp_kanal: kanal };
    if (extra) Object.keys(extra).forEach(function (k) { daten['pp_' + k] = extra[k]; });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(daten);
    try { if (window.Shopify && Shopify.analytics && Shopify.analytics.publish) Shopify.analytics.publish('pilotpraxis_' + aktion, daten); } catch (e) {}
    if (vorschau && window.console) console.log('[pilotpraxis]', aktion, daten);
  }

  var WTAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  function restText(ziel) {
    var ms = ziel - jetzt;
    if (ms <= 0) return '';
    var tage = Math.floor(ms / 864e5);
    if (tage >= 1) return 'noch ' + tage + (tage === 1 ? ' Tag' : ' Tage');
    var std = Math.ceil(ms / 36e5);
    return 'noch ' + std + (std === 1 ? ' Stunde' : ' Stunden');
  }

  function aufbauen() {
    var body = document.body;

    if (headline) {
      document.querySelectorAll('[data-pp-headline]').forEach(function (el) { el.textContent = headline; });
      html.classList.remove('ppan-h-wahl');
    }

    var link = kauflink();
    document.querySelectorAll('a[data-pp-kauf]').forEach(function (a) {
      a.setAttribute('href', link);
      a.addEventListener('click', function () { melden('knopf_klick', { block: a.getAttribute('data-pp-kauf') }); });
    });
    document.querySelectorAll('a[data-pp-testseite]').forEach(function (a) { a.setAttribute('href', K.testseite); });
    if (K.publikationsliste) document.querySelectorAll('a[data-pp-publikationsliste]').forEach(function (a) { a.setAttribute('href', K.publikationsliste); });

    function restAktualisieren() {
      jetzt = (vorschau && q.get('pp_jetzt')) ? jetzt : new Date();
      var ziel = (vorschlagA && !nachPreis) ? tPreis : tSchluss;
      document.querySelectorAll('[data-pp-rest]').forEach(function (el) { el.textContent = restText(ziel); });
    }
    restAktualisieren();
    setInterval(restAktualisieren, 60000);

    // Zustand „voll“: Verfügbarkeit der eigenen Pilot-Variante, ohne Zahl.
    // Schlägt der Abruf fehl, bleibt die Seite offen; den Überverkauf sperrt die Kasse.
    if (zustand === 'offen' && !zustandFest && F.variante && K.produktHandle) {
      fetch('/products/' + K.produktHandle + '.js', { credentials: 'same-origin' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (p) {
          var v = (p.variants || []).filter(function (x) { return String(x.id) === String(F.variante); })[0];
          if (v && v.available === false) {
            zustand = 'voll';
            html.setAttribute('data-pp-zustand', 'voll');
            videoZustand();
          }
        })
        .catch(function () {});
    }

    formulare();
    videoZustand();
    appDemo();
    sticky();
    melden('seite_geladen', { h: hKey || 'a1' });
  }

  // ---------- Mail-Feld: Vormerkung und Warteliste (Klaviyo Client-API) ----------
  function formulare() {
    document.querySelectorAll('form[data-pp-form]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var art = form.getAttribute('data-pp-form'); // vormerken | warteliste
        var mail = (form.querySelector('[name=email]') || {}).value || '';
        var praxis = ((form.querySelector('[name=praxis]') || {}).value || '').trim();
        var erinnerung = form.querySelector('[name=erinnerung]');
        var meldung = form.querySelector('[data-pp-meldung]');
        mail = mail.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
          meldung.textContent = 'Bitte prüfen Sie Ihre E-Mail-Adresse.';
          return;
        }
        var props = { fach: F.name, quelle: art === 'warteliste' ? 'seite-warteliste' : 'seite' };
        if (praxis) props.praxis = praxis.slice(0, 120);
        props.erinnerung = (erinnerung && erinnerung.checked) ? 'Ja' : 'Nein';
        if (art === 'warteliste') props.warteliste = 'Ja';
        var liste = art === 'warteliste' ? K.klaviyo.listeWarteliste : K.klaviyo.listeVormerkung;
        var quelleText = (art === 'warteliste' ? 'Pilot Warteliste ' : 'Pilot Seite ') + (fach === 'orthopaedie' ? 'Orthopaedie' : 'Kardiologie');
        var knopf = form.querySelector('button');
        knopf.disabled = true;
        meldung.textContent = '';
        fetch('https://a.klaviyo.com/client/subscriptions/?company_id=' + K.klaviyo.companyId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/vnd.api+json', revision: K.klaviyo.revision },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: quelleText,
                profile: { data: { type: 'profile', attributes: { email: mail, properties: props,
                  subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } } } } }
              },
              relationships: { list: { data: { type: 'list', id: liste } } }
            }
          })
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.classList.add('pp-form--fertig');
          melden(art === 'warteliste' ? 'warteliste' : 'vormerkung', { praxis: praxis ? 'ja' : 'nein' });
        }).catch(function () {
          knopf.disabled = false;
          meldung.textContent = 'Das hat nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie an info@lifetime-health.com.';
        });
      });
    });
  }

  // ---------- Video im Hero ----------
  var videoBereit = false;
  function videoZustand() {
    var box = document.querySelector('[data-pp-vsl]');
    if (!box) return;
    var quelle = window.matchMedia('(max-width: 699px)').matches ? (F.video1x1 || F.video16x9) : (F.video16x9 || F.video1x1);
    // Ohne Datei oder nach dem Anmeldeschluss (das Video nennt die Frist): Vorschaubild
    if (!quelle || zustand === 'geschlossen') { box.classList.remove('pp-vsl--video'); return; }
    if (videoBereit) return;
    videoBereit = true;
    box.classList.add('pp-vsl--video');
    if (quelle === F.video1x1 && F.video1x1) box.classList.add('pp-vsl--quadrat');
    var v = box.querySelector('video');
    var tonKnopf = box.querySelector('[data-pp-ton]');
    v.muted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.src = quelle;
    var gemeldet = {};
    v.addEventListener('loadedmetadata', function () { melden('video_geladen'); }, { once: true });
    v.addEventListener('timeupdate', function () {
      if (!v.duration) return;
      var pct = v.currentTime / v.duration * 100;
      [25, 50, 75, 95].forEach(function (s) {
        var key = s + (v.muted ? 'stumm' : 'ton');
        if (pct >= s && !gemeldet[key]) { gemeldet[key] = 1; melden('video_' + s, { ton: v.muted ? 'aus' : 'an' }); }
      });
    });
    v.addEventListener('ended', function () { box.classList.add('pp-vsl--ende'); });
    var p = v.play();
    if (p && p.then) {
      p.then(function () { melden('autostart_lief'); })
        .catch(function () { box.classList.add('pp-vsl--blockiert'); melden('autostart_blockiert'); });
    }
    function tonAn() {
      box.classList.remove('pp-vsl--blockiert', 'pp-vsl--ende');
      box.classList.add('pp-vsl--ton');
      v.muted = false;
      v.currentTime = 0;
      v.controls = true;
      v.play();
      melden('ton_an');
    }
    tonKnopf.addEventListener('click', tonAn);
  }

  // ---------- App-Demo (ohne Autostart) ----------
  function appDemo() {
    var box = document.querySelector('[data-pp-appdemo]');
    if (!box || !F.appDemo) return;
    var v = box.querySelector('video');
    v.src = F.appDemo;
    v.addEventListener('play', function () { melden('appdemo_start'); }, { once: true });
  }

  // ---------- Feste Leiste unten (mobil), sichtbar nach dem Hero ----------
  function sticky() {
    var leiste = document.querySelector('[data-pp-sticky]');
    var anker = document.querySelector('[data-pp-hero-ende]');
    var schluss = document.querySelector('[data-pp-schluss]');
    if (!leiste || !anker || !('IntersectionObserver' in window)) return;
    var nachHero = false, amSchluss = false;
    function setzen() { leiste.classList.toggle('pp-sticky--an', nachHero && !amSchluss); }
    new IntersectionObserver(function (e) {
      nachHero = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
      setzen();
    }).observe(anker);
    if (schluss) new IntersectionObserver(function (e) { amSchluss = e[0].isIntersecting; setzen(); }).observe(schluss);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aufbauen);
  else aufbauen();

  window.PP = { zustand: function () { return zustand; }, kanal: kanal, ad: ad, kauflink: kauflink, vorschau: vorschau };
})();
