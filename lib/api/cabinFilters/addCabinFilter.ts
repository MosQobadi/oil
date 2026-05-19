import { addProduct } from "@/lib/api/products/addProduct";
import type { CabinFilterInsertPayload } from "./types";

export async function addCabinFilter(filter: CabinFilterInsertPayload) {
  return addProduct("cabinFilters", filter);
}
