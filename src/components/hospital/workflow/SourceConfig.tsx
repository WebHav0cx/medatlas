'use client';
import { Activity, AlertCircle, ArrowRight, BarChart3, Building2, CalendarDays, ClipboardCheck, FileCheck2, FileText, Home, IdCard, Link2, ListChecks, Network, RefreshCw, Search, Settings, ShieldCheck, Stethoscope, Upload, UserCog, UserPlus, UserRound, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";


export type ProviderRole = "doctor" | "nurse" | "records" | "admin"

export type NavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const roleConfig: Record<ProviderRole, {
  name: string
  title: string
  initials: string
  groups: NavGroup[]
  actions: Array<[string, string, LucideIcon]>
}> = {
  doctor: {
    name: "Dr. T. Okafor",
    title: "Doctor / Clinician",
    initials: "TO",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Doctor Dashboard", path: "dashboard", icon: Home },
          { label: "Patients", path: "patients", icon: Users },
          { label: "Encounters", path: "encounters", icon: CalendarDays },
          {
            label: "Connected Providers",
            path: "connected-providers",
            icon: Building2,
          },
        ],
      },
      {
        label: "Care Coordination",
        items: [
          { label: "Referrals", path: "referrals", icon: Link2 },
          {
            label: "Diagnostic Requests",
            path: "diagnostic-requests",
            icon: Stethoscope,
          },
          { label: "Authorised Records", path: "records", icon: FileCheck2 },
        ],
      },
      {
        label: "Record Exchange",
        items: [
          { label: "Record Requests", path: "requests", icon: ClipboardCheck },
          {
            label: "Received Records",
            path: "received-records",
            icon: FileText,
          },
          {
            label: "Authorisations",
            path: "authorisations",
            icon: ShieldCheck,
          },
        ],
      },
    ],
    actions: [
      ["Find Patient", "patients", Search],
      ["Review Record", "records", FileText],
      ["Request Records", "requests", ClipboardCheck],
      ["Request Diagnostic Test", "diagnostic-requests", Stethoscope],
      ["Create Referral", "referrals", Link2],
    ],
  },
  nurse: {
    name: "Nurse A. Bello",
    title: "Nurse",
    initials: "AB",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Nursing Dashboard", path: "dashboard", icon: Home },
          {
            label: "Assigned Patients",
            path: "assigned-patients",
            icon: Users,
          },
          {
            label: "Patient Summary",
            path: "patient-summary",
            icon: UserRound,
          },
          { label: "Encounters", path: "encounters", icon: CalendarDays },
        ],
      },
      {
        label: "Care Coordination",
        items: [
          { label: "Shift Worklist", path: "worklist", icon: ListChecks },
          { label: "Tasks & Escalations", path: "tasks", icon: AlertCircle },
        ],
      },
      {
        label: "Record Exchange",
        items: [
          { label: "Permitted Records", path: "records", icon: FileCheck2 },
          {
            label: "Received Records",
            path: "received-records",
            icon: FileText,
          },
        ],
      },
    ],
    actions: [
      ["Open Assigned Patient", "assigned-patients", UserRound],
      ["Review Task", "worklist", ListChecks],
      ["View Permitted Record", "records", FileText],
      ["Escalate", "tasks", AlertCircle],
    ],
  },
  records: {
    name: "C. Adeyemi",
    title: "Medical Records Officer",
    initials: "CA",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Records Dashboard", path: "dashboard", icon: Home },
          {
            label: "Patient Registration",
            path: "registration",
            icon: UserPlus,
          },
          { label: "Patient Directory", path: "patients", icon: Users },
          {
            label: "Connected Providers",
            path: "connected-providers",
            icon: Building2,
          },
        ],
      },
      {
        label: "Record Exchange",
        items: [
          {
            label: "Incoming Requests",
            path: "incoming",
            icon: ClipboardCheck,
          },
          { label: "Outgoing Requests", path: "outgoing", icon: ArrowRight },
          {
            label: "Received Records",
            path: "received-records",
            icon: FileCheck2,
          },
          {
            label: "Facility Records",
            path: "facility-records",
            icon: FileText,
          },
          {
            label: "Authorisations",
            path: "authorisations",
            icon: ShieldCheck,
          },
          { label: "Exchange Queue", path: "exchange-queue", icon: RefreshCw },
        ],
      },
      {
        label: "Identity Management",
        items: [
          {
            label: "Patient Record Links",
            path: "patient-links",
            icon: Link2,
          },
          {
            label: "Identity Resolution",
            path: "identity-resolution",
            icon: IdCard,
          },
          {
            label: "Patient Requests",
            path: "patient-requests",
            icon: ClipboardCheck,
          },
        ],
      },
      {
        label: "Oversight",
        items: [
          {
            label: "Exchange Monitoring",
            path: "exchange-monitoring",
            icon: Activity,
          },
          {
            label: "Reports & Analytics",
            path: "reports-analytics",
            icon: BarChart3,
          },
          { label: "Exchange History", path: "history", icon: Network },
          { label: "Audit Log", path: "audit-log", icon: Activity },
        ],
      },
    ],
    actions: [
      ["Register Patient", "registration", UserPlus],
      ["Review Identity Case", "identity-resolution", IdCard],
      ["Process Incoming Request", "incoming", ClipboardCheck],
      ["Prepare Document Exchange", "exchange-queue", Upload],
    ],
  },
  admin: {
    name: "F. Musa",
    title: "Hospital Administrator",
    initials: "FM",
    groups: [
      {
        label: "Workspace",
        items: [
          { label: "Admin Dashboard", path: "dashboard", icon: Home },
          { label: "Connected Providers", path: "providers", icon: Building2 },
        ],
      },
      {
        label: "Record Exchange",
        items: [
          {
            label: "Record Requests",
            path: "record-requests",
            icon: ClipboardCheck,
          },
          {
            label: "Authorisations",
            path: "authorisations",
            icon: ShieldCheck,
          },
          {
            label: "Exchange Monitoring",
            path: "exchange-monitoring",
            icon: Activity,
          },
        ],
      },
      {
        label: "Identity Management",
        items: [
          {
            label: "Identity Resolution",
            path: "identity-resolution",
            icon: IdCard,
          },
        ],
      },
      {
        label: "Oversight",
        items: [
          { label: "Reports & Analytics", path: "reports", icon: BarChart3 },
          { label: "Audit Log", path: "audit", icon: Activity },
        ],
      },
      {
        label: "Administration",
        items: [
          { label: "Staff & Roles", path: "staff", icon: UserCog },
          { label: "Facility Settings", path: "facility", icon: Settings },
          { label: "Integrations", path: "integrations", icon: Network },
        ],
      },
    ],
    actions: [
      ["Invite Staff", "staff", UserPlus],
      ["Review Permissions", "staff", ShieldCheck],
      ["Manage Facility", "facility", Building2],
      ["Open Reports", "reports", BarChart3],
    ],
  },
}

export const dashboardData = {
  doctor: {
    greeting: "Good morning, Dr. Okafor",
    subtitle: "Your authorised patient and information coordination overview.",
    metrics: [
      ["8", "Today's patients"],
      ["4", "Authorised records"],
      ["3", "Referral follow-ups"],
      ["2", "Incoming updates"],
    ],
    attention: [
      [
        "Aremu Adewale",
        "Review received discharge summary",
        "Authorised",
        "11:15 AM",
      ],
      ["Bola James", "Referral acknowledgement pending", "Pending", "10:30 AM"],
      [
        "Kemi Bello",
        "Requested laboratory results available",
        "Approved",
        "Yesterday",
      ],
    ],
  },
  nurse: {
    greeting: "Good morning, Nurse Bello",
    subtitle: "Your shift assignments and coordination workload.",
    metrics: [
      ["12", "Assigned patients"],
      ["7", "Open tasks"],
      ["2", "Priority updates"],
      ["1", "Escalated"],
    ],
    attention: [
      [
        "Aremu Adewale",
        "Confirm external record received",
        "Assigned",
        "11:30 AM",
      ],
      ["Bola James", "Coordinate diagnostic handover", "Pending", "12:00 PM"],
      [
        "Kemi Bello",
        "Follow up referral acknowledgement",
        "Escalated",
        "Today",
      ],
    ],
  },
  records: {
    greeting: "Records operations",
    subtitle:
      "Identity, request and document exchange queues for CityCare Hospital.",
    metrics: [
      ["5", "Incoming requests"],
      ["4", "Outgoing requests"],
      ["2", "Identity reviews"],
      ["3", "Documents to verify"],
    ],
    attention: [
      ["REQ-008472", "Discharge summary request", "Review required", "24 min"],
      ["IDR-00219", "Possible duplicate identity", "Manual review", "1 hr"],
      ["EXC-004812", "Document integrity check", "Pending", "2 hrs"],
    ],
  },
  admin: {
    greeting: "Facility administration",
    subtitle: "Staff access, service health and operational oversight.",
    metrics: [
      ["12", "Active staff"],
      ["3", "Connected providers"],
      ["1", "Integration alert"],
      ["94%", "Service availability"],
    ],
    attention: [
      [
        "Access review",
        "Quarterly clinician permission review",
        "Due soon",
        "2 days",
      ],
      [
        "Integration",
        "Facility connector not configured",
        "Action needed",
        "Today",
      ],
      ["Compliance", "Two delayed exchange events", "Investigate", "Today"],
    ],
  },
}

export type ModuleDefinition = {
  title: string
  subtitle: string
  primary?: string
  columns: string[]
  rows: string[][]
  denied?: boolean
}

export const modules: Record<string, ModuleDefinition> = {
  "doctor/patients": {
    title: "Patients",
    subtitle:
      "Patients with an authorised care relationship to you or your service.",
    primary: "Find Patient",
    columns: [
      "Patient",
      "MedAtlas ID",
      "Relationship",
      "Latest Encounter",
      "Access",
    ],
    rows: [
      [
        "Aremu Adewale",
        "MA-002841",
        "Current encounter",
        "23 Oct 2026",
        "Authorised",
      ],
      [
        "Bola James",
        "MA-003109",
        "Referral follow-up",
        "22 Oct 2026",
        "Authorised",
      ],
      ["Kemi Bello", "MA-004721", "Care team", "21 Oct 2026", "Limited"],
    ],
  },
  "doctor/encounters": {
    title: "Encounters",
    subtitle: "Relevant encounter summaries and linked document metadata.",
    columns: ["Patient", "Encounter", "Facility", "Date", "Documents"],
    rows: [
      [
        "Aremu Adewale",
        "Outpatient",
        "CityCare Hospital",
        "23 Oct 2026",
        "1 linked",
      ],
      [
        "Aremu Adewale",
        "Inpatient",
        "Mercy Specialist Hospital",
        "14 Mar 2026",
        "2 authorised",
      ],
      [
        "Bola James",
        "Diagnostic",
        "Prime Diagnostics",
        "22 Oct 2026",
        "1 available",
      ],
    ],
  },
  "doctor/records": {
    title: "Authorised Records",
    subtitle: "Clinical documents currently permitted for your review.",
    primary: "Review Selected Record",
    columns: [
      "Document",
      "Patient",
      "Origin Facility",
      "Record Date",
      "Access",
    ],
    rows: [
      [
        "Discharge Summary",
        "Aremu Adewale",
        "Mercy Specialist Hospital",
        "14 Mar 2026",
        "Approved",
      ],
      [
        "Laboratory Results",
        "Bola James",
        "Prime Diagnostics",
        "22 Oct 2026",
        "Approved",
      ],
      [
        "Consultation Summary",
        "Kemi Bello",
        "Lagoon Clinic",
        "21 Oct 2026",
        "Expires soon",
      ],
    ],
  },
  "doctor/referrals": {
    title: "Referrals",
    subtitle: "Create and track interoperability referral packages.",
    primary: "Create Referral",
    columns: [
      "Patient",
      "Destination",
      "Reason",
      "Attachments",
      "Acknowledgement",
    ],
    rows: [
      [
        "Bola James",
        "Prime Diagnostics",
        "Diagnostic review",
        "1 permitted",
        "Pending",
      ],
      [
        "Kemi Bello",
        "Lagoon Clinic",
        "Follow-up care",
        "2 permitted",
        "Acknowledged",
      ],
    ],
  },
  "doctor/requests": {
    title: "Record Requests",
    subtitle: "Request and monitor additional clinical information.",
    primary: "New Record Request",
    columns: [
      "Patient",
      "Source Facility",
      "Record Type",
      "Authorisation",
      "Status",
    ],
    rows: [
      [
        "Aremu Adewale",
        "Mercy Specialist Hospital",
        "Discharge Summary",
        "Verified basis",
        "Records Received",
      ],
      [
        "Bola James",
        "Prime Diagnostics",
        "Laboratory Results",
        "Under review",
        "Pending",
      ],
    ],
  },
  "nurse/assigned-patients": {
    title: "Assigned Patients",
    subtitle: "Your authorised shift worklist and coordination status.",
    columns: ["Patient", "Service", "Location", "Summary", "Task Status"],
    rows: [
      [
        "Aremu Adewale",
        "Internal Medicine",
        "Clinic Bay 3",
        "External record received",
        "Assigned",
      ],
      ["Bola James", "Diagnostics", "Day Unit", "Handover pending", "Pending"],
      [
        "Kemi Bello",
        "Medical Ward",
        "Ward B",
        "Referral follow-up",
        "Escalated",
      ],
    ],
  },
  "nurse/patient-summary": {
    title: "Patient Summary",
    subtitle: "Permitted demographic and care-coordination context only.",
    columns: [
      "Patient",
      "MedAtlas ID",
      "Current Service",
      "Authorisation",
      "Last Update",
    ],
    rows: [
      [
        "Aremu Adewale",
        "MA-002841",
        "Internal Medicine",
        "Assigned care team",
        "11:20 AM",
      ],
      [
        "Bola James",
        "MA-003109",
        "Diagnostics",
        "Assigned care team",
        "10:45 AM",
      ],
    ],
  },
  "nurse/worklist": {
    title: "Shift Worklist",
    subtitle: "Assigned, pending, completed and escalated coordination tasks.",
    primary: "Review Task",
    columns: ["Task", "Patient", "Assigned By", "Due", "Status"],
    rows: [
      [
        "Confirm external document availability",
        "Aremu Adewale",
        "Dr. T. Okafor",
        "11:30 AM",
        "Assigned",
      ],
      [
        "Coordinate diagnostic handover",
        "Bola James",
        "Dr. T. Okafor",
        "12:00 PM",
        "Pending",
      ],
      [
        "Follow up referral acknowledgement",
        "Kemi Bello",
        "Dr. T. Okafor",
        "Today",
        "Escalated",
      ],
    ],
  },
  "nurse/records": {
    title: "Permitted Records",
    subtitle: "Documents available within your role and assigned relationship.",
    columns: ["Document", "Patient", "Origin", "Permission", "Status"],
    rows: [
      [
        "Discharge Summary",
        "Aremu Adewale",
        "Mercy Specialist Hospital",
        "Read-only summary",
        "Approved",
      ],
      [
        "Laboratory Results",
        "Bola James",
        "Prime Diagnostics",
        "No access",
        "Access denied",
      ],
    ],
  },
  "nurse/tasks": {
    title: "Tasks & Escalations",
    subtitle:
      "Complete coordination steps or escalate to the responsible clinician.",
    primary: "Escalate Selected Task",
    columns: ["Task", "Patient", "Responsible Clinician", "Priority", "Status"],
    rows: [
      [
        "Referral acknowledgement",
        "Kemi Bello",
        "Dr. T. Okafor",
        "High",
        "Escalated",
      ],
      [
        "External record review confirmation",
        "Aremu Adewale",
        "Dr. T. Okafor",
        "Routine",
        "Pending",
      ],
    ],
  },
  "records/registration": {
    title: "Patient Registration",
    subtitle:
      "Capture demographics, check duplicates and establish verification status.",
    primary: "Register Patient",
    columns: [
      "Patient",
      "Local ID",
      "Duplicate Check",
      "Verification",
      "Status",
    ],
    rows: [
      [
        "Aremu Adewale",
        "CH-29384",
        "Possible match reviewed",
        "Verified",
        "Linked",
      ],
      [
        "New registration draft",
        "CH-29408",
        "Required",
        "Not started",
        "Draft",
      ],
    ],
  },
  "records/identity-resolution": {
    title: "Identity Resolution",
    subtitle:
      "Manually review potential duplicates. Uncertain identities are never auto-merged.",
    primary: "Review Identity Case",
    columns: ["Case", "Candidate A", "Candidate B", "Evidence", "Status"],
    rows: [
      [
        "IDR-00219",
        "MA-002841",
        "MA-009331",
        "Name · DOB · masked phone",
        "Manual review",
      ],
      [
        "IDR-00215",
        "MA-003109",
        "MA-008471",
        "Name · local identifier",
        "Verification requested",
      ],
    ],
  },
  "records/patients": {
    title: "Patient Directory",
    subtitle: "Inspect demographic profiles and approved identity mappings.",
    columns: ["Patient", "MedAtlas ID", "Local ID", "Mapping", "Verification"],
    rows: [
      ["Aremu Adewale", "MA-002841", "CH-29384", "CityCare linked", "Verified"],
      ["Bola James", "MA-003109", "CH-29391", "CityCare linked", "Verified"],
    ],
  },
  "records/incoming": {
    title: "Incoming Requests",
    subtitle:
      "Review requester, purpose, authorisation and requested documents.",
    primary: "Process Request",
    columns: [
      "Request",
      "Patient",
      "Requesting Organisation",
      "Purpose",
      "Status",
    ],
    rows: [
      [
        "REQ-008472",
        "Aremu Adewale",
        "CityCare Hospital",
        "Continuity of Care",
        "Under Review",
      ],
      [
        "REQ-008481",
        "Kemi Bello",
        "Lagoon Clinic",
        "Referral",
        "Authorisation needed",
      ],
    ],
  },
  "records/outgoing": {
    title: "Outgoing Requests",
    subtitle: "Prepare, send and track requests to participating providers.",
    primary: "Prepare Request",
    columns: ["Request", "Patient", "Destination", "Record Types", "Status"],
    rows: [
      [
        "REQ-008472",
        "Aremu Adewale",
        "Mercy Specialist Hospital",
        "Discharge Summary",
        "Records Received",
      ],
      [
        "REQ-008490",
        "Bola James",
        "Prime Diagnostics",
        "Laboratory Results",
        "Delivered",
      ],
    ],
  },
  "records/exchange-queue": {
    title: "Exchange Queue",
    subtitle:
      "Document preparation, integrity review and acknowledgement status.",
    primary: "Prepare Document Exchange",
    columns: [
      "Exchange",
      "Document",
      "Integrity Check",
      "Transmission",
      "Acknowledgement",
    ],
    rows: [
      [
        "EXC-004812",
        "Discharge_Summary_14Mar2026.pdf",
        "Passed",
        "Prepared",
        "Pending",
      ],
      [
        "EXC-004809",
        "Lab_Result_22Oct2026.pdf",
        "Passed",
        "Failed",
        "Not received",
      ],
    ],
  },
  "records/history": {
    title: "Exchange History",
    subtitle:
      "Auditable record of responsible actor, organisation, action and outcome.",
    columns: ["Timestamp", "Actor", "Organisation", "Action", "Outcome"],
    rows: [
      [
        "23 Oct · 11:31",
        "Dr. T. Okafor",
        "CityCare Hospital",
        "Document accessed",
        "Success",
      ],
      [
        "23 Oct · 11:18",
        "C. Adeyemi",
        "Mercy Specialist Hospital",
        "Release approved",
        "Success",
      ],
      [
        "23 Oct · 10:42",
        "Dr. T. Okafor",
        "CityCare Hospital",
        "Request created",
        "Success",
      ],
    ],
  },
  "admin/staff": {
    title: "Staff & Roles",
    subtitle: "Invite, deactivate and review approved facility access.",
    primary: "Invite Staff",
    columns: [
      "Staff Member",
      "Role",
      "Department",
      "Access Status",
      "Last Active",
    ],
    rows: [
      [
        "Dr. T. Okafor",
        "Doctor / Clinician",
        "Internal Medicine",
        "Active",
        "Now",
      ],
      ["Nurse A. Bello", "Nurse", "Medical Ward", "Active", "12 min ago"],
      [
        "C. Adeyemi",
        "Medical Records Officer",
        "Health Records",
        "Active",
        "18 min ago",
      ],
    ],
  },
  "admin/facility": {
    title: "Facility Settings",
    subtitle: "Facility profile, departments, contacts and supported services.",
    primary: "Manage Facility",
    columns: ["Setting", "Value", "Verification", "Updated By", "Status"],
    rows: [
      [
        "Facility Profile",
        "CityCare Hospital · Lagos",
        "Verified",
        "F. Musa",
        "Current",
      ],
      [
        "Supported Services",
        "Hospital · Diagnostics",
        "Reviewed",
        "F. Musa",
        "Current",
      ],
      [
        "Contact Details",
        "Operations contact configured",
        "Verified",
        "F. Musa",
        "Current",
      ],
    ],
  },
  "admin/providers": {
    title: "Connected Providers",
    subtitle: "Participating providers and verified relationship status.",
    columns: ["Provider", "Type", "Location", "Relationship", "Status"],
    rows: [
      [
        "Mercy Specialist Hospital",
        "Hospital",
        "Ikeja, Lagos",
        "Verified",
        "Connected",
      ],
      [
        "Prime Diagnostics",
        "Diagnostic Centre",
        "Victoria Island, Lagos",
        "Verified",
        "Connected",
      ],
      [
        "Lagoon Clinic",
        "Clinic",
        "Surulere, Lagos",
        "Verification pending",
        "Limited",
      ],
    ],
  },
  "admin/integrations": {
    title: "Integrations",
    subtitle:
      "API readiness, configuration errors and planned interoperability capabilities.",
    columns: [
      "Integration",
      "Standard",
      "Configuration",
      "Last Check",
      "Status",
    ],
    rows: [
      [
        "Facility Connector",
        "FHIR-ready architecture",
        "Not configured",
        "Today",
        "Unavailable",
      ],
      [
        "Document Exchange",
        "Secure package workflow",
        "Local adapter",
        "Today",
        "Not active",
      ],
      [
        "National Health Integration",
        "No active connection",
        "Unavailable",
        "N/A",
        "Not connected",
      ],
    ],
  },
  "admin/reports": {
    title: "Reports",
    subtitle: "Aggregated exchange activity and operational performance.",
    primary: "Export Report",
    columns: [
      "Metric",
      "Current Period",
      "Previous Period",
      "Change",
      "Status",
    ],
    rows: [
      ["Successful exchanges", "148", "132", "+12%", "Improved"],
      ["Median response time", "38 min", "45 min", "-7 min", "Improved"],
      ["Failed transfers", "3", "4", "-1", "Review"],
    ],
  },
  "admin/audit": {
    title: "Audit Log",
    subtitle: "Filterable security, access and facility administration events.",
    columns: ["Timestamp", "Actor", "Role", "Action", "Outcome"],
    rows: [
      [
        "23 Oct · 11:31",
        "Dr. T. Okafor",
        "Clinician",
        "Document access",
        "Success",
      ],
      [
        "23 Oct · 11:18",
        "C. Adeyemi",
        "Records Officer",
        "Release approval",
        "Success",
      ],
      ["23 Oct · 09:14", "F. Musa", "Administrator", "Role review", "Success"],
    ],
  },
}

export const sharedModules: Record<string, ModuleDefinition> = {
  "connected-providers": {
    title: "Connected Providers",
    subtitle:
      "Verified participating facilities available for authorised coordination and exchange.",
    columns: [
      "Provider",
      "Facility Type",
      "Location",
      "Supported Records",
      "Connection",
    ],
    rows: [
      [
        "Mercy Specialist Hospital",
        "Hospital",
        "Ikeja, Lagos",
        "Discharge · Medication · Laboratory",
        "Connected",
      ],
      [
        "Prime Diagnostics",
        "Diagnostic Centre",
        "Victoria Island, Lagos",
        "Imaging · Laboratory",
        "Connected",
      ],
      [
        "Lagoon Clinic",
        "Clinic",
        "Surulere, Lagos",
        "Consultation Summary",
        "Sync delayed",
      ],
    ],
  },
  "received-records": {
    title: "Received Records",
    subtitle:
      "Authorised documents delivered to CityCare Hospital with source provenance.",
    primary: "Review Selected Record",
    columns: ["Patient", "Document", "Source Facility", "Received", "Access"],
    rows: [
      [
        "Aremu Adewale",
        "Discharge Summary",
        "Mercy Specialist Hospital",
        "23 Oct · 11:24",
        "Approved",
      ],
      [
        "Bola James",
        "Laboratory Results",
        "Prime Diagnostics",
        "23 Oct · 10:18",
        "Approved",
      ],
      [
        "Kemi Bello",
        "Consultation Summary",
        "Lagoon Clinic",
        "22 Oct · 16:40",
        "Limited",
      ],
    ],
  },
  authorisations: {
    title: "Authorisations",
    subtitle: "Patient consent, legal-basis and source-facility review states.",
    columns: [
      "Request",
      "Patient",
      "Authorisation Basis",
      "Source Review",
      "Status",
    ],
    rows: [
      [
        "REQ-008472",
        "Aremu Adewale",
        "Continuity of care",
        "Verified",
        "Approved",
      ],
      [
        "REQ-008481",
        "Kemi Bello",
        "Patient consent required",
        "Pending",
        "Pending",
      ],
      ["REQ-008466", "Bola James", "Referral", "Verified", "Completed"],
    ],
  },
  encounters: {
    title: "Encounters",
    subtitle:
      "Authorised encounter metadata used for coordination and record discovery.",
    columns: [
      "Patient",
      "Encounter Type",
      "Facility",
      "Encounter Date",
      "Records",
    ],
    rows: [
      [
        "Aremu Adewale",
        "Outpatient",
        "CityCare Hospital",
        "23 Oct 2026",
        "Consultation Summary",
      ],
      [
        "Bola James",
        "Diagnostic",
        "Prime Diagnostics",
        "22 Oct 2026",
        "Laboratory Results",
      ],
      [
        "Kemi Bello",
        "Inpatient",
        "CityCare Hospital",
        "21 Oct 2026",
        "Discharge Summary",
      ],
    ],
  },
  "facility-records": {
    title: "Facility Records",
    subtitle:
      "Source-controlled document availability, validation and release preparation.",
    primary: "Register Record Availability",
    columns: [
      "Patient",
      "Document",
      "Encounter",
      "Integrity Check",
      "Release State",
    ],
    rows: [
      [
        "Aremu Adewale",
        "Consultation_23Oct2026.pdf",
        "ENC-2026-1048",
        "Passed",
        "Available",
      ],
      [
        "Bola James",
        "Lab_Result_22Oct2026.pdf",
        "ENC-2026-1041",
        "Passed",
        "Prepared",
      ],
      [
        "Kemi Bello",
        "Discharge_21Oct2026.pdf",
        "ENC-2026-0984",
        "Review required",
        "Pending",
      ],
    ],
  },
  "exchange-monitoring": {
    title: "Exchange Monitoring",
    subtitle:
      "Pending, delayed and failed transfers with acknowledgement and escalation state.",
    columns: ["Exchange", "Route", "Last Attempt", "Acknowledgement", "Status"],
    rows: [
      [
        "EXC-004812",
        "Mercy → CityCare",
        "23 Oct · 11:22",
        "Awaiting receipt",
        "Delayed",
      ],
      [
        "EXC-004809",
        "Prime → CityCare",
        "23 Oct · 10:48",
        "Not received",
        "Failed",
      ],
      [
        "EXC-004806",
        "CityCare → Lagoon",
        "23 Oct · 10:32",
        "Received",
        "Completed",
      ],
    ],
  },
  "reports-analytics": {
    title: "Reports & Analytics",
    subtitle: "Aggregated request, exchange and response-time performance.",
    primary: "Export Report",
    columns: [
      "Metric",
      "Current Period",
      "Previous Period",
      "Change",
      "Status",
    ],
    rows: [
      ["Successful exchanges", "148", "132", "+12%", "Improved"],
      ["Median response time", "38 min", "45 min", "-7 min", "Improved"],
      ["Failed transfers", "3", "4", "-1", "Review"],
    ],
  },
  "audit-log": {
    title: "Audit Log",
    subtitle: "Role-restricted security, access and exchange event history.",
    columns: ["Timestamp", "Actor", "Organisation", "Action", "Outcome"],
    rows: [
      [
        "23 Oct · 11:31",
        "Dr. T. Okafor",
        "CityCare Hospital",
        "Document accessed",
        "Success",
      ],
      [
        "23 Oct · 11:18",
        "C. Adeyemi",
        "CityCare Hospital",
        "Release prepared",
        "Success",
      ],
      [
        "23 Oct · 10:42",
        "Dr. T. Okafor",
        "CityCare Hospital",
        "Request created",
        "Success",
      ],
    ],
  },
  "record-requests": {
    title: "Record Requests",
    subtitle:
      "Facility-level request volumes and workflow states without unrestricted document access.",
    columns: ["Request", "Patient Reference", "Route", "Purpose", "Status"],
    rows: [
      [
        "REQ-008472",
        "MA-002841",
        "CityCare → Mercy",
        "Continuity of Care",
        "Under Review",
      ],
      [
        "REQ-008481",
        "MA-004721",
        "Lagoon → CityCare",
        "Referral",
        "Authorisation needed",
      ],
      [
        "REQ-008466",
        "MA-003109",
        "CityCare → Prime",
        "Diagnostic follow-up",
        "Completed",
      ],
    ],
  },
  "identity-resolution": {
    title: "Identity Resolution Oversight",
    subtitle:
      "Restricted review of identity cases without administrator access to clinical documents.",
    columns: [
      "Case",
      "Candidate References",
      "Evidence",
      "Assigned Reviewer",
      "Status",
    ],
    rows: [
      [
        "IDR-00219",
        "MA-002841 · MA-009331",
        "Demographic match",
        "C. Adeyemi",
        "Manual review",
      ],
      [
        "IDR-00215",
        "MA-003109 · MA-008471",
        "Local identifier conflict",
        "C. Adeyemi",
        "Verification requested",
      ],
    ],
  },
}

export const sharedAccess: Record<ProviderRole, string[]> = {
  doctor: ["connected-providers", "received-records", "authorisations"],
  nurse: ["encounters", "received-records"],
  records: [
    "connected-providers",
    "received-records",
    "facility-records",
    "authorisations",
    "exchange-monitoring",
    "reports-analytics",
    "audit-log",
    "patient-links",
    "patient-requests",
  ],
  admin: [
    "record-requests",
    "authorisations",
    "exchange-monitoring",
    "identity-resolution",
  ],
}
