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
import {
  FaBusinessTime,
  FaCcVisa,
  FaCog,
  FaPassport,
  FaPersonBooth,
  FaRegIdCard,
  FaRunning,
  FaTachometerAlt,
  FaUser,
  FaUserAltSlash,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

export type Role = "ADMINISTRADOR" | "EMPRESA" | "PROFISSIONAL";
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
    title: "Resumo",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Dashboard",
        link: "/admin/dashboard",
        icon: FaTachometerAlt,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },

  {
    title: "GEST. De clientes",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Empresas",
        link: "/admin/empresas",
        icon: FaBusinessTime,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Profissionais",
        link: "/admin/profissionais",
        icon: FaPersonBooth,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "GEST. De pedidos",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Subscrições",
        link: "/admin/subscricoes",
        icon: FaPassport,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "GEST. De conteúdos",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Categorias",
        link: "/admin/categorias",
        icon: FaRegIdCard,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
      {
        name: "Serviços",
        link: "/admin/servicos",
        icon: FaCcVisa,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
  {
    title: "Configurações",
    type: "group",
    roles: ["ADMINISTRADOR"],
    children: [
      {
        name: "Perfil",
        link: "/admin/configuracoes",
        icon: FaCog,
        type: "item",
        roles: ["ADMINISTRADOR"],
      },
    ],
  },
];

export { menus };
