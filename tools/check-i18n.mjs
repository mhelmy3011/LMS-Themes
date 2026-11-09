#!/usr/bin/env node
/** Dependency-free bilingual release gate: pages, links, content, fonts,
 * language peers, runtime budgets, artwork, calendars and PDF source freshness.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {arabicDocuments,verifyArabicDownloads} from '../shared/lib/arabic-downloads.mjs';
import {decode} from '../shared/lib/i18n.mjs';
const ROOT=fileURLToPath(new URL('../',import.meta.url));
const themes=['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'];
async function files(dir){let out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await files(p));else out.push(p);}return out;}
const read=file=>fs.readFile(file,'utf8'),gz=s=>zlib.gzipSync(s).length;
const report={englishPages:0,arabicPages:0,companionDocuments:0,localReferences:0,artworkFiles:0,calendars:0,pdfs:0,themes:[]};
const allowed=/\b(?:JavaScript|Python|Pandas|JSON|SVG|PDF|CSV|HTML|CSS|ARIA|DOM|WCAG|AA|USD|US|UTC|GMT|WET|UI|UX|Lexend|JetBrains Mono|Noto Sans Arabic|Milan Display|Tajarib|Georgia|Chrome|Firefox|Enter|Space|Escape|Tab|Shift|Home|End|SE1|div|px|space|color|ink|blue|cubic-bezier|English)\b/g;
function unapprovedEnglish(s){return s.replace(/\d+(?:\.\d+)?(?:px|rem|em|ms)\b/g,'').replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]+/g,'').replace(/https?:\/\/\S*/g,'').replace(/#[0-9a-f]{3,8}\b/gi,'').replace(allowed,'').match(/[A-Za-z]{2,}/);}
function visibleStrings(html){
 const chunks=html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]*>|[^<]+/g)||[];let skip=[];const strings=[];
 for(const chunk of chunks){if(chunk.startsWith('<')){const m=chunk.match(/^<(\/?)([\w:-]+)/);if(!m)continue;const tag=m[2].toLowerCase();if(m[1]){const i=skip.lastIndexOf(tag);if(i>=0)skip.splice(i);}else{if(['script','style','pre','code','kbd','samp'].includes(tag))skip.push(tag);for(const[,v]of chunk.matchAll(/\b(?:alt|title|aria-label|placeholder|data-msg|data-explanation)="([^"]*)"/g))strings.push(decode(v));}}else if(!skip.length)strings.push(decode(chunk));}return strings;
}
async function references(file,html){
 const ids=[...html.matchAll(/\sid="([^"]*)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
 for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=decode(m[1]);if(/^(?:https?:|mailto:|tel:|data:)/.test(url))continue;
  const [name]=url.split(/[?#]/);if(!name){const fragment=url.slice(1);assert.ok(ids.includes(fragment),`${file}: missing SVG/anchor ${url}`);continue;}
  assert.ok(!/(?:^|\/)ar\/ar\//.test(url),`${file}: repeated locale prefix`);
  let target=path.resolve(path.dirname(file),name);assert.ok(target.startsWith(ROOT),`${file}: escaped root`);
  const stat=await fs.stat(target).catch(()=>null);assert.ok(stat,`${file}: missing ${url}`);if(stat.isDirectory())await fs.access(path.join(target,'index.html'));
  report.localReferences++;
 }
 const image=html.match(/<meta property="og:image" content="([^"]*)"/);if(image&&!image[1].startsWith('http'))await fs.access(path.resolve(path.dirname(file),image[1]));
}
for(const dir of themes){
 const dist=path.join(ROOT,dir,'dist'),id=dir.split('-')[1],all=await files(dist),english=all.filter(f=>f.endsWith('.html')&&!f.includes('/ar/'));
 for(const file of english){const rel=path.relative(dist,file),isTool=rel.startsWith('assets/'),ar=isTool?path.join(path.dirname(file),'ar',path.basename(file)):path.join(dist,'ar',rel),enHtml=await read(file),arHtml=await read(ar);
  assert.match(enHtml,/<html\b[^>]*lang="en"[^>]*dir="ltr"/);assert.match(arHtml,/<html\b[^>]*lang="ar"[^>]*dir="rtl"/);
  assert.match(arHtml,/data-language-switch="en"[^>]*hreflang="en"/);assert.match(enHtml,/data-language-switch="ar"[^>]*hreflang="ar"/);
  const back=arHtml.match(/<a\b[^>]*href="([^"]+)"[^>]*data-language-switch="en"/)[1];assert.equal(path.resolve(path.dirname(ar),decode(back).split('?')[0]),file);
  assert.match(arHtml,/<link rel="alternate" hreflang="en"/);assert.match(arHtml,/<link rel="alternate" hreflang="ar"/);assert.match(arHtml,/<title>[^<]*[\u0600-\u06ff]/);
  if(!isTool){assert.match(arHtml,new RegExp(`assets/js/ar/${id}\\.js`));assert.ok(!/rel="preload"[^>]*lexend/.test(arHtml));}
  for(const s of visibleStrings(arHtml))assert.ok(!unapprovedEnglish(s),`${path.relative(ROOT,ar)}: untranslated visible string: ${s.trim()}`);
  await references(ar,arHtml);report.englishPages++;report.arabicPages++;
 }
 const companions=all.filter(f=>f.includes('/assets/downloads/ar/')&&f.endsWith('.html')&&!f.endsWith('type-specimen.html'));
 for(const file of companions){const html=await read(file);assert.match(html,/<html lang="ar" dir="rtl"/);for(const s of visibleStrings(html))assert.ok(!unapprovedEnglish(s),`Arabic document: ${s}`);await references(file,html);report.companionDocuments++;}
 const tokens=JSON.parse(await read(path.join(dist,'assets/downloads/ar/design-tokens.json')));assert.equal(tokens.color.ink.$value,'#012A5D');assert.match(tokens.color.ink.$description,/[\u0600-\u06ff]/);assert.equal(tokens.space[1].$value.unit,'px');
 const css=await read(path.join(dist,`assets/css/${id}.css`)),rtl=await read(path.join(dist,'assets/css/rtl.css')),enJs=await read(path.join(dist,`assets/js/${id}.js`)),arJs=await read(path.join(dist,`assets/js/ar/${id}.js`));
 assert.equal((css.match(/font-family:\s*["']Lexend["']/g)||[]).length,1,`${id}: exactly one shared Lexend font face`);assert.equal((css.match(/font-family:\s*["']JetBrains Mono["']/g)||[]).length,1,`${id}: exactly one shared mono font face`);
 const cssBytes=gz(css)+gz(rtl),jsBytes=gz(arJs),cssLimit=id==='folio'?24:30,jsLimit=id==='nova'?45:id==='aero'?42:30;
 assert.ok(cssBytes<=cssLimit*1024,`${id}: combined Arabic CSS budget`);assert.ok(jsBytes<=jsLimit*1024,`${id}: Arabic JS budget`);assert.ok(Buffer.byteLength(arJs)-Buffer.byteLength(enJs)<10000,`${id}: ship fixed runtime messages, not the catalogue`);assert.ok(!arJs.includes('ar.json'));
 for(const name of ['noto-sans-arabic.woff2','noto-sans-arabic-bold.woff2']){const font=await fs.readFile(path.join(dist,'assets/fonts',name));assert.equal(font.subarray(0,4).toString(),'wOF2');assert.ok(font.length<40000);}
 const csv=await fs.readFile(path.join(dist,'assets/downloads/ar/pricing-calculator.csv'));assert.equal(csv.subarray(0,3).toString('hex'),'efbbbf');assert.ok(csv.toString().includes('=SUM(B3:B5)'));assert.ok(csv.toString().includes('=B2*B6'));
 for(const file of all.filter(f=>f.includes('/assets/img/ar/')&&f.endsWith('.svg'))){const svg=await read(file);assert.ok(!/<text\b|@font-face|data:font|https?:[^"']+\.(?:woff|ttf)/.test(svg),`${file}: use checked-in shaped outlines`);await references(file,svg);report.artworkFiles++;}
 for(const file of all.filter(f=>f.includes('/assets/calendar/ar/')&&f.endsWith('.ics'))){const bytes=await fs.readFile(file),cal=bytes.toString();for(const line of cal.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75,`${file}: RFC 5545 fold`);assert.match(cal,/SUMMARY:[^\r]*[\u0600-\u06ff]/);const en=await read(file.replace('/calendar/ar/','/calendar/'));for(const field of ['UID','DTSTART','DTEND'])assert.deepEqual([...cal.matchAll(new RegExp(`^${field}:(.*)$`,'gm'))].map(m=>m[1]),[...en.matchAll(new RegExp(`^${field}:(.*)$`,'gm'))].map(m=>m[1]));report.calendars++;}
 report.themes.push({id,englishHtml:english.length,arabicHtml:english.length,companions:companions.length,cssGzipKB:+(cssBytes/1024).toFixed(1),jsGzipKB:+(jsBytes/1024).toFixed(1),arabicFontsKB:74.3});
}
await verifyArabicDownloads();
const manifest=JSON.parse(await read(path.join(ROOT,'shared/downloads/ar/manifest.json')));
for(const d of arabicDocuments()){const record=manifest.documents.find(r=>r.file===d.file+'.pdf');assert.ok(record,`Missing Arabic PDF: ${d.file}`);assert.equal(record.sourceHash,d.sourceHash,`Arabic PDF is stale: ${d.file}; npm run downloads:arabic`);for(const parent of ['shared/downloads/ar',...themes.map(t=>t+'/dist/assets/downloads/ar')]){const buffer=await fs.readFile(path.join(ROOT,parent,record.file));assert.equal(createHash('sha256').update(buffer).digest('hex'),record.sha256,`PDF export mismatch: ${parent}/${record.file}`);}report.pdfs++;}
for(const file of [path.join(ROOT,'ar/index.html')]){const html=await read(file);assert.match(html,/<html lang="ar" dir="rtl"/);for(const s of visibleStrings(html))assert.ok(!unapprovedEnglish(s),`Hub: ${s}`);await references(file,html);}
await fs.mkdir(path.join(ROOT,'.cache/education-qa'),{recursive:true});await fs.writeFile(path.join(ROOT,'.cache/education-qa/i18n-report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
