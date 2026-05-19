import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "cars";

export async function uploadImage(file: File, folder: string) {
  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (error) {
    console.error("Supabase storage upload error:", error);
    throw new Error(error.message);
  }

  const publicUrlResponse = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName);

  if (!publicUrlResponse.data?.publicUrl) {
    console.error("Supabase getPublicUrl error:", publicUrlResponse.error);
    throw new Error(
      publicUrlResponse.error?.message ?? "Failed to get public image URL.",
    );
  }

  return publicUrlResponse.data.publicUrl;
}
