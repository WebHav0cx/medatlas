'use client';



export function friendlyDate(value: string) {
  if (!value.includes("-")) return value
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`))
}
