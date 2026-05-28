"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/Sidebar";
import { getToken, setUserSkinType } from "@/lib/api";
import {
  Droplet,
  Sun,
  Check,
  Split,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/components/toast";

type SkinTypeKey = "oily" | "dry" | "normal" | "combination" | "sensitive";

const SKIN_TYPES: { key: SkinTypeKey; label: string; icon: typeof Droplet }[] = [
  { key: "oily", label: "Oily", icon: Droplet },
  { key: "dry", label: "Dry", icon: Sun },
  { key: "normal", label: "Normal", icon: Check },
  { key: "combination", label: "Combination", icon: Split },
  { key: "sensitive", label: "Sensitive", icon: Heart },
];

const CONCERNS = [
  { key: "Acne", label: "Acne", emoji: "🔴" },
  { key: "dark spots", label: "Dark Spots", emoji: "🟤" },
  { key: "Dark circles", label: "Dark Circles", emoji: "👁️" },
  { key: "dry", label: "Dry Skin", emoji: "🏜️" },
  { key: "oily", label: "Oily Skin", emoji: "💧" },
  { key: "wrinkles", label: "Wrinkles", emoji: "〰️" },
  { key: "normal", label: "Normal Skin", emoji: "✨" },
];

export default function QuestionnairePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [skinType, setSkinType] = useState<SkinTypeKey | "">("");
  const [mainConcern, setMainConcern] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      showToast("Please enter your name", "danger");
      return setError("Please enter your name");
    }
    const ageNum = Number(age);
    if (!age || ageNum < 1 || ageNum > 120) {
      showToast("Please enter a valid age (1-120)", "danger");
      return setError("Please enter a valid age (1-120)");
    }
    if (!gender) {
      showToast("Please select a gender", "danger");
      return setError("Please select a gender");
    }
    if (!skinType) {
      showToast("Please select your skin type", "danger");
      return setError("Please select your skin type");
    }
    if (!mainConcern) {
      showToast("Please select your main skin concern", "danger");
      return setError("Please select your main skin concern");
    }

    const answers = {
      name,
      age: ageNum,
      gender,
      skin_type: skinType,
      main_concern: mainConcern,
      notes,
    };

    setUserSkinType(skinType);
    sessionStorage.setItem("questionnaire_answers", JSON.stringify(answers));
    router.push("/analysis/new");
  };

  return (
    <DashboardShell
      title="New Skin Analysis"
      subtitle="Step 1 of 2 — Patient Information"
      activeOverride="Skin Analysis"
      pageTitle="New Analysis"
    >
      <div className="mx-auto max-w-[600px] py-4">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-navy">Step 1 of 2</span>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="card bg-white p-6 sm:p-8 border border-slate-100/60 shadow-lg">
          <h2 className="text-xl font-bold text-navy tracking-tight">Patient Details</h2>
          <p className="text-sm text-text-secondary mt-1">
            Please fill in this questionnaire to help customize the AI analysis.
          </p>

          {error && (
            <p className="mt-4 rounded-btn bg-danger/10 border border-danger/20 px-4 py-2.5 text-sm text-danger font-semibold">
              {error}
            </p>
          )}

          <form onSubmit={handleContinue} className="mt-6 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                type="text"
                className="input-field mt-1.5"
                placeholder="e.g. Ahmed Ali"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  className="input-field mt-1.5"
                  placeholder="e.g. 25"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Gender
                </label>
                <div className="flex gap-4 mt-3">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm text-text-primary cursor-pointer select-none">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={(e) => setGender(e.target.value)}
                        className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Skin Type
              </label>
              <div className="flex flex-wrap gap-3 mt-3">
                {SKIN_TYPES.map((t) => {
                  const Icon = t.icon;
                  const isSelected = skinType === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setSkinType(t.key)}
                      style={{ width: 80 }}
                      className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 text-center transition-all duration-150 ${
                        isSelected
                          ? "border-primary bg-[#EFF6FF] text-primary shadow-sm"
                          : "border-slate-100 bg-white text-text-secondary hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={22} className={isSelected ? "text-primary" : "text-text-secondary"} />
                      <span className="text-xs font-bold mt-2">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Main Skin Concern
              </label>
              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {CONCERNS.map((c) => {
                  const isSelected = mainConcern === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setMainConcern(c.key)}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-150 ${
                        isSelected
                          ? "border-primary bg-[#EFF6FF] text-primary shadow-sm"
                          : "border-slate-100 bg-white text-text-primary hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl">{c.emoji}</span>
                      <span className="text-xs font-semibold leading-tight">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Clinical Notes (Optional)
              </label>
              <textarea
                className="input-field mt-1.5 min-h-[80px] py-2 px-3"
                placeholder="Any specific symptoms, allergies, or observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center gap-2 font-bold text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 animate-button-entrance"
            >
              Continue to Image Upload
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
