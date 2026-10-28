/* ==========================================================================
   WEB ACADEMY — shared runtime
   One dependency-free module used by all four templates. Everything is
   opt-in via data attributes, so a page only pays for what it uses.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  /* ---------------------------------------------------------------------- */
  /* 1. NAV — stuck state, drawer, dropdowns                                 */
  /* ---------------------------------------------------------------------- */
  function nav() {
    var el = $('[data-nav]');
    if (!el) return;
    var last = -1;
    var stuckAt = 24;
    function onScroll() {
      var y = window.scrollY;
      var stuck = y > stuckAt ? 1 : 0;
      if (stuck !== last) {
        el.classList.toggle('is-stuck', !!stuck);
        last = stuck;
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* dropdown menus: hover intent on pointer:fine, click/keyboard everywhere */
    $$('[data-menu]').forEach(function (menu) {
      var trigger = $('[data-menu-trigger]', menu);
      var panel = $('[data-menu-panel]', menu);
      if (!trigger || !panel) return;
      var timer;

      function setOpen(open) {
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
        menu.classList.toggle('is-open', open);
      }
      setOpen(false);
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(trigger.getAttribute('aria-expanded') !== 'true');
      });
      if (window.matchMedia('(hover: hover)').matches) {
        menu.addEventListener('pointerenter', function () {
          clearTimeout(timer);
          timer = setTimeout(function () { setOpen(true); }, 120);
        });
        menu.addEventListener('pointerleave', function () {
          clearTimeout(timer);
          timer = setTimeout(function () { setOpen(false); }, 200);
        });
      }
      menu.addEventListener('focusout', function (e) {
        if (!menu.contains(e.relatedTarget)) setOpen(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
          trigger.focus();
        }
      });
      document.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) setOpen(false);
      });
    });

    /* mobile drawer */
    var toggle = $('[data-drawer-toggle]');
    var drawer = $('[data-drawer]');
    if (toggle && drawer) {
      var main = $('main');
      var footer = $('footer');
      function setDrawer(open) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        drawer.hidden = !open;
        document.documentElement.classList.toggle('is-locked', open);
        [main, footer].forEach(function (n) { if (n) n.inert = open; });
        el.classList.toggle('is-open', open);
        if (open) {
          var first = $('a, button, input', drawer);
          if (first) first.focus();
        } else {
          toggle.focus();
        }
      }
      toggle.addEventListener('click', function () {
        setDrawer(toggle.getAttribute('aria-expanded') !== 'true');
      });
      drawer.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setDrawer(false); return; }
        if (e.key !== 'Tab') return;
        var f = $$('a[href], button:not([disabled]), input, select, textarea', drawer)
          .filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* 2. REVEALS — one observer for the whole page                           */
  /* ---------------------------------------------------------------------- */
  function reveals() {
    var items = $$('[data-reveal]');
    if (!items.length) return;
    if (reduce.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (n) { n.setAttribute('data-reveal-on', ''); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.setAttribute('data-reveal-on', '');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------------------------------------------------------------------- */
  /* 3. COUNTERS                                                            */
  /* ---------------------------------------------------------------------- */
  function counters() {
    var items = $$('[data-count]');
    if (!items.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dec = (el.getAttribute('data-count').split('.')[1] || '').length;
      if (reduce.matches) { el.textContent = target.toFixed(dec) + suffix; return; }
      var t0 = performance.now(), dur = 900;
      function frame(t) {
        var p = clamp((t - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toFixed(dec) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------------------------------------------------------------------- */
  /* 4. ACCORDIONS                                                          */
  /* ---------------------------------------------------------------------- */
  function accordions() {
    $$('[data-acc]').forEach(function (root) {
      var single = root.getAttribute('data-acc') === 'single';
      $$('[data-acc-btn]', root).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var open = btn.getAttribute('aria-expanded') === 'true';
          if (single) {
            $$('[data-acc-btn]', root).forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
          }
          btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        });
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 5. TABS + SLIDING INDICATOR                                            */
  /* ---------------------------------------------------------------------- */
  function placeIndicator(set, btn) {
    var ind = $('.seg__ind', set);
    if (!ind) return;
    var a = btn.offsetLeft, b = btn.offsetWidth;
    ind.style.width = b + 'px';
    ind.style.transform = 'translateX(' + a + 'px)';
  }

  function tabs() {
    $$('[data-tabset]').forEach(function (set) {
      var btns = $$('[data-tab]', set);
      if (!btns.length) return;
      function select(id, focus) {
        btns.forEach(function (b) {
          var on = b.getAttribute('data-tab') === id;
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          b.tabIndex = on ? 0 : -1;
          if (on) { placeIndicator(set, b); if (focus) b.focus(); }
        });
        $$('[data-panel]').forEach(function (p) {
          if (p.getAttribute('data-panel-group') === set.getAttribute('data-tabset')) {
            p.hidden = p.getAttribute('data-panel') !== id;
          }
        });
      }
      btns.forEach(function (b, i) {
        b.addEventListener('click', function () { select(b.getAttribute('data-tab')); });
        b.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          var n = btns[(i + d + btns.length) % btns.length];
          select(n.getAttribute('data-tab'), true);
        });
      });
      var current = btns.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0] || btns[0];
      select(current.getAttribute('data-tab'));
      window.addEventListener('resize', function () {
        var on = btns.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0];
        if (on) placeIndicator(set, on);
      });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          var on = btns.filter(function (b) { return b.getAttribute('aria-selected') === 'true'; })[0];
          if (on) placeIndicator(set, on);
        });
      }
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 6. RAILS — drag, arrows, dots, keyboard                                */
  /* ---------------------------------------------------------------------- */
  function rails() {
    $$('[data-rail]').forEach(function (root) {
      var track = $('[data-rail-track]', root);
      if (!track) return;
      var prev = $('[data-rail-prev]', root);
      var next = $('[data-rail-next]', root);
      var dots = $$('[data-rail-dot]', root);
      var items = Array.prototype.slice.call(track.children);

      function step() {
        if (!items.length) return track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        return items[0].offsetWidth + gap;
      }
      function go(dir) {
        track.scrollBy({ left: dir * step(), behavior: reduce.matches ? 'auto' : 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });

      function sync() {
        var max = track.scrollWidth - track.clientWidth;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max - 2;
        if (dots.length) {
          var idx = Math.round(track.scrollLeft / step());
          dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
        }
      }
      track.addEventListener('scroll', function () {
        window.requestAnimationFrame(sync);
      }, { passive: true });
      dots.forEach(function (d, i) {
        d.addEventListener('click', function () {
          track.scrollTo({ left: i * step(), behavior: reduce.matches ? 'auto' : 'smooth' });
        });
      });

      /* pointer drag */
      var down = false, startX = 0, startLeft = 0, moved = false;
      track.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'touch') return;
        down = true; moved = false;
        startX = e.clientX; startLeft = track.scrollLeft;
        track.style.scrollSnapType = 'none';
      });
      track.addEventListener('pointermove', function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) { moved = true; track.setPointerCapture(e.pointerId); }
        track.scrollLeft = startLeft - dx;
      });
      function end() {
        if (!down) return;
        down = false;
        track.style.scrollSnapType = '';
        sync();
      }
      track.addEventListener('pointerup', end);
      track.addEventListener('pointercancel', end);
      track.addEventListener('click', function (e) {
        if (moved) { e.preventDefault(); moved = false; }
      }, true);
      sync();
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 7. FILTERS — facet chips, URL state, live count                        */
  /* ---------------------------------------------------------------------- */
  function filters() {
    $$('[data-filter]').forEach(function (root) {
      var items = $$('[data-item]', root);
      var countEl = $('[data-filter-count]', root);
      var emptyEl = $('[data-filter-empty]', root);
      var input = $('[data-filter-search]', root);
      var group = $('[data-filter-groups]', root);
      var state = { tag: 'all', q: '' };
      var urlKey = root.getAttribute('data-filter') || 'f';

      function apply() {
        var shown = 0;
        items.forEach(function (it) {
          var tags = (it.getAttribute('data-tags') || '').split(/\s+/);
          var text = (it.getAttribute('data-text') || it.textContent || '').toLowerCase();
          var okTag = state.tag === 'all' || tags.indexOf(state.tag) > -1;
          var okQ = !state.q || text.indexOf(state.q) > -1;
          var show = okTag && okQ;
          it.hidden = !show;
          if (show) shown++;
        });
        if (countEl) countEl.textContent = shown;
        if (emptyEl) emptyEl.hidden = shown !== 0;
        var url = new URL(window.location.href);
        if (state.tag && state.tag !== 'all') url.searchParams.set(urlKey, state.tag);
        else url.searchParams.delete(urlKey);
        history.replaceState(null, '', url);
      }

      if (group) {
        $$('[data-facet]', group).forEach(function (btn) {
          btn.addEventListener('click', function () {
            $$('[data-facet]', group).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
            btn.setAttribute('aria-pressed', 'true');
            state.tag = btn.getAttribute('data-facet');
            apply();
          });
        });
        var initial = new URL(window.location.href).searchParams.get(urlKey);
        if (initial) {
          var match = $$('[data-facet]', group).filter(function (b) { return b.getAttribute('data-facet') === initial; })[0];
          if (match) match.click();
        }
      }
      if (input) {
        var t;
        input.addEventListener('input', function () {
          clearTimeout(t);
          t = setTimeout(function () { state.q = input.value.trim().toLowerCase(); apply(); }, 160);
        });
      }
      apply();
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 8. FORMS — inline validation + success                                 */
  /* ---------------------------------------------------------------------- */
  function validators() {
    return {
      required: function (v) { return v.trim().length > 0; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()); },
      url: function (v) { return v === '' || /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v.trim()); },
    };
  }

  function forms() {
    var V = validators();
    $$('[data-validate]').forEach(function (form) {
      var fields = $$('[data-field]', form);
      var summary = $('[data-error-summary]', form);
      var success = $('[data-success]', form);

      function fieldWrap(input) { return input.closest('[data-field]'); }
      function errorFor(input) { return $('.field__error', fieldWrap(input)); }

      function check(input) {
        var rules = (input.getAttribute('data-rules') || '').split(' ');
        var v = input.value;
        var ok = true;
        var msg = input.getAttribute('data-msg') || 'Please check this field.';
        rules.forEach(function (r) {
          if (!r) return;
          if (r === 'checked') { if (!input.checked) { ok = false; } return; }
          if (V[r] && !V[r](v)) { ok = false; }
        });
        if (input.hasAttribute('required') && !v.trim()) { ok = false; msg = input.getAttribute('data-msg') || 'This field is required.'; }
        input.setAttribute('aria-invalid', ok ? 'false' : 'true');
        var err = errorFor(input);
        if (err) {
          err.textContent = ok ? '' : msg;
          err.setAttribute('data-visible', ok ? 'false' : 'true');
        }
        return ok;
      }

      fields.forEach(function (wrap) {
        var input = $('input, textarea, select', wrap);
        if (!input) return;
        input.addEventListener('blur', function () { check(input); });
        input.addEventListener('input', function () {
          if (input.getAttribute('aria-invalid') === 'true') check(input);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var bad = [];
        fields.forEach(function (wrap) {
          var input = $('input, textarea, select', wrap);
          if (input && !check(input)) bad.push(input);
        });
        if (bad.length) {
          if (summary) {
            summary.hidden = false;
            summary.innerHTML = '<strong>' + bad.length + (bad.length === 1 ? ' field needs' : ' fields need') +
              ' attention</strong><ul>' + bad.map(function (b) {
                var label = b.getAttribute('data-label') || b.name || 'field';
                return '<li><a href="#' + b.id + '">' + label + ': ' + (errorFor(b) ? errorFor(b).textContent : 'required') + '</a></li>';
              }).join('') + '</ul>';
          }
          bad[0].focus();
          return;
        }
        if (summary) summary.hidden = true;
        if (success) {
          form.hidden = true;
          success.hidden = false;
          var h = $('[data-success-focus]', success);
          if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
        } else {
          form.innerHTML = '<p class="small">Thanks — that worked. (Demo form: nothing was sent.)</p>';
        }
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 9. FAVOURITES                                                          */
  /* ---------------------------------------------------------------------- */
  function favs() {
    $$('[data-fav]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var on = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', on ? 'false' : 'true');
        btn.classList.toggle('is-on', !on);
        if (!on && !reduce.matches) {
          btn.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.28)' }, { transform: 'scale(1)' }],
            { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' }
          );
        }
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 10. SCROLL PROGRESS                                                    */
  /* ---------------------------------------------------------------------- */
  function progress() {
    var bar = $('[data-progress]');
    if (!bar) return;
    var ticking = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? clamp(window.scrollY / h, 0, 1) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------- */
  /* 11. THEME SWITCHER                                                     */
  /* ---------------------------------------------------------------------- */
  function switcher() {
    $$('[data-switcher]').forEach(function (root) {
      var btn = $('[data-switcher-btn]', root);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var open = root.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && root.classList.contains('is-open')) {
          root.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
      document.addEventListener('click', function (e) {
        if (!root.contains(e.target) && root.classList.contains('is-open')) {
          root.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ---------------------------------------------------------------------- */
  /* 12. LOCAL TIME — sessions rendered in the visitor's timezone            */
  /* ---------------------------------------------------------------------- */
  function localTime() {
    var nodes = $$('[data-datetime]');
    if (!nodes.length) return;
    var tzEls = $$('[data-tz]');
    var fmt = new Intl.DateTimeFormat(undefined, {
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    var tf = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });
    nodes.forEach(function (n) {
      var d = new Date(n.getAttribute('data-datetime'));
      if (isNaN(d)) return;
      var kind = n.getAttribute('data-datetime-format') || 'full';
      n.textContent = kind === 'time' ? tf.format(d) : fmt.format(d);
      n.setAttribute('title', d.toString());
    });
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (err) { tz = ''; }
    var offset = -new Date().getTimezoneOffset();
    var label = (offset >= 0 ? 'GMT+' : 'GMT-') + Math.floor(Math.abs(offset) / 60) +
      (Math.abs(offset) % 60 ? ':' + String(Math.abs(offset) % 60).padStart(2, '0') : '');
    tzEls.forEach(function (n) { n.textContent = tz ? tz.replace('_', ' ') + ' (' + label + ')' : label; });
  }

  /* ---------------------------------------------------------------------- */
  /* 13. COPY / MISC                                                        */
  /* ---------------------------------------------------------------------- */
  function detailsSingleOpen() {
    $$('[data-faq]').forEach(function (root) {
      var all = $$('details', root);
      all.forEach(function (d) {
        d.addEventListener('toggle', function () {
          if (d.open) all.forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
  }

  function years() {
    $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  }

  /* boot */
  function boot() {
    document.documentElement.classList.remove('no-js');
    nav(); reveals(); counters(); accordions(); tabs(); rails();
    filters(); forms(); favs(); progress(); switcher(); localTime();
    detailsSingleOpen(); years();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  /* expose a tiny API for template-specific modules */
  window.WA = { $: $, $$: $$, reduce: reduce, clamp: clamp };
})();
