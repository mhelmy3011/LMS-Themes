/* 04 · FOLIO — connector draw, sticky CTA, form success, anchor focus */
(function () {
  'use strict';
  var WA = window.WA;
  var reduce = WA.reduce;

  /* ------------------------------------------------------------------ */
  /* M2 — the loop connector draws exactly once, at 25% visibility       */
  /* ------------------------------------------------------------------ */
  var line = WA.$('[data-connector]');
  if (line && 'IntersectionObserver' in window) {
    if (reduce.matches) {
      line.classList.add('is-drawn');
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            line.classList.add('is-drawn');
            io.disconnect();
          });
        },
        { threshold: 0.25 }
      );
      io.observe(line);
    }
  }

  /* ------------------------------------------------------------------ */
  /* M7 — sticky CTA arrives after the hero, leaves at the newsletter    */
  /* ------------------------------------------------------------------ */
  var bar = WA.$('[data-sticky]');
  var hero = WA.$('.hero');
  var news = WA.$('#newsletter');
  var start = WA.$('#start');

  if (bar && hero && 'IntersectionObserver' in window) {
    var pastHero = false;
    var atNews = false;
    function paint() {
      bar.classList.toggle('is-on', pastHero && !atNews);
      bar.setAttribute('aria-hidden', pastHero && !atNews ? 'false' : 'true');
    }
    new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          pastHero = !e.isIntersecting && e.boundingClientRect.bottom < 0;
          paint();
        });
      },
      { threshold: 0 }
    ).observe(hero);
    if (news) {
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            atNews = e.isIntersecting;
            paint();
          });
        },
        { threshold: 0.15 }
      ).observe(news);
    }
    paint();
  }

  /* ------------------------------------------------------------------ */
  /* every CTA funnels to #start and remembers where it came from        */
  /* ------------------------------------------------------------------ */
  WA.$$('[data-cta]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!start) return;
      var field = WA.$('input, select, textarea', start);
      var source = WA.$('[data-source]', start);
      if (source) source.value = link.getAttribute('data-cta') || 'unknown';
      if (field) setTimeout(function () { field.focus({ preventScroll: true }); }, 420);
    });
  });

  /* M8 — the form's success panel cross-fades in, no confetti            */
  WA.$$('[data-validate]').forEach(function (form) {
    var done = form.parentNode.querySelector('[data-done]');
    if (!done) return;
    form.addEventListener('submit', function (e) {
      var bad = WA.$$('[data-field] input, [data-field] select', form).filter(function (i) {
        return i.getAttribute('aria-invalid') === 'true';
      });
      if (bad.length) return;
      e.preventDefault();
      form.hidden = true;
      done.classList.add('is-on');
      done.setAttribute('tabindex', '-1');
      done.focus();
      if (history.replaceState) history.replaceState(null, '', '#welcome');
    });
  });

  /* newsletter has its own inline success */
  WA.$$('[data-news]').forEach(function (form) {
    var done = WA.$('[data-news-done]', form.parentNode);
    form.addEventListener('submit', function (e) {
      var input = WA.$('input', form);
      if (!input || !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(input.value)) return;
      e.preventDefault();
      form.hidden = true;
      if (done) done.classList.add('is-on');
    });
  });

  /* ------------------------------------------------------------------ */
  /* anchor targets take focus so the heading is announced               */
  /* ------------------------------------------------------------------ */
  WA.$$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      target.setAttribute('tabindex', '-1');
      setTimeout(function () { target.focus({ preventScroll: true }); }, reduce.matches ? 0 : 500);
    });
  });

  /* one illustration floats at a time — pause whatever is off-screen */
  var arts = WA.$$('[data-float]');
  if (arts.length) {
    if (reduce.matches || !('IntersectionObserver' in window)) {
      arts.forEach(function (img) { img.style.animationPlayState = 'paused'; });
    } else {
      arts.forEach(function (img) { img.style.animationPlayState = 'paused'; });
      var fio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            e.target.style.animationPlayState = e.isIntersecting ? 'running' : 'paused';
          });
        },
        { threshold: 0.35 }
      );
      arts.forEach(function (img) { fio.observe(img); });
    }
  }
})();
