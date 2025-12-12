import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/createCRUD";

const crud = createCRUD(prisma.usuario);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return crud.get(req, { params });
}

export async function POST(req: NextRequest) {
  return crud.create(req);
}
