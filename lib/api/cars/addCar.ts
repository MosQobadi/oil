import { supabase } from "@/lib/supabase";
import type { CarInsertPayload } from "./types";

export async function addCar(car: CarInsertPayload) {
  const { data, error } = await supabase.from("cars").insert([car]).select();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message);
  }

  return data;
}
