/* 02 · ATELIER — page compositions (editorial idiom) */
import { page } from '../../shared/lib/site.mjs';
import { icon, head, stars, postCard, resourceRow, faqList, field, esc, fmtDuration, fmtPrice } from '../../shared/lib/ui.mjs';
import data from '../../shared/lib/data.mjs';
import { sceneFrame, learningExperience, projectShowcase } from '../../shared/lib/education-ui.mjs';
import { profile } from '../../shared/lib/config.mjs';
const presentation = profile('atelier');

const { courses, tracks, mentors, sessions, resources, posts, testimonials, faqs, partners } = data;

/* Atelier-specific collections derived from the shared model */
const cohorts = courses.slice(0, 6).map((c, i) => ({
  id: `co${i + 1}`,
  slug: `${c.slug}-february-2027`,
  course: c,
  startsAt: new Date(Date.UTC(2027, 1, 1 + i * 14)).toISOString(),
  weeks: 6,
  seats: [16, 14, 12, 18, 12, 16][i],
  seatsFilled: [11, 14, 9, 15, 12, 10][i],
  location: i % 3 === 0 ? 'Studio, London' : 'Remote, live',
  fee: c.cohortPrice,
  deposit: c.cohortDeposit,
}));

export const site = {
  id: 'atelier',
  name: 'Atelier',
  fullName: 'Web Academy',
  chip: 'ATELIER',
  tagline: 'A cohort academy for working professionals',
  navLayout: 'center',
  ctaLabel: 'Explore cohorts',
  ctaHref: 'cohorts/',
  loginLabel: 'Say hello',
  loginHref: 'contact/',
  themeColor: '#012A5D',
  footerBlurb: 'Small cohorts, named faculty and work you can show. A fictional academy used to demonstrate this template.',
  nav: [
    { label: 'Courses', href: 'courses/' },
    { label: 'Cohorts', href: 'cohorts/' },
    { label: 'Faculty', href: 'faculty/' },
    { label: 'Library', href: 'library/' },
    { label: 'For teams', href: 'for-teams/' },
    { label: 'About', href: 'about/' },
    { label: 'Journal', href: 'blog/' },
    { label: 'Contact', href: 'contact/' },
  ],
  footerCols: [
    { title: 'Learn', links: [{ label: 'Courses', href: 'courses/' }, { label: 'Cohorts', href: 'cohorts/' }, { label: 'Live sessions', href: 'live/' }, { label: 'Library', href: 'library/' }] },
    { title: 'Academy', links: [{ label: 'About', href: 'about/' }, { label: 'Faculty', href: 'faculty/' }, { label: 'Tuition', href: 'tuition/' }, { label: 'Admissions', href: 'apply/' }] },
    { title: 'Company', links: [{ label: 'For teams', href: 'for-teams/' }, { label: 'Contact', href: 'contact/' }, { label: 'Brand', href: 'brand/' }, { label: 'Journal', href: 'blog/' }] },
  ],
};

/* depth helper — a flat file such as 404.html lives at the dist root */
const R = (p = '') =>
  p && !p.endsWith('/') ? '' : '../'.repeat(p.split('/').filter(Boolean).length);
const shell = (p, opts) => page(site, R(p), { ...opts, path: p });

const rule = '<hr class="rule" data-rule>';

const courseRow = (c, Rr = '') => `
<article class="course-row" data-item data-course-id="${c.id}" data-price="${c.price}" data-level="${c.level.toLowerCase()}" data-duration="${c.duration}" data-tags="${c.track}" data-text="${esc(c.title)} ${c.trackLabel} ${c.level}">
  <a class="course-row__media" href="${Rr}courses/${c.slug}/" tabindex="-1" aria-hidden="true">
    <img src="${Rr}assets/img/${c.art}.svg" alt="" width="600" height="400" loading="lazy" decoding="async">
  </a>
  <div class="course-row__main">
    <p class="course-row__kicker">${c.trackLabel} · ${c.level}</p>
    <h3 class="course-row__title"><a href="${Rr}courses/${c.slug}/">${esc(c.title)}</a></h3>
    <p class="course-row__desc">${esc(c.subtitle)}</p>
    <p class="course-row__meta"><span>${c.weeks || 6} weeks</span><span>${c.lessonCount} lessons</span><span>${fmtDuration(c.duration)} of material</span><span>${c.students.toLocaleString()} alumni</span></p>
  </div>
  <div class="edu-row-actions"><button class="edu-row-save" type="button" data-fav="${c.id}" aria-pressed="false" aria-label="Save ${esc(c.title)}">${icon('heart')}<span>Save course</span></button><a class="course-row__go" href="${Rr}courses/${c.slug}/">Read the syllabus ${icon('arrow')}</a></div>
</article>`;

const figureStrip = (items) => `
<div class="figures">
  ${items.map(([v, l]) => `<div><p class="figure__value">${v}</p><p class="figure__label">${l}</p></div>`).join('')}
</div>`;

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */
const home = () => shell('', {
  title: 'Web Academy Atelier',
  desc: 'Cohort-based courses for working professionals. Small rooms, named faculty, work you can show.',
  bodyClass: 'home',
  body: `
  <section class="hero">
    <div class="container">
      <div class="edu-editorial-hero">
        <div class="hero__inner">
          <p class="kicker">${presentation.mode === 'creator' ? 'An independent teaching studio' : 'A considered place to learn'} / Cohort programmes</p>
          <h1 class="hero__title"><span class="line"><span>Learn the craft.</span></span><span class="line"><strong>Make it yours.</strong></span></h1>
          <p class="lede hero__lede">A small room. A generous critique. A piece of work that is unmistakably yours. Six-week programmes for people who care about their craft.</p>
          <div class="hero__actions"><a class="btn btn--primary btn--lg" href="cohorts/">Explore the programmes ${icon('arrow')}</a><a class="edu-text-link" href="learn/${courses[0].slug}/">Read a sample lesson</a></div>
          <p class="hero__note">${icon('book')} A clear syllabus. A finished project. A fresh perspective.</p>
          <a class="edu-faculty-note" href="faculty/"><span class="avatar-stack">${mentors.slice(0,3).map(m=>`<img class="avatar" src="assets/img/av-${m.id}.svg" width="32" height="32" alt="">`).join('')}</span><span>Meet your ${mentors.length} practising educators ${icon('arrowUpRight')}</span></a>
        </div>
        <div class="edu-editorial-hero__art">${sceneFrame('atelier','atelier-home',{caption:'A programme with intention. Room for your own point of view.'})}</div>
      </div>
      <div class="trio">
        ${[['Cohort, not course', 'A fixed start, a fixed room and a deadline that other people also have.'],
          ['Named faculty', 'Everyone who teaches here still practises, and you will meet them by name.'],
          ['Work you can show', 'Every cohort ends with a piece of work, critiqued, revised and documented.']]
          .map(([t, b]) => `<div class="trio__item"><p class="trio__title">${t}</p><p class="trio__body">${b}</p></div>`).join('')}
      </div>
    </div>
  </section>

  ${learningExperience('atelier')}
  ${projectShowcase('atelier')}
  <section class="section">
    <div class="container">
      ${head({ kicker: 'The programme', title: 'Everything a working professional needs to learn properly', lede: 'Six tracks. Each one is a sequence of cohorts rather than a catalogue of videos.' })}
      <div class="bento">
        <div class="bento__item bento__item--photo bento__item--a" data-reveal>
          <img src="assets/img/atelier-studio.svg" alt="" width="900" height="600" loading="lazy">
          <h3 class="bento__title">A studio, not a platform</h3>
          <p class="bento__body">Twelve to eighteen people per cohort. The room is small on purpose: it is the only way critique works.</p>
        </div>
        <div class="bento__item bento__item--ice bento__item--b" data-reveal style="--i:1">
          <h3 class="bento__title">What a week looks like</h3>
          <ul style="display:grid;gap:10px;margin-block-start:8px;font-size:.875rem;color:var(--ink-2)">
            <li>— 90-minute live session, recorded</li>
            <li>— One exercise, due Thursday</li>
            <li>— Written critique from two peers</li>
            <li>— Office hours on Friday</li>
          </ul>
        </div>
        <div class="bento__item bento__item--mid bento__item--c" data-reveal style="--i:2">
          <h3 class="bento__title">Six weeks, one artefact</h3>
          <p class="bento__body">You leave with something finished, documented and defensible in a job interview.</p>
        </div>
        <div class="bento__item bento__item--photo bento__item--d" data-reveal style="--i:3">
          <img src="assets/img/nova-collab.svg" alt="" width="900" height="600" loading="lazy">
          <h3 class="bento__title">Critique, in the open</h3>
          <p class="bento__body">Every cohort has a rubric from day one. You always know what “good” means before you are asked to hit it.</p>
        </div>
        <div class="bento__item bento__item--lime bento__item--e" data-reveal style="--i:4">
          <h3 class="bento__title" style="font-size:var(--fs-h3)">A shared rubric. Specific feedback. A stronger second draft.</h3>
        </div>
        <div class="bento__item bento__item--deep bento__item--f" data-reveal style="--i:5">
          <h3 class="bento__title">“I could finally explain my decisions.”</h3>
          <p class="bento__body">— Ines R., designer, Lisbon. Cohort 04.</p>
        </div>
        <div class="bento__item bento__item--ice bento__item--g" data-reveal style="--i:6">
          <h3 class="bento__title">Taught by people who still ship</h3>
          <p class="bento__body">${mentors.length} practising educators. All of them working. Most of them hiring.</p>
          <a class="link-arrow" href="faculty/" style="margin-block-start:10px">Meet the faculty ${icon('arrow')}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${figureStrip([[courses.length, 'focused courses'], [mentors.length, 'practising educators'], [6, 'learning tracks'], [resources.length, 'practical resources']])}
    </div>
  </section>

  <section class="section">
    <div class="container reading">
      <div>
        ${head({ kicker: 'The syllabus', title: 'Six weeks, in order', lede: 'The same structure runs through every cohort, whatever the subject.' })}
        <div class="table-wrap">
          <table class="table">
            <caption class="sr-only">Typical six-week cohort structure</caption>
            <thead><tr><th scope="col">Week</th><th scope="col">Theme</th><th scope="col">Deliverable</th></tr></thead>
            <tbody>
              <tr><td class="num">01</td><td>Foundations and vocabulary</td><td>A first attempt, shared in the room</td></tr>
              <tr><td class="num">02</td><td>Working method</td><td>A process document</td></tr>
              <tr><td class="num">03</td><td>Craft detail</td><td>One piece, revisited</td></tr>
              <tr><td class="num">04</td><td>Constraints and critique</td><td>A revision with a written rationale</td></tr>
              <tr><td class="num">05</td><td>Presentation</td><td>A five-minute walkthrough</td></tr>
              <tr><td class="num">06</td><td>Portfolio and next steps</td><td>The final artefact</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <aside class="margin">
        <div>
          <p class="margin__label">How a cohort runs</p>
          <p>Live sessions are 90 minutes and recorded. Exercises take two to three hours. There is no exam — the artefact is the assessment.</p>
        </div>
        <div>
          <p class="margin__label">The critique rubric</p>
          <p>Every draft is reviewed against four shared criteria: problem framing, working method, iteration from feedback, and presentation rationale.</p>
        </div>
        <div>
          <p class="margin__label">Download</p>
          <a class="link-arrow" href="library/">The full prospectus ${icon('download')}</a>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${head({ kicker: 'Faculty', title: 'Who you will actually meet', action: `<a class="btn btn--ghost btn--sm" href="faculty/">All faculty</a>` })}
      <div class="faculty-grid faculty-grid--4">
        ${mentors.slice(0, 4).map((m, i) => `
          <a class="faculty" href="faculty/${m.slug}/" data-reveal style="--i:${i}">
            <div class="faculty__img"><img src="assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="320" height="360" loading="lazy"></div>
            <p class="faculty__name">${esc(m.name)} ${icon('arrowUpRight')}</p>
            <p class="faculty__role">${esc(m.specialty.join(' · '))}</p>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${head({ kicker: 'Library', title: 'Reading, before you commit', action: `<a class="btn btn--ghost btn--sm" href="library/">The library</a>` })}
      <ul class="res-list">${resources.slice(0, 3).map((r) => resourceRow(r, '')).join('')}</ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="pull" data-reveal>
        <blockquote class="pull__text">“I came for the syllabus and stayed for the room. Being asked to show unfinished work to twelve people is the fastest I have ever improved.”</blockquote>
        <p class="pull__cite">${testimonials[2].name} — ${testimonials[2].role}</p>
      </div>
      ${rule}
      <div class="grid grid--2 mt-8" style="align-items:center;gap:var(--sp-9)">
        <div>
          <p class="kicker">For teams</p>
          <h2 class="h3" style="margin-block-start:10px">We run this inside companies too.</h2>
          <p class="lede" style="margin-block-start:12px">Private cohorts, procurement-ready documentation, and a named faculty lead for the quarter.</p>
          <a class="btn btn--ghost" href="for-teams/" style="margin-block-start:20px">Talk to our team</a>
        </div>
        <div class="flex wrap gap-6 items-center" style="justify-content:space-between">
          ${partners.slice(0, 4).map((p) => `<span style="font-size:1rem;font-weight:500;color:var(--ink-3);letter-spacing:-0.02em">${p}</span>`).join('')}
        </div>
      </div>
    </div>
  </section>

  ${ctaBandMarkup({
    title: 'Applications for the February cohort close on 12 January.',
    body: 'Fourteen seats. A short written application, no interview.',
    primary: { label: 'Apply for a cohort', href: 'apply/' },
    secondary: { label: 'Download the prospectus', href: 'library/' },
    R: '',
  })}`,
});

const ctaBandMarkup = ({ title, body, primary, secondary, dark = true }) => `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band ${dark ? 'cta-band--dark' : ''}">
      <div class="cta-band__text">
        <h2 class="h3" style="color:inherit">${title}</h2>
        <p class="lede" style="color:inherit;opacity:.8">${body}</p>
      </div>
      <div class="flex wrap gap-3">
        <a class="btn btn--primary btn--lg" href="${primary.href}">${primary.label}</a>
        ${secondary ? `<a class="btn btn--ghost btn--lg" href="${secondary.href}">${secondary.label}</a>` : ''}
      </div>
    </div>
  </div>
</section>`;

/* -------------------------------------------------------------------------- */
/* COURSES                                                                    */
/* -------------------------------------------------------------------------- */
const coursesIndex = () => shell('courses/', {
  title: 'Courses',
  desc: 'Six-week cohort courses in design, engineering, visual craft, data and the business of creative work.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Courses</li></ol>
    <h1>Courses</h1>
    <p class="lede">Every course runs as a cohort. Pick a subject, then pick a start date.</p>
  </div></div>
  <section class="section section--flush" data-filter="track">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by track">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${tracks.map((t) => `<button class="facet" data-facet="${t.id}" aria-pressed="false">${t.label}</button>`).join('')}
        </div>
        <div class="flex items-center gap-4">
          <label class="search-inline">${icon('search')}<span class="sr-only">Search courses</span><input type="search" placeholder="Search" data-filter-search></label>
          <span class="filter-count"><span data-filter-count>${courses.length}</span> courses</span>
        </div>
      </div>
      <h2 class="sr-only">All courses</h2>
      <div class="row-list">
        ${courses.map((c) => courseRow(c, '../')).join('')}
      </div>
      <div class="empty mt-6" data-filter-empty hidden><p>No courses match. <button class="link-arrow" type="button">Clear filters</button></p></div>
      <p class="small mt-6">Showing <span data-filter-count>${courses.length}</span> of ${courses.length} courses. Each opens a full syllabus.</p>
    </div>
  </section>`,
});

const courseDetail = (c) => { const nextCohort=cohorts.find(co=>co.course.id===c.id); return shell(`courses/${c.slug}/`, {
  title: c.title,
  desc: c.subtitle,
  progress: true,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.description, provider: { '@type': 'Organization', name: 'Web Academy' } }],
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Courses</a></li><li>${c.trackLabel}</li></ol>
    <p class="kicker mt-4">${c.trackLabel} · ${c.level}</p>
    <h1>${esc(c.title)}</h1>
    <p class="lede">${esc(c.subtitle)}</p>
  </div></div>

  <div class="container"><div style="aspect-ratio:21/9;border-radius:20px;overflow:hidden;background:var(--surface-alt)">
    <img src="../../assets/img/${c.art}.svg" alt="" width="1200" height="514" style="width:100%;height:100%;object-fit:cover">
  </div>
  <p class="mono mt-2" style="color:var(--ink-3)">${nextCohort ? 'A six-week programme / a considered studio practice' : 'A self-paced course / a project you can keep'}</p></div>

  <section class="section section--flush">
    <div class="container">
      ${figureStrip([[`${c.lessonCount} lessons`, 'curriculum'], [fmtDuration(c.duration), 'learning material'], [nextCohort ? `${nextCohort.seats} learners` : c.level, nextCohort ? 'cohort size' : 'starting level'], [fmtPrice(nextCohort ? nextCohort.fee : c.price), 'illustrative tuition']])}
    </div>
  </section>

  <section class="section">
    <div class="container reading">
      <div class="stack" style="--stack:var(--sp-9)">
        <div>
          <h2 class="h3">What you will be able to do</h2>
          <ol class="mt-4" style="display:grid;gap:14px">
            ${c.outcomes.concat(['Present your work with a rationale a client accepts', 'Give critique that changes the work, not the mood'])
              .map((o, i) => `<li style="display:grid;grid-template-columns:40px 1fr;gap:12px;font-size:1.0625rem;color:var(--ink-2)">
                <span style="font-weight:200;font-size:1.5rem;color:var(--ink-3);line-height:1.2">${String(i + 1).padStart(2, '0')}</span><span>${esc(o)}</span></li>`).join('')}
          </ol>
        </div>
        <div>
          <h2 class="h3">Syllabus</h2>
          <div class="acc mt-4" data-acc="single">
            ${c.sections.map((s, i) => `
              <div class="acc__item">
                <h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="w${i}">
                  <span><span class="mono" style="margin-inline-end:14px;color:var(--ink-3)">WEEK ${String(i * 2 + 1).padStart(2, '0')}</span>${esc(s.title)}</span>
                  <span class="acc__sign" aria-hidden="true"></span>
                </button></h3>
                <div class="acc__panel" id="w${i}"><div>
                  <dl class="deflist" style="margin-block-end:20px">
                    ${s.lessons.map((l, j) => `<div><dt>Session ${j + 1}</dt><dd>${esc(l)}</dd></div>`).join('')}
                  </dl>
                </div></div>
              </div>`).join('')}
          </div>
        </div>
        <div>
          <h2 class="h3">Faculty</h2>
          <div class="grid grid--2 mt-4">
            ${[c.mentorId, mentors[0].id].filter((v, i, a) => a.indexOf(v) === i).map((id) => {
              const m = mentors.find((x) => x.id === id) || mentors[0];
              return `<a class="faculty" href="../../faculty/${m.slug}/">
                <div class="faculty__img"><img src="../../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="400" height="533" loading="lazy"></div>
                <p class="faculty__name">${esc(m.name)} ${icon('arrowUpRight')}</p>
                <p class="faculty__role">${esc(m.role)}</p>
              </a>`;
            }).join('')}
          </div>
        </div>
        <div>
          <h2 class="h3">Who this is for</h2>
          <div class="grid grid--2 mt-4" style="gap:var(--sp-6)">
            <div><p class="mono" style="color:var(--ink-3)">For you if</p>
              <ul class="prose" style="margin-block-start:10px;font-size:.9375rem"><li>${c.level==='Beginner'?'You are ready to make a first project':'You have some experience in this subject'}</li><li>You want a standard, not a gallery</li><li>You can commit three hours a week</li></ul></div>
            <div><p class="mono" style="color:var(--ink-3)">Not for you if</p>
              <ul class="prose" style="margin-block-start:10px;font-size:.9375rem"><li>You want a certificate without the critique</li><li>You cannot attend any live session</li><li>You are looking for a software tutorial</li></ul></div>
          </div>
        </div>
        <div>
          <h2 class="h3">Assessment and certificate</h2>
          <p class="prose mt-3">There is no exam. You are assessed on the artefact, presented in week six against the rubric you receive in week one. The sample certificate illustrates how a provider might recognise completion; this static demo does not issue a verified credential.</p>
        </div>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Next start</p>
          <p class="num" style="font-size:1.0625rem;color:var(--ink)">${nextCohort ? new Date(nextCohort.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'At your own pace'}</p>
          <p style="margin-block-start:6px">${nextCohort ? `${nextCohort.seats} seats · ${nextCohort.location}` : `${c.lessonCount} lessons · ${fmtDuration(c.duration)}`}</p></div>
        <div><p class="margin__label">Tuition</p>
          <p class="num" style="font-size:1.0625rem;color:var(--ink)">${fmtPrice(nextCohort ? nextCohort.fee : c.price)}</p>
          <p style="margin-block-start:6px">${nextCohort ? `Illustrative deposit ${fmtPrice(nextCohort.deposit)}` : 'A self-paced learning example'}</p></div>
        <div><p class="margin__label">Apply</p>
          <a class="btn btn--primary btn--sm" href="{{R}}apply/?course=${c.slug}">Try the application · demo</a></div>
        <div><p class="margin__label">Questions</p><a class="link-arrow" href="../../contact/">Talk to admissions ${icon('arrow')}</a></div>
      </aside>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${head({ kicker: 'Dates and fees', title: nextCohort ? 'Your upcoming programme' : 'Other programmes in the studio', align: 'left' })}
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th scope="col">Starts</th><th scope="col">Format</th><th scope="col">Seats</th><th scope="col">Fee</th><th scope="col"><span class="sr-only">Apply</span></th></tr></thead>
          <tbody>
            ${(nextCohort ? [nextCohort] : cohorts.slice(0, 3)).map((co) => `<tr>
              <td class="num">${new Date(co.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
              <td>${co.location}</td>
              <td class="num">${co.seats - co.seatsFilled} of ${co.seats} left</td>
              <td class="num">${fmtPrice(co.fee)}</td>
              <td><a class="link-arrow" href="../../cohorts/${co.slug}/">Details ${icon('arrow')}</a></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container container--narrow">
      ${head({ kicker: 'Questions', title: 'Admissions asks us' })}
      ${faqList(faqs.slice(0, 4))}
    </div>
  </section>`,
}); };

const classes = (c) => (c.id.charCodeAt(1) % 6) + 12;

/* -------------------------------------------------------------------------- */
/* COHORTS                                                                    */
/* -------------------------------------------------------------------------- */
const cohortsIndex = () => shell('cohorts/', {
  title: 'Cohorts',
  desc: 'Every cohort start date for the next two terms, with seats and fees.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Cohorts</li></ol>
    <h1>Cohorts</h1>
    <p class="lede">Times shown in <span data-tz>your timezone</span>. Seats are updated weekly; the counts are illustrative demo availability.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      ${head({ kicker: 'February 2027', title: 'Spring term', align: 'left' })}
      <ul class="session-list">
        ${cohorts.map((co) => `
          <li class="session-row">
            <div class="session-row__time"><span class="num">${new Date(co.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span><span class="meta">${new Date(co.startsAt).getFullYear()}</span></div>
            <div class="session-row__main">
              <p class="course-row__kicker">${co.course.trackLabel} · ${co.weeks} weeks</p>
              <h3 class="session-row__title"><a href="${co.slug}/">${esc(co.course.title)}</a></h3>
              <p class="meta">${esc(co.location)} · ${fmtPrice(co.fee)} · deposit ${fmtPrice(co.deposit)}</p>
            </div>
            <div class="session-row__seats"><span class="meta num">${co.seatsFilled} of ${co.seats} seats</span>
              <div class="meter" role="progressbar" aria-valuenow="${co.seatsFilled}" aria-valuemin="0" aria-valuemax="${co.seats}" aria-label="Seats filled"><span style="width:${Math.round(co.seatsFilled / co.seats * 100)}%"></span></div>
            </div>
            <div class="session-row__cta"><a class="btn btn--ghost btn--sm" href="{{R}}apply/">Apply</a></div>
          </li>`).join('')}
      </ul>
      <p class="small mt-6">A deposit holds a seat for seven days. Transfers to a later cohort are free up to one week before the start.</p>
    </div>
  </section>`,
});

const cohortDetail = (co) => shell(`cohorts/${co.slug}/`, {
  title: `${co.course.title} — cohort`,
  desc: `A six-week cohort starting ${new Date(co.startsAt).toDateString()}.`,
  jsonld: [{ '@context': 'https://schema.org', '@type': 'Event', name: co.course.title, startDate: co.startsAt, eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode', organizer: { '@type': 'Organization', name: 'Web Academy' }, offers: { '@type': 'Offer', price: (co.fee / 100).toFixed(2), priceCurrency: 'USD' } }],
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Cohorts</a></li><li>${new Date(co.startsAt).toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</li></ol>
    <h1>${esc(co.course.title)}</h1>
    <p class="lede">Cohort 07 · starts <span data-datetime="${co.startsAt}">—</span> · ${esc(co.location)}</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      ${figureStrip([[`${co.seats - co.seatsFilled}`, 'seats left'], [`${co.seats}`, 'in the room'], ['6', 'weeks'], [fmtPrice(co.fee), 'tuition']])}
      <div class="reading mt-8">
        <div class="stack" style="--stack:var(--sp-8)">
          <div>
            <h2 class="h3">The six weeks</h2>
            <div class="mt-4">
              ${[1, 2, 3, 4, 5, 6].map((w) => `
                <div style="display:grid;grid-template-columns:80px 1fr;gap:20px;padding-block:18px;border-block-start:1px solid var(--line)">
                  <p class="mono" style="color:var(--ink-3)">WEEK ${String(w).padStart(2, '0')}</p>
                  <div><p style="font-weight:500">${['Foundations and a first attempt', 'Working method', 'Craft detail', 'Constraints and critique', 'Presentation', 'Portfolio and next steps'][w - 1]}</p>
                  <p class="small" style="margin-block-start:4px">Live session Wednesday 18:00 · exercise due Thursday · critique published Friday.</p></div>
                </div>`).join('')}
            </div>
          </div>
          <div>
            <h2 class="h3">Who is in the room</h2>
            <div class="flex wrap gap-3 mt-4">
              ${Array.from({ length: co.seats }).map((_, i) => `<span class="chip ${i < co.seatsFilled ? 'chip--solid' : 'chip--outline'}">${i < co.seatsFilled ? 'Seat taken' : 'Available'}</span>`).join('')}
            </div>
          </div>
          <div>
            <h2 class="h3">Fees and policy</h2>
            <dl class="deflist mt-4">
              <div><dt>Tuition</dt><dd>${fmtPrice(co.fee)}, including all materials and the critique rubric.</dd></div>
              <div><dt>Deposit</dt><dd>${fmtPrice(co.deposit)} to hold a seat, refundable for seven days.</dd></div>
              <div><dt>Transfers</dt><dd>Free up to one week before the start; after that, 50% is retained.</dd></div>
              <div><dt>Employer funding</dt><dd>Invoice with purchase order. Documentation provided for procurement.</dd></div>
            </dl>
          </div>
        </div>
        <aside class="margin">
          <div><p class="margin__label">Location</p><p>${esc(co.location)}</p><p style="margin-block-start:6px">14 Marlborough Yard, London SE1 · five minutes from London Bridge.</p></div>
          <div><p class="margin__label">Apply</p><a class="btn btn--primary btn--sm" href="{{R}}apply/">Start an application</a></div>
          <div><p class="margin__label">Calendar</p><a class="link-arrow" href="../../live/">Session times ${icon('arrow')}</a></div>
        </aside>
      </div>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* LIVE                                                                       */
/* -------------------------------------------------------------------------- */
const liveIndex = () => {
  const up = sessions.filter((s) => s.status !== 'ended');
  const past = sessions.filter((s) => s.status === 'ended');
  return shell('live/', {
    title: 'Live sessions',
    desc: 'Critique nights, clinics and open office hours. Free to attend, recorded for everyone.',
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Live sessions</li></ol>
      <h1>Live sessions</h1>
      <p class="lede">Open to anyone, cohort member or not. We record every session and publish it the same day.</p>
    </div></div>
    <section class="section section--flush">
      <div class="container">
        ${head({ kicker: 'Upcoming', title: 'This term', align: 'left' })}
        <ul class="session-list">${up.map((s) => sessionRowA(s, '../')).join('')}</ul>
        <div class="mt-10">
          ${head({ kicker: 'Archive', title: 'The recordings', align: 'left' })}
          <div class="faculty-grid" style="gap:var(--sp-6)">
            ${past.map((s, i) => `
              <a class="faculty" href="${s.slug}/">
                <div class="faculty__img" style="aspect-ratio:16/9;position:relative">
                  <img src="../assets/img/cover-c${(i % 8) + 1}.svg" alt="" width="800" height="450" loading="lazy">
                  <span class="chip" style="position:absolute;inset-block-end:10px;inset-inline-start:10px;background:#fff">${s.durationMin} min</span>
                </div>
                <p class="faculty__name" style="font-size:1.0625rem">${esc(s.title)}</p>
                <p class="faculty__role">${esc(s.mentor)} · ${new Date(s.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              </a>`).join('')}
          </div>
        </div>
      </div>
    </section>`,
  });
};

const sessionRowA = (s, Rr) => `
<li class="session-row">
  <div class="session-row__time"><span class="num" data-datetime="${s.startsAt}" data-datetime-format="time">—</span><span class="meta" data-datetime="${s.startsAt}">${new Date(s.startsAt).toUTCString()}</span></div>
  <div class="session-row__main">
    <p class="course-row__kicker">${s.format}</p>
    <h3 class="session-row__title"><a href="${Rr}live/${s.slug}/">${esc(s.title)}</a></h3>
    <p class="meta">${esc(s.mentor)}</p>
  </div>
  <div class="session-row__seats"><span class="meta num">${s.seats - s.seatsFilled} of ${s.seats} seats</span>
    <div class="meter" role="progressbar" aria-valuenow="${s.seatsFilled}" aria-valuemin="0" aria-valuemax="${s.seats}" aria-label="Seats filled"><span style="width:${Math.round(s.seatsFilled / s.seats * 100)}%"></span></div>
  </div>
  <div class="session-row__cta"><a class="btn btn--ghost btn--sm" href="${Rr}live/${s.slug}/">Register</a></div>
</li>`;

const liveDetail = (s) => shell(`live/${s.slug}/`, {
  title: s.title,
  desc: s.blurb,
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Live sessions</a></li><li>${esc(s.title)}</li></ol>
    <h1>${esc(s.title)}</h1>
    <p class="lede">${esc(s.blurb)}</p>
    <p class="small">${icon('calendar')} <span data-datetime="${s.startsAt}">${new Date(s.startsAt).toUTCString()}</span> · <span data-tz></span></p>
  </div></div>
  <section class="section section--flush">
    <div class="container reading">
      <div class="stack" style="--stack:var(--sp-8)">
        <div>
          <h2 class="h3">What we will cover</h2>
          <ul class="prose mt-3">${s.agenda.map((a) => `<li><span class="mono" style="margin-inline-end:12px;color:var(--ink-3)">${a.time}</span>${a.topic}</li>`).join('')}</ul>
        </div>
        <div>
          <h2 class="h3">What to prepare</h2>
          <ul class="prose mt-3"><li>One piece of work you are willing to show</li><li>A question you have been avoiding</li><li>The session notes template from the library</li></ul>
        </div>
        <div>
          <h2 class="h3">Who it is for</h2>
          <p class="prose mt-3">Anyone working in or around ${s.mentor.split(' ')[0]}'s field, from first-year to principal. No cohort membership required.</p>
        </div>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Register</p><a class="btn btn--primary btn--sm" href="{{R}}apply/">Save a seat</a></div>
        <div><p class="margin__label">Calendar</p><p><a class="link-arrow" href="#" onclick="return false">Add to calendar ${icon('arrow')}</a></p></div>
        <div><p class="margin__label">Host</p>
          <a class="faculty" href="../../faculty/${(mentors.find((m) => m.id === s.mentorId) || mentors[0]).slug}/" style="margin-block-start:6px">
            <div class="faculty__img" style="aspect-ratio:1;border-radius:50%"><img src="../../assets/img/av-${s.mentorId}.svg" alt="" width="200" height="200"></div>
            <p class="faculty__name" style="font-size:.9375rem">${esc(s.mentor)}</p>
          </a>
        </div>
      </aside>
    </div>
  </section>`,
});

/* -------------------------------------------------------------------------- */
/* LIBRARY, BLOG                                                              */
/* -------------------------------------------------------------------------- */
const libraryIndex = () => shell('library/', {
  title: 'Library',
  desc: 'Syllabi, case studies, reading lists and studio guides. Free to download.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Library</li></ol>
    <h1>Library</h1>
    <p class="lede">The material we use in the room, published as it is.</p>
  </div></div>
  <section class="section section--flush" data-filter="type">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Filter by type">
          <button class="facet" data-facet="all" aria-pressed="true">All</button>
          ${['Guide', 'Template', 'Checklist'].map((t) => `<button class="facet" data-facet="${t}" aria-pressed="false">${t}</button>`).join('')}
        </div>
        <span class="filter-count"><span data-filter-count>${resources.length}</span> documents</span>
      </div>
      <h2 class="sr-only">All documents</h2>
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
    <p class="kicker mt-4">${r.type} · ${r.pages} pages · ${r.size}</p>
    <h1>${esc(r.title)}</h1>
    <p class="lede">${esc(r.blurb)}</p>
  </div></div>
  <section class="section section--flush">
    <div class="container reading">
      <div class="stack" style="--stack:var(--sp-7)">
        <div style="border-radius:20px;overflow:hidden"><img src="../../assets/img/${r.art}.svg" alt="" width="900" height="500" style="width:100%"></div>
        <div class="prose">
          <h2>Contents</h2>
          <ol><li>The short version, on one page</li><li>The method, with examples</li><li>A blank version you can fill in</li><li>Further reading</li></ol>
          <h2>How to use it</h2>
          <p>Print it, or keep it open beside the work. It is designed to be filled in, not admired: the second page is deliberately mostly white space.</p>
          <blockquote>A checklist you do not use is a document, not a tool.</blockquote>
        </div>
        <dl class="deflist">
          <div><dt>Format</dt><dd>PDF, ${r.pages} pages, ${r.size}</dd></div>
          <div><dt>Licence</dt><dd>Free for personal and commercial use. Attribution appreciated, not required.</dd></div>
          <div><dt>Updated</dt><dd>${r.updated}</dd></div>
        </dl>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Download</p><a class="btn btn--primary btn--sm" href="#" onclick="return false">Download PDF</a></div>
        <div><p class="margin__label">Related</p><ul style="display:grid;gap:8px">${resources.filter((x) => x.id !== r.id).slice(0, 3).map((x) => `<li><a href="../${x.slug}/" style="color:var(--ink-2)">${esc(x.title)}</a></li>`).join('')}</ul></div>
      </aside>
    </div>
  </section>`,
});

const blogIndex = () => shell('blog/', {
  title: 'Journal',
  desc: 'Essays on teaching, cohort design and the craft of creative work.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Journal</li></ol>
    <h1>Journal</h1>
    <p class="lede">Longer pieces, published when there is something to say.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="grid" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:var(--sp-9);align-items:start">
        <div>
          <h2 class="sr-only">Latest article</h2>
          ${postCard(posts[0], '../', { lead: true })}
          <div class="mt-8">
            <h2 class="sr-only">More articles</h2>
            <div class="grid grid--2" style="gap:var(--sp-7)">
              ${posts.slice(1, 7).map((p) => postCard(p, '../')).join('')}
            </div>
          </div>
        </div>
        <aside class="margin" style="position:static">
          <div><p class="margin__label">Recent</p>
            <ul style="display:grid;gap:12px">
              ${posts.slice(0, 5).map((p) => `<li><a href="./${p.slug}/" style="color:var(--ink-2);font-size:.875rem">${esc(p.title)}</a></li>`).join('')}
            </ul>
          </div>
          <div><p class="margin__label">Categories</p>
            <ul style="display:grid;gap:8px">${[...new Set(posts.map((p) => p.category))].map((c) => `<li style="font-size:.875rem">${c}</li>`).join('')}</ul>
          </div>
        </aside>
      </div>
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
    <div class="page-head"><div class="container" style="max-width:900px">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Journal</a></li><li>${p.category}</li></ol>
      <p class="kicker mt-4">${p.category} · ${p.readingMin} min</p>
      <h1 style="max-width:24ch">${esc(p.title)}</h1>
      <p class="lede">${esc(p.excerpt)}</p>
      <p class="small mt-4">${esc(p.author)} · <time datetime="${p.publishedAt}">${p.dateLabel}</time></p>
    </div></div>
    <div class="container" style="max-width:900px">
      <div style="aspect-ratio:3/2;border-radius:20px;overflow:hidden;background:var(--surface-alt)">
        <img src="../../assets/img/${p.art}.svg" alt="" width="1200" height="800" style="width:100%;height:100%;object-fit:cover">
      </div>
      <p class="mono mt-2" style="color:var(--ink-3)">Illustration · Web Academy studio</p>
    </div>
    <section class="section section--flush">
      <div class="container reading" style="max-width:1000px">
        <div class="prose">
          <p>Most courses are built as a library: a hundred videos and a search box. It looks generous and it is quietly hostile, because the learner has to design the sequence themselves.</p>
          <p>A cohort does the opposite. It fixes the order, the pace and the room, then asks you to show your work in front of people who will tell you the truth about it.</p>
          <h2>What a cohort buys you</h2>
          <p>Three things you cannot get from a video: a deadline, an audience, and a person who notices when you stop.</p>
          <blockquote>Learning is a social act with a technical component, not the other way around.</blockquote>
          <p>The structure is simple. Six weeks. One live session a week. One piece of work every fortnight, reviewed against a written rubric that you receive at the start.</p>
          <h2>Where this goes wrong</h2>
          <p>Cohorts fail when they are treated as group video calls: no agenda, no artefact, no standard. The fix is boring — publish the rubric, keep the room small, and make the first session produce something.</p>
          <p>That is the whole idea. The rest is scheduling.</p>
        </div>
        <aside class="margin">
          <div><p class="margin__label">In this piece</p>
            <ul style="display:grid;gap:8px"><li>What a cohort buys you</li><li>Where this goes wrong</li></ul>
          </div>
          <div><p class="margin__label">Filed under</p><p>${p.category}</p></div>
        </aside>
      </div>
      <div class="container" style="max-width:900px">
        ${rule}
        <div class="flex items-center gap-4 mt-6">
          <img class="avatar" src="../../assets/img/av-${p.authorId}.svg" alt="" width="56" height="56">
          <div><p style="font-weight:500">${esc(p.author)}</p><p class="small">Teaches at Web Academy. Writes about the craft and the business of it.</p></div>
        </div>
      </div>
    </section>
  </article>`,
});

/* -------------------------------------------------------------------------- */
/* ABOUT, FACULTY                                                             */
/* -------------------------------------------------------------------------- */
const about = () => shell('about/', {
  title: 'About',
  desc: 'Why Web Academy runs cohorts, who teaches, and how the academy is governed.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>About</li></ol>
    <h1 style="max-width:20ch">A studio that teaches,<br>not a platform that sells.</h1>
    <p class="lede">Web Academy exists to teach the web to the people who build it — in rooms small enough that the work gets looked at.</p>
  </div></div>
  <div class="container"><div style="aspect-ratio:21/9;border-radius:20px;overflow:hidden;background:var(--surface-alt)">
    <img src="../assets/img/atelier-studio.svg" alt="The Web Academy studio" width="1400" height="600" style="width:100%;height:100%;object-fit:cover"></div>
    <p class="mono mt-2" style="color:var(--ink-3)">The studio, Marlborough Yard · photographed by the faculty</p></div>

  <section class="section">
    <div class="container reading">
      <div class="prose">
        <p class="kicker">Why we exist</p>
        <p style="font-size:var(--fs-lede);color:var(--ink)">Online education solved access and lost accountability. We kept the access and put the room back.</p>
        <p>Every cohort is built the same way: a written rubric, a small number of people, one live session a week, and an artefact at the end. Nothing about that is novel. It is simply expensive to do properly, and most platforms have optimised for the opposite.</p>
        <h2>The mark</h2>
        <p>The Web Academy mark is a single unbroken line folded into a W. Continue its lines and the loop completes into a fingerprint — the arch and the loop are two of its three basic patterns. The ring is the world in the tagline.</p>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Governance</p><p>Independent, faculty-owned, no external investors. Accounts filed annually.</p></div>
        <div><p class="margin__label">Accreditation</p><p>Cohort certificates are verifiable by ID. Assessment is criterion-referenced against a published rubric.</p></div>
      </aside>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="grid grid--3" style="gap:var(--sp-7)">
        ${[['2022', 'Two instructors, one room'], ['2023', 'Faculty expands to twelve'], ['2026', 'Forty-eight faculty, six tracks']].map(([y, t]) => `
          <div><p class="mono" style="color:var(--ink-3)">${y}</p><p class="h4" style="font-weight:400;margin-block-start:8px">${t}</p></div>`).join('')}
      </div>
      <div class="mt-8">${rule}</div>
      ${figureStrip([[mentors.length, 'practising educators'], [tracks.length, 'tracks'], [courses.length, 'courses'], [resources.length, 'practical resources']])}
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      ${head({ kicker: 'Faculty', title: 'The people who teach here', align: 'left', action: `<a class="btn btn--ghost btn--sm" href="../faculty/">All faculty</a>` })}
      <div class="faculty-grid">${mentors.slice(0, 6).map((m) => `
        <a class="faculty" href="../faculty/${m.slug}/">
          <div class="faculty__img"><img src="../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="400" height="533" loading="lazy"></div>
          <p class="faculty__name">${esc(m.name)} ${icon('arrowUpRight')}</p>
          <p class="faculty__role">${esc(m.role)}</p>
        </a>`).join('')}</div>
    </div>
  </section>

  ${ctaBandMarkup({ title: 'Come to a critique night.', body: 'They are open to anyone, and they are the fastest way to see whether this is for you.', primary: { label: 'See the dates', href: '../live/' }, secondary: { label: 'Talk to admissions', href: '../contact/' } })}`,
});

const facultyIndex = () => shell('faculty/', {
  title: 'Faculty',
  desc: 'The instructors who teach the cohorts, and what they still practise.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Faculty</li></ol>
    <h1>Faculty</h1>
    <p class="lede">Everyone here teaches what they still do for a living. That is the whole hiring policy.</p>
  </div></div>
  <section class="section section--flush" data-filter="specialty">
    <div class="container">
      <div class="filter-bar">
        <div class="facets" data-filter-groups role="group" aria-label="Educator specialty"><button class="facet" data-facet="all" aria-pressed="true">All</button>${[...new Set(mentors.flatMap((m) => m.specialty))].slice(0, 5).map((s) => `<button class="facet" data-facet="${s.toLowerCase().replaceAll(' ', '-')}" aria-pressed="false">${s}</button>`).join('')}</div>
        <span class="filter-count"><span data-filter-count>${mentors.length}</span> educators</span>
      </div>
      <div class="faculty-grid faculty-grid--4">
        ${mentors.map((m, i) => `
          <a class="faculty" data-item data-tags="${m.specialty.map(s=>s.toLowerCase().replaceAll(' ', '-')).join(' ')}" href="${m.slug}/" data-reveal style="--i:${i % 4}">
            <div class="faculty__img"><img src="../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="320" height="360" loading="lazy"></div>
            <p class="faculty__name">${esc(m.name)} ${icon('arrowUpRight')}</p>
            <p class="faculty__role">${esc(m.specialty.join(' · '))} · ${esc(m.city)}</p>
          </a>`).join('')}
      </div>
    </div>
  </section>`,
});

const facultyDetail = (m) => {
  const mine = courses.filter((c) => c.mentorId === m.id);
  const theirCohorts = cohorts.filter((co) => co.course.mentorId === m.id);
  return shell(`faculty/${m.slug}/`, {
    title: m.name,
    desc: m.bio,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'Person', name: m.name, jobTitle: m.role, description: m.bio }],
    body: `
    <div class="page-head"><div class="container">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li><a href="../">Faculty</a></li><li>${esc(m.name)}</li></ol>
    </div>
    <div class="container reading mt-6">
      <div>
        <div class="faculty__img" style="aspect-ratio:3/4;border-radius:20px;overflow:hidden">
          <img src="../../assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="480" height="640">
        </div>
      </div>
      <div>
        <p class="kicker">${esc(m.role)}</p>
        <h1 style="margin-block-start:10px">${esc(m.name)}</h1>
        <dl class="deflist mt-6">
          <div><dt>Teaches</dt><dd>${esc(m.specialty.join(', '))}</dd></div>
          <div><dt>Based</dt><dd>${esc(m.city)}</dd></div>
          <div><dt>Students</dt><dd class="num">${m.students.toLocaleString()}</dd></div>
          <div><dt>Rating</dt><dd>${m.rating} ${stars(5)}</dd></div>
        </dl>
        <div class="prose mt-6"><p>${esc(m.bio)}</p><blockquote>“${esc(m.quote)}”</blockquote></div>
        <a class="btn btn--primary mt-6" href="../../contact/">Book a conversation</a>
      </div>
    </div></div>
    <section class="section">
      <div class="container">
        ${head({ kicker: 'Teaches', title: `Cohorts and courses`, align: 'left' })}
        <div class="row-list">
          ${mine.map((c) => courseRow(c, '../../')).join('')}
        </div>
        ${theirCohorts.length ? `<div class="mt-8">${head({ kicker: 'Dates', title: 'Upcoming cohorts', align: 'left' })}
          <ul class="session-list">${theirCohorts.map((co) => `
            <li class="session-row">
              <div class="session-row__time"><span class="num">${new Date(co.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span><span class="meta">${new Date(co.startsAt).getFullYear()}</span></div>
              <div class="session-row__main"><h3 class="session-row__title"><a href="../../cohorts/${co.slug}/">${esc(co.course.title)}</a></h3>
                <p class="meta">${esc(co.location)} · ${fmtPrice(co.fee)}</p></div>
              <div class="session-row__seats"><span class="meta num">${co.seats - co.seatsFilled} left</span></div>
              <div class="session-row__cta"><a class="btn btn--ghost btn--sm" href="{{R}}apply/">Apply</a></div>
            </li>`).join('')}</ul></div>` : ''}
      </div>
    </section>`,
  });
};

/* -------------------------------------------------------------------------- */
/* FOR TEAMS, TUITION, CONTACT, APPLY, BRAND, LEGAL, 404                      */
/* -------------------------------------------------------------------------- */
const forTeams = () => shell('for-teams/', {
  title: 'For teams',
  desc: 'Private cohorts, procurement-ready documentation and a named faculty lead.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>For teams</li></ol>
    <h1 style="max-width:22ch">Design education your team will actually finish.</h1>
    <p class="lede">We run the same cohort model inside companies: twelve to sixteen people, one live room, one artefact, six weeks.</p>
    <div class="flex wrap gap-3 mt-4"><a class="btn btn--primary" href="{{R}}contact/">Book a call</a><a class="btn btn--ghost" href="{{R}}library/">Download the L&amp;D prospectus</a></div>
  </div></div>
  <section class="section section--tight">
    <div class="container">
      <div class="flex wrap gap-7 items-center" style="justify-content:space-between">
        ${partners.map((p) => `<span style="font-size:1.0625rem;font-weight:500;color:var(--ink-3)">${p}</span>`).join('')}
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container reading">
      <div class="prose">
        <p class="kicker">The problem</p>
        <p style="font-size:var(--fs-lede);color:var(--ink)">Seat licences get bought, opened twice and forgotten. Completion is the only number that matters, and most platforms will not show it to you.</p>
        <p>A private cohort changes the incentives. Attendance is visible, the artefact is shared, and the manager who sponsored it can see the work rather than the login count.</p>
        <h2>How we work with teams</h2>
        <ol><li><strong>Scope</strong> — one call, one page of outcomes you actually need.</li><li><strong>Select</strong> — we name the faculty lead and send a written syllabus for approval.</li><li><strong>Run</strong> — six weeks, one room, weekly notes to the sponsor.</li><li><strong>Report</strong> — an artefact, a rubric score per person, and a short written review.</li></ol>
        <h2>Programmes</h2>
        <div class="table-wrap"><table class="table">
          <thead><tr><th scope="col">Programme</th><th scope="col">Cohort</th><th scope="col">Duration</th><th scope="col">Investment</th></tr></thead>
          <tbody>
            <tr><td>Interface craft</td><td>12–16 people</td><td>6 weeks</td><td>On request</td></tr>
            <tr><td>Design systems in practice</td><td>8–12 engineers</td><td>4 weeks</td><td>On request</td></tr>
            <tr><td>Critique and creative direction</td><td>8–10 leads</td><td>3 weeks</td><td>On request</td></tr>
          </tbody></table></div>
        <h2>Procurement and security</h2>
        <dl class="deflist">
          <div><dt>Invoicing</dt><dd>Single invoice per cohort, purchase order accepted, 30-day terms.</dd></div>
          <div><dt>Data</dt><dd>EU-hosted, DPA available, no third-party advertising trackers.</dd></div>
          <div><dt>Accessibility</dt><dd>WCAG 2.2 AA. Captions on every recording. Written accessibility statement.</dd></div>
        </dl>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Outcomes</p><p>Two case studies, one bank and one broadcaster. Available on request under NDA.</p></div>
        <div><p class="margin__label">Contact</p><a class="link-arrow" href="../contact/">Partnerships team ${icon('arrow')}</a></div>
      </aside>
    </div>
  </section>
  <section class="section section--tight">
    <div class="container">
      ${head({ kicker: 'Enquiry', title: 'Tell us about your team', align: 'left' })}
      <div class="grid grid--2" style="gap:var(--sp-9);align-items:start">
        <form class="form-stack" data-validate novalidate>
          <div data-error-summary hidden class="form-error-summary" role="alert"></div>
          ${field({ id: 't-name', label: 'Your name', autocomplete: 'name', rules: 'required', msg: 'Required' })}
          ${field({ id: 't-email', label: 'Work email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid work email' })}
          ${field({ id: 't-company', label: 'Company', rules: 'required', msg: 'Required' })}
          ${field({ id: 't-size', label: 'Team size', tag: 'select', options: ['1–10', '11–50', '51–200', '200+'] })}
          ${field({ id: 't-msg', label: 'What are you trying to change?', tag: 'textarea', rules: 'required', msg: 'A sentence helps us prepare.' })}
          <button class="btn btn--primary" type="submit">Send enquiry</button>
        </form>
        <div data-success hidden class="form-success">
          <span class="form-success__tick">${icon('check')}</span>
          <h2 class="h3" data-success-focus tabindex="-1">Thank you</h2>
          <p class="small">This is a demo form, so nothing was sent. In production, partnerships would reply within one working day.</p>
        </div>
        <div class="prose"><p class="kicker">What happens next</p><p>We reply within one working day with two possible faculty leads and a proposed date. No deck, no discovery call before that.</p>
        <p>If a private cohort is not the right shape, we will say so and suggest a public one instead.</p></div>
      </div>
    </div>
  </section>`,
});

const tuition = () => shell('tuition/', {
  title: 'Tuition and funding',
  desc: 'Fees, deposits, employer sponsorship, instalments and scholarships.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Tuition</li></ol>
    <h1>Tuition and funding</h1>
    <p class="lede">One fee per cohort. No subscription, no upsell, no materials to buy.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container">
      <div class="table-wrap">
        <table class="table">
          <caption class="sr-only">Fees by course</caption>
          <thead><tr><th scope="col">Course</th><th scope="col">Fee</th><th scope="col">Deposit</th><th scope="col">Duration</th></tr></thead>
          <tbody>${courses.map((c) => `<tr><td><a href="../courses/${c.slug}/">${esc(c.title)}</a></td><td class="num">${fmtPrice(c.cohortPrice)}</td><td class="num">${fmtPrice(Math.round(c.price * 0.64))}</td><td class="num">6 weeks</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container reading">
      <div class="prose">
        <h2>Funding</h2>
        <p><strong>Employer sponsorship.</strong> We invoice your employer directly and provide documentation for procurement, including a written syllabus and learning outcomes.</p>
        <p><strong>Instalments.</strong> Three payments, at no additional cost, arranged before the cohort starts.</p>
        <p><strong>Scholarships.</strong> Three per cohort, covering the full fee, for people from groups under-represented in the field. Application is a short form and one piece of work.</p>
        <h2>Cancellations and transfers</h2>
        <dl class="deflist">
          <div><dt>Before day 7</dt><dd>Full refund of the deposit and any tuition paid.</dd></div>
          <div><dt>Day 7 to start</dt><dd>Free transfer to a later cohort, or refund less the deposit.</dd></div>
          <div><dt>After start</dt><dd>No refund; you may transfer once to a later cohort at 50% of the fee.</dd></div>
        </dl>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Questions</p><a class="link-arrow" href="../contact/">Admissions ${icon('arrow')}</a></div>
        <div><p class="margin__label">Print</p><p>This page is designed to be printed for procurement.</p></div>
      </aside>
    </div>
  </section>
  <section class="section section--tight"><div class="container container--narrow">
    ${head({ kicker: 'Questions', title: 'Tuition, answered' })}${faqList(faqs)}
  </div></section>`,
});

const contact = () => shell('contact/', {
  title: 'Contact',
  desc: 'Admissions, partnerships, press and accessibility. We reply within two working days.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Contact</li></ol>
    <h1>Contact</h1>
    <p class="lede">We reply within two working days. Accessibility reports are triaged the same day.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container grid" style="grid-template-columns:minmax(0,6fr) minmax(0,5fr);gap:var(--sp-10);align-items:start">
      <form class="form-stack" data-validate novalidate>
        <div data-error-summary hidden class="form-error-summary" role="alert"></div>
        ${field({ id: 'c-name', label: 'Your name', autocomplete: 'name', rules: 'required', msg: 'Required' })}
        ${field({ id: 'c-email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email' })}
        ${field({ id: 'c-reason', label: 'Reason for writing', tag: 'select', options: ['Admissions', 'Partnerships', 'Press', 'Accessibility', 'Faculty', 'Something else'] })}
        ${field({ id: 'c-msg', label: 'Message', tag: 'textarea', rules: 'required', msg: 'A sentence or two helps.' })}
        <label class="check"><input type="checkbox" id="c-consent" data-rules="checked" data-msg="Please accept the privacy policy."><span>I agree to the <a href="../legal/privacy/" style="text-decoration:underline">privacy policy</a>.</span></label>
        <button class="btn btn--primary" type="submit">Send</button>
      </form>
      <div data-success hidden class="form-success">
        <span class="form-success__tick">${icon('check')}</span>
        <h2 class="h3" data-success-focus tabindex="-1">Message sent</h2>
        <p class="small">Demo form — nothing was sent. In production we would reply within two working days.</p>
      </div>
      <div>
        <dl class="deflist">
          <div><dt>General</dt><dd>hello@webacademy.example</dd></div>
          <div><dt>Admissions</dt><dd>admissions@webacademy.example</dd></div>
          <div><dt>Partnerships</dt><dd>teams@webacademy.example</dd></div>
          <div><dt>Press</dt><dd>press@webacademy.example</dd></div>
          <div><dt>Accessibility</dt><dd>accessibility@webacademy.example</dd></div>
          <div><dt>Studio</dt><dd>14 Marlborough Yard, London SE1</dd></div>
          <div><dt>Hours</dt><dd>Mon–Fri, 09:00–18:00 GMT</dd></div>
        </dl>
        <div class="mt-6" style="border:1px solid var(--line);border-radius:16px;overflow:hidden">
          <img src="../assets/img/nova-collab.svg" alt="Illustration of the studio" width="800" height="450" style="width:100%">
        </div>
        <p class="mono mt-2" style="color:var(--ink-3)">Studio · five minutes from London Bridge</p>
      </div>
    </div>
  </section>`,
});

const apply = () => shell('apply/', {
  title: 'Apply',
  desc: 'A three-step preview for illustrative cohorts. Nothing is sent.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Apply</li></ol>
    <h1>Apply for a cohort</h1>
    <p class="lede">Three short steps to explore the application experience. Demo only—your details are not sent, saved or reviewed by an admissions team.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container" style="max-width:760px">
      <div class="steps-nav" data-steps-nav>
        <span class="steps-nav__item is-current">01 — You</span>
        <span class="steps-nav__item">02 — Your cohort</span>
        <span class="steps-nav__item">03 — Review</span>
      </div>
      <form data-apply data-validate novalidate>
        <div data-error-summary hidden class="form-error-summary" role="alert"></div>

        <fieldset data-step="1" style="border:0;padding:0;margin:0">
          <legend class="sr-only">Step 1 — about you</legend>
          <h2 class="h3" data-step-focus tabindex="-1">About you</h2>
          <div class="form-stack mt-6">
            ${field({ id: 'a-name', label: 'Full name', autocomplete: 'name', rules: 'required', msg: 'Required' })}
            ${field({ id: 'a-email', label: 'Email', type: 'email', autocomplete: 'email', rules: 'required email', msg: 'Enter a valid email' })}
            ${field({ id: 'a-role', label: 'Current role', placeholder: 'e.g. product designer', rules: 'required', msg: 'Required' })}
            ${field({ id: 'a-country', label: 'Country', autocomplete: 'country-name', rules: 'required', msg: 'Required' })}
          </div>
          <div class="flex gap-3 mt-8"><button class="btn btn--primary" type="button" data-next>Continue</button></div>
        </fieldset>

        <fieldset data-step="2" hidden style="border:0;padding:0;margin:0">
          <legend class="sr-only">Step 2 — your cohort</legend>
          <h2 class="h3" data-step-focus tabindex="-1">Your cohort</h2>
          <div class="form-stack mt-6">
            ${field({ id: 'a-course', label: 'Course', tag: 'select', options: courses.map((c) => {const cohort=cohorts.find(co=>co.course.id===c.id);return {value:c.slug,label:c.title+' — '+(cohort?(cohort.seatsFilled>=cohort.seats?'waitlist · ':'')+new Date(cohort.startsAt).toLocaleDateString('en-GB',{month:'short',year:'numeric'}):'future cohort interest')};}), rules: 'required' })}
            ${field({ id: 'a-funding', label: 'How will this be funded?', tag: 'select', options: ['Myself', 'My employer', 'Scholarship application'], rules: 'required' })}
            ${field({ id: 'a-motivation', label: 'Why this cohort, and why now?', tag: 'textarea', rules: 'required', msg: 'Please write between 200 and 1200 characters.', minLength: 200, maxLength: 1200, hint: '200–1200 characters. Plain text.' })}
          </div>
          <div class="flex gap-3 mt-8"><button class="btn btn--ghost" type="button" data-back>Back</button><button class="btn btn--primary" type="button" data-next>Continue</button></div>
        </fieldset>

        <fieldset data-step="3" hidden style="border:0;padding:0;margin:0">
          <legend class="sr-only">Step 3 — review</legend>
          <h2 class="h3" data-step-focus tabindex="-1">Review and submit</h2>
          <dl class="deflist mt-6" data-review></dl>
          <label class="check mt-6"><input type="checkbox" id="a-consent" data-rules="checked" data-msg="Please confirm."><span>Everything above is accurate, and I agree to the <a href="../legal/terms/" style="text-decoration:underline">terms</a>.</span></label>
          <div class="flex gap-3 mt-8"><button class="btn btn--ghost" type="button" data-back>Back</button><button class="btn btn--primary" type="submit">Submit application</button></div>
        </fieldset>
      </form>
      <div data-success hidden class="form-success mt-6">
        <span class="form-success__tick">${icon('check')}</span>
        <h2 class="h3" data-success-focus tabindex="-1">Application preview complete</h2>
        <p class="small">Demo form — nothing was sent. In production you would receive confirmation and the next cohort date within one working day.</p>
        <a class="btn btn--ghost btn--sm" href="../courses/">Read a syllabus while you wait</a>
      </div>
    </div>
  </section>`,
});

const brand = () => shell('brand/', {
  title: 'Brand',
  desc: 'The Web Academy identity system: logo, colour, type and graphic elements, with downloads.',
  body: `
  <div class="page-head"><div class="container page-head__inner">
    <ol class="breadcrumb"><li><a href="../">Home</a></li><li>Brand</li></ol>
    <h1>Brand system</h1>
    <p class="lede">Everything an agency or a partner needs, including the rules we hold ourselves to.</p>
  </div></div>
  <section class="section section--flush">
    <div class="container reading">
      <div class="stack" style="--stack:var(--sp-9)">
        <div>
          <h2 class="h3">The mark</h2>
          <p class="prose mt-3">A single unbroken line folded into a W. Continue its lines and the loop completes into a fingerprint. The ring frames the mark wherever it stands alone.</p>
          <div class="grid grid--3 mt-6" style="gap:var(--sp-5)">
            <div style="padding:28px;border:1px solid var(--line);border-radius:16px;display:grid;place-items:center"><img src="../assets/brand/wa-icon-navy.svg" alt="Icon, navy" width="120" height="120"></div>
            <div style="padding:28px;border:1px solid var(--line);border-radius:16px;display:grid;place-items:center;background:var(--wa-navy)"><img src="../assets/brand/wa-icon-lime.svg" alt="Icon, lime on navy" width="120" height="120"></div>
            <div style="padding:28px;border:1px solid var(--line);border-radius:16px;display:grid;place-items:center;background:var(--wa-lime)"><img src="../assets/brand/wa-icon-navy.svg" alt="Icon, navy on lime" width="120" height="120"></div>
          </div>
          <dl class="deflist mt-6">
            <div><dt>Construction</dt><dd>Square icon. One stroke weight governs the whole mark: 6.84% of the icon width, on both the ring and the W.</dd></div>
            <div><dt>Clear space</dt><dd>A quarter of the icon diameter on every side.</dd></div>
            <div><dt>Minimum size</dt><dd>24px for the icon, 96px wide for the horizontal lockup.</dd></div>
          </dl>
        </div>
        <div>
          <h2 class="h3">Colour</h2>
          <div class="grid grid--4 mt-4" style="gap:var(--sp-4)">
            ${[['Navy', '#012A5D', '14.09:1 on white'], ['Navy deep', '#001A3D', 'dark grounds'], ['Navy mid', '#14427F', 'panels on dark'], ['Sky', '#8DB8FF', '7.0:1 on navy'], ['Ice', '#EAF1FB', 'light tint'], ['Lime', '#C8F560', '11.19:1 with navy'], ['White', '#FFFFFF', 'paper'], ['—', '#F4F8FE', 'derived tint']]
              .map(([n, h, note]) => `<div><div style="height:64px;border:1px solid var(--line);border-radius:8px;background:${h}"></div>
              <p class="mono mt-2" style="color:var(--ink)">${n}</p><p class="small">${h} · ${note}</p></div>`).join('')}
          </div>
          <p class="small mt-4">Lime is a fill, never ink on white (1.26:1). It carries navy text at 11.19:1. Sky is never used for text on white (2.01:1).</p>
        </div>
        <div>
          <h2 class="h3">Type</h2>
          <p class="display mt-4">Teach the world</p>
          <p class="h2" style="font-weight:300;margin-block-start:8px">Teach the world</p>
          <p class="mono mt-4" style="color:var(--ink-3)">JetBrains Mono · labels, code and metadata only</p>
          <p class="prose mt-4">Lexend sets every Latin word: weight 200 for display, 600 for emphasis, 400 for body. Arabic uses licensed local Noto Sans Arabic at regular 400 and bold 700, with complete translated RTL editions. Milan Display and Tajarib, named in the brand book, are not bundled.</p>
        </div>
        <div>
          <h2 class="h3">Misuse</h2>
          <ul class="prose mt-3"><li>Don't stretch, squash or rotate the mark.</li><li>Don't place navy on a dark ground, or lime on a light one.</li><li>Don't retype the wordmark.</li><li>Don't fill the ridges motif.</li></ul>
        </div>
        <div>
          <h2 class="h3">Downloads</h2>
          <div class="flex wrap gap-3 mt-4">
            <a class="btn btn--ghost btn--sm" href="../assets/brand/wa-icon-navy.svg" download>Icon (SVG)</a>
            <a class="btn btn--ghost btn--sm" href="../assets/brand/wa-mark-navy.svg" download>Mark (SVG)</a>
            <a class="btn btn--ghost btn--sm" href="../assets/brand/wa-icon-white.svg" download>Icon, white (SVG)</a>
            <a class="btn btn--ghost btn--sm" href="../assets/brand/og-atelier.svg" download>Social card</a>
          </div>
        </div>
      </div>
      <aside class="margin">
        <div><p class="margin__label">Contact</p><p>press@webacademy.example for approvals.</p></div>
        <div><p class="margin__label">Source</p><p>Adapted from the 27-page brand identity book, 2026.</p></div>
      </aside>
    </div>
  </section>`,
});

const legalPages = {
  privacy: ['Privacy policy', [
    ['What we collect', 'An email address when you apply or download a document; your application answers; cohort progress.'],
    ['Why we collect it', 'To run admissions and the cohort. We do not sell data and we do not run advertising trackers.'],
    ['Retention', 'Applications that are not taken up are deleted after 12 months.'],
    ['Your rights', 'Access, correction, export and deletion. Email privacy@webacademy.example.'],
  ]],
  terms: ['Terms of use', [
    ['Enrolment', 'A seat is confirmed when the deposit clears. Transfers are free up to one week before the start.'],
    ['Conduct', 'Critique rooms are moderated. Harassment ends access without refund.'],
    ['Intellectual property', 'You own the work you make. We may show it with written permission only.'],
    ['Changes', '30 days notice of material changes.'],
  ]],
  accessibility: ['Accessibility', [
    ['Our target', 'WCAG 2.2 AA across the site, the live rooms and the documents.'],
    ['What we have done', 'Keyboard-complete navigation, visible focus, 44px targets, captions on every recording, reduced-motion support.'],
    ['Known gaps', 'Two archive recordings predate our captioning standard and are being re-edited.'],
    ['Tell us', 'accessibility@webacademy.example, triaged the same day.'],
  ]],
};

const legal = (key) => {
  const [title, sections] = legalPages[key];
  return shell(`legal/${key}/`, {
    title,
    desc: `${title} for Web Academy.`,
    body: `
    <div class="page-head"><div class="container page-head__inner">
      <ol class="breadcrumb"><li><a href="../../">Home</a></li><li>Legal</li><li>${title}</li></ol>
      <h1>${title}</h1><p class="mono" style="color:var(--ink-3)">Last updated 12 October 2026</p>
    </div></div>
    <section class="section section--flush"><div class="container reading">
      <div class="prose"><p>Demonstration document for a fictional academy. Structure is real; commitments are illustrative.</p>
        ${sections.map(([t, b], i) => `<h2 id="s${i}">${t}</h2><p>${b}</p>`).join('')}</div>
      <aside class="margin"><div><p class="margin__label">On this page</p>
        <ul style="display:grid;gap:8px">${sections.map(([t], i) => `<li><a href="#s${i}" style="color:var(--ink-2)">${t}</a></li>`).join('')}</ul></div>
        <div><p class="margin__label">Also</p><ul style="display:grid;gap:8px"><li><a href="../privacy/" style="color:var(--ink-2)">Privacy</a></li><li><a href="../terms/" style="color:var(--ink-2)">Terms</a></li><li><a href="../accessibility/" style="color:var(--ink-2)">Accessibility</a></li></ul></div>
      </aside>
    </div></section>`,
  });
};

const notFound = () => page(site, '', {
  title: 'Page not found',
  desc: 'That page is not in the archive.',
  path: '404.html',
  body: `
  <section class="section" style="min-height:60vh;display:grid;place-items:center">
    <div class="container" style="max-width:520px;text-align:center">
      <p class="display" style="font-size:clamp(4rem,12vw,9rem);color:var(--ink-3)">404</p>
      <h1 class="h3" style="font-weight:300;margin-block-start:12px">This page is not in the archive.</h1>
      <p class="lede" style="margin-block-start:10px">It may have been a cohort from a previous term.</p>
      <div class="flex gap-3 mt-8" style="justify-content:center"><a class="btn btn--primary" href="./">Back to the academy</a><a class="btn btn--ghost" href="cohorts/">See cohorts</a></div>
    </div>
  </section>`,
});

const styleguide = () => shell('styleguide/', {
  title: 'Styleguide',
  desc: 'Components and states.',
  body: `
  <div class="page-head"><div class="container page-head__inner"><h1>Styleguide</h1><p class="lede">Internal QA. Not linked, not indexed.</p></div></div>
  <section class="section section--flush"><div class="container stack" style="--stack:var(--sp-9)">
    <div><h2 class="h3">Type</h2><p class="display">Display 84 · 200</p><p class="h1">H1 60</p><p class="h2">H2 52</p><p class="h3">H3 30</p><p class="h4">H4 21 · 500</p><p class="lede">Lede 22 — supporting sentence.</p><p>Body 17 — reading copy.</p><p class="mono">MONO 11 · LABEL</p></div>
    <div><h2 class="h3">Colour</h2><div class="flex wrap gap-4 mt-4">${[['Navy', '#012A5D'], ['Deep', '#001A3D'], ['Mid', '#14427F'], ['Sky', '#8DB8FF'], ['Ice', '#EAF1FB'], ['Lime', '#C8F560']].map(([n, h]) => `<div style="width:110px"><div style="height:64px;background:${h};border:1px solid var(--line)"></div><p class="mono mt-2">${n}</p></div>`).join('')}</div></div>
    <div><h2 class="h3">Buttons</h2><div class="flex wrap gap-3 mt-4"><button class="btn btn--primary">Primary</button><button class="btn btn--ghost">Ghost</button><button class="btn btn--quiet">Quiet</button></div></div>
    <div><h2 class="h3">Chips</h2><div class="flex wrap gap-3 mt-4"><span class="chip">Default</span><span class="chip chip--lime">Lime</span><span class="chip chip--solid">Solid</span></div></div>
    <div><h2 class="h3">Rows</h2><div class="row-list">${courses.slice(0, 2).map((c) => courseRow(c, '../')).join('')}</div></div>
  </div></section>`,
});

/* -------------------------------------------------------------------------- */
const depthOf = (p) => (p && !p.endsWith('/') ? 0 : p.split('/').filter(Boolean).length);
const fix = (html, p) => html.replaceAll('{{R}}', '../'.repeat(depthOf(p)));

export function routes() {
  const out = [];
  const push = (p, html) => out.push({ path: p, html: fix(html, p) });
  push('', home());
  push('courses/', coursesIndex());
  courses.forEach((c) => push(`courses/${c.slug}/`, courseDetail(c)));
  push('cohorts/', cohortsIndex());
  cohorts.forEach((co) => push(`cohorts/${co.slug}/`, cohortDetail(co)));
  push('live/', liveIndex());
  sessions.forEach((s) => push(`live/${s.slug}/`, liveDetail(s)));
  push('library/', libraryIndex());
  resources.forEach((r) => push(`library/${r.slug}/`, libraryDetail(r)));
  push('blog/', blogIndex());
  posts.forEach((p) => push(`blog/${p.slug}/`, postDetail(p)));
  push('about/', about());
  push('faculty/', facultyIndex());
  mentors.forEach((m) => push(`faculty/${m.slug}/`, facultyDetail(m)));
  push('for-teams/', forTeams());
  push('tuition/', tuition());
  push('contact/', contact());
  push('apply/', apply());
  push('brand/', brand());
  ['privacy', 'terms', 'accessibility'].forEach((k) => push(`legal/${k}/`, legal(k)));
  push('styleguide/', styleguide());
  push('404.html', notFound());
  return out;
}
