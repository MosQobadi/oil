import { supabase } from "@/lib/supabase";
import type { OilFilterInsertPayload } from "./types";

export async function addOilFilter(filter: OilFilterInsertPayload) {
  const { data, error } = await supabase
    .from("oil-filters")
    .insert([filter])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
