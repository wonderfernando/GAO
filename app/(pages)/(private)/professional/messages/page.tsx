"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const conversations = [
  {
    id: 1,
    name: "João Silva",
    lastMessage: "Olá, tudo bem?",
    time: "10:30",
  },
  {
    id: 2,
    name: "Maria Santos",
    lastMessage: "Enviei os documentos",
    time: "Ontem",
  },
  {
    id: 3,
    name: "Carlos Almeida",
    lastMessage: "Reunião confirmada",
    time: "Segunda",
  },
];

export default function MessagesPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mensagens</h1>
      <div className="space-y-3 bg-white">
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/professional/messages/${conv.id}`}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <CardContent className="flex items-center gap-3 p-4">
                <Avatar className="bg-blue-500 text-white flex items-center justify-center">
                  {conv.name[0]}
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{conv.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{conv.time}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
