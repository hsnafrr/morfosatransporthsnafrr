"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Calendar, User, Phone, MapPin, Car } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency, generateWhatsAppLink, validatePhoneNumber } from "@/lib/utils"
import { vehicles } from "@/lib/vehicles"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/translations"
import type { BookingFormData } from "@/types"

export function BookingForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<BookingFormData>({
    nama: "",
    unit: "",
    kontak: "",
    tanggalSewa: "",
    tanggalSelesai: "",
    hargaPaket: 0,
    tujuan: "",
  })
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}

    if (!formData.nama.trim()) {
      newErrors.nama = language === "id" ? "Nama harus diisi" : "Name is required"
    }

    if (!formData.unit) {
      newErrors.unit = language === "id" ? "Pilih kendaraan" : "Select a vehicle"
    }

    if (!formData.kontak.trim()) {
      newErrors.kontak = language === "id" ? "Nomor kontak harus diisi" : "Contact number is required"
    } else if (!validatePhoneNumber(formData.kontak)) {
      newErrors.kontak = language === "id" ? "Format nomor telepon tidak valid" : "Invalid phone number format"
    }

    if (!formData.tanggalSewa) {
      newErrors.tanggalSewa = language === "id" ? "Tanggal sewa harus diisi" : "Start date is required"
    }

    if (!formData.tanggalSelesai) {
      newErrors.tanggalSelesai = language === "id" ? "Tanggal selesai harus diisi" : "End date is required"
    }

    if (!formData.tujuan.trim()) {
      newErrors.tujuan = language === "id" ? "Tujuan harus diisi" : "Destination is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId)
    if (vehicle) {
      setFormData((prev) => ({
        ...prev,
        unit: vehicle.name,
        hargaPaket: vehicle.price,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Save to Supabase (optional)
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => {
        // Graceful fallback if Supabase is not configured
        console.log("Booking saved locally, Supabase not configured")
      })

      // Generate WhatsApp message
      const message =
        language === "id"
          ? `Halo, saya ingin memesan unit:

Nama: ${formData.nama}
Unit: ${formData.unit}
No. Kontak: ${formData.kontak}
Tanggal sewa: ${formData.tanggalSewa}
Tanggal selesai: ${formData.tanggalSelesai}
Tujuan: ${formData.tujuan}
Harga paket: ${formatCurrency(formData.hargaPaket)}/hari

⚠️ Terdapat harga tambahan untuk di luar kota.`
          : `Hello, I would like to book a vehicle:

Name: ${formData.nama}
Vehicle: ${formData.unit}
Contact: ${formData.kontak}
Start date: ${formData.tanggalSewa}
End date: ${formData.tanggalSelesai}
Destination: ${formData.tujuan}
Package price: ${formatCurrency(formData.hargaPaket)}/day

⚠️ Additional cost for out-of-town trips.`

      // Open WhatsApp
      const whatsappUrl = generateWhatsAppLink("089620928296", message)
      window.open(whatsappUrl, "_blank")

      // Reset form
      setFormData({
        nama: "",
        unit: "",
        kontak: "",
        tanggalSewa: "",
        tanggalSelesai: "",
        hargaPaket: 0,
        tujuan: "",
      })
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {language === "id" ? "Form Booking Kendaraan" : "Vehicle Booking Form"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-white font-medium">
              <User className="w-4 h-4" />
              <span>{t("booking.form.name", language)}</span>
            </label>
            <Input
              value={formData.nama}
              onChange={(e) => setFormData((prev) => ({ ...prev, nama: e.target.value }))}
              placeholder={language === "id" ? "Masukkan nama lengkap" : "Enter full name"}
            />
            {errors.nama && <p className="text-red-400 text-sm">{errors.nama}</p>}
          </div>

          {/* Vehicle Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-white font-medium">
              <Car className="w-4 h-4" />
              <span>{t("booking.form.vehicle", language)}</span>
            </label>
            <select
              value={vehicles.find((v) => v.name === formData.unit)?.id || ""}
              onChange={(e) => handleVehicleChange(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            >
              <option value="" className="bg-primary-950 text-white">
                {language === "id" ? "Pilih kendaraan" : "Select vehicle"}
              </option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id} className="bg-primary-950 text-white">
                  {vehicle.name} - {formatCurrency(vehicle.price)}/hari
                </option>
              ))}
            </select>
            {errors.unit && <p className="text-red-400 text-sm">{errors.unit}</p>}
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-white font-medium">
              <Phone className="w-4 h-4" />
              <span>{t("booking.form.contact", language)}</span>
            </label>
            <Input
              value={formData.kontak}
              onChange={(e) => setFormData((prev) => ({ ...prev, kontak: e.target.value }))}
              placeholder={language === "id" ? "Contoh: 08123456789" : "Example: 08123456789"}
            />
            {errors.kontak && <p className="text-red-400 text-sm">{errors.kontak}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-white font-medium">
                <Calendar className="w-4 h-4" />
                <span>{t("booking.form.start_date", language)}</span>
              </label>
              <Input
                type="date"
                value={formData.tanggalSewa}
                onChange={(e) => setFormData((prev) => ({ ...prev, tanggalSewa: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.tanggalSewa && <p className="text-red-400 text-sm">{errors.tanggalSewa}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-white font-medium">
                <Calendar className="w-4 h-4" />
                <span>{t("booking.form.end_date", language)}</span>
              </label>
              <Input
                type="date"
                value={formData.tanggalSelesai}
                onChange={(e) => setFormData((prev) => ({ ...prev, tanggalSelesai: e.target.value }))}
                min={formData.tanggalSewa || new Date().toISOString().split("T")[0]}
              />
              {errors.tanggalSelesai && <p className="text-red-400 text-sm">{errors.tanggalSelesai}</p>}
            </div>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-white font-medium">
              <MapPin className="w-4 h-4" />
              <span>{t("booking.form.destination", language)}</span>
            </label>
            <Textarea
              value={formData.tujuan}
              onChange={(e) => setFormData((prev) => ({ ...prev, tujuan: e.target.value }))}
              placeholder={language === "id" ? "Masukkan tujuan perjalanan" : "Enter travel destination"}
              rows={3}
            />
            {errors.tujuan && <p className="text-red-400 text-sm">{errors.tujuan}</p>}
          </div>

          {/* Price Display */}
          {formData.hargaPaket > 0 && (
            <div className="bg-accent-500/20 border border-accent-500/30 rounded-lg p-4">
              <p className="text-accent-500 font-semibold">
                {language === "id" ? "Harga Paket:" : "Package Price:"} {formatCurrency(formData.hargaPaket)}/hari
              </p>
              <p className="text-white/70 text-sm mt-1">{t("common.additional_cost", language)}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            {isSubmitting ? (language === "id" ? "Mengirim..." : "Sending...") : t("booking.form.submit", language)}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
