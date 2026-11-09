/** Arabic PDF input and readable HTML companion. Browser export is optional;
 * normal static builds copy the checked-in, shaped/font-embedded PDF releases.
 */
import fs from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import data from './data.mjs';
import {syllabusSections,resourceSections} from './downloads.mjs';
import {t} from './i18n.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
// Stable across checkouts: hash font bytes and printable HTML using relative
// URLs, not the absolute file:// URLs used only by the optional exporter.
const fontHash=createHash('sha256');
for(const name of ['noto-sans-arabic.woff2','noto-sans-arabic-bold.woff2'])fontHash.update(readFileSync(new URL(`../fonts/${name}`,import.meta.url)));
const fontFingerprint=fontHash.digest('hex');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function arabicDocuments(){
 return [...data.courses.map(c=>({file:`syllabus-${c.slug}`,title:t(c.title),sections:syllabusSections(c)})),...data.resources.map(r=>({file:`resource-${r.slug}`,title:t(r.title),sections:resourceSections(r)}))].map(d=>{
  const document={...d,sections:d.sections.map(s=>({title:t(s.title),lines:s.lines.map(t)}))};
  return {...document,sourceHash:createHash('sha256').update(JSON.stringify(document)).update(arabicDocumentHtml(document,{fontBase:'fonts/',pdf:true})).update(fontFingerprint).digest('hex')};
 });
}
export function arabicDocumentHtml(document,{fontBase='../../fonts/',pdf=false}={}){
 const heading='أكاديمية الويب / المكتبة العملية';
 const paragraphs=lines=>lines.map(line=>/^_+$/.test(line)?'<div class="writing-space" aria-hidden="true"></div>':`<p>${esc(line).replace(/_{5,}/g,'<span class="writing-line" aria-hidden="true"></span>')}</p>`).join('');
 const font=name=>esc(fontBase+name);
 return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(document.title)} — أكاديمية الويب</title><style>
@font-face{font-family:Arabic;src:url('${font('noto-sans-arabic.woff2')}') format('woff2');font-weight:400;font-display:block}@font-face{font-family:Arabic;src:url('${font('noto-sans-arabic-bold.woff2')}') format('woff2');font-weight:700;font-display:block}*{box-sizing:border-box}body{margin:0;background:#eaf1fb;color:#012a5d;font-family:Arabic,system-ui,sans-serif;line-height:1.85}main{max-width:210mm;margin:auto}.sheet{position:relative;min-height:260mm;padding:12mm 14mm 17mm;background:white;margin:8mm 0;break-after:page}.sheet:last-child{break-after:auto}header{border-block-end:2mm solid #c8f560;padding-block-end:5mm;margin-block-end:6mm}header p{font-size:9pt;margin:0 0 3mm}h1{font-size:19pt;line-height:1.5;margin:0;font-weight:700}h2{font-size:13pt;line-height:1.6;margin:0 0 5mm}p{font-size:10pt;line-height:1.85;margin:0 0 3mm;overflow-wrap:anywhere;break-inside:avoid}.writing-space{height:11mm;border-block-end:.2mm solid #8db8ff;margin-block:3mm}.writing-line{display:inline-block;inline-size:60%;border-block-end:.2mm solid #8db8ff;vertical-align:baseline}footer{position:absolute;inset-inline:14mm;inset-block-end:5mm;border-block-start:.2mm solid #8db8ff;display:flex;justify-content:space-between;gap:4mm;padding-block-start:2mm}footer p{font-size:7pt;margin:0}nav{max-width:210mm;margin:8mm auto;display:flex;gap:20px;padding:16px;flex-wrap:wrap}a,button{color:inherit;min-height:44px;display:inline-flex;align-items:center;padding:8px 16px;border:1px solid #012a5d;background:#fff;border-radius:8px;font:inherit;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid #012a5d;outline-offset:4px}@page{size:A4;margin:10mm 0}@media print{body{background:#fff}.sheet{height:277mm;min-height:0;margin:0;padding-block-start:5mm}nav{display:none}}@media(max-width:600px){.sheet{min-height:0;padding:24px 20px 80px;margin:16px}.sheet footer{inset-inline:20px}h1{font-size:1.5rem}p{font-size:.9rem}}
</style></head><body>${pdf?'':`<nav aria-label="خيارات المستند"><a href="${document.file}.pdf" download>تنزيل PDF بالعربية</a><a href="../${document.file}.pdf" lang="en" dir="ltr">English PDF</a><button type="button" onclick="window.print()">طباعة</button></nav>`}<main>${document.sections.map((section,i)=>`<section class="sheet" aria-labelledby="section-${i}"><header><p>${heading}</p>${i===0?`<h1>${esc(document.title)}</h1>`:`<p class="document-title">${esc(document.title)}</p>`}</header><h2 id="section-${i}">${esc(section.title)}</h2>${paragraphs(section.lines)}<footer><p>مادة تعليمية تجريبية. ليست اعتمادًا مهنيًا أو خدمة خارجية.</p><p>${new Intl.NumberFormat('ar-EG').format(i+1)} / ${new Intl.NumberFormat('ar-EG').format(document.sections.length)}</p></footer></section>`).join('')}</main></body></html>`;
}
export function pdfHtml(document){return arabicDocumentHtml(document,{fontBase:pathToFileURL(path.join(ROOT,'shared/fonts/')).href,pdf:true});}

/** Fail closed instead of silently shipping missing, stale or corrupt PDFs.
 * Exporting is optional; the checked-in release is mandatory for normal builds.
 */
export async function verifyArabicDownloads(directory=path.join(ROOT,'shared/downloads/ar'),documents=arabicDocuments()){
 const fail=detail=>new Error(`Arabic PDF release: ${detail}. Run npm run downloads:arabic, then rebuild.`);
 let manifest;
 try{manifest=JSON.parse(await fs.readFile(path.join(directory,'manifest.json'),'utf8'));}
 catch{throw fail('missing or invalid manifest');}
 const expected=new Set(documents.map(d=>d.file+'.pdf'));
 if(!Array.isArray(manifest.documents)||manifest.documents.length!==expected.size||new Set(manifest.documents.map(r=>r.file)).size!==expected.size||manifest.documents.some(r=>!expected.has(r.file)))throw fail('manifest does not contain the exact document set');
 const names=(await fs.readdir(directory)).filter(n=>n.endsWith('.pdf'));
 if(names.length!==expected.size||names.some(n=>!expected.has(n)))throw fail('missing or unexpected PDF files');
 const releases=[];
 for(const document of documents){
  const file=document.file+'.pdf',record=manifest.documents.find(r=>r.file===file);
  if(record.sourceHash!==document.sourceHash||record.pages!==document.sections.length)throw fail(`stale source for ${file}`);
  let buffer;try{buffer=await fs.readFile(path.join(directory,file));}catch{throw fail(`missing ${file}`);}
  if(buffer.subarray(0,5).toString()!=='%PDF-'||record.bytes!==buffer.length||createHash('sha256').update(buffer).digest('hex')!==record.sha256)throw fail(`invalid bytes/hash for ${file}`);
  releases.push({file,buffer});
 }
 return releases;
}
