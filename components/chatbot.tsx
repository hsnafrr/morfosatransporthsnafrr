"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface FAQItem {
  keywords: string[]
  question: string
  answer: string
}

export function Chatbot() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Local FAQ data
  const faqData: FAQItem[] = [
    {
      keywords: ["harga", "biaya", "tarif", "price", "cost", "rate"],
      question: language === "id" ? "Berapa harga sewa mobil?" : "What are the car rental prices?",
      answer:
        language === "id"
          ? "Harga sewa mobil kami bervariasi: Toyota Agya/Honda Brio Rp 550.000, Toyota Avanza/Daihatsu Xenia Rp 650.000, Toyota Innova Reborn Rp 850.000, Toyota Hiace Commuter Rp 1.200.000, Toyota Hiace Premio Rp 1.500.000, Grandmax Blindvan Rp 650.000. Semua harga sudah termasuk driver dan BBM."
          : "Our car rental prices vary: Toyota Agya/Honda Brio Rp 550,000, Toyota Avanza/Daihatsu Xenia Rp 650,000, Toyota Innova Reborn Rp 850,000, Toyota Hiace Commuter Rp 1,200,000, Toyota Hiace Premio Rp 1,500,000, Grandmax Blindvan Rp 650,000. All prices include driver and fuel.",
    },
    {
      keywords: ["booking", "pesan", "sewa", "rent", "book", "reserve"],
      question: language === "id" ? "Bagaimana cara booking?" : "How to make a booking?",
      answer:
        language === "id"
          ? "Anda bisa booking melalui formulir di website kami atau langsung chat WhatsApp ke 089620928296. Kami akan merespons dengan cepat untuk konfirmasi."
          : "You can book through the form on our website or directly chat WhatsApp to 089620928296. We will respond quickly for confirmation.",
    },
    {
      keywords: ["driver", "sopir", "supir", "pengemudi"],
      question: language === "id" ? "Apakah sudah termasuk driver?" : "Is driver included?",
      answer:
        language === "id"
          ? "Ya, semua paket sewa kami sudah termasuk driver berpengalaman dan BBM. Driver kami profesional dan mengenal rute dengan baik."
          : "Yes, all our rental packages include experienced drivers and fuel. Our drivers are professional and know the routes well.",
    },
    {
      keywords: ["luar kota", "out of town", "jauh", "long distance"],
      question: language === "id" ? "Apakah bisa untuk luar kota?" : "Can it be used for out of town?",
      answer:
        language === "id"
          ? "Bisa, kami melayani perjalanan luar kota. Namun ada biaya tambahan untuk perjalanan luar kota. Silakan hubungi kami untuk detail harga."
          : "Yes, we serve out-of-town trips. However, there are additional charges for out-of-town trips. Please contact us for price details.",
    },
    {
      keywords: ["jam", "waktu", "time", "hours", "24"],
      question: language === "id" ? "Jam berapa saja bisa dihubungi?" : "What hours can you be contacted?",
      answer:
        language === "id"
          ? "Kami melayani 24 jam setiap hari. Anda bisa menghubungi kami kapan saja melalui WhatsApp di 089620928296 atau 081804099113."
          : "We serve 24 hours every day. You can contact us anytime via WhatsApp at 089620928296 or 081804099113.",
    },
    {
      keywords: ["asuransi", "insurance", "jaminan", "guarantee"],
      question: language === "id" ? "Apakah ada asuransi?" : "Is there insurance?",
      answer:
        language === "id"
          ? "Kendaraan kami memiliki asuransi dasar, namun asuransi perjalanan tidak termasuk dalam paket. Kami sarankan mengambil asuransi perjalanan tambahan jika diperlukan."
          : "Our vehicles have basic insurance, but travel insurance is not included in the package. We recommend taking additional travel insurance if needed.",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      type: "bot",
      content:
        language === "id"
          ? "Halo! Saya asisten virtual Morfosa Transport. Ada yang bisa saya bantu tentang layanan sewa mobil kami?"
          : "Hello! I'm Morfosa Transport's virtual assistant. Is there anything I can help you with regarding our car rental services?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [language])

  const findFAQAnswer = (query: string): string | null => {
    const lowerQuery = query.toLowerCase()

    for (const faq of faqData) {
      for (const keyword of faq.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          return faq.answer
        }
      }
    }
    return null
  }

  const getAIResponse = async (query: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          language: language,
        }),
      })

      if (!response.ok) {
        throw new Error("AI API failed")
      }

      const data = await response.json()
      return data.response || "Maaf, saya tidak bisa memproses pertanyaan Anda saat ini."
    } catch (error) {
      console.log("AI API not available, using FAQ fallback")
      throw error
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)
    setIsLoading(true)

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      let botResponse: string

      // Try AI first if available, then fallback to FAQ
      try {
        botResponse = await getAIResponse(input.trim())
      } catch (error) {
        // Fallback to local FAQ
        const faqAnswer = findFAQAnswer(input.trim())

        if (faqAnswer) {
          botResponse = faqAnswer
        } else {
          botResponse =
            language === "id"
              ? "Maaf, saya tidak menemukan jawaban untuk pertanyaan Anda. Silakan hubungi customer service kami di WhatsApp 089620928296 untuk bantuan lebih lanjut."
              : "Sorry, I couldn't find an answer to your question. Please contact our customer service on WhatsApp 089620928296 for further assistance."
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => {
        // Keep only last 5 conversations (10 messages)
        const newMessages = [...prev, botMessage]
        return newMessages.slice(-10)
      })
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          language === "id"
            ? "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi WhatsApp kami di 089620928296."
            : "Sorry, an error occurred. Please try again or contact our WhatsApp at 089620928296.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="glass-card">
        <CardContent className="p-0">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user" ? "bg-accent-500" : "bg-gradient-to-r from-primary-600 to-accent-500"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-accent-500 text-primary-900"
                        : "bg-white/10 backdrop-blur-md text-white border border-white/20"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === "user" ? "text-primary-700" : "text-white/60"}`}>
                      {message.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg p-3">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-xs text-white/60 ml-2">
                        {language === "id" ? "Mengetik..." : "Typing..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === "id" ? "Ketik pertanyaan Anda..." : "Type your question..."}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-white/60 mt-2 text-center">
              {language === "id" ? "Powered by AI dengan fallback FAQ lokal" : "Powered by AI with local FAQ fallback"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
