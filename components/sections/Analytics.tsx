import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Users, Send, Smile } from "lucide-react"

export function Analytics() {
  const stats = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "Total Conversations", value: "2,542", trend: "+18.5%", color: "text-green-500" },
    { icon: <Users className="w-5 h-5 text-green-500" />, title: "Total Leads", value: "476", trend: "+12.4%", color: "text-green-500" },
    { icon: <Send className="w-5 h-5 text-orange-500" />, title: "Messages Sent", value: "12,875", trend: "+22.3%", color: "text-green-500" },
    { icon: <Smile className="w-5 h-5 text-purple-500" />, title: "Satisfaction Rate", value: "98.6%", trend: "+24.5%", color: "text-green-500" },
  ]

  return (
    <section className="py-24 bg-background border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Powerful analytics to improve every day</h2>
            <p className="text-muted-foreground">Track conversations, measure performance, and continuously improve customer experience.</p>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-background border-border/50 overflow-hidden relative">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-sm font-medium text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                      {stat.icon}
                    </div>
                    {stat.title}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className={`text-sm ${stat.color} flex items-center gap-1 font-medium`}>
                    ↑ {stat.trend} <span className="text-muted-foreground font-normal">from last 7 days</span>
                  </div>

                  {/* Fake chart line */}
                  <svg className="absolute bottom-0 left-0 w-full h-12 text-primary/20 opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,100 C20,80 40,60 60,80 C80,100 90,60 100,40 L100,100 Z" fill="currentColor" />
                    <path d="M0,100 C20,80 40,60 60,80 C80,100 90,60 100,40" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  </svg>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
