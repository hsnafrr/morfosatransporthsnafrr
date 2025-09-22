"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()

  const handleWhatsAppContact = (number: string) => {
    const message =
      language === "id"
        ? "Halo, saya ingin bertanya tentang layanan sewa mobil Morfosa Transport."
        : "Hello, I would like to ask about Morfosa Transport car rental services."
    const whatsappUrl = `https://wa.me/62${number.replace(/^0/, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInstagram = () => {
    window.open("https://instagram.com/morfosatransport", "_blank")
  }

  const handleTikTok = () => {
    window.open("https://tiktok.com/@morfosatransport", "_blank")
  }

  const handleGoogleMaps = () => {
    window.open("https://maps.app.goo.gl/PNkeYZDkKboTwuHC7?g_st=ac", "_blank")
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Hubungi Kami" : "Contact Us"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {language === "id"
              ? "Kami siap melayani Anda 24/7. Hubungi kami melalui berbagai channel komunikasi yang tersedia."
              : "We are ready to serve you 24/7. Contact us through various available communication channels."}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* WhatsApp Primary */}
          <Card className="glass-card text-center group hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-accent-500 font-bold text-lg mb-2">089620928296</p>
              <p className="text-white/70 text-sm mb-4">{language === "id" ? "Nomor Utama" : "Primary Number"}</p>
              <Button
                onClick={() => handleWhatsAppContact("089620928296")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {language === "id" ? "Chat Sekarang" : "Chat Now"}
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Alternative */}
          <Card className="glass-card text-center group hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">WhatsApp</h3>
              <p className="text-accent-500 font-bold text-lg mb-2">081804099113</p>
              <p className="text-white/70 text-sm mb-4">
                {language === "id" ? "Nomor Alternatif" : "Alternative Number"}
              </p>
              <Button
                onClick={() => handleWhatsAppContact("081804099113")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {language === "id" ? "Chat Sekarang" : "Chat Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="glass-card text-center group hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instagram</h3>
              <p className="text-accent-500 font-bold text-lg mb-2">@morfosatransport</p>
              <p className="text-white/70 text-sm mb-4">
                {language === "id" ? "Follow untuk update terbaru" : "Follow for latest updates"}
              </p>
              <Button
                onClick={handleInstagram}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {language === "id" ? "Follow" : "Follow"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Business Hours & Location */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-accent-500" />
                {language === "id" ? "Jam Operasional" : "Business Hours"}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">{language === "id" ? "Senin - Minggu" : "Monday - Sunday"}</span>
                  <span className="text-white font-semibold">24 Jam</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-accent-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold mb-1">
                        {language === "id" ? "Lokasi Kantor" : "Office Location"}
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed">Yogyakarta, Indonesia</p>
                      <Button onClick={handleGoogleMaps} variant="outline" size="sm" className="mt-2 bg-transparent">
                        {language === "id" ? "Lihat di Maps" : "View on Maps"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media & Additional */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === "id" ? "Media Sosial" : "Social Media"}
              </h3>
              <div className="space-y-4">
                <Button onClick={handleTikTok} variant="outline" className="w-full justify-start bg-transparent">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  TikTok: @morfosatransport
                </Button>

                <Button onClick={handleInstagram} variant="outline" className="w-full justify-start bg-transparent">
                  <Instagram className="w-5 h-5 mr-3" />
                  Instagram: @morfosatransport
                </Button>

                <div className="border-t border-white/20 pt-4 mt-6">
                  <h4 className="text-white font-semibold mb-3">
                    {language === "id" ? "Informasi Tambahan" : "Additional Information"}
                  </h4>
                  <div className="space-y-2 text-white/80 text-sm">
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                      {language === "id" ? "Respon cepat dalam 5 menit" : "Quick response within 5 minutes"}
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                      {language === "id" ? "Layanan 24/7 siap membantu" : "24/7 service ready to help"}
                    </p>
                    <p className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                      {language === "id" ? "Konsultasi gratis sebelum booking" : "Free consultation before booking"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "id" ? "Siap Membantu Perjalanan Anda" : "Ready to Help Your Journey"}
            </h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              {language === "id"
                ? "Tim customer service kami berpengalaman dan siap memberikan solusi terbaik untuk kebutuhan transportasi Anda."
                : "Our experienced customer service team is ready to provide the best solutions for your transportation needs."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => handleWhatsAppContact("089620928296")}
                className="bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {language === "id" ? "Chat WhatsApp" : "WhatsApp Chat"}
              </Button>
              <Button variant="outline" size="lg" onClick={() => (window.location.href = "/booking")}>
                {language === "id" ? "Booking Online" : "Online Booking"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
