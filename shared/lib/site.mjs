/* ==========================================================================
   Build kit: page shell, shared chrome (nav / drawer / footer / switcher),
   asset pipeline and the static writer. Every template uses the same
   semantic markup; only the stylesheet differs.
   ========================================================================== */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icon, THEMES, esc } from './ui.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const SHARED = path.resolve(HERE, '..');

const write = async (file, content) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
};

/* -------------------------------------------------------------------------- */
/* brand lockup                                                               */
/* -------------------------------------------------------------------------- */
export function brand(site, R, { color = 'navy', size = 'nav', href } = {}) {
  const target = href ?? `${R}`;
  return `<a class="brand brand--${size}" href="${target}" aria-label="${site.fullName} — home">
    <img class="brand__mark" src="${R}assets/brand/wa-icon-${color}-small.svg" alt="" width="34" height="34" decoding="async">
    <span class="brand__word">Web&nbsp;Academy</span>
    ${site.chip ? `<span class="brand__chip">${site.chip}</span>` : ''}
  </a>`;
}

/* -------------------------------------------------------------------------- */
/* navigation                                                                 */
/* -------------------------------------------------------------------------- */
function themeLinks(site, R, current) {
  const up = `${R}../../`;
  return THEMES.map(
    (t) => `<li>
      <a class="themes__item ${t.id === current ? 'is-current' : ''}" href="${up}${t.dir}"
         ${t.id === current ? 'aria-current="true"' : ''}>
        <span class="themes__swatch themes__swatch--${t.id}" aria-hidden="true"></span>
        <span class="themes__text"><strong>${t.name}</strong><small>${t.temp}</small></span>
        ${t.id === current ? '<span class="themes__now">Current</span>' : icon('arrow', 'themes__arrow')}
      </a>
    </li>`
  ).join('');
}

export function nav(site, R, { current = '' } = {}) {
  const isCenter = site.navLayout === 'center';
  const link = (it) => {
    const active = current === it.href ? ' aria-current="page"' : '';
    return `<li class="nav__item"><a class="nav__link" href="${R}${it.href}"${active}>${it.label}</a></li>`;
  };
  const linkWithMenu = (it) => {
    if (!it.children) return link(it);
    return `<li class="nav__item" data-menu>
      <button class="nav__link nav__link--menu" type="button" data-menu-trigger aria-expanded="false" aria-haspopup="true">
        ${it.label}${icon('chevronDown', 'nav__caret')}
      </button>
      <div class="menu-panel" data-menu-panel hidden>
        <ul class="menu-panel__list">
          ${it.children.map((c) => `<li><a class="menu-panel__link" href="${R}${c.href}">
            <span class="menu-panel__label">${c.label}</span>
            ${c.desc ? `<span class="menu-panel__desc">${c.desc}</span>` : ''}</a></li>`).join('')}
        </ul>
        ${it.feature ? `<a class="menu-panel__feature" href="${R}${it.feature.href}">
            <img src="${R}assets/img/${it.feature.art}.svg" alt="" width="280" height="160" loading="lazy">
            <span><strong>${it.feature.title}</strong><small>${it.feature.label}</small></span></a>` : ''}
      </div>
    </li>`;
  };

  const themesBtn = (extraClass = '') => `<div class="nav__themes ${extraClass}" data-menu>
      <button class="nav__link nav__link--themes" type="button" data-menu-trigger aria-expanded="false" aria-haspopup="true" title="Switch template">
        ${icon('grid')}<span class="nav__themes-label">Themes</span>
      </button>
      <div class="menu-panel menu-panel--themes" data-menu-panel hidden>
        <p class="menu-panel__title mono">Four templates · one brand</p>
        <ul class="themes__list">${themeLinks(site, R, site.id)}</ul>
        <a class="themes__all" href="${R}../../index.html">All themes ${icon('arrowUpRight')}</a>
      </div>
    </div>`;

  const leftItems = isCenter ? site.nav.slice(0, 4).map(link).join('') : site.nav.map(linkWithMenu).join('');
  const rightItems = isCenter ? site.nav.slice(4).map(link).join('') : '';

  return `<header class="nav nav--${site.navLayout}" data-nav>
    <div class="nav__inner container">
      <ul class="nav__links nav__links--start">${leftItems}</ul>
      ${brand(site, R)}
      <div class="nav__end">
        <ul class="nav__links nav__links--end">${rightItems}</ul>
        <div class="nav__actions">
          ${themesBtn()}
          ${site.loginLabel ? `<a class="btn btn--ghost btn--sm nav__login" href="${R}${site.loginHref || 'contact/'}">${site.loginLabel}</a>` : ''}
          <a class="btn btn--primary btn--sm nav__cta" href="${R}${site.ctaHref}">${site.ctaLabel}</a>
          <button class="nav__burger" type="button" data-drawer-toggle aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
            ${icon('menu')}
          </button>
        </div>
      </div>
    </div>
    <div class="drawer" id="drawer" data-drawer hidden>
      <div class="drawer__head">
        ${brand(site, R, { color: 'navy' })}
        <button class="drawer__close" type="button" data-drawer-close aria-label="Close menu">${icon('close')}</button>
      </div>
      <nav class="drawer__nav" aria-label="Mobile">
        <ul>${site.nav
          .map(
            (it, i) => `<li><a class="drawer__link" href="${R}${it.href}"><span class="drawer__num">${String(i + 1).padStart(2, '0')}</span>${it.label}</a>
            ${it.children ? `<ul class="drawer__sub">${it.children.map((c) => `<li><a href="${R}${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</li>`
          )
          .join('')}</ul>
        <p class="drawer__label mono">Templates</p>
        <ul class="drawer__themes">${THEMES.map((t) => `<li><a href="${R}../../${t.dir}" ${t.id === site.id ? 'aria-current="true"' : ''}>${t.name}<small>${t.temp}</small></a></li>`).join('')}</ul>
      </nav>
      <div class="drawer__foot">
        ${site.loginLabel ? `<a class="btn btn--ghost btn--block" href="${R}${site.loginHref || 'contact/'}">${site.loginLabel}</a>` : ''}
        <a class="btn btn--primary btn--block" href="${R}${site.ctaHref}">${site.ctaLabel}</a>
      </div>
    </div>
  </header>`;
}

/* -------------------------------------------------------------------------- */
/* footer                                                                     */
/* -------------------------------------------------------------------------- */
export function footer(site, R) {
  const cols = site.footerCols
    .map(
      (col) => `<div class="footer__col">
      <p class="footer__title mono">${col.title}</p>
      <ul class="footer__list">${col.links.map((l) => `<li><a href="${R}${l.href}">${l.label}</a></li>`).join('')}</ul>
    </div>`
    )
    .join('');

  return `<footer class="footer" id="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          ${brand(site, R, { color: 'white' })}
          <p class="footer__blurb">${site.footerBlurb}</p>
          <p class="footer__tag mono">// keep looping</p>
        </div>
        ${cols}
        <div class="footer__col footer__col--news">
          <p class="footer__title mono">Stay in the loop</p>
          <p class="small">One email a month. New courses, live sessions, no noise.</p>
          <form class="footer__form" data-validate novalidate>
            <label class="sr-only" for="footer-email">Email address</label>
            <div class="field" data-field>
              <input class="input" id="footer-email" name="email" type="email" placeholder="you@work.com" data-rules="required email" data-msg="Enter a valid email address." required aria-describedby="footer-email-err">
              <p class="field__error" id="footer-email-err"></p>
            </div>
            <button class="btn btn--primary btn--sm" type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="meta">© <span data-year>2026</span> Web Academy. A fictional brand used for design demonstration.</p>
        <ul class="footer__legal">
          <li><a href="${R}legal/privacy/">Privacy</a></li>
          <li><a href="${R}legal/terms/">Terms</a></li>
          <li><a href="${R}legal/accessibility/">Accessibility</a></li>
          <li><a href="${R}../../index.html">All themes</a></li>
        </ul>
        <span class="footer__mark" aria-hidden="true"><img src="${R}assets/brand/wa-mark-white.svg" alt="" width="18" height="18"></span>
      </div>
    </div>
  </footer>`;
}

/* -------------------------------------------------------------------------- */
/* floating template switcher                                                 */
/* -------------------------------------------------------------------------- */
export function switcher(site, R) {
  return `<div class="switcher" data-switcher>
    <div class="switcher__panel" id="switcher-panel">
      <p class="switcher__title mono">Templates</p>
      <ul class="themes__list">${themeLinks(site, R, site.id)}</ul>
    </div>
    <button class="switcher__btn" type="button" data-switcher-btn aria-expanded="false" aria-controls="switcher-panel" aria-label="Switch template">
      <img src="${R}assets/brand/wa-icon-navy-small.svg" alt="" width="22" height="22">
      <span class="switcher__close" aria-hidden="true">${icon('close')}</span>
    </button>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/* page shell                                                                 */
/* -------------------------------------------------------------------------- */
export function page(site, R, { title, desc, body, bodyClass = '', path: pagePath = '', jsonld = [], progress = false, ogType = 'website' }) {
  const full = title === site.name ? `${site.fullName} — ${site.tagline}` : `${title} · ${site.fullName}`;
  const org = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.fullName,
    description: site.tagline,
    slogan: 'Teach the world',
    url: 'https://webacademy.example',
    sameAs: [],
  };
  const blocks = [org, ...jsonld].map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n');

  return `<!doctype html>
<html lang="en" dir="ltr" class="no-js" data-theme="${site.id}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="${site.colorScheme || 'light'}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="assets/brand/og-${site.id}.svg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${R}assets/brand/favicon-${site.id}.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${R}assets/brand/wa-icon-lime.svg">
<link rel="preload" href="${R}assets/fonts/lexend-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/css/${site.id}.css">
<script>document.documentElement.classList.remove('no-js')</script>
${blocks}
</head>
<body class="${bodyClass}" data-page="${site.id}">
<a class="skip-link" href="#main">Skip to content</a>
${progress ? '<div class="progress" data-progress aria-hidden="true"></div>' : ''}
${nav(site, R, { current: pagePath })}
<main id="main">
${body}
</main>
${footer(site, R)}
${switcher(site, R)}
<script src="${R}assets/js/${site.id}.js" defer></script>
</body>
</html>`;
}

/* -------------------------------------------------------------------------- */
/* asset pipeline                                                             */
/* -------------------------------------------------------------------------- */
const BRAND_COLORS = { navy: '#012A5D', white: '#FFFFFF', lime: '#C8F560', black: '#000000', deep: '#001A3D' };

export async function prepareAssets({ distDir, site, themeCss, scripts, images }) {
  const shared = SHARED;
  const brandDir = path.join(distDir, 'assets/brand');
  await fs.mkdir(brandDir, { recursive: true });

  /* brand SVG colour variants (source files use currentColor) */
  const iconSrc = await fs.readFile(path.join(shared, 'brand/wa-icon.svg'), 'utf8');
  const iconSmall = await fs.readFile(path.join(shared, 'brand/wa-icon-small.svg'), 'utf8');
  const markSrc = await fs.readFile(path.join(shared, 'brand/wa-mark.svg'), 'utf8');
  for (const [name, hex] of Object.entries(BRAND_COLORS)) {
    await write(path.join(brandDir, `wa-icon-${name}.svg`), iconSrc.replace('currentColor', hex).replace('aria-hidden="true"', ''));
    await write(path.join(brandDir, `wa-icon-${name}-small.svg`), iconSmall.replace('currentColor', hex).replace('aria-hidden="true"', ''));
    await write(path.join(brandDir, `wa-mark-${name}.svg`), markSrc.replace('currentColor', hex).replace('aria-hidden="true"', ''));
  }
  /* favicon: the icon, tuned for small sizes */
  await write(path.join(brandDir, `favicon-${site.id}.svg`),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${site.faviconBg}"/><g transform="translate(10 10) scale(0.44)">${iconSmall.replace('currentColor', site.faviconInk).replace(/<svg[^>]*>|<\/svg>/g, '')}</g></svg>`);
  await write(path.join(brandDir, 'wa-icon-16.svg'), iconSmall.replace('currentColor', '#012A5D'));

  /* OG image */
  await write(path.join(brandDir, `og-${site.id}.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${site.ogBg}"/>
    <g transform="translate(72 72) scale(1.5)">${markSrc.replace('currentColor', site.ogInk).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
    <text x="72" y="430" font-family="Lexend, Arial, sans-serif" font-size="76" font-weight="600" fill="${site.ogInk}" letter-spacing="-2">${esc(site.ogTitle)}</text>
    <text x="72" y="492" font-family="JetBrains Mono, monospace" font-size="22" fill="${site.ogSub}" letter-spacing="4">${esc(site.ogKicker)}</text>
    <rect x="72" y="540" width="120" height="6" fill="#C8F560"/>
  </svg>`);

  /* fonts */
  await fs.mkdir(path.join(distDir, 'assets/fonts'), { recursive: true });
  for (const f of ['lexend-latin.woff2', 'jetbrains-mono-latin.woff2']) {
    await fs.copyFile(path.join(shared, 'fonts', f), path.join(distDir, 'assets/fonts', f));
  }

  /* css: shared base + theme */
  const css = [
    await fs.readFile(path.join(shared, 'css/base.css'), 'utf8'),
    await fs.readFile(themeCss, 'utf8'),
  ].join('\n');
  await write(path.join(distDir, `assets/css/${site.id}.css`), css);

  /* js: shared core + template extras */
  const js = [
    await fs.readFile(path.join(shared, 'js/core.js'), 'utf8'),
    ...(await Promise.all(scripts.map((s) => fs.readFile(path.resolve(s), 'utf8')))),
  ].join('\n;\n');
  await write(path.join(distDir, `assets/js/${site.id}.js`), js);

  /* generated imagery */
  await fs.mkdir(path.join(distDir, 'assets/img'), { recursive: true });
  for (const [name, svg] of Object.entries(images)) {
    await write(path.join(distDir, `assets/img/${name}.svg`), svg);
  }
}

export async function writeRoutes(distDir, routes) {
  let count = 0;
  for (const r of routes) {
    const rel = r.path === '' ? 'index.html' : r.path.endsWith('/') ? `${r.path}index.html` : r.path;
    const file = path.join(distDir, rel);
    await write(file, r.html);
    count++;
  }
  return count;
}

export async function build({ root, site, routes, themeCss, scripts, images }) {
  const distDir = path.join(root, 'dist');
  await fs.rm(distDir, { recursive: true, force: true });
  await prepareAssets({ distDir, site, themeCss, scripts, images });
  const n = await writeRoutes(distDir, routes);
  return { distDir, pages: n };
}

export const helpers = { write, esc };
