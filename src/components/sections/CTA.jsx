import React from "react";
import unsplashImg1 from "../../assets/unsplash-1.jpg";
import {
  ExternalLink,
  Network,
  Stethoscope,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden h-[440px] shadow-[0_4px_30px_rgba(26,71,49,0.12)]">
          <img
            src={unsplashImg1}
            alt="Healthcare professionals consulting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,71,49,0.35)_0%,transparent_55%)]" />
        </div>

        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Join the Mission
          </span>
          <h2 className="text-4xl md:text-5xl mb-5 font-display text-emerald-900 ">
            Healthcare Shouldn't Restart Every Time a Patient Changes Hospitals.
          </h2>
          <p className="text-base leading-relaxed mb-8 text-slate-600">
            MedAtlas is building Nigeria's Healthcare Identity and Discovery
            Network helping hospitals securely discover and exchange patient
            records while every provider keeps full ownership of its own data.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#prototype"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95 bg-emerald-900 text-white"
            >
              View Prototype <ExternalLink size={14} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 border-[1.5px] border-emerald-900 text-emerald-900"
            >
              Contact Us
            </a>
          </div>

          <div className="mt-8 pt-8 flex gap-8 border-t border-slate-200">
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
                className="flex items-start gap-2 group hover:opacity-70 transition-opacity"
              >
                <span className="text-emerald-900 mt-0.5">{item.icon}</span>
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
