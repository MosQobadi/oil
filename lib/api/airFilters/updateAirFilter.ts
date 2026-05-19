import { supabase } from "@/lib/supabase";
import type { AirFilterUpdatePayload } from "./types";

export async function updateAirFilter(filter: AirFilterUpdatePayload) {
  const { id, ...updates } = filter;
  const { data, error } = await supabase
    .from("air-filters")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
