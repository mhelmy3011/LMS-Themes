import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {t,localizeMarkup,localizePage,localizeSvg,languageControl,languageHead,runtimeLocale,pendingTranslations,pendingArt} from '../../shared/lib/i18n.mjs';
import {scene} from '../../shared/lib/education-art.mjs';
import {sitemapXml} from '../../shared/lib/site.mjs';
import {calendar} from '../../shared/lib/downloads.mjs';
import {arabicDocuments,verifyArabicDownloads} from '../../shared/lib/arabic-downloads.mjs';
import {sessions} from '../../shared/lib/data.mjs';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));

test('Arabic catalogue translates complete copy, punctuation variants and parameterized facts',()=>{
 assert.equal(t('Courses'),'الدورات');assert.equal(t(' I’ve tried the exercise '),'جرّبت التمرين');
 assert.match(t('16 courses across six tracks'),/١٦/);assert.match(t('8 lessons | 144 minutes | Intermediate | Live and self-paced'),/٨ دروس/);
 assert.match(t('Save Designing interfaces that scale'),/^حفظ .*واجهات/);assert.match(t('Sample lesson · Designing interfaces that scale'),/^درس تجريبي/);
 assert.equal(t('hello@webacademy.example'),'hello@webacademy.example');assert.equal(t('https://example.com/file.pdf'),'https://example.com/file.pdf');
});

test('build localisation protects code, identifiers, machine values and script JSON',()=>{
 const html='<html lang="en" dir="ltr"><head><style>.x{color:#012A5D}</style><script type="application/ld+json">{"@type":"Course","name":"Designing interfaces that scale","url":"https://example.com/"}</script></head><body><h1>Courses</h1><select id="course" name="course"><option value="Beginner">Beginner</option></select><input type="email" data-rules="required email" data-msg="Enter a valid email address." placeholder="you@work.com"><pre><code>const title = "Courses";</code></pre><script>const title="Courses";</script></body></html>';
 const ar=localizeMarkup(html);assert.match(ar,/lang="ar" dir="rtl"/);assert.match(ar,/<h1>الدورات<\/h1>/);assert.match(ar,/value="Beginner">مبتدئ/);assert.match(ar,/data-rules="required email"/);assert.match(ar,/type="email"[^>]*dir="ltr"/);assert.match(ar,/const title = "Courses";/);assert.match(ar,/<script>const title="Courses";<\/script>/);assert.match(ar,/color:#012A5D/);const schema=JSON.parse(ar.match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.match(schema.name,/واجهات/);assert.equal(schema.url,'https://example.com/');
});

test('locale peers retain deep routes, share assets, localize cross-theme links and avoid ar/ar',()=>{
 const dist=path.join(ROOT,'01-nova-academy/dist'),file=path.join(dist,'courses/example/index.html');
 const html=`<html lang="en" dir="ltr"><head><meta name="viewport" content="width=device-width"><link rel="preload" href="../../assets/fonts/lexend-latin.woff2"></head><body>${languageControl('../../ar/courses/example/index.html')}<a href="../../courses/index.html?q=type#main">Courses</a><a href="../../../../02-atelier-academy/dist/index.html">Atelier</a><a href="../../../../index.html">All themes</a><img src="../../assets/img/edu-nova.svg" alt=""><script src="../../assets/js/nova.js" defer></script></body></html>`;
 const ar=localizePage(html,{dist,file});assert.match(ar,/href="\.\.\/\.\.\/\.\.\/courses\/example\/index.html\?lang=en"/);assert.match(ar,/href="\.\.\/index.html\?q=type#main"/);assert.match(ar,/02-atelier-academy\/dist\/ar\/index.html/);assert.match(ar,/ar\/index.html/);assert.match(ar,/assets\/img\/ar\/edu-nova.svg/);assert.match(ar,/assets\/js\/ar\/nova.js/);assert.match(ar,/fonts\/noto-sans-arabic.woff2/);assert.doesNotMatch(ar,/ar\/ar\//);
});

test('early preference boot can read its peer and Arabic canonical/schema metadata use Arabic URLs',()=>{
 const file=path.join(ROOT,'01-nova-academy/dist/ar/courses/example/index.html'),peer=file.replace('/ar/','/');
 const input='<html lang="ar" dir="rtl"><head><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="x.css"><link rel="canonical" href="https://example.com/learning/courses/example/"><script type="application/ld+json">{"@type":"Course","url":"https://example.com/learning/courses/example/"}</script></head><body></body></html>';
 const html=languageHead(input,{file,peer,language:'ar',baseUrl:'https://example.com/learning',route:'courses/example/'});assert.ok(html.indexOf('wa-locale-peer')<html.indexOf('data-language-boot'));assert.ok(html.indexOf('data-language-boot')<html.indexOf('rel="stylesheet"'));assert.match(html,/rel="canonical" href="https:\/\/example.com\/learning\/ar\/courses\/example\/"/);assert.match(html,/og:locale" content="ar_EG"/);const schema=JSON.parse(html.match(/application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.equal(schema.inLanguage,'ar');assert.equal(schema.url,'https://example.com/learning/ar/courses/example/');
});

test('only explicit fixed runtime messages are shipped; formatting works without DOM scanning',()=>{
 const source="tr('Choose an answer first.'); tr('Show {count} more courses'); tr(\"That’s right.\");";
 const runtime=runtimeLocale(source,'ar'),sandbox={window:{},document:{documentElement:{lang:'ar'},addEventListener(){}}};vm.runInNewContext(runtime,sandbox);assert.equal(sandbox.window.WAI18n.t('Choose an answer first.'),'اختر إجابة أولًا.');assert.equal(sandbox.window.WAI18n.t('Show {count} more courses',{count:'٤'}),'اعرض ٤ دورات إضافية');assert.equal(sandbox.window.WAI18n.number(12),'١٢');assert.match(sandbox.window.WAI18n.currency(560),/[٠-٩]/);const english={window:{},document:{documentElement:{lang:'en'},addEventListener(){}}};vm.runInNewContext(runtimeLocale(source,'en'),english);assert.equal(english.window.WAI18n.currency(560),'$560');assert.ok(runtime.length<3000);assert.doesNotMatch(runtime,/MutationObserver|fetch\(|ar\.json/);
});

test('Arabic artwork uses compact reusable shaped glyphs with instance-safe IDs and no image fonts',async()=>{
 const atlas=JSON.parse(await fs.readFile(new URL('../../shared/locales/ar-art-labels.json',import.meta.url),'utf8'));assert.ok(Object.keys(atlas.labels).length>=240);assert.ok(Object.keys(atlas.glyphs).length<200);assert.ok(JSON.stringify(atlas).length<200000);
 const one=localizeSvg(scene('nova',{id:'arabic-one'})),two=localizeSvg(scene('nova',{id:'arabic-two'}));assert.doesNotMatch(one,/<text\b|@font-face|data:font/);assert.match(one,/edu-svg-label/);const ids=[...`${one}${two}`.matchAll(/\bid="([^"]*)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);for(const[,id]of one.matchAll(/<use href="#([^"]*)"/g))assert.ok(ids.includes(id));assert.deepEqual(pendingArt(),[]);
});

test('Arabic calendars preserve event identity and exact instants with UTF-8 byte folding',()=>{
 const en=calendar(sessions),ar=calendar(sessions,'ar');for(const field of ['UID','DTSTART','DTEND'])assert.deepEqual([...ar.matchAll(new RegExp(`^${field}:(.*)$`,'gm'))].map(m=>m[1]),[...en.matchAll(new RegExp(`^${field}:(.*)$`,'gm'))].map(m=>m[1]));for(const line of ar.split('\r\n'))assert.ok(Buffer.byteLength(line)<=75);assert.match(ar,/SUMMARY:[^\r]*[\u0600-\u06ff]/);assert.match(ar.replaceAll('\r\n ',''),/حدث تجريبي/);
});

test('both presets and optional recruitment are covered in all four Arabic themes',async()=>{
 const names=['WA_PRESET','WA_RECRUITMENT','WA_SITE_NAME','WA_CREATOR_NAME','WA_SITE_URL','WA_STANDALONE'],before=Object.fromEntries(names.map(k=>[k,process.env[k]]));
 try{names.forEach(k=>delete process.env[k]);for(const dir of ['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'])for(const preset of ['academy','creator']){process.env.WA_PRESET=preset;process.env.WA_RECRUITMENT='1';const {routes}=await import(new URL(`../../${dir}/src/pages.mjs?i18n=${preset}`,import.meta.url));const home=routes().find(r=>!r.path).html;const dist=path.join(ROOT,dir,'dist'),ar=localizePage(home,{dist,file:path.join(dist,'index.html')});assert.match(ar,/lang="ar" dir="rtl"/);assert.match(ar,/data-language-switch="en"/);assert.match(ar,/<h1[^>]*>[\s\S]*?[\u0600-\u06ff]/);}
 assert.deepEqual(pendingTranslations(),[]);
 }finally{for(const key of names)before[key]===undefined?delete process.env[key]:process.env[key]=before[key];}
});

test('the Arabic PDF release gate rejects missing, stale, duplicated and corrupt assets',async()=>{
 const releases=await verifyArabicDownloads();assert.equal(releases.length,28);
 const documents=arabicDocuments().slice(0,1),record=JSON.parse(await fs.readFile(new URL('../../shared/downloads/ar/manifest.json',import.meta.url),'utf8')).documents[0];
 await fs.mkdir(path.join(ROOT,'.cache'),{recursive:true});
 const directory=await fs.mkdtemp(path.join(ROOT,'.cache/arabic-release-test-'));
 const manifest=records=>fs.writeFile(path.join(directory,'manifest.json'),JSON.stringify({documents:records}));
 try{
  await assert.rejects(verifyArabicDownloads(directory,documents),/missing or invalid manifest/);
  await manifest([record]);await assert.rejects(verifyArabicDownloads(directory,documents),/missing or unexpected PDF/);
  await fs.writeFile(path.join(directory,record.file),releases[0].buffer);assert.equal((await verifyArabicDownloads(directory,documents)).length,1);
  await manifest([{...record,sourceHash:'stale'}]);await assert.rejects(verifyArabicDownloads(directory,documents),/stale source/);
  await manifest([record,record]);await assert.rejects(verifyArabicDownloads(directory,documents),/exact document set/);
  await manifest([record]);await fs.appendFile(path.join(directory,record.file),'corrupt');await assert.rejects(verifyArabicDownloads(directory,documents),/invalid bytes\/hash/);
 }finally{await fs.rm(directory,{recursive:true,force:true});}
});

test('Aero countdown preserves the English abbreviation and localizes Arabic digits',async()=>{
 const source=await fs.readFile(new URL('../../03-aero-academy/src/aero.js',import.meta.url),'utf8');
 for(const language of ['en','ar']){
  const output={textContent:''},target=new Date(Date.now()+3*86400000).toISOString(),root={getAttribute:()=>target};
  const document={documentElement:{lang:language},addEventListener(){},visibilityState:'visible',fonts:{ready:Promise.resolve()}};
  const sandbox={document,window:{},setInterval(){},Date,URLSearchParams,location:{search:''}};
  vm.runInNewContext(runtimeLocale(source,language),sandbox);
  sandbox.window.WA={reduce:{matches:true},$:selector=>selector==='[data-countdown-value]'?output:null,$$:selector=>selector==='[data-countdown]'?[root]:[]};
  vm.runInNewContext(source,sandbox);
  assert.match(output.textContent,language==='ar'?/^[٠-٩]+ي [٠-٩]{2}:[٠-٩]{2}$/:/^\d+d \d{2}:\d{2}$/);assert.ok(!output.textContent.includes('days short'));
 }
});


test('public sitemaps pair both languages and exclude demo utilities',()=>{
 const xml=sitemapXml('https://example.com/learning',[{path:''},{path:'courses/example/'},{path:'404.html'},...['styleguide','artwork','saved','learn/example'].map(p=>({path:p+'/'}))]);
 assert.equal((xml.match(/<url>/g)||[]).length,4);assert.match(xml,/<loc>https:\/\/example.com\/learning\/ar\/courses\/example\/<\/loc>/);assert.equal((xml.match(/hreflang="en"/g)||[]).length,4);assert.equal((xml.match(/hreflang="ar"/g)||[]).length,4);assert.doesNotMatch(xml,/404|styleguide|artwork|saved|learn\/example|ar\/ar/);
});

test('all four themes localize deep canonical, alternate, social and schema metadata under a base path',async()=>{
 const names=['WA_SITE_URL','WA_STANDALONE','WA_PRESET','WA_SITE_NAME','WA_CREATOR_NAME','WA_RECRUITMENT'],before=Object.fromEntries(names.map(k=>[k,process.env[k]]));
 try{
  names.forEach(k=>delete process.env[k]);process.env.WA_SITE_URL='https://example.com/learning';process.env.WA_STANDALONE='1';
  for(const dir of ['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing']){
   const {routes}=await import(new URL(`../../${dir}/src/pages.mjs?metadata`,import.meta.url)),dist=path.join(ROOT,dir,'dist');
   for(const route of routes()){
    const rel=!route.path?'index.html':route.path.endsWith('/')?route.path+'index.html':route.path,file=path.join(dist,rel),arabic=path.join(dist,'ar',rel);
    const html=languageHead(localizePage(route.html,{dist,file}),{file:arabic,peer:file,language:'ar',baseUrl:'https://example.com/learning',route:route.path});
    assert.ok(html.includes(`rel="canonical" href="https://example.com/learning/ar/${route.path}"`),`${dir}/${route.path}`);
    assert.ok(html.includes(`hreflang="en" href="https://example.com/learning/${route.path}"`));assert.ok(html.includes(`hreflang="ar" href="https://example.com/learning/ar/${route.path}"`));
    assert.match(html,new RegExp(`og:image" content="https://example.com/learning/assets/brand/og-${dir.split('-')[1]}-ar.png"`));assert.doesNotMatch(html,/learning\/ar\/ar\//);if(route.path==='404.html')assert.match(html,/<meta name="robots" content="noindex">/);
    for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){const schema=JSON.parse(match[1]);if(/Course|Article|WebPage/.test(schema['@type']))assert.equal(schema.inLanguage,'ar');}
   }
  }
  assert.deepEqual(pendingTranslations(),[]);
 }finally{for(const key of names)before[key]===undefined?delete process.env[key]:process.env[key]=before[key];}
});
