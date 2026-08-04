import React from "react";
import unsplashImg3 from "../../assets/unsplash-3.jpg";
import unsplashImg4 from "../../assets/unsplash-4.jpg";
import unsplashImg5 from "../../assets/unsplash-5.jpg";
import unsplashImg6 from "../../assets/unsplash-6.jpg";
import { User, Building2, FlaskConical, Stethoscope } from "lucide-react";

export default function Benefits() {
  const cards = [
    {
      icon: <User size={20} />,
      role: "Patients",
      img: unsplashImg3,
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
      img: unsplashImg4,
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
      img: unsplashImg6,
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
      img: unsplashImg5,
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
      className="py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-emerald-50 text-emerald-900">
            Who Benefits
          </span>
          <h2
            className="text-4xl md:text-5xl text-emerald-900 font-display"
            style={{ color: "var(--color-emerald-900)", fontFamily: "'DM Serif Display', Georgia, serif", }}
          >
            Built for every stakeholder
            <br />
            in the care journey.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div
              key={c.role}
              className="rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              style={{ background: "white", border: "1px solid var(--color-slate-200)", }}
            >
              <div
                className="relative h-[160px]"
              >
                <img
                  src={c.img}
                  alt={c.imgAlt}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "white", color: "var(--color-emerald-900)", }}
                >
                  {c.icon}
                </div>
              </div>
              <div className="p-5 flex-1">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "var(--color-emerald-900)", fontFamily: "'DM Serif Display', Georgia, serif", }}
                >
                  {c.role}
                </h3>
                <ul className="space-y-2">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="text-xs flex items-start gap-1.5"
                    >
                      <span
                        className="mt-1.5 w-1 h-1 rounded-full shrink-0"
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
