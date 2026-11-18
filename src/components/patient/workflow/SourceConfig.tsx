'use client';
import { Activity, Bell, Building2, FileClock, FileText, HeartPulse, HelpCircle, Home, Settings, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export type Tone = "success" | "warning" | "info" | "error" | "neutral"

export const navGroups: Array<{
  label: string
  items: Array<[string, string, LucideIcon]>
}> = [
  { label: "Home", items: [["dashboard", "Dashboard", Home]] },
  {
    label: "My health",
    items: [
      ["records", "My Health Records", FileText],
      ["timeline", "Health Timeline", HeartPulse],
      ["providers", "Healthcare Providers", Building2],
    ],
  },
  {
    label: "Sharing & requests",
    items: [
      ["sharing", "Sharing & Permissions", ShieldCheck],
      ["requests", "My Requests", FileClock],
      ["activity", "Activity History", Activity],
    ],
  },
  {
    label: "Account",
    items: [
      ["notifications", "Notifications", Bell],
      ["profile", "My Profile", UserRound],
      ["settings", "Settings", Settings],
      ["help", "Help & Support", HelpCircle],
    ],
  },
]

export const mobileNav: Array<[string, string, LucideIcon]> = [
  ["dashboard", "Home", Home],
  ["records", "My Records", FileText],
  ["sharing", "Sharing", ShieldCheck],
  ["activity", "Activity", Activity],
  ["profile", "Profile", UserRound],
]

export type PatientErrorStateProps = {
  title: string
  text: string
}
