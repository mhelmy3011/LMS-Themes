/* ==========================================================================
   Deterministic brand artwork generator.
   Produces small, crisp SVGs in the locked palette so every template has
   consistent imagery with zero external assets and no licensing questions.
   ========================================================================== */

const NAVY = '#012A5D';
const DEEP = '#001A3D';
const MID = '#14427F';
const SKY = '#8DB8FF';
const ICE = '#EAF1FB';
const LIME = '#C8F560';
const WHITE = '#FFFFFF';

function rng(seed) {
  let h = 2166136261;
  const s = String(seed);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n) => Math.round(n * 100) / 100;

/** Course / article cover: abstract brand composition, 800x500. */
export function cover(seed, opts = {}) {
  const rand = rng(seed);
  const w = 800, h = 500;
  const motif = Math.floor(rand() * 5);
  const dark = opts.dark ?? false;
  const bg = dark ? DEEP : ICE;
  let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">`;
  out += `<rect width="${w}" height="${h}" fill="${bg}"/>`;

  if (motif === 0) {
    /* concentric arcs rising from the base — the brand's ridges motif */
    const cx = w * (0.3 + rand() * 0.4), cy = h * 1.15;
    const rings = 7;
    for (let i = rings; i > 0; i--) {
      const rad = 90 + i * 58;
      const col = dark
        ? [MID, MID, NAVY, MID, SKY][i % 5]
        : [NAVY, MID, NAVY, SKY, NAVY][i % 5];
      out += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${rad}" fill="none" stroke="${col}" stroke-width="${i === 2 ? 26 : 14}" opacity="${i === 2 ? 0.95 : 0.55}"/>`;
    }
    out += `<circle cx="${r2(cx)}" cy="${r2(cy - 250)}" r="12" fill="${LIME}"/>`;
  } else if (motif === 1) {
    /* the loop line, unrolled — the W's single stroke */
    const y = h * (0.35 + rand() * 0.3);
    const amp = 52, len = 150;
    let d = `M-40 ${r2(y)}`;
    for (let x = -40; x < w + 80; x += len) {
      d += ` c ${len * 0.28} -${amp} ${len * 0.72} -${amp} ${len} 0 c ${len * 0.28} ${amp} ${len * 0.72} ${amp} ${len} 0`;
    }
    out += `<path d="${d}" fill="none" stroke="${dark ? LIME : NAVY}" stroke-width="${dark ? 26 : 22}" stroke-linecap="round" opacity="0.95"/>`;
    out += `<rect x="0" y="${r2(h * 0.78)}" width="${w}" height="${r2(h * 0.22)}" fill="${NAVY}" opacity="${dark ? 0.5 : 0.1}"/>`;
  } else if (motif === 2) {
    /* dot grid + one bold disc */
    let dots = '';
    for (let x = 24; x < w; x += 26) for (let y = 24; y < h; y += 26) dots += `<circle cx="${x}" cy="${y}" r="1.5"/>`;
    out += `<g fill="${dark ? SKY : NAVY}" opacity="${dark ? 0.45 : 0.28}">${dots}</g>`;
    const cx = w * (0.55 + rand() * 0.2), cy = h * 0.5, rr = 96 + rand() * 40;
    out += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(rr)}" fill="${NAVY}"/>`;
    out += `<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(rr - 22)}" fill="none" stroke="${LIME}" stroke-width="3"/>`;
    out += `<path d="M${r2(cx - rr * 0.5)} ${r2(cy)} h${r2(rr)} M${r2(cx)} ${r2(cy - rr * 0.5)} v${r2(rr)}" stroke="${WHITE}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`;
  } else if (motif === 3) {
    /* stacked frames — "the work" */
    const n = 3 + Math.floor(rand() * 2);
    for (let i = 0; i < n; i++) {
      const x = 70 + i * 96, y = 120 + (i % 2) * 40;
      const cols = [NAVY, MID, SKY, WHITE];
      out += `<rect x="${x}" y="${y}" width="230" height="150" rx="14" fill="${cols[i % cols.length]}" opacity="${1 - i * 0.12}" transform="rotate(${i % 2 ? 3 : -2} ${x + 115} ${y + 75})"/>`;
    }
    out += `<circle cx="${w - 90}" cy="90" r="26" fill="${LIME}"/>`;
  } else {
    /* a code device — the deck's bracket / cursor language */
    out += `<rect x="60" y="120" width="${w - 120}" height="260" rx="20" fill="${NAVY}" opacity="${dark ? 0.85 : 1}"/>`;
    out += `<circle cx="96" cy="156" r="6" fill="${LIME}"/><circle cx="118" cy="156" r="6" fill="${SKY}" opacity="0.6"/><circle cx="140" cy="156" r="6" fill="${WHITE}" opacity="0.3"/>`;
    const lines = [0.32, 0.55, 0.42, 0.66].map((v) => Math.round((w - 200) * v));
    lines.forEach((lw, i) => {
      out += `<rect x="96" y="${210 + i * 34}" width="${lw}" height="12" rx="6" fill="${i === 0 ? LIME : WHITE}" opacity="${i === 0 ? 1 : 0.34}"/>`;
    });
    out += `<rect x="96" y="${210 + lines.length * 34}" width="14" height="16" fill="${LIME}"/>`;
  }
  out += `</svg>`;
  return out;
}

/** Avatar / portrait: a designed abstract bust, 320x320. */
export function portrait(seed) {
  const rand = rng(seed);
  const variants = [
    { bg: ICE, skin: '#E8C7A8', hair: NAVY, body: NAVY, accent: LIME },
    { bg: ICE, skin: '#C88F63', hair: DEEP, body: MID, accent: SKY },
    { bg: '#DCE9FB', skin: '#F0D2B4', hair: MID, body: NAVY, accent: LIME },
    { bg: ICE, skin: '#9A6642', hair: DEEP, body: NAVY, accent: SKY },
    { bg: '#E4EEFC', skin: '#D9A97F', hair: NAVY, body: MID, accent: LIME },
    { bg: ICE, skin: '#7A4A2C', hair: DEEP, body: MID, accent: LIME },
  ];
  const v = variants[Math.floor(rand() * variants.length)];
  const hairStyle = Math.floor(rand() * 3);
  let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-hidden="true">`;
  out += `<rect width="320" height="320" fill="${v.bg}"/>`;
  out += `<circle cx="160" cy="150" r="118" fill="${WHITE}" opacity="0.55"/>`;
  /* shoulders */
  out += `<path d="M52 320c0-52 48-84 108-84s108 32 108 84Z" fill="${v.body}"/>`;
  /* neck */
  out += `<rect x="146" y="196" width="28" height="44" rx="13" fill="${v.skin}"/>`;
  /* head */
  out += `<ellipse cx="160" cy="150" rx="56" ry="66" fill="${v.skin}"/>`;
  /* hair variants */
  if (hairStyle === 0) {
    out += `<path d="M104 150c-4-46 22-76 58-76s62 28 58 76c-10-22-24-32-34-34-14-3-30 6-46 6-14 0-26 6-36 28Z" fill="${v.hair}"/>`;
  } else if (hairStyle === 1) {
    out += `<path d="M100 158c-8-58 24-88 60-88s68 30 60 88c-6-10-10-30-12-42-18 10-46 12-70 4-10 8-16 22-18 38Z" fill="${v.hair}"/>`;
    out += `<path d="M96 150c0 30 4 44 10 54l-16-6c-6-18-6-38 6-48Z" fill="${v.hair}"/>`;
  } else {
    out += `<path d="M102 146c0-42 24-72 58-72s58 30 58 72c0 6-2 12-4 16-6-26-20-40-38-42-16-2-30 8-46 10-12 2-20 8-24 22-2-2-4-4-4-6Z" fill="${v.hair}"/>`;
  }
  /* collar accent */
  out += `<path d="M140 246h40l-20 34Z" fill="${v.accent}"/>`;
  out += `<circle cx="238" cy="252" r="10" fill="${v.accent}" opacity="0.9"/>`;
  out += `</svg>`;
  return out;
}

/** Small brand-styled texture used behind dark sections (tileable dot grid). */
export function dotGrid(color = SKY, opacity = 0.28, pitch = 24) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${pitch}" height="${pitch}" viewBox="0 0 ${pitch} ${pitch}" aria-hidden="true"><circle cx="${pitch / 2}" cy="${pitch / 2}" r="1" fill="${color}" opacity="${opacity}"/></svg>`;
}

/** The loop line as a standalone decorative SVG (dividers, section breaks). */
export function loopLine({ width = 1200, height = 120, color = LIME, weight = 2 } = {}) {
  const y = height / 2, amp = height * 0.34, len = 120;
  let d = `M0 ${y}`;
  for (let x = 0; x < width; x += len) {
    d += ` c ${len * 0.28} -${amp} ${len * 0.72} -${amp} ${len} 0 c ${len * 0.28} ${amp} ${len * 0.72} ${amp} ${len} 0`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none" aria-hidden="true" preserveAspectRatio="none"><path d="${d}" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
}

export { NAVY, DEEP, MID, SKY, ICE, LIME, WHITE };
