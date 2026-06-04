"use client"

import { motion } from "framer-motion"
import { Download, TrendingUp, Eye, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

const monthlyData = [
  { month: "Ene", ventas: 2400, visitas: 4800 },
  { month: "Feb", ventas: 1800, visitas: 3200 },
  { month: "Mar", ventas: 9800, visitas: 7600 },
  { month: "Abr", ventas: 3908, visitas: 5400 },
  { month: "May", ventas: 5800, visitas: 8200 },
  { month: "Jun", ventas: 7200, visitas: 9100 },
]

const categoryData = [
  { name: "Abstracto", value: 35, color: "#A594F7" },
  { name: "Paisajes", value: 25, color: "#93B4F8" },
  { name: "Retratos", value: 20, color: "#C4B5FD" },
  { name: "Minimalista", value: 15, color: "#8B6CF5" },
  { name: "Otros", value: 5, color: "#EDE9FE" },
]

const topCountries = [
  { country: "Costa Rica", percentage: 42, sales: 45 },
  { country: "México", percentage: 26, sales: 28 },
  { country: "España", percentage: 17, sales: 18 },
  { country: "Colombia", percentage: 9, sales: 10 },
  { country: "Otros", percentage: 6, sales: 6 },
]

const metrics = [
  { label: "Ingresos Totales", value: "$28,450", change: "+23.5%", icon: DollarSign, bg: "bg-green-100", color: "text-green-600" },
  { label: "Visitas Únicas", value: "38,200", change: "+12.3%", icon: Eye, bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Tasa de Conversión", value: "3.2%", change: "+0.8%", icon: TrendingUp, bg: "bg-purple-100", color: "text-purple-600" },
  { label: "Seguidores Nuevos", value: "1,342", change: "+18.4%", icon: Users, bg: "bg-pink-100", color: "text-pink-600" },
]

export default function AnalyticsPage() {
  return (
    <>
      <header className="sticky top-0 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Enero – Junio 2025</p>
          </div>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="w-4 h-4" />Exportar reporte
          </Button>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.bg}`}>
                <m.icon className={`w-6 h-6 ${m.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-sm text-green-600 font-medium mt-1">{m.change} vs anterior</p>
            </motion.div>
          ))}
        </div>

        {/* Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">Rendimiento mensual</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="aVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A594F7" stopOpacity={0.3} /><stop offset="95%" stopColor="#A594F7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="aVisitas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#93B4F8" stopOpacity={0.3} /><stop offset="95%" stopColor="#93B4F8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8E5F0" />
                <XAxis dataKey="month" stroke="#8E8BA3" fontSize={12} />
                <YAxis stroke="#8E8BA3" fontSize={12} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E5F0", borderRadius: "12px" }} />
                <Legend />
                <Area type="monotone" dataKey="ventas" name="Ventas ($)" stroke="#A594F7" strokeWidth={2} fillOpacity={1} fill="url(#aVentas)" />
                <Area type="monotone" dataKey="visitas" name="Visitas" stroke="#93B4F8" strokeWidth={2} fillOpacity={1} fill="url(#aVisitas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">Ventas por mes</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E5F0" />
                  <XAxis dataKey="month" stroke="#8E8BA3" fontSize={12} />
                  <YAxis stroke="#8E8BA3" fontSize={12} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E5F0", borderRadius: "12px" }} />
                  <Bar dataKey="ventas" name="Ventas ($)" fill="#A594F7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">Ventas por categoría</h2>
            <div className="flex items-center gap-4">
              <div className="h-52 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E5F0", borderRadius: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-shrink-0">
                {categoryData.map(cat => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                    <span className="font-medium text-foreground ml-2">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Countries */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-6">Ventas por país</h2>
          <div className="space-y-4">
            {topCountries.map(c => (
              <div key={c.country} className="flex items-center gap-4">
                <span className="text-sm text-foreground w-24 flex-shrink-0">{c.country}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${c.percentage}%` }} />
                </div>
                <span className="text-sm font-medium text-foreground w-10 text-right flex-shrink-0">{c.percentage}%</span>
                <span className="text-sm text-muted-foreground w-20 text-right flex-shrink-0">{c.sales} ventas</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  )
}
