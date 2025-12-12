import logAction from "@/services/auditService";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simulated database update function
async function toggleUserActiveStatus(
  userId: string
): Promise<{ success: boolean; active: boolean }> {
  // Verifica se o usuário existe
  const user = await prisma.usuario.findUnique({
    where: { id: userId },
    select: { isActive: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Alterna o status
  const newStatus = !user.isActive;

  await prisma.usuario.update({
    where: { id: userId },
    data: { isActive: newStatus },
  });

  return { success: true, active: newStatus };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      { message: "ID do usuário não fornecido." },
      { status: 400 }
    );
  }

  try {
    const result = await toggleUserActiveStatus(userId);

    // Mensagem detalhada
    const message = result.active
      ? "Usuário ativado com sucesso."
      : "Usuário desativado com sucesso.";

    await logAction(
      userId,
      result.active ? "Usuário ativado" : "Usuário desativado",
      `O status do usuário foi alterado para ${
        result.active ? "ativo" : "inativo"
      }.`
    );

    return NextResponse.json(
      {
        message,
        userId,
        active: result.active,
        success: result.success,
      },
      { status: 200 }
    );
  } catch (error: any) {
    await logAction(
      userId,
      "Erro ao alternar status do usuário",
      `Erro: ${error.message}`
    );
    console.error(`[TOGGLE USER ERROR] ID: ${userId} | Erro: ${error.message}`);
    return NextResponse.json(
      { message: "Erro ao alternar status do usuário.", error: error.message },
      { status: 500 }
    );
  }
}
