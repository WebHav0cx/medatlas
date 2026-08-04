import React from "react";
import logoImg from "../../assets/medatlas_logo.png";
import logoImg2 from "../../assets/medatlas_logo2.png";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-emerald-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="shrink-0 mb-4">
              <img src={logoImg2} alt="MedAtlas" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Nigeria's Healthcare Identity & Discovery Network. Connecting
              providers, not centralising data.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {[
                "Problem",
                "Solution",
                "How It Works",
                "Prototype",
                "Roadmap",
                "Contact",
              ].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm transition-opacity hover:opacity-100 text-white/55"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6 text-xs border-t border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.3)]">
          <span>Healthcare Identity & Discovery Network</span>
        </div>
      </div>
    </footer>
  );
}
