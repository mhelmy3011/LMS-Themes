# Verification report

## Release status

The English/Arabic implementation and functional/content/accessibility regression gates pass on `arena/956e53c0-lms-themes`. **The preferred laboratory LCP target is not fully met:** the latest English Atelier and Folio medians exceed 1.8 seconds. That performance gate deliberately exits nonzero; an older passing run is not substituted for the latest result.

These are executed sandbox checks, not accessibility certification, field Core Web Vitals, real-device results or PDF/UA certification.

## Executed gates

| Check | Latest result |
|---|---|
| `WA_I18N_REPORT=1 WA_I18N_STRICT=1 npm run build` | All four bilingual themes and both hubs built; 0 missing translation strings / 0 missing art labels |
| `npm test` | **27/27 Node tests**, complete structural inventory and bilingual release audit passed |
| `npm run test:arabic` | **741 checks, 0 failed; 121 axe scans, 0 violations; 0 runtime errors / failed requests** |
| `npm run test:browser` | **637 checks, 0 failed; 117 axe scans, 0 violations; 0 runtime errors / failed requests** |
| `npm run test:release` | **18 checks, 0 failed; 0 runtime errors / external requests** |
| Independent PDF/calendar parsing | **224 shipped PDFs / 768 pages; 88 calendar files / 160 parsed events** passed |
| `npm run test:perf` | 24 bilingual lab samples recorded; **fails the 1.8s median target for English Atelier/Folio**, detailed below |
| `git diff --check` | No whitespace errors at the final source check |

There are **1,378 full-browser checks plus 18 release smoke checks**, and **238 axe scans** across representative page families and selected interaction states. The browser runners visit every built HTML file for layout/assets/runtime checks; they do **not** run a separate axe scan on every content instance. Zero automated violations is not a blanket WCAG conformance claim.

### Inventory and dependency-free release checks

- All **287 original route contracts** remain present.
- **362 English theme routes + 362 Arabic mirrors**, four specimen tools per language and 112 Arabic HTML document companions: **844 theme/tool/document HTML files**, plus two family hubs.
- Distribution HTML counts: Nova **220**, Atelier **226**, Aero **210**, Folio **188**.
- **32,590 localized file references** checked, alongside the complete structural link/fragment/image/ID inventory. No broken references or duplicate IDs reported.
- **388 Arabic standalone SVGs**, with shaped labels, valid local glyph references and no image-font/raster/script dependency. The checked-in atlas has **240 label recipes / 141 reusable glyph outlines**.
- English/Arabic peers, native locale controls, `lang`/`dir`, titles, alternate links, runtime payloads, local WOFF2 signatures, Arabic calendars/CSV/token descriptions, PDF hashes and combined locale CSS/JS budgets checked.
- Both academy/creator presets and opt-in recruitment exercised in all four Arabic themes. Base-path canonical/hreflang/social/schema metadata checked across the original route compositions; public sitemap filtering and invalid URL rejection tested separately.
- Negative release tests reject missing manifests/PDFs, stale sources, duplicate inventory entries and corrupt bytes. PDF source hashes cover translated data, printable HTML and font bytes.

## Browser and interaction coverage

Tools: Playwright **1.64.1**, Chromium **153.0.8010.0**, axe **4.14.0**. Production/build code has no package dependencies. Tests use the local gzip preview on port **4173**; Cairo timezone is explicitly exercised in the Arabic runner.

### Layout and reading order

Representative home/catalogue/course/lesson/session/resource/application/about/teaching routes are exercised at:

- **320×740**, **390×844**, **768×1024**, **1024×768**, **1440×1000**, **1680×1050**.
- **844×390** landscape.
- **320px with the root text size enlarged to 200%**. This is a reflow test, not a claim that every real browser/OS zoom combination was tested.

Checks cover document overflow, loaded images, hidden-state integrity, navigation collisions including painted brand text, actual local font registration, localized headings and reduced-motion animation state. Decorative Aero glows and intentionally clipped rails are not treated as document overflow. Representative desktop/mobile screenshots were visually reviewed for joining Arabic, mirrored composition and intact controls.

### Functional states

- Same-page English/Arabic navigation, query/hash retention, reload and saved language preference; explicit English return; early preference redirects; keyboard Enter switching under normal native transitions and reduced-motion return.
- Drawer keyboard containment, Escape and focus return; desktop menus, accordions, Home/End and RTL arrow navigation; tab/rail indicators and reading-order advancement.
- Arabic/English discovery, search, subject/level/access filters, sorting, reset, URL state and shared saved IDs. Nova's load-more control now focuses the **first newly revealed course in the sorted DOM order**; the other catalogues already expose all 16 courses.
- Localized form validation and honest local success states; Atelier's staged application, length/consent rules, safe text review and no personal-information persistence.
- Sample-lesson answers, localized empty/incorrect/correct feedback, invalid-state clearing, completion, reload and reset; saved/follow/progress state remains language-independent.
- Cairo dates, Arabic digits, USD calculation, timezone/timer/code directional islands; Aero avoids splitting Arabic heading letters into character spans.
- Demo equipment controls/settings/questions, contextual illustration motion, pause/reduced-motion changes and hidden-tab behavior. No real devices or video rooms are connected.
- JavaScript-disabled reading/navigation, direct `file://` navigation and localized relative assets, plus blocked-storage operation.
- Forced-color focus/layout smoke checks on both-language homes and hubs; 44px-or-larger locale links and loaded font faces checked. This is not real assistive-technology or OS high-contrast certification.

### Fixes caught during verification

The sweeps found and corrected narrow Arabic search-input overflow, enlarged-text header collisions, a preference script running before its peer metadata, native quiz validation suppressing localized feedback, reduced-motion view-transition aborts, English USD/countdown regressions, a Latin alphabet left in the Arabic specimen, a missing Folio Latin-font declaration and sorted load-more focus targeting. Critical hero text no longer waits behind opacity-zero entrance animation. A near-opaque header no longer pays for unnecessary full-width backdrop blur.

## Download and metadata verification

`tools/check-downloads.py` independently parsed:

| Language | Shipped PDF copies | PDF pages | Calendar files | Events |
|---|---:|---:|---:|---:|
| English | 112 | 384 | 44 | 80 |
| Arabic | 112 | 384 | 44 | 80 |

Each language has 28 distinct documents copied into four distributions: 16 three-page syllabi and 12 four-page workbooks. English workbook paragraph checks covered **1,488 shipped paragraph instances**. Arabic checks verified expected pagination, Arabic text, page-bound text geometry, document `/Lang ar`, marked/tagged metadata and **224 embedded Arabic font instances** across the 112 copies. Representative PDF rasters were reviewed; that is not a claim of human review of every page.

All Arabic PDF source and binary hashes match their manifest and all four distribution copies. Browser release tests performed native Arabic PDF downloads in every theme, checked filenames/hash/content type, opened the corresponding Arabic HTML alternative, and verified localized CSV BOM/formulas, token JSON values/descriptions and calendar MIME/event counts. Language-specific 1200×630 social PNGs were checked from live metadata URLs. Metadata/base-path unit tests cover correct canonical, alternate and schema URLs; demo utilities and 404 pages remain `noindex`.

Arabic PDF extraction order/spacing varies by reader. Tag information and embedded fonts alone do not prove a good screen-reader experience. Linked semantic HTML companions use the same translated sections and remain the preferred alternative when a PDF reader is unsuitable.

## Payload budgets

KiB below means bytes / 1024. Arabic CSS includes **the theme stylesheet plus `rtl.css`**, separately gzipped; JS is the complete Arabic runtime bundle, not just the locale delta.

| Theme | Arabic CSS gzip KiB / budget | Arabic JS gzip KiB / budget |
|---|---:|---:|
| Nova | **22.3 / 30** | **15.0 / 45** |
| Atelier | **21.6 / 30** | **15.1 / 30** |
| Aero | **22.5 / 30** | **15.7 / 42** |
| Folio | **23.4 / 24** | **14.5 / 30** |

All enforced byte budgets pass. Local Arabic 400/700 fonts total **74.3 KiB**. The **152.5 KiB** combined English/Arabic font inventory per distribution is not a per-navigation transfer figure. English does not preload Arabic fonts; Arabic replaces the Latin preload and uses its own body fonts. Technical code can still use the local Latin monospace face.

The artwork collection is intentionally the heaviest non-public utility (roughly 1 MiB raw HTML plus referenced assets in the structural estimator). That estimate is neither compressed transfer nor LCP. Do not use it as a homepage performance score.

## Latest bilingual lab performance

Three runs per theme/language, 24 total, without a competing browser audit. Conditions:

- Chromium **153.0.8010.0**, **390×844**, DPR **1**, mobile emulation, **4× CPU slowdown**.
- CDP latency **150ms**; throughput configured as **1.6×1024² bits/s down** (~1.68 Mbit/s), **750×1024 bits/s up** (~768 kbit/s).
- Local gzip server, HTTP cache disabled and cleared before each navigation, origin storage cleared; **shared warm browser process**, not a cold real device.
- Normal motion enabled; observation through load, font readiness and another **1500ms**, without scrolling or user interaction.
- LCP element/text/size and visible hero-heading evidence recorded. The final samples measure hero text, not a brand-only paint. Response-body byte sums come from CDP response content lengths, excluding HTTP headers; the runner records missing encoded-transfer evidence as null rather than claiming a zero-byte page.

| Theme / language | LCP runs ms | Median ms | CLS max | Fetched response bodies, median KiB |
|---|---|---:|---:|---:|
| Nova / English | 1696, 1392, 1240 | **1392** | 0 | 135.1 |
| Nova / العربية | 1208, 1104, 1160 | **1160** | 0 | 178.7 |
| Atelier / English | 1576, 1908, 1856 | **1856** | 0 | 129.1 |
| Atelier / العربية | 968, 1152, 1160 | **1152** | 0 | 169.1 |
| Aero / English | 1504, 1388, 1492 | **1492** | 0 | 135.8 |
| Aero / العربية | 1240, 1292, 1276 | **1276** | 0 | 179.5 |
| Folio / English | 1548, 2076, 2072 | **2072** | 0 | 133.0 |
| Folio / العربية | 1040, 1148, 1188 | **1148** | 0 | 163.6 |

**All Arabic medians meet the preferred ≤1.8s lab target; English Atelier/Folio do not in this latest sample.** All 24 observations stayed within the CLS ≤0.05 target. Earlier samples varied, including software-GPU stalls; these results must not be represented as a guaranteed speed on production hardware. The gate still enforces 1800ms and was not relaxed to turn the latest run green.

The runner records an observed long-task blocking sum during this window. It is **not measured INP**, and it is not presented as Lighthouse's canonical TBT. Real-device/browser profiling, production-host measurements and field telemetry remain necessary before a Core Web Vitals claim.

## Reproduce and inspect

```sh
WA_I18N_REPORT=1 WA_I18N_STRICT=1 npm run build
npm test
npm run serve
# Optional tooling installation: see README / I18N.
npm run test:arabic
npm run test:browser
npm run test:release
npm run test:perf          # may exit 1 when a preferred lab target is missed

# Optional independent parsers; never production dependencies:
python -m pip install --target .cache/qa-python pymupdf icalendar
PYTHONPATH=.cache/qa-python python tools/check-downloads.py
```

Ignored reports/screenshots live in `.cache/education-qa/`:

- `arabic/browser-report.json`, `browser-report.json`, `release-smoke.json`.
- `i18n-report.json`, `downloads-report.json`, `performance.json`.
- Per-theme desktop/mobile screenshots and representative English/Arabic workbook rasters.

The preview remains on **4173**, bound to `0.0.0.0`; both hubs and all four Arabic entries return 200, including a preview-style Host header. Browser URLs are relative and iframe embedding is not blocked.

## Remaining production review

- Improve/re-measure the two English LCP misses on representative hardware and the real host; collect field data before any CWV claim.
- Fluent Arabic editorial review of replacement content and real Arabic screen-reader/task testing. Zero missing-string diagnostics is not proof of fluency.
- Real iOS/Android, Safari/Firefox, native browser/OS zoom, high-contrast and assistive-technology combinations. The sandbox smoke tests do not substitute for them.
- Independent PDF reading-order/PDF-UA assessment if PDF conformance is required; keep HTML alternatives available.
- Replace fictional content/policies and deliberately connect real authentication, payment, enrolment, email, CMS and video services. Current confirmations are explicitly local demos, not external transactions.
