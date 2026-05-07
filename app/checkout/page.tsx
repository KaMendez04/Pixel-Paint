"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Truck,
  Shield,
  CheckCircle,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { artworks } from "@/lib/data"
import { cn } from "@/lib/utils"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const artworkId = searchParams.get("artwork") || "1"
  const sizeParam = searchParams.get("size") || "40x50"
  const quantity = parseInt(searchParams.get("qty") || "1", 10)

  const artwork = artworks.find((a) => a.id === artworkId) || artworks[0]
  const [width, height] = sizeParam.split("x").map(Number)
  const selectedSize = artwork.sizes.find(
    (s) => s.width === width && s.height === height
  ) || artwork.sizes[0]

  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "sinpe">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const subtotal = selectedSize.price * quantity
  const shipping = subtotal > 300 ? 0 : 25
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      setIsProcessing(true)
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsProcessing(false)
      setIsComplete(true)
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Compra Exitosa
          </h1>
          <p className="text-muted-foreground mb-8">
            Tu pedido ha sido confirmado. Recibirás un correo con los detalles de envío.
          </p>
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="text-left">
                <h3 className="font-semibold text-foreground">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedSize.width} x {selectedSize.height} cm
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-muted-foreground">Total pagado</span>
              <span className="text-xl font-bold text-foreground">${total}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 rounded-xl" asChild>
              <Link href="/catalogo">Seguir comprando</Link>
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl" asChild>
              <Link href="/dashboard">Ver mis pedidos</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2 rounded-xl" asChild>
              <Link href={`/obra/${artwork.id}`}>
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              Pago seguro
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Envío" },
            { num: 2, label: "Pago" },
            { num: 3, label: "Confirmar" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                  step === s.num
                    ? "bg-primary text-primary-foreground"
                    : step > s.num
                    ? "bg-accent/50 text-primary cursor-pointer"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-medium">
                  {step > s.num ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    s.num
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {index < 2 && (
                <ChevronRight className="w-5 h-5 text-muted-foreground mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Información de Envío
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nombre
                      </label>
                      <Input
                        type="text"
                        placeholder="Tu nombre"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Apellido
                      </label>
                      <Input
                        type="text"
                        placeholder="Tu apellido"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Correo electrónico
                      </label>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Dirección
                      </label>
                      <Input
                        type="text"
                        placeholder="Calle y número"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Ciudad
                      </label>
                      <Input
                        type="text"
                        placeholder="Tu ciudad"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Código Postal
                      </label>
                      <Input
                        type="text"
                        placeholder="00000"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Teléfono
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 234 567 890"
                        className="h-12 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Método de Pago
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { id: "card", label: "Tarjeta", icon: CreditCard },
                      { id: "paypal", label: "PayPal", icon: CreditCard },
                      { id: "sinpe", label: "SINPE", icon: CreditCard },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <method.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Número de tarjeta
                        </label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="h-12 rounded-xl"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Fecha de expiración
                          </label>
                          <Input
                            type="text"
                            placeholder="MM/AA"
                            className="h-12 rounded-xl"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            CVV
                          </label>
                          <Input
                            type="text"
                            placeholder="123"
                            className="h-12 rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Nombre en la tarjeta
                        </label>
                        <Input
                          type="text"
                          placeholder="Nombre completo"
                          className="h-12 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Serás redirigido a PayPal para completar el pago
                      </p>
                      <div className="w-32 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto">
                        <span className="font-bold text-blue-600">PayPal</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "sinpe" && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Realiza la transferencia al siguiente número SINPE
                      </p>
                      <div className="bg-secondary rounded-xl p-6">
                        <p className="text-2xl font-bold text-foreground mb-2">8888-8888</p>
                        <p className="text-sm text-muted-foreground">Pixel & Paint S.A.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Confirmar Pedido
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Summary */}
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Envío a:</span>
                        <Button variant="ghost" size="sm" className="text-primary" onClick={() => setStep(1)}>
                          Editar
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Juan Pérez<br />
                        Calle Principal 123<br />
                        San José, Costa Rica 10101
                      </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Método de pago:</span>
                        <Button variant="ghost" size="sm" className="text-primary" onClick={() => setStep(2)}>
                          Editar
                        </Button>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {paymentMethod === "card" && "Tarjeta terminada en 3456"}
                        {paymentMethod === "paypal" && "PayPal"}
                        {paymentMethod === "sinpe" && "SINPE Móvil"}
                      </p>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 rounded" required />
                      <span className="text-sm text-muted-foreground">
                        Acepto los <Link href="/terminos" className="text-primary hover:underline">Términos y Condiciones</Link> y la <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl text-base gap-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : step < 3 ? (
                    <>
                      Continuar
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pagar ${total}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Resumen del Pedido
              </h2>

              {/* Product */}
              <div className="flex gap-4 pb-6 border-b border-border">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{artwork.title}</h3>
                  <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSize.width} x {selectedSize.height} cm
                  </p>
                  <p className="text-sm text-muted-foreground">Cantidad: {quantity}</p>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 py-6 border-b border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-foreground">
                    {shipping === 0 ? "Gratis" : `$${shipping}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-6">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${total}</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Envío asegurado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Pago seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
