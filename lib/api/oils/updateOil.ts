import { supabase } from "@/lib/supabase";
import type { OilUpdatePayload } from "./types";

export async function updateOil(oil: OilUpdatePayload) {
  const { id, ...updates } = oil;
  const { data, error } = await supabase
    .from("oils")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
