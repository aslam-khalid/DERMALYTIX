"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Scan,
  ClipboardList,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { clearAuth, getUserName, getUserSkinType } from "@/lib/api";
import { formatSkinTypeLabel } from "@/lib/conditions";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/history", label: "Patient History", icon: FileText },
  { href: "/analysis/questionnaire", label: "Skin Analysis", icon: Scan },
  { href: "/dashboard", label: "Clinical Reports", icon: ClipboardList },
  { href: "/dashboard", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeOverride }: { activeOverride?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Clinical User");
  const [skinLabel, setSkinLabel] = useState("Clinical User");

  useEffect(() => {
    setName(getUserName() || "Clinical User");
    setSkinLabel(formatSkinTypeLabel(getUserSkinType()));
  }, []);

  const signOut = () => {
    clearAuth();
    router.push("/login");
  };

  const NavContent = () => (
    <>
      <div className="border-b border-slate-100 px-5 py-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight text-navy">
          Dermalytix
        </Link>
        <p className="text-[10px] font-bold tracking-wider text-text-secondary mt-0.5">
          CLINICAL PORTAL
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{name}</p>
            <p className="text-xs text-text-secondary">{skinLabel}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active =
            activeOverride === item.label ||
            pathname === item.href ||
            (item.href === "/analysis/questionnaire" && pathname.startsWith("/analysis"));
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm transition-all duration-150 ${
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-text-secondary hover:bg-slate-50 hover:translate-x-0.5"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-slate-100 p-4">
        <Link
          href="/analysis/questionnaire"
          className="btn-primary mb-2 flex w-full items-center justify-center gap-2 py-2.5 text-sm font-medium text-white"
        >
          <Plus size={16} />
          New Analysis
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-btn px-3 py-2 text-sm text-text-secondary hover:bg-slate-50 transition-all duration-150"
        >
          <HelpCircle size={18} /> Support
        </button>
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-btn px-3 py-2 text-sm text-text-secondary hover:bg-slate-50 transition-all duration-150"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-btn bg-white p-2 shadow-sm border border-slate-100 lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-sidebar flex-col border-r border-[#E2E8F0] bg-white lg:flex">
        <NavContent />
      </aside>
      {open && (
        <aside className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-sidebar flex-col border-r border-[#E2E8F0] bg-white shadow-xl">
            <NavContent />
          </div>
        </aside>
      )}
    </>
  );
}

export function DashboardShell({
  children,
  title,
  subtitle,
  activeOverride,
  pageTitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeOverride?: string;
  pageTitle?: string;
}) {
  const [name, setName] = useState("User");
  const today = new Date().toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setName(getUserName() || "User");
    document.title = `Dermalytix — ${pageTitle || title}`;
  }, [title, pageTitle]);

  return (
    <div className="min-h-screen bg-background lg:pl-[240px]">
      <Sidebar activeOverride={activeOverride} />
      <main className="min-h-screen p-4 pt-20 lg:p-8 lg:pt-8 page-enter">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="hidden sm:inline">{today}</span>
            <button
              type="button"
              className="relative p-1.5 hover:bg-slate-100 rounded-full transition-all duration-150 hover:scale-[1.02] text-text-secondary"
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary uppercase">
              {name.charAt(0)}
            </span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
