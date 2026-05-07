export interface Artwork {
  id: string
  title: string
  artist: string
  artistId: string
  price: number
  image: string
  category: string
  style: string
  colors: string[]
  sizes: { width: number; height: number; price: number }[]
  description: string
  featured: boolean
  rating: number
  reviews: number
}

export interface Artist {
  id: string
  name: string
  avatar: string
  bio: string
  location: string
  totalWorks: number
  totalSales: number
  rating: number
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Amanecer en la Montaña",
    artist: "María García",
    artistId: "a1",
    price: 250,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop",
    category: "Paisajes",
    style: "Impresionismo",
    colors: ["naranja", "azul", "dorado"],
    sizes: [
      { width: 40, height: 50, price: 250 },
      { width: 60, height: 75, price: 380 },
      { width: 80, height: 100, price: 520 },
    ],
    description: "Una captura majestuosa del amanecer sobre montañas nevadas, con tonos cálidos que evocan paz y serenidad.",
    featured: true,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: "2",
    title: "Geometría Urbana",
    artist: "Carlos Mendoza",
    artistId: "a2",
    price: 320,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop",
    category: "Abstracto",
    style: "Minimalista",
    colors: ["gris", "negro", "blanco"],
    sizes: [
      { width: 50, height: 50, price: 320 },
      { width: 70, height: 70, price: 450 },
      { width: 100, height: 100, price: 680 },
    ],
    description: "Exploración de líneas y formas inspiradas en la arquitectura moderna urbana.",
    featured: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "3",
    title: "Jardín Secreto",
    artist: "Ana Martínez",
    artistId: "a3",
    price: 180,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1200&fit=crop",
    category: "Naturaleza",
    style: "Realismo",
    colors: ["verde", "rosa", "blanco"],
    sizes: [
      { width: 30, height: 45, price: 180 },
      { width: 50, height: 75, price: 290 },
      { width: 70, height: 105, price: 420 },
    ],
    description: "Un rincón mágico de naturaleza donde las flores cuentan historias de primavera eterna.",
    featured: false,
    rating: 4.7,
    reviews: 64,
  },
  {
    id: "4",
    title: "Olas de Color",
    artist: "Roberto Sánchez",
    artistId: "a4",
    price: 420,
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600&fit=crop",
    category: "Abstracto",
    style: "Expresionismo",
    colors: ["azul", "turquesa", "blanco"],
    sizes: [
      { width: 60, height: 45, price: 420 },
      { width: 90, height: 68, price: 620 },
      { width: 120, height: 90, price: 890 },
    ],
    description: "Movimiento y energía capturados en ondas de color que fluyen como el mar.",
    featured: true,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "5",
    title: "Retrato de Luz",
    artist: "Elena Torres",
    artistId: "a5",
    price: 550,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=1000&fit=crop",
    category: "Retratos",
    style: "Contemporáneo",
    colors: ["dorado", "marrón", "crema"],
    sizes: [
      { width: 40, height: 50, price: 550 },
      { width: 60, height: 75, price: 780 },
      { width: 80, height: 100, price: 1100 },
    ],
    description: "Un estudio de la luz natural sobre el rostro humano, capturando emociones sutiles.",
    featured: false,
    rating: 4.8,
    reviews: 42,
  },
  {
    id: "6",
    title: "Ciudad de Noche",
    artist: "Miguel Ángel Ruiz",
    artistId: "a6",
    price: 380,
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=1000&fit=crop",
    category: "Urbano",
    style: "Realismo",
    colors: ["negro", "amarillo", "azul"],
    sizes: [
      { width: 50, height: 62, price: 380 },
      { width: 75, height: 93, price: 560 },
      { width: 100, height: 125, price: 790 },
    ],
    description: "Las luces de la ciudad crean un tapiz de color en la oscuridad de la noche.",
    featured: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: "7",
    title: "Bosque Encantado",
    artist: "Lucía Fernández",
    artistId: "a7",
    price: 290,
    image: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=1200&fit=crop",
    category: "Naturaleza",
    style: "Surrealismo",
    colors: ["verde", "morado", "azul"],
    sizes: [
      { width: 40, height: 60, price: 290 },
      { width: 60, height: 90, price: 420 },
      { width: 80, height: 120, price: 590 },
    ],
    description: "Un bosque donde la realidad se mezcla con la fantasía en tonos místicos.",
    featured: false,
    rating: 4.7,
    reviews: 53,
  },
  {
    id: "8",
    title: "Composición Minimalista",
    artist: "Pablo Vega",
    artistId: "a8",
    price: 210,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop",
    category: "Abstracto",
    style: "Minimalista",
    colors: ["blanco", "negro", "gris"],
    sizes: [
      { width: 50, height: 50, price: 210 },
      { width: 70, height: 70, price: 320 },
      { width: 100, height: 100, price: 480 },
    ],
    description: "La belleza en la simplicidad, donde cada línea tiene un propósito.",
    featured: false,
    rating: 4.5,
    reviews: 31,
  },
]

export const artists: Artist[] = [
  {
    id: "a1",
    name: "María García",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Artista visual especializada en paisajes y naturaleza. Su trabajo captura la esencia de los momentos efímeros de la luz.",
    location: "Madrid, España",
    totalWorks: 45,
    totalSales: 312,
    rating: 4.9,
  },
  {
    id: "a2",
    name: "Carlos Mendoza",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Arquitecto convertido en artista, explora la geometría y las formas urbanas en sus obras minimalistas.",
    location: "Barcelona, España",
    totalWorks: 32,
    totalSales: 198,
    rating: 4.8,
  },
  {
    id: "a3",
    name: "Ana Martínez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Botánica de formación, Ana traduce su amor por las plantas en obras que celebran la naturaleza.",
    location: "Valencia, España",
    totalWorks: 28,
    totalSales: 145,
    rating: 4.7,
  },
  {
    id: "a4",
    name: "Roberto Sánchez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Expresionista contemporáneo cuyas obras exploran el movimiento y la emoción a través del color.",
    location: "Sevilla, España",
    totalWorks: 56,
    totalSales: 423,
    rating: 4.9,
  },
]

export const categories = [
  "Todos",
  "Abstracto",
  "Paisajes",
  "Retratos",
  "Naturaleza",
  "Urbano",
  "Minimalista",
]

export const styles = [
  "Todos",
  "Impresionismo",
  "Minimalista",
  "Realismo",
  "Expresionismo",
  "Contemporáneo",
  "Surrealismo",
]

export const colorOptions = [
  { value: "todos", label: "Todos los colores" },
  { value: "azul", label: "Azul" },
  { value: "verde", label: "Verde" },
  { value: "naranja", label: "Naranja" },
  { value: "negro", label: "Negro" },
  { value: "blanco", label: "Blanco" },
  { value: "dorado", label: "Dorado" },
]

export const priceRanges = [
  { value: "all", label: "Todos los precios" },
  { value: "0-200", label: "Hasta $200" },
  { value: "200-400", label: "$200 - $400" },
  { value: "400-600", label: "$400 - $600" },
  { value: "600+", label: "Más de $600" },
]
