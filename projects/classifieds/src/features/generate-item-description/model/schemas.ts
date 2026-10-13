import { z } from "zod";
import { MAX_DESCRIPTION_LENGTH } from "@/entities/item";

const optionalText = z.string().max(300).trim().optional();

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
  mode: z.enum(["generate", "improve"]),
  title: z.string().max(200).trim().optional().default(""),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH)
    .trim()
    .optional()
    .default(""),
  price: z.number().min(0).nullable().optional().default(null),
};

export const descriptionSuggestionInSchema = z
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
    if (item.mode === "improve" && !item.description.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Для улучшения необходимо существующее описание",
      });
    }

    const hasParams = Object.values(item.params).some(
      (value) =>
        (typeof value === "string" && value.length > 0) ||
        typeof value === "number",
    );

    if (!item.title && !hasParams && !item.description) {
      ctx.addIssue({
        code: "custom",
        path: ["title"],
        message: "Недостаточно данных для создания описания",
      });
    }
  });

export const descriptionSuggestionOutSchema = z.strictObject({
  description: z
    .string()
    .min(1)
    .max(MAX_DESCRIPTION_LENGTH)
    .refine((value) => value.trim().length > 0, {
      message: "Описание не должно быть пустым",
    }),
});

export type DescriptionSuggestionIn = z.infer<
  typeof descriptionSuggestionInSchema
>;

export type DescriptionSuggestionOut = z.infer<
  typeof descriptionSuggestionOutSchema
>;
