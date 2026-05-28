"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser, saveAuth } from "@/lib/api";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/components/toast";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      const msg = "Passwords do not match";
      setError(msg);
      showToast(msg, "danger");
      return;
    }
    if (!form.terms) {
      const msg = "Please accept the Terms of Service";
      setError(msg);
      showToast(msg, "danger");
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      saveAuth({
        access_token: res.access_token,
        user_id: res.user_id,
        name: res.name,
      });
      showToast("Account created successfully!", "success");
      router.push("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      showToast(msg, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-12 font-sans">
      {/* Left Column (Light Gradient branding) */}
      <div className="hidden lg:flex lg:col-span-5 flex-col justify-between bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border-r border-slate-100 p-12">
        <Link href="/" className="text-xl font-bold text-navy">
          Dermalytix
        </Link>
        <div className="my-auto space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight text-navy">
            Precision Dermatology Starts with Data.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Join clinics leveraging AI-assisted screening with severity-based routines 
            and local Pakistani product recommendations.
          </p>
          <div className="card max-w-md border border-blue-100 bg-white p-6 shadow-sm flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-navy">Advanced Analysis</p>
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                EfficientNetB0 model checking 7 skin conditions with custom treatment suggestions.
              </p>
            </div>
          </div>
        </div>
        <p className="text-xs text-text-secondary">
          © {new Date().getFullYear()} Dermalytix. All rights reserved.
        </p>
      </div>

      {/* Right Column (Sign up form card) */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12">
        <div className="card w-full max-w-lg p-8 sm:p-10 border border-slate-100/60 shadow-lg">
          {/* Logo show on mobile only */}
          <div className="block lg:hidden mb-6">
            <Link href="/" className="text-xl font-bold text-navy">
              Dermalytix
            </Link>
          </div>

          <h1 className="text-3xl font-extrabold text-navy tracking-tight">Create Account</h1>
          <p className="text-sm text-text-secondary mt-2">
            Enter your details to begin your clinical journey.
          </p>

          {error && (
            <p className="mt-4 rounded-btn bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger font-medium">
              {error}
            </p>
          )}

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Full Name
              </label>
              <input
                className="input-field mt-1.5"
                placeholder="Dr. Ahmed Khan"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Email Address
              </label>
              <input
                type="email"
                className="input-field mt-1.5"
                placeholder="ahmed@dermalytix.pk"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Password
                </label>
                <input
                  type="password"
                  className="input-field mt-1.5"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="input-field mt-1.5"
                  placeholder="••••••••"
                  required
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  checked={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                />
                <span>
                  I agree to the{" "}
                  <a className="font-semibold text-primary underline hover:text-blue-700">
                    Terms of Service
                  </a>{" "}
                  and Privacy Policy.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 mt-2 flex items-center justify-center font-semibold text-white shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all hover:scale-[1.01]"
              disabled={loading}
            >
              {loading ? "Creating Account…" : "Create Account →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:text-blue-700 underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
