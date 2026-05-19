import { supabase } from "@/lib/supabase";
import type { CarUpdatePayload } from "./types";

export async function updateCar(car: CarUpdatePayload) {
  const { id, ...updates } = car;
  const { data, error } = await supabase
    .from("cars")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error(error.message);
  }

  return data;
}
