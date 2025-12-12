"use client";
import GeneriPage from "@/components/GenericPage";
import { createSchema } from "../shemas";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function CriarPlanosPage() {
  const id = useParams().id;
  async function buscarUsuario() {}
  useEffect(() => {}, []);
  return (
    <GeneriPage
      title="Cadastro de Plano"
      schema={createSchema}
      defaultValues={{
        nome: "",
      }}
      formFields={[{ name: "nome", placeholder: "Nome", type: "text" }]}
      isEditing
      endpoint={`/api/usuario`}
      onSuccess={() => alert("Cadastro feito com sucesso")}
    />
  );
}
