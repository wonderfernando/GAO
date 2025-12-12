// components/CardPlano.tsx
import React from "react";
import { Button } from "./button";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";

type CardPlanoProps = {
  nome: string;
  preco: string;
  recursos: string[];
  destaque?: boolean;
};

export default function CardPlano({
  nome,
  preco,
  recursos,
  destaque = false,
}: CardPlanoProps) {
  return (
    <div
      className={`rounded-2xl shadow-lg p-8 border border-white/20 backdrop-blur-md transition transform hover:scale-105 ${
        destaque
          ? "bg-yellow-400 text-blue-900 shadow-2xl"
          : "bg-white bg-opacity-10 text-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">{nome}</h2>
      <p className="text-xl font-semibold mb-4">{preco}</p>
      <ul className="mb-6 space-y-2 text-sm">
        {recursos.map((r, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <FaCheck className="text-green-300" />
            {r}
          </li>
        ))}
      </ul>
      <Link href={`/subscricao/${nome}`}>
        <Button
          className={`w-full font-semibold ${
            destaque
              ? "bg-blue-900 text-yellow-400 hover:bg-blue-800"
              : "bg-yellow-400 text-blue-900 hover:bg-yellow-500"
          }`}
          size="lg"
        >
          Aderir agora
        </Button>
      </Link>
    </div>
  );
}
