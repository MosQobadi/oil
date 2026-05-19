import { deleteProduct } from "@/lib/api/products/deleteProduct";

export async function deleteAirFilter(id: number) {
  return deleteProduct("airFilters", id);
}
