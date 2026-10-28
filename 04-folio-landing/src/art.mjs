/* ==========================================================================
   04 · FOLIO — illustration system.
   Soft "clay" vector art: rounded volumes, one key light upper-left, matte
   finish, brand palette only. Skin tones stay natural; objects take the brand.
   ========================================================================== */

const NAVY = '#012A5D';
const DEEP = '#001A3D';
const MID = '#14427F';
const SKY = '#8DB8FF';
const ICE = '#EAF1FB';
const LIME = '#C8F560';
const WHITE = '#FFFFFF';

const SKINS = ['#E8C7A8', '#C88F63', '#9A6642', '#F0D2B4', '#7A4A2C', '#D9A97F'];
const HAIRS = [NAVY, DEEP, '#3B2A20', MID, '#1B1B1B'];

const wrap = (w, h, body, bg = 'none') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">` +
  (bg === 'none' ? '' : `<rect width="${w}" height="${h}" fill="${bg}"/>`) +
  body +
  `</svg>`;

/* a soft clay sphere */
const ball = (x, y, r, fill, id = '') => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>
  <path d="M${x - r} ${y}a${r} ${r} 0 0 1 ${r * 2} 0z" fill="${DEEP}" opacity="0.08"/>
  <ellipse cx="${x - r * 0.3}" cy="${y - r * 0.38}" rx="${r * 0.34}" ry="${r * 0.26}" fill="#fff" opacity="0.24"/>`;

/* a rounded clay block with a highlight edge */
const block = (x, y, w, h, r, fill, rot = 0) => `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>
    <path d="M${x} ${y + h - r}a${r} ${r} 0 0 0 ${r} ${r}h${w - r * 2}a${r} ${r} 0 0 0 ${r}-${r}v-${h - r * 2}l-${w} 0z" fill="${DEEP}" opacity="0.07"/>
    <rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h * 0.34}" rx="${r * 0.8}" fill="#fff" opacity="0.12"/>
  </g>`;

/* a stylised person: shoulders, neck, head, hair */
const person = (cx, cy, scale, { skin = 0, hair = 0, cloth = NAVY, style = 0 } = {}, extra = '') => {
  const s = scale;
  const sk = SKINS[skin % SKINS.length];
  const hr = HAIRS[hair % HAIRS.length];
  return `
  <g transform="translate(${cx} ${cy}) scale(${s})">
    <path d="M-50 62c0-26 22-42 50-42s50 16 50 42z" fill="${cloth}"/>
    <path d="M-50 62c0-26 22-42 50-42v42z" fill="${DEEP}" opacity="0.10"/>
    <rect x="-9" y="8" width="18" height="20" rx="9" fill="${sk}"/>
    <ellipse cx="0" cy="-8" rx="27" ry="31" fill="${sk}"/>
    <ellipse cx="-9.5" cy="-10" rx="2.6" ry="3.1" fill="${DEEP}" opacity="0.62"/>
    <ellipse cx="9.5" cy="-10" rx="2.6" ry="3.1" fill="${DEEP}" opacity="0.62"/>
    <path d="M-6 3c3 3 9 3 12 0" fill="none" stroke="${DEEP}" stroke-width="2.2" stroke-linecap="round" opacity="0.34"/>
    ${style === 0
      ? `<path d="M-27 -10c-2-22 12-36 27-36s29 14 27 36c-6-12-14-18-27-18s-21 6-27 18z" fill="${hr}"/>`
      : style === 1
        ? `<path d="M-28 -4c-4-26 12-42 28-42s32 16 28 42c-3-6-5-16-6-22-10 6-24 6-38 2-4 4-9 12-12 20z" fill="${hr}"/>
           <path d="M-29 -12c-2 14 0 22 3 28l-7-3c-3-9-2-19 4-25z" fill="${hr}"/>`
        : `<path d="M-27 -8c0-22 12-38 27-38s27 16 27 38c0 3-1 6-2 8-3-14-11-22-25-22s-22 8-25 22c-1-2-2-5-2-8z" fill="${hr}"/>`}
    <path d="M-10 34h20l-10 14z" fill="${LIME}" opacity="0.95"/>
    ${extra}
  </g>`;
};

/* -------------------------------------------------------------------------- */
/* 1. hero: a visual instructor at a desk, portfolio wall above               */
/* -------------------------------------------------------------------------- */
export const hero = () => {
  const w = 800, h = 1000;
  let s = '';

  /* floor shadow */
  s += `<ellipse cx="400" cy="912" rx="320" ry="42" fill="${DEEP}" opacity="0.07"/>`;

  /* the portfolio wall: three tilted frames, the reason this page exists */
  const frame = (x, y, rot, bgc) => `
    <g transform="rotate(${rot} ${x + 78} ${y + 58})">
      <rect x="${x}" y="${y}" width="156" height="116" rx="10" fill="${WHITE}"/>
      <rect x="${x + 8}" y="${y + 8}" width="140" height="100" rx="6" fill="${bgc}"/>
      <circle cx="${x + 44}" cy="${y + 42}" r="13" fill="${WHITE}" opacity="0.85"/>
      <path d="M${x + 8} ${y + 92} l34 -30 26 22 30 -34 42 42 v8 h-132z" fill="${NAVY}" opacity="0.78"/>
    </g>`;
  s += `<rect x="118" y="86" width="576" height="176" rx="18" fill="${ICE}" opacity="0.55"/>`;
  s += frame(150, 96, -3, SKY);
  s += frame(330, 76, 2, LIME);
  s += frame(508, 104, -2, ICE);
  s += `<circle cx="386" cy="272" r="6" fill="${NAVY}" opacity="0.22"/>`;
  s += `<circle cx="414" cy="272" r="6" fill="${NAVY}" opacity="0.14"/>`;

  /* ring light on a stand, right */
  s += `<rect x="648" y="470" width="10" height="232" rx="5" fill="${MID}"/>`;
  s += `<ellipse cx="653" cy="706" rx="42" ry="9" fill="${MID}"/>`;
  s += `<circle cx="653" cy="404" r="64" fill="none" stroke="${WHITE}" stroke-width="19"/>`;
  s += `<circle cx="653" cy="404" r="64" fill="none" stroke="${LIME}" stroke-width="19" stroke-linecap="round" stroke-dasharray="118 290" transform="rotate(-38 653 404)"/>`;

  /* plant, left */
  s += `<path d="M138 704c14-72 62-98 100-98-6 47-44 90-100 98z" fill="${NAVY}" opacity="0.92"/>`;
  s += `<path d="M138 704c-48-14-60-64-54-98 35 10 62 50 54 98z" fill="${MID}"/>`;
  s += `<path d="M104 700h70l-9 56h-52z" fill="${LIME}"/>`;
  s += `<rect x="104" y="690" width="70" height="14" rx="7" fill="${LIME}"/>`;

  /* the instructor, behind the desk */
  s += person(392, 496, 2.05, { skin: 0, hair: 1, cloth: NAVY, style: 1 });

  /* desk, in front */
  s += block(108, 700, 584, 26, 13, NAVY, 0);
  s += block(108, 708, 584, 18, 9, DEEP, 0);
  s += `<rect x="150" y="726" width="20" height="176" rx="10" fill="${MID}"/>`;
  s += `<rect x="630" y="726" width="20" height="176" rx="10" fill="${MID}"/>`;

  /* laptop, open, in front of her */
  s += `<path d="M236 700l46-118c4-10 11-15 20-15h104c9 0 16 5 20 15l46 118z" fill="${WHITE}"/>`;
  s += `<path d="M248 692l40-104c3-8 8-11 15-11h94c7 0 12 3 15 11l40 104z" fill="${ICE}"/>`;
  s += `<rect x="296" y="588" width="112" height="66" rx="6" fill="${SKY}" opacity="0.55"/>`;
  s += `<rect x="308" y="600" width="64" height="7" rx="3.5" fill="${NAVY}" opacity="0.45"/>`;
  s += `<rect x="308" y="615" width="46" height="7" rx="3.5" fill="${NAVY}" opacity="0.26"/>`;
  s += `<path d="M236 700h216" stroke="${DEEP}" stroke-width="5" stroke-linecap="round" opacity="0.10"/>`;

  /* drawing tablet + stylus, right of the laptop */
  s += block(474, 646, 150, 54, 12, MID, -4);
  s += block(486, 656, 126, 34, 8, ICE, -4);
  s += `<g transform="rotate(-14 560 640)"><rect x="556" y="596" width="10" height="54" rx="5" fill="${NAVY}"/><path d="M556 596l5-14 5 14z" fill="${LIME}"/></g>`;

  /* mug, left of the laptop */
  s += `<rect x="170" y="648" width="44" height="50" rx="9" fill="${WHITE}" stroke="${NAVY}" stroke-opacity="0.10"/>`;
  s += `<path d="M170 657a9 9 0 0 1 9-9h26a9 9 0 0 1 9 9v4h-44z" fill="${ICE}"/>`;
  s += `<path d="M214 660h10a11 11 0 0 1 0 22h-10" fill="none" stroke="${ICE}" stroke-width="7"/>`;
  s += `<rect x="174" y="656" width="36" height="8" rx="4" fill="${LIME}"/>`;

  /* hands, on the tablet */
  s += `<ellipse cx="516" cy="716" rx="25" ry="14" fill="${SKINS[0]}"/>`;
  s += `<ellipse cx="572" cy="708" rx="23" ry="13" fill="${SKINS[0]}"/>`;

  /* floating accents, one spark per corner */
  s += ball(118, 392, 20, LIME);
  s += ball(706, 232, 14, SKY);
  s += ball(300, 322, 9, SKY);

  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 2. "your work, your pricing" — tags and a colour fan                       */
/* -------------------------------------------------------------------------- */
export const pricing = () => {
  const w = 800, h = 800;
  let s = '';
  s += `<ellipse cx="400" cy="700" rx="300" ry="40" fill="${DEEP}" opacity="0.06"/>`;
  /* colour fan */
  for (let i = 0; i < 6; i++) {
    const rot = -34 + i * 13;
    const cols = [WHITE, ICE, SKY, MID, NAVY, LIME];
    s += `<g transform="rotate(${rot} 300 520)">
      <rect x="222" y="330" width="156" height="200" rx="18" fill="${cols[i]}" stroke="${NAVY}" stroke-opacity="0.10"/>
    </g>`;
  }
  s += ball(300, 520, 26, WHITE);
  /* price tags */
  const tag = (x, y, rot, bg, fg) => `
    <g transform="rotate(${rot} ${x + 80} ${y + 50})">
      <path d="M${x} ${y}h130a16 16 0 0 1 16 16v68a16 16 0 0 1-16 16H${x + 26}l-26-26V${y + 16}a16 16 0 0 1 16-16z" fill="${bg}"/>
      <circle cx="${x + 26}" cy="${y + 40}" r="7" fill="${fg}"/>
      <rect x="${x + 46}" y="${y + 62}" width="72" height="10" rx="5" fill="${fg}" opacity="0.55"/>
    </g>`;
  s += tag(390, 250, 8, NAVY, WHITE);
  s += tag(52, 214, -9, WHITE, NAVY);
  s += tag(430, 470, -5, LIME, NAVY);
  /* stacked coins */
  s += `<ellipse cx="600" cy="640" rx="70" ry="22" fill="${MID}"/>`;
  s += `<rect x="530" y="590" width="140" height="50" fill="${MID}"/>`;
  s += `<ellipse cx="600" cy="590" rx="70" ry="22" fill="${SKY}"/>`;
  s += `<rect x="530" y="540" width="140" height="50" fill="${MID}"/>`;
  s += `<ellipse cx="600" cy="540" rx="70" ry="22" fill="${SKY}"/>`;
  s += `<ellipse cx="600" cy="540" rx="46" ry="13" fill="none" stroke="${WHITE}" stroke-width="3" opacity="0.6"/>`;
  s += ball(180, 640, 24, LIME);
  s += ball(700, 300, 18, NAVY);
  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 3. "teach live" — camera, tripod, laptop showing a room                    */
/* -------------------------------------------------------------------------- */
export const live = () => {
  const w = 800, h = 600;
  let s = '';
  s += `<ellipse cx="400" cy="540" rx="320" ry="30" fill="${DEEP}" opacity="0.06"/>`;
  /* laptop */
  s += block(210, 300, 380, 220, 18, WHITE, 0);
  s += `<rect x="230" y="320" width="340" height="180" rx="10" fill="${ICE}"/>`;
  /* live room tiles */
  s += `<rect x="242" y="332" width="158" height="74" rx="8" fill="${NAVY}"/>`;
  s += person(321, 372, 0.5, { skin: 1, hair: 0, cloth: MID });
  s += `<rect x="408" y="332" width="150" height="74" rx="8" fill="${MID}"/>`;
  s += person(483, 372, 0.5, { skin: 3, hair: 2, cloth: NAVY });
  s += `<rect x="242" y="414" width="158" height="74" rx="8" fill="${SKY}" opacity="0.55"/>`;
  s += person(321, 454, 0.5, { skin: 4, hair: 1, cloth: NAVY });
  s += `<rect x="408" y="414" width="150" height="74" rx="8" fill="${NAVY}"/>`;
  s += `<circle cx="483" cy="446" r="13" fill="${LIME}"/>`;
  s += `<rect x="456" y="466" width="54" height="7" rx="3.5" fill="${WHITE}" opacity="0.5"/>`;
  /* recorder dot */
  s += `<circle cx="256" cy="344" r="5" fill="${LIME}"/>`;
  /* laptop base */
  s += block(180, 520, 440, 20, 10, NAVY, 0);
  /* tripod + camera, right */
  s += `<path d="M640 300l-46 200M640 300l46 200M640 300v200" stroke="${MID}" stroke-width="10" stroke-linecap="round"/>`;
  s += block(596, 246, 96, 60, 14, NAVY, 0);
  s += `<circle cx="644" cy="276" r="18" fill="${DEEP}"/>`;
  s += `<circle cx="644" cy="276" r="10" fill="${SKY}"/>`;
  s += `<rect x="596" y="240" width="30" height="10" rx="5" fill="${LIME}"/>`;
  /* ring light, left */
  s += `<circle cx="130" cy="330" r="58" fill="none" stroke="${WHITE}" stroke-width="16"/>`;
  s += `<circle cx="130" cy="330" r="58" fill="none" stroke="${LIME}" stroke-width="16" stroke-linecap="round" stroke-dasharray="96 260" transform="rotate(-30 130 330)"/>`;
  s += `<rect x="124" y="388" width="12" height="130" rx="6" fill="${MID}"/>`;
  s += `<ellipse cx="130" cy="520" rx="40" ry="9" fill="${MID}"/>`;
  s += ball(716, 150, 20, LIME);
  s += ball(80, 170, 14, SKY);
  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 4. "your students" — three clay portraits in a row                         */
/* -------------------------------------------------------------------------- */
export const students = () => {
  const w = 800, h = 560;
  let s = '';
  s += `<circle cx="400" cy="290" r="212" fill="${ICE}"/>`;
  s += person(214, 300, 1.05, { skin: 1, hair: 0, cloth: NAVY, style: 1 });
  s += person(400, 268, 1.25, { skin: 0, hair: 2, cloth: MID, style: 0 });
  s += person(586, 300, 1.05, { skin: 3, hair: 3, cloth: SKY, style: 2 });
  s += ball(120, 430, 18, LIME);
  s += ball(690, 150, 22, NAVY);
  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 5. "the library" — books, a drive and a lens                               */
/* -------------------------------------------------------------------------- */
export const library = () => {
  const w = 800, h = 800;
  let s = '';
  s += `<ellipse cx="400" cy="700" rx="280" ry="36" fill="${DEEP}" opacity="0.06"/>`;
  const books = [
    [150, 520, 300, 44, NAVY],
    [172, 470, 268, 46, SKY],
    [136, 420, 320, 46, LIME],
    [190, 370, 240, 44, MID],
  ];
  books.forEach(([x, y, bw, bh, c], i) => {
    s += block(x, y, bw, bh, 12, c, i % 2 ? 1.2 : -1.2);
    s += `<rect x="${x + 26}" y="${y + bh / 2 - 4}" width="${bw * 0.3}" height="8" rx="4" fill="${i === 2 ? NAVY : WHITE}" opacity="0.55"/>`;
  });
  /* drive */
  s += block(468, 470, 190, 120, 18, ICE, 4);
  s += `<rect x="486" y="494" width="154" height="18" rx="9" fill="${WHITE}"/>`;
  s += `<circle cx="512" cy="556" r="10" fill="${LIME}"/>`;
  s += `<rect x="534" y="550" width="86" height="12" rx="6" fill="${WHITE}"/>`;
  /* camera lens */
  s += `<circle cx="560" cy="330" r="86" fill="${NAVY}"/>`;
  s += `<circle cx="560" cy="330" r="66" fill="${MID}"/>`;
  s += `<circle cx="560" cy="330" r="42" fill="${DEEP}"/>`;
  s += `<circle cx="546" cy="314" r="14" fill="${SKY}" opacity="0.75"/>`;
  /* reading sheet */
  s += `<g transform="rotate(-5 300 220)"><rect x="210" y="150" width="170" height="210" rx="14" fill="${WHITE}" stroke="${NAVY}" stroke-opacity="0.12"/>
    <rect x="232" y="180" width="126" height="9" rx="4.5" fill="${SKY}" opacity="0.5"/>
    <rect x="232" y="202" width="100" height="9" rx="4.5" fill="${ICE}"/>
    <rect x="232" y="224" width="116" height="9" rx="4.5" fill="${ICE}"/>
    <rect x="232" y="246" width="80" height="9" rx="4.5" fill="${ICE}"/></g>`;
  s += ball(690, 620, 20, LIME);
  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 6. "get paid" — wallet, card, upward arrow                                 */
/* -------------------------------------------------------------------------- */
export const paid = () => {
  const w = 800, h = 600;
  let s = '';
  s += `<ellipse cx="400" cy="530" rx="290" ry="30" fill="${DEEP}" opacity="0.06"/>`;
  s += block(220, 300, 300, 200, 26, NAVY, -3);
  s += block(246, 330, 248, 54, 16, MID, -3);
  s += block(200, 236, 240, 150, 18, WHITE, -12);
  s += `<rect x="224" y="276" width="70" height="46" rx="10" fill="${LIME}"/>`;
  s += `<rect x="224" y="344" width="150" height="10" rx="5" fill="${ICE}"/>`;
  s += `<circle cx="420" cy="352" r="16" fill="${LIME}"/>`;
  /* arrow */
  s += `<g transform="translate(560 300)">
    <path d="M0 130V-30" stroke="${LIME}" stroke-width="18" stroke-linecap="round"/>
    <path d="M-44 -4 0 -58l44 54" fill="none" stroke="${LIME}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;
  s += ball(150, 380, 22, SKY);
  s += ball(690, 160, 16, LIME);
  return wrap(w, h, s);
};

/* -------------------------------------------------------------------------- */
/* 7. support — a tilted empty frame with a brush                             */
/* -------------------------------------------------------------------------- */
export const frame = () => {
  const w = 800, h = 800;
  let s = '';
  s += `<ellipse cx="400" cy="690" rx="250" ry="32" fill="${DEEP}" opacity="0.06"/>`;
  s += `<g transform="rotate(-9 380 400)">
    <rect x="200" y="220" width="360" height="300" rx="20" fill="${WHITE}" stroke="${NAVY}" stroke-opacity="0.12"/>
    <rect x="222" y="242" width="316" height="256" rx="12" fill="${ICE}"/>
    <circle cx="300" cy="330" r="34" fill="${SKY}"/>
    <path d="M222 470l92-84 70 58 84-96 68 122v40H222z" fill="${NAVY}" opacity="0.15"/>
  </g>`;
  /* brush */
  s += `<g transform="rotate(32 560 560)">
    <rect x="548" y="300" width="26" height="210" rx="13" fill="${NAVY}"/>
    <rect x="544" y="500" width="34" height="26" rx="6" fill="${MID}"/>
    <path d="M544 526h34l-17 74z" fill="${LIME}"/>
  </g>`;
  s += ball(160, 240, 26, LIME);
  s += ball(660, 660, 18, SKY);
  return wrap(w, h, s);
};

/* decorative loop-line swash that sits under the H1 */
export const swash = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 60" fill="none" aria-hidden="true" preserveAspectRatio="none">
  <path d="M6 44C60 18 132 12 208 20c76 8 122 26 196 22 62-3 118-16 206-8" stroke="#C8F560" stroke-width="10" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
</svg>`;

/* the connector that threads the four steps */
export const connector = (w = 1200, h = 120) => {
  let d = `M0 ${h / 2}`;
  const seg = w / 4;
  for (let i = 0; i < 4; i++) {
    d += ` C${i * seg + seg * 0.3} ${h / 2 - 46} ${i * seg + seg * 0.7} ${h / 2 - 46} ${(i + 1) * seg} ${h / 2}`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" aria-hidden="true" preserveAspectRatio="none">
    <path d="${d}" stroke="#C8F560" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
  </svg>`;
};

export const connectorVertical = (w = 40, h = 720) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="none" aria-hidden="true" preserveAspectRatio="none">
  <path d="M${w / 2} 0 ${Array.from({ length: 4 }, (_, i) =>
    `C${w / 2 + 22} ${i * 180 + 46} ${w / 2 - 22} ${i * 180 + 134} ${w / 2} ${(i + 1) * 180}`
  ).join(' ')}" stroke="#C8F560" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
</svg>`;

export const all = {
  'folio-hero': hero(),
  'folio-pricing': pricing(),
  'folio-live': live(),
  'folio-students': students(),
  'folio-library': library(),
  'folio-paid': paid(),
  'folio-frame': frame(),
};
