'use client';
import { Route, Routes, useLocation } from "@/lib/workflow-router";
import { AlertCircle } from "lucide-react";
import { ProviderShell } from './ProviderShell';
import { PatientSearchPage } from './PatientSearchPage';
import { EmptyState } from './EmptyState';
import { NewPatient } from './NewPatient';
import { DataPage } from './DataPage';
import { UsersPage } from './UsersPage';
import { SettingsPage } from './SettingsPage';
import { PatientProfile } from './PatientProfile';
import { ProviderDashboardPage } from './ProviderDashboardPage';
import { EncountersPage } from './EncountersPage';
import { ConnectedProvidersPage } from './ConnectedProvidersPage';
import { FacilityRecordsPage } from './FacilityRecordsPage';
import { AuthorizationsPage } from './AuthorizationsPage';
import { IdentityResolutionPage } from './IdentityResolutionPage';
import { ExchangeMonitoringPage } from './ExchangeMonitoringPage';
import { ReportsPage } from './ReportsPage';
import { SupportPage } from './SupportPage';

export function ProviderWorkspace() {
  const { pathname } = useLocation()
  return (
    <ProviderShell>
      <Routes>
        <Route path="dashboard" element={<ProviderDashboardPage />} />
        <Route path="patients/search" element={<PatientSearchPage />} />
        <Route path="patients/new" element={<NewPatient />} />
        <Route path="patients/:patientId" element={<PatientProfile />} />
        <Route path="encounters" element={<EncountersPage />} />
        <Route path="providers" element={<ConnectedProvidersPage />} />
        <Route path="requests" element={<DataPage kind="requests" />} />
        <Route path="records/received" element={<DataPage kind="received" />} />
        <Route path="records/shared" element={<DataPage kind="shared" />} />
        <Route path="records/facility" element={<FacilityRecordsPage />} />
        <Route path="authorizations" element={<AuthorizationsPage />} />
        <Route
          path="identity-resolution"
          element={<IdentityResolutionPage />}
        />
        <Route
          path="exchange-monitoring"
          element={<ExchangeMonitoringPage />}
        />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="audit" element={<DataPage kind="audit" />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route
          path="*"
          element={
            <EmptyState
              icon={<AlertCircle />}
              title="Page unavailable"
              text={`No page is configured for ${pathname}.`}
            />
          }
        />
      </Routes>
    </ProviderShell>
  )
}
