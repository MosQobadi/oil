import { z } from "zod";

export const recommendationTypeSchema = z.enum([
  "SUGGESTED_OIL",
  "SUGGESTED_OIL_FILTER",
  "SUGGESTED_AIR_FILTER",
  "SUGGESTED_CABIN_FILTER",
  "SUGGESTED_FUEL_FILTER",
]);

export const replaceRecommendationsSchema = z.object({
  recommendations: z.array(
    z.object({
      productId: z.coerce.number().int().positive(),
      type: recommendationTypeSchema,
      priority: z.coerce.number().int().positive().optional(),
    }),
  ),
});
