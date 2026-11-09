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
