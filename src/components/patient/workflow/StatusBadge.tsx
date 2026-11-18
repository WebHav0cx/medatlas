'use client';
import { Activity, CheckCircle2, CircleAlert, Clock3, Info } from "lucide-react";
import { toneForStatus } from './toneForStatus';

export function StatusBadge({ label }: { label: string }) {
  const tone = toneForStatus(label)
  const Icon =
    tone === "success"
      ? CheckCircle2
      : tone === "error"
        ? CircleAlert
        : tone === "warning"
          ? Clock3
          : tone === "info"
            ? Activity
            : Info
  return (
    <span >
      <Icon size={14} />
      {label}
    </span>
  )
}
