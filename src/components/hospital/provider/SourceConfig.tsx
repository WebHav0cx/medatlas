'use client';
import { Activity, BarChart3, Building2, CalendarPlus, ClipboardCheck, FileCheck2, FileText, Home, Network, Settings, ShieldCheck, UserRound, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export type ProviderNavGroup = {
  label: string
  items: Array<[string, string, LucideIcon]>
}

export const navGroups: ProviderNavGroup[] = [
  {
    label: "Workspace",
    items: [
      ["/provider/dashboard", "Dashboard", Home],
      ["/provider/patients/search", "Patients", Users],
      ["/provider/encounters", "Encounters", CalendarPlus],
      ["/provider/providers", "Connected Providers", Building2],
    ],
  },
  {
    label: "Record Exchange",
    items: [
      ["/provider/requests", "Record Requests", ClipboardCheck],
      ["/provider/records/received", "Received Records", FileCheck2],
      ["/provider/records/facility", "Facility Records", FileText],
      ["/provider/authorizations", "Authorizations", ShieldCheck],
    ],
  },
  {
    label: "Oversight",
    items: [
      ["/provider/identity-resolution", "Identity Resolution", UserRound],
      ["/provider/exchange-monitoring", "Exchange Monitoring", Activity],
      ["/provider/reports", "Reports & Analytics", BarChart3],
      ["/provider/audit", "Audit Log", Network],
    ],
  },
  {
    label: "Administration",
    items: [
      ["/provider/users", "Users & Roles", Users],
      ["/provider/settings", "Settings", Settings],
      ["/provider/support", "Help & Support", Wrench],
    ],
  },
]

export const mobileNav = navGroups.flatMap((group) => group.items)

export type FormSectionProps = {
  title: string
  fields: string[]
}

export const datasets = {
  requests: {
    title: "Record Requests",
    subtitle: "Track incoming and outgoing record exchange workflows.",
    columns: ["Patient", "Facilities", "Record", "Status", "Updated"],
    rows: [
      [
        "Aremu Adewale",
        "CityCare → Mercy Specialist",
        "Discharge Summary",
        "Under Review",
        "24 min ago",
      ],
      [
        "Bola James",
        "Prime Diagnostics → CityCare",
        "Laboratory Report",
        "Records Received",
        "18 min ago",
      ],
      [
        "Kemi Bello",
        "CityCare → Lagoon Clinic",
        "Consultation Summary",
        "Delivered",
        "Yesterday",
      ],
    ],
  },
  received: {
    title: "Received Records",
    subtitle: "Records delivered to CityCare Hospital.",
    columns: [
      "Patient",
      "Source Facility",
      "Record Type",
      "Received",
      "Status",
    ],
    rows: [
      [
        "Aremu Adewale",
        "Mercy Specialist Hospital",
        "Discharge Summary",
        "23 Oct 2026",
        "Available",
      ],
      [
        "Bola James",
        "Prime Diagnostics",
        "Laboratory Report",
        "23 Oct 2026",
        "Available",
      ],
    ],
  },
  shared: {
    title: "Shared Records",
    subtitle: "Records released by CityCare Hospital.",
    columns: [
      "Patient",
      "Recipient",
      "Record Category",
      "Authorized By",
      "Status",
    ],
    rows: [
      [
        "Kemi Bello",
        "Lagoon Clinic",
        "Consultation Summary",
        "A. Ogunleye",
        "Delivered",
      ],
      [
        "David Okon",
        "Prime Diagnostics",
        "Referral Summary",
        "A. Ogunleye",
        "Failed",
      ],
    ],
  },
  audit: {
    title: "Audit Log",
    subtitle: "Recorded events. Audit rows cannot be edited.",
    columns: ["Timestamp", "Actor", "Role", "Action", "Resource", "Outcome"],
    rows: [
      [
        "23 Oct · 11:31",
        "Dr. T. Okafor",
        "Clinician",
        "Document access",
        "REQ-008472",
        "Success",
      ],
      [
        "23 Oct · 11:18",
        "A. Ogunleye",
        "Records Officer",
        "Record approval",
        "REQ-008472",
        "Success",
      ],
      [
        "23 Oct · 10:42",
        "Dr. T. Okafor",
        "Clinician",
        "Request created",
        "Aremu Adewale",
        "Success",
      ],
      [
        "23 Oct · 09:14",
        "S. Adeyemi",
        "Registration Officer",
        "Patient search",
        "MA-003109",
        "Success",
      ],
    ],
  },
} as const
