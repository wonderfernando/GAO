import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a1833] text-white mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
        <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
          About Us
        </h3>
        <p className="mt-4 text-base text-gray-300">
        O BusinessWave conecta empresas a profissionais especializados em 
        soluções administrativas, jurídicas, tributárias e de desenvolvimento organizacional.
        </p>
        </div>         
        <div>
        <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
          Contactos
        </h3>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center text-gray-300">
          <MessageCircle className="h-5 w-5 mr-2" />
          WhatsApp: 925 220 199
          </li>
          <li className="text-gray-300">
          Suporte: 923 000 000
          </li>
        </ul>
        </div>

        <div>
        <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
         Seguraça
        </h3>
        <ul className="mt-4 space-y-4">
          <li>
          <Link href="/privacy" className="text-gray-300 hover:text-gray-900">
            Privacy Policy
          </Link>
          </li>
          <li>
          <Link href="/terms" className="text-gray-300 hover:text-gray-900">
            Terms of Service
          </Link>
          </li>
        </ul>
        </div>

        <div>
        <h3 className="text-sm font-semibold text-blue-400 tracking-wider uppercase">
          Redes Sociais
        </h3>
        <div className="mt-4 flex space-x-6">
          <a
          href="https://facebook.businesswave.com"
          className="text-blue-400 hover:text-gray-100"
          target="_blank"
          rel="noopener noreferrer"
          >
          <Facebook className="h-6 w-6" />
          </a>
          <a
          href="https://instagram.com/businesswave.negocio"
          className="text-blue-400 hover:text-gray-100"
          target="_blank"
          rel="noopener noreferrer"
          >
          <Instagram className="h-6 w-6" />
          </a>
          <a
          href="https://linkedin.com/company/businesswave.negocio"
          className="text-blue-400 hover:text-gray-100"
          target="_blank"
          rel="noopener noreferrer"
          >
          <Linkedin className="h-6 w-6" />
          </a>
        </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-8">
        <p className="text-base text-blue-400 text-center">
        © {new Date().getFullYear()} BusinessWave. Todos os direitos reservados.
        </p>
      </div>
      </div>
    </footer>
  )
}