"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Star, MapPin, ExternalLink, Quote } from "lucide-react"

export default function ReviewsPage() {
  const { language } = useLanguage()

  const handleGoogleMapsReview = () => {
    window.open("https://maps.app.goo.gl/PNkeYZDkKboTwuHC7?g_st=ac", "_blank")
  }

  // Sample reviews for display
  const sampleReviews = [
    {
      name: "Ahmad Rizki",
      rating: 5,
      comment:
        language === "id"
          ? "Pelayanan sangat memuaskan! Driver ramah dan kendaraan bersih. Pasti akan menggunakan jasa Morfosa Transport lagi."
          : "Very satisfying service! Friendly driver and clean vehicle. Will definitely use Morfosa Transport services again.",
      date: "2024-01-15",
    },
    {
      name: "Sari Dewi",
      rating: 5,
      comment:
        language === "id"
          ? "Harga terjangkau dan pelayanan profesional. Sangat direkomendasikan untuk perjalanan keluarga."
          : "Affordable prices and professional service. Highly recommended for family trips.",
      date: "2024-01-10",
    },
    {
      name: "Budi Santoso",
      rating: 4,
      comment:
        language === "id"
          ? "Kendaraan nyaman dan driver berpengalaman. Perjalanan jadi lebih menyenangkan."
          : "Comfortable vehicle and experienced driver. The journey became more enjoyable.",
      date: "2024-01-05",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Apa Kata Mereka?" : "What They Say?"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {language === "id"
              ? "Kepuasan pelanggan adalah prioritas utama kami. Lihat apa yang dikatakan pelanggan tentang layanan Morfosa Transport."
              : "Customer satisfaction is our top priority. See what customers say about Morfosa Transport services."}
          </p>
        </div>

        {/* Google Maps CTA */}
        <Card className="glass-card mb-12">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {language === "id" ? "Review di Google Maps" : "Google Maps Reviews"}
              </h2>
              <p className="text-white/80 max-w-2xl">
                {language === "id"
                  ? "Lihat review lengkap dari pelanggan kami di Google Maps dan berikan review Anda setelah menggunakan layanan kami."
                  : "See complete reviews from our customers on Google Maps and give your review after using our services."}
              </p>
              <Button onClick={handleGoogleMapsReview} size="lg" className="mt-4">
                <ExternalLink className="w-5 h-5 mr-2" />
                {language === "id" ? "Lihat Review Lengkap di Google Maps" : "View Complete Reviews on Google Maps"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sample Reviews */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {language === "id" ? "Testimoni Pelanggan" : "Customer Testimonials"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReviews.map((review, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{review.name}</h3>
                      <p className="text-white/60 text-sm">{review.date}</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="w-6 h-6 text-accent-500/50 absolute -top-2 -left-1" />
                    <p className="text-white/80 italic pl-6">{review.comment}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <Card className="glass-card">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">4.8</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/70">{language === "id" ? "Rating Rata-rata" : "Average Rating"}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">150+</div>
                <p className="text-white/70">{language === "id" ? "Total Review" : "Total Reviews"}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">98%</div>
                <p className="text-white/70">{language === "id" ? "Kepuasan Pelanggan" : "Customer Satisfaction"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === "id" ? "Bergabunglah dengan Pelanggan Puas Kami" : "Join Our Satisfied Customers"}
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {language === "id"
                  ? "Rasakan sendiri pelayanan terbaik dari Morfosa Transport. Booking sekarang dan jadilah bagian dari keluarga besar kami."
                  : "Experience the best service from Morfosa Transport yourself. Book now and become part of our big family."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => {
                    window.location.href = "/booking"
                  }}
                >
                  {language === "id" ? "Booking Sekarang" : "Book Now"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const message =
                      language === "id"
                        ? "Halo, saya tertarik dengan layanan Morfosa Transport setelah melihat review yang bagus."
                        : "Hello, I am interested in Morfosa Transport services after seeing good reviews."
                    const whatsappUrl = `https://wa.me/6289620928296?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, "_blank")
                  }}
                >
                  {language === "id" ? "Tanya Langsung" : "Ask Directly"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
