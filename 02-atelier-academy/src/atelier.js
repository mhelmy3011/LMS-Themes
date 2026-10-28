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
    var media = WA.$$('.faculty__img, .course-row__media, .bento__item--photo');
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.animate(
          [
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0 0)' },
          ],
          { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
        );
        reveal.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    media.forEach(function (m) { reveal.observe(m); });
  }

  /* ------------------------------------------------------------------ */
  /* A17 — three-step application                                        */
  /* ------------------------------------------------------------------ */
  var apply = WA.$('[data-apply]');
  if (apply) {
    var steps = WA.$$('[data-step]', apply);
    var markers = WA.$$('[data-steps-nav] .steps-nav__item');
    var current = 1;
    var KEY = 'wa-atelier-apply';

    function save() {
      var data = {};
      WA.$$('input, select, textarea', apply).forEach(function (i) {
        if (i.id && i.type !== 'checkbox') data[i.id] = i.value;
      });
      try { sessionStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    }
    function restore() {
      try {
        var data = JSON.parse(sessionStorage.getItem(KEY) || '{}');
        Object.keys(data).forEach(function (k) {
          var el = document.getElementById(k);
          if (el) el.value = data[k];
        });
      } catch (e) {}
    }
    function labelFor(field) {
      var l = field.closest('.field');
      var lab = l ? WA.$('.label', l) : null;
      return lab ? lab.textContent.trim() : field.id;
    }
    function buildReview() {
      var box = WA.$('[data-review]', apply);
      if (!box) return;
      box.innerHTML = WA.$$('input, select, textarea', steps[1]).concat(WA.$$('input, select, textarea', steps[0]))
        .filter(function (i) { return i.type !== 'checkbox' && i.value; })
        .map(function (i) { return '<div><dt>' + labelFor(i) + '</dt><dd>' + i.value.replace(/</g, '&lt;') + '</dd></div>'; })
        .join('');
    }
    function show(n) {
      current = Math.max(1, Math.min(steps.length, n));
      steps.forEach(function (s, i) { s.hidden = i + 1 !== current; });
      markers.forEach(function (m, i) {
        m.classList.toggle('is-current', i + 1 === current);
        m.classList.toggle('is-done', i + 1 < current);
      });
      var focus = WA.$('[data-step-focus]', steps[current - 1]);
      if (focus) focus.focus();
      history.replaceState(null, '', '#step-' + current);
      if (current === 3) buildReview();
      save();
    }
    function validStep(n) {
      var ok = true, firstBad = null;
      WA.$$('[data-field]', steps[n - 1]).forEach(function (wrap) {
        var input = WA.$('input, textarea, select', wrap);
        if (!input) return;
        var bad = input.hasAttribute('required') && !input.value.trim();
        if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(input.value)) bad = true;
        input.setAttribute('aria-invalid', bad ? 'true' : 'false');
        var err = WA.$('.field__error', wrap);
        if (err) {
          err.textContent = bad ? (input.getAttribute('data-msg') || 'Please check this field.') : '';
          err.setAttribute('data-visible', bad ? 'true' : 'false');
        }
        if (bad) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }
    apply.addEventListener('click', function (e) {
      var next = e.target.closest('[data-next]');
      var back = e.target.closest('[data-back]');
      if (next) { if (validStep(current)) show(current + 1); }
      if (back) show(current - 1);
    });
    apply.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validStep(3)) return;
      var consent = document.getElementById('a-consent');
      if (consent && !consent.checked) {
        consent.setAttribute('aria-invalid', 'true');
        consent.focus();
        return;
      }
      apply.hidden = true;
      var success = WA.$('[data-success]');
      if (success) {
        success.hidden = false;
        var h = WA.$('[data-success-focus]', success);
        if (h) h.focus();
        var nav = WA.$('[data-steps-nav]');
        if (nav) nav.hidden = true;
      }
    });
    restore();
    var hash = (location.hash || '').match(/step-(\d)/);
    show(hash ? parseInt(hash[1], 10) : 1);
  }
})();
