import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extendendo a sessão e o user do NextAuth
declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      id: string; // ⚠️ id deve ser string
      nome: string;
      email: string;
      tipo: string;
      empresaId?: string | null;
      isActive: boolean;
      telefone?: string | null;
      exp?: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; //
    nome: string;
    tipo: string;
    email: string;

    telefone?: string | null;
    exp?: number;
  }
}

// Extendendo o JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nome: string;
    email: string;
    perfil: string;
    empresaId?: string | null;
    isActive: boolean;
    isOwner: boolean;
    telefone?: string | null;
    exp?: number;
    apiToken?: string;
  }
}
