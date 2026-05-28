"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardShell } from "@/components/Sidebar";
import {
  getHistory,
  getToken,
  getUserId,
  severityColor,
  vitalityFromConfidence,
} from "@/lib/api";
import { useToast } from "@/components/toast";
import { FileText, Calendar, Eye } from "lucide-react";

type HistoryItem = {
  session_id: string;
  display_label: string;
  condition: string;
  confidence: number;
  severity: string;
  see_doctor: boolean;
  image_url: string;
  created_at: string;
  routine: any;
};

export default function HistoryPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    const uid = getUserId();
    if (!uid) return;
    getHistory(uid)
      .then((d) => setHistory(d.history || []))
      .catch((err) => {
        setHistory([]);
        showToast(err instanceof Error ? err.message : "Failed to load clinical records history", "danger");
      })
      .finally(() => setLoading(false));
  }, [router, showToast]);

  const latest = history[0];

  // Calculate top row stats:
  // 1. Total Analyses
  const totalAnalyses = history.length;

  // 2. Latest Score
  const latestScore = latest ? `${vitalityFromConfidence(latest.confidence)} / 100` : "—";

  // 3. Most Common Condition
  const conditionCounts: Record<string, number> = {};
  history.forEach((item) => {
    const cond = item.display_label || item.condition;
    if (cond) {
      conditionCounts[cond] = (conditionCounts[cond] || 0) + 1;
    }
  });
  let mostCommonCondition = "None";
  let maxCount = 0;
  for (const [cond, count] of Object.entries(conditionCounts)) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonCondition = cond;
    }
  }

  // Health Score Trend: last 6 analyses sorted chronologically
  const last6 = [...history].slice(0, 6).reverse();
  const chartData = last6.map((item) => ({
    date: item.created_at.split(" ")[0],
    score: Math.round(item.confidence * 100), // Confidence scores
  }));

  // Severity helper
  const getSeverityBadge = (sev: string) => {
    const s = sev?.toLowerCase();
    if (s === "severe" || s === "high severity" || s === "high") {
      return { label: "HIGH SEVERITY", color: "bg-rose-50 border-rose-200 text-danger" };
    }
    if (s === "moderate") {
      return { label: "MODERATE", color: "bg-amber-50 border-amber-200 text-warning" };
    }
    return { label: "MILD", color: "bg-emerald-50 border-emerald-200 text-success" };
  };

  return (
    <DashboardShell
      title="Clinical History"
      activeOverride="Patient History"
      pageTitle="Patient History"
    >
      {/* Header Action Button */}
      <div className="mb-6 flex flex-wrap gap-3 border-b border-slate-100 pb-4">
        <button 
          onClick={() => showToast("Exporting clinical records...", "info")}
          className="btn-outline text-xs font-bold flex items-center gap-1.5 shadow-sm hover:border-slate-300"
        >
          <FileText size={14} /> Export Records
        </button>
      </div>

      {loading ? (
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6 border border-slate-100 animate-pulse space-y-3">
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-10 bg-slate-100 rounded w-1/3" />
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card p-5 border border-slate-100 animate-pulse h-20" />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Row Stats */}
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Total Analyses Card */}
            <div className="card p-6 border border-slate-100/60 shadow-sm bg-white">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Total Analyses
              </p>
              <p className="mt-3 text-4xl font-extrabold text-navy tracking-tight">
                {totalAnalyses}
              </p>
              <p className="text-xs text-text-secondary mt-1 font-semibold">
                Completed patient screenings
              </p>
            </div>

            {/* Latest Score Card */}
            <div className="card bg-navy p-6 text-white shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  LATEST SCORE
                </p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight">
                  {latestScore}
                </p>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-semibold capitalize">
                {latest ? `${latest.display_label || latest.condition} (${latest.severity})` : "No scans completed yet"}
              </p>
            </div>

            {/* Most Common Condition Card */}
            <div className="card p-6 border border-slate-100/60 shadow-sm bg-white">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Most Common Condition
              </p>
              <p className="mt-3 text-2xl font-extrabold text-navy tracking-tight capitalize truncate">
                {mostCommonCondition}
              </p>
              <p className="text-xs text-text-secondary mt-2 font-semibold">
                Based on historical scans
              </p>
            </div>
          </div>

          {/* Health Score Trend Chart */}
          <div className="card p-6 border border-slate-100/60 shadow-sm bg-white">
            <h3 className="font-bold text-navy text-sm tracking-tight mb-4">Health Score Trend</h3>
            <div className="h-64 w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748B" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#64748B" }} label={{ value: 'Confidence %', angle: -90, position: 'insideLeft', fontSize: 12, fill: "#64748B" }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                    <Bar dataKey="score" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center border border-dashed border-slate-200 rounded-xl">
                  <p className="text-xs text-text-secondary font-medium italic">No chart trend data available yet.</p>
                </div>
              )}
            </div>
          </div>

          {/* Past Analyses Table */}
          <div className="card border border-slate-100/60 shadow-sm bg-white overflow-hidden">
            <div className="border-b border-slate-100 p-4 flex items-center justify-between">
              <h3 className="font-bold text-navy text-sm tracking-tight">
                Past Analyses
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
                  <tr>
                    <th className="p-4 border-b border-slate-100">DATE</th>
                    <th className="p-4 border-b border-slate-100">CONDITION</th>
                    <th className="p-4 border-b border-slate-100">SEVERITY</th>
                    <th className="p-4 border-b border-slate-100">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-text-primary">
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-text-secondary italic">
                        No analyses found.{" "}
                        <Link href="/analysis/questionnaire" className="text-primary font-bold hover:underline">
                          Start one now
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    history.map((row) => {
                      const badge = getSeverityBadge(row.severity);
                      return (
                        <tr key={row.session_id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-xs font-semibold text-text-secondary">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {row.created_at}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-navy capitalize">
                            <span 
                              className="mr-2 inline-block h-2 w-2 rounded-full"
                              style={{ backgroundColor: severityColor(row.severity) }}
                            />
                            {row.display_label || row.condition}
                          </td>
                          <td className="p-4">
                            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider ${badge.color}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="p-4">
                            <Link
                              href={`/analysis/results/${row.session_id}`}
                              className="text-primary font-bold hover:underline flex items-center gap-1 text-xs"
                              onClick={() => {
                                // Cache full session details to sessionStorage
                                const cachedSession = {
                                  session_id: row.session_id,
                                  image_url: row.image_url,
                                  see_doctor: row.see_doctor,
                                  primary: {
                                    display_label: row.display_label,
                                    confidence: row.confidence,
                                    severity: row.severity,
                                    condition: row.condition,
                                    description: row.routine?.routine?.tip || row.routine?.tip || ""
                                  },
                                  routine: row.routine,
                                  conditions: row.routine?.conditions || [{ condition: row.condition, severity: row.severity, confidence: row.confidence }],
                                  disclaimer: "⚠️ Not a medical diagnosis. Results are AI-generated suggestions only. Please consult a dermatologist for professional advice."
                                };
                                sessionStorage.setItem(
                                  `result_${row.session_id}`,
                                  JSON.stringify(cachedSession)
                                );
                              }}
                            >
                              <Eye size={12} /> View Report
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
