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
  Loader2
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
    <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-4 lg:gap-6 font-sans">
      {/* Left Column - Main Settings */}
      <div className="flex-1 space-y-3">
        <div className="bg-white border border-gray-200/60 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Header */}
          <div className="p-3 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Bot size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Chatbot Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your AI chatbot knowledge and business details</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-fit border border-indigo-100">
              <Info size={16} />
              How it works?
            </button>
          </div>

          <div className="p-6 md:p-8">
            {/* Business Details Section */}
            <div className="mb-10">
              <h3 className="text-[17px] font-bold text-gray-900">Business Details</h3>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Your business information helps the chatbot represent you better.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2.5">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-4" />

            {/* Knowledge Base Section */}
            <div>
              <h3 className="text-[17px] font-bold text-gray-900">Knowledge Base</h3>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Add information about your business, policies, FAQs and more.
              </p>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2.5">
                  What your chatbot knows
                  <Info size={14} className="text-gray-400 cursor-help" />
                </label>
                <div className="relative">
                  <textarea
                    rows={12}
                    value={knowledge}
                    onChange={(e) => setKnowledge(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all resize-y shadow-sm leading-relaxed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  Add as much detail as possible for better AI responses.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-5">
              <button
                onClick={handleSave}
                disabled={isSaving || isLoading}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:hover:bg-indigo-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5 disabled:hover:-translate-y-0">
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} strokeWidth={2.5} />}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></div>
                {isSaving ? 'Saving changes...' : 'All changes saved'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Preview & Tips */}
      <div className="w-full xl:w-[345px] flex-shrink-0 space-y-3 xl:sticky xl:top-0 h-fit self-start">
        {/* Chatbot Preview Card */}
        <div className="bg-white border border-gray-200/60 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 md:p-6">
          <h3 className="text-[15px] font-bold text-gray-900">Chatbot Preview</h3>
          <p className="text-sm text-gray-500 mt-1 mb-5">See how your chatbot will respond</p>

          <div className="mb-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex flex-shrink-0 items-center justify-center text-indigo-600">
                <Bot size={16} />
              </div>
              <div className="flex flex-col">
                <div className="bg-gray-50 text-gray-800 text-[13px] px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100">
                  <p className="font-medium mb-0.5">Hi! I'm SupportPilot.</p>
                  <p>How can I help you today?</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 ml-1">Just now</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 text-indigo-600 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-xl py-2.5 text-sm font-semibold transition-colors">
            Test Your Bot
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Tips Card */}
        <div className="bg-white border border-gray-200/60 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 md:p-6">
          <h3 className="text-[15px] font-bold text-gray-900 mb-5">Tips for better responses</h3>

          <div className="space-y-5">
            <div className="flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Be specific</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Add detailed information about your business and policies.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                <RefreshCw size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Keep it updated</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Regularly update your knowledge base for accurate answers.
                </p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                <MessageSquareQuote size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Use examples</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Add common questions and their answers.
                </p>
              </div>
            </div>

            <div className="flex gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 mt-0.5">
                <Target size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Set behavior</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Define how your chatbot should respond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
