import { apiRequest } from "@/lib/api/http";
import type { Car } from "./types";

export async function deleteCar(id: number) {
  return apiRequest<Car[]>("/api/cars", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
