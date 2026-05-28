"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "warning" | "danger" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start justify-between gap-3 rounded-xl border p-4 shadow-lg transition-all duration-300 animate-slide-in ${
              t.type === "success"
                ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                : t.type === "warning"
                ? "bg-amber-50 border-amber-100 text-amber-800"
                : t.type === "danger"
                ? "bg-rose-50 border-rose-100 text-rose-800"
                : "bg-blue-50 border-blue-100 text-blue-800"
            }`}
          >
            <div className="flex gap-2.5">
              {t.type === "success" && <CheckCircle size={18} className="shrink-0 mt-0.5 text-emerald-600" />}
              {t.type === "warning" && <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" />}
              {t.type === "danger" && <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-600" />}
              {t.type === "info" && <Info size={18} className="shrink-0 mt-0.5 text-blue-600" />}
              <span className="text-sm font-semibold">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
