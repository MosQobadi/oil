import { supabase } from "@/lib/supabase";
import type { Oil } from "./types";

export async function getOils(): Promise<Oil[]> {
  const { data, error } = await supabase.from("oils").select("*");

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
