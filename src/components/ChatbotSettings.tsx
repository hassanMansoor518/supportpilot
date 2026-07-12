import React, { useState, useEffect } from "react";
import {
  Bot,
  Info,
  Check,
  ExternalLink,
  Sparkles,
  RefreshCw,
  MessageSquareQuote,
  Target,
  Loader2,
  Building2,
  Mail,
  Database,
  Lock,
  Zap,
  Globe
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ChatbotSettings({ ownerId }: { ownerId: string }) {
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/settings?ownerId=${ownerId}`);
        const data = await res.json();
        if (data.success && data.setting) {
          if (data.setting.businessName) setBusinessName(data.setting.businessName);
          if (data.setting.supportEmail) setSupportEmail(data.setting.supportEmail);
          if (data.setting.knowledge) setKnowledge(data.setting.knowledge);
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (ownerId) {
      fetchSettings();
    }
  }, [ownerId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId, businessName, supportEmail, knowledge }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full font-sans max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Chatbot Configuration</h1>
          <p className="text-[15px] text-gray-500 mt-1.5 font-medium">
            Fine-tune your AI's identity, knowledge, and behavior.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200/80 px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md">
          <Info size={16} className="text-gray-400" />
          Documentation
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 pb-12">

        {/* ── LEFT: Main Form ── */}
        <div className="flex-1 space-y-8">

          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden relative">
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center">
                <Bot size={18} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Bot Identity</h2>
                <p className="text-[13px] text-gray-500 font-medium">The persona your customers interact with.</p>
              </div>
            </div>

            <div className="p-7">
              <div className="grid sm:grid-cols-2 gap-7">
                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    <Building2 size={14} className="text-gray-400" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Stripe, Acme Corp"
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400 font-medium"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    <Mail size={14} className="text-gray-400" />
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="support@company.com"
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative">
            {/* Subtle top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>

            <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-emerald-50/80 border border-emerald-100/50 flex items-center justify-center">
                  <Database size={18} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Core Knowledge Base</h2>
                  <p className="text-[13px] text-gray-500 font-medium">Train your AI with specific business contexts.</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 uppercase tracking-widest">
                Active Source
              </span>
            </div>

            <div className="p-7 flex-1 flex flex-col bg-gray-50/30">
              <div className="flex-1 relative group">
                <textarea
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  placeholder="Paste your FAQs, return policies, shipping details, and product specs here. The richer the context, the smarter the AI responses."
                  className="w-full h-[320px] px-5 py-5 bg-white border border-gray-200/80 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all resize-y shadow-sm leading-[1.8] font-medium placeholder:text-gray-400/80"
                />
                {!knowledge && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                      <Database size={24} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-semibold text-gray-400">Knowledge base is empty</p>
                    <p className="text-[12px] text-gray-400 mt-1">Start typing to train your bot.</p>
                  </div>
                )}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <p className="text-[12px] text-gray-500 font-bold tracking-wide">
                    MARKDOWN SUPPORTED
                  </p>
                </div>
                <span className="text-[12px] text-gray-500 font-bold bg-white border border-gray-200/80 px-3 py-1.5 rounded-[8px] shadow-sm">
                  {knowledge.length} characters
                </span>
              </div>
            </div>
          </div>



          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 pb-8">
            <div className="flex items-center gap-3 bg-white border border-gray-200/80 px-4 py-2 rounded-xl shadow-sm">
              <div className={`w-2.5 h-2.5 rounded-full ${isSaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500 ring-4 ring-emerald-50'}`}></div>
              <span className="text-sm font-bold text-gray-700">
                {isSaving ? 'Syncing to cloud...' : 'All systems ready'}
              </span>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:hover:bg-indigo-600 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:translate-y-0 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
              {isSaving ? 'Saving Changes...' : 'Save Configuration'}
            </button>
          </div>

        </div>

        {/* ── RIGHT: Preview & Tips ── */}
        <div className="w-full xl:w-[350px] flex-shrink-0 flex flex-col gap-8">

          {/* Preview Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600" />
                <h3 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-widest">Live Preview</h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div className="p-6 bg-[#FCFCFD] flex-1">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1px] flex flex-shrink-0 items-center justify-center shadow-md">
                  <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                    <Bot size={18} className="text-indigo-600" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="bg-white text-gray-800 text-[14px] leading-relaxed px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-200/80 shadow-sm font-medium">
                    <p className="font-bold mb-1 text-gray-900">Hi! I'm {businessName || 'SupportPilot'}.</p>
                    <p className="text-gray-600">I'm trained and ready. How can I help you today?</p>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 mt-2 ml-1 uppercase tracking-wider">Just now</span>
                </div>
              </div>
              <Link
                href="/dashboard/TestPlayground"
                className="w-full flex items-center justify-center gap-2 text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl py-3 text-sm font-extrabold transition-all shadow-sm">
                Open Test Playground
                <ExternalLink size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Premium Tips Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-7">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Target size={16} className="text-gray-400" />
              Optimization Tips
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-[10px] bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-900 flex-shrink-0 mt-0.5 group-hover:bg-gray-100 transition-colors shadow-sm">
                  <span className="text-[13px] font-black">1</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">Be Specific & Detailed</h4>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed font-medium">
                    Provide exact answers. Instead of "We offer refunds", use "Full refunds within 30 days."
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-[10px] bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-900 flex-shrink-0 mt-0.5 group-hover:bg-gray-100 transition-colors shadow-sm">
                  <span className="text-[13px] font-black">2</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">Include Key FAQs</h4>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed font-medium">
                    Paste the exact phrasing customers use when asking questions to improve AI match rates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-[10px] bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-900 flex-shrink-0 mt-0.5 group-hover:bg-gray-100 transition-colors shadow-sm">
                  <span className="text-[13px] font-black">3</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">Keep It Updated</h4>
                  <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed font-medium">
                    Whenever your business logic or pricing changes, update this knowledge base instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
