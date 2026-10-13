import "server-only";

import { generateOllamaText, OllamaClientError } from "@/shared/api";
import {
  type PriceSuggestionIn,
  priceSuggestionInSchema,
  priceSuggestionOutSchema,
} from "../model/schemas";

const responseFormat = {
  type: "object",
  properties: {
    price: {
      type: "integer",
      minimum: 1,
    },
    reason: {
      type: "string",
    },
  },
  required: ["price", "reason"],
  additionalProperties: false,
};

const systemPrompt = [
  "Ты помощник по оценке цены объявлений.",
  "Твоя задача — предложить ориентировочную цену продажи.",
  "У тебя нет доступа к интернету и актуальным объявлениям.",
  "Не утверждай, что проводил поиск или проверил рыночные цены.",
  "Не выдумывай отсутствующие характеристики товара.",
  "Учитывай категорию, состояние и все предоставленные сведения.",
  "Если данных недостаточно, предложи осторожную приблизительную оценку.",
  "Цена должна быть положительным целым числом в ценовых единицах приложения.",
  "Не добавляй валютные символы в поле price.",
  "Обоснуй оценку кратко, не более двух предложений.",
].join(" ");

const categoryNames = {
  auto: "Автомобиль",
  electronics: "Электроника",
  real_estate: "Недвижимость",
} as const;

function appendParam(
  lines: string[],
  label: string,
  value: string | number | undefined,
) {
  if (value !== undefined && value !== "") {
    lines.push(`${label}: ${value}`);
  }
}

function formatParams(item: PriceSuggestionIn): string {
  const lines: string[] = [];

  switch (item.category) {
    case "auto": {
      const params = item.params;

      appendParam(lines, "Марка", params.brand);
      appendParam(lines, "Модель", params.model);
      appendParam(lines, "Год выпуска", params.yearOfManufacture);
      appendParam(
        lines,
        "Коробка передач",
        params.transmission === "automatic"
          ? "Автоматическая"
          : params.transmission === "manual"
            ? "Механическая"
            : undefined,
      );
      appendParam(lines, "Пробег", params.mileage);
      appendParam(lines, "Мощность двигателя", params.enginePower);
      break;
    }

    case "electronics": {
      const params = item.params;

      appendParam(
        lines,
        "Тип устройства",
        params.type === "phone"
          ? "Телефон"
          : params.type === "laptop"
            ? "Ноутбук"
            : params.type === "misc"
              ? "Другое"
              : undefined,
      );
      appendParam(lines, "Бренд", params.brand);
      appendParam(lines, "Модель", params.model);
      appendParam(
        lines,
        "Состояние",
        params.condition === "new"
          ? "Новое"
          : params.condition === "used"
            ? "Б/у"
            : undefined,
      );
      appendParam(lines, "Цвет", params.color);
      break;
    }

    case "real_estate": {
      const params = item.params;

      appendParam(
        lines,
        "Тип недвижимости",
        params.type === "flat"
          ? "Квартира"
          : params.type === "room"
            ? "Комната"
            : params.type === "house"
              ? "Дом"
              : undefined,
      );
      appendParam(lines, "Адрес", params.address);
      appendParam(lines, "Площадь", params.area);
      appendParam(lines, "Этаж", params.floor);
      break;
    }
  }

  return lines.length > 0 ? lines.join("\n") : "Характеристики не указаны";
}

function buildPrompt(item: PriceSuggestionIn): string {
  return [
    "Оцени рекомендуемую цену продажи объявления.",
    "",
    `Категория: ${categoryNames[item.category]}`,
    `Название: ${item.title || "Не указано"}`,
    `Описание: ${item.description || "Не указано"}`,
    "",
    "Характеристики:",
    formatParams(item),
    "",
    "Предложи реалистичную приблизительную цену.",
    "Округли её до удобного целого значения.",
    "Верни цену и краткое обоснование в заданном JSON-формате.",
  ].join("\n");
}

export async function suggestItemPrice(input: unknown) {
  const item = priceSuggestionInSchema.parse(input);

  const response = await generateOllamaText({
    system: systemPrompt,
    prompt: buildPrompt(item),
    temperature: 0.1,
    numPredict: 250,
    responseFormat,
  });

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(response);
  } catch {
    throw new OllamaClientError(
      "Модель вернула некорректный JSON",
      "INVALID_RESPONSE",
    );
  }

  const result = priceSuggestionOutSchema.safeParse(parsedJson);

  if (!result.success) {
    throw new OllamaClientError(
      "Ответ модели не соответствует схеме подбора цены",
      "INVALID_RESPONSE",
    );
  }

  return result.data;
}
