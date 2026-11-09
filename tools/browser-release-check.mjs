#!/usr/bin/env node
/** Optional final release smoke: native Arabic downloads, HTTP media types,
 * actual font registration, forced-color focus, locale controls and metadata.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {browserKit,ROOT} from './browser-kit.mjs';
import {courses} from '../shared/lib/data.mjs';
const BASE=process.env.WA_TEST_URL||'http://127.0.0.1:4173/';
const {browser}=await browserKit(),context=await browser.newContext({viewport:{width:320,height:740},reducedMotion:'reduce',forcedColors:'active'}),page=await context.newPage();
const report={checks:[],errors:[],externalRequests:[]};
page.on('pageerror',e=>report.errors.push(e.message));page.on('request',r=>{if(new URL(r.url()).origin!==new URL(BASE).origin)report.externalRequests.push(r.url());});
async function check(name,fn){try{await fn();report.checks.push({name,pass:true});}catch(e){console.error('FAIL',name,e.message);report.checks.push({name,pass:false,error:e.stack});}}
async function go(url){const r=await page.goto(url,{waitUntil:'load'});assert.equal(r.status(),200);await page.evaluate(()=>document.fonts.ready);}
async function focusCheck(language){
 const locale=page.locator('[data-language-switch]').first();await locale.focus();
 const m=await page.evaluate(()=>{const control=document.activeElement,s=getComputedStyle(control),r=control.getBoundingClientRect(),font=document.documentElement.lang==='ar'?'Noto Sans Arabic':'Lexend';return{lang:document.documentElement.lang,dir:document.documentElement.dir,width:document.documentElement.scrollWidth,viewport:innerWidth,forced:matchMedia('(forced-colors: active)').matches,focus:s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>=2,rect:{l:r.left,r:r.right,w:r.width,h:r.height},font:[...document.fonts].some(f=>f.family.replaceAll('"','')===font&&f.status==='loaded')};});
 assert.equal(m.lang,language);assert.equal(m.dir,language==='ar'?'rtl':'ltr');assert.ok(m.width<=m.viewport+1);assert.ok(m.forced&&m.focus&&m.font);assert.ok(m.rect.w>=44&&m.rect.h>=44&&m.rect.l>=0&&m.rect.r<=m.viewport+1);
 assert.equal(await locale.getAttribute('hreflang'),language==='ar'?'en':'ar');
}
const themes=['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'];
const manifest=JSON.parse(await fs.readFile(path.join(ROOT,'shared/downloads/ar/manifest.json'),'utf8'));
try{
 for(const dir of themes){const id=dir.split('-')[1],base=BASE+dir+'/dist/';
  for(const language of ['en','ar'])await check(`${id} ${language} actual local font, 44px language link and forced-color focus`,async()=>{await go(base+(language==='ar'?'ar/':'')+'index.html?lang='+language);await focusCheck(language);const url=new URL(await page.locator('meta[property="og:image"]').getAttribute('content'),page.url());assert.ok(url.pathname.endsWith(`og-${id}${language==='ar'?'-ar':''}.png`));const image=await context.request.get(url.href);assert.equal(image.status(),200);assert.match(image.headers()['content-type'],/image\/png/);const bytes=await image.body();assert.equal(bytes.subarray(1,4).toString(),'PNG');assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);});
  await check(`${id} native Arabic PDF download matches the release hash and opens its HTML alternative`,async()=>{
   await go(base+`ar/courses/${courses[0].slug}/index.html?lang=ar`);const expected=manifest.documents.find(d=>d.file===`syllabus-${courses[0].slug}.pdf`),link=page.locator('a[download][href$=".pdf"]').first(),href=await link.getAttribute('href'),response=await context.request.get(new URL(href,page.url()).href);assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/application\/pdf/);
   const pending=page.waitForEvent('download');await link.click();const download=await pending;assert.equal(download.suggestedFilename(),expected.file);const buffer=await fs.readFile(await download.path());assert.equal(createHash('sha256').update(buffer).digest('hex'),expected.sha256);
   await page.locator('a.edu-pdf-transcript').first().click();await page.waitForURL('**/assets/downloads/ar/syllabus-*.html');assert.equal(await page.locator('html').getAttribute('lang'),'ar');assert.ok((await page.locator('main').innerText()).length>200);assert.ok(await page.locator('a[lang=en]').isVisible());
  });
  await check(`${id} localized CSV, token JSON and calendar are served in the right formats`,async()=>{
   const csv=await context.request.get(base+'assets/downloads/ar/pricing-calculator.csv');assert.equal(csv.status(),200);assert.match(csv.headers()['content-type'],/text\/csv/);assert.equal((await csv.body()).subarray(0,3).toString('hex'),'efbbbf');assert.ok((await csv.text()).includes('=B2*B6'));
   const json=await context.request.get(base+'assets/downloads/ar/design-tokens.json');assert.equal(json.status(),200);assert.match(json.headers()['content-type'],/application\/json/);const tokens=await json.json();assert.equal(tokens.color.ink.$value,'#012A5D');assert.match(tokens.color.ink.$description,/[\u0600-\u06ff]/);
   const cal=await context.request.get(base+'assets/calendar/ar/academy.ics');assert.equal(cal.status(),200);assert.match(cal.headers()['content-type'],/text\/calendar/);assert.equal(((await cal.text()).match(/BEGIN:VEVENT/g)||[]).length,10);assert.match(await cal.text(),/SUMMARY:[^\r]*[\u0600-\u06ff]/);
  });
 }
 for(const language of ['en','ar'])await check(`${language} hub has a usable forced-color language control and real font`,async()=>{await go(BASE+(language==='ar'?'ar/':'')+'index.html?lang='+language);await focusCheck(language);});
}finally{await browser.close();}
report.summary={checks:report.checks.length,failed:report.checks.filter(c=>!c.pass).length,runtimeErrors:report.errors.length,externalRequests:report.externalRequests.length};await fs.mkdir(path.join(ROOT,'.cache/education-qa'),{recursive:true});await fs.writeFile(path.join(ROOT,'.cache/education-qa/release-smoke.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.summary,null,2));if(report.summary.failed||report.summary.runtimeErrors||report.summary.externalRequests)process.exitCode=1;
