import { supabase } from "@/lib/supabase";
import type { Product, ProductCategory } from "./types";
import { productTableName } from "./utils";

export async function getProducts(
  category: ProductCategory,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from(productTableName(category))
    .select("*");

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
