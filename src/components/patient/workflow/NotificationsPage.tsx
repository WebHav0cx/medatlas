'use client';
import { Bell, Check } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';
import { PatientEmptyState } from './PatientEmptyState';
import { PatientNotificationItem } from './PatientNotificationItem';

export function NotificationsPage() {
  const store = useMockData()
  const notifications = store.state.patientNotifications.filter(
    (item) => item.accountId === store.currentPatientAccount.id,
  )
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Account updates"
        title="Notifications"
        subtitle="Relevant updates from your connected records and information requests."
        action={
          notifications.some((item) => !item.read) ? (
            <PatientButton
              variant="secondary"
              onClick={store.markAllPatientNotifications}
            >
              <Check size={16} />
              Mark all as read
            </PatientButton>
          ) : null
        }
      />
      {notifications.length ? (
        <section >
          {notifications.map((notification) => (
            <PatientNotificationItem
              notification={notification}
              key={notification.id}
            />
          ))}
        </section>
      ) : (
        <PatientEmptyState
          icon={Bell}
          title="No notifications yet"
          text="Relevant updates about records, requests and sharing decisions will appear here."
        />
      )}
    </div>
  )
}
