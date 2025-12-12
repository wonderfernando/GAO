"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: "João Silva",
    lastMessage: "Olá, tudo bem?",
    time: "10:30",
    unread: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    lastMessage: "Enviei os documentos",
    time: "Ontem",
    unread: false,
  },
  {
    id: 3,
    name: "Carlos Almeida",
    lastMessage: "Reunião confirmada",
    time: "Segunda",
    unread: true,
  },
];

export default function MessagesPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Mensagens</h1>
      <div className="space-y-3 bg-white p-4 rounded-2">
        {conversations.map((conv) => (
          <Link key={conv.id} href={`/feed/messages/${conv.id}`}>
            <Card
              className={`cursor-pointer transition border-b-3  gap-3 hover:bg-blue-300/20 m-2 roudend-0 ${
                conv.unread ? "  bg-blue-100/20 shadow-sm" : "hover:shadow-sm"
              }`}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <Avatar>
                  <AvatarFallback className="bg-indigo-500 text-white">
                    {conv.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p
                      className={`font-semibold ${
                        conv.unread ? "text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {conv.name}
                    </p>
                    <span className="text-xs text-gray-400">{conv.time}</span>
                  </div>

                  <p
                    className={`text-sm truncate ${
                      conv.unread
                        ? "text-gray-800 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread && (
                  <Badge className="bg-blue-500 text-white rounded-full px-2 py-0 text-xs">
                    Novo
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
