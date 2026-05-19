import { apiRequest } from "@/lib/api/http";
import type { Product, ProductCategory, ProductInsertPayload } from "./types";

export async function addProduct(
  category: ProductCategory,
  product: ProductInsertPayload,
) {
  return apiRequest<Product[]>(`/api/products/${category}`, {
    method: "POST",
    body: JSON.stringify(product),
  });
}
