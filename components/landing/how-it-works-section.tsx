"use client"

import { motion } from "framer-motion"
import { Scan, Palette, Eye, Check } from "lucide-react"

const steps = [
  {
    icon: Scan,
    title: "Escanea tu espacio",
    description: "Apunta tu cámara hacia la pared donde quieres colocar el arte. Nuestra tecnología AR detectará automáticamente la superficie.",
    color: "bg-accent",
  },
  {
    icon: Palette,
    title: "Elige una obra",
    description: "Explora nuestro catálogo de más de 500 obras de artistas independientes. Filtra por estilo, color, tamaño y precio.",
    color: "bg-ring",
  },
  {
    icon: Eye,
    title: "Visualízala en tu pared",
    description: "Ve cómo se vería el cuadro en tu espacio real. Ajusta el tamaño, cambia el marco y compara diferentes opciones.",
    color: "bg-primary",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-primary text-sm font-medium mb-4">
            Proceso Simple
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Cómo funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            En solo tres pasos, transforma la manera en que eliges arte para tu hogar
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="relative bg-card rounded-3xl p-8 lg:p-10 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">{index + 1}</span>
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6`}
                >
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Features */}
                <div className="mt-6 space-y-2">
                  {index === 0 && (
                    <>
                      <Feature text="Detección automática de paredes" />
                      <Feature text="Compatible con iOS y Android" />
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <Feature text="Filtros inteligentes" />
                      <Feature text="Recomendaciones personalizadas" />
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <Feature text="Ajuste de tamaño en tiempo real" />
                      <Feature text="Simulación de iluminación" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Check className="w-4 h-4 text-ring" />
      <span>{text}</span>
    </div>
  )
}
