"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye, PhoneCall, PhoneOff, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [isCalling, setIsCalling] = useState(false)
  const phoneNumberDisplay = "8765 4321"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-4 w-fit"
            >
              <Sparkles className="w-3 h-3" />
              Tecnología AR revolucionaria
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
              <span className="block text-slate-900">Visualiza arte en tu</span>
              <span className="block text-slate-900">espacio</span>
              <span className="block bg-gradient-to-r from-primary via-ring to-accent bg-clip-text text-transparent">antes de comprarlo</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
              Pixel & Paint usa realidad aumentada para proyectar cuadros en tus paredes reales. Elimina la incertidumbre y encuentra el arte perfecto para tu hogar.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6 gap-2" asChild>
                <Link href="/ar-experience">
                  Probar visualización AR
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-900 rounded-xl h-12 px-6" asChild>
                <Link href="/catalogo">
                  Explorar catálogo
                </Link>
              </Button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "+500", label: "Obras" },
                { value: "+100", label: "Artistas" },
                { value: "95%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-64">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35], rotate: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-ring/25 blur-2xl"
              />

              {/* Phone Frame */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Phone Bezel */}
                <div className="bg-black rounded-3xl p-3 shadow-2xl" style={{ aspectRatio: "9/19.5" }}>
                  {/* Phone Screen */}
                  <div className="bg-white rounded-3xl w-full h-full overflow-hidden flex flex-col relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl z-20" />

                    {/* Screen Content */}
                    <div className="flex-1 relative overflow-hidden pt-8">
                      <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=700&fit=crop"
                        alt="Sala moderna"
                        className="w-full h-full object-cover"
                      />

                      {/* Overlayed Artwork */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                        transition={{ delay: 0.6, duration: 0.6, y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-32 h-40 rounded-lg shadow-lg overflow-hidden"
                        style={{
                          boxShadow: "0 15px 40px rgba(0,0,0,0.3), 0 0 0 6px white"
                        }}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=400&fit=crop"
                          alt="Obra de arte"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <motion.div
                        animate={{ y: [0, 260, 0], opacity: [0, 0.45, 0] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 right-0 top-16 h-20 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                      />

                      <button
                        type="button"
                        onClick={() => setIsCalling(true)}
                        aria-label="Mostrar pantalla de llamada"
                        className="absolute bottom-14 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        {isCalling ? "Llamando..." : "Llamar"}
                      </button>

                      {/* AR Bottom Bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                              <Eye className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium">AR Activo</span>
                          </div>
                        </div>
                      </div>

                      {isCalling && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 z-30 bg-gradient-to-b from-slate-900/95 via-slate-900/92 to-slate-950/95 text-white flex flex-col items-center justify-between pt-20 pb-8"
                        >
                          <div className="text-center">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Llamando</p>
                            <p className="mt-3 text-2xl font-semibold">{phoneNumberDisplay}</p>
                            <p className="mt-1 text-xs text-white/60">Encargos Pixel & Paint</p>
                          </div>

                          <div className="flex flex-col items-center gap-4">
                            <motion.div
                              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.8, 0.45] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                              className="h-16 w-16 rounded-full bg-emerald-400/25 border border-emerald-300/40"
                            />
                            <button
                              type="button"
                              onClick={() => setIsCalling(false)}
                              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white"
                            >
                              <PhoneOff className="h-3.5 w-3.5" />
                              Finalizar llamada
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Home Indicator */}
                    <div className="h-6 bg-black" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Card - Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-4 shadow-lg border border-slate-200 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Compra segura</p>
                    <p className="text-xs text-slate-600">Garantía incluida</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute -top-5 -left-10 rounded-xl bg-white/95 backdrop-blur px-3 py-2 shadow-md border border-slate-200"
              >
                <p className="text-[11px] font-semibold text-slate-800">Vista previa AR</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Phone Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:hidden flex justify-center"
          >
            <div className="relative w-full max-w-xs">
              {/* Phone Frame */}
              <div className="bg-black rounded-3xl p-2 shadow-2xl">
                <div className="bg-white rounded-3xl w-full overflow-hidden flex flex-col relative" style={{ aspectRatio: "9/19.5" }}>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-3xl z-20" />

                  {/* Screen Content */}
                  <div className="flex-1 relative overflow-hidden pt-6">
                    <img
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&h=500&fit=crop"
                      alt="Sala moderna"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlayed Artwork */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-32 rounded shadow-lg overflow-hidden"
                      style={{
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3), 0 0 0 4px white"
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=300&fit=crop"
                        alt="Obra de arte"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <button
                      type="button"
                      onClick={() => setIsCalling(true)}
                      aria-label="Mostrar pantalla de llamada"
                      className="absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground shadow-md"
                    >
                      <PhoneCall className="h-3 w-3" />
                      {isCalling ? "Llamando..." : "Llamar"}
                    </button>

                    {/* AR Bottom Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <Eye className="w-2 h-2 text-white" />
                        </div>
                        <span className="text-xs font-medium">AR Activo</span>
                      </div>
                    </div>

                    {isCalling && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-30 bg-gradient-to-b from-slate-900/95 via-slate-900/92 to-slate-950/95 text-white flex flex-col items-center justify-between pt-16 pb-6"
                      >
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-white/70">Llamando</p>
                          <p className="mt-2 text-lg font-semibold">{phoneNumberDisplay}</p>
                          <p className="mt-1 text-[10px] text-white/60">Encargos Pixel & Paint</p>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.8, 0.45] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="h-12 w-12 rounded-full bg-emerald-400/25 border border-emerald-300/40"
                          />
                          <button
                            type="button"
                            onClick={() => setIsCalling(false)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-1.5 text-[10px] font-semibold text-white"
                          >
                            <PhoneOff className="h-3 w-3" />
                            Finalizar
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Home Indicator */}
                  <div className="h-4 bg-black" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-slate-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
