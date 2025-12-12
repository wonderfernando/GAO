"use client"


import React, { useState } from 'react';
import { Bell, Check, CheckCheck, Trash2, Settings, Filter, MessageCircle, DollarSign, Star, UserPlus, Briefcase, AlertCircle, Calendar, Award, X, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function Notificacoes() {
  const [filter, setFilter] = useState('todas');
  const [notificacoes, setNotificacoes] = useState([
    { id: 1, tipo: 'mensagem', titulo: 'Nova mensagem de Maria Silva', descricao: 'Ótimo, aguardo o orçamento então!', tempo: '5 min', lida: false, data: 'Hoje' },
    { id: 2, tipo: 'proposta', titulo: 'Proposta aceita!', descricao: 'Tech Solutions aceitou sua proposta para o projeto "Plataforma de Gestão"', tempo: '30 min', lida: false, data: 'Hoje' },
    { id: 3, tipo: 'pagamento', titulo: 'Pagamento recebido', descricao: 'Você recebeu R$ 2.500,00 pelo projeto "Site Institucional"', tempo: '2h', lida: false, data: 'Hoje' },
    { id: 4, tipo: 'avaliacao', titulo: 'Nova avaliação recebida', descricao: 'Ana Costa avaliou seu trabalho com 5 estrelas', tempo: '3h', lida: true, data: 'Hoje' },
    { id: 5, tipo: 'mensagem', titulo: 'Nova mensagem de João Pedro', descricao: 'Consegue entregar até sexta-feira?', tempo: '5h', lida: true, data: 'Hoje' },
    { id: 6, tipo: 'projeto', titulo: 'Novo projeto disponível', descricao: 'Um projeto compatível com seu perfil foi publicado: "App Mobile React Native"', tempo: '6h', lida: true, data: 'Hoje' },
    { id: 7, tipo: 'seguidor', titulo: 'Novo seguidor', descricao: 'Carlos Mendes começou a seguir seu perfil', tempo: '1 dia', lida: true, data: 'Ontem' },
    { id: 8, tipo: 'alerta', titulo: 'Complete seu perfil', descricao: 'Adicione suas habilidades para aumentar suas chances de ser contratado', tempo: '1 dia', lida: true, data: 'Ontem' },
    { id: 9, tipo: 'agenda', titulo: 'Lembrete: Reunião amanhã', descricao: 'Você tem uma reunião agendada com Tech Solutions às 10:00', tempo: '1 dia', lida: true, data: 'Ontem' },
    { id: 10, tipo: 'conquista', titulo: 'Nova conquista desbloqueada!', descricao: 'Você completou 10 projetos! Parabéns pela dedicação.', tempo: '2 dias', lida: true, data: '19/11/2024' },
    { id: 11, tipo: 'pagamento', titulo: 'Pagamento recebido', descricao: 'Você recebeu R$ 1.800,00 pelo projeto "Landing Page"', tempo: '3 dias', lida: true, data: '18/11/2024' },
    { id: 12, tipo: 'proposta', titulo: 'Proposta recusada', descricao: 'Sua proposta para "Sistema ERP" não foi aceita', tempo: '4 dias', lida: true, data: '17/11/2024' },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [configNotif, setConfigNotif] = useState({
    mensagens: true, propostas: true, pagamentos: true, avaliacoes: true, projetos: true, lembretes: true, email: true, push: true
  });

  const iconMap = {
    mensagem: { icon: MessageCircle, bg: 'bg-blue-100', color: 'text-blue-600' },
    proposta: { icon: Briefcase, bg: 'bg-purple-100', color: 'text-purple-600' },
    pagamento: { icon: DollarSign, bg: 'bg-green-100', color: 'text-green-600' },
    avaliacao: { icon: Star, bg: 'bg-yellow-100', color: 'text-yellow-600' },
    seguidor: { icon: UserPlus, bg: 'bg-cyan-100', color: 'text-cyan-600' },
    projeto: { icon: Briefcase, bg: 'bg-indigo-100', color: 'text-indigo-600' },
    alerta: { icon: AlertCircle, bg: 'bg-orange-100', color: 'text-orange-600' },
    agenda: { icon: Calendar, bg: 'bg-pink-100', color: 'text-pink-600' },
    conquista: { icon: Award, bg: 'bg-amber-100', color: 'text-amber-600' },
  };

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  const notificacoesFiltradas = notificacoes.filter(n => {
    if (filter === 'todas') return true;
    if (filter === 'naoLidas') return !n.lida;
    return n.tipo === filter;
  });

  const notificacoesAgrupadas = notificacoesFiltradas.reduce((acc, n) => {
    if (!acc[n.data]) acc[n.data] = [];
    acc[n.data].push(n);
    return acc;
  }, {});

  const marcarComoLida = (id) => {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
  };

  const excluirNotificacao = (id) => {
    setNotificacoes(prev => prev.filter(n => n.id !== id));
  };

  const limparTodas = () => {
    setNotificacoes([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-gray-700" />
              <h1 className="text-xl font-semibold text-gray-800">Notificações</h1>
              {naoLidas > 0 && (
                <span className="bg-red-500 text-white text-sm px-2.5 py-0.5 rounded-full">{naoLidas}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={marcarTodasComoLidas} className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1">
                <CheckCheck className="w-4 h-4" /> Marcar todas como lidas
              </button>
              <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              ['todas', 'Todas'],
              ['naoLidas', 'Não lidas'],
             
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${filter === value ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Configurações */}
      {showSettings && (
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-gray-800">Configurações de Notificação</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ['mensagens', 'Mensagens'], ['propostas', 'Propostas'], ['pagamentos', 'Pagamentos'], ['avaliacoes', 'Avaliações'],
                ['projetos', 'Novos projetos'], ['lembretes', 'Lembretes'], ['email', 'Email'], ['push', 'Push']
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={configNotif[key]}
                    onChange={(e) => setConfigNotif(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lista de Notificações */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {Object.keys(notificacoesAgrupadas).length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma notificação</h3>
            <p className="text-gray-400">Você está em dia! Não há notificações no momento.</p>
          </div>
        ) : (
          Object.entries(notificacoesAgrupadas).map(([data, items]) => (
            <div key={data} className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2 px-1">{data}</h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {items.map(notif => {
                  const { icon: Icon, bg, color } = iconMap[notif.tipo];
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.lida ? 'bg-cyan-50/50' : ''}`}
                      onClick={() => marcarComoLida(notif.id)}
                    >
                      <div className={`${bg} ${color} p-2.5 rounded-full flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className={`text-gray-800 ${!notif.lida ? 'font-semibold' : 'font-medium'}`}>{notif.titulo}</h4>
                            <p className="text-sm text-gray-500 mt-0.5">{notif.descricao}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-400">{notif.tempo}</span>
                            {!notif.lida && <div className="w-2.5 h-2.5 bg-cyan-600 rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); excluirNotificacao(notif.id); }}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {notificacoes.length > 0 && (
          <div className="text-center mt-6">
            <button onClick={limparTodas} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 mx-auto">
              <Trash2 className="w-4 h-4" /> Limpar todas as notificações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}