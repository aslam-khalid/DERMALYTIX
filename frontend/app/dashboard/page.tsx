"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/Sidebar";
import { getHistory, getToken, getUserId } from "@/lib/api";
import { conditionEmoji, formatDisplayDate } from "@/lib/conditions";
import { Sparkles, Activity, AlertCircle, Info, Calendar, ScanLine } from "lucide-react";
import { useToast } from "@/components/toast";

type HistoryItem = {
  session_id: string;
  display_label: string;
  condition: string;
  severity: string;
  created_at: string;
  confidence: number;
};

function severityBadgeClass(severity: string): string {
  const s = severity?.toLowerCase();
  if (s === "severe") return "bg-[#EF4444]";
  if (s === "moderate") return "bg-[#F59E0B]";
  return "bg-[#22C55E]";
}

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [totalScans, setTotalScans] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    const uid = getUserId();
    if (uid) {
      getHistory(uid)
        .then((d) => {
          const all = d.history || [];
          setTotalScans(all.length);
          setHistory(all.slice(0, 6));
        })
        .catch((err) => {
          setHistory([]);
          setTotalScans(0);
          showToast(err instanceof Error ? err.message : "Failed to load history records", "danger");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [router, showToast]);

  return (
    <DashboardShell title="Clinical Overview" activeOverride="Overview" pageTitle="Clinical Overview">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card relative overflow-hidden bg-gradient-to-r from-primary to-blue-700 p-6 sm:p-8 text-white shadow-md">
            <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute left-1/3 bottom-0 h-24 w-24 translate-y-12 rounded-full bg-blue-500/20 blur-xl" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 text-white">
                  <Sparkles size={14} className="fill-white" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-100">
                  Live Insights
                </span>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight max-w-lg">
                Augmenting clinical precision through neural analysis.
              </h2>

              <div className="mt-6">
                <Link
                  href="/analysis/questionnaire"
                  className="inline-flex items-center justify-center rounded-btn bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.02]"
                >
                  Start New Scan
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card p-6 border border-slate-100/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                    Analysis Accuracy
                  </p>
                  <span className="text-primary bg-primary/10 p-1.5 rounded-lg">
                    <Activity size={18} />
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-navy mt-3 tracking-tight">91.9%</p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-xs text-text-secondary font-semibold mb-1.5">
                  <span>Model Threshold Stability</span>
                  <span>Optimized</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-primary transition-all duration-500"
                    style={{ width: "91.9%" }}
                  />
                </div>
              </div>
            </div>

            <div className="card p-6 border border-slate-100/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-text-secondary uppercase tracking-wider">
                    Total Scans
                  </p>
                  <span className="text-primary bg-primary/10 p-1.5 rounded-lg">
                    <ScanLine size={18} />
                  </span>
                </div>
                <p className="text-4xl font-extrabold text-navy mt-3 tracking-tight">
                  {loading ? "—" : totalScans}
                </p>
              </div>
              <p className="mt-4 text-xs text-text-secondary font-medium">
                Completed analyses in your history
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6 border border-slate-100/60 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <h3 className="font-bold text-navy tracking-tight">Active Alerts</h3>
            <span className="flex h-2.5 w-2.5 rounded-full bg-danger animate-pulse" />
          </div>

          <div className="mt-5 space-y-4 flex-1">
            <div className="flex gap-3 rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger hover:bg-danger/10 transition-colors">
              <AlertCircle size={20} className="shrink-0 mt-0.5 text-danger" />
              <div>
                <p className="font-bold leading-tight">High Severity Pending Review</p>
                <p className="mt-1 text-xs text-danger/80 leading-relaxed">
                  Patient session ended with a severe assessment. Requires clinician oversight.
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary hover:bg-primary/10 transition-colors">
              <Info size={20} className="shrink-0 mt-0.5 text-primary" />
              <div>
                <p className="font-bold leading-tight">System Update Complete</p>
                <p className="mt-1 text-xs text-primary/80 leading-relaxed">
                  The EfficientNetB0 classification pipeline is running optimally with local product weights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-navy tracking-tight">Analysis History</h2>
          <Link href="/history" className="text-sm font-bold text-primary hover:underline">
            View All Records →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-5 border border-slate-100 animate-pulse space-y-3">
                <div className="h-4 bg-slate-100 rounded w-1/3" />
                <div className="h-6 bg-slate-100 rounded w-2/3" />
                <div className="h-5 bg-slate-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : history.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((h) => (
              <Link
                key={h.session_id}
                href={`/analysis/results/${h.session_id}`}
                className="card p-5 border border-slate-100/60 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-text-secondary text-xs font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDisplayDate(h.created_at)}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      #{h.session_id.slice(0, 8)}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-bold text-navy group-hover:text-primary transition-colors flex items-center gap-2">
                    <span className="text-xl" aria-hidden>
                      {conditionEmoji(h.condition || h.display_label)}
                    </span>
                    {h.display_label || h.condition}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white ${severityBadgeClass(h.severity)}`}
                  >
                    {h.severity || "mild"}
                  </span>
                  <span className="text-xs font-bold text-primary group-hover:underline">
                    View Report →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card p-12 border border-dashed border-slate-200 col-span-full flex flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
              <ScanLine size={40} strokeWidth={1.5} />
            </div>
            <p className="mt-5 text-lg font-bold text-navy">No analyses yet</p>
            <p className="text-sm text-text-secondary mt-1 max-w-sm">
              Start your first skin analysis to see results and track your progress here.
            </p>
            <Link
              href="/analysis/questionnaire"
              className="btn-primary mt-6 px-8 py-3 text-sm font-bold text-white shadow-sm"
            >
              Start New Analysis
            </Link>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
