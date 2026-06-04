"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background Photo */}
      <div className="absolute inset-0">
        <img
          src="/fondoPrincipal.png"
          alt=""
          className="hidden lg:block w-full h-full object-cover object-center"
        />
        <img
          src="/fondoPrincipalMobile.png"
          alt=""
          className="block lg:hidden w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full py-32 px-4 sm:px-6 lg:px-8"
      >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Comienza gratis
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Transforma tu espacio con el arte perfecto
            </h2>

            <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto text-pretty">
              Únete a miles de amantes del arte que ya descubrieron la forma más inteligente de decorar sus hogares
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl text-sm sm:text-base gap-2 bg-white text-primary hover:bg-white/90 shadow-lg"
                asChild
              >
                <Link href="/ar-experience">
                  Probar AR ahora
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl text-sm sm:text-base border-white/50 bg-white/15 text-white hover:bg-white/25 hover:text-white backdrop-blur-sm"
                asChild
              >
                <Link href="/catalogo">
                  Explorar catálogo
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sin tarjeta requerida</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Prueba gratuita ilimitada</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Soporte 24/7</span>
              </div>
            </motion.div>
          </div>
      </motion.div>
    </section>
  )
}
