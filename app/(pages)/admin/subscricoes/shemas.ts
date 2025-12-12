import { z } from "zod";

export const updateSchema = z.discriminatedUnion("tipo", [
  // EMPRESA
  z.object({
    id: z.string().uuid().optional(),
    tipo: z.literal("EMPRESA"),

    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),

    nome: z.string().min(1, "Nome é obrigatório"),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    dataNascimento: z.coerce.date().optional(),

    fotoPerfilId: z.string().uuid().optional(),
    fotoCapaId: z.string().uuid().optional(),

    // EMPRESA
    nif: z.string().min(6, "NIF obrigatório").optional(),
    sector: z.string().min(2, "Sector obrigatório"),
    site: z.string().url("Site inválido").optional(),
    logoId: z.string().uuid().optional(),
    descricao: z.string().optional(),

    // PROFISSIONAL omitido
    profissao: z.string().optional(),
    experiencia: z.string().optional(),
    bio: z.string().optional(),
    anexosIds: z.string().optional(),

    isActive: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),

  // PROFISSIONAL
  z.object({
    id: z.string().uuid().optional(),
    tipo: z.literal("PROFISSIONAL"),

    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),

    nome: z.string().min(1, "Nome é obrigatório"),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
    dataNascimento: z.coerce.date().optional(),

    fotoPerfilId: z.string().uuid().optional(),
    fotoCapaId: z.string().uuid().optional(),

    // EMPRESA omitido
    nif: z.string().optional(),
    sector: z.string().optional(),
    site: z.string().optional(),
    logoId: z.string().optional(),
    descricao: z.string().optional(),

    // PROFISSIONAL
    profissao: z.string().min(2, "Profissão obrigatória"),
    experiencia: z.string().min(2, "Experiência obrigatória"),
    bio: z.string().optional(),
    anexosIds: z.string().optional(),

    isActive: z.boolean().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
]);

export type UsuarioForm = z.infer<typeof updateSchema>;
