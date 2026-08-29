import type { Dict } from './index'

// Русский. REVIEW: working draft — needs a native-speaker pass (ART_DIRECTION.md §10).
const ru: Dict = {
  meta: {
    brand: 'Big Boss Rent',
    title: 'Big Boss Rent',
    tagline: 'Аренда по телефону или в WhatsApp.',
  },
  nav: {
    home: 'Главная',
    fleet: 'Автопарк',
    menu: 'Меню',
    open: 'Открыть меню',
    close: 'Закрыть меню',
    skip: 'Перейти к содержимому',
  },
  categories: {
    sedan: 'Седан',
    suv: 'Внедорожник',
    coupe: 'Купе',
  },
  theme: {
    label: 'Тема',
    toLight: 'Переключить на светлую тему',
    toDark: 'Переключить на тёмную тему',
    light: 'Светлая',
    dark: 'Тёмная',
  },
  language: {
    label: 'Язык',
  },
  actions: {
    rent: 'Арендовать',
    call: 'Позвонить',
    whatsapp: 'WhatsApp',
    viewDetails: 'Подробнее',
    backToFleet: 'Назад к автопарку',
    callAria: 'Позвонить в Big Boss Rent',
    whatsappAria: 'Написать Big Boss Rent в WhatsApp',
    contactPending: 'Телефон и WhatsApp появятся позже',
    whatsappMessage: 'Здравствуйте, меня интересует аренда {car}.',
    whatsappMessageGeneric: 'Здравствуйте, я хочу арендовать автомобиль.',
  },
  specs: {
    title: 'Характеристики',
    horsepower: 'Мощность',
    topSpeed: 'Максимальная скорость',
    displacement: 'Объём двигателя',
    drivetrain: 'Привод',
    transmission: 'Коробка передач',
    seats: 'Мест',
    pricePerDay: 'Цена в сутки',
    trim: 'Комплектация',
  },
  drivetrain: {
    rwd: 'Задний привод',
    awd: 'Полный привод',
    fwd: 'Передний привод',
  },
  transmission: {
    automatic: 'автоматическая',
    manual: 'механическая',
    'dual-clutch': 'с двойным сцеплением',
    speed: '-ступенчатая',
  },
  units: {
    hp: 'л. с.',
    kmh: 'км/ч',
    cc: 'см³',
    seats: 'мест',
  },
  pricing: {
    perDay: 'в сутки',
    onRequest: 'Цена по запросу',
  },
  home: {
    hero: {
      eyebrow: 'Аренда автомобилей',
      cta: 'Смотреть автопарк',
      scrollCue: 'Вниз',
      imageAlt: 'Mercedes-Benz G-класс',
    },
    fleet: {
      heading: 'Выберите категорию',
    },
  },
  detail: {
    close: 'Закрыть',
    gallery: 'Галерея',
    galleryPending: 'Фотографии появятся позже',
    overview: 'Обзор',
  },
  about: {
    eyebrow: 'О нас',
    heading: 'Три машины. Три разных характера.',
    body: 'У Big Boss Rent небольшой автопарк — Maserati Ghibli, Mercedes-Benz G-Class и Chevrolet Corvette, по одной на каждую категорию. Онлайн-бронирования нет: вы звоните или пишете нам, мы согласовываем детали, и вы забираете машину.',
  },
  conditions: {
    eyebrow: 'Условия аренды',
    heading: 'Как проходит аренда.',
    body: 'Оформление в режиме самообслуживания отсутствует. Когда вы свяжетесь с нами, мы уточним суточный тариф, депозит и срок аренды и договоримся о месте передачи автомобиля. При себе имейте действующее водительское удостоверение и паспорт или удостоверение личности.',
    note: 'Депозит, минимальный возраст и условия по пробегу зависят от автомобиля — мы сообщим их, когда вы свяжетесь с нами.',
  },
  finalCta: {
    heading: 'Готовы, когда вы готовы.',
    body: 'Позвоните или напишите нам, чтобы забронировать машину.',
  },
  footer: {
    followUs: 'Мы в соцсетях',
    socialPending: 'Ссылки на соцсети появятся позже',
    rights: 'Все права защищены.',
  },
  notFound: {
    code: '404',
    title: 'Страница не найдена',
    body: 'Такой страницы нет. Вернитесь на главную.',
  },
}

export default ru
