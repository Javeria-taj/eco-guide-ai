"use client";
import React from "react";
import {
  Sun,
  Moon,
  Trash2,
  Database,
  ShieldCheck,
  Bot,
} from "lucide-react";

export default function SettingsView({
  darkMode,
  setDarkMode,
  onClearChats,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-10">
      <h1 className="text-3xl font-black text-[#101817] dark:text-white">
        Settings
      </h1>

      {/* Appearance */}
      <Section title="Appearance" icon={<Sun />}>
        <SettingRow
          title="Theme"
          description="Switch between light and dark mode"
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00a88c]/10 text-[#00a88c] font-bold text-sm"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </SettingRow>
      </Section>

      {/* Chat */}
      <Section title="Chats" icon={<Trash2 />}>
        <SettingRow
          title="Clear all chats"
          description="Delete all chat history from this device"
        >
          <button
            onClick={onClearChats}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 font-bold text-sm hover:bg-red-200"
          >
            <Trash2 size={16} />
            Clear Chats
          </button>
        </SettingRow>
      </Section>

      {/* Storage */}
      <Section title="Storage" icon={<Database />}>
        <SettingRow
          title="Local Storage"
          description="Chats are currently stored locally in your browser"
        >
          <StatusBadge label="Active" />
        </SettingRow>

        <SettingRow
          title="Cloud Sync"
          description="Firebase / Supabase integration"
        >
          <StatusBadge label="Coming Soon" />
        </SettingRow>
      </Section>

      {/* AI */}
      <Section title="AI Engine" icon={<Bot />}>
        <SettingRow
          title="Local Knowledge Engine"
          description="Rule-based + intent-aware system"
        >
          <StatusBadge label="Enabled" />
        </SettingRow>

        <SettingRow
          title="LLM Integration"
          description="OpenAI / Gemini fallback"
        >
          <StatusBadge label="Ready" />
        </SettingRow>
      </Section>

      {/* Security */}
      <Section title="Security" icon={<ShieldCheck />}>
        <SettingRow
          title="Data Privacy"
          description="No personal data is shared externally"
        >
          <StatusBadge label="Secure" />
        </SettingRow>
      </Section>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Section({ title, icon, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#00a88c] font-bold uppercase text-xs tracking-widest">
        {icon}
        {title}
      </div>
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}

function SettingRow({ title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p className="font-bold text-sm text-[#101817] dark:text-white">
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

function StatusBadge({ label }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
      {label}
    </span>
  );
}
