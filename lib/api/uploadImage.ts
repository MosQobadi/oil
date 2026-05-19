import { apiRequest } from "./http";

export async function uploadImage(file: File, folder: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const data = await apiRequest<{ url: string }>("/api/uploads", {
    method: "POST",
    body: formData,
  });

  return data.url;
}
