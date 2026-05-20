import { updateProduct } from "@/lib/api/products/updateProduct";
import type { FuelFilterUpdatePayload } from "./types";

export async function updateFuelFilter(filter: FuelFilterUpdatePayload) {
  return updateProduct("fuelFilters", filter);
}
