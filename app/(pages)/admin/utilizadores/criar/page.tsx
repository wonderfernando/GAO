"use client";
import GeneriPage from "@/components/GenericPage";
import { createSchema } from "../shemas";

export default function CriarPlanosPage() {
  return (
    <GeneriPage
      title="Cadastro de Novo Usuário"
      schema={createSchema}
      defaultValues={{
        tipo: "EMPRESA",
      }}
      formFields={[
        { name: "nome", placeholder: "Nome", type: "text" },
        { name: "email", placeholder: "Valor:.100.000", type: "number" },
        { name: "senha", placeholder: "Duracao em dias", type: "number" },
        {
          name: "tipo",
          type: "select",
          options: [
            { value: "PROFISSIONAL", label: "Profissional" },
            { value: "EMPRESA", label: "Empresa" },
            { value: "ADMINISTRADOR", label: "Administrador" },
          ],
        },
        {
          name: "isActive",
          type: "select",
          options: [
            { value: "true", label: "Ativo" },
            { value: "false", label: "Inativo" },
          ],
        },
        { name: "telefone", placeholder: "923 000 000 000", type: "number" },
      ]}
      endpoint="/api/usuario"
      onSuccess={() => alert("Cadastro feito com sucesso")}
    />
  );
}
