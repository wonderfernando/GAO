"use client";

import {
  LayoutDashboard,
  User,
  FolderKanban,
  FilePlus2,
  ClipboardList,
  Workflow,
  File,
  Settings,
  ShieldCheck,
  LogOut,
  Bell,
  ActivitySquare,
  Archive,
  ClipboardCheck,
  ListTodo,
  LucideIcon,
  Users,
  Contact2Icon,
  StepForwardIcon,
  Stethoscope,
  BarChart,
  Printer,
} from "lucide-react";
import { FaCcVisa, FaPassport, FaRunning } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export type Role = "ADMINISTRADOR" | "PROFISSIONAL" | "EMPRESA";
export type MenuIcon = IconType | LucideIcon;
export type MenuItem = {
  name: string;
  link: string;
  icon: MenuIcon;
  type: "item";
  roles: Role[];
};

export type MenuGroup = {
  title: string;
  type: "group";
  roles: Role[];
  children: MenuItem[];
};

const menus: MenuGroup[] = [
  // ADMINISTRADOR
  {
    title: "ADMINISTRADOR",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Dashboard",
        link: "/dashboard#/suporte",
        icon: LayoutDashboard,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Usuários",
        link: "/users",
        icon: User,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Configurações",
        link: "/settings/#superte",
        icon: Settings,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Segurança",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Permissões",
        link: "/perfils/#suporte",
        icon: ShieldCheck,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },

  // ADMINISTRADOR
  {
    title: "Painel de Controlo",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Dashboard",
        link: "/dashboard/",
        icon: LayoutDashboard,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Gestão de Clientes",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Clientes",
        link: "/dashboard/clientes",
        icon: User,
        type: "item",
        roles: ["ADMINISTRADOR", "PROFISSIONAL"],
      },
      {
        name: "Projetos",
        link: "/dashboard/projetos",
        icon: FolderKanban,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Processos",
        link: "/dashboard/processos",
        icon: FilePlus2,
        type: "item",
        roles: ["ADMINISTRADOR", "PROFISSIONAL"],
      },
    ],
  },
  {
    title: "Tarefas & Fases",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Fases do Processo",
        link: "/dashboard/fases",
        icon: Workflow,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Tarefas",
        link: "/dashboard/tarefas",
        icon: ListTodo,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  // {
  //     title: "Controle de documentos",
  //     type: "group",
  //     roles: ["ADMINISTRADOR"],
  //     children: [
  //         { name: "Passaportes", link: "/dashboard/passaportes", icon: FaPassport, type: "item", roles: ["ADMINISTRADOR"] },
  //         { name: "Vistos", link: "#", icon: ListTodo, type: "item", roles: ["ADMINISTRADOR"] },
  //     ]
  // },
  {
    title: "Notificações & Auditoria",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      // { name: "Notificações", link: "/dashboard/notificacoes", icon: Bell, type: "item", roles: ["ADMINISTRADOR"] },
      {
        name: "Auditoria",
        link: "/dashboard/logs",
        icon: ActivitySquare,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Perfil de Usuários",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Usuários",
        link: "/dashboard/users",
        icon: Users,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Estatistica & Relatorios",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Estatisticas",
        link: "/dashboard/stats",
        icon: BarChart,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Relatórios",
        link: "/dashboard/stats/relatorios",
        icon: Printer,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Configuração",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Tipos de Visto",
        link: "/dashboard/tipo-de-visto",
        icon: Contact2Icon,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Fases do processo(tarefas)",
        link: "/dashboard/fases",
        icon: Stethoscope,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },

  // PROFISSIONAL
  {
    title: "Gestao de Processos& Taref.",
    type: "group",
    roles: ["PROFISSIONAL"],
    children: [
      {
        name: "Processos",
        link: "/dashboard/processos",
        icon: FolderKanban,
        type: "item",
        roles: ["PROFISSIONAL"],
      },
      {
        name: "Tarefas",
        link: "/dashboard/tarefas",
        icon: ListTodo,
        type: "item",
        roles: ["PROFISSIONAL"],
      },
    ],
  },
  {
    title: "Projetos & Clientes ",
    type: "group",
    roles: ["PROFISSIONAL"],
    children: [
      {
        name: "Projetos",
        link: "/dashboard/projetos",
        icon: FolderKanban,
        type: "item",
        roles: ["PROFISSIONAL"],
      },
      {
        name: "Clientes",
        link: "/dashboard/clientes",
        icon: ListTodo,
        type: "item",
        roles: ["PROFISSIONAL"],
      },
    ],
  },
  {
    title: "Notificações",
    type: "group",
    roles: ["PROFISSIONAL"],
    children: [
      {
        name: "Alertas",
        link: "/dashboard/notificacoes",
        icon: Bell,
        type: "item",
        roles: ["PROFISSIONAL"],
      },
    ],
  },
];

export { menus };
