import Link from "next/link";
import type { Metadata } from "next";
import { Play, Scan, ShoppingBag, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dermalytix — AI Skin Analysis",
  description: "Precision AI dermatology for Pakistani users",
};

const features = [
  {
    icon: Scan,
    title: "AI Skin Analysis",
    description:
      "Upload a photo and get instant AI-powered skin condition detection",
  },
  {
    icon: ShoppingBag,
    title: "Pakistani Products",
    description:
      "Recommendations tailored to products available in Pakistan",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description:
      "Monitor your skin health over time with detailed history",
  },
];

const steps = [
  { num: 1, title: "Fill questionnaire", desc: "Tell us about your skin type and concerns" },
  { num: 2, title: "Upload photo", desc: "Submit a clear skin photo for AI analysis" },
  { num: 3, title: "Get results + routine", desc: "Receive diagnosis insights and a personalized routine" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="page-enter">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="space-y-8 lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                FUTURE OF DIAGNOSTICS
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl leading-[1.1]">
                Precision AI for{" "}
                <span className="text-primary block mt-1 sm:inline">Clinical Serenity.</span>
              </h1>

              <p className="max-w-2xl text-lg sm:text-xl text-text-secondary leading-relaxed font-normal">
                Empowering dermatologists with state-of-the-art diagnostic intelligence
                and personalized skincare routines for Pakistani patients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="btn-primary flex items-center justify-center px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                >
                  Start Free Trial
                </Link>
                <button
                  type="button"
                  className="btn-outline flex items-center justify-center gap-2 px-8 py-4 text-base font-bold border-slate-200 text-text-primary"
                >
                  <Play size={18} className="fill-primary text-primary" />
                  Watch Methodology
                </button>
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-teal-700 to-navy p-0.5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent z-10 mix-blend-overlay" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                  alt="Precision Dermatology Clinic"
                  className="h-full w-full object-cover rounded-[14px] opacity-95"
                />
              </div>

              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-white border border-slate-100 p-5 shadow-xl hover:translate-y-[-2px] transition-transform">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-text-secondary">
                  Model Verification
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight text-primary">
                  91.9% Accuracy
                </p>
                <p className="text-xs font-semibold text-navy mt-0.5">
                  Diagnostic Match
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-100 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="card border border-slate-100 p-8 text-center transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <f.icon size={28} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-navy py-5">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-sm font-semibold text-white/90 sm:text-base tracking-wide">
              <span className="text-white font-bold">7 Conditions Detected</span>
              <span className="mx-3 text-white/40">|</span>
              <span className="text-white font-bold">91.9% Accuracy</span>
              <span className="mx-3 text-white/40">|</span>
              <span className="text-white font-bold">Pakistani Brands</span>
              <span className="mx-3 text-white/40">|</span>
              <span className="text-white font-bold">Trusted by Dermatologists</span>
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-extrabold text-navy">How It Works</h2>
            <p className="mt-2 text-center text-text-secondary">
              Three simple steps to your personalized skin analysis
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.num} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-slate-200" />
                  )}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-black text-white shadow-lg shadow-blue-500/20">
                    {step.num}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/register" className="btn-primary inline-flex px-8 py-3.5 text-base font-bold">
                Get Started Free
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-2xl font-bold">Dermalytix</p>
              <p className="mt-2 text-sm text-white/70 max-w-sm leading-relaxed">
                AI-powered dermatology diagnostics with personalized routines
                tailored for Pakistani skincare products.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
                Product
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">
                Company
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#technology" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="#clinical" className="hover:text-white transition-colors">Clinical Data</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
            © {new Date().getFullYear()} Dermalytix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
