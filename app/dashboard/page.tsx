"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Image,
  ShoppingBag,
  BarChart3,
  MessageCircle,
  Settings,
  Bell,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  DollarSign,
  Users,
  ArrowUpRight,
  MoreVertical,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Image, label: "Mis Obras", href: "/dashboard/obras", active: false },
  { icon: ShoppingBag, label: "Pedidos", href: "/dashboard/pedidos", active: false },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", active: false },
  { icon: MessageCircle, label: "Mensajes", href: "/dashboard/mensajes", badge: 3 },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings", active: false },
]

const stats = [
  {
    label: "Ventas Totales",
    value: "$12,450",
    change: "+23.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Obras Vistas",
    value: "8,234",
    change: "+12.3%",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Favoritos",
    value: "1,456",
    change: "+8.2%",
    trend: "up",
    icon: Heart,
  },
  {
    label: "Nuevos Seguidores",
    value: "342",
    change: "-2.4%",
    trend: "down",
    icon: Users,
  },
]

const salesData = [
  { month: "Ene", ventas: 2400, visualizaciones: 4000 },
  { month: "Feb", ventas: 1398, visualizaciones: 3000 },
  { month: "Mar", ventas: 9800, visualizaciones: 2000 },
  { month: "Abr", ventas: 3908, visualizaciones: 2780 },
  { month: "May", ventas: 4800, visualizaciones: 1890 },
  { month: "Jun", ventas: 3800, visualizaciones: 2390 },
]

const categoryData = [
  { name: "Abstracto", value: 35 },
  { name: "Paisajes", value: 25 },
  { name: "Retratos", value: 20 },
  { name: "Minimalista", value: 15 },
  { name: "Otros", value: 5 },
]

const recentOrders = [
  {
    id: "ORD-001",
    artwork: "Amanecer en la Montaña",
    customer: "Laura García",
    amount: "$380",
    status: "completed",
    date: "Hace 2 horas",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-002",
    artwork: "Geometría Urbana",
    customer: "Carlos Mendoza",
    amount: "$520",
    status: "processing",
    date: "Hace 5 horas",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-003",
    artwork: "Jardín Secreto",
    customer: "Ana Torres",
    amount: "$290",
    status: "pending",
    date: "Hace 1 día",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=100&h=100&fit=crop",
  },
  {
    id: "ORD-004",
    artwork: "Olas de Color",
    customer: "Miguel Ruiz",
    amount: "$620",
    status: "completed",
    date: "Hace 2 días",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop",
  },
]

const topArtworks = [
  {
    title: "Amanecer en la Montaña",
    views: 2340,
    sales: 12,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop",
  },
  {
    title: "Olas de Color",
    views: 1890,
    sales: 8,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop",
  },
  {
    title: "Geometría Urbana",
    views: 1456,
    sales: 6,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop",
  },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "processing":
        return "Procesando"
      case "pending":
        return "Pendiente"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r border-border transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Pixel<span className="text-primary">&</span>Paint
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  link.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {link.badge && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">María García</p>
                <p className="text-xs text-muted-foreground truncate">Artista Premium</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <LayoutDashboard className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Bienvenida de vuelta, María
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar..."
                  className="w-64 pl-10 rounded-xl bg-secondary border-0"
                />
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

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      index === 0 && "bg-green-100",
                      index === 1 && "bg-blue-100",
                      index === 2 && "bg-pink-100",
                      index === 3 && "bg-purple-100"
                    )}
                  >
                    <stat.icon
                      className={cn(
                        "w-6 h-6",
                        index === 0 && "text-green-600",
                        index === 1 && "text-blue-600",
                        index === 2 && "text-pink-600",
                        index === 3 && "text-purple-600"
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      stat.trend === "up" ? "text-green-600" : "text-red-500"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Ventas vs Visualizaciones</h2>
                  <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <defs>
                      <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2F4F3E" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2F4F3E" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorVisualizaciones" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A8D5BA" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#A8D5BA" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="ventas"
                      stroke="#2F4F3E"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVentas)"
                    />
                    <Area
                      type="monotone"
                      dataKey="visualizaciones"
                      stroke="#A8D5BA"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorVisualizaciones)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Top Artworks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-card rounded-2xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Obras Destacadas</h2>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {topArtworks.map((artwork, index) => (
                  <div key={artwork.title} className="flex items-center gap-4">
                    <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                      {index + 1}
                    </span>
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {artwork.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {artwork.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" />
                          {artwork.sales}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 rounded-xl gap-2">
                Ver todas las obras
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl border border-border"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Pedidos Recientes</h2>
                <p className="text-sm text-muted-foreground">
                  Últimas transacciones de tus obras
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl gap-2">
                  Ver todo
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Pedido
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Obra
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Cliente
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Monto
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Estado
                    </th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.image}
                            alt={order.artwork}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-sm text-foreground">{order.artwork}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{order.customer}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-foreground">{order.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                            getStatusColor(order.status)
                          )}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{order.date}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
