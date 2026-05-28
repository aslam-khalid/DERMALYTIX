"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/Sidebar";
import { API_BASE, getToken, getUserId, getHistory, vitalityFromConfidence } from "@/lib/api";
import { conditionEmoji } from "@/lib/conditions";
import { RoutineProductGrid } from "@/components/RoutineProductCard";
import { useToast } from "@/components/toast";
import {
  FileText,
  Share2,
  AlertTriangle,
  RefreshCw,
  Loader2,
} from "lucide-react";

type AnalysisResult = {
  session_id: string;
  user?: { name: string; age?: number; gender?: string; skin_type?: string };
  primary?: {
    display_label: string;
    description: string;
    confidence: number;
    severity: string;
    condition: string;
  };
  predictions?: {
    condition: string;
    display?: string;
    confidence: number;
  }[];
  conditions?: { condition: string; severity: string; confidence: number; display_label?: string }[];
  see_doctor?: boolean;
  image_url?: string;
  disclaimer?: string;
  routine?: Record<string, unknown>;
};

function severityPillClass(severity: string): string {
  const s = severity?.toLowerCase();
  if (s === "severe" || s === "high severity" || s === "high") return "bg-[#EF4444] text-white";
  if (s === "moderate") return "bg-[#F59E0B] text-white";
  return "bg-[#22C55E] text-white";
}

function severityLabel(severity: string): string {
  const s = severity?.toLowerCase();
  if (s === "severe" || s === "high severity" || s === "high") return "SEVERE";
  if (s === "moderate") return "MODERATE";
  return "MILD";
}

function ringColor(score: number): string {
  if (score > 80) return "#2563EB";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
}

function formatConditionName(condition: string, display?: string): string {
  if (display) return display;
  return condition
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    const raw = sessionStorage.getItem(`result_${id}`);
    if (raw) {
      try {
        setData(JSON.parse(raw));
        setLoading(false);
        return;
      } catch (e) {
        console.error("Error parsing cached result", e);
      }
    }

    const uid = getUserId();
    if (uid) {
      getHistory(uid)
        .then((d) => {
          const matched = d.history?.find((s: { session_id: string }) => s.session_id === id);
          if (matched) {
            const formattedResult: AnalysisResult = {
              session_id: matched.session_id,
              image_url: matched.image_url,
              see_doctor: matched.see_doctor,
              primary: {
                display_label: matched.display_label,
                confidence: matched.confidence,
                severity: matched.severity,
                condition: matched.condition,
                description: matched.routine?.routine?.tip || matched.routine?.tip || "",
              },
              routine: matched.routine,
              conditions: matched.routine?.conditions || [
                {
                  condition: matched.condition,
                  severity: matched.severity,
                  confidence: matched.confidence,
                  display_label: matched.display_label,
                },
              ],
              disclaimer:
                "Not a medical diagnosis. Results are AI-generated suggestions only. Please consult a dermatologist for professional advice.",
            };
            setData(formattedResult);
          } else {
            showToast("Report not found in history records.", "warning");
            router.replace("/dashboard");
          }
        })
        .catch(() => {
          showToast("Failed to load diagnostic report.", "danger");
          router.replace("/dashboard");
        })
        .finally(() => setLoading(false));
    } else {
      router.replace("/dashboard");
    }
  }, [id, router, showToast]);

  if (loading || !data) {
    return (
      <DashboardShell title="Diagnostic Report" activeOverride="Skin Analysis" pageTitle="Diagnostic Report">
        <div className="space-y-6 max-w-4xl">
          <div className="flex gap-3">
            <div className="h-9 w-28 bg-slate-100 rounded animate-pulse" />
            <div className="h-9 w-24 bg-slate-100 rounded animate-pulse" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="h-48 bg-slate-100 rounded-card animate-pulse" />
            <div className="h-48 bg-slate-100 rounded-card animate-pulse" />
          </div>
          <div className="h-64 bg-slate-100 rounded-card animate-pulse" />
        </div>
      </DashboardShell>
    );
  }

  const conf = data.primary?.confidence ?? 0.8;
  const score = vitalityFromConfidence(conf);
  const stroke = ringColor(score);
  const imgSrc = data.image_url?.startsWith("http")
    ? data.image_url
    : data.image_url
      ? `${API_BASE}${data.image_url}`
      : null;

  const detected =
    data.conditions?.length
      ? data.conditions
      : data.predictions?.map((p) => ({
          condition: p.condition,
          display_label: p.display,
          severity:
            p.confidence >= 0.85
              ? "severe"
              : p.confidence >= 0.65
                ? "moderate"
                : "mild",
          confidence: p.confidence,
        })) || [];

  const routineObj = (data.routine as { routine?: Record<string, unknown> })?.routine || data.routine || {};
  const morning = (routineObj as { morning?: Record<string, string> }).morning || {};
  const evening = (routineObj as { evening?: Record<string, string> }).evening || {};
  const avoid = (routineObj as { avoid?: string[] }).avoid || [];
  const tip =
    (routineObj as { tip?: string }).tip ||
    data.primary?.description ||
    "Give products at least 4 weeks of consistent use before adjusting.";
  const seeDoctor =
    data.see_doctor || (routineObj as { see_doctor?: boolean }).see_doctor || false;

  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <DashboardShell
      title="Diagnostic Report"
      subtitle={`Report ID: ${String(id).slice(0, 8).toUpperCase()}`}
      activeOverride="Skin Analysis"
      pageTitle="Diagnostic Report"
    >
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => showToast("Exporting report to PDF...", "info")}
            className="btn-outline px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <FileText size={14} /> Export PDF
          </button>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast("Report link copied to clipboard!", "success");
            }}
            className="btn-outline px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {seeDoctor && (
        <div className="mb-6 flex gap-4 rounded-xl border border-[#FECACA] border-l-4 border-l-[#EF4444] bg-[#FEF2F2] px-5 py-4">
          <span className="text-2xl shrink-0" aria-hidden>🏥</span>
          <div>
            <p className="text-sm font-bold text-[#991B1B]">
              Please consult a dermatologist
            </p>
            <p className="text-xs text-[#B91C1C] mt-0.5">
              This condition requires professional evaluation
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <div className="card p-8 border border-slate-100/60 shadow-sm flex flex-col items-center justify-center bg-white">
          <div className="relative" style={{ width: 160, height: 160 }}>
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-navy">{score}%</span>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-0.5">
                Confidence
              </span>
            </div>
          </div>
          <h3 className="mt-5 font-extrabold text-navy">Confidence Score</h3>
          <p className="text-xs text-text-secondary mt-1 text-center max-w-xs">
            Indicates neural matching probability for detected conditions
          </p>
        </div>

        <div className="card p-6 border border-slate-100/60 shadow-sm bg-white">
          <h3 className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-4">
            Detected Conditions
          </h3>
          <div className="space-y-3">
            {detected.map((c, i) => {
              const label = formatConditionName(
                c.condition,
                (c as { display_label?: string }).display_label || data.primary?.display_label
              );
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>
                      {conditionEmoji(c.condition)}
                    </span>
                    <div>
                      <p className="font-extrabold text-navy text-sm sm:text-base">
                        {label}
                      </p>
                      <p className="text-xs text-text-secondary">AI classification</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wider ${severityPillClass(c.severity)}`}
                  >
                    {severityLabel(c.severity)}
                  </span>
                </div>
              );
            })}
            {detected.length === 0 && data.primary && (
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{conditionEmoji(data.primary.condition)}</span>
                  <p className="font-extrabold text-navy">{data.primary.display_label}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold ${severityPillClass(data.primary.severity)}`}>
                  {severityLabel(data.primary.severity)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {imgSrc && (
        <div className="mt-6 card border border-slate-100/60 shadow-sm bg-white p-8">
          <h3 className="text-lg font-bold text-navy mb-5 text-center">Skin Analysis</h3>
          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt="Uploaded skin scan"
              className="max-h-[400px] max-w-[500px] w-full object-cover rounded-2xl border border-slate-100"
              style={{ borderRadius: 16 }}
            />
            <p className="mt-3 text-xs text-text-secondary text-center">
              Uploaded skin photo for analysis
            </p>
          </div>
        </div>
      )}

      <h2 className="mt-8 mb-5 text-lg font-bold text-navy tracking-tight">
        Treatment Routine Recommendations
      </h2>

      <div className="space-y-6">
        <div className="card overflow-hidden border border-slate-100/60 shadow-sm bg-white">
          <div className="bg-primary px-5 py-3">
            <h3 className="font-extrabold text-white text-sm">🌅 Morning Routine</h3>
          </div>
          <div className="p-5">
            <RoutineProductGrid routine={morning as Record<string, unknown>} />
          </div>
        </div>

        <div className="card overflow-hidden border border-slate-100/60 shadow-sm bg-white">
          <div className="bg-navy px-5 py-3">
            <h3 className="font-extrabold text-white text-sm">🌙 Evening Routine</h3>
          </div>
          <div className="p-5">
            <RoutineProductGrid routine={evening as Record<string, unknown>} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card overflow-hidden border border-slate-100/60 shadow-sm bg-white">
            <div className="bg-[#EF4444] px-5 py-3">
              <h3 className="font-extrabold text-white text-sm">❌ What to Avoid</h3>
            </div>
            <div className="p-5">
              {avoid.length > 0 ? (
                <ul className="space-y-2.5">
                  {avoid.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm font-medium text-navy">
                      <span className="text-[#EF4444]">•</span>
                      {String(item)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-text-secondary italic">No specific products to avoid.</p>
              )}
            </div>
          </div>

          <div className="card overflow-hidden border border-slate-100/60 shadow-sm bg-white">
            <div className="bg-[#F59E0B] px-5 py-3">
              <h3 className="font-extrabold text-white text-sm">💡 Dermatologist Tip</h3>
            </div>
            <div className="p-5">
              <p className="text-sm font-medium text-navy leading-relaxed">{String(tip)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/analysis/questionnaire"
          className="btn-primary py-3.5 px-10 flex items-center justify-center gap-2 font-bold text-white shadow-lg shadow-blue-500/10"
        >
          <RefreshCw size={16} />
          Start New Analysis
        </Link>
      </div>

      <div className="mt-8 flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
        <AlertTriangle size={16} className="shrink-0 text-text-secondary mt-0.5" />
        <p className="text-xs font-medium text-text-secondary leading-relaxed">
          {data.disclaimer ||
            "Not a medical diagnosis. Results are AI-generated suggestions only. Please consult a dermatologist for professional advice."}
        </p>
      </div>
    </DashboardShell>
  );
}
