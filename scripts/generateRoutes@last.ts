import * as fs from "fs";
import * as path from "path";

const prismaSchemaPath = path.join(process.cwd(), "prisma/schema.prisma");
const prismaSchema = fs.readFileSync(prismaSchemaPath, "utf-8");
const apiBase = path.join(process.cwd(), "app/api");
const schemasBase = path.join(process.cwd(), "prismaSchemas");

const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\n\}/g;
const fieldRegex = /^\s*(\w+)\s+([\w\[\]]+).*$/gm;

function parseFields(modelBody: string) {
  const fields: any[] = [];
  let match: RegExpExecArray | null;
  while ((match = fieldRegex.exec(modelBody)) !== null) {
    const name = match[1];
    const type = match[2];
    fields.push({ name, type });
  }
  return fields;
}

function generateFilterCode(fields: any[]) {
  let code =
    "const filters: any = {};\nurl.searchParams.forEach((value, key) => {\n  if (key !== 'page' && key !== 'limit') {\n";
  fields.forEach((f) => {
    if (f.type.includes("String"))
      code += `  if(key==='${f.name}') filters['${f.name}']={contains: value};\n`;
    else if (f.type.includes("Boolean") || f.type.includes("enum"))
      code += `  if(key==='${f.name}') filters['${f.name}']={equals: value === 'true'};\n`;
    else if (
      f.type.includes("Int") ||
      f.type.includes("Decimal") ||
      f.type.includes("Float")
    )
      code += `  if(key==='${f.name}') filters['${f.name}']={equals: Number(value)};\n`;
    else if (f.type.includes("DateTime"))
      code += `  if(key==='${f.name}') filters['${f.name}']={gte: new Date(value)};\n`;
  });
  code += "  }\n});";
  return code;
}

function generateRoutes(
  modelName: string,
  folder: string,
  idFolder: string,
  fields: any[]
) {
  const schemaPath = path.join(schemasBase, `${modelName}.ts`);
  const schemaExists = fs.existsSync(schemaPath);
  const schemaImport = schemaExists
    ? `import { ${modelName}Schema, allowedRoles, jsDocComments, subRoutes } from "@/prismaSchemas/${modelName}";`
    : "";

  const routeContent = `import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/createCRUD";
import { authMiddleware } from "@/lib/authMiddleware";
${schemaImport}

const crud = createCRUD(prisma.${modelName});

export async function GET(req: NextRequest) {
  ${
    schemaExists
      ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
      : ""
  }
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 10);
  ${generateFilterCode(fields)}
  return crud.list(req, { filters, page, limit });
}

export async function POST(req: NextRequest) {
  ${
    schemaExists
      ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
      : ""
  }
  ${
    schemaExists
      ? `const body = await req.json(); const data = ${modelName}Schema.parse(body); return crud.create({ json: () => data } as NextRequest);`
      : "return crud.create(req);"
  }
}
`;

  fs.writeFileSync(path.join(folder, "route.ts"), routeContent, "utf-8");

  const idRouteContent = `import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/crud";
import { authMiddleware } from "@/lib/authMiddleware";
${schemaImport}

const crud = createCRUD(prisma.${modelName});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  ${
    schemaExists
      ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
      : ""
  }
  return crud.get(req, { params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  ${
    schemaExists
      ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
      : ""
  }
  ${
    schemaExists
      ? `const body = await req.json(); const data = ${modelName}Schema.parse(body); return crud.update({ ...req, body: () => data }, { params });`
      : "return crud.update(req, { params });"
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  ${
    schemaExists
      ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
      : ""
  }
  return crud.remove(req, { params });
}
`;

  fs.writeFileSync(path.join(idFolder, "route.ts"), idRouteContent, "utf-8");

  if (schemaExists) {
    const { subRoutes: subs } = require(schemaPath);
    if (subs && subs.length > 0) {
      subs.forEach((route: any) => {
        const subFolder = path.join(idFolder, route.path);
        fs.mkdirSync(subFolder, { recursive: true });
        const subRouteFile = path.join(subFolder, "route.ts");
        const subContent = `import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCRUD } from "@/lib/crud";
import { authMiddleware } from "@/lib/authMiddleware";
import { ${route.schema} } from "@/prismaSchemas/${route.model}";

const crud = createCRUD(prisma.${route.model});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;
  return crud.list(req, { filters: { ${modelName.toLowerCase()}Id: params.id } });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;
  const body = await req.json();
  const data = ${route.schema}.parse(body);
  data.${modelName.toLowerCase()}Id = params.id;
  return crud.create({ json: () => data } as NextRequest);
}
`;
        fs.writeFileSync(subRouteFile, subContent, "utf-8");

        generateRoutes(
          route.model,
          subFolder,
          path.join(subFolder, "[id]"),
          []
        );
      });
    }
  }
}

let match: RegExpExecArray | null;
while ((match = modelRegex.exec(prismaSchema)) !== null) {
  const modelName = match[1];
  const folder = path.join(apiBase, modelName.toLowerCase());
  const idFolder = path.join(folder, "[id]");
  fs.mkdirSync(folder, { recursive: true });
  fs.mkdirSync(idFolder, { recursive: true });

  const fields = parseFields(match[2]);
  generateRoutes(modelName, folder, idFolder, fields);

  console.log(
    `✅ CRUD gerado para: ${modelName} com autenticação, roles e sub-rotas`
  );
}

console.log(
  "🚀 Todas as rotas foram geradas com filtros inteligentes, validação Zod e autenticação!"
);
