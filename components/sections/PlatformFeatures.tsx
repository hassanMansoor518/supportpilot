"use client"

import React, { useState } from "react"
import { CheckCircle2, ChevronRight, X, Lock, MessageCircle } from "lucide-react"
import { motion, type Variants, AnimatePresence } from "framer-motion"

export function PlatformFeatures() {
  const [isChatOpen, setIsChatOpen] = useState(true)

  const points = [
    "Custom chatbot appearance",
    "Multi-language support",
    "Advanced analytics",
    "Seamless integrations",
    "Enterprise-grade security",
  ]

  const faqs = [
    "How does the free trial work?",
    "Can I change my plan later?",
    "Is my data secure?",
    "Do you offer refunds?",
  ]

  const integrations = [
    {
      name: "Slack",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#36C5F0" />
          <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D" />
          <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E" />
        </svg>
      ),
      bg: "bg-[#252026]",
    },
    {
      name: "Zapier",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#FF4A00" />
          <path d="M13.25 10.63L16.5 6.5h-5.5L8.25 12h3.5l-2.25 5.5 6.5-5.5h-2.75l.5-1.37z" fill="white" />
        </svg>
      ),
      bg: "bg-[#2A1D1A]",
    },
    {
      name: "WordPress",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#21759B" />
          <path d="M12 21.6A9.6 9.6 0 1 1 21.6 12 9.611 9.611 0 0 1 12 21.6zM2.81 12c0 2.29.84 4.39 2.22 6L8.4 8.09c-.27-.03-.54-.05-.72-.05-.59 0-1.1.06-1.1.06v-.7h3.7v.7s-.4.02-.69.04l2.87 8.35L14.28 8h-1.07v-.7h3.76v.7s-.48-.05-.72-.05c-.24 0-.48.02-.75.05L12 18.23l-1.92-5.83 1.25-3.69c.27-.03.55-.05.81-.05.24 0 .47.02.47.02v-.7H8.84v.7s.48-.02 1.07-.02c.24 0 .48.02.72.05l-2.02 5.9L5.3 8.09c.27-.03.54-.05.78-.05.21 0 .42.02.42.02v-.7H2.81v.7s.4.02.7.04L6.99 18C5.07 16.59 3.86 14.43 3.86 12a8.14 8.14 0 0 1 .53-2.88l-1.58 4.67A9.554 9.554 0 0 0 2.81 12zm16.59-1.89c0 1.25-.56 2.37-1.2 3.44l-2.9-8.4c.59 0 1.1-.06 1.1-.06v-.7h-3.41v.7s.4.02.69.04L15.35 18c1.37-2.13 2.1-4.04 2.1-5.73 0-1.04-.24-1.94-.6-2.69-.13-.27-.24-.51-.35-.72h.43c.96 0 2.47.37 2.47 1.25z" fill="white" />
        </svg>
      ),
      bg: "bg-[#182329]",
    },
    {
      name: "Shopify",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#95BF47" />
          <path d="M14.5 9A2.5 2.5 0 0 0 12 6.5 2.5 2.5 0 0 0 9.5 9H8l-1 9h10l-1-9h-1.5zm-5 0A2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 14.5 9h-5z" fill="white" />
        </svg>
      ),
      bg: "bg-[#1E271D]",
    },
    {
      name: "Webflow",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#146EF5" />
          <path d="M16.5 8.5L14 15h-1.5L11 10.5 9.5 15H8L5.5 8.5H7l1.5 5 1.5-4.5h1.5l1.5 4.5 1.5-5h2z" fill="white" />
        </svg>
      ),
      bg: "bg-[#161F32]",
    },
    {
      name: "More",
      icon: (
        <div className="w-5 h-5 rounded flex items-center justify-center bg-transparent gap-[3px]">
          <div className="w-1 h-1 bg-white/70 rounded-full" />
          <div className="w-1 h-1 bg-white/70 rounded-full" />
          <div className="w-1 h-1 bg-white/70 rounded-full" />
        </div>
      ),
      bg: "bg-[#202022]",
    },
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const leftItemVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  }

  const rightItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  }

  return (
    <section className="py-24 text-white overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Column */}
          <motion.div
            className="w-full lg:w-[32%] space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div>
              <motion.p variants={leftItemVariants} className="text-[#A259FF] font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A259FF] animate-pulse" />
                BUILT FOR MODERN BUSINESSES
              </motion.p>
              <motion.h2 variants={leftItemVariants} className="text-4xl md:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-white">
                A platform that grows with your business
              </motion.h2>
            </div>
            <motion.div variants={containerVariants} className="space-y-4 pt-2">
              {points.map((point, i) => (
                <motion.div
                  key={i}
                  variants={leftItemVariants}
                  className="flex items-center gap-4 text-white/80 font-medium text-[15px] group cursor-default"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-[#A259FF] bg-[#A259FF]/10 text-[#A259FF] group-hover:bg-[#A259FF] group-hover:text-white transition-all duration-300">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="group-hover:text-white transition-colors">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Center Column: Browser Mockup + Widget */}
          <div className="w-full lg:w-[48%] relative perspective-1000">
            {/* Browser Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative rounded-[12px] overflow-hidden border border-white/[0.1] bg-[#0A0A0A] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] w-full max-w-2xl mx-auto z-10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Browser Header Top (Tabs) */}
              <div className="bg-[#1e1e1e] border-b border-black flex items-end px-3 pt-3 gap-3 relative z-20">
                {/* Traffic Lights */}
                <div className="flex gap-2 pb-3 px-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:scale-110 transition-transform cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:scale-110 transition-transform cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:scale-110 transition-transform cursor-pointer" />
                </div>
                {/* Active Tab */}
                <div className="bg-[#2d2d2d] rounded-t-lg px-4 py-2 flex items-center gap-2 border-t border-x border-white/5 min-w-[180px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                  <div className="w-4 h-4 rounded bg-[#A259FF] flex items-center justify-center shrink-0">
                    <Lock className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-white/90 font-medium">Support FAQ</span>
                  <X className="w-3 h-3 text-white/40 ml-auto hover:text-white cursor-pointer" />
                </div>
                {/* Inactive Tab */}
                <div className="px-4 py-2 flex items-center gap-2 border-t border-x border-transparent min-w-[140px] opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                  <span className="text-xs text-white/70 font-medium">Pricing</span>
                </div>
                <div className="pb-2">
                  <div className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </div>
                </div>
              </div>

              {/* Browser Address Bar Area */}
              <div className="bg-[#2d2d2d] border-b border-white/5 p-2 flex items-center gap-3 relative z-20">
                <div className="flex gap-1">
                  <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                    <ChevronRight className="w-4 h-4 text-white/50 rotate-180" />
                  </div>
                  <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                  <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  </div>
                </div>
                
                {/* Address Input */}
                <div className="flex-1 h-8 bg-[#1a1a1a] rounded-md flex items-center px-3 text-[13px] text-white/60 font-medium border border-white/5 shadow-inner">
                  <Lock className="w-3.5 h-3.5 mr-2 text-white/40" />
                  yourwebsite.com/faq
                </div>
                
                {/* Extension Icons */}
                <div className="flex gap-1 px-1">
                  <div className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  </div>
                  <div className="w-7 h-7 rounded bg-[#A259FF]/20 flex items-center justify-center cursor-pointer text-[#A259FF] font-bold text-[10px]">
                    S
                  </div>
                </div>
              </div>

              {/* Browser Content */}
              <div className="p-8 lg:p-12 min-h-[400px] bg-gradient-to-br from-[#262626] to-[#0A0A0A] relative overflow-hidden">
                {/* Subtle top light effect */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-white/[0.03] blur-3xl pointer-events-none" />

                <h3 className="text-[22px] font-medium text-white mb-8 relative z-10">Frequently Asked Questions</h3>
                <div className="space-y-3 relative z-10 max-w-md">
                  {faqs.map((q, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                      className="flex justify-between items-center p-4 rounded-xl bg-white/[0.04] border border-white/[0.05] text-[13px] font-medium text-white/90 transition-colors cursor-pointer group/faq"
                    >
                      {q}
                      <ChevronRight className="w-4 h-4 text-white/30 group-hover/faq:text-white/70 group-hover/faq:translate-x-1 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Chat Widget & Toggle Area */}
            <div className="absolute right-0 lg:-right-2 bottom-6 z-30">
              <AnimatePresence mode="wait">
                {isChatOpen ? (
                  <motion.div
                    key="widget"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative w-[300px]"
                  >
                    {/* Widget Window */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-2xl overflow-hidden bg-white shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-black/5"
                    >
                      {/* Widget Header */}
                      <div className="bg-gradient-to-br from-[#7C3AED] to-[#A259FF] p-4 relative overflow-hidden group/header">
                        {/* Decorative blur inside header */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full translate-x-10 -translate-y-10 group-hover/header:scale-150 transition-transform duration-700" />

                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm relative">
                            <div className="absolute -inset-1 bg-white/30 rounded-full animate-ping opacity-75" />
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#7C3AED]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[15px] font-semibold text-white leading-tight">How can we help?</h4>
                          </div>
                          <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors cursor-pointer" onClick={() => setIsChatOpen(false)}>
                            <X className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Widget Body */}
                      <div className="p-4 space-y-4 bg-white relative">
                        {/* Purple glow bleeding from header */}
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#A259FF]/10 to-transparent pointer-events-none" />

                        <div className="bg-[#F8F9FA] border border-gray-100 p-4 rounded-xl text-[13px] text-gray-700 font-medium leading-relaxed shadow-sm relative z-10">
                          We're online and ready to help with any questions you have.
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full bg-[#5C3CFF] hover:bg-[#4E31E0] transition-colors text-white text-[14px] font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(92,60,255,0.39)] overflow-hidden group/btn"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                          Ask a question
                        </motion.button>

                        <div className="relative mt-2">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <div className="w-4 h-4 rounded-full border-2 border-[#7C3AED]/40 animate-pulse" />
                          </div>
                          <input
                            type="text"
                            placeholder="Chat with AI"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-[13px] rounded-xl block pl-10 p-3 focus:outline-none focus:ring-1 focus:ring-[#7C3AED] transition-shadow placeholder:text-gray-400"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Widget Footer */}
                      <div className="bg-white px-4 pb-4 pt-1 flex items-center justify-center gap-1.5 text-gray-400 text-[11px] font-medium border-t border-gray-50">
                        <Lock className="w-3 h-3" />
                        By ChatEmbed
                      </div>
                    </motion.div>

                    {/* Floating Close Button */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsChatOpen(false)}
                      className="absolute -right-2 -bottom-16 w-12 h-12 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(124,58,237,0.4)] cursor-pointer"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsChatOpen(true)}
                    className="w-14 h-14 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(124,58,237,0.5)] cursor-pointer absolute bottom-0 right-0"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column */}
          <motion.div
            className="w-full lg:w-[15%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.p variants={rightItemVariants} className="text-[#A259FF] font-bold text-xs tracking-widest uppercase mb-6 pl-1 flex items-center gap-2">
              50+ INTEGRATIONS
            </motion.p>
            <div className="space-y-3">
              {integrations.map((brand, i) => (
                <motion.div
                  key={i}
                  variants={rightItemVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${brand.bg} border border-white/5 shadow-sm group-hover:scale-110 group-hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {brand.icon}
                  </div>
                  <span className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background radial gradients for depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#A259FF]/10 blur-[120px] pointer-events-none rounded-full animate-pulse duration-1000" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] pointer-events-none rounded-full" />
    </section>
  )
}
