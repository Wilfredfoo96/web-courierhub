import { z } from "zod";

export const schema = z.object({
  postcodeFrom: z.string(),
  postcodeTo: z.string(),
  weight: z
    .union([
      z
        .number()
        .positive("Weight must be a positive number")
        .finite("Weight must be a finite number")
        .refine(
          (value) => Number.isInteger(value * 100),
          "Weight must have at most 2 decimal places"
        ),
      z
        .string()
        .trim()
        .regex(
          /^\d+(\.\d{1,2})?$/,
          "Weight must be a number with at most 2 decimal places"
        )
        .transform(Number),
    ])
    .refine((value) => value > 0, "Weight must be greater than 0"),
});

export type PoslajuGetQuoteSchema = z.infer<typeof schema>;
