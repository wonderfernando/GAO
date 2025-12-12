import { z } from "zod";

const clienteSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(2),
    empresa: z.string().min(2),
    sector: z.string().min(2),
    telefone: z.string().min(7),
    telefone2: z.string().min(7).optional(),
    endereco: z.string().min(2),
    email: z.string().email(),
    senha: z.string().min(6),
    nif: z.string().min(10),

})

export default clienteSchema