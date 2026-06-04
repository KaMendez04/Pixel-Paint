"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Bell, Search, Plus, TrendingUp, TrendingDown,
  Eye, Heart, DollarSign, Users, ArrowUpRight,
  MoreVertical, Filter, Download, ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts"

const stats = [
  { label: "Ventas Totales", value: "$12,450", change: "+23.5%", trend: "up", icon: DollarSign, bg: "bg-green-100", color: "text-green-600" },
  { label: "Obras Vistas", value: "8,234", change: "+12.3%", trend: "up", icon: Eye, bg: "bg-blue-100", color: "text-blue-600" },
  { label: "Favoritos", value: "1,456", change: "+8.2%", trend: "up", icon: Heart, bg: "bg-pink-100", color: "text-pink-600" },
  { label: "Nuevos Seguidores", value: "342", change: "-2.4%", trend: "down", icon: Users, bg: "bg-purple-100", color: "text-purple-600" },
]

const salesData = [
  { month: "Ene", ventas: 2400, visualizaciones: 4000 },
  { month: "Feb", ventas: 1398, visualizaciones: 3000 },
  { month: "Mar", ventas: 9800, visualizaciones: 7200 },
  { month: "Abr", ventas: 3908, visualizaciones: 5400 },
  { month: "May", ventas: 4800, visualizaciones: 6800 },
  { month: "Jun", ventas: 7200, visualizaciones: 9100 },
]

const topArtworks = [
  { title: "Amanecer en la Montaña", views: 2340, sales: 12, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop" },
  { title: "Olas de Color", views: 1890, sales: 8, image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop" },
  { title: "Geometría Urbana", views: 1456, sales: 6, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop" },
]

const recentOrders = [
  { id: "ORD-001", artwork: "Amanecer en la Montaña", customer: "Laura García", amount: "$380", status: "completed", date: "Hace 2 horas", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop" },
  { id: "ORD-002", artwork: "Geometría Urbana", customer: "Carlos Mendoza", amount: "$520", status: "processing", date: "Hace 5 horas", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop" },
  { id: "ORD-003", artwork: "Jardín Secreto", customer: "Ana Torres", amount: "$290", status: "pending", date: "Hace 1 día", image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=100&h=100&fit=crop" },
  { id: "ORD-004", artwork: "Olas de Color", customer: "Miguel Ruiz", amount: "$620", status: "completed", date: "Hace 2 días", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completado", className: "bg-green-100 text-green-700" },
  processing: { label: "Procesando", className: "bg-blue-100 text-blue-700" },
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
}

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Bienvenida de vuelta, María</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="text" placeholder="Buscar..." className="w-64 pl-10 rounded-xl bg-muted border-0" />
            </div>
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </Button>
            <Button className="rounded-xl gap-2">
              <Plus className="w-4 h-4" />
              Nueva Obra
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className={cn("flex items-center gap-1 text-sm font-medium", stat.trend === "up" ? "text-green-600" : "text-red-500")}>
                  {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Ventas vs Visualizaciones</h2>
                <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl gap-2">
                <Download className="w-4 h-4" />Exportar
              </Button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="gVentas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A594F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A594F7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gVistas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#93B4F8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#93B4F8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E5F0" />
                  <XAxis dataKey="month" stroke="#8E8BA3" fontSize={12} />
                  <YAxis stroke="#8E8BA3" fontSize={12} />
                  <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E8E5F0", borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="ventas" name="Ventas ($)" stroke="#A594F7" strokeWidth={2} fillOpacity={1} fill="url(#gVentas)" />
                  <Area type="monotone" dataKey="visualizaciones" name="Visualizaciones" stroke="#93B4F8" strokeWidth={2} fillOpacity={1} fill="url(#gVistas)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Obras Destacadas</h2>
              <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="w-4 h-4" /></Button>
            </div>
            <div className="space-y-4">
              {topArtworks.map((art, i) => (
                <div key={art.title} className="flex items-center gap-3">
                  <span className="w-5 text-center text-sm font-medium text-muted-foreground">{i + 1}</span>
                  <img src={art.image} alt={art.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{art.title}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{art.views}</span>
                      <span className="flex items-center gap-1"><ShoppingBag className="w-3 h-3" />{art.sales}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/obras">
              <Button variant="ghost" className="w-full mt-4 rounded-xl gap-2">
                Ver todas las obras <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Pedidos Recientes</h2>
              <p className="text-sm text-muted-foreground">Últimas transacciones</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2"><Filter className="w-4 h-4" />Filtrar</Button>
              <Link href="/dashboard/pedidos">
                <Button variant="ghost" size="sm" className="rounded-xl gap-2">Ver todo <ArrowUpRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Pedido", "Obra", "Cliente", "Monto", "Estado", "Fecha"].map(h => (
                    <th key={h} className="text-left text-sm font-medium text-muted-foreground px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4"><span className="text-sm font-medium text-foreground">{order.id}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={order.image} alt={order.artwork} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm text-foreground">{order.artwork}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{order.customer}</span></td>
                    <td className="px-6 py-4"><span className="text-sm font-medium text-foreground">{order.amount}</span></td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex px-2 py-1 rounded-full text-xs font-medium", statusConfig[order.status]?.className)}>
                        {statusConfig[order.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{order.date}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </>
  )
}
