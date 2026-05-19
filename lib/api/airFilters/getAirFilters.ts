import { getProducts } from "@/lib/api/products/getProducts";
import type { AirFilter } from "./types";

export async function getAirFilters(): Promise<AirFilter[]> {
  return getProducts("airFilters") as Promise<AirFilter[]>;
}
