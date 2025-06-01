"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const kpis = [
  { title: "Total Revenue", value: "$124,500" },
  { title: "Orders", value: "1,240" },
  { title: "Customers", value: "580" },
];

const salesData = [
  { month: "Jan", sales: 8000 },
  { month: "Feb", sales: 9700 },
  { month: "Mar", sales: 10500 },
  { month: "Apr", sales: 12000 },
  { month: "May", sales: 9000 },
  { month: "Jun", sales: 15000 },
];

const pieData = [
  { name: "Men", value: 400 },
  { name: "Women", value: 300 },
  { name: "Kids", value: 200 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function DashboardPage() {
  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const chartBg = isDark ? "#1f2937" : "#ffffff"; // Tailwind: gray-800 / white
  const textColor = isDark ? "#E5E7EB" : "#374151"; // gray-100 / gray-700

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.title} className="rounded-xl bg-white dark:bg-gray-800 shadow p-4">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">{kpi.title}</h2>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData} style={{ backgroundColor: chartBg }}>
            <CartesianGrid stroke={isDark ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="month" stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip contentStyle={{ backgroundColor: chartBg, borderColor: "#6b7280", color: textColor }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Sales by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: chartBg, color: textColor }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
