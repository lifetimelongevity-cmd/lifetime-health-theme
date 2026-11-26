/* ERZEUGT von docs/pilotpraxis/bauen.py aus docs/pilotpraxis/pilotpraxis-v2.js. Nicht von Hand ändern.
   Pruefsumme: 2c65d95795a45931aa292a30cf89b7986370fce59075c2d7784bfeb5991af2e6 */
/* Pilotpraxis-Verkaufsseite, Fassung 2 (VSL-Aufbau, 23.11.2026). Quelle: docs/pilotpraxis/pilotpraxis-v2.js
   Wird im <head> ohne defer geladen: setzt Zustand und Schalter, bevor die Seite malt.

   ======================================================================
   KONFIGURATION: Jede Lieferung ist genau ein Eintrag hier.
   ====================================================================== */
window.PP_KONFIG = {
  // Zeitpunkte, Europe/Berlin (im November und Dezember gilt +01:00)
  start: '2026-11-22T18:00:00+01:00',
  preisende: '2026-12-15T23:59:59+01:00',       // 299 € gelten bis zum Anmeldeschluss (BJ 24.11.2026). Der Shopify-Rabatt 2409825337719 muss zur selben Sekunde enden
  anmeldeschluss: '2026-12-15T23:59:59+01:00',  // BJ 23.11.2026

  schalter: {
    pub200: false,     // „über 200 wissenschaftliche Veröffentlichungen“ (erst mit Publikationsliste)
    chat: false        // Chat-Blase (Shopify Inbox) liegt mobil auf dem Knopf
  },

  preis: { jetzt: 299, regulaer: 395 },
  testVariante: 42825878929508,
  produktHandle: 'agedna-pilotpraxis',          // Zustand „voll“ über /products/<handle>.js
  testseite: '/products/lifetime-age-dna',
  publikationsliste: '',

  klaviyo: {
    companyId: 'Tp4TCT',
    revision: '2026-07-15',
    listeWarteliste: 'Ykzy77'
  },

  faecher: {
    kardiologie: {
      name: 'Kardiologie',
      quelle: 'pilot-kardio',
      variante: null,       // Pilot-Variante Kardiologie (Shopify S1), ohne sie liegt nur der Test in der Kasse
      code: 'PILOTPRAXIS',  // Praxis-Code (Shopify DiscountCodeNode/2418591859063: 96 € auf die Variante „Test“, bis 15.12.2026 23:59, einmal je Kunde). Der Knopf setzt ihn in den Kauflink, leer = kein Code
      video45: '',          // VSL 4:5 (Shopify-Dateien-URL), das Format des Films (BJ 24.11.2026)
      videoHoch: '',        // VSL 9:16, nur als Ausweichdatei, falls es keine 4:5-Datei gibt
      videoDauer: '1:33',   // steht am Knopf „Mit Ton ansehen“ (Rohfassung 9 vom 24.11.2026: 92,7 s)
      musterPdf: ''         // Muster-Auswertung als PDF (Shopify S2), ohne Adresse erscheint kein Link
    },
    orthopaedie: {
      name: 'Orthopädie',
      quelle: 'pilot-ortho',
      variante: null,
      code: 'PILOTPRAXIS',
      videoHoch: '',
      video45: '',
      videoDauer: '',
      musterPdf: ''
    }
  }
};

/* ======================= ab hier keine Inhalte mehr ======================= */
(function () {
  'use strict';
  var K = window.PP_KONFIG;
  var html = document.documentElement;
  var fach = html.getAttribute('data-pp-fach') || 'kardiologie';
  var F = K.faecher[fach];
  var url = new URL(window.location.href);
  var q = url.searchParams;
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  html.classList.add('pp-js');
  if (ruhig) html.classList.add('pp-ruhig');

  // Vorschau-Parameter nur lokal oder in einem nicht veröffentlichten Theme
  var host = window.location.hostname;
  var themeRolle = window.Shopify && window.Shopify.theme && window.Shopify.theme.role;
  var vorschau = host === 'localhost' || host === '127.0.0.1' ||
    (themeRolle && themeRolle !== 'main') || !!(window.Shopify && window.Shopify.designMode);

  var schalter = {};
  Object.keys(K.schalter).forEach(function (k) { schalter[k] = !!K.schalter[k]; });
  var jetzt = new Date();
  var jetztFest = false;

  if (vorschau) {
    (q.get('pp_an') || '').split(',').forEach(function (k) { if (k in schalter) schalter[k] = true; });
    (q.get('pp_aus') || '').split(',').forEach(function (k) { if (k in schalter) schalter[k] = false; });
    if (q.get('pp_jetzt')) { var d = new Date(q.get('pp_jetzt')); if (!isNaN(d)) { jetzt = d; jetztFest = true; } }
    // Videodatei vor dem Eintragen prüfen: ?pp_video=<URL> (Shopify-CDN, relativ oder Datei im selben Ordner)
    var pv = q.get('pp_video');
    if (pv && /^(https:\/\/cdn\.shopify\.com\/|\/|[a-z0-9._-]+\.mp4$)/i.test(pv)) {
      F = Object.assign({}, F, { video45: pv });
      if (q.get('pp_blockiert')) HTMLMediaElement.prototype.play = function () { return Promise.reject(new Error('blockiert (Vorschau)')); };
    }
    var pc = q.get('pp_code');
    if (pc && /^[A-Za-z0-9-]{3,30}$/.test(pc)) F = Object.assign({}, F, { code: pc });
    var pm = q.get('pp_muster');
    if (pm && /^(https:\/\/cdn\.shopify\.com\/|\/)/i.test(pm)) F = Object.assign({}, F, { musterPdf: pm });
  }

  var tStart = new Date(K.start);
  var tPreis = new Date(K.preisende);
  var tSchluss = new Date(K.anmeldeschluss);
  var nachPreis = jetzt > tPreis;

  var zustand = jetzt > tSchluss ? 'geschlossen' : 'offen';
  var zustandFest = false;
  if (vorschau && /^(offen|voll|geschlossen)$/.test(q.get('pp_zustand') || '')) {
    zustand = q.get('pp_zustand');
    zustandFest = true;
  }

  // Schalter als Klassen: CSS blendet [data-wenn] / [data-wenn-nicht] passend ein und aus
  Object.keys(schalter).forEach(function (k) { if (schalter[k]) html.classList.add('ppan-' + k); });
  if (nachPreis) html.classList.add('ppan-nachpreis');
  if (F.videoHoch || F.video45) html.classList.add('ppan-video');
  if (F.musterPdf) html.classList.add('ppan-musterpdf');
  html.setAttribute('data-pp-zustand', zustand);

  // Headline aus fester Liste: Die Anzeige setzt ihren Hook über ?h=, ohne Parameter steht der Hook des Videos.
  // Ein Eintrag ist ein Satz oder ein Paar [Satz, leisere zweite Zeile, kleine Zeile darunter]; das Paar ersetzt auch die Zeile unter der Headline
  var HEADLINES = {
    a2: 'Kein Außendienst, kein Prospekt. Prüfen Sie es an sich selbst, bevor Sie es einem Patienten empfehlen.',
    a3: 'Sie messen jeden Tag bei anderen. Was misst man bei Ihnen?',
    t1: 'Testen Sie unseren Epigenetik & DNA-Test zuerst an sich selbst. Dann entscheiden Sie, ob er in Ihre Sprechstunde gehört.'
  };
  var HEADLINES_FACH = {
    orthopaedie: {
      o2: '60 % der Schmerzfreien mit 50 haben im MRT eine Vorwölbung. Den Muskel misst kaum jemand.',
      o1: 'Röntgen und MRT zeigen das Gerüst. Den Muskel, der es trägt, misst kaum jemand.',
      o1s: 'Ihr eigener Muskelschwund-Wert, epigenetisch gemessen: In sechs Wochen haben Sie ihn.'
    },
    kardiologie: {
      // Meta-Anzeigen Kardiologie (26.11.2026): Satz und Zahl der Anzeige stehen im ersten Bildschirm
      p1: ['Personalisierte Kardiologie beginnt mit der DNA.', 'LDL 160, gleicher Rat: 132 und 157.', 'Zwei Patienten nach 3 Monaten. Beispielwerte.'],
      s1: ['Bieten Sie den Epigenetik & DNA-Test in Ihrer Praxis an.', 'Testen Sie ihn zuerst an sich selbst, zum Selbstkostenpreis.'],
      // ohne die 28 %: Der Beleg dazu steht seit 25.11.2026 nicht mehr auf der Seite
      k1: ['„Ich esse doch gesund.“ Und das LDL bleibt hoch.', 'Die DNA zeigt vorab, bei wem Ernährung allein nicht reicht.'],
      k1s: 'Wie ist Ihr eigenes Cholesterin veranlagt? In sechs Wochen sehen Sie es auf einer Skala.',
      k3: 'Belastungs-EKG unauffällig. Wie alt arbeitet der Körper dahinter?'
    }
  };
  var hKey = (q.get('h') || '').toLowerCase();
  var headline = HEADLINES[hKey] || (HEADLINES_FACH[fach] || {})[hKey] || null;
  var headlineLeise = '', headlineKlein = '';
  if (headline && typeof headline !== 'string') { headlineLeise = headline[1] || ''; headlineKlein = headline[2] || ''; headline = headline[0]; }
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
    if (F.code) p = 'discount=' + encodeURIComponent(F.code) + '&' + p;
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

  function alle(sel, wurzel) { return Array.prototype.slice.call((wurzel || document).querySelectorAll(sel)); }
  function jetztZeit() { return jetztFest ? jetzt : new Date(); }

  function restText(ziel) {
    var ms = ziel - jetztZeit();
    if (ms <= 0) return '';
    var tage = Math.floor(ms / 864e5);
    if (tage >= 1) return 'noch ' + tage + (tage === 1 ? ' Tag' : ' Tage');
    var std = Math.ceil(ms / 36e5);
    return 'noch ' + std + (std === 1 ? ' Stunde' : ' Stunden');
  }

  function aufbauen() {
    if (headline) {
      alle('[data-pp-headline]').forEach(function (el) { el.textContent = headline; el.classList.remove('pp-wechsel'); el.removeAttribute('aria-label'); });
      if (headlineLeise) {
        var unter = document.querySelector('.pp-hero__unter');
        var ziel = unter;
        if (unter) unter.textContent = headlineLeise;
        else alle('[data-pp-headline]').forEach(function (el) { ziel = document.createElement('span'); ziel.textContent = headlineLeise; el.appendChild(ziel); });
        if (headlineKlein && ziel) { var kl = document.createElement('small'); kl.textContent = headlineKlein; ziel.appendChild(kl); }
      }
      html.classList.remove('ppan-h-wahl');
    }

    var link = kauflink();
    alle('a[data-pp-kauf]').forEach(function (a) {
      a.setAttribute('href', link);
      a.addEventListener('click', function () { melden('knopf_klick', { block: a.getAttribute('data-pp-kauf') }); });
    });
    alle('a[data-pp-testseite]').forEach(function (a) { a.setAttribute('href', K.testseite); });
    if (K.publikationsliste) alle('a[data-pp-publikationsliste]').forEach(function (a) { a.setAttribute('href', K.publikationsliste); });
    if (F.musterPdf) alle('a[data-pp-muster]').forEach(function (a) {
      a.setAttribute('href', F.musterPdf);
      a.addEventListener('click', function () { melden('muster_pdf'); });
    });
    alle('[data-pp-dauer]').forEach(function (el) { el.textContent = F.videoDauer ? ' · ' + F.videoDauer + ' min' : ''; });

    // Frist: Preisende und Anmeldeschluss fallen auf den 15.12. (BJ 24.11.2026). Liegt das Preisende wieder früher, zählt die Seite erst darauf, dann auf den Anmeldeschluss.
    var ziel = nachPreis ? tSchluss : tPreis;
    function fristAktualisieren() {
      alle('[data-pp-rest]').forEach(function (el) { el.textContent = restText(ziel); });
      var ms = Math.max(0, ziel - jetztZeit());
      var werte = { tage: Math.floor(ms / 864e5), std: Math.floor(ms / 36e5) % 24, min: Math.floor(ms / 6e4) % 60, sek: Math.floor(ms / 1000) % 60 };
      var uhr = werte.tage + (werte.tage === 1 ? ' Tag ' : ' Tage ') + werte.std + ' Std. ' + werte.min + ' Min.';
      alle('[data-pp-uhr]').forEach(function (el) { if (el.textContent !== uhr) el.textContent = uhr; });
      // Leiste oben: Tage, Stunden, Minuten, Sekunden bis zum echten Ende (der Praxis-Code läuft zur selben Sekunde ab)
      ziffern.forEach(function (el) {
        var name = el.getAttribute('data-pp-z');
        var text = name === 'tage' ? String(werte.tage) : (werte[name] < 10 ? '0' : '') + werte[name];
        if (el.textContent !== text) el.textContent = text;
        if (name === 'tage' && el.nextElementSibling) el.nextElementSibling.textContent = werte.tage === 1 ? 'Tag' : 'Tage';
      });
    }
    var ziffern = alle('[data-pp-z]');
    fristAktualisieren();
    setInterval(fristAktualisieren, 1000);

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
          }
        })
        .catch(function () {});
    }

    formulare();
    video();
    einblenden();
    tafel();
    reiter();
    fragen();
    rollen();
    leisten();
    melden('seite_geladen', { h: headline ? hKey : 'vsl' });
  }

  // ---------- Warteliste (Klaviyo Client-API) ----------
  function formulare() {
    alle('form[data-pp-form]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var mail = ((form.querySelector('[name=email]') || {}).value || '').trim();
        var praxis = ((form.querySelector('[name=praxis]') || {}).value || '').trim();
        var meldung = form.querySelector('[data-pp-meldung]');
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)) {
          meldung.textContent = 'Bitte prüfen Sie Ihre E-Mail-Adresse.';
          return;
        }
        var props = { fach: F.name, quelle: 'seite-warteliste', warteliste: 'Ja', erinnerung: 'Nein' };
        if (praxis) props.praxis = praxis.slice(0, 120);
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
                custom_source: 'Pilot Warteliste ' + (fach === 'orthopaedie' ? 'Orthopaedie' : 'Kardiologie'),
                profile: { data: { type: 'profile', attributes: { email: mail, properties: props,
                  subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } } } } }
              },
              relationships: { list: { data: { type: 'list', id: K.klaviyo.listeWarteliste } } }
            }
          })
        }).then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.classList.add('pp-form--fertig');
          melden('warteliste', { praxis: praxis ? 'ja' : 'nein' });
        }).catch(function () {
          knopf.disabled = false;
          meldung.textContent = 'Das hat nicht geklappt. Bitte versuchen Sie es noch einmal oder schreiben Sie an info@lifetime-health.com.';
        });
      });
    });
  }

  // ---------- Video im Hero: stumm automatisch, „Mit Ton ansehen“ startet von vorn ----------
  function video() {
    var box = document.querySelector('[data-pp-vsl]');
    if (!box) return;
    var v = box.querySelector('video');
    // Quelle: Adresse aus der Konfiguration (Shopify-Dateien), sonst die Datei, die mit dem Theme mitreist (data-src am <video>)
    var quelle = F.video45 || F.videoHoch || v.getAttribute('data-src') || '';
    if (!quelle) return;
    box.classList.add('pp-vsl--video');
    if (!F.video45 && quelle === F.videoHoch) box.classList.add('pp-vsl--hoch');
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
    v.addEventListener('ended', function () {
      box.classList.add('pp-vsl--ende');
      v.controls = false;
    });
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
    alle('[data-pp-ton]', box).forEach(function (k) { k.addEventListener('click', tonAn); });
  }

  // ---------- Zahlen hochzählen ----------
  function zaehlen(el, von, bis, ms, dez) {
    if (ruhig) { el.textContent = bis.toFixed(dez).replace('.', ','); return; }
    var t0 = null;
    function schritt(t) {
      if (t0 === null) t0 = t;
      var a = Math.min(1, (t - t0) / ms);
      var e = 1 - Math.pow(1 - a, 3);
      el.textContent = (von + (bis - von) * e).toFixed(dez).replace('.', ',');
      if (a < 1) requestAnimationFrame(schritt);
    }
    requestAnimationFrame(schritt);
  }
  // ---------- Tafel „Zwei Patienten“: vier Schritte, läuft von selbst, antippbar ----------
  function tafel() {
    var el = document.querySelector('[data-pp-tafel]');
    if (!el) return;
    var DAUER = [3400, 3800, 3000, 5200, 4600];   // je Textzeile; Bildzustände gibt es vier, Zeile 5 steht auf Bild 4
    var knoepfe = alle('[data-pp-schritt]', el);
    var ldl = alle('[data-pp-ldl]', el);
    var schritt = -1, uhr = null, sichtbar = false, gehalten = false;

    function setzen(i) {
      var vorher = schritt;
      schritt = i;
      el.setAttribute('data-schritt', String(Math.min(i + 1, 4)));
      el.setAttribute('data-zeile', String(i + 1));
      el.style.setProperty('--pp-dauer', DAUER[i] + 'ms');
      knoepfe.forEach(function (k, n) {
        k.setAttribute('aria-current', n === i ? 'step' : 'false');
        k.classList.toggle('ist-durch', n < i);
      });
      ldl.forEach(function (z) {
        var ziel = i >= 1 ? parseInt(z.getAttribute('data-pp-ldl'), 10) : 160;
        var von = parseInt(z.textContent, 10) || 160;
        if (von !== ziel) zaehlen(z, von, ziel, vorher === 0 && i === 1 ? 1200 : 300, 0);
      });
      planen();
    }
    function planen() {
      clearTimeout(uhr);
      el.classList.toggle('laeuft', sichtbar && !gehalten && !ruhig);
      if (!sichtbar || gehalten || ruhig) return;
      uhr = setTimeout(function () { setzen((schritt + 1) % DAUER.length); }, DAUER[schritt]);
    }
    knoepfe.forEach(function (k, n) {
      k.addEventListener('click', function () { gehalten = true; setzen(n); melden('tafel_schritt', { schritt: n + 1 }); });
    });
    if (ruhig || !('IntersectionObserver' in window)) { setzen(DAUER.length - 1); return; }
    setzen(0);
    new IntersectionObserver(function (e) {
      var war = sichtbar;
      sichtbar = e[0].isIntersecting;
      if (sichtbar && !war && !gehalten) setzen(0); else planen();
    }, { threshold: 0.45 }).observe(el);
  }

  // ---------- Reiter der Muster-Auswertung ----------
  function reiter() {
    alle('[data-pp-reiter]').forEach(function (gruppe) {
      var tabs = alle('[data-pp-tab]', gruppe);
      var bilder = alle('[data-pp-bild]', gruppe);
      function zeigen(name, vonHand) {
        tabs.forEach(function (t) {
          var an = t.getAttribute('data-pp-tab') === name;
          t.setAttribute('aria-selected', an ? 'true' : 'false');
          t.tabIndex = an ? 0 : -1;
        });
        bilder.forEach(function (b) { b.classList.toggle('ist-an', b.getAttribute('data-pp-bild') === name); });
        if (vonHand) melden('muster_reiter', { reiter: name });
      }
      tabs.forEach(function (t, n) {
        t.addEventListener('click', function () { zeigen(t.getAttribute('data-pp-tab'), true); });
        t.addEventListener('keydown', function (ev) {
          if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft' && ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
          ev.preventDefault();
          var vor = ev.key === 'ArrowRight' || ev.key === 'ArrowDown';
          var ziel = tabs[(n + (vor ? 1 : tabs.length - 1)) % tabs.length];
          ziel.focus();
          zeigen(ziel.getAttribute('data-pp-tab'), true);
        });
      });
    });
  }

  // ---------- Fragen: auf und zu ----------
  function fragen() {
    alle('[data-pp-frage]').forEach(function (knopf) {
      var antwort = document.getElementById(knopf.getAttribute('aria-controls'));
      knopf.addEventListener('click', function () {
        var auf = knopf.getAttribute('aria-expanded') !== 'true';
        knopf.setAttribute('aria-expanded', auf ? 'true' : 'false');
        if (antwort) antwort.classList.toggle('ist-auf', auf);
        if (auf) melden('frage_auf', { frage: knopf.getAttribute('data-pp-frage') });
      });
    });
  }

  // ---------- Ablauf-Linie zeichnet sich mit dem Scrollstand ----------
  function rollen() {
    var teile = alle('[data-pp-roll]');
    if (!teile.length) return;
    if (ruhig) { teile.forEach(function (el) { el.style.setProperty('--p', '1'); }); return; }
    var geplant = false;
    function setzen() {
      geplant = false;
      var vh = window.innerHeight;
      teile.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var p = el.getAttribute('data-pp-roll') === 'durch'
          ? (vh * 0.78 - r.top) / Math.max(1, r.height)
          : (vh - r.top) / (vh * 0.7);
        el.style.setProperty('--p', String(Math.max(0, Math.min(1, p)).toFixed(3)));
      });
    }
    function anstossen() { if (!geplant) { geplant = true; requestAnimationFrame(setzen); } }
    window.addEventListener('scroll', anstossen, { passive: true });
    window.addEventListener('resize', anstossen);
    setzen();
  }

  // ---------- Messwerte füllen sich, sobald sie im Bild sind (kein Einblenden von Abschnitten) ----------
  function einblenden() {
    var teile = alle('[data-pp-ein]');
    if (ruhig || !('IntersectionObserver' in window)) { teile.forEach(function (el) { el.classList.add('ist-da'); }); return; }
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ist-da'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    teile.forEach(function (el) { io.observe(el); });
  }

  // ---------- Kopfzeile und feste Leiste unten (mobil) ----------
  function leisten() {
    var kopf = document.querySelector('[data-pp-kopf]');
    var leiste = document.querySelector('[data-pp-sticky]');
    var imBild = 0;
    var bereit = false;
    setTimeout(function () { bereit = true; setzen(); }, 900);
    // Die Leiste unten erscheint nur, solange kein Kaufknopf im Bild ist
    if (leiste && 'IntersectionObserver' in window) {
      var sichtbar = [];
      var io = new IntersectionObserver(function (eintraege) {
        eintraege.forEach(function (e) {
          var n = sichtbar.indexOf(e.target);
          if (e.isIntersecting && n < 0) sichtbar.push(e.target);
          if (!e.isIntersecting && n >= 0) sichtbar.splice(n, 1);
        });
        imBild = sichtbar.length;
        setzen();
      });
      alle('a[data-pp-kauf]').forEach(function (a) {
        var ort = a.getAttribute('data-pp-kauf');
        if (ort !== 'sticky' && ort !== 'kopf') io.observe(a);
      });
      // Solange „Mit Ton ansehen“ im Bild ist, bleibt die Leiste weg: Sie läge sonst auf dem Knopf (26.11.2026)
      alle('.pp-ton').forEach(function (k) { io.observe(k); });
    }
    var geplant = false;
    function setzen() {
      geplant = false;
      if (kopf) kopf.classList.toggle('ist-fest', window.scrollY > 12);
      // Mobil ist immer ein Kaufknopf erreichbar: Die Leiste steht, solange keiner im Bild ist (auch beim Laden über dem Falz)
      if (leiste) leiste.classList.toggle('pp-sticky--an', bereit && imBild === 0);
    }
    window.addEventListener('scroll', function () { if (!geplant) { geplant = true; requestAnimationFrame(setzen); } }, { passive: true });
    window.addEventListener('resize', setzen);
    setzen();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aufbauen);
  else aufbauen();

  window.PP = { zustand: function () { return zustand; }, kanal: kanal, ad: ad, kauflink: kauflink, vorschau: vorschau };
})();
