import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Comparison() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Before &amp; After
          </span>
          <h2 className="font-serif text-4xl text-emerald-900 md:text-5xl">
            The world before.
            <br className="font-sans" />
            The world with MedAtlas.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Traditional Healthcare",
              accent: "text-red-600",
              bg: "bg-red-50",
              border: "border-red-200",
              items: [
                "Patient carries records manually",
                "Repeated tests at every new hospital",
                "Lost records, lost context",
                "Disconnected, siloed hospitals",
                "Paper referrals, no discovery",
                "No continuity of care",
              ],
              check: false,
            },
            {
              title: "With MedAtlas",
              accent: "text-emerald-900",
              bg: "bg-green-50",
              border: "border-green-200",
              items: [
                "Healthcare Identity for every patient",
                "Discovery find records instantly",
                "Secure, consented exchange",
                "Connected providers, shared context",
                "Offline-first works anywhere",
                "Continuity of care across Nigeria",
              ],
              check: true,
            },
          ].map(({ title, accent, bg, border, items, check }) => (
            <div
              key={title}
              className={[("rounded-2xl border-1 p-8"), bg, border].filter(Boolean).join(" ")}
            >
              <h3 className={[("mb-6 font-serif text-xl font-bold"), accent].filter(Boolean).join(" ")}>
                {title}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    {check ? (
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-900"
                      />
                    ) : (
                      <XCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-red-500"
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
