"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Instagram, Twitter, Facebook, Youtube, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  producto: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Experiencia AR", href: "/ar-experience" },
    { label: "Artistas", href: "/artistas" },
    { label: "Colecciones", href: "/colecciones" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Prensa", href: "/prensa" },
    { label: "Carreras", href: "/carreras" },
  ],
  soporte: [
    { label: "Centro de Ayuda", href: "/ayuda" },
    { label: "Contacto", href: "/contacto" },
    { label: "Envíos", href: "/envios" },
    { label: "Devoluciones", href: "/devoluciones" },
  ],
  legal: [
    { label: "Términos", href: "/terminos" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Cookies", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 lg:py-16 border-b border-border">
          <div className="max-w-2xl">
            <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
              Mantente inspirado
            </h3>
            <p className="text-muted-foreground mb-6">
              Recibe las últimas tendencias en arte decorativo, nuevos artistas y ofertas exclusivas.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="pl-12 h-12 rounded-xl bg-background border-border"
                />
              </div>
              <Button type="submit" className="h-12 px-6 rounded-xl gap-2">
                Suscribirse
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 lg:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-foreground">
                Pixel<span className="text-primary">&</span>Paint
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Transformando la forma en que descubres y compras arte para tu hogar.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pixel & Paint. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Hecho con amor para artistas</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
