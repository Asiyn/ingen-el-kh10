import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!login|api/login|_next|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function proxy(req: NextRequest) {
  const authed = req.cookies.get("auth")?.value === "1";
  if (authed) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", req.url));
}
