import "server-only";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { parseProductCategory, type ProductCategory } from "@/lib/api/product-category";
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

async function findManyByCategory(category: ProductCategory) {
  const orderBy = [{ isActive: "desc" as const }, { brand: "asc" as const }, { name: "asc" as const }];

  switch (category) {
    case "oils":
      return prisma.oil.findMany({ orderBy });
    case "oilFilters":
      return prisma.oilFilter.findMany({ orderBy });
    case "airFilters":
      return prisma.airFilter.findMany({ orderBy });
    case "cabinFilters":
      return prisma.cabinFilter.findMany({ orderBy });
    case "fuelFilters":
      return prisma.fuelFilter.findMany({ orderBy });
  }
}

type ProductInput = ReturnType<typeof productInputSchema.parse>;
type ProductUpdate = Omit<ReturnType<typeof productUpdateSchema.parse>, "id">;

async function createByCategory(category: ProductCategory, data: ProductInput) {
  const { replacementId, ...sharedData } = data;
  const createData = {
    ...sharedData,
    price: new Prisma.Decimal(data.price),
  };

  switch (category) {
    case "oils":
      return prisma.oil.create({ data: { ...createData, replacementId } });
    case "oilFilters":
      return prisma.oilFilter.create({ data: createData });
    case "airFilters":
      return prisma.airFilter.create({ data: createData });
    case "cabinFilters":
      return prisma.cabinFilter.create({ data: createData });
    case "fuelFilters":
      return prisma.fuelFilter.create({ data: createData });
  }
}

async function updateByCategory(
  category: ProductCategory,
  id: number,
  data: ProductUpdate,
) {
  const { replacementId, ...sharedData } = data;
  const updateData = {
    ...sharedData,
    ...(data.price === undefined ? {} : { price: new Prisma.Decimal(data.price) }),
  };

  switch (category) {
    case "oils":
      return prisma.oil.update({ where: { id }, data: { ...updateData, replacementId } });
    case "oilFilters":
      return prisma.oilFilter.update({ where: { id }, data: updateData });
    case "airFilters":
      return prisma.airFilter.update({ where: { id }, data: updateData });
    case "cabinFilters":
      return prisma.cabinFilter.update({ where: { id }, data: updateData });
    case "fuelFilters":
      return prisma.fuelFilter.update({ where: { id }, data: updateData });
  }
}

async function deleteByCategory(category: ProductCategory, id: number) {
  switch (category) {
    case "oils":
      return prisma.oil.delete({ where: { id } });
    case "oilFilters":
      return prisma.oilFilter.delete({ where: { id } });
    case "airFilters":
      return prisma.airFilter.delete({ where: { id } });
    case "cabinFilters":
      return prisma.cabinFilter.delete({ where: { id } });
    case "fuelFilters":
      return prisma.fuelFilter.delete({ where: { id } });
  }
}

export async function listProducts(categoryValue: string) {
  const category = parseProductCategory(categoryValue);
  const products = await findManyByCategory(category);

  return products.map(serializeProduct);
}

export async function createProduct(category: ProductCategory, input: unknown) {
  const data = productInputSchema.parse(input);
  const product = await createByCategory(category, data);

  return [serializeProduct(product)];
}

export async function updateProductById(category: ProductCategory, input: unknown) {
  const { id, price, ...data } = productUpdateSchema.parse(input);
  const product = await updateByCategory(category, id, { ...data, price });

  return [serializeProduct(product)];
}

export async function deleteProductById(category: ProductCategory, id: unknown) {
  const productId = productUpdateSchema.shape.id.parse(id);
  const product = await deleteByCategory(category, productId);

  return [serializeProduct(product)];
}
