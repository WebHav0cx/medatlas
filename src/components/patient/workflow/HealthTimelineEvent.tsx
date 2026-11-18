'use client';
import { Link } from "@/lib/workflow-router";
import { ChevronDown, FileCheck2 } from "lucide-react";
import { type DocumentRecord } from "@/stores/workflow/useMockData";


export function HealthTimelineEvent({
  document,
  isOpen,
  onToggle,
}: {
  document: DocumentRecord
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <article >
      <div >
        <strong className="tabular-nums">{new Date(`${document.date}T12:00:00`).getDate()}</strong>
        <span>
          {new Intl.DateTimeFormat("en-NG", {
            month: "short",
            year: "numeric",
          }).format(new Date(`${document.date}T12:00:00`))}
        </span>
      </div>
      <span >
        <FileCheck2 size={17} />
      </span>
      <div >
        <button onClick={onToggle} aria-expanded={isOpen} className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
        ">
          <div>
            <small>{document.category} available</small>
            <h2 className="tracking-tight not-italic">{document.title}</h2>
            <p>{document.sourceFacility}</p>
          </div>
          <ChevronDown size={18} />
        </button>
        {isOpen && (
          <div >
            <dl>
              <div>
                <dt>Healthcare facility</dt>
                <dd>{document.sourceFacility}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Released for patient access</dd>
              </div>
            </dl>
            <div>
              <Link to={`/patient/records/${document.id}`} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32
              ">
                View associated record
              </Link>
              <Link
                to={`/patient/providers/${
                  document.sourceFacility === "CityCare Hospital"
                    ? "org-citycare"
                    : document.sourceFacility === "Prime Diagnostics"
                      ? "org-prime"
                      : "org-mercy"
                }`} className="
                  transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32
                "
              >
                View provider
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
