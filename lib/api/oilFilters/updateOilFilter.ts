import { updateProduct } from "@/lib/api/products/updateProduct";
import type { OilFilterUpdatePayload } from "./types";

export async function updateOilFilter(filter: OilFilterUpdatePayload) {
  return updateProduct("oilFilters", filter);
}
