import { supabase } from "@/lib/supabase";
import type { ProductCategory, ProductUpdatePayload } from "./types";
import { productTableName } from "./utils";

export async function updateProduct(
  category: ProductCategory,
  product: ProductUpdatePayload,
) {
  const { id, ...updates } = product;
  const { data, error } = await supabase
    .from(productTableName(category))
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
