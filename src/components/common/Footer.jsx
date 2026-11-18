import React from "react";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 shrink-0">
              <img src="/assets/medatlas_logo2.png" alt="MedAtlas" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              Nigeria's Healthcare Identity & Discovery Network. Connecting
              providers, not centralising data.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
                  className="text-sm text-white/55 transition-opacity hover:opacity-100"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div></div>
        </div>
        <div className="
          flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs
          text-white/30 md:flex-row
        ">
          <span>Healthcare Identity & Discovery Network</span>
        </div>
      </div>
    </footer>
  );
}
