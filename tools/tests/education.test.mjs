import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { courses, mentors, tracks, sessions, resources, imageSet } from '../../shared/lib/data.mjs';
import { themeSceneNames, scene, spot, spotNames, stateArt, stateNames, portraitArt } from '../../shared/lib/education-art.mjs';
import { syllabus, resourcePdf, resourceSections, calendar, pdfDocument } from '../../shared/lib/downloads.mjs';
import { pricingSheet, typeSpecimen } from '../../shared/lib/resource-tools.mjs';
import { profile } from '../../shared/lib/config.mjs';
import { field, esc } from '../../shared/lib/ui.mjs';
import { writeRoutes } from '../../shared/lib/site.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const themes=['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'];

test('all 287 original route contracts still exist',async()=>{
 const routes=JSON.parse(await fs.readFile(new URL('./original-routes.json',import.meta.url),'utf8'));
 assert.equal(routes.length,287);
 await Promise.all(routes.map(p=>fs.access(path.join(ROOT,p))));
});

test('16 courses have authoritative curriculum, pricing and educator/track counts',()=>{
 assert.equal(courses.length,16);assert.equal(new Set(courses.map(c=>c.slug)).size,16);
 for(const c of courses){
  assert.equal(c.sections.reduce((n,s)=>n+s.lessons.length,0),c.lessonCount,c.slug);
  assert.equal(c.sections.reduce((n,s)=>n+s.minutes.reduce((a,b)=>a+b,0),0),c.duration,c.slug);
  assert.ok(c.sections.every(s=>s.minutes.length===s.lessons.length&&s.minutes.every(n=>n>0)));
  assert.equal(c.free,c.price===0);assert.ok(c.cohortDeposit<=c.cohortPrice);
  assert.equal(c.mentor,mentors.find(m=>m.id===c.mentorId).name);
  assert.ok(tracks.some(t=>t.id===c.track));assert.ok(c.project&&c.requirements.length&&c.outcomes.length);
 }
 for(const m of mentors){const own=courses.filter(c=>c.mentorId===m.id);assert.equal(m.courses,own.length);assert.equal(m.students,own.reduce((n,c)=>n+c.students,0));}
 for(const t of tracks)assert.equal(t.count,courses.filter(c=>c.track===t.id).length);
});

test('session fixtures are truthful, finite and ordered around one build-day anchor',()=>{
 const live=sessions.find(s=>s.status==='live'),anchor=new Date(live.startsAt).getTime()+600000;
 for(const s of sessions){
  assert.ok(s.demo);assert.ok(Number.isFinite(Date.parse(s.startsAt)));assert.ok(s.seatsFilled<=s.seats);
  if(s.status==='upcoming')assert.ok(Date.parse(s.startsAt)>anchor);
  if(s.status==='ended')assert.ok(Date.parse(s.startsAt)<anchor);
  assert.ok(s.agenda.length>=4);assert.ok(s.durationMin>0);
 }
});

function assertSvg(svg){
 assert.match(svg,/^<svg\b/);assert.match(svg,/<title\b/);assert.match(svg,/<desc\b/);
 assert.doesNotMatch(svg,/<(?:script|image|foreignObject)\b|data:image|href="https?:/i);
 const ids=[...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 const refs=[...svg.matchAll(/url\(#([^)]*)\)|aria-labelledby="([^"]+)"/g)].flatMap(m=>m[1]?[m[1]]:m[2].split(' '));
 for(const id of refs)assert.ok(ids.includes(id),`Missing SVG reference: ${id}`);
}
const geometry=svg=>svg.replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/\b(?:id|aria-labelledby)="[^"]*"/g,'');

test('16 signatures, 12 spots, 8 states and 8 portraits are distinct editable accessible vectors',()=>{
 const signatures=Object.values(themeSceneNames).flat().map(k=>scene(k));assert.equal(signatures.length,16);
 const spots=spotNames.map(k=>spot(k)),states=stateNames.map(k=>stateArt(k)),portraits=mentors.map((m,i)=>portraitArt(m.id,i));
 assert.equal(spots.length,12);assert.equal(states.length,8);assert.equal(portraits.length,8);
 for(const set of [signatures,spots,states,portraits]){assert.equal(new Set(set.map(geometry)).size,set.length);set.forEach(assertSvg);}
 const first=scene('nova',{id:'first-instance'}),second=scene('nova',{id:'second-instance'});
 const ids=[...`${first}${second}`.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
});

test('every course has its own subject-specific vector cover in every theme',()=>{
 for(const theme of Object.keys(themeSceneNames)){
  const images=imageSet(theme),covers=courses.map(c=>images[c.art]);assert.equal(new Set(covers.map(geometry)).size,16);
  for(const svg of covers)assertSvg(svg);
 }
});

function verifyPdf(buffer,pages){
 const pdf=buffer.toString('ascii');assert.ok(pdf.startsWith('%PDF-1.4'));assert.match(pdf,new RegExp(`/Count ${pages}\\b`));
 const xref=Number(pdf.match(/startxref\n(\d+)/)[1]);assert.equal(pdf.slice(xref,xref+4),'xref');
 const entries=pdf.slice(xref).match(/\d{10} 00000 n /g);assert.ok(entries.length>pages);
 entries.forEach((entry,i)=>assert.ok(pdf.slice(Number(entry.slice(0,10))).startsWith(`${i+1} 0 obj`)));
 assert.ok(pdf.endsWith('%%EOF\n'));return pdf;
}

test('all real syllabus/workbook PDFs have correct page trees and byte-accurate cross references',()=>{
 for(const c of courses){const pdf=verifyPdf(syllabus(c),3);assert.ok(pdf.includes(String(c.lessonCount)+' lessons'));assert.ok(pdf.includes('The curriculum'));}
 for(const r of resources){verifyPdf(resourcePdf(r),4);assert.equal(resourceSections(r).length,4);}
 verifyPdf(pdfDocument('A test (with \\ escapes)',[{title:'Escapes',lines:['Round (brackets), backslash \\ and café.']}]),1);
});

test('calendars are RFC 5545 CRLF text, UTF-8 byte-folded and match the session dates/durations',()=>{
 const ics=calendar(sessions);assert.equal((ics.match(/BEGIN:VEVENT/g)||[]).length,10);
 assert.ok(ics.startsWith('BEGIN:VCALENDAR\r\n'));assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
 assert.doesNotMatch(ics.replaceAll('\r\n',''),/\n/);
 for(const line of ics.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
 const unfolded=ics.replaceAll('\r\n ','');
 for(const s of sessions){assert.ok(unfolded.includes(`UID:${s.id}@webacademy.example`));assert.ok(unfolded.includes(new Date(s.startsAt).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')));}
 const weird=calendar([{...sessions[0],title:'قصة; English, \\ test\n'+'curiosity '.repeat(30)}]);
 for(const line of weird.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);
 assert.ok(weird.includes('\\;'));assert.ok(weird.includes('\\,'));assert.ok(weird.includes('\\n'));
});

test('forms emit real required selects/textareas and safely escape option data',()=>{
 const select=field({id:'course',label:'Course',tag:'select',rules:'required',options:[{value:'a"b',label:'<em>Plain</em>'}]});
 assert.match(select,/<select[^>]* required/);assert.match(select,/<option value="">/);assert.ok(select.includes('value="a&quot;b"'));assert.ok(select.includes('&lt;em&gt;Plain&lt;/em&gt;'));
 const textarea=field({id:'motivation',label:'Why',type:'textarea',rules:'required',minLength:200,maxLength:1200});
 assert.match(textarea,/<textarea/);assert.match(textarea,/minlength="200"/);assert.match(textarea,/maxlength="1200"/);assert.doesNotMatch(textarea,/type="textarea"/);
 assert.equal(esc('<script>"&'), '&lt;script&gt;&quot;&amp;');
});

test('presentation presets keep recruitment opt-in and default Folio to creator',()=>{
 const keys=['WA_PRESET','WA_STANDALONE','WA_SITE_NAME','WA_CREATOR_NAME','WA_SITE_URL','WA_RECRUITMENT'];const before=Object.fromEntries(keys.map(k=>[k,process.env[k]]));
 try{
  keys.forEach(k=>delete process.env[k]);assert.equal(profile('folio').mode,'creator');assert.equal(profile('nova').mode,'academy');assert.equal(profile('aero').recruitment,false);
  process.env.WA_PRESET='creator';process.env.WA_RECRUITMENT='1';process.env.WA_STANDALONE='1';process.env.WA_SITE_URL='https://example.com/';
  assert.equal(profile('atelier').mode,'creator');assert.ok(profile('aero').recruitment);assert.equal(profile('nova').demo,false);assert.equal(profile('nova').baseUrl,'https://example.com');
 }finally{for(const k of keys)before[k]===undefined?delete process.env[k]:process.env[k]=before[k];}
});

test('directory, query and fragment destinations are direct-file compatible',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'lms-route-test-'));
 try{
  await writeRoutes(dir,[{path:'',html:'<a href="courses/?q=type#results">Course</a><a href="../">Up</a><a href="#lesson">Lesson</a><a href="https://example.com/">External</a>'}]);
  const html=await fs.readFile(path.join(dir,'index.html'),'utf8');assert.ok(html.includes('href="courses/index.html?q=type#results"'));assert.ok(html.includes('href="../index.html"'));assert.ok(html.includes('href="#lesson"'));assert.ok(html.includes('href="https://example.com/"'));
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});

test('resource tools are genuinely editable, local and free of remote scripts',()=>{
 assert.ok(pricingSheet.includes('=SUM(B3:B5)'));assert.ok(pricingSheet.includes('=B2*B6'));
 assert.match(typeSpecimen,/<textarea/);assert.match(typeSpecimen,/window.print|\bprint\(/);assert.doesNotMatch(typeSpecimen,/<script\b[^>]*src="https?:/);
});

test('the family hub links to existing documentation and theme entries',async()=>{
 const html=await fs.readFile(path.join(ROOT,'index.html'),'utf8');assert.equal((html.match(/<h1\b/g)||[]).length,1);
 const hrefs=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(p=>!p.startsWith('#')&&!p.startsWith('http'));
 for(const p of hrefs)await fs.access(path.resolve(ROOT,p));
 for(const theme of themes)assert.ok(hrefs.includes(`${theme}/dist/index.html`));
});
