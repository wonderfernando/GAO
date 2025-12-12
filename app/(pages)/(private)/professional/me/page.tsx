"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

type FormData = {
  nome: string;
  telefone: string;
  endereco: string;
  profissao: string;
  experiencia: string;
  bio: string;
  habilidades: string; // separado por vírgulas
  taxaPorHora: string;
};

export default function EditarProfissionalPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    // transforma habilidades em array
    const habilidadesArray = data.habilidades
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean);

    await fetch("/api/profissional/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        habilidades: habilidadesArray,
        taxaPorHora: parseFloat(data.taxaPorHora),
      }),
    });

    setLoading(false);
    alert("Perfil atualizado com sucesso!");
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card className="shadow-none border-none">
        <CardContent className="p-6">
          <h1 className="text-2xl font-small mb-6">Informações do Perfil</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Nome completo" {...register("nome")} />
            <Input placeholder="Telefone" {...register("telefone")} />
            <Input placeholder="Endereço" {...register("endereco")} />
            <Input placeholder="Profissão" {...register("profissao")} />
            <Input
              placeholder="Experiência (ex: 5 anos)"
              {...register("experiencia")}
            />
            <Textarea
              placeholder="Bio profissional..."
              rows={4}
              {...register("bio")}
            />
            <Input
              placeholder="Habilidades (ex: React, Node, SQL)"
              {...register("habilidades")}
            />
            <Input
              placeholder="Taxa por hora (ex: 8000)"
              type="number"
              step="0.01"
              {...register("taxaPorHora")}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-400"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
