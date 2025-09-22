"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { vehicles } from "@/lib/vehicles"
import { generateWhatsAppLink } from "@/lib/utils"
import { Calendar, MapPin, Phone, User, Car, DollarSign } from "lucide-react"

interface BookingForm {
  nama: string
  unit: string
  kontak: string
  tanggalSewa: string
  tanggalSelesai: string
  harga: string
  tujuan: string
}

export default function BookingPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookingForm>({
    nama: "",
    unit: "",
    kontak: "",
    tanggalSewa: "",
    tanggalSelesai: "",
    harga: "",
    tujuan: "",
  })

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-fill price when vehicle is selected
    if (field === "unit") {
      const selectedVehicle = vehicles.find((v) => v.name === value)
      if (selectedVehicle) {
        setFormData((prev) => ({ ...prev, harga: selectedVehicle.price }))
      }
    }
  }

  const validateForm = (): boolean => {
    const { nama, unit, kontak, tanggalSewa, tanggalSelesai, tujuan } = formData

    if (!nama.trim()) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Nama pemesan harus diisi" : "Customer name is required",
        variant: "destructive",
      })
      return false
    }

    if (!unit) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Unit kendaraan harus dipilih" : "Vehicle unit must be selected",
        variant: "destructive",
      })
      return false
    }

    if (!kontak.trim()) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Nomor kontak harus diisi" : "Contact number is required",
        variant: "destructive",
      })
      return false
    }

    // Phone number validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    if (!phoneRegex.test(kontak.replace(/\s/g, ""))) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Format nomor telepon tidak valid" : "Invalid phone number format",
        variant: "destructive",
      })
      return false
    }

    if (!tanggalSewa) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Tanggal sewa harus diisi" : "Rental date is required",
        variant: "destructive",
      })
      return false
    }

    if (!tanggalSelesai) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Tanggal selesai harus diisi" : "End date is required",
        variant: "destructive",
      })
      return false
    }

    if (new Date(tanggalSelesai) <= new Date(tanggalSewa)) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description:
          language === "id" ? "Tanggal selesai harus setelah tanggal sewa" : "End date must be after rental date",
        variant: "destructive",
      })
      return false
    }

    if (!tujuan.trim()) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Tujuan perjalanan harus diisi" : "Destination is required",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Generate WhatsApp message
      const message = `Halo, saya ingin memesan unit:

Nama: ${formData.nama}
Unit: ${formData.unit}
Tanggal sewa: ${formData.tanggalSewa}
Tanggal selesai: ${formData.tanggalSelesai}
Tujuan: ${formData.tujuan}
Harga paket: ${formData.harga}

⚠️ Terdapat harga tambahan untuk di luar kota.`

      // Try to save to Supabase (fallback gracefully if not configured)
      try {
        const response = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: formData.nama,
            unit: formData.unit,
            kontak: formData.kontak,
            tanggal_sewa: formData.tanggalSewa,
            tanggal_selesai: formData.tanggalSelesai,
            harga_paket: formData.harga,
            tujuan: formData.tujuan,
          }),
        })

        if (!response.ok) {
          console.log("Supabase save failed, continuing with WhatsApp...")
        }
      } catch (error) {
        console.log("Supabase not configured, continuing with WhatsApp...")
      }

      // Open WhatsApp (primary number)
      const primaryWhatsApp = generateWhatsAppLink("089620928296", message)
      window.open(primaryWhatsApp, "_blank")

      // Show success message
      toast({
        title: language === "id" ? "Berhasil!" : "Success!",
        description:
          language === "id"
            ? "Booking berhasil dikirim ke WhatsApp. Kami akan segera menghubungi Anda."
            : "Booking successfully sent to WhatsApp. We will contact you soon.",
      })

      // Reset form
      setFormData({
        nama: "",
        unit: "",
        kontak: "",
        tanggalSewa: "",
        tanggalSelesai: "",
        harga: "",
        tujuan: "",
      })
    } catch (error) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description:
          language === "id" ? "Terjadi kesalahan. Silakan coba lagi." : "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Booking Kendaraan" : "Vehicle Booking"}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {language === "id"
              ? "Isi formulir di bawah untuk memesan kendaraan. Kami akan menghubungi Anda melalui WhatsApp."
              : "Fill out the form below to book a vehicle. We will contact you via WhatsApp."}
          </p>
        </div>

        {/* Booking Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              {language === "id" ? "Formulir Pemesanan" : "Booking Form"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama Pemesan */}
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-white flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {language === "id" ? "Nama Pemesan" : "Customer Name"} *
                  </Label>
                  <Input
                    id="nama"
                    type="text"
                    value={formData.nama}
                    onChange={(e) => handleInputChange("nama", e.target.value)}
                    placeholder={language === "id" ? "Masukkan nama lengkap" : "Enter full name"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                {/* Unit Kendaraan */}
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-white flex items-center">
                    <Car className="w-4 h-4 mr-2" />
                    {language === "id" ? "Unit yang Dipilih" : "Selected Vehicle"} *
                  </Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder={language === "id" ? "Pilih kendaraan" : "Select vehicle"} />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.name}>
                          {vehicle.name} - {vehicle.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* No Kontak */}
                <div className="space-y-2">
                  <Label htmlFor="kontak" className="text-white flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {language === "id" ? "No Kontak" : "Contact Number"} *
                  </Label>
                  <Input
                    id="kontak"
                    type="tel"
                    value={formData.kontak}
                    onChange={(e) => handleInputChange("kontak", e.target.value)}
                    placeholder={language === "id" ? "08xxxxxxxxxx" : "08xxxxxxxxxx"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                {/* Harga Paket */}
                <div className="space-y-2">
                  <Label htmlFor="harga" className="text-white flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {language === "id" ? "Harga Paket" : "Package Price"}
                  </Label>
                  <Input
                    id="harga"
                    type="text"
                    value={formData.harga}
                    onChange={(e) => handleInputChange("harga", e.target.value)}
                    placeholder="Rp 0"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    readOnly
                  />
                </div>

                {/* Tanggal Sewa */}
                <div className="space-y-2">
                  <Label htmlFor="tanggalSewa" className="text-white flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {language === "id" ? "Tanggal Sewa" : "Rental Date"} *
                  </Label>
                  <Input
                    id="tanggalSewa"
                    type="date"
                    value={formData.tanggalSewa}
                    onChange={(e) => handleInputChange("tanggalSewa", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                {/* Tanggal Selesai */}
                <div className="space-y-2">
                  <Label htmlFor="tanggalSelesai" className="text-white flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {language === "id" ? "Tanggal Selesai" : "End Date"} *
                  </Label>
                  <Input
                    id="tanggalSelesai"
                    type="date"
                    value={formData.tanggalSelesai}
                    onChange={(e) => handleInputChange("tanggalSelesai", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>

              {/* Tujuan */}
              <div className="space-y-2">
                <Label htmlFor="tujuan" className="text-white flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === "id" ? "Tujuan" : "Destination"} *
                </Label>
                <Textarea
                  id="tujuan"
                  value={formData.tujuan}
                  onChange={(e) => handleInputChange("tujuan", e.target.value)}
                  placeholder={language === "id" ? "Masukkan tujuan perjalanan" : "Enter travel destination"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  rows={3}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto px-8 py-3 text-lg">
                  {isSubmitting
                    ? language === "id"
                      ? "Mengirim..."
                      : "Sending..."
                    : language === "id"
                      ? "Kirim Booking"
                      : "Send Booking"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Alternative Contact */}
        <div className="text-center mt-8">
          <p className="text-white/70 mb-4">{language === "id" ? "Atau hubungi langsung:" : "Or contact directly:"}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                const message =
                  language === "id"
                    ? "Halo, saya ingin bertanya tentang sewa mobil."
                    : "Hello, I would like to ask about car rental."
                const whatsappUrl = generateWhatsAppLink("081804099113", message)
                window.open(whatsappUrl, "_blank")
              }}
            >
              WhatsApp: 081804099113
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
