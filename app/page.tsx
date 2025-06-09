"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Heart,
  Calendar,
  Play,
  ChevronLeft,
  ChevronRight,
  Music,
  Palette,
  Volume2,
  VolumeX,
  Pause,
  Settings,
  X,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Temas disponíveis com gradientes modernos e românticos
const themes = {
  classic: {
    name: "Amor Clássico",
    gradient: "from-rose-100 via-pink-50 to-red-100",
    cardGradient: "from-white to-pink-50",
    headerGradient: "bg-gradient-to-r from-rose-400 via-pink-300 to-red-300",
    primary: "text-rose-500",
    secondary: "text-pink-500",
    accent: "bg-gradient-to-r from-rose-500 via-pink-400 to-red-400",
    particles: "bg-rose-200",
    badge: "bg-rose-100 text-rose-800",
    border: "border-rose-200",
  },
  modern: {
    name: "Amor Moderno",
    gradient: "from-violet-100 via-purple-50 to-fuchsia-100",
    cardGradient: "from-white to-violet-50",
    headerGradient: "bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-300",
    primary: "text-violet-600",
    secondary: "text-purple-500",
    accent: "bg-gradient-to-r from-violet-500 via-purple-400 to-fuchsia-400",
    particles: "bg-violet-200",
    badge: "bg-violet-100 text-violet-800",
    border: "border-violet-200",
  },
  sunset: {
    name: "Pôr do Sol",
    gradient: "from-amber-100 via-orange-50 to-rose-100",
    cardGradient: "from-white to-amber-50",
    headerGradient: "bg-gradient-to-r from-amber-400 via-orange-300 to-rose-300",
    primary: "text-amber-600",
    secondary: "text-orange-500",
    accent: "bg-gradient-to-r from-amber-500 via-orange-400 to-rose-400",
    particles: "bg-amber-200",
    badge: "bg-amber-100 text-amber-800",
    border: "border-amber-200",
  },
  ocean: {
    name: "Oceano de Amor",
    gradient: "from-cyan-100 via-sky-50 to-blue-100",
    cardGradient: "from-white to-sky-50",
    headerGradient: "bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-300",
    primary: "text-sky-600",
    secondary: "text-cyan-500",
    accent: "bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-400",
    particles: "bg-sky-200",
    badge: "bg-sky-100 text-sky-800",
    border: "border-sky-200",
  },
  dream: {
    name: "Sonho Romântico",
    gradient: "from-pink-100 via-purple-50 to-indigo-100",
    cardGradient: "from-white to-pink-50",
    headerGradient: "bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300",
    primary: "text-pink-600",
    secondary: "text-purple-500",
    accent: "bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400",
    particles: "bg-pink-200",
    badge: "bg-pink-100 text-pink-800",
    border: "border-pink-200",
  },
}

// Músicas disponíveis
const musicOptions = [
  { id: "none", name: "Sem Música", url: "" },
  { id: "romantic1", name: "Os Anjos Cantam", url: "/images/Jorge & Mateus - Os Anjos Cantam (LyricVideo) [Álbum Os Anjos Cantam].mp3" },
  { id: "romantic2", name: "Love Someone", url: "/images/Lukas Graham - Love Someone [Live at Royal Arena].mp3" },
  { id: "romantic3", name: "Valsa dos Namorados", url: "/placeholder-audio.mp3" },
  { id: "romantic4", name: "Canção de Amor", url: "/placeholder-audio.mp3" },
]

// Dados das fotos com informações adicionais
const photos = [
  {
    id: 1,
    src: "/images/casal-de-bicicleta-posando-enquanto-inclinando-se-para-um-beijo.jpg",
    alt: "Nosso primeiro encontro",
    title: "Primeiro Encontro",
    date: "14 de Fevereiro de 2023",
    location: "Café Amoroso, São Paulo",
    description:
      "Aquele dia mágico quando nossos olhares se cruzaram pela primeira vez. O nervosismo, os sorrisos tímidos e a certeza de que algo especial estava começando.",
    longDescription:
      "Lembro como se fosse ontem. Cheguei 15 minutos antes, nervoso, escolhendo a mesa perfeita. Quando você entrou pela porta, o tempo pareceu parar. Seu sorriso iluminou todo o ambiente. Conversamos por horas, esquecendo completamente do mundo lá fora. Foi naquele momento que soube que minha vida nunca mais seria a mesma. A forma como você gesticulava ao contar suas histórias, como seus olhos brilhavam ao falar sobre seus sonhos... tudo me encantou profundamente. Saí daquele café com a certeza de que queria passar muito mais tempo ao seu lado.",
  },
  {
    id: 2,
    src: "/images/pexels-ikaandlukas-773327.jpg",
    alt: "Viagem romântica",
    title: "Nossa Primeira Viagem",
    date: "10 de Abril de 2023",
    location: "Praia dos Namorados, Rio de Janeiro",
    description:
      "Descobrindo novos lugares juntos, criando memórias que levaremos para sempre. Cada momento foi uma nova aventura ao seu lado.",
    longDescription:
      "Planejamos essa viagem por semanas, mas nada nos preparou para a magia que vivemos. O pôr do sol na praia, caminhando de mãos dadas enquanto as ondas molhavam nossos pés. Aquela noite estrelada quando fizemos promessas sob o céu infinito. Os cafés da manhã na varanda, observando o mar e sonhando com nosso futuro. Descobrimos tantas coisas um sobre o outro naqueles dias. Como você adora acordar cedo para ver o nascer do sol, como prefere sorvete de chocolate após o jantar, como seu riso ecoa quando está verdadeiramente feliz. Voltamos dessa viagem diferentes, mais conectados, mais apaixonados.",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=500&width=700",
    alt: "Jantar especial",
    title: "Jantar Inesquecível",
    date: "25 de Junho de 2023",
    location: "Restaurante Estrela, Belo Horizonte",
    description:
      "Uma noite perfeita, com conversas que duraram horas e risos que ecoaram em nossos corações. Momentos simples que se tornaram extraordinários.",
    longDescription:
      "Foi uma surpresa que planejei por semanas. Reservei aquela mesa especial com vista para a cidade, pedi ao chef que preparasse seu prato favorito, e até escolhi a música que tocaria quando chegássemos. Seu olhar de surpresa quando entramos no restaurante valeu cada detalhe planejado. Conversamos sobre nossos sonhos, relembramos momentos engraçados e fizemos planos para o futuro. Aquela garrafa de vinho que dividimos, o sobremesa de chocolate que compartilhamos com duas colheres, a forma como você segurou minha mão sobre a mesa... Cada segundo daquela noite está gravado em minha memória como um dos momentos mais perfeitos que já vivemos.",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=500&width=700",
    alt: "Momento casual",
    title: "Momentos Cotidianos",
    date: "12 de Agosto de 2023",
    location: "Nossa Casa",
    description:
      "Porque o amor está nos pequenos gestos, nos sorrisos matinais e na companhia silenciosa que aquece o coração.",
    longDescription:
      "Não foi um dia especial ou uma data comemorativa. Era apenas um domingo comum, daqueles preguiçosos. Você preparava o café enquanto eu tentava consertar aquela prateleira. O cheiro de pão fresco invadiu a casa, misturando-se com o aroma do café recém-passado. Sentamos no sofá, você com um livro e eu com o jornal, em um silêncio confortável que dizia tudo sem precisar de palavras. De repente, você olhou para mim e sorriu, aquele sorriso que sempre me desarma. Foi quando percebi que a felicidade está nesses momentos simples, na rotina que construímos juntos, na paz de ter você ao meu lado mesmo quando não estamos fazendo nada extraordinário. É no cotidiano que nosso amor se fortalece e se renova a cada dia.",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=500&width=700",
    alt: "Celebração",
    title: "Comemorações",
    date: "30 de Setembro de 2023",
    location: "Parque das Flores",
    description: "Cada conquista, cada alegria compartilhada, cada brinde ao nosso amor que cresce a cada dia.",
    longDescription:
      "Decidimos comemorar aquela conquista importante com um piquenique no parque. Levamos uma cesta com todas as nossas comidas favoritas, uma toalha xadrez e muito entusiasmo. O dia estava perfeito, com o sol brilhando entre nuvens esparsas e uma brisa suave que balançava as folhas das árvores. Brindamos com taças de espumante, celebrando não apenas aquela conquista específica, mas tudo o que construímos juntos até ali. Tiramos fotos, rimos até a barriga doer e fizemos planos ambiciosos para o futuro. Quando o sol começou a se pôr, deitamos na toalha lado a lado, observando o céu mudar de cor. Você segurou minha mão e disse 'Obrigado por estar ao meu lado em todos os momentos'. Foi simples, sincero e perfeito, assim como nosso amor.",
  },
]

// Dados dos vídeos
const videos = [
  {
    id: 1,
    thumbnail: "/images/casal-de-bicicleta-posando-enquanto-inclinando-se-para-um-beijo.jpg",
    title: "Nossa Música",
    description: "A canção que toca sempre que penso em você",
  },
  {
    id: 2,
    thumbnail: "/images/us.png",
    title: "Momentos Especiais",
    description: "Compilação dos nossos melhores momentos juntos",
  },
  {
    id: 3,
    thumbnail: "/placeholder.svg?height=400&width=600",
    title: "Declaração",
    description: "Palavras do coração para você",
  },
  {
    id: 4,
    thumbnail: "/placeholder.svg?height=400&width=600",
    title: "Aventuras",
    description: "Nossas jornadas e descobertas pelo mundo",
  },
]

// Componente de partículas flutuantes
function FloatingParticles({ theme }: { theme: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 ${themes[theme as keyof typeof themes].particles} rounded-full opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 25}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function ValentinePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentTheme, setCurrentTheme] = useState("classic")
  const [selectedMusic, setSelectedMusic] = useState("none")
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([0.5])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const photoCarouselRef = useRef<HTMLDivElement>(null)

  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const startDate = new Date("2023-02-14T00:00:00")
  const theme = themes[currentTheme as keyof typeof themes]

  // Timer effect
  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ years, months, days, hours, minutes, seconds })
    }

    calculateTimeElapsed()
    const interval = setInterval(calculateTimeElapsed, 1000)
    return () => clearInterval(interval)
  }, [])

  // Music control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0]
      if (selectedMusic !== "none" && isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [selectedMusic, isPlaying, volume])

  // Drag handlers for photo carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - dragStart
    setDragOffset(diff)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevPhoto()
      } else {
        nextPhoto()
      }
    }
    setDragOffset(0)
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const toggleMusic = () => {
    if (selectedMusic === "none") return
    setIsPlaying(!isPlaying)
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} relative transition-all duration-1000`}>
      <FloatingParticles theme={currentTheme} />

      {/* Audio element */}
      {selectedMusic !== "none" && (
        <audio ref={audioRef} loop>
          <source src={musicOptions.find((m) => m.id === selectedMusic)?.url} type="audio/mpeg" />
        </audio>
      )}

      {/* Controls Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleControls}
          size="icon"
          className={`rounded-full shadow-lg ${theme.headerGradient} hover:opacity-90 transition-all duration-300`}
        >
          {showControls ? <X className="w-5 h-5 text-white" /> : <Settings className="w-5 h-5 text-white" />}
        </Button>
      </div>

      {/* Controls Panel */}
      {showControls && (
        <div className="fixed top-16 right-4 z-50 animate-fade-in">
          <Card
            className={`p-4 bg-gradient-to-r ${theme.cardGradient} backdrop-blur-sm shadow-xl border ${theme.border}`}
          >
            <div className="space-y-4">
              {/* Theme Selector */}
              <div className="flex items-center gap-2">
                <Palette className={`w-4 h-4 ${theme.primary}`} />
                <Select value={currentTheme} onValueChange={setCurrentTheme}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(themes).map(([key, theme]) => (
                      <SelectItem key={key} value={key}>
                        {theme.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Music Selector */}
              <div className="flex items-center gap-2">
                <Music className={`w-4 h-4 ${theme.primary}`} />
                <Select value={selectedMusic} onValueChange={setSelectedMusic}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {musicOptions.map((music) => (
                      <SelectItem key={music.id} value={music.id}>
                        {music.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Music Controls */}
              {selectedMusic !== "none" && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={toggleMusic} className={theme.primary}>
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" className={theme.primary}>
                      {volume[0] > 0 ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Slider value={volume} onValueChange={setVolume} max={1} step={0.1} className="w-32" />
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className={`text-center py-16 px-4 relative z-10 ${theme.headerGradient} bg-opacity-30`}>
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
          <Heart className={`w-12 h-12 text-white animate-pulse drop-shadow-lg`} fill="currentColor" />
          <h1 className={`text-5xl md:text-7xl font-bold text-white drop-shadow-2xl`}>Feliz Dia dos Namorados</h1>
          <Heart className={`w-12 h-12 text-white animate-pulse drop-shadow-lg`} fill="currentColor" />
        </div>
        <p className="text-xl md:text-2xl text-white font-light animate-slide-up drop-shadow-md">
          Uma história escrita com carinho e dedicação
        </p>
      </header>

      {/* Carrossel de Fotos */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme.primary} animate-fade-in`}>
            Nossos Momentos Especiais
          </h2>

          <div className="relative">
            <div
              ref={photoCarouselRef}
              className="flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPhoto}
                className={`absolute left-2 md:left-4 z-20 ${theme.headerGradient} hover:opacity-90 shadow-2xl rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 text-white`}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div
                className="w-full max-w-4xl mx-8 md:mx-16 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(${dragOffset}px)` }}
              >
                <Card
                  className={`overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 border ${theme.border}`}
                  onClick={() => setSelectedPhoto(photos[currentPhotoIndex])}
                >
                  <CardContent className="p-0 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <img
                      src={photos[currentPhotoIndex].src || "/placeholder.svg"}
                      alt={photos[currentPhotoIndex].alt}
                      className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable={false}
                    />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{photos[currentPhotoIndex].title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm opacity-90">{photos[currentPhotoIndex].date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm opacity-90">{photos[currentPhotoIndex].location}</span>
                      </div>
                      <p className="text-sm opacity-90 line-clamp-2 hidden md:block mt-2">
                        {photos[currentPhotoIndex].description}
                      </p>
                      <Badge className="mt-3 bg-white/30 hover:bg-white/40 text-white">Clique para ver mais</Badge>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center mt-4">
                  <h3 className={`text-lg md:text-xl font-semibold ${theme.primary}`}>
                    {photos[currentPhotoIndex].title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <MapPin className={`w-3 h-3 ${theme.secondary}`} />
                    <span className="text-xs text-gray-600">{photos[currentPhotoIndex].location}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextPhoto}
                className={`absolute right-2 md:right-4 z-20 ${theme.headerGradient} hover:opacity-90 shadow-2xl rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 text-white`}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center mt-6 gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPhotoIndex
                      ? `${theme.primary.replace("text-", "bg-")} scale-125 shadow-lg`
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Vídeos */}
      <section className={`py-16 px-4 bg-gradient-to-r ${theme.cardGradient} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${theme.primary} animate-fade-in`}>
            Nossos Vídeos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <Card
                key={video.id}
                className={`overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 group animate-bounce-in border ${theme.border}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 ${theme.headerGradient} bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-colors duration-300`}
                  >
                    <Play
                      className="w-12 h-12 text-white group-hover:scale-125 transition-transform duration-300"
                      fill="currentColor"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                    <p className="text-white/80 text-sm">{video.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contador de Tempo */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 ${theme.primary} animate-fade-in`}>Tempo Juntos</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { value: timeElapsed.years, label: "Anos", color: theme.primary },
              { value: timeElapsed.months, label: "Meses", color: theme.secondary },
              { value: timeElapsed.days, label: "Dias", color: theme.primary },
              { value: timeElapsed.hours, label: "Horas", color: theme.secondary },
              { value: timeElapsed.minutes, label: "Minutos", color: theme.primary },
              { value: timeElapsed.seconds, label: "Segundos", color: theme.secondary },
            ].map((item, index) => (
              <Card
                key={item.label}
                className={`bg-gradient-to-br ${theme.cardGradient} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-bounce-in border ${theme.border}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 md:p-6">
                  <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${item.color} animate-pulse`}>
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Texto Editável */}
      <section className={`py-16 px-4 bg-gradient-to-r ${theme.cardGradient} relative z-10`}>
        <div className="max-w-4xl mx-auto text-center">
          <Card
            className={`bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border ${theme.border}`}
          >
            <CardContent className="p-8 md:p-12">
              <Calendar className={`w-12 h-12 md:w-16 md:h-16 ${theme.primary} mx-auto mb-6 md:mb-8 animate-pulse`} />
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 ${theme.primary}`}>
                Nossa História Continua...
              </h3>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                [Nos conhecemos por acaso, mas nada entre nós foi por acaso. Cada riso, cada conversa, cada silêncio compartilhado construiu algo real. Te amar virou meu hábito favorito. E enquanto o mundo muda lá fora, meu plano é simples: estar ao seu lado em cada capítulo que ainda vamos escrever..]
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Modal para fotos melhorado */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-auto bg-white border-none">
          <DialogHeader>
            <DialogTitle className={`text-2xl md:text-3xl font-bold text-center ${theme.primary} mb-2`}>
              {selectedPhoto?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedPhoto && (
            <Tabs defaultValue="photo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="photo" className="text-base">
                  Foto
                </TabsTrigger>
                <TabsTrigger value="details" className="text-base">
                  Detalhes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photo" className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedPhoto.src || "/placeholder.svg"}
                    alt={selectedPhoto.alt}
                    className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain rounded-lg shadow-xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{selectedPhoto.location}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedPhoto.src || "/placeholder.svg"}
                      alt={selectedPhoto.alt}
                      className="w-full h-auto max-h-[300px] object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className={`inline-flex items-center gap-2 ${theme.badge} px-3 py-1 rounded-full text-sm`}>
                      <Clock className="w-4 h-4" />
                      <span>{selectedPhoto.date}</span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 ${theme.badge} px-3 py-1 rounded-full text-sm ml-2`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.location}</span>
                    </div>

                    <h3 className={`text-xl font-semibold ${theme.primary} mt-4`}>Sobre este momento</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedPhoto.longDescription}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className={`py-8 text-center text-white relative z-10 ${theme.headerGradient}`}>
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Heart className="w-4 h-4 text-white animate-pulse" fill="currentColor" />
          <span className="text-base md:text-lg">Feito com amor</span>
          <Heart className="w-4 h-4 text-white animate-pulse" fill="currentColor" />
        </div>
      </footer>
    </div>
  )
}
