import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "CRM Abduvoxid System - Clothing",
  description: "Современная CRM-система для управления клиентами, товарами и заказами",
}

export default function RootLayout({
  children,
  params: { locale }, 
}: {
  children: React.ReactNode
  params: { locale: string } 
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
