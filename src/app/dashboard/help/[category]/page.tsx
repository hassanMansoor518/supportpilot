import Link from "next/link";
import { ArrowLeft, Book, ChevronRight, Clock, FileText, Search } from "lucide-react";
import { notFound } from "next/navigation";

const categoryData: Record<string, { title: string; description: string; iconBg: string; articles: { id: string; title: string; excerpt: string; readTime: string }[] }> = {
  "getting-started": {
    title: "Getting Started",
    description: "Learn the basics and create your first AI chatbot in minutes.",
    iconBg: "from-violet-500 to-indigo-600",
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
    iconBg: "from-emerald-500 to-teal-600",
    articles: [
      { id: "5", title: "Upgrading your subscription plan", excerpt: "How to move from a free plan to a pro or enterprise plan.", readTime: "2 min read" },
      { id: "6", title: "Managing payment methods", excerpt: "Update your credit card or add new payment methods to your account.", readTime: "2 min read" },
      { id: "7", title: "Where to find your invoices", excerpt: "Download past invoices for your accounting records.", readTime: "1 min read" },
    ],
  },
  "chatbots": {
    title: "AI Chatbots",
    description: "Train, customize and optimize your chatbot for better responses.",
    iconBg: "from-blue-500 to-cyan-600",
    articles: [
      { id: "8", title: "Improving chatbot accuracy", excerpt: "Tips and tricks to ensure your chatbot gives the right answers.", readTime: "7 min read" },
      { id: "9", title: "Setting up fallback responses", excerpt: "What happens when your chatbot doesn't know the answer?", readTime: "3 min read" },
      { id: "10", title: "Reviewing chat transcripts", excerpt: "Analyze past conversations to improve your chatbot's knowledge base.", readTime: "4 min read" },
    ],
  },
  "integrations": {
    title: "Integrations",
    description: "Connect Slack, WhatsApp, Shopify, APIs and other services.",
    iconBg: "from-orange-500 to-red-500",
    articles: [
      { id: "11", title: "Connecting with Slack", excerpt: "Get notified in Slack whenever a user interacts with your chatbot.", readTime: "4 min read" },
      { id: "12", title: "Shopify Integration Guide", excerpt: "Allow your chatbot to answer order status queries directly.", readTime: "8 min read" },
      { id: "13", title: "Using the API", excerpt: "Build custom integrations using the SupportPilot REST API.", readTime: "10 min read" },
    ],
  },
  "troubleshooting": {
    title: "Troubleshooting",
    description: "Fix common issues, errors and unexpected chatbot behaviour.",
    iconBg: "from-pink-500 to-rose-600",
    articles: [
      { id: "14", title: "Chatbot not showing on website", excerpt: "Common reasons why your widget might not be visible.", readTime: "3 min read" },
      { id: "15", title: "Resolving 'Knowledge Base Empty' errors", excerpt: "How to fix indexing issues with your provided links.", readTime: "5 min read" },
    ],
  },
  "support": {
    title: "Support",
    description: "Need more help? Contact our support team anytime.",
    iconBg: "from-purple-500 to-fuchsia-600",
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
    <main className="min-h-screen bg-[#F7F8FC] py-8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
          <Link href="/dashboard/help" className="flex items-center hover:text-violet-600 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Help Center
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span className="font-medium text-slate-900">{data.title}</span>
        </nav>

        {/* Header Section */}
        <div className={`mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-br ${data.iconBg} p-8 sm:p-12 shadow-lg`}>
           <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none transform translate-x-8 -translate-y-8">
             <Book className="w-64 h-64 text-white" />
           </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white tracking-tight sm:text-5xl mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl font-medium">
              {data.description}
            </p>
            
            <div className="mt-8 max-w-md relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="text"
                placeholder={`Search in ${data.title}...`}
                className="w-full rounded-2xl border-0 bg-white/20 py-3.5 pl-12 pr-4 text-white placeholder-white/60 backdrop-blur-sm focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all placeholder:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-violet-500" />
              All Articles
            </h2>
            <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
              {data.articles.length} total
            </span>
          </div>
          
          <div className="grid gap-4">
            {data.articles.map((article) => (
              <Link
                key={article.id}
                href={`/dashboard/help/${category}/${article.id}`}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 hover:ring-violet-200"
              >
                <div className="flex-1 pr-6 relative z-10">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center text-sm text-slate-400 font-semibold whitespace-nowrap relative z-10">
                  <Clock className="mr-1.5 h-4 w-4 text-slate-300 group-hover:text-violet-400 transition-colors" />
                  {article.readTime}
                  <div className="ml-5 flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-violet-600 group-hover:text-white shadow-sm transition-all duration-300">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Hover Background Accent */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
