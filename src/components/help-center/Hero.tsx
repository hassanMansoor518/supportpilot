// components/help-center/Hero.tsx

import { Search, Sparkles } from "lucide-react";
import BotIllustration from "./BotIllustration";

const popularSearches = [
  "Getting Started",
  "API",
  "Authentication",
  "Billing",
  "Integrations",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-indigo-50 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-44 left-16 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgb(99 102 241 / 1) 1px, transparent 1px),
              linear-gradient(90deg, rgb(99 102 241 / 1) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative grid min-h-[500px] items-center gap-10 lg:gap-14 px-4 sm:px-8 py-10 lg:py-14 lg:grid-cols-[1fr_360px] lg:px-16">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Help Center
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-900 lg:text-6xl">
            Find answers
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              instantly.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Browse documentation, API references, tutorials, troubleshooting
            guides, and best practices to build faster with SupportPilot.
          </p>

          {/* Search */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-xl shadow-slate-200/60 backdrop-blur-xl transition-all duration-300 focus-within:border-indigo-400 focus-within:shadow-indigo-200">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center px-4">
                <Search className="mr-3 h-5 w-5 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search documentation, API, billing..."
                  className="h-14 w-full bg-transparent text-base text-slate-700 placeholder:text-slate-400 outline-none"
                />
              </div>

              <button className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-300">
                Search
              </button>
            </div>
          </div>

        
        </div>

        {/* Right */}
        <div className="relative flex items-center justify-center">
          {/* Glow */}
          <div className="absolute h-80 w-80 rounded-full bg-indigo-500/10 blur-[90px]" />

          {/* Glass Card */}
          <div className="relative rounded-[30px] border border-white/60 bg-white/70 p-8 shadow-[0_25px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <BotIllustration />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 left-2 sm:-left-8 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-xl backdrop-blur z-20">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Articles
            </p>

            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              1,200+
            </h3>

            <p className="text-sm text-slate-500">
              Developer resources
            </p>
          </div>

        
        </div>
      </div>
    </section>
  );
}