"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Heart, User, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/ar-experience", label: "Experiencia AR" },
  { href: "/artistas", label: "Artistas" },
  { href: "/como-funciona", label: "Cómo Funciona" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Pixel<span className="text-primary">&</span>Paint
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link href="/favoritos">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Favoritos</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link href="/carrito">
                <ShoppingBag className="w-5 h-5" />
                <span className="sr-only">Carrito</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link href="/dashboard">
                <User className="w-5 h-5" />
                <span className="sr-only">Perfil</span>
              </Link>
            </Button>
            <Button className="rounded-xl ml-2" asChild>
              <Link href="/ar-experience">
                Probar AR
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-lg font-medium text-foreground hover:bg-secondary rounded-xl transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full rounded-xl justify-start gap-2" asChild>
                  <Link href="/favoritos">
                    <Heart className="w-5 h-5" />
                    Favoritos
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl justify-start gap-2" asChild>
                  <Link href="/carrito">
                    <ShoppingBag className="w-5 h-5" />
                    Carrito
                  </Link>
                </Button>
                <Button className="w-full rounded-xl mt-2" asChild>
                  <Link href="/ar-experience">
                    Probar AR
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
