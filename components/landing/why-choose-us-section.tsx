"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Truck, Palette, Headphones, RefreshCw } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "Reducir incertidumbre",
    description: "Ve exactamente cómo se verá la obra en tu espacio antes de comprar. Sin sorpresas, sin devoluciones.",
  },
  {
    icon: Clock,
    title: "Ahorrar tiempo",
    description: "No más visitas a galerías ni mediciones. Decide desde la comodidad de tu hogar en minutos.",
  },
  {
    icon: Palette,
    title: "Decoración personalizada",
    description: "Encuentra el arte perfecto que combine con tu estilo y colores. Recomendaciones basadas en tu espacio.",
  },
  {
    icon: Headphones,
    title: "Experiencia inmersiva",
    description: "Tecnología AR de última generación que simula iluminación real y perspectiva precisa.",
  },
  {
    icon: Truck,
    title: "Envío seguro",
    description: "Embalaje profesional y envío asegurado. Tu obra llega perfecta a cualquier lugar.",
  },
  {
    icon: RefreshCw,
    title: "Garantía de satisfacción",
    description: "Si no te convence, tienes 30 días para devolverla sin preguntas. Tu satisfacción es nuestra prioridad.",
  },
]

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export function WhyChooseUsSection() {
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
            Ventajas
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Por qué elegir Pixel & Paint
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Hacemos que comprar arte sea una experiencia sin fricciones
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-5"
              >
                <benefit.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
