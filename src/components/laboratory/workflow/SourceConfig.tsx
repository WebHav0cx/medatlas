'use client';
import { type ReactNode } from "react";
import { Activity, AlertCircle, BarChart3, Building2, CalendarDays, ClipboardCheck, FileCheck2, FileText, FlaskConical, Home, Network, RefreshCw, Settings, ShieldCheck, TestTube2, Upload, UserCog, UserPlus, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { type AppRole } from "@/stores/workflow/useMockData";


export type LabRole = "reception" | "scientist" | "reviewer" | "admin"

export type LabNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export type LabNavGroup = {
  label: string
  items: LabNavItem[]
}

export type LabShellProps = {
  role: LabRole
  children: ReactNode
}

export type ResultsPageProps = {
  role: LabRole
  mode: string
}

export const accountRole: Record<LabRole, AppRole> = {
  reception: "lab-reception",
  scientist: "lab-scientist",
  reviewer: "lab-reviewer",
  admin: "lab-admin",
}

export const labRoleConfig: Record<LabRole, {
  title: string
  groups: LabNavGroup[]
  actions: Array<[string, string, LucideIcon]>
}> = {
  reception: {
    title: "Reception / Registration Officer",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Reception Dashboard", path: "dashboard", icon: Home },
          { label: "Test Requests", path: "requests", icon: ClipboardCheck },
          { label: "Patients", path: "patients", icon: Users },
          { label: "Bookings", path: "bookings", icon: CalendarDays },
        ],
      },
      {
        label: "Specimen Coordination",
        items: [
          { label: "Specimen Tracking", path: "specimens", icon: TestTube2 },
          { label: "Collection Queue", path: "collection", icon: FlaskConical },
        ],
      },
      {
        label: "Network",
        items: [
          {
            label: "Connected Facilities",
            path: "facilities",
            icon: Building2,
          },
        ],
      },
    ],
    actions: [
      ["Register Patient", "patients", UserPlus],
      ["Review Test Request", "requests", ClipboardCheck],
      ["Confirm Booking", "bookings", CalendarDays],
      ["Record Collection", "specimens", TestTube2],
    ],
  },
  scientist: {
    title: "Laboratory Scientist / Technician",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Scientist Dashboard", path: "dashboard", icon: Home },
          {
            label: "Assigned Tests",
            path: "assigned-tests",
            icon: FlaskConical,
          },
          { label: "Specimen Tracking", path: "specimens", icon: TestTube2 },
        ],
      },
      {
        label: "Results",
        items: [
          { label: "Results & Reports", path: "results", icon: FileText },
          {
            label: "Pending Submission",
            path: "pending-submission",
            icon: Upload,
          },
        ],
      },
      {
        label: "Network",
        items: [
          {
            label: "Connected Facilities",
            path: "facilities",
            icon: Building2,
          },
        ],
      },
    ],
    actions: [
      ["Open Assigned Test", "assigned-tests", FlaskConical],
      ["Update Specimen", "specimens", TestTube2],
      ["Enter Results", "results", FileText],
      ["Submit for Review", "pending-submission", Upload],
    ],
  },
  reviewer: {
    title: "Authorised Result Reviewer",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Review Dashboard", path: "dashboard", icon: Home },
          {
            label: "Reports Awaiting Review",
            path: "review-queue",
            icon: ClipboardCheck,
          },
          { label: "Correction Queue", path: "corrections", icon: AlertCircle },
        ],
      },
      {
        label: "Release",
        items: [
          { label: "Approved Reports", path: "approved", icon: FileCheck2 },
          { label: "Record Exchange", path: "exchange", icon: Network },
          { label: "Review History", path: "history", icon: Activity },
        ],
      },
    ],
    actions: [
      ["Review Report", "review-queue", ClipboardCheck],
      ["Request Correction", "corrections", AlertCircle],
      ["Approve Report", "review-queue", FileCheck2],
      ["View History", "history", Activity],
    ],
  },
  admin: {
    title: "Laboratory Administrator",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Administration Dashboard", path: "dashboard", icon: Home },
          { label: "Test Requests", path: "requests", icon: ClipboardCheck },
          {
            label: "Connected Facilities",
            path: "facilities",
            icon: Building2,
          },
        ],
      },
      {
        label: "Operations",
        items: [
          { label: "Exchange Monitoring", path: "exchange", icon: Network },
          { label: "Exchange History", path: "history", icon: Activity },
          { label: "Operational Reports", path: "reports", icon: BarChart3 },
        ],
      },
      {
        label: "Administration",
        items: [
          { label: "Staff & Roles", path: "staff", icon: UserCog },
          {
            label: "Departments & Services",
            path: "services",
            icon: FlaskConical,
          },
          { label: "Laboratory Settings", path: "settings", icon: Settings },
          { label: "Integrations", path: "integrations", icon: RefreshCw },
          { label: "Audit Log", path: "audit", icon: ShieldCheck },
        ],
      },
    ],
    actions: [
      ["Manage Staff", "staff", UserCog],
      ["Manage Services", "services", FlaskConical],
      ["Review Providers", "facilities", Building2],
      ["View Reports", "reports", BarChart3],
    ],
  },
}

export const workspacePath = (role: AppRole) => {
  if (role.startsWith("lab-")) {
    const segment = role.replace("lab-", "")
    return `/laboratory/${segment}/dashboard`
  }
  return `/provider/${role}/dashboard`
}
