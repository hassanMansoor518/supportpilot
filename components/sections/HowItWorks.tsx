import React from "react"
import { Card } from "@/components/ui/card"

export function HowItWorks() {
  return (
    <section className="py-24 border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 flex justify-between items-end">
              <h2 className="text-sm font-semibold tracking-wider text-primary uppercase">EMBED IN SECONDS</h2>
              <div className="flex gap-2 text-xs font-medium text-muted-foreground">
                <span className="px-3 py-1 rounded bg-secondary text-foreground">HTML</span>
                <span className="px-3 py-1 rounded hover:bg-secondary">React</span>
                <span className="px-3 py-1 rounded hover:bg-secondary">Vue</span>
                <span className="px-3 py-1 rounded hover:bg-secondary">Next.js</span>
              </div>
            </div>
            <Card className="bg-[#050505] border-white/10 p-0 font-mono text-sm overflow-hidden shadow-2xl ring-1 ring-white/5">
              <div className="flex justify-between items-center px-4 py-3 bg-white/[0.02] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground/60">index.html</span>
                <button className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors bg-white/5 px-2 py-1 rounded">Copy</button>
              </div>
              <pre className="p-6 overflow-x-auto text-blue-400/90 leading-relaxed text-[13px]">
                <code className="text-purple-400/90">{"<script src="}</code>
                <code className="text-green-400/90">{'"https://cdn.chatembed.com/widget.js"'}</code>
                <code className="text-purple-400/90">{"></script>"}</code>
                <br/>
                <code className="text-purple-400/90">{"<script>"}</code>
                <br/>
                <code className="text-blue-400/90">{"  window"}</code>
                <code className="text-white/90">.ChatEmbed.</code>
                <code className="text-blue-400/90">init</code>
                <code className="text-white/90">{"({"}</code>
                <br/>
                <code className="text-white/90">{"    chatbotId: "}</code>
                <code className="text-green-400/90">{'"cme_1234567890"'}</code>
                <br/>
                <code className="text-white/90">{"  });"}</code>
                <br/>
                <code className="text-purple-400/90">{"</script>"}</code>
              </pre>
            </Card>
          </div>

          <div className="flex flex-col justify-center">
             <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">How it works</h2>
             <div className="grid grid-cols-3 gap-8 relative">
                {/* Horizontal connection line */}
                <div className="absolute top-6 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10" />
                
                <div className="flex flex-col items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] ring-4 ring-background">1</div>
                  <div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">Create Your Chatbot</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">Sign up and create your chatbot in just a few clicks.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] ring-4 ring-background">2</div>
                  <div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">Train with Your Data</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">Upload documents, add FAQs, or crawl your website.</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] ring-4 ring-background">3</div>
                  <div>
                    <h3 className="text-base font-bold mb-2 tracking-tight">Embed & Go Live</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">Add the code to your website and start chatting!</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
