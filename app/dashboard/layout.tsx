"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Image, ShoppingBag, BarChart3, MessageCircle, Settings, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Image, label: "Mis Obras", href: "/dashboard/obras" },
  { icon: ShoppingBag, label: "Pedidos", href: "/dashboard/pedidos" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: MessageCircle, label: "Mensajes", href: "/dashboard/mensajes", badge: 3 },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 bg-background border-r border-border transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Pixel<span className="text-primary">&</span>Paint
              </span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted">
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

      {/* Main */}
      <div className="lg:ml-64">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-4 bg-background border-b border-border sticky top-0 z-30">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <span className="text-lg font-semibold text-foreground">
            Pixel<span className="text-primary">&</span>Paint
          </span>
        </div>
        {children}
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
