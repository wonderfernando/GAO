"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Profissional {
  id: number;
  nome: string;
  titulo: string;
  foto: string;
  categoria: string;
  conexoesMutuas: string[];
}

const profissionaisMock: Profissional[] = [
  {
    id: 1,
    nome: "Francisco Manuel Damião",
    titulo: "Network Engineer | Master’s Degree",
    foto: "/user1.jpg",
    categoria: "telecom",
    conexoesMutuas: ["Serafina Izata", "5 outros"],
  },
  {
    id: 2,
    nome: "Bernardino Teixeira",
    titulo: "Software Engineer | Building Scalable Apps",
    foto: "/user2.jpg",
    categoria: "software",
    conexoesMutuas: ["Milton", "94 outros"],
  },
  {
    id: 3,
    nome: "Benilson Bernardo João André",
    titulo: "Técnico de Suporte em TI | Analista NOC",
    foto: "/user3.jpg",
    categoria: "telecom",
    conexoesMutuas: ["Elsandro", "7 outros"],
  },
  {
    id: 4,
    nome: "Felipe Rodrigues",
    titulo: "Dev Full Stack Jr. | React.js | Node.js",
    foto: "/user4.jpg",
    categoria: "software",
    conexoesMutuas: ["João", "2 outros"],
  },
];

export default function ProfissionaisPage() {
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);

  useEffect(() => {
    if (categoria) {
      setProfissionais(
        profissionaisMock.filter((p) => p.categoria === categoria)
      );
    }
  }, [categoria]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Profissionais em{" "}
        <span className="text-blue-600">{categoria?.toUpperCase()}</span>
      </h1>

      {profissionais.length === 0 ? (
        <p className="text-gray-500">Nenhum profissional encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {profissionais.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={p.foto}
                  alt={p.nome}
                  width={80}
                  height={80}
                  className="rounded-full mb-3 object-cover"
                />
                <h2 className="font-semibold text-lg">{p.nome}</h2>
                <p className="text-sm text-gray-600">{p.titulo}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {p.conexoesMutuas.join(", ")}
                </p>
                <button className="mt-3 w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700">
                  Conectar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
