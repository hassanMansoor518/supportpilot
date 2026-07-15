import Link from "next/link";
import { ChevronRight, FileText, Info, ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

// Reusing the same mock data for article contents
const categoryData: Record<string, { title: string; articles: { id: string; title: string; excerpt: string; readTime: string; content: string }[] }> = {
  "getting-started": {
    title: "Getting Started",
    articles: [
      { 
        id: "1", 
        title: "How to create your first chatbot", 
        excerpt: "A step-by-step guide to setting up your first SupportPilot chatbot.", 
        readTime: "5 min read",
        content: "Creating your first chatbot is easy. First, navigate to the Chatbots section from the left sidebar. Click on the 'Create New Chatbot' button. You'll be prompted to provide a name and a base prompt. Once created, you can start feeding it data via website URLs or document uploads."
      },
      { 
        id: "2", 
        title: "Understanding the dashboard layout", 
        excerpt: "Navigate through the new dashboard efficiently with this quick overview.", 
        readTime: "3 min read",
        content: "The dashboard is divided into three main sections: the sidebar for navigation, the header for quick actions and profile settings, and the main content area where you manage your active tasks. You can always collapse the sidebar to get more focus area."
      },
      { 
        id: "3", 
        title: "Customizing your chatbot's appearance", 
        excerpt: "Make your chatbot match your brand's colors and style.", 
        readTime: "4 min read",
        content: "Head over to the specific Chatbot's settings page. Under the 'Appearance' tab, you can change the primary color, chatbot avatar, and the initial greeting message. You can preview these changes in real-time in the Playground."
      },
      { 
        id: "4", 
        title: "Adding knowledge sources", 
        excerpt: "Learn how to train your chatbot using your website or documents.", 
        readTime: "6 min read",
        content: "Knowledge sources are the brain of your chatbot. Go to the 'Knowledge' tab in your Chatbot settings. Here, you can enter a list of URLs you want the bot to crawl, or upload PDF and TXT files. Once you save, our system will process and index the information."
      },
    ],
  },
  "account-billing": {
    title: "Account & Billing",
    articles: [
      { id: "5", title: "Upgrading your subscription plan", excerpt: "How to move from a free plan to a pro or enterprise plan.", readTime: "2 min read", content: "To upgrade, navigate to Settings > Billing. Click on 'Upgrade Plan' and choose the tier that best fits your needs. We accept all major credit cards." },
      { id: "6", title: "Managing payment methods", excerpt: "Update your credit card or add new payment methods to your account.", readTime: "2 min read", content: "In Settings > Billing, scroll down to Payment Methods. Here you can add new cards, remove old ones, or set a new default payment method for future invoices." },
      { id: "7", title: "Where to find your invoices", excerpt: "Download past invoices for your accounting records.", readTime: "1 min read", content: "All your past invoices are stored securely. Go to Settings > Billing and scroll to the Invoices section. You can download any invoice as a PDF." },
    ],
  },
  "chatbots": {
    title: "AI Chatbots",
    articles: [
      { id: "8", title: "Improving chatbot accuracy", excerpt: "Tips and tricks to ensure your chatbot gives the right answers.", readTime: "7 min read", content: "If your chatbot is hallucinating or giving incorrect answers, ensure your knowledge base is up to date. You can also adjust the system prompt to restrict the bot from answering questions outside of its provided knowledge." },
      { id: "9", title: "Setting up fallback responses", excerpt: "What happens when your chatbot doesn't know the answer?", readTime: "3 min read", content: "A fallback response is crucial for a good user experience. Configure it in the Chatbot Settings to politely inform the user that the bot doesn't know the answer and optionally provide a human contact email." },
      { id: "10", title: "Reviewing chat transcripts", excerpt: "Analyze past conversations to improve your chatbot's knowledge base.", readTime: "4 min read", content: "Go to the Conversations tab for your chatbot. Here you can read through past interactions. If you spot areas where the bot struggled, you can add that specific information to your knowledge base." },
    ],
  },
  "integrations": {
    title: "Integrations",
    articles: [
      { id: "11", title: "Connecting with Slack", excerpt: "Get notified in Slack whenever a user interacts with your chatbot.", readTime: "4 min read", content: "Go to the Integrations page, find Slack, and click Connect. You will be redirected to authenticate with your Slack workspace. Once connected, choose a channel to route notifications to." },
      { id: "12", title: "Shopify Integration Guide", excerpt: "Allow your chatbot to answer order status queries directly.", readTime: "8 min read", content: "Our Shopify integration allows the bot to fetch order status. You will need to provide your Shopify Store URL and an Admin API Access Token. Follow the step-by-step guide on the Integrations page." },
      { id: "13", title: "Using the API", excerpt: "Build custom integrations using the SupportPilot REST API.", readTime: "10 min read", content: "For ultimate flexibility, use our REST API. You can generate API keys in Settings > Developer. The API allows you to send messages, manage knowledge bases, and more programmatically." },
    ],
  },
  "troubleshooting": {
    title: "Troubleshooting",
    articles: [
      { id: "14", title: "Chatbot not showing on website", excerpt: "Common reasons why your widget might not be visible.", readTime: "3 min read", content: "First, ensure you have copied the correct script tag into your website's <head> or <body>. If it's still not showing, check your browser's console for any JavaScript errors or blocked network requests." },
      { id: "15", title: "Resolving 'Knowledge Base Empty' errors", excerpt: "How to fix indexing issues with your provided links.", readTime: "5 min read", content: "If you see a 'Knowledge Base Empty' error, it means our crawler couldn't extract text from your provided URLs. This usually happens with single-page applications (SPAs) or sites blocking bots. Try uploading document files directly as an alternative." },
    ],
  },
  "support": {
    title: "Support",
    articles: [
      { id: "16", title: "How to contact premium support", excerpt: "Priority channels available for pro and enterprise customers.", readTime: "2 min read", content: "Pro and Enterprise customers have access to priority email support and a dedicated Slack channel. Check your welcome email for the priority support address." },
      { id: "17", title: "Reporting a bug", excerpt: "The best way to report issues so our engineering team can fix them quickly.", readTime: "2 min read", content: "When reporting a bug, please include steps to reproduce, what you expected to happen, and what actually happened. Screenshots and browser console logs are highly appreciated." },
    ],
  },
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; articleId: string }>;
}) {
  const { category, articleId } = await params;
  
  const categoryInfo = categoryData[category];
  if (!categoryInfo) notFound();

  const article = categoryInfo.articles.find(a => a.id === articleId);
  if (!article) notFound();

  // Find related articles
  const relatedArticles = categoryInfo.articles.filter(a => a.id !== articleId).slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      
      {/* Top Navigation Bar for Docs */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <nav className="flex items-center text-sm font-medium text-slate-500">
              <Link href="/dashboard/help" className="hover:text-slate-900 transition-colors">
                Help Center
              </Link>
              <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
              <Link href={`/dashboard/help/${category}`} className="hover:text-slate-900 transition-colors">
                {categoryInfo.title}
              </Link>
              <ChevronRight className="mx-2 h-4 w-4 text-slate-400" />
              <span className="text-slate-900 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
            </nav>
            
            <div className="flex items-center">
               <Link href="/dashboard/help" className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1">
                 <ArrowLeft className="h-4 w-4" />
                 Back to Help
               </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <article className="flex-1 lg:max-w-3xl">
            
            <header className="mb-10">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-500 border-t border-slate-100 pt-6">
                <span>By <strong>SupportPilot Team</strong></span>
                <span className="text-slate-300">•</span>
                <span>{article.readTime}</span>
                <span className="text-slate-300">•</span>
                <span>Updated recently</span>
              </div>
            </header>

            <div className="prose prose-slate prose-violet max-w-none">
              <p>{article.content}</p>
              
              <div className="my-8 rounded-lg border border-blue-100 bg-blue-50/50 p-6 flex gap-4">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900 m-0 mb-1">Pro Tip</h4>
                  <p className="text-sm text-blue-800/80 m-0 leading-relaxed">
                    Make sure to test your chatbot in the Playground before deploying it live. This ensures all knowledge is indexed properly and gives you a chance to adjust settings.
                  </p>
                </div>
              </div>

              <h3>Next Steps</h3>
              <p>
                If you found this guide helpful, check out our other resources. A strong foundation will help you scale your support operations efficiently.
              </p>
              <ul>
                <li>Review your chatbot's settings to fine-tune its personality</li>
                <li>Add more comprehensive knowledge sources for better answers</li>
                <li>Set up integrations to connect the bot to your existing workflow</li>
              </ul>
            </div>

            <hr className="my-12 border-slate-200" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">Was this helpful?</h4>
                <div className="mt-3 flex items-center gap-3">
                  <button className="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
                    Yes
                  </button>
                  <button className="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors">
                    No
                  </button>
                </div>
              </div>
            </div>

          </article>

          {/* Clean Right Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-24 space-y-10">
              
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    Related articles
                  </h3>
                  <ul className="space-y-3">
                    {relatedArticles.map((rel) => (
                      <li key={rel.id}>
                        <Link 
                          href={`/dashboard/help/${category}/${rel.id}`}
                          className="group text-sm block"
                        >
                          <span className="text-slate-600 group-hover:text-violet-600 transition-colors line-clamp-2 leading-relaxed">
                            {rel.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need help */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">Still need help?</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Our team is available 24/7 to assist you.
                </p>
                <Link 
                  href="/dashboard/help/support" 
                  className="mt-4 inline-flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 group"
                >
                  Contact support
                  <ArrowUpRight className="ml-1 h-4 w-4 text-violet-400 group-hover:text-violet-600 transition-colors" />
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
