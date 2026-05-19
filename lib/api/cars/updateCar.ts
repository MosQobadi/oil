import { apiRequest } from "@/lib/api/http";
import type { Car } from "./types";
import type { CarUpdatePayload } from "./types";

export async function updateCar(car: CarUpdatePayload) {
  return apiRequest<Car[]>("/api/cars", {
    method: "PATCH",
    body: JSON.stringify(car),
  });
}
