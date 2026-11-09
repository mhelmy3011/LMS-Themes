#!/usr/bin/env node
/** Repeated, bilingual Chromium lab observations; not Lighthouse or field CWV.
 * Run without another browser audit competing for CPU/network resources.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {browserKit,ROOT} from './browser-kit.mjs';
const BASE=process.env.WA_TEST_URL||'http://127.0.0.1:4173/';
const languages=(process.env.WA_PERF_LANGUAGES||'en,ar').split(',');
assert.ok(languages.every(l=>['en','ar'].includes(l)),'WA_PERF_LANGUAGES=en,ar');
const themes=['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'].filter(dir=>!process.env.WA_PERF_THEMES||process.env.WA_PERF_THEMES.split(',').includes(dir.split('-')[1]));assert.ok(themes.length,'WA_PERF_THEMES must name at least one theme');
const runCount=Number(process.env.WA_PERF_RUNS||3);assert.ok(Number.isInteger(runCount)&&runCount>0&&runCount<=10);
const {browser}=await browserKit();
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'no-preference'}),page=await context.newPage();
const cdp=await context.newCDPSession(page);
await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8,connectionType:'cellular4g'});
let transferred=0,bodyBytes=0,responses=[];
cdp.on('Network.loadingFinished',e=>transferred+=e.encodedDataLength);
cdp.on('Network.responseReceived',e=>{const h=e.response.headers,bytes=Number(h['content-length']||h['Content-Length'])||0;bodyBytes+=bytes;responses.push({url:new URL(e.response.url).pathname,bytes,encoding:h['content-encoding']||h['Content-Encoding']||'identity',fromCache:e.response.fromDiskCache||e.response.fromServiceWorker||false});});
await page.addInitScript(()=>{
 window.__lab={lcp:0,lcpElement:'',lcpText:'',lcpSize:0,cls:0,longTaskBlocking:0};let session=0,start=0,last=0;
 new PerformanceObserver(list=>list.getEntries().forEach(e=>{window.__lab.lcp=e.startTime;window.__lab.lcpSize=e.size;window.__lab.lcpElement=e.element?e.element.tagName.toLowerCase()+'.'+(typeof e.element.className==='string'?e.element.className:'svg'):'';window.__lab.lcpText=e.element?.textContent.trim().slice(0,120)||'';})).observe({type:'largest-contentful-paint',buffered:true});
 new PerformanceObserver(list=>list.getEntries().forEach(e=>{if(e.hadRecentInput)return;if(e.startTime-last>1000||e.startTime-start>5000){session=e.value;start=e.startTime;}else session+=e.value;last=e.startTime;window.__lab.cls=Math.max(window.__lab.cls,session);})).observe({type:'layout-shift',buffered:true});
 new PerformanceObserver(list=>list.getEntries().forEach(e=>window.__lab.longTaskBlocking+=Math.max(0,e.duration-50))).observe({type:'longtask',buffered:true});
});
const report={conditions:{browser:browser.version(),viewport:'390×844',deviceScaleFactor:1,cpuSlowdown:4,rttMs:150,downloadMbps:1.6,uploadKbps:750,cache:'HTTP cache disabled and cleared, origin storage cleared; shared warm browser process',server:'local preview with gzip',runsPerThemeAndLanguage:runCount,languages,motion:'enabled, system no-preference',observation:'load + font readiness + 1500ms; no user interaction or scrolling',bytes:'CDP content-length sum of fetched response bodies; excludes HTTP headers. Network.loadingFinished may report zero in bundled Chromium; zero is recorded as null, never as a zero-byte page.',caveat:'Sandbox Chromium lab samples, not Lighthouse certification, real-device results, field CWV or measured INP.'},runs:[]};
try{
 for(const dir of themes)for(const language of languages)for(let i=0;i<runCount;i++){
  await page.goto('about:blank');await cdp.send('Network.clearBrowserCache');await cdp.send('Storage.clearDataForOrigin',{origin:new URL(BASE).origin,storageTypes:'all'});
  transferred=0;bodyBytes=0;responses=[];
  const response=await page.goto(`${BASE}${dir}/dist/${language==='ar'?'ar/':''}index.html?lang=${language}`,{waitUntil:'load'});assert.equal(response.status(),200);
  await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
  const metrics=await page.evaluate(()=>{const heading=document.querySelector('h1'),r=heading.getBoundingClientRect();let visible=r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;for(let n=heading;n;n=n.parentElement){const s=getComputedStyle(n);if(Number(s.opacity)===0||s.visibility==='hidden'||s.display==='none')visible=false;}return {...window.__lab,language:document.documentElement.lang,headingVisible:visible,headingText:heading.textContent.trim(),fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,resources:performance.getEntriesByType('resource').length,domReady:performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd};});
  assert.equal(metrics.language,language);assert.ok(metrics.lcp>0&&metrics.fcp>0,'Missing paint evidence');assert.ok(metrics.headingVisible,'Hero heading must actually be painted');assert.ok(bodyBytes>0,'Missing response byte evidence');assert.ok(!responses.some(r=>r.fromCache),'Unexpected cached response');
  report.runs.push({theme:dir.split('-')[1],run:i+1,...metrics,encodedTransferBytes:transferred||null,compressedResponseBodyBytes:bodyBytes,responses});console.log(JSON.stringify({...report.runs.at(-1),responses:undefined}));
 }
 const median=values=>[...values].sort((a,b)=>a-b)[Math.floor(values.length/2)];
 report.summary=[...new Set(report.runs.map(r=>r.theme+'/'+r.language))].map(key=>{const[theme,language]=key.split('/'),runs=report.runs.filter(r=>r.theme===theme&&r.language===language);return{theme,language,lcpMedianMs:Math.round(median(runs.map(r=>r.lcp))),lcpRangeMs:runs.map(r=>Math.round(r.lcp)),clsMedian:Number(median(runs.map(r=>r.cls)).toFixed(4)),clsMax:Number(Math.max(...runs.map(r=>r.cls)).toFixed(4)),responseBodyMedianKB:+(median(runs.map(r=>r.compressedResponseBodyBytes))/1024).toFixed(1),observedBlockingMedianMs:Math.round(median(runs.map(r=>r.longTaskBlocking)))};});
 await fs.mkdir(path.join(ROOT,'.cache/education-qa'),{recursive:true});await fs.writeFile(path.join(ROOT,'.cache/education-qa/performance.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.summary,null,2));
 if(report.summary.some(r=>r.lcpMedianMs>1800||r.clsMax>.05))process.exitCode=1;
}finally{await browser.close();}
