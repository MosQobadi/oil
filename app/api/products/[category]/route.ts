import { NextResponse } from "next/server";
import { parseProductCategory } from "@/lib/api/product-category";
import {
  createProduct,
  deleteProductById,
  listProducts,
  updateProductById,
} from "@/lib/services/products.service";

type RouteContext = {
  params: Promise<{ category: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { category } = await context.params;
    const data = await listProducts(category);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch products.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { category: categoryValue } = await context.params;
    const category = parseProductCategory(categoryValue);
    const productData = await request.json();
    const data = await createProduct(category, productData);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add product.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const productData = await request.json();
    const data = await updateProductById(productData);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update product.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await deleteProductById(id);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to delete product.",
      },
      { status: 500 },
    );
  }
}
