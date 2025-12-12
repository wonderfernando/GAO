import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/createCRUD";

const crud = createCRUD(prisma.usuario);

export async function GET(req: NextRequest) {
  return crud.list(req);
}

export async function POST(req: NextRequest) {
  return crud.create(req);
}
