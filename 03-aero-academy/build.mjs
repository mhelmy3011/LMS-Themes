#!/usr/bin/env node
/* 03 · AERO — static build */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from '../shared/lib/site.mjs';
import { imageSet } from '../shared/lib/data.mjs';
import { routes, site } from './src/pages.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const { pages, distDir } = await build({
  root: ROOT,
  site,
  routes: routes(),
  themeCss: path.join(ROOT, 'src/theme.css'),
  scripts: [path.join(ROOT, 'src/aero.js')],
  images: imageSet(),
});
console.log(`Aero: ${pages} pages → ${path.relative(process.cwd(), distDir)}`);
