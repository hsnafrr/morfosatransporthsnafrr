"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Tentang Morfosa Transport" : "About Morfosa Transport"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {language === "id"
              ? "Melayani dengan dedikasi tinggi sejak 2008, kami berkomitmen memberikan layanan transportasi terbaik untuk perjalanan Anda."
              : "Serving with high dedication since 2008, we are committed to providing the best transportation services for your journey."}
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <Card className="glass-card">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent-500/30">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/founder.jpg-sADzMpXM57EgjXjseCuJguN6Ua571j.jpeg"
                    alt="Mr. Salim Jefry - Founder Morfosa Transport"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mr. Salim Jefry</h3>
                <p className="text-accent-500 font-semibold mb-4">
                  {language === "id" ? "Pendiri & CEO" : "Founder & CEO"}
                </p>
                <p className="text-white/70 leading-relaxed">
                  {language === "id"
                    ? "Dengan visi memberikan layanan transportasi yang aman, nyaman, dan terpercaya, beliau mendirikan Morfosa Transport pada tahun 2008."
                    : "With a vision to provide safe, comfortable, and reliable transportation services, he founded Morfosa Transport in 2008."}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {language === "id" ? "Sejarah Perusahaan" : "Company History"}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {language === "id"
                    ? "Morfosa Transport didirikan pada tahun 2008 oleh Mr. Salim Jefry dengan komitmen untuk memberikan layanan sewa mobil yang profesional dan terpercaya. Berawal dari keinginan untuk membantu masyarakat dalam memenuhi kebutuhan transportasi yang aman dan nyaman."
                    : "Morfosa Transport was founded in 2008 by Mr. Salim Jefry with a commitment to provide professional and reliable car rental services. Starting from the desire to help the community meet their safe and comfortable transportation needs."}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {language === "id" ? "Visi & Misi" : "Vision & Mission"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-accent-500 mb-2">{language === "id" ? "Visi" : "Vision"}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {language === "id"
                        ? "Menjadi penyedia layanan transportasi terdepan yang memberikan pengalaman perjalanan terbaik bagi setiap pelanggan."
                        : "To become a leading transportation service provider that delivers the best travel experience for every customer."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-500 mb-2">{language === "id" ? "Misi" : "Mission"}</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {language === "id"
                        ? "Memberikan layanan sewa mobil yang aman, nyaman, dan terpercaya dengan harga yang kompetitif serta driver yang berpengalaman."
                        : "Providing safe, comfortable, and reliable car rental services at competitive prices with experienced drivers."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">15+</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {language === "id" ? "Tahun Pengalaman" : "Years Experience"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "id" ? "Melayani dengan dedikasi sejak 2008" : "Serving with dedication since 2008"}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">6</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {language === "id" ? "Jenis Kendaraan" : "Vehicle Types"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "id" ? "Berbagai pilihan sesuai kebutuhan" : "Various options according to needs"}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {language === "id" ? "Layanan Siaga" : "Standby Service"}
              </h3>
              <p className="text-white/70 text-sm">
                {language === "id" ? "Siap melayani kapan saja dibutuhkan" : "Ready to serve whenever needed"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Values */}
        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              {language === "id" ? "Nilai-Nilai Perusahaan" : "Company Values"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-accent-500 mb-2">
                  {language === "id" ? "Kepercayaan" : "Trust"}
                </h3>
                <p className="text-white/70 text-sm">
                  {language === "id"
                    ? "Membangun kepercayaan melalui layanan yang konsisten"
                    : "Building trust through consistent service"}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-accent-500 mb-2">
                  {language === "id" ? "Keamanan" : "Safety"}
                </h3>
                <p className="text-white/70 text-sm">
                  {language === "id"
                    ? "Mengutamakan keselamatan dalam setiap perjalanan"
                    : "Prioritizing safety in every journey"}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-accent-500 mb-2">
                  {language === "id" ? "Kualitas" : "Quality"}
                </h3>
                <p className="text-white/70 text-sm">
                  {language === "id" ? "Memberikan layanan berkualitas tinggi" : "Providing high-quality service"}
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-accent-500 mb-2">
                  {language === "id" ? "Inovasi" : "Innovation"}
                </h3>
                <p className="text-white/70 text-sm">
                  {language === "id"
                    ? "Terus berinovasi untuk pelayanan terbaik"
                    : "Continuously innovating for the best service"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
