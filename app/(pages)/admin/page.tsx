"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 
import {
  ArrowDownCircle, ArrowUpCircle, Calendar,
  DollarSignIcon, Folder, PlayCircleIcon, Users
} from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const COLORS = ["#FFA500", "#3B82F6", "#EF4444", "#22C55E"]; // Pendente, Confirmado, Cancelado, Concluído
const COLORSCAT = ["#3B82F6", "#FFA500", "#EF4444", "#22C55E"]; // Pendente, Confirmado, Cancelado, Concluído

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    utilizadores: 0,
    empresas: 0,
    profissionais: 0,
    pedidos: 0,
    subscricoes: 0,
    saldo: 0,
  }); // Inicializando com um objeto vazio conforme a interface Stats

  const [loading, setLoading] = useState(true);
  const [processosRecents, setProcessosRecents] = useState([])

 
  const fetchStats = async () => { 
    try {
      // TODO: Replace this mock with your actual API call
      let data: Stats = {
        utilizadores: 0,
        empresas: 0,
        profissionais: 0,
        pedidos: 0,
        subscricoes: 0,
        saldo: 0,
       
      };
      setStats(data); // Adicionando um item fictício para evitar erro de mapeamento
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
  }, []);

  if (loading) return <p className="text-center">Carregando dados...</p>;

  // Example: Construct pieData from stats if you want to show counts for each stat
  const pieData = [
    { name: "Utilizadores", value: stats.utilizadores },
    { name: "Empresas", value: stats.empresas },
    { name: "Profissionais", value: stats.profissionais },
    { name: "Pedidos", value: stats.pedidos },
    { name: "Subscricoes", value: stats.subscricoes },
    { name: "Saldo", value: stats.saldo },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relatório Geral</h1>
      <p className="text-gray-600">Aqui você pode visualizar .</p>

      <hr className="border-gray-300" />
      <h2 className="text-2xl font-light">Estatísticas Gerais</h2>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Utilizadores ", value: 0, Icon: Users, bgColor: "bg-blue-500" },
          { title: "Pedidos subscrição", value: 0, Icon: Calendar, bgColor: "bg-blue-500" },
          { title: "Total de subscricao", value: 0, Icon: PlayCircleIcon, bgColor: "bg-blue-500" },
        
        ].map(({ title, value, Icon, bgColor }, index) => (
          <Card key={index} className={` border border-gray-200 ${bgColor} p-4`}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
              <Icon className="h-6 w-6 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Tabela de processos */}
        <Card className="w-full lg:w-2/3 shadow-md border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Últimos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Valor</TableHead>
                  <TableHead>Utli</TableHead>
                  <TableHead>Subscric</TableHead>
      
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processosRecents.map((processo: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{processo?.numeroPassaporte || "N/A"}</TableCell>
                    <TableCell>{processo?.nomeIndividuo || "N/A"}</TableCell>
                    <TableCell>{processo?.tipoVisto?.nome + " (" + processo.tipoVisto?.duracaoDias + "dias )" || "N/A"}</TableCell>
                    <TableCell>{processo?.projeto?.nome || "N/A"}</TableCell>
                    <TableCell>{processo.categoria || "N/A"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-md font-medium text-sm
                        ${processo.status === "PENDENTE" ? "bg-yellow-200 text-yellow-800" :
                          processo.status === "CONFIRMADO" ? "bg-blue-200 text-blue-800" :
                            processo.status === "CANCELADO" ? "bg-red-200 text-red-800" :
                              "bg-green-200 text-green-800"}`}>
                        {processo.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Gráfico Pizza */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <Card className="shadow-md border">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Tii</CardTitle>
            </CardHeader>
            
          </Card>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
};

export default AdminDashboard;


interface ProjetoPorStatus {
  status: string;
  total: number;
}

interface ProcessoPorCategoria {
  categoria: string;
  total: number;
}

interface Stats {
  utilizadores: number;
  empresas: number;
  profissionais: number;
  pedidos: number;
  subscricoes: number;
  saldo: number;
}