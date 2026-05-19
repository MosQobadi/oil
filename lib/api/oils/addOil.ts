import { supabase } from "@/lib/supabase";
import type { OilInsertPayload } from "./types";

export async function addOil(oil: OilInsertPayload) {
  const { data, error } = await supabase.from("oils").insert([oil]).select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
