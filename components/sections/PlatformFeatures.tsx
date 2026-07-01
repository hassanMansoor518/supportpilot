import React from "react"
import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export function PlatformFeatures() {
  const points = [
    "Custom chatbot appearance",
    "Multi-language support",
    "Advanced analytics",
    "Seamless integrations",
    "Enterprise-grade security",
  ]

  return (
    <section className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">BUILT FOR MODERN BUSINESSES</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">A platform that grows with your business</h2>
            <div className="space-y-4">
              {points.map((point, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground font-medium">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> {point}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
             <Card className="bg-background/80 backdrop-blur border-border/50 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-secondary rounded text-center text-xs py-1 text-muted-foreground mx-4">yourwebsite.com</div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
                  {["How does the free trial work?", "Can I change my plan later?", "Is my data secure?", "Do you offer refunds?"].map((q, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50 text-sm font-medium">
                      {q} <span className="text-muted-foreground">+</span>
                    </div>
                  ))}
                </div>
             </Card>
          </div>

          <div>
             <h3 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-6">50+ INTEGRATIONS</h3>
             <div className="grid grid-cols-2 gap-4">
                {["Slack", "Zapier", "WordPress", "Shopify", "Webflow", "More"].map((brand, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50 font-medium">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold text-primary">{brand[0]}</div>
                    {brand}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
