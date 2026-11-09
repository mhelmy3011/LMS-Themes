#!/usr/bin/env node
/** Optional release helper. Build first; regular builds copy these PNG assets. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL}from'node:url';
import {browserKit,ROOT}from'./browser-kit.mjs';
const {browser}=await browserKit(),context=await browser.newContext({viewport:{width:1200,height:630},deviceScaleFactor:1,reducedMotion:'reduce'}),page=await context.newPage();
const tmp=path.join(ROOT,'.cache/education-qa/social-render.html');await fs.mkdir(path.dirname(tmp),{recursive:true});await fs.mkdir(path.join(ROOT,'shared/social'),{recursive:true});
for(const [id,dir]of [['nova','01-nova-academy'],['atelier','02-atelier-academy'],['aero','03-aero-academy'],['folio','04-folio-landing']])for(const [source,output,width,height]of [[`og-${id}.svg`,`og-${id}.png`,1200,630],[`og-${id}-ar.svg`,`og-${id}-ar.png`,1200,630],[`favicon-${id}.svg`,`app-icon-${id}.png`,180,180]]){
 const svg=await fs.readFile(path.join(ROOT,dir,'dist/assets/brand',source),'utf8');
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>@font-face{font-family:Lexend;src:url('${pathToFileURL(path.join(ROOT,'shared/fonts/lexend-latin.woff2')).href}');font-weight:100 900}*{box-sizing:border-box}html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden}body>svg{display:block;width:100%;height:100%}</style></head><body>${svg}</body></html>`;
 await fs.writeFile(tmp,html);await page.setViewportSize({width,height});await page.goto(pathToFileURL(tmp).href);await page.evaluate(()=>document.fonts.ready);
 const buffer=await page.screenshot({type:'png',omitBackground:true});await fs.writeFile(path.join(ROOT,'shared/social',output),buffer);await fs.writeFile(path.join(ROOT,dir,'dist/assets/brand',output),buffer);console.log(`${output}: ${width}×${height}, ${(buffer.length/1024).toFixed(1)}KB`);
}
await browser.close();
