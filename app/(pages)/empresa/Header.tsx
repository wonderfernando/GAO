"use client";
import { Bell, Home, LogOut, MessageCircle, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaHamburger, FaUser } from "react-icons/fa";

const Header = ({
  username,
  profile,
}: {
  username?: string | null;
  profile?: string | null;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-500 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/feed/notifications"
            className="text-white font-bold text-xl"
          >
            BusinessWave
          </Link>
        </div>

        {/* Botão menu hamburguer - mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <FaHamburger size={28} />}
        </button>

        {/* Navegação - Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-gray-100">
          <Link
            href="/empresa"
            className="flex items-center  gap-1 hover:text-yellow-300  "
          >
            <Home size={20} /> Início
          </Link>
          <Link
            href="/empresa/mensagens"
            className="flex items-center gap-1 hover:text-yellow-300"
          >
            <MessageCircle size={20} /> Mensagens
          </Link>
          <Link
            href="/empresa/notificacoes"
            className="flex items-center gap-1 hover:text-yellow-300"
          >
            <Bell size={20} /> Notificações
          </Link>

          {/* Perfil */}
          <div className="flex flex-col items-center cursor-pointer">
            <Link href={profile ? "/profissional/me" : "/me"}>
              <div className="w-8 h-8 rounded-full bg-yellow-300 flex items-center justify-center">
                <FaUser size={16} className="text-gray-700" />
              </div>
            </Link>
            <span className="text-xs">
              {username?.split(" ")[0] || "Perfil"}
            </span>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <div className="w-40 h-8 rounded-full bg-yellow-300 flex items-center text-gray-700 justify-center">
              <span className="text-xs">{profile}</span>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-6 px-3 py-1 rounded text-red-500 text-xs bg-white hover:bg-gray-100 flex items-center gap-1"
          >
            <LogOut size={16} /> Sair
          </button>
        </nav>
      </div>

      {/* Navegação - Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 border-t px-4 py-4 space-y-4 text-white">
          <Link
            href="/feed"
            className="flex items-center gap-2 hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            <Home size={20} /> Início
          </Link>

          <Link
            href="/feed/notifications"
            className="flex items-center gap-2 hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            <Bell size={20} /> Notificações
          </Link>

          <Link
            href={profile ? "/professional/me" : "/me"}
            className="flex items-center gap-2 hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaUser size={16} /> {username?.split(" ")[0] || "Utilizador"}
          </Link>

          <div className="w-40 h-8 rounded-full bg-yellow-300 flex items-center text-gray-700 justify-center">
            <span className="text-xs">{profile}</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-3 py-2 rounded bg-white text-red-500 text-sm hover:bg-gray-100 flex items-center gap-2 justify-center"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
