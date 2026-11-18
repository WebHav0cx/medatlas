'use client';
import { Link } from "@/lib/workflow-router";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export function HealthSummaryCard({
  icon: Icon,
  value,
  label,
  detail,
  to,
}: {
  icon: LucideIcon
  value: number
  label: string
  detail: string
  to: string
}) {
  return (
    <Link to={to} className="
      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
      focus-visible:outline-emerald-700/32
    " >
      <span>
        <Icon size={20} />
      </span>
      <div>
        <strong className="tabular-nums">{value}</strong>
        <h3 className="tracking-tight not-italic">{label}</h3>
        <p>{detail}</p>
      </div>
      <ChevronRight size={17} />
    </Link>
  )
}
