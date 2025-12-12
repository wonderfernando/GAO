import { ApiService } from "@/lib/ApiService";

type Usuario = {
  id: string;
  nome: string;
  tipo: string;
};

type UsuarioFilter = {
  tipo?: string;
  ativo?: boolean;
};

export async function listarUsuarios(filtros?: UsuarioFilter): Promise<Usuario[]> {
  return ApiService.get<Usuario[]>("/api/usuarios", filtros);
}
