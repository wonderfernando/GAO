// app/chat/page.tsx
'use client'
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string; mediaUrl?: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Simulação de recebimento de mensagens
    const fetchMessages = async () => {
      const initialMessages = [
        { sender: 'João', content: 'Olá, tudo bem?' },
        { sender: 'Maria', content: 'Oi! Estou bem, e você?' },
      ];
      setMessages(initialMessages);
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (inputValue.trim() || file) {
      const newMessage = { sender: 'Você', content: inputValue, mediaUrl: file ? await uploadFile(file) : undefined };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue('');
      setFile(null);
      toast({ title: 'Mensagem enviada', description: 'Sua mensagem foi enviada com sucesso!' });
    }
  };

  const uploadFile = async (selectedFile: File) => {
    // Função para fazer upload do arquivo para o servidor ou serviço de nuvem
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    return data.url; // URL do arquivo armazenado
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Bate-Papo</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 p-3 rounded-lg max-w-xs ${msg.sender === 'Você' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
            <strong>{msg.sender}:</strong> {msg.content}
            {msg.mediaUrl && <img src={msg.mediaUrl} alt="Mensagem multimídia" className="mt-2 max-w-full" />}
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          placeholder="Digite sua mensagem"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 mr-2 p-2 border rounded-lg resize-none"
          rows={3}
        />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mr-2" />
        <Button onClick={sendMessage}>Enviar</Button>
      </div>
    </div>
  );
};

export default ChatPage;