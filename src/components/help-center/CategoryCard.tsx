// components/help-center/CategoryCard.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
    title: string;
    description: string;
    articles: number;
    href: string;
    icon: LucideIcon;
    iconBg: string;
}

export default function CategoryCard({
    title,
    description,
    articles,
    href,
    icon: Icon,
    iconBg,
}: CategoryCardProps) {
    return (
        <Link
            href={href}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_60px_rgba(109,74,255,0.12)]"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-violet-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative">
                {/* Icon */}
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} shadow-md transition-transform duration-300 group-hover:scale-110`}
                >
                    <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-lg font-semibold text-slate-900 transition-colors group-hover:text-violet-700">
                    {title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {articles} Articles
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50 text-violet-600 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
}