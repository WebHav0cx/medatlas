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
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Built for Nigeria
          </span>
          <h2 className="text-4xl md:text-5xl mb-5 text-emerald-900 font-display">
            Works even when
            <br />
            the internet doesn't.
          </h2>
          <p className="text-base leading-relaxed mb-8 text-slate-600">
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
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-900 border border-green-200"
              >
                {icon} {label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-8 border border-rounded-2xl ">
          <p className="text-xs font-semibold uppercase tracking-widest mb-6">
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
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${step.bg} ${step.color}`}
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
