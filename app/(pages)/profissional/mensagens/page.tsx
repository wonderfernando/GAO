"use client"


import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Image, File, Smile, ChevronLeft, Check, CheckCheck, Star, Trash2, Archive, Filter } from 'lucide-react';

export default function CaixaMensagens() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todas');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const [conversas, setConversas] = useState([
    { id: 1, nome: 'Maria Silva', avatar: '👩', online: true, naoLida: 2, favorito: true, arquivado: false, ultimaMensagem: 'Ótimo, aguardo o orçamento então!', hora: '10:30', mensagens: [
      { id: 1, from: 'ela', text: 'Olá! Vi seu perfil e gostei muito do seu trabalho.', hora: '09:15', data: 'Hoje', lida: true },
      { id: 2, from: 'voce', text: 'Obrigado Maria! Fico feliz que tenha gostado. Como posso ajudar?', hora: '09:20', data: 'Hoje', lida: true },
      { id: 3, from: 'ela', text: 'Preciso de um site institucional para minha empresa de consultoria.', hora: '09:45', data: 'Hoje', lida: true },
      { id: 4, from: 'voce', text: 'Claro! Tenho bastante experiência com sites institucionais. Vou preparar um orçamento detalhado para você.', hora: '10:00', data: 'Hoje', lida: true },
      { id: 5, from: 'ela', text: 'Ótimo, aguardo o orçamento então!', hora: '10:30', data: 'Hoje', lida: false },
    ]},
    { id: 2, nome: 'Tech Solutions Ltda', avatar: '🏢', online: false, naoLida: 0, favorito: false, arquivado: false, ultimaMensagem: 'Perfeito, contrato enviado por email.', hora: 'Ontem', mensagens: [
      { id: 1, from: 'ela', text: 'Bom dia! Somos da Tech Solutions e temos interesse em contratar seus serviços.', hora: '14:00', data: 'Ontem', lida: true },
      { id: 2, from: 'voce', text: 'Bom dia! Fico muito feliz com o interesse. Qual seria o projeto?', hora: '14:15', data: 'Ontem', lida: true },
      { id: 3, from: 'ela', text: 'Precisamos desenvolver uma plataforma interna de gestão de projetos.', hora: '14:30', data: 'Ontem', lida: true },
      { id: 4, from: 'voce', text: 'Entendi perfeitamente! Podemos agendar uma call para discutir os detalhes e requisitos?', hora: '15:00', data: 'Ontem', lida: true },
      { id: 5, from: 'ela', text: 'Claro! Que tal amanhã às 10h?', hora: '15:30', data: 'Ontem', lida: true },
      { id: 6, from: 'voce', text: 'Perfeito! Confirmado. Enviarei o link da reunião.', hora: '15:45', data: 'Ontem', lida: true },
      { id: 7, from: 'ela', text: 'Perfeito, contrato enviado por email.', hora: '16:00', data: 'Ontem', lida: true },
    ]},
    { id: 3, nome: 'João Pedro', avatar: '👨', online: true, naoLida: 3, favorito: false, arquivado: false, ultimaMensagem: 'Consegue entregar até sexta-feira?', hora: '09:00', mensagens: [
      { id: 1, from: 'ela', text: 'E aí, tudo bem? Preciso de uma ajuda urgente!', hora: '08:30', data: 'Hoje', lida: true },
      { id: 2, from: 'voce', text: 'Fala João! Tudo sim, o que você precisa?', hora: '08:45', data: 'Hoje', lida: true },
      { id: 3, from: 'ela', text: 'Preciso de algumas alterações no sistema que você fez.', hora: '08:50', data: 'Hoje', lida: false },
      { id: 4, from: 'ela', text: 'São ajustes pequenos mas urgentes.', hora: '08:51', data: 'Hoje', lida: false },
      { id: 5, from: 'ela', text: 'Consegue entregar até sexta-feira?', hora: '09:00', data: 'Hoje', lida: false },
    ]},
    { id: 4, nome: 'Ana Costa', avatar: '👩‍💼', online: false, naoLida: 0, favorito: true, arquivado: false, ultimaMensagem: 'Obrigada pelo excelente trabalho! Recomendarei você.', hora: '18/11', mensagens: [
      { id: 1, from: 'ela', text: 'O projeto foi finalizado! Ficou absolutamente perfeito.', hora: '17:00', data: '18/11', lida: true },
      { id: 2, from: 'voce', text: 'Que ótimo saber que gostou Ana! Foi um prazer trabalhar com você nesse projeto.', hora: '17:15', data: '18/11', lida: true },
      { id: 3, from: 'ela', text: 'Obrigada pelo excelente trabalho! Recomendarei você.', hora: '17:30', data: '18/11', lida: true },
    ]},
    { id: 5, nome: 'Carlos Mendes', avatar: '👨‍💻', online: false, naoLida: 0, favorito: false, arquivado: true, ultimaMensagem: 'Ok, sem problemas. Até mais!', hora: '10/11', mensagens: [
      { id: 1, from: 'ela', text: 'Oi, você faz desenvolvimento mobile?', hora: '10:00', data: '10/11', lida: true },
      { id: 2, from: 'voce', text: 'Olá Carlos! No momento estou focado apenas em web, mas posso indicar alguém.', hora: '10:30', data: '10/11', lida: true },
      { id: 3, from: 'ela', text: 'Ok, sem problemas. Até mais!', hora: '11:00', data: '10/11', lida: true },
    ]},
  ]);

  const conversaAtiva = conversas.find(c => c.id === selectedConversation);
  
  const conversasFiltradas = conversas.filter(c => {
    const matchSearch = c.nome.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'todas') return matchSearch && !c.arquivado;
    if (filter === 'naoLidas') return matchSearch && c.naoLida > 0 && !c.arquivado;
    if (filter === 'favoritas') return matchSearch && c.favorito && !c.arquivado;
    if (filter === 'arquivadas') return matchSearch && c.arquivado;
    return matchSearch;
  });

  const totalNaoLidas = conversas.reduce((acc, c) => acc + c.naoLida, 0);

  const toggleFavorito = (id) => {
    setConversas(prev => prev.map(c => c.id === id ? { ...c, favorito: !c.favorito } : c));
  };

  const arquivarConversa = (id) => {
    setConversas(prev => prev.map(c => c.id === id ? { ...c, arquivado: !c.arquivado } : c));
  };

  const enviarMensagem = () => {
    if (!newMessage.trim()) return;
    setConversas(prev => prev.map(c => {
      if (c.id === selectedConversation) {
        return {
          ...c,
          mensagens: [...c.mensagens, { id: Date.now(), from: 'voce', text: newMessage, hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), data: 'Hoje', lida: true }],
          ultimaMensagem: newMessage,
          hora: 'Agora'
        };
      }
      return c;
    }));
    setNewMessage('');
  };

  const selectConversation = (id) => {
    setSelectedConversation(id);
    setShowMobileChat(true);
    setConversas(prev => prev.map(c => c.id === id ? { ...c, naoLida: 0, mensagens: c.mensagens.map(m => ({ ...m, lida: true })) } : c));
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200  py-3 flex items-center justify-between px-8">
        <h1 className="text-xl font-semibold text-gray-800">Mensagens</h1>
        <div className="flex items-center gap-3">
          {totalNaoLidas > 0 && (
            <span className="bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">{totalNaoLidas} não lidas</span>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden ">
        {/* Lista de Conversas */}
        <div className={`w-full md:w-96 bg-white border-r border-gray-200 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Busca e Filtros */}
          <div className="p-3 border-b border-gray-200 space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar conversas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[['todas', 'Todas'], ['naoLidas', 'Não lidas']].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${filter === value ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto">
            {conversasFiltradas.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Nenhuma conversa encontrada</p>
              </div>
            ) : (
              conversasFiltradas.map(conversa => (
                <div
                  key={conversa.id}
                  onClick={() => selectConversation(conversa.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conversa.id ? 'bg-cyan-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">{conversa.avatar}</div>
                      {conversa.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1">
                          <span className={`text-gray-800 ${conversa.naoLida > 0 ? 'font-semibold' : 'font-medium'}`}>{conversa.nome}</span>
                          {conversa.favorito && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <span className={`text-xs ${conversa.naoLida > 0 ? 'text-cyan-600 font-medium' : 'text-gray-400'}`}>{conversa.hora}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-sm truncate pr-2 ${conversa.naoLida > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{conversa.ultimaMensagem}</p>
                        {conversa.naoLida > 0 && (
                          <span className="bg-cyan-600 text-white text-xs min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center">{conversa.naoLida}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Área do Chat */}
        <div className={`flex-1 flex flex-col bg-gray-50 ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
          {conversaAtiva ? (
            <>
              {/* Header do Chat */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowMobileChat(false)} className="md:hidden p-1 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">{conversaAtiva.avatar}</div>
                    {conversaAtiva.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{conversaAtiva.nome}</h3>
                    <p className="text-xs text-gray-500">{conversaAtiva.online ? '🟢 Online agora' : '⚪ Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleFavorito(conversaAtiva.id)} className={`p-2 rounded-full hover:bg-gray-100 ${conversaAtiva.favorito ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <Star className={`w-5 h-5 ${conversaAtiva.favorito ? 'fill-yellow-500' : ''}`} />
                  </button>
                  <button onClick={() => arquivarConversa(conversaAtiva.id)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                    <Archive className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversaAtiva.mensagens.map((msg, i) => {
                  const showDate = i === 0 || conversaAtiva.mensagens[i - 1].data !== msg.data;
                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center">
                          <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">{msg.data}</span>
                        </div>
                      )}
                      <div className={`flex ${msg.from === 'voce' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.from === 'voce' ? 'bg-cyan-600 text-white rounded-br-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm'}`}>
                          <p className="break-words">{msg.text}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${msg.from === 'voce' ? 'text-cyan-100' : 'text-gray-400'}`}>
                            <span className="text-xs">{msg.hora}</span>
                            {msg.from === 'voce' && (msg.lida ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />)}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Input de Mensagem */}
              <div className="bg-white border-t border-gray-200 p-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                    <Image className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    onClick={enviarMensagem}
                    disabled={!newMessage.trim()}
                    className="p-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">Suas mensagens</h3>
                <p>Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}3