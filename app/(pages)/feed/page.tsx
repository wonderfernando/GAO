"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import profissionais_mock from "./profissionais_mock.json";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Loading from "@/components/loading";
import { DialogSearchProfissional } from "./components/dialog-search";

interface Profissional {
  id: number;
  nome: string;
  titulo: string;
  foto: string;
  categoria: string;
  conexoesMutuas: string[];
}

const profissionaisMock: Profissional[] = profissionais_mock;

export default function FeedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [loading, setLoading] = useState(false);

  // Scroll infinito - categorias
  const [visibleCategorias, setVisibleCategorias] = useState(2);
  const observerCategoriasRef = useRef<HTMLDivElement | null>(null);

  // Scroll infinito - profissionais por categoria
  const [visiveisPorCategoria, setVisiveisPorCategoria] = useState<
    Record<string, number>
  >({}); // {categoria: quantidadeVisivel}
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {

    async function getProfissionais() {
      const user = await fetch("/api/professional");
      const data = await user.json();
     console.log(data)
    }
    getProfissionais();
    let filtrados = profissionaisMock;
    setLoading(true);

    // aplica todos os filtros do URL dinamicamente
    searchParams.forEach((value, key) => {
      if (key === "categoria") {
        filtrados =  filtrados.filter((p) => p.categoria === value);
      }
      if (key === "search" && value.trim()) {
        const termo = value.toLowerCase();
        filtrados = filtrados.filter(
          (p) =>
            p.nome.toLowerCase().includes(termo) ||
            p.titulo.toLowerCase().includes(termo) ||
            p.categoria.toLowerCase().includes(termo)
        );
      }
    });

    setProfissionais(filtrados);
    setVisiveisPorCategoria({});
    setVisibleCategorias(2);
    setLoading(false);
  }, [searchParams]);

  const agrupados = profissionais.reduce<Record<string, Profissional[]>>(
    (acc, p) => {
      if (!acc[p.categoria]) acc[p.categoria] = [];
      acc[p.categoria].push(p);
      return acc;
    },
    {}
  );

  // Observador para scroll infinito das categorias
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCategorias((prev) =>
            Math.min(prev + 1, Object.keys(agrupados).length)
          );
        }
      },
      { threshold: 1 }
    );

    if (observerCategoriasRef.current) {
      observer.observe(observerCategoriasRef.current);
    }

    return () => {
      if (observerCategoriasRef.current) {
        observer.unobserve(observerCategoriasRef.current);
      }
    };
  }, [loading, agrupados]);

  // Função para carregar + profissionais numa categoria
  const carregarMaisProfissionais = (cat: string) => {
    setVisiveisPorCategoria((prev) => ({
      ...prev,
      [cat]: (prev[cat] || 6) + 6, // carrega +6 por vez
    }));
  };

  const scrollLeft = (cat: string) => {
    const container = sliderRefs.current[cat];
    if (container) container.scrollBy({ left: -280, behavior: "smooth" });
  };

  const scrollRight = (cat: string) => {
    const container = sliderRefs.current[cat];
    if (container) container.scrollBy({ left: 280, behavior: "smooth" });
  };

  // Atualiza o URL sem recarregar
  const handleSearch = (value: string) => {
    setSearch(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    router.push("?", { scroll: false });
    setSearch("");
  };
 const[isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
    <div className="">
      <section className="bg-white w-full  top-10 sticky z-20 p-4 mb-4 rounded-md">
        <h1 className="text-2xl font-small mb-6 text-gray-600 ">
          Procura um profissional?
        </h1>

        {/* Input de pesquisa com autocomplete */}
        <div className="mb-6 flex gap-3 w-full">
          <input
            type="text"
            placeholder="Pesquisar por nome, título, categoria..."
            value={search}
            onClick={() => setIsDialogOpen(true)}
            list="sugestoes"
            className="w-full md:w-full px-4 py-2 border rounded-xs border-gray-100 shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
    
          <button
            onClick={handleClearFilters}
            className="px-4 text-gray-100 py-2 bg-blue-800/90 rounded-xl hover:bg-gray-300 transition"
          >
            Limpar
          </button>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : Object.keys(agrupados).length === 0 ? (
        <p className="text-gray-500">Nenhum profissional encontrado.</p>
      ) : (
        Object.entries(agrupados)
          .slice(0, visibleCategorias)
          .map(([cat, lista]) => {
            const visiveis = visiveisPorCategoria[cat] || 6;
            return (
              <div key={cat} className="mb-10">
                <h2 className="text-xl font-semibold mb-4 capitalize text-gray-800">
                  {cat}
                </h2>

                <div className="relative">
                  {/* Botão esquerdo */}
                  <button
                    onClick={() => scrollLeft(cat)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md shadow p-2 rounded-full hover:bg-white transition"
                  >
                    <ArrowLeft />
                  </button>

                  {/* Slider horizontal */}
                  <div
                    ref={(el) => (sliderRefs.current[cat] = el)}
                    className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar pb-2"
                    onScroll={(e) => {
                      const target = e.currentTarget;
                      if (
                        target.scrollLeft + target.clientWidth >=
                        target.scrollWidth - 50
                      ) {
                        carregarMaisProfissionais(cat);
                      }
                    }}
                  >
                    {lista.slice(0, visiveis).map((p) => (
                      <Link
                        href={"/feed/professional/" + p.id}
                        key={p.id + p.nome}
                      >
                        <div className="min-w-[220px] max-w-[220px] bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg cursor-pointer">
                          <Image
                            src={p.foto}
                            alt={p.nome}
                            width={72}
                            height={72}
                            className="rounded-full mb-3 object-cover border-2 border-gray-200"
                          />
                          <h2 className="font-semibold text-base text-gray-900 line-clamp-1">
                            {p.nome}
                          </h2>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {p.titulo}
                          </p>

                          <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                            Pedir orçamento
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Botão direito */}
                  <button
                    onClick={() => scrollRight(cat)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-md shadow-sm p-2 rounded-full hover:bg-white transition text-blue-800"
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            );
          })
      )}

      {/* Loader para categorias */}
      <div ref={observerCategoriasRef} className="mt-6 flex justify-center">
        {visibleCategorias < Object.keys(agrupados).length && !loading && (
          <p className="text-gray-400 text-sm">Carregando mais categorias...</p>
        )}
      </div>
    </div>
    <DialogSearchProfissional open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}
