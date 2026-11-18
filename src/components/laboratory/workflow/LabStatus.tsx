'use client';
import { AlertCircle, Check, Clock3 } from "lucide-react";


const badgeClasses = `
  inline-flex min-h-6.5 w-max items-center gap-1.25 rounded-md border px-2 py-0.75 text-xs
  leading-none font-semibold whitespace-nowrap
`;

export function LabStatus({ children, className = "" }: { children: string; className?: string }) {
  const success = [
    "Approved",
    "Released",
    "Completed",
    "Acknowledged",
    "Active",
    "Received",
    "Processing Completed",
  ].some((item) => children.includes(item))
  const error = ["Rejected", "Correction", "Incomplete", "Failed"].some(
    (item) => children.includes(item),
  )
  const toneClasses = success
    ? "border-emerald-700/18 bg-emerald-50 text-emerald-700"
    : error
      ? "border-red-700/18 bg-red-50 text-red-700"
      : "border-yellow-700/18 bg-amber-50 text-amber-700"

  return (
    <span
      className={[className, badgeClasses, toneClasses].filter(Boolean).join(" ")} data-slot={`hospital-status ${(success ? "hospital-status-success" : (error ? "hospital-status-error" : "hospital-status-pending"))}`}
    >
      {success ? (
        <Check size={12} />
      ) : error ? (
        <AlertCircle size={12} />
      ) : (
        <Clock3 size={12} />
      )}
      {children}
    </span>
  )
}
