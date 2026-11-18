import React from "react";
import {
  Shield,
  CheckCircle2,
  Wifi,
  WifiOff,
  RefreshCw,
  Building2,
} from "lucide-react";

export default function OfflineFirst() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Built for Nigeria
          </span>
          <h2 className="mb-5 font-serif text-4xl text-emerald-900 md:text-5xl">
            Works even when
            <br className="font-sans" />
            the internet doesn't.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-slate-600">
            Unreliable connectivity shouldn't stop hospitals from delivering
            care. MedAtlas is offline-first by design daily operations continue
            uninterrupted, and records sync automatically the moment
            connectivity returns.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Offline-first", icon: <WifiOff size={15} /> },
              { label: "Background sync", icon: <RefreshCw size={15} /> },
              { label: "Local storage", icon: <Building2 size={15} /> },
              {
                label: "Auto-reconciliation",
                icon: <CheckCircle2 size={15} />,
              },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="
                  flex items-center gap-2.5 rounded-xl border border-green-200 bg-emerald-50 px-4 py-3 text-sm
                  font-medium text-emerald-900
                "
              >
                {icon} {label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-8">
          <p className="mb-6 text-xs font-semibold tracking-widest uppercase">
            Sync Flow
          </p>
          {[
            {
              label: "Internet connection lost",
              icon: <WifiOff size={14} />,
              color: "text-red-600",
              bg: "bg-red-50",
            },
            {
              label: "Daily operations continue normally",
              icon: <Building2 size={14} />,
              color: "text-emerald-900",
              bg: "bg-emerald-50",
            },
            {
              label: "Records stored locally & securely",
              icon: <Shield size={14} />,
              color: "text-emerald-900",
              bg: "bg-emerald-50",
            },
            {
              label: "Internet connection returns",
              icon: <Wifi size={14} />,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Automatic background synchronisation",
              icon: <RefreshCw size={14} />,
              color: "text-lime-500",
              bg: "bg-lime-50",
            },
          ].map((step, i, arr) => (
            <div key={step.label}>
              <div className="flex items-center gap-3 py-2">
                <div
                  className={[("flex size-7 shrink-0 items-center justify-center rounded-lg"), step.bg, step.color].filter(Boolean).join(" ")}
                >
                  {step.icon}
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className="ml-3.5 h-5 w-px bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
