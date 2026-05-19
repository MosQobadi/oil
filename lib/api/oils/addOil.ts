import { addProduct } from "@/lib/api/products/addProduct";
import type { OilInsertPayload } from "./types";

export async function addOil(oil: OilInsertPayload) {
  return addProduct("oils", oil);
}
