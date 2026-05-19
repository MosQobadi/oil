import { addProduct } from "@/lib/api/products/addProduct";
import type { OilFilterInsertPayload } from "./types";

export async function addOilFilter(filter: OilFilterInsertPayload) {
  return addProduct("oilFilters", filter);
}
