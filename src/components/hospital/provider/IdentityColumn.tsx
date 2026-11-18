'use client';



export function IdentityColumn({
  title,
  id,
  localId,
  phone,
}: {
  title: string
  id: string
  localId: string
  phone: string
}) {
  return (
    <div className="rounded-lg border border-mist-200 p-4">
      <span className="text-xs font-bold text-emerald-700 uppercase">{title}</span>
      <h3 className="mt-1.5 mb-3 text-xs tracking-tight not-italic">Aremu Adewale</h3>
      <dl>
        <div className="flex justify-between border-t border-t-mist-200 py-1.5 text-xs">
          <dt className="text-olive-500">MedAtlas ID</dt>
          <dd className="font-bold">{id}</dd>
        </div>
        <div className="flex justify-between border-t border-t-mist-200 py-1.5 text-xs">
          <dt className="text-olive-500">Date of birth</dt>
          <dd className="font-bold">14 May 1986</dd>
        </div>
        <div className="flex justify-between border-t border-t-mist-200 py-1.5 text-xs">
          <dt className="text-olive-500">Sex</dt>
          <dd className="font-bold">Male</dd>
        </div>
        <div className="flex justify-between border-t border-t-mist-200 py-1.5 text-xs">
          <dt className="text-olive-500">Phone</dt>
          <dd className="font-bold">{phone}</dd>
        </div>
        <div className="flex justify-between border-t border-t-mist-200 py-1.5 text-xs">
          <dt className="text-olive-500">Local ID</dt>
          <dd className="font-bold">{localId}</dd>
        </div>
      </dl>
    </div>
  )
}
