"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import { useTranslations } from "next-intl"

const stats = [
  {
    title: "totalRevenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "totalOrders",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "totalCustomers",
    value: "12,234",
    change: "+19%",
    trend: "up",
    icon: Users,
  },
  {
    title: "totalProducts",
    value: "573",
    change: "+201",
    trend: "up",
    icon: Package,
  },
]

export function StatsCards() {
  const t = useTranslations("dashboard.stats")

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t(stat.title)}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
              <span className="ml-1">{t("fromLastMonth")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
