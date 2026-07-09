import React from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { BotMessageSquare } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl bg-primary overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600" />

          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

          <div className="relative p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
            <div className="max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                <BotMessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Ready to transform your customer support?</h2>
              <p className="text-white/80 text-lg">Join thousands of businesses using ChatEmbed to deliver amazing support experiences.</p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-4">
              <div className="flex gap-2 w-full max-w-sm">
                <input type="email" placeholder="Enter your email address" className="flex-1 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg whitespace-nowrap">Start Free Now &rarr;</Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/70 justify-center md:justify-start">
                <span>No credit card required</span>
                <span>&middot;</span>
                <span>2 Min Setup</span>
                <span>&middot;</span>
                <span>7 Days Free Trial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
