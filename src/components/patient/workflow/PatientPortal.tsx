'use client';
import { Navigate, Route, Routes } from "@/lib/workflow-router";
import { PatientAppShell } from './PatientAppShell';
import { PatientDashboard } from './PatientDashboard';
import { RecordsPage } from './RecordsPage';
import { RecordDetailPage } from './RecordDetailPage';
import { ConnectRecordsPage } from './ConnectRecordsPage';
import { HealthTimeline } from './HealthTimeline';
import { SharingPage } from './SharingPage';
import { ProvidersPage } from './ProvidersPage';
import { ProviderDetailPage } from './ProviderDetailPage';
import { RequestsPage } from './RequestsPage';
import { NewRequestPage } from './NewRequestPage';
import { RequestDetailPage } from './RequestDetailPage';
import { ActivityPage } from './ActivityPage';
import { NotificationsPage } from './NotificationsPage';
import { ProfilePage } from './ProfilePage';
import { SettingsPage } from './SettingsPage';
import { HelpPage } from './HelpPage';

export function PatientPortal() {
  return (
    <PatientAppShell>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="records" element={<RecordsPage />} />
        <Route path="records/connect" element={<ConnectRecordsPage />} />
        <Route path="records/:documentId" element={<RecordDetailPage />} />
        <Route path="timeline" element={<HealthTimeline />} />
        <Route path="sharing" element={<SharingPage />} />
        <Route path="providers" element={<ProvidersPage />} />
        <Route path="providers/:providerId" element={<ProviderDetailPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="requests/new" element={<NewRequestPage />} />
        <Route path="requests/:requestId" element={<RequestDetailPage />} />
        <Route path="activity" element={<ActivityPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </PatientAppShell>
  )
}
