import { getProducts } from "@/lib/api/products/getProducts";
import type { FuelFilter } from "./types";

export async function getFuelFilters(): Promise<FuelFilter[]> {
  return getProducts("fuelFilters") as Promise<FuelFilter[]>;
}
