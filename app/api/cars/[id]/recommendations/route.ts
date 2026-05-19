import { NextResponse } from "next/server";
import { replaceCarRecommendations } from "@/lib/services/recommendations.service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const data = await replaceCarRecommendations(
      Number(id),
      await request.json(),
    );

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update recommendations.",
      },
      { status: 500 },
    );
  }
}
