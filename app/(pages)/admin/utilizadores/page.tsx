"use client";

import { Trash } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import GenericListPage from "@/components/GenericListPage";
import { formatDate } from "@/lib/date";
import { FaEdit } from "react-icons/fa";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo: "EMPRESA" | "PROFISSIONAL" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export default function UsuarioListPage() {
  const handleDelete = useCallback(async (id: string, reload: () => void) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch(`/api/admin/usuarios/${id}`, {
        method: "DELETE",
      });
      reload();
    }
  }, []);

  return (
    <GenericListPage<Usuario>
      title="Usuários"
      endpoint="/api/utilizadores"
      filtersConfig={[
        { key: "nome", label: "Buscar", type: "text" },
        {
          key: "nome",
          label: "Função",
          type: "select",
          options: [
            { value: "admin", label: "Administrador" },
            { value: "user", label: "Usuário" },
          ],
        },
      ]}
      createButtonsLabels={[
        {
          path: "/admin/configuracoes/utilizadores",
          label: "Criar Novo",
          color: "bg-green-400 hover:bg-green-500",
        },
      ]}
      queryParams={{ tipo: "ADMINISTRADOR" }}
      createButtonLabel="Novo Utilizador"
      columns={[
        { header: "Nome", accessor: (u) => u.nome },
        { header: "Email", accessor: (u) => u.email },
        { header: "Telefone", accessor: (u) => u.telefone || "-" },
        { header: "Tipo", accessor: (u) => u.tipo },
        {
          header: "Criado em",
          accessor: (u) => formatDate(new Date(u.createdAt)),
        },
        {
          header: "Ativo",
          accessor: (u) =>
            u.isActive ? (
              <span className="text-green-600 font-medium">Sim</span>
            ) : (
              <span className="text-red-600 font-medium">Não</span>
            ),
        },
      ]}
      rowActions={(usuario, reload) => (
        <>
          <DropdownMenuItem
            className="text-green-500"
            onClick={() => handleDelete(usuario.id, reload)}
          >
            <FaEdit className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => handleDelete(usuario.id, reload)}
          >
            <Trash className="w-4 h-4 mr-2" />
            Excluir
          </DropdownMenuItem>
        </>
      )}
    />
  );
}
