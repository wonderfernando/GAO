import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Se não tiver token em rotas protegidas → login
  if (
    (req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/profissional")) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se tiver token, checa perfil
  const isAdmin =
    (token?.tipo || "").toString().toUpperCase() === "ADMINISTRADOR";
console.log("MIDDLEWARE - TOKEN:", token, " - isAdmin:", isAdmin);


  // Já logado, tentando acessar /login → redireciona conforme perfil
  if (req.nextUrl.pathname === "/login" && token) {
    const url = req.nextUrl.clone();
    url.pathname = isAdmin ? "/admin/dashboard" : "/profissional";
    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/register") && token) {
    const url = req.nextUrl.clone();
    url.pathname = isAdmin ? "/admin/dashboard" : "/profissional";
    return NextResponse.redirect(url);
  }

  // const publicRoutes = ["/login", "/register"];

  // if (token && publicRoutes.includes(req.nextUrl.pathname)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = isAdmin ? "/admin/dashboard" : "/feed";
  //   return NextResponse.redirect(url);
  // }
 
  if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/profissional", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !isAdmin) {
    if ((token?.tipo || "").toString().toUpperCase() === "PROFISSIONAL") {
      return NextResponse.redirect(new URL("/profissional", req.url));
    }
    return NextResponse.redirect(new URL("/empresa", req.url));
  }

  // Se for admin e tentar acessar /dashboard comum → manda pro admin dashboard
  if (req.nextUrl.pathname.startsWith("/dashboard") && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  //acessos somente para o profissional
/*   const pathAcessedNow = req.nextUrl.pathname;
  const pathRestrictForProfisional = ["/profissional/me", "/profissional"];
  console.log("PATH:", pathAcessedNow, " - Token perfilmm:", token?.tipo);
  if (
    pathRestrictForProfisional.includes(pathAcessedNow) &&
    token?.perfil?.toUpperCase() !== "PROFISSIONAL"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/profissional/:path*", "/login"],
};
