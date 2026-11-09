#!/usr/bin/env node
/**
 * Structural QA for the built templates. No dependencies.
 * Checks: internal links, asset references, duplicate ids, image alt text,
 * heading structure, brand-palette compliance, and page weight budgets.
 *
 * Usage: node tools/check.mjs [templateDir ...]
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
/* Locked brand palette from VisualIdentity.pdf, plus documented exceptions:
   neutral UI tints derived from navy, and the semantic error/danger ramp
   (which cannot be brand colours — errors must not look like the accent). */
const PALETTE = new Set([
  '012a5d', '001a3d', '14427f', '8db8ff', 'eaf1fb', 'ffffff', 'c8f560',
  'f4f8fe', 'f7fbff', 'dce9fb', 'e4eefc', '000000',
  'b4232a', '8e1b21', 'fdf3f3', '7c171c', 'ffc9c9', '999999',
  /* dark-ground semantic error ramp (Aero) — cannot be brand colours */
  'e07a80', 'ffd9db', 'ffb3b7',
]);
const TINTS_OK = /^(transparent|currentcolor|inherit|none|#fff|#000)$/i;

async function walk(dir, out = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else out.push(p);
  }
  return out;
}

const gz = (buf) => zlib.gzipSync(buf).length;

function parsePage(html) {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((m) => m[1]);
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const h1 = [...html.matchAll(/<h1\b/g)].length;
  const heads = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
  return { links, imgs, ids, h1, heads };
}

async function checkTemplate(dir) {
  const dist = path.join(dir, 'dist');
  const files = await walk(dist);
  const htmlFiles = files.filter((f) => f.endsWith('.html'));
  const problems = [];
  const warnings = [];

  const htmlCache=new Map();
  async function htmlAt(file){if(!htmlCache.has(file))htmlCache.set(file,await fs.readFile(file,'utf8'));return htmlCache.get(file);}
  let internalLinks = 0;
  const crossLinks = {};
  for (const file of htmlFiles) {
    const html = await htmlAt(file);
    const rel = path.relative(dist, file);
    const { links, imgs, ids, h1, heads } = parsePage(html);

    if(html.includes('${')||html.includes('{{R}}'))problems.push(`${rel}: unexpanded source token`);
    if (h1 === 0) warnings.push(`${rel}: no <h1>`);
    if (h1 > 1) problems.push(`${rel}: ${h1} <h1> elements`);
    let prev = 0;
    for (const h of heads) {
      if (prev && h > prev + 1) { warnings.push(`${rel}: heading jumps h${prev} → h${h}`); break; }
      prev = h;
    }

    const seen = new Set();
    for (const id of ids) {
      if (seen.has(id)) problems.push(`${rel}: duplicate id "${id}"`);
      seen.add(id);
    }

    for (const href of links) {
      if(!href||href==='#'){problems.push(`${rel}: empty or placeholder action`);continue;}
      if (href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('tel:')) continue;
      internalLinks++;
      let target = href.startsWith('#') ? file : path.resolve(path.dirname(file), href.split('#')[0].split('?')[0]);
      /* Links leaving dist are intentional cross-template links (themes hub,
         switcher). They must still resolve inside the repository. */
      const inDist = target.startsWith(dist);
      if (!inDist && !target.startsWith(ROOT)) { problems.push(`${rel}: link escapes the repository → ${href}`); continue; }
      try {
        const st = await fs.stat(target);
        if (st.isDirectory()) {
          target=path.join(target,'index.html');
          await fs.stat(target).catch(() => problems.push(`${rel}: link to folder without index → ${href}`));
        }
        const fragment=href.split('#')[1];
        if(fragment&&target.endsWith('.html')){const targetHtml=await htmlAt(target);const id=decodeURIComponent(fragment);if(!targetHtml.includes(`id="${id}"`))problems.push(`${rel}: missing fragment → ${href}`);}
        if (!inDist && crossLinks[href] !== false) crossLinks[href] = true;
      } catch {
        problems.push(`${rel}: broken link → ${href}`);
      }
    }

    for (const tag of imgs) {
      const m = tag.match(/src="([^"]*)"/);
      if (!m) continue;
      if (!/\balt=/.test(tag)) problems.push(`${rel}: <img> without alt → ${m[1]}`);
      if (m[1].startsWith('http')) continue;
      const target = path.resolve(path.dirname(file), m[1]);
      await fs.stat(target).catch(() => problems.push(`${rel}: missing image → ${m[1]}`));
    }
  }

  /* palette audit on the template's own CSS */
  const cssFile = files.find((f) => f.endsWith('.css'));
  let cssBytes = 0, cssGz = 0;
  if (cssFile) {
    const css = await fs.readFile(cssFile, 'utf8');
    cssBytes = Buffer.byteLength(css); cssGz = gz(Buffer.from(css));
    const hexes = [...css.matchAll(/(?<![\w-])#([0-9a-fA-F]{3,8})\b/g)].map((m) => m[1].toLowerCase());
    const bad = [...new Set(hexes)].filter((h) => {
      if (h.length === 3) h = h.split('').map((c) => c + c).join('');
      return !PALETTE.has(h) && !TINTS_OK.test('#' + h);
    });
    if (bad.length) warnings.push(`${path.basename(cssFile)}: colours outside the locked palette → ${bad.map((b) => '#' + b).join(', ')}`);
  }

  const jsFile = files.find((f) => f.endsWith('.js'));
  let jsGz = 0;
  if (jsFile) jsGz = gz(await fs.readFile(jsFile));

  const family=path.basename(dir).split('-')[1];
  const cssBudget=family==='folio'?24:30,jsBudget=({nova:45,atelier:30,aero:42,folio:30})[family]||30;
  if(cssGz/1024>cssBudget)problems.push(`CSS exceeds ${cssBudget}KB gzip budget`);
  if(jsGz/1024>jsBudget)problems.push(`JS exceeds ${jsBudget}KB gzip budget`);
  for(const f of files.filter(f=>f.includes(path.sep+'img'+path.sep)&&f.endsWith('.svg'))){const svg=await fs.readFile(f,'utf8');if(/<(?:image|script)\b|data:image|https?:\/\/(?!www\.w3\.org)/.test(svg))problems.push(`${path.relative(dist,f)}: raster, script or remote SVG dependency`);if(!/<title[ >]/.test(svg)||!/<desc[ >]/.test(svg))problems.push(`${path.relative(dist,f)}: missing SVG title or description`);}

  const fonts = files.filter((f) => f.endsWith('.woff2'));
  const fontBytes = (await Promise.all(fonts.map(async (f) => (await fs.stat(f)).size))).reduce((a, b) => a + b, 0);

  /* heaviest page incl. its referenced assets (rough) */
  let heaviest = { page: '—', kb: 0 };
  for (const file of htmlFiles) {
    const html = await htmlAt(file);
    let total = Buffer.byteLength(html);
    for (const m of html.matchAll(/(?:src|href)="([^"]*\.(?:svg|png|jpg|woff2|css|js))"/g)) {
      const p = path.resolve(path.dirname(file), m[1]);
      await fs.stat(p).then((s) => { total += s.size; }).catch(() => {});
    }
    if (total / 1024 > heaviest.kb) heaviest = { page: path.relative(dist, file), kb: Math.round(total / 1024) };
  }

  return {
    name: path.basename(dir),
    pages: htmlFiles.length,
    internalLinks,
    crossLinks: Object.keys(crossLinks).length,
    cssKb: +(cssBytes / 1024).toFixed(1),
    cssGzKb: +(cssGz / 1024).toFixed(1),
    jsGzKb: +(jsGz / 1024).toFixed(1),
    fontKb: +(fontBytes / 1024).toFixed(1),
    heaviest,
    problems,
    warnings,
  };
}

const dirs = process.argv.slice(2).length
  ? process.argv.slice(2).map((d) => path.resolve(ROOT, d))
  : (await fs.readdir(ROOT, { withFileTypes: true }))
      .filter((e) => e.isDirectory() && /^\d\d-/.test(e.name))
      .map((e) => path.join(ROOT, e.name));

let failed = 0;
for (const dir of dirs) {
  const r = await checkTemplate(dir);
  console.log(`\n━━━ ${r.name}`);
  console.log(`pages ${r.pages} · internal links ${r.internalLinks} · css ${r.cssKb}KB (${r.cssGzKb}KB gz) · js ${r.jsGzKb}KB gz · fonts ${r.fontKb}KB`);
  console.log(`heaviest page ~${r.heaviest.kb}KB (${r.heaviest.page})`);
  if (r.crossLinks) console.log(`cross-template links: ${r.crossLinks} distinct targets (verified)`);
  if (r.problems.length) {
    failed += r.problems.length;
    console.log(`✗ ${r.problems.length} problems`);
    r.problems.slice(0, 25).forEach((p) => console.log('   · ' + p));
    if (r.problems.length > 25) console.log(`   … ${r.problems.length - 25} more`);
  } else {
    console.log('✓ no structural problems');
  }
  if (r.warnings.length) {
    console.log(`⚠ ${r.warnings.length} warnings`);
    r.warnings.slice(0, 12).forEach((w) => console.log('   · ' + w));
    if (r.warnings.length > 12) console.log(`   … ${r.warnings.length - 12} more`);
  }
}

console.log(failed ? `\nFAILED with ${failed} problems` : '\nALL CHECKS PASSED');
process.exit(failed ? 1 : 0);
