import { getProducts } from "@/lib/api/products/getProducts";
import type { Oil } from "./types";

export async function getOils(): Promise<Oil[]> {
  return getProducts("oils") as Promise<Oil[]>;
}
