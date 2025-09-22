"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Chatbot } from "@/components/chatbot"
import { useLanguage } from "@/hooks/use-language"
import { MessageCircle, HelpCircle } from "lucide-react"

export default function FAQPage() {
  const { language } = useLanguage()
  const [showChatbot, setShowChatbot] = useState(false)

  const faqs = [
    {
      id: "1",
      question: language === "id" ? "Bagaimana cara memesan kendaraan?" : "How to book a vehicle?",
      answer:
        language === "id"
          ? "Anda dapat memesan melalui formulir booking di website kami atau langsung menghubungi WhatsApp di 089620928296. Kami akan merespons dengan cepat untuk konfirmasi pemesanan."
          : "You can book through the booking form on our website or directly contact WhatsApp at 089620928296. We will respond quickly for booking confirmation.",
    },
    {
      id: "2",
      question:
        language === "id" ? "Apakah harga sudah termasuk driver dan BBM?" : "Does the price include driver and fuel?",
      answer:
        language === "id"
          ? "Ya, semua harga yang tercantum sudah termasuk driver berpengalaman dan BBM. Namun, terdapat biaya tambahan untuk perjalanan ke luar kota."
          : "Yes, all listed prices include experienced driver and fuel. However, there are additional charges for out-of-town trips.",
    },
    {
      id: "3",
      question: language === "id" ? "Berapa lama minimal sewa kendaraan?" : "What is the minimum rental period?",
      answer:
        language === "id"
          ? "Minimal sewa adalah 1 hari (24 jam). Untuk sewa jangka panjang, kami memberikan harga khusus yang lebih ekonomis."
          : "Minimum rental is 1 day (24 hours). For long-term rentals, we provide special more economical prices.",
    },
    {
      id: "4",
      question:
        language === "id" ? "Apakah tersedia layanan antar jemput?" : "Is pickup and drop-off service available?",
      answer:
        language === "id"
          ? "Ya, kami menyediakan layanan antar jemput sesuai dengan lokasi yang disepakati. Biaya antar jemput sudah termasuk dalam paket sewa."
          : "Yes, we provide pickup and drop-off services according to the agreed location. Pickup and drop-off costs are included in the rental package.",
    },
    {
      id: "5",
      question: language === "id" ? "Bagaimana sistem pembayaran?" : "How is the payment system?",
      answer:
        language === "id"
          ? "Pembayaran dapat dilakukan secara tunai atau transfer bank. Untuk pemesanan, biasanya diperlukan uang muka sebesar 30% dari total biaya sewa."
          : "Payment can be made in cash or bank transfer. For bookings, usually a down payment of 30% of the total rental cost is required.",
    },
    {
      id: "6",
      question: language === "id" ? "Apakah ada asuransi untuk kendaraan?" : "Is there insurance for the vehicle?",
      answer:
        language === "id"
          ? "Kendaraan kami memiliki asuransi dasar, namun asuransi perjalanan tidak termasuk dalam paket. Kami menyarankan untuk mengambil asuransi perjalanan tambahan jika diperlukan."
          : "Our vehicles have basic insurance, but travel insurance is not included in the package. We recommend taking additional travel insurance if needed.",
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "id" ? "Pertanyaan yang Sering Diajukan" : "Frequently Asked Questions"}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {language === "id"
              ? "Temukan jawaban untuk pertanyaan umum tentang layanan sewa mobil kami. Jika tidak menemukan jawaban, gunakan chatbot AI kami."
              : "Find answers to common questions about our car rental services. If you don't find an answer, use our AI chatbot."}
          </p>
        </div>

        {/* FAQ Section */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-accent-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">{language === "id" ? "FAQ" : "FAQ"}</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-white/20">
                  <AccordionTrigger className="text-white hover:text-accent-500 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Chatbot Section */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-accent-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">{language === "id" ? "Asisten AI" : "AI Assistant"}</h2>
              </div>
              {!showChatbot && (
                <button
                  onClick={() => setShowChatbot(true)}
                  className="px-4 py-2 bg-accent-500 text-primary-900 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
                >
                  {language === "id" ? "Mulai Chat" : "Start Chat"}
                </button>
              )}
            </div>

            {showChatbot ? (
              <Chatbot />
            ) : (
              <div className="text-center py-8">
                <p className="text-white/80 mb-4">
                  {language === "id"
                    ? "Tidak menemukan jawaban yang Anda cari? Tanya asisten AI kami untuk bantuan lebih lanjut."
                    : "Can't find the answer you're looking for? Ask our AI assistant for further help."}
                </p>
                <button
                  onClick={() => setShowChatbot(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-500 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-accent-600 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {language === "id" ? "Tanya Asisten AI" : "Ask AI Assistant"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === "id" ? "Masih Ada Pertanyaan?" : "Still Have Questions?"}
              </h3>
              <p className="text-white/80 mb-6">
                {language === "id"
                  ? "Tim customer service kami siap membantu Anda 24/7 melalui WhatsApp."
                  : "Our customer service team is ready to help you 24/7 via WhatsApp."}
              </p>
              <button
                onClick={() => {
                  const message =
                    language === "id"
                      ? "Halo, saya memiliki pertanyaan tentang layanan sewa mobil Morfosa Transport."
                      : "Hello, I have a question about Morfosa Transport car rental services."
                  const whatsappUrl = `https://wa.me/6289620928296?text=${encodeURIComponent(message)}`
                  window.open(whatsappUrl, "_blank")
                }}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {language === "id" ? "Hubungi WhatsApp" : "Contact WhatsApp"}
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
