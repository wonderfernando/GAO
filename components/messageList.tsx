// components/MessagesList.tsx
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

export interface Message {
    id: number;
    sender: string;
    content: string;
    date: string;
}

const messages: Message[] = [
    {
        id: 1,
        sender: 'João Silva',
        content: 'Olá! Gostaria de discutir uma oportunidade de colaboração.',
        date: '2023-10-01',
    },
    {
        id: 2,
        sender: 'Maria Oliveira',
        content: 'Você tem um momento para falarmos sobre o projeto?',
        date: '2023-10-02',
    },
    {
        id: 3,
        sender: 'Carlos Pereira',
        content: 'Estou interessado na sua proposta. Vamos conversar!',
        date: '2023-10-03',
    },
];

const MessagesList = ({ messages }: { messages: Message[] }) => {
    return (
        <div className="container mx-auto p-10">
            <h1 className="text-3xl font-bold mb-6">Mensagens Recebidas</h1>
            <div className="space-y-1">
                {messages.map((message) => (
                    <Link href={`/chat/${message.id}`} key={message.id}>
                        <div key={message.id} className="flex items-start p-4 bg-white  shadow-md hover:bg-gray-100">
                            <FaUserCircle className="text-gray-400 h-10 w-10 mr-4" />
                            <div className="flex-1">
                                <h2 className="font-semibold">{message.sender}</h2>
                                <p className="text-gray-600">{message.content}</p>
                                <span className="text-sm text-gray-500">{message.date}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MessagesList;