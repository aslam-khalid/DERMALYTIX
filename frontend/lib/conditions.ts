export function conditionEmoji(condition: string): string {
  const c = condition?.toLowerCase() || "";
  if (c.includes("acne")) return "🔴";
  if (c.includes("dark spot") || c.includes("melasma") || c.includes("pigment")) return "🟤";
  if (c.includes("dark circle") || c.includes("eye")) return "👁️";
  if (c.includes("dry")) return "🏜️";
  if (c.includes("oily")) return "💧";
  if (c.includes("wrinkle")) return "〰️";
  if (c.includes("rosacea")) return "🌹";
  if (c.includes("eczema")) return "🩹";
  return "✨";
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return "";
  const parsed = new Date(dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T"));
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  const iso = dateStr.split(" ")[0];
  const parts = iso.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return dateStr;
}

export function formatSkinTypeLabel(skinType: string | null | undefined): string {
  if (!skinType) return "Clinical User";
  return `${skinType.charAt(0).toUpperCase()}${skinType.slice(1)} Skin`;
}
