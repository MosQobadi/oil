import { supabase } from "@/lib/supabase";
import type { Car } from "./types";

export async function getCars(): Promise<Car[]> {
  const { data, error } = await supabase.from("cars").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
