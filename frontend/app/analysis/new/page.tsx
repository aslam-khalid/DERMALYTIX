"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Upload, ArrowLeft, Loader2, Info, X } from "lucide-react";
import { DashboardShell } from "@/components/Sidebar";
import { analyzeImage, getToken } from "@/lib/api";
import { useToast } from "@/components/toast";

type QuestionnaireAnswers = {
  name: string;
  age: number;
  gender: string;
  skin_type: string;
  main_concern: string;
  notes?: string;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function NewAnalysisPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    const raw = sessionStorage.getItem("questionnaire_answers");
    if (!raw) {
      router.replace("/analysis/questionnaire");
      return;
    }

    try {
      setAnswers(JSON.parse(raw));
    } catch {
      router.replace("/analysis/questionnaire");
    }
  }, [router]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validateAndSetFile = useCallback(
    (f: File | undefined) => {
      setError("");
      if (!f) return;

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(f.type)) {
        const msg = "Invalid file type. Only JPEG, PNG, and WebP are supported.";
        setError(msg);
        showToast(msg, "danger");
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (f.size > maxSize) {
        const msg = "File is too large. Maximum size is 10MB.";
        setError(msg);
        showToast(msg, "danger");
        return;
      }

      setFile(f);
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(f);
      });
      showToast("Photo selected successfully", "info");
    },
    [showToast]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      validateAndSetFile(e.dataTransfer.files[0]);
    },
    [validateAndSetFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0]);
  };

  const clearPhoto = () => {
    setFile(null);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  const submit = async () => {
    if (!file || !answers) {
      const msg = "Please select an image and complete the questionnaire first.";
      setError(msg);
      showToast(msg, "danger");
      return;
    }

    setLoading(true);
    setError("");

    const form = new FormData();
    form.append("image", file);
    form.append("name", answers.name);
    form.append("age", String(answers.age));
    form.append("gender", answers.gender);
    form.append("skin_type", answers.skin_type);
    form.append("main_concern", answers.main_concern);

    try {
      const res = await analyzeImage(form);
      sessionStorage.setItem(`result_${res.session_id}`, JSON.stringify(res));

      if (res.session_id) {
        showToast("Analysis completed successfully!", "success");
        router.push(`/analysis/results/${res.session_id}`);
      } else {
        const msg = res.message || "An unexpected error occurred during analysis.";
        setError(msg);
        showToast(msg, "danger");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Analysis submission failed.";
      setError(msg);
      showToast(msg, "danger");
    } finally {
      setLoading(false);
    }
  };

  const formatConcern = (c: string) => {
    if (!c) return "";
    if (c === "oily") return "Oily Skin";
    if (c === "dry") return "Dry Skin";
    if (c === "normal") return "Normal Skin";
    return c.charAt(0).toUpperCase() + c.slice(1);
  };

  const formatSkinType = (s: string) => {
    if (!s) return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  if (!answers) {
    return (
      <DashboardShell title="Image Upload" activeOverride="Skin Analysis" pageTitle="New Analysis">
        <div className="space-y-4 max-w-7xl mx-auto">
          <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-12 bg-slate-100 rounded-full animate-pulse w-2/3" />
              <div className="h-[280px] bg-slate-100 rounded-card animate-pulse" />
            </div>
            <div className="lg:col-span-5">
              <div className="h-64 bg-slate-100 rounded-card animate-pulse" />
            </div>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Image Upload"
      subtitle="Step 2 of 2 — Upload Skin Photo"
      activeOverride="Skin Analysis"
      pageTitle="New Analysis"
    >
      <div className="mb-6 flex items-center justify-between max-w-7xl mx-auto">
        <span className="text-sm font-semibold text-navy">Step 2 of 2</span>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 max-w-7xl mx-auto items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-navy shadow-sm">
              {answers.name} • Age {answers.age} • {formatSkinType(answers.skin_type)} • {formatConcern(answers.main_concern)}
            </span>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="card flex min-h-[280px] flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-white p-8 transition-colors hover:border-primary/50 relative overflow-hidden"
          >
            {previewUrl ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Skin Photo Preview"
                  className="max-h-[250px] rounded-xl object-contain shadow-sm border border-slate-100"
                />
                <div className="flex flex-col items-center gap-1">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary max-w-xs truncate">
                    {file?.name}
                  </span>
                  <p className="text-xs text-text-secondary">
                    {file ? formatFileSize(file.size) : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="inline-flex items-center gap-1 text-xs font-bold text-danger hover:underline transition-all hover:scale-[1.02]"
                >
                  Change Photo <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Upload size={24} />
                </div>
                <p className="mt-4 font-bold text-navy text-center">
                  Drag and drop your skin photo here
                </p>
                <p className="text-xs text-text-secondary mt-1 text-center">
                  Supports JPEG, PNG, WebP — Maximum 10MB
                </p>
                <label className="btn-primary mt-5 cursor-pointer py-2 px-5 text-xs font-bold shadow-sm">
                  Select Files
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
          </div>

          {error && (
            <p className="rounded-btn bg-danger/10 border border-danger/20 px-4 py-2.5 text-sm text-danger font-semibold">
              {error}
            </p>
          )}

          <div className="card p-5 border border-slate-100 bg-white shadow-sm">
            <h4 className="font-bold text-navy text-sm mb-4">Tips for best results</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-slate-50 p-4">
                <span className="text-2xl">💡</span>
                <p className="mt-2 text-xs font-semibold text-navy">Good lighting</p>
                <p className="text-[10px] text-text-secondary mt-0.5">Natural light preferred</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <span className="text-2xl">🚫</span>
                <p className="mt-2 text-xs font-semibold text-navy">No filters</p>
                <p className="text-[10px] text-text-secondary mt-0.5">Unedited photos only</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <span className="text-2xl">📸</span>
                <p className="mt-2 text-xs font-semibold text-navy">Face visible</p>
                <p className="text-[10px] text-text-secondary mt-0.5">Clear, steady shot</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="card p-6 border border-slate-100/60 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-bold text-navy tracking-tight">Analysis Summary</h3>
              <button
                type="button"
                onClick={() => router.push("/analysis/questionnaire")}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 transition-all hover:scale-[1.02]"
              >
                <ArrowLeft size={12} /> Edit Info
              </button>
            </div>

            <div className="space-y-0 text-sm divide-y divide-slate-100">
              <div className="flex justify-between py-3">
                <span className="text-text-secondary font-medium">Name</span>
                <span className="font-bold text-navy">{answers.name}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-text-secondary font-medium">Age / Gender</span>
                <span className="font-bold text-navy">
                  {answers.age} / {answers.gender}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-text-secondary font-medium">Skin Type</span>
                <span className="font-bold text-navy">{formatSkinType(answers.skin_type)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-text-secondary font-medium">Main Concern</span>
                <span className="font-bold text-navy">{formatConcern(answers.main_concern)}</span>
              </div>
              {answers.notes && (
                <div className="py-3">
                  <span className="text-text-secondary font-medium block">Clinical Notes</span>
                  <span className="font-medium text-navy text-xs mt-2 block leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100/60">
                    {answers.notes}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2.5 rounded-xl bg-blue-50/50 border border-blue-100 p-4 text-xs text-primary font-semibold mt-5">
              <Info size={16} className="shrink-0 text-primary" />
              <span>AI analysis takes 3-5 seconds to screen skin layers.</span>
            </div>

            <button
              type="button"
              onClick={submit}
              disabled={loading || !file}
              className="btn-primary w-full py-3.5 mt-5 flex items-center justify-center gap-2 font-bold text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Analyzing Photo…
                </>
              ) : (
                "Submit for Analysis"
              )}
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
