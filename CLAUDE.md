# Big Boss Rent — project guide

Working context for every session. Read this first, then `ART_DIRECTION.md`.

---

## 1. Project brief

A car rental website for **Big Boss Rent**. Market: Georgian-speaking; exact
city / country / service area **not yet provided** (see `ART_DIRECTION.md` §10).

- Small fleet: **3 cars at launch**, one per category. The fleet will grow, so
  data and layouts must not hard-code "three".
- **Mobile-first.** The phone layout is the primary design and is designed first.
  Desktop is a secondary adaptation of it.
- **No booking calendar, no availability logic, no payments.** Renting happens by
  **phone call or WhatsApp**. Every "Rent" action is a `tel:` or `wa.me` link.
- **Three languages:** Georgian (`ka`, default), English (`en`), Russian (`ru`).
- **Light and dark mode**, user-togglable. First visit follows the OS setting;
  after that the choice is remembered.
- **Social media links** live in the header or footer.
- **Never invent a company fact** — address, working hours, founding year, fleet
  size claims, awards, partners, testimonials. If a section needs a fact the
  client has not given, leave a **clearly marked gap** and ask. Running list of
  outstanding facts: `ART_DIRECTION.md` §10.

### The cars (one per category at launch)

| Category | Car                     |
| -------- | ----------------------- |
| Sedan    | Maserati Ghibli         |
| SUV      | Mercedes-Benz G-Class   |
| Coupe    | Chevrolet Corvette      |

### Site structure

1. **Home** — a strong hero, then a category section. Each category is a card
   with a car photo and a label (Sedan / SUV / Coupe).
2. Tapping a category opens **that category's page**.
3. **Category page** — cars laid out as side-profile shots in a horizontally
   scrollable row.
4. Tapping a car **animates it out of the row, expands it**, and reveals the
   car's other photos plus its specs: horsepower, top speed, engine
   displacement, drivetrain, transmission, seats, price per day.
5. A prominent **"Rent" button** that dials the phone number or opens WhatsApp.

---

## 2. Tech stack (installed)

| Concern        | Choice                                                    |
| -------------- | -------------------------------------------------------- |
| Build / app    | React 19 + Vite + TypeScript                             |
| Styling        | Tailwind CSS v4 (via `@tailwindcss/vite`)                |
| Animation      | **GSAP** — the primary animation system, incl. **Flip**  |
| Smooth scroll  | **Lenis** — the ONE smooth-scroll engine                 |
| Routing        | `react-router-dom`                                       |
| Interface icons| **Solar** set, **bundled at build time** (`@iconify-json/solar` + `unplugin-icons`) — no runtime fetch, works offline |
| 3D             | **None.** Three.js deliberately not installed — see below|

Rules that do not bend:

- **Lenis is the only smooth-scroll engine.** Do **not** install Locomotive
  Scroll or any second scroll library. GSAP ScrollTrigger, when added, syncs to
  Lenis (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker` drives
  `lenis.raf`).
- **GSAP is the primary animation system.** The card → detail expansion uses the
  **Flip plugin**. Reach for CSS transitions only for token cross-fades and
  trivial hover states.
- **No Three.js** until the explicit evaluation in Stage 7.

---

## 3. Critical asset rule

Real car photos do not exist yet; they arrive later.

- **Never draw a car, wheel, or any illustration** with SVG paths, CSS shapes,
  or canvas. Not as a placeholder, not "temporarily", never.
- Every image is referenced **by key from one data file** (`src/data/media.ts`).
  A `<Media>` component resolves the key; a missing image renders a deliberate,
  aspect-correct `<Placeholder>` — a designed surface, **no broken-image icon,
  no "image here" text, nothing that reads as unfinished**.
- Dropping in real photos later must mean editing **only that one data file**
  (plus adding the files under `src/assets/`).
- Solar icons are for **interface icons only** — never illustration — and are
  **bundled locally** (no runtime CDN fetch, instant + offline).
- Real third-party logos only in truthful contexts (social-platform marks).
  **No logo wall, no "as seen in", no partner strip.**
- **No fake content:** no invented testimonials, partnerships, awards, or stock
  filler. **No avatars** at launch; if ever added they must be real
  photographs, never initials or generated faces. If we don't have it, it isn't
  on the page.

---

## 4. Art direction

Full detail in **`ART_DIRECTION.md`**. One-paragraph version:

> A quiet, premium, spec-sheet aesthetic with **two deliberate modes**: dark is
> *"the garage at night"* (warm near-black, one hard light, brushed metal);
> light is *"the catalogue in daylight"* (warm paper, ink, printed plates) —
> not an inversion of each other. A single aged-brass accent, used sparingly.
> Georgian is the default language, so the display voice is designed in Georgian
> first (Noto Sans Georgian set as **Mtavruli**), matched by **Oswald** for
> Latin/Cyrillic; monospace for numbers. The hero is built around **one real
> fleet car** (lead: G-Class). Motion is deliberate: Lenis-smoothed scroll,
> word-by-word masked headline, and one signature moment — a GSAP Flip morph
> from the fleet-strip card into the full car detail.

Token values live in `src/index.css` (`:root` and `.dark`) and are mirrored in
`ART_DIRECTION.md`. **`src/index.css` is the source of truth** — if the two
disagree, fix the doc.

---

## 5. Stage checklist

Keep this updated between sessions. `[x]` = done, `[~]` = in progress.

### Stage 0 — Setup & planning  `[x]`
- [x] Scaffold Vite + React + TypeScript
- [x] Install deps: Tailwind v4, GSAP (+Flip), Lenis, react-router-dom, Iconify
- [x] Tailwind wired via `@tailwindcss/vite`; `@` path alias set
- [x] Light/dark token system in `src/index.css`; pre-paint theme seed in
      `index.html` (stored choice → else system preference)
- [x] Google Fonts wired — **NOTE:** `index.html` still lists Bricolage
      Grotesque (no Georgian glyphs); Stage 1 swaps it for **Oswald**. Keep
      Inter, JetBrains Mono, Noto Sans Georgian (400–800).
- [x] `CLAUDE.md` + `ART_DIRECTION.md` written; revised after client feedback
      (font / invented facts / hero / light mode / category count / icons /
      scroller)
- [x] Dev server confirmed running; `tsc -b` and `vite build` pass
- [x] **STOP — showed `ART_DIRECTION.md`, reviewed & revised**

### Stage 1 — Foundation  `[~]`  (shell built; awaiting review)
- [x] App shell + routes: `/` → `/:lang`, `/:lang/category/:slug`
      (`src/router.tsx`, `RootLayout` validates the locale param)
- [x] **Font lock:** Oswald (Latin/Cyrillic display) + Inter (body) +
      JetBrains Mono + Noto Sans Georgian, all via Google Fonts. Oswald's
      `cyrillic` subset verified from the served CSS; Noto Sans Georgian's
      `georgian` subset (Mkhedruli **and** Mtavruli) verified. Georgian glyphs
      confirmed rendering in a real browser screenshot with real KA strings.
      **Finding:** `text-transform: uppercase` does NOT produce Mtavruli — see
      `ART_DIRECTION.md` §3 note. Ships Georgian display in **Mkhedruli**;
      the Mtavruli code-point helper is deferred to the Home page (with the hero).
- [x] Solar icons bundled at build time (`@iconify-json/solar` +
      `unplugin-icons`, `@svgr/*`). `@iconify/react` removed. `~icons/solar/*`.
- [x] Theme controller (`src/lib/theme.tsx`) — context + toggle, syncs
      `<html>.dark` + `color-scheme` + `localStorage['bbr-theme']`, follows
      `matchMedia` while no explicit choice, cross-tab `storage` sync. Pre-paint
      seed in `index.html`.
- [x] Lenis + GSAP ScrollTrigger (`src/lib/lenis.tsx`) — ticker-driven,
      `ScrollTrigger.update` on scroll, `refresh()` after `document.fonts.ready`,
      full teardown on unmount. **Disabled entirely under
      `prefers-reduced-motion`** (native scroll, `useLenis()` → null).
- [x] i18n — hand-rolled typed dictionaries (`src/i18n/{en,ka,ru}.ts`, en is the
      shape), `ka` default, locale from the URL segment, `<html lang>` synced,
      `localePath()` + `LanguageSwitcher` swap the segment in place.
      **KA/RU strings still need native-speaker review (§10).**
- [x] Layout — `<Header>` (logo slot, desktop nav, `LanguageSwitcher`,
      `ThemeToggle`, mobile menu button), `<MobileNav>` (portalled past the
      header's `backdrop-filter`; focus trap, Esc, scroll-lock, route-close),
      `<Footer>` (logo, nav, language, `SocialLinks`), skip-link.
- [ ] `<Media>` + `<Placeholder>` — with the Home page (needs content)
- [ ] Split-text helper — with the Home page (needs the hero headline)
- [ ] `<RentButton>` — with the Home page (needs the phone/WhatsApp numbers, §10)

### Stage 2 — Data & i18n  `[x]`  (client re-scoped: data + translations only)
- [x] `src/data/cars.ts` — typed single source of truth (`Car`, `CarSpecs`,
      `Drivetrain`, `TransmissionType`). Fields: id, slug, category, brand,
      model, trim, year, image, gallery, `pricePerDay` (`null` until §10),
      specs (hp, top speed, displacement, drivetrain, transmission, gears,
      seats), `specsNote`. Image paths empty for now. Helpers: `getCarBySlug`,
      `getCarsByCategory`, `isCarSlug`, `CAR_SLUGS`, `PRICE_CURRENCY` (GEL, §10).
- [x] Seeded 3 cars, **real factory figures for a named trim each**:
      Maserati Ghibli Modena (3.0 V6, MY23) · Mercedes-AMG G 63 (W463A, MY23) ·
      Chevrolet Corvette Stingray C8 Z51 (MY24). Power stored as metric PS;
      SAE hp recorded in `specsNote`.
- [x] `src/data/categories.ts` — added `image` field (empty). slug + tKey +
      image, with `isCategorySlug` / `getCategory`.
- [x] i18n expanded — `actions`, `specs`, `drivetrain`, `transmission`,
      `units`, `pricing`, `placeholder`, `notFound`, `meta.brand`; `en` is the
      shape, `ka`/`ru` match. `src/lib/format.ts` composes localised spec /
      price strings (`specRows`, `formatPricePerDay`, …).
- [x] URL-path i18n (`/:lang`, `ka` default), route-preserving
      `LanguageSwitcher`, `<html lang>` + `document.title` synced — verified in
      a browser: `/en/category/coupe` → KA → `/ka/category/coupe`, etc.
- [x] **No hardcoded UI text** — swept components/routes; the only literals left
      are the logotype letters in `<Logo>` (the mark, not copy) and data proper
      nouns (brand/model/trim).
- [ ] KA/RU strings still need native-speaker review (§10) — spec terms flagged.

### Stage 3 — Home page  `[~]`  (hero + fleet built; awaiting phone review)
- [x] `<Media>` + `<Placeholder>` — aspect-locked or fill; missing path OR a
      failed load → the designed `.bbr-placeholder` surface (per-mode: paper
      plate / brushed metal, grain, keyline). No car, no icon, no text.
- [x] `<WordReveal>` — word-by-word GSAP reveal; unsplit `.sr-only` accessible
      name, `aria-hidden` word spans, no CSS hiding (visible without JS),
      no-ops under reduced motion.
- [x] `src/lib/gsap.ts` — single plugin registration + `prefersReducedMotion()`;
      Lenis + RootLayout now import from it.
- [x] Hero (`src/components/home/Hero.tsx`) — one-viewport (`h-[100svh]`),
      phone-first: eyebrow + brand headline (`<WordReveal>`) + tagline + brass
      CTA, then the focal `<Media fill>` (G-Class, empty → placeholder), scroll
      cue. GSAP intro timeline; nav/headline/CTA readable & the CTA tappable
      throughout (CTA reveal is transform-only). Desktop = 2-col.
      CTA scrolls to `#fleet` (Lenis, or native `scrollIntoView`).
- [x] Category section (`CategoryGrid` + `CategoryCard`) — eyebrow + heading
      (`<WordReveal>`), 3 stacked cards (md: 3-up grid), each `<Media>` + label
      + arrow, whole card links to `/:lang/category/:slug`. **No count.**
      Scroll-in stagger via ScrollTrigger with `immediateRender:false` (cards
      never stay hidden if the trigger doesn't fire).
- [x] Reduced motion: every timeline early-returns; final = natural state,
      shown immediately (verified in a browser).
- [x] i18n `home.*` added (`hero.eyebrow/cta/scrollCue/imageAlt`,
      `fleet.heading`) across en/ka/ru.
- [ ] **No-JS first frame:** this is a CSR SPA — with scripting fully disabled
      the page is blank (only the `<noscript>` note shows). No content is hidden
      behind JS *animation* (that part is done), but a true no-JS/SEO-complete
      first frame needs build-time prerendering or SSR — a stack decision to
      raise with the client. Not in this stage.
- [ ] "How renting works" strip — deferred (needs finalised copy)
- [ ] Contact band — deferred (needs phone / WhatsApp numbers, §10)

### Stage 4 — Category page  `[x]`  (detail view still Stage 5)
- [x] `/:lang/category/:slug` (`Category` → `CategoryView`, guard before hooks)
      renders `getCarsByCategory(slug)`; bad slug → `<NotFound/>`.
- [x] Sub-header — back link (→ home), `nav.fleet` eyebrow, category name
      (`display-l`). No count.
- [x] **`FleetStrip`** (`src/components/category/`) — one component, two shapes:
      **1 car** = centered large card, no scroll / fades / affordances;
      **2+** = `overflow-x-auto` + `snap-x snap-mandatory` + `snap-center
      snap-always`, native momentum, next card peeks (~82vw), dynamic edge
      fades, live `NN / 0N` readout (tracks the centred card on scroll),
      `data-lenis-prevent` so Lenis lets the horizontal scroll through,
      `role=region` + `tabIndex=0`. Verified in a browser at 1 / 2 / 3 cars.
- [x] `CarSlide` — side-profile `<Media ratio="16/7">` (empty → placeholder),
      name (`display`) + price via `formatPricePerDay` ("Price on request",
      localised, since `pricePerDay` is null). Whole card is a `<button>` wired
      to a **placeholder `handleSelect`** (Stage 5 opens the Flip detail).
- [x] Authored home→category transition: `viewTransition` on the home category
      links (native crossfade, Chrome/Safari; no-op elsewhere, reduced-motion
      guarded in CSS) + a GSAP mount-in stagger on the category header + slides.
- [~] Minor: desktop 2-car row is left-aligned when it doesn't overflow —
      centre-when-no-overflow is a Stage 7 polish item.

### Stage 5 — Car detail (the signature moment)  `[x]`
- [x] `FleetSection` orchestrates strip ⇄ detail. Open/close is the search param
      `?car=<slug>` (push on open, `navigate(-1)` on close, `replace` when the
      detail was the first entry) → **browser back + deep links + forward all
      work**; invalid `?car=` is silently cleaned.
- [x] **GSAP Flip** morph: the side-profile media wrapper carries a shared
      `data-flip-id` (`src/components/category/flip.ts`) that is dropped from the
      strip card while the detail is open, so exactly one element holds it and
      `Flip.from` travels it between row slot and detail hero. `absolute:true`,
      `zIndex:9999`, `power3.inOut`, ~0.6 s.
- [x] Siblings recede (`opacity:0, scale:.92`); a `FleetSection`-owned scrim
      (`z-290`, `bg-bg`) fades over them and persists through the close so the
      reverse Flip lands on a covered strip; detail content staggers in after.
- [x] `CarDetail` — hero (Flip target) + name/meta (year · trim) + `SpecBlock`
      + gallery. 1-col mobile, 2-col (hero+name / specs) on `lg`, gallery full
      width. `max-w-72rem`.
- [x] `SpecBlock` — designed block, not a table: 2-col instrument-cluster grid
      with hairline dividers, big mono `tabular-nums` for the numeric readouts,
      the two descriptive values smaller, and a full-width accent-tinted
      **price per day** row. All 7 specs, localised via `format.ts`.
- [x] Gallery: real photos → horizontal snap strip; **empty → one designed
      placeholder (16/9) + "Photos coming soon"**, layout intact.
- [x] Close → reverse Flip, car returns to its exact row slot; scrim fades;
      siblings restored with `clearProps`.
- [x] Handled: `Escape` (via `useFocusTrap`), focus → close button on open and
      → the originating `CarSlide` on close, scroll lock (`useScrollLock`:
      `body` overflow + `lenis.stop()`) held through the close animation,
      `data-lenis-prevent` on the scrollable overlay.
- [x] `prefers-reduced-motion` → no Flip, no sibling tween: instant state
      change, content present immediately (verified at 140 ms).
- [x] `src/lib/dialog.ts` (`useScrollLock`, `useFocusTrap`); Flip registered in
      `src/lib/gsap.ts`. Verified in a browser across all 7 requirement points.

### Stage 6 — Conversion layer  `[x]`
- [x] `src/data/contact.ts` — **the one file the client edits** (§10): `PHONE`,
      `WHATSAPP`, `SOCIALS`. Empty = disabled "coming soon" state, never a
      broken link. `src/lib/links.ts` builds `tel:` (keeps `+`, strips
      separators) and `wa.me` (digits only) URLs; the WhatsApp `?text=` is
      `encodeURIComponent`-d.
- [x] `ContactActions` (`bar` | `block`) — Call + WhatsApp. WhatsApp message is
      pre-filled with the car name in the active locale (`actions.whatsappMessage`
      `{car}` slot) or a generic line; `target=_blank rel="noreferrer noopener"`,
      localised `aria-label`. Verified encode/decode in en/ka/ru.
- [x] `RentBar` — `position: fixed` bottom bar inside the detail dialog,
      `env(safe-area-inset-bottom)` padding, slides up on open; detail content
      reserves `pb-[7.5rem]`.
- [x] `SocialLinks` — Instagram / Facebook / TikTok via `~icons/simple-icons/*`,
      new tab + correct `rel`, `aria-label` per platform; dashed "pending" chip
      when a URL is blank.
- [x] Home closing sections (`ClosingSections.tsx`): **About**, **Rental
      conditions** (+ a note that deposit / age / mileage are confirmed on
      contact — no invented figures), **Final CTA** band with `ContactActions`.
      Real copy, no lorem / awards / reviews.
- [x] All new strings in en/ka/ru (`actions.*`, `about.*`, `conditions.*`,
      `finalCta.*`); `Dict` parity enforced by `tsc`.
- [x] Dep added: `@iconify-json/simple-icons` (dev). `socials.ts` → `contact.ts`.
- [ ] KA/RU copy for the new sections still needs native-speaker review (§10).

### Stage 7 — Quality pass  `[x]`
- [x] `npm run build` + `tsc -b` + `oxlint --deny-warnings` all clean
      (0 errors, 0 warnings). Removed the 5 standing lint warnings: split each
      provider into a `.ts` context/hook file + a `*-provider.tsx` component
      (`theme`, `i18n`, `lenis`); Lenis exposes a **stable ref** (no
      `setState`); the FleetSection URL↔state bridge has a scoped
      `oxlint-disable` with rationale.
- [x] Checked phone (360/390) → tablet (768) → desktop (1440): no horizontal
      overflow in any language or theme.
- [x] Keyboard: logical tab order, visible focus ring on every control
      (`:focus-visible` → 2px `--focus` outline). Detail dialog — focus enters
      on open, is trapped (20-tab test never leaks), returns to the originating
      `CarSlide` on Escape/close.
- [x] Touch targets: icon buttons 40 → **44 px**; footer language switcher and
      nav links, hero scroll cue, category back-link, logo link all given
      ≥40–44 px hit area (negative-margin padding, no layout shift).
- [x] No-JS: CSR SPA, so the app itself needs JS — but `index.html`'s
      `<noscript>` now carries the brand, the tagline (KA/EN/RU), the full fleet
      list, and a "enable JavaScript" line in all three languages. **True no-JS /
      SEO completeness still needs prerender/SSR** — a stack decision (§ report).
- [x] `prefers-reduced-motion`: Lenis not initialised (no `.lenis` class), CSS
      `scroll-behavior: auto`, `scrollTo({behavior:'smooth'})` lands instantly,
      hero/word-reveal/category/detail all render final state at ~120 ms, detail
      opens with **no Flip** (instant).
- [x] One smooth-scroll engine: only `lenis` in deps, one `new Lenis()`, no
      locomotive/smooth-scrollbar/scrollmagic. `ScrollTrigger.refresh()` after
      `document.fonts.ready` and on every route change; media load can't shift
      layout (aspect-ratio boxes) so no media-load refresh needed. Every GSAP
      context / ScrollTrigger / IntersectionObserver / event listener is torn
      down on unmount (`ctx.revert()`, `killTweensOf`, `io.disconnect()`,
      `removeEventListener`).
- [x] 3 languages × 2 themes verified on the detail view — Georgian (Mkhedruli)
      and Cyrillic render, long RU labels wrap without clipping or overflow.
- [x] Source scan: no lorem, no `TODO`/`FIXME` (client-input notes reworded to
      "Client input" / "REVIEW"), no unsupported claims, **no car drawn in
      SVG/CSS/canvas** (only the interface icons + the placeholder's grain
      texture). Removed dead `placeholder.*` i18n keys.
- [x] Perf: `<Media>` sets `loading` (lazy below fold, eager hero),
      `decoding="async"`, `fetchPriority`; aspect-ratio boxes prevent CLS; the
      only infinite animation (hero scroll-cue bounce) is now paused by an
      `IntersectionObserver` when the hero leaves the viewport.
- [x] `README.md` — where to add car photos (`public/cars/` + `cars.ts`) and how
      to add a fourth car.
- [~] Not done: route-level `<title>`/OG per locale, real favicon, code-split
      (~166 KB gzip JS is one chunk), native-speaker review of KA/RU — all
      carried to Stage 8.

### Stage 8 — i18n review, meta, identity
- [ ] All three languages reviewed by a native speaker (§10)
- [ ] `<title>` / meta / OpenGraph per route and locale
- [ ] Replace Vite `favicon.svg` with a real mark; app icons
- [ ] Consider code-splitting the route chunks / GSAP

### Stage 9 — Real assets & Three.js call
- [ ] Drop real photos into `public/cars/`, fill `cars.ts` / `categories.ts`
      (still empty — see README)
- [x] **Three.js evaluated → rejected.** A hero depth/displacement shader is
      ornamental by this project's own motion rule, inverts the mobile-first
      priority, fights the "quiet, honest" thesis, and taxes the LCP element
      ~150 KB. Not added. Full rationale in `ART_DIRECTION.md` §8.

---

## 6. Conventions

- Path alias `@/` → `src/`.
- Colours: use the semantic Tailwind tokens only — `bg-bg`, `bg-surface`,
  `text-fg`, `text-muted`, `border-line`, `text-accent`, `bg-accent`,
  `text-accent-fg`. No raw hex in components.
- Fonts: `font-display` (headings / car names — script-aware: Oswald for
  Latin/Cyrillic, Noto Sans Georgian Mtavruli for Georgian, see
  `ART_DIRECTION.md` §3), `font-sans` (body/UI), `font-mono` (numerals, units,
  Latin/Cyrillic technical labels). **Never set Georgian text in `font-mono`** —
  no glyphs; use `font-sans`/`font-display` at label size instead.
- Every user-facing string goes through i18n — no hard-coded English.
- Every image goes through `<Media>` — no bare `<img>` for content photos.
- **No invented company facts.** Marked gap + ask; outstanding list in
  `ART_DIRECTION.md` §10.
- Commands: `npm run dev`, `npm run build`, `npm run lint` (oxlint).
