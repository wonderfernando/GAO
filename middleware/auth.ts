import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // Permite chamadas para a API sem autenticação
  if (req.nextUrl.pathname.startsWith("/api/categories")) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/api/admin/categories")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/" && !token) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname === "/" && token) {
    return NextResponse.redirect(new URL("/feed", req.url));
  }

  return withAuth({
    pages: {
      signIn: "/login",
    },
  })(req as NextRequestWithAuth, {} as any);
}
