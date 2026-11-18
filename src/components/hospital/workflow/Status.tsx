'use client';
import { AlertCircle, Check, Clock3, ShieldCheck } from "lucide-react";

const badgeClasses = `
  inline-flex min-h-6.5 w-max items-center gap-1.25 rounded-md border px-2 py-0.75 text-xs
  leading-none font-semibold whitespace-nowrap
`;

const toneClasses = {
  pending: "border-yellow-700/18 bg-amber-50 text-amber-700",
  success: "border-emerald-700/18 bg-emerald-50 text-emerald-700",
  error: "border-red-700/18 bg-red-50 text-red-700",
  info: "border-cyan-700/18 bg-blue-50 text-blue-700",
  neutral: "border-mist-200 bg-slate-50 text-slate-700",
};

export function Status({
  label,
  tone = "pending",
  className = "",
}: {
  className?: string
  label: string
  tone?: "pending" | "success" | "error" | "info" | "neutral"
}) {
  const Icon =
    tone === "success"
      ? Check
      : tone === "error"
        ? AlertCircle
        : tone === "info"
          ? ShieldCheck
          : Clock3
  return (
    <span className={[badgeClasses, toneClasses[tone], className].filter(Boolean).join(" ")} data-slot={`hospital-status hospital-status-${tone}`}>
      <Icon size={12} />
      {label}
    </span>
  )
}
