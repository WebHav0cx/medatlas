export function AuthHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-8">
    <p className="mb-3 text-xs font-semibold tracking-widest text-emerald-700 uppercase">{eyebrow}</p>
    <h1 className="mb-4 text-3xl leading-tight tracking-tight text-emerald-950 not-italic sm:text-4xl">{title}</h1>
    <p className="text-base leading-relaxed text-slate-600">{description}</p>
  </div>;
}
