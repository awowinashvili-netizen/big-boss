// English strings. This file is the canonical shape; ka.ts and ru.ts must match.
// Every user-facing string in the app comes from here (or its ka/ru siblings) —
// nothing is hardcoded in components.
const en = {
  meta: {
    brand: 'Big Boss Rent',
    title: 'Big Boss Rent',
    tagline: 'Rent by phone or WhatsApp.',
  },
  nav: {
    home: 'Home',
    fleet: 'The fleet',
    menu: 'Menu',
    open: 'Open menu',
    close: 'Close menu',
    skip: 'Skip to content',
  },
  categories: {
    sedan: 'Sedan',
    suv: 'SUV',
    coupe: 'Coupe',
  },
  theme: {
    label: 'Theme',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    light: 'Light',
    dark: 'Dark',
  },
  language: {
    label: 'Language',
  },
  actions: {
    rent: 'Rent',
    call: 'Call',
    whatsapp: 'WhatsApp',
    viewDetails: 'View details',
    backToFleet: 'Back to the fleet',
    callAria: 'Call Big Boss Rent',
    whatsappAria: 'Message Big Boss Rent on WhatsApp',
    contactPending: 'Phone and WhatsApp coming soon',
    whatsappMessage: 'Hello, I am interested in renting the {car}.',
    whatsappMessageGeneric: 'Hello, I would like to rent a car.',
  },
  specs: {
    title: 'Specifications',
    horsepower: 'Power',
    topSpeed: 'Top speed',
    displacement: 'Displacement',
    drivetrain: 'Drivetrain',
    transmission: 'Transmission',
    seats: 'Seats',
    pricePerDay: 'Price per day',
    trim: 'Trim',
  },
  drivetrain: {
    rwd: 'Rear-wheel drive',
    awd: 'All-wheel drive',
    fwd: 'Front-wheel drive',
  },
  transmission: {
    automatic: 'automatic',
    manual: 'manual',
    'dual-clutch': 'dual-clutch',
    speed: '-speed',
  },
  units: {
    hp: 'PS',
    kmh: 'km/h',
    cc: 'cc',
    seats: 'seats',
  },
  pricing: {
    perDay: 'per day',
    onRequest: 'Price on request',
  },
  home: {
    hero: {
      eyebrow: 'Car rental',
      cta: 'See the fleet',
      scrollCue: 'Scroll down',
      imageAlt: 'Mercedes-Benz G-Class',
    },
    fleet: {
      heading: 'Choose your category',
    },
  },
  detail: {
    close: 'Close',
    gallery: 'Gallery',
    galleryPending: 'Photos coming soon',
    overview: 'Overview',
  },
  about: {
    eyebrow: 'About us',
    heading: 'Three cars. Three kinds of drive.',
    body: 'Big Boss Rent keeps a small fleet — a Maserati Ghibli, a Mercedes-Benz G-Class and a Chevrolet Corvette, one for each category. There is no online booking: you call or message us, we agree the details, and you pick up the car.',
  },
  conditions: {
    eyebrow: 'Rental conditions',
    heading: 'How renting works.',
    body: 'There is no self-service checkout. When you get in touch we confirm the daily rate, the deposit and how long you need the car, and we arrange where to hand it over. Bring a valid driving licence and a passport or ID.',
    note: 'The deposit, minimum age and mileage terms depend on the car — we confirm them for you when you get in touch.',
  },
  finalCta: {
    heading: 'Ready when you are.',
    body: 'Call or message us to book a car.',
  },
  footer: {
    followUs: 'Follow us',
    socialPending: 'Social links coming soon',
    rights: 'All rights reserved.',
  },
  notFound: {
    code: '404',
    title: 'Page not found',
    body: 'That page does not exist. Head back to the start.',
  },
}

export default en
