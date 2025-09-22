"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Shield, Clock, Users, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { VehicleCard } from "@/components/vehicle-card"
import { vehicles } from "@/lib/vehicles"
import { generateWhatsAppLink } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"

export default function HomePage() {
  const { language } = useLanguage()

  const handleWhatsAppContact = () => {
    const message =
      language === "id"
        ? "Halo, saya tertarik dengan layanan sewa mobil Morfosa Transport. Mohon informasi lebih lanjut."
        : "Hello, I am interested in Morfosa Transport car rental services. Please provide more information."

    const whatsappUrl = generateWhatsAppLink("089620928296", message)
    window.open(whatsappUrl, "_blank")
  }

  const features = [
    {
      icon: Shield,
      title: language === "id" ? "Terpercaya" : "Trusted",
      description:
        language === "id"
          ? "Melayani sejak 2008 dengan reputasi terbaik"
          : "Serving since 2008 with the best reputation",
    },
    {
      icon: Users,
      title: language === "id" ? "Driver Berpengalaman" : "Experienced Drivers",
      description: language === "id" ? "Driver profesional dan berpengalaman" : "Professional and experienced drivers",
    },
    {
      icon: Clock,
      title: language === "id" ? "Layanan 24 Jam" : "24 Hour Service",
      description: language === "id" ? "Siap melayani kapan saja Anda butuhkan" : "Ready to serve whenever you need",
    },
    {
      icon: Star,
      title: language === "id" ? "Harga Terjangkau" : "Affordable Prices",
      description:
        language === "id" ? "Harga kompetitif dengan kualitas terbaik" : "Competitive prices with the best quality",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90" />
        <div className="absolute inset-0 speed-lines opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block">{t("home.hero.title", language)}</span>
              <span className="block text-accent-500 mt-2">Morfosa Transport</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {t("home.hero.subtitle", language)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={handleWhatsAppContact} size="lg" className="text-lg px-8 py-4 h-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("common.contact_us", language)}
              </Button>

              <Link href="/fleet">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto">
                  {t("nav.fleet", language)}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>089620928296</span>
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>081804099113</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Car Image */}
        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="float-animation">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/innova.jpg-iyz7M6nUc4wqMMdZ4ihAjkLX4DWaXU.png"
              alt="Toyota Innova"
              width={300}
              height={200}
              className="opacity-20"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === "id" ? "Mengapa Pilih Kami?" : "Why Choose Us?"}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {language === "id"
                ? "Kami berkomitmen memberikan layanan terbaik untuk perjalanan Anda"
                : "We are committed to providing the best service for your journey"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === "id" ? "Armada Pilihan" : "Featured Fleet"}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {language === "id"
                ? "Kendaraan berkualitas dengan harga terjangkau"
                : "Quality vehicles at affordable prices"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {vehicles.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/fleet">
              <Button size="lg" variant="outline">
                {language === "id" ? "Lihat Semua Armada" : "View All Fleet"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {language === "id" ? "Promo Spesial!" : "Special Promo!"}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {language === "id"
                ? "Dapatkan diskon khusus untuk sewa jangka panjang. Hubungi kami sekarang!"
                : "Get special discounts for long-term rentals. Contact us now!"}
            </p>
            <Button onClick={handleWhatsAppContact} variant="secondary" size="lg" className="text-lg px-8 py-4 h-auto">
              <MessageCircle className="w-5 h-5 mr-2" />
              {language === "id" ? "Tanya Promo" : "Ask About Promo"}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {language === "id" ? "Siap Untuk Perjalanan Anda?" : "Ready For Your Journey?"}
            </h2>
            <p className="text-xl text-white/80">
              {language === "id"
                ? "Booking sekarang dan nikmati perjalanan yang nyaman bersama kami"
                : "Book now and enjoy a comfortable journey with us"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="text-lg px-8 py-4 h-auto">
                  {t("common.book_now", language)}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                onClick={handleWhatsAppContact}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-transparent"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {language === "id" ? "Chat WhatsApp" : "WhatsApp Chat"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
