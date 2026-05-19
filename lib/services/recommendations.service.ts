import "server-only";

import type { ProductCategory, RecommendationType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { replaceRecommendationsSchema } from "@/lib/validators/recommendation.schema";

const expectedCategoryByType: Record<RecommendationType, ProductCategory> = {
  SUGGESTED_OIL: "OIL",
  SUGGESTED_OIL_FILTER: "OIL_FILTER",
  SUGGESTED_AIR_FILTER: "AIR_FILTER",
  SUGGESTED_CABIN_FILTER: "CABIN_FILTER",
  SUGGESTED_FUEL_FILTER: "FUEL_FILTER",
};

export async function replaceCarRecommendations(carId: number, input: unknown) {
  const { recommendations } = replaceRecommendationsSchema.parse(input);
  const products = await prisma.product.findMany({
    where: { id: { in: recommendations.map((item) => item.productId) } },
    select: { id: true, category: true },
  });
  const productById = new Map(products.map((product) => [product.id, product]));

  for (const recommendation of recommendations) {
    const product = productById.get(recommendation.productId);

    if (!product) {
      throw new Error(`Product ${recommendation.productId} does not exist.`);
    }

    if (product.category !== expectedCategoryByType[recommendation.type]) {
      throw new Error(`Product ${recommendation.productId} has the wrong category.`);
    }
  }

  await prisma.$transaction([
    prisma.carProductRecommendation.deleteMany({ where: { carId } }),
    prisma.carProductRecommendation.createMany({
      data: recommendations.map((recommendation) => ({
        carId,
        productId: recommendation.productId,
        type: recommendation.type,
        priority: recommendation.priority ?? 1,
      })),
    }),
  ]);

  return prisma.carProductRecommendation.findMany({
    where: { carId },
    include: { product: true },
    orderBy: [{ type: "asc" }, { priority: "asc" }],
  });
}
