import { deleteProduct } from "@/lib/api/products/deleteProduct";

export async function deleteCabinFilter(id: number) {
  return deleteProduct("cabinFilters", id);
}
