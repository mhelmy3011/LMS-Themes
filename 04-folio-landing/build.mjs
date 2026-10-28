#!/usr/bin/env node
/* 04 · FOLIO — static build */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../shared/lib/site.mjs';
import { imageSet } from '../shared/lib/data.mjs';
import { routes, site, images } from './src/pages.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const { pages, distDir } = await build({
  root: ROOT,
  site,
  routes: routes(),
  themeCss: path.join(ROOT, 'src/theme.css'),
  scripts: [path.join(ROOT, 'src/folio.js')],
  images: { ...imageSet(), ...images },
});
console.log(`Folio: ${pages} pages → ${path.relative(process.cwd(), distDir)}`);
