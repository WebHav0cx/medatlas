'use client';



export function statusTone(
  label: string,
): "pending" | "success" | "error" | "info" | "neutral" {
  const value = label.toLowerCase()
  if (
    [
      "approved",
      "completed",
      "released",
      "fulfilled",
      "accepted",
      "success",
      "connected",
      "authorised",
      "current",
      "improved",
      "active",
    ].some((status) => value.includes(status))
  )
    return "success"
  if (
    ["declined", "rejected", "access denied", "deactivated"].some((status) =>
      value.includes(status),
    )
  )
    return "error"
  if (
    ["under review", "processing", "in progress", "verification"].some(
      (status) => value.includes(status),
    )
  )
    return "info"
  if (
    ["draft", "cancelled", "archived", "inactive"].some((status) =>
      value.includes(status),
    )
  )
    return "neutral"
  return "pending"
}
