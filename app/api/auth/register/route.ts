import { NextResponse } from "next/server";
import {
  authCookieName,
  createSessionToken,
  getAuthCookieOptions,
  getSessionExpiry,
  hashPassword,
  hashSessionToken,
  isValidPassword,
  normalizeEmail,
  toAuthUser,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function getAdminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => normalizeEmail(email))
      .filter(Boolean),
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeEmail(String(body.email ?? ""));
    const password = String(body.password ?? "");
    const name = String(body.name ?? "").trim() || null;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const existingUserCount = await prisma.user.count();
    const isFirstUser = existingUserCount === 0;
    const role = isFirstUser || getAdminEmails().has(email) ? "ADMIN" : "USER";
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: await hashPassword(password),
        role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

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
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "An account with this email already exists."
        : error instanceof Error
          ? error.message
          : "Registration failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
