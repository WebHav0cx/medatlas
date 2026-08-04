import React from "react";
import { Shield, Network, Fingerprint } from "lucide-react";

export default function Solution() {
  return (
    <section id="solution" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            The Solution
          </span>
          <h2 className="text-4xl md:text-5xl mb-4  text-emerald-900 font-display">
            Healthcare Identity &amp; Discovery Network.
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-2 text-slate-600">
            We are not replacing hospital systems.{" "}
            <span className="text-emerald-900 font-semibold">
              We are connecting them.
            </span>
          </p>
          <p className="text-base max-w-2xl mx-auto">
            MedAtlas is not another EMR. It's the secure identity, discovery,
            and exchange layer that sits alongside every existing system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {[
            {
              icon: <Fingerprint size={24} />,
              num: "01",
              title: "Healthcare Identity",
              desc: "Every patient receives one secure Universal Medical Record Number (UMRN) that follows them across all participating facilities.",
            },
            {
              icon: <Network size={24} />,
              num: "02",
              title: "Healthcare Discovery",
              desc: "Hospitals instantly discover where a patient's records exist without storing everyone's medical files in one central database.",
            },
            {
              icon: <Shield size={24} />,
              num: "03",
              title: "Secure Exchange",
              desc: "Hospitals securely request and exchange records only when needed, with full audit trails, consent workflows, and provider control.",
            },
          ].map(({ icon, num, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-8 flex flex-col gap-4 hover:shadow-md transition-all duration-200 group"
              style={{
                border: "1px solid var(--color-slate-200)",
                background: "var(--color-white)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "var(--color-emerald-50)",
                    color: "var(--color-emerald-900)",
                  }}
                >
                  {icon}
                </div>
                <span className="text-sm font-bold">{num}</span>
              </div>
              <h3 className="text-xl font-display">{title}</h3>
              <p className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
