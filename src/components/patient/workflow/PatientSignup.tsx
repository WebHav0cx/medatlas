'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { patientSignupSchema } from '@/schemas/workflow-forms';
import { useState } from "react";
import { Link, useNavigate } from "@/lib/workflow-router";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleAlert, HeartPulse, Info, ShieldCheck, UserRound } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { Brand } from "@/components/shared/workflow/Brand";
import { friendlyDate } from './friendlyDate';
import { PatientButton } from './PatientButton';

export function PatientSignup() {
  const store = useMockData()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const {getFieldState,register,watch,trigger} = useForm<z.infer<typeof patientSignupSchema>>({resolver:zodResolver(patientSignupSchema),defaultValues:{
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    accepted: false,
  }})
  const values=watch()
  const [error, setError] = useState("")
  const [accountCreated, setAccountCreated] = useState(false)
  const [linkCode, setLinkCode] = useState("")
  const [linkStatus, setLinkStatus] = useState<"idle" | "success" | "error">(
    "idle",
  )
  const steps = [
    "Welcome",
    "Create account",
    "Confirm details",
    "Patient profile",
    "Connect records",
    "Complete",
  ]
  const next = async () => {
    if(step===2 && !await trigger(undefined,{shouldFocus:true})) {
      setError("Complete all required fields, use at least 8 characters and confirm the same password.")
      return
    }
    if (step === 3 && !accountCreated) {
      if (
        store.state.patientAccounts.some(
          (account) =>
            account.email.toLowerCase() === values.email.toLowerCase(),
        )
      ) {
        setError("An account with this email already exists. Sign in instead.")
        return
      }
      store.createPatientAccount({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        password: values.password,
      })
      setAccountCreated(true)
    }
    setError("")
    setStep((current) => Math.min(6, current + 1))
  }
  const linkRecords = () => {
    const link = store.submitPatientLink({
      facility: "CityCare Hospital",
      method: "Linking Code",
      code: linkCode,
    })
    setLinkStatus(link ? "success" : "error")
  }
  return (
    <div >
      <header>
        <Brand />
        <Link to="/signin" className="
          transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
          focus-visible:outline-emerald-700/32
        ">Already have an account? Sign in</Link>
      </header>
      <main>
        <div >
          {steps.map((label, index) => (
            <div

              key={label}
            >
              <span>{step > index + 1 ? <Check size={14} /> : index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <section >
          {step === 1 && (
            <div >
              <span>
                <HeartPulse size={27} />
              </span>
              <small>MedAtlas Patient Portal</small>
              <h1 className="tracking-tight not-italic">Your health information, easier to understand.</h1>
              <p>
                Create a local fictional patient account to view eligible
                released records, manage applicable sharing requests and follow
                information requests.
              </p>
              <div>
                <ShieldCheck size={18} />
                <p>
                  Creating an account does not automatically connect healthcare
                  records. Every record link follows a separate review process.
                </p>
              </div>
            </div>
          )}
          {step === 2 && (
            <>
              <div >
                <span>Step 2 of 6</span>
                <h1 className="tracking-tight not-italic">Create your account</h1>
                <p>
                  Enter the minimum details needed for this local prototype.
                </p>
              </div>
              <div >
                <label  data-slot="wide">
                  <span>Full name *</span>
                  <input
                    {...register("fullName")} aria-invalid={getFieldState("fullName").invalid || undefined}
                    autoComplete="name" className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                </label>
                <label>
                  <span>Email address *</span>
                  <input
                    type="email"
                    {...register("email")} aria-invalid={getFieldState("email").invalid || undefined}
                    autoComplete="email" className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                </label>
                <label>
                  <span>Phone number</span>
                  <input
                    {...register("phone")} aria-invalid={getFieldState("phone").invalid || undefined}
                    autoComplete="tel" className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                </label>
                <label>
                  <span>Date of birth *</span>
                  <input
                    type="date"
                    {...register("dob")} aria-invalid={getFieldState("dob").invalid || undefined} className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                </label>
                <span />
                <label>
                  <span>Password *</span>
                  <input
                    type="password"
                    {...register("password")} aria-invalid={getFieldState("password").invalid || undefined}
                    autoComplete="new-password" className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                  <small>At least 8 characters for this local account.</small>
                </label>
                <label>
                  <span>Confirm password *</span>
                  <input
                    type="password"
                    {...register("confirmPassword")} aria-invalid={getFieldState("confirmPassword").invalid || undefined}
                    autoComplete="new-password" className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                </label>
                <label  data-slot="wide">
                  <input
                    type="checkbox"
                    {...register("accepted")} aria-invalid={getFieldState("accepted").invalid || undefined} className="
                      min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                      ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                      focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                      disabled:opacity-52
                    "
                  />
                  <span>
                    I agree to the <Link to="/terms" className="
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32
                    ">account terms</Link> and
                    have read the <Link to="/privacy" className="
                      transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                      focus-visible:outline-emerald-700/32
                    ">privacy information</Link>
                    .
                  </span>
                </label>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div >
                <span>Step 3 of 6</span>
                <h1 className="tracking-tight not-italic">Confirm your account details</h1>
                <p>
                  Review the information before creating your local account.
                </p>
              </div>
              <dl >
                <div>
                  <dt>Full name</dt>
                  <dd>{values.fullName}</dd>
                </div>
                <div>
                  <dt>Email address</dt>
                  <dd>{values.email}</dd>
                </div>
                <div>
                  <dt>Phone number</dt>
                  <dd>{values.phone || "Not provided"}</dd>
                </div>
                <div>
                  <dt>Date of birth</dt>
                  <dd>{friendlyDate(values.dob)}</dd>
                </div>
              </dl>
            </>
          )}
          {step === 4 && (
            <div >
              <span>
                <UserRound size={27} />
              </span>
              <small>Patient profile</small>
              <h1 className="tracking-tight not-italic">Your account profile is ready.</h1>
              <p>
                Contact details belong to your account. Provider-maintained
                identity information remains separate and cannot be changed
                until a record is reviewed and linked.
              </p>
            </div>
          )}
          {step === 5 && (
            <>
              <div >
                <span>Step 5 of 6</span>
                <h1 className="tracking-tight not-italic">Connect existing healthcare records</h1>
                <p>
                  If you have a fictional facility-issued linking code, enter it
                  now. You can also do this later from My Health Records.
                </p>
              </div>
              <label >
                <span>CityCare Hospital linking code</span>
                <input
                  value={linkCode}
                  onChange={(event) => setLinkCode(event.target.value)}
                  placeholder="Enter a facility-issued code" className="
                    min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                    ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                    focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                    disabled:opacity-52
                  "
                />
                <small>
                  Use CITY-AREMU-2841 for the seeded CityCare scenario.
                </small>
                <button
                  type="button"
                  onClick={linkRecords}
                  disabled={!linkCode} className="
                    transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                    focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                  "
                >
                  Validate and submit
                </button>
              </label>
              {linkStatus === "success" && (
                <div >
                  <CheckCircle2 size={17} />
                  Code validated. Facility confirmation is now pending.
                </div>
              )}
              {linkStatus === "error" && (
                <div >
                  <CircleAlert size={17} />
                  That code does not match the seeded fictional records.
                </div>
              )}
              <div >
                <Info size={18} />
                <p>
                  No records are exposed merely because account details look
                  similar to a facility record.
                </p>
              </div>
            </>
          )}
          {step === 6 && (
            <div >
              <span>
                <CheckCircle2 size={27} />
              </span>
              <small>Account complete</small>
              <h1 className="tracking-tight not-italic">Welcome to MedAtlas, {values.fullName.split(" ")[0]}.</h1>
              <p>
                Your patient dashboard is ready. Any records will remain
                unavailable until an appropriate record link is approved.
              </p>
            </div>
          )}
          {error && (
            <div  role="alert">
              <CircleAlert size={17} />
              {error}
            </div>
          )}
          <div >
            {step > 1 && step < 6 && (
              <PatientButton
                variant="secondary"
                onClick={() => {
                  setError("")
                  setStep((current) => current - 1)
                }}
              >
                <ArrowLeft size={16} />
                Back
              </PatientButton>
            )}
            {step < 6 ? (
              <PatientButton onClick={next}>
                {step === 3 ? "Create patient account" : "Continue"}
                <ArrowRight size={16} />
              </PatientButton>
            ) : (
              <PatientButton onClick={() => navigate("/patient/dashboard")}>
                Enter patient dashboard
                <ArrowRight size={16} />
              </PatientButton>
            )}
          </div>
        </section>
      </main>
      <footer>
        This frontend prototype uses fictional information and local browser
        storage. Production authentication and authorisation require backend
        enforcement.
      </footer>
    </div>
  )
}
