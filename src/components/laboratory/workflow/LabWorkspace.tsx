'use client';
import { type ReactNode } from "react";
import { useLocation } from "@/lib/workflow-router";
import { LabShell } from './LabShell';
import { LabDashboard } from './LabDashboard';
import { RequestsPage } from './RequestsPage';
import { PatientsPage } from './PatientsPage';
import { SpecimensPage } from './SpecimensPage';
import { ResultsPage } from './ResultsPage';
import { ExchangePage } from './ExchangePage';
import { FacilitiesPage } from './FacilitiesPage';
import { AdminPage } from './AdminPage';
import { type LabRole } from './SourceConfig';

export function LabWorkspace({ role }: { role: LabRole }) {
  const location = useLocation()
  const moduleKey =
    location.pathname.split(`/laboratory/${role}/`)[1] || "dashboard"
  let content: ReactNode
  if (moduleKey === "dashboard") content = <LabDashboard role={role} />
  else if (
    ["requests", "bookings", "collection", "assigned-tests"].includes(moduleKey)
  )
    content = <RequestsPage role={role} />
  else if (moduleKey === "patients") content = <PatientsPage />
  else if (moduleKey === "specimens") content = <SpecimensPage role={role} />
  else if (
    [
      "results",
      "pending-submission",
      "review-queue",
      "corrections",
      "approved",
    ].includes(moduleKey)
  )
    content = <ResultsPage role={role} mode={moduleKey} />
  else if (moduleKey === "exchange") content = <ExchangePage />
  else if (moduleKey === "facilities") content = <FacilitiesPage />
  else content = <AdminPage moduleKey={moduleKey} />
  return <LabShell role={role}>{content}</LabShell>
}
