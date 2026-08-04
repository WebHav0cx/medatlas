import React from "react";
import unsplashImg2 from "../../assets/unsplash-2.jpg";
import {
  ExternalLink,
  Lock,
  WifiOff,
  Fingerprint,
  GitMerge,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-28 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Healthcare Identity & Discovery Network
          </span>
          <h1
            className="text-5xl md:text-[3.6rem] leading-tight mb-6"
            style={{
              color: "var(--color-emerald-900)",
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}
          >
            Connecting Healthcare,
            <br />
            Not Just Hospitals.
          </h1>
          <p className="text-lg mb-8 leading-relaxed">
            Healthcare records shouldn't stay trapped inside the building where
            they were created. MedAtlas enables hospitals, clinics, and
            laboratories to securely discover and exchange patient records even
            in low-connectivity environments without centralizing sensitive
            medical data.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#prototype"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 bg-emerald-900 text-white"
            >
              View Prototype <ExternalLink size={14} />
            </a>
            <a
              href="#solution"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 border-[1.5px] border-emerald-900 text-emerald-900"
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
            className="rounded-2xl overflow-hidden border border-slate-200"
            style={{
              border: "1px solid var(--color-slate-200)",
              boxShadow: "0 4px 24px rgba(26,71,49,0.10)",
            }}
          >
            <img
              src={unsplashImg2}
              alt="Doctor consulting patient while reviewing digital medical records"
              className="w-full object-cover h-[420px]"
            />
            {/* subtle green tint overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(26,71,49,0.08) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Floating network card */}
          <div
            className="absolute -bottom-5 -left-5 rounded-2xl p-4 shadow-xl"
            style={{
              background: "white",
              border: "1px solid var(--color-slate-200)",
              minWidth: 215,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3">
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
                  <div className="w-3 h-3 rounded-full shrink-0" />
                ) : (
                  <div className="w-2 h-2 rounded-full shrink-0" />
                )}
                <span
                  className="text-xs font-medium"
                  style={{
                    color:
                      item.dot === "hub"
                        ? "var(--color-emerald-900)"
                        : "var(--color-emerald-950)",
                  }}
                >
                  {item.label}
                </span>
                {item.dot === "hub" && (
                  <span
                    className="ml-auto text-xs px-1.5 py-0.5 rounded font-semibold"
                    style={{
                      background: "var(--color-emerald-50)",
                      color: "var(--color-emerald-900)",
                    }}
                  >
                    Bridge
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Floating stat card */}
          <div className="absolute -top-4 -right-4 rounded-xl px-4 py-3 shadow-lg text-white">
            <div
              className="text-2xl font-bold"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                color: "var(--color-green-300)",
              }}
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
