"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, CreditCard, Shield, Save, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "notifications", label: "Notificaciones", icon: Bell },
  { id: "payment", label: "Pagos", icon: CreditCard },
  { id: "security", label: "Seguridad", icon: Shield },
]

const profileFields = [
  { label: "Nombre", value: "María", placeholder: "Tu nombre" },
  { label: "Apellido", value: "García", placeholder: "Tu apellido" },
  { label: "Correo", value: "maria@gmail.com", placeholder: "correo@ejemplo.com", type: "email", colSpan: true },
  { label: "Teléfono", value: "+506 8888-8888", placeholder: "+1 234 567", type: "tel", colSpan: true },
  { label: "País", value: "Costa Rica", placeholder: "Tu país" },
  { label: "Ciudad", value: "San José", placeholder: "Tu ciudad" },
]

const notificationItems = [
  { label: "Nuevos pedidos", desc: "Recibe un aviso cuando alguien compre una obra", default: true },
  { label: "Mensajes", desc: "Notificaciones de nuevos mensajes de clientes", default: true },
  { label: "Favoritos", desc: "Cuando alguien guarde tus obras en favoritos", default: false },
  { label: "Actualizaciones de la plataforma", desc: "Nuevas funciones y mejoras", default: true },
  { label: "Ofertas especiales", desc: "Descuentos y promociones exclusivas para artistas", default: false },
  { label: "Resumen semanal", desc: "Estadísticas de tus obras cada semana", default: true },
]

const paymentMethods = [
  { type: "SINPE Móvil", detail: "8765-4321", active: true },
  { type: "Cuenta bancaria", detail: "BAC · ****4892", active: false },
]

const paymentHistory = [
  { date: "15 Mar 2025", amount: "$1,240" },
  { date: "15 Feb 2025", amount: "$890" },
  { date: "15 Ene 2025", amount: "$2,100" },
]

const sessions = [
  { device: "MacBook Pro 16\"", location: "San José, Costa Rica", time: "Ahora · Este dispositivo", current: true },
  { device: "iPhone 15", location: "San José, Costa Rica", time: "Hace 2 horas", current: false },
  { device: "Chrome en Windows", location: "Heredia, Costa Rica", time: "Hace 3 días", current: false },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <header className="sticky top-0 lg:top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
            <p className="text-sm text-muted-foreground">Administra tu cuenta y preferencias</p>
          </div>
          <Button onClick={handleSave} className="rounded-xl gap-2">
            <Save className="w-4 h-4" />
            {saved ? "¡Guardado!" : "Guardar cambios"}
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tab Nav */}
          <div className="lg:w-52 flex-shrink-0">
            <nav className="space-y-1 bg-card rounded-2xl border border-border p-2">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}>
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Foto de perfil</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                        alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">María García</p>
                      <p className="text-sm text-muted-foreground mb-3">Artista Premium · Desde 2023</p>
                      <Button variant="outline" size="sm" className="rounded-xl">Cambiar foto</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Información personal</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {profileFields.map(f => (
                      <div key={f.label} className={f.colSpan ? "sm:col-span-2" : ""}>
                        <label className="text-sm font-medium text-foreground mb-2 block">{f.label}</label>
                        <Input defaultValue={f.value} placeholder={f.placeholder} type={f.type || "text"} className="h-12 rounded-xl" />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-foreground mb-2 block">Biografía</label>
                      <textarea
                        defaultValue="Artista costarricense especializada en arte abstracto y naturaleza. Más de 10 años creando piezas únicas para espacios que inspiran."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-card rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-6">Preferencias de notificaciones</h2>
                <div className="space-y-1">
                  {notificationItems.map(item => (
                    <div key={item.label} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-10 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "payment" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Método de cobro</h2>
                  <div className="space-y-3">
                    {paymentMethods.map(m => (
                      <div key={m.type} className={cn(
                        "flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                        m.active ? "border-primary bg-primary/5" : "border-border"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{m.type}</p>
                            <p className="text-xs text-muted-foreground">{m.detail}</p>
                          </div>
                        </div>
                        {m.active && <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Principal</span>}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-xl gap-2">
                      <CreditCard className="w-4 h-4" />Agregar método de cobro
                    </Button>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-1">Historial de pagos</h2>
                  <p className="text-sm text-muted-foreground mb-6">Pagos recibidos de Pixel & Paint</p>
                  <div className="space-y-1">
                    {paymentHistory.map(p => (
                      <div key={p.date} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground">{p.date}</span>
                        <span className="text-sm font-semibold text-foreground">{p.amount}</span>
                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Pagado</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Cambiar contraseña</h2>
                  <div className="space-y-4 max-w-md">
                    {["Contraseña actual", "Nueva contraseña", "Confirmar nueva contraseña"].map(label => (
                      <div key={label}>
                        <label className="text-sm font-medium text-foreground mb-2 block">{label}</label>
                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" />
                      </div>
                    ))}
                    <Button className="rounded-xl">Actualizar contraseña</Button>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-1">Sesiones activas</h2>
                  <p className="text-sm text-muted-foreground mb-6">Dispositivos con sesión iniciada</p>
                  <div className="space-y-1">
                    {sessions.map(s => (
                      <div key={s.device} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <p className="font-medium text-foreground text-sm">{s.device}</p>
                          <p className="text-xs text-muted-foreground">{s.location} · {s.time}</p>
                        </div>
                        {s.current
                          ? <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">Actual</span>
                          : <Button variant="ghost" size="sm" className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50">Cerrar</Button>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
