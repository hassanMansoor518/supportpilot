import React from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Jacob Jones",
      role: "Founder, Acme Corp",
      content: "\"ChatEmbed has completely transformed how we handle customer support. Our response time is faster and customers are happier.\"",
      avatar: "https://i.pravatar.cc/150?u=jacob"
    },
    {
      name: "Sarah Miller",
      role: "CEO, Snapy",
      content: "\"Super easy to set up and the AI actually understands our business. Highly recommended!\"",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      name: "Alex Brown",
      role: "Marketing Head, Penta",
      content: "\"The analytics and insights help us improve our support every day. Great product!\"",
      avatar: "https://i.pravatar.cc/150?u=alex"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16">Loved by businesses of all sizes</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="bg-background/50 border-border/50">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{t.content}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
