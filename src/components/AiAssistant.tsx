'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { askAssistant } from '@/lib/genkit-actions';
import { getSiteSettings } from '@/lib/site-settings-actions';
import ReactMarkdown from 'react-markdown';
import { useTenant } from '@/contexts/TenantContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiAssistant = () => {
  const { tenantId } = useTenant();
  const [isOpen, setIsOpen] = useState(false);
  const [siteName, setSiteName] = useState('Desa');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts
  const [quickReplies, setQuickReplies] = useState([
    "Apa layanan surat mandiri?",
    "Berapa anggaran desa?",
    "Berita terbaru desa",
    "Lokasi kantor desa",
  ]);

  useEffect(() => {
    const init = async () => {
      const settings = await getSiteSettings(tenantId || undefined);
      if (settings?.siteName) {
        setSiteName(settings.siteName);
        setMessages([
          { role: 'assistant', content: `Halo! Saya Asisten Virtual **${settings.siteName}**. Ada yang bisa saya bantu hari ini?` }
        ]);
      } else {
        setMessages([
          { role: 'assistant', content: 'Halo! Saya Asisten Virtual Desa. Ada yang bisa saya bantu hari ini?' }
        ]);
      }
    };
    init();
  }, [tenantId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent | string) => {
    if (typeof e !== 'string') e?.preventDefault();
    
    const userMessageInput = typeof e === 'string' ? e : input;
    const userMessage = userMessageInput.trim();
    
    if (!userMessage || isLoading) return;

    setInput('');
    const historyToSend = messages.slice(1);
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await askAssistant(userMessage, historyToSend, tenantId || undefined);
      
      if (result.success && result.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: result.text! }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: result.error || 'Maaf, terjadi kesalahan teknis saat menghubungi sistem desa.' 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Terjadi kegagalan jaringan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 h-14 w-14 rounded-full shadow-2xl bg-emerald-600 hover:bg-emerald-700 text-white z-[999] transition-all hover:scale-110 active:scale-95 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-transparent animate-pulse" />
          <MessageCircle className="h-6 w-6 relative z-10" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[400px] h-[600px] max-h-[75vh] bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col z-[999] border border-white/40 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 fade-in duration-300 ease-out">
          
          {/* Header (Glassy) */}
          <div className="bg-emerald-600/90 text-white p-5 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                    Asisten {siteName}
                    <Sparkles className="h-3 w-3 text-emerald-200" />
                </h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    <p className="text-[10px] text-emerald-100 font-medium">Online & Siap Membantu</p>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:bg-white/20 hover:text-white rounded-xl h-9 w-9 border border-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-gray-50/50 to-white/30 scrollbar-thin scrollbar-thumb-gray-200">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
              >
                <div 
                  className={`max-w-[88%] rounded-2xl p-4 text-[13px] shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium' 
                      : 'bg-white/90 border border-emerald-100/50 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="prose prose-sm prose-emerald max-w-none 
                        [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:my-2 
                        [&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:my-2 
                        [&>p]:my-2 [&>strong]:text-emerald-800 
                        [&>h3]:text-sm [&>h3]:font-bold [&>h3]:mt-3 [&>h3]:mb-1
                        [&>table]:w-full [&>table]:my-2 [&>table]:border-collapse [&>table]:text-[12px]
                        [&>table_th]:border [&>table_th]:p-1.5 [&>table_th]:bg-emerald-50
                        [&>table_td]:border [&>table_td]:p-1.5">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white/80 backdrop-blur-sm border border-emerald-50/50 text-gray-500 rounded-2xl px-4 py-3 rounded-bl-none shadow-sm flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Area (Glassy) */}
          <div className="p-4 bg-white/60 backdrop-blur-xl border-t border-white/40">
            {/* Quick Replies - Only show at start or after assistant reply */}
            {!isLoading && messages.length < 5 && (
              <div className="mb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    className="text-[11px] bg-white border border-emerald-100 text-emerald-700 rounded-xl px-3.5 py-2 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5"
                  >
                    <HelpCircle className="h-3 w-3 opacity-60" />
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form 
              onSubmit={handleSend}
              className="relative flex items-center gap-2 group"
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-white/80 border border-emerald-100/50 rounded-2xl py-3.5 pl-5 pr-12 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <Button 
                    type="submit" 
                    size="icon"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 top-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 h-9 w-9 flex-shrink-0 transition-transform active:scale-90 shadow-lg shadow-emerald-200"
                >
                    <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </div>
            </form>
            <p className="mt-3 text-[9px] text-center text-gray-400 font-medium tracking-wide">
                Teknologi AI Genkit • Desa Digital Indonesia
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
