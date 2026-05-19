import { getProducts } from "@/lib/api/products/getProducts";
import type { OilFilter } from "./types";

export async function getOilFilters(): Promise<OilFilter[]> {
  return getProducts("oilFilters") as Promise<OilFilter[]>;
}
