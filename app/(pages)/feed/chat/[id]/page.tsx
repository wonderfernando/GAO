// app/chat/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Simulação de recebimento de mensagens
    const fetchMessages = async () => {
      // Aqui você pode buscar mensagens de uma API
      const initialMessages = [
        { sender: 'João', content: 'Olá, tudo bem?' },
        { sender: 'Maria', content: 'Oi! Estou bem, e você?' },
      ];
      setMessages(initialMessages);
    };

    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { sender: 'Você', content: inputValue };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');
      toast({ title: 'Mensagem enviada', description: 'Sua mensagem foi enviada com sucesso!' });
    }
  };

  return (
    <div className="flex min-h-screen  items-center  bg-white  justify-center">
      <div className="container mx-auto p-10 " >
        <h1 className="text-3xl font-bold mb-6">Negociação</h1>
        <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-100 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg max-w-xs ${msg.sender === 'Você' ? 'bg-blue-500 text-white self-start ml-auto' : 'bg-white text-black self-start'
                } break-words`}
            >
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="flex">
          <textarea
            placeholder="Digite sua mensagem"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 mr-2 p-2 border rounded-lg resize-none"
            rows={3} // Define a altura inicial do textarea
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;