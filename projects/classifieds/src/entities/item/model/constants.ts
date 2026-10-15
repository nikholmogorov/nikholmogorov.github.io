import type { ItemCategory } from "./item";

export const CATEGORIES: Record<ItemCategory, string> = {
  auto: `Авто`,
  electronics: `Электроника`,
  real_estate: `Недвижимость`,
};

export const ITEMS_PER_PAGE = 10;

export const MAX_DESCRIPTION_LENGTH = 1000;

export const PARAM_LABELS: Record<ItemCategory, Record<string, string>> = {
  auto: {
    brand: "Марка",
    model: "Модель",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег",
    enginePower: "Мощность двигателя",
    description: "Описание",
  },

  electronics: {
    type: "Тип устройства",
    brand: "Бренд",
    model: "Модель",
    condition: "Состояние",
    color: "Цвет",
    description: "Описание",
  },

  real_estate: {
    type: "Тип недвижимости",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
    description: "Описание",
  },
};

export const PARAM_VALUE_LABELS: Record<
  ItemCategory,
  Record<string, Record<string, string>>
> = {
  auto: {
    transmission: {
      automatic: "Автоматическая",
      manual: "Механическая",
    },
  },

  electronics: {
    type: {
      phone: "Телефон",
      misc: "Прочее",
    },
    condition: {
      new: "Новое",
      used: "Б/у",
    },
  },

  real_estate: {
    type: {
      flat: "Квартира",
      room: "Комната",
      house: "Дом",
    },
  },
};

export const IMAGES = [
  {
    src: "/images/placeholders/photo-1.svg",
    thumbnail: "/images/placeholders/thumbnail-1.svg",
    alt: "Фото 1",
    caption: "Фото 1",
  },
  {
    src: "/images/placeholders/photo-2.svg",
    thumbnail: "/images/placeholders/thumbnail-2.svg",
    alt: "Фото 2",
    caption: "Фото 2",
  },
  {
    src: "/images/placeholders/photo-3.svg",
    thumbnail: "/images/placeholders/thumbnail-3.svg",
    alt: "Фото 3",
    caption: "Фото 3",
  },
  {
    src: "/images/placeholders/photo-4.svg",
    thumbnail: "/images/placeholders/thumbnail-4.svg",
    alt: "Фото 4",
    caption: "Фото 4",
  },
];
