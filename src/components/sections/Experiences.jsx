import { Check, Hospital, UserRound } from "lucide-react";
import ExperienceLink from "../common/ExperienceLink";

const experiences = [
  {
    audience: "patient",
    icon: UserRound,
    label: "For Patients",
    title: "Your health history, more connected.",
    description: "Access your MedAtlas identity, view available records from participating healthcare providers and stay informed about how your information is shared.",
    photo: "https://images.unsplash.com/photo-1761370981160-0e111d79ebc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    alt: "Patient receiving care from a healthcare professional",
    features: ["One MedAtlas health identity", "View available medical records", "See connected healthcare providers", "Review sharing requests", "Track record access activity"],
    action: "Activate Patient Portal",
  },
  {
    audience: "provider",
    icon: Hospital,
    label: "For Healthcare Providers",
    title: "Better information for better care.",
    description: "Identify patients, discover existing medical records and securely exchange relevant clinical information with participating healthcare providers.",
    photo: "https://images.unsplash.com/photo-1739289696456-823ef234a417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900",
    alt: "Healthcare professional at a participating facility",
    features: ["Patient identity matching", "Provider and record discovery", "Secure record requests", "Authorization and exchange", "Auditable access history"],
    action: "Continue as Healthcare Provider",
  },
];

function ExperienceCard({ experience }) {
  const { icon: Icon, audience, label, title, description, photo, alt, features, action } = experience;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
      <img src={photo} alt={alt} loading="lazy" className="h-52 w-full object-cover" />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-emerald-900 uppercase">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50">
            <Icon aria-hidden="true" className="size-4" />
          </span>
          {label}
        </div>
        <h3 className="mt-4 mb-3 font-serif text-3xl leading-tight text-emerald-900">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        <ul className="mt-5 mb-6 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
              <Check aria-hidden="true" className="size-4 shrink-0 rounded-full bg-emerald-50 p-0.5 text-emerald-700" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto"><ExperienceLink audience={audience}>{action}</ExperienceLink></div>
      </div>
    </article>
  );
}

export default function Experiences() {
  return (
    <section className="px-6 py-24" aria-labelledby="experiences-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">One network, two experiences</span>
          <h2 id="experiences-heading" className="mb-4 font-serif text-4xl text-emerald-900 md:text-5xl">Choose how MedAtlas works for you</h2>
          <p className="text-base leading-relaxed text-slate-600">Connected by one trusted identity and authorization infrastructure.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((experience) => <ExperienceCard key={experience.audience} experience={experience} />)}
        </div>
      </div>
    </section>
  );
}
