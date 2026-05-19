import "server-only";

import { prisma } from "@/lib/prisma";
import { carInputSchema, carUpdateSchema } from "@/lib/validators/car.schema";

function serializeCar<T extends { description: string | null; engine: string | null }>(
  car: T,
) {
  return {
    ...car,
    engine: car.engine ?? "",
    description: car.description ?? "",
  };
}

export async function listCars() {
  const cars = await prisma.car.findMany({
    include: {
      recommendations: {
        include: { product: true },
        orderBy: [{ type: "asc" }, { priority: "asc" }],
      },
    },
    orderBy: [{ brand: "asc" }, { model: "asc" }, { year: "desc" }],
  });

  return cars.map(serializeCar);
}

export async function createCar(input: unknown) {
  const data = carInputSchema.parse(input);
  const car = await prisma.car.create({ data });

  return [serializeCar(car)];
}

export async function updateCarById(input: unknown) {
  const { id, ...data } = carUpdateSchema.parse(input);
  const car = await prisma.car.update({
    where: { id },
    data,
  });

  return [serializeCar(car)];
}

export async function deleteCarById(id: unknown) {
  const carId = carUpdateSchema.shape.id.parse(id);
  const car = await prisma.car.delete({ where: { id: carId } });

  return [serializeCar(car)];
}
