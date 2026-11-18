import React from "react";
import { Shield, Network, Fingerprint } from "lucide-react";

export default function Solution() {
  return (
    <section id="solution" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            The Solution
          </span>
          <h2 className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl">
            Healthcare Identity &amp; Discovery Network.
          </h2>
          <p className="mx-auto mb-2 max-w-2xl text-lg text-slate-600">
            We are not replacing hospital systems.{" "}
            <span className="font-semibold text-emerald-900">
              We are connecting them.
            </span>
          </p>
          <p className="mx-auto max-w-2xl text-base">
            MedAtlas is not another EMR. It's the secure identity, discovery,
            and exchange layer that sits alongside every existing system.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
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
              className="
                group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 transition-all
                duration-200 hover:shadow-md
              "
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900"
                >
                  {icon}
                </div>
                <span className="text-sm font-bold">{num}</span>
              </div>
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
