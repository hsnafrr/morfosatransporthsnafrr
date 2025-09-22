"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { Lock, Eye, Calendar, User, Car, MapPin, Phone, DollarSign } from "lucide-react"

interface Booking {
  id: string
  nama: string
  unit: string
  kontak: string
  tanggal_sewa: string
  tanggal_selesai: string
  harga_paket: string
  tujuan: string
  created_at: string
}

export default function AdminPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState("")
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/bookings", {
        headers: {
          "x-admin-pin": pin,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
        setIsAuthenticated(true)
        toast({
          title: language === "id" ? "Berhasil" : "Success",
          description: language === "id" ? "Login berhasil" : "Login successful",
        })
      } else {
        toast({
          title: language === "id" ? "Error" : "Error",
          description: language === "id" ? "PIN salah" : "Wrong PIN",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: language === "id" ? "Gagal terhubung ke server" : "Failed to connect to server",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPin("")
    setBookings([])
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">
                {language === "id" ? "Admin Dashboard" : "Admin Dashboard"}
              </CardTitle>
              <p className="text-white/70">
                {language === "id" ? "Masukkan PIN untuk mengakses" : "Enter PIN to access"}
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pin" className="text-white">
                    {language === "id" ? "PIN Admin" : "Admin PIN"}
                  </Label>
                  <Input
                    id="pin"
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={language === "id" ? "Masukkan PIN" : "Enter PIN"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? language === "id"
                      ? "Memverifikasi..."
                      : "Verifying..."
                    : language === "id"
                      ? "Masuk"
                      : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {language === "id" ? "Dashboard Admin" : "Admin Dashboard"}
            </h1>
            <p className="text-white/70">
              {language === "id" ? "Kelola data pemesanan kendaraan" : "Manage vehicle booking data"}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            {language === "id" ? "Keluar" : "Logout"}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{bookings.length}</div>
              <p className="text-white/70 text-sm">{language === "id" ? "Total Booking" : "Total Bookings"}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                {bookings.filter((b) => new Date(b.tanggal_sewa) >= new Date()).length}
              </div>
              <p className="text-white/70 text-sm">{language === "id" ? "Booking Mendatang" : "Upcoming Bookings"}</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">{new Set(bookings.map((b) => b.unit)).size}</div>
              <p className="text-white/70 text-sm">{language === "id" ? "Unit Terbooking" : "Booked Units"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {language === "id" ? "Daftar Pemesanan" : "Booking List"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white/70">
                  {language === "id" ? "Belum ada data pemesanan" : "No booking data yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center text-white">
                              <User className="w-4 h-4 mr-2 text-accent-500" />
                              <span className="font-semibold">{booking.nama}</span>
                            </div>
                            <div className="flex items-center text-white/80">
                              <Phone className="w-4 h-4 mr-2 text-accent-500" />
                              <span>{booking.kontak}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center text-white">
                              <Car className="w-4 h-4 mr-2 text-accent-500" />
                              <span>{booking.unit}</span>
                            </div>
                            <div className="flex items-center text-white/80">
                              <DollarSign className="w-4 h-4 mr-2 text-accent-500" />
                              <span>{booking.harga_paket}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center text-white">
                              <Calendar className="w-4 h-4 mr-2 text-accent-500" />
                              <span>
                                {formatDate(booking.tanggal_sewa)} - {formatDate(booking.tanggal_selesai)}
                              </span>
                            </div>
                            <div className="flex items-center text-white/80">
                              <MapPin className="w-4 h-4 mr-2 text-accent-500" />
                              <span className="truncate">{booking.tujuan}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-white/60 text-sm">
                            {language === "id" ? "Dibuat:" : "Created:"} {formatDateTime(booking.created_at)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
