import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user, pwd, remember } = await req.json();

  const ok = user === process.env.AUTH_USER && pwd === process.env.AUTH_PASS;

  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });

  const res = NextResponse.json({ ok: true });

  res.cookies.set("auth", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}), // 7 dagar annars session
  });

  return res;
}
