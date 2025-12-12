"use client";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Globe,
  User,
  Briefcase,
  Award,
} from "lucide-react";
// import profileHeroBanner from "@/assets/img/";
// import profileAvatar from "@/assets/profile-avatar.jpg";
import { useParams } from "next/navigation";
import type { StaticImageData } from "next/image";

type Usuario = {
  id: string;
  nome: string;
  email: string;
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
  skills?: string[];
};

// Mock data for demonstration
const mockUser: Usuario = {
  id: "1",
  nome: "Maria Silva Santos",
  email: "maria.santos@email.com",
  telefone: "+55 11 98765-4321",
  endereco: "São Paulo, SP, Brasil",
  dataNascimento: "1985-03-15",
  fotoPerfil: { url: "" },
  fotoCapa: { url: "" },
  profissao: "Desenvolvedora Full Stack Senior",
  bio: "Apaixonada por tecnologia e inovação, com mais de 8 anos de experiência desenvolvendo soluções web modernas e escaláveis. Especializada em React, Node.js e arquiteturas em nuvem.",
  experiencia:
    "8+ anos de experiência em desenvolvimento web, liderando equipes ágeis e projetos de grande escala. Atuei em startups e empresas consolidadas, sempre focada em entregar valor através da tecnologia.",
  descricao:
    "Profissional dedicada e orientada a resultados, com forte experiência em desenvolvimento full stack e liderança técnica. Mentora ativa na comunidade de tecnologia.",
  site: "https://mariasilva.dev",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
  ],
};

export default function ProfilePage() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchUsuario = async () => {
      try {
        // In a real app, this would be an actual API call
        // const res = await fetch(`/api/usuarios/${id}`);
        // const data = await res.json();
        // setUsuario(data);

        // For demo purposes, using mock data
        setTimeout(() => {
          setUsuario(mockUser);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <User className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Usuário não encontrado
            </h2>
            <p className="text-muted-foreground">
              O perfil que você está procurando não existe ou foi removido.
            </p>
            <Button asChild className="mt-4">
              <a href="/">Voltar ao início</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section with Cover Photo */}
      <div className="relative">
        {/* Cover Photo */}
        <div
          className="h-64 md:h-80 bg-gradient-hero bg-cover bg-center relative overflow-hidden"
          style={
            usuario.fotoCapa?.url
              ? { backgroundImage: `url(${usuario.fotoCapa.url})` }
              : {}
          }
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
        </div>

        {/* Profile Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="relative -mt-16 md:-mt-20">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-8">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                {usuario.fotoPerfil?.url ? (
                  <img
                    src={usuario.fotoPerfil.url}
                    alt="Foto de perfil"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card object-cover shadow-profile bg-card"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card bg-muted shadow-profile flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-muted-foreground">
                      {usuario.nome[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Name and Basic Info */}
              <div className="mt-4 md:mt-0 md:pb-4 flex-grow">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {usuario.nome}
                  </h1>
                  {usuario.profissao && (
                    <p className="text-lg text-primary font-semibold mb-3">
                      {usuario.profissao}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {usuario.endereco && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{usuario.endereco}</span>
                      </div>
                    )}
                    {usuario.site && (
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <a
                          href={usuario.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline transition-smooth"
                        >
                          {usuario.site}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Experience */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {usuario.bio && (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Sobre</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {usuario.bio}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Experience Section */}
            {usuario.experiencia && (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Experiência</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {usuario.experiencia}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Description Section */}
            {usuario.descricao && (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Descrição</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {usuario.descricao}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Skills Section */}
            {usuario.skills && usuario.skills.length > 0 && (
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
                  <div className="flex flex-wrap gap-2">
                    {usuario.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gradient-primary text-primary-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Contato</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${usuario.email}`}
                      className="text-muted-foreground hover:text-primary transition-smooth break-all"
                    >
                      {usuario.email}
                    </a>
                  </div>

                  {usuario.telefone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a
                        href={`tel:${usuario.telefone}`}
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        {usuario.telefone}
                      </a>
                    </div>
                  )}

                  {usuario.dataNascimento && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {new Date(usuario.dataNascimento).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full mt-6 bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-profile transition-bounce"
                  asChild
                >
                  <a href={`mailto:${usuario.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar mensagem
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
