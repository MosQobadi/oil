import { apiRequest } from "@/lib/api/http";
import type { Product, ProductCategory, ProductUpdatePayload } from "./types";

export async function updateProduct(
  category: ProductCategory,
  product: ProductUpdatePayload,
) {
  return apiRequest<Product[]>(`/api/products/${category}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
}
