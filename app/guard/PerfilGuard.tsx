"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { getSession } from "next-auth/react";

interface TipoWrapperProps {
  allowedProfiles: string[]; // perfis permitidos, ex: ["ADMIN", "CLIENTE"]
  children: ReactNode;
}

export default function TipoGuard({
  allowedProfiles,
  children,
}: TipoWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [temAcesso, setTemAcesso] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAccess() {
      setLoading(true);
      const session = await getSession(); // retorna { user: { tipo: "ADMIN", planoAtivo: true } }

      if (!session) {
        router.push("/login");
        return;
      }

      const tipoPermitido = allowedProfiles.includes(session?.user?.tipo ?? "");
      const planoAtivo = session?.user?.isActive ?? false;

      if (!tipoPermitido || !planoAtivo) {
        setTemAcesso(false);
      } else {
        setTemAcesso(true);
      }

      setLoading(false);
    }

    checkAccess();
  }, [allowedProfiles, router]);

  if (loading) return <Loading />;

  if (!temAcesso) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Acesso Negado</h2>
        <p className="mb-4">
          Você não tem permissão para acessar esta página. Verifique se você
          está logado com o tipo correto e se sua assinatura está ativa.
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Voltar
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
