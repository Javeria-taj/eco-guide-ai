// src/components/views/ChatView.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, FileText, Shield, CheckCircle, BookOpen, ThumbsUp, ThumbsDown, Copy, Paperclip } from 'lucide-react';

export default function ChatView({ messages, isTyping, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = () => {
    if (inputValue.trim() && !isTyping) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="max-w-3xl mx-auto text-center py-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center p-4 bg-[#00a88c]/10 rounded-full mb-6">
              <Bot className="w-8 h-8 text-[#00a88c]" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#101817] dark:text-white mb-3">How can I assist you today?</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">I am your expert guide for municipal waste policy and urban governance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <SuggestionCard icon={<FileText />} title="E-waste Rules" subtitle="Ask about disposal of tech assets" onClick={() => onSendMessage("How do I dispose of e-waste?")} />
              <SuggestionCard icon={<Shield />} title="2025 Compliance" subtitle="Check updated BBMP guidelines" onClick={() => onSendMessage("What are the 2025 segregation rules?")} />
              <SuggestionCard icon={<CheckCircle />} title="Penalty Schedule" subtitle="View updated fine structures" onClick={() => onSendMessage("What are the fines for not segregating?")} />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-8 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start gap-4'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#00a88c]/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-[#00a88c]" />
                </div>
              )}
              <div className={`max-w-[85%] p-5 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#101817] dark:bg-white/10 text-white rounded-tr-none' : 'bg-white dark:bg-white/5 text-[#101817] dark:text-gray-200 rounded-tl-none border-t border-r border-b border-slate-100 dark:border-white/5 border-l-4 border-l-[#00a88c]'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-[#00a88c] bg-[#00a88c]/10">Policy Answer</span>
                    {msg.source && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-blue-600 bg-blue-100 dark:bg-blue-900/30">Verified</span>}
                  </div>
                )}
                
                {msg.role === 'assistant' && msg.isNew ? <TypingEffect text={msg.content} /> : <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />}
                
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/10 mt-4">
                    {msg.source ? (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded text-[11px] font-bold cursor-pointer hover:bg-indigo-100 transition-colors">
                        <BookOpen className="w-3 h-3" /> Source: {msg.source}
                      </div>
                    ) : <span className="text-[10px] text-slate-400">System generated</span>}
                    <div className="ml-auto flex gap-2">
                       <ActionBtn icon={<ThumbsUp className="w-4 h-4" />} />
                       <ActionBtn icon={<ThumbsDown className="w-4 h-4" />} />
                       <ActionBtn icon={<Copy className="w-4 h-4" />} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-start gap-4">
               <div className="w-8 h-8 rounded-lg bg-[#00a88c]/10 flex items-center justify-center shrink-0 mt-1"><Bot className="w-5 h-5 text-[#00a88c]" /></div>
               <div className="bg-white dark:bg-white/5 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5">
                  <div className="flex gap-1">
                     <div className="w-2 h-2 bg-[#00a88c] rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-[#00a88c] rounded-full animate-bounce delay-100"></div>
                     <div className="w-2 h-2 bg-[#00a88c] rounded-full animate-bounce delay-200"></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-[#0f2320] border-t border-slate-200 dark:border-white/5 sticky bottom-0 z-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-end gap-3 bg-[#f5f8f8] dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-3 focus-within:ring-2 focus-within:ring-[#00a88c]/20 transition-all">
            <button className="p-2 text-slate-400 hover:text-[#00a88c] transition-colors"><Paperclip className="w-5 h-5" /></button>
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 resize-none placeholder:text-slate-400 text-[#101817] dark:text-white outline-none" 
              placeholder="Ask about waste policies, penalty schedules, or compliance..." 
              rows="1" 
              style={{ minHeight: '24px', maxHeight: '120px' }}
            />
            <button 
              onClick={handleSubmit}
              disabled={!inputValue.trim() || isTyping}
              className={`p-2.5 rounded-xl transition-all shadow-md active:scale-95 text-white ${inputValue.trim() ? 'bg-[#00a88c] hover:bg-[#008f75]' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'}`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-3 flex justify-center gap-6">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-green-500"></span> AI Agent Online</div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium uppercase tracking-wider"><Shield className="w-3 h-3" /> Enterprise Secure</div>
          </div>
        </div>
      </div>
    </>
  );
}

function TypingEffect({ text }) {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 10);
    return () => clearInterval(intervalId);
  }, [text]);
  return <div className="whitespace-pre-wrap">{displayedText}</div>;
}

const SuggestionCard = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#00a88c]/30 hover:bg-[#00a88c]/5 transition-all group text-left bg-white dark:bg-white/5">
    <div className="text-[#00a88c] mb-2 group-hover:scale-110 transition-transform">{React.cloneElement(icon, { size: 24 })}</div>
    <p className="text-sm font-bold mb-1 text-[#101817] dark:text-white">{title}</p>
    <p className="text-xs text-slate-500">{subtitle}</p>
  </button>
);

const ActionBtn = ({ icon }) => (
  <button className="text-slate-400 hover:text-[#00a88c] transition-colors p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5">{icon}</button>
);