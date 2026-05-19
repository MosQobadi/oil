import { deleteProduct } from "@/lib/api/products/deleteProduct";

export async function deleteOil(id: number) {
  return deleteProduct("oils", id);
}
