import { NextResponse } from "next/server";
import {
  authCookieName,
  createSessionToken,
  getAuthCookieOptions,
  getSessionExpiry,
  hashSessionToken,
  normalizeEmail,
  toAuthUser,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email ?? ""));
    const password = String(body.password ?? "");

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = createSessionToken();
    const expiresAt = getSessionExpiry();

    await prisma.session.create({
      data: {
        tokenHash: await hashSessionToken(token),
        userId: user.id,
        expiresAt,
      },
    });

    const response = NextResponse.json({ data: { user: toAuthUser(user) } });
    response.cookies.set(authCookieName, token, getAuthCookieOptions(expiresAt));

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed." },
      { status: 400 },
    );
  }
}
