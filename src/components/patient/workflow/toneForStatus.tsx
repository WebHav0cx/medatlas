'use client';

import { type Tone } from './SourceConfig';

export function toneForStatus(status: string): Tone {
  const value = status.toLowerCase()
  if (
    ["linked", "active", "available", "completed", "approved"].some((item) =>
      value.includes(item),
    )
  )
    return "success"
  if (
    ["declined", "rejected", "access denied", "failed"].some((item) =>
      value.includes(item),
    )
  )
    return "error"
  if (
    ["review", "progress", "verification"].some((item) => value.includes(item))
  )
    return "info"
  if (
    ["pending", "waiting", "submitted", "decision"].some((item) =>
      value.includes(item),
    )
  )
    return "warning"
  return "neutral"
}
