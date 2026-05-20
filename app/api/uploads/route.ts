import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isCurrentUserAdmin } from "@/lib/auth";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const maxSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!(await isCurrentUserAdmin())) {
      return NextResponse.json(
        { error: "Admin access is required." },
        { status: 403 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folderValue = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required." },
        { status: 400 },
      );
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported image type." },
        { status: 400 },
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Image must be 5MB or smaller." },
        { status: 400 },
      );
    }

    const folder =
      typeof folderValue === "string"
        ? folderValue.replace(/[^a-z0-9-_]/gi, "-").toLowerCase()
        : "uploads";
    const extension = path.extname(file.name).toLowerCase() || ".jpg";
    const fileName = `${randomUUID()}${extension}`;
    const relativePath = path.posix.join("uploads", folder, fileName);
    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(
      path.join(uploadDir, fileName),
      Buffer.from(await file.arrayBuffer()),
    );

    return NextResponse.json({ data: { url: `/${relativePath}` } });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to upload image.",
      },
      { status: 500 },
    );
  }
}
