import React from 'react';
import { Search, Filter, FileText, MoreVertical, Download } from 'lucide-react';
import { DOCUMENTS } from '@/data/mockData';

export default function LibraryView() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search regulations..." className="w-full bg-white dark:bg-white/5 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-sm focus:ring-[#00a88c] outline-none text-[#101817] dark:text-white" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-semibold hover:border-[#00a88c] transition-colors text-slate-700 dark:text-slate-200">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {DOCUMENTS.map((doc, i) => (
          <div key={i} className="p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-[#00a88c]/10 rounded-lg text-[#00a88c]"><FileText className="w-6 h-6" /></div>
              <button className="text-slate-400 hover:text-[#00a88c]"><MoreVertical className="w-4 h-4" /></button>
            </div>
            <h3 className="font-bold text-[#101817] dark:text-white text-sm mb-1 line-clamp-2">{doc.title}</h3>
            <p className="text-xs text-slate-500 mb-4">{doc.type} • {doc.size}</p>
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
              <span className="text-[10px] text-slate-400">Updated: {doc.date}</span>
              <button className="text-[#00a88c] hover:bg-[#00a88c]/10 p-1 rounded transition-colors"><Download className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}