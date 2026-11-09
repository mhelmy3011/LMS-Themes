#!/usr/bin/env node
/* 01 · NOVA — static build (no dependencies) */
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
  scripts: [path.join(ROOT, 'src/nova.js')],
  images: imageSet(site.id),
});

console.log(`Nova: ${pages} pages → ${path.relative(process.cwd(), distDir)}`);
