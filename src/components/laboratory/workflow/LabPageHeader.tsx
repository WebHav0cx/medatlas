'use client';
import { type ReactNode } from "react";


export function LabPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4 max-md:flex-col max-md:items-stretch" data-slot="hospital-page-head">
      <div>
        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Prime Diagnostics</span>
        <h1 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-mist-800 not-italic normal-nums max-md:text-2xl">{title}</h1>
        <p className="mt-1.5 text-sm leading-normal text-olive-600">{subtitle}</p>
      </div>
      {action}
    </div>
  )
}
