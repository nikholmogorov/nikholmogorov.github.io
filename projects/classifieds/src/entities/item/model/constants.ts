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
    src: "https://placehold.co/960x720?text=Фото+1",
    thumbnail: "https://placehold.co/160x120?text=1",
    alt: "Фото 1",
    caption: "Фото 1",
  },
  {
    src: "https://placehold.co/960x720?text=Фото+2",
    thumbnail: "https://placehold.co/160x120?text=2",
    alt: "Фото 2",
    caption: "Фото 2",
  },
  {
    src: "https://placehold.co/960x720?text=Фото+3",
    thumbnail: "https://placehold.co/160x120?text=3",
    alt: "Фото 3",
    caption: "Фото 3",
  },
  {
    src: "https://placehold.co/960x720?text=Фото+4",
    thumbnail: "https://placehold.co/160x120?text=4",
    alt: "Фото 4",
    caption: "Фото 4",
  },
];
