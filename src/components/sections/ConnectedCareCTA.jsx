import ExperienceLink from "../common/ExperienceLink";

export default function ConnectedCareCTA() {
  return (
    <section aria-labelledby="connected-care-heading" className="bg-emerald-900 px-6 py-24 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <h2 id="connected-care-heading" className="mb-5 font-serif text-4xl md:text-5xl">Better connected care starts here.</h2>
        <p className="text-base leading-relaxed text-white/70">Choose the MedAtlas experience that is right for you.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ExperienceLink audience="patient" variant="lime">I'm a Patient</ExperienceLink>
          <ExperienceLink audience="provider" variant="outline">I'm a Healthcare Provider</ExperienceLink>
        </div>
      </div>
    </section>
  );
}
