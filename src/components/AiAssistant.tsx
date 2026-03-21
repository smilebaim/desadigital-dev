'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { askAssistant } from '@/lib/genkit-actions';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_REPLIES = [
  "Apa tata ruang desa?",
  "Syarat buat surat keterangan",
  "Kapan jam layanan kantor?",
];

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Saya Asisten Virtual Desa Remau Bako Tuo. Ada yang bisa saya bantu hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent | string) => {
    if (typeof e !== 'string') e?.preventDefault();
    
    const userMessageInput = typeof e === 'string' ? e : input;
    const userMessage = userMessageInput.trim();
    
    if (!userMessage || isLoading) return;

    setInput('');
    const historyToSend = messages.slice(1); // Exclude initial greeting
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await askAssistant(userMessage, historyToSend);
      
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
          className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 h-14 w-14 rounded-full shadow-2xl bg-emerald-600 hover:bg-emerald-700 text-white z-[999] transition-transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[90vw] sm:w-[380px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-[999] border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in-20 duration-300">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Asisten Desa</h3>
                <p className="text-[10px] text-emerald-100">Siap membantu Anda 24/7</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm overflow-hidden ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-br-sm' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <div className="space-y-2 leading-relaxed [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&>h1]:text-lg [&>h1]:font-bold [&>h2]:text-base [&>h2]:font-bold [&>h3]:text-sm [&>h3]:font-bold">
                      <ReactMarkdown>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-500 rounded-2xl p-3 rounded-bl-sm shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 bg-white pt-2 border-t border-gray-50">
              {QUICK_REPLIES.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply)}
                  className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-100 transition-colors text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
            <form 
              onSubmit={handleSend}
              className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-gray-700"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-9 w-9 flex-shrink-0"
              >
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
