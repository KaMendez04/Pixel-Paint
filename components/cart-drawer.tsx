"use client"

import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart, removeItem, updateQuantity } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Carrito
            {totalItems > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground">
                {totalItems} {totalItems === 1 ? "producto" : "productos"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-foreground">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground text-center">
              Explora el catálogo y agrega las obras que más te gusten
            </p>
            <Button className="rounded-xl mt-2" onClick={closeCart} asChild>
              <Link href="/catalogo">Ver catálogo</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">{item.artist}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size.width} × {item.size.height} cm
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-foreground text-sm">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0 mt-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold text-foreground">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Envío e impuestos calculados en el checkout
              </p>
              <Button
                className="w-full h-12 rounded-xl text-base"
                onClick={closeCart}
                asChild
              >
                <Link href="/carrito">Ver carrito completo</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
