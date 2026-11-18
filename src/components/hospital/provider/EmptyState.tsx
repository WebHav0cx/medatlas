'use client';



export function EmptyState({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div className="mt-4 flex min-h-60 flex-col items-center justify-center rounded-xl border border-mist-200 bg-white text-center" data-slot="workspace-card empty-workspace">
      <span className="grid size-12 place-items-center rounded-full bg-mist-100 text-olive-500">{icon}</span>
      <h3 className="mt-4 mb-1.5 text-base font-semibold tracking-tight text-mist-800 not-italic">{title}</h3>
      <p className="max-w-108 text-xs leading-normal text-olive-600">{text}</p>
    </div>
  )
}
