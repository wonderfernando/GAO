import { prisma } from "@/lib/prisma";

async function logAction(usuarioId: string, acao: string, detalhe: string) {
    await prisma.log.create({
        data: {
            usuarioId,
            acao,
            detalhe
        },
    });
}

export default logAction;
//     })
//      },