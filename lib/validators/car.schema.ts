import { z } from "zod";

export const carInputSchema = z.object({
  brand: z.string().trim().min(1),
  model: z.string().trim().min(1),
  year: z.coerce.number().int().min(1900).max(2100),
  engine: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
});

export const carUpdateSchema = carInputSchema.partial().extend({
  id: z.coerce.number().int().positive(),
});
