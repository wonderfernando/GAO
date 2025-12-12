"use client";
import GeneriPage from "@/components/GenericPage";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateSchema } from "../shemas";

export default function CriarPlanosPage() {
  const id = useParams().id;
  const [usuario, setUsuario] = useState<any>();
  async function buscarUsuario() {
    await fetch(`/api/utilizadores/${id}`, {
      method: "GET",
    });
  }
  useEffect(() => {}, []);
  return (
    <GeneriPage
      title="Editar o pedido de subscrição"
      schema={updateSchema}
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
