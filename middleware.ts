import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing" // Убедитесь, что путь к вашему файлу роутинга верный

export default createMiddleware({
  // Список всех поддерживаемых локалей
  locales: routing.locales,

  // Локаль по умолчанию, используется, если ни одна из локалей не совпадает
  defaultLocale: routing.defaultLocale,

  // Префикс локали для URL. 'as-needed' добавит префикс для всех локалей, кроме дефолтной.
  // 'always' - всегда добавляет префикс. 'never' - никогда не добавляет (не рекомендуется для App Router).
  localePrefix: "as-needed",

  // Отключает автоматическое определение локали по заголовкам Accept-Language
  localeDetection: false,

  // Альтернативные пути для локалей (если есть)
  // pathnames: routing.pathnames // Если вы определили pathnames в routing.ts
})

export const config = {
  // Matcher для применения middleware.
  // Применяется ко всем путям, кроме статических файлов и API роутов.
  matcher: [
    // Пропускает внутренние пути Next.js и статические файлы
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
}
