import { supabase } from "@/lib/supabase";
import type { ProductCategory, ProductInsertPayload } from "./types";
import { productTableName } from "./utils";

export async function addProduct(
  category: ProductCategory,
  product: ProductInsertPayload,
) {
  const { data, error } = await supabase
    .from(productTableName(category))
    .insert([product])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
