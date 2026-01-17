// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { 
  Leaf, 
  LayoutDashboard, 
  BookOpen, 
  BarChart2, 
  Settings, 
  ScanEye, 
  Plus, 
  Trash2, 
  MessageSquare,
  Pencil,
  Search
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  // Chat Session Props
  chats = [], 
  activeChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onRenameChat
}) {
  // State for renaming chats
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  
  // State for search filter
  const [search, setSearch] = useState("");

  return (
    <aside className="w-72 bg-white dark:bg-[#142d29] border-r border-slate-200 dark:border-[#2d3a37] flex flex-col hidden md:flex flex-shrink-0 transition-colors duration-200">
      <div className="p-6 flex flex-col h-full overflow-hidden">
        
        {/* --- BRAND --- */}
        <div className="flex items-center gap-3 mb-6 flex-shrink-0">
          <div className="w-10 h-10 bg-[#00a88c] rounded-lg flex items-center justify-center text-white shadow-sm">
            <Leaf className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#101817] dark:text-white text-lg font-bold">Eco-Guide</h1>
            <p className="text-[#00a88c] text-[10px] font-bold uppercase">Municipal AI</p>
          </div>
        </div>

        {/* --- MAIN NAVIGATION --- */}
        <nav className="flex flex-col gap-1 mb-6 flex-shrink-0">
           <NavItem 
            icon={<ScanEye />} label="Visual Scan" 
            isActive={currentView === 'scan'} 
            onClick={() => setCurrentView('scan')} 
          />
          <NavItem 
            icon={<LayoutDashboard />} label="Chat Assistant" 
            isActive={currentView === 'chat'} 
            onClick={() => setCurrentView('chat')} 
          />
          <NavItem 
            icon={<BookOpen />} label="Policy Guidelines" 
            isActive={currentView === 'library'} 
            onClick={() => setCurrentView('library')} 
          />
          <NavItem 
            icon={<BarChart2 />} label="Analytics" 
            isActive={currentView === 'analytics'} 
            onClick={() => setCurrentView('analytics')} 
          />
        </nav>

        {/* --- ACTION: NEW CHAT --- */}
        <div className="mb-4 flex-shrink-0">
             <button 
                onClick={() => {
                    if (onNewChat) onNewChat();
                    setCurrentView('chat');
                }}
                className="w-full bg-[#00a88c]/10 hover:bg-[#00a88c]/20 text-[#00a88c] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                <Plus className="w-4 h-4" />
                <span className="text-xs">New Chat Session</span>
            </button>
        </div>

        {/* --- CHAT HISTORY LIST --- */}
        {chats && chats.length > 0 && (
            <div className="flex-1 overflow-y-auto mb-4 -mx-2 px-2 min-h-0">
                <div className="flex items-center justify-between mb-3 px-2">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">History</h3>
                </div>

                {/* Search Input */}
                <div className="px-2 mb-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2 w-3 h-3 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search chats..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-white/5 pl-7 pr-2 py-1.5 rounded-lg text-xs outline-none border border-transparent focus:border-[#00a88c]/30 transition-all text-slate-600 dark:text-slate-300 placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    {chats
                        .filter((c) => 
                            c.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((chat) => (
                        <div 
                            key={chat.id}
                            className={`
                                group flex items-center justify-between p-2.5 rounded-lg cursor-pointer text-xs font-medium transition-all
                                ${chat.id === activeChatId 
                                    ? "bg-[#00a88c] text-white shadow-md shadow-[#00a88c]/20" 
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"}
                            `}
                            onClick={() => {
                                setCurrentView("chat");
                                if (onSelectChat) onSelectChat(chat.id);
                            }}
                        >
                            <div className="flex items-center gap-2 truncate flex-1">
                                <MessageSquare size={14} className={chat.id === activeChatId ? "text-white" : "text-slate-400"} />
                                
                                {editingId === chat.id ? (
                                    <input
                                        autoFocus
                                        value={tempTitle}
                                        onChange={(e) => setTempTitle(e.target.value)}
                                        onBlur={() => {
                                            if (onRenameChat) onRenameChat(chat.id, tempTitle);
                                            setEditingId(null);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                if (onRenameChat) onRenameChat(chat.id, tempTitle);
                                                setEditingId(null);
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-transparent border-b border-white/50 outline-none w-full text-xs text-inherit"
                                    />
                                ) : (
                                    <span className="truncate">{chat.title || "New Chat"}</span>
                                )}
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingId(chat.id);
                                        setTempTitle(chat.title);
                                    }}
                                    className={`p-1 rounded-md transition-colors ${chat.id === activeChatId ? "hover:bg-white/20 text-white" : "text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"}`}
                                >
                                    <Pencil size={12} />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDeleteChat) onDeleteChat(chat.id);
                                    }}
                                    className={`p-1 rounded-md transition-colors ${chat.id === activeChatId ? "hover:bg-white/20 text-white" : "text-slate-400 hover:bg-red-100 hover:text-red-500"}`}
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- BOTTOM: RECENT SCANS & SETTINGS --- */}
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex-shrink-0">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Recent Scans</h3>
          <div className="flex flex-col gap-3">
             <RecentScanItem title="PET Plastic Bottle" time="2h ago" />
             <RecentScanItem title="Aluminum Can" time="Yesterday" />
             <NavItem 
                icon={<Settings />} label="Settings" 
                isActive={currentView === 'settings'} 
                onClick={() => setCurrentView('settings')} 
            />
          </div>
        </div>

      </div>
    </aside>
  );
}

// --- HELPER COMPONENTS ---

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors w-full text-left
      ${isActive ? 'bg-[#00a88c] text-white shadow-md shadow-[#00a88c]/20' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'}`}
    >
      {React.cloneElement(icon, { size: 18 })}
      <span className="text-sm">{label}</span>
    </button>
  );
}

function RecentScanItem({ title, time }) {
    return (
        <div className="flex items-center gap-3 px-2 group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-400">
                {/* Placeholder for image thumbnail */}
                <div className="w-4 h-4 bg-slate-400/30 rounded-full"></div>
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-[#101817] dark:text-white truncate group-hover:text-[#00a88c] transition-colors">{title}</span>
                <span className="text-[10px] text-slate-400">{time}</span>
            </div>
        </div>
    )
}