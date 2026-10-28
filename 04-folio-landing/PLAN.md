# 04 · FOLIO
## Execution plan — landing page template (for visual instructors)

> **Agent contract.** This document is self-contained. Read it end to end before writing code.
> Reference image: `landing.jpg` · Brand law: `VisualIdentity.pdf` (+ repo `README.md` §3).
> Deliverable: `04-folio-landing/dist/` — a **single-page** static site (HTML/CSS/ESM) plus 4 lightweight sub-pages.

---

## 1. Template charter

| Field | Value |
|-------|-------|
| Name | **Folio** |
| Co-brand lockup | `◉ Web Academy` + chip `FOR CREATORS` (JetBrains Mono 11/500, `letter-spacing:.18em`, navy on lime, 3px radius) |
| Type | **Landing page** (single scroll, anchored sections) + 4 support pages |
| Audience | **Visual instructors**: illustrators, graphic designers, motion designers, 3D artists, photographers, typographers, UI/UX designers — people who teach with their eyes and whose work *is* the proof |
| Job to be done | "Show me that this platform will make my work look as good as it already is, and that I can actually earn from it — then let me start in under two minutes." |
| Conversion goal (primary) | `Start teaching free` → the 3-field start form (name, email, what you teach) |
| Secondary conversion | `Download the creator kit` (PDF) — lower commitment, captured for nurture |
| Tertiary | Newsletter (`Stay in the loop`) |
| Success metric (design) | Hero CTA click-through, scroll depth to the proof section, form completion rate |
| Emotional register | Portfolio-grade, confident, craft-proud, fast. The page should feel **art-directed**, not assembled. |
| Signature | The **loop-line connector** that draws itself through the 4 "how it works" steps + a **clay-3D illustration system** rendered in brand colours |
| One-line brief | *A gallery that converts: the instructor's work is the hero, and the brand is the frame around it.* |

### 1.1 Why this is built differently from the three websites

A landing page is not a small website. Three rules override everything:

1. **One page, one decision.** Every section either builds desire or removes friction for *the same* action (`Start teaching free`). No section may introduce a different primary action.
2. **Scroll is the narrative.** The order is fixed by the AIDA/PAS logic in §5 — an agent must not reorder sections for layout convenience.
3. **Inventory is the product.** For a visual-instructor audience, the *quality of the imagery and the smoothness of the motion* is the sales argument. This template therefore has the **strictest motion polish requirement** and the **tightest performance budget** in the family (≤ 30KB JS gz) — a landing page that stutters loses the argument it is making.

---

## 2. Reference deconstruction (`landing.jpg`)

| # | Element in reference | Reference treatment | Folio treatment (build this) |
|---|----------------------|---------------------|------------------------------|
| F1 | Hero ground | Near-white with a very soft blue-tinted block behind the illustration; clean white elsewhere | **White paper** with one large `--wa-ice` rounded block (radius 40) behind the hero artwork, bleeding to the inline-end edge. No blue wash, no gradients. A single 1px `rgba(1,42,93,.08)` frame is optional — use only on the hero block. |
| F2 | Accent colour | Sunny yellow (`#FFD84D`) used for the logo, an underline scribble, buttons, and the newsletter button | **Signal Lime `#C8F560`** for exactly that role — underlines, the newsletter button, one spark per viewport. Because lime cannot be ink on white, **lime accents on white are always either a filled shape with navy text, or a thick (≥4px) underline, or a brush-stroke swash behind navy text**. Never lime text on white. |
| F3 | Primary colour | Bright blue (`#3B82F6`) for buttons, links, the newsletter band | **Navy `#012A5D`** for primary buttons (white label, 14.09:1), links, and the newsletter band ground (white text). The reference's blue contradicts the palette and must not appear. |
| F4 | Nav | Logo left, 4 centred links, `Sign In` pill right | Logo left · 4 anchor links centred (`How it works · What you get · Work · Pricing`) · right: `Themes ◆` text link, `Log in` ghost, `Start teaching` lime pill. 72px, transparent over the hero, solid white + hairline + `--shadow-pill` after 24px. |
| F5 | H1 treatment | Bold 2-line H1 with a hand-drawn yellow underline swash beneath “Digital Literacy” | **Keep the swash, brand it**: an SVG loop-line swash (2 strokes, 6px, round caps) in lime drawn under the last two words. It **draws itself once** on load (600ms, 200ms delay, `stroke-dashoffset`) and stays — it is the page's first motion beat and it echoes the brand's loop. |
| F6 | Hero CTA pair | Blue pill `Get Started` + a circular arrow button beside it (2 elements, confusing) | **One primary + one quiet secondary**: `Start teaching free` (lime pill, 52px, navy label) + `See how it works ↓` (text link with a 20px circle-arrow that rotates 45° on hover, scrolls to §5.3). Never two filled buttons. |
| F7 | Feature bullets | 3 rows with blue check circles | **3 mono bullets** with lime tick-in-circle icons (navy glyph on lime fill): `No platform fee for the first 3 months` · `Your students, your pricing` · `Live + self-paced in one place`. 13px, navy 72%. |
| F8 | Logo strip | Udemy / Coursera / Facebook / Google in grey, on a white band | **Partner/institution strip** on `--wa-ice`: 5 wordmarks in navy 40% at 22px height, 1px rules above and below. Third-party logos are **placeholders** (fictional names) — never ship real competitor marks. Optional second row: “Trusted by teams at…” with 4 marks. |
| F9 | "How is work" step cards | 4 pastel cards (blue/yellow/lavender/pink) each with a circular icon + a small numbered badge | **4 step cards on white with a 1px hairline**, no pastels. Each has a 56px icon plate (`--wa-ice`, radius 16) with a navy line icon, a **mono step number** `01–04` in navy 40% top-inline-end, a title (`--fs-h4`), and 2 lines of body. Between them runs the **loop-line connector** (§4.3 · M2) — a single lime stroke that draws left→right as the row enters view and threads *behind* the cards. This is the template's signature moment. |
| F10 | Alternating feature block | 3D illustration left, headline + bullets + CTA right | **Keep the alternation** (image/copy, then copy/image at ≥1024; always image-first on mobile). The 3D illustration is a **brand-rendered clay 3D** artwork (§3.5). On the copy side: mono kicker, H2, 2-line lede, 4 check rows in a 2-col grid, and a navy ghost `Explore the tools →`. |
| F11 | Course cards | 3 cards: image, `UI/UX Course` chip, title, `9h 20m · 14 Lesson`, `View More` pill | **Keep the anatomy, brand the chrome**: 4:3 media with a lime `COURSE` chip, title (2 lines), meta in mono (`9h 20m · 14 lessons`), and the whole card a link. Hover: media 1.03 + card lift 4px + a 1px navy border fades in. Section header carries `View all →`. |
| F12 | Testimonials | 2 cards, avatar + name + city, quote, big quote glyphs, arrow pair | **Keep**: 3 cards in a snap rail, 1.25 peek on mobile, quote glyph in lime at 48px (it's a *shape*, so lime is legal here), avatar 40px, name + role. Arrows are 40px hairline circles; dots below; drag + keyboard; **no autoplay**. |
| F13 | Newsletter band | Full-width blue band, cloud/wave pattern, white headline, inline email + yellow button | **Navy → navy-deep band** with the dot grid at 6% and a loop line at the bottom edge. Headline white, sub in white 72%, then a single inline form: 48px input (white 12% fill, 1px white 20% border, white text) + lime button with navy label. On mobile it stacks, button full width. Success state replaces the form with a lime tick + one line. |
| F14 | Squiggly yellow line between sections | A decorative hand-drawn line linking two blocks | **One loop-line connector only** — in §5.3 (the steps). Not scattered between sections; repetition would cheapen it. |
| F15 | Footer | 4 columns + logo + tagline + social icons | **Keep**: logo + tagline + 4 social glyphs | *Learn · Teach · Company · Resources* columns | a bottom bar with `© 2026`, legal links, and `// keep looping` mono at 30%. |
| F16 | Section density | Very compact — many sections per screen | **Loosen it**: `clamp(72px, 9vw, 128px)` section padding, max-width 1200, 12-col grid, 24px gutter. The reference is cramped; Folio must breathe. |

### 2.1 Rejected from the reference

- Yellow `#FFD84D`, bright blue `#3B82F6`, lavender and pink cards.
- Real competitor logos (Udemy/Coursera/Facebook/Google) — replace with fictional placeholders.
- Two filled CTAs side by side in the hero.
- The tiny 11px card meta and 11.5px body copy — Folio's floor is 14px for meta and 16px for body.
- Decorative squiggles in more than one place.
- Emoji-style illustrations — the artwork must be art-directed (see §3.5).

---

## 3. Design system

### 3.1 Colour (Folio usage map)

Distribution: **White 58% · Ice 20% · Navy family 14% · Lime 8%**.

| Use | Value |
|-----|-------|
| Canvas | `--wa-white` |
| Blocks | `--wa-ice` (hero block, partner strip, the “everything” section, step row) |
| Ink | `--wa-navy` |
| Secondary / tertiary ink | navy 70% / navy 50% |
| Primary button | `--wa-lime` fill, `--wa-navy` label (11.19:1) |
| Secondary button | transparent, 1px navy 18%, navy label; hover navy fill / white label |
| Newsletter band | `--wa-navy` → `--wa-navy-deep`; text white / white 72% |
| Accent shapes | `--wa-lime` — swash, quote glyphs, tick fills, chips, progress |
| Support | `--wa-sky` — only inside illustrations, chart bars, and 24% hover fills |

**Lime-on-white legality (critical):** lime may appear on white **only** as (a) a filled shape carrying navy text, (b) a stroke ≥ 4px, or (c) a decorative illustration fill. Never as a glyph, border thinner than 4px, or text.

### 3.2 Type scale

| Token | Size | LH | Tracking | Weight |
|-------|------|----|----------|--------|
| `--fs-display` | 38 → 68 | 1.0 | −.04em | 600 |
| `--fs-h1` | 32 → 52 | 1.05 | −.035em | 600 |
| `--fs-h2` | 28 → 44 | 1.08 | −.03em | 600 |
| `--fs-h3` | 22 → 28 | 1.2 | −.02em | 500 |
| `--fs-h4` | 18 → 20 | 1.3 | −.015em | 500 |
| `--fs-lede` | 17 → 19 | 1.6 | 0 | 400 |
| `--fs-body` | 16 | 1.65 | 0 | 400 |
| `--fs-small` | 14 | 1.5 | 0 | 400 |
| `--fs-mono` | 11 → 12 | 1.4 | .16em | 500 uppercase |
| `--fs-numeric` | 26 → 36 | 1 | −.02em | 700 tabular |

The H1 is capped at **2 lines at ≥1024** and 3 lines at 390. The swash sits under the whole second line, not under a random word.

### 3.3 Grid & spacing

- 12 columns, gutter 24 (mobile 16), max **1200**, padding 20 → 32 → 48.
- Section rhythm `clamp(72px, 9vw, 128px)`; 20px between a head and its content; 32px between headline and lede.
- The 4-step row: `grid-template-columns: repeat(4, 1fr)` at ≥1024; 2×2 at 640–1023; 1 col below 640 with the connector vertical.
- Radius: 8 (chips) · 16 (icon plates, small cards) · 24 (cards) · 40 (hero block) · 999 (pills).
- Elevation: `--shadow-pill` (nav, chips) and `--shadow-card` (hover only). Nothing else. Cards are flat with hairlines.

### 3.4 Logo system (Folio)

| Asset | Variants | Notes |
|-------|----------|-------|
| `wa-horizontal.svg` | navy, white | 30px in the nav |
| `wa-lockup-folio.svg` | navy / white, with the `FOR CREATORS` chip on lime | Nav + footer |
| `favicon.svg` | icon, navy on white | |
| `og-folio-1200x630.png` | white, display line, lime swash under the last word, wordmark bottom-left, one portfolio thumbnail right | |
| `wa-icon-watermark.svg` | navy 8% | Behind the form success state |

**Nav logo motion (Folio's one logo gesture):** the mark's inner loop traces itself once on load (700ms, 300ms delay, `stroke-dashoffset`, 1 iteration); the wordmark is static — a landing page gets one logo animation, not three. On scroll past 24px the nav becomes solid and the logo does **not** change size (no layout shift on a page people scroll fast). Under reduced motion: no draw, static logo.

**Do not** repeat the logo inside the page body. It appears in the nav, the footer, and the form's success state only.

### 3.5 The illustration system (Folio's biggest execution risk)

The reference's 3D characters are the reason the page feels friendly and premium. Reproducing that **in brand colours** is the single hardest art-direction task in this whole delivery, so it is specified precisely:

- **Style**: soft clay/bubble 3D — rounded volumes, matte finish, one soft key light from the upper-inline-start, a warm bounce on the opposite side, a barely-visible environment reflection, no hard specular highlights, no outlined edges.
- **Palette, strictly**: navy for structure/furniture/dark objects (`#012A5D` / `#001A3D`), sky for mid-tones and fabric shadows (`#8DB8FF`), ice for light surfaces and paper (`#EAF1FB`), white for highlights, **lime only as a small accent object** (a mug, a pencil, a cursor, a plant pot) — never as skin or as large furniture.
- **Skin tones**: keep a realistic, diverse range — do **not** recolour humans to brand colours. Only the *objects* take the palette.
- **Content per artwork** (7 pieces minimum):
  1. Hero — a visual instructor at a desk: drawing tablet + stylus, a second monitor with a colour wheel, a ring light, a plant, a coffee, and three finished frames pinned above (the "portfolio wall"). 4:5, 1600px tall master, transparent background.
  2. "Your work, your pricing" — hands arranging price tags and a colour fan deck. 1:1.
  3. "Teach live" — a small ring-lit camera on a tripod facing a laptop showing a live room. 4:3.
  4. "Your students" — 3 clay avatars of different ages/disciplines in a semicircle. 3:2.
  5. "The library" — stacked books + a hard drive + a lens. 1:1.
  6. "Get paid" — a wallet, a card, and a small lime upward arrow. 4:3.
  7. Empty/support — a tilted frame with a paintbrush. 1:1.
- **Production**: generated as high-res masters, then delivered as AVIF/WebP at 2 widths with transparent backgrounds where the artwork overlaps a colour block. Every piece must sit on white **and** on ice without a visible edge — so no drop shadows baked in; the shadow is a CSS `filter: drop-shadow(0 24px 32px rgba(1,42,93,.10))` on the `<img>` so it can be tuned per surface.
- **Consistency gate**: all 7 must share camera height, light direction and stroke-free matte finish. If one looks like it came from a different prompt, it is rejected — spot-check them side by side on a contact sheet at 240px before integration.

---

## 4. Motion system (Folio)

### 4.1 Principles

1. **The page must feel fast, and then feel alive.** First meaningful paint before motion; motion only after the hero image is decoded.
2. **One signature moment** (the connector draw in §5.3). Everything else supports it.
3. **Motion is scroll-driven, not time-driven,** except the hero's three entry beats.
4. **No motion may move text horizontally.** Vertical reveals and opacity only.
5. Every animation is defined with its reduced-motion twin.

### 4.2 Tokens

`--dur-fast 160` · `--dur-base 260` · `--dur-slow 520` · `--dur-cinema 800` · easing `--ease-out-expo` `cubic-bezier(.16,1,.3,1)`, `--ease-loop` `cubic-bezier(.65,0,.35,1)`, `--ease-spring` `cubic-bezier(.34,1.56,.64,1)` (micro-interactions only, max 1 per viewport) · stagger 60ms, cap 480ms.

### 4.3 Signature animations (Folio's nine)

| ID | Name | Where | Spec |
|----|------|-------|------|
| M1 | **Hero entrance** | Hero | Three beats, once: (1) H1 lines mask up 100%→0, 520ms, 80ms apart, starting at 120ms; (2) the lime swash draws 0→100% `stroke-dashoffset` over 600ms starting at 560ms; (3) the illustration, bullets, CTAs and bullets rise 16px + fade over 400ms starting at 700ms, staggered 60ms. Total 1.4s. Nothing before 120ms so the LCP image paints first. |
| M2 | **The connector draw** | Step row (§5.3) | A single SVG path (a gentle S-curve of loops, 2px lime) spanning the row width behind the cards. On 25% visibility: `stroke-dasharray: L; stroke-dashoffset: L→0` over 1400ms `--ease-loop`, once. Then a 6px lime dot travels the path once (600ms) and settles at the last card. On mobile the path is vertical and draws top→bottom. Reduced motion: path fully drawn, no dot travel. |
| M3 | **Illustration float** | All 7 artworks | A single 8s `translateY(±6px) rotate(±0.6deg)` loop, `--ease-loop`, alternating. **Only one illustration animates at a time** (the one in view); pause off-screen via IntersectionObserver. Reduced motion: static. |
| M4 | **Rise reveal** | All sections | `opacity 0→1` + `translateY(20px→0)`, 520ms, stagger 60ms, max 6 children, once at 15% visibility. One shared observer. |
| M5 | **Card hover** | Course + step cards | Lift 4px, `--shadow-card`, image 1.03 (inside `overflow:hidden`), border 0→1px navy 14%; 260ms. Touch: no hover state — instead the card shows its border at rest. |
| M6 | **Testimonial rail** | §5.6 | Snap rail with pointer drag, arrow buttons, dots; translate by card width + gap, 420ms `--ease-loop`. No autoplay. |
| M7 | **Sticky CTA arrival** | Global mobile | After the hero leaves the viewport, a 64px bottom bar slides up (280ms) with `Start teaching free`; it hides again when the newsletter block is in view (don't compete). `env(safe-area-inset-bottom)` respected. |
| M8 | **Form micro-joy** | Primary form | On successful submit: the form cross-fades to a confirmation panel, a 48px lime circle scales in (`--ease-spring`, 420ms) with a navy tick, and the loop line beneath draws once. No confetti, no bouncing emoji. |
| M9 | **Scroll progress** | Global | A 2px lime bar at the very top, `transform: scaleX()` tied to scroll progress, `requestAnimationFrame`-throttled, no layout reads on scroll (use `scrollY / (height - innerHeight)`). Wait for reduced motion: keep it (it's orientation, not decoration) but remove any transition. |

### 4.4 Forbidden

Scroll hijacking · pinned/sticky storytelling sections · horizontal scroll sections · autoplay video · cursor followers · text that types itself · animated gradients · more than one looping element in view · any animation that delays interactivity.

---

## 5. The page (single scroll) — section order is fixed

`/` renders in this exact order. Anchors are the nav targets.

| # | ID | Section | Purpose in the funnel | Conversion role |
|---|----|---------|----------------------|-----------------|
| 5.1 | `#hero` | Hero | Promise + audience + proof-of-craft | Hook |
| 5.2 | `#trust` | Partner strip | Borrowed credibility | Reassure |
| 5.3 | `#how` | How it works (4 steps) | Remove "how hard is this?" | Reduce friction |
| 5.4 | `#everything` | What you get (alternating) | Capability proof | Build desire |
| 5.5 | `#work` | Course/work showcase | Show what success looks like | Desire → intent |
| 5.6 | `#voices` | Instructor testimonials | Peer proof from people like them | Trust |
| 5.7 | `#pricing` | Simple pricing | Remove cost anxiety | Remove objection |
| 5.8 | `#faq` | FAQ | Remove last objections | Remove objection |
| 5.9 | `#start` | Final CTA + form | Convert | Convert |
| 5.10 | `#newsletter` | Newsletter band | Capture the not-ready | Capture |
| 5.11 | — | Footer | Navigation + legal | — |

Support pages (4): `/thank-you/` (post-form), `/creators/` (a long-form version of §5.6 for links), `/legal/{privacy,terms}/`, `/404/`. The landing page itself must be complete without them.

---

### 5.1 Hero

- Grid: 12 cols. Copy 6 cols (start 1), illustration 5 cols (start 8) at ≥1024. Below: stacked, illustration first? **No — copy first on mobile**, illustration second (the H1 must be the first thing painted and read).
- Contents: mono kicker `// FOR VISUAL INSTRUCTORS` with a lime dot · H1 2 lines (`Turn your craft` / `into a classroom.`) with the lime swash under line 2 · lede 2 lines max 46ch (`Illustrators, designers and 3D artists teach on Web Academy. Live or self-paced, your pricing, your audience.`) · CTA row (F6) · 3 mono bullets (F7) · a small proof line (`2,400+ creators teaching · 4.9 avg. rating`) with 3 overlapping 32px avatars.
- The `--wa-ice` block (F1) starts behind the illustration, 40px radius, and extends 48px beyond the viewport edge on the inline-end.
- LCP: the hero illustration. Preload it as AVIF with `fetchpriority="high"`, explicit dimensions (1080×1350), and a navy-tinted LQIP inline ≤ 700 bytes.
- Above the fold at 390×844: kicker, H1 (2 lines at 38px), lede, CTA. The illustration may start below the fold.

### 5.2 Partner strip (`#trust`)

- Ice band, 96px tall, 1px hairlines top and bottom.
- Mono label centred above: `TRUSTED BY CREATORS FROM` (11px, navy 44%).
- 5 fictional wordmarks, navy 40%, 22px tall, 48px gaps; a 40s marquee that pauses on hover/focus and is `aria-hidden` on the duplicate track. On mobile: a 2-row static grid instead of a marquee (marquees are bad on touch).
- Below 640: reduce to 4 marks.

### 5.3 How it works (`#how`) — the signature section

- Head: centred mono kicker `// THREE MINUTES TO GO LIVE`, H2 (`From portfolio to paid, in four steps.`), 2-line lede.
- **4 cards** (F9) on a 12-col grid with 24px gaps, each with the icon plate, mono `01–04`, title, 2 lines of body:
  1. **Upload your work** — 3 portfolio pieces become your first lesson outline.
  2. **Set your price** — choose live, self-paced, or both. You keep 88%.
  3. **Open enrolment** — a public page in the brand's format, your domain, your voice.
  4. **Teach and get paid** — automatic payouts on the 5th, every month.
- **The connector** (M2): an absolutely positioned SVG behind the cards at 32px height, weaving through the vertical centre of the icon plates, with 4 gentle loops (one behind each card). `aria-hidden`, `pointer-events:none`, `z-index:0`; cards are `z-index:1`. Stroke 2px lime, round caps. The path must be generated so it aligns with the icon-plate centres at every breakpoint — build it with `preserveAspectRatio="none"` on a 1200×120 viewBox and set `vector-effect="non-scaling-stroke"` so the stroke never distorts. Mobile: a vertical 40×720 path in the inline-start margin.
- Under the row: one line + `Start teaching free` (secondary, text link with arrow). Do **not** add a second form here.

### 5.4 What you get (`#everything`)

Two alternating blocks (F10), each 6/6 at ≥1024:

- **Block A — "Your work, your pricing."** Artwork 2. Copy: mono kicker, H2, lede, 4 check rows in 2 columns (`Portfolio-grade course pages`, `Live + self-paced in one`, `Set any price, any currency`, `Own your student list`), navy ghost CTA `Explore the tools →`.
- **Block B — "Teach live, from anywhere."** Artwork 3 on the opposite side. Copy with 4 checks (`One-click live rooms`, `Automatic recordings`, `Q&A + chat built in`, `Calendar invites that work`) and a `See a live room →` link.
- Then a **3-up capability trio** (Artwork 5, 6, 4) on ice: *The library* · *Get paid* · *Your students*, each 1:1 artwork at 160px, title, 2 lines. These do not need hovers — they are illustration-led.

### 5.5 Work showcase (`#work`)

- Head row: left H2 (`Made on Web Academy`), right `View all →` text link.
- 3 course cards (F11) using the **brand's course-card component** (shared with Nova so the family feels coherent): 4:3 media, lime `COURSE` chip with navy text, title, mono meta (`9h 20m · 14 lessons`), instructor row. These are the "success looks like this" proof.
- Below: a **portfolio ribbon** — 6 square thumbnails in a horizontally scrollable rail (snap), each a student work with a 1px hairline and a mono caption on hover. `aria-label="Student work gallery"`, keyboard scrollable.
- All cards link to the corresponding course detail on the Nova template (`../../01-nova-academy/courses/{slug}/`) so the landing page demonstrates the family. Document this cross-link in the README of the template.

### 5.6 Instructor voices (`#voices`)

- Head: centred H2 `Instructors who made the switch`.
- Rail of 3 testimonial cards (F12), drag/keyboard/arrows/dots (M6). Each: lime quote glyph (48px), quote (3–4 lines, ≤ 220 chars), 40px avatar, name, discipline + city, and a mono stat line (`14 courses · 3.1K students`).
- Under the rail: `Read more creator stories →` → `/creators/`.
- No star ratings here — instructors don't rate the platform; they *report* on it.

### 5.7 Pricing (`#pricing`)

Two plans, side by side, on ice:

- **Creator (free to start)** — 12% platform fee, live + self-paced, unlimited courses, payouts on the 5th. CTA ghost `Start teaching free`.
- **Studio (lime panel, navy text, "Best for teams")** — 8% fee, 3 seats, priority support, custom domain, advanced analytics. CTA navy filled `Talk to us`.
- A 6-row comparison on hairlines below (fee, live rooms, custom domain, analytics, support, payout speed). Sticky first column on mobile horizontal scroll.
- One line under: `No setup fee. No lock-in. Cancel anytime.` in mono.
- Numbers must be internally consistent everywhere they appear (hero, steps, pricing, FAQ).

### 5.8 FAQ (`#faq`)

6 questions in a single column, max 760px: *Do I need to be a professional?* · *How much does it cost?* · *Can I keep selling elsewhere?* · *Who owns my content?* · *How and when do I get paid?* · *What if nobody enrols?* — each answer ≤ 60 words. `<details>`/`<summary>` with a custom 20px plus that rotates to a minus (200ms), one open at a time, `aria-expanded` handled natively by `<details>`. Include `FAQPage` JSON-LD.

### 5.9 Final CTA (`#start`) — the conversion block

- Two columns at ≥1024: left copy (H2 `Start teaching this week.`, 2 lines of support, 3 mono reassurances, and the 3-part form), right an `--wa-ice` panel with artwork 7 and a single testimonial line.
- **The form** is 3 fields + one button, in this order: *Your name* · *Email* · *What do you teach?* (a `<select>` of 8 disciplines + "Something else"). Then `Start teaching free` (lime, 52px, full width on mobile).
- Validation: on blur + submit, inline, per-field, 14px, icon + text (never colour only), `aria-invalid`, `aria-describedby`, error summary on submit with links, focus moved to the first invalid field. Email pattern must reject obvious invalids but not over-validate. Autocomplete attributes set (`name`, `email`).
- Consent line under the button (12px, navy 50%): `By continuing you agree to the Terms and Privacy Policy.` with real links.
- On success → `/thank-you/` content is shown **inline** (M8) so the user never leaves the page; the URL hash becomes `#welcome`.
- **Every CTA on the page scrolls to and focuses `#start`'s first field.** Track which CTA sent them (`data-source`) and include it as a hidden field. This is the one place the page is allowed to be pushy.

### 5.10 Newsletter (`#newsletter`)

- Navy → navy-deep band, dot grid 6%, loop line along the bottom.
- H2 white (`Keep the loop.`), sub in white 72% (one line), then the inline form (F13): email input + lime button `Subscribe`. 1px lime rule beneath the input on focus.
- Success: the form is replaced by a lime tick + `You're in. Look for one email a month.` (`aria-live="polite"`).
- Hidden from the sticky CTA logic (M7).

### 5.11 Footer (`#footer`)

Per F15, on white with a 1px top rule: logo + tagline + 4 social glyphs (24px, navy 56%, hover navy 100%) · *Learn* (Courses, Live Sessions, Library, Blog — linking to the Nova template) · *Teach* (Start teaching, Pricing, Creator stories, Creator kit) · *Company* (About, Contact, Careers) · *Resources* (Help centre, Status, Accessibility, Brand). Bottom bar: `© 2026 Web Academy`, Privacy, Terms, Cookies, and `// keep looping` in mono lime-adjacent navy 40%. **Include the Themes switcher here as a text row** (`Themes: Nova · Atelier · Aero · Folio`) in addition to §6 — landing pages have no room in the nav for a dropdown.

---

## 6. Themes hand-off

- Nav: a `Themes ◆` text link sits before `Log in` (a dropdown would clutter a conversion nav). It opens a **compact white card** (280px, radius 16, `--shadow-hero`, 1px hairline) listing the 4 templates with a temperature swatch, the current one marked with a lime dot, plus `All themes ↗`.
- **Floating switcher**: a 40px white circle with a 1px hairline and the navy `wa-mark` at 18px, bottom-inline-end 20px. On mobile it lifts above the sticky CTA bar (M7). Expands to 4 horizontal chips on hover/focus.
- **Critical:** the switcher and the sticky CTA must never overlap or fight. Order of stacking on mobile, from the bottom: sticky CTA (full width, 64px) → switcher 20px above it. On desktop: switcher only.
- All cross-template links use `rel()`; the landing page is the shallowest, so its links are `../01-nova-academy/` style from `dist/` root files.

---

## 7. Content model

`_data/landing.json` + collections. Minimum volumes: 3 courses, 6 portfolio pieces, 3 testimonials, 5 partner marks, 6 FAQs, 7 illustrations, 8 disciplines.

```js
landing   = { h1[{text, swash?}], lede, bullets[], proof{creators, rating, avatars[]} }
step      = { n, title, body, icon }
block     = { id, kicker, title, lede, checks[], cta{label, href}, art{src, alt, w, h}, side }
course    = { slug, title, discipline, durationMin, lessons, instructor, image, chip }
work      = { src, alt, title, student, discipline }
voice     = { quote, name, role, city, avatar, stats }
plan      = { name, fee, tagline, features[], cta, style: 'default'|'highlight' }
faq       = { q, a }
```

Copy rules: H1 ≤ 46 chars; every section H2 ≤ 60 chars; ledes ≤ 150 chars; check rows ≤ 42 chars; FAQ answers ≤ 60 words; one idea per sentence. Mock content is fine, **but the numbers must be consistent** across hero, steps, pricing and FAQ (choose 88% payout / 12% fee and never contradict it).

---

## 8. Engineering

Stack and gates as Nova (`01-nova-academy/PLAN.md` §10), with the tightest limits in the family:

| Area | Folio deviation |
|------|-----------------|
| Output | **One HTML page** (~1 file) + 4 small support pages. No pagination, no listings, no dynamic routes. |
| Total page weight | Target ≤ 1.1MB on mobile including images; hero illustration ≤ 150KB |
| JS budget | **≤ 30KB gz**, of which ≤ 12KB is motion |
| CSS | ≤ 24KB gz — one stylesheet, critical subset inlined (<4KB) |
| Fonts | Lexend 400/500/600 + JetBrains Mono 500 only. Preload Lexend 600 (the H1). |
| Images | 7 illustrations, 2 widths each, AVIF with WebP fallback; job cards 4:3; all `width`/`height` set; the seven illustrations are the only decorative weight — no background videos, no icon fonts |
| JS modules | `main.js` (nav, anchors, scroll progress, sticky CTA, FAQ) ~6KB · `motion.js` (observer + reveals + connector draw) ~5KB · `rail.js` (testimonials) ~3KB · `form.js` (validation + success) ~3KB · `switcher.js` ~2KB |
| No libraries | Not even a smooth-scroll polyfill — use `scroll-behavior: smooth` with a `prefers-reduced-motion` override, and `scroll-margin-top` on every anchor target (nav height + 16px) |

### 8.1 Landing-page performance doctrine

- The hero illustration is the only `fetchpriority="high"` resource. Everything below the fold is lazy.
- Below-fold sections use `content-visibility: auto` with `contain-intrinsic-size` to cut first-render cost.
- The illustration `<img>` tags use `decoding="async"` and are never inside a `background-image`.
- No third-party scripts at all (no analytics snippet by default; document where one would go).
- Test on a throttled 4G / mid-range Android: **the H1, lede and CTA must be interactive before 2.0s**.

---

## 9. Accessibility

- The whole page is keyboard-navigable; the skip link jumps to `#start` on demand (and to main content by default).
- Anchored sections receive focus on navigation (`tabindex="-1"` + `focus()`), and `scroll-margin-top` prevents the nav from covering the heading.
- The 4-step connector is decorative (`aria-hidden`), and the steps are an `<ol>` so order is conveyed semantically.
- Colour is never the only cue: the lime chip says `COURSE`, the fee difference is text, the active plan is labelled `Best for teams`.
- Contrast: verify every text node, especially navy 40% wordmarks (they are **logos** — exempt as logotypes, but the surrounding mono label must still pass), and white text on the navy band.
- Reduced motion: M1–M3 and M8 degrade; M9 keeps working without a transition.
- Forms: labelled inputs, no placeholder-as-label, error summary with `role="alert"`, autocomplete, and a visible focus ring (2px lime + navy offset).
- Test with 200% zoom at 390px width — the hero must reflow without horizontal scroll.

---

## 10. SEO & metadata

- `<title>` `Web Academy for Visual Instructors — Teach what you make`; 155-char description; canonical; OG 1200×630 + Twitter summary_large_image.
- JSON-LD: `Organization`, `WebSite`, `FAQPage`, and `Service` (with `provider` + `areaServed`) for the teaching offer. **No `Course` markup** — this page isn't a course.
- One `h1`; sections use `h2`; card titles `h3`. Landmarks: `header`, `main`, `section`×N with `aria-labelledby`, `footer`.
- `theme-color` `#FFFFFF`; `robots` indexable; `sitemap.xml` includes the 4 support pages.

---

## 11. Responsive behaviour

| Width | Nav | Hero | Steps | Alternating blocks | Sticky CTA |
|-------|-----|------|-------|--------------------|------------|
| 390 | logo + lime menu button | copy first, art below, H1 38px | 1 col, vertical connector | image then copy, stacked | visible after hero |
| 640 | same | H1 44px, art 88% | 2×2, connector hidden (grid breaks the path) | stacked | visible |
| 768 | anchor links collapse to a sheet | H1 48px | 2×2, connector spans 2 rows | stacked | visible |
| 1024 | full anchors | H1 56px, 6/5 split | 4 col + horizontal connector | alternating 6/6 | hidden (desktop) |
| 1280 | full, 1200 max | H1 64px | 4 col | alternating | hidden |
| 1680 | full, 1200 max | H1 68px | 4 col | alternating | hidden |

Also verify 320px (no overflow, swash still under line 2) and landscape 812×375 (hero CTA visible).

---

## 12. Build sequence

1. Tokens + base + critical CSS.
2. **Logo assets** (navy/white + the `FOR CREATORS` chip) and favicon/OG.
3. **Illustration system**: generate all 7, build the contact sheet, reject and regenerate any that break the style gate (§3.5). *This is a gate — do not proceed with mismatched art.*
4. Nav + footer + switcher + sticky CTA.
5. Component library: buttons, chips, bullets, step card, course card, testimonial card, plan card, FAQ item, form fields, success panel.
6. Motion layer M1–M9 with the reduced-motion matrix.
7. Sections in the fixed order §5.1 → §5.11.
8. Support pages (`/thank-you/`, `/creators/`, `/legal/*`, `/404/`).
9. Hub + cross-template links (courses → Nova).
10. Tests, then performance tuning until the budgets are met.

---

## 13. Acceptance criteria

| ID | Criterion |
|----|-----------|
| AF-01 | The page renders all 11 sections in the fixed order; each nav anchor lands with the heading visible below the nav, and the target receives focus. |
| AF-02 | The primary form has exactly 3 fields + consent + one button; every CTA on the page scrolls to and focuses its first field, and passes its `data-source`. |
| AF-03 | The 4-step connector draws exactly once on scroll-in, aligns to the icon-plate centres at 1024/1280/1440, and is replaced by a vertical connector below 1024. |
| AF-04 | All 7 illustrations share camera height, light direction and matte finish, and sit on both white and ice with no visible edge or baked shadow. |
| AF-05 | No yellow, bright blue, lavender or pink exists anywhere; lime appears only in the legal forms defined in §3.1. |
| AF-06 | The hero swash draws once under the second line and never re-triggers; it stays under line 2 at 320, 390, 768 and 1440. |
| AF-07 | `prefers-reduced-motion` removes M1–M3 and M8's spring, with nothing hidden and no layout shift. |
| AF-08 | The sticky CTA hides while the newsletter block is in view and never overlaps the Themes switcher. |
| AF-09 | Lighthouse mobile: Perf ≥ 92, A11y 100, BP 100, SEO 100; **LCP ≤ 1.8s, CLS ≤ 0.05, TBT ≤ 150ms**. |
| AF-10 | JS ≤ 30KB gz, CSS ≤ 24KB gz, fonts ≤ 90KB, hero illustration ≤ 150KB, total page ≤ 1.1MB. |
| AF-11 | Keyboard-only: nav → anchors → test the rail → open the FAQ → complete and submit the form → see the success panel. No traps. |
| AF-12 | Numbers are consistent across hero, steps, pricing and FAQ (single source in the data file). |
| AF-13 | Form validation is inline, announced, non-colour-based, and moves focus to the first error. |
| AF-14 | The Themes entry (nav dropdown + floating switcher + footer row) reaches all four templates from `dist/` on disk. |
| AF-15 | No horizontal scrollbar at 320px; no layout shift from the sticky bar appearing. |

---

## 14. Risks & guardrails

| Risk | Guardrail |
|------|-----------|
| **Mismatched AI illustrations** are the #1 way this page fails | Generate all 7 up front, review on one contact sheet at 240px, enforce the style gate before building anything else. If two cannot be reconciled, re-generate both rather than shipping a mismatch. |
| Lime swash looks like a highlight marker | Use the 2-stroke loop swash (not a straight underline), 6px, round caps, lime only, and a 6px vertical offset below the baseline. Never a straight bar. |
| A landing page with 11 sections becomes long and tiring | Enforce the section rhythm, keep every section to ≤ 2 ideas, and visually alternate white/ice. Target 8–9 screens at 390. |
| The 3-field form under-collects for sales | It is deliberately minimal. Qualification happens on `/thank-you/`, which may ask 2 more optional questions (never gate the confirmation). |
| Sticky CTA + switcher + newsletter form compete | Fixed stacking rules (§8) and the newsletter suppression (AF-08). |
| Fast-scrolling users trigger every reveal late | Reveal on 15% visibility with `once: true`, and set the initial state in CSS so there is never a flash of animated-from state on anchor jumps. |
| Third-party logo trademarks | All partner marks in the template are fictional; the brand page documents this. |
| The page drifts from the family | Reuse Nova's course card and the shared tokens 1:1; the only new visual assets are the illustrations. |
