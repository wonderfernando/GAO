"use client";

import { FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/header";

export default function UnauthorizedPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white flex items-center min-h-screen pt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center bg-white bg-opacity-10 rounded-xl shadow-lg p-10">
              <FaLock className="text-6xl text-yellow-300 mx-auto mb-4" />
              <h1 className="text-4xl font-extrabold mb-2">Acesso negado</h1>
              <p className="mb-6 text-lg text-red-100">
                Você não tem permissão para visualizar esta página. wq
              </p>
              <Link href="/">
                <Button className="bg-yellow-400 text-red-900 hover:bg-yellow-500 font-semibold shadow-md">
                  Voltar para a Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
