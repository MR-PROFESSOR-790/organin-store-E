import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { CartProvider } from "@/components/providers/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatBot } from "@/components/chat/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Organic Store - Premium Organic & Eco-Friendly Products",
  description:
    "Discover premium organic and eco-friendly products for a sustainable lifestyle. Fresh produce, natural skincare, and eco-packaging solutions.",
  keywords: "organic, eco-friendly, sustainable, natural products, organic food",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <ChatBot />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
