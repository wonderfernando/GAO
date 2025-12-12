"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import notificacoesMock from "./data.json";

type Notificacao = {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
};

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] =
    useState<Notificacao[]>(notificacoesMock);

  const marcarComoLida = (id: number) => {
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-600" />
          Notificações
        </h1>
        <Button className="bg-white" onClick={marcarTodasComoLidas}>
          <Check className="w-4 h-4 mr-2" /> Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-4 bg-white p-4 rounded-sm">
        {notificacoes.map((notificacao) => (
          <Card
            key={notificacao.id}
            className={`transition  rounded-no hover:bg-blue-200/50 ${
              notificacao.lida
                ? "bg-gray-200/50 border-b border-gray-200 rounded-0"
                : "bg-blue-100/40 border-b-indigo-300 rounded-0"
            }`}
          >
            <CardContent className="p-4 flex justify-between items-start rounded-no">
              <div className="rounded-none">
                <h2
                  className={`font-semibold rounded-0 ${
                    notificacao.lida ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  {notificacao.titulo}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    notificacao.lida ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {notificacao.mensagem}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
