"use client";
import { Building2, UserRound, Users } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { JoinCard } from "./JoinCard";

export function SignupSelection() {
  return (
    <AuthShell>
      <div className="mx-auto mb-8 max-w-168 text-center" data-slot="auth-heading">
        <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">Account setup</span>
        <h1 className="my-2 text-4xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums max-md:text-3xl">How would you like to join MedAtlas?</h1>
        <p className="text-xs leading-relaxed text-olive-600">
          Select the pathway that matches your relationship to the healthcare
          network.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3 max-md:grid-cols-1" data-slot="signup-type-grid">
        <JoinCard
          icon={<Building2 />}
          title="Healthcare Organisation"
          text="For hospitals, clinics, primary healthcare centres, laboratories and diagnostic centres."
          action="Register an Organisation"
          to="/signup/organization"
        />
        <JoinCard
          icon={<Users />}
          title="Healthcare Professional"
          text="Join a hospital, clinic, laboratory or diagnostic centre using an invitation from that organisation."
          action="Join an Existing Organisation"
          to="/signup/professional"
        />
        <JoinCard
          icon={<UserRound />}
          title="Patient"
          text="Create an account to access available records and permitted sharing activities."
          action="Create Patient Account"
          to="/get-started/patient"
        />
      </div>
      {/* <div className="max-w-168 mt-5 mr-auto mb-0 ml-auto p-3 flex gap-2 rounded-lg bg-blue-50 text-blue-700">
        <LockKeyhole size={17} />
        <span className="flex flex-col text-xs leading-normal">
          <strong>Platform administration</strong>Platform administrative
          accounts are provisioned through restricted internal onboarding and
          are not available for public registration.
        </span>
      </div> */}
    </AuthShell>
  );
}
