import { getCars } from "@/lib/api/cars/getCars";
import { CarFinderClient } from "./car-finder-client";

export async function CarFinderSection() {
  const cars = await getCars();

  return <CarFinderClient cars={cars} />;
}
