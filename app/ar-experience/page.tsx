"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft,
  Camera,
  Plus,
  Minus,
  RotateCcw,
  Move,
  Sun,
  Moon,
  Share2,
  ShoppingCart,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid3X3,
  Image,
  Sparkles,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { artworks } from "@/lib/data"
import { cn } from "@/lib/utils"

const frameStyles = [
  { id: "none", label: "Sin marco", borderWidth: 0, color: "transparent" },
  { id: "white", label: "Blanco", borderWidth: 12, color: "#FFFFFF" },
  { id: "black", label: "Negro", borderWidth: 12, color: "#1E1E1E" },
  { id: "wood", label: "Madera", borderWidth: 14, color: "#8B4513" },
  { id: "gold", label: "Dorado", borderWidth: 14, color: "#D4AF37" },
  { id: "silver", label: "Plateado", borderWidth: 12, color: "#C0C0C0" },
]

const roomBackgrounds = [
  {
    id: "wall1",
    label: "Fondo Oficina",
    image: "/fondoOficina.png",
  },
  {
    id: "wall2",
    label: "Fondo Cafetería",
    image: "/fondoCafeteria.png",
  },
  {
    id: "living1",
    label: "Fondo Sala",
    image: "/fondoSala.png",
  },
  {
    id: "living2",
    label: "Fondo Cocina",
    image: "/fondoCocina.png",
  },
  {
    id: "bedroom",
    label: "Fondo Cuarto",
    image: "/fondoCuarto.png",
  },
  {
    id: "kinder",
    label: "Fondo Kinder",
    image: "/fondoKinder.png",
  },
  {
    id: "salon",
    label: "Fondo Salón",
    image: "/fondoSalon.png",
  },
]

function ARExperienceContent() {
  const searchParams = useSearchParams()
  const artworkId = searchParams.get("artwork") || "1"
  const initialArtwork = artworks.find((a) => a.id === artworkId) || artworks[0]
  const [currentArtwork, setCurrentArtwork] = useState(initialArtwork)
  
  const initialSizeParam = searchParams.get("size")
  const initialSize = currentArtwork.sizes.find(s => `${s.width}x${s.height}` === initialSizeParam) || currentArtwork.sizes[0]
  const [selectedSize, setSelectedSize] = useState(initialSize)

  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: -50 })
  const [rotation, setRotation] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(frameStyles[1])
  const [selectedRoom, setSelectedRoom] = useState(roomBackgrounds[0])
  const [lightMode, setLightMode] = useState<"day" | "night">("day")
  const [showControls, setShowControls] = useState(true)
  const [showArtworkPanel, setShowArtworkPanel] = useState(false)
  const [showRoomPanel, setShowRoomPanel] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate base scale from size
  const maxDimension = Math.max(...currentArtwork.sizes.map((s) => Math.max(s.width, s.height)))
  const currentDimension = Math.max(selectedSize.width, selectedSize.height)
  const sizeScaleFactor = currentDimension / maxDimension

  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 })

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.1, 2))
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.1, 0.3))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: -50 })
    setRotation(0)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      startPosX: position.x,
      startPosY: position.y,
    }
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const deltaX = clientX - dragRef.current.startX
    const deltaY = clientY - dragRef.current.startY
    setPosition({
      x: dragRef.current.startPosX + deltaX,
      y: dragRef.current.startPosY + deltaY,
    })
  }

  const handleDragEnd = () => setIsDragging(false)

  const handleScreenshot = async () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const selectArtwork = (art: typeof currentArtwork) => {
    setCurrentArtwork(art)
    setSelectedSize(art.sizes[0])
    setShowArtworkPanel(false)
    handleReset()
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setPosition((p) => ({ ...p, y: p.y - 10 }))
          break
        case "ArrowDown":
          setPosition((p) => ({ ...p, y: p.y + 10 }))
          break
        case "ArrowLeft":
          setPosition((p) => ({ ...p, x: p.x - 10 }))
          break
        case "ArrowRight":
          setPosition((p) => ({ ...p, x: p.x + 10 }))
          break
        case "+":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "r":
          handleReset()
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-screen bg-foreground overflow-hidden",
        isFullscreen && "fixed inset-0 z-50"
      )}
    >
      {/* Room Background */}
      <div className="absolute inset-0">
        <img
          src={selectedRoom.image}
          alt={selectedRoom.label}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            lightMode === "night" && "brightness-50"
          )}
        />
        {/* Ambient Light Overlay */}
        {/* Removed to show artwork more clearly */}
      </div>

      {/* AR Artwork */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          animate={{
            x: position.x,
            y: position.y,
            scale: scale * sizeScaleFactor,
            rotate: rotation,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className={cn(
            "relative cursor-move select-none",
            isDragging && "cursor-grabbing"
          )}
          style={{
            transformOrigin: "center center",
          }}
        >
          {/* Frame */}
          <div
            className="relative shadow-2xl"
            style={{
              padding: selectedFrame.borderWidth,
              backgroundColor: selectedFrame.color,
              boxShadow: lightMode === "night"
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Inner Mat (for framed options) */}
            {selectedFrame.id !== "none" && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  margin: selectedFrame.borderWidth,
                  boxShadow: "inset 0 0 10px rgba(0,0,0,0.2)",
                }}
              />
            )}
            
            {/* Artwork Image */}
            <img
              src={currentArtwork.image}
              alt={currentArtwork.title}
              className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem] object-cover"
              draggable={false}
            />

            {/* Light Reflection */}
            {/* Removed to show artwork more clearly */}
          </div>

          {/* Shadow on Wall */}
          <div
            className="absolute -z-10 inset-0 blur-xl opacity-30"
            style={{
              transform: "translate(20px, 20px)",
              backgroundColor: "black",
            }}
          />
        </motion.div>
      </div>

      {/* AR Active Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium">Modo AR Activo</span>
        </div>
      </motion.div>

      {/* Top Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
        className="absolute top-0 left-0 right-0 p-4 z-30"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md text-white hover:bg-black/60"
            asChild
          >
            <Link href="/catalogo">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md text-white hover:bg-black/60"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowControls(!showControls)}
              className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md text-white hover:bg-black/60"
            >
              <Grid3X3 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Side Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
          >
            <div className="flex flex-col gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="w-12 h-12 rounded-xl text-white hover:bg-white/20"
              >
                <Plus className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="w-12 h-12 rounded-xl text-white hover:bg-white/20"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <div className="w-full h-px bg-white/20" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setRotation((r) => r - 5)}
                className="w-12 h-12 rounded-xl text-white hover:bg-white/20"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="w-12 h-12 rounded-xl text-white hover:bg-white/20"
              >
                <Move className="w-5 h-5" />
              </Button>
              <div className="w-full h-px bg-white/20" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLightMode(lightMode === "day" ? "night" : "day")}
                className="w-12 h-12 rounded-xl text-white hover:bg-white/20"
              >
                {lightMode === "day" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-0 left-0 right-0 z-20"
          >
            <div className="p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent relative">
              {/* Floating Quick Actions (Side by side in the corner) */}
              <div className="absolute bottom-20 right-4 flex items-center gap-2">
                <Button
                  onClick={() => setShowArtworkPanel(true)}
                  variant="ghost"
                  className="h-8 px-3 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:bg-black/80 hover:text-white border border-white/10 gap-2 text-[10px] transition-all shadow-xl"
                >
                  <Image className="w-3 h-3" />
                  Cambiar obra
                </Button>
                <Button
                  onClick={() => setShowRoomPanel(true)}
                  variant="ghost"
                  className="h-8 px-3 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:bg-black/80 hover:text-white border border-white/10 gap-2 text-[10px] transition-all shadow-xl"
                >
                  <Sparkles className="w-3 h-3" />
                  Cambiar espacio
                </Button>
              </div>

              {/* Artwork Info Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                    <img
                      src={currentArtwork.image}
                      alt={currentArtwork.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">{currentArtwork.title}</h2>
                    <p className="text-white/70 text-sm">{currentArtwork.artist}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white font-bold">${selectedSize.price}</span>
                      <span className="text-white/50 text-xs px-2 py-0.5 rounded-full border border-white/20">
                        {selectedSize.width}x{selectedSize.height}cm
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1" />
              </div>


                {/* Size Selection */}
                <div className="mb-4">
                  <p className="text-white/70 text-sm mb-2">Tamaño disponible</p>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {currentArtwork.sizes.map((size) => (
                      <motion.button
                        key={`${size.width}x${size.height}`}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedSize(size);
                          // Force a small scale bounce for feedback
                          setScale(s => s * 1.02);
                          setTimeout(() => setScale(s => s / 1.02), 100);
                        }}
                        className={cn(
                          "flex-shrink-0 px-3 py-1.5 rounded-lg transition-all border",
                          selectedSize.width === size.width && selectedSize.height === size.height
                            ? "bg-white/30 border-white text-white shadow-inner"
                            : "bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                        )}
                      >
                        <span className="text-[11px] font-medium block leading-tight">
                          {size.width} x {size.height} cm
                        </span>
                        <span className="text-[9px] opacity-60">
                          ${size.price}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

              {/* Frame Selection */}
              <div className="mb-4">
                <p className="text-white/70 text-sm mb-2">Estilo de marco</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {frameStyles.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame)}
                      className={cn(
                        "flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                        selectedFrame.id === frame.id
                          ? "bg-white/20 ring-2 ring-white"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div
                        className="w-10 h-10 rounded-lg border-2"
                        style={{
                          borderColor: frame.color,
                          backgroundColor: frame.id === "none" ? "transparent" : frame.color,
                        }}
                      />
                      <span className="text-white text-xs">{frame.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Buy Button */}
              <Button
                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base font-semibold"
                asChild
              >
                <Link href={`/checkout?artwork=${currentArtwork.id}&size=${selectedSize.width}x${selectedSize.height}`}>
                  <ShoppingCart className="w-5 h-5" />
                  Comprar ahora - ${selectedSize.price}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artwork Selection Panel */}
      <AnimatePresence>
        {showArtworkPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowArtworkPanel(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[70vh] bg-background rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Seleccionar obra</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowArtworkPanel(false)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(70vh-60px)]">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {artworks.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => selectArtwork(art)}
                      className={cn(
                        "relative rounded-xl overflow-hidden border-2 transition-all",
                        currentArtwork.id === art.id
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full aspect-[4/5] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white text-sm font-medium line-clamp-1">
                          {art.title}
                        </p>
                        <p className="text-white/70 text-xs">${art.price}</p>
                      </div>
                      {currentArtwork.id === art.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Selection Panel */}
      <AnimatePresence>
        {showRoomPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRoomPanel(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-background rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 z-10 bg-background">
                <h3 className="text-lg font-semibold text-foreground">Seleccionar espacio</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowRoomPanel(false)}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[calc(80vh-70px)]">
                {roomBackgrounds.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setSelectedRoom(room)
                      setShowRoomPanel(false)
                    }}
                    className={cn(
                      "relative rounded-xl overflow-hidden border-2 transition-all aspect-video group",
                      selectedRoom.id === room.id
                        ? "border-primary ring-2 ring-primary"
                        : "border-transparent hover:border-primary/50"
                    )}
                  >
                    <img
                      src={room.image}
                      alt={room.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-semibold drop-shadow">{room.label}</p>
                    </div>
                    {selectedRoom.id === room.id && (
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Check className="w-5 h-5" />
              <span className="font-medium">Captura guardada</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ARExperiencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
      </div>
    }>
      <ARExperienceContent />
    </Suspense>
  )
}
