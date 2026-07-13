// components/help-center/BotIllustration.tsx

import { Bot, Sparkles, MessageCircleMore } from "lucide-react";

export default function BotIllustration() {
    return (
        <div className="relative flex h-[300px] w-[300px] items-center justify-center">
            {/* Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-violet-100 blur-3xl" />

            {/* Floating Elements */}
            <div className="absolute left-3 top-12 rounded-xl bg-white p-3 shadow-xl">
                <Sparkles className="h-5 w-5 text-violet-600" />
            </div>

            <div className="absolute right-4 top-20 rounded-xl bg-white p-3 shadow-xl">
                <MessageCircleMore className="h-5 w-5 text-violet-600" />
            </div>

            <div className="absolute bottom-8 left-10 rounded-xl bg-white p-3 shadow-xl">
                <Sparkles className="h-5 w-5 text-indigo-500" />
            </div>

            {/* Purple Blob */}
            <div className="relative flex h-56 w-56 items-center justify-center rounded-[70px] bg-gradient-to-br from-[#7C5CFF] via-[#6D4AFF] to-[#5A39F5] shadow-[0_25px_60px_rgba(109,74,255,0.45)]">
                {/* Chat Bubble */}
                <div className="absolute -top-6 right-10 rounded-2xl bg-white px-4 py-2 shadow-lg">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-violet-500"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-violet-300"></div>
                    </div>
                </div>

                {/* Robot */}
                <div className="relative flex h-40 w-40 items-center justify-center rounded-[40px] bg-white shadow-2xl">
                    {/* Antenna */}
                    <div className="absolute -top-8 flex flex-col items-center">
                        <div className="h-5 w-[3px] rounded-full bg-slate-300"></div>
                        <div className="h-4 w-4 rounded-full bg-[#6D4AFF]"></div>
                    </div>

                    <Bot
                        strokeWidth={1.8}
                        className="h-20 w-20 text-[#6D4AFF]"
                    />

                    {/* Status Dot */}
                    <div className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute left-5 top-8 h-3 w-3 rounded-full bg-white/60"></div>
                <div className="absolute right-7 bottom-10 h-2 w-2 rounded-full bg-white/50"></div>
                <div className="absolute left-10 bottom-8 h-4 w-4 rounded-full bg-white/40"></div>
            </div>

            {/* Floating Ring */}
            <div className="absolute h-[250px] w-[250px] rounded-full border border-violet-200/40"></div>
        </div>
    );
}