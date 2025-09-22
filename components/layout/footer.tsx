"use client"

import Link from "next/link"
import { MessageCircle, Instagram, Music, MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <span className="text-white font-bold text-xl">Morfosa</span>
                <span className="text-accent-500 font-bold text-xl ml-1">Transport</span>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              {language === "id"
                ? "Layanan sewa mobil terpercaya sejak 2008 dengan driver berpengalaman dan harga terjangkau."
                : "Trusted car rental service since 2008 with experienced drivers and affordable prices."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-500">
              {language === "id" ? "Tautan Cepat" : "Quick Links"}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.about", language)}
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.fleet", language)}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.booking", language)}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white transition-colors">
                  {t("nav.faq", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-500">{language === "id" ? "Kontak" : "Contact"}</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-500" />
                <span className="text-white/70 text-sm">089620928296</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-accent-500" />
                <span className="text-white/70 text-sm">081804099113</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-accent-500" />
                <span className="text-white/70 text-sm">info@morfosarentcar.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent-500">{language === "id" ? "Ikuti Kami" : "Follow Us"}</h3>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/6289620928296"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com/morfosatransport"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://tiktok.com/@morfosatransport"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <Music className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://maps.google.com/?q=Morfosa+Transport"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <MapPin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2024 Morfosa Transport. {language === "id" ? "Semua hak dilindungi." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
