"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import CountUp from "react-countup"; // biblioteca para animar números
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444"];

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    utilizadores: 1200,
    empresas: 340,
    profissionais: 890,
    pedidos: 250,
    subscricoes: 150,
    saldo: 4500,
  });

  const [loading, setLoading] = useState(true);
  const [processosRecents, setProcessosRecents] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <p className="text-center">Carregando dados...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Relatório Geral</h1>
      <p className="text-gray-600 text-sm">
        Visão geral das estatísticas principais.
      </p>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Utilizadores", value: stats.utilizadores },
          { title: "Pedidos Subscrição", value: stats.pedidos },
          { title: "Total de Subscrições", value: stats.subscricoes },
        ].map(({ title, value }, index) => (
          <Card
            key={index}
            className="border border-gray-100 shadow-sm p-2 hover:shadow-md transition rounded-xl"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-600">
                <CountUp end={value} duration={2} separator="." />
              </div>
              {/* Mini gráfico */}
              <div className="w-24 h-12">
                <ResponsiveContainer>
                  <LineChart
                    data={[{ v: 0 }, { v: value * 0.6 }, { v: value }]}
                  >
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Tabela */}
        <Card className="w-full lg:w-full shadow-sm border-none">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Últimos Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead>Valor</TableHead>
                  <TableHead>Utilizador</TableHead>
                  <TableHead>Subscrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processosRecents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-gray-400 text-xs"
                    >
                      Nenhum pedido recente
                    </TableCell>
                  </TableRow>
                ) : (
                  processosRecents.map((processo, index) => (
                    <TableRow key={index} className="text-xs h-8">
                      <TableCell>
                        {processo?.numeroPassaporte || "N/A"}
                      </TableCell>
                      <TableCell>{processo?.nomeIndividuo || "N/A"}</TableCell>
                      <TableCell>
                        {processo?.tipoVisto?.nome +
                          " (" +
                          processo.tipoVisto?.duracaoDias +
                          " dias)" || "N/A"}
                      </TableCell>
                      <TableCell>{processo?.projeto?.nome || "N/A"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-0.5 rounded-md font-medium text-[10px]
                          ${
                            processo.status === "PENDENTE"
                              ? "bg-yellow-200 text-yellow-800"
                              : processo.status === "CONFIRMADO"
                              ? "bg-blue-200 text-blue-800"
                              : processo.status === "CANCELADO"
                              ? "bg-red-200 text-red-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {processo.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

interface Stats {
  utilizadores: number;
  empresas: number;
  profissionais: number;
  pedidos: number;
  subscricoes: number;
  saldo: number;
}
