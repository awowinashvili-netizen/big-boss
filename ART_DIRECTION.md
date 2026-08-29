# Big Boss Rent — Art Direction

Mobile-first. Every decision below is made for a phone screen and then adapted
up to desktop, never the other way around.

> **Nothing on this site is invented.** No address, hours, founding year, fleet
> size, awards, partners, or testimonials appear unless the client provided
> them. Where a section needs a fact we do not have, it shows a **clearly
> marked gap** (§10) and we ask — we never ship a plausible guess.

---

## 1. Visual thesis

Two modes, two deliberate intentions:

- **Dark — "the garage at night."** Warm near-black. A car in shadow under one
  hard light; the interface is brushed metal and hairlines. The primary mood.
- **Light — "the catalogue in daylight."** Warm paper, not white. The same cars
  *printed*: ink on stock, photographs placed like plates in a magazine, soft
  daylight shadows. A page you turn — not a lamp switched off. Full treatment
  in §4.

The interface is calm, confident and technical in both modes: generous space,
precise type, numbers treated like instrument readouts. Restraint is the brand.
"Big Boss" is scale and stillness, not loud colour or chrome.

Three principles:

1. **The car is the only colour.** Every surface, control and label is
   monochrome warm-neutral. Colour enters the page only through photography.
2. **Spec-sheet honesty.** Monospace numerals, tabular alignment, plain labels.
   Nothing is dramatised that isn't true — no fake stats, no invented awards.
3. **Deliberate motion.** Things move with weight and intent, once. If motion
   isn't carrying meaning (revealing, connecting, focusing), it isn't there.

Reference feel: Maserati / Zenvo configurators, *Type07*, Hodinkee spec tables,
Teenage Engineering product pages; for light mode, a well-printed car catalogue
on matte stock. Editorial, quiet, expensive.

---

## 2. Hero focal asset plan

The hero is built around **one real car from the fleet**, shot in the same
session as that car's catalogue and gallery photos. No separate "mood shoot",
nothing we cannot actually produce.

- **Subject — lead choice: the Mercedes-Benz G-Class.** Upright, instantly
  legible silhouette that holds any crop and carries the "big boss" register.
- **Alternate: the Chevrolet Corvette** — lower, more dramatic, more overtly
  performance. Final pick is the client's (§10); both are real shoots.
- **Media key:** `hero` in `src/data/media.ts`. Default resolution is an
  **alias to an existing frame** of that car (e.g. `suv.gclass.gallery.0`), so
  the hero needs zero extra photography. It can later point at a dedicated
  `suv.gclass.hero` frame if one gets shot.
- The hero car is a real catalogue car, so the hero CTA can deep-link straight
  into that car's detail page — the hero doubles as the flagship car's headline
  act.
- **Crops:** mobile portrait **4 / 5**, near full-bleed, anchored low, wordmark
  over/above it. Desktop re-crops the *same frame* to **16 / 9** (**21 / 9** on
  wide screens) as a side / full-bleed band, wordmark in the left third.
- **Motion:** no parallax on mobile; one slow scale 1.0 → 1.06 across the first
  viewport of scroll. Desktop may add a small scroll-linked vertical drift.
- **Before the photo exists:** the slot renders `<Placeholder>` (§4) at the
  exact crop ratio — themed per mode, deliberate, no icon, no label.

Rejected: a mood photo of a non-fleet car (cannot be produced), a CSS/SVG-drawn
car (asset rule), a gradient-only hero (reads unfinished), stock photography
(no filler).

---

## 3. Type hierarchy

**Georgian is the default language, so the display voice is designed in Georgian
first**, then matched in Latin and Cyrillic — not the other way round.

### Three roles, script-aware

| Role      | Latin / Cyrillic | Georgian (default audience) |
| --------- | ---------------- | -------------------------- |
| Display   | **Oswald** 500–700 — condensed industrial grotesque, set uppercase | **Noto Sans Georgian** 700–800, set as **Mtavruli** (angular capital-height display forms — the native Georgian headline convention) |
| Text / UI | **Inter** 400–600 | **Noto Sans Georgian** 400–600 (Mkhedruli) |
| Mono      | **JetBrains Mono** 400–500 — numerals, units, Latin/Cyrillic technical tokens | *not used* — Georgian has no monospace tradition and JetBrains Mono has no Georgian glyphs; Georgian labels use the Georgian face |

**Why this is a deliberate treatment, not a fallback:**

- Mtavruli **is** how Georgian sets headlines and emphasis. Choosing it is the
  correct typographic decision and gives Georgian its own authored display
  identity instead of a Latin face's leftovers.
- Oswald uppercase and Georgian Mtavruli read as the *same gesture*: tall,
  narrow, capital-height, maximum contrast against the body. Toggling
  KA ↔ EN ↔ RU should feel like one system tuned per script, never like the
  font broke.
- Georgian Mtavruli is for **display and eyebrows only** — never body copy.
  Long all-caps Georgian hurts legibility.

> **Implementation note (found in Stage 1):** `text-transform: uppercase` does
> **not** map Mkhedruli → Mtavruli in current browsers — Chromium leaves the
> text as Mkhedruli. Mtavruli must be produced by mapping code points
> (Mkhedruli U+10D0–U+10FF → Mtavruli U+1C90–U+1CBF, offset +0x0BC0) in a small
> render helper applied to display/eyebrow strings only. **Stage 1 ships
> Georgian display in Mkhedruli** (its own weight + leading, no fake tracking);
> the Mtavruli helper lands in Stage 2 with the hero. Verified: Noto Sans
> Georgian's `georgian` subset covers both Mkhedruli and the Mtavruli block, so
> only the mapping is outstanding.

### Display metrics differ by script — on purpose

| Step         | Size (mobile → desktop) | Latin / Cyrillic — tracking · leading | Georgian (Mtavruli) — tracking · leading |
| ------------ | ----------------------- | ------------------------------------- | --------------------------------------- |
| `display-xl` | 40–52 → 96–140 px       | −0.005em · 0.98                       | **+0.05em · 1.12**                      |
| `display-l`  | 30–32 → 60–64 px        | 0 · 1.0                               | **+0.06em · 1.14**                      |
| `label` (eyebrow) | 12–13 px           | +0.18–0.22em · 1                      | **+0.10–0.14em · 1.2** — uppercase Noto Georgian, *not* mono |

Georgian Mtavruli always carries **more tracking and more leading** than the
Latin line at the same size. Mtavruli is open and tall; crushing it to Latin's
metrics is exactly the "looks broken" failure this section exists to prevent.

### Text scale (shared)

| Token   | Mobile | Desktop | Notes |
| ------- | ------ | ------- | ----- |
| `title` | 22 px  | 28 px   | Card labels, sub-sections |
| `body`  | 16 px  | 17 px   | line-height 1.5 (Latin/Cyrillic) · 1.6 (Georgian) |
| `data`  | 18–22 px | 20–28 px | Mono spec values; `font-variant-numeric: tabular-nums` |

Never more than these steps on one screen.

### Loading

Google Fonts in `index.html`, `display=swap`, with `preconnect`: **Oswald**,
**Inter**, **JetBrains Mono**, **Noto Sans Georgian** (400–800). `index.html`
currently still lists Bricolage Grotesque — swap it for Oswald in Stage 1.
Webfonts are permitted; the asset rule governs *car imagery*, not type.

### Stage-1 verification — mandatory, real strings, no lorem

- **KA:** a real headline plus „იქირავე", „დღეში", „სედანი", „კუპე", and the
  SUV label (Georgian term to be confirmed with a native speaker, §10). Confirm
  the Mtavruli transform and the tracking/leading above on real text.
- **RU:** „Арендовать", „Седан", „Купе", „Внедорожник". **Confirm Oswald
  actually ships Cyrillic.** If any glyph is missing, swap the Latin/Cyrillic
  display face to **Rubik** 700–800 (keeps the uppercase-led system intact).
- Tune the tracking/leading numbers against what the real text does, then commit
  the final values to `src/index.css`.

---

## 4. Colour system & the two modes

Two modes, two **intentions** — not one design and its inversion.

Token values live once in `src/index.css` (`:root` = light, `.dark` = dark) and
are exposed as Tailwind tokens (`bg`, `surface`, `surface-raised`, `line`, `fg`,
`muted`, `accent`, `accent-fg`). **`src/index.css` is the source of truth**;
the tables below mirror it.

### Light — "the catalogue in daylight"

Warm paper stock, ink, soft window light. Photographs are placed like printed
plates. Separation comes from hairlines and **soft warm diffuse shadow**, never
a hard drop or a brighter fill.

| Token            | Hex       | Role |
| ---------------- | --------- | ---- |
| `bg`             | `#F4F2ED` | Page — warm paper, not white |
| `surface`        | `#FFFFFF` | Cards, header |
| `surface-raised` | `#FFFFFF` | Elevated / hover |
| `line`           | `#E2DFD6` | Borders, hairlines, dividers |
| `fg`             | `#16130E` | Primary text — ink |
| `muted`          | `#5C574C` | Secondary text, spec keys |
| `accent`         | `#8A6A2B` | Brass, darkened for paper contrast — links, focus ring, the one CTA |
| `accent-fg`      | `#F4F2ED` | Text/icon on an accent fill |

### Dark — "the garage at night" (primary mood)

Warm near-black, one hard light, brushed metal. Separation comes from a `line`
border plus a deep near-black shadow.

| Token            | Hex       | Role |
| ---------------- | --------- | ---- |
| `bg`             | `#0A0A0B` | Page background |
| `surface`        | `#141416` | Cards, header |
| `surface-raised` | `#1D1D20` | Elevated / hover |
| `line`           | `#2A2A2E` | Borders, hairlines, dividers |
| `fg`             | `#F4F2ED` | Primary text — warm white |
| `muted`          | `#A09C94` | Secondary text, spec keys |
| `accent`         | `#C8A45C` | Aged brass — links, focus ring, the one CTA |
| `accent-fg`      | `#0A0A0B` | Text/icon on an accent fill |

### How the two modes diverge — beyond colour

|                     | Dark — garage | Light — catalogue |
| ------------------- | ------------- | ----------------- |
| **Hero**            | Image bleeds to the edges and sits *in* the black; wordmark overlaps it in warm white; a vignette lets the frame melt into `bg`. | Image sits inside a generous paper margin like a printed plate, held by a hairline `line` frame; wordmark in near-black ink **above** it, not overlapping. Same 1.06 scale, but it reads as a page settling. |
| **Category cards**  | `surface` panel barely lifted from `bg` by a `line` border + deep near-black shadow; photo full-bleed in the card; hover deepens the shadow and the border catches a hint of brass. | Paper cards on a paper ground, separated by a hairline and a soft warm diffuse shadow (a photo lying on a desk) — never a hard drop; photo full-bleed; hover lifts the card a few px and the shadow spreads. |
| **`<Placeholder>`** | Low-contrast diagonal gradient `surface` → `surface-raised`, 1px inset `line` keyline, ~4% `feTurbulence` grain. Brushed metal in shadow. | Warm paper: a faint **debossed / letterpress** keyline (inset highlight + shadow), barely-there paper grain, a soft top-left → bottom-right light wash as if lit from a window. Reads as "photo not yet placed on the board." |

Both placeholders: correct aspect ratio, **no broken-image icon, no "image
here" text, nothing that looks unfinished.**

### Shared discipline

- **Accent is rare in both modes** — focus rings, the primary "Rent" button,
  active language, inline links. Never a section background, never decoration.
- Contrast targets WCAG AA in both modes (`fg` on `bg` ≥ 12:1; `muted` on `bg`
  ≥ 4.5:1).
- Theme change cross-fades `body` `background-color` / `color` over 400 ms;
  disabled under `prefers-reduced-motion`.
- `color-scheme` and dual `theme-color` meta are set in `index.html`.

---

## 5. Section sequence

### Home (top → bottom, as scrolled on a phone)

1. **Header** — sticky, minimal, translucent over `bg`. Wordmark (mono,
   tracked), language switch `KA / EN / RU`, theme toggle, social icons.
   Collapses to wordmark + one menu affordance if it gets crowded.
2. **Hero** — first viewport. Oversized wordmark + one-line tagline (§10), the
   `hero` media slot (§2), a small mono scroll cue. Word-by-word masked
   entrance.
3. **Categories** — eyebrow label, then category cards **stacked** on mobile
   (Sedan · SUV · Coupe), each a **photo + label only**. **No car count** — at
   launch every category holds exactly one car and "Sedan · 1" reads as an
   empty business. A count returns only when a category holds **three or more**
   cars. Cards rise and settle on scroll-in; the whole card is the tap target
   → category page. 3-up grid on desktop.
4. **How renting works** — three steps: **Choose a car · Call or WhatsApp ·
   Drive.** Mono numerals + bundled Solar icon + one short real line each. No
   pricing games, no fake urgency.
5. **Contact band** — the phone and WhatsApp buttons (same `<RentButton>`
   mechanism, non-car-specific) and the social links. **No address, no working
   hours, no "since 20xx"** — none of that has been provided. Until it is, the
   band shows only the contact actions + socials; any location/hours block
   stays a marked gap (§10).
6. **Footer** — wordmark, language switch, socials, current year. Deliberately
   sparse.

### Category page

1. **Sub-header** — back control + category name (`display-l`). No count.
2. **Fleet strip** — see *Composing the fleet strip* below.
3. **Car detail** — in place (§6): gallery + spec table + `<RentButton>`.

### Composing the fleet strip as it grows

The strip is **one component**; its layout branches on how many cars the
category holds, so growth never redesigns the page.

- **1 car — the launch state.** No horizontal scroll, no arrows, no dots. The
  car is a **single centered showcase** at ~88% viewport width with equal side
  gutters, a static mono index `01 / 01`, name and price/day stacked beneath.
  It reads as *the one car, chosen deliberately* — a spotlight, not a stalled
  carousel.
- **2 cars.** Two side-by-side cards at ~82% vw with scroll-snap; each frames
  the other partly in view; mono index `01 / 02`.
- **3 or more cars.** The peeking row: each card ~80% vw so the next car's nose
  enters the frame, scroll-snap per card, mono index `01 / 0N`, and a soft edge
  fade on the scrolling side to signal "more".

Same card design at every count — adding cars only unlocks the scroll.

### Rhythm

Every section is full-bleed width with a consistent inner gutter (`16px`
mobile, up to `clamp` on desktop) and generous vertical rhythm (`~14vh` between
major sections on mobile).

---

## 6. Motion narrative

**GSAP is the animation system. Lenis smooths the scroll. One signature moment.**

| Beat | What moves | How |
| ---- | ---------- | --- |
| Page load | Hero headline | Words wrapped in `overflow:hidden` masks, translate 100% → 0, **restrained word-by-word stagger** (~55 ms), `power4.out`, ~0.9 s; tagline then CTA follow. Nav, headline text and CTA are usable before it finishes. |
| Scroll (global) | The page | Lenis smooth scroll; GSAP ScrollTrigger reads Lenis (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker` → `lenis.raf`). |
| Hero | Focal media | Scale 1.0 → 1.06 across the first viewport of scroll. That's all on mobile. |
| Categories | Each card | On enter: `y: 24 → 0`, `opacity: 0 → 1`, inner image `scale: 1.08 → 1`, 80 ms stagger. |
| **Category → car (signature)** | The tapped side-profile card | **GSAP Flip**: capture state, promote the card to a detail container, `Flip.from()` morphs position/size/border-radius (~0.7 s `power3.inOut`); sibling cards `x`-slide + fade out; then gallery and spec rows stagger in (`y: 16 → 0`, 40 ms). |
| Close detail | Reverse | Flip back into the slot; siblings return. |
| Rent button | Press | Magnetic pull toward cursor, **fine-pointer only** (≤6px) — disabled on touch/coarse pointers and on window blur; scale `0.97` on press; no bounce. Additive: the button is fully usable with the effect off. |
| Theme toggle | Tokens | CSS `body` colour transition (400 ms), not a GSAP tween. |

### Guardrails

- **`prefers-reduced-motion: reduce`:** Lenis runs in native-scroll mode, no
  scrubbed timelines, no Flip morph (detail cross-fades in over 120 ms), no
  parallax/scale, no stagger. Final states render immediately — motion is not
  merely shortened.
- **Split text stays accessible.** The headline keeps one unsplit accessible
  name; decorative per-word spans are `aria-hidden`; links and meaningful
  inline markup are never split; the unsplit text is present and visible with
  JavaScript disabled.
- 60 fps or it gets cut. Animate `transform` / `opacity` only.
- No scroll-jacking, no full-page section snapping, no auto-playing carousels.
- Everything is readable at rest, with JS disabled, and mid-animation.

---

## 7. Smooth-scroll engine

**Lenis, and only Lenis.** The single smooth-scroll engine for the whole site.
Locomotive Scroll was the alternative considered; it is **not installed and must
not be** — no second scroll library, ever.

- GSAP ScrollTrigger integrates directly: `lenis.on('scroll', ScrollTrigger.update)`,
  `gsap.ticker.add((t) => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`.
- `ScrollTrigger.refresh()` runs after fonts and media load and on resize.
- Lenis drops to native scroll under `prefers-reduced-motion: reduce`.
- On unmount, everything tears down: `lenis.destroy()`, the ticker callback is
  removed, and every ScrollTrigger / timeline is killed.

---

## 8. Three.js decision

**Evaluated and rejected. Not installed.**

The hero was the one candidate (a depth / displacement shader on the hero photo,
reacting to pointer or scroll). It was assessed against this document's own
motion rule — motion must *reveal, connect, or focus* — and fails it: a
pointer-reactive wobble on an already-visible still reveals nothing, connects
nothing, and pulls the eye off the headline and CTA. It also works against the
thesis ("editorial, quiet, expensive"; "nothing is dramatised that isn't
true") — a displacement map fakes volume from a flat plate and tears at the
high-contrast car/background silhouette. And it inverts the mobile-first
priority: the effect only really lives with a mouse, while the phone (the
primary design) has §2's "no parallax on mobile" plus the 1.0 → 1.06 scale,
which is enough. Cost: ~150 KB gzip on top of the LCP element for a subtle
ornament. The "expensive" feel is already carried by the type system, the two
modes, the Flip moment, and — most of all — the real photographs.

The signature motion moment is deliberately **one** thing (the Flip). Nothing
3D enters the bundle. If a genuinely spatial hero concept is ever briefed (an
orbitable model, a scene where depth is the message), revisit — but a GPU pass
over a 2D photo is not that.

---

## 9. Asset provenance plan

**One data file governs all imagery.** Real photos do not exist yet.

- `src/data/media.ts` maps **semantic keys** to imported asset URLs, e.g.
  `hero`, `suv.gclass.hero`, `suv.gclass.gallery.0`, `sedan.ghibli.profile`,
  `coupe.corvette.gallery.2`. Keys are stable; paths are filled in when photos
  land.
- `<Media mediaKey="…" />` resolves the key. If the entry is absent or `null`,
  it renders `<Placeholder>` at the **declared aspect ratio** for that slot —
  the designed surface from §4, themed per mode. No broken-image icon. No text
  like "image here". Nothing that reads as unfinished.
- Every media slot declares its aspect ratio and a real **`alt`** string (via
  i18n; empty `alt=""` only for a purely decorative slot). `<Media>` sets
  `loading="lazy"` + `decoding="async"` below the fold, eager for the hero, and
  reserves space so there is no layout shift while the image or placeholder
  loads.
- **Adding real photos = editing one file.** Drop files into
  `src/assets/cars/…` and point the `media.ts` entries at them. No component
  changes, no layout changes.
- **Absolutely no drawn cars.** No SVG paths, CSS shapes, gradients-as-cars, or
  canvas illustration of vehicles, wheels, or parts — not even as a stopgap.
- **Interface icons:** the **Solar** set, **bundled at build time**
  (`@iconify-json/solar` + `unplugin-icons`) — not fetched at runtime, so they
  render instantly and work offline. UI only: chevrons, close, phone, WhatsApp,
  sun/moon, arrows, play. Never used to depict a car or as decoration.
- **Real logos:** only genuine third-party marks in truthful contexts — the
  social-platform icons (Instagram, Facebook, TikTok, WhatsApp, …) via Iconify.
  **No logo wall, no "as seen in", no partner strip** — we have no such proof
  and will not imply it.
- **No fabricated content of any kind:** no testimonials, no client/brand logo
  wall, no invented partnerships or awards, no filler copy. Sections that would
  need content we don't have are cut or held as a marked gap, never faked.
- **No avatars anywhere** at launch (no people/testimonials on the site). If
  that ever changes, avatars must be real photographs — never initials,
  illustrated heads, silhouettes, or generated people shown as real customers
  or staff.
- Photo treatment, once real images arrive: consistent crop ratios per slot
  type (hero 4:5 / 16:9, category profile ~16:7, gallery 3:2); dark-leaning
  grade for the garage mood, a cleaner higher-key grade acceptable for light
  mode; applied in-image, not via heavy CSS filters.

---

## 10. Facts still needed from the client

Nothing below is invented or assumed. Where the site needs one of these, it
shows a clearly marked gap and does not ship a guess.

- **Service area** — city / country, and where cars are picked up and returned.
  The only known locale fact is that the default language is Georgian.
- **Phone number** for calls, and the **WhatsApp number** if different.
- **Working hours** — real hours, or "by arrangement", or confirm none are
  shown at all.
- **Social accounts** — which platforms, and the handles / URLs.
- **Price per day** for each of the three cars.
- **Which variant of each car**, so specs are accurate:
  - Maserati Ghibli — which engine (e.g. base V6 / Modena / Trofeo V8)?
  - Mercedes-Benz G-Class — G 500 or G 63 AMG?
  - Chevrolet Corvette — Stingray / Z06 / which generation?
  Then per car: horsepower, top speed, engine displacement, drivetrain,
  transmission, seats. Manufacturer figures are fine **once the variant is
  confirmed**.
- **Hero car** — G-Class (recommended) or Corvette?
- **Hero tagline / one-liner** in KA, EN, RU — client-supplied, or drafted by us
  and approved.
- **Georgian and Russian UI strings** (category names, buttons) — confirmed by a
  native speaker during Stage 1 verification.
- **Brand mark / logo** and favicon — currently the Vite default.
- **Footer legal line** — legal entity name / registration, if any should
  appear.
