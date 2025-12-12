"use client";

import { FaRocket } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import "./(pages)/globals.css";
export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r pt-12 from-blue-600 to-blue-800 text-white flex items-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white bg-opacity-10 rounded-xl shadow-lg p-10">
            <h1 className="text-7xl font-extrabold mb-4 text-yellow-300 drop-shadow-lg">
              404
            </h1>
            <h2 className="text-3xl font-bold mb-2">Página não encontrada</h2>
            <p className="mb-8 text-lg text-blue-100">
              Desculpe, não conseguimos encontrar a página que você procura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-semibold shadow-md"
                onClick={() => window.history.back()}
              >
                <FaRocket className="mr-2" />
                Voltar para a página anterior
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
