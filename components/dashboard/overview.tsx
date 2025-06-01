"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Янв", total: 1200 },
  { name: "Фев", total: 1900 },
  { name: "Мар", total: 800 },
  { name: "Апр", total: 1600 },
  { name: "Май", total: 2400 },
  { name: "Июн", total: 2100 },
  { name: "Июл", total: 2800 },
  { name: "Авг", total: 3200 },
  { name: "Сен", total: 2900 },
  { name: "Окт", total: 3400 },
  { name: "Ноя", total: 3100 },
  { name: "Дек", total: 3600 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
          }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
