/* 04 · FOLIO — landing page compositions */
import { page } from '../../shared/lib/site.mjs';
import { icon, esc, fmtDuration, fmtPrice, field } from '../../shared/lib/ui.mjs';
import data from '../../shared/lib/data.mjs';
import { all as folioArt, connector, swash } from './art.mjs';

const { courses, mentors, sessions, resources, posts, testimonials, faqs, disciplines } = data;

export const site = {
  id: 'folio',
  name: 'Folio',
  fullName: 'Web Academy',
  chip: 'FOR CREATORS',
  tagline: 'A landing page for visual instructors',
  navLayout: 'folio',
  ctaLabel: 'Start teaching',
  ctaHref: '#start',
  loginHref: 'contact/',
  loginLabel: 'Log in',
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  faviconBg: '#012A5D',
  faviconInk: '#C8F560',
  ogBg: '#FFFFFF',
  ogInk: '#012A5D',
  ogSub: '#012A5D',
  ogTitle: 'Teach what you make.',
  ogKicker: 'FOR VISUAL INSTRUCTORS',
  footerBlurb:
    'A gallery that converts: your work is the hero and the brand is the frame around it. A fictional academy used to demonstrate this template.',
  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'What you get', href: '#everything' },
    { label: 'Work', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
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
      title: 'Teach',
      links: [
        { label: 'Start teaching', href: '#start' },
        { label: 'Pricing', href: '#pricing' },
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
<section class="hero" id="hero" aria-labelledby="hero-title">
  <div class="container">
    <div class="hero__grid">
      <div class="hero__copy">
        <p class="kicker">For visual instructors</p>
        <h1 class="display hero__title" id="hero-title">
          Turn your craft<br>
          into a classroom.
          ${swash().replace('<svg ', '<svg class="swash" aria-hidden="true" ').replace(' aria-hidden="true" preserveAspectRatio', ' preserveAspectRatio')}
        </h1>
        <p class="lede">Illustrators, designers and 3D artists teach on Web Academy. Live or self-paced, your pricing, your audience.</p>
        <div class="hero__buttons">
          <a class="btn btn--primary btn--lg" href="#start" data-cta="hero">Start teaching free ${icon('arrow')}</a>
          <a class="hero__secondary" href="#how">See how it works <span class="round">${icon('arrow')}</span></a>
        </div>
        <ul class="hero__bullets">
          <li>${tick} No platform fee for the first 3 months</li>
          <li>${tick} Your students, your pricing</li>
          <li>${tick} Live + self-paced in one place</li>
        </ul>
        <div class="hero__proof">
          <span class="avatar-stack" aria-hidden="true" style="display:flex">
            ${['ana', 'idris', 'mei'].map((m) => `<img src="{{R}}assets/img/av-${m}.svg" width="32" height="32" alt="" style="width:32px;height:32px;border-radius:999px;margin-inline-start:-8px;border:2px solid #fff">`).join('')}
          </span>
          <p><strong>2,400+ creators</strong> teaching · 4.9 avg. rating</p>
        </div>
      </div>
      <div class="hero__art">
        <div class="hero__block" aria-hidden="true"></div>
        <img src="{{R}}assets/img/folio-hero.svg" width="800" height="1000" alt="A visual instructor at a desk with a drawing tablet, ring light and a portfolio wall" fetchpriority="high" decoding="async">
      </div>
    </div>
  </div>
</section>`;

const trust = () => `
<section class="trust" id="trust" aria-label="Creators from">
  <div class="container">
    <p class="trust__label">Trusted by creators from</p>
    <ul class="trust__row">
      <li>Northlight</li><li>Palette&amp;Co</li><li>Studio Verdant</li><li>Fieldnote</li><li>Atlas Grey</li>
    </ul>
  </div>
</section>`;

const STEP_ART = ['layers', 'chart', 'megaphone', 'wand'];
const steps = () => `
<section class="section" id="how" aria-labelledby="how-title">
  <div class="container">
    <div class="section__head section__head--center">
      <p class="kicker">Three minutes to go live</p>
      <h2 class="h2" id="how-title">From portfolio to paid, in four steps.</h2>
      <p class="lede">No application, no interview, no waiting list. Upload three pieces and your first lesson outline builds itself.</p>
    </div>
    <div class="steps__wrap">
      <div class="steps__line" data-connector aria-hidden="true">
        ${connector(1200, 120)}
      </div>
      <ol class="steps">
      ${[
        ['Upload your work', 'Three portfolio pieces become your first lesson outline.'],
        ['Set your price', 'Choose live, self-paced, or both. You keep 88%.'],
        ['Open enrolment', 'A public page in the brand’s format, your domain, your voice.'],
        ['Teach and get paid', 'Automatic payouts on the 5th, every month.'],
      ]
        .map(
          ([t, b], i) => `<li class="step" data-reveal style="--i:${i}">
        <div class="step__top">
          <span class="step__plate">${icon(STEP_ART[i])}</span>
          <span class="step__n">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <h3>${t}</h3>
        <p>${b}</p>
      </li>`
        )
        .join('')}
      </ol>
    </div>
    <p class="small" style="margin-block-start:28px;text-align:center">
      <a class="hero__secondary" href="#start" data-cta="steps">Start teaching free <span class="round">${icon('arrow')}</span></a>
    </p>
  </div>
</section>`;

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

const everything = () => `
<section class="section" id="everything" aria-labelledby="everything-title">
  <div class="container" style="display:grid;gap:clamp(48px,7vw,96px)">
    <h2 class="sr-only" id="everything-title">What you get</h2>
    ${feature({
      flip: false,
      art: 'folio-pricing',
      alt: 'Hands arranging price tags beside a colour fan deck',
      kicker: 'Your work, your pricing',
      title: 'A course page that looks like your portfolio.',
      lede: 'Type, layout, motion — the same craft you put into your work goes into the page that sells it.',
      checks: ['Portfolio-grade course pages', 'Live + self-paced in one', 'Set any price, any currency', 'Own your student list'],
      cta: { label: 'Explore the tools', href: 'courses/' },
    })}
    ${feature({
      flip: true,
      art: 'folio-live',
      alt: 'A ring-lit camera on a tripod facing a laptop showing a live room',
      kicker: 'Teach live, from anywhere',
      title: 'One click, and the room is yours.',
      lede: 'A ring light, a laptop and a quiet hour is the whole studio. We handle the rest.',
      checks: ['One-click live rooms', 'Automatic recordings', 'Q&A + chat built in', 'Calendar invites that work'],
      cta: { label: 'See a live room', href: 'live/' },
    })}
    <div class="trio">
      ${[
        ['folio-library', 'The library', 'Guides, checklists and swatches you can hand to a student mid-lesson.', 'library/'],
        ['folio-paid', 'Get paid', '88% of every sale, payouts on the 5th, invoices handled.', '#pricing'],
        ['folio-students', 'Your students', 'Your list stays yours. Export it any time, in one click.', 'about/'],
      ]
        .map(
          ([art, t, b, href], i) => `<a class="trio__item" href="${href}" style="text-decoration:none;color:inherit;--i:${i}" data-reveal>
        <img src="{{R}}assets/img/${art}.svg" width="800" height="600" alt="" loading="lazy" decoding="async" data-float>
        <h3>${t}</h3><p>${b}</p>
        <span class="card__meta" style="margin-block-start:auto">${icon('arrowUpRight')} Open</span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const workCard = (c) => `
<a class="card card--link" href="{{R}}courses/${c.slug}/" data-reveal>
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
</a>`;

const work = () => `
<section class="section section--tight" id="work" aria-labelledby="work-title">
  <div class="container">
    <div class="section__head" style="flex-direction:row;align-items:flex-end;justify-content:space-between;max-width:none">
      <div class="section__head" style="gap:12px">
        <p class="kicker">Proof of craft</p>
        <h2 class="h2" id="work-title">Made on Web Academy.</h2>
      </div>
      <a class="btn btn--quiet" href="courses/">View all ${icon('arrow')}</a>
    </div>
    <div class="cards">${courses.slice(0, 3).map(workCard).join('')}</div>
  </div>
  <div style="margin-block-start:clamp(32px,5vw,56px)">
    <div class="container"><p class="meta" style="margin-block-end:14px">Student work gallery</p></div>
    <div class="ribbon" aria-label="Student work gallery" tabindex="0">
      ${courses
        .slice(0, 6)
        .map(
          (c, i) => `<figure class="ribbon__item" style="margin:0">
        <img src="{{R}}assets/img/${c.art}.svg" width="480" height="480" alt="Student work from ${esc(c.title)}" loading="lazy" decoding="async">
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
          <p class="kicker">Peer proof</p>
          <h2 class="h2" id="voices-title">Instructors who made the switch.</h2>
        </div>
        <div class="rail__nav">
          <button class="rail__btn" type="button" data-rail-prev aria-label="Previous story">${icon('chevronLeft')}</button>
          <button class="rail__btn" type="button" data-rail-next aria-label="Next story">${icon('chevronRight')}</button>
        </div>
      </div>
      <div class="rail__track" data-rail-track tabindex="0" aria-label="Instructor stories">
        ${[
          [testimonials[0], 'ana', '14 courses · 3.1K students'],
          [testimonials[1], 'idris', '9 courses · 1.8K students'],
          [testimonials[2], 'mei', '21 courses · 6.4K students'],
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
      <div class="rail__dots" aria-hidden="true">
        ${[0, 1, 2].map((i) => `<button class="rail__dot" type="button" data-rail-dot aria-current="${i === 0}"></button>`).join('')}
      </div>
    </div>
    <p class="small" style="margin-block-start:24px;text-align:center">
      <a class="hero__secondary" href="creators/">Read more creator stories <span class="round">${icon('arrow')}</span></a>
    </p>
  </div>
</section>`;

const plans = () => `
<section class="section section--ice" id="pricing" aria-labelledby="pricing-title">
  <div class="container">
    <div class="section__head section__head--center">
      <p class="kicker">Simple pricing</p>
      <h2 class="h2" id="pricing-title">You keep 88%. That is the whole idea.</h2>
      <p class="lede">No setup fee, no lock-in, no charge until your first student pays.</p>
    </div>
    <div class="plans">
      <article class="plan" data-reveal>
        <div class="plan__top">
          <h3 class="plan__name">Creator</h3>
          <span class="chip">Free to start</span>
        </div>
        <p class="plan__tag">For a first course, built on evenings and weekends.</p>
        <p class="plan__fee"><b>12%</b><span>platform fee per sale</span></p>
        <ul class="plan__list">
          <li>${tick}<span>Live + self-paced courses</span></li>
          <li>${tick}<span>Unlimited lessons and students</span></li>
          <li>${tick}<span>Payouts on the 5th, every month</span></li>
          <li>${tick}<span>Your list, exportable any time</span></li>
        </ul>
        <p class="plan__cta"><a class="btn btn--ghost btn--block" href="#start" data-cta="plan-creator">Start teaching free</a></p>
      </article>
      <article class="plan plan--hl" data-reveal style="--i:1">
        <div class="plan__top">
          <h3 class="plan__name">Studio</h3>
          <span class="chip" style="background:rgba(1,42,93,.1)">Best for teams</span>
        </div>
        <p class="plan__tag">For a small studio shipping courses together.</p>
        <p class="plan__fee"><b>8%</b><span>platform fee per sale</span></p>
        <ul class="plan__list">
          <li>${tick}<span>Everything in Creator</span></li>
          <li>${tick}<span>Three seats, shared library</span></li>
          <li>${tick}<span>Custom domain + advanced analytics</span></li>
          <li>${tick}<span>Priority support, 1 business day</span></li>
        </ul>
        <p class="plan__cta"><a class="btn btn--navy btn--block" href="contact/" data-cta="plan-studio">Talk to us</a></p>
      </article>
    </div>
    <div class="compare">
      <table>
        <caption class="sr-only">Plan comparison</caption>
        <thead><tr><th scope="col">What you get</th><th scope="col">Creator</th><th scope="col">Studio</th></tr></thead>
        <tbody>
          <tr><th scope="row">Platform fee</th><td>12%</td><td>8%</td></tr>
          <tr><th scope="row">Live rooms</th><td>Unlimited</td><td>Unlimited</td></tr>
          <tr><th scope="row">Custom domain</th><td>—</td><td>Included</td></tr>
          <tr><th scope="row">Analytics</th><td>Standard</td><td>Advanced</td></tr>
          <tr><th scope="row">Support</th><td>Community</td><td>Priority · 1 day</td></tr>
          <tr><th scope="row">Payout speed</th><td>Monthly, the 5th</td><td>Monthly, the 5th</td></tr>
        </tbody>
      </table>
    </div>
    <p class="meta" style="text-align:center;margin-block-start:24px">No setup fee · No lock-in · Cancel anytime</p>
  </div>
</section>`;

const faq = () => `
<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container">
    <div class="section__head section__head--center" style="margin-block-end:32px">
      <p class="kicker">Questions</p>
      <h2 class="h2" id="faq-title">Before you upload anything.</h2>
    </div>
    <div class="faq" data-acc="single">
      ${[
        ['Do I need to be a professional?', 'No. Most creators on Web Academy teach what they have been practising for two or three years. What matters is that you can show finished work and explain how you got there.'],
        ['How much does it cost?', 'Nothing to start. We take 12% of each sale on Creator, or 8% on Studio. No setup fee, no monthly minimum, no charge for a course that never sells.'],
        ['Can I keep selling elsewhere?', 'Yes. Courses are yours and there is no exclusivity clause. Many instructors keep a personal shop and use Web Academy for the live side.'],
        ['Who owns my content?', 'You do. We hold a licence to host and stream it while your course is live, and that licence ends the moment you unpublish.'],
        ['How and when do I get paid?', 'On the 5th of every month, for everything sold in the previous month, to any bank account in the supported list. There is no minimum payout.'],
        ['What if nobody enrols?', 'Publish for free and use the audience tools to build a list first. If a course sells nothing in 90 days you can delete it with no fee and no question.'],
      ]
        .map(
          ([q, a], i) => `<div class="faq__item">
        <h3 style="margin:0"><button class="faq__btn" type="button" data-acc-btn aria-expanded="${i === 0}" aria-controls="faq-p-${i}" id="faq-b-${i}">
          <span>${q}</span><span class="faq__sign" aria-hidden="true"></span>
        </button></h3>
        <div class="faq__panel" id="faq-p-${i}" role="region" aria-labelledby="faq-b-${i}"><div><p>${a}</p></div></div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const start = () => `
<section class="section section--tight" id="start" aria-labelledby="start-title">
  <div class="container">
    <div class="start">
      <div class="start__copy">
        <p class="kicker">Three fields and a button</p>
        <h2 class="h2" id="start-title">Start teaching this week.</h2>
        <p class="lede">Tell us what you make. We will set up your studio and send the first lesson template within an hour.</p>
        <ul class="hero__bullets">
          <li>${tick} Free while you build</li>
          <li>${tick} No card required</li>
          <li>${tick} Leave whenever you like</li>
        </ul>
        <form class="form" data-validate novalidate aria-describedby="start-err">
          <div class="form__error-summary" data-error-summary id="start-err" role="alert" hidden></div>
          ${field({ id: 'creator-name', label: 'Your name', name: 'name', rules: 'required', msg: 'Please tell us your name.', autocomplete: 'name' })}
          ${field({ id: 'creator-email', label: 'Email', type: 'email', name: 'email', rules: 'required email', msg: 'Enter a valid email address.', autocomplete: 'email' })}
          <div class="field" data-field>
            <label class="label" for="creator-what">What do you teach?</label>
            <select class="select" id="creator-what" name="discipline" data-rules="required" data-msg="Choose the closest discipline." required>
              <option value="">Choose one…</option>
              ${disciplines.map((d) => `<option>${d}</option>`).join('')}
            </select>
            <p class="field__error" id="creator-what-err"></p>
          </div>
          <input type="hidden" name="source" data-source value="direct">
          <button class="btn btn--primary btn--lg btn--block" type="submit">Start teaching free ${icon('arrow')}</button>
          <p class="form__consent">By continuing you agree to the <a href="legal/terms/">Terms</a> and <a href="legal/privacy/">Privacy Policy</a>.</p>
        </form>
        <div class="done" data-done aria-live="polite">
          <span class="done__tick">${icon('check')}</span>
          <h3 class="h2" style="font-size:26px">You are in.</h3>
          <p class="small">We have sent a setup link to your inbox. Nothing else is needed today.</p>
          <p style="margin-block-start:16px"><a class="btn btn--ghost" href="thank-you/">What happens next ${icon('arrow')}</a></p>
        </div>
      </div>
      <aside class="start__panel" aria-label="Creator note">
        <img src="{{R}}assets/img/folio-frame.svg" width="800" height="800" alt="A tilted empty frame with a paintbrush" loading="lazy" decoding="async" data-float>
        <p class="start__quote">“I uploaded three illustrations on a Tuesday and taught my first live room eleven days later.” <b>Léa M. · Illustrator, Lyon</b></p>
        <p class="meta" style="margin:0">2,400+ creators · 4.9 avg rating</p>
      </aside>
    </div>
  </div>
</section>`;

const newsletter = () => `
<section class="section section--tight news" id="newsletter" aria-labelledby="news-title">
  <div class="container">
    <div class="news__inner">
      <h2 id="news-title">Keep the loop.</h2>
      <p>One email a month. New courses, live sessions, no noise.</p>
      <form class="news__form" data-news novalidate>
        <div class="field">
          <label class="sr-only" for="news-email">Email address</label>
          <input class="input" id="news-email" name="email" type="email" placeholder="you@work.com" autocomplete="email" required>
        </div>
        <button class="btn btn--primary" type="submit">Subscribe</button>
      </form>
      <p class="news__done" data-news-done aria-live="polite">${tick} You are in. Look for one email a month.</p>
    </div>
  </div>
</section>`;

const sticky = () => `
<div class="sticky-cta" data-sticky aria-hidden="true">
  <a class="btn btn--primary btn--block" href="#start" data-cta="sticky">Start teaching free</a>
</div>`;

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
        <a class="btn btn--primary btn--block" href="../../#start" data-cta="course:${c.slug}">Start teaching free</a>
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
        <a class="btn btn--primary btn--block" href="../../#start" data-cta="post:${p.slug}">Start teaching free</a>
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
        <a class="btn btn--ghost" href="../#start" data-cta="creators">Start teaching free ${icon('arrow')}</a>
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
        ['Check your inbox', 'A setup link, valid for seven days.'],
        ['Upload three pieces', 'Any medium. Finished work only, no process shots.'],
        ['Open your first room', 'Pick a date ten days out. Invite the list you already have.'],
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
      desc: 'Web Academy for visual instructors — teach what you make. Live or self-paced, your pricing, 88% payout. A demonstration of the Folio landing template.',
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
            { q: 'Do I need to be a professional?', a: 'No. Most creators teach what they have practised for two or three years.' },
            { q: 'How much does it cost?', a: 'Nothing to start. 12% of each sale on Creator, 8% on Studio.' },
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

export const images = { ...folioArt };
