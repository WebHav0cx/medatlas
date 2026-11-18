'use client';
import { Check, Clock3 } from "lucide-react";
import { type PatientRequest } from "@/stores/workflow/useMockData";


export function RequestProgressTimeline({ request }: { request: PatientRequest }) {
  return (
    <ol >
      {request.history.map((item, index) => (
        <li key={`${item.status}-${item.at}`}>
          <span>
            {index === request.history.length - 1 ? <Clock3 /> : <Check />}
          </span>
          <div>
            <strong className="tabular-nums">{item.status}</strong>
            <small>
              {item.at} · {item.actor}
            </small>
            <p>{item.note}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
