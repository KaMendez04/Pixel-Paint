"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { artworks } from "@/lib/data"

const featuredArtworks = artworks.filter((art) => art.featured).slice(0, 4)

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function FeaturedArtworks() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-primary text-sm font-medium mb-4">
              Colección Destacada
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Obras que transforman espacios
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl text-pretty">
              Descubre las piezas más populares elegidas por nuestra comunidad
            </p>
          </div>
          <Button variant="outline" className="rounded-xl gap-2 self-start lg:self-auto" asChild>
            <Link href="/catalogo">
              Ver todo el catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              className="group"
            >
              <Link href={`/obra/${artwork.id}`}>
                <div className="relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
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
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                    >
                      <Heart className="w-5 h-5 text-foreground" />
                    </motion.button>

                    {/* AR Button */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Button
                        size="sm"
                        className="w-full rounded-xl bg-white/90 backdrop-blur-sm text-foreground hover:bg-white"
                        asChild
                      >
                        <Link href={`/ar-experience?artwork=${artwork.id}`}>
                          Visualizar en AR
                        </Link>
                      </Button>
                    </motion.div>

                    {/* Badge */}
                    {index === 0 && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Popular
                      </div>
                    )}
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
