import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  authCookieName,
  getDeleteAuthCookieOptions,
  hashSessionToken,
} from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(authCookieName)?.value;

  if (token) {
    await prisma.session
      .delete({ where: { tokenHash: await hashSessionToken(token) } })
      .catch(() => null);
  }

  const response = NextResponse.json({ data: { ok: true } });
  response.cookies.set(authCookieName, "", getDeleteAuthCookieOptions());

  return response;
}
