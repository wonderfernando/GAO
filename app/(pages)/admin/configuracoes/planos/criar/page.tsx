"use client";
import GeneriPage from "@/components/GenericPage";
import { createSchema } from "../shemas";

export default function CriarPlanosPage() {
  return (
    <GeneriPage
      title="Cadastro de Plano"
      schema={createSchema}
      defaultValues={{}}
      formFields={[{ name: "nome", placeholder: "Nome", type: "text" }]}
      endpoint="/api/usuario"
      onSuccess={() => alert("Cadastro feito com sucesso")}
    />
  );
}
