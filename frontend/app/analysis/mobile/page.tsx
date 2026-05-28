"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { analyzeImage, getToken } from "@/lib/api";

export default function MobileAnalysisPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    age: "25",
    skin_type: "combination",
    concern: "acne",
    gender: "female",
  });

  const submit = async () => {
    if (!getToken()) {
      router.push("/login");
      return;
    }
    if (!file) {
      setError("Please add a photo");
      return;
    }
    setLoading(true);
    setError("");
    const fd = new FormData();
    fd.append("image", file);
    fd.append("name", form.name);
    fd.append("age", form.age);
    fd.append("gender", form.gender);
    fd.append("skin_type", form.skin_type);
    fd.append("main_concern", form.concern);
    try {
      const res = await analyzeImage(fd);
      sessionStorage.setItem(`result_${res.session_id}`, JSON.stringify(res));
      router.push(`/analysis/results/${res.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/dashboard" className="rounded-btn border p-2">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-xl font-bold text-navy">Analysis Profile</h1>
      </div>
      <label className="card flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed">
        <Camera className="text-primary" size={32} />
        <p className="mt-2 text-sm text-text-secondary">Patient photo / camera</p>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <p className="mt-2 text-xs">{file.name}</p>}
      </label>
      <div className="mt-4 space-y-3">
        {(["name", "age", "skin_type", "concern"] as const).map((key) => (
          <div key={key}>
            <label className="text-xs capitalize text-text-secondary">{key.replace("_", " ")}</label>
            <input
              className="input-field mt-1"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
      <button
        className="btn-primary mt-6 w-full"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Submitting…" : "Submit Analysis"}
      </button>
    </div>
  );
}
