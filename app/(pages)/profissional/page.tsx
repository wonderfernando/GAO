"use client"
import React, { useState } from 'react';
import {  Gavel, UserCheck, Eye, ChevronDown, ChevronUp, Edit2, HelpCircle, DollarSignIcon } from 'lucide-react';

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>{children}</div>
);

const StatCard = ({ icon: Icon, value, label, bgColor }: { icon: React.ForwardRefExoticComponent<React.RefAttributes<SVGSVGElement>>; value: string; label: string; bgColor: string }) => (
  <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-4">
    <div className={`${bgColor} rounded-full p-3`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="font-semibold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const Progress = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${value}%` }} />
  </div>
);

const Select = ({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (value: string) => void }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
  </div>
);

const Collapsible = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-700 font-medium">{title}</span>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export default function FreelancerDashboard() {
  const [filter, setFilter] = useState('todas');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={DollarSignIcon} value="0,00Kz" label="Seus ganhos" bgColor="bg-green-500" />
          <StatCard icon={Gavel} value="0" label="Propostas enviadas" bgColor="bg-gray-600" />
          <StatCard icon={UserCheck} value="0" label="Propostas aceitas" bgColor="bg-orange-500" />
          <StatCard icon={Eye} value="0" label="Vizualizações no perfil" bgColor="bg-cyan-500" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-700 font-medium">Meu perfil</h2>
              <button className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-sm">
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-lg">👤</span>
              </div>
              <div>
                <h3 className="text-cyan-600 font-medium">João Manuel</h3>
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  {'☆'.repeat(5)}
                  <span className="text-gray-500 ml-1">(0 avaliações)</span>
                </div>
            
              </div>
            </div>

           
 
          </Card>

          {/* Projects Card */}
          <Card className="lg:col-span-3">
            <Collapsible title="Meus contractos" defaultOpen>
              <p className="text-gray-500 text-sm">Nenhum Contrato encontrado.</p>
            </Collapsible>
            
            <Collapsible title="Minhas propostas" defaultOpen>
              <div className="flex justify-end mb-4">
                <Select
                  value={filter}
                  onChange={setFilter}
                  options={[
                    { value: 'todas', label: 'Todas' },
                    { value: 'pendentes', label: 'Pendentes' },
                    { value: 'aceitas', label: 'Aceitas' },
                    { value: 'recusadas', label: 'Recusadas' },
                  ]}
                />
              </div>
              <p className="text-gray-500 text-sm text-center py-4">
                Nenhuma proposta foi encontrada.{' '}
                <a href="#" className="text-cyan-600 hover:underline">Buscar Contratos</a>.
              </p>
            </Collapsible>
          </Card>
        </div>

        {/* Help Button */}
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
            Ajuda
          </button>
        </div>
      </div>
    </div>
  );
}