import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  parseProductCategory,
  productCategoryToPrisma,
  type ProductCategory,
} from "@/lib/api/product-category";
import {
  productInputSchema,
  productUpdateSchema,
} from "@/lib/validators/product.schema";

function serializeProduct<
  T extends {
    price: Prisma.Decimal;
    model: string | null;
    badge: string | null;
    description: string | null;
    imageUrl: string | null;
  },
>(product: T) {
  return {
    ...product,
    model: product.model ?? "",
    badge: product.badge ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? undefined,
    price: product.price.toNumber(),
  };
}

export async function listProducts(categoryValue: string) {
  const category = parseProductCategory(categoryValue);
  const products = await prisma.product.findMany({
    where: { category: productCategoryToPrisma[category] },
    orderBy: [{ isActive: "desc" }, { brand: "asc" }, { name: "asc" }],
  });

  return products.map(serializeProduct);
}

export async function createProduct(category: ProductCategory, input: unknown) {
  const data = productInputSchema.parse(input);
  const product = await prisma.product.create({
    data: {
      ...data,
      price: new Prisma.Decimal(data.price),
      category: productCategoryToPrisma[category],
    },
  });

  return [serializeProduct(product)];
}

export async function updateProductById(input: unknown) {
  const { id, price, ...data } = productUpdateSchema.parse(input);
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...data,
      ...(price === undefined ? {} : { price: new Prisma.Decimal(price) }),
    },
  });

  return [serializeProduct(product)];
}

export async function deleteProductById(id: unknown) {
  const productId = productUpdateSchema.shape.id.parse(id);
  const product = await prisma.product.delete({ where: { id: productId } });

  return [serializeProduct(product)];
}
