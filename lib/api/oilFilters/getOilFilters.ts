import { supabase } from "@/lib/supabase";
import type { OilFilter } from "./types";

export async function getOilFilters(): Promise<OilFilter[]> {
  const { data, error } = await supabase.from("oil-filters").select("*");

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
