import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, FileText, Search } from "lucide-react";
import { notFound } from "next/navigation";

const categoryData: Record<string, { title: string; description: string; iconBg: string; articles: { id: string; title: string; excerpt: string; readTime: string }[] }> = {
  "getting-started": {
    title: "Getting Started",
    description: "Learn the basics and create your first AI chatbot in minutes.",
    iconBg: "bg-violet-100 text-violet-600",
    articles: [
      { id: "1", title: "How to create your first chatbot", excerpt: "A step-by-step guide to setting up your first SupportPilot chatbot.", readTime: "5 min read" },
      { id: "2", title: "Understanding the dashboard layout", excerpt: "Navigate through the new dashboard efficiently with this quick overview.", readTime: "3 min read" },
      { id: "3", title: "Customizing your chatbot's appearance", excerpt: "Make your chatbot match your brand's colors and style.", readTime: "4 min read" },
      { id: "4", title: "Adding knowledge sources", excerpt: "Learn how to train your chatbot using your website or documents.", readTime: "6 min read" },
    ],
  },
  "account-billing": {
    title: "Account & Billing",
    description: "Manage subscriptions, invoices, payments and account settings.",
    iconBg: "bg-emerald-100 text-emerald-600",
    articles: [
      { id: "5", title: "Upgrading your subscription plan", excerpt: "How to move from a free plan to a pro or enterprise plan.", readTime: "2 min read" },
      { id: "6", title: "Managing payment methods", excerpt: "Update your credit card or add new payment methods to your account.", readTime: "2 min read" },
      { id: "7", title: "Where to find your invoices", excerpt: "Download past invoices for your accounting records.", readTime: "1 min read" },
    ],
  },
  "chatbots": {
    title: "AI Chatbots",
    description: "Train, customize and optimize your chatbot for better responses.",
    iconBg: "bg-blue-100 text-blue-600",
    articles: [
      { id: "8", title: "Improving chatbot accuracy", excerpt: "Tips and tricks to ensure your chatbot gives the right answers.", readTime: "7 min read" },
      { id: "9", title: "Setting up fallback responses", excerpt: "What happens when your chatbot doesn't know the answer?", readTime: "3 min read" },
      { id: "10", title: "Reviewing chat transcripts", excerpt: "Analyze past conversations to improve your chatbot's knowledge base.", readTime: "4 min read" },
    ],
  },
  "integrations": {
    title: "Integrations",
    description: "Connect Slack, WhatsApp, Shopify, APIs and other services.",
    iconBg: "bg-orange-100 text-orange-600",
    articles: [
      { id: "11", title: "Connecting with Slack", excerpt: "Get notified in Slack whenever a user interacts with your chatbot.", readTime: "4 min read" },
      { id: "12", title: "Shopify Integration Guide", excerpt: "Allow your chatbot to answer order status queries directly.", readTime: "8 min read" },
      { id: "13", title: "Using the API", excerpt: "Build custom integrations using the SupportPilot REST API.", readTime: "10 min read" },
    ],
  },
  "troubleshooting": {
    title: "Troubleshooting",
    description: "Fix common issues, errors and unexpected chatbot behaviour.",
    iconBg: "bg-rose-100 text-rose-600",
    articles: [
      { id: "14", title: "Chatbot not showing on website", excerpt: "Common reasons why your widget might not be visible.", readTime: "3 min read" },
      { id: "15", title: "Resolving 'Knowledge Base Empty' errors", excerpt: "How to fix indexing issues with your provided links.", readTime: "5 min read" },
    ],
  },
  "support": {
    title: "Support",
    description: "Need more help? Contact our support team anytime.",
    iconBg: "bg-purple-100 text-purple-600",
    articles: [
      { id: "16", title: "How to contact premium support", excerpt: "Priority channels available for pro and enterprise customers.", readTime: "2 min read" },
      { id: "17", title: "Reporting a bug", excerpt: "The best way to report issues so our engineering team can fix them quickly.", readTime: "2 min read" },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = categoryData[category];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
          <Link href="/dashboard/help" className="hover:text-slate-900 transition-colors">
            Help Center
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
          <span className="text-slate-900">{data.title}</span>
        </nav>

        {/* Clean Header */}
        <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${data.iconBg}`}>
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {data.title}
            </h1>
            <p className="mt-2 text-base text-slate-500 max-w-xl">
              {data.description}
            </p>
          </div>
          
          <div className="w-full md:w-72 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full rounded-lg border-0 py-2.5 pl-10 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Article List */}
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Articles in {data.title}
            </h2>
            <span className="text-sm text-slate-500 font-medium">{data.articles.length} total</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {data.articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/dashboard/help/${category}/${article.id}`}
                  className="group block hover:bg-slate-50 transition-colors"
                >
                  <div className="px-6 py-6 sm:flex sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-400 group-hover:text-violet-500 transition-colors shrink-0" />
                        <h3 className="text-base font-medium text-slate-900 group-hover:text-violet-600 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      <div className="mt-2 pl-8">
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 pl-8 sm:pl-0">
                      <div className="flex items-center text-sm text-slate-400">
                        {article.readTime}
                      </div>
                      <ChevronRight className="ml-4 h-5 w-5 text-slate-300 group-hover:text-violet-500 transition-colors" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  );
}
