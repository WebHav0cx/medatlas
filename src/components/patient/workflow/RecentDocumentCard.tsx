'use client';
import { Link } from "@/lib/workflow-router";
import { ChevronRight, FileText } from "lucide-react";
import { type DocumentRecord } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { StatusBadge } from './StatusBadge';

export function RecentDocumentCard({ document }: { document: DocumentRecord }) {
  return (
    <article >
      <span>
        <FileText size={20} />
      </span>
      <div>
        <div>
          <small>{document.category}</small>
          <StatusBadge label="Available" />
        </div>
        <h3 className="tracking-tight not-italic">{document.title}</h3>
        <p>
          {document.sourceFacility} · {friendlyDate(document.date)}
        </p>
      </div>
      <Link to={`/patient/records/${document.id}`} className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32
      ">
        View record
        <ChevronRight size={16} />
      </Link>
    </article>
  )
}
