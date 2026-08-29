# Big Boss Rent

Car-rental site — React + Vite + TypeScript, Tailwind CSS v4, GSAP (+ Flip),
Lenis. Georgian / English / Russian, light + dark. See `CLAUDE.md` for the full
brief and `ART_DIRECTION.md` for the visual system.

```bash
npm install
npm run dev      # http://localhost:5173  (opens /ka)
npm run build    # type-check + production build → dist/
npm run lint     # oxlint
```

---

## Adding the car photos

Every image is optional. A missing one renders a **designed placeholder**
(a matte surface, no broken-image icon), and the layout reserves the correct
aspect ratio, so nothing shifts when a photo loads later.

### 1. Drop the files in `public/cars/`

Anything in `public/` is served from the site root, so
`public/cars/ghibli-side.jpg` is reachable at `/cars/ghibli-side.jpg`.
Recommended: ~2000 px on the long edge, JPG or WebP, compressed.

### 2. Point `src/data/cars.ts` at them

Each car has an `image` (the side-profile shot that animates into the detail
view) and a `gallery` (the rest). Fill in the paths:

```ts
{
  id: 'ghibli',
  // ...
  image: '/cars/ghibli-side.jpg',
  gallery: [
    '/cars/ghibli-1.jpg',
    '/cars/ghibli-2.jpg',
    '/cars/ghibli-3.jpg',
  ],
  // ...
}
```

That's the whole change. The fleet strip, the detail hero, the Flip animation
and the gallery all read from these fields.

### 3. Category cards + hero

- **Category card images** — `src/data/categories.ts`, the `image` field on each
  of `sedan` / `suv` / `coupe` (e.g. `image: '/cars/g-class-hero.jpg'`).
- **Home hero image** — it reuses the **G-Class** car's `image`
  (`getCarBySlug('mercedes-benz-g-class')?.image` in `src/components/home/Hero.tsx`).
  Fill that car's `image` and the hero is filled too. To use a different shot,
  add a `heroImage` field to the car and read it there.

---

## Adding a fourth car

Everything is data-driven — no component changes.

1. **`src/data/cars.ts`**
   - Add the slug to `CAR_SLUGS` (keeps the URL type honest).
   - Add an object to `CARS` with: `id`, `slug`, `category`
     (`'sedan' | 'suv' | 'coupe'`), `brand`, `model`, `trim`, `year`,
     `image` / `gallery` (`''` / `[]` for now), `pricePerDay`
     (`number` in `PRICE_CURRENCY`, or `null` for "Price on request"),
     `specs` (horsepower in **metric PS**, `topSpeedKph`, `displacementCc`,
     `drivetrain`, `transmission`, `gears`, `seats`), and `specsNote`
     (record the exact trim and where the figures came from — keep them honest).

2. **If it's a new category** (not sedan/suv/coupe): add it to
   `src/data/categories.ts` (`slug`, `tKey`, `image`) and add the matching
   name to `categories` in all three `src/i18n/*.ts` files.

That's it. The category page picks the car up via `getCarsByCategory`, and the
**fleet strip adapts automatically**:

| Cars in a category | Layout |
| --- | --- |
| 1 | one large centered card, no scroll |
| 2 | a snap-scrolling pair, the next card peeking |
| 3+ | a peeking scroll-snap row with edge fades and a `NN / 0N` readout |

---

## Contact details (phone, WhatsApp, socials)

One file: **`src/data/contact.ts`**. Fill in `PHONE`, `WHATSAPP` and the
`SOCIALS` URLs. Empty values render as a disabled "coming soon" state — never a
broken link. The Call / WhatsApp buttons and the pre-filled, translated
WhatsApp message are built from these values.

## Translations

`src/i18n/{ka,en,ru}.ts`. `en.ts` is the canonical shape; `ka.ts` and `ru.ts`
are type-checked to match it key-for-key. The Georgian and Russian copy is a
working draft and needs a native-speaker pass (marked at the top of each file).
