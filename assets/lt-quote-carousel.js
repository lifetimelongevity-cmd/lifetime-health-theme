/**
 * PDP quote carousel (main-product lt_quote_carousel block).
 * Fade between slides, optional autoplay, dot navigation.
 */
(function () {
  function clearTimers(root) {
    if (root._ltQuoteAutoplay) {
      clearInterval(root._ltQuoteAutoplay);
      root._ltQuoteAutoplay = null;
    }
  }

  function goTo(root, index) {
    var slides = root.querySelectorAll('[data-lt-quote-slide]');
    var dots = root.querySelectorAll('[data-lt-quote-dot]');
    var n = slides.length;
    if (n === 0) return;
    var i = ((index % n) + n) % n;
    slides.forEach(function (s, j) {
      s.classList.toggle('is-active', j === i);
      s.setAttribute('aria-hidden', j === i ? 'false' : 'true');
    });
    dots.forEach(function (d, j) {
      var on = j === i;
      d.classList.toggle('is-active', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    root._ltQuoteIndex = i;
  }

  function startAutoplay(root) {
    clearTimers(root);
    var slides = root.querySelectorAll('[data-lt-quote-slide]');
    if (slides.length < 2) return;
    var sec = parseInt(root.getAttribute('data-autoplay-seconds'), 10);
    if (!sec || sec < 1) return;
    root._ltQuoteAutoplay = setInterval(function () {
      var list = root.querySelectorAll('[data-lt-quote-slide]');
      var next = (root._ltQuoteIndex || 0) + 1;
      goTo(root, next >= list.length ? 0 : next);
    }, sec * 1000);
  }

  function bind(root) {
    if (root.getAttribute('data-lt-quote-bound') === '1') return;
    root.setAttribute('data-lt-quote-bound', '1');

    root.querySelectorAll('[data-lt-quote-dot]').forEach(function (dot) {
      dot.addEventListener('click', function () {
        var idx = parseInt(dot.getAttribute('data-index'), 10);
        goTo(root, idx);
        clearTimers(root);
        startAutoplay(root);
      });
    });

    root.addEventListener('mouseenter', function () {
      clearTimers(root);
    });
    root.addEventListener('mouseleave', function () {
      startAutoplay(root);
    });

    goTo(root, 0);
    startAutoplay(root);
  }

  function scan(container) {
    (container || document).querySelectorAll('[data-lt-quote-carousel]').forEach(bind);
  }

  document.addEventListener('DOMContentLoaded', function () {
    scan(document);
  });

  document.addEventListener('shopify:section:load', function (ev) {
    scan(ev.target);
  });

  document.addEventListener('shopify:section:unload', function (ev) {
    ev.target.querySelectorAll('[data-lt-quote-carousel]').forEach(function (root) {
      clearTimers(root);
    });
  });
})();
