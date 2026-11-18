import { ArrowRight } from "lucide-react";
import ExperienceLink from "../common/ExperienceLink";

const steps = ["Register and verify your facility", "Connect staff and patient identities", "Discover and request relevant records", "Approve and exchange securely"];

export default function ProviderJourney() {
  return (
    <section id="providers" aria-labelledby="providers-heading" className="scroll-mt-20 bg-emerald-950 px-6 py-24 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-24">
        <div>
          <span className="
            mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest
            text-lime-300 uppercase
          ">For providers</span>
          <h2 id="providers-heading" className="mb-5 font-serif text-4xl md:text-5xl">Connect your facility without replacing your existing systems.</h2>
          <p className="mb-8 text-base leading-relaxed text-white/70">Hospitals using paper records, hybrid workflows, or existing EMRs can participate through structured, accountable exchange workflows.</p>
          <ExperienceLink audience="provider" variant="lime">Register Your Facility</ExperienceLink>
        </div>
        <ol className="border-y border-white/15">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 border-b border-white/15 py-6 last:border-b-0">
              <span aria-hidden="true" className="w-8 shrink-0 text-xs font-semibold text-lime-300">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="flex-1 font-serif text-sm font-semibold">{step}</h3>
              <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-lime-300" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
