// import { NextRequest, NextResponse } from "next/server";

// import { prisma } from "./prisma";
// import { getToken } from "next-auth/jwt";

// export function authMiddleware(allowedRoles: string[] = []) {
//   return async function (req: NextRequest) {
//     try {
//       const token = await getToken({
//         req,
//         secret: process.env.NEXTAUTH_SECRET,
//       });
//       if (!token) {
//         return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
//       }
//       if (allowedRoles.length && !allowedRoles.includes(token.perfil))
//         return NextResponse.json(
//           { error: "Permissão negada" },
//           { status: 403 }
//         );

//       (req as any).user = token;
//       return NextResponse.next();
//     } catch (err) {
//       return NextResponse.json({ error: "Token inválido" }, { status: 401 });
//     }
//   };
// }
