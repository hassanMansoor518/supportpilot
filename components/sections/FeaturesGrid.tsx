import React from "react"
import { FileText, Code2, MessageSquare, UserPlus, BarChart3, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function FeaturesGrid() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-500/10",
      title: "Train with Your Data",
      description: "Upload documents, add FAQs, or crawl your website to train your chatbot.",
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      bg: "bg-blue-500/10",
      title: "Embed Anywhere",
      description: "Add your chatbot to any website with a single line of code.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-green-400" />,
      bg: "bg-green-500/10",
      title: "Smart AI Answers",
      description: "AI understands context and provides accurate, human-like responses.",
    },
    {
      icon: <UserPlus className="w-6 h-6 text-orange-400" />,
      bg: "bg-orange-500/10",
      title: "Lead Capture",
      description: "Capture leads, emails, and important info automatically inside conversations.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      bg: "bg-purple-500/10",
      title: "Analytics & Insights",
      description: "Track performance, user behavior, and get powerful insights.",
    },

  ]

  return (
    <section className="py-15">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
          <p className="text-primary font-bold text-[0.85rem] tracking-[0.2em] uppercase mb-4">POWERFUL FEATURES</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">Everything you need to deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">amazing support</span></h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto relative z-10">All the tools you need to build, train, and deploy an AI chatbot that perfectly understands your business context.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {features.map((feature, i) => (
            <Card key={i} className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 backdrop-blur-sm group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 shadow-sm ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold tracking-tight">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                  {feature.description}
                </CardDescription>
                <a href="#" className="text-sm text-primary font-semibold hover:text-purple-400 flex items-center gap-2 group/link">
                  Learn more <span className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
