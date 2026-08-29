import type { Dict } from './index'

// ქართული — DEFAULT language.
// REVIEW: all copy here is a working draft and needs a native-speaker pass
// (ART_DIRECTION.md §10) — car-spec terms and the WhatsApp message especially.
const ka: Dict = {
  meta: {
    brand: 'Big Boss Rent',
    title: 'Big Boss Rent',
    tagline: 'დაჯავშნა ზარით ან WhatsApp-ით.',
  },
  nav: {
    home: 'მთავარი',
    fleet: 'ავტოპარკი',
    menu: 'მენიუ',
    open: 'მენიუს გახსნა',
    close: 'მენიუს დახურვა',
    skip: 'ძირითად შინაარსზე გადასვლა',
  },
  categories: {
    sedan: 'სედანი',
    suv: 'ჯიპი',
    coupe: 'კუპე',
  },
  theme: {
    label: 'თემა',
    toLight: 'ღია თემაზე გადართვა',
    toDark: 'მუქ თემაზე გადართვა',
    light: 'ღია',
    dark: 'მუქი',
  },
  language: {
    label: 'ენა',
  },
  actions: {
    rent: 'იქირავე',
    call: 'დარეკვა',
    whatsapp: 'WhatsApp',
    viewDetails: 'დეტალურად',
    backToFleet: 'ავტოპარკში დაბრუნება',
    callAria: 'დაურეკეთ Big Boss Rent-ს',
    whatsappAria: 'მოგვწერეთ Big Boss Rent-ს WhatsApp-ზე',
    contactPending: 'ტელეფონი და WhatsApp მალე დაემატება',
    whatsappMessage: 'გამარჯობა, მაინტერესებს {car}-ის დაქირავება.',
    whatsappMessageGeneric: 'გამარჯობა, მსურს ავტომობილის დაქირავება.',
  },
  specs: {
    title: 'მახასიათებლები',
    horsepower: 'სიმძლავრე',
    topSpeed: 'მაქსიმალური სიჩქარე',
    displacement: 'ძრავის მოცულობა',
    drivetrain: 'წამყვანი თვლები',
    transmission: 'ტრანსმისია',
    seats: 'ადგილები',
    pricePerDay: 'ფასი დღეში',
    trim: 'კომპლექტაცია',
  },
  drivetrain: {
    rwd: 'უკანა წამყვანი',
    awd: 'სრული წამყვანი',
    fwd: 'წინა წამყვანი',
  },
  transmission: {
    automatic: 'ავტომატური',
    manual: 'მექანიკური',
    'dual-clutch': 'ორმაგქურო',
    speed: '-საფეხურიანი',
  },
  units: {
    hp: 'ცხ. ძ.',
    kmh: 'კმ/სთ',
    cc: 'სმ³',
    seats: 'ადგილი',
  },
  pricing: {
    perDay: 'დღეში',
    onRequest: 'ფასი მოთხოვნით',
  },
  home: {
    hero: {
      eyebrow: 'ავტომობილების გაქირავება',
      cta: 'იხილეთ ავტოპარკი',
      scrollCue: 'ქვემოთ',
      imageAlt: 'Mercedes-Benz G-Class',
    },
    fleet: {
      heading: 'აირჩიეთ კატეგორია',
    },
  },
  detail: {
    close: 'დახურვა',
    gallery: 'გალერეა',
    galleryPending: 'ფოტოები მალე დაემატება',
    overview: 'მიმოხილვა',
  },
  about: {
    eyebrow: 'ჩვენ შესახებ',
    heading: 'სამი მანქანა. სამი განსხვავებული სტილი.',
    body: 'Big Boss Rent-ს მცირე ავტოპარკი აქვს — Maserati Ghibli, Mercedes-Benz G-Class და Chevrolet Corvette, თითო ყველა კატეგორიაზე. ონლაინ ჯავშანი არ არის: დაგვირეკავთ ან მოგვწერთ, შევათანხმებთ დეტალებს და მანქანას გაიყვანთ.',
  },
  conditions: {
    eyebrow: 'ქირაობის პირობები',
    heading: 'როგორ ხდება ქირაობა.',
    body: 'თვითმომსახურების გაფორმება არ არსებობს. როცა დაგვიკავშირდებით, დავაზუსტებთ დღიურ ტარიფს, დეპოზიტსა და ქირაობის ვადას და შევთანხმდებით მანქანის გადაცემის ადგილზე. თან იქონიეთ მოქმედი მართვის მოწმობა და პასპორტი ან პირადობის მოწმობა.',
    note: 'დეპოზიტი, მინიმალური ასაკი და გარბენის პირობები დამოკიდებულია მანქანაზე — დაგვიკავშირდებით და დაგიდასტურებთ.',
  },
  finalCta: {
    heading: 'მზად ვართ, როცა თქვენ.',
    body: 'დარეკეთ ან მოგვწერეთ მანქანის დასაჯავშნად.',
  },
  footer: {
    followUs: 'გამოგვყევით',
    socialPending: 'სოციალური ბმულები მალე დაემატება',
    rights: 'ყველა უფლება დაცულია.',
  },
  notFound: {
    code: '404',
    title: 'გვერდი ვერ მოიძებნა',
    body: 'ასეთი გვერდი არ არსებობს. დაბრუნდით საწყის გვერდზე.',
  },
}

export default ka
