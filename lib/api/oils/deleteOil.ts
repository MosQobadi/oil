import { supabase } from "@/lib/supabase";

export async function deleteOil(id: number) {
  const { data, error } = await supabase
    .from("oils")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(error.message);
  }

  return data;
}
