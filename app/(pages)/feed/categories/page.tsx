"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Zap, Brush, Laptop, Wrench } from "lucide-react";
import Link from "next/link";

type Categoria = {
  id: number;
  nome: string;
  icone: React.ReactNode;
  servicos: string[];
};

const categorias: Categoria[] = [
  {
    id: 1,
    nome: "Tecnologia",
    icone: <Laptop className="w-8 h-8 text-blue-600" />,
    servicos: ["Programação", "Design UI/UX", "Marketing Digital"],
  },
  {
    id: 2,
    nome: "Construção",
    icone: <Wrench className="w-8 h-8 text-yellow-600" />,
    servicos: ["Pedreiro", "Carpinteiro", "Canalizador"],
  },
  {
    id: 3,
    nome: "Eletricidade",
    icone: <Zap className="w-8 h-8 text-orange-600" />,
    servicos: ["Instalações", "Manutenção", "Reparações"],
  },
  {
    id: 4,
    nome: "Design & Arte",
    icone: <Brush className="w-8 h-8 text-pink-600" />,
    servicos: ["Designer Gráfico", "Fotografia", "Edição de Vídeo"],
  },
  {
    id: 5,
    nome: "Serviços Gerais",
    icone: <Briefcase className="w-8 h-8 text-green-600" />,
    servicos: ["Consultoria", "Administração", "Contabilidade"],
  },
];

const CategoriasList = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Categorias de Serviços</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((cat) => (
          <Link
            href={"/dashboard/professional-categories?categoria=" + cat.nome}
            key={cat.id}
          >
            <Card
              key={cat.id + cat.nome}
              className="rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <CardContent className="p-5 space-y-4">
                {/* Cabeçalho */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {cat.icone}
                  </div>
                  <h2 className="text-lg font-semibold">{cat.nome}</h2>
                </div>

                {/* Lista de serviços */}
                <div className="flex flex-wrap gap-2">
                  {cat.servicos.map((srv, i) => (
                    <Badge key={i} variant="secondary">
                      {srv}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriasList;
