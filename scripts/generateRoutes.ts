import fs from "fs";
import path from "path";

const prismaSchemaPath = path.join(process.cwd(), "prisma/schema.prisma");
const prismaSchema = fs.readFileSync(prismaSchemaPath, "utf-8");

const apiBase = path.join(process.cwd(), "app/api");
const schemasBase = path.join(process.cwd(), "prismaSchemas");

const modelRegex = /model\s+(\w+)\s+\{[\s\S]*?\n\}/g;
let match: RegExpExecArray | null;

function generateRoute(modelName: string, folder: string, idFolder: string) {
  const schemaPath = path.join(schemasBase, `${modelName}.ts`);
  const schemaExists = fs.existsSync(schemaPath);
  const schemaImport = schemaExists
    ? `import { ${modelName}Schema, subRoutes, jsDocComments } from "@/prismaSchemas/${modelName}";`
    : "";

  // route.ts principal
  const routeContent = `import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/crud";
${schemaImport}

const crud = createCRUD(prisma.${modelName});

export async function GET(req: NextRequest) {
  /** ${schemaExists ? "jsDocComments.GET || ''" : ""} */
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 10);
  const filters: any = {};
  url.searchParams.forEach((value, key) => {
    if (key !== "page" && key !== "limit") filters[key] = value;
  });
  return crud.list(req, { filters, page, limit });
}

export async function POST(req: NextRequest) {
  /** ${schemaExists ? "jsDocComments.POST || ''" : ""} */
  ${
    schemaExists
      ? `const body = await req.json();
  const data = ${modelName}Schema.parse(body);
  return crud.create({ json: () => data } as NextRequest);`
      : `return crud.create(req);`
  }
}
`;

  fs.writeFileSync(path.join(folder, "route.ts"), routeContent, "utf-8");

  // [id]/route.ts
  const idRouteContent = `import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/crud";
${schemaImport ? "" : ""}
const crud = createCRUD(prisma.${modelName});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  /** ${schemaExists ? "jsDocComments.GET || ''" : ""} */
  return crud.get(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  /** ${schemaExists ? "jsDocComments.PUT || ''" : ""} */
  ${
    schemaExists
      ? `const body = await req.json();
  const data = ${modelName}Schema.parse(body);
  return crud.update({ ...req, body: () => data }, { params });`
      : `return crud.update(req, { params });`
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  /** ${schemaExists ? "jsDocComments.DELETE || ''" : ""} */
  return crud.remove(req, { params });
}
`;

  fs.writeFileSync(path.join(idFolder, "route.ts"), idRouteContent, "utf-8");

  // Sub-rotas recursivas
  if (schemaExists) {
    const subRoutesPath = path.join(schemasBase, `${modelName}.ts`);
    const { subRoutes: subs } = require(subRoutesPath);
    if (subs && subs.length > 0) {
      subs.forEach((route: any) => {
        const subFolder = path.join(idFolder, route.path);
        fs.mkdirSync(subFolder, { recursive: true });
        const subRouteFile = path.join(subFolder, "route.ts");
        const subContent = `import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/crud";
import { ${route.schema} } from "@/prismaSchemas/${route.model}";

const crud = createCRUD(prisma.${route.model});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return crud.list(req, { filters: { ${modelName.toLowerCase()}Id: params.id } });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data = ${route.schema}.parse(body);
  data.${modelName.toLowerCase()}Id = params.id;
  return crud.create({ json: () => data } as NextRequest);
}
`;
        fs.writeFileSync(subRouteFile, subContent, "utf-8");
      });
    }
  }
}

// Loop pelos modelos do schema
while ((match = modelRegex.exec(prismaSchema)) !== null) {
  const modelName = match[1];
  const folder = path.join(apiBase, modelName.toLowerCase());
  const idFolder = path.join(folder, "[id]");

  fs.mkdirSync(folder, { recursive: true });
  fs.mkdirSync(idFolder, { recursive: true });

  generateRoute(modelName, folder, idFolder);
  console.log(`✅ CRUD gerado para: ${modelName} com sub-rotas`);
}

console.log("🚀 Todas as rotas e sub-rotas foram geradas com sucesso!");
