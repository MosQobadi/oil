import { getProducts } from "@/lib/api/products/getProducts";
import type { CabinFilter } from "./types";

export async function getCabinFilters(): Promise<CabinFilter[]> {
  return getProducts("cabinFilters") as Promise<CabinFilter[]>;
}
