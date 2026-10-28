#!/usr/bin/env node
/* Build every template in order, then print one summary line per template. */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './shared/lib/site.mjs';
import { imageSet } from './shared/lib/data.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATES = [
  { dir: '01-nova-academy', js: 'nova.js' },
  { dir: '02-atelier-academy', js: 'atelier.js' },
  { dir: '03-aero-academy', js: 'aero.js' },
  { dir: '04-folio-landing', js: 'folio.js' },
];

for (const t of TEMPLATES) {
  const here = path.join(ROOT, t.dir);
  const { site, routes, images } = await import(path.join(here, 'src/pages.mjs'));
  const { pages } = await build({
    root: here,
    site,
    routes: routes(),
    themeCss: path.join(here, 'src/theme.css'),
    scripts: [path.join(here, `src/${t.js}`)],
    images: { ...imageSet(), ...(images || {}) },
  });
  console.log(`${site.name.padEnd(8)} ${String(pages).padStart(3)} pages → ${t.dir}/dist`);
}
console.log('\nOpen index.html in a browser — every template runs from file://');
