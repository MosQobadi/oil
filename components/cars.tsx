import { getCars } from "@/lib/api/cars/getCars";

export default async function CarPage() {
  const cars = await getCars();

  console.log({ cars });

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
