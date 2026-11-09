import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {profile} from '../../shared/lib/config.mjs';
const themes=['01-nova-academy','02-atelier-academy','03-aero-academy','04-folio-landing'];

test('all eight theme/preset combinations preserve learner-first conversion and safe metadata',async()=>{
 const names=['WA_PRESET','WA_SITE_NAME','WA_CREATOR_NAME','WA_SITE_URL','WA_RECRUITMENT','WA_STANDALONE'];const before=Object.fromEntries(names.map(k=>[k,process.env[k]]));
 try{
  for(const dir of themes)for(const mode of ['academy','creator']){
   process.env.WA_PRESET=mode;process.env.WA_SITE_NAME='A studio </script> & friends';process.env.WA_CREATOR_NAME='An Educator';process.env.WA_SITE_URL='https://example.com/learning';process.env.WA_RECRUITMENT='0';process.env.WA_STANDALONE='1';
   const {routes}=await import(new URL(`../../${dir}/src/pages.mjs?config-test=${mode}`,import.meta.url));
   const home=routes().find(r=>r.path==='').html;
   assert.ok(home.includes(`data-site-mode="${mode}"`));assert.ok(home.includes('A studio &lt;/script&gt; &amp; friends'));
   assert.ok(home.includes('rel="canonical" href="https://example.com/learning/"'));assert.ok(home.includes('https://example.com/learning/assets/brand/og-'));
   const header=home.match(/<header[\s\S]*?<\/header>/)[0];assert.ok(!header.includes('href="teach/"'));assert.ok(!header.includes('data-menu-trigger="themes"'));assert.ok(!home.includes('class="switcher"'));
   const cta=header.match(/class="[^"]*nav__cta[^"]*" href="([^"]+)"/)[1];assert.ok(!cta.includes('teach'),'Recruitment must not become the primary CTA');
   for(const match of home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){const data=JSON.parse(match[1]);assert.ok(data);assert.ok(!match[1].includes('</script>'));}
   process.env.WA_RECRUITMENT='1';const teachingHeader=routes().find(r=>r.path==='').html.match(/<header[\s\S]*?<\/header>/)[0];assert.ok(teachingHeader.includes('href="teach/"'));
  }
 }finally{for(const k of names)before[k]===undefined?delete process.env[k]:process.env[k]=before[k];}
});

test('invalid canonical URLs are rejected rather than emitted into public metadata',()=>{
 const old=process.env.WA_SITE_URL;
 try{for(const url of ['not a URL','javascript:alert(1)','https://example.com/?q=bad','https://example.com/#bad']){process.env.WA_SITE_URL=url;assert.throws(()=>profile('nova'),/WA_SITE_URL/);}}
 finally{old===undefined?delete process.env.WA_SITE_URL:process.env.WA_SITE_URL=old;}
});

test('all checked-in social/app exports are real PNGs at the intended dimensions',async()=>{
 for(const dir of themes){const id=dir.split('-')[1];for(const [name,width,height]of [[`og-${id}.png`,1200,630],[`og-${id}-ar.png`,1200,630],[`app-icon-${id}.png`,180,180]]){
  for(const parent of ['shared/social',`${dir}/dist/assets/brand`]){const buffer=await fs.readFile(new URL(`../../${parent}/${name}`,import.meta.url));assert.equal(buffer.subarray(1,4).toString(),'PNG');assert.equal(buffer.readUInt32BE(16),width);assert.equal(buffer.readUInt32BE(20),height);}
 }}
});
