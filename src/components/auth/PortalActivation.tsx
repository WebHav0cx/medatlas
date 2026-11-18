"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { portalSchema } from "../../schemas/auth";
import type { PortalValues } from "../../schemas/auth";
import { PATIENT_INVITATION } from "../../data/identity-seed";
import { useIdentityStore } from "../../stores/identity";
import { AuthShell } from "./AuthShell";
import { AuthHeading } from "./AuthHeading";
import { DemoCredentials } from "./DemoCredentials";
import {
  FormError,
  FormField,
  fieldAccessibility,
  inputClassName,
  primaryButtonClassName,
} from "../shared/forms/FormField";

export function PortalActivation() {
  return (
    <AuthShell>
      <PortalActivationForm />
    </AuthShell>
  );
}

function PortalActivationForm() {
  const router = useRouter();
  const activatePatient = useIdentityStore((state) => state.activatePatient);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PortalValues>({
    resolver: zodResolver(portalSchema),
    defaultValues: {
      medAtlasId: "",
      email: "",
      invitationCode: "",
      password: "",
    },
  });

  function onSubmit(values: PortalValues) {
    const result = activatePatient(values);
    if (!result.ok) {
      setError("root", { message: result.message });
      return;
    }
    router.push("/patient/dashboard");
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <AuthHeading
        eyebrow="For patients"
        title="Activate your Patient Portal"
        description="Your healthcare facility creates and verifies your clinical profile. Use its separate portal invitation to activate access to that existing profile."
      />
      <details className="mb-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
        <summary className="cursor-pointer font-semibold">
          Try the fictional patient invitation
        </summary>
        <dl className="mt-3 space-y-2 break-words">
          <div>
            <dt className="font-semibold">Existing MedAtlas ID</dt>
            <dd>{PATIENT_INVITATION.medAtlasId}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email</dt>
            <dd>{PATIENT_INVITATION.email}</dd>
          </div>
          <div>
            <dt className="font-semibold">Invitation code</dt>
            <dd>{PATIENT_INVITATION.code}</dd>
          </div>
        </dl>
        <p className="mt-3">
          This sample invitation can be used once per browser. Afterwards, sign
          in with the same email.
        </p>
      </details>
      <DemoCredentials />
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="medAtlasId"
          label="Existing MedAtlas ID"
          error={errors.medAtlasId?.message}
        >
          <input
            id="medAtlasId"
            {...register("medAtlasId")}
            {...fieldAccessibility("medAtlasId", errors.medAtlasId?.message)}
            className={[
              inputClassName,
              `
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              `,
            ]
              .filter(Boolean)
              .join(" ")}
            autoComplete="off"
          />
        </FormField>
        <FormField
          id="email"
          label="Invited email address"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            {...register("email")}
            {...fieldAccessibility("email", errors.email?.message)}
            className={[
              inputClassName,
              `
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              `,
            ]
              .filter(Boolean)
              .join(" ")}
            autoComplete="off"
          />
        </FormField>
        <FormField
          id="invitationCode"
          label="Separate portal invitation code"
          error={errors.invitationCode?.message}
        >
          <input
            id="invitationCode"
            {...register("invitationCode")}
            {...fieldAccessibility(
              "invitationCode",
              errors.invitationCode?.message,
            )}
            className={[
              inputClassName,
              `
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              `,
            ]
              .filter(Boolean)
              .join(" ")}
            autoComplete="off"
          />
        </FormField>
        <FormField
          id="password"
          label="Demo password"
          error={errors.password?.message}
        >
          <input
            id="password"
            type="password"
            {...register("password")}
            {...fieldAccessibility("password", errors.password?.message)}
            className={[
              inputClassName,
              `
                min-h-10.5 rounded-lg border-mist-300 bg-white text-xs text-mist-800 transition duration-160
                ease-in-out focus:border-emerald-700 focus:shadow-sm focus-visible:outline-3
                focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed
                disabled:opacity-52
              `,
            ]
              .filter(Boolean)
              .join(" ")}
            autoComplete="off"
          />
        </FormField>
        <FormError message={errors.root?.message} />
        <button
          type="submit"
          disabled={isSubmitting}
          className={[(`
            w-full transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
            focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
          `), primaryButtonClassName].filter(Boolean).join(" ")}
        >
          {isSubmitting ? "Activating…" : "Activate Patient Portal"}
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </form>
      <p className="mt-6 text-sm leading-relaxed text-slate-600">
        Already activated?{" "}
        <Link
          href="/login/patient"
          className="
            font-semibold text-emerald-900 underline underline-offset-4 transition duration-160 ease-in-out
            focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-700/32
          "
        >
          Sign in
        </Link>
        . If you do not have a clinical profile or invitation, contact a
        participating healthcare facility.
      </p>
    </section>
  );
}
