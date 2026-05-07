"use client"

import { useState, use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Eye,
  ShoppingCart,
  MessageCircle,
  Truck,
  Shield,
  RefreshCw,
  Check,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { artworks, artists } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ObraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const artwork = artworks.find((a) => a.id === id) || artworks[0]
  const artist = artists.find((a) => a.id === artwork.artistId)
  const relatedArtworks = artworks.filter((a) => a.id !== artwork.id && a.style === artwork.style).slice(0, 4)

  const [selectedSize, setSelectedSize] = useState(artwork.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Calculate scale factor based on selected size relative to the largest size
  const maxDimension = Math.max(...artwork.sizes.map((s) => Math.max(s.width, s.height)))
  const currentDimension = Math.max(selectedSize.width, selectedSize.height)
  const scaleFactor = currentDimension / maxDimension

  // Simulated gallery images
  const galleryImages = [
    artwork.image,
    "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1574182245530-498f0a513b84?w=800&h=800&fit=crop",
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/catalogo" className="hover:text-foreground transition-colors">
              Catálogo
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{artwork.title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image Container with Dynamic Scaling */}
              <div className="relative aspect-[4/5] mb-8 flex items-center justify-center bg-secondary/30 rounded-3xl overflow-hidden p-6 lg:p-12">
                <motion.div
                  animate={{ 
                    scale: scaleFactor,
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  className="relative w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-secondary"
                >
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={galleryImages[selectedImage]}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Favorite Button (Moved outside scaling container for better UX) */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "absolute top-8 right-8 w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10",
                    isFavorite
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-white/90 text-foreground hover:bg-white shadow-md"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col"
            >
              {/* Category & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/30 text-primary text-sm font-medium">
                  {artwork.category}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-ring text-ring" />
                  <span className="font-medium text-foreground">{artwork.rating}</span>
                  <span className="text-muted-foreground">({artwork.reviews} reseñas)</span>
                </div>
              </div>

              {/* Title & Price */}
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {artwork.title}
              </h1>
              <p className="text-2xl lg:text-3xl font-bold text-primary mb-6">
                ${selectedSize.price}
              </p>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {artwork.description}
              </p>

              {/* Artist Card */}
              {artist && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 mb-8">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{artist.name}</p>
                    <p className="text-sm text-muted-foreground">{artist.location}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl gap-2" asChild>
                    <Link href={`/artista/${artist.id}`}>
                      <MessageCircle className="w-4 h-4" />
                      Contactar
                    </Link>
                  </Button>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Tamaño disponible
                </label>
                <div className="flex flex-wrap gap-3">
                  {artwork.sizes.map((size) => (
                    <button
                      key={`${size.width}x${size.height}`}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-3 rounded-xl border-2 transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span className="font-medium text-foreground">
                        {size.width} x {size.height} cm
                      </span>
                      <span className="block text-sm text-muted-foreground mt-1">
                        ${size.price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors rounded-l-xl"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors rounded-r-xl"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total: ${selectedSize.price * quantity}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="flex-1 h-14 rounded-2xl gap-2 text-base"
                  asChild
                >
                  <Link href={`/checkout?artwork=${artwork.id}&size=${selectedSize.width}x${selectedSize.height}&qty=${quantity}`}>
                    <ShoppingCart className="w-5 h-5" />
                    Comprar ahora
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 rounded-2xl gap-2"
                  asChild
                >
                  <Link href={`/ar-experience?artwork=${artwork.id}&size=${selectedSize.width}x${selectedSize.height}`}>
                    <Eye className="w-5 h-5" />
                    Ver en AR
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-14 h-14 rounded-2xl p-0"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Envío gratuito</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">Pago seguro</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">30 días devolución</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Obras similares
                </h2>
                <Button variant="ghost" className="gap-2 rounded-xl" asChild>
                  <Link href="/catalogo">
                    Ver más
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedArtworks.map((art) => (
                  <Link key={art.id} href={`/obra/${art.id}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{art.artist}</p>
                        <p className="text-lg font-bold text-foreground mt-2">${art.price}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}
