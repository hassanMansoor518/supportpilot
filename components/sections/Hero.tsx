"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Clock, Code, Play, BotMessageSquare, CheckCircle2, ChevronDown, MessageSquare, Users, BarChart3, Star, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-38 md:pb-32 ">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 -right-64 w-[800px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-xs font-medium mb-6 text-foreground border border-border/50"
          >
            <span className="text-yellow-500">✨</span>
            The AI Customer Support Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.2]"
          >
            AI Customer Support<br />
            for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400 inline-block pb-2">Every Website</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
          >
            Train your AI chatbot with your data and embed it anywhere. Answer questions, capture leads, and deliver 24/7 support that your customers will love.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-10 text-sm font-medium text-muted-foreground"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/30 border border-white/5 backdrop-blur-sm"><Clock className="w-4 h-4 text-primary" /> 2 Min Setup</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/30 border border-white/5 backdrop-blur-sm"><Code className="w-4 h-4 text-primary" /> No Coding</span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/30 border border-white/5 backdrop-blur-sm"><CheckCircle2 className="w-4 h-4 text-primary" /> 7 Days Free Trial</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <Button size="lg" className=" px-6 md:px-8 bg-primary hover:bg-primary/90 text-white h-12 md:h-14 text-sm md:text-base">
              Start Free Now &rarr;
            </Button>
            <Button size="lg" variant="outline" className=" px-6 md:px-8 h-12 md:h-14 text-sm md:text-base border-border/50 hover:bg-secondary">
              <Play className="w-4 h-4 mr-2" /> Book a Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> No credit card required</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Cancel anytime</span>
          </motion.div>
        </div>

        {/* Mockup Right Side */}

      </div>
    </section>
  )
}
