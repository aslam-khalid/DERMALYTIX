"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-extrabold text-navy">
          Dermalytix
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-text-secondary md:flex">
          <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#technology" className="hover:text-primary transition-colors">Technology</a>
          <a href="#clinical" className="hover:text-primary transition-colors">Clinical Data</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-outline px-4 py-2 text-sm font-bold shadow-sm hover:border-slate-300">
            Login
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2 text-sm font-bold shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
