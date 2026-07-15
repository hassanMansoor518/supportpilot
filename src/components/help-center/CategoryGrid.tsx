// components/help-center/CategoryGrid.tsx

import {
    Bot,
    CreditCard,
    LifeBuoy,
    Puzzle,
    Rocket,
    Wrench,
} from "lucide-react";

import CategoryCard from "./CategoryCard";

const categories = [
    {
        title: "Getting Started",
        description:
            "Learn the basics and create your first AI chatbot in minutes.",
        articles: 12,
        href: "/dashboard/help/getting-started",
        icon: Rocket,
        iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
    },
    {
        title: "Account & Billing",
        description:
            "Manage subscriptions, invoices, payments and account settings.",
        articles: 8,
        href: "/dashboard/help/account-billing",
        icon: CreditCard,
        iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
        title: "AI Chatbots",
        description:
            "Train, customize and optimize your chatbot for better responses.",
        articles: 16,
        href: "/dashboard/help/chatbots",
        icon: Bot,
        iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600",
    },
    {
        title: "Integrations",
        description:
            "Connect Slack, WhatsApp, Shopify, APIs and other services.",
        articles: 10,
        href: "/dashboard/help/integrations",
        icon: Puzzle,
        iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
        title: "Troubleshooting",
        description:
            "Fix common issues, errors and unexpected chatbot behaviour.",
        articles: 15,
        href: "/dashboard/help/troubleshooting",
        icon: Wrench,
        iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
    {
        title: "Support",
        description:
            "Need more help? Contact our support team anytime.",
        articles: 6,
        href: "/dashboard/help/support",
        icon: LifeBuoy,
        iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    },
];

export default function CategoryGrid() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
                <CategoryCard
                    key={category.title}
                    title={category.title}
                    description={category.description}
                    articles={category.articles}
                    href={category.href}
                    icon={category.icon}
                    iconBg={category.iconBg}
                />
            ))}
        </div>
    );
}