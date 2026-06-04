"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const orders = [
  { id: "ORD-001", artwork: "Amanecer en la Montaña", customer: "Laura García", email: "laura@gmail.com", amount: 380, status: "completed", date: "15 Mar 2025", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop" },
  { id: "ORD-002", artwork: "Geometría Urbana", customer: "Carlos Mendoza", email: "carlos@gmail.com", amount: 520, status: "processing", date: "14 Mar 2025", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop" },
  { id: "ORD-003", artwork: "Jardín Secreto", customer: "Ana Torres", email: "ana@gmail.com", amount: 290, status: "pending", date: "12 Mar 2025", image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=100&h=100&fit=crop" },
  { id: "ORD-004", artwork: "Olas de Color", customer: "Miguel Ruiz", email: "miguel@gmail.com", amount: 620, status: "completed", date: "10 Mar 2025", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop" },
  { id: "ORD-005", artwork: "Luz de Luna", customer: "Sofía Martínez", email: "sofia@gmail.com", amount: 450, status: "completed", date: "8 Mar 2025", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=100&h=100&fit=crop" },
  { id: "ORD-006", artwork: "Bosque Eterno", customer: "Pedro Alvarado", email: "pedro@gmail.com", amount: 330, status: "cancelled", date: "5 Mar 2025", image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=100&h=100&fit=crop" },
  { id: "ORD-007", artwork: "Sueños Abstractos", customer: "Isabel Vargas", email: "isabel@gmail.com", amount: 890, status: "processing", date: "3 Mar 2025", image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=100&h=100&fit=crop" },
  { id: "ORD-008", artwork: "Ciudad de Cristal", customer: "Rodrigo Salas", email: "rodrigo@gmail.com", amount: 740, status: "completed", date: "1 Mar 2025", image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=100&h=100&fit=crop" },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completado", className: "bg-green-100 text-green-700" },
  processing: { label: "Procesando", className: "bg-blue-100 text-blue-700" },
  pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", className: "bg-red-100 text-red-700" },
}

export default function PedidosPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = orders.filter(o => {
    const matchesSearch =
      o.artwork.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + o.amount, 0)

  return (
    <>
      <header className="sticky top-0 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pedidos</h1>
            <p className="text-sm text-muted-foreground">{orders.length} pedidos · ${totalRevenue} en ventas confirmadas</p>
          </div>
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="w-4 h-4" />Exportar
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar pedidos..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl bg-background" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["all", "completed", "processing", "pending", "cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-colors",
                  statusFilter === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                )}>
                {s === "all" ? "Todos" : statusConfig[s]?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  {["Pedido", "Obra", "Cliente", "Monto", "Estado", "Fecha"].map(h => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground px-6 py-4 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4"><span className="text-sm font-mono font-medium text-foreground">{order.id}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={order.image} alt={order.artwork} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm text-foreground font-medium">{order.artwork}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm font-semibold text-foreground">${order.amount}</span></td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex px-2 py-1 rounded-full text-xs font-medium", statusConfig[order.status]?.className)}>
                        {statusConfig[order.status]?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{order.date}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">No se encontraron pedidos</div>
          )}
        </div>
      </main>
    </>
  )
}
