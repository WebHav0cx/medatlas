'use client';
import { Link } from "@/lib/workflow-router";
import { Bell, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";


export function PatientNotificationItem({
  notification,
}: {
  notification: ReturnType<typeof useMockData>["state"]["patientNotifications"][number]
}) {
  const store = useMockData()
  return (
    <Link
      to={notification.href}
       data-slot={`${(notification.read ? "" : " ")}`}
      onClick={() => store.markPatientNotification(notification.id)} className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32
      "
    >
      <span>
        {notification.type === "Record Available" ? (
          <FileText size={19} />
        ) : notification.type === "Sharing Request" ? (
          <ShieldCheck size={19} />
        ) : (
          <Bell size={19} />
        )}
      </span>
      <div>
        <small>{notification.type}</small>
        <h2 className="tracking-tight not-italic">{notification.title}</h2>
        <p>{notification.message}</p>
        <time>{notification.at}</time>
      </div>
      {!notification.read && <i>Unread</i>}
      <ChevronRight size={17} />
    </Link>
  )
}
