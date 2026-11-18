'use client';
import { type ReactNode } from "react";
import { FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export function PatientEmptyState({
  icon: Icon = FileText,
  title,
  text,
  action,
}: {
  icon?: LucideIcon
  title: string
  text: string
  action?: ReactNode
}) {
  return (
    <div >
      <span>
        <Icon size={24} />
      </span>
      <h2 className="tracking-tight not-italic">{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  )
}
