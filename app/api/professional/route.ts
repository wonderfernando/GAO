import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"; // se usares next-auth
import { usuario_perfil } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const where = {
    OR: [
      { tipo: usuario_perfil.EMPRESA },
      { tipo: usuario_perfil.PROFISSIONAL },
    ],
    isActive: false,
  };

  const [total, subscricoes] = await Promise.all([
    prisma.usuario.count({ where }),
    prisma.usuario.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({
    data: subscricoes.map(({senha, ...rest}) => rest),
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  });
}
