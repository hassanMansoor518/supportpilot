"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started.",
      price: "$0",
      features: ["1 Chatbot", "100 Conversations / mo", "Basic AI Model", "Standard Support"],
    },
    {
      name: "Starter",
      description: "For small businesses.",
      price: "$29",
      features: ["5 Chatbots", "1,000 Conversations / mo", "Advanced AI Model", "Email Support"],
    },
    {
      name: "Pro",
      description: "For growing businesses.",
      price: "$79",
      popular: true,
      features: ["25 Chatbots", "10,000 Conversations / mo", "Advanced AI Model", "Priority Support", "Remove Branding"],
    },
    {
      name: "Business",
      description: "For large teams.",
      price: "$199",
      features: ["Unlimited Chatbots", "Unlimited Conversations", "Advanced AI Model", "Priority Support", "Custom Integrations"],
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground mb-8">Choose the plan that&apos;s right for your business.</p>
          
          <div className="inline-flex items-center p-1 bg-secondary rounded-full border border-border/50">
             <button className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors", !isYearly ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")} onClick={() => setIsYearly(false)}>Monthly</button>
             <button className={cn("px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2", isYearly ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground")} onClick={() => setIsYearly(true)}>Yearly <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Save 20%</span></button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <Card key={i} className={cn("relative bg-background/50 flex flex-col", plan.popular ? "border-primary shadow-[0_0_30px_-10px_rgba(109,40,217,0.3)]" : "border-border/50")}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="flex-1">
                <div className="font-semibold text-xl mb-2">{plan.name}</div>
                <div className="text-sm text-muted-foreground mb-6 h-10">{plan.description}</div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> /mo</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "secondary"}>Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
