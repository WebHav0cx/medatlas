import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const destinations = {
  patient: "/get-started/patient",
  provider: "/get-started/provider",
};

export default function ExperienceLink({ audience, children, variant = "primary" }: {
  audience: keyof typeof destinations;
  children: ReactNode;
  variant?: "primary" | "lime" | "outline";
}) {
  const variants = {
    primary: "bg-emerald-900 text-white hover:bg-emerald-800",
    lime: "bg-lime-300 text-emerald-950 hover:bg-lime-200",
    outline: "border border-white/40 text-white hover:bg-white/10",
  };

  return (
    <Link
      href={destinations[audience]}
      className={[(`
        inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold
        transition-colors focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-emerald-500
      `), variants[variant]].filter(Boolean).join(" ")}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </Link>
  );
}
