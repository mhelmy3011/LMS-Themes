/* ==========================================================================
   Build kit: page shell, shared chrome (nav / drawer / footer / switcher),
   asset pipeline and the static writer. Every template uses the same
   semantic markup; only the stylesheet differs.
   ========================================================================== */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { t, localizeMarkup, localizePage, localizeSvg, languageControl, languageHead, runtimeLocale, pendingTranslations, pendingArt } from './i18n.mjs';
import { icon, THEMES, esc } from './ui.mjs';
import { enrichBody, lessonPage, savedPage, artworkPage, educatorPage } from './education-ui.mjs';
import { profile } from './config.mjs';
import data from './data.mjs';
import { educationImageSet, subjectCover } from './education-art.mjs';
import { pricingSheet, typeSpecimen, starterTokens } from './resource-tools.mjs';
import { socialCard } from './social-art.mjs';
import {arabicDocuments,arabicDocumentHtml,verifyArabicDownloads} from './arabic-downloads.mjs';
import { syllabus, resourcePdf, calendar } from './downloads.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const SHARED = path.resolve(HERE, '..');

const write = async (file, content) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  if(typeof content==='string' && /\.(?:html|svg|css|js|json|txt|xml)$/.test(file))content=content.replace(/[\t ]+$/gm,'');
  await fs.writeFile(file, content);
};

/* -------------------------------------------------------------------------- */
/* brand lockup                                                               */
/* -------------------------------------------------------------------------- */
export function brand(site, R, { color = 'navy', size = 'nav', href } = {}) {
  const target = href ?? `${R || './'}`;
  return `<a class="brand brand--${size}" href="${target}" aria-label="${site.fullName} — home">
    <img class="brand__mark" src="${R}assets/brand/wa-icon-${color}-small.svg" alt="" width="34" height="34" decoding="async">
    <span class="brand__word">Web Academy</span>
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
  const hrefFor = href => href.startsWith('#') ? `${R || './'}index.html${href}` : `${R}${href}`;
  const link = (it) => {
    const active = current === it.href ? ' aria-current="page"' : '';
    return `<li class="nav__item"><a class="nav__link" href="${hrefFor(it.href)}"${active}>${it.label}</a></li>`;
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

  const themesBtn = (extraClass = '') => site.demo === false ? '' : `<div class="nav__themes ${extraClass}" data-menu>
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
    <div class="nav__inner container" role="navigation" aria-label="Primary">
      ${isCenter ? `<ul class="nav__links nav__links--start">${leftItems}</ul>${brand(site, R, { color: site.id === 'aero' ? 'white' : 'navy' })}` : `${brand(site, R, { color: site.id === 'aero' ? 'white' : 'navy' })}<ul class="nav__links nav__links--start">${leftItems}</ul>`}
      <div class="nav__end">
        <ul class="nav__links nav__links--end">${rightItems}</ul>
        <div class="nav__actions">
          ${themesBtn()}
          ${languageControl(`${R}ar/${current}`)}
          ${site.loginLabel ? `<a class="btn btn--ghost btn--sm nav__login" href="${R}${site.loginHref || 'contact/'}">${site.loginLabel}</a>` : ''}
          <a class="btn btn--primary btn--sm nav__cta" href="${hrefFor(site.ctaHref)}">${site.ctaLabel}</a>
          <button class="nav__burger" type="button" data-drawer-toggle aria-expanded="false" aria-controls="drawer" aria-label="Open menu">
            ${icon('menu')}
          </button>
        </div>
      </div>
    </div>
    <div class="drawer" id="drawer" data-drawer role="dialog" aria-modal="true" aria-label="Academy navigation" hidden>
      <div class="drawer__head">
        ${brand(site, R, { color: site.id === 'aero' ? 'white' : 'navy' })}
        <button class="drawer__close" type="button" data-drawer-close aria-label="Close menu">${icon('close')}</button>
      </div>
      <nav class="drawer__nav" aria-label="Mobile">
        <ul>${site.nav
          .map(
            (it, i) => `<li><a class="drawer__link" href="${hrefFor(it.href)}"><span class="drawer__num">${String(i + 1).padStart(2, '0')}</span>${it.label}</a>
            ${it.children ? `<ul class="drawer__sub">${it.children.map((c) => `<li><a href="${R}${c.href}">${c.label}</a></li>`).join('')}</ul>` : ''}</li>`
          )
          .join('')}</ul>
        <p class="drawer__label mono">Your learning</p><ul class="drawer__themes"><li><a href="${R}saved/">Saved courses</a></li><li><a href="${R}learn/${data.courses[0].slug}/">Sample classroom</a></li></ul>
        ${site.demo === false ? '' : `<p class="drawer__label mono">Templates</p><ul class="drawer__themes">${THEMES.map((t) => `<li><a href="${R}../../${t.dir}" ${t.id === site.id ? 'aria-current="true"' : ''}>${t.name}<small>${t.temp}</small></a></li>`).join('')}</ul>`}
      </nav>
      <div class="drawer__foot">
        ${languageControl(`${R}ar/${current}`)}
        ${site.loginLabel ? `<a class="btn btn--ghost btn--block" href="${R}${site.loginHref || 'contact/'}">${site.loginLabel}</a>` : ''}
        <a class="btn btn--primary btn--block" href="${hrefFor(site.ctaHref)}">${site.ctaLabel}</a>
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
      <ul class="footer__list">${col.links.map((l) => `<li><a href="${l.href.startsWith('#') ? `${R || './'}index.html${l.href}` : `${R}${l.href}`}">${l.label}</a></li>`).join('')}</ul>
    </div>`
    )
    .join('');

  return `<footer class="footer" id="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          ${brand(site, R, { color: ['atelier','folio'].includes(site.id) ? 'navy' : 'white' })}
          <p class="footer__blurb">${site.footerBlurb}</p>
          <p class="footer__tag mono">// keep looping</p>
        </div>
        ${cols}
        <div class="footer__col footer__col--news">
          <p class="footer__title mono">Stay in the loop</p>
          <p class="small">Try the newsletter form. Demo only—no email is sent.</p>
          <form class="footer__form" data-validate novalidate>
            <label class="sr-only" for="footer-email">Email address</label>
            <div class="field" data-field>
              <input class="input" id="footer-email" name="email" type="email" placeholder="you@work.com" data-rules="required email" data-msg="Enter a valid email address." required aria-describedby="footer-email-err">
              <p class="field__error" id="footer-email-err"></p>
            </div>
            <button class="btn btn--primary btn--sm" type="submit">Subscribe · demo</button>
          </form>
        </div>
      </div>
      <div class="edu-footer-learning"><a href="${R}saved/">${icon('heart')} Saved courses</a><a href="${R}learn/${data.courses[0].slug}/">${icon('play')} Visit the classroom</a>${site.demo === false ? '' : `<a href="${R}artwork/">${icon('sparkle')} Explore the illustration collection</a>`}</div>
      <div class="footer__bottom">
        <p class="meta">© <span data-year>2026</span> Web Academy. A fictional brand used for design demonstration.</p>
        <ul class="footer__legal">
          <li><a href="${R}legal/privacy/">Privacy</a></li>
          <li><a href="${R}legal/terms/">Terms</a></li>
          <li><a href="${R}legal/accessibility/">Accessibility</a></li>
          ${site.demo === false ? '' : `<li><a href="${R}../../index.html">All themes</a></li>`}
        </ul>
        <span class="footer__mark" aria-hidden="true"><img src="${R}assets/brand/wa-mark-${['atelier','folio'].includes(site.id)?'navy':'white'}.svg" alt="" width="18" height="18"></span>
      </div>
    </div>
  </footer>`;
}

/* -------------------------------------------------------------------------- */
/* floating template switcher                                                 */
/* -------------------------------------------------------------------------- */
export function switcher(site, R) {
  if (site.demo === false) return '';
  return `<div class="switcher" data-switcher>
    <div class="switcher__panel" id="switcher-panel" hidden>
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
  const p = profile(site.id);
  site = { ...site, demo: p.demo, fullName: p.name, nav: site.nav.filter(n => p.recruitment || n.href !== 'teach/') };
  if(p.recruitment && !site.nav.some(n=>n.href==='teach/'))site.nav.push({label:'For educators',href:'teach/'});
  body = enrichBody(site, R, pagePath, body);
  const full = title === site.name ? `${site.fullName} — ${site.tagline}` : `${title} · ${site.fullName}`;
  const org = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: site.fullName,
    description: site.tagline,
    slogan: 'Teach the world',
    url: p.baseUrl || 'https://webacademy.example',
    sameAs: [],
  };
  const blocks = [org, ...jsonld].map((j) => `<script type="application/ld+json">${JSON.stringify(j).replaceAll('<','\\u003c')}</script>`).join('\n');

  return `<!doctype html>
<html lang="en" dir="ltr" class="no-js" data-theme="${site.id}" data-site-mode="${p.mode}">
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
<meta property="og:image" content="${p.baseUrl ? esc(p.baseUrl)+'/' : R}assets/brand/og-${site.id}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:type" content="image/png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${R}assets/brand/favicon-${site.id}.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${R}assets/brand/app-icon-${site.id}.png">
<link rel="stylesheet" href="${R}assets/css/${site.id}.css">
<link rel="preload" href="${R}assets/fonts/lexend-latin.woff2" as="font" type="font/woff2" crossorigin>
${p.baseUrl ? `<link rel="canonical" href="${esc(p.baseUrl)}/${pagePath}">` : ''}
${!p.baseUrl || pagePath==='404.html' || /^(styleguide|artwork|saved|learn)\//.test(pagePath) ? '<meta name="robots" content="noindex">' : ''}
${blocks}
</head>
<body class="${bodyClass}" data-page="${site.id}" data-route="${esc(pagePath)}">
<a class="skip-link" href="#main">Skip to content</a>
${progress ? '<div class="progress" data-progress aria-hidden="true"></div>' : ''}
${nav(site, R, { current: pagePath })}
<noscript><aside class="edu-noscript" aria-label="JavaScript-free browsing"><p>Reading, navigation and downloads work without JavaScript. Enable it for filters, forms, saved courses, classroom controls and progress.</p><nav aria-label="Static navigation"><a href="${R}index.html">Home</a><a href="${R}courses/">Courses</a><a href="${R}live/">Sessions</a><a href="${R}library/">Library</a><a href="${R}contact/">Contact</a>${p.demo ? `<a href="${R}../../index.html">All themes</a>` : ''}</nav></aside></noscript>
<main id="main">
${body}
</main>
${footer(site, R)}
${switcher(site, R)}
<div class="edu-toast" data-toast role="status" aria-live="polite"></div>
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
  site = { faviconBg: site.id === 'aero' ? '#001A3D' : '#FFFFFF', faviconInk: site.id === 'aero' ? '#C8F560' : '#012A5D', ogBg: site.id === 'aero' ? '#001A3D' : '#EAF1FB', ogInk: site.id === 'aero' ? '#FFFFFF' : '#012A5D', ogSub: site.id === 'aero' ? '#8DB8FF' : '#14427F', ogTitle: site.tagline, ogKicker: 'LEARN / MAKE / KEEP GROWING', ...site };
  images = { ...images, ...educationImageSet(site.id), ...Object.fromEntries([data.courses[1],data.courses[0],data.courses[7]].map((c,i)=>[`work-${i+1}`,subjectCover(c.track,i,c.project.toUpperCase(),{dark:site.id==='aero',id:`work-${i+1}`})])) };
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

  /* Editable illustrated SVG plus social-crawler/Apple-compatible PNGs. */
  await write(path.join(brandDir, `og-${site.id}.svg`), socialCard(site.id));
  await write(path.join(brandDir, `og-${site.id}-ar.svg`), localizeSvg(socialCard(site.id)));
  for(const name of [`og-${site.id}.png`,`og-${site.id}-ar.png`,`app-icon-${site.id}.png`]){
    const source=path.join(shared,'social',name);
    await fs.copyFile(source,path.join(brandDir,name));
  }

  /* fonts */
  await fs.mkdir(path.join(distDir, 'assets/fonts'), { recursive: true });
  for (const f of ['lexend-latin.woff2', 'jetbrains-mono-latin.woff2', 'OFL-Lexend.txt', 'OFL-JetBrainsMono.txt']) {
    await fs.copyFile(path.join(shared, 'fonts', f), path.join(distDir, 'assets/fonts', f));
  }

  for(const f of ['noto-sans-arabic.woff2','noto-sans-arabic-bold.woff2','OFL-NotoSansArabic.txt'])await fs.copyFile(path.join(shared,'fonts',f),path.join(distDir,'assets/fonts',f));
  await write(path.join(distDir,'assets/css/rtl.css'),await fs.readFile(path.join(shared,'css/rtl.css'),'utf8'));

  /* css: shared base + theme */
  const css = [
    await fs.readFile(path.join(shared, 'css/base.css'), 'utf8'),
    await fs.readFile(themeCss, 'utf8'),
    await fs.readFile(path.join(shared, 'css/education.css'), 'utf8'),
  ].join('\n');
  await write(path.join(distDir, `assets/css/${site.id}.css`), css);

  /* js: shared core + template extras */
  const js = [
    await fs.readFile(path.join(shared, 'js/core.js'), 'utf8'),
    ...(await Promise.all(scripts.map((s) => fs.readFile(path.resolve(s), 'utf8')))),
    await fs.readFile(path.join(shared, 'js/education.js'), 'utf8'),
  ].join('\n;\n');
  await write(path.join(distDir, `assets/js/${site.id}.js`), runtimeLocale(js,'en')+js);
  await write(path.join(distDir, `assets/js/ar/${site.id}.js`), runtimeLocale(js,'ar')+js);

  /* generated imagery */
  await fs.mkdir(path.join(distDir, 'assets/img'), { recursive: true });
  for (const [name, svg] of Object.entries(images)) {
    await write(path.join(distDir, `assets/img/${name}.svg`), svg);
    await write(path.join(distDir, `assets/img/ar/${name}.svg`), localizeSvg(svg));
  }
  await fs.mkdir(path.join(distDir, 'assets/downloads'), { recursive:true });
  await fs.mkdir(path.join(distDir, 'assets/calendar'), { recursive:true });
  await write(path.join(distDir, 'assets/downloads/pricing-calculator.csv'), pricingSheet);
  await write(path.join(distDir, 'assets/downloads/design-tokens.json'), starterTokens);
  await write(path.join(distDir, 'assets/downloads/ar/design-tokens.json'), JSON.stringify(JSON.parse(starterTokens,(key,value)=>key==='$description'?t(value):value),null,2)+'\n');
  const specimenFile=path.join(distDir,'assets/downloads/type-specimen.html'),specimenPeer=path.join(distDir,'assets/downloads/ar/type-specimen.html');
  const specimen=typeSpecimen.replace('</main>',`<nav aria-label="Language">${languageControl('ar/type-specimen.html')}</nav></main>`);
  await write(specimenFile,languageHead(specimen,{file:specimenFile,peer:specimenPeer}));
  let arabicSpecimen=localizePage(specimen,{dist:distDir,file:specimenFile,arabicFile:specimenPeer}).replaceAll('value="Lexend,system-ui,sans-serif"','value="Noto Sans Arabic,system-ui,sans-serif"').replace('خط Lexend المحلي','خط Noto Sans Arabic المحلي').replace(/<p class="note">[\s\S]*?<\/p>/,'<p class="note">٠١٢٣٤٥٦٧٨٩ · أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي</p>');
  await write(specimenPeer,languageHead(arabicSpecimen,{file:specimenPeer,peer:specimenFile,language:'ar'}));
  const csv='\ufeff'+pricingSheet.split('\r\n').map(line=>line.split(',').map(cell=>/^(?:[=\d]|$)/.test(cell)?cell:t(cell)).join(',')).join('\r\n');
  await write(path.join(distDir,'assets/downloads/ar/pricing-calculator.csv'),csv);
  for (const c of data.courses) await write(path.join(distDir, `assets/downloads/syllabus-${c.slug}.pdf`), syllabus(c));
  for (const r of data.resources) await write(path.join(distDir, `assets/downloads/resource-${r.slug}.pdf`), resourcePdf(r));
  for(const document of arabicDocuments())await write(path.join(distDir,`assets/downloads/ar/${document.file}.html`),arabicDocumentHtml(document));
  for(const {file,buffer} of await verifyArabicDownloads())await write(path.join(distDir,'assets/downloads/ar',file),buffer);
  for (const s of data.sessions) await write(path.join(distDir, `assets/calendar/${s.slug}.ics`), calendar([s]));
  await write(path.join(distDir, 'assets/calendar/academy.ics'), calendar(data.sessions));
  for(const s of data.sessions)await write(path.join(distDir,`assets/calendar/ar/${s.slug}.ics`),calendar([s],'ar'));
  await write(path.join(distDir,'assets/calendar/ar/academy.ics'),calendar(data.sessions,'ar'));
  await write(path.join(distDir, 'assets/artwork.json'), JSON.stringify({theme:site.id,license:'Original Web Academy artwork; supplied with these themes.',assets:Object.entries(images).map(([id,svg])=>({id,file:`img/${id}.svg`,bytes:Buffer.byteLength(svg)}))},null,2));
}

export async function writeRoutes(distDir, routes) {
  let count = 0;
  for (const r of routes) {
    const rel = r.path === '' ? 'index.html' : r.path.endsWith('/') ? `${r.path}index.html` : r.path;
    const file = path.join(distDir, rel);
    const html = r.html.replace(/href="([^"\s]*)"/g, (match, url) => {
      if (/^(?:https?:|mailto:|tel:|#|data:)/.test(url)) return match;
      const parts = url.match(/^([^?#]*)(.*)$/);
      return `href="${parts[1].endsWith('/') ? parts[1] + 'index.html' : parts[1] || 'index.html'}${parts[2]}"`;
    });
    const arabic=path.join(distDir,'ar',rel),baseUrl=profile(path.basename(path.dirname(distDir)).split('-')[1]).baseUrl;
    await write(file,languageHead(html,{file,peer:arabic,baseUrl,route:r.path}));
    await write(arabic,languageHead(localizePage(html,{dist:distDir,file}),{file:arabic,peer:file,language:'ar',baseUrl,route:r.path}));
    count++;
  }
  return count;
}

export async function build({ root, site, routes, themeCss, scripts, images }) {
  const distDir = path.join(root, 'dist');
  await fs.rm(distDir, { recursive: true, force: true });
  await prepareAssets({ distDir, site, themeCss, scripts, images });
  const extra = data.courses.map(c => ({ path: `learn/${c.slug}/`, html: page(site, '../../', { path:`learn/${c.slug}/`, title: `Sample lesson · ${c.title}`, desc: c.subtitle, body: lessonPage(c, '../../') }) }));
  if(!routes.some(r=>r.path==='teach/'))extra.push({path:'teach/',html:page(site,'../',{path:'teach/',title:'Share a teaching idea',desc:'An optional journey for practising educators.',body:educatorPage('../')})});
  extra.push({path:'saved/', html:page(site,'../',{path:'saved/',title:'Your saved courses',desc:'Your private, browser-local learning shortlist.',body:savedPage('../')})});
  extra.push({path:'artwork/', html:page(site,'../',{path:'artwork/',title:'The learning illustration collection',desc:'Original educational SVG scenes and assets.',body:artworkPage(site.id,'../')})});
  const allRoutes=[...routes,...extra];
  const n = await writeRoutes(distDir, allRoutes);
  const base=profile(site.id).baseUrl;
  if(base) {
    await write(path.join(distDir,'sitemap.xml'),sitemapXml(base,allRoutes));
    await write(path.join(distDir,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
  }else{
    await fs.rm(path.join(distDir,'sitemap.xml'),{force:true});
    await write(path.join(distDir,'robots.txt'),'User-agent: *\nDisallow: /\n');
  }
  if(process.env.WA_I18N_STRICT&&(pendingTranslations().length||pendingArt().length)){
    if(process.env.WA_I18N_REPORT)await write(path.resolve(SHARED,'../.cache/i18n/build-report.json'),JSON.stringify({missing:pendingTranslations(),art:pendingArt()},null,2)+'\n');
    throw new Error(`Arabic release gaps: ${pendingTranslations().length} text / ${pendingArt().length} art; run WA_I18N_REPORT=1 npm run build`);
  }
  return { distDir, pages: n };
}

export const helpers = { write, esc };

/** Public pages only; both editions advertise their paired canonical URLs. */
export function sitemapXml(base,routes){
  const urls=routes.filter(r=>r.path!=='404.html'&&!/^(styleguide|artwork|saved|learn)\//.test(r.path)).flatMap(r=>['en','ar'].map(language=>{const en=esc(base+'/'+r.path),ar=esc(base+'/ar/'+r.path);return `<url><loc>${language==='ar'?ar:en}</loc><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="ar" href="${ar}"/></url>`;})).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}
