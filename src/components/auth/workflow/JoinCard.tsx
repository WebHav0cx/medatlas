'use client';
import { Link } from "@/lib/workflow-router";
import { ChevronRight } from "lucide-react";


export function JoinCard({
  icon,
  title,
  text,
  action,
  to,
}: {
  icon: React.ReactNode
  title: string
  text: string
  action: string
  to: string
}) {
  return (
    <Link className="
      flex min-h-76 flex-col rounded-2xl border border-mist-200 bg-white p-6 text-mist-800 no-underline
      transition duration-160 ease-in-out hover:-translate-y-0.5 hover:border-olive-400 hover:shadow-sm
      focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
      max-md:min-h-60
    " data-slot="signup-type-card" to={to}>
      <span className="grid size-11 place-items-center rounded-lg bg-emerald-50 text-emerald-900">{icon}</span>
      <h2 className="mt-5 mb-2 text-xl leading-normal font-normal tracking-tight not-italic normal-nums">{title}</h2>
      <p className="text-xs leading-relaxed text-olive-600">{text}</p>
      <strong className="mt-auto flex items-center gap-1.5 text-xs text-emerald-900 tabular-nums">
        {action}
        <ChevronRight size={16} />
      </strong>
    </Link>
  )
}
