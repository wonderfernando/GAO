import { z } from "zod";

export const usuarioSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
  nome: z.string(),
  tipo: z
    .enum(["PROFISSIONAL", "EMPRESA", "ADMINISTRADOR"])
    .transform((val) => val.toUpperCase()),
  isActive: z.boolean().optional().default(true),
});

export const allowedRoles = ["ADMINISTRADOR", "EMPRESA"]; // Apenas admins podem manipular usuários

export const jsDocComments = {
  GET: "Retorna usuários (apenas admins).",
  POST: "Cria usuário (apenas admins).",
  PUT: "Atualiza usuário pelo ID.",
  DELETE: "Remove usuário pelo ID.",
};
