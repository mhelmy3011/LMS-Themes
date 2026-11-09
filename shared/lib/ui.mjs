/* Shared icon set — 24px grid, 1.6px stroke, round caps. Single source. */
const P = {
  briefcase: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M4 12h16M10 12v3h4v-3"/>',
  headphones: '<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="5" height="8" rx="2"/><rect x="16" y="12" width="5" height="8" rx="2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/>',
  play: '<path d="M9 6.5v11l9-5.5-9-5.5Z" fill="currentColor" stroke="none"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  star: '<path d="m12 4 2.3 5.1 5.7.6-4.3 3.8 1.2 5.5L12 16.2 7.1 19l1.2-5.5L4 9.7l5.7-.6L12 4Z" fill="currentColor" stroke="none"/>',
  heart: '<path d="M12 19.5s-7-4.3-7-9A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7 2.9c0 4.7-7 9-7 9Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  users: '<circle cx="9.5" cy="8.5" r="3.2"/><path d="M3.5 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M16.5 6.2a3 3 0 0 1 0 5.6M18 14.8c2 .5 3.2 2.2 3.5 4.7"/>',
  calendar: '<rect x="3.8" y="5.5" width="16.4" height="14.5" rx="2.4"/><path d="M3.8 10h16.4M8.5 3.6v3.6M15.5 3.6v3.6"/>',
  download: '<path d="M12 4v10.5M8 11l4 4 4-4M5 19.5h14"/>',
  chevronLeft: '<path d="m14.5 6-6 6 6 6"/>',
  chevronRight: '<path d="m9.5 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9.5 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  mic: '<rect x="9" y="3.5" width="6" height="10.5" rx="3"/><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21"/>',
  camera: '<rect x="3.5" y="7" width="12.5" height="10" rx="2.4"/><path d="m16 11 4.5-3v8L16 13"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M4.9 7.9l1.9 1.1M17.2 15l1.9 1.1M4.9 16.1l1.9-1.1M17.2 9l1.9-1.1"/>',
  book: '<path d="M4 5.5c3-1 6-1 8 0 2-1 5-1 8 0v13c-3-1-6-1-8 0-2-1-5-1-8 0v-13Z"/><path d="M12 5.5v13"/>',
  video: '<rect x="3.5" y="6" width="17" height="12" rx="2.6"/><path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none"/>',
  sparkle: '<path d="M12 4.5l1.7 4.3 4.3 1.7-4.3 1.7L12 16.5l-1.7-4.3L6 10.5l4.3-1.7L12 4.5Z"/>',
  quote: '<path d="M9.5 6.5C6.9 8 5.5 10.2 5.5 13v4.5h5V12h-3c0-1.7.7-3 2-3.8l-1-1.7ZM19.5 6.5C16.9 8 15.5 10.2 15.5 13v4.5h5V12h-3c0-1.7.7-3 2-3.8l-1-1.7Z" fill="currentColor" stroke="none"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2.2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.4"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
  pin: '<path d="M12 21s6.5-6 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5 6.5 11 6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
  phone: '<path d="M7 3.8 9.5 8 7.8 9.8c.9 2 2.4 3.5 4.4 4.4L14 12.5l4.2 2.5c-.4 2.4-2 4-4.4 4C8.6 19 5 15.4 5 10.2c0-2.4 1.6-4 4.2-4.4"/>',
  code: '<path d="m9 8-4 4 4 4M15 8l4 4-4 4"/>',
  layers: '<path d="m12 4 8 4-8 4-8-4 8-4ZM4 12l8 4 8-4M4 16l8 4 8-4"/>',
  grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
  bolt: '<path d="M13 3 5.5 13.5H11l-1 7.5 8-11H12l1-7Z"/>',
  chart: '<path d="M4 19.5h16M7 19.5V12M12 19.5V7M17 19.5v-5"/>',
  file: '<path d="M6.5 3.5h7l4 4v13h-11v-17Z"/><path d="M13.5 3.5v4h4"/>',
  external: '<path d="M14 4h6v6M20 4l-8 8"/><path d="M18 14v5.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1H11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  film: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.2"/><path d="M8 5.5v13M16 5.5v13M3.5 12h17"/>',
  award: '<circle cx="12" cy="9.5" r="5.5"/><path d="m8.5 14-1.5 6 5-2.5 5 2.5-1.5-6"/>',
  infinity: '<path d="M8.5 8.5c2 0 3.5 3.5 7 3.5a3.5 3.5 0 1 0 0-7c-3.5 0-5 7-8.5 7a3.5 3.5 0 1 1 0-7c3.5 0 5 3.5 1.5 3.5"/>',
  boltAlt: '<path d="M12 3.5 6 12h5l-1 8.5L18 11h-5l1-7.5Z"/>',
  user: '<circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c.7-3.4 3.4-5.2 7-5.2s6.3 1.8 7 5.2"/>',
  dashboard: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.4"/><path d="M3.5 9.5h17M9 9.5v10"/>',
  megaphone: '<path d="M4 10v4l3 .5V9.5L4 10Z"/><path d="M7 9.5 18 5v14L7 14.5v-5Z"/><path d="M10 15v4.5"/>',
  wand: '<path d="m5 19 9.5-9.5M15 4.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/>',
};

export function icon(name, cls = '') {
  const body = P[name] || P.sparkle;
  return `<svg class="ic ${cls}" data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

export function stars(rating = 5, count = 5) {
  let out = '';
  for (let i = 0; i < count; i++) out += icon('star');
  return `<span class="stars" role="img" aria-label="${rating} out of 5">${out}</span>`;
}

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const fmtDuration = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h}h ${m ? m + 'm' : ''}`.trim() : `${m}m`;
};
export const fmtPrice = (minor, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: minor % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(minor / 100);

/* ---------- structural components (styled per template) ---------- */

export function head({ kicker, title, lede, action = '', align = 'left', id }) {
  const label = id ? ` id="${id}"` : '';
  return `
  <div class="head ${align === 'center' ? 'head--center' : ''}">
    <div class="head__text">
      ${kicker ? `<p class="kicker"><span class="kicker__dot"></span>${kicker}</p>` : ''}
      <h2 class="h2"${label}>${title}</h2>
      ${lede ? `<p class="lede">${lede}</p>` : ''}
    </div>
    ${action || ''}
  </div>`;
}

export function field({ id, label, type = 'text', name, rules = '', msg = '', hint = '', placeholder = '', optional = false, tag = 'input', options = [], autocomplete = '', rows = 5, minLength = 0, maxLength = 0 }) {
  const req = rules.includes('required') ? ' required' : '';
  const validation = ` data-rules="${esc(rules)}" data-msg="${esc(msg)}"${minLength ? ` minlength="${minLength}"` : ''}${maxLength ? ` maxlength="${maxLength}"` : ''}`;
  if (tag === 'input' && ['select','textarea'].includes(type)) tag = type;
  const control =
    tag === 'textarea'
      ? `<textarea class="textarea" id="${id}" name="${name || id}" rows="${rows}" placeholder="${esc(placeholder)}"${req}${validation} aria-describedby="${id}-err${hint ? ` ${id}-hint` : ''}">${''}</textarea>`
      : tag === 'select'
        ? `<select class="select" id="${id}" name="${name || id}"${req}${validation} aria-describedby="${id}-err${hint ? ` ${id}-hint` : ''}">${req ? '<option value="">Choose one…</option>' : ''}${options
            .map((o) => `<option value="${esc(typeof o === 'string' ? o : o.value)}">${esc(typeof o === 'string' ? o : o.label)}</option>`)
            .join('')}</select>`
        : `<input class="input" id="${id}" name="${name || id}" type="${type}" placeholder="${esc(placeholder)}"${req}${validation}${autocomplete ? ` autocomplete="${autocomplete}"` : ''} aria-describedby="${id}-err${hint ? ` ${id}-hint` : ''}">`;
  return `
  <div class="field" data-field>
    <label class="label ${optional ? 'label--opt' : ''}" for="${id}">${label}</label>
    ${control}
    ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
    <p class="field__error" id="${id}-err" data-msg="${esc(msg)}"></p>
  </div>`;
}

export function courseCard(c, R, { dark = false } = {}) {
  const price = c.free ? 'FREE' : fmtPrice(c.price, c.currency);
  return `
  <article class="card card--link course-card" data-course-id="${c.id}" data-price="${c.price}" data-level="${c.level.toLowerCase()}" data-duration="${c.duration}" data-tags="${c.track} ${c.level.toLowerCase()}" data-text="${esc(c.title)} ${esc(c.mentor)} ${c.track}">
    <div class="card__media">
      <img src="${R}assets/img/${c.art}.svg" alt="" width="800" height="500" loading="lazy" decoding="async">
      <span class="chip chip--solid card__badge">${c.level}</span>
      <span class="chip ${c.free ? 'chip--lime' : 'chip--solid'} card__flag">${price}</span>
      <button class="edu-save" type="button" data-fav="${c.id}" aria-pressed="false" aria-label="Save ${esc(c.title)}">${icon('heart')}</button>
    </div>
    <div class="card__body">
      <div class="card__meta"><span>${c.trackLabel}</span><span>·</span><span>${c.lessonCount} lessons</span></div>
      <h3 class="card__title"><a class="card__cover" href="${R}courses/${c.slug}/">${esc(c.title)}</a></h3>
      <p class="edu-card-outcome">${esc(c.project)}</p>
      <div class="card__foot">
        <span class="meta flex items-center gap-2">
          <img class="avatar" src="${R}assets/img/av-${c.mentorId}.svg" alt="" width="24" height="24">
          ${esc(c.mentor)}
        </span>
        <span class="meta num">${fmtDuration(c.duration)} · ${c.rating}★</span>
      </div>
    </div>
  </article>`;
}

export function mentorCard(m, R) {
  return `
  <a class="mentor-card" href="${R}mentors/${m.slug}/">
    <img src="${R}assets/img/av-${m.id}.svg" alt="Portrait of ${esc(m.name)}" width="320" height="320" loading="lazy">
    <span class="mentor-card__name">${esc(m.name)}</span>
    <span class="mentor-card__role">${esc(m.specialty[0])}</span>
  </a>`;
}

export function postCard(p, R, { lead = false } = {}) {
  return `
  <article class="card card--link post-card ${lead ? 'post-card--lead' : ''}">
    <div class="card__media">
      <img src="${R}assets/img/${p.art}.svg" alt="" width="800" height="450" loading="lazy" decoding="async">
    </div>
    <div class="card__body">
      <p class="kicker"><span class="kicker__dot"></span>${p.category}</p>
      <h3 class="card__title"><a class="card__cover" href="${R}blog/${p.slug}/">${esc(p.title)}</a></h3>
      ${lead ? `<p class="small">${esc(p.excerpt)}</p>` : ''}
      <div class="card__foot">
        <span class="meta"><time datetime="${p.publishedAt}">${p.dateLabel}</time></span>
        <span class="meta">${p.readingMin} min read</span>
      </div>
    </div>
  </article>`;
}

export function sessionRow(s, R, { live = false } = {}) {
  return `
  <li class="session-row">
    <div class="session-row__time">
      <span class="num" data-datetime="${s.startsAt}" data-datetime-format="time">10:00</span>
      <span class="meta"><span data-datetime="${s.startsAt}">—</span></span>
    </div>
    <div class="session-row__main">
      <span class="chip ${live ? 'chip--lime' : 'chip--outline'}">${live ? '<span class="chip__dot"></span>DEMO LIVE' : s.status === 'ended' ? 'REPLAY' : s.durationMin + ' min'}</span>
      <h3 class="session-row__title"><a href="${R}live/${s.slug}/">${esc(s.title)}</a></h3>
      <p class="meta">${esc(s.mentor)} · ${s.format}</p>
    </div>
    <div class="session-row__seats">
      <span class="meta">${s.seats - s.seatsFilled} of ${s.seats} seats</span>
      <div class="meter" role="progressbar" aria-valuenow="${s.seatsFilled}" aria-valuemin="0" aria-valuemax="${s.seats}" aria-label="Seats filled">
        <span style="width:${Math.round((s.seatsFilled / s.seats) * 100)}%"></span>
      </div>
    </div>
    <div class="session-row__cta">
      <a class="btn btn--ghost btn--sm" href="${R}live/${s.slug}/">${s.status === 'ended' ? 'Watch' : 'Reserve'}</a>
    </div>
  </li>`;
}

export function resourceRow(r, R) {
  return `
  <li class="res-row" data-tags="${r.type}" data-text="${esc(r.title)}">
    <span class="res-row__type chip chip--outline">${r.type}</span>
    <div class="res-row__main">
      <h3 class="h4"><a href="${R}library/${r.slug}/">${esc(r.title)}</a></h3>
      <p class="meta">${esc(r.blurb)}</p>
    </div>
    <span class="res-row__meta meta num">${r.pages} pages · ${r.size}</span>
    <a class="res-row__dl" href="${R}library/${r.slug}/" aria-label="Download ${esc(r.title)}">${icon('download')}</a>
  </li>`;
}

export function faqList(faqs, { id = 'faq' } = {}) {
  return `<div class="acc" data-acc="single" data-faq id="${id}">
    ${faqs
      .map(
        (f, i) => `
      <div class="acc__item">
        <h3><button class="acc__btn" type="button" data-acc-btn aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="${id}-p${i}">
          <span>${esc(f.q)}</span><span class="acc__sign" aria-hidden="true"></span>
        </button></h3>
        <div class="acc__panel" id="${id}-p${i}"><div><p>${esc(f.a)}</p></div></div>
      </div>`
      )
      .join('')}
  </div>`;
}

export function pagination(current, total, R, base) {
  return `<nav class="pagination" aria-label="Pagination">
    ${Array.from({ length: total }, (_, i) => {
      const n = i + 1;
      return `<a class="pagination__link" href="${R}${base}${n === 1 ? '' : 'page/' + n + '/'}" ${n === current ? 'aria-current="page"' : ''}>${n}</a>`;
    }).join('')}
  </nav>`;
}

export function ctaBand({ title, body, primary, secondary, R, dark = false }) {
  return `<section class="section section--flush">
    <div class="container">
      <div class="cta-band ${dark ? 'cta-band--dark' : ''}" data-reveal>
        <div class="cta-band__text">
          <h2 class="h2">${title}</h2>
          <p class="lede">${body}</p>
        </div>
        <div class="cta-band__actions">
          <a class="btn btn--primary btn--lg" href="${primary.href}">${primary.label}</a>
          ${secondary ? `<a class="btn btn--ghost btn--lg" href="${secondary.href}">${secondary.label}</a>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

export const THEMES = [
  { id: 'nova', name: 'Nova', dir: '01-nova-academy/dist/', temp: 'Light · playful', desc: 'Consumer catalogue academy' },
  { id: 'atelier', name: 'Atelier', dir: '02-atelier-academy/dist/', temp: 'Paper · editorial', desc: 'Cohort academy for professionals' },
  { id: 'aero', name: 'Aero', dir: '03-aero-academy/dist/', temp: 'Dark · cinematic', desc: 'Live academy + creator earnings' },
  { id: 'folio', name: 'Folio', dir: '04-folio-landing/dist/', temp: 'Bright · conversion', desc: 'Landing page for visual instructors' },
];
