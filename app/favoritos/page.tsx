"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Trash2,
  Eye,
  ShoppingCart,
  Grid3X3,
  List,
  Star,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { artworks } from "@/lib/data"
import { cn } from "@/lib/utils"

// Simulated favorites (in a real app, this would come from a database)
const initialFavorites = artworks.slice(0, 5)

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((art) => art.id !== id))
  }

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
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                Mis Favoritos
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                {favorites.length > 0
                  ? `Tienes ${favorites.length} ${favorites.length === 1 ? "obra guardada" : "obras guardadas"} en tu colección`
                  : "Aún no tienes obras guardadas"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {favorites.length > 0 ? (
              <>
                {/* View Mode Toggle */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-muted-foreground">
                    {favorites.length} {favorites.length === 1 ? "resultado" : "resultados"}
                  </p>
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
                      onClick={() => setViewMode("list")}
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                        viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/50"
                      )}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Favorites Grid/List */}
                <AnimatePresence mode="popLayout">
                  {viewMode === "grid" ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                      {favorites.map((artwork) => (
                        <motion.div
                          key={artwork.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="group"
                        >
                          <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                            <Link href={`/obra/${artwork.id}`}>
                              <div className="relative aspect-[4/5] overflow-hidden">
                                <motion.img
                                  src={artwork.image}
                                  alt={artwork.title}
                                  className="w-full h-full object-cover"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              </div>
                            </Link>

                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeFavorite(artwork.id)}
                                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
                              >
                                <Heart className="w-5 h-5 fill-current" />
                              </motion.button>
                            </div>

                            {/* Quick Actions */}
                            <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <Button
                                size="sm"
                                className="flex-1 rounded-xl bg-white/90 backdrop-blur-sm text-foreground hover:bg-white"
                                asChild
                              >
                                <Link href={`/ar-experience?artwork=${artwork.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  Ver AR
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 rounded-xl"
                                asChild
                              >
                                <Link href={`/checkout?artwork=${artwork.id}`}>
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Comprar
                                </Link>
                              </Button>
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
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {favorites.map((artwork) => (
                        <motion.div
                          key={artwork.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"
                        >
                          <div className="flex flex-col sm:flex-row">
                            <Link href={`/obra/${artwork.id}`} className="sm:w-48 lg:w-64">
                              <div className="aspect-[4/3] sm:aspect-square overflow-hidden">
                                <img
                                  src={artwork.image}
                                  alt={artwork.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            </Link>
                            <div className="flex-1 p-6 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <Link href={`/obra/${artwork.id}`}>
                                      <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                                        {artwork.title}
                                      </h3>
                                    </Link>
                                    <p className="text-muted-foreground mt-1">{artwork.artist}</p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-ring text-ring" />
                                    <span className="text-sm font-medium">{artwork.rating}</span>
                                    <span className="text-sm text-muted-foreground">
                                      ({artwork.reviews})
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                  {artwork.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold text-foreground">
                                  ${artwork.price}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl gap-1"
                                    asChild
                                  >
                                    <Link href={`/ar-experience?artwork=${artwork.id}`}>
                                      <Eye className="w-4 h-4" />
                                      Ver AR
                                    </Link>
                                  </Button>
                                  <Button size="sm" className="rounded-xl gap-1" asChild>
                                    <Link href={`/checkout?artwork=${artwork.id}`}>
                                      <ShoppingCart className="w-4 h-4" />
                                      Comprar
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => removeFavorite(artwork.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Tu colección está vacía
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Explora nuestro catálogo y guarda las obras que más te gusten para verlas más tarde
                </p>
                <Button className="rounded-xl" asChild>
                  <Link href="/catalogo">Explorar catálogo</Link>
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
