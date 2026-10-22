import { z } from "zod";

const textFieldSchema = z
  .string()
  .min(2, "Min 2 characters")
  .max(10, "Max 10 characters");

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(/^\p{L}+$/u, "Letters only"),

  lastName: z
    .string()
    .min(2, "Min 2 characters")
    .max(50, "Max 50 characters")
    .regex(/^\p{L}+$/u, "Letters only"),

  email: z.string().min(1, "Email is required").email("Invalid email address"),

  phone: z.string().superRefine((val, ctx) => {
    const digits = val.replace(/\D/g, "").replace(/^7/, "");

    if (digits.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone is required",
      });

      return;
    }

    if (digits.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number",
      });
    }
  }),

  github: z.string().startsWith("https://github.com", "Invalid link"),

  cv: z.string().startsWith("https://", "Invalid link"),

  telegram: z.string().min(1, "Telegram is required"),

  speciality: z
    .string()
    .min(2, "Min 2 characters")
    .max(100, "Max 100 characters"),

  stack: z.string().min(2, "Min 2 characters").max(100, "Max 100 characters"),

  grade: z.enum(["junior", "middle", "senior"], {
    message: "Selection required",
  }),

  textField1: textFieldSchema,
  textField2: textFieldSchema,
  textField3: textFieldSchema,
  textField4: textFieldSchema,
  textField5: textFieldSchema,
  textField6: textFieldSchema,
  textField7: textFieldSchema,
  textField8: textFieldSchema,
  textField9: textFieldSchema,
  textField10: textFieldSchema,

  checkbox1: z.boolean(),
  checkbox2: z.boolean(),
  checkbox3: z.boolean(),

  radioValue: z.enum(["radio-1", "radio-2", "radio-3"], {
    message: "Selection required",
  }),
});

export const firstStepSchema = formSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  github: true,
  cv: true,
  telegram: true,
});

export const secondStepSchema = formSchema.pick({
  speciality: true,
  stack: true,
  grade: true,
});

export const thirdStepSchema = formSchema.pick({
  textField1: true,
  textField2: true,
  textField3: true,
  textField4: true,
  textField5: true,
  textField6: true,
  textField7: true,
  textField8: true,
  textField9: true,
  textField10: true,
  checkbox1: true,
  checkbox2: true,
  checkbox3: true,
  radioValue: true,
});

export type FormSchema = z.infer<typeof formSchema>;
export type FirstStepSchema = z.infer<typeof firstStepSchema>;
export type SecondStepSchema = z.infer<typeof secondStepSchema>;
export type ThirdStepSchema = z.infer<typeof thirdStepSchema>;
