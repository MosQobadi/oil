import { supabase } from "@/lib/supabase";
import type { CabinFilterUpdatePayload } from "./types";

export async function updateCabinFilter(filter: CabinFilterUpdatePayload) {
  const { id, ...updates } = filter;
  const { data, error } = await supabase
    .from("cabin-filters")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
