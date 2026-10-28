# Web Academy — LMS Theme Family

**Four production website templates, one brand system.**
Design & UX blueprint set · prepared as an execution specification for an AI build agent.

---

## 1. What is in this repository

| # | Folder | Template | Type | Reference image | Temperature |
|---|--------|----------|------|-----------------|-------------|
| 01 | `01-nova-academy/` | **Nova** | Full website (multi-page) | `website1.jpg` | Light · playful · consumer |
| 02 | `02-atelier-academy/` | **Atelier** | Full website (multi-page) | `website2.jpg` | Light · editorial · enterprise |
| 03 | `03-aero-academy/` | **Aero** | Full website (multi-page) | `website3.jpg` | Dark · cinematic · live |
| 04 | `04-folio-landing/` | **Folio** | Landing page (single page) | `landing.jpg` | Light · conversion · creator |

Supporting source files (read-only references, never modified):

| File | Role |
|------|------|
| `VisualIdentity.pdf` | **The brand law.** 27 pages: story, logo construction, palette, typography, graphic elements, applications. |
| `website1.jpg` `website2.jpg` `website3.jpg` `landing.jpg` | Layout + composition + motion references, one per template. |

Each template folder contains a `PLAN.md`. The plan is the contract: an execution agent builds from it and a reviewer accepts or rejects against it. No code exists yet — plans only.

---

## 2. The core design problem, and its resolution

The four reference images each carry **their own palette**: pastel pink/lavender (website1), warm cream/sage (website2), powder-blue sky (website3), yellow/blue (landing).
The brand identity carries **one locked palette**: Navy `#012A5D` + Signal Lime `#C8F560` + four support tones, with a mandated 60/25/10/5 proportion.

You cannot obey both literally. The resolution — and the single most important rule in this repo:

> **Inherit the reference's composition, rhythm, grid and motion language.
> Replace its palette, typefaces and iconography with the brand's.
> A template is a *temperature* of the brand, never a different brand.**

That produces a coherent family that still reads as four distinct products:

- **Nova** inherits website1's overlapping stat band, icon-ring category cards, and floating 3D confetti — recoloured to Ice/Sky/Lime mesh, with Signal Lime replacing coral as the single spark.
- **Atelier** inherits website2's centered logo nav, the arc of portraits, and the bento mosaic — cream becomes White/Ice paper, sage blocks become Navy Mid/Sky tints. The reference's *serif-vs-sans* contrast is translated into **light-weight vs bold-weight display contrast**, because the brand permits exactly one Latin family.
- **Aero** inherits website3's floating glass pill nav, the live video stage, and the mixed-weight headline — powder-blue sky becomes a **Navy Deep night sky** with the brand dot grid. The reference's *italic serif emphasis* is translated into **JetBrains Mono + Signal Lime emphasis**, which is a sanctioned brand code device.
- **Folio** inherits the landing page's step cards, squiggle connector, logo strip and newsletter band — yellow becomes Signal Lime, blue becomes Navy, and the 3D character illustration style is re-rendered in brand colours because the audience is visual, so the imagery *is* the argument.

---

## 3. Brand law (extracted verbatim from `VisualIdentity.pdf`)

These constants are **identical in all four templates** and are defined once in `shared/tokens/brand.css`.

### 3.1 Colour

| Token | HEX | Role in deck | Proportion |
|-------|-----|--------------|-----------|
| `--wa-navy` | `#012A5D` | Primary, from the logo | 60% (with Navy Deep) |
| `--wa-navy-deep` | `#001A3D` | Dark grounds | — |
| `--wa-navy-mid` | `#14427F` | Panels on dark | — |
| `--wa-sky` | `#8DB8FF` | Support on navy | 25% (with White/Ice) |
| `--wa-ice` | `#EAF1FB` | Light tint | — |
| `--wa-white` | `#FFFFFF` | Paper | — |
| `--wa-lime` | `#C8F560` | Accent — **one spark per layout** | 10% |
| — | — | Whitespace / rest | 5% |

### 3.2 Contrast law — measured, non-negotiable

| Pairing | Ratio | Verdict |
|---------|-------|---------|
| Navy on White | 14.09:1 | ✅ any size |
| White on Navy | 14.09:1 | ✅ any size |
| Navy on Lime | 11.19:1 | ✅ any size — **the primary CTA pairing** |
| Lime on Navy Deep | 13.73:1 | ✅ any size |
| White on Navy Mid | 9.93:1 | ✅ any size |
| Navy on Ice | 12.39:1 | ✅ any size |
| Sky on Navy / Navy on Sky | 7.00:1 | ✅ any size |
| Sky on Navy Deep | 8.59:1 | ✅ any size |
| `#14427F` on White | 9.93:1 | ✅ any size |
| **Sky on White** | **2.01:1** | ❌ **graphics only** — never text, never a meaningful icon |
| **Lime on White** | **1.26:1** | ❌ **forbidden** — lime is a *fill*, never ink on light |
| **Navy Deep on Navy Mid** | **1.74:1** | ❌ surfaces only; separate them with a 1px `rgba(141,184,255,.24)` rule |

The deck lists "Lime on white" and "Sky on white" as *graphic* pairings. The build must never use either for text, icons that carry meaning, or focus rings on light grounds. This is where a careless implementation of the brand breaks WCAG 1.4.3.

### 3.3 Typography

The deck specifies **Milan Display** (Arabic headlines), **Tajarib** (Arabic text), **Glock Grotesque** (all Latin). All three are commercial and unavailable to this build. Substitution, locked at family level:

| Deck face | Substitute | Source | Weights used |
|-----------|-----------|--------|--------------|
| Glock Grotesque | **Lexend** (variable) | `@fontsource-variable/lexend` | 200 · 300 · 400 · 500 · 600 · 700 |
| JetBrains Mono (deck's own code face) | **JetBrains Mono** (variable) | `@fontsource-variable/jetbrains-mono` | 400 · 500 |
| Milan Display (AR headlines) | **Alexandria** Black, `Reem Kufi` as calligraphic alternate | `@fontsource-variable/alexandria`, `@fontsource/reem-kufi` | 700 · 900 |
| Tajarib (AR text) | **Alexandria** | same | 300 · 400 · 500 · 700 |

Rules: woff2 only, subset per script, `font-display: swap`, max **2** preloaded faces per page, total font payload ≤ 120KB. Never pull fonts from a CDN at runtime.

### 3.4 Logo system — verified geometry

The mark is **true vector inside the PDF** (page 7, fill exactly `#012A5D`), so it must be extracted, never traced from a screenshot.

Measured from the source at 288dpi:

| Property | Measured | Normalised (100-unit box) |
|----------|----------|---------------------------|
| Icon bounding box | 231.6 × 231.6 pt (square) | `viewBox="0 0 100 100"` |
| Ring outer edge | equals the bounding box | outer radius **50** |
| Ring stroke width | 15.7–16.0 pt | **6.84** |
| Ring centreline radius | 231.6/2 − 15.85/2 | **46.56** |
| Inner W stroke width | 15.7 pt — **same as ring** | **6.84** |
| W (mark) box | 161 × 170 pt | 69.5 × 73.3, centred → x 15.2, y 16.6 |
| Round caps / joins | yes, terminal ends are round | `stroke-linecap="round" stroke-linejoin="round"` |

**One stroke weight governs the whole mark: 6.84% of the icon width.** Any wrapper that draws the mark with a number other than 6.84 (in a 100 box) is out of brand.

Asset set required in every template (`/assets/brand/`): `wa-icon.svg`, `wa-mark.svg`, `wa-horizontal.svg`, `wa-stacked.svg`, `wa-wordmark.svg`, `wa-lockup-{template}.svg`, plus `favicon.svg`, `app-icon-512.png`, `og-1200x630.png`. Colour versions: navy on white (default), white on navy, navy on lime, lime icon on navy deep, black 1-colour.

Misuse, per the deck: don't stretch, rotate, recolour, retype, place lime on light grounds, or place navy on dark grounds.

### 3.5 Graphic elements (the brand's own texture kit)

- **Loop line** — the W's single unrolled stroke with round ends. Lime on navy, navy on white. Used as section divider, connector, and the primary scroll-draw device.
- **Ridges** — concentric arches at the logo's spacing, radiating from the W. Trust moments only (certificates, testimonials, security). **Never filled.**
- **Dot grid** — small dots on a regular pitch, **dark grounds only**. Pitch 24px, radius 1px, colour `rgba(141,184,255,.28)`.
- **Code devices** — `// LABELS`, `<Brackets />`, `Highlight` blocks, cursor `▌`, and real code blocks in JetBrains Mono.

Hue-neutral derivatives (tints used for surfaces) are permitted only as mixes of a brand colour with white/navy, never as new hues. **No fifth colour may appear in any template** — including the references' pink, cream, sage and yellow.

---

## 4. Family-wide requirements

1. **One hub, four templates.** `/index.html` at repo root is the Themes Hub. Every template's navbar carries a `Themes` item whose dropdown lists Nova, Atelier, Aero, Folio; every template also carries a floating switcher (bottom-right) that expands to four logo chips. All cross-template links are relative and must work from any page depth, including opened via `file://`.
2. **Full page set** per website template: Home, About, Courses, Course detail, Live Sessions, Session detail, Library, Library item detail, Blog, Blog post, Instructor/Faculty detail, Contact, plus Legal and 404. Aero and Atelier add their own commercial pages. Folio is a single landing page with anchored sections and optional modal routes.
3. **Every dynamic item has a detail page.** No dead cards. If a card exists, its destination exists.
4. **Content is placeholder, structure is not.** Copy is obviously mock (`Course title`, lorem in long-form only), but field names, lengths, taxonomies and the content model are final and shared.
5. **Performance budget** (per page, mobile 4G, Lighthouse 12): LCP ≤ 1.8s · INP ≤ 200ms · CLS ≤ 0.05 · TBT ≤ 200ms · JS ≤ 45KB gz (Folio ≤ 30KB) · CSS ≤ 30KB gz · images AVIF/WebP with intrinsic dimensions · zero layout shift from fonts or embeds.
6. **Accessibility**: WCAG 2.2 AA. Visible focus everywhere, 44×44 targets, full keyboard operation of carousels/tabs/accordions, `prefers-reduced-motion` honoured, landmarks + skip link, form errors announced.
7. **Bilingual-ready**: English is the build language, but all layout uses CSS logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) and every string sits in the content layer, so `dir="rtl"` works without a rebuild. The brand specifies Arabic faces — shipping an Arabic variant is a Phase 2 milestone, not a redesign.
8. **Technology (locked)**: static output. Eleventy 3 + Nunjucks per template, Lightning CSS, esbuild, sharp. No React/Vue/Tailwind/Bootstrap. Output `dist/` is plain HTML/CSS/ESM and must run on any static host with no server.

---

## 5. Reading order for the executing agent

1. This file — brand law and family rules.
2. The template's `PLAN.md` — read fully before writing a line.
3. Build in the order given in the plan's **§14 Build sequence**. Do not jump to interior pages before the design system and logo assets pass their acceptance criteria.
4. Self-verify against **§15 Acceptance criteria**; every criterion has an ID and must be reported as PASS/FAIL with evidence.

---

## 6. What "done" means

A template is accepted when: its `dist/` builds clean, every listed page exists and is reachable from the navbar, the logo assets match the measured geometry in §3.4, the motion system degrades correctly under `prefers-reduced-motion`, the contrast law in §3.2 holds on every text node, the performance budget is met on a real throttled run, and the template still looks like it belongs to the same family as the other three.
