import { NextResponse } from "next/server";
‎
‎export function middleware(request) {
‎  const session = request.cookies.get("elite_session_token");
‎  const isCheckoutPage = request.nextUrl.pathname.startsWith("/checkout");
‎
‎  if (isCheckoutPage && !session) {
‎    const loginUrl = new URL("/login", request.url);
‎    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
‎    return NextResponse.redirect(loginUrl);
‎  }
‎
‎  return NextResponse.next();
‎}
‎
‎export const config = {
‎  matcher: ["/checkout/:path*"],
‎};
