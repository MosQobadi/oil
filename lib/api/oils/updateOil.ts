import { updateProduct } from "@/lib/api/products/updateProduct";
import type { OilUpdatePayload } from "./types";

export async function updateOil(oil: OilUpdatePayload) {
  return updateProduct("oils", oil);
}
