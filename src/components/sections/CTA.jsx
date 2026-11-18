import React from "react";
import {
  ExternalLink,
  Network,
  Stethoscope,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="relative h-110 overflow-hidden rounded-2xl shadow-sm">
          <img
            src="/assets/unsplash-1.jpg"
            alt="Healthcare professionals consulting"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-emerald-900/35 to-transparent" />
        </div>

        <div>
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Join the Mission
          </span>
          <h2 className="mb-5 font-serif text-4xl text-emerald-900 md:text-5xl">
            Healthcare Shouldn't Restart Every Time a Patient Changes Hospitals.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-slate-600">
            MedAtlas is building Nigeria's Healthcare Identity and Discovery
            Network helping hospitals securely discover and exchange patient
            records while every provider keeps full ownership of its own data.
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
              href="#"
              className="
                inline-flex items-center gap-2 rounded-full border-1 border-emerald-900 px-6 py-3 text-sm
                font-semibold text-emerald-900 transition-all duration-200 active:scale-95
              "
            >
              Contact Us
            </a>
          </div>

          <div className="mt-8 flex gap-8 border-t border-slate-200 pt-8">
            {[
              {
                icon: <Network size={16} />,
                label: "Partner With Us",
                sub: "For hospitals & labs",
              },
              {
                icon: <Stethoscope size={16} />,
                label: "Pilot Programme",
                sub: "Join our beta",
              },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="group flex items-start gap-2 transition-opacity hover:opacity-70"
              >
                <span className="mt-0.5 text-emerald-900">{item.icon}</span>
                <div>
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="text-xs">{item.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
