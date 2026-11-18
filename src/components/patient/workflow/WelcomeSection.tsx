'use client';
import { Link } from "@/lib/workflow-router";
import { Link2 } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";


export function WelcomeSection() {
  const store = useMockData()
  const firstName = store.currentPatientAccount.fullName.split(" ")[0]
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"
  return (
    <section >
      <div>
        <span>My health overview</span>
        <h1 className="tracking-tight not-italic">
          {greeting}, {firstName}
        </h1>
        <p>Your health information, all in one place.</p>
      </div>
      <Link to="/patient/records/connect" className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32
      ">
        <Link2 size={17} />
        Connect my records
      </Link>
    </section>
  )
}
