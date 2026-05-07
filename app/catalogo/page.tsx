"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Star, 
  X,
  Grid3X3,
  LayoutGrid,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { artworks, categories, styles, priceRanges } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedStyle, setSelectedStyle] = useState("Todos")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const matchesSearch = 
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.artist.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = 
        selectedCategory === "Todos" || artwork.category === selectedCategory
      
      const matchesStyle = 
        selectedStyle === "Todos" || artwork.style === selectedStyle
      
      let matchesPrice = true
      if (selectedPrice !== "all") {
        const [min, max] = selectedPrice.split("-").map(Number)
        if (max) {
          matchesPrice = artwork.price >= min && artwork.price <= max
        } else {
          matchesPrice = artwork.price >= 600
        }
      }

      return matchesSearch && matchesCategory && matchesStyle && matchesPrice
    })
  }, [searchQuery, selectedCategory, selectedStyle, selectedPrice])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todos")
    setSelectedStyle("Todos")
    setSelectedPrice("all")
  }

  const hasActiveFilters = 
    searchQuery || 
    selectedCategory !== "Todos" || 
    selectedStyle !== "Todos" || 
    selectedPrice !== "all"

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                Catálogo de Arte
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Explora más de 500 obras únicas de artistas independientes. Encuentra el arte perfecto para tu espacio.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por título, artista o estilo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-12 rounded-2xl bg-card border-border text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-xl gap-2",
                    showFilters && "bg-secondary"
                  )}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </Button>

                {/* Category Pills */}
                <div className="hidden lg:flex items-center gap-2">
                  {categories.slice(0, 5).map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* View & Results */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {filteredArtworks.length} obras
                </span>
                <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                      viewMode === "grid" ? "bg-background shadow-sm" : "hover:bg-background/50"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("masonry")}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                      viewMode === "masonry" ? "bg-background shadow-sm" : "hover:bg-background/50"
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-card rounded-2xl border border-border p-6 mb-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Category */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Categoría
                        </label>
                        <div className="relative">
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-background border border-border appearance-none text-foreground"
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      {/* Style */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Estilo
                        </label>
                        <div className="relative">
                          <select
                            value={selectedStyle}
                            onChange={(e) => setSelectedStyle(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-background border border-border appearance-none text-foreground"
                          >
                            {styles.map((style) => (
                              <option key={style} value={style}>
                                {style}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Precio
                        </label>
                        <div className="relative">
                          <select
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                            className="w-full h-11 px-4 rounded-xl bg-background border border-border appearance-none text-foreground"
                          >
                            {priceRanges.map((range) => (
                              <option key={range.value} value={range.value}>
                                {range.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>

                      {/* Clear Button */}
                      <div className="flex items-end">
                        <Button
                          variant="ghost"
                          className="w-full rounded-xl"
                          onClick={clearFilters}
                          disabled={!hasActiveFilters}
                        >
                          Limpiar filtros
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Artwork Grid */}
            {filteredArtworks.length > 0 ? (
              <motion.div
                layout
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {filteredArtworks.map((artwork, index) => (
                    <motion.div
                      key={artwork.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "group",
                        viewMode === "masonry" && "break-inside-avoid mb-6"
                      )}
                    >
                      <Link href={`/obra/${artwork.id}`}>
                        <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                          {/* Image */}
                          <div
                            className={cn(
                              "relative overflow-hidden",
                              viewMode === "grid" ? "aspect-[4/5]" : ""
                            )}
                          >
                            <motion.img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Favorite Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault()
                                toggleFavorite(artwork.id)
                              }}
                              className={cn(
                                "absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300",
                                favorites.includes(artwork.id)
                                  ? "bg-red-500 text-white"
                                  : "bg-white/90 text-foreground opacity-0 group-hover:opacity-100 hover:bg-white"
                              )}
                            >
                              <Heart
                                className={cn(
                                  "w-5 h-5",
                                  favorites.includes(artwork.id) && "fill-current"
                                )}
                              />
                            </motion.button>

                            {/* AR Button */}
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <Button
                                size="sm"
                                className="w-full rounded-xl bg-white/90 backdrop-blur-sm text-foreground hover:bg-white"
                                onClick={(e) => {
                                  e.preventDefault()
                                  window.location.href = `/ar-experience?artwork=${artwork.id}`
                                }}
                              >
                                Visualizar en AR
                              </Button>
                            </motion.div>

                            {/* Tags */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                              <span className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs">
                                {artwork.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                              {artwork.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {artwork.artist}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-lg font-bold text-foreground">
                                ${artwork.price}
                              </span>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="w-4 h-4 fill-ring text-ring" />
                                <span>{artwork.rating}</span>
                                <span className="text-xs">({artwork.reviews})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
                <Button variant="outline" className="rounded-xl" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
