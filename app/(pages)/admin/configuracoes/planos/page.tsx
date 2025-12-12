"use client";

import { Trash } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import GenericListPage from "@/components/GenericListPage";
import { formatDate } from "@/lib/date";
import { FaEdit } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo: "EMPRESA" | "PROFISSIONAL" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export default function PlanosPage() {
  const handleDelete = useCallback(async (id: string, reload: () => void) => {
    if (confirm("Tem certeza que deseja excluir este plano?")) {
      await fetch(`/api/admin/planos/${id}`, {
        method: "DELETE",
      });
      reload();
    }
  }, []);
  const handleEditar = useCallback(
    async (id: string, reload: () => void) =>
      toast({
        title: "Edicao",
        description: "EDICAO INDISPONIVEL",
        variant: "error",
      }),
    []
  );

  return (
    <GenericListPage<Usuario>
      title="Planos"
      endpoint="/api/planos"
      createButtonLabel="Novo Plano"
      columns={[
        { header: "Nome", accessor: (u) => u.nome },
        { header: "Valor", accessor: (u) => u.email },

        {
          header: "Criado em",
          accessor: (u) => formatDate(new Date(u.createdAt)),
        },
      ]}
      rowActions={(usuario, reload) => (
        <>
          <DropdownMenuItem
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(usuario.id, reload)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Excluir
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-yellow-500 cursor-pointer"
            onClick={() => handleEditar(usuario.id, reload)}
          >
            <FaEdit className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
        </>
      )}
    />
  );
}
