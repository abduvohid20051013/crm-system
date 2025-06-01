import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, unstable_setRequestLocale } from "next-intl/server" // getMessages вместо useMessages
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"

// Опционально: для генерации статических путей для всех локалей
// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function LocaleLayout({
  // Делаем компонент асинхронным
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Валидация и установка локали для серверных операций
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  unstable_setRequestLocale(locale)

  // Получаем сообщения для текущей локали (locale уже установлена через unstable_setRequestLocale)
  const messages = await getMessages()

  return (
    // NextIntlClientProvider передает сообщения и локаль клиентским компонентам ниже по дереву
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
