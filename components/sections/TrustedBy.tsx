"use client"
import React from "react"
import { motion } from "framer-motion"
import {
  Hexagon,
  Triangle,
  Circle,
  Square,
  Star,
  Box,
  Shield,
} from "lucide-react"

export function TrustedBy() {
  const logos = [
    { icon: <Hexagon className="w-6 h-6" />, name: "Acme Corp" },
    { icon: <Triangle className="w-6 h-6" />, name: "Penta" },
    { icon: <Circle className="w-6 h-6" />, name: "Quotient" },
    { icon: <Square className="w-6 h-6" />, name: "Zenith" },
    { icon: <Star className="w-6 h-6" />, name: "Snapy" },
    { icon: <Box className="w-6 h-6" />, name: "Proline" },
    { icon: <Shield className="w-6 h-6" />, name: "Martino" },
  ]

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-8">
          Trusted by 2,000+ businesses worldwide
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade Left */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />

        {/* Fade Right */}
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max gap-16"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap rounded-xl px-5 py-3 text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-105"
            >
              <div className="text-primary">{logo.icon}</div>

              <span className="text-lg font-semibold">
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}