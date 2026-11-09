#!/usr/bin/env node
/* Build every template in order, then print one summary line per template. */
import path from 'node:path';
import fs from 'node:fs/promises';
import {pendingTranslations,pendingArt} from './shared/lib/i18n.mjs';
import { fileURLToPath } from 'node:url';
import { build } from './shared/lib/site.mjs';
import { writeHub } from './shared/lib/hub.mjs';
import { imageSet } from './shared/lib/data.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATES = [
  { dir: '01-nova-academy', js: 'nova.js' },
  { dir: '02-atelier-academy', js: 'atelier.js' },
  { dir: '03-aero-academy', js: 'aero.js' },
  { dir: '04-folio-landing', js: 'folio.js' },
];

const builds=[];
for (const t of TEMPLATES) {
  const here = path.join(ROOT, t.dir);
  const { site, routes, images } = await import(path.join(here, 'src/pages.mjs'));
  const { pages } = await build({
    root: here,
    site,
    routes: routes(),
    themeCss: path.join(here, 'src/theme.css'),
    scripts: [path.join(here, `src/${t.js}`)],
    images: { ...imageSet(site.id), ...(images || {}) },
  });
  builds.push({site,dir:t.dir,pages});
  console.log(`${site.name.padEnd(8)} ${String(pages).padStart(3)} pages → ${t.dir}/dist`);
}
await writeHub(ROOT,builds);
if(process.env.WA_I18N_REPORT){await fs.mkdir(path.join(ROOT,'.cache/i18n'),{recursive:true});await fs.writeFile(path.join(ROOT,'.cache/i18n/build-report.json'),JSON.stringify({missing:pendingTranslations(),art:pendingArt()},null,2));}
if(process.env.WA_I18N_STRICT&&(pendingTranslations().length||pendingArt().length))throw new Error(`Arabic release gaps: ${pendingTranslations().length} text / ${pendingArt().length} art; run WA_I18N_REPORT=1 npm run build`);
console.log('\nOpen index.html in a browser — every template runs from file://');
