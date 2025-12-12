"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import type { UserType } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Usuario = {
  id: string;
  nif?: string;
  nome: string;
  logo: string;

  sector: string;
  email: string;
  tipo: UserType;
  telefone?: string | null;
  endereco?: string | null;
  dataNascimento?: string | null;
  fotoPerfil?: { url?: string | null };
  fotoCapa?: { url?: string | null | StaticImageData };
  profissao?: string | null;
  bio?: string | null;
  experiencia?: string | null;
  descricao?: string | null;
  site?: string | null;
  isActive: boolean;
  skills?: string[];
};

export default function UsuarioPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [validando, setValidando] = useState(false);

  async function validarPerfil() {
    try {
      setValidando(true);
      const res = await fetch(`/api/utilizadores/toogle/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.ok)
        toast({
          title: "sucesso",
          description: data.sucess
            ? "Perfil aprovado com sucesso"
            : "Perfil recusado com sucesso",
        });
      else throw new Error("Impossivel validar o perfil");

      setValidando(false);
    } catch (error) {
      console.log(error);
      throw new Error("eroo");
    } finally {
      setValidando(false);
    }
  }

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/utilizadores/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar usuário");
        const data: Usuario = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!usuario) return <div>Usuário não encontrado.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-12">
      {/* Foto de capa */}
      {usuario.fotoCapa?.url && (
        <div className="w-full h-52 relative mb-5 rounded-xl overflow-hidden">
          <Image
            src={usuario.fotoCapa.url}
            alt="Foto de capa"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Foto de perfil + nome */}
      <div className="flex items-center gap-4 mb-6 -mt-16 relative z-10">
        {usuario.fotoPerfil?.url ? (
          <Image
            src={usuario.fotoPerfil.url}
            alt="Foto de perfil"
            width={120}
            height={120}
            className="rounded-full border-4 border-white object-cover bg-white shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-gray-600 border-4 border-white shadow-md">
            {usuario.nome[0].toUpperCase()}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{usuario.nome}</h1>
          <p className="text-gray-600">{usuario.tipo}</p>
          {usuario.profissao && (
            <p className="text-gray-600">{usuario.profissao}</p>
          )}
          {usuario.site && (
            <p>
              <a
                href={usuario.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {usuario.site}
              </a>
            </p>
          )}
        </div>
        <div>
          {!usuario.isActive && (
            <Button
              onClick={async () => await validarPerfil()}
              className="bg-green-500 m-2 hover:bg-green-500/80"
            >
              {validando ? "validando..." : "aprovar"}
            </Button>
          )}
        </div>
      </div>
      {/* endereco */}
      {usuario.nif && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">NIF</h2>
          <p>{usuario.nif}</p>
        </section>
      )}
      {usuario.sector && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sector</h2>
          <p>{usuario.sector}</p>
        </section>
      )}

      {/* Bio */}
      {usuario.bio && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Sobre</h2>
          <p>{usuario.bio}</p>
        </section>
      )}

      {/* Experiência */}
      {usuario.experiencia && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experiência</h2>
          <p>{usuario.experiencia}</p>
        </section>
      )}

      {/* Descrição */}
      {usuario.descricao && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Descrição</h2>
          <p>{usuario.descricao}</p>
        </section>
      )}

      {/* Contato */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Contato</h2>

        <p>Email: {usuario.email}</p>
        {usuario.telefone && <p>Telefone: {usuario.telefone}</p>}
        {usuario.endereco && <p>Endereço: {usuario.endereco}</p>}
        {usuario.dataNascimento && (
          <p>
            Data de Nascimento:{" "}
            {new Date(usuario.dataNascimento).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </section>
    </div>
  );
}
