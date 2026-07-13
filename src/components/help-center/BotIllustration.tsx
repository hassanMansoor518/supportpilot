"use client";

// components/help-center/BotIllustration.tsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";

const messages = ["Hello!", "Need Help?", "Ask Me Anything", "Let's Chat"];

export default function BotIllustration() {
    const [activeMessage, setActiveMessage] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveMessage((prev) => (prev + 1) % messages.length);
        }, 4000);

        return () => window.clearInterval(timer);
    }, []);

    const handleMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;

        setTilt({
            x: py * -8,
            y: px * 8,
        });
    };

    return (
        <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center sm:max-w-[360px] lg:max-w-[420px]">
            {/* Background Glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(167,139,250,0.25)_0%,_rgba(109,74,255,0.12)_40%,_transparent_70%)] blur-3xl" />
            <div className="absolute left-0 top-6 h-32 w-32 rounded-full bg-fuchsia-200/30 blur-3xl" />
            <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-violet-200/25 blur-3xl" />

            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
            >
                {/* Antenna */}
               
                <div className="absolute left-1/2 -top-12 z-20 -translate-x-1/2">
                    {/* Ball */}
                    <motion.div
                        animate={{ rotate: [-6, 6, -6] }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="relative z-10 mx-auto h-5 w-5 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 shadow-[0_0_16px_rgba(168,85,247,0.5)]"
                    />

                    {/* Rod */}
                    <div className="mx-auto h-8 w-[2.5px] rounded-full bg-gradient-to-b from-violet-400 to-violet-300" />
                </div>

                {/* Main Body Container */}
                <motion.div
                    onMouseMove={handleMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setTilt({ x: 0, y: 0 });
                    }}
                    whileHover={{ scale: 1.06 }}
                    style={{ rotateX: tilt.x, rotateY: tilt.y, transformPerspective: 1000 }}
                    className="relative flex h-[190px] w-[230px] items-center justify-center rounded-[70px] bg-gray-200 p-6 shadow-[0_25px_60px_rgba(88,28,135,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                    {/* Glossy Highlight on Body */}
                    <div className="absolute left-8 top-6 h-12 w-24 rounded-full bg-white/5 blur-2xl" />

                    {/* Left Ear */}
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            animate={{ rotateZ: isHovered ? [-8, 8, -8] : [0] }}
                            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                            className="h-17 w-8 rounded-[20px] bg-gradient-to-r from-primary to-purple-600 shadow-[0_12px_28px_rgba(168,85,247,0.2)]"
                        />
                    </div>

                    {/* Right Ear */}
                    <div className="absolute right-[-18px] top-1/2 -translate-y-1/2">
                        <motion.div
                            animate={{ rotateZ: isHovered ? [8, -8, 8] : [0] }}
                            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
                            className="h-17 w-8 rounded-[20px] bg-gradient-to-r from-primary to-purple-600 shadow-[0_12px_28px_rgba(168,85,247,0.2)]"
                        />
                    </div>

                    {/* Face Panel */}
                    <div className="relative z-10 flex h-[140px] w-[200px] flex-col items-center justify-center rounded-[42px] bg-gradient-to-b from-[#1e0f3d] via-[#140827] to-[#0a0415] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_-4px_12px_rgba(0,0,0,0.5)]">
                        {/* Face Glass Shine */}
                        <div className="absolute inset-2 rounded-[40px] border border-white/5" />

                        {/* Eyes Container */}
                        <div className="relative mb-4 flex items-center gap-6">
                            {/* Left Eye */}
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#c7d2fe] to-[#a5b4fc] shadow-[0_0_12px_rgba(165,180,252,0.6),inset_0_-2px_4px_rgba(0,0,0,0.3)]"
                            >
                                {/* Eye Shine */}
                                <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-white/60" />
                                {/* Left Eyelash */}
                                <svg className="absolute -top-3 h-2 w-6" viewBox="0 0 24 8" fill="none">
                                    <path d="M4 4 Q6 1 8 4 M10 4 Q12 1 14 4 M16 4 Q18 1 20 4" stroke="rgba(165,180,252,0.6)" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                            </motion.div>

                            {/* Right Eye */}
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-[#c7d2fe] to-[#a5b4fc] shadow-[0_0_12px_rgba(165,180,252,0.6),inset_0_-2px_4px_rgba(0,0,0,0.3)]"
                            >
                                {/* Eye Shine */}
                                <div className="absolute top-1 left-1 h-2 w-2 rounded-full bg-white/60" />
                                {/* Right Eyelash */}
                                <svg className="absolute -top-3 h-2 w-6" viewBox="0 0 24 8" fill="none">
                                    <path d="M4 4 Q6 1 8 4 M10 4 Q12 1 14 4 M16 4 Q18 1 20 4" stroke="rgba(165,180,252,0.6)" strokeWidth="1" strokeLinecap="round" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Smile */}
                        <motion.div
                            animate={{ scaleY: isHovered ? [1, 1.1, 1] : [1] }}
                            transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0 }}
                            className="relative mt-2 flex items-center gap-3"
                        >
                            <svg className="h-6 w-12" viewBox="0 0 48 20" fill="none">
                                <path d="M8 10 Q24 16 40 10" stroke="rgba(165,180,252,0.8)" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Speech Bubble */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={messages[activeMessage]}
                        initial={{ opacity: 0, y: 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-20 right-0 z-30 rounded-full border border-violet-200/80 bg-gradient-to-br from-white to-violet-50/40 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-[0_12px_28px_rgba(109,74,255,0.15)] backdrop-blur-sm"
                    >
                        {messages[activeMessage]}
                    </motion.div>
                </AnimatePresence>

                {/* Floating Sparkles */}
                <motion.div
                    className="absolute -left-8 top-1/3 h-2 w-2 rounded-full bg-violet-300/70 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -right-6 bottom-1/4 h-1.5 w-1.5 rounded-full bg-violet-400/60 shadow-[0_0_6px_rgba(168,85,247,0.4)]"
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: 0.3 }}
                />
            </motion.div>
        </div>
    );
}