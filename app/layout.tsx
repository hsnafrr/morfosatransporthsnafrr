import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chat-widget"
import { AudioPlayer } from "@/components/audio-player"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Morfosa Transport - Sewa Mobil Terpercaya",
  description:
    "Layanan sewa mobil terpercaya sejak 2008 dengan driver berpengalaman dan harga terjangkau. Melayani dalam dan luar kota.",
  keywords: "sewa mobil, rental mobil, transport, driver, Jakarta, Indonesia, Morfosa",
  authors: [{ name: "Morfosa Transport" }],
  creator: "Morfosa Transport",
  publisher: "Morfosa Transport",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://morfosarentcar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Morfosa Transport - Sewa Mobil Terpercaya",
    description: "Layanan sewa mobil terpercaya sejak 2008 dengan driver berpengalaman dan harga terjangkau.",
    url: "https://morfosarentcar.com",
    siteName: "Morfosa Transport",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morfosa Transport - Sewa Mobil Terpercaya",
    description: "Layanan sewa mobil terpercaya sejak 2008 dengan driver berpengalaman dan harga terjangkau.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={inter.className}>
      <body className="min-h-screen">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <ChatWidget />
        <AudioPlayer />
      </body>
    </html>
  )
}
