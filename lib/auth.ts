import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import logAction from "@/services/auditService";
import { prisma } from "./prisma";

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(1, "Senha é obrigatória"),
  id: z.string().optional(),
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, senha } = loginSchema.parse(credentials);
          const usuario = await prisma.usuario.findFirst({
            where: { email },
          });

          if (!usuario) {
            console.log("Usuário não encontrado.");
            return null;
          }
          if (!usuario.isActive && usuario.tipo !== "ADMINISTRADOR") {
            console.log("Usuário inativo.");
            return null;
          }

          const issenhaValid = await bcrypt.compare(senha, usuario.senha);
          if (!issenhaValid) {
            console.log("Senha inválida.");
            return null;
          }

          await logAction(
            usuario.id,
            "Novo início de sessão",
            `Nome: ${usuario.nome}, tipo: ${usuario.tipo.toLowerCase()}`
          );
       
          return {
            id: usuario.id,
            email: usuario.email,
            // telefone: usuario.telefone,
            // titulo: usuario.profissao,
            name: usuario.nome,
            // dataNascimento: usuario.dataNascimento,
            // site: usuario.site,
            // bio: usuario.bio,
            // categoria: usuario.sector,
            nome: usuario.nome ?? "", // Seu tipo personalizado exige isso      // <-- CORRETO!
            tipo: usuario.tipo.toUpperCase(),
          };
        } catch (error) {
          console.error("Erro na autorização:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tipo = user.tipo;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.tipo = token.tipo;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET, // <- obrigatório!
};
