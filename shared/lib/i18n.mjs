/** Build-time English/Arabic localisation. No translation service or client DOM scan. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath}from'node:url';
const ROOT=fileURLToPath(new URL('../../',import.meta.url));
const dictionary=JSON.parse(fs.readFileSync(new URL('../locales/ar.json',import.meta.url),'utf8'));
const atlas=JSON.parse(fs.readFileSync(new URL('../locales/ar-art-labels.json',import.meta.url),'utf8'));
const labelAtlas=atlas.labels||atlas;
let svgSequence=0;
const normal=s=>String(s).replace(/\u00a0/g,' ').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/\s+/g,' ').trim();
const index=new Map(Object.entries(dictionary).map(([en,ar])=>[normal(en).toLowerCase(),ar]));
const cache=new Map(),missing=new Map(),artMissing=new Set();
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export const decode=s=>s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp|mdash|ndash|rsquo|lsquo|ldquo|rdquo|hellip|copy);/gi,(_,e)=>e[0]==='#'?String.fromCodePoint(e[1].toLowerCase()==='x'?parseInt(e.slice(2),16):Number(e.slice(1))):({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',mdash:'—',ndash:'–',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”',hellip:'…',copy:'©'})[e.toLowerCase()]);
const quoted=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const phrases=[...index.keys()].filter(k=>/[a-z]/.test(k)).sort((a,b)=>b.length-a.length);
const replacements=phrases.length?new RegExp(`(?<![\\p{L}\\p{N}_])(?:${phrases.map(quoted).join('|')})(?![\\p{L}\\p{N}_])`,'giu'):null;
const technical=/\b(?:HTML|CSS|ARIA|DOM|Pandas|div|JavaScript|Python|JSON|SVG|PDF|CSV|UI|UX|UI\/UX|Figma|WCAG|AA|USD|US|US\$|UTC|GMT|Lexend|JetBrains Mono|Noto Sans Arabic|Arial|Georgia|Chrome|Chromium|Safari|Firefox|Cairo|WebP|AVIF|Node\.js|INP|LCP|CLS|TBT|RTL|LTR|API|Git|GitHub|WebGL|Blender|RGB|CMYK|px|rem|em|ms|kb|mb|woff2|Escape|Enter|Space|Tab|Shift|Home|End|Ctrl|Alt|Backspace|Delete)\b/gi;
const isCode=s=>/^[\w.+-]+@[\w.-]+\.[a-z]+$/i.test(s)||/^(?:https?:\/\/|www\.|print\(|#[\da-f]{3,8}$|[\w.-]+\.(?:svg|json|html|csv|ics|pdf)$)/i.test(s)||/^[A-Z]{1,3}$/.test(s)&&['W','WA','Aa','Bb','Cc','Dd','Ee','Ff','Gg'].includes(s);
const lettersRemain=s=>s.replace(technical,'').replace(/\b(?:Aa|Bb|Cc|Dd|Ee|Ff|Gg|Hh|Ii|Jj|Kk|Ll|Mm|Nn|Oo|Pp|Qq|Rr|Ss|Tt|Uu|Vv|Ww|Xx|Yy|Zz)\b/g,'').match(/[A-Za-z]{2,}/);
const number=n=>new Intl.NumberFormat('ar-EG',{maximumFractionDigits:2,useGrouping:false}).format(Number(String(n).replaceAll(',','')));
function formatParts(s){
 if(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{1,2} [A-Z][a-z]{2} \d{4} [\d:]+ GMT$/.test(s))return new Intl.DateTimeFormat('ar-EG',{dateStyle:'long',timeStyle:'short',timeZone:'UTC'}).format(new Date(s))+' UTC';
 const patterns=[
  [/^\$(\d+) in this illustrative catalogue\. Preview the lesson now, or practise the enrolment flow below\. No payment or email is sent\.$/,m=>`${number(m[1])} دولارًا أمريكيًا في هذا الفهرس التوضيحي. عاين الدرس الآن أو جرّب خطوات التسجيل أدناه. لا يحدث دفع أو إرسال بريد.`],
  [/^([\d,]+) alumni$/i,m=>`${number(m[1])} خريجًا ضمن المحتوى التوضيحي`],
  [/^(\d+) left$/i,m=>`${number(m[1])} مقاعد متبقية`],
  [/^(\d+(?:\.\d+)?) out of 5$/i,m=>`${number(m[1])} من ٥`],
  [/^(.*?) - cohort(?: · Web Academy)?$/i,m=>`${t(m[1])} — دفعة تعليمية${m[0].includes('Web Academy')?' · أكاديمية الويب':''}`],
  [/^(.*?) · Web Academy$/i,m=>`${t(m[1])} · أكاديمية الويب`],
  [/^(\d+)h (\d+)m of material$/i,m=>`${number(m[1])} س و${number(m[2])} د من المحتوى`],
  [/^(\d+)m of material$/i,m=>`${number(m[1])} د من المحتوى`],
  [/^A six-week cohort starting (.*)\.$/i,m=>`دفعة لستة أسابيع تبدأ في ${new Intl.DateTimeFormat('ar-EG',{dateStyle:'long',timeZone:'UTC'}).format(new Date(m[1]))}.`],
  [/^(.*?) \u00b7 (.*)$/i,m=>t(m[1])+' · '+t(m[2])],
  [/^(\d+) of (\d+) left$/i,m=>`تبقّى ${number(m[1])} من ${number(m[2])} مقعدًا`],
  [/^(\d+) (?:students enrolled|ratings)$/i,m=>`${number(m[1])} ${m[0].endsWith('ratings')?'تقييمًا':'متعلمًا ضمن النموذج'}`],
  [/^Illustrative deposit \$(.*)$/i,m=>`عربون توضيحي: ${number(m[1])} دولارًا أمريكيًا`],
  [/^\$(.*?) to hold a seat, refundable for seven days\.$/i,m=>`عربون توضيحي لحجز مقعد: ${number(m[1])} دولارًا أمريكيًا، قابل للاسترداد لسبعة أيام ضمن نموذج السياسة.`],
  [/^\$(.*?), including all materials and the critique rubric\.$/i,m=>`${number(m[1])} دولارًا أمريكيًا، تشمل المواد ومعايير المراجعة ضمن الأسعار التوضيحية.`],
  [/^\$(\d+)\/mo$/i,m=>`${number(m[1])} دولارًا أمريكيًا / شهريًا`],
  [/^(.*?)\. (It is written to be used,.*|The document is laid out to be printed,.*)$/i,m=>t(m[1]+'.')+' '+t(m[2])],
  [/^A (\d+)-lesson (.+) course with ([^.]+)\. (Every lesson ends.*)$/i,m=>`دورة في ${t(m[2])} من ${number(m[1])} دروس مع ${t(m[3])}. ${t(m[4])}`],
  [/^Anyone working in or around (.+)'s field, from first-year to principal\. No cohort membership required\.$/i,m=>`لمن يعمل في مجال ${t(m[1])} أو قريبًا منه، من المبتدئ إلى الخبير. لا يلزم الاشتراك في دفعة.`],
  [/^Example project artwork for (.*)$/i,m=>`رسم توضيحي لمشروع دورة ${t(m[1])}`],
  [/^An original educational illustration representing (.+)\.$/i,m=>`رسم تعليمي أصلي يوضّح ${t(m[1])}.`],
  [/^An original illustration for the (.+) interface state\.$/i,m=>`رسم أصلي لحالة ${t(m[1])} في الواجهة.`],
  [/^(.+) learning state$/i,m=>`حالة تعلّم: ${t(m[1])}`],
  [/^A subject-specific learning illustration for (.+)\.$/i,m=>`رسم تعليمي خاص بمجال ${t(m[1])}.`],
  [/^(On air|Design|Engineering|Motion|Teaching|Business|Visual craft) · (.*)$/i,m=>`${t(m[1])} · ${t(m[2])}`],
  [/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept?|Oct|Nov|Dec) (\d{4})$/i,m=>new Intl.DateTimeFormat('ar-EG',{dateStyle:'long',timeZone:'UTC'}).format(new Date(m[0]))],
  [/^(\d+) min read$/i,m=>`قراءة في ${number(m[1])} دقائق`],
  [/^deposit \$(.*)$/i,m=>`عربون توضيحي ${t('$'+m[1])}`],
  [/^(.*?) \| (.*)$/i,m=>t(m[1])+' | '+t(m[2])],
  [/^Your instructor: (.+)$/i,m=>`مدرّسك: ${t(m[1])}`],
  [/^The project: (.+)$/i,m=>`المشروع: ${t(m[1])}`],
  [/^Who this is for: (.+)$/i,m=>`لمن هذه الدورة: ${t(m[1])}`],
  [/^Make: (.+)$/i,m=>`أنجز: ${t(m[1])}`],
  [/^Save (.+)$/i,m=>`حفظ ${t(m[1])}`],[/^Remove (.+) from saved courses$/i,m=>`إزالة ${t(m[1])} من الدورات المحفوظة`],
  [/^Download (.+)$/i,m=>`تنزيل ${t(m[1])}`],[/^Level: (.+)$/i,m=>`المستوى: ${t(m[1])}`],
  [/^Sample lesson [·:] (.+)$/i,m=>`درس تجريبي · ${t(m[1])}`],
  [/^A (\d+)-lesson (.+) course with (.+)\.$/i,m=>`دورة في ${t(m[2])} من ${number(m[1])} دروس مع ${t(m[3])}.`],
  [/^(\d+) courses across six tracks$/i,m=>`${number(m[1])} دورة ضمن ستة مسارات`],
  [/^(\d+) lessons$/i,m=>`${number(m[1])} دروس`],[/^(\d+) courses$/i,m=>`${number(m[1])} دورات`],
  [/^(\d+) pages$/i,m=>`${number(m[1])} صفحات`],[/^(\d+) min(?:utes)?$/i,m=>`${number(m[1])} دقيقة`],
  [/^(\d+) weeks$/i,m=>`${number(m[1])} أسابيع`],[/^(\d+) seats$/i,m=>`${number(m[1])} مقاعد`],
  [/^(\d+) of (\d+) seats$/i,m=>`${number(m[1])} من ${number(m[2])} مقعدًا`],
  [/^Showing (\d+) of (\d+) courses\.?$/i,m=>`عرض ${number(m[1])} من ${number(m[2])} دورة`],
  [/^(\d+)h(?: (\d+)m)?$/i,m=>`${number(m[1])} س${m[2]?' '+number(m[2])+' د':''}`],
  [/^([\d,]+) learners$/i,m=>`${number(m[1])} متعلمًا`],
  [/^\$(\d+(?:,\d{3})*(?:\.\d+)?)$/,m=>new Intl.NumberFormat('ar-EG',{style:'currency',currency:'USD',minimumFractionDigits:Number(m[1].replaceAll(',',''))%1?2:0,maximumFractionDigits:2}).format(Number(m[1].replaceAll(',','')))],
 ];for(const [re,fn]of patterns){const m=s.match(re);if(m)return fn(m);}
 return null;
}
export function t(value){
 const text=normal(value);if(!text)return String(value);if(cache.has(text))return cache.get(text);
 let result=index.get(text.toLowerCase());
 if(!result){result=formatParts(text);}
 if(!result&&/[.!]$/.test(text)){const key=text.slice(0,-1).toLowerCase();if(index.has(key))result=index.get(key)+text.at(-1);}
 if(!result&&/^\d+\. /.test(text)){const m=text.match(/^(\d+)\. (.*)$/);result=number(m[1])+'. '+t(m[2]);}
 if(!result&&/^(?:Explore|Portrait of):? /.test(text)){const m=text.match(/^(Explore|Portrait of):? (.*)$/);result=(m[1]==='Explore'?'استكشف: ':'صورة توضيحية لـ ')+t(m[2]);}
 if(!result&&isCode(text))result=text;
 if(!result&&/^[\d\s.,:%+()\-\/|★]+$/.test(text))result=text.replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
 if(!result){
  result=replacements?text.replace(replacements,match=>index.get(normal(match).toLowerCase())):text;
  result=result.replace(/\b(\d+)\s*(hours?|mins?|minutes?|weeks?|lessons?|courses?|pages?|seats?)\b/gi,(_,n,u)=>number(n)+' '+({hour:'ساعة',hours:'ساعات',min:'دقيقة',mins:'دقائق',minute:'دقيقة',minutes:'دقائق',week:'أسبوع',weeks:'أسابيع',lesson:'درس',lessons:'دروس',course:'دورة',courses:'دورات',page:'صفحة',pages:'صفحات',seat:'مقعد',seats:'مقاعد'})[u.toLowerCase()]);
 }
 if(lettersRemain(result)&&!isCode(text)&&!index.has(text.toLowerCase())){missing.set(text,(missing.get(text)||0)+1);}
 cache.set(text,result);return result;
}
export function pendingTranslations(){return [...missing].sort((a,b)=>b[1]-a[1]);}
export function pendingArt(){return [...artMissing].sort();}
function text(value){const raw=decode(value),match=raw.match(/^(\s*)([\s\S]*?)(\s*)$/);return match[1]+escape(t(match[2]))+match[3];}
const localAttrs=new Set(['alt','title','aria-label','aria-description','placeholder','data-msg','data-explanation','aria-valuetext']);
function attributes(tag){return tag.replace(/\s([\w:-]+)="([^"]*)"/g,(all,key,value)=>{
 if(localAttrs.has(key)&&value)return ` ${key}="${escape(t(decode(value)))}"`;
 if(key==='data-text'&&value)return ` data-text="${escape(t(decode(value))+' '+decode(value))}"`;
 return all;
});}
function schema(object){
 if(Array.isArray(object))return object.map(schema);
 if(!object||typeof object!=='object')return object;
 return Object.fromEntries(Object.entries(object).map(([key,value])=>[key,typeof value==='string'&&['name','description','slogan','headline','articleBody'].includes(key)?t(value):typeof value==='object'?schema(value):value]));
}
/** Keep IDs, machine values, form submissions and code intact. Translate visible text. */
export function localizeMarkup(html){
 const chunks=html.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]*>|[^<]+/g)||[];
 const stack=[];let mode='',json=false;
 return chunks.map(chunk=>{
  if(chunk.startsWith('<')){
   if(/^<\//.test(chunk)){const tag=chunk.match(/^<\/([\w:-]+)/)?.[1]?.toLowerCase();const index=stack.lastIndexOf(tag);if(index>=0)stack.splice(index);mode=stack.findLast(x=>['script','style','pre','code'].includes(x))||'';if(tag==='script')json=false;return chunk;}
   if(/^<!/.test(chunk))return chunk;
   const tag=chunk.match(/^<([\w:-]+)/)?.[1]?.toLowerCase();if(!tag)return chunk;
   if(!/\/>$/.test(chunk)&&!['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr','path','rect','circle','ellipse','line','polyline','polygon','stop','use'].includes(tag))stack.push(tag);
   if(['script','style','pre','code'].includes(tag)){mode=tag;json=tag==='script'&&/application\/ld\+json/.test(chunk);}
   let result=attributes(chunk);
   if(tag==='html'){result=result.replace(/lang="en"/,'lang="ar"').replace(/dir="ltr"/,'dir="rtl"');if(!/\bdir=/.test(result))result=result.replace(/>$/,' dir="rtl">');}
   if(tag==='meta'&&/(?:name="description"|property="og:(?:title|description)")/.test(result))result=result.replace(/content="([^"]*)"/,(_,value)=>`content="${escape(t(decode(value)))}"`);
   if(tag==='a'&&/href="(?:mailto:|tel:)/.test(result)&&!result.includes('dir='))result=result.replace(/>$/,' dir="ltr">');
   if(tag==='input'&&/type="(?:email|url|tel|password|number)"/.test(result)&&!result.includes('dir='))result=result.replace(/>$/,' dir="ltr">');

   return result;
  }
  if(json){try{return JSON.stringify(schema(JSON.parse(chunk))).replaceAll('<','\\u003c');}catch{return chunk;}}
  if(mode)return chunk;
  return text(chunk);
 }).join('');
}
/** SVG text becomes pre-shaped vector outlines: no embedded raster/font or image font fetch. */
export function localizeSvg(svg){
 const result=localizeMarkup(svg),stack=[{}],used=new Set(),prefix='ar-glyph-'+(++svgSequence)+'-';
 const outlined=result.replace(/<\/?(?:g|svg)\b[^>]*>|<text\b([^>]*)>([\s\S]*?)<\/text>/g,(all,attrs,content)=>{
  if(attrs===undefined){if(/^<\//.test(all)){if(stack.length>1)stack.pop();}else if(!/\/>$/.test(all)){const next={...stack.at(-1)};for(const [,key,value]of all.matchAll(/([\w:-]+)="([^"]*)"/g))if(['fill','font-size','font-family','text-anchor'].includes(key))next[key]=value;stack.push(next);}return all;}
  const label=decode(content.replace(/<[^>]*>/g,'')),entry=labelAtlas[label];if(!entry){artMissing.add(label);return all;}
  const get=(name,fallback)=>attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]||stack.at(-1)[name]||fallback;
  let x=Number(get('x','0'));const y=Number(get('y','0')),size=parseFloat(get('font-size','14'));
  const scale=size/entry.units*Math.min(1,(entry.maxWidth||entry.advance)/entry.advance),anchor=get('text-anchor','start');if(anchor==='middle')x-=entry.advance*scale/2;else if(anchor==='end')x-=entry.advance*scale;
  const fill=get('fill','currentColor'),transform=get('transform',''),id=get('id',''),opacity=get('opacity','');
  const glyphs=entry.glyphs?.map(([key,x,y])=>{used.add(key);return `<use href="#${prefix+key}" x="${x}" y="${y}"/>`;}).join('');
  return `<g class="edu-svg-label" aria-hidden="true" fill="${fill}" stroke="none"${id?` id="${id}"`:''}${opacity?` opacity="${opacity}"`:''}${transform?` transform="${transform}"`:''}><g transform="translate(${+x.toFixed(3)} ${y}) scale(${+scale.toFixed(6)} ${+(-scale).toFixed(6)})">${glyphs||`<path d="${entry.path}"/>`}</g></g>`;
 });
 return used.size?outlined.replace(/(<svg\b[^>]*>)/,`$1<defs>${[...used].map(key=>`<path id="${prefix+key}" d="${atlas.glyphs[key]}"/>`).join('')}</defs>`):outlined;
}
export function relativeUrl(from,to){return path.relative(path.dirname(from),to).split(path.sep).join('/')||'index.html';}
function routeTarget(target){
 const theme=target.match(/^(.*\/0[1-4]-[^/]+\/dist)(?:\/(.*))?$/);
 if(theme){const rel=theme[2]||'index.html';if(rel.startsWith('ar/'))return target;
  if(/^assets\/img\/(?!ar\/).*\.svg$/.test(rel))return path.join(theme[1],'assets/img/ar',path.basename(target));
  if(/^assets\/js\/[^/]+\.js$/.test(rel))return path.join(theme[1],'assets/js/ar',path.basename(target));
  if(/^assets\/downloads\/(?!ar\/).+\.(?:pdf|csv|html|json)$/.test(rel))return path.join(theme[1],'assets/downloads/ar',path.basename(target));
  if(/^assets\/calendar\/(?!ar\/)/.test(rel))return path.join(theme[1],'assets/calendar/ar',path.basename(target));
  if(!rel.startsWith('assets/'))return path.join(theme[1],'ar',rel);
 }
 if(target===path.join(ROOT,'index.html'))return path.join(ROOT,'ar/index.html');
 return target;
}
export function localizePage(html,{dist,file,arabicFile,rtlFile}){
 const arabic=arabicFile||path.join(dist,'ar',path.relative(dist,file));
 let result=localizeMarkup(html.replace(/<a\b[^>]*data-language-switch="ar"[^>]*>[\s\S]*?<\/a>/g,'<wa-language-control></wa-language-control>'));
 result=result.replace(/\b(href|src)="([^"]*)"/g,(all,attr,url)=>{
  if(/^(?:https?:|mailto:|tel:|#|data:|javascript:)/.test(url))return all;
  const [,name,suffix]=url.match(/^([^?#]*)(.*)$/);let target=path.resolve(path.dirname(file),decode(name)||'index.html');
  if(name.endsWith('/'))target=path.join(target,'index.html');
  if(target.startsWith(dist+path.sep)){
   const rel=path.relative(dist,target).split(path.sep).join('/');
   if(/^assets\/img\/.*\.svg$/.test(rel))target=path.join(dist,'assets/img/ar',path.basename(target));
   else if(/^assets\/downloads\//.test(rel))target=path.join(dist,'assets/downloads/ar',path.basename(target));
   else if(/^assets\/calendar\//.test(rel))target=path.join(dist,'assets/calendar/ar',path.basename(target));
   else if(/^assets\/js\/[^/]+\.js$/.test(rel))target=path.join(dist,'assets/js/ar',path.basename(target));
   else target=routeTarget(target,dist);
  }else target=routeTarget(target,dist);
  if(path.basename(target)==='lexend-latin.woff2')target=path.join(path.dirname(target),'noto-sans-arabic.woff2');
  return `${attr}="${relativeUrl(arabic,target)}${suffix}"`;
 });
 result=result.replace(/<svg\b[\s\S]*?<\/svg>/g,svg=>localizeSvg(svg));
 result=result.replace(/(assets\/fonts\/)lexend-latin\.woff2/g,'$1noto-sans-arabic.woff2');
 result=result.replace(/(<meta property="og:image" content=")([^"]+)(")/g,(_,start,url,end)=>{if(/^https?:/.test(url))return start+url.replace(/og-(\w+)\.png$/,'og-$1-ar.png')+end;const target=path.resolve(path.dirname(file),url).replace(/og-(\w+)\.png$/,'og-$1-ar.png');return start+relativeUrl(arabic,target)+end;});
 const rtl=relativeUrl(arabic,rtlFile||path.join(dist,'assets/css/rtl.css'));
 result=result.replace('</head>',`<link rel="stylesheet" href="${rtl}"></head>`);
 result=result.replace(/(<a\b[^>]*href="([^"]*assets\/downloads\/ar\/(?:syllabus|resource)-[^"]+)\.pdf"[^>]*>[\s\S]*?<\/a>)/g,(_,link,href)=>`${link}<a class="edu-text-link edu-pdf-transcript" href="${href}.html">اقرأ نسخة HTML سهلة الوصول</a>`);
 result=result.replaceAll('<wa-language-control></wa-language-control>',languageControl(relativeUrl(arabic,file)+'?lang=en','en'));
 result=result.replace(/url\((['"]?)([^)'"]+)\1\)/g,(all,q,url)=>{if(/^(?:#|data:|https?:)/.test(url))return all;let target=path.resolve(path.dirname(file),url);if(/lexend-latin\.woff2$/.test(target))target=target.replace('lexend-latin.woff2','noto-sans-arabic.woff2');return `url(${q}${relativeUrl(arabic,target)}${q})`;});
 return result;
}
export function languageControl(href,language='ar'){
 const label=language==='ar'?'العربية':'English',aria=language==='ar'?'Switch to Arabic':'التبديل إلى الإنجليزية';
 return `<a class="nav__locale" href="${escape(href)}" data-language-switch="${language}" hreflang="${language}" aria-label="${aria}"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/></svg><span lang="${language}" dir="${language==='ar'?'rtl':'ltr'}">${label}</span></a>`;
}
export function languageHead(html,{file,peer,language='en',baseUrl='',route=''}){
 const peerUrl=relativeUrl(file,peer),en=language==='en'?file:peer,ar=language==='ar'?file:peer;
 const source=/\bname="wa-locale-peer"/.test(html)?html:html.replace(/(<meta name="viewport"[^>]*>)/,`$1<meta name="wa-locale-peer" content="${escape(peerUrl)}">`);
 const script=`(function(){try{var r=document.documentElement,q=new URLSearchParams(location.search),x=q.get('lang'),p=localStorage.getItem('wa-language-v1');if(x==='en'||x==='ar'){localStorage.setItem('wa-language-v1',x);p=x;}if(r.lang==='ar'){localStorage.setItem('wa-language-v1','ar');}else if(p==='ar'&&x!=='en'){var m=document.querySelector('meta[name="wa-locale-peer"]');if(m){var u=new URL(m.content,location.href);u.search=location.search;u.hash=location.hash;location.replace(u.href);}}}catch(e){}})();`;
 let result=source.replace(/(<meta name="wa-locale-peer"[^>]*>)/,`$1<script data-language-boot>${script}</script>`);
 const enHref=baseUrl?baseUrl+'/'+route:relativeUrl(file,en),arHref=baseUrl?baseUrl+'/ar/'+route:relativeUrl(file,ar);
 result=result.replace('</head>',`<link rel="alternate" hreflang="en" href="${escape(enHref)}"><link rel="alternate" hreflang="ar" href="${escape(arHref)}"><link rel="alternate" hreflang="x-default" href="${escape(enHref)}"></head>`);
 result=result.replace('</head>',`<meta property="og:locale" content="${language==='ar'?'ar_EG':'en_GB'}"><meta property="og:locale:alternate" content="${language==='ar'?'en_GB':'ar_EG'}"></head>`);
 if(language==='ar'&&baseUrl)result=result.replace(/(<link rel="canonical" href=")[^"]*(")/,`$1${escape(baseUrl)}/ar/${route}$2`);
 if(language==='ar')result=result.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,(_,a,json,b)=>{let object=JSON.parse(json);const visit=o=>{if(Array.isArray(o))return o.map(visit);if(o&&typeof o==='object'){if(o['@type']&&/Article|Course|WebPage/.test(o['@type']))o.inLanguage='ar';return Object.fromEntries(Object.entries(o).map(([key,value])=>[key,visit(value)]));}if(typeof o==='string'&&baseUrl&&(o===baseUrl||o.startsWith(baseUrl+'/'))&&!o.includes('/assets/'))return baseUrl+'/ar/'+o.slice(baseUrl.length).replace(/^\//,'');return o;};return a+JSON.stringify(visit(object)).replaceAll('<','\\u003c')+b;});
 return result;
}
export function runtimeLocale(source,language){
 const keys=new Set([...source.matchAll(/\btr\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/g)].map(m=>m[1].slice(1,-1).replace(/\\(['"\\])/g,'$1')));
 const map=language==='ar'?Object.fromEntries([...keys].map(key=>[key,t(key)])):{};
 return `(function(){var ar=document.documentElement.lang==='ar',nf=new Intl.NumberFormat('ar-EG',{useGrouping:false,maximumFractionDigits:2}),cf=new Intl.NumberFormat(ar?'ar-EG':'en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}),m=${JSON.stringify(map).replaceAll('<','\\u003c')};window.WAI18n={language:ar?'ar':'en',locale:ar?'ar-EG':'en-GB',t:function(k,p){var s=m[k]||k;return p?s.replace(/\\{(\\w+)\\}/g,function(_,n){return p[n]===undefined?'':String(p[n]);}):s;},number:function(n){return ar?nf.format(n):String(n);},currency:function(n){return cf.format(n);}};document.addEventListener('click',function(e){var a=e.target.closest('a[data-language-switch]');if(!a)return;try{localStorage.setItem('wa-language-v1',a.getAttribute('data-language-switch'));}catch(x){}if(location.search||location.hash){var u=new URL(a.href,location.href),q=new URLSearchParams(location.search);q.delete('lang');if(a.getAttribute('data-language-switch')==='en')q.set('lang','en');u.search=q.toString();u.hash=location.hash;a.href=u.href;}});})();\n`;
}
