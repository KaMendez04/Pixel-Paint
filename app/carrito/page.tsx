"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useCart } from "@/contexts/cart-context"

export default function CarritoPage() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 lg:pt-24 flex flex-col items-center justify-center min-h-[70vh] gap-6 px-4">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tu carrito está vacío</h1>
          <p className="text-muted-foreground text-center max-w-sm">
            Explora el catálogo y agrega las obras que más te gusten a tu carrito.
          </p>
          <Button className="rounded-xl" asChild>
            <Link href="/catalogo">Explorar catálogo</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20 lg:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link href="/catalogo">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Carrito
            </h1>
            <span className="text-muted-foreground">
              ({totalItems} {totalItems === 1 ? "producto" : "productos"})
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 bg-card rounded-2xl border border-border p-4"
                >
                  <Link href={`/obra/${item.artworkId}`} className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/obra/${item.artworkId}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tamaño: {item.size.width} × {item.size.height} cm
                    </p>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      <div className="flex items-center border border-border rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors rounded-l-xl"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-9 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors rounded-r-xl"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <p className="font-bold text-foreground">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Resumen del pedido
                </h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                        {item.title} × {item.quantity}
                      </span>
                      <span className="text-foreground font-medium flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-primary font-medium">Gratis</span>
                </div>

                <Separator className="mb-4" />

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <Button className="w-full h-12 rounded-xl text-base" asChild>
                  <Link href="/checkout">Proceder al pago</Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Pago 100% seguro · Devoluciones en 30 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
