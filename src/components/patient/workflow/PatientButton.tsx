'use client';
import { type ReactNode } from "react";


export function PatientButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "danger"
  type?: "button" | "submit"
  disabled?: boolean
}) {
  return (
    <button

      onClick={onClick}
      type={type}
      disabled={disabled} className="
        transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
        focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
      "
    >
      {children}
    </button>
  )
}
