/* 02 · ATELIER — the logo dock (FLIP), rule draws, image reveals, apply steps */
(function () {
  'use strict';
  var WA = window.WA;
  var reduce = WA.reduce;

  /* ------------------------------------------------------------------ */
  /* T3 — the centred logo docks to the inline-start on scroll.         */
  /* Measured FLIP: read first, toggle, read last, invert, play.        */
  /* ------------------------------------------------------------------ */
  var nav = WA.$('.nav--center');
  if (nav) {
    var brand = WA.$('.brand', nav);
    var docked = false;
    function apply(dock, animate) {
      var first = brand.getBoundingClientRect();
      nav.classList.toggle('is-docked', dock);
      docked = dock;
      if (!animate || reduce.matches) return;
      var last = brand.getBoundingClientRect();
      var dx = first.left - last.left;
      var dy = first.top - last.top;
      if (!dx && !dy) return;
      brand.animate(
        [
          { transform: 'translate(' + dx + 'px,' + dy + 'px)' },
          { transform: 'translate(0,0)' },
        ],
        { duration: 420, easing: 'cubic-bezier(.65,0,.35,1)' }
      );
    }
    var lastY = window.scrollY;
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      if (Math.abs(y - lastY) < 8) { ticking = false; return; }
      lastY = y;
      if (!docked && y > 40) apply(true, true);
      else if (docked && y < 32) apply(false, true);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    apply(false, false);
  }

  /* ------------------------------------------------------------------ */
  /* T1 — the arc of portraits fans in, centre first                    */
  /* ------------------------------------------------------------------ */
  var arc = WA.$('[data-arc]');
  if (arc) {
    var items = WA.$$('.arc__item', arc);
    if (reduce.matches) {
      items.forEach(function (it) { it.style.opacity = 1; });
    } else {
      items.forEach(function (it, i) {
        var rot = it.style.getPropertyValue('--rot') || '0deg';
        var delay = Math.abs(i - 3) * 70;
        it.animate(
          [
            { opacity: 0, transform: 'translateX(-50%) rotate(0deg) translateY(24px)' },
            { opacity: 1, transform: 'translateX(-50%) rotate(' + rot + ') translateY(0)' },
          ],
          { duration: 900, delay: delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
        );
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* T6 — hairline rules draw from the inline-start                      */
  /* ------------------------------------------------------------------ */
  var rules = WA.$$('[data-rule]');
  if (rules.length) {
    if (reduce.matches) rules.forEach(function (r) { r.classList.add('is-drawn'); });
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-drawn'); io.unobserve(en.target); }
        });
      }, { threshold: 0.2 });
      rules.forEach(function (r) { io.observe(r); });
    }
  }

  /* ------------------------------------------------------------------ */
  /* T4 — clip-path reveal on editorial media                            */
  /* ------------------------------------------------------------------ */
  if (!reduce.matches) {
    var media = WA.$$('.faculty__img, .course-row__media, .bento__item--photo img');
    var anims = [];
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || reduce.matches) return;
        anims.push(en.target.animate(
          [
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0 0)' },
          ],
          { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
        ));
        reveal.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    media.forEach(function (m) { reveal.observe(m); });
    if (reduce.addEventListener) reduce.addEventListener('change', function () {
      if (reduce.matches) anims.forEach(function (a) { try { a.finish(); } catch (e) {} });
    });
  }

})();
