import { Link } from '@/lib/workflow-router';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={[
        `
          inline-flex items-center gap-2.5 font-sans text-lg leading-normal font-bold tracking-tight
          whitespace-nowrap not-italic normal-nums no-underline transition duration-160 ease-in-out
          focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
        `,
        light ? "text-white" : "text-teal-950",
      ].join(" ")}
      data-slot={`public-brand${light ? " light" : ""}`}
    >
      <span className="relative inline-block size-7.5 flex-none rounded-lg bg-emerald-900 font-sans" data-slot="public-brand-mark">
        <i className="absolute top-3.25 left-2 block h-1 w-3.5 rounded-xs bg-lime-300" />
        <i className="absolute top-2 left-3.25 block h-3.5 w-1 rounded-xs bg-lime-300" />
      </span>
      <span className="font-sans">MedAtlas</span>
    </Link>
  );
}
