# 01 · NOVA ACADEMY
## Execution plan — full website template

> **Agent contract.** This document is self-contained. Read it end to end before writing code.
> Reference image: `website1.jpg` · Brand law: `VisualIdentity.pdf` (+ repo `README.md` §3).
> Deliverable: `01-nova-academy/dist/` — static multi-page site, plain HTML/CSS/ESM.

---

## 1. Template charter

| Field | Value |
|-------|-------|
| Name | **Nova** |
| Co-brand lockup | `◉ Web Academy` + chip `NOVA` (JetBrains Mono 12/700, `letter-spacing:.12em`, navy on Ice) |
| Type | Full website template, 18 routes, multi-page |
| Positioning | The open, high-volume consumer academy. A wide catalogue, self-paced courses, live office hours, a real library. Warm, optimistic, fast. |
| Primary audience | Individual learners 16–45, career switchers, students, hobbyists |
| Secondary audience | Parents/employers verifying quality; instructors considering the platform |
| Job to be done | "Help me find the right course in under 60 seconds and believe it's worth my money." |
| Success metric (design) | Time-to-first-course-click; catalogue filter usage; enrolment CTA click-through |
| Emotional register | Encouraging, generous, human. *Not* corporate, *not* childish. |
| Signature | Floating 3D geometric confetti + the overlapping stat band + ringed category tiles |
| One-line brief | *An academy that feels like a bright studio, not a portal.* |

### 1.1 Where Nova sits in the family

Nova is the **light, playful, populous** temperature. Atelier is calm and expensive; Aero is dark and live. Nova must be the most *accessible* of the three in every sense: largest type floor, clearest affordances, most forgiving contrast, most visible focus. If a design decision is ambiguous, choose the one a 17-year-old on a mid-range Android phone can use one-handed.

---

## 2. Reference deconstruction (`website1.jpg`)

Read the reference as a **structure**, then rebuild it in brand. Every row below is a binding instruction.

| # | Element in reference | Reference treatment | Nova treatment (build this) |
|---|----------------------|---------------------|------------------------------|
| R1 | Hero canvas | Pink→lavender→blue→cream pastel radial mesh, very soft | **Brand mesh**: 4 layered radial gradients — `--wa-ice` base, `--wa-sky` at 22% opacity (top-left), `--wa-lime` at 10% (bottom-right), white at 60% centre. Max saturation on screen must stay below the lime CTA's, so the button always wins. Add a 2% navy noise/grain overlay to stop banding on cheap panels. |
| R2 | Eyebrow above H1 | Small grey sentence case | **`// THE LEADER IN ONLINE LEARNING`** — JetBrains Mono 12/500, `letter-spacing:.14em`, uppercase, colour `--wa-navy` at 64%. The brand's code-comment device replaces the plain eyebrow. |
| R3 | H1 | 3 lines, ~46px, heavy, navy | **Lexend 600**, fluid `clamp(2.25rem, 5.2vw, 4rem)`, `line-height:.98`, `letter-spacing:-.035em`, navy. Max 3 lines at 1440px, max 4 at 390px. Optional cursor block `▌` in lime after the last word (blinks 1.2s steps(1), pauses after 3 cycles — decorative, `aria-hidden`). |
| R4 | Search pill | White pill, coral circular arrow button | **Search pill**: 56px tall, radius 999, white, 1px `rgba(1,42,93,.08)`, `--shadow-pill`. Leading 18px search glyph in navy 56%. Trailing: 40px circular button, **lime fill, navy arrow**, arrow rotates −45° and circle scales 1.06 on hover/focus. Submits to `/courses/?q=`. |
| R5 | Trust line + rating | "Trusted by over 15K users" + 290+ / 4.5 stars | Trust line in `--wa-navy` 68%, `4.5` in Lexend 600 + 5 star glyphs in **lime fill with navy 1px stroke** (lime on white is forbidden as *ink*; the stroke makes it legal and legible). Numbers are `data-count` animated, see §7.4. |
| R6 | Hero visual | Photo of a person thinking, inside a rotated rounded card, surrounded by 5 floating 3D primitives (triangle, cube, half-cube, sphere, pie-chart) with depth-of-field blur | **Keep the composition exactly**: one 4:5 portrait card, radius 32, rotated −4°, `--shadow-hero`; 5 primitives at 3 depth planes. Recolour primitives: lime sphere, navy triangle, sky cube, white/navy-mid pie, navy half-cube with lime face. Blur the two "back plane" shapes 2px and drop to 55% opacity. **Do not** invent extra shapes. |
| R7 | Stat band | 4 white cards straddling hero bottom edge | **Keep the overlap** (cards sit −56px over the hero boundary). Card: white, radius 24, 1px `--wa-ice`, icon in a 48px tinted square (radius 14), value Lexend 700 28px, label 14px navy 60%. Four stats: Courses · Mentors · Certificates · Learners. |
| R8 | Section eyebrow | Coral small caps "Favourite Course" | **`// FAVOURITE COURSE`** mono navy 64%. Coral is **banned** — the accent slot belongs to lime, and lime never sets type on light. Structure the hierarchy with weight and tracking instead. |
| R9 | Section head + lede + outline pill button right | Large navy H2, grey 2-line lede, outline pill "All Categories" | Keep the 3-column head row on ≥1024px (eyebrow/H2/lede left, button right, bottom-aligned). Button: 44px, radius 999, 1px `rgba(1,42,93,.16)`, navy label, hover → navy fill + white label + 2px lime left-edge inset that grows to full width (300ms). |
| R10 | Category tiles | 4 tiles, each with a large outlined circle ring behind a logo glyph, name, "4 Courses" | **Ring system** — two concentric 1px circles (`--wa-sky` at 34% and 18%) with an 8px gap, 96px diameter, navy glyph in the centre, one lime arc segment (60°) that rotates 45° on hover. Glyph set: brand-neutral line icons (not third-party logos). |
| R11 | Carousel | 4 visible, pill + dot pagination | **Scroll-snap rail**, 4/3/2/1.25 columns at 1280/1024/768/390. Pagination = one 28px lime pill that morphs its x-position + 6px dots (aria-current). Drag with pointer events, arrows appear on keyboard focus, `aria-roledescription="carousel"`. |
| R12 | Section break | Dashed hand-drawn arrow doodle + gradient wash from navy to blue | **Loop line** replaces the doodle: a single 2px lime-on-navy (or navy-on-light) looping stroke that draws itself on scroll (stroke-dashoffset). The wash becomes navy → navy-mid → ice in 3 stops, no banding. |
| R13 | Featured course cards | Photo 16:10, price badge (FREE green / $15 with struck $18), instructor avatar row, heart favourite | **Same anatomy, brand badges**: FREE = lime fill/navy text; price = navy fill/white text; struck price = navy 40%. Heart = 1px navy outline, fill lime on activate + 420ms spring scale + 6-particle burst (reduced-motion: colour change only). Image zoom 1.04 on hover inside `overflow:hidden`. |
| R14 | Nav | Logo left, links centre, soft-white Login pill + outline Register pill | **Keep 3-zone layout.** Login = ghost; Register = **lime fill, navy label, 0 radius shift**; both 40px tall. Add the family `Themes` item (§8). |
| R15 | Pagination dots | Pink pill + grey dot | Lime pill + navy 20% dots |
| R16 | Depth | Flat cards, almost no shadow, 1px hairline borders | Keep **flat-plus-hairline** as the house style. Only 3 elevation levels exist (§5.4). Never use both a heavy shadow and a visible border on the same element. |

### 2.1 Explicitly rejected from the reference

- The coral `#F4655F` accent and the pink/lavender mesh (breaks the palette).
- Third-party framework logos in category tiles (legal + off-brand).
- "20px" body copy at 320px viewport (accessibility floor is 16px; fluid type handles this).
- Stock-photo people who read as generic corporate (Nova's humans should look like students).
- Mixing centred and left-aligned section heads within one page (Nova uses **left-aligned** heads everywhere except the hero).

---

## 3. Design system

### 3.1 Colour usage map (Nova)

Nova is a **light-dominant** template. Target ratio per viewport: **White/Ice 55% · Navy 25% · Sky 12% · Lime 8%**.

| Surface | Token | Notes |
|---------|-------|-------|
| Page canvas | `--wa-white` | |
| Alternating section | `--wa-ice` at 55% (`#F4F8FE`) | Only every other section, max 2 consecutive |
| Hero mesh | ice + sky@22% + lime@10% | See R1 |
| Dark break (1 per page) | `--wa-navy` → `--wa-navy-deep` | Used for "Featured Courses" band and footer |
| Card | `--wa-white` | 1px `rgba(1,42,93,.07)` |
| Ink primary | `--wa-navy` | |
| Ink secondary | navy @ 66% | |
| Ink tertiary / meta | navy @ 48% | Never below 4.5:1 — verify per surface |
| Divider | `rgba(1,42,93,.10)` | |
| Accent | `--wa-lime` | **Fill only. One spark per viewport.** |
| Focus ring | 2px `--wa-lime` + 2px offset + 1px navy outer | Legal because it sits on navy or white with an outline; on white use **navy ring + lime halo** |

**Spark budget rule (enforced in review):** at any scroll position, count lime occurrences. Maximum: 1 primary CTA **or** 1 badge **or** 1 progress indicator, plus at most one 2–4px lime detail (border, dot, underline). Two competing lime blocks in one viewport is a defect.

### 3.2 Type scale (fluid, `clamp`, 390→1440px)

| Token | Size | LH | Tracking | Weight | Use |
|-------|------|----|----------|--------|-----|
| `--fs-display` | 36 → 64 | .98 | −.035em | 600 | Hero H1 |
| `--fs-h1` | 30 → 48 | 1.04 | −.03em | 600 | Page titles |
| `--fs-h2` | 26 → 38 | 1.1 | −.025em | 600 | Section heads |
| `--fs-h3` | 20 → 26 | 1.2 | −.02em | 500 | Card titles (large) |
| `--fs-h4` | 17 → 20 | 1.3 | −.01em | 500 | Card titles (small), row titles |
| `--fs-body-l` | 17 → 19 | 1.62 | 0 | 400 | Lede |
| `--fs-body` | 16 | 1.65 | 0 | 400 | Default |
| `--fs-small` | 13 → 14 | 1.5 | 0 | 400 | Meta |
| `--fs-mono` | 11 → 12 | 1.4 | .14em | 500 | Eyebrows, labels, IDs |
| `--fs-numeric` | 24 → 32 | 1 | −.02em | 700 | Stats, prices |

Rules: measure 60–75ch for body, 32ch max for H1/Nova hero. Never `rem` below 13px. Use `tabular-nums` on prices, counts, timers and durations.

### 3.3 Grid, spacing, radius

- Grid: 12 columns, gutter 24 (mobile 16), max width **1240**, page padding 20 → 32 → 48.
- Spacing scale (4px base): 4 8 12 16 20 24 32 40 48 64 80 96 128. Section rhythm: `clamp(64px, 8vw, 112px)` block padding; 24px between a head row and its rail.
- Radius: 8 (inputs/chips) · 14 (small cards) · 20 (icon squares) · 24 (cards) · 32 (hero visual, image frames) · 999 (pills). No mixed radii inside one component.
- Breakpoints: 390, 640, 768, 1024, 1280, 1440, 1680. Mobile-first, `min-width` only.

### 3.4 Elevation (only three)

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-pill` | `0 2px 8px rgba(1,42,93,.06), 0 1px 2px rgba(1,42,93,.04)` | Search, pills, nav when stuck |
| `--shadow-card` | `0 8px 24px -8px rgba(1,42,93,.10), 0 2px 6px rgba(1,42,93,.04)` | Cards on hover only |
| `--shadow-hero` | `0 32px 64px -24px rgba(1,42,93,.24)` | Hero visual, modals, the stat band overlay |

### 3.5 Iconography

- **24px grid, 1.75px stroke, round caps/joins**, `currentColor` only. One custom set of ~48 icons drawn on the same grid — no mixing of libraries.
- Categories must be **concept glyphs** (Code, Design, Data, Business, Language, Craft), not brand logos.
- Inline SVG sprite (`sprite.svg`, `<use>`) — no icon fonts, no per-icon HTTP requests.
- Decorative icons: `aria-hidden="true"` and `focusable="false"`.

---

## 4. Logo system (Nova)

### 4.1 Assets to produce

Generate `assets/brand/` from the PDF per `README.md` §3.4, then add Nova's co-brand lockups:

| File | Variants |
|------|----------|
| `wa-icon.svg` | navy, white, lime, black |
| `wa-mark.svg` | navy, white, lime |
| `wa-horizontal.svg` | navy, white, lime |
| `wa-stacked.svg` | navy, white |
| `wa-lockup-nova.svg` | horizontal lockup + `NOVA` chip, 2 colours (navy/white) + 1 mono black |
| `favicon.svg` + `favicon-32.png` | icon only, 16px-optimised: **drop the inner loop detail below 20px**, keep ring + single stroke |
| `app-icon-512.png`, `apple-touch-icon-180.png` | lime icon on navy deep |
| `og-nova-1200x630.png` | navy deep + dot grid + white wordmark + lime rule |

### 4.2 Navbar logo — states and motion

1. **Rest**: `wa-horizontal` height 28px (mobile) / 32px (desktop), navy. Clear space ≥ quarter of the icon diameter on all sides (from the deck).
2. **Load-in (once per session, `sessionStorage` key `wa-intro`)** — 1100ms total:
   - 0–500ms: the ring stroke draws (`stroke-dashoffset` 100%→0, `--ease-out-expo`) while the inner W path draws 120ms later.
   - 420–900ms: the wordmark unmasks with `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`.
   - 800–1100ms: the `NOVA` chip fades and slides 4px.
   - Skipped entirely if `prefers-reduced-motion: reduce` or the session key exists.
3. **Hover/focus-visible**: the inner loop traces once (700ms, dash offset, 1 iteration), ring stays put. No scale — logos don't bounce.
4. **Scroll (y > 24px)**: nav gains `--shadow-pill` + `backdrop-filter: blur(12px)` + `background: rgba(255,255,255,.82)`. Height 80 → 64px. The logo **condenses**: `wa-horizontal` cross-fades to `wa-icon` at 28px and the chip hides — 220ms, `--ease-loop`. This is the primary "the brand is always present" gesture.
5. **Scroll to top**: reverses. Never animate on every scroll frame — only on the threshold crossing (use a hysteresis band of ±8px).
6. **Focus**: `:focus-visible` on the logo link draws a 2px lime ring at 4px offset, radius 999.
7. **Print / no-CSS**: falls back to the navy horizontal SVG at 32px. It must never be replaced by retyped text.

### 4.3 Logo in other positions

- **Footer** (dark): `wa-stacked` white at 132px, with the tagline "Teach the world" in JetBrains Mono 11/`letter-spacing:.2em`/lime.
- **Loading state**: the icon, ring drawing continuously (1600ms linear loop) — used only for route-level lazy content, max 1.2s before it's replaced by real content.
- **Favicon**: icon only, lime on navy deep.
- **Empty states & 404**: `wa-icon` at 96px navy 12% as a watermark behind the message.
- **Certificate/OG**: stacked logo (per the deck, the stacked version is the default for certificates).

### 4.4 Misuse guards

Write `assets/brand/README.md` listing the deck's six prohibitions. Add a lint check in the build: grep for `<img` referencing the logo with a width/height ratio ≠ the source ratio, and for any inline logo coloured outside the approved list.

---

## 5. Motion system (Nova)

### 5.1 Principles

1. **Motion explains, never decorates.** Every animation answers "where did this come from / what just changed".
2. **The loop is the metaphor.** Entrances travel *along a curve*, not in straight lines — use `--ease-out-expo` for arrivals, `--ease-loop` for state changes. Only micro-interactions may overshoot.
3. **One spring per viewport.** Bounciness is a spice, not a sauce.
4. **Nothing moves more than 40px** unless it's a full-bleed reveal or a page transition.
5. **Every animated thing has a reduced-motion twin** defined in the same component, not bolted on later.

### 5.2 Tokens (`shared/motion.css`)

| Token | Value |
|-------|-------|
| `--dur-instant` | 100ms |
| `--dur-fast` | 180ms |
| `--dur-base` | 280ms |
| `--dur-slow` | 520ms |
| `--dur-cinema` | 900ms |
| `--dur-ambient` | 6000–12000ms |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` |
| `--ease-loop` | `cubic-bezier(.65,0,.35,1)` |
| `--ease-in-expo` | `cubic-bezier(.7,0,.84,0)` |
| `--ease-spring` | `cubic-bezier(.34,1.56,.64,1)` |
| `--stagger` | 60ms, cap 600ms total |

### 5.3 Signature animations (Nova's ten)

| ID | Name | Where | Spec |
|----|------|-------|------|
| M1 | **Loop intro** | Global, first visit | Logo draws + wordmark unmasks (§4.2). 1100ms. |
| M2 | **Mesh drift** | Hero | The two coloured radial gradients translate on a 14s / 18s loop, ±3% (CSS `background-position` on a 160%-sized layer, GPU-friendly via `transform` on pseudo-elements). Pointer adds ±12px parallax at 0.15 damping. |
| M3 | **Confetti parallax** | Hero | 5 shapes, 3 depth planes: front ±24px, mid ±14px, back ±6px, each with an independent 6–10s float (y ±10px, rotate ±3°). All driven by one `requestAnimationFrame` loop and one pointer listener on `document` — **not** five. |
| M4 | **Search pill focus** | Hero | Pill scales 1.005, shadow deepens, arrow button rotates −45° and the icon slides 20% (180ms). |
| M5 | **Counter roll** | Stat band, hero stats | `data-count="290"` counts 0→290 over 900ms, `--ease-out-expo`, starts on 35% intersection, once. `+` suffix is a separate span so it never animates. `prefers-reduced-motion`: final value only. |
| M6 | **Rise reveal** | All sections | `opacity 0→1`, `translateY(24px→0)`, 520ms `--ease-out-expo`, stagger 60ms per child, max 6 children. Trigger at 12% visibility, `once: true`. Use a single shared IntersectionObserver. |
| M7 | **Loop divider draw** | Section breaks | SVG path `stroke-dasharray: L; stroke-dashoffset: L→0` tied to scroll progress across the element (0→1 over 40vh), clamped. |
| M8 | **Category arc** | Category tiles | On hover/focus, the 60° lime arc rotates 45° (`--dur-slow`, `--ease-loop`) and the inner ring gap widens 8→12px. |
| M9 | **Favourite burst** | Course cards | Heart springs 1→1.25→1 (420ms) + 6 lime 3px particles radially 14px, fade 520ms. Reduced motion: fill change only. |
| M10 | **Stuck-nav condense** | Global | §4.2 item 4 — logo swap + height + blur, 220ms, triggered at a threshold only. |

### 5.4 Anti-patterns (auto-reject)

Scroll-jacking · parallax on text · animation on `height`/`top`/`left` · more than 2 simultaneous ambient loops in view · infinite attention-seeking animation near the CTA · `transition: all` · autoplay video with sound · hover-only affordances that hide functionality on touch.

---

## 6. Global chrome

### 6.1 Navbar (desktop ≥1024)

Height 80 → 64 stuck. Zones: logo (left, 32px) · primary links (centre-left): Home · Courses · Live Sessions · Library · Blog · About · **Themes ▾** · utility (right): search icon, `Log in` ghost, `Register` lime, and a 40px avatar-less account button on auth pages.

- Active link: navy 100% + 2px lime underline inset 4px, animated width 0→100% on mount (200ms). Inactive: navy 64%.
- **Mega menu (Courses)** — 3 columns: *By track* (6 links), *By level* (Beginner/Intermediate/Advanced), and a featured card (16:10 image + title + "View all 240 courses →"). Opens on hover-intent 120ms **and** focus, closes on `Escape` / click-outside / 200ms leave delay. Panel: white, radius 24, `--shadow-hero`, 1px hairline, max-width 880, 24px padding, enters with 8px translateY + fade 220ms. Keyboard: roving tabindex, `aria-expanded`, `aria-haspopup`.
- **Themes menu** (§8) sits last in the link list with a small `◆` glyph.

### 6.2 Mobile nav (<1024)

- 56px bar: hamburger (left), logo (centre, icon + wordmark), search (right).
- Drawer: full-height sheet, slides from the inline-start, 280ms `--ease-out-expo`, `inert` on the page behind, focus trap, `Escape` closes, returns focus to the trigger. Contains: search field at top, the link list (48px rows), the Themes group as an accordion, then auth CTAs pinned to the bottom with `env(safe-area-inset-bottom)`.
- No dropdown inside the drawer: the Courses group expands in place (max-height animation is banned → use a grid-rows `0fr→1fr` technique).

### 6.3 Footer

Navy → navy-deep, dot grid at 6% opacity. 4 zones: (1) stacked logo white + tagline mono lime + 3 social glyphs; (2) *Learn* (Courses, Tracks, Live, Library); (3) *Academy* (About, Mentors, Careers, Contact); (4) *Stay in the loop* — email field + lime submit (inline success state). Bottom rule: `© 2026 Web Academy` · Privacy · Terms · Accessibility · `// keep looping` in mono lime at 40% and a 12px `wa-mark` white at 50%. A single decorative loop line runs 2px above the bottom rule at 30% height, animated on scroll-in only.

### 6.4 Global components

Cookie bar (bottom, dismissible, 1 line, no modal) · skip link (first focusable) · announcement bar (dismissible, one per session, navy bg, lime dot) · back-to-top (appears at 1200px, 44px, lime icon on navy) · 404 with loop-line illustration · empty states with `wa-icon` watermark.

---

## 7. Page specifications

Route map (18 pages). `{slug}` pages are generated from data.

| # | Page | Path | Template file |
|---|------|------|---------------|
| P01 | Home | `/` | `index.njk` |
| P02 | Courses index | `/courses/` | `courses.njk` |
| P03 | Course detail | `/courses/{slug}/` | `course-detail.njk` |
| P04 | Tracks | `/tracks/` | `tracks.njk` |
| P05 | Track detail | `/tracks/{slug}/` | `track-detail.njk` |
| P06 | Live Sessions | `/live/` | `live.njk` |
| P07 | Session detail | `/live/{slug}/` | `live-detail.njk` |
| P08 | Library | `/library/` | `library.njk` |
| P09 | Library item | `/library/{slug}/` | `library-detail.njk` |
| P10 | Blog | `/blog/` | `blog.njk` |
| P11 | Blog post | `/blog/{slug}/` | `post.njk` |
| P12 | About | `/about/` | `about.njk` |
| P13 | Mentors | `/mentors/` | `mentors.njk` |
| P14 | Mentor detail | `/mentors/{slug}/` | `mentor-detail.njk` |
| P15 | Contact | `/contact/` | `contact.njk` |
| P16 | Pricing | `/pricing/` | `pricing.njk` |
| P17 | Legal | `/legal/{page}/` | `legal.njk` |
| P18 | 404 | `/404/` | `404.njk` |

Plus `search.njk` (client-side results), `themes.njk` (hand-off page), and the repo-root hub.

---

### P01 · Home

**Goal:** in 5 seconds, communicate *what*, *for whom*, *proof*, and give one obvious next action.

| § | Section | Spec |
|---|---------|------|
| 1 | Hero | 2-column at ≥1024 (7/5 split, 48px gap). Left: eyebrow, H1 (3 lines), search pill, trust row, stats row. Right: hero visual (R6). Height `min(880px, 92vh)`; content vertically centred with a 96px top offset for the nav. Below 1024: stack, visual 4:3 at 320px, shapes reduce to 3. |
| 2 | Stat band | 4 cards, −56px overlap, `--shadow-hero`. Scrolls horizontally as snap rail at ≤640 with cards 78vw. |
| 3 | Categories | Head row + scroll rail of 6–8 tiles (R10/M8). |
| 4 | Featured courses | **Dark band** (navy → navy-deep, dot grid at 8%). Head row inverts. 3-up grid of course cards at ≥1024, snap rail below. One lime spark = the "FREE" badge on the first card only. |
| 5 | How it works | 4 steps on a **loop line**: the connector draws as you scroll (M7). Step = 40px lime numeral in a navy circle, title, 2-line body. No cards — just the line and whitespace. |
| 6 | Live sessions teaser | 2-up: next-session card (with live pill, countdown) + a 3-row list of upcoming sessions with dates. "See the calendar →". |
| 7 | Library teaser | 3 resource cards, outlined, with type chips (Guide / Template / Video). |
| 8 | Mentors | Horizontal rail of 5, circular 88px portraits, name + specialty, hover → lift 4px + 1px lime ring. |
| 9 | Testimonials | 3 cards, quote glyph in navy 10% at 64px, avatar + name + course. Auto-advance **off**; drag only. |
| 10 | Blog teaser | 1 lead post (5:3 image) + 2 stacked items. |
| 11 | FAQ | 6 items, native `<details>` styled, one open at a time via JS, smooth 200ms opacity on the panel (never `height:auto`). |
| 12 | Final CTA | Full-bleed navy, loop line at the bottom, H2, 2 buttons (lime primary, white ghost), and the "Trusted by 15K" line. |
| 13 | Footer | §6.3 |

**Above-fold budget:** the LCP element is the hero image → preload it (`fetchpriority="high"`, AVIF, 720w/1080w), and serve a 24px blurred LQIP inline as the background. H1 must render before the image.

---

### P02 · Courses index

**Goal:** a catalogue that never dead-ends. 240 mock courses.

- **Header strip**: H1 "Courses", lede, result count (`aria-live="polite"`), and a `Search` field persisting from the hero query.
- **Left rail (sticky at ≥1024, 264px)**: filters — Track (checkbox list, counts), Level, Duration (chips), Price (Free / Paid), Rating (stars), Language. Each group is a `<fieldset>` with `<legend>`, max-height 240 with "Show all +". Chips for active filters appear above the results with an `×` and a "Clear all".
- **Results**: 3-up at ≥1280, 2-up at ≥768. Skeleton cards (3) on filter change, 240ms minimum to avoid flicker — no layout jump (same card heights).
- **Sort**: select (Most popular / Newest / Price ↑ / Highest rated). Changing filters/sort **updates the URL** (`?track=code&level=beginner&sort=new`) with `history.replaceState` — deep-linkable and back-button correct.
- **Mobile**: filters in a bottom sheet (80vh, drag handle, apply button showing the live count). The sheet uses the same markup; only presentation changes.
- **Empty state**: `wa-icon` watermark, "No courses match those filters", 2 suggested filter resets as buttons.
- **Load more**: "Load 9 more" button (not infinite scroll) — 44px, outline pill, updates `aria-live` with "Showing 18 of 240".

**Card anatomy (`course-card`)**: image 16:10 + badges (top-inline-start level chip; top-inline-end price) · title (2 lines max, `line-clamp-2`) · mentor row (24px avatar + name) · meta row (`12 lessons · 6h 20m · ★ 4.8`) · optional progress bar (2px, lime) for enrolled. Whole card is one link with `::after` covering the surface; the favourite button and mentor link are raised above it with `position:relative` (never nest interactive elements).

---

### P03 · Course detail

**Goal:** convert a browsing learner into an enrolled one, and answer every objection in order.

Layout: 2-column at ≥1024 — main 8 cols, sticky purchase panel 4 cols (`position:sticky; top:96px`); collapses to a bottom bar on mobile.

| Order | Block |
|-------|-------|
| 1 | Breadcrumb (`Home / Courses / {track} / {title}`) + track chip |
| 2 | H1 + subtitle + rating row + `Updated {month} 2026` + language |
| 3 | Mentor strip (avatar 40px, name, role, "View profile →") |
| 4 | **What you'll learn** — 6 lime-tick items in a 2-col grid, Ice panel |
| 5 | Curriculum accordion — sections with lesson rows (type glyph, title, duration). First section open. Row hover: Ice bg. Free lessons show a `PREVIEW` lime chip and are playable (modal player). |
| 6 | Requirements · Description (rich text, max 72ch) |
| 7 | **Instructor card** — bio, stats, other courses rail |
| 8 | Certificates block — ridge motif (§3.5) with a certificate preview; the one place the *ridges* graphic appears |
| 9 | Reviews — aggregate bar chart (5★ rows with 4px navy bars + lime fill on hover), 6 reviews, "Show more" |
| 10 | Related courses rail |
| 11 | Sticky CTA panel: price (32px, tabular), struck original, `Enrol now` (lime, full width, 52px), `Add to wishlist` ghost, and 4 trust rows (lifetime access, certificate, 30-day refund, mobile+desktop). On scroll past the hero, the mobile bar appears: price left, Enrol right. |

**Data:** `title, slug, track, level, price, currency, originalPrice, rating, ratingCount, students, duration, lessons[], sections[], mentor, languages[], updated, description, outcomes[], requirements[], reviews[], related[]`.

---

### P04 · Tracks / P05 · Track detail

- **P04**: 6–8 track cards in a 2-up bento — each a large radius-32 panel with a gradient tint, track name, course count, total hours, and a loop-line motif that draws on hover. → detail.
- **P05**: hero with track name + "8 courses · 1 capstone", a **numbered roadmap** down the page (vertical loop line connecting 8 nodes, each a course card with a left-aligned step numeral), an outcome statement, a mentor trio, and a final CTA. The roadmap line draws on scroll (M7) — the flagship use of the brand's loop.

---

### P06 · Live Sessions

**Goal:** show that the academy is alive. Two tabs: **Upcoming** (default) and **Replays**.

- Header: H1, lede, "Subscribe to calendar" (ICS download, `.ics` generated at build).
- **This week strip**: 7 day chips with a lime dot on days that have sessions; clicking filters the list (URL `?day=`).
- **List**: session rows (not cards) — 96px tall, timezone-aware time in tabular numerals, duration, title, mentor, seats left, `Live` / `Upcoming` / `Replay` chip, `Save seat` button. Rows are `grid-template-columns: 96px 1fr auto auto` with hairline dividers; the whole row is a link.
- **Empty day**: "No sessions on Wednesday" + "See the full week".
- **Timezone**: a small select ("Times shown in GMT+2 · change") persisted in `localStorage`; all times rendered client-side from ISO strings in `<time datetime>`.
- **P07 Session detail**: hero with countdown (tabular, hours:min:sec, updates 1/s but only when the tab is visible), mentor, what you'll build, prerequisites, "What to bring", registration form (name/email), and an "Add to calendar" pair (Google + ICS). Below: related recordings. When the session is live, the CTA becomes `Join live room` with a pulsing lime dot (2s, respects reduced-motion).

---

### P08 · Library / P09 · Library item

- **P08**: filter chips for resource type (Guide, Template, Checklist, Video, Dataset), a search field, and a 3-up grid of resource cards (file-type glyph in a tinted square, title, 2-line description, `12 pages · PDF · Updated Mar 2026`, `Download`). Count in `aria-live`.
- **P09**: 2-column — content (preview, table of contents for guides, description) + sidebar (download button, file meta, licence note, related). A **gate** state: for gated downloads show an email form with `aria-describedby` and a success state. Include the "ridgeline" header motif as the item's cover.
- Empty state for the whole library when no resource matches.

---

### P10 · Blog / P11 · Blog post

- **P10**: lead post (large 16:9, overlay title on a navy gradient scrim for contrast) + 2 featured cards + a filter row (All / Career / Tutorials / Academy news) + paginated list (9 per page with numbered pagination, not infinite scroll). RSS/`feed.xml` generated.
- **P11**: 68ch measure, 19px body, drop-cap optional off, sticky ToC on ≥1280 (highlights the current section via IntersectionObserver), reading-time, author card, share row, "related" 3-up, and a bottom newsletter capture. Code samples use the brand code block (navy-deep, JetBrains Mono, lime punctuation — matches the deck's code devices). Inline `figure` + `figcaption` in `--fs-small` navy 56%.

---

### P12 · About

Sections: (1) hero with a mission statement in `--fs-display` and a 16:9 studio photo; (2) "The loop" story block — three columns: *A loop / A fingerprint, completed / The world*, adapted from the brand story, each with its graphic element (loop line, ridges, ring); (3) timeline of the academy (4 milestones, vertical loop line); (4) numbers band (navy, 4 counters); (5) the team rail; (6) values (3 cards); (7) facilities/remote note; (8) CTA. **The brand-story block is the one place Nova uses ridges + loop + ring together** — it is the identity page.

### P13 · Mentors / P14 · Mentor detail

- **P13**: searchable grid of 12 mentors, cards with 88px portrait, name, specialty chips, `12 courses · 8.4K students`, rating. Hover: portrait ring in lime, card lifts 4px.
- **P14**: header with large portrait (4:5, radius 32), name, role, socials, stat trio; bio; "Courses by {name}" rail; "Sessions hosted" list; "Articles" list; CTA "Book a 1:1".

### P15 · Contact

Two columns: (1) form — Name, Email, Topic (select: Course enquiry / Billing / Partnership / Press / Accessibility), Message (min 6 rows, live counter), consent checkbox, submit (lime). Full inline validation on blur + submit, error text at 13px in a **non-colour** way (icon + text), `aria-invalid`, focus moves to the first invalid field, success replaces the form with a confirmation panel + loop-line tick animation. (2) contact details — email, phone, address, response-time promise, a static map placeholder (no third-party iframe by default; an optional `maps` embed is loaded only on click, to protect the performance budget), and office hours in tabular numerals. Below: 4 quick-link cards (Help Centre, Status, Community, Report a bug).

### P16 · Pricing

Three plans (Free / Pro / Teams) in a comparison layout: highlighted middle plan (navy panel, lime border, "Most popular" chip), monthly/annual toggle (annual saves 20%, price rolls with a 200ms counter), a 12-row feature matrix (sticky header row on mobile scroll), FAQ, and a "Need something custom?" strip. Add `Product`/`Offer` JSON-LD.

### P17 · Legal / P18 · 404

- Legal: one template rendering `privacy`, `terms`, `accessibility`, `cookies` from data; sticky ToC; "last updated" line; print styles (`@media print` — hide chrome, black on white).
- 404: navy-deep full viewport, dot grid, `wa-icon` watermark, "This page looped off the map", search field, 4 popular links, and a "Back home" lime button. The loop line sweeps across once (1200ms) on load.

---

## 8. Themes hand-off (family requirement)

- Navbar item `Themes` with a `◆` glyph, placed last before the utility zone. Dropdown (same panel as the mega menu): 4 rows — `◉ Nova` (current, marked with a lime dot + `Current` chip), `◉ Atelier`, `◉ Aero`, `◉ Folio`, divider, `All themes ↗` (hub).
- **Floating switcher**: 44px circular navy button, bottom-inline-end 24px, with the `wa-icon` white at 22px. On hover/focus it expands (240ms, `--ease-out-expo`) into a horizontal row of 4 chips: template name + tiny temperature swatch (Ice / White / Navy Deep / Lime). `Escape` collapses. Hidden when `prefers-reduced-motion` and the viewport is < 480px? — no: keep it, but show the collapsed button only.
- Paths are computed relative to the current page depth (`../../01-nova-academy/`). A build helper `rel(path)` must be used for every cross-template link so `file://` previews work.
- The switcher must not overlap the mobile sticky CTA bar — when that bar is visible, the switcher lifts to `bottom: calc(var(--sticky-bar-h) + 16px)`.

---

## 9. Content model

`_data/` (JSON, one file per collection). Minimum volumes: 24 courses, 8 tracks, 10 mentors, 12 sessions, 18 library items, 12 posts, 6 testimonials, 6 FAQs.

```js
course   = { id, slug, title, subtitle, track, level, price, currency, originalPrice?,
             rating, ratingCount, students, duration, lessonCount, updated, language[],
             image{}, outcomes[], requirements[], description, sections[{title, lessons[]}],
             mentorId, badge?, featured? }
track    = { id, slug, title, blurb, courseIds[], hours, capstone, tint }
session  = { id, slug, title, mentorId, startsAt (ISO), durationMin, seats, status, replayUrl? }
resource = { id, slug, title, type, pages, fileType, fileSize, updated, gated, description }
post     = { id, slug, title, excerpt, category, authorId, publishedAt, readingMin, hero{} }
mentor   = { id, slug, name, role, specialty[], bio, portrait, stats{}, socials{} }
```

Field rules: titles 30–64 chars (card clamp 2 lines), excerpts ≤ 140 chars, `duration` stored in minutes and formatted at build. All dates ISO 8601 UTC; all currency in minor units.

---

## 10. Engineering

### 10.1 Stack (locked)

Eleventy 3 + Nunjucks · Lightning CSS (nesting, custom media, automatic prefixes, minify) · esbuild (ESM bundle, target `es2020`) · sharp (AVIF/WebP + LQIP + `srcset`) · `@fontsource-variable/*` for self-hosted fonts. **No** CSS framework, **no** client framework, **no** runtime CDN.

### 10.2 File tree

```
01-nova-academy/
├── PLAN.md
├── .eleventy.js
├── package.json
├── src/
│   ├── _includes/{base.njk, head.njk, nav.njk, footer.njk, switcher.njk, course-card.njk, ...}
│   ├── _data/{site.json, courses.json, tracks.json, ...}
│   ├── _layouts/
│   ├── assets/
│   │   ├── css/{tokens.css, base.css, layout.css, components/*.css, pages/*.css}
│   │   ├── js/{main.js, motion.js, filters.js, carousel.js, countdown.js, form.js}
│   │   ├── brand/*.svg
│   │   ├── img/ (sources)
│   │   └── icons/sprite.svg
│   └── pages/*.njk
├── dist/           ← committed, self-contained, runnable from file://
└── tests/
    ├── a11y.mjs    (axe-core via puppeteer, fails on serious/critical)
    ├── links.mjs   (every internal href resolves to a file)
    └── budget.mjs  (JS/CSS/font/image byte ceilings)
```

### 10.3 JS budget (≤ 45KB gz total)

| Module | Ceiling | Notes |
|--------|---------|-------|
| `motion.js` | 4KB | One rAF ticker, one IntersectionObserver, one pointer listener; `data-motion` attributes only |
| `nav.js` | 3KB | Threshold, drawer, focus trap, mega menu |
| `carousel.js` | 5KB | Snap rail, drag, pagination sync, keyboard |
| `filters.js` | 6KB | URL state, card rendering (no framework) |
| `countdown.js` | 1.5KB | Visibility-aware |
| `form.js` | 4KB | Validation, aria |
| vendor | 0 | None permitted |

Defer everything; no script blocking first paint. Inline only a <1KB critical CSS block for the hero.

### 10.4 Images

Every content image: 2 widths minimum (720, 1080), AVIF + WebP fallback via `<picture>`, `width`/`height` always set, `loading="lazy" decoding="async"` except the hero (`fetchpriority="high"`). Portraits 4:5, course covers 16:10, blog 16:9, hero 4:5. Total image weight per page ≤ 900KB on mobile (LCP image ≤ 180KB). No hero video.

### 10.5 Quality gates in `npm run check`

HTML validation · axe-core on 6 representative pages · link check (all internal) · budget check · Lighthouse CI thresholds from README §4 (item 5) · a logo-geometry assertion (icon square, stroke ratio 6.84%).

---

## 11. Accessibility (Nova specifics)

- Every card rail is keyboard-scrollable and announces position (`aria-roledescription="carousel"`, `aria-label`, slide index in `aria-live="polite"` off by default — announce on demand via a "n of m" caption).
- The `Themes` dropdown and mega menu are fully keyboard operable; `Escape` returns focus to the trigger.
- Filters: apply button announces the new count; the results region is `aria-live="polite"` with `aria-atomic="false"` to avoid re-reading the grid.
- Focus ring: `2px var(--wa-lime)` + `1px var(--wa-navy)` outline-offset 3px on light grounds; `2px white` + navy halo on dark. Never remove focus without a replacement.
- All lime-backed controls use navy labels (11.19:1) — no white text on lime.
- Touch targets ≥ 44×44 (icon buttons get invisible padding).
- Form errors: `aria-invalid`, `aria-describedby`, an error summary at the top on submit with links to fields.
- Contrast audit must include text over images → all image text sits on a scrim ≥ 0.55 navy.

---

## 12. SEO & metadata

Per page: unique `<title>` (`{Page} · Web Academy`), 150–160 char meta description, canonical, OG + Twitter card (generated 1200×630 per page type), `theme-color` `#012A5D`, `lang="en"`, `dir="ltr"`. Structured data: `Organization` + `WebSite` (site-wide), `Course` + `CourseInstance` (course detail), `Event` (session detail), `Article` (post), `BreadcrumbList` (all interior), `FAQPage` (home + pricing), `Person` (mentor). `sitemap.xml` and `robots.txt` generated. Headings strictly one `h1` per page, no skipped levels.

---

## 13. Responsive behaviour (test these six widths)

| Width | Nav | Hero | Stat band | Rails | Filters |
|-------|-----|------|-----------|-------|---------|
| 390 | bar + drawer | stacked, visual 4:3, 3 shapes | snap rail, 78vw cards | 1.25 up | bottom sheet |
| 640 | bar + drawer | stacked | 2×2 grid | 2 up | bottom sheet |
| 768 | bar + drawer | stacked, 5 shapes | 4-up grid | 2 up | bottom sheet |
| 1024 | full nav | 7/5 | 4-up | 3 up | left rail |
| 1280 | full nav | 7/5 | 4-up | 3 up | left rail |
| 1680 | full nav, max 1240 content | 7/5 | 4-up | 4 up | left rail |

Also test 320px (content must not overflow; hero H1 may go to 4 lines) and landscape 812×375 (hero must not clip the CTA).

---

## 14. Build sequence (do not reorder)

1. **Foundation**: tokens, fonts, base CSS, grid, `sprite.svg`. Acceptance: a typographic specimen page renders every token correctly.
2. **Logo assets**: extract + normalise per README §3.4, build all variants, write the favicon/OG pipeline. Acceptance: geometry assertions pass; the icon reads correctly at 16px.
3. **Chrome**: nav (3 states), drawer, mega menu, Themes dropdown + floating switcher, footer. Acceptance: keyboard-only pass, no focus loss.
4. **Components**: buttons, pills, chips, cards (course/resource/post/mentor), accordion, tabs, rail, form fields, badges, empty/skeleton states. Acceptance: a `/styleguide/` page (not linked in nav, excludes from sitemap) shows every component in every state.
5. **Motion layer** (§5.3) with the reduced-motion matrix. Acceptance: toggling the OS setting visibly disables M2/M3/M5/M6/M7/M9/M10 with no layout shift.
6. **P01 Home** → 7. **P02/P03 Courses** → 8. **P04/P05 Tracks** → 9. **P06/P07 Live** → 10. **P08/P09 Library** → 11. **P10/P11 Blog** → 12. **P12–P14 About/Mentors** → 13. **P15/P16 Contact/Pricing** → 14. **P17/P18 Legal/404**.
7. **Hub page + cross-template links**, then the three test scripts, then performance tuning.

---

## 15. Acceptance criteria (report PASS/FAIL with evidence)

| ID | Criterion |
|----|-----------|
| AC-01 | All 18 routes exist in `dist/`, are reachable from the navbar or from a card on a reachable page, and return zero broken internal links. |
| AC-02 | The `Themes` dropdown lists all four templates and every link resolves from `dist/` on disk (`file://`). |
| AC-03 | The logo assets match the measured geometry: icon square, ring stroke 6.84/100, W 69.5×73.3 → ±0.5 units. |
| AC-04 | No colour outside the brand tokens appears in any computed style (automated scan of the CSS custom properties and hard-coded hex values). |
| AC-05 | Every text node passes WCAG AA contrast; specifically no lime-on-white and no sky-on-white text anywhere. |
| AC-06 | At any scroll position, no viewport contains more than one lime "spark" block (manual review at 1440 and 390). |
| AC-07 | `prefers-reduced-motion: reduce` disables M2, M3, M5, M6, M7, M9, M10; no content becomes invisible; no autoplaying motion remains. |
| AC-08 | Keyword-only operation reaches every page and completes: menu open, filter apply, course open, form submit. |
| AC-09 | Lighthouse mobile (throttled): Performance ≥ 90, A11y 100, Best-practices ≥ 95, SEO 100 on Home, Courses, Course detail. |
| AC-10 | Budgets: JS ≤ 45KB gz, CSS ≤ 30KB gz, fonts ≤ 120KB, LCP image ≤ 180KB. |
| AC-11 | CLS ≤ 0.05 on Home and Course detail, including the font swap. |
| AC-12 | The hero LCP image is preloaded with `fetchpriority="high"` and is the LCP element. |
| AC-13 | Every dynamic card links to a page that exists; no `href="#"` anywhere. |
| AC-14 | The site renders correctly at the six widths in §13 with no horizontal scrollbar at 320px. |
| AC-15 | `npm run check` passes: HTML validation, axe (no serious/critical), links, budgets, logo geometry. |
| AC-16 | Nova remains visually distinct from Atelier/Aero (different chrome, hero, palette temperature) while sharing identical brand tokens. |

---

## 16. Risks & guardrails

| Risk | Guardrail |
|------|-----------|
| The pastel mesh reads as a *new* palette | Keep the mesh under 22% opacity, and always sample it from `--wa-ice`, `--wa-sky`, `--wa-lime` only. Screenshot-compare against a flat-ice hero: it must still read "navy on light". |
| The 3D confetti looks childish | Max 5 shapes, all brand colours, 2 of them blurred, none larger than 140px, and they never overlap the H1 or CTA. |
| Lime overuse | Spark budget (AC-06) reviewed at two widths. |
| Card rails hide content on touch | Always expose the first card fully plus 0.25 of the next (peek), plus visible pagination dots and focusable arrows. |
| 240 mock courses slow the build | Generate from JSON at build; no client-side rendering of the catalogue. |
| Font swap causes layout shift | `size-adjust` fallback metrics for Lexend's local fallbacks; preload the 2 critical faces; `font-display: swap` plus a matched fallback stack. |

---

*End of Nova plan. Next: `02-atelier-academy/PLAN.md`.*
