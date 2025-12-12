import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth"; // se usares next-auth

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // pega usuário autenticado (aqui suponho next-auth)
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const user = await prisma.usuario.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Atualiza tabela usuario
    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        nome: body.nome,
        telefone: body.telefone,
        endereco: body.endereco,
        profissao: body.profissao,
        experiencia: body.experiencia,
        bio: body.bio,
      },
    });

    // Atualiza tabela CV (se já existir, senão cria)
    await prisma.cv.upsert({
      where: { usuarioId: user.id },
      update: {
        titulo: body.profissao,
        bio: body.bio,
        especialidade: body.profissao,
        habilidades: body.habilidades,
        taxaPorHora: body.taxaPorHora,
      },
      create: {
        usuarioId: user.id,
        titulo: body.profissao,
        especialidade: body.profissao,
        habilidades: body.habilidades,
        taxaPorHora: body.taxaPorHora,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erro update:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
