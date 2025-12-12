import { prisma } from "@/lib/prisma";

export async function GET() {
    const categorias =  await prisma.categoria.findMany({
        orderBy: { nome: "asc" },
    });
    return new Response(JSON.stringify(categorias));
}

export async function POST(request: Request) {
    const body = await request.json();
    const { nome } = body;
    const novaCategoria = await prisma.categoria.create({
        data: {
            nome,
        },
    });
    return new Response(JSON.stringify(novaCategoria));
}