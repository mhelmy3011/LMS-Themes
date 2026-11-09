/* 04 · FOLIO — landing page compositions */
import { page } from '../../shared/lib/site.mjs';
import { icon, esc, fmtDuration, fmtPrice, field } from '../../shared/lib/ui.mjs';
import data from '../../shared/lib/data.mjs';
import { sceneFrame, learningExperience, projectShowcase } from '../../shared/lib/education-ui.mjs';
import { profile } from '../../shared/lib/config.mjs';
const presentation = profile('folio');
import { connector, swash } from './art.mjs';

const { courses, mentors, sessions, resources, posts, testimonials, faqs, disciplines } = data;

export const site = {
  id: 'folio',
  name: 'Folio',
  fullName: 'Web Academy',
  chip: 'LEARNING STUDIO',
  tagline: 'The independent learning studio',
  navLayout: 'folio',
  ctaLabel: 'Explore courses',
  ctaHref: 'courses/',
  loginHref: 'contact/',
  loginLabel: 'Say hello',
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  faviconBg: '#012A5D',
  faviconInk: '#C8F560',
  ogBg: '#FFFFFF',
  ogInk: '#012A5D',
  ogSub: '#012A5D',
  ogTitle: 'Make something only you can make.',
  ogKicker: 'THE INDEPENDENT LEARNING STUDIO',
  footerBlurb:
    'A little structure for your creative practice. Thoughtful lessons, useful projects and a fresh perspective from working educators.',
  nav: [
    { label: 'The method', href: '#how' },
    { label: 'Your classroom', href: '#everything' },
    { label: 'The courses', href: '#work' },
    { label: 'Start here', href: '#pricing' },
  ],
  footerCols: [
    {
      title: 'Learn',
      links: [
        { label: 'Courses', href: 'courses/' },
        { label: 'Live sessions', href: 'live/' },
        { label: 'Library', href: 'library/' },
        { label: 'Journal', href: 'blog/' },
      ],
    },
    {
      title: 'The studio',
      links: [
        { label: 'Find your first lesson', href: '#start' },
        { label: 'Start here', href: '#pricing' },
        { label: 'Creator stories', href: 'creators/' },
        { label: 'About', href: 'about/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'about/' },
        { label: 'Contact', href: 'contact/' },
        { label: 'Privacy', href: 'legal/privacy/' },
        { label: 'Terms', href: 'legal/terms/' },
      ],
    },
  ],
};

/* depth helper — a flat file such as 404.html lives at the dist root */
const R = (p = '') =>
  p && !p.endsWith('/') ? '' : '../'.repeat(p.split('/').filter(Boolean).length);
const shell = (p, opts) => page(site, R(p), { ...opts, path: p });

const tick = `<span class="tick">${icon('check')}</span>`;
const img = (name, w, h, alt = '', extra = '') =>
  `<img src="${'{{R}}'}assets/img/${name}.svg" width="${w}" height="${h}" alt="${esc(alt)}" ${extra}>`;

/* ========================================================================== */
/* LANDING                                                                    */
/* ========================================================================== */
const hero = () => `
<section class="hero" id="hero" aria-labelledby="hero-title"><div class="container"><div class="hero__grid"><div class="hero__copy">
<p class="kicker">${presentation.mode === 'creator' ? `A learning studio by ${presentation.creator} & friends` : 'A small academy for creative people'}</p>
<h1 class="display hero__title" id="hero-title">Make something<br>only <em>you</em> can make.${swash().replace('<svg ', '<svg class="swash" aria-hidden="true" ')}</h1>
<p class="lede">A little guidance. A lot of possibility. Thoughtful lessons for designers, illustrators and curious people ready to make their next good thing.</p>
<div class="hero__buttons"><a class="btn btn--primary btn--lg" href="courses/">Find your next course ${icon('arrow')}</a><a class="hero__secondary" href="learn/${courses[1].slug}/">Try a sample lesson <span class="round">${icon('play')}</span></a></div>
<ul class="hero__bullets"><li>${tick} Learn at your pace</li><li>${tick} Make a project, not just notes</li><li>${tick} Taught by practising creatives</li></ul>
<div class="hero__proof"><span class="avatar-stack">${['ana','idris','mei'].map(m=>`<img class="avatar" src="assets/img/av-${m}.svg" width="32" height="32" alt="">`).join('')}</span><p><strong>${courses.length} focused courses</strong> · ${mentors.length} generous educators</p></div>
</div><div class="hero__art edu-hero-art">${sceneFrame('folio','folio-home',{caption:'Your idea. Your hands. A little help along the way.'})}<div class="edu-hero-label"><span class="edu-status-dot"></span> A space to find your own way of making.</div></div></div></div></section>`;

const trust = () => `<section class="trust" id="trust" aria-label="Creative learning subjects"><div class="container"><p class="trust__label">For the things you love making</p><ul class="trust__row"><li>Illustration</li><li>Design</li><li>Creative code</li><li>Motion</li><li>New ideas</li></ul></div></section>`;

const STEP_ART = ['book','pencil','chat','award'];
const steps = () => `<section class="section" id="how" aria-labelledby="how-title"><div class="container"><div class="section__head section__head--center"><p class="kicker">A simple rhythm for good work</p><h2 class="h2" id="how-title">Find your starting point.<br>Make your next small leap.</h2><p class="lede">No perfect setup. No previous masterpiece. Just a focused lesson and space to try something of your own.</p></div><div class="steps__wrap"><div class="steps__line" data-connector aria-hidden="true">${connector(1200,120)}</div><ol class="steps">${[['Follow a clear idea','A visual explanation that makes the method easier to see.'],['Make a small project','Put your new skill to work while the idea is fresh.'],['Review and refine','A practical rubric helps you see what could be stronger.'],['Keep what you made','A finished piece and a method you can use again.']].map(([t,b],i)=>`<li class="step" data-reveal><div class="step__top"><span class="step__plate">${icon(STEP_ART[i])}</span><span class="step__n">0${i+1}</span></div><h3>${t}</h3><p>${b}</p></li>`).join('')}</ol></div></div></section>`;

const feature = ({ id, flip, art, alt, kicker, title, lede, checks, cta }) => `
<div class="feature ${flip ? 'feature--flip' : ''}" ${id ? `id="${id}"` : ''}>
  <div class="feature__art" data-reveal>
    <img src="{{R}}assets/img/${art}.svg" width="800" height="800" alt="${esc(alt)}" loading="lazy" decoding="async" data-float>
  </div>
  <div class="feature__copy" data-reveal style="--i:1">
    <p class="kicker">${kicker}</p>
    <h2 class="h2">${title}</h2>
    <p class="lede">${lede}</p>
    <ul class="checks">${checks.map((c) => `<li>${tick}<span>${c}</span></li>`).join('')}</ul>
    <p style="margin:0"><a class="btn btn--ghost" href="${cta.href}">${cta.label} ${icon('arrow')}</a></p>
  </div>
</div>`;

const everything = () => `<section class="section" id="everything" aria-labelledby="everything-title"><div class="container" style="display:grid;gap:clamp(40px,6vw,88px)"><h2 class="sr-only" id="everything-title">Your creative classroom</h2>${feature({art:'folio-pricing',alt:'A finished project presented beside a sketchbook and creative tools',kicker:'Your idea, made tangible',title:'A skill to use.<br>A project to keep.',lede:'Start with a small brief, work through the process and leave with a piece you can explain, adapt and be proud of.',checks:['Clear learning outcomes','Subject-specific working examples','A practical project brief','A downloadable course syllabus'],cta:{label:'Explore the courses',href:'courses/'}})}${feature({flip:true,art:'folio-library',alt:'An open learning notebook with lesson cards and a progress checklist',kicker:'A thoughtful set of tools',title:'A little structure.<br>Room for your own voice.',lede:'Your classroom comes with focused exercises, review prompts and practical resources. Enough structure to get started. Enough freedom to make it yours.',checks:['Useful lessons, not filler','Hands-on experiments','Print-ready practice resources','An accessible sample classroom'],cta:{label:'Open the practical library',href:'library/'}})}</div></section>`;

const workCard = (c) => `
<article class="edu-collection-card" data-course-id="${c.id}" data-item data-price="${c.price}" data-level="${c.level.toLowerCase()}" data-duration="${c.duration}" data-tags="${c.track}" data-text="${esc(c.title)} ${esc(c.mentor)}" data-reveal><a class="card card--link" href="{{R}}courses/${c.slug}/">
  <div class="card__media">
    <img src="{{R}}assets/img/${c.art}.svg" width="640" height="480" alt="" loading="lazy" decoding="async">
    <span class="card__badge">Course</span>
  </div>
  <div class="card__body">
    <p class="card__meta">${c.trackLabel} · ${fmtDuration(c.duration)} · ${c.lessonCount} lessons</p>
    <h3 class="card__title">${c.title}</h3>
    <div class="card__foot">
      <span class="card__by"><img src="{{R}}assets/img/av-${c.mentorId}.svg" alt="" width="26" height="26">${c.mentor}</span>
      <span class="card__meta">${c.price === 0 ? 'Free' : fmtPrice(c.price)}</span>
    </div>
  </div>
</a><button class="edu-collection-save" type="button" data-fav="${c.id}" aria-pressed="false" aria-label="Save ${esc(c.title)}">${icon('heart')}</button></article>`;

const work = () => `
<section class="section section--tight" id="work" aria-labelledby="work-title">
  <div class="container">
    <div class="section__head" style="flex-direction:row;align-items:flex-end;justify-content:space-between;max-width:none">
      <div class="section__head" style="gap:12px">
        <p class="kicker">The course collection</p>
        <h2 class="h2" id="work-title">Choose your next good thing.</h2>
      </div>
      <a class="btn btn--quiet" href="courses/">View all ${icon('arrow')}</a>
    </div>
    <div class="cards">${courses.slice(0, 3).map(workCard).join('')}</div>
  </div>
  <div style="margin-block-start:clamp(32px,5vw,56px)">
    <div class="container"><p class="meta" style="margin-block-end:14px">Illustrative course projects</p></div>
    <div class="ribbon" aria-label="Illustrative course projects" tabindex="0">
      ${courses
        .slice(0, 6)
        .map(
          (c, i) => `<figure class="ribbon__item" style="margin:0">
        <img src="{{R}}assets/img/work-${i % 3 + 1}.svg" width="800" height="500" alt="Example project artwork for ${esc(c.title)}" loading="lazy" decoding="async">
        <figcaption class="ribbon__cap">${c.mentor} · ${c.trackLabel} · 0${i + 1}</figcaption>
      </figure>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const voices = () => `
<section class="section" id="voices" aria-labelledby="voices-title">
  <div class="container">
    <div class="rail" data-rail>
      <div class="rail__head">
        <div class="section__head" style="gap:12px">
          <p class="kicker">Illustrative learner reflections</p>
          <h2 class="h2" id="voices-title">Little moments of “I can do this.”</h2>
        </div>
        <div class="rail__nav">
          <button class="rail__btn" type="button" data-rail-prev aria-label="Previous story">${icon('chevronLeft')}</button>
          <button class="rail__btn" type="button" data-rail-next aria-label="Next story">${icon('chevronRight')}</button>
        </div>
      </div>
      <div class="rail__track" data-rail-track tabindex="0" aria-label="Illustrative learner reflections">
        ${[
          [testimonials[0], 'ana', 'Illustrative learner reflection'],
          [testimonials[1], 'idris', 'Illustrative learner reflection'],
          [testimonials[2], 'mei', 'Illustrative learner reflection'],
        ]
          .map(
            ([t, avatar, stat], i) => `<article class="voice" data-reveal style="--i:${i}">
          <span class="voice__quote" aria-hidden="true">“</span>
          <p class="voice__text">${t.quote}</p>
          <div class="voice__who">
            <img src="{{R}}assets/img/av-${avatar}.svg" alt="" width="40" height="40">
            <span><b>${t.name}</b><small>${t.role}</small></span>
          </div>
          <p class="voice__stat">${stat}</p>
        </article>`
          )
          .join('')}
      </div>
      <div class="rail__dots" aria-label="Choose a reflection">
        ${[0, 1, 2].map((i) => `<button class="rail__dot" type="button" data-rail-dot aria-label="Reflection ${i+1}" aria-current="${i === 0}"></button>`).join('')}
      </div>
    </div>
    <p class="small" style="margin-block-start:24px;text-align:center">
      <a class="hero__secondary" href="creators/">Meet the creative educators <span class="round">${icon('arrow')}</span></a>
    </p>
  </div>
</section>`;

const plans = () => `<section class="section section--ice" id="pricing" aria-labelledby="pricing-title"><div class="container"><div class="section__head section__head--center"><p class="kicker">Two ways to begin</p><h2 class="h2" id="pricing-title">Start with a little curiosity.</h2><p class="lede">Try a real sample lesson first. Find the project you want to make next. No account or card needed to explore this demonstration.</p></div><div class="plans"><article class="plan"><div class="plan__top"><h3 class="plan__name">A small first step</h3><span class="chip">Free sample</span></div><p class="plan__fee"><b>$0</b><span>no signup required</span></p><ul class="plan__list"><li>${tick}<span>A complete illustrated sample lesson</span></li><li>${tick}<span>A ten-minute hands-on exercise</span></li><li>${tick}<span>A quick check with useful feedback</span></li><li>${tick}<span>Private, browser-local progress</span></li></ul><p class="plan__cta"><a class="btn btn--ghost btn--block" href="learn/${courses[1].slug}/">Step into the classroom ${icon('arrow')}</a></p></article><article class="plan plan--hl"><div class="plan__top"><h3 class="plan__name">Your next good project</h3><span class="chip">The course collection</span></div><p class="plan__fee"><b>${fmtPrice(Math.min(...courses.filter(c=>c.price>0).map(c=>c.price)))}</b><span>starting price · illustrative catalogue</span></p><ul class="plan__list"><li>${tick}<span>${courses.length} focused courses across six subjects</span></li><li>${tick}<span>A clear curriculum and project brief</span></li><li>${tick}<span>Practical resources to keep</span></li><li>${tick}<span>Meet your educator before you begin</span></li></ul><p class="plan__cta"><a class="btn btn--navy btn--block" href="courses/">Find your next course ${icon('arrow')}</a></p></article></div><p class="edu-fine" style="text-align:center;margin-block-start:24px">A static storefront demonstration. Payments, video hosting and email delivery require your own integrations.</p></div></section>`;

const faq = () => `<section class="section" id="faq" aria-labelledby="faq-title"><div class="container"><div class="section__head section__head--center"><p class="kicker">A few good questions</p><h2 class="h2" id="faq-title">Before your first small leap.</h2></div><div class="faq" data-acc="single">${[['Do I need to be a professional?','No. Each course lists its starting level, tools and learning outcomes. Beginner courses are designed for a first project; more advanced courses build on existing practice.'],['Can I try a lesson first?','Yes. Every course has an illustrated sample classroom with a practical exercise, a short knowledge check and progress saved only on your browser. No account is required.'],['What will I make?','Each course works towards a specific project, from an illustration series to an accessible interface. The course page and downloadable syllabus show the brief before you begin.'],['Can I learn at my own pace?','Self-paced lessons let you pause and return. Cohort and live-session dates are shown separately, in your local timezone, with downloadable calendar files.'],['What happens when I enrol in this demo?','You can practise the form and continue to a sample lesson. No payment is taken, no account is created and no email is sent. Connect your own services for a production site.']].map(([q,a],i)=>`<div class="acc__item"><h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i===0}" aria-controls="folio-faq-${i}"><span>${q}</span><span class="acc__sign" aria-hidden="true"></span></button></h3><div class="acc__panel" id="folio-faq-${i}"><div class="acc__inner"><p>${a}</p></div></div></div>`).join('')}</div></div></section>`;

const start = () => `<section class="section section--tight" id="start" aria-labelledby="start-title"><div class="container"><div class="start"><div class="start__copy" data-form-host><p class="kicker">Make a little room for a new idea</p><h2 class="h2" id="start-title">Your next chapter<br>can start small.</h2><p class="lede">Tell us what you are curious about. Try this local interest form, or step straight into a sample lesson.</p><form class="form" data-validate novalidate><div class="form-error-summary" data-error-summary role="alert" hidden></div>${field({id:'creator-name',label:'Your name',rules:'required',autocomplete:'name',msg:'Please enter your name.'})}${field({id:'creator-email',label:'Email address',type:'email',rules:'required email',autocomplete:'email',msg:'Please enter a valid email address.'})}${field({id:'creator-what',label:'What would you like to explore?',type:'select',options:['Design','Illustration & visual craft','Creative coding','Data storytelling','Creative business','Teaching'],rules:'required',msg:'Choose a subject you are curious about.'})}<button class="btn btn--primary btn--lg btn--block" type="submit">Try the interest form · demo ${icon('arrow')}</button><p class="edu-fine">Demo only. Your details stay in this page and are not stored or sent. <a href="legal/privacy/">Privacy</a></p></form><div class="form-success" data-success hidden><span class="form-success__tick">${icon('check')}</span><h3 class="h3" data-success-focus tabindex="-1">A little curiosity looks good on you.</h3><p>This local demo is complete. No email was sent.</p><a class="btn btn--primary" href="learn/${courses[1].slug}/">Try a sample lesson ${icon('arrow')}</a></div></div><aside class="start__panel" aria-label="Your creative practice"><img src="{{R}}assets/img/folio-frame.svg" width="1200" height="760" alt="A creative project with a completed composition and review checklist" loading="lazy"><p class="start__quote">“Start where you are.<br>Make one small thing.<br>Then make the next one.”<b>A note from the teaching studio</b></p><a class="edu-text-link" href="learn/${courses[1].slug}/">No signup? Go straight to a lesson ${icon('arrow')}</a></aside></div></div></section>`;

const newsletter = () => `<section class="section section--tight news" id="newsletter" aria-labelledby="news-title"><div class="container"><div class="news__inner"><p class="kicker">For your next quiet hour</p><h2 id="news-title">Good tools. Generously shared.</h2><p>Practical guides, checklists and workbooks for the work you love making.</p><a class="btn btn--primary" href="library/">Open the practical library ${icon('arrow')}</a></div></div></section>`;

const sticky = () => `<div class="sticky-cta" data-sticky aria-hidden="true" inert><a class="btn btn--primary btn--block" href="courses/">Find your next course ${icon('arrow')}</a></div>`;

/* ========================================================================== */
/* SUB PAGES                                                                  */
/* ========================================================================== */
const sheet = (p, { title, desc, kicker, h1, lede, body, crumbs = [] }) =>
  shell(p, {
    title,
    desc,
    body: `
<div class="page-head">
  <div class="container">
    <div class="page-head__inner">
      <p class="crumbs"><a href="${R(p)}">Home</a> ${crumbs.map((c) => `/ <a href="${R(p)}${c.href}">${c.label}</a>`).join(' ')}</p>
      ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
      <h1>${h1}</h1>
      ${lede ? `<p class="lede">${lede}</p>` : ''}
    </div>
  </div>
</div>
${body}`,
  });

const about = () =>
  sheet('about/', {
    title: 'About',
    desc: 'Web Academy is a fictional academy built to demonstrate the Folio landing template.',
    kicker: 'The studio',
    h1: 'A gallery that happens to teach.',
    lede: 'We built the page we wished we had when we started teaching: quiet type, real work, and a room that opens in one click.',
    crumbs: [{ label: 'About', href: 'about/' }],
    body: `
<section class="section">
  <div class="container" style="display:grid;gap:clamp(32px,5vw,64px)">
    <div class="feature">
      <div class="feature__art"><img src="{{R}}assets/img/folio-students.svg" width="800" height="560" alt="Three clay portraits of students" loading="lazy" data-float></div>
      <div class="feature__copy">
        <h2 class="h2">Made by people who make things.</h2>
        <div class="prose">
          <p>Folio is a demonstration template, which means every number here is invented. What is not invented is the argument: for a visual instructor, the page is the portfolio, and the portfolio is the pitch.</p>
          <p>So the page is white, the rules are hairlines, and colour is reserved for the one shape that means “start”: a lime pill with navy on it.</p>
        </div>
        <ul class="checks">
          <li>${tick}<span>One page, one decision</span></li>
          <li>${tick}<span>Illustration in brand colours only</span></li>
          <li>${tick}<span>Motion that never delays a tap</span></li>
        </ul>
      </div>
    </div>
    <div class="trio">
      ${[
        ['14', 'Disciplines', 'Illustration, type, motion, 3D, photography and more.'],
        ['2,400+', 'Creators', 'Fictional instructors teaching fictional courses.'],
        ['88%', 'Payout', 'What you keep on every sale.'],
      ]
        .map(([n, t, b]) => `<div class="trio__item"><p class="plan__fee" style="padding:0"><b>${n}</b></p><h3>${t}</h3><p>${b}</p></div>`)
        .join('')}
    </div>
    <div>
      <h2 class="h2" style="margin-block-end:20px">The people</h2>
      <div class="cards">
        ${mentors
          .slice(0, 3)
          .map(
            (m) => `<a class="card card--link" href="../courses/" style="text-decoration:none">
          <div class="card__media" style="aspect-ratio:1"><img src="{{R}}assets/img/${m.art}.svg" alt="" width="480" height="480" loading="lazy"></div>
          <div class="card__body"><h3 class="card__title">${m.name}</h3><p class="card__meta">${m.specialty.join(' · ')}</p></div>
        </a>`
          )
          .join('')}
      </div>
    </div>
  </div>
</section>`,
  });

const courseList = () =>
  sheet('courses/', {
    title: 'Courses',
    desc: 'Sixteen courses taught by visual instructors on the Folio demonstration template.',
    kicker: 'The catalogue',
    h1: 'Courses you can watch like a gallery.',
    lede: 'Self-paced, subtitled, and built around a finished piece you can put in your portfolio.',
    crumbs: [{ label: 'Courses', href: 'courses/' }],
    body: `
<section class="section">
  <div class="container">
    <h2 class="sr-only">All courses</h2>
    <div class="cards">${courses.map((c) => workCard(c)).join('')}</div>
  </div>
</section>`,
  });

const courseDetail = (c) =>
  shell(`courses/${c.slug}/`, {
    title: c.title,
    desc: c.subtitle,
    body: `
<div class="page-head">
  <div class="container">
    <div class="page-head__inner">
      <p class="crumbs"><a href="../../">Home</a> / <a href="../">Courses</a> / ${c.trackLabel}</p>
      <p class="kicker">${c.trackLabel} · ${c.level}</p>
      <h1>${c.title}</h1>
      <p class="lede">${c.subtitle}</p>
    </div>
  </div>
</div>
<section class="section">
  <div class="container">
    <div class="detail">
      <div style="display:grid;gap:28px">
        <div class="big-art"><img src="../../assets/img/${c.art}.svg" width="960" height="720" alt="" fetchpriority="high"></div>
        <div class="prose">
          <h2>What you will make</h2>
          <p>${c.subtitle} Every lesson ends with a piece of work you can keep, and the last one is the piece you came for.</p>
          <ul>${c.outcomes.map((o) => `<li>${o}</li>`).join('')}</ul>
          <h2>Inside the course</h2>
        </div>
        <div class="list">
          ${c.sections
            .map(
              (s, i) => `<div class="row">
            <div class="row__main">
              <p class="row__title">${String(i + 1).padStart(2, '0')} · ${s.title}</p>
              <p class="row__meta">${s.lessons ? s.lessons.length + ' lessons' : 'Session'} · ${c.mentor}</p>
            </div>
            <span class="row__go">${icon('play')}</span>
          </div>`
            )
            .join('')}
        </div>
        <div class="prose">
          <h2>The instructor</h2>
          <p>${mentors.find((m) => m.id === c.mentorId)?.bio || ''}</p>
        </div>
      </div>
      <aside class="aside" aria-label="Course facts">
        <div class="aside__row"><span>Length</span><span>${fmtDuration(c.duration)}</span></div>
        <div class="aside__row"><span>Lessons</span><span>${c.lessonCount}</span></div>
        <div class="aside__row"><span>Level</span><span>${c.level}</span></div>
        <div class="aside__row"><span>Rating</span><span>${c.rating} · ${c.ratingCount} reviews</span></div>
        <div class="aside__row"><span>Price</span><span>${c.price === 0 ? 'Free' : fmtPrice(c.price)}</span></div>
        <a class="btn btn--primary btn--block" href="#course-start">${c.free ? 'Start the free sample' : 'Try enrolment · demo'}</a>
        <p class="meta" style="text-align:center;margin:0">${c.students} students enrolled</p>
      </aside>
    </div>
  </div>
</section>`,
  });

const liveList = () =>
  sheet('live/', {
    title: 'Live sessions',
    desc: 'Live critique rooms, demonstrations and portfolio reviews on the Folio template.',
    kicker: 'The room',
    h1: 'Live rooms, on a calendar you can keep.',
    lede: 'Every session is recorded, indexed and handed to you as a replay the same evening.',
    crumbs: [{ label: 'Live sessions', href: 'live/' }],
    body: `
<section class="section">
  <div class="container">
    <div class="list">
      ${sessions
        .map(
          (s) => `<a class="row" href="${s.slug}/">
        <div class="row__main">
          <p class="row__meta">${s.status === 'live' ? 'On air now' : s.status === 'upcoming' ? 'Upcoming' : 'Replay'} · ${s.format}</p>
          <p class="row__title">${s.title}</p>
          <p class="small" style="margin:0">${s.blurb}</p>
        </div>
        <span class="row__go">${icon(s.status === 'live' ? 'mic' : 'arrow')}</span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`,
  });

const sessionDetail = (s) => {
  const m = mentors.find((x) => x.id === s.mentorId);
  const isLive = s.status === 'live';
  return shell(`live/${s.slug}/`, {
    title: s.title,
    desc: s.blurb,
    body: `
<div class="page-head">
  <div class="container">
    <div class="page-head__inner">
      <p class="crumbs"><a href="../../">Home</a> / <a href="../">Live sessions</a> / ${s.format}</p>
      <p class="kicker">${isLive ? 'On air' : s.status === 'upcoming' ? 'Upcoming' : 'Replay'} · ${new Date(s.startsAt).toUTCString().slice(5, 16)}</p>
      <h1>${s.title}</h1>
      <p class="lede">${s.blurb}</p>
    </div>
  </div>
</div>
<section class="section">
  <div class="container">
    <div class="detail">
      <div style="display:grid;gap:28px">
        <div class="big-art" style="position:relative;aspect-ratio:16/9;display:grid;place-items:center">
          <img src="../../assets/img/folio-live.svg" alt="" width="800" height="600" style="max-width:520px">
        </div>
        <div>
          <h2 class="h2" style="font-size:26px;margin-block-end:16px">What happens in the room</h2>
          <div class="list">
            ${s.agenda
              .map(
                (a) => `<div class="row"><div class="row__main"><p class="row__meta">${a.time}</p><p class="row__title">${a.topic}</p></div></div>`
              )
              .join('')}
          </div>
        </div>
        <div class="prose">
          <h2>Bring with you</h2>
          <p>Two pieces of work and one question. The room is small on purpose — ${s.seats} seats, half of them speaking.</p>
        </div>
      </div>
      <aside class="aside" aria-label="Session facts">
        <div class="aside__row"><span>Host</span><span>${s.mentor}</span></div>
        <div class="aside__row"><span>Starts</span><span>${new Date(s.startsAt).toUTCString().slice(5, 22)}</span></div>
        <div class="aside__row"><span>Length</span><span>${s.durationMin} min</span></div>
        <div class="aside__row"><span>Seats</span><span>${s.seatsFilled} / ${s.seats}</span></div>
        <a class="btn btn--primary btn--block" href="../../#start" data-cta="session:${s.slug}">${isLive ? 'Join the room' : 'Save my seat'}</a>
        <div style="display:flex;align-items:center;gap:10px">
          <img src="../../assets/img/av-${s.mentorId}.svg" alt="" width="36" height="36" style="border-radius:999px">
          <span class="small">${m ? m.role : s.mentor}</span>
        </div>
      </aside>
    </div>
  </div>
</section>`,
  });
};

const libraryList = () =>
  sheet('library/', {
    title: 'Library',
    desc: 'Guides, checklists and templates for visual instructors.',
    kicker: 'The shelf',
    h1: 'Things you can hand to a student.',
    lede: 'Twelve downloads, one format each, no email wall.',
    crumbs: [{ label: 'Library', href: 'library/' }],
    body: `
<section class="section">
  <div class="container">
    <h2 class="sr-only">All downloads</h2>
    <div class="cards">
      ${resources
        .map(
          (r) => `<a class="card card--link" href="${r.slug}/">
        <div class="card__media"><img src="{{R}}assets/img/${r.art}.svg" alt="" width="640" height="480" loading="lazy"></div>
        <div class="card__body">
          <p class="card__meta">${r.type} · ${r.pages} pages · ${r.size}</p>
          <h3 class="card__title">${r.title}</h3>
          <p class="small" style="margin:0">${r.blurb}</p>
        </div>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`,
  });

const resourceDetail = (r) =>
  shell(`library/${r.slug}/`, {
    title: r.title,
    desc: r.blurb,
    body: `
<div class="page-head">
  <div class="container">
    <div class="page-head__inner">
      <p class="crumbs"><a href="../../">Home</a> / <a href="../">Library</a> / ${r.type}</p>
      <p class="kicker">${r.type} · ${r.pages} pages</p>
      <h1>${r.title}</h1>
      <p class="lede">${r.blurb}</p>
    </div>
  </div>
</div>
<section class="section">
  <div class="container">
    <div class="detail">
      <div style="display:grid;gap:24px">
        <div class="big-art"><img src="../../assets/img/${r.art}.svg" width="960" height="720" alt=""></div>
        <div class="prose">
          <h2>What is inside</h2>
          <p>${r.blurb} The document is laid out to be printed, marked up, and handed across a table.</p>
          <ul>
            <li>A one-page summary you can pin above a desk.</li>
            <li>The full checklist, in the order we actually run it.</li>
            <li>Three worked examples from student work.</li>
          </ul>
        </div>
      </div>
      <aside class="aside" aria-label="File facts">
        <div class="aside__row"><span>Format</span><span>${r.type}</span></div>
        <div class="aside__row"><span>Pages</span><span>${r.pages}</span></div>
        <div class="aside__row"><span>Size</span><span>${r.size}</span></div>
        <div class="aside__row"><span>Updated</span><span>${r.updated}</span></div>
        <a class="btn btn--primary btn--block" href="#">${icon('download')} Download free</a>
        <p class="meta" style="margin:0;text-align:center">No email required</p>
      </aside>
    </div>
  </div>
</section>`,
  });

const blogList = () =>
  sheet('blog/', {
    title: 'Journal',
    desc: 'Notes on teaching visual craft, from the Folio demonstration template.',
    kicker: 'The journal',
    h1: 'Notes on teaching what you make.',
    lede: 'Short essays about critique, pricing, and the awkward first live room.',
    crumbs: [{ label: 'Journal', href: 'blog/' }],
    body: `
<section class="section">
  <div class="container">
    <h2 class="sr-only">All journal entries</h2>
    <div class="cards">
      ${posts
        .map(
          (p) => `<a class="card card--link" href="${p.slug}/">
        <div class="card__media"><img src="{{R}}assets/img/${p.art}.svg" alt="" width="640" height="480" loading="lazy"></div>
        <div class="card__body">
          <p class="card__meta">${p.category} · ${p.dateLabel} · ${p.readingMin} min</p>
          <h3 class="card__title">${p.title}</h3>
          <p class="small" style="margin:0">${p.excerpt}</p>
        </div>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`,
  });

const postDetail = (p) =>
  shell(`blog/${p.slug}/`, {
    title: p.title,
    desc: p.excerpt,
    body: `
<div class="page-head">
  <div class="container">
    <div class="page-head__inner">
      <p class="crumbs"><a href="../../">Home</a> / <a href="../">Journal</a> / ${p.category}</p>
      <p class="kicker">${p.category} · ${p.dateLabel} · ${p.readingMin} min read</p>
      <h1>${p.title}</h1>
      <p class="lede">${p.excerpt}</p>
    </div>
  </div>
</div>
<section class="section">
  <div class="container">
    <div class="detail">
      <div style="display:grid;gap:28px">
        <div class="big-art"><img src="../../assets/img/${p.art}.svg" width="960" height="720" alt=""></div>
        <article class="prose">
          <p>${p.excerpt}</p>
          <h2>The problem with a gallery</h2>
          <p>A portfolio shows that you can finish something. It rarely shows how you decide. Students are not buying the finished illustration; they are buying the sentences you say while making it.</p>
          <p>So the first lesson is always the same: narrate one decision, out loud, over a recording of your own hand.</p>
          <h2>What we changed</h2>
          <p>Three things. The course page leads with a finished piece. The first lesson is free and ends mid-problem. The price is visible before the syllabus.</p>
          <blockquote style="border-inline-start:3px solid var(--wa-lime);margin:24px 0;padding-inline-start:18px;font-size:20px;color:var(--wa-navy)">A course is an argument that ends with the student holding something.</blockquote>
          <p>None of that is clever. It is just the difference between a gallery and a classroom.</p>
        </article>
        <div style="display:flex;align-items:center;gap:12px;padding-block-start:20px;border-block-start:1px solid var(--line)">
          <img src="../../assets/img/av-${p.authorId}.svg" alt="" width="44" height="44" style="border-radius:999px">
          <div><p class="row__title" style="margin:0">${p.author}</p><p class="row__meta" style="margin:0">${mentors.find((m) => m.id === p.authorId)?.role || 'Instructor'}</p></div>
        </div>
      </div>
      <aside class="aside" aria-label="Article facts">
        <div class="aside__row"><span>Published</span><span>${p.dateLabel}</span></div>
        <div class="aside__row"><span>Reading</span><span>${p.readingMin} min</span></div>
        <div class="aside__row"><span>Category</span><span>${p.category}</span></div>
        <a class="btn btn--primary btn--block" href="../../#start" data-cta="post:${p.slug}">Explore the courses</a>
      </aside>
    </div>
  </div>
</section>`,
  });

const contact = () =>
  sheet('contact/', {
    title: 'Contact',
    desc: 'Talk to the Web Academy creator team.',
    kicker: 'Say hello',
    h1: 'Ask us anything before you start.',
    lede: 'A real person answers within one business day, usually sooner.',
    crumbs: [{ label: 'Contact', href: 'contact/' }],
    body: `
<section class="section">
  <div class="container">
    <div class="detail">
      <div style="display:grid;gap:24px;max-width:640px">
        <form class="form" data-validate novalidate>
          <div class="form__error-summary" data-error-summary role="alert" hidden></div>
          ${field({ id: 'c-name', label: 'Your name', name: 'name', rules: 'required', msg: 'Please add your name.', autocomplete: 'name' })}
          ${field({ id: 'c-email', label: 'Email', type: 'email', name: 'email', rules: 'required email', msg: 'Enter a valid email address.', autocomplete: 'email' })}
          ${field({ id: 'c-msg', label: 'What would you like to know?', name: 'message', tag: 'textarea', rules: 'required', msg: 'A sentence is enough.' })}
          <button class="btn btn--primary btn--lg" type="submit">Send message ${icon('arrow')}</button>
        </form>
        <div class="done" data-done aria-live="polite">
          <span class="done__tick">${icon('check')}</span>
          <h2 class="h2" style="font-size:24px">Message sent.</h2>
          <p class="small">This is a demonstration template, so nothing left the browser — but the form behaved exactly as it would.</p>
        </div>
      </div>
      <aside class="aside" aria-label="Contact details">
        <div class="aside__row"><span>Email</span><span>creators@webacademy.example</span></div>
        <div class="aside__row"><span>Hours</span><span>Mon–Fri · 09:00–18:00 WET</span></div>
        <div class="aside__row"><span>Studio</span><span>Rua da Boavista 14, Lisbon</span></div>
        <p class="small" style="margin:0">Prefer reading? The <a href="../#faq">FAQ</a> answers the six questions we get most.</p>
      </aside>
    </div>
  </div>
</section>`,
  });

const creators = () =>
  sheet('creators/', {
    title: 'Creator stories',
    desc: 'Long-form stories from instructors teaching on Web Academy.',
    kicker: 'Creator stories',
    h1: 'Three teachers, three first months.',
    lede: 'What actually happened, in their words, with the numbers they were willing to share.',
    crumbs: [{ label: 'Creator stories', href: 'creators/' }],
    body: `
<section class="section">
  <div class="container" style="display:grid;gap:clamp(40px,6vw,72px)">
    ${[
      ['ana', 'Ana Torres', 'Illustration', 'Uploaded 3 pieces on a Tuesday, taught a full room 11 days later.'],
      ['idris', 'Idris Bello', 'Motion design', 'Kept a day job, ran one live critique a month, and sold out twice.'],
      ['mei', 'Mei Lin', 'UI/UX', 'Moved a 400-student list from a newsletter into paid cohorts.'],
    ]
      .map(
        ([id, name, disc, line], i) => `<article class="feature ${i % 2 ? 'feature--flip' : ''}">
      <div class="feature__art"><img src="{{R}}assets/img/av-${id}.svg" width="480" height="480" alt="Portrait of ${name}" loading="lazy"></div>
      <div class="feature__copy">
        <p class="kicker">${disc}</p>
        <h2 class="h2">${name}</h2>
        <p class="lede">${line}</p>
        <div class="prose"><p>“The thing nobody tells you is that the first lesson is the product. Everything after it is retention.”</p></div>
        <a class="btn btn--ghost" href="../#start" data-cta="creators">Explore the courses ${icon('arrow')}</a>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>`,
  });

const thankYou = () =>
  sheet('thank-you/', {
    title: 'What happens next',
    desc: 'Your next three steps after starting on Web Academy.',
    kicker: 'You are in',
    h1: 'Three steps, then a room.',
    lede: 'Nothing here takes longer than an evening, and none of it needs a card.',
    crumbs: [{ label: 'Next steps', href: 'thank-you/' }],
    body: `
<section class="section">
  <div class="container">
    <div class="steps" style="max-width:900px">
      ${[
        ['Explore a sample lesson', 'No signup, email or payment is needed to try the classroom.'],
        ['Try the small project', 'Use the brief and keep your first draft.'],
        ['Reflect and refine', 'Check your understanding, then make a stronger second version.'],
      ]
        .map(
          ([t, b], i) => `<article class="step"><h2 class="sr-only">Step</h2><div class="step__top"><span class="step__plate">${icon(['mail', 'layers', 'video'][i])}</span><span class="step__n">0${i + 1}</span></div><h3>${t}</h3><p>${b}</p></article>`
        )
        .join('')}
    </div>
  </div>
</section>`,
  });

const LEGAL = {
  privacy: { title: 'Privacy', h1: 'Privacy, in plain words.' },
  terms: { title: 'Terms', h1: 'Terms, in plain words.' },
  accessibility: { title: 'Accessibility', h1: 'Accessibility, in plain words.' },
};

const legal = (kind) =>
  sheet(`legal/${kind}/`, {
    title: LEGAL[kind].title,
    desc: `The ${kind} policy for this demonstration template.`,
    kicker: 'Legal',
    h1: LEGAL[kind].h1,
    lede: 'This is a demonstration site. Nothing here collects, stores or sells anything.',
    crumbs: [{ label: kind, href: `legal/${kind}/` }],
    body: `
<section class="section">
  <div class="container">
    <div class="prose">
      <h2>What this page is</h2>
      <p>Folio is a fictional template built to demonstrate design and front-end craft. The forms validate in the browser and stop there — no request leaves the page, and no data is stored.</p>
      <h2>${kind === 'accessibility' ? 'What we test' : 'What a real version would say'}</h2>
      <p>${kind === 'privacy'
        ? 'A real policy would name the data controller, list the categories of personal data collected (account, payment, usage), explain the lawful basis for each, give retention periods, name sub-processors, and describe how to exercise access, correction and deletion rights.'
        : kind === 'terms'
          ? 'Real terms would set out eligibility, the content licence you grant, the revenue share, refund handling, acceptable use, termination, liability limits and the governing jurisdiction.'
          : 'Every template in this family is checked for WCAG 2.2 AA contrast on text and UI, keyboard reachability of every control, visible focus, a single h1 per page, labelled form fields with error text that is announced, and a full reduced-motion twin for every animation.'}</p>
      <h2>Contact</h2>
      <p>Questions about this template belong in the <a href="../../contact/">contact form</a>.</p>
    </div>
  </div>
</section>`,
  });

const notFound = () =>
  shell('404.html', {
    title: 'Page not found',
    desc: 'That page does not exist on this demonstration template.',
    body: `
<section class="section" style="text-align:center">
  <div class="container" style="max-width:640px">
    <div style="max-width:320px;margin-inline:auto"><img src="{{R}}assets/img/folio-frame.svg" width="800" height="800" alt="" data-float></div>
    <p class="kicker" style="margin-block-start:20px">404 · nothing framed here</p>
    <h1 class="display" style="font-size:clamp(34px,5vw,56px)">This wall is empty.</h1>
    <p class="lede" style="margin-inline:auto">The page you asked for does not exist. The work does, though.</p>
    <p style="margin-block-start:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <a class="btn btn--primary" href="{{R}}">Back to the landing page ${icon('arrow')}</a>
      <a class="btn btn--ghost" href="{{R}}courses/">Browse courses</a>
    </p>
  </div>
</section>`,
  });

/* ========================================================================== */
/* ROUTES                                                                     */
/* ========================================================================== */
const fix = (html, depth) => html.replaceAll('{{R}}', R(depth));

export function routes() {
  const out = [];
  const add = (p, html) => out.push({ path: p, html: fix(html, p) });

  const landing = [
    hero(),
    trust(),
    steps(),
    learningExperience('folio'),
    projectShowcase('folio'),
    everything(),
    work(),
    voices(),
    plans(),
    faq(),
    start(),
    newsletter(),
    sticky(),
  ].join('\n');

  add(
    '',
    page(site, '', {
      title: site.name,
      desc: 'A creator-owned learning studio. Thoughtful lessons, creative projects and useful resources for curious minds.',
      body: landing,
      bodyClass: 'folio',
      path: '',
      progress: true,
      jsonld: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Web Academy — Folio', url: 'https://webacademy.example/folio' },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { q: 'Do I need to be a professional?', a: 'No. Each course lists its starting level, tools and learning outcomes.' },
            { q: 'Can I try a lesson first?', a: 'Yes. Every course has an illustrated sample classroom, a practical exercise and a short knowledge check.' },
          ].map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
        },
      ],
    })
  );

  add('about/', about());
  add('courses/', courseList());
  add('live/', liveList());
  add('library/', libraryList());
  add('blog/', blogList());
  add('contact/', contact());
  add('creators/', creators());
  add('thank-you/', thankYou());
  add('legal/privacy/', legal('privacy'));
  add('legal/terms/', legal('terms'));
  add('legal/accessibility/', legal('accessibility'));
  add('404.html', notFound());

  courses.forEach((c) => add(`courses/${c.slug}/`, courseDetail(c)));
  sessions.forEach((s) => add(`live/${s.slug}/`, sessionDetail(s)));
  resources.forEach((r) => add(`library/${r.slug}/`, resourceDetail(r)));
  posts.forEach((p) => add(`blog/${p.slug}/`, postDetail(p)));

  return out;
}

export const images = {};
