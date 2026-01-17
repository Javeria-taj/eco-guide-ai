"use client";
import { BarChart2 } from "lucide-react";

export default function AnalyticsView({ scanHistory = [] }) {
  const total = scanHistory.length;

  const counts = scanHistory.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h2 className="text-3xl font-black mb-6 flex items-center gap-2 dark:text-white">
        <BarChart2 /> Scan Analytics
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Scans" value={total} />
        <StatCard title="Most Common Waste" value={getTopCategory(counts)} />
        <StatCard title="Hazardous Items" value={counts["Hazardous Waste"] || 0} />
      </div>

      {/* Breakdown */}
      <div className="bg-white dark:bg-white/5 border rounded-2xl p-6">
        <h3 className="font-bold mb-4 dark:text-white">Waste Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(counts).map(([category, count]) => (
            <div key={category} className="flex justify-between text-sm">
              <span className="text-slate-500">{category}</span>
              <span className="font-bold dark:text-white">{count}</span>
            </div>
          ))}
          {total === 0 && (
            <p className="text-slate-400 text-sm">No scans yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-white/5 border rounded-2xl p-6">
      <p className="text-xs uppercase tracking-widest text-slate-500">{title}</p>
      <p className="text-3xl font-black mt-2 dark:text-white">{value}</p>
    </div>
  );
}

function getTopCategory(counts) {
  let max = 0;
  let top = "—";
  for (const k in counts) {
    if (counts[k] > max) {
      max = counts[k];
      top = k;
    }
  }
  return top;
}
