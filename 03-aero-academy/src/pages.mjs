/* 03 · AERO — page compositions (night, live, dual journey) */
import { page } from '../../shared/lib/site.mjs';
import { icon, head, stars, courseCard, postCard, resourceRow, faqList, field, esc, fmtDuration, fmtPrice } from '../../shared/lib/ui.mjs';
import data from '../../shared/lib/data.mjs';

const { courses, tracks, mentors, sessions, resources, posts, testimonials, faqs, partners, disciplines } = data;

export const site = {
  id: 'aero',
  name: 'Aero',
  fullName: 'Web Academy',
  chip: 'AERO',
  tagline: 'The live academy',
  navLayout: 'split',
  ctaLabel: 'Start learning',
  ctaHref: 'pricing/',
  loginLabel: 'Log in',
  loginHref: 'signin/',
  themeColor: '#001A3D',
  colorScheme: 'dark',
  footerBlurb: 'Live teaching, real rooms, and a way for instructors to earn from what they know. A fictional academy used to demonstrate this template.',
  nav: [
    { label: 'Courses', href: 'courses/' },
    { label: 'Live', href: 'live/' },
    { label: 'Instructors', href: 'instructors/' },
    { label: 'Teach', href: 'teach/' },
    { label: 'Library', href: 'library/' },
    { label: 'Journal', href: 'blog/' },
    { label: 'About', href: 'about/' },
  ],
  footerCols: [
    { title: 'Learn', links: [{ label: 'Courses', href: 'courses/' }, { label: 'Live sessions', href: 'live/' }, { label: 'Library', href: 'library/' }, { label: 'Membership', href: 'pricing/' }] },
    { title: 'Teach', links: [{ label: 'Teach with us', href: 'teach/' }, { label: 'Earnings calculator', href: 'teach/earnings/' }, { label: 'Instructors', href: 'instructors/' }, { label: 'Support', href: 'contact/' }] },
    { title: 'Academy', links: [{ label: 'About', href: 'about/' }, { label: 'Journal', href: 'blog/' }, { label: 'Contact', href: 'contact/' }, { label: 'Accessibility', href: 'legal/accessibility/' }] },
  ],
};

/* depth helper — a flat file such as 404.html lives at the dist root */
const R = (p = '') =>
  p && !p.endsWith('/') ? '' : '../'.repeat(p.split('/').filter(Boolean).length);
const shell = (p, opts = {}) => page(site, R(p), { ...opts, path: p });

const liveSessions = sessions.filter((s) => s.status === 'live');
const upcoming = sessions.filter((s) => s.status === 'upcoming');
const ended = sessions.filter((s) => s.status === 'ended');

/* the stage component — one definition, used on home, live and room */
const stage = ({ session = sessions[3], join = 'Join room', compact = false } = {}) => `
<div class="stage" data-stage>
  <div class="stage__media">
    <img src="${R() === '' ? '' : ''}${'assets/img/aero-room.svg'}" alt="Live session in progress" width="1280" height="800" fetchpriority="high">
  </div>
  <div class="stage__scrim" aria-hidden="true"></div>
  <div class="stage__top">
    <div class="stage__people">
      <img src="assets/img/av-ana.svg" alt="" width="32" height="32">
      <img src="assets/img/av-idris.svg" alt="" width="32" height="32">
      <img src="assets/img/av-mei.svg" alt="" width="32" height="32">
      <span>+ 38 in the room</span>
    </div>
    <span class="live-pill"><span class="live-dot" aria-hidden="true"></span>LIVE <span data-timer aria-live="off">00:14</span></span>
  </div>
  <div class="stage__join">
    <a class="btn btn--primary btn--lg" href="live/${session.slug}/">${join}</a>
  </div>
  <div class="stage__controls" role="group" aria-label="Room controls">
    <button class="stage__btn" type="button" aria-pressed="false" aria-label="Mute microphone">${icon('mic')}</button>
    <button class="stage__btn" type="button" aria-pressed="true" aria-label="Turn camera off">${icon('camera')}</button>
    <button class="stage__btn stage__btn--leave" type="button" aria-label="Leave the room">${icon('phone')}</button>
    <button class="stage__btn" type="button" aria-label="Room settings">${icon('settings')}</button>
  </div>
</div>`;

const horizon = () => `
<div class="horizon" aria-hidden="true">
  <svg viewBox="0 0 2400 120" preserveAspectRatio="none" fill="none">
    <path d="${'M0 60' + Array.from({ length: 10 }, (_, i) => ` c 42 -34 78 -34 120 0 c 42 34 78 34 120 0`).join('')}" vector-effect="non-scaling-stroke"/>
  </svg>
</div>`;

const sessionRowA = (s, Rr = '', { live = false } = {}) => `
<li class="session-row">
  <div class="session-row__time">
    <span class="num" data-datetime="${s.startsAt}" data-datetime-format="time">—</span>
    <span class="meta" data-datetime="${s.startsAt}">—</span>
  </div>
  <div class="session-row__main">
    <div class="flex gap-2 items-center">
      <span class="chip ${live ? 'chip--lime' : 'chip--outline'}">${live ? '<span class="live-dot" aria-hidden="true"></span>LIVE' : s.status === 'ended' ? 'REPLAY' : s.durationMin + ' MIN'}</span>
      <span class="meta">${esc(s.mentor)}</span>
    </div>
    <h3 class="session-row__title"><a href="${Rr}live/${s.slug}/">${esc(s.title)}</a></h3>
  </div>
  <div class="session-row__seats">
    <span class="meta num">${s.seats - s.seatsFilled} of ${s.seats} seats</span>
    <div class="meter" role="progressbar" aria-valuenow="${s.seatsFilled}" aria-valuemin="0" aria-valuemax="${s.seats}" aria-label="Seats filled"><span style="width:${Math.round(s.seatsFilled / s.seats * 100)}%"></span></div>
  </div>
  <div class="session-row__cta"><a class="btn btn--ghost btn--sm" href="${Rr}live/${s.slug}/">${s.status === 'ended' ? 'Watch' : 'Reserve'}</a></div>
</li>`;

const instructorTile = (m, Rr = '') => `
<a class="ic-tile" href="${Rr}instructors/${m.slug}/">
  <img src="${Rr}assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="400" height="500" loading="lazy">
  <span class="ic-tile__body">
    <span class="ic-tile__name">${esc(m.name)} ${icon('arrowUpRight', 'ic-tile__go')}</span>
    <span class="ic-tile__role">${esc(m.specialty[0])} · ${m.students.toLocaleString()} learners</span>
  </span>
</a>`;

/* -------------------------------------------------------------------------- */
/* HOME                                                                      */
/* -------------------------------------------------------------------------- */
const home = () => shell('', {
  title: 'Web Academy Aero',
  desc: 'Live courses taught by working instructors, plus a way to earn from what you already know.',
  bodyClass: 'home',
  body: `
  <section class="hero night">
    <div class="glow glow--sky" aria-hidden="true"></div>
    <div class="glow glow--lime" aria-hidden="true"></div>
    <div class="container">
      <div class="hero__grid">
        <div class="hero__copy">
          <p class="kicker"><span class="kicker__dot"></span>// Live academy</p>
          <h1 class="hero__title">
            Learn from people who are
            <span class="em" data-typein aria-label="still doing the work">still doing the work</span>
          </h1>
          <p class="lede">Live rooms every week, recordings the same day, and instructors you can ask a question to. Or teach here and keep 88% of what you charge.</p>
          <div class="hero__actions">
            <a class="btn btn--primary btn--lg" href="live/">Join a live session</a>
            <a class="btn btn--ghost btn--lg" href="teach/">Teach on Web Academy ${icon('arrow', 'btn__icon')}</a>
          </div>
          <div class="proof">
            <div class="flex items-center gap-3">
              <span class="proof__avatars">
                <img src="assets/img/av-sofia.svg" alt="" width="36" height="36">
                <img src="assets/img/av-omar.svg" alt="" width="36" height="36">
                <img src="assets/img/av-hala.svg" alt="" width="36" height="36">
              </span>
              <span><span class="proof__num" data-count="25400">25,400</span><span class="proof__label">learners since 2022</span></span>
            </div>
            <div>
              <span class="proof__num">4.9</span>
              <span class="proof__label">avg. session rating</span>
            </div>
          </div>
        </div>
        <div class="stage-wrap">
          ${stage({ session: sessions[3] })}
          <div class="stage-quote">
            <p>“This is the only platform where I have actually finished a course.”</p>
            <p>Priya S. · interface craft, cohort 6</p>
            <a class="btn btn--ghost btn--sm" href="blog/">Read the story</a>
          </div>
        </div>
      </div>
    </div>
    ${horizon()}
  </section>

  <section class="section section--tight">
    <div class="marquee" aria-label="Institutions that send teams">
      <div class="marquee__track">
        ${partners.map((p) => `<span>${p}</span>`).join('')}
        <span aria-hidden="true">${partners.map((p) => p).join('</span><span>')}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__media"><img src="assets/img/nova-collab.svg" alt="" width="900" height="700" loading="lazy"></div>
        <div>
          <p class="kicker"><span class="kicker__dot"></span>// Who we are</p>
          <h2 class="h2" style="margin-block-start:12px">Teaching is a room,<br>not a video library.</h2>
          <p class="lede" style="margin-block-start:14px">We started in 2022 with one live room and twelve people. The format has not changed, only the number of rooms.</p>
          <p class="small" style="margin-block-start:12px">Every instructor here still practises. Sessions are capped so questions get answered, and everything is recorded so nobody loses the material.</p>
          <div class="stat3" style="margin-block-start:24px">
            <div><p class="stat3__v">1</p><p class="stat3__l">top-rated academy</p></div>
            <div><p class="stat3__v" data-count="25400">25,400</p><p class="stat3__l">learners</p></div>
            <div><p class="stat3__v">88%</p><p class="stat3__l">paid to instructors</p></div>
          </div>
          <a class="btn btn--ghost" href="about/" style="margin-block-start:24px">Watch the film ${icon('play', 'btn__icon')}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({
        kicker: '// Live this week',
        title: 'Sessions you can join tonight',
        lede: 'Free to attend when you are a member. Every session is recorded, but the questions only happen live.',
        action: `<a class="btn btn--ghost btn--sm" href="live/">Full calendar ${icon('arrow', 'btn__icon')}</a>`,
      })}
      <ul class="session-list">
        ${[liveSessions[0], ...upcoming.slice(0, 3)].filter(Boolean).map((s) => sessionRowA(s, '', { live: s.status === 'live' })).join('')}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({ kicker: '// Instructors', title: 'Ways to earn from what you know', lede: 'Three formats, one payout date. The calculator is honest about the assumptions.' })}
      <div class="earn">
        ${[['Self-paced course', 'Record once, sell forever. You set the price.', '$49+', 'cover-c1'],
          ['Live cohort', 'Six weeks, a fixed room, a premium price.', '$240+', 'cover-c7'],
          ['Membership', 'Monthly access to your sessions and archive.', '$19/mo', 'cover-c9']]
          .map(([t, b, p, art]) => `
          <div class="earn__card">
            <div class="earn__art"><img src="assets/img/${art}.svg" alt="" width="480" height="360" loading="lazy"></div>
            <p class="earn__price">${p}</p>
            <h3 class="h4" style="color:#fff">${t}</h3>
            <p class="small">${b}</p>
            <a class="link-arrow" href="teach/" style="margin-block-start:auto;color:#fff">How it works ${icon('arrow')}</a>
          </div>`).join('')}
      </div>
      <p class="small mt-6">Figures are illustrative. Payouts are monthly, on the 5th, and the platform keeps 12%.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// Featured', title: 'Courses in progress', action: `<a class="btn btn--ghost btn--sm" href="courses/">All courses ${icon('arrow', 'btn__icon')}</a>` })}
      <div class="grid grid--3">${courses.slice(0, 3).map((c) => courseCard(c, '')).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({ kicker: '// In the room', title: 'Meet the instructors', action: `<a class="btn btn--ghost btn--sm" href="instructors/">All instructors ${icon('arrow', 'btn__icon')}</a>` })}
      <div class="ic-grid">${mentors.slice(0, 3).map((m) => instructorTile(m)).join('')}</div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// Library', title: 'Take something with you', action: `<a class="btn btn--ghost btn--sm" href="library/">Browse the library ${icon('arrow', 'btn__icon')}</a>` })}
      <ul class="res-list">${resources.slice(0, 4).map((r) => resourceRow(r, '')).join('')}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${head({ kicker: '// Voices', title: 'What learners and instructors say', align: 'center' })}
      <div class="grid grid--3">
        ${testimonials.slice(0, 3).map((t) => `
          <figure class="earn__card" style="gap:12px">
            <span style="font-size:2rem;color:var(--accent);line-height:1">“</span>
            <blockquote style="color:#fff;font-size:.9375rem">${esc(t.quote)}</blockquote>
            <figcaption class="small" style="margin-block-start:auto">${t.name} — ${t.role}</figcaption>
          </figure>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// Journal', title: 'Notes from the room', action: `<a class="btn btn--ghost btn--sm" href="blog/">All articles ${icon('arrow', 'btn__icon')}</a>` })}
      <div class="grid grid--3">${posts.slice(0, 3).map((p) => postCard(p, '')).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid grid--2" style="gap:var(--gutter)">
        <div class="earn__card" style="padding:clamp(24px,3.4vw,44px)">
          <p class="kicker">For learners</p>
          <h2 class="h3" style="margin-block-start:8px">Learn something live this week.</h2>
          <p class="small">Membership opens every session, every replay and the whole library.</p>
          <a class="btn btn--primary" href="pricing/" style="margin-block-start:16px;align-self:flex-start">Start learning</a>
        </div>
        <div class="earn__card" style="padding:clamp(24px,3.4vw,44px)">
          <p class="kicker">For instructors</p>
          <h2 class="h3" style="margin-block-start:8px">Teach what you already know.</h2>
          <p class="small">Build a course, run a cohort, keep 88%. We handle payments and replays.</p>
          <a class="btn btn--ghost" href="teach/" style="margin-block-start:16px;align-self:flex-start">Apply to teach</a>
        </div>
      </div>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* COURSES                                                                    */
/* -------------------------------------------------------------------------- */
const coursesIndex = () => shell('courses/', {
  title: 'Courses',
  desc: 'Live and self-paced courses across design, engineering, data, motion and teaching.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Courses</li></ol>
    <h1>Courses</h1>
    <p class="lede">Sixteen courses, each with a live or self-paced format. Every card opens a full syllabus.</p>
  </div></div>
  <section class="section section--flush" data-filter="track">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by track">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${tracks.map((t) => `<button class="facet" data-facet="${t.id}" aria-pressed="false">${t.label}</button>`).join('')}
        </div>
        <div class="flex items-center gap-3">
          <label class="search-inline">${icon('search')}<span class="sr-only">Search</span><input type="search" placeholder="Search courses" data-filter-search></label>
          <span class="filter-count"><span data-filter-count>${courses.length}</span> results</span>
        </div>
      </div>
      <h2 class="sr-only">All courses</h2>
      <div class="grid grid--3">${courses.map((c) => courseCard(c, '../').replace('<article', '<article data-item')).join('')}</div>
      <div class="empty mt-6" data-filter-empty hidden><p>No courses match. Try another track.</p></div>
    </div>
  </section>`,
});

const courseDetail = (c) => shell(`courses/${c.slug}/`, {
  title: c.title,
  desc: c.subtitle,
  progress: true,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.description, provider: { '@type': 'Organization', name: 'Web Academy' } }],
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Courses</a></li><li>${c.trackLabel}</li></ol>
    <div class="flex wrap gap-2"><span class="chip chip--lime">${c.level}</span><span class="chip chip--outline">${c.trackLabel}</span><span class="chip chip--outline">Updated ${c.updated}</span></div>
    <h1>${esc(c.title)}</h1>
    <p class="lede">${esc(c.subtitle)}</p>
    <div class="flex wrap gap-5 items-center">
      <span class="flex items-center gap-2">${stars(5)} <strong class="num">${c.rating}</strong> <span class="meta">(${c.ratingCount})</span></span>
      <span class="flex items-center gap-2 meta">${icon('users')} <span class="num">${c.students.toLocaleString()}</span> learners</span>
      <span class="flex items-center gap-2 meta">${icon('clock')} ${fmtDuration(c.duration)}</span>
    </div>
  </div></div>
  <section class="section section--flush">
    <div class="container grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(24px,4vw,48px);align-items:start">
      <div class="stack" style="--stack:var(--sp-8)">
        <div class="stage" style="aspect-ratio:16/9">
          <div class="stage__media"><img src="../../assets/img/${c.art}.svg" alt="" width="1280" height="720"></div>
          <div class="stage__join"><button class="btn btn--primary btn--lg" type="button">${icon('play', 'btn__icon')} Play preview</button></div>
        </div>
        <div>
          <h2 class="h3">What you will be able to do</h2>
          <div class="grid grid--2 mt-4" style="gap:12px">
            ${c.outcomes.concat(['Explain your decisions to a team', 'Ship a project you can show']).map((o) => `<p class="flex gap-2 items-start" style="font-size:.9375rem"><span class="chip chip--lime" style="height:20px;width:20px;padding:0;justify-content:center;flex:none;border-radius:50%">${icon('check')}</span> ${esc(o)}</p>`).join('')}
          </div>
        </div>
        <div>
          <h2 class="h3">Curriculum</h2>
          <div class="acc mt-4" data-acc="single">
            ${c.sections.map((s, i) => `
              <div class="acc__item">
                <h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="s${i}">
                  <span>${esc(s.title)} <span class="meta" style="font-weight:400">· ${s.lessons.length} lessons</span></span><span class="acc__sign" aria-hidden="true"></span>
                </button></h3>
                <div class="acc__panel" id="s${i}"><div>
                  ${s.lessons.map((l, j) => `<div class="flex items-center gap-3" style="padding-block:10px;border-block-start:1px solid var(--line);font-size:.875rem;color:var(--ink-2)">${icon(j === 0 ? 'play' : 'video')}<span>${esc(l)}</span>${j === 0 ? '<span class="chip chip--lime">PREVIEW</span>' : ''}<span class="meta" style="margin-inline-start:auto">${8 + j * 3} min</span></div>`).join('')}
                </div></div>
              </div>`).join('')}
          </div>
        </div>
        <div>
          <h2 class="h3">Live schedule</h2>
          <ul class="session-list mt-4">${sessions.slice(0, 3).map((s) => sessionRowA(s, '../../')).join('')}</ul>
        </div>
        <div>
          <h2 class="h3">About this course</h2>
          <div class="prose mt-3"><p>${esc(c.description)}</p>
            <p>Lessons are recorded in the same room you join, so you see the questions people actually ask. Files and code are yours to keep.</p></div>
        </div>
        <div>
          <h2 class="h3">Reviews</h2>
          <div class="mt-3">${c.reviews.map((r) => `<div style="padding-block:16px;border-block-start:1px solid var(--line)">
            <div class="flex items-center gap-3"><img class="avatar" src="../../assets/img/av-${mentors[0].id}.svg" alt="" width="32" height="32"><strong style="font-size:.875rem">${r.name}</strong><span class="stars">${icon('star')}</span><span class="meta" style="margin-inline-start:auto">${r.date}</span></div>
            <p class="small" style="margin-block-start:8px">${esc(r.body)}</p></div>`).join('')}</div>
        </div>
      </div>
      <aside class="earn__card" style="position:sticky;inset-block-start:96px">
        <p class="kicker">Enrol</p>
        <p class="calc__big" style="font-size:2rem">${c.free ? 'Free' : fmtPrice(c.price)}</p>
        <a class="btn btn--primary btn--block btn--lg" href="../../pricing/">${c.free ? 'Start for free' : 'Enrol now'}</a>
        <button class="btn btn--ghost btn--block" type="button" data-fav aria-pressed="false">${icon('heart', 'btn__icon')} Save for later</button>
        <ul class="plan__list" style="margin-block-start:8px">
          <li>${icon('check')} Lifetime access to the recordings</li>
          <li>${icon('check')} Live office hours with the instructor</li>
          <li>${icon('check')} Certificate of completion</li>
          <li>${icon('check')} 30-day refund</li>
        </ul>
        <div class="flex items-center gap-3" style="margin-block-start:8px;padding-block-start:16px;border-block-start:1px solid var(--line)">
          <img class="avatar" src="../../assets/img/av-${c.mentorId}.svg" alt="" width="40" height="40">
          <span><strong style="font-size:.875rem">${esc(c.mentor)}</strong><br><span class="meta">${esc(mentors.find((m) => m.id === c.mentorId).role)}</span></span>
        </div>
      </aside>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* LIVE                                                                       */
/* -------------------------------------------------------------------------- */
const liveIndex = () => shell('live/', {
  title: 'Live sessions',
  desc: 'The calendar of live rooms: critique nights, clinics, workshops and office hours.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Live</li></ol>
    <h1>Live sessions</h1>
    <p class="lede">Times in <span data-tz>your timezone</span>. Replays are published the same evening.</p>
    <div class="seg" data-tabset="live" role="tablist" aria-label="Session state">
      <span class="seg__ind" aria-hidden="true"></span>
      <button class="seg__btn" role="tab" data-tab="now" aria-selected="true">Live now</button>
      <button class="seg__btn" role="tab" data-tab="up" aria-selected="false">Upcoming</button>
      <button class="seg__btn" role="tab" data-tab="past" aria-selected="false">Replays</button>
    </div>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div data-panel="now" data-panel-group="live">
        <div class="grid grid--2" style="gap:var(--gutter);align-items:start">
          <div>${stage({ join: 'Join now' })}</div>
          <div>
            ${liveSessions.map((s) => `<div class="earn__card" style="margin-block-end:12px">
              <div class="flex items-center gap-2"><span class="chip chip--lime"><span class="live-dot" aria-hidden="true"></span>LIVE</span><span class="meta">${s.mentor}</span></div>
              <h2 class="h4" style="color:#fff">${esc(s.title)}</h2>
              <p class="small">${esc(s.blurb)}</p>
              <a class="btn btn--ghost btn--sm" href="./${s.slug}/" style="align-self:flex-start">Enter the room</a>
            </div>`).join('')}
            <div class="earn__card">
              <p class="kicker">Next up</p>
              <h2 class="h4" style="color:#fff">${esc(upcoming[0].title)}</h2>
              <p class="small"><span data-datetime="${upcoming[0].startsAt}">—</span> · ${upcoming[0].mentor}</p>
              <a class="btn btn--ghost btn--sm" href="./${upcoming[0].slug}/" style="align-self:flex-start">Remind me</a>
            </div>
          </div>
        </div>
      </div>
      <div data-panel="up" data-panel-group="live" hidden>
        <h2 class="sr-only">Upcoming sessions</h2>
        <ul class="session-list">${upcoming.map((s) => sessionRowA(s, '../')).join('')}</ul>
      </div>
      <div data-panel="past" data-panel-group="live" hidden>
        <h2 class="sr-only">Replays</h2>
        <div class="grid grid--3">
          ${ended.map((s, i) => `
            <article class="card card--link">
              <div class="card__media" style="aspect-ratio:16/9">
                <img src="../assets/img/cover-c${(i % 8) + 1}.svg" alt="" width="800" height="450" loading="lazy">
                <span class="chip card__flag">${s.durationMin} min</span>
              </div>
              <div class="card__body">
                <h3 class="card__title"><a class="card__cover" href="./${s.slug}/">${esc(s.title)}</a></h3>
                <p class="meta">${esc(s.mentor)} · ${new Date(s.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </div>
  </section>`,
});

const sessionDetail = (s) => {
  const isLive = s.status === 'live';
  const isEnded = s.status === 'ended';
  if (isLive) {
    return shell(`live/${s.slug}/`, {
      title: s.title,
      desc: s.blurb,
      bodyClass: 'room-page',
      body: `
      <section class="room night">
        <div class="container">
          <div class="flex wrap items-center justify-between gap-3" style="margin-block-end:20px">
            <div class="flex items-center gap-3">
              <span class="live-pill"><span class="live-dot" aria-hidden="true"></span>LIVE</span>
              <h1 class="h4" style="color:#fff">${esc(s.title)}</h1>
            </div>
            <span class="meta">${esc(s.mentor)} · ${s.durationMin} min</span>
          </div>
          <div class="room__stage">${stage({ session: s, join: 'Join the room' })}</div>
          <div class="room__strip" aria-label="Participants">
            ${mentors.slice(0, 6).map((m) => `<img src="../../assets/img/av-${m.id}.svg" alt="${esc(m.name)}" width="84" height="56">`).join('')}
          </div>
          <div class="grid grid--2" style="gap:var(--gutter);margin-block-start:32px">
            <div class="earn__card">
              <p class="kicker">Agenda</p>
              <ul class="plan__list" style="margin-block-start:8px">${s.agenda.map((a) => `<li><span class="meta num" style="min-width:52px">${a.time}</span> ${a.topic}</li>`).join('')}</ul>
            </div>
            <div class="earn__card">
              <p class="kicker">Questions</p>
              <p class="small">Ask in the room, or leave a question here and it will be raised before the end.</p>
              <form class="flex gap-2" style="margin-block-start:12px" data-validate novalidate>
                <label class="sr-only" for="q">Your question</label>
                <input class="input" id="q" placeholder="Type a question…" style="flex:1">
                <button class="btn btn--primary btn--sm" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>`,
    });
  }
  return shell(`live/${s.slug}/`, {
    title: s.title,
    desc: s.blurb,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Event', name: s.title, startDate: s.startsAt, eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', organizer: { '@type': 'Organization', name: 'Web Academy' } }],
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Live</a></li><li>${esc(s.title)}</li></ol>
      <div class="flex wrap gap-2">
        <span class="chip ${isEnded ? 'chip--outline' : 'chip--lime'}">${isEnded ? 'REPLAY' : 'UPCOMING'}</span>
        <span class="chip chip--outline">${s.durationMin} min</span>
      </div>
      <h1>${esc(s.title)}</h1>
      <p class="lede">${esc(s.blurb)}</p>
      <p class="small">${icon('calendar')} <span data-datetime="${s.startsAt}">—</span> · <span data-tz></span></p>
    </div></div>
    <section class="section section--flush">
      <div class="container grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(24px,4vw,48px);align-items:start">
        <div class="stack" style="--stack:var(--sp-7)">
          ${isEnded ? `<div class="stage" style="aspect-ratio:16/9"><div class="stage__media"><img src="../../assets/img/aero-room.svg" alt="" width="1280" height="720"></div>
            <div class="stage__join"><button class="btn btn--primary btn--lg" type="button">${icon('play', 'btn__icon')} Watch the replay</button></div></div>`
            : `<div data-countdown="${s.startsAt}" class="earn__card" style="text-align:center">
                <p class="kicker">Starts in</p>
                <p class="calc__big" data-countdown-value>00:00:00</p>
                <p class="small">A reminder goes out one hour before.</p>
              </div>`}
          <div>
            <h2 class="h3">Agenda</h2>
            <ul class="plan__list mt-4">${s.agenda.map((a) => `<li><span class="meta num" style="min-width:56px">${a.time}</span> ${a.topic}</li>`).join('')}</ul>
          </div>
          <div>
            <h2 class="h3">What to bring</h2>
            <ul class="prose mt-3"><li>A microphone that works</li><li>One question you have been avoiding</li><li>Chrome or Firefox, and five megabits</li></ul>
          </div>
        </div>
        <aside class="earn__card" style="position:sticky;inset-block-start:96px">
          <p class="kicker">${isEnded ? 'Replay' : 'Seats'}</p>
          <p class="calc__big" style="font-size:2rem">${s.seats - s.seatsFilled} <span style="font-size:1rem;color:var(--ink-3)">of ${s.seats}</span></p>
          <div class="meter"><span style="width:${Math.round(s.seatsFilled / s.seats * 100)}%"></span></div>
          <a class="btn btn--primary btn--block" href="../../pricing/">${isEnded ? 'Watch replay' : 'Reserve a seat'}</a>
          <a class="btn btn--ghost btn--block" href="#" onclick="return false">Add to calendar</a>
          <div class="flex items-center gap-3" style="padding-block-start:16px;border-block-start:1px solid var(--line)">
            <img class="avatar" src="../../assets/img/av-${s.mentorId}.svg" alt="" width="40" height="40">
            <span><strong style="font-size:.875rem">${esc(s.mentor)}</strong><br><span class="meta">Host</span></span>
          </div>
        </aside>
      </div>
    </section>`,
  });
};

/* -------------------------------------------------------------------------- */
/* INSTRUCTORS                                                                */
/* -------------------------------------------------------------------------- */
const instructorsIndex = () => shell('instructors/', {
  title: 'Instructors',
  desc: 'The people who teach live on Web Academy, and what they practise.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Instructors</li></ol>
    <h1>Instructors</h1>
    <p class="lede">Everyone here earns from teaching and still does the work. That is the only hiring criterion.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="ic-grid">${mentors.map((m) => instructorTile(m)).join('')}</div>
    </div>
  </section>`,
});

const instructorDetail = (m) => {
  const mine = courses.filter((c) => c.mentorId === m.id);
  return shell(`instructors/${m.slug}/`, {
    title: m.name,
    desc: m.bio,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Person', name: m.name, jobTitle: m.role, description: m.bio }],
    body: `
    <div class="page-head"><div class="container">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Instructors</a></li><li>${esc(m.name)}</li></ol>
      <div class="grid" style="grid-template-columns:280px minmax(0,1fr);gap:clamp(24px,4vw,48px);align-items:start;margin-block-start:20px">
        <div style="border-radius:24px;overflow:hidden;border:1px solid var(--line)"><img src="../../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="480" height="600"></div>
        <div class="stack" style="--stack:var(--sp-4)">
          <p class="kicker">${esc(m.role)} · ${esc(m.city)}</p>
          <h1>${esc(m.name)}</h1>
          <p class="lede">${esc(m.bio)}</p>
          <div class="stat3" style="margin-block-start:8px">
            <div><p class="stat3__v" data-count="${m.students}">${m.students.toLocaleString()}</p><p class="stat3__l">learners</p></div>
            <div><p class="stat3__v">${m.courses}</p><p class="stat3__l">courses</p></div>
            <div><p class="stat3__v">${m.rating}</p><p class="stat3__l">rating</p></div>
          </div>
          <p class="small">“${esc(m.quote)}”</p>
          <div class="flex wrap gap-3"><a class="btn btn--primary" href="../../contact/">Book a 1:1</a><button class="btn btn--ghost" type="button" aria-pressed="false">Follow</button></div>
        </div>
      </div>
    </div></div>
    <section class="section">
      <div class="container">
        ${head({ kicker: 'Teaches', title: 'Courses and sessions' })}
        <div class="grid grid--3">${mine.map((c) => courseCard(c, '../../')).join('')}</div>
        <div class="mt-8"><h2 class="h3" style="margin-block-end:16px">Sessions hosted</h2>
          <ul class="session-list">${sessions.filter((s) => s.mentorId === m.id).map((s) => sessionRowA(s, '../../')).join('')}</ul>
        </div>
      </div>
    </section>`,
  });
};

/* -------------------------------------------------------------------------- */
/* TEACH + CALCULATOR                                                         */
/* -------------------------------------------------------------------------- */
const teach = () => shell('teach/', {
  title: 'Teach with us',
  desc: 'Build a course, run a live cohort or sell a membership. You keep 88%, paid monthly.',
  body: `
  <section class="hero night">
    <div class="glow glow--lime" aria-hidden="true"></div>
    <div class="container">
      <div class="hero__copy" style="max-width:56ch">
        <p class="kicker"><span class="kicker__dot"></span>// For instructors</p>
        <h1 class="hero__title">Teach what you already know.<span class="em" data-typein aria-label="get paid for it">get paid for it</span></h1>
        <p class="lede">Three ways to earn, one payout date, and a platform that handles the rooms, the replays and the invoices.</p>
        <div class="hero__actions">
          <a class="btn btn--primary btn--lg" href="#apply">Apply to teach</a>
          <a class="btn btn--ghost btn--lg" href="#calc">Try the calculator ${icon('arrow', 'btn__icon')}</a>
        </div>
      </div>
      <div class="stat3" style="margin-block-start:40px;max-width:720px">
        <div><p class="stat3__v">88%</p><p class="stat3__l">you keep, per sale</p></div>
        <div><p class="stat3__v">5th</p><p class="stat3__l">of every month, payouts</p></div>
        <div><p class="stat3__v">1</p><p class="stat3__l">form to get started</p></div>
      </div>
    </div>
    ${horizon()}
  </section>

  <section class="section">
    <div class="container">
      ${head({ kicker: '// How it works', title: 'Four steps, no gatekeeping' })}
      <ol class="session-list" style="list-style:none;padding:0">
        ${[['Apply', 'One form, three links to your work. We reply within a week.'],
          ['Build', 'We help you structure the first live session or the first module.'],
          ['Launch', 'Your page, your pricing, your dates. We promote it to the audience.'],
          ['Get paid', 'Monthly payout on the 5th, with a statement that adds up.']]
          .map(([t, b], i) => `<li class="session-row" style="grid-template-columns:64px minmax(0,1fr)">
            <span class="mono" style="color:var(--accent)">0${i + 1}</span>
            <div><h3 class="h4" style="color:#fff">${t}</h3><p class="small">${b}</p></div>
          </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// Formats', title: 'Sell it the way you like to teach', align: 'center' })}
      <div class="earn">
        ${[['Courses', 'Self-paced, recorded, sold individually.', 'cover-c1'],
          ['Live cohorts', 'A fixed room for six weeks, premium priced.', 'cover-c7'],
          ['Memberships', 'Recurring access to your sessions and archive.', 'cover-c9']]
          .map(([t, b, art]) => `<div class="earn__card"><div class="earn__art"><img src="assets/img/${art}.svg" alt="" width="480" height="360" loading="lazy"></div><h3 class="h4" style="color:#fff">${t}</h3><p class="small">${b}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" id="calc">
    <div class="container">
      ${head({ kicker: '// Earnings', title: 'What could this actually pay?', lede: 'Move the sliders. The numbers are illustrative, not a promise — but the arithmetic is honest.' })}
      <div class="calc" data-calc>
        <div>
          <div class="calc__field">
            <div class="calc__row"><label class="label" for="seats">Students per cohort</label><span class="calc__val" data-out="seats">30</span></div>
            <input type="range" id="seats" min="5" max="200" value="30" step="5" data-input="seats">
          </div>
          <div class="calc__field">
            <div class="calc__row"><label class="label" for="price">Price per seat</label><span class="calc__val" data-out="price">$49</span></div>
            <input type="range" id="price" min="9" max="499" value="49" step="10" data-input="price">
          </div>
          <div class="calc__field">
            <div class="calc__row"><label class="label" for="cohorts">Cohorts per year</label><span class="calc__val" data-out="cohorts">6</span></div>
            <input type="range" id="cohorts" min="1" max="12" value="6" step="1" data-input="cohorts">
          </div>
          <p class="small">After the 12% platform fee. Before tax and your own costs.</p>
        </div>
        <div class="calc__out">
          <p class="kicker">Your share, per year</p>
          <p class="calc__big" data-result aria-live="polite">$7,761</p>
          <div class="calc__bars" aria-hidden="true" data-bars></div>
          <p class="small" style="margin-block-start:14px">Estimates assume every seat sells. Most first cohorts sell out at a smaller size, which is why we cap them.</p>
          <a class="btn btn--primary btn--sm" href="#apply" style="margin-block-start:14px">Start an application</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="apply">
    <div class="container grid" style="grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(24px,4vw,56px);align-items:start">
      <div>
        ${head({ kicker: '// Apply', title: 'Tell us what you teach', align: 'left' })}
        <form class="form-stack" data-validate novalidate>
          <div data-error-summary hidden class="form-error-summary" role="alert"></div>
          ${field({ id: 't-name', label: 'Your name', autocomplete: 'name', rules: 'required', msg: 'Required' })}
          ${field({ id: 't-email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email' })}
          ${field({ id: 't-disc', label: 'Discipline', tag: 'select', options: disciplines, rules: 'required' })}
          ${field({ id: 't-port', label: 'Portfolio URL', type: 'url', rules: 'url', msg: 'A full URL, including https://', optional: true })}
          ${field({ id: 't-aud', label: 'Audience size', tag: 'select', options: ['Just starting', 'Under 1,000', '1,000–10,000', 'Over 10,000'] })}
          ${field({ id: 't-what', label: 'What would you teach first?', tag: 'textarea', rules: 'required', msg: 'A sentence or two is enough.' })}
          <button class="btn btn--primary btn--lg" type="submit">Apply to teach</button>
        </form>
        <div data-success hidden class="form-success">
          <span class="form-success__tick">${icon('check')}</span>
          <h2 class="h3" data-success-focus tabindex="-1">Application received</h2>
          <p class="small">Demo form — nothing was sent. In production you would hear from us within a week.</p>
        </div>
      </div>
      <div>
        ${head({ kicker: '// Questions', title: 'Instructors ask us', align: 'left' })}
        ${faqList(faqs.slice(0, 4), { id: 'teach-faq' })}
      </div>
    </div>
  </section>`,
});

const earnings = () => shell('teach/earnings/', {
  title: 'Earnings calculator',
  desc: 'Estimate what teaching on Web Academy could pay, with the assumptions shown.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Teach</a></li><li>Earnings</li></ol>
    <h1>Earnings calculator</h1>
    <p class="lede">A model, not a promise. It shows the arithmetic so you can disagree with the assumptions.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">${calcBlock()}</div>
  </section>
  <section class="section">
    <div class="container container--narrow">
      ${head({ kicker: '// Assumptions', title: 'What the numbers include' })}
      <div class="acc" data-acc="single">
        ${[['Platform fee', 'We keep 12% of each sale. Payment processing is included in that fee — there is no separate charge.'],
          ['Payout timing', 'Payouts run on the 5th of each month for the previous month, by bank transfer.'],
          ['Refunds', 'Refunds are deducted from the following payout, not clawed back after the fact.'],
          ['Tax', 'You are responsible for your own tax. We issue a statement of earnings each January.'],
          ['What is not modelled', 'Marketing spend, your production costs, and the likelihood that a first cohort is smaller.']]
          .map(([q, a], i) => `<div class="acc__item"><h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="c${i}"><span>${q}</span><span class="acc__sign" aria-hidden="true"></span></button></h3>
            <div class="acc__panel" id="c${i}"><div><p>${a}</p></div></div></div>`).join('')}
      </div>
      <div class="mt-8"><a class="btn btn--primary" href="../">Apply to teach</a></div>
    </div>
  </section>`,
});

const calcBlock = () => `
<div class="calc" data-calc>
  <div>
    <div class="calc__field">
      <div class="calc__row"><label class="label" for="seats2">Students per cohort</label><span class="calc__val" data-out="seats">30</span></div>
      <input type="range" id="seats2" min="5" max="200" value="30" step="5" data-input="seats">
    </div>
    <div class="calc__field">
      <div class="calc__row"><label class="label" for="price2">Price per seat</label><span class="calc__val" data-out="price">$49</span></div>
      <input type="range" id="price2" min="9" max="499" value="49" step="10" data-input="price">
    </div>
    <div class="calc__field">
      <div class="calc__row"><label class="label" for="cohorts2">Cohorts per year</label><span class="calc__val" data-out="cohorts">6</span></div>
      <input type="range" id="cohorts2" min="1" max="12" value="6" step="1" data-input="cohorts">
    </div>
    <p class="small">After the 12% platform fee. Before tax and your own costs.</p>
  </div>
  <div class="calc__out">
    <p class="kicker">Your share, per year</p>
    <p class="calc__big" data-result aria-live="polite">$7,761</p>
    <div class="calc__bars" aria-hidden="true" data-bars></div>
    <p class="small" style="margin-block-start:14px">Illustrative only. Not a guarantee of earnings.</p>
  </div>
</div>`;

/* -------------------------------------------------------------------------- */
/* LIBRARY, BLOG, ABOUT, PRICING, CONTACT, SIGNIN, LEGAL, 404                 */
/* -------------------------------------------------------------------------- */
const libraryIndex = () => shell('library/', {
  title: 'Library',
  desc: 'Guides, templates and recordings from the live sessions. Free.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Library</li></ol>
    <h1>Library</h1>
    <p class="lede">Everything shared in a live room, kept in one place.</p>
  </div></div>
  <section class="section section--flush" data-filter="type">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by type">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${['Guide', 'Template', 'Checklist'].map((t) => `<button class="facet" data-facet="${t}" aria-pressed="false">${t}</button>`).join('')}
        </div>
        <span class="filter-count"><span data-filter-count>${resources.length}</span> files</span>
      </div>
      <h2 class="sr-only">All resources</h2>
      <ul class="res-list">${resources.map((r) => resourceRow(r, '../').replace('<li', '<li data-item')).join('')}</ul>
      <div class="empty mt-6" data-filter-empty hidden><p>Nothing in that category.</p></div>
    </div>
  </section>`,
});

const libraryDetail = (r) => shell(`library/${r.slug}/`, {
  title: r.title,
  desc: r.blurb,
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Library</a></li><li>${r.type}</li></ol>
    <h1>${esc(r.title)}</h1>
    <p class="lede">${esc(r.blurb)}</p>
  </div></div>
  <section class="section section--flush">
    <div class="container grid" style="grid-template-columns:minmax(0,8fr) minmax(0,4fr);gap:clamp(24px,4vw,48px);align-items:start">
      <div class="stack" style="--stack:var(--sp-6)">
        <div style="border-radius:24px;overflow:hidden;border:1px solid var(--line)"><img src="../../assets/img/${r.art}.svg" alt="" width="900" height="500" style="width:100%"></div>
        <div class="prose"><h2>What is inside</h2><p>${esc(r.blurb)}</p>
          <ul><li>The one-page version</li><li>The full checklist, with examples</li><li>A blank version to fill in</li></ul></div>
      </div>
      <aside class="earn__card" style="position:sticky;inset-block-start:96px">
        <p class="kicker">Download</p>
        <p class="h4" style="color:#fff">${r.pages} pages · ${r.size}</p>
        <p class="small">${r.updated}</p>
        <a class="btn btn--primary btn--block" href="#" onclick="return false">${icon('download', 'btn__icon')} Download free</a>
        <ul class="plan__list"><li>${icon('check')} No account needed</li><li>${icon('check')} Print-friendly</li></ul>
      </aside>
    </div>
  </section>`,
});

const blogIndex = () => shell('blog/', {
  title: 'Journal',
  desc: 'Notes on live teaching, motion, accessibility and the business of creative work.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Journal</li></ol>
    <h1>Journal</h1>
    <p class="lede">Written between sessions.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <h2 class="sr-only">All articles</h2>
      <div class="grid grid--3">${posts.map((p, i) => postCard(p, '../', { lead: i === 0 }).replace('<article', `<article ${i === 0 ? 'style="grid-column:span 2"' : ''}`)).join('')}</div>
    </div>
  </section>`,
});

const postDetail = (p) => shell(`blog/${p.slug}/`, {
  title: p.title,
  desc: p.excerpt,
  progress: true,
  ogType: 'article',
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.excerpt, datePublished: p.publishedAt, author: { '@type': 'Person', name: p.author } }],
  body: `
  <article>
    <div class="page-head"><div class="container" style="max-width:820px">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Journal</a></li><li>${p.category}</li></ol>
      <p class="kicker mt-4"><span class="kicker__dot"></span>${p.category} · ${p.readingMin} min</p>
      <h1>${esc(p.title)}</h1>
      <p class="lede">${esc(p.excerpt)}</p>
      <div class="flex items-center gap-3 mt-4">
        <img class="avatar" src="../../assets/img/av-${p.authorId}.svg" alt="" width="40" height="40">
        <span><strong style="font-size:.875rem">${esc(p.author)}</strong><br><span class="meta"><time datetime="${p.publishedAt}">${p.dateLabel}</time></span></span>
      </div>
    </div></div>
    <div class="container" style="max-width:820px">
      <div style="border-radius:24px;overflow:hidden;border:1px solid var(--line)"><img src="../../assets/img/${p.art}.svg" alt="" width="1200" height="675" style="width:100%"></div>
      <div class="prose mt-8">
        <p>Most courses are built as a library: a hundred videos and a search box. It looks generous and it is quietly hostile, because the learner has to design the sequence themselves.</p>
        <p>A live room does the opposite. It fixes the order, the pace and the audience, then asks you to show your work to people who will tell you the truth about it.</p>
        <h2>What a live room buys you</h2>
        <p>Three things you cannot get from a recording: a deadline, an audience, and a person who notices when you stop.</p>
        <blockquote>Learning is a social act with a technical component, not the other way around.</blockquote>
        <pre><code><span class="k">while</span> (learning) {
  build();
  ship();
}</code></pre>
        <p>That is the whole idea. The rest is scheduling.</p>
      </div>
      <div class="flex wrap gap-3 mt-8"><span class="chip chip--outline">${p.category}</span><span class="chip chip--outline">Live teaching</span></div>
    </div>
    <section class="section">
      <div class="container">
        ${head({ kicker: '// Next', title: 'More from the journal' })}
        <div class="grid grid--3">${posts.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => postCard(x, '../../')).join('')}</div>
      </div>
    </section>
  </article>`,
});

const about = () => shell('about/', {
  title: 'About',
  desc: 'Why Web Academy is built around live rooms, and who runs it.',
  body: `
  <section class="hero night">
    <div class="glow glow--sky" aria-hidden="true"></div>
    <div class="container">
      <div class="hero__copy" style="max-width:52ch">
        <p class="kicker"><span class="kicker__dot"></span>// Who we are</p>
        <h1 class="hero__title">A room, a rubric,<span class="em" data-typein aria-label="and people who answer">and people who answer</span></h1>
        <p class="lede">We started in 2022 with one live room and twelve people. The format has not changed — only the number of rooms, and the fact that instructors now earn a living from them.</p>
      </div>
    </div>
    ${horizon()}
  </section>
  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__media"><img src="assets/img/atelier-studio.svg" alt="" width="900" height="700" loading="lazy"></div>
        <div class="prose">
          <h2 class="h3">Three patterns, one mark</h2>
          <p>The mark is a single unbroken line folded into a W. Continue its lines and the loop completes into a fingerprint: the arch and the loop are two of its three basic patterns. The ring is the world in our tagline.</p>
          <p>We teach the way that line works. Learn, build, ship, repeat — and keep the loop going until the job is done.</p>
        </div>
      </div>
      <div class="stat3" style="margin-block-start:48px">
        <div><p class="stat3__v" data-count="25400">25,400</p><p class="stat3__l">learners, 62 countries</p></div>
        <div><p class="stat3__v">48</p><p class="stat3__l">instructors, all practising</p></div>
        <div><p class="stat3__v">1,200</p><p class="stat3__l">live sessions run</p></div>
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      ${head({ kicker: '// Team', title: 'Who runs the place', align: 'center' })}
      <div class="ic-grid">${mentors.slice(0, 6).map((m) => instructorTile(m, '../')).join('')}</div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="grid grid--2" style="gap:var(--gutter)">
        <div class="earn__card" style="padding:clamp(24px,3.4vw,44px)"><p class="kicker">Learners</p><h2 class="h3" style="color:#fff;margin-block-start:8px">Join a session this week.</h2><a class="btn btn--primary" href="../live/" style="margin-block-start:16px;align-self:flex-start">See the calendar</a></div>
        <div class="earn__card" style="padding:clamp(24px,3.4vw,44px)"><p class="kicker">Instructors</p><h2 class="h3" style="color:#fff;margin-block-start:8px">Teach here.</h2><a class="btn btn--ghost" href="../teach/" style="margin-block-start:16px;align-self:flex-start">Apply to teach</a></div>
      </div>
    </div>
  </section>`,
});

const pricing = () => shell('pricing/', {
  title: 'Membership',
  desc: 'Free, Live and Studio membership. Everything live, every replay, the whole library.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Membership</li></ol>
    <h1>Membership</h1>
    <p class="lede">One membership for every live room, every replay and the library. Or buy a single course.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="plan-grid">
        ${[['Free', '0', 'The library and two courses.', ['The full library', 'Two self-paced courses', 'Community Q&A', 'No card needed'], 'Start free', false],
          ['Live', '24', 'Every live session, every replay.', ['All 240 courses', 'Every live session + replay', 'Certificates', 'Office hours'], 'Go Live', true],
          ['Studio', '89', 'Five seats and invoicing.', ['Everything in Live × 5', 'Consolidated invoice', 'Private session each quarter', 'Usage reporting'], 'Talk to us', false]]
          .map(([n, p, d, feats, cta, featured]) => `
          <div class="plan ${featured ? 'plan--featured' : ''}">
            ${featured ? '<span class="chip chip--lime" style="align-self:flex-start">Most popular</span>' : ''}
            <h2 class="h3" style="color:#fff">${n}</h2>
            <p class="plan__price">${p === '0' ? 'Free' : '$' + p}<span>${p === '0' ? '' : '/month'}</span></p>
            <p class="small">${d}</p>
            <a class="btn ${featured ? 'btn--primary' : 'btn--ghost'} btn--block" href="../contact/">${cta}</a>
            <ul class="plan__list">${feats.map((f) => `<li>${icon('check')}${f}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
      <div class="container--narrow mx-auto mt-10">
        ${head({ kicker: '// Questions', title: 'Billing and refunds', align: 'center' })}
        ${faqList(faqs, { id: 'price-faq' })}
      </div>
    </div>
  </section>`,
});

const contact = () => shell('contact/', {
  title: 'Contact',
  desc: 'Support, billing, teaching and press. We reply within two working days.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Contact</li></ol>
    <h1>Contact</h1>
    <p class="lede">Support is answered by the people who run the sessions.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container grid" style="grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:clamp(24px,4vw,56px);align-items:start">
      <form class="form-stack" data-validate novalidate>
        <div data-error-summary hidden class="form-error-summary" role="alert"></div>
        ${field({ id: 'c-name', label: 'Name', autocomplete: 'name', rules: 'required', msg: 'Required' })}
        ${field({ id: 'c-email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email' })}
        ${field({ id: 'c-topic', label: 'Topic', tag: 'select', options: ['Billing', 'Technical', 'Courses', 'Teaching', 'Press', 'Accessibility'] })}
        ${field({ id: 'c-msg', label: 'Message', tag: 'textarea', rules: 'required', msg: 'A sentence or two helps.' })}
        <label class="check"><input type="checkbox" id="c-consent" data-rules="checked" data-msg="Please accept the privacy policy."><span>I agree to the <a href="../legal/privacy/" style="text-decoration:underline">privacy policy</a>.</span></label>
        <button class="btn btn--primary" type="submit">Send message</button>
      </form>
      <div data-success hidden class="form-success">
        <span class="form-success__tick">${icon('check')}</span>
        <h2 class="h3" data-success-focus tabindex="-1">Message sent</h2>
        <p class="small">Demo form — nothing was sent. Support would reply within two working days.</p>
      </div>
      <div>
        <div class="earn__card" style="margin-block-end:16px">
          <div class="flex items-center gap-2"><span class="live-dot" aria-hidden="true"></span><p class="kicker" style="margin:0">All systems operational</p></div>
          <p class="small">Live rooms and replays are running normally.</p>
        </div>
        <div class="grid grid--2" style="gap:12px">
          ${[['Technical support', 'rooms@webacademy.example'], ['Billing', 'billing@webacademy.example'], ['Teaching', 'teach@webacademy.example'], ['Press', 'press@webacademy.example']]
            .map(([t, e]) => `<div class="earn__card"><p class="h4" style="color:#fff;font-size:.9375rem">${t}</p><p class="small">${e}</p></div>`).join('')}
        </div>
      </div>
    </div>
  </section>`,
});

const signin = () => shell('signin/', {
  title: 'Sign in',
  desc: 'Sign in to your Web Academy account, or create one.',
  body: `
  <section class="section" style="padding-block-start:clamp(24px,4vw,48px)">
    <div class="container grid" style="grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(24px,4vw,64px);align-items:center">
      <div style="max-width:420px">
        <p class="kicker">// Welcome back</p>
        <h1 style="margin-block-start:10px">Sign in</h1>
        <p class="lede" style="margin-block-start:10px">Your courses, sessions and replays are where you left them.</p>
        <form class="form-stack mt-6" data-validate novalidate>
          <div data-error-summary hidden class="form-error-summary" role="alert"></div>
          ${field({ id: 's-email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email' })}
          ${field({ id: 's-pass', label: 'Password', type: 'password', autocomplete: 'current-password', rules: 'required', msg: 'Enter your password' })}
          <div class="flex justify-between items-center"><label class="check"><input type="checkbox"><span>Keep me signed in</span></label><a class="small" href="#" onclick="return false">Forgot password?</a></div>
          <button class="btn btn--primary btn--block" type="submit">Sign in</button>
          <p class="small">New here? <a href="../pricing/" style="text-decoration:underline">Create an account</a></p>
        </form>
      </div>
      <div class="stage" style="aspect-ratio:4/3">
        <div class="stage__media"><img src="../assets/img/aero-room.svg" alt="" width="1200" height="900"></div>
        <div class="stage__scrim"></div>
        <div style="position:absolute;inset-block-end:0;padding:28px;z-index:2">
          <p class="h3" style="color:#fff;max-width:22ch">“The room is the product. Everything else is plumbing.”</p>
          <p class="small" style="margin-block-start:8px">Sofia M. · motion direction</p>
        </div>
      </div>
    </div>
  </section>`,
});

const legalPages = {
  privacy: ['Privacy policy', [
    ['What we collect', 'Email, course progress and anonymous usage data. Live rooms do not record video of participants.'],
    ['Why', 'To run your account and the rooms. No advertising trackers, and we do not sell data.'],
    ['Retention', 'Account data while open, deleted within 30 days of closure; analytics aggregated after 14 months.'],
    ['Your rights', 'Access, correction, export, deletion. privacy@webacademy.example.'],
  ]],
  terms: ['Terms of use', [
    ['Accounts', 'One per person. Sharing login details is not permitted.'],
    ['Live conduct', 'Rooms are moderated. Harassment ends access without refund.'],
    ['Instructor payouts', 'Monthly on the 5th, 88% of net sales, statements issued in January.'],
    ['Changes', '30 days notice of material changes.'],
  ]],
  accessibility: ['Accessibility', [
    ['Target', 'WCAG 2.2 AA, including the live room and the player controls.'],
    ['Done', 'Keyboard-complete rooms, visible focus on dark grounds, captions on every recording, reduced-motion support, no colour-only status.'],
    ['Known gaps', 'Two archive sessions predate captioning and are being re-edited.'],
    ['Tell us', 'accessibility@webacademy.example, triaged the same day.'],
  ]],
};

const legal = (k) => {
  const [title, sections] = legalPages[k];
  return shell(`legal/${k}/`, {
    title,
    desc: `${title} for Web Academy.`,
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li>Legal</li><li>${title}</li></ol>
      <h1>${title}</h1><p class="meta mono">Last updated 12 October 2026</p>
    </div></div>
    <section class="section section--flush"><div class="container" style="max-width:820px">
      <div class="prose"><p>Demonstration document for a fictional academy.</p>${sections.map(([t, b], i) => `<h2 id="s${i}">${t}</h2><p>${b}</p>`).join('')}</div>
      <div class="flex wrap gap-4 mt-8" style="font-size:.875rem"><a href="../privacy/">Privacy</a><a href="../terms/">Terms</a><a href="../accessibility/">Accessibility</a></div>
    </div></section>`,
  });
};

const notFound = () => page(site, '', {
  title: 'Page not found',
  desc: 'That room is empty.',
  path: '404.html',
  body: `
  <section class="section night" style="min-height:70vh;display:grid;place-items:center;text-align:center">
    <div class="container" style="max-width:520px">
      <img src="assets/brand/wa-icon-lime.svg" alt="" width="64" height="64" style="opacity:.3;margin-inline:auto">
      <h1 class="display" style="margin-block-start:16px">404</h1>
      <p class="h3" style="color:#fff;margin-block-start:8px">Nobody is in this room.</p>
      <p class="lede mx-auto" style="margin-block-start:8px">The link may be from a session that has ended.</p>
      <div class="flex gap-3 mt-8" style="justify-content:center"><a class="btn btn--primary" href="./">Back to the academy</a><a class="btn btn--ghost" href="live/">See what is live</a></div>
    </div>
  </section>`,
});

const styleguide = () => shell('styleguide/', {
  title: 'Styleguide',
  desc: 'Components and states on the dark ground.',
  body: `
  <div class="page-head"><div class="container page-head__inner"><h1>Styleguide</h1><p class="lede">Internal QA. Not linked, not indexed.</p></div></div>
  <section class="section section--flush"><div class="container stack" style="--stack:var(--sp-9)">
    <div><h2 class="h3">Colour</h2><div class="flex wrap gap-4 mt-4">${[['Deep', '#001A3D'], ['Navy', '#012A5D'], ['Mid', '#14427F'], ['Sky', '#8DB8FF'], ['Ice', '#EAF1FB'], ['Lime', '#C8F560']].map(([n, h]) => `<div style="width:110px"><div style="height:64px;background:${h};border:1px solid var(--line);border-radius:8px"></div><p class="mono mt-2">${n}</p></div>`).join('')}</div></div>
    <div><h2 class="h3">Type</h2><p class="display">Display 72</p><p class="h1">H1 52</p><p class="h2">H2 40</p><p class="h3">H3 26</p><p class="lede">Lede 20 on dark — 74% white.</p><p>Body 16 — 74% white minimum.</p><p class="mono">MONO 12 · LABEL</p></div>
    <div><h2 class="h3">Buttons</h2><div class="flex wrap gap-3 mt-4"><button class="btn btn--primary">Primary</button><button class="btn btn--ghost">Ghost</button><button class="btn btn--quiet">Quiet</button></div></div>
    <div><h2 class="h3">Stage</h2><div style="max-width:640px">${stage()}</div></div>
    <div><h2 class="h3">Glass card</h2><div class="earn" style="grid-template-columns:repeat(2,1fr)"><div class="earn__card"><p class="kicker">Kicker</p><p class="h4" style="color:#fff">Glass level 3</p><p class="small">Floating surfaces only, never for body content.</p></div><div class="earn__card"><p class="kicker">Kicker</p><p class="h4" style="color:#fff">Glow on hover</p><p class="small">Border trace, one per card.</p></div></div></div>
  </div></section>`,
});

/* -------------------------------------------------------------------------- */
/* A few blocks are written once and reused at several depths, so every page
   gets its root-relative links and asset paths rebased to its own folder. */
const ATTR = /(src|href)="(?!https?:|mailto:|tel:|#|\/|\.\.\/|\.\/)([^"]+)"/g;
function rebase(html, depth) {
  if (!depth) return html;
  const up = '../'.repeat(depth);
  return html.replace(ATTR, (m, attr, url) => `${attr}="${up}${url}"`);
}

export function routes() {
  const out = [];
  const push = (p, html) =>
    out.push({
      path: p,
      html: rebase(html, p && !p.endsWith('/') ? 0 : p.split('/').filter(Boolean).length),
    });
  push('', home());
  push('courses/', coursesIndex());
  courses.forEach((c) => push(`courses/${c.slug}/`, courseDetail(c)));
  push('live/', liveIndex());
  sessions.forEach((s) => push(`live/${s.slug}/`, sessionDetail(s)));
  push('instructors/', instructorsIndex());
  mentors.forEach((m) => push(`instructors/${m.slug}/`, instructorDetail(m)));
  push('teach/', teach());
  push('teach/earnings/', earnings());
  push('library/', libraryIndex());
  resources.forEach((r) => push(`library/${r.slug}/`, libraryDetail(r)));
  push('blog/', blogIndex());
  posts.forEach((p) => push(`blog/${p.slug}/`, postDetail(p)));
  push('about/', about());
  push('pricing/', pricing());
  push('contact/', contact());
  push('signin/', signin());
  ['privacy', 'terms', 'accessibility'].forEach((k) => push(`legal/${k}/`, legal(k)));
  push('styleguide/', styleguide());
  push('404.html', notFound());
  return out;
}
