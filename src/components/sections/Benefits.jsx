import React from "react";
import { User, Building2, FlaskConical, Stethoscope } from "lucide-react";

export default function Benefits() {
  const cards = [
    {
      icon: <User size={20} />,
      role: "Patients",
      img: "/assets/unsplash-3.jpg",
      imgAlt: "Doctor showing patient information on tablet",
      bullets: [
        "Spend less on repeated tests",
        "Receive safer, informed treatment",
        "One identity, every hospital",
      ],
    },
    {
      icon: <Stethoscope size={20} />,
      role: "Doctors",
      img: "/assets/unsplash-4.jpg",
      imgAlt: "Doctor with stethoscope",
      bullets: [
        "Access patient history faster",
        "Make better clinical decisions",
        "Reduce diagnostic uncertainty",
      ],
    },
    {
      icon: <Building2 size={20} />,
      role: "Hospitals",
      img: "/assets/unsplash-6.jpg",
      imgAlt: "Hospital consultation",
      bullets: [
        "Reduce duplicated work",
        "Improve continuity of care",
        "Works alongside existing systems",
      ],
    },
    {
      icon: <FlaskConical size={20} />,
      role: "Laboratories",
      img: "/assets/unsplash-5.jpg",
      imgAlt: "Medical laboratory researcher with microscope",
      bullets: [
        "Share verified results securely",
        "Reduce redundant tests",
        "Connected to the provider network",
      ],
    },
  ];

  return (
    <section
      className="px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">
            Who Benefits
          </span>
          <h2
            className="font-serif text-4xl text-emerald-900 md:text-5xl" data-slot="landing-original-display"
          >
            Built for every stakeholder
            <br className="font-sans" />
            in the care journey.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.role}
              className="
                flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow
                duration-200 hover:shadow-md
              "
            >
              <div
                className="relative h-40"
              >
                <img
                  src={c.img}
                  alt={c.imgAlt}
                  className="size-full object-cover"
                />
                <div
                  className="absolute top-3 left-3 flex size-8 items-center justify-center rounded-lg bg-white text-emerald-900"
                >
                  {c.icon}
                </div>
              </div>
              <div className="flex-1 p-5">
                <h3
                  className="mb-3 font-serif text-lg font-semibold text-emerald-900" data-slot="landing-original-display"
                >
                  {c.role}
                </h3>
                <ul className="space-y-2">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-1.5 text-xs"
                    >
                      <span
                        className="mt-1.5 size-1 shrink-0 rounded-full"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
