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
  Database
} from "lucide-react";
import toast from "react-hot-toast";

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
    <div className="flex flex-col h-full font-sans max-w-6xl mx-auto">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbot Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure your AI assistant's identity and knowledge base.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100/50 border border-indigo-100 px-4 py-2 rounded-xl transition-colors">
          <Info size={16} />
          View Documentation
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 flex-1 pb-10">
        
        {/* ── LEFT: Main Form ── */}
        <div className="flex-1 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Bot size={16} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">Bot Identity</h2>
                <p className="text-[13px] text-gray-500 mt-0.5">Basic details about your business.</p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Building2 size={14} className="text-gray-400" />
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="support@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Database size={16} className="text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Knowledge Base</h2>
                  <p className="text-[13px] text-gray-500 mt-0.5">Information your bot uses to answer queries.</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                Primary Source
              </span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1 relative group">
                <textarea
                  value={knowledge}
                  onChange={(e) => setKnowledge(e.target.value)}
                  placeholder="Enter details about your company, return policies, FAQs, and product information here. The more you write, the smarter your bot becomes."
                  className="w-full h-[300px] sm:h-[400px] px-5 py-4 bg-gray-50/30 border border-gray-200 rounded-xl text-[14px] text-gray-800 focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all resize-y shadow-inner leading-relaxed placeholder:text-gray-400/80"
                />
                {!knowledge && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 flex flex-col items-center text-gray-400">
                    <Database size={32} className="mb-3 opacity-50" />
                    <p className="text-sm font-medium">Knowledge base is empty</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500 font-medium">
                  Accepts plain text, markdown, and code snippets.
                </p>
                <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-md">
                  {knowledge.length} chars
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${isSaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500 ring-4 ring-emerald-50'}`}></div>
              <span className="text-sm font-medium text-gray-600">
                {isSaving ? 'Syncing changes...' : 'Ready to save'}
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
        <div className="w-full xl:w-[320px] flex-shrink-0 flex flex-col gap-6">
          
          {/* Preview Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-500" />
              <h3 className="text-sm font-bold text-gray-900">Live Preview</h3>
            </div>
            <div className="p-5 bg-gray-50/50 flex-1">
              <div className="flex gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex flex-shrink-0 items-center justify-center text-indigo-600 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="flex flex-col">
                  <div className="bg-white text-gray-800 text-[13px] leading-relaxed px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-200 shadow-sm">
                    <p className="font-semibold mb-1 text-gray-900">Hi! I'm {businessName || 'SupportPilot'}.</p>
                    <p>I'm trained on your knowledge base. How can I help you today?</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 mt-1.5 ml-1">Just now</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 text-indigo-600 bg-white hover:bg-indigo-50 border border-indigo-100 rounded-xl py-2.5 text-sm font-bold transition-all shadow-sm">
                Open Test Playground
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-b from-white to-gray-50/50 rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Target size={16} className="text-gray-400" />
              Optimization Tips
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-3.5 group">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                  <span className="text-[11px] font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Be Specific & Detailed</h4>
                  <p className="text-[12.5px] text-gray-500 mt-1 leading-relaxed">
                    Provide precise answers. Instead of "We offer refunds", use "We offer full refunds within 30 days of purchase with a receipt."
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 group">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                  <span className="text-[11px] font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Add Common FAQs</h4>
                  <p className="text-[12.5px] text-gray-500 mt-1 leading-relaxed">
                    Include the exact phrasing customers use when asking questions to improve match rates.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 group">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                  <span className="text-[11px] font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">Update Regularly</h4>
                  <p className="text-[12.5px] text-gray-500 mt-1 leading-relaxed">
                    Whenever your business logic, pricing, or policies change, update this knowledge base immediately.
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
