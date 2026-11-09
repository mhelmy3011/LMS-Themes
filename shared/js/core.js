/* ==========================================================================
   WEB ACADEMY — shared runtime
   One dependency-free module used by all four templates. Everything is
   opt-in via data attributes, so a page only pays for what it uses.
   ========================================================================== */
(function () {
  'use strict';

  var I=window.WAI18n,tr=I.t,num=I.number,rtl=I.language==='ar';
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
      if(!panel.id)panel.id='menu-'+$$('[data-menu]').indexOf(menu);trigger.setAttribute('aria-controls',panel.id);
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
          if(!panel.id)panel.id='menu-'+$$('[data-menu]').indexOf(menu);trigger.setAttribute('aria-controls',panel.id);
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
        toggle.setAttribute('aria-label',open?tr('Close menu'):tr('Open menu'));
        drawer.hidden = !open;
        document.documentElement.classList.toggle('is-locked', open);
        [main, footer, $('.nav__inner',el), $('[data-switcher]'), $('[data-sticky]')].forEach(function (n) { if (n) n.inert = open; });
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
      var close=$('[data-drawer-close]',drawer);if(close)close.addEventListener('click',function(){setDrawer(false);});
      $$('a[href]',drawer).forEach(function(a){a.addEventListener('click',function(){setDrawer(false);});});
      window.addEventListener('resize',function(){if(window.innerWidth>=1120&&!drawer.hidden)setDrawer(false);});
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
      if (reduce.matches) { el.textContent = new Intl.NumberFormat(I.locale,{useGrouping:false,minimumFractionDigits:dec,maximumFractionDigits:dec}).format(target) + suffix; return; }
      var format=new Intl.NumberFormat(I.locale,{useGrouping:false,minimumFractionDigits:dec,maximumFractionDigits:dec});
      var t0 = performance.now(), dur = 900;
      function frame(t) {
        var p = clamp((t - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = format.format(target * e) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    if(!('IntersectionObserver' in window)){items.forEach(run);return;}
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
    $$('[data-acc]').forEach(function(root){
      var buttons=$$('[data-acc-btn]',root);
      function paint(btn,open){var panel=document.getElementById(btn.getAttribute('aria-controls'));btn.setAttribute('aria-expanded',String(open));btn.closest('.acc__item').classList.toggle('is-open',open);if(panel){panel.hidden=!open;panel.inert=!open;}}
      buttons.forEach(function(btn){paint(btn,btn.getAttribute('aria-expanded')==='true');btn.addEventListener('click',function(){var open=btn.getAttribute('aria-expanded')!=='true';if(root.getAttribute('data-acc')==='single')buttons.forEach(function(b){paint(b,false);});paint(btn,open);});});
    });
  }


  /* ---------------------------------------------------------------------- */
  /* 5. TABS + SLIDING INDICATOR                                            */
  /* ---------------------------------------------------------------------- */
  function placeIndicator(set, btn) {
    var ind = $('.seg__ind', set);
    if (!ind) return;
    var a = btn.offsetLeft, b = btn.offsetWidth;
    ind.style.insetInlineStart='auto';ind.style.left='0';
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
          if(e.key==='Home'){e.preventDefault();select(btns[0].getAttribute('data-tab'),true);return;}if(e.key==='End'){e.preventDefault();select(btns[btns.length-1].getAttribute('data-tab'),true);return;}if (!d) return;
          if(rtl)d=-d;
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
      dots.forEach(function(d,i){d.setAttribute('aria-label',tr('Go to slide {count}',{count:num(i+1)}));if(d.parentElement.getAttribute('aria-hidden')==='true')d.parentElement.removeAttribute('aria-hidden');});
      var items = Array.prototype.slice.call(track.children);

      function step() {
        if (!items.length) return track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        return items[0].offsetWidth + gap;
      }
      function go(dir) {
        track.scrollBy({ left: dir * step() * (rtl?-1:1), behavior: reduce.matches ? 'auto' : 'smooth' });
      }
      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });

      function sync() {
        var max = track.scrollWidth - track.clientWidth;
        if (prev) prev.disabled = Math.abs(track.scrollLeft) <= 2;
        if (next) next.disabled = Math.abs(track.scrollLeft) >= max - 2;
        if (dots.length) {
          var idx = Math.round(Math.abs(track.scrollLeft) / step());
          dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
        }
      }
      track.addEventListener('scroll', function () {
        window.requestAnimationFrame(sync);
      }, { passive: true });
      dots.forEach(function (d, i) {
        d.addEventListener('click', function () {
          track.scrollTo({ left: i * step() * (rtl?-1:1), behavior: reduce.matches ? 'auto' : 'smooth' });
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
    $$('[data-filter]').forEach(function(root){
      var items=$$('[data-item]',root),counts=$$('[data-filter-count]',root),empty=$('[data-filter-empty]',root),input=$('[data-filter-search]',root),group=$('[data-filter-groups]',root);
      var level=$('[data-extra-level]',root),price=$('[data-extra-price]',root),sort=$('[data-sort]',root),more=$('[data-load-more]',root),key=root.getAttribute('data-filter')||'f',limit=more?12:Infinity;
      var params=new URLSearchParams(location.search),state={tag:(params.get(key)||'all').toLowerCase(),q:params.get('q')||'',level:params.get('level')||'',price:params.get('price')||'',sort:params.get('sort')||''};
      if(input)input.value=state.q;if(level)level.value=state.level;if(price)price.value=state.price;if(sort)sort.value=state.sort;
      counts.forEach(function(n){n.setAttribute('role','status');n.setAttribute('aria-live','polite');n.setAttribute('aria-atomic','true');});
      function apply(){
        var order=items.slice();if(state.sort)order.sort(function(a,b){if(state.sort==='title')return (a.getAttribute('data-text')||a.textContent.trim()).localeCompare(b.getAttribute('data-text')||b.textContent.trim(),I.locale);var k=state.sort==='duration'?'data-duration':'data-price';return Number(a.getAttribute(k))-Number(b.getAttribute(k));});
        order.forEach(function(it){it.parentNode.appendChild(it);});
        var matches=order.filter(function(it){var tags=(it.getAttribute('data-tags')||'').toLowerCase().split(/\s+/),text=(it.getAttribute('data-text')||it.textContent||'').toLowerCase();return(state.tag==='all'||tags.indexOf(state.tag)>-1)&&(!state.q||text.indexOf(state.q.toLowerCase().trim())>-1)&&(!state.level||it.getAttribute('data-level')===state.level)&&(!state.price||(state.price==='free'?Number(it.getAttribute('data-price'))===0:Number(it.getAttribute('data-price'))>0));});
        var filtered=state.tag!=='all'||state.q||state.level||state.price,visible=matches.slice(0,filtered?Infinity:limit);items.forEach(function(it){it.hidden=visible.indexOf(it)===-1;});counts.forEach(function(n){n.textContent=num(matches.length);});if(empty)empty.hidden=matches.length!==0;
        if(more){more.hidden=filtered||visible.length>=matches.length;more.textContent=tr('Show {count} more courses',{count:num(Math.min(12,matches.length-visible.length))});}
        if(group)$$('[data-facet]',group).forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-facet').toLowerCase()===state.tag));});
        var url=new URL(location.href);[[key,state.tag==='all'?'':state.tag],['q',state.q],['level',state.level],['price',state.price],['sort',state.sort]].forEach(function(pair){if(pair[1])url.searchParams.set(pair[0],pair[1]);else url.searchParams.delete(pair[0]);});try{history.replaceState(null,'',url);}catch(e){}
      }
      if(group)$$('[data-facet]',group).forEach(function(b){b.addEventListener('click',function(){state.tag=b.getAttribute('data-facet').toLowerCase();apply();});});
      if(input)input.addEventListener('input',function(){state.q=input.value;apply();});
      [[level,'level'],[price,'price'],[sort,'sort']].forEach(function(pair){if(pair[0])pair[0].addEventListener('change',function(){state[pair[1]]=pair[0].value;apply();});});
      $$('[data-filter-clear]',root).forEach(function(b){b.addEventListener('click',function(){state={tag:'all',q:'',level:'',price:'',sort:''};[input,level,price,sort].forEach(function(el){if(el)el.value='';});apply();if(input)input.focus();});});
      if(more)more.addEventListener('click',function(){var before=items.filter(function(it){return !it.hidden;});limit+=12;apply();var first=$$('[data-item]',root).filter(function(it){return !it.hidden&&before.indexOf(it)===-1;})[0];if(first){var link=$('a',first);if(link)link.focus();}});
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
    var V=validators(),serial=0;
    $$('[data-validate]').forEach(function(form){
      if(form.hasAttribute('data-apply'))return;
      var inputs=$$('input,textarea,select',form).filter(function(i){return !i.disabled&&!/^(hidden|submit|button|range)$/.test(i.type);});
      var summary=$('[data-error-summary]',form);if(!summary){summary=document.createElement('div');summary.className='form-error-summary';summary.hidden=true;summary.setAttribute('role','alert');form.prepend(summary);}
      var host=form.closest('[data-form-host]')||form.parentNode,success=$('[data-success]',host);
      function errorFor(input){var id=input.id+'-err',err=document.getElementById(id);if(!err){err=document.createElement('p');err.className='field__error';err.id=id;input.insertAdjacentElement('afterend',err);}var described=(input.getAttribute('aria-describedby')||'').split(' ').filter(Boolean);if(described.indexOf(id)<0){described.push(id);input.setAttribute('aria-describedby',described.join(' '));}return err;}
      function check(input){var rules=(input.getAttribute('data-rules')||'').split(' '),v=input.value.trim(),ok=true;rules.forEach(function(r){if(r==='checked'){if(!input.checked)ok=false;}else if(V[r]&&!V[r](v))ok=false;});if(input.required&&(input.type==='checkbox'?!input.checked:!v))ok=false;if(input.type==='email'&&v&&!V.email(v))ok=false;if(v&&input.minLength>0&&v.length<input.minLength)ok=false;if(input.maxLength>0&&v.length>input.maxLength)ok=false;if(input.validity&&(input.validity.tooShort||input.validity.typeMismatch||input.validity.patternMismatch))ok=false;var err=errorFor(input);input.setAttribute('aria-invalid',String(!ok));err.textContent=ok?'':input.getAttribute('data-msg')||tr('Please check this field.');err.setAttribute('data-visible',String(!ok));return ok;}
      inputs.forEach(function(input){if(!input.id)input.id='demo-field-'+(++serial);errorFor(input);input.addEventListener('blur',function(){check(input);});['input','change'].forEach(function(type){input.addEventListener(type,function(){if(input.getAttribute('aria-invalid')==='true')check(input);});});});
      form.addEventListener('submit',function(e){e.preventDefault();var bad=inputs.filter(function(i){return !check(i);});if(bad.length){e.stopImmediatePropagation();summary.hidden=false;summary.textContent='';var strong=document.createElement('strong');strong.textContent=tr('Please check the {count} highlighted fields.',{count:num(bad.length)});summary.appendChild(strong);var list=document.createElement('ul');bad.forEach(function(input){var li=document.createElement('li'),a=document.createElement('a');a.href='#'+input.id;a.addEventListener('click',function(event){event.preventDefault();input.focus();});a.textContent=(input.labels&&input.labels[0]?input.labels[0].textContent.trim():input.getAttribute('aria-label')||tr('Field'))+': '+errorFor(input).textContent;li.appendChild(a);list.appendChild(li);});summary.appendChild(list);bad[0].focus();return;}
        summary.hidden=true;e.stopImmediatePropagation();form.dispatchEvent(new CustomEvent('wa:valid',{bubbles:true}));
        if(success){form.hidden=true;success.hidden=false;var h=$('[data-success-focus]',success)||success;h.setAttribute('tabindex','-1');h.focus();}else{var done=document.createElement('div');done.className='edu-inline-success';done.setAttribute('role','status');done.tabIndex=-1;var title=document.createElement('strong');title.textContent=tr('Demo complete. Nothing was sent.');done.appendChild(title);var detail=document.createElement('p');detail.textContent=tr('This is a local interaction preview. No account, payment, email or live connection was created.');done.appendChild(detail);form.hidden=true;form.after(done);done.focus();}
        inputs.forEach(function(i){if(i.type==='password')i.value='';});
      });
    });
  }


  /* ---------------------------------------------------------------------- */
  /* 9. FAVOURITES                                                          */
  /* ---------------------------------------------------------------------- */
  function favs() {
    var key='wa-saved-courses-v1',saved=[];try{var stored=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(stored))saved=stored.filter(function(id){return /^c[0-9]+$/.test(id);});}catch(e){}
    function paint(){ $$('[data-fav]').forEach(function(btn){var on=saved.indexOf(btn.getAttribute('data-fav'))>-1;btn.setAttribute('aria-pressed',String(on));btn.classList.toggle('is-on',on);});document.dispatchEvent(new CustomEvent('wa:saved',{detail:saved.slice()}));}
    $$('[data-fav]').forEach(function(btn){btn.addEventListener('click',function(e){e.preventDefault();var id=btn.getAttribute('data-fav');if(!id)return;var index=saved.indexOf(id),on=index<0;if(on)saved.push(id);else saved.splice(index,1);try{localStorage.setItem(key,JSON.stringify(saved));}catch(err){}paint();document.dispatchEvent(new CustomEvent('wa:notice',{detail:on?tr('Course saved to your learning shortlist.'):tr('Course removed from your shortlist.')}));});});
    window.WA.saved=function(){return saved.slice();};paint();
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
        var panel=$('.switcher__panel',root);if(panel)panel.hidden=!open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && root.classList.contains('is-open')) {
          root.classList.remove('is-open');
          var panel=$('.switcher__panel',root);if(panel)panel.hidden=true;
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
      document.addEventListener('click', function (e) {
        if (!root.contains(e.target) && root.classList.contains('is-open')) {
          root.classList.remove('is-open');
          var panel=$('.switcher__panel',root);if(panel)panel.hidden=true;
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
    var fmt = new Intl.DateTimeFormat(I.locale, {
      weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    var tf = new Intl.DateTimeFormat(I.locale, { hour: '2-digit', minute: '2-digit' });
    nodes.forEach(function (n) {
      var d = new Date(n.getAttribute('data-datetime'));
      if (isNaN(d)) return;
      var kind = n.getAttribute('data-datetime-format') || 'full';
      n.textContent = kind === 'time' ? tf.format(d) : fmt.format(d);
      n.setAttribute('title',new Intl.DateTimeFormat(I.locale,{dateStyle:'full',timeStyle:'long'}).format(d));
    });
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (err) { tz = ''; }
    var offset = -new Date().getTimezoneOffset();
    var label = (offset >= 0 ? 'GMT+' : 'GMT-') + Math.floor(Math.abs(offset) / 60) +
      (Math.abs(offset) % 60 ? ':' + String(Math.abs(offset) % 60).padStart(2, '0') : '');
    tzEls.forEach(function (n) { n.dir='ltr';n.style.unicodeBidi='isolate';n.textContent = tz ? tz.replace('_', ' ') + ' (' + label + ')' : label; });
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
    $$('[data-year]').forEach(function (n) { n.textContent = num(new Date().getFullYear()); });
  }

  window.WA = { $: $, $$: $$, reduce: reduce, clamp: clamp, i18n: I };

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
})();
