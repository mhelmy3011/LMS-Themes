# 02 · ATELIER ACADEMY
## Execution plan — full website template

> **Agent contract.** This document is self-contained. Read it end to end before writing code.
> Reference image: `website2.jpg` · Brand law: `VisualIdentity.pdf` (+ repo `README.md` §3).
> Deliverable: `02-atelier-academy/dist/` — static multi-page site, plain HTML/CSS/ESM.

---

## 1. Template charter

| Field | Value |
|-------|-------|
| Name | **Atelier** |
| Co-brand lockup | `◉ Web Academy` + chip `ATELIER` (JetBrains Mono 11/500, `letter-spacing:.24em`, navy on White, 1px hairline box, 4px radius) |
| Type | Full website template, 20 routes, multi-page |
| Positioning | The premium, cohort-based academy for professionals and teams. Small cohorts, named faculty, applied projects. Calm on the surface, exact underneath. |
| Primary audience | Senior professionals (28–45) and L&D / talent leaders buying for teams |
| Jobs to be done | Learner: "Prove to my employer this is worth the time." Buyer: "Show me rigour, outcomes and a named human I can talk to." |
| Success metric (design) | Application starts, syllabus download/booking-a-call, time-on-syllabus |
| Emotional register | Assured, quiet, editorial, unhurried. *Not* playful, *not* salesy. The confidence of a print magazine, the clarity of a contract. |
| Signature | The **arc of portraits** in the hero + the **bento mosaic** of tonal panels + a centered logo that docks left on scroll |
| One-line brief | *An academy that reads like a well-set book and behaves like a well-run studio.* |

### 1.1 Where Atelier sits in the family

Atelier is the **editorial, light, expensive** temperature. Nova is warm and popular; Aero is dark and live. Atelier wins by **restraint**: fewer colours per screen than the other two, the largest type scale, the widest gutters, the slowest easing, and the only template in the family allowed to use **asymmetric editorial grids** (a 12-col grid with content deliberately off-centre).

Rule of thumb for every page: *if a section can be communicated with a heading, one paragraph and whitespace instead of a card, do that.* Cards are a last resort in Atelier — panels and rules are the default.

---

## 2. Reference deconstruction (`website2.jpg`)

| # | Element in reference | Reference treatment | Atelier treatment (build this) |
|---|----------------------|---------------------|-------------------------------|
| A1 | Page ground | Warm cream `#F2EFE9` | **White `#FFFFFF` paper**, with `--wa-ice` (`#EAF1FB`) tonal panels at full strength (not tinted further). Cream is not in the palette; the warmth is replaced by *tone*: white paper, ice panels, navy ink. Never use a beige/sepia derivative. |
| A2 | Nav architecture | Links left · wordmark dead centre · links + dark pill CTA right | **Keep exactly.** 8 links split 4/4 around a centred logo. Left: Courses · Cohorts · Faculty · Library. Right: For teams · About · Blog · Contact, then a 40px navy pill `Book a call` with a 26px circular lime arrow on its inline-end edge. Below 1280 reduce to 3/3 + CTA; below 1024 switch to the Atelier mobile bar (§6.2). |
| A3 | Hero type | Serif line + bold sans line, centred, tight | **Weight-contrast display**: line 1 in Lexend **200** at `--fs-display` with `letter-spacing:-.045em`; line 2 in Lexend **600**. The reference's serif/sans pairing becomes a *light/heavy* pairing in one family (the brand permits exactly one Latin family — see README §3.3). Both lines centred, max 24ch each, `line-height:.96`. |
| A4 | Hero CTA | Black pill with a small circled arrow inside | **Navy pill, 52px, label + 30px circular lime disc containing a navy 16px arrow.** Hover: the disc slides +6px, the arrow rotates −45°→0°, the pill grows 2px inline padding. 280ms `--ease-loop`. This is the family's most-copied CTA — get it exact. |
| A5 | **Arc of portraits** | 7 portrait cards on a large circle; centre upright, edges rotated ±24° and clipped by the viewport; cards bleed off both sides | **Keep, it is the signature.** Geometry: a virtual circle of radius 1180px centred at 50% / 132% of the hero; 7 cards, each 200×260 (radius 16), rotation −24 / −16 / −8 / 0 / 8 / 16 / 24°, the two outermost at 55% opacity and clipped by an overflow-hidden mask at the hero edges. Below 1024: 5 cards, radius 760; below 640: 3 cards, and the outer two become 40% opacity +30% blur. |
| A6 | Feature trio under the arc | 3 columns, hairline vertical dividers, small bold heads, 3-line body | **Keep** — 3 columns × 1px `rgba(1,42,93,.10)` dividers, 20px inset, headings `--fs-h4` Lexend 500, body 15px navy 64%, max 34ch. On mobile the dividers become horizontal rules. |
| A7 | Section head | Centred H2 + 2-line centred sub, huge | **Keep centred here** (Atelier's global rule: section heads are centred on Home and About; left-aligned on interior/commercial pages). |
| A8 | **Bento mosaic** | 2-column mosaic of large radius-20 cards; photo cards with text overlay bottom-left; solid cards in taupe / sage / olive | **Keep the mosaic, replace the palette**: photo cards ×2, `--wa-navy-mid` panel, `--wa-ice` panel, a `--wa-navy-deep` panel with dot grid, and exactly **one** `--wa-lime` panel (the spark, holding the single most important claim). Overlay text always sits on a 0.55 navy scrim for contrast. Mosaic spans: 7/5 then 5/7, 32px gap. |
| A9 | Card colours (taupe/sage/olive) | Muted, low-contrast, warm | Banned. Tonal panels only: Navy Deep, Navy Mid, Ice, White, plus one Lime. Text on navy mid = white (9.93:1); text on ice = navy (12.39:1); text on lime = navy (11.19:1). No other combinations. |
| A10 | "Proven results" band | Cards below a centred head | **Results strip**: 4 figures on a hairline top rule, no cards — number in `--fs-numeric` 40px Lexend 500, label in `--fs-mono`. Sits on ice. |
| A11 | Depth | Almost none; radius and image do the work | Keep: **no shadows except `--shadow-soft` on media**, no borders on photo cards. Panels are separated by tone, not by lines. |
| A12 | Whitespace | Very generous, ~120px between blocks | Keep and exceed: `clamp(80px, 10vw, 160px)` section rhythm. Content max-width **1180** (narrower than Nova's 1240) with a 720px text column. |
| A13 | Imagery | Warm, natural-light portraits, shallow depth, muted | **Direction matters**: natural light, no blue-cast studio light, subjects mid-gesture, eye-level, 4:5 or 3:2, desaturated by 8% and warmed by 2% to sit next to navy without turning cold. 12 portraits minimum. No stock handshakes. |
| A14 | Motion | Static in the reference | Atelier's motion is **almost invisible**: long durations, no bounce, no parallax on text. See §5. |

### 2.1 Rejected from the reference

- Cream/beige/olive/taupe surfaces and any "warm grey".
- The serif typeface (off-system).
- Body copy at 12px on the feature trio — Atelier's floor is 15px.
- Small tap targets in the top nav (the reference's links are ~14px text with no padding) — Atelier gives every nav link a 44px hit area.

---

## 3. Design system

### 3.1 Colour (Atelier usage map)

Distribution per viewport: **White 50% · Ice 22% · Navy family 20% · Lime 6% · Sky 2%**.

| Use | Value |
|-----|-------|
| Paper | `--wa-white` |
| Tonal panel | `--wa-ice` (full) |
| Ink | `--wa-navy` |
| Secondary ink | navy @ 64% |
| Tertiary ink | navy @ 46% |
| Hairline | `rgba(1,42,93,.10)`; on dark `rgba(141,184,255,.22)` |
| Dark panel | `--wa-navy-deep` (+ dot grid 6%) |
| Mid panel | `--wa-navy-mid` |
| Spark | `--wa-lime` — **one panel or one CTA per page section, never both** |
| Support | `--wa-sky` — rules, chart bars, hover fills at ≤ 24%; never text on white |

Atelier deliberately uses **Sky less than the other two** and **no gradients except the photo scrim**. If a gradient appears outside a scrim or the certificate ridges, it is a defect.

### 3.2 Type scale

Atelier runs a **larger, tighter** scale than Nova, with a heavier reliance on two weights only (200 and 500/600). Mono is used for *labels and metadata only*, never for body.

| Token | Size | LH | Tracking | Weight |
|-------|------|----|----------|--------|
| `--fs-display` | 40 → 84 | .96 | −.045em | 200 (line 1) / 600 (line 2) |
| `--fs-h1` | 34 → 60 | 1.02 | −.035em | 300 |
| `--fs-h2` | 30 → 52 | 1.06 | −.03em | 300 |
| `--fs-h3` | 22 → 30 | 1.2 | −.02em | 500 |
| `--fs-h4` | 18 → 21 | 1.3 | −.015em | 500 |
| `--fs-lede` | 18 → 22 | 1.55 | 0 | 300 |
| `--fs-body` | 16 → 17 | 1.7 | 0 | 400 |
| `--fs-small` | 13 → 14 | 1.55 | 0 | 400 |
| `--fs-mono` | 10.5 → 11.5 | 1.4 | .22em | 500 (uppercase labels) |

Text column 66ch for reading, 46ch for ledes. Numerals: `tabular-nums` everywhere in tables and result strips. **Never** justify text. **Never** use `text-transform: uppercase` on headings — only on mono labels.

### 3.3 Grid & spacing

- 12-column, gutter 32 (mobile 20), max **1180**, page padding 24 → 40 → 56.
- **Editorial offsets (allowed only here)**: content may start at column 2 or 3 and stop at column 10; images may break the grid by exactly one column. Never break by half a column.
- Spacing scale: 4 8 12 16 24 32 40 56 72 96 128 160 200. Section rhythm `clamp(80px, 10vw, 160px)`.
- Radius: 4 (labels/chips) · 16 (cards/portraits) · 20 (bento panels) · 999 (pills). Atelier's radii are **tighter** than Nova's — nothing is 32 except the hero portrait frames.
- Elevation: `--shadow-soft: 0 24px 48px -32px rgba(1,42,93,.28)` — applied to media blocks only. Panels are flat.

### 3.4 Iconography

- **20px grid, 1.25px stroke** — thinner than Nova's 1.75 to match the light type. Round caps.
- Atelier uses **very few icons**: arrows, plus/minus, chevrons, check, download, calendar, play. Category concepts are expressed with typography, not glyphs.
- Arrows are the house glyph: `→` drawn as a 20px line + 6px head, always inside a circle when it's a CTA.

### 3.5 Editorial devices (the Atelier signature)

1. **Hairline rules** — 1px `rgba(1,42,93,.10)` separating blocks; a rule always runs the full content width and is followed by 24px.
2. **Mono kicker** — `COHORT 07 · FEBRUARY` style, letter-spaced, above every section head.
3. **Drop-figure** — a large numeral (120px, Lexend 200, navy 12%) set behind the first paragraph of long-form pages, aligned to the text's left edge.
4. **Marginal note** — a 240px column in `--fs-small` navy 54% holding asides, sources and speaker notes. Only on ≥1280.
5. **Photo caption** — `figcaption` in mono 10.5px, navy 46%, with a leading 12px hairline rule.

---

## 4. Logo system (Atelier)

### 4.1 Assets

Same base set as README §3.4, plus:

| File | Note |
|------|------|
| `wa-lockup-atelier.svg` | horizontal wordmark + `ATELIER` chip in a hairline box — 3 colours (navy / white / mono black) |
| `wa-stacked-atelier.svg` | for the footer and the certificate |
| `favicon.svg` | icon, navy on white — Atelier's favicon is **navy**, not lime, because the browser chrome is light and lime would vanish (1.26:1) |
| `og-atelier-1200x630.png` | white paper, huge light headline "...", navy wordmark bottom-left, 1px hairline frame inset 40px, one lime 6px square |
| `press-kit/` | the logo set as SVG + PNG + EPS-named `.pdf` placeholders, zipped at build for the "Brand" page |

### 4.2 The centered-logo gesture (Atelier's signature motion)

This is the template's most distinctive interaction and must be built exactly:

1. **At rest (top of page, ≥1024)**: nav is a single 92px row on white, no border, no shadow, no background fill. Four links left (right-aligned to a centre gutter), the `wa-horizontal` logo **dead centre** at 30px, four links right, then the CTA pill.
2. **Scrolling down past 40px**: the logo **docks**. A FLIP transition (First-Last-Invert-Play, 420ms `--ease-loop`) moves the logo from centre to the inline-start, the nav height drops to 64px, a hairline bottom border fades in, and the background becomes `rgba(255,255,255,.86)` + `backdrop-filter: blur(14px)`. The four left links slide 16px toward the start region and re-order visually to sit after the logo.
3. **Scrolling up**: docking stays (no jitter). At `scrollY < 40`, it undocks with the same 420ms FLIP reversed.
4. Below 1024 the center-to-start docking is disabled — the mobile bar is already left-aligned.
5. `prefers-reduced-motion`: instant position change, 120ms opacity only.
6. Implementation: measure with `getBoundingClientRect()` before/after a class toggle, apply `transform: translate() scale()` inverse, then transition to identity. Never animate `left`.

### 4.3 Other logo placements

- **Hero**: no logo (the nav already carries it). Atelier never repeats the mark in the hero — restraint.
- **Footer**: stacked, white, 140px, tagline in mono lime above a 1px `rgba(141,184,255,.28)` rule.
- **Cohort certificates**: stacked navy on white with the ridges motif, per the deck's certificate page — the only place ridges are filled-free and centred behind the mark (never fill them).
- **Loading**: no spinner. A 1px lime line grows left→right across the top of the viewport (indeterminate, 1.4s), then fades. Motion is minimal by design.

---

## 5. Motion system (Atelier)

### 5.1 Principles

1. **Motion is a reveal, not an event.** Nothing should be noticed as animation; things should simply have arrived.
2. **No bounce, ever.** The spring curve is not permitted in Atelier. Use `--ease-out-expo` and `--ease-loop` only.
3. **Long and slow**: base duration 420ms, cinema 900ms, ambient ≥ 10s.
4. **Text moves as lines, not as blocks** — mask reveals, never `translateY` on a paragraph.
5. **Silence is a feature.** At least two sections per page have *no* entrance animation at all.

### 5.2 Tokens

`--dur-fast 200` · `--dur-base 420` · `--dur-slow 640` · `--dur-cinema 900` · easing `--ease-out-expo` `cubic-bezier(.16,1,.3,1)` and `--ease-loop` `cubic-bezier(.65,0,.35,1)` only. **`--ease-spring` is forbidden in this template.**

### 5.3 Signature animations (Atelier's eight)

| ID | Name | Where | Spec |
|----|------|-------|------|
| T1 | **Arc fan-in** | Hero | On load, the 7 portrait cards start at rotation 0 and translateY 24px with opacity 0, then fan to their final rotations, staggered **70ms** from the centre outward (centre first), 900ms `--ease-out-expo`. Total 1.35s. Reduced motion: opacity 200ms, final rotations applied immediately. |
| T2 | **Line-mask headline** | Hero + section heads | Each line of the display type sits in an `overflow:hidden` wrapper and rises 100%→0 with `translateY`, 640ms, `--ease-out-expo`, 90ms per line. The H1 never fades — it *unveils*. |
| T3 | **Logo dock (FLIP)** | Global nav | §4.2. |
| T4 | **Clip-path image reveal** | All editorial images | `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` over 900ms `--ease-out-expo`, combined with a 1.06→1 `scale`. IntersectionObserver at 15%, once. Never on the hero arc. |
| T5 | **Bento hover** | Mosaic | Panel lifts 3px, the image inside scales 1.03 (both 600ms), and a 1px lime rule grows along the panel's bottom edge from 0→64px. Text does not move. |
| T6 | **Rule draw** | Section transitions | 1px full-width rules scaleX 0→1 from the inline-start, 900ms, when the rule enters the viewport. This single device carries most of Atelier's page rhythm. |
| T7 | **Arrow disc** | All CTA buttons | Disc slides 6px, arrow rotates −45°→0°, 280ms `--ease-loop`. Reverses on blur. |
| T8 | **Counter (quiet)** | Results strip | Numbers fade in at their final value over 640ms; **no counting**. Atelier considers a rolling number vulgar. |

### 5.4 Forbidden

Spring/overshoot · parallax · scroll-jacking · sticky-scroll storytelling · cursor effects · auto-rotating carousels · gradient sweeps · marquees (**except** one partner-logo marquee on the For Teams page) · any animation over 1.35s on load.

---

## 6. Global chrome

### 6.1 Desktop nav

Structure per §4.2. Additional behaviour:
- **Courses** and **For teams** are dropdown triggers. Panels are **full-bleed editorial sheets** (not floating cards): they open below the nav as a white band 320px tall with a hairline top border, content laid out in 3 columns on the 12-col grid, entering with `clip-path: inset(0 0 100% 0)` → `inset(0)` 420ms. This is distinct from Nova's floating mega menu and is one of the clearest family differentiators.
- Active page: a 3px navy dot *before* the label (not an underline) — Atelier's quieter active state.
- Keyboard: `aria-expanded`, `Enter`/`Space`/`ArrowDown` opens, `Escape` closes and restores focus, roving tabindex inside the sheet.

### 6.2 Mobile bar (<1024)

64px, white, hairline bottom rule. Logo left (icon + wordmark, 26px), `Menu` text button right (not a hamburger glyph — Atelier prefers words), and a 40px `Book a call` pill only on commercial pages. Drawer: full-screen white sheet with a 1px hairline under a 64px header, links in `--fs-h3` at 56px row height, mono kickers over each group, CTA at the bottom, 420ms `clip-path` reveal, focus trap, `inert` behind.

### 6.3 Footer

White with a 1px top rule (not the navy footer the other templates use — Atelier's footer is light, and this alone signals the difference). Five columns: stacked logo + one-line descriptor; *Learn*; *Company*; *Resources*; *Contact* (address, email, phone). Bottom: hairline, then a 4-column row of mono 10.5px legal links, the copyright, and a 24px `wa-mark` navy 24% at the far end. On dark pages (For Teams, Apply) the footer inverts to navy-deep.

### 6.4 Global components

Reading progress bar (1px lime, long-form only) · skip link · cookie notice as a single editorial line with an inline "Preferences" link (no modal) · print stylesheet · back-to-top as a 40px hairline circle with an up arrow, appears after 1600px.

---

## 7. Page specifications

| # | Page | Path |
|---|------|------|
| A01 | Home | `/` |
| A02 | Courses | `/courses/` |
| A03 | Course detail | `/courses/{slug}/` |
| A04 | Cohorts (calendar) | `/cohorts/` |
| A05 | Cohort detail | `/cohorts/{slug}/` |
| A06 | Live Sessions | `/live/` |
| A07 | Session detail | `/live/{slug}/` |
| A08 | Library | `/library/` |
| A09 | Library item | `/library/{slug}/` |
| A10 | Blog | `/blog/` |
| A11 | Article | `/blog/{slug}/` |
| A12 | About | `/about/` |
| A13 | Faculty | `/faculty/` |
| A14 | Faculty member | `/faculty/{slug}/` |
| A15 | For teams (enterprise) | `/for-teams/` |
| A16 | Contact | `/contact/` |
| A17 | Admissions / Apply | `/apply/` |
| A18 | Tuition & funding | `/tuition/` |
| A19 | Brand / press | `/brand/` |
| A20 | Legal + 404 | `/legal/{page}/`, `/404/` |

---

### A01 · Home

| § | Section | Spec |
|---|---------|------|
| 1 | Hero | Centred. Kicker `FEBRUARY COHORT · 14 SEATS` (mono, navy 54%) → display headline 2 lines (light + heavy, T2) → 2-line centred lede (max 52ch) → CTA pill (A4) → a `Watch the studio film · 2:10` text link with a 24px outlined play glyph. No logo, no hero card. Total height `min(760px, 78vh)` **including** the arc. |
| 2 | Arc of portraits (A5) | 7 cards, fan-in (T1), each card is a link to a faculty member with a mono caption on hover (`ILLUSTRATION · ANA TORRES`). Alt text is the person's name + discipline. The arc bleeds to both viewport edges. |
| 3 | Feature trio (A6) | 3 items: *Cohort, not course* / *Named faculty* / *Work you can show*. |
| 4 | Centred head + mosaic (A7/A8) | Head: "Everything the working professional needs to learn properly" + 2-line sub. Mosaic 6 panels: (a) 7-col photo + overlay claim, (b) 5-col ice panel with 3 bullet rows, (c) 5-col navy-mid panel with the ridges motif at 12%, (d) 7-col photo, (e) 12-col lime panel, single line, `--fs-h2` navy — the page's spark, and (f) 6/6 navy-deep + dot grid panel with a mono quote. Hover T5. |
| 5 | Results strip (A10) | 4 figures: graduation rate, average cohort size, NPS, hiring partners. Hairline top rule, no cards, ice ground. |
| 6 | Syllabus preview | A 2-col block: left = a real 6-week syllabus table (week, theme, deliverable) with hairline rows; right = the "How a cohort runs" paragraph + a link to the full syllabus PDF. |
| 7 | Faculty strip | 4 portraits in a 4-up row, 3:4, hover reveals name + discipline with a 420ms clip reveal. Link to `/faculty/`. |
| 8 | Library teaser | 3 items as **text rows** (type · title · date · `↓`), no cards. |
| 9 | Testimonial | Full-bleed ice, one quote at `--fs-h2` weight 300, 900ms mask reveal, attribution in mono, plus a 12px lime square before the name. **Single** testimonial — Atelier doesn't stack quotes. |
| 10 | For-teams band | Split: left copy + `Talk to our team` pill; right a partner-logo marquee (the only marquee permitted) at 40% opacity, 1px rules top and bottom, pauses on hover and on focus. |
| 11 | Journal teaser | 2 posts as editorial rows with 3:2 thumbnails at 96px. |
| 12 | Closing CTA | Centred, navy-deep full bleed, dot grid, display headline, CTA pill + "Download the prospectus" text link. |
| 13 | Footer | Light variant (§6.3) |

---

### A02 · Courses

- **No filter sidebar.** Atelier uses a **horizontal filter bar** on one hairline rule: `All · Product · Data · Design · Leadership · Craft` (chips, 36px) + a `Sort` text-select, right-aligned, and a live count in mono. Sticky under the docked nav at `top:64px` with a white background.
- **Results as an editorial list**, not a grid: each course is a full-width row — 5-col thumbnail (3:2) + 6-col text + 1-col meta. Row height ~200px, hairline between rows, hover: the thumbnail scales 1.02 and the row's title shifts 4px to the inline-end with the `→` glyph appearing. This list is the single biggest structural difference from Nova's card grid.
- 4 rows per page + "Show more" (text button with a growing rule).
- Mobile: rows collapse to thumbnail-above-text with 16px gaps; the filter bar scrolls horizontally with snap.
- Empty state: a single centred line + "Clear filters" text link.

**`course-row` anatomy**: monogram-less; `COHORT 07` mono kicker · title (`--fs-h3`) · 2-line summary (navy 64%) · meta line (`6 weeks · 8 seats · live + async · £2,400`) · arrow.

---

### A03 · Course detail

Editorial, single-column-with-marginalia, no sticky buy box (Atelier does not sell like a shop). Instead:

1. Kicker + H1 + 2-line lede + meta row on a hairline.
2. Full-bleed 21:9 hero image with a mono caption.
3. **At a glance** — a 4-column figure row (duration / effort / cohort size / fee) on ice.
4. Outcomes — 5 numbered items in a 2-col list, numerals in Lexend 200 32px navy 30%.
5. **Syllabus** — an accordion of 6 weeks; each week expands to a 3-col table (session, reading, deliverable). Print-friendly.
6. Faculty — 2 cards, large portraits, 3-line bios, link to profiles.
7. Who it's for — 2-column "This is for you if…" / "This is not for you if…", the second column with a hairline strike-through treatment.
8. Assessment & certificate — ridge motif block, per the deck.
9. Dates & fees — a table of upcoming cohorts (date, seats, location, fee) with an `Apply` link per row.
10. FAQ (6) — `<details>`, one open.
11. Marginal note column (≥1280) carries the reading list and the "questions?" aside.
12. Closing CTA band.

**No price in a floating panel.** The fee appears once in the figure row and once in the dates table — that's the editorial stance, and it must be preserved.

---

### A04 · Cohorts / A05 · Cohort detail

- **A04**: a **calendar-driven list**. Group by month with a sticky month rail; each cohort row: dates (tabular), course, location (Studio / Remote), seats-left meter (4px rule, navy track, lime fill — spark), fee, `Apply`. A year switcher at the top. Empty months collapse to a single line.
- **A05**: cohort as an itinerary — day-by-day schedule for the 6 weeks (a vertical timeline with hairline rules, no line drawing here; Atelier prefers rules to curves), the 8-seat roster (avatars in grey with "Seat filled" mono labels), location block with a static map, fee + cancellation policy in a definition list, and an apply CTA. Includes the `.ics` download for the calendar.

---

### A06 · Live Sessions / A07 · Session detail

- **A06**: two sections, not tabs — **Upcoming** (list rows grouped by week) and **The archive** (a 3-up grid of recording cards with a 16:9 thumbnail, duration chip and mono date). The archive uses the `clip-path` reveal (T4).
- **A07**: a "session brief" — title, mono kicker with date/time in the local timezone, faculty strip, 3-part anatomy: *What we'll cover* (bullets), *What to prepare* (checkboxes with a print link), *Who it's for*. Then `Register` (primary) + `Add to calendar` (secondary, with an ICS + Google choice). Below: the related session list and the reading list (marginalia on desktop).

---

### A08 · Library / A09 · Library item

Atelier's library is a **journal shelf**, so:
- **A08**: a filter row (Syllabi · Case studies · Reading lists · Studio guides · Templates), then rows grouped by year with a large year numeral in Lexend 200 at 56px navy 12% in the start margin. Each row: type chip, title, 1-line description, `PDF · 24 pages · 1.4MB`, download glyph. Hover: the row's background becomes ice and the download glyph shifts 4px down.
- **A09**: two-column reading layout — content (abstract, table of contents, preview pages as images, citation block in mono) + a sticky sidebar (Download PDF, meta definition list, licence, related). Gated items show an inline email form, *not* a modal.

---

### A10 · Blog / A11 · Article

- **A10**: an editorial index — one lead article at 2/3 width with a 3:2 image and a 5-line standfirst; a 1/3 column listing 4 recent titles as text rows; then a 3-column grid of the rest with mono kickers and no excerpts beyond one line. Category filter as inline text links on a hairline rule, active one in navy with a lime 16px underline.
- **A11**: the most "book-like" page in the family. 66ch measure, 18px/1.75 body, mono kicker, `--fs-h1` 300 headline, drop-figure numeral on the first paragraph, marginalia for asides, pull-quotes at `--fs-h3` weight 300 with a 2px lime inline-start rule, figure + mono caption with hairline, footnotes as a numbered list at the end, author block with a 56px portrait, a "Filed under" mono row, and prev/next article as two 50% rows with hairlines. Sticky ToC at ≥1280 in the marginalia column. Reading progress bar (1px lime) at the top.

---

### A12 · About

Six movements: (1) editorial hero with a 21:9 studio photograph and a display statement; (2) "Why we exist" in a 6-col offset text block with the drop-figure; (3) the brand-story triptych — *A loop / A fingerprint, completed / The world* — with the three brand graphics (loop line, ridges, ring) at 120px each, on ice; (4) a horizontal timeline of 5 milestones on a hairline; (5) the faculty grid (links to A13); (6) governance & accreditation block (trust) + contact. No counters that roll.

### A13 · Faculty / A14 · Faculty member

- **A13**: a 3-up grid of 3:4 portraits with name + discipline beneath (no cards, no borders). A discipline filter on a hairline. Hover: image `clip-path` reveal of a second state? No — Atelier's hover is a 1.02 scale + the name's `→`. Keep it quiet.
- **A14**: two-column — sticky portrait (3:4, 420px) + biography in a 62ch column with mono section labels (*Teaches · Background · Selected work · Publications*). Then "Cohorts taught" rows, "In the library" rows, and a "Book a conversation" CTA. Include `Person` JSON-LD.

### A15 · For teams

The commercial page — still editorial, never a sales page. Structure: hero statement + logo marquee; `The problem` (3 short paragraphs, 6-col offset); `How we work with teams` (4 steps on hairline rules, numbered with mono `01–04`); `Programmes` (3 offers as a comparison table with hairline rows, not pricing cards); `Outcomes` (2 case studies as editorial rows with figures); `Procurement & security` (a definition list: invoicing, DPA, SSO, data residency, accessibility statement); a lead form (name, company, role, team size, message) with inline validation; and a `Download the L&D prospectus` block. Footnote: prices on request — no numbers.

### A16 · Contact

Editorial split: left = a 6-col form (name, email, reason select, message, consent) with the same strict validation and error-summary pattern as Nova; right = a 5-col block of contact routes as rows (General, Admissions, Partnerships, Press, Accessibility) + studio address + hours in tabular numerals + a "We reply within two working days" promise. Below: a static map image (not an iframe) with a mono caption.

### A17 · Admissions / Apply

A **3-step form** (no account creation):
1. *You* — name, email, role, seniority, country.
2. *Your cohort* — course select (from cohorts data), preferred start, fee funding (Self / Employer), motivation (textarea, 200–1200 chars with a live counter).
3. *Review* — a definition list of everything entered + consent + submit.
Progress: 3 hairline steps with mono numerals, the current one underlined 1px navy. Per-step validation blocks the next step; the URL hash reflects the step (`#step-2`) for back-button safety; the form state is preserved in `sessionStorage`. Success page (inline panel) confirms with the cohort dates and an `.ics` link. All errors announced; the step heading receives focus on change.

### A18 · Tuition & funding

Fee table across the 8 courses (course, fee, deposit, duration) with hairline rows and a sticky header row; a funding block (employer sponsorship, instalments, 3 scholarships with eligibility lists); a cancellations & transfers definition list; FAQ (6); a "Talk to admissions" CTA.

### A19 · Brand / press

A brand-asset page that proves the identity system is respected: logo downloads (SVG/PNG zip), clear-space and minimum-size diagrams (reusing the deck's rules), the colour table with the measured contrast ratios, type specimens, the misuse list ("Don't stretch, rotate, recolour, use lime on light, retype"), the graphic-element library, and the press contact. **This page is the family's brand QA artifact** — every other template links to it.

### A20 · Legal + 404

Legal index + 4 documents in the reading layout with a sticky ToC, "last updated" mono line, and print styles. 404: white, 1px hairline frame, huge light numeral "404", a single sentence, a search field, 4 text links, and no illustration.

---

## 8. Themes hand-off

- Navbar: `Themes` appears as the **last** item in the right link group (before the CTA) with a 12px outlined diamond glyph.
- Its panel is the editorial full-bleed sheet (not a dropdown card): 4 columns, one per template, each a **34px light title + temperature swatch + one-line descriptor + `View →`**, plus a 5th narrow column `All themes` with the hub link. Current template marked with a 3px lime dot after the title.
- **Floating switcher**: a 40px **hairline circle** (white, 1px `rgba(1,42,93,.16)`) with the `wa-mark` at 18px navy. Expands on hover/focus into a 4-row stacked list of template names with temperatures (vertical, not horizontal — Atelier's geometry is vertical). `Escape` collapses.
- Cross-template links use the build-time `rel()` helper so `file://` works at any depth.

---

## 9. Content model

Same base fields as Nova (see `01-nova-academy/PLAN.md` §9) plus the Atelier-only collections:

```js
cohort      = { id, slug, courseId, startsAt, endsAt, sessions, location, seats, seatsFilled,
                fee, currency, deposit, schedule[{week, theme, deliverable}] }
programme   = { id, slug, title, audience, duration, format, outcomes[], priceOnRequest: true }
caseStudy   = { id, slug, client, sector, headline, figures[{value,label}], body, logo }
brandAsset  = { id, name, file, format, size, usage, downloadUrl }
```

Rule: **no prices rendered as strings** — always `fee` in minor units formatted by a shared formatter with the correct currency symbol and thousands separators.

---

## 10. Engineering

Stack, file tree, asset pipeline, and quality gates are **identical to Nova** (`01-nova-academy/PLAN.md` §10) with these deviations:

| Area | Atelier deviation |
|------|-------------------|
| JS budget | **≤ 30KB gz** — very little interactivity; no carousel library, no parallax ticker |
| `motion.js` | FLIP helper + IntersectionObserver + `clip-path` reveal + rule draw only (~2.5KB) |
| `apply.js` | Multi-step form controller (~5KB), separate chunk loaded only on A17 |
| Fonts | Only 4 faces used (Lexend 200, 300, 400, 500) → subset aggressively; preload 200 + 500 |
| Images | Editorial images are the page weight: cap each at 260KB, use 3:2 / 21:9 / 3:4 crops, all with `sizes` attributes |
| Print | A real `print.css`: hides chrome, forces black-on-white, expands all `<details>`, prints the syllabus and the fee table cleanly (A03/A18 must be printable to PDF for procurement) |

---

## 11. Accessibility (Atelier specifics)

- Light-weight display type (200) at large sizes is **decorative scale only** — never below 30px, never for body, never for interactive labels. Verify the light weight still reads at 200% zoom.
- The FLIP logo animation must not move focus or create a focus outline jump; `prefers-reduced-motion` swaps instantly.
- The full-bleed sheet menus must be reachable by keyboard and must not trap focus in the sheet without a visible close affordance.
- Editorial rules and hairlines are decorative: `aria-hidden` where they are `::before` content.
- The 3-step form must announce step changes (`aria-live="polite"` on the step heading) and keep errors per-field.
- Print stylesheets must be tested — procurement teams print the syllabus.

---

## 12. SEO & metadata

As Nova, with: `Course` + `CourseInstance` for A03 **and** `Event` + `Offers` for A05, `Article` for A11, `Person` for A14, `Organization` + `EducationalOrganization` site-wide, `BreadcrumbList` everywhere. Canonicals on every paginated list. Article pages include `author`, `datePublished`, `dateModified` and `wordCount`.

---

## 13. Responsive behaviour

| Width | Nav | Hero | Arc | Mosaic | Course list |
|-------|-----|------|-----|--------|-------------|
| 390 | bar: logo + `Menu` | stacked, display 40px | 3 cards | 1 col, panels stack | thumbnail above text |
| 640 | same | display 48px | 3 cards | 1 col | thumbnail above text |
| 768 | same | display 56px | 5 cards | 2 col (5/7 spans) | 4/8 split |
| 1024 | full nav, no centre dock | display 64px | 7 cards | 2 col | 5/6/1 |
| 1280 | full nav + centre dock | display 76px | 7 cards, full bleed | 2 col + 12-col lime panel | 5/6/1 + marginalia |
| 1680 | as above, content 1180 | 84px | 7 cards | as above | as above |

---

## 14. Build sequence

Foundation & tokens → **logo assets + the dock FLIP** → chrome (nav with centre dock, sheets, footer light/dark, switcher) → component library + `/styleguide/` → motion layer (T1–T8) → Home → Courses/Course detail → Cohorts/Cohort detail → Live/Session → Library → Blog/Article → About/Faculty → For teams → Contact → Apply (3-step) → Tuition → Brand → Legal/404 → hub links → tests → performance.

**Rule:** do not build any page until T1, T2, T6 and the docked logo work — they define the template's character.

---

## 15. Acceptance criteria

| ID | Criterion |
|----|-----------|
| AT-01 | All 20 routes exist; navbar reachability complete; zero broken internal links. |
| AT-02 | The nav logo is centred at rest and docks to the inline-start on scroll with a 420ms FLIP, without focus loss or layout shift; instant under reduced motion. |
| AT-03 | The hero arc renders 7 / 5 / 3 cards at the specified breakpoints with the specified rotations, bleeds off both edges, and fans in centre-first during load. |
| AT-04 | No cream, beige, taupe, sage or olive value exists anywhere in the CSS. |
| AT-05 | `--ease-spring` and `--dur-*` beyond the Atelier table are absent; no overshoot is visible in any transition. |
| AT-06 | Every editorial image uses the `clip-path` reveal; no image uses a plain fade. |
| AT-07 | The bento mosaic contains exactly one lime panel, and it is the highest-contrast element in the section. |
| AT-08 | The 3-step apply form validates per step, survives back/forward via hash, and preserves input in `sessionStorage`. |
| AT-09 | Print CSS renders A03, A05 and A18 to clean black-on-white PDFs with chrome hidden and `<details>` expanded. |
| AT-10 | Lighthouse mobile: Perf ≥ 92, A11y 100, BP ≥ 95, SEO 100 on Home, Courses, Course detail. |
| AT-11 | JS ≤ 30KB gz, CSS ≤ 30KB gz, fonts ≤ 120KB, every image ≤ 260KB. |
| AT-12 | WCAG AA holds; specifically no Sky-on-white and no Lime-on-white text (verified by audit). |
| AT-13 | The Brand page (§A19) documents the real, shipped assets and the measured contrast ratios. |
| AT-14 | Atelier is unmistakably different in chrome and rhythm from Nova and Aero while sharing identical tokens. |

---

## 16. Risks & guardrails

| Risk | Guardrail |
|------|-----------|
| Replacing serif contrast with weight contrast can look *flat* | Enforce the 200/600 pairing, `−.045em` tracking on light display type, and a ≥ 2.4× size jump between display and body. Test at 1440 and 390. |
| An all-white editorial site can look unfinished | The ice panels, hairline rules and mono kickers carry the structure. Audit each page: at least 4 tonal blocks and 6 rules per 2 screens. |
| The arc breaks on odd viewports | Compute radius from the container width with `clamp()`; the outer cards must always be clipped by ≥ 30% of their width at every width in §13. |
| The centered logo collides with long page titles | Nav is fixed-height, logo is absolutely centred in a dedicated middle track; at 1024–1180 the link groups reduce rather than the logo moving off-centre. |
| Editorial restraint reads as "no design" to a client | The Brand page and `/styleguide/` exist to make the system visible and auditable. |
| Marginalia adds complexity | Only render at ≥1280; never place required content there. |
