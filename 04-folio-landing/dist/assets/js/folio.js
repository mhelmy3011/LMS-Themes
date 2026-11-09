(function(){var ar=document.documentElement.lang==='ar',nf=new Intl.NumberFormat('ar-EG',{useGrouping:false,maximumFractionDigits:2}),cf=new Intl.NumberFormat(ar?'ar-EG':'en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}),m={};window.WAI18n={language:ar?'ar':'en',locale:ar?'ar-EG':'en-GB',t:function(k,p){var s=m[k]||k;return p?s.replace(/\{(\w+)\}/g,function(_,n){return p[n]===undefined?'':String(p[n]);}):s;},number:function(n){return ar?nf.format(n):String(n);},currency:function(n){return cf.format(n);}};document.addEventListener('click',function(e){var a=e.target.closest('a[data-language-switch]');if(!a)return;try{localStorage.setItem('wa-language-v1',a.getAttribute('data-language-switch'));}catch(x){}if(location.search||location.hash){var u=new URL(a.href,location.href),q=new URLSearchParams(location.search);q.delete('lang');if(a.getAttribute('data-language-switch')==='en')q.set('lang','en');u.search=q.toString();u.hash=location.hash;a.href=u.href;}});})();
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

;
/* Folio: a quiet connector reveal and an accessible, contextual mobile CTA. */
(function(){
 'use strict';var WA=window.WA;if(!WA)return;
 var line=WA.$('[data-connector]');
 if(line){if(WA.reduce.matches||!('IntersectionObserver'in window))line.classList.add('is-drawn');else{var io=new IntersectionObserver(function(es){if(es.some(function(e){return e.isIntersecting;})){line.classList.add('is-drawn');io.disconnect();}},{threshold:.2});io.observe(line);}}
 var bar=WA.$('[data-sticky]'),hero=WA.$('.hero'),end=WA.$('#newsletter');
 if(bar&&hero&&'IntersectionObserver'in window){var past=false,atEnd=false;function paint(){var on=past&&!atEnd&&window.innerWidth<1080;bar.classList.toggle('is-on',on);bar.setAttribute('aria-hidden',String(!on));bar.inert=!on;}
 new IntersectionObserver(function(es){es.forEach(function(e){past=!e.isIntersecting&&e.boundingClientRect.bottom<0;});paint();}).observe(hero);
 if(end)new IntersectionObserver(function(es){atEnd=es.some(function(e){return e.isIntersecting;});paint();}).observe(end);
 window.addEventListener('resize',paint);paint();}
})();

;
/* Learning interactions. Local state only; no fetch, credentials, analytics or CDN. */
(function(){
 'use strict';var WA=window.WA;if(!WA)return;var $=WA.$,$$=WA.$$,reduce=WA.reduce,I=window.WAI18n,tr=I.t,num=I.number;
 function boot(){
  var toast=$('[data-toast]'),toastTimer;
  function notice(message){if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.classList.add('is-on');toastTimer=setTimeout(function(){toast.classList.remove('is-on');},4500);}
  document.addEventListener('wa:notice',function(e){notice(e.detail);});
  $$('[data-edu-tabs]').forEach(function(root){
   var tabs=$$('[data-edu-tab]',root),panels=$$('[data-edu-panel]',root);
   function select(index,focus){tabs.forEach(function(t,i){t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1;});panels.forEach(function(p,i){p.hidden=i!==index;});if(focus)tabs[index].focus();document.dispatchEvent(new Event('wa:scene-change'));}
   tabs.forEach(function(t,i){t.addEventListener('click',function(){select(i,false);});t.addEventListener('keydown',function(e){var n=i,rtl=document.documentElement.dir==='rtl';if(e.key==='ArrowRight')n=(i+(rtl?-1:1)+tabs.length)%tabs.length;else if(e.key==='ArrowLeft')n=(i+(rtl?1:-1)+tabs.length)%tabs.length;else if(e.key==='ArrowDown')n=(i+1)%tabs.length;else if(e.key==='ArrowUp')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();select(n,true);});});
  });

  /* A staged application never stores personal details or bypasses earlier steps. */
  $$('[data-apply]').forEach(function(form){
   var steps=$$('[data-step]',form),markers=$$('.steps-nav__item'),current=0,summary=$('[data-error-summary]',form),success=$('[data-success]',form.parentNode);
   var selected=new URLSearchParams(location.search).get('course'),course=$('#a-course',form);if(course&&selected&&Array.from(course.options).some(function(o){return o.value===selected;}))course.value=selected;
   function valid(step){var bad=[];$$('input,textarea,select',step).forEach(function(input){var value=input.value.trim(),rules=input.getAttribute('data-rules')||'',ok=!(input.required&&!value);if(/checked/.test(rules)&&!input.checked)ok=false;if(input.type==='email'&&value&&!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value))ok=false;if(input.minLength>0&&value.length<input.minLength)ok=false;if(input.maxLength>0&&value.length>input.maxLength)ok=false;input.setAttribute('aria-invalid',String(!ok));var err=document.getElementById(input.id+'-err');if(!err){err=document.createElement('p');err.id=input.id+'-err';err.className='field__error';input.closest('label')?input.closest('label').after(err):input.after(err);input.setAttribute('aria-describedby',err.id);}err.textContent=ok?'':input.getAttribute('data-msg')||tr('Please check this field.');err.setAttribute('data-visible',String(!ok));if(!ok)bad.push(input);});if(summary){summary.hidden=!bad.length;summary.textContent=bad.length?tr('Please check the {count} highlighted fields.',{count:num(bad.length)}):'';}if(bad.length)bad[0].focus();return !bad.length;}
   function review(){var box=$('[data-review]',form);if(!box)return;box.textContent='';steps.slice(0,2).forEach(function(step){$$('input,select,textarea',step).forEach(function(input){if(!input.value||input.type==='checkbox')return;var row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=input.labels&&input.labels[0]?input.labels[0].textContent:input.name;dd.textContent=input.tagName==='SELECT'?input.options[input.selectedIndex].textContent:input.value;row.append(dt,dd);box.appendChild(row);});});}
   function show(index,focus){current=index;steps.forEach(function(step,i){step.hidden=i!==current;});markers.forEach(function(m,i){m.classList.toggle('is-current',i===current);m.classList.toggle('is-done',i<current);if(i===current)m.setAttribute('aria-current','step');else m.removeAttribute('aria-current');});if(current===2)review();if(focus){var h=$('[data-step-focus]',steps[current]);if(h)h.focus();}if(summary)summary.hidden=true;}
   form.addEventListener('click',function(e){if(e.target.closest('[data-next]')&&valid(steps[current]))show(current+1,true);if(e.target.closest('[data-back]'))show(Math.max(0,current-1),true);});
   form.addEventListener('submit',function(e){e.preventDefault();if(current<steps.length-1){if(valid(steps[current]))show(current+1,true);return;}for(var i=0;i<steps.length;i++){show(i,false);if(!valid(steps[i]))return;}form.hidden=true;var nav=$('[data-steps-nav]');if(nav)nav.hidden=true;if(success){success.hidden=false;var h=$('[data-success-focus]',success);if(h)h.focus();}});show(0,false);
  });

  /* One visible scene owns ambient motion; user preference wins everywhere. */
  var scenes=$$('[data-edu-scene]'),visible=new Set(),paused=false;
  try{paused=sessionStorage.getItem('wa-motion-paused')==='1';}catch(e){}
  function motion(){
   var blocked=paused||reduce.matches,hidden=document.visibilityState==='hidden';document.documentElement.toggleAttribute('data-motion-paused',blocked);document.documentElement.toggleAttribute('data-tab-hidden',hidden);
   var chosen=null,best=Infinity;visible.forEach(function(scene){if(scene.closest('[hidden]'))return;var r=scene.getBoundingClientRect(),distance=Math.abs(r.top+r.height/2-window.innerHeight/2);if(distance<best){best=distance;chosen=scene;}});
   scenes.forEach(function(scene){scene.classList.toggle('is-active',!blocked&&!hidden&&scene===chosen);});
   $$('[data-motion-toggle]').forEach(function(b){b.setAttribute('aria-pressed',String(blocked));b.setAttribute('aria-label',reduce.matches?tr('Illustration motion is off: reduced-motion preference'):blocked?tr('Enable illustration motion'):tr('Pause illustration motion'));var label=$('[data-motion-label]',b)||$('span:last-child',b);if(label)label.textContent=blocked?tr('Motion off'):tr('Motion on');b.disabled=reduce.matches;});
  }
  if('IntersectionObserver'in window){var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){visible.add(e.target);e.target.classList.add('is-entered');}else visible.delete(e.target);});motion();},{threshold:.15});scenes.forEach(function(s){io.observe(s);});}
  else scenes.forEach(function(s){s.classList.add('is-entered');});
  $$('[data-motion-toggle]').forEach(function(b){b.addEventListener('click',function(){paused=!paused;try{sessionStorage.setItem('wa-motion-paused',paused?'1':'0');}catch(e){}motion();});});
  reduce.addEventListener('change',function(){if(reduce.matches&&document.getAnimations)document.getAnimations().forEach(function(a){try{a.finish();a.cancel();}catch(e){}});motion();});
  document.addEventListener('visibilitychange',motion);document.addEventListener('wa:scene-change',motion);motion();

  /* Browser-local shortlist, kept in sync with every save button. */
  function saved(ids){if(!Array.isArray(ids))ids=WA.saved?WA.saved():[];var count=0;$$('[data-saved-item]').forEach(function(card){var on=ids.indexOf(card.getAttribute('data-course-id'))>-1;card.hidden=!on;if(on)count++;});var empty=$('[data-saved-empty]');if(empty)empty.hidden=count>0;}
  document.addEventListener('wa:saved',function(e){saved(e.detail);});saved();
  $$('[data-follow]').forEach(function(b){var id=b.getAttribute('data-follow'),key='wa-follow-'+id,on=false;try{on=localStorage.getItem(key)==='1';}catch(e){}function paint(){b.setAttribute('aria-pressed',String(on));b.textContent=on?tr('Following · this browser'):tr('Follow educator');}paint();b.addEventListener('click',function(){on=!on;try{localStorage.setItem(key,on?'1':'0');}catch(e){}paint();notice(on?tr('Educator followed on this browser. No notifications are sent.'):tr('Educator removed from your local follows.'));});});

  /* A useful reading / making / checking loop, with a deliberately tiny store. */
  $$('[data-lesson]').forEach(function(root){
   var key='wa-sample-lesson-v1-'+root.getAttribute('data-lesson'),complete=[false,false,false],progress=$('progress',root),status=$('[data-lesson-status]',root),done=$('[data-lesson-done]',root);
   try{var old=JSON.parse(localStorage.getItem(key)||'null');if(Array.isArray(old)&&old.length===3)complete=old.map(function(x){return x===true;});}catch(e){}
   function paint(announce){var count=complete.filter(Boolean).length;if(progress){progress.value=count;progress.textContent=tr('{count} of 3',{count:num(count)});}if(status)status.textContent=tr('{count} of 3 steps complete.',{count:num(count)});$$('[data-lesson-step]',root).forEach(function(b){var on=complete[Number(b.getAttribute('data-lesson-step'))];b.setAttribute('aria-pressed',String(on));});$$('.edu-lesson-sidebar li',root).forEach(function(li,i){li.classList.toggle('is-complete',complete[i]);var a=$('a',li);if(a){if(i===Math.min(complete.indexOf(false)<0?2:complete.indexOf(false),2))a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');}});if(done)done.hidden=count!==3;try{localStorage.setItem(key,JSON.stringify(complete));}catch(e){}if(announce&&count===3&&done){var h=$('h2',done);h.tabIndex=-1;h.focus();}}
   $$('[data-lesson-step]',root).forEach(function(b){b.addEventListener('click',function(){var n=Number(b.getAttribute('data-lesson-step'));complete[n]=!complete[n];paint(true);});});
   var quiz=$('[data-quiz]',root),feedback=quiz?$('[data-quiz-feedback]',quiz):null;
   if(quiz)$$('input[type=radio]',quiz).forEach(function(input){input.addEventListener('change',function(){$$('input[type=radio]',quiz).forEach(function(radio){radio.removeAttribute('aria-invalid');});if(feedback)feedback.textContent='';});});
   if(quiz)quiz.addEventListener('submit',function(e){e.preventDefault();var answer=$('input:checked',quiz);if(!answer){if(feedback)feedback.textContent=tr('Choose an answer first.');var first=$('input[type=radio]',quiz);if(first){first.setAttribute('aria-invalid','true');first.focus();}return;}$$('input[type=radio]',quiz).forEach(function(input){input.removeAttribute('aria-invalid');});var correct=answer.value===quiz.getAttribute('data-answer');if(feedback)feedback.textContent=correct?tr('That’s right.')+' '+feedback.getAttribute('data-explanation'):tr('Not quite. Look back at the worked example and try again.');if(correct){complete[2]=true;paint(true);}});
   var reset=$('[data-lesson-reset]',root);if(reset)reset.addEventListener('click',function(){complete=[false,false,false];if(quiz){quiz.reset();$$('input[type=radio]',quiz).forEach(function(input){input.removeAttribute('aria-invalid');});}if(feedback)feedback.textContent='';var notes=$('textarea',root);if(notes)notes.value='';paint(false);notice(tr('This sample lesson has been reset.'));});paint(false);
  });

  $$('[data-resource-calc]').forEach(function(root){var inputs=$$('[data-estimate]',root),out=$('[data-estimate-output]',root);function calculate(){var values={};inputs.forEach(function(input){var n=Number(input.value);values[input.getAttribute('data-estimate')]=Number.isFinite(n)?Math.max(0,Math.min(100000,n)):0;});if(out)out.textContent=I.currency(values.rate*(values.hours+values.admin+values.revisions));}inputs.forEach(function(input){input.addEventListener('input',calculate);});calculate();});

  /* Dialogs demonstrate equipment controls without pretending to connect video. */
  function roomSettings(){
   var dialog=$('#edu-room-dialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='edu-room-dialog';dialog.className='edu-dialog';dialog.setAttribute('aria-labelledby','edu-room-title');dialog.innerHTML='<div class="edu-dialog__head"><p class="kicker">'+tr('Local classroom preview')+'</p><form method="dialog"><button class="edu-dialog__close" aria-label="'+tr('Close settings')+'">×</button></form></div><h2 class="h3" id="edu-room-title">'+tr('Make yourself comfortable.')+'</h2><p class="small">'+tr('These are demonstration controls. Your microphone and camera are never accessed, and no live room is connected.')+'</p><label class="label" for="edu-demo-audio">'+tr('Audio output preview')+'</label><select class="select" id="edu-demo-audio"><option>'+tr('Default browser audio')+'</option></select><button class="btn btn--ghost" type="button" data-test-audio>'+tr('Play a short test tone')+'</button><p class="edu-fine" data-audio-status role="status">'+tr('The test plays a quiet, half-second tone on your current output.')+'</p><form method="dialog"><button class="btn btn--primary">'+tr('Ready to explore')+'</button></form>';document.body.appendChild(dialog);var test=$('[data-test-audio]',dialog);test.addEventListener('click',function(){try{var Context=window.AudioContext||window.webkitAudioContext;if(!Context)throw new Error('unsupported');var context=new Context(),osc=context.createOscillator(),gain=context.createGain();osc.frequency.value=440;gain.gain.value=.055;osc.connect(gain);gain.connect(context.destination);context.resume();osc.start();osc.stop(context.currentTime+.4);osc.onended=function(){context.close();};$('[data-audio-status]',dialog).textContent=tr('Test tone requested. If you did not hear it, check your device volume and output.');}catch(e){$('[data-audio-status]',dialog).textContent=tr('Your browser could not play the test tone. Check the output using your device settings.');}});dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});}if(dialog.showModal)dialog.showModal();else notice(tr('This browser does not support the settings dialog. No microphone or camera is accessed.'));
  }
  $$('.stage__btn').forEach(function(b){var graphic=$('[data-icon]',b),control=graphic?graphic.getAttribute('data-icon'):'';if(control==='settings')b.addEventListener('click',roomSettings);else if(control==='hand'){b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-label',on?tr('Lower hand in demo classroom'):tr('Raise hand in demo classroom'));notice(on?tr('Hand raised in demo classroom. No live connection is active.'):tr('Hand lowered in demo classroom.'));});}else if(control==='phone'){b.setAttribute('aria-label',tr('Leave demo and return to the schedule'));b.addEventListener('click',function(){var link=$('a[href$="live/index.html"]');if(link)location.href=link.href;else notice(tr('Demo preview ended. No live connection was active.'));});}else if(control==='mic'||control==='camera')b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true',mic=control==='mic';b.setAttribute('aria-label',mic?(on?tr('Unmute demo microphone'):tr('Mute demo microphone')):(on?tr('Turn demo camera off'):tr('Turn demo camera on')));notice(mic?tr('Demo microphone state changed. Your real microphone is not accessed.'):tr('Demo camera state changed. Your real camera is not accessed.'));});});
  $$('[data-prejoin]').forEach(function(b){b.addEventListener('click',roomSettings);});

  /* Overflowing tables can be reached and scrolled with a keyboard. */
  var tables=$$('.table-wrap,.compare');function tableAccess(){tables.forEach(function(el){if(el.scrollWidth>el.clientWidth){el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label',tr('Scrollable comparison or curriculum table'));}else{el.removeAttribute('tabindex');el.removeAttribute('role');el.removeAttribute('aria-label');}});}tableAccess();window.addEventListener('resize',tableAccess);if('ResizeObserver'in window){var tableObserver=new ResizeObserver(tableAccess);tables.forEach(function(el){tableObserver.observe(el);});}if(document.fonts)document.fonts.ready.then(tableAccess);
  /* Plain fragment links transfer focus as well as scroll; never hijack scrolling. */
  $$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(){var id=a.getAttribute('href').slice(1),target=id?document.getElementById(id):null;if(!target)return;var focus=$('h1,h2,h3,input,select,textarea',target)||target;if(!focus.matches('a[href],button,input,select,textarea,[tabindex]'))focus.setAttribute('tabindex','-1');focus.focus({preventScroll:true});});});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
