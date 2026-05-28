import {
  formatStepLabel,
  getCategoryIcon,
  productDisplayName,
  sortRoutineEntries,
} from "@/lib/routineProducts";

type RoutineProductCardProps = {
  step: string;
  product: unknown;
  stepNumber: number;
};

export function RoutineProductCard({
  step,
  product,
  stepNumber,
}: RoutineProductCardProps) {
  const name = productDisplayName(product);
  const icon = getCategoryIcon(step);

  return (
    <div
      className="flex gap-3 bg-white p-4"
      style={{
        border: "1px solid #E2E8F0",
        borderRadius: 12,
      }}
    >
      <div
        role="img"
        aria-label={formatStepLabel(step)}
        style={{
          width: 70,
          height: 70,
          borderRadius: 12,
          background: icon.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          flexShrink: 0,
        }}
      >
        {icon.icon}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1">
        <p className="text-sm font-semibold text-[#0F172A] leading-snug">{name}</p>
        <p
          className="text-[11px] uppercase"
          style={{ color: "#64748B", letterSpacing: "0.05em" }}
        >
          Step {stepNumber}: {formatStepLabel(step)}
        </p>
      </div>
    </div>
  );
}

type RoutineProductGridProps = {
  routine: Record<string, unknown>;
};

export function RoutineProductGrid({ routine }: RoutineProductGridProps) {
  const sorted = sortRoutineEntries(routine);

  if (sorted.length === 0) {
    return (
      <p className="text-xs text-text-secondary italic px-1">No items recommended.</p>
    );
  }

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      {sorted.map(([step, product], idx) => (
        <RoutineProductCard
          key={step}
          step={step}
          product={product}
          stepNumber={idx + 1}
        />
      ))}
    </div>
  );
}
