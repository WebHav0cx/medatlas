const steps = [
  { title: "Visit a participating facility", description: "Receive care through the hospital's existing clinical workflow." },
  { title: "Connect your MedAtlas identity", description: "Verify the same health identity across participating providers." },
  { title: "Stay informed and in control", description: "Access available records and manage applicable sharing permissions." },
];

export default function PatientJourney() {
  return (
    <section id="patients" aria-labelledby="patients-heading" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="relative overflow-hidden rounded-2xl">
          <img src="https://images.unsplash.com/photo-1739285452629-2672b13fa42d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=82&w=1080" alt="Healthcare consultation in an African clinic" loading="lazy" className="h-96 w-full object-cover md:h-136" />
          <span className="absolute right-4 bottom-4 left-4 w-fit rounded-lg bg-white px-3 py-2 text-xs font-semibold text-emerald-900">Patient identity connected to care</span>
        </div>
        <div>
          <span className="
            mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-widest
            text-emerald-900 uppercase
          ">For patients</span>
          <h2 id="patients-heading" className="mb-5 font-serif text-4xl text-emerald-900 md:text-5xl">Your health history should not start over at every hospital.</h2>
          <p className="text-base leading-relaxed text-slate-600">When you receive care at participating facilities, MedAtlas can help make approved, relevant records available across your care journey.</p>
          <ol className="mt-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3 border-b border-slate-200 py-4">
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-900">{index + 1}</span>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-emerald-950">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
