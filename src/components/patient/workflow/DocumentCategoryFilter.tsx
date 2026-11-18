'use client';



export function DocumentCategoryFilter({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label>
      <span className="sr-only">Document category</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="
        h-11 min-h-10.5 w-full rounded-lg border border-mist-300 bg-white px-3 text-xs text-mist-800
        transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
        focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
        disabled:cursor-not-allowed disabled:opacity-52
      ">
        <option value="">All document types</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}
