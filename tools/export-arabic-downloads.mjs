#!/usr/bin/env node
/** Optional PDF release helper. Chromium handles Arabic shaping, bidi, font
 * subsetting and the tagged-PDF structure. Not needed by ordinary Node builds.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {browserKit,ROOT} from './browser-kit.mjs';
import {arabicDocuments,pdfHtml} from '../shared/lib/arabic-downloads.mjs';
import {pendingTranslations} from '../shared/lib/i18n.mjs';
const documents=arabicDocuments();
if(pendingTranslations().length){console.error(JSON.stringify(pendingTranslations(),null,2));throw new Error('Translate all PDF source text before exporting.');}
const {browser}=await browserKit(),context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
const tmp=path.join(ROOT,'.cache/i18n/arabic-document.html'),out=path.join(ROOT,'shared/downloads/ar');
await fs.mkdir(path.dirname(tmp),{recursive:true});await fs.mkdir(out,{recursive:true});
const manifest={generator:'Chromium / HarfBuzz, tagged PDFs with embedded subset Arabic fonts',documents:[]};
try{
 for(const d of documents){
  await fs.writeFile(tmp,pdfHtml(d));await page.goto(pathToFileURL(tmp).href);await page.evaluate(()=>document.fonts.ready);
  const buffer=await page.pdf({preferCSSPageSize:true,printBackground:true,tagged:true,outline:true});
  const pageCount=(buffer.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
  assert.equal(pageCount,d.sections.length,`${d.file}: unexpected print overflow/pagination; review the printable layout before releasing`);
  await fs.writeFile(path.join(out,d.file+'.pdf'),buffer);
  manifest.documents.push({file:d.file+'.pdf',sourceHash:d.sourceHash,pages:d.sections.length,sha256:createHash('sha256').update(buffer).digest('hex'),bytes:buffer.length});
  console.log(`${d.file}.pdf: ${(buffer.length/1024).toFixed(1)}KB, ${d.sections.length} sections`);
 }
 await fs.writeFile(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
}finally{await browser.close();}
