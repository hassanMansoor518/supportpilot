"use client";

import React, { useState } from "react";
import {
  Code,
  Copy,
  ClipboardList,
  RefreshCcw,
  ChevronRight,
  Eye,
  Lock,
  RotateCw,
  X,
  MessageSquare,
} from "lucide-react";

export default function IntegrationsContent({ ownerId }: { ownerId: string }) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script
  src="http://localhost:3000/chatBot.js"
  data-owner-id="${ownerId}">
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Embed ChatBot</h1>
        <p className="text-gray-500 text-[15px]">
          Add the chat widget to your website in just a few steps.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step 1: Embed Code */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Code size={18} />
              </div>
              <h2 className="text-[17px] font-semibold text-gray-900">
                Your Embed Code
              </h2>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Copy size={16} className={copied ? "text-green-500" : "text-gray-500"} />
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Copy and paste this code before <code className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-xs">&lt;/body&gt;</code>
          </p>
          <div className="bg-[#1a1f2e] rounded-xl p-5 overflow-x-auto">
            <pre className="text-[13px] leading-loose font-mono text-gray-300">
              <div className="flex gap-4">
                <div className="text-gray-500 select-none text-right">
                  1<br />2<br />3<br />4
                </div>
                <div>
                  <span className="text-pink-400">&lt;script</span>
                  <br />
                  <span className="text-blue-300 ml-4">src</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">"http://localhost:3000/chatBot.js"</span>
                  <br />
                  <span className="text-blue-300 ml-4">data-owner-id</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">"{ownerId}"</span>
                  <span className="text-pink-400">&gt;</span>
                  <br />
                  <span className="text-pink-400">&lt;/script&gt;</span>
                </div>
              </div>
            </pre>
          </div>
        </div>

        {/* Instructions Stepper */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <ClipboardList size={20} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900">1. Copy the embed script</div>
              <div className="text-[12px] text-gray-500">Click the copy button above</div>
            </div>
          </div>
          
          <ChevronRight size={20} className="text-gray-300 shrink-0" />
          
          <div className="flex items-center gap-4 flex-1 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Code size={20} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900">2. Paste it before the closing body tag</div>
              <div className="text-[12px] text-gray-500">Add it to your website HTML</div>
            </div>
          </div>

          <ChevronRight size={20} className="text-gray-300 shrink-0" />

          <div className="flex items-center gap-4 flex-1 p-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <RefreshCcw size={20} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900">3. Reload your website</div>
              <div className="text-[12px] text-gray-500">See the chatbot in action</div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Eye size={18} />
            </div>
            <h2 className="text-[17px] font-semibold text-gray-900">Live Preview</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            This is how the chatbot will appear on your website.
          </p>

          {/* Browser Mockup */}
          <div className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden relative shadow-sm">
            {/* Browser Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-gray-100 rounded-md py-1 px-32 flex items-center gap-2 text-sm text-gray-500">
                  <Lock size={12} />
                  <span>Your-website.com</span>
                </div>
              </div>
              <RotateCw size={16} className="text-gray-400" />
            </div>

            {/* Browser Content */}
            <div className="bg-white p-8 h-[400px] relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your website goes here</h3>
              
              {/* Skeleton content */}
              <div className="space-y-4 max-w-lg">
                <div className="h-4 bg-gray-100 rounded-full w-full"></div>
                <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded-full w-4/6"></div>
                
                <div className="h-10 bg-gray-100 rounded-lg w-32 mt-8"></div>
              </div>

              {/* Chatbot Widget Mockup */}
              <div className="absolute bottom-6 right-6 flex flex-col items-end gap-4 shadow-2xl rounded-2xl">
                {/* Chat Window */}
                <div className="w-[320px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
                  <div className="bg-[#1a1f2e] px-4 py-3 flex items-center justify-between">
                    <span className="text-white font-medium text-sm">Customer Support</span>
                    <X size={16} className="text-gray-400 cursor-pointer hover:text-white" />
                  </div>
                  <div className="p-4 bg-gray-50/50 space-y-4">
                    {/* Bot Message */}
                    <div className="flex items-start">
                      <div className="bg-gray-100 text-gray-700 px-4 py-2.5 rounded-2xl rounded-tl-none text-[13px]">
                        Hi! How can I help you?
                      </div>
                    </div>
                    {/* User Message */}
                    <div className="flex items-start justify-end">
                      <div className="bg-[#1a1f2e] text-white px-4 py-2.5 rounded-2xl rounded-tr-none text-[13px]">
                        What is the return policy?
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Action Button */}
                <div className="w-14 h-14 bg-[#1a1f2e] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
                  <MessageSquare size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
