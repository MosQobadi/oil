import { apiRequest } from "@/lib/api/http";
import type { Product, ProductCategory } from "./types";

export async function deleteProduct(category: ProductCategory, id: number) {
  return apiRequest<Product[]>(`/api/products/${category}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
