import { supabase } from "@/lib/supabase";
import type { AirFilterInsertPayload } from "./types";

export async function addAirFilter(filter: AirFilterInsertPayload) {
  const { data, error } = await supabase
    .from("air-filters")
    .insert([filter])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
