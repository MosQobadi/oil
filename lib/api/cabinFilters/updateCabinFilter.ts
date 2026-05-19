import { updateProduct } from "@/lib/api/products/updateProduct";
import type { CabinFilterUpdatePayload } from "./types";

export async function updateCabinFilter(filter: CabinFilterUpdatePayload) {
  return updateProduct("cabinFilters", filter);
}
