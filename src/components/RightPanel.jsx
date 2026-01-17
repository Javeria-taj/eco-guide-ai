// src/components/RightPanel.jsx
import React from 'react';
import { Info, Search, ChevronRight, MapPin } from 'lucide-react';

export default function RightPanel({ activeContext }) {
  return (
    <aside className="w-80 bg-[#f5f8f8] dark:bg-[#0d1e1b] border-l border-slate-200 dark:border-[#2d3a37] hidden xl:flex flex-col transition-colors duration-200">
      <div className="p-6">
        <h3 className="text-sm font-bold mb-6 flex items-center gap-2 text-[#101817] dark:text-white">
          <Info className="w-4 h-4 text-[#00a88c]" />
          Policy Context
        </h3>
        
        <div className="space-y-6">
          {/* Dynamic Context Card */}
          <div className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm transition-all">
            <p className="text-[10px] font-bold text-[#00a88c] uppercase tracking-widest mb-2">
              {activeContext ? activeContext.type : "Current Reference"}
            </p>
            <h4 className="text-xs font-bold mb-2 text-[#101817] dark:text-white">
              {activeContext ? activeContext.title : "BBMP Solid Waste Management Bye-Laws 2025"}
            </h4>
            <div className="bg-[#f5f8f8] dark:bg-white/5 p-3 rounded-lg border-l-2 border-indigo-500">
              <p className="text-[10px] italic text-slate-600 dark:text-slate-400 leading-relaxed">
                "{activeContext ? activeContext.snippet : "Bulk generators failing to segregate e-waste from general refuse shall be liable for Tier 3 penalties..."}"
              </p>
            </div>
          </div>

          {/* Static Links */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Related Sections</p>
            <RightLink icon={<Search />} label="Sec 5.1: Penalties" />
            <RightLink icon={<Search />} label="Sec 2.4: Bin Colors" />
          </div>

          {/* Map Area */}
          <div className="pt-6 border-t border-slate-200 dark:border-white/10">
            <div className="rounded-xl overflow-hidden relative aspect-video shadow-sm group cursor-pointer">
              <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                <MapPin className="text-slate-400 dark:text-slate-500 w-8 h-8" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <p className="text-[10px] text-white font-bold group-hover:underline">Zonal Compliance Heatmap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function RightLink({ icon, label }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-white dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">{React.cloneElement(icon, { size: 14 })}</span>
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
      </div>
      <ChevronRight className="text-slate-300 w-4 h-4 group-hover:text-[#00a88c]" />
    </div>
  );
}