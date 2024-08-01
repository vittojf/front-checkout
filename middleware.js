import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = req.cookies.get("session");
  const { pathname } = req.nextUrl;

  console.log(`Request Path: ${pathname}`);
  console.log(`Session Cookie: ${session}`);

  if (session === undefined) {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    try {
      await jwtVerify(session, new TextEncoder().encode("test"));
      console.log("aqui esta");

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login"],
};
