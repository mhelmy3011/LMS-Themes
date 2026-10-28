# 03 · AERO ACADEMY
## Execution plan — full website template

> **Agent contract.** This document is self-contained. Read it end to end before writing code.
> Reference image: `website3.jpg` · Brand law: `VisualIdentity.pdf` (+ repo `README.md` §3).
> Deliverable: `03-aero-academy/dist/` — static multi-page site, plain HTML/CSS/ESM.

---

## 1. Template charter

| Field | Value |
|-------|-------|
| Name | **Aero** |
| Co-brand lockup | `◉ Web Academy` + chip `AERO` (JetBrains Mono 11/500, `letter-spacing:.2em`, lime on navy deep, 1px `rgba(200,245,96,.35)` box) |
| Type | Full website template, 19 routes, multi-page |
| Positioning | The live academy. Instructors teach in real time; students join rooms, ask questions, and buy from the person, not the portal. Instructor-monetisation is a first-class story, not a footnote. |
| Primary audience | (a) Students who want live, human teaching; (b) **independent instructors / creators** who want to earn from teaching |
| Dual-journey requirement | Every page must make the *teach* path reachable within one click of the *learn* path — the template sells both sides of the marketplace |
| Success metric (design) | Live-room joins, instructor applications started, student-to-instructor profile click-through |
| Emotional register | Cinematic, nocturnal, close-up, alive. *Not* a night-mode skin of Nova — a different room entirely. |
| Signature | The **live video stage** hero + the floating **glass pill** nav + mixed-weight headlines where the emphasis word is set in **JetBrains Mono, lime** |
| One-line brief | *A control room for teaching: the interface disappears and the human is on stage.* |

### 1.1 Where Aero sits in the family

Aero is the **dark, luminous, live** temperature — the only dark template, and the only one where **glass** surfaces, **radial glows** and **backdrop blur** are allowed. Nova is bright and populous; Atelier is paper and quiet. Aero is the same brand at night, on stage, with 25 people in a room.

Consequence for the agent: **Aero owns all dark-mode craft in the family.** Do not carry Nova's light shadows or Atelier's hairlines here. Aero's texture is light-in-darkness: glows, gradients, glass, the dot grid, the loop line at the horizon.

---

## 2. Reference deconstruction (`website3.jpg`)

| # | Element in reference | Reference treatment | Aero treatment (build this) |
|---|----------------------|---------------------|------------------------------|
| E1 | Hero ground | Powder-blue sky at top → warm cream/pink haze at bottom, with soft photographic clouds | **Night sky**: `--wa-navy-deep` base → `--wa-navy` radial at 60% height → a `--wa-lime` radial at **6% opacity** low-centre ("horizon light"). Add the brand **dot grid** (24px pitch, `rgba(141,184,255,.28)`) masked to fade out above 55% height. Clouds are replaced by two very soft 640px blurred radial blobs (`--wa-sky` at 8%, `--wa-lime` at 4%) drifting on 18s/26s loops. **No photo of clouds, no pastel.** |
| E2 | Nav | Floating white pill, small logo left, 5 segmented links with the active one in a filled white pill, text login + `Sign Up` pill right | **Floating glass pill** (§6.1): 64px tall, `rgba(0,26,61,.55)` + `blur(20px) saturate(140%)` + 1px `rgba(255,255,255,.14)` inner border, radius 999, max-width 1100, 20px from the top, inset from the edges. The active-item indicator is a **single lime pill element that slides** between items (measured transform, 320ms `--ease-loop`) — not a per-item background. This sliding indicator is a family-first gesture and must be exact. |
| E3 | Hero type | Bold + light-italic mixed weight, huge, ~3 lines | **Mixed-weight with mono emphasis**: `Learn to build` in Lexend 600 white, then the emphasis phrase in **JetBrains Mono 400, `--wa-lime`**, size 0.62× the display size, with a 40ms-per-character reveal. The reference's italic-serif emphasis is off-system (one Latin family, no serif) — mono emphasis is the brand's sanctioned *code device*, so it replaces the italics everywhere in Aero. Never use italics. |
| E4 | Centre piece | Large rounded video-stage card (~16:9) with an instructor photo, 3 floating participant avatars top-left, a live-timer pill top-right, and a control bar (mic, red hang-up, cam, settings) at the bottom, all glass | **The live stage — the most important component in the template** (§2 · E4). 62% width, max 720px, radius 28, 1px `rgba(255,255,255,.16)`, an inner 1px inset highlight top, a 24px outer glow `0 40px 120px -40px rgba(0,26,61,.9)`, and a **photo of an instructor in mid-gesture** (bright, warm, lit from the front so the subject separates from navy). Overlays: participant stack (3 avatars, 32px, 2px navy-deep ring, −8px overlap) top-inline-start; `● LIVE 00:14` pill top-inline-end (lime dot that pulses 2s; the timer counts up in tabular mono, 1s tick, paused when the tab is hidden); a bottom control bar of 4 glass buttons — mic, camera, leave (lime fill with navy glyph — **not** the reference's coral), settings. Hover/focus on the stage: the controls lift 8px and the `Join room` button fades in over a 0.35 navy scrim. |
| E5 | Floating testimonial (left) | Quote in mono uppercase, author name, `Explore More` pill, inside a bordered card that overlaps the stage | **Keep**: 268px glass card at −40px inline-start / 20% vertical, mono 10.5px uppercase quote in `rgba(255,255,255,.72)`, 12px author line white, a hairline, and a ghost pill `Read the story`. On <1280 it moves below the stage as a full-width row; below 768 it becomes a plain quote block with no glass. |
| E6 | Right cluster | Two small avatars + "25K SATISFIED USERS" | **Learner proof cluster**: 3 overlapping 40px avatars + a `25,400 learners` counter in tabular numerals + `// SINCE 2022` mono. Below it, a `Rated 4.9` row with 5 lime-filled stars. Every star carries a navy 1px stroke so lime reads on dark without blooming. |
| E7 | Second block | Image card + `Watch Video` overlay pill + a floating instructor quote card; right column with a dot + `WHO WE ARE` eyebrow, headline, body, and a 3-part stat row with hairline dividers (Top 1 / 25K / 50M) | **Keep the anatomy, invert the surfaces.** Left: 4:5 image, radius 24, with a play pill (glass, 44px, lime play triangle) centred and an instructor quote card (glass) overlapping its bottom-inline-end by 32px. Right: a `// WHO WE ARE` mono eyebrow with a 6px lime dot, a headline with one mono-lime emphasis word, body at 62% white, and a 3-column stat row with 1px `rgba(255,255,255,.14)` dividers. |
| E8 | Bottom cards | 3 illustration cards (line-art characters, muted fills) | **3 "ways to earn" cards** on glass with brand line-art illustrations (navy/lime line strokes on transparent, max 2 colours + white) — Courses, Live cohorts, Memberships. Each card has a hover state where the loop line under the title draws. |
| E9 | Depth | Glass on a photographic background | Keep glass, but **define exactly three glass levels** (§3.5) and never invent a fourth. Glass only exists over the hero, the stage, and the sticky nav. Cards on the page body are **solid** `--wa-navy` with a 1px border — glass everywhere is a performance and legibility failure. |
| E10 | Typography contrast | Thin/italic serif mix | Replaced per E3: weight contrast + mono-lime emphasis. |
| E11 | Texture | Photographic sky | Brand dot grid, radial glows, and one **loop line** sitting on the "horizon" at 30% opacity, 2px sky, 40% of the width, drifting 40s. |

### 2.1 Rejected from the reference

- Powder blue, cream, pink haze, and coral (all off-palette).
- Italic serif (no serif in brand; italics are banned in Aero).
- Glass on every surface (only 3 glass levels exist).
- The reference's tiny 11px nav labels (Aero's nav labels are 13px minimum).
- Autoplaying hero video with sound (banned; any motion media must be muted, `playsinline`, and never the LCP element).

---

## 3. Design system

### 3.1 Colour (Aero usage map)

Distribution per viewport: **Navy Deep/Navy 62% · White/Sky 22% · Lime 10% · white-space 6%**. Aero inverts the family's light/dark ratio — this is where the deck's "60% navy" instruction is truest.

| Use | Value |
|-----|-------|
| Page ground | `--wa-navy-deep` `#001A3D` |
| Elevated surface | `--wa-navy` `#012A5D` |
| Panel on dark | `--wa-navy-mid` `#14427F` |
| Ink | `--wa-white` |
| Secondary ink | white @ 72% |
| Tertiary ink | white @ 52% — **floor**: nothing below 4.9:1 on navy-deep |
| Hairline | `rgba(255,255,255,.12)`; on navy-mid `rgba(141,184,255,.24)` |
| Spark | `--wa-lime` — primary CTA, live dot, emphasis words, active indicator |
| Support | `--wa-sky` — links, icons at 70%, chart fills, the loop line |
| Focus ring | 2px `--wa-lime` + 2px `--wa-navy-deep` offset (visible on glass and on navy) |

**Forbidden in Aero:** black (`#000`) — the darkest value is `#001A3D`; pure-white large blocks (max 8% of a viewport, and only as text); grey; gradients other than the specified radial glows and the 0.35–0.55 light-on-dark scrims.

### 3.2 Type scale

Aero's display type is the largest in the family, and its mono usage is the heaviest (mono is a *headline* tool here, not just a label tool).

| Token | Size | LH | Tracking | Weight |
|-------|------|----|----------|--------|
| `--fs-display` | 34 → 72 | 1.02 | −.035em | 600 (Lexend) |
| `--fs-emphasis` | 0.62 × display | 1.1 | .02em | 400 (JetBrains Mono, lime) |
| `--fs-h1` | 30 → 52 | 1.06 | −.03em | 600 |
| `--fs-h2` | 26 → 40 | 1.12 | −.02em | 600 |
| `--fs-h3` | 20 → 26 | 1.25 | −.015em | 500 |
| `--fs-lede` | 17 → 20 | 1.6 | 0 | 300 |
| `--fs-body` | 15.5 → 16.5 | 1.7 | 0 | 400 |
| `--fs-small` | 13 → 14 | 1.5 | 0 | 400 |
| `--fs-mono` | 11 → 12 | 1.45 | .16em | 500 uppercase |
| `--fs-numeric` | 28 → 40 | 1 | −.02em | 700 tabular |

Light-on-dark compensation (non-negotiable): body weight **+0** but colour at 72% minimum; `letter-spacing` +0.005em on body (light text on dark appears to fill in); never set body below 15.5px; avoid thin weights below 20px.

### 3.3 Grid & spacing

- 12 columns, gutter 24, max **1280** (Aero is the widest — the stage needs room), page padding 20 → 32 → 48.
- Section rhythm `clamp(72px, 9vw, 128px)`.
- Radius: 12 (chips/inputs) · 16 (small cards) · 24 (cards) · 28 (stage) · 999 (pills/nav).
- **Stage geometry**: the hero grid is 1 column on mobile, and at ≥1280 a 3-col composition — left testimonial (268px absolute), stage (centre, 62%), right proof cluster (absolute, 240px). Implement with a 12-col grid and `grid-column: 1/4, 3/10, 10/13` plus negative margins for the overlaps; do **not** use `position:absolute` for the stage itself (it must size the hero).

### 3.4 Elevation & glow (Aero has no shadows — it has glows)

| Token | Value | Use |
|-------|-------|-----|
| `--glow-stage` | `0 40px 120px -40px rgba(0,26,61,.95)` | Stage, modals |
| `--glow-lime` | `0 0 0 1px rgba(200,245,96,.28), 0 8px 32px -8px rgba(200,245,96,.35)` | Primary CTA hover, live dot |
| `--glow-focus` | `0 0 0 4px rgba(200,245,96,.22)` | Paired with the focus ring, never alone |
| `--glass-1` | `rgba(255,255,255,.05)` + `blur(12px)` | Nav when not stuck |
| `--glass-2` | `rgba(0,26,61,.55)` + `blur(20px) saturate(140%)` | Stuck nav, control bars |
| `--glass-3` | `rgba(255,255,255,.08)` + `blur(16px)` + 1px `rgba(255,255,255,.14)` | Floating quote cards |

Each glass level requires an `@supports not (backdrop-filter: blur(1px))` fallback to a solid `rgba(0,26,61,.92)`.

### 3.5 Iconography

- **24px grid, 1.5px stroke**, round caps, `currentColor`. Slightly heavier than Atelier because dark grounds erode thin strokes.
- Duotone is **not** permitted. Single-stroke only, plus filled variants for play/pause/star/live.
- Illustration set (3 cards + empty states): line-art, **1.75px strokes**, navy-deep fill shapes with sky/lime accents, no gradients, max 3 colours, drawn to a consistent 320×240 artboard with 24px padding.

---

## 4. Logo system (Aero)

### 4.1 Assets

Base set per README §3.4 plus:

| File | Note |
|------|------|
| `wa-horizontal-aero.svg` | wordmark white + `AERO` chip mono lime |
| `wa-icon-glow.svg` | the icon in lime with a soft 24px radial bloom behind it — used only at ≥ 96px |
| `favicon.svg` | **lime icon on navy deep** (the deck's approved "lime icon on navy deep"), with rounded-square mask support |
| `og-aero-1200x630.png` | navy deep + dot grid, huge white display line with one mono-lime word, wordmark bottom-left, `● LIVE` pill top-right |
| `stage-watermark.svg` | the mark at 3% white, 900px, rotated −12°, behind the stage (decorative) |

### 4.2 Logo behaviour (Aero's three states)

Aero's logo is the only one in the family that lives on a **glass** surface, so it needs explicit contrast handling:

1. **Rest (glass nav)**: horizontal lockup, **white**, 28px high. Because the glass can sit over a bright part of the stage, the nav always carries `--glass-2` when the stage scrolls behind it; the logo never appears over an untreated bright area.
2. **Stuck (scroll > 32px)**: the nav condenses (height 64→52, width shrinks to a 980 max, backdrop jumps from `--glass-1` to `--glass-2`), and the **wordmark collapses to the lime icon** at 26px with a 220ms cross-fade + 4px slide. On scroll back to the top it restores. Use a hysteresis band of ±8px.
3. **Load-in**: the icon draws (ring stroke + inner loop, 500ms + 120ms delay), then the wordmark unmasks left→right 380ms, then the AERO chip fades 200ms — total 1000ms. Skipped on repeat visits (`sessionStorage`) and under reduced motion.
4. **Hover/focus**: the lime icon gains `--glow-lime` at 60% intensity and the inner loop traces once. No movement, no scale.
5. **Footer**: stacked white at 140px with the tagline in mono lime, sitting on a loop-line base.
6. **Live room**: the icon in lime with a 2px lime ring that pulses exactly like the live dot — the mark *becomes* the live indicator. Used in the room header and the pre-join card only.

### 4.3 The live pulse (identity-grade motion)

A single motion definition used by: the hero live dot, the session-status chips, the room header mark, and the "join" button before a session starts.

```
ring: 40px, 1px solid lime, opacity 1 → scale 1 → 2.2 → opacity 0, 2.4s, ease-out, infinite
dot : 8px lime, opacity 1 → .45 → 1, 2.4s, ease-in-out, infinite, offset -1.2s
```
Under `prefers-reduced-motion`: the ring stops and the dot is a solid lime circle with a static 3px glow. **Never** more than one pulsing element per viewport.

---

## 5. Motion system (Aero)

### 5.1 Principles

1. **Cinematic, not busy.** One hero event per viewport; everything else is a quiet fade-up.
2. **Light reveals.** Aero's motion is about light moving through darkness: glows bloom, scrims lift, content sharpens out of blur.
3. **Blur is a motion currency** — but only on images and glass, never on text (text blur is unreadable mid-animation).
4. **Pointer is a light source.** Cursor-reactive glow is the one permitted pointer effect (hero only).
5. **No scroll-jacking, no horizontal scroll hijack, no snap-scroll storytelling.**

### 5.2 Tokens

`--dur-fast 160` · `--dur-base 280` · `--dur-slow 520` · `--dur-cinema 900` · `--dur-ambient 18000` · `--ease-out-expo` · `--ease-loop` · `--ease-spring` `cubic-bezier(.34,1.56,.64,1)` **allowed for the stage and the live pill only** (max 2 per viewport).

### 5.3 Signature animations (Aero's eleven)

| ID | Name | Where | Spec |
|----|------|-------|------|
| R1 | **Stage entrance** | Hero | The stage scales 0.96→1 with opacity 0→1 and `filter: blur(8px)→0`, 900ms `--ease-out-expo`, delayed 240ms so the H1 lands first. The avatar stack, live pill and control bar stagger in at +120/+180/+240ms with 8px rises. Reduced motion: opacity only. |
| R2 | **Cursor spotlight** | Hero only | A 480px radial gradient (`rgba(141,184,255,.10)`) follows the pointer with 0.12 lerp, behind the content, above the dot grid. Disabled on touch, on `prefers-reduced-motion`, and when `matchMedia('(pointer:fine)')` is false. One rAF loop; no per-element listeners. |
| R3 | **Sliding nav indicator** | Nav | One lime pill element positioned by measuring the active item; on change, `transform: translateX()` + `width`, 320ms `--ease-loop`. On resize/font-load, re-measure without transition. |
| R4 | **Glass lift** | Nav stuck | Height, background, blur and border animate together over 280ms. `backdrop-filter` transitions are expensive — animate `background-color` and `border-color` only, and switch the blur instantly at the threshold. |
| R5 | **Mono type-in** | Hero emphasis | The emphasis phrase reveals character by character (40ms/char, max 24 chars, ~1s), each character fading in with a 4px rise. `aria-label` on the parent holds the full phrase and the animated spans are `aria-hidden`. Reduced motion: instant. |
| R6 | **Counter & proof** | Hero proof, stats | `data-count` rolls over 1100ms `--ease-out-expo`, tabular numerals so the width never jitters (use `ch`-width reservation). Reduced motion: final value. |
| R7 | **Blur-up media** | All images | LQIP (24px, blur 20, inlined base64) → full image cross-fade 520ms, plus a 1.04→1 scale on the wrapper. `decoding="async"`. |
| R8 | **Join-room scrim** | Stage | Hover/focus-visible raises a 0→0.4 navy scrim over the photo and fades in the `Join room` pill + controls from +8px, 280ms. On touch, the scrim and pill are **always visible** (no hover dependency). |
| R9 | **Live pulse** | Global (§4.3) | See §4.3. |
| R10 | **Loop-line drift** | Hero horizon, footer | A 2px sky loop line, 40% width, translated −50%→0 over 40s linear, `prefers-reduced-motion`: static. |
| R11 | **Card glow-trace** | Earn cards, session cards | On hover, a 1px lime border is drawn around the card using a conic-gradient mask rotated 360° over 900ms, once. Cheap implementation: an `::before` with `background: conic-gradient(from var(--a), transparent 0 80%, lime 92%, transparent 100%)` masked to a 1px ring. Only on `(hover:hover)`. |

### 5.4 Forbidden

Autoplaying video with sound · background video as the LCP element · more than one glow animating at once · text blur · `filter: blur()` on scroll · parallax on the stage photo · animated `backdrop-filter` · cursor effects outside the hero.

---

## 6. Global chrome

### 6.1 The floating glass nav (desktop ≥1024)

- Container: `position:fixed; top:20px; inset-inline:20px; max-width:1100px; margin-inline:auto; height:64px; border-radius:999px`.
- Layout: logo (start) · 5 centre links (Courses · Live · Library · Blog · About) · end group (search icon, `Log in` text, `Start learning` lime pill 40px).
- The whole pill has a 1px `rgba(255,255,255,.14)` border, `--glass-1`, and a 1px top inset highlight (`inset 0 1px 0 rgba(255,255,255,.10)`) which is what makes glass read as glass.
- **Scroll behaviour**: past 32px → `--glass-2`, height 52, max-width 980, wordmark collapses to the lime icon, and the outer glow appears. Past 400px a `Themes` glyph button fades into the end group (space is tight — the switcher lives inside the nav on this template **and** as the floating button, see §8).
- **Mobile (<1024)**: a 56px floating pill with logo + a lime `▣` menu button. The drawer is a **full-screen navy-deep sheet** that slides up, with links in `--fs-h2` weight 500, a mono index number before each (`01 — Courses`), and the two modes split into `For learners` / `For instructors` groups. Focus trap, `Escape`, `inert` behind.

### 6.2 Footer

Navy-deep with a dot grid at 5%, a loop line above the bottom rule, and the stacked logo. 5 columns + a bottom bar. Distinctive: the footer includes a **"Teach with us" band** at the top (3 lines of copy + `Apply to teach` on lime) because the instructor path is a first-class journey; on instructor pages this band is suppressed.

### 6.3 Global components

- **Live status chip** — `● LIVE` (lime dot, pulse), `● STARTING SOON` (sky dot), `REPLAY` (mono, no dot), `SOLD OUT` (white 40%).
- **Glass control bar** — 4 × 40px glass buttons, 1px border, `aria-label` each; the leave button is lime-filled with a navy glyph; composed as a `<fieldset>` with a `<legend class="sr-only">`.
- **Seat meter** — 4px track `rgba(255,255,255,.14)`, lime fill, `role="progressbar"` with `aria-valuenow`.
- **Countdown** — tabular mono, days/hours/min/sec in 4 groups, updates 1/s only when `document.visibilityState === 'visible'`.
- **Avatar stack** — max 3 + `+N` chip, `aria-label="25,400 learners enrolled"`.
- **Search overlay** — full-screen navy-deep, 1px lime bottom-border input at 32px, instant client-side filtering of courses/sessions/resources with grouped results, `Escape` closes.

---

## 7. Page specifications

| # | Page | Path |
|---|------|------|
| R01 | Home | `/` |
| R02 | Courses | `/courses/` |
| R03 | Course detail | `/courses/{slug}/` |
| R04 | Live Sessions (hub) | `/live/` |
| R05 | Live session detail / room | `/live/{slug}/` |
| R06 | Instructor directory | `/instructors/` |
| R07 | Instructor profile | `/instructors/{slug}/` |
| R08 | Teach with us (instructor acquisition) | `/teach/` |
| R09 | Library | `/library/` |
| R10 | Library item | `/library/{slug}/` |
| R11 | Blog | `/blog/` |
| R12 | Article | `/blog/{slug}/` |
| R13 | About | `/about/` |
| R14 | Membership / Pricing | `/pricing/` |
| R15 | Contact & support | `/contact/` |
| R16 | Sign in / Create account (static) | `/signin/` |
| R17 | Legal | `/legal/{page}/` |
| R18 | 404 | `/404/` |
| R19 | Instructor earnings calculator (interactive) | `/teach/earnings/` |

---

### R01 · Home

| § | Section | Spec |
|---|---------|------|
| 1 | Hero | Ground per E1. `min-height: 100svh` at ≥1024 (not `100vh` — mobile browser chrome). Layout: mono kicker `// LIVE ACADEMY` with a lime dot → display headline (mixed weight, E3) → 2-line lede at 62% white → CTA row (`Start learning` lime pill 52px + `Teach on Web Academy` ghost with a lime arrow) → then the stage (E4) with the floating quote (E5) and proof cluster (E6). |
| 2 | Trust marquee | 6 partner/institution wordmarks in white 40%, 1px rules above and below, 40s linear marquee, pauses on hover/focus, duplicated for a seamless loop with `aria-hidden` on the clone. |
| 3 | "Who we are" | 2-col per E7, with a `Watch the film` modal (16:9, no autoplay, no YouTube iframe on load — a facade that loads the player on click). |
| 4 | **Live this week** | The template's commercial heart: a 3-up grid of session cards (thumbnail 16:9 + `LIVE` chip + time + instructor + seats meter + `Reserve seat`). One card is visually "live now" (lime 1px border + R11 glow-trace persisting at 60%). Header includes a `This week ▾` filter and a link to `/live/`. |
| 5 | Ways to earn | 3 glass cards (E8) — Courses, Live cohorts, Memberships — each with a brand line-art illustration, a `Learn more →` and a mono price hint. This section exists for the instructor journey. |
| 6 | Featured courses | 3-up solid navy cards with 16:10 media, price chip (white fill, navy text — lime is reserved for live), rating, instructor row. |
| 7 | Instructor spotlight | Full-bleed 2-col: large 4:5 portrait + bio + 3 stat cells + `See all instructors` + a 2-course mini rail. |
| 8 | Library teaser | 3 resource rows on hairlines with type chips. |
| 9 | Testimonials | 3 glass cards in a snap rail, 1.25 peek on mobile, no autoplay. |
| 10 | Journal | 2-up editorial cards + `All articles`. |
| 11 | Dual CTA | Split band: left `Learn something live` (lime button), right `Teach what you know` (ghost button with a lime arrow). Both halves have a 1px vertical divider; each has its own mini proof line. |
| 12 | Footer | §6.2 |

**Above-fold discipline:** the H1 and the CTA must be fully visible at 390×844 without scrolling. The stage may be partly below the fold on phones — that's acceptable; the CTA is not.

---

### R02 · Courses

- Header: H1 + lede + a **segmented control** (`All · Live · Self-paced · Bundles`) with a sliding lime underline, and a search field.
- **Filter sheet** on the inline-end (desktop: a 280px sticky column; mobile: bottom sheet) — Track, Level, Format, Price, Instructor, Duration.
- **Grid**: 3-up at ≥1280, 2-up ≥768. Media 16:10 with R7 blur-up. Card = media + format chip (`LIVE 6 WEEKS` / `SELF-PACED`) + title + instructor + meta (`12 lessons · 8 seats left`) + price. Hover R11 (border trace) + image 1.03 scale.
- Sort select; result count in `aria-live`; URL-synced filters; "Load more" (9 at a time).
- Empty state: icon watermarked at 8% white, one line, `Clear filters`.
- **Sticky compare bar** (optional, only on this page): selecting up to 3 courses (`Compare` checkbox on hover) reveals a bottom glass bar with `Compare 3 courses`. Comparing opens a modal table on hairlines. This is Aero's premium-detail flourish — build it, but never let it block the footer.

---

### R03 · Course detail

Two-column (8/4), sticky panel at ≥1024; sticky bottom bar on mobile.

1. Breadcrumb in mono.
2. Format chip + `LIVE` pulse if applicable; H1; lede (2 lines); rating + learners.
3. **Media stage** — 16:9 with a play facade (loads on click), or, for a live course, the "next session" card inside the media frame.
4. Instructor strip (48px avatar, name, `1.2M students`, `Follow` ghost button).
5. **What you'll be able to do** — 6 lime-checked items in 2 columns on a navy panel.
6. **Curriculum** — accordion; each lesson row has a type glyph, duration, and a `PREVIEW` chip where free. Live lessons show their scheduled date in tabular time.
7. **Live schedule** — for live courses, a compact 6-row table (date / time / topic / status) with `Add to calendar`.
8. Requirements, description (66ch).
9. Instructor card (bio, stats, other courses).
10. Certificate block with the ridges motif at 10% white.
11. Reviews — histogram on hairlines, 6 reviews, `Show more`.
12. Related rail.
13. **Sticky panel**: price (32px tabular), `Enrol now` (lime, 52px), `Add to wishlist` ghost, `Share` icon row, 4 trust rows with lime ticks, and a 6px lime top-edge accent. Mobile: a fixed bottom bar with price + `Enrol`.

---

### R04 · Live Sessions hub

Aero's most distinctive page. Three modes as **segmented tabs** with the sliding lime indicator (R3):

- **Live now** — a big card (the stage component in "room" state, 16:9, autoplay-free) + 2 smaller live rows. If nothing is live, show the next start time with a countdown and a `Remind me` button.
- **Upcoming** — grouped by day; each session is a row (108px): time block (tabular, 2 lines) · title + instructor · seats meter · format chip · `Reserve`. Rows on hairlines; hover tints to `--wa-navy`.
- **Replays** — a 3-up grid of recording cards with duration chips and a `Watched` state (a 3px lime bottom bar at the watched percentage, `role="progressbar"`).

Side rail (≥1280): a mini calendar month grid where days with sessions carry a lime dot; today has a 1px lime ring. Clicking a day filters the list (URL `?date=`). Timezone selector persisted in `localStorage`; all times from ISO via `<time datetime>`.

### R05 · Session detail / room

Three states, one template — the state is driven by data (`status: upcoming | live | ended`).

- **Upcoming**: hero with title, instructor, countdown (large, tabular), date/time/duration, `Reserve seat` (lime), `Add to calendar` (ICS + Google), `Share`. Then: what you'll learn, agenda (timeline rows), who it's for, instructor card, and the room-tech requirements list ("Chrome, a mic, 5Mbps"). A pre-join checklist with 3 checkboxes and a test-link.
- **Live**: the page becomes a **room shell** — full-bleed navy-deep, the stage at 16:9 centred, participants strip below, a Q&A panel on the inline-end (≥1280), and a live chat drawer on mobile. Controls are always visible. `● LIVE` in the header. No marketing chrome, no footer (the room owns the viewport).
- **Ended**: the recording facade + `Watch replay` + resources + certificate CTA + next session suggestion.

All three must be reachable in the mock data so a reviewer can see each state.

---

### R06 · Instructor directory / R07 · Instructor profile / R08 · Teach

- **R06**: a 3-up grid of 4:5 portraits with a 0.25 navy scrim and the name + discipline overlaid bottom-left in white (contrast: on the scrim, ≥ 7:1). Filter by discipline on a hairline row. Hover: scrim deepens, `View profile →` slides in.
- **R07**: hero split — sticky 3:4 portrait (420px) + name, discipline, 3 stats (`Students · Courses · Rating`), bio at 62ch, then `Live sessions hosted` rows, `Courses` rail, `In the library` rows, `Reviews` (3), and a `Book a 1:1` CTA. Includes `Person` JSON-LD and a `Follow` toggle (static state).
- **R08 · Teach with us**: Aero's second commercial page and the brand's clearest "earn" story. Sections: (1) hero — `Teach what you already know` with a mono-lime emphasis word + `Apply to teach`; (2) the pitch in 3 figures (payout share, average monthly earnings, days to first payout) — **all figures labelled "illustrative"**; (3) how it works — 4 steps on a lime loop line (R10-style draw); (4) the toolkit — 4 features (studio, scheduling, payments, audience) as icon + copy rows; (5) instructor testimonials (2 glass cards); (6) **earnings calculator** (R19) embedded; (7) FAQ; (8) application form (name, email, discipline, portfolio URL, audience size, what you'd teach) → success state with next steps.

### R19 · Earnings calculator (`/teach/earnings/`)

An interactive page (also embedded as a section on R08): 3 range inputs (students per cohort, price per seat, cohorts per year) with live-formatted values, a computed gross/annual figure in `--fs-numeric` 56px, and a 12-month projection bar chart in inline SVG (bars `--wa-sky`, the current month lime). Sliders are real `<input type="range">` with `aria-label`, keyboard support, and `aria-live="polite"` on the result (debounced 200ms). A visible "Illustrative only — not a guarantee" note. No client framework: ~3KB of JS.

---

### R09 · Library / R10 · Library item

- **R09**: type chips (`Guides · Templates · Recordings · Readings`), a search field, and a 3-up grid of cards on `--wa-navy` with a file-type glyph, title, 2-line description, and `PDF · 24 pages`. Download buttons are lime-ghost (1px lime border, lime text, lime fill on hover with navy text).
- **R10**: two-column reading layout — preview (16:9 media or an embedded page carousel), ToC, description — plus a sticky download card (glass), meta list, licence and related. Gated items show an inline email form with a success state that includes the download link.

### R11 · Blog / R12 · Article

- **R11**: one lead article (16:9, overlay title on a 0.5 scrim), then a 2-col list of 8 with 3:2 thumbnails at 128px, mono category + date, and a category filter on a hairline.
- **R12**: 66ch column on navy-deep, 17px body at 78% white, mono kicker, H1, author + date row, LQIP hero, drop-figure numeral in a 56px light face, pull-quotes with a 2px lime inline-start rule, and **code blocks in the brand's code-device style** (navy panel, 1px border, JetBrains Mono, lime for punctuation/keywords, sky for strings — the deck's exact code aesthetic). Sticky ToC at ≥1280; reading progress (1px lime) at the very top; share row; related 3-up.

### R13 · About

(1) Cinematic hero with the loop line on the horizon and a display statement; (2) the brand story triptych adapted for the dark ground — loop line, ridges (never filled), dot grid — at 3× 120px; (3) mission + a full-bleed 21:9 image; (4) numbers band with counters (R6); (5) the team grid (4:5, 5-up); (6) studios/where we teach; (7) press logos; (8) dual CTA.

### R14 · Membership / Pricing

3 tiers (Free · Live · Studio) — the middle card is the "stage" style: 1px lime border, `--glow-lime` at 40%, `Most popular` lime chip. Monthly/annual toggle with a 200ms counter roll. A 12-row feature matrix with hairline rows and lime ticks; sticky first column on mobile scroll. Then: "Compare with 1:1 coaching", FAQ (5), and a guarantee line. `Product`/`Offer` JSON-LD.

### R15 · Contact & support

Split: left a 6-col form (name, email, topic — Billing / Technical / Courses / Teaching / Press / Accessibility — message, consent); right a 5-col stack of support routes as rows with response-time promises, plus a `Status: all systems operational` row with a lime dot (static) and a link to help topics. Below: 4 quick-help cards. Same validation/error-summary pattern as the rest of the family.

### R16 · Sign in / Create account

Two-panel layout: left a navy-deep form panel (email, password, `Continue`, SSO buttons as ghost rows, forgot link, `Create account` switch); right a full-height image panel with one quote and the loop-line motif. **Static form** — no backend, but full client-side validation, password visibility toggle, and `autocomplete` attributes set correctly. Below 900px the image panel is hidden and the form is centred.

### R17 · Legal / R18 · 404

Legal in the reading layout with a sticky ToC and mono "last updated". 404: navy-deep, dot grid, a huge `404` in Lexend 200 at 20% white, one line of copy in mono, a search field with a lime border, 4 links, and a single loop line sweeping across once on load.

---

## 8. Themes hand-off

- Navbar: on desktop, a 40px glass glyph button with the `wa-mark` sits in the end group before the CTA (the pill is too tight for a text link). Its tooltip reads `Themes`.
- Panel: a **glass sheet** anchored below the nav (max 720px, 1px border, `--glass-3`, 24px radius) with 4 rows: template name (white 500), temperature swatch (Ice / White / Navy Deep / Lime), one-line descriptor, `→`. The current row carries a lime dot and `aria-current="page"`.
- **Floating switcher**: a 48px lime circle with the navy `wa-mark`, bottom-inline-end 24px, `--glow-lime` at rest. Expands (240ms `--ease-spring`) into a vertical stack of 4 glass chips above the button. This is the loudest switcher in the family — justified because Aero's dark grounds need a high-visibility wayfinding affordance.
- On live-room pages (R05 live state) the switcher is **hidden** — the room is a focused mode. Document this exception.

---

## 9. Content model

Base collections as Nova (`01-nova-academy/PLAN.md` §9) plus:

```js
session   = { id, slug, title, courseId?, instructorId, startsAt, durationMin, status,
              seats, seatsFilled, roomUrl, replayUrl?, agenda[{time, topic}], level, price }
instructor= { id, slug, name, discipline[], portrait, headline, bio, stats{students,courses,rating},
              socials{}, payoutShare, sessionsHosted[], courseIds[] }
membership= { id, slug, name, monthly, annual, features[{label, included, note?}], popular }
earnings  = illustrative defaults: { seats: 30, price: 49, cohorts: 6, currency: 'USD' }
```

Rules: `status` drives R05's three states — the data must include at least one `live`, four `upcoming`, and three `ended` sessions so all states are reviewable. All session times ISO 8601 UTC with an explicit timezone label rendered client-side.

---

## 10. Engineering

Stack, tree and gates as Nova (`01-nova-academy/PLAN.md` §10), with these deviations:

| Area | Aero deviation |
|------|----------------|
| JS budget | **≤ 42KB gz** — glass, counters, sliding indicator, calculator, filters |
| `stage.js` | ~3KB: visibility-aware timer, hover/focus scrim state, control-button toggles (static) |
| `indicator.js` | ~1.5KB: measure + transform for the nav and tab indicators |
| `calculator.js` | ~3KB, loaded only on R19/R08 |
| Image strategy | Dark grounds hide JPEG artefacts — still ship AVIF. LQIP must be a **navy blur**, not a grey one, or the blur-up flashes light. Pre-compute with sharp and inline ≤ 700 bytes |
| Blur cost | `backdrop-filter` is capped: never more than **3** blurred surfaces visible at once; the hero stage photo must not have glass over glass. Test on a 4-year-old Android (backdrop-filter is the #1 INP risk in this template) |
| Fonts | Lexend 300/400/500/600 + JetBrains Mono 400/500 — preload Lexend 600 and the mono (the hero needs both immediately) |
| Contrast | Automated check must run on **dark** grounds specifically: no white text below 52% opacity, no lime text smaller than 14px, no sky text below 16px |

### 10.1 Performance risks specific to Aero

1. **Backdrop blur over a photographic hero** → measured INP can exceed 200ms on mid-range Android. Mitigation: blur only the nav and floating cards (small areas), never the stage; cap blur at 20px; use `will-change` sparingly and only while animating.
2. **Multiple infinite animations** (pulse, glow, drift) → cap at 3 concurrent, pause all when the hero is off-screen (IntersectionObserver) and when `visibilityState === 'hidden'`.
3. **Radial gradient blobs** → pre-render as a single small WebP and scale, rather than layering large CSS gradients that trigger repaints on scroll.

---

## 11. Accessibility (Aero specifics)

- **Dark-mode contrast is the primary risk.** White at 52% on `#001A3D` is ≈ 7.3:1 (safe); at 40% it fails. Enforce the 52% floor with a token and a lint rule.
- The live pulse must be accompanied by the text `LIVE` — never colour/pulse alone (WCAG 1.4.1).
- The stage's control bar is a real group of buttons with labels; the mute/camera toggles use `aria-pressed`.
- The countdown must not be an `aria-live` region (it would announce every second). Announce only at 10 minutes and 1 minute before start.
- Sliding indicators must not become the only signal of the active tab → pair with `aria-selected`/`aria-current`.
- The earnings calculator must be fully keyboard-operable and its result announced politely, debounced.
- The cursor spotlight must never reduce the contrast of text beneath it (it sits behind content, at ≤10% opacity).
- Test the whole template with Windows High Contrast Mode — glass surfaces must fall back to solid borders.

---

## 12. SEO & metadata

As Nova, plus: `Event` + `Offers` on every session (R05), `Person` (R07), `Course` (R03), `Article` (R12), `BreadcrumbList` throughout, `SoftwareApplication` for the membership (R14). `theme-color` is `#001A3D` (dark) with a `<meta name="color-scheme" content="dark">`. OG images are navy with a mono-lime word so they're recognisable in a dark timeline.

---

## 13. Responsive behaviour

| Width | Nav | Hero | Stage | Floating cards | Live rows |
|-------|-----|------|-------|----------------|-----------|
| 390 | 56px floating pill + sheet | stacked, display 34px, H1 + CTA above fold | full width, 4:5 | quote below stage; proof cluster below CTA | stacked, time on top |
| 640 | same | display 42px | full width, 16:10 | quote below | stacked |
| 768 | same | display 52px | 88% width | proof cluster inline | 2-col grid |
| 1024 | full glass pill | display 60px | 74% width | quote absolute left | rows |
| 1280 | full, 1100 max | display 72px | 62%, quote + proof absolute | both absolute | rows + side rail |
| 1680 | full, 1280 content | as above | 62% | as above | as above |

Also verify: the CTA is fully visible at 390×844 and 360×640; the stage never causes horizontal scroll; the nav pill never overlaps the stage's top edge.

---

## 14. Build sequence

Foundation + dark tokens → **logo assets (incl. the lime-glow variant and the favicon)** → chrome (glass nav + sliding indicator + drawer + footer with the teach band + switcher) → component library + `/styleguide/` rendered on navy → motion layer (R1–R11) with the reduced-motion matrix → **the stage component (E4) in isolation**, all three states → Home → Courses/Course detail → Live hub → Session detail (all 3 states) → Instructors/Profile → Teach + earnings calculator → Library → Blog/Article → About → Pricing → Contact → Sign in → Legal/404 → hub links → tests → performance (start with the blur audit).

**Rule:** the stage and the sliding indicator are the template's identity. Build, measure and tune them before any interior page.

---

## 15. Acceptance criteria

| ID | Criterion |
|----|-----------|
| AE-01 | All 19 routes exist; navbar reachability complete; no broken internal links; R05 renders all three states from data. |
| AE-02 | The floating glass nav slides a single lime indicator between items (measured transform, no jumping), and condenses correctly past 32px with no blur animation. |
| AE-03 | The stage renders exactly as specified (radii, borders, inset highlight, avatar overlap, control bar, timer) and its scrim/pill is **always visible on touch devices**. |
| AE-04 | No black `#000`, no grey, no off-palette colour anywhere; the darkest value is `#001A3D`. |
| AE-05 | No italic type anywhere; every emphasis phrase is JetBrains Mono in lime with an `aria-label` on the parent and `aria-hidden` spans. |
| AE-06 | At most 3 glass surfaces visible at once; at most 3 concurrent infinite animations; all ambient motion pauses off-screen and on `visibility: hidden`. |
| AE-07 | White text never drops below 52% opacity; lime text is never below 14px; all AAA-level pairings from README §3.2 respected. |
| AE-08 | No visual signal relies on colour alone: live status, seat meters and progress bars all have text or ARIA equivalents. |
| AE-09 | `prefers-reduced-motion` removes the pulse, spotlight, drift, type-in, blur-up scale and glow-trace, with zero content hidden. |
| AE-10 | Lighthouse mobile: Perf ≥ 88, A11y 100, BP ≥ 95, SEO 100 on Home, Live, Session detail (dark + blur is the risk — tune until it passes). |
| AE-11 | INP ≤ 200ms on a throttled mid-range Android profile for Home and Live. |
| AE-12 | JS ≤ 42KB gz, CSS ≤ 30KB gz, fonts ≤ 120KB, LCP image ≤ 200KB, and no hero video. |
| AE-13 | The earnings calculator is keyboard-operable and debounce-announces its result. |
| AE-14 | High Contrast Mode: every glass surface falls back to a visible solid border. |
| AE-15 | Aero's dark temperature is unmistakable versus Nova and Atelier, while all brand tokens and the logo geometry match exactly. |

---

## 16. Risks & guardrails

| Risk | Guardrail |
|------|-----------|
| Glass everywhere → illegible, slow mush | Only 3 glass levels, only over the hero/nav/floating cards; body uses solid navy panels. Audit: count blurred surfaces per viewport (max 3). |
| Blur + glow tanks INP on Android | Cap blur at 20px, small areas only, no glass over the stage photo, and pause ambient loops off-screen. |
| Mono-lime emphasis overused → gimmick | Max **one** emphasis phrase per headline, max 24 characters, never in body copy. |
| Dual journey confuses hierarchy | Every page has one primary CTA per journey maximum; the teach path is always secondary but always present (except in the live room). |
| The dark template becomes the default "cool" choice and drifts from the family | All tokens are shared; the difference is surface and light, not palette. Cross-check against the Brand page. |
| Timer/countdown battery drain | Update 1/s, pause on hidden tab and off-screen, use `setInterval` with a re-sync on `visibilitychange`. |
| Fake "live" feels deceptive | All mock live states are labelled in the demo data and the README of the template; sessions in the current time window are marked as demo. |
