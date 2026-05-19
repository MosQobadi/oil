import { apiRequest } from "@/lib/api/http";
import type { Car } from "./types";

export async function getCars(): Promise<Car[]> {
  return apiRequest<Car[]>("/api/cars");
}
