'use client';
import { type ReactNode } from "react";
import { Link } from "@/lib/workflow-router";
import { ArrowLeft } from "lucide-react";


export function PatientPageHeader({
  eyebrow,
  title,
  subtitle,
  action,
  back,
}: {
  eyebrow?: string
  title: string
  subtitle: string
  action?: ReactNode
  back?: string
}) {
  return (
    <div >
      <div >
        {back && (
          <Link to={back}  aria-label="Go back" className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32
          ">
            <ArrowLeft size={19} />
          </Link>
        )}
        <div>
          {eyebrow && <span>{eyebrow}</span>}
          <h1 className="tracking-tight not-italic">{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      {action && <div >{action}</div>}
    </div>
  )
}
