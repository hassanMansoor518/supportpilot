// components/help-center/Hero.tsx

import { Search } from "lucide-react";
import BotIllustration from "./BotIllustration";

export default function Hero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-[#F6F4FF] via-white to-[#F4F8FF] px-8 py-10 shadow-[0_20px_60px_rgba(109,74,255,0.08)] lg:px-14 lg:py-2">

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_320px]">
                {/* Left */}
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        How can we help you?
                    </h1>

                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-500">
                        Find answers, guides, and resources to get the most out of
                        SupportPilot.
                    </p>

                    {/* Search */}
                    <div className="mt-8 flex max-w-2xl items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
                        <div className="flex flex-1 items-center px-5">
                            <Search className="mr-3 h-5 w-5 text-slate-400" />

                            <input
                                type="text"
                                placeholder="Search for articles, guides, and more..."
                                className="h-14 w-full bg-transparent text-[15px] text-slate-700 placeholder:text-slate-400 outline-none"
                            />
                        </div>

                        <button className="mr-2 rounded-xl bg-[#6D4AFF] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5B38F6] hover:shadow-xl hover:shadow-violet-300">
                            Search
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="hidden justify-end lg:flex">
                    <BotIllustration />
                </div>
            </div>

        </section>
    );
}