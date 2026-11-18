"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  organisationApplicationSchema,
  type OrganisationApplicationValues,
} from "@/schemas/workflow-forms";
import { useState } from "react";
import { useNavigate } from "@/lib/workflow-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useMockData } from "@/stores/workflow/useMockData";
import { AuthShell } from "./AuthShell";

export function OrganisationRegistration() {
  const store = useMockData();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { getFieldState, register, watch, trigger, handleSubmit } =
    useForm<OrganisationApplicationValues>({
      resolver: zodResolver(organisationApplicationSchema),
      defaultValues: {
        type: "Hospital",
        registeredName: "",
        displayName: "",
        state: "",
        lga: "",
        address: "",
        adminName: "",
        adminEmail: "",
        email: "",
        phone: "",
        licence: "",
        authority: "",
        password: "",
        confirmPassword: "",
      },
    });
  const values = watch();
  const type = values.type;
  const [error, setError] = useState("");
  const next = async () => {
    if (
      step === 1 &&
      !(await trigger(["registeredName", "displayName", "state", "address"], {
        shouldFocus: true,
      }))
    )
      return setError("Complete the required organisation details.");
    if (
      step === 2 &&
      !(await trigger(["adminName", "adminEmail", "phone"], {
        shouldFocus: true,
      }))
    )
      return setError("Complete the administrative contact details.");
    setError("");
    setStep((current) => current + 1);
  };
  const submit = handleSubmit(() => {
    const application = store.addOrganisationApplication({
      registeredName: values.registeredName,
      displayName: values.displayName,
      type,
      state: values.state,
      lga: values.lga || "",
      address: values.address,
      email: values.email || values.adminEmail,
      phone: values.phone,
      licence: values.licence || "",
      authority: values.authority || "",
      administratorName: values.adminName,
      administratorEmail: values.adminEmail,
    });
    navigate(`/signup/organization/status?id=${application.id}`);
  });
  return (
    <AuthShell>
      <div className="m-auto max-w-192" data-slot="organisation-flow">
        <div className="mb-4 flex justify-center" data-slot="auth-progress">
          {["Organisation", "Administrator", "Registration", "Review"].map(
            (label, index) => (
              <div
                data-slot={step >= index + 1 ? "active" : ""}
                key={label}
                className={[
                  `
                    relative flex w-32 flex-col items-center after:absolute after:top-3 after:left-2/3 after:h-px
                    after:w-2/3 after:bg-mist-200 after:last:hidden max-md:w-16
                  `,
                  !(step >= index + 1) ? "text-olive-500" : "",
                  step >= index + 1 ? "text-emerald-900" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={[
                    "z-1 grid size-6 place-items-center rounded-full border text-xs",
                    !(step >= index + 1)
                      ? "border-mist-300 bg-white"
                      : "",
                    step >= index + 1
                      ? "border-emerald-900 bg-emerald-900 text-white"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {step > index + 1 ? <Check size={13} /> : index + 1}
                </span>
                <small className="mt-1.5 text-xs max-md:hidden">
                  {label}
                </small>
              </div>
            ),
          )}
        </div>
        <section
          className="rounded-2xl border border-mist-200 bg-white p-6"
          data-slot="organisation-form-card"
        >
          <div
            className="mb-5 max-w-168 text-left"
            data-slot="auth-heading compact"
          >
            <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
              Step {step} of 4
            </span>
            <h1
              className="my-2 text-3xl leading-tight font-normal tracking-tight text-teal-950 not-italic normal-nums max-md:text-3xl"
            >
              {step === 1
                ? "Organisation details"
                : step === 2
                  ? "Administrative contact"
                  : step === 3
                    ? "Registration information"
                    : "Review application"}
            </h1>
          </div>
          {step === 1 && (
            <div
              className="grid grid-cols-2 gap-3.5 gap-x-3 gap-y-0 max-md:grid-cols-1"
              data-slot="auth-form-grid"
            >
              <label
                data-slot="wide"
                className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto"
              >
                <span className="text-xs font-semibold text-olive-600">
                  Organisation type
                </span>
                <select
                  {...register("type")}
                  aria-invalid={getFieldState("type").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                >
                  <option>Hospital</option>
                  <option>Clinic</option>
                  <option>Laboratory / Diagnostic Centre</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Registered organisation name *
                </span>
                <input
                  {...register("registeredName")}
                  aria-invalid={
                    getFieldState("registeredName").invalid || undefined
                  }
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Facility display name *
                </span>
                <input
                  {...register("displayName")}
                  aria-invalid={
                    getFieldState("displayName").invalid || undefined
                  }
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  State *
                </span>
                <input
                  {...register("state")}
                  aria-invalid={getFieldState("state").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Local Government Area
                </span>
                <input
                  {...register("lga")}
                  aria-invalid={getFieldState("lga").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label
                data-slot="wide"
                className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto"
              >
                <span className="text-xs font-semibold text-olive-600">
                  Physical address *
                </span>
                <input
                  {...register("address")}
                  aria-invalid={getFieldState("address").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
            </div>
          )}
          {step === 2 && (
            <div
              className="grid grid-cols-2 gap-3.5 gap-x-3 gap-y-0 max-md:grid-cols-1"
              data-slot="auth-form-grid"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Administrator name *
                </span>
                <input
                  {...register("adminName")}
                  aria-invalid={getFieldState("adminName").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Administrator email *
                </span>
                <input
                  type="email"
                  {...register("adminEmail")}
                  aria-invalid={
                    getFieldState("adminEmail").invalid || undefined
                  }
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Official contact email
                </span>
                <input
                  type="email"
                  {...register("email")}
                  aria-invalid={getFieldState("email").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Official phone number *
                </span>
                <input
                  {...register("phone")}
                  aria-invalid={getFieldState("phone").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Password
                </span>
                <input
                  type="password"
                  {...register("password")}
                  aria-invalid={getFieldState("password").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-olive-600">
                  Confirm password
                </span>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  aria-invalid={
                    getFieldState("confirmPassword").invalid || undefined
                  }
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
            </div>
          )}
          {step === 3 && (
            <div
              className="grid grid-cols-2 gap-3.5 gap-x-3 gap-y-0 max-md:grid-cols-1"
              data-slot="auth-form-grid"
            >
              <label
                data-slot="wide"
                className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto"
              >
                <span className="text-xs font-semibold text-olive-600">
                  Registration or licence details
                </span>
                <input
                  {...register("licence")}
                  aria-invalid={getFieldState("licence").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <label
                data-slot="wide"
                className="col-start-1 col-end-3 flex flex-col gap-1.5 max-md:col-start-1 max-md:col-end-auto"
              >
                <span className="text-xs font-semibold text-olive-600">
                  Relevant professional or regulatory authority
                </span>
                <input
                  {...register("authority")}
                  aria-invalid={getFieldState("authority").invalid || undefined}
                  className="
                    h-10 min-h-11 w-full rounded-lg border border-mist-300 bg-white px-2.5 text-xs text-mist-800
                    transition duration-160 ease-in-out focus:border-emerald-700 focus:shadow-sm
                    focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
                    disabled:cursor-not-allowed disabled:opacity-52
                  "
                />
              </label>
              <div
                className="
                  col-start-1 col-end-3 mt-3 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700
                  max-md:col-start-1 max-md:col-end-auto
                "
                data-slot="registration-caution wide"
              >
                <ShieldCheck size={17} />
                Submitted information will be reviewed before an organisation
                workspace is activated.
              </div>
            </div>
          )}
          {step === 4 && (
            <div
              className="grid grid-cols-2 gap-3 max-md:grid-cols-1"
              data-slot="application-review"
            >
              <div className="flex flex-col rounded-lg bg-mist-100 p-3">
                <span className="text-xs text-olive-500">
                  Organisation
                </span>
                <strong className="mt-1 text-xs tabular-nums">
                  {values.displayName}
                </strong>
              </div>
              <div className="flex flex-col rounded-lg bg-mist-100 p-3">
                <span className="text-xs text-olive-500">
                  Type
                </span>
                <strong className="mt-1 text-xs tabular-nums">
                  {type}
                </strong>
              </div>
              <div className="flex flex-col rounded-lg bg-mist-100 p-3">
                <span className="text-xs text-olive-500">
                  Location
                </span>
                <strong className="mt-1 text-xs tabular-nums">
                  {values.lga}, {values.state}
                </strong>
              </div>
              <div className="flex flex-col rounded-lg bg-mist-100 p-3">
                <span className="text-xs text-olive-500">
                  Administrator
                </span>
                <strong className="mt-1 text-xs tabular-nums">
                  {values.adminName} · {values.adminEmail}
                </strong>
              </div>
              <div className="flex flex-col rounded-lg bg-mist-100 p-3">
                <span className="text-xs text-olive-500">
                  Licence
                </span>
                <strong className="mt-1 text-xs tabular-nums">
                  {values.licence || "Not provided"}
                </strong>
              </div>
            </div>
          )}
          {error && (
            <div
              className="mt-3 rounded-lg border border-red-700/20 bg-red-50 p-2.5 text-xs text-red-700"
              data-slot="auth-error"
              role="alert"
            >
              {error}
            </div>
          )}
          <div
            className="mt-5 flex justify-end gap-2 border-t border-t-mist-200 pt-3"
            data-slot="organisation-actions"
          >
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="
                  inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-mist-300 bg-white px-3.5
                  text-xs font-semibold tracking-normal text-emerald-900 no-underline transition duration-160
                  ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                  focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
                "
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={next}
                className="
                  inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-mist-200 bg-white px-3.5
                  text-xs font-semibold tracking-normal text-emerald-900 no-underline transition duration-160
                  ease-in-out not-first:border-emerald-900 not-first:bg-emerald-900 not-first:text-white
                  first:border-mist-300 first:bg-white first:text-emerald-900 focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                "
              >
                Continue
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="
                  inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-mist-200 bg-white px-3.5
                  text-xs font-semibold tracking-normal text-emerald-900 no-underline transition duration-160
                  ease-in-out not-first:border-emerald-900 not-first:bg-emerald-900 not-first:text-white
                  first:border-mist-300 first:bg-white first:text-emerald-900 focus-visible:outline-3
                  focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                  disabled:opacity-52
                "
              >
                Submit Application
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </section>
      </div>
    </AuthShell>
  );
}
