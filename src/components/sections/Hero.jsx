import React from "react";
import {
  ExternalLink,
  Lock,
  WifiOff,
  Fingerprint,
  GitMerge,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden px-6 pt-28 pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Healthcare Identity & Discovery Network
          </span>
          <h1
            className="mb-6 font-serif text-5xl leading-tight text-emerald-900 md:text-6xl" data-slot="landing-original-display"
          >
            Connecting Healthcare,
            <br className="font-sans" />
            Not Just Hospitals.
          </h1>
          <p className="mb-8 text-lg leading-relaxed">
            Healthcare records shouldn't stay trapped inside the building where
            they were created. MedAtlas enables hospitals, clinics, and
            laboratories to securely discover and exchange patient records even
            in low-connectivity environments without centralizing sensitive
            medical data.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#prototype"
              className="
                inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold
                text-white transition-all duration-200 hover:opacity-90 active:scale-95
              "
            >
              View Prototype <ExternalLink size={14} />
            </a>
            <a
              href="#solution"
              className="
                inline-flex items-center gap-2 rounded-full border-1 border-emerald-900 px-6 py-3 text-sm
                font-semibold text-emerald-900 transition-all duration-200 active:scale-95
              "
            >
              Learn More
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            {[
              { icon: <Lock size={13} />, label: "Privacy-first" },
              { icon: <WifiOff size={13} />, label: "Offline-ready" },
              { icon: <Fingerprint size={13} />, label: "Healthcare Identity" },
              {
                icon: <GitMerge size={13} />,
                label: "Works with existing EMRs",
              },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-1.5 text-xs font-medium"
              >
                <span className="text-emerald-900">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
          >
            <img
              src="/assets/unsplash-2.jpg"
              alt="Doctor consulting patient while reviewing digital medical records"
              className="h-105 w-full object-cover"
            />
            {/* subtle green tint overlay */}
            <div
              className="absolute inset-0 bg-linear-to-br from-emerald-900/10 to-transparent"
            />
          </div>

          {/* Floating network card */}
          <div
            className="absolute -bottom-5 -left-5 min-w-53.75 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"
          >
            <p className="mb-3 text-xs font-bold tracking-widest uppercase">
              Live Network
            </p>
            {[
              { label: "Hospital A — Ibadan", dot: "lime" },
              { label: "MedAtlas Hub", dot: "hub" },
              { label: "Hospital B — Lagos", dot: "lime" },
              { label: "Clinic — Kano", dot: "lime" },
              { label: "Laboratory — Abuja", dot: "lime" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-0.5">
                {item.dot === "hub" ? (
                  <div className="size-3 shrink-0 rounded-full" />
                ) : (
                  <div className="size-2 shrink-0 rounded-full" />
                )}
                <span
                  className={["text-xs font-medium", ((item.dot === "hub") ? "text-emerald-900" : ""), (!(item.dot === "hub") ? "text-emerald-950" : "")].filter(Boolean).join(" ")}
                >
                  {item.label}
                </span>
                {item.dot === "hub" && (
                  <span
                    className="ml-auto rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-900"
                  >
                    Bridge
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Floating stat card */}
          <div className="absolute -top-4 -right-4 rounded-xl px-4 py-3 text-white shadow-lg">
            <div
              className="font-serif text-2xl font-bold text-green-300" data-slot="landing-original-display"
            >
              36
            </div>
            <div className="text-xs opacity-70">States, One Network</div>
          </div>
        </div>
      </div>
    </section>
  );
}
