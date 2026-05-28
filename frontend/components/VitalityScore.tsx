"use client";

export default function VitalityScore({
  score,
  label,
  description,
}: {
  score: number;
  label: string;
  description?: string;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="card flex flex-col items-center p-8 text-center">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#2563EB"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-navy">{score}</span>
          <span className="text-xs text-text-secondary">/100</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-navy">{label}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-text-secondary">{description}</p>
      )}
    </div>
  );
}
