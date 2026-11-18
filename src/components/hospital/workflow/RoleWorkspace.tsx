'use client';
import { useLocation } from "@/lib/workflow-router";
import { RoleShell } from './RoleShell';
import { RoleDashboard } from './RoleDashboard';
import { ModulePage } from './ModulePage';
import { IdentityResolutionWorkspace } from './IdentityResolutionWorkspace';
import { type ProviderRole } from './SourceConfig';

export function RoleWorkspace({ role }: { role: ProviderRole }) {
  const location = useLocation()
  const moduleKey =
    location.pathname.split(`/provider/${role}/`)[1] || "dashboard"
  return (
    <RoleShell role={role}>
      {moduleKey === "dashboard" ? (
        <RoleDashboard role={role} />
      ) : moduleKey === "identity-resolution" && role === "records" ? (
        <IdentityResolutionWorkspace />
      ) : (
        <ModulePage role={role} moduleKey={moduleKey} />
      )}
    </RoleShell>
  )
}
