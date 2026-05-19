import { addProduct } from "@/lib/api/products/addProduct";
import type { AirFilterInsertPayload } from "./types";

export async function addAirFilter(filter: AirFilterInsertPayload) {
  return addProduct("airFilters", filter);
}
