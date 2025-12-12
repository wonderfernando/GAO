"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AssinaturaGuard from "@/app/guard/AssinalturaGuard";

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState([
    { from: "me", text: "Olá 👋" },
    { from: "other", text: "Oi, tudo bem?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <AssinaturaGuard hasPlano={false}>
      <div className="flex flex-col h-[calc(100vh-80px)] p-4">
        {/* Header */}
        <div className="p-3 border-b">
          <h2 className="font-bold">Chat com usuário {id}</h2>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto space-y-2 p-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xs px-3 py-2 rounded-xl text-sm ${
                msg.from === "me"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-900 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 border-t p-3">
          <Input
            className="outline:bg-blue-700"
            placeholder="Escreva uma mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            className="bg-blue-800 hover:bg-blue-700/90"
            onClick={handleSend}
          >
            Enviar
          </Button>
        </div>
      </div>
    </AssinaturaGuard>
  );
}
