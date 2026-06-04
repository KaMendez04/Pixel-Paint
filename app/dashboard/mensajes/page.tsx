"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Send, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const conversations = [
  { id: 1, name: "Laura García", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", lastMessage: "¿Está disponible en 60x80 cm?", time: "10:32", unread: 2, online: true },
  { id: 2, name: "Carlos Mendoza", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", lastMessage: "Perfecto, haré el pago hoy", time: "09:15", unread: 0, online: false },
  { id: 3, name: "Ana Torres", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", lastMessage: "¡Gracias! Me encantó la obra 💜", time: "Ayer", unread: 1, online: true },
  { id: 4, name: "Miguel Ruiz", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", lastMessage: "¿Hacen envíos a México?", time: "Ayer", unread: 0, online: false },
  { id: 5, name: "Sofía Martínez", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop", lastMessage: "¿Puedes personalizar los colores?", time: "Lun", unread: 0, online: true },
]

type Message = { sender: "me" | "them"; text: string; time: string }

const initialMessages: Record<number, Message[]> = {
  1: [
    { sender: "them", text: "Hola! Vi tu obra 'Amanecer en la Montaña' y me encantó", time: "10:20" },
    { sender: "me", text: "¡Muchas gracias! Es una de mis favoritas 😊", time: "10:24" },
    { sender: "them", text: "¿Está disponible en 60x80 cm?", time: "10:32" },
  ],
  2: [
    { sender: "them", text: "Buenas tardes, me interesa la obra 'Geometría Urbana'", time: "08:50" },
    { sender: "me", text: "Hola Carlos! Sí está disponible. ¿Te gustaría más información?", time: "09:00" },
    { sender: "them", text: "Me gustaría la versión 50x70", time: "09:10" },
    { sender: "me", text: "Perfecto, te envío el link de compra 🎨", time: "09:12" },
    { sender: "them", text: "Perfecto, haré el pago hoy", time: "09:15" },
  ],
  3: [
    { sender: "them", text: "Recibí la obra hoy, es hermosa", time: "Ayer 14:00" },
    { sender: "me", text: "¡Qué alegría! Espero que la disfrutes mucho ✨", time: "Ayer 15:00" },
    { sender: "them", text: "¡Gracias! Me encantó la obra 💜", time: "Ayer 15:30" },
  ],
  4: [
    { sender: "them", text: "¿Hacen envíos a México?", time: "Ayer 11:00" },
    { sender: "me", text: "Sí, hacemos envíos internacionales. El costo varía según el destino.", time: "Ayer 12:00" },
  ],
  5: [
    { sender: "them", text: "¿Puedes personalizar los colores de una obra?", time: "Lun 09:00" },
    { sender: "me", text: "Hola Sofía! Sí, realizamos encargos personalizados. Cuéntame qué tienes en mente 🎨", time: "Lun 09:30" },
  ],
}

export default function MensajesPage() {
  const [selected, setSelected] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(initialMessages)

  const sendMessage = () => {
    if (!newMessage.trim()) return
    setChatMessages(prev => ({
      ...prev,
      [selected]: [...(prev[selected] || []), { sender: "me" as const, text: newMessage, time: "Ahora" }],
    }))
    setNewMessage("")
  }

  const currentConv = conversations.find(c => c.id === selected)
  const currentMessages = chatMessages[selected] || []

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 4rem)" }}>
      <header className="bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
        <p className="text-sm text-muted-foreground">3 mensajes sin leer</p>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* List */}
        <div className="w-72 border-r border-border bg-background flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-10 rounded-xl bg-muted border-0 h-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <button key={conv.id} onClick={() => setSelected(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors text-left border-b border-border/50",
                  selected === conv.id && "bg-primary/5 border-l-2 border-l-primary"
                )}>
                <div className="relative flex-shrink-0">
                  <img src={conv.avatar} alt={conv.name} className="w-11 h-11 rounded-full object-cover" />
                  {conv.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{conv.name}</p>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col bg-muted/30 min-w-0">
          <div className="px-6 py-3.5 bg-background border-b border-border flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={currentConv?.avatar} alt={currentConv?.name} className="w-10 h-10 rounded-full object-cover" />
                {currentConv?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{currentConv?.name}</p>
                <p className="text-xs text-muted-foreground">{currentConv?.online ? "En línea" : "Desconectado"}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="w-4 h-4" /></Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {currentMessages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl",
                  msg.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-background text-foreground rounded-bl-sm shadow-sm border border-border"
                )}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={cn("text-xs mt-1", msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-background border-t border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-xl bg-muted border-0"
              />
              <Button onClick={sendMessage} size="icon" className="rounded-xl w-10 h-10 flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
