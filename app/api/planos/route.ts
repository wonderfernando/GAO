
// app/api/admin/utilizadores/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"


export async function GET() {
    const utilizadores = await prisma.usuario.findMany({
        where:{
            tipo:"EMPRESA"
        },
        orderBy: { createdAt: "desc" },
    })
    return NextResponse.json( utilizadores )
}