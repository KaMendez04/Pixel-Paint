"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Eye, Edit, Trash2, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { artworks } from "@/lib/data"
import { cn } from "@/lib/utils"

const myArtworks = artworks.slice(0, 9).map((art, i) => ({
  ...art,
  status: (["published", "published", "sold", "draft", "published", "sold", "published", "draft", "published"] as const)[i],
  uploadDate: `${18 - i * 2} Mar 2025`,
}))

const statusConfig = {
  published: { label: "Publicada", className: "bg-green-100 text-green-700" },
  draft: { label: "Borrador", className: "bg-yellow-100 text-yellow-700" },
  sold: { label: "Vendida", className: "bg-blue-100 text-blue-700" },
}

export default function ObrasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = myArtworks.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <header className="sticky top-0 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mis Obras</h1>
            <p className="text-sm text-muted-foreground">{myArtworks.length} obras en tu colección</p>
          </div>
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" />
            Agregar Obra
          </Button>
        </div>
      </header>

      <main className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Buscar obras..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 rounded-xl bg-background" />
          </div>
          <div className="flex items-center gap-2">
            {[
              { key: "all", label: "Todas" },
              { key: "published", label: "Publicadas" },
              { key: "draft", label: "Borradores" },
              { key: "sold", label: "Vendidas" },
            ].map(f => (
              <button key={f.key} onClick={() => setStatusFilter(f.key)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-sm font-medium transition-colors",
                  statusFilter === f.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border text-muted-foreground hover:text-foreground"
                )}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((artwork, i) => (
            <motion.div key={artwork.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={artwork.image} alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                <span className={cn("absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium", statusConfig[artwork.status].className)}>
                  {statusConfig[artwork.status].label}
                </span>
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[
                    { icon: Eye, color: "text-foreground" },
                    { icon: Edit, color: "text-foreground" },
                    { icon: Trash2, color: "text-red-500" },
                  ].map(({ icon: Icon, color }) => (
                    <button key={color} className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                      <Icon className={cn("w-4 h-4", color)} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{artwork.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{artwork.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">${artwork.price}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{artwork.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{artwork.uploadDate}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No se encontraron obras</div>
        )}
      </main>
    </>
  )
}
