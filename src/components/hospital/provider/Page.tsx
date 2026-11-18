'use client';



export function Page({
  title,
  subtitle,
  action,
  children,
}: {
  title: string
  subtitle: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-lg:px-6 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="workspace-page">
      <div className="mb-6 flex items-center justify-between gap-4 max-md:flex-col max-md:items-stretch" data-slot="workspace-head">
        <div>
          <h1 className="mt-1 text-2xl leading-tight font-bold tracking-tight text-mist-800 not-italic normal-nums max-md:text-2xl">{title}</h1>
          <p className="mt-1.5 text-sm leading-normal text-olive-600">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}
