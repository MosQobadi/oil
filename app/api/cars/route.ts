import { NextResponse } from "next/server";
import {
  createCar,
  deleteCarById,
  listCars,
  updateCarById,
} from "@/lib/services/cars.service";

export async function GET() {
  try {
    const data = await listCars();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch cars.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const carData = await request.json();
    const data = await createCar(carData);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add car." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const carData = await request.json();
    const data = await updateCarById(carData);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update car.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await deleteCarById(id);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete car.",
      },
      { status: 500 },
    );
  }
}
