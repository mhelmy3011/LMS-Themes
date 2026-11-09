#!/usr/bin/env node
/** Optional release helper. Normal builds read the checked-in outline atlas.
 * Install fonttools[woff], uharfbuzz and python-bidi; see docs/I18N.md.
 * Shape logical Arabic/bidi runs, never reverse letters or embed a font per SVG.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ROOT} from './browser-kit.mjs';
import {t,decode} from '../shared/lib/i18n.mjs';
import {socialCard} from '../shared/lib/social-art.mjs';
const labels=new Map();
function collect(svg){
 for(const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)){
  const source=decode(m[2].replace(/<[^>]*>/g,'')),label=t(source);
  if(!label.trim())continue;
  if(!labels.has(label))labels.set(label,{text:label,sources:[]});
  const spacing=parseFloat(m[1].match(/letter-spacing="([^"]*)"/)?.[1]||'0');
  const size=parseFloat(m[1].match(/font-size="([^"]*)"/)?.[1]||'14');
  labels.get(label).sources.push({text:source,spacing:spacing/size});
 }
}
for(const dir of ['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing']){
 for(const f of await fs.readdir(path.join(ROOT,dir,'dist/assets/img')))if(f.endsWith('.svg'))collect(await fs.readFile(path.join(ROOT,dir,'dist/assets/img',f),'utf8'));
 // Inline scene labels use the same drawing helper, but include a few UI-only labels.
 async function walk(dir){for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.name==='assets'||e.name==='ar')continue;const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.name.endsWith('.html'))collect(await fs.readFile(p,'utf8'));}}
 await walk(path.join(ROOT,dir,'dist'));
 collect(socialCard(dir.split('-')[1]));
}
const tmp=path.join(ROOT,'.cache/i18n/art-labels.json');await fs.mkdir(path.dirname(tmp),{recursive:true});await fs.writeFile(tmp,JSON.stringify([...labels.values()]));
const env={...process.env};if(!env.PYTHONPATH)env.PYTHONPATH=path.join(ROOT,'.cache/i18n/python');
const run=spawnSync(process.env.PYTHON||'python',['tools/shape-arabic-art.py',tmp,'shared/fonts/noto-sans-arabic-art.woff2','shared/locales/ar-art-labels.json'],{cwd:ROOT,env,stdio:'inherit'});
if(run.status!==0)throw new Error('Arabic outline generation failed. Install the optional Python release tools.');
console.log(`Arabic atlas: ${labels.size} pre-shaped vector labels.`);
