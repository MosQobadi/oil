import { supabase } from "@/lib/supabase";
import type { OilFilterUpdatePayload } from "./types";

export async function updateOilFilter(filter: OilFilterUpdatePayload) {
  const { id, ...updates } = filter;
  const { data, error } = await supabase
    .from("oil-filters")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
