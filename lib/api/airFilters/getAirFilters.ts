import { supabase } from "@/lib/supabase";
import type { AirFilter } from "./types";

export async function getAirFilters(): Promise<AirFilter[]> {
  const { data, error } = await supabase.from("air-filters").select("*");

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
