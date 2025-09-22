"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const navigation = [
    { name: t("nav.home", language), href: "/" },
    { name: t("nav.about", language), href: "/about" },
    { name: t("nav.fleet", language), href: "/fleet" },
    { name: t("nav.booking", language), href: "/booking" },
    { name: t("nav.reviews", language), href: "/reviews" },
    { name: t("nav.faq", language), href: "/faq" },
    { name: t("nav.contact", language), href: "/contact" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-glass backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-xl">Morfosa</span>
              <span className="text-accent-500 font-bold text-xl ml-1">Transport</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-white/80 hover:text-white">
              <Globe className="w-4 h-4 mr-2" />
              {language.toUpperCase()}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-glass backdrop-blur-md rounded-lg mt-2 border border-white/10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium rounded-md hover:bg-white/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
