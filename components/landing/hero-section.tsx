"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Wall Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
          alt="Pared elegante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Tecnología AR revolucionaria
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight">
              <span className="text-balance">Visualiza arte</span>
              <br />
              <span className="text-balance">en tu espacio</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">
                antes de comprarlo
              </span>
            </h1>

            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed text-pretty">
              Pixel & Paint usa realidad aumentada para proyectar cuadros en tus paredes reales. 
              Elimina la incertidumbre y encuentra el arte perfecto para tu hogar.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl text-sm sm:text-base gap-2 shadow-lg shadow-primary/25" asChild>
                <Link href="/ar-experience">
                  Probar visualización AR
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl text-sm sm:text-base bg-background/50 backdrop-blur-sm" asChild>
                <Link href="/catalogo">
                  Explorar catálogo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 lg:mt-12 flex items-center gap-6 sm:gap-8 lg:gap-10 justify-center lg:justify-start"
            >
              {[
                { value: "+500", label: "Obras" },
                { value: "+100", label: "Artistas" },
                { value: "95%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image - Art on Wall Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Preview Card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-white/10"
              >
                {/* Room with Art */}
                <div className="relative aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop"
                    alt="Sala moderna con arte"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlayed Artwork Frame */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[35%] aspect-[3/4] rounded-lg shadow-2xl overflow-hidden"
                    style={{
                      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 8px rgba(255,255,255,0.9)"
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop"
                      alt="Obra de arte"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* AR Interface Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Corner Guides */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/60 rounded-tl-lg" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/60 rounded-tr-lg" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/60 rounded-bl-lg" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/60 rounded-br-lg" />
                  </div>

                  {/* Bottom Status Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                          <Eye className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <span className="text-white text-sm font-medium block">Modo AR Activo</span>
                          <span className="text-white/70 text-xs">Arrastra para mover</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
                          40×50 cm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/30 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Vista previa AR</p>
                    <p className="text-xs text-muted-foreground">En tiempo real</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Compra segura</p>
                    <p className="text-xs text-muted-foreground">Garantía incluida</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Preview - Show below content on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="lg:hidden absolute bottom-0 left-0 right-0 px-4 pb-4"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-sm mx-auto">
          <div className="relative aspect-[16/10]">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=375&fit=crop"
              alt="Sala moderna"
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[30%] aspect-[3/4] rounded shadow-xl overflow-hidden"
              style={{
                boxShadow: "0 15px 30px -8px rgba(0,0,0,0.3), 0 0 0 4px rgba(255,255,255,0.9)"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=250&fit=crop"
                alt="Obra de arte"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <Eye className="w-3 h-3 text-primary" />
                </div>
                <span className="text-white text-xs font-medium">AR Activo</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-foreground/30"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
