"use client";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
// import logo from '@/app/assets/image/logo.png';

import { MenuGroup, Role, MenuItem, MenuIcon } from "@/app/config/menu";
import { getMenuForRole } from "@/lib/getMenuForRole";
import { FaUser } from "react-icons/fa";
import { Breadcrumbs } from "@/components/ui/breadcrumb";

const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
    <div className="h-6 bg-gray-300 rounded w-2/4"></div>
    <div className="h-6 bg-gray-300 rounded w-5/6"></div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") return <div title=" dashboard..." />;

  const tipo = session?.user?.tipo as Role | undefined;
  const username = session?.user.nome;

  const menuItems: MenuGroup[] = tipo ? getMenuForRole(tipo) : [];

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        tipo={tipo}
        menuItems={menuItems}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1 md:ml-64">
        <Header username={username} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 mt-8 overflow-auto pb-16">
          <div className="p-4">
            <Breadcrumbs></Breadcrumbs>
          </div>
          {status === "authenticated" ? children : <Skeleton />}
        </main>
        <Footer tipo={tipo} />
      </div>
    </div>
  );
};

const Sidebar: React.FC<{
  tipo: string | null | undefined;
  menuItems: MenuGroup[];
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ tipo, menuItems, sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const renderLink = (item: MenuItem) => {
    const isActive = pathname === item.link;
    return (
      <Link
        key={`${item.link}-${item.name}`}
        href={item.link}
        className={`flex items-center mt-2 mb-4 p-2  transition ${
          isActive
            ? "bg-white text-gray-900 hover:text-yellow-500 font-light"
            : "hover:bg-gray-100 hover:text-yellow-600"
        }`}
      >
        {React.createElement(item.icon, { className: "w-5 h-5 mr-2" })}
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen p-4 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white shadow-lg hidden md:flex flex-col z-50 overflow-y-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h1 className="text-xl font-bold">Business Wave</h1>
          </div>
        </div>

        {/* ICONE DO USER */}
        <hr />
        <div className="flex items-center justify-center mb-2 mt-6 ">
          <div className="relative">
            <div className="rounded-full border-4 border-white p-1">
              <div className="rounded-full border-4 border-blue-500 bg-gray-900 w-24 h-24 flex items-center justify-center">
                <FaUser size={60}></FaUser>
              </div>
            </div>
          </div>
        </div>
        {/* ////////////// */}

        <div className="flex items-center justify-center mb-2">
          <h2 className="text-sm text-white p-4 font-light">{tipo}</h2>
        </div>
        <hr />
        <nav className="mt-4 space-y-2 ">
          {menuItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-yellow-400 font-bold mt-8 mb-1 text-sm uppercase">
                {group.title}
              </h3>
              {group.children.map(renderLink)}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen p-4 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 text-white shadow-lg z-50 transition-transform flex flex-col md:hidden overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <h1 className="text-xl font-bold">Business Wave</h1>
          </div>
        </div>

        {/* ICONE DO USER */}
        <hr />
        <div className="flex items-center justify-center mb-2 mt-6 ">
          <div className="relative">
            <div className="rounded-full border-4 border-white p-1">
              <div className="rounded-full border-4 border-blue-500 bg-gray-900 w-24 h-24 flex items-center justify-center">
                <FaUser size={60}></FaUser>
              </div>
            </div>
          </div>
        </div>
        {/* ////////////// */}

        <div className="flex items-center justify-center mb-2">
          <h2 className="text-sm text-white p-4 font-light">{tipo}</h2>
        </div>
        <hr />
        <nav className="mt-4 space-y-2 ">
          {menuItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-yellow-400 font-bold mt-8 mb-1 text-sm uppercase">
                {group.title}
              </h3>
              {group.children.map(renderLink)}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

const Header: React.FC<{
  username: string | null | undefined;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ username, setSidebarOpen }) => (
  <header className="p-4 bg-white shadow-md flex items-center justify-between">
    <div className="flex items-center">
      <button
        className="md:hidden p-2 mr-2"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>
      <span className="font-medium">Olá, {username}</span>
    </div>
    <button
      className="p-2 rounded-lg hover:bg-gray-200 transition"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Logout
    </button>
  </header>
);

const Footer: React.FC<{ tipo: string | null | undefined }> = ({ tipo }) => (
  <footer className="p-4 text-center bg-gray shadow-md border-1 relative z-10 w-full">
    <p>
      &copy; {new Date().getFullYear()}{" "}
      <span className="font-semibold">Business Wave</span>. Todos os direitos
      reservados. <br></br>{" "}
      <a
        href="https://kivembasoft.com"
        target="_blank"
        className="text-blue-600 hover:underline"
      >
        KivembaSoft
      </a>
    </p>
  </footer>
);

export default Layout;
