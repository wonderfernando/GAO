import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // ou ajuste conforme seu projeto

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      senha,
      nome,
      nif,
      sector,
      tipo,
      profissao,
      experiencia,
      bio,
    } = body;

    // Verifica se o email já está em uso
    const existingusuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingusuario) {
      return NextResponse.json(
        { error: "Email já está cadastrado" },
        { status: 400 }
      );
    }

    const hashedsenha = await hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        email,
        senha: hashedsenha,
        nome,
        sector,
        nif,
        tipo,
        profissao,
        experiencia,
        bio,
        isActive:true,
      },
    });

    return NextResponse.json({
      usuario: {
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}