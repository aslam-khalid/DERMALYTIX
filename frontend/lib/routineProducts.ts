/** Category icon styling — keyed by routine step only, never by product name. */
export const CATEGORY_ICONS = {
  cleanser: { icon: "🧴", bg: "#EFF6FF", color: "#2563EB" },
  serum: { icon: "💧", bg: "#F0FDF4", color: "#16A34A" },
  moisturiser: { icon: "🫙", bg: "#FFF7ED", color: "#EA580C" },
  sunscreen: { icon: "☀️", bg: "#FEFCE8", color: "#CA8A04" },
  eye_cream: { icon: "👁️", bg: "#FAF5FF", color: "#9333EA" },
  treatment: { icon: "⚗️", bg: "#FFF1F2", color: "#E11D48" },
} as const;

export type CategoryIconStyle = (typeof CATEGORY_ICONS)[keyof typeof CATEGORY_ICONS];

const STEP_ORDER = [
  "cleanser",
  "serum",
  "moisturiser",
  "moisturizer",
  "sunscreen",
  "eye_cream",
  "treatment",
];

export function normalizeStepKey(step: string): string {
  return step.toLowerCase().replace(/\s+/g, "_");
}

/** Icon style from step/category key only. Unknown steps → moisturiser. */
export function getCategoryIcon(step: string): CategoryIconStyle {
  const key = step.toLowerCase().replace(/\s+/g, "_");
  if (key === "moisturizer") return CATEGORY_ICONS.moisturiser;
  return CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS] ?? CATEGORY_ICONS.moisturiser;
}

export function formatStepLabel(step: string): string {
  return normalizeStepKey(step).replace(/_/g, " ").toUpperCase();
}

export function productDisplayName(product: unknown): string {
  if (Array.isArray(product)) return String(product[0] ?? "");
  return String(product ?? "");
}

export function sortRoutineEntries(
  routine: Record<string, unknown>
): [string, unknown][] {
  return Object.entries(routine).sort(([a], [b]) => {
    const ia = STEP_ORDER.indexOf(normalizeStepKey(a));
    const ib = STEP_ORDER.indexOf(normalizeStepKey(b));
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}
