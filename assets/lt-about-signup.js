/*
  LIFETIME — lt-about-signup.js
  Anmeldung für die Founder-Mails auf /pages/ueber-lifetime.

  Zwei Wege, bewusst in dieser Reihenfolge:
  1. Ist Klaviyo konfiguriert (Public Key UND Listen-ID gesetzt), geht die
     Adresse per Client-Subscribe direkt an Klaviyo und startet dort den
     Welcome-Flow F3 (lifetime-klaviyo/flow-map.md § F3).
  2. Ist die Listen-ID leer, passiert hier nichts: das native Shopify-
     Customer-Formular postet wie bisher auf /contact. Ohne JS ebenso.
     Progressive Enhancement, kein Blindflug.

  Die Adresse geht NIE an beide Systeme — sonst laufen Shopify-Mails und
  Klaviyo-Flow parallel (gleiche Regel wie im Quiz-Gate, lt-quiz-v2.js).

  Endpoint und Revision sind mit lt-quiz-v2.js identisch gehalten. Wer
  eines ändert, ändert beide.
*/
(function () {
  'use strict';

  var KLAVIYO_ENDPOINT = 'https://a.klaviyo.com/client/subscriptions/';
  // Klaviyo versioniert per Datum. Stand wie im Quiz-Gate (2026-08-06).
  var KLAVIYO_REVISION = '2026-07-15';

  // Echte Formatprüfung, nicht „enthält ein @". Bei Single-Opt-in gibt es
  // keine Bestätigungsmail, die einen Tippfehler noch abfangen würde.
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function readConfig(root) {
    return {
      companyId: (root.dataset.klaviyoCompanyId || '').trim(),
      listId: (root.dataset.klaviyoListId || '').trim(),
      source: (root.dataset.klaviyoSource || 'Über LIFETIME').trim()
    };
  }

  function isConfigured(cfg) {
    return !!(cfg.companyId && cfg.listId);
  }

  async function subscribe(cfg, email) {
    var body = {
      data: {
        type: 'subscription',
        attributes: {
          custom_source: cfg.source,
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email: email,
                // Nur der E-Mail-Kanal. Der Endpoint respektiert die
                // Opt-in-Einstellung der LISTE, nicht diesen Code.
                subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } }
              }
            }
          }
        },
        relationships: {
          list: { data: { type: 'list', id: cfg.listId } }
        }
      }
    };

    var res = await fetch(
      KLAVIYO_ENDPOINT + '?company_id=' + encodeURIComponent(cfg.companyId),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/vnd.api+json', revision: KLAVIYO_REVISION },
        body: JSON.stringify(body)
      }
    );
    if (!res.ok) throw new Error('Klaviyo HTTP ' + res.status);
  }

  function init(root) {
    if (!root || root.dataset.ltSignupReady === '1') return;

    var cfg = readConfig(root);
    if (!isConfigured(cfg)) return; // Shopify-Formular übernimmt nativ

    var form = root.querySelector('form');
    var input = root.querySelector('[data-signup-input]');
    var button = root.querySelector('[data-signup-button]');
    var error = root.querySelector('[data-signup-error]');
    var success = root.querySelector('[data-signup-success]');
    if (!form || !input || !button || !error || !success) return;

    root.dataset.ltSignupReady = '1';
    var busyLabel = button.dataset.busyLabel || button.textContent;
    var idleLabel = button.textContent;

    function showError(message) {
      error.textContent = message;
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
    }

    function clearError() {
      error.hidden = true;
      input.removeAttribute('aria-invalid');
    }

    input.addEventListener('input', clearError);

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      clearError();

      var email = (input.value || '').trim();
      if (!EMAIL_RE.test(email)) {
        showError(root.dataset.errorInvalid || 'Diese E-Mail-Adresse sieht nicht vollständig aus. Bitte prüfe sie noch einmal.');
        input.focus();
        return;
      }

      button.disabled = true;
      button.textContent = busyLabel;

      try {
        await subscribe(cfg, email);
        form.hidden = true;
        success.hidden = false;
        // Fokus auf die Bestätigung, sonst landet er im Nichts.
        success.setAttribute('tabindex', '-1');
        success.focus();
        if (window.dataLayer && typeof window.dataLayer.push === 'function') {
          window.dataLayer.push({ event: 'founder_mail_signup', signup_source: cfg.source });
        }
      } catch (err) {
        button.disabled = false;
        button.textContent = idleLabel;
        showError(root.dataset.errorFailed || 'Die Anmeldung ist gerade nicht durchgegangen. Bitte versuche es in einem Moment noch einmal.');
      }
    });
  }

  function initAll() {
    document.querySelectorAll('[data-lt-about-signup]').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Theme-Editor: Section neu geladen
  document.addEventListener('shopify:section:load', function (event) {
    var root = event.target.querySelector('[data-lt-about-signup]');
    if (root) init(root);
  });
})();
