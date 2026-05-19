import { supabase } from "@/lib/supabase";
import type { ProductCategory } from "./types";
import { productTableName } from "./utils";

export async function deleteProduct(category: ProductCategory, id: number) {
  const { data, error } = await supabase
    .from(productTableName(category))
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(error.message);
  }

  return data;
}
