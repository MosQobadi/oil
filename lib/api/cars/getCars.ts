import { supabase } from "../../supabase";

export async function getCars() {
  const { data, error } = await supabase.from("cars").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
