"use client";

import { useCars } from "@/lib/api/cars/queries";

export default function CarPage() {
  const { data: cars = [], isLoading, isError } = useCars();

  if (isLoading) {
    return <div>Loading cars...</div>;
  }

  if (isError) {
    return <div className="text-destructive">Failed to load cars.</div>;
  }

  return (
    <div>
      {cars.map((car) => (
        <div key={car.id}>
          {car.brand} {car.model}
        </div>
      ))}
    </div>
  );
}
