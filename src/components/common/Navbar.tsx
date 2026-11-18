"use client";

import { useState, useEffect } from "react";
import { Menu, X as CloseIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Problem", id: "problem" },
    { label: "Solution", id: "solution" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Prototype", id: "prototype" },
    { label: "Roadmap", id: "roadmap" },
  ];

  return (
    <nav
      className={["fixed top-0 right-0 left-0 z-50 transition-all duration-300", ((scrolled) ? "border-b border-slate-200" : ""), (!(scrolled) ? "border-b border-transparent" : ""), (!(scrolled) ? "bg-transparent" : ""), ((scrolled) ? "bg-white/97 backdrop-blur-md" : "")].filter(Boolean).join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="shrink-0">
          <img src="/assets/medatlas_logo.png" alt="MedAtlas" className="h-12 w-auto" />
        </div>
        <div className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium transition-opacity duration-150 hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/signin" className="
            rounded-full px-4 py-2.5 text-sm font-semibold text-emerald-900 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-emerald-700
          ">Sign In</Link>
          <Link href="/signup" className="
            rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors
            hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700 motion-reduce:transition-none
          ">Sign Up</Link>
        </div>
        <button type="button" className="rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-emerald-700 lg:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
          {open ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div id="mobile-navigation" className="flex flex-col gap-3 border-t bg-white px-6 py-4 lg:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="py-1 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4">
            <Link href="/signin" onClick={() => setOpen(false)} className="
              rounded-full border border-emerald-900 px-5 py-2.5 text-sm font-semibold text-emerald-900
              focus-visible:outline-2 focus-visible:outline-emerald-700
            ">Sign In</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="
              rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-semibold text-white focus-visible:outline-2
              focus-visible:outline-offset-2 focus-visible:outline-emerald-700
            ">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
