import { z } from "zod";

const suggestedProductsSchema = z
  .object({
    suggestedOils: z.array(z.coerce.number().int().positive()).optional(),
    suggestedOilFilters: z.array(z.coerce.number().int().positive()).optional(),
    suggestedAirFilters: z.array(z.coerce.number().int().positive()).optional(),
    suggestedCabinFilters: z
      .array(z.coerce.number().int().positive())
      .optional(),
    suggestedFuelFilters: z
      .array(z.coerce.number().int().positive())
      .optional(),
  })
  .optional()
  .nullable();

export const carInputSchema = z.object({
  brand: z.string().trim().min(1),
  model: z.string().trim().min(1),
  year: z.coerce.number().int().min(1900).max(2100),
  engine: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  suggestedProducts: suggestedProductsSchema,
});

export const carUpdateSchema = carInputSchema.partial().extend({
  id: z.coerce.number().int().positive(),
});
