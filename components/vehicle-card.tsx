"use client"

import Image from "next/image"
import { MessageCircle, Users, Fuel } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, generateWhatsAppLink } from "@/lib/utils"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"
import type { Vehicle } from "@/types"

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { language } = useLanguage()

  const handleBooking = () => {
    const message =
      language === "id"
        ? `Halo, saya tertarik untuk menyewa ${vehicle.name} dengan harga ${formatCurrency(vehicle.price)}/hari. Mohon informasi lebih lanjut.`
        : `Hello, I'm interested in renting ${vehicle.name} at ${formatCurrency(vehicle.price)}/day. Please provide more information.`

    const whatsappUrl = generateWhatsAppLink("089620928296", message)
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="group hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 bg-accent-500 text-primary-950 px-3 py-1 rounded-full text-sm font-semibold">
          {formatCurrency(vehicle.price)}/hari
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>

        <div className="flex items-center space-x-4 text-white/70 text-sm mb-4">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>
              {vehicle.seats} {language === "id" ? "kursi" : "seats"}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Fuel className="w-4 h-4" />
            <span>{language === "id" ? "BBM" : "Fuel"}</span>
          </div>
        </div>

        <div className="space-y-2">
          {vehicle.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span className="text-white/80 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button onClick={handleBooking} className="w-full" size="lg">
          <MessageCircle className="w-4 h-4 mr-2" />
          {t("common.book_now", language)}
        </Button>
      </CardFooter>
    </Card>
  )
}
