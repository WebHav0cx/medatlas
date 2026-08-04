import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export default function Comparison() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Before &amp; After
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-emerald-900 ">
            The world before.
            <br />
            The world with MedAtlas.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
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
              className={`rounded-2xl p-8 border-[1.5px] ${bg} ${border}`}
            >
              <h3 className={`text-xl font-bold mb-6 font-display ${accent}`}>
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
