import { supabase } from "@/lib/supabase";
import type { CabinFilterInsertPayload } from "./types";

export async function addCabinFilter(filter: CabinFilterInsertPayload) {
  const { data, error } = await supabase
    .from("cabin-filters")
    .insert([filter])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
