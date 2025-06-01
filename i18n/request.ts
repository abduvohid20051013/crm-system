import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing" // Убедитесь, что путь верный

export default getRequestConfig(async ({ locale }) => {
  // Параметр `locale` здесь - это локаль, извлеченная из URL вашей middleware.
  // Проверяем, что она валидна.
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  return {
    // Явно возвращаем локаль, которая была использована.
    // Это исправляет предупреждение "A `locale` is expected to be returned...".
    locale: locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
