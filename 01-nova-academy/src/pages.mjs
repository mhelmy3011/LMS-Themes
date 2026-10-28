/* 01 · NOVA — page compositions */
import { page } from '../../shared/lib/site.mjs';
import {
  icon, head, stars, courseCard, mentorCard, postCard, sessionRow, resourceRow,
  faqList, pagination, ctaBand, field, esc, fmtDuration, fmtPrice,
} from '../../shared/lib/ui.mjs';
import data from '../../shared/lib/data.mjs';

const { courses, tracks, mentors, sessions, resources, posts, testimonials, faqs, stats, partners } = data;

export const site = {
  id: 'nova',
  name: 'Nova',
  fullName: 'Web Academy',
  chip: 'NOVA',
  tagline: 'An academy that feels like a bright studio',
  navLayout: 'split',
  ctaLabel: 'Register',
  ctaHref: 'pricing/',
  loginHref: 'contact/',
  loginLabel: 'Log in',
  themeColor: '#012A5D',
  footerBlurb: 'Short lessons, real projects, and a mentor when you get stuck. A fictional academy used to demonstrate this template.',
  nav: [
    { label: 'Home', href: '' },
    {
      label: 'Courses', href: 'courses/',
      children: [
        { label: 'All courses', href: 'courses/', desc: '240 courses across six tracks' },
        { label: 'Tracks', href: 'tracks/', desc: 'Structured multi-course paths' },
        { label: 'Level: Beginner', href: 'courses/', desc: 'Start from zero' },
        { label: 'Level: Advanced', href: 'courses/', desc: 'Go deeper' },
        { label: 'Pricing', href: 'pricing/', desc: 'Free, Live and Studio' },
      ],
      feature: { title: 'Start with interface systems', label: '8 lessons · 4h 20m', href: 'courses/designing-interfaces-that-scale/', art: 'cover-c1' },
    },
    { label: 'Live Sessions', href: 'live/' },
    { label: 'Library', href: 'library/' },
    { label: 'Blog', href: 'blog/' },
    { label: 'About', href: 'about/' },
  ],
  footerCols: [
    { title: 'Learn', links: [{ label: 'All courses', href: 'courses/' }, { label: 'Tracks', href: 'tracks/' }, { label: 'Live sessions', href: 'live/' }, { label: 'Library', href: 'library/' }] },
    { title: 'Academy', links: [{ label: 'About', href: 'about/' }, { label: 'Mentors', href: 'mentors/' }, { label: 'Blog', href: 'blog/' }, { label: 'Contact', href: 'contact/' }] },
    { title: 'More', links: [{ label: 'Pricing', href: 'pricing/' }, { label: 'Accessibility', href: 'legal/accessibility/' }, { label: 'Privacy', href: 'legal/privacy/' }, { label: 'Terms', href: 'legal/terms/' }] },
  ],
};

/* depth helper — a flat file such as 404.html lives at the dist root */
const R = (p = '') =>
  p && !p.endsWith('/') ? '' : '../'.repeat(p.split('/').filter(Boolean).length);
const shell = (p, opts) => page(site, R(p), { ...opts, path: p });

/* -------------------------------------------------------------------------- */
/* shared blocks                                                              */
/* -------------------------------------------------------------------------- */
const statBand = () => `
<div class="statband">
  <div class="container">
    <div class="statband__grid">
      ${[
        ['book', stats[0].value + '+', 'Courses & cohorts', ''],
        ['users', stats[1].value + '', 'Named instructors', ''],
        ['award', stats[2].value + 'K', 'Learners worldwide', ''],
        ['star', stats[3].value + '/5', 'Average rating', 'statband__icon--lime'],
      ]
        .map(([ic, v, l, mod], i) => `
        <div class="statband__card" data-reveal style="--i:${i}">
          <span class="statband__icon ${mod}">${icon(ic)}</span>
          <span><span class="statband__value">${v}</span><span class="statband__label">${l}</span></span>
        </div>`)
        .join('')}
    </div>
  </div>
</div>`;

const testimonialCards = () =>
  `<div class="grid grid--3">
    ${testimonials.slice(0, 3).map((t, i) => `
      <figure class="quote-card" data-reveal style="--i:${i}">
        <span class="quote-card__mark">${icon('quote')}</span>
        <blockquote class="quote-card__text">“${esc(t.quote)}”</blockquote>
        <figcaption class="quote-card__who">
          <img class="avatar" src="assets/img/av-${mentors[i + 2].id}.svg" alt="" width="36" height="36">
          <span><span class="quote-card__name">${t.name}</span><br><span class="quote-card__role">${t.role}</span></span>
        </figcaption>
      </figure>`).join('')}
  </div>`;

const loopPath = (loops = 4) => {
  let d = 'M0 30';
  const seg = 300;
  for (let i = 0; i < loops; i++) d += ` C${i * seg + 90} -14 ${i * seg + 210} -14 ${i * seg + 300} 30`;
  return d;
};

const stepsRow = () => `
<div class="steps" data-steps>
  <div class="steps__line" aria-hidden="true">
    <svg viewBox="0 0 1200 60" preserveAspectRatio="none" fill="none">
      <path d="${loopPath(4)}" vector-effect="non-scaling-stroke"/>
    </svg>
  </div>
  ${[
    ['Pick a track', 'Six tracks, each a sequence of courses rather than a list.'],
    ['Learn in short blocks', 'Twenty-minute lessons with a project you finish the same week.'],
    ['Meet a mentor live', 'Weekly office hours and critique nights in the live room.'],
    ['Ship something real', 'Finish with a project and a certificate you can show.'],
  ].map(([t, b], i) => `
    <div class="step ${i === 0 ? 'is-active' : ''}" data-reveal style="--i:${i}">
      <span class="step__num">0${i + 1}</span>
      <h3 class="step__title">${t}</h3>
      <p class="step__body">${b}</p>
    </div>`).join('')}
</div>`;

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */
const home = () => shell('', {
  title: 'Web Academy',
  desc: 'Short lessons, real projects and a mentor when you get stuck. 240 courses across design, engineering, data and visual craft.',
  bodyClass: 'home',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.slice(0, 4).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
  body: `
  <section class="hero">
    <div class="container">
      <div class="hero__grid">
        <div class="hero__copy">
          <p class="kicker"><span class="kicker__dot"></span>// The leader in online learning</p>
          <h1 class="hero__title">Engaging &amp; accessible online courses <em>for all</em>.</h1>
          <p class="lede hero__lede">Learn design, code and visual craft in twenty-minute blocks, with a mentor in the room when it matters.</p>
          <form class="hero__search" role="search" action="courses/" method="get">
            <label class="sr-only" for="hero-q">Search courses</label>
            ${icon('search')}
            <input id="hero-q" name="q" type="search" placeholder="Search courses, tracks, mentors…" autocomplete="off">
            <button type="submit" aria-label="Search">${icon('arrow')}</button>
          </form>
          <div class="hero__proof">
            <div class="hero__proof-trust">
              <span class="avatar-stack">
                <img class="avatar" src="assets/img/av-ana.svg" alt="" width="28" height="28">
                <img class="avatar" src="assets/img/av-idris.svg" alt="" width="28" height="28">
                <img class="avatar" src="assets/img/av-mei.svg" alt="" width="28" height="28">
              </span>
              Trusted by 15,400 learners since 2022
            </div>
            <div class="hero__proof-rating">
              <strong class="num" data-count="290" data-suffix="+">290+</strong> courses
              <span aria-hidden="true">·</span>
              <strong class="num">4.9</strong> ${stars(5)}
            </div>
          </div>
        </div>
        <div class="hero__art" data-parallax>
          <div class="hero__card">
            <img src="assets/img/av-mei.svg" alt="Illustrated portrait of an instructor" width="760" height="950" fetchpriority="high" decoding="async">
          </div>
          <span class="hero__shape hero__shape--1" data-depth="0.06" aria-hidden="true"></span>
          <span class="hero__shape hero__shape--2" data-depth="0.1" aria-hidden="true"></span>
          <span class="hero__shape hero__shape--3" data-depth="0.14" aria-hidden="true"></span>
          <span class="hero__shape hero__shape--4" data-depth="0.08" aria-hidden="true"></span>
          <span class="hero__shape hero__shape--5" data-depth="0.18" aria-hidden="true"></span>
          <span class="hero__float hero__float--badge">${icon('play')} 2,400 learners this week</span>
        </div>
      </div>
    </div>
  </section>
  ${statBand()}

  <section class="section">
    <div class="container">
      ${head({
        kicker: '// Favourite course',
        title: 'Top categories',
        lede: 'Six tracks, each built as a sequence instead of a pile. Start anywhere, but the path is designed.',
        action: `<a class="btn btn--ghost btn--sm" href="tracks/">All tracks ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <div class="cat-grid">
        ${tracks.slice(0, 4).map((t, i) => `
          <a class="cat-tile" href="tracks/${t.id}/" data-reveal style="--i:${i}">
            <span class="cat-tile__ring">
              <span class="cat-tile__arc" aria-hidden="true"></span>
              ${icon(t.icon)}
            </span>
            <span class="cat-tile__name">${t.label}</span>
            <span class="cat-tile__count">${courses.filter((c) => c.track === t.id).length} courses</span>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="container">
      ${head({
        kicker: "// What's new",
        title: 'Featured courses',
        lede: 'Four new or updated courses this month, chosen by the people who teach them.',
        action: `<a class="btn btn--ghost btn--sm" href="courses/">All courses ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <div class="grid grid--3">
        ${courses.filter((c) => c.featured).slice(0, 3).map((c, i) => courseCard(c, '', { dark: true }).replace('<article', `<article data-reveal style="--i:${i}"`)).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({ kicker: '// How it works', title: 'From curious to capable, in four moves', lede: 'No subscriptions to nothing. Each step ends with something you can show.' })}
      ${stepsRow()}
    </div>
  </section>

  <section class="section section--tight section--alt">
    <div class="container">
      ${head({
        kicker: '// Live this week',
        title: 'Sessions you can join',
        lede: 'Every session is recorded, but the best part only happens live.',
        action: `<a class="btn btn--ghost btn--sm" href="live/">See the calendar ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <ul class="session-list">
        ${sessions.filter((s) => s.status !== 'ended').slice(0, 3).map((s) => sessionRow(s, '')).join('')}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({
        kicker: '// The library',
        title: 'Resources you will actually use',
        lede: 'Checklists, templates and playbooks pulled straight from the courses.',
        action: `<a class="btn btn--ghost btn--sm" href="library/">Browse library ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <ul class="res-list">
        ${resources.slice(0, 4).map((r) => resourceRow(r, '')).join('')}
      </ul>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${head({
        kicker: '// The people',
        title: 'Mentors who still make the work',
        lede: 'Every instructor teaches what they practise, weekly and in public.',
        action: `<a class="btn btn--ghost btn--sm" href="mentors/">All mentors ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <div class="grid grid--4">
        ${mentors.slice(0, 4).map((m, i) => `<div data-reveal style="--i:${i}">${mentorCard(m, '')}</div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// In their words', title: 'What learners say', align: 'center' })}
      ${testimonialCards()}
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({
        kicker: '// The journal',
        title: 'Notes from the studio',
        action: `<a class="btn btn--ghost btn--sm" href="blog/">All articles ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <div class="grid grid--3">
        ${posts.slice(0, 3).map((p, i) => postCard(p, '').replace('<article', `<article data-reveal style="--i:${i}"`)).join('')}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container container--narrow">
      ${head({ kicker: '// Questions', title: 'Before you start', align: 'center' })}
      ${faqList(faqs.slice(0, 5))}
    </div>
  </section>

  ${ctaBand({
    title: 'Start with one course. Keep the loop going.',
    body: 'Free courses need no card. Paid courses come with 30 days to change your mind.',
    primary: { label: 'Browse courses', href: 'courses/' },
    secondary: { label: 'See pricing', href: 'pricing/' },
    R: '',
    dark: true,
  })}`,
});

/* -------------------------------------------------------------------------- */
/* COURSES                                                                    */
/* -------------------------------------------------------------------------- */
const coursesIndex = () => shell('courses/', {
  title: 'Courses',
  desc: 'Browse 240 courses across design, engineering, visual craft, data, business and teaching.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="./">Home</a></li><li>Courses</li></ol>
    <h1>Courses</h1>
    <p class="lede">Sixteen courses are live in this demo. Every card links to a full course page with curriculum, mentor and reviews.</p>
  </div></div>

  <section class="section section--flush" data-filter="track">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by track">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${tracks.map((t) => `<button class="facet" data-facet="${t.id}" aria-pressed="false">${t.label}</button>`).join('')}
        </div>
        <div class="flex items-center gap-3">
          <label class="search-inline">${icon('search')}<span class="sr-only">Search courses</span>
            <input type="search" placeholder="Search courses…" data-filter-search>
          </label>
          <span class="filter-count"><strong data-filter-count>${courses.length}</strong> results</span>
        </div>
      </div>

      <section aria-labelledby="all-courses">
        <h2 class="sr-only" id="all-courses">All courses</h2>
        <div class="grid grid--3">
          ${courses.map((c, i) => courseCard(c, '').replace('<article', `<article data-item data-reveal style="--i:${i % 6}"`)).join('')}
        </div>
      </section>
      <div class="empty" data-filter-empty hidden>
        ${icon('search')}
        <p><strong>No courses match that search.</strong></p>
        <p class="small">Try a different track, or clear the search field.</p>
      </div>
      <div class="mt-8 flex justify-between items-center wrap gap-4">
        <p class="small">Showing <span data-filter-count>${courses.length}</span> of ${courses.length} courses in this demo.</p>
        <button class="btn btn--ghost btn--sm" type="button">Load more</button>
      </div>
    </div>
  </section>`,
});

const courseDetail = (c) => shell(`courses/${c.slug}/`, {
  title: c.title,
  desc: c.subtitle,
  progress: true,
  ogType: 'article',
  jsonld: [{
    '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.description,
    provider: { '@type': 'Organization', name: 'Web Academy' },
    offers: { '@type': 'Offer', price: (c.price / 100).toFixed(2), priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: c.rating, reviewCount: c.ratingCount },
  }],
  body: `
  <div class="course-hero">
    <div class="container">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Courses</a></li><li><a href="../">${c.trackLabel}</a></li><li>${esc(c.title)}</li></ol>
      <div class="course-hero__grid mt-6">
        <div class="course-hero__main">
          <div class="flex wrap gap-2">
            <span class="chip chip--lime">${c.trackLabel}</span>
            <span class="chip chip--outline">${c.level}</span>
            <span class="chip chip--outline">Updated ${c.updated}</span>
          </div>
          <h1>${esc(c.title)}</h1>
          <p class="lede">${esc(c.subtitle)}</p>
          <div class="course-hero__meta">
            <span class="flex items-center gap-2">${stars(5)} <strong class="num">${c.rating}</strong> (${c.ratingCount} reviews)</span>
            <span class="flex items-center gap-2">${icon('users')} <span class="num">${c.students.toLocaleString()}</span> learners</span>
            <span class="flex items-center gap-2">${icon('clock')} ${fmtDuration(c.duration)}</span>
            <span class="flex items-center gap-2">${icon('globe')} ${c.language.join(', ')}</span>
          </div>
          <div class="flex items-center gap-3 mt-4">
            <img class="avatar" src="../../assets/img/av-${c.mentorId}.svg" alt="" width="44" height="44">
            <span><strong>${esc(c.mentor)}</strong><br><span class="small">${esc(mentors.find((m) => m.id === c.mentorId).role)}</span></span>
            <a class="link-arrow" href="../../mentors/${mentors.find((m) => m.id === c.mentorId).slug}/">View profile ${icon('arrow')}</a>
          </div>
        </div>
        <aside class="buy-panel" aria-label="Enrol">
          <div class="buy-panel__media"><img src="../../assets/img/${c.art}.svg" alt="" width="800" height="450"></div>
          <div class="buy-panel__body">
            <div class="buy-panel__price">
              ${c.free ? '<strong>Free</strong>' : `<strong>${fmtPrice(c.price)}</strong><s>${fmtPrice(Math.round(c.price * 1.4))}</s>`}
            </div>
            <a class="btn btn--primary btn--block btn--lg" href="../../pricing/">${c.free ? 'Start for free' : 'Enrol now'}</a>
            <button class="btn btn--ghost btn--block" type="button" data-fav aria-pressed="false">${icon('heart', 'btn__icon')} Add to wishlist</button>
            <ul class="buy-panel__list">
              <li>${icon('check')} Lifetime access, all future updates</li>
              <li>${icon('check')} Certificate of completion</li>
              <li>${icon('check')} Live office hours with the mentor</li>
              <li>${icon('check')} 30-day refund, no questions</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </div>

  <section class="section section--flush">
    <div class="container" style="display:grid;gap:var(--section)">
      <div class="grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);align-items:start">
        <div class="stack" style="--stack:var(--sp-9)">
          <div>
            <h2 class="h3">What you will be able to do</h2>
            <ul class="outcomes mt-4">
              ${c.outcomes.map((o) => `<li><span class="tick">${icon('check')}</span>${esc(o)}</li>`).join('')}
              <li><span class="tick">${icon('check')}</span>Explain your decisions to a client or a team</li>
              <li><span class="tick">${icon('check')}</span>Ship a finished project you can show</li>
            </ul>
          </div>
          <div class="curriculum">
            <div class="flex justify-between items-center wrap gap-3">
              <h2 class="h3">Curriculum</h2>
              <p class="small">${c.lessonCount} lessons · ${fmtDuration(c.duration)}</p>
            </div>
            <div class="acc mt-4" data-acc="single">
              ${c.sections.map((s, i) => `
                <div class="acc__item">
                  <h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="sec-${i}">
                    <span>${esc(s.title)} <span class="meta" style="font-weight:400">· ${s.lessons.length} lessons</span></span>
                    <span class="acc__sign" aria-hidden="true"></span>
                  </button></h3>
                  <div class="acc__panel" id="sec-${i}"><div>
                    ${s.lessons.map((l, j) => `<div class="lesson">${icon(j === 0 ? 'play' : 'video')}<span>${esc(l)}</span>${j === 0 ? '<span class="chip chip--lime" style="height:22px">PREVIEW</span>' : ''}<span class="lesson__dur num">${8 + j * 3} min</span></div>`).join('')}
                  </div></div>
                </div>`).join('')}
            </div>
          </div>
          <div>
            <h2 class="h3">Requirements</h2>
            <ul class="prose mt-3">${c.requirements.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
          </div>
          <div>
            <h2 class="h3">About this course</h2>
            <div class="prose mt-3"><p>${esc(c.description)}</p>
              <p>Every section includes a short demonstration, a project and a critique checklist. Lessons are recorded at a pace you can follow, and the code or files are yours to keep.</p>
              <blockquote>“The critique sections alone were worth it.” — Priya S.</blockquote></div>
          </div>
          <div>
            <h2 class="h3">Reviews</h2>
            <div class="flex items-center gap-4 mt-3">
              <span style="font-size:2.5rem;font-weight:700;letter-spacing:-0.03em" class="num">${c.rating}</span>
              <div>${stars(5)}<p class="small">${c.ratingCount} ratings</p></div>
            </div>
            ${c.reviews.map((r, i) => `
              <div class="review">
                <div class="review__head">
                  <img class="avatar" src="../../assets/img/av-${mentors[i].id}.svg" alt="" width="32" height="32">
                  <strong style="font-size:.875rem">${r.name}</strong>
                  <span class="stars">${icon('star')}</span>
                  <span class="meta" style="margin-inline-start:auto">${r.date}</span>
                </div>
                <p class="review__body">${esc(r.body)}</p>
              </div>`).join('')}
          </div>
        </div>
        <aside class="stack" style="--stack:var(--sp-6)">
          <div class="value-card">
            <span class="value-card__icon">${icon('award')}</span>
            <h3 class="h4">Certificate of completion</h3>
            <p class="small">A verifiable certificate naming the course, the hours and the mentor.</p>
          </div>
          <div class="value-card">
            <span class="value-card__icon">${icon('users')}</span>
            <h3 class="h4">A mentor in the room</h3>
            <p class="small">Weekly office hours, plus a critique night every month.</p>
          </div>
        </aside>
      </div>

      <div>
        ${head({ kicker: '// Keep going', title: 'Related courses', action: `<a class="btn btn--ghost btn--sm" href="../../courses/">All courses ${icon('arrow', 'btn__icon')}</a>` })}
        <div class="grid grid--3">
          ${courses.filter((x) => x.track === c.track && x.id !== c.id).slice(0, 3).map((x) => courseCard(x, '../../')).join('')}
        </div>
      </div>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* TRACKS                                                                     */
/* -------------------------------------------------------------------------- */
const tracksIndex = () => shell('tracks/', {
  title: 'Tracks',
  desc: 'Six structured tracks that turn a list of courses into a path.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Tracks</li></ol>
    <h1>Tracks</h1>
    <p class="lede">A track is a designed sequence: foundations, practice, then a capstone you can show.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="grid grid--2">
        ${tracks.map((t, i) => {
          const list = courses.filter((c) => c.track === t.id);
          return `<a class="card card--link" href="./${t.id}/" data-reveal style="--i:${i % 4}">
            <div class="card__media" style="aspect-ratio:16/8"><img src="../assets/img/track-${t.id}.svg" alt="" width="800" height="400" loading="lazy"></div>
            <div class="card__body">
              <div class="flex items-center gap-2">${icon(t.icon)}<span class="kicker">${list.length} courses · ${list.reduce((n, c) => n + c.lessonCount, 0)} lessons</span></div>
              <h2 class="card__title" style="font-size:var(--fs-h3)">${t.label}</h2>
              <p class="small">${t.blurb}</p>
              <div class="card__foot"><span class="link-arrow">Open track ${icon('arrow')}</span></div>
            </div>
          </a>`;
        }).join('')}
      </div>
    </div>
  </section>`,
});

const trackDetail = (t) => {
  const list = courses.filter((c) => c.track === t.id);
  return shell(`tracks/${t.id}/`, {
    title: t.label,
    desc: t.blurb,
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Tracks</a></li><li>${t.label}</li></ol>
      <div class="flex items-center gap-3 mt-4">${icon(t.icon)}<span class="chip chip--lime">${list.length} courses</span></div>
      <h1>${t.label}</h1>
      <p class="lede">${t.blurb}</p>
    </div></div>
    <section class="section section--flush">
      <div class="container">
        ${head({ kicker: '// The path', title: 'Eight steps, in order', lede: 'Each step assumes the one before it. You can join anywhere, but the sequence is why it works.' })}
        <div class="timeline">
          ${list.map((c, i) => `
            <div class="timeline__item" data-reveal style="--i:${i % 6}">
              <span class="timeline__year">STEP ${String(i + 1).padStart(2, '0')}</span>
              <h3 class="h4 mt-0" style="margin-block-start:6px"><a href="../../courses/${c.slug}/">${esc(c.title)}</a></h3>
              <p class="small">${fmtDuration(c.duration)} · ${c.lessonCount} lessons · ${c.level}</p>
            </div>`).join('')}
          <div class="timeline__item">
            <span class="timeline__year">CAPSTONE</span>
            <h3 class="h4" style="margin-block-start:6px">A finished project, critiqued live</h3>
            <p class="small">Present your work in a critique night and get written feedback from two mentors.</p>
          </div>
        </div>
        <div class="mt-10">${ctaBand({ title: 'Start the track', body: 'The first course is free. The rest unlock as you finish each step.', primary: { label: 'Browse courses', href: '../../courses/' }, secondary: { label: 'Talk to us', href: '../../contact/' }, R: '../../' })}</div>
      </div>
    </section>`,
  });
};

/* -------------------------------------------------------------------------- */
/* LIVE                                                                       */
/* -------------------------------------------------------------------------- */
const liveIndex = () => {
  const upcoming = sessions.filter((s) => s.status !== 'ended');
  const past = sessions.filter((s) => s.status === 'ended');
  return shell('live/', {
    title: 'Live sessions',
    desc: 'Join live critique nights, clinics and workshops. Every session is recorded.',
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Live sessions</li></ol>
      <h1>Live sessions</h1>
      <p class="lede">Times shown in <span data-tz>your timezone</span>. Every session is recorded and added to the archive the same day.</p>
      <div class="flex wrap gap-3 mt-4">
        <a class="btn btn--primary btn--sm" href="../contact/">Subscribe to the calendar</a>
        <button class="btn btn--ghost btn--sm" type="button">${icon('download', 'btn__icon')} Download .ics</button>
      </div>
    </div></div>
    <section class="section section--flush">
      <div class="container">
        ${head({ kicker: '// Upcoming', title: 'This month', action: `<span class="small">${upcoming.length} sessions scheduled</span>` })}
        <ul class="session-list">
          ${upcoming.map((s) => sessionRow(s, '../', { live: s.status === 'live' })).join('')}
        </ul>
        <div class="mt-10">
          ${head({ kicker: '// Archive', title: 'Replays', action: `<a class="btn btn--ghost btn--sm" href="../library/">Related resources ${icon('arrow', 'btn__icon')}</a>` })}
          <div class="grid grid--3">
            ${past.map((s, i) => `
              <article class="card card--link" data-reveal style="--i:${i}">
                <div class="card__media"><img src="../assets/img/${s.mentorId === 'ana' ? 'cover-c2' : s.mentorId === 'idris' ? 'cover-c7' : 'cover-c4'}.svg" alt="" width="800" height="500" loading="lazy">
                  <span class="chip card__flag">REPLAY</span></div>
                <div class="card__body">
                  <h3 class="card__title"><a class="card__cover" href="./${s.slug}/">${esc(s.title)}</a></h3>
                  <p class="small">${esc(s.mentor)} · ${s.durationMin} min</p>
                </div>
              </article>`).join('')}
          </div>
        </div>
      </div>
    </section>`,
  });
};

const liveDetail = (s) => shell(`live/${s.slug}/`, {
  title: s.title,
  desc: s.blurb,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Event', name: s.title, startDate: s.startsAt, eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', location: { '@type': 'VirtualLocation', url: 'https://webacademy.example/live' }, organizer: { '@type': 'Organization', name: 'Web Academy' } }],
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Live sessions</a></li><li>${esc(s.title)}</li></ol>
    <div class="flex wrap gap-2 mt-4">
      <span class="chip ${s.status === 'live' ? 'chip--lime' : 'chip--outline'}">${s.status === 'live' ? '<span class="chip__dot"></span>Live now' : s.status === 'ended' ? 'Replay available' : 'Upcoming'}</span>
      <span class="chip chip--outline">${s.durationMin} minutes</span>
    </div>
    <h1>${esc(s.title)}</h1>
    <p class="lede">${esc(s.blurb)}</p>
    <p class="small">${icon('calendar')} <span data-datetime="${s.startsAt}">—</span> · your timezone <span data-tz></span></p>
  </div></div>
  <section class="section section--flush">
    <div class="container" style="display:grid;gap:var(--section)">
      <div class="grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);align-items:start">
        <div class="stack" style="--stack:var(--sp-7)">
          <div class="card" style="overflow:hidden">
            <div class="card__media" style="aspect-ratio:16/9"><img src="../../assets/img/aero-room.svg" alt="" width="800" height="450"></div>
          </div>
          <div>
            <h2 class="h3">Agenda</h2>
            <div class="acc mt-4" data-acc="single">
              ${s.agenda.map((a, i) => `
                <div class="acc__item">
                  <h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="ag-${i}">
                    <span><span class="mono" style="margin-inline-end:10px">${a.time}</span>${a.topic}</span><span class="acc__sign" aria-hidden="true"></span>
                  </button></h3>
                  <div class="acc__panel" id="ag-${i}"><div><p>We work through this section live, with time for questions and a short exercise.</p></div></div>
                </div>`).join('')}
            </div>
          </div>
          <div>
            <h2 class="h3">What to bring</h2>
            <ul class="prose mt-3"><li>A question you have been avoiding</li><li>One piece of work you want looked at</li><li>Forty-five minutes without notifications</li></ul>
          </div>
        </div>
        <aside class="buy-panel">
          <div class="buy-panel__body">
            <p class="mono" style="color:var(--ink-3)">Seats</p>
            <p style="font-size:1.5rem;font-weight:600" class="num">${s.seats - s.seatsFilled} of ${s.seats} left</p>
            <div class="meter"><span style="width:${Math.round((s.seatsFilled / s.seats) * 100)}%"></span></div>
            <a class="btn btn--primary btn--block btn--lg" href="../../pricing/">${s.status === 'ended' ? 'Watch replay' : 'Reserve a seat'}</a>
            <a class="btn btn--ghost btn--block" href="../../contact/">Add to calendar</a>
            <div class="flex items-center gap-3">
              <img class="avatar" src="../../assets/img/av-${s.mentorId}.svg" alt="" width="40" height="40">
              <span><strong style="font-size:.875rem">${esc(s.mentor)}</strong><br><span class="small">Host</span></span>
            </div>
          </div>
        </aside>
      </div>
      <div>
        ${head({ kicker: '// More sessions', title: 'Also this month' })}
        <ul class="session-list">${sessions.filter((x) => x.slug !== s.slug).slice(0, 4).map((x) => sessionRow(x, '../../')).join('')}</ul>
      </div>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* LIBRARY                                                                    */
/* -------------------------------------------------------------------------- */
const libraryIndex = () => shell('library/', {
  title: 'Library',
  desc: 'Checklists, templates and playbooks from the courses. Free to download.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Library</li></ol>
    <h1>Library</h1>
    <p class="lede">Twelve resources, pulled from the courses. Most need nothing but an email.</p>
  </div></div>
  <section class="section section--flush" data-filter="type">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by type">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${['Guide', 'Template', 'Checklist'].map((t) => `<button class="facet" data-facet="${t}" aria-pressed="false">${t}</button>`).join('')}
        </div>
        <span class="filter-count"><strong data-filter-count>${resources.length}</strong> resources</span>
      </div>
      <section aria-labelledby="all-resources">
        <h2 class="sr-only" id="all-resources">All resources</h2>
        <ul class="res-list">
          ${resources.map((r) => resourceRow(r, '../').replace('<li', '<li data-item')).join('')}
        </ul>
      </section>
      <div class="empty" data-filter-empty hidden>${icon('search')}<p><strong>Nothing in that category yet.</strong></p></div>
    </div>
  </section>`,
});

const libraryDetail = (r) => shell(`library/${r.slug}/`, {
  title: r.title,
  desc: r.blurb,
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Library</a></li><li>${r.type}</li></ol>
    <span class="chip chip--lime">${r.type}</span>
    <h1>${esc(r.title)}</h1>
    <p class="lede">${esc(r.blurb)}</p>
  </div></div>
  <section class="section section--flush">
    <div class="container grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);align-items:start">
      <div class="stack" style="--stack:var(--sp-6)">
        <div class="card"><div class="card__media" style="aspect-ratio:16/9"><img src="../../assets/img/${r.art}.svg" alt="" width="800" height="450"></div></div>
        <div class="prose">
          <h2>What is inside</h2>
          <p>${esc(r.blurb)} It is written to be used, not read once: every page is a step you can run this week with your own work.</p>
          <ul><li>The short version, on one page</li><li>The full checklist with examples</li><li>A blank version to fill in</li></ul>
          <h2>Who it is for</h2>
          <p>Designers, engineers and instructors who want a repeatable process rather than another opinion.</p>
        </div>
      </div>
      <aside class="buy-panel">
        <div class="buy-panel__body">
          <p class="mono" style="color:var(--ink-3)">Download</p>
          <p class="h4">${r.pages} pages · ${r.size} · PDF</p>
          <p class="small">${r.updated}</p>
          <a class="btn btn--primary btn--block" href="#" onclick="return false">${icon('download', 'btn__icon')} Download free</a>
          <p class="small">Free to download. We ask for an email so we can tell you when it changes.</p>
          <ul class="buy-panel__list">
            <li>${icon('check')} No account needed</li>
            <li>${icon('check')} Print-friendly</li>
            <li>${icon('check')} Reusable in client work</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* BLOG                                                                       */
/* -------------------------------------------------------------------------- */
const blogIndex = () => shell('blog/', {
  title: 'Journal',
  desc: 'Notes on teaching, design, motion and the business of creative work.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Journal</li></ol>
    <h1>Journal</h1>
    <p class="lede">Notes from the people who teach here. Long enough to be useful, short enough to finish.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <section aria-labelledby="all-posts">
        <h2 class="sr-only" id="all-posts">All articles</h2>
        <div class="grid grid--3">
          ${posts.map((p, i) => postCard(p, '../', { lead: i === 0 }).replace('<article', `<article data-reveal style="--i:${i % 3}"`)).join('')}
        </div>
      </section>
      ${pagination(1, 1, '../', 'blog/')}
    </div>
  </section>`,
});

const postDetail = (p) => shell(`blog/${p.slug}/`, {
  title: p.title,
  desc: p.excerpt,
  progress: true,
  ogType: 'article',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.excerpt, datePublished: p.publishedAt, author: { '@type': 'Person', name: p.author }, publisher: { '@type': 'Organization', name: 'Web Academy' } }],
  body: `
  <article>
    <div class="page-head"><div class="container page-head__inner" style="max-width:820px">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Journal</a></li><li>${p.category}</li></ol>
      <p class="kicker mt-4"><span class="kicker__dot"></span>${p.category} · ${p.readingMin} min read</p>
      <h1>${esc(p.title)}</h1>
      <p class="lede">${esc(p.excerpt)}</p>
      <div class="flex items-center gap-3 mt-4">
        <img class="avatar" src="../../assets/img/av-${p.authorId}.svg" alt="" width="40" height="40">
        <span><strong style="font-size:.875rem">${esc(p.author)}</strong><br><span class="small"><time datetime="${p.publishedAt}">${p.dateLabel}</time></span></span>
      </div>
    </div></div>
    <div class="container" style="max-width:820px">
      <div class="card mt-8"><div class="card__media" style="aspect-ratio:16/9"><img src="../../assets/img/${p.art}.svg" alt="" width="800" height="450"></div></div>
      <div class="prose mt-8">
        <p>Most courses are built as a library: a hundred videos, a search box, good luck. It looks generous and it is quietly hostile, because the learner has to design the sequence themselves.</p>
        <p>A cohort does the opposite. It fixes the order, the pace and the room, then asks you to show your work in front of people who will tell you the truth about it.</p>
        <h2>What a cohort actually buys you</h2>
        <p>Three things you cannot get from a video: a deadline, an audience, and a person who notices when you stop.</p>
        <blockquote>Learning is a social act with a technical component, not the other way around.</blockquote>
        <p>The structure is simple. Six weeks. One live session a week. One piece of work every fortnight, reviewed against a written rubric that you get at the start.</p>
        <h2>Where this goes wrong</h2>
        <p>Cohorts fail when they are treated as group video calls: no agenda, no artefact, no standard. The fix is boring — publish the rubric, keep the room small, and make the first session produce something.</p>
        <pre><code>// the loop, in practice
while (learning) {
  build();
  ship();
}</code></pre>
        <p>That is the whole idea. The rest is scheduling.</p>
      </div>
      <div class="flex wrap gap-3 mt-8">
        <span class="chip chip--outline">Teaching</span><span class="chip chip--outline">Cohorts</span>
      </div>
      <div class="divider mt-8"></div>
      <div class="flex items-center gap-4 mt-6">
        <img class="avatar" src="../../assets/img/av-${p.authorId}.svg" alt="" width="56" height="56">
        <div><strong>${esc(p.author)}</strong><p class="small">Teaches at Web Academy. Writes about the craft and the business of it.</p></div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        ${head({ kicker: '// Keep reading', title: 'Next in the journal' })}
        <div class="grid grid--3">${posts.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => postCard(x, '../../')).join('')}</div>
      </div>
    </section>
  </article>`,
});

/* -------------------------------------------------------------------------- */
/* ABOUT / MENTORS / CONTACT / PRICING / LEGAL / 404                          */
/* -------------------------------------------------------------------------- */
const about = () => shell('about/', {
  title: 'About',
  desc: 'Why Web Academy exists, how we teach, and the people who do it.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>About</li></ol>
    <p class="kicker">// Who we are</p>
    <h1>One line that keeps looping.</h1>
    <p class="lede">The Web Academy mark is a single unbroken line folded into a W. Continue its lines and the loop completes into a fingerprint. We teach the way that line works: learn, build, ship, repeat.</p>
  </div></div>

  <section class="section section--flush">
    <div class="container">
      <div class="grid grid--2" style="align-items:center">
        <div class="card"><div class="card__media" style="aspect-ratio:4/3"><img src="../assets/img/atelier-studio.svg" alt="" width="800" height="600"></div></div>
        <div class="stack" style="--stack:var(--sp-4)">
          <h2 class="h3">A loop, a fingerprint, the world</h2>
          <p class="small">In code a loop keeps running until the job is done. The W is one continuous line folded into a loop — the way programming is learned: learn, build, ship, repeat.</p>
          <p class="small">The arch and the loop are two of the three basic fingerprint patterns. When the lines continue around the W, the shape completes into a fingerprint: a quiet nod to identity and security.</p>
          <p class="small">And the ring that holds the icon is the world in our tagline. Web Academy exists to teach it.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="grid grid--3">
        <div class="value-card">${icon('code', 'value-card__icon')}<h3 class="h4">A loop</h3><p class="small">Short lessons, real projects, and a mentor when you get stuck. The rhythm matters more than the volume.</p></div>
        <div class="value-card">${icon('award', 'value-card__icon')}<h3 class="h4">A fingerprint</h3><p class="small">Certificates you can verify, work you can show, a record of what you actually did.</p></div>
        <div class="value-card">${icon('globe', 'value-card__icon')}<h3 class="h4">The world</h3><p class="small">Learners in 62 countries. Prices that make sense outside a single currency.</p></div>
      </div>
      <div class="grid grid--4 mt-10" style="text-align:center">
        ${stats.map((s) => `<div class="stat"><span class="stat__value"><span data-count="${s.value}" data-suffix="${s.suffix}">${s.value}${s.suffix}</span></span><span class="stat__label">${s.label}</span></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid grid--2" style="align-items:start">
      <div>
        ${head({ kicker: '// The short history', title: 'Four years, one idea' })}
        <div class="timeline">
          ${[['2022', 'Two instructors, one cohort', 'A six-week interface course run for twelve people in a borrowed room.'],
            ['2023', 'The library opens', 'Checklists and templates from the cohorts, published free.'],
            ['2025', 'The live room', 'Weekly critique nights become the centre of the academy.'],
            ['2026', 'Six tracks, 48 mentors', 'The same idea, at a scale that still fits in a room.']].map(([y, t, b]) => `
            <div class="timeline__item"><span class="timeline__year">${y}</span><h3 class="h4" style="margin-block-start:6px">${t}</h3><p class="small">${b}</p></div>`).join('')}
        </div>
      </div>
      <div>
        ${head({ kicker: '// The people', title: 'Who teaches here', action: `<a class="btn btn--ghost btn--sm" href="../mentors/">All mentors ${icon('arrow', 'btn__icon')}</a>` })}
        <div class="grid grid--2">
          ${mentors.slice(0, 4).map((m) => mentorCard(m, '../')).join('')}
        </div>
      </div>
    </div>
  </section>
  ${ctaBand({ title: 'Come and see a session', body: 'Critique nights are open to anyone. Bring one piece of work and no slides.', primary: { label: 'See the calendar', href: '../live/' }, secondary: { label: 'Contact us', href: '../contact/' }, R: '../', dark: true })}`,
});

const mentorsIndex = () => shell('mentors/', {
  title: 'Mentors',
  desc: 'The instructors who teach at Web Academy, and what they practise.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Mentors</li></ol>
    <h1>Mentors</h1>
    <p class="lede">Everyone here teaches what they still do for a living. That is the whole hiring policy.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="mentor-grid">
        ${mentors.map((m, i) => `
          <a class="mentor-tile" href="./${m.slug}/" data-reveal style="--i:${i % 4}">
            <img src="../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="320" height="320" loading="lazy">
            <span class="mentor-tile__name">${esc(m.name)}</span>
            <span class="mentor-tile__spec">${esc(m.specialty.join(' · '))}</span>
            <span class="meta">${m.courses} courses · ${m.rating}★</span>
          </a>`).join('')}
      </div>
    </div>
  </section>`,
});

const mentorDetail = (m) => {
  const mine = courses.filter((c) => c.mentorId === m.id);
  return shell(`mentors/${m.slug}/`, {
    title: m.name,
    desc: m.bio,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Person', name: m.name, jobTitle: m.role, description: m.bio }],
    body: `
    <div class="page-head"><div class="container">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Mentors</a></li><li>${esc(m.name)}</li></ol>
      <div class="mentor-hero mt-6">
        <img src="../../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="320" height="320">
        <div class="stack" style="--stack:var(--sp-4)">
          <h1>${esc(m.name)}</h1>
          <p class="lede">${esc(m.role)} · ${esc(m.city)}</p>
          <div class="flex wrap gap-2">${m.specialty.map((s) => `<span class="chip chip--outline">${esc(s)}</span>`).join('')}</div>
          <div class="flex wrap gap-8">
            <div class="stat"><span class="stat__value">${m.students.toLocaleString()}</span><span class="stat__label">learners</span></div>
            <div class="stat"><span class="stat__value">${m.courses}</span><span class="stat__label">courses</span></div>
            <div class="stat"><span class="stat__value">${m.rating}</span><span class="stat__label">rating</span></div>
          </div>
          <div class="prose"><p>${esc(m.bio)}</p><blockquote>“${esc(m.quote)}”</blockquote></div>
          <div class="flex wrap gap-3"><a class="btn btn--primary" href="../../contact/">Book a 1:1</a><a class="btn btn--ghost" href="../../live/">See their sessions</a></div>
        </div>
      </div>
    </div></div>
    <section class="section section--flush">
      <div class="container">
        ${head({ kicker: '// Teaches', title: `Courses by ${m.name.split(' ')[0]}` })}
        <div class="grid grid--3">${mine.map((c) => courseCard(c, '../../')).join('')}</div>
      </div>
    </section>`,
  });
};

const contact = () => shell('contact/', {
  title: 'Contact',
  desc: 'Ask about courses, billing, partnerships or accessibility. We reply within two working days.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Contact</li></ol>
    <h1>Talk to a human</h1>
    <p class="lede">Course questions, billing, partnerships or accessibility. We answer everything within two working days.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container contact-grid">
      <form class="form-stack" data-validate novalidate>
        <div data-error-summary hidden class="form-error-summary" role="alert"></div>
        ${field({ id: 'name', label: 'Your name', autocomplete: 'name', rules: 'required', msg: 'Please tell us your name.' })}
        ${field({ id: 'email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email address.' })}
        ${field({ id: 'topic', label: 'What is this about?', tag: 'select', options: ['Course enquiry', 'Billing', 'Partnership', 'Press', 'Accessibility', 'Teaching with us'], rules: 'required' })}
        ${field({ id: 'message', label: 'Message', tag: 'textarea', rules: 'required', msg: 'A sentence or two helps us route this properly.', hint: 'Please do not include passwords or payment details.' })}
        <label class="check"><input type="checkbox" id="consent" data-rules="checked" data-msg="Please accept the privacy policy." aria-describedby="consent-err"><span>I agree to the <a href="../legal/privacy/" style="text-decoration:underline">privacy policy</a> and to being contacted about this enquiry.</span></label>
        <p class="field__error" id="consent-err" data-msg="Please accept the privacy policy."></p>
        <button class="btn btn--primary btn--lg" type="submit">Send message</button>
      </form>
      <div data-success hidden class="form-success">
        <span class="form-success__tick">${icon('check')}</span>
        <h2 class="h3" data-success-focus tabindex="-1">Message sent</h2>
        <p class="small">Thank you. This is a demo form, so nothing was actually sent — but in production you would hear from us within two working days.</p>
        <a class="btn btn--ghost btn--sm" href="../courses/">Browse courses while you wait</a>
      </div>
      <aside>
        <div class="contact-rows">
          ${[['mail', 'Email', 'hello@webacademy.example'], ['phone', 'Phone', '+44 20 0000 0000'], ['pin', 'Studio', '14 Marlborough Yard, London'], ['clock', 'Hours', 'Mon–Fri, 09:00–18:00 GMT']].map(([ic, l, v]) => `
            <div class="contact-row">${icon(ic)}<div><p class="contact-row__label">${l}</p><p class="contact-row__value">${v}</p></div></div>`).join('')}
        </div>
        <div class="card mt-6 card--pad">
          <p class="mono" style="color:var(--ink-3)">Response time</p>
          <p class="h4" style="margin-block-start:6px">Two working days, usually less.</p>
          <p class="small">Accessibility issues are triaged the same day.</p>
        </div>
        <div class="grid grid--2 mt-6">${['Help centre', 'Status', 'Community', 'Report a bug'].map((l) => `<a class="card card--link card--pad" href="#"><span class="h4">${l}</span><span class="small">Open ${icon('arrowUpRight')}</span></a>`).join('')}</div>
      </aside>
    </div>
  </section>`,
});

const pricing = () => shell('pricing/', {
  title: 'Pricing',
  desc: 'Free courses, a Live plan and a Studio plan for teams.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Pricing</li></ol>
    <h1>Pricing that does not need a call</h1>
    <p class="lede">Buy one course, or subscribe to everything live. Cancel whenever — the courses you bought stay yours.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="plan-grid">
        ${[['Free', '0', 'Start with any free course. No card, no expiry.', ['Two free courses', 'The library, ungated', 'Community Q&A', 'Course updates'], 'Start free', false],
          ['Live', '24', 'Everything live, every replay, the whole library.', ['All 240 courses', 'Every live session + replay', 'Certificate for each course', 'Office hours with mentors'], 'Go Live', true],
          ['Studio', '89', 'Five seats, invoicing, and a named contact.', ['Everything in Live × 5 seats', 'Consolidated invoicing', 'Private critique session per quarter', 'Usage reporting'], 'Talk to us', false]]
          .map(([n, p, d, feats, cta, featured]) => `
          <div class="plan ${featured ? 'plan--featured' : ''}">
            ${featured ? '<span class="chip chip--lime plan__flag">Most popular</span>' : ''}
            <h2 class="h3">${n}</h2>
            <p class="plan__price">${p === '0' ? 'Free' : '$' + p}<span>${p === '0' ? '' : ' / month'}</span></p>
            <p class="small">${d}</p>
            <a class="btn ${featured ? 'btn--primary' : 'btn--ghost'} btn--block" href="../contact/">${cta}</a>
            <ul class="plan__list">${feats.map((f) => `<li>${icon('check')}${f}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <div class="container--narrow mx-auto mt-10">
        ${head({ kicker: '// Questions', title: 'Billing, refunds, invoices', align: 'center' })}
        ${faqList(faqs)}
      </div>
    </div>
  </section>`,
});

const legalPages = {
  privacy: {
    title: 'Privacy policy',
    sections: [
      ['What we collect', 'An email address when you create an account or download a resource; course progress; and anonymous usage data. Nothing more.'],
      ['Why we collect it', 'To run your account, keep your progress, and send the emails you asked for. We do not sell data, and we do not run third-party advertising trackers.'],
      ['How long we keep it', 'Account data is kept while the account is open, then deleted within 30 days of closure. Analytics are aggregated after 14 months.'],
      ['Your rights', 'Access, correction, export and deletion. Email privacy@webacademy.example and we will respond within 30 days.'],
    ],
  },
  terms: {
    title: 'Terms of use',
    sections: [
      ['Using the academy', 'One account per person. Sharing login details is not permitted. Course materials are licensed to you for personal and professional use.'],
      ['Purchases and refunds', 'Individual courses can be refunded within 30 days, provided less than half the course is complete. Subscriptions can be cancelled at any time, effective at the end of the period.'],
      ['Content and conduct', 'You keep ownership of the work you make. Critique rooms are moderated; harassment ends access.'],
      ['Changes', 'We will give 30 days notice of material changes to these terms.'],
    ],
  },
  accessibility: {
    title: 'Accessibility',
    sections: [
      ['Our target', 'WCAG 2.2 level AA across every page, tested with keyboard, VoiceOver and NVDA.'],
      ['What we have done', 'Logical focus order, visible focus rings, 44px minimum targets, captions on every recording, reduced-motion support for every animation.'],
      ['Known gaps', 'Two 2024 recordings lack captions. Both are being re-edited.'],
      ['Tell us', 'Email accessibility@webacademy.example. We triage accessibility reports the same day.'],
    ],
  },
};

const legal = (key) => {
  const doc = legalPages[key];
  return shell(`legal/${key}/`, {
    title: doc.title,
    desc: `${doc.title} for Web Academy.`,
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li>Legal</li><li>${doc.title}</li></ol>
      <h1>${doc.title}</h1>
      <p class="small">Last updated 12 October 2026</p>
    </div></div>
    <section class="section section--flush">
      <div class="container legal-grid">
        <nav class="legal-toc" aria-label="On this page">
          <p class="mono" style="color:var(--ink-3)">On this page</p>
          ${doc.sections.map(([t], i) => `<a href="#s${i}">${t}</a>`).join('')}
          <a href="../privacy/">Privacy</a><a href="../terms/">Terms</a><a href="../accessibility/">Accessibility</a>
        </nav>
        <div class="prose">
          <p>This is a demonstration document for a fictional academy. The structure is real; the commitments are illustrative.</p>
          ${doc.sections.map(([t, b], i) => `<h2 id="s${i}">${t}</h2><p>${b}</p>`).join('')}
        </div>
      </div>
    </section>`,
  });
};

const notFound = () => page(site, '', { path: '404.html',
  title: 'Page not found',
  desc: 'That page has looped off the map.',
  body: `
  <section class="section" style="min-height:60vh;display:grid;place-items:center;text-align:center">
    <div class="container container--narrow">
      <img src="assets/brand/wa-icon-navy.svg" alt="" width="72" height="72" style="opacity:.14;margin-inline:auto">
      <h1 class="display" style="margin-block-start:16px">404</h1>
      <p class="lede mx-auto" style="margin-block-start:12px">This page looped off the map. The links below are still on it.</p>
      <form class="hero__search mx-auto" role="search" action="courses/" method="get" style="margin-block-start:24px">
        <label class="sr-only" for="nf-q">Search</label>${icon('search')}
        <input id="nf-q" name="q" type="search" placeholder="Search courses…">
        <button type="submit" aria-label="Search">${icon('arrow')}</button>
      </form>
      <div class="flex wrap gap-3" style="justify-content:center;margin-block-start:24px">
        <a class="btn btn--primary" href="courses/">Browse courses</a>
        <a class="btn btn--ghost" href="./">Back home</a>
      </div>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
const styleguide = () => shell('styleguide/', {
  title: 'Styleguide',
  desc: 'Every component, every state.',
  body: `
  <div class="page-head"><div class="container page-head__inner"><h1>Styleguide</h1><p class="lede">Internal QA page. Not linked from navigation and excluded from the sitemap.</p></div></div>
  <section class="section section--flush"><div class="container stack" style="--stack:var(--sp-9)">
    <div><h2 class="h3">Colour</h2><div class="flex wrap gap-4 mt-4">
      ${[['Navy', '#012A5D'], ['Navy deep', '#001A3D'], ['Navy mid', '#14427F'], ['Sky', '#8DB8FF'], ['Ice', '#EAF1FB'], ['Lime', '#C8F560'], ['White', '#FFFFFF']].map(([n, h]) => `
        <div style="width:120px"><div style="height:72px;border-radius:12px;background:${h};border:1px solid var(--line)"></div><p class="small" style="margin-block-start:6px"><strong>${n}</strong><br><span class="mono">${h}</span></p></div>`).join('')}
    </div></div>
    <div><h2 class="h3">Type</h2><div class="mt-4"><p class="display">Display 64</p><p class="h1">H1 48</p><p class="h2">H2 38</p><p class="h3">H3 26</p><p class="h4">H4 20</p><p class="lede">Lede 19 — a sentence of supporting copy that sets context.</p><p>Body 16 — the default reading size for long-form content on every page.</p><p class="mono">MONO 12 · LABEL</p></div></div>
    <div><h2 class="h3">Buttons</h2><div class="flex wrap gap-3 mt-4">
      <button class="btn btn--primary">Primary</button><button class="btn btn--navy">Navy</button><button class="btn btn--ghost">Ghost</button><button class="btn btn--quiet">Quiet</button><button class="btn btn--primary btn--sm">Small</button><button class="btn btn--primary btn--lg">Large</button>
    </div></div>
    <div><h2 class="h3">Chips</h2><div class="flex wrap gap-3 mt-4">
      <span class="chip">Default</span><span class="chip chip--lime">Lime</span><span class="chip chip--outline">Outline</span><span class="chip chip--solid">Solid</span>
    </div></div>
    <div><h2 class="h3">Form</h2><div class="form-stack mt-4" style="max-width:420px">
      ${field({ id: 'sg-name', label: 'Name', rules: 'required', msg: 'Required' })}
      ${field({ id: 'sg-email', label: 'Email', type: 'email', rules: 'required email', msg: 'Enter a valid email' })}
    </div></div>
    <div><h2 class="h3">Cards</h2><div class="grid grid--3 mt-4">${courses.slice(0, 3).map((c) => courseCard(c, '../')).join('')}</div></div>
    <div><h2 class="h3">Empty state</h2><div class="empty mt-4">${icon('search')}<p><strong>Nothing here yet</strong></p></div></div>
  </div></section>`,
});

/* -------------------------------------------------------------------------- */
/* Some blocks are written once and reused at several depths, so every page
   gets its root-relative links and asset paths rebased to its own folder. */
const ATTR = /(src|href)="(?!https?:|mailto:|tel:|#|\/|\.\.\/|\.\/)([^"]+)"/g;
function rebase(html, depth) {
  if (!depth) return html;
  const up = '../'.repeat(depth);
  return html.replace(ATTR, (m, attr, url) => `${attr}="${up}${url}"`);
}

export function routes() {
  const out = [];
  const push = (path, html, extra = {}) =>
    out.push({
      path,
      html: rebase(html, path && !path.endsWith('/') ? 0 : path.split('/').filter(Boolean).length),
      ...extra,
    });

  push('', home(), { title: 'Home' });
  push('courses/', coursesIndex());
  courses.forEach((c) => push(`courses/${c.slug}/`, courseDetail(c)));
  push('tracks/', tracksIndex());
  tracks.forEach((t) => push(`tracks/${t.id}/`, trackDetail(t)));
  push('live/', liveIndex());
  sessions.forEach((s) => push(`live/${s.slug}/`, liveDetail(s)));
  push('library/', libraryIndex());
  resources.forEach((r) => push(`library/${r.slug}/`, libraryDetail(r)));
  push('blog/', blogIndex());
  posts.forEach((p) => push(`blog/${p.slug}/`, postDetail(p)));
  push('about/', about());
  push('mentors/', mentorsIndex());
  mentors.forEach((m) => push(`mentors/${m.slug}/`, mentorDetail(m)));
  push('contact/', contact());
  push('pricing/', pricing());
  ['privacy', 'terms', 'accessibility'].forEach((k) => push(`legal/${k}/`, legal(k)));
  push('styleguide/', styleguide());
  push('404.html', notFound());
  return out;
}

export { R };
