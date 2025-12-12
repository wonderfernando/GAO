"use client";

import { Trash } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import GenericListPage from "@/components/GenericListPage";
import { formatDate } from "@/lib/date";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

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
      title="Subscrições"
      queryParams={{ tipo: "EMPRESA|PROFISSIONAL", isactive: "false" }}
      endpoint="/api/subscricoes"
      columns={[
        { header: "Nome", accessor: (u) => u.nome },
        { header: "Email", accessor: (u) => u.email },
        { header: "Telefone", accessor: (u) => u.telefone || "-" },
        { header: "Entidade", accessor: (u) => u.tipo },
        { header: "Plano", accessor: (u) => u.tipo },
        {
          header: "Criado em",
          accessor: (u) => formatDate(new Date(u.createdAt)),
        },
        {
          header: "Estado",
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
          <DropdownMenuItem className="text-red-500">
            <Link href={`/admin/subscricoes/${usuario.id}`}>
              <FaEyeSlash className="w-4 h-4 mr-2" />
              ver
            </Link>
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
