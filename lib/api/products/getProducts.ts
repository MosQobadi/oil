import { apiRequest } from "@/lib/api/http";
import type { Product, ProductCategory } from "./types";

export async function getProducts(
  category: ProductCategory,
): Promise<Product[]> {
  return apiRequest<Product[]>(`/api/products/${category}`);
}
