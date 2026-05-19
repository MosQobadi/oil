import { NextResponse } from "next/server";
import { addCar } from "@/lib/api/cars/addCar";
import { deleteCar } from "@/lib/api/cars/deleteCar";
import { getCars } from "@/lib/api/cars/getCars";
import { updateCar } from "@/lib/api/cars/updateCar";

export async function GET() {
  try {
    const data = await getCars();
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
    const data = await addCar(carData);

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
    const data = await updateCar(carData);

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
    const data = await deleteCar(id);

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
