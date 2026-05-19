import { deleteProduct } from "@/lib/api/products/deleteProduct";

export async function deleteOilFilter(id: number) {
  return deleteProduct("oilFilters", id);
}
