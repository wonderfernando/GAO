"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function fetchProfessional(id: string) {
  // Simule uma chamada de API real
  return {
    id,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "+244 912 345 678",
    status: "pending",
    bio: "Profissional experiente em engenharia civil.",
    documents: [
      {
        name: "Currículo.pdf",
        url: "/files/curriculo.pdf",
      },
      {
        name: "Certificado.pdf",
        url: "/files/certificado.pdf",
      },
    ],
    avatar: "/images/avatar.png",
    createdAt: "2024-06-01",
  };
}

type Professional = Awaited<ReturnType<typeof fetchProfessional>>;

interface Props {
  params: { id: string };
}

export default function ProfessionalProfilePage({ params }: Props) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProfessional(params.id)
      .then(setProfessional)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div>Carregando...</div>;
  if (!professional) return <div>Profissional não encontrado.</div>;

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implemente a lógica de aprovação aqui (ex: chamada de API)
    setProfessional({ ...professional, status: "approved" });
  };

  return (
    <main className="max-w-full mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={professional.avatar}
          alt={professional.name}
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">{professional.name}</h1>
          <p className="text-gray-600">{professional.email}</p>
          <p className="text-gray-600">{professional.phone}</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded text-xs ${
              professional.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : professional.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {professional.status === "pending"
              ? "Pendente"
              : professional.status === "approved"
              ? "Aprovado"
              : "Rejeitado"}
          </span>
        </div>
      </div>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Sobre</h2>
        <p className="text-gray-700">{professional.bio}</p>
        <p className="text-gray-400 text-xs mt-2">
          Perfil criado em:{" "}
          {new Date(professional.createdAt).toLocaleDateString()}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Documentos</h2>
        <ul className="space-y-2">
          {professional.documents.map((doc) => (
            <li key={doc.name}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {doc.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {professional.status === "pending" && (
        <form onSubmit={handleApprove}>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Aprovar Perfil
          </button>
        </form>
      )}
    </main>
  );
}
