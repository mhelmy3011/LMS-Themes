/* 03 · AERO — sliding indicator, mono type-in, countdown, calculator, stage */
(function () {
  'use strict';
  var WA = window.WA;
  var reduce = WA.reduce,I=window.WAI18n,tr=I.t,num=I.number;

  /* ------------------------------------------------------------------ */
  /* R3 — one lime pill slides between the primary nav items             */
  /* ------------------------------------------------------------------ */
  var navLinks = WA.$('.nav .nav__links');
  if (navLinks) {
    var ind = document.createElement('li');
    ind.className = 'nav__indicator';
    ind.setAttribute('aria-hidden', 'true');
    navLinks.appendChild(ind);
    var current = WA.$('.nav__link[aria-current="page"]', navLinks);

    function place(el) {
      if (!el) { ind.style.opacity = 0; return; }
      ind.style.opacity = 1;
      ind.style.width = el.offsetWidth + 'px';ind.style.insetInlineStart='auto';ind.style.left='0';
      ind.style.transform = 'translateX(' + el.offsetLeft + 'px)';
    }
    place(current);
    WA.$$('.nav__link', navLinks).forEach(function (a) {
      a.addEventListener('mouseenter', function () { if (!reduce.matches) place(a); });
      a.addEventListener('focus', function () { place(a); });
    });
    navLinks.addEventListener('mouseleave', function () { place(current); });
    window.addEventListener('resize', function () { place(current); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(current); });
  }

  /* ------------------------------------------------------------------ */
  /* R5 — the mono emphasis types itself in, once                        */
  /* ------------------------------------------------------------------ */
  WA.$$('[data-typein]').forEach(function (el) {
    if (reduce.matches||I.language==='ar') return;
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.className = 'ch';
      s.setAttribute('aria-hidden', 'true');
      s.style.animationDelay = 400 + i * 40 + 'ms';
      s.textContent = text[i] === ' ' ? '\u00a0' : text[i];
      frag.appendChild(s);
    }
    el.appendChild(frag);
  });

  /* ------------------------------------------------------------------ */
  /* R9 — the live timer counts up, but only while visible               */
  /* ------------------------------------------------------------------ */
  WA.$$('[data-timer]').forEach(function (el) {
    var start = Date.now();
    var secs = 14 * 60 + 3;
    var tick = setInterval(function () {
      if (document.visibilityState === 'hidden') return;
      secs++;
      var h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
      el.textContent =
        (h ? (I.language==='ar'?num(String(h).padStart(2,'0')).padStart(2,'٠'):String(h).padStart(2,'0')) + ':' : '') +
        (I.language==='ar'?num(String(m).padStart(2,'0')).padStart(2,'٠'):String(m).padStart(2,'0')) + ':' + (I.language==='ar'?num(String(s).padStart(2,'0')).padStart(2,'٠'):String(s).padStart(2,'0'));
    }, 1000);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') start = Date.now();
    });
  });

  /* ------------------------------------------------------------------ */
  /* countdown to a session start                                        */
  /* ------------------------------------------------------------------ */
  WA.$$('[data-countdown]').forEach(function (root) {
    var target = new Date(root.getAttribute('data-countdown')).getTime();
    var out = WA.$('[data-countdown-value]', root);
    if (!out || isNaN(target)) return;
    function update() {
      if (document.visibilityState === 'hidden') return;
      var diff = Math.max(0, target - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      out.textContent = (d > 0 ? num(d) + tr('d')+' ' : '') +
        (I.language==='ar'?num(String(h).padStart(2,'0')).padStart(2,'٠'):String(h).padStart(2,'0')) + ':' + (I.language==='ar'?num(String(m).padStart(2,'0')).padStart(2,'٠'):String(m).padStart(2,'0'));
    }
    update();
    setInterval(update, 30000);
  });

  /* ------------------------------------------------------------------ */
  /* stage controls are real toggles (static, no backend)                */
  /* ------------------------------------------------------------------ */
  WA.$$('.stage').forEach(function (stage) {
    WA.$$('.stage__btn[aria-pressed]:not([data-motion-toggle])', stage).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var on = btn.getAttribute('aria-pressed') === 'true';
        btn.setAttribute('aria-pressed', on ? 'false' : 'true');
        btn.style.opacity = on ? 0.55 : 1;
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* R19 — the earnings calculator (scoped per block)                    */
  /* ------------------------------------------------------------------ */
  WA.$$('[data-calc]').forEach(function (root) {
    var inputs = WA.$$('[data-input]', root);
    var result = WA.$('[data-result]', root);
    var bars = WA.$('[data-bars]', root);
    var timer;
    function fmt(n) { return I.currency(n); }
    function read() {
      var v = {};
      inputs.forEach(function (i) { v[i.getAttribute('data-input')] = parseFloat(i.value); });
      return v;
    }
    function render() {
      var v = read();
      inputs.forEach(function (i) {
        var out = WA.$('[data-out="' + i.getAttribute('data-input') + '"]', root);
        if (!out) return;
        out.textContent = i.getAttribute('data-input') === 'price' ? fmt(parseFloat(i.value)) : num(i.value);
      });
      var yearly = v.seats * v.price * v.cohorts * 0.88;
      if (result) result.textContent = fmt(yearly);
      if (bars) {
        var monthly = yearly / 12;
        bars.innerHTML = Array.from({ length: 12 }, function (_, i) {
          var h = Math.max(8, (monthly / (monthly * 1.2)) * 100);
          return '<span class="calc__bar' + (i === 6 ? ' calc__bar--now' : '') + '" style="height:' + (40 + h * 0.6) + '%"></span>';
        }).join('');
      }
    }
    inputs.forEach(function (i) {
      i.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(render, 120);
      });
    });
    render();
  });

  /* ------------------------------------------------------------------ */
  /* keep ?track= filters honest on the courses page                     */
  /* ------------------------------------------------------------------ */
  var params = new URLSearchParams(location.search);
  var track = params.get('track');
  if (track) {
    var facet = WA.$$('[data-facet]').filter(function(b){return b.getAttribute('data-facet')===track;})[0];
    if (facet) facet.click();
  }
})();
