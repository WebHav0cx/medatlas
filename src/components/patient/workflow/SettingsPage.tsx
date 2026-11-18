'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { localPasswordSchema, preferenceSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Link } from "@/lib/workflow-router";
import { Check, ChevronRight, HelpCircle, Link2, LogOut, ShieldCheck, UserRound } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { PatientButton } from './PatientButton';
import { PatientPageHeader } from './PatientPageHeader';

export function SettingsPage() {
  const store = useMockData()
  const account = store.currentPatientAccount
  const preferencesForm=useForm<z.infer<typeof preferenceSchema>>({resolver:zodResolver(preferenceSchema),defaultValues:account.preferences})
  const preferences=preferencesForm.watch()
  const [saved, setSaved] = useState(false)
  const passwordForm=useForm<z.infer<typeof localPasswordSchema>>({resolver:zodResolver(localPasswordSchema),defaultValues:{password:"",confirmPassword:""}})
  const setPassword=(value:string)=>passwordForm.setValue("password",value)
  const setConfirmPassword=(value:string)=>passwordForm.setValue("confirmPassword",value)
  const [securityMessage, setSecurityMessage] = useState("")
  const update = (key: keyof typeof preferences) =>
    preferencesForm.setValue(key,!preferencesForm.getValues(key))
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Account"
        title="Settings"
        subtitle="Manage contact preferences, privacy shortcuts and account access."
      />
      <div >
        <div >
          <section >
            <div>
              <span>Notifications</span>
              <h2 className="tracking-tight not-italic">Contact preferences</h2>
            </div>
            {[
              [
                "email",
                "Email updates",
                "Receive important account updates by email.",
              ],
              [
                "sms",
                "Text message updates",
                "Receive selected time-sensitive updates by SMS.",
              ],
              [
                "sharing",
                "Sharing requests",
                "Be notified when a sharing decision is required.",
              ],
              [
                "records",
                "New records",
                "Be notified when a released record becomes available.",
              ],
            ].map(([key, title, text]) => (
              <label  key={key}>
                <div>
                  <strong className="tabular-nums">{title}</strong>
                  <small>{text}</small>
                </div>
                <input
                  type="checkbox"
                  checked={preferences[(key as keyof typeof preferences)]}
                  onChange={() => update(key as keyof typeof preferences)} className="
                    min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                    ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                    focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                    disabled:opacity-52
                  "
                />
                <span />
              </label>
            ))}
            <PatientButton
              onClick={() => {
                store.updatePatientAccount(account.id, {
                  email: account.email,
                  phone: account.phone,
                  preferences,
                })
                setSaved(true)
              }}
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Preferences saved
                </>
              ) : (
                "Save preferences"
              )}
            </PatientButton>
          </section>
          <section >
            <div>
              <span>Account security</span>
              <h2 className="tracking-tight not-italic">Change local account password</h2>
            </div>
            <p>
              This changes the credential stored for the local fictional
              account. It does not represent production authentication.
            </p>
            <label>
              <span>New password</span>
              <input
                type="password"
                {...passwordForm.register("password")}
                autoComplete="new-password" className="
                  min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                  ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                "
              />
            </label>
            <label>
              <span>Confirm new password</span>
              <input
                type="password"
                {...passwordForm.register("confirmPassword")}
                autoComplete="new-password" className="
                  min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                  ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                "
              />
            </label>
            {securityMessage && (
              <div

                role="status"
              >
                {securityMessage}
              </div>
            )}
            <PatientButton
              onClick={passwordForm.handleSubmit(({password}) => {
                store.updatePatientAccount(account.id, {
                  email: account.email,
                  phone: account.phone,
                  preferences: account.preferences,
                  password,
                })
                setPassword("")
                setConfirmPassword("")
                setSecurityMessage("Local account password updated.")
              },()=>setSecurityMessage("Use at least 8 characters and enter the same password twice."))}
            >
              Update password
            </PatientButton>
          </section>
        </div>
        <nav >
          {[
            ["/patient/profile", "Personal information", UserRound],
            ["/patient/records/connect", "Connected records", Link2],
            ["/patient/sharing", "Privacy & sharing", ShieldCheck],
            ["/patient/help", "Help & support", HelpCircle],
            ["/signin", "Sign out", LogOut],
          ].map(([to, label, Icon]) => (
            <Link to={to as string} key={label as string} className="
              transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
              focus-visible:outline-emerald-700/32
            ">
              <Icon size={19} />
              <span>{label as string}</span>
              <ChevronRight size={16} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
