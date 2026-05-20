import { deleteProduct } from "@/lib/api/products/deleteProduct";

export async function deleteFuelFilter(id: number) {
  return deleteProduct("fuelFilters", id);
}
