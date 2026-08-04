import React, { useState, useEffect } from "react";
import logoImg from "../../assets/medatlas_logo.png";
import { Menu, X as CloseIcon } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/97 backdrop-blur-md border-b border-slate-200" : "bg-transparent border-b border-transparent"}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="shrink-0">
          <img src={logoImg} alt="MedAtlas" className="h-12 w-auto" />
        </div>
        <div className="hidden md:flex items-center gap-7">
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
        <div className="hidden md:flex gap-2">
          {/* <a
            href="#prototype"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 border-[1.5px] border-emerald-900 text-emerald-900"
          >
            View Prototype
          </a> */}
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <CloseIcon size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm font-medium py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {/* <a
            href="#prototype"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 border-[1.5px] border-emerald-900 text-emerald-900"
          >
            View Prototype
          </a> */}
        </div>
      )}
    </nav>
  );
}
