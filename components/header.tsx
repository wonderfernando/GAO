"use client"

import { Button } from '@/components/ui/button'
import { Building2, Menu, UserCircle, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Profissionais', href: '/services' },
    { name: 'Sobre', href: '/about' },
    { name: 'Contactos', href: '/contact' },
  ]
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800  text-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
            {/*   <Building2 className="h-8 w-8 text-yellow-400" />
             */}  <Image src="/Picture1.png" alt="Logo" width={50} height={50} />
              <span className="text-xl font-bold text-grray-200">GAO</span>
              <span className="text-xl font-bold text-yellow-400">Business</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium ${pathname === item.href
                  ? 'text-yellow-400'
                  : 'text-black-500 hover:text-yellow-400'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            {!session ? (
              <div className="flex items-center space-x-4">
                <Button variant="outline" className='text-black' asChild>
                  <Link href="/login">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button asChild variant="outline" >
                  <Link className='bg-blue-500' href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="destructive" onClick={() => signOut()}>
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium ${pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!session ? (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className='text-black' asChild>
                    <Link href="/login">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button asChild variant="outline" >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => signOut()}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}