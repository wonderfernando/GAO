"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var prismaSchemaPath = path.join(process.cwd(), "prisma/schema.prisma");
var prismaSchema = fs.readFileSync(prismaSchemaPath, "utf-8");
var apiBase = path.join(process.cwd(), "app/api");
var schemasBase = path.join(process.cwd(), "prismaSchemas");
var modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\n\}/g;
var fieldRegex = /^\s*(\w+)\s+([\w\[\]]+).*$/gm;
function parseFields(modelBody) {
    var fields = [];
    var match;
    while ((match = fieldRegex.exec(modelBody)) !== null) {
        var name_1 = match[1];
        var type = match[2];
        fields.push({ name: name_1, type: type });
    }
    return fields;
}
function generateFilterCode(fields) {
    var code = "const filters: any = {};\nurl.searchParams.forEach((value, key) => {\n  if (key !== 'page' && key !== 'limit') {\n";
    fields.forEach(function (f) {
        if (f.type.includes("String"))
            code += "  if(key==='".concat(f.name, "') filters['").concat(f.name, "']={contains: value};\n");
        else if (f.type.includes("Boolean") || f.type.includes("enum"))
            code += "  if(key==='".concat(f.name, "') filters['").concat(f.name, "']={equals: value === 'true'};\n");
        else if (f.type.includes("Int") ||
            f.type.includes("Decimal") ||
            f.type.includes("Float"))
            code += "  if(key==='".concat(f.name, "') filters['").concat(f.name, "']={equals: Number(value)};\n");
        else if (f.type.includes("DateTime"))
            code += "  if(key==='".concat(f.name, "') filters['").concat(f.name, "']={gte: new Date(value)};\n");
    });
    code += "  }\n});";
    return code;
}
function generateRoutes(modelName, folder, idFolder, fields) {
    var schemaPath = path.join(schemasBase, "".concat(modelName, ".ts"));
    var schemaExists = fs.existsSync(schemaPath);
    var schemaImport = schemaExists
        ? "import { ".concat(modelName, "Schema, allowedRoles, jsDocComments, subRoutes } from \"@/prismaSchemas/").concat(modelName, "\";")
        : "";
    var routeContent = "import { NextRequest, NextResponse } from \"next/server\";\nimport { prisma } from \"@/lib/prisma\";\nimport { createCRUD } from \"@/lib/crud\";\nimport { authMiddleware } from \"@/lib/authMiddleware\";\n".concat(schemaImport, "\n\nconst crud = createCRUD(prisma.").concat(modelName, ");\n\nexport async function GET(req: NextRequest) {\n  ").concat(schemaExists
        ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
        : "", "\n  const url = new URL(req.url);\n  const page = Number(url.searchParams.get(\"page\") || 1);\n  const limit = Number(url.searchParams.get(\"limit\") || 10);\n  ").concat(generateFilterCode(fields), "\n  return crud.list(req, { filters, page, limit });\n}\n\nexport async function POST(req: NextRequest) {\n  ").concat(schemaExists
        ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
        : "", "\n  ").concat(schemaExists
        ? "const body = await req.json(); const data = ".concat(modelName, "Schema.parse(body); return crud.create({ json: () => data } as NextRequest);")
        : "return crud.create(req);", "\n}\n");
    fs.writeFileSync(path.join(folder, "route.ts"), routeContent, "utf-8");
    var idRouteContent = "import { NextRequest } from \"next/server\";\nimport { prisma } from \"@/lib/prisma\";\nimport { createCRUD } from \"@/lib/crud\";\nimport { authMiddleware } from \"@/lib/authMiddleware\";\n".concat(schemaImport, "\n\nconst crud = createCRUD(prisma.").concat(modelName, ");\n\nexport async function GET(req: NextRequest, { params }: { params: { id: string } }) {\n  ").concat(schemaExists
        ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
        : "", "\n  return crud.get(req, { params });\n}\n\nexport async function PUT(req: NextRequest, { params }: { params: { id: string } }) {\n  ").concat(schemaExists
        ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
        : "", "\n  ").concat(schemaExists
        ? "const body = await req.json(); const data = ".concat(modelName, "Schema.parse(body); return crud.update({ ...req, body: () => data }, { params });")
        : "return crud.update(req, { params });", "\n}\n\nexport async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {\n  ").concat(schemaExists
        ? "const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;"
        : "", "\n  return crud.remove(req, { params });\n}\n");
    fs.writeFileSync(path.join(idFolder, "route.ts"), idRouteContent, "utf-8");
    if (schemaExists) {
        var subs = require(schemaPath).subRoutes;
        if (subs && subs.length > 0) {
            subs.forEach(function (route) {
                var subFolder = path.join(idFolder, route.path);
                fs.mkdirSync(subFolder, { recursive: true });
                var subRouteFile = path.join(subFolder, "route.ts");
                var subContent = "import { NextRequest } from \"next/server\";\nimport { prisma } from \"@/lib/prisma\";\nimport { createCRUD } from \"@/lib/crud\";\nimport { authMiddleware } from \"@/lib/authMiddleware\";\nimport { ".concat(route.schema, " } from \"@/prismaSchemas/").concat(route.model, "\";\n\nconst crud = createCRUD(prisma.").concat(route.model, ");\n\nexport async function GET(req: NextRequest, { params }: { params: { id: string } }) {\n  const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;\n  return crud.list(req, { filters: { ").concat(modelName.toLowerCase(), "Id: params.id } });\n}\n\nexport async function POST(req: NextRequest, { params }: { params: { id: string } }) {\n  const auth = await authMiddleware(allowedRoles)(req); if(auth instanceof NextResponse) return auth;\n  const body = await req.json();\n  const data = ").concat(route.schema, ".parse(body);\n  data.").concat(modelName.toLowerCase(), "Id = params.id;\n  return crud.create({ json: () => data } as NextRequest);\n}\n");
                fs.writeFileSync(subRouteFile, subContent, "utf-8");
                generateRoutes(route.model, subFolder, path.join(subFolder, "[id]"), []);
            });
        }
    }
}
var match;
while ((match = modelRegex.exec(prismaSchema)) !== null) {
    var modelName = match[1];
    var folder = path.join(apiBase, modelName.toLowerCase());
    var idFolder = path.join(folder, "[id]");
    fs.mkdirSync(folder, { recursive: true });
    fs.mkdirSync(idFolder, { recursive: true });
    var fields = parseFields(match[2]);
    generateRoutes(modelName, folder, idFolder, fields);
    console.log("\u2705 CRUD gerado para: ".concat(modelName, " com autentica\u00E7\u00E3o, roles e sub-rotas"));
}
console.log("🚀 Todas as rotas foram geradas com filtros inteligentes, validação Zod e autenticação!");
