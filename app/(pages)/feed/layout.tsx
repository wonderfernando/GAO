"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaHamburger, FaUser } from "react-icons/fa";
 
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { MenuGroup, Role } from "./menuItems";
import { getMenuForRole } from "@/lib/getMenuForRole";
import Header from "./components/Header";

const filtrosSchema = z.object({
  categoria: z.string().optional(),
  titulo: z.string().optional(),
  nome: z.string().optional(),
});

type FiltrosForm = z.infer<typeof filtrosSchema>;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FiltrosForm>({
    resolver: zodResolver(filtrosSchema),
    defaultValues: {
      categoria: "",
      titulo: "",
      nome: "",
    },
  });

  if (status === "loading") return <div>Carregando...</div>;

  const user = session?.user;
  const tipo = session?.user?.tipo as Role | undefined;
  const menuItems: MenuGroup[] = tipo ? getMenuForRole(tipo) : [];

  // aplicar filtros
  const aplicarFiltros = (data: FiltrosForm) => {
    const { categoria, titulo, nome } = data;

    // Se todos os campos estiverem vazios → mostra tudo
    if (!categoria && !titulo && !nome) {
      router.replace("/feed");
      return;
    }

    const params = new URLSearchParams();
    if (categoria) params.set("categoria", categoria);
    if (titulo) params.set("titulo", titulo);
    if (nome) params.set("nome", nome);

    router.replace(`/feed?${params.toString()}`);
  };

  const limparFiltros = () => {
    // reseta os campos primeiro

    window.location.replace("/feed");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white/50">
      {/* 🔹 Topbar estilo LinkedIn */}
      <Header profile={user?.tipo} username={user?.nome}></Header>

      {/* 🔹 Corpo com grid */}
      <div className="flex-1 max-w-7xl mx-auto mt-6 px-2 grid grid-cols-12 gap-4">
        {/* Sidebar esquerda */}
        <aside className="hidden lg:block col-span-2 space-y-4 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* tipo resumido */}
          <div className="bg-white p-4 rounded-lg ">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                <FaUser size={28} />
              </div>
              <h2 className=" font-semibold text-sm text-center align-center  w-full">
                {user?.nome}
                <span className="text-gray-500 font-italic font-light">
                  {/* ({user?.title}) */}
                </span>
              </h2>

              <p className="text-sm text-gray-500">tipo resumido</p>
              <hr className="w-full m-3"></hr>
              <div>
                <p className="text-xs text-gray-500">
                  {" "}
                  {"->"} {user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  {" "}
                  {"->"} {user?.tipo}
                </p>
                <p className="text-xs text-gray-500"> - {"->"}</p>
              </div>
            </div>
          </div>

          {/* Atalhos */}
          <div className="bg-white p-4 rounded-lg text-sm text-gray-600 ">
            <p className="font-bold">Meus Atalhos</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/me">tipo</Link>
              </li>
              <li>
                <Link href="/feed/messages">Mensagens</Link>
              </li>
            </ul>
          </div>

          {/* 🔹 Filtros */}
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-sm">Filtros</h3>
            <form onSubmit={handleSubmit(aplicarFiltros)} className="space-y-3">
              {/* Categoria com autocomplete */}
              <div>
                <input
                  type="text"
                  placeholder="Categoria"
                  list="categorias"
                  {...register("categoria")}
                  className="w-full px-3 py-1 rounded bg-gray-100 text-sm focus:outline-none"
                />
                <datalist id="categorias">
                  <option value="Financeiro" />
                  <option value="RH" />
                  <option value="Tecnologia" />
                  <option value="Marketing" />
                  {/* pode ser renderizado dinamicamente com map de categorias vindas da API */}
                </datalist>
              </div>

              {/* Título com autocomplete */}
              <div>
                <input
                  type="text"
                  placeholder="Título"
                  list="titulos"
                  {...register("titulo")}
                  className="w-full px-3 py-1 rounded bg-gray-100 text-sm focus:outline-none"
                />
                <datalist id="titulos">
                  <option value="Relatório Mensal" />
                  <option value="Fatura de Serviço" />
                  <option value="Resumo Anual" />
                  <option value="Contrato" />
                  {/* idem: pode vir de API */}
                </datalist>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  {...register("nome")}
                  className="w-full px-3 py-1 rounded bg-gray-100 text-sm focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-3 py-1 bg-yellow-300 text-gray-700 rounded text-sm hover:bg-yellow-400"
                >
                  Filtrar
                </button>
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>
        </aside>

        {/* Feed central */}
        <main className="col-span-12 lg:col-span-8">{children}</main>

        {/* Sidebar direita */}
        <aside className="hidden lg:block col-span-2 space-y-4 sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="bg-white p-4 rounded-lg ">
            <h3 className="font-semibold text-sm mb-2">Sugestões</h3>
            <p className="text-xs text-gray-500">profissionais recomendados</p>
          </div>
          <div className="bg-white p-4 rounded-lg ">
            <h3 className="font-semibold text-sm mb-2">Publicidade</h3>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </aside>
      </div>

      {/* 🔹 Footer */}
      <footer className="py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Business Wave
      </footer>
    </div>
  );
};

const NavLink = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <Link href={href} className="flex flex-col items-center hover:text-black">
    {icon}
    <span className="text-xs">{label}</span>
  </Link>
);

export default Layout;
