'use client';
import { useState } from "react";
import { Download, HeartPulse, ZoomIn, ZoomOut } from "lucide-react";
import { type DocumentRecord } from "@/stores/workflow/useMockData";
import { friendlyDate } from './friendlyDate';
import { StatusBadge } from './StatusBadge';
import { downloadRecord } from './downloadRecord';

export function PatientDocumentViewer({ document }: { document: DocumentRecord }) {
  const [zoom, setZoom] = useState(100)
  return (
    <div >
      <div >
        <div>
          <span>Page 1 of 1</span>
          <strong className="tabular-nums">{zoom}%</strong>
        </div>
        <div>
          <button
            onClick={() => setZoom((current) => Math.max(80, current - 10))}
            aria-label="Zoom out" className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            <ZoomOut size={17} />
          </button>
          <button
            onClick={() => setZoom((current) => Math.min(130, current + 10))}
            aria-label="Zoom in" className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
            "
          >
            <ZoomIn size={17} />
          </button>
          <button onClick={() => downloadRecord(document)} className="
            transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          ">
            <Download size={17} />
            <span>Download copy</span>
          </button>
        </div>
      </div>
      <div >
        <article >
          <header>
            <div>
              <span>
                <HeartPulse size={21} />
              </span>
              <div>
                <strong className="tabular-nums">{document.sourceFacility}</strong>
                <small>Original healthcare information source</small>
              </div>
            </div>
            <StatusBadge label="Released" />
          </header>
          <div >
            <span>{document.category}</span>
            <h2 className="tracking-tight not-italic">{document.title}</h2>
            <p>Patient-accessible clinical document</p>
          </div>
          <dl>
            <div>
              <dt>Document date</dt>
              <dd>{friendlyDate(document.date)}</dd>
            </div>
            <div>
              <dt>Released by</dt>
              <dd>{document.author ?? "Source facility records team"}</dd>
            </div>
            <div>
              <dt>Source facility</dt>
              <dd>{document.sourceFacility}</dd>
            </div>
            <div>
              <dt>Document reference</dt>
              <dd>{document.id.toUpperCase()}</dd>
            </div>
          </dl>
          <section>
            <h3 className="tracking-tight not-italic">Document information</h3>
            <p>
              This fictional structured preview represents the patient copy
              released by {document.sourceFacility}. It preserves source
              provenance and does not allow provider-authored content to be
              edited.
            </p>
          </section>
          <footer>Synthetic demonstration information · Page 1 of 1</footer>
        </article>
      </div>
    </div>
  )
}
