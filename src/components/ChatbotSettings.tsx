import React, { useState, useEffect } from "react";
import {
  Bot,
  Info,
  Check,
  ExternalLink,
  Sparkles,
  MessageSquareQuote,
  Target,
  Loader2,
  Building2,
  Mail,
  Database,
  Save,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChatbotSettings({ ownerId, botId }: { ownerId: string; botId?: string | null }) {
  const router = useRouter();
  const isEditMode = !!botId;

  // Chatbot-specific fields
  const [chatbotName, setChatbotName] = useState("");
  const [description, setDescription] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I help you today?");
  const [themeColor, setThemeColor] = useState("#0f3387");
  const [aiModel, setAiModel] = useState("gemini-3.1-flash-lite");
  const [temperature, setTemperature] = useState(0.7);
  const [status, setStatus] = useState("active");

  // Business settings fields
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Always load business settings
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

    // If editing, load chatbot details too
    const fetchChatbot = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/chatbots/${botId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const bot = data.data;
          setChatbotName(bot.chatbotName || "");
          setDescription(bot.description || "");
          setWelcomeMessage(bot.welcomeMessage || "Hello! How can I help you today?");
          setThemeColor(bot.themeColor || "#0f3387");
          setAiModel(bot.aiModel || "gemini-3.1-flash-lite");
          setTemperature(bot.temperature ?? 0.7);
          setStatus(bot.status || "active");
        }
      } catch (error) {
        console.error("Failed to fetch chatbot", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ownerId) fetchSettings();
    if (botId) fetchChatbot();
  }, [ownerId, botId]);

  const handleSave = async () => {
    if (!chatbotName.trim() && !isEditMode) {
      toast.error("Chatbot name is required.");
      return;
    }

    try {
      setIsSaving(true);

      // Save business settings
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerId, businessName, supportEmail, knowledge }),
      });

      if (isEditMode) {
        // Update existing chatbot
        const res = await fetch(`/api/chatbots/${botId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatbotName, description, welcomeMessage, themeColor, aiModel, temperature, status }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Chatbot updated successfully!");
        } else {
          toast.error(data.message || "Failed to update chatbot.");
        }
      } else {
        // Create new chatbot
        const res = await fetch("/api/chatbots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatbotName, description, welcomeMessage, themeColor, aiModel, temperature, status }),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Chatbot created successfully!");
          router.push("/dashboard/chatbots");
        } else {
          toast.error(data.message || "Failed to create chatbot.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={32} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full font-sans max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <Link href="/dashboard/chatbots" className="mb-3 flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600">
            <ArrowLeft size={15} />
            Back to Chatbots
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isEditMode ? "Edit Chatbot" : "Create Chatbot"}
          </h1>
          <p className="text-[15px] text-gray-500 mt-1.5 font-medium">
            {isEditMode ? "Update your chatbot configuration." : "Set up a new AI assistant for your customers."}
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

          {/* Chatbot Identity Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-violet-400" />
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center">
                <Bot size={18} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Chatbot Identity</h2>
                <p className="text-[13px] text-gray-500 font-medium">Configure your chatbot's name and appearance.</p>
              </div>
            </div>

            <div className="p-7">
              <div className="grid sm:grid-cols-2 gap-7">
                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    <Bot size={14} className="text-gray-400" />
                    Chatbot Name *
                  </label>
                  <input
                    type="text"
                    value={chatbotName}
                    onChange={(e) => setChatbotName(e.target.value)}
                    placeholder="e.g. Sales Assistant"
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400 font-medium"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm font-medium"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    <MessageSquareQuote size={14} className="text-gray-400" />
                    Welcome Message
                  </label>
                  <input
                    type="text"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Hello! How can I help you today?"
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm placeholder:text-gray-400 font-medium"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                    Theme Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="h-12 w-12 cursor-pointer rounded border-0 bg-transparent p-0"
                    />
                    <span className="text-sm text-gray-500 font-mono">{themeColor}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">AI Model</label>
                  <select
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FCFCFD] border border-gray-200/80 hover:border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-500 transition-all shadow-sm font-medium"
                  >
                    <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash</option>
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Temperature: {temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full mt-3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Identity Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden relative">
            <div className="px-7 py-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center">
                <Building2 size={18} className="text-indigo-600" />
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
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />

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
                  <p className="text-[12px] text-gray-500 font-bold tracking-wide">MARKDOWN SUPPORTED</p>
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
              <div className={`w-2.5 h-2.5 rounded-full ${isSaving ? "bg-amber-400 animate-pulse" : "bg-emerald-500 ring-4 ring-emerald-50"}`} />
              <span className="text-sm font-bold text-gray-700">
                {isSaving ? "Syncing to cloud..." : "All systems ready"}
              </span>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
              {isSaving ? "Saving..." : isEditMode ? "Update Chatbot" : "Create Chatbot"}
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
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="p-6 bg-[#FCFCFD] flex-1">
              <div className="flex gap-4 mb-6">
                <div
                  className="w-10 h-10 rounded-xl p-[1px] flex flex-shrink-0 items-center justify-center shadow-md"
                  style={{ backgroundColor: themeColor }}
                >
                  <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                    <Bot size={18} className="text-indigo-600" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="bg-white text-gray-800 text-[14px] leading-relaxed px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-200/80 shadow-sm font-medium">
                    <p className="font-bold mb-1 text-gray-900">Hi! I'm {chatbotName || businessName || "SupportPilot"}.</p>
                    <p className="text-gray-600">{welcomeMessage}</p>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 mt-2 ml-1 uppercase tracking-wider">Just now</span>
                </div>
              </div>
              <Link
                href="/dashboard/TestPlayground"
                className="w-full flex items-center justify-center gap-2 text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl py-3 text-sm font-extrabold transition-all shadow-sm"
              >
                Open Test Playground
                <ExternalLink size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-white rounded-2xl border border-gray-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-7">
            <h3 className="text-[14px] font-extrabold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Target size={16} className="text-gray-400" />
              Optimization Tips
            </h3>
            <div className="space-y-6">
              {[
                { n: 1, t: "Be Specific & Detailed", d: "Provide exact answers. Instead of \"We offer refunds\", use \"Full refunds within 30 days.\"" },
                { n: 2, t: "Include Key FAQs", d: "Paste the exact phrasing customers use when asking questions to improve AI match rates." },
                { n: 3, t: "Keep It Updated", d: "Whenever your business logic or pricing changes, update this knowledge base instantly." },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-[10px] bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-900 flex-shrink-0 mt-0.5 group-hover:bg-gray-100 transition-colors shadow-sm">
                    <span className="text-[13px] font-black">{n}</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 tracking-tight">{t}</h4>
                    <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed font-medium">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
