/* 01 · NOVA — template-specific motion */
(function () {
  'use strict';
  var WA = window.WA;
  var reduce = WA.reduce;

  /* M7 — the loop line draws through the four steps */
  WA.$$('[data-steps]').forEach(function (root) {
    var path = WA.$('.steps__line path', root);
    if (path) {
      var len = path.getTotalLength();
      path.style.setProperty('--len', len);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        root.classList.add('is-drawn');
        if (!reduce.matches) {
          WA.$$('.step', root).forEach(function (step, i) {
            setTimeout(function () { step.classList.add('is-active'); }, 320 * i);
          });
        } else {
          WA.$$('.step', root).forEach(function (s) { s.classList.add('is-active'); });
        }
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(root);
  });

  /* M3 — hero parallax on the five floating shapes (one pointer listener) */
  var hero = WA.$('.hero__art');
  if (hero && !reduce.matches && window.matchMedia('(pointer: fine)').matches) {
    var shapes = WA.$$('[data-depth]', hero);
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function tick() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      shapes.forEach(function (s) {
        var d = parseFloat(s.getAttribute('data-depth')) || 0.1;
        s.style.transform = 'translate3d(' + (cx * d * 100).toFixed(2) + 'px,' + (cy * d * 100).toFixed(2) + 'px,0)';
      });
      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
      else raf = null;
    }
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener('pointerleave', function () {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    });
  }

  /* hero/property-shape entrance: settle the rotated card without a transform fight */
  WA.$$('.hero__float--badge').forEach(function (el) {
    el.animate(
      [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
      { duration: 520, delay: 900, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }
    );
  });

  /* carry ?q= from the hero search into the catalogue filter */
  var params = new URLSearchParams(location.search);
  var q = params.get('q');
  if (q) {
    var input = WA.$('[data-filter-search]');
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event('input'));
    }
  }

  /* single-open FAQ <details> */
  WA.$$('[data-faq] details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) WA.$$('[data-faq] details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
