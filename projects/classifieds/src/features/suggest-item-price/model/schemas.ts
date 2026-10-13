import { z } from "zod";
import { MAX_DESCRIPTION_LENGTH } from "@/entities/item";

const optionalText = z.string().max(200).trim().optional();

const autoParamsSchema = z.strictObject({
  brand: optionalText,
  model: optionalText,
  yearOfManufacture: z.number().int().positive().optional(),
  transmission: z.enum(["automatic", "manual"]).optional(),
  mileage: z.number().min(0).optional(),
  enginePower: z.number().int().positive().optional(),
});

const electronicsParamsSchema = z.strictObject({
  type: z.enum(["phone", "laptop", "misc"]).optional(),
  brand: optionalText,
  model: optionalText,
  condition: z.enum(["new", "used"]).optional(),
  color: optionalText,
});

const realEstateParamsSchema = z.strictObject({
  type: z.enum(["flat", "room", "house"]).optional(),
  address: z.string().max(300).trim().optional(),
  area: z.number().positive().optional(),
  floor: z.number().int().positive().optional(),
});

const baseFields = {
  title: z.string().max(200).trim().optional().default(""),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH)
    .trim()
    .optional()
    .default(""),
};

export const priceSuggestionInSchema = z
  .discriminatedUnion("category", [
    z.strictObject({
      ...baseFields,
      category: z.literal("auto"),
      params: autoParamsSchema,
    }),
    z.strictObject({
      ...baseFields,
      category: z.literal("electronics"),
      params: electronicsParamsSchema,
    }),
    z.strictObject({
      ...baseFields,
      category: z.literal("real_estate"),
      params: realEstateParamsSchema,
    }),
  ])
  .superRefine((item, ctx) => {
    const hasParams = Object.values(item.params).some(
      (value) =>
        (typeof value === "string" && value.length > 0) ||
        typeof value === "number",
    );

    if (!item.title && !item.description && !hasParams) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Укажите название, описание или характеристики объявления",
      });
    }
  });

export const priceSuggestionOutSchema = z.strictObject({
  price: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  reason: z.string().trim().min(1).max(500),
});

export type PriceSuggestionIn = z.infer<typeof priceSuggestionInSchema>;

export type PriceSuggestionOut = z.infer<typeof priceSuggestionOutSchema>;
