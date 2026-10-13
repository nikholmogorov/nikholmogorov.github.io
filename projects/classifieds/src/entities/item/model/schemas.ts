import { z } from "zod";
import { MAX_DESCRIPTION_LENGTH } from "./constants";

export const autoItemParamsSchema = z.strictObject({
  brand: z
    .string({ error: "Укажите марку" })
    .trim()
    .min(1, { error: "Укажите марку" }),
  model: z
    .string({ error: "Укажите модель" })
    .trim()
    .min(1, { error: "Укажите модель" }),
  yearOfManufacture: z
    .number({ error: "Укажите год выпуска" })
    .int({ error: "Год выпуска должен быть целым числом" })
    .positive({ error: "Год выпуска должен быть больше нуля" }),
  transmission: z.enum(["automatic", "manual"], {
    error: "Выберите коробку передач",
  }),
  mileage: z
    .number({ error: "Укажите пробег" })
    .positive({ error: "Пробег должен быть больше нуля" }),
  enginePower: z
    .number({ error: "Укажите мощность двигателя" })
    .int({ error: "Мощность должна быть целым числом" })
    .positive({ error: "Мощность двигателя должна быть больше нуля" }),
});

export const electronicsItemParamsSchema = z.strictObject({
  type: z.enum(["phone", "laptop", "misc"], {
    error: "Выберите тип устройства",
  }),
  brand: z
    .string({ error: "Укажите бренд" })
    .trim()
    .min(1, { error: "Укажите бренд" }),
  model: z
    .string({ error: "Укажите модель" })
    .trim()
    .min(1, { error: "Укажите модель" }),

  condition: z.enum(["new", "used"], {
    error: "Выберите состояние",
  }),
  color: z
    .string({ error: "Укажите цвет" })
    .trim()
    .min(1, { error: "Укажите цвет" }),
});

export const realEstateItemParamsSchema = z.strictObject({
  type: z.enum(["flat", "room", "house"], {
    error: "Выберите тип недвижимости",
  }),
  address: z
    .string({ error: "Укажите адрес" })
    .trim()
    .min(1, { error: "Укажите адрес" }),
  area: z
    .number({ error: "Укажите площадь" })
    .positive({ error: "Площадь должна быть больше нуля" }),
  floor: z
    .number({ error: "Укажите этаж" })
    .int({ error: "Этаж должен быть целым числом" })
    .positive({ error: "Этаж должен быть больше нуля" }),
});

export const ITEM_CONFIG = {
  auto: autoItemParamsSchema,
  electronics: electronicsItemParamsSchema,
  real_estate: realEstateItemParamsSchema,
} as const;

export const categorySchema = z.enum(["auto", "electronics", "real_estate"]);

export const itemsGetInQuerySchema = z.object({
  q: z.string().trim().optional().default(""),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().optional()),
  skip: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(0).optional().default(0)),
  categories: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) return val;
      return val.split(",").map((s) => s.trim());
    })
    .pipe(z.array(categorySchema).optional()),
  needsRevision: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      return val === "true" || val === "1";
    })
    .pipe(z.boolean().optional().default(false)),
  sortColumn: z.enum(["title", "createdAt", "price"]).optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export type ItemsGetInQuery = z.infer<typeof itemsGetInQuerySchema>;

const baseItemUpdateSchema = z.object({
  title: z
    .string({ error: "Укажите название" })
    .trim()
    .min(1, { error: "Укажите название" }),

  description: z
    .string({ error: "Укажите описание" })
    .trim()
    .min(1, { error: "Укажите описание" })
    .max(MAX_DESCRIPTION_LENGTH, {
      error: `Введите не более ${MAX_DESCRIPTION_LENGTH} символов`,
    }),

  price: z
    .number({ error: "Укажите цену" })
    .min(0, { error: "Цена не может быть отрицательной" }),
});

export const itemUpdateInSchema = z.discriminatedUnion("category", [
  baseItemUpdateSchema.extend({
    category: z.literal("auto"),
    params: ITEM_CONFIG.auto,
  }),
  baseItemUpdateSchema.extend({
    category: z.literal("electronics"),
    params: ITEM_CONFIG.electronics,
  }),
  baseItemUpdateSchema.extend({
    category: z.literal("real_estate"),
    params: ITEM_CONFIG.real_estate,
  }),
]);

export type ItemUpdateIn = z.infer<typeof itemUpdateInSchema>;
