"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "@/components/vehicle-card"
import { vehicles } from "@/lib/vehicles"
import { useLanguage } from "@/hooks/use-language"
import { AlertTriangle } from "lucide-react"

export default function FleetPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Armada Kendaraan" : "Our Fleet"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {language === "id"
              ? "Pilihan kendaraan berkualitas dengan driver berpengalaman dan harga yang kompetitif. Semua harga sudah termasuk driver dan BBM."
              : "Quality vehicle options with experienced drivers and competitive prices. All prices include driver and fuel."}
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Important Notice */}
        <Card className="glass-card border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {language === "id" ? "Informasi Penting" : "Important Information"}
                </h3>
                <div className="space-y-2 text-white/80">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                    {language === "id"
                      ? "⚠️ Terdapat harga tambahan untuk di luar kota"
                      : "⚠️ Additional charges apply for out-of-town trips"}
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                    {language === "id"
                      ? "Semua harga sudah termasuk driver dan BBM"
                      : "All prices include driver and fuel"}
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                    {language === "id" ? "Tidak termasuk asuransi perjalanan" : "Travel insurance not included"}
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                    {language === "id" ? "Harga dapat berubah sewaktu-waktu" : "Prices subject to change"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === "id" ? "Butuh Bantuan Memilih?" : "Need Help Choosing?"}
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {language === "id"
                  ? "Tim kami siap membantu Anda memilih kendaraan yang tepat sesuai kebutuhan perjalanan Anda."
                  : "Our team is ready to help you choose the right vehicle according to your travel needs."}
              </p>
              <Button
                size="lg"
                onClick={() => {
                  const message =
                    language === "id"
                      ? "Halo, saya butuh bantuan memilih kendaraan yang tepat untuk perjalanan saya."
                      : "Hello, I need help choosing the right vehicle for my trip."
                  const whatsappUrl = `https://wa.me/6289620928296?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank")
                }}
              >
                {language === "id" ? "Konsultasi Gratis" : "Free Consultation"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
