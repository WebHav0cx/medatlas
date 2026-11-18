'use client';
import { Link } from "@/lib/workflow-router";
import { CircleAlert } from "lucide-react";
import { type PatientErrorStateProps } from './SourceConfig';

export function PatientErrorState({ title, text }: PatientErrorStateProps) {
  return (
    <div  role="alert">
      <span>
        <CircleAlert size={24} />
      </span>
      <h2 className="tracking-tight not-italic">{title}</h2>
      <p>{text}</p>
      <Link to="/patient/records" className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32
      ">Return to My Health Records</Link>
    </div>
  )
}
