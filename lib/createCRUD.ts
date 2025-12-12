// lib/crud.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";

export function createCRUD(model: any) {
  return {
    async list(req: NextRequest) {
      const url = req.nextUrl;
      const query = Object.fromEntries(url.searchParams.entries());

      // Paginação
      const page = query.page ? parseInt(query.page) : 1;
      const limit = query.limit ? parseInt(query.limit) : 10;
      const skip = (page - 1) * limit;

      // Remove params de paginação para usar como filtros
      const filters: any = { ...query };
      delete filters.page;
      delete filters.limit;

      const fieldMap: Record<string, string> = {
        isactive: "isActive",
        // adicione outros aliases se precisar
      };

      // Normalização de filtros
      Object.keys(filters).forEach((key) => {
        const realKey = fieldMap[key.toLowerCase()] || key;

        if (filters[key] === "true") filters[realKey] = true;
        else if (filters[key] === "false") filters[realKey] = false;
        else if (!isNaN(Number(filters[key])))
          filters[realKey] = Number(filters[key]);
        else filters[realKey] = filters[key];

        if (realKey !== key) delete filters[key]; // remove a chave errada
      });

      // 🔹 Tratamento especial para o campo "tipo"
      let where: any = { ...filters };

      if (filters.tipo) {
        const tipos = Array.isArray(filters.tipo)
          ? filters.tipo
          : [filters.tipo];

        // const andConditions: any[] = [];
        // const orConditions: any[] = [];

        interface TipoCondition {
          tipo: string;
        }

        const andConditions: TipoCondition[] = [];
        const orConditions: TipoCondition[] = [];

        tipos.forEach((value: string) => {
          if (typeof value === "string" && value.includes("^")) {
            // Exemplo: A^B => AND
            const parts: string[] = value.split("^").map((p) => p.trim());
            parts.forEach((p: string) => andConditions.push({ tipo: p }));
          } else if (typeof value === "string" && value.includes("|")) {
            // Exemplo: A|B => OR
            const parts: string[] = value.split("|").map((p) => p.trim());
            orConditions.push(...parts.map((p: string) => ({ tipo: p })));
          } else {
            orConditions.push({ tipo: value });
          }
        });

        delete where.tipo; // remove campo simples

        if (andConditions.length > 0) {
          where.AND = andConditions;
        }
        if (orConditions.length > 0) {
          where.OR = orConditions;
        }
      }

      const [data, total] = await Promise.all([
        model.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        model.count({ where }),
      ]);

      return NextResponse.json({
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    },

    async get(req: NextRequest, { params }: { params: { id: string } }) {
      const item = await model.findUnique({ where: { id: params.id } });
      if (!item)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(item);
    },

    async create(req: NextRequest) {
      const body = await req.json();
      const created = await model.create({ data: body });
      return NextResponse.json(created, { status: 201 });
    },

    async update(req: NextRequest, { params }: { params: { id: string } }) {
      const body = await req.json();
      const updated = await model.update({
        where: { id: params.id },
        data: body,
      });
      return NextResponse.json(updated);
    },

    async remove(req: NextRequest, { params }: { params: { id: string } }) {
      await model.delete({ where: { id: params.id } });
      return NextResponse.json({ message: "Deleted successfully" });
    },
  };
}
