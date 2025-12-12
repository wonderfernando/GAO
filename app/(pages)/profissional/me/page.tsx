"use client"
import React, { useState } from 'react';
import { User, FileText, Image, Star, MessageCircle, Calendar, Upload, X, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const tabs = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'curriculo', label: 'Currículo', icon: FileText },
  { id: 'portfolio', label: 'Portfólio', icon: Image },
  { id: 'avaliacoes', label: 'Avaliações', icon: Star },
  { id: 'suporte', label: 'Suporte', icon: MessageCircle },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
];

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    nome: 'João Manuel', email: 'joao@email.com', telefone: '(244) 999 999 999',
    dataNascimento: '1990-05-15', genero: 'masculino', provincia: 'Luanda',
    apresentacao: 'Desenvolvedor Full Stack com 5 anos de experiência...', habilidades: 'React, Node.js, Python, PostgreSQL',
    experiencia: 'Senior Developer na Tech Corp (2020-2024)\nPleno na StartupXYZ (2018-2020)', formacao: 'Bacharel em Ciência da Computação - USP (2018)',
  });
  const [portfolioItems, setPortfolioItems] = useState([
    { id: 1, name: 'projeto-ecommerce.png', type: 'image' },
    { id: 2, name: 'certificado-aws.pdf', type: 'doc' },
  ]);
  const [supportMessages, setSupportMessages] = useState([
    { id: 1, from: 'user', text: 'Como faço para destacar meu perfil?' },
    { id: 2, from: 'support', text: 'Olá! Você pode adquirir o plano Premium para ter mais visibilidade.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState({ 5: true, 12: true, 15: true, 20: true, 22: true });

  const avaliacoes = [
    { id: 1, empresa: 'Tech Solutions', nota: 5, comentario: 'Excelente profissional, entregou antes do prazo!', data: '15/10/2024' },
    { id: 2, empresa: 'StartupXYZ', nota: 4, comentario: 'Bom trabalho, comunicação poderia melhorar.', data: '02/09/2024' },
    { id: 3, empresa: 'Digital Agency', nota: 5, comentario: 'Muito competente e proativo.', data: '20/08/2024' },
  ];

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const removePortfolioItem = (id) => setPortfolioItems(items => items.filter(i => i.id !== id));
  const sendMessage = () => { if (newMessage.trim()) { setSupportMessages(prev => [...prev, { id: Date.now(), from: 'user', text: newMessage }]); setNewMessage(''); }};
  const toggleDay = (day) => setAvailability(prev => ({ ...prev, [day]: !prev[day] }));

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear(), month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(), daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };
 const [selectedTicket, setSelectedTicketState] = useState(null);
      
  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Editar Perfil</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">👤</div>
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm">Alterar foto</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[['nome', 'Nome completo'], ['email', 'E-mail', 'email'], ['telefone', 'Telefone'], ['dataNascimento', 'Data de nascimento', 'date']].map(([field, label, type = 'text']) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type={type} value={formData[field]} onChange={(e) => handleChange(field, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                <select value={formData.genero} onChange={(e) => handleChange('genero', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                  <option value="masculino">Masculino</option><option value="feminino">Feminino</option><option value="outro">Outro</option><option value="prefiro-nao-dizer">Prefiro não dizer</option>
                </select>
              </div>
              {[['provincia', 'Província']].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input value={formData[field]} onChange={(e) => handleChange(field, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
                </div>
              ))}
            </div>
            <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">Salvar alterações</button>
          </div>
        );

    case 'curriculo':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Currículo e Apresentação</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título profissional</label>
                <input type="text" value={formData.titulo} onChange={(e) => handleChange('titulo', e.target.value)} placeholder="Ex: Desenvolvedor Full Stack" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input type="text" value={formData.telefoneCurriculo} onChange={(e) => handleChange('telefoneCurriculo', e.target.value)} placeholder="(000) 00000-0000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea rows={3} value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)} placeholder="Fale um pouco sobre você..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input type="text" value={formData.endereco} onChange={(e) => handleChange('endereco', e.target.value)} placeholder="Rua, número, bairro, cidade - UF" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                <input type="text" value={formData.especialidade} onChange={(e) => handleChange('especialidade', e.target.value)} placeholder="Ex: Desenvolvimento Web" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select value={formData.categoria} onChange={(e) => handleChange('categoria', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500">
                  <option value="">Selecione uma categoria</option>
                  <option value="ti">Tecnologia da Informação</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Habilidades</label>
              <textarea rows={2} value={formData.habilidades} onChange={(e) => handleChange('habilidades', e.target.value)} placeholder="Liste suas habilidades separadas por vírgula" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Formação acadêmica</label>
              <textarea rows={3} value={formData.formacao} onChange={(e) => handleChange('formacao', e.target.value)} placeholder="Curso, instituição e ano de conclusão" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experiência profissional</label>
              <textarea rows={4} value={formData.experiencia} onChange={(e) => handleChange('experiencia', e.target.value)} placeholder="Cargo, empresa, período e principais atividades" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cursos e certificações</label>
              <textarea rows={3} value={formData.cursos} onChange={(e) => handleChange('cursos', e.target.value)} placeholder="Nome do curso, instituição e ano" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualidades pessoais</label>
              <textarea rows={2} value={formData.qualidades} onChange={(e) => handleChange('qualidades', e.target.value)} placeholder="Ex: Proativo, organizado, comunicativo..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
              <textarea rows={2} value={formData.obs} onChange={(e) => handleChange('obs', e.target.value)} placeholder="Informações adicionais relevantes" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anexar documentos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm">Arraste arquivos ou clique para upload</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX até 5MB</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">Salvar currículo</button>
              <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"><Upload className="w-4 h-4" />Importar LinkedIn</button>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Portfólio</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-1">Arraste arquivos ou clique para upload</p>
              <p className="text-sm text-gray-400">PNG, JPG, PDF até 10MB</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Arquivos enviados</h3>
              <div className="space-y-2">
                {portfolioItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded flex items-center justify-center ${item.type === 'image' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                        {item.type === 'image' ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <button onClick={() => removePortfolioItem(item.id)} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'avaliacoes':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Avaliações</h2>
              <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold text-gray-800">4.7</span>
                <span className="text-gray-500 text-sm">({avaliacoes.length} avaliações)</span>
              </div>
            </div>
            <div className="space-y-4">
              {avaliacoes.map(av => (
                <div key={av.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{av.empresa}</h3>
                      <p className="text-sm text-gray-500">{av.data}</p>
                    </div>
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < av.nota ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />)}</div>
                  </div>
                  <p className="text-gray-600">{av.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        );

    case 'suporte':
         const tickets = [
          { id: 1, cliente: 'Maria Silva', assunto: 'Dúvida sobre prazo de entrega', status: 'novo', data: '20/11/2024', mensagens: [
            { from: 'cliente', text: 'Olá! Gostaria de saber se é possível antecipar a entrega do projeto?', hora: '10:30' },
          ]},
          { id: 2, cliente: 'Tech Solutions Ltda', assunto: 'Orçamento para novo projeto', status: 'respondido', data: '19/11/2024', mensagens: [
            { from: 'cliente', text: 'Bom dia! Precisamos de um orçamento para desenvolvimento de um app mobile.', hora: '09:15' },
            { from: 'voce', text: 'Bom dia! Claro, poderia me passar mais detalhes sobre o projeto?', hora: '11:20' },
            { from: 'cliente', text: 'Seria um app de delivery para iOS e Android.', hora: '14:00' },
          ]},
          { id: 3, cliente: 'João Pedro', assunto: 'Problema com arquivo enviado', status: 'pendente', data: '18/11/2024', mensagens: [
            { from: 'cliente', text: 'O arquivo que você enviou está corrompido, pode reenviar?', hora: '16:45' },
            { from: 'voce', text: 'Desculpe pelo inconveniente! Vou verificar e reenviar em breve.', hora: '17:00' },
          ]},
          { id: 4, cliente: 'Ana Costa', assunto: 'Solicitação de alteração', status: 'fechado', data: '15/11/2024', mensagens: [
            { from: 'cliente', text: 'Preciso de uma alteração na cor do logo.', hora: '08:00' },
            { from: 'voce', text: 'Sem problemas! Qual cor você prefere?', hora: '08:30' },
            { from: 'cliente', text: 'Azul marinho, por favor.', hora: '09:00' },
            { from: 'voce', text: 'Pronto! Segue o arquivo atualizado.', hora: '10:15' },
            { from: 'cliente', text: 'Perfeito, muito obrigada!', hora: '10:30' },
          ]},
        ];
        const statusColors = { novo: 'bg-blue-100 text-blue-700', respondido: 'bg-green-100 text-green-700', pendente: 'bg-yellow-100 text-yellow-700', fechado: 'bg-gray-100 text-gray-500' };
        const statusLabels = { novo: 'Novo', respondido: 'Respondido', pendente: 'Pendente', fechado: 'Fechado' };
        const activeTicket = tickets.find(t => t.id === selectedTicket);

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Caixa de Mensagens</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tickets.filter(t => t.status === 'novo').length} novas</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{tickets.filter(t => t.status === 'pendente').length} pendentes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-1 border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <input type="text" placeholder="Buscar mensagens..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {tickets.map(ticket => (
                    <div key={ticket.id} onClick={() => setSelectedTicketState(ticket.id)} className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedTicket === ticket.id ? 'bg-cyan-50 border-l-4 border-cyan-600' : ''}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-gray-800 text-sm truncate">{ticket.cliente}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[ticket.status]}`}>{statusLabels[ticket.status]}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{ticket.assunto}</p>
                      <p className="text-xs text-gray-400 mt-1">{ticket.data}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2 border border-gray-200 rounded-lg flex flex-col">
                {activeTicket ? (
                  <>
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{activeTicket.cliente}</h3>
                          <p className="text-sm text-gray-500">{activeTicket.assunto}</p>
                        </div>
                        <select defaultValue={activeTicket.status} className="text-sm border border-gray-300 rounded-lg px-2 py-1">
                          <option value="novo">Novo</option>
                          <option value="respondido">Respondido</option>
                          <option value="pendente">Pendente</option>
                          <option value="fechado">Fechado</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex-1 p-4 space-y-3 max-h-64 overflow-y-auto bg-gray-50">
                      {activeTicket.mensagens.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === 'voce' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.from === 'voce' ? 'bg-cyan-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                            <p>{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.from === 'voce' ? 'text-cyan-100' : 'text-gray-400'}`}>{msg.hora}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 flex gap-2">
                      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Digite sua resposta..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500" />
                      <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"><Send className="w-5 h-5" /></button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 p-8">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Selecione uma conversa para visualizar</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'agenda':
        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Agenda e Disponibilidade</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-5 h-5" /></button>
                  <h3 className="font-medium text-gray-800">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                  <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => <div key={i} className="p-2 text-gray-500 font-medium">{d}</div>)}
                  {getDaysInMonth().map((day, i) => (
                    <div key={i} onClick={() => day && toggleDay(day)} className={`p-2 rounded cursor-pointer transition-colors ${!day ? '' : availability[day] ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'hover:bg-gray-100 text-gray-700'}`}>{day}</div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-100 rounded" /><span>Disponível</span></div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-100 rounded border" /><span>Indisponível</span></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Horário de trabalho</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Início', 'Fim'].map(label => (
                      <div key={label}>
                        <label className="block text-sm text-gray-600 mb-1">{label}</label>
                        <input type="time" defaultValue={label === 'Início' ? '09:00' : '18:00'} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Dias da semana</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, i) => (
                      <button key={d} className={`px-3 py-1 rounded-full text-sm ${i < 5 ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</button>
                    ))}
                  </div>
                </div>
                <button className="w-full px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">Salvar configurações</button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-cyan-600 text-cyan-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}