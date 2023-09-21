import { NextResponse } from "next/server";

export function middleware(request) {
  const authTokens = request.cookies.get("authTokens")?.value;
  if (request.nextUrl.pathname.startsWith("/admin/dashboard") && !authTokens) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("authTokens");
    return response;
  }
  if (authTokens && request.nextUrl.pathname.startsWith("/auth/login")) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
    return response;
  }
}

export const config = {
  matcher: ["/admin(.*)", "/auth/login"],
};