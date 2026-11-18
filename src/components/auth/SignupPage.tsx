import Link from "next/link";
import {
  Building2,
  ChevronRight,
  LockKeyhole,
  UserRound,
  Users,
} from "lucide-react";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";

const pathways = [
  {
    Icon: Building2,
    title: "Healthcare Organisation",
    description:
      "For hospitals, clinics, primary healthcare centres, laboratories and diagnostic centres.",
    action: "Register an Organisation",
    href: "/signup/organization",
  },
  {
    Icon: Users,
    title: "Healthcare Professional",
    description:
      "Join a hospital, clinic, laboratory or diagnostic centre using an invitation from that organisation.",
    action: "Join an Existing Organisation",
    href: "/signup/professional",
  },
  {
    Icon: UserRound,
    title: "Patient",
    description:
      "Create an account to access available records and permitted sharing activities.",
    action: "Create Patient Account",
    href: "/get-started/patient",
  },
];

export function SignupPage() {
  return (
    <AuthShell wide>
      <div className="mx-auto max-w-2xl text-center">
        <AuthHeading
          eyebrow="Account setup"
          title="How would you like to join MedAtlas?"
          description="Select the pathway that matches your relationship to the healthcare network."
        />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {pathways.map(({ Icon, title, description, href, action }) => (
          <Link
            key={href}
            href={href}
            className="
              group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-colors
              duration-160 ease-in-out hover:border-emerald-600 focus-visible:outline-3
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 motion-reduce:transition-none
            "
          >
            <span className="mb-6 grid size-12 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <h2 className="mb-3 text-2xl tracking-tight text-emerald-950 not-italic">{title}</h2>
            <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
              {description}
            </p>
            <span className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
              {action}
              <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
            </span>
          </Link>
        ))}
      </div>
      {/* <div className="mx-auto mt-5 flex max-w-2xl gap-2 rounded-lg bg-blue-50 p-3 text-blue-800">
        <LockKeyhole aria-hidden="true" className="size-4 shrink-0" />
        <span className="flex flex-col text-xs leading-relaxed">
          <strong>Platform administration</strong>Platform administrative
          accounts are provisioned through restricted internal onboarding and
          are not available for public registration.
        </span>
      </div> */}
    </AuthShell>
  );
}
