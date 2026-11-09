# Web Academy — four education-first themes

**Nova · Atelier · Aero · Folio** — static websites for academies and independent educators, with original educational SVGs, useful local learning demos, and full pre-rendered **English / العربية (RTL)** editions.

## Run it

Requires **Node.js 20+**. No install step, framework, bundler or CDN is needed.

```sh
npm run build           # all themes + the family hub
npm test                # data/art/download tests + complete structural checks
npm run serve           # http://localhost:4173, binds 0.0.0.0
```

Open the root **`index.html`** to choose a theme. You can also open a theme's `dist/index.html` directly from disk. Navigation emits explicit relative `index.html` links, and browser scripts are classic scripts, not ES modules. Browser storage availability for `file://` varies; reading and downloads do not depend on it.

Single-theme builds: `npm run build:nova`, `build:atelier`, `build:aero`, `build:folio`. Deploy the **contents** of that theme's `dist/` to a static host. Keep the four sibling distributions and hub together if using the family switcher.

## Four distinct learning spaces

| Theme | Direction | Learning-site routes | Local tool |
|---|---|---:|---:|
| Nova | Friendly learning campus, catalogue search and learning paths | 95 | 1 |
| Atelier | Editorial programmes, faculty, critique and staged applications | 98 | 1 |
| Aero | Night-mode live teaching studio, questions and replay exploration | 90 | 1 |
| Folio | Creator-owned course storefront, projects and useful first lessons | 79 | 1 |

**All 287 original routes are retained.** Each theme adds 16 illustrated sample classrooms, a saved-course page and an illustration collection. Nova, Atelier and Folio also add an optional educator-proposal route. Every distribution includes a standalone type specimen tool. There are 362 English theme routes and 362 Arabic mirrors, plus four specimen tools per language and 112 Arabic document companions: **844 HTML files across the distributions, plus two family hubs**.

### Working local experiences

- Search, subject/level/free-or-paid filters, sorting, URL query state and reset controls.
- A browser-local saved-course shortlist; following educators where offered.
- Illustrated lessons: explanation → practical exercise → knowledge check, with completion saved locally. Notes are **not** saved.
- Real PDF syllabi for all 16 courses, 12 four-page workbooks with equivalent readable HTML transcripts, calendar `.ics` downloads, a spreadsheet CSV and a standalone type specimen tool.
- Accessible menus, mobile drawers, accordions, tabbed teaching explanations and manual testimonial rails.
- Validated enrolment, contact, interest, newsletter and event-registration **demonstrations**. Atelier's application validates each step, builds a text-safe review and does not persist personal details.
- Demo classroom settings, a user-initiated audio test, microphone/camera state previews and a questions form. **No actual devices are accessed or video meetings connected.**

**This is a complete static front end, not a connected LMS.** Prices, educators, learner stories and availability are fictional sample content. Forms do not send emails, process payments, publish courses, authenticate people or create live meetings. Connect your real services and replace the sample policies before publishing a real service. Sign-in is explicitly labelled as a demo; never enter a real password.

## English / العربية

Every theme has an accessible **العربية / English** control in its header and mobile drawer. It navigates to the same page in the other language, remembers a non-sensitive language preference when storage is available, and retains query/fragment state. Arabic is a complete pre-rendered edition: navigation, course/resource content, lessons/quizzes, validation, policies, accessible labels, metadata, artwork and relevant downloads—not a client-side text replacement or a `dir` toggle alone.

Arabic entry points: **`ar/index.html`** for the family and **`0*/dist/ar/index.html`** for a theme. English URLs and the original route contracts are unchanged. Both editions run from `file://` or a static host. Motion respects reduced-motion preferences, and native navigation works without JavaScript.

Local Noto Sans Arabic provides connected Arabic type. Arabic SVG labels are pre-shaped vectors; Arabic PDF syllabi/workbooks include embedded fonts and linked HTML alternatives. Calendars, CSV labels, token descriptions and the specimen tool are also localized. No translation service, browser-wide catalogue, CDN or production dependency is added.

See [localization and release maintenance](docs/I18N.md) for content editing, shaping/PDF export, language routing and verification.

## Academy / creator presets

The same four themes support both presentations; these are not eight separate themes.

```sh
WA_PRESET=creator WA_CREATOR_NAME="Your Name" npm run build:nova
WA_PRESET=academy npm run build:folio
WA_RECRUITMENT=1 npm run build:aero        # optional educator-recruitment navigation
WA_STANDALONE=1 npm run build:atelier     # removes family/demo-switcher chrome
WA_SITE_NAME="Your Studio" npm run build:folio
WA_SITE_URL="https://example.com" npm run build:nova  # canonical URLs + sitemap
WA_DEMO_DATE="2026-11-05T12:00:00Z" npm run build      # reproducible session fixtures
```

Defaults: Nova/Atelier/Aero are academies; Folio is a creator-owned learning studio. Learner discovery/enrolment stays primary. Recruitment is opt-in. Presets change presentation, not your course collection; replace the shared content fixtures for a genuinely individual educator's catalogue. `WA_STANDALONE` removes cross-theme navigation, **not** the honest demo disclosures. Configure `WA_SITE_URL` only for a single-theme deployment. Without a real URL, demo pages are `noindex`; utility and sample-classroom pages remain `noindex` even with one.

## Original SVG collection

`shared/lib/education-art.mjs` contains editable vector geometry, not raster images wrapped in SVG.

- **16 signature compositions:** four per theme, including the learning workspace, editorial notebook, whiteboard classroom, creator desk, mentoring, critique, programme, completion, workshop, replay and student-work scenes.
- **12 educational object illustrations** and **8 distinct interface states**.
- Subject-specific artwork for **all 16 courses**, plus resources, articles, tracks and original illustrated educator portraits.
- Accessible SVG titles/descriptions, instance-safe IDs, no scripts or remote resources. Standalone files are static; inline groups support contextual motion.

Every theme's `artwork/` page previews/downloads its assets; `assets/artwork.json` lists generated SVGs. See [implementation notes](docs/IMPLEMENTATION.md) for animation conventions and the scene map.

## Architecture

| Source | Purpose |
|---|---|
| `shared/lib/data.mjs` | Authoritative courses, curricula, prices, educators, sessions, resources and posts |
| `shared/lib/config.mjs` | Build-time presentation presets |
| `shared/lib/site.mjs` | Accessible shell, relative URLs, assets, downloads and generated learning routes |
| `shared/lib/ui.mjs` | Shared icons, form fields and cards |
| `shared/lib/education-ui.mjs` | Educational compositions, sample classrooms and local-demo disclosures |
| `shared/lib/education-art.mjs` | Original vector artwork |
| `shared/lib/downloads.mjs`, `resource-tools.mjs` | Dependency-free PDF/calendar writers and local learning tools |
| `shared/lib/hub.mjs` | Source for the generated bilingual family hub |
| `shared/lib/i18n.mjs`, `shared/locales/` | Build-time localization and compact runtime messages |
| `shared/lib/arabic-downloads.mjs`, `shared/downloads/ar/` | Printable Arabic source/HTML and verified PDF releases |
| `shared/css/base.css`, `education.css`, `rtl.css` | Foundation, responsive/accessibility layer and Arabic typography/direction |
| `shared/js/core.js`, `education.js` | Dependency-free browser interactions |
| `0*/src/` | Theme-specific page compositions, skin and behaviour |
| `0*/dist/` | Generated, committed standalone sites — **edit source, then build** |
| `tools/` | Preview, structural/data/browser checks and original logo extraction utility |

`VisualIdentity.pdf` and the four original reference JPGs are unchanged. The historical `PLAN.md` files describe the original design briefs; current implementation/verification lives in `docs/`.

## Brand, typography and accessibility

The shared palette remains navy `#012A5D`, deep navy `#001A3D`, mid `#14427F`, sky `#8DB8FF`, ice `#EAF1FB`, white and lime `#C8F560`. Skin tones and semantic error colours are intentional exceptions. Use navy text on lime, not lime text on white. The extracted logo geometry is preserved; the mark does not rotate.

**Lexend and JetBrains Mono are self-hosted Latin fonts; Noto Sans Arabic 400/700 is supplied for Arabic.** Authentic SIL OFL licences accompany them. The commercial brand-book fonts (Glock Grotesque, Milan Display and Tajarib) are not supplied. Arabic text uses joining-safe typography, and mixed-direction code, email/URL/number fields and timers are isolated appropriately.

Motion can be paused, respects reduced-motion changes, runs on only one visible SVG scene and stops in a hidden tab. Static content, navigation and downloads work without JavaScript; dynamic forms, saving and lesson progress require it.

The target is **WCAG 2.2 AA**, not a blanket conformance certification. See [QA and measured limitations](docs/QA.md), including remaining real-device, screen-reader and field-performance validation.

## Verification

```sh
npm run check
npm test                 # Node + structural + bilingual release checks
npm run test:i18n         # translated peers, local assets, PDF hashes and locale budgets
WA_I18N_REPORT=1 WA_I18N_STRICT=1 npm run build
# Optional browser-only tooling; not a production/build dependency:
npm install --prefix .cache/qa --no-save --no-package-lock \
  playwright-core@1.64.1 @sparticuz/chromium@153.0.0 @axe-core/playwright@4.14.0
npm run test:browser      # English regression
npm run test:arabic       # all Arabic routes, RTL breakpoints and interaction/fallback checks
npm run test:release      # real Arabic downloads, forced-color focus, media and fonts
npm run test:perf         # three throttled lab samples per theme in both languages
```

The browser runner also accepts `CHROMIUM_EXECUTABLE_PATH` for a system Chromium. Reports and screenshots go to ignored `.cache/education-qa/`. [QA](docs/QA.md) documents exact coverage and measurement conditions; gzip file budgets are enforced independently of browser performance.

The latest functional, structural and accessibility gates pass. The performance runner intentionally reports target misses: English Atelier/Folio exceed the preferred 1.8s lab median in the latest sample; all Arabic medians meet it. See [the full measured report and limitations](docs/QA.md); these are not field/CWV guarantees.
