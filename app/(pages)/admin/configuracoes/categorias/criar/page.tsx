"use client";
import GeneriPage from "@/components/GenericPage";
import { createSchema } from "../shemas";

export default function CriarPlanosPage() {
  return (
    <GeneriPage
      title="Cadastro de Plano"
      schema={createSchema}
      defaultValues={
        {
          // valor: 0.0, // ou "PROFISSIONAL"
          // nome: "",
          // duracao: 1, // dias
        }
      }
      formFields={[
        { name: "nome", placeholder: "Nome", type: "text" },
        // { name: "valor", placeholder: "Valor:.100.000", type: "number" },
        // { name: "duracao", placeholder: "Duracao em dias", type: "number" },
      ]}
      endpoint="/api/usuario"
      onSuccess={() => alert("Cadastro feito com sucesso")}
    />
  );
}
