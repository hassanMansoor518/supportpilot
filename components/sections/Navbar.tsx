import React from "react"
import { Button } from "@/components/ui/button"
import { BotMessageSquare, ChevronDown } from "lucide-react"
import { div } from "framer-motion/client"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[1450px] h-18 flex items-center justify-between">
        <div className="flex items-center pl-10 gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <BotMessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ChatEmbed</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[0.9rem] font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground flex items-center gap-1">Product <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground">Features</a>
          <a href="#" className="hover:text-foreground">Pricing</a>
          <a href="#" className="hover:text-foreground">Docs</a>
          <a href="#" className="hover:text-foreground flex items-center gap-1">Resources <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="hover:text-foreground">Changelog</a>
        </div>

        <div className="flex items-center pr-25 gap-4">
          <a href="#" className="text-sm font-medium hover:text-primary hidden md:block">Log in</a>
          <Button className="rounded-full bg-primary hover:bg-primary/90">Start Free &rarr;</Button>
        </div>
      </div>
    </nav>

  )
}
