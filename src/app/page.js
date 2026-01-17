"use client";
import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  MessageSquare,
  BookOpen,
  BarChart2,
  Share2,
  MoreVertical,
  ScanEye,
  LogOut, 
  LogIn
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc 
} from "firebase/firestore";
import { useRouter } from "next/navigation"; 
import { auth, provider, db } from "@/lib/firebase"; 
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// ------------------------

import Sidebar from "@/components/Sidebar";
import RightPanel from "@/components/RightPanel";
import ChatView from "@/components/views/ChatView";
import LibraryView from "@/components/views/LibraryView";
import AnalyticsView from "@/components/views/AnalyticsView";
import VisualScanView from "@/components/views/VisualScanView";
import SettingsView from "@/components/views/SettingsView";

import { KNOWLEDGE_BASE } from "@/data/mockData";


/* ---------------- HELPERS & CONFIG ---------------- */

const friendlyIntro = [
  "This is important to know 👌",
  "Here’s the correct information 👇",
  "Good question 👍",
];

const detectAnswerMode = (query) => {
  const q = query.toLowerCase();
  if (q.includes("example")) return "EXAMPLES";
  if (q.includes("which bin") || q.includes("bin")) return "BIN";
  if (q.includes("penalty") || q.includes("fine")) return "PENALTY";
  if (q.includes("how")) return "HOW";
  return "DEFINITION";
};

// --- LLM API CALL ---
const callLLM = async (query) => {
  try {
    const res = await fetch("/api/llm", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (error) {
    console.error("LLM Call Error:", error);
    return null;
  }
};

/* ---------------- FALLBACK RESPONSES ---------------- */

const GREETING_RESPONSE = {
  text: `Hello! 👋  
I’m **Eco-Guide**, your municipal waste assistant.

Ask me things like:
• Examples of e-waste  
• Which bin paper goes into  
• Penalties for not segregating  
• Safe disposal rules`,
  source: null,
  context: null,
};

const SMART_FALLBACK = {
  text: `I want to be accurate 👍  

Could you clarify:
• What is the **item/material**?
• Is it **clean or contaminated**?

⚠️ Never mix batteries, electronics, or medical waste with regular bins.`,
  source: null,
  context: null,
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function EcoDashboard() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState("chat");
  
  // ✅ AUTH STATE
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Data State
  const [chats, setChats] = useState([]);
  const [scanHistory, setScanHistory] = useState([]); 
  
  // UI State
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [activeContext, setActiveContext] = useState(null);

  // Derived State
  const activeChat = chats.find((c) => c.id === activeChatId);

  /* ---------- 1. DEFINITIONS (HOISTED ABOVE EFFECTS) ---------- */
  // Moved these UP so they are defined before useEffect calls them

  // 🔹 SAVE CHATS TO CLOUD
  const saveChatsToCloud = async (updatedChats) => {
    if (!user) return;
    for (const chat of updatedChats) {
      await setDoc(
        doc(db, "users", user.uid, "chats", chat.id),
        chat
      );
    }
  };

  // 🔹 SAVE SCAN TO CLOUD
  const saveScanToCloud = async (scan) => {
    if (!user) return;
    try {
        await setDoc(
            doc(db, "users", user.uid, "scans", scan.timestamp.toString()),
            scan
        );
    } catch (e) {
        console.error("Error saving scan:", e);
    }
  };

  // 🔹 CREATE NEW CHAT
  const createNewChat = async (shouldSave = true) => {
    const newChat = {
      id: `chat_${Date.now()}`,
      title: "New Chat",
      messages: [],
    };
    
    setChats(prev => {
        const updated = [newChat, ...prev];
        if (shouldSave) saveChatsToCloud(updated);
        return updated;
    });
    
    setActiveChatId(newChat.id);
    setActiveContext(null);
  };

  /* ---------- 2. AUTH & REDIRECT EFFECTS ---------- */

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false); // ✅ auth check complete
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  /* ---------- 3. DATA LOADING EFFECTS ---------- */

  // 🔹 LOAD CHATS ON LOGIN
  const loadChatsFromCloud = async () => {
    if (!user) return;
    try {
      const snap = await getDocs(collection(db, "users", user.uid, "chats"));
      const cloudChats = snap.docs.map((d) => d.data());
      
      // Sort chats by ID (timestamp) desc so newest is top
      cloudChats.sort((a, b) => b.id.localeCompare(a.id)); 

      if (cloudChats.length > 0) {
        setChats(cloudChats);
        setActiveChatId(cloudChats[0].id);
      }
    } catch (e) {
      console.error("Error loading chats:", e);
    }
  };

  useEffect(() => {
    if (user) {
        loadChatsFromCloud();
    }
  }, [user]);

  /* ---------- 4. INITIALIZATION (Local Fallback) ---------- */

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Load from LocalStorage only if NO user is logged in
  // (Note: This might not run often due to the redirect, but kept as requested)
  useEffect(() => {
    if (!user) {
        const stored = JSON.parse(localStorage.getItem("eco_chats")) || [];
        setChats(stored);
        const storedScans = JSON.parse(localStorage.getItem("eco_scans")) || [];
        setScanHistory(storedScans);

        if (stored.length) {
            setActiveChatId(stored[0].id);
        } else {
            // ✅ NOW SAFE: createNewChat is defined above
            createNewChat(false); 
        }
    }
  }, [user]); 

  // Keep LocalStorage synced for guests
  useEffect(() => {
    if (!user && chats.length > 0) {
      localStorage.setItem("eco_chats", JSON.stringify(chats));
    }
  }, [chats, user]);

  useEffect(() => {
    if (!user) {
        localStorage.setItem("eco_scans", JSON.stringify(scanHistory));
    }
  }, [scanHistory, user]);

  /* ---------- ACTIONS ---------- */

  const login = async () => {
    try { await signInWithPopup(auth, provider); } catch (e) { console.error(e); }
  };

  const logout = async () => {
    try { 
        await signOut(auth); 
        setChats([]); 
        setActiveChatId(null);
    } catch (e) { console.error(e); }
  };

  const deleteChat = async (chatId) => {
    const updated = chats.filter((c) => c.id !== chatId);
    setChats(updated);

    if (chatId === activeChatId) {
      if (updated.length > 0) {
        setActiveChatId(updated[0].id);
      } else {
        createNewChat();
      }
    }

    if (user) {
        try {
            await deleteDoc(doc(db, "users", user.uid, "chats", chatId));
        } catch (e) {
            console.error("Error deleting cloud chat:", e);
        }
    }
  };

  const renameChat = (chatId, newTitle) => {
    setChats((prev) => {
      const updatedChats = prev.map((c) => {
        if (c.id === chatId) {
          return { ...c, title: newTitle || c.title };
        }
        return c;
      });
      saveChatsToCloud(updatedChats); 
      return updatedChats;
    });
  };

  const clearAllChats = async () => {
    if (confirm("Are you sure you want to delete all chat history?")) {
      setChats([]);
      setActiveChatId(null);
      setActiveContext(null);
      localStorage.removeItem("eco_chats");
      
      createNewChat();
    }
  };

  /* ---------- SMART MATCHER (LOCAL) ---------- */

  const findBestAnswer = (query) => {
    const tokens = query.toLowerCase().split(/[\s,.?!]+/);
    const mode = detectAnswerMode(query);

    let best = null;
    let maxScore = 0;

    KNOWLEDGE_BASE.forEach((item) => {
      let score = 0;
      item.keywords.forEach((k) => {
        tokens.forEach((t) => {
          if (t === k) score += 10;
          else if (t.includes(k) || k.includes(t)) score += 4;
        });
      });
      if (score > maxScore) {
        maxScore = score;
        best = item;
      }
    });

    if (!best || maxScore < 4) return null;

    let answer = "";

    if (mode === "EXAMPLES" && best.examples) {
      answer = `**Examples of ${best.category}:**\n• ${best.examples.join("\n• ")}`;
    } 
    else if (mode === "BIN" && best.bin) {
      answer = `🗑️ **Correct bin:** ${best.bin}\n\n${best.answer}`;
    } 
    else if (mode === "PENALTY" && best.penalty) {
      answer = `⚠️ **Penalty:** ${best.penalty}`;
    } 
    else if (mode === "HOW" && best.steps) {
      answer = `🪜 **How to dispose safely:**\n• ${best.steps.join("\n• ")}`;
    } 
    else {
      answer = `**${best.answer}**`;
    }

    answer = friendlyIntro[Math.floor(Math.random() * friendlyIntro.length)] + "\n\n" + answer;

    return {
      text: answer,
      source: best.source,
      context: best.explanation || best.contextSnippet || null,
    };
  };

  /* ---------- MESSAGE HANDLER (HYBRID AI) ---------- */

  const handleSendMessage = async (text) => {
    if (!text.trim() || !activeChat) return;

    const userMsg = { id: Date.now(), role: "user", content: text };

    let updatedChats = chats.map((chat) =>
        chat.id === activeChatId
        ? {
            ...chat,
            title: chat.messages.length === 0 ? text.slice(0, 30) : chat.title,
            messages: [...chat.messages, userMsg],
            }
        : chat
    );

    setChats(updatedChats);
    setIsTyping(true);
    setActiveContext(null);

    saveChatsToCloud(updatedChats);

    let response = SMART_FALLBACK;
    const lower = text.toLowerCase();

    if (/^(hi|hello|hey)/.test(lower)) {
        await new Promise(r => setTimeout(r, 600));
        response = GREETING_RESPONSE;
    } else {
        const match = findBestAnswer(text);
        if (match) {
            await new Promise(r => setTimeout(r, 600));
            response = match;
        } else {
            const llmResponse = await callLLM(text);
            if (llmResponse) response = llmResponse;
        }
    }

    const aiMsg = {
      id: Date.now() + 1,
      role: "assistant",
      content: response.text,
      source: response.source,
      isNew: true,
    };

    setChats(prev => {
        const finalChats = prev.map((chat) =>
            chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, aiMsg] }
            : chat
        );
        saveChatsToCloud(finalChats);
        return finalChats;
    });

    setIsTyping(false);

    if (response.source) {
      setActiveContext({
        title: response.source,
        snippet: response.context,
        type: "Policy Context",
      });
    }
  };

  /* ---------- UI RENDER ---------- */

  // ✅ BLOCK RENDER WHILE AUTH IS LOADING (SINGLE CHECK)
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f5f8f8] dark:bg-[#0f2320]">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Checking authentication…
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#f5f8f8] dark:bg-[#0f2320]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        chats={chats}
        onRenameChat={renameChat}
        activeChatId={activeChatId}
        onNewChat={createNewChat} 
        onSelectChat={setActiveChatId}
        onDeleteChat={deleteChat}
        onNewSession={createNewChat} 
      />

      <main className="flex-1 flex flex-col relative">
        <Header 
            currentView={currentView} 
            user={user} 
            onLogin={login} 
            onLogout={logout} 
        />

        {currentView === "chat" && activeChat && (
          <ChatView
            messages={activeChat.messages}
            isTyping={isTyping}
            onSendMessage={handleSendMessage}
          />
        )}

        {currentView === "scan" && (
          <VisualScanView
            onScanComplete={(scanResult) => {
              const newScan = { ...scanResult, timestamp: Date.now() };
              
              setScanHistory((prev) => [newScan, ...prev]);
              saveScanToCloud(newScan); 

              const explanationMessage = {
                id: Date.now(),
                role: "assistant",
                content: `🧠 **Scan Result Analysis**

I analyzed the image you uploaded. Here is what I found:

• **Item:** ${scanResult.item || "Unknown"}  
• **Category:** ${scanResult.category || "General Waste"}  
• **Recommended Bin:** ${scanResult.bin || "Review Guidelines"}  

⚠️ **Safety Note:** ${scanResult.warning || "Ensure item is clean before disposal."}

You can ask me follow-up questions about this item below.`,
                source: "Visual Analysis Engine",
              };

              const updatedChat = {
                 ...activeChat,
                 messages: [...activeChat.messages, explanationMessage]
              };

              setChats((prev) => {
                const newChats = prev.map((chat) => (chat.id === activeChatId ? updatedChat : chat));
                saveChatsToCloud(newChats); 
                return newChats;
              });

              setCurrentView("chat");
            }}
          />
        )}

        {currentView === "library" && <LibraryView />}
        
        {currentView === "analytics" && <AnalyticsView scanHistory={scanHistory} />}

        {currentView === "settings" && (
          <SettingsView
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onClearChats={clearAllChats}
          />
        )}
      </main>

      {currentView === "chat" && <RightPanel activeContext={activeContext} />}

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-all z-50 text-slate-600 dark:text-yellow-400"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
}

/* ---------------- HEADER COMPONENT ---------------- */

function Header({ currentView, user, onLogin, onLogout }) {
  return (
    <header className="h-16 px-8 flex items-center border-b bg-white/80 dark:bg-[#0f2320]/90 backdrop-blur-md z-10 sticky top-0 justify-between">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300">
        {currentView === "chat" && <MessageSquare className="w-5 h-5" />}
        {currentView === "library" && <BookOpen className="w-5 h-5" />}
        {currentView === "analytics" && <BarChart2 className="w-5 h-5" />}
        {currentView === "scan" && <ScanEye className="w-5 h-5" />}
        <h2 className="text-sm font-bold text-[#101817] dark:text-white">
          Eco-Guide Assistant
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Auth Button */}
        {!user ? (
            <button 
                onClick={onLogin} 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00a88c] text-white text-xs font-bold hover:bg-[#008f75] transition-colors shadow-sm"
            >
                <LogIn className="w-3 h-3" /> Sign In
            </button>
        ) : (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-white/10">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-7 h-7 rounded-full border border-slate-200" />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                            {user.displayName ? user.displayName[0] : "U"}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#101817] dark:text-white leading-none">
                            {user.displayName?.split(" ")[0]}
                        </span>
                        <span className="text-[10px] text-slate-400">User</span>
                    </div>
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                    <LogOut className="w-4 h-4" />
                </button>
            </div>
        )}

        <div className="h-4 w-px bg-slate-200 dark:bg-white/10"></div>
        <button className="text-slate-400 hover:text-[#00a88c] transition-colors"><Share2 className="w-5 h-5" /></button>
        <button className="text-slate-400 hover:text-[#00a88c] transition-colors"><MoreVertical className="w-5 h-5" /></button>
      </div>
    </header>
  );
}