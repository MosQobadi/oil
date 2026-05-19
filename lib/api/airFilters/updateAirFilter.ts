import { updateProduct } from "@/lib/api/products/updateProduct";
import type { AirFilterUpdatePayload } from "./types";

export async function updateAirFilter(filter: AirFilterUpdatePayload) {
  return updateProduct("airFilters", filter);
}
