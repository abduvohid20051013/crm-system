import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CRM System - Управление бизнесом",
  description: "Современная CRM-система для управления клиентами, товарами и заказами",
}

export default function RootLayout({
  children,
  params: { locale }, // RootLayout получает locale из URL
}: {
  children: React.ReactNode
  params: { locale: string } // Добавляем locale в тип параметров
}) {
  return (
    // Атрибут lang устанавливается здесь, используя locale из URL.
    // Middleware next-intl гарантирует, что эта locale валидна.
    <html lang={locale} suppressHydrationWarning>
      {/* УБРАН ЛИШНИЙ ПРОБЕЛ ОТСЮДА */}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* children будет включать LocaleLayout, который содержит NextIntlClientProvider */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
