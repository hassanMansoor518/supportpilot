"use client"

import React, { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Check, Copy, Terminal } from "lucide-react"

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"HTML" | "React" | "Vue">("HTML")
  const [copied, setCopied] = useState(false)

  const codeSnippets = {
    HTML: {
      filename: "index.html",
      raw: `<script src="https://cdn.supportpilot.com/widget.js"></script>\n<script>\n  window.SupportPilot.init({\n    chatbotId: "sp_1234567890"\n  });\n</script>`,
      jsx: (
        <>
          <code className="text-pink-400">{"<script src="}</code>
          <code className="text-green-300">{'"https://cdn.supportpilot.com/widget.js"'}</code>
          <code className="text-pink-400">{"></script>"}</code>
          <br />
          <code className="text-pink-400">{"<script>"}</code>
          <br />
          <code className="text-[#60A5FA]">{"  window"}</code>
          <code className="text-white/90">.SupportPilot.</code>
          <code className="text-[#60A5FA]">init</code>
          <code className="text-yellow-300">{"({"}</code>
          <br />
          <code className="text-white/90">{"    chatbotId: "}</code>
          <code className="text-green-300">{'"sp_1234567890"'}</code>
          <br />
          <code className="text-yellow-300">{"  })"}</code>
          <code className="text-white/90">{";"}</code>
          <br />
          <code className="text-pink-400">{"</script>"}</code>
        </>
      )
    },
    React: {
      filename: "App.tsx",
      raw: `import { SupportPilotProvider } from '@supportpilot/react';\n\nexport default function App() {\n  return (\n    <SupportPilotProvider chatbotId="sp_1234567890">\n      <YourApp />\n    </SupportPilotProvider>\n  );\n}`,
      jsx: (
        <>
          <code className="text-pink-400">{"import "}</code>
          <code className="text-white/90">{"{ SupportPilotProvider } "}</code>
          <code className="text-pink-400">{"from "}</code>
          <code className="text-green-300">{"'@supportpilot/react'"}</code>
          <code className="text-white/90">{";"}</code>
          <br /><br />
          <code className="text-pink-400">{"export default function "}</code>
          <code className="text-[#60A5FA]">{"App"}</code>
          <code className="text-white/90">{"() {"}</code>
          <br />
          <code className="text-pink-400">{"  return "}</code>
          <code className="text-white/90">{"("}</code>
          <br />
          <code className="text-white/90">{"    <"}</code>
          <code className="text-[#60A5FA]">{"SupportPilotProvider"}</code>
          <code className="text-[#A259FF]">{" chatbotId="}</code>
          <code className="text-green-300">{'"sp_1234567890"'}</code>
          <code className="text-white/90">{">"}</code>
          <br />
          <code className="text-white/90">{"      <"}</code>
          <code className="text-[#60A5FA]">{"YourApp "}</code>
          <code className="text-white/90">{"/>"}</code>
          <br />
          <code className="text-white/90">{"    </"}</code>
          <code className="text-[#60A5FA]">{"SupportPilotProvider"}</code>
          <code className="text-white/90">{">"}</code>
          <br />
          <code className="text-white/90">{"  );"}</code>
          <br />
          <code className="text-white/90">{"}"}</code>
        </>
      )
    },
    Vue: {
      filename: "main.ts",
      raw: `import { createApp } from 'vue'\nimport SupportPilot from '@supportpilot/vue'\nimport App from './App.vue'\n\nconst app = createApp(App)\napp.use(SupportPilot, { chatbotId: "sp_1234567890" })\napp.mount('#app')`,
      jsx: (
        <>
          <code className="text-pink-400">{"import "}</code>
          <code className="text-white/90">{"{ createApp } "}</code>
          <code className="text-pink-400">{"from "}</code>
          <code className="text-green-300">{"'vue'"}</code>
          <br />
          <code className="text-pink-400">{"import "}</code>
          <code className="text-white/90">{"SupportPilot "}</code>
          <code className="text-pink-400">{"from "}</code>
          <code className="text-green-300">{"'@supportpilot/vue'"}</code>
          <br />
          <code className="text-pink-400">{"import "}</code>
          <code className="text-white/90">{"App "}</code>
          <code className="text-pink-400">{"from "}</code>
          <code className="text-green-300">{"'./App.vue'"}</code>
          <br /><br />
          <code className="text-pink-400">{"const "}</code>
          <code className="text-white/90">{"app = "}</code>
          <code className="text-[#60A5FA]">{"createApp"}</code>
          <code className="text-white/90">{"(App)"}</code>
          <br />
          <code className="text-white/90">{"app."}</code>
          <code className="text-[#60A5FA]">{"use"}</code>
          <code className="text-white/90">{"(SupportPilot, { "}</code>
          <code className="text-[#A259FF]">{"chatbotId"}</code>
          <code className="text-white/90">{": "}</code>
          <code className="text-green-300">{'"sp_1234567890"'}</code>
          <code className="text-white/90">{" })"}</code>
          <br />
          <code className="text-white/90">{"app."}</code>
          <code className="text-[#60A5FA]">{"mount"}</code>
          <code className="text-white/90">{"("}</code>
          <code className="text-green-300">{"'#app'"}</code>
          <code className="text-white/90">{")"}</code>
        </>
      )
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab].raw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    {
      num: "1",
      title: "Create Your Chatbot",
      desc: "Sign up and create your AI agent in just a few clicks. Customize its appearance to perfectly match your brand."
    },
    {
      num: "2",
      title: "Train with Your Data",
      desc: "Upload PDFs, enter specific FAQs, or simply provide your website URL for the AI to securely crawl and learn from."
    },
    {
      num: "3",
      title: "Embed & Go Live",
      desc: "Copy and paste the code snippet to your website. Your AI assistant is immediately ready to help your customers 24/7!"
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
  }

  return (
    <section className="py-24 relative overflow-hidden ">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Code Snippet UI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 60 }}
            className="order-2 lg:order-1 relative perspective-1000"
          >
            <div className="mb-6 flex justify-between items-end">
              <h2 className="text-sm font-semibold tracking-widest text-[#A259FF] uppercase flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Embed in Seconds
              </h2>
              <div className="flex gap-2 text-[11px] font-medium text-white/40 uppercase tracking-wider">
                {(["HTML", "React", "Vue"] as const).map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${activeTab === tab ? "bg-white/10 text-white" : "hover:bg-white/5"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-[16px] blur opacity-50 group-hover:opacity-100 transition duration-500" />

              <div className="relative bg-[#0F0F11] rounded-[14px] border border-white/10 font-mono text-sm overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex justify-between items-center px-4 py-3 bg-white/[0.03] border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <motion.span
                    key={activeTab}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-white/40"
                  >
                    {codeSnippets[activeTab].filename}
                  </motion.span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-md text-xs text-white/70 hover:text-white transition-all active:scale-95"
                  >
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                {/* Terminal Body */}
                <div className="p-6 overflow-x-auto min-h-[220px]">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.3 }}
                    className="text-[13px] leading-[1.7] tracking-wide"
                  >
                    {codeSnippets[activeTab].jsx}
                  </motion.pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Steps */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                How it works
              </h2>
              <p className="text-white/50 text-[16px] mb-12 max-w-md leading-relaxed">
                From setup to deployment, get your AI assistant running in less than 3 minutes. No technical skills required.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative space-y-10"
            >
              {/* Vertical connecting line */}
              <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-[#A259FF] via-[#A259FF]/20 to-transparent -z-10" />

              {steps.map((step, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-6 relative group">
                  <div className="relative mt-1">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center font-bold text-[#A259FF] shadow-lg group-hover:bg-[#A259FF] group-hover:text-white transition-colors duration-300 z-10 relative">
                      {step.num}
                    </div>
                    {/* Pulsing glow behind number */}
                    <div className="absolute inset-0 bg-[#A259FF]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#A259FF] transition-colors duration-300">{step.title}</h3>
                    <p className="text-[15px] text-white/50 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
