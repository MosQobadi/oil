import { addProduct } from "@/lib/api/products/addProduct";
import type { FuelFilterInsertPayload } from "./types";

export async function addFuelFilter(filter: FuelFilterInsertPayload) {
  return addProduct("fuelFilters", filter);
}
