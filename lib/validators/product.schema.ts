import { z } from "zod";

export const productInputSchema = z.object({
  brand: z.string().trim().min(1),
  name: z.string().trim().min(1),
  model: z.string().trim().optional().nullable(),
  price: z.coerce.number().nonnegative(),
  badge: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  isActive: z.boolean().optional(),
  replacementId: z.coerce.number().int().positive().optional().nullable(),
});

export const productUpdateSchema = productInputSchema.partial().extend({
  id: z.coerce.number().int().positive(),
});
