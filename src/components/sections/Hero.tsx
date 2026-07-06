"use client"

import React from "react"
import { Button } from "@/src/components/ui/button"
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative h-[480px] sm:h-[520px] lg:h-[550px] w-full mt-16 lg:mt-0 perspective-1000 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_60px_-15px_rgba(124,58,237,0.3)] overflow-hidden flex flex-col ring-1 ring-white/5 w-full">
            {/* Top Bar */}
            <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500" />
              </div>
              <div className="flex gap-2">
                <div className="flex bg-white/5 rounded-md px-3 py-1.5 items-center gap-2 text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-foreground/80">
                  <span>Overview</span> <ChevronDown className="w-3 h-3" />
                </div>
                <div className="flex bg-white/5 rounded-md px-3 py-1.5 items-center gap-2 text-xs font-medium border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-foreground/80">
                  <span>May 15 - May 16</span> <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 p-5 gap-5 overflow-hidden">
              {/* Sidebar Mini */}
              <div className="w-12 flex flex-col items-center py-2 gap-4 border-r border-white/10 pr-5">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(124,58,237,0.2)]"><BotMessageSquare className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-xl text-muted-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-xl text-muted-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"><Users className="w-5 h-5" /></div>
                <div className="w-10 h-10 rounded-xl text-muted-foreground hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer"><BarChart3 className="w-5 h-5" /></div>
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Conversations", value: "2,542", inc: "+18.6%", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                    { label: "Leads", value: "476", inc: "+12.4%", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                    { label: "Messages Sent", value: "12,875", inc: "+22.3%", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                    { label: "Satisfaction", value: "98.6%", inc: "+24.5%", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" }
                  ].map((stat, i) => (
                    <div key={i} className={`bg-white/5 border ${stat.border} rounded-2xl p-4 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden group hover:bg-white/10 transition-colors`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-muted-foreground font-semibold uppercase tracking-widest relative z-10">
                        <div className={`w-2 h-2 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm shrink-0`}><div className="w-1 h-1 rounded-full bg-current" /></div>
                        <span className="truncate">{stat.label}</span>
                      </div>
                      <div className="mt-3 text-xl md:text-2xl font-bold tracking-tight text-foreground relative z-10">{stat.value}</div>
                      <div className="mt-2 text-[10px] md:text-[11px] text-green-400 flex items-center gap-1 font-medium relative z-10">{stat.inc} <span className="text-muted-foreground/60 font-normal hidden xl:inline">from last 7 days</span></div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 h-48 flex flex-col backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="text-sm font-semibold tracking-wide">Conversations</div>
                    <div className="text-xs text-muted-foreground bg-white/5 border border-white/10 rounded-md px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-colors">Last 7 days <ChevronDown className="w-3 h-3" /></div>
                  </div>
                  {/* Fake Chart Lines */}
                  <div className="flex-1 relative z-10">
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(4)].map((_, i) => <div key={i} className="w-full h-px bg-white/5" />)}
                    </div>
                    {/* Fake SVG Curve */}
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 Q10,60 20,70 T40,40 T60,50 T80,20 T100,10 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.4" />
                      <path d="M0,80 Q10,60 20,70 T40,40 T60,50 T80,20 T100,10" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0px 4px 6px rgba(124,58,237,0.5))' }} />
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-2 gap-4 h-36">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col backdrop-blur-sm">
                    <div className="text-xs font-semibold mb-4 tracking-wide text-muted-foreground uppercase">Top Chatbots</div>
                    <div className="space-y-3 flex-1">
                      {["Website Helper", "Support Center", "Sales Assistant"].map((name, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]" /> <span className="font-medium">{name}</span></div>
                          <div className="text-muted-foreground/80 font-mono text-xs">{[847, 512, 324][i]} <span className="text-muted-foreground/40">({[28.4, 18.2, 11.5][i]}%)</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col backdrop-blur-sm">
                    <div className="text-xs font-semibold mb-4 tracking-wide text-muted-foreground uppercase">Recent Conversations</div>
                    <div className="space-y-3 flex-1">
                      {["jane.doe@example.com", "smith.maker@example.com", "alex@acmecorp.com"].map((email, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">{email[0].toUpperCase()}</div> <span className="truncate w-32 font-medium">{email}</span></div>
                          <div className="text-muted-foreground/60 text-xs">{"2m, 15m, 1h".split(', ')[i]} ago</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Chat Widget */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -right-8 -bottom-8 w-[340px] bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden z-20 flex flex-col"
          >
            <div className="bg-gradient-to-r from-primary to-purple-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Assistant</div>
                  <div className="text-[10px] text-white/80 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online</div>
                </div>
              </div>
              <div className="flex gap-2 opacity-70">
                <div className="w-2 h-2 rounded-full bg-white/50" />
                <div className="w-2 h-2 rounded-full bg-white/50" />
              </div>
            </div>
            <div className="p-5 space-y-4 h-64 bg-background/50 overflow-hidden">
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm inline-block max-w-[85%] text-foreground/90">
                Hello! How can I help you today? 👋
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-md inline-block max-w-[85%]">
                  How does your pricing work?
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-sm text-sm shadow-sm inline-block max-w-[85%] text-foreground/90 leading-relaxed">
                We have flexible plans for businesses of all sizes. You can check our Pricing page for details!
              </div>
            </div>
            <div className="p-4 border-t border-white/10 bg-background/80 backdrop-blur-md flex gap-3 items-center">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-muted-foreground/70">Type your message...</div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform cursor-pointer"><Play className="w-4 h-4 ml-0.5" /></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
