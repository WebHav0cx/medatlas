'use client';
import { useState } from "react";
import { HelpCircle, Mail, Minus, Plus } from "lucide-react";
import { PatientPageHeader } from './PatientPageHeader';

export function HelpPage() {
  const [open, setOpen] = useState(0)
  const questions = [
    [
      "Why can’t I see all of my health information?",
      "Only records linked to your account and released for patient access appear here. A participating provider may hold other information that has not been made available through this portal.",
    ],
    [
      "Can I edit a clinical document?",
      "No. Provider-authored information remains source-controlled. You can submit a correction review request without directly changing the original record.",
    ],
    [
      "Does every sharing event require my approval?",
      "No. Different authorised healthcare processes may rely on different applicable bases. The portal asks for your decision only when patient consent applies to that specific mock workflow.",
    ],
    [
      "What should I do in an emergency?",
      "Do not use MedAtlas for emergency care. Contact local emergency services or go to an appropriate healthcare facility.",
    ],
  ]
  return (
    <div className="mx-auto max-w-328 px-8 pt-7 pb-12 max-md:px-4 max-md:pt-5 max-md:pb-24" data-slot="patient-page">
      <PatientPageHeader
        eyebrow="Support"
        title="Help & Support"
        subtitle="Plain-language guidance for using your MedAtlas patient account."
      />
      <div >
        <span>
          <HelpCircle size={24} />
        </span>
        <div>
          <h2 className="tracking-tight not-italic">How can we help?</h2>
          <p>
            Find guidance about available records, linking, requests and sharing
            decisions.
          </p>
        </div>
      </div>
      <section >
        {questions.map(([question, answer], index) => (
          <article   key={question}>
            <button
              onClick={() =>
                setOpen((current) => (current === index ? -1 : index))
              }
              aria-expanded={open === index} className="
                transition duration-160 ease-in-out focus-visible:outline-3 focus-visible:outline-offset-2
                focus-visible:outline-emerald-700/32 disabled:cursor-not-allowed disabled:opacity-52
              "
            >
              <span>{question}</span>
              {open === index ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {open === index && <p>{answer}</p>}
          </article>
        ))}
      </section>
      <div >
        <Mail size={19} />
        <div>
          <strong className="tabular-nums">Account support</strong>
          <p>support@medatlas.example · Fictional support contact</p>
        </div>
      </div>
    </div>
  )
}
