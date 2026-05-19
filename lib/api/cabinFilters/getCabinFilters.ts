import { supabase } from "@/lib/supabase";
import type { CabinFilter } from "./types";

export async function getCabinFilters(): Promise<CabinFilter[]> {
  const { data, error } = await supabase.from("cabin-filters").select("*");

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
