import { apiRequest } from "@/lib/api/http";
import type { Car } from "./types";
import type { CarInsertPayload } from "./types";

export async function addCar(car: CarInsertPayload) {
  return apiRequest<Car[]>("/api/cars", {
    method: "POST",
    body: JSON.stringify(car),
  });
}
