import React from "react"
import { Hexagon, Triangle, Circle, Square, Star, Box, Shield } from "lucide-react"

export function TrustedBy() {
  const logos = [
    { icon: <Hexagon className="w-6 h-6" />, name: "Acme Corp" },
    { icon: <Triangle className="w-6 h-6" />, name: "Penta" },
    { icon: <Circle className="w-6 h-6" />, name: "Quotient" },
    { icon: <Square className="w-6 h-6" />, name: "zenith" },
    { icon: <Star className="w-6 h-6" />, name: "Snapy" },
    { icon: <Box className="w-6 h-6" />, name: "Proline" },
    { icon: <Shield className="w-6 h-6" />, name: "Martino" },
  ]

  return (
    <section className="py-8 border-y border-border/50 bg-background/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-8">
          Trusted by 2,000+ businesses worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 font-bold text-xl text-foreground">
              {logo.icon} {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
