"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import profissionaisData from "./profissionais_mock.json";
import AssinaturaGuard from "@/app/guard/AssinalturaGuard";

type Feedback = {
  usuario: string;
  comentario: string;
  rating: number;
};

type Profissional = {
  id: number;
  nome: string;
  titulo: string;
  foto: string;
  categoria: string;
  habilidades?: string[];
  feedbacks: Feedback[];
  contactos?: {
    email: string;
    telefone: string;
    linkedin?: string;
    website?: string;
  };
};

export default function ProfissionalPage() {
  const { id } = useParams();
  const [profissional, setProfissional] = useState<Profissional | null>(null);

  // Estados do novo feedback
  const [novoComentario, setNovoComentario] = useState("");
  const [novoRating, setNovoRating] = useState(0);

  useEffect(() => {
    if (id) {
      const found = (profissionaisData as Profissional[]).find(
        (p) => p.id === Number(id)
      );
      setProfissional(found || null);
    }
  }, [id]);

  if (!profissional) {
    return (
      <div className="p-10 text-center text-gray-600">
        Profissional não encontrado
      </div>
    );
  }

  // Submeter avaliação
  const adicionarFeedback = () => {
    if (!novoComentario || novoRating === 0) return;

    const novoFb: Feedback = {
      usuario: "Você", // poderia vir do usuário logado
      comentario: novoComentario,
      rating: novoRating,
    };

    setProfissional({
      ...profissional,
      feedbacks: [...profissional.feedbacks, novoFb],
    });

    // reset
    setNovoComentario("");
    setNovoRating(0);
  };
  const usuarioTemPlano = false;
  return (
    <AssinaturaGuard hasPlano={true}>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="p-4 bg-white font-small mb-3 border-t border-blue-800 rounded-t">
          Detalhes de perfil do profissional
        </h1>{" "}
        <Card className="shadow-sm rounded-2xl overflow-hidden border-none">
          <CardContent className="p-8 flex flex-col md:flex-row gap-8">
            {/* Foto + ação */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <Image
                src={profissional.foto}
                alt={profissional.nome}
                width={180}
                height={180}
                className="rounded-full object-cover shadow-lg ring-4 ring-indigo-100"
              />
              <Link href={"/feed/messages/" + profissional.id}>
                <Button className="mt-6 w-full rounded-full px-6 bg-yellow-400 text-blue-900 hover:bg-yellow-400/80 hover:shadow-sm">
                  Pedir orçamento
                </Button>
              </Link>
            </div>

            {/* Infos principais */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {profissional.nome}
              </h1>
              <p className="text-lg text-gray-600">{profissional.titulo}</p>
              <p className="mt-1 text-sm text-indigo-600 font-medium">
                Categoria: {profissional.categoria}
              </p>

              {/* Bio fake */}
              <p className="mt-6 text-gray-700 leading-relaxed">
                Profissional com ampla experiência em {profissional.categoria},
                apaixonado por inovação e colaboração. Atua em projetos de
                impacto e gosta de compartilhar conhecimento com a comunidade.
              </p>

              {/* Contactos */}
              {profissional.contactos && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Contactos
                  </h2>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      <strong>Email:</strong> {profissional.contactos.email}
                    </li>
                    <li>
                      <strong>Telefone:</strong>{" "}
                      {profissional.contactos.telefone}
                    </li>
                    {profissional.contactos.linkedin && (
                      <li>
                        <strong>LinkedIn:</strong>{" "}
                        <a
                          href={profissional.contactos.linkedin}
                          target="_blank"
                          className="text-indigo-600 hover:underline"
                        >
                          Perfil
                        </a>
                      </li>
                    )}
                    {profissional.contactos.website && (
                      <li>
                        <strong>Website:</strong>{" "}
                        <a
                          href={profissional.contactos.website}
                          target="_blank"
                          className="text-indigo-600 hover:underline"
                        >
                          {profissional.contactos.website}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Habilidades */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profissional.habilidades?.map((skill, idx) => (
                    <Badge
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-full px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Avaliações */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Avaliações de Clientes
                </h2>
                <div className="space-y-4">
                  {profissional.feedbacks.map((fb, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-gray-100 rounded-xl shadow-sm bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {fb.usuario}
                        </span>
                        <div className="flex items-center text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < fb.rating
                                  ? "fill-yellow-400"
                                  : "fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {fb.comentario}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Formulário de nova avaliação */}
                <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Deixe a sua avaliação
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        onClick={() => setNovoRating(i + 1)}
                        className={`w-6 h-6 cursor-pointer ${
                          i < novoRating
                            ? "text-yellow-500 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                  <textarea
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    placeholder="Escreva seu feedback..."
                    className="w-full border rounded-lg p-2 text-sm"
                  />
                  <Button
                    className="mt-3 rounded-full px-6 bg-blue-800 hover:bg-blue-700"
                    onClick={adicionarFeedback}
                  >
                    Enviar Avaliação
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AssinaturaGuard>
  );
}
