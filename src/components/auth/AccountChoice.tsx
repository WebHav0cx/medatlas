import Link from "next/link";
import { ArrowRight, Hospital, UserRound, UserRoundPlus } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";

export function AccountChoice({ signIn = false }: { signIn?: boolean }) {
  return <AuthShell wide>
    <div className="mx-auto max-w-2xl text-center"><AuthHeading eyebrow="Join the MedAtlas network" title={signIn ? "Welcome back" : "How would you like to use MedAtlas?"} description="Choose how you want to connect with the MedAtlas healthcare network." /></div>
    <div className="grid gap-5 md:grid-cols-2">
      {[
        { Icon: UserRound, title: "Patient Portal", description: "Activate access to an existing facility-registered profile or sign in to view eligible records and sharing permissions.", href: signIn ? "/login/patient" : "/get-started/patient", action: signIn ? "Patient Portal sign in" : "Activate Patient Portal" },
        { Icon: Hospital, title: "Healthcare Provider", description: "Connect your facility, manage patient identities and securely exchange records with participating healthcare providers.", href: signIn ? "/login/provider" : "/get-started/provider", action: signIn ? "Professional sign in" : "Continue as Provider" },
      ].map(({ Icon, title, description, href, action }) => <Link key={title} href={href} className="
        group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-colors
        duration-160 ease-in-out hover:border-emerald-600 focus-visible:outline-3
        focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 motion-reduce:transition-none
      ">
        <span className="mb-6 grid size-12 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><Icon aria-hidden="true" className="size-6" /></span>
        <h2 className="mb-3 text-2xl tracking-tight text-emerald-950 not-italic">{title}</h2>
        <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="flex items-center gap-2 text-sm font-semibold text-emerald-900">{action}<ArrowRight aria-hidden="true" className="size-4" /></span>
      </Link>)}
    </div>
    <div className="mt-8 space-y-4 text-center text-sm text-slate-600">
      {!signIn && <p className="flex flex-wrap items-center justify-center gap-2"><UserRoundPlus aria-hidden="true" className="size-4" />Invited by your facility? <Link href="/activate/staff" className="
        font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
      ">Activate your staff account</Link></p>}
      <p>Already have access? <Link href="/login/patient" className="
        font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
      ">Patient Portal sign in</Link>{" · "}<Link href="/login/provider" className="
        font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
      ">Professional sign in</Link></p>
    </div>
  </AuthShell>;
}
