import Link from "next/link";
import { ArrowLeft, Book, ChevronRight, Clock, FileText } from "lucide-react";
import { notFound } from "next/navigation";

// Mock data for articles per category
const categoryData: Record<string, { title: string; description: string; articles: { id: string; title: string; excerpt: string; readTime: string }[] }> = {
  "getting-started": {
    title: "Getting Started",
    description: "Learn the basics and create your first AI chatbot in minutes.",
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
    articles: [
      { id: "5", title: "Upgrading your subscription plan", excerpt: "How to move from a free plan to a pro or enterprise plan.", readTime: "2 min read" },
      { id: "6", title: "Managing payment methods", excerpt: "Update your credit card or add new payment methods to your account.", readTime: "2 min read" },
      { id: "7", title: "Where to find your invoices", excerpt: "Download past invoices for your accounting records.", readTime: "1 min read" },
    ],
  },
  "chatbots": {
    title: "AI Chatbots",
    description: "Train, customize and optimize your chatbot for better responses.",
    articles: [
      { id: "8", title: "Improving chatbot accuracy", excerpt: "Tips and tricks to ensure your chatbot gives the right answers.", readTime: "7 min read" },
      { id: "9", title: "Setting up fallback responses", excerpt: "What happens when your chatbot doesn't know the answer?", readTime: "3 min read" },
      { id: "10", title: "Reviewing chat transcripts", excerpt: "Analyze past conversations to improve your chatbot's knowledge base.", readTime: "4 min read" },
    ],
  },
  "integrations": {
    title: "Integrations",
    description: "Connect Slack, WhatsApp, Shopify, APIs and other services.",
    articles: [
      { id: "11", title: "Connecting with Slack", excerpt: "Get notified in Slack whenever a user interacts with your chatbot.", readTime: "4 min read" },
      { id: "12", title: "Shopify Integration Guide", excerpt: "Allow your chatbot to answer order status queries directly.", readTime: "8 min read" },
      { id: "13", title: "Using the API", excerpt: "Build custom integrations using the SupportPilot REST API.", readTime: "10 min read" },
    ],
  },
  "troubleshooting": {
    title: "Troubleshooting",
    description: "Fix common issues, errors and unexpected chatbot behaviour.",
    articles: [
      { id: "14", title: "Chatbot not showing on website", excerpt: "Common reasons why your widget might not be visible.", readTime: "3 min read" },
      { id: "15", title: "Resolving 'Knowledge Base Empty' errors", excerpt: "How to fix indexing issues with your provided links.", readTime: "5 min read" },
    ],
  },
  "support": {
    title: "Support",
    description: "Need more help? Contact our support team anytime.",
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
        <nav className="mb-8 flex items-center space-x-2 text-sm text-slate-500">
          <Link href="/dashboard/help" className="flex items-center hover:text-violet-600 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Help Center
          </Link>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span className="font-medium text-slate-900">{data.title}</span>
        </nav>

        {/* Header Section */}
        <div className="mb-12 rounded-3xl bg-white p-8 shadow-sm border border-slate-200/60 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <Book className="w-48 h-48 text-violet-600" />
           </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {data.description}
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
             <FileText className="mr-2 h-5 w-5 text-violet-500" />
             Available Articles ({data.articles.length})
          </h2>
          
          <div className="grid gap-4">
            {data.articles.map((article) => (
              <Link
                key={article.id}
                href={`/dashboard/help/${category}/${article.id}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl bg-white p-6 border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-violet-200"
              >
                <div className="flex-1 pr-6">
                  <h3 className="text-lg font-medium text-slate-900 group-hover:text-violet-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {article.excerpt}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center text-sm text-slate-400 font-medium whitespace-nowrap">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {article.readTime}
                  <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
