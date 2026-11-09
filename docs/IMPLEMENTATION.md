# Education-first implementation

## What changed

The generator remains dependency-free Node ESM. Browser output remains HTML, local CSS/fonts/SVGs and one classic script per theme. No framework, CDN, media embed, tracking library or animation dependency was introduced.

The former generic art has been replaced with subject- and education-specific vector compositions. Folio now leads with a learner's creative transformation and a course collection, not recruitment or payout claims. Academy and creator modes share the same components and content schema. Teacher recruitment is optional navigation, not the default conversion goal.

Navigation reflows before it clips, mobile drawers trap/restore focus and close with Escape, accordions synchronize visible/accessible state, hidden controls leave the keyboard order, tables can be keyboard-scrolled, forms enforce field rules, and the Aero desktop purchase/sidebar layout collapses on small screens. Light-theme muted text uses readable navy-derived colours; dark text tokens are explicitly scoped.

## Build pipeline

1. A theme's `pages.mjs` returns its original route collection.
2. `page()` applies the education layer for known course/session/resource/legal families.
3. `build()` preserves those routes and adds sample classrooms, a shortlist, an artwork collection and optional educator proposal.
4. `prepareAssets()` concatenates base → theme → education CSS, writes two compact locale runtimes, English/shaped-Arabic artwork and local downloads, verifies Arabic PDF releases, and copies local fonts. Latin font faces have one shared definition; Arabic typography is a separate locale stylesheet.
5. `writeRoutes()` emits explicit relative `index.html` destinations, English/Arabic page mirrors, locale controls and paired metadata without changing original English URLs.
6. `build-all.mjs` generates both family hubs from actual build results. Optional base-URL builds emit paired public sitemap entries; demo builds remove stale public sitemaps.

The final education layer is deliberate: the original theme skins remain individually editable while shared layout/accessibility fixes have one authoritative owner. Do not hand-edit `dist/`.

## Scene map

| Theme | Hero | Supporting signature scenes |
|---|---|---|
| Nova | `nova` — learner/lesson workspace | `nova-path`, `nova-mentor`, `nova-completion` |
| Atelier | `atelier` — editorial programme notebook | `atelier-curriculum`, `atelier-critique`, `atelier-certificate` |
| Aero | `aero` — educator and teaching whiteboard | `aero-workshop`, `aero-community`, `aero-replay` |
| Folio | `folio` — creator-owned teaching desk | `folio-project`, `folio-creator`, `folio-gallery` |

Shared support concepts (`path`, `project`, `critique`, `curriculum`, `certificate`, `library`, `community`) also have static assets. Course art distinguishes typography, research, interface systems, accessibility, Python, data, motion curves, three-dimensional modelling, portfolios and teaching—not just random colours.

### SVG conventions

- `scene(kind, { id })` produces inline, accessible SVG. Supply a unique instance `id` when embedding twice on one page.
- `educationImageSet(theme)` supplies standalone asset names. These have no embedded animation/style/script/network dependencies.
- Named groups: `.edu-part--float`, `.edu-part--float-slow`, `.edu-draw`, `.edu-progress-stroke`.
- CSS individual `translate` is used for ambient movement so an SVG group's authored `transform` geometry is not overwritten.
- Only the nearest visible scene runs ambient movement. Reduced motion is static; offscreen/hidden-tab motion pauses. The control preference is session-local, not personal data.
- Objects/states are deliberately static, with useful titles/descriptions. Their purpose is comprehension, not perpetual movement.

## Working data and downloads

Curriculum lesson counts and minute totals are computed from the same data as course summaries. Educator and track course counts are derived, not independent marketing numbers. Cohort tuition is derived once from course fixtures; live dates are anchored to the build date (or `WA_DEMO_DATE`). The illustrated live room is explicitly labelled a demo, not a real broadcast. Calendar events also state this.

PDFs are simple, local, text/vector learning materials. Each resource's HTML transcript is generated from exactly the same section data as its PDF. The CSV estimate and type specimen tool add useful offline functionality. Calendar files use UTC times, stable IDs, escaping, CRLF and folded lines. They import events; they do not send invitations or create meeting rooms.

## Bilingual generation

The source remains English with a curated Arabic catalogue and complete Arabic route mirrors. `localizePage()` transforms rendered content at build time while protecting scripts, code, IDs and machine values, maps relative destinations to locale peers, emits shaped Arabic SVG labels, and adds Arabic typography. `languageHead()` supplies early preference handling, alternate links, locale metadata and localized schema URLs. A small per-theme `WAI18n` message map covers live UI feedback; there is no client-side DOM translation pass or catalogue fetch.

English routes remain unchanged. Each theme's `ar/` contains its page mirrors; localized JS, illustrations, calendars and downloads live under their asset category's `ar/`. Shared CSS/fonts/logos stay relative to the distribution. The hub and specimen tools also have native locale links. Saved IDs and completion flags are language-independent. Preference storage is guarded; no-JS and blocked-storage navigation remain native.

Noto Sans Arabic is local and joining-safe. Its source/licence, reusable shaped SVG atlas, 28 embedded-font Arabic PDF releases, printable HTML companions and release hashes are checked in. Normal builds require only Node and reject missing/stale/corrupt PDF releases. Optional browser/Python helpers refresh the generated release assets, never run in visitors' browsers. Details and commands: [I18N](I18N.md).

Critical hero copy is immediately visible in both languages. Ambient motion is confined to contextual illustrations; progressive cross-document transitions are short and opt in only under `prefers-reduced-motion:no-preference`. Mobile navigation can reflow to two rows at enlarged text sizes rather than clipping the brand, locale control or drawer button. Search groups and inputs shrink/wrap in both directions.

## Privacy and production boundaries

Local storage contains saved course IDs, completion flags and followed educator IDs. Local storage also holds the `en`/`ar` language preference. Session storage may contain a motion preference. Forms, application answers, notes and passwords are not saved by this implementation or sent anywhere. Browser-managed autofill and host access logs are outside this application's storage.

Production integration points are the validated form submission handlers and the data model. Connect real enrolment, email, payment, auth, video, CMS and certificate services deliberately. Replace fictional stories, prices, policies and contact addresses. Never treat a local demo confirmation as evidence of a real external action.

The preview server binds to `0.0.0.0`, accepts the proxied host, uses relative browser URLs, serves correct PDF/calendar/CSV types and allows iframe embedding. It is a development preview, not an authenticated production server.
